'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Transition } from 'framer-motion'
import { useSyncExternalStore } from 'react'
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

type MotionFadeProps = {
  as?: SupportedTag
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  duration?: number
  distance?: number
  ease?: Transition['ease']
  once?: boolean
  amount?: number
} & React.AriaAttributes

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

// SSR-safe "am I on the client?"
function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // no-op subscribe
    () => true, // client snapshot
    () => false, // server snapshot
  )
}

export function MotionFade({
  as = 'div',
  children,
  direction = 'up',
  delay = 0,
  className = '',
  duration = 0.55,
  distance = 18,
  ease,
  once = true,
  amount = 0.2,
  ...rest
}: MotionFadeProps) {
  const isClient = useIsClient()
  const shouldReduceMotion = useReducedMotion()

  // SSR OR reduced motion → plain semantic element (no motion, no initial styles)
  if (!isClient || shouldReduceMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  const Comp = motionTag[as]
  const variants = fadeIn(direction, { delay, duration, distance, ease })

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
