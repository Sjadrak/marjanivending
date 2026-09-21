"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

import AutoplayVideo from "@/components/AutoplayVideo";
import Timecode from "@/components/Timecode";
import { buttonGhost, buttonPrimary } from "@/lib/ui";
import { cn } from "@/lib/cn";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const motionOff = Boolean(reduceMotion);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative h-[100svh]"
    >
      <div className="scanlines relative h-full w-full overflow-hidden">
        {/* Abyss-gloed uit de diepte */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(11,29,46,0.55),transparent_70%)]"
          aria-hidden="true"
        />

        {/* 🎬 Het camerabeeld 🎬 */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            initial={motionOff ? false : { scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video w-full max-w-[90vw] overflow-hidden bg-abyss md:max-w-[75vw] lg:max-w-[65vw]"
          >
            <AutoplayVideo
              src="/rac/it/smp2026/storage/mark/website/assets/videos/showreel.mp4"
              poster="/rac/it/smp2026/storage/mark/website/assets/images/showreel-poster.jpg"
              className="h-full w-full object-cover"
              ariaHidden
            />

            {/* Zoeker: hoeken, REC, timecode en opname-info */}
            <div
              className="pointer-events-none absolute inset-0 font-hahmlet text-[10px] uppercase tracking-reel text-cream/70"
              aria-hidden="true"
            >
              <span className="absolute left-4 top-4 h-6 w-6 border-l border-t border-cream/60 sm:left-6 sm:top-6" />
              <span className="absolute right-4 top-4 h-6 w-6 border-r border-t border-cream/60 sm:right-6 sm:top-6" />
              <span className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-cream/60 sm:bottom-6 sm:left-6" />
              <span className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-cream/60 sm:bottom-6 sm:right-6" />
              <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-cream/30" />
              <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-cream/30" />

              <span className="absolute left-12 top-5 flex items-center gap-2 sm:left-16 sm:top-7">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                Rec <Timecode />
              </span>
              <span className="absolute right-12 top-5 hidden sm:right-16 sm:top-7 sm:block">4K • 25 fps • 1/50</span>
              <span className="absolute bottom-5 left-12 hidden sm:bottom-7 sm:left-16 sm:block">Cam A — Mark van Dijk</span>
              <span className="absolute bottom-5 right-12 sm:bottom-7 sm:right-16">The Next Motion</span>
            </div>
          </motion.div>
        </div>

        {/* Visueel verborgen hoofdtitel voor toegankelijkheid, rustig design */}
        <h1
          id="hero-title"
          className="sr-only"
        >
          Mark van Dijk - Videograaf en content creator
        </h1>

        {/* 🎬 Onderbalk: rol, knoppen 🎬 */}
        <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[84rem] flex-col gap-6 px-6 pb-8 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div className="emerge [animation-delay:1.2s]">
            <p className="font-impact text-2xl uppercase leading-none text-cream sm:text-4xl">Videograaf</p>
            <p className="mt-2 font-hahmlet text-[12px] uppercase tracking-meta text-cream-dim">
              &amp; content creator • Smart Media Production
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#archive" className={buttonPrimary}>
                Bekijk werk
              </a>
              <a href="#final-screen" className={buttonGhost}>
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Pikzwarte opstart */}
        <div className="blackout pointer-events-none absolute inset-0 z-20 bg-black" aria-hidden="true" />
      </div>
    </section>
  );
}
