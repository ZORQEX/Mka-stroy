'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Award, Target, CheckCircle, Globe } from 'lucide-react'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

interface AboutContentProps {
  dict: Dictionary
  locale: Locale
}

export function AboutContent({ dict, locale }: AboutContentProps) {
  const { stats } = companyData
  const aboutPage = (dict.about as any)?.page || {}

  const features = [
    {
      icon: Building2,
      title: aboutPage.features?.experience?.title || 'Years of Experience',
      description: aboutPage.features?.experience?.description || 'More than 10 years in engineering construction',
    },
    {
      icon: Users,
      title: aboutPage.features?.team?.title || 'Expert Team',
      description: aboutPage.features?.team?.description || 'Highly qualified engineers and specialists',
    },
    {
      icon: Award,
      title: aboutPage.features?.quality?.title || 'Quality Standards',
      description: aboutPage.features?.quality?.description || 'Compliance with international standards',
    },
    {
      icon: Globe,
      title: aboutPage.features?.geography?.title || 'Wide Geography',
      description: aboutPage.features?.geography?.description || 'Projects in Kazakhstan and CIS countries',
    },
  ]

  const values = [
    aboutPage.values?.quality || 'Quality and reliability in every project',
    aboutPage.values?.innovation || 'Innovation and modern technologies',
    aboutPage.values?.partnership || 'Long-term partnership with clients',
    aboutPage.values?.responsibility || 'Responsibility and meeting deadlines',
    aboutPage.values?.safety || 'Safety and compliance with standards',
  ]

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">
              {dict.about.title}
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              {dict.about.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-text-muted leading-relaxed mb-6">
                {dict.about.description}
              </p>
              <p className="text-lg text-text-muted leading-relaxed">
                {dict.about.experience}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center p-6 bg-card rounded-2xl">
                <div className="text-4xl font-bold text-accent mb-2">{stats.currentProjects}</div>
                <div className="text-sm text-text-muted">{dict.hero.stats.currentProjects}</div>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl">
                <div className="text-4xl font-bold text-accent mb-2">{stats.projectsCompleted}+</div>
                <div className="text-sm text-text-muted">{dict.hero.stats.completed}</div>
              </div>
              <div className="text-center p-6 bg-card rounded-2xl">
                <div className="text-4xl font-bold text-accent mb-2">{stats.trustedCompanies}+</div>
                <div className="text-sm text-text-muted">{dict.hero.stats.clients}</div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-8 text-center">
              {aboutPage.whyUs || 'Why Choose Us'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-card rounded-2xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                  <p className="text-text-muted text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 md:p-12"
          >
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
                {aboutPage.ourValues || 'Our Values'}
              </h2>
              <p className="text-text-muted">
                {aboutPage.valuesDescription || 'Principles that guide our work'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-bg rounded-xl"
                >
                  <CheckCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="text-text">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
