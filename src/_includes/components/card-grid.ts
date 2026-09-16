import { html, join, type Html } from '../lib/html.ts';
import type { UrlFilter } from '../lib/types.ts';
import type { Photo } from '../content/photos.ts';

/** Wraps cards in `.card-grid`. Cards sit two spaces deeper than the grid. */
export function cardGrid(cards: readonly Html[], indent: string): Html {
  const inner = join(
    cards.map((card) => html`
${indent}  ${card}`),
  );
  return html`<div class="card-grid">${inner}
${indent}</div>`;
}

/**
 * How eagerly a card's photograph loads.
 *
 * Opt-in, and defaulting to 'lazy', because this component is shared: the
 * homepage renders three of these as a teaser roughly two viewports below its
 * hero, where eager loading would only compete with that hero -- the page's
 * real LCP element, which already carries fetchpriority="high" and a preload.
 * Only a caller that knows its cards are in the initial viewport should raise
 * this, which today means Gallery and nothing else.
 *
 * 'lazy'  deferred (the default, correct for anything below the fold)
 * 'eager' in the initial viewport, so not deferred
 * 'lcp'   eager, and the largest element in view: also fetchpriority="high"
 */
export type PhotoPriority = 'lazy' | 'eager' | 'lcp';

/** One gallery photograph: WebP with a JPEG fallback, plus its caption block. */
export function photoCard(photo: Photo, url: UrlFilter, priority: PhotoPriority = 'lazy'): Html {
  /* No loading attribute at all for the non-lazy cases: eager is the default,
     so stating it would be noise in the output. */
  const loading = priority === 'lazy' ? html` loading="lazy"` : null;
  /* Exactly one element per page can be LCP, so only one card ever gets this.
     Marking the whole first row high would dilute the hint and put three
     fetches in contention with the one that decides the metric. */
  const fetchPriority = priority === 'lcp' ? html` fetchpriority="high"` : null;

  return html`<figure class="card">
          <div class="photo-figure"><picture><source type="image/webp" srcset="${url(`/assets/images/photos/${photo.slug}.webp`)}"><img src="${url(`/assets/images/photos/${photo.slug}.jpg`)}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}"${loading}${fetchPriority} decoding="async"></picture></div>
          <figcaption>
            <p class="photo-caption">${photo.caption}</p>
            <div class="card-rule" aria-hidden="true"></div>
            <span class="card-date">${photo.date}</span>
          </figcaption>
        </figure>`;
}
