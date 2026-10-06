"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE } from "@/lib/constants";

type HeaderProps = {
  /** Welk onepager we tonen, zodat we naar de "andere kant" kunnen linken. */
  active: "vending" | "apartments";
};

const CROSS_LINK = {
  vending: {
    href: "/apartments",
    label: "Ook interessant: Marjani Apartments",
  },
  apartments: {
    href: "/vending",
    label: "Ook interessant: Marjani Vending",
  },
};

const NAME_SECOND_WORD = {
  vending: "VENDING",
  apartments: "APARTMENTS",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// [r, g, b, a] tuples so the header can smoothly cross-fade between "over
// the dark cinematic hero" and "over a light section" as the user scrolls —
// no state, no re-render, just a handful of inline styles on the root node.
const HERO_BG: [number, number, number, number] = [10, 35, 24, 0.18];
const LIGHT_BG: [number, number, number, number] = [246, 243, 233, 0.88];
const HERO_BORDER: [number, number, number, number] = [255, 255, 255, 0.16];
const LIGHT_BORDER: [number, number, number, number] = [8, 59, 39, 0.14];
const HERO_FG: [number, number, number, number] = [246, 243, 233, 1];
const LIGHT_FG: [number, number, number, number] = [8, 59, 39, 1];
const HERO_FG_MUTED: [number, number, number, number] = [246, 243, 233, 0.75];
const LIGHT_FG_MUTED: [number, number, number, number] = [8, 59, 39, 0.68];

function mix(a: [number, number, number, number], b: [number, number, number, number], t: number) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  const al = a[3] + (b[3] - a[3]) * t;
  return `rgba(${r}, ${g}, ${bl}, ${al.toFixed(3)})`;
}

export default function Header({ active }: HeaderProps) {
  const cross = CROSS_LINK[active];
  const headerRef = useRef<HTMLElement>(null);

  // The header lives outside the hero's sticky/scroll system entirely — it
  // only ever reads scroll position to decide how "light" it should look,
  // using the hero's own height (if present on this page) as the distance
  // over which that cross-fade happens.
  useEffect(() => {
    let heroHeight = window.innerHeight;
    let rafId: number | null = null;

    function measure() {
      const hero = document.getElementById("hero-scroll-section");
      heroHeight = hero?.offsetHeight ?? window.innerHeight;
    }

    function apply() {
      rafId = null;
      const header = headerRef.current;
      if (!header) return;

      const t = clamp(window.scrollY / Math.max(heroHeight, 1), 0, 1);

      header.style.background = mix(HERO_BG, LIGHT_BG, t);
      header.style.borderColor = mix(HERO_BORDER, LIGHT_BORDER, t);
      header.style.boxShadow = `0 ${(6 + 2 * t).toFixed(1)}px ${(24 + 4 * t).toFixed(
        1
      )}px rgba(0,0,0,${(0.08 + 0.06 * t).toFixed(3)})`;
      header.style.setProperty("--fg", mix(HERO_FG, LIGHT_FG, t));
      header.style.setProperty("--fg-muted", mix(HERO_FG_MUTED, LIGHT_FG_MUTED, t));
    }

    function onScroll() {
      if (rafId === null) rafId = requestAnimationFrame(apply);
    }
    function onResize() {
      measure();
      onScroll();
    }

    measure();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-3 top-3 z-[9999] mx-auto h-[54px] max-w-[1280px] rounded-[14px] border font-manrope transition-[background-color,border-color,box-shadow] duration-300 ease-out sm:inset-x-6 sm:top-4 sm:h-[62px] sm:rounded-2xl"
      style={
        {
          background: "rgba(10,35,24,0.18)",
          borderColor: "rgba(255,255,255,0.16)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
          backdropFilter: "blur(18px) saturate(120%)",
          WebkitBackdropFilter: "blur(18px) saturate(120%)",
          "--fg": "rgba(246,243,233,1)",
          "--fg-muted": "rgba(246,243,233,0.75)",
        } as unknown as CSSProperties
      }
    >
      <div className="flex h-full w-full items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Logo variant="mark" className="h-9 w-9 sm:h-10 sm:w-10" />
          <span
            className="hidden text-sm font-bold tracking-wide transition-colors duration-300 sm:inline"
            style={{ color: "var(--fg)" }}
          >
            MARJANI <span className="text-mv-gold-bright">{NAME_SECOND_WORD[active]}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href={cross.href}
            className="hidden text-[13px] font-semibold tracking-[0.01em] transition-colors duration-300 hover:opacity-75 md:inline-block"
            style={{ color: "var(--fg-muted)" }}
          >
            {cross.label}
          </Link>
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-300 hover:opacity-75 lg:flex"
            style={{ color: "var(--fg-muted)" }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M6.6 10.8c1.2 2.4 3.2 4.3 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H7.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-1.9 1.9z" />
            </svg>
            {SITE.phoneDisplay}
          </a>
          <Link
            href="#contact"
            className="inline-flex h-[42px] shrink-0 items-center rounded-[10px] bg-mv-gold-bright px-[18px] text-[12px] font-extrabold text-mv-green-deep shadow-[0_6px_16px_-6px_rgba(0,0,0,0.4)] transition-transform duration-200 ease-out hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-mv-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-mv-green-deep"
          >
            Neem contact op
          </Link>
        </nav>
      </div>
    </header>
  );
}
