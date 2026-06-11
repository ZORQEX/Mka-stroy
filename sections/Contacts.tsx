'use client'

import { motion } from 'framer-motion'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Contacts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contacts } = companyData

  return (
    <section className="section bg-card" id="contacts">
      <div className="container">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">{dict.contacts.title}</h2>
            <p className="text-lg opacity-70 mb-10">
              {dict.contacts.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <p className="text-sm opacity-60 mb-2">{dict.contacts.address.label}</p>
              <p className="text-lg">
                РК, г. {contacts.address.city}, {contacts.address.district}, {contacts.address.street},<br />
                {contacts.address.building}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <p className="text-sm opacity-60 mb-2">{dict.contacts.phone.label}</p>
                <a
                  href={`tel:${contacts.phone.replace(/\D/g, '')}`}
                  className="text-lg text-accent hover:underline"
                >
                  {contacts.phone}
                </a>
              </div>
              <div>
                <p className="text-sm opacity-60 mb-2">{dict.contacts.email.label}</p>
                <a
                  href={`mailto:${contacts.email}`}
                  className="text-lg text-accent hover:underline"
                >
                  {contacts.email}
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm opacity-60 mb-2">{dict.contacts.schedule.label}</p>
              <p className="text-lg">{contacts.workingHours.weekdays}</p>
              <p className="opacity-70">{contacts.workingHours.weekend}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
