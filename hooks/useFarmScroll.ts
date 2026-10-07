"use client";

import { useEffect, useState } from "react";

export function useFarmScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const hero = document.getElementById("hero");

      if (!hero) return;

      const rect = hero.getBoundingClientRect();

      const scrollable =
        hero.offsetHeight - window.innerHeight;

      const travelled = -rect.top;

      const value =
        scrollable > 0
          ? travelled / scrollable
          : 0;

      setProgress(
        Math.max(0, Math.min(1, value))
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );
    };
  }, []);

  return progress;
}