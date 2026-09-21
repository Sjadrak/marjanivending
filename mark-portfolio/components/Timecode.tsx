"use client";

import { useEffect, useRef } from "react";

const FPS = 25;
const pad = (value: number) => String(value).padStart(2, "0");

/** Lopende timecode (UU:MM:SS:FF) vanaf het moment dat de pagina opent — als een camera die opneemt. */
export default function Timecode() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let frame = 0;
    let lastFrame = -1;

    const tick = (now: number) => {
      const totalFrames = Math.floor(((now - start) / 1000) * FPS);
      if (totalFrames !== lastFrame && ref.current) {
        lastFrame = totalFrames;
        const frames = totalFrames % FPS;
        const seconds = Math.floor(totalFrames / FPS);
        ref.current.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}:${pad(frames)}`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className="tabular-nums" aria-hidden="true">
      00:00:00:00
    </span>
  );
}
