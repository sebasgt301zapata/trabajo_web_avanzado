import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import { useUIPrefs } from '../../hooks/useUIPrefs.js'
import { useCollection } from '../../hooks/useCollection.js'
import CollectionStats from './CollectionStats.jsx'
import CollectionGrid from './CollectionGrid.jsx'
import CollectionList from './CollectionList.jsx'
import SearchInput from '../../components/SearchInput.jsx'
import EmptyState from '../../components/EmptyState.jsx'

export default function CollectionPage() {
  const { collection, removeFromCollection, updateGameStatus, profile, favoritos, toggleFavorito, esFavorito } = useAppContext()
  const { prefs, setVistaColeccion } = useUIPrefs()
  const vista = prefs.vistaColeccion ?? 'grid'
  const { tabActivo, setTabActivo, busqueda, setBusqueda, limpiarBusqueda, ordenarPor, setOrdenarPor, filtrados, conteos, mensajeVacio, TABS, SORT_OPTIONS } = useCollection(collection, favoritos)

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-brand/[0.12] pb-5">
        <p className="text-[11px] text-brand font-semibold tracking-[3px] mb-1.5">BIBLIOTECA</p>
        <div className="flex items-end justify-between flex-wrap gap-3" style={{ marginBottom: collection.length > 0 ? '20px' : 0 }}>
          <div>
            <h1 className="font-display text-[48px] tracking-[6px] text-white leading-none">MI COLECCIÓN</h1>
            <p className="text-[13px] text-gs-muted2 mt-[5px]">
              {profile?.username ? `Biblioteca de ${profile.username}` : 'Tu biblioteca personal'}
            </p>
          </div>
          <Link to="/" className="px-5 py-2.5 rounded-xl bg-brand text-white text-[13px] font-semibold no-underline shrink-0 shadow-[0_0_16px_rgba(124,58,237,0.4)] hover:opacity-85 transition-opacity">
            + Agregar juegos
          </Link>
        </div>
        {collection.length > 0 && <CollectionStats conteos={conteos} tabActivo={tabActivo} onCambiarTab={setTabActivo} />}
      </div>

      {collection.length === 0 ? (
        <EmptyState icon={mensajeVacio.icon} title={mensajeVacio.title} description={mensajeVacio.desc}
          action={{ label: 'Explorar catálogo', href: '/' }} />
      ) : (
        <>
          <SearchInput value={busqueda} onChange={setBusqueda} placeholder="Buscar en tu colección..." />

          <div className="flex items-center justify-between flex-wrap gap-2.5">
            <div className="flex gap-[5px] flex-wrap">
              {TABS.map(tab => {
                const activo = tabActivo === tab.value
                return (
                  <button key={tab.value} onClick={() => setTabActivo(tab.value)}
                    className={[
                      'px-3 py-1.5 rounded-[10px] text-[12px] font-medium cursor-pointer transition-all font-sans flex items-center gap-[5px] border',
                      activo ? 'bg-brand border-brand text-white shadow-[0_0_10px_rgba(124,58,237,0.35)]'
                              : 'bg-white/[0.04] border-white/[0.07] text-gs-muted hover:text-gs-text',
                    ].join(' ')}>
                    <span className="text-xs">{tab.emoji}</span>
                    {tab.label}
                    {conteos[tab.value] > 0 && (
                      <span className={`text-[10px] px-[5px] py-px rounded-full ${activo ? 'bg-white/20 text-white' : 'bg-white/[0.07] text-gs-muted'}`}>
                        {conteos[tab.value]}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-2 items-center">
              <select value={ordenarPor} onChange={e => setOrdenarPor(e.target.value)}
                className="px-2.5 py-1.5 rounded-[9px] text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-gs-muted cursor-pointer outline-none font-sans transition-all focus:border-brand/40">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>

              <div className="flex bg-white/[0.04] rounded-[10px] p-[3px] border border-white/[0.07]">
                {[{ v: 'grid', icono: '⊞' }, { v: 'list', icono: '☰' }].map(({ v, icono }) => (
                  <button key={v} onClick={() => setVistaColeccion(v)}
                    className={`px-2.5 py-1 rounded-[7px] border-none text-sm cursor-pointer transition-all font-sans ${vista === v ? 'bg-brand text-white' : 'bg-transparent text-gs-muted2 hover:text-gs-muted'}`}>
                    {icono}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filtrados.length === 0 ? (
            <EmptyState icon={busqueda ? '🔍' : mensajeVacio.icon}
              title={busqueda ? 'Sin resultados' : mensajeVacio.title}
              description={busqueda ? `No hay juegos en tu colección que coincidan con "${busqueda}".` : mensajeVacio.desc}
              action={busqueda ? { label: 'Limpiar búsqueda', onClick: limpiarBusqueda } : null} />
          ) : vista === 'grid' ? (
            <CollectionGrid juegos={filtrados} onEliminar={removeFromCollection} onCambiarEstado={updateGameStatus} onToggleFav={toggleFavorito} esFavorito={esFavorito} />
          ) : (
            <CollectionList juegos={filtrados} onEliminar={removeFromCollection} onCambiarEstado={updateGameStatus} onToggleFav={toggleFavorito} esFavorito={esFavorito} />
          )}
        </>
      )}
    </div>
  )
}
