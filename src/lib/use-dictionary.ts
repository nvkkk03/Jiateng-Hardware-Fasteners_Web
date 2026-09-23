'use client'

import { usePathname } from 'next/navigation'
import { defaultLocale, getDict, isLocale, type Dict, type Locale } from '@/lib/i18n'

/** 客户端组件内按当前路径获取字典（用于 error / not-found 等无法接收 params 的文件） */
export function useDictionary(): { dict: Dict; locale: Locale } {
  const pathname = usePathname()
  const seg = pathname?.split('/')[1] ?? ''
  const locale = isLocale(seg) ? seg : defaultLocale
  return { dict: getDict(locale), locale }
}
