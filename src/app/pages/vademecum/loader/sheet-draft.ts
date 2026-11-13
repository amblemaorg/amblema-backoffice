/**
 * Ficha armada en el navegador antes de subirla (BO-04 rehecho). Funciones puras para mover
 * páginas entre fichas; el componente solo las llama y muestra el resultado.
 */

export type DraftState = 'pending' | 'uploading' | 'done' | 'error';

export interface SheetDraft {
  key: number;
  /** Índices de página del compendio (desde 0), en el orden en que quedarán en la ficha. */
  pages: number[];
  number: number | null;
  title: string;
  description: string;
  sheetTypeId: string | null;
  seriesId: string | null;
  areaIds: string[];
  grades: string[];
  state: DraftState;
  message: string | null;
  /** Código y estado con que quedó en la API. */
  code: string | null;
  published: boolean;
  /** Id de la ficha creada en la API (para ver su PDF ya optimizado). */
  sheetId: string | null;
}

export interface DraftDefaults {
  sheetTypeId: string | null;
  seriesId: string | null;
  grades: string[];
}

let nextKey = 1;

export function newDraft(
  pages: number[],
  number: number | null,
  title: string | null,
  defaults: DraftDefaults,
): SheetDraft {
  return {
    key: nextKey++,
    pages,
    number,
    title: title || '',
    description: '',
    sheetTypeId: defaults.sheetTypeId,
    seriesId: defaults.seriesId,
    areaIds: [],
    grades: [...defaults.grades],
    state: 'pending',
    message: null,
    code: null,
    published: false,
    sheetId: null,
  };
}

export function isLocked(draft: SheetDraft): boolean {
  return draft.state === 'done' || draft.state === 'uploading';
}

/** Mueve una página dentro de la ficha (-1 a la izquierda, +1 a la derecha). */
export function movePage(draft: SheetDraft, position: number, step: -1 | 1): void {
  const target = position + step;
  if (target < 0 || target >= draft.pages.length) {
    return;
  }
  [draft.pages[position], draft.pages[target]] = [draft.pages[target], draft.pages[position]];
}

/** Pasa una página a la ficha anterior (al final) o a la siguiente (al inicio). */
export function sendPage(drafts: SheetDraft[], index: number, position: number, step: -1 | 1): SheetDraft[] {
  const source = drafts[index];
  const target = drafts[index + step];
  if (!source || !target || isLocked(target)) {
    return drafts;
  }
  const [page] = source.pages.splice(position, 1);
  if (step < 0) {
    target.pages.push(page);
  } else {
    target.pages.unshift(page);
  }
  return drafts.filter((draft) => draft.pages.length > 0);
}

/** Separa la ficha antes de la página `position`; la nueva ficha va justo después. */
export function split(
  drafts: SheetDraft[],
  index: number,
  position: number,
  create: (pages: number[]) => SheetDraft,
): SheetDraft[] {
  const source = drafts[index];
  if (!source || position <= 0 || position >= source.pages.length) {
    return drafts;
  }
  const moved = source.pages.splice(position);
  const result = [...drafts];
  result.splice(index + 1, 0, create(moved));
  return result;
}

/** Une la ficha con la anterior; conserva los datos de la anterior. */
export function mergeWithPrevious(drafts: SheetDraft[], index: number): SheetDraft[] {
  const previous = drafts[index - 1];
  const current = drafts[index];
  if (!previous || !current || isLocked(previous)) {
    return drafts;
  }
  previous.pages.push(...current.pages);
  return drafts.filter((draft) => draft !== current);
}

/** Quita una página de la ficha (va a "Páginas descartadas"). */
export function discardPage(drafts: SheetDraft[], index: number, position: number, discarded: number[]): SheetDraft[] {
  const source = drafts[index];
  if (!source) {
    return drafts;
  }
  const [page] = source.pages.splice(position, 1);
  discarded.push(page);
  discarded.sort((a, b) => a - b);
  return drafts.filter((draft) => draft.pages.length > 0);
}
