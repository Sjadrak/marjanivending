import type { Category, ProjectId } from "@/lib/types";

/*
  THE ARCHIVE — projecten op de horizontale filmrol (components/sections/Archive.tsx)

  ➕ NIEUW PROJECT TOEVOEGEN
  1. Kopieer een kaart hieronder. De volgorde hier = de volgorde op de filmrol.
  2. categories: één of meer van "video", "ai", "campagne", "web".
     Projecten met "video" krijgen automatisch een REC-badge.
  3. size: "large" (breed 16:9), "tall" (staand 4:5) of "small" (vierkant).
  4. Voeg het id toe aan PROJECT_IDS in lib/types.ts en maak de detailinhoud
     in components/ProjectDetails.tsx.
*/

export type ProjectMedia =
  | { type: "video"; src: string; poster: string }
  | { type: "image"; src: string };

export type ProjectCard = {
  id: ProjectId;
  categories: Category[];
  /** Vorm van de kaart op de filmrol */
  size: "large" | "tall" | "small";
  media: ProjectMedia;
  /** Kleine verticale video naast het hoofdbeeld (alleen op grote schermen) */
  pip?: { src: string; poster: string };
  /** Jouw rol in het project — staat als eerste regel op de kaart */
  role: string;
  tag: string;
  title: string;
  description: string;
};

export const filters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Alles" },
  { id: "video", label: "Video & Foto" },
  { id: "ai", label: "Generatieve AI" },
  { id: "campagne", label: "Campagnes" },
  { id: "web", label: "Web & Data" },
];

// 🎬 VIDEO · 🖼️ FOTO · ✏️ TEKST — videowerk staat bewust vooraan: videografie is de hoofdrol
export const projectCards: ProjectCard[] = [
  {
    id: "tnm",
    categories: ["video"],
    size: "large",
    media: { type: "video", src: "/rac/it/smp2026/storage/mark/website/assets/videos/rac-preview.mp4", poster: "/rac/it/smp2026/storage/mark/website/assets/images/rac-preview-poster.jpg" },
    pip: { src: "/rac/it/smp2026/storage/mark/website/assets/videos/rac-shortform.mp4", poster: "/rac/it/smp2026/storage/mark/website/assets/images/rac-shortform-poster.jpg" },
    role: "Camera, montage & color grading",
    tag: "The Next Motion × Hogeschool Rotterdam",
    title: "Accountancy 2026 — eventvideo",
    description:
      "Een longform aftermovie voor toekomstige studenten én een verticale shortform voor social, geschoten in het stadion van Excelsior.",
  },
  {
    id: "rotspot",
    categories: ["campagne", "video", "ai"],
    size: "tall",
    media: { type: "video", src: "/rac/it/smp2026/storage/mark/website/assets/videos/rotspot.mp4", poster: "/rac/it/smp2026/storage/mark/website/assets/images/rotspot-poster.jpg" },
    role: "Concept, opname & montage",
    tag: "Gemeente Rotterdam",
    title: "Rotspot",
    description: "DOOH-video, guerrilla-posters en AI-concepten voor Rotterdamse studenten.",
  },
  {
    id: "trailers",
    categories: ["video"],
    size: "large",
    media: {
      type: "video",
      src: "/rac/it/smp2026/storage/mark/website/assets/videos/trailer-romantisch.mp4",
      poster: "/rac/it/smp2026/storage/mark/website/assets/images/trailer-romantisch-poster.jpg",
    },
    role: "Montage & grading",
    tag: "Montage · Grading",
    title: "Eén aflevering, drie genres",
    description: "Actie, klassiek en romantisch in 10 seconden.",
  },
  {
    id: "swapfiets",
    categories: ["campagne"],
    size: "tall",
    media: {
      type: "video",
      src: "/rac/it/smp2026/storage/mark/website/assets/videos/swapfiets-prototype-1.mp4",
      poster: "/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-prototype-1-poster.jpg",
    },
    role: "Concept & motion design",
    tag: "Public Space-campagne",
    title: "Swapfiets",
    description: '"Jouw schema. Niet dat van de RET." Posters met QR-actie en geanimeerde prototypes.',
  },
  {
    id: "marjani",
    categories: ["web", "ai"],
    size: "large",
    media: {
      type: "video",
      src: "/rac/it/smp2026/storage/mark/website/assets/videos/marjani-vending-hero.mp4",
      poster: "/rac/it/smp2026/storage/mark/website/assets/images/marjani-vending-hero-poster.jpg",
    },
    role: "Webdesign & AI-video",
    tag: "Webdesign · AI-visuals",
    title: "Twee websites voor Marjani",
    description: "Marjani Vending en Marjani In Su: van huisstijl en AI-herovideo tot responsive one-pager.",
  },
  {
    id: "katendrecht",
    categories: ["ai", "campagne", "web"],
    size: "tall",
    media: { type: "image", src: "/rac/it/smp2026/storage/mark/website/assets/images/katendrecht-banner.jpg" },
    role: "Concept & AR-tour",
    tag: "AR · 360° · AI",
    title: "Katendrecht · Verborgen Lagen",
    description: "Een AR- en 360°-tour die de geschiedenis van Rotterdam-Zuid weer zichtbaar maakt.",
  },
  {
    id: "kruidvat",
    categories: ["ai", "web"],
    size: "small",
    media: { type: "image", src: "/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-opvallende-data.jpg" },
    role: "Product owner",
    tag: "Data · AI-automatisering",
    title: "Baby Bubbel × Kruidvat",
    description: "Product Owner van team Boomlabs.",
  },
  {
    id: "compass",
    categories: ["ai"],
    size: "large",
    media: { type: "image", src: "/rac/it/smp2026/storage/mark/website/assets/images/compass-moodboard.jpg" },
    role: "Prompts & AI-video",
    tag: "Merkconcept · AI",
    title: "The Compass Collective",
    description: "Moodboards, productvisuals en AI-video voor een outdoor-merk.",
  },
  {
    id: "ads",
    categories: ["campagne", "ai"],
    size: "small",
    media: { type: "image", src: "/rac/it/smp2026/storage/mark/website/assets/images/vr-step-into.jpg" },
    role: "Advertentieconcepten",
    tag: "Advertising",
    title: "Drie advertenties",
    description: "Corendon, Lantarenvenster & Musk Shop.",
  },
  {
    id: "social",
    categories: ["campagne", "ai"],
    size: "large",
    media: { type: "image", src: "/rac/it/smp2026/storage/mark/website/assets/images/profielen-posters.jpg" },
    role: "Posters & studentcontent",
    tag: "Social content",
    title: "Posters & studentcontent",
    description: "Posters voor studentmedium Profielen, een onboardingvideo en een AI-strip.",
  },
];
