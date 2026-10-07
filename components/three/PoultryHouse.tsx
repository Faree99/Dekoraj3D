"use client";

import { useFrame } from "@react-three/fiber";
import {
  MutableRefObject,
  useRef,
} from "react";
import * as THREE from "three";

type Props = {
  progress: MutableRefObject<number>;
};

function stage(
  progress: number,
  start: number,
  end: number
) {
  return THREE.MathUtils.smoothstep(
    progress,
    start,
    end
  );
}

export default function PoultryHouse({
  progress,
}: Props) {
  const foundation =
    useRef<THREE.Group>(null);

  const columns =
    useRef<THREE.Group>(null);

  const roof =
    useRef<THREE.Group>(null);

  const walls =
    useRef<THREE.Group>(null);

  const equipment =
    useRef<THREE.Group>(null);

  const silos =
    useRef<THREE.Group>(null);

  const coldRoom =
    useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.current;

    const foundationP = stage(
      p,
      0.15,
      0.28
    );

    const columnsP = stage(
      p,
      0.25,
      0.42
    );

    const roofP = stage(
      p,
      0.38,
      0.53
    );

    const wallsP = stage(
      p,
      0.45,
      0.6
    );

    const equipmentP = stage(
      p,
      0.55,
      0.7
    );

    const siloP = stage(
      p,
      0.62,
      0.76
    );

    const ecosystemP = stage(
      p,
      0.73,
      0.9
    );

    if (foundation.current) {
      foundation.current.position.y =
        THREE.MathUtils.lerp(
          -0.8,
          0,
          foundationP
        );
    }

    if (columns.current) {
      columns.current.scale.y =
        Math.max(0.001, columnsP);
    }

    if (roof.current) {
      roof.current.position.y =
        THREE.MathUtils.lerp(
          3.5,
          0,
          roofP
        );

      roof.current.rotation.z =
        THREE.MathUtils.lerp(
          0.08,
          0,
          roofP
        );
    }

    if (walls.current) {
      walls.current.scale.y =
        Math.max(0.001, wallsP);
    }

    if (equipment.current) {
      equipment.current.scale.setScalar(
        Math.max(0.001, equipmentP)
      );
    }

    if (silos.current) {
      silos.current.scale.setScalar(
        Math.max(0.001, siloP)
      );
    }

    if (coldRoom.current) {
      coldRoom.current.scale.setScalar(
        Math.max(0.001, ecosystemP)
      );
    }
  });

  return (
    <group position={[0, 0, -0.4]}>
      {/* =====================================
          FOUNDATION
      ====================================== */}

      <group ref={foundation}>
        <mesh
          receiveShadow
          position={[-0.7, 0.05, 0]}
        >
          <boxGeometry
            args={[5.3, 0.18, 2.5]}
          />

          <meshStandardMaterial
            color="#B4B3A8"
            roughness={0.9}
          />
        </mesh>
      </group>

      {/* =====================================
          STEEL COLUMNS
      ====================================== */}

      <group
        ref={columns}
        position={[0, 0.15, 0]}
      >
        {[-3, -2, -1, 0, 1].map(
          (xIndex) =>
            [-1, 1].map((side) => (
              <mesh
                castShadow
                key={`${xIndex}-${side}`}
                position={[
                  xIndex * 0.85,
                  0.9,
                  side * 0.95,
                ]}
              >
                <boxGeometry
                  args={[0.09, 1.8, 0.09]}
                />

                <meshStandardMaterial
                  color="#6F7D78"
                  metalness={0.65}
                  roughness={0.35}
                />
              </mesh>
            ))
        )}

        {/* roof beams */}

        {[-3, -2, -1, 0, 1].map(
          (xIndex) => (
            <mesh
              key={`beam-${xIndex}`}
              position={[
                xIndex * 0.85,
                1.75,
                0,
              ]}
            >
              <boxGeometry
                args={[0.08, 0.08, 2]}
              />

              <meshStandardMaterial
                color="#71817A"
                metalness={0.65}
              />
            </mesh>
          )
        )}
      </group>

      {/* =====================================
          WALLS
      ====================================== */}

      <group ref={walls}>
        {/* left */}

        <mesh
          castShadow
          position={[-0.7, 0.75, -1.05]}
        >
          <boxGeometry
            args={[5.1, 1.25, 0.1]}
          />

          <meshStandardMaterial
            color="#D7DDD8"
            roughness={0.6}
          />
        </mesh>

        {/* right */}

        <mesh
          castShadow
          position={[-0.7, 0.75, 1.05]}
        >
          <boxGeometry
            args={[5.1, 1.25, 0.1]}
          />

          <meshStandardMaterial
            color="#D7DDD8"
            roughness={0.6}
          />
        </mesh>

        {/* end wall */}

        <mesh
          castShadow
          position={[-3.25, 0.75, 0]}
        >
          <boxGeometry
            args={[0.1, 1.25, 2.1]}
          />

          <meshStandardMaterial
            color="#CDD5CF"
          />
        </mesh>
      </group>

      {/* =====================================
          ROOF
      ====================================== */}

      <group ref={roof}>
        <mesh
          castShadow
          position={[-0.7, 1.95, -0.57]}
          rotation={[0.35, 0, 0]}
        >
          <boxGeometry
            args={[5.5, 0.09, 1.35]}
          />

          <meshStandardMaterial
            color="#80958A"
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>

        <mesh
          castShadow
          position={[-0.7, 1.95, 0.57]}
          rotation={[-0.35, 0, 0]}
        >
          <boxGeometry
            args={[5.5, 0.09, 1.35]}
          />

          <meshStandardMaterial
            color="#80958A"
            metalness={0.45}
            roughness={0.35}
          />
        </mesh>

        {/* solar panels */}

        {[-2.2, -1.1, 0, 1.1].map(
          (x) => (
            <mesh
              key={x}
              position={[x, 2.15, -0.58]}
              rotation={[0.35, 0, 0]}
            >
              <boxGeometry
                args={[0.75, 0.035, 0.7]}
              />

              <meshStandardMaterial
                color="#153D4C"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )
        )}
      </group>

      {/* =====================================
          INTERNAL EQUIPMENT
      ====================================== */}

      <group ref={equipment}>
        {/* feeder lines */}

        {[-0.55, 0, 0.55].map(
          (z) => (
            <group key={z}>
              <mesh
                position={[
                  -0.7,
                  0.34,
                  z,
                ]}
              >
                <boxGeometry
                  args={[4.4, 0.05, 0.05]}
                />

                <meshStandardMaterial
                  color="#E5B847"
                  metalness={0.2}
                />
              </mesh>

              {[-2.4, -1.6, -0.8, 0, 0.8].map(
                (x) => (
                  <mesh
                    key={x}
                    position={[
                      x,
                      0.2,
                      z,
                    ]}
                  >
                    <cylinderGeometry
                      args={[
                        0.12,
                        0.18,
                        0.18,
                        16,
                      ]}
                    />

                    <meshStandardMaterial color="#E5B847" />
                  </mesh>
                )
              )}
            </group>
          )
        )}
      </group>

      {/* =====================================
          SILOS
      ====================================== */}

      <group
        ref={silos}
        position={[2.8, 0, -0.55]}
      >
        {[0, 0.75].map((x) => (
          <group
            key={x}
            position={[x, 0, 0]}
          >
            <mesh
              castShadow
              position={[0, 0.85, 0]}
            >
              <cylinderGeometry
                args={[
                  0.32,
                  0.38,
                  1.45,
                  32,
                ]}
              />

              <meshStandardMaterial
                color="#B8C4BD"
                metalness={0.55}
                roughness={0.3}
              />
            </mesh>

            <mesh
              castShadow
              position={[0, 1.68, 0]}
            >
              <coneGeometry
                args={[0.34, 0.32, 32]}
              />

              <meshStandardMaterial
                color="#96A69D"
                metalness={0.5}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =====================================
          COLD STORAGE / ECOSYSTEM
      ====================================== */}

      <group
        ref={coldRoom}
        position={[3.6, 0, 1.75]}
      >
        <mesh
          castShadow
          position={[0, 0.65, 0]}
        >
          <boxGeometry
            args={[2, 1.3, 1.6]}
          />

          <meshStandardMaterial
            color="#E0E6E1"
            roughness={0.5}
          />
        </mesh>

        {/* green brand strip */}

        <mesh
          position={[0, 0.95, 0.81]}
        >
          <boxGeometry
            args={[1.65, 0.12, 0.03]}
          />

          <meshStandardMaterial
            color="#24B866"
            emissive="#24B866"
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* door */}

        <mesh
          position={[0, 0.52, 0.82]}
        >
          <boxGeometry
            args={[0.72, 0.75, 0.04]}
          />

          <meshStandardMaterial
            color="#78978D"
            metalness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}