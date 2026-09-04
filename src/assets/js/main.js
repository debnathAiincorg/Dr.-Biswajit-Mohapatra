/*
 * Shared entry point, loaded by every page.
 *
 * Bundled by esbuild into a single classic script, so the modules below are an
 * authoring structure rather than extra requests. Page-specific behaviour, if
 * any page ever needs it, belongs in its own entry under ./pages/ and is
 * loaded only by that page -- see the `pageJs` front-matter key.
 */
import { armReveal, disarmReveal } from './modules/reveal-arm.js';
import { exposeScrollbarWidth } from './modules/scrollbar-width.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initHeader } from './modules/header.js';
import { initMobileMenu, markCurrentNavLink } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initLightbox } from './modules/lightbox.js';

/* First statement in the bundle: see reveal-arm.js for why this ordering is
   load-bearing rather than incidental. */
armReveal();

exposeScrollbarWidth();
initSmoothScroll();

try {
  /* Header behaviours are wrapped separately from the reveal setup below: a
     broken burger button is no reason to drop the animation for the whole
     page. The outer guard is the last resort, not the first. */
  try {
    initHeader();
    initMobileMenu();
    markCurrentNavLink();
  } catch {
    /* Non-fatal: the page is fully readable without the header behaviours. */
  }

  initReveal();
} catch {
  /* Reveal setup failed: fall back to plain, fully visible content rather
     than leaving the page blank. */
  disarmReveal();
}

try {
  /* A proof image's <a> already points straight at the full-size JPEG, so a
     broken lightbox costs nothing beyond the enhancement it was adding. */
  initLightbox();
} catch {
  /* Non-fatal: the anchors still open the image directly. */
}
