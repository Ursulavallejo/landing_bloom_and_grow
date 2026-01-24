import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_EMAIL

    if (!apiKey) {
      console.error('Missing RESEND_API_KEY env var')
      return NextResponse.json(
        { error: 'Missing RESEND_API_KEY in environment' },
        { status: 500 },
      )
    }

    if (!toEmail) {
      console.error('Missing CONTACT_EMAIL env var')
      return NextResponse.json(
        { error: 'Missing CONTACT_EMAIL in environment' },
        { status: 500 },
      )
    }

    const resend = new Resend(apiKey)

    const body = await req.json()

    const name = String(body?.name ?? '').trim()
    const subject = String(body?.subject ?? '').trim()
    const email = String(body?.email ?? '').trim()
    const message = String(body?.message ?? '').trim()

    if (!name || !subject || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const result = await resend.emails.send({
      from: 'Contact- Bloom & Grow Lab <onboarding@resend.dev>',
      to: [toEmail],
      replyTo: email,
      subject: `[Contact] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        {
          error: result.error.message ?? 'Resend failed',
          details: result.error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, id: result.data?.id })
  } catch (err: unknown) {
    console.error('API error:', err)
    const message = err instanceof Error ? err.message : 'Unknown server error'

    return NextResponse.json(
      { error: 'Server error', message },
      { status: 500 },
    )
  }
}
