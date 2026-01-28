'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { MotionFade } from '@/components/visuals/motion/MotionFade'

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

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return
    const ms = status === 'success' ? 5000 : 9000
    const timer = window.setTimeout(() => setStatus('idle'), ms)
    return () => window.clearTimeout(timer)
  }, [status])

  function validateField(field: FieldName, value: string): string | undefined {
    const v = value.trim()
    if (!v) return t('errors.required')

    if (field === 'email' && !EMAIL_RE.test(v)) {
      return t('errors.email')
    }

    if (field === 'message' && v.length < 10) {
      return t('errors.minMessage')
    }

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
    ;(['name', 'subject', 'email', 'message'] as FieldName[]).forEach(
      (field) => {
        const value = { name, subject, email, message }[field]
        const err = validateField(field, value)
        if (err) next[field] = err
      },
    )

    setErrors(next)
    setTouched({ name: true, subject: true, email: true, message: true })
    return Object.keys(next).length === 0
  }

  function clearStatusIfNeeded() {
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

      if (!res.ok) throw new Error()

      setStatus('success')
      setErrors({})
      setTouched({})
      setName('')
      setSubject('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const statusId = 'contact-status'

  return (
    <section id="contact" className="relative w-full pt-16 pb-24 sm:pt-24">
      <div className="mx-auto max-w-6xl px-(--page-pad)">
        <header className="text-center">
          <MotionFade
            as="h2"
            className="font-subtitle text-4xl sm:text-5xl font-semibold"
          >
            {copy.title}
          </MotionFade>
        </header>

        <MotionFade as="div" className="mt-10 flex justify-center">
          <form
            onSubmit={onSubmit}
            aria-describedby={status !== 'idle' ? statusId : undefined}
            className="w-full max-w-3xl rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 sm:p-10"
          >
            <FieldLine
              id="contact-name"
              name="name"
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
              autoComplete="name"
            />

            <div className="mt-8">
              <FieldLine
                id="contact-subject"
                name="subject"
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
              />
            </div>

            <div className="mt-8">
              <FieldLine
                id="contact-email"
                name="email"
                type="email"
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
                autoComplete="email"
              />
            </div>

            <div className="mt-8">
              <label
                htmlFor="contact-message"
                className="block font-subtitle text-2xl sm:text-3xl"
              >
                {copy.line4}
              </label>

              <textarea
                id="contact-message"
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
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={
                  touched.message && errors.message
                    ? 'contact-message-error'
                    : undefined
                }
                className={[
                  'mt-3 w-full resize-none bg-transparent',
                  'border-b-2 pb-3',
                  'text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg))]/35',
                  'focus-visible:outline-none',
                  touched.message && errors.message
                    ? 'border-red-500 focus-visible:shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
                    : 'border-[rgb(var(--border))] focus-visible:border-[rgb(var(--fg))]/40 focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.12)]',
                ].join(' ')}
              />

              {touched.message && errors.message ? (
                <p
                  id="contact-message-error"
                  className="mt-2 text-xs text-red-500"
                >
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className={[
                  'rounded-full px-8 py-3 text-sm',
                  'bg-[rgb(var(--fg))] text-[rgb(var(--bg))]',
                  'transition hover:opacity-80',
                  'focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_rgba(0,0,0,0.15)]',
                  status === 'sending' ? 'opacity-60 cursor-not-allowed' : '',
                ].join(' ')}
              >
                {status === 'sending' ? t('sending') : copy.button}
              </button>

              {status === 'success' && (
                <p
                  id={statusId}
                  role="status"
                  aria-live="polite"
                  className="text-sm text-emerald-600"
                >
                  {copy.success}
                </p>
              )}

              {status === 'error' && (
                <p id={statusId} role="alert" className="text-sm text-red-600">
                  {copy.failure}
                </p>
              )}
            </div>
          </form>
        </MotionFade>
      </div>
    </section>
  )
}

function FieldLine({
  id,
  name,
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  autoComplete,
  type = 'text',
}: {
  id: string
  name: string
  label: string
  value: string
  placeholder: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  autoComplete?: string
  type?: string
}) {
  const errorId = `${id}-error`

  return (
    <div>
      <label htmlFor={id} className="block font-subtitle text-2xl sm:text-3xl">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={[
          'mt-3 w-full bg-transparent',
          'border-b-2 pb-3',
          'text-[rgb(var(--fg))] placeholder:text-[rgb(var(--fg))]/35',
          'focus-visible:outline-none',
          error
            ? 'border-red-500 focus-visible:shadow-[0_0_0_1px_rgba(239,68,68,0.18)]'
            : 'border-[rgb(var(--border))] focus-visible:border-[rgb(var(--fg))]/40 focus-visible:shadow-[0_0_0_1px_rgba(0,0,0,0.12)]',
        ].join(' ')}
      />

      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
