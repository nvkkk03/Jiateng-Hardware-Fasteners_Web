'use client'

import { useEffect } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDictionary } from '@/lib/use-dictionary'

/** 全局错误边界（双语） */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { dict } = useDictionary()
  const t = dict.error

  useEffect(() => {
    // 上报错误到监控平台（接入 Sentry 等后替换）
    console.error('[页面错误]', error)
  }, [error])

  return (
    <div className="container-main flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">{t.code}</p>
      <h1 className="mt-4 text-3xl font-semibold text-metal-bright md:text-4xl">{t.title}</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-metal-dim">{t.desc}</p>
      <div className="mt-8 flex items-center gap-2 font-mono text-xs text-metal-dim/50">
        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
        {error.digest ?? 'ERR_UNKNOWN'}
      </div>
      <Button className="mt-8" onClick={reset}>
        <RotateCcw className="h-4 w-4" />
        {t.retry}
      </Button>
    </div>
  )
}
