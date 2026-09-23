import type { MetadataRoute } from 'next'
import { allProducts, allSeries } from '@/lib/products'
import { site } from '@/lib/site'
import { locales } from '@/lib/i18n'

/** 双语站点地图：静态页 + 分类/系列聚合页 + 全部产品详情页 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const entries: MetadataRoute.Sitemap = []

  const addEntry = (
    path: string,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: number,
  ) => {
    for (const locale of locales) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
      })
    }
  }

  addEntry('', 'weekly', 1)
  addEntry('/products', 'daily', 0.9)
  addEntry('/about', 'monthly', 0.5)
  addEntry('/contact', 'monthly', 0.6)

  for (const c of ['screws', 'bolts', 'nuts', 'washers', 'anchors', 'special']) {
    addEntry(`/products?category=${c}`, 'weekly', 0.7)
  }
  for (const s of allSeries) {
    addEntry(`/products?series=${s.id}`, 'weekly', 0.6)
  }
  for (const p of allProducts) {
    addEntry(`/products/${p.slug}`, 'weekly', 0.6)
  }

  return entries
}
