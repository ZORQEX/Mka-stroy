'use client'

import { motion } from 'framer-motion'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

const clients = [
  'Coca-Cola',
  'MEGA',
  'Hilton',
  "McDonald's",
  'ZARA',
  'Аэропорт Алматы',
  'Аэропорт Туркестан',
  'NEF UPTOWN',
]

export function Clients({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section bg-bg-alt" id="clients">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="mb-3">{(dict as any).clients?.title ?? 'Нам доверяют'}</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            {(dict as any).clients?.subtitle ?? 'Мы реализовали инженерные системы для ведущих международных компаний и объектов'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-3 rounded-xl bg-card border border-border text-text font-semibold text-sm sm:text-base hover:border-accent hover:text-accent transition-colors"
            >
              {client}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
