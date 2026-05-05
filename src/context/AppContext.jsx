import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { LS_KEYS, DEFAULT_SESION } from '../lib/constants.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [coleccion,  setColeccion]  = useLocalStorage(LS_KEYS.COLLECTION, [])
  const [perfil,     setPerfil]     = useLocalStorage(LS_KEYS.PROFILE, null)
  const [sesion,     setSesion]     = useLocalStorage(LS_KEYS.SESION, DEFAULT_SESION)
  // Favoritos: set de IDs (independiente del estado del juego)
  const [favoritos,  setFavoritos]  = useLocalStorage('gameshelf_favoritos', [])

  // ── Colección ──────────────────────────────────────────────────────────────
  const agregarAColeccion = useCallback((juego) => {
    setColeccion(prev => {
      if (prev.some(g => g.id === juego.id)) return prev
      return [...prev, { ...juego, addedAt: new Date().toISOString(), status: 'wishlist' }]
    })
  }, [setColeccion])

  const quitarDeColeccion = useCallback((idJuego) => {
    setColeccion(prev => prev.filter(g => g.id !== idJuego))
    // Si se quita de la colección, también se quita de favoritos
    setFavoritos(prev => prev.filter(id => id !== idJuego))
  }, [setColeccion, setFavoritos])

  const actualizarEstadoJuego = useCallback((idJuego, estado) => {
    setColeccion(prev => prev.map(g => g.id === idJuego ? { ...g, status: estado } : g))
  }, [setColeccion])

  const estaEnColeccion = useCallback(
    (idJuego) => coleccion.some(g => g.id === idJuego),
    [coleccion]
  )

  // ── Favoritos ──────────────────────────────────────────────────────────────
  const toggleFavorito = useCallback((juego) => {
    // Si no está en colección, agregarlo primero
    if (!coleccion.some(g => g.id === juego.id)) {
      setColeccion(prev => [...prev, { ...juego, addedAt: new Date().toISOString(), status: 'wishlist' }])
    }
    setFavoritos(prev =>
      prev.includes(juego.id)
        ? prev.filter(id => id !== juego.id)
        : [...prev, juego.id]
    )
  }, [coleccion, setColeccion, setFavoritos])

  const esFavorito = useCallback(
    (idJuego) => favoritos.includes(idJuego),
    [favoritos]
  )

  // ── Perfil ─────────────────────────────────────────────────────────────────
  const perfilConfigurado = useMemo(() => Boolean(perfil?.username), [perfil])
  const actualizarPerfil  = useCallback((datos) => setPerfil(datos), [setPerfil])

  // ── Sesión ─────────────────────────────────────────────────────────────────
  const iniciarSesion = useCallback(() => {
    setSesion({ activa: true, ultimoAcceso: new Date().toISOString() })
  }, [setSesion])

  const cerrarSesion = useCallback(() => {
    setSesion({ activa: false, ultimoAcceso: new Date().toISOString() })
  }, [setSesion])

  const sesionActiva = useMemo(() => Boolean(sesion?.activa), [sesion])

  const valor = useMemo(() => ({
    collection:           coleccion,
    addToCollection:      agregarAColeccion,
    removeFromCollection: quitarDeColeccion,
    updateGameStatus:     actualizarEstadoJuego,
    isInCollection:       estaEnColeccion,
    // Favoritos
    favoritos,
    toggleFavorito,
    esFavorito,
    // Perfil
    profile:              perfil,
    isProfileSetup:       perfilConfigurado,
    updateProfile:        actualizarPerfil,
    // Sesión
    sesion,
    sesionActiva,
    iniciarSesion,
    cerrarSesion,
  }), [
    coleccion, agregarAColeccion, quitarDeColeccion,
    actualizarEstadoJuego, estaEnColeccion,
    favoritos, toggleFavorito, esFavorito,
    perfil, perfilConfigurado, actualizarPerfil,
    sesion, sesionActiva, iniciarSesion, cerrarSesion,
  ])

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext debe usarse dentro de AppProvider')
  return ctx
}
