import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { finalize, takeUntil } from 'rxjs/operators';
import { SiteContent } from 'src/app/_models/vademecum/catalog-settings.model';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { VademecumTaxonomyService } from 'src/app/services/vademecum/vademecum-taxonomy.service';
import { TABLE_ICONS, vademecumTableSettings } from '../_shared/vademecum-table';
import { apiErrorMessage, esc } from './catalog-errors';

const MAX_TITLE = 150;
const MAX_BODY = 20000;

/** Nombres legibles de las claves conocidas (la API solo entrega la clave técnica). */
const KEY_LABELS: { [key: string]: string } = {
  home: 'Inicio',
  about: 'Acerca de',
  access_request: 'Solicitud de acceso',
};

/**
 * Barra acotada a lo que permite la lista blanca del backend
 * (p, br, strong/b, em/i, u, ul, ol, li, a http(s)/mailto, h2-h4, blockquote).
 */
const EDITOR_MODULES = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ header: [2, 3, 4, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'link'],
    ['clean'],
  ],
};
const EDITOR_FORMATS = ['bold', 'italic', 'underline', 'header', 'list', 'blockquote', 'link'];

/** Pestaña "Textos del sitio": editar título y cuerpo (HTML limitado) por clave. */
@Component({
  selector: 'app-vademecum-site-texts',
  templateUrl: './site-texts.component.html',
  styleUrls: ['./catalog-settings.component.scss'],
})
export class SiteTextsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly maxTitle = MAX_TITLE;
  readonly maxBody = MAX_BODY;
  readonly editorModules = EDITOR_MODULES;
  readonly editorFormats = EDITOR_FORMATS;

  contents: SiteContent[] = [];
  source = new LocalDataSource();
  settings: any = vademecumTableSettings(
    {
      key: {
        title: 'Sección',
        type: 'html',
        valuePrepareFunction: (v: string) => `${esc(this.keyLabel(v))} <span class="key-label">(${esc(v)})</span>`,
        filterFunction: (v: string, search: string) =>
          `${this.keyLabel(v)} ${v}`.toLowerCase().includes(String(search).toLowerCase()),
      },
      title: { title: 'Título', type: 'html', valuePrepareFunction: (v: string) => esc(v || '—') },
      updatedAt: {
        title: 'Actualizado',
        valuePrepareFunction: (v: any) => (v ? formatDate(v, 'dd/MM/yyyy HH:mm', 'en-US') : '—'),
      },
    },
    [{ name: 'edit', title: `<span title="Editar">${TABLE_ICONS.edit}</span>` }],
  );
  loading = false;
  failed = false;

  selectedKey: string | null = null;
  title = '';
  body = '';
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
      .siteContents()
      .pipe(finalize(() => (this.loading = false)), takeUntil(this.destroy$))
      .subscribe(
        (contents) => {
          this.contents = contents;
          this.source.load(this.contents);
        },
        () => {
          this.failed = true;
          this.toastr.error('Error', 'No se pudo cargar el listado de textos.');
        },
      );
  }

  onAction(event: { action: string; data: SiteContent }): void {
    if (event.action === 'edit') {
      this.select(event.data);
    }
  }

  select(content: SiteContent): void {
    if (this.submitting) {
      return;
    }
    this.selectedKey = content.key;
    this.title = content.title || '';
    this.body = content.body || '';
  }

  cancel(): void {
    if (!this.submitting) {
      this.selectedKey = null;
    }
  }

  keyLabel(key: string): string {
    return KEY_LABELS[key] || key;
  }

  get errors(): string[] {
    const errors: string[] = [];
    if (this.title.length > MAX_TITLE) {
      errors.push(`El título admite hasta ${MAX_TITLE} caracteres.`);
    }
    if ((this.body || '').length > MAX_BODY) {
      errors.push(`El texto supera el máximo permitido (${MAX_BODY} caracteres de HTML).`);
    }
    return errors;
  }

  save(): void {
    const key = this.selectedKey;
    if (!key || this.submitting || this.errors.length > 0) {
      return;
    }
    // Quill deja "<p><br></p>" cuando el editor queda vacío
    const body = !this.body || this.body === '<p><br></p>' ? null : this.body;
    this.submitting = true;
    this.taxonomy
      .updateSiteContent(key, { title: this.title.trim() || null, body })
      .pipe(finalize(() => (this.submitting = false)), takeUntil(this.destroy$))
      .subscribe(
        (saved) => {
          this.contents = this.contents.map((item) => (item.key === saved.key ? saved : item));
          this.source.load(this.contents);
          this.body = saved.body || '';
          this.title = saved.title || '';
          this.toastr.registerSuccess('Listo', `Texto "${this.keyLabel(key)}" guardado.`);
        },
        (err: HttpErrorResponse) => this.toastr.error('Error', apiErrorMessage(err, 'No se pudo guardar el texto.')),
      );
  }

}
