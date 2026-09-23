import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types'
import { pick, type Dict, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  locale: Locale
  dict: Dict
  /** 优先加载（首屏前几张） */
  priority?: boolean
  className?: string
}

/** 产品卡片：浅色展示板 + hover 抬升与金属光泽扫过 */
export function ProductCard({ product, locale, dict, priority = false, className }: ProductCardProps) {
  const name = pick(locale, product.name, product.nameEn)
  const material = pick(locale, product.material, product.materialEn)
  const seriesName = pick(locale, product.seriesName, product.seriesNameEn)
  const priceSuffix = locale === 'en' ? '/pc · CNY' : '/件 起'
  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border border-line bg-card shadow-card transition-all duration-300',
        'hover:-translate-y-1.5 hover:border-line-strong hover:shadow-card-hover focus-visible:outline-none',
        className,
      )}
      aria-label={`${name}, ${material}`}
    >
      {/* 金属光泽扫过层 */}
      <div className="shine-sweep z-10 rounded-lg" aria-hidden="true" />

      {/* 产品展示板 */}
      <div className="product-stage aspect-[4/3]">
        <Image
          src={product.image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </div>

      {/* 信息区 */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Badge>{seriesName}</Badge>
          <span className="font-mono text-[10px] text-metal-dim/60">{product.id}</span>
        </div>

        <h3 className="text-[15px] font-medium leading-snug text-metal-bright transition-colors group-hover:text-accent">
          {name}
        </h3>

        {/* 关键参数（等宽字体） */}
        <div className="mt-auto space-y-1.5 border-t border-line pt-3 font-mono text-[11px] text-metal-dim">
          <div className="flex justify-between">
            <span>{locale === 'en' ? 'Material' : '材质'}</span>
            <span className="text-right text-metal">{material}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="shrink-0">{locale === 'en' ? 'Grade · Std' : '等级/标准'}</span>
            <span className="text-right text-metal">
              {product.grade !== '—' ? `${product.grade} · ` : ''}
              {product.standard}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm">
            <span className="font-mono text-metal-dim/70">¥ </span>
            <span className="font-mono text-base font-semibold text-metal-bright">
              {product.price.toFixed(2)}
            </span>
            <span className="ml-1 text-xs text-metal-dim/70">{priceSuffix}</span>
          </p>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-metal-dim transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
