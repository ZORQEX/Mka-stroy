'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useDayNight, DayNightMode } from '@/hooks/useDayNight'

interface DayNightContextValue {
  mode: DayNightMode
  isDay: boolean
  isNight: boolean
  mounted: boolean
  toggleMode: () => void
  setDayMode: () => void
  setNightMode: () => void
}

const DayNightContext = createContext<DayNightContextValue | undefined>(undefined)

export function DayNightProvider({ children }: { children: ReactNode }) {
  const dayNight = useDayNight()

  return (
    <DayNightContext.Provider value={dayNight}>
      {children}
    </DayNightContext.Provider>
  )
}

export function useDayNightContext() {
  const context = useContext(DayNightContext)
  if (!context) {
    throw new Error('useDayNightContext must be used within DayNightProvider')
  }
  return context
}
