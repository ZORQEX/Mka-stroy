'use client'

import { useState, useEffect, useCallback } from 'react'

export type DayNightMode = 'day' | 'night'

export function useDayNight() {
  const [mode, setMode] = useState<DayNightMode>('day')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage after mount (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('dayNightMode') as DayNightMode | null
    if (saved === 'day' || saved === 'night') {
      setMode(saved)
    }
  }, [])

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const newMode = prev === 'day' ? 'night' : 'day'
      localStorage.setItem('dayNightMode', newMode)
      return newMode
    })
  }, [])

  const setDayMode = useCallback(() => {
    setMode('day')
    localStorage.setItem('dayNightMode', 'day')
  }, [])

  const setNightMode = useCallback(() => {
    setMode('night')
    localStorage.setItem('dayNightMode', 'night')
  }, [])

  return {
    mode,
    isDay: mode === 'day',
    isNight: mode === 'night',
    mounted,
    toggleMode,
    setDayMode,
    setNightMode
  }
}
