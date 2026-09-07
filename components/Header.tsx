import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE } from "@/lib/constants";

type HeaderProps = {
  /** Welk onepager we tonen, zodat we naar de "andere kant" kunnen linken. */
  active: "vending" | "apartments";
};

const CROSS_LINK = {
  vending: {
    href: "/apartments",
    label: "Ook interessant: Marjani Apartments",
  },
  apartments: {
    href: "/vending",
    label: "Ook interessant: Marjani Vending",
  },
};

const NAME_SECOND_WORD = {
  vending: "VENDING",
  apartments: "APARTMENTS",
};

export default function Header({ active }: HeaderProps) {
  const cross = CROSS_LINK[active];

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-mv-green/10 bg-mv-cream/95 font-manrope backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between gap-4 px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo variant="mark" className="h-[38px] w-[38px]" />
          <span className="hidden text-base font-extrabold uppercase tracking-wide sm:inline">
            <span className="text-mv-green">MARJANI</span>{" "}
            <span className="text-mv-gold">{NAME_SECOND_WORD[active]}</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          <Link
            href={cross.href}
            className="hidden rounded-full border border-mv-green/20 px-4 py-1.5 text-xs font-semibold text-mv-green/75 transition hover:border-mv-green/40 hover:text-mv-green md:inline-block"
          >
            {cross.label}
          </Link>
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-1.5 text-xs font-semibold text-mv-green/75 transition hover:text-mv-green sm:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M6.6 10.8c1.2 2.4 3.2 4.3 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H7.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-1.9 1.9z" />
            </svg>
            {SITE.phoneDisplay}
          </a>
          <Link
            href="#contact"
            className="inline-flex h-10 items-center rounded-[11px] bg-mv-gold px-5 text-xs font-extrabold uppercase tracking-wide text-mv-green-deep transition-all duration-200 hover:-translate-y-0.5 hover:bg-mv-gold-bright focus:outline-none focus-visible:ring-2 focus-visible:ring-mv-gold focus-visible:ring-offset-2"
          >
            Neem contact op
          </Link>
        </nav>
      </div>
    </header>
  );
}
