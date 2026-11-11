import { UploadCut, UploadPage } from 'src/app/_models/vademecum/upload.model';

/**
 * Operaciones de un clic sobre los cortes (BO-04). Funciones puras: devuelven una lista nueva.
 * La API (API-11) exige que los cortes cubran todas las páginas en orden, consecutivas y una
 * sola vez; estas operaciones conservan esa forma. Número o título vacíos los completa la API
 * con el encabezado de la primera página del corte.
 */

export function cloneCuts(cuts: UploadCut[]): UploadCut[] {
  return cuts.map((cut) => ({ ...cut, pages: [...cut.pages] }));
}

/** Une el corte `index` al anterior; conserva número y título del primero. */
export function mergeWithPrevious(cuts: UploadCut[], index: number): UploadCut[] {
  if (index <= 0 || index >= cuts.length) {
    return cuts;
  }
  const result = cloneCuts(cuts);
  const previous = result[index - 1];
  const current = result[index];
  result.splice(index - 1, 2, {
    pages: [...previous.pages, ...current.pages],
    number: previous.number,
    title: previous.title,
    excluded: previous.excluded && current.excluded,
  });
  return result;
}

/** Separa el corte `index` antes de su página en la posición `position` (>= 1). */
export function splitAt(cuts: UploadCut[], index: number, position: number): UploadCut[] {
  const cut = cuts[index];
  if (!cut || position <= 0 || position >= cut.pages.length) {
    return cuts;
  }
  const result = cloneCuts(cuts);
  result.splice(
    index,
    1,
    { ...cut, pages: cut.pages.slice(0, position) },
    // La segunda parte toma número y título de su primera página (los completa la API)
    { pages: cut.pages.slice(position), number: null, title: null, excluded: cut.excluded },
  );
  return result;
}

/**
 * Quita una página que no es ficha: queda sola en un corte excluido. Si el corte ya tenía
 * solo esa página, alterna entre excluido e incluido.
 */
export function togglePage(cuts: UploadCut[], index: number, page: number): UploadCut[] {
  const cut = cuts[index];
  const position = cut ? cut.pages.indexOf(page) : -1;
  if (position < 0) {
    return cuts;
  }
  const result = cloneCuts(cuts);
  if (cut.pages.length === 1) {
    result[index] = { ...result[index], excluded: !cut.excluded };
    return result;
  }
  const before = cut.pages.slice(0, position);
  const after = cut.pages.slice(position + 1);
  const parts: UploadCut[] = [];
  if (before.length) {
    parts.push({ ...cut, pages: before });
  }
  parts.push({ pages: [page], number: null, title: null, excluded: true });
  if (after.length) {
    parts.push({
      pages: after,
      // Si se quitó la primera página, el resto conserva los datos de la ficha
      number: before.length ? null : cut.number,
      title: before.length ? null : cut.title,
      excluded: cut.excluded,
    });
  }
  result.splice(index, 1, ...parts);
  return result;
}

/** Número que tendrá la ficha: el escrito o el del encabezado de su primera página. */
export function effectiveNumber(cut: UploadCut, pages: Map<number, UploadPage>): number | null {
  if (cut.number) {
    return cut.number;
  }
  const first = pages.get(cut.pages[0]);
  return first ? first.number : null;
}

export function effectiveTitle(cut: UploadCut, pages: Map<number, UploadPage>): string | null {
  if (cut.title && cut.title.trim()) {
    return cut.title.trim();
  }
  const first = pages.get(cut.pages[0]);
  return first && first.title ? first.title : null;
}

/** Problemas que la API rechazaría (116), para avisar antes de guardar. */
export function cutProblems(cuts: UploadCut[], pages: Map<number, UploadPage>): string[] {
  const problems: string[] = [];
  const seen = new Map<number, number>();
  cuts.forEach((cut, i) => {
    if (cut.excluded) {
      return;
    }
    const number = effectiveNumber(cut, pages);
    const label = `Ficha ${i + 1} (pág. ${cut.pages[0] + 1})`;
    if (!number) {
      problems.push(`${label}: falta el número.`);
    } else if (seen.has(number)) {
      problems.push(`${label}: el número ${number} se repite.`);
    } else {
      seen.set(number, i);
    }
    if (!effectiveTitle(cut, pages)) {
      problems.push(`${label}: falta el título.`);
    }
  });
  if (!cuts.some((cut) => !cut.excluded)) {
    problems.push('No hay ninguna ficha: todas las páginas están quitadas.');
  }
  return problems;
}
