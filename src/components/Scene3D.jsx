import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial, Icosahedron } from '@react-three/drei'

function Orb() {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.0015
    ref.current.rotation.y += 0.0022
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * .35) * .08
  })
  return <Float speed={1.2} rotationIntensity={.35} floatIntensity={1.1}><Icosahedron ref={ref} args={[1.55, 5]} scale={[1,1,1]}><MeshDistortMaterial color="#7c3aed" roughness={.25} metalness={.65} distort={.32} speed={1.5} /></Icosahedron></Float>
}

export default function Scene3D() {
  const [supported, setSupported] = useState(true)
  useEffect(() => {
    try { setSupported(Boolean(document.createElement('canvas').getContext('webgl'))) } catch { setSupported(false) }
  }, [])
  if (!supported) return null
  const seed = useMemo(() => Math.random() * 100, [])
  return <div className="absolute inset-0 opacity-80 pointer-events-none" aria-hidden="true"><Canvas camera={{ position:[0,0,5], fov:50 }} dpr={[1,1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
    <ambientLight intensity={1.1} />
    <directionalLight position={[3,3,4]} intensity={2.2} color="#c4b5fd" />
    <pointLight position={[-3,-1,2]} intensity={12} distance={8} color="#22d3ee" />
    <Suspense fallback={null}><Orb /><Sparkles count={seed > -1 ? 75 : 50} scale={[10,7,5]} size={2.2} speed={.25} opacity={.5} /></Suspense>
  </Canvas></div>
}
