"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import DossierCard from "@/components/DossierCard";
import LightboxButton from "@/components/LightboxButton";
import { buttonGhost, buttonPrimary } from "@/lib/ui";
import { CreditLine } from "@/lib/credits";
import { CreditsData } from "@/lib/queries";

const roleClass = "font-hahmlet text-[10px] uppercase leading-relaxed tracking-widest text-cream/45 sm:text-[11px]";
const headingClass = "font-hahmlet text-[13px] font-medium uppercase tracking-eyebrow text-ember";

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

export default function CreditsRoll({ facts, blocks, timeline, meters, answers, certificates, motto }: CreditsData) {
  return (
    <section id="credits" aria-labelledby="credits-title" className="relative py-24 sm:py-32 bg-abyss border-t border-cream/10">
      <div className="mx-auto w-full max-w-[84rem] px-6 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* Titel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-20"
        >
          <p className={headingClass}>05 — Over mij &amp; skills</p>
          <h2 id="credits-title" className="mt-4 font-impact text-[clamp(2.5rem,8vw,6rem)] uppercase leading-[0.86] text-cream">
            End Credits
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- KOLOM 1: Maker, Profiel & Timeline --- */}
          <div className="space-y-24">
            
            {/* Maker & Story */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className={headingClass}>Achter de camera</motion.h3>
              <div className="mt-8 flex flex-col xl:flex-row gap-8 items-start">
                
                {/* DossierCard staat BUITEN de transform (fadeUp) animatie zodat de 3D-rotatie niet breekt */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} className="w-[240px] shrink-0">
                  <DossierCard />
                </motion.div>
                
                <motion.div variants={fadeUp} className="space-y-4 font-hahmlet text-sm leading-[1.8] text-cream-dim">
                  <p>
                    <span className="text-cream">Mark van Dijk</span>, 22, Den Haag. Om tijdens mijn studie echte vlieguren te maken, startte ik <span className="text-cream">The Next Motion</span>. Een perfecte leerschool waar ik onder hoge druk event- en bedrijfsvideo's produceer.
                  </p>
                  <p>
                    Ondernemen is nu de ideale bijbaan, maar na mijn afstuderen doe ik bewust een stap naar de bureauzijde. Ik wil onderdeel worden van een ambitieus team waar ik camerawerk kan combineren met data en AI-strategie.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Timeline / Chronologie */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className={headingClass}>Chronologie</motion.h3>
              <div className="mt-8 border-l border-cream/10 ml-3 space-y-10">
                {timeline.map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="relative pl-8">
                    <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-abyss border-2 border-cream/40" />
                    <p className="font-impact text-xl text-cream uppercase tracking-wide">{item.label}</p>
                    <p className="mt-2 font-hahmlet text-sm leading-relaxed text-cream-dim">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Q&A */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className={headingClass}>Q&amp;A</motion.h3>
              <div className="mt-8 space-y-8 font-hahmlet">
                {answers.map((item) => (
                  <motion.div key={item.question} variants={fadeUp} className="border-l border-ember/30 pl-6">
                    <p className="text-sm font-semibold text-cream">{item.question}</p>
                    <p className="mt-2 text-sm leading-[1.8] text-cream-dim">{item.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
          </div>

          {/* --- KOLOM 2: Skills, Meters & Dossier --- */}
          <div className="space-y-24">
            
            {/* Skill Blocks */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-12"
            >
              {blocks.map((block) => (
                <motion.div key={block.heading ?? block.lines[0]?.role} variants={fadeUp}>
                  <CreditGroup heading={block.heading} lines={block.lines} />
                </motion.div>
              ))}
            </motion.div>

            {/* Psychologisch Profiel (Meters) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className={headingClass}>Mijn Profiel</motion.h3>
              <dl className="mt-8 space-y-6">
                {meters.map((meter) => (
                  <motion.div key={meter.name} variants={fadeUp} className="group">
                    <div className="flex justify-between items-baseline mb-2">
                      <dt className={roleClass}>{meter.name}</dt>
                      <dd className="font-hahmlet text-xs text-cream/70 uppercase tracking-widest">
                        {meter.level}
                      </dd>
                    </div>
                    <div className="relative h-1 w-full bg-cream/10 overflow-hidden rounded-sm">
                      <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: `${(meter.value - 1) * 100}%` }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        viewport={{ once: true }}
                        className={cn("absolute inset-y-0 left-0 w-full", meter.value > 0.5 ? "bg-ember" : "bg-cream/40")}
                      />
                    </div>
                  </motion.div>
                ))}
              </dl>
            </motion.div>

            {/* Certificaten */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeUp} className={headingClass}>Certificaten</motion.h3>
              <dl className="mt-6 space-y-4">
                {certificates.map((certificate) => (
                  <motion.div key={certificate.title} variants={fadeUp} className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-baseline">
                    <dt className={cn(roleClass, "w-full sm:w-1/3 shrink-0 text-cream/30")}>Google • Coursera</dt>
                    <dd>
                      <LightboxButton
                        src={certificate.src}
                        caption={certificate.caption}
                        cursorLabel="Open"
                        className="font-hahmlet text-sm text-cream/90 underline decoration-cream/15 underline-offset-[4px] transition-colors hover:text-ember hover:decoration-ember/60"
                      >
                        {certificate.title}
                      </LightboxButton>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>

          </div>
        </div>

        {/* Slotregel (Motto) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-32 border-t border-cream/10 pt-24"
        >
          <motion.p variants={fadeUp} className={cn(headingClass, "text-center mb-16")}>Motto</motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 max-w-5xl mx-auto">
            
            {/* Deel 1: Horen */}
            <motion.div variants={fadeUp} className="group flex flex-col items-center text-center transition-colors">
              <div className="mb-8 h-10 w-10 text-cream/20 transition-colors group-hover:text-cream/40">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="font-impact text-2xl sm:text-3xl uppercase leading-none text-cream/30">
                Ik hoor<br/><span className="text-lg">en ik vergeet</span>
              </p>
            </motion.div>

            {/* Deel 2: Zien */}
            <motion.div variants={fadeUp} className="group flex flex-col items-center text-center transition-colors">
              <div className="mb-8 h-10 w-10 text-cream/40 transition-colors group-hover:text-cream/60">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-impact text-2xl sm:text-3xl uppercase leading-none text-cream/60">
                Ik zie<br/><span className="text-lg">en ik onthoud</span>
              </p>
            </motion.div>

            {/* Deel 3: Doen */}
            <motion.div variants={fadeUp} className="group flex flex-col items-center text-center transition-colors">
              <div className="mb-8 h-10 w-10 text-ember/80 transition-colors group-hover:text-ember">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.671zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
              </div>
              <p className="font-impact text-2xl sm:text-3xl uppercase leading-none text-cream/90">
                Ik doe<br/><span className="text-lg text-ember">en ik begrijp</span>
              </p>
            </motion.div>

          </div>

          <motion.div variants={fadeUp} className="mt-24 flex flex-wrap justify-center gap-6">
            <a href="/rac/it/smp2026/storage/mark/website/assets/cv/cv-mark-van-dijk.pdf" download className={buttonPrimary}>
              Download cv
            </a>
            <a href="#final-screen" className={buttonGhost}>
              Contact
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CreditGroup({ heading, lines }: { heading?: string; lines: CreditLine[] }) {
  return (
    <div>
      {heading && <h3 className="font-hahmlet text-[11px] font-medium uppercase tracking-widest text-ember mb-6">{heading}</h3>}
      <dl className="space-y-4">
        {lines.map((line) => (
          <div key={line.role} className="flex flex-col sm:flex-row gap-2 sm:gap-8 sm:items-baseline pb-2">
            <dt className={cn(roleClass, "w-full sm:w-1/3 shrink-0")}>{line.role}</dt>
            <dd className="space-y-1 font-hahmlet text-sm text-cream/90">
              {line.names.map((name: string) => (
                <span key={name} className="block">{name}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
