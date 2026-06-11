'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Edges } from '@react-three/drei'
import * as THREE from 'three'

interface BuildingProps {
  explodeOffset?: number
  accentIntensity?: number
  rotation?: [number, number, number]
}

export function Building({ explodeOffset = 0, accentIntensity = 0, rotation = [0, 0, 0] }: BuildingProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Subtle idle animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  // Floor configurations (procedural building: 5 floors)
  const floors = [
    { y: 0, height: 1.5, width: 4, depth: 3 },
    { y: 1.8, height: 1.2, width: 3.6, depth: 2.8 },
    { y: 3.3, height: 1.2, width: 3.2, depth: 2.6 },
    { y: 4.8, height: 1, width: 2.8, depth: 2.4 },
    { y: 6.1, height: 0.8, width: 2.4, depth: 2.2 },
  ]

  // Materials
  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: '#D4D4D4',
    roughness: 0.8,
    metalness: 0.1,
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#FFFFFF',
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    transparent: true,
    opacity: 0.3,
  })

  const accentColor = new THREE.Color('#C0430B')

  return (
    <group ref={groupRef} rotation={rotation}>
      {floors.map((floor, index) => {
        const yOffset = index * explodeOffset * 0.5

        return (
          <group key={index} position={[0, floor.y + yOffset, 0]}>
            {/* Concrete base */}
            <mesh material={concreteMaterial} castShadow receiveShadow>
              <boxGeometry args={[floor.width, floor.height, floor.depth]} />
            </mesh>

            {/* Glass panels (front/back) */}
            <mesh position={[0, 0, floor.depth / 2 + 0.01]} material={glassMaterial}>
              <planeGeometry args={[floor.width * 0.8, floor.height * 0.7]} />
            </mesh>
            <mesh position={[0, 0, -(floor.depth / 2 + 0.01)]} material={glassMaterial} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[floor.width * 0.8, floor.height * 0.7]} />
            </mesh>

            {/* Accent edges */}
            <mesh>
              <boxGeometry args={[floor.width, floor.height, floor.depth]} />
              <Edges
                threshold={15}
                color={accentColor}
                lineWidth={1 + accentIntensity * 2}
              />
            </mesh>

            {/* Accent corner pillars */}
            {[
              [-floor.width / 2, 0, -floor.depth / 2],
              [floor.width / 2, 0, -floor.depth / 2],
              [-floor.width / 2, 0, floor.depth / 2],
              [floor.width / 2, 0, floor.depth / 2],
            ].map((pos, i) => (
              <mesh key={i} position={pos as [number, number, number]}>
                <boxGeometry args={[0.05, floor.height + 0.1, 0.05]} />
                <meshStandardMaterial
                  color={accentColor}
                  emissive={accentColor}
                  emissiveIntensity={accentIntensity * 0.5}
                />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Ground plane */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#E5E5E5" roughness={0.9} />
      </mesh>
    </group>
  )
}
