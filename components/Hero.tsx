'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import BlobPill from '@/components/BlobPill'
import PinkBlobs from '@/components/PinkBlobs'
import PinkWave from '@/components/PinkWave'
// import CurvedTitle from '@/components/CurvedTitle'
import LogoStampImage from '@/components/LogoStampImage'

export default function Hero() {
  const t = useTranslations()
  const pill = t('hero.pill')

  return (
    <div className="relative overflow-visible ">
      <section className="relative flex-1 overflow-hidden rounded-3xl border border-[rgb(var(--border))]">
        <div className="grid  grid-cols-1  md:grid-cols-2">
          {/* LEFT */}
          <div className="relative bg-[rgb(var(--hero-bg))] p-8 md:p-12">
            {/* Hero title */}
            <div className="mt-4 grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 md:flex md:gap-6">
              <h1 className="font-hero text-5xl leading-[0.9] tracking-tight text-[#35B26B] md:text-7xl">
                BLOOM <br /> &amp; GROW
              </h1>

              {/* pill */}
              <div
                className=" uppercase tracking-wide justify-self-start sm:justify-self-end mt-6 sm:mt-2 md:mt-6 -translate-x-13 sm:translate-x-0 max-w-[240px] sm:max-w-none tablet:-translate-x-10
    "
              >
                <BlobPill>
                  {pill.split('\n').map((line, i) => (
                    <span
                      key={i}
                      className="block whitespace-nowrap font-subtitle tracking-wide"
                    >
                      {line}
                    </span>
                  ))}
                </BlobPill>
              </div>
            </div>

            <p
              className="mt-6 max-w-full tablet:max-w-[410px] md:max-w-md
              font-nav text-base leading-relaxed text-[rgb(var(--fg))]"
            >
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="rounded-xl bg-[#FF56C9] px-5 py-3 font-nav text-sm font-semibold text-white hover:opacity-90 hover:scale-105 transition"
                href="#"
              >
                {t('hero.ctaAmazon')}
              </a>

              <a
                className="rounded-xl bg-[#35B26B] px-5 py-3 font-nav text-sm font-semibold text-white hover:opacity-90 hover:scale-105 transition"
                href="#"
              >
                {t('hero.ctaEtsy')}
              </a>
            </div>

            {/* logo stamp  */}
            <div className="pointer-events-none absolute bottom-4 md:bottom-6 right-6 opacity-90">
              <div className="relative   h-28 w-28 md:h-32 md:w-32 overflow-hidden  rounded-full " />
              <LogoStampImage />
            </div>
          </div>

          {/* RIGHT (yellow + image) */}
          <div className="relative bg-[#FFD400] w-full min-h-80 md:min-h-130">
            {/* character image */}
            <div className="relative mx-auto h-95 w-full max-w-205 md:h-130">
              <Image
                src="/imagenHeroTransparent.png"
                alt="lab emotions illustration"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* pink blobs (decor) */}
            <PinkBlobs />
          </div>
        </div>
      </section>
      {/* Pink bottom wave overlay (always on top) */}
      <PinkWave />
    </div>
  )
}
