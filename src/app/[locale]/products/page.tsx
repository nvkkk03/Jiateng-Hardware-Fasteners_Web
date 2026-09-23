import type { Metadata } from 'next'
import { ProductsBrowser } from '@/components/products/products-browser'
import { FadeIn } from '@/components/motion/fade-in'
import { allSeries, getCategory } from '@/lib/products'
import { getDict, isLocale, pick, type Locale } from '@/lib/i18n'

interface ProductsPageProps {
  params: { locale: string }
  searchParams?: { category?: string; series?: string }
}

export async function generateMetadata({
  params,
  searchParams,
}: ProductsPageProps & { searchParams?: { category?: string; series?: string } }): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return { title: 'Products' }
  const dict = getDict(locale)
  const category = searchParams?.category ? getCategory(searchParams.category) : undefined
  const series = searchParams?.series ? allSeries.find((s) => s.id === searchParams?.series) : undefined
  const subject = series ? pick(locale, series.name, series.nameEn) : category ? pick(locale, category.name, category.nameEn) : undefined

  if (locale === 'en') {
    return {
      title: subject ? `${subject} - ${dict.productsPage.metaTitle}` : dict.productsPage.metaTitle,
      description: subject
        ? `Jiateng ${subject}: materials, grades, standards, reference prices and full specifications. Factory direct, in stock.`
        : dict.productsPage.metaDesc,
      alternates: { canonical: `/en/products`, languages: { 'zh-CN': '/zh/products', en: '/en/products' } },
    }
  }
  return {
    title: subject ? `${subject} - ${dict.productsPage.metaTitle}` : dict.productsPage.metaTitle,
    description: subject
      ? `嘉腾五金${subject}产品列表：材质、强度等级、执行标准、参考价格与技术参数，工厂直供现货常备。`
      : dict.productsPage.metaDesc,
    alternates: { canonical: `/zh/products`, languages: { 'zh-CN': '/zh/products', en: '/en/products' } },
  }
}

/** 产品列表页（双语） */
export default function ProductsPage({ params, searchParams }: ProductsPageProps) {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return null
  const dict = getDict(locale)
  const category = searchParams?.category
  const series = searchParams?.series
  const seriesInfo = series ? allSeries.find((s) => s.id === series) : undefined
  const t = dict.productsPage

  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden pb-12 pt-28 md:pt-36" aria-label={t.aria}>
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div className="container-main relative">
          <FadeIn>
            <p className="section-kicker">{t.kicker}</p>
            <h1 className="mt-4 text-display-lg font-semibold text-metal-bright">
              {seriesInfo ? pick(locale, seriesInfo.name, seriesInfo.nameEn) : t.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-metal-dim md:text-base">
              {seriesInfo
                ? pick(locale, seriesInfo.desc, seriesInfo.descEn)
                : t.desc}
            </p>
          </FadeIn>
        </div>
      </section>

      <ProductsBrowser initialCategory={category} initialSeries={series} locale={locale} dict={dict} />
    </>
  )
}
