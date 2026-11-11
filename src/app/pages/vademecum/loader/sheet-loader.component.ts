import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Area, GRADE_OPTIONS, SheetInput } from 'src/app/_models/vademecum/sheet.model';
import { SheetSeries, SheetType } from 'src/app/_models/vademecum/sheet-type.model';
import {
  InvalidPdfError,
  OpenedCompendium,
  VademecumPdfService,
} from 'src/app/services/vademecum/vademecum-pdf.service';
import { VademecumSheetService } from 'src/app/services/vademecum/vademecum-sheet.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { DetectedHeader, detectHeader, proposeSheets } from './header-detection';
import {
  DraftDefaults,
  SheetDraft,
  discardPage,
  isLocked,
  mergeWithPrevious,
  movePage,
  newDraft,
  sendPage,
  split,
} from './sheet-draft';

/** Límite mostrado al usuario; la API valida el real por ficha (VADEMECUM_MAX_UPLOAD_MB). */
const MAX_COMPENDIUM_MB = 200;
/**
 * Miniaturas que se dibujan a la vez. pdf.js trabaja en un solo hilo: con 2 a la vez solo se
 * ganó ~8 % de tiempo y sube el pico de memoria (decodifica imágenes de hasta 3570×4622 px).
 */
const THUMBNAIL_CONCURRENCY = 1;

interface PageInfo {
  index: number;
  thumbnail: string | null;
  header: DetectedHeader;
}

/**
 * Cargar fichas (BO-04 rehecho, decisión del Ing. Fidel 2026-11-11).
 *
 * El compendio se abre en el navegador (pdf.js): miniaturas y encabezados sin enviarlo al
 * servidor. Se proponen las fichas; en cada fila se editan los datos y las páginas (mover,
 * separar, unir, descartar). Cada ficha se separa en el navegador (pdf-lib) y se sube sola;
 * la API la comprime y genera sus imágenes. El compendio no se guarda.
 */
@Component({
  selector: 'app-vademecum-sheet-loader',
  templateUrl: './sheet-loader.component.html',
  styleUrls: ['./sheet-loader.component.scss'],
})
export class SheetLoaderComponent implements OnInit, DoCheck, OnDestroy {
  readonly gradeOptions = GRADE_OPTIONS;
  readonly maxCompendiumMb = MAX_COMPENDIUM_MB;

  sheetTypes: SheetType[] = [];
  areas: Area[] = [];
  sheetTypeId: string | null = null;
  seriesId: string | null = null;

  fileName: string | null = null;
  fileError: string | null = null;
  reading = false;
  readProgress = 0;

  pages: PageInfo[] = [];
  drafts: SheetDraft[] = [];
  discarded: number[] = [];
  existingNumbers = new Set<number>();
  batchRunning = false;
  /** Avisos de cada ficha pendiente; se recalculan una vez por ciclo de cambios (ngDoCheck). */
  checks = new Map<number, string[]>();

  private compendium: OpenedCompendium | null = null;
  /** PDF ya armado de cada ficha (Ver PDF y Subir no lo arman dos veces). */
  private built = new Map<number, { pages: string; blob: Blob }>();
  private subscriptions = new Subscription();

  constructor(
    private pdfService: VademecumPdfService,
    private sheetService: VademecumSheetService,
    private taxonomyService: VademecumTaxonomyService,
    private toastr: CustomToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.taxonomyService.sheetTypes().subscribe(
        (types) => (this.sheetTypes = types.filter((type) => type.status === '1')),
        () => this.toastr.error('Error', 'No se pudieron cargar los tipos de ficha.'),
      ),
    );
    this.subscriptions.add(
      this.taxonomyService.areas().subscribe(
        (areas) => (this.areas = areas.filter((area) => area.status === '1')),
        () => this.toastr.error('Error', 'No se pudieron cargar las áreas.'),
      ),
    );
  }

  // --- Tipo y serie del compendio ---

  typeOf(sheetTypeId: string | null): SheetType | undefined {
    return this.sheetTypes.find((type) => type.id === sheetTypeId);
  }

  seriesOf(sheetTypeId: string | null): SheetSeries[] {
    const type = this.typeOf(sheetTypeId);
    return type ? type.series : [];
  }

  onTypeChange(): void {
    this.seriesId = null;
    this.loadExistingNumbers();
  }

  get canChooseFile(): boolean {
    return !!this.sheetTypeId && (!this.seriesOf(this.sheetTypeId).length || !!this.seriesId) && !this.reading;
  }

  private get defaults(): DraftDefaults {
    const series = this.seriesOf(this.sheetTypeId).find((item) => item.id === this.seriesId);
    return { sheetTypeId: this.sheetTypeId, seriesId: this.seriesId, grades: series ? series.grades : [] };
  }

  /** Números ya usados en la API para el tipo y serie elegidos (aviso antes de subir). */
  loadExistingNumbers(): void {
    this.existingNumbers = new Set();
    if (!this.sheetTypeId || (this.seriesOf(this.sheetTypeId).length && !this.seriesId)) {
      return;
    }
    const typeId = this.sheetTypeId;
    const seriesId = this.seriesId;
    const fetchPage = (page: number) =>
      this.subscriptions.add(
        this.sheetService.listByType(typeId, seriesId, page).subscribe((list) => {
          list.records
            .filter((sheet) => !seriesId || (sheet.series && sheet.series.id === seriesId))
            .forEach((sheet) => this.existingNumbers.add(sheet.number));
          if (page < list.pagination.pages) {
            fetchPage(page + 1);
          }
        }),
      );
    fetchPage(1);
  }

  // --- Leer el compendio en el navegador ---

  async onFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;
    input.value = '';
    if (!file) {
      return;
    }
    if (this.pendingCount && !confirm('Hay fichas sin subir. ¿Descartarlas y abrir otro compendio?')) {
      return;
    }
    this.reset();
    if (!(file.type === 'application/pdf' || /\.pdf$/i.test(file.name))) {
      this.fileError = 'El archivo debe ser un PDF.';
      return;
    }
    if (file.size > MAX_COMPENDIUM_MB * 1024 * 1024) {
      this.fileError = `El archivo supera los ${MAX_COMPENDIUM_MB} MB.`;
      return;
    }
    this.fileName = file.name;
    this.reading = true;
    try {
      this.compendium = await this.pdfService.open(file);
      const headerName = this.typeOf(this.sheetTypeId).headerName;
      const total = this.compendium.pageCount;
      this.pages = Array.from({ length: total }, (_, index) => ({
        index,
        thumbnail: null,
        header: { headerText: null, number: null, isContinuation: false, title: null },
      }));
      // Primero los encabezados (rápido) para proponer las fichas; luego las miniaturas
      for (let index = 0; index < total; index++) {
        this.pages[index].header = detectHeader(await this.compendium.topLines(index), headerName);
        this.readProgress = Math.round((50 * (index + 1)) / total);
      }
      this.drafts = proposeSheets(this.pages.map((page) => page.header)).map((sheet) =>
        newDraft(sheet.pages, sheet.number, sheet.title, this.defaults),
      );
      let next = 0;
      let done = 0;
      const worker = async () => {
        while (next < total) {
          const index = next++;
          this.pages[index].thumbnail = await this.compendium.thumbnail(index);
          done++;
          this.readProgress = 50 + Math.round((50 * done) / total);
        }
      };
      await Promise.all(Array.from({ length: Math.min(THUMBNAIL_CONCURRENCY, total) }, worker));
      // Encabezados y miniaturas listos: pdf.js ya no hace falta (libera su copia del PDF)
      this.compendium.releaseReader();
    } catch (error) {
      this.fileError =
        error instanceof InvalidPdfError ? error.message : 'No se pudo leer el PDF en el navegador.';
      this.reset(false);
    } finally {
      this.reading = false;
    }
  }

  private reset(clearError = true): void {
    if (this.compendium) {
      this.compendium.close();
      this.compendium = null;
    }
    this.pages = [];
    this.drafts = [];
    this.discarded = [];
    this.built.clear();
    this.checks.clear();
    this.readProgress = 0;
    if (clearError) {
      this.fileError = null;
      this.fileName = null;
    }
  }

  // --- Páginas ---

  headerOf(page: number): string {
    const info = this.pages[page];
    return info && info.header.headerText ? info.header.headerText : 'Sin encabezado';
  }

  thumbnailOf(page: number): string | null {
    const info = this.pages[page];
    return info ? info.thumbnail : null;
  }

  locked(draft: SheetDraft): boolean {
    return isLocked(draft) || this.batchRunning;
  }

  movePage(draft: SheetDraft, position: number, step: -1 | 1): void {
    movePage(draft, position, step);
  }

  sendPage(index: number, position: number, step: -1 | 1): void {
    this.drafts = sendPage(this.drafts, index, position, step);
  }

  split(index: number, position: number): void {
    this.drafts = split(this.drafts, index, position, (pages) => this.draftFor(pages));
  }

  merge(index: number): void {
    this.drafts = mergeWithPrevious(this.drafts, index);
  }

  discard(index: number, position: number): void {
    this.drafts = discardPage(this.drafts, index, position, this.discarded);
  }

  /** Recupera una página descartada como ficha nueva (en orden) o al final de una ficha. */
  restore(page: number, targetKey: number | 'new'): void {
    this.discarded = this.discarded.filter((item) => item !== page);
    const target = this.drafts.find((draft) => draft.key === targetKey);
    if (target && !isLocked(target)) {
      target.pages.push(page);
      return;
    }
    const draft = this.draftFor([page]);
    const at = this.drafts.findIndex((item) => item.pages[0] > page);
    this.drafts.splice(at < 0 ? this.drafts.length : at, 0, draft);
  }

  private draftFor(pages: number[]): SheetDraft {
    const header = this.pages[pages[0]] ? this.pages[pages[0]].header : null;
    return newDraft(pages, header ? header.number : null, header ? header.title : null, this.defaults);
  }

  openableDrafts(page: number): SheetDraft[] {
    return this.drafts.filter((draft) => !isLocked(draft));
  }

  // --- Datos de la ficha ---

  onDraftTypeChange(draft: SheetDraft): void {
    draft.seriesId = null;
  }

  onGradesChange(draft: SheetDraft, grades: string[]): void {
    if (grades.includes('all') && !draft.grades.includes('all')) {
      draft.grades = ['all'];
    } else if (grades.length > 1 && grades.includes('all')) {
      draft.grades = grades.filter((grade) => grade !== 'all');
    } else {
      draft.grades = grades;
    }
  }

  codeOf(draft: SheetDraft): string {
    const type = this.typeOf(draft.sheetTypeId);
    const series = this.seriesOf(draft.sheetTypeId).find((item) => item.id === draft.seriesId);
    return type ? `${type.codePrefix}${series ? series.code : ''}-${draft.number || '?'}` : '—';
  }

  /** Recalcula los avisos de las fichas pendientes una sola vez por ciclo de cambios. */
  ngDoCheck(): void {
    if (!this.drafts.length) {
      return;
    }
    const counts = new Map<string, number>();
    this.drafts.forEach((draft) => {
      const key = this.numberKey(draft);
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    this.repeatedKeys = new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key));
    const checks = new Map<number, string[]>();
    this.drafts.forEach((draft) => {
      if (draft.state === 'pending') {
        checks.set(draft.key, this.problems(draft));
      }
    });
    this.checks = checks;
  }

  private repeatedKeys = new Set<string>();

  private numberKey(draft: SheetDraft): string {
    return `${draft.sheetTypeId}|${draft.seriesId}|${draft.number}`;
  }

  /** Lo que la API rechazaría (o 113 al publicar), para avisar antes de subir. */
  problems(draft: SheetDraft, publish = false): string[] {
    const problems: string[] = [];
    if (!draft.number || draft.number < 1 || draft.number > 999) {
      problems.push('Falta el número (1 a 999).');
    } else if (this.repeated(draft)) {
      problems.push(`El número ${draft.number} se repite en esta carga.`);
    } else if (this.alreadyExists(draft)) {
      problems.push(`Ya existe la ficha ${this.codeOf(draft)}.`);
    }
    if (!draft.title.trim()) {
      problems.push('Falta el título.');
    }
    if (!draft.sheetTypeId) {
      problems.push('Falta el tipo.');
    } else if (this.seriesOf(draft.sheetTypeId).length && !draft.seriesId) {
      problems.push('Falta la serie.');
    }
    if (publish && !draft.description.trim()) {
      problems.push('Para publicar falta la descripción.');
    }
    if (publish && !draft.grades.length) {
      problems.push('Para publicar falta al menos un grado.');
    }
    return problems;
  }

  private repeated(draft: SheetDraft): boolean {
    return this.repeatedKeys.has(this.numberKey(draft));
  }

  private alreadyExists(draft: SheetDraft): boolean {
    return (
      draft.state !== 'done' &&
      draft.sheetTypeId === this.sheetTypeId &&
      draft.seriesId === this.seriesId &&
      this.existingNumbers.has(draft.number)
    );
  }

  // --- Subir ---

  get pendingDrafts(): SheetDraft[] {
    return this.drafts.filter((draft) => draft.state === 'pending' || draft.state === 'error');
  }

  get pendingCount(): number {
    return this.pendingDrafts.length;
  }

  get doneCount(): number {
    return this.drafts.filter((draft) => draft.state === 'done').length;
  }

  async preview(draft: SheetDraft): Promise<void> {
    const tab = window.open('', '_blank');
    try {
      const blob = await this.build(draft);
      const url = URL.createObjectURL(blob);
      if (tab) {
        tab.location.href = url;
      }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch {
      if (tab) {
        tab.close();
      }
      this.toastr.error('Error', 'No se pudo armar el PDF de la ficha.');
    }
  }

  upload(draft: SheetDraft, publish: boolean): Promise<boolean> {
    const problems = this.problems(draft, publish);
    if (problems.length) {
      draft.state = 'error';
      draft.message = problems.join(' ');
      return Promise.resolve(false);
    }
    draft.state = 'uploading';
    draft.message = null;
    const data: SheetInput = {
      number: Number(draft.number),
      title: draft.title.trim(),
      description: draft.description.trim() || null,
      grades: draft.grades,
      areaIds: draft.areaIds,
      sheetTypeId: draft.sheetTypeId,
      seriesId: draft.seriesId || null,
    };
    return this.build(draft)
      .then(
        (pdf) =>
          new Promise<boolean>((resolve) => {
            this.subscriptions.add(
              this.sheetService.create(pdf, `${this.codeOf(draft)}.pdf`, data, publish).subscribe(
                (sheet) => {
                  draft.state = 'done';
                  draft.code = sheet.code;
                  draft.published = sheet.status === 'published';
                  this.existingNumbers.add(sheet.number);
                  this.built.delete(draft.key);
                  this.releaseWriterIfIdle();
                  resolve(true);
                },
                (error: HttpErrorResponse) => {
                  draft.state = 'error';
                  draft.message = this.apiMessage(error);
                  resolve(false);
                },
              ),
            );
          }),
      )
      .catch(() => {
        draft.state = 'error';
        draft.message = 'No se pudo armar el PDF de la ficha en el navegador.';
        return false;
      });
  }

  /** PDF de la ficha; se reutiliza mientras sus páginas no cambien. */
  private async build(draft: SheetDraft): Promise<Blob> {
    const pages = draft.pages.join(',');
    const cached = this.built.get(draft.key);
    if (cached && cached.pages === pages) {
      return cached.blob;
    }
    const blob = await this.compendium.extract(draft.pages);
    this.built.set(draft.key, { pages, blob });
    return blob;
  }

  /** Sin fichas por subir, pdf-lib (el compendio en memoria) se libera. */
  private releaseWriterIfIdle(): void {
    if (this.compendium && !this.pendingCount && !this.batchRunning) {
      this.compendium.releaseWriter();
      this.built.clear();
    }
  }

  /** Sube una por una las fichas pendientes; las que tienen problemas quedan marcadas. */
  async uploadAll(publish: boolean): Promise<void> {
    if (this.batchRunning) {
      return;
    }
    this.batchRunning = true;
    let ok = 0;
    const queue = this.pendingDrafts;
    for (const draft of queue) {
      if (await this.upload(draft, publish)) {
        ok++;
      }
    }
    this.batchRunning = false;
    this.releaseWriterIfIdle();
    const failed = queue.length - ok;
    if (ok) {
      this.toastr.registerSuccess('Fichas subidas', `${ok} de ${queue.length}`);
    }
    if (failed) {
      this.toastr.info('Revise las fichas marcadas', `${failed} no se subieron.`);
    }
  }

  /** Errores de la API: {campo: [{status, msg}]} (GES-03 6.2). */
  private apiMessage(error: HttpErrorResponse): string {
    const body = error.error || {};
    const status = (field: string) => body[field] && body[field][0] && body[field][0].status;
    if (error.status === 409 || status('number') === '112') {
      return 'Ya existe una ficha con ese tipo, serie y número.';
    }
    if (status('file') === '115') {
      return 'El PDF de la ficha no es válido o supera el tamaño permitido.';
    }
    if (status('description') === '113' || status('grades') === '113') {
      return 'Para publicar faltan la descripción o los grados.';
    }
    if (body.seriesId) {
      return 'Elija una serie válida para el tipo.';
    }
    if (error.status === 403) {
      return 'Su rol no tiene permiso para Vademécum.';
    }
    const fields = Object.keys(body).filter((key) => key !== 'msg');
    return fields.length ? `Revise: ${fields.join(', ')}.` : 'No se pudo subir. Intente de nuevo.';
  }

  trackDraft(index: number, draft: SheetDraft): number {
    return draft.key;
  }

  @HostListener('window:beforeunload', ['$event'])
  warnBeforeLeaving(event: BeforeUnloadEvent): void {
    if (this.pendingCount) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.reset();
  }
}
