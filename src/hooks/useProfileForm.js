import { useState, useEffect, useCallback } from 'react'
import { isFormValid } from '../lib/utils.js'

const EMPTY_FORM = {
  username: '', bio: '', favoritePlatform: '',
  favoriteGenres: [], weeklyHours: '', shareCollection: false,
}

function validateField(field, value) {
  switch (field) {
    case 'username':
      if (!value.trim())            return 'El nombre de usuario es obligatorio.'
      if (value.trim().length < 3)  return 'Mínimo 3 caracteres.'
      if (value.trim().length > 20) return 'Máximo 20 caracteres.'
      return null
    case 'favoritePlatform':
      return value ? null : 'Selecciona una plataforma.'
    case 'favoriteGenres':
      return value.length > 0 ? null : 'Selecciona al menos un género.'
    case 'weeklyHours':
      return value ? null : 'Indica cuánto juegas.'
    default:
      return null
  }
}

function validateAll(form) {
  return {
    username:         validateField('username',         form.username),
    favoritePlatform: validateField('favoritePlatform', form.favoritePlatform),
    favoriteGenres:   validateField('favoriteGenres',   form.favoriteGenres),
    weeklyHours:      validateField('weeklyHours',      form.weeklyHours),
  }
}

/**
 * Hook personalizado que encapsula toda la lógica del formulario de perfil.
 * Maneja estado del formulario, errores, campos tocados y validación onBlur.
 *
 * @param {Object|null} initialProfile - Perfil persistido existente o null
 * @param {Function} onSubmit - Callback que recibe el form válido
 */
export function useProfileForm(initialProfile, onSubmit) {
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [saved,   setSaved]   = useState(false)

  // Hidrata el formulario cuando llega el perfil persistido
  useEffect(() => {
    if (initialProfile) {
      setForm({
        username:         initialProfile.username         ?? '',
        bio:              initialProfile.bio              ?? '',
        favoritePlatform: initialProfile.favoritePlatform ?? '',
        favoriteGenres:   initialProfile.favoriteGenres   ?? [],
        weeklyHours:      initialProfile.weeklyHours      ?? '',
        shareCollection:  initialProfile.shareCollection  ?? false,
      })
    }
  }, [initialProfile])

  const handleChange = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
    setErrors(prev => {
      if (!touched[field]) return prev
      return { ...prev, [field]: validateField(field, value) }
    })
  }, [touched])

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    setErrors(prev => ({ ...prev, [field]: validateField(field, form[field]) }))
  }, [form])

  const toggleGenre = useCallback((genre) => {
    setForm(prev => {
      const next = prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
      setErrors(e => ({ ...e, favoriteGenres: validateField('favoriteGenres', next) }))
      setTouched(t => ({ ...t, favoriteGenres: true }))
      return { ...prev, favoriteGenres: next }
    })
  }, [])

  const handleSubmit = useCallback((e) => {
    e?.preventDefault()
    setTouched({ username: true, favoritePlatform: true, favoriteGenres: true, weeklyHours: true })
    const newErrors = validateAll(form)
    setErrors(newErrors)
    if (!isFormValid(newErrors)) return false
    onSubmit({ ...form, username: form.username.trim() })
    setSaved(true)
    return true
  }, [form, onSubmit])

  const resetForm = useCallback(() => {
    setForm(EMPTY_FORM)
    setErrors({})
    setTouched({})
    setSaved(false)
  }, [])

  // Porcentaje de completitud del formulario (para barra de progreso)
  const completionFields = [
    form.username.trim().length >= 3,
    form.favoritePlatform !== '',
    form.favoriteGenres.length > 0,
    form.weeklyHours !== '',
  ]
  const completionPct = Math.round(
    (completionFields.filter(Boolean).length / completionFields.length) * 100
  )

  return {
    form, errors, touched, saved,
    handleChange, handleBlur, toggleGenre, handleSubmit, resetForm,
    completionPct,
  }
}
