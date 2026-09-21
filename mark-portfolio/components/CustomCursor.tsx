"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor-volger: een haarfijne ring met een klein punt, zoals een zoeker in beeld.
 * Boven een element met data-cursor="Tekst" wordt de ring groter en toont hij die tekst.
 * Verschijnt pas bij een echte muisbeweging en staat uit bij 'minder beweging'.
 * De gewone cursor blijft altijd zichtbaar.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [overInteractive, setOverInteractive] = useState(false);

  useEffect(() => {
    // Ook op laptops met touchscreen, zolang er een muis of trackpad is
    const hasMouse = window.matchMedia("(any-pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasMouse || reducedMotion) return;
    setEnabled(true);

    const target = { x: -200, y: -200 };
    const dot = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    let frame = 0;

    const loop = () => {
      dot.x += (target.x - dot.x) * 0.4;
      dot.y += (target.y - dot.y) * 0.4;
      ring.x += (target.x - ring.x) * 0.12;
      ring.y += (target.y - ring.y) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x.toFixed(1)}px, ${dot.y.toFixed(1)}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x.toFixed(1)}px, ${ring.y.toFixed(1)}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      setVisible(true);
      const element = event.target instanceof Element ? event.target : null;
      setLabel(element?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? null);
      setOverInteractive(Boolean(element?.closest("a, button, [role=scrollbar]")));
    };
    const handleLeave = (event: MouseEvent) => {
      if (!event.relatedTarget) setVisible(false);
    };
    const handleTouch = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleLeave);
    window.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  if (!enabled) return null;

  const ringSize = label ? "h-20 w-20" : overInteractive ? "h-12 w-12" : "h-8 w-8";
  const ringStyle = label
    ? "border border-cream/25 bg-void/60 backdrop-blur-md"
    : overInteractive
      ? "border border-ember/70"
      : "border border-cream/35";

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      {/* Ring (komt iets achteraan) */}
      <div ref={ringRef} className="absolute left-0 top-0">
        <div
          className={`grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,opacity,border-color,background-color] duration-500 ease-haunt ${ringSize} ${ringStyle} ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {label && <span className="font-hahmlet text-[9px] uppercase tracking-reel text-cream/90">{label}</span>}
        </div>
      </div>

      {/* Punt (volgt direct) */}
      <div ref={dotRef} className="absolute left-0 top-0">
        <div
          className={`h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_0_1px_rgba(12,10,13,0.6)] transition-opacity duration-300 ${
            visible && !label ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
