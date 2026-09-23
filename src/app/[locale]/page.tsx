import { Hero } from '@/components/home/hero'
import { StandardsMarquee } from '@/components/home/standards-marquee'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedProducts } from '@/components/home/featured-products'
import { StatsBand } from '@/components/home/stats-band'
import { WhyUs } from '@/components/home/why-us'
import { Industries } from '@/components/home/industries'
import { CtaBanner } from '@/components/home/cta-banner'
import { keyImages } from '@/lib/products'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

interface HomePageProps {
  params: { locale: string }
}

/** 首页（双语） */
export default function HomePage({ params }: HomePageProps) {
  const { locale } = params
  if (!isLocale(locale)) return null
  const dict = getDict(locale as Locale)

  return (
    <>
      <Hero heroImage={keyImages.hero} locale={locale} dict={dict} />
      <StandardsMarquee />
      <CategoryGrid covers={keyImages} locale={locale} dict={dict} />
      <FeaturedProducts locale={locale} dict={dict} />
      <StatsBand dict={dict} />
      <WhyUs dict={dict} />
      <Industries dict={dict} />
      <CtaBanner locale={locale} dict={dict} />
    </>
  )
}
