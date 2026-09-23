'use client'

import { useEffect } from 'react'

/** 将 <html lang> 同步为当前语言（根布局静态为 zh-CN，英文页由客户端修正） */
export function LocaleSync({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN'
  }, [locale])
  return null
}
