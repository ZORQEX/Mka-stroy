import { type Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/i18n'
import { Contacts } from '@/sections/Contacts'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.privacy?.title || 'Privacy Policy',
    description: dict.seo.privacy?.description || 'Privacy Policy',
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const dict = await getDictionary(params.locale)

  return (
    <>
      <section className="section bg-bg pt-32">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h1 className="mb-6">{dict.footer?.privacy || 'Privacy Policy'}</h1>
            <div className="prose prose-lg opacity-80">
              <p>
                {dict.footer?.privacyDescription ||
                  'This page contains the privacy policy for MKA STROY. We respect your privacy and are committed to protecting your personal data.'}
              </p>

              <h2>Data Collection</h2>
              <p>
                We collect information that you provide to us when contacting our company through the website,
                including your name, phone number, email address, and any additional information you choose to share.
              </p>

              <h2>Use of Information</h2>
              <p>
                The information we collect is used solely for the purpose of responding to your inquiries,
                providing quotes, and communicating about our construction services.
              </p>

              <h2>Data Protection</h2>
              <p>
                We implement appropriate security measures to protect your personal information from
                unauthorized access, alteration, or disclosure.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about our privacy policy, please contact us using the
                information provided below.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contacts dict={dict} locale={params.locale} />
    </>
  )
}
