'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  /** 延迟秒数 */
  delay?: number
  /** 位移方向：up / down / left / right / none */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** 位移距离 px */
  distance?: number
  className?: string
  once?: boolean
}

/** 滚动渐入容器：元素进入视口时淡入 + 位移 */
export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 28,
  className,
  once = true,
}: FadeInProps) {
  const reduce = useReducedMotion()

  const axis =
    direction === 'up' ? { y: distance } :
    direction === 'down' ? { y: -distance } :
    direction === 'left' ? { x: distance } :
    direction === 'right' ? { x: -distance } :
    {}

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...axis }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  )
}
