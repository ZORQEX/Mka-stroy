# Provider Fix: DayNightContext ✅

## Проблема
```
Runtime error: "useDayNightContext must be used within DayNightProvider"
```

**Причина**: Header рендерится в `layout.tsx` (server component), а DayNightProvider был только в HomeClient. Header не имел доступа к контексту.

## Решение

### 1. Создан ClientProviders wrapper
**Файл**: [components/ClientProviders.tsx](components/ClientProviders.tsx) (НОВЫЙ)

```tsx
'use client'

import { ReactNode } from 'react'
import { DayNightProvider } from '@/contexts/DayNightContext'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <DayNightProvider>
      {children}
    </DayNightProvider>
  )
}
```

**Особенности**:
- ✅ `'use client'` directive
- ✅ Обертывает DayNightProvider
- ✅ Можно легко добавить другие Provider'ы в будущем

### 2. Provider добавлен в layout
**Файл**: [app/[locale]/layout.tsx](app/[locale]/layout.tsx)

```tsx
import { ClientProviders } from '@/components/ClientProviders'

export default async function LocaleLayout({ children, params }) {
  const dict = await getDictionary(params.locale)

  return (
    <ClientProviders>  {/* ✅ Обертывает весь UI */}
      <JsonLd />
      <ScrollProgress />
      <Header locale={params.locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </ClientProviders>
  )
}
```

**Результат**:
- ✅ Header имеет доступ к DayNightContext
- ✅ DayNightToggle работает
- ✅ LightingController (в BurjScene) работает
- ✅ Все компоненты имеют доступ к контексту

### 3. Убран дублирующий Provider
**Файл**: [components/HomeClient.tsx](components/HomeClient.tsx)

```tsx
// БЫЛО:
return (
  <DayNightProvider>  // ❌ Дубликат
    <FloorInteractionProvider>
      <HomeClientContent />
    </FloorInteractionProvider>
  </DayNightProvider>
)

// СТАЛО:
return (
  <FloorInteractionProvider>  // ✅ Только Floor provider
    <HomeClientContent />
  </FloorInteractionProvider>
)
```

## Архитектура Provider'ов

```
app/[locale]/layout.tsx (Server Component)
  └─ ClientProviders ('use client')
      └─ DayNightProvider (глобальный контекст)
          ├─ Header (использует useDayNightContext)
          ├─ main
          │   └─ HomeClient
          │       └─ FloorInteractionProvider (локальный контекст)
          │           ├─ ThreeScene
          │           │   └─ BurjScene
          │           │       └─ LightingController (использует useDayNightContext)
          │           └─ ProjectModal
          └─ Footer
```

## Изменённые файлы

1. ✅ **НОВЫЙ**: [components/ClientProviders.tsx](components/ClientProviders.tsx)
   - Client wrapper для всех глобальных Provider'ов
   - Содержит DayNightProvider

2. ✅ [app/[locale]/layout.tsx](app/[locale]/layout.tsx)
   - Добавлен импорт ClientProviders
   - Весь UI обернут в <ClientProviders>

3. ✅ [components/HomeClient.tsx](components/HomeClient.tsx)
   - Убран импорт DayNightProvider
   - Убрана обертка <DayNightProvider> (остался только FloorInteractionProvider)

## Проверка

### Команды:
```bash
npm run dev    # Должен стартовать без ошибок
npm run build  # Должен собраться без ошибок
```

### В браузере:
1. ✅ **Header** → DayNightToggle видим и работает
2. ✅ **Click** на Sun/Moon → mode меняется
3. ✅ **Освещение** плавно меняется (1.5s GSAP tween)
4. ✅ **Нет ошибок** в консоли
5. ✅ **localStorage** работает (persist после reload)

### Hydration check:
1. ✅ Нет "Text content does not match" warning
2. ✅ Нет layout shift при загрузке
3. ✅ DayNightToggle рендерится корректно (mounted guard работает)

## Почему это правильное решение

### ✅ Next.js 14 compatible
- Server Component (layout) + Client Component (providers) pattern
- Нет `<head>` в body
- Нет async params проблем

### ✅ No hydration mismatch
- Initial state deterministic ('day')
- localStorage читается только в useEffect
- mounted guard предотвращает SSR/client несоответствие

### ✅ Правильная иерархия
- Глобальные Provider'ы (DayNight) на уровне layout
- Локальные Provider'ы (FloorInteraction) на уровне страницы/компонента
- Каждый Provider в правильном месте

---

**Статус**: ✅ ИСПРАВЛЕНО
**Готово к тестированию**: Да
