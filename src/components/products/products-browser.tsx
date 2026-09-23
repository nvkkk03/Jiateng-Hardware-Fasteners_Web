'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
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
  locale: Locale
  dict: Dict
}

/**
 * 产品列表主组件：筛选状态、排序、分批加载
 * URL 参数（?category= / ?series=）在客户端读取（静态导出模式下服务端不可用）
 */
export function ProductsBrowser({ locale, dict }: ProductsBrowserProps) {
  const t = dict.productsPage
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<ProductFilter>({})
  const [seriesId, setSeriesId] = useState<string | undefined>()
  const [sort, setSort] = useState<ProductFilter['sort']>('default')
  const [visible, setVisible] = useState(PAGE_SIZE)

  // 首次挂载时从 URL 读取初始筛选（useEffect 写入避免 hydration 不一致）
  useEffect(() => {
    const cat = searchParams.get('category')
    const ser = searchParams.get('series')
    if (cat) setFilters({ categories: [cat] })
    if (ser) setSeriesId(ser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <>
      {/* 页头（访问系列时显示系列名与描述） */}
      <section className="relative overflow-hidden pb-12 pt-28 md:pt-36" aria-label={t.aria}>
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div className="container-main relative">
          <p className="section-kicker">{t.kicker}</p>
          <h1 className="mt-4 text-display-lg font-semibold text-metal-bright">
            {series ? pick(locale, series.name, series.nameEn) : t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-metal-dim md:text-base">
            {series ? pick(locale, series.desc, series.descEn) : t.desc}
          </p>
        </div>
      </section>

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
              <div
                className="flex overflow-hidden rounded-md border border-line"
                role="group"
                aria-label={t.sort.aria}
              >
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
    </>
  )
}
