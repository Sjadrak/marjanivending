"use client";

import type { CSSProperties } from "react";
import AutoplayVideo from "@/components/AutoplayVideo";
import { useDialog } from "@/components/DialogProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { PlayIcon } from "@/components/icons";
import { cn } from "@/lib/cn";
import type { GrowthChapter } from "@/lib/growth";
import { container, sectionSpacing } from "@/lib/ui";

interface EvidenceProps {
  chapters: GrowthChapter[];
}

/**
 * THE EVIDENCE — drie opdrachten voor The Next Motion waarbij ik de camera deed.
 * Samen het bewijs van hoe snel mijn camerawerk groeit. Data: lib/growth.ts
 */
export default function Evidence({ chapters }: EvidenceProps) {
  const { openVideo } = useDialog();

  return (
    <section
      id="evidence"
      className={cn("relative scroll-mt-16 border-t border-cream/[0.05]", sectionSpacing)}
      aria-labelledby="evidence-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_20%,rgba(11,29,46,0.35),transparent_70%)]"
        aria-hidden="true"
      />

      <div className={cn(container, "relative")}>
        <SectionHeading reel="02" label="Groei achter de camera" title="The Evidence" titleId="evidence-title">
          {/* ✏️ TEKST */}
          <p>
            Drie opdrachten voor The Next Motion, in de volgorde waarin ze gebeurden. Ik stond achter de camera; de
            montage deed iemand anders. Juist daarom laten ze zuiver zien hoe snel mijn camerawerk groeit.
          </p>
          <p className="mt-6 text-[10px] uppercase tracking-reel text-cream/40">
            Mijn rol: <span className="text-cream">camera</span> · Montage: <span className="text-cream">niet door mij</span>
          </p>
        </SectionHeading>

        <ol className="mt-24 grid gap-x-8 gap-y-24 lg:grid-cols-3">
          {chapters.map((chapter, index) => (
            <Reveal as="li" key={chapter.id} delay={`${index * 0.35}s`}>
              <article className="flex h-full flex-col" aria-labelledby={`evidence-${chapter.id}`}>
                <div className="flex items-baseline justify-between gap-4 font-hahmlet text-[10px] uppercase tracking-reel">
                  <span className="shrink-0 whitespace-nowrap text-cream/70">Bewijsstuk {chapter.step}</span>
                  <span className="whitespace-nowrap text-right text-cream/40">{chapter.verdict}</span>
                </div>
                {/* Een lijn die per bewijsstuk verder gevuld is: de groei in één oogopslag */}
                <div
                  className="relative mt-4 h-px bg-cream/10"
                  style={{ "--value": chapter.level, "--delay": `${0.8 + index * 0.4}s` } as CSSProperties}
                  aria-hidden="true"
                >
                  <div className="meter-fill absolute inset-y-0 left-0 w-full bg-cream/70" />
                </div>

                {/* 🎬 JOUW VIDEO HIER — stille preview; klikken opent de volledige video met geluid */}
                <button
                  type="button"
                  data-cursor="Play"
                  onClick={(event) =>
                    openVideo(chapter.video, chapter.poster, `Bewijsstuk ${chapter.step} — ${chapter.title}`, event.currentTarget)
                  }
                  className="group relative mt-8 block aspect-video w-full overflow-hidden bg-abyss text-left"
                >
                  <AutoplayVideo
                    src={chapter.preview}
                    poster={chapter.poster}
                    className="haunted-media absolute inset-0 h-full w-full object-cover"
                    ariaHidden
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-hahmlet text-[10px] uppercase tracking-reel text-cream/80">
                    <span className="inline-flex items-center gap-3 transition-colors duration-500 group-hover:text-ember">
                      <span className="grid h-9 w-9 place-items-center border border-cream/25 transition-colors duration-500 group-hover:border-ember/70">
                        <PlayIcon className="h-3.5 w-3.5 translate-x-px" strokeWidth={1.2} />
                      </span>
                      Afspelen
                    </span>
                    <span className="tabular-nums text-cream/50">{chapter.duration}</span>
                  </span>
                  <span className="sr-only">
                    Bekijk de volledige video: {chapter.title} ({chapter.duration})
                  </span>
                </button>

                {/* ✏️ TEKST */}
                <p className="mt-8 font-hahmlet text-[10px] uppercase tracking-reel text-cream/40">
                  {chapter.kind} · {chapter.context}
                </p>
                <h3 id={`evidence-${chapter.id}`} className="mt-3 font-impact text-3xl uppercase leading-none text-cream sm:text-4xl">
                  {chapter.title}
                </h3>
                <p className="mt-5 font-hahmlet text-sm leading-[1.9] text-cream-dim">{chapter.text}</p>
                <ul className="mt-6 space-y-2.5 border-t border-cream/[0.07] pt-5 font-hahmlet">
                  {chapter.improvements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-cream/80">
                      <span className="mt-[0.75em] h-px w-3 shrink-0 bg-cream/40" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
