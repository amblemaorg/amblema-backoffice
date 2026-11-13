/**
 * Detección del encabezado "<Tipo> <N>[A]. <Título>" y fichas propuestas (BO-04 rehecho).
 *
 * Traducción de app/services/vademecum/header_detection.py (API-09, probado con 6 de 7
 * compendios reales). Variantes vistas: "1.  Título", "44.Título", "17 .Título",
 * "16 Título", "45A .Título" y el tipo en una línea y el número en la siguiente. El texto se
 * normaliza con NFKC (la ligadura "ﬁ" pasa a "fi") y los tipos se comparan sin mayúsculas
 * ni acentos. Funciones puras: sin PDF ni Angular.
 */

export interface DetectedHeader {
  headerText: string | null;
  number: number | null;
  isContinuation: boolean;
  title: string | null;
}

export interface ProposedSheet {
  pages: number[];
  number: number | null;
  title: string | null;
}

// Número de 1 a 3 cifras, "A" de continuación opcional (no la inicial de una palabra:
// "16 Aprendiendo" es la ficha 16), punto opcional y el título
const NUMBER_LINE = /^(\d{1,3})(?!\d)\s*(?:([Aa])(?![A-Za-zÀ-ÿ]))?\s*\.?\s*(.*)$/;
const MAX_NUMBER = 999;
const EDGE_CHARS = ' .|-–:';

export function normalizeText(text: string | null | undefined): string {
  return (text || '').normalize('NFKC').split(/\s+/).filter(Boolean).join(' ');
}

/** Para comparar: sin acentos ni mayúsculas. */
export function fold(text: string): string {
  return normalizeText(text).normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function stripEdges(text: string): string {
  let start = 0;
  let end = text.length;
  while (start < end && EDGE_CHARS.includes(text[start])) {
    start++;
  }
  while (end > start && EDGE_CHARS.includes(text[end - 1])) {
    end--;
  }
  return text.slice(start, end);
}

function isAlnum(char: string): boolean {
  return /[0-9A-Za-zÀ-ÿ]/.test(char);
}

/** Resto de la línea tras el nombre del tipo, o null si la línea no empieza por él. */
function afterHeaderName(line: string, headerName: string): string | null {
  const normalized = normalizeText(line);
  const folded = fold(normalized);
  const name = fold(headerName);
  if (!name || !folded.startsWith(name)) {
    return null;
  }
  let rest = folded.slice(name.length);
  if (rest && isAlnum(rest[0])) {
    return null; // "Ambientes" no es "Ambiente"
  }
  // En español, quitar acentos no cambia el largo: el resto se toma del texto con acentos
  if (folded.length === normalized.length) {
    rest = normalized.slice(name.length);
  }
  return stripEdges(rest.trim());
}

/** [number, isContinuation, title] de "41A. Título", o null si no empieza por número. */
export function parseNumberLine(text: string): [number, boolean, string | null] | null {
  const match = NUMBER_LINE.exec(normalizeText(text));
  if (!match) {
    return null;
  }
  const number = parseInt(match[1], 10);
  if (number < 1 || number > MAX_NUMBER) {
    return null;
  }
  const title = stripEdges(match[3].trim()) || null;
  return [number, !!match[2], title];
}

/** Busca el encabezado en las primeras líneas de una página (de arriba abajo). */
export function detectHeader(lines: string[], headerName: string): DetectedHeader {
  const clean = lines.map((line) => normalizeText(line)).filter(Boolean);
  for (let index = 0; index < clean.length; index++) {
    const rest = afterHeaderName(clean[index], headerName);
    if (rest === null) {
      continue;
    }
    const candidates = rest ? [rest] : [];
    if (index + 1 < clean.length) {
      candidates.push(clean[index + 1]);
    }
    // Respaldo (no está en la versión Python): el número justo encima del tipo, por si el
    // orden de las líneas sale invertido en algún PDF
    if (index > 0) {
      candidates.push(clean[index - 1]);
    }
    for (const candidate of candidates) {
      const parsed = parseNumberLine(candidate);
      if (parsed) {
        const [number, isContinuation, title] = parsed;
        return {
          headerText: `${normalizeText(headerName)} ${candidate}`,
          number,
          isContinuation,
          title,
        };
      }
    }
    return { headerText: clean[index], number: null, isContinuation: false, title: null };
  }
  return { headerText: null, number: null, isContinuation: false, title: null };
}

/**
 * Agrupa páginas consecutivas en fichas:
 * - Una página con número y sin "A" abre una ficha.
 * - "NA" se une a la ficha N abierta justo antes; si no hay, abre una con ese número.
 * - Una página sin encabezado queda sola y sin número: el administrador decide.
 */
export function proposeSheets(headers: DetectedHeader[]): ProposedSheet[] {
  const sheets: ProposedSheet[] = [];
  let current: ProposedSheet | null = null;
  headers.forEach((header, index) => {
    if (header.number === null) {
      current = null;
      sheets.push({ pages: [index], number: null, title: null });
      return;
    }
    if (header.isContinuation && current && current.number === header.number) {
      current.pages.push(index);
      current.title = current.title || header.title;
      return;
    }
    current = { pages: [index], number: header.number, title: header.title };
    sheets.push(current);
  });
  return sheets;
}
