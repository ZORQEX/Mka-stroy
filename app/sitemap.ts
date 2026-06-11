import type { MetadataRoute } from 'next'
import { i18n } from '@/i18n.config'

const BASE_URL = 'https://mkastroy.com'

// Pages that exist under every /[locale]/ segment, with their relative path.
const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { path: '', changeFrequency: 'monthly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/certificates', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/contacts', changeFrequency: 'yearly', priority: 0.7 },
]

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return i18n.locales.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE_URL}/${locale}${route.path}/`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  )
}
