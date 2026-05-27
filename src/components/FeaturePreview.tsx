"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { CalendarDays, GalleryHorizontal, MessageCircle, Users } from "lucide-react";

import memoriesShot from "../../Assests/Screenshot_20260524_193259_Let's Love.jpg";
import chatShot from "../../Assests/Screenshot_20260524_184547_Let's Love.jpg";
import goalsShot from "../../Assests/Screenshot_20260524_182158_Let's Love.jpg";
import plansShot from "../../Assests/Screenshot_20260524_185118_Let's Love.jpg";

const features: Array<{
  label: string;
  title: string;
  copy: string;
  src: StaticImageData;
  alt: string;
  icon: ComponentType<{ className?: string }>;
  tone: string;
}> = [
  {
    label: "Home",
    title: "Build a private home screen for two",
    copy: "See partner presence, anniversaries, birthdays, daily check-ins, recent photos, and quick actions in one calm relationship home.",
    src: goalsShot,
    alt: "Let's Love home screen preview",
    icon: Users,
    tone: "blue",
  },
  {
    label: "Memories",
    title: "Keep memories, albums, reels, and time capsules",
    copy: "Post photo memories, react and comment, save bulk photos in a shared gallery, and revisit special moments with Memory Magic.",
    src: memoriesShot,
    alt: "Let's Love memories screen preview",
    icon: GalleryHorizontal,
    tone: "pink",
  },
  {
    label: "Chat",
    title: "Stay close with chat, voice notes, and calls",
    copy: "Send real-time messages, images, reactions, replies, edits, voice notes, and start a private one-on-one call from the couple space.",
    src: chatShot,
    alt: "Let's Love chat and connection screen preview",
    icon: MessageCircle,
    tone: "violet",
  },
  {
    label: "Plans",
    title: "Plan goals, tasks, dates, and rituals",
    copy: "Use shared goals, todos, date ideas, a calendar, daily questions, games, and streaks to make everyday effort visible.",
    src: plansShot,
    alt: "Let's Love goals and planning screen preview",
    icon: CalendarDays,
    tone: "amber",
  },
];

function subscribeToMobileQuery(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(max-width: 900px)");
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getMobileQuerySnapshot() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function getServerMobileQuerySnapshot() {
  return false;
}

export function FeaturePreview() {
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileQuerySnapshot,
    getServerMobileQuerySnapshot,
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [stageState, setStageState] = useState<"top" | "fixed" | "bottom">("top");
  const trackRef = useRef<HTMLDivElement>(null);

  // 2. Mobile-only scroll listener for fixed-stage progress mapping
  useEffect(() => {
    if (!isMobile) return;

    let frameId = 0;

    const handleScroll = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (rect.top > 0) {
        setStageState("top");
        setActiveIndex(0);
      } else if (rect.bottom < viewportHeight) {
        setStageState("bottom");
        setActiveIndex(3);
      } else {
        setStageState("fixed");
        const scrollRange = rect.height - viewportHeight;
        const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollRange)));
        const index = Math.min(3, Math.floor(progress * 4));
        setActiveIndex(index);
      }
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        handleScroll();
      });
    };

    handleScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isMobile]);

  // 3. Smooth scroll helper when tab pills are clicked on mobile
  const scrollToTab = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const viewportHeight = window.innerHeight;
    const scrollRange = track.offsetHeight - viewportHeight;
    // Add small offset to ensure it positions within the target index range
    const targetScroll = trackTop + (index / 4) * scrollRange + 15;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Desktop Feature Preview (Shown on screen size > 900px) */}
      <div className="desktop-feature-preview">
        <div className="feature-preview-shell">
          <div className="feature-preview-copy">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <button
                  key={feature.title}
                  type="button"
                  className={`feature-summary-card feature-summary-${feature.tone} ${index === activeIndex && !isMobile ? "is-active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <span className="feature-icon">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="feature-kicker">0{index + 1} / {feature.label}</span>
                    <span className="feature-summary-title">{feature.title}</span>
                    <span className="feature-summary-copy">{feature.copy}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="feature-phone-panel">
            <div className="feature-phone-frame" style={{ position: "relative" }}>
              {features.map((feature, index) => (
                <Image
                  key={feature.label}
                  src={feature.src}
                  alt={feature.alt}
                  sizes="280px"
                  className="feature-phone-image"
                  style={{
                    position: index === 0 ? "relative" : "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    opacity: index === activeIndex || (isMobile && index === 0) ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    pointerEvents: "none",
                  }}
                />
              ))}
            </div>
            <div className="feature-page-buttons" aria-label="Preview different app pages">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <button
                    key={feature.label}
                    type="button"
                    className={`feature-page-button ${index === activeIndex && !isMobile ? "is-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    aria-pressed={index === activeIndex && !isMobile}
                  >
                    <Icon className="size-4" />
                    {feature.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Parallax Feature Preview (Shown on screen size <= 900px) */}
      <div className="mobile-feature-preview">
        <div className="mobile-feature-scroll-track" ref={trackRef}>
          <div className={`mobile-feature-sticky-stage is-${stageState}`}>
            
            {/* Top Navigation Row */}
            <div className="mobile-feature-tabs-nav">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.label}
                    type="button"
                    className={`mobile-tab-btn mobile-tab-${feature.tone} ${index === activeIndex ? "is-active" : ""}`}
                    onClick={() => scrollToTab(index)}
                  >
                    <Icon className="size-4" />
                    <span>{feature.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Centered Phone Showcase */}
            <div className="mobile-feature-phone-wrap">
              <div className="feature-phone-frame">
                {features.map((feature, index) => (
                  <Image
                    key={feature.label}
                    src={feature.src}
                    alt={feature.alt}
                    sizes="240px"
                    className={`mobile-phone-screen-img ${index === activeIndex ? "is-active" : ""}`}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Floating Info Cards */}
            <div className="mobile-feature-info-box">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className={`mobile-feature-info-card mobile-feature-card-${feature.tone} ${index === activeIndex ? "is-active" : ""}`}
                  >
                    <span className="mobile-feature-icon">
                      <Icon className="size-5" />
                    </span>
                    <span className="feature-kicker">0{index + 1} / {feature.label}</span>
                    <h3 className="mobile-feature-title">{feature.title}</h3>
                    <p className="mobile-feature-copy">{feature.copy}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

