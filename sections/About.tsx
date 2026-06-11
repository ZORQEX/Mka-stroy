'use client'

import { motion } from 'framer-motion'
import type { Dictionary } from '@/lib/i18n'

export function About({ dict }: { dict: Dictionary }) {
  return (
    <section className="section bg-card" id="about">
      <div className="container">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              {dict.about?.title}
            </h2>
            <p className="text-lg leading-relaxed opacity-90">
              {dict.about?.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
