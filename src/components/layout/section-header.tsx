import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  kicker: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

/** 区块标题组：EN 小标 + 中文大标题 + 描述 */
export function SectionHeader({ kicker, title, description, align = 'left', className }: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      <p className={cn('section-kicker', center && 'flex items-center justify-center gap-3')}>
        {center && <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />}
        {kicker}
        {center && <span className="inline-block h-px w-8 bg-accent" aria-hidden="true" />}
      </p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="mt-4 text-sm leading-relaxed text-metal-dim md:text-base">{description}</p>}
    </div>
  )
}
