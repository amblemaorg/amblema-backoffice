import { Component, OnDestroy, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { SortHelper } from 'src/app/_helpers/sort.helper';
import {
  AccessRequest,
  AccessRequestStatus,
  Authorization,
} from 'src/app/_models/vademecum/access-request.model';
import { SchoolYearEnrolled } from 'src/app/_models/_enrolled/school-year.model';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumAccessService } from 'src/app/services/vademecum/vademecum-access.service';
import {
  TABLE_ICONS,
  TableIconAction,
  vademecumTableSettings,
  VademecumServerSource,
  VademecumTableSources,
} from '../_shared/vademecum-table';
import { Confirmation, confirmAction, hideModal, showModal } from '../_shared/vademecum-dialogs';

const ALREADY_REVIEWED_CODE = '118';
const MAX_REASON_LENGTH = 500;

/** Escapa texto del usuario antes de ponerlo en una celda `type: 'html'`. */
function esc(value: any): string {
  const map: { [char: string]: string } = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value === null || value === undefined ? '' : value).replace(/[&<>"']/g, (char) => map[char]);
}

function fmtDate(value: any, format = 'dd/MM/yyyy HH:mm'): string {
  return value ? formatDate(value, format, 'en-US') : '—';
}

/** Vademécum › Solicitudes de acceso (BO-08): aprobar/rechazar solicitudes y revocar autorizaciones. */
@Component({
  selector: 'app-vademecum-access-requests',
  templateUrl: './access-requests.component.html',
  styleUrls: ['./access-requests.component.scss'],
})
export class AccessRequestsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly search$ = new Subject<void>();

  readonly rejectFormId = 'vademecum-reject-form';
  readonly maxReasonLength = MAX_REASON_LENGTH;

  schoolYears: SchoolYearEnrolled[] = [];

  // Solicitudes (paginadas en el servidor)
  status: AccessRequestStatus = 'pending';
  requestsYearId: string | null = null;
  query = '';
  requestsSource: VademecumServerSource | null = null;
  requestsSettings: any = this.buildRequestsSettings('pending');

  // Autorizaciones (paginadas en el servidor)
  authYearId: string | null = null; // null = año vigente (lo resuelve la API)
  authSource: VademecumServerSource;
  authSettings: any = vademecumTableSettings(
    {
      account: {
        title: 'Docente',
        type: 'html',
        valuePrepareFunction: (_: any, row: Authorization) => esc(this.accountName(row)),
      },
      email: {
        title: 'Correo',
        type: 'html',
        valuePrepareFunction: (_: any, row: Authorization) => esc((row.account && row.account.email) || '—'),
      },
      year: {
        title: 'Año',
        valuePrepareFunction: (_: any, row: Authorization) => (row.schoolYear && row.schoolYear.name) || '—',
      },
      approvedBy: {
        title: 'Aprobó',
        type: 'html',
        valuePrepareFunction: (_: any, row: Authorization) => esc((row.approvedBy && row.approvedBy.name) || '—'),
      },
      approvedAt: {
        title: 'Aprobada',
        valuePrepareFunction: (_: any, row: Authorization) => fmtDate(row.approvedAt),
      },
      state: {
        title: 'Estatus',
        type: 'html',
        valuePrepareFunction: (_: any, row: Authorization) =>
          row.revokedAt
            ? `<span class="text-danger font-weight-bold">Revocada ${fmtDate(row.revokedAt, 'dd/MM/yyyy')}</span>`
            : 'Activa',
      },
    },
    [{ name: 'revoke', title: `<span title="Revocar">${TABLE_ICONS.reject}</span>` }],
    true,
  );

  // Rechazo con motivo (en ventana)
  rejecting: AccessRequest | null = null;
  rejectReason = '';
  submitting = false;

  constructor(
    private access: VademecumAccessService,
    private schoolYearService: SchoolYearService,
    private toastr: CustomToastrService,
    private tableSources: VademecumTableSources,
    private modals: BsModalService,
  ) {
    this.authSource = this.tableSources.create('authorizations', {});
  }

  ngOnInit(): void {
    this.authSource.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudieron cargar las autorizaciones.'));
    this.search$.pipe(debounceTime(350), takeUntil(this.destroy$)).subscribe(() => this.reloadRequests());
    // Las solicitudes arrancan filtradas por el año vigente (status "1"); "Todos" queda disponible
    this.schoolYearService.getSchoolYears().pipe(takeUntil(this.destroy$)).subscribe(
      (years) => {
        this.schoolYears = SortHelper.schoolYearsDesc(years as SchoolYearEnrolled[]);
        const current = this.schoolYears.find((year) => year.status === '1');
        this.requestsYearId = current ? current.id : null;
        this.createRequestsSource();
      },
      () => {
        this.toastr.error('Error', 'No se pudieron cargar los años escolares.');
        this.createRequestsSource();
      },
    );
  }

  ngOnDestroy(): void {
    hideModal(this.rejectFormId);
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isPendingTab(): boolean {
    return this.status === 'pending';
  }

  get reasonValid(): boolean {
    const reason = this.rejectReason.trim();
    return reason.length > 0 && reason.length <= MAX_REASON_LENGTH;
  }

  // --- Solicitudes ---

  onStatusChange(): void {
    this.requestsSettings = this.buildRequestsSettings(this.status);
    this.reloadRequests();
  }

  onFilterChange(): void {
    this.reloadRequests();
  }

  onSearch(): void {
    this.search$.next();
  }

  onRequestAction(event: { action: string; data: AccessRequest }): void {
    if (!this.isPendingTab || this.submitting) {
      return;
    }
    if (event.action === 'approve') {
      this.askApprove(event.data);
    } else if (event.action === 'reject') {
      this.rejecting = event.data;
      this.rejectReason = '';
      showModal(this.rejectFormId);
    }
  }

  // --- Autorizaciones ---

  onAuthYearChange(): void {
    this.authSource.setFilters({ schoolYearId: this.authYearId });
  }

  onAuthAction(event: { action: string; data: Authorization }): void {
    if (event.action !== 'revoke') {
      return;
    }
    if (event.data.revokedAt) {
      this.toastr.info('Aviso', 'Esta autorización ya fue revocada.');
      return;
    }
    this.askRevoke(event.data);
  }

  // --- Acciones ---

  private askApprove(request: AccessRequest): void {
    const confirmation = confirmAction(
      this.modals,
      'Aprobar solicitud',
      `¿Desea aprobar a ${this.fullName(request)}?`,
      'Se creará o activará la cuenta y se enviará un correo.',
      true,
    );
    confirmation.confirmed$.subscribe(() => {
      this.submitting = true;
      this.access
        .approve(request.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            confirmation.close();
            this.afterReview('Solicitud aprobada. Se creó o activó la cuenta y se envió un correo.', true);
          },
          (err: HttpErrorResponse) => this.onReviewError(err, 'No se pudo aprobar la solicitud.', confirmation),
        );
    });
  }

  confirmReject(): void {
    const request = this.rejecting;
    if (!request || this.submitting || !this.reasonValid) {
      return;
    }
    this.submitting = true;
    this.access
      .reject(request.id, this.rejectReason.trim())
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.closeReject();
          this.afterReview('Solicitud rechazada. Se envió el motivo por correo.', false);
        },
        (err: HttpErrorResponse) => {
          this.closeReject();
          this.onReviewError(err, 'No se pudo rechazar la solicitud.');
        },
      );
  }

  private askRevoke(authorization: Authorization): void {
    if (this.submitting) {
      return;
    }
    const confirmation = confirmAction(
      this.modals,
      'Revocar acceso',
      `¿Desea revocar el acceso de ${this.accountName(authorization)}?`,
      'El docente perderá el acceso a Vademécum para este año escolar.',
    );
    confirmation.confirmed$.subscribe(() => {
      this.submitting = true;
      this.access
        .revoke(authorization.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            confirmation.close();
            this.toastr.registerSuccess('Listo', 'Autorización revocada.');
            this.authSource.refresh();
          },
          () => {
            confirmation.close();
            this.toastr.error('Error', 'No se pudo revocar la autorización.');
          },
        );
    });
  }

  // --- Presentación ---

  fullName(request: { firstName: string; lastName: string }): string {
    return `${request.firstName || ''} ${request.lastName || ''}`.trim();
  }

  accountName(authorization: Authorization): string {
    const account = authorization.account;
    if (!account) {
      return '—';
    }
    return `${account.firstName || ''} ${account.lastName || ''}`.trim() || account.email;
  }

  // --- Privados ---

  private closeReject(): void {
    hideModal(this.rejectFormId);
    this.rejecting = null;
    this.rejectReason = '';
  }

  /** Éxito de aprobar/rechazar: aviso y recarga (la página se ajusta si queda vacía). */
  private afterReview(message: string, approved: boolean): void {
    this.toastr.registerSuccess('Listo', message);
    this.refreshKeepingPage(this.requestsSource);
    if (approved) {
      this.authSource.setFilters({ schoolYearId: this.authYearId });
    }
  }

  private onReviewError(err: HttpErrorResponse, fallback: string, confirmation?: Confirmation): void {
    if (confirmation) {
      confirmation.close();
    }
    if (this.hasErrorCode(err, ALREADY_REVIEWED_CODE)) {
      this.toastr.info('Aviso', 'La solicitud ya fue revisada por otra persona. Se actualizó la lista.');
      this.reloadRequests();
      return;
    }
    this.toastr.error('Error', fallback);
  }

  /** Recarga la página actual; si era la última fila de una página posterior a la 1, retrocede una. */
  private refreshKeepingPage(source: VademecumServerSource | null): void {
    if (!source) {
      return;
    }
    const page = source.getPaging().page;
    source.getElements().then((rows) => {
      if (rows.length === 1 && page > 1) {
        source.setPage(page - 1, false);
      }
      source.refresh();
    });
  }

  private createRequestsSource(): void {
    this.requestsSource = this.tableSources.create('access-requests', this.requestFilters());
    this.requestsSource.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudieron cargar las solicitudes.'));
  }

  private reloadRequests(): void {
    if (this.requestsSource) {
      this.requestsSource.setFilters(this.requestFilters());
    }
  }

  private requestFilters(): { [key: string]: any } {
    return { status: this.status, schoolYearId: this.requestsYearId, q: this.query.trim() };
  }

  /** Columnas según el estado; los íconos aprobar/rechazar solo existen en "Pendientes". */
  private buildRequestsSettings(status: AccessRequestStatus): any {
    const html = (title: string, get: (row: AccessRequest) => any) => ({
      title,
      type: 'html',
      valuePrepareFunction: (_: any, row: AccessRequest) => esc(get(row)),
    });
    const columns: { [key: string]: any } = {
      createdAt: { title: 'Fecha', valuePrepareFunction: (_: any, row: AccessRequest) => fmtDate(row.createdAt) },
      name: html('Nombre', (row) => this.fullName(row)),
      cardId: html('Cédula', (row) => row.cardId || '—'),
      email: html('Correo', (row) => row.email),
      phone: html('Teléfono', (row) => row.phone || '—'),
      institution: html('Institución', (row) => row.institution),
      year: {
        title: 'Año',
        valuePrepareFunction: (_: any, row: AccessRequest) => (row.schoolYear && row.schoolYear.name) || '—',
      },
    };
    if (status !== 'pending') {
      columns.reviewedBy = html('Revisó', (row) => (row.reviewedBy && row.reviewedBy.name) || '—');
      columns.reviewedAt = {
        title: 'Revisada',
        valuePrepareFunction: (_: any, row: AccessRequest) => fmtDate(row.reviewedAt),
      };
    }
    if (status === 'rejected') {
      columns.reason = html('Motivo', (row) => row.rejectionReason || '—');
    }
    const actions: TableIconAction[] =
      status === 'pending'
        ? [
            { name: 'approve', title: `<span title="Aprobar">${TABLE_ICONS.approve}</span>` },
            { name: 'reject', title: `<span title="Rechazar">${TABLE_ICONS.reject}</span>` },
          ]
        : [];
    return vademecumTableSettings(columns, actions, true);
  }

  /** Errores de la API: {"<campo>": [{"status": "<código>", "msg": "..."}]}. */
  private hasErrorCode(err: HttpErrorResponse, code: string): boolean {
    const body: unknown = err && err.error;
    if (!body || typeof body !== 'object') {
      return false;
    }
    return Object.values(body as Record<string, unknown>).some(
      (items) =>
        Array.isArray(items) &&
        items.some((item) => !!item && typeof item === 'object' && String((item as { status?: unknown }).status) === code),
    );
  }
}
