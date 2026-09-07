import type { Metadata } from "next";
import { Montserrat, Open_Sans, Manrope } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

// Used only by the redesigned hero + header (see Header.tsx / vending hero).
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marjanivending.nl"),
  title: {
    default: "Marjani Global Services",
    template: "%s | Marjani Global Services",
  },
  description:
    "Marjani Vending verzorgt zorgeloze snack- en drankautomaten voor bedrijven. Marjani Apartments verhuurt sfeervolle appartementen, kort of langer verblijf.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${montserrat.variable} ${openSans.variable} ${manrope.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
