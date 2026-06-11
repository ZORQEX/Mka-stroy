'use client'

import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'
import { Hero } from '@/sections/Hero'
import { Services } from '@/sections/Services'
import Projects from '@/sections/Projects'
import { Clients } from '@/sections/Clients'
import { Process } from '@/sections/Process'
import { FAQ } from '@/sections/FAQ'
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
      <Projects />
      <Clients dict={dict} locale={locale} />
      <Process dict={dict} locale={locale} />
      <FAQ dict={dict} locale={locale} />
      <Contacts dict={dict} locale={locale} />
    </>
  )
}
