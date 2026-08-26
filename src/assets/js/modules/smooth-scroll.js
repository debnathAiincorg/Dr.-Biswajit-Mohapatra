/*
 * Lenis smooth scrolling, loaded from a separate <script> tag.
 *
 * Guarded because that is its own request: if it 404s or is blocked, `Lenis`
 * simply never exists and native scrolling is used instead.
 *
 * Skipped outright under prefers-reduced-motion rather than configured around
 * it -- Lenis has no built-in reduced-motion awareness, and native scrolling is
 * exactly the fallback this site already wants for every other animation.
 *
 * Default (window-scroll) mode re-drives the page's own native scroll position
 * via scrollTo() each frame; it does not wrap the page or transform it, so it
 * cannot reintroduce the transform-triggered layout bug the footer works
 * around. syncTouch is left at its default (false), which keeps touch
 * scrolling native on mobile.
 */
export function initSmoothScroll() {
  try {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof window.Lenis !== 'undefined' && !reduced) {
      new window.Lenis({ autoRaf: true });
    }
  } catch { /* scroll feel is optional; never fatal */ }
}
