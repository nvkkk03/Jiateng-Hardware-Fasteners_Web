import { Layers, Ruler, ScanSearch, Truck } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import type { Dict } from '@/lib/i18n'

const ADVANTAGE_ICONS = [Layers, Ruler, ScanSearch, Truck]

/** 为什么选择我们：四列核心优势（文案来自字典） */
export function WhyUs({ dict }: { dict: Dict }) {
  const t = dict.home.why
  return (
    <section className="py-20 md:py-28" aria-label={t.title}>
      <div className="container-main">
        <FadeIn>
          <SectionHeader kicker={t.kicker} title={t.title} description={t.desc} />
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((adv, i) => {
            const Icon = ADVANTAGE_ICONS[i]
            return (
              <FadeIn key={adv.en} delay={i * 0.08} className="h-full">
                <div className="group relative h-full rounded-lg border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-card-hover">
                  <div className="shine-sweep" aria-hidden="true" />
                  {/* 序号 */}
                  <span className="absolute right-5 top-4 font-mono text-xs text-metal-dim/40">
                    0{i + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 flex items-baseline gap-2 text-lg font-semibold text-metal-bright">
                    {adv.title}
                    <span className="font-mono text-[10px] font-normal tracking-widest text-metal-dim/50">
                      {adv.en}
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-metal-dim">{adv.desc}</p>
                  {/* 底部强调线 */}
                  <span
                    className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-accent-line transition-transform duration-500 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
