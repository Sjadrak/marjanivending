"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { RotateIcon } from "@/components/icons";

/**
 * Dossierkaart van het subject: voorkant het portret, klik om om te draaien naar dezelfde foto van achteren.
 * Het portret is zwart-wit en donker tot je eroverheen gaat (.haunted-media in app/globals.css).
 */
export default function DossierCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-scene mx-auto w-full max-w-[420px]">
      <button
        type="button"
        className="trading-card group relative block aspect-[4/5] w-full text-left"
        aria-pressed={flipped}
        data-cursor="Draai"
        onClick={() => setFlipped((value) => !value)}
      >
        <span className="sr-only">Portret van Mark van Dijk. Klik om de kaart om te draaien.</span>
        <span className="card-inner" aria-hidden="true">
          {/* ── VOORKANT ── */}
          <span className="card-face border border-cream/10 bg-abyss">
            {/* 🖼️ JOUW PORTRET HIER (staand, ± 4:5) */}
            <img
              src="/rac/it/smp2026/storage/mark/website/assets/images/portret-voor.jpg"
              alt=""
              className="haunted-media absolute inset-0 h-full w-full object-cover object-[50%_22%]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-void/50" />
            <span className="absolute inset-x-0 top-0 flex justify-between p-6 font-hahmlet text-[10px] uppercase tracking-reel text-cream/50">
              <span>Dossier nr. 001</span>
              <span>Vertrouwelijk</span>
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-6 sm:p-8">
              <span className="block font-hahmlet text-[10px] uppercase tracking-reel text-cream/50">Subject</span>
              <span className="mt-2 block font-impact text-5xl uppercase leading-[0.9] text-cream sm:text-6xl">
                Mark van Dijk
              </span>
              <span className="mt-3 block font-hahmlet text-sm text-cream-dim">22 · Den Haag · The Next Motion</span>
            </span>
          </span>

          {/* ── ACHTERKANT ── */}
          <span className="card-face card-back border border-cream/10 bg-abyss">
            {/* 🖼️ JOUW RUGFOTO HIER (zelfde hoek, van achteren) */}
            <img
              src="/rac/it/smp2026/storage/mark/website/assets/images/portret-achter.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%] opacity-70 grayscale"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/30" />
            <span className="absolute inset-x-0 top-0 flex justify-between p-6 font-hahmlet text-[10px] uppercase tracking-reel text-cream/50">
              <span>Laatst gezien</span>
              <span>Achter de lens</span>
            </span>
            <span className="absolute inset-x-0 bottom-0 block p-6 sm:p-8">
              {/* 💬 TEKST: achterkant */}
              <span className="block font-impact text-3xl uppercase leading-[1.1] text-cream sm:text-4xl">
                Ik hoor en ik vergeet,<br/>ik zie en ik onthoud,<br/>ik doe en ik begrijp.
              </span>
              <span className="mt-4 block max-w-xs font-hahmlet text-sm leading-relaxed text-cream-dim">
                Buiten het werk: kickboksen en reizen, van Den Haag tot Kuala Lumpur.
              </span>
            </span>
          </span>
        </span>
      </button>
      <p className="mt-6 flex items-center justify-center gap-3 font-hahmlet text-[10px] uppercase tracking-reel text-cream/35">
        <RotateIcon className="h-3.5 w-3.5" strokeWidth={1.2} />
        Klik om het dossier te draaien
      </p>
    </div>
  );
}
