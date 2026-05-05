import { extractYear } from '../lib/utils.js'

/**
 * Normaliza un juego crudo (API RAWG o seed local) al modelo interno de la app.
 * Garantiza que todos los campos existan con valores por defecto seguros.
 *
 * @param {Object} raw - Objeto crudo de RAWG o del seed JSON
 * @returns {Object} Juego normalizado
 */
export function normalizeGame(raw) {
  if (!raw || typeof raw !== 'object') return _empty()

  return {
    id:          raw.id ?? Math.random(),
    slug:        raw.slug ?? String(raw.id ?? ''),
    name:        raw.name ?? 'Sin título',
    genres:      normalizeGenres(raw.genres),
    platforms:   normalizePlatforms(raw.platforms),
    released:    raw.released ?? null,
    year:        extractYear(raw.released),
    rating:      typeof raw.rating === 'number' ? raw.rating : 0,
    metacritic:  raw.metacritic ?? null,
    image:       raw.background_image ?? null,
    description: raw.description_raw ?? raw.description ?? null,
    playtime:    raw.playtime ?? null,
    status:      raw.status ?? null,
  }
}

/**
 * Normaliza el detalle completo de un juego (campos extra de RAWG).
 *
 * @param {Object} raw
 * @returns {Object} Juego normalizado con campos de detalle
 */
export function normalizeGameDetail(raw) {
  const base = normalizeGame(raw)
  return {
    ...base,
    description: raw.description_raw ?? raw.description ?? 'Sin descripción disponible.',
    website:     raw.website ?? null,
    developers:  Array.isArray(raw.developers)  ? raw.developers.map(d => d?.name ?? '').filter(Boolean) : [],
    publishers:  Array.isArray(raw.publishers)  ? raw.publishers.map(p => p?.name ?? '').filter(Boolean) : [],
    esrbRating:  raw.esrb_rating?.name ?? null,
  }
}

// ─── Helpers privados ─────────────────────────────────────────────────────────

function normalizeGenres(genres) {
  if (!Array.isArray(genres)) return []
  return genres
    .map(g => (typeof g === 'string' ? g : g?.name))
    .filter(Boolean)
}

function normalizePlatforms(platforms) {
  if (!Array.isArray(platforms)) return []
  return platforms
    .map(p => (typeof p === 'string' ? p : p?.platform?.name ?? p?.name))
    .filter(Boolean)
}

/** Retorna un juego vacío seguro para evitar errores en la UI */
function _empty() {
  return {
    id: null, slug: '', name: 'Sin título', genres: [], platforms: [],
    released: null, year: null, rating: 0, metacritic: null,
    image: null, description: null, playtime: null, status: null,
  }
}
