"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import {
  bronnen,
  droomstage,
  gapAnalysis,
  ontwikkelpad,
  tijdlijn,
  werkveld,
} from "@/lib/stageplan";
import AutoplayVideo from "@/components/AutoplayVideo";

const headingClass =
  "font-hahmlet text-[13px] font-medium uppercase tracking-eyebrow text-ember";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function StagePlan() {
  return (
    <section
      id="stageplan"
      aria-labelledby="stageplan-title"
      className="relative border-t border-cream/10 bg-void py-32"
    >
      <div className="mx-auto w-full max-w-[84rem] px-6 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* --- 01 Intro --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-32"
        >
          <p className={headingClass}>04 — Back on Track (Stageplan)</p>
          <h2
            id="stageplan-title"
            className="mt-6 font-impact text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[0.86] text-cream"
          >
            Mijn Masterplan
          </h2>
          
          <div className="mt-12 flex flex-wrap gap-4">
            {werkveld.pillars.map((pillar, i) => (
              <span key={i} className="rounded-full border border-cream/20 bg-abyss px-4 py-2 font-hahmlet text-[11px] uppercase tracking-widest text-cream">
                {pillar}
              </span>
            ))}
          </div>
          <p className="mt-8 font-hahmlet text-xl text-cream-dim max-w-2xl border-l-2 border-ember pl-6 italic">
            {werkveld.focus}
          </p>
        </motion.div>

        {/* --- 02 Visuele Gap Analyse --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-40"
        >
          <motion.h3 variants={fadeUp} className={headingClass}>Visuele Gap-Analyse</motion.h3>
          <motion.p variants={fadeUp} className="mt-2 mb-12 font-hahmlet text-sm text-cream/40">
            Gebaseerd op 3 actuele vacatures uit de branche.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {gapAnalysis.map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="group relative">
                <div className="mb-4">
                  <h4 className="font-impact text-xl uppercase tracking-wide text-cream/90">{item.domain}</h4>
                  <span className={cn("font-hahmlet text-[10px] uppercase tracking-widest mt-1 block", item.level < 1 ? "text-ember" : "text-green-400/80")}>
                    {item.status}
                  </span>
                </div>
                <p className="font-hahmlet text-sm text-cream/60 leading-relaxed min-h-[40px]">{item.insight}</p>
                
                {/* Visual Bar */}
                <div className="relative mt-5 h-[2px] w-full bg-cream/5 overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: `${(item.level - 1) * 100}%` }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    viewport={{ once: true }}
                    className={cn("absolute inset-y-0 left-0 w-full", item.color)}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- 03 Droomstage --- */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className={headingClass}>Mijn Droomstage</motion.h3>
            <motion.h4 variants={fadeUp} className="mt-8 font-impact text-[clamp(2rem,4vw,3.5rem)] uppercase leading-none text-cream/90">
              {droomstage.organization}
            </motion.h4>
            <motion.p variants={fadeUp} className="mt-3 font-hahmlet text-sm uppercase tracking-widest text-ember">
              {droomstage.role}
            </motion.p>
            
            <motion.div variants={fadeUp} className="mt-12 space-y-6 font-hahmlet text-base text-cream/60">
              {droomstage.impact.map((impact, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-ember mt-1">✦</span>
                  <p className="leading-relaxed">{impact}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video w-full overflow-hidden bg-abyss"
          >
            <div className="absolute inset-x-0 top-0 z-10 flex justify-between p-5 bg-gradient-to-b from-black/60 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100">
              <span className="font-hahmlet text-[10px] uppercase tracking-widest text-cream/70">
                AI Visualisatie
              </span>
              <span className="flex items-center gap-2 font-hahmlet text-[10px] uppercase text-ember">
                <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
                Droomscenario
              </span>
            </div>
            <AutoplayVideo
              src={droomstage.videoSrc}
              poster={droomstage.videoPoster}
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity hover:opacity-100"
              ariaHidden
            />
          </motion.div>
        </div>

        {/* --- 04 Ontwikkelpad (Acties) --- */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-40"
        >
          <motion.h3 variants={fadeUp} className={headingClass}>Ontwikkelpad: 2 Acties</motion.h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {ontwikkelpad.map((actie, i) => (
              <motion.div key={i} variants={fadeUp} className="group relative">
                <span className="absolute -left-4 -top-8 font-impact text-7xl text-cream/[0.03] pointer-events-none">0{i+1}</span>
                <h4 className="relative z-10 font-impact text-2xl uppercase text-cream/90 tracking-wide mb-4">{actie.title}</h4>
                <p className="relative z-10 font-hahmlet text-base leading-relaxed text-cream/60">
                  {actie.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- 05 Tijdlijn & Bronnen --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className={headingClass}>Tijdlijn (Deadlines)</motion.h3>
            <div className="mt-10 border-l border-cream/10 ml-3 space-y-12">
              {tijdlijn.map((t, idx) => (
                <motion.div key={idx} variants={fadeUp} className="relative pl-10">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-abyss border-2 border-ember" />
                  <p className="font-impact text-2xl text-cream leading-none">{t.period}</p>
                  <p className="font-hahmlet text-[10px] uppercase tracking-widest text-ember mt-2 mb-4">{t.subtitle}</p>
                  <ul className="space-y-3 font-hahmlet text-sm text-cream-dim">
                    {t.items.map((item, i) => {
                      const isDeadline = item.toLowerCase().includes("deadline");
                      return (
                        <li key={i} className={isDeadline ? "text-cream underline decoration-ember/50 underline-offset-4" : ""}>
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeUp} className={headingClass}>Bronnen &amp; Inzichten</motion.h3>
            <div className="mt-10 space-y-8">
              {bronnen.map((bron, idx) => (
                <motion.div key={idx} variants={fadeUp} className="group border-l border-cream/10 pl-6 transition-colors hover:border-cream/40">
                  <h4 className="font-hahmlet text-sm uppercase tracking-wider text-cream mb-2 transition-colors group-hover:text-ember">
                    {bron.title}
                  </h4>
                  <p className="font-hahmlet text-sm leading-[1.8] text-cream-dim">
                    {bron.insights}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
