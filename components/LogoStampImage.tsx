'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

export default function LogoStampImage() {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  if (!isClient || !resolvedTheme) return null

  const src =
    resolvedTheme === 'dark'
      ? '/logo_white_flordentro.png'
      : '/logo_cerebro_flordentro_transp.png'

  return (
    <div className="pointer-events-none">
      <Image
        src={src}
        alt="logo bloom and grow: emotion lab"
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
