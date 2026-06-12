'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

// Descriptive license/certificate cards. When real scans are available, set
// `image` to a path under /public/certificates and it renders the photo instead.
const CERTIFICATES = [
  { id: 1, icon: '🏗️', color: '#3B82F6', nameKey: 'cert1_name', issuerKey: 'cert1_issuer', yearKey: 'cert1_year', image: null as string | null },
  { id: 2, icon: '🔥', color: '#EF4444', nameKey: 'cert2_name', issuerKey: 'cert2_issuer', yearKey: 'cert2_year', image: null as string | null },
  { id: 3, icon: '💧', color: '#06B6D4', nameKey: 'cert3_name', issuerKey: 'cert3_issuer', yearKey: 'cert3_year', image: null as string | null },
  { id: 4, icon: '⚡', color: '#F59E0B', nameKey: 'cert4_name', issuerKey: 'cert4_issuer', yearKey: 'cert4_year', image: null as string | null },
  { id: 5, icon: '♻️', color: '#10B981', nameKey: 'cert5_name', issuerKey: 'cert5_issuer', yearKey: 'cert5_year', image: null as string | null },
  { id: 6, icon: '🛡️', color: '#8B5CF6', nameKey: 'cert6_name', issuerKey: 'cert6_issuer', yearKey: 'cert6_year', image: null as string | null },
]

type Cert = typeof CERTIFICATES[number]

export function Certificates({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const c = (dict.certificates as any) ?? {}
  const t = (key: string) => c[key] ?? key
  const [modal, setModal] = useState<Cert | null>(null)

  useEffect(() => {
    if (!modal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modal])

  return (
    <section id="certificates" className="py-16 sm:py-20 bg-bg-alt">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setModal(cert)}
              className="group text-left bg-card rounded-2xl border border-border hover:border-accent/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {cert.image ? (
                <div className="relative h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cert.image} alt={t(cert.nameKey)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              ) : (
                <div className="relative h-48 flex flex-col items-center justify-center gap-3" style={{ background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}30)` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md" style={{ background: `${cert.color}20`, border: `2px solid ${cert.color}40` }}>
                    {cert.icon}
                  </div>
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full text-white" style={{ background: cert.color }}>
                    {t('cert_badge')}
                  </span>
                </div>
              )}

              <div className="p-5">
                <h3 className="font-bold text-text text-base leading-tight mb-2">{t(cert.nameKey)}</h3>
                <p className="text-text-muted text-sm mb-1">{t(cert.issuerKey)}</p>
                <p className="text-sm font-medium" style={{ color: cert.color }}>{t(cert.yearKey)}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-text-muted group-hover:text-accent transition-colors">
                  <span>🔍</span>
                  <span>{t('view_detail')}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-muted bg-card border border-border rounded-xl px-5 py-4">
          📎 {t('note')}
        </p>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-card rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {modal.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={modal.image} alt={t(modal.nameKey)} className="w-full max-h-[60vh] object-contain" />
            ) : (
              <div className="h-52 flex flex-col items-center justify-center gap-4" style={{ background: `linear-gradient(135deg, ${modal.color}20, ${modal.color}40)` }}>
                <div className="text-6xl">{modal.icon}</div>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: modal.color }}>
                  {t('cert_badge')}
                </span>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-bold text-text text-lg leading-tight">{t(modal.nameKey)}</h3>
                <button
                  onClick={() => setModal(null)}
                  aria-label={dict.common?.close || 'Close'}
                  className="text-text-muted hover:text-text text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-bg rounded-xl p-3">
                  <span className="text-lg">🏢</span>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">{t('issuer_label')}</p>
                    <p className="text-sm font-medium text-text">{t(modal.issuerKey)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-bg rounded-xl p-3">
                  <span className="text-lg">📅</span>
                  <div>
                    <p className="text-xs text-text-muted mb-0.5">{t('year_label')}</p>
                    <p className="text-sm font-medium text-text">{t(modal.yearKey)}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-text-muted">{t('contact_for_cert')}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
