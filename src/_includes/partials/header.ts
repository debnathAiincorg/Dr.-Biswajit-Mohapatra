import { html, join, type Html } from '../lib/html.ts';
import type { NavItem, PartialContext } from '../lib/types.ts';

/**
 * One nav entry. `aria-current` marks the page you are on, which is what the
 * `{% if item.url == page.url %}` test did. The label sits in its own span so
 * its hover slide moves the text alone, leaving the row and its divider still.
 */
function navLink(item: NavItem, indent: string, context: PartialContext): Html {
  const current = item.url === context.page.url ? html` aria-current="page"` : null;
  return html`
${indent}<a href="${context.url(item.url)}"${current}><span class="nav-drawer-label">${item.label}</span></a>`;
}

export function header(context: PartialContext): Html {
  const { nav, url } = context;
  /* The homepage (About) stays out of the nav itself -- it's reachable via
     the logo and is the root every other destination sits under. `nav` still
     carries it for sitemap.xml, so it's filtered here rather than dropped
     from the shared data. */
  const visibleNav = nav.filter((item) => item.url !== '/');

  const drawerLinks = join(visibleNav.map((item) => navLink(item, '    ', context)));

  /* The drawer and its scrim sit after </header>, not inside it: the header's
     backdrop-filter would make it the containing block for their
     position: fixed, pinning them to the header's box instead of the viewport.
     See the Drawer section of components/header.css. */
  return html`<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <div class="site-brand">
      <a class="logo site-title" href="${url('/')}">Dr. Biswajit <span>Mohapatra</span></a>
    </div>

    <div class="header-actions">
      <button type="button" class="burger" id="burgerBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="navDrawer">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="nav-scrim" id="navScrim" aria-hidden="true"></div>

<div class="nav-drawer" id="navDrawer" role="dialog" aria-modal="true" aria-labelledby="navDrawerTitle">
  <div class="nav-drawer-head">
    <span class="nav-drawer-title" id="navDrawerTitle">Menu</span>
    <button type="button" class="nav-drawer-close" id="navDrawerClose" aria-label="Close navigation menu">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
    </button>
  </div>
  <nav class="nav-drawer-links" aria-label="Primary" data-lenis-prevent>${drawerLinks}
  </nav>
</div>

<noscript><style>
  .burger, .nav-scrim, .nav-drawer-head { display: none; }
  .nav-drawer {
    position: static;
    width: auto;
    transform: none;
    visibility: visible;
    box-shadow: none;
    border-bottom: 1px solid var(--line);
  }
  .nav-drawer-links a { opacity: 1; }
</style></noscript>
`;
}
