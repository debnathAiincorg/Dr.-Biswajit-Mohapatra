import { listPage } from './_includes/components/list-page.ts';
import { raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Courses — Dr. Biswajit Mohapatra',
    description:
      'Undergraduate and graduate courses taught by Dr. Biswajit Mohapatra in spoken language processing, phonetics, human–AI communication and language acquisition.',
    navLabel: 'Courses',
    schemaType: 'CollectionPage',
    permalink: '/courses/',
  },

  render: () =>
    listPage({
      id: 'courses',
      eyebrow: 'Teaching',
      heading: 'Courses',
      rows: [
        { title: raw('COGS 410 &mdash; Spoken Language Processing'), meta: 'Fall 2026' },
        { title: raw('LING 305 &mdash; Introduction to Phonetics'), meta: 'Spring 2026' },
        {
          title: raw('COGS 512 &mdash; Human&ndash;AI Communication (Graduate Seminar)'),
          meta: 'Fall 2025',
        },
        { title: raw('LING 210 &mdash; Language Acquisition'), meta: 'Spring 2025' },
      ],
    }),
});
