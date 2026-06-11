'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Droplets, Zap, Thermometer, Pipette, Wind, Flame, Shield, Bell } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'

interface ServicesDrawerProps {
  isOpen: boolean
  onClose: () => void
  dict: Dictionary
}

const servicesList = [
  { icon: Droplets, key: 'coldHotWater' },
  { icon: Zap, key: 'electrical' },
  { icon: Thermometer, key: 'heating' },
  { icon: Pipette, key: 'plumbing' },
  { icon: Wind, key: 'ventilation' },
  { icon: Flame, key: 'fireSuppression' },
  { icon: Shield, key: 'control' },
  { icon: Bell, key: 'signaling' },
]

export function ServicesDrawer({ isOpen, onClose, dict }: ServicesDrawerProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEscape])

  const drawerContent = (dict.services as any)?.drawer || {}

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-xl bg-card shadow-2xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-text">
                {drawerContent.title || 'Наши решения'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-bg transition-colors"
                aria-label={dict.common?.close || 'Close'}
              >
                <X size={24} className="text-text" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="prose prose-sm max-w-none text-text-muted leading-relaxed space-y-4">
                <p>{drawerContent.intro || 'Компания ТОО «TIM STROY» предлагает огромный спектр услуг монтажных работ в жилых, производственных и офисных помещениях.'}</p>
                <p>{drawerContent.supply || 'Также наша компания занимается комплексной поставкой оборудования для систем отопления, водоснабжения, канализации, вентиляции и кондиционирования напрямую от наших партнеров — известных заводов-производителей.'}</p>
                <p>{drawerContent.services || 'ТОО «TIM STROY» оказывает комплекс услуг по проведению монтажных и пусконаладочных работ внутренних и наружных инженерных сетей зданий и целых промышленных или жилых комплексов, придерживаясь национальных и международных стандартов.'}</p>
                <p>{drawerContent.scope || 'Сфера деятельности компании охватывает все направления, связанные с инженерными сетями зданий и сооружений, включая строительство, капитальный ремонт и реконструкцию.'}</p>
                <p>{drawerContent.design || 'По вашему запросу мы можем произвести разработку проектной и рабочей документации.'}</p>
                <p>{drawerContent.quality || 'ТОО «TIM STROY» обеспечит высокое качество выполнения работ в оптимальные сроки и в рамках подходящего бюджета.'}</p>
                <p className="font-medium text-text">{drawerContent.welcome || 'Будем рады видеть Вас в числе наших заказчиков и партнеров!'}</p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-text mb-4">
                  {drawerContent.servicesTitle || 'Направления работ'}
                </h3>
                <ul className="space-y-3">
                  {servicesList.map((service, index) => {
                    const Icon = service.icon
                    const serviceText = drawerContent.list?.[service.key] || getDefaultServiceText(service.key)
                    return (
                      <motion.li
                        key={service.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-bg hover:bg-accent/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={20} className="text-accent" />
                        </div>
                        <span className="text-text">{serviceText}</span>
                      </motion.li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function getDefaultServiceText(key: string): string {
  const defaults: Record<string, string> = {
    coldHotWater: 'Сети холодного и горячего водоснабжения',
    electrical: 'Сети электроснабжения',
    heating: 'Теплоснабжение',
    plumbing: 'Устройство внутренних систем водопровода, отопления и канализации',
    sewage: 'Централизованная канализация бытовых, производственных и ливневых стоков',
    ventilation: 'Вентиляция и кондиционирование',
    fireSuppression: 'Автоматическое пожаротушение',
    control: 'Контроль и сигнализация',
    signaling: 'Контроль и сигнализация',
  }
  return defaults[key] || key
}
