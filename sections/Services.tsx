'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Droplets, Wind, Flame, Thermometer, Zap, Factory, Pipette } from 'lucide-react'
import { ServicesDrawer } from '@/components/ServicesDrawer'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

const iconMap: Record<string, any> = {
  Droplets,
  Wind,
  Flame,
  Thermometer,
  Zap,
  Factory,
  Pipette,
}

const services = [
  { id: 'water-supply', icon: 'Droplets' },
  { id: 'sewage', icon: 'Pipette' },
  { id: 'hvac', icon: 'Wind' },
  { id: 'fire-protection', icon: 'Flame' },
  { id: 'heating', icon: 'Thermometer' },
  { id: 'electrical', icon: 'Zap' },
  { id: 'boiler', icon: 'Factory' },
]

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <>
      <section className="section bg-bg-alt" id="services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">{dict.services.title}</h2>
            <p className="text-text-muted text-lg max-w-3xl mx-auto">
              {dict.about?.experience}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.icon] || Droplets
              const serviceData = (dict.services as any)?.[service.id]

              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-4 group-hover:border-accent/50 group-hover:bg-accent/5 transition-all duration-300">
                    <IconComponent size={36} className="text-accent" />
                  </div>
                  <h3 className="text-text text-sm md:text-base font-medium leading-tight">
                    {serviceData?.title || service.id}
                  </h3>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-primary"
            >
              {dict.services.viewAll}
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      <ServicesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        dict={dict}
      />
    </>
  )
}
