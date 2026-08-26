# Dr. Biswajit Mohapatra — personal academic site

Static site built with [Eleventy](https://www.11ty.dev/). No client-side
framework: the output is plain HTML, CSS and one small JS bundle.

## Requirements

Node 18 or newer.

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server with live reload -> http://localhost:8080
npm run build     # production build -> dist/
npm run serve:dist  # preview the built output exactly as a host serves it
npm run clean     # remove dist/
```

`npm run build` minifies HTML, CSS and JS. `npm run dev` leaves them readable
and adds sourcemaps.

## Configuration

Everything host-specific is an environment variable, so the same source tree
deploys anywhere without edits.

| Variable | Default | Purpose |
|---|---|---|
| `SITE_URL` | `https://biswajitmohapatra.com` | Origin (scheme + host, no trailing path) used for canonicals, Open Graph and the sitemap |
| `PATH_PREFIX` | `/` | Sub-path when the site is not at the domain root, e.g. `/repo-name/` for a GitHub Pages project page |
| `ALLOW_INDEXING` | `false` | `true` swaps every page to `index, follow` and opens `robots.txt` |
| `CNAME_DOMAIN` | *(unset)* | When set, writes `dist/CNAME` for a GitHub Pages custom domain |

Examples:

```bash
# Custom domain at the root
SITE_URL=https://example.com npm run build

# GitHub Pages project page
SITE_URL=https://user.github.io PATH_PREFIX=/repo-name/ npm run build
```

> **Indexing is switched off.** Every page ships `noindex` and `robots.txt`
> disallows all crawling, because the written content is still placeholder
> while it sits alongside a real person's name, photographs and LinkedIn link.
> Set `ALLOW_INDEXING=true` once the real biography is in place — canonicals,
> Open Graph, structured data and the sitemap are already correct and need no
> other change.

## Structure

```
src/
  _data/           site config, nav, computed structured data
  _includes/       base layout + header/footer/head partials
  assets/
    css/           main.css imports base/, components/, layout/, utils/
      pages/       page-specific styles, loaded only where needed
    js/            main.js imports modules/
    images/        optimised WebP + JPEG pairs
    icons/         favicon set
  *.njk            one file per page (front matter + body)
image-src/         original photo masters, never deployed
dist/              build output (gitignored)
```

Header, nav and footer exist once as partials. The 14 nav destinations are
defined once in `src/_data/nav.js` and drive the header, the compact menu and
`sitemap.xml`.

## Deployment

- **GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on
  push to `main`. Set Settings → Pages → Source to **GitHub Actions**.
- **Netlify** — `netlify.toml` is included; set `SITE_URL` in the UI.
- **Vercel / any static host** — build command `npm run build`, output `dist`.
