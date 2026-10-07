"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { useFarmScroll } from "@/hooks/useFarmScroll";

const stages = [
  {
    start: 0,
    end: 0.145,
    eyebrow: "Agriculture · Infrastructure · Technology",
    title: (
      <>
        From empty land.
        <br />
        <span className="text-[#83E8A7]">
          To productive farms.
        </span>
      </>
    ),
    description:
      "Dekoraj develops the infrastructure behind modern agriculture — from farm construction and equipment to processing, storage and financing.",
    cta: true,
    align: "center",
  },

  {
    start: 0.19,
    end: 0.31,
    eyebrow: "01 · Site Development",
    title: (
      <>
        It starts
        <br />
        with the land.
      </>
    ),
    description:
      "Planning, preparation and infrastructure designed around the operation the farm needs to become.",
    align: "left",
  },

  {
    start: 0.36,
    end: 0.48,
    eyebrow: "02 · Construction",
    title: (
      <>
        Structure takes
        <br />
        <span className="text-[#83E8A7]">shape.</span>
      </>
    ),
    description:
      "Purpose-built agricultural housing engineered for efficient, reliable production.",
    align: "right",
  },

  {
    start: 0.53,
    end: 0.65,
    eyebrow: "03 · Farm Systems",
    title: (
      <>
        Then we make it
        <br />
        <span className="text-[#83E8A7]">work.</span>
      </>
    ),
    description:
      "Feeding, watering, ventilation, energy and essential production systems come together.",
    align: "left",
  },

  {
    start: 0.7,
    end: 0.82,
    eyebrow: "04 · Integrated Infrastructure",
    title: (
      <>
        One farm.
        <br />
        One ecosystem.
      </>
    ),
    description:
      "Production, storage, processing, energy and logistics designed to operate as one connected system.",
    align: "right",
  },

  {
    start: 0.87,
    end: 1,
    eyebrow: "Dekoraj Group",
    title: (
      <>
        From concept
        <br />
        <span className="text-[#83E8A7]">
          to operation.
        </span>
      </>
    ),
    description:
      "Build the agricultural infrastructure your next project needs.",
    cta: true,
    align: "center",
  },
] as const;

function getOpacity(
  progress: number,
  start: number,
  end: number
) {
  const fade = 0.018;

  if (progress < start || progress > end) return 0;

  if (progress < start + fade) {
    return (progress - start) / fade;
  }

  if (progress > end - fade) {
    return (end - progress) / fade;
  }

  return 1;
}

export default function HeroCopy() {
  const progress = useFarmScroll();

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {stages.map((stage, index) => {
        const opacity = Math.max(
          0,
          Math.min(
            1,
            getOpacity(
              progress,
              stage.start,
              stage.end
            )
          )
        );

        const center = stage.align === "center";
        const right = stage.align === "right";

        return (
          <motion.div
            key={index}
            animate={{
              opacity,
              y: opacity > 0 ? 0 : 20,
            }}
            transition={{
              duration: 0.12,
              ease: "linear",
            }}
            style={{
              visibility:
                opacity <= 0.001
                  ? "hidden"
                  : "visible",
            }}
            className={`
              absolute
              inset-0
              flex
              px-5
              pb-24
              pt-[120px]
              sm:px-8
              sm:pt-[130px]
              lg:px-12
              lg:pb-28
              lg:pt-[135px]
              xl:px-16

              ${
                center
                  ? "items-center justify-center text-center"
                  : "items-end"
              }
            `}
          >
            <div
              className={`
                w-full

                ${
                  center
                    ? "mx-auto max-w-[1050px]"
                    : right
                      ? "ml-auto max-w-[690px] text-left lg:text-right"
                      : "mr-auto max-w-[690px]"
                }
              `}
            >
              {/* Eyebrow */}

              <div
                className={`
                  mb-5
                  flex
                  items-center
                  gap-3

                  ${
                    center
                      ? "justify-center"
                      : right
                        ? "lg:justify-end"
                        : ""
                  }
                `}
              >
                {!center && !right && (
                  <span className="h-px w-7 bg-[#83E8A7]" />
                )}

                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#83E8A7] sm:text-[11px]">
                  {stage.eyebrow}
                </p>

                {right && (
                  <span className="hidden h-px w-7 bg-[#83E8A7] lg:block" />
                )}
              </div>

              {/* Main title */}

              <h1
                className={`
                  font-medium
                  leading-[0.91]
                  tracking-[-0.06em]
                  text-white

                  ${
                    center
                      ? "text-[clamp(3.2rem,7vw,8.5rem)]"
                      : "text-[clamp(3rem,5.8vw,7rem)]"
                  }
                `}
              >
                {stage.title}
              </h1>

              {/* Description */}

              <p
                className={`
                  mt-6
                  text-[15px]
                  leading-[1.7]
                  text-white/70
                  sm:text-base

                  ${
                    center
                      ? "mx-auto max-w-[650px]"
                      : right
                        ? "max-w-[520px] lg:ml-auto"
                        : "max-w-[520px]"
                  }
                `}
              >
                {stage.description}
              </p>

              {stage.cta && (
                <div
                  className={`
                    pointer-events-auto
                    mt-7
                    flex
                    flex-wrap
                    gap-3

                    ${
                      center
                        ? "justify-center"
                        : ""
                    }
                  `}
                >
                  <Link
                    href="/farm-projects"
                    className="group flex h-[52px] items-center rounded-full bg-[#25B96B] px-7 text-[13px] font-semibold text-white transition-all hover:bg-[#83E8A7] hover:text-[#101511]"
                  >
                    Start a Farm Project

                    <ArrowUpRight
                      size={15}
                      className="ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>

                  <Link
                    href="/solutions"
                    className="group flex h-[52px] items-center rounded-full border border-white/30 bg-black/10 px-7 text-[13px] font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-[#101511]"
                  >
                    Explore Solutions

                    <ArrowUpRight
                      size={15}
                      className="ml-3"
                    />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}