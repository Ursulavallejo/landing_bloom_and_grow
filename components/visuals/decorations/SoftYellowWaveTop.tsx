export default function SoftYellowWaveTop({
  className = '',
}: {
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className} h-14 sm:h-16`}
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
    >
      <path
        fill="var(--tint-1)"
        d="
          M0,0
          C120,20 240,40 360,36
          C480,32 600,10 720,14
          C840,18 960,48 1080,46
          C1200,44 1320,24 1440,16
          L1440,160 L0,160 Z
        "
      />
    </svg>
  )
}
