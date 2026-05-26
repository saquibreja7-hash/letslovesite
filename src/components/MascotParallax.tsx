"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MascotParallax() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".mascot-section");

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const start = sectionTop - window.innerHeight * 0.78;
      const end = sectionTop + section.offsetHeight * 0.62;
      const progress = clamp((window.scrollY - start) / Math.max(1, end - start), 0, 1);

      section.style.setProperty("--mascot-progress", progress.toFixed(3));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      section.style.removeProperty("--mascot-progress");
    };
  }, []);

  return null;
}
