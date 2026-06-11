import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { HomeClient } from '@/components/HomeClient'

export default async function HomePage({
  params,
}: {
  params: { locale: Locale }
}) {
  const dict = await getDictionary(params.locale)

  return <HomeClient locale={params.locale} dict={dict} />
}
