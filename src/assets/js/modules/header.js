/*
 * Sticky-header condense-on-scroll.
 *
 * Hysteresis rather than a single threshold: the scrolled header gives up
 * ~12px of padding, which shortens the document. On a page with little scroll
 * room the browser then clamps scrollY back under a single threshold, the
 * header expands, the room returns -- and it flickers indefinitely (observed
 * on the Education page). This band is wider than the padding given up, so
 * neither state can undo itself.
 */
const CONDENSE_AT = 24;
const EXPAND_AT = 8;

export function initHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  /* classList.add/remove rewrites the class attribute even when the token is
     already in the desired state, so track it and only touch the DOM on an
     actual change rather than on every scroll frame. */
  let condensed = false;
  const onScroll = () => {
    const y = window.scrollY;
    const next = condensed ? y >= EXPAND_AT : y > CONDENSE_AT;
    if (next !== condensed) {
      condensed = next;
      header.classList.toggle('is-scrolled', condensed);
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
