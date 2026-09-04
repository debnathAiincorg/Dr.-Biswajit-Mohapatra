import { html, type Html } from '../lib/html.ts';
import type { Site } from '../lib/types.ts';
import { socialBadges } from './social-badges.ts';

export function footer(site: Site): Html {
  return html`<footer class="site-footer footer-rule">
  <div class="container footer-inner">
    <div class="footer-text">
      <p class="footer-copy">&copy; ${site.buildYear} ${site.name}. All rights reserved.</p>
      <p class="footer-credit">${site.jobTitle} &middot; ${site.organization}</p>
    </div>
    <div class="footer-socials">
      ${socialBadges(site)}
    </div>
  </div>
</footer>
`;
}
