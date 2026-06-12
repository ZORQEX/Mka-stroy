'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { companyData } from '@/constants/company'
import type { Certificate } from '@/types/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Certificates({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const { certificates } = companyData
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)

  const closeLightbox = useCallback(() => {
    setSelectedCert(null)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    if (selectedCert) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [selectedCert, closeLightbox])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  const getDocumentType = (type: Certificate['type']) => {
    const types = {
      recommendation: (dict.certificates as any)?.recommendation || 'Рекомендательное письмо',
      certificate: (dict.certificates as any)?.certificate || 'Сертификат',
    }
    return types[type]
  }

  return (
    <section className="section bg-bg" id="certificates">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group"
            >
              <div
                onClick={() => setSelectedCert(cert)}
                className="cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-card border border-border shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-accent/50 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 z-10 pointer-events-none" />
                  <ImageWithFallback
                    src={cert.image}
                    alt={cert.company}
                    fill
                    className="object-contain p-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <span className="text-sm text-text-muted text-center">{cert.company}</span>
                      </div>
                    }
                  />
                </div>

                <div className="mt-4 text-center">
                  <h3 className="font-medium text-text group-hover:text-accent transition-colors">
                    {cert.company}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-sm text-text-muted">{getDocumentType(cert.type)}</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-sm text-text-muted">{cert.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {(dict.certificates as any)?.note && (
          <p className="mt-8 text-sm text-text-muted text-center max-w-2xl mx-auto">
            {(dict.certificates as any).note}
          </p>
        )}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                aria-label={dict.common?.close || 'Close'}
              >
                <X size={20} className="text-white" />
              </button>

              <div className="relative w-full h-[85vh] bg-neutral-100">
                <ImageWithFallback
                  src={selectedCert.image}
                  alt={selectedCert.company}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <span className="text-lg text-neutral-500 text-center">{selectedCert.company}</span>
                    </div>
                  }
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-semibold text-lg">{selectedCert.company}</h3>
                <p className="text-white/70 text-sm">
                  {getDocumentType(selectedCert.type)} • {selectedCert.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
