import Image, { type StaticImageData } from "next/image";
import type { ComponentType } from "react";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardList,
  Diamond,
  Flame,
  Gamepad2,
  GalleryHorizontal,
  Gift,
  Heart,
  ImageIcon,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic,
  Palette,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Video,
} from "lucide-react";

import { FeaturePreview } from "@/components/FeaturePreview";
import homeShot from "../../Assests/Screenshot_20260524_175953_Let's Love.jpg";
import memoriesShot from "../../Assests/Screenshot_20260524_193259_Let's Love.jpg";
import moodShot from "../../Assests/Screenshot_20260524_181020_Let's Love.jpg";
import chatShot from "../../Assests/Screenshot_20260524_184910_Let's Love.jpg";
import privacyShot from "../../Assests/Screenshot_20260525_121751_Let's Love.jpg";
import moodBoardShowcase from "../../Assests/Screenshot_20260524_180845_Let's Love.jpg";
import touchScannerShowcase from "../../Assests/Screenshot_20260524_181806_Let's Love.jpg";
import dateIdeasShowcase from "../../Assests/Screenshot_20260524_185118_Let's Love.jpg";

const navItems = ["Features", "Together", "Plans", "Privacy", "FAQ"];

const heroScreens = [
  { src: moodShot, alt: "Let's Love mood board screen", className: "hero-phone hero-phone-left" },
  { src: homeShot, alt: "Let's Love home dashboard screen", className: "hero-phone hero-phone-center" },
  { src: memoriesShot, alt: "Let's Love memories feed screen", className: "hero-phone hero-phone-right" },
];

const companyMarks = ["Private Pairing", "Voice Notes", "Love Touch", "Memory Magic", "Daily Questions", "Shared Calendar"];

const layeredScreens = [
  {
    src: moodBoardShowcase,
    alt: "Let's Love mood board notes screen",
    title: "Mood Board",
    copy: "Pin sweet notes and small plans where both of you can see them.",
    className: "layered-phone-left",
  },
  {
    src: touchScannerShowcase,
    alt: "Let's Love touch scanner screen",
    title: "Love Touch",
    copy: "A playful live scanner that turns presence into a shared moment.",
    className: "layered-phone-center",
  },
  {
    src: dateIdeasShowcase,
    alt: "Let's Love date ideas screen",
    title: "Date Ideas",
    copy: "Plan tiny adventures, save ideas, and mark what you want to do together.",
    className: "layered-phone-right",
  },
];

const togetherTools: Array<{
  title: string;
  copy: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { title: "Memories", copy: "Photo posts with comments, reactions, captions, albums, and On This Day resurfacing.", icon: ImageIcon },
  { title: "Shared Gallery", copy: "Bulk photos, downloads, gallery lock controls, and a private viewer for both partners.", icon: GalleryHorizontal },
  { title: "Memory Magic", copy: "Recaps, reels, stats, and time capsules that turn saved moments into something worth revisiting.", icon: Sparkles },
  { title: "Couple Games", copy: "Daily private picks, live reveals, and playful prompts built for two people only.", icon: Gamepad2 },
  { title: "Love Touch", copy: "Send a live emoji shower, hold-hands interaction, or custom touch when words are too much.", icon: Heart },
  { title: "Love Letter", copy: "Write a saved note your partner can return to when they need reassurance.", icon: Mail },
];

const planningTools: Array<{
  title: string;
  copy: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { title: "Couple Goals", copy: "Track long-term goals with progress, milestones, status, achievements, and completion celebrations.", icon: Flame },
  { title: "To-Do List", copy: "Assign shared tasks, add due dates, filter by person or week, and keep recurring routines in sync.", icon: ClipboardList },
  { title: "Date Ideas", copy: "Browse preloaded ideas, add custom plans, mark picks, archive completed dates, and use Surprise Me.", icon: Gift },
  { title: "Shared Calendar", copy: "Keep dates, milestones, reminders, birthdays, anniversaries, and events in one couple calendar.", icon: CalendarCheck },
];

const connectionTools: Array<{
  title: string;
  copy: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { title: "Daily Quote", copy: "A fresh relationship quote both partners can save or send into chat.", icon: Sparkles },
  { title: "Daily Questions", copy: "Answer privately and reveal together when both people have responded.", icon: MessageCircle },
  { title: "Desire Match", copy: "Private yes/no wishes where only mutual yes answers are revealed.", icon: ShieldCheck },
  { title: "Love Meter", copy: "A bond score with activity trends and next best actions.", icon: Heart },
  { title: "Daily Check-In", copy: "Share a quick mood, note, and weather-style emotional update.", icon: Smile },
  { title: "Mood Board", copy: "Pin little notes for each other so the day has a place to land.", icon: ClipboardList },
];

const trustDetails = [
  "Everything shared lives inside one paired couple space, not a public profile.",
  "Pairing uses partner invite flow with code or QR, so the app is useful only after both people connect.",
  "App lock, restrictive media rules, rate limits, and account deletion flows are part of the product plan.",
  "The Android app is built with Firebase Auth, Firestore, Storage, FCM, and Cloud Functions.",
];

const footerColumns = [
  {
    title: "Product",
    links: ["Private chat", "Memories", "Love Touch", "Daily check-ins", "Shared calendar"],
  },
  {
    title: "Features",
    links: ["Voice notes", "Couple goals", "Date ideas", "Memory Magic", "Desire Match"],
  },
  {
    title: "Resources",
    links: ["Help center", "Privacy policy", "Terms", "Account deletion", "Contact support"],
  },
  {
    title: "Company",
    links: ["About", "Roadmap", "Premium", "Security", "Play Store"],
  },
];

const proofCards = [
  {
    quote:
      "Phase 1 and Phase 2 cover pairing, chat, image sharing, memories, voice notes, goals, todos, date ideas, daily quotes, birthday countdowns, and photo reactions.",
    name: "Built beyond the basics",
    detail: "Real product scope",
  },
  {
    quote:
      "Hardening work includes Firestore and Storage rules, rate limits, message ordering, validators, FCM token hygiene, and monitoring hooks.",
    name: "Designed for private data",
    detail: "Security and reliability",
  },
  {
    quote:
      "Phase 3 features include video calls, Send Love, Missing You, call history, love animations, and native Android widget groundwork.",
    name: "Richer connection layer",
    detail: "Current roadmap",
  },
];

const faqs = [
  {
    q: "What is Let's Love for?",
    a: "It is a private Android-first couple app for chat, voice notes, memories, shared gallery, goals, todos, date ideas, daily quotes, games, love touches, and daily connection rituals.",
  },
  {
    q: "How does pairing work?",
    a: "One partner creates an invite, then the other joins with a code or QR flow. Once paired, both people share one private couple space.",
  },
  {
    q: "Is Premium for one person or both?",
    a: "The app copy from the product says: one subscription, two accounts. Premium unlocks the couple space for both partners rather than charging each person separately.",
  },
  {
    q: "Is it useful for long-distance couples?",
    a: "Yes. Chat, voice notes, presence, Send Love, Missing You, mood check-ins, daily questions, calls, and shared memories are especially useful when you cannot be together every day.",
  },
];

function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`phone-frame ${className}`}>
      <Image src={src} alt={alt} sizes="(max-width: 768px) 54vw, 310px" priority className="phone-image" />
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfdff] text-[#111827]">
      <header className="site-header">
        <div className="site-nav-pill">
          <a href="#" className="site-brand">
            <Image src="/logo.png" alt="Let's Love logo" width={34} height={34} className="site-logo" priority />
            <span>Let&apos;s Love</span>
          </a>

          <nav className="site-nav-links">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </a>
            ))}
          </nav>

          <div className="site-nav-actions">
            <a href="#faq" className="site-nav-secondary">
              Learn more
            </a>
            <a
              href="#download"
              className="site-nav-cta"
            >
              Get the app
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <div className="hero-glow hero-glow-blue" />
        <div className="hero-glow hero-glow-pink" />

        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
            <span className="flex -space-x-2">
              {[0, 1, 2].map((item) => (
                <span key={item} className="size-5 rounded-full border-2 border-white bg-gradient-to-br from-[#ff7aa2] to-[#2379ff]" />
              ))}
            </span>
            Built for exactly two people
          </div>

          <h1 className="mx-auto max-w-4xl text-balance text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            Your Private Couple Space for Every Little Thing
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-medium leading-7 text-slate-500 sm:text-lg">
            Chat, voice note, save memories, plan dates, answer daily questions, send love touches, and keep your relationship rituals in one calm Android app.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#download"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#2379ff] px-6 text-sm font-black text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-[#1267e7]"
            >
              Start your shared space
              <Sparkles className="size-4" />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-6 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
            >
              See features
              <ChevronDown className="size-4" />
            </a>
          </div>

          <div className="hero-stage" aria-label="Let's Love product screenshots">
            {heroScreens.map((screen) => (
              <PhoneFrame key={screen.alt} {...screen} />
            ))}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 text-xs font-black uppercase tracking-[0.18em] text-slate-400 sm:grid-cols-3 lg:grid-cols-6">
            {companyMarks.map((mark) => (
              <div key={mark} className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-3">
                {mark}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-3 text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Everything your relationship keeps reaching for
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              The product is not just chat. It is the paired home for photos, voice notes, calls, plans, check-ins, games, touches, quotes, and private rituals.
            </p>
          </div>

          <FeaturePreview />
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="layered-showcase">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
                Small rituals, shown beautifully
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
                Mood notes, love touches, and date plans each get their own focused screen, so everyday connection feels visual instead of buried.
              </p>
            </div>

            <div className="layered-phone-stage" aria-label="Let's Love ritual screens">
              {layeredScreens.map((screen) => (
                <article key={screen.title} className={`layered-phone-card ${screen.className}`}>
                  <div className="layered-phone-frame">
                    <Image src={screen.src} alt={screen.alt} sizes="(max-width: 900px) 72vw, 330px" className="layered-phone-image" />
                  </div>
                  <div className="layered-phone-copy">
                    <h3>{screen.title}</h3>
                    <p>{screen.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="together" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              A private world that feels like yours
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              Let&apos;s Love has real feature areas for Memories, Shared Gallery, Memory Magic, Couple Games, Love Touch, Love Letter, Couple Streak, and private chat.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {togetherTools.map(({ title, copy, icon: Icon }) => (
                <div key={title} className="tool-card">
                  <span className="tool-icon">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-black tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm font-medium leading-6 text-slate-500">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="showcase-panel">
            <Image src={chatShot} alt="Let's Love chat and relationship screen" sizes="(max-width: 1024px) 88vw, 620px" className="showcase-image showcase-image-back" />
            <Image src={privacyShot} alt="Let's Love privacy and app screen" sizes="(max-width: 1024px) 76vw, 420px" className="showcase-image showcase-image-front" />
          </div>
          </div>
        </div>
      </section>

      <section id="plans" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Turn intentions into shared routines
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              Practical planning tools and softer daily prompts help couples coordinate life and still make room for play.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[...planningTools, ...connectionTools.slice(0, 5)].map(({ title, copy, icon: Icon }) => (
              <article key={title} className="mini-feature-card">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-[#be123c] shadow-sm">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950">{title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="connection-split">
            <div className="connection-phone-wrap">
              <div className="connection-phone-frame">
                <Image src={chatShot} alt="Let's Love private chat screen" sizes="(max-width: 1024px) 70vw, 310px" className="connection-phone-image" />
              </div>
            </div>

            <div className="connection-text-box">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2379ff]">Connection layer</p>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">Fast ways to feel close</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
                Built-in signals make affection quick without making the app noisy. Voice notes, prompts, and gentle reminders keep the relationship warm even on busy days.
              </p>

              <div className="mt-7 grid gap-3">
                {[
                  { icon: Mic, title: "Voice notes", text: "Send quick audio with waveform playback and speed controls." },
                  { icon: Send, title: "Send Love", text: "Trigger a soft notification when you want your partner to feel remembered." },
                  { icon: Video, title: "Calls", text: "Start one-on-one calls with audio fallback and call history." },
                  { icon: Diamond, title: "One Premium", text: "One subscription keeps both accounts unlocked." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="connection-signal-row">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2379ff]">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-black text-slate-900">{title}</span>
                      <span className="mt-0.5 block text-sm font-medium leading-5 text-slate-500">{text}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {connectionTools.slice(0, 4).map(({ title, icon: Icon }) => (
                  <div key={title} className="connection-chip">
                    <Icon className="size-5" />
                    {title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="privacy" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-br from-[#eef8ff] via-white to-[#fff0f6] p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/70 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <ShieldCheck className="size-6" />
              </span>
              <h2 className="mt-5 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Private by default, personal by design
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
                Let&apos;s Love is built around a paired space, not a public feed, discovery surface, or group network. The product requirements keep the relationship strictly one-on-one.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: LockKeyhole, title: "Paired access", copy: "One private space for two people." },
                { icon: Bell, title: "Gentle signals", copy: "Pings and reminders without noisy feeds." },
                { icon: MessageCircle, title: "Context-rich chat", copy: "Messages beside memories and moods." },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-white">
                    <Icon className="size-6 text-[#2379ff]" />
                    <h3 className="mt-5 text-sm font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-slate-500">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {trustDetails.map((detail) => (
              <div key={detail} className="flex gap-3 rounded-2xl bg-white/80 p-4 text-sm font-semibold leading-6 text-slate-600 shadow-sm ring-1 ring-white">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                {detail}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Built like a real app, not a mockup
            </h2>
            <p className="mt-4 text-sm font-medium text-slate-500">The landing page now reflects the product folder: shipped phases, hardening work, and the richer connection roadmap.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {proofCards.map((card) => (
              <figure key={card.name} className="proof-card">
                <div className="flex gap-1 text-[#ffb020]">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-5 text-base font-bold leading-7 text-slate-800">{card.quote}</blockquote>
                <figcaption className="mt-8">
                  <div className="font-black text-slate-950">{card.name}</div>
                  <div className="text-sm font-medium text-slate-500">{card.detail}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-sm font-medium text-slate-500">The practical bits before you invite your person.</p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition open:bg-[#eef8ff]" open={index === 1}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-black text-slate-950">
                  {faq.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:bg-white">
                    <ChevronDown className="size-4 transition group-open:rotate-180" />
                  </span>
                </summary>
                <p className="mt-4 text-sm font-medium leading-6 text-slate-500">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_10%_20%,#fff7dd,transparent_32%),radial-gradient(circle_at_78%_18%,#dff4ff,transparent_34%),linear-gradient(135deg,#fff0f6,#ffffff_45%,#eef8ff)] p-8 shadow-xl shadow-slate-200/60 ring-1 ring-slate-200/60 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
                <Heart className="size-4 fill-[#ff4f7b] text-[#ff4f7b]" />
                One subscription, two accounts
              </div>
              <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
                Unlock the whole couple space together
              </h2>
              <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-slate-600">
                Premium unlocks memories, gallery, games, desire match, goals, todos, date ideas, calendar, quotes, love touches, and more for both partners.
              </p>
              <a
                href="#"
                className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#2379ff] px-6 text-sm font-black text-white shadow-xl shadow-blue-500/25 transition hover:bg-[#1267e7]"
              >
                Get Let&apos;s Love
                <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="download-badges">
              {["Unlimited memories", "Deeper couple tools", "More loving touches"].map((badge) => (
                <div key={badge} className="rounded-2xl border border-white/70 bg-white/85 p-5 text-center font-black text-slate-800 shadow-sm">
                  <div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-[#2379ff] text-white">
                    <Check className="size-5" />
                  </div>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 border-b border-slate-200 pb-10 lg:grid-cols-[1.2fr_3fr]">
            <div>
              <div className="flex items-center gap-2 font-black text-slate-950">
                <Image src="/logo.png" alt="Let's Love logo" width={36} height={36} className="site-logo" />
                Let&apos;s Love
              </div>
              <p className="mt-4 max-w-xs text-sm font-medium leading-6 text-slate-500">
                A private Android-first couple app for memories, chat, plans, prompts, and small daily signals.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-sm font-black text-slate-950">{column.title}</h3>
                  <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-500">
                    {column.links.map((link) => (
                      <a key={link} href="#" className="transition hover:text-slate-950">
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 text-sm font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>2026 Let&apos;s Love. A private app for couples.</p>
            <div className="flex flex-wrap gap-5">
              <a href="#" className="hover:text-slate-950">Terms</a>
              <a href="#" className="hover:text-slate-950">Privacy</a>
              <a href="#" className="hover:text-slate-950">Cookie Policy</a>
              <a href="#faq" className="hover:text-slate-950">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
