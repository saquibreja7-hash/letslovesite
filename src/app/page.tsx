"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Sparkles, 
  Camera, 
  Calendar, 
  Lock, 
  ArrowRight,
  Smile, 
  ShieldCheck, 
  ChevronDown, 
  Users, 
  Check,
  Menu,
  X,
  Star,
  Gamepad2
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import ThreeBackground from "@/components/ThreeBackground";

// Register GSAP ScrollTrigger safely for Next.js App Router SSR
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Storytelling Chapter System (Customized with pure white background uniforms for soft WebGL pastel morphs)
const CHAPTERS = [
  {
    title: "Chapter 1: The Spark",
    subtitle: "A private digital bridge built for two.",
    desc: "Every great partnership begins with a secure invitation. Share a private, encrypted 6-digit connection code to establish a real-time socket channel. Once paired, your dashboards sync instantly and private widgets trigger, establishing a beautiful home reserved strictly for the two of you.",
    quote: "A digital bridge built for two hearts, locking out the noise of the public web.",
    statNumber: "01",
    statLabel: "Secure Connection Key",
    screen: "pairing" as const,
    colorA: "#ff7e5f",
    colorB: "#feb47b",
    colorBg: "#ffffff"
  },
  {
    title: "Chapter 2: The Heartbeat",
    subtitle: "Sync moods and track presence instantly.",
    desc: "Stay emotionally aligned, no matter where you are. Log your current mood—whether Cozy ☕, Loving 💕, or Playful 🤪—and let your partner understand your head space at a glance. Tap the interactive Love Meter to send visual pings that light up your partner's screen, making distance melt away.",
    quote: "Intimacy isn't built in massive milestones; it lives in the small, shared everyday rhythms.",
    statNumber: "42",
    statLabel: "Daily Mood Syncs",
    screen: "moods" as const,
    colorA: "#ec4899",
    colorB: "#f43f5e",
    colorBg: "#ffffff"
  },
  {
    title: "Chapter 3: The Sanctuary",
    subtitle: "Preserve memories in a shared physical diary.",
    desc: "Keep your most precious memories locked in an end-to-end encrypted Polaroid feed. Upload coffee dates, road trips, and cozy morning highlights. Every image is stored in your private sanctuary vault, safe from social media filters and external eyes.",
    quote: "A quiet room for our photos, untouched by public algorithms or vanity likes.",
    statNumber: "365+",
    statLabel: "Shared Polaroids",
    screen: "memories" as const,
    colorA: "#6366f1",
    colorB: "#a855f7",
    colorBg: "#ffffff"
  },
  {
    title: "Chapter 4: E2EE Love Touch",
    subtitle: "Synchronous tactile fingerprint scanning.",
    desc: "Experience emotional presence in real time. Place your fingerprint on the security touch scanner simultaneously with your partner to establish an encrypted socket handshake. Feel a soft, pulsing haptic response that vibrates in sync, confirming that you are touching the same virtual space.",
    quote: "Distance feels smaller when you can touch the same screen and feel a heartbeat respond.",
    statNumber: "0.01s",
    statLabel: "Haptic Sync Lag",
    screen: "lovemeter" as const,
    colorA: "#10b981",
    colorB: "#14b8a6",
    colorBg: "#ffffff"
  },
  {
    title: "Chapter 5: Goals & Play",
    subtitle: "Collaborative growth and relationship milestones.",
    desc: "Plan your future together with co-op milestone checklists and collaborative goals. Keep track of saving aspirations, upcoming travel plans, or domestic milestones. Keep things playful with daily matching cards and relationship quizzes.",
    quote: "Building a life together is a team effort. Let's make every single milestone count.",
    statNumber: "12",
    statLabel: "Co-op Milestones",
    screen: "goals" as const,
    colorA: "#1e293b",
    colorB: "#312e81",
    colorBg: "#ffffff"
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Keep track of active chapter state for WebGL background color morphing
  const [activeChapter, setActiveChapter] = useState(0);

  // FAQ list
  const faqs = [
    {
      q: "How private is Let's Love?",
      a: "Let's Love is built on private-by-design architecture. All communication, shared pictures, and logs are encrypted end-to-end. There are zero ads, zero tracking algorithms, and zero data resale. Only you and your paired partner hold the decryption keys."
    },
    {
      q: "What happens if we need to unpair?",
      a: "Unpairing is instantaneous and absolute. If either partner chooses to unpair, the local decryption cache is wiped, the server vault connection is severed, and all shared memories are permanently erased from both devices."
    },
    {
      q: "Does the app support a physical passcode lock?",
      a: "Yes! You can enable our App Lock passcode feature which locks the app on startup. It supports custom PIN codes, numeric locks, and biometric verification like FaceID or fingerprint scanning for extra physical boundary privacy."
    },
    {
      q: "Is the app available on iOS and Android?",
      a: "Absolutely. Let's Love is fully native and runs smoothly on both iOS and Android. You can download the app from the Apple App Store or Google Play Store today."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // GSAP ScrollTrigger & Lenis smooth scroll setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initialize Lenis for smooth inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Bind Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Set up ScrollTriggers for storytelling chapters
    const triggers: ScrollTrigger[] = [];
    
    CHAPTERS.forEach((_, idx) => {
      const trigger = ScrollTrigger.create({
        trigger: `#chapter-${idx}`,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveChapter(idx);
          }
        },
      });
      triggers.push(trigger);
    });

    // 3. Stagger-reveal chapter elements as they enter the screen
    CHAPTERS.forEach((_, idx) => {
      gsap.fromTo(
        `#chapter-${idx} .animate-fade-up`,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: `#chapter-${idx}`,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Cleanup on component unmount
    return () => {
      triggers.forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  const activeChData = CHAPTERS[activeChapter];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-[#FF4F18]/10 selection:text-[#FF4F18] bg-white relative z-10">
      
      {/* 0. IMMERSIVE FLUID WebGL BACKGROUND (Overlaying dynamically on our clean white background) */}
      <ThreeBackground 
        colorA={activeChData.colorA}
        colorB={activeChData.colorB}
        colorBg={activeChData.colorBg}
      />

      {/* 1. STICKY HEADER */}
      <header className="sticky top-0 z-50 w-full bg-white/80 text-slate-900 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-6 sm:px-8">
          
          {/* Logo (Left aligned) */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl overflow-hidden shadow-xs transition-transform group-hover:scale-105 border border-slate-100 flex items-center justify-center bg-white">
              <img 
                src="/logo.png" 
                alt="Let's Love logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-950">
              Let's<span className="text-[#FF4F18] font-bold">Love</span>
            </span>
          </a>

          {/* Centered Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#story" className="hover:text-[#FF4F18] transition-colors">Our Story</a>
            <a href="#features" className="hover:text-[#FF4F18] transition-colors">Features</a>
            <a href="#privacy" className="hover:text-[#FF4F18] transition-colors">Privacy</a>
            <a href="#faq" className="hover:text-[#FF4F18] transition-colors">FAQ</a>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#demo"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#FF4F18] text-white px-7 text-sm font-bold shadow-xs hover:bg-[#E03E0B] hover:shadow-md active:scale-97 transition-all duration-300 cursor-pointer"
            >
              Download App
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-xl hover:bg-slate-100/50 text-slate-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 px-6 py-6 space-y-4 shadow-lg animate-fade-in">
            <nav className="flex flex-col gap-4 text-sm font-semibold text-slate-600">
              <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4F18] transition-colors py-2">Our Story</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4F18] transition-colors py-2">Features</a>
              <a href="#privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4F18] transition-colors py-2">Privacy</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4F18] transition-colors py-2">FAQ</a>
            </nav>
            <div className="pt-4 border-t border-slate-100">
              <a 
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-full bg-[#FF4F18] text-white px-6 text-sm font-bold shadow-xs hover:bg-[#E03E0B]"
              >
                Download App
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO CONTAINER (Pure clean white background with centered-aligned content) */}
      <section className="relative overflow-hidden pt-24 pb-20 bg-transparent">
        
        {/* Soft centered peach glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#FF4F18]/4 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center relative z-10 space-y-8">
          
          {/* Centered Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7E5F]/25 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 shadow-2xs">
            <div className="w-4 h-4 rounded-md overflow-hidden border border-slate-100/50 shadow-3xs flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Let's Love logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">Embrace everyday connection</span>
          </div>

          {/* Centered Bold Headline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight leading-[1.08] text-slate-950">
              The Private Space for <br/>
              <span className="relative inline-block text-[#FF4F18]">
                Everyday
                {/* Custom SVG organic brush swoosh underline */}
                <svg className="absolute -bottom-2.5 left-0 w-full h-3 text-[#FF4F18]/90" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
                  <path d="M1 8.5C25 3 60 1.5 99 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              Connection
            </h1>
            
            <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-500 font-medium leading-relaxed pt-2">
              No feeds. No public algorithms. Just a beautifully crafted private sandbox for you and your partner to share moods, store memories, swap pings, and bound closer every single day.
            </p>
          </div>

          {/* Center-aligned Download Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <a 
              href="#demo"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-900 transition-colors shadow-sm select-none"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <div className="text-left leading-none">
                <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Download on the</span>
                <span className="block text-xs font-black tracking-tight mt-0.5">App Store</span>
              </div>
            </a>
            
            <a 
              href="#demo"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white hover:bg-slate-900 transition-colors shadow-sm select-none"
            >
              <Sparkles className="w-4 h-4 text-white fill-white" />
              <div className="text-left leading-none">
                <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Get it on</span>
                <span className="block text-xs font-black tracking-tight mt-0.5">Google Play</span>
              </div>
            </a>
          </div>

          <div className="pt-6 animate-bounce">
            <a href="#story" className="inline-flex flex-col items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-slate-900">
              <span>Scroll to discover our story</span>
              <ChevronDown className="w-4 h-4 text-[#FF4F18]" />
            </a>
          </div>

        </div>
      </section>

      {/* 3. STORYTELLING SPLIT-SCREEN NARRATIVE SECTION (Overlaying on clean white canvas) */}
      <section id="story" className="relative py-16 bg-transparent overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
            
            {/* Left Column: Story Chapters that scroll */}
            <div className="space-y-32 lg:space-y-48 py-12 lg:py-24 z-10">
              {CHAPTERS.map((ch, idx) => (
                <div 
                  key={idx}
                  id={`chapter-${idx}`}
                  className="min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center space-y-6"
                >
                  
                  {/* Chapter Badge */}
                  <div className="animate-fade-up opacity-0 inline-flex items-center gap-2 self-start rounded-full border border-orange-200 bg-white px-3.5 py-1.5 shadow-2xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#FF4F18]">
                      {ch.title.split(":")[0]}
                    </span>
                  </div>

                  {/* Chapter Titles & Copy */}
                  <div className="animate-fade-up opacity-0 space-y-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-950">
                      {ch.title.split(":")[1]}
                    </h2>
                    <h3 className="text-sm sm:text-base font-bold text-[#FF4F18]/90 tracking-wide">
                      {ch.subtitle}
                    </h3>
                    <p className="text-sm sm:text-base font-medium leading-relaxed max-w-xl text-slate-500">
                      {ch.desc}
                    </p>
                  </div>

                  {/* Pull Quote */}
                  <div className="animate-fade-up opacity-0 pl-6 border-l-2 border-[#FF4F18]/40 italic text-slate-500 font-medium text-xs sm:text-sm max-w-lg">
                    "{ch.quote}"
                  </div>

                  {/* Numeric Stats Grid Block */}
                  <div className="animate-fade-up opacity-0 inline-flex items-center gap-4 bg-white/80 border border-slate-100/50 p-4 rounded-2xl max-w-xs shadow-2xs">
                    <span className="text-3xl font-black text-[#FF4F18] leading-none">
                      {ch.statNumber}
                    </span>
                    <div className="text-left">
                      <span className="block text-[9px] text-slate-400 font-black uppercase tracking-wider leading-tight">
                        {ch.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Inline visual illustration on mobile viewports (hidden on desktop) */}
                  <div className="lg:hidden w-full pt-8 flex justify-center">
                    <div className="w-full max-w-[320px] p-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4F18]/5 to-[#FF7E5F]/5 blur-3xl rounded-full scale-75 pointer-events-none"></div>
                      <InteractiveShowcase activeTabOverride={ch.screen} />
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Column: Pinned smartphone mockup container (fixed on desktop, hidden on mobile) */}
            <div className="hidden lg:flex sticky top-0 h-screen items-center justify-center overflow-hidden pointer-events-auto">
              <div className="w-full max-w-[370px] p-4 relative">
                {/* Subtle colorful aura matching the active screen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4F18]/8 to-[#FF7E5F]/8 blur-3xl rounded-full scale-90 pointer-events-none"></div>
                <InteractiveShowcase activeTabOverride={CHAPTERS[activeChapter].screen} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. NOTION/STRIPE-STYLE 3D FEATURE GRID */}
      <section id="features" className="py-24 border-t border-transparent bg-transparent">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Bound Deeper, Privately by Design
            </h2>
            <p className="mx-auto max-w-lg text-sm font-medium text-slate-500">
              Every detail is engineered to prioritize emotional connection and absolute data boundaries.
            </p>
          </div>

          {/* 3D Tilt perspective grids */}
          <div className="perspective-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            {/* Feature 1: Instant Pairing */}
            <div className="tilt-card-trigger p-8 rounded-3xl border flex flex-col justify-between h-[280px] bg-white border-slate-100 shadow-2xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF4F18]/10 text-[#FF4F18] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-955">Private Shared Space</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-500">
                  Connect instantly via secure numeric token pairings. Enjoy a dashboard meant only for two hearts, untouched by global advertising.
                </p>
              </div>
              <span className="text-[10px] font-black text-[#FF4F18] uppercase tracking-widest flex items-center gap-1.5 select-none">
                01. SECURE pairing <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Feature 2: Realtime Moods */}
            <div className="tilt-card-trigger p-8 rounded-3xl border flex flex-col justify-between h-[280px] bg-white border-slate-100 shadow-2xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Smile className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Real-time Presence</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-500">
                  Update your current emotional status in a swipe. Setting a cozy mood lets your partner check in and react instantly.
                </p>
              </div>
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5 select-none">
                02. MOOD check-ins <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Feature 3: Shared Sanctuary */}
            <div className="tilt-card-trigger p-8 rounded-3xl border flex flex-col justify-between h-[280px] bg-white border-slate-100 shadow-2xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Shared Polaroid Feed</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-500">
                  Preserve digital polaroids of coffee dates, walks, and vacations. Keep a visual memory grid locked inside your secure local sanctuary.
                </p>
              </div>
              <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest flex items-center gap-1.5 select-none">
                03. PRIVATE album <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Feature 4: Calendars & Gameboards */}
            <div className="tilt-card-trigger p-8 rounded-3xl border flex flex-col justify-between h-[280px] bg-white border-slate-100 shadow-2xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Couple Gameboards</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-500">
                  Enjoy shared checklists, quiz dates, and relationship timelines. Log dates and plan trips inside a clean, private calendar.
                </p>
              </div>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5 select-none">
                04. PLAYFUL cohesion <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Feature 5: Security Architecture */}
            <div className="tilt-card-trigger p-8 rounded-3xl border flex flex-col justify-between h-[280px] md:col-span-2 lg:col-span-2 bg-white border-slate-100 shadow-2xs">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">Vault Security Architecture</h3>
                <p className="text-xs leading-relaxed font-medium text-slate-500">
                  Equipped with military-grade E2EE tunnels. Supports biometric FaceID locks on startup, preventing absolute physical intrusions. No global feeds, no ads, and 100% data boundary control.
                </p>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 select-none">
                05. END-TO-END encryption <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-transparent border-t border-transparent">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">How It Works</h2>
            <p className="mx-auto max-w-sm text-sm font-medium text-slate-500">
              Start sharing moments in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Download the App", desc: "Install the Let's Love app on your mobile devices from the iOS App Store or Google Play Store." },
              { step: "02", title: "Generate Pair Code", desc: "Create a unique numeric pairing token and share it with your partner over a secure connection." },
              { step: "03", title: "Enjoy Your Sanctuary", desc: "Once paired, your private vault is initialized. Start logging polaroids, updating moods, and beating together." }
            ].map(item => (
              <div key={item.step} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-2xs space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-4 text-4xl font-black select-none text-slate-100">{item.step}</div>
                <h3 className="text-xs font-black uppercase tracking-wider pt-4 text-slate-950">{item.title}</h3>
                <p className="text-xs font-medium leading-relaxed text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VAULT & SECURITY ARCHITECTURE */}
      <section id="privacy" className="py-24 bg-transparent border-t border-transparent">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
              Locked, Encrypted, Private
            </h2>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              We believe couples deserve absolute boundaries. That's why Let's Love utilizes direct end-to-end cryptographic encryption tunnels on your devices. Unlike other social apps, your chats, pictures, and presence signals bypass secondary data collectors.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
              {[
                "Zero data resale",
                "App Lock FaceID support",
                "Direct wiped servers"
              ].map(text => (
                <div key={text} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="py-24 bg-transparent border-t border-transparent">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-sm text-sm font-medium text-slate-500">
              Everything you need to know about our security and app features.
            </p>
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-100 bg-white shadow-2xs overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer text-slate-900"
                  >
                    <span className="text-xs font-black uppercase tracking-wider">{faq.q}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-300" />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-xs font-medium leading-relaxed border-t border-slate-50/50 pt-4 animate-fade-in text-slate-500">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. HERO DUAL CALL TO ACTION SECTION */}
      <section id="demo" className="py-24 bg-transparent border-t border-transparent">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-slate-950">
              Initialize Your Shared Space Today
            </h2>
            <p className="mx-auto max-w-md text-sm font-medium leading-relaxed text-slate-500">
              Bound deeper, protect your physical boundaries, and create a timeline that belongs entirely to the two of you.
            </p>
          </div>

          {/* Email input callout */}
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 bg-slate-950 p-1.5 rounded-2xl shadow-md border border-slate-800">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 bg-transparent px-4 py-3 text-xs focus:outline-none text-white placeholder-slate-500"
            />
            <button className="bg-white text-slate-950 rounded-xl px-5 py-3 text-xs font-bold hover:bg-slate-100 active:scale-95 transition-all shrink-0 cursor-pointer">
              Get App Link
            </button>
          </div>

          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Available on iOS & Android • Start Pairing Instantly
          </p>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-slate-100/60 bg-transparent py-16 text-center text-xs text-slate-400 font-medium">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-6">
          <div className="flex justify-center items-center gap-2 font-black text-slate-700">
            <div className="w-6 h-6 rounded-md overflow-hidden border border-slate-100/50 shadow-2xs bg-white">
              <img 
                src="/logo.png" 
                alt="Let's Love logo" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span>Let's Love</span>
          </div>
          <p>© 2026 Let's Love. Made for two hearts. Private by design.</p>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-slate-400">
            <a href="#" className="hover:text-[#FF4F18] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FF4F18] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#FF4F18] transition-colors">Security Architecture</a>
            <a href="#" className="hover:text-[#FF4F18] transition-colors">Developer API</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
