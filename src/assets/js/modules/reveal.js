/*
 * Scroll reveal.
 *
 * Elements are visible in CSS until .js-reveal is set (see reveal-arm.js);
 * from there this observer adds .is-visible as they enter the viewport.
 *
 * The stagger cap is 6 rather than 8: at a 75ms step, 8 would put the last
 * card in a batch 600ms behind the first, and with the reveal duration on top
 * the tail of a large grid starts to feel like waiting rather than cascading.
 */
const MAX_STAGGER_STEPS = 6;

export function initReveal() {
  const targets = document.querySelectorAll('.card, .reveal');
  /* The footer animates its drawn hairline and its own children from
     .is-visible on the footer element itself rather than carrying .reveal,
     which would fade and shift the whole bar. */
  const footer = document.querySelector('.footer-rule');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    footer?.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    /* Stagger by position within this batch rather than by index in the page,
       so a group scrolled to halfway down still cascades from zero instead of
       inheriting a long delay from the elements above it. */
    entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry, i) => {
        entry.target.style.setProperty('--reveal-i', String(Math.min(i, MAX_STAGGER_STEPS)));
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el) => observer.observe(el));

  /*
   * The footer gets its own observer, at threshold 0 with no bottom cut.
   *
   * Sharing the grid observer made the footer's reveal depend on its own
   * height: it is the last element on the page, so the rootMargin's 60px
   * excluded band always eats its lower edge, and clearing a 0.12 threshold
   * would require it to be at least 60 / 0.88 = 68.2px tall. It currently
   * measures ~83px -- correct, but with only ~15px of headroom, so a padding
   * change or one fewer line of footer copy could silently strand it at
   * opacity 0 forever. Threshold 0 fires on its first visible pixel.
   */
  if (footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        footerObserver.unobserve(entry.target);
      });
    }, { threshold: 0 });
    footerObserver.observe(footer);
  }
}
