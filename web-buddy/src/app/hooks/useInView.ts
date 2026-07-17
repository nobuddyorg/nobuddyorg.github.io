"use client";

import { useEffect, useRef, useState } from "react";

// Mirrors framer-motion's whileInView + viewport={{ once }}: by default,
// reveal an element the first time it scrolls into the viewport and stop
// observing (once: true). Pass once: false to keep tracking and toggle
// inView both ways — e.g. content that should re-reveal each time a
// scroll-snap section becomes active again.
export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit,
  once: boolean = true
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) {
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
