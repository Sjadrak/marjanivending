"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EuroIcon, ServiceIcon, ClockIcon, LeafIcon } from "@/components/icons";

const POSTER_SRC = "/images/herobanner.png";
const VIDEO_SRC = "/images/finalcutherovid.mp4";

// How quickly the rendered video time catches up to the scroll target.
const SMOOTHING = 0.12;

const heroBenefits = [
  { title: ["Kosteloze", "plaatsing"], icon: EuroIcon },
  { title: ["Volledige", "service"], icon: ServiceIcon },
  { title: ["24/7", "beschikbaar"], icon: ClockIcon },
  { title: ["Duurzame", "oplossingen"], icon: LeafIcon },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Smoothstep — used for the content drift and video scale, so they ease
// rather than move in lockstep with the raw scroll value.
function smoothstep(p: number) {
  return p * p * (3 - 2 * p);
}

// Piecewise opacity curve for the primary text block, matching the
// requested 0→0.25→0.55→0.80→1 breakpoints (1 / 0.65 / 0.20 / 0).
function primaryOpacity(p: number) {
  if (p <= 0.25) return 1;
  if (p <= 0.55) return 1 - ((p - 0.25) / 0.3) * 0.35;
  if (p <= 0.8) return 0.65 - ((p - 0.55) / 0.25) * 0.45;
  return Math.max(0, 0.2 - ((p - 0.8) / 0.2) * 0.2);
}

// The CTA/trust/benefits row fades on the same curve but earlier, so it
// recedes first while the headline is still legible.
function secondaryOpacity(p: number) {
  return primaryOpacity(clamp(p * 1.4, 0, 1));
}

// Overlay intensity as a fraction of its resting value — the scene visually
// "opens up" as this approaches its floor (rgba(2,28,18,0.82) → 0.18).
function overlayFactor(p: number) {
  if (p <= 0.5) return 1 - (p / 0.5) * (1 - 0.61);
  return 0.61 - ((p - 0.5) / 0.5) * (0.61 - 0.22);
}

export default function HeroScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentGroupRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Video only mounts once we've confirmed the device/network/motion
  // preference can sensibly handle it — server + first client render always
  // show just the static poster, so there is nothing to hydrate mismatched.
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const connection = (navigator as any).connection;
    const saveData = Boolean(connection?.saveData);
    const slowNetwork = Boolean(
      connection?.effectiveType && /2g/.test(connection.effectiveType)
    );
    const lowMemory = Boolean(
      (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
    );

    if (!reducedMotion && !saveData && !slowNetwork && !lowMemory) {
      setVideoEnabled(true);
    }
  }, []);

  // Scroll-scrubbing + synchronized content transition. Scroll position sets
  // a target progress (0-1); a persistent rAF loop smoothly lerps toward it
  // and drives the video time, overlay, content fade/drift and video scale
  // together from that single value.
  useEffect(() => {
    if (!videoEnabled) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section) return;

    let sectionTop = 0;
    let scrollDistance = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId: number | null = null;
    let inView = true;

    function measure() {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      scrollDistance = section.offsetHeight - window.innerHeight;
    }

    function applyProgress(p: number) {
      const drift = smoothstep(p);

      if (video && video.readyState >= 2 && video.duration) {
        video.currentTime = p * video.duration;
        video.style.transform = `scale(${1 + 0.03 * drift})`;
      }
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(overlayFactor(p));
      }
      if (contentGroupRef.current) {
        contentGroupRef.current.style.transform = `translateY(${-40 * drift}px)`;
      }
      if (primaryRef.current) {
        primaryRef.current.style.opacity = String(primaryOpacity(p));
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.opacity = String(secondaryOpacity(p));
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(
          clamp(1 - p * 2.5, 0, 1)
        );
      }
    }

    function loop() {
      const next = currentProgress + (targetProgress - currentProgress) * SMOOTHING;
      const settled = Math.abs(targetProgress - next) < 0.0008;
      currentProgress = settled ? targetProgress : next;
      applyProgress(currentProgress);

      if (!settled && inView) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }

    function ensureLoop() {
      if (rafId === null) {
        rafId = requestAnimationFrame(loop);
      }
    }

    function onScroll() {
      const raw =
        scrollDistance > 0 ? (window.scrollY - sectionTop) / scrollDistance : 0;
      targetProgress = clamp(raw, 0, 1);
      ensureLoop();
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) ensureLoop();
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(section);

    function handleReady() {
      video?.pause();
      setVideoVisible(true);
    }
    function handleError() {
      setVideoEnabled(false);
      setVideoVisible(false);
    }
    video?.addEventListener("loadedmetadata", handleReady);
    video?.addEventListener("canplay", handleReady);
    video?.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
      video?.removeEventListener("loadedmetadata", handleReady);
      video?.removeEventListener("canplay", handleReady);
      video?.removeEventListener("error", handleError);
    };
  }, [videoEnabled]);

  return (
    <section
      ref={sectionRef}
      id="hero-scroll-section"
      className="relative h-[130vh] bg-mv-green-deep"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-mv-green-deep font-manrope text-white">
        {/* BackgroundImage — always present: initial paint, poster, and failsafe */}
        <Image
          src={POSTER_SRC}
          alt="Premium Marjani-snackautomaat met illuminated wandlogo in een moderne kantoorlobby"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none z-0 object-[62%_60%] object-cover sm:object-[58%_60%] lg:object-[56%_62%]"
        />

        {/* BackgroundVideo — scroll-scrubbed, never autoplaying, fades in once ready */}
        {videoEnabled && (
          <video
            ref={videoRef}
            className={`pointer-events-none absolute inset-0 z-[1] h-full w-full object-[62%_60%] object-cover transition-opacity duration-700 ease-out will-change-transform sm:object-[58%_60%] lg:object-[56%_62%] ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        {/* CinematicOverlay — left-to-right gradient so the copy stays readable;
            its intensity is scroll-driven so the scene visually "opens up". */}
        <div ref={overlayRef} className="absolute inset-0 z-[2]">
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,28,18,0.94) 0%, rgba(3,39,24,0.82) 35%, rgba(3,40,25,0.46) 62%, rgba(3,32,20,0.1) 100%)",
            }}
          />
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(90deg, rgba(2,28,18,0.96) 0%, rgba(3,39,24,0.9) 50%, rgba(3,40,25,0.5) 82%, rgba(3,32,20,0.18) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mv-green-deep/55 via-transparent to-transparent" />
        </div>

        {/* HeroContent — a narrower, quieter editorial column set into the scene */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1200px] flex-col px-6 pt-[128px] sm:px-10 sm:pt-[140px] lg:px-8 lg:pt-[160px]">
          <div
            ref={contentGroupRef}
            className="relative max-w-[560px] will-change-transform"
          >
            {/* Smoked-glass backdrop — feathered, no hard edges, no card shape */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10"
              style={{
                background: "rgba(2, 28, 18, 0.38)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                maskImage:
                  "radial-gradient(ellipse 70% 75% at 32% 42%, black 30%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 75% at 32% 42%, black 30%, transparent 100%)",
              }}
            />

            <div ref={primaryRef} className="will-change-[opacity]">
              <span className="animate-fade-up inline-flex items-center rounded-full border border-mv-gold/30 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-mv-cream/90">
                Marjani Global Services
              </span>

              <h1 className="animate-fade-up mt-5 text-[32px] font-bold uppercase leading-[1.02] tracking-[-0.02em] text-white [animation-delay:80ms] sm:text-[38px] lg:text-[48px] lg:tracking-[-0.025em]">
                Vending
                <br />
                Zonder zorgen,
                <br />
                <span className="text-mv-gold-bright">Op uw locatie</span>
              </h1>

              <p className="animate-fade-up mt-5 max-w-[440px] text-[15px] leading-[1.6] text-mv-cream/85 [animation-delay:160ms] sm:text-[16px]">
                Professionele snack- en frisdrankautomaten &mdash; volledig
                kosteloos geplaatst. Wij regelen de installatie, bevoorrading
                en het onderhoud. U geniet 24/7 van tevreden mensen.
              </p>
            </div>

            <div
              ref={secondaryRef}
              className="mt-6 will-change-[opacity]"
            >
              <div className="animate-fade-up flex flex-wrap items-center gap-3 [animation-delay:240ms]">
                <Link
                  href="#contact"
                  className="group inline-flex h-[46px] items-center justify-center gap-2 rounded-[9px] bg-mv-gold-bright px-5 text-[12px] font-extrabold uppercase tracking-wide text-mv-green-deep shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(232,190,63,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mv-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-mv-green-deep"
                >
                  Gratis offerte aanvragen
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                    <path
                      d="M7.5 10h5M10 7.5 12.5 10 10 12.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="#service"
                  className="inline-flex h-[46px] items-center justify-center rounded-[9px] border border-white/25 bg-white/[0.06] px-5 text-[12px] font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mv-green-deep"
                >
                  Meer over onze service
                </Link>
              </div>

              <p className="animate-fade-up mt-5 text-[12px] text-mv-cream/65 [animation-delay:300ms]">
                Onderdeel van Marjani Global Services &middot; Wateringen
              </p>

              <div className="animate-fade-up mt-5 flex flex-wrap gap-y-3 [animation-delay:360ms]">
                {heroBenefits.map(({ title, icon: Icon }, i) => (
                  <div
                    key={title.join(" ")}
                    className={`flex min-h-[34px] items-center gap-2 pr-5 ${
                      i > 0 ? "border-l border-mv-gold/20 pl-5" : ""
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0 text-mv-gold-bright" />
                    <span className="text-[9px] font-bold uppercase leading-tight tracking-[0.03em] text-white/90">
                      {title[0]}
                      <br />
                      {title[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ScrollIndicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-6 z-10 hidden items-center gap-3 sm:left-10 sm:flex lg:left-8"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-mv-gold/50">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
              <path
                d="M8 3v9M4.5 8.5 8 12l3.5-3.5"
                stroke="#F2C94C"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-white">
            Scroll verder
          </span>
        </div>
      </div>

      {/* Seamless hand-off into the next (cream) section — no hard cut */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-b from-transparent to-off-white sm:h-32" />
    </section>
  );
}
