import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Kies uw dienst",
  description:
    "Marjani Global Services: kies tussen Marjani Vending (snack- en drankautomaten voor bedrijven) en Marjani Apartments (verhuur van appartementen).",
};

const choices = [
  {
    href: "/vending",
    title: "Marjani Vending",
    tagline: "Snack- & drankautomaten voor bedrijven",
    description:
      "Gratis geplaatste, volledig verzorgde vending-machines voor kantoren, scholen en sportkantines. Geen investering, geen rompslomp.",
    accent: "from-marjani-red to-marjani-red-dark",
    ring: "ring-marjani-red/30",
    badge: "Snacks & Beverages",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none">
        <rect
          x="10"
          y="6"
          width="34"
          height="52"
          rx="4"
          className="fill-vending-yellow stroke-service-green-dark"
          strokeWidth="2.5"
        />
        <rect x="16" y="13" width="10" height="8" className="fill-service-green-dark" />
        <rect x="28" y="13" width="10" height="8" className="fill-service-green-dark" />
        <rect x="16" y="24" width="10" height="8" className="fill-service-green-dark" />
        <rect x="28" y="24" width="10" height="8" className="fill-service-green-dark" />
        <rect x="16" y="38" width="22" height="5" className="fill-service-green-dark" />
        <rect x="16" y="46" width="22" height="6" className="fill-service-green-dark" />
        <circle cx="48" cy="46" r="10" className="fill-marjani-red" />
        <path
          d="M44 46h8M48 42v8"
          stroke="#F2F0E6"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/apartments",
    title: "Marjani Apartments",
    tagline: "Sfeervolle appartementen, kort of langer verhuurd",
    description:
      "Bekijk de beschikbaarheid, laat uw gewenste periode achter en ontvang persoonlijk een bevestiging. Geen platformkosten, direct contact.",
    accent: "from-service-green to-service-green-dark",
    ring: "ring-service-green/30",
    badge: "Verblijf & Verhuur",
    icon: (
      <svg viewBox="0 0 64 64" className="h-14 w-14" fill="none">
        <path
          d="M8 30 32 10l24 20"
          stroke="#1E4D2B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="14"
          y="28"
          width="36"
          height="28"
          className="fill-vending-yellow stroke-service-green-dark"
          strokeWidth="2.5"
        />
        <rect x="21" y="35" width="8" height="8" className="fill-service-green-dark" />
        <rect x="35" y="35" width="8" height="8" className="fill-service-green-dark" />
        <rect x="27" y="47" width="10" height="9" className="fill-service-green-dark" />
      </svg>
    ),
  },
];

export default function ChooserPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-service-green-dark bg-vending-radial px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,240,230,0.08),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <Logo variant="mark" className="h-28 w-28 drop-shadow-xl sm:h-36 sm:w-36" />
        <p className="eyebrow mt-6 bg-vending-yellow/15 text-vending-yellow">
          Marjani Global Services
        </p>
        <h1 className="max-w-2xl text-3xl font-black text-off-white sm:text-5xl">
          Waar kunnen we u vandaag mee helpen?
        </h1>
        <p className="mt-4 max-w-xl text-base text-off-white/70 sm:text-lg">
          Wij zijn actief op twee terreinen. Kies hieronder de dienst waar u
          meer over wilt weten &mdash; u komt direct op de bijbehorende
          pagina met alle informatie en contactmogelijkheden.
        </p>
      </div>

      <div className="relative z-10 mt-12 grid w-full max-w-4xl gap-6 sm:grid-cols-2">
        {choices.map((choice) => (
          <Link
            key={choice.href}
            href={choice.href}
            className={`group flex flex-col rounded-3xl bg-off-white p-8 text-left shadow-card-lg ring-1 ${choice.ring} transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-4`}
          >
            <div
              className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${choice.accent} shadow-card`}
            >
              {choice.icon}
            </div>
            <span className="eyebrow w-fit">{choice.badge}</span>
            <h2 className="mt-1 text-2xl font-extrabold text-service-green-dark sm:text-3xl">
              {choice.title}
            </h2>
            <p className="mt-1 font-heading text-sm font-bold uppercase tracking-wide text-marjani-red">
              {choice.tagline}
            </p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-service-green-dark/70">
              {choice.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-service-green-dark">
              Bekijk {choice.title}
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M4 10h12M12 6l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <p className="relative z-10 mt-12 text-xs text-off-white/50">
        Wateringen, Nederland &middot; Marjani Global Services
      </p>
    </main>
  );
}
