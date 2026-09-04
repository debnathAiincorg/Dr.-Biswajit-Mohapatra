import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';
import { socialBadges } from './_includes/partials/social-badges.ts';

export const { data, render } = definePage({
  data: {
    title: 'Contact — Dr. Biswajit Mohapatra',
    description:
      'Get in touch with Dr. Biswajit Mohapatra on LinkedIn, YouTube, X and Facebook — for speaking engagements, advisory conversations and media enquiries.',
    navLabel: 'Contact',
    schemaType: 'ContactPage',
    permalink: '/contact/',
  },

  render: (_data, { site }) => html`  <section class="content-section" id="contact">
    <div class="container">
      <div class="contact-inner">
        <span class="eyebrow reveal">Get in Touch</span>
        <h1 class="reveal">Contact</h1>
        <p class="reveal">For speaking engagements, advisory conversations, or media enquiries &mdash; reach Dr. Mohapatra on LinkedIn.</p>
        <a class="btn btn-primary reveal" href="${site.linkedin}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
        <div class="contact-socials reveal">
          ${socialBadges(site)}
        </div>
      </div>
    </div>
  </section>
`,
});
