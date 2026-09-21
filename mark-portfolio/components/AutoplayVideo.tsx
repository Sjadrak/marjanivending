"use client";

import { useEffect, useRef } from "react";

type AutoplayVideoProps = {
  src: string;
  poster: string;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
};

/** Stille, herhalende video die alleen afspeelt als hij in beeld is (bespaart data en batterij). */
export default function AutoplayVideo({ src, poster, className, ariaLabel, ariaHidden }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true; // nodig voor autoplay; React zet dit niet altijd als attribuut

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden || undefined}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
