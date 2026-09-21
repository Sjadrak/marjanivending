"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CloseIcon } from "@/components/icons";
import { projectDetails } from "@/components/ProjectDetails";
import { isProjectId, type ProjectId } from "@/lib/types";

type DialogContent =
  | { kind: "project"; id: ProjectId }
  | { kind: "image"; src: string; caption: string }
  | { kind: "video"; src: string; poster: string; caption: string };

type DialogApi = {
  openProject: (id: ProjectId, trigger?: HTMLElement | null) => void;
  openImage: (src: string, caption: string, trigger?: HTMLElement | null) => void;
  openVideo: (src: string, poster: string, caption: string, trigger?: HTMLElement | null) => void;
};

const DialogContext = createContext<DialogApi | null>(null);

export function useDialog() {
  const api = useContext(DialogContext);
  if (!api) throw new Error("useDialog moet binnen <DialogProvider> gebruikt worden");
  return api;
}

/** Projectvenster + lightbox (foto of video). Delen van één project kan met een link als /#project-rotspot */
export default function DialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [content, setContent] = useState<DialogContent | null>(null);

  const openProject = useCallback((id: ProjectId, trigger: HTMLElement | null = null) => {
    triggerRef.current = trigger;
    setContent({ kind: "project", id });
    window.history.replaceState(null, "", `#project-${id}`);
  }, []);

  const openImage = useCallback((src: string, caption: string, trigger: HTMLElement | null = null) => {
    triggerRef.current = trigger;
    setContent({ kind: "image", src, caption });
  }, []);

  const openVideo = useCallback((src: string, poster: string, caption: string, trigger: HTMLElement | null = null) => {
    triggerRef.current = trigger;
    setContent({ kind: "video", src, poster, caption });
  }, []);

  // Venster tonen zodra er inhoud is
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !content) return;
    if (!dialog.open) dialog.showModal();
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    document.documentElement.classList.add("overflow-hidden");
  }, [content]);

  // Opruimen bij sluiten (knop, Esc of klik op de achtergrond)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      dialog.querySelectorAll("video").forEach((video) => video.pause());
      setContent(null);
      document.documentElement.classList.remove("overflow-hidden");
      if (window.location.hash.startsWith("#project-")) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  // Direct een project openen via een link als /#project-rotspot
  useEffect(() => {
    const match = window.location.hash.match(/^#project-([\w-]+)$/);
    if (match && isProjectId(match[1])) openProject(match[1]);
  }, [openProject]);

  const api = useMemo(() => ({ openProject, openImage, openVideo }), [openProject, openImage, openVideo]);

  return (
    <DialogContext.Provider value={api}>
      {children}

      <dialog
        ref={dialogRef}
        id="project-dialog"
        className="text-cream"
        aria-labelledby="dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div id="dialog-scroll" ref={scrollRef} className="relative overflow-y-auto border border-cream/[0.08] bg-abyss shadow-[0_0_120px_-20px_rgba(11,29,46,0.6)]">
          <div className="sticky top-0 z-20 flex h-0 justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="m-4 grid h-11 w-11 shrink-0 place-items-center border border-cream/15 bg-void/80 text-cream backdrop-blur-md transition-colors duration-500 ease-haunt hover:border-ember/70 hover:text-ember"
            >
              <span className="sr-only">Sluiten</span>
              <CloseIcon className="h-4 w-4" strokeWidth={1.2} />
            </button>
          </div>
          <div>
            {content?.kind === "project" && projectDetails[content.id]}
            {content?.kind === "image" && (
              <figure className="bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={content.src} alt={content.caption} className="mx-auto max-h-[80vh] w-auto" />
                <figcaption id="dialog-title" className="border-t border-cream/[0.08] px-8 py-6 text-[11px] uppercase tracking-reel text-cream-dim">
                  {content.caption}
                </figcaption>
              </figure>
            )}
            {content?.kind === "video" && (
              <figure className="bg-black">
                {/* Start met geluid, omdat de bezoeker er zelf op klikte */}
                <video
                  key={content.src}
                  src={content.src}
                  poster={content.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="mx-auto aspect-video max-h-[80vh] w-full bg-black"
                />
                <figcaption id="dialog-title" className="border-t border-cream/[0.08] px-8 py-6 text-[11px] uppercase tracking-reel text-cream-dim">
                  {content.caption}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </dialog>
    </DialogContext.Provider>
  );
}
