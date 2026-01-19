'use client'

import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export function ThemeColorMeta() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    // On first render resolvedTheme can be undefined.
    const effectiveTheme = theme === 'system' ? resolvedTheme : theme

    if (!effectiveTheme) return

    const color = effectiveTheme === 'dark' ? '#0A0A0A' : '#bbdfc9'

    let meta = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null

    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }

    meta.content = color
  }, [theme, resolvedTheme])

  return null
}
