/*
 * Arms the scroll-reveal system.
 *
 * The stylesheet leaves .reveal / .card / .footer-rule fully visible by
 * default and hangs their hidden start state off .js-reveal on <html>. Adding
 * the class here -- and only here -- ties the whole animation to this bundle
 * having actually loaded and begun executing. If the bundle 404s, is blocked
 * by a proxy, or throws before this runs, nothing arms and the page renders as
 * plain static content.
 *
 * This deliberately stays the FIRST thing main.js does. The inverse
 * arrangement (hidden by default, revealed once JS runs) leaves every
 * animated element invisible forever on any of those failures.
 */
export function armReveal() {
  document.documentElement.classList.add('js-reveal');
}

/* Drops the hidden start state again, so a failure downstream falls back to
   plain visible content rather than a blank page. */
export function disarmReveal() {
  document.documentElement.classList.remove('js-reveal');
}
