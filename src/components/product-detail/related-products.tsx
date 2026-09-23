'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/products/product-card'
import type { Product } from '@/types'
import type { Dict, Locale } from '@/lib/i18n'

/** 相关产品推荐：横向滚动 */
export function RelatedProducts({
  products,
  locale,
  dict,
}: {
  products: Product[]
  locale: Locale
  dict: Dict
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* 滚动按钮 */}
      <div className="absolute -top-16 right-0 hidden gap-2 md:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-metal-dim transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line text-metal-dim transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
      >
        {products.map((p) => (
          <div key={p.slug} className="w-[280px] shrink-0 snap-start">
            <ProductCard product={p} locale={locale} dict={dict} className="h-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
