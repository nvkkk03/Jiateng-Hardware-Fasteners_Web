'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe, Menu, Phone } from 'lucide-react'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { allSeries, categories, getCategoryCount } from '@/lib/products'
import { site } from '@/lib/site'
import { getDict, type Dict, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface NavbarProps {
  locale: Locale
  dict: Dict
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 路由变化时收起菜单
  useEffect(() => {
    setDropdownOpen(false)
    setMobileOpen(false)
  }, [pathname])

  /** 生成切换语言后的链接：/zh/products ↔ /en/products（保留子路径） */
  const switchHref = (() => {
    const target: Locale = locale === 'en' ? 'zh' : 'en'
    const rest = pathname?.split('/').slice(2).join('/') ?? ''
    return `/${target}${rest ? `/${rest}` : ''}`
  })()

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-line bg-background/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-main flex h-16 items-center justify-between md:h-[72px]" aria-label={dict.nav.navAria}>
        {/* 品牌 */}
        <Link href={`/${locale}`} className="focus-visible:outline-none" aria-label={`${dict.brand.title} home`}>
          <Logo locale={locale} dict={dict} />
        </Link>

        {/* 桌面端导航 */}
        <div className="hidden items-center gap-1 md:flex">
          {/* 产品分类下拉 */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              type="button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={() => setDropdownOpen((v) => !v)}
              className={cn(
                'flex h-10 items-center gap-1.5 rounded-md px-4 text-sm transition-colors',
                pathname?.includes('/products')
                  ? 'text-metal-bright'
                  : 'text-metal-dim hover:text-metal-bright',
              )}
            >
              {dict.nav.products}
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-300', dropdownOpen && 'rotate-180')}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="absolute left-1/2 top-full w-[880px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-xl border border-line bg-[#121212]/98 shadow-card-hover backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-px bg-line/60">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/${locale}/products?category=${cat.id}`}
                          className="group bg-[#121212] p-5 transition-colors hover:bg-card-hover"
                        >
                          <div className="flex items-baseline justify-between">
                            <span className="font-medium text-metal-bright group-hover:text-accent">
                              {locale === 'en' ? cat.nameEn : cat.name}
                            </span>
                            <span className="font-mono text-[10px] text-metal-dim/70">
                              {getCategoryCount(cat.id)} {dict.nav.modelsUnit}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-[10px] tracking-widest text-metal-dim/60">{cat.en}</p>
                          <ul className="mt-3 space-y-1.5">
                            {allSeries
                              .filter((s) => s.category === cat.id)
                              .map((s) => (
                                <li key={s.id}>
                                  <Link
                                    href={`/${locale}/products?series=${s.id}`}
                                    className="text-xs text-metal-dim transition-colors hover:text-metal-bright"
                                  >
                                    {locale === 'en' ? s.nameEn : s.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </Link>
                      ))}
                    </div>
                    <div className="flex items-center justify-between bg-[#0E0E0E] px-5 py-3">
                      <span className="font-mono text-[10px] tracking-widest text-metal-dim/70">
                        {dict.nav.allStandards}
                      </span>
                      <Link
                        href={`/${locale}/products`}
                        className="font-mono text-[11px] text-accent hover:text-accent-hover"
                      >
                        {dict.nav.viewAll}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {[
            { href: `/${locale}/about`, label: dict.nav.about },
            { href: `/${locale}/contact`, label: dict.nav.contact },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex h-10 items-center rounded-md px-4 text-sm transition-colors',
                pathname === link.href ? 'text-metal-bright' : 'text-metal-dim hover:text-metal-bright',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* 右侧：语言切换 + 电话 + 询价 CTA + 移动端汉堡 */}
        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            aria-label={dict.nav.langSwitchLabel}
            title={dict.nav.langSwitchLabel}
            className="flex h-9 items-center gap-1.5 rounded-md border border-line px-2.5 font-mono text-xs text-metal-dim transition-colors hover:border-line-strong hover:text-metal-bright"
          >
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            {dict.nav.langSwitchTo}
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="hidden items-center gap-2 font-mono text-xs text-metal-dim transition-colors hover:text-metal-bright xl:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {site.phoneDisplay}
          </a>
          <Button asChild className="hidden md:inline-flex" size="sm">
            <Link href={`/${locale}/contact`}>{dict.nav.inquiry}</Link>
          </Button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label={dict.nav.openMenu}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetTitle className="sr-only">{dict.nav.navAria}</SheetTitle>
              <div className="mb-8 flex items-center justify-between">
                <Logo locale={locale} dict={dict} />
                <Link
                  href={switchHref}
                  className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-metal-dim"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  {dict.nav.langSwitchTo}
                </Link>
              </div>
              <nav className="flex flex-col gap-1" aria-label={dict.nav.mobileNavAria}>
                <MobileGroup locale={locale} dict={dict} onNavigate={() => setMobileOpen(false)} />
              </nav>
              <div className="mt-auto space-y-3 border-t border-line pt-5">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-2 font-mono text-sm text-metal-dim"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {site.phoneDisplay}
                </a>
                <Button asChild className="w-full">
                  <Link href={`/${locale}/contact`}>{dict.nav.inquiry}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

/** 移动端菜单内容：产品分类折叠 + 页面链接 */
function MobileGroup({
  locale,
  dict,
  onNavigate,
}: {
  locale: Locale
  dict: Dict
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex h-12 items-center justify-between rounded-md px-3 text-[15px] text-metal-bright hover:bg-white/5"
      >
        {dict.nav.products}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            {allSeries.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/${locale}/products?series=${s.id}`}
                  onClick={onNavigate}
                  className="flex h-10 items-center justify-between rounded-md pl-6 pr-3 text-sm text-metal-dim hover:bg-white/5 hover:text-metal-bright"
                >
                  {locale === 'en' ? s.nameEn : s.name}
                  <span className="font-mono text-[10px] text-metal-dim/60">{s.count}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <Link
        href={`/${locale}/about`}
        onClick={onNavigate}
        className="flex h-12 items-center rounded-md px-3 text-[15px] text-metal-bright hover:bg-white/5"
      >
        {dict.nav.about}
      </Link>
      <Link
        href={`/${locale}/contact`}
        onClick={onNavigate}
        className="flex h-12 items-center rounded-md px-3 text-[15px] text-metal-bright hover:bg-white/5"
      >
        {dict.nav.contact}
      </Link>
    </>
  )
}
