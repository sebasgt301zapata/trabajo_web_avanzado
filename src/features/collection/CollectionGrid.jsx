import { Link } from 'react-router-dom'
import { STATUS_MAP } from '../../lib/constants.js'
import { ratingColor, formatRelativeDate } from '../../lib/utils.js'

const OPCIONES = [
  { value: 'wishlist',   label: '📋 Por jugar' },
  { value: 'playing',   label: '🎮 Jugando' },
  { value: 'completed', label: '✅ Completado' },
  { value: 'dropped',   label: '⏸ Abandonado' },
]

export default function CollectionGrid({ juegos: games, onEliminar: onRemove, onCambiarEstado: onStatusChange, onToggleFav, esFavorito }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
      {games.map((game, i) => {
        const ss = STATUS_MAP[game.status] ?? STATUS_MAP.wishlist
        return (
          <div key={game.id} className="card-lift fade-up bg-gs-surface rounded-[14px] overflow-hidden border"
            style={{ borderColor: `${ss.border}30`, opacity: 0, animationFillMode: 'forwards', animationDelay: `${Math.min(i * 0.04, 0.4)}s` }}>

            <div className="relative h-[140px] overflow-hidden bg-[#1a1a28]">
              {game.image
                ? <img src={game.image} alt={game.name} loading="lazy" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-[36px]">🎮</div>
              }
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.95) 0%, transparent 60%)' }} />

              <div className="absolute top-2 left-2 px-[9px] py-[3px] rounded-full text-[10px] font-semibold backdrop-blur-sm border"
                style={{ background: ss.bg, color: ss.color, borderColor: ss.border }}>
                {ss.emoji} {ss.label}
              </div>

              {onToggleFav && (
                <button onClick={() => onToggleFav(game)}
                  title={esFavorito?.(game.id) ? 'Quitar favorito' : 'Añadir favorito'}
                  className={[
                    'absolute top-2 right-2 w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-xs cursor-pointer transition-all border',
                    esFavorito?.(game.id) ? 'bg-[rgba(234,179,8,0.25)] border-[rgba(234,179,8,0.7)]' : 'bg-[rgba(0,0,0,0.75)] border-white/15',
                  ].join(' ')}>
                  {esFavorito?.(game.id) ? '⭐' : '☆'}
                </button>
              )}

              <button onClick={() => onRemove(game.id)}
                className="absolute top-[40px] right-2 w-[26px] h-[26px] bg-[rgba(0,0,0,0.75)] border border-white/10 rounded-[7px] text-gs-muted text-[11px] cursor-pointer flex items-center justify-center transition-all hover:bg-[rgba(239,68,68,0.3)] hover:text-gs-red hover:border-[rgba(239,68,68,0.4)]"
                title="Quitar de colección">✕</button>

              {game.rating > 0 && (
                <div className="absolute bottom-2 right-2 text-[11px] font-bold bg-[rgba(0,0,0,0.8)] px-[7px] py-[2px] rounded-[6px]"
                  style={{ color: ratingColor(game.rating) }}>
                  ★ {game.rating.toFixed(1)}
                </div>
              )}
            </div>

            <div className="px-[14px] pt-3 pb-[14px] flex flex-col gap-2.5">
              <Link to={`/games/${game.slug}`} className="no-underline">
                <p className="text-[13px] font-semibold text-gs-text leading-[1.3] line-clamp-2">{game.name}</p>
              </Link>

              <div className="flex gap-1 flex-wrap">
                {OPCIONES.map(opt => {
                  const activo = (game.status ?? 'wishlist') === opt.value
                  const estilo = STATUS_MAP[opt.value]
                  return (
                    <button key={opt.value} onClick={() => onStatusChange(game.id, opt.value)}
                      title={opt.label}
                      className="flex-1 py-[5px] px-1 rounded-[7px] text-[10px] cursor-pointer font-sans transition-all border overflow-hidden text-ellipsis whitespace-nowrap"
                      style={{
                        fontWeight: activo ? 700 : 500,
                        background: activo ? estilo.bg : 'rgba(255,255,255,0.03)',
                        borderColor: activo ? estilo.border : 'rgba(255,255,255,0.06)',
                        color: activo ? estilo.color : '#4a4a6a',
                      }}>
                      {opt.label}
                    </button>
                  )
                })}
              </div>

              {game.addedAt && (
                <p className="text-[10px] text-gs-muted3 text-right">Agregado {formatRelativeDate(game.addedAt)}</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
