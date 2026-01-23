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

export default function BackgroundImage() {
  const isClient = useIsClient()
  const { resolvedTheme } = useTheme()

  if (!isClient || !resolvedTheme) return null

  const src =
    resolvedTheme === 'dark'
      ? '/background_lines_dark.png'
      : '/background_lines_light.png'

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Image src={src} alt="" fill priority className="object-cover" />
    </div>
  )
}
