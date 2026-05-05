import { PLATFORMS, GENRES_LIST, HOURS_OPTIONS } from '../../lib/constants.js'
import { initials } from '../../lib/utils.js'

export default function ProfileForm({ form, errors, touched, saved, isSetup, completionPct, onSubmit, onChange, onBlur, onToggleGenre }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      <ProgressBar pct={completionPct} />
      <VistaAvatarPrevia username={form.username} platform={form.favoritePlatform} genres={form.favoriteGenres} />

      {/* Username */}
      <Field label="NOMBRE DE USUARIO" error={errors.username} required>
        <div className="relative">
          <input type="text" value={form.username}
            onChange={e => onChange('username', e.target.value)}
            onBlur={() => onBlur('username')}
            placeholder="ej: ProGamer42" maxLength={20}
            className={inputCls(!!errors.username)} />
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] pointer-events-none ${form.username.length >= 18 ? 'text-amber-400' : 'text-gs-muted3'}`}>
            {form.username.length}/20
          </span>
        </div>
      </Field>

      {/* Bio */}
      <Field label="BIO" hint="opcional">
        <textarea value={form.bio} onChange={e => onChange('bio', e.target.value)}
          placeholder="Cuéntanos sobre ti como gamer..." rows={3} maxLength={200}
          className={`${inputCls(false)} resize-none leading-relaxed`} />
        <span className={`text-[11px] text-right block mt-1 ${form.bio.length >= 180 ? 'text-amber-400' : 'text-gs-muted3'}`}>
          {form.bio.length}/200
        </span>
      </Field>

      {/* Plataforma favorita */}
      <Field label="PLATAFORMA FAVORITA" error={errors.favoritePlatform} required>
        <div className="flex gap-2 flex-wrap">
          {PLATFORMS.map(p => {
            const sel = form.favoritePlatform === p.value
            return (
              <button key={p.value} type="button" onClick={() => onChange('favoritePlatform', p.value)}
                className={`flex items-center gap-[7px] px-[14px] py-[9px] rounded-xl text-[13px] font-medium cursor-pointer transition-all font-sans border ${
                  sel ? 'bg-brand/20 border-brand/60 text-brand-lighter shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                      : errors.favoritePlatform ? 'bg-white/[0.03] border-[rgba(239,68,68,0.3)] text-gs-muted hover:bg-white/[0.06]'
                      : 'bg-white/[0.03] border-white/[0.07] text-gs-muted hover:bg-white/[0.06] hover:text-gs-text'}`}>
                <span className="text-[15px]">{p.icon}</span>
                {p.value}
              </button>
            )
          })}
        </div>
      </Field>

      {/* Géneros favoritos */}
      <Field label="GÉNEROS FAVORITOS" error={errors.favoriteGenres} required
        hint={form.favoriteGenres.length > 0 ? `${form.favoriteGenres.length} seleccionado${form.favoriteGenres.length > 1 ? 's' : ''}` : null}>
        <div className="flex gap-[7px] flex-wrap">
          {GENRES_LIST.map(g => {
            const sel = form.favoriteGenres.includes(g)
            return (
              <button key={g} type="button" onClick={() => onToggleGenre(g)}
                className={`px-[13px] py-[7px] rounded-full text-[12px] font-medium cursor-pointer transition-all font-sans border ${
                  sel ? 'bg-[rgba(167,139,250,0.15)] border-[rgba(167,139,250,0.5)] text-brand-lighter'
                      : errors.favoriteGenres ? 'bg-white/[0.03] border-[rgba(239,68,68,0.3)] text-gs-muted'
                      : 'bg-white/[0.03] border-white/[0.07] text-gs-muted hover:border-white/20 hover:text-gs-text'}`}>
                {sel ? '✓ ' : ''}{g}
              </button>
            )
          })}
        </div>
      </Field>

      {/* Horas semanales */}
      <Field label="HORAS DE JUEGO SEMANALES" error={errors.weeklyHours} required>
        <div className="flex gap-[7px] flex-wrap">
          {HOURS_OPTIONS.map(h => {
            const sel = form.weeklyHours === h.value
            return (
              <button key={h.value} type="button" onClick={() => onChange('weeklyHours', h.value)}
                className={`flex flex-col items-center gap-px px-3 py-2 rounded-[10px] text-[12px] font-semibold cursor-pointer transition-all font-sans border ${
                  sel ? 'bg-[rgba(0,245,212,0.1)] border-[rgba(0,245,212,0.4)] text-[#00f5d4]'
                      : errors.weeklyHours ? 'bg-white/[0.03] border-[rgba(239,68,68,0.3)] text-gs-muted'
                      : 'bg-white/[0.03] border-white/[0.07] text-gs-muted hover:border-white/20'}`}>
                <span className="text-[12px] font-semibold">{h.label}</span>
                <span className="text-[9px] opacity-60">{h.sub}</span>
              </button>
            )
          })}
        </div>
      </Field>

      {/* Toggle compartir colección */}
      <div className="flex items-center justify-between px-[18px] py-[14px] rounded-[14px] bg-white/[0.02] border border-white/[0.06]">
        <div>
          <p className="text-[14px] font-medium text-gs-text mb-0.5">Compartir colección</p>
          <p className="text-[12px] text-gs-muted2">Permite que otros vean tu lista de juegos</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className={`text-[11px] font-semibold ${form.shareCollection ? 'text-gs-green' : 'text-gs-muted'}`}>
            {form.shareCollection ? '✓ Activado' : '✕ Desactivado'}
          </span>
          <button type="button" onClick={() => onChange('shareCollection', !form.shareCollection)}
            className="relative w-[46px] h-[25px] rounded-full border-none cursor-pointer transition-all shrink-0"
            style={{
              background: form.shareCollection ? '#7c3aed' : 'rgba(255,255,255,0.1)',
              boxShadow: form.shareCollection ? '0 0 12px rgba(124,58,237,0.4)' : 'none',
            }}>
            <span className="absolute top-[3px] w-[19px] h-[19px] bg-white rounded-full transition-[left] duration-200"
              style={{ left: form.shareCollection ? '24px' : '2px' }} />
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3.5">
        <button type="submit"
          className="px-7 py-3 rounded-[14px] text-[14px] font-semibold bg-brand text-white border-none cursor-pointer font-sans shadow-[0_0_18px_rgba(124,58,237,0.4)] hover:opacity-85 hover:-translate-y-px transition-all">
          {isSetup ? 'Crear perfil y continuar →' : 'Guardar cambios'}
        </button>
        {saved && !isSetup && (
          <div className="flex items-center gap-[7px] px-[14px] py-[9px] rounded-[10px] bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-gs-green text-[13px] font-medium">
            ✓ Perfil guardado
          </div>
        )}
      </div>
    </form>
  )
}

function ProgressBar({ pct }) {
  const colorCls = pct === 100 ? 'text-[#22c55e]' : pct >= 50 ? 'text-brand-light' : 'text-gs-muted'
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] text-gs-muted2 font-semibold tracking-[1px]">COMPLETITUD DEL PERFIL</span>
        <span className={`text-[11px] font-bold ${colorCls}`}>{pct}%</span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-[width,background] duration-300"
          style={{
            width: `${pct}%`,
            background: pct === 100 ? 'linear-gradient(90deg,#7c3aed,#22c55e)' : 'linear-gradient(90deg,#7c3aed,#a855f7)',
          }} />
      </div>
    </div>
  )
}

function VistaAvatarPrevia({ username, platform, genres }) {
  const av = initials(username) || '?'
  const hasData = username.trim().length >= 3 || platform || genres.length > 0
  if (!hasData) return null
  return (
    <div className="flex items-center gap-3.5 px-[18px] py-[14px] rounded-[14px] bg-white/[0.02] border border-brand/15">
      <div className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-display text-[17px] tracking-wide text-white shadow-[0_0_14px_rgba(124,58,237,0.4)]"
        style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)' }}>
        {av}
      </div>
      <div className="min-w-0">
        <p className={`text-[13px] font-semibold mb-[3px] ${username.trim() ? 'text-gs-text' : 'text-gs-muted2'}`}>
          {username.trim() || 'Tu nombre aquí'}
        </p>
        <div className="flex gap-1.5 flex-wrap items-center">
          {platform && <span className="text-[10px] text-brand-light font-semibold">{platform}</span>}
          {genres.slice(0, 3).map(g => <span key={g} className="text-[10px] text-gs-muted">{g}</span>)}
          {genres.length > 3 && <span className="text-[10px] text-gs-muted2">+{genres.length - 3}</span>}
        </div>
      </div>
      <span className="ml-auto text-[10px] text-gs-muted2 italic shrink-0">vista previa</span>
    </div>
  )
}

function Field({ label, error, required, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-[7px]">
        <label className="text-[10px] font-semibold text-gs-muted tracking-[1.5px]">
          {label}
          {required && <span className="text-brand ml-[3px]">*</span>}
        </label>
        {hint && <span className="text-[11px] text-gs-muted2">· {hint}</span>}
      </div>
      {children}
      {error && <p className="text-[12px] text-gs-red flex items-center gap-[5px]">⚠ {error}</p>}
    </div>
  )
}

const inputCls = (hasError) =>
  `w-full py-[11px] px-[14px] rounded-xl bg-white/[0.04] text-gs-text text-[14px] outline-none font-sans transition-all border focus:border-brand/60 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.12)] ${
    hasError ? 'border-[rgba(239,68,68,0.4)]' : 'border-white/[0.08]'
  }`
