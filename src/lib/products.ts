import catalog from '@/data/catalog.json'
import type { Catalog, Category, Product, Series } from '@/types'

const db = catalog as Catalog

/** 全部产品 */
export const allProducts: Product[] = db.products

/** 全部系列 */
export const allSeries: Series[] = db.series

/** 全部分类 */
export const categories: Category[] = db.categories

/** 关键图片（Hero / 分类封面） */
export const keyImages = db.keyImages

/** 按 slug 获取产品 */
export function getProduct(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug)
}

/** 获取系列下的产品 */
export function getSeriesProducts(seriesId: string): Product[] {
  return allProducts.filter((p) => p.seriesId === seriesId)
}

/** 精选产品 */
export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.featured)
}

/**
 * 相关产品推荐：同系列优先，其次同分类
 */
export function getRelatedProducts(product: Product, limit = 8): Product[] {
  const sameSeries = allProducts.filter(
    (p) => p.seriesId === product.seriesId && p.slug !== product.slug,
  )
  const sameCategory = allProducts.filter(
    (p) => p.category === product.category && p.seriesId !== product.seriesId,
  )
  return [...sameSeries, ...sameCategory].slice(0, limit)
}

/** 产品筛选条件 */
export interface ProductFilter {
  categories?: string[]
  materials?: string[]
  grades?: string[]
  standards?: string[]
  /** 价格区间 [min, max]，单位元 */
  price?: [number, number]
  sort?: 'default' | 'price-asc' | 'price-desc'
}

const MATERIAL_KEYS = ['stainless', 'carbon', 'alloy', 'copper', 'nylon', 'aluminum'] as const
const GRADES = ['4.8', '8.8', '10.9', '12.9', 'A2-70'] as const
const STANDARDS = ['DIN', 'ISO', 'ANSI', 'JIS', 'GB', 'PEM', 'ETAG'] as const

/** 可选筛选维度（由数据推导，名称显示由字典按语言提供） */
export function getFilterOptions() {
  return {
    categories,
    materials: MATERIAL_KEYS.map((key) => ({
      key,
      count: allProducts.filter((x) => x.materialKey === key).length,
    })),
    grades: GRADES.map((g) => ({ key: g, count: allProducts.filter((x) => x.grade === g).length })),
    standards: STANDARDS.map((s) => ({ key: s, count: allProducts.filter((x) => x.standard.includes(s)).length })),
    priceMax: 12,
  }
}

/** 应用筛选条件 */
export function filterProducts(filter: ProductFilter): Product[] {
  let list = allProducts
  if (filter.categories?.length) list = list.filter((p) => filter.categories!.includes(p.category))
  if (filter.materials?.length) list = list.filter((p) => filter.materials!.includes(p.materialKey))
  if (filter.grades?.length) list = list.filter((p) => filter.grades!.includes(p.grade))
  if (filter.standards?.length)
    list = list.filter((p) => filter.standards!.some((s) => p.standard.includes(s)))
  if (filter.price) list = list.filter((p) => p.price >= filter.price![0] && p.price <= filter.price![1])
  switch (filter.sort) {
    case 'price-asc':
      return [...list].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...list].sort((a, b) => b.price - a.price)
    default:
      return list
  }
}

/** 分类显示名 */
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

/** 分类下产品数 */
export function getCategoryCount(id: string): number {
  return allProducts.filter((p) => p.category === id).length
}
