/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f5e6c8',
          DEFAULT: '#c9a84c',
          dark: '#a07830',
        },
        blush: {
          light: '#fdf0f0',
          DEFAULT: '#f2c4c4',
          dark: '#e8a0a0',
        },
        noir: {
          DEFAULT: '#0a0a0a',
          soft: '#1a1a1a',
          muted: '#2a2a2a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
