'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { format, type Dict, type Locale } from '@/lib/i18n'

interface InquiryFormProps {
  /** 询价产品名称（自动带入） */
  productName: string
  locale: Locale
  dict: Dict
}

/** 询价表单：数量 + 联系方式 + 特殊要求（文案来自字典） */
export function InquiryForm({ productName, locale, dict }: InquiryFormProps) {
  const t = dict.detail.inquiry
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    // 演示环境：模拟提交延迟；接入后端时替换为 API 调用
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-line bg-card p-6 shadow-card md:p-8">
      <div className="shine-sweep" aria-hidden="true" />
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[320px] flex-col items-center justify-center text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-accent" aria-hidden="true" />
            <h3 className="mt-5 text-xl font-semibold text-metal-bright">{t.successTitle}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-metal-dim">{t.successDesc}</p>
            <Button variant="outline" className="mt-7" onClick={() => setSubmitted(false)}>
              {t.successAgain}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            {/* 数量 */}
            <div className="space-y-2">
              <Label htmlFor="qty">
                {t.qty}
                <span className="ml-1 text-accent">*</span>
              </Label>
              <Input
                id="qty"
                name="qty"
                type="number"
                min={1}
                step={100}
                defaultValue={1000}
                required
                placeholder={t.qtyPlaceholder}
                className="font-mono"
              />
            </div>
            {/* 联系人 */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t.name}
                <span className="ml-1 text-accent">*</span>
              </Label>
              <Input id="name" name="name" required placeholder={t.namePlaceholder} />
            </div>
            {/* 联系方式 */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact">
                {t.contact}
                <span className="ml-1 text-accent">*</span>
              </Label>
              <Input id="contact" name="contact" required placeholder={t.contactPlaceholder} />
            </div>
            {/* 特殊要求 */}
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="message">{t.message}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder={format(t.messagePlaceholder, { name: productName })}
                rows={4}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                {submitting ? (
                  t.submitting
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t.submit}
                  </>
                )}
              </Button>
              <p className="mt-3 text-xs text-metal-dim/60">{t.privacy}</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
