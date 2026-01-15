'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import BlobPill from '@/components/BlobPill'
import PinkBlobs from '@/components/PinkBlobs'
import PinkWave from '@/components/PinkWave'
// import CurvedTitle from '@/components/CurvedTitle'

export default function Hero() {
  const t = useTranslations()
  const pill = t('hero.pill')

  return (
    <>
      <section className="relative flex-1 overflow-hidden rounded-3xl border border-[rgb(var(--border))]">
        <div className="grid md:grid-cols-2">
          {/* LEFT */}
          <div className="relative bg-[rgb(var(--hero-bg))] p-8 md:p-12">
            {/* Hero title */}
            <div className="mt-4 flex items-start gap-6">
              <h1 className="font-hero text-5xl leading-[0.9] tracking-tight text-[#35B26B] md:text-7xl">
                BLOOM <br /> &amp; GROW
              </h1>
              {/* <CurvedTitle /> */}

              {/* pill */}
              <div className="mt-4 md:mt-6 uppercase tracking-wide font-semibold">
                <BlobPill>
                  {pill.split('\n').map((line, i) => (
                    <span key={i} className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </BlobPill>
              </div>
            </div>

            <p className="mt-6 max-w-md font-nav text-base leading-relaxed text-[rgb(var(--fg))]">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                className="rounded-xl bg-[#FF56C9] px-5 py-3 font-nav text-sm font-semibold text-white hover:opacity-90"
                href="#"
              >
                {t('hero.ctaAmazon')}
              </a>

              <a
                className="rounded-xl bg-[#35B26B] px-5 py-3 font-nav text-sm font-semibold text-white hover:opacity-90"
                href="#"
              >
                {t('hero.ctaEtsy')}
              </a>
            </div>

            {/* logo stamp  */}
            <div className="pointer-events-none absolute bottom-6 right-6 opacity-90">
              <div className="relative  h-28 w-28 md:h-32 md:w-32 overflow-hidden  rounded-full " />
              <Image
                src="/logo_cerebro_flordentro_transp.png"
                alt="logo bloom and grow: emotion lab"
                fill
                priority
                className="object-contain "
              />
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
    </>
  )
}
