import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import { SheetType, SheetTypeInput } from 'src/app/_models/vademecum/sheet-type.model';
import { ACTIVE_STATUS, INACTIVE_STATUS } from 'src/app/_models/vademecum/catalog-settings.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, vademecumTableSettings } from '../_shared/vademecum-table';
import { confirmAction, hideModal, showModal } from '../_shared/vademecum-dialogs';
import { apiErrorMessage, esc, hasErrorCode, HAS_SHEETS_CODE } from './catalog-errors';

const CODE_REGEX = /^[A-Za-z0-9]{1,4}$/;
const COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;
const DEFAULT_COLOR = '#3366FF';

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
}

/** Pestaña "Tipos de ficha": tabla con "Registrar" y formulario en ventana, como los CRUD del backoffice. */
@Component({
  selector: 'app-vademecum-sheet-types',
  templateUrl: './sheet-types.component.html',
  styleUrls: ['./catalog-settings.component.scss'],
})
export class SheetTypesComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly formId = 'vademecum-sheet-type-form';
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
      status: {
        title: 'Estatus',
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

  constructor(
    private taxonomy: VademecumTaxonomyService,
    private toastr: CustomToastrService,
    private modals: BsModalService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    hideModal(this.formId);
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
    };
    showModal(this.formId);
  }

  startEdit(type: SheetType): void {
    if (this.submitting) {
      return;
    }
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
    };
    showModal(this.formId);
  }

  /** Guardar: si cambia el prefijo de un tipo con fichas, primero pide confirmación. */
  save(): void {
    const form = this.form;
    if (!form || this.submitting || this.formErrors.length > 0) {
      return;
    }
    const prefix = form.codePrefix.trim().toUpperCase();
    if (form.id && form.sheetCount > 0 && prefix !== form.originalPrefix.toUpperCase()) {
      const confirmation = confirmAction(
        this.modals,
        'Cambiar prefijo',
        `¿Desea cambiar el prefijo de "${form.originalPrefix}" a "${prefix}"?`,
        `Se recalcularán los códigos de las ${form.sheetCount} fichas de este tipo.`,
        true,
      );
      confirmation.confirmed$.subscribe(() => {
        confirmation.close();
        this.persist(form);
      });
      return;
    }
    this.persist(form);
  }

  // --- Borrado ---

  askDelete(type: SheetType): void {
    if (this.submitting) {
      return;
    }
    if (type.sheetCount > 0) {
      this.toastr.error(
        'No se puede eliminar',
        `El tipo "${type.name}" tiene ${type.sheetCount} ficha(s). Muévalas a otro tipo o márquelo como inactivo.`,
      );
      return;
    }
    const confirmation = confirmAction(this.modals, 'Eliminar tipo de ficha', '¿Desea eliminar el tipo seleccionado?');
    confirmation.confirmed$.subscribe(() => {
      this.submitting = true;
      this.taxonomy
        .deleteSheetType(type.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            confirmation.close();
            this.toastr.registerSuccess('Listo', `Tipo "${type.name}" eliminado.`);
            this.load();
          },
          (err: HttpErrorResponse) => {
            confirmation.close();
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
    });
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
    return errors;
  }

  get colorValid(): boolean {
    return !!this.form && COLOR_REGEX.test(this.form.color.trim());
  }

  // --- Privados ---

  private toInput(form: TypeForm): SheetTypeInput {
    return {
      name: form.name.trim(),
      headerName: form.headerName.trim(),
      codePrefix: form.codePrefix.trim().toUpperCase(),
      color: form.color.trim(),
      sectionTitle: form.sectionTitle.trim() || null,
      sectionText: form.sectionText.trim() || null,
      sort: form.sort,
      status: form.status,
    };
  }

  private persist(form: TypeForm): void {
    this.submitting = true;
    const input = this.toInput(form);
    const request$ = form.id ? this.taxonomy.updateSheetType(form.id, input) : this.taxonomy.createSheetType(input);
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      (saved) => {
        hideModal(this.formId);
        this.form = null;
        this.toastr.registerSuccess('Listo', `Tipo "${saved.name}" ${form.id ? 'actualizado' : 'creado'}.`);
        this.load();
      },
      (err: HttpErrorResponse) =>
        this.toastr.error(
          'Error',
          apiErrorMessage(err, 'No se pudo guardar el tipo.', 'Ya existe un tipo con ese prefijo.'),
        ),
    );
  }
}
