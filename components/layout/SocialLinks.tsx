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

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/bloomandgrowlab/"
        aria-label="open Instagram"
        className={`transform transition-transform hover:scale-110 ${hoverClassName} `}
      >
        <Ig className={sizeClass} />
      </a>

      <a
        href="https://www.facebook.com/bloomAndGrowLab/"
        aria-label="open Facebook"
        className={`transform transition-transform hover:scale-110 ${hoverClassName}`}
      >
        <Fb className={sizeClass} />
      </a>

      <a
        href="https://www.linkedin.com/company/bloom-and-grow-lab/"
        aria-label="LinkedIn"
        className={`transform transition-transform hover:scale-110 ${hoverClassName}`}
      >
        <Likdn className={sizeClass} />
      </a>
    </div>
  )
}
