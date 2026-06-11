'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { companyData } from '@/constants/company'
import { LanguageSwitcher } from './LanguageSwitcher'
import { DayNightToggle } from './DayNightToggle'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: (dict.nav as any).about || dict.about.title },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/certificates`, label: dict.nav.certificates || 'Сертификаты' },
    { href: `/${locale}/contacts`, label: dict.nav.contacts },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-text"
            >
              {companyData.name}
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Day/Night Toggle */}
            <DayNightToggle />

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Phone CTA */}
            <a
              href={`tel:${companyData.contacts.phone}`}
              className="btn btn-primary"
            >
              <Phone size={18} />
              <span className="hidden lg:inline">{companyData.contacts.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button + Day/Night + Language Switcher */}
          <div className="flex md:hidden items-center gap-2">
            <DayNightToggle />
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-card rounded-lg mb-4 border border-border"
            >
              <div className="p-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-medium hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`tel:${companyData.contacts.phone}`}
                  className="btn btn-primary w-full justify-center"
                >
                  <Phone size={18} />
                  {companyData.contacts.phone}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
