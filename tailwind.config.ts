import type { Config } from 'tailwindcss'

/**
 * 暗色工业风设计令牌
 * - 背景 #0A0A0A / 卡片 #1A1A1A
 * - 金属灰 #C0C0C0 / 强调色 #FF6B00
 * - 断点：360 / 768 / 1200 / 1600
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        surface: '#111214',
        card: '#1A1A1A',
        'card-hover': '#212224',
        metal: {
          DEFAULT: '#C0C0C0',
          dim: '#8A8F98',
          bright: '#EDEFF2',
        },
        accent: {
          DEFAULT: '#FF6B00',
          hover: '#FF8533',
          dim: 'rgba(255, 107, 0, 0.12)',
        },
        line: 'rgba(192, 192, 192, 0.12)',
        'line-strong': 'rgba(192, 192, 192, 0.24)',
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
        card: '0 1px 0 0 rgba(192,192,192,0.06) inset, 0 12px 32px -12px rgba(0,0,0,0.6)',
        'card-hover': '0 1px 0 0 rgba(192,192,192,0.1) inset, 0 24px 48px -16px rgba(0,0,0,0.7)',
        'accent-glow': '0 0 24px -6px rgba(255,107,0,0.45)',
      },
      backgroundImage: {
        'grid-fine':
          'linear-gradient(rgba(192,192,192,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.05) 1px, transparent 1px)',
        'grid-technical':
          'linear-gradient(rgba(192,192,192,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.035) 1px, transparent 1px), linear-gradient(rgba(192,192,192,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.06) 1px, transparent 1px)',
        'metal-sheen':
          'linear-gradient(135deg, rgba(192,192,192,0.14) 0%, rgba(192,192,192,0.02) 40%, rgba(192,192,192,0) 60%)',
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
