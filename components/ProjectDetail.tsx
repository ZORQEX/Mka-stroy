'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Calendar, Building2, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

interface ProjectDetailProps {
  project: Project
  dict: Dictionary
  locale: Locale
}

export function ProjectDetail({ project, dict, locale }: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{dict.projects?.title || 'Projects'}</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent2/10">
                  <span className="text-6xl font-bold text-text/20">{project.title.charAt(0)}</span>
                </div>
              )}
              {project.status && (
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium ${
                  project.status === 'completed'
                    ? 'bg-green-500/90 text-white'
                    : 'bg-yellow-500/90 text-white'
                }`}>
                  {project.status === 'completed'
                    ? dict.projects?.tabs?.completed || 'Completed'
                    : dict.projects?.tabs?.inProgress || 'In Progress'}
                </div>
              )}
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {project.gallery.slice(0, 4).map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden bg-card cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-text mb-6">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-text-muted">
                <Building2 size={18} className="text-accent" />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Calendar size={18} className="text-accent" />
                <span>{project.year}</span>
              </div>
            </div>

            {project.mapsUrl ? (
              <a
                href={project.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-8 group"
              >
                <MapPin size={18} className="text-accent" />
                <span>{project.location}</span>
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              <div className="flex items-center gap-2 text-text-muted mb-8">
                <MapPin size={18} className="text-accent" />
                <span>{project.location}</span>
              </div>
            )}

            <div className="prose prose-lg max-w-none text-text-muted mb-8">
              <p>{project.description}</p>
            </div>

            <div className="mt-auto pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-text mb-4">
                {dict.contacts?.subtitle || 'Let\'s discuss your project'}
              </h3>
              <Link
                href={`/${locale}#contacts`}
                className="btn btn-primary inline-flex items-center gap-2"
              >
                {dict.hero?.cta?.contact || 'Contact Us'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
