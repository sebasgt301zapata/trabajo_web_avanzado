import { useState, useEffect, useCallback } from 'react'

/**
 * Hook personalizado para sincronizar estado con localStorage.
 * Maneja errores silenciosamente para no romper la app en entornos
 * donde localStorage no está disponible (SSR, modo privado estricto).
 *
 * @template T
 * @param {string} key - Clave de localStorage
 * @param {T} initialValue - Valor inicial si la clave no existe
 * @returns {[T, (value: T | ((prev: T) => T)) => void]}
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // localStorage no disponible (modo privado estricto, cuota llena, etc.)
      // La app sigue funcionando en memoria sin persistencia
    }
  }, [key, storedValue])

  const setValue = useCallback((value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
  }, [storedValue])

  return [storedValue, setValue]
}
