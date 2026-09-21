"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Knop 'terug naar het begin' met een dunne lijn die de scrollvoortgang toont. */
export default function BackToTop() {
  const barRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setShown(window.scrollY > 900);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      data-cursor="Begin"
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center overflow-hidden border border-cream/10 bg-void/80 text-cream/70 backdrop-blur-md transition duration-1400 ease-haunt hover:border-ember/60 hover:text-ember sm:bottom-8 sm:right-8",
        shown ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <span className="sr-only">Terug naar het begin</span>
      <ArrowUpIcon className="h-4 w-4" strokeWidth={1.2} />
      <span ref={barRef} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cream/50" />
    </button>
  );
}
