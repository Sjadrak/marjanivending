import type { Metadata } from "next";
import type { SVGProps } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import BookingWidget from "@/components/BookingWidget";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { SITE, APARTMENTS, whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marjani Apartments — Verblijf & verhuur",
  description:
    "Sfeervolle, volledig ingerichte appartementen voor kort of langer verblijf. Bekijk de beschikbaarheid en laat uw gewenste periode achter.",
};

const amenities = [
  { label: "Volledig ingerichte keuken", icon: KitchenIcon },
  { label: "Gratis WiFi", icon: WifiIcon },
  { label: "Eigen badkamer", icon: BathIcon },
  { label: "Parkeergelegenheid", icon: ParkingIcon },
  { label: "Wasmachine aanwezig", icon: WashIcon },
  { label: "Rustige, veilige buurt", icon: ShieldIcon },
];

const stays = [
  {
    title: "Short stay",
    description:
      "Van een paar nachten tot enkele weken &mdash; ideaal voor een korte werkperiode, verhuizing of vakantie.",
  },
  {
    title: "Langer verblijf",
    description:
      "Voor wie langer blijft bieden we een vaste, voordelige maandprijs met dezelfde volledige service.",
  },
  {
    title: "Persoonlijk contact",
    description:
      "Geen anonieme platformen: u boekt rechtstreeks bij ons, met een vast aanspreekpunt via telefoon of WhatsApp.",
  },
];

export default function ApartmentsPage() {
  return (
    <>
      <Header active="apartments" />

      {/* HERO */}
      <section className="relative overflow-hidden bg-service-green-dark text-off-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(232,197,71,0.14),transparent_55%),radial-gradient(circle_at_85%_85%,rgba(166,38,33,0.18),transparent_50%)]" />
        <div className="section relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow bg-vending-yellow/15 text-vending-yellow">
              Marjani Apartments
            </span>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
              Sfeervolle verblijven, kort of langer verhuurd
            </h1>
            <p className="mt-5 max-w-lg text-base text-off-white/75 sm:text-lg">
              Volledig ingerichte appartementen, direct te boeken via een
              persoonlijke aanvraag &mdash; geen platformkosten, geen
              wachtrijen.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#beschikbaarheid" className="btn-primary">
                Bekijk beschikbaarheid
              </Link>
              <a
                href={whatsappHref(APARTMENTS.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
                  <path d="M16.02 4C9.4 4 4 9.4 4 16.02c0 2.3.62 4.44 1.72 6.28L4 28l5.86-1.66a11.9 11.9 0 006.16 1.68C22.66 28.02 28 22.62 28 16s-5.34-12-11.98-12zm.02 21.7c-2 0-3.87-.55-5.47-1.5l-.39-.23-3.68 1.04 1.06-3.6-.25-.4a9.6 9.6 0 01-1.5-5.19c0-5.33 4.35-9.68 9.7-9.68 5.35 0 9.7 4.35 9.7 9.68 0 5.34-4.35 9.88-9.17 9.88z" />
                </svg>
                Direct WhatsAppen
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-sm text-off-white/60">
              <Logo variant="mark" className="h-10 w-10" />
              <span>Onderdeel van Marjani Global Services &middot; Wateringen</span>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-3">
            <div className="col-span-2 h-40 rounded-2xl bg-gradient-to-br from-vending-yellow/25 to-service-green/40 ring-1 ring-off-white/10" />
            <div className="h-28 rounded-2xl bg-gradient-to-br from-service-green/40 to-marjani-red/20 ring-1 ring-off-white/10" />
            <div className="h-28 rounded-2xl bg-gradient-to-br from-marjani-red/25 to-vending-yellow/20 ring-1 ring-off-white/10" />
            <p className="col-span-2 mt-1 text-center text-xs text-off-white/50">
              Foto&rsquo;s van het appartement volgen &mdash; vraag ze gerust
              alvast op via WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* WAAROM */}
      <section className="bg-off-white">
        <div className="section grid gap-6 py-12 sm:grid-cols-3 lg:py-16">
          {stays.map((s) => (
            <div key={s.title} className="card">
              <h3 className="font-heading text-lg font-bold text-service-green-dark">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-service-green-dark/70">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-white">
        <div className="section">
          <span className="eyebrow">Wat u krijgt</span>
          <h2 className="max-w-2xl text-3xl font-extrabold text-service-green-dark sm:text-4xl">
            Alles aanwezig, meteen instapklaar
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-service-green/10 bg-off-white/60 p-5"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-service-green/10 text-service-green">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-heading text-sm font-bold text-service-green-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESCHIKBAARHEID */}
      <section id="beschikbaarheid" className="bg-service-green/5">
        <div className="section">
          <span className="eyebrow">Agenda</span>
          <h2 className="max-w-2xl text-3xl font-extrabold text-service-green-dark sm:text-4xl">
            Bekijk de beschikbaarheid &amp; vraag uw periode aan
          </h2>
          <p className="mt-4 max-w-2xl text-service-green-dark/70">
            Kies uw gewenste in- en uitcheckdatum. We bevestigen de boeking
            persoonlijk per e-mail, meestal binnen één werkdag.
          </p>

          <div className="mt-10">
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section id="contact" className="bg-service-green-dark text-off-white">
        <div className="section flex flex-col items-center gap-6 py-14 text-center">
          <span className="eyebrow bg-vending-yellow/15 text-vending-yellow">
            Liever direct contact?
          </span>
          <h2 className="max-w-xl text-3xl font-extrabold sm:text-4xl">
            Bel of app ons, we denken graag met u mee
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={SITE.phoneHref} className="btn-outline">
              {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappHref(APARTMENTS.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              WhatsApp ons
            </a>
            <a href={`mailto:${SITE.email}`} className="btn-outline">
              {SITE.email}
            </a>
          </div>
        </div>
      </section>

      <Footer active="apartments" />
      <FloatingContactButtons whatsappMessage={APARTMENTS.whatsappMessage} />
    </>
  );
}

function KitchenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 10h16M7 10V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5M6 10v10M18 10v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function WifiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 8.5a16 16 0 0 1 18 0M6.2 12a11 11 0 0 1 11.6 0M9.5 15.5a6 6 0 0 1 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
    </svg>
  );
}
function BathIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM6 12V6a2 2 0 0 1 3-1.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ParkingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 16V8h3.2a2.4 2.4 0 1 1 0 4.8H9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function WashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 6.5h.01M11 6.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
