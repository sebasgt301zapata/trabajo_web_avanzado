import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'

/**
 * Ruta protegida por dos condiciones internas:
 * 1. El perfil debe estar configurado (username)
 * 2. La sesión debe estar activa
 * Si alguna falla, redirige con el motivo en el query param.
 */
export default function ProtectedRoute({ children }) {
  const { isProfileSetup, sesionActiva } = useAppContext()
  const location = useLocation()

  if (!isProfileSetup) {
    return <Navigate to="/perfil?setup=true" replace state={{ from: location }} />
  }

  if (!sesionActiva) {
    return <Navigate to="/sesion?redirect=/coleccion" replace state={{ from: location }} />
  }

  return children
}
