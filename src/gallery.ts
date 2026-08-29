import { cardGrid, photoCard } from './_includes/components/card-grid.ts';
import { photos } from './_includes/content/photos.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

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
        photos.map((photo) => photoCard(photo, url)),
        '      ',
      )}
    </div>
  </section>
`,
});
