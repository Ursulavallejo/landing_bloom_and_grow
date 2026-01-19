/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      tablet: '768px',
      md: '900px',
      lg: '1200px',
      xl: '1400px',
      '2xl': '1600px',
    },
    extend: {},
  },
  plugins: [],
}
