'use client'

import { useState, useEffect, useCallback } from 'react'

export type ThemeMode = 'light' | 'dark'

export interface UseThemeReturn {
  theme: ThemeMode
  isLight: boolean
  isDark: boolean
  mounted: boolean
  toggleTheme: () => void
  setLightTheme: () => void
  setDarkTheme: () => void
}

/**
 * Hook for managing UI theme (light/dark mode)
 *
 * Features:
 * - Persists to localStorage
 * - Syncs with Tailwind dark class on <html>
 * - SSR-safe with mounted guard
 * - Initial state: light (deterministic for hydration)
 */
export function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage after mount (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true)

    const saved = localStorage.getItem('theme') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
      applyTheme(saved)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial: ThemeMode = prefersDark ? 'dark' : 'light'
      setTheme(initial)
      applyTheme(initial)
      localStorage.setItem('theme', initial)
    }
  }, [])

  // Apply theme to <html> element (Tailwind dark mode)
  const applyTheme = useCallback((newTheme: ThemeMode) => {
    const root = document.documentElement

    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [])

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme: ThemeMode = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      applyTheme(newTheme)
      return newTheme
    })
  }, [applyTheme])

  // Set to light theme
  const setLightTheme = useCallback(() => {
    setTheme('light')
    localStorage.setItem('theme', 'light')
    applyTheme('light')
  }, [applyTheme])

  // Set to dark theme
  const setDarkTheme = useCallback(() => {
    setTheme('dark')
    localStorage.setItem('theme', 'dark')
    applyTheme('dark')
  }, [applyTheme])

  return {
    theme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    mounted,
    toggleTheme,
    setLightTheme,
    setDarkTheme
  }
}
