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
        basic: {
          dark: '#f8fafc',
          DEFAULT: '#f8fafc',
          light: '#020617',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

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
          dark: '#2563eb',
          DEFAULT: '#3b82f6',
          light: '#3b82f6',
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
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
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
          900: '#702459',
        },

        focus: {
          dark: '#7c2d12',
          DEFAULT: '#fda4af',
          light: '#fda4af',
          100: '#fff1f2',
          200: '#fed7dc',
          300: '#fbb6ce',
          400: '#f687b3',
          500: '#ed64a6',
          600: '#d53f8c',
          700: '#b83280',
          800: '#97266d',
          900: '#702459',
        },
      },

      backgroundColor: {
        background: {
          dark: '#0f172a',
          DEFAULT: '#fff',
          light: '#fff',
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

