import { i18n, type Locale } from '@/i18n.config'

export async function getDictionary(locale: Locale) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (error) {
    // Fallback to default locale
    return (await import(`@/messages/${i18n.defaultLocale}.json`)).default
  }
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

// Helper function to get nested translation
export function getNestedTranslation(
  dict: any,
  path: string,
  params?: Record<string, string | number>
): string {
  const keys = path.split('.')
  let value = dict

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return path // Return path if translation not found
    }
  }

  // Replace params if provided
  if (params && typeof value === 'string') {
    return Object.entries(params).reduce(
      (str, [key, val]) => str.replace(`{${key}}`, String(val)),
      value
    )
  }

  return typeof value === 'string' ? value : path
}
