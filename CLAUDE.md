# CLAUDE.md

## Current State (read this first)

This file is a chronological build log, not a spec you can read top-to-bottom
— the sections below record real decisions in the order they were made, and
several early ones describe a project state that no longer exists. Before
reading further, here is what is actually true today:

- **The site is real, not fictional.** It is Dr. Biswajit Mohapatra's actual
  personal/professional site — real name, real career, real photographs. The
  "Project Goal" section directly below, and the persona-specific parts of
  "Nav Content Change" (the old nav labels PhD Opportunities, Students,
  Alumni, Courses), describe a **fictional placeholder persona** ("Dr. Meera
  Kapoor," a speech scientist at a made-up university) that was built first
  and then fully replaced — see *No longer placeholder — real content pass*.
  `PLAN.md` and `SECTIONS.md` document that fictional persona in detail and
  are themselves marked historical at their own top; they no longer describe
  the site's content. **"Structural Pattern Observed" and "Fidelity
  Decisions," by contrast, are not persona-specific** — they audit and react
  to the reference site indranooyi.com's own design, and their measured
  values and decisions (container width, type-scale ratios, which of the
  owner's standing requirements override the reference) still govern the
  site's CSS today.
- **It is a 14-page static site**, not a single `index.html`. Each nav
  destination is its own page, built by **Eleventy from TypeScript templates**
  — see *Tech Approach*, which is the authority on the build.
- **The Gallery holds real photographs and one real video** of him, currently
  15 photographs plus one video — see *Gallery rebuild* and *content/photos.ts*.
- **Indexing is off by default** (`ALLOW_INDEXING`), and that is a deliberate
  publishing decision, not a sign the content is unfinished.

What carries forward from the fictional-persona era and is still true: the
structural homage to indranooyi.com (section order, grid patterns, spacing —
never its content), the measured design tokens (container width, type scale,
breakpoints), and the general shape of the Fidelity Decisions (which
requirements from the site owner override the reference, and which don't).

## Project Goal

> **Historical — describes the fictional placeholder persona this project
> started with, fully replaced by real content. See *Current State* above and
> *No longer placeholder — real content pass* near the end of this file.**

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
| Header stickiness | `position: absolute`, scrolls away | "Sticky top nav" (explicit, turn 1) | **Keep sticky** — your explicit requirement wins, and with 14 nav destinations a persistent nav is a practical necessity, not just a style preference. **This was inert until 2026-08-29 — see the note directly below.** |
| Palette / dark hero band | Alternating black/bright sections, white text on hero photo | "white/cream bg, charcoal text, one accent color" (explicit, turn 1) | **Keep the light palette** — your explicit requirement wins; we do not adopt the dark hero-overlay treatment |
| Typeface | All-sans (`halyard-display`) | "Serif headings (Playfair Display), sans body (Inter)" (explicit, turn 1) | **Kept the serif/sans pairing through v1–v2** — your explicit turn-1 requirement won over the reference's all-sans face, and we adopted its *numeric ratios* (line-height ratios, letter-spacing scale) onto Playfair + Inter rather than its actual typeface. **Superseded as of commit `a4cfabf`** (2026-08-24): the requirement changed to all-sans — Inter now renders both headings and body sitewide, weights 500/600 only, with no serif face loaded on any of the 14 pages |
| Nav case | Normal case, weight 300, 16px, 0.8px tracking | Not specified by you | **Adopt the reference's approach** — switch our nav from uppercase/tracked to normal-case, lighter weight, closer to measured size, since you didn't specify otherwise and this is a real fidelity gap worth closing |
| Gallery columns | 5 → 2 masonry, tight 13px gaps | "3 columns desktop, 1 column mobile" (explicit, turn 1; reconfirmed this round: "keep the grid layout") | **Keep 3/1 fixed grid** — your explicit requirement, twice-confirmed, wins over the reference's masonry column counts |
| Container max-width | `1300px` | Previously `1220px` (our v1 choice, not user-specified) | **Adopt the reference's 1300px** — no standing user instruction to override |
| Button radius | `0px` square | Previously `3px` (our v1 choice) | **Move closer to reference: ~1–2px**, not user-specified, small enough to keep our buttons from looking harsh |

### The sticky header was inert on every page until the overflow guard changed (2026-08-29)

`.site-header` has declared `position: sticky` since v3, and `getComputedStyle`
confirmed `sticky` the whole time — but the header still scrolled away on all 14
non-homepage pages. The cause was the sitewide overflow guard:

```css
html, body { overflow-x: hidden; }   /* the guard, added in 1791620 */
```

`overflow-x: hidden` clips **and** makes the element a scroll container. A
sticky element resolves against its nearest scrolling ancestor, so the header
was sticking to *body's* scrollport while the document actually scrolled on
`html`. It stuck perfectly — to a box that never moved relative to it.

**The fix is `overflow-x: clip`, not removing the guard.** `clip` clips
identically but does *not* create a scroll container, so the guard's protection
is kept and sticky resolves against the viewport. Removing the guard instead
would have traded a real regression risk for the fix; `clip` costs nothing.

Measured before and after, same build, 16 pages × 14 widths (320→1920) × 2
viewport heights, restricted to the 212 page/width combinations where the page
is genuinely scrollable (`maxScroll >= 120px`):

| | header pinned after scrolling | header top |
|---|---|---|
| `overflow-x: hidden` (before) | **0 / 212** | `-scrollY` exactly — scrolled away 1:1 with the page |
| `overflow-x: clip` (after) | **212 / 212** | `0` |

On `/gallery/`, which scrolls 1279–5082px, the header sat at `-1188` before and
`0` after, at the same ~1188px scroll offset.

**Do not revert this to `hidden`.** Both declarations — `base/reset.css` and
`base/tokens.css` — carry a comment saying so. Verified that `clip` introduces
no overflow `hidden` did not: across 240 records covering the two cases the
guard's own commits name — the 1423px window width from `1791620` at 100/125/150%
display scaling, and the homepage's `width: 100vw` full-bleed band from `73b8394`
with the site's JS blocked so `--scrollbar-w` keeps its `0px` fallback —
**zero records could scroll sideways in either variant**, and layout geometry was
identical (all height deltas ≤1px, sub-pixel rounding). The known browser cost is
that `overflow: clip` needs **Safari 16+** (Sept 2022); older Safari ignores the
declaration and loses the guard, which permits sideways scroll but breaks nothing.

The homepage is deliberately exempt and stays that way: `.page-home .site-header`
is `position: absolute` (`pages/home.css`), an overlay on the dark hero photo that
scrolls away by design. Confirmed unchanged — 56/56 combinations still compute
`absolute` and still scroll away, identical to before the fix.

The pattern: **numeric/structural fidelity (spacing, ratios, breakpoints, proportions,
component mechanics) is adopted from the re-audit wherever you hadn't already specified
something; color/typeface/stickiness fidelity is not, because you explicitly specified
those and that instruction still stands.**

## Nav Content Change (this revision)

The nav is replaced with a 14-item list (About, ~~PhD Opportunities~~, News, Awards, Education,
Experience, Publications, Projects, ~~Students~~, ~~Alumni~~, Gallery, ~~Courses~~, Activities,
Contact), each wired to an in-page anchor. See `SECTIONS.md` for what placeholder content lives
at each anchor, and `PLAN.md` for the responsive strategy for a 14-item nav (the reference's own
nav only has to fit 6 items, so its breakpoint behavior can't be copied as-is — new breakpoint
chosen and justified in `PLAN.md`).

> **The four struck-through labels above no longer exist.** PhD Opportunities,
> Students and Alumni were repurposed to Patents, Academic Engagement and
> Board & Advisory, and Courses to Certifications, when the real content pass
> retargeted them to a real career with no PhD program, students or courses —
> see the table in *No longer placeholder — real content pass*. The other ten
> labels are unchanged. `SECTIONS.md` and `PLAN.md` are historical: both are
> marked as such at their own top and describe the fictional persona this nav
> was first built for, not the site's current content. What actually lives at
> each of the 14 URLs today is each page's own `src/*.ts` file, and
> `src/_data/nav.ts` is the count and label of record. The nav's breakpoint
> reasoning in `PLAN.md`, by contrast, is not persona-dependent and still
> holds — see *Tech Approach* for the current breakpoint value, which moved
> after `PLAN.md` was written.

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
- **Self-hosted fonts: Inter (300/400/500/600) and Cinzel (400).** Inter sets
  headings and body sitewide. 300 is used by exactly two elements -- the
  `.site-tagline` in the header and the `.footer-credit` that prints the same
  string -- and was added for them; everything else is 400 and up. Cinzel is a serif and is loaded on every page,
  but applied to exactly one element: the `.site-title` wordmark in the header
  (`components/header.css`). **Earlier revisions of this file said "Inter only
  … no serif face loaded on any of the 14 pages". That has been untrue since
  `3a7e528`** (Cinzel applied to the site title) and `715afbb` (its weight
  pinned to 400); the Playfair Display removal in `a4cfabf` is what that
  sentence originally described, and it was never updated when Cinzel arrived.
  `header.css` is the authority on which element gets the serif.

  > **These came from Google Fonts until 2026-09-16 and no longer do.** Two
  > preconnects plus a render-blocking `<link>` to `fonts.googleapis.com` were
  > replaced by five woff2 files served from `/assets/fonts/`, declared in
  > `src/assets/css/base/fonts.css` and copied out of the `@fontsource/inter`
  > and `@fontsource/cinzel` devDependencies by `eleventy.config.js`. Same
  > reasoning already recorded for `vendor-lenis.css`: no blocking cross-origin
  > round trip before first paint, no third-party outage risk, and no request
  > to Google per visitor. Cinzel's 700 and 900 cuts were dropped because
  > nothing has ever applied them. Only the `latin` subset ships -- verified,
  > every character on all 16 built pages falls inside that range; `fonts.css`
  > documents how to add `latin-ext` if content ever needs it. The `url()`s in
  > that file are relative **deliberately**, so they survive `PATH_PREFIX`; see
  > the note there before changing them to root-absolute paths.
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
    lib/           html.ts (escaping), url.ts, types.ts, page.ts (definePage),
                    asset.ts (the module-level `url` binding), proof-picture.ts
                    (WebP-sibling lookup for proof images)
    layouts/       base.ts — the document shell
    partials/      head.ts, header.ts, footer.ts, social-badges.ts
    components/    row-list.ts, list-page.ts, card-grid.ts
    content/       photos.ts, lab-notes.ts, sources.ts (the external-proof
                    registry `scripts/check-links.mjs` walks) — content used
                    by more than one page
  assets/          css/, js/ (both bundled by esbuild), images/, video/,
                    icons/, vendor/
  *.ts             one file per page
scripts/           dev tooling, never shipped
image-src/         source masters for the images and video above, not a
                    complete archive — see image-src/README.md
dist/              build output (gitignored)
```

> **`panel.ts` never existed as a component file, and the "panel" visual
> pattern it would have named is now fully dead.** No page in the current
> build renders `class="panel"` — verified against `dist/`. `/news/` moved to
> the same `row-list` shape as every other list page; nothing replaced PhD
> Opportunities' panel when it became Patents. Only the CSS survives
> (`.panel-inner h2` rules in `base/tokens.css` and `base/typography.css`),
> unused by any current template.

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

## Depth Layer (v6, 2026-09-12) — 3D removed 2026-09-14

v6 added a pointer-driven 3D layer: parallax on the homepage hero, card tilt
with a cursor-tracked specular sheen, and a 4deg entrance hinge on cards,
alongside 2D card elevation and a scrolled-header shadow. **The 3D parts were
removed on 2026-09-14 at the site owner's request** — remove the 3D animation,
keep every other animation. Do not reintroduce `perspective()`,
`rotateX`/`rotateY`, tilt, sheen or pointer-driven parallax without being asked.

Removed:

- `js/modules/depth.js` and its `initDepth()` call in `main.js`. The module
  drove only the tilt, the sheen and the parallax.
- The 3D card transform in `utils/reveal.css`. Cards reveal with the same 2D
  rise as every other `.reveal` element again.
- The hero parallax block in `pages/home.css` (layer overscan, `translate`
  transitions, `will-change`). The hero photo's settle animation is kept, back
  in its original `transform: scale()` form — v6 had moved it to the `scale`
  property only so the parallax could compose with it.
- The 3D tokens in `base/reset.css`: `--depth-perspective`, `--tilt-*`,
  `--parallax-*` and `--reveal-tilt`.

Kept, in `components/depth.css`: 2D elevation only — the resting `--elev-1`
shadow and hover lift on project cards and gallery photos, and the `--elev-2`
shadow on the scrolled header, with their reduced-motion and
`@media (hover: none)` guards. The `--elev-*` tokens stay in `base/reset.css`.

`docs/superpowers/specs/2026-09-12-depth-layer-design.md` still describes the
full v6 layer. It is a historical record, not the current state.

## Expanded rows put their figure beside the text (2026-09-17)

An expandable `row-list` row carrying both a figure and text lays them out in
two columns -- text left, figure right -- instead of stacking the figure above
the first sentence, where an 800px-tall certificate scan sat between a row's
title and the words it belongs to. 58 rows across ten pages: Awards 32,
Activities 11, News and the homepage teaser 3 each, Academic Engagement 3,
Publications 2, and one each on Patents, Board & Advisory, Certifications and
Education.

### Who decides what

Three things size these rows, and it is worth knowing which to reach for,
because they were arrived at in that order by fixing what the previous one got
wrong.

- **`asideTrack` in `components/row-list.ts` decides the figure's size**, per
  row, and is what stops a row being tall for no reason:

      height = clamp(360px, estimated text height x 1.6, 640px)
      width  = clamp(240px, height x aspect ratio, the image's own px width)

  It arrives in the CSS as `--row-aside-cap`, an inline pixel width on the
  body. The 44 rows with under 400 characters all land on a ~350px figure
  height whatever their aspect ratio -- that uniform height is what gives a
  page of opened rows a consistent rhythm -- with widths between 240px and
  431px. Rows with real prose scale up to 640px. **Two floors, guarding
  different things:** 360px of height keeps a certificate legible in place,
  240px of width keeps a two-line caption from setting as seven lines.
- **`--row-aside-share` in `components/row-list.css` decides how much of the
  body a figure may take at all**, and is what makes the layout responsive:
  36% (41% with `.is-prose`), stepping down at 1200px and 1024px. It binds on
  a narrower window, where a fixed px cap would leave the text nothing, and on
  a landscape image, whose aspect ratio asks for more width than the body can
  spare. The two compose as `min(share, cap)`.
- **The text takes the rest** (`1fr`), capped to a measure -- 80ch, or 72ch
  with `.is-prose`, which the renderer adds at 400 characters. The figure is
  in the last track, so whatever the numbers settle on, its right edge is on
  the body's right margin, in line with the row's date above it: measured
  right-hand void is 4px, the body's own padding, on all 58 rows at every
  width. Width the figure does not take becomes gutter, not a hole at the
  margin.

Stacks text-first at 768px, where the figure keeps its per-row cap
(`clamp(300px, cap, 400px)`) so the height budget survives the reflow -- left
to fill the column, a portrait scan would come out *taller* stacked than
side-by-side.

### Two slots, and the vertical trade-off

`Row.detailAside` is the slot for a figure a page builds itself -- the book
cover and magazine tearsheet on Publications, the same two in
`content/lab-notes.ts` -- with `Row.detailAsideSize` giving the renderer that
image's pixel dimensions, which it cannot read out of pre-rendered markup and
needs for `asideTrack`. A `proofImage` carries its own size and reaches the
same column on its own.

The text is centred against the figure (`align-self: center` on
`.row-detail-main`) and the figure is top-aligned, so it never hangs lower
than its text. **A one-line citation beside a legible scan still leaves around
400px of space under the text, and that is the floor, not an oversight**: the
text is 47px and the figure cannot go below the legibility floor, so the ratio
cannot be closed -- only the absolute height, which went from ~600px to ~410px
when sizing became content-aware. `ASIDE_MIN_HEIGHT` in `row-list.ts` is the
one number to change if a shorter row is worth a smaller image.

### The News press grid moves too

The Intuitive.ai appointment row is the one row whose images are a grid rather
than a figure. Its text runs to 11,789 characters, and with no aside the body
was capped at 68ch -- a 631px column of text inside a 1204px container, with
the six congratulations graphics 2,513px below the first paragraph. The grid
now sits in the figure column: text at 72ch, grid 450px wide, 3 x 2 tiles at
142px, which is within 5px of what the tiles measured in the flow, so the
graphics moved without being resized. Row height went from 2,909px to 2,288px.

**The mechanism is `movableBlock` in `content/lab-notes.ts`.** That module is
the single source for both /news/ and the homepage teaser, and `asRows` takes
`movableBlocksBeside` -- **both callers pass it**, so the two pages render
these rows identically, which is verified: all four detail bodies match
byte for byte once the minifier's per-document attribute sort is normalised,
and the rendered geometry matches at ten widths from 320px to 1920px.

The option stays a parameter rather than becoming the only behaviour because
the fallback is what makes the block *movable* rather than simply relocated:
a caller that cannot give a row two columns gets the grid back at the end of
the text instead of losing it. Default `false` keeps that the safe case for a
new caller.

`Row.detailAsideTrack` is how the width gets set: a grid of thumbnails has no
aspect ratio, so `asideTrack`'s height budget has nothing to work from and the
row states 450px outright. The share still caps it, so a tablet steps the grid
down to 2 columns and a narrow window is unaffected.

Two CSS rules go with it, both scoped to `.row-detail-aside` so the only other
`.proof-grid` on the site -- the four jury letters on Activities, in the flow
of a three-line paragraph, already beside what introduces them -- is untouched
and still renders at 623px, 4 columns, 147px tiles, byte-identical.

### What deliberately did *not* move

An image the prose introduces in passing (the spatial-data-warehouse diagram
Publications calls "given below"), the Activities `.proof-grid`, whose own
heading sits directly above it in the text, and the four Activities rows whose
whole `detail` is a photograph with no text beside it. Those stay in the flow
at full width, and their HTML is byte-identical to before this change --
verified by diffing all 78 detail bodies against the pre-change build.

On a phone every aside stacks text-first, so the press grid is at the end of
the article there. That is the site-wide stacked rule and is exactly where it
was before this change; the alternative is putting six thumbnails above the
headline text for one row only.

### Measured

288 page/width combinations (16 pages x 18 widths, 320-1920px) with every row
expanded, 1152 aside bodies: no text/figure overlap, no body overflow, no
figure past the body's edge, no figure sitting below the top of its text, and
no rendered line over 80ch. Stacked below 768px, all 58 rows put text first
with an 18px gap and no image wider than its column. Median row height at
1440px is 433px. The 27px `scrollWidth` overhang the homepage shows at 320px
is unchanged from before and comes from its `width: 100vw` band, not from this
layout.

## Constraints

> **The next two bullets are v1–v2 constraints, superseded by the real content
> pass** (see *No longer placeholder — real content pass* below). Every page
> now carries Dr. Mohapatra's real, sourced biography, and every gallery
> photograph is a real photograph of him — neither is fictional or a
> placehold.co image any more. The first bullet is unaffected: it was always
> about not copying **indranooyi.com**'s own content, which still holds.

- **No real content from the source site**: no real names, bios, quotes, headlines, article/
  paper titles, captions, dates tied to real events, or images pulled from indranooyi.com.
- ~~All names/titles/captions/course names/paper titles must read as plainly fictional/
  placeholder, on every page.~~ Superseded — see banner above.
- ~~All images must be placeholder services (placehold.co or equivalent), except the one real
  image explicitly requested for the About/hero portrait.~~ Superseded — see banner above.
- Structural/layout and numeric-spacing similarity is the goal; visual asset and color-theme
  similarity is not (see Fidelity Decisions).
- Multi-page deliverable: the 14 nav destinations plus `/404.html`, an `/about.html` redirect
  stub, `robots.txt`, `sitemap.xml` and `site.webmanifest` — built from `src/*.ts` into
  `dist/` (see Tech Approach). Supersedes both the original "single file" constraint and v3's
  hand-written `styles.css` / `script.js` pair.

  > `site.webmanifest` joined that list on 2026-09-16. It used to be a static file
  > passthrough-copied from `src/`, which meant the paths **inside** it never got the
  > `url` filter — so on the project-page build `.github/workflows/deploy.yml` configures,
  > its `start_url`/`scope` pointed at the domain root and all three icons 404ed. It is
  > now `src/webmanifest.ts`. Do not turn it back into a static file; see the note there.

## Production Readiness Pass (v4)

> **Partly superseded.** The SEO, image-optimisation and indexing-gate work
> below is all still live, but it now happens in the Eleventy build rather than
> in checked-in files: there is no `styles.css` / `script.js`, and the
> published output is `dist/`, built by CI and gitignored. (This paragraph
> used to say there is no `docs/` directory either. There is — it holds the
> design specs under `docs/superpowers/specs/`. It is not published: only
> `dist/` is deployed, and `docs/` sits outside it.)
> See **Tech Approach** for the current layout.

This revision did not change the design system, the persona, or the section
content plan — v2's Fidelity Decisions and v3's multi-page architecture all
carry forward. It closed the gap between "a good-looking prototype" and
"something you can actually publish."

**No framework.** React/Next was considered and rejected: 14 static pages with
no state, no data fetching, no interactivity beyond a menu toggle and a scroll
observer. A framework would add a build step, a toolchain to maintain, and a
JS bundle to download, in exchange for nothing this site needs. Plain
HTML/CSS/JS remains correct, and a typical page still loads in a few hundred
KB. **The "whole site loads in ~290KB" figure this line used to carry was
never re-measured after the gallery grew from 8 photographs to 38, and the
figure that replaced it is stale too** — re-measured after the 2026-09-19
gallery rebuild: `dist/` now totals **~25MB**, split as ~14MB of images
(9.1MB of proof/certificate scans, ~4.4MB of gallery/hero/publications
photographs) and **~10MB of video**, the one addition that pushed the total
well past the 14MB this line previously gave. As before, this is a
*repository* figure, not a page-weight one: every image is `loading="lazy"`,
the video's `preload="none"` means its 10MB is fetched only if someone opens
it, and no single page requests more than a fraction of the total — but the
two numbers are not interchangeable and this line has twice implied they
were. The CSS and JS bundles together are still ~36KB.

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
`<picture>`. **The single `images/photos/` folder described here was split by
purpose on 2026-09-19** — see *Gallery rebuild* at the end of this file. The
optimised pairs now live in `src/assets/images/{gallery,hero,publications,
proof,logos,social}/`, plus `src/assets/video/` for the Gallery's one video,
and are passthrough-copied under `dist/assets/`; the masters stay in
`image-src/`, outside the build entirely. This took the site from 5.9MB of
images to ~320KB — a figure from before the video and the proof-image pass
both landed, so it no longer describes total image weight; see *Production
Readiness Pass* below for a current figure. The set is defined once in
`src/_includes/content/photos.ts` — captions, alt text and dimensions — and
both the Gallery page and the homepage teaser render from it, so a corrected
caption is a one-line edit.

`Photo 7.png` was deleted: it was byte-identical to `Photo 6.png` (verified by
md5), so the homepage gallery had been rendering the same photograph twice
under two different captions. The gallery was 8 unique photographs at the time
of that fix. It later grew to 38, and — after the whole set was replaced on
2026-09-19 (see *Gallery rebuild* below) plus one photograph restored the same
day (see *The lightbox opened top-left* below) — **is now 15 photographs plus
one video**. `content/photos.ts` is the count of record: count its entries
rather than trusting this number if the two of you keep working on the Gallery
after this file was last edited.

**SEO.** Per-page canonical, Open Graph and Twitter tags; JSON-LD `@graph`
(WebSite + Person + per-page WebPage/CollectionPage/ProfilePage/ContactPage +
BreadcrumbList); `robots.txt`; `sitemap.xml` (`<loc>`/`<lastmod>` per URL --
**not** image entries; `sitemap.ts` has never emitted `<image:image>`, this
line just said so); a three-file favicon set plus `site.webmanifest`; one
`<h1>` per page with no skipped heading levels; and real meta descriptions
replacing the old
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

**Deploy pipeline ownership — measured 2026-09-16.** The repo carries **three**
independent deploy configs pointing at different places. This section used to
say nothing in the repo could tell you which was production, and asked the site
owner to state it. Most of that is now answered from outside the repo — DNS,
live response headers, the GitHub API and the workflow run history. The
headline: **none of the three serves `biswajitmohapatra.com`, and the one
actually serving this site is Vercel.**

### What is live, as measured

| URL | What it serves | How it was identified |
|---|---|---|
| `biswajitmohapatra.com` | A 489-byte HTML4 **frameset wrapping `http://biswajitmohapatra.wordpress.com`** | A records `15.197.225.128` / `3.33.251.168` (AWS registrar-forwarding range, not Pages/Netlify/Vercel); `Server: ip-100-74-5-75.eu-west-2.compute.internal` |
| `dr-biswajit-mohapatra.vercel.app` | **This site, current build** | `Server: Vercel`; serves the real homepage; also the repo's own `homepage` field |
| `debnathaiincorg.github.io/Dr.-Biswajit-Mohapatra/` | **Jekyll rendering `README.md`** — not this site | `generator: Jekyll v3.10.0`; `/robots.txt` and `/assets/css/main.css` both 404 |

So the production domain is on **registrar domain forwarding to a legacy
WordPress blog**. That is what `eleventy.config.js`'s `CNAME_DOMAIN` comment
means by "the production domain currently serves a different, live site" — it
is still literally true, and it is why that file is opt-in.

### Per-config status

- **`.github/workflows/deploy.yml`** (GitHub Actions → GitHub Pages) is
  hardwired to a *project-page* build: `SITE_URL: https://<owner>.github.io`,
  `PATH_PREFIX: /<repo>/`, `ALLOW_INDEXING: 'false'`. It never sets
  `CNAME_DOMAIN`, so it never writes a `CNAME` file — this pipeline is
  structurally incapable of serving `biswajitmohapatra.com` as committed.

  > **Its output is currently built and then discarded.** The workflow runs and
  > succeeds on every push, but a *second* workflow — GitHub's built-in `pages
  > build and deployment` — runs alongside it, and its existence means
  > **Settings → Pages → Source is still "Deploy from a branch"**, which is
  > exactly the step this workflow's own header comment tells you to change.
  > Jekyll's render of `README.md` is what gets published; the uploaded
  > artifact is not. Verified on the live URL, above. Flipping the Source to
  > "GitHub Actions" is a *repo setting*, not a code change — nothing in this
  > tree can fix it.

- **`netlify.toml`** sets no `SITE_URL`/`ALLOW_INDEXING` at all; its own
  header comment defers both to the Netlify UI. With nothing set, a Netlify
  build silently falls back to `site.ts`'s default
  (`https://biswajitmohapatra.com`). **This is the one genuine unknown left:**
  there is no external evidence that any Netlify site is attached to this repo
  at all. Do not delete `netlify.toml` as dead config without checking the
  dashboard — if a site *is* attached, removing it breaks that build.

  > An earlier revision of this section reasoned that Netlify's fallback
  > "happens to be the intended production domain." That proves nothing:
  > Vercel falls through to the identical default and is the one actually
  > serving. Matching the fallback is not evidence of being the live host.

- **`vercel.json`** sets `outputDirectory: dist`, `trailingSlash: true`, no
  `PATH_PREFIX` and no `ALLOW_INDEXING`. **It is the de facto host.** Its
  `buildCommand` carries `SITE_URL` as an environment prefix:

  ```
  "buildCommand": "SITE_URL=https://dr-biswajit-mohapatra.vercel.app npm run build"
  ```

  > **That prefix is load-bearing. Do not simplify it back to `npm run build`.**
  > Until 2026-09-16 the command had no prefix, so the build fell through to
  > `site.ts`'s default and every canonical, `og:url`, `og:image`, sitemap
  > `<loc>`, JSON-LD URL and the `Sitemap:` line on the live deployment named
  > `biswajitmohapatra.com` — the WordPress-forwarded domain above, which
  > returns **404 for `/awards/` and for `/assets/images/og-cover.jpg`**. So
  > the site was advertising a canonical that did not exist and a preview
  > image that did not load. `noindex` did not contain this: it stops search
  > indexing, but LinkedIn, X, WhatsApp and Slack read `og:` tags anyway, so
  > every shared link already rendered with a broken image and the wrong
  > domain attributed to it.
  >
  > The value is set in `vercel.json` rather than a dashboard variable
  > deliberately: a dashboard value is invisible to the repo, which is the
  > exact failure mode that left Netlify's status unverifiable below. JSON
  > takes no comments, which is why this note lives here.
  >
  > **At domain cutover this value changes with DNS, not before it.** A
  > canonical must point at a URL serving the same content, so it stays on the
  > `.vercel.app` origin for as long as that is what actually serves the site.
  >
  > `SITE_URL` reaches seven places, all absolute-URL metadata: `head.ts:14`
  > (canonical, `og:url`), `head.ts:15` (`og:image`, `twitter:image`),
  > `eleventyComputed.ts:33` (all JSON-LD), `sitemap.ts:18`, `robots.ts:16,32`
  > and `about.ts:25`. It never touches internal links, asset paths or the
  > manifest — those go through `url()`, which applies only `pathPrefix`. That
  > is why a wrong value cannot fail a build or break navigation, and why this
  > went unnoticed: it is silent by construction. Note also that
  > `SITE_URL=""` is **not** a safe way to unset it — the empty string is
  > falsy, so it hits the `||` default and silently restores the bug.

### Still open, and the standing warning

**Do not wire `CNAME_DOMAIN: biswajitmohapatra.com` into the GitHub Actions
workflow without first confirming no other host claims that domain** — two
hosts configured for the same custom domain is a DNS collision, and the loser
silently stops serving traffic with nothing in either config revealing why.
The domain is currently on registrar forwarding, so a cutover means changing
DNS at the registrar *and* deciding which of the three hosts wins. That
decision is still the site owner's; what is no longer open is *which one is
live today*.

**No longer placeholder — real content pass (this revision).** The fictional
"Speech Lab / Ashfield University" academic persona described earlier in this
file has been replaced sitewide with Dr. Mohapatra's real background, sourced
from his LinkedIn export and prior website copy (kept outside the published
tree, under `dr/`). His actual career is corporate technology leadership —
VP & Head of Product and Solutions Engineering at Intuitive.ai, previously
AWS (Head of Customer Solutions & CIO Advisory, India/South Asia), 15 years
at IBM, and earlier roles at Kanbay, Zensar and TCS — not speech science or
university teaching.

Because four of the 14 nav destinations (PhD Opportunities, Students, Alumni,
Courses) had no real equivalent in that career, they were repurposed rather
than left fictional or deleted — same nav slots, retargeted content, new
labels and URLs:

| Old (fictional) | New | Real content |
|---|---|---|
| PhD Opportunities (`/phd-opportunities/`) | Patents (`/patents/`) | IBM patent portfolio |
| Students (`/students/`) | Academic Engagement (`/academic-engagement/`) | Guest lectures, convocation appearances, Board of Studies |
| Alumni (`/alumni/`) | Board & Advisory (`/board-roles/`) | Ambassadorships, board seats, policy contributions |
| Courses (`/courses/`) | Certifications (`/certifications/`) | AWS/Azure/GCP/IBM/Gremlin certifications |

Contact (`/contact/`) no longer shows an email or office address — no public
professional email exists in the source material, so it points to LinkedIn
only. Its nav label, page title and `<h1>` also read **"Social"**, not
"Contact" — undocumented until now, but consistent and deliberate throughout
`src/contact.ts` and `src/_data/nav.ts`; the URL and filename stayed
`/contact/` and `contact.ts`. Gallery grew from 8 to 38 photographs (added award/certificate images
alongside the original event photos). Every other page (About, News, Awards,
Education, Experience, Publications, Projects, Activities) was rewritten in
place with real, dated, sourced content — nothing in `dr/` was fabricated or
guessed; gaps in the source material were left out rather than invented.

`allowIndexing` (see above) is still environment-controlled and still
defaults to `false` — populating real content did not flip it. That remains a
separate, explicit publishing decision for the site owner.

## Gallery rebuild — new material, new asset layout (2026-09-19)

The Gallery's 36 photographs were **replaced wholesale** with 14 photographs
and one video from the owner's own `ig/` export, at his request. The old set
was mostly multi-panel collages — one was six crops of a single frame, one was
300×300 — and three entries republished documents already served from `proof/`
under different filenames (`photo-10`, `photo-14`, `photo-15` duplicated
`proof-board-devops-institute-ambassador`, `proof-award-world-cio-200-2022`
and `proof-patent-cloud-services`).

Full reasoning, including which source images were rejected and why, is in
`docs/superpowers/specs/2026-09-19-gallery-media-refresh-design.md`.

### Ordering is no longer chronological

`photos.ts` used to document *"Ordered newest to oldest, undated entries
last."* **That is superseded.** The array is ordered *best first*, because the
owner asked for the strongest images at the top; `date` no longer drives
sequence. Dates are still evidence-only — a date appears only where it is
printed in the photograph or fixed by a visible role marker, otherwise the
entry renders an em dash rather than a guess.

### Five images moved to `proof/` rather than being deleted with the rest

`activities.ts` renders five photographs as row detail through its own figure
helper, and they were gallery slugs. Deleting the Gallery set would have
broken that page, so they moved into `proof/` — which is what they actually
are — and were renamed accordingly:

| Was | Now |
|---|---|
| `gallery-cii-dx-jury-2025` | `proof-award-cii-dx-jury-2025` |
| `photo-12` | `proof-activity-world-devops-summit-2020` |
| `photo-11` | `proof-activity-itsm-summit-2019` |
| `photo-3` | `proof-activity-devops-partner-days-2019` |
| `photo-4` | `proof-activity-pune-agile-unconference-2019` |

Their captions on Activities said *"the same photograph shown on Gallery."*
That is no longer true and the phrase was removed.

### `Photo.focus` — why gallery cards gained a field

`.photo-figure` is `aspect-ratio: 4/5` with `object-fit: cover`, so every card
image is centre-cropped to portrait. The old collages were square and never
showed this. **The new set is mostly landscape and it broke them**: centring
put the subject of `gcc-leadership-conclave` hard against the right edge,
partly cut. `focus` is optional, emits `object-position`, and is set on five
entries. The full frame is still served, so the lightbox shows the uncropped
photograph.

If a future landscape photograph looks wrong in its card, `focus` is the knob —
not a re-crop of the file.

### Video

One video, carried as a poster card that opens the existing `<dialog>`
lightbox. `photos.ts` exports a discriminated union (`GalleryItem = Photo |
GalleryVideo`) so it sits *in* the order rather than being appended; `photos`
is still exported as the stills-only view, so the homepage teaser is unchanged.

The card's `<a href>` points at the `.mp4`, so it still plays with JavaScript
off. `preload="none"` means the 9.8MB file costs nothing until clicked, and
the lightbox pauses and clears `src` on close so audio cannot outlive the
dialog.

> The footage is Kalinga TV's broadcast coverage of the book launch. Whether to
> self-host third-party broadcast material is the site owner's call; swapping
> the entry to a link-out is a one-line change.

**`src/assets/video/` needs its own passthrough-copy line in
`eleventy.config.js`.** It is not under `assets/images/`, so the existing sweep
did not pick it up and the first build silently produced a page referencing
three files that were never copied.

### 11 WebP files were being built and deployed but never requested

`row-list.ts` had a `PROOF_WEBP_SLUGS` directory scan so it only emitted a
`<source>` for a slug that actually had a WebP. But `lab-notes.ts` and
`activities.ts` render proof images too, both with a bare `<img>` — so every
WebP reachable only through those two files was dead weight.

That scan is now `src/_includes/lib/proof-picture.ts` and all three call sites
use it. **Use `proofPicture()` for any new inline proof image**; a bare `<img>`
silently wastes the WebP.

Four slugs remain WebP-less on purpose: a proof-*only* row renders as a link
with no `<img>` at all, and the lightbox opens `trigger.href`, which is always
the JPEG. Nothing can serve a WebP for those, so they have none.

### Asset layout

```
src/assets/images/{gallery,hero,publications,proof,logos,social}/
src/assets/video/
image-src/{gallery,hero,publications,proof,video}/   # mirrors the above
```

`image-src/README.md` records the exact ffmpeg commands each served asset was
produced with, and warns that the folder is **not** a complete archive — most
`proof/` images have no master there, and the logos and `og-cover.jpg` have
none at all.

`proof/` filenames keep their redundant `proof-` prefix deliberately: those
slugs are referenced across eight page templates, so renaming them is real
regression risk for a cosmetic gain. Gallery slugs live in one file, so they
dropped theirs when the folder took the name.

### Verifying asset paths

Every `src`/`href`/`poster`/`srcset`, every CSS `url()`, the manifest's icons
and the absolute `og:`/`twitter:` image URLs resolve against `dist/`, and
nothing under `dist/assets/` is unreferenced — checked in both the default and
`PATH_PREFIX` builds. A check that only scans `href`/`src` will report false
orphans: the manifest icons are JSON, and `og-cover.jpg` is only ever named as
an absolute URL.

## The lightbox opened top-left on every page (fixed 2026-09-19)

`components/lightbox.css` set `position: relative` on the `<dialog>` so that
`.proof-lightbox-close` could anchor to it. **That one declaration broke the
centring of every image and video on the site.**

A modal `<dialog>` is centred by three UA declarations acting together --
`position: fixed`, `inset: 0` and `margin: auto`, with width and height
resolving to `fit-content`. Override any one and the centring is gone:
`relative` puts the dialog back in normal flow, where auto block margins
compute to zero. Measured at 1440x900 before the fix, the viewer sat **0px
from the left with 524px of space on the right, and 0px from the top with
166px below**.

The close button never needed it — `fixed` is itself a positioned ancestor.

All five properties are now written out in that rule. **Do not trim them back
to the UA defaults**: the centring holds only while all five agree, and
leaving four implicit is exactly what let a single-property change reposition
every lightbox on the site without anything failing.

Measured after the fix, across landscape photographs, portrait photographs,
tall certificate scans and the video, at 1440x900, 1024x768 and 390x844:
left gap equals right gap and top equals bottom in **all 12 combinations**.

### The video also opened at the wrong shape

`<video>` with no loaded metadata takes its intrinsic size from its poster,
and `preload="none"` means metadata is never loaded until someone presses
play. The viewer was being handed the *card's* poster -- cropped to the 4:5
the grid enforces -- so it opened as a 559x724 portrait box and snapped to
landscape the moment the first bytes arrived.

There are now two posters, and `videoCard` explains which is which:

| File | Used by | Size |
|---|---|---|
| `<slug>-poster.jpg` / `.webp` | the grid card | 600x750, cropped to 4:5 |
| `<slug>-lightbox.jpg` | the `<video>` poster attribute | 848x480, the video's own frame |

The lightbox poster has no WebP sibling on purpose: it is a `poster`
attribute, not a `<picture>`, so a second format could never be selected.
