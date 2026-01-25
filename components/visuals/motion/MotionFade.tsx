'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Transition, Variants } from 'framer-motion'
import { fadeIn, type Direction } from '@/lib/motion/variants'

type SupportedTag =
  | 'div'
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'section'
  | 'article'
  | 'header'
  | 'ul'
  | 'li'

type MotionFadeOwnProps = {
  as?: SupportedTag
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  duration?: number
  distance?: number
  ease?: Transition['ease']
  inView?: boolean
  once?: boolean
  amount?: number
}

/**
 * Allow only "safe" DOM props that do not conflict with Framer Motion prop names.
 * (Framer Motion uses onAnimationStart/onDrag/etc with different signatures.)
 */
type DataAttributes = {
  [key: `data-${string}`]: string | number | boolean | undefined
}

type SafeEvents = {
  onClick?: React.MouseEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>
  onMouseEnter?: React.MouseEventHandler<HTMLElement>
  onMouseLeave?: React.MouseEventHandler<HTMLElement>
  onFocus?: React.FocusEventHandler<HTMLElement>
  onBlur?: React.FocusEventHandler<HTMLElement>
}

type SafeDomProps = {
  id?: string
  title?: string
  role?: React.AriaRole
  tabIndex?: number
  style?: React.CSSProperties
} & React.AriaAttributes &
  DataAttributes &
  SafeEvents

type MotionFadeProps = MotionFadeOwnProps & SafeDomProps

const motionTag = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  ul: motion.ul,
  li: motion.li,
} as const

export function MotionFade({
  as = 'div',
  children,
  direction = 'up',
  delay = 0,
  className = '',
  duration = 0.55,
  distance = 18,
  ease,
  inView = true,
  once = true,
  amount = 0.2,
  ...rest
}: MotionFadeProps) {
  const shouldReduceMotion = useReducedMotion()

  // Respect prefers-reduced-motion: render a plain semantic element (no animation)
  if (shouldReduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const variants: Variants = fadeIn(direction, {
    delay,
    duration,
    distance,
    ease,
  })
  const Comp = motionTag[as]

  if (inView) {
    return (
      <Comp
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
        {...rest}
      >
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      animate="show"
      {...rest}
    >
      {children}
    </Comp>
  )
}
