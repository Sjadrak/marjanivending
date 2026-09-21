# Mark van Dijk — Stage Portfolio

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion · clsx + tailwind-merge

Thema: **Paranormal / Horror Movie End Credits**. Het volledige design system (kleuren, typografie, motion, regels) staat in [`STYLEGUIDE.md`](STYLEGUIDE.md).

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productiebuild + typecheck
npm start          # productiebuild draaien
```

> Draai `npm run build` niet terwijl `npm run dev` loopt: beide schrijven naar `.next` en de dev-server raakt dan in de war. Stop eerst de dev-server.
>
> Pas je `tailwind.config.ts` aan terwijl de dev-server draait en zie je geen verschil? Herstart dan de dev-server.

## Waar pas je wat aan?

| Wat | Bestand |
| --- | --- |
| Volgorde van de pagina | `app/page.tsx` |
| Hero (titel, zoeker, showreel, zoom bij scrollen) | `components/sections/Hero.tsx` |
| Projectkaarten op de filmrol (volgorde, rol, vorm) | `lib/projects.ts` |
| Inhoud van het projectvenster | `components/ProjectDetails.tsx` |
| The Evidence (groei-video's) | `lib/growth.ts` |
| Visions (AI-galerij) | `lib/ai-lab.ts` |
| Dossiergegevens, chronologie, certificaten, zelfreflectie (rollen mee in de aftiteling) | `lib/content.ts` |
| End Credits: openingsregels, skills, werkervaring, talen | `lib/credits.ts` |
| Tekst 'Over de maker' in de aftiteling | `components/sections/CreditsRoll.tsx` |
| Contact op het slotscherm | `lib/queries.ts` → `getContactChannels()` |
| Portret en rugfoto | `components/DossierCard.tsx` |
| Titel en beschrijving voor Google | `app/layout.tsx` |
| Kleuren, fonts en spatiëring | `tailwind.config.ts` |
| Animaties (grain, flicker, slow fade, openbaring) | `app/globals.css` |
| Gedeelde opmaak (titels, links, knoppen) | `lib/ui.ts` |

Foto's, video's en je cv staan in `public/assets/` en worden gebruikt als `/assets/...`.
In de code staan markers als ✏️ TEKST, 🖼️ JOUW FOTO HIER en 🎬 JOUW VIDEO HIER.

## Je cv aanpassen

Beide cv-PDF's komen uit dezelfde bron: `cv/cv-mark-van-dijk.html`. Pas daar de tekst aan en maak daarna **beide** PDF's opnieuw:

1. **Donkere versie** (`cv-mark-van-dijk.pdf`, wat de site aanbiedt als "Cv (pdf)") — `<body>` staat op `data-theme="dark"`:
   ```
   msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="public\assets\cv\cv-mark-van-dijk.pdf" "cv\cv-mark-van-dijk.html"
   ```
2. Zet in `cv-mark-van-dijk.html` de `<body>` om naar `data-theme="print"`.
3. **Lichte/printbare versie** (`cv-mark-van-dijk-print.pdf`, "Cv om te printen" op de site) — leest beter uit de printer en door sollicitatiesystemen (ATS):
   ```
   msedge --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="public\assets\cv\cv-mark-van-dijk-print.pdf" "cv\cv-mark-van-dijk.html"
   ```
4. Zet de `<body>` in `cv-mark-van-dijk.html` weer terug naar `data-theme="dark"` — dat is de stand die je bewaart.

De opmaak is afgestemd op één A4. Voeg je veel tekst toe, controleer dan of het nog op één pagina past (in beide thema's).

## Een project direct delen

Gebruik een link als `/#project-rotspot`. Namen: `tnm`, `swapfiets`, `katendrecht`, `kruidvat`, `rotspot`, `trailers`, `marjani`, `compass`, `ads`, `social`.

## Online zetten

Deze map kan direct naar Vercel. Zet daar de omgevingsvariabele `NEXT_PUBLIC_SITE_URL` op je eigen domein, zodat de deelpreview (Open Graph) de juiste URL krijgt.
