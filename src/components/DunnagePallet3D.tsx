"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export default function DunnagePallet3D() {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  const materialProps = {
    color: "#222222",
    metalness: 0.8,
    roughness: 0.2,
  };

  const accentMaterial = {
    color: "#ff5e00",
    metalness: 0.5,
    roughness: 0.1,
  };

  return (
    <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
      {/* Top Deck */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 0.2, 3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      
      {/* Accents/Grips on top */}
      <mesh position={[0, 0.61, 0]}>
        <boxGeometry args={[3.8, 0.02, 2.8]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Center Block */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial {...accentMaterial} />
      </mesh>

      {/* Corner Blocks */}
      <mesh position={[1.75, 0.15, 1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-1.75, 0.15, 1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[1.75, 0.15, -1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-1.75, 0.15, -1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Middle side blocks */}
      <mesh position={[1.75, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-1.75, 0.15, 0]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 0.15, 1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, 0.15, -1.25]}>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Bottom Deck Boards */}
      <mesh position={[1.75, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.1, 3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-1.75, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.1, 3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.4, 0.1, 3]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </group>
  );
}
