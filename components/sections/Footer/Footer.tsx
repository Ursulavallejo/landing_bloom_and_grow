'use client'

// import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SocialLinks } from '@/components/layout/SocialLinks'

export default function Footer() {
  const t = useTranslations('footer')
  return (
    <footer className="relative w-full overflow-visible">
      {/* Wave OUTSIDE footer */}
      <FooterWaveTop className="absolute left-0 -top-14 w-full sm:-top-16" />
      {/* Pink background */}
      <div className="relative w-full bg-[var(--accent-foreground)] overflow-hidden">
        {/* Content */}
        <div className=" relative mx-auto max-w-6xl px-(--page-pad) pt-6 pb-8 sm:pt-8 sm:pb-10 lg:pt-6 lg:pb-8">
          {/* Center block */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="relative mx-auto mb-4 h-24 w-24 sm:h-28 sm:w-28">
              <Image
                src="/logo_white_footer.png"
                alt="logo bloom and grow: emotion lab"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h3 className="font-subtitle  text-3xl text-[rgb(var(--fg))] sm:text-4xl">
              Bloom &amp; Grow Lab
            </h3>

            <p className="mx-auto mt-4 font-semibold tracking-wide font-nav text-sm leading-relaxed text-[rgb(var(--fg))]/85 sm:text-base">
              {t('description')}
            </p>

            <a
              href="mailto:hello@bloomandgrowlab.com"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-[rgb(var(--fg))]/25 bg-[rgb(var(--primary))]/90 px-5 py-2 font-nav text-sm text-white transition hover:bg-[rgb(var(--bg))]/25 hover:opacity-90 hover:scale-105"
            >
              hello@bloomandgrowlab.com
            </a>

            {/* Socials placeholder (replace later with your Socials component) */}
            <div className="mt-6 flex justify-center">
              <SocialLinks size="lg" hoverClassName="hover:text-white" />
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 border-t border-[rgb(var(--fg))]/15 pt-4">
            <div className="flex flex-col font-semibold tracking-wide items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
              {/* TODO >> When my page is active use link */}
              <p className="font-nav text-xs text-[rgb(var(--fg))]/80">
                © 2026{' '}
                {/* <Link
                  href="https://www.uvjstudio.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:opacity-80"
                >
                  UVJ-studio
                </Link> */}
                UVJ-studio . All rights reserved.
              </p>

              <p className="font-nav text-xs text-[rgb(var(--fg))]/65">
                {t('madeWith')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterWaveTop({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className} h-16 sm:h-19 -scale-y-100`}
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
    >
      <path
        fill="var(--accent-foreground)"
        d="
          M0,110
          C140,140 280,155 420,145
          C560,135 660,95 820,100
          C980,105 1120,160 1260,150
          C1340,145 1400,125 1440,115
          L1440,0 L0,0 Z
        "
      />
    </svg>
  )
}
