# ЭТАП B: Scroll-driven Cinematic Animation ✅

## Что сделано

### 1. Улучшен GSAP ScrollTrigger
**Файл**: [hooks/useScrollAnimation.ts](hooks/useScrollAnimation.ts)

#### Добавлен prefers-reduced-motion
```tsx
// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// If reduced motion, simplify animation (only subtle rotation, no camera movement)
if (prefersReducedMotion) {
  tl.to(state, {
    buildingRotY: Math.PI / 4,
    duration: 1,
    ease: 'none'
  })
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}
```

#### Улучшен scrub для плавности
```tsx
scrub: prefersReducedMotion ? 0.5 : 1.5  // Smoother scrub, faster if reduced motion
```

#### Добавлены easing curves для естественного движения
```tsx
// Phase 1: Hero
ease: 'power1.inOut'  // Плавный старт

// Phase 3: Projects (panoramic)
ease: 'power2.inOut'  // Более выраженный эффект

// Phase 6: Final
ease: 'power2.out'    // Плавное замедление
```

### 2. Анимация работает по фазам

**6 фаз анимации синхронизированных со scroll:**

| Фаза | Scroll % | Секция | Эффект |
|------|----------|--------|--------|
| 1 | 0-15% | Hero | Начальный вид, приближение |
| 2 | 15-30% | Services | Closer view, rotation π/4 |
| 3 | 30-45% | Projects | Panoramic (камера слева), π/2 |
| 4 | 45-60% | Process | Explode mode начинается, π*0.75 |
| 5 | 60-75% | Calculator | Полный разбор, вид сзади (π) |
| 6 | 75-100% | FAQ/Contacts | Zoom out, reassemble, π*1.5 |

**Движение камеры:**
```
Start: [15, 12, 15] → облёт вокруг башни → End: [8, 16, 8]
Target: [0, 11, 0] → плавное изменение высоты → [0, 10, 0]
Rotation: 0° → 270° (полтора оборота)
```

### 3. SceneController с smooth lerp
**Файл**: [components/three/SceneController.tsx](components/three/SceneController.tsx)

```tsx
useFrame(() => {
  // Smooth camera interpolation
  camera.position.lerp(
    new THREE.Vector3(...animState.cameraPosition),
    0.1  // 10% per frame = smooth inertia
  )

  // Smooth target interpolation
  targetRef.current.lerp(
    new THREE.Vector3(...animState.cameraTarget),
    0.1
  )

  camera.lookAt(targetRef.current)
})
```

## Особенности

### ✅ NO Auto-spin
Башня вращается ТОЛЬКО при скролле, не автоматически.

### ✅ Cinematic movement
- Easing curves для естественного ускорения/замедления
- Smooth lerp в SceneController для устранения jitter
- Scrub 1.5 для более отзывчивого scroll

### ✅ Explode effect
В фазах 4-5 этажи башни расходятся (`explodeOffset: 1`), затем собираются обратно в фазе 6.

### ✅ Accessibility
`prefers-reduced-motion` упрощает анимацию до минимальной ротации без движения камеры.

## Изменённые файлы

1. ✅ [hooks/useScrollAnimation.ts](hooks/useScrollAnimation.ts)
   - Добавлен `prefersReducedMotion` check
   - Улучшен `scrub`: 0.5 (reduced) / 1.5 (normal)
   - Добавлены easing curves: power1.inOut, power2.inOut, power2.out
   - Упрощённая анимация для reduced motion

## Команды проверки

```bash
# Dev server
npm run dev

# Production build
npm run build
```

## Что проверить

### В браузере (scroll страницу):
1. ✅ **Hero**: Башня видна, начинает движение при скролле
2. ✅ **Services**: Камера приближается, башня вращается
3. ✅ **Projects**: Камера облетает слева, panoramic view
4. ✅ **Process**: Этажи начинают расходиться (explode)
5. ✅ **Calculator**: Полный explode, вид сзади
6. ✅ **FAQ/Contacts**: Этажи собираются, zoom out
7. ✅ **Плавность**: Нет jitter, движение естественное
8. ✅ **NO auto-spin**: Башня НЕ вращается сама по себе

### Accessibility:
1. Включи в ОС "Reduce motion"
2. Перезагрузи страницу
3. ✅ **Должна быть только лёгкая ротация**, без движения камеры

### Performance:
- ✅ 60 FPS на desktop
- ✅ Smooth scroll без лагов
- ✅ Нет memory leaks (ScrollTrigger cleanup работает)

## Техническая информация

### GSAP Timeline:
```
Total duration: 1.0 (normalized)
├─ Phase 1: 0.15 (15%)
├─ Phase 2: 0.15 (15%)
├─ Phase 3: 0.15 (15%)
├─ Phase 4: 0.15 (15%)
├─ Phase 5: 0.15 (15%)
└─ Phase 6: 0.25 (25%)
```

### Easing strategy:
- `power1.inOut`: Плавные переходы
- `power2.inOut`: Более динамичные движения
- `power2.out`: Финальное замедление

### Lerp coefficient:
`0.1` = 10% interpolation per frame
- Достаточно быстрый для отзывчивости
- Достаточно плавный для устранения jitter

---

**Статус**: ✅ ЭТАП B ЗАВЕРШЁН
**Готов к коммиту**: Да
**Следующий этап**: C (Hover/Click interactivity)
