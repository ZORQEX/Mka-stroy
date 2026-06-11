import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { AboutContent } from '@/components/AboutContent'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: `${dict.about.title} — TIM STROY`,
    description: dict.about.description,
  }
}

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const dict = await getDictionary(params.locale)

  return <AboutContent dict={dict} locale={params.locale} />
}
