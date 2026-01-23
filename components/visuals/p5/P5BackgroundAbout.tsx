'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type p5 from 'p5'

type Props = {
  className?: string
  opacity?: number // 0..1 (recomendado 0.08 - 0.18)
}

type Stroke = { x: number; y: number; s: number; a: number; seed: number }
type Glyph = {
  x: number
  y: number
  s: number
  a: number
  ch: string
  seed: number
}

function parseRgbTriplet(value: string, fallback: [number, number, number]) {
  // expected formats: "255 255 255" or "255,255,255"
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

function P5BackgroundImpl({ className = '', opacity = 0.12 }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const p5InstanceRef = useRef<p5 | null>(null)

  // mouse position in viewport coords
  const mouseRef = useRef({ x: 0, y: 0 })
  // cached host rect
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
    window.addEventListener('mousemove', onMove, { passive: true })

    const run = async () => {
      const p5mod = await import('p5')
      const P5 = p5mod.default
      if (!isMounted || !hostRef.current) return

      const sketch = (p: p5) => {
        const BASE_ALPHA = opacity
        const MAX_MOUSE_SHIFT = 14
        const MAX_SCROLL_SHIFT = 24
        const SHAPES = 10
        const GLYPHS = 12

        let w = 1
        let h = 1
        let ink: [number, number, number] = [255, 255, 255]

        const strokes: Stroke[] = []
        const glyphs: Glyph[] = []

        const pickGlyph = () => {
          const pool = ['B', 'G', '♡', '✿', '◌', '∿', '≈']
          return pool[Math.floor(Math.random() * pool.length)]
        }

        const readInkFromCSS = () => {
          const el = hostRef.current
          if (!el) return
          const css = getComputedStyle(el).getPropertyValue('--p5-ink-rgb')
          ink = parseRgbTriplet(css, [255, 255, 255])
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

        const buildScene = () => {
          strokes.length = 0
          glyphs.length = 0

          for (let i = 0; i < SHAPES; i++) {
            strokes.push({
              x: p.random(w * 0.1, w * 0.9),
              y: p.random(h * 0.15, h * 0.85),
              s: p.random(140, 320),
              a: p.random(0.18, 0.45),
              seed: p.random(1000),
            })
          }

          for (let i = 0; i < GLYPHS; i++) {
            glyphs.push({
              x: p.random(w * 0.08, w * 0.92),
              y: p.random(h * 0.12, h * 0.88),
              s: p.random(18, 48),
              a: p.random(0.08, 0.22),
              ch: pickGlyph(),
              seed: p.random(1000),
            })
          }
        }

        const strokeInk = (alpha01: number) => {
          const a = p.constrain(alpha01, 0, 1)
          p.stroke(ink[0], ink[1], ink[2], 255 * a)
        }

        const fillInk = (alpha01: number) => {
          const a = p.constrain(alpha01, 0, 1)
          p.fill(ink[0], ink[1], ink[2], 255 * a)
        }

        const drawStroke = (st: Stroke, t: number) => {
          p.push()
          p.translate(st.x, st.y)

          const wobble = reduceMotion ? 0 : p.sin(t * 0.6 + st.seed) * 6
          p.rotate(reduceMotion ? 0 : p.sin(t * 0.25 + st.seed) * 0.05)

          p.noFill()

          const s = st.s
          const r1 = p.noise(st.seed + t * 0.2) * 18
          const r2 = p.noise(st.seed + 50 + t * 0.2) * 18

          // thick stroke
          strokeInk(BASE_ALPHA * st.a)
          p.strokeWeight(2)

          const x0 = -s * 0.35
          const y0 = -s * 0.05 + wobble
          const c1x = -s * 0.18 + r1
          const c1y = -s * 0.24
          const c2x = s * 0.06
          const c2y = -s * 0.18 + r2
          const x1 = s * 0.18
          const y1 = -s * 0.02

          p.bezier(x0, y0, c1x, c1y, c2x, c2y, x1, y1)

          // thin stroke
          strokeInk(BASE_ALPHA * st.a * 0.55)
          p.strokeWeight(1)

          const x2 = -s * 0.18
          const y2 = s * 0.08 + wobble * 0.5
          const c3x = -s * 0.05
          const c3y = -s * 0.06
          const c4x = s * 0.14
          const c4y = -s * 0.02
          const x3 = s * 0.26
          const y3 = s * 0.12

          p.bezier(x2, y2, c3x, c3y, c4x, c4y, x3, y3)

          p.pop()
        }

        const drawGlyph = (g: Glyph, t: number) => {
          p.push()

          const floatY = reduceMotion ? 0 : p.sin(t * 0.8 + g.seed) * 5
          const floatX = reduceMotion ? 0 : p.cos(t * 0.7 + g.seed) * 4

          p.translate(g.x + floatX, g.y + floatY)
          p.rotate(reduceMotion ? 0 : p.sin(t * 0.3 + g.seed) * 0.04)

          p.noStroke()
          fillInk(BASE_ALPHA * g.a)

          p.textAlign(p.CENTER, p.CENTER)
          p.textSize(g.s)
          p.text(g.ch, 0, 0)

          p.pop()
        }

        p.setup = () => {
          p.createCanvas(1, 1)
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1))
          p.frameRate(reduceMotion ? 1 : 30)
          readInkFromCSS()
          resizeToHost()
          buildScene()
        }

        p.draw = () => {
          p.clear()

          // scroll parallax
          const y = window.scrollY || 0
          const scrollShift = p.constrain(y * 0.06, 0, MAX_SCROLL_SHIFT)

          // mouse parallax (from window mouse)
          const r = rectRef.current
          const m = mouseRef.current
          const localX = m.x - r.left
          const localY = m.y - r.top

          const nx = (localX / Math.max(1, r.w)) * 2 - 1
          const ny = (localY / Math.max(1, r.h)) * 2 - 1

          const mouseShiftX = p.constrain(
            nx * MAX_MOUSE_SHIFT,
            -MAX_MOUSE_SHIFT,
            MAX_MOUSE_SHIFT,
          )
          const mouseShiftY = p.constrain(
            ny * MAX_MOUSE_SHIFT,
            -MAX_MOUSE_SHIFT,
            MAX_MOUSE_SHIFT,
          )

          const t = reduceMotion ? 0 : p.millis() / 1000

          p.push()
          p.translate(
            mouseShiftX * 0.35,
            mouseShiftY * 0.35 + scrollShift * 0.45,
          )

          for (const st of strokes) drawStroke(st, t)
          for (const g of glyphs) drawGlyph(g, t)

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
      } catch {
        // ignore
      }
    })
    if (hostRef.current) ro.observe(hostRef.current)

    return () => {
      isMounted = false
      ro.disconnect()
      mq.removeEventListener?.('change', onMQ)
      window.removeEventListener('mousemove', onMove)
      try {
        p5InstanceRef.current?.remove?.()
      } catch {
        // ignore
      }
      p5InstanceRef.current = null
    }
  }, [opacity])

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
