'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import { i18n, type Locale, localeNames, localeFlags } from '@/i18n.config'

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: Locale) => {
    setIsOpen(false)

    // Save locale to cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    // Remove current locale from pathname
    const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')

    // Redirect to new locale
    router.push(`/${newLocale}${pathnameWithoutLocale}`)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition-colors border border-border"
        aria-label="Select language"
      >
        <Globe size={18} className="text-accent" />
        <span className="hidden sm:inline text-sm font-medium">
          {localeFlags[currentLocale]} {currentLocale.toUpperCase()}
        </span>
        <span className="sm:hidden text-sm font-medium">
          {localeFlags[currentLocale]}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full px-4 py-3 text-left hover:bg-bg transition-colors flex items-center gap-3 ${
                  locale === currentLocale ? 'bg-accent/10 text-accent' : ''
                }`}
              >
                <span className="text-xl">{localeFlags[locale]}</span>
                <div className="flex-1">
                  <div className="font-medium text-sm">{localeNames[locale]}</div>
                  <div className="text-xs opacity-60">{locale.toUpperCase()}</div>
                </div>
                {locale === currentLocale && (
                  <div className="w-2 h-2 rounded-full bg-accent" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
