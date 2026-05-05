import { useState, useMemo, useCallback } from 'react'
import {
  COLLECTION_TABS,
  COLLECTION_EMPTY_MESSAGES,
  COLLECTION_SORT_OPTIONS,
} from '../lib/constants.js'

/**
 * Encapsula la lógica de la colección:
 * filtrado por tab (incluyendo favoritos), búsqueda, ordenamiento y conteos.
 */
export function useCollection(coleccion, favoritos = []) {
  const [tabActivo,  setTabActivo]  = useState('all')
  const [busqueda,   setBusqueda]   = useState('')
  const [ordenarPor, setOrdenarPor] = useState('addedAt_desc')

  const conteos = useMemo(() => ({
    all:       coleccion.length,
    favorites: coleccion.filter(g => favoritos.includes(g.id)).length,
    playing:   coleccion.filter(g => g.status === 'playing').length,
    completed: coleccion.filter(g => g.status === 'completed').length,
    wishlist:  coleccion.filter(g => g.status === 'wishlist').length,
    dropped:   coleccion.filter(g => g.status === 'dropped').length,
  }), [coleccion, favoritos])

  const filtrados = useMemo(() => {
    let resultado
    if (tabActivo === 'all')       resultado = [...coleccion]
    else if (tabActivo === 'favorites') resultado = coleccion.filter(g => favoritos.includes(g.id))
    else resultado = coleccion.filter(g => g.status === tabActivo)

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      resultado = resultado.filter(g =>
        g.name.toLowerCase().includes(q) ||
        g.genres?.some(genero => genero.toLowerCase().includes(q))
      )
    }

    const [campo, dir] = ordenarPor.split('_')
    resultado.sort((a, b) => {
      let va, vb
      if (campo === 'name')    { va = a.name ?? ''; vb = b.name ?? '' }
      if (campo === 'rating')  { va = a.rating ?? 0; vb = b.rating ?? 0 }
      if (campo === 'year')    { va = a.year ?? 0; vb = b.year ?? 0 }
      if (campo === 'addedAt') { va = a.addedAt ?? ''; vb = b.addedAt ?? '' }
      if (typeof va === 'string') return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      return dir === 'asc' ? va - vb : vb - va
    })

    return resultado
  }, [coleccion, favoritos, tabActivo, busqueda, ordenarPor])

  const mensajeVacio = COLLECTION_EMPTY_MESSAGES[tabActivo] ?? COLLECTION_EMPTY_MESSAGES.all
  const limpiarBusqueda = useCallback(() => setBusqueda(''), [])

  return {
    tabActivo, setTabActivo,
    busqueda, setBusqueda, limpiarBusqueda,
    ordenarPor, setOrdenarPor,
    filtrados, conteos, mensajeVacio,
    TABS: COLLECTION_TABS,
    SORT_OPTIONS: COLLECTION_SORT_OPTIONS,
  }
}
