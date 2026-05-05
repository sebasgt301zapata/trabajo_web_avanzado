import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext.jsx'
import { useToast } from './Toast.jsx'
import { GENRE_COLORS } from '../lib/constants.js'
import { ratingColor } from '../lib/utils.js'

const METACRITIC_COLOR = (m) => {
  if (m >= 90) return { text: 'text-gs-green', bg: 'bg-[rgba(34,197,94,0.15)]', border: 'border-[rgba(34,197,94,0.3)]' }
  if (m >= 75) return { text: 'text-gs-yellow', bg: 'bg-[rgba(234,179,8,0.15)]', border: 'border-[rgba(234,179,8,0.3)]' }
  return             { text: 'text-gs-red',   bg: 'bg-[rgba(239,68,68,0.15)]',  border: 'border-[rgba(239,68,68,0.3)]' }
}

export default function GameCard({ game }) {
  const { isInCollection, addToCollection, removeFromCollection, esFavorito, toggleFavorito } = useAppContext()
  const { mostrar } = useToast()
  const enColeccion = isInCollection(game.id)
  const esFav = esFavorito(game.id)

  const handleToggleColeccion = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (enColeccion) {
      removeFromCollection(game.id)
      mostrar(`"${game.name}" eliminado de tu colección`, 'info')
    } else {
      addToCollection(game)
      mostrar(`"${game.name}" agregado a tu colección`, 'exito')
    }
  }

  const handleToggleFavorito = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggleFavorito(game)
    mostrar(esFav ? `Quitado de favoritos` : `"${game.name}" añadido a favoritos ⭐`, esFav ? 'info' : 'exito')
  }

  const generoPrincipal = game.genres?.[0]
  const gc = GENRE_COLORS[generoPrincipal] ?? { bg: 'rgba(107,107,128,0.18)', color: '#9ca3af', border: 'rgba(107,107,128,0.35)' }
  const mc = game.metacritic ? METACRITIC_COLOR(game.metacritic) : null

  return (
    <Link
      to={`/games/${game.slug}`}
      className="card-lift block rounded-2xl overflow-hidden no-underline transition-all"
      style={{
        background: 'linear-gradient(180deg, #13131f 0%, #0f0f1a 100%)',
        border: `1px solid ${esFav ? 'rgba(234,179,8,0.55)' : enColeccion ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.06)'}`,
        boxShadow: esFav ? '0 0 18px rgba(234,179,8,0.13)' : enColeccion ? '0 0 18px rgba(124,58,237,0.13)' : 'none',
      }}
    >
      {/* Portada */}
      <div className="relative h-40 overflow-hidden bg-[#1a1a28]">
        {game.image
          ? <img src={game.image} alt={game.name} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          : <div className="w-full h-full flex items-center justify-center text-[44px]"
              style={{ background: 'linear-gradient(135deg,#1a1a28,#0f0f1c)' }}>🎮</div>
        }

        {/* Degradado */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.96) 0%, rgba(8,8,16,0.4) 45%, transparent 100%)' }} />

        {/* Acciones arriba izquierda */}
        <div className="absolute top-2 left-2 flex flex-col gap-[5px]">
          <button onClick={handleToggleColeccion}
            title={enColeccion ? 'Quitar de colección' : 'Agregar a colección'}
            className={[
              'w-7 h-7 rounded-[8px] flex items-center justify-center text-[13px] text-white cursor-pointer transition-all border',
              enColeccion
                ? 'bg-brand border-brand-light shadow-[0_0_10px_rgba(124,58,237,0.6)]'
                : 'bg-[rgba(0,0,0,0.72)] border-white/20 hover:bg-brand/30'
            ].join(' ')}>
            {enColeccion ? '✓' : '+'}
          </button>
          <button onClick={handleToggleFavorito}
            title={esFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            className={[
              'w-7 h-7 rounded-[8px] flex items-center justify-center text-[12px] cursor-pointer transition-all border',
              esFav
                ? 'bg-[rgba(234,179,8,0.28)] border-[rgba(234,179,8,0.75)] shadow-[0_0_10px_rgba(234,179,8,0.45)]'
                : 'bg-[rgba(0,0,0,0.72)] border-white/20 hover:bg-[rgba(234,179,8,0.15)]'
            ].join(' ')}>
            {esFav ? '⭐' : '☆'}
          </button>
        </div>

        {/* Rating arriba derecha */}
        {game.rating > 0 && (
          <div className="absolute top-2 right-2 bg-[rgba(0,0,0,0.82)] rounded-[7px] px-2 py-[3px] flex items-center gap-[3px] text-[11px] font-bold border border-white/10"
            style={{ color: ratingColor(game.rating) }}>
            ★ {game.rating.toFixed(1)}
          </div>
        )}

        {/* Género abajo izquierda */}
        <div className="absolute bottom-2 left-2">
          <span className="text-[10px] px-[9px] py-[3px] rounded-full font-semibold backdrop-blur-sm border"
            style={{ background: gc.bg, color: gc.color, borderColor: gc.border }}>
            {generoPrincipal ?? 'Misc'}
          </span>
        </div>

        {/* Indicador estado abajo derecha */}
        {(enColeccion || esFav) && (
          <div className="absolute bottom-2 right-2 text-[9px] font-bold px-[7px] py-[2px] rounded-[6px] border tracking-[0.5px]"
            style={{
              color: esFav ? '#fde68a' : '#c4b5fd',
              background: esFav ? 'rgba(234,179,8,0.2)' : 'rgba(124,58,237,0.22)',
              borderColor: esFav ? 'rgba(234,179,8,0.4)' : 'rgba(124,58,237,0.4)',
            }}>
            {esFav ? '⭐ FAV' : 'EN COL.'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-[14px] pt-3 pb-[14px]">
        <p className="text-[13px] font-semibold text-gs-text mb-2 leading-[1.35] line-clamp-2 min-h-9">
          {game.name}
        </p>

        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-[5px] flex-wrap items-center">
            {game.platforms?.slice(0, 2).map(p => (
              <span key={p} className="text-[10px] text-gs-muted3 font-medium bg-white/[0.04] px-[6px] py-px rounded border border-white/[0.06]">
                {p}
              </span>
            ))}
            {game.platforms?.length > 2 && (
              <span className="text-[10px] text-gs-muted3">+{game.platforms.length - 2}</span>
            )}
          </div>
          {game.year && <span className="text-[10px] text-gs-muted3 font-medium">{game.year}</span>}
        </div>

        {mc && game.metacritic && (
          <div className={`inline-flex items-center gap-[5px] text-[10px] font-bold ${mc.bg} ${mc.text} ${mc.border} border px-2 py-[2px] rounded-[6px] mt-1`}>
            <span className="opacity-70">MC</span> {game.metacritic}
          </div>
        )}
      </div>
    </Link>
  )
}
