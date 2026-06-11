'use client'

import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '@/contexts/ThemeContext'

export function DayNightToggle() {
  const theme = useThemeContext()
  const { isLight, mounted, toggleTheme } = theme

  // Don't render the icon until mounted (avoid hydration mismatch)
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg hover:bg-card transition-colors"
        disabled
        aria-label="Loading theme"
      >
        <Sun size={20} className="opacity-50" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg hover:bg-card transition-colors group"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {isLight ? (
        <Sun
          size={20}
          className="text-amber-500 group-hover:rotate-90 transition-transform duration-300"
        />
      ) : (
        <Moon
          size={20}
          className="text-blue-300 group-hover:rotate-12 transition-transform duration-300"
        />
      )}
    </button>
  )
}
