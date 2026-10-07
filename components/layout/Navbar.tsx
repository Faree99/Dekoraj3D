"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";

import Container from "@/components/ui/Container";
import { navigation } from "@/data/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );
}, []);

  return (
   <motion.header
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className={`
    fixed
    left-0
    top-0
    z-[100]
    w-full
    transition-all
    duration-500

    ${
      scrolled
        ? "border-b border-white/10 bg-[#11130F]/70 backdrop-blur-xl"
        : "bg-transparent"
    }
  `}
>
      <Container>
        <div className="flex h-[82px] items-center justify-between lg:h-[90px]">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center"
            aria-label="Dekoraj Group"
          >
            <Image
              src="/brand/dekoraj-logo-white.svg"
              alt="Dekoraj Group"
              width={150}
              height={48}
              priority
              className="h-auto w-[125px] sm:w-[145px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 xl:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1.5 text-[13px] font-medium text-white/70 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                {item.children && (
                  <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/farm-projects"
              className="group hidden h-11 items-center justify-center rounded-full bg-[#24B866] px-6 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#67E394] hover:text-[#041A12] lg:flex"
            >
              Start a Project

              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white xl:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}