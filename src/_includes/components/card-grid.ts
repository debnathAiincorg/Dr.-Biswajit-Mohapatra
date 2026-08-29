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

/** One gallery photograph: WebP with a JPEG fallback, plus its caption block. */
export function photoCard(photo: Photo, url: UrlFilter): Html {
  return html`<figure class="card">
          <div class="photo-figure"><picture><source type="image/webp" srcset="${url(`/assets/images/photos/${photo.slug}.webp`)}"><img src="${url(`/assets/images/photos/${photo.slug}.jpg`)}" alt="${photo.alt}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async"></picture></div>
          <figcaption>
            <p class="photo-caption">${photo.caption}</p>
            <div class="card-rule" aria-hidden="true"></div>
            <span class="card-date">${photo.date}</span>
          </figcaption>
        </figure>`;
}
