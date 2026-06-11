'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

const faqIds = ['faq1', 'faq2', 'faq3', 'faq4']

export function FAQ({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const faqItems = faqIds.map(id => ({
    id,
    question: (dict.faq.items as any)?.[id]?.question || '',
    answer: (dict.faq.items as any)?.[id]?.answer || '',
  })).filter(item => item.question && item.answer)

  return (
    <section className="section bg-bg" id="faq">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">{dict.faq.title}</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {dict.faq.subtitle}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQAccordion
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => toggleFAQ(item.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQAccordion({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: any
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="card overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-bg/50"
      >
        <span className="font-semibold text-lg pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-accent"
        >
          <ChevronDown size={24} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-6 pb-6 opacity-80 leading-relaxed border-t border-border pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
