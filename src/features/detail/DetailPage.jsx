import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchGameDetail } from '../../services/rawg.service.js'
import { normalizeGameDetail } from '../../services/games.normalizer.js'
import { useAppContext } from '../../context/AppContext.jsx'
import { STATUS_OPTIONS, GENRE_TEXT_COLORS } from '../../lib/constants.js'
import { ratingColor } from '../../lib/utils.js'
import seedGames from '../../data/games-seed.json'
import EmptyState from '../../components/EmptyState.jsx'

function useResponsiveGrid() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return isMobile
}

export default function DetailPage() {
  const { slug } = useParams()
  const { isInCollection, addToCollection, removeFromCollection, updateGameStatus, collection } = useAppContext()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const isMobile = useResponsiveGrid()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const load = async () => {
      try {
        const raw = await fetchGameDetail(slug)
        if (!cancelled) setGame(normalizeGameDetail(raw))
      } catch {
        const found = seedGames.find(g => g.slug === slug || String(g.id) === slug)
        if (!cancelled) setGame(found ? normalizeGameDetail(found) : null)
      } finally { if (!cancelled) setLoading(false) }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (loading) return <DetailSkeleton isMobile={isMobile} />
  if (!game) return (
    <EmptyState icon="🕹️" title="Juego no encontrado"
      description="No pudimos encontrar este juego."
      action={{ label: '← Volver al catálogo', href: '/' }} />
  )

  const inCollection  = isInCollection(game.id)
  const entry         = collection.find(g => g.id === game.id)
  const currentStatus = entry?.status ?? null
  const currentSO     = STATUS_OPTIONS.find(s => s.value === currentStatus)

  return (
    <div className="fade-up flex flex-col gap-0">
      <Link to="/" className="text-gs-muted2 text-[13px] no-underline inline-flex items-center gap-1.5 mb-5 w-fit transition-colors hover:text-brand-light">
        ← Volver al catálogo
      </Link>

      {/* Hero */}
      <div className="relative rounded-[20px] overflow-hidden mb-7">
        {game.image
          ? <img src={game.image} alt={game.name} className="w-full object-cover block" style={{ height: '340px' }} />
          : <div className="w-full flex items-center justify-center text-[80px]"
              style={{ height: '340px', background: 'linear-gradient(135deg,#1a1a28,#0f0f1c)' }}>🎮</div>
        }
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#080810 0%,rgba(8,8,16,0.65) 45%,transparent 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right,rgba(8,8,16,0.55) 0%,transparent 60%)' }} />

        {game.rating > 0 && (
          <div className="absolute top-4 right-4 bg-[rgba(0,0,0,0.85)] rounded-[14px] px-4 py-2.5 text-center backdrop-blur-sm border"
            style={{ borderColor: `${ratingColor(game.rating)}40` }}>
            <p className="font-display text-[30px] leading-none" style={{ color: ratingColor(game.rating) }}>{game.rating.toFixed(1)}</p>
            <p className="text-[9px] text-gs-muted tracking-[2px] mt-0.5">RATING</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-7 pb-6">
          <div className="flex gap-[7px] mb-2.5 flex-wrap">
            {game.genres.map(g => (
              <span key={g} className="text-[11px] px-2.5 py-[3px] rounded-full font-semibold backdrop-blur-sm border"
                style={{ background: `${GENRE_TEXT_COLORS[g] ?? '#9ca3af'}20`, color: GENRE_TEXT_COLORS[g] ?? '#9ca3af', borderColor: `${GENRE_TEXT_COLORS[g] ?? '#9ca3af'}45` }}>
                {g}
              </span>
            ))}
            {game.year && <span className="text-[11px] px-2.5 py-[3px] rounded-full font-semibold bg-white/[0.08] text-gs-muted border border-white/[0.12]">{game.year}</span>}
          </div>
          <h1 className="font-display tracking-[4px] text-white leading-none mb-2.5 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]"
            style={{ fontSize: 'clamp(30px, 5vw, 52px)' }}>
            {game.name.toUpperCase()}
          </h1>
          <div className="flex gap-4 flex-wrap">
            {game.metacritic && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gs-muted">Metacritic</span>
                <span className={`text-[12px] font-bold px-[7px] py-[2px] rounded-[6px] border ${game.metacritic >= 90 ? 'bg-[rgba(34,197,94,0.2)] text-gs-green border-[rgba(34,197,94,0.3)]' : 'bg-[rgba(245,158,11,0.2)] text-gs-amber border-[rgba(245,158,11,0.3)]'}`}>
                  {game.metacritic}/100
                </span>
              </div>
            )}
            {game.playtime && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gs-muted">⏱</span>
                <span className="text-[12px] font-semibold text-gs-text">{game.playtime}h aprox.</span>
              </div>
            )}
            {game.developers?.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-gs-muted">🏢</span>
                <span className="text-[12px] font-semibold text-gs-text">{game.developers[0]}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={isMobile ? 'flex flex-col gap-4' : 'grid gap-5'} style={isMobile ? {} : { gridTemplateColumns: 'minmax(0,1fr) minmax(0,280px)' }}>
        <div className="flex flex-col gap-4 min-w-0">
          <Section title="DESCRIPCIÓN">
            <p className="text-[14px] leading-[1.85] text-gs-muted">{game.description ?? 'Sin descripción disponible.'}</p>
          </Section>
          {game.platforms.length > 0 && (
            <Section title="DISPONIBLE EN">
              <div className="flex gap-2 flex-wrap">
                {game.platforms.map(p => (
                  <span key={p} className="text-[12px] px-[14px] py-[7px] rounded-[8px] font-medium bg-white/[0.05] border border-white/[0.09] text-gs-text">{p}</span>
                ))}
              </div>
            </Section>
          )}
        </div>

        <div className="flex flex-col gap-3.5 min-w-0">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-3.5">
            <SectionTitle>MI COLECCIÓN</SectionTitle>
            <button onClick={() => inCollection ? removeFromCollection(game.id) : addToCollection(game)}
              className="w-full py-3 rounded-xl text-[13px] font-semibold cursor-pointer font-sans transition-all border"
              style={{
                background: inCollection ? 'transparent' : '#7c3aed',
                borderColor: inCollection ? 'rgba(239,68,68,0.4)' : '#7c3aed',
                color: inCollection ? '#fca5a5' : '#fff',
                boxShadow: inCollection ? 'none' : '0 0 18px rgba(124,58,237,0.4)',
              }}>
              {inCollection ? '✕ Quitar de colección' : '+ Agregar a colección'}
            </button>
            {inCollection && (
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] text-gs-muted2 tracking-[1.5px] font-semibold">ESTADO ACTUAL</p>
                {STATUS_OPTIONS.map(opt => (
                  <button key={opt.value} onClick={() => updateGameStatus(game.id, opt.value)}
                    className="py-[9px] px-3 rounded-[10px] text-[13px] text-left cursor-pointer transition-all font-sans font-medium border"
                    style={{
                      background: currentStatus === opt.value ? opt.bg : 'rgba(255,255,255,0.02)',
                      borderColor: currentStatus === opt.value ? opt.border : 'rgba(255,255,255,0.05)',
                      color: currentStatus === opt.value ? opt.color : '#4a4a6a',
                    }}>
                    {opt.emoji} {opt.label}
                    {currentStatus === opt.value && <span className="float-right text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
            {inCollection && currentSO && (
              <div className="px-3 py-2 rounded-[10px] text-[12px] font-semibold text-center border"
                style={{ background: currentSO.bg, borderColor: currentSO.border, color: currentSO.color }}>
                {currentSO.emoji} {currentSO.label}
              </div>
            )}
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5">
            <SectionTitle>DATOS</SectionTitle>
            <div className="mt-3.5">
              {[
                game.rating     && { label: 'Rating',          value: `★ ${game.rating.toFixed(1)} / 5`, hl: ratingColor(game.rating) },
                game.metacritic && { label: 'Metacritic',      value: `${game.metacritic} / 100` },
                game.year       && { label: 'Lanzamiento',     value: game.year },
                game.playtime   && { label: 'Duración aprox.', value: `${game.playtime} horas` },
                game.developers?.length && { label: 'Desarrollador', value: game.developers.join(', ') },
                game.publishers?.length && { label: 'Publisher',     value: game.publishers[0] },
              ].filter(Boolean).map((s, i, arr) => (
                <div key={s.label} className={`flex justify-between items-center py-[9px] ${i < arr.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  <span className="text-[12px] text-gs-muted2">{s.label}</span>
                  <span className="text-[12px] font-semibold" style={{ color: s.hl ?? '#e8e8f0' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-display text-[14px] tracking-[3px] text-brand flex items-center gap-2">
      <span className="w-[3px] h-[14px] bg-brand rounded-sm inline-block shrink-0" />
      {children}
    </h3>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
      <h2 className="font-display text-[16px] tracking-[3px] text-brand mb-3.5 flex items-center gap-2">
        <span className="w-[3px] h-4 bg-brand rounded-sm inline-block shrink-0" />
        {title}
      </h2>
      {children}
    </div>
  )
}

function DetailSkeleton({ isMobile }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="skeleton" style={{ height: '24px', width: '130px', borderRadius: '8px' }} />
      <div className="skeleton" style={{ height: '340px', borderRadius: '20px' }} />
      <div className={isMobile ? 'flex flex-col gap-4' : 'grid gap-5'} style={isMobile ? {} : { gridTemplateColumns: 'minmax(0,1fr) minmax(0,280px)' }}>
        <div className="flex flex-col gap-4">
          <div className="skeleton" style={{ height: '180px', borderRadius: '16px' }} />
          <div className="skeleton" style={{ height: '100px', borderRadius: '16px' }} />
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="skeleton" style={{ height: '200px', borderRadius: '16px' }} />
          <div className="skeleton" style={{ height: '160px', borderRadius: '16px' }} />
        </div>
      </div>
    </div>
  )
}
