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

/** 应用行业区：紧凑两列清单（与产品卡片形成版式对比） */
export function Industries({ dict }: { dict: Dict }) {
  const t = dict.home.industries
  return (
    <section className="border-t border-line bg-surface/40 py-20 md:py-28" aria-label={t.title}>
      <div className="container-main">
        <FadeIn>
          <SectionHeader kicker={t.kicker} title={t.title} description={t.desc} />
        </FadeIn>

        <ul className="mt-12 grid gap-x-14 sm:grid-cols-2">
          {t.items.map((ind, i) => {
            const Icon = ICONS[ind.icon]
            return (
              <FadeIn key={ind.name} delay={(i % 2) * 0.06}>
                <li className="group flex items-start gap-4 border-t border-line py-5">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-metal-dim transition-colors duration-300 group-hover:text-accent"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-[15px] font-medium text-metal-bright">{ind.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-metal-dim">{ind.desc}</p>
                  </div>
                </li>
              </FadeIn>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
