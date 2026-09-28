import React, { useEffect, useRef, useState } from 'react';
import { AboutContent } from './About';
import { EducationContent } from './Education';
import Kolkataweather from "./Kolkataweather";
const TOTAL_FRAMES = 150;

// ── Scroll phase boundaries (0→1 over the whole container) ──────────────────
// Phase 0: 0.00 → 0.60  Canvas plays frames 1→150
// Phase 1: 0.60 → 0.70  Hero overlay exits LEFT + fades
// Phase 2: 0.70 → 0.85  About panel enters from RIGHT
// Phase 3: 0.85 → 0.90  About panel exits LEFT + fades
// Phase 4: 0.90 → 1.00  Education panel enters from RIGHT
const P = {
  heroExitStart: 0.60,
  heroExitEnd: 0.70,
  aboutEnterStart: 0.70,
  aboutEnterEnd: 0.85,
  aboutExitStart: 0.85,
  aboutExitEnd: 0.90,
  eduEnterStart: 0.90,
  eduEnterEnd: 1.00,
};

// Typewriter cycling words: Engineer (green), Freelancer (white), Developer (sky blue)
const TYPEWRITER_WORDS = [
  { text: 'Engineer', color: 'text-[#22c55e]', article: 'an' },
  { text: 'Freelancer', color: 'text-white', article: 'a' },
  { text: 'Developer', color: 'text-[#38bdf8]', article: 'a' },
];

export default function HeroAnimation() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for panel DOM nodes (Anime.js targets them directly)
  const heroOverlayRef = useRef(null);
  const aboutPanelRef = useRef(null);
  const eduPanelRef = useRef(null);

  // Live clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex].text;
    let timer;

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  const formatTime = (d) =>
    `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

  const formatDate = (d) =>
    d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });

  const scrollTo = (id) => {
    const homeEl = document.getElementById('home');
    if (homeEl && (id === 'home' || id === 'about' || id === 'education')) {
      const totalScrollable = homeEl.offsetHeight - window.innerHeight;
      let targetProgress = 0;
      if (id === 'home') targetProgress = 0;
      else if (id === 'about') targetProgress = 0.78;
      else if (id === 'education') targetProgress = 0.96;

      const targetY = homeEl.offsetTop + targetProgress * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Canvas animation state ──────────────────────────────────────────────────
  const canvasAnimRef = useRef({
    targetFraction: 0,
    currentFraction: 0,
    lastDrawnFrame: -1,
    rafId: null,
  });

  // Draw one frame onto the canvas (cover-fit, hi-DPI)
  const drawFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img?.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = window.innerWidth, H = window.innerHeight;
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    const r = Math.max(canvas.width / img.width, canvas.height / img.height);
    const cx = (canvas.width - img.width * r) / 2;
    const cy = (canvas.height - img.height * r) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * r, img.height * r);
  };

  // Preload all 150 frames
  useEffect(() => {
    let done = 0;
    const imgs = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero_page_animation/ezgif-frame-${String(i).padStart(3, '0')}.png`;
      img.onload = img.onerror = () => {
        done++;
        setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100));
        if (i === 1 && img.complete) drawFrame(img);
        if (done === TOTAL_FRAMES) setIsLoaded(true);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
    return () => { imagesRef.current = []; };
  }, []);

  // ── Main scroll + animation loop ────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;

    // Set initial CSS states for panels
    // Hero overlay: visible at start
    if (heroOverlayRef.current) {
      heroOverlayRef.current.style.opacity = '1';
      heroOverlayRef.current.style.transform = 'translateX(0px)';
      heroOverlayRef.current.style.pointerEvents = 'auto';
    }
    // About panel: hidden off-screen right
    if (aboutPanelRef.current) {
      aboutPanelRef.current.style.opacity = '0';
      aboutPanelRef.current.style.transform = 'translateX(100%)';
      aboutPanelRef.current.style.pointerEvents = 'none';
    }
    // Education panel: hidden off-screen right
    if (eduPanelRef.current) {
      eduPanelRef.current.style.opacity = '0';
      eduPanelRef.current.style.transform = 'translateX(100%)';
      eduPanelRef.current.style.pointerEvents = 'none';
    }

    const updateFromProgress = (rawProgress) => {
      const p = Math.min(Math.max(rawProgress, 0), 1);

      // ── 1. Drive canvas frames (only in 0→60% range) ──────────────────────
      const canvasFraction = Math.min(p / P.heroExitStart, 1); // 0→1 within first 60%
      canvasAnimRef.current.targetFraction = canvasFraction;

      // ── 2. Hero overlay: visible until 60%, then slides left + fades ───────
      if (heroOverlayRef.current) {
        let tx = 0, op = 1, pe = 'auto';
        if (p >= P.heroExitStart) {
          const t = Math.min((p - P.heroExitStart) / (P.heroExitEnd - P.heroExitStart), 1);
          // eased cubic
          const ease = t * t * (3 - 2 * t);
          tx = -160 * ease;
          op = 1 - ease;
          pe = 'none';
        }
        heroOverlayRef.current.style.opacity = String(op);
        heroOverlayRef.current.style.transform = `translateX(${tx}px)`;
        heroOverlayRef.current.style.pointerEvents = pe;
      }

      // ── 3. About panel: enters from RIGHT in 70%→85% ──────────────────────
      if (aboutPanelRef.current) {
        let tx = 100, op = 0, pe = 'none';

        if (p >= P.aboutEnterStart && p < P.aboutExitStart) {
          if (p < P.aboutEnterEnd) {
            // entering
            const t = (p - P.aboutEnterStart) / (P.aboutEnterEnd - P.aboutEnterStart);
            const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
            tx = 100 - 100 * ease;
            op = ease;
          } else {
            // fully visible
            tx = 0;
            op = 1;
          }
          pe = op > 0.1 ? 'auto' : 'none';
        }

        if (p >= P.aboutExitStart) {
          // exiting left
          const t = Math.min((p - P.aboutExitStart) / (P.aboutExitEnd - P.aboutExitStart), 1);
          const ease = t * t * (3 - 2 * t);
          tx = -160 * ease;
          op = 1 - ease;
          pe = 'none';
        }

        aboutPanelRef.current.style.opacity = String(Math.max(op, 0));
        aboutPanelRef.current.style.transform = `translateX(${tx}%)`;
        aboutPanelRef.current.style.pointerEvents = pe;
      }

      // ── 4. Education panel: enters from RIGHT in 90%→100% ─────────────────
      if (eduPanelRef.current) {
        let tx = 100, op = 0, pe = 'none';

        if (p >= P.eduEnterStart) {
          const t = Math.min((p - P.eduEnterStart) / (P.eduEnterEnd - P.eduEnterStart), 1);
          const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
          tx = 100 - 100 * ease;
          op = ease;
          pe = op > 0.1 ? 'auto' : 'none';
        }

        eduPanelRef.current.style.opacity = String(Math.max(op, 0));
        eduPanelRef.current.style.transform = `translateX(${tx}%)`;
        eduPanelRef.current.style.pointerEvents = pe;
      }
    };

    // Scroll listener to compute hero container progress
    const onScrollHandler = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;
      const raw = -rect.top / totalScrollable;
      updateFromProgress(raw);
    };

    window.addEventListener('scroll', onScrollHandler, { passive: true });
    window.addEventListener('resize', onScrollHandler);
    onScrollHandler(); // init

    // ── Canvas lerp RAF loop ────────────────────────────────────────────────
    const rafLoop = () => {
      const state = canvasAnimRef.current;
      state.currentFraction += (state.targetFraction - state.currentFraction) * 0.12;
      const idx = Math.min(
        Math.max(Math.round(state.currentFraction * (TOTAL_FRAMES - 1)), 0),
        TOTAL_FRAMES - 1
      );
      if (idx !== state.lastDrawnFrame) {
        const imgs = imagesRef.current;
        let img = imgs[idx];
        if (!img?.complete) {
          for (let o = 1; o < TOTAL_FRAMES; o++) {
            const a = imgs[idx - o], b = imgs[idx + o];
            if (a?.complete) { img = a; break; }
            if (b?.complete) { img = b; break; }
          }
        }
        if (img?.complete) { drawFrame(img); state.lastDrawnFrame = idx; }
      }
      state.rafId = requestAnimationFrame(rafLoop);
    };
    canvasAnimRef.current.rafId = requestAnimationFrame(rafLoop);

    const animState = canvasAnimRef.current;
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
      window.removeEventListener('resize', onScrollHandler);
      if (animState.rafId) cancelAnimationFrame(animState.rafId);
    };
  }, [isLoaded]);

  return (
    /**
     * Container height = 700vh:
     *   ~320vh for frame animation (60%)
     *   ~130vh for hero exit + About enter (70%→85%)
     *   ~50vh  for About exit (85%→90%)
     *   ~70vh  for Education enter (90%→100%)
     */
    <section id="home" ref={containerRef} className="relative w-full bg-black" style={{ height: '700vh' }}>
      {/* Invisible anchor targets positioned at exact scroll milestones for native hash links */}
      <div
        id="about"
        className="absolute w-full pointer-events-none"
        style={{ top: '66.85%', height: '1px' }}
      />
      <div
        id="education"
        className="absolute w-full pointer-events-none"
        style={{ top: '82.28%', height: '1px' }}
      />

      {/* ── Sticky fullscreen viewport ───────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Background canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block select-none pointer-events-none z-0"
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/35 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none z-10" />

        {/* ── Panel: HERO OVERLAY ─────────────────────────────────────────── */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 z-20 flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 max-w-7xl mx-auto w-full"
          style={{ willChange: 'transform, opacity', transition: 'none' }}
        >
          {/* Main Text + CTAs */}
          <div className="my-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md mb-5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
              <span className="text-xs font-mono text-gray-200 tracking-wider uppercase font-medium">
                Full-Stack Developer · ML Enthusiast
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light mb-2 tracking-wide">
              Hey, I'm Saptarshi Mondal {TYPEWRITER_WORDS[wordIndex].article}
            </h3>
            <h1
              className={`text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] min-h-[1.15em] flex items-center ${TYPEWRITER_WORDS[wordIndex].color}`}
            >
              <span>{displayText}</span>
              <span className="inline-block w-[3px] sm:w-[5px] h-[0.85em] bg-current ml-2 sm:ml-3 animate-pulse rounded-full" />
            </h1>
            <p className="text-base sm:text-xl text-gray-300 font-light mb-8 max-w-xl leading-relaxed">
              B.Tech in IT (2026) · Kalyani Government Engineering College. Building full-stack systems with React, Django, Flask & Machine Learning.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <button
                onClick={() => scrollTo('contact')}
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-[#0284c7] hover:from-blue-500 hover:to-[#38bdf8] text-white pl-6 pr-2 py-2 rounded-full font-medium text-sm sm:text-base shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <span>Hire Me</span>
                <span className="w-8 h-8 rounded-full bg-[#38bdf8]/30 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>

              <a
                href="/Saptarshi_Mondal_CV.pdf"
                download="Saptarshi_Mondal_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-[#38bdf8]/60 hover:border-[#38bdf8] text-white px-6 py-3 rounded-full font-medium text-sm sm:text-base shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
              >
                <span>Download CV</span>
                <svg className="w-4 h-4 text-[#38bdf8] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Bottom: Social Icons + Live Clock */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'GitHub', href: 'https://github.com/EElectriX',
                  path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
                },
                {
                  label: 'LinkedIn', href: 'https://linkedin.com',
                  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.73C24 .774 23.205 0 22.225 0z',
                },
                {
                  label: 'LeetCode', href: 'https://leetcode.com/u/ElectriX/',
                  path: 'M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.247 5.247 0 00-3.85-1.363c-1.472 0-2.885.587-3.924 1.625l-4.32 4.381c-1.039 1.039-1.611 2.452-1.611 3.924s.572 2.885 1.611 3.924l4.332 4.363c1.039 1.039 2.452 1.625 3.924 1.625 1.472 0 2.885-.586 3.924-1.625l2.609-2.636c.514-.514.496-1.365-.039-1.901-.535-.535-1.386-.553-1.9.038zM20.811 13.01H10.666c-.744 0-1.348.604-1.348 1.348s.604 1.348 1.348 1.348h10.145c.744 0 1.348-.604 1.348-1.348s-.604-1.348-1.348-1.348z',
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#38bdf8]/20 border border-white/10 hover:border-[#38bdf8]/50 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Right side: Live Clock + Kolkata Weather grouped together */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-8 text-left sm:text-right">
              {/* Live Clock */}
              <div>
                <div className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white/95 leading-none">
                  {formatTime(currentTime)}
                </div>
                <p className="text-sm sm:text-base text-white/80 font-light mt-1.5">
                  {formatDate(currentTime)}
                </p>
              </div>

              {/* Subtle vertical divider between Clock and Weather */}
              <div className="hidden sm:block w-[1px] h-12 bg-white/20 self-center" />

              {/* Kolkata Weather */}
              <Kolkataweather />
            </div>
          </div>
        </div>

        {/* ── Panel: ABOUT ────────────────────────────────────────────────── */}
        <div
          ref={aboutPanelRef}
          className="absolute inset-0 z-30 overflow-y-auto no-scrollbar"
          style={{
            willChange: 'transform, opacity',
            transition: 'none',
            opacity: 0,
            transform: 'translateX(100%)',
            pointerEvents: 'none',
          }}
        >
          {/* Dark overlay to enhance readability over canvas */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none" />
          <div className="relative z-10 min-h-full flex items-center pt-6">
            <AboutContent />
          </div>
        </div>

        {/* ── Panel: EDUCATION ────────────────────────────────────────────── */}
        <div
          ref={eduPanelRef}
          className="absolute inset-0 z-30 overflow-y-auto no-scrollbar"
          style={{
            willChange: 'transform, opacity',
            transition: 'none',
            opacity: 0,
            transform: 'translateX(100%)',
            pointerEvents: 'none',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-none" />
          <div className="relative z-10 min-h-full flex items-center">
            <EducationContent />
          </div>
        </div>

        {/* ── Loading Indicator ─────────────────────────────────────────────── */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md z-50">
            <div className="w-52 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#38bdf8] transition-all duration-150 ease-out shadow-[0_0_12px_#38bdf8]"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-widest text-white/50 font-mono">
              Loading {loadProgress}%
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
