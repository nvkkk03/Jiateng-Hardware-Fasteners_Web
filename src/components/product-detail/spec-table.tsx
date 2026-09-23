import type { SpecRow } from '@/types'
import { pick, type Locale } from '@/lib/i18n'

/** 技术参数表（等宽字体，按语言显示双语字段） */
export function SpecTable({ specs, locale }: { specs: SpecRow[]; locale: Locale }) {
  return (
    <dl className="grid gap-x-12 md:grid-cols-2">
      {specs.map((row) => (
        <div key={row.label} className="spec-row">
          <dt>{pick(locale, row.label, row.labelEn)}</dt>
          <dd>{pick(locale, row.value, row.valueEn)}</dd>
        </div>
      ))}
    </dl>
  )
}
