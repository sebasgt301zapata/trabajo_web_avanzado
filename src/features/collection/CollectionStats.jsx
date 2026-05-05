import { useMemo } from 'react'

const TARJETAS = [
  { key: 'all',       label: 'Total',       color: '#a78bfa' },
  { key: 'favorites', label: 'Favoritos',   color: '#fde68a' },
  { key: 'playing',   label: 'Jugando',     color: '#93c5fd' },
  { key: 'completed', label: 'Completados', color: '#86efac' },
]

export default function CollectionStats({ conteos: counts, tabActivo: activeTab, onCambiarTab: onTabChange }) {
  const pct = useMemo(() =>
    counts.all ? Math.round((counts.completed / counts.all) * 100) : 0
  , [counts.completed, counts.all])

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-2.5 flex-wrap">
        {TARJETAS.map(s => {
          const activa = activeTab === s.key
          return (
            <div key={s.key} onClick={() => onTabChange(s.key)}
              className={[
                'rounded-xl px-5 py-3 text-center min-w-[88px] cursor-pointer transition-all border',
                activa ? '-translate-y-0.5' : 'hover:-translate-y-px',
              ].join(' ')}
              style={{
                background: activa ? `${s.color}15` : 'rgba(255,255,255,0.03)',
                borderColor: activa ? `${s.color}40` : 'rgba(255,255,255,0.06)',
                boxShadow: activa ? `0 4px 16px ${s.color}20` : 'none',
              }}>
              <p className="font-display text-[28px] leading-none" style={{ color: s.color }}>{counts[s.key]}</p>
              <p className="text-[10px] text-gs-muted2 tracking-[1px] mt-[3px]">{s.label.toUpperCase()}</p>
            </div>
          )
        })}
      </div>

      {counts.all > 0 && (
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-gs-muted2 font-semibold tracking-[1px]">PROGRESO DE COLECCIÓN</span>
            <span className={`text-[11px] font-bold ${pct === 100 ? 'text-[#22c55e]' : 'text-brand-light'}`}>
              {counts.completed}/{counts.all} completados · {pct}%
            </span>
          </div>
          <div className="h-[5px] bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${pct}%`,
                background: pct === 100 ? 'linear-gradient(90deg,#7c3aed,#22c55e)' : 'linear-gradient(90deg,#7c3aed,#a855f7)',
                boxShadow: pct > 0 ? '0 0 8px rgba(124,58,237,0.5)' : 'none',
              }} />
          </div>
        </div>
      )}
    </div>
  )
}
