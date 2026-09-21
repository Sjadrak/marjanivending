/*
  GROEI ACHTER DE CAMERA
  Drie opdrachten voor The Next Motion waarbij ik de camera deed (niet de montage),
  op volgorde van oud naar nieuw. Samen laten ze zien hoe mijn camerawerk groeit.

  ✏️ TEKST · 🎬 VIDEO: pas hier de klussen aan.
  - preview: stille loop van ± 8 seconden die in de kaart speelt
  - video:   de volledige video die opent als je op de kaart klikt
  - level:   hoe ver de gouden lijn boven de kaart gevuld is (0 tot 1)
*/

export type GrowthChapter = {
  id: string;
  step: string;
  kind: string;
  title: string;
  context: string;
  duration: string;
  preview: string;
  video: string;
  poster: string;
  level: number;
  verdict: string;
  text: string;
  improvements: string[];
};

export const growthChapters: GrowthChapter[] = [
  {
    id: "emha",
    step: "01",
    kind: "Beursvideo",
    title: "EMHA op Aqua Nederland",
    context: "Vakbeurs voor watermanagement",
    duration: "0:56",
    preview: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-emha-preview.mp4",
    video: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-emha.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/groei-emha-poster.jpg",
    level: 0.34,
    verdict: "Het startpunt",
    text: "Onze allereerste klus. Eerlijk is eerlijk: van deze drie vind ik hem het zwakst. Juist daarom staat hij hier, want hier begon het.",
    improvements: ["Eerste opdracht voor een echte klant", "Standbeelden, productdetails en sfeer op de beursvloer"],
  },
  {
    id: "praktijkweek",
    step: "02",
    kind: "Eventvideo",
    title: "RAC in de Praktijk",
    context: "Praktijkweek Rotterdam Academy · april 2026",
    duration: "1:50",
    preview: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-praktijkweek-preview.mp4",
    video: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-praktijkweek.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/groei-praktijkweek-poster.jpg",
    level: 0.67,
    verdict: "De sprong",
    text: "Een video voor de opleiding over de praktijkweek, en een duidelijke sprong in kwaliteit ten opzichte van de eerste.",
    improvements: ["Rustiger, stabieler beeld", "Een sneller tempo", "Mooie overgangen in de eindmontage (niet door mij gemonteerd)"],
  },
  {
    id: "frontrunners",
    step: "03",
    kind: "Live event",
    title: "Frontrunners Table",
    context: "Pitch-event met zeven startende ondernemers",
    duration: "2:44",
    preview: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-frontrunners-preview.mp4",
    video: "/rac/it/smp2026/storage/mark/website/assets/videos/groei-frontrunners.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/groei-frontrunners-poster.jpg",
    level: 1,
    verdict: "Beste werk tot nu toe",
    text: "Een soort gameshow die de school organiseerde: pitches, jury, live muziek en een prijsuitreiking. Alles gebeurt één keer, dus er is geen tweede kans.",
    improvements: ["Sterkere camerahoeken", "Scherp blijven onder hoge druk", "De belangrijke momenten live vastleggen"],
  },
];
