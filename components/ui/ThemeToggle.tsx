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

  const label = ready
    ? isDark
      ? 'Switch to light theme'
      : 'Switch to dark theme'
    : 'Toggle theme'

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={ready ? isDark : undefined}
      className="
        rounded-xl
        border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-2
        text-[rgb(var(--fg))]
        transition
        hover:text-[rgb(var(--primary))]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[rgb(var(--primary))]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      "
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {ready ? (
        isDark ? (
          <span aria-hidden="true">
            <SunIcon className="h-5 w-5" />
          </span>
        ) : (
          <span aria-hidden="true">
            <MoonIcon className="h-5 w-5" />
          </span>
        )
      ) : (
        <span className="inline-block h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
