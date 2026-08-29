import { html, join, type Html } from '../lib/html.ts';
import type { NavItem, PartialContext } from '../lib/types.ts';
import { linkedInBadge } from './linkedin-badge.ts';

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
  const { nav, url, site } = context;
  const badge = linkedInBadge(site);

  const inlineLinks = join(nav.map((item) => navLink(item, '      ', context)));
  const panelLinks = join(nav.map((item) => navLink(item, '    ', context)));

  return html`<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a class="logo" href="${url('/')}">Dr. Biswajit <span>Mohapatra</span></a>

    <nav class="nav-links" aria-label="Primary">${inlineLinks}
    </nav>

    <div class="header-actions">
      ${badge}
      <button class="burger" id="burgerBtn" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobilePanel">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <nav class="mobile-panel" id="mobilePanel" aria-label="Primary (compact)">${panelLinks}
    <div class="mobile-socials">
      ${badge}
    </div>
  </nav>
</header>
`;
}
