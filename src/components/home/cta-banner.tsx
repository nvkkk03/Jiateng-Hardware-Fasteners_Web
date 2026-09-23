import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/motion/fade-in'
import { site } from '@/lib/site'
import type { Dict, Locale } from '@/lib/i18n'

interface CtaBannerProps {
  locale: Locale
  dict: Dict
}

/** 底部 CTA 横幅 */
export function CtaBanner({ locale, dict }: CtaBannerProps) {
  const t = dict.home.cta
  return (
    <section className="py-20 md:py-28" aria-label={t.kicker}>
      <div className="container-main">
        <FadeIn>
          <div className="grid-bg relative overflow-hidden rounded-xl border border-line-strong bg-card px-6 py-14 text-center shadow-card-hover md:px-16 md:py-20">
            <div
              className="absolute left-1/2 top-0 h-40 w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]"
              aria-hidden="true"
            />
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-display-lg font-semibold text-metal-bright">
              {t.titleA}
              <br className="hidden md:block" />
              {t.titleB}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-metal-dim md:text-base">{t.desc}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href={`/${locale}/contact`}>
                  {t.btn}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${site.phone}`}>
                  <PhoneCall className="h-4 w-4" />
                  {site.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
