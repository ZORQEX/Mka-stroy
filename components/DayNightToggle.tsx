'use client'

import { Sun, Moon } from 'lucide-react'
import { useDayNightContext } from '@/contexts/DayNightContext'
import { useThemeContext } from '@/contexts/ThemeContext'

export function DayNightToggle() {
  const dayNight = useDayNightContext()
  const theme = useThemeContext()

  // Use theme context as source of truth
  const isLight = theme.isLight
  const mounted = theme.mounted && dayNight.mounted

  // Don't render until mounted (avoid hydration mismatch)
  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg hover:bg-card dark:hover:bg-card/10 transition-colors"
        disabled
        aria-label="Loading theme"
      >
        <Sun size={20} className="opacity-50" />
      </button>
    )
  }

  // Toggle both UI theme and 3D lighting
  const handleToggle = () => {
    theme.toggleTheme()
    dayNight.toggleMode()
  }

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg hover:bg-card dark:hover:bg-card/10 transition-colors group"
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
