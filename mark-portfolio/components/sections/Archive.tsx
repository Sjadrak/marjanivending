"use client";

/* eslint-disable @next/next/no-img-element */
import {
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
  useState,
  useRef,
} from "react";
import {
  motion,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import AutoplayVideo from "@/components/AutoplayVideo";
import { useDialog } from "@/components/DialogProvider";
import { cn } from "@/lib/cn";
import type { ProjectCard } from "@/lib/projects";
import type { ArchiveData } from "@/lib/queries";
import type { Category } from "@/lib/types";

const pad = (value: number) => String(value).padStart(2, "0");

const cardSize: Record<ProjectCard["size"], string> = {
  large: "w-[80vw] aspect-[4/5] md:w-[60vw] md:h-[54svh] md:aspect-video",
  tall: "w-[80vw] aspect-[4/5] md:w-[35vw] md:h-[54svh] md:aspect-[4/5]",
  small: "w-[80vw] aspect-[4/5] md:w-[40vw] md:h-[54svh] md:aspect-square",
};

export default function Archive({ filters, projects }: ArchiveData) {
  const { openProject } = useDialog();
  const [filter, setFilter] = useState<"all" | Category>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Track horizontale scroll voor de custom slider
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const springProgress = useSpring(scrollXProgress, { stiffness: 400, damping: 40 });
  const ballX = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  const visibleProjects = projects.filter((project) => filter === "all" || project.categories.includes(filter));

  const changeFilter = (next: "all" | Category) => {
    setFilter(next);
  };

  // Drag-to-scroll logic voor desktop gebruikers (muis)
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    
    // Voorkom dat CSS snap-points het slepen tegenwerken
    scrollContainerRef.current.style.scrollSnapType = "none";
    scrollContainerRef.current.style.scrollBehavior = "auto";
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.25; // Smoother 1:1.25 tracking
    if (Math.abs(walk) > 5) hasDragged.current = true;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    if (scrollContainerRef.current) {
      // Herstel native snapping na het loslaten
      scrollContainerRef.current.style.scrollSnapType = "";
      scrollContainerRef.current.style.scrollBehavior = "";
    }
  };

  const handleCardClick = (id: string, e: ReactMouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      return;
    }
    openProject(id as any, e.currentTarget as HTMLElement);
  };

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="relative border-t border-cream/[0.05] bg-void py-32 overflow-hidden"
    >
      <div className="flex flex-col">
        {/* Plum-gloed in het midden */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_50%_55%,rgba(11,29,46,0.25),transparent_75%)]"
          aria-hidden="true"
        />

        {/* Intro en filters */}
        <div className="relative mx-auto flex w-full max-w-[84rem] flex-col gap-8 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div className="max-w-xl">
            <p className="font-hahmlet text-[13px] font-medium uppercase tracking-eyebrow text-ember">01 — Geselecteerd werk</p>
            <h2 id="archive-title" className="mt-4 font-impact text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.86] text-cream">
              Het Archief
            </h2>
            <p className="mt-6 font-hahmlet text-sm leading-relaxed text-cream-dim">
              Video's, campagnes en prototypes. Gebruik de filters of ontdek direct het werk achter de schermen.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {filters.map((option) => (
              <button
                key={option.id}
                onClick={() => changeFilter(option.id)}
                className={cn(
                  "rounded-full border px-4 py-2 font-hahmlet text-[11px] uppercase tracking-widest transition-colors",
                  filter === option.id
                    ? "border-ember bg-ember/10 text-ember"
                    : "border-cream/15 text-cream/50 hover:border-cream/30 hover:text-cream/80",
                )}
                aria-pressed={filter === option.id}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* De filmrol (Natuurlijk horizontaal scrollen) */}
        <div className="relative mt-16 w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="flex w-full overflow-x-auto snap-x snap-mandatory items-center gap-4 px-6 pb-12 pt-4 active:cursor-grabbing sm:gap-6 sm:px-10 lg:px-16 md:pr-[20vw] no-scrollbar select-none"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {visibleProjects.map((project) => (
              <ArchiveCard
                key={project.id}
                project={project}
                number={pad(projects.indexOf(project) + 1)}
                onClick={(e) => handleCardClick(project.id, e)}
              />
            ))}
          </div>
        </div>

        {/* Custom animated scrollbar met balletje */}
        <div className="relative mx-auto mt-4 flex w-full max-w-[84rem] flex-col items-center gap-6 px-6 sm:px-10 lg:px-16 pointer-events-none">
          <div className="relative h-[2px] w-full max-w-[400px] rounded-full bg-cream/10">
            <motion.div 
              style={{ scaleX: scrollXProgress }} 
              className="absolute inset-y-0 left-0 w-full origin-left bg-cream/30" 
            />
            <motion.div
              style={{ left: ballX }}
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream shadow-[0_0_14px_rgba(239,235,229,0.9)]"
            />
          </div>
          <span className="font-hahmlet text-[10px] uppercase tracking-reel text-cream/35">
            Sleep door de projecten
          </span>
        </div>
      </div>
    </section>
  );
}

interface ArchiveCardProps {
  project: ProjectCard;
  number: string;
  onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void;
}

function ArchiveCard({ project, number, onClick }: ArchiveCardProps) {
  // Hover: licht de kaart op
  const hover = useSpring(0, { stiffness: 40, damping: 20 });
  
  const mediaFilter = useTransform(
    hover,
    (t) => `grayscale(${(1 - t).toFixed(3)}) brightness(${(0.4 + 0.6 * t).toFixed(3)}) contrast(${(1.1 - 0.1 * t).toFixed(3)})`
  );
  const glowOpacity = useTransform(hover, [0, 1], [0, 1]);
  const textOpacity = useTransform(hover, [0, 1], [0.6, 1]);
  const detailOpacity = useTransform(hover, [0, 1], [0, 1]);

  const isVideo = project.categories.includes("video");
  const mediaClass = "absolute inset-0 h-full w-full object-cover";

  return (
    <article
      data-card
      className={cn("group relative shrink-0 snap-center overflow-hidden bg-abyss transition-transform duration-500 hover:scale-[1.02]", cardSize[project.size])}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={() => hover.set(0)}
      onFocus={() => hover.set(1)}
      onBlur={() => hover.set(0)}
    >
      <motion.div style={{ filter: mediaFilter }} className="absolute inset-0">
        {project.media.type === "video" ? (
          <AutoplayVideo src={project.media.src} poster={project.media.poster} className={mediaClass} ariaHidden />
        ) : (
          <img src={project.media.src} alt="" loading="lazy" draggable={false} className={mediaClass} />
        )}
      </motion.div>

      {/* Duisternis onderin + abyss-gloed */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/25 to-void/40" aria-hidden="true" />
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_100%,rgba(11,29,46,0.6),transparent_70%)]"
        aria-hidden="true"
      />

      {/* Top bar */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 font-hahmlet text-[10px] uppercase tracking-reel text-cream/50 sm:p-6"
        aria-hidden="true"
      >
        <span className="flex items-center gap-3">
          <span className="tabular-nums">Dossier {number}</span>
          {isVideo && (
            <span className="flex items-center gap-1.5 border border-cream/25 px-2 py-0.5 text-cream/80">
              <span className="h-1 w-1 rounded-full bg-ember" />
              Rec
            </span>
          )}
        </span>
        <span className="hidden text-right md:inline">{project.tag}</span>
      </div>

      {project.pip && (
        <motion.div
          style={{ filter: mediaFilter }}
          className="pointer-events-none absolute right-6 top-16 hidden aspect-[9/16] w-24 overflow-hidden border border-cream/15 bg-void lg:block xl:w-28"
          aria-hidden="true"
        >
          <AutoplayVideo src={project.pip.src} poster={project.pip.poster} className="h-full w-full object-cover" />
        </motion.div>
      )}

      {/* Bottom bar */}
      <motion.div style={{ opacity: textOpacity }} className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-hahmlet text-[10px] uppercase tracking-reel text-cream/70">{project.role}</p>
        <h3 className="mt-2 max-w-xl font-impact text-3xl uppercase leading-[0.92] text-cream sm:text-4xl">
          {project.title}
        </h3>
        <motion.p
          style={{ opacity: detailOpacity }}
          className="mt-3 line-clamp-2 max-w-md font-hahmlet text-sm leading-relaxed text-cream-dim"
        >
          {project.description}
        </motion.p>
        <span className="mt-3 inline-block font-hahmlet text-[10px] uppercase tracking-reel text-cream/45 transition-colors duration-500 group-hover:text-ember">
          Open dossier ✦
        </span>
      </motion.div>

      <button
        type="button"
        data-cursor="Open"
        onClick={onClick}
        className="absolute inset-0 z-10 focus-visible:outline-offset-[-6px]"
      >
        <span className="sr-only">
          Open dossier: {project.title} — {project.role}
        </span>
      </button>
    </article>
  );
}
