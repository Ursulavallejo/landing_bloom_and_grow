'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function BackgroundImage() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
      <Image
        src="/background_lines_light.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ display: isDark ? 'none' : 'block' }}
      />
      <Image
        src="/background_lines_dark.png"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ display: isDark ? 'block' : 'none' }}
      />
    </div>
  )
}
