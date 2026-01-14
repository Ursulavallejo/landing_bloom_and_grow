// components/BlobPill.tsx
'use client'

import { ReactNode } from 'react'

export default function BlobPill({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-flex items-center justify-center px-16 py-6 md:px-15 md:py-10">
      <svg
        viewBox="0 0 600 240"
        className="absolute inset-0 h-full w-full"
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

      <span className="relative z-10 text-center font-semibold tracking-tight leading-[1.7] text-white">
        {children}
      </span>
    </div>
  )
}
