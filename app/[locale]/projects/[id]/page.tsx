import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { companyData } from '@/constants/company'
import { notFound } from 'next/navigation'
import { ProjectDetail } from '@/components/ProjectDetail'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return companyData.projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; id: string }
}): Promise<Metadata> {
  const project = companyData.projects.find((p) => p.id === params.id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} — TIM STROY`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { locale: Locale; id: string }
}) {
  const project = companyData.projects.find((p) => p.id === params.id)

  if (!project) {
    notFound()
  }

  const dict = await getDictionary(params.locale)

  return <ProjectDetail project={project} dict={dict} locale={params.locale} />
}
