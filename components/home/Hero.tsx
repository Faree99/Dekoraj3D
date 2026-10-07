"use client";

import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

import HeroCopy from "./HeroCopy";

const FarmExperience = dynamic(
  () => import("@/components/three/FarmExperience"),
  {
    ssr: false,
  }
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[650vh] bg-[#E9E4DA]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* =====================================
            FULLSCREEN WEBGL BACKGROUND
        ====================================== */}

        <div className="absolute inset-0">
          <FarmExperience />
        </div>

        {/* =====================================
            CINEMATIC OVERLAYS
        ====================================== */}

        {/* Warm global treatment */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[#15140F]/[0.08]" />

        {/* Top readability */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[180px] bg-gradient-to-b from-black/25 via-black/10 to-transparent" />

        {/* Bottom cinematic gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[260px] bg-gradient-to-t from-[#11120E]/55 via-[#11120E]/15 to-transparent" />

        {/* Left gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-full bg-gradient-to-r from-[#11130F]/50 via-[#11130F]/10 to-transparent md:w-[70%] lg:w-[58%]" />

        {/* Subtle grain */}
        <div
          className="pointer-events-none absolute inset-0 z-[4] opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <HeroCopy />

        {/* =====================================
            BOTTOM META
        ====================================== */}

        <div className="pointer-events-none absolute bottom-5 left-5 z-20 hidden items-center gap-4 text-white/50 md:flex lg:bottom-8 lg:left-10">
          <span className="text-[9px] font-medium uppercase tracking-[0.22em]">
            Dekoraj / AGRI-001
          </span>

          <span className="h-px w-10 bg-white/25" />

          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#83E8A7]">
            Project development
          </span>
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute bottom-5 right-5 z-20 flex items-center gap-3 lg:bottom-8 lg:right-10"
        >
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.24em] text-white/55 sm:block">
            Scroll to build
          </span>

          <span className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-md">
            <ArrowDown size={14} />
          </span>
        </motion.div>
      </div>
    </section>
  );
}