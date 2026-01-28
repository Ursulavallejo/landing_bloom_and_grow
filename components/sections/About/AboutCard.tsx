import Image from 'next/image'

export default function AboutCard({
  photo,
  name,
  role,
  text,
  imgClassName = '',
}: {
  photo: string
  name: string
  role: string
  text: string
  imgClassName?: string
}) {
  return (
    <article className="relative flex h-full flex-col items-center rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center shadow-sm">
      <div className="mb-4 h-32 w-32 overflow-hidden rounded-full bg-(--tint-1)">
        <Image
          src={photo}
          alt={name}
          width={256}
          height={256}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>

      <h3 className="mt-2 font-subtitle text-2xl text-[rgb(var(--fg))]">
        {name}
      </h3>
      <p className="mt-1 text-sm font-nav uppercase tracking-wide text-[rgb(var(--fg))]/60">
        {role}
      </p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[rgb(var(--fg))]/80 text-justify">
        {text}
      </p>
    </article>
  )
}
