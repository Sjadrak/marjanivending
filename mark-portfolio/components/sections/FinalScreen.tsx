import Reveal from "@/components/Reveal";
import type { ContactChannel } from "@/lib/queries";
import { hauntedLink } from "@/lib/ui";

interface FinalScreenProps {
  channels: ContactChannel[];
}

/** FINAL SCREEN — het laatste beeld na de aftiteling: minimalistisch, gecentreerd, contact als copyright-regels. */
export default function FinalScreen({ channels }: FinalScreenProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="final-screen"
      className="relative flex min-h-[100svh] scroll-mt-16 flex-col items-center justify-center overflow-hidden border-t border-cream/[0.05] px-6 py-32 text-center"
      aria-labelledby="final-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(11,29,46,0.5),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="relative">
        <Reveal>
          <p className="font-hahmlet text-[13px] font-medium uppercase tracking-eyebrow text-ember">05 — Contact</p>
          {/* ✏️ TEKST */}
          <h2 id="final-title" className="mt-10 font-impact text-[clamp(4rem,16vw,12rem)] uppercase leading-[0.85] text-cream">
            Fin?
          </h2>
          <p className="mx-auto mt-10 max-w-md font-hahmlet text-base leading-[1.9] text-cream-dim">
            Dit is geen einde, alleen de laatste scène vóór de volgende opname. Op zoek naar een stagiair Marketing &amp;
            Content Creatie? Neem contact op.
          </p>
        </Reveal>

        {/* Contact, opgemaakt als de copyright-regels onder een film */}
        <Reveal as="dl" className="mx-auto mt-20 space-y-5 font-hahmlet" delay=".6s">
          {channels.map((channel) => (
            <div key={channel.role} className="grid grid-cols-2 items-baseline gap-x-8 sm:gap-x-12">
              <dt className="text-right text-[10px] uppercase tracking-eyebrow text-cream/40 sm:text-[11px]">{channel.role}</dt>
              <dd className="text-left text-base sm:text-lg">
                <a
                  href={channel.href}
                  className={hauntedLink}
                  data-cursor={channel.external ? "Volg" : "Mail"}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {channel.label}
                  {channel.external && <span className="sr-only"> (opent in nieuw tabblad)</span>}
                </a>
              </dd>
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-24 max-w-lg space-y-4 font-hahmlet text-[11px] leading-relaxed text-cream/30" delay="1.2s">
          <p>
            © {year} Mark van Dijk · The Next Motion. Alle rechten voorbehouden.
          </p>
          <p>
            De personen en gebeurtenissen in dit portfolio zijn echt. Elke gelijkenis met een fictieve stagiair berust
            op toeval.
          </p>
          <p className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-4 uppercase tracking-reel">
            <a href="https://www.linkedin.com/in/mark-van-dijk-5683b9350/" target="_blank" rel="noopener noreferrer" className={hauntedLink}>
              LinkedIn <span className="sr-only">(opent in nieuw tabblad)</span>
            </a>
            <a href="/rac/it/smp2026/storage/mark/website/assets/cv/cv-mark-van-dijk.pdf" download className={hauntedLink}>
              Cv (pdf)
            </a>
            <a href="/rac/it/smp2026/storage/mark/website/assets/cv/cv-mark-van-dijk-print.pdf" download className={hauntedLink}>
              Cv om te printen
            </a>
            <a href="#top" className={hauntedLink}>
              Terug naar het begin
            </a>
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
