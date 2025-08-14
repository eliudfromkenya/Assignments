/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#166534', // Darker green for default primary (greenish-800)
          light: '#D1FAE5',   // Keeping light shade as is
          dark: '#14532D',     // Darker green for dark primary (greenish-900)
          600: '#166534',     // Explicitly setting 600 to greenish-800
          700: '#14532D'      // Explicitly setting 700 to greenish-900
        },
        secondary: {
          DEFAULT: '#20C997', // A complementary teal-green
          light: '#A7F3D0',   // Lighter teal-green
          dark: '#15986D'     // Darker teal-green
        },
        greenish: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#0F3D22',
        }
      }, screens: {
        'xs': '480px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}