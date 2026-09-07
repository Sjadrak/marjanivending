"use client";

import { SITE, whatsappHref } from "@/lib/constants";

export default function FloatingContactButtons({
  whatsappMessage,
}: {
  whatsappMessage: string;
}) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      <a
        href={SITE.phoneHref}
        aria-label={`Bel ${SITE.name}`}
        className="group flex h-[52px] w-[52px] items-center justify-center rounded-full border border-mv-green/10 bg-mv-cream/95 text-mv-green shadow-card backdrop-blur transition-transform hover:-translate-y-1 hover:bg-mv-cream"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M6.6 10.8c1.2 2.4 3.2 4.3 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19.5c0 .6-.4 1-1 1C10.6 20.5 3.5 13.4 3.5 4.9c0-.6.4-1 1-1H7.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-1.9 1.9z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href={whatsappHref(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="group flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:-translate-y-1 hover:bg-[#1DA851]"
      >
        <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6">
          <path
            d="M16.02 4C9.4 4 4 9.4 4 16.02c0 2.3.62 4.44 1.72 6.28L4 28l5.86-1.66a11.9 11.9 0 006.16 1.68C22.66 28.02 28 22.62 28 16s-5.34-12-11.98-12zm.02 21.7c-2 0-3.87-.55-5.47-1.5l-.39-.23-3.68 1.04 1.06-3.6-.25-.4a9.6 9.6 0 01-1.5-5.19c0-5.33 4.35-9.68 9.7-9.68 5.35 0 9.7 4.35 9.7 9.68 0 5.34-4.35 9.88-9.17 9.88z"
            fill="currentColor"
          />
          <path
            d="M21.2 18.4c-.28-.14-1.66-.82-1.92-.91-.26-.1-.44-.14-.63.14-.19.28-.72.91-.88 1.1-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.23-1.38-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.1-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.55-.46-.47-.63-.48h-.54c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.34s1 2.72 1.14 2.91c.14.19 1.97 3 4.77 4.2.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.89-1.34.23-.66.23-1.22.16-1.34-.07-.12-.26-.19-.54-.33z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
