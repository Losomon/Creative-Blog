import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0d0e',
        'ink-soft': '#12181c',
        cream: '#f8f6f1',
        'cream-card': '#f7f5f0',
        lime: '#d6f439',
        'lime-dim': '#a9c02e',
        stone: '#86878a',
        'stone-line': '#e7e2d6',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
