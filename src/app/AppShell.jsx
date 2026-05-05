import { Outlet, NavLink, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { ToastContainer } from '../components/Toast.jsx'

export default function AppShell() {
  const { collection, isProfileSetup, sesionActiva, profile } = useAppContext()

  return (
    <div className="min-h-screen flex flex-col bg-gs-bg">
      <header className="sticky top-0 z-[100] bg-[rgba(8,8,16,0.92)] backdrop-blur-xl border-b border-brand/15">
        <div className="max-w-[1360px] mx-auto px-5 h-16 flex items-center justify-between gap-3">

          <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0">
            <div className="w-[34px] h-[34px] shrink-0 rounded-[10px] flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 20px rgba(124,58,237,0.6)' }}>
              🎮
            </div>
            <span className="font-display text-[22px] tracking-[4px] text-white whitespace-nowrap">
              GAME<span className="text-brand-light">SHELF</span>
            </span>
          </Link>

          <nav className="flex gap-1 items-center flex-wrap justify-end">
            <NavLink to="/" end className={({ isActive }) => navCls(isActive)}>
              Catálogo
            </NavLink>

            <NavLink to="/coleccion" className={({ isActive }) => navCls(isActive)}>
              <span className="flex items-center gap-1.5">
                Colección
                {collection.length > 0 && (
                  <span className="bg-brand text-white text-[10px] font-bold px-1.5 py-px rounded-full leading-4">
                    {collection.length}
                  </span>
                )}
                {!sesionActiva && isProfileSetup && (
                  <span className="text-[10px] opacity-50">🔒</span>
                )}
              </span>
            </NavLink>

            <NavLink to="/perfil" className={({ isActive }) => navCls(isActive)}>
              <span className="flex items-center gap-1.5">
                {isProfileSetup
                  ? <span className="text-xs">⚙</span>
                  : <span className="text-xs opacity-60">🔒</span>}
                Perfil
              </span>
            </NavLink>

            <NavLink to="/sesion" className={({ isActive }) =>
              sesionActiva && !isActive
                ? 'px-4 py-[7px] rounded-[10px] text-[13px] font-medium no-underline transition-all whitespace-nowrap bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] text-gs-green'
                : navCls(isActive)
            }>
              <span className="flex items-center gap-1.5">
                {sesionActiva
                  ? (profile?.username
                      ? <span className="font-display text-[13px] tracking-wide">{profile.username.slice(0, 8).toUpperCase()}</span>
                      : '✓ Sesión')
                  : '→ Entrar'}
              </span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-[1360px] mx-auto w-full px-5 py-8">
        <Outlet />
      </main>

      <footer className="text-center py-5 border-t border-white/5 text-[11px] text-gs-muted3 tracking-widest">
        GAMESHELF · TALLER INTEGRADOR FRONTEND
      </footer>

      <ToastContainer />
    </div>
  )
}

function navCls(isActive) {
  return [
    'px-4 py-[7px] rounded-[10px] text-[13px] font-medium no-underline transition-all whitespace-nowrap',
    isActive
      ? 'bg-brand text-white shadow-[0_0_16px_rgba(124,58,237,0.45)]'
      : 'text-gs-muted hover:text-white hover:bg-white/5 border border-transparent',
  ].join(' ')
}
