import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  Pagination,
  UPLOAD_STATUS_LABELS,
  UploadSummary,
} from 'src/app/_models/vademecum/upload.model';
import { VademecumUploadService } from 'src/app/services/vademecum/vademecum-upload.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

/** Listado de cargas de compendios (BO-01). */
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

  constructor(
    private uploadService: VademecumUploadService,
    private toastr: CustomToastrService,
  ) {}

  ngOnInit(): void {
    this.load(1);
  }

  load(page: number): void {
    this.subscription?.unsubscribe();
    this.subscription = this.uploadService.list(page, this.pagination.pageSize).subscribe(
      (response) => {
        this.uploads = response.records;
        this.pagination = response.pagination;
        this.loaded = true;
      },
      () => {
        this.loaded = true;
        this.toastr.error('Error', 'No se pudieron cargar los compendios.');
      },
    );
  }

  sizeInMb(bytes: number): string {
    return (bytes / (1024 * 1024)).toFixed(1);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
