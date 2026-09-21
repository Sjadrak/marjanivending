/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import type { ProjectId } from "@/lib/types";

/*
  PROJECT-DETAILS
  Elk blok hieronder is de inhoud van het venster voor één project.
  ✏️ TEKST · 🖼️ FOTO · 🎬 VIDEO: pas hier de details per project aan.
*/

const externalLinkClass =
  "mt-12 inline-flex items-center gap-3 border border-cream/20 px-7 py-4 text-[11px] uppercase tracking-reel text-cream transition-colors duration-500 ease-haunt hover:border-ember/70 hover:text-ember";

function DetailVideo({ src, poster, className }: { src: string; poster: string; className: string }) {
  return (
    <video className={className} controls playsInline preload="metadata" poster={poster}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

function DetailBody({ children, className = "px-6 py-14 sm:px-12 lg:px-16" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function DetailHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-[11px] uppercase tracking-reel text-cream/50">{eyebrow}</p>
      <h2 id="dialog-title" className="mt-5 font-impact text-5xl uppercase leading-[0.9] text-cream sm:text-7xl">
        {title}
      </h2>
    </>
  );
}

function DetailSummary({ meta, children }: { meta: [label: string, value: string][]; children: ReactNode }) {
  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-3">
      <div className="space-y-4 leading-relaxed text-cream-dim lg:col-span-2">{children}</div>
      <dl className="space-y-6 border-l border-cream/10 pl-8 text-sm">
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] uppercase tracking-reel text-cream/45">{label}</dt>
            <dd className="mt-1 text-cream/85">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ── The Next Motion × Hogeschool Rotterdam — Accountancy 2026 ──
const racPhotos: [src: string, alt: string][] = [
  ["rac-event-stadion.jpg", "Leeg voetbalstadion vanaf de tribune"],
  ["rac-event-spreker-veld.jpg", "Spreker met microfoon langs het veld"],
  ["rac-event-zaal.jpg", "Volle zaal tijdens een presentatie"],
  ["rac-event-gesprek.jpg", "Twee deelnemers in gesprek achter een laptop"],
  ["rac-event-presentatie.jpg", "Twee sprekers op een podium"],
  ["rac-event-luisteren.jpg", "Publiek luistert aandachtig"],
  ["rac-event-publiek.jpg", "Publiek in een volle zaal"],
  ["rac-event-shirt.jpg", "Deelnemers poseren met een voetbalshirt"],
  ["rac-event-borrel.jpg", "Spreker tijdens de netwerkborrel"],
];

const tnm = (
  <>
    {/* 🎬 VIDEO: longform eindversie (16:9) */}
    <DetailVideo
      src="/rac/it/smp2026/storage/mark/website/assets/videos/rac-longform.mp4"
      poster="/rac/it/smp2026/storage/mark/website/assets/images/rac-longform-poster.jpg"
      className="aspect-video w-full bg-black object-cover"
    />
    <DetailBody>
      <DetailHeader
        eyebrow="The Next Motion × Hogeschool Rotterdam · Eventvideo · Juni 2026"
        title="Accountancy 2026 — het event"
      />
      <DetailSummary
        meta={[
          ["Mijn rol", "Alles zelf geschoten en gemonteerd: camera, interviews, montage & color grading"],
          ["Output", "Longform 16:9 (2:20) · shortform 9:16 (0:23) · eventfoto's"],
          ["Doelgroepen", "Toekomstige studenten · volgers op social media"],
        ]}
      >
        <p>
          Voor de Associate Degree Accountancy van Hogeschool Rotterdam legde ik met The Next Motion het event voor
          eerste- en tweedejaars studenten vast, in het stadion van Excelsior Rotterdam: keynotes langs het veld,
          workshops van specialisten, netwerken en interviews met studenten en docenten.
        </p>
        <p>Uit hetzelfde draaidagmateriaal maakte ik twee eindversies, elk met een eigen doel, doelgroep en kanaal.</p>
      </DetailSummary>

      {/* Twee eindversies naast elkaar */}
      <div className="mt-12 grid gap-10 border-t border-cream/10 pt-10 md:grid-cols-5 md:items-start">
        <div className="space-y-8 md:col-span-3">
          <div>
            <p className="text-[11px] uppercase tracking-reel text-cream/50">Eindversie 1 · 16:9 · 2:20</p>
            <h3 className="mt-3 font-impact text-3xl uppercase leading-none text-cream sm:text-4xl">Longform — voor studenten van volgend jaar</h3>
            <p className="mt-3 leading-relaxed text-cream-dim">
              De aftermovie bovenaan dit venster. Met interviews laten studenten en docenten zelf vertellen wat het
              event oplevert, zodat aankomende studenten precies zien wat hen te wachten staat. Rustiger tempo, ruimte
              voor verhaal.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-reel text-cream/50">Eindversie 2 · 9:16 · 0:23</p>
            <h3 className="mt-3 font-impact text-3xl uppercase leading-none text-cream sm:text-4xl">Shortform — voor social media</h3>
            <p className="mt-3 leading-relaxed text-cream-dim">
              Een verticale edit met tekst-overlays, snelle cuts en een koele blauwe grade die aansluit op de huisstijl
              van Hogeschool Rotterdam. Gemaakt om in de eerste seconden de aandacht te pakken in de feed.
            </p>
          </div>
        </div>
        <figure className="md:col-span-2">
          {/* 🎬 VIDEO: shortform eindversie (9:16) */}
          <DetailVideo
            src="/rac/it/smp2026/storage/mark/website/assets/videos/rac-shortform.mp4"
            poster="/rac/it/smp2026/storage/mark/website/assets/images/rac-shortform-poster.jpg"
            className="mx-auto aspect-[9/16] w-full max-w-[300px] bg-black object-cover"
          />
          <figcaption className="mt-4 text-center text-[11px] uppercase tracking-reel text-cream/45">
            Shortform · Instagram &amp; TikTok
          </figcaption>
        </figure>
      </div>

      <p className="mt-16 text-[11px] uppercase tracking-reel text-cream/45">Eventfoto&apos;s</p>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3">
        {racPhotos.map(([file, alt]) => (
          <img
            key={file}
            src={`/assets/images/${file}`}
            alt={alt}
            loading="lazy"
            className="mb-3 w-full break-inside-avoid"
          />
        ))}
      </div>
      <a
        href="https://www.instagram.com/the_next_motion/"
        target="_blank"
        rel="noopener noreferrer"
        className={externalLinkClass}
      >
        Meer van The Next Motion <span className="sr-only">(opent in nieuw tabblad)</span>
      </a>
    </DetailBody>
  </>
);

// ── Swapfiets ──
const swapfiets = (
  <>
    <div className="grid bg-black sm:grid-cols-2">
      <DetailVideo
        src="/rac/it/smp2026/storage/mark/website/assets/videos/swapfiets-prototype-1.mp4"
        poster="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-prototype-1-poster.jpg"
        className="mx-auto max-h-[70vh] w-full object-contain"
      />
      <DetailVideo
        src="/rac/it/smp2026/storage/mark/website/assets/videos/swapfiets-prototype-2.mp4"
        poster="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-prototype-2-poster.jpg"
        className="mx-auto max-h-[70vh] w-full object-contain"
      />
    </div>
    <DetailBody>
      <DetailHeader
        eyebrow="Public Space-campagne · Periode 2 (herkansing) · 2026"
        title="Swapfiets — Jouw schema. Niet dat van de RET."
      />
      <DetailSummary
        meta={[
          ["Mijn rol", "Onderzoek, persona, concept, poster- en motion design"],
          ["Kanalen", "Abri's · digitale schermen · QR-activatie"],
        ]}
      >
        <p>
          Een campagne in de openbare ruimte voor Rotterdamse studenten en starters die afhankelijk zijn van het OV.
          Het inzicht: niemand wil zijn dag laten bepalen door een vertraagde metro.
        </p>
        <p>
          Op basis van onderzoek en persona Noa ontwierp ik posters met een directe QR-actie (&quot;Scan &amp;
          ontsnap&quot;) en werkte ik ze uit tot geanimeerde prototypes voor digitale reclameschermen.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <img src="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-noa.jpg" alt="Persona Noa met haar nieuwe e-bike" loading="lazy" className="w-full" />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-poster-blauw.jpg"
          alt="Blauwe poster Jouw schema, niet dat van de RET"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-poster-groen.jpg"
          alt="Groene poster Jouw schema, niet dat van de RET"
          loading="lazy"
          className="w-full"
        />
        <img src="/rac/it/smp2026/storage/mark/website/assets/images/swapfiets-scan.jpg" alt="Poster Scan en ontsnap met QR-code" loading="lazy" className="w-full" />
      </div>
    </DetailBody>
  </>
);

// ── Katendrecht ──
const katendrechtPhotos: [src: string, alt: string][] = [
  ["katendrecht-posters.jpg", "Twee AI-posters over de verborgen lagen van Katendrecht"],
  ["katendrecht-poster.jpg", "Poster De Ouwe Hoer en de Nieuwe Generatie"],
  ["katendrecht-360-scenes.jpg", "Overzicht van 360-gradenscènes in de tour-editor"],
  ["katendrecht-nacht.jpg", "Sfeerbeeld van Katendrecht bij nacht"],
  ["katendrecht-anker.jpg", "Neon anker in een tattoostudio"],
];

const katendrecht = (
  <>
    <img
      src="/rac/it/smp2026/storage/mark/website/assets/images/katendrecht-banner.jpg"
      alt="Nachtelijk plein op Katendrecht met lichtroute naar een AR-marker"
      className="aspect-video w-full object-cover"
    />
    <DetailBody>
      <DetailHeader eyebrow="Praktijkopdracht · Periode 4 · 2026" title="Katendrecht · Verborgen Lagen" />
      <DetailSummary
        meta={[
          ["Wat ik deed", "360°-opnames op locatie · AI-posters & sfeerbeelden · voice-overs · 3D-objecten · landingspagina"],
          ["Tools", "360°-camera · Gemini · ElevenLabs · 3D-generatie · HTML/CSS/JS"],
        ]}
      >
        <p>
          Katendrecht was ooit de wijk van zeelieden, migranten en havenarbeiders. Voor dit project ontwikkelde ik het
          concept voor een AR- en 360°-tour die die geschiedenis weer zichtbaar maakt: niet als museum, maar als
          beleving op straat.
        </p>
        <p>
          De tour is opgebouwd uit vijf lagen: de havens, de zeelieden, de migranten, de oorlogsjaren en &quot;Nu &amp;
          Toen&quot;. Bezoekers starten via een mobiele landingspagina, scannen een marker en zien het verleden in hun
          eigen straat.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 columns-1 gap-3 sm:columns-2">
        {katendrechtPhotos.map(([file, alt]) => (
          <img
            key={file}
            src={`/assets/images/${file}`}
            alt={alt}
            loading="lazy"
            className="mb-3 w-full break-inside-avoid"
          />
        ))}
      </div>
      {/* ✏️ LINK: controleer of deze pagina nog online staat */}
      <a
        href="https://project.hosted.hr.nl/rac/it/smp2026/storage/mark/katendrecht-landing%20(1).html"
        target="_blank"
        rel="noopener noreferrer"
        className={externalLinkClass}
      >
        Bekijk de landingspagina <span className="sr-only">(opent in nieuw tabblad)</span>
      </a>
    </DetailBody>
  </>
);

// ── Kruidvat / Boomlabs ──
const kruidvat = (
  <>
    <img
      src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-opvallende-data.jpg"
      alt="Presentatieslide Opvallende data met conversion funnel en A/B-test"
      className="aspect-video w-full object-cover"
    />
    <DetailBody>
      <DetailHeader
        eyebrow="Team Boomlabs · Kruidvat-case · Periode 3 · 2026"
        title="Baby Bubbel — data-driven personalisatie"
      />
      <DetailSummary
        meta={[
          ["Mijn rol", "Product Owner: backlog, planning, teamfeedback en pitch"],
          ["Methodes", "Klantsegmentatie · overtuigingsprincipes · A/B-testing · funnelanalyse"],
          ["Tools", "Google Sheets · Gemini · no-code automatisering · Figma"],
        ]}
      >
        <p>
          Hoe krijg je jonge ouders zover dat ze meer met Kruidvat delen, zonder dat het opdringerig voelt? Als Product
          Owner van team Boomlabs werkte ik aan Baby Bubbel: een app-concept met babymeter en checklist dat per
          zwangerschapsweek relevante tips en aanbiedingen geeft.
        </p>
        <p>
          We analyseerden de dataset, segmenteerden klanten en bouwden een automatisering waarin Google Sheets en Gemini
          samen gepersonaliseerde berichten schrijven. Met een A/B-test en een conversion funnel onderbouwden we welke
          knop en welke stap het verschil maken.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-automation.jpg"
          alt="Automatiseringsflow van Google Sheets via Gemini"
          loading="lazy"
          className="w-full sm:col-span-2"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-pitch.jpg"
          alt="Pitch van team Boomlabs voor een groot scherm"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-funnel.jpg"
          alt="Conversion funnel van checklist tot delen"
          loading="lazy"
          className="w-full"
        />
        <div className="grid grid-cols-2 gap-3 bg-cream/[0.03] p-6 sm:col-span-2">
          <img
            src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-app-welkom.jpg"
            alt="App-scherm Welkom bij Baby Bubbel"
            loading="lazy"
            className="mx-auto w-full max-w-[220px]"
          />
          <img
            src="/rac/it/smp2026/storage/mark/website/assets/images/kruidvat-app-menu.jpg"
            alt="App-menu met checklist en babymeter"
            loading="lazy"
            className="mx-auto w-full max-w-[220px]"
          />
        </div>
      </div>
    </DetailBody>
  </>
);

// ── Rotspot ──
const rotspot = (
  <>
    <DetailVideo
      src="/rac/it/smp2026/storage/mark/website/assets/videos/rotspot.mp4"
      poster="/rac/it/smp2026/storage/mark/website/assets/images/rotspot-poster.jpg"
      className="aspect-video w-full bg-black object-cover"
    />
    <DetailBody>
      <DetailHeader eyebrow="Rotterdam Academy × Gemeente Rotterdam · Periode 2 · 2025" title="Rotspot — Vind jouw spot" />
      <DetailSummary
        meta={[
          ["Doelgroep", "Studenten (mbo, hbo, wo) & young professionals"],
          ["Mijn rol", "Concept, mediaplanning, opname, montage (After Effects), AI-visuals"],
          ["Doel", "Zichtbaarheid en activatie via QR"],
        ]}
      >
        <p>
          Rotspot.nl helpt Rotterdamse studenten de beste studieplekken, koffietentjes en hangouts te vinden. Voor de
          campagne schoot en monteerde ik een video van tien seconden voor de narrowcasting-schermen van Hogeschool
          Rotterdam. Daarnaast ontwikkelden we guerrilla-posters op deuren en AI-videoconcepten.
        </p>
        <p>
          De mediaplanning richtte zich op het moment dat studenten onderweg zijn: metrostations, stations en de campus,
          in de ochtend en rond de middag.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO / 🎬 VIDEO: galerij */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/rotspot-deur-qr.jpg"
          alt="Deurposter Rotspot met QR-code en de tekst Vind jouw spot"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/rotspot-deur-jij-studeert.jpg"
          alt="Deurposter Jij studeert hier"
          loading="lazy"
          className="w-full"
        />
        <DetailVideo
          src="/rac/it/smp2026/storage/mark/website/assets/videos/ai-rotspot.mp4"
          poster="/rac/it/smp2026/storage/mark/website/assets/images/ai-rotspot-poster.jpg"
          className="w-full bg-black"
        />
        <DetailVideo
          src="/rac/it/smp2026/storage/mark/website/assets/videos/ai-chaos-naar-rust.mp4"
          poster="/rac/it/smp2026/storage/mark/website/assets/images/ai-chaos-naar-rust-poster.jpg"
          className="w-full bg-black"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/rotspot-deuren.jpg"
          alt="Drie deuren met vragen: waar eten, studieplek, chillplek"
          loading="lazy"
          className="w-full sm:col-span-2"
        />
      </div>
    </DetailBody>
  </>
);

// ── Genre-trailers ──
const trailerVersions = [
  {
    title: "Actie",
    text: "Snel ritme, spanning en impact.",
    src: "/rac/it/smp2026/storage/mark/website/assets/videos/trailer-action.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/trailer-action-poster.jpg",
  },
  {
    title: "Klassiek",
    text: "Rustige opbouw en een helder verhaal.",
    src: "/rac/it/smp2026/storage/mark/website/assets/videos/trailer-klassiek.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/trailer-klassiek-poster.jpg",
  },
  {
    title: "Romantisch",
    text: "Warme tinten en emotie centraal.",
    src: "/rac/it/smp2026/storage/mark/website/assets/videos/trailer-romantisch.mp4",
    poster: "/rac/it/smp2026/storage/mark/website/assets/images/trailer-romantisch-poster.jpg",
  },
];

const trailers = (
  <DetailBody className="px-6 pb-14 pt-20 sm:px-12 lg:px-16">
    <DetailHeader eyebrow="Individuele opdracht · Periode 3 · 2026" title="Eén aflevering, drie genres" />
    <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-cream-dim">
      <p>
        De opdracht: knip uit één aflevering van &quot;Boer zoekt Vrouw&quot; drie trailers van tien seconden, elk voor
        een ander type kijker. Hetzelfde materiaal werd een actietrailer, een klassieke trailer en een romantische
        trailer, puur door ritme, muziek, shotkeuze en kleur.
      </p>
    </div>
    {/* 🎬 VIDEO: drie trailers */}
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {trailerVersions.map((version) => (
        <figure key={version.title}>
          <DetailVideo src={version.src} poster={version.poster} className="aspect-video w-full bg-black" />
          <figcaption className="mt-3 font-impact text-3xl uppercase leading-none text-cream">
            {version.title} <span className="block text-sm text-cream/45">{version.text}</span>
          </figcaption>
        </figure>
      ))}
    </div>
    <p className="mt-8 text-xs text-cream/40">Bronmateriaal: KRO-NCRV, gebruikt voor een schoolopdracht.</p>
  </DetailBody>
);

// ── Marjani ──
const marjani = (
  <>
    <DetailVideo
      src="/rac/it/smp2026/storage/mark/website/assets/videos/marjani-vending-hero.mp4"
      poster="/rac/it/smp2026/storage/mark/website/assets/images/marjani-vending-hero-poster.jpg"
      className="aspect-video w-full bg-black object-cover"
    />
    <DetailBody>
      <DetailHeader eyebrow="Marjani Global Services · Webdesign & AI-visuals · 2026" title="Twee websites voor Marjani" />
      <DetailSummary
        meta={[
          ["Wat ik deed", "Huisstijl naar web · copywriting & CTA's · AI-productvisuals · AI-herovideo · responsive one-pagers"],
          ["Tools", "ChatGPT · Seedance · Wan · HTML/CSS/JS"],
        ]}
      >
        <p>
          <strong className="text-cream">Marjani Vending</strong> plaatst snack- en frisdrankautomaten bij
          bedrijven, zonder investering en met volledige service. De site moest vooral betrouwbaarheid en gemak
          uitstralen: &quot;Vending zonder zorgen, op uw locatie.&quot;
        </p>
        <p>
          <strong className="text-cream">Marjani In Su</strong> verhuurt twee studio&apos;s. Hier draaide
          alles om één belofte: binnen 30 seconden weten wat het kost, waar het is en hoe je boekt.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/marjani-vending-site2.jpg"
          alt="Homepage Marjani Vending: Vending zonder zorgen op uw locatie"
          loading="lazy"
          className="w-full sm:col-span-2"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/marjani-vending-banner.jpg"
          alt="AI-brand visual van een Marjani-automaat in een kantoor"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/marjani-vending-hero.jpg"
          alt="AI-herobeeld van een verlichte vendingautomaat"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/marjani-insu-hero.jpg"
          alt="Lichte studio met groene fauteuil voor Marjani In Su"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/marjani-insu-logo.jpg"
          alt="Logo Marjani In Su Apartment Rentals"
          loading="lazy"
          className="w-full bg-cream object-contain p-6 sm:aspect-[1600/872]"
        />
      </div>
    </DetailBody>
  </>
);

// ── The Compass Collective ──
const compass = (
  <>
    <img
      src="/rac/it/smp2026/storage/mark/website/assets/images/compass-moodboard.jpg"
      alt="Moodboard Urban voor The Compass Collective"
      className="aspect-video w-full object-cover"
    />
    <DetailBody>
      <DetailHeader eyebrow="Enhanced Content · Periode 1 · 2025" title="The Compass Collective" />
      <DetailSummary
        meta={[
          ["Wat ik deed", "Persona's · merkidentiteit · moodboards · AI-beeld & -video"],
          ["Tools", "ChatGPT · Wan 2.5 · Figma"],
        ]}
      >
        <p>
          Een fictief outdoor- en streetwearmerk als speeltuin voor generatieve AI. Vanuit persona&apos;s, zoals
          outdoor-liefhebber Lena, maakte ik moodboards, productvisuals en korte AI-video&apos;s.
        </p>
        <p>
          Ik schreef en verfijnde prompts voor onder meer een sneaker-commercial en actiescènes, en leerde hoe je met
          negatieve prompts en scène-opbouw consistente resultaten krijgt.
        </p>
      </DetailSummary>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/compass-logo.jpg"
          alt="Logo The Compass Collective"
          loading="lazy"
          className="aspect-square w-full bg-[#f3efe4] object-contain p-4"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/compass-sneaker.jpg"
          alt="AI-still van een sneaker in de stad"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/ai-fire-punch.jpg"
          alt="AI-actiescène met een vuurstoot"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/compass-movie.jpg"
          alt="Overzicht van AI-video's The Compass Movie"
          loading="lazy"
          className="aspect-square w-full object-cover object-top"
        />
      </div>
    </DetailBody>
  </>
);

// ── Advertentieconcepten ──
const adConcepts = [
  {
    src: "/rac/it/smp2026/storage/mark/website/assets/images/corendon-abri.jpg",
    alt: "Abri-advertentie De beste deal, loop naar",
    title: 'Corendon — "De beste deal, loop naar"',
    text: "Een dynamische abri-advertentie voor last-minute reizen die inspeelt op het weer: grijs in Rotterdam, zon op de bestemming.",
  },
  {
    src: "/rac/it/smp2026/storage/mark/website/assets/images/vr-cinema.jpg",
    alt: "Bioscoopzaal met bezoekers met VR-brillen",
    title: 'Lantarenvenster — "Step into the movie"',
    text: "Campagnebeelden voor een VR-bioscoopbeleving, volledig gevisualiseerd met AI.",
  },
  {
    src: "/rac/it/smp2026/storage/mark/website/assets/images/musk-shop.jpg",
    alt: "Advertentie Ruik, raad en win van Musk Shop",
    title: 'Musk Shop — "Ruik, raad & win"',
    text: "Een winactie voor een parfumerie die nieuwsgierigheid en interactie centraal zet.",
  },
];

const ads = (
  <>
    <img src="/rac/it/smp2026/storage/mark/website/assets/images/vr-step-into.jpg" alt="Neon tekst Step into the movie" className="aspect-video w-full object-cover" />
    <DetailBody>
      <DetailHeader eyebrow="Advertentieconcepten · Periode 2 · 2025 — 2026" title="Drie advertenties, drie strategieën" />
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {adConcepts.map((ad) => (
          <article key={ad.title}>
            <img src={ad.src} alt={ad.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <h3 className="mt-4 font-impact text-3xl uppercase leading-none text-cream">{ad.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-cream-dim">{ad.text}</p>
          </article>
        ))}
      </div>
    </DetailBody>
  </>
);

// ── Social content ──
const social = (
  <>
    <img
      src="/rac/it/smp2026/storage/mark/website/assets/images/profielen-posters.jpg"
      alt="Twee posters voor studentmedium Profielen en de AI-strip Productowner Lore"
      className="aspect-video w-full object-cover"
    />
    <DetailBody>
      <DetailHeader eyebrow="Social content · Periode 1 · 2025" title="Studentcontent voor Smart Media Production" />
      <div className="mt-6 max-w-3xl space-y-4 leading-relaxed text-cream-dim">
        <p>
          Korte content die studenten daadwerkelijk bekijken. Voor studentmedium Profielen maakte ik twee posters over
          koffie op school, met een eigen beeldtaal en een duidelijke vraag als kop. Daarnaast maakte ik een
          onboardingvideo over de eerste weken van de opleiding en een AI-strip over de rol van Product Owner.
        </p>
      </div>
      {/* 🖼️ FOTO: galerij */}
      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/profielen-koffie.jpg"
          alt="Poster met de vraag waar je op school een goede kop koffie haalt"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/profielen-koffie2.jpg"
          alt="Poster voor Profielen met polaroids van Coffeecompany-bekers"
          loading="lazy"
          className="w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/productowner-lore.jpg"
          alt="Stripverhaal Productowner Lore"
          loading="lazy"
          className="col-span-2 w-full"
        />
        <img
          src="/rac/it/smp2026/storage/mark/website/assets/images/smp-jungle-apen.jpg"
          alt="AI-still uit de onboardingvideo over de eerste weken van de opleiding"
          loading="lazy"
          className="col-span-2 w-full lg:col-span-4"
        />
      </div>
    </DetailBody>
  </>
);

export const projectDetails: Record<ProjectId, ReactNode> = {
  tnm,
  swapfiets,
  katendrecht,
  kruidvat,
  rotspot,
  trailers,
  marjani,
  compass,
  ads,
  social,
};
