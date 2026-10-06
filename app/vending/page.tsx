import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import FloatingProducts from "@/components/FloatingProducts";
import HeroScrollSection from "@/components/HeroScrollSection";
import ScrollRule from "@/components/ScrollRule";
import { EuroIcon, ServiceIcon, ClipboardIcon, KeyIcon } from "@/components/icons";
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

// Slight vertical offsets so the 2x2 grid reads as editorial rhythm.
const CARD_OFFSETS = ["", "sm:mt-[18px]", "sm:mt-[10px]", ""];

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

// Het werkelijke assortiment, zoals het in onze automaten zit.
const assortiment = [
  { groep: "Chips & hartig", items: "Lay's, Kanters, Duyvis, Wasa" },
  { groep: "Koek & chocolade", items: "KitKat, Twix, Mars, Snickers, Bounty, Prince, Kinder Bueno" },
  { groep: "Snoep", items: "Haribo" },
  { groep: "Frisdrank", items: "Coca-Cola, Fanta, Sprite, Fernandes" },
  { groep: "IJsthee & sappen", items: "Lipton Ice Tea, Dubbel Frisss, Taksi, Fristi" },
  { groep: "Energy", items: "Red Bull" },
];

// Foto's van onze eigen automaten op locatie.
const praktijk = [
  {
    src: "/images/vending/bijvullen.jpg",
    alt: "Open vending-automaat tijdens het bijvullen van de schappen",
    titel: "Wij vullen bij",
    tekst: "Volgens een vast schema, en extra bij drukte.",
  },
  {
    src: "/images/vending/touchscreen.jpg",
    alt: "Touchscreen van de automaat met de baanconfiguratie per product",
    titel: "Techniek & beheer",
    tekst: "Prijzen en voorraad stellen wij per baan in.",
  },
  {
    src: "/images/vending/machine-gevuld.jpg",
    alt: "Volledig gevulde automaat met snacks en koude dranken",
    titel: "Altijd gevuld",
    tekst: "Van chips tot koude fris, dag en nacht beschikbaar.",
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

      {/* HERO — scroll-driven cinematic sequence, see components/HeroScrollSection.tsx */}
      <HeroScrollSection />

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
      <section
        id="automaten"
        className="relative overflow-hidden bg-gradient-to-b from-[#FAF9F3] via-[#F6F4EB] to-[#F2F5F1]"
      >
        {/* Barely-there architectural light, keeps the cream from going flat. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_8%,rgba(232,197,71,0.05),transparent_55%)]"
        />
        <FloatingProducts />

        <div className="section relative z-10">
          {/* Intro */}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-vending-yellow" />
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-service-green/70">
              Wat krijgt u
            </span>
          </div>

          <h2 className="mt-5 max-w-3xl text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] text-service-green-dark sm:text-[44px] lg:text-[52px]">
            Automaten op maat van uw
            <br className="hidden sm:block" /> locatie
          </h2>

          <p className="mt-5 max-w-[620px] text-service-green-dark/70">
            Van pure snackautomaten tot volledige combi-oplossingen &mdash; we
            stellen samen vast wat het beste past bij het aantal medewerkers
            en de ruimte die u heeft.
          </p>

          {/* Editorial rule closing the intro */}
          <div aria-hidden="true" className="mt-10 flex items-center gap-3">
            <span className="h-px w-14 bg-vending-yellow" />
            <span className="h-px flex-1 bg-service-green/10" />
          </div>

          {/* Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {machines.map((m, i) => (
              <div
                key={m.name}
                className={`group relative flex flex-col gap-3 rounded-[18px] border border-[rgba(6,55,34,0.08)] bg-white p-6 shadow-[0_1px_2px_rgba(6,55,34,0.04),0_10px_28px_-20px_rgba(6,55,34,0.25)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:border-[rgba(6,55,34,0.16)] hover:shadow-[0_2px_4px_rgba(6,55,34,0.05),0_16px_34px_-20px_rgba(6,55,34,0.3)] ${CARD_OFFSETS[i] ?? ""}`}
              >
                <span className="font-heading text-[11px] font-bold tracking-[0.22em] text-service-green/35 transition-colors duration-300 group-hover:text-vending-yellow-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-service-green/[0.07] transition-colors duration-300 group-hover:bg-vending-yellow/20">
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

          {/* Hand-over to the next section */}
          <div className="mt-16 sm:mt-20">
            <ScrollRule from="01" to="02" />
          </div>
        </div>
      </section>

      {/* HET ASSORTIMENT — echte foto van onze eigen automaat */}
      <section id="assortiment" className="bg-service-green/5">
        <div className="section grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-vending-yellow" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-service-green/70">
                Het assortiment
              </span>
            </div>

            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] text-service-green-dark sm:text-[44px] lg:text-[52px]">
              Wat er in de automaat gaat
            </h2>

            <p className="mt-5 max-w-[560px] text-service-green-dark/70">
              Bekende merken waar uw mensen echt naar grijpen. Wij stemmen de
              vulling af op uw locatie en passen die aan op wat er goed loopt
              &mdash; u hoeft zelf niets te bestellen of bij te houden.
            </p>

            <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {assortiment.map((a) => (
                <div key={a.groep}>
                  <dt className="font-heading text-[11px] font-bold uppercase tracking-[0.18em] text-vending-yellow-dark">
                    {a.groep}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-service-green-dark/75">
                    {a.items}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="relative mx-auto w-full max-w-[460px]">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] border border-[rgba(6,55,34,0.08)] bg-white shadow-[0_24px_60px_-32px_rgba(6,55,34,0.45)]">
              <Image
                src="/images/vending/assortiment.jpg"
                alt="Volledig gevulde Marjani-automaat met chips, chocolade, frisdrank en ijsthee"
                fill
                sizes="(max-width: 1024px) 90vw, 460px"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs text-service-green-dark/55">
              Een van onze automaten, volledig gevuld opgeleverd.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ZO WERKT HET — continues out of the section above, no hard break */}
      <section id="service" className="bg-white">
        <div className="section pt-12 sm:pt-14">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-vending-yellow" />
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-service-green/70">
              Zo werkt het
            </span>
          </div>

          <h2 className="mt-5 max-w-3xl text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] text-service-green-dark sm:text-[44px] lg:text-[52px]">
            Van aanvraag tot dagelijks gebruik
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* In de praktijk — eigen foto's van de service */}
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {praktijk.map((p) => (
              <figure key={p.src}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-[rgba(6,55,34,0.08)] bg-service-green/5 shadow-[0_18px_40px_-28px_rgba(6,55,34,0.4)]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4">
                  <span className="font-heading text-sm font-bold text-service-green-dark">
                    {p.titel}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-service-green-dark/65">
                    {p.tekst}
                  </span>
                </figcaption>
              </figure>
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

      {/* PERSOONLIJK — wie er achter de automaat staat */}
      <section className="bg-off-white">
        <div className="section grid items-center gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <figure className="relative mx-auto w-full max-w-[420px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-[rgba(6,55,34,0.08)] bg-white shadow-[0_24px_60px_-32px_rgba(6,55,34,0.45)]">
              <Image
                src="/images/vending/persoonlijk.jpg"
                alt="Marjani Vending bij een geplaatste automaat op locatie"
                fill
                sizes="(max-width: 1024px) 90vw, 420px"
                className="object-cover object-[50%_35%]"
              />
            </div>
          </figure>

          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-vending-yellow" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.26em] text-service-green/70">
                Persoonlijk
              </span>
            </div>

            <h2 className="mt-5 text-[34px] font-extrabold leading-[1.06] tracking-[-0.02em] text-service-green-dark sm:text-[44px] lg:text-[52px]">
              Geen callcenter, maar een vast gezicht
            </h2>

            <p className="mt-5 max-w-[560px] text-service-green-dark/70">
              Wij plaatsen, vullen en onderhouden de automaten zelf, vanuit
              Wateringen. U heeft daardoor altijd met dezelfde mensen te maken
              &mdash; en bij een storing of vraag belt of appt u ons gewoon
              rechtstreeks.
            </p>

            <p className="mt-6 font-heading text-sm font-bold text-service-green-dark">
              Marjani Vending &middot; onderdeel van Marjani Global Services
            </p>
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

            <div className="relative mt-10 hidden aspect-[5/4] w-full max-w-sm overflow-hidden rounded-[18px] ring-1 ring-off-white/15 lg:block">
              <Image
                src="/images/vending/machine-op-locatie.jpg"
                alt="Geplaatste Marjani-automaat bij een klant op locatie"
                fill
                sizes="384px"
                className="object-cover object-top"
              />
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
