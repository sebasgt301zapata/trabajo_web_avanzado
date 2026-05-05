import { Routes, Route } from 'react-router-dom'
import { AppProvider } from '../context/AppContext.jsx'
import AppShell from './AppShell.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import CatalogPage from '../features/catalog/CatalogPage.jsx'
import DetailPage from '../features/detail/DetailPage.jsx'
import CollectionPage from '../features/collection/CollectionPage.jsx'
import ProfilePage from '../features/profile/ProfilePage.jsx'
import SesionPage from '../features/sesion/SesionPage.jsx'
import NotFoundPage from '../features/NotFoundPage.jsx'

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<CatalogPage />} />
          <Route path="games/:slug" element={<DetailPage />} />
          <Route
            path="coleccion"
            element={
              <ProtectedRoute>
                <CollectionPage />
              </ProtectedRoute>
            }
          />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="sesion" element={<SesionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}
