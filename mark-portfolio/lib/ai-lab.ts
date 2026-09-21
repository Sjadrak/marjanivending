// 🖼️ FOTO / 🎬 VIDEO: items in de horizontale AI-lab-galerij (klik op een foto voor groot)
export type AiLabItem =
  | { type: "image"; src: string; alt: string; caption: string; label: string }
  | { type: "video"; src: string; poster: string; ariaLabel: string; label: string };

export const aiLabItems: AiLabItem[] = [
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/vr-step-into.jpg",
    alt: "Neon tekst Step into the movie in een donkere bioscoopgang",
    caption: "“Step into the movie” — VR-bioscoopcampagne · Sora",
    label: "VR-bioscoop · Sora",
  },
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/rotspot-deuren.jpg",
    alt: "Drie deuren met handgeschreven vragen voor Rotspot",
    caption: "Rotspot guerrilla-concept: waar eten, studieplek, chillplek? · Gemini",
    label: "Rotspot · Gemini",
  },
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/musk-shop.jpg",
    alt: "Gele advertentie Ruik, raad en win van Musk Shop",
    caption: "“Ruik, raad & win” — Musk Shop-advertentie · Sora",
    label: "Musk Shop · Sora",
  },
  {
    type: "video",
    src: "/rac/it/smp2026/storage/mark/website/assets/videos/ai-chaos-naar-rust.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/ai-chaos-naar-rust-poster.jpg",
    ariaLabel: "AI-video Rotterdam van chaos naar rust",
    label: "Rotspot · Van chaos naar rust",
  },
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/katendrecht-nacht.jpg",
    alt: "Twee mannen op een kade in Katendrecht bij nacht",
    caption: "Sfeerbeeld Katendrecht bij nacht",
    label: "Katendrecht · Sfeerbeeld",
  },
  {
    type: "video",
    src: "/rac/it/smp2026/storage/mark/website/assets/videos/ai-kaarten.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/ai-kaarten-poster.jpg",
    ariaLabel: "AI-video van een app met verzamelkaarten",
    label: "App-concept · AI-video",
  },
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/vr-cinema.jpg",
    alt: "Bioscoopzaal vol mensen met VR-brillen",
    caption: "VR-bioscoopbeleving · Sora",
    label: "VR-bioscoop · Sora",
  },
  {
    type: "image",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/productowner-lore.jpg",
    alt: "Stripverhaal Productowner Lore in zes panelen",
    caption: "“Productowner Lore” — AI-strip",
    label: "Productowner Lore · AI-strip",
  },
];
