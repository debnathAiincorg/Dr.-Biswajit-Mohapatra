import { rowList } from './_includes/components/row-list.ts';
import { asRows } from './_includes/content/lab-notes.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Was the one row-list page still wrapped in the bordered `.panel` band
 * (originally right when it was a short, un-expandable list; no longer true
 * once it grew the same detail/proofImage content every other page has).
 * Now the same bare `.content-section` + `.content-head` structure as
 * Education, Experience, Awards and the rest -- the only page-specific
 * addition is the trailing "Get in Touch" CTA, which nothing else on the
 * site has but which this page has always had and nothing asked to remove.
 *
 * The homepage's own News panel (src/index.ts) is left as `panel()` --
 * it's a deliberately distinct teaser treatment, not this page.
 */

export const { data, render } = definePage({
  data: {
    title: 'News — Dr. Biswajit Mohapatra',
    description:
      'Recent news about Dr. Biswajit Mohapatra — new roles, publications, awards and speaking engagements.',
    navLabel: 'News',
    schemaType: 'CollectionPage',
    permalink: '/news/',
  },

  render: (_data, { url }) => html`  <section class="content-section" id="news">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Latest</span>
        <h1 class="reveal">News</h1>
      </div>
      ${rowList(asRows(), '      ', 'row-list with-cta')}
      <a class="btn btn-primary reveal" href="${url('/contact/')}">Get in Touch</a>
    </div>
  </section>
`,
});
