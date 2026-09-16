/* Compact-menu disclosure and current-page marking. */

/* Same breakpoint components/header.css uses to swap the burger/panel for the
   inline nav row (measured there as the true minimum fit for 14 items).
   Duplicated rather than read from the CSS because there is no shared token
   for it to read from; if that breakpoint value ever changes, this one has
   to change with it. */
const DESKTOP_NAV_QUERY = '(min-width: 1250px)';

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

  const close = () => {
    panel.classList.remove('is-open');
    setState(false);
  };

  burger.addEventListener('click', () => setState(panel.classList.toggle('is-open')));

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  /* Escape closes the panel and returns focus to the control that opened it --
     expected of any disclosure that covers the page. */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) {
      close();
      burger.focus();
    }
  });

  /*
   * Widening the window past the nav-collapse breakpoint hides the burger and
   * the panel via CSS (both revert to display: none outside the max-width:
   * 1249px media query), but that does nothing to panel.is-open or
   * aria-expanded -- they are DOM state, not layout. Left alone, narrowing
   * the window back below the breakpoint -- without the user ever clicking
   * the burger or pressing Escape -- brought the panel back already expanded,
   * with no click that caused it. This closes the disclosure the moment the
   * inline nav becomes available, so the compact menu never carries stale
   * open state across the breakpoint.
   */
  const desktopQuery = window.matchMedia(DESKTOP_NAV_QUERY);
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches) close();
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
