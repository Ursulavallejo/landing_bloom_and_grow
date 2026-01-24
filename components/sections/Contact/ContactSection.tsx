'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'

type FieldName = 'name' | 'subject' | 'email' | 'message'
type FieldErrors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactSection() {
  const t = useTranslations('contact')

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  )
  const [status, setStatus] = useState<Status>('idle')

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

  // Auto-hide success/error message after a while
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return

    const ms = status === 'success' ? 5000 : 9000
    const timer = window.setTimeout(() => setStatus('idle'), ms)

    return () => window.clearTimeout(timer)
  }, [status])

  function validateField(field: FieldName, value: string): string | undefined {
    const v = value.trim()

    if (field === 'name' || field === 'subject') {
      if (!v) return t('errors.required')
      return
    }

    if (field === 'email') {
      if (!v) return t('errors.required')
      if (!EMAIL_RE.test(v)) return t('errors.email')
      return
    }

    // message
    if (!v) return t('errors.required')
    if (v.length < 10) return t('errors.minMessage')
    return
  }

  function setFieldError(field: FieldName, msg?: string) {
    setErrors((prev) => {
      const next = { ...prev }
      if (!msg) delete next[field]
      else next[field] = msg
      return next
    })
  }

  function validateAll(): boolean {
    const next: FieldErrors = {}
    const nameErr = validateField('name', name)
    const subjectErr = validateField('subject', subject)
    const emailErr = validateField('email', email)
    const messageErr = validateField('message', message)

    if (nameErr) next.name = nameErr
    if (subjectErr) next.subject = subjectErr
    if (emailErr) next.email = emailErr
    if (messageErr) next.message = messageErr

    setErrors(next)
    setTouched({ name: true, subject: true, email: true, message: true })
    return Object.keys(next).length === 0
  }

  function clearStatusIfNeeded() {
    // If user interacts again, hide old success/error immediately
    setStatus((s) => (s === 'success' || s === 'error' ? 'idle' : s))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearStatusIfNeeded()

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
      setTouched({})
      setName('')
      setSubject('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      // Keep values so user can retry
    }
  }

  return (
    <section
      id="contact"
      className="relative w-full pt-16 pb-24 sm:pt-24 sm:pb-34 "
    >
      <div className="absolute inset-0 -z-10 bg-transparent " />

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
                clearStatusIfNeeded()
                setName(v)
                if (touched.name)
                  setFieldError('name', validateField('name', v))
              }}
              onBlur={() => {
                setTouched((p) => ({ ...p, name: true }))
                setFieldError('name', validateField('name', name))
              }}
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
                  clearStatusIfNeeded()
                  setSubject(v)
                  if (touched.subject)
                    setFieldError('subject', validateField('subject', v))
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, subject: true }))
                  setFieldError('subject', validateField('subject', subject))
                }}
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
                  clearStatusIfNeeded()
                  setEmail(v)
                  if (touched.email)
                    setFieldError('email', validateField('email', v))
                }}
                onBlur={() => {
                  setTouched((p) => ({ ...p, email: true }))
                  setFieldError('email', validateField('email', email))
                }}
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
                    clearStatusIfNeeded()
                    const v = e.target.value
                    setMessage(v)
                    if (touched.message)
                      setFieldError('message', validateField('message', v))
                  }}
                  onBlur={() => {
                    setTouched((p) => ({ ...p, message: true }))
                    setFieldError('message', validateField('message', message))
                  }}
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
  onBlur?: () => void
  error?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
}) {
  return (
    <div>
      <p className="font-subtitle text-2xl text-[rgb(var(--fg))]  sm:text-3xl">
        {label}
      </p>

      <div className="mt-3">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
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
