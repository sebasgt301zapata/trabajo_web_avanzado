const RAWG_API_KEY = 'YOUR_RAWG_KEY_HERE'
const BASE_URL = 'https://api.rawg.io/api'

/** Mapeo de nombres de género en español a slugs de la API RAWG */
const GENRE_SLUG_MAP = {
  'RPG':         'role-playing-games-rpg',
  'Acción':      'action',
  'Aventura':    'adventure',
  'Indie':       'indie',
  'Horror':      'action',           // RAWG no tiene horror como categoría top-level
  'Roguelike':   'roguelike',
  'Plataformas': 'platformer',
  'Sandbox':     'massively-multiplayer',
  'Puzzles':     'puzzle',
  'Simulación':  'simulation',
  'Estrategia':  'strategy',
  'FPS':         'shooter',
}

/** Mapeo de plataformas locales a IDs de plataforma de RAWG */
const PLATFORM_ID_MAP = {
  'PC':          4,
  'PS5':         187,
  'PS4':         18,
  'Xbox Series': 186,
  'Xbox One':    1,
  'Switch':      7,
  'Móvil':       3,
}

/** Verifica si hay una API key real configurada */
export function hasApiKey() {
  return Boolean(RAWG_API_KEY && RAWG_API_KEY !== 'YOUR_RAWG_KEY_HERE')
}

const buildUrl = (ruta, params = {}) => {
  const url = new URL(`${BASE_URL}${ruta}`)
  if (hasApiKey()) url.searchParams.set('key', RAWG_API_KEY)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v))
  })
  return url.toString()
}

/**
 * Obtiene juegos del catálogo aplicando filtros via la API RAWG.
 * Los nombres de género y plataforma se mapean a los identificadores de RAWG.
 */
export async function fetchGames(filtros = {}) {
  const genreSlug    = filtros.genre    ? GENRE_SLUG_MAP[filtros.genre]         : undefined
  const platformId   = filtros.platform ? PLATFORM_ID_MAP[filtros.platform]     : undefined
  // RAWG usa escala 0–100 en metacritic; el rating interno es 0–5 (escala RAWG)
  const ratingMin    = filtros.rating   ? parseFloat(filtros.rating)             : undefined

  const params = {
    page_size: 40,
    ordering:  '-rating',
    genres:    genreSlug   || undefined,
    platforms: platformId  || undefined,
    // Filtro por metacritic como proxy de calidad cuando hay rating mínimo
    metacritic: ratingMin ? `${Math.round(ratingMin * 20)},100` : undefined,
  }

  const res = await fetch(buildUrl('/games', params))
  if (!res.ok) throw new Error(`Error de API (${res.status})`)
  const data = await res.json()
  return data.results ?? []
}

/**
 * Busca juegos por nombre exacto usando el endpoint de búsqueda de RAWG.
 */
export async function searchGames(consulta) {
  const params = { search: consulta, page_size: 40, search_precise: true }
  const res = await fetch(buildUrl('/games', params))
  if (!res.ok) throw new Error(`Error de API (${res.status})`)
  const data = await res.json()
  return data.results ?? []
}

/**
 * Obtiene el detalle completo de un juego por slug o ID.
 */
export async function fetchGameDetail(slug) {
  const res = await fetch(buildUrl(`/games/${slug}`))
  if (!res.ok) throw new Error(`Error de API (${res.status})`)
  return res.json()
}
