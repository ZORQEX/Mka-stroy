'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Link from 'next/link'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { name, stats, tagline } = companyData

  return (
    <section className="relative min-h-screen flex flex-col justify-start lg:justify-center bg-bg overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container relative z-10 pt-28 pb-20 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="badge">{dict.hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-text-muted mb-8 max-w-xl"
            >
              {tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base lg:text-lg text-text-muted mb-10 max-w-lg leading-relaxed"
            >
              {dict.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href={`/${locale}/projects`} className="btn btn-primary w-full sm:w-auto min-h-[48px]">
                {dict.hero.cta.projects}
                <ArrowRight size={18} />
              </Link>
              <Link href={`/${locale}#contacts`} className="btn btn-secondary w-full sm:w-auto min-h-[48px]">
                {dict.hero.cta.contact}
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { value: stats.currentProjects, label: dict.hero.stats.currentProjects },
                  { value: stats.projectsCompleted, label: dict.hero.stats.completed },
                  { value: stats.trustedCompanies, label: dict.hero.stats.clients },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-2.5 sm:p-5 text-center"
                  >
                    <div className="stat-number text-2xl sm:text-3xl lg:text-4xl mb-1">{stat.value}</div>
                    <div className="stat-label text-[0.6rem] sm:text-xs leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 p-5 bg-accent/5 border border-accent/20 rounded-2xl"
              >
                <p className="text-sm text-text-muted leading-relaxed">
                  {dict.hero.experience}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link
          href={`/${locale}/about`}
          className="flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
        >
          <span className="text-xs uppercase tracking-wider">{dict.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
