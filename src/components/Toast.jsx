import { useState, useEffect, useCallback, useRef } from 'react'

let _mostrar = null

export function useToast() {
  const mostrar = useCallback((mensaje, tipo = 'exito') => { _mostrar?.(mensaje, tipo) }, [])
  return { mostrar }
}

const ESTILOS = {
  exito:       { cls: 'bg-[rgba(34,197,94,0.15)] border-[rgba(34,197,94,0.4)] text-gs-green',   icono: '✓' },
  info:        { cls: 'bg-brand/15 border-brand/40 text-brand-lighter',                           icono: 'ℹ' },
  advertencia: { cls: 'bg-[rgba(245,158,11,0.15)] border-[rgba(245,158,11,0.4)] text-gs-amber',  icono: '⚠' },
  error:       { cls: 'bg-[rgba(239,68,68,0.15)] border-[rgba(239,68,68,0.4)] text-gs-red',      icono: '✕' },
}

export function ToastContainer() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    _mostrar = (mensaje, tipo) => {
      clearTimeout(timerRef.current)
      setToast({ mensaje, tipo, id: Date.now() })
      timerRef.current = setTimeout(() => setToast(null), 2200)
    }
    return () => { _mostrar = null; clearTimeout(timerRef.current) }
  }, [])

  if (!toast) return null
  const c = ESTILOS[toast.tipo] ?? ESTILOS.exito

  return (
    <div key={toast.id}
      className={`toast-enter fixed bottom-7 right-7 z-[9999] flex items-center gap-2.5 px-[18px] py-3 rounded-[14px] border text-[13px] font-semibold font-sans shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${c.cls}`}>
      <span className="text-[15px]">{c.icono}</span>
      {toast.mensaje}
    </div>
  )
}
