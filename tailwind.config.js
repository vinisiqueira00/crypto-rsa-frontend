/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      maxHeight: {
        'screen-borderless': 'calc(100vh - 25%)',
      },
      width: {
        'screen-borderless': 'calc(100vw - 64px)',
      },
      maxWidth: {
        'screen-borderless': 'calc(100vw - 64px)',
      },
      rotate: {
        '360': '360deg'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'logotype': ['var(--fira-code-font)', ...defaultTheme.fontFamily.mono],
        'body': ['var(--inter-font)', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'hover': 'inset 0 1000px 0 0 rgba(0, 0, 0, 0.2)',
        'radio': '0 0 0 6px rgba(239, 35, 60, 0.15)',
      },
      transitionProperty: {
        'label': 'top, bottom, left, right, all'
      }
    },
    colors: {
      'transparent': 'transparent',
      'black-translucid': 'rgba(0, 0, 0, 0.7)',
      'raisin-black': '#222435',
      'space-cadet': '#2B2D42',
      'charcoal': '#484B5D',
      'cool-gray': '#8D99AE',
      'antiflash-white': '#EDF2F4',
      'red-pantone': '#EF233C',
      'red-pantone-translucid': 'rgba(239,35,60, 0.15)',
      'safety-orange': '#FF7B00',
      'dark-pastel-green': '#35B551',
    },
  },
  plugins: [],
}
