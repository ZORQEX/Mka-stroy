import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Contacts } from '@/sections/Contacts'
import { FAQ } from '@/sections/FAQ'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.contacts.title,
    description: dict.seo.contacts.description,
  }
}

export default async function ContactsPage({
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
            <h1 className="mb-4">{dict.contacts.title}</h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              {dict.contacts.subtitle}
            </p>
          </div>
        </div>
      </section>
      <Contacts dict={dict} locale={params.locale} />
      <FAQ dict={dict} locale={params.locale} />
    </>
  )
}
