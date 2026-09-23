import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, Car, CheckCircle2, ChevronRight, Cpu, Factory, TrainFront, Wind } from 'lucide-react'
import { ProductGallery } from '@/components/product-detail/product-gallery'
import { SpecTable } from '@/components/product-detail/spec-table'
import { Downloads } from '@/components/product-detail/downloads'
import { InquiryForm } from '@/components/product-detail/inquiry-form'
import { RelatedProducts } from '@/components/product-detail/related-products'
import { SectionHeader } from '@/components/layout/section-header'
import { FadeIn } from '@/components/motion/fade-in'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  allProducts,
  allSeries,
  getCategory,
  getProduct,
  getRelatedProducts,
  getSeriesProducts,
} from '@/lib/products'
import { format, getDict, isLocale, pick, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'

const APP_ICONS = [Factory, Cpu, Building2, Car, TrainFront, Wind]

interface DetailPageProps {
  params: { locale: string; slug: string }
}

/** 预渲染 2 语言 × 197 产品 */
export function generateStaticParams() {
  const locales = ['zh', 'en']
  return locales.flatMap((locale) => allProducts.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return { title: 'Not Found' }
  const dict = getDict(locale)
  const product = getProduct(params.slug)
  if (!product) return { title: dict.notFound.titleA }
  const name = pick(locale, product.name, product.nameEn)
  const material = pick(locale, product.material, product.materialEn)
  const surface = pick(locale, product.surface, product.surfaceEn)
  const seriesName = pick(locale, product.seriesName, product.seriesNameEn)

  if (locale === 'en') {
    return {
      title: `${name}${product.grade !== '—' ? ` ${product.grade}` : ''} | ${seriesName}`,
      description: `${name} (${product.id}): ${material}, ${surface}, standard ${product.standard}. Jiateng factory direct, in stock, custom-made available.`,
      alternates: {
        canonical: `/en/products/${product.slug}`,
        languages: {
          'zh-CN': `/zh/products/${product.slug}`,
          en: `/en/products/${product.slug}`,
        },
      },
      openGraph: {
        title: `${name} | JIATENG FASTENERS`,
        description: `${material} · ${product.standard} · Factory direct`,
        images: [{ url: product.image, width: 800, height: 600, alt: name }],
      },
    }
  }
  return {
    title: `${name} ${product.grade !== '—' ? product.grade : ''} | ${seriesName}`,
    description: `${name}（${product.id}）：材质 ${material}，表面处理 ${surface}，执行标准 ${product.standard}。嘉腾五金工厂直供，现货常备，支持非标定制。`,
    alternates: {
      canonical: `/zh/products/${product.slug}`,
      languages: {
        'zh-CN': `/zh/products/${product.slug}`,
        en: `/en/products/${product.slug}`,
      },
    },
    openGraph: {
      title: `${name} | 嘉腾五金`,
      description: `材质 ${material} · 标准 ${product.standard} · 工厂直供`,
      images: [{ url: product.image, width: 800, height: 600, alt: name }],
    },
  }
}

/** 产品详情页（双语） */
export default function ProductDetailPage({ params }: DetailPageProps) {
  const locale = params.locale as Locale
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)
  const product = getProduct(params.slug)
  if (!product) notFound()

  const t = dict.detail
  const series = allSeries.find((s) => s.id === product.seriesId)
  const category = getCategory(product.category)
  const gallery = getSeriesProducts(product.seriesId)
  const related = getRelatedProducts(product)
  const appName = (series ? (locale === 'en' ? series.appsEn : series.apps) : []) as string[]
  const name = pick(locale, product.name, product.nameEn)
  const material = pick(locale, product.material, product.materialEn)
  const surface = pick(locale, product.surface, product.surfaceEn)
  const seriesName = pick(locale, product.seriesName, product.seriesNameEn)
  const categoryName = category ? pick(locale, category.name, category.nameEn) : ''
  const seriesDesc = series ? pick(locale, series.desc, series.descEn) : ''

  /** Product 结构化数据 */
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    sku: product.id,
    image: `${site.url}${product.image}`,
    description: `${name}: ${material}, ${surface}, ${product.standard}.`,
    brand: { '@type': 'Brand', name: dict.brand.title },
    manufacturer: { '@type': 'Organization', name: dict.footer.company },
    category: categoryName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CNY',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: dict.footer.company },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.homeCrumb, item: `${site.url}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t.productsCrumb, item: `${site.url}/${locale}/products` },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: `${site.url}/${locale}/products/${product.slug}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* 面包屑 */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-surface/40">
        <ol className="container-main flex h-12 items-center gap-2 overflow-x-auto whitespace-nowrap font-mono text-xs text-metal-dim">
          <li>
            <Link href={`/${locale}`} className="transition-colors hover:text-metal-bright">
              {t.homeCrumb}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3 shrink-0 text-metal-dim/40" aria-hidden="true" />
          <li>
            <Link href={`/${locale}/products`} className="transition-colors hover:text-metal-bright">
              {t.productsCrumb}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3 shrink-0 text-metal-dim/40" aria-hidden="true" />
          <li>
            <Link
              href={`/${locale}/products?series=${product.seriesId}`}
              className="transition-colors hover:text-metal-bright"
            >
              {seriesName}
            </Link>
          </li>
          <ChevronRight className="h-3 w-3 shrink-0 text-metal-dim/40" aria-hidden="true" />
          <li className="text-metal" aria-current="page">
            {name}
          </li>
        </ol>
      </nav>

      {/* 产品主信息 */}
      <section className="container-main py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-14">
          <FadeIn direction="right">
            <ProductGallery product={product} gallery={gallery} locale={locale} dict={dict} />
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="accent">{seriesName}</Badge>
                <Badge>{categoryName}</Badge>
              </div>

              <h1 className="mt-4 text-3xl font-semibold leading-snug text-metal-bright md:text-4xl">{name}</h1>
              <p className="mt-3 font-mono text-xs tracking-widest text-metal-dim/70">
                {t.skuLabel}: {product.id} · {series?.en}
              </p>

              {/* 参考价 */}
              <div className="mt-6 flex items-baseline gap-2 border-y border-line py-5">
                <span className="text-sm text-metal-dim">{t.referencePrice}</span>
                <span className="font-mono text-3xl font-bold text-accent">¥{product.price.toFixed(2)}</span>
                <span className="text-xs text-metal-dim/70">{t.priceSuffix}</span>
              </div>

              {/* 关键参数速览 */}
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-metal-dim">{t.material}</dt>
                  <dd className="text-right font-mono text-metal-bright">{material}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-metal-dim">{t.finish}</dt>
                  <dd className="text-right font-mono text-metal-bright">{surface}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-metal-dim">{t.grade}</dt>
                  <dd className="text-right font-mono text-metal-bright">{product.grade}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-metal-dim">{t.standard}</dt>
                  <dd className="text-right font-mono text-metal-bright">{product.standard}</dd>
                </div>
              </dl>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#inquiry">{t.ctaQuote}</a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href={`/${locale}/products?series=${product.seriesId}`}>{t.ctaSeries}</Link>
                </Button>
              </div>

              {/* 保障项 */}
              <ul className="mt-8 grid grid-cols-1 gap-2.5 text-sm text-metal-dim sm:grid-cols-3">
                {t.guarantees.map((g) => (
                  <li key={g} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 技术参数 */}
      <section className="border-t border-line bg-surface/40 py-16 md:py-20" aria-label={t.specs.title}>
        <div className="container-main">
          <FadeIn>
            <SectionHeader kicker={t.specs.kicker} title={t.specs.title} />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-10">
            <SpecTable specs={product.specs} locale={locale} />
          </FadeIn>
        </div>
      </section>

      {/* 应用场景 + 资源下载 */}
      <section className="py-16 md:py-20" aria-label={t.apps.title}>
        <div className="container-main grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <FadeIn>
              <SectionHeader kicker={t.apps.kicker} title={t.apps.title} />
            </FadeIn>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {appName.map((app, i) => {
                const Icon = APP_ICONS[i % APP_ICONS.length]
                return (
                  <FadeIn key={app} delay={i * 0.08}>
                    <div className="group h-full rounded-lg border border-line bg-card p-5 transition-colors hover:border-line-strong">
                      <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                      <h3 className="mt-4 font-medium text-metal-bright">{app}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-metal-dim">{seriesDesc}</p>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>

          <div>
            <FadeIn>
              <SectionHeader kicker={t.downloads.kicker} title={t.downloads.title} />
            </FadeIn>
            <FadeIn delay={0.1} className="mt-10">
              <Downloads dict={dict} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 询价表单 */}
      <section
        id="inquiry"
        className="scroll-mt-24 border-t border-line bg-surface/40 py-16 md:py-20"
        aria-label={t.inquiry.title}
      >
        <div className="container-main grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <FadeIn>
            <SectionHeader
              kicker={t.inquiry.kicker}
              title={t.inquiry.title}
              description={format(t.inquiry.desc, { name })}
            />
            <div className="mt-8 space-y-3 font-mono text-sm text-metal-dim">
              <p>
                {t.inquiry.hotlineLabel}
                <span className="ml-4 text-metal-bright">{site.phoneDisplay}</span>
              </p>
              <p>
                {t.inquiry.emailLabel}
                <span className="ml-4 text-metal-bright">{site.email}</span>
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <InquiryForm productName={name} locale={locale} dict={dict} />
          </FadeIn>
        </div>
      </section>

      {/* 相关产品 */}
      <section className="py-16 md:py-20" aria-label={t.related.title}>
        <div className="container-main">
          <FadeIn>
            <SectionHeader kicker={t.related.kicker} title={t.related.title} />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-12">
            <RelatedProducts products={related} locale={locale} dict={dict} />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
