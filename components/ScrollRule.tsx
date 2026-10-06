"use client";

import { useEffect, useRef } from "react";

/**
 * Editorial progress marker that closes the "Wat krijgt u" section and hands
 * over to the next one: 01 ──────── 02, where the gold segment extends with
 * the reader's progress through the section and the whole rule firms up as
 * the section ends.
 *
 * Deliberately not a loading indicator — it is a typographic rule that
 * happens to respond to scroll. Driven by direct style writes inside a
 * requestAnimationFrame, so it never re-renders React.
 */
export default function ScrollRule({ from = "01", to = "02" }: { from?: string; to?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const fill = fillRef.current;
    if (!root || !fill) return;

    const section = root.closest("section");
    if (!section) return;

    let sectionTop = 0;
    let sectionHeight = 0;
    let viewportHeight = 0;
    let rafId: number | null = null;
    let inView = true;

    function measure() {
      const rect = section!.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      sectionHeight = rect.height;
      viewportHeight = window.innerHeight;
    }

    function apply() {
      rafId = null;
      if (!inView) return;
      const span = sectionHeight + viewportHeight;
      const p = span > 0
        ? Math.min(Math.max((window.scrollY + viewportHeight - sectionTop) / span, 0), 1)
        : 0;

      fill!.style.transform = `scaleX(${p.toFixed(4)})`;
      // The rule settles in as the section closes (roughly 60% → 90%).
      const presence = Math.min(Math.max((p - 0.6) / 0.3, 0), 1);
      root!.style.opacity = (0.5 + 0.5 * presence).toFixed(3);
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(section);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.24em] text-service-green/45 transition-opacity duration-300"
      style={{ opacity: 0.5 }}
    >
      <span>{from}</span>
      <span className="relative h-px flex-1 bg-service-green/12">
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-vending-yellow"
          style={{ transform: "scaleX(0)" }}
        />
      </span>
      <span>{to}</span>
    </div>
  );
}
