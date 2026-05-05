import { useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'
import { useProfileForm } from '../../hooks/useProfileForm.js'
import ProfileCard from './ProfileCard.jsx'
import ProfileForm from './ProfileForm.jsx'

export default function ProfilePage() {
  const { profile, updateProfile, collection, isProfileSetup } = useAppContext()
  const [searchParams] = useSearchParams()
  const navigate       = useNavigate()
  const isSetup        = searchParams.get('setup') === 'true'

  const handleSave = useCallback((formData) => {
    updateProfile({ ...formData, createdAt: profile?.createdAt ?? new Date().toISOString() })
    if (isSetup) navigate('/coleccion')
  }, [profile, updateProfile, isSetup, navigate])

  const { form, errors, touched, saved, completionPct, handleChange, handleBlur, toggleGenre, handleSubmit, resetForm } = useProfileForm(profile, handleSave)

  const handleReset = useCallback(() => {
    updateProfile(null)
    resetForm()
  }, [updateProfile, resetForm])

  return (
    <div className="max-w-[680px] mx-auto flex flex-col gap-7">
      <div className="border-b border-brand/[0.12] pb-5">
        <p className="text-[11px] text-brand font-semibold tracking-[3px] mb-1.5">
          {isSetup ? 'CONFIGURACIÓN INICIAL' : 'CONFIGURACIÓN'}
        </p>
        <h1 className="font-display text-[48px] tracking-[6px] text-white leading-none">MI PERFIL</h1>
        <p className="text-[13px] text-gs-muted2 mt-1.5">
          {isSetup ? 'Configura tu perfil para acceder a tu colección.' : 'Gestiona tus preferencias de jugador.'}
        </p>
      </div>

      {isSetup && (
        <div className="flex items-center gap-3 px-[18px] py-[13px] rounded-[14px] bg-brand/[0.08] border border-brand/25 text-brand-lighter text-[13px]">
          <span className="text-base shrink-0">🔒</span>
          <span>Configura tu perfil para acceder a tu colección personal.</span>
        </div>
      )}

      {isProfileSetup && !isSetup && (
        <ProfileCard profile={profile} collection={collection} onReset={handleReset} />
      )}

      <ProfileForm form={form} errors={errors} touched={touched} saved={saved}
        isSetup={isSetup} completionPct={completionPct}
        onSubmit={handleSubmit} onChange={handleChange}
        onBlur={handleBlur} onToggleGenre={toggleGenre} />
    </div>
  )
}
