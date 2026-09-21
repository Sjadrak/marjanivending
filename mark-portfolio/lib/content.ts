// Skills, tools, werkervaring en talen staan in lib/credits.ts (de aftiteling).

// ✏️ TEKST: stage- en persoonlijke gegevens in "Over mij"
export const aboutFacts: [label: string, value: string][] = [
  ["Opleiding", "Smart Media Production"],
  ["School", "Rotterdam Academy"],
  ["Stage in", "Marketing & Content"],
  ["Periode", "In overleg"],
  ["Woonplaats", "Den Haag"],
  ["Talen", "NL · EN · DE · ES"],
  ["Rijbewijs", "B"],
  ["Hobby's", "Kickboksen & reizen"],
];

// ✏️ TEKST: tijdlijn
export const timeline = [
  {
    label: "2026 · The Next Motion",
    text: "Event- en bedrijfsvideo's, waaronder long- en shortform voor het Accountancy-event van Hogeschool Rotterdam.",
  },
  {
    label: "2026 · Periode 4",
    text: "AR/360°-tour Katendrecht en twee websites voor Marjani Global Services.",
  },
  {
    label: "2026 · Periode 3",
    text: "Product Owner bij team Boomlabs (Kruidvat-case) en twee Google AI-certificaten.",
  },
  {
    label: "2025 — 2026 · Periode 2",
    text: "Rotspot met de Gemeente Rotterdam, advertentieconcepten en de Swapfiets-campagne.",
  },
  {
    label: "2025 · Periode 1",
    text: "Start Smart Media Production: AI-merkconcept en social content.",
  },
];

// 🖼️ FOTO: certificaten
export const certificates = [
  {
    title: "Google AI Essentials",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/cert-google-ai.jpg",
    caption: "Google AI Essentials — Coursera",
  },
  {
    title: "Google Prompting Essentials",
    src: "/rac/it/smp2026/storage/mark/website/assets/images/cert-google-prompting.jpg",
    caption: "Google Prompting Essentials — Coursera",
  },
];

// 📊 METER: zelfreflectie-balken — value: 0 = leeg, 1 = vol
export const meters = [
  {
    name: "AI-tools",
    level: "Sterk",
    value: 0.71,
    note: "Ik ga gemakkelijk om met AI, ook als het een tool is die nieuw voor me is.",
  },
  {
    name: "Collegiaal werken",
    level: "Sterk",
    value: 0.62,
    note: "Ik werk goed samen, zie snel sterke en zwakke punten en zorg dat processen soepel verlopen.",
  },
  {
    name: "Videografie",
    level: "Goede basis",
    value: 0.44,
    note: "Een stevige basis met oog voor storytelling, en er valt nog veel te leren.",
  },
  {
    name: "Editing",
    level: "In ontwikkeling",
    value: 0.31,
    note: "De basis zit erin; ik word steeds beter in transities en in het vinden van mijn eigen editstijl.",
  },
  {
    name: "End-to-end productie",
    level: "Groeipunt",
    value: 0.08,
    note: "Het volledige traject zelfstandig draaien, van idee tot oplevering, is mijn volgende stap.",
  },
  {
    name: "Copywriting",
    level: "Groeipunt",
    value: 0.08,
    note: "Campagneteksten schrijven is iets waar ik bewust meer mee wil oefenen.",
  },
];

// ✏️ TEKST: richting & interesse
export const reflectionAnswers = [
  {
    question: "Welke kerntaak trekt mij het meest?",
    answer:
      "De productiekant: video's, foto's en vormgeving. Daar liggen mijn interesses, al heb ik er nog veel te leren. Ook de communicatiekant vind ik erg interessant.",
    delay: ".15s",
  },
  {
    question: "Welke beroepsrol spreekt mij aan?",
    answer:
      "Data-analist én mediamaker. De ene rol biedt een vast, goed inkomen dat je overal kunt verdienen. De andere is een dynamische baan waarin je van alles kunt en moet doen: de kansen liggen hoger, de zekerheid lager.",
    delay: ".3s",
  },
];
