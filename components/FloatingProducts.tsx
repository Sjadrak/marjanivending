"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven product layer for the "Wat krijgt u" section.
 *
 * Each product follows its own curved path rather than a straight rail: a
 * sine-based lateral sway (drift/frequency/phase) plus a net sideways lean on
 * top of the upward travel, and a three-point rotation curve. Every value is
 * fixed data — nothing random — so the composition is art-directed, identical
 * on every render, and scrolling back up reverses it exactly.
 *
 * Decorative only: aria-hidden, pointer-events-none, and rendered behind the
 * section content (layer z-[1] vs. content z-10) so text can never be covered.
 *
 * Images are cleaned cutouts of the supplied product photos; the originals
 * ship with a baked-in checkerboard, so the transparent versions live in
 * /images/snacks/clean/ under the exact same filenames.
 */

type Layer = "bg" | "mid" | "fg";

type Product = {
  src: string;
  layer: Layer;
  /** Horizontal anchor — exactly one of left/right, as a percentage. */
  left?: number;
  right?: number;
  /** Vertical anchor — exactly one of top/bottom, as a percentage. */
  top?: number;
  bottom?: number;
  width: string;
  /** Upward travel as a fraction of the viewport height. */
  travel: number;
  /** Amplitude of the lateral sway, in px. */
  drift: number;
  /** Net sideways lean across the whole pass, in px (negative = leftward). */
  lean: number;
  /** Sway shape — how far the sine sweeps, and where in the wave it starts. */
  frequency: number;
  phase: number;
  /** Rotation at the start / middle / end of the pass, in degrees. */
  rot: [number, number, number];
  opacity: number;
  /**
   * Highest point the product's top edge may reach, as a fraction of the
   * section. Used on the left-hand side, where the heading and paragraph sit
   * on the bare background with no opaque card to hide behind — without this
   * a tall-travelling product would end up directly behind that text.
   */
  ceiling?: number;
  /** Section progress at which this product starts moving. */
  startProgress: number;
  /** Tailwind visibility — sets how many products each breakpoint gets. */
  visibility?: string;
};

const LAYERS: Record<
  Layer,
  { scaleFrom: number; scaleTo: number; blur: number; z: number; shadow: string }
> = {
  bg: {
    scaleFrom: 0.75,
    scaleTo: 0.92,
    blur: 0.4,
    z: 1,
    shadow: "drop-shadow(0 6px 10px rgba(0, 0, 0, 0.05))",
  },
  mid: {
    scaleFrom: 0.9,
    scaleTo: 1.02,
    blur: 0.15,
    z: 2,
    shadow: "drop-shadow(0 10px 16px rgba(0, 0, 0, 0.09))",
  },
  fg: {
    scaleFrom: 1,
    scaleTo: 1.08,
    blur: 0,
    z: 3,
    shadow: "drop-shadow(0 14px 22px rgba(0, 0, 0, 0.14))",
  },
};

/** Share of the travel spent below the anchor, so objects drift up into view. */
const START_SHARE = 0.35;

const BASE = "/images/snacks/clean/";

const PRODUCTS: Product[] = [
  // Top right — heavy and stable, leans slightly inward as it rises.
  {
    src: "coke.png",
    layer: "fg",
    right: 13,
    top: 16,
    width: "clamp(104px, 13vw, 185px)",
    travel: 0.8,
    drift: 14,
    lean: -26,
    frequency: 1.6,
    phase: 0.4,
    rot: [-4, 2, 5],
    opacity: 0.82,
    startProgress: 0,
  },
  // Left middle — lighter, sways more and leans back inward.
  {
    src: "lays red.png",
    layer: "fg",
    left: 1,
    top: 64,
    width: "clamp(112px, 14.5vw, 205px)",
    travel: 0.5,
    drift: 30,
    lean: 22,
    frequency: 2.2,
    phase: 1.9,
    rot: [4, -2, -5],
    opacity: 0.8,
    ceiling: 0.32,
    startProgress: 0.08,
  },
  // Right middle — heavy, slow turn, clear diagonal drift to the left.
  {
    src: "chocola.png",
    layer: "fg",
    right: 7,
    top: 60,
    width: "clamp(100px, 13vw, 185px)",
    travel: 0.74,
    drift: 20,
    lean: -30,
    frequency: 1.4,
    phase: 3.1,
    rot: [-3, 2, 4],
    opacity: 0.78,
    startProgress: 0.14,
    visibility: "hidden md:block",
  },
  // Lower left — light, the most irregular path of the six.
  {
    src: "croky blauw.png",
    layer: "mid",
    left: 3,
    bottom: 14,
    width: "clamp(96px, 11.8vw, 172px)",
    travel: 0.45,
    drift: 34,
    lean: -20,
    frequency: 2.7,
    phase: 0.8,
    rot: [5, -3, 6],
    opacity: 0.5,
    ceiling: 0.36,
    startProgress: 0.2,
  },
  // Upper right, set back behind the Coke — medium weight, floaty.
  {
    src: "limoen juice.png",
    layer: "bg",
    right: 25,
    top: 8,
    width: "clamp(88px, 11.2vw, 160px)",
    travel: 0.36,
    drift: 24,
    lean: -14,
    frequency: 1.9,
    phase: 5,
    rot: [2, -3, 4],
    opacity: 0.3,
    startProgress: 0.27,
    visibility: "hidden xl:block",
  },
  // Lower right — the heaviest, barely turns, drifts slowly inward.
  {
    src: "koffie.png",
    layer: "bg",
    right: 1,
    bottom: 12,
    width: "clamp(82px, 10.2vw, 148px)",
    travel: 0.3,
    drift: 10,
    lean: -16,
    frequency: 1.2,
    phase: 2.4,
    rot: [-2, 1, -3],
    opacity: 0.28,
    startProgress: 0.35,
    visibility: "hidden md:block",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Quadratic curve through three rotation values at t = 0, 0.5 and 1. */
function rotateAt([r0, r1, r2]: [number, number, number], t: number) {
  const control = 2 * r1 - 0.5 * r0 - 0.5 * r2;
  const u = 1 - t;
  return u * u * r0 + 2 * u * t * control + t * t * r2;
}

export default function FloatingProducts() {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as any).connection;
    const lowPower =
      Boolean(connection?.saveData) ||
      Boolean((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4);

    let sectionTop = 0;
    let sectionHeight = 0;
    let viewportHeight = 0;
    let motionScale = 1;
    const anchorY: number[] = [];
    const itemH: number[] = [];
    let rafId: number | null = null;
    let inView = true;

    function measure() {
      if (!root) return;
      const rect = root.getBoundingClientRect();
      sectionTop = window.scrollY + rect.top;
      sectionHeight = rect.height;
      viewportHeight = window.innerHeight;
      const w = window.innerWidth;
      // Calmer on smaller screens, where there is far less whitespace.
      motionScale = w < 768 ? 0.55 : w < 1200 ? 0.8 : 1;

      for (let i = 0; i < PRODUCTS.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const h = el.offsetHeight || el.offsetWidth * 1.3;
        itemH[i] = h;
        const item = PRODUCTS[i];
        anchorY[i] =
          item.top !== undefined
            ? (item.top / 100) * sectionHeight
            : sectionHeight - (item.bottom! / 100) * sectionHeight - h;
      }
    }

    function apply(progress: number) {
      const fade = viewportHeight * 0.2;
      // From ~65% of the section the products bow out, so the closing
      // editorial rule and the next section get the stage to themselves.
      const exitRaw = clamp((progress - 0.65) / 0.23, 0, 1);
      const exit = 1 - exitRaw * exitRaw * (3 - 2 * exitRaw);

      for (let i = 0; i < PRODUCTS.length; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;

        const item = PRODUCTS[i];
        const layer = LAYERS[item.layer];
        const t = clamp(
          (progress - item.startProgress) / (1 - item.startProgress),
          0,
          1
        );

        const travel = item.travel * viewportHeight * motionScale;
        let y = travel * (START_SHARE - t);
        if (item.ceiling !== undefined) {
          y = Math.max(y, item.ceiling * sectionHeight - anchorY[i]);
        }
        // Sway plus a net lean, so the path curves instead of running on a rail.
        // Subtracting sin(phase) keeps every product starting at x = 0.
        const sway =
          Math.sin(t * item.frequency * Math.PI + item.phase) - Math.sin(item.phase);
        const x = (sway * item.drift + t * item.lean) * motionScale;
        const rot = rotateAt(item.rot, t) * motionScale;
        const scale = layer.scaleFrom + (layer.scaleTo - layer.scaleFrom) * t;

        // Fade on where the product actually is on screen, so it eases in as it
        // rises into view and out again as it leaves through the top.
        const screenY = sectionTop + anchorY[i] - window.scrollY + y;
        const h = itemH[i] || 0;
        let f = 1;
        if (screenY > viewportHeight || screenY < -h) {
          f = 0;
        } else {
          if (screenY > viewportHeight - fade) f = (viewportHeight - screenY) / fade;
          if (screenY < fade) f = Math.min(f, (screenY + h) / (fade + h));
        }
        const e = clamp(f, 0, 1);
        const eased = e * e * (3 - 2 * e); // smoothstep, so nothing pops

        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
          2
        )}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = (item.opacity * eased * exit).toFixed(3);
      }
    }

    function currentProgress() {
      const span = sectionHeight + viewportHeight;
      if (span <= 0) return 0;
      return clamp((window.scrollY + viewportHeight - sectionTop) / span, 0, 1);
    }

    function frame() {
      rafId = null;
      if (inView) apply(currentProgress());
    }

    function onScroll() {
      if (rafId === null) rafId = requestAnimationFrame(frame);
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();

    if (reducedMotion || lowPower) {
      apply(0.5); // one calm, static composition
      return;
    }

    apply(currentProgress());

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    // Images settle after first paint; re-measure so anchors use real heights.
    window.addEventListener("load", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "250px 0px 250px 0px" }
    );
    observer.observe(root);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("load", onResize);
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {PRODUCTS.map((item, i) => {
        const layer = LAYERS[item.layer];
        const filter = [layer.blur ? `blur(${layer.blur}px)` : "", layer.shadow]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={item.src}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={`absolute will-change-[transform,opacity] ${item.visibility ?? ""}`}
            style={{
              left: item.left !== undefined ? `${item.left}%` : undefined,
              right: item.right !== undefined ? `${item.right}%` : undefined,
              top: item.top !== undefined ? `${item.top}%` : undefined,
              bottom: item.bottom !== undefined ? `${item.bottom}%` : undefined,
              width: item.width,
              zIndex: layer.z,
              opacity: 0,
              filter,
            }}
          >
            {/* Decorative: empty alt so screen readers skip it. */}
            <img
              src={encodeURI(BASE + item.src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="block h-auto w-full select-none"
            />
          </div>
        );
      })}
    </div>
  );
}
