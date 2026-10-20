import { Layers, Ruler, ScanSearch, Truck } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import type { Dict } from '@/lib/i18n'

const ADVANTAGE_ICONS = [Layers, Ruler, ScanSearch, Truck]

/** 为什么选择我们：hairline 分隔的清单式优势列表（文案来自字典） */
export function WhyUs({ dict }: { dict: Dict }) {
  const t = dict.home.why
  return (
    <section className="py-20 md:py-28" aria-label={t.title}>
      <div className="container-main">
        <FadeIn>
          <SectionHeader kicker={t.kicker} title={t.title} description={t.desc} />
        </FadeIn>

        <ul className="mt-12 border-b border-line">
          {t.items.map((adv, i) => {
            const Icon = ADVANTAGE_ICONS[i]
            return (
              <FadeIn key={adv.en} delay={i * 0.06}>
                <li className="group grid items-start gap-x-5 gap-y-3 border-t border-line py-7 sm:grid-cols-[auto_1fr] sm:gap-x-8 md:grid-cols-[auto_260px_1fr] md:py-8">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong bg-metal/[0.03] text-metal transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent"
                    aria-hidden="true"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="flex flex-wrap items-baseline gap-x-3 pt-1 text-lg font-semibold text-metal-bright md:pt-0.5">
                    {adv.title}
                    <span className="font-mono text-[11px] font-normal tracking-widest text-metal-dim">
                      {adv.en}
                    </span>
                  </h3>
                  <p className="self-center text-sm leading-relaxed text-metal-dim md:pt-0.5">
                    {adv.desc}
                  </p>
                </li>
              </FadeIn>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
