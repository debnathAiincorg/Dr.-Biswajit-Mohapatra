# Dr. Biswajit Mohapatra — personal academic site

Static site built with [Eleventy](https://www.11ty.dev/). No client-side
framework: the output is plain HTML, CSS and one small JS bundle.

Pages are **TypeScript templates** (`src/*.ts`) rather than a template
language -- see [Templates](#templates) below.

## Requirements

Node 20.6 or newer. (`--import`, used to load the TypeScript templates, was
added in 20.6.)

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server with live reload -> http://localhost:8080
npm run build     # production build -> dist/
npm run typecheck # type-check the templates without building
npm run serve:dist  # preview the built output exactly as a host serves it
npm run clean     # remove dist/
```

`npm run build` minifies HTML, CSS and JS. `npm run dev` leaves them readable
and adds sourcemaps. Neither compiles TypeScript to disk: `tsx` strips types at
import time, and `npm run typecheck` runs `tsc --noEmit` for checking only.

## Templates

Every page is a module exporting `data` (its front matter) and `render`. Both
come from `definePage`, which applies the base layout, so a page cannot forget
it or pass it the wrong shape:

```ts
export const { data, render } = definePage({
  data: { title: '...', description: '...', permalink: '/contact/' },
  render: (data, { url }) => html`<section>...</section>`,
});
```

Two rules matter when editing:

- **Interpolated values are HTML-escaped**, exactly as Nunjucks' `{{ }}` was.
  `html` is a tagged template; to emit markup or an entity reference such as
  `&mdash;` from a *value*, wrap it in `raw()`. Literal text inside the template
  is never touched.
- **Relative imports name the `.ts` file**, not `.js`. Eleventy's watch-mode
  cache busting matches specifiers against changed file paths, so a `.js`
  specifier would leave shared components stale until a restart.

Repeated markup lives in `src/_includes/components/`; the content that fills it
lives in `src/_includes/content/`, shared where two pages used to carry
duplicate copies (the photo captions, the lab news items).

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

> **Indexing is switched off by default.** Every page ships `noindex` and
> `robots.txt` disallows all crawling unless `ALLOW_INDEXING=true` is set at
> build time. The site's content is real, not placeholder — sourced from the
> site owner's own LinkedIn export and prior website copy — so this is a
> separate, deliberate publishing decision for the site owner to make, not a
> sign anything is unfinished. Canonicals, Open Graph, structured data and the
> sitemap are already correct either way and need no other change.

## Structure

```
src/
  _data/           site config, nav, computed structured data (.ts)
  _includes/
    lib/           html escaping, url filter, shared types, definePage,
                   proof-picture (WebP-sibling lookup for proof images)
    layouts/       base.ts -- the document shell
    partials/      head, header, footer, social badges
    components/    row-list, list-page (a row-list wrapper), card-grid
    content/       gallery items and lab news, shared between pages
  assets/
    css/           main.css imports base/, components/, layout/, utils/
      pages/       page-specific styles, loaded only where needed
    js/            main.js imports modules/ (plain JS, not typechecked)
    images/        optimised WebP + JPEG pairs, split by purpose:
                   gallery/, hero/, publications/, proof/, logos/, social/
    video/         the Gallery's one video, plus its two poster frames
    icons/         favicon set
  *.ts             one file per page (front matter + render)
scripts/           dev tooling, not shipped
image-src/         source masters for the images and video above -- not a
                   complete archive; see image-src/README.md
dist/              build output (gitignored)
```

Header, nav and footer exist once as partials. The 14 nav destinations are
defined once in `src/_data/nav.ts` and drive the header, the compact menu and
`sitemap.xml`.

## Deployment

- **GitHub Pages** — `.github/workflows/deploy.yml` builds and publishes on
  push to `main`. Set Settings → Pages → Source to **GitHub Actions**.
- **Netlify** — `netlify.toml` is included; set `SITE_URL` in the UI.
- **Vercel** — `vercel.json` is included. Its `buildCommand` sets `SITE_URL`
  inline, so the origin in canonicals and Open Graph tags is version-controlled
  rather than living in a dashboard; update that value at domain cutover.
- **Any other static host** — build command `npm run build`, output `dist`,
  and set `SITE_URL` to the origin it serves from.

The repo carries configs for all three of the above, but as of the last
verification only one is actually live — see *Deploy pipeline ownership* in
`CLAUDE.md` for which one, and why the other two are not yet wired up the way
their own config implies.
