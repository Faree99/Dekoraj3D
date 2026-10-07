"use client";

import { useFrame } from "@react-three/fiber";
import {
  MutableRefObject,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

type Props = {
  progress: MutableRefObject<number>;
};

export default function ConstructionParticles({
  progress,
}: Props) {
  const points =
    useRef<THREE.Points>(null);

  const material =
    useRef<THREE.PointsMaterial>(null);

  const positions = useMemo(() => {
    const count = 80;

    const array =
      new Float32Array(count * 3);

    for (
      let i = 0;
      i < count;
      i++
    ) {
      array[i * 3] =
        (Math.random() - 0.5) * 6;

      array[i * 3 + 1] =
        Math.random() * 2.5;

      array[i * 3 + 2] =
        (Math.random() - 0.5) * 3;
    }

    return array;
  }, []);

  useFrame((state) => {
    const p = progress.current;

    /*
     * Visible primarily during construction.
     */

    const enter =
      THREE.MathUtils.smoothstep(
        p,
        0.18,
        0.3
      );

    const leave =
      THREE.MathUtils.smoothstep(
        p,
        0.52,
        0.68
      );

    if (material.current) {
      material.current.opacity =
        enter * (1 - leave) * 0.28;
    }

    if (points.current) {
      points.current.rotation.y =
        state.clock.elapsedTime * 0.025;

      points.current.position.y =
        Math.sin(
          state.clock.elapsedTime * 0.3
        ) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        ref={material}
        size={0.035}
        color="#E8D6AC"
        transparent
        opacity={0}
        depthWrite={false}
      />
    </points>
  );
}