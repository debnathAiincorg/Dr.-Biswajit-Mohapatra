# CLAUDE.md

## Project Goal

Build a single-file `index.html` homepage for a fictional public figure, **Dr. Meera Kapoor**
(placeholder name, unchanged from v1), whose **layout, spacing, and typographic proportions**
closely mirror the live site https://www.indranooyi.com/, without reusing any of that site's
real content, copy, or images.

**v2 persona pivot (this revision):** the site now needs 14 nav destinations, most of them
academic (PhD Opportunities, Publications, Students, Alumni of a named "Speech Lab", Courses,
Activities...). Framing Dr. Kapoor purely as a memoir author made several of those nav items
incoherent, so her persona is extended — she is now **"Professor & Director, Speech Lab" at a
fictional university** (research area, university name, lab name: all invented), who has
*also* written the memoir from v1. The book is kept as a light thread (one line in the About
bio, one entry in Publications) rather than discarded, but the primary identity driving the
page is now the academic/lab-director role, since that's what the nav taxonomy actually
describes. Full section-by-section content mapping lives in `SECTIONS.md`.

This remains a **structural homage, not a clone**: section order, grid patterns, component
types, and editorial spacing are inspired by the reference site. All text, images, names, and
captions in the final page are invented placeholders.

## Structural Pattern Observed — v2, Instrumented Re-Audit

v1's analysis relied on `WebFetch`'s markdown summary plus a raw `curl` of the HTML, which
gets section *order* and class names right but cannot see computed CSS. For this revision the
site was re-audited with a real headless-Chromium session (Playwright) that navigated to
`https://www.indranooyi.com/`, read `getComputedStyle()` on key elements, and swept viewport
widths from 1600px down to 390px to catch breakpoints and grid reflow. Every number below is a
**measured value at the moment of the audit** (2026-08-22), not an estimate — where something
could only be approximated, it's labeled so explicitly.

### Corrections vs. the v1 analysis

The instrumented audit overturned three things v1 got wrong or incomplete:

1. **The header is not sticky.** `getComputedStyle(header).position` is `absolute`, not
   `fixed`/`sticky`, both before and after scrolling. It's an overlay that scrolls away with
   the page — the `header-dropshadow` class v1 noticed exists in the CSS but isn't what
   produces persistent nav; the header simply scrolls off with the hero. v1 conflated "has
   dropshadow styling available" with "is sticky."
2. **The hero/header sit on a full-bleed dark photo, not a light background.** The hero
   section carries `data-section-theme="black"`: the header and hero copy render in white text
   over the hero photograph with a `rgba(0,0,0,0.16)` black scrim overlay for contrast
   (confirmed via `.section-background-overlay { opacity: 0.16 }`). Squarespace 7.1 alternates
   "section themes" down the page — measured themes in order are `black, bright, black, bright,
   (unset), bright-inverse, black` — so the site actually toggles between dark-photo bands
   (white text) and light bands (black text), not one uniform light palette throughout.
3. **Nav text is not uppercase.** Measured nav link style: `font-size: 16px`, `font-weight:
   300`, `letter-spacing: 0.8px`, `text-transform: none`, font-family `halyard-display` (a
   licensed font we don't have access to). v1's build used uppercase, letter-spaced nav links —
   not what the reference actually does.

### Measured values (desktop, 1440px viewport unless noted)

| Element | Property | Measured value |
|---|---|---|
| `.content-wrapper` | `max-width` | `1300px` |
| `.content-wrapper` | side padding | `57.6px` each side (at 1440px viewport) |
| Nav link | font-size / weight / letter-spacing / case | `16px` / `300` / `0.8px` / none |
| Logo | font-size / weight / letter-spacing | `32px` / `500` / `0.64px` |
| H1 (hero) | font-size / weight / line-height / color | `64px` / `500` / `~62px` (ratio **0.97**, very tight) / white on black theme |
| H2 | font-size / line-height | `43.2px` / `~44.3px` (ratio ~1.03) |
| Body `p` | font-size / line-height | `20.8px` / `33.28px` (ratio **1.6**) |
| Primary button | padding / radius / bg / letter-spacing / case | `17.6px 29.4px` / `0px` (square) / `#eee4dd` / `0.285px` / uppercase |
| Social icon | size | `21×21px` |
| Gallery caption | font-size / style / line-height | `14px` / **normal, not italic** / `22.4px` (ratio 1.6) |
| Gallery grid gap | horizontal gap between tiles | `13px` (tight) |
| Gallery caption block | padding | `15px 0` |
| Nav→hamburger breakpoint | crossover | between `800px` and `768px` (standard `768px` media query) |
| Gallery column count | 1440px → 390px | measured **5 columns → 2 columns** (masonry, never drops to 1 — see gap below) |

Font-family throughout is `halyard-display`, a **sans-serif** used for both headings and body —
the reference site does not use a serif display face at all. This is flagged, not silently
adopted (see Fidelity Decisions below).

### What could only be approximated

- Exact rem/px values below ~13px (e.g. hairline border widths, some inner block paddings) —
  Squarespace's generated CSS is heavily class-obfuscated and some spacing is produced by
  nested wrapper padding that doesn't cleanly isolate to one property; where I couldn't isolate
  a clean single value I used the nearest round number and say so in `PLAN.md`.
- Section-to-section vertical rhythm (gap between major sections) — measured `0px` padding on
  the outer `[data-section-theme]` element because Squarespace paints spacing on inner wrapper
  divs several levels deep; I sampled the *visible* gap from screenshots instead (approx.
  96–140px between major bands at 1440px) rather than trusting a single computed property.

## Fidelity Decisions — where the reference conflicts with your standing requirements

Your original brief (turn 1, approved in Stage 1) explicitly specified: sticky nav, serif
headings (Playfair Display) + sans body (Inter) — this typeface requirement was later changed
to all-sans, see the Typeface row below — and a neutral **light** palette (white/cream
background, charcoal text, one accent color). The re-audit shows the reference site itself
uses a non-sticky header, an all-sans typeface, and alternates dark-photo/light-band sections.
Rather than silently picking one, here's the resolution:

| Conflict | Reference does | Your standing spec says | Decision |
|---|---|---|---|
| Header stickiness | `position: absolute`, scrolls away | "Sticky top nav" (explicit, turn 1) | **Keep sticky** — your explicit requirement wins, and with 14 nav destinations a persistent nav is a practical necessity, not just a style preference |
| Palette / dark hero band | Alternating black/bright sections, white text on hero photo | "white/cream bg, charcoal text, one accent color" (explicit, turn 1) | **Keep the light palette** — your explicit requirement wins; we do not adopt the dark hero-overlay treatment |
| Typeface | All-sans (`halyard-display`) | "Serif headings (Playfair Display), sans body (Inter)" (explicit, turn 1) | **Kept the serif/sans pairing through v1–v2** — your explicit turn-1 requirement won over the reference's all-sans face, and we adopted its *numeric ratios* (line-height ratios, letter-spacing scale) onto Playfair + Inter rather than its actual typeface. **Superseded as of commit `a4cfabf`** (2026-08-24): the requirement changed to all-sans — Inter now renders both headings and body sitewide, weights 500/600 only, with no serif face loaded on any of the 14 pages |
| Nav case | Normal case, weight 300, 16px, 0.8px tracking | Not specified by you | **Adopt the reference's approach** — switch our nav from uppercase/tracked to normal-case, lighter weight, closer to measured size, since you didn't specify otherwise and this is a real fidelity gap worth closing |
| Gallery columns | 5 → 2 masonry, tight 13px gaps | "3 columns desktop, 1 column mobile" (explicit, turn 1; reconfirmed this round: "keep the grid layout") | **Keep 3/1 fixed grid** — your explicit requirement, twice-confirmed, wins over the reference's masonry column counts |
| Container max-width | `1300px` | Previously `1220px` (our v1 choice, not user-specified) | **Adopt the reference's 1300px** — no standing user instruction to override |
| Button radius | `0px` square | Previously `3px` (our v1 choice) | **Move closer to reference: ~1–2px**, not user-specified, small enough to keep our buttons from looking harsh |

The pattern: **numeric/structural fidelity (spacing, ratios, breakpoints, proportions,
component mechanics) is adopted from the re-audit wherever you hadn't already specified
something; color/typeface/stickiness fidelity is not, because you explicitly specified
those and that instruction still stands.**

## Nav Content Change (this revision)

The nav is replaced with a 14-item list (About, PhD Opportunities, News, Awards, Education,
Experience, Publications, Projects, Students, Alumni, Gallery, Courses, Activities, Contact),
each wired to an in-page anchor. See `SECTIONS.md` for what placeholder content lives at each
anchor, and `PLAN.md` for the responsive strategy for a 14-item nav (the reference's own nav
only has to fit 6 items, so its breakpoint behavior can't be copied as-is — new breakpoint
chosen and justified in `PLAN.md`).

## Multi-Page Architecture (v3)

> **Partly superseded.** The decision to have 14 separate pages sharing one
> stylesheet still stands and is why the site is shaped the way it is. The
> *mechanics* described below — hand-written `.html` files, a `styles.css` /
> `script.js` pair, a Node script that regenerates duplicated header/footer
> markup — were all replaced in v5. See **Tech Approach** for what is true now.

**This revision converts the project from a single scrolling page into a real multi-page
site.** The 14 nav destinations were originally in-page anchor sections stacked on one
`index.html`; they are now 14 separate HTML files (`index.html` for About/home, 13 more for
everything else). This is a restructuring of *delivery*, not a redesign — the persona, design
tokens, Fidelity Decisions, and per-section content plan from v2 all carry forward unchanged.
Full file list and per-page content is in `PLAN.md` and `SECTIONS.md`.

**Shared CSS/JS decision: extracted to `styles.css` and `script.js`, linked from every page —
not repeated `<style>`/`<script>` blocks per file.** Reasoning:

- The single-file, embedded-`<style>` approach from v1/v2 was reasonable *for one page*. With
  14 pages that all must look and behave "100% consistent" (your explicit requirement this
  round), embedding an identical ~450-line stylesheet in 14 files means every future tweak —
  even a one-line color change — has to be applied 14 times by hand. That's not a hypothetical
  risk, it's close to guaranteed drift the first time anyone edits one page and forgets the
  other 13.
- An external stylesheet makes "100% consistent" a *structural* property of the site (there is
  only one stylesheet to be inconsistent with) rather than something re-verified by comparison
  after every edit.
- It's also strictly less code to read and ship: one `styles.css` + one `script.js` instead of
  14 duplicated copies of both, and returning visitors get a real caching benefit — after the
  first page load, `styles.css`/`script.js` are cached, so every subsequent page navigation on
  the site only transfers new HTML.
- The original "single file is fine" instruction (turn 1) was scoped to a one-page deliverable;
  it doesn't straightforwardly extend to "duplicate the whole design system 14 times," and
  duplicating it would work against the consistency requirement you just gave. I'm treating
  "one shared stylesheet across a small multi-page site" as the natural continuation of that
  original preference (still plain CSS, no build step, no framework) rather than a departure
  from it — flagging this reasoning rather than silently picking a path, per how this project
  has run so far.

**Header/nav/footer markup is still duplicated per file** (each `.html` file contains its own
copy of the `<header>`/`<nav>`/`<footer>` markup) — there's no server-side include or
client-side templating system in play, since that would mean either a build step or a
JS-injected-partials mechanism, neither of which was asked for and both add real complexity
(the JS-fetch-a-partial approach in particular breaks when a page is opened via `file://`
without a local server, which matters for a plain static deliverable like this one). To keep
that duplicated markup byte-identical across all 14 files despite not having a templating
system, the files were generated from one shared Node template script (dev-time authoring aid
only, not part of the shipped site — see `PLAN.md`) rather than hand-typed 14 times, which is
where "100% consistent" actually gets enforced for the HTML side.

**Homepage scope**: `index.html` keeps the full About/hero content (unchanged) plus a small
"From the Lab" teaser section — 3 short cards linking out to News, PhD Opportunities, and
Gallery — rather than a preview of all 13 other pages. The nav already provides full site
navigation, so a longer teaser list on the homepage would just duplicate it; three touchpoints
into the site's most likely first stops (what's new, how to apply, what it looks like) reads
as an actual homepage rather than a sitemap. Reasoning and exact copy in `SECTIONS.md`.

## Tech Approach — Eleventy + TypeScript templates (v5, current)

**This section replaces the "plain HTML5 + CSS3 + vanilla JS, no build step"
description that stood through v1–v4.** The site is built by Eleventy from
TypeScript templates. v2's Fidelity Decisions, the v2 measured audit and the
per-page content plan in `SECTIONS.md` all still hold — v5 changed *how the HTML
is produced*, not what it looks like. The conversion was verified by diffing the
build against the pre-conversion Nunjucks output: every page came out
byte-identical across four build configurations (dev, production, `PATH_PREFIX`,
`ALLOW_INDEXING`), and the only deliberate departures are listed under
*Reconciled inconsistencies* below.

### Stack

- **Eleventy 3.1.x**, ESM (`"type": "module"`), input `src/`, output `dist/`.
  `dist/` is gitignored — CI builds and publishes it, nothing is committed built.
- **No client framework.** Output is plain HTML, one CSS bundle, one JS bundle.
- **TypeScript templates** (`src/*.ts`); no template language. Nunjucks is gone.
  `templateFormats` is `['ts']` and `markdownTemplateEngine` /
  `htmlTemplateEngine` are both `false`, so nothing can silently fall back to
  another engine. The extension is aliased onto Eleventy's built-in JavaScript
  engine with `addExtension(['ts'], { key: '11ty.js' })`, so a plain `.ts`
  module exporting `data` and `render` is treated as a `.11ty.js` template.
  Because `ts` is *also* registered as a data extension, the config calls
  `setDataFileSuffixes(['.11tydata'])` — see *Three things that will bite you*.
- **tsx** strips types at import time via `NODE_OPTIONS=--import=tsx` in the npm
  scripts. Nothing is compiled to disk. `npm run typecheck` runs `tsc --noEmit`
  under `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
- **esbuild** bundles `src/assets/css/main.css` (collapsing its `@import` graph)
  and `src/assets/js/main.js` (ES modules into one IIFE), minified in production.
- **Google Fonts: Inter only**, weights 400/500/600, headings and body — the
  serif was dropped in `a4cfabf` (see Fidelity Decisions).
- Design tokens and the type scale live in `src/assets/css/base/tokens.css` and
  the files `main.css` imports. **The nav collapse breakpoint is
  `@media (max-width: 1249px)`, and it lives in
  `src/assets/css/components/header.css`, not in `tokens.css`.** Below that
  width the 14-item inline nav is hidden and the burger and mobile panel take
  over; at 1250px and above the full row shows. Measured crossover: burger at
  1024px, full nav at 1280px.

  > Earlier revisions of this file said 1560px. That number is stale — it came
  > from the v3 nav strategy in `PLAN.md`, before two tightening passes on nav
  > font-size, gaps and logo sizing brought the true minimum down to ~1209px
  > (see the comment above the media query in `header.css`). `PLAN.md` and
  > `CHECKLIST.md` have been corrected to match; where they still name 1560px it
  > is explicitly marked as the superseded original. `header.css` is the
  > authority.

### Layout

```
src/
  _data/           site.ts, nav.ts, buildDate.ts, eleventyComputed.ts
  _includes/
    lib/           html.ts (escaping), url.ts, types.ts, page.ts (definePage)
    layouts/       base.ts — the document shell
    partials/      head.ts, header.ts, footer.ts, linkedin-badge.ts
    components/    row-list.ts, list-page.ts, card-grid.ts, panel.ts
    content/       photos.ts, lab-notes.ts — content used by more than one page
  assets/          css/, js/ (both bundled by esbuild), images/, icons/, vendor/
  *.ts             one file per page
scripts/           dev tooling, never shipped
image-src/         photo masters, never served
dist/              build output (gitignored)
```

### How a page is written

A template exports `data` (its front matter) and `render`. Both come from
`definePage`, which applies the base layout, so a page cannot forget it:

```ts
export const { data, render } = definePage({
  data: { title: '…', description: '…', permalink: '/contact/' },
  render: (data, { url }) => html`  <section>…</section>
`,
});
```

`title`, `description` and `permalink` are required by the `PageMeta` type — a
page missing one no longer builds. Under Nunjucks a missing `description`
silently produced an empty `<meta name="description">`.

`defineStandalone` is the same thing without the layout, used for `/about.html`
(the redirect stub), `robots.txt` and `sitemap.xml`.

Nunjucks filters became ordinary functions: `url` is `lib/url.ts`; `safe` and
autoescaping are the `html` tag in `lib/html.ts`; `replace`, `join`, `default`
and `dump` are plain expressions at the point of use. The custom `absolute` and
`jsonld` filters the old config registered were used by no template and depended
on Nunjucks' `this.ctx`, so they were deleted rather than ported.

Repeated markup lives in `components/`; content that two pages share lives in
`content/`. Seven pages (Education, Experience, Awards, Publications, Courses,
Activities, Alumni) are the same `row-list` shape, and are now a heading plus an
array of rows each.

### Five things that will bite you

1. **Interpolated values are HTML-escaped; literal template text is not.** The
   `html` tag in `lib/html.ts` reproduces Nunjucks' escape map character for
   character — ampersand, double quote, single quote, less-than, greater-than
   and backslash. To emit markup or an entity reference such as `&mdash;` *from
   a value*, wrap it in `raw()`. Getting this wrong is silent: you get
   `&amp;mdash;` in the page rather than a dash.

2. **Relative imports must name the `.ts` file, not `.js`.** Eleventy's
   watch-mode cache busting (`src/Util/EsmResolver.js`) matches an import
   specifier's literal path against the list of changed files, so a `./x.js`
   specifier pointing at `x.ts` is never invalidated and edits to shared modules
   are served stale until the dev server restarts. `allowImportingTsExtensions`
   is enabled in `tsconfig.json` for this reason. Node's own type stripping
   requires `.ts` specifiers too, so this is also the more portable choice.

3. **`scripts/watch-fresh-includes.mjs` exists because of a deeper version of
   the same problem.** Even with correct specifiers, Eleventy only busts the
   files it saw change — editing `partials/footer.ts` leaves `lib/page.ts` and
   `layouts/base.ts` cached, and those still hold the old footer, so the page
   rebuilds looking unchanged. The hook versions every module under
   `src/_includes` by the newest mtime in that tree, so one change refreshes the
   whole shared graph. It is registered only for `--serve` / `--watch`; a
   one-shot build starts with an empty module cache and does not need it.

4. **`setDataFileSuffixes(['.11tydata'])` is load-bearing, and looks like it
   isn't.** `ts` is registered as both a template format and a data extension.
   Eleventy finds a template's local data file by joining the template basename
   with each data-file suffix and each data extension, and that suffix list
   defaults to `['.11tydata', '']`. The empty entry makes `src/index.ts` its
   own data file: every page imports itself a second time just for its `data`
   export. Dropping the empty suffix leaves only `<name>.11tydata.ts`, which is
   what a local data file was always meant to be called. Nothing in `src/`
   relies on the empty-suffix lookup — there are no `<name>.json` local data
   files — but deleting this line as dead config would quietly reintroduce the
   double import.

5. **`PATH_PREFIX=/repo/` is mangled by Git Bash before Node ever starts. This
   is shell behaviour, not a bug in `url.ts` — do not "fix" it in code.**
   MSYS2 path conversion, which Git Bash on Windows applies to any argument or
   environment value that looks like a Unix absolute path, rewrites a leading
   `/repo/` into a Windows path against the Git installation root. Reproduced:

   ```bash
   $ PATH_PREFIX=/repo/ node -e "console.log(process.env.PATH_PREFIX)"
   C:/Program Files/Git/repo/          # not /repo/
   ```

   Every internal link, canonical, sitemap entry and JSON-LD URL then comes out
   with `C:/Program Files/Git/...` embedded in it. The value is already
   corrupted in `process.env` by the time any project code runs, so no amount
   of normalising inside `url.ts` can recover the intended prefix — and adding
   path-normalisation there would be dead code that obscures the real cause.
   **This has already been misdiagnosed as a `url.ts` bug once. It is not.**

   CI is unaffected: `.github/workflows/deploy.yml` runs on `ubuntu-latest`,
   which has no MSYS layer, so project-page builds deploy correctly. It only
   bites local Windows testing in Git Bash. Two ways round it:

   ```bash
   MSYS_NO_PATHCONV=1 PATH_PREFIX=/repo/ npm run build   # passes /repo/ through exactly
   PATH_PREFIX=//repo/ npm run build                     # leading // suppresses conversion
   ```

   `MSYS_NO_PATHCONV=1` is the cleaner of the two — it yields exactly `/repo/`,
   whereas the `//repo/` form reaches Node with its doubled slash intact and
   relies on that being harmless downstream. PowerShell and `cmd.exe` do not
   apply this conversion at all, so the plain form works there.

### Config notes

- **`eleventy.config.js` stays JavaScript on purpose.** Eleventy only
  auto-discovers `.eleventy.js` and `eleventy.config.{js,mjs,cjs}`; an
  `eleventy.config.ts` would need `--config=` on every invocation, and a bare
  `npx eleventy` would silently build with default settings instead. It would
  also gain nothing — Eleventy ships no type definitions, so `eleventyConfig` is
  untyped either way.
- **`_data/*.ts` needs `addDataExtension('ts', …)`.** Eleventy resolves
  `.js`/`.cjs`/`.mjs` data files itself but treats anything else as
  user-registered — and, unlike the built-in path, it does *not* invoke a
  function export, so the loader in the config calls it (`buildDate.ts` returns
  a function). That loader also appends an mtime query to bust the ESM cache on
  watch rebuilds.
- **The client JS bundle passes `tsconfigRaw: {}` to esbuild.** Without it,
  esbuild picks up the project `tsconfig.json` and applies its `strict` (hence
  `alwaysStrict`) setting to the browser bundle, prepending a strict-mode
  directive and changing shipped output. The client assets are plain JS and are
  not part of the template type-check.

### Node version

`engines` is `>=20.6`, because `NODE_OPTIONS=--import` — how tsx is loaded — was
added in Node 20.6.

> **Node 20 reached end-of-life in April 2026.** CI
> (`.github/workflows/deploy.yml`) and Netlify (`netlify.toml`) are still pinned
> to Node 20, which resolves to 20.19.x and works today. **Bump both, plus
> `engines` in `package.json`, to Node 22 LTS.** This was deliberately left out
> of the v5 conversion to keep a templating change from touching deployment, so
> it is easy to forget — it is the one outstanding maintenance item in the build.

### Reconciled inconsistencies

The conversion preserved the old output byte for byte, including two markup
inconsistencies it had inherited. Both were then fixed deliberately:

- Lab news dates now use `<time datetime="2026-06">` on **both** the homepage
  teaser and `/news/`. Previously only the homepage did; `/news/` used a plain
  `<span>`. `content/lab-notes.ts` is the single source for those four items.
- The news panel icon carries `focusable="false"` on both pages; previously only
  the homepage's did.
- `Children's Acquisition…` in `publications.ts` renders as `&#39;` like
  every other apostrophe in a data value, rather than being special-cased with
  `raw()` to reproduce the old literal character. Identical rendering, one less
  exception to explain.

Two cosmetic quirks were left alone: `404.ts`'s body sits at zero
indentation while every other page starts at two spaces, and Gallery and the
homepage put a blank line before their `card-grid` where Projects and Students
do not. Both are noted in the source.

## Constraints

- **No real content from the source site**: no real names, bios, quotes, headlines, article/
  paper titles, captions, dates tied to real events, or images pulled from indranooyi.com.
- All names/titles/captions/course names/paper titles must read as plainly fictional/
  placeholder, on every page.
- All images must be placeholder services (placehold.co or equivalent), except the one real
  image explicitly requested for the About/hero portrait.
- Structural/layout and numeric-spacing similarity is the goal; visual asset and color-theme
  similarity is not (see Fidelity Decisions).
- Multi-page deliverable: the 14 nav destinations plus `/404.html`, an `/about.html` redirect
  stub, `robots.txt` and `sitemap.xml` — built from `src/*.ts` into `dist/` (see Tech
  Approach). Supersedes both the original "single file" constraint and v3's hand-written
  `styles.css` / `script.js` pair.

## Production Readiness Pass (v4)

> **Partly superseded.** The SEO, image-optimisation and indexing-gate work
> below is all still live, but it now happens in the Eleventy build rather than
> in checked-in files: there is no `docs/` directory, no `styles.css` /
> `script.js`, and the published output is `dist/`, built by CI and gitignored.
> See **Tech Approach** for the current layout.

This revision did not change the design system, the persona, or the section
content plan — v2's Fidelity Decisions and v3's multi-page architecture all
carry forward. It closed the gap between "a good-looking prototype" and
"something you can actually publish."

**No framework.** React/Next was considered and rejected: 14 static pages with
no state, no data fetching, no interactivity beyond a menu toggle and a scroll
observer. A framework would add a build step, a toolchain to maintain, and a
JS bundle to download, in exchange for nothing this site needs. Plain
HTML/CSS/JS remains correct, and the whole site now loads in ~290KB.

**Repository layout.** *(Superseded — the published tree is now `dist/`, built
by Eleventy and gitignored, and GitHub Pages deploys the build artifact rather
than a committed folder. See Tech Approach for the current layout. The principle
below is unchanged and still why things sit where they do.)* The published site
was a single directory; everything outside it is never deployed.

This replaced a `robots.txt` `Disallow:` for the notes, which only asks
crawlers not to index — the files were still fetchable by URL. Keeping them
outside the published tree makes them unreachable rather than merely unlisted,
and does so on any host, not just GitHub. `CLAUDE.md` staying at the repo root
is also what keeps it loading as project instructions.

The source PNGs moved to `image-src/` for the same reason: nothing references
them (every page uses the optimised set), and serving 5.4MB of masters that no
page requests is pure deployed weight. Regenerate the optimised set from them
whenever a photo changes.

**Homepage filename.** `index.html` is now the real homepage — previously the
site had no `index.html` at all, so the root URL 404'd. `about.html` is kept as
a `noindex` redirect stub pointing at `index.html`, so any existing inbound
link still resolves.

**CSS/JS architecture — one change, one reason.** The ~200-line `.page-home`
`<style>` block that lived inline in `about.html` moved into `styles.css`. It
was the one place the design system could drift from the shared stylesheet,
and being inline it re-downloaded on every homepage visit instead of being
cached. Lenis is vendored rather than loaded from a CDN, removing a
render-blocking third-party request from the `<head>` of every page.

*(Superseded in detail.)* CSS and JS are now authored as many small files under
`src/assets/` and bundled by esbuild into one of each — the "one request"
outcome this section wanted, without the single-file authoring constraint. The
homepage's page-specific CSS is `src/assets/css/pages/home.css`, loaded only
where `pageCss` is set in a page's front matter.

**Images.** All photographs are served as WebP with JPEG fallback via
`<picture>`. The optimised pairs live in `src/assets/images/photos/` and are
passthrough-copied to `dist/assets/images/photos/`; the masters stay in
`image-src/`, outside the build entirely. This took the site from 5.9MB of
images to ~320KB. The set is defined once in `src/_includes/content/photos.ts`
— captions, alt text and dimensions — and both the Gallery page and the
homepage teaser render from it, so a corrected caption is a one-line edit.

`Photo 7.png` was deleted: it was byte-identical to `Photo 6.png` (verified by
md5), so the homepage gallery had been rendering the same photograph twice
under two different captions. The gallery is 8 unique photographs; restoring a
full 3x3 grid needs a genuinely new ninth image.

**SEO.** Per-page canonical, Open Graph and Twitter tags; JSON-LD `@graph`
(WebSite + Person + per-page WebPage/CollectionPage/ProfilePage/ContactPage +
BreadcrumbList); `robots.txt`; `sitemap.xml` with image entries; a three-file
favicon set plus `site.webmanifest`; one `<h1>` per page with no skipped
heading levels; and real meta descriptions replacing the old
"Demo content only" placeholders.

**Base URL.** *(Superseded — do not hand-edit built files.)* The origin is no
longer baked into the source. `src/_data/site.ts` reads `SITE_URL` (default
`https://biswajitmohapatra.com`) and `PATH_PREFIX`, and every internal link goes
through the `url` filter, so the same tree deploys to any host:

```bash
SITE_URL=https://example.com npm run build                        # custom domain
SITE_URL=https://user.github.io PATH_PREFIX=/repo/ npm run build  # project page
```

`CNAME` is opt-in and never written by default: set `CNAME_DOMAIN` at cutover.
`ALLOW_INDEXING=true` opens `robots.txt` and swaps every page to `index, follow`.

**Still placeholder — read before publishing.** The written content (Speech
Lab, Ashfield University, the publication and course lists, student and alumni
names, the `speechlab@example.edu` address) is still invented, while the
photographs and the LinkedIn link belong to a real person whose actual
background is in DevOps and Agile delivery leadership, not speech science.
Gallery captions and alt text were corrected to describe what the photographs
actually show; the surrounding academic framing was not, because inventing a
real person's biography is not something to do silently. That content has to
be replaced before this site goes live.
