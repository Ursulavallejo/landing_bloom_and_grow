// components/CurvedTitle.tsx
'use client'

export default function CurvedTitle() {
  return (
    <div className="w-195 md:w-155">
      <svg
        viewBox="0 0 760 520"
        className="h-auto w-full"
        aria-label="Bloom and Grow"
      >
        {/* BLOOM arc (top) */}
        <path id="arcBloom" d="M70,260 C230,95 530,95 690,260" fill="none" />

        <text
          fill="#35B26B"
          fontFamily="var(--font-barrio), system-ui, sans-serif"
          fontSize="170"
        >
          <textPath
            href="#arcBloom"
            startOffset="46%"
            textAnchor="middle"
            letterSpacing="2"
          >
            BLOOM
          </textPath>
        </text>

        {/* & placed at the END of the same BLOOM arc */}
        <text
          fill="#35B26B"
          fontFamily="var(--font-barrio), system-ui, sans-serif"
          fontSize="150"
        >
          <textPath href="#arcBloom" startOffset="93%" textAnchor="middle">
            &
          </textPath>
        </text>

        {/* GROW arc (same direction, LOWER, more air) */}
        <path id="arcGrow" d="M55,430 C225,265 535,265 705,430" fill="none" />

        <text
          fill="#35B26B"
          fontFamily="var(--font-barrio), system-ui, sans-serif"
          fontSize="200"
        >
          <textPath
            href="#arcGrow"
            startOffset="40%"
            textAnchor="middle"
            letterSpacing="2"
          >
            GROW
          </textPath>
        </text>
      </svg>
    </div>
  )
}
