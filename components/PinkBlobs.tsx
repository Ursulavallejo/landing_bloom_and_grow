export default function PinkBlobs() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true"></svg>

      {/* Blob A – top left (small, decorative) */}
      <svg
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-10 top-24
          h-16 w-20
          md:left-5 md:top-38 md:h-20 md:w-24
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
          left-12 bottom-14
          h-12 w-14
          md:left-26 md:bottom-16 md:h-14 md:w-16
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
          right-12 bottom-20
          h-20 w-24
          md:right-41
           md:bottom-16 md:h-24 md:w-28
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
          right-6 top-16
          h-28 w-32
          md:right-[-50px] md:top-1
           md:h-30 md:w-40
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
          right-24 top-36
          h-10 w-12
          md:right-10 md:top-30 md:h-12 md:w-14
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
