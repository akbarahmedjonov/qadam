/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        'text-main': 'var(--color-text-main)',
        'text-dim': 'var(--color-text-dim)',
        border: 'var(--color-border)',
        'card-bg': 'var(--color-card)',
        cyan: {
          DEFAULT: 'hsl(211, 95%, 52%)',
          hover: 'hsl(211, 95%, 42%)',
        },
        magenta: {
          DEFAULT: 'hsl(330, 68%, 52%)',
          hover: 'hsl(330, 68%, 42%)',
        },
        lime: {
          DEFAULT: 'hsl(152, 69%, 31%)',
          hover: 'hsl(152, 69%, 26%)',
        },
        fox: {
          light: 'hsl(24, 94%, 53%)',
          dark: 'hsl(27, 96%, 61%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      borderRadius: {
        'xl': '12px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fox-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fox-bounce': 'fox-bounce 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
