'use client'

import { CheckboxGroup } from '@/components/products/checkbox-group'
import { Slider } from '@/components/ui/slider'
import { getFilterOptions, getCategoryCount, type ProductFilter } from '@/lib/products'
import type { Dict, Locale } from '@/lib/i18n'

interface FilterPanelProps {
  draft: ProductFilter
  onChange: (next: ProductFilter) => void
  dict: Dict
  locale: Locale
}

const OPTIONS = getFilterOptions()

/** 筛选面板：分类 / 材质 / 强度等级 / 标准 / 价格区间（桌面侧栏与移动抽屉共用） */
export function FilterPanel({ draft, onChange, dict, locale }: FilterPanelProps) {
  const t = dict.productsPage.filter
  const toggle = (key: 'categories' | 'materials' | 'grades' | 'standards', value: string) => {
    const current = draft[key] ?? []
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onChange({ ...draft, [key]: next })
  }

  const price = draft.price ?? [0, OPTIONS.priceMax]
  const hasActive =
    !!draft.categories?.length ||
    !!draft.materials?.length ||
    !!draft.grades?.length ||
    !!draft.standards?.length ||
    price[0] > 0 ||
    price[1] < OPTIONS.priceMax

  return (
    <div className="space-y-8">
      <CheckboxGroup
        title={t.category}
        options={OPTIONS.categories.map((c) => ({
          value: c.id,
          label: locale === 'en' ? c.nameEn : c.name,
          count: getCategoryCount(c.id),
        }))}
        selected={draft.categories ?? []}
        onToggle={(v) => toggle('categories', v)}
      />

      <CheckboxGroup
        title={t.material}
        options={OPTIONS.materials.map((m) => ({ value: m.key, label: dict.materials[m.key], count: m.count }))}
        selected={draft.materials ?? []}
        onToggle={(v) => toggle('materials', v)}
      />

      <CheckboxGroup
        title={t.grade}
        options={OPTIONS.grades.map((g) => ({ value: g.key, label: g.key, count: g.count }))}
        selected={draft.grades ?? []}
        onToggle={(v) => toggle('grades', v)}
      />

      <CheckboxGroup
        title={t.standard}
        options={OPTIONS.standards.map((s) => ({ value: s.key, label: s.key, count: s.count }))}
        selected={draft.standards ?? []}
        onToggle={(v) => toggle('standards', v)}
      />

      {/* 价格区间 */}
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-metal-bright">{t.price}</h3>
          <span className="font-mono text-xs text-metal-dim">
            ¥ {price[0].toFixed(1)} – {price[1].toFixed(1)}
          </span>
        </div>
        <Slider
          className="mt-4"
          min={0}
          max={OPTIONS.priceMax}
          step={0.5}
          value={price}
          onValueChange={([min, max]) => onChange({ ...draft, price: [min, max] })}
          aria-label={t.price}
        />
        <div className="mt-2 flex justify-between font-mono text-[10px] text-metal-dim/60">
          <span>¥0</span>
          <span>¥{OPTIONS.priceMax}+</span>
        </div>
      </div>

      {hasActive && (
        <button
          type="button"
          onClick={() => onChange({})}
          className="w-full rounded-md border border-line-strong py-2.5 font-mono text-xs tracking-widest text-metal-dim transition-colors hover:border-accent hover:text-accent"
        >
          {t.reset}
        </button>
      )}
    </div>
  )
}
