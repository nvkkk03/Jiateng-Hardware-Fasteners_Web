import type { Metadata } from 'next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { FadeIn } from '@/components/motion/fade-in'
import { SectionHeader } from '@/components/layout/section-header'
import { InquiryForm } from '@/components/product-detail/inquiry-form'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

interface ContactPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return { title: 'Contact' }
  if (locale === 'en') {
    return {
      title: 'Contact Us',
      description:
        'Contact Jiateng Hardware: phone +86 138 2234 8696, email 823744500@qq.com. Product inquiries answered within 24 hours. Factory: Jiangmen, Guangdong, China.',
      alternates: { canonical: '/en/contact', languages: { 'zh-CN': '/zh/contact', en: '/en/contact' } },
    }
  }
  return {
    title: '联系我们',
    description:
      '联系江门嘉腾五金：电话 13822348696，邮箱 823744500@qq.com，地址 江门市西区工业路36号自编二栋C1区首层。产品询价 24 小时内回复。',
    alternates: { canonical: '/zh/contact', languages: { 'zh-CN': '/zh/contact', en: '/en/contact' } },
  }
}

const CHANNEL_ICONS = { phone: Phone, mail: Mail, mapPin: MapPin, clock: Clock } as const

/** 联系我们页（双语） */
export default function ContactPage({ params }: ContactPageProps) {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return null
  const dict = getDict(locale)
  const t = dict.contact

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-28 md:pt-36" aria-label={t.title}>
        <div className="grid-bg absolute inset-0" aria-hidden="true" />
        <div
          className="absolute left-1/2 top-10 h-72 w-[520px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div className="container-main relative">
          <FadeIn>
            <p className="section-kicker">CONTACT US</p>
            <h1 className="mt-4 text-display-lg font-semibold text-metal-bright">{t.title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-metal-dim md:text-base">{t.desc}</p>
          </FadeIn>
        </div>
      </section>

      <section className="container-main pb-24" aria-label={t.formTitle}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr]">
          {/* 联系渠道 */}
          <FadeIn direction="right">
            <div className="space-y-4">
              {t.channels.map((ch) => {
                const Icon = CHANNEL_ICONS[ch.icon]
                const inner = (
                  <div className="group flex items-start gap-4 rounded-lg border border-line bg-card p-5 transition-all duration-300 hover:border-line-strong hover:bg-card-hover">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white/[0.03] text-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] tracking-widest text-metal-dim/60">{ch.label}</p>
                      <p className="mt-1 break-all font-medium text-metal-bright">{ch.value}</p>
                      <p className="mt-1 text-xs text-metal-dim">{ch.sub}</p>
                    </div>
                  </div>
                )
                return ch.href ? (
                  <a key={ch.label} href={ch.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={ch.label}>{inner}</div>
                )
              })}
            </div>
          </FadeIn>

          {/* 询价表单 */}
          <FadeIn direction="left" delay={0.1}>
            <div>
              <SectionHeader kicker={t.formKicker} title={t.formTitle} className="mb-8" />
              <InquiryForm productName={dict.contact.formTitle} locale={locale} dict={dict} />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
