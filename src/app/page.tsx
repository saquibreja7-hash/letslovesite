import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Flame,
  Gamepad2,
  GalleryHorizontal,
  Gift,
  Heart,
  ImageIcon,
  Mail,
  MessageCircle,
  ShieldCheck,
  Smile,
  Sparkles,
} from "lucide-react";

import { ClosedTestingForm } from "@/components/ClosedTestingForm";
import { FeaturePreview } from "@/components/FeaturePreview";
import { HeroPhoneParallax } from "@/components/HeroPhoneParallax";
import { MascotParallax } from "@/components/MascotParallax";
import { RoutineParallax } from "@/components/RoutineParallax";
import homeShot from "../../Assests/Screenshot_20260524_175953_Let's Love.jpg";
import moodShot from "../../Assests/Screenshot_20260524_181020_Let's Love.jpg";
import moodBoardShowcase from "../../Assests/Screenshot_20260524_180845_Let's Love.jpg";
import touchScannerShowcase from "../../Assests/Screenshot_20260524_181806_Let's Love.jpg";
import dateIdeasShowcase from "../../Assests/Screenshot_20260524_185118_Let's Love.jpg";

const navItems = ["Features", "Together", "Plans", "Privacy", "FAQ"];

const heroScreens = [
  { src: moodShot, alt: "Let's Love mood board screen", className: "hero-phone hero-phone-left" },
  { src: homeShot, alt: "Let's Love home dashboard screen", className: "hero-phone hero-phone-center" },
  { src: moodBoardShowcase, alt: "Let's Love mood board notes screen", className: "hero-phone hero-phone-right" },
];

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



const appComparisonTiles: Array<{
  label: string;
  copy: string;
  logo: string;
  className: string;
}> = [
  { label: "WhatsApp", copy: "private chat", logo: "https://cdn.simpleicons.org/whatsapp/25D366", className: "app-orbit-1" },
  { label: "Instagram", copy: "shared memories", logo: "https://cdn.simpleicons.org/instagram/E4405F", className: "app-orbit-2" },
  { label: "Telegram", copy: "quick signals", logo: "https://cdn.simpleicons.org/telegram/26A5E4", className: "app-orbit-3" },
  { label: "Facebook", copy: "relationship moments", logo: "https://cdn.simpleicons.org/facebook/1877F2", className: "app-orbit-4" },
  { label: "Google Meet", copy: "couple calls", logo: "https://cdn.simpleicons.org/googlemeet/00897B", className: "app-orbit-5" },
  { label: "Google Calendar", copy: "dates and plans", logo: "https://cdn.simpleicons.org/googlecalendar/4285F4", className: "app-orbit-6" },
  { label: "Google Photos", copy: "private gallery", logo: "https://cdn.simpleicons.org/googlephotos/4285F4", className: "app-orbit-7" },
  { label: "Notion", copy: "love letters", logo: "https://cdn.simpleicons.org/notion/000000", className: "app-orbit-8" },
  { label: "Discord", copy: "play for two", logo: "https://cdn.simpleicons.org/discord/5865F2", className: "app-orbit-9" },
  { label: "Snapchat", copy: "daily moments", logo: "https://cdn.simpleicons.org/snapchat/FFFC00", className: "app-orbit-10" },
  { label: "Signal", copy: "paired privacy", logo: "https://cdn.simpleicons.org/signal/3A76F0", className: "app-orbit-11" },
  { label: "Pinterest", copy: "date ideas", logo: "https://cdn.simpleicons.org/pinterest/E60023", className: "app-orbit-12" },
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
  {
    q: "Is the app available on iOS or desktop?",
    a: "Let's Love is built Android-first to deliver highly integrated widgets, native notifications, and optimal performance on Android devices. iOS support and a web companion are actively planned for future releases.",
  },
  {
    q: "How secure is our private space?",
    a: "Your chats, photos, and letters are protected with robust, Firebase-backed security. We prioritize your privacy above all else—there are no public profiles, no search indexes, and absolutely no data sharing with advertisers.",
  },
  {
    q: "What happens to our data if one of us deletes the app?",
    a: "Your shared space remains safely backed up in the cloud. If you reinstall the app or change devices, simply log back in to reconnect instantly. You can also permanently delete your account and all associated data from the settings at any time.",
  },
  {
    q: "Can we customize the look of our shared home screen?",
    a: "Absolutely! You can choose custom wallpapers, pick highlight colors, pin your favorite couple photos, customize quick action widgets, and set a custom greeting at the top.",
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
              href="#closed-testing"
              className="site-nav-cta"
            >
              <svg className="size-3.5 fill-current shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
              </svg>
              Early Access
            </a>
          </div>
        </div>
      </header>

      <section className="hero-section relative px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-blue" />
        <div className="hero-glow hero-glow-pink" />

        <div className="hero-floating-hearts" aria-hidden="true">
          <span className="hero-floating-heart hero-heart-left-1">♥</span>
          <span className="hero-floating-heart hero-heart-left-2">♥</span>
          <span className="hero-floating-heart hero-heart-left-3">♥</span>
          <span className="hero-floating-heart hero-heart-right-1">♥</span>
          <span className="hero-floating-heart hero-heart-right-2">♥</span>
          <span className="hero-floating-heart hero-heart-right-3">♥</span>
        </div>

        <div className="hero-hanging-cards" aria-hidden="true">
          <div className="hero-hanging-card hero-hanging-left hero-hanging-memory">
            <span className="hero-hanging-icon">
              <ImageIcon className="size-5" />
            </span>
            <strong>Memory Magic</strong>
            <span>7 shared moments</span>
          </div>
          <div className="hero-hanging-card hero-hanging-left-mid hero-hanging-letter">
            <span className="hero-hanging-icon">
              <Mail className="size-5" />
            </span>
            <strong>Love Letter</strong>
            <span>Saved for later</span>
          </div>
          <div className="hero-hanging-card hero-hanging-left-lower hero-hanging-date">
            <span className="hero-hanging-icon">
              <CalendarCheck className="size-5" />
            </span>
            <strong>Date Night</strong>
            <span>Friday, 8:00 PM</span>
          </div>
          <div className="hero-hanging-card hero-hanging-right hero-hanging-touch">
            <span className="hero-hanging-icon">
              <Heart className="size-5" />
            </span>
            <strong>Love Touch</strong>
            <span>Maybelline sent love</span>
          </div>
          <div className="hero-hanging-card hero-hanging-right-mid hero-hanging-checkin">
            <span className="hero-hanging-icon">
              <Smile className="size-5" />
            </span>
            <strong>Daily Check-In</strong>
            <span>Feeling close today</span>
          </div>
          <div className="hero-hanging-card hero-hanging-right-lower hero-hanging-question">
            <span className="hero-hanging-icon">
              <MessageCircle className="size-5" />
            </span>
            <strong>Daily Question</strong>
            <span>Both answers ready</span>
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
            Built for exactly two people
          </div>

          <h1 className="mx-auto max-w-4xl text-balance text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl sm:leading-[0.98]">
            <span className="block">Your Private Couple Space</span>
            <span className="hero-flip-line" aria-label="for every little thing">
              <span>for Every Little Thing</span>
              <span>for Daily Love Rituals</span>
              <span>for Memories You Keep</span>
              <span>for Plans Made Together</span>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-medium leading-7 text-slate-500 sm:text-lg">
            Chat like a messenger, save moments like a social app, plan dates like a calendar, keep photos like a gallery, and send love like only a couple app can.
          </p>

          <div id="closed-testing" className="mt-7 scroll-mt-28">
            <ClosedTestingForm />
          </div>

          <div className="hero-stage" aria-label="Let's Love product screenshots">
            <HeroPhoneParallax />
            {heroScreens.map((screen) => (
              <PhoneFrame key={screen.alt} {...screen} />
            ))}
          </div>
        </div>
      </section>

      <section className="mascot-section px-5 py-14 sm:px-8" aria-label="How Let's Love brings couples together">
        <MascotParallax />
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Three ways Let&apos;s Love brings you closer
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              From first pairing to private rituals, each part of the app is built to help couples feel present, protected, and connected.
            </p>
          </div>

          <div className="mascot-card-stage">
            {[
              {
                src: "/mascots/intro-connection.png",
                alt: "Couple connecting through Let's Love",
                title: "Connect from anywhere",
                copy: "Pair privately, send small signals, and keep presence alive even when the day pulls you apart.",
                className: "mascot-card-left",
              },
              {
                src: "/mascots/intro-private.png",
                alt: "Couple sharing a private hug",
                title: "Keep it just between you",
                copy: "Your chats, memories, letters, and prompts live in one space made for exactly two people.",
                className: "mascot-card-center",
              },
              {
                src: "/mascots/intro-together.png",
                alt: "Couple using phones together",
                title: "Build daily rituals",
                copy: "Turn check-ins, date plans, mood notes, and questions into little routines you both return to.",
                className: "mascot-card-right",
              },
            ].map((card) => (
              <article key={card.title} className={`mascot-card ${card.className}`}>
                <div className="mascot-image-wrap">
                  <Image src={card.src} alt={card.alt} width={620} height={620} sizes="(max-width: 900px) 82vw, 360px" className="mascot-image" />
                </div>
                <div className="mascot-card-copy">
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-14 sm:px-8">
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

      <section className="px-5 py-14 sm:px-8">
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

      <section id="together" className="overflow-hidden px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="private-world-grid">
            <div className="private-world-icons" aria-label="Let's Love feature icons">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <span key={item} className={`private-world-ghost private-world-ghost-${item}`} />
              ))}
              {togetherTools.map(({ title, icon: Icon }, index) => (
                <div key={title} className={`private-world-icon-card private-world-icon-${index + 1}`}>
                  <Icon className="size-6" />
                </div>
              ))}
            </div>

            <div className="private-world-copy">
              <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                A private world that feels like yours
              </h2>
              <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                Let&apos;s Love brings memories, private chat, playful touches, saved letters, couple games, and shared galleries into one paired space built only for two people.
              </p>

              <div className="mt-8 grid gap-4">
                {togetherTools.map(({ title, copy, icon: Icon }) => (
                  <article key={title} className="private-world-feature-row">
                    <span className="private-world-row-icon">
                      <Icon className="size-4" />
                    </span>
                    <span>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="routine-section px-5 py-14 sm:px-8">
        <RoutineParallax />
        <div className="routine-shell mx-auto max-w-7xl">
          <div className="routine-heading">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Turn intentions into shared routines
            </h2>
            <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              Practical planning tools and softer daily prompts help couples coordinate life and still make room for play.
            </p>
          </div>

          <div className="routine-bars routine-bars-top" aria-hidden="true">
            {[72, 132, 90, 126, 116, 108, 100, 84, 68].map((height, index) => (
              <span key={`top-${height}-${index}`} style={{ "--bar-height": `${height}px` } as CSSProperties} />
            ))}
          </div>
          <div className="routine-bars routine-bars-bottom" aria-hidden="true">
            {[70, 118, 82, 130, 112, 94, 106, 76].map((height, index) => (
              <span key={`bottom-${height}-${index}`} style={{ "--bar-height": `${height}px` } as CSSProperties} />
            ))}
          </div>

          <div className="routine-feature-grid">
            {[...planningTools, ...connectionTools.slice(0, 5)].map(({ title, copy, icon: Icon }, index) => (
              <article key={title} className="mini-feature-card">
                <span className="routine-icon-tile">
                  <Icon className="size-4" />
                </span>
                <span className="routine-kicker">{index + 1 < 10 ? `0${index + 1}` : index + 1} / Routine</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-display text-slate-950 sm:text-5xl tracking-normal">
              Common Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-500 leading-6">
              Everything you need to know about Let&apos;s Love features, privacy, and plans.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-details group">
                <summary className="faq-summary">
                  {faq.q}
                  <ChevronDown className="faq-chevron" />
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="privacy-editorial px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div className="privacy-editorial-copy">
            <h2 className="text-balance text-4xl font-normal tracking-tight text-slate-950 sm:text-5xl">
              Private by default, <span className="text-[#ff4f7b]">personal by design.</span>
            </h2>
            <p className="mt-6 text-balance text-base font-medium leading-7 text-slate-500 sm:text-lg">
              Let&apos;s Love keeps your couple space intimate, useful, and made only for two.
            </p>
            <a
              href="#features"
              className="mt-9 inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-950"
            >
              See private features
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div className="privacy-editorial-list">
            {[
              {
                title: "For Pairing",
                copy: "one invite flow creates a private home screen that only both partners can access.",
              },
              {
                title: "For Memories",
                copy: "photos, comments, reactions, albums, and shared gallery moments stay inside your paired space.",
              },
              {
                title: "For Daily Rituals",
                copy: "questions, goals, date ideas, streaks, and check-ins help you return to each other without noisy feeds.",
              },
              {
                title: "For Trust",
                copy: "app lock, account deletion, restrictive media rules, and Firebase-backed controls support a safer private space.",
              },
            ].map((item) => (
              <div key={item.title} className="privacy-editorial-point">
                <ArrowUpRight className="privacy-editorial-arrow" />
                <p>
                  <strong>{item.title}:</strong> {item.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-orbit-section px-5 py-18 sm:px-8" aria-label="One couple app replaces scattered social tools">
        <div className="app-orbit-grid" aria-hidden="true">
          {appComparisonTiles.map(({ label, copy, logo, className }) => (
            <div key={label} className={`app-orbit-tile ${className}`}>
              <span className="app-orbit-icon">
                <img src={logo} alt="" aria-hidden="true" />
              </span>
              <span className="app-orbit-label">{label}</span>
              <span className="app-orbit-copy">{copy}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-normal tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            One private place for what five apps try to do
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base font-medium leading-7 text-slate-500 sm:text-lg">
            Chat like a messenger, save moments like a social app, plan dates like a calendar, keep photos like a gallery, and send love like only a couple app can.
          </p>
          <ClosedTestingForm className="mt-8" />
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-content">
          <p className="site-footer-copyright">© 2026 Lets Love. All rights reserved.</p>
          
          <div className="site-footer-links">
            <Link href="/terms" className="site-footer-link">Terms</Link>
            <Link href="/privacy" className="site-footer-link">Privacy</Link>
            <Link href="/cookie-policy" className="site-footer-link">Cookie Policy</Link>
            <Link href="/account-deletion" className="site-footer-link">Account Deletion</Link>
            <Link href="/data-safety" className="site-footer-link">Data Safety</Link>
            <a href="mailto:support@jamsaq.in" className="site-footer-link">Contact</a>
          </div>
          
          <p className="site-footer-crafted">
            Crafted with <span className="site-footer-heart">♥</span> by <a href="#" className="site-footer-author">JAMSAQ STUDIO</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
