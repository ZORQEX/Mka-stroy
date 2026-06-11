import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Projects } from '@/sections/Projects'
import { Process } from '@/sections/Process'
import { Contacts } from '@/sections/Contacts'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.projects.title,
    description: dict.seo.projects.description,
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const dict = await getDictionary(params.locale)

  return (
    <>
      <section className="section bg-bg pt-32">
        <div className="container">
          <div className="text-center mb-16">
            <h1 className="mb-4">{dict.projects.title}</h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              {dict.projects.subtitle}
            </p>
          </div>
        </div>
      </section>
      <Projects dict={dict} locale={params.locale} showAll={true} />
      <Process dict={dict} locale={params.locale} />
      <Contacts dict={dict} locale={params.locale} />
    </>
  )
}
