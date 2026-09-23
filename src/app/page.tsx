'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * 根路径静态跳转页
 * output: 'export' 模式不支持服务端 redirect()，改用客户端跳转 + meta refresh 双保险
 */
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/zh/')
  }, [])

  return (
    <>
      {/* meta refresh：JS 被禁用时也能跳转 */}
      <meta httpEquiv="refresh" content="0;url=/zh/" />
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
        <p className="font-mono text-xs tracking-widest text-metal-dim">JIATENG FASTENERS</p>
        <noscript>
          <p className="text-sm text-metal-dim">请选择语言 / Please choose a language:</p>
        </noscript>
        <div className="flex gap-6 font-mono text-sm">
          <Link href="/zh/" className="text-accent hover:text-accent-hover">
            中文版 →
          </Link>
          <Link href="/en/" className="text-accent hover:text-accent-hover">
            English →
          </Link>
        </div>
      </div>
    </>
  )
}
