import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UploadCut, UploadDetail, UploadPage } from 'src/app/_models/vademecum/upload.model';
import { VademecumUploadService } from 'src/app/services/vademecum/vademecum-upload.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import {
  cloneCuts,
  cutProblems,
  effectiveNumber,
  effectiveTitle,
  mergeWithPrevious,
  splitAt,
  togglePage,
} from './cut-editor';

/** Miniaturas que se piden a la vez (cada una ~5 KB; un compendio tiene hasta ~100 páginas). */
const THUMBNAIL_CONCURRENCY = 6;

/**
 * Revisión de cortes en miniaturas (BO-04): unir, separar y quitar página con un clic,
 * guardar los cortes (PUT /cuts) y generar las fichas (POST /generate).
 */
@Component({
  selector: 'app-vademecum-cut-review',
  templateUrl: './cut-review.component.html',
  styleUrls: ['./cut-review.component.scss'],
})
export class CutReviewComponent implements OnChanges, OnDestroy {
  @Input() upload: UploadDetail;
  /** La carga cambió en la API (cortes guardados o generación iniciada). */
  @Output() changed = new EventEmitter<void>();

  cuts: UploadCut[] = [];
  pages = new Map<number, UploadPage>();
  thumbnails = new Map<number, SafeUrl>();
  dirty = false;
  saving = false;
  serverError: string | null = null;

  private objectUrls: string[] = [];
  private loadedUploadId: string | null = null;
  private subscriptions = new Subscription();

  constructor(
    private uploadService: VademecumUploadService,
    private toastr: CustomToastrService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.upload || !this.upload) {
      return;
    }
    // Una consulta nueva de la misma carga no pisa lo que el usuario está editando
    if (this.loadedUploadId === this.upload.id && this.dirty) {
      return;
    }
    this.pages = new Map(this.upload.pages.map((page) => [page.index, page]));
    const source = this.upload.confirmedCuts.length ? this.upload.confirmedCuts : this.upload.proposedCuts;
    this.cuts = cloneCuts(source);
    this.dirty = false;
    this.serverError = null;
    if (this.loadedUploadId !== this.upload.id) {
      this.loadedUploadId = this.upload.id;
      this.loadThumbnails();
    }
  }

  // --- Miniaturas ---

  private loadThumbnails(): void {
    this.releaseThumbnails();
    const pages = this.upload.pages.filter((page) => page.thumbnailUrl);
    this.subscriptions.add(
      from(pages)
        .pipe(
          mergeMap(
            (page) =>
              this.uploadService
                .pageThumbnail(page.thumbnailUrl)
                .pipe(map((blob) => ({ index: page.index, blob }))),
            THUMBNAIL_CONCURRENCY,
          ),
        )
        .subscribe(({ index, blob }) => {
          const url = URL.createObjectURL(blob);
          this.objectUrls.push(url);
          this.thumbnails.set(index, this.sanitizer.bypassSecurityTrustUrl(url));
        }),
    );
  }

  private releaseThumbnails(): void {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls = [];
    this.thumbnails = new Map();
  }

  // --- Edición ---

  merge(index: number): void {
    this.apply(mergeWithPrevious(this.cuts, index));
  }

  split(index: number, position: number): void {
    this.apply(splitAt(this.cuts, index, position));
  }

  toggle(index: number, page: number): void {
    this.apply(togglePage(this.cuts, index, page));
  }

  setNumber(cut: UploadCut, value: string): void {
    const number = parseInt(value, 10);
    cut.number = number > 0 ? number : null;
    this.markDirty();
  }

  setTitle(cut: UploadCut, value: string): void {
    cut.title = value.trim() ? value : null;
    this.markDirty();
  }

  reset(): void {
    this.cuts = cloneCuts(this.upload.proposedCuts);
    this.markDirty();
  }

  private apply(cuts: UploadCut[]): void {
    this.cuts = cuts;
    this.markDirty();
  }

  private markDirty(): void {
    this.dirty = true;
    this.serverError = null;
  }

  // --- Lectura para la plantilla ---

  numberOf(cut: UploadCut): number | null {
    return effectiveNumber(cut, this.pages);
  }

  titleOf(cut: UploadCut): string | null {
    return effectiveTitle(cut, this.pages);
  }

  headerOf(page: number): string {
    const data = this.pages.get(page);
    return data && data.headerText ? data.headerText : 'Sin encabezado';
  }

  get problems(): string[] {
    return cutProblems(this.cuts, this.pages);
  }

  get sheetCount(): number {
    return this.cuts.filter((cut) => !cut.excluded).length;
  }

  trackCut(index: number, cut: UploadCut): string {
    return cut.pages.join('-');
  }

  // --- Guardar y generar ---

  save(thenGenerate: boolean): void {
    if (this.saving || this.problems.length) {
      return;
    }
    this.saving = true;
    this.serverError = null;
    this.subscriptions.add(
      this.uploadService.saveCuts(this.upload.id, this.cuts).subscribe(
        () => {
          this.dirty = false;
          if (thenGenerate) {
            this.generate();
          } else {
            this.saving = false;
            this.toastr.updateSuccess('Cortes guardados', `${this.sheetCount} fichas listas para generar.`);
            this.changed.emit();
          }
        },
        (error: HttpErrorResponse) => {
          this.saving = false;
          this.serverError = this.apiMessage(error);
        },
      ),
    );
  }

  private generate(): void {
    this.subscriptions.add(
      this.uploadService.generate(this.upload.id).subscribe(
        () => {
          this.saving = false;
          this.toastr.info('Generando fichas', 'Puede seguir el avance en esta pantalla.');
          this.changed.emit();
        },
        (error: HttpErrorResponse) => {
          this.saving = false;
          this.serverError = this.apiMessage(error);
          this.changed.emit();
        },
      ),
    );
  }

  /** Errores de la API: {campo: [{status, msg}]} (GES-03 6.2). */
  private apiMessage(error: HttpErrorResponse): string {
    const body = error.error || {};
    const cutsError = body.cuts && body.cuts[0];
    if (cutsError && cutsError.status === '116') {
      return `Los cortes no son válidos: ${cutsError.msg}`;
    }
    if (body.general && body.general[0] && body.general[0].status === '114') {
      return 'La carga ya no está en revisión. Actualice la pantalla.';
    }
    return 'No se pudo guardar. Intente de nuevo en unos minutos.';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.releaseThumbnails();
  }
}
