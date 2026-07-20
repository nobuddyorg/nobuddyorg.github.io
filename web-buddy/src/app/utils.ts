// Client-only: window isn't defined during SSR. Every call site already
// only calls this from an event handler or inside a useEffect, both of
// which run client-side only.
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
