import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SheetSeries, SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import { UploadSummary } from 'src/app/_models/vademecum/upload.model';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { VademecumUploadService } from 'src/app/services/vademecum/vademecum-upload.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

/** Límite mostrado al usuario; la API valida el real (VADEMECUM_MAX_UPLOAD_MB). */
const MAX_UPLOAD_MB = 100;

/**
 * Subir compendio (BO-02): tipo de ficha, serie (si el tipo tiene series) y PDF.
 * La API responde 202 y procesa en segundo plano; el avance se sigue en el detalle (BO-03).
 */
@Component({
  selector: 'app-vademecum-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent implements OnInit, OnDestroy {
  @Output() uploaded = new EventEmitter<UploadSummary>();

  readonly maxUploadMb = MAX_UPLOAD_MB;
  form: FormGroup;
  sheetTypes: SheetType[] = [];
  file: File | null = null;
  fileError: string | null = null;
  uploading = false;
  progress = 0;

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private taxonomyService: VademecumTaxonomyService,
    private uploadService: VademecumUploadService,
    private toastr: CustomToastrService,
  ) {
    this.form = this.fb.group({
      sheetTypeId: [null, Validators.required],
      seriesId: [null],
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.taxonomyService.sheetTypes().subscribe(
        (types) => (this.sheetTypes = types.filter((type) => type.status === '1')),
        () => this.toastr.error('Error', 'No se pudieron cargar los tipos de ficha.'),
      ),
    );
    // La serie solo aplica al tipo elegido: se limpia y se exige si el tipo tiene series
    this.subscriptions.add(
      this.form.get('sheetTypeId').valueChanges.subscribe(() => {
        const series = this.form.get('seriesId');
        series.setValue(null);
        series.setValidators(this.series.length ? Validators.required : null);
        series.updateValueAndValidity();
      }),
    );
  }

  get selectedType(): SheetType | undefined {
    return this.sheetTypes.find((type) => type.id === this.form.value.sheetTypeId);
  }

  get series(): SheetSeries[] {
    return this.selectedType ? this.selectedType.series : [];
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;
    this.file = null;
    this.fileError = null;
    if (!file) {
      return;
    }
    const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      this.fileError = 'El archivo debe ser un PDF.';
    } else if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      this.fileError = `El archivo supera los ${MAX_UPLOAD_MB} MB.`;
    } else {
      this.file = file;
    }
  }

  submit(fileInput: HTMLInputElement): void {
    if (this.form.invalid || !this.file || this.uploading) {
      this.form.markAllAsTouched();
      return;
    }
    this.uploading = true;
    this.progress = 0;
    const { sheetTypeId, seriesId } = this.form.value;
    this.subscriptions.add(
      this.uploadService.create(this.file, sheetTypeId, seriesId || undefined).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.uploading = false;
            this.toastr.registerSuccess(
              'Compendio recibido',
              'Se está procesando en el servidor.',
            );
            this.reset(fileInput);
            this.uploaded.emit(event.body);
          }
        },
        (error: HttpErrorResponse) => {
          this.uploading = false;
          this.toastr.error('No se pudo subir el compendio', this.errorMessage(error));
        },
      ),
    );
  }

  private reset(fileInput: HTMLInputElement): void {
    this.file = null;
    fileInput.value = '';
    this.form.reset({ sheetTypeId: null, seriesId: null });
  }

  /** Errores de la API: {campo: [{status, msg}]} (GES-03 6.2). */
  private errorMessage(error: HttpErrorResponse): string {
    const body = error.error || {};
    if (body.file && body.file[0] && body.file[0].status === '115') {
      return 'El archivo no es un PDF válido o supera el tamaño permitido.';
    }
    if (body.seriesId) {
      return 'Elija la serie del compendio.';
    }
    if (body.sheetTypeId) {
      return 'Elija un tipo de ficha válido.';
    }
    if (error.status === 403) {
      return 'Su rol no tiene permiso para Vademécum.';
    }
    return 'Intente de nuevo en unos minutos.';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
