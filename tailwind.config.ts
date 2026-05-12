import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        panel: 'hsl(var(--panel))',
        ink: { DEFAULT: 'hsl(var(--ink))', 2: 'hsl(var(--ink-2))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted))' },
        line: { DEFAULT: 'hsl(var(--line))', 2: 'hsl(var(--line-2))' },
        accent: { DEFAULT: 'hsl(var(--accent))', soft: 'hsl(var(--accent-soft))' },
        danger: 'hsl(var(--danger))',
        ok: 'hsl(var(--ok))',
        border: 'hsl(var(--line))',
        input: 'hsl(var(--line-2))',
        ring: 'hsl(var(--ink))',
        background: 'hsl(var(--bg))',
        foreground: 'hsl(var(--ink))',
        primary: { DEFAULT: 'hsl(var(--ink))', foreground: 'hsl(var(--bg))' },
        secondary: { DEFAULT: 'hsl(var(--panel))', foreground: 'hsl(var(--ink))' },
        destructive: { DEFAULT: 'hsl(var(--danger))', foreground: 'hsl(var(--bg))' },
        card: { DEFAULT: 'hsl(var(--surface))', foreground: 'hsl(var(--ink))' },
        popover: { DEFAULT: 'hsl(var(--surface))', foreground: 'hsl(var(--ink))' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        lg: '14px',
        md: '10px',
        sm: '6px',
      },
      boxShadow: {
        soft: '0 1px 0 hsl(var(--ink) / 0.04)',
        lift: '0 6px 24px -8px hsl(var(--ink) / 0.12), 0 2px 6px -2px hsl(var(--ink) / 0.06)',
        deep: '0 24px 60px -16px hsl(var(--ink) / 0.25)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
