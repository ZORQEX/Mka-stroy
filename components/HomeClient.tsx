'use client'

import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'
import { Hero } from '@/sections/Hero'
import { Services } from '@/sections/Services'
import { Partners } from '@/sections/Partners'
import Projects from '@/sections/Projects'
import { Clients } from '@/sections/Clients'
import { Process } from '@/sections/Process'
import { FAQ } from '@/sections/FAQ'
import { Certificates } from '@/sections/Certificates'
import { Contacts } from '@/sections/Contacts'

interface HomeClientProps {
  locale: Locale
  dict: Dictionary
}

export function HomeClient({ locale, dict }: HomeClientProps) {
  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Services dict={dict} locale={locale} />
      <Partners dict={dict} locale={locale} />
      <Projects preview dict={dict} />
      <Clients dict={dict} locale={locale} />
      <Process dict={dict} locale={locale} />
      <FAQ dict={dict} locale={locale} />
      <Certificates dict={dict} locale={locale} />
      <Contacts dict={dict} locale={locale} />
    </>
  )
}
