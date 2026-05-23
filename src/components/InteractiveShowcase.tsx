"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Camera, 
  Sparkles, 
  Smile, 
  Lock, 
  ShieldCheck, 
  Gamepad2, 
  Calendar, 
  Users, 
  Check,
  Send,
  Plus,
  Flame,
  Fingerprint
} from "lucide-react";

interface InteractiveShowcaseProps {
  activeTabOverride?: "pairing" | "moods" | "memories" | "lovemeter" | "goals";
}

export default function InteractiveShowcase({ activeTabOverride }: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"pairing" | "moods" | "memories" | "lovemeter" | "goals">("pairing");
  
  // Theme state
  const [activeTheme, setActiveTheme] = useState<"rose" | "midnight" | "coral" | "mint">("coral");
  
  // Pairing Simulator States
  const [pairingCode, setPairingCode] = useState<string>("");
  const [isPaired, setIsPaired] = useState<boolean>(false);
  const [isPairingError, setIsPairingError] = useState<boolean>(false);
  
  // Mood Selector States
  const [myMood, setMyMood] = useState<string>("Cozy 🧸");
  const [partnerMood, setPartnerMood] = useState<string>("Missing You 🥺");
  const [streakDays, setStreakDays] = useState<number>(12);
  
  // Polaroid memories gallery
  const memories = [
    { id: 1, img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=60", cap: "First Coffee Date ☕️", date: "May 12" },
    { id: 2, img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60", cap: "Sunset Walk 🌅", date: "June 24" },
    { id: 3, img: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60", cap: "Weekend Escape 🏕️", date: "July 15" }
  ];
  
  // Love Touch Fingerprint States
  const [touchState, setTouchState] = useState<"idle" | "touching" | "synced">("idle");
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Couple Goals & Games states
  const [gameSelection, setGameSelection] = useState<"none" | "cabin" | "beach">("none");
  const [goalChecked, setGoalChecked] = useState<{ [key: string]: boolean }>({
    italy: true,
    move: false,
    savings: false
  });
  
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number }[]>([]);
  
  // Programmatic sync from GSAP page scrolls
  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    }
  }, [activeTabOverride]);

  // Dynamic color palette mapping
  const themeColors = {
    rose: {
      primary: "bg-pink-500",
      text: "text-pink-600",
      border: "border-pink-500",
      accent: "bg-pink-50",
      gradient: "from-pink-500 to-rose-500"
    },
    midnight: {
      primary: "bg-indigo-600",
      text: "text-indigo-600",
      border: "border-indigo-500",
      accent: "bg-indigo-50",
      gradient: "from-indigo-600 to-purple-600"
    },
    coral: {
      primary: "bg-[#FF4F18]",
      text: "text-[#FF4F18]",
      border: "border-[#FF4F18]",
      accent: "bg-orange-50/60",
      gradient: "from-[#FF4F18] to-[#FF7E5F]"
    },
    mint: {
      primary: "bg-emerald-500",
      text: "text-emerald-600",
      border: "border-emerald-500",
      accent: "bg-emerald-50",
      gradient: "from-emerald-500 to-teal-500"
    }
  };

  const currentTheme = themeColors[activeTheme];

  const handleKeypadPress = (num: string) => {
    if (pairingCode.length < 6) {
      setPairingCode(prev => prev + num);
      setIsPairingError(false);
    }
  };

  const handleBackspace = () => {
    setPairingCode(prev => prev.slice(0, -1));
  };

  const verifyPairing = () => {
    if (pairingCode === "143520") {
      setIsPaired(true);
      triggerHearts();
    } else {
      setIsPairingError(true);
      setPairingCode("");
    }
  };

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 0.8
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 2000);
  };

  // Love Touch Touch Handlers
  const startLoveTouch = () => {
    if (touchState === "synced") return;
    setTouchState("touching");
    
    // Simulate fingerprint scan hold of 1.5 seconds
    touchTimerRef.current = setTimeout(() => {
      setTouchState("synced");
      triggerHearts();
    }, 1500);
  };

  const endLoveTouch = () => {
    if (touchState === "touching") {
      setTouchState("idle");
      if (touchTimerRef.current) {
        clearTimeout(touchTimerRef.current);
      }
    }
  };

  const resetLoveTouch = () => {
    setTouchState("idle");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto w-full px-4 sm:px-6">
      
      {/* 1. SECTOR CONTROLS / FEATURE TABS */}
      <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-64 shrink-0 overflow-x-auto pb-4 lg:pb-0 scrollbar-none justify-start sm:justify-center lg:justify-start">
        {[
          { id: "pairing", label: "Instant Pairing", icon: Users, desc: "Connect two hearts instantly" },
          { id: "moods", label: "Realtime Moods & Streak", icon: Smile, desc: "Streak flame: Keep rhythm alive" },
          { id: "memories", label: "Shared Polaroids", icon: Camera, desc: "A cozy visual memory log" },
          { id: "lovemeter", label: "Live Love Touch", icon: Fingerprint, desc: "Simultaneous E2EE screen scan" },
          { id: "goals", label: "Couple Goals & Games", icon: Gamepad2, desc: "Would-You-Rather & Milestones" }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 w-64 lg:w-full shrink-0 cursor-pointer ${
                isActive 
                  ? "bg-white shadow-md border border-slate-100 scale-[1.02]" 
                  : "hover:bg-white/40 border border-transparent"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isActive ? `${currentTheme.primary} text-white` : "bg-slate-100 text-slate-400"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-800 tracking-tight">{tab.label}</span>
                <span className="block text-[10px] text-slate-400 font-medium mt-0.5">{tab.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN IPHONE SIMULATOR */}
      <div className="relative mx-auto w-[310px] h-[610px] shrink-0">
        
        {/* iPhone Outer Frame */}
        <div className="absolute inset-0 bg-slate-950 rounded-[44px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] p-3 border-4 border-slate-800 ring-1 ring-slate-700">
          
          {/* Inner Gloss Screen */}
          <div className="relative w-full h-full bg-[#FAF8F5] rounded-[34px] overflow-hidden flex flex-col select-none border border-slate-900/10">
            
            {/* Top Island/Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-30 flex items-center justify-between px-3 text-[10px] text-white">
              <span className="font-bold text-[9px]">9:41</span>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF4F18]/80"></div>
              </div>
            </div>

            {/* Dynamic Simulated App Header */}
            <div className="pt-10 px-4 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md overflow-hidden border border-slate-100/50 shadow-3xs flex items-center justify-center bg-white">
                  <img 
                    src="/logo.png" 
                    alt="Let's Love logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <span className="text-[10px] font-black tracking-tight text-slate-900">Let's Love</span>
              </div>
              
              {/* Mini Battery & Signal */}
              <div className="flex items-center gap-1 text-[8px] font-bold text-slate-400">
                <span>LTE</span>
                <span className="w-3 h-1.5 bg-slate-400 rounded-xs"></span>
              </div>
            </div>

            {/* Dynamic Content Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 relative flex flex-col">
              
              {/* Tab 1: Pairing simulator */}
              {activeTab === "pairing" && (
                <div className="space-y-4 flex flex-col h-full justify-between pb-2 flex-1">
                  {!isPaired ? (
                    <div className="space-y-4 text-center mt-2 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-orange-100/60 flex items-center justify-center mx-auto">
                          <Users className="w-5 h-5 text-[#FF4F18]" />
                        </div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Pair with partner</h3>
                        <p className="text-[9px] text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                          Enter your partner's 6-digit pair code. <br/>Tip: Try <span className="font-bold text-slate-700">143520</span>
                        </p>
                      </div>

                      {/* Display Code */}
                      <div className="space-y-1">
                        <div className="flex justify-center gap-1.5">
                          {Array.from({ length: 6 }).map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`w-7 h-9 rounded-lg border-2 flex items-center justify-center text-xs font-black transition-all ${
                                isPairingError 
                                  ? "border-red-400 text-red-500 bg-red-50" 
                                  : pairingCode[idx] 
                                    ? `border-slate-800 text-slate-800 bg-white` 
                                    : "border-slate-200 text-slate-300"
                              }`}
                            >
                              {pairingCode[idx] || ""}
                            </div>
                          ))}
                        </div>
                        {isPairingError && (
                          <span className="text-[8px] font-bold text-red-500 block">Invalid code! Try 143520</span>
                        )}
                      </div>

                      {/* Custom Numeric Keypad */}
                      <div className="grid grid-cols-3 gap-1.5 max-w-[210px] mx-auto">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(num => (
                          <button 
                            key={num}
                            onClick={() => handleKeypadPress(num)}
                            className="h-8 rounded-lg bg-white shadow-2xs border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 active:scale-90 active:bg-slate-50 cursor-pointer"
                          >
                            {num}
                          </button>
                        ))}
                        <button 
                          onClick={handleBackspace}
                          className="h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 active:scale-90 cursor-pointer"
                        >
                          ⌫
                        </button>
                        <button 
                          onClick={() => handleKeypadPress("0")}
                          className="h-8 rounded-lg bg-white shadow-2xs border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 active:scale-90 cursor-pointer"
                        >
                          0
                        </button>
                        <button 
                          onClick={verifyPairing}
                          className={`h-8 rounded-lg text-[9px] font-black text-white flex items-center justify-center active:scale-90 cursor-pointer ${currentTheme.primary}`}
                        >
                          PAIR
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-scale-up py-8">
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-full ${currentTheme.primary} flex items-center justify-center text-white relative z-10 animate-bounce`}>
                          <Heart className="w-7 h-7 fill-white text-white" />
                        </div>
                        <div className={`absolute inset-0 w-14 h-14 rounded-full ${currentTheme.primary} opacity-30 animate-ping`}></div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Successfully Paired!</h3>
                        <p className="text-[9px] text-slate-400">You are now bound to your partner.</p>
                      </div>
                      <button 
                        onClick={() => {
                          setIsPaired(false);
                          setPairingCode("");
                        }}
                        className="text-[8px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full cursor-pointer"
                      >
                        Reset Simulator
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Realtime Moods & Streak */}
              {activeTab === "moods" && (
                <div className="space-y-4 mt-2 flex-1 flex flex-col justify-between pb-2">
                  <div className="space-y-3">
                    <div className="space-y-1 text-center">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Mood Sync</h3>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        Share your current vibe. Keep your connection rhythm alive!
                      </p>
                    </div>

                    {/* Streak Flame Counter Display */}
                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 animate-pulse">
                          <Flame className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-slate-800 block">Daily Rhythm Streak</span>
                          <span className="text-[8px] text-orange-600 font-bold block">Keep your rhythm alive</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className="text-sm font-black text-slate-800">{streakDays}</span>
                        <span className="text-[9px] font-extrabold text-orange-600">DAYS</span>
                      </div>
                    </div>

                    {/* Mood comparison block */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs text-center space-y-1">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wide">You</span>
                        <span className="block text-lg mt-1 select-none">🧸</span>
                        <span className="block text-[9px] font-bold text-slate-700">{myMood}</span>
                      </div>

                      <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs text-center space-y-1">
                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wide">Partner</span>
                        <span className="block text-lg mt-1 select-none">🥺</span>
                        <span className="block text-[9px] font-bold text-slate-700">{partnerMood}</span>
                      </div>
                    </div>
                  </div>

                  {/* Change my mood */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Choose your mood:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { label: "Loved 🥰", val: "Loved 🥰" },
                        { label: "Cozy 🧸", val: "Cozy 🧸" },
                        { label: "Sleepy 🥱", val: "Sleepy 🥱" },
                        { label: "Missing You 🥺", val: "Missing You 🥺" },
                        { label: "Excited 🎉", val: "Excited 🎉" },
                        { label: "Chill ☕", val: "Chill ☕" }
                      ].map(mood => (
                        <button
                          key={mood.label}
                          onClick={() => {
                            setMyMood(mood.val);
                            triggerHearts();
                            setStreakDays(prev => prev + 1);
                          }}
                          className={`py-2 px-1 rounded-xl text-[9px] font-semibold transition-all border cursor-pointer ${
                            myMood === mood.val 
                              ? `${currentTheme.primary} border-transparent text-white shadow-xs` 
                              : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {mood.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Shared Polaroids */}
              {activeTab === "memories" && (
                <div className="space-y-4 flex-1 flex flex-col pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Our Sanctuary</span>
                    <button className={`w-5 h-5 rounded-full ${currentTheme.primary} flex items-center justify-center text-white cursor-pointer`}>
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Polaroid Feed */}
                  <div className="space-y-4 mt-2 overflow-y-auto pr-0.5 flex-1 max-h-[400px]">
                    {memories.map(mem => (
                      <div key={mem.id} className="bg-white p-2.5 pb-4 rounded-xl border border-slate-100 shadow-2xs rotate-[-1deg] hover:rotate-[0deg] transition-all duration-300">
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                          <img 
                            src={mem.img} 
                            alt={mem.cap} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-[8px] font-bold text-white px-2 py-0.5 rounded-full">
                            {mem.date}
                          </div>
                        </div>
                        <p className="text-[9px] font-bold text-slate-800 text-center mt-3 tracking-tight font-serif italic">
                          "{mem.cap}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Live Love Touch (Fingerprint Scanner) */}
              {activeTab === "lovemeter" && (
                <div className="space-y-6 mt-2 flex flex-col h-full justify-between pb-2 flex-1">
                  <div className="space-y-2 text-center">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Love Touch</h3>
                    <p className="text-[9px] text-slate-400 leading-normal max-w-[200px] mx-auto">
                      Hold the fingerprint scanner at the same time to sync your physical heartbeat vibes.
                    </p>
                  </div>

                  {/* Fingerprint interactive scan button */}
                  <div className="relative flex-1 flex flex-col items-center justify-center py-4">
                    <button
                      onMouseDown={startLoveTouch}
                      onMouseUp={endLoveTouch}
                      onMouseLeave={endLoveTouch}
                      onTouchStart={startLoveTouch}
                      onTouchEnd={endLoveTouch}
                      className={`relative w-28 h-28 rounded-full border-4 border-slate-900/10 flex items-center justify-center transition-all duration-500 cursor-pointer shadow-md select-none outline-none ${
                        touchState === "touching" 
                          ? `${currentTheme.primary} text-white border-transparent scale-110 shadow-lg` 
                          : touchState === "synced"
                            ? "bg-rose-500 text-white border-transparent scale-105 shadow-xl"
                            : "bg-white text-slate-400 hover:text-[#FF4F18]"
                      }`}
                    >
                      <Fingerprint className={`w-14 h-14 ${touchState === "touching" ? "animate-pulse" : ""}`} />
                      
                      {/* Radar ripples */}
                      {touchState === "touching" && (
                        <>
                          <div className={`absolute inset-0 rounded-full w-28 h-28 border-4 border-[#FF4F18] opacity-50 animate-ping`}></div>
                          <div className={`absolute -inset-4 rounded-full border border-orange-300 opacity-20 animate-pulse`}></div>
                        </>
                      )}
                      
                      {touchState === "synced" && (
                        <div className="absolute inset-0 rounded-full w-28 h-28 border-4 border-rose-600 opacity-60 animate-ping"></div>
                      )}
                    </button>

                    {/* Status feedback */}
                    <div className="text-center mt-6 h-6">
                      {touchState === "idle" && (
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest animate-pulse">
                          ← PRESS & HOLD SCANNERS →
                        </span>
                      )}
                      {touchState === "touching" && (
                        <span className="text-[9px] font-black text-[#FF4F18] uppercase tracking-widest animate-bounce">
                          Syncing heartbeats...
                        </span>
                      )}
                      {touchState === "synced" && (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest">
                            Synced with Partner!
                          </span>
                          <button 
                            onClick={resetLoveTouch}
                            className="text-[7px] text-slate-400 hover:text-slate-600 uppercase tracking-wider font-extrabold"
                          >
                            Tap to reset
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[8px] text-slate-500 font-bold leading-normal">
                      Encrypted peer-to-peer heartbeat signal sync. 100% private.
                    </span>
                  </div>
                </div>
              )}

              {/* Tab 5: Couple Goals & Games */}
              {activeTab === "goals" && (
                <div className="space-y-4 mt-1 flex-1 flex flex-col justify-between pb-2 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="space-y-1 text-center">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Goals & Games</h3>
                      <p className="text-[9px] text-slate-400 leading-normal">
                        Bond through co-op goals and quiz question matchers.
                      </p>
                    </div>

                    {/* Mini Gameboard: Would-You-Rather */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
                      <div className="flex items-center gap-1">
                        <Gamepad2 className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wide">Daily Match Quiz</span>
                      </div>
                      
                      <div className="text-[10px] font-bold text-slate-800 leading-tight">
                        Would you rather...
                      </div>

                      {gameSelection === "none" ? (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <button
                            onClick={() => {
                              setGameSelection("cabin");
                              triggerHearts();
                            }}
                            className="p-2 rounded-xl border border-slate-100 text-[9px] font-bold hover:bg-slate-50 active:scale-95 transition-all text-slate-600 cursor-pointer"
                          >
                            Cozy Cabin 🏕️
                          </button>
                          <button
                            onClick={() => {
                              setGameSelection("beach");
                              triggerHearts();
                            }}
                            className="p-2 rounded-xl border border-slate-100 text-[9px] font-bold hover:bg-slate-50 active:scale-95 transition-all text-slate-600 cursor-pointer"
                          >
                            Luxury Beach 🏝️
                          </button>
                        </div>
                      ) : (
                        <div className="bg-indigo-50/50 p-2 rounded-xl border border-indigo-100 flex flex-col items-center gap-1 mt-1 animate-scale-up">
                          <span className="text-[9px] font-black text-indigo-700">
                            {gameSelection === "cabin" ? "Cozy Cabin 🏕️" : "Luxury Beach 🏝️"} Selected!
                          </span>
                          <span className="text-[8px] text-slate-500 font-semibold">
                            Partner voted Cozy Cabin (88% Match Rate!)
                          </span>
                          <button 
                            onClick={() => setGameSelection("none")}
                            className="text-[7px] text-indigo-500 hover:text-indigo-700 font-extrabold uppercase mt-1 tracking-wider"
                          >
                            Play Again
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Shared Couple Goals list with optimistic checkers */}
                    <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-wide">Shared Milestones</span>
                        </div>
                        <span className="text-[7px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">3 Goals</span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {/* Goal 1 */}
                        <div 
                          onClick={() => setGoalChecked(prev => ({ ...prev, italy: !prev.italy }))}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className={`text-[9px] font-bold ${goalChecked.italy ? "line-through text-slate-400" : "text-slate-700"}`}>
                            Road trip in Italy 🇮🇹
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                            goalChecked.italy ? "bg-emerald-500 border-transparent text-white" : "border-slate-300"
                          }`}>
                            {goalChecked.italy && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                          </div>
                        </div>

                        {/* Goal 2 */}
                        <div 
                          onClick={() => setGoalChecked(prev => ({ ...prev, move: !prev.move }))}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className={`text-[9px] font-bold ${goalChecked.move ? "line-through text-slate-400" : "text-slate-700"}`}>
                            Move in together 🔑
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                            goalChecked.move ? "bg-emerald-500 border-transparent text-white" : "border-slate-300"
                          }`}>
                            {goalChecked.move && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                          </div>
                        </div>

                        {/* Goal 3 */}
                        <div 
                          onClick={() => setGoalChecked(prev => ({ ...prev, savings: !prev.savings }))}
                          className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className={`text-[9px] font-bold ${goalChecked.savings ? "line-through text-slate-400" : "text-slate-700"}`}>
                            Vacation Nest Fund 💰
                          </span>
                          <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center transition-all ${
                            goalChecked.savings ? "bg-emerald-500 border-transparent text-white" : "border-slate-300"
                          }`}>
                            {goalChecked.savings && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Heart Particles */}
              {hearts.map(heart => (
                <div
                  key={heart.id}
                  className="absolute bottom-16 text-[#FF4F18] pointer-events-none z-40 text-xs animate-float-heart"
                  style={{
                    left: `${heart.left}%`,
                    animationDelay: `${heart.delay}s`
                  }}
                >
                  ❤️
                </div>
              ))}

            </div>

            {/* Simulated iPhone Home bar */}
            <div className="py-2.5 flex justify-center mt-auto">
              <div className="w-24 h-1 bg-slate-900/20 rounded-full"></div>
            </div>

          </div>
        </div>

        {/* Global theme switcher on top right */}
        <div className="absolute -top-6 -right-6 bg-white/95 border border-slate-100/90 shadow-lg px-2.5 py-2 rounded-2xl z-40 flex items-center gap-2 animate-fade-in backdrop-blur-md">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Theme:</span>
          <div className="flex gap-1">
            {(["rose", "midnight", "coral", "mint"] as const).map(th => {
              const bg = 
                th === "rose" ? "bg-pink-500" :
                th === "midnight" ? "bg-indigo-500" :
                th === "coral" ? "bg-[#FF4F18]" :
                "bg-emerald-500";
              return (
                <button
                  key={th}
                  onClick={() => setActiveTheme(th)}
                  className={`w-4.5 h-4.5 rounded-full ${bg} transition-all cursor-pointer ${
                    activeTheme === th ? "ring-2 ring-slate-800 scale-110" : "opacity-80 hover:opacity-100"
                  }`}
                />
              );
            })}
          </div>
        </div>

      </div>

      {/* Styled Heart Animation styles in TSX */}
      <style jsx global>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translateY(-20px) scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-220px) scale(0.6);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: floatHeart 1.8s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes scaleUp {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

    </div>
  );
}

