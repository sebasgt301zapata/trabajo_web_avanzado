import { useState, useEffect } from 'react'
import { useGames } from '../../hooks/useGames.js'
import { useFilters } from '../../hooks/useFilters.js'
import { useSearchHistory } from '../../hooks/useSearchHistory.js'
import { useAppContext } from '../../context/AppContext.jsx'
import GameCard from '../../components/GameCard.jsx'
import SearchInput from '../../components/SearchInput.jsx'
import FilterBar from '../../components/FilterBar.jsx'
import ActiveFilters from '../../components/ActiveFilters.jsx'
import LoadingGrid from '../../components/LoadingGrid.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ErrorBanner from '../../components/ErrorBanner.jsx'

const POR_PAGINA = 24

export default function CatalogPage() {
  const [consulta, setConsulta] = useState('')
  const [pagina, setPagina] = useState(1)
  const { filters, setFilter, toggleGenre, resetFilters, hasActiveFilters } = useFilters()
  const { games, loading, error, usingFallback } = useGames(consulta, filters)
  const { historial, agregarAlHistorial, limpiarHistorial } = useSearchHistory()
  const { collection, favoritos } = useAppContext()

  useEffect(() => { setPagina(1) }, [consulta, filters.genre, filters.platform, filters.rating])
  useEffect(() => {
    if (!consulta.trim()) return
    const t = setTimeout(() => agregarAlHistorial(consulta), 800)
    return () => clearTimeout(t)
  }, [consulta, agregarAlHistorial])

  const totalPaginas = Math.ceil(games.length / POR_PAGINA)
  const juegosPagina = games.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  return (
    <div className="flex flex-col gap-6">

      {/* Encabezado */}
      <div className="pb-2 border-b border-brand/[0.12]">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-[11px] text-brand font-semibold tracking-[3px] mb-1.5">EXPLORAR</p>
            <h1 className="font-display text-[56px] tracking-[6px] text-white leading-none">
              CATÁLOGO
              <span className="text-brand-light/40 text-[28px] ml-3 tracking-[4px]"> DE JUEGOS</span>
            </h1>
          </div>
          {!loading && (
            <div className="flex gap-2.5">
              <Contador valor={games.length} etiqueta="JUEGOS" color="#a78bfa" />
              {collection.length > 0 && <Contador valor={collection.length} etiqueta="EN COLECCIÓN" color="#86efac" />}
              {favoritos.length > 0  && <Contador valor={favoritos.length}  etiqueta="FAVORITOS"    color="#fde68a" />}
            </div>
          )}
        </div>
      </div>

      <SearchInput value={consulta} onChange={setConsulta} placeholder="Buscar por nombre o género..."
        history={historial} onHistorySelect={setConsulta} onHistoryClear={limpiarHistorial} />

      <FilterBar filters={filters} onFilterChange={setFilter} onToggleGenre={toggleGenre} onReset={resetFilters} hasActiveFilters={hasActiveFilters} />
      <ActiveFilters
        filters={filters}
        onRemove={(key) => setFilter(key, '')}
        onRemoveGenre={(genre) => toggleGenre(genre)}
        onReset={resetFilters}
      />

      {error && <ErrorBanner message={error} isFallback={usingFallback} />}

      {loading ? (
        <LoadingGrid />
      ) : games.length === 0 ? (
        <EmptyState icon="🎮" title="No se encontraron juegos"
          description={hasActiveFilters || consulta ? 'Prueba ajustando los filtros o cambiando tu búsqueda.' : 'No hay juegos disponibles.'}
          action={hasActiveFilters ? { label: 'Limpiar filtros', onClick: resetFilters } : null} />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gs-muted3">
              Mostrando <span className="text-brand-light font-semibold">{(pagina - 1) * POR_PAGINA + 1}–{Math.min(pagina * POR_PAGINA, games.length)}</span> de <span className="text-gs-text font-semibold">{games.length}</span> juegos
            </p>
            {totalPaginas > 1 && (
              <p className="text-[12px] text-gs-muted3">
                Página <span className="text-brand-light font-semibold">{pagina}</span> / {totalPaginas}
              </p>
            )}
          </div>

          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))' }}>
            {juegosPagina.map((game, i) => (
              <div key={game.id} className="fade-up" style={{ animationDelay: `${Math.min(i * 0.03, 0.45)}s`, opacity: 0, animationFillMode: 'forwards' }}>
                <GameCard game={game} />
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <Paginacion pagina={pagina} total={totalPaginas}
              onChange={p => { setPagina(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
          )}
        </>
      )}
    </div>
  )
}

function Contador({ valor, etiqueta, color }) {
  return (
    <div className="rounded-xl px-[18px] py-2.5 text-center min-w-[80px] border"
      style={{ background: `${color}12`, borderColor: `${color}28` }}>
      <p className="font-display text-[26px] leading-none" style={{ color }}>{valor}</p>
      <p className="text-[9px] text-gs-muted tracking-[1px] mt-0.5">{etiqueta}</p>
    </div>
  )
}

function Paginacion({ pagina, total, onChange }) {
  const paginas = []
  const mostrar = new Set([1, total, pagina, pagina - 1, pagina + 1].filter(p => p >= 1 && p <= total))
  const ordenadas = [...mostrar].sort((a, b) => a - b)
  for (let i = 0; i < ordenadas.length; i++) {
    if (i > 0 && ordenadas[i] - ordenadas[i - 1] > 1) paginas.push('...')
    paginas.push(ordenadas[i])
  }
  return (
    <div className="flex justify-center items-center gap-1.5 mt-2">
      <BtnPag onClick={() => onChange(pagina - 1)} disabled={pagina === 1} label="←" />
      {paginas.map((p, i) =>
        p === '...'
          ? <span key={`sep-${i}`} className="text-gs-muted3 text-[13px] px-1">…</span>
          : <BtnPag key={p} onClick={() => onChange(p)} activo={p === pagina} label={p} />
      )}
      <BtnPag onClick={() => onChange(pagina + 1)} disabled={pagina === total} label="→" />
    </div>
  )
}

function BtnPag({ onClick, disabled, activo, label }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={[
        'min-w-9 h-9 rounded-[9px] text-[13px] font-sans cursor-pointer transition-all border px-2',
        activo  ? 'bg-brand border-brand text-white font-bold shadow-[0_0_12px_rgba(124,58,237,0.4)]' : '',
        disabled ? 'bg-transparent border-white/[0.04] text-gs-muted3 cursor-not-allowed' : '',
        !activo && !disabled ? 'bg-white/[0.03] border-white/[0.07] text-gs-muted hover:bg-brand/15 hover:border-brand/35 hover:text-brand-lighter' : '',
      ].join(' ')}>
      {label}
    </button>
  )
}
