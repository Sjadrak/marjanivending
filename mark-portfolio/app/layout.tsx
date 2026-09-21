import type { Metadata, Viewport } from "next";
import { Anton, Hahmlet } from "next/font/google";
import "./globals.css";

/*
  Typografie (zie STYLEGUIDE.md → Typografie)
  - Anton: de Google-Fonts-vertaling van Impact. Levert de jumpscare: groot, hard, onontkoombaar.
    Overal dezelfde letter, op elk apparaat — daarom voorgeladen.
  - Hahmlet: fluistert in plaats van schreeuwt. Aftiteling, dossiers en lopende tekst (gewicht 300).
*/
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const hahmlet = Hahmlet({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-hahmlet",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mark van Dijk — Videografie & Content",
  description:
    "Het archief van Mark van Dijk: videografie, generatieve AI en campagnes. Smart Media Production · The Next Motion.",
  openGraph: {
    title: "Mark van Dijk — Portfolio",
    description: "Videografie, generatieve AI en campagnes. Op zoek naar een stage in Marketing & Content Creatie.",
    url: siteUrl,
    siteName: "Mark van Dijk",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/rac/it/smp2026/storage/mark/website/assets/images/showreel-poster.jpg", width: 1920, height: 1080 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0C0A0D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${hahmlet.variable} ${anton.variable}`} suppressHydrationWarning>
      <head>
        {/* Zonder JavaScript blijft alles zichtbaar; met JS komen elementen traag uit de schaduw */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }} />
      </head>
      <body id="top" className="font-hahmlet text-cream">
        {children}

        {/* Globale lagen over de hele site. Klikken gaat er dwars doorheen. */}
        <div className="suede" aria-hidden="true" />
        <div className="film-grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
