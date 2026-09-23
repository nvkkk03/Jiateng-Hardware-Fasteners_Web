import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ProductsBrowser } from '@/components/products/products-browser'
import { getDict, isLocale, type Locale } from '@/lib/i18n'

interface ProductsPageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return { title: 'Products' }
  const dict = getDict(locale)
  return {
    title: dict.productsPage.metaTitle,
    description: dict.productsPage.metaDesc,
  }
}

/**
 * 产品列表页（纯静态）
 * 注意：export 模式下服务端不可读取 searchParams，
 * ?category= / ?series= 参数改由客户端 ProductsBrowser 内通过 useSearchParams 处理
 */
export default function ProductsPage({ params }: ProductsPageProps) {
  const locale = params.locale as Locale
  if (!isLocale(locale)) return null
  const dict = getDict(locale)

  return (
    <Suspense fallback={null}>
      <ProductsBrowser locale={locale} dict={dict} />
    </Suspense>
  )
}
