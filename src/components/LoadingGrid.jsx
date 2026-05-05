export default function LoadingGrid({ count = 12 }) {
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-gs-surface2 border border-white/[0.04]">
          <div className="skeleton" style={{ height: '160px' }} />
          <div className="px-[14px] pt-3 pb-[14px] flex flex-col gap-2">
            <div className="skeleton" style={{ height: '13px', width: '85%' }} />
            <div className="skeleton" style={{ height: '11px', width: '55%' }} />
            <div className="skeleton" style={{ height: '9px', width: '40%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}
