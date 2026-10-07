"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useFarmScroll } from "@/hooks/useFarmScroll";
import FarmWorld from "./FarmWorld";

export default function FarmScene() {
  const progress = useFarmScroll();

  const { camera } = useThree();

  const smoothProgress = useRef(0);

  useFrame((_, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      progress,
      4,
      delta
    );

    const p = smoothProgress.current;

    /*
     * Camera journey
     *
     * p = 0     opening overview
     * p = .3    approach land
     * p = .6    construction
     * p = 1     final reveal
     */

    const start = new THREE.Vector3(
      10,
      7.5,
      12
    );

    const middle = new THREE.Vector3(
      7,
      5.2,
      8
    );

    const final = new THREE.Vector3(
      11,
      9,
      14
    );

    let targetPosition = new THREE.Vector3();

    if (p < 0.55) {
      targetPosition.lerpVectors(
        start,
        middle,
        p / 0.55
      );
    } else {
      targetPosition.lerpVectors(
        middle,
        final,
        (p - 0.55) / 0.45
      );
    }

    camera.position.lerp(
      targetPosition,
      0.06
    );

    /*
     * Slowly rotate where the camera looks.
     */

    const lookX = THREE.MathUtils.lerp(
      1,
      0,
      p
    );

    const lookY = THREE.MathUtils.lerp(
      0,
      0.3,
      p
    );

    camera.lookAt(
      lookX,
      lookY,
      0
    );
  });

  return (
    <FarmWorld
      progress={smoothProgress}
    />
  );
}