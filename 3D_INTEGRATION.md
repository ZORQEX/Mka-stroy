# 3D Integration Guide - NK Studio Style

## Обзор

Добавлен премиальный 3D слой в стиле NK Studio с процедурным архитектурным зданием, которое анимируется при скролле.

## Что добавлено

### Новые зависимости (package.json)
```json
"@react-three/fiber": "^8.15.0",
"@react-three/drei": "^9.96.0",
"three": "^0.160.0",
"gsap": "^3.12.0"
```

### Новые компоненты

1. **components/Building.tsx**
   - Процедурное 3D здание из 5 этажей
   - Материалы: бетон, стекло, акцентные рёбра (#C0430B)
   - Параметры: explodeOffset, accentIntensity, rotation

2. **components/ThreeScene.tsx**
   - Canvas с камерой и освещением
   - SVG fallback для WebGL недоступности
   - Поддержка prefers-reduced-motion
   - Mobile-friendly (отключается на < 1024px)

3. **components/SceneController.tsx**
   - Управление 3D сценой на основе скролла
   - Smooth camera lerp

4. **components/HomeClient.tsx**
   - Клиентский компонент-обёртка
   - Интеграция 3D сцены и секций
   - Responsive layout (desktop: 2 колонки, mobile: 1 колонка)

### Новые хуки

**hooks/useScrollScene.ts**
- GSAP ScrollTrigger для синхронизации скролла
- 6 фаз анимации по секциям:
  1. **Hero** (0-20%): Здание появляется издалека
  2. **Services** (20-35%): Приближение, поворот, подсветка рёбер
  3. **Projects** (35-50%): Панорамный поворот
  4. **Process** (50-65%): Exploded view (этажи разъезжаются)
  5. **Calculator** (65-80%): Стабильный ракурс
  6. **Contacts** (80-100%): Отъезд камеры

## Модифицированные файлы

- **app/[locale]/page.tsx** — теперь использует HomeClient
- **package.json** — добавлены 3D зависимости

## Производительность

✅ dpr ограничен до 1.5
✅ Простые материалы (MeshStandardMaterial)
✅ Минимум теней
✅ Dynamic import (SSR disabled для ThreeScene)
✅ Mobile: 3D отключен (< 1024px)
✅ prefers-reduced-motion: статичная сцена

## Fallback стратегия

1. **WebGL недоступен** → SVG архитектурная сетка
2. **Mobile** → 3D не загружается
3. **prefers-reduced-motion** → статичное здание без анимации

## Запуск

```bash
# Установить зависимости
npm install

# ВАЖНО: После изменений в R3F компонентах очистить кеш Next.js
rm -rf .next

# Dev server
npm run dev

# Production build
npm run build
npm start
```

**⚠️ Важно**: После любых изменений в 3D компонентах (ThreeScene, Building, SceneController) обязательно очищайте `.next` директорию и перезапускайте `npm run dev`. Это предотвращает кеширование старых версий с ошибками event manager.

## Customization

### Изменить параметры здания

В `components/Building.tsx`:
- `floors` массив — конфигурация этажей
- Материалы: `concreteMaterial`, `glassMaterial`
- Цвет акцента: `accentColor`

### Изменить сценарий анимации

В `hooks/useScrollScene.ts`:
- 6 timeline фаз с параметрами camera, rotation, explode, accent
- ScrollTrigger start/end точки

### Добавить реальную 3D модель

1. Положить файл в `public/models/building.glb`
2. В `components/Building.tsx`:
   ```tsx
   import { useGLTF } from '@react-three/drei'

   function Building() {
     const { scene } = useGLTF('/models/building.glb')
     return <primitive object={scene} />
   }
   ```

## Проблемы и решения

**Проблема**: R3F event manager ошибка "can't access property 'S', x is undefined"
- ✅ **РЕШЕНИЕ**: Полностью отключены события Canvas (`events={undefined}`)
- ✅ Добавлен mounted guard для проверки SSR
- ✅ WebGL проверка перенесена в useEffect
- ✅ Dynamic import с `ssr: false` в HomeClient
- ⚠️ **КРИТИЧНО**: После изменений выполнить `rm -rf .next && npm run dev`

**Проблема**: 3D не загружается
- Проверить консоль на ошибки WebGL
- Проверить что зависимости установлены
- Проверить что используется современный браузер

**Проблема**: Лаги при скролле
- Уменьшить `dpr` в ThreeScene.tsx
- Упростить здание (меньше этажей)
- Отключить тени

**Проблема**: UI не кликается
- Проверить `pointer-events` в HomeClient.tsx
- 3D сцена должна иметь `pointer-events-none`

## Сохранённые функции

✅ i18n (ru/en/kk/de/ky) — не затронута
✅ Маршруты /[locale]/* — работают
✅ Переводы messages/*.json — не изменены
✅ Header/Footer — не изменены
✅ Все секции — не изменены, только обёрнуты в HomeClient

## NK Studio Feel

✓ Премиальный минимализм
✓ 3D объект (архитектурное здание)
✓ Scroll-driven анимация
✓ Связанная "история" по мере прокрутки
✓ Камера/поворот/свет/explode/подсветка
✓ Производительность > красота
✓ Mobile-friendly
✓ Accessibility (reduced-motion)
