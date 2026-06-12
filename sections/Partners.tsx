'use client'

import { motion } from 'framer-motion'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

const PARTNERS = [
  { id: 1, name: 'ТОО «TORO CONSTRUCTION»', icon: '🏗️', color: '#3B82F6', projectKey: 'partner1_project' },
  { id: 2, name: 'ТОО «TS Стройсервис»', icon: '⚙️', color: '#F59E0B', projectKey: 'partner2_project' },
  { id: 3, name: 'ТОО «Polpan Insulation KZ»', icon: '🏭', color: '#10B981', projectKey: 'partner3_project' },
  { id: 4, name: 'ТОО «TAV Construction»', icon: '✈️', color: '#6366F1', projectKey: 'partner4_project' },
  { id: 5, name: 'ТОО «Real Estate & Construction Group»', icon: '🏢', color: '#EC4899', projectKey: 'partner5_project' },
  { id: 6, name: 'ТОО «TS Development Shymkent»', icon: '🌆', color: '#F97316', projectKey: 'partner6_project' },
  { id: 7, name: 'АО «АИФН Mega Center Plus»', icon: '🛍️', color: '#8B5CF6', projectKey: 'partner7_project' },
]

export function Partners({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const p = (dict.partners as any) ?? {}
  const t = (key: string) => p[key] ?? key

  return (
    <section id="partners" className="py-16 sm:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">{t('title')}</h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${partner.color}18`, border: `1.5px solid ${partner.color}30` }}
                >
                  {partner.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-text text-sm leading-tight mb-2">{partner.name}</h3>
                  <p className="text-text-muted text-xs leading-relaxed">{t(partner.projectKey)}</p>
                </div>
              </div>
              <div
                className="mt-4 h-1 rounded-full opacity-40"
                style={{ background: `linear-gradient(90deg, ${partner.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 items-center">
          <span className="text-text-muted text-sm">{t('trust_label')}</span>
          <span className="text-2xl font-bold text-text">{companyData.stats.trustedCompanies}</span>
          <span className="text-text-muted text-sm">{t('trust_suffix')}</span>
        </div>
      </div>
    </section>
  )
}
