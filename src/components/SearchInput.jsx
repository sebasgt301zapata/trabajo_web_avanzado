import { useState, useRef } from 'react'

export default function SearchInput({ value, onChange, placeholder = 'Buscar...', history = [], onHistorySelect, onHistoryClear }) {
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const showHistory = focused && history.length > 0 && !value.trim()

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-gs-muted2 pointer-events-none z-10">🔍</span>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        className={[
          'w-full py-[13px] pl-11 pr-11 rounded-[14px] bg-white/[0.04] text-gs-text text-[14px] outline-none transition-all font-sans',
          focused
            ? 'border border-brand/60 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]'
            : 'border border-white/[0.08] hover:border-white/20',
        ].join(' ')}
      />

      {value && (
        <button onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-white/[0.08] border-none text-gs-muted text-[11px] px-[7px] py-[3px] rounded-[6px] cursor-pointer font-sans hover:bg-white/15 transition-colors">
          ✕ limpiar
        </button>
      )}

      {showHistory && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-gs-surface3 border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/[0.06]">
            <span className="text-[10px] text-gs-muted2 font-semibold tracking-[1px]">BÚSQUEDAS RECIENTES</span>
            {onHistoryClear && (
              <button onClick={onHistoryClear}
                className="text-[10px] text-gs-muted2 bg-none border-none cursor-pointer font-sans hover:text-red-400 transition-colors">
                limpiar
              </button>
            )}
          </div>
          {history.map(term => (
            <button key={term}
              onClick={() => { onChange(term); onHistorySelect?.(term) }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-transparent border-none text-gs-muted text-[13px] cursor-pointer font-sans text-left hover:bg-brand/[0.08] transition-colors">
              <span className="text-xs opacity-50">↩</span>
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
