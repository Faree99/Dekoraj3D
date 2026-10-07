"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";

import FarmScene from "./FarmScene";

export default function FarmExperience() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[9, 7, 11]}
        fov={34}
      />

      <ambientLight intensity={0.7} />

      <hemisphereLight
        intensity={1.2}
        color="#DFFFE9"
        groundColor="#14281D"
      />

      <directionalLight
        castShadow
        position={[8, 12, 6]}
        intensity={3}
        color="#FFF6D9"
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight
        position={[-5, 4, 2]}
        intensity={12}
        color="#24B866"
        distance={15}
      />

      <Suspense fallback={null}>
        <FarmScene />

        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}