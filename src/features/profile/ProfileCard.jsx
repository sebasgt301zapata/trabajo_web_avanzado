import { Link } from 'react-router-dom'
import { initials } from '../../lib/utils.js'

export default function ProfileCard({ profile, collection, onReset }) {
  const stats = {
    total:      collection.length,
    jugando:    collection.filter(g => g.status === 'playing').length,
    completado: collection.filter(g => g.status === 'completed').length,
    porJugar:   collection.filter(g => g.status === 'wishlist').length,
  }

  const miembroDesde = profile.createdAt
    ? new Intl.DateTimeFormat('es', { month: 'long', year: 'numeric' }).format(new Date(profile.createdAt))
    : null

  const av = initials(profile.username)

  return (
    <div className="rounded-[20px] p-6 flex flex-col gap-5 border border-brand/30"
      style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.1) 0%,rgba(168,85,247,0.05) 100%)' }}>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center font-display text-2xl tracking-[2px] text-white border-2 border-[rgba(167,139,250,0.3)] shadow-[0_0_24px_rgba(124,58,237,0.5)]"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
          {av || '?'}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-display text-2xl tracking-[3px] text-white leading-none mb-[5px]">{profile.username}</p>
          <div className="flex gap-2 flex-wrap items-center">
            {profile.favoritePlatform && (
              <span className="text-[11px] text-brand-light font-semibold bg-brand/15 px-2 py-px rounded-full border border-brand/30">
                {profile.favoritePlatform}
              </span>
            )}
            {profile.weeklyHours && <span className="text-[11px] text-gs-muted">{profile.weeklyHours}</span>}
            {miembroDesde && <span className="text-[11px] text-gs-muted2">· Desde {miembroDesde}</span>}
          </div>
          {profile.bio && (
            <p className="text-[12px] text-gs-muted mt-1.5 leading-[1.5] italic">"{profile.bio}"</p>
          )}
        </div>

        <button onClick={onReset}
          className="px-[14px] py-[7px] rounded-[10px] text-[11px] font-semibold bg-transparent border border-[rgba(239,68,68,0.25)] text-gs-muted cursor-pointer font-sans transition-all shrink-0 hover:border-[rgba(239,68,68,0.5)] hover:text-gs-red hover:bg-[rgba(239,68,68,0.08)]">
          ✕ Resetear
        </button>
      </div>

      {profile.favoriteGenres?.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {profile.favoriteGenres.map(g => (
            <span key={g} className="text-[10px] px-2.5 py-[3px] rounded-full font-semibold bg-[rgba(167,139,250,0.12)] text-brand-light border border-[rgba(167,139,250,0.3)]">
              {g}
            </span>
          ))}
        </div>
      )}

      {stats.total > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total',      valor: stats.total,      color: '#a78bfa' },
            { label: 'Jugando',    valor: stats.jugando,    color: '#93c5fd' },
            { label: 'Completado', valor: stats.completado, color: '#86efac' },
            { label: 'Por jugar',  valor: stats.porJugar,   color: '#fcd34d' },
          ].map(s => (
            <div key={s.label} className="bg-white/[0.04] border border-white/[0.07] rounded-[10px] py-2.5 px-2 text-center">
              <p className="font-display text-[22px] leading-none" style={{ color: s.color }}>{s.valor}</p>
              <p className="text-[9px] text-gs-muted2 tracking-[1px] mt-0.5">{s.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2.5 px-[14px] py-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.05]">
          <span className="text-sm">📚</span>
          <p className="text-[12px] text-gs-muted2">
            Tu colección está vacía.{' '}
            <Link to="/" className="text-brand-light no-underline font-semibold hover:underline">Explorar catálogo →</Link>
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-white/[0.02] border border-white/[0.05]">
        <span className="text-[11px] text-gs-muted2">Colección compartida:</span>
        <span className={`text-[11px] font-semibold ${profile.shareCollection ? 'text-gs-green' : 'text-gs-muted'}`}>
          {profile.shareCollection ? '✓ Activado' : '✕ Desactivado'}
        </span>
      </div>
    </div>
  )
}
