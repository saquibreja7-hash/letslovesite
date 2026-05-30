import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import {
  ArrowRight,
  CalendarCheck,
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
import { absoluteUrl, defaultOpenGraphImage, siteConfig } from "@/app/seo";
import homeShot from "../../Assests/Screenshot_20260524_175953_Let's Love.jpg";
import moodShot from "../../Assests/Screenshot_20260524_181020_Let's Love.jpg";
import moodBoardShowcase from "../../Assests/Screenshot_20260524_180845_Let's Love.jpg";
import dateIdeasShowcase from "../../Assests/Screenshot_20260524_185118_Let's Love.jpg";
import coupleStreakShowcase from "../../Assests/couple-streak-showcase.jpg";

const navItems = ["Features", "Together", "Plans", "Privacy", "FAQ"];

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.title,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    images: [defaultOpenGraphImage],
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [defaultOpenGraphImage.url],
  },
};

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
    src: coupleStreakShowcase,
    alt: "Let's Love couple streak screen",
    title: "Couple Streak",
    copy: "Keep a gentle daily rhythm alive with shared check-ins and streaks.",
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

const privacyPrinciples: Array<{
  title: string;
  copy: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  {
    title: "Invite-only pairing",
    copy: "A 6-character code or QR flow creates one couple space. Codes expire after 24 hours, cannot be reused, and expired codes are cleaned up automatically.",
    icon: ShieldCheck,
  },
  {
    title: "Signed-in couple access",
    copy: "Firebase Authentication, Firestore rules, and Storage rules check that a user is signed in and belongs to the couple before shared messages, memories, plans, or media can be read.",
    icon: GalleryHorizontal,
  },
  {
    title: "Server-owned relationship state",
    copy: "Clients cannot directly create couples, read pairing codes, change a user's couple link, or reactivate a couple. Pairing and unpairing run through authenticated, rate-limited Cloud Functions.",
    icon: MessageCircle,
  },
  {
    title: "Device-side app locks",
    copy: "PIN and biometric lock settings stay on the device. Fingerprint or face data is handled by the operating system and is not sent to Let's Love servers.",
    icon: ShieldCheck,
  },
  {
    title: "Deletion and diagnostics controls",
    copy: "The app includes privacy contact and verified account/data deletion flows, while crash and performance context is sanitized to redact tokens, emails, URLs, phone numbers, and storage paths.",
    icon: ClipboardList,
  },
  {
    title: "Encrypted transport",
    copy: "App traffic to Firebase, Google Cloud, and Cloud Functions uses HTTPS/TLS, so data is encrypted while moving between the app and backend services.",
    icon: ShieldCheck,
  },
];

const closenessArcCards = [
  { src: "/mascots/arc/couple-arc-1.png", alt: "Let's Love couple moment illustration" },
  { src: "/mascots/arc/couple-arc-2.png", alt: "Let's Love private couple illustration" },
  { src: "/mascots/arc/couple-arc-3.png", alt: "Let's Love daily ritual illustration" },
  { src: "/mascots/arc/couple-arc-4.png", alt: "Let's Love memory sharing illustration" },
  { src: "/mascots/arc/couple-arc-5.png", alt: "Let's Love date planning illustration" },
  { src: "/mascots/arc/couple-arc-6.png", alt: "Let's Love couple chat illustration" },
  { src: "/mascots/arc/couple-arc-7.png", alt: "Let's Love private gallery illustration" },
  { src: "/mascots/arc/couple-arc-8.png", alt: "Let's Love emotional check-in illustration" },
  { src: "/mascots/arc/couple-arc-9.png", alt: "Let's Love togetherness illustration" },
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
    a: "Premium is for both of you. One subscription unlocks the shared couple space, so both partners get access without paying separately.",
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
    a: "Let's Love uses Firebase Authentication, Firestore and Storage rules, HTTPS/TLS transport, and Cloud Functions for sensitive pairing or unpairing changes. There are no public profiles or search-indexed couple spaces, and PIN or biometric app locks stay on the device.",
  },
  {
    q: "What happens to our data if one of us deletes the app?",
    a: "Your shared space remains backed up in the cloud if you uninstall the app or change devices. You can also request verified account and associated data deletion from Legal & Privacy in the app or from the public account deletion page.",
  },
  {
    q: "Can we customize the look of our shared home screen?",
    a: "Absolutely! You can choose custom wallpapers, pick highlight colors, pin your favorite couple photos, customize quick action widgets, and set a custom greeting at the top.",
  },
];

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteConfig.companyName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logo.png"),
      email: siteConfig.supportEmail,
      sameAs: [siteConfig.instagramUrl],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      name: siteConfig.name,
      url: absoluteUrl("/"),
      inLanguage: "en",
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
    {
      "@type": "MobileApplication",
      "@id": absoluteUrl("/#mobile-app"),
      name: siteConfig.name,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Android",
      url: absoluteUrl("/"),
      description: siteConfig.description,
      image: [
        absoluteUrl("/app-screenshot-1.jpg"),
        absoluteUrl("/app-screenshot-2.jpg"),
        absoluteUrl("/app-screenshot-3.jpg"),
        absoluteUrl("/app-screenshot-4.jpg"),
      ],
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
    },
  ],
};

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
    <main className="min-h-screen bg-[#fbfdff] text-[#111827]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
        <div className="mascot-sticky-content mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
              Built around the little rituals that keep couples close
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-6 text-slate-500">
              From shared plans and daily questions to private memories, quotes, and desire lists, each space gives couples a simple way to stay present together.
            </p>
          </div>

          <div className="mascot-arc-stage" aria-label="Let's Love couple moments">
            <svg className="mascot-arc-path" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true">
              <path d="M -120 545 Q 600 220 1320 545" />
            </svg>
            <div className="mascot-crescent" aria-hidden="true" />
            <div className="mascot-arc-copy">
              <p>Connect from anywhere</p>
              <p>Keep it just between you</p>
              <p>Build daily rituals</p>
            </div>
            <div className="mascot-orbit" aria-hidden="true">
              {closenessArcCards.map((card, index) => (
                <figure key={card.src} className="mascot-orbit-card" style={{ "--arc-index": index } as CSSProperties}>
                  <Image src={card.src} alt={card.alt} width={360} height={360} sizes="(max-width: 900px) 34vw, 180px" className="mascot-orbit-image" />
                </figure>
              ))}
            </div>
            <p className="mascot-swipe-hint" aria-hidden="true">Swipe to explore more</p>
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

      <section id="faq" className="faq-section px-5 py-16 sm:px-8 sm:py-20">
        <div className="faq-shell mx-auto">
          <div className="faq-heading">
            <h2>Frequently asked questions</h2>
            <p>
              Everything you need to know about Let&apos;s Love features, pairing, privacy, and plans.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="faq-details" open={index === 1}>
                <summary className="faq-summary">
                  <span>{faq.q}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p className="faq-answer">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="privacy-editorial px-5 py-16 sm:px-8 sm:py-20">
        <div className="privacy-shell mx-auto max-w-7xl">
          <div className="privacy-editorial-copy">
            <span className="privacy-kicker">
              <ShieldCheck className="size-4" />
              Privacy by default
            </span>
            <h2 className="text-balance text-4xl font-normal tracking-tight text-slate-950 sm:text-5xl">
              Privacy built into every couple space.
            </h2>
            <p className="mt-6 text-balance text-base font-medium leading-7 text-slate-500 sm:text-lg">
              Let&apos;s Love treats privacy like an app architecture: pair intentionally, verify couple membership,
              run sensitive changes on the server, keep locks local, and give users a deletion path.
            </p>
            <div className="privacy-actions">
              <Link href="/privacy" className="privacy-primary-link">
                Privacy Policy
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/data-safety" className="privacy-secondary-link">
                Data Safety
              </Link>
            </div>

          </div>

          <div className="privacy-blueprint" aria-label="How Let's Love keeps couple spaces private">
            <div className="privacy-blueprint-core">
              <span className="privacy-core-kicker">Private core</span>
              <span className="privacy-core-emblem">
                <Heart className="size-6" />
              </span>
              <h3>One active couple space, guarded at each layer.</h3>
              <p>
                Firebase Auth, Firestore rules, Storage rules, Cloud Functions, HTTPS/TLS, on-device locks,
                and deletion controls all support the same rule: only the right two accounts should get through.
              </p>
              <div className="privacy-core-stack" aria-label="Privacy layers">
                <span>Auth</span>
                <span>Rules</span>
                <span>Functions</span>
                <span>Device lock</span>
              </div>
            </div>

            {privacyPrinciples.map(({ title, copy, icon: Icon }, index) => (
              <article key={title} className={`privacy-node privacy-node-${index + 1}`}>
                <span className="privacy-node-icon">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="privacy-node-index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </span>
              </article>
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
          <a
            href="https://www.instagram.com/letsloveapp"
            className="site-footer-instagram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <span className="site-footer-instagram-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <rect x="4" y="4" width="16" height="16" rx="4.5" />
                <circle cx="12" cy="12" r="3.7" />
                <circle cx="17" cy="7" r="1.1" />
              </svg>
            </span>
            Follow us on Instagram
          </a>

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
