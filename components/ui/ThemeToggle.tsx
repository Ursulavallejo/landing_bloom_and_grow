'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Icons } from '@/icons'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 0)
    return () => clearTimeout(id)
  }, [])

  const isDark = resolvedTheme === 'dark'

  const SunIcon = Icons.sunIcon
  const MoonIcon = Icons.moonIcon

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="
    rounded-xl
    border border-[rgb(var(--border))]
    bg-[rgb(var(--card))]
    p-2
    text-[rgb(var(--fg))]
    transition
    hover:text-[rgb(var(--primary))]

  "
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {ready ? (
        isDark ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )
      ) : (
        <span className="inline-block h-5 w-5" />
      )}
    </button>
  )
}
