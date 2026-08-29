import { panel } from './_includes/components/panel.ts';
import { html, join } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

const researchAreas = [
  'Spoken language processing and comprehension',
  html`Human&ndash;AI spoken dialogue systems`,
  'Cross-linguistic speech perception',
];

export const { data, render } = definePage({
  data: {
    title: 'PhD Opportunities — Dr. Biswajit Mohapatra',
    description:
      'Doctoral study with the Speech Lab at Ashfield University: the research areas currently seeking students, and how to approach Dr. Biswajit Mohapatra.',
    navLabel: 'PhD Opportunities',
    schemaType: 'WebPage',
    permalink: '/phd-opportunities/',
  },

  render: (_data, { url }) =>
    panel({
      id: 'phd-opportunities',
      children: html`        <span class="eyebrow reveal">Join the Lab</span>
        <h1 class="reveal">PhD Opportunities</h1>
        <p class="reveal">The Speech Lab welcomes inquiries from prospective doctoral students. Placeholder areas currently seeking students:</p>
        <ul class="bullet-list">${join(
          researchAreas.map((area) => html`
          <li class="reveal"><span class="bullet-text">${area}</span></li>`),
        )}
        </ul>
        <a class="btn btn-primary reveal" href="${url('/contact/')}">Get in Touch</a>`,
    }),
});
