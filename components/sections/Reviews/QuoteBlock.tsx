export default function QuoteBlock({
  quote,
  author,
  quoteClassName = '',
}: {
  quote: string
  author: string
  quoteClassName?: string
}) {
  return (
    <figure className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-4 -top-6 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/60 sm:-left-8 sm:-top-8 sm:text-8xl"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-10 select-none font-subtitle text-7xl leading-none text-[rgb(var(--fg))]/60 sm:-right-8 sm:-bottom-12 sm:text-8xl"
      >
        ”
      </span>

      <blockquote
        className={`whitespace-pre-line font-nav italic text-base leading-relaxed text-[rgb(var(--fg))]/95 sm:text-lg ${quoteClassName}`}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-4 font-nav text-sm font-bold tracking-wide text-[rgb(var(--fg))]/90">
        — {author}
      </figcaption>
    </figure>
  )
}
