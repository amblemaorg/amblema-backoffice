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
  /** Solo en compendios por ecotema: número del ecotema de la página (también en los juegos). */
  ecotema?: number | null;
  /** Solo en compendios por ecotema: página de juegos y, si empieza uno, su número. */
  isGame?: boolean;
  game?: number | null;
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

// --- Compendios por ecotema (Ambiente · Venezuela Megadiversa) ---
//
// Encabezados vistos en los compendios refinados (2026-11-23): "Ecotema 1:  Regiones de
// Venezuela", "ECOTEMA  7", "ECOTEMA 1- JUEGOS", "ECOTEMA 3 - Parques…" y en las páginas de
// juegos "Juego 1: ¡Arma el mapa de Venezuela!" ("Juego 3: : ¡Encuentra el par!"). Como en
// el prototipo de Figma: el cuento y el contenido de cada ecotema son una ficha con el número
// del ecotema; cada juego es otra ficha, sin número (se numeran correlativos al cargar).

const ECOTEMA_HEADER = 'ecotema';
// "Ecotema N" puede venir en medio de la línea: pdf.js une "Venezuela Megadiversa" y
// "Ecotema 1: Regiones…" cuando están a la misma altura
const ECOTEMA_IN_LINE = /(?:^|\s)ecotema\s*\d/;
const ECOTEMA_REST = /^(\d{1,2})(?!\d)[\s:.\-–]*(.*)$/;
const GAME_LINE = /^juego\s*(\d{1,2})(?!\d)[\s:.\-–]*(.*)$/i;

/** El tipo usa el formato por ecotema si su encabezado es "Ecotema". */
export function isEcotemaHeader(headerName: string): boolean {
  return fold(headerName) === ECOTEMA_HEADER;
}

/** Lee el ecotema, si es página de juegos y el juego que empieza en la página. */
export function detectEcotemaPage(lines: string[]): DetectedHeader {
  let ecotema: number | null = null;
  let ecotemaTitle: string | null = null;
  let isGame = false;
  let game: number | null = null;
  let gameTitle: string | null = null;
  for (const line of lines.map((item) => normalizeText(item)).filter(Boolean)) {
    // En español, quitar acentos no cambia el largo: la posición sirve en el texto original
    const at = fold(line).search(ECOTEMA_IN_LINE);
    const rest = at < 0 ? null : afterHeaderName(line.slice(at).trim(), ECOTEMA_HEADER);
    const ecotemaMatch = rest === null ? null : ECOTEMA_REST.exec(rest);
    if (ecotemaMatch) {
      const number = parseInt(ecotemaMatch[1], 10);
      const text = stripEdges(ecotemaMatch[2].trim());
      ecotema = ecotema === null ? number : ecotema;
      if (fold(text).startsWith('juegos')) {
        isGame = true;
      } else if (text && !ecotemaTitle && number === ecotema) {
        ecotemaTitle = text;
      }
      continue;
    }
    const gameMatch = game === null ? GAME_LINE.exec(line) : null;
    if (gameMatch) {
      isGame = true;
      game = parseInt(gameMatch[1], 10);
      gameTitle = stripEdges(gameMatch[2].trim()) || null;
    }
  }
  if (ecotema === null) {
    return { headerText: null, number: null, isContinuation: false, title: null };
  }
  if (isGame) {
    return {
      headerText: `Ecotema ${ecotema} · ` + (game === null ? 'juegos (continuación)' : `Juego ${game}: ${gameTitle || ''}`),
      number: null,
      isContinuation: game === null,
      title: gameTitle,
      ecotema,
      isGame,
      game,
    };
  }
  const title = ecotemaTitle ? `Ecotema ${ecotema}: ${ecotemaTitle}` : `Ecotema ${ecotema}`;
  return { headerText: title, number: ecotema, isContinuation: false, title, ecotema, isGame, game };
}

/**
 * Agrupa las páginas de un compendio por ecotema:
 * - Páginas seguidas del mismo ecotema que no son de juegos: una ficha con su número.
 * - "Juego N" abre una ficha sin número; sus páginas siguientes sin "Juego" se le suman.
 * - Una página marcada "JUEGOS" que no empieza un juego se suma a la ficha anterior del mismo
 *   ecotema, sea juego o contenido (3.er lapso: "La Flora" viene marcada "ECOTEMA 7- JUEGOS").
 * - Una página sin ecotema queda sola y sin número: el administrador decide.
 */
export function proposeEcotemaSheets(headers: DetectedHeader[]): ProposedSheet[] {
  const sheets: ProposedSheet[] = [];
  let current: { sheet: ProposedSheet; ecotema: number; game: number | null } | null = null;
  headers.forEach((header, index) => {
    const ecotema = header.ecotema === undefined ? null : header.ecotema;
    if (ecotema === null) {
      current = null;
      sheets.push({ pages: [index], number: null, title: null });
      return;
    }
    const game = header.isGame ? header.game : null;
    const sameEcotema = current && current.ecotema === ecotema;
    const joins = header.isGame
      ? sameEcotema && (game === null || game === current.game)
      : sameEcotema && current.game === null;
    if (joins) {
      current.sheet.pages.push(index);
      return;
    }
    const sheet: ProposedSheet = { pages: [index], number: header.number, title: header.title };
    sheets.push(sheet);
    // Una continuación de juegos sin su "Juego N" (empieza el PDF) queda sola
    current = header.isGame && game === null ? null : { sheet, ecotema, game: header.isGame ? game : null };
  });
  return sheets;
}
