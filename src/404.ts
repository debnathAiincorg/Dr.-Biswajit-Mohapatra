import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Page not found — Dr. Biswajit Mohapatra',
    description:
      'That page does not exist or has moved. Use the navigation to find what you were looking for.',
    navLabel: 'Not found',
    /* No breadcrumb: a 404 is not a place in the site's hierarchy. */
    breadcrumb: false,
    permalink: '/404.html',
    eleventyExcludeFromCollections: true,
  },

  /* Note: this page's body sits at zero indentation, unlike the other pages,
     which start at two spaces. Preserved as-is. */
  render: (_data, { url }) => html`<section class="content-section" id="not-found">
  <div class="container">
    <div class="content-head">
      <span class="eyebrow reveal">Error 404</span>
      <h1 class="reveal">Page not found</h1>
      <p class="reveal">That page doesn&rsquo;t exist, or it has moved. Try the navigation above, or head back to the homepage.</p>
    </div>
    <div class="section-cta reveal">
      <a class="btn btn-primary" href="${url('/')}">Back to homepage</a>
    </div>
  </div>
</section>
`,
});
