import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { bodyText, reelLabel, sectionTitle } from "@/lib/ui";

interface SectionHeadingProps {
  /** Nummer van de filmrol, bijv. "01" */
  reel: string;
  /** Klein label naast het rolnummer */
  label: string;
  /** Brute titel in Anton/Impact */
  title: ReactNode;
  titleId: string;
  /** Korte intro in Hahmlet */
  children?: ReactNode;
  className?: string;
}

/**
 * Kop van elke sectie: eyebrow met rolnummer (ember), brute titel en een korte intro.
 * Eén slow fade per sectieblok — conform de motion-regels in STYLEGUIDE.md.
 */
export default function SectionHeading({ reel, label, title, titleId, children, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("grid gap-10 lg:grid-cols-12 lg:items-end", className)}>
      <div className="min-w-0 lg:col-span-7">
        <p className={reelLabel}>
          {reel} — {label}
        </p>
        <h2 id={titleId} className={cn("mt-5", sectionTitle)}>
          {title}
        </h2>
      </div>
      {children && <div className={cn(bodyText, "lg:col-span-5")}>{children}</div>}
    </Reveal>
  );
}
