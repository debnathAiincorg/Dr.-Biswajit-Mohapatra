import { html, raw } from './_includes/lib/html.ts';
import { defineStandalone } from './_includes/lib/page.ts';

/*
 * Redirect stub for the old /about.html URL.
 *
 * Deliberately not rendered into the base layout: it carries no navigation and
 * must stay as small as possible, since nobody is meant to read it.
 */
export const { data, render } = defineStandalone({
  data: {
    title: 'Redirecting to Dr. Biswajit Mohapatra',
    permalink: '/about.html',
    eleventyExcludeFromCollections: true,
  },

  render: ({ site, title }, url) => {
    const home = url('/');
    return html`<!DOCTYPE html>
<html lang="${site.lang}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="canonical" href="${site.url}${home}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${home}">
<link rel="icon" href="${url('/assets/icons/favicon.ico')}" sizes="32x32">
<script>location.replace(${raw(JSON.stringify(home))});</script>
<style>
  body { font-family: system-ui, -apple-system, 'Segoe UI', Arial, sans-serif;
         background: #EEE4DD; color: #2B2622; display: grid; place-items: center;
         min-height: 100vh; margin: 0; text-align: center; padding: 1.5rem; }
  /* The one link on the site that cannot use the shared hover system: this
     stub deliberately loads no stylesheet, so it is nobody's second request.
     The values are the token values written out -- --terracotta-text,
     --terracotta-deep, --line, --hover-draw, --hover-duration, --ease-out,
     --ease -- so it reads identically to a link anywhere else. */
  a { color: #A04525; padding-bottom: 2px;
      background-image: linear-gradient(currentColor, currentColor),
                        linear-gradient(#DBCFB4, #DBCFB4);
      background-repeat: no-repeat; background-position: 0 100%, 0 100%;
      background-size: 0% 1px, 100% 1px;
      transition: background-size 0.28s cubic-bezier(0.33, 1, 0.68, 1),
                  color 0.2s cubic-bezier(0.25, 0.1, 0.25, 1); }
  a:hover, a:focus-visible { color: #8F3D22; background-size: 100% 1px, 100% 1px; }
  @media (prefers-reduced-motion: reduce) { a { transition-duration: 0.001ms; } }
</style>
</head>
<body>
  <p>This page has moved. <a href="${home}">Continue to ${site.name}</a>.</p>
</body>
</html>
`;
  },
});
