import { useState } from 'react'
import { FILTER_GENRES, FILTER_PLATFORMS } from '../lib/constants.js'

const RATINGS = [
  { label: '★ 4.5+ Excelente', value: '4.5' },
  { label: '★ 4.0+ Muy bueno', value: '4.0' },
  { label: '★ 3.5+ Bueno',     value: '3.5' },
]

export default function FilterBar({ filters, onFilterChange, onToggleGenre, onReset, hasActiveFilters }) {
  const [expandido, setExpandido] = useState(false)
  const activeCount =
    filters.genres.length +
    (filters.platform ? 1 : 0) +
    (filters.rating   ? 1 : 0)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        <button onClick={() => setExpandido(p => !p)}
          className={[
            'flex items-center gap-2 px-4 py-2 rounded-[10px] text-[12px] font-semibold cursor-pointer font-sans transition-all border',
            hasActiveFilters
              ? 'bg-brand/15 border-brand/40 text-brand-lighter'
              : 'bg-white/[0.04] border-white/[0.08] text-gs-muted hover:text-gs-text hover:bg-white/[0.07]',
          ].join(' ')}>
          <span className="text-sm">⚙</span>
          Filtros
          {hasActiveFilters && (
            <span className="bg-brand text-white text-[9px] font-bold px-[5px] py-px rounded-full">
              {activeCount}
            </span>
          )}
          <span className={`text-[10px] opacity-60 transition-transform duration-200 inline-block ${expandido ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {hasActiveFilters && (
          <button onClick={onReset}
            className="px-3.5 py-2 rounded-[10px] text-[12px] font-medium bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)] text-gs-red cursor-pointer font-sans transition-all hover:bg-[rgba(239,68,68,0.2)]">
            ✕ Limpiar todo
          </button>
        )}
      </div>

      {expandido && (
        <div className="fade-up bg-white/[0.03] border border-white/[0.07] rounded-[14px] p-5 flex flex-col gap-[18px]">
          {/* Géneros — multi-select */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <p className="text-[10px] text-gs-muted2 font-semibold tracking-[1.5px]">GÉNERO</p>
              {filters.genres.length > 0 && (
                <span className="text-[10px] text-brand-light font-semibold">
                  · {filters.genres.length} seleccionado{filters.genres.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {FILTER_GENRES.map(g => {
                const activo = filters.genres.includes(g)
                return (
                  <button key={g} onClick={() => onToggleGenre(g)}
                    className={[
                      'px-3 py-[5px] rounded-full text-[12px] font-medium cursor-pointer transition-all font-sans border',
                      activo
                        ? 'bg-brand/20 border-brand/50 text-brand-lighter shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                        : 'bg-white/[0.04] border-white/[0.08] text-gs-muted hover:bg-white/[0.07] hover:text-gs-text',
                    ].join(' ')}>
                    {activo ? '✓ ' : ''}{g}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Plataforma + Rating */}
          <div className="flex gap-4 flex-wrap">
            <FilterSelect label="PLATAFORMA" value={filters.platform}
              onChange={v => onFilterChange('platform', v)}
              options={FILTER_PLATFORMS.map(p => ({ label: p, value: p }))}
              placeholder="Todas las plataformas" />
            <FilterSelect label="PUNTUACIÓN MÍNIMA" value={filters.rating}
              onChange={v => onFilterChange('rating', v)}
              options={RATINGS}
              placeholder="Cualquier puntuación" />
          </div>
        </div>
      )}
    </div>
  )
}

function FilterSelect({ label, value, onChange, options, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
      <label className="text-[10px] text-gs-muted2 font-semibold tracking-[1.5px]">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className={[
          'rounded-[9px] text-[13px] px-3 py-2 font-sans cursor-pointer outline-none transition-all border focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)]',
          value
            ? 'bg-brand/[0.12] border-brand/40 text-brand-lighter'
            : 'bg-white/[0.05] border-white/[0.08] text-gs-muted',
        ].join(' ')}>
        <option value="">{placeholder}</option>
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    </div>
  )
}
