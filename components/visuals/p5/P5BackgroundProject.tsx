'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type p5 from 'p5'

type Props = {
  className?: string
  opacity?: number // 0..1
  motion?: number // 0.5..3 (default 1)
  parallax?: number // 0..2 (default 1)
  particleCount?: number
  glyphCount?: number
  bigGlyphCount?: number

  particleRadius?: [number, number]
  glyphSize?: [number, number]
  bigGlyphSize?: [number, number]
}

type Particle = { x: number; y: number; r: number; a: number; seed: number }
type Glyph = {
  x: number
  y: number
  s: number
  a: number
  ch: string
  seed: number
}

function parseRgbTriplet(value: string, fallback: [number, number, number]) {
  const cleaned = value.trim().replace(/,/g, ' ')
  const parts = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => Number(n))
  if (parts.length >= 3 && parts.every((n) => Number.isFinite(n))) {
    return [parts[0], parts[1], parts[2]] as [number, number, number]
  }
  return fallback
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

function P5BackgroundImpl({
  className = '',
  opacity = 0.24,
  motion = 1,
  parallax = 1,
  particleCount = 170,
  glyphCount = 34,
  bigGlyphCount = 6,
  particleRadius = [1.2, 3.4],
  glyphSize = [16, 34],
  bigGlyphSize = [54, 98],
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const p5InstanceRef = useRef<p5 | null>(null)

  const mouseRef = useRef({ x: 0, y: 0 })
  const rectRef = useRef({ left: 0, top: 0, w: 1, h: 1 })

  useEffect(() => {
    let isMounted = true
    let reduceMotion = false

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion = mq.matches

    const onMQ = () => {
      reduceMotion = mq.matches
      const inst = p5InstanceRef.current
      if (inst) inst.frameRate(reduceMotion ? 1 : 30)
    }
    mq.addEventListener?.('change', onMQ)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // parallax  touch
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches?.[0]
      if (!t) return
      mouseRef.current = { x: t.clientX, y: t.clientY }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    const run = async () => {
      const p5mod = await import('p5')
      const P5 = p5mod.default
      if (!isMounted || !hostRef.current) return

      const sketch = (p: p5) => {
        const BASE_ALPHA = clamp01(opacity)
        const MOTION = Math.max(0, motion)
        const PARALLAX = Math.max(0, parallax)

        let w = 1
        let h = 1
        let ink: [number, number, number] = [255, 255, 255]

        const particles: Particle[] = []
        const glyphs: Glyph[] = []
        const bigGlyphs: Glyph[] = []

        // “text presentation” on iOS (avoid emoji in color)
        const TEXT_VARIANT = '\uFE0E'
        const asTextGlyph = (ch: string) => {
          return ch + TEXT_VARIANT
        }

        const pickGlyph = () => {
          const pool = [
            '✿',
            '❀',
            '♡',
            '♥',
            '?',
            '!',
            '!!',
            'B',
            'G',
            '✦',
            '⋆',
            '☁',
          ]
          const ch = pool[Math.floor(Math.random() * pool.length)]
          return asTextGlyph(ch)
        }

        const readInkFromCSS = () => {
          const el = hostRef.current
          if (!el) return
          const css = getComputedStyle(el).getPropertyValue('--p5-ink-rgb')
          ink = parseRgbTriplet(css, ink)
        }

        const resizeToHost = () => {
          const el = hostRef.current
          if (!el) return
          const r = el.getBoundingClientRect()
          rectRef.current = {
            left: r.left,
            top: r.top,
            w: r.width || 1,
            h: r.height || 1,
          }
          w = Math.max(1, Math.floor(r.width))
          h = Math.max(1, Math.floor(r.height))
          p.resizeCanvas(w, h)
        }

        const fillInk = (alpha01: number) => {
          const a = clamp01(alpha01)
          p.fill(ink[0], ink[1], ink[2], 255 * a)
        }

        const buildScene = () => {
          particles.length = 0
          glyphs.length = 0
          bigGlyphs.length = 0

          for (let i = 0; i < particleCount; i++) {
            particles.push({
              x: p.random(0, w),
              y: p.random(0, h),
              r: p.random(particleRadius[0], particleRadius[1]),
              a: p.random(0.12, 0.32),
              seed: p.random(1000),
            })
          }

          for (let i = 0; i < glyphCount; i++) {
            glyphs.push({
              x: p.random(w * 0.06, w * 0.94),
              y: p.random(h * 0.08, h * 0.92),
              s: p.random(glyphSize[0], glyphSize[1]),
              a: p.random(0.14, 0.34),
              ch: pickGlyph(),
              seed: p.random(1000),
            })
          }

          for (let i = 0; i < bigGlyphCount; i++) {
            bigGlyphs.push({
              x: p.random(w * 0.1, w * 0.9),
              y: p.random(h * 0.18, h * 0.86),
              s: p.random(bigGlyphSize[0], bigGlyphSize[1]),
              a: p.random(0.16, 0.38),
              ch: pickGlyph(),
              seed: p.random(1000),
            })
          }
        }

        const drawParticles = (t: number) => {
          p.noStroke()
          const speed = reduceMotion ? 0 : 0.22 * MOTION

          for (const pt of particles) {
            const nx = p.noise(pt.seed + t * speed)
            const ny = p.noise(pt.seed + 99 + t * speed)

            pt.x += (nx - 0.5) * 1.6 * MOTION
            pt.y += (ny - 0.5) * 1.6 * MOTION

            if (pt.x < -10) pt.x = w + 10
            if (pt.x > w + 10) pt.x = -10
            if (pt.y < -10) pt.y = h + 10
            if (pt.y > h + 10) pt.y = -10

            fillInk(BASE_ALPHA * pt.a)
            p.circle(pt.x, pt.y, pt.r * 2)
          }
        }

        const drawGlyph = (g: Glyph, t: number, scale = 1) => {
          p.push()

          const drift = reduceMotion ? 0 : 1
          const floatY = p.sin(t * (0.75 * MOTION) + g.seed) * 7 * drift
          const floatX = p.cos(t * (0.65 * MOTION) + g.seed) * 6 * drift
          const rot = p.sin(t * (0.25 * MOTION) + g.seed) * 0.06 * drift

          p.translate(g.x + floatX, g.y + floatY)
          p.rotate(rot)

          p.noStroke()
          fillInk(BASE_ALPHA * g.a)
          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(g.s * scale)
          p.text(g.ch, 0, 0)

          p.pop()
        }

        p.setup = () => {
          p.createCanvas(1, 1)

          p.pixelDensity(1)

          p.frameRate(reduceMotion ? 1 : 30)
          readInkFromCSS()
          resizeToHost()
          buildScene()
        }

        p.draw = () => {
          p.clear()
          const t = reduceMotion ? 0 : p.millis() / 1000

          const r = rectRef.current
          const m = mouseRef.current
          const localX = m.x - r.left
          const localY = m.y - r.top

          const nx = (localX / Math.max(1, r.w)) * 2 - 1
          const ny = (localY / Math.max(1, r.h)) * 2 - 1

          const maxShift = 22 * PARALLAX
          const mouseShiftX = p.constrain(nx * maxShift, -maxShift, maxShift)
          const mouseShiftY = p.constrain(ny * maxShift, -maxShift, maxShift)

          p.push()
          p.translate(mouseShiftX * 0.28, mouseShiftY * 0.28)

          drawParticles(t)
          for (const g of glyphs) drawGlyph(g, t, 1)
          for (const g of bigGlyphs) drawGlyph(g, t, 1)

          p.pop()
        }

        p.windowResized = () => {
          readInkFromCSS()
          resizeToHost()
          buildScene()
        }
      }

      p5InstanceRef.current = new P5(sketch, hostRef.current)
    }

    run()

    const ro = new ResizeObserver(() => {
      try {
        p5InstanceRef.current?.windowResized?.()
      } catch {}
    })
    if (hostRef.current) ro.observe(hostRef.current)

    return () => {
      isMounted = false
      ro.disconnect()
      mq.removeEventListener?.('change', onMQ)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouchMove)
      try {
        p5InstanceRef.current?.remove?.()
      } catch {}
      p5InstanceRef.current = null
    }
  }, [
    opacity,
    motion,
    parallax,
    particleCount,
    glyphCount,
    bigGlyphCount,
    particleRadius,
    glyphSize,
    bigGlyphSize,
  ])

  return (
    <div
      aria-hidden="true"
      ref={hostRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}

const P5Background = dynamic(() => Promise.resolve(P5BackgroundImpl), {
  ssr: false,
})
export default P5Background
