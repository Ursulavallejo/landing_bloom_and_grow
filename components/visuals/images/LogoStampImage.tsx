'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function LogoStampImage() {
  const { resolvedTheme } = useTheme()

  const src =
    resolvedTheme === 'dark'
      ? '/logo_white_flordentro.png'
      : '/logo_cerebro_flordentro_transp.png'

  return (
    <div className="pointer-events-none relative h-full w-full">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="(max-width: 768px) 128px, 128px"
        className="object-contain"
      />
    </div>
  )
}
