import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { allSeries } from '@/lib/products'
import { site } from '@/lib/site'
import type { Dict, Locale } from '@/lib/i18n'

interface FooterProps {
  locale: Locale
  dict: Dict
}

/** 页脚：真实联系方式 / 地址 / 认证资质 */
export function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear()
  const t = dict.footer
  return (
    <footer className="relative border-t border-line bg-[#070707]" aria-label={t.aria}>
      <div className="container-main py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {/* 联系方式 */}
          <div>
            <Logo locale={locale} dict={dict} className="mb-6" />
            <ul className="space-y-3.5 text-sm text-metal-dim">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`tel:${site.phone}`} className="transition-colors hover:text-metal-bright">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-metal-bright">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{t.address}</span>
              </li>
            </ul>
            <p className="mt-5 font-mono text-xs text-metal-dim/60">{t.hours}</p>
          </div>

          {/* 产品系列导航 */}
          <div>
            <h3 className="section-kicker">PRODUCT SERIES</h3>
            <h4 className="mt-2 text-base font-semibold text-metal-bright">{t.seriesTitle}</h4>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {allSeries.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/products?series=${s.id}`}
                    className="text-sm text-metal-dim transition-colors hover:text-accent"
                  >
                    {locale === 'en' ? s.nameEn : s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 认证资质 */}
          <div>
            <h3 className="section-kicker">CERTIFICATIONS</h3>
            <h4 className="mt-2 text-base font-semibold text-metal-bright">{t.certTitle}</h4>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {site.certifications.map((c) => (
                <li
                  key={c}
                  className="rounded border border-line-strong bg-white/[0.03] px-3.5 py-2 font-mono text-xs tracking-wider text-metal"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-metal-dim">{t.qualityNote}</p>
          </div>
        </div>
      </div>

      {/* 底部版权条 */}
      <div className="border-t border-line">
        <div className="container-main flex flex-col items-center justify-between gap-3 py-5 text-xs text-metal-dim/70 md:flex-row">
          <p>
            © {year} {t.company} {t.copyright}
          </p>
          <p className="font-mono tracking-widest">{t.slogan}</p>
        </div>
      </div>

      {/* 背景水印 */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden text-center text-[18vw] font-bold leading-[0.75] tracking-tight text-white/[0.018]"
      >
        JIATENG
      </div>
    </footer>
  )
}
