import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { finalize, takeUntil } from 'rxjs/operators';
import { ACTIVE_STATUS, AdminArea, AreaInput, INACTIVE_STATUS } from 'src/app/_models/vademecum/catalog-settings.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, vademecumTableSettings } from '../_shared/vademecum-table';
import { apiErrorMessage, esc } from './catalog-errors';

interface AreaForm {
  id: string | null;
  name: string;
  sort: number;
  status: string;
}

/** Pestaña "Áreas": crear, renombrar y borrar (al borrar se quita de las fichas). */
@Component({
  selector: 'app-vademecum-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./catalog-settings.component.scss'],
})
export class AreasComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly activeStatus = ACTIVE_STATUS;
  readonly inactiveStatus = INACTIVE_STATUS;

  areas: AdminArea[] = [];
  source = new LocalDataSource();
  settings: any = vademecumTableSettings(
    {
      name: { title: 'Nombre', type: 'html', valuePrepareFunction: (v: string) => esc(v) },
      sheetCount: { title: 'Fichas' },
      status: {
        title: 'Estado',
        valuePrepareFunction: (v: string) => (v === ACTIVE_STATUS ? 'Activa' : 'Inactiva'),
        filterFunction: (v: string, search: string) =>
          (v === ACTIVE_STATUS ? 'activa' : 'inactiva').includes(String(search).toLowerCase()),
      },
      sort: { title: 'Orden' },
    },
    [
      { name: 'edit', title: `<span title="Renombrar / editar">${TABLE_ICONS.edit}</span>` },
      { name: 'delete', title: `<span title="Eliminar">${TABLE_ICONS.delete}</span>` },
    ],
  );
  loading = false;
  failed = false;

  form: AreaForm | null = null;
  deleting: AdminArea | null = null;
  submitting = false;

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
    this.deleting = null;
    const nextSort = this.areas.reduce((max, area) => Math.max(max, area.sort), 0) + 1;
    this.form = { id: null, name: '', sort: nextSort, status: ACTIVE_STATUS };
  }

  startEdit(area: AdminArea): void {
    if (this.submitting) {
      return;
    }
    this.deleting = null;
    this.form = { id: area.id, name: area.name, sort: area.sort, status: area.status };
  }

  cancelForm(): void {
    if (!this.submitting) {
      this.form = null;
    }
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

  get formValid(): boolean {
    return !!this.form && !this.nameError && Number.isInteger(this.form.sort);
  }

  save(): void {
    const form = this.form;
    if (!form || this.submitting || !this.formValid) {
      return;
    }
    const input: AreaInput = { name: form.name.trim(), sort: form.sort, status: form.status };
    const request$ = form.id ? this.taxonomy.updateArea(form.id, input) : this.taxonomy.createArea(input);
    this.submitting = true;
    request$.pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$)).subscribe(
      (saved) => {
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
    this.form = null;
    this.deleting = area;
  }

  cancelDelete(): void {
    if (!this.submitting) {
      this.deleting = null;
    }
  }

  confirmDelete(): void {
    const area = this.deleting;
    if (!area || this.submitting) {
      return;
    }
    this.submitting = true;
    this.taxonomy
      .deleteArea(area.id)
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.deleting = null;
          this.toastr.registerSuccess('Listo', `Área "${area.name}" eliminada y retirada de sus fichas.`);
          this.load();
        },
        (err: HttpErrorResponse) => {
          this.deleting = null;
          this.toastr.error('Error', apiErrorMessage(err, 'No se pudo eliminar el área.'));
        },
      );
  }

}
