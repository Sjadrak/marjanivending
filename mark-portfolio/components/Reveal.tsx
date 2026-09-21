"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Welk HTML-element gerenderd wordt (standaard een div) */
  as?: ElementType;
  /** Wachttijd voordat het element uit de schaduw komt, bijv. ".4s" (voor een trapsgewijs effect) */
  delay?: string;
};

/**
 * Slow creepy fade: laat een element traag uit de schaduw opdoemen zodra het in beeld komt.
 * De animatie zelf staat in app/globals.css (.reveal / .is-visible).
 */
const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as: Tag = "div", className, delay, style, ...rest },
  forwardedRef,
) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const setRefs = useCallback(
    (node: HTMLElement | null) => {
      nodeRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const mergedStyle = delay ? ({ ...style, "--reveal-delay": delay } as CSSProperties) : style;

  return (
    <Tag ref={setRefs} className={cn("reveal", visible && "is-visible", className)} style={mergedStyle} {...rest} />
  );
});

export default Reveal;
