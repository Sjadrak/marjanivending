"use client";

import type { ReactNode } from "react";
import { useDialog } from "@/components/DialogProvider";

type LightboxButtonProps = {
  src: string;
  caption: string;
  className?: string;
  /** Tekst in de cursor-volger bij hover (bijv. "Open") */
  cursorLabel?: string;
  children: ReactNode;
};

/** Knop die een afbeelding groot opent in het venster. */
export default function LightboxButton({ src, caption, className, cursorLabel, children }: LightboxButtonProps) {
  const { openImage } = useDialog();
  return (
    <button
      type="button"
      className={className}
      data-cursor={cursorLabel}
      onClick={(event) => openImage(src, caption, event.currentTarget)}
    >
      {children}
    </button>
  );
}
