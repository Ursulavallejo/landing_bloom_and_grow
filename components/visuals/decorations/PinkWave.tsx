export default function PinkWave() {
  return (
    <>
      {/* Desktop (md+): left band + right wave on the same baseline */}
      <div
        aria-hidden="true"
        className="
     pointer-events-none
    absolute bottom-[-65px]
    hidden md:flex
    h-48
    z-30
    w-screen left-1/2 -translate-x-1/2
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

      {/* Mobile: full-width wave across the whole hero */}
      <svg
        aria-hidden="true"
        className="
        pointer-events-none
        absolute inset-x-0 bottom-[-46px]
        md:hidden
        w-screen
        h-32
        z-30
        left-1/2 -translate-x-1/2
      "
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
    </>
  )
}
