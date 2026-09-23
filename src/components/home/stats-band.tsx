import { CountUp } from '@/components/motion/count-up'
import { FadeIn } from '@/components/motion/fade-in'
import type { Dict } from '@/lib/i18n'

/** 数据统计带：数字滚动动画（文案来自字典） */
export function StatsBand({ dict }: { dict: Dict }) {
  return (
    <section className="relative border-y border-line bg-surface/40" aria-label={dict.home.statsAria}>
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-main relative grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-20">
        {dict.home.stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1}>
            <div
              className={`flex flex-col items-center text-center md:px-6 ${
                i > 0 ? 'md:border-l md:border-line' : ''
              }`}
            >
              <p className="font-mono text-4xl font-bold tracking-tight text-metal-bright md:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-3 text-sm text-metal">{s.label}</p>
              <p className="mt-1 font-mono text-[10px] tracking-widest text-metal-dim/50">{s.en}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
