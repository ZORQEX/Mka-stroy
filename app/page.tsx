import { i18n } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { HomeClient } from '@/components/HomeClient'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { JsonLd } from '@/components/JsonLd'
import { ClientProviders } from '@/components/ClientProviders'

/**
 * Root "/" renders the default-locale homepage directly (no redirect), so the
 * site never shows a "Redirecting..." screen. Localized variants stay under
 * /[locale]/. Header/Footer/providers are included here because the [locale]
 * layout does not wrap this route.
 */
export default async function RootPage() {
  const locale = i18n.defaultLocale
  const dict = await getDictionary(locale)

  return (
    <ClientProviders>
      <JsonLd />
      <ScrollProgress />
      <Header locale={locale} dict={dict} />
      <main>
        <HomeClient locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </ClientProviders>
  )
}
