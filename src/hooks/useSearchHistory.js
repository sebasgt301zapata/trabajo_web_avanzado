import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { pushSearchHistory } from '../lib/utils.js'
import { LS_KEYS, MAX_SEARCH_HISTORY } from '../lib/constants.js'

/**
 * Hook personalizado para gestionar el historial de búsquedas.
 * Persiste en localStorage bajo LS_KEYS.SEARCH_HISTORY.
 * Limita automáticamente a MAX_SEARCH_HISTORY entradas.
 */
export function useSearchHistory() {
  const [historial, setHistorial] = useLocalStorage(LS_KEYS.SEARCH_HISTORY, [])

  const agregarAlHistorial = useCallback((termino) => {
    setHistorial(prev => pushSearchHistory(prev, termino, MAX_SEARCH_HISTORY))
  }, [setHistorial])

  const limpiarHistorial = useCallback(() => setHistorial([]), [setHistorial])

  const eliminarDelHistorial = useCallback((termino) => {
    setHistorial(prev => prev.filter(h => h !== termino))
  }, [setHistorial])

  return { historial: historial, agregarAlHistorial, limpiarHistorial, eliminarDelHistorial }
}
