import { Link } from 'react-router-dom'

export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 rounded-2xl text-center bg-white/[0.02] border border-dashed border-white/[0.08]">
      <div className="text-[52px] mb-5 leading-none opacity-70">{icon}</div>
      <h3 className="font-display text-[26px] tracking-[4px] text-gs-text mb-2.5">
        {title.toUpperCase()}
      </h3>
      <p className="text-[13px] text-gs-muted2 max-w-[300px] leading-[1.7]">{description}</p>
      {action && (
        action.href
          ? <Link to={action.href} className="mt-7 px-7 py-[11px] rounded-xl bg-brand text-white text-[13px] font-semibold no-underline shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:opacity-85 transition-opacity inline-block">
              {action.label}
            </Link>
          : <button onClick={action.onClick}
              className="mt-7 px-7 py-[11px] rounded-xl bg-brand text-white text-[13px] font-semibold cursor-pointer font-sans shadow-[0_0_20px_rgba(124,58,237,0.45)] hover:opacity-85 transition-opacity border-none">
              {action.label}
            </button>
      )}
    </div>
  )
}
