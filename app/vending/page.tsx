import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import ContactForm from "@/components/ContactForm";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import { SITE, VENDING, whatsappHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Marjani Vending — Snack- & drankautomaten voor bedrijven",
  description:
    "Gratis geplaatste, volledig verzorgde snack- en drankautomaten voor kantoren, scholen en sportkantines. Geen investering, geen rompslomp, uitsluitend verhuur.",
};

const usps = [
  {
    title: "Geen investering",
    description: "Wij plaatsen de automaten kosteloos bij u op locatie.",
    icon: EuroIcon,
  },
  {
    title: "Full service",
    description:
      "Plaatsing, onderhoud en bevoorrading van zoetwaren en frisdrank regelen wij.",
    icon: ServiceIcon,
  },
  {
    title: "Geen rompslomp",
    description:
      "Geen personele inzet, administratieve lasten of contractverplichtingen.",
    icon: ClipboardIcon,
  },
  {
    title: "Uitsluitend verhuur",
    description: "Onze automaten zijn niet te koop, wel altijd goed onderhouden.",
    icon: KeyIcon,
  },
];

const machines = [
  {
    name: "Snoep- & snackautomaat",
    description:
      "Chips, chocolade en zoetwaren overzichtelijk gepresenteerd, altijd goed gevuld.",
    tags: ["Chips", "Chocolade", "Koek"],
  },
  {
    name: "Frisdrank- & koude drankenautomaat",
    description:
      "Blikjes en flesjes fris, water en sappen, gekoeld en direct grijpklaar.",
    tags: ["Fris", "Water", "Sap"],
  },
  {
    name: "Combi-automaat",
    description:
      "Snacks én dranken in één toestel — ideaal voor kleinere kantoorruimtes.",
    tags: ["Snacks", "Dranken", "Compact"],
  },
  {
    name: "Koffie & warme dranken",
    description:
      "Vers gezette koffie, thee en chocomel voor bij het bureau of in de kantine.",
    tags: ["Koffie", "Thee", "Chocomel"],
  },
];

const steps = [
  {
    step: "01",
    title: "Aanvraag & advies",
    description:
      "U laat uw locatie en wensen achter, wij adviseren welke automaat het beste past.",
  },
  {
    step: "02",
    title: "Gratis plaatsing",
    description:
      "Onze techniek plaatst en installeert de automaat zonder kosten voor u.",
  },
  {
    step: "03",
    title: "Vulling & onderhoud",
    description:
      "Wij bevoorraden en onderhouden de automaat volgens een vast schema.",
  },
  {
    step: "04",
    title: "Altijd bereikbaar",
    description:
      "Storing of vraag? Via telefoon of WhatsApp staan we snel voor u klaar.",
  },
];

const faqs = [
  {
    q: "Kost het plaatsen van een automaat ons iets?",
    a: "Nee. Marjani Vending plaatst de automaat kosteloos. U betaalt niets voor de machine zelf, wij verdienen aan de verkoop.",
  },
  {
    q: "Kunnen we een automaat kopen in plaats van huren?",
    a: "Onze automaten zijn uitsluitend te huur, nooit te koop. Zo blijft onderhoud en vervanging altijd onze verantwoordelijkheid.",
  },
  {
    q: "Wie vult de automaat bij?",
    a: "Dat doen wij, volgens een vast onderhoudsschema en op afroep bij drukte, zodat de voorraad nooit opraakt.",
  },
  {
    q: "Wat als de automaat een storing heeft?",
    a: "U belt of appt ons en we lossen het zo snel mogelijk op — meestal dezelfde of de eerstvolgende werkdag.",
  },
];

export default function VendingPage() {
  return (
    <>
      <Header active="vending" />

      {/* HERO */}
      <section className="relative isolate min-h-[700px] overflow-hidden bg-mv-green-deep font-manrope text-white sm:min-h-[720px] lg:h-[calc(100vh-64px)] lg:min-h-[720px] lg:max-h-[920px]">
        <Image
          src="/images/hero-section.png"
          alt="Premium Marjani-snackautomaat met warme LED-verlichting in een moderne kantoorlobby"
          fill
          priority
          sizes="100vw"
          className="object-[68%_65%] object-cover sm:object-[60%_65%] lg:object-[center_70%]"
        />

        {/* Layer 1 — subtle overall tint so the photo still reads as photographic */}
        <div className="absolute inset-0 bg-mv-green-deep/20" />
        {/* Layer 2 — left-to-right gradient; darkest where the text sits, clear over the machine */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,30,20,0.94) 0%, rgba(4,39,25,0.84) 38%, rgba(4,34,24,0.48) 63%, rgba(4,25,18,0.16) 100%)",
          }}
        />
        {/* Stronger, flatter left overlay below desktop where the crop shifts and text needs more contrast */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,30,20,0.96) 0%, rgba(3,30,20,0.82) 55%, rgba(3,30,20,0.4) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mv-green-deep/45 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-16 pt-[100px] sm:px-8 sm:pt-[110px] lg:pt-[120px]">
          <div className="max-w-[620px]">
            <span className="animate-fade-up inline-flex items-center rounded-full border border-mv-gold/35 bg-mv-green-secondary/70 px-3.5 py-2 text-[13px] font-bold uppercase tracking-[0.16em] text-mv-gold-bright">
              Marjani Vending
            </span>

            <h1 className="animate-fade-up mt-[22px] text-[42px] font-extrabold leading-[1.03] tracking-[-0.03em] text-white [animation-delay:80ms] sm:text-[50px] lg:text-[64px] lg:leading-[1.0] lg:tracking-[-0.035em]">
              Zorgeloze snack- &amp; drinkvoorziening{" "}
              <span className="block text-mv-gold-bright">voor uw bedrijf</span>
            </h1>

            <p className="animate-fade-up mt-6 max-w-[590px] text-[17px] leading-[1.65] text-mv-cream/85 [animation-delay:160ms] sm:text-[18px]">
              Fully serviced, multi-product automaten voor kantoren, scholen
              en sportkantines. Wij plaatsen, vullen en onderhouden &mdash; u
              hoeft nergens naar om te kijken.
            </p>

            <div className="animate-fade-up mt-[30px] flex flex-wrap items-center gap-3.5 [animation-delay:240ms]">
              <Link
                href="#contact"
                className="group inline-flex h-[50px] items-center gap-2 rounded-xl bg-mv-gold-bright px-6 text-[15px] font-extrabold uppercase tracking-wide text-mv-green-deep transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,190,63,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-mv-gold-bright focus-visible:ring-offset-2 focus-visible:ring-offset-mv-green-deep"
              >
                Vraag offerte aan
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
                  <path
                    d="M7.5 10h5M10 7.5 12.5 10 10 12.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href={whatsappHref(VENDING.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-[50px] items-center gap-2 rounded-xl border border-white/20 bg-white/[0.06] px-6 text-[15px] font-bold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mv-green-deep"
              >
                <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" fill="currentColor">
                  <path d="M16.02 4C9.4 4 4 9.4 4 16.02c0 2.3.62 4.44 1.72 6.28L4 28l5.86-1.66a11.9 11.9 0 006.16 1.68C22.66 28.02 28 22.62 28 16s-5.34-12-11.98-12zm.02 21.7c-2 0-3.87-.55-5.47-1.5l-.39-.23-3.68 1.04 1.06-3.6-.25-.4a9.6 9.6 0 01-1.5-5.19c0-5.33 4.35-9.68 9.7-9.68 5.35 0 9.7 4.35 9.7 9.68 0 5.34-4.35 9.88-9.17 9.88z" />
                </svg>
                Direct WhatsAppen
              </a>
            </div>

            <div className="animate-fade-up mt-7 flex items-center gap-3 text-[13px] text-mv-cream/70 [animation-delay:320ms]">
              <Logo variant="mark" className="h-[30px] w-[30px]" />
              <span>Onderdeel van Marjani Global Services &middot; Wateringen</span>
            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="bg-off-white">
        <div className="section grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {usps.map(({ title, description, icon: Icon }) => (
            <div key={title} className="card">
              <Icon className="h-10 w-10 text-marjani-red" />
              <h3 className="mt-4 font-heading text-lg font-bold text-service-green-dark">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-service-green-dark/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WAT KRIJGT U */}
      <section id="automaten" className="bg-white">
        <div className="section">
          <span className="eyebrow">Wat krijgt u</span>
          <h2 className="max-w-2xl text-3xl font-extrabold text-service-green-dark sm:text-4xl">
            Automaten op maat van uw locatie
          </h2>
          <p className="mt-4 max-w-2xl text-service-green-dark/70">
            Van pure snackautomaten tot volledige combi-oplossingen &mdash; we
            stellen samen vast wat het beste past bij het aantal medewerkers
            en de ruimte die u heeft.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {machines.map((m) => (
              <div
                key={m.name}
                className="card flex flex-col gap-3 border-service-green/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-service-green/10">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-service-green" fill="none">
                    <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8 8h3M13 8h3M8 12h3M13 12h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <rect x="8" y="16" width="8" height="2.4" rx="1" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-service-green-dark">
                  {m.name}
                </h3>
                <p className="text-sm leading-relaxed text-service-green-dark/70">
                  {m.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-vending-yellow/20 px-3 py-1 text-xs font-bold text-service-green-dark"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZO WERKT HET */}
      <section className="bg-service-green/5">
        <div className="section">
          <span className="eyebrow">Zo werkt het</span>
          <h2 className="max-w-2xl text-3xl font-extrabold text-service-green-dark sm:text-4xl">
            Van aanvraag tot dagelijks gebruik
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative">
                <span className="font-heading text-5xl font-black text-service-green/15">
                  {s.step}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-service-green-dark">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-service-green-dark/70">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="section max-w-3xl">
          <span className="eyebrow">Veelgestelde vragen</span>
          <h2 className="text-3xl font-extrabold text-service-green-dark sm:text-4xl">
            Wat mensen ons vaak vragen
          </h2>
          <div className="mt-8 divide-y divide-service-green/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-base font-bold text-service-green-dark">
                  {f.q}
                  <span className="ml-4 text-service-green transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-service-green-dark/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-service-green-dark text-off-white">
        <div className="section grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow bg-vending-yellow/15 text-vending-yellow">
              Contact
            </span>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Vraag vrijblijvend een offerte aan
            </h2>
            <p className="mt-4 max-w-md text-off-white/70">
              Vul het formulier in of neem direct contact op. We reageren
              doorgaans binnen één werkdag met een voorstel op maat.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a href={SITE.phoneHref} className="flex items-center gap-3 hover:text-vending-yellow">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-off-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M6.6 10.8c1.2 2.4 3.2 4.3 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H7.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-1.9 1.9z" />
                  </svg>
                </span>
                {SITE.phoneDisplay}
              </a>
              <a
                href={whatsappHref(VENDING.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-vending-yellow"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-off-white/10">
                  <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor">
                    <path d="M16.02 4C9.4 4 4 9.4 4 16.02c0 2.3.62 4.44 1.72 6.28L4 28l5.86-1.66a11.9 11.9 0 006.16 1.68C22.66 28.02 28 22.62 28 16s-5.34-12-11.98-12zm.02 21.7c-2 0-3.87-.55-5.47-1.5l-.39-.23-3.68 1.04 1.06-3.6-.25-.4a9.6 9.6 0 01-1.5-5.19c0-5.33 4.35-9.68 9.7-9.68 5.35 0 9.7 4.35 9.7 9.68 0 5.34-4.35 9.88-9.17 9.88z" />
                  </svg>
                </span>
                WhatsApp ons direct
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-vending-yellow">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-off-white/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-off-white p-1">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer active="vending" />
      <FloatingContactButtons whatsappMessage={VENDING.whatsappMessage} />
    </>
  );
}

function EuroIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17 8a6 6 0 1 0 0 8M4 10h9M4 14h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ServiceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClipboardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function KeyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="8" cy="15" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 12 19 4M16 5l2 2M19 4l1.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
