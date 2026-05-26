"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HeroPhoneParallax() {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(".hero-stage");
    const hero = stage?.closest<HTMLElement>(".hero-section");

    if (!stage || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const heroTop = stage.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, heroTop - window.innerHeight * 0.72);
      const end = heroTop + stage.offsetHeight * 0.58;
      const progress = clamp((window.scrollY - start) / Math.max(1, end - start), 0, 1);

      hero.style.setProperty("--hero-parallax-progress", progress.toFixed(3));
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
      hero.style.removeProperty("--hero-parallax-progress");
    };
  }, []);

  return null;
}
