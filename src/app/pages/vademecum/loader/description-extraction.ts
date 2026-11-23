/**
 * Descripción propuesta de cada ficha, sacada de su primera página (2026-11-23).
 *
 * Lo visto en los compendios: Hora TAL y los juegos de Ambiente traen "Objetivo:"; algunas de
 * Momento X, "Competencia / Habilidad:". Laboratorio de Matemagia y los ecotemas de Ambiente no
 * tienen etiqueta: se usa su primer párrafo (decisión del Ing. Fidel). Momento X sin etiqueta
 * empieza con instrucciones ("• Pide a los niños…", "1. Divide…") e Ingenio con el enunciado
 * ("Problema:"): el primer párrafo las descarta solo y quedan sin descripción. Probado con los
 * 17 compendios (2026-11-23): HT 57/57, Ambiente 32/32, Matemagia 9/9, Momento X 4/41,
 * Ingenio 0/10. El administrador la revisa o la escribe antes de subir.
 * Funciones puras: sin PDF ni Angular.
 */

import { fold, normalizeText } from './header-detection';

/** Línea de una página con su borde superior (y PDF, crece hacia arriba) y tamaño de letra. */
export interface DescriptionLine {
  text: string;
  top: number;
  size: number;
}

/** Etiquetas cuya continuación es la descripción. */
const DESCRIPTION_LABEL = /^(objetivos?|prop[oó]sitos?|competencia(?:\s*\/\s*habilidad)?)\s*:\s*(.*)$/i;
/**
 * Otra etiqueta corta el texto ("Preparativos:", "Materiales necesarios:", "I PARTE:"): hasta
 * 5 palabras antes de los dos puntos ("Es todo lo que vemos desde un lugar: …" es una frase).
 */
const ANY_LABEL = /^\s*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ/]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ/]+){0,4}\s*:/;
/** Encabezado o rótulo lateral de Ambiente ("Ecotema 1:", "ECOTEMA 1- JUEGOS"): nunca es cuerpo. */
const ECOTEMA_LINE = /(^|\s)ecotema\s*\d/;
const BULLET = /^[•◦·▪●\-–]/;
/** Paso numerado ("1. Divide a los estudiantes…"): son instrucciones. */
const NUMBERED_STEP = /^\d{1,2}\s*[.)]\s/;
/** Páginas del cuento de un ecotema: no describen la ficha. */
const STORY = /leamos todos juntos|continuamos leyendo/;
/** Más separación que esto entre dos líneas (en tamaños de letra) es otro párrafo. */
const PARAGRAPH_GAP = 1.9;
/** Líneas más cortas que esto antes del primer párrafo son títulos o encabezados. */
const MIN_BODY_LINE = 35;
/** Letra más grande que el cuerpo por más de esto (en puntos) = título (14+) o encabezado (18+). */
const HEADING_SIZE_DIFF = 1.5;
export const MAX_DESCRIPTION = 600;

function clean(lines: DescriptionLine[]): DescriptionLine[] {
  return lines
    .map((line) => ({ ...line, text: normalizeText(line.text) }))
    .filter((line) => line.text.length > 0 && !ECOTEMA_LINE.test(fold(line.text)));
}

function startsBlock(text: string): boolean {
  return BULLET.test(text) || ANY_LABEL.test(text) || NUMBERED_STEP.test(text);
}

/**
 * Tamaño de letra del cuerpo: el que más caracteres tiene en la página (por caracteres y no
 * por líneas: una tabla de números en letra grande tiene muchas líneas cortas).
 */
function bodySize(lines: DescriptionLine[]): number {
  const counts = new Map<number, number>();
  lines
    .filter((line) => line.size > 0)
    .forEach((line) => {
      const size = Math.round(line.size * 2) / 2;
      counts.set(size, (counts.get(size) || 0) + line.text.length);
    });
  let best = 0;
  let bestCount = 0;
  counts.forEach((count, size) => {
    if (count > bestCount) {
      best = size;
      bestCount = count;
    }
  });
  return best;
}

/** Separación entre una línea y la anterior, en tamaños de letra. */
function gap(previous: DescriptionLine, line: DescriptionLine): number {
  return (previous.top - line.top) / (line.size || previous.size || 10);
}

/** Une líneas cortando palabras partidas con guion ("político-" + "administrativa"). */
function join(parts: string[]): string {
  let text = '';
  for (const part of parts) {
    text = !text ? part : /[a-záéíóúñ]-$/i.test(text) ? text.slice(0, -1) + part : `${text} ${part}`;
  }
  return limit(text.trim());
}

/** Recorta a MAX_DESCRIPTION, en el último punto si lo hay. */
function limit(text: string): string {
  if (text.length <= MAX_DESCRIPTION) {
    return text;
  }
  const cut = text.slice(0, MAX_DESCRIPTION);
  const end = cut.lastIndexOf('. ');
  return end > MAX_DESCRIPTION / 2 ? cut.slice(0, end + 1) : cut.trim() + '…';
}

/** Líneas que siguen a `start` hasta otra etiqueta, una viñeta o un salto de párrafo. */
function collect(lines: DescriptionLine[], start: number, first: string): string {
  const parts = first ? [first] : [];
  for (let index = start + 1; index < lines.length; index++) {
    const line = lines[index];
    // "Objetivo:" sola en su línea: el texto puede venir más separado que un párrafo
    const separated = parts.length > 0 && gap(lines[index - 1], line) > PARAGRAPH_GAP;
    if (startsBlock(line.text) || separated) {
      break;
    }
    parts.push(line.text);
  }
  return join(parts);
}

export function isStoryPage(lines: DescriptionLine[]): boolean {
  return lines.some((line) => STORY.test(fold(line.text)));
}

/** Texto tras "Objetivo:", "Propósito:" o "Competencia / Habilidad:", o null. */
export function labeledDescription(rawLines: DescriptionLine[]): string | null {
  const lines = clean(rawLines);
  for (let index = 0; index < lines.length; index++) {
    const match = DESCRIPTION_LABEL.exec(lines[index].text);
    if (match) {
      return collect(lines, index, match[2].trim()) || null;
    }
  }
  return null;
}

/**
 * Primer párrafo de la página. Se saltan los títulos y encabezados: letra más grande que el
 * cuerpo, líneas cortas o contenidas en `skip` (nombre del tipo, título de la ficha). Null si
 * antes del párrafo hay una viñeta, un paso numerado o una etiqueta ("Problema:",
 * "Materiales necesarios:"): entonces son instrucciones o el ejercicio, no una descripción.
 */
export function firstParagraph(rawLines: DescriptionLine[], skip: string[]): string | null {
  const lines = clean(rawLines);
  const body = bodySize(lines);
  const skipped = skip.map((text) => fold(text)).filter(Boolean);
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const folded = fold(line.text);
    // "1. Las Regletas de Cuisenaire": número y título de la ficha, no un paso numerado
    const isTitle = skipped.some((item) => item.includes(folded) || (folded.includes(item) && folded.length <= item.length + 8));
    if (!isTitle && startsBlock(line.text)) {
      return null;
    }
    const heading = isTitle || line.size > body + HEADING_SIZE_DIFF || line.text.length < MIN_BODY_LINE;
    if (!heading) {
      return collect(lines, index, line.text) || null;
    }
  }
  return null;
}

/**
 * Descripción de una ficha a partir de las líneas de sus páginas, en orden:
 * - Con etiqueta en la primera página que no sea del cuento: su texto.
 * - Si no, el primer párrafo de esa página (Matemagia, ecotemas).
 */
export function describeSheet(pages: DescriptionLine[][], skip: string[]): string {
  const page = pages.find((lines) => !isStoryPage(lines));
  if (!page) {
    return '';
  }
  const labeled = labeledDescription(page);
  if (labeled) {
    return labeled;
  }
  return firstParagraph(page, skip) || '';
}
