import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { LS_KEYS, DEFAULT_UI_PREFS } from '../lib/constants.js'

/**
 * Hook personalizado para preferencias de interfaz de usuario.
 * Persiste en localStorage bajo LS_KEYS.UI_PREFS.
 */
export function useUIPrefs() {
  const [prefs, setPrefs] = useLocalStorage(LS_KEYS.UI_PREFS, DEFAULT_UI_PREFS)

  const setVistaColeccion = useCallback(
    (vista) => setPrefs(prev => ({ ...prev, vistaColeccion: vista })),
    [setPrefs]
  )

  const reiniciarPreferencias = useCallback(
    () => setPrefs(DEFAULT_UI_PREFS),
    [setPrefs]
  )

  return { prefs, setVistaColeccion, reiniciarPreferencias }
}
