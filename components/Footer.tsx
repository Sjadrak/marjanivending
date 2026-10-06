import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE } from "@/lib/constants";

export default function Footer({
  active,
}: {
  active: "vending" | "apartments";
}) {
  const other =
    active === "vending"
      ? { href: "/apartments", label: "Marjani Apartments" }
      : { href: "/vending", label: "Marjani Vending" };
  const current = active === "vending" ? "VENDING" : "APARTMENTS";

  return (
    <footer className="bg-mv-green-deep font-manrope text-mv-cream/75">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 pb-12 pt-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:pt-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Logo variant="mark" className="h-12 w-12" />
            <span className="text-[16px] font-extrabold uppercase tracking-wide">
              <span className="text-white">MARJANI</span>{" "}
              <span className="text-mv-gold-bright">{current}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[14px] leading-[1.75] text-mv-cream/55">
            Marjani Global Services is actief vanuit Wateringen met twee
            takken: Marjani Vending en Marjani Apartments.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-mv-gold-bright">
            Contact
          </p>
          <ul className="mt-5 space-y-3 text-[14px]">
            <li>{SITE.location}</li>
            <li>
              <a href={SITE.phoneHref} className="transition-colors hover:text-mv-gold-bright">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="transition-colors hover:text-mv-gold-bright"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-mv-gold-bright">
            Snel naar
          </p>
          <ul className="mt-5 space-y-3 text-[14px]">
            <li>
              <Link href="/" className="transition-colors hover:text-mv-gold-bright">
                Kies uw dienst
              </Link>
            </li>
            <li>
              <Link href={other.href} className="transition-colors hover:text-mv-gold-bright">
                {other.label}
              </Link>
            </li>
            <li>
              <Link href="#contact" className="transition-colors hover:text-mv-gold-bright">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-6 text-[12px] text-mv-cream/40 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            &copy; {new Date().getFullYear()} Marjani Global Services &mdash; Alle
            rechten voorbehouden.
          </span>
          <span>Wateringen, Nederland</span>
        </div>
      </div>
    </footer>
  );
}
