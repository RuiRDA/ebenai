/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#0EA5E9',
          DEFAULT: '#0284C7',
          dark: '#0369A1'
        },
        secondary: {
          light: '#1E40AF',
          DEFAULT: '#1E3A8A',
          dark: '#172554'
        }
      }
    },
  },
  plugins: [],
};