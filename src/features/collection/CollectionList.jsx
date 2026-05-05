import { Link } from 'react-router-dom'
import { STATUS_MAP, GENRE_COLORS } from '../../lib/constants.js'
import { ratingColor, formatRelativeDate } from '../../lib/utils.js'

export default function CollectionList({ juegos: games, onEliminar: onRemove, onCambiarEstado: onStatusChange, onToggleFav, esFavorito }) {
  return (
    <div className="flex flex-col gap-1.5">
      {games.map((game, i) => {
        const ss = STATUS_MAP[game.status] ?? STATUS_MAP.wishlist
        const genero = game.genres?.[0]
        const gc = GENRE_COLORS[genero]
        return (
          <div key={game.id} className="fade-up flex items-center gap-3 px-[14px] py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl transition-all hover:border-brand/25"
            style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${Math.min(i * 0.03, 0.4)}s` }}>

            <Link to={`/games/${game.slug}`} className="shrink-0">
              {game.image
                ? <img src={game.image} alt={game.name} className="w-[68px] h-[46px] object-cover rounded-[7px]" />
                : <div className="w-[68px] h-[46px] bg-[#1a1a28] rounded-[7px] flex items-center justify-center text-[18px]">🎮</div>
              }
            </Link>

            <div className="flex-1 min-w-0">
              <Link to={`/games/${game.slug}`} className="no-underline">
                <p className="text-[13px] font-semibold text-gs-text mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{game.name}</p>
              </Link>
              <div className="flex items-center gap-1.5 flex-wrap">
                {genero && gc && (
                  <span className="text-[9px] px-[7px] py-[2px] rounded-full font-semibold border"
                    style={{ background: gc.bg, color: gc.color, borderColor: gc.border }}>{genero}</span>
                )}
                {game.year && <span className="text-[10px] text-gs-muted3">{game.year}</span>}
                {game.addedAt && <span className="text-[10px] text-gs-muted3">· {formatRelativeDate(game.addedAt)}</span>}
              </div>
            </div>

            {game.rating > 0 && (
              <span className="text-[12px] font-bold shrink-0" style={{ color: ratingColor(game.rating) }}>
                ★ {game.rating.toFixed(1)}
              </span>
            )}

            <div className="flex gap-1 shrink-0">
              {Object.entries(STATUS_MAP).map(([val, s]) => {
                const activo = (game.status ?? 'wishlist') === val
                return (
                  <button key={val} onClick={() => onStatusChange(game.id, val)} title={s.label}
                    className="w-7 h-7 rounded-[8px] text-[13px] cursor-pointer transition-all flex items-center justify-center"
                    style={{
                      border: 'none',
                      background: activo ? s.bg : 'rgba(255,255,255,0.03)',
                      outline: `1px solid ${activo ? s.border : 'rgba(255,255,255,0.06)'}`,
                    }}>
                    {s.emoji}
                  </button>
                )
              })}
            </div>

            {onToggleFav && (
              <button onClick={() => onToggleFav(game)}
                title={esFavorito?.(game.id) ? 'Quitar favorito' : 'Añadir favorito'}
                className={`bg-transparent border-none text-[15px] cursor-pointer p-1 shrink-0 transition-opacity ${esFavorito?.(game.id) ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}>
                {esFavorito?.(game.id) ? '⭐' : '☆'}
              </button>
            )}

            <button onClick={() => onRemove(game.id)}
              className="bg-transparent border-none text-gs-muted3 cursor-pointer text-[14px] p-1 shrink-0 transition-colors hover:text-gs-red"
              title="Quitar de colección">✕</button>
          </div>
        )
      })}
    </div>
  )
}
