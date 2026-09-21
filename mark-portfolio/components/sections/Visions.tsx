"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import AutoplayVideo from "@/components/AutoplayVideo";
import LightboxButton from "@/components/LightboxButton";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import type { AiLabItem } from "@/lib/ai-lab";
import { cn } from "@/lib/cn";
import { container, sectionSpacing } from "@/lib/ui";

interface VisionsProps {
  items: AiLabItem[];
}

const labelClass = "mt-4 block font-hahmlet text-[10px] uppercase tracking-reel text-cream/40";
const mediaHeight = "h-72 sm:h-[26rem] lg:h-[30rem]";
const pad = (value: number) => String(value).padStart(2, "0");
const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

/**
 * VISIONS — beelden die niet bestonden voordat een prompt ze opriep (generatieve AI).
 * Horizontale galerij met sleepbare balk. Items: lib/ai-lab.ts
 */
export default function Visions({ items }: VisionsProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, offset: 0 });

  const [current, setCurrent] = useState(1);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Balk, teller en pijlen bijwerken op basis van de scrollpositie
  const update = useCallback(() => {
    const track = trackRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;
    if (!track || !bar || !thumb) return;

    const maxScroll = Math.max(1, track.scrollWidth - track.clientWidth);
    const barWidth = bar.clientWidth;
    const thumbWidth = Math.max(56, barWidth * (track.clientWidth / track.scrollWidth));
    const ratio = Math.min(1, Math.max(0, track.scrollLeft / maxScroll));

    thumb.style.width = `${thumbWidth}px`;
    thumb.style.left = `${(barWidth - thumbWidth) * ratio}px`;

    setProgress(Math.round(ratio * 100));
    setCurrent(Math.round(ratio * (items.length - 1)) + 1);
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= maxScroll - 2);
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    Array.from(track.children).forEach((child) => resizeObserver?.observe(child));
    update();

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [update]);

  const scrollToPointer = (clientX: number) => {
    const track = trackRef.current;
    const bar = barRef.current;
    const thumb = thumbRef.current;
    if (!track || !bar || !thumb) return;
    const rect = bar.getBoundingClientRect();
    const travel = Math.max(1, rect.width - thumb.offsetWidth);
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left - dragRef.current.offset) / travel));
    track.scrollLeft = ratio * Math.max(1, track.scrollWidth - track.clientWidth);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const thumbRect = thumb.getBoundingClientRect();
    const onThumb = event.clientX >= thumbRect.left && event.clientX <= thumbRect.right;
    dragRef.current = { active: true, offset: onThumb ? event.clientX - thumbRect.left : thumbRect.width / 2 };
    track.style.scrollSnapType = "none"; // tijdens slepen niet vastklikken
    event.currentTarget.setPointerCapture(event.pointerId);
    scrollToPointer(event.clientX);
  };

  const endDrag = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    if (trackRef.current) trackRef.current.style.scrollSnapType = ""; // bij loslaten netjes op een beeld uitkomen
  };

  const scrollStep = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: scrollBehavior() });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const moves: Record<string, number> = {
      ArrowRight: track.clientWidth * 0.7,
      ArrowLeft: -track.clientWidth * 0.7,
      Home: -track.scrollWidth,
      End: track.scrollWidth,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    track.scrollBy({ left: moves[event.key], behavior: scrollBehavior() });
  };

  const arrowButton =
    "grid h-11 w-11 place-items-center border border-cream/15 text-cream transition-colors duration-500 ease-haunt hover:border-ember/70 hover:text-ember disabled:pointer-events-none disabled:opacity-20";

  return (
    <section
      id="visions"
      className={cn("relative scroll-mt-16 overflow-hidden border-t border-cream/[0.05]", sectionSpacing)}
      aria-labelledby="visions-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_10%,rgba(11,29,46,0.45),transparent_70%)]"
        aria-hidden="true"
      />

      <div className={cn(container, "relative")}>
        <SectionHeading reel="03" label="Generatieve AI" title="Visions" titleId="visions-title">
          {/* ✏️ TEKST */}
          <p>
            Beelden die niet bestonden voordat een prompt ze opriep. Campagnebeelden, sfeerbeelden en video — altijd
            vanuit een concept en een doelgroep, nooit als trucje. Sleep de balk, klik voor groot.
          </p>
        </SectionHeading>
      </div>

      {/* 🖼️ JOUW FOTO'S / 🎬 VIDEO'S HIER — via lib/ai-lab.ts */}
      <Reveal
        as="ul"
        ref={trackRef}
        id="visions-track"
        delay=".3s"
        className="no-scrollbar relative mt-20 flex snap-x snap-mandatory scroll-pl-6 gap-2 overflow-x-auto px-6 pb-2 sm:scroll-pl-10 sm:px-10 lg:scroll-pl-16 lg:px-16 2xl:scroll-pl-[calc((100vw_-_84rem)/2_+_4rem)] 2xl:px-[calc((100vw_-_84rem)/2_+_4rem)]"
      >
        {items.map((item, index) => (
          <li key={item.src} className={cn("shrink-0 snap-start", index === items.length - 1 && "pr-6 sm:pr-10 lg:pr-16")}>
            {item.type === "image" ? (
              <LightboxButton src={item.src} caption={item.caption} cursorLabel="Open" className="group block text-left">
                <span className="block overflow-hidden bg-abyss">
                  <img src={item.src} alt={item.alt} loading="lazy" className={cn("haunted-media w-auto object-cover", mediaHeight)} />
                </span>
                <span className={cn(labelClass, "transition-colors duration-500 group-hover:text-ember")}>{item.label}</span>
              </LightboxButton>
            ) : (
              <div className="group">
                <span className="block overflow-hidden bg-abyss">
                  <AutoplayVideo
                    src={item.src}
                    poster={item.poster}
                    className={cn("haunted-media aspect-video w-auto object-cover", mediaHeight)}
                    ariaLabel={item.ariaLabel}
                  />
                </span>
                <span className={labelClass}>{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </Reveal>

      {/* Navigatie: sleepbare balk, teller en pijlen */}
      <div className={container}>
        <Reveal className="relative mt-12 flex items-center gap-6 sm:gap-8" delay=".5s">
          <span className="w-20 shrink-0 font-hahmlet text-[11px] tabular-nums tracking-meta text-cream" aria-hidden="true">
            {pad(current)} <span className="text-cream/35">/ {pad(items.length)}</span>
          </span>
          <div
            ref={barRef}
            role="scrollbar"
            aria-controls="visions-track"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Scroll door de visioenen"
            tabIndex={0}
            data-cursor="Sleep"
            onPointerDown={handlePointerDown}
            onPointerMove={(event) => {
              if (dragRef.current.active) scrollToPointer(event.clientX);
            }}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={handleKeyDown}
            className="group relative h-8 flex-1 cursor-pointer touch-none select-none"
          >
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-cream/10" aria-hidden="true" />
            <div
              ref={thumbRef}
              className="absolute top-1/2 h-[3px] w-16 -translate-y-1/2 cursor-grab bg-cream/70 transition-[height,background-color] duration-700 group-hover:h-[5px] group-hover:bg-ember active:cursor-grabbing"
              aria-hidden="true"
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => scrollStep(-1)} disabled={atStart} className={arrowButton}>
              <span className="sr-only">Vorige beelden</span>
              <ArrowLeftIcon className="h-4 w-4" strokeWidth={1.2} />
            </button>
            <button type="button" onClick={() => scrollStep(1)} disabled={atEnd} className={arrowButton}>
              <span className="sr-only">Volgende beelden</span>
              <ArrowRightIcon className="h-4 w-4" strokeWidth={1.2} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
