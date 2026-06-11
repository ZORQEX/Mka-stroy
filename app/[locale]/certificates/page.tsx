import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Certificates } from '@/sections/Certificates'
import { Contacts } from '@/sections/Contacts'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.certificates?.title || 'Сертификаты — MKA STROY',
    description: dict.seo.certificates?.description || 'Сертификаты и рекомендательные письма от партнёров MKA STROY.',
  }
}

export default async function CertificatesPage({
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
            <h1 className="mb-4">{dict.certificates?.title || 'Сертификаты и рекомендации'}</h1>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              {dict.certificates?.subtitle || 'Благодарственные письма и рекомендации от наших партнёров'}
            </p>
          </div>
        </div>
      </section>
      <Certificates dict={dict} locale={params.locale} />
      <Contacts dict={dict} locale={params.locale} />
    </>
  )
}
