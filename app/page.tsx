'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { i18n } from '@/i18n.config'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace(`/${i18n.defaultLocale}`)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-white text-lg">Redirecting...</div>
    </div>
  )
}
