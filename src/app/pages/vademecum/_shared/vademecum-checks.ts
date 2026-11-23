import { IDropdownSettings } from 'ng-multiselect-dropdown';

/**
 * Listas con casillas (ng-multiselect-dropdown 0.3.9), como "Seleccione lapso" en Reportes PECA.
 * Con datos en objetos, la lista emite objetos {id, text}; al recibir un valor lo vuelve a emitir.
 */
export interface CheckOption {
  id: string;
  text: string;
}

export const CHECK_SETTINGS: IDropdownSettings = {
  singleSelection: false,
  idField: 'id',
  textField: 'text',
  enableCheckAll: false,
  allowSearchFilter: false,
  itemsShowLimit: 3,
  noDataAvailablePlaceholderText: 'Sin opciones',
};

export const AREA_CHECK_SETTINGS: IDropdownSettings = {
  ...CHECK_SETTINGS,
  enableCheckAll: true,
  selectAllText: 'Seleccionar todas',
  unSelectAllText: 'Quitar todas',
  noDataAvailablePlaceholderText: 'No hay áreas activas',
};

export function sameIds(options: CheckOption[], ids: string[]): boolean {
  return options.length === ids.length && options.every((option) => ids.includes(option.id));
}

/** Ids elegidos a partir de lo que emite la lista. */
export function checkedIds(value: (CheckOption | string)[] | null): string[] {
  return (value || []).map((item) => (typeof item === 'object' ? item.id : item));
}
