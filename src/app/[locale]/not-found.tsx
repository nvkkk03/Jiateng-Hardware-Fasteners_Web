'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDictionary } from '@/lib/use-dictionary'

/** 语言级 404 页面（双语） */
export default function LocaleNotFound() {
  const { dict, locale } = useDictionary()
  const t = dict.notFound

  return (
    <div className="container-main flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">{t.code}</p>
      <h1 className="mt-4 text-display-lg font-semibold text-metal-bright">
        {t.titleA}
        <span className="text-accent">{t.titleB}</span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-metal-dim">{t.desc}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href={`/${locale}/products`}>
            {t.browse}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/${locale}`}>{t.backHome}</Link>
        </Button>
      </div>
    </div>
  )
}
