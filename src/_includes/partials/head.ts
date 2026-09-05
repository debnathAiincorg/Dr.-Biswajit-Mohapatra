import { html, raw, type Html } from '../lib/html.ts';
import type { PageData } from '../lib/types.ts';

/*
 * Everything inside <head>.
 *
 * The blank lines this emits are the ones the Nunjucks `{% if %}` blocks left
 * behind; they are preserved so the port changes no bytes. Production builds
 * collapse them anyway.
 */
export function head(data: PageData, url: (path: string) => string): Html {
  const { site, page, title, description, ogType, pageCss, preloadImage, structuredData } = data;

  const canonical = `${site.url}${url(page.url)}`;
  const ogImage = `${site.url}${url(site.ogImage)}`;

  const robots = site.allowIndexing
    ? html`
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
`
    : html`
<meta name="robots" content="noindex, nofollow, noarchive, noimageindex">
`;

  const pageStylesheet = pageCss
    ? html`<link rel="stylesheet" href="${url(`/assets/css/pages/${pageCss}.css`)}">`
    : null;

  const preload = preloadImage
    ? html`<link rel="preload" as="image" href="${url(preloadImage)}" type="image/webp" fetchpriority="high">`
    : null;

  return html`<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${robots}
<meta name="author" content="${site.name}">
<meta name="theme-color" content="${site.themeLight}" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="${site.themeDark}" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light">

<meta property="og:type" content="${ogType ?? 'article'}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${site.ogImageAlt}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImage}">
<meta name="twitter:image:alt" content="${site.ogImageAlt}">

<link rel="icon" href="${url('/assets/icons/favicon.ico')}" sizes="32x32">
<link rel="icon" href="${url('/assets/icons/icon.svg')}" type="image/svg+xml">
<link rel="apple-touch-icon" href="${url('/assets/icons/apple-touch-icon.png')}">
<link rel="manifest" href="${url('/site.webmanifest')}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="${url('/assets/css/main.css')}">
${pageStylesheet}
${preload}

<script defer src="${url('/assets/vendor/lenis.min.js')}"></script>
<script defer src="${url('/assets/js/main.js')}"></script>

<script type="application/ld+json">${raw(structuredData)}</script>
`;
}
