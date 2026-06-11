export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'kk', 'de', 'ky', 'tr'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeNames: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
  kk: 'Қазақша',
  de: 'Deutsch',
  ky: 'Кыргызча',
  tr: 'Türkçe',
}

export const localeFlags: Record<Locale, string> = {
  ru: '🇷🇺',
  en: '🇬🇧',
  kk: '🇰🇿',
  de: '🇩🇪',
  ky: '🇰🇬',
  tr: '🇹🇷',
}
