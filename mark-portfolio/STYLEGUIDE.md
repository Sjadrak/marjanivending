# Mark van Dijk — Style Guide

**Thema:** Paranormal / End Credits — *The Nightshade Depths* (v2.0)
**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 3 · Framer Motion 11 · clsx + tailwind-merge

---

## 1. Brand vision & concept

### Waarom de aftiteling?

De aftiteling is het enige moment in een film waarop niemand meer iets verkoopt. Het verhaal is voorbij, de spanning hangt nog in de zaal, en op het scherm staat alleen nog wie het gemaakt heeft. Wie blijft zitten, wil weten wie verantwoordelijk is voor wat hij net voelde.

Dat is precies de positie die een videograaf en marketeer wil innemen. Dit portfolio begint daarom niet met een pitch, maar met **stilte en duisternis**. Het werk krijgt pas kleur als je het aanraakt. De skills staan er niet als opsomming, maar als **credits**: rol links, naam rechts, rustig en zeker van zichzelf.

De horror-esthetiek is geen gimmick. Het is een bewijs van vakmanschap:

- **Spanning opbouwen** is marketing. Een titel die hapert, laat je kijken.
- **Onthulling** is storytelling. Beeld dat uit het zwart opdoemt, onthoud je.
- **Terughoudendheid** is smaak. Eén flikkerende tl-buis is enger dan tien jumpscares.

> Het doel: een stagebedrijf sluit het tabblad en denkt nog aan de laatste scène.

### Kernwaarden

| Waarde | In het ontwerp |
|---|---|
| **Onheilspellend** | Veel zwart, weinig kleur, niets gebeurt snel |
| **Cinematisch** | Filmrollen (reels), timecode, aftiteling, slotscherm |
| **Mysterieus** | Beeld verborgen tot interactie, cryptische teksten |
| **Eerlijk** | Credits kloppen: wat niet door Mark gemonteerd is, staat erbij |

---

## 2. Design system

### 2.1 Kleuren — The Nightshade Depths

Vier kleuren, strikt gerantsoeneerd. **Geen wit** — cream draagt het licht, koper draagt de spanning.

| Token (Tailwind) | Hex | Aandeel | Gebruik |
|---|---|---|---|
| `void` | `#20002A` | 60–70% | **Nightshade Void.** De dominante achtergrond, overal. Een paars zo diep dat het bijna zwart oogt tot het licht erop valt — dat kleine verschil maakt het eigen in plaats van generiek zwart. |
| `abyss` | `#0B1D2E` | 15% | **Abyssal Blue.** De kleur van het diepste deel van de zee. Sectiepanelen, videovlakken, het venster en radiale gloed achter beeld. |
| `cream` | `#F0E6D2` | 20% | **Bone Cream.** Titels en primaire tekst. Het licht van een kaars, niet van een scherm. |
| `ember` | `#B5723A` | 3–5% | **Ember Copper.** De enige warme, verzadigde kleur. Strikt voor interactie: hover, links en eyebrow-labels. |

Elke kleur heeft een vaste zachtere variant: `cream-dim` (55%), `abyss-soft` (50%), `ember-dim` (35%) en de haarlijn `cream/12`.

**Regels**

1. **Cream krijgt diepte via opacity, niet via extra kleuren.** Vaste trappen:
   - `cream` voor titels en namen
   - `cream-dim` (55%) voor lopende tekst
   - `cream/45` voor rollen en metadata
   - `cream/12` voor lijnen (de haarlijn)
2. **Abyss en Nightshade nooit door elkaar op hetzelfde vlak.** Abyss is een paneel of een gloed, geen tint van de achtergrond.
3. **Ember verschijnt pas als de bezoeker iets doet** — plus de eyebrow-labels. Schaarste is wat het speciaal houdt.
4. **Geen andere kleuren.** Ook geen rood voor "horror": de spanning komt uit licht en tijd, niet uit bloed.
5. **Beeld is de enige echte kleur**, en die krijg je pas te zien bij interactie (zie Motion → De openbaring).

### 2.2 Typografie

| Rol | Font | Tailwind | Bron |
|---|---|---|---|
| Jumpscares, brute titels, namen | **Anton** (de Impact-vertaling) | `font-impact` | Google Fonts via `next/font/google` |
| Aftiteling, dossiers, lopende tekst | **Hahmlet** | `font-hahmlet` | Google Fonts via `next/font/google` |

**Waarom deze combinatie werkt:**

- **Anton** levert de jumpscare: groot, hard, onontkoombaar. De letter van filmposters en breaking news.
- **Hahmlet** fluistert in plaats van schreeuwt: een elegante schreefletter, als een getypt dossier of de kleine lettertjes onder een filmposter.

Het contrast tussen schreeuw en fluistering *is* de spanning.

**Over Impact:** "Impact" staat niet in Google Fonts. **Anton** is de vertaling ervan: bijna dezelfde verhoudingen, open source (OFL), en overal identiek — dus geen verschil meer tussen Windows, Mac en Android. De stack `font-impact` valt daarna nog terug op Impact zelf.

**Schaal**

| Element | Waarden |
|---|---|
| Hero-titel | Anton · `clamp(4rem, 15vw, 19rem)` · line-height 0.8 |
| Sectietitel | Anton · `clamp(2.3rem, 9vw, 8rem)` · line-height 0.95 |
| Kaarttitel | Anton · 32–44px · line-height 0.92 |
| Lopende tekst | Hahmlet · 17px · **weight 300** · line-height 1.75 |
| Credit-naam | Hahmlet · 16–18px · `cream/90` |
| Eyebrow-label | Hahmlet · 13px · weight 500 · `tracking-eyebrow` (0.14em) · **ember** |
| Metadata | Hahmlet · 11–13px · `tracking-meta` (0.08em) of `tracking-reel` (0.12em) · **nooit ember** |

**Regels**

1. Anton altijd in **hoofdletters**, nooit in lopende tekst en nooit kleiner dan `text-2xl`.
2. Letterspatiëring is gerantsoeneerd: `tracking-eyebrow` (0.14em) voor eyebrows, `tracking-reel` (0.12em) voor knoppen en credits, `tracking-meta` (0.08em) voor de kleinste regels.
3. **Nooit nep-vet:** Anton heeft één gewicht (`font-synthesis: none` staat in `globals.css`).
4. Lange Anton-woorden moeten op 390 px passen. Gebruik daarom altijd de `clamp()` uit `lib/ui.ts`.

### 2.3 Motion

**Elk animatie-effect heeft een functie. Niets beweegt omdat het kan.**

| Effect | Klasse | Duur | Waar |
|---|---|---|---|
| Film grain | `.film-grain` | **statisch** | Eén keer, globaal in `layout.tsx` |
| Vignet | `.vignette` | statisch | Globaal in `layout.tsx` |
| Scanlines | `.scanlines` | statisch | Alleen het hero-beeld |
| Flicker | `.flicker-in` | 2,4 s, **één keer bij load** | **Alleen** de hero-titel |
| Blackout | `.blackout` | 2,6 s | Zwart doek over de hero bij het laden |
| Slow fade | `.reveal` → `.is-visible` | **1,4 s** + optionele `delay` | Per sectieblok via `<Reveal>` |
| Emerge | `.emerge` | 1,6 s | Hero-tekst en slotscherm, met `[animation-delay:…]` |
| De openbaring | `.haunted-media` | 1,4 s | Elke thumbnail, preview en portret |

#### Film grain

- Een SVG-ruisvlak over de hele pagina, `mix-blend-mode: overlay`. Simuleert 16mm-filmkorrel.
- **Opacity 0,05** (regel: 5–8%). **De grain animeert niet** — hoger dan 10% of laten flikkeren is fout.
- Altijd `pointer-events: none` en `position: fixed`. Er is er maar één op de hele site.

#### Flicker

- **Eén moment per pagina:** de hero-titel bij het laden. Verder nergens.
- Alleen `opacity` — **geen positie-shift, geen RGB-split**. Onregelmatige stappen (0 → 0,9 → 0,1 → 1 → 0,3 → 1).
- **Nooit op knoppen of kaarten.**
- **Veilig bij lichtgevoeligheid:** nooit het hele scherm en ruim onder 3 flitsen per seconde (WCAG 2.3.1).

#### Slow fades (scroll)

- Content onthult zich traag: `opacity 0 → 1` met `translateY(18px)`, over **1,4 s**, easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Trigger per sectieblok, niet per los kaartje.** `<Reveal delay=".3s">` voor een lichte trapsgewijze opbouw.
- Zonder JavaScript is alles direct zichtbaar (de klasse `js` op `<html>` schakelt het effect in).

#### De openbaring (hover)

- In rust: `grayscale(1) brightness(0.4) contrast(1.15)`.
- Bij hover of focus: volle kleur, `scale(1.04)`, en daarachter een abyss-gloed die langzaam oplicht.
- Op touchscreens (`hover: none`): half onthuld (`grayscale(0.55) brightness(0.65)`), zodat het werk zichtbaar blijft.

#### Scroll-scènes (Framer Motion)

Geen orthodoxe scrollpagina: drie secties pinnen vast en zetten scroll om in een filmische beweging. Alle drie gebruiken `useScroll({ target, offset: ["start start", "end end"] })` + `useTransform`, met een `useSpring` voor een zachte naloop.

| Scène | Scroll wordt… | Regels |
|---|---|---|
| **Hero** | zoom van het camerabeeld (1 → 2,35×), titel splitst (±60vw) en vervaagt | Sectie 240svh hoog; de zoeker (REC, timecode, 4K · 25 fps) verdwijnt in de eerste 25% |
| **The Archive** | horizontale verschuiving van de filmrol | Hoogte = 100svh + breedte van de rol, zodat 1 px scroll = 1 px rol. Slepen/swipen (`onPan`) scrolt de pagina mee, met uitloop. Kaarten lichten op richting het midden van het scherm; hover gloeit traag op via een slappe `useSpring` |
| **End Credits** | Y-positie van de aftiteling | Hoogte gemeten uit de inhoud, 1 px scroll = 1 px rol. `.credits-mask` laat tekst onderin opdoemen en bovenin uitdoven |

Regels:
- **Videografie eerst:** de hero is een camerazoeker, videoprojecten openen de filmrol en krijgen een REC-badge, en "Camera & videografie" is de eerste regel van de aftiteling.
- **Klikken blijft werken:** na slepen opent een kaart niet; bij toetsenbordfocus scrollt de pagina de kaart of knop naar het midden.
- **`<html>` is `position: relative`**, zodat Framer Motion scrollposities correct meet.

#### Prefers-reduced-motion

Bij "minder beweging":
- flicker, glitch, grain-animatie, blackout en emerge staan uit;
- elementen zijn direct zichtbaar;
- de cursor-volger verschijnt niet;
- de scènes pinnen niet: de filmrol wordt een gewone horizontale scrollrij en de aftiteling staat stil.

De site blijft donker en sfeervol, alleen stil.

### 2.4 Layout & ritme

- **Container:** `max-w-[84rem] px-6 sm:px-10 lg:px-16` (`container` in `lib/ui.ts`).
- **Sectieruimte:** `py-28 sm:py-40 lg:py-48`. De leegte is onderdeel van het verhaal.
- **Grid-naden:** 2 px (`gap-2`). Beelden staan bijna tegen elkaar, als filmstills op een lichtbak.
- **Hoeken:** scherp. Geen `rounded` op kaarten of knoppen; alleen stipjes en de cursor zijn rond.
- **Randen:** altijd cream met lage opacity (`border-cream/10` of minder).

### 2.5 Componentpatronen

| Patroon | Component | Opbouw |
|---|---|---|
| Sectiekop | `SectionHeading` | `REEL 01 — LABEL` · Impact-titel · Hahmlet-intro |
| Credit-regel | `CreditsRoll → CreditGroup` | 2 kolommen: rol rechts uitgelijnd (`cream/45`), naam links (`cream/90`) |
| Dossierkaart | `Archive → ArchiveCard` | `DOSSIER 001` + categorie · beeld (`.haunted-media`) · Impact-titel · "Open dossier →" |
| Link | `hauntedLink` | cream + dunne onderstreping → ember bij hover (0,5 s) |
| Knop primair | `buttonPrimary` | transparant, 1px ember-rand, ember tekst → **vult volledig met ember** bij hover |
| Knop secundair | `buttonGhost` | haarlijn-rand in plaats van ember → cream bij hover |

### 2.6 Do's & don'ts

| ✅ Wel | ❌ Niet |
|---|---|
| Laat beeld pas bij interactie kleur krijgen | Kleurrijke thumbnails in rust |
| Flicker alleen op de hero-titel, bij load | Flicker op knoppen, kaarten of sectietitels |
| Credits die feitelijk kloppen | Rollen claimen die je niet had |
| Anton voor namen en titels | Anton voor alinea's |
| Ember als beloning voor hover | Ember als decoratie |
| Traag (0,5–1,8 s) | Snelle, "springerige" animaties |

---

## 3. Technische implementatie

### 3.1 Bestanden

| Bestand | Rol |
|---|---|
| `tailwind.config.ts` | Tokens: kleuren `void`, `abyss`, `cream`, `ember`; fonts `font-impact` (Anton), `font-hahmlet`; `tracking-eyebrow/reel/meta`; `ease-haunt`; `borderRadius: 0` |
| `app/globals.css` | CSS-variabelen en alle keyframes: grain, vignet, scanlines, flicker, glitch, blackout, slow fade, emerge, openbaring, venster, dossierkaart, reduced motion |
| `app/layout.tsx` | Anton en Hahmlet via `next/font/google`; globale `.film-grain` en `.vignette` |
| `app/page.tsx` | Async server component die alle data ophaalt (`Promise.all`) en de reels in volgorde rendert |
| `lib/queries.ts` | Async data-functies met TypeScript-interfaces, het aansluitpunt voor een CMS |
| `lib/cn.ts` | `cn()` = `clsx` + `tailwind-merge` voor dynamische klassen |
| `lib/ui.ts` | Gedeelde klassen: `container`, `sectionSpacing`, `reelLabel`, `sectionTitle`, `bodyText`, `metaText`, `hauntedLink`, `buttonPrimary`, `buttonGhost` |
| `lib/credits.ts` | Inhoud van de aftiteling |
| `components/sections/*` | `Hero`, `Archive`, `Evidence`, `Visions`, `CreditsRoll`, `FinalScreen` |

### 3.2 De film (paginavolgorde)

```
Reel 00  Hero           PINT · camerabeeld zoomt in, titel splitst en vervaagt
Reel 01  The Archive    PINT · verticale scroll = horizontale filmrol, sleepbaar
Reel 02  The Evidence   groei achter de camera (3 video's)
Reel 03  Visions        generatieve AI — sleepbare galerij
Reel 04  End Credits    PINT · over mij, skills en zelfreflectie rollen omhoog
Reel 05  Final Screen   contact als copyright-regels
```

### 3.3 Eigen beeld inpluggen

Zoek in de code op de markeringen **🎬 JOUW … VIDEO HIER** en **🖼️ JOUW … HIER**.

| Wat | Waar |
|---|---|
| Achtergrondvideo hero | `components/sections/Hero.tsx` |
| Projecten (beeld, titel, grootte in het grid) | `lib/projects.ts` |
| Inhoud van een projectvenster | `components/ProjectDetails.tsx` |
| Groei-video's (preview + volledige video) | `lib/growth.ts` |
| AI-beelden en -video's | `lib/ai-lab.ts` |
| Portret en rugfoto | `components/DossierCard.tsx` |

**Video-specificaties:**
- mp4 (H.264), 1280×720, `-movflags +faststart`;
- previews van 8 s zonder geluid, ± 1 MB;
- altijd een poster-jpg van het eerste sterke frame.

### 3.4 Voorbeeld: dynamische klassen met `cn()`

```tsx
import { cn } from "@/lib/cn";

<article className={cn("group relative overflow-hidden bg-abyss", card.size, hidden && "hidden")}>
  <img src={src} alt="" className="haunted-media absolute inset-0 h-full w-full object-cover" />
</article>
```

### 3.5 Voorbeeld: nieuwe sectie in de stijl

```tsx
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/cn";
import { container, sectionSpacing } from "@/lib/ui";

export default function Behind() {
  return (
    <section id="behind" className={cn("relative scroll-mt-16 border-t border-cream/[0.05]", sectionSpacing)}>
      <div className={container}>
        <SectionHeading reel="08" label="Behind the scenes" title="Deleted Scenes" titleId="behind-title">
          <p>Wat de montage niet haalde.</p>
        </SectionHeading>
        <Reveal delay=".3s">{/* 🎬 JOUW VIDEO HIER */}</Reveal>
      </div>
    </section>
  );
}
```
