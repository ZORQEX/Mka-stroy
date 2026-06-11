'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Search, PenTool, Wrench, CheckCircle } from 'lucide-react'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

const stepIcons = [FileText, Search, PenTool, Wrench, CheckCircle]

export function Process({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { process } = companyData
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  const processTranslations = (dict.process as any)?.steps || {}

  return (
    <section className="section bg-card" id="process">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">{dict.process.title}</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {dict.process.subtitle}
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div ref={containerRef} className="hidden lg:block relative">
          {/* Progress line */}
          <div className="absolute top-[60px] left-0 right-0 h-1 bg-border">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-accent via-accent2 to-accent"
            />
          </div>

          <div className="grid grid-cols-5 gap-6">
            {process.map((step, index) => {
              const Icon = stepIcons[index] || CheckCircle
              const stepData = processTranslations[`step${step.number}`] || {}

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.2, type: 'spring' }}
                    className="relative z-10 w-[120px] h-[120px] rounded-full bg-bg border-4 border-accent flex items-center justify-center mb-6 shadow-lg"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shadow-md">
                      {step.number}
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-text mb-2">
                      {stepData.title || step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {stepData.description || step.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-border">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full bg-gradient-to-b from-accent via-accent2 to-accent"
            />
          </div>

          <div className="space-y-8">
            {process.map((step, index) => {
              const Icon = stepIcons[index] || CheckCircle
              const stepData = processTranslations[`step${step.number}`] || {}

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex gap-6 items-start"
                >
                  {/* Step circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-bg border-2 border-accent flex items-center justify-center shadow-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center">
                        <Icon size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent text-white text-xs font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-lg font-semibold text-text">
                        {stepData.title || step.title}
                      </h3>
                    </div>
                    <p className="text-text-muted leading-relaxed">
                      {stepData.description || step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
