# Marjani Global Services — Website

Next.js (App Router) + TypeScript + Tailwind CSS website voor **Marjani
Global Services**, met twee onepagers:

- **`/vending`** — Marjani Vending: snack- en drankautomaten voor bedrijven.
- **`/apartments`** — Marjani Apartments: verhuur van appartementen, met een
  beschikbaarheidskalender en boekingsaanvraag.

Bezoekers landen eerst op **`/`**, een korte keuzepagina ("prescreen") die
doorverwijst naar één van de twee onepagers.

## Vereisten

- [Node.js](https://nodejs.org) 18.18 of hoger (20 LTS aanbevolen) + npm.
  Node stond niet geïnstalleerd op de machine waarop dit project is
  gebouwd, dus installeer dit eerst voordat je verder gaat.

## Aan de slag

```bash
npm install
cp .env.local.example .env.local   # of handmatig kopiëren op Windows
```

Vul in `.env.local` minimaal in:

- `RESEND_API_KEY` — API key van [resend.com](https://resend.com) (gratis
  tier is ruim voldoende voor een contactformulier).
- `CONTACT_TO_EMAIL` — het e-mailadres waar aanvragen naartoe moeten.
- `NEXT_PUBLIC_PHONE_NUMBER` / `NEXT_PUBLIC_WHATSAPP_NUMBER` — jullie echte
  telefoon- en WhatsApp-nummer.

Start de development server:

```bash
npm run dev
```

Open http://localhost:3000.

Voor productie:

```bash
npm run build
npm run start
```

Het project draait probleemloos op Vercel (voeg dezelfde environment
variables toe in het Vercel-dashboard) of elke andere Node-hosting.

## Structuur

```
app/
  page.tsx              → prescreen / keuzepagina
  vending/page.tsx       → onepager Marjani Vending
  apartments/page.tsx    → onepager Marjani Apartments
  api/contact/route.ts   → verstuurt formulieren via Resend
components/
  Logo.tsx               → SVG-recreatie van het badge-logo
  Header.tsx / Footer.tsx
  ContactForm.tsx         → offerte-formulier (vending)
  BookingWidget.tsx       → kalender + boekingsaanvraag (apartments)
  FloatingContactButtons.tsx → zwevende bel- & WhatsApp-knoppen
lib/
  constants.ts            → telefoon/WhatsApp/e-mail op één plek
  availability.ts          → voorbeeld-bezette data voor de kalender
docs/
  Venhuistijl.md, project-brief.md → oorspronkelijke briefing
```

Er is bewust **geen database**: de "boekingsagenda" op de Apartments-pagina
toont een handmatig bij te werken lijst met bezette periodes
(`lib/availability.ts`), en bezoekers laten hun gewenste periode achter via
een e-mailaanvraag die jullie zelf bevestigen.

## Contactgegevens & logo aanpassen

- **Telefoon / WhatsApp / e-mail**: pas eenmalig `lib/constants.ts` aan (en
  de bijbehorende regels in `.env.local`).
- **Agenda bijwerken**: voeg of verwijder datums in
  `lib/availability.ts` (`BOOKED_RANGES`).
- **Logo**: `components/Logo.tsx` is een handgemaakte SVG-recreatie van het
  aangeleverde badge-logo (rood/geel/groen, gebaseerd op `docs/Venhuistijl.md`)
  zodat hij overal scherp en aanpasbaar is. Heb je het originele logobestand
  (PNG/SVG) beschikbaar? Zet het dan in `public/images/logo.png` en vervang
  in `components/Logo.tsx` de SVG-inhoud door een simpele
  `<img src="/images/logo.png" .../>` als je liever het echte bestand
  gebruikt.
- **Foto's**: er zijn nog geen echte foto's van de automaten of
  appartementen verwerkt (die waren niet als bestand beschikbaar tijdens de
  bouw, alleen als afbeelding in de chat). Zet foto's in `public/images/`
  (bijv. `vending-hero.jpg`, `apartment-1.jpg`, ...) en vervang de
  gekleurde placeholder-vlakken in `app/vending/page.tsx` en
  `app/apartments/page.tsx` door `<Image src="/images/..." ... />`
  (`next/image`, al beschikbaar via Next.js).

## E-mail (Resend)

Het contactformulier (`/api/contact`) gebruikt [Resend](https://resend.com)
om e-mails te versturen — er is geen database nodig. Zonder geldige
`RESEND_API_KEY` toont het formulier een nette foutmelding en blijft de
WhatsApp-/belknop als alternatief beschikbaar.

Voor productie: verifieer een eigen domein in Resend en zet
`CONTACT_FROM_EMAIL` op bijvoorbeeld
`"Marjani Website <noreply@marjanivending.nl>"`. Tijdens het testen werkt
de standaardwaarde `onboarding@resend.dev` ook.

## Huisstijl

Kleuren en fonts staan centraal in `tailwind.config.ts`
(`marjani-red`, `vending-yellow`, `service-green`, `off-white`) en
`app/layout.tsx` (Montserrat + Open Sans via `next/font`), gebaseerd op
`docs/Venhuistijl.md`.
