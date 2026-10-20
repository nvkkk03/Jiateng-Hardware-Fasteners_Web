import type { Config } from 'tailwindcss'

/**
 * 工业风设计令牌（明亮 / 暗夜双主题）
 * - 颜色均通过 CSS 变量注入，globals.css 中 :root（明亮默认）与 .dark（暗夜）两套取值
 * - 强调色 #FF6B00 两种主题通用
 * - 断点：360 / 768 / 1200 / 1600
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  // dark: 变体跟随 <html class="dark">，与主题切换机制一致（默认 media 只看系统偏好）
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-hover': 'rgb(var(--card-hover) / <alpha-value>)',
        metal: {
          DEFAULT: 'rgb(var(--metal) / <alpha-value>)',
          dim: 'rgb(var(--metal-dim) / <alpha-value>)',
          bright: 'rgb(var(--metal-bright) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#FF6B00',
          hover: '#FF8533',
          dim: 'rgb(255 107 0 / 0.12)',
        },
        // 固有透明度的分隔线，变量直接携带 rgba 值
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        popover: 'rgb(var(--popover) / <alpha-value>)',
        'popover-deep': 'rgb(var(--popover-deep) / <alpha-value>)',
        glass: 'rgb(var(--glass) / <alpha-value>)',
        deep: 'rgb(var(--deep) / <alpha-value>)',
        toast: 'rgb(var(--toast) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          '"Inter Variable"',
          'Inter',
          'system-ui',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono Variable"',
          '"JetBrains Mono"',
          'ui-monospace',
          'Consolas',
          'monospace',
        ],
      },
      screens: {
        xs: '360px',
        sm: '640px',
        md: '768px',
        lg: '1200px',
        xl: '1600px',
        '2xl': '1920px',
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        widest2: '0.25em',
      },
      boxShadow: {
        card: '0 1px 0 0 rgb(var(--hi) / 0.06) inset, 0 12px 32px -12px rgb(var(--sh) / 0.6)',
        'card-hover':
          '0 1px 0 0 rgb(var(--hi) / 0.1) inset, 0 24px 48px -16px rgb(var(--sh) / 0.7)',
        'accent-glow': '0 0 24px -6px rgba(255,107,0,0.45)',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgb(var(--grid) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid) / 0.05) 1px, transparent 1px)',
        'grid-technical':
          'linear-gradient(rgb(var(--grid) / 0.035) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid) / 0.035) 1px, transparent 1px), linear-gradient(rgb(var(--grid) / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid) / 0.06) 1px, transparent 1px)',
        'metal-sheen':
          'linear-gradient(135deg, rgb(var(--hi) / 0.14) 0%, rgb(var(--hi) / 0.02) 40%, rgb(var(--hi) / 0) 60%)',
        'accent-line': 'linear-gradient(90deg, #FF6B00 0%, rgba(255,107,0,0) 100%)',
      },
      backgroundSize: {
        'grid-24': '24px 24px',
        'grid-96': '96px 96px',
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'pulse-dot': 'pulse-dot 2.2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(255,107,0,0.5)' },
          '50%': { opacity: '0.75', boxShadow: '0 0 0 6px rgba(255,107,0,0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
