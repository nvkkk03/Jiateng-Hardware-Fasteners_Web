import { Building2, Car, Cpu, Factory, TrainFront, Wind } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import type { Dict } from '@/lib/i18n'

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Factory,
  Cpu,
  Building2,
  Car,
  TrainFront,
  Wind,
}

/** 应用行业区（文案来自字典） */
export function Industries({ dict }: { dict: Dict }) {
  const t = dict.home.industries
  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-28" aria-label={t.title}>
      <div className="container-main">
        <FadeIn>
          <SectionHeader kicker={t.kicker} title={t.title} description={t.desc} />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((ind, i) => {
            const Icon = ICONS[ind.icon]
            return (
              <FadeIn key={ind.name} delay={(i % 3) * 0.08}>
                <div className="group relative flex items-start gap-5 rounded-lg border border-line bg-card p-6 transition-all duration-300 hover:border-line-strong hover:bg-card-hover">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-metal transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-medium text-metal-bright">{ind.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-metal-dim">{ind.desc}</p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
