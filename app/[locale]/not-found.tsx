'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { i18n } from '@/i18n.config'

export default function NotFound() {
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || i18n.defaultLocale
  const validLocale = i18n.locales.includes(locale as any) ? locale : i18n.defaultLocale

  // Simple translations for 404 page
  const translations = {
    ru: {
      title: 'Страница не найдена',
      description: 'К сожалению, запрашиваемая страница не существует или была перемещена.',
      home: 'На главную',
      back: 'Вернуться назад',
      suggestions: 'Возможно вас заинтересует:',
      services: 'Наши услуги',
      projects: 'Проекты',
      contacts: 'Контакты',
    },
    en: {
      title: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      home: 'Go Home',
      back: 'Go Back',
      suggestions: 'You might be interested in:',
      services: 'Our Services',
      projects: 'Projects',
      contacts: 'Contacts',
    },
    kk: {
      title: 'Бет табылмады',
      description: 'Кешіріңіз, сіз іздеген бет жоқ немесе жылжытылған.',
      home: 'Басты бетке',
      back: 'Артқа қайту',
      suggestions: 'Сізді қызықтыруы мүмкін:',
      services: 'Біздің қызметтер',
      projects: 'Жобалар',
      contacts: 'Байланыс',
    },
    de: {
      title: 'Seite nicht gefunden',
      description: 'Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.',
      home: 'Zur Startseite',
      back: 'Zurück',
      suggestions: 'Das könnte Sie interessieren:',
      services: 'Unsere Dienstleistungen',
      projects: 'Projekte',
      contacts: 'Kontakt',
    },
    ky: {
      title: 'Барак табылган жок',
      description: 'Кечиресиз, сиз издеген барак жок же жылдырылган.',
      home: 'Башкы бетке',
      back: 'Артка кайтуу',
      suggestions: 'Сизди кызыктырышы мүмкүн:',
      services: 'Биздин кызматтар',
      projects: 'Долбоорлор',
      contacts: 'Байланыш',
    },
    tr: {
      title: 'Sayfa Bulunamadı',
      description: 'Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış.',
      home: 'Ana Sayfa',
      back: 'Geri Dön',
      suggestions: 'İlginizi çekebilir:',
      services: 'Hizmetlerimiz',
      projects: 'Projeler',
      contacts: 'İletişim',
    },
  }

  const t =
    translations[validLocale as keyof typeof translations] || translations.ru

  return (
    <section className="section min-h-screen flex items-center justify-center bg-gradient-to-br from-bg via-bg to-card">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-9xl font-bold text-gradient mb-4">404</div>
            <h1 className="text-4xl mb-4">{t.title}</h1>
            <p className="text-lg opacity-70 mb-8">
              {t.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${validLocale}`} className="btn btn-primary">
              <Home size={20} />
              {t.home}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary"
            >
              <ArrowLeft size={20} />
              {t.back}
            </button>
          </div>

          <div className="mt-12 p-6 bg-card rounded-xl">
            <h3 className="text-xl mb-3">{t.suggestions}</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <Link href={`/${validLocale}#services`} className="p-3 bg-bg rounded-lg hover:bg-accent/10 transition-colors">
                {t.services}
              </Link>
              <Link href={`/${validLocale}#projects`} className="p-3 bg-bg rounded-lg hover:bg-accent/10 transition-colors">
                {t.projects}
              </Link>
              <Link href={`/${validLocale}#contacts`} className="p-3 bg-bg rounded-lg hover:bg-accent/10 transition-colors">
                {t.contacts}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
