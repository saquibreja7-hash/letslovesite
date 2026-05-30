"use client";

import { useEffect } from "react";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function MascotParallax() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".mascot-section");
    const arcCards = Array.from(document.querySelectorAll<HTMLElement>(".mascot-orbit-card"));

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const start = sectionTop + window.innerHeight * 0.16;
      const end = sectionTop + section.offsetHeight - window.innerHeight * 1.34;
      const progress = clamp((window.scrollY - start) / Math.max(1, end - start), 0, 1);

      section.style.setProperty("--mascot-progress", progress.toFixed(3));

      if (arcCards.length) {
        const stage = section.querySelector<HTMLElement>(".mascot-arc-stage");
        const stageWidth = stage?.offsetWidth ?? window.innerWidth;
        const stageHeight = stage?.offsetHeight ?? 680;
        const cardWidth = arcCards[0]?.offsetWidth ?? 320;
        const visibleSlots = 5;
        const centerSlot = (visibleSlots - 1) / 2;
        const gap = clamp(stageWidth * 0.225, cardWidth * 0.98, cardWidth * 1.18);
        const baselineY = clamp(stageHeight * 0.73, 455, 540);
        const arcLift = clamp(stageHeight * 0.2, 116, 154);
        const travel = Math.max(1, arcCards.length - 1);

        arcCards.forEach((card, index) => {
          const slot = index + centerSlot - progress * travel;
          const clampedSlot = clamp(slot, 0, visibleSlots - 1);
          const arcRatio = clampedSlot / (visibleSlots - 1);
          const x = (slot - centerSlot) * gap;
          const y = baselineY - Math.sin(arcRatio * Math.PI) * arcLift;
          const rotation = (slot - centerSlot) * 4.4;
          const visible = slot >= -0.08 && slot <= visibleSlots - 0.02 ? 1 : 0;
          const distanceFromCenter = Math.abs(clampedSlot - centerSlot);
          const scale = 1.055 - distanceFromCenter * 0.032;
          const readability = clamp(1 - distanceFromCenter * 0.17, 0.62, 1);
          const zIndex = Math.round(30 - Math.abs(clampedSlot - centerSlot) * 4);

          card.style.setProperty("--arc-x", `${x.toFixed(1)}px`);
          card.style.setProperty("--arc-y", `${y.toFixed(1)}px`);
          card.style.setProperty("--arc-rotate", `${rotation.toFixed(2)}deg`);
          card.style.setProperty("--arc-scale", scale.toFixed(3));
          card.style.setProperty("--arc-opacity", String(visible));
          card.style.setProperty("--arc-readability", readability.toFixed(3));
          card.style.zIndex = String(zIndex);
        });
      }
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
      arcCards.forEach((card) => {
        card.style.removeProperty("--arc-x");
        card.style.removeProperty("--arc-y");
        card.style.removeProperty("--arc-rotate");
        card.style.removeProperty("--arc-scale");
        card.style.removeProperty("--arc-opacity");
        card.style.removeProperty("--arc-readability");
        card.style.removeProperty("z-index");
      });
    };
  }, []);

  return null;
}
