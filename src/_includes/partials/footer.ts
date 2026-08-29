import { html, type Html } from '../lib/html.ts';
import type { Site } from '../lib/types.ts';
import { linkedInBadge } from './linkedin-badge.ts';

/*
 * `{{ site.jobTitle | replace("Professor & Director, ", "") }}` reduced the
 * full title to just the lab name for the footer credit line.
 */
function shortCredit(jobTitle: string): string {
  return jobTitle.replace('Professor & Director, ', '');
}

export function footer(site: Site): Html {
  return html`<footer class="site-footer footer-rule">
  <div class="container footer-inner">
    <div class="footer-text">
      <p class="footer-copy">&copy; ${site.buildYear} ${site.name}. All rights reserved.</p>
      <p class="footer-credit">${shortCredit(site.jobTitle)} &middot; ${site.organization}</p>
    </div>
    <div class="footer-socials">
      ${linkedInBadge(site)}
    </div>
  </div>
</footer>
`;
}
