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

  return (
    <footer className="bg-service-green-dark text-off-white/80">
      <div className="section grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <Logo variant="mark" className="h-14 w-14" />
          <p className="mt-4 text-sm leading-relaxed text-off-white/60">
            Marjani Global Services is actief vanuit Wateringen met twee
            takken: Marjani Vending en Marjani Apartments.
          </p>
        </div>

        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-wide text-vending-yellow">
            Contact
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{SITE.location}</li>
            <li>
              <a href={SITE.phoneHref} className="hover:text-off-white">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-off-white"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-wide text-vending-yellow">
            Snel naar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-off-white">
                Kies uw dienst
              </Link>
            </li>
            <li>
              <Link href={other.href} className="hover:text-off-white">
                {other.label}
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-off-white">
                Contactformulier
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-off-white/10 py-5 text-center text-xs text-off-white/40">
        &copy; {new Date().getFullYear()} Marjani Global Services &mdash; Alle
        rechten voorbehouden.
      </div>
    </footer>
  );
}
