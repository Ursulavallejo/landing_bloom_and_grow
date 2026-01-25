'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import type p5 from 'p5'

type Props = {
  className?: string
  opacity?: number // 0..1 (recommended 0.08 – 0.22)
  tile?: number // distance between flowers (higher = less dense)
  sizeMin?: number
  sizeMax?: number
  emboss?: number // 0..1 emboss / die-cut strength
  animate?: boolean // micro wobble animation (more CPU)
}

/**
 * Reads an RGB triplet from CSS custom property
 * Supports formats:
 *  - "255 255 255"
 *  - "255,255,255"
 */
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

function P5FlowerCutoutImpl({
  className = '',
  opacity = 0.14,
  tile = 140,
  sizeMin = 92,
  sizeMax = 130,
  emboss = 1,
  animate = false,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const p5InstanceRef = useRef<p5 | null>(null)

  // Mouse position in viewport coordinates
  const mouseRef = useRef({ x: 0, y: 0 })

  // Cached bounding box of the host container
  const rectRef = useRef({ left: 0, top: 0, w: 1, h: 1 })

  // Last known scroll position
  const scrollRef = useRef(0)

  useEffect(() => {
    let isMounted = true
    let reduceMotion = false

    // Respect prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion = mq.matches

    const onMQ = () => {
      reduceMotion = mq.matches
      if (reduceMotion) {
        try {
          p5InstanceRef.current?.noLoop?.()
          p5InstanceRef.current?.redraw?.()
        } catch {}
      }
    }
    mq.addEventListener?.('change', onMQ)

    // Track mouse movement for subtle parallax
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (!animate || reduceMotion) {
        p5InstanceRef.current?.redraw?.()
      }
    }

    // Track scroll for vertical parallax
    const onScroll = () => {
      scrollRef.current = window.scrollY || 0
      if (!animate || reduceMotion) {
        p5InstanceRef.current?.redraw?.()
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    const run = async () => {
      // Prevent double mount (React Strict Mode)
      if (p5InstanceRef.current) return

      const p5mod = await import('p5')
      const P5 = p5mod.default
      if (!isMounted || !hostRef.current) return

      const sketch = (p: p5) => {
        const BASE_ALPHA = clamp01(opacity)

        // Extra padding so the pattern stays edge-to-edge during parallax
        const PAD = 220

        // Parallax limits
        const MAX_MOUSE_SHIFT = 18
        const MAX_SCROLL_SHIFT = 26

        let w = 1
        let h = 1

        // Ink color read from CSS variable --p5-ink-rgb
        let ink: [number, number, number] = [255, 255, 255]

        // Offscreen buffer where the full pattern is rendered once
        let buffer: p5.Graphics | null = null

        type Flower = {
          x: number
          y: number
          s: number
          rot: number
          petals: number
          seed: number
          detail: number
        }

        let flowers: Flower[] = []

        /** Read ink color from CSS */
        const readInkFromCSS = () => {
          const el = hostRef.current
          if (!el) return
          const css = getComputedStyle(el).getPropertyValue('--p5-ink-rgb')
          ink = parseRgbTriplet(css, [255, 255, 255])
        }

        /** Cache host element bounding box */
        const updateRect = () => {
          const el = hostRef.current
          if (!el) return
          const r = el.getBoundingClientRect()
          rectRef.current = {
            left: r.left,
            top: r.top,
            w: r.width || 1,
            h: r.height || 1,
          }
        }

        /** Resize canvas to host size */
        const resizeToHost = () => {
          const el = hostRef.current
          if (!el) return
          const r = el.getBoundingClientRect()
          w = Math.max(1, Math.floor(r.width))
          h = Math.max(1, Math.floor(r.height))
          p.resizeCanvas(w, h)
          updateRect()
        }

        /** Build the tiled flower layout */
        const buildFlowers = () => {
          flowers = []
          for (let yy = -PAD; yy <= h + PAD; yy += tile) {
            for (let xx = -PAD; xx <= w + PAD; xx += tile) {
              const seed = p.random(10000)
              flowers.push({
                x: xx + p.random(-10, 10),
                y: yy + p.random(-10, 10),
                s: p.random(sizeMin, sizeMax),
                rot: p.random(-0.35, 0.35),
                petals: p.random() < 0.45 ? 6 : 5,
                seed,
                detail: p.random(0.3, 1),
              })
            }
          }
        }

        /** Draws a smooth petal path */
        const flowerPath = (
          pg: p5.Graphics,
          petals: number,
          rOuter: number,
          rInner: number,
        ) => {
          pg.beginShape()

          // More points = smoother curve
          const steps = petals * 40

          for (let i = 0; i <= steps; i++) {
            const a = (i / steps) * p.TWO_PI

            // Smooth oscillation between inner and outer radius
            // cos(petals * a) creates the lobes (petals)
            const k = (p.cos(petals * a) + 1) * 0.5 // 0..1
            const rr = p.lerp(rInner, rOuter, k)

            pg.vertex(p.cos(a) * rr, p.sin(a) * rr)
          }

          pg.endShape(p.CLOSE)
        }
        /** Draw a single die-cut flower */
        const drawFlower = (pg: p5.Graphics, f: Flower, t: number) => {
          pg.push()
          pg.translate(f.x, f.y)

          const wobble =
            animate && !reduceMotion ? p.sin(t * 0.35 + f.seed) * 0.06 : 0
          pg.rotate(f.rot + wobble)

          const s = f.s
          const rOuter = s * 0.48
          const rInner = s * 0.22
          const strength = BASE_ALPHA * clamp01(emboss)

          // Shadow pass (down-right)
          pg.noFill()
          pg.stroke(ink[0], ink[1], ink[2], 255 * strength * 0.55)
          pg.strokeWeight(3)
          pg.push()
          pg.translate(1.8, 1.8)
          flowerPath(pg, f.petals, rOuter, rInner)
          pg.pop()

          // Highlight pass (up-left)
          pg.stroke(ink[0], ink[1], ink[2], 255 * strength * 0.95)
          pg.strokeWeight(2)
          pg.push()
          pg.translate(-2.2, -2.2)
          flowerPath(pg, f.petals, rOuter, rInner)
          pg.pop()

          // Inner cut detail
          pg.stroke(ink[0], ink[1], ink[2], 255 * strength * 0.28)
          pg.strokeWeight(1)
          flowerPath(pg, f.petals, rOuter * 0.62, rInner * 0.38)

          // Center hole
          pg.stroke(ink[0], ink[1], ink[2], 255 * strength * 0.22)
          pg.circle(0, 0, s * (0.16 + 0.05 * f.detail))

          pg.pop()
        }

        /** Render full pattern into offscreen buffer */
        const renderBuffer = () => {
          buffer = p.createGraphics(w + PAD * 2, h + PAD * 2)
          buffer.clear()
          buffer.pixelDensity(1)

          buffer.push()
          buffer.translate(PAD, PAD)

          const t = animate && !reduceMotion ? p.millis() / 1000 : 0
          for (const f of flowers) drawFlower(buffer, f, t)

          buffer.pop()
        }

        p.setup = () => {
          p.createCanvas(1, 1)
          p.pixelDensity(Math.min(2, window.devicePixelRatio || 1))
          readInkFromCSS()
          resizeToHost()
          buildFlowers()
          renderBuffer()

          // Static by default: redraw only on interaction
          if (!animate || reduceMotion) p.noLoop()
          else p.frameRate(30)
        }

        p.draw = () => {
          p.clear()
          updateRect()

          // Mouse-based parallax
          const r = rectRef.current
          const m = mouseRef.current
          const nx = ((m.x - r.left) / Math.max(1, r.w)) * 2 - 1
          const ny = ((m.y - r.top) / Math.max(1, r.h)) * 2 - 1

          const mouseX = p.constrain(
            nx * MAX_MOUSE_SHIFT,
            -MAX_MOUSE_SHIFT,
            MAX_MOUSE_SHIFT,
          )
          const mouseY = p.constrain(
            ny * MAX_MOUSE_SHIFT,
            -MAX_MOUSE_SHIFT,
            MAX_MOUSE_SHIFT,
          )

          // Scroll parallax
          const scrollShift = p.constrain(
            scrollRef.current * 0.06,
            0,
            MAX_SCROLL_SHIFT,
          )

          // Optional global wobble
          const t = animate && !reduceMotion ? p.millis() / 1000 : 0
          const wobbleX = animate && !reduceMotion ? p.sin(t * 0.25) * 6 : 0
          const wobbleY = animate && !reduceMotion ? p.cos(t * 0.22) * 6 : 0

          if (buffer) {
            p.image(
              buffer as unknown as p5.Image,
              -PAD + mouseX * 0.35 + wobbleX,
              -PAD + mouseY * 0.35 + scrollShift * 0.45 + wobbleY,
            )
          }
        }

        p.windowResized = () => {
          readInkFromCSS()
          resizeToHost()
          buildFlowers()
          renderBuffer()
          if (!animate || reduceMotion) p.redraw()
        }
      }

      p5InstanceRef.current = new P5(sketch, hostRef.current)
    }

    run()

    const ro = new ResizeObserver(() => {
      p5InstanceRef.current?.windowResized?.()
    })
    if (hostRef.current) ro.observe(hostRef.current)

    return () => {
      isMounted = false
      ro.disconnect()
      mq.removeEventListener?.('change', onMQ)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      p5InstanceRef.current?.remove?.()
      p5InstanceRef.current = null
    }
  }, [opacity, tile, sizeMin, sizeMax, emboss, animate])

  return (
    <div
      aria-hidden="true"
      ref={hostRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  )
}

const P5FlowerCutout = dynamic(() => Promise.resolve(P5FlowerCutoutImpl), {
  ssr: false,
})

export default P5FlowerCutout
