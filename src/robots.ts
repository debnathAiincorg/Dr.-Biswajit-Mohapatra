import { defineStandalone } from './_includes/lib/page.ts';

/*
 * robots.txt is plain text, so nothing here is HTML-escaped -- an `&` in a
 * URL has to stay an `&`. The Nunjucks version ran these values through
 * autoescaping, which was harmless only because no value contains an escapable
 * character; emitting `&amp;` into a robots.txt would be a bug.
 */
export const { data, render } = defineStandalone({
  data: {
    permalink: '/robots.txt',
    eleventyExcludeFromCollections: true,
  },

  render: ({ site }, url) => {
    const header = `# ${site.url}/robots.txt\n`;

    if (!site.allowIndexing) {
      return `${header}# This site is not ready to be public and must not be indexed.
# Set ALLOW_INDEXING=true at build time to open it up.
User-agent: *
Disallow: /
`;
    }

    return `${header}User-agent: *
Allow: /

# Redirect stub. The canonical homepage is /
Disallow: /about.html

Sitemap: ${site.url}${url('/sitemap.xml')}
`;
  },
});
