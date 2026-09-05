import { html, join, type Html } from '../lib/html.ts';
import type { NavItem, PartialContext } from '../lib/types.ts';

/**
 * One nav entry. `aria-current` marks the page you are on, which is what the
 * `{% if item.url == page.url %}` test did.
 */
function navLink(item: NavItem, indent: string, context: PartialContext): Html {
  const current = item.url === context.page.url ? html` aria-current="page"` : null;
  return html`
${indent}<a href="${context.url(item.url)}"${current}>${item.label}</a>`;
}

export function header(context: PartialContext): Html {
  const { nav, url } = context;
  /* The homepage (About) stays out of the nav bar itself -- it's reachable
     via the logo and is the root every other destination sits under. `nav`
     still carries it for sitemap.xml, so it's filtered here rather than
     dropped from the shared data. */
  const visibleNav = nav.filter((item) => item.url !== '/');

  const inlineLinks = join(visibleNav.map((item) => navLink(item, '      ', context)));
  const panelLinks = join(visibleNav.map((item) => navLink(item, '    ', context)));

  return html`<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a class="logo site-title" href="${url('/')}">Dr. Biswajit <span>Mohapatra</span></a>

    <nav class="nav-links" aria-label="Primary">${inlineLinks}
    </nav>

    <div class="header-actions">
      <button class="burger" id="burgerBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobilePanel">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <nav class="mobile-panel" id="mobilePanel" aria-label="Primary (compact)">${panelLinks}
  </nav>
</header>

<noscript><style>@media (max-width: 1249px) {
  .burger { display: none; }
  .mobile-panel {
    display: flex;
    max-height: none;
    opacity: 1;
    overflow: visible;
    visibility: visible;
    padding: 0.5rem clamp(1.25rem, 4vw, 3rem) 1.5rem;
    border-top-width: 1px;
  }
}</style></noscript>
`;
}
