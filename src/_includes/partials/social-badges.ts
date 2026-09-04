import { html, join, type Html } from '../lib/html.ts';
import type { Site } from '../lib/types.ts';

type Platform = 'linkedin' | 'youtube' | 'x' | 'facebook';

const ALL_PLATFORMS: readonly Platform[] = ['linkedin', 'youtube', 'x', 'facebook'];

/**
 * One social-profile icon: a single-color glyph (Font Awesome's brand
 * paths) in the shared `.social-badge` circle, so every platform gets the
 * same monochrome treatment as the original LinkedIn icon.
 */
function badge(options: {
  readonly href: string;
  readonly label: string;
  readonly viewBox: string;
  readonly path: string;
}): Html {
  return html`<a class="social-badge" href="${options.href}" target="_blank" rel="noopener noreferrer" aria-label="${options.label} (opens in a new tab)">
  <svg viewBox="${options.viewBox}" aria-hidden="true" focusable="false"><path d="${options.path}"/></svg>
</a>`;
}

function badgeFor(site: Site, platform: Platform): Html {
  switch (platform) {
    case 'linkedin':
      return badge({
        href: site.linkedin,
        label: `LinkedIn profile of ${site.name}`,
        viewBox: '0 0 448 512',
        path: 'M100.28 448H7.4V148.9h92.88zm-46.44-339.6C24.09 108.4 0 84.1 0 54.3a54.3 54.3 0 0 1 108.6 0c0 29.8-24.1 54.1-53.76 54.1zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.7 37.7-55.7 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
      });
    case 'youtube':
      return badge({
        href: site.youtube,
        label: `YouTube channel of ${site.name}`,
        viewBox: '0 0 576 512',
        path: 'M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.556 48.284 47.878C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.322 42.003-24.228 48.284-47.878 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232.42 337.958V174.042L361.3 256l-128.88 81.958z',
      });
    case 'x':
      return badge({
        href: site.x,
        label: `X profile of ${site.name}`,
        viewBox: '0 0 512 512',
        path: 'M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z',
      });
    case 'facebook':
      return badge({
        href: site.facebook,
        label: `Facebook profile of ${site.name}`,
        viewBox: '0 0 320 512',
        path: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
      });
  }
}

/**
 * Rendered on every page: header (desktop + mobile panel) and footer.
 * `exclude` drops a platform from one of those three spots without
 * affecting the others -- e.g. the header omits YouTube while the footer
 * and Contact page still show all four.
 */
export function socialBadges(site: Site, options?: { readonly exclude?: readonly Platform[] }): Html {
  const exclude = options?.exclude ?? [];
  const platforms = ALL_PLATFORMS.filter((platform) => !exclude.includes(platform));
  return join(platforms.map((platform) => badgeFor(site, platform)));
}
