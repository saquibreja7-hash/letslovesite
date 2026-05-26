"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      const hash = anchor?.getAttribute("href");

      if (!anchor || !hash || hash === "#") {
        return;
      }

      const destination = document.querySelector<HTMLElement>(hash);

      if (!destination) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(destination, {
        offset: -84,
        duration: 1.2,
      });
    };

    frame = window.requestAnimationFrame(raf);
    document.documentElement.classList.add("lenis-enabled");
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis-enabled");
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null;
}
