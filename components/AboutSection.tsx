'use client'

import P5Background from '@/components/P5BackgroundAbout'
import { useTranslations } from 'next-intl'

export default function AboutSection() {
  const t = useTranslations()

  return (
    <section
      id="about"
      className="
        relative w-full
        py-16 sm:py-24

      "
      //  bg-[#ffd400]
    >
      {/* P5 behind */}
      <P5Background
        className="z-0 [--p5-ink-rgb:30_41_59] dark:[--p5-ink-rgb:255_255_255]"
        opacity={1.5}
      />
      {/* Caja de prueba con altura real */}
      <div
        className="
          relative mx-auto max-w-6xl px-(--page-pad)
        "
      >
        <h2 className="font-subtitle text-center text-6xl text-[rgb(var(--fg))]">
          {t('about.title')}
        </h2>
        <div
          className="
            relative overflow-hidden
            rounded-3xl border border-[rgb(var(--border))]
            bg-[rgb(var(--card))]
            min-h-[120px] sm:min-h-[220px]
          "
        >
          {/* Overlay debug visible */}
          <div className="relative z-10 p-8">
            <p className="mt-3 font-nav text-sm text-[rgb(var(--fg))]/70">
              P5 test area (should show white strokes/glyphs moving)
            </p>

            {/* Fondo semi-transparente para “ver” si el canvas está debajo */}
            <div className="mt-6 rounded-2xl bg-black/5 p-4 text-xs text-[rgb(var(--fg))]/70 dark:bg-white/5">
              If you see nothing, canvas is not rendering or is hidden.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
