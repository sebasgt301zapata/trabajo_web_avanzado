// ─── Colores por género ───────────────────────────────────────────────────────
export const GENRE_COLORS = {
  RPG:         { bg: 'rgba(124,58,237,0.18)',  color: '#c4b5fd', border: 'rgba(124,58,237,0.4)' },
  Acción:      { bg: 'rgba(239,68,68,0.18)',   color: '#fca5a5', border: 'rgba(239,68,68,0.4)' },
  Aventura:    { bg: 'rgba(59,130,246,0.18)',  color: '#93c5fd', border: 'rgba(59,130,246,0.4)' },
  Indie:       { bg: 'rgba(16,185,129,0.18)',  color: '#6ee7b7', border: 'rgba(16,185,129,0.4)' },
  Horror:      { bg: 'rgba(75,85,99,0.3)',     color: '#9ca3af', border: 'rgba(107,114,128,0.4)' },
  Roguelike:   { bg: 'rgba(168,85,247,0.18)',  color: '#e9d5ff', border: 'rgba(168,85,247,0.4)' },
  Plataformas: { bg: 'rgba(236,72,153,0.18)',  color: '#f9a8d4', border: 'rgba(236,72,153,0.4)' },
  Sandbox:     { bg: 'rgba(132,204,22,0.18)',  color: '#bef264', border: 'rgba(132,204,22,0.4)' },
  Puzzles:     { bg: 'rgba(234,179,8,0.18)',   color: '#fde68a', border: 'rgba(234,179,8,0.4)' },
  Simulación:  { bg: 'rgba(6,182,212,0.18)',   color: '#67e8f9', border: 'rgba(6,182,212,0.4)' },
  Estrategia:  { bg: 'rgba(139,92,246,0.18)',  color: '#ddd6fe', border: 'rgba(139,92,246,0.4)' },
  FPS:         { bg: 'rgba(245,158,11,0.18)',  color: '#fcd34d', border: 'rgba(245,158,11,0.4)' },
}

// Colores planos para texto sobre imagen (hero del detalle)
export const GENRE_TEXT_COLORS = {
  RPG: '#a78bfa', Acción: '#f87171', Aventura: '#93c5fd', Indie: '#6ee7b7',
  Horror: '#9ca3af', Roguelike: '#d8b4fe', Plataformas: '#f9a8d4',
  Sandbox: '#bef264', Puzzles: '#fde68a', Simulación: '#67e8f9',
  Estrategia: '#ddd6fe', FPS: '#fcd34d',
}

// ─── Estados de colección ─────────────────────────────────────────────────────
export const STATUS_MAP = {
  wishlist:   { label: 'Por jugar',  emoji: '📋', color: '#9ca3af', bg: 'rgba(107,114,128,0.15)', border: 'rgba(107,114,128,0.3)' },
  playing:    { label: 'Jugando',    emoji: '🎮', color: '#93c5fd', bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)' },
  completed:  { label: 'Completado', emoji: '✅', color: '#86efac', bg: 'rgba(34,197,94,0.15)',   border: 'rgba(34,197,94,0.3)' },
  dropped:    { label: 'Abandonado', emoji: '⏸',  color: '#fca5a5', bg: 'rgba(239,68,68,0.15)',   border: 'rgba(239,68,68,0.3)' },
}

export const STATUS_OPTIONS = Object.entries(STATUS_MAP).map(([value, s]) => ({ value, ...s }))

// ─── Tabs de la colección ─────────────────────────────────────────────────────
export const COLLECTION_TABS = [
  { value: 'all',       label: 'Todos',       emoji: '🗂️' },
  { value: 'favorites', label: 'Favoritos',   emoji: '⭐' },
  { value: 'playing',   label: 'Jugando',     emoji: '🎮' },
  { value: 'wishlist',  label: 'Por jugar',   emoji: '📋' },
  { value: 'completed', label: 'Completados', emoji: '✅' },
  { value: 'dropped',   label: 'Abandonados', emoji: '⏸️' },
]

// Mensajes de estado vacío por tab
export const COLLECTION_EMPTY_MESSAGES = {
  all:       { icon: '📚', title: 'Colección vacía',          desc: 'Explora el catálogo y agrega tus primeros juegos.' },
  favorites: { icon: '⭐', title: 'Sin favoritos aún',        desc: 'Marca juegos con ⭐ para encontrarlos fácilmente aquí.' },
  playing:   { icon: '🎮', title: 'No estás jugando nada',    desc: 'Marca un juego como "Jugando" desde su detalle.' },
  wishlist:  { icon: '📋', title: 'Sin juegos pendientes',    desc: 'Guarda aquí los juegos que quieras jugar próximamente.' },
  completed: { icon: '🏆', title: 'Aún sin completados',      desc: 'Cuando termines un juego, márcalo como completado.' },
  dropped:   { icon: '⏸️', title: 'Ningún juego abandonado',  desc: 'Los juegos que dejes a medias aparecerán aquí.' },
}

// Opciones de ordenamiento de la colección
export const COLLECTION_SORT_OPTIONS = [
  { value: 'addedAt_desc', label: 'Más reciente' },
  { value: 'addedAt_asc',  label: 'Más antiguo' },
  { value: 'name_asc',     label: 'Nombre A–Z' },
  { value: 'name_desc',    label: 'Nombre Z–A' },
  { value: 'rating_desc',  label: 'Mayor puntuación' },
  { value: 'year_desc',    label: 'Más nuevo' },
]

// ─── Opciones de perfil ───────────────────────────────────────────────────────
export const PLATFORMS = [
  { value: 'PC',              icon: '🖥️' },
  { value: 'PlayStation',     icon: '🎮' },
  { value: 'Xbox',            icon: '🟩' },
  { value: 'Nintendo Switch', icon: '🔴' },
  { value: 'Móvil',           icon: '📱' },
  { value: 'Retro',           icon: '👾' },
]

export const GENRES_LIST = [
  'RPG', 'Acción', 'Aventura', 'Indie', 'Horror',
  'Puzzles', 'Plataformas', 'Sandbox', 'Estrategia',
  'Simulación', 'Roguelike', 'FPS',
]

export const FILTER_GENRES    = GENRES_LIST
export const FILTER_PLATFORMS = ['PC', 'PS5', 'PS4', 'Xbox Series', 'Xbox One', 'Switch', 'Móvil']

export const HOURS_OPTIONS = [
  { value: 'Menos de 5h', label: '< 5h',  sub: 'Casual' },
  { value: '5 a 10h',     label: '5–10h', sub: 'Regular' },
  { value: '10 a 20h',    label: '10–20h',sub: 'Dedicado' },
  { value: '20 a 40h',    label: '20–40h',sub: 'Hardcore' },
  { value: 'Más de 40h',  label: '40h+',  sub: 'Pro' },
]

// ─── Claves de localStorage ───────────────────────────────────────────────────
export const LS_KEYS = {
  COLLECTION:     'gameshelf_coleccion',
  PROFILE:        'gameshelf_perfil',
  UI_PREFS:       'gameshelf_preferencias_ui',
  SEARCH_HISTORY: 'gameshelf_historial_busqueda',
  SESION:         'gameshelf_sesion',
  FILTERS:        'gameshelf_filtros',
}

export const DEFAULT_UI_PREFS   = { vistaColeccion: 'grid' }
export const DEFAULT_SESION     = { activa: false, ultimoAcceso: null }
export const MAX_SEARCH_HISTORY = 5
