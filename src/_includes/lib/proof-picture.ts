/*
 * WebP <source> for a proof image, where one exists.
 *
 * The proof set is authored as WebP + JPEG pairs, but not every slug has both,
 * and a <picture> whose <source> 404s is worse than no <picture> at all. So
 * the pairs are discovered from disk once per build rather than tracked by
 * hand in a list that would drift the first time an image was added.
 *
 * This lived in components/row-list.ts and served only that file's own figure
 * helper. content/lab-notes.ts and activities.ts render proof images too, both
 * with a bare <img>, so 11 WebP files were being built and deployed with
 * nothing on the site ever requesting them. Sharing the helper is what makes
 * those 11 reachable; it is not a new mechanism.
 *
 * Note this applies to an inline figure only. A proof-only row renders as a
 * link with no <img>, and the lightbox opens `trigger.href`, which is always
 * the JPEG -- that is what keeps the feature working with JavaScript off. Four
 * slugs are lightbox-only and therefore cannot use a WebP at all; they have no
 * .webp file for that reason, and `hasProofWebp` returns false for them.
 */

import { readdirSync } from 'node:fs';
import { html, type Html } from './html.ts';
import { assetUrl } from './asset.ts';

const PROOF_DIR = 'src/assets/images/proof';

/* Computed once per build, not per row. */
const PROOF_WEBP_SLUGS = new Set(
  readdirSync(PROOF_DIR)
    .filter((name) => name.endsWith('.webp'))
    .map((name) => name.slice(0, -'.webp'.length)),
);

/** Whether `slug` has a WebP sibling beside its JPEG. */
export function hasProofWebp(slug: string): boolean {
  return PROOF_WEBP_SLUGS.has(slug);
}

/**
 * Wrap `img` in a `<picture>` offering the slug's WebP, or return it unchanged
 * when there is no WebP to offer.
 */
export function proofPicture(slug: string, img: Html): Html {
  if (!hasProofWebp(slug)) return img;
  return html`<picture><source type="image/webp" srcset="${assetUrl(`/assets/images/proof/${slug}.webp`)}">${img}</picture>`;
}
