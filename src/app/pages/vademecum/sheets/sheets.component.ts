import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import {
  AdminSheet,
  ApiErrors,
  Area,
  GRADE_OPTIONS,
  SheetInput,
  SheetStatus,
  SHEET_STATUS_LABELS,
} from 'src/app/_models/vademecum/sheet.model';
import { SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumSheetService } from 'src/app/services/vademecum/vademecum-sheet.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, VademecumServerSource, VademecumTableSources, vademecumTableSettings } from '../_shared/vademecum-table';

const DUPLICATED_CODE = '112';
const PUBLISH_REQUIREMENTS_CODE = '113';

/** Mensajes en español por campo para los errores 112/113 (y genérico). */
const FIELD_LABELS: { [field: string]: string } = {
  description: 'la descripción',
  grades: 'al menos un grado',
  file: 'el archivo PDF generado',
  number: 'el número',
};

interface EditForm {
  title: string;
  description: string;
  grades: string[];
  areaIds: string[];
}

type PendingAction = { kind: 'unpublish' | 'delete'; sheet: AdminSheet };

/** Vademécum › Fichas (BO-06): filtrar, editar, publicar, despublicar y borrar fichas. */
@Component({
  selector: 'app-vademecum-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
})
export class SheetsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly search$ = new Subject<void>();

  readonly gradeOptions = GRADE_OPTIONS;
  readonly statusLabels = SHEET_STATUS_LABELS;
  types: SheetType[] = [];
  areas: Area[] = [];

  // Filtros
  status: SheetStatus | null = null;
  sheetTypeId: string | null = null;
  seriesId: string | null = null;
  query = '';

  // Tabla (paginada en el servidor)
  source: VademecumServerSource;
  settings: any;

  // Selección múltiple (filas de la página actual)
  selected: AdminSheet[] = [];
  batchFailures: { sheet: string; reason: string }[] = [];

  // Acción puntual en curso / confirmación en línea
  submitting = false;
  pending: PendingAction | null = null;

  // Edición en panel
  editing: AdminSheet | null = null;
  form: EditForm = { title: '', description: '', grades: [], areaIds: [] };
  fieldErrors: { [field: string]: string } = {};
  formError = '';

  constructor(
    private tableSources: VademecumTableSources,
    private sheetService: VademecumSheetService,
    private taxonomy: VademecumTaxonomyService,
    private toastr: CustomToastrService,
  ) {
    this.source = this.tableSources.create('sheets', this.filters());
    this.settings = {
      ...vademecumTableSettings(
        {
          code: { title: 'Código' },
          title: { title: 'Título' },
          type: {
            title: 'Tipo / serie',
            valuePrepareFunction: (_: any, s: AdminSheet) =>
              (s.sheetType ? s.sheetType.name : '—') + (s.series ? ' / ' + s.series.name : ''),
          },
          grades: { title: 'Grados', valuePrepareFunction: (_: any, s: AdminSheet) => this.gradesText(s) },
          areas: { title: 'Áreas', valuePrepareFunction: (_: any, s: AdminSheet) => this.areasText(s) },
          status: {
            title: 'Estado',
            type: 'html',
            valuePrepareFunction: (_: any, s: AdminSheet) => {
              const st = this.statusLabels[s.status];
              return `<span class="status-pill status-${st.color}">${st.label}</span>`;
            },
          },
          publishedAt: {
            title: 'Publicada',
            valuePrepareFunction: (_: any, s: AdminSheet) =>
              s.publishedAt ? new DatePipe('en-US').transform(s.publishedAt, 'dd/MM/yyyy') : '—',
          },
        },
        [
          { name: 'pdf', title: TABLE_ICONS.pdf },
          { name: 'edit', title: TABLE_ICONS.edit },
          { name: 'publish', title: TABLE_ICONS.publish },
          { name: 'unpublish', title: TABLE_ICONS.unpublish },
          { name: 'delete', title: TABLE_ICONS.delete },
        ],
        true,
      ),
      selectMode: 'multi',
    };
  }

  ngOnInit(): void {
    this.search$.pipe(debounceTime(350), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
    this.source.onChanged().pipe(takeUntil(this.destroy$)).subscribe(() => (this.selected = []));
    this.source.loadError$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.toastr.error('Error', 'No se pudieron cargar las fichas.'));
    this.taxonomy.sheetTypes().pipe(takeUntil(this.destroy$)).subscribe(
      (types) => (this.types = types),
      () => this.toastr.error('Error', 'No se pudieron cargar los tipos de ficha.'),
    );
    this.taxonomy.areas().pipe(takeUntil(this.destroy$)).subscribe(
      (areas) => (this.areas = areas),
      () => this.toastr.error('Error', 'No se pudieron cargar las áreas.'),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get seriesOptions(): SheetType['series'] {
    const type = this.types.find((t) => t.id === this.sheetTypeId);
    return type ? type.series : [];
  }

  // --- Listado ---

  private filters(): { [key: string]: any } {
    return { status: this.status, sheetTypeId: this.sheetTypeId, seriesId: this.seriesId, q: this.query.trim() };
  }

  applyFilters(): void {
    this.source.setFilters(this.filters());
  }

  onTypeChange(): void {
    this.seriesId = null;
    this.applyFilters();
  }

  onSearch(): void {
    this.search$.next();
  }

  private reload(): void {
    this.source.refresh();
  }

  // --- Selección ---

  onRowSelect(event: { selected: AdminSheet[] }): void {
    this.selected = event.selected || [];
  }

  onAction(event: { action: string; data: AdminSheet }): void {
    const sheet = event.data;
    switch (event.action) {
      case 'pdf':
        if (!sheet.fileStatus) {
          this.toastr.info('Aviso', 'La ficha no tiene PDF generado.');
          return;
        }
        this.viewPdf(sheet);
        break;
      case 'edit':
        this.edit(sheet);
        break;
      case 'publish':
        if (sheet.status === 'published') {
          this.toastr.info('Aviso', `La ficha ${sheet.code} ya está publicada.`);
          return;
        }
        this.publish(sheet);
        break;
      case 'unpublish':
        if (sheet.status !== 'published') {
          this.toastr.info('Aviso', `La ficha ${sheet.code} no está publicada.`);
          return;
        }
        this.askUnpublish(sheet);
        break;
      case 'delete':
        this.askDelete(sheet);
        break;
    }
  }

  publishSelected(): void {
    const rows = this.selected.filter((s) => s.status !== 'published');
    if (this.submitting || rows.length === 0) {
      if (!this.submitting && this.selected.length > 0) {
        this.toastr.info('Aviso', 'Las fichas seleccionadas ya están publicadas.');
      }
      return;
    }
    const ids = rows.map((s) => s.id);
    const labels: { [id: string]: string } = {};
    rows.forEach((s) => (labels[s.id] = `${s.code} · ${s.title}`));
    this.submitting = true;
    this.batchFailures = [];
    this.sheetService
      .publishMany(ids)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        (result) => {
          this.batchFailures = result.failed.map((f) => ({
            sheet: labels[f.sheetId] || f.sheetId,
            reason: this.describeErrors(f.errors),
          }));
          if (result.published.length > 0) {
            this.toastr.registerSuccess('Listo', `${result.published.length} ficha(s) publicada(s).`);
          }
          if (result.failed.length > 0) {
            this.toastr.error('Aviso', `${result.failed.length} ficha(s) no se pudieron publicar. Vea el detalle abajo.`);
          }
          this.reload();
        },
        () => this.toastr.error('Error', 'No se pudo publicar la selección.'),
      );
  }

  dismissBatchFailures(): void {
    this.batchFailures = [];
  }

  // --- Acciones por fila ---

  viewPdf(sheet: AdminSheet): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.sheetService
      .file(sheet.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        (blob) => {
          const url = URL.createObjectURL(blob);
          const win = window.open(url, '_blank');
          if (!win) {
            this.toastr.info('Aviso', 'El navegador bloqueó la pestaña nueva. Permita las ventanas emergentes.');
          }
          // Se libera tras darle tiempo a la pestaña de cargar el Blob
          setTimeout(() => URL.revokeObjectURL(url), 60000);
        },
        () => this.toastr.error('Error', 'No se pudo abrir el PDF de la ficha.'),
      );
  }

  publish(sheet: AdminSheet): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.sheetService
      .publish(sheet.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.registerSuccess('Listo', `Ficha ${sheet.code} publicada.`);
          this.reload();
        },
        (err: HttpErrorResponse) => {
          const errors = this.errorsOf(err);
          this.toastr.error(
            'Error',
            errors ? `No se pudo publicar ${sheet.code}: ${this.describeErrors(errors)}` : 'No se pudo publicar la ficha.',
          );
        },
      );
  }

  askUnpublish(sheet: AdminSheet): void {
    this.startAction({ kind: 'unpublish', sheet });
  }

  askDelete(sheet: AdminSheet): void {
    this.startAction({ kind: 'delete', sheet });
  }

  cancelAction(): void {
    if (!this.submitting) {
      this.pending = null;
    }
  }

  confirmAction(): void {
    const action = this.pending;
    if (!action || this.submitting) {
      return;
    }
    this.submitting = true;
    if (action.kind === 'unpublish') {
      this.sheetService
        .unpublish(action.sheet.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.pending = null;
            this.toastr.registerSuccess('Listo', `Ficha ${action.sheet.code} despublicada.`);
            this.reload();
          },
          () => this.toastr.error('Error', 'No se pudo despublicar la ficha.'),
        );
      return;
    }
    this.sheetService
      .delete(action.sheet.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.pending = null;
          this.toastr.deleteRegister('Listo', `Ficha ${action.sheet.code} borrada.`);
          this.reload();
        },
        () => this.toastr.error('Error', 'No se pudo borrar la ficha.'),
      );
  }

  // --- Edición ---

  edit(sheet: AdminSheet): void {
    if (this.submitting) {
      return;
    }
    this.pending = null;
    this.editing = sheet;
    this.form = {
      title: sheet.title,
      description: sheet.description || '',
      grades: [...sheet.grades],
      areaIds: sheet.areas.map((a) => a.id),
    };
    this.fieldErrors = {};
    this.formError = '';
  }

  cancelEdit(): void {
    if (!this.submitting) {
      this.editing = null;
    }
  }

  hasGrade(value: string): boolean {
    return this.form.grades.indexOf(value) !== -1;
  }

  toggleGrade(value: string, checked: boolean): void {
    this.form.grades = checked
      ? this.form.grades.concat(value)
      : this.form.grades.filter((g) => g !== value);
  }

  get formValid(): boolean {
    return this.form.title.trim().length > 0;
  }

  saveEdit(): void {
    const sheet = this.editing;
    if (!sheet || this.submitting || !this.formValid) {
      return;
    }
    const data: SheetInput = {
      title: this.form.title.trim(),
      description: this.form.description.trim() || null,
      grades: this.form.grades,
      areaIds: this.form.areaIds,
    };
    this.submitting = true;
    this.fieldErrors = {};
    this.formError = '';
    this.sheetService
      .update(sheet.id, data)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.editing = null;
          this.toastr.updateSuccess('Listo', `Ficha ${sheet.code} actualizada.`);
          this.reload();
        },
        (err: HttpErrorResponse) => this.onSaveError(err),
      );
  }

  // --- Presentación ---

  gradeLabel(value: string): string {
    const option = this.gradeOptions.find((g) => g.value === value);
    return option ? option.label : value;
  }

  gradesText(sheet: AdminSheet): string {
    return sheet.grades.length ? sheet.grades.map((g) => this.gradeLabel(g)).join(', ') : '—';
  }

  areasText(sheet: AdminSheet): string {
    return sheet.areas.length ? sheet.areas.map((a) => a.name).join(', ') : '—';
  }

  // --- Privados ---

  private startAction(action: PendingAction): void {
    if (this.submitting) {
      return;
    }
    this.editing = null;
    this.pending = action;
  }

  private errorsOf(err: HttpErrorResponse): ApiErrors | null {
    const body: unknown = err && err.error;
    return body && typeof body === 'object' ? (body as ApiErrors) : null;
  }

  private onSaveError(err: HttpErrorResponse): void {
    const errors = this.errorsOf(err);
    if (!errors) {
      this.formError = 'No se pudo guardar la ficha.';
      this.toastr.error('Error', this.formError);
      return;
    }
    let known = false;
    Object.keys(errors).forEach((field) => {
      (Array.isArray(errors[field]) ? errors[field] : []).forEach((item) => {
        const code = String(item.status);
        if (code === DUPLICATED_CODE) {
          this.formError = 'Ya existe una ficha con ese tipo, serie y número.';
          known = true;
        } else if (code === PUBLISH_REQUIREMENTS_CODE) {
          this.fieldErrors[field] = `Una ficha publicada necesita ${FIELD_LABELS[field] || field}.`;
          known = true;
        }
      });
    });
    if (!known) {
      this.formError = 'No se pudo guardar la ficha. Revise los datos.';
    }
    this.toastr.error('Error', 'No se guardaron los cambios. Revise el formulario.');
  }

  /** Texto legible de los errores de una ficha (lote o publicación individual). */
  private describeErrors(errors: ApiErrors): string {
    const parts: string[] = [];
    Object.keys(errors || {}).forEach((field) => {
      (Array.isArray(errors[field]) ? errors[field] : []).forEach((item) => {
        const code = String(item.status);
        if (code === PUBLISH_REQUIREMENTS_CODE) {
          parts.push(`falta ${FIELD_LABELS[field] || field}`);
        } else if (code === '5') {
          parts.push('la ficha ya no existe');
        } else {
          parts.push(item.msg || `error ${code}`);
        }
      });
    });
    return parts.length ? parts.join('; ') : 'error desconocido';
  }
}
