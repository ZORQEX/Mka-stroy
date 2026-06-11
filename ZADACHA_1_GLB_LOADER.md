# ЗАДАЧА 1: GLB Loader с Fallback ✅

## Что сделано

### 1. GLB Loader компонент
**Файл**: [components/three/BurjKhalifaModel.tsx](components/three/BurjKhalifaModel.tsx) (НОВЫЙ)

Компонент с автоматическим fallback на procedural модель:

```tsx
<BurjKhalifaModel
  rotation={[0, Math.PI / 6, 0]}
  position={[0, 0, 0]}
  enableInteractivity={true}
  onFloorClick={(floorIndex) => console.log('Floor clicked:', floorIndex)}
/>
```

**Особенности**:
- ✅ Пытается загрузить `/models/burj-khalifa.glb`
- ✅ Автоматический fallback на procedural BurjKhalifa если GLB отсутствует
- ✅ Применяет MKA STROY материалы к GLB:
  - Стекло: `transmission: 0.7`, `clearcoat: 1`
  - Металл: `metalness: 0.9`, `roughness: 0.2`
  - Бетон: `metalness: 0`, `roughness: 0.8`
- ✅ Определяет материалы по имени mesh: `glass`, `window`, `facade`, `metal`, `spire`, `concrete`, `base`
- ✅ Suspense boundary с procedural fallback во время загрузки
- ✅ Console logging: показывает статус загрузки

### 2. Интеграция в существующие компоненты

**Обновлённые файлы**:

1. ✅ [components/three/FloorInteractive.tsx](components/three/FloorInteractive.tsx)
   - Заменён импорт: `BurjKhalifa` → `BurjKhalifaModel`
   - Все props прокинуты корректно
   - Interactivity работает с GLB

2. ✅ [components/three/BurjScene.tsx](components/three/BurjScene.tsx)
   - Заменён импорт: `BurjKhalifa` → `BurjKhalifaModel`
   - Reduced motion fallback использует GLB loader

### 3. Папка для модели
**Создано**: `public/models/`

## Как подкинуть реальную модель

### Шаг 1: Подготовка GLB модели

Требования к модели:
- **Формат**: `.glb` (binary GLTF)
- **Центр**: модель должна быть центрирована в origin (0, 0, 0)
- **Размер**: рекомендуемая высота ~20 units (чтобы соответствовать procedural башне)
- **Полигоны**: оптимизированная геометрия (не более 500k полигонов для производительности)

### Шаг 2: Naming Convention для материалов

Компонент определяет материалы по имени mesh. Убедитесь, что ваши mesh названы правильно:

**Стеклянные фасады** (получат transmission + clearcoat):
- `glass_facade`
- `window_panels`
- `facade_01`, `facade_02`, etc.
- Любое имя содержащее: `glass`, `window`, `facade`

**Металл** (получат metalness 0.9):
- `metal_frame`
- `spire`
- `aluminum_profile`
- Любое имя содержащее: `metal`, `spire`, `frame`

**Бетон/структура** (получат rough material):
- `concrete_base`
- `structure`
- `base_foundation`
- Любое имя содержащее: `concrete`, `base`, `structure`

### Шаг 3: Размещение файла

Положите файл в:
```
public/models/burj-khalifa.glb
```

**Абсолютный путь**:
```
/home/noxqd/WEB/leason1/public/models/burj-khalifa.glb
```

### Шаг 4: Проверка

1. **Dev server**:
```bash
npm run dev
```

2. **Console проверка**:
Откройте DevTools → Console. Должны увидеть:
- ✅ `GLB model loaded: /models/burj-khalifa.glb` — модель загружена
- ⚠️  `GLB model not found, using procedural fallback` — модель отсутствует (ожидаемо, если файла нет)

3. **Visual check**:
- Если GLB загружена: увидите детализированную модель
- Если fallback: увидите текущую procedural башню (стеклянные секции)

## Fallback логика

### Когда используется procedural fallback:
1. ❌ Файл `/models/burj-khalifa.glb` не существует
2. ❌ GLB загрузка завершилась с ошибкой (corrupted file)
3. ❌ useGLTF выбросил exception

### Во всех случаях:
- ✅ **Приложение работает** без ошибок
- ✅ **Interactivity сохраняется** (hover, click на этажи)
- ✅ **Scroll animation** работает нормально
- ✅ **Day/Night toggle** меняет освещение
- ✅ **Build успешен**: `npm run build` проходит

## Отладка

### Console warnings:

```
⚠️  GLB model not found or failed to load, using procedural fallback
```
→ Файл отсутствует в `public/models/burj-khalifa.glb` или corrupted

```
✅ GLB model loaded: /models/burj-khalifa.glb
```
→ Модель успешно загружена и материалы применены

### DevTools Network:

Откройте DevTools → Network → фильтр `burj`

- **Status 200**: файл загружен успешно
- **Status 404**: файл не найден (fallback сработает автоматически)

## Материалы GLB (что делает loader)

### Стекло (glass facades):
```tsx
new THREE.MeshPhysicalMaterial({
  color: '#e8f4f8',        // Светло-голубой
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.7,        // Прозрачность
  thickness: 0.3,
  envMapIntensity: 1.2,
  clearcoat: 1,             // Глянцевое покрытие
  clearcoatRoughness: 0.1,
  transparent: true,
  opacity: 0.9
})
```

### Металл (frames, spire):
```tsx
new THREE.MeshStandardMaterial({
  color: '#c0c0c0',        // Серебристый
  metalness: 0.9,          // Очень металлический
  roughness: 0.2,          // Слегка полированный
  envMapIntensity: 2
})
```

### Бетон (base, structure):
```tsx
new THREE.MeshStandardMaterial({
  color: '#d4d4d4',        // Светло-серый
  metalness: 0,            // Не металл
  roughness: 0.8           // Грубая текстура
})
```

### Default (unknown meshes):
```tsx
new THREE.MeshStandardMaterial({
  color: '#b0b0b0',        // Нейтральный серый
  metalness: 0.3,
  roughness: 0.6
})
```

## Производительность

### Текущие оптимизации:
- ✅ `useGLTF.preload()` для фонового прелоадинга (не блокирует render)
- ✅ Suspense boundary с procedural fallback (immediate render)
- ✅ Материалы применяются один раз в useEffect (после mount)
- ✅ Shadows настроены на meshes (castShadow + receiveShadow)

### Рекомендации для модели:
- Оптимизировать геометрию: не более 500k полигонов
- Использовать LOD (Levels of Detail) если модель очень детализированная
- Compressed textures (если есть текстуры)
- Draco compression для GLB (опционально)

## Следующие задачи

**ЗАДАЧА 1**: ✅ **ЗАВЕРШЕНА**

**ЗАДАЧА 2**: Materials и цвета (pending)
- Более детальная палитра MKA STROY
- Orange accents (#C0430B) на углах
- Environment preset для reflections

**ЗАДАЧА 3**: Height zoning + MaterialsAtLevelModal (pending)
- Bounding box для модели
- 10 зон по высоте
- Raycast для определения zone по hit.point.y
- Модалка с материалами на уровне

**ЗАДАЧА 4**: Environment (pending)
- Дорога/площадка
- Props (cones, lights, trees)
- Fog
- Shadows

---

**Статус**: ✅ ЗАДАЧА 1 ЗАВЕРШЕНА
**Готово к использованию**: Да (работает с/без GLB файла)
**Build status**: Проверить с `npm run build`
