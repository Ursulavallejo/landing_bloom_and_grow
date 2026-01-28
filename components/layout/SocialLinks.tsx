'use client'

import { Icons } from '@/icons'

type SocialLinksProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  hoverClassName?: string
}

export function SocialLinks({
  size = 'md',
  className = '',
  hoverClassName = 'hover:text-[rgb(var(--primary))]',
}: SocialLinksProps) {
  const Ig = Icons.instagramIcon
  const Fb = Icons.facebookIcon
  const Likdn = Icons.linkedinIcon

  const sizeClass =
    size === 'lg' ? 'h-6 w-6' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  const linkBase =
    'transform transition-transform hover:scale-110 ' +
    hoverClassName +
    ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/bloomandgrowlab/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bloom & Grow on Instagram (opens in a new tab)"
        className={linkBase}
      >
        <Ig className={sizeClass} aria-hidden="true" focusable="false" />
      </a>

      <a
        href="https://www.facebook.com/bloomAndGrowLab/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bloom & Grow on Facebook (opens in a new tab)"
        className={linkBase}
      >
        <Fb className={sizeClass} aria-hidden="true" focusable="false" />
      </a>

      <a
        href="https://www.linkedin.com/company/bloom-and-grow-lab/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bloom & Grow on LinkedIn (opens in a new tab)"
        className={linkBase}
      >
        <Likdn className={sizeClass} aria-hidden="true" focusable="false" />
      </a>
    </div>
  )
}
