import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import { ProductCard } from '@/components/products/product-card'
import { getFeaturedProducts } from '@/lib/products'
import type { Dict, Locale } from '@/lib/i18n'

interface FeaturedProductsProps {
  locale: Locale
  dict: Dict
}

/** 精选产品区：跨系列代表型号网格 */
export function FeaturedProducts({ locale, dict }: FeaturedProductsProps) {
  const t = dict.home.featured
  const featured = getFeaturedProducts().slice(0, 8)
  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-28" aria-label={t.title}>
      <div className="container-main">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader kicker={t.kicker} title={t.title} description={t.desc} />
            <Link
              href={`/${locale}/products`}
              className="hidden items-center gap-1.5 font-mono text-xs tracking-widest text-accent hover:text-accent-hover md:flex"
            >
              {t.viewAll}
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {featured.map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 4) * 0.08} className="h-full">
              <ProductCard product={p} locale={locale} dict={dict} priority={i < 4} className="h-full" />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-10 text-center md:hidden">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-accent"
          >
            {t.viewAllMobile} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
