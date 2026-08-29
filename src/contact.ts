import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Contact — Dr. Biswajit Mohapatra',
    description:
      'Contact Dr. Biswajit Mohapatra and the Speech Lab at Ashfield University — for prospective students, media enquiries and research collaborations.',
    navLabel: 'Contact',
    schemaType: 'ContactPage',
    permalink: '/contact/',
  },

  render: () => html`  <section class="content-section" id="contact">
    <div class="container">
      <div class="contact-inner">
        <span class="eyebrow reveal">Get in Touch</span>
        <h1 class="reveal">Contact</h1>
        <p class="reveal">For prospective students, media inquiries, or collaboration requests &mdash; placeholder contact details, replace before launch.</p>
        <p class="contact-detail reveal">speechlab@example.edu</p>
        <p class="contact-detail reveal">Office 214, Fictional Hall &middot; Ashfield University</p>
      </div>
    </div>
  </section>
`,
});
