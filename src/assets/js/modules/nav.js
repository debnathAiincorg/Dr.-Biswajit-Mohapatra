/* Off-canvas navigation drawer and current-page marking. */

import { lenis } from './smooth-scroll.js';

const FOCUSABLE = 'a[href], button:not([disabled])';

/*
 * Smooth wheel scrolling for the drawer's link list, which scrolls on its own
 * inside the fixed drawer. A second Lenis instance scoped to that element:
 * the page's instance is paused while the drawer is open, and the list's
 * data-lenis-prevent keeps the page's instance from claiming its wheel events
 * either way. Lenis skips that attribute on its own wrapper, so it does not
 * stop this one. Touch stays native, as it does for the page -- the
 * browser's own momentum scrolling is already fluid on phones and tablets.
 * Same guards as the page: absent Lenis or reduced motion means plain native
 * scrolling, and a failure here is never fatal.
 */
function initDrawerScroll(list) {
  try {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof window.Lenis === 'undefined' || reduced) return null;
    const scroller = new window.Lenis({ wrapper: list, content: list, autoRaf: true });
    scroller.stop();
    return scroller;
  } catch {
    return null;
  }
}

export function initMobileMenu() {
  const burger = document.getElementById('burgerBtn');
  const drawer = document.getElementById('navDrawer');
  const scrim = document.getElementById('navScrim');
  const closeBtn = document.getElementById('navDrawerClose');
  const list = drawer?.querySelector('.nav-drawer-links');
  if (!burger || !drawer || !scrim || !closeBtn || !list) return;

  const listScroll = initDrawerScroll(list);

  const isOpen = () => drawer.classList.contains('is-open');

  const setOpen = (open) => {
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    /* The page behind a modal drawer should not scroll. Lenis drives the
       page's scroll itself, so it is paused too; overflow alone would not
       stop it from consuming the wheel. */
    document.documentElement.classList.toggle('nav-open', open);
    if (lenis) {
      if (open) lenis.stop();
      else lenis.start();
    }
    /* The list's own scroller runs only while the drawer is open. start()
       also resyncs it to the list's current position. */
    if (listScroll) {
      if (open) listScroll.start();
      else listScroll.stop();
    }
  };

  const open = () => {
    setOpen(true);
    /* Focus moves into the dialog. preventScroll keeps the browser from
       nudging the off-screen drawer into view before its slide begins. */
    closeBtn.focus({ preventScroll: true });
  };

  /* Focus returns to the burger, the control that opened the drawer, unless
     the drawer is closing because a link was followed. */
  const close = (restoreFocus = true) => {
    if (!isOpen()) return;
    setOpen(false);
    if (restoreFocus) burger.focus({ preventScroll: true });
  };

  burger.addEventListener('click', () => (isOpen() ? close() : open()));
  closeBtn.addEventListener('click', () => close());
  scrim.addEventListener('click', () => close());

  drawer.querySelectorAll('.nav-drawer-links a').forEach((link) => {
    link.addEventListener('click', () => close(false));
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    /* Tab cycles within the drawer while it is open, as aria-modal promises. */
    if (e.key === 'Tab') {
      const items = [...drawer.querySelectorAll(FOCUSABLE)];
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
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
  document.querySelectorAll('.nav-drawer-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || /^([a-z]+:)?\/\//i.test(href)) return;
    const target = href.split('#')[0].replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    link.removeAttribute('aria-current');
    if (target === here) link.setAttribute('aria-current', 'page');
  });
}
