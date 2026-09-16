import { defineStandalone } from './_includes/lib/page.ts';

/*
 * The web app manifest, generated rather than served as a static file.
 *
 * It used to be `src/site.webmanifest`, passthrough-copied verbatim. Because
 * passthrough copy does not render, none of the paths inside it went through
 * the `url` filter -- so under PATH_PREFIX every one of them was wrong. On the
 * project-page build .github/workflows/deploy.yml actually configures
 * (PATH_PREFIX=/<repo>/), the manifest was correctly *fetched* from
 * /<repo>/site.webmanifest while still declaring `start_url` and `scope` as
 * "/" and its icons as /assets/icons/... -- so an installed app launched at
 * the domain root instead of the site, and all three icons 404ed.
 *
 * This is the same failure `lib/asset.ts` was written to fix for the 163
 * hardcoded /assets/ references; the manifest was the one that got missed,
 * because it is not a template and so never looked like markup.
 *
 * Keep it a template. A static file here cannot be correct on more than one
 * host.
 */
export const { data, render } = defineStandalone({
  data: {
    permalink: '/site.webmanifest',
    eleventyExcludeFromCollections: true,
  },

  /* JSON.stringify, not a template literal: this is JSON, so it must not go
     through `html`'s escaping -- the description's "&" would become "&amp;". */
  render: ({ site }, url) =>
    JSON.stringify(
      {
        name: site.name,
        short_name: site.shortName,
        description:
          'VP & Head of Product and Solutions Engineering, Intuitive.ai — cloud, data and AI transformation for global enterprises.',
        start_url: url('/'),
        scope: url('/'),
        display: 'standalone',
        background_color: '#EEE4DD',
        theme_color: '#B5502E',
        icons: [
          { src: url('/assets/icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: url('/assets/icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: url('/assets/icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      null,
      2,
    ) + '\n',
});
