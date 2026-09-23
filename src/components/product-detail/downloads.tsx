'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, FileText, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dict } from '@/lib/i18n'

/** 资源下载区：CAD 图纸 / 规格书 PDF（演示环境给出提示） */
export function Downloads({ dict }: { dict: Dict }) {
  const t = dict.detail.downloads
  const [tip, setTip] = useState<string | null>(null)

  const handleDownload = () => {
    setTip(t.toast)
    window.setTimeout(() => setTip(null), 3200)
  }

  return (
    <div className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleDownload}
          className="group flex items-center gap-4 rounded-lg border border-line bg-card p-5 text-left transition-all duration-300 hover:border-line-strong hover:bg-card-hover"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-accent">
            <Download className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-medium text-metal-bright">{t.cad}</span>
            <span className="mt-0.5 block font-mono text-[11px] text-metal-dim">{t.cadSub}</span>
          </span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className="group flex items-center gap-4 rounded-lg border border-line bg-card p-5 text-left transition-all duration-300 hover:border-line-strong hover:bg-card-hover"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-accent">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-medium text-metal-bright">{t.spec}</span>
            <span className="mt-0.5 block font-mono text-[11px] text-metal-dim">{t.specSub}</span>
          </span>
        </button>
      </div>

      {/* 提示 toast */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-md border border-accent/40 bg-[#181310] px-5 py-3.5 text-sm text-metal-bright shadow-card-hover"
            role="status"
          >
            <Info className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {tip}
            <Button variant="link" size="sm" className="h-auto p-0" asChild>
              <a href="#inquiry">{t.goInquiry}</a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
