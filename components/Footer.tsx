import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contacts, name, legalForm } = companyData

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{name}</h3>
            <p className="text-sm opacity-80 mb-4">
              {dict.hero.description}
            </p>
            <p className="text-sm opacity-60">
              {legalForm} {name}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.navigation}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/services`} className="text-sm hover:text-accent transition-colors">
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/projects`} className="text-sm hover:text-accent transition-colors">
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contacts`} className="text-sm hover:text-accent transition-colors">
                  {dict.nav.contacts}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm hover:text-accent transition-colors">
                  {dict.privacy.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.contacts}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <Phone size={16} className="mt-1 flex-shrink-0 text-accent" />
                <a href={`tel:${contacts.phone}`} className="hover:text-accent transition-colors">
                  {contacts.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Mail size={16} className="mt-1 flex-shrink-0 text-accent" />
                <a href={`mailto:${contacts.email}`} className="hover:text-accent transition-colors">
                  {contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-accent" />
                <span>{contacts.address.city}</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.schedule}</h4>
            <div className="flex items-start gap-2 text-sm">
              <Clock size={16} className="mt-1 flex-shrink-0 text-accent" />
              <div>
                <p>{contacts.workingHours.weekdays}</p>
                {contacts.workingHours.weekend && (
                  <p className="opacity-60">{contacts.workingHours.weekend}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} {name}. {dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
