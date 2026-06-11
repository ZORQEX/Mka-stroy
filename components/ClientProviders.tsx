'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { DayNightProvider } from '@/contexts/DayNightContext'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DayNightProvider>
        {children}
      </DayNightProvider>
    </ThemeProvider>
  )
}
