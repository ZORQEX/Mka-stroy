import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Services } from '@/sections/Services'
import { Contacts } from '@/sections/Contacts'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.services.title,
    description: dict.seo.services.description,
  }
}

export default async function ServicesPage({
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
            <h1 className="mb-4">{dict.services.title}</h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              {dict.services.subtitle}
            </p>
          </div>
        </div>
      </section>
      <Services dict={dict} locale={params.locale} />
      <Contacts dict={dict} locale={params.locale} />
    </>
  )
}
