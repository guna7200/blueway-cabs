/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        navy: '#051E3D',
        blue: {
          DEFAULT: '#005FB5',
          50: '#F7FBFF',
          100: '#EAF6FF',
          400: '#01B4FB',
          500: '#0089E6',
          600: '#005FB5',
          700: '#044C94',
          800: '#05386B',
          900: '#051E3D',
        },
        cyan: '#01B4FB',
        brightBlue: '#0089E6',
        lightBlue: '#EAF6FF',
        brandBg: '#F7FBFF'
      }
    },
  },
  plugins: [],
}
