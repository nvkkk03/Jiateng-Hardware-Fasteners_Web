import type { Viewport } from 'next'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './globals.css'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

/**
 * 首屏主题恢复脚本：在任何内容渲染前读取 localStorage 并挂载 .dark 类，
 * 避免暗夜主题用户看到明亮闪烁（FOUC）。默认明亮主题。
 */
const themeInitScript = `(function(){try{if(localStorage.getItem('jt-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})()`

/** 根布局：仅提供 HTML 外壳，导航/页脚与本地化内容在 [locale] 布局中 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  )
}
