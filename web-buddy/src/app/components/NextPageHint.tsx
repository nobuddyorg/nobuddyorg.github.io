"use client";

// Both hints at and performs the page-by-page snap scroll, so the paging
// behavior itself is discoverable (#544) rather than something a visitor
// has to stumble into via a wheel gesture.
function scrollToNextPage(button: HTMLElement) {
  const slider = button.closest<HTMLElement>(".manifesto-slider");
  if (!slider) return;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  slider.scrollBy({
    top: slider.clientHeight,
    behavior: reduceMotion ? "auto" : "smooth",
  });
}

// Rendered in each page's own normal flow (not a fixed overlay) so it
// scrolls naturally with the page instead of only existing on one page
// and blinking away everywhere else (#554).
export default function NextPageHint() {
  return (
    <button
      type="button"
      onClick={(e) => scrollToNextPage(e.currentTarget)}
      aria-label="Scroll to the next page"
      className="scroll-hint"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
