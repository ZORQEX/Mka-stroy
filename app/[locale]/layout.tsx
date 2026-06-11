import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { i18n, type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { JsonLd } from '@/components/JsonLd'
import { ClientProviders } from '@/components/ClientProviders'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)

  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    openGraph: {
      title: dict.seo.home.title,
      description: dict.seo.home.description,
      type: 'website',
      locale: params.locale === 'ru' ? 'ru_RU' : params.locale === 'en' ? 'en_US' : params.locale === 'kk' ? 'kk_KZ' : params.locale === 'de' ? 'de_DE' : params.locale === 'tr' ? 'tr_TR' : 'ky_KG',
      siteName: 'MKA STROY',
    },
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        'ru': '/ru',
        'en': '/en',
        'kk': '/kk',
        'de': '/de',
        'ky': '/ky',
        'tr': '/tr',
        'x-default': '/ru',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  // Validate locale
  if (!i18n.locales.includes(params.locale)) {
    notFound()
  }

  const dict = await getDictionary(params.locale)

  return (
    <ClientProviders>
      <JsonLd />
      <ScrollProgress />
      <Header locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </ClientProviders>
  )
}
