import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

/**
 * Tablas de Vademécum con el mismo aspecto que el resto del backoffice (ng2-smart-table como
 * en `_helpers/base-table.ts`): columna "Acciones" con íconos, paginador de 10 y "No hay registros".
 */

/** Acción por ícono, como las de BaseTable. `name` llega en el evento `(custom)` de la tabla. */
export interface TableIconAction {
  name: string;
  title: string;
}

/** Íconos que ya usa el backoffice; reutilizarlos mantiene el mismo aspecto. */
export const TABLE_ICONS = {
  view: '<i class="far fa-eye fa-sm"></i>',
  edit: '<i class="nb-edit"></i>',
  delete: '<i class="nb-trash"></i>',
  approve: '<i class="nb-checkmark"></i>',
  reject: '<i class="nb-close"></i>',
  hide: '<i class="far fa-eye-slash fa-sm"></i>',
  publish: '<i class="fas fa-upload fa-sm"></i>',
  unpublish: '<i class="fas fa-download fa-sm"></i>',
  pdf: '<i class="far fa-file-pdf fa-sm"></i>',
};

/** Acción con un ícono de TABLE_ICONS y el nombre que aparece al pasar el ratón. */
export function iconAction(name: string, icon: keyof typeof TABLE_ICONS, label: string): TableIconAction {
  return { name, title: `<span title="${label}">${TABLE_ICONS[icon]}</span>` };
}

export const TABLE_PAGE_SIZE = 10;

/**
 * Configuración base de ng2-smart-table. `columns` y `actions` los pone cada pantalla.
 * `serverSide`: sin filtros ni orden por columna (el servidor no los entiende); los filtros van
 * arriba, en la barra de la pantalla.
 */
export function vademecumTableSettings(
  columns: { [key: string]: any },
  actions: TableIconAction[],
  serverSide = false,
): any {
  const prepared: { [key: string]: any } = {};
  Object.keys(columns).forEach((key) => {
    prepared[key] = serverSide ? { filter: false, sort: false, ...columns[key] } : columns[key];
  });
  return {
    noDataMessage: 'No hay registros',
    mode: 'external',
    hideSubHeader: serverSide,
    // Sin `position`: a la izquierda, como BaseTable y el resto del backoffice.
    // `delete: true` es el mismo truco de BaseTable ("Fake column cuz a bug"): ng2-smart-table
    // 1.7.2 no cuenta las acciones `custom` en el colspan de "No hay registros" y a esa fila le
    // faltaba la columna "Acciones". El botón de borrar nativo queda sin contenido.
    actions: actions.length
      ? { columnTitle: 'Acciones', add: false, edit: false, delete: true, custom: actions }
      : false,
    delete: { deleteButtonContent: '', confirmDelete: true },
    pager: { display: true, perPage: TABLE_PAGE_SIZE },
    columns: prepared,
  };
}

/**
 * Fuente paginada en el servidor para las rutas de Vademécum que responden
 * `{records, pagination: {total}}` y aceptan `page` y `pageSize`.
 * Los filtros van en la URL; al cambiarlos se llama `setFilters` y la tabla recarga desde la página 1.
 */
export class VademecumServerSource extends ServerDataSource {
  /** Emite cuando falla la carga; la pantalla lo muestra con su aviso (CustomToastrService). */
  readonly loadError$ = new Subject<unknown>();

  constructor(http: HttpClient, private readonly path: string, filters: { [key: string]: any } = {}) {
    super(http, {
      endPoint: VademecumServerSource.url(path, filters),
      dataKey: 'records',
      totalKey: 'pagination.total',
      pagerPageKey: 'page',
      pagerLimitKey: 'pageSize',
    });
    this.setPaging(1, TABLE_PAGE_SIZE, false);
  }

  private static url(path: string, filters: { [key: string]: any }): string {
    const query = Object.keys(filters)
      .filter((key) => filters[key] !== null && filters[key] !== undefined && filters[key] !== '')
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(filters[key]))}`)
      .join('&');
    return `${environment.api}vademecum/admin/${path}${query ? '?' + query : ''}`;
  }

  /** Sin esto, un error del servidor deja la tabla vacía sin avisar. */
  getElements(): Promise<any> {
    return super.getElements().catch((err: unknown) => {
      this.data = [];
      this.lastRequestCount = 0;
      this.loadError$.next(err);
      return [];
    });
  }

  /** Cambia los filtros de la barra superior y vuelve a la página 1. */
  setFilters(filters: { [key: string]: any }): void {
    this.conf.endPoint = VademecumServerSource.url(this.path, filters);
    this.setPage(1, false);
    this.refresh();
  }
}

/**
 * Crea las fuentes con el HttpClient RAÍZ. `pages.module.ts` importa otra vez HttpClientModule, así
 * que un HttpClient inyectado en un componente de páginas no pasa por AuthJWTInterceptor y la
 * petición sale sin token ("Missing Authorization Header"). Los componentes no deben inyectar
 * HttpClient para las tablas: usan esta fábrica.
 */
@Injectable({ providedIn: 'root' })
export class VademecumTableSources {
  constructor(private readonly http: HttpClient) {}

  create(path: string, filters: { [key: string]: any } = {}): VademecumServerSource {
    return new VademecumServerSource(this.http, path, filters);
  }
}
