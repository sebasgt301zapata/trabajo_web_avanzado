export default function ErrorBanner({ message, isFallback }) {
  return (
    <div className={[
      'flex items-center gap-2.5 px-4 py-[11px] rounded-[11px] text-[12px] font-medium border',
      isFallback
        ? 'bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.3)] text-gs-amber'
        : 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.3)] text-gs-red',
    ].join(' ')}>
      <span className="text-[14px]">{isFallback ? '⚠' : '✕'}</span>
      <span>{message}</span>
    </div>
  )
}
