import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize, takeUntil } from 'rxjs/operators';
import { ACTIVE_STATUS, AdminArea, AreaInput, INACTIVE_STATUS } from 'src/app/_models/vademecum/catalog-settings.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, vademecumTableSettings } from '../_shared/vademecum-table';
import { AREA_CHECK_SETTINGS, CheckOption, checkedIds } from '../_shared/vademecum-checks';
import { confirmAction, hideModal, showModal } from '../_shared/vademecum-dialogs';
import { apiErrorMessage, esc } from './catalog-errors';

interface AreaForm {
  id: string | null;
  name: string;
  sort: number;
  status: string;
  /** Tipos marcados (la lista con casillas trabaja con objetos {id, text}). */
  sheetTypes: CheckOption[];
}

/** Pestaña "Áreas": "Registrar", formulario en ventana y borrado con confirmación (se quita de las fichas). */
@Component({
  selector: 'app-vademecum-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./catalog-settings.component.scss'],
})
export class AreasComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly formId = 'vademecum-area-form';
  readonly typeSettings = {
    ...AREA_CHECK_SETTINGS,
    selectAllText: 'Seleccionar todos',
    unSelectAllText: 'Quitar todos',
    noDataAvailablePlaceholderText: 'No hay tipos de ficha',
  };
  typeChecks: CheckOption[] = [];
  readonly activeStatus = ACTIVE_STATUS;
  readonly inactiveStatus = INACTIVE_STATUS;

  areas: AdminArea[] = [];
  source = new LocalDataSource();
  settings: any = vademecumTableSettings(
    {
      name: { title: 'Nombre', type: 'html', valuePrepareFunction: (v: string) => esc(v) },
      sheetTypes: {
        title: 'Tipos de ficha',
        type: 'html',
        valuePrepareFunction: (types: { name: string }[]) =>
          esc((types || []).map((type) => type.name).join(', ') || '—'),
        filterFunction: (types: { name: string }[], search: string) =>
          (types || []).some((type) => type.name.toLowerCase().includes(String(search).toLowerCase())),
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

  form: AreaForm | null = null;
  submitting = false;

  constructor(
    private taxonomy: VademecumTaxonomyService,
    private toastr: CustomToastrService,
    private modals: BsModalService,
  ) {}

  ngOnInit(): void {
    this.load();
    this.taxonomy
      .sheetTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (types) =>
          (this.typeChecks = [...types]
            .sort((a, b) => a.sort - b.sort)
            .map((type) => ({ id: type.id, text: type.name }))),
        () => this.toastr.error('Error', 'No se pudieron cargar los tipos de ficha.'),
      );
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
      .adminAreas()
      .pipe(finalize(() => (this.loading = false)), takeUntil(this.destroy$))
      .subscribe(
        (areas) => {
          this.areas = [...areas].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
          this.source.load(this.areas);
        },
        () => {
          this.failed = true;
          this.toastr.error('Error', 'No se pudo cargar el listado de áreas.');
        },
      );
  }

  onAction(event: { action: string; data: AdminArea }): void {
    if (event.action === 'edit') {
      this.startEdit(event.data);
    } else if (event.action === 'delete') {
      this.askDelete(event.data);
    }
  }

  startCreate(): void {
    if (this.submitting) {
      return;
    }
    const nextSort = this.areas.reduce((max, area) => Math.max(max, area.sort), 0) + 1;
    this.form = { id: null, name: '', sort: nextSort, status: ACTIVE_STATUS, sheetTypes: [] };
    showModal(this.formId);
  }

  startEdit(area: AdminArea): void {
    if (this.submitting) {
      return;
    }
    this.form = {
      id: area.id,
      name: area.name,
      sort: area.sort,
      status: area.status,
      sheetTypes: (area.sheetTypes || []).map((type) => ({ id: type.id, text: type.name })),
    };
    showModal(this.formId);
  }

  get nameError(): string | null {
    if (!this.form) {
      return null;
    }
    const name = this.form.name.trim();
    if (!name) {
      return 'El nombre es obligatorio.';
    }
    return name.length > 80 ? 'El nombre admite hasta 80 caracteres.' : null;
  }

  get typesError(): string | null {
    return this.form && !(this.form.sheetTypes || []).length ? 'Elija al menos un tipo de ficha.' : null;
  }

  get formValid(): boolean {
    return !!this.form && !this.nameError && !this.typesError && Number.isInteger(this.form.sort);
  }

  /** Guardar: si a un área con fichas se le quita un tipo, sale de esas fichas; se confirma antes. */
  save(): void {
    const form = this.form;
    if (!form || this.submitting || !this.formValid) {
      return;
    }
    const area = form.id ? this.areas.find((item) => item.id === form.id) : null;
    const kept = checkedIds(form.sheetTypes);
    const removed = area && area.sheetCount ? area.sheetTypes.filter((type) => !kept.includes(type.id)) : [];
    if (removed.length) {
      const confirmation = confirmAction(
        this.modals,
        'Quitar tipos de ficha',
        `¿Desea quitar ${removed.map((type) => `"${type.name}"`).join(', ')} del área "${form.name.trim()}"?`,
        'El área se quitará de las fichas de esos tipos que la tengan.',
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

  private persist(form: AreaForm): void {
    const input: AreaInput = {
      name: form.name.trim(),
      sort: form.sort,
      status: form.status,
      sheetTypeIds: checkedIds(form.sheetTypes),
    };
    const request$ = form.id ? this.taxonomy.updateArea(form.id, input) : this.taxonomy.createArea(input);
    this.submitting = true;
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      (saved) => {
        hideModal(this.formId);
        this.form = null;
        this.toastr.registerSuccess('Listo', `Área "${saved.name}" ${form.id ? 'actualizada' : 'creada'}.`);
        this.load();
      },
      (err: HttpErrorResponse) =>
        this.toastr.error('Error', apiErrorMessage(err, 'No se pudo guardar el área.', 'Ya existe un área con ese nombre.')),
    );
  }

  askDelete(area: AdminArea): void {
    if (this.submitting) {
      return;
    }
    const info = area.sheetCount
      ? `El área se quitará de ${area.sheetCount === 1 ? 'la ficha que la usa' : 'las ' + area.sheetCount + ' fichas que la usan'}.`
      : undefined;
    const confirmation = confirmAction(this.modals, 'Eliminar área', '¿Desea eliminar el área seleccionada?', info);
    confirmation.confirmed$.subscribe(() => {
      this.submitting = true;
      this.taxonomy
        .deleteArea(area.id)
        .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
        .subscribe(
          () => {
            confirmation.close();
            this.toastr.registerSuccess('Listo', `Área "${area.name}" eliminada y retirada de sus fichas.`);
            this.load();
          },
          (err: HttpErrorResponse) => {
            confirmation.close();
            this.toastr.error('Error', apiErrorMessage(err, 'No se pudo eliminar el área.'));
          },
        );
    });
  }
}
