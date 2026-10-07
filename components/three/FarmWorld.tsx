"use client";

import { MutableRefObject } from "react";

import FarmEnvironment from "./FarmEnvironment";
import PoultryHouse from "./PoultryHouse";
import ConstructionParticles from "./ConstructionParticles";

type Props = {
  progress: MutableRefObject<number>;
};

export default function FarmWorld({
  progress,
}: Props) {
  return (
    <group
      position={[2.6, -1.3, 0]}
      rotation={[0, -0.32, 0]}
    >
      <FarmEnvironment progress={progress} />

      <PoultryHouse progress={progress} />

      <ConstructionParticles progress={progress} />
    </group>
  );
}