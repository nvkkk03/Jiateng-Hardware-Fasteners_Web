import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Dict } from '@/lib/i18n'

/** 品牌标识：真实 Logo 图片 + 品牌文字 */
export function Logo({ locale, dict, className }: { locale: string; dict: Dict; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <Image
        src="/logo.png"
        alt={`${dict.brand.title} logo`}
        width={34}
        height={30}
        priority
        className="h-[30px] w-auto"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-wide text-metal-bright">{dict.brand.title}</span>
        <span className="mt-1 font-mono text-[9px] tracking-[0.28em] text-metal-dim">{dict.brand.sub}</span>
      </span>
    </span>
  )
}
