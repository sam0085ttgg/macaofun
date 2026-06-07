'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

const localeLabels: Record<string, string> = {
  'zh-TW': '繁中',
  'en': 'EN',
  'zh-CN': '简中',
}

const locales = ['zh-TW', 'en', 'zh-CN'] as const

export default function Navbar() {
  const t = useTranslations('common')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  // Strip locale prefix from pathname
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/events', label: t('events') },
    { href: '/about', label: t('about') },
  ]

  function switchLocale(next: string) {
    router.push(`/${next}${pathnameWithoutLocale}`)
    setLangOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{ backgroundColor: 'rgba(10,15,46,0.92)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-extrabold"
            style={{ background: 'linear-gradient(135deg, #22d3ee, #6366f1)', color: '#0a0f2e' }}
          >
            M
          </span>
          <span style={{ color: '#ffffff' }}>MaCaoFun</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathnameWithoutLocale === href
            return (
              <Link
                key={href}
                href={`/${locale}${href === '/' ? '' : href}`}
                className="text-sm font-medium transition-colors"
                style={{ color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.55)' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side: lang switcher + mobile menu */}
        <div className="flex items-center gap-3">

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {localeLabels[locale]}
              <svg
                className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div
                className="absolute right-0 mt-1 w-24 rounded-md shadow-xl"
                style={{
                  backgroundColor: '#0f1535',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => switchLocale(l)}
                    className="w-full px-3 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md"
                    style={{
                      color: l === locale ? '#22d3ee' : 'rgba(255,255,255,0.6)',
                      fontWeight: l === locale ? 600 : 400,
                    }}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: 'rgba(255,255,255,0.7)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#0a0f2e', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {navLinks.map(({ href, label }) => {
            const isActive = pathnameWithoutLocale === href
            return (
              <Link
                key={href}
                href={`/${locale}${href === '/' ? '' : href}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium transition-colors"
                style={{ color: isActive ? '#22d3ee' : 'rgba(255,255,255,0.55)' }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
