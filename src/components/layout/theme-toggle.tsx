'use client'

import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'jt-theme'

/**
 * 主题切换按钮：明亮（默认）/ 暗夜
 * - 切换 <html> 上的 .dark 类，CSS 变量驱动全站换肤
 * - 选择持久化到 localStorage，首屏由 layout 注入的内联脚本恢复，避免闪烁
 * - 图标显隐完全由 CSS（dark: 前缀）控制，SSR 输出与客户端一致，无水合不匹配
 */
export function ThemeToggle({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        const dark = document.documentElement.classList.toggle('dark')
        try {
          localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
        } catch {
          /* 隐私模式下存储失败可忽略 */
        }
      }}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-metal-dim transition-colors hover:border-line-strong hover:text-metal-bright"
    >
      <Sun className="h-3.5 w-3.5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-3.5 w-3.5 dark:block" aria-hidden="true" />
    </button>
  )
}
