/*
 * Shared entry point, loaded by every page.
 *
 * Bundled by esbuild into a single classic script, so the modules below are an
 * authoring structure rather than extra requests. No page currently needs
 * behaviour of its own -- everything here runs on all 16 pages. If one ever
 * does, the CSS side already has the pattern to follow: `pageCss` in a page's
 * front matter (see lib/types.ts's PageMeta) loads a stylesheet only for that
 * page (see pages/home.css and head.ts). A `pageJs` front-matter key wired the
 * same way through eleventy.config.js's esbuild step would be the equivalent
 * for script -- not built, because nothing has needed it yet.
 */
import { armReveal, disarmReveal } from './modules/reveal-arm.js';
import { exposeScrollbarWidth } from './modules/scrollbar-width.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initHeader } from './modules/header.js';
import { initMobileMenu, markCurrentNavLink } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initLightbox } from './modules/lightbox.js';
import { initFooterShuffle } from './modules/footer-shuffle.js';

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

try {
  /* Purely decorative, and guarded on its own so a failure here cannot take
     the lightbox down with it. The badges are fully usable without it. */
  initFooterShuffle();
} catch {
  /* Non-fatal: the footer badges simply hold still. */
}
