/*
  END CREDITS — de rollende aftiteling (components/sections/CreditsRoll.tsx)
  ✏️ TEKST: links staat de "rol", rechts de "naam" (de skill, tool of het bedrijf).
*/

export interface CreditLine {
  role: string;
  names: string[];
}

export interface CreditBlock {
  /** Kop boven een blok, bijv. "Camera & montage". Leeg = geen kop. */
  heading?: string;
  lines: CreditLine[];
}

/** De grote openingsregels, zoals bovenaan een echte aftiteling */
export const creditLeads: { role: string; name: string }[] = [
  { role: "Camera & videografie", name: "Mark van Dijk" },
  { role: "Een productie van", name: "The Next Motion" },
  { role: "In opleiding bij", name: "Rotterdam Academy" },
];

export const creditBlocks: CreditBlock[] = [
  {
    heading: "Camera & montage — de hoofdrol",
    lines: [
      { role: "Camera", names: ["A- & B-roll", "4K-eventregistratie", "360°-video"] },
      { role: "Fotografie", names: ["Eventfotografie"] },
      { role: "Montage", names: ["Premiere Pro", "After Effects"] },
    ],
  },
  {
    heading: "Content & campagnes",
    lines: [
      { role: "Doelgroeponderzoek", names: ["Persona's", "Mediaplanning"] },
      { role: "Campagnes", names: ["DOOH & Public Space", "Social content"] },
      { role: "Verhaal", names: ["Storytelling"] },
    ],
  },
  {
    heading: "Generatieve AI",
    lines: [
      { role: "Prompt engineering", names: ["Beeld", "Video", "Stem"] },
      { role: "Tools", names: ["Gemini", "ChatGPT", "ElevenLabs", "Wan & Seedance"] },
    ],
  },
  {
    heading: "Web, data & automatisering",
    lines: [
      { role: "Automatisering", names: ["Sheets + Gemini flows", "MAKE.com"] },
      { role: "Analyse", names: ["A/B-testing", "Conversion funnels"] },
      { role: "Ontwerp & bouw", names: ["Figma", "HTML & CSS"] },
    ],
  },
  {
    heading: "Ook in de hoofdrol",
    lines: [
      { role: "Product owner", names: ["Team Boomlabs — Kruidvat-case"] },
      { role: "Sterk in", names: ["Creatief denken", "Snel schakelen", "Samenwerken"] },
      { role: "Talen", names: ["Nederlands", "Engels", "Duits", "Spaans"] },
    ],
  },
];

/** Slotregel van de aftiteling */
export const creditsMotto = "Ik hoor en ik vergeet, ik zie en ik onthoud, ik doe en ik begrijp.";
