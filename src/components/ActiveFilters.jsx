export default function ActiveFilters({ filters, onRemove, onRemoveGenre, onReset }) {
  const hasGenres   = filters.genres?.length > 0
  const hasPlatform = filters.platform !== ''
  const hasRating   = filters.rating !== ''
  const totalActive = (filters.genres?.length ?? 0) + (hasPlatform ? 1 : 0) + (hasRating ? 1 : 0)

  if (totalActive === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[11px] text-gs-muted2 font-semibold tracking-[0.5px]">Filtros activos:</span>

      {hasGenres && filters.genres.map(genre => (
        <button key={genre} onClick={() => onRemoveGenre(genre)}
          className="flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand/15 border border-brand/40 text-brand-lighter cursor-pointer font-sans transition-all hover:bg-[rgba(239,68,68,0.15)] hover:border-[rgba(239,68,68,0.4)] hover:text-gs-red">
          {genre} ✕
        </button>
      ))}

      {hasPlatform && (
        <button onClick={() => onRemove('platform')}
          className="flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand/15 border border-brand/40 text-brand-lighter cursor-pointer font-sans transition-all hover:bg-[rgba(239,68,68,0.15)] hover:border-[rgba(239,68,68,0.4)] hover:text-gs-red">
          Plataforma: {filters.platform} ✕
        </button>
      )}

      {hasRating && (
        <button onClick={() => onRemove('rating')}
          className="flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand/15 border border-brand/40 text-brand-lighter cursor-pointer font-sans transition-all hover:bg-[rgba(239,68,68,0.15)] hover:border-[rgba(239,68,68,0.4)] hover:text-gs-red">
          Rating mín.: {filters.rating} ✕
        </button>
      )}

      {totalActive > 1 && (
        <button onClick={onReset}
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-transparent border border-white/10 text-gs-muted2 cursor-pointer font-sans transition-all hover:text-gs-red hover:border-[rgba(239,68,68,0.3)]">
          Limpiar todo ✕
        </button>
      )}
    </div>
  )
}
