"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const navLinks = [
  { href: "#archive", label: "Archief" },
  { href: "#evidence", label: "Bewijs" },
  { href: "#visions", label: "Visioenen" },
  { href: "#credits", label: "Aftiteling" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Onzichtbaar boven de hero; een donkere waas zodra je scrolt, plus een dunne voortgangslijn
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 60);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-1400 ease-haunt",
        solid ? "border-cream/[0.06] bg-void/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav
        className="mx-auto flex w-full max-w-[84rem] items-center justify-between px-6 py-5 sm:px-10 lg:px-16"
        aria-label="Hoofdnavigatie"
      >
        <a href="#top" className="font-impact text-xl uppercase tracking-[0.06em] text-cream transition-colors duration-500 hover:text-ember">
          Mark van Dijk
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-hahmlet text-[11px] uppercase tracking-reel text-cream/50 transition-colors duration-500 ease-haunt hover:text-ember"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#final-screen"
              className="border border-cream/20 px-5 py-2.5 font-hahmlet text-[11px] uppercase tracking-reel text-cream transition-colors duration-500 ease-haunt hover:border-ember/70 hover:text-ember"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobiele menuknop */}
        <button
          type="button"
          className="group -mr-2 grid h-11 w-11 place-items-center text-cream lg:hidden"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu openen of sluiten</span>
          <MenuIcon className="h-5 w-5 group-aria-expanded:hidden" strokeWidth={1.2} />
          <CloseIcon className="hidden h-5 w-5 group-aria-expanded:block" strokeWidth={1.2} />
        </button>
      </nav>

      {/* Mobiel menu */}
      <div id="mobile-menu" className={cn("h-[calc(100svh-4.5rem)] bg-void lg:hidden", !menuOpen && "hidden")}>
        <ul className="flex h-full flex-col px-6 pb-10 pt-6 sm:px-10">
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline justify-between border-b border-cream/[0.07] py-5 font-impact text-4xl uppercase text-cream"
              >
                {link.label}
                <span className="font-hahmlet text-[11px] tracking-reel text-cream/40">Reel {String(index + 1).padStart(2, "0")}</span>
              </a>
            </li>
          ))}
          <li className="mt-auto">
            <a
              href="#final-screen"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center border border-cream/25 py-5 font-hahmlet text-[11px] uppercase tracking-reel text-cream"
            >
              Neem contact op
            </a>
          </li>
        </ul>
      </div>

      {/* Leesvoortgang */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-cream/40"
      />
    </header>
  );
}
