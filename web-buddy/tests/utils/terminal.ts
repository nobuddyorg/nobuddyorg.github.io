import type { Page } from "@playwright/test";

// The terminal's real (visible) output — scoped through this testid since
// an invisible same-content sizer also contains the same text (keeps the
// terminal box's height constant throughout the animation — see
// TerminalIntro.tsx), and an unscoped text query would match both copies.
export function terminalOutput(page: Page) {
  return page.getByTestId("terminal-output");
}

export function terminalOutputText(page: Page, text: string) {
  return terminalOutput(page).getByText(text);
}
