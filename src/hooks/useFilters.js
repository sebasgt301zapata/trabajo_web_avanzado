import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { LS_KEYS } from '../lib/constants.js'

const DEFAULT_FILTERS = { genres: [], platform: '', rating: '' }

/**
 * Hook personalizado para gestionar filtros combinables del catálogo.
 * Persiste en localStorage bajo LS_KEYS.FILTERS.
 * genres es un array que permite selección múltiple.
 */
export function useFilters() {
  const [filters, setFilters] = useLocalStorage(LS_KEYS.FILTERS, DEFAULT_FILTERS)

  // Asegurar migración de filtros viejos (genre: string -> genres: array)
  const safeFilters = {
    genres:   Array.isArray(filters.genres)
                ? filters.genres
                : (filters.genre ? [filters.genre] : []),
    platform: filters.platform ?? '',
    rating:   filters.rating   ?? '',
  }

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, [setFilters])

  const toggleGenre = useCallback((genre) => {
    setFilters(prev => {
      const current = Array.isArray(prev.genres) ? prev.genres : []
      const next = current.includes(genre)
        ? current.filter(g => g !== genre)
        : [...current, genre]
      return { ...prev, genres: next }
    })
  }, [setFilters])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [setFilters])

  const hasActiveFilters =
    safeFilters.genres.length > 0 ||
    safeFilters.platform !== '' ||
    safeFilters.rating !== ''

  return { filters: safeFilters, setFilter, toggleGenre, resetFilters, hasActiveFilters }
}
