'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

// Recommendation letters from clients. Drop scans into /public/certificates as
// letter-1.jpg … letter-7.jpg and they appear automatically; until then each
// card shows a styled placeholder (the originals are not published online).
const LETTERS = [
  { id: 1, company: 'ТОО «TORO CONSTRUCTION»', image: '/certificates/letter-1.jpg' },
  { id: 2, company: 'ТОО «TS Стройсервис»', image: '/certificates/letter-2.jpg' },
  { id: 3, company: 'ТОО «Polpan Insulation KZ»', image: '/certificates/letter-3.jpg' },
  { id: 4, company: 'ТОО «TAV Construction»', image: '/certificates/letter-4.jpg' },
  { id: 5, company: 'ТОО «Real Estate & Construction Group»', image: '/certificates/letter-5.jpg' },
  { id: 6, company: 'ТОО «TS Development Shymkent»', image: '/certificates/letter-6.jpg' },
  { id: 7, company: 'АО «АИФН Mega Center Plus»', image: '/certificates/letter-7.jpg' },
]

export function RecommendationLetters({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const l = (dict.letters as any) ?? {}
  const t = (key: string) => l[key] ?? key
  const [modal, setModal] = useState<number | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const markError = (id: number) => setImgErrors((p) => ({ ...p, [id]: true }))
  const selected = LETTERS.find((x) => x.id === modal)

  useEffect(() => {
    if (modal === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null)
      if (e.key === 'ArrowRight') setModal((m) => (m && m < LETTERS.length ? m + 1 : 1))
      if (e.key === 'ArrowLeft') setModal((m) => (m && m > 1 ? m - 1 : LETTERS.length))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modal])

  const Placeholder = ({ company }: { company: string }) => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 bg-bg-alt">
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-2xl">📄</div>
      <span className="text-xs text-text-muted text-center font-medium leading-tight">{company}</span>
    </div>
  )

  return (
    <section id="certificates" className="py-16 sm:py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">{t('title')}</h2>
          <p className="text-text-muted text-sm sm:text-base">{t('hint')}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {LETTERS.map((letter) => (
            <button
              key={letter.id}
              onClick={() => setModal(letter.id)}
              className="group text-left flex flex-col gap-3"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-accent transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden">
                  {imgErrors[letter.id] ? (
                    <Placeholder company={letter.company} />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={letter.image}
                      alt={letter.company}
                      loading="lazy"
                      onError={() => markError(letter.id)}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-black text-xs font-bold px-3 py-1.5 rounded-full">
                    🔍 {t('zoom')}
                  </span>
                </div>
              </div>
              <p className="text-center text-xs sm:text-sm text-text font-medium leading-tight px-1">{letter.company}</p>
            </button>
          ))}
        </div>
      </div>

      {modal !== null && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setModal(null)}>
          <div className="relative max-w-2xl w-full flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => setModal((m) => (m && m > 1 ? m - 1 : LETTERS.length))}
                aria-label="‹"
                className="bg-white/20 hover:bg-white/30 text-white w-11 h-11 min-h-[44px] rounded-full flex items-center justify-center text-2xl transition-colors"
              >
                ‹
              </button>
              <span className="text-white/60 text-sm">{modal} / {LETTERS.length}</span>
              <button
                onClick={() => setModal((m) => (m && m < LETTERS.length ? m + 1 : 1))}
                aria-label="›"
                className="bg-white/20 hover:bg-white/30 text-white w-11 h-11 min-h-[44px] rounded-full flex items-center justify-center text-2xl transition-colors"
              >
                ›
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border-4 border-accent bg-white">
              {imgErrors[selected.id] ? (
                <div className="aspect-[3/4] max-h-[75vh]"><Placeholder company={selected.company} /></div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.image}
                  alt={selected.company}
                  onError={() => markError(selected.id)}
                  className="w-full max-h-[75vh] object-contain bg-white"
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-white font-semibold text-sm sm:text-base">{selected.company}</p>
              <button
                onClick={() => setModal(null)}
                className="flex-shrink-0 bg-white/20 hover:bg-white/30 text-white px-4 py-2 min-h-[44px] rounded-full text-sm font-medium transition-colors"
              >
                {t('close')} ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
