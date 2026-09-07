# Marjani Vending / Apartments - Projectomschrijving (bron)

Dit is de oorspronkelijke briefing waarop de website is gebaseerd, bewaard als
referentie in `/docs`.

## Projectomschrijving
Marjani Global Services, gevestigd in Wateringen, bestaat uit twee takken:

1. **Marjani Vending** — de ideale snack- en frisdrankvoorziening voor
   bedrijven, instellingen, scholen en verenigingen. Full-service: plaatsing,
   onderhoud en bevoorrading, zonder investering van de klant. De automaten
   zijn uitsluitend te huur, nooit te koop.
2. **Marjani Apartments** — verhuur van sfeervolle appartementen, kort of
   langer verblijf, met een Airbnb-achtige beschikbaarheids-/boekingservaring
   maar zonder platform: rechtstreeks contact via het aanvraagformulier,
   telefoon of WhatsApp.

## Kernpunten Marjani Vending (USP's)
- Geen investering: automaten worden kosteloos geplaatst.
- Full Service: plaatsing, onderhoud en bevoorrading inbegrepen.
- Geen rompslomp: geen personele inzet, administratie of contractverplichtingen.
- Uitsluitend verhuur: automaten zijn niet te koop.

## Huisstijl & Tone of Voice
Zie `Venhuistijl.md` in deze map. Kleuren: Marjani Rood, Vending Geel en
Service Groen. Toon: zakelijk en professioneel, met nadruk op betrouwbaarheid.

## Websitestructuur (zoals gebouwd)
- `/` — Prescreen: kies tussen Marjani Vending en Marjani Apartments.
- `/vending` — Onepager: USP's, type automaten, werkwijze, FAQ, contactformulier.
- `/apartments` — Onepager: voorzieningen, beschikbaarheidskalender,
  boekingsaanvraag (in-/uitcheckdatum), direct contact.
- Beide onepagers hebben zwevende bel- en WhatsApp-knoppen en een kruislink
  naar de andere dienst.

## Bestandsstructuur van dit project
- `/app`: Next.js App Router pagina's en het `/api/contact` endpoint.
- `/components`: gedeelde UI-componenten (Logo, Header, Footer, formulieren).
- `/lib`: constantes (contactgegevens) en de voorbeeld-agenda voor Apartments.
- `/public/images`: plek voor echte foto's (zie hoofd-README.md).
- `/docs`: deze briefing en het huisstijldocument.

---
*Marjani Global Services — Wateringen.*
