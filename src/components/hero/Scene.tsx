"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape({ isMobile, reducedMotion }: { isMobile: boolean; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && !reducedMotion) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (isMobile ? 0.1 : 0.2);
      meshRef.current.rotation.y = state.clock.elapsedTime * (isMobile ? 0.15 : 0.3);
    }
  });

  return (
    <Float speed={reducedMotion ? 0 : (isMobile ? 1 : 2)} rotationIntensity={reducedMotion ? 0 : 0.5} floatIntensity={reducedMotion ? 0 : 1}>
      <mesh ref={meshRef} scale={isMobile ? 0.9 : 1.2}>
        <icosahedronGeometry args={[1, isMobile ? 2 : 4]} />
        <MeshDistortMaterial
          color="#1a1a2e"
          emissive="#444466"
          wireframe={true}
          distort={reducedMotion ? 0 : (isMobile ? 0.2 : 0.4)}
          speed={reducedMotion ? 0 : (isMobile ? 1 : 2)}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.55}
        />
      </mesh>
      
      {/* Inner solid core */}
      <mesh scale={isMobile ? 0.4 : 0.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#aaaacc" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mobileQuery.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReducedMotion(motionQuery.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mobileQuery.addEventListener("change", handleMobile);
    motionQuery.addEventListener("change", handleMotion);

    return () => {
      mobileQuery.removeEventListener("change", handleMobile);
      motionQuery.removeEventListener("change", handleMotion);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: true }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4444ff" />
        
        <AbstractShape isMobile={isMobile} reducedMotion={reducedMotion} />
        
        {!reducedMotion && (
          <Sparkles 
            count={isMobile ? 30 : 100} 
            scale={10} 
            size={isMobile ? 1.5 : 2} 
            speed={isMobile ? 0.2 : 0.4} 
            opacity={0.35} 
            color="#333366" 
          />
        )}
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
