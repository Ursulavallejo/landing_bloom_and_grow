// components/BlobPill.tsx
'use client'

import { ReactNode } from 'react'

export default function BlobPill({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        relative inline-flex items-center justify-center
        min-w-[180px] sm:min-w-[240px] md:min-w-0
        px-10 py-8 sm:px-12 sm:py-5 md:px-15 md:py-10
        min-h-[102px] sm:min-h-[110px] md:min-h-[120px]
      "
    >
      <svg
        viewBox="0 0 600 240"
        className="  absolute inset-0 h-full w-full
  sm:inset-y-0 sm:-inset-x-3 sm:w-[calc(100%+1.5rem)]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#FF56C9"
          d="
            M110,120
            C115,70 175,38 270,34
            C380,30 505,55 540,102
            C565,135 545,175 495,198
            C435,226 320,232 230,220
            C150,210 95,180 90,145
            C86,132 92,125 110,120
            Z
          "
        />
      </svg>

      <span className="relative translate-y-2 translate-x-2 z-10 text-center font-semibold tracking-tight leading-[1.2] text-white">
        {children}
      </span>
    </div>
  )
}
