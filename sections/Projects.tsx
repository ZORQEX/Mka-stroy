'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { companyData } from '@/constants/company'
import type { Project } from '@/types/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Projects({ locale, dict, showAll = false }: { locale: Locale; dict: Dictionary; showAll?: boolean }) {
  const { projects } = companyData
  const visibleProjects = showAll ? projects : projects.slice(0, 8)
  const hasMore = !showAll && projects.length > 8

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
      transition: { duration: 0.4 },
    },
  }


  return (
    <section className="section bg-bg" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-block bg-accent text-white px-4 py-2 font-medium mb-8">
            {dict.projects.tabs?.completed || ''}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={itemVariants} locale={locale} />
          ))}
        </motion.div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href={`/${locale}/projects`}
              className="btn btn-secondary"
            >
              {dict.projects.viewAll || dict.projects.loadMore || ''}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, variants, locale }: { project: Project; variants: any; locale: Locale }) {
  const handleMapClick = (e: React.MouseEvent) => {
    if (project.mapsUrl) {
      e.preventDefault()
      e.stopPropagation()
      window.open(project.mapsUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div variants={variants}>
      <Link href={`/${locale}/projects/${project.id}`} className="block group">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-card">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent2/10">
              <span className="text-4xl font-bold text-text/20">{project.title.charAt(0)}</span>
            </div>
          )}
          <button
            onClick={handleMapClick}
            className={`absolute bottom-3 left-3 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-medium text-gray-800 ${
              project.mapsUrl ? 'hover:bg-accent hover:text-white transition-colors cursor-pointer' : ''
            }`}
            title={project.mapsUrl ? 'Open in Google Maps' : project.location}
          >
            <MapPin size={12} className={project.mapsUrl ? 'group-hover:text-white' : 'text-accent'} />
            {project.location}
          </button>
        </div>
        <h3 className="text-sm font-medium text-center leading-tight group-hover:text-accent transition-colors">
          «{project.title}»
        </h3>
      </Link>
    </motion.div>
  )
}
