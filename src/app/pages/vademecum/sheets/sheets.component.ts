import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, finalize, takeUntil } from 'rxjs/operators';
import {
  AdminSheet,
  areaAppliesTo,
  ApiErrors,
  Area,
  GRADE_OPTIONS,
  SheetInput,
  SheetStatus,
  SHEET_STATUS_LABELS,
} from 'src/app/_models/vademecum/sheet.model';
import { SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { OpenedCompendium, VademecumPdfService } from 'src/app/services/vademecum/vademecum-pdf.service';
import { VademecumSheetService } from 'src/app/services/vademecum/vademecum-sheet.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { AREA_CHECK_SETTINGS, CheckOption, checkedIds } from '../_shared/vademecum-checks';
import { iconAction, VademecumServerSource, VademecumTableSources, vademecumTableSettings } from '../_shared/vademecum-table';
import { confirmAction, hideModal, showModal } from '../_shared/vademecum-dialogs';

const DUPLICATED_CODE = '112';
const PUBLISH_REQUIREMENTS_CODE = '113';
const AREA_TYPE_CODE = '121';

/** Mensajes en español por campo para los errores 112/113 (y genérico). */
const FIELD_LABELS: { [field: string]: string } = {
  description: 'la descripción',
  grades: 'al menos un grado',
  file: 'el archivo PDF generado',
  number: 'el número',
};

/** Páginas que se dibujan en la ventana de edición (las fichas suelen tener 1–4). */
const MAX_PREVIEW_PAGES = 6;

interface EditForm {
  title: string;
  description: string;
  grades: string[];
  status: SheetStatus;
}

/** Vademécum › Fichas (BO-06): filtrar, editar, publicar, despublicar y borrar fichas. */
@Component({
  selector: 'app-vademecum-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.scss'],
})
export class SheetsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly search$ = new Subject<void>();

  readonly formId = 'vademecum-sheet-form';
  readonly gradeOptions = GRADE_OPTIONS;
  readonly statusLabels = SHEET_STATUS_LABELS;
  types: SheetType[] = [];
  areas: Area[] = [];
  readonly areaSettings = AREA_CHECK_SETTINGS;
  /** Áreas que ofrece la ventana de edición: solo las del tipo de la ficha. */
  areaChecks: CheckOption[] = [];
  /** Áreas marcadas en la ventana de edición (la lista trabaja con objetos {id, text}). */
  checkedAreas: CheckOption[] = [];

  // Filtros
  status: SheetStatus | null = null;
  sheetTypeId: string | null = null;
  query = '';

  // Tabla (paginada en el servidor)
  source: VademecumServerSource;
  settings: any;

  // Acción puntual en curso
  submitting = false;

  // Edición en ventana
  editing: AdminSheet | null = null;
  form: EditForm = { title: '', description: '', grades: [], status: 'draft' };
  fieldErrors: { [field: string]: string } = {};
  formError = '';
  /** Miniaturas (data URL) de las páginas de la ficha en edición, para reconocerla. */
  pageThumbnails: string[] = [];
  pagesState: 'loading' | 'ready' | 'error' | 'none' = 'none';
  /** PDF ya descargado para las miniaturas: "Ver PDF" lo reusa sin pedirlo de nuevo. */
  private editingPdf: Blob | null = null;
  /** Cambia al abrir otra ficha o al salir: descarta miniaturas de una carga anterior. */
  private pagesToken = 0;

  constructor(
    private tableSources: VademecumTableSources,
    private sheetService: VademecumSheetService,
    private taxonomy: VademecumTaxonomyService,
    private toastr: CustomToastrService,
    private modals: BsModalService,
    private pdfService: VademecumPdfService,
  ) {
    this.source = this.tableSources.create('sheets', this.filters());
    this.settings = vademecumTableSettings(
        {
          code: { title: 'Código' },
          title: { title: 'Título' },
          type: {
            title: 'Tipo',
            valuePrepareFunction: (_: any, s: AdminSheet) => (s.sheetType ? s.sheetType.name : '—'),
          },
          grades: { title: 'Grados', valuePrepareFunction: (_: any, s: AdminSheet) => this.gradesText(s) },
          areas: { title: 'Áreas', valuePrepareFunction: (_: any, s: AdminSheet) => this.areasText(s) },
          status: {
            title: 'Estatus',
            valuePrepareFunction: (_: any, s: AdminSheet) =>
              this.statusLabels[s.status] ? this.statusLabels[s.status].label : s.status,
          },
          publishedAt: {
            title: 'Publicada',
            valuePrepareFunction: (_: any, s: AdminSheet) =>
              s.publishedAt ? new DatePipe('en-US').transform(s.publishedAt, 'dd/MM/yyyy') : '—',
          },
        },
        [
          // Mismo trío que BaseTable: ver (aquí, el PDF), editar y eliminar
          iconAction('pdf', 'view', 'Ver PDF'),
          iconAction('edit', 'edit', 'Editar'),
          iconAction('delete', 'delete', 'Eliminar'),
        ],
        true,
      );
  }

  ngOnInit(): void {
    this.search$.pipe(debounceTime(350), takeUntil(this.destroy$)).subscribe(() => this.applyFilters());
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
    this.pagesToken++;
    hideModal(this.formId);
    this.destroy$.next();
    this.destroy$.complete();
  }

  // --- Listado ---

  private filters(): { [key: string]: any } {
    return { status: this.status, sheetTypeId: this.sheetTypeId, q: this.query.trim() };
  }

  applyFilters(): void {
    this.source.setFilters(this.filters());
  }

  onSearch(): void {
    this.search$.next();
  }

  private reload(): void {
    this.source.refresh();
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
      case 'delete':
        this.askDelete(sheet);
        break;
    }
  }

  // --- Acciones por fila ---

  viewPdf(sheet: AdminSheet): void {
    if (this.editing && this.editing.id === sheet.id && this.editingPdf) {
      this.openPdf(this.editingPdf);
      return;
    }
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.sheetService
      .file(sheet.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        (blob) => this.openPdf(blob),
        () => this.toastr.error('Error', 'No se pudo abrir el PDF de la ficha.'),
      );
  }

  private openPdf(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (!win) {
      this.toastr.info('Aviso', 'El navegador bloqueó la pestaña nueva. Permita las ventanas emergentes.');
    }
    // Se libera tras darle tiempo a la pestaña de cargar el Blob
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }

  askDelete(sheet: AdminSheet): void {
    if (this.submitting) {
      return;
    }
    const confirmation = confirmAction(
      this.modals,
      'Eliminar ficha',
      `¿Desea eliminar la ficha ${sheet.code} · ${sheet.title}?`,
      'Dejará de aparecer en el listado y en el catálogo. Las descargas registradas se conservan.',
    );
    confirmation.confirmed$.subscribe(() => {
      this.submitting = true;
      this.sheetService
        .delete(sheet.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            confirmation.close();
            this.toastr.deleteRegister('Listo', `Ficha ${sheet.code} eliminada.`);
            this.reload();
          },
          () => {
            confirmation.close();
            this.toastr.error('Error', 'No se pudo eliminar la ficha.');
          },
        );
    });
  }

  // --- Edición ---

  edit(sheet: AdminSheet): void {
    if (this.submitting) {
      return;
    }
    this.editing = sheet;
    this.form = {
      title: sheet.title,
      description: sheet.description || '',
      grades: [...sheet.grades],
      status: sheet.status,
    };
    const typeId = sheet.sheetType ? sheet.sheetType.id : null;
    this.areaChecks = this.areas
      .filter((area) => areaAppliesTo(area, typeId))
      .map((area) => ({ id: area.id, text: area.name }));
    // Las áreas inactivas de la ficha no están en la lista, pero se conservan al guardar
    this.checkedAreas = sheet.areas.map((area) => ({ id: area.id, text: area.name }));
    this.fieldErrors = {};
    this.formError = '';
    this.loadPages(sheet);
    showModal(this.formId);
  }

  /** Extra de páginas que no se dibujan. */
  get hiddenPages(): number {
    const total = this.editing && this.editing.pageCount ? this.editing.pageCount : 0;
    return this.pagesState === 'ready' ? Math.max(0, total - this.pageThumbnails.length) : 0;
  }

  /**
   * Dibuja las primeras páginas del PDF de la ficha con pdf.js, como en Cargar fichas. Usa el
   * PDF de administración (sirve también para borradores y no cuenta como descarga).
   */
  private loadPages(sheet: AdminSheet): void {
    const token = ++this.pagesToken;
    this.pageThumbnails = [];
    this.editingPdf = null;
    if (sheet.fileStatus !== 'ready') {
      this.pagesState = 'none';
      return;
    }
    this.pagesState = 'loading';
    const failed = () => {
      if (token === this.pagesToken) {
        this.pagesState = 'error';
      }
    };
    this.sheetService
      .file(sheet.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (blob) => {
        if (token === this.pagesToken) {
          this.editingPdf = blob;
        }
        let pdf: OpenedCompendium | null = null;
        try {
          pdf = await this.pdfService.open(blob);
          const count = Math.min(pdf.pageCount, MAX_PREVIEW_PAGES);
          for (let index = 0; index < count; index++) {
            const url = await pdf.thumbnail(index);
            if (token !== this.pagesToken) {
              return;
            }
            this.pageThumbnails = [...this.pageThumbnails, url];
          }
          this.pagesState = 'ready';
        } catch (error) {
          failed();
        } finally {
          if (pdf) {
            pdf.close();
          }
        }
      }, failed);
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
      areaIds: checkedIds(this.checkedAreas),
    };
    const target = this.form.status;
    const update$ = this.sheetService.update(sheet.id, data);
    // Publicar después de guardar (la API exige descripción y grados ya guardados); despublicar
    // antes, para que quitar la descripción de una ficha que deja de estar publicada no dé 113
    let request$: Observable<unknown> = update$;
    if (target === 'published' && sheet.status !== 'published') {
      request$ = update$.pipe(concatMap(() => this.sheetService.publish(sheet.id)));
    } else if (target === 'unpublished' && sheet.status === 'published') {
      request$ = this.sheetService.unpublish(sheet.id).pipe(concatMap(() => update$));
    }
    this.submitting = true;
    this.fieldErrors = {};
    this.formError = '';
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      () => {
        hideModal(this.formId);
        this.editing = null;
        this.toastr.updateSuccess('Listo', `Ficha ${sheet.code} actualizada${this.statusChangeText(sheet, target)}.`);
        this.reload();
      },
      (err: HttpErrorResponse) => {
        // Los datos pudieron guardarse aunque falle publicar: la tabla debe mostrarlos
        this.reload();
        this.onSaveError(err);
      },
    );
  }

  /** Estatus que puede elegir: una ficha publicada no vuelve a borrador. */
  get statusOptions(): SheetStatus[] {
    if (!this.editing) {
      return [];
    }
    return this.editing.status === 'draft' ? ['draft', 'published'] : ['published', 'unpublished'];
  }

  private statusChangeText(sheet: AdminSheet, target: SheetStatus): string {
    if (target === sheet.status) {
      return '';
    }
    return target === 'published' ? ' y publicada' : ' y despublicada';
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
          this.formError = 'Ya existe una ficha con ese tipo y número.';
          known = true;
        } else if (code === AREA_TYPE_CODE) {
          this.fieldErrors.areaIds = 'Alguna área no corresponde al tipo de la ficha.';
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
}
