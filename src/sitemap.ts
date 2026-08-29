import { html, join } from './_includes/lib/html.ts';
import { defineStandalone } from './_includes/lib/page.ts';

/* Driven by _data/nav.ts, so a new destination appears in the sitemap without
   a second edit. Escaping is the XML-safe subset, which is what `html` emits. */
export const { data, render } = defineStandalone({
  data: {
    permalink: '/sitemap.xml',
    eleventyExcludeFromCollections: true,
  },

  render: ({ site, nav, buildDate }, url) =>
    html`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${join(
      nav.map(
        (item) => html`
  <url>
    <loc>${site.url}${url(item.url)}</loc>
    <lastmod>${buildDate}</lastmod>
  </url>`,
      ),
    )}
</urlset>
`,
});
