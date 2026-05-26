"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ComponentType } from "react";
import { CalendarDays, GalleryHorizontal, MessageCircle, Users } from "lucide-react";

import homeShot from "../../Assests/Screenshot_20260524_175953_Let's Love.jpg";
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

export function FeaturePreview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = features[activeIndex];

  return (
    <div className="feature-preview-shell">
      <div className="feature-preview-copy">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <button
              key={feature.title}
              type="button"
              className={`feature-summary-card feature-summary-${feature.tone} ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
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
        <div className="feature-phone-frame">
          <Image src={activeFeature.src} alt={activeFeature.alt} sizes="280px" className="feature-phone-image" />
        </div>
        <div className="feature-page-buttons" aria-label="Preview different app pages">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <button
                key={feature.label}
                type="button"
                className={`feature-page-button ${index === activeIndex ? "is-active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <Icon className="size-4" />
                {feature.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
