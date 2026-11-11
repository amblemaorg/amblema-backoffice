import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  Pagination,
  UPLOAD_BUSY_STATUSES,
  UPLOAD_STATUS_LABELS,
  UploadSummary,
} from 'src/app/_models/vademecum/upload.model';
import { VademecumUploadService } from 'src/app/services/vademecum/vademecum-upload.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

/** Cada cuánto se refresca la lista mientras alguna carga está en proceso (BO-03). */
const POLL_MS = 5000;

/** Listado de cargas de compendios (BO-01); estado al día sin recargar (BO-03). */
@Component({
  selector: 'app-vademecum-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
})
export class UploadListComponent implements OnInit, OnDestroy {
  readonly statusLabels = UPLOAD_STATUS_LABELS;
  uploads: UploadSummary[] = [];
  pagination: Pagination = { page: 1, pageSize: 20, total: 0, pages: 0 };
  loaded = false;

  private subscription: Subscription;
  private polling: Subscription | null = null;

  constructor(
    private uploadService: VademecumUploadService,
    private toastr: CustomToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.load(1);
  }

  load(page: number): void {
    this.subscription?.unsubscribe();
    this.subscription = this.uploadService.list(page, this.pagination.pageSize).subscribe(
      (response) => {
        this.show(response.records, response.pagination);
        this.loaded = true;
      },
      () => {
        this.loaded = true;
        this.toastr.error('Error', 'No se pudieron cargar los compendios.');
      },
    );
  }

  isBusy(upload: UploadSummary): boolean {
    return UPLOAD_BUSY_STATUSES.includes(upload.status);
  }

  openUpload(upload: UploadSummary): void {
    this.router.navigate(['/pages/vademecum/uploads', upload.id]);
  }

  private show(records: UploadSummary[], pagination: Pagination): void {
    this.uploads = records;
    this.pagination = pagination;
    if (records.some((upload) => this.isBusy(upload))) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  }

  /** Refresca en silencio (sin pantalla de carga) la página actual. */
  private startPolling(): void {
    if (this.polling) {
      return;
    }
    this.polling = timer(POLL_MS, POLL_MS)
      .pipe(switchMap(() => this.uploadService.listSilently(this.pagination.page, this.pagination.pageSize)))
      .subscribe(
        (response) => this.show(response.records, response.pagination),
        () => this.stopPolling(),
      );
  }

  private stopPolling(): void {
    if (this.polling) {
      this.polling.unsubscribe();
      this.polling = null;
    }
  }

  sizeInMb(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1);
  }

  ngOnDestroy(): void {
    this.stopPolling();
    this.subscription?.unsubscribe();
  }
}
