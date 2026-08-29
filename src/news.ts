import { panel } from './_includes/components/panel.ts';
import { rowList } from './_includes/components/row-list.ts';
import { asRows } from './_includes/content/lab-notes.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'News — Dr. Biswajit Mohapatra',
    description:
      'Recent news from Dr. Biswajit Mohapatra and the Speech Lab at Ashfield University — new papers, appointments, grants, awards and lab milestones.',
    navLabel: 'News',
    schemaType: 'CollectionPage',
    permalink: '/news/',
  },

  render: (_data, { url }) =>
    panel({
      id: 'news',
      children: html`        <span class="eyebrow reveal">Lab News</span>
        <h1 class="reveal">Lab Notes</h1>
        <p class="reveal">Occasional updates on publications, talks, and lab milestones &mdash; four recent placeholder items below.</p>

        ${rowList(asRows(), '        ', 'row-list with-cta')}

        <a class="btn btn-primary reveal" href="${url('/contact/')}">Contact the Lab</a>`,
    }),
});
