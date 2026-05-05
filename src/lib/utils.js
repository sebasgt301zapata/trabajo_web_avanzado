/**
 * Devuelve el color hex correspondiente al rating dado.
 * @param {number} rating - Valor entre 0 y 5
 * @returns {string} Color hex
 */
export function ratingColor(rating) {
  if (rating >= 4.5) return '#22c55e'
  if (rating >= 4.0) return '#86efac'
  if (rating >= 3.5) return '#fbbf24'
  return '#f87171'
}

/**
 * Formatea una fecha ISO a año legible.
 * @param {string|null} dateStr
 * @returns {number|null}
 */
export function extractYear(dateStr) {
  if (!dateStr) return null
  const y = new Date(dateStr).getFullYear()
  return isNaN(y) ? null : y
}

/**
 * Trunca un string a maxLength caracteres agregando ellipsis.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(str, maxLength = 120) {
  if (!str) return ''
  return str.length <= maxLength ? str : str.slice(0, maxLength).trimEnd() + '…'
}

/**
 * Devuelve las iniciales de un nombre (máx 2 letras).
 * @param {string} name
 * @returns {string}
 */
export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

/**
 * Agrega un término al historial de búsqueda, evitando duplicados
 * y limitando a MAX items.
 * @param {string[]} history
 * @param {string} term
 * @param {number} max
 * @returns {string[]}
 */
export function pushSearchHistory(history, term, max = 5) {
  const trimmed = term.trim()
  if (!trimmed) return history
  const filtered = history.filter(h => h.toLowerCase() !== trimmed.toLowerCase())
  return [trimmed, ...filtered].slice(0, max)
}

/**
 * Devuelve true si el objeto de errores de validación está vacío.
 * @param {Record<string, string|null>} errors
 * @returns {boolean}
 */
export function isFormValid(errors) {
  return Object.values(errors).every(v => !v)
}

/**
 * Formatea una fecha ISO como fecha relativa legible.
 * Ej: "hace 2 días", "hace 1 mes", "hace 3 años"
 * @param {string} dateStr - ISO string
 * @returns {string}
 */
export function formatRelativeDate(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60_000)
  const hours   = Math.floor(diff / 3_600_000)
  const days    = Math.floor(diff / 86_400_000)
  const months  = Math.floor(days / 30)
  const years   = Math.floor(days / 365)

  if (minutes < 1)   return 'justo ahora'
  if (minutes < 60)  return `hace ${minutes}m`
  if (hours < 24)    return `hace ${hours}h`
  if (days < 2)      return 'ayer'
  if (days < 30)     return `hace ${days} días`
  if (months < 12)   return `hace ${months} mes${months > 1 ? 'es' : ''}`
  return `hace ${years} año${years > 1 ? 's' : ''}`
}
