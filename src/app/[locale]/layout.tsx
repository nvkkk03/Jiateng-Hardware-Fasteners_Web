import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { LocaleSync } from '@/components/layout/locale-sync'
import { getDict, isLocale, locales, type Locale } from '@/lib/i18n'
import { site, keywordsZh, keywordsEn } from '@/lib/site'

/** 预渲染两种语言 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  if (!isLocale(locale)) return {}
  const dict = getDict(locale)
  const company = locale === 'en' ? site.nameEn : site.nameZh
  const title = locale === 'en' ? `${company} | ${dict.home.hero.titleA} · ${dict.home.hero.titleB}` : `${company} | 精密紧固件 · 工业级品质`
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${dict.brand.title}` },
    description: dict.seoDescription,
    keywords: locale === 'en' ? keywordsEn : keywordsZh,
    alternates: {
      canonical: `/${locale}`,
      languages: { 'zh-CN': '/zh', en: '/en', 'x-default': '/zh' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      siteName: company,
      title,
      description: dict.seoDescription,
      url: `${site.url}/${locale}`,
    },
    robots: { index: true, follow: true },
  }
}

/** 组织结构化数据（按语言注入） */
function orgJsonLd(locale: Locale) {
  const dict = getDict(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'en' ? site.nameEn : site.nameZh,
    alternateName: 'JIATENG FASTENERS',
    url: `${site.url}/${locale}`,
    description: dict.seoDescription,
    telephone: `+86 ${site.phone}`,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jiangmen',
      addressRegion: 'Guangdong',
      addressCountry: 'CN',
      streetAddress: dict.footer.address,
    },
    certification: site.certifications.map((c) => ({ '@type': 'Certification', name: c })),
  }
}

/** 语言布局：本地化导航 + 页脚 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params
  if (!isLocale(locale)) notFound()
  const dict = getDict(locale)

  return (
    <>
      <LocaleSync locale={locale} />
      <Navbar locale={locale} dict={dict} />
      <main id="main">{children}</main>
      <Footer locale={locale} dict={dict} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd(locale)) }}
      />
    </>
  )
}
