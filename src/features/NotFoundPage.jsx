import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <p className="font-display text-[120px] tracking-[8px] leading-none text-[#1e1e30]">404</p>
      <h2 className="font-display text-[28px] tracking-[5px] text-gs-text mb-3">PÁGINA NO ENCONTRADA</h2>
      <p className="text-[14px] text-gs-muted2 mb-8 max-w-xs">Esta ruta no existe en GameShelf.</p>
      <Link to="/"
        className="px-7 py-3 rounded-[14px] bg-brand text-white text-[13px] font-semibold no-underline shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:opacity-85 transition-opacity">
        ← Volver al catálogo
      </Link>
    </div>
  )
}
