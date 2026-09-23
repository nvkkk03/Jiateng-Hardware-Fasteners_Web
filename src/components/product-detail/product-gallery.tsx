'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import type { Product } from '@/types'
import { pick, type Dict, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  product: Product
  /** 同系列产品图作为画册 */
  gallery: Product[]
  locale: Locale
  dict: Dict
}

/** 产品图库：主图鼠标跟随微倾斜（模拟旋转查看）+ 缩略图切换 */
export function ProductGallery({ product, gallery, locale, dict }: ProductGalleryProps) {
  const images = [product, ...gallery.filter((g) => g.slug !== product.slug)].slice(0, 5)
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  const current = images[active]
  const currentName = pick(locale, current.name, current.nameEn)

  return (
    <div>
      {/* 主图展示板 */}
      <div style={{ perspective: 900 }}>
        <motion.div
          ref={stageRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
          className="product-stage relative aspect-square rounded-xl border border-line-strong shadow-card-hover"
        >
          <Image
            key={current.slug}
            src={current.image}
            alt={currentName}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 560px"
            className="object-contain p-10"
          />
          {/* 提示标签 */}
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[#141414]/85 px-3 py-1 font-mono text-[10px] tracking-widest text-metal-dim backdrop-blur">
            <RotateCw className="h-3 w-3" aria-hidden="true" />
            {dict.detail.galleryHint}
          </span>
        </motion.div>
      </div>

      {/* 缩略图 */}
      <div className="mt-4 grid grid-cols-5 gap-3" role="tablist" aria-label={dict.detail.thumbnailsAria}>
        {images.map((img, i) => (
          <button
            key={img.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={pick(locale, img.name, img.nameEn)}
            onClick={() => setActive(i)}
            className={cn(
              'product-stage relative aspect-square rounded-md border transition-all duration-200',
              i === active ? 'border-accent shadow-accent-glow' : 'border-line opacity-60 hover:opacity-100',
            )}
          >
            <Image src={img.image} alt="" fill sizes="120px" className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  )
}
