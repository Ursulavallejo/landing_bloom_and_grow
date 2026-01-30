'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function LogoStampImage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (!mounted)
    return <div className="pointer-events-none relative h-full w-full" />

  const src =
    resolvedTheme === 'dark'
      ? '/logo_white_flordentro.png'
      : '/logo_cerebro_flordentro_transp.png'

  return (
    <div
      className="pointer-events-none relative h-full w-full"
      suppressHydrationWarning
    >
      <Image
        key={src}
        src={src}
        alt="Logo Bloom and Grow"
        fill
        priority
        sizes="(max-width: 768px) 128px, 128px"
        className="object-contain"
      />
    </div>
  )
}
