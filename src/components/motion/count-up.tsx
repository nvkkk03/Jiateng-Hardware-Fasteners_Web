'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  /** 目标数值 */
  value: number
  suffix?: string
  prefix?: string
  /** 小数位数 */
  decimals?: number
  /** 动画时长（秒） */
  duration?: number
  className?: string
}

/** 数据统计数字滚动动画：进入视口后从 0 滚动到目标值 */
export function CountUp({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value.toFixed(decimals))
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, value, decimals, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
