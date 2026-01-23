export default function PinkBlobs() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true"></svg>

      {/* Blob A – top left (small, decorative) */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-[8%] top-[14%]
          h-[clamp(48px,6vw,80px)] w-[clamp(60px,7vw,96px)]
        "
        viewBox="0 0 200 160"
      >
        <path
          fill="#FF56C9"
          d="
            M44 44
            C58 22 88 18 110 22
            C132 26 152 40 154 58
            C156 76 142 88 124 98
            C106 108 92 126 70 122
            C48 118 28 102 26 84
            C24 66 30 56 44 44
            Z
          "
        />
      </svg>

      {/* Blob B – bottom left (very small accent) */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-[12%] bottom-[10%]
          h-[clamp(36px,4.5vw,64px)] w-[clamp(44px,5.5vw,72px)]

        "
        viewBox="0 0 180 160"
      >
        <path
          fill="#FF56C9"
          d="
            M52 70
            C60 48 86 34 108 40
            C130 46 144 66 138 86
            C132 106 112 118 92 122
            C72 126 52 116 44 98
            C36 80 44 92 52 70
            Z
          "
        />
      </svg>

      {/* Blob C – bottom right */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[14%] bottom-[12%]
          h-[clamp(56px,7vw,112px)] w-[clamp(64px,8vw,128px)]

        "
        viewBox="0 0 220 180"
      >
        <path
          fill="#FF56C9"
          d="
            M70 48
            C90 26 132 24 160 38
            C188 52 202 76 192 98
            C182 120 156 124 132 136
            C108 148 90 160 68 150
            C46 140 32 118 36 96
            C40 74 50 70 70 48
            Z
          "
        />
      </svg>

      {/* Blob D – top right (large, main decorative blob) */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[-6%] top-[4%]
          h-[clamp(90px,10vw,160px)] w-[clamp(110px,12vw,190px)]

        "
        viewBox="0 0 240 200"
      >
        <path
          fill="#FF56C9"
          d="
            M84 28
            C116 8 168 10 196 32
            C224 54 230 90 214 118
            C198 146 164 154 132 170
            C100 186 70 184 46 164
            C22 144 14 112 26 82
            C38 52 52 44 84 28
            Z
          "
        />
      </svg>

      {/* Blob E – tiny accent near the big top-right blob */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          right-[18%] top-[22%]
          h-[clamp(26px,3.5vw,56px)] w-[clamp(32px,4vw,64px)]

        "
        viewBox="0 0 120 100"
      >
        <path
          fill="#FF56C9"
          style={{ filter: 'url(#rough)' }}
          d="
            M34 26
            C48 18 72 20 82 32
            C92 44 88 60 72 70
            C56 80 36 78 26 64
            C16 50 20 34 34 26
            Z
          "
        />
      </svg>
    </>
  )
}
