'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Globe } from 'lucide-react'
import Image from 'next/image'
import type { Project } from '@/types/company'

interface ProjectModalProps {
  isOpen: boolean
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ isOpen, project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-bg/80 hover:bg-bg transition-colors"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            <div className="h-64 bg-gradient-to-br from-accent/20 to-accent2/20 relative overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl font-bold text-text/10">
                    {project.title.charAt(0)}
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-card px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {project.category}
              </div>
            </div>

            <div className="p-8">
              <h2 id="modal-title" className="text-3xl font-bold mb-4">{project.title}</h2>
              <p className="text-lg opacity-80 mb-6">{project.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-bg rounded-lg">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs opacity-60 mb-1">Местоположение</div>
                    <div className="font-semibold">{project.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-bg rounded-lg">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Globe size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs opacity-60 mb-1">Страна</div>
                    <div className="font-semibold">{project.country}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-bg rounded-lg">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Calendar size={20} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs opacity-60 mb-1">Год</div>
                    <div className="font-semibold">{project.year}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
