'use client'

import { useEffect, useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { FilterPanel } from '@/components/products/filter-panel'
import { ProductCard } from '@/components/products/product-card'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { allSeries, filterProducts, type ProductFilter } from '@/lib/products'
import { format, pick, type Dict, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const PAGE_SIZE = 12

interface ProductsBrowserProps {
  /** 从 URL 读取的初始筛选 */
  initialCategory?: string
  initialSeries?: string
  locale: Locale
  dict: Dict
}

/** 产品列表主组件：筛选状态、排序、分批加载 */
export function ProductsBrowser({ initialCategory, initialSeries, locale, dict }: ProductsBrowserProps) {
  const t = dict.productsPage
  const [filters, setFilters] = useState<ProductFilter>(
    initialCategory ? { categories: [initialCategory] } : {},
  )
  const [seriesId, setSeriesId] = useState<string | undefined>(initialSeries)
  const [sort, setSort] = useState<ProductFilter['sort']>('default')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const results = useMemo(() => {
    let list = filterProducts({ ...filters, sort })
    if (seriesId) list = list.filter((p) => p.seriesId === seriesId)
    return list
  }, [filters, seriesId, sort])

  // 筛选变化时重置加载数量
  useEffect(() => {
    setVisible(PAGE_SIZE)
  }, [filters, seriesId, sort])

  const series = allSeries.find((s) => s.id === seriesId)
  const shown = results.slice(0, visible)

  const sorts = [
    { key: 'default', label: t.sort.default },
    { key: 'price-asc', label: t.sort.asc },
    { key: 'price-desc', label: t.sort.desc },
  ] as const

  return (
    <div className="container-main grid gap-10 pb-24 lg:grid-cols-[264px_1fr]">
      {/* 桌面端侧栏筛选 */}
      <aside className="hidden lg:block" aria-label={t.filter.title}>
        <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
          <div className="mb-6 flex items-center gap-2 border-b border-line pb-4">
            <SlidersHorizontal className="h-4 w-4 text-accent" aria-hidden="true" />
            <h2 className="font-medium text-metal-bright">{t.filter.title}</h2>
          </div>
          <FilterPanel draft={filters} onChange={setFilters} dict={dict} locale={locale} />
        </div>
      </aside>

      {/* 右侧结果区 */}
      <div>
        {/* 工具条 */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <p className="text-sm text-metal-dim">
            {format(t.resultsCount, { n: results.length })}
            {series && (
              <>
                <span className="mx-2 text-line-strong">/</span>
                <button
                  type="button"
                  onClick={() => setSeriesId(undefined)}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent-dim px-2 py-0.5 font-mono text-xs text-accent transition-colors hover:border-accent"
                >
                  {pick(locale, series.name, series.nameEn)} ✕
                </button>
              </>
            )}
          </p>

          <div className="flex items-center gap-3">
            {/* 移动端筛选抽屉 */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  {t.filterBtn}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-xl">
                <SheetTitle>{t.filter.title}</SheetTitle>
                <div className="mt-6">
                  <FilterPanel draft={filters} onChange={setFilters} dict={dict} locale={locale} />
                </div>
              </SheetContent>
            </Sheet>

            {/* 排序 */}
            <div className="flex overflow-hidden rounded-md border border-line" role="group" aria-label={t.sort.aria}>
              {sorts.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSort(s.key)}
                  aria-pressed={sort === s.key}
                  className={cn(
                    'px-3 py-2 font-mono text-xs transition-colors',
                    sort === s.key
                      ? 'bg-accent text-white'
                      : 'bg-transparent text-metal-dim hover:bg-white/5 hover:text-metal-bright',
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 产品网格 */}
        {shown.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p, i) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} priority={i < 3} />
            ))}
          </div>
        ) : (
          /* 空状态 */
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-line-strong py-24 text-center">
            <p className="font-mono text-4xl text-metal-dim/30">[ 0 ]</p>
            <p className="mt-4 text-sm text-metal-dim">{t.emptyTitle}</p>
            <p className="mt-1 text-xs text-metal-dim/60">{t.emptyDesc}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={() => {
                setFilters({})
                setSeriesId(undefined)
              }}
            >
              {t.emptyReset}
            </Button>
          </div>
        )}

        {/* 加载更多 */}
        {visible < results.length && (
          <div className="mt-12 text-center">
            <Button variant="metal" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
              {format(t.loadMore, { a: shown.length, b: results.length })}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
