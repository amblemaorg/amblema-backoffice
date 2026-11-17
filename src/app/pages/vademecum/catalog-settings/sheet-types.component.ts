import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { finalize, takeUntil } from 'rxjs/operators';
import { GRADE_OPTIONS } from 'src/app/_models/vademecum/sheet.model';
import { SheetSeriesInput, SheetType, SheetTypeInput } from 'src/app/_models/vademecum/sheet-type.model';
import { ACTIVE_STATUS, INACTIVE_STATUS } from 'src/app/_models/vademecum/catalog-settings.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, vademecumTableSettings } from '../_shared/vademecum-table';
import { apiErrorMessage, esc, hasErrorCode, HAS_SHEETS_CODE } from './catalog-errors';

const CODE_REGEX = /^[A-Za-z0-9]{1,4}$/;
const COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;
const DEFAULT_COLOR = '#3366FF';

interface SeriesForm {
  id: string | null;
  originalCode: string;
  name: string;
  code: string;
  grades: string[];
}

interface TypeForm {
  id: string | null;
  originalPrefix: string;
  sheetCount: number;
  name: string;
  headerName: string;
  codePrefix: string;
  color: string;
  sectionTitle: string;
  sectionText: string;
  sort: number;
  status: string;
  series: SeriesForm[];
}

/** Pestaña "Tipos de ficha": tabla y panel de alta/edición con series y grados. */
@Component({
  selector: 'app-vademecum-sheet-types',
  templateUrl: './sheet-types.component.html',
  styleUrls: ['./catalog-settings.component.scss'],
})
export class SheetTypesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly gradeOptions = GRADE_OPTIONS;
  readonly activeStatus = ACTIVE_STATUS;
  readonly inactiveStatus = INACTIVE_STATUS;

  types: SheetType[] = [];
  source = new LocalDataSource();
  settings: any = vademecumTableSettings(
    {
      name: { title: 'Nombre', type: 'html', valuePrepareFunction: (v: string) => esc(v) },
      codePrefix: { title: 'Prefijo', type: 'html', valuePrepareFunction: (v: string) => esc(v) },
      color: {
        title: 'Color',
        type: 'html',
        valuePrepareFunction: (v: string) =>
          `<span style="display:inline-block;width:1rem;height:1rem;vertical-align:middle;border:1px solid #edf1f7;border-radius:0.2rem;background-color:${COLOR_REGEX.test(v) ? v : 'transparent'}"></span> ${esc(v)}`,
      },
      sheetCount: { title: 'Fichas' },
      series: { title: 'Series', valuePrepareFunction: (v: any[]) => (v ? v.length : 0), filterFunction: (v: any[], search: string) => String(v ? v.length : 0).includes(String(search)) },
      status: {
        title: 'Estado',
        valuePrepareFunction: (v: string) => (v === ACTIVE_STATUS ? 'Activo' : 'Inactivo'),
        filterFunction: (v: string, search: string) =>
          (v === ACTIVE_STATUS ? 'activo' : 'inactivo').includes(String(search).toLowerCase()),
      },
      sort: { title: 'Orden' },
    },
    [
      { name: 'edit', title: `<span title="Editar">${TABLE_ICONS.edit}</span>` },
      { name: 'delete', title: `<span title="Eliminar">${TABLE_ICONS.delete}</span>` },
    ],
  );
  loading = false;
  failed = false;

  form: TypeForm | null = null;
  submitting = false;
  /** Avisos que exigen confirmación explícita antes de guardar (recalculo de códigos / series ocultas). */
  warnings: string[] | null = null;

  deleting: SheetType | null = null;

  constructor(private taxonomy: VademecumTaxonomyService, private toastr: CustomToastrService) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load(): void {
    this.loading = true;
    this.failed = false;
    this.taxonomy
      .sheetTypes()
      .pipe(finalize(() => (this.loading = false)), takeUntil(this.destroy$))
      .subscribe(
        (types) => {
          this.types = [...types].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
          this.source.load(this.types);
        },
        () => {
          this.failed = true;
          this.toastr.error('Error', 'No se pudo cargar el listado de tipos de ficha.');
        },
      );
  }

  onAction(event: { action: string; data: SheetType }): void {
    if (event.action === 'edit') {
      this.startEdit(event.data);
    } else if (event.action === 'delete') {
      this.askDelete(event.data);
    }
  }

  // --- Alta y edición ---

  startCreate(): void {
    if (this.submitting) {
      return;
    }
    this.deleting = null;
    this.warnings = null;
    const nextSort = this.types.reduce((max, type) => Math.max(max, type.sort), 0) + 1;
    this.form = {
      id: null,
      originalPrefix: '',
      sheetCount: 0,
      name: '',
      headerName: '',
      codePrefix: '',
      color: DEFAULT_COLOR,
      sectionTitle: '',
      sectionText: '',
      sort: nextSort,
      status: ACTIVE_STATUS,
      series: [],
    };
  }

  startEdit(type: SheetType): void {
    if (this.submitting) {
      return;
    }
    this.deleting = null;
    this.warnings = null;
    this.form = {
      id: type.id,
      originalPrefix: type.codePrefix,
      sheetCount: type.sheetCount,
      name: type.name,
      headerName: type.headerName,
      codePrefix: type.codePrefix,
      color: type.color,
      sectionTitle: type.sectionTitle || '',
      sectionText: type.sectionText || '',
      sort: type.sort,
      status: type.status,
      series: [...type.series]
        .sort((a, b) => a.sort - b.sort)
        .map((series) => ({
          id: series.id,
          originalCode: series.code,
          name: series.name,
          code: series.code,
          grades: [...series.grades],
        })),
    };
  }

  cancelForm(): void {
    if (this.submitting) {
      return;
    }
    this.form = null;
    this.warnings = null;
  }

  addSeries(): void {
    if (this.form) {
      this.form.series.push({ id: null, originalCode: '', name: '', code: '', grades: [] });
    }
  }

  toggleGrade(series: SeriesForm, grade: string, checked: boolean): void {
    const has = series.grades.includes(grade);
    if (checked && !has) {
      series.grades = [...series.grades, grade];
    } else if (!checked && has) {
      series.grades = series.grades.filter((item) => item !== grade);
    }
  }

  removeSeries(index: number): void {
    if (this.form) {
      this.form.series.splice(index, 1);
    }
  }

  /** Guardar: si cambian prefijo o códigos de serie con fichas, primero pide confirmación. */
  save(): void {
    const form = this.form;
    if (!form || this.submitting || this.formErrors.length > 0) {
      return;
    }
    const warnings = this.collectWarnings(form);
    if (warnings.length > 0) {
      this.warnings = warnings;
      return;
    }
    this.persist(form);
  }

  confirmSave(): void {
    if (this.form && this.warnings) {
      this.persist(this.form);
    }
  }

  cancelWarnings(): void {
    if (!this.submitting) {
      this.warnings = null;
    }
  }

  // --- Borrado ---

  askDelete(type: SheetType): void {
    if (this.submitting) {
      return;
    }
    this.form = null;
    this.warnings = null;
    this.deleting = type;
  }

  cancelDelete(): void {
    if (!this.submitting) {
      this.deleting = null;
    }
  }

  confirmDelete(): void {
    const type = this.deleting;
    if (!type || this.submitting) {
      return;
    }
    this.submitting = true;
    this.taxonomy
      .deleteSheetType(type.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.deleting = null;
          this.toastr.registerSuccess('Listo', `Tipo "${type.name}" eliminado.`);
          this.load();
        },
        (err: HttpErrorResponse) => {
          this.deleting = null;
          if (hasErrorCode(err, HAS_SHEETS_CODE)) {
            this.toastr.error(
              'No se puede eliminar',
              `El tipo "${type.name}" tiene fichas. Muévalas a otro tipo o márquelo como inactivo.`,
            );
            this.load();
            return;
          }
          this.toastr.error('Error', apiErrorMessage(err, 'No se pudo eliminar el tipo.'));
        },
      );
  }

  // --- Validación ---

  get formErrors(): string[] {
    const form = this.form;
    if (!form) {
      return [];
    }
    const errors: string[] = [];
    const name = form.name.trim();
    if (!name || name.length > 60) {
      errors.push('El nombre es obligatorio (máximo 60 caracteres).');
    }
    const header = form.headerName.trim();
    if (!header || header.length > 60) {
      errors.push('El texto de encabezado es obligatorio (máximo 60 caracteres).');
    }
    if (!CODE_REGEX.test(form.codePrefix.trim())) {
      errors.push('El prefijo debe tener de 1 a 4 letras o números, sin espacios.');
    }
    if (!COLOR_REGEX.test(form.color.trim())) {
      errors.push('El color debe tener el formato #RRGGBB.');
    }
    if (form.sectionTitle.length > 150) {
      errors.push('El título de sección admite hasta 150 caracteres.');
    }
    if (form.sectionText.length > 5000) {
      errors.push('El texto de sección admite hasta 5000 caracteres.');
    }
    if (!Number.isInteger(form.sort)) {
      errors.push('El orden debe ser un número entero.');
    }
    const codes = new Set<string>();
    form.series.forEach((series, index) => {
      const position = `Serie ${index + 1}`;
      const seriesName = series.name.trim();
      if (!seriesName || seriesName.length > 60) {
        errors.push(`${position}: el nombre es obligatorio (máximo 60 caracteres).`);
      }
      const code = series.code.trim();
      if (!CODE_REGEX.test(code)) {
        errors.push(`${position}: el código debe tener de 1 a 4 letras o números.`);
      } else if (codes.has(code.toUpperCase())) {
        errors.push(`${position}: el código "${code}" está repetido.`);
      } else {
        codes.add(code.toUpperCase());
      }
    });
    return errors;
  }

  get colorValid(): boolean {
    return !!this.form && COLOR_REGEX.test(this.form.color.trim());
  }

  // --- Presentación ---

  gradeLabel(value: string): string {
    const option = GRADE_OPTIONS.find((item) => item.value === value);
    return option ? option.label : value;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // --- Privados ---

  private collectWarnings(form: TypeForm): string[] {
    if (!form.id || form.sheetCount === 0) {
      return [];
    }
    const warnings: string[] = [];
    const prefix = form.codePrefix.trim().toUpperCase();
    if (prefix !== form.originalPrefix.toUpperCase()) {
      warnings.push(
        `El prefijo cambia de "${form.originalPrefix}" a "${prefix}": se recalcularán los códigos de las ${form.sheetCount} fichas de este tipo.`,
      );
    }
    form.series.forEach((series) => {
      if (series.id && series.code.trim().toUpperCase() !== series.originalCode.toUpperCase()) {
        warnings.push(
          `El código de la serie "${series.name.trim()}" cambia de "${series.originalCode}" a "${series.code.trim().toUpperCase()}": se recalcularán los códigos de sus fichas.`,
        );
      }
    });
    return warnings;
  }

  private toInput(form: TypeForm): SheetTypeInput {
    const series: SheetSeriesInput[] = form.series.map((item, index) => {
      const payload: SheetSeriesInput = {
        name: item.name.trim(),
        code: item.code.trim().toUpperCase(),
        grades: item.grades,
        sort: index + 1,
      };
      if (item.id) {
        payload.id = item.id;
      }
      return payload;
    });
    return {
      name: form.name.trim(),
      headerName: form.headerName.trim(),
      codePrefix: form.codePrefix.trim().toUpperCase(),
      color: form.color.trim(),
      sectionTitle: form.sectionTitle.trim() || null,
      sectionText: form.sectionText.trim() || null,
      sort: form.sort,
      status: form.status,
      series,
    };
  }

  private persist(form: TypeForm): void {
    this.submitting = true;
    const input = this.toInput(form);
    const request$ = form.id ? this.taxonomy.updateSheetType(form.id, input) : this.taxonomy.createSheetType(input);
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      (saved) => {
        this.form = null;
        this.warnings = null;
        this.toastr.registerSuccess('Listo', `Tipo "${saved.name}" ${form.id ? 'actualizado' : 'creado'}.`);
        this.load();
      },
      (err: HttpErrorResponse) => {
        this.warnings = null;
        this.toastr.error(
          'Error',
          apiErrorMessage(err, 'No se pudo guardar el tipo.', 'Ya existe un tipo con ese prefijo.'),
        );
      },
    );
  }
}
