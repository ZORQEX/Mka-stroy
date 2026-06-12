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
      <div className="pt-20">
        <Certificates dict={dict} locale={params.locale} />
      </div>
      <Contacts dict={dict} locale={params.locale} />
    </>
  )
}
