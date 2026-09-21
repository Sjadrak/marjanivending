/*
  GEDEELDE STIJLREGELS — The Nightshade Depths (style guide v2.0)
  Terugkerende opmaak op één plek. Combineer met cn() uit lib/cn.ts.
*/

/** Breedte en zijmarges van de inhoud */
export const container = "mx-auto w-full max-w-[84rem] px-6 sm:px-10 lg:px-16";

/** Verticale ruimte per sectie */
export const sectionSpacing = "py-28 sm:py-36 lg:py-44";

/** Eyebrow-label boven een titel: "REEL 01 — THE ARCHIVE". Ember, 0.14em. */
export const reelLabel = "font-hahmlet text-[13px] font-medium uppercase tracking-eyebrow text-ember";

/** Brute sectietitel in Anton/Impact */
export const sectionTitle =
  "font-impact text-[clamp(2.3rem,9vw,8rem)] uppercase leading-[0.95] tracking-[0.01em] text-cream";

/** Lopende tekst in Hahmlet, gewicht 300 */
export const bodyText = "font-hahmlet text-[17px] font-light leading-[1.75] text-cream-dim";

/** Metadata-regel: klein, wijd gespatieerd, nooit ember */
export const metaText = "font-hahmlet text-[12px] uppercase tracking-meta text-cream-dim";

/** Tekstlink: cream met haarlijn, wordt ember bij hover */
export const hauntedLink =
  "text-cream/80 underline decoration-cream/15 underline-offset-[6px] transition-colors duration-500 ease-haunt hover:text-ember hover:decoration-ember/60";

/** Primaire knop: 1px ember-rand, vult volledig met ember bij hover */
export const buttonPrimary =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap border border-ember px-[30px] py-[15px] font-hahmlet text-[13px] uppercase tracking-reel text-ember transition-colors duration-500 ease-haunt hover:bg-ember hover:text-void";

/** Secundaire knop: haarlijn in plaats van ember */
export const buttonGhost =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap border border-cream/12 px-[30px] py-[15px] font-hahmlet text-[13px] uppercase tracking-reel text-cream-dim transition-colors duration-500 ease-haunt hover:border-cream hover:text-cream";
