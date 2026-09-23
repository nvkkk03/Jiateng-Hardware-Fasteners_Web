const STANDARDS = ['ISO 9001', 'DIN 912', 'ANSI B18', 'JIS B1180', 'GB/T 70', 'ISO 4762', 'DIN 933', 'ISO 4017', 'RoHS', 'DIN 7504', 'GB/T 5783', 'ETAG 001']

/** 执行标准无缝滚动条 */
export function StandardsMarquee() {
  const list = [...STANDARDS, ...STANDARDS]
  return (
    <div
      className="relative overflow-hidden border-y border-line bg-surface/60 py-4"
      aria-hidden="true"
    >
      {/* 两端渐隐遮罩 */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10">
        {list.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-xs tracking-widest text-metal-dim/70">
            {s}
            <span className="h-1 w-1 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  )
}
