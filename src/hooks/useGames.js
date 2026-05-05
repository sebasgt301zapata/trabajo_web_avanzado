import { useState, useEffect, useCallback } from 'react'
import { fetchGames, searchGames, hasApiKey } from '../services/rawg.service.js'
import { normalizeGame } from '../services/games.normalizer.js'
import seedGames from '../data/games-seed.json'

// Seed ya viene ordenado por rating desc — lo normalizamos una sola vez
const SEED_NORMALIZADO = seedGames.map(normalizeGame)

export function useGames(query = '', filters = {}) {
  const [games,        setGames]        = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [usingFallback,setUsingFallback] = useState(false)

  const applyLocalFilters = useCallback((data, q, f) => {
    let result = [...data]

    if (q.trim()) {
      const lower = q.toLowerCase()
      result = result.filter(g =>
        g.name.toLowerCase().includes(lower) ||
        g.genres.some(genre => genre.toLowerCase().includes(lower))
      )
    }
    if (f.genres?.length > 0)
      result = result.filter(g =>
        g.genres.some(genre =>
          f.genres.some(fg => genre.toLowerCase() === fg.toLowerCase())
        )
      )
    if (f.platform)
      result = result.filter(g =>
        g.platforms.some(p => p.toLowerCase().includes(f.platform.toLowerCase()))
      )
    if (f.rating)
      result = result.filter(g => g.rating >= parseFloat(f.rating))

    // Siempre ordenar por rating desc para el catálogo
    result.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name))

    return result
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      if (!hasApiKey()) {
        if (!cancelled) {
          const fallback = applyLocalFilters(SEED_NORMALIZADO, query, filters)
          setGames(fallback)
          setUsingFallback(false)
          setLoading(false)
        }
        return
      }

      try {
        let raw = []
        if (query.trim()) raw = await searchGames(query)
        else               raw = await fetchGames(filters)

        if (!cancelled) {
          const normalized = raw.map(normalizeGame)
          const filtered   = applyLocalFilters(normalized, '', filters)
          setGames(filtered)
          setUsingFallback(false)
        }
      } catch {
        if (!cancelled) {
          const fallback = applyLocalFilters(SEED_NORMALIZADO, query, filters)
          setGames(fallback)
          setUsingFallback(true)
          setError('No se pudo conectar con la API. Mostrando catálogo local.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    const timer = setTimeout(load, query ? 400 : 0)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [query, JSON.stringify(filters.genres), filters.platform, filters.rating, applyLocalFilters])

  return { games, loading, error, usingFallback }
}
