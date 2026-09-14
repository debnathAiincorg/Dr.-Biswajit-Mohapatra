# Depth layer: 3D motion, elevation, and the path-prefix repair

**Date:** 2026-09-12
**Status:** design, approved in chat
**Scope:** `src/assets/css/**`, `src/assets/js/**`, `src/_includes/components/row-list.ts`,
`src/_includes/content/lab-notes.ts`, `src/activities.ts`, `CLAUDE.md`

---

## 1. Why

Two separate asks, deliberately handled in one pass because the second is a
precondition for trusting the first.

**The site should read as more advanced and modern.** It currently animates on
one axis only: things fade and rise as they enter the viewport. That reveal
system is well built — armed by JS so a failed bundle degrades rather than
blanks, staggered by position within a batch, reduced-motion aware — but it is
flat. Every surface sits on the same plane, and nothing responds to the pointer.

**The docs had drifted, and one drift was hiding a live bug.** `CLAUDE.md`
states that *"every internal link goes through the `url` filter"*. Six call
sites do not. Under `PATH_PREFIX=/repo/` — which is exactly what
`.github/workflows/deploy.yml` is hardwired to build — **163 asset references
resolve to `/assets/…` instead of `/repo/assets/…`**. Every organisation logo
and all 38 proof images 404 on that pipeline.

Measured, not inferred:

```bash
$ MSYS_NO_PATHCONV=1 PATH_PREFIX=/repo/ SITE_URL=https://user.github.io npm run build
$ grep -roh 'href="/assets/[^"]*"\|src="/assets/[^"]*"' dist --include=*.html | wc -l
163
```

## 2. Non-goals

- **No palette change.** Cream `#EEE4DD` + terracotta + charcoal stand. The v2
  Fidelity Decisions are unchanged; the turn-1 light-palette requirement still
  governs. No dark mode, no dark toggle.
- **No WebGL, no new dependency.** Three.js tree-shakes to ~500KB–1MB against a
  current total JS+CSS payload of ~32KB. Rejected on budget and on tone: a
  scene-driven site reads as a creative-dev demo, not a CIO credibility surface.
- **No scroll-jacking.** No camera dolly, no pinned sections, no scroll
  narrative. Lenis smooth-scroll stays exactly as configured.
- **No markup changes for the tilt.** See §4.
- **No change to the indexing gate.** `allowIndexing` stays environment-
  controlled and still defaults to `false`.
- **Deploy-pipeline ownership stays unresolved.** §7 corrects the *count* of
  deploy configs in `CLAUDE.md`; it does not pick a winner. That still needs the
  site owner.

## 3. Research basis

Current practice for professional (as opposed to showcase) sites converges on
restraint: subtle, pointer-reactive depth rather than cinematic scenes, and
increasing use of native CSS for scroll-driven work. The governing line from the
2026 survey material — *"the best scroll animations feel inevitable; they
clarify what the content is saying, they don't decorate it"* — is the test each
effect below has to pass.

## 4. The central constraint, and the design that follows from it

`utils/reveal.css` carries an explicit rule, in a comment, about transform
ownership:

> This rule owns the `transform` channel for every revealed element, and
> `.is-visible` below resolves it to `none` at a specificity of three classes —
> so a hover rule writing `transform` would either lose outright or have to
> out-specify the reveal system and then restate its entrance.

That is why hover zoom uses the separate `scale` property. A 3D tilt needs two
axes (`rotateX` *and* `rotateY`), and CSS's individual `rotate` property takes
only one, so tilt cannot escape into its own property the way `scale` did.

Three options were considered:

| Option | Verdict |
|---|---|
| Add an inner wrapper element to every card and tilt that | Rejected — touches `card-grid.ts` and `projects.ts` markup, and `<div class="card project-card">` would need restructuring |
| Out-specify `.is-visible` and restate the entrance in the tilt rule | Rejected — precisely what the reveal comment warns against |
| **Make the reveal system's resting transform read from variables** | **Chosen** |

So `.is-visible` resolves to `rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))`
instead of `none`. With both variables unset the computed result is identical to
today. The reveal system remains the sole owner of the channel; tilt composes
into it through custom properties JS writes. **Zero markup changes.**

While a card is tracking the pointer, its transform transition duration drops to
`0s` so it follows the cursor 1:1 rather than lagging by the 0.78s reveal
duration; on `pointerleave` the transition is restored and the card eases back
to rest.

## 5. Surfaces

| Surface | Effect | Mechanism |
|---|---|---|
| Homepage hero | Three-layer cursor parallax: photo, scrim and copy translate at different rates | `--px`/`--py` written on `.hero-full`; `translate3d` per layer |
| Cards — gallery (38), projects, homepage teasers | Tilt to a ≤6° maximum, plus a cursor-tracked specular sheen | `--tilt-x`/`--tilt-y` per §4; sheen is a gradient pseudo-element positioned from the same variables |
| Row-lists — awards, patents, certifications, experience | Entrance gains a slight `rotateX`, so rows hinge up into place rather than sliding | Enriches the existing reveal start state; no new observer |
| Header | Elevation shadow deepens on scroll | Extends the existing `.is-scrolled` rule |

Warm-tinted shadows throughout — `rgba(43, 38, 34, …)`, the `--ink` hue — not
neutral black. A grey shadow on a cream ground reads muddy.

## 6. Failure and accessibility posture

Matched to the contract the codebase already keeps:

- **No JS** → no `--tilt-*`, no `--px/--py` → surfaces sit flat, exactly as today.
  The reveal fallback in `reveal-arm.js` is untouched.
- **`initDepth()` is individually `try/catch`ed** in `main.js`, alongside
  `initLightbox()` and `initFooterShuffle()`, so a throw here cannot take down
  the lightbox or the reveal system.
- **Reduced motion** is handled in both layers: the module returns early, *and*
  `tokens.css` zeroes the tilt and parallax variables under the existing
  `prefers-reduced-motion` block. Either alone would suffice; both means a
  future edit to one cannot silently re-enable motion.
- **Touch** → gated behind `(pointer: fine)`, so a tap cannot leave a card stuck
  mid-tilt.
- **Budget** → ~4KB added, no dependency.

## 7. Doc corrections

Five statements in `CLAUDE.md` contradict the code. All are corrected in place,
with the superseding fact stated rather than the old line deleted:

| Claim | Reality |
|---|---|
| "Google Fonts: **Inter only** … no serif face loaded on any of the 14 pages" | `head.ts:69` requests **Cinzel** 400/700/900; `header.css:120` applies it to `.site-title` |
| "**two** independent deploy configs" | **Three** — `vercel.json` exists and no MD file mentions it |
| "there is no `docs/` directory" | `docs/` exists and holds the 2026-08-31 spec |
| "The gallery **is 8** unique photographs" | **38**, contradicted 75 lines later in the same file |
| "the whole site now loads in **~290KB**" | `dist/` totals **14MB** (8.7MB proof, 4.2MB photos). Per-page weight is still small; the sitewide figure was never re-measured after the gallery grew |

## 8. Verification

No claim of completion without these, in order:

1. `npm run typecheck` — clean
2. `npm run build` — 18 files
3. `node scripts/check-links.mjs` — 16/16
4. Prefixed build asserting **0** unprefixed `/assets` references (currently 163)
5. Serve `dist/` and confirm the hero, a card grid and a row-list render and
   animate, and that the page is intact with JS disabled
