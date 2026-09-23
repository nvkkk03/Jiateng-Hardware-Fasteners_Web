/** 产品分类标识（5 大品类 + 特种紧固件） */
export type CategoryId = 'screws' | 'bolts' | 'nuts' | 'washers' | 'anchors' | 'special'

export interface SpecRow {
  /** 参数名（中文），如「螺纹规格」 */
  label: string
  labelEn: string
  /** 参数值（中文），如「M2 – M24」 */
  value: string
  valueEn: string
}

export interface Product {
  /** 产品 SKU，如 JT-S01-001 */
  id: string
  /** URL 标识，如 s01-001 */
  slug: string
  /** 产品名称（中文） */
  name: string
  /** 产品名称（英文） */
  nameEn: string
  /** 所属系列 ID */
  seriesId: string
  seriesName: string
  seriesNameEn: string
  category: CategoryId
  /** 图片路径（public 相对路径） */
  image: string
  material: string
  materialEn: string
  materialKey: 'stainless' | 'carbon' | 'alloy' | 'copper' | 'nylon' | 'aluminum'
  surface: string
  surfaceEn: string
  grade: string
  standard: string
  specs: SpecRow[]
  /** 参考单价（元/件） */
  price: number
  /** 是否精选产品 */
  featured: boolean
}

export interface Series {
  id: string
  slug: string
  name: string
  nameEn: string
  en: string
  category: CategoryId
  desc: string
  descEn: string
  count: number
  cover: string
  standards: string[]
  standardsEn: string[]
  apps: string[]
  appsEn: string[]
}

export interface Category {
  id: CategoryId
  name: string
  nameEn: string
  /** 大写英文码（装饰用） */
  en: string
}

export interface Catalog {
  generatedAt: string
  keyImages: Record<string, string>
  categories: Category[]
  series: Series[]
  products: Product[]
}
