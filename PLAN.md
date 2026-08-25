# PLAN.md — v3

Everything below "Nav Strategy — 14 items" is the v2 plan and still applies (design tokens,
component styles, per-section content mechanics are unchanged, per `CLAUDE.md`). This v3
section on top covers the new work: converting the single `index.html` into 14 files.

## Multi-Page Conversion Plan

### Files to create/change

| File | Content |
|---|---|
| `index.html` | **Rebuilt.** About/hero (unchanged content) + new "From the Lab" teaser section (3 cards → News, PhD Opportunities, Gallery). No other in-page sections. |
| `phd-opportunities.html` | PhD Opportunities panel content, standalone. |
| `news.html` | News/Lab Notes panel content, standalone. |
| `awards.html` | Awards list-row content, standalone. |
| `education.html` | Education list-row content, standalone. |
| `experience.html` | Experience list-row content, standalone. |
| `publications.html` | Publications list-row content, standalone. |
| `projects.html` | Projects card-grid content, standalone. |
| `students.html` | Students card-grid content, standalone. |
| `alumni.html` | Alumni list-row content, standalone. Filename is clean (`alumni.html`); the section keeps `id="speech-lab-alumni"` internally since you said that's fine, but the nav link itself just points to `alumni.html` (no fragment needed — it's the only section on the page). |
| `gallery.html` | Gallery card-grid content (9 photo cards), standalone. |
| `courses.html` | Courses list-row content, standalone. |
| `activities.html` | Activities list-row content, standalone. |
| `contact.html` | Contact content, standalone. |
| `styles.css` | **New.** All shared CSS extracted from the old embedded `<style>` block — design tokens, header/nav/footer, all component classes (`.row-list`, `.card-grid`, `.panel`, etc.), all breakpoints. |
| `script.js` | **New.** All shared JS extracted from the old embedded `<script>` block — header scroll shadow, burger/mobile-panel toggle, card scroll-reveal — plus one small addition: active-nav-link marking (see below). |
| `image/1.png` | Unchanged, still the About/hero portrait, referenced by relative path from `index.html` same as before. |

13 new page files + 1 rebuilt `index.html` + 2 new shared asset files = **16 files touched**.

### Nav link targets (every page, identical)

`About → index.html#about` (per your instruction, staying as a homepage anchor since About
lives there), then `phd-opportunities.html`, `news.html`, `awards.html`, `education.html`,
`experience.html`, `publications.html`, `projects.html`, `students.html`, `alumni.html`,
`gallery.html`, `courses.html`, `activities.html`, `contact.html` — plain filenames, no
fragments, since each is the only content section on its page. Logo now links to `index.html`
on every page (was a no-op `href="#top"` in the single-page version — fixed as part of this
conversion, since a multi-page site needs a real "go home" link).

### How the 14 files stay byte-identical for shared markup

There's no server-side include or client-side templating in play (see `CLAUDE.md` for why —
no build step was requested, and a JS-fetched-partial approach breaks under `file://`). To
still guarantee the header/nav/footer markup is identical across all 14 files without
hand-typing it 14 times (and risking a typo drifting one page's nav out of sync), I'm writing
one Node script (`generate-pages.js`, kept in the scratchpad, not shipped as part of the site)
that defines the shared header/nav/footer HTML once and the 14 pages' unique body content
once each, then writes out all 14 `.html` files from those pieces. This is a dev-time authoring
aid, functionally equivalent to hand-writing 14 consistent files, just with a consistency
guarantee hand-typing can't give.

### Active nav-link indicator (small addition, not asked for explicitly but a natural gap)

Once there are real separate pages, a nav with no indication of "which page am I on" is a
small but real UX gap versus the single-page version (where scroll position + `:focus`/hover
gave you some sense of location). Adding: `script.js` compares `location.pathname` against
each nav link's `href` on load and sets `aria-current="page"` on the match, with a small CSS
rule (`.nav-links a[aria-current="page"]`, `.mobile-panel a[aria-current="page"]`) giving it a
persistent underline/terracotta color — same visual language as the existing hover state, just
persistent instead of hover-only.

## Responsive Web Design Audit Plan

Breakpoints to verify, per your spec: mobile (~375–430px), tablet (~768–1024px), laptop
(~1280–1440px), large desktop (~1600px+), plus the nav's own 1560px crossover specifically.

**Pages to test** (not just `index.html`): `index.html` (hero + new teaser grid),
`publications.html` (list-row only, tests a list-row page with nothing else around it),
`students.html` (card-grid with avatar images, tests a short page where the grid is the only
content), `gallery.html` (card-grid at full 9-card count, the heaviest single page),
`contact.html` (shortest page — tests whether a very short page still looks intentional, not
like something's missing).

**What to check per page/breakpoint:**
- Nav: hamburger vs. inline row crossover exactly at 1560px, on at least two different pages
  (not just index), to confirm the shared stylesheet behaves identically everywhere.
- Grids (`card-grid` on Projects/Students/Gallery/index-teasers): 3→2→1 column collapse at
  1024px/768px, checked on the pages that actually use it standalone, not only embedded in a
  long page.
- List-rows (Publications, Awards, etc.): row wrapping behavior at mobile width, checked on a
  page where the list is the *only* content (no neighboring sections whose spacing it might
  have been visually leaning on before).
- Scroll-reveal timing: on a short standalone page, a card-grid may already be inside the
  viewport on load (no scroll needed to trigger `IntersectionObserver`) — confirm cards still
  reveal correctly (they should: `IntersectionObserver` fires on initial connect if already
  intersecting, but this needs an actual check, not an assumption).
- Images: confirm `width`/`height` attributes + `max-width:100%` still prevent layout shift and
  overflow now that some images sit on much shorter pages.
- Touch targets: measure actual rendered size of the burger button, mobile nav-panel links, and
  buttons — WCAG/Apple HIG guidance is ~44×44px CSS pixels minimum. The burger button is
  currently 32×32px and social icons are 28×28px, both under that — **bumping burger to 44×44px
  and social icons to 36×36px** as part of this pass, not just noting the gap.
- Console errors: zero expected on every page/viewport combination tested.

All of this gets tested with real Playwright viewport resizing against the actual built pages,
same rigor as the prior verification pass, not inferred from reading the CSS.

## Nav Strategy — 14 items (decision, made before building)

The reference site's nav only has to fit 6 items and switches to a hamburger at exactly
**768px** (measured). Copying that breakpoint verbatim would mean our 14-item nav tries to
cram 14 labels + logo + 2 social icons into the same space 6 items used, which wraps/overflows
well before 768px.

**Chosen approach: raise the hamburger breakpoint, don't wrap or scroll the nav.** Wrapping a
primary nav to a second line looks broken; a horizontally-scrolling primary nav is a poor
pattern for a wayfinding menu. Instead:

- Built a throwaway static test page with the real 14 labels, our actual nav typography
  (Inter, ~0.72rem, uppercase, 0.05em tracking, 0.85rem gap), logo, and 2 social icons, and
  measured its natural (non-wrapping) width in a real browser: **logo 153px + gap 16px + nav
  1112px + gap 16px + actions 67px + container padding ~96px (at ≥1200px viewport, our
  `clamp(1.25rem,4vw,3rem)` side padding maxes at 48px/side) ≈ 1460px minimum.**
- **Hamburger breakpoint set to 1560px** (~100px safety margin above the measured 1460px
  minimum, to avoid a knife-edge fit and leave room for real-font rendering variance).
- Below 1560px (this now covers what used to be "desktop" in v1 — 1024–1559px — plus tablet
  and mobile), the nav collapses into the existing hamburger + slide-down panel pattern from
  v1. Above 1560px, all 14 items show in one non-wrapping row.
- This means most real-world desktop windows (a maximized 1440px or 1366px laptop screen) will
  see the hamburger menu, not the inline nav — an accepted tradeoff of fitting 14 items
  without wrapping/scrolling. Flagging this explicitly since it's a real behavior change from
  v1, where the inline nav was visible on any standard desktop width.
- On the ≥1560px inline nav, spacing is tightened vs. what 6 items could afford: nav gap
  ~0.85rem (was ~2rem), font-size ~0.72rem, letter-spacing ~0.05em.

## Design Tokens — updated from re-audit (see CLAUDE.md → Fidelity Decisions)

- Container `max-width`: **1300px** (was 1220px; matches reference's measured
  `.content-wrapper` max-width).
- Body/paragraph `line-height`: **1.6** (was 1.7; matches reference's measured 20.8px/33.28px
  ratio).
- Large heading `line-height`: tightened toward **~1.05** for the hero H1 (reference measured
  an even tighter 0.97, but that's on a sans-serif at 500 weight — the heading face needs a
  little more room before descenders/ascenders start clipping, so 1.05 is the closest safe
  value, not the literal reference number — noted as an approximation). Headings render in
  Inter sitewide as of commit `a4cfabf`, which retired the Playfair Display face this note
  originally cited.
- Button: `border-radius` reduced to **1px** (was 3px; reference is a hard 0px square, but a
  hairline radius keeps our buttons from looking visually harsh against rounded card corners
  elsewhere on the page — a deliberate near-match, not the literal value).
- Button letter-spacing: reduced to **0.03em** (was 0.04em; reference measured a much subtler
  0.285px ≈ 0.02em at their font-size — split the difference since our button label text is a
  little longer ("Order Book Now" vs. their shorter labels) and needs slightly more tracking
  to read cleanly at this weight).
- Nav links: switch from **uppercase, letter-spaced, 0.78rem** (v1) to **normal case, 0.72rem
  desktop nav / ~0.95rem elsewhere, weight 500–600, 0.03em tracking** (was 0.09em) — closer to
  the reference's measured normal-case/16px/300-weight/0.8px-tracking nav, adapted to Inter at
  a heavier weight than 300 for legibility at our smaller nav font-size.
- Gallery grid gap: tightened to **~1.25rem** at desktop (was ~2.25rem; reference's masonry
  uses a tight 13px gap — we don't go that tight since our cards are larger fixed-width grid
  cells, not masonry bricks, but move meaningfully closer).
- Gallery caption: **not italic** (was italic in v1) — reference measured `font-style: normal`.
  Renders in upright Inter — the sitewide face as of commit `a4cfabf`, which replaced the
  Playfair Display this note originally specified — with the italic treatment dropped to match
  what was actually measured.
- Social icon size: **28px** (was 32px; reference measured 21px — split the difference for
  touch-target comfort, noted as approximate).
- Header: **stays sticky** (`position: sticky`, kept per Fidelity Decisions), gains its own
  1560px breakpoint for the nav specifically (separate from the 768px hamburger-panel content
  breakpoint used everywhere else on the page, e.g. gallery/card grids).

## Build Steps

1. **Document skeleton & design tokens** — update the existing `:root` custom properties per
   the table above (container width, line-heights, button radius/tracking, nav typography,
   gallery gap, social icon size). Keep Inter for both headings and body (serif Playfair
   Display retired sitewide as of commit `a4cfabf` — see CLAUDE.md → Fidelity Decisions), keep
   the light palette.

2. **Nav bar (rework)**
   - Logo left (unchanged position).
   - `<nav>` with all **14** links in nav order (see `SECTIONS.md` for the full anchor list),
     normal-case typography per the tokens above.
   - 2 social icons far right (unchanged).
   - Sticky header (unchanged mechanic), but hamburger breakpoint moves from 768px → **1560px**
     for the nav row specifically.
   - Mobile/collapsed panel now lists all 14 links — likely needs to scroll internally on short
     viewports (panel `max-height` + `overflow-y: auto`), since 14 full-width rows may exceed
     a typical mobile screen height. This is a new v2 concern v1 didn't have with 6 items.

3. **About section (rebuilt hero)** — id `about`. Same structural mechanic as v1's hero
   (eyebrow, headline, lede, two CTAs, secondary link row, offset-frame portrait image), CTAs
   relabeled **"View CV (PDF)"** / **"Prospective PhD Students"** (→ `#phd-opportunities`),
   secondary row relabeled "Affiliated with" (fictional consortia/orgs) replacing v1's
   retailer links. Copy updated per `SECTIONS.md`'s persona (Professor & Director, Speech Lab).

4. **PhD Opportunities** — id `phd-opportunities`. New callout panel (same component family as
   the News panel below): blurb + 3-item bullet list of fictional research areas + "Get in
   Touch" button → `#contact`.

5. **News** (renamed from v1's "Newsletter callout") — id `news`. Same list+subscribe-button
   mechanic as v1, heading changed to "Lab Notes," 4 fictional dated news items, button
   relabeled "Subscribe to Lab Updates."

6. **Awards** — id `awards`. List-row component, 4 fictional entries (title / body / year).

7. **Education** — id `education`. List-row component, 3 fictional entries (degree /
   institution / year).

8. **Experience** — id `experience`. List-row component, 4 fictional entries (title /
   organization / years).

9. **Publications** — id `publications`. List-row component, 6 fictional paper entries +
   1 memoir entry tagged distinctly ("Trade nonfiction").

10. **Projects** — id `projects`. Card-grid component (reuses gallery-card visual family),
    3 cards: project name, one-line description, status tag.

11. **Students** — id `students`. Card-grid component, 4 cards with placeholder headshot
    (placehold.co), name, role, one-line focus.

12. **Alumni** — id `speech-lab-alumni` (nav label "Alumni", anchor id per your spec). List-row
    component, 5 entries (name / now-at / year).

13. **Gallery** — id `gallery`. Unchanged mechanic from v1 (3-col/1-col grid, 9 cards, upright
    — not italic — serif caption + date), captions reframed to lab/academic events.

14. **Courses** — id `courses`. List-row component, 4 fictional courses (code + title / term).

15. **Activities** — id `activities`. List-row component, 4 fictional service/outreach items.

16. **Contact** — id `contact`. New small dedicated section (not just the footer): placeholder
    email, placeholder office/address, one-line "get in touch" copy.

17. **Footer** — unchanged from v1 (centered social icons, copyright, image-credit line).

18. **Responsive behavior**
    - Nav: hamburger below **1560px** (new — see Nav Strategy above), mobile panel scrollable.
    - All other breakpoints (gallery/card grids, hero stacking) stay at the v1 values (1024px,
      768px) — those weren't in conflict with anything the re-audit found, and 768px matches
      the reference's own measured crossover for its (smaller) nav, which is a reasonable
      general-purpose breakpoint to keep for content grids even though the nav itself now uses
      a different threshold.
    - Card grids (Projects, Students) follow the same 3→2→1 (desktop→tablet→mobile) pattern as
      the photo gallery, for visual consistency across the page.

19. **Polish / animations** — unchanged approach from v1 (hover states, scroll-reveal via
    `IntersectionObserver`, focus-visible, reduced-motion respect), extended to the new
    list-row and card-grid sections so all 14 sections feel like one system, not a patchwork.

## Requirements Checklist

- [ ] Sticky nav, logo left, **14-item** nav (exact labels/anchors from your message, in
      order), 2 social icons far right, hamburger below 1560px (raised from 768px, justified
      above), scrollable mobile panel
- [ ] About (hero) — photo placeholder, headline + description, two CTAs, secondary link row
- [ ] PhD Opportunities — callout panel, blurb, research-area list, CTA to Contact
- [ ] News — 4 dated items list + subscribe button (carries forward the "newsletter section"
      requirement)
- [ ] Awards, Education, Experience, Publications, Alumni, Courses, Activities — list-row
      sections, fictional content per `SECTIONS.md`
- [ ] Projects, Students — card-grid sections, fictional content per `SECTIONS.md`
- [ ] Gallery — 3-col/1-col grid, 9 cards, upright caption + date (italic dropped per re-audit
      finding; caption face was Playfair Display, now Inter sitewide as of commit `a4cfabf`)
- [ ] Contact — dedicated section with placeholder email/address
- [ ] Footer — unchanged (social icons, copyright, credit line)
- [ ] Editorial, whitespace-heavy aesthetic; light palette retained; Inter retained sitewide
      for both headings and body (Playfair Display retired as of commit `a4cfabf` — per
      Fidelity Decisions)
- [ ] Container width, line-height ratios, button radius/tracking, gallery gap, nav typography
      updated per the re-audit's measured values (see tokens table above)
- [ ] Fully responsive; hamburger below 1560px for nav, 768px/1024px retained for content grids
- [ ] Semantic HTML5, single file, no frameworks
- [ ] No real content/images from indranooyi.com anywhere, including the new academic sections

## Open Items / Assumptions Carried Into Build

- 1560px nav breakpoint is derived from a measured test render of the real 14 labels in our
  actual typography — if real-browser kerning differs slightly, I'll re-check during the
  verification passes and adjust if the nav is still tight/loose at that threshold.
- Persona pivot (memoir author → professor/lab director, book kept as a minor thread) is a
  judgment call made to reconcile the new nav taxonomy with a coherent single person — flagged
  in `CLAUDE.md`, open to a different framing if you'd rather.
- Section order = nav order (judgment call, see `SECTIONS.md` header note).
