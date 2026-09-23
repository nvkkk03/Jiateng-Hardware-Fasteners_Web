import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { CountUp } from '@/components/motion/count-up'
import { SectionHeader } from '@/components/layout/section-header'
import { CtaBanner } from '@/components/home/cta-banner'
import { WhyUs } from '@/components/home/why-us'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

interface AboutPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return { title: 'About' }
  if (locale === 'en') {
    return {
      title: 'About Us',
      description:
        'Jiangmen Jiateng Hardware Products Co., Ltd. — 16 years of precision fastener manufacturing, 13 series and 197 models, ISO 9001 & IATF 16949 certified.',
      alternates: { canonical: '/en/about', languages: { 'zh-CN': '/zh/about', en: '/en/about' } },
    }
  }
  return {
    title: '关于我们',
    description:
      '江门嘉腾五金——16 年精密紧固件制造，13 大系列 197 种型号，通过 ISO 9001 与 IATF 16949 认证，服务装备制造、电子电器与建筑工程行业。',
    alternates: { canonical: '/zh/about', languages: { 'zh-CN': '/zh/about', en: '/en/about' } },
  }
}

/** 关于我们页（双语） */
export default function AboutPage({ params }: AboutPageProps) {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return null
  const dict = getDict(locale)
  const t = dict.about

  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden pb-16 pt-28 md:pt-36" aria-label={t.kicker}>
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute right-0 top-16 h-80 w-80 rounded-full bg-accent/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div className="container-main relative">
          <FadeIn>
            <p className="section-kicker">{t.kicker}</p>
            <h1 className="mt-4 text-display-lg font-semibold text-metal-bright">
              {t.titleA}
              <span className="text-accent">{t.titleB}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-metal-dim">{t.intro}</p>
          </FadeIn>
        </div>
      </section>

      {/* 数据 */}
      <section className="border-y border-line bg-surface/40" aria-label={dict.home.statsAria}>
        <div className="container-main grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4">
          {dict.home.stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center md:px-6">
                <p className="font-mono text-4xl font-bold text-metal-bright md:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-3 text-sm text-metal">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 发展历程 */}
      <section className="py-20 md:py-28" aria-label={t.milestonesTitle}>
        <div className="container-main">
          <FadeIn>
            <SectionHeader kicker="MILESTONES" title={t.milestonesTitle} />
          </FadeIn>
          <ol className="mt-12 space-y-0">
            {t.milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.06}>
                <li className="group flex items-baseline gap-6 border-b border-line py-6 transition-colors hover:border-accent/40 md:gap-12">
                  <span className="font-mono text-2xl font-bold text-metal-dim/50 transition-colors group-hover:text-accent md:text-3xl">
                    {m.year}
                  </span>
                  <span className="text-sm text-metal md:text-base">{m.text}</span>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* 质量承诺 */}
      <section className="border-t border-line bg-surface/40 py-20 md:py-28" aria-label={t.quality.title}>
        <div className="container-main grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <SectionHeader kicker={t.quality.kicker} title={t.quality.title} description={t.quality.desc} />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ul className="grid grid-cols-2 gap-4">
              {['ISO 9001:2015', 'IATF 16949', 'RoHS', 'SGS'].map((c) => (
                <li key={c} className="flex items-center gap-3 rounded-lg border border-line bg-card px-5 py-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="font-mono text-sm tracking-wide text-metal-bright">{c}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <WhyUs dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  )
}
