import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';
import {
  AdminSheet,
  Area,
  GRADE_OPTIONS,
  SHEET_STATUS_LABELS,
  SheetInput,
} from 'src/app/_models/vademecum/sheet.model';
import { SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import { VademecumSheetService } from 'src/app/services/vademecum/vademecum-sheet.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

/**
 * Datos de cada ficha generada (BO-05): número y título (vienen del encabezado), tipo y serie,
 * categoría (áreas), grados y descripción. Se guardan una por una y se publican sueltas o
 * en lote (lo que falte para publicar lo informa la API con el código 113).
 */
@Component({
  selector: 'app-vademecum-sheet-editor',
  templateUrl: './sheet-editor.component.html',
  styleUrls: ['./sheet-editor.component.scss'],
})
export class SheetEditorComponent implements OnChanges, OnDestroy {
  @Input() uploadId: string;

  readonly gradeOptions = GRADE_OPTIONS;
  readonly statusLabels = SHEET_STATUS_LABELS;
  sheets: AdminSheet[] = [];
  sheetTypes: SheetType[] = [];
  areas: Area[] = [];
  forms = new FormArray([]);
  errors: { [sheetId: string]: string[] } = {};
  savingId: string | null = null;
  publishing = false;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private sheetService: VademecumSheetService,
    private taxonomyService: VademecumTaxonomyService,
    private toastr: CustomToastrService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uploadId && this.uploadId) {
      this.load();
    }
  }

  /** `keepErrors`: tras publicar en lote se conservan los avisos de lo que faltó. */
  load(keepErrors = false): void {
    this.subscriptions.add(
      forkJoin([
        this.sheetService.listByUpload(this.uploadId),
        this.taxonomyService.sheetTypes(),
        this.taxonomyService.areas(),
      ]).subscribe(
        ([list, types, areas]) => {
          this.sheetTypes = types;
          this.areas = areas.filter((area) => area.status === '1');
          this.sheets = list.records;
          this.forms = new FormArray(this.sheets.map((sheet) => this.buildForm(sheet)));
          if (!keepErrors) {
            this.errors = {};
          }
        },
        () => this.toastr.error('Error', 'No se pudieron cargar las fichas de la carga.'),
      ),
    );
  }

  private buildForm(sheet: AdminSheet): FormGroup {
    const form = this.fb.group({
      number: [sheet.number, [Validators.required, Validators.min(1), Validators.max(999)]],
      title: [sheet.title, [Validators.required, Validators.maxLength(150)]],
      sheetTypeId: [sheet.sheetType ? sheet.sheetType.id : null, Validators.required],
      seriesId: [sheet.series ? sheet.series.id : null],
      areaIds: [sheet.areas.map((area) => area.id)],
      grades: [[...sheet.grades]],
      description: [sheet.description || '', Validators.maxLength(2000)],
    });
    // Cambiar de tipo obliga a elegir de nuevo la serie (cambia el código de la ficha)
    this.subscriptions.add(
      form.get('sheetTypeId').valueChanges.subscribe(() => form.get('seriesId').setValue(null)),
    );
    return form;
  }

  formAt(index: number): FormGroup {
    return this.forms.at(index) as FormGroup;
  }

  seriesFor(index: number) {
    const type = this.sheetTypes.find((item) => item.id === this.formAt(index).value.sheetTypeId);
    return type ? type.series : [];
  }

  /** "Todos" excluye los grados sueltos y al revés. */
  onGradesChange(index: number, grades: string[]): void {
    const control = this.formAt(index).get('grades');
    const previous: string[] = control.value || [];
    if (grades.includes('all') && !previous.includes('all')) {
      control.setValue(['all']);
    } else if (grades.length > 1 && grades.includes('all')) {
      control.setValue(grades.filter((grade) => grade !== 'all'));
    }
  }

  save(index: number): void {
    const form = this.formAt(index);
    const sheet = this.sheets[index];
    if (form.invalid || this.savingId) {
      form.markAllAsTouched();
      return;
    }
    const value = form.value;
    const data: SheetInput = {
      number: Number(value.number),
      title: value.title.trim(),
      description: value.description.trim() || null,
      grades: value.grades,
      areaIds: value.areaIds,
      sheetTypeId: value.sheetTypeId,
      seriesId: value.seriesId || null,
    };
    this.savingId = sheet.id;
    this.subscriptions.add(
      this.sheetService.update(sheet.id, data).subscribe(
        (updated) => {
          this.savingId = null;
          this.replace(index, updated);
          form.markAsPristine();
          this.toastr.updateSuccess('Ficha guardada', updated.code);
        },
        (error: HttpErrorResponse) => {
          this.savingId = null;
          this.errors[sheet.id] = this.messages(error);
        },
      ),
    );
  }

  publish(index: number): void {
    const sheet = this.sheets[index];
    if (this.formAt(index).dirty) {
      this.errors[sheet.id] = ['Guarde los cambios antes de publicar.'];
      return;
    }
    this.savingId = sheet.id;
    this.subscriptions.add(
      this.sheetService.publish(sheet.id).subscribe(
        (updated) => {
          this.savingId = null;
          this.replace(index, updated);
          this.toastr.updateSuccess('Ficha publicada', updated.code);
        },
        (error: HttpErrorResponse) => {
          this.savingId = null;
          this.errors[sheet.id] = this.messages(error);
        },
      ),
    );
  }

  get draftIds(): string[] {
    return this.sheets
      .filter((sheet, i) => sheet.status !== 'published' && !this.formAt(i).dirty)
      .map((sheet) => sheet.id);
  }

  publishAll(): void {
    const ids = this.draftIds;
    if (!ids.length || this.publishing) {
      return;
    }
    this.publishing = true;
    this.subscriptions.add(
      this.sheetService.publishMany(ids).subscribe(
        (result) => {
          this.publishing = false;
          this.errors = {};
          result.failed.forEach((item) => (this.errors[item.sheetId] = this.fieldMessages(item.errors)));
          if (result.published.length) {
            this.toastr.updateSuccess('Fichas publicadas', `${result.published.length} de ${ids.length}`);
          }
          if (result.failed.length) {
            this.toastr.info('Faltan datos', `${result.failed.length} fichas no se publicaron.`);
          }
          this.load(true);
        },
        () => {
          this.publishing = false;
          this.toastr.error('Error', 'No se pudieron publicar las fichas.');
        },
      ),
    );
  }

  viewPdf(sheet: AdminSheet): void {
    // Se abre la pestaña antes de la petición para que el navegador no la bloquee
    const tab = window.open('', '_blank');
    this.subscriptions.add(
      this.sheetService.file(sheet.id).subscribe(
        (blob) => {
          const url = URL.createObjectURL(blob);
          if (tab) {
            tab.location.href = url;
          }
          setTimeout(() => URL.revokeObjectURL(url), 60000);
        },
        () => {
          if (tab) {
            tab.close();
          }
          this.toastr.error('Error', 'No se pudo abrir el PDF de la ficha.');
        },
      ),
    );
  }

  private replace(index: number, sheet: AdminSheet): void {
    this.sheets[index] = sheet;
    delete this.errors[sheet.id];
  }

  /** {campo: [{status, msg}]} → mensajes en español (GES-03 6.2). */
  private messages(error: HttpErrorResponse): string[] {
    if (error.status === 409) {
      return ['Ya existe una ficha con ese tipo, serie y número.'];
    }
    return error.error ? this.fieldMessages(error.error) : ['No se pudo guardar.'];
  }

  private fieldMessages(errors: { [field: string]: { status: string; msg: string }[] }): string[] {
    const labels: { [field: string]: string } = {
      description: 'Falta la descripción',
      grades: 'Falta al menos un grado',
      file: 'Falta el archivo de la ficha',
      number: 'Número inválido o repetido',
      title: 'Título inválido',
      seriesId: 'Elija una serie válida para el tipo',
      sheetTypeId: 'Tipo inválido',
      areaIds: 'Área inválida',
    };
    return Object.keys(errors || {}).map((field) => labels[field] || `Revise el campo ${field}`);
  }

  trackSheet(index: number, sheet: AdminSheet): string {
    return sheet.id;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
