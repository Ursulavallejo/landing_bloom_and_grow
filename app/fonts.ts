import { Barrio, Caveat, Quicksand, Special_Elite } from 'next/font/google'

export const barrio = Barrio({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-barrio',
  display: 'swap',
})

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const elite = Special_Elite({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-elite',
  display: 'swap',
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
  display: 'swap',
})

import { Playfair_Display } from 'next/font/google'

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['italic'],
  display: 'swap',
})
