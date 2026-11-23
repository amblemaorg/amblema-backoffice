import { DatePipe } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { debounceTime, finalize, switchMap, takeUntil } from 'rxjs/operators';
import { AdminRating, CommentStatus } from 'src/app/_models/vademecum/moderation.model';
import { AdminSheet } from 'src/app/_models/vademecum/sheet.model';
import { TABLE_ICONS, TableIconAction, VademecumServerSource, VademecumTableSources, vademecumTableSettings } from '../_shared/vademecum-table';
import { confirmAction } from '../_shared/vademecum-dialogs';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumModerationService } from 'src/app/services/vademecum/vademecum-moderation.service';
import { VademecumSheetService } from 'src/app/services/vademecum/vademecum-sheet.service';

const COMMENT_CHANGED_CODE = '120';

/** Escapa el texto del docente antes de usarlo en una columna `type: 'html'`. */
function escapeHtml(value: string): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Vademécum › Moderación de comentarios (BO-09): aprobar, rechazar (ocultar) y ocultar. */
@Component({
  selector: 'app-vademecum-moderation',
  templateUrl: './moderation.component.html',
  styleUrls: ['./moderation.component.scss'],
})
export class ModerationComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly sheetSearch$ = new Subject<string>();

  readonly statuses: { status: CommentStatus; label: string }[] = [
    { status: 'pending', label: 'Pendientes' },
    { status: 'approved', label: 'Publicados' },
    { status: 'hidden', label: 'Ocultos' },
  ];

  status: CommentStatus = 'pending';
  sheetId: string | null = null;
  sheets: AdminSheet[] = [];
  loadingSheets = false;

  source: VademecumServerSource;
  settings: any;
  pendingTotal: number | null = null;

  submitting = false;

  constructor(
    private moderation: VademecumModerationService,
    private sheetService: VademecumSheetService,
    private toastr: CustomToastrService,
    private tableSources: VademecumTableSources,
    private modals: BsModalService,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.settings = this.buildSettings();
    this.source = this.tableSources.create('ratings', this.filters());
  }

  ngOnInit(): void {
    this.source.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudieron cargar los comentarios.'));
    this.sheetSearch$
      .pipe(
        debounceTime(300),
        switchMap((q) => {
          this.loadingSheets = true;
          return this.sheetService.list({ status: null, sheetTypeId: null, q }, 1, 20);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (list) => {
          this.sheets = list.records;
          this.loadingSheets = false;
        },
        () => {
          this.loadingSheets = false;
          this.toastr.error('Error', 'No se pudieron cargar las fichas.');
        },
      );
    this.sheetSearch$.next('');
    this.refreshPendingTotal();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  statusLabel(item: { status: CommentStatus; label: string }): string {
    return item.status === 'pending' && this.pendingTotal !== null ? `${item.label} (${this.pendingTotal})` : item.label;
  }

  onStatusChange(status: CommentStatus): void {
    if (this.status === status) {
      return;
    }
    this.status = status;
    this.settings = this.buildSettings();
    this.reloadList();
  }

  onSheetSearch(term: { term: string }): void {
    this.sheetSearch$.next(term.term || '');
  }

  onSheetChange(): void {
    this.reloadList();
  }

  /** Acciones por ícono de cada fila según el estado elegido. */
  onAction(event: { action: string; data: AdminRating }): void {
    if (this.submitting) {
      return;
    }
    const rating = event.data;
    switch (event.action) {
      case 'approve':
        this.approve(rating);
        break;
      case 'reject':
        this.reject(rating);
        break;
      case 'hide':
        this.askHide(rating);
        break;
    }
  }

  // --- Acciones ---

  approve(rating: AdminRating): void {
    this.run(rating, 'approve', 'Comentario aprobado y publicado.', 'No se pudo aprobar el comentario.');
  }

  /** Rechazar un pendiente = ocultarlo; no pide confirmación. */
  reject(rating: AdminRating): void {
    this.run(rating, 'hide', 'Comentario rechazado (oculto).', 'No se pudo rechazar el comentario.');
  }

  /** Ocultar un comentario publicado pide confirmación. */
  askHide(rating: AdminRating): void {
    const sheet = rating.sheet ? `${rating.sheet.code} · ${rating.sheet.title} · ` : '';
    const confirmation = confirmAction(
      this.modals,
      'Ocultar comentario',
      '¿Desea ocultar este comentario publicado?',
      `${sheet}${this.teacherName(rating)}. Dejará de mostrarse a los docentes. Las estrellas se conservan y podrá aprobarse de nuevo.`,
    );
    confirmation.confirmed$.subscribe(() =>
      this.run(rating, 'hide', 'Comentario oculto.', 'No se pudo ocultar el comentario.', () => confirmation.close()),
    );
  }

  // --- Presentación ---

  teacherName(rating: AdminRating): string {
    const account = rating.account;
    if (!account) {
      return '—';
    }
    return `${account.firstName || ''} ${account.lastName || ''}`.trim() || account.email;
  }

  sheetLabel(sheet: AdminSheet): string {
    return `${sheet.code} · ${sheet.title}`;
  }

  /** El filtrado lo hace la API (q); ng-select no debe volver a filtrar en local. */
  serverSearch = (): boolean => true;

  // --- Privados ---

  private filters(): { commentStatus: CommentStatus; sheetId: string | null } {
    return { commentStatus: this.status, sheetId: this.sheetId };
  }

  private reloadList(): void {
    this.source.setFilters(this.filters());
    this.refreshPendingTotal();
  }

  private buildSettings(): any {
    const datePipe = new DatePipe(this.locale);
    const fmt = (value: string | null) => (value ? datePipe.transform(value, 'dd/MM/yyyy HH:mm') : '—');
    const columns: { [key: string]: any } = {
      sheet: {
        title: 'Ficha',
        valuePrepareFunction: (_: any, row: AdminRating) => (row.sheet ? `${row.sheet.code} · ${row.sheet.title}` : '—'),
      },
      account: {
        title: 'Docente',
        type: 'html',
        valuePrepareFunction: (_: any, row: AdminRating) =>
          row.account ? `${escapeHtml(this.teacherName(row))}<br><small>${escapeHtml(row.account.email)}</small>` : '—',
      },
      stars: {
        title: 'Estrellas',
        valuePrepareFunction: (value: number) => '★'.repeat(value || 0) + '☆'.repeat(Math.max(0, 5 - (value || 0))),
      },
      comment: {
        title: 'Comentario',
        type: 'html',
        valuePrepareFunction: (value: string) => escapeHtml(value).replace(/\r?\n/g, '<br>'),
      },
      updatedAt: { title: 'Fecha', valuePrepareFunction: fmt },
    };
    if (this.status !== 'pending') {
      columns.moderatedBy = {
        title: this.status === 'approved' ? 'Aprobado por' : 'Oculto por',
        valuePrepareFunction: (_: any, row: AdminRating) =>
          `${row.moderatedBy?.name || '—'}${row.moderatedAt ? ' · ' + fmt(row.moderatedAt) : ''}`,
      };
    }
    let actions: TableIconAction[] = [];
    if (this.status === 'pending') {
      actions = [
        { name: 'approve', title: `<span title="Aprobar">${TABLE_ICONS.approve}</span>` },
        { name: 'reject', title: `<span title="Rechazar">${TABLE_ICONS.reject}</span>` },
      ];
    } else if (this.status === 'approved') {
      actions = [{ name: 'hide', title: `<span title="Ocultar">${TABLE_ICONS.hide}</span>` }];
    } else {
      actions = [{ name: 'approve', title: `<span title="Aprobar">${TABLE_ICONS.approve}</span>` }];
    }
    return vademecumTableSettings(columns, actions, true);
  }

  private run(
    rating: AdminRating,
    action: 'approve' | 'hide',
    okMessage: string,
    failMessage: string,
    done: () => void = () => undefined,
  ): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    const request$ =
      action === 'approve'
        ? this.moderation.approve(rating.id, rating.updatedAt)
        : this.moderation.hide(rating.id, rating.updatedAt);
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      () => {
        done();
        this.toastr.registerSuccess('Listo', okMessage);
        this.source.refresh();
        this.refreshPendingTotal();
      },
      (err: HttpErrorResponse) => {
        done();
        if (this.hasErrorCode(err, COMMENT_CHANGED_CODE)) {
          this.toastr.info('Aviso', 'El docente cambió este comentario; revísalo de nuevo.');
          this.source.refresh();
          this.refreshPendingTotal();
          return;
        }
        this.toastr.error('Error', failMessage);
      },
    );
  }

  private refreshPendingTotal(): void {
    this.moderation
      .list({ commentStatus: 'pending', sheetId: this.sheetId }, 1, 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (list) => (this.pendingTotal = list.pagination.total),
        () => (this.pendingTotal = null),
      );
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
