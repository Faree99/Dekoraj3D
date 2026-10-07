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

type TreeData = {
  position: [number, number, number];
  scale: number;
  rotation: number;
  canopyScale: [number, number, number];
  color: string;
};

type GrassPatch = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation: number;
  color: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453;
  return x - Math.floor(x);
}

export default function FarmEnvironment({
  progress,
}: Props) {
  const developedLand = useRef<THREE.Group>(null);
  const road = useRef<THREE.Mesh>(null);
  const secondaryRoad = useRef<THREE.Mesh>(null);
  const trees = useRef<THREE.Group>(null);
  const landscaping = useRef<THREE.Group>(null);
  const survey = useRef<THREE.Group>(null);

  /*
   * ============================================================
   * NATURAL TREE DISTRIBUTION
   * ============================================================
   *
   * Trees stay mostly OUTSIDE the active construction area.
   */

  const treeData = useMemo<TreeData[]>(() => {
    const trees: TreeData[] = [];

    for (let i = 0; i < 75; i++) {
      const angle =
        seededRandom(i + 10) * Math.PI * 2;

      const distance =
        8.5 + seededRandom(i + 20) * 20;

      let x =
        Math.cos(angle) * distance +
        (seededRandom(i + 30) - 0.5) * 5;

      let z =
        Math.sin(angle) * distance +
        (seededRandom(i + 40) - 0.5) * 5;

      /*
       * Keep the main farm/construction area
       * relatively clear.
       */

      if (
        Math.abs(x) < 7 &&
        Math.abs(z) < 5
      ) {
        x *= 1.8;
        z *= 1.8;
      }

      const scale =
        0.65 + seededRandom(i + 50) * 1.15;

      const canopyX =
        0.8 + seededRandom(i + 60) * 0.8;

      const canopyY =
        0.55 + seededRandom(i + 70) * 0.5;

      const canopyZ =
        0.8 + seededRandom(i + 80) * 0.8;

      const colors = [
        "#52633C",
        "#617047",
        "#465B38",
        "#6A7248",
        "#3F5436",
      ];

      trees.push({
        position: [x, 0, z],
        scale,
        rotation:
          seededRandom(i + 90) * Math.PI * 2,
        canopyScale: [
          canopyX,
          canopyY,
          canopyZ,
        ],
        color:
          colors[
            Math.floor(
              seededRandom(i + 100) *
                colors.length
            )
          ],
      });
    }

    return trees;
  }, []);

  /*
   * ============================================================
   * SMALL VEGETATION / GRASS PATCHES
   * ============================================================
   */

  const grassPatches = useMemo<GrassPatch[]>(
    () => {
      const patches: GrassPatch[] = [];

      for (let i = 0; i < 55; i++) {
        const x =
          -6.8 + seededRandom(i + 200) * 13.6;

        const z =
          -4.6 + seededRandom(i + 300) * 9.2;

        /*
         * Avoid central road.
         */

        if (Math.abs(x) < 0.8) {
          continue;
        }

        const size =
          0.25 +
          seededRandom(i + 400) * 0.7;

        const colors = [
          "#65784B",
          "#758352",
          "#536C45",
          "#89905C",
        ];

        patches.push({
          position: [
            x,
            0.018,
            z,
          ],

          scale: [
            size,
            1,
            size *
              (0.7 +
                seededRandom(i + 500)),
          ],

          rotation:
            seededRandom(i + 600) *
            Math.PI,

          color:
            colors[
              Math.floor(
                seededRandom(i + 700) *
                  colors.length
              )
            ],
        });
      }

      return patches;
    },
    []
  );

  useFrame(() => {
    const p = progress.current;

    /*
     * ========================================
     * DEVELOPED LAND
     * ========================================
     */

    const developmentProgress =
      THREE.MathUtils.smoothstep(
        p,
        0.52,
        0.78
      );

    if (developedLand.current) {
      developedLand.current.scale.y =
        Math.max(
          0.001,
          developmentProgress
        );

      developedLand.current.visible =
        developmentProgress > 0.001;
    }

    /*
     * ========================================
     * MAIN ACCESS ROAD
     * ========================================
     */

    const roadProgress =
      THREE.MathUtils.smoothstep(
        p,
        0.1,
        0.3
      );

    if (road.current) {
      road.current.scale.z =
        Math.max(0.001, roadProgress);
    }

    /*
     * ========================================
     * SECONDARY ROAD
     * ========================================
     */

    const secondaryProgress =
      THREE.MathUtils.smoothstep(
        p,
        0.2,
        0.38
      );

    if (secondaryRoad.current) {
      secondaryRoad.current.scale.x =
        Math.max(
          0.001,
          secondaryProgress
        );
    }

    /*
     * ========================================
     * EXISTING NATURAL VEGETATION
     *
     * Always present.
     * ========================================
     */

    if (trees.current) {
      trees.current.visible = true;
    }

    /*
     * ========================================
     * FINISHED LANDSCAPING
     * ========================================
     */

    const landscapeProgress =
      THREE.MathUtils.smoothstep(
        p,
        0.66,
        0.9
      );

    if (landscaping.current) {
      landscaping.current.scale.y =
        Math.max(
          0.001,
          landscapeProgress
        );

      landscaping.current.visible =
        landscapeProgress > 0.001;
    }

    /*
     * ========================================
     * SURVEY GRID
     *
     * Appears during early planning,
     * disappears when construction begins.
     * ========================================
     */

    if (survey.current) {
      let opacity = 0;

      if (p < 0.08) {
        opacity = p / 0.08;
      } else if (p < 0.22) {
        opacity = 1;
      } else if (p < 0.32) {
        opacity =
          1 -
          (p - 0.22) / 0.1;
      }

      survey.current.visible =
        opacity > 0.01;

      survey.current.traverse(
        (object) => {
          if (
            object instanceof THREE.Mesh
          ) {
            const material =
              object.material as THREE.MeshBasicMaterial;

            material.opacity =
              opacity * 0.16;
          }
        }
      );
    }
  });

  return (
    <group>
      {/* =====================================================
          MASSIVE BACKGROUND TERRAIN

          Extends well beyond the camera.
      ====================================================== */}

      <mesh
        receiveShadow
        position={[0, -0.16, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[80, 80, 32, 32]}
        />

        <meshStandardMaterial
          color="#927B58"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* =====================================================
          LARGE SOIL VARIATION

          These irregular transparent areas help break
          the perfectly uniform ground.
      ====================================================== */}

      <mesh
        receiveShadow
        position={[-11, -0.145, -8]}
        rotation={[
          -Math.PI / 2,
          0,
          0.2,
        ]}
      >
        <circleGeometry args={[10, 32]} />

        <meshStandardMaterial
          color="#806A4C"
          roughness={1}
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh
        receiveShadow
        position={[13, -0.143, 7]}
        rotation={[
          -Math.PI / 2,
          0,
          -0.4,
        ]}
      >
        <circleGeometry args={[13, 32]} />

        <meshStandardMaterial
          color="#A18A62"
          roughness={1}
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh
        receiveShadow
        position={[7, -0.14, -15]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry args={[9, 32]} />

        <meshStandardMaterial
          color="#746047"
          roughness={1}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* =====================================================
          ACTIVE FARM SITE

          Slightly different soil because the land has
          been cleared / graded.
      ====================================================== */}

      <mesh
        receiveShadow
        position={[0, -0.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[14.5, 10]}
        />

        <meshStandardMaterial
          color="#A58C64"
          roughness={0.98}
        />
      </mesh>

      {/* =====================================================
          DEVELOPED / GREEN LAND
      ====================================================== */}

      <group ref={developedLand}>
        <mesh
          receiveShadow
          position={[0, -0.085, 0]}
          rotation={[
            -Math.PI / 2,
            0,
            0,
          ]}
        >
          <planeGeometry
            args={[14.2, 9.7]}
          />

          <meshStandardMaterial
            color="#69784D"
            roughness={1}
          />
        </mesh>
      </group>

      {/* =====================================================
          MAIN GRAVEL ACCESS ROAD
      ====================================================== */}

      <mesh
        ref={road}
        receiveShadow
        position={[0, -0.045, 3.2]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[1.25, 7.5]}
        />

        <meshStandardMaterial
          color="#8A8578"
          roughness={1}
        />
      </mesh>

      {/* Road centre variation */}

      <mesh
        position={[0, -0.038, 3.2]}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <planeGeometry
          args={[0.85, 7.5]}
        />

        <meshStandardMaterial
          color="#9B9586"
          roughness={1}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* =====================================================
          SECONDARY FARM ROAD
      ====================================================== */}

      <mesh
        ref={secondaryRoad}
        receiveShadow
        position={[1.9, -0.04, 0]}
        rotation={[
          -Math.PI / 2,
          0,
          Math.PI / 2,
        ]}
      >
        <planeGeometry
          args={[0.9, 5.7]}
        />

        <meshStandardMaterial
          color="#8D887C"
          roughness={1}
        />
      </mesh>

      {/* =====================================================
          SURVEY / CONSTRUCTION GRID
      ====================================================== */}

      <group ref={survey}>
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <mesh
            key={`survey-x-${index}`}
            position={[
              -4.5 + index,
              -0.025,
              0,
            ]}
          >
            <boxGeometry
              args={[
                0.012,
                0.008,
                7,
              ]}
            />

            <meshBasicMaterial
              color="#B8E4C7"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}

        {Array.from({
          length: 8,
        }).map((_, index) => (
          <mesh
            key={`survey-z-${index}`}
            position={[
              0,
              -0.024,
              -3.5 + index,
            ]}
          >
            <boxGeometry
              args={[
                10,
                0.008,
                0.012,
              ]}
            />

            <meshBasicMaterial
              color="#B8E4C7"
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* =====================================================
          NATURAL EXISTING TREES
      ====================================================== */}

      <group ref={trees}>
        {treeData.map(
          (
            {
              position,
              scale,
              rotation,
              canopyScale,
              color,
            },
            index
          ) => (
            <group
              key={index}
              position={position}
              rotation={[
                0,
                rotation,
                0,
              ]}
              scale={scale}
            >
              {/* trunk */}

              <mesh
                castShadow
                position={[0, 0.48, 0]}
              >
                <cylinderGeometry
                  args={[
                    0.07,
                    0.12,
                    0.95,
                    7,
                  ]}
                />

                <meshStandardMaterial
                  color="#5A4533"
                  roughness={1}
                />
              </mesh>

              {/* lower canopy */}

              <mesh
                castShadow
                position={[
                  -0.18,
                  1.05,
                  0.05,
                ]}
                scale={canopyScale}
              >
                <dodecahedronGeometry
                  args={[0.55, 0]}
                />

                <meshStandardMaterial
                  color={color}
                  roughness={1}
                />
              </mesh>

              {/* upper canopy */}

              <mesh
                castShadow
                position={[
                  0.24,
                  1.17,
                  -0.08,
                ]}
                scale={[
                  canopyScale[0] *
                    0.72,

                  canopyScale[1] *
                    0.8,

                  canopyScale[2] *
                    0.72,
                ]}
              >
                <dodecahedronGeometry
                  args={[0.48, 0]}
                />

                <meshStandardMaterial
                  color={color}
                  roughness={1}
                />
              </mesh>
            </group>
          )
        )}
      </group>

      {/* =====================================================
          FINISHED LANDSCAPING
      ====================================================== */}

      <group ref={landscaping}>
        {grassPatches.map(
          (
            {
              position,
              scale,
              rotation,
              color,
            },
            index
          ) => (
            <mesh
              key={index}
              position={position}
              rotation={[
                -Math.PI / 2,
                0,
                rotation,
              ]}
              scale={scale}
            >
              <circleGeometry
                args={[
                  0.42,
                  7,
                ]}
              />

              <meshStandardMaterial
                color={color}
                roughness={1}
                transparent
                opacity={0.85}
              />
            </mesh>
          )
        )}
      </group>

      {/* =====================================================
          FARM BOUNDARY POSTS
      ====================================================== */}

      {Array.from({
        length: 12,
      }).map((_, index) => {
        const x =
          -6.8 +
          index *
            (13.6 / 11);

        return (
          <group key={index}>
            <mesh
              castShadow
              position={[
                x,
                0.35,
                -4.7,
              ]}
            >
              <boxGeometry
                args={[
                  0.08,
                  0.7,
                  0.08,
                ]}
              />

              <meshStandardMaterial
                color="#5B574C"
                roughness={1}
              />
            </mesh>

            <mesh
              castShadow
              position={[
                x,
                0.35,
                4.7,
              ]}
            >
              <boxGeometry
                args={[
                  0.08,
                  0.7,
                  0.08,
                ]}
              />

              <meshStandardMaterial
                color="#5B574C"
                roughness={1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}