# 3D Guide: Burj Khalifa Scene - Awwwards Level

## Overview

Premium 3D сцена с реалистичной моделью Burj Khalifa, scroll-driven анимацией, интерактивом и визуальными эффектами уровня NK Studio.

## Architecture

```
components/
├── three/                    # 3D компоненты
│   ├── BurjKhalifa.tsx      # Модель здания
│   ├── BurjScene.tsx         # Основная сцена (Canvas)
│   ├── SceneController.tsx   # Scroll & интерактив
│   ├── Environment.tsx       # HDRI + lighting
│   ├── Effects.tsx           # Post-processing
│   └── FloorInteractive.tsx  # Интерактивные этажи
│
hooks/
├── useScrollAnimation.ts     # GSAP ScrollTrigger
├── useThemeMode.ts           # Day/Night переключение
└── useFloorInteraction.ts    # Hover/Click этажей
│
public/
└── models/
    └── burj-khalifa.glb      # 3D модель (заменяемая)
```

## Модель Burj Khalifa

### Текущая реализация
- **Процедурная модель**: Стилизованная башня из stacked geometry
- **Формат**: React Three Fiber mesh groups
- **Оптимизация**: InstancedMesh для повторяющихся элементов

### Замена на реальную модель

1. **Получить модель**:
   ```bash
   # Источники:
   # - Sketchfab (free/paid)
   # - TurboSquid
   # - CGTrader
   # - Создать в Blender

   # Требования:
   # - GLB/GLTF формат
   # - Draco compressed (для размера)
   # - Под 10MB
   # - Оптимизированная топология
   ```

2. **Конвертация**:
   ```bash
   # Если модель в FBX/OBJ:
   npx gltf-pipeline -i burj.fbx -o burj.glb -d

   # Оптимизация:
   npx gltfjsx public/models/burj-khalifa.glb -o components/three/BurjModel.tsx
   ```

3. **Интеграция**:
   ```tsx
   // components/three/BurjKhalifa.tsx
   import { useGLTF } from '@react-three/drei'

   export function BurjKhalifa() {
     const { scene } = useGLTF('/models/burj-khalifa.glb')

     // Применить материалы
     scene.traverse((child) => {
       if (child.isMesh) {
         child.castShadow = true
         child.receiveShadow = true
         // Настройка материалов...
       }
     })

     return <primitive object={scene} />
   }

   useGLTF.preload('/models/burj-khalifa.glb')
   ```

## Материалы (Realistic)

```tsx
// Glass (для фасада)
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: '#e8f4f8',
  metalness: 0.1,
  roughness: 0.05,
  transmission: 0.9,        // Прозрачность
  thickness: 0.5,           // Толщина стекла
  envMapIntensity: 1.5,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
})

// Metal (для каркаса)
const metalMaterial = new THREE.MeshStandardMaterial({
  color: '#c0c0c0',
  metalness: 0.9,
  roughness: 0.2,
  envMapIntensity: 2,
})

// Concrete (для основания)
const concreteMaterial = new THREE.MeshStandardMaterial({
  color: '#d4d4d4',
  metalness: 0,
  roughness: 0.8,
})
```

## Lighting Setup

### HDRI Environment
```tsx
import { Environment } from '@react-three/drei'

<Environment
  files="/hdri/studio.hdr"  // Или sunset.hdr для вечера
  background={false}
  blur={0.8}
/>
```

### Lights
```tsx
// Key Light (солнце)
<directionalLight
  position={[10, 20, 10]}
  intensity={1.5}
  castShadow
  shadow-mapSize={[2048, 2048]}
  shadow-camera-far={100}
/>

// Fill Light (заполнение)
<hemisphereLight
  args={['#ffffff', '#444444', 0.6]}
/>

// Rim Light (контур)
<spotLight
  position={[-5, 10, -5]}
  intensity={0.5}
  angle={0.3}
  penumbra={0.5}
/>
```

## Scroll Animation

### GSAP ScrollTrigger
```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Timeline привязанный к scroll
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,          // Smooth scrubbing
  },
})

// Вращение камеры
tl.to(camera.position, {
  x: 5,
  y: 10,
  z: 8,
  duration: 1,
})

// Вращение здания
tl.to(buildingRef.current.rotation, {
  y: Math.PI * 2,
  duration: 2,
}, '<')  // Одновременно с камерой
```

### Секции привязки
```tsx
Hero:     0-20%   scroll → Общий вид, камера далеко
Services: 20-40%  scroll → Приближение, highlight конструкции
Projects: 40-60%  scroll → Поворот, showcase этажей
Process:  60-80%  scroll → Assembly/Explode mode
Contacts: 80-100% scroll → Финальный ракурс, zoom out
```

## Интерактивность

### Hover этажей
```tsx
const [hoveredFloor, setHoveredFloor] = useState(null)

<mesh
  onPointerOver={() => setHoveredFloor(5)}
  onPointerOut={() => setHoveredFloor(null)}
>
  <meshStandardMaterial
    color={hoveredFloor === 5 ? '#C0430B' : '#ffffff'}
    emissive={hoveredFloor === 5 ? '#C0430B' : '#000000'}
    emissiveIntensity={hoveredFloor === 5 ? 0.5 : 0}
  />
</mesh>
```

### Click этажей
```tsx
<mesh
  onClick={() => openFloorModal(5)}
  style={{ cursor: 'pointer' }}
>
```

## Day/Night Mode

```tsx
const [theme, setTheme] = useState('day')

// Lights
<directionalLight
  intensity={theme === 'day' ? 1.5 : 0.3}
  color={theme === 'day' ? '#ffffff' : '#87ceeb'}
/>

// Emissive windows (night only)
{theme === 'night' && (
  <mesh>
    <meshBasicMaterial
      color="#ffeb3b"
      emissive="#ffeb3b"
      emissiveIntensity={0.8}
    />
  </mesh>
)}

// Background
scene.background = theme === 'day'
  ? new THREE.Color('#e0f7fa')
  : new THREE.Color('#0a0e27')
```

## Визуальные эффекты

### Fresnel Edge Glow
```glsl
// Custom shader
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - dot(vNormal, vViewDir), 3.0);
  gl_FragColor = vec4(color, fresnel * 0.5);
}
```

### Shimmer on Glass
```tsx
import { shaderMaterial } from '@react-three/drei'

const ShimmerMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color('#ffffff') },
  // vertex shader
  `varying vec2 vUv;
   void main() {
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }`,
  // fragment shader
  `uniform float time;
   varying vec2 vUv;
   void main() {
     float shimmer = sin(vUv.x * 10.0 + time * 2.0) * 0.1 + 0.9;
     gl_FragColor = vec4(vec3(shimmer), 0.8);
   }`
)
```

## Assembly Animation

```tsx
const [assemblyProgress, setAssemblyProgress] = useState(0)

// Каждый этаж поднимается последовательно
floors.map((floor, i) => {
  const yOffset = Math.max(0, (i - assemblyProgress * floors.length) * 5)

  return (
    <mesh position={[0, floor.y - yOffset, 0]}>
      {/* floor geometry */}
    </mesh>
  )
})

// Анимация по scroll
useEffect(() => {
  gsap.to({ progress: 0 }, {
    progress: 1,
    duration: 2,
    scrollTrigger: {
      trigger: '#process',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    onUpdate: function() {
      setAssemblyProgress(this.targets()[0].progress)
    },
  })
}, [])
```

## Explode Mode

```tsx
const [exploded, setExploded] = useState(false)

floors.map((floor, i) => {
  const explodeOffset = exploded ? i * 2 : 0

  return (
    <mesh position={[0, floor.y + explodeOffset, 0]}>
      {/* floor geometry */}
    </mesh>
  )
})

// Toggle button
<button onClick={() => setExploded(!exploded)}>
  {exploded ? 'Собрать' : 'Разобрать'}
</button>
```

## Performance Optimization

### InstancedMesh для повторяющихся элементов
```tsx
const floorCount = 50

<instancedMesh args={[null, null, floorCount]}>
  <boxGeometry />
  <meshStandardMaterial />
</instancedMesh>
```

### LOD (Level of Detail)
```tsx
import { Lod } from '@react-three/drei'

<Lod distances={[0, 50, 100]}>
  <HighPolyModel />
  <MediumPolyModel />
  <LowPolyModel />
</Lod>
```

### Frustum Culling
```tsx
mesh.frustumCulled = true
```

## Fallback для WebGL

```tsx
const [webglSupported, setWebglSupported] = useState(true)

useEffect(() => {
  const canvas = document.createElement('canvas')
  const supported = !!(
    canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl')
  )
  setWebglSupported(supported)
}, [])

if (!webglSupported) {
  return (
    <div className="fallback-image">
      <img src="/images/burj-khalifa-fallback.jpg" alt="Burj Khalifa" />
    </div>
  )
}
```

## Debugging

### Stats Monitor
```tsx
import { Stats } from '@react-three/drei'

<Canvas>
  <Stats />
  {/* scene */}
</Canvas>
```

### Performance Monitor
```tsx
import { PerformanceMonitor } from '@react-three/drei'

<PerformanceMonitor
  onIncline={() => setDpr(2)}
  onDecline={() => setDpr(1)}
>
  {/* scene */}
</PerformanceMonitor>
```

## Troubleshooting

### ReactSharedInternals Error
```bash
rm -rf node_modules package-lock.json
npm install
```

### Hydration Mismatch
- Убрать все `typeof window !== 'undefined'` из SSR компонентов
- Использовать `'use client'` для 3D компонентов
- Dynamic import с `ssr: false`

### Low FPS
- Уменьшить `dpr` (device pixel ratio)
- Отключить shadows
- Уменьшить shadow-mapSize
- Упростить геометрию
- Отключить postprocessing

### Model not loading
```tsx
// Preload
useGLTF.preload('/models/burj-khalifa.glb')

// Error handling
const { scene, error } = useGLTF('/models/burj-khalifa.glb')
if (error) console.error('Model load error:', error)
```

## Links & Resources

- **R3F Docs**: https://docs.pmnd.rs/react-three-fiber
- **Drei Helpers**: https://github.com/pmndrs/drei
- **GSAP Docs**: https://greensock.com/docs/
- **Three.js Examples**: https://threejs.org/examples/
- **Sketchfab**: https://sketchfab.com/ (модели)
- **HDRI Haven**: https://polyhaven.com/hdris (окружение)
