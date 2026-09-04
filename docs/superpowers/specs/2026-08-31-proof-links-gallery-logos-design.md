# Proof links, gallery repair, organisation logos, professionalism pass

**Date:** 2026-08-31
**Status:** design, awaiting implementation plan
**Scope:** `src/**`, `scripts/**`, `dr/` (read-only source), `image-src/` (new masters)

---

## 1. Why

The v6 content pass replaced the fictional persona with Dr. Mohapatra's real
career, but it was **text-only**. Every claim on the site — thirty awards, a
patent, eleven certifications, sixteen speaking engagements — is currently an
unsourced assertion. For a credibility site that is the one thing that matters,
and the material to fix it was already in the repository, unread: the two
`.docx` files in `dr/` carry roughly ninety embedded hyperlinks.

Three further problems, found while surveying:

- **A live factual error.** `photo-8` is captioned "Receiving a commemorative
  plaque at a DevOps Institute event". The backdrop in the photograph reads
  *Nirmaan* / *IIM Sirmaur*, and the image is byte-identical to the bottom
  panel of `photo-5`, which is correctly captioned as the Nirmaan Leadership
  Summit at IIM Sirmaur. The site shows the same photograph twice under two
  captions, one of which is wrong.
- **Two more granted US patents and two Oracle certifications** exist and are
  absent from the site. The Patents page claims one patent; there are three.
- `dr/linkdin1/` — 26 unique photographs, none of them used anywhere.

## 2. Non-goals

- No redesign. The v2 Fidelity Decisions, the measured type scale, the palette
  and the sticky-header treatment all stand unchanged. The professionalism pass
  in §8 is a refinement pass with a fixed, enumerated list of changes.
- No new dependencies in the shipped output. `sharp` enters as a
  **devDependency** used by an offline script; it never reaches `dist/`.
- No change to the indexing gate. `allowIndexing` stays environment-controlled
  and still defaults to `false`.
- Deploy-pipeline ownership stays unresolved and untouched (see CLAUDE.md).

## 3. The governing rule: nothing ships unverified

This is the constraint the whole design is built around, because it is the one
the user stated twice.

1. **Every URL is fetched before it ships.** `scripts/check-links.mjs` walks
   the source registry, requests each URL, and reports status. A URL that does
   not answer 2xx (following redirects) does not ship. The claim stays, as
   text, with no link.
2. **Every claim is cross-checked against a known fact** — Intuitive.ai, AWS,
   IBM, TCS, IIT Bombay, or a named award — before it is attributed to him.
   `Biswajit Mohapatra` is a common name. The English Wikipedia article under
   that exact name is **an Odia playback singer born in 1992**. It will not be
   linked, and it is recorded here so nobody links it later.
3. **Anything that cannot be verified is reported to the user, not guessed.**
   §10 is that list.

Two casualties already identified:

| Item | Why it cannot ship |
|---|---|
| IIBA Pune board membership | `pune.iiba.org` no longer resolves (`ENOTFOUND`). Claim stays text-only. |
| Wikipedia "Biswajit Mohapatra" | Different person entirely. Never link. |

## 4. The source model

One new module, `src/_includes/content/sources.ts`, is the single registry of
external proof. Nothing else in `src/` hard-codes an external URL.

```ts
export interface Source {
  /** Where the proof lives, as a reader would name it: "Google Patents". */
  readonly label: string;
  readonly url: string;
  /** Groups the entry in the aside and picks its glyph. */
  readonly kind: 'patent' | 'credential' | 'press' | 'organisation' | 'article' | 'event';
  /** Shown under the label in the aside; derived from the URL if omitted. */
  readonly host?: string;
}
```

Why a registry rather than a URL on each row: several sources prove more than
one claim (the AWS APN Ambassador post proves both an award and a board role;
the Open Source India speaker page proves a talk and a publication). A registry
lets both cite the same record without the URL being written twice and drifting.

`Row` gains two optional fields — a public URL, an image, or both:

```ts
readonly source?: Source;
/** Slug under /assets/images/proof, when a certificate or award photograph
 *  is the evidence. Opens full-size in the lightbox. */
readonly proofImage?: ProofImage;
```

`Photo` gains `source?`, plus the dimensions needed for the lightbox.

### Award photographs are proof

`dr/AWARDS  website/` holds **19 award photographs at 768–1024px**, each named
for the award and dated in its filename — "CIO of the Year 2021 Award at 4th
Leadership Summit and Awards 2021 (29.05.2021)". Most of those awards have no
public announcement page that survives, so the photograph *is* the record.

This is the case the user singled out: where a document is the only proof, keep
the image as the proof and make it viewable at full size rather than inventing
a link. So an award row with no public URL carries a `proofImage` instead, and
its glyph opens the photograph in the same lightbox the gallery uses — not a
separate mechanism.

These 19 images do **not** all enter the gallery. Adding them would take it from
12 photographs to 40 and turn a curated highlights page into a filing cabinet.
They live under `assets/images/proof/`, reachable from the award they document;
the gallery takes only the handful that stand on their own as photographs.

#### One proof image is already prepared and redacted

An exhaustive sweep of `dr/` for certification evidence — all 95 files across
every subfolder, plus the images embedded inside both `.docx` archives — turned
up exactly one match: `dr/linkdin2/Independent Director Certification.png`,
the IICA *Independent Director's Databank* certificate (name, credential ID
`IDDB-NR-202504-072447`, dated 12 March 2026, signed by the DG & CEO).

It could not be published as it stood. The original carries
`Applicant Email: <his personal gmail>` along the bottom, and this site
deliberately publishes no personal address — Contact points to LinkedIn only,
precisely because no professional address exists in the source material.

So the master in `image-src/proof-iica-independent-director.png` is cropped:
`1364×1929 → 1336×1216`, keeping source rows 306–1521 and columns 13–1348. That
retains the issuing body, the name, the credential ID, the qualification text,
the date and the signature block, and cuts above the email line, which begins
at source row 1547. The cut is 24px below `DG & CEO IICA` and 26px above the
redacted text.

The crop is reproducible rather than a one-off hand edit —
`scripts/crop-png.mjs` regenerates it from the untouched original, so what was
removed and what was kept stays auditable:

```bash
node scripts/crop-png.mjs \
  "dr/linkdin2/Independent Director Certification.png" \
  "image-src/proof-iica-independent-director.png" \
  13 306 1336 1216
```

This becomes the **first** `proofImage` on Certifications once the pattern
below is approved and built. It is deliberately not wired in yet, so that it
and the 19 award photographs land on one pattern rather than as a one-off.

## 5. Inline proof links

A row with a `source` renders as an anchor instead of a static span.

This is what `components/row-list.css` was already built for — it carries
`.row-list a`, `.row-list a:hover` and `.row-list a:focus-visible` rules that
nothing currently matches. The file's own comment explains why rows are not
clickable today:

> No pointer cursor and no underline, deliberately. These rows are not
> clickable, so either would promise a destination that does not exist.

That reasoning **inverts** for a row that now has a destination, so linked rows
get the pointer, and an external-link glyph after the title marks them as
leaving the site. Unlinked rows are untouched: no glyph, no pointer, exactly as
today. The distinction is the point — a visitor can see at a glance which
claims carry a public record.

Markup for a linked row:

```html
<li class="reveal">
  <a class="row-static" href="…" target="_blank" rel="noopener noreferrer">
    <span class="row-title">Title<svg class="row-proof-glyph" …/><span class="row-sub">…</span></span>
    <time class="row-meta" datetime="…">…</time>
  </a>
</li>
```

The anchor replaces `.row-static` rather than nesting inside it, because the
existing CSS makes `.row-list a` and `.row-list .row-static` the same flex
container. Keeping the class on the anchor means one rule set, not two.

`aria-label` is not added. The link text is the award name, which is already
the accessible name; the glyph carries `aria-hidden="true"` and the
"opens in a new tab" fact is conveyed by a visually-hidden suffix span so it
reaches screen readers without duplicating the visible title.

## 6. The Sources aside

A two-column shell, `components/page-with-aside.ts`, wraps a page body and an
aside:

```
≥1024px:  grid-template-columns: minmax(0, 1fr) clamp(240px, 22vw, 300px)
          aside is position: sticky; top: 96px  (clears the 72px sticky header)
<1024px:  single column; aside follows the content, separated by a 1px --line
          rule, not sticky
```

The aside is not a generic box. It is built from components the site already
has, so it reads as part of the same system:

- opens with the same `.eyebrow` every `.content-head` and `.panel` opens with,
  reading **Verify**;
- an `h2` at the `.panel h2` size;
- one sentence of `--ink-soft` explanatory copy, matching `.content-head p`;
- a list of `.text-link` anchors — the existing drawn-hairline link gesture from
  `components/links.css`, unchanged;
- each entry shows its label and, beneath it in `--ink-soft` at `.row-meta`
  size, the bare host (`patents.google.com`), so a reader can see where a link
  goes before clicking it.

Pages receiving it: **Awards, Certifications, Patents, Publications,
Experience** (the five the user named), plus **Activities** and
**Board & Advisory**, which turned out to have the most verifiable sources of
any page and would look arbitrary without one.

### Patents changes shape

Patents currently renders as a centred `.panel` band with a single bullet —
correct when there was one patent. With three granted patents and three IP.com
defensive publications it becomes a `content-section` + `row-list`, matching
the other credential pages, and gains the aside. This is a consequence of the
content growing, not a redesign.

## 7. Gallery

### Removals

| Slug | Reason |
|---|---|
| `photo-8` | Byte-identical to a panel inside `photo-5`, and **mis-captioned** (§1). |
| `photo-9` | 384×256, blurry video-still selfie; already present as a panel inside `photo-1`. |
| `photo-11` | 300×300, too dark and small to read. Checked `dr/GALLERY  website/ITSM Summit 2019.webp` for a better master — it is also 300×300, so there is none. Dropped. |

### Additions from `dr/linkdin1/`

Only photographs whose event is legible **in the image itself** are added; a
caption is never inferred. Identified and admitted:

| Source file | Content |
|---|---|
| `1699001506242.jpg` | CII CIO Conclave & Awards, New Delhi, 2 Nov 2023 |
| `1766177694344.jpg` | CII DX Awards & Summit — jury certificate, New Delhi, 3 Dec |
| `1787175309852.jpg` | Enterprise IT World CIO500 & Accelerator X Awards 2026, Pune |
| `1787298916910.jpg` | GCC Expo award ceremony 2026, Bengaluru — richer than `photo-13` |
| `1765044513138.jpg` | The Telegraph / INFOCOM 2025 keynote press clipping, 28 Nov 2025 |
| `1765655096999.jpg` | AWS Student Community Day, Silver Oak University, 2025 |
| `1765863213418.jpg` | AWS Student Community Day, Parul University, 2025 |
| `1784690176302.jpg` | Panel, Symbiosis International (Deemed University) |
| `1729299952779.jpg` | Global STEM Education Expo 2024 |
| `1783842017309.jpg` | GCC Leadership Conclave |
| `1727285165922.jpg` | Route Amplify 2.0 speaker card, Mumbai, 27 Sep 2024 |
| `1779121320023.jpg` | STPI roundtable |

Excluded and why: casual lobby and colleague photographs (`1787966414971`,
`1776909291871`), the Google Cloud Next "Catalyst" persona card
(`1776830476816` — marketing novelty, proves nothing), the AWS-jacket portrait
against domestic curtains (`1710007502462`), and every frame whose event I
could not read (`1701394952192`, `1776165174957`, `1780102333389`,
`1748977118390`, `1763715591375`, `1780758596527`, `1780831422276`).

### Full-size viewing

Certificates and the newspaper clipping are only proof if they can be read, so
each gallery figure becomes a link to its own full-size JPEG:

```html
<a class="photo-zoom" href="/assets/images/photos/photo-N.jpg"> …<picture>… </a>
```

`assets/js/modules/lightbox.js` intercepts the click and opens a native
`<dialog>`. Native, so focus trapping, `Esc`, and the top layer come from the
platform rather than from hand-written JS. Progressive enhancement: with JS
off or the module failed, the anchor still opens the full-resolution image.
The dialog honours `prefers-reduced-motion` through the existing token block.

### Image pipeline

`scripts/build-photos.mjs` (new, dev-only) converts masters to the `.webp` +
`.jpg` pair the site serves, using `sharp` as a devDependency. Masters land in
`image-src/`, which is already outside the build. This replaces whatever
manual step produced the current set and makes the next photo a one-command job.

## 8. Logos

`src/assets/images/logos/<slug>.svg`, fetched from official brand pages or
Wikimedia Commons. Verified fetchable during design: IBM, AWS, Google. Any
organisation whose authentic mark cannot be found **gets no logo** — per the
approved option, there is no monogram fallback and no redrawn approximation.

Rendered by `components/org-logo.ts` into the row's leading slot:

```css
.org-logo { height: 20px; width: auto; max-width: 84px; object-fit: contain;
            opacity: 0.78; transition: opacity var(--hover-duration) var(--ease); }
.row-list li:hover .org-logo { opacity: 1; }
```

Fixed height, not fixed width, so marks with different aspect ratios sit on one
optical baseline. Opacity is the only treatment applied — no recolouring, no
greyscale filter, since many brand guidelines forbid altering mark colour, and
opacity is a rendering choice rather than a modification of the mark.

`alt=""`, because the organisation's name is in the adjacent text and an
`alt="IBM logo"` would make a screen reader say "IBM" twice.

Pages: **Experience** (employers), **Certifications** (issuers),
**Board & Advisory** (organisations), **Academic Engagement** (hosts, where a
mark exists).

Responsive: the row is a flex container that already collapses to
`flex-direction: column` at ≤768px, so the logo stacks above the title. The
fixed 20px height means it cannot force a horizontal overflow at any width.

## 9. Professionalism pass

Researched against current guidance on executive/portfolio sites. Most of it
the site already satisfies — 16px body, 1.6 line-height, one typeface, generous
section rhythm, `.content-head` at 640px ≈ 71 characters, hero lede already
capped at 46ch. So this is a short, closed list rather than an open-ended pass:

1. **Verifiability as a design element** — §§4–6. This is the single largest
   credibility gain available and is the substance of the pass, not a bolt-on.
2. **Prose measure** — cap running prose at `68ch` where it is not already
   capped, hitting the 50–75 character band.
3. **Logo baseline** — one height, one opacity, sitewide (§8).
4. **Expired credentials shown honestly.** The Azure Solutions Architect Expert
   badge **expired in January 2023**. Certifications gains a date column and an
   inline qualifier for lapsed credentials rather than implying they are
   current. Presenting a lapsed cert as live is the kind of thing this whole
   task exists to prevent.
5. **Corrections** — the `photo-8` caption (§1), and the AWS Community Day
   Kolkata date, which the speaker page gives as **5 April 2025** where the
   site says only "2025".

Explicitly *not* doing: new typeface, new palette, new section rhythm, hero
rework, animation changes.

## 10. To report to the user, not guess

- **IIBA Pune board seat** — proof URL dead; ships text-only.
- **Photographs whose event I could not read** (listed in §7) — excluded rather
  than captioned speculatively.
- **AWS, Google Cloud, Gremlin, IBM Executive Consultant and IBM Consulting
  Profession certifications** — listed on the site, but the source material
  contains **no** verification link for any of them. They ship text-only.
  Credly proof exists only for the Azure and IBM Cloud Pak credentials.
- **"5 patents"** — his LinkedIn headline claims five. Three are verifiable as
  granted US patents; three further IP.com entries are *defensive publications*,
  not patents, and will be labelled as such. The site will claim three patents,
  not five.
- Any URL that fails `check-links.mjs` at implementation time.

## 11. Verification

Work is not complete until all of these pass, and the results are reported with
their output rather than summarised:

| Check | Command |
|---|---|
| Types | `npm run typecheck` |
| Build | `npm run build` |
| Every external URL answers | `node scripts/check-links.mjs` |
| No internal link 404s | `node scripts/check-internal-links.mjs` against `dist/` |
| Sticky header unregressed | recheck `overflow-x: clip` on the new aside; a `sticky` aside must not reintroduce a scroll container |
| Responsive | 320 → 1920px sweep for horizontal overflow on every changed page |
| Reduced motion | lightbox and logo hover honour the token block |

## 12. Risks

- **A sticky aside inside a page whose ancestors clip overflow.** `overflow-x:
  clip` on `html, body` does not create a scroll container (that is the whole
  point of the fix recorded in CLAUDE.md), so `position: sticky` on the aside
  resolves against the viewport as intended. Must be measured, not assumed —
  this exact mechanism has already broken the header once.
- **Link rot.** Several sources are 2010–2016 journal and IBM developerWorks
  URLs; IBM has retired large parts of that estate. `check-links.mjs` decides,
  not optimism.
- **Row markup churn.** `row-list.ts` is shared by eight pages. Adding a logo
  slot and an anchor variant touches all of them; the guard is that unlinked,
  logo-less rows must render byte-identically to today.
