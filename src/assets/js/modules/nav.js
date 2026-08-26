/* Compact-menu disclosure and current-page marking. */

export function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const panel = document.getElementById('mobilePanel');
  if (!burger || !panel) return;

  const setState = (isOpen) => {
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    /* aria-expanded alone announces collapsed/expanded but leaves the label
       reading "Open navigation menu" while the menu is open. */
    burger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  };

  burger.addEventListener('click', () => setState(panel.classList.toggle('is-open')));

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      panel.classList.remove('is-open');
      setState(false);
    });
  });

  /* Escape closes the panel and returns focus to the control that opened it --
     expected of any disclosure that covers the page. */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      panel.classList.remove('is-open');
      setState(false);
      burger.focus();
    }
  });
}

/*
 * Corrects aria-current at runtime.
 *
 * The build already stamps aria-current on the right link, so this is a
 * correction pass rather than the source of truth: it keeps the highlight
 * right when a page is reached by a path the build could not predict -- '/'
 * and '/index.html' are the same page, and trailing slashes vary by host.
 * Stale marks are cleared first so exactly one link is ever current.
 */
export function markCurrentNavLink() {
  const here = window.location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  document.querySelectorAll('.nav-links a, .mobile-panel a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || /^([a-z]+:)?\/\//i.test(href)) return;
    const target = href.split('#')[0].replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    link.removeAttribute('aria-current');
    if (target === here) link.setAttribute('aria-current', 'page');
  });
}
