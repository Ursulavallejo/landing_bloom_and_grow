import type { Transition, Variants } from 'framer-motion'

export type Direction = 'up' | 'down' | 'left' | 'right'

type FadeInOptions = {
  delay?: number
  duration?: number
  distance?: number
  ease?: Transition['ease']
}

export function fadeIn(
  direction: Direction = 'up',
  {
    delay = 0,
    duration = 0.55,
    distance = 18,
    ease = [0.22, 1, 0.36, 1],
  }: FadeInOptions = {},
): Variants {
  const isX = direction === 'left' || direction === 'right'
  const axis: 'x' | 'y' = isX ? 'x' : 'y'
  const sign = direction === 'left' || direction === 'up' ? 1 : -1
  const offset = sign * distance

  const hidden: Record<string, unknown> = {
    opacity: 0,
    transition: { duration: 0.2 },
  }
  hidden[axis] = offset

  const show: Record<string, unknown> = {
    opacity: 1,
    transition: { delay, duration, ease },
  }
  show[axis] = 0

  return { hidden, show } as Variants
}
