// components/PinkWave.tsx
export default function PinkWave() {
  return (
    <>
      {/* Desktop (md+): left band + right wave on the same baseline */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-x-0

          hidden md:flex
          h-56
          z-30
          translate-y-10
           bottom-[-12px]
        "
      >
        {/* LEFT: straight band */}
        <svg
          className="h-full w-1/2"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          {/* Keep the top edge straight */}
          <rect x="0" y="115" width="100" height="120" fill="#FF56C9" />
        </svg>

        {/* RIGHT: higher wave (covers more of the yellow area) */}
        <svg
          className="h-full w-1/2   "
          viewBox="0 0 720 200"
          preserveAspectRatio="none"
        >
          <path
            fill="#FF56C9"
            d="
              M0,115
              C30,65 65,55 120,105
              C150,125 210,114 260,92
              C320,30 360,125 420,100
              C602,15 515,145 585,115
              C645,100 655,28 750,38
              L720,200 L0,240 Z
            "
          />
        </svg>
      </div>

      {/* Mobile: only a small wave on bottom-right */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-10px] right-[-10px]
          md:hidden
          h-24 w-80
          z-30
        "
        viewBox="0 0 360 160"
        preserveAspectRatio="none"
      >
        <path
          fill="#FF56C9"
          d="
            M0,78
            C20,45 55,45 78,78
            C110,125 150,95 185,86
            C230,70 250,140 295,110
            C330,90 350,92 360,98
            L360,160 L0,160 Z
          "
        />
      </svg>
    </>
  )
}
