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
headings (Playfair Display) + sans body (Inter), and a neutral **light** palette (white/cream
background, charcoal text, one accent color). The re-audit shows the reference site itself
uses a non-sticky header, an all-sans typeface, and alternates dark-photo/light-band sections.
Rather than silently picking one, here's the resolution:

| Conflict | Reference does | Your standing spec says | Decision |
|---|---|---|---|
| Header stickiness | `position: absolute`, scrolls away | "Sticky top nav" (explicit, turn 1) | **Keep sticky** — your explicit requirement wins, and with 14 nav destinations a persistent nav is a practical necessity, not just a style preference |
| Palette / dark hero band | Alternating black/bright sections, white text on hero photo | "white/cream bg, charcoal text, one accent color" (explicit, turn 1) | **Keep the light palette** — your explicit requirement wins; we do not adopt the dark hero-overlay treatment |
| Typeface | All-sans (`halyard-display`) | "Serif headings (Playfair Display), sans body (Inter)" (explicit, turn 1) | **Keep the serif/sans pairing** — your explicit requirement wins; we adopt the reference's *numeric ratios* (line-height ratios, letter-spacing scale) translated onto our fonts, not its actual typeface |
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

## Tech Approach

- Plain **HTML5 + CSS3 + vanilla JS**, no frameworks, no build step.
- **Multi-page**: `index.html` + 13 standalone pages, sharing `styles.css` and `script.js` (see
  Multi-Page Architecture above for the sharing decision and reasoning).
- Semantic HTML5 landmarks on every page: `<header>`, `<nav>`, `<main>`, one or more
  `<section>`s, `<footer>`.
- Placeholder images from `https://placehold.co`, plus one real image (`image/1.png`) used as
  the About/hero portrait per your direct instruction — noted here since it's the one departure
  from "placeholder images only," made deliberately at your request, not by default.
- Google Fonts: **Playfair Display** (serif, headings) + **Inter** (sans-serif, body/UI) —
  unchanged, per your standing instruction (see Fidelity Decisions).
- CSS custom properties for palette/type scale, tuned to the re-audit's measured ratios
  (line-height ~1.6 for body copy, ~0.97–1.05 for large headings, container max-width 1300px),
  now living in `styles.css`.
- Sticky header (kept, per Fidelity Decisions), with its own raised breakpoint for the 14-item
  nav — same 1560px threshold, now shared identically across all 14 pages via `styles.css`.
- Vanilla JS in `script.js`: mobile/overflow menu toggle, sticky-header shadow-on-scroll,
  scroll-reveal for card grids, plus a new small addition — marking the current page's nav link
  with `aria-current="page"` (detected from `location.pathname`) so each page's nav shows where
  you are, a natural expectation once there are real separate pages to be "on."

## Constraints

- **No real content from the source site**: no real names, bios, quotes, headlines, article/
  paper titles, captions, dates tied to real events, or images pulled from indranooyi.com.
- All names/titles/captions/course names/paper titles must read as plainly fictional/
  placeholder, on every page.
- All images must be placeholder services (placehold.co or equivalent), except the one real
  image explicitly requested for the About/hero portrait.
- Structural/layout and numeric-spacing similarity is the goal; visual asset and color-theme
  similarity is not (see Fidelity Decisions).
- Multi-page deliverable: `index.html` + 13 page files + `styles.css` + `script.js` (see
  Multi-Page Architecture above) — supersedes the earlier "single file" constraint, which was
  scoped to the one-page version of this project.
