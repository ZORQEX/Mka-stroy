# Troubleshooting: R3F Event Manager Error

## Проблема
```
TypeError: can't access property "S", x is undefined
at @react-three/fiber/dist/events-*.esm.js
```

## Гарантированное решение

### 1. Проверьте components/ThreeScene.tsx

Файл должен начинаться с:
```tsx
'use client'
```

Canvas должен иметь:
```tsx
<Canvas
  events={undefined}  // ← КРИТИЧНО: полностью отключает event manager
  dpr={[1, 1.5]}
  ...
>
```

### 2. Очистите кеш Next.js

```bash
# Остановите dev server (Ctrl+C)
rm -rf .next

# Перезапустите
npm run dev
```

**⚠️ ВАЖНО**: Next.js кеширует скомпилированные компоненты в `.next/`. После изменений в R3F компонентах старый кеш может содержать ошибочный код event manager. Всегда очищайте `.next` после правок в:
- `components/ThreeScene.tsx`
- `components/Building.tsx`
- `components/SceneController.tsx`
- `hooks/useScrollScene.ts`

### 3. Проверьте что ThreeScene импортируется через dynamic

В `components/HomeClient.tsx` должно быть:
```tsx
const ThreeScene = dynamic(
  () => import('./ThreeScene').then(mod => ({ default: mod.ThreeScene })),
  { ssr: false }  // ← КРИТИЧНО: отключает SSR для Canvas
)
```

### 4. Убедитесь что нет других Canvas

```bash
# Поиск всех использований Canvas
grep -r "from '@react-three/fiber'" --include="*.tsx" --include="*.ts"

# Должно найти только:
# - components/ThreeScene.tsx
# - components/Building.tsx (useFrame)
# - components/SceneController.tsx (useThree)
```

Только `ThreeScene.tsx` должен содержать `<Canvas>`.

### 5. Проверьте версии пакетов

```bash
npm list @react-three/fiber @react-three/drei three
```

Должно быть:
```
@react-three/fiber@8.15.0
@react-three/drei@9.96.0
three@0.160.0
```

## Если ошибка повторяется

### Полная переустановка зависимостей

```bash
# Остановите dev server
rm -rf node_modules
rm -rf .next
rm package-lock.json

# Переустановите
npm install

# Запустите
npm run dev
```

### Проверка в консоли браузера

1. Откройте DevTools (F12)
2. Console → проверьте нет ли других ошибок до R3F ошибки
3. Network → проверьте что загружаются Three.js бандлы
4. Sources → найдите `events-*.esm.js` и посмотрите стек вызовов

### Временное отключение 3D

Если нужно быстро запустить сайт без 3D:

В `components/HomeClient.tsx`:
```tsx
// Закомментируйте импорт ThreeScene
// const ThreeScene = dynamic(...)

// В JSX:
{!isMobile && false && <ThreeScene isReducedMotion={isReducedMotion} />}
```

## Контрольный список

- [ ] `'use client'` в начале ThreeScene.tsx
- [ ] `events={undefined}` в Canvas props
- [ ] `rm -rf .next` выполнен
- [ ] `npm run dev` перезапущен
- [ ] Dynamic import с `ssr: false` в HomeClient
- [ ] Только один `<Canvas>` в проекте (в ThreeScene.tsx)
- [ ] Браузер поддерживает WebGL (проверить на chrome/firefox)

## Успешный запуск

После выполнения всех шагов:

1. **Без ошибок**: Страница загружается, консоль чистая
2. **Desktop**: Справа видна SVG сетка (fallback) или 3D здание
3. **Mobile**: 3D не загружается (ожидаемое поведение)
4. **Scroll**: При прокрутке 3D здание анимируется (если WebGL поддерживается)

## Дополнительная помощь

- Документация: [3D_INTEGRATION.md](3D_INTEGRATION.md)
- R3F docs: https://docs.pmnd.rs/react-three-fiber
- Next.js App Router: https://nextjs.org/docs/app
