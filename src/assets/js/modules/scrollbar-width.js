/*
 * Measures the reserved vertical scrollbar gutter and exposes it as
 * --scrollbar-w.
 *
 * The homepage's full-bleed gallery band breaks out of .container using
 * `width: 100vw; margin: 0 calc(50% - 50vw)`. 100vw includes whatever gutter
 * the browser reserves for a scrollbar, whereas the .container it escapes is
 * laid out against the narrower visible area (clientWidth). On any browser
 * that reserves that space the band ends up ~15px too wide, split as ~7px of
 * overflow per edge. Subtracting the measured gutter makes the band the right
 * size instead of relying on body { overflow-x: hidden } to clip it.
 */
export function exposeScrollbarWidth() {
  try {
    const w = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-w', `${Math.max(0, w)}px`);
  } catch {
    /* A layout measurement must never take down the rest of the bundle. */
  }
}
