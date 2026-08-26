/*
 * Site-wide configuration.
 *
 * `url` and `pathPrefix` are read from the environment so the same source tree
 * deploys to any host without edits:
 *
 *   SITE_URL=https://example.com  npm run build      custom domain / Netlify / Vercel
 *   PATH_PREFIX=/repo-name/       npm run build      GitHub Pages project page
 *
 * Nothing in the templates hardcodes a host or a base path; internal links go
 * through the `url` filter, which applies pathPrefix at build time.
 */
export default {
  url: (process.env.SITE_URL || 'https://biswajitmohapatra.com').replace(/\/+$/, ''),
  pathPrefix: process.env.PATH_PREFIX || '/',

  name: 'Dr. Biswajit Mohapatra',
  shortName: 'B. Mohapatra',
  jobTitle: 'Professor & Director, Speech Lab',
  organization: 'Ashfield University',
  locale: 'en_US',
  lang: 'en',

  /* Social/profile links used for JSON-LD sameAs and the header/footer badge. */
  linkedin: 'https://in.linkedin.com/in/biswajitmohapatra',

  ogImage: '/assets/images/og-cover.jpg',
  ogImageAlt:
    'Dr. Biswajit Mohapatra — Professor and Director of the Speech Lab, Ashfield University',

  themeLight: '#EEE4DD',
  themeDark: '#2B2622',

  /*
   * Indexing gate.
   *
   * The written content is still placeholder while it sits alongside a real
   * person's name, photographs and LinkedIn link, so every page ships
   * noindex and robots.txt disallows everything. This mirrors the takedown
   * already deployed on the live preview URL.
   *
   * Flip to true once the real biography is in place: it swaps the robots
   * meta to index/follow and opens robots.txt. Nothing else needs editing --
   * canonicals, Open Graph, sitemap and structured data are already correct.
   */
  allowIndexing: process.env.ALLOW_INDEXING === 'true',

  buildYear: new Date().getFullYear(),
};
