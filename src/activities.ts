import { listPage } from './_includes/components/list-page.ts';
import { raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Academic Service & Activities — Dr. Biswajit Mohapatra',
    description:
      'Editorial, review, committee and outreach service undertaken by Dr. Biswajit Mohapatra in the cognitive and speech science community.',
    navLabel: 'Activities',
    schemaType: 'CollectionPage',
    permalink: '/activities/',
  },

  render: () =>
    listPage({
      id: 'activities',
      eyebrow: 'Service',
      heading: 'Activities',
      rows: [
        {
          title: 'Editorial Board Member',
          sub: 'Fictional Journal of Spoken Language',
          meta: raw('2022&ndash;Present'),
        },
        {
          title: 'Committee Chair',
          sub: 'Fictional Conference on Cognitive Science',
          meta: '2024',
          datetime: '2024',
        },
        {
          title: 'Outreach Lead',
          sub: 'Ashfield University Speech & Language Fair',
          meta: raw('2021&ndash;Present'),
        },
        {
          title: 'Reviewer',
          sub: 'Fictional Foundation for Language Research Grants',
          meta: raw('2020&ndash;Present'),
        },
      ],
    }),
});
