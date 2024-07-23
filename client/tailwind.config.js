/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#4c1d95',
          DEFAULT: '#7c3aed',
          light: '#7c3aed',
          100: '#f3ebff',
          200: '#d6bcfa',
          300: '#b794f4',
          400: '#9f7aea',
          500: '#805ad5',
          600: '#6b46c1',
          700: '#553c9a',
          800: '#44337a',
          900: '#322659',
        },

        secondary: {
          dark: '#4c1d95',
          DEFAULT: '#7c3aed',
          light: '#7c3aed',
          100: '#f3ebff',
          200: '#d6bcfa',
          300: '#b794f4',
          400: '#9f7aea',
          500: '#805ad5',
          600: '#6b46c1',
          700: '#553c9a',
          800: '#44337a',
          900: '#322659',
        },

        success: {
          DEFAULT: '#86efac',
          100: '#f0fdf4',
          200: '#dcfce7',
          300: '#bbf7d0',
          400: '#86efac',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#166534',
        },

        error: {
          DEFAULT: '#fda4af',
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
        },

        info: {
          DEFAULT: '#fda4af',
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
        },
        warning: {
          DEFAULT: '#fda4af',
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
        },
        danger: {
          DEFAULT: '#fda4af',
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
        },

        active: {
          dark: '#7c2d12',
          DEFAULT: '#fda4af',
          light: '#fda4af',
        },
      },
      textColor: {
        prime: {
          dark: '#7c3aed',
          DEFAULT: '#7c3aed',
          light: '#7c3aed',
          100: '#f3ebff',
          200: '#d6bcfa',
          300: '#b794f4',
          400: '#9f7aea',
          500: '#805ad5',
          600: '#6b46c1',
          700: '#553c9a',
          800: '#44337a',
          900: '#322659',
        },

        second: {
          dark: '#c084fc',
          DEFAULT: '#ddd6fe',
          light: '#ddd6fe',
          100: '#f5f0ff',
          200: '#e6d7ff',
          300: '#d1bcff',
          400: '#b392ff',
          500: '#9061f9',
          600: '#7b3ff7',
          700: '#6a1be6',
          800: '#5810c1',
          900: '#440096',
        },
      },

      backgroundColor: {
        background: {
          dark: '#0f172a',
          DEFAULT: '#fff',
          light: '#fff',
        },
      },

      borderColor: {
        focus: {
          dark: '#fda4af',
          DEFAULT: '#fda4af',
          light: '#fda4af',
        },
      },
    },

    fontFamily: {
      'sans': ['Arial', 'sans-serif'],
      'serif': ['Georgia', 'serif'],
    },
  },
  plugins: [],
}

