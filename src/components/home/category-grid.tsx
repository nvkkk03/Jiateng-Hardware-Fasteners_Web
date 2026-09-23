import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Anchor, CircleDot, Cog, Cylinder, Disc3, Hexagon } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import { categories, getCategoryCount } from '@/lib/products'
import type { CategoryId } from '@/types'
import type { Dict, Locale } from '@/lib/i18n'

/** 分类图标映射 */
const CATEGORY_ICONS: Record<CategoryId, React.ComponentType<{ className?: string }>> = {
  screws: Hexagon,
  bolts: Cylinder,
  nuts: CircleDot,
  washers: Disc3,
  anchors: Anchor,
  special: Cog,
}

interface CategoryGridProps {
  covers: Record<string, string>
  locale: Locale
  dict: Dict
}

/** 产品分类区：六大品类卡片网格 */
export function CategoryGrid({ covers, locale, dict }: CategoryGridProps) {
  const t = dict.home.categories
  return (
    <section className="py-20 md:py-28" aria-label={t.aria}>
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat.id]
            const count = getCategoryCount(cat.id)
            return (
              <FadeIn key={cat.id} delay={i * 0.07}>
                <Link
                  href={`/${locale}/products?category=${cat.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover"
                >
                  <div className="shine-sweep" aria-hidden="true" />
                  {/* 封面小图 */}
                  {covers[cat.id] && <CategoryCover src={covers[cat.id]} />}
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-accent transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent-dim">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 text-metal-dim/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-metal-bright transition-colors group-hover:text-accent">
                    {locale === 'en' ? cat.nameEn : cat.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-widest text-metal-dim/60">
                    {cat.en} · {count} {t.modelsUnit.toUpperCase()}
                  </p>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** 分类封面缩略图（该分类代表产品图） */
function CategoryCover({ src }: { src: string }) {
  return (
    <div
      className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rotate-6 rounded-lg opacity-[0.13] transition-all duration-500 group-hover:rotate-3 group-hover:opacity-25"
      aria-hidden="true"
    >
      <div className="product-stage h-full w-full rounded-lg">
        <Image src={src} alt="" fill sizes="128px" className="object-contain p-2" />
      </div>
    </div>
  )
}
