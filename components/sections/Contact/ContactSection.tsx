'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

type Field = 'name' | 'subject' | 'email' | 'message'
type FieldErrors = Partial<Record<Field, string>>
type Touched = Record<Field, boolean>

export default function ContactSection() {
  const t = useTranslations('contact')

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [touched, setTouched] = useState<Touched>({
    name: false,
    subject: false,
    email: false,
    message: false,
  })

  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle')

  const copy = useMemo(
    () => ({
      title: t('title'),
      subtitle: t('subtitle'),
      line1: t('line1'),
      line2: t('line2'),
      line3: t('line3'),
      line4: t('line4'),
      button: t('button'),
      success: t('success'),
      failure: t('failure'),
    }),
    [t],
  )

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  function validateField(field: Field, value: string) {
    const v = value.trim()
    let msg = ''

    if (!v) msg = t('errors.required')

    if (field === 'email' && v && !isValidEmail(v)) {
      msg = t('errors.email')
    }

    if (field === 'message' && v && v.length < 10) {
      msg = t('errors.minMessage')
    }

    setErrors((prev) => ({ ...prev, [field]: msg }))
    return !msg
  }

  function handleBlur(field: Field, value: string) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field, value)
  }

  function validateAll() {
    // mark all as touched so errors show if user just hits Send
    setTouched({ name: true, subject: true, email: true, message: true })

    const ok1 = validateField('name', name)
    const ok2 = validateField('subject', subject)
    const ok3 = validateField('email', email)
    const ok4 = validateField('message', message)

    return ok1 && ok2 && ok3 && ok4
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateAll()) return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, subject, email, message }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setErrors({})
      setTouched({ name: false, subject: false, email: false, message: false })
      setName('')
      setSubject('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative w-full py-16 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-transparent" />

      <div className="mx-auto max-w-6xl px-(--page-pad)">
        <header className="text-center">
          <h2 className="font-subtitle text-4xl text-[rgb(var(--fg))] sm:text-5xl font-semibold">
            {copy.title}
          </h2>
          {copy.subtitle ? (
            <p className="font-semibold mx-auto mt-3 max-w-2xl font-nav text-sm text-[rgb(var(--fg))]/80 sm:text-base">
              {copy.subtitle}
            </p>
          ) : null}
        </header>

        <div className="mt-10 flex justify-center">
          <form
            onSubmit={onSubmit}
            className="
              w-full max-w-3xl
              rounded-3xl border border-[rgb(var(--border))]
              bg-[rgb(var(--card))]
              p-6 shadow-sm sm:p-10
            "
          >
            <FieldLine
              label={copy.line1}
              value={name}
              placeholder={t('placeholders.name')}
              onChange={(v) => {
                setName(v)
                if (touched.name) validateField('name', v)
              }}
              onBlur={(v) => handleBlur('name', v)}
              error={touched.name ? errors.name : undefined}
              inputMode="text"
              autoComplete="name"
            />

            <div className="mt-8">
              <FieldLine
                label={copy.line2}
                value={subject}
                placeholder={t('placeholders.subject')}
                onChange={(v) => {
                  setSubject(v)
                  if (touched.subject) validateField('subject', v)
                }}
                onBlur={(v) => handleBlur('subject', v)}
                error={touched.subject ? errors.subject : undefined}
                inputMode="text"
              />
            </div>

            <div className="mt-8">
              <FieldLine
                label={copy.line3}
                value={email}
                placeholder={t('placeholders.email')}
                onChange={(v) => {
                  setEmail(v)
                  if (touched.email) validateField('email', v)
                }}
                onBlur={(v) => handleBlur('email', v)}
                error={touched.email ? errors.email : undefined}
                inputMode="email"
                autoComplete="email"
              />
            </div>

            <div className="mt-8">
              <p className="font-subtitle text-2xl text-[rgb(var(--fg))] sm:text-3xl">
                {copy.line4}
              </p>

              <div className="mt-3">
                <textarea
                  value={message}
                  onChange={(e) => {
                    const v = e.target.value
                    setMessage(v)
                    if (touched.message) validateField('message', v)
                  }}
                  onBlur={(e) => handleBlur('message', e.target.value)}
                  placeholder={t('placeholders.message')}
                  rows={5}
                  className={[
                    'w-full resize-none bg-transparent',
                    'border-b-2 pb-3 outline-none',
                    'text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg))]/35',
                    touched.message && errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[rgb(var(--border))] focus:border-[rgb(var(--fg))]/55',
                  ].join(' ')}
                />

                {touched.message && errors.message ? (
                  <p className="mt-2 font-nav text-xs text-red-500">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className={[
                  'rounded-full px-8 py-3 font-nav text-sm',
                  'transition hover:opacity-80 hover:scale-[1.02]',
                  'bg-[rgb(var(--fg))] text-[rgb(var(--bg))]',
                  status === 'sending' ? 'opacity-60 cursor-not-allowed' : '',
                ].join(' ')}
              >
                {status === 'sending' ? t('sending') : copy.button}
              </button>

              {status === 'success' ? (
                <p className="font-nav text-sm text-emerald-600">
                  {copy.success}
                </p>
              ) : null}

              {status === 'error' ? (
                <p className="font-nav text-sm text-red-600">{copy.failure}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function FieldLine({
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  inputMode,
  autoComplete,
}: {
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  onBlur: (v: string) => void
  error?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
}) {
  return (
    <div>
      <p className="font-subtitle text-2xl text-[rgb(var(--fg))] font-semibold sm:text-3xl">
        {label}
      </p>

      <div className="mt-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={[
            'w-full bg-transparent',
            'border-b-2 pb-3 outline-none',
            'text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg))]/35',
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-[rgb(var(--border))] focus:border-[rgb(var(--fg))]/55',
          ].join(' ')}
        />

        {error ? (
          <p className="mt-2 font-nav text-xs text-red-500">{error}</p>
        ) : null}
      </div>
    </div>
  )
}
