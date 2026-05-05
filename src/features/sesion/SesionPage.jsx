import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import { useToast } from '../../components/Toast.jsx'
import { initials, formatRelativeDate } from '../../lib/utils.js'
import { STATUS_MAP } from '../../lib/constants.js'

const ACCESOS = [
  { label: 'Catálogo',  desc: 'Explorar juegos',   icono: '🎮', to: '/',          bg: 'rgba(124,58,237,0.15)', borde: 'rgba(124,58,237,0.3)' },
  { label: 'Colección', desc: 'Ver mis juegos',     icono: '📚', to: '/coleccion', bg: 'rgba(59,130,246,0.15)',  borde: 'rgba(59,130,246,0.3)' },
  { label: 'Perfil',    desc: 'Mis preferencias',   icono: '⚙',  to: '/perfil',    bg: 'rgba(16,185,129,0.15)', borde: 'rgba(16,185,129,0.3)' },
]

export default function SesionPage() {
  const { profile, sesionActiva, sesion, iniciarSesion, cerrarSesion, isProfileSetup, collection } = useAppContext()
  const navigate       = useNavigate()
  const [searchParams] = useSearchParams()
  const { mostrar }    = useToast()
  const destino        = searchParams.get('redirect') ?? '/'
  const av             = initials(profile?.username ?? '')

  const stats = {
    total:      collection.length,
    jugando:    collection.filter(g => g.status === 'playing').length,
    completado: collection.filter(g => g.status === 'completed').length,
    porJugar:   collection.filter(g => g.status === 'wishlist').length,
  }

  const handleIniciar = () => {
    iniciarSesion()
    mostrar(`¡Bienvenido, ${profile.username}!`, 'exito')
    navigate(destino, { replace: true })
  }

  const handleCerrar = () => {
    cerrarSesion()
    mostrar('Sesión cerrada correctamente', 'info')
    navigate('/', { replace: true })
  }

  return (
    <div className="max-w-[520px] mx-auto flex flex-col gap-7">
      <div className="border-b border-brand/[0.12] pb-5">
        <p className="text-[11px] text-brand font-semibold tracking-[3px] mb-1.5">
          {sesionActiva ? 'SESIÓN ACTIVA' : 'ACCESO'}
        </p>
        <h1 className="font-display text-[52px] tracking-[6px] text-white leading-none">
          {sesionActiva ? 'MI CUENTA' : 'INICIAR SESIÓN'}
        </h1>
      </div>

      {sesionActiva && profile ? (
        <div className="flex flex-col gap-4">
          {/* Tarjeta principal */}
          <div className="rounded-[20px] p-6 border border-brand/35"
            style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.14) 0%,rgba(168,85,247,0.06) 100%)' }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center font-display text-2xl text-white border-2 border-[rgba(167,139,250,0.4)] shadow-[0_0_28px_rgba(124,58,237,0.55)]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                {av || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display text-[26px] tracking-[3px] text-white leading-none mb-[5px]">{profile.username}</p>
                <div className="flex gap-2 flex-wrap items-center">
                  {profile.favoritePlatform && (
                    <span className="text-[11px] font-semibold text-brand-light bg-brand/20 px-[9px] py-[2px] rounded-full border border-brand/35">
                      {profile.favoritePlatform}
                    </span>
                  )}
                  {profile.weeklyHours && <span className="text-[11px] text-gs-muted">{profile.weeklyHours}</span>}
                </div>
                {sesion?.ultimoAcceso && (
                  <p className="text-[11px] text-gs-muted2 mt-[5px]">Último acceso {formatRelativeDate(sesion.ultimoAcceso)}</p>
                )}
              </div>
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                <span className="text-[9px] text-gs-green font-semibold tracking-[1px]">EN LÍNEA</span>
              </div>
            </div>

            {profile.favoriteGenres?.length > 0 && (
              <div className="flex gap-[5px] flex-wrap mb-5">
                {profile.favoriteGenres.map(g => (
                  <span key={g} className="text-[10px] px-[9px] py-[2px] rounded-full font-semibold bg-[rgba(167,139,250,0.1)] text-brand-light border border-[rgba(167,139,250,0.25)]">
                    {g}
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Total',      valor: stats.total,      color: '#a78bfa' },
                { label: 'Jugando',    valor: stats.jugando,    color: '#93c5fd' },
                { label: 'Completado', valor: stats.completado, color: '#86efac' },
                { label: 'Por jugar',  valor: stats.porJugar,   color: '#fcd34d' },
              ].map(s => (
                <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-[10px] py-2.5 px-1.5 text-center">
                  <p className="font-display text-2xl leading-none" style={{ color: s.color }}>{s.valor}</p>
                  <p className="text-[9px] text-gs-muted2 tracking-[0.8px] mt-0.5">{s.label.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Accesos rápidos */}
          <div className="grid grid-cols-3 gap-2.5">
            {ACCESOS.map(item => (
              <Link key={item.to} to={item.to}
                className="flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-[14px] no-underline transition-all hover:-translate-y-0.5 border"
                style={{ background: item.bg, borderColor: item.borde }}>
                <span className="text-[22px]">{item.icono}</span>
                <div className="text-center">
                  <p className="text-[12px] font-bold text-gs-text mb-px">{item.label}</p>
                  <p className="text-[10px] text-gs-muted">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Cerrar sesión */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-gs-text mb-0.5">Cerrar sesión</p>
              <p className="text-[12px] text-gs-muted2">Tu colección y perfil se mantendrán guardados</p>
            </div>
            <button onClick={handleCerrar}
              className="px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.35)] text-gs-red cursor-pointer font-sans transition-all shrink-0 whitespace-nowrap hover:bg-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.6)] hover:-translate-y-px">
              ✕ Cerrar sesión
            </button>
          </div>
        </div>

      ) : (
        <div className="flex flex-col gap-5">
          {!isProfileSetup && (
            <div className="flex items-center gap-3 px-[18px] py-[14px] rounded-[14px] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] text-gs-amber text-[13px]">
              <span className="text-base shrink-0">⚠</span>
              <span>Aún no tienes perfil.{' '}
                <Link to="/perfil?setup=true" className="text-[#fcd34d] font-semibold no-underline hover:underline">Crear perfil →</Link>
              </span>
            </div>
          )}

          {isProfileSetup && profile && (
            <div className="flex items-center gap-4 px-5 py-[18px] rounded-2xl bg-white/[0.03] border border-white/[0.07]">
              <div className="w-[52px] h-[52px] rounded-full shrink-0 flex items-center justify-center font-display text-xl text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
                {av || '?'}
              </div>
              <div className="flex-1">
                <p className="text-[16px] font-bold text-gs-text mb-[3px]">{profile.username}</p>
                <p className="text-[12px] text-gs-muted">
                  {sesion?.ultimoAcceso
                    ? `Último acceso ${formatRelativeDate(sesion.ultimoAcceso)}`
                    : 'Primera vez que inicias sesión'}
                </p>
              </div>
              {collection.length > 0 && (
                <div className="text-center shrink-0">
                  <p className="font-display text-[22px] text-gs-green leading-none">{collection.length}</p>
                  <p className="text-[9px] text-gs-muted2 tracking-[1px] mt-px">JUEGOS</p>
                </div>
              )}
            </div>
          )}

          <button onClick={handleIniciar} disabled={!isProfileSetup}
            className={[
              'w-full py-4 rounded-[14px] text-[15px] font-bold font-sans transition-all border',
              isProfileSetup
                ? 'bg-brand border-brand text-white cursor-pointer shadow-[0_0_28px_rgba(124,58,237,0.45)] hover:opacity-85 hover:-translate-y-px'
                : 'bg-white/[0.04] border-white/[0.08] text-gs-muted2 cursor-not-allowed',
            ].join(' ')}>
            {isProfileSetup ? '→ Iniciar sesión' : 'Primero crea tu perfil'}
          </button>

          <p className="text-center text-[12px] text-gs-muted3 leading-relaxed">
            La sesión te da acceso a tu colección personal.<br />
            Tu perfil y juegos siempre quedan guardados.
          </p>
        </div>
      )}
    </div>
  )
}
