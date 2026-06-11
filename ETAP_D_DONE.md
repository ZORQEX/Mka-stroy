# ЭТАП D: Day/Night Toggle ✅

## Что сделано

### 1. Hook useDayNight
**Файл**: [hooks/useDayNight.ts](hooks/useDayNight.ts)

```tsx
export function useDayNight() {
  const [mode, setMode] = useState<DayNightMode>('day')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage (avoid hydration mismatch)
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('dayNightMode')
    if (saved === 'day' || saved === 'night') {
      setMode(saved)
    }
  }, [])

  return { mode, isDay, isNight, mounted, toggleMode, setDayMode, setNightMode }
}
```

**Особенности**:
- ✅ `mounted` guard для SSR compatibility
- ✅ Сохранение в `localStorage`
- ✅ Нет hydration mismatch (инициализация после mount)

### 2. DayNightToggle компонент
**Файл**: [components/DayNightToggle.tsx](components/DayNightToggle.tsx)

```tsx
{isDay ? (
  <Sun className="text-amber-500 group-hover:rotate-90" />
) : (
  <Moon className="text-blue-400 group-hover:rotate-12" />
)}
```

**Особенности**:
- ✅ Animated icon (rotate on hover)
- ✅ Sun (amber) для day mode
- ✅ Moon (blue) для night mode
- ✅ Accessibility (aria-label, title)
- ✅ Не рендерится до mount (fallback loader)

### 3. DayNightContext
**Файл**: [contexts/DayNightContext.tsx](contexts/DayNightContext.tsx)

Глобальный контекст для доступа из любого компонента:
```tsx
<DayNightProvider>
  <FloorInteractionProvider>
    <HomeClientContent />
  </FloorInteractionProvider>
</DayNightProvider>
```

### 4. Интеграция в Header
**Файл**: [components/Header.tsx](components/Header.tsx)

**Desktop**:
```tsx
<DayNightToggle />
<LanguageSwitcher />
<Phone CTA />
```

**Mobile**:
```tsx
<DayNightToggle />
<LanguageSwitcher />
<Menu button />
```

Переключатель добавлен рядом с Language Switcher.

### 5. Animated Lighting
**Файл**: [components/three/LightingController.tsx](components/three/LightingController.tsx)

GSAP tween для плавного перехода освещения:

```tsx
// Day mode
{
  ambientIntensity: 0.3,
  directionalIntensity: 1.5,
  directionalColor: white (1, 1, 1),
  hemisphereIntensity: 0.6,
  spotIntensity: 0.5
}

// Night mode
{
  ambientIntensity: 0.1,  // Darker
  directionalIntensity: 0.4,  // Dimmer
  directionalColor: cool blue (0.6, 0.7, 1.0),  // Moonlight
  hemisphereIntensity: 0.2,  // Less fill
  spotIntensity: 0.8  // Stronger rim light
}
```

**Анимация**:
```tsx
gsap.to(lights, {
  ...targetValues,
  duration: 1.5,  // Плавный переход
  ease: 'power2.inOut'
})
```

### 6. Обновлён BurjScene
**Файл**: [components/three/BurjScene.tsx](components/three/BurjScene.tsx)

Статичные lights заменены на `<LightingController />`:

```tsx
// БЫЛО:
<ambientLight intensity={0.3} />
<directionalLight intensity={1.5} />
<hemisphereLight intensity={0.6} />
<spotLight intensity={0.5} />

// СТАЛО:
<LightingController />  // Динамическое освещение
```

## Как работает

### Toggle в Header:
1. **Click** на Sun/Moon icon
2. → `toggleMode()` вызывается
3. → `localStorage.setItem('dayNightMode', newMode)`
4. → Context обновляется
5. → `LightingController` получает новый `isNight`
6. → GSAP tween анимирует освещение (1.5s)

### Day Mode:
- ☀️ **Sun icon** (amber-500)
- 🔆 **Яркое освещение** (intensity 1.5)
- 🌞 **Тёплый белый** свет (1, 1, 1)
- ✨ Ambient: 0.3, Hemisphere: 0.6

### Night Mode:
- 🌙 **Moon icon** (blue-400)
- 🌃 **Тёмное освещение** (intensity 0.4)
- 🌌 **Холодный синий** moonlight (0.6, 0.7, 1.0)
- ✨ Ambient: 0.1, Hemisphere: 0.2, Rim: 0.8 (подчёркивает контуры)

## Изменённые файлы

1. ✅ [hooks/useDayNight.ts](hooks/useDayNight.ts) - Hook с localStorage
2. ✅ [components/DayNightToggle.tsx](components/DayNightToggle.tsx) - Toggle компонент
3. ✅ [contexts/DayNightContext.tsx](contexts/DayNightContext.tsx) - Глобальный контекст
4. ✅ [components/Header.tsx](components/Header.tsx) - Добавлен toggle (desktop + mobile)
5. ✅ [components/HomeClient.tsx](components/HomeClient.tsx) - Обернут в DayNightProvider
6. ✅ [components/three/LightingController.tsx](components/three/LightingController.tsx) - Animated lights
7. ✅ [components/three/BurjScene.tsx](components/three/BurjScene.tsx) - Использует LightingController

## Команды проверки

```bash
npm run dev
npm run build
```

## Что проверить

### Toggle в Header:
1. ✅ **Desktop**: Toggle видим рядом с language switcher
2. ✅ **Mobile**: Toggle видим слева от language switcher
3. ✅ **Sun icon** показывается в day mode (amber)
4. ✅ **Moon icon** показывается в night mode (blue)
5. ✅ **Hover** → icon rotate (Sun: 90°, Moon: 12°)

### Day → Night переход:
1. Кликни на Sun icon
2. ✅ **Icon меняется** на Moon
3. ✅ **Освещение плавно** темнеет (1.5s transition)
4. ✅ **Свет становится** холодным голубым
5. ✅ **Rim light усиливается** (контуры башни)

### Night → Day переход:
1. Кликни на Moon icon
2. ✅ **Icon меняется** на Sun
3. ✅ **Освещение плавно** светлеет (1.5s transition)
4. ✅ **Свет становится** тёплым белым
5. ✅ **Ambient brightens** up

### Persistence:
1. Переключи на Night mode
2. **Перезагрузи страницу** (F5)
3. ✅ **Night mode сохранился** (localStorage)
4. ✅ **Нет flickering** при загрузке (mounted guard)

### Hydration:
1. Открой DevTools → Console
2. Перезагрузи страницу
3. ✅ **Нет hydration warning**
4. ✅ **Нет layout shift** при загрузке

### i18n compatibility:
1. Переключи язык (LanguageSwitcher)
2. ✅ Day/Night **сохраняется** при смене языка
3. ✅ Toggle **работает** на всех языках (/ru, /en, /kk, /de, /ky)

## Технические детали

### GSAP tween:
```tsx
duration: 1.5  // 1.5 секунды плавного перехода
ease: 'power2.inOut'  // Естественное ускорение/замедление
```

### Color values:
- **Day directional**: `rgb(255, 255, 255)` - чистый белый
- **Night directional**: `rgb(153, 178, 255)` - холодный moonlight

### Intensity values:
| Light | Day | Night | Ratio |
|-------|-----|-------|-------|
| Ambient | 0.3 | 0.1 | 3x |
| Directional | 1.5 | 0.4 | 3.75x |
| Hemisphere | 0.6 | 0.2 | 3x |
| Spot (rim) | 0.5 | 0.8 | 0.625x (stronger in night) |

### localStorage schema:
```json
{
  "dayNightMode": "day" | "night"
}
```

---

**Статус**: ✅ ЭТАП D ЗАВЕРШЁН
**Готов к коммиту**: Да
**Следующий этап**: E (Effects + quality presets) - ОПЦИОНАЛЬНО
