import { html, join, raw, type Html } from '../lib/html.ts';
import type { UrlFilter } from '../lib/types.ts';
import type { GalleryItem, GalleryVideo, Photo } from '../content/photos.ts';

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
 * How eagerly a card's image loads.
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

/* Matches the stroke vocabulary of the row glyphs in row-list.ts and the
   lightbox's close control, so the play badge reads as part of the site rather
   than a browser default. Decorative: the card's text says it is a video. */
const PLAY_GLYPH =
  '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
  '<path d="M9 7.5l8 4.5-8 4.5z" fill="currentColor"/>' +
  '</svg>';

/** The `<picture>` shared by both card kinds. `dir` is the asset folder. */
function cardPicture(
  item: GalleryItem,
  url: UrlFilter,
  dir: string,
  base: string,
  priority: PhotoPriority,
): Html {
  /* No loading attribute at all for the non-lazy cases: eager is the default,
     so stating it would be noise in the output. */
  const loading = priority === 'lazy' ? html` loading="lazy"` : null;
  /* Exactly one element per page can be LCP, so only one card ever gets this.
     Marking the whole first row high would dilute the hint and put three
     fetches in contention with the one that decides the metric. */
  const fetchPriority = priority === 'lcp' ? html` fetchpriority="high"` : null;
  /* Omitted unless the photo sets it, so the stylesheet's own centring stays
     the default rather than being restated inline on every card. */
  const focus = item.focus ? html` style="object-position:${item.focus}"` : null;

  return html`<picture><source type="image/webp" srcset="${url(`${dir}/${base}.webp`)}"><img src="${url(`${dir}/${base}.jpg`)}" alt="${item.alt}" width="${item.width}" height="${item.height}"${loading}${fetchPriority}${focus} decoding="async"></picture>`;
}

/** The caption block shared by both card kinds. */
function cardCaption(item: GalleryItem, extra: Html | null = null): Html {
  return html`<figcaption>
            <p class="photo-caption">${item.caption}${extra}</p>
            <div class="card-rule" aria-hidden="true"></div>
            <span class="card-date">${item.date}</span>
          </figcaption>`;
}

/** One gallery photograph: WebP with a JPEG fallback, plus its caption block. */
export function photoCard(photo: Photo, url: UrlFilter, priority: PhotoPriority = 'lazy'): Html {
  return html`<figure class="card">
          <div class="photo-figure">${cardPicture(photo, url, '/assets/images/gallery', photo.slug, priority)}</div>
          ${cardCaption(photo)}
        </figure>`;
}

/**
 * One gallery video: its poster still, badged, linking to the file itself.
 *
 * The anchor points straight at the .mp4, so with JavaScript off the card
 * still plays the video -- the same degradation the proof images rely on.
 * With JS on, lightbox.js intercepts and opens it in the shared <dialog>,
 * where `preload="none"` means nothing is fetched until someone asks for it.
 */
export function videoCard(
  video: GalleryVideo,
  url: UrlFilter,
  priority: PhotoPriority = 'lazy',
): Html {
  const src = url(`/assets/video/${video.slug}.mp4`);
  /*
   * Two posters, because the card and the viewer need different shapes.
   *
   * The card's is cropped to the 4:5 the grid enforces. The viewer's is the
   * full broadcast frame, at the video's own 848x480. A <video> with no
   * metadata yet -- which is every video here, since preload is "none" --
   * takes its intrinsic size from its poster, so handing the viewer the 4:5
   * crop opened it as a 559x724 portrait box that then snapped to landscape
   * the moment the first bytes arrived.
   */
  const poster = url(`/assets/video/${video.slug}-lightbox.jpg`);

  return html`<figure class="card card-video">
          <div class="photo-figure"><a class="video-zoom" href="${src}" data-caption="${video.captionText}" data-alt="${video.alt}" data-poster="${poster}">${cardPicture(video, url, '/assets/video', `${video.slug}-poster`, priority)}<span class="video-badge" aria-hidden="true">${raw(PLAY_GLYPH)}<span class="video-duration">${video.duration}</span></span><span class="visually-hidden">Play video: ${video.alt} (${video.duration})</span></a></div>
          ${cardCaption(video)}
        </figure>`;
}

/** Renders whichever card kind the item is. */
export function galleryCard(
  item: GalleryItem,
  url: UrlFilter,
  priority: PhotoPriority = 'lazy',
): Html {
  return item.kind === 'video' ? videoCard(item, url, priority) : photoCard(item, url, priority);
}
