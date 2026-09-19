# Gallery media refresh and asset reorganisation

**Date:** 2026-09-19
**Status:** implemented

Replaces the Gallery's 36 photographs with material from the owner's `ig/`
export, converts the page to carry video as well as stills, and reorganises
every image and video in the repository into purpose-named folders on both the
served side (`src/assets/`) and the master side (`image-src/`).

## Why the whole set was replaced

The previous 36 entries were dominated by multi-panel collages: several were
six crops of one frame (`photo-4`), one was 300x300 (`photo-11`), and the lead
card -- the page's LCP element -- was a six-panel grid. The `ig/` export is
single-subject photography at ~1280px. The site owner asked for full
replacement rather than curation.

Three of the removed entries were also content duplicates, republishing
documents already served from `proof/` under different filenames:

| Gallery entry | Duplicate of |
|---|---|
| `photo-10` | `proof-board-devops-institute-ambassador` |
| `photo-14` | `proof-award-world-cio-200-2022` (cert. 61403633) |
| `photo-15` | `proof-patent-cloud-services` |

## Source material

`ig/` held 21 files. Two were `.mp4`s with identical duration, frame count and
byte size but different checksums. **They are the same footage**: the fully
decoded video stream of all 4,580 frames hashes identically
(`e1b8e08fd3a945b01e2255785edff526`) for both. Only container metadata differs.
One was deleted.

So: 19 images and 1 video. 14 images were published, 5 rejected.

### Rejected, and why

| Source | Reason |
|---|---|
| `shared image (9)` | 793px -- the smallest -- and the lowest measured sharpness of the set |
| `shared image (14)` | Mould-damaged photograph of an old album print; unclear |
| `shared image (10)` | Both subjects cut off mid-motion |
| `shared image (12)` | Casual lakeside holiday snapshot; off-register for the site |
| `shared image (7)` | Device-mockup advertisement of the same magazine cover published from `shared image (6)` |

`shared image (15)` (a seven-person office group photograph) is the weakest
published image and is placed last. It was kept because it fails none of the
stated rejection criteria -- 1280px and sharp -- and dropping a technically
sound photograph would have been an editorial choice beyond what was asked.

### On the sharpness metric

Laplacian edge energy was computed for all 19 images. **It was not used to
rank them**, because it measures edge *density*: the newspaper clipping scored
highest (15.4) on dense body text, while a strong portrait with intentional
background bokeh scored near the bottom (2.17). It was used only at the floor,
where it agrees with visual assessment -- `shared image (9)` is both the
smallest file and the least sharp.

## Ordering

`photos.ts` previously documented "Ordered newest to oldest, undated entries
last." **That convention is superseded.** The Gallery is now ordered best
first, as requested. Dates remain per entry but no longer drive sequence.

## Dates

`CLAUDE.md` records that nothing in the source material was fabricated and that
gaps were left out rather than guessed. That standard is kept. A date is set
only where there is visible evidence:

- `passion-vista-cover-2021` -- "DECEMBER 2021" printed on the cover
- `iim-sambalpur-*` -- "CEO IMMERSION PROGRAMME 2026" printed on the backdrop
- `open-source-india-2022` -- "29-30 September, 2022" printed on the screen
- `agricultural-banking-address` -- backdrop names his Intuitive.ai role, which
  he took in April 2026. Same reasoning `photos.ts` already applied to the
  Intuitive star mark on earlier entries.
- `devops-odyssey-kalinga-tv` -- from the source filename `VID-20260917-...`

Everything else renders `—`.

## Video

A `<video>` in a 4:5 card would either letterbox or crop, so the video is a
poster card that opens the site's existing `<dialog>` lightbox.

`photos.ts` exports a discriminated union so the video sits *in* the order
rather than being appended:

```ts
export type GalleryItem = Photo | GalleryVideo;   // discriminated on `kind`
export const photos = galleryItems.filter(...);   // homepage teaser unaffected
```

The card's `<a href>` points at the `.mp4` itself, so with JavaScript off it
still plays -- the same degradation `proof-zoom` already relies on.
`preload="none"` means the file costs nothing until clicked. The lightbox
pauses and clears `src` on close so audio cannot outlive the dialog.

Encoded H.264 CRF 29 with `+faststart`. Measured: CRF 27 = 11.8MB,
CRF 31 = 8.0MB.

> The footage is Kalinga TV's broadcast coverage of the book launch. Hosting it
> is the site owner's call; swapping the entry to a link-out is a one-line
> change.

## `focus`: why the cards needed a new field

`.photo-figure` is `aspect-ratio: 4/5` with `object-fit: cover`, so every image
is centre-cropped to portrait. The old collages were square and never showed
this. **The `ig/` set is mostly landscape and it breaks them** -- simulating the
crop put the subject of the GCC Leadership Conclave photograph hard against the
right edge, partly cut.

`Photo.focus` is optional and emits `object-position` on the `<img>`. It is set
only on the images that need it. The full frame is still served, so the
lightbox shows the uncropped photograph.

## Folder structure

Served and master trees mirror each other, so a master is always at the same
purpose path as the asset built from it:

```
src/assets/                      image-src/
  images/                          gallery/       14 masters
    gallery/     14 photographs    hero/          profile-photo.png
    hero/        profile-photo     publications/  spatial-dw-diagram.png
    publications/ 3                proof/         2 masters
    proof/       113 scans         video/         source .mp4 (gitignored)
    logos/       7 org marks
    social/      og-cover.jpg
  video/         mp4 + poster
```

Gallery slugs drop the old `gallery-` prefix, which the folder now carries.

**`proof/` filenames keep their redundant `proof-` prefix deliberately.** Those
67 slugs are referenced across 8 page templates; renaming them is real
regression risk for a cosmetic gain, whereas gallery slugs live in one file.

**`image-src/` is not a complete archive and never was** -- the old `gallery-*`
images had no masters there at all, having come from `dr/`, which is not in the
repository. `image-src/README.md` records this so the folder is not mistaken
for one.

The video master is gitignored: 22MB of third-party broadcast footage does not
belong in git history, and the shipped encode is reproducible from it.

## Also fixed

`proof-azteca-honorary-doctorate` shipped JPEG with no WebP sibling -- the only
asset of roughly 170 missing its pair, so that one `<picture>` silently fell
back for every visitor. Generated.

## Two things found while implementing

### `src/assets/video/` is not copied by the images passthrough

The first build produced a Gallery page referencing three files that did not
exist in `dist/`. `eleventy.config.js` copies `src/assets/images`, `icons` and
`vendor` by name; `video` needed its own line. Nothing failed the build -- a
passthrough that copies nothing is not an error -- so this was only visible by
checking that every referenced asset resolves.

### 11 WebP files were deployed with nothing requesting them

`row-list.ts` carried a `PROOF_WEBP_SLUGS` directory scan and emitted a
`<source>` only for slugs that had a WebP. `content/lab-notes.ts` and
`activities.ts` also render proof images, both with a bare `<img>`, so any
WebP reachable only through those two was never served.

Moved to `lib/proof-picture.ts` and shared by all three call sites. Four slugs
stay WebP-less by design: a proof-only row renders as a link with no `<img>`,
and the lightbox always opens the JPEG (`trigger.href`), which is what keeps it
working without JavaScript.

## Verified

| Check | Result |
|---|---|
| `tsc --noEmit` | passes |
| Production build | 19 pages, 178 files copied |
| Asset references resolving in `dist/` | **184 / 184** |
| Unreferenced files under `dist/assets/` | **0** |
| `PATH_PREFIX=/repo/` build | 324 prefixed references, 0 broken |
| External link check | 16 / 16 |

Card crops were verified by reproducing `object-fit: cover` geometry per image
(`crop = 0.8 x height`, offset `(width - crop) x focus%`) and inspecting the
result, rather than by reading the CSS and assuming.

An orphan check that scans only `href`/`src` reports three false positives: the
manifest's two icons are referenced from JSON, and `og-cover.jpg` only ever
appears as an absolute URL in `og:image`/`twitter:image`.
