import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  UPLOAD_BUSY_STATUSES,
  UPLOAD_STATUS_LABELS,
  UploadDetail,
} from 'src/app/_models/vademecum/upload.model';
import { VademecumUploadService } from 'src/app/services/vademecum/vademecum-upload.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

/** Cada cuánto se consulta el avance (GES-03 5.5: sin websockets, cada 3 s). */
const POLL_MS = 3000;

/**
 * Detalle de una carga (BO-03): estado, avance y errores sin recargar la página.
 * Mientras la API trabaja (en cola, procesando, generando) consulta el avance en silencio.
 */
@Component({
  selector: 'app-vademecum-upload-detail',
  templateUrl: './upload-detail.component.html',
  styleUrls: ['./upload-detail.component.scss'],
})
export class UploadDetailComponent implements OnInit, OnDestroy {
  readonly statusLabels = UPLOAD_STATUS_LABELS;
  upload: UploadDetail | null = null;
  notFound = false;
  working = false;

  private uploadId: string;
  private polling: Subscription | null = null;
  private subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: VademecumUploadService,
    private toastr: CustomToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.paramMap.subscribe((params) => {
        this.uploadId = params.get('id');
        this.upload = null;
        this.notFound = false;
        this.load();
      }),
    );
  }

  get busy(): boolean {
    return !!this.upload && UPLOAD_BUSY_STATUSES.includes(this.upload.status);
  }

  /** Primera carga con la pantalla de carga; si está ocupada, sigue en silencio. */
  load(): void {
    this.stopPolling();
    this.subscriptions.add(
      this.uploadService.get(this.uploadId).subscribe(
        (upload) => this.update(upload),
        (error: HttpErrorResponse) => this.handleLoadError(error),
      ),
    );
  }

  private update(upload: UploadDetail): void {
    this.upload = upload;
    if (this.busy) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  }

  private startPolling(): void {
    if (this.polling) {
      return;
    }
    this.polling = timer(POLL_MS, POLL_MS)
      .pipe(switchMap(() => this.uploadService.get(this.uploadId, true)))
      .subscribe(
        (upload) => this.update(upload),
        // Un fallo de red no rompe la pantalla: se reintenta al volver a cargar
        () => this.stopPolling(),
      );
  }

  private stopPolling(): void {
    if (this.polling) {
      this.polling.unsubscribe();
      this.polling = null;
    }
  }

  private handleLoadError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.notFound = true;
    } else {
      this.toastr.error('Error', 'No se pudo consultar la carga.');
    }
  }

  reprocess(): void {
    if (this.working) {
      return;
    }
    this.working = true;
    this.subscriptions.add(
      this.uploadService.reprocess(this.uploadId).subscribe(
        () => {
          this.working = false;
          this.toastr.info('Reprocesando', 'Se vuelve a leer el compendio original.');
          this.load();
        },
        (error: HttpErrorResponse) => {
          this.working = false;
          this.toastr.error('No se pudo reprocesar', this.apiMessage(error));
          this.load();
        },
      ),
    );
  }

  remove(): void {
    if (this.working || !confirm('¿Eliminar esta carga y sus fichas en borrador?')) {
      return;
    }
    this.working = true;
    this.subscriptions.add(
      this.uploadService.remove(this.uploadId).subscribe(
        () => {
          this.toastr.deleteRegister('Carga eliminada', this.upload ? this.upload.originalFileName : '');
          this.router.navigate(['/pages/vademecum/uploads']);
        },
        (error: HttpErrorResponse) => {
          this.working = false;
          this.toastr.error('No se pudo eliminar', this.apiMessage(error));
        },
      ),
    );
  }

  get canReprocess(): boolean {
    return !!this.upload && ['review', 'error'].includes(this.upload.status);
  }

  get canRemove(): boolean {
    return !!this.upload && !['processing', 'generating'].includes(this.upload.status);
  }

  sizeInMb(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1);
  }

  /** Errores de la API: {campo: [{status, msg}]} (GES-03 6.2). */
  private apiMessage(error: HttpErrorResponse): string {
    const general = error.error && error.error.general;
    if (general && general[0] && general[0].status === '114') {
      return general[0].msg === 'Upload has published sheets'
        ? 'La carga tiene fichas publicadas.'
        : 'El estado actual de la carga no lo permite.';
    }
    return 'Intente de nuevo en unos minutos.';
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.subscriptions.unsubscribe();
  }
}
