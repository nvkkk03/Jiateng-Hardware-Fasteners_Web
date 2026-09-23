import type { Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

/** 根布局：仅提供 HTML 外壳，导航/页脚与本地化内容在 [locale] 布局中 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  )
}
