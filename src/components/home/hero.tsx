'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, MessageSquareQuote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dict, Locale } from '@/lib/i18n'

interface HeroProps {
  heroImage: string
  locale: Locale
  dict: Dict
}

/** Hero 区：左侧标题 + CTA，右侧产品展示（浮动规格标签 + 旋转刻度环） */
export function Hero({ heroImage, locale, dict }: HeroProps) {
  const reduce = useReducedMotion()
  const t = dict.home.hero

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const item = (r: boolean | null) => ({
    hidden: r ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
  })

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36" aria-label={t.kicker}>
      {/* 网格背景 + 光晕 */}
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/[0.07] blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden="true"
      />

      <div className="container-main relative grid items-center gap-14 pb-20 md:pb-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* 左侧文案 */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item(reduce)} className="section-kicker flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden="true" />
            {t.kicker}
          </motion.p>

          <motion.h1
            variants={item(reduce)}
            className="mt-6 text-display-xl font-semibold leading-[1.08] text-metal-bright"
          >
            {t.titleA}
            <span className="text-accent"> · </span>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #C0C0C0' }}>
              {t.titleB}
            </span>
          </motion.h1>

          <motion.p variants={item(reduce)} className="mt-6 max-w-xl text-base leading-relaxed text-metal-dim md:text-lg">
            {t.desc}
          </motion.p>

          <motion.div variants={item(reduce)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href={`/${locale}/products`}>
                {t.ctaProducts}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/${locale}/contact`}>
                <MessageSquareQuote className="h-4 w-4" />
                {t.ctaQuote}
              </Link>
            </Button>
          </motion.div>

          {/* 技术参数速览 */}
          <motion.ul variants={item(reduce)} className="mt-10 flex flex-wrap gap-2.5">
            {t.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-sm border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-metal-dim"
              >
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 右侧产品展示 */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto w-full max-w-[520px]"
        >
          {/* 旋转刻度环 */}
          <div className="absolute -inset-6 animate-spin-slow md:-inset-10" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(192,192,192,0.14)" strokeWidth="0.3" strokeDasharray="1.5 2.5" />
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i * 6 * Math.PI) / 180
                const long = i % 5 === 0
                const r1 = long ? 44.5 : 46.5
                return (
                  <line
                    key={i}
                    x1={50 + r1 * Math.cos(angle)}
                    y1={50 + r1 * Math.sin(angle)}
                    x2={50 + 48.5 * Math.cos(angle)}
                    y2={50 + 48.5 * Math.sin(angle)}
                    stroke={long ? 'rgba(255,107,0,0.55)' : 'rgba(192,192,192,0.25)'}
                    strokeWidth={long ? 0.5 : 0.3}
                  />
                )
              })}
            </svg>
          </div>

          {/* 产品展示板 */}
          <div className="product-stage relative aspect-square rounded-xl border border-line-strong shadow-card-hover">
            <Image
              src={heroImage}
              alt={t.heroAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-contain p-10"
            />
          </div>

          {/* 浮动规格标签 */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-3 top-8 rounded-md border border-line-strong bg-[#141414]/90 px-4 py-3 shadow-card-hover backdrop-blur md:-right-8"
          >
            <p className="font-mono text-[10px] tracking-widest text-accent">{t.badge1.label}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-metal-bright">{t.badge1.value}</p>
            <p className="mt-0.5 font-mono text-[10px] text-metal-dim">{t.badge1.sub}</p>
          </motion.div>
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="absolute -left-3 bottom-10 rounded-md border border-line-strong bg-[#141414]/90 px-4 py-3 shadow-card-hover backdrop-blur md:-left-8"
          >
            <p className="font-mono text-[10px] tracking-widest text-metal-dim">{t.badge2.label}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-metal-bright">{t.badge2.value}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
