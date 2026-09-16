import { cardGrid, photoCard, type PhotoPriority } from './_includes/components/card-grid.ts';
import { photos } from './_includes/content/photos.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * The grid's first row was lazy-loaded, including the image that is this
 * page's LCP element.
 *
 * Measured at 1440px: .container resolves to 1204px of content, the 3-column
 * grid gives each cell 382.7px, and .photo-figure's 4/5 aspect makes that
 * 478px tall. The first row starts ~353px down (header ~91px + the section's
 * 96px padding + ~167px of .content-head), so it is well inside the initial
 * viewport and dwarfs the 42px <h1> -- there is no other LCP candidate. A
 * lazy image cannot begin fetching until layout places it and is queued at
 * low priority, which is the one thing not to do to an above-fold image.
 *
 * Three, because that is the desktop first row; the responsive grid drops to
 * 2 columns at 1024px and 1 at 768px, so this is the widest case and index 0
 * is in the first row at every breakpoint.
 */
const EAGER_CARDS = 3;

function galleryPriority(index: number): PhotoPriority {
  if (index === 0) return 'lcp';
  return index < EAGER_CARDS ? 'eager' : 'lazy';
}

export const { data, render } = definePage({
  data: {
    title: 'Gallery — Dr. Biswajit Mohapatra',
    description:
      'Photographs from talks, conferences, awards and industry events featuring Dr. Biswajit Mohapatra.',
    navLabel: 'Gallery',
    schemaType: 'CollectionPage',
    permalink: '/gallery/',
  },

  render: (_data, { url }) => html`  <section class="content-section" id="gallery" aria-labelledby="gallery-title">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Moments</span>
        <h1 class="reveal" id="gallery-title">Gallery</h1>
        <p class="reveal">Talks, conferences, awards and industry events.</p>
      </div>

      ${cardGrid(
        photos.map((photo, index) => photoCard(photo, url, galleryPriority(index))),
        '      ',
      )}
    </div>
  </section>
`,
});
