import { listPage } from './_includes/components/list-page.ts';
import { raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Experience — Dr. Biswajit Mohapatra',
    description:
      'Academic appointments held by Dr. Biswajit Mohapatra, from postdoctoral research through to Professor and Director of the Speech Lab at Ashfield University.',
    navLabel: 'Experience',
    schemaType: 'CollectionPage',
    permalink: '/experience/',
  },

  render: () =>
    listPage({
      id: 'experience',
      eyebrow: 'Career',
      heading: 'Experience',
      rows: [
        {
          title: 'Professor & Director, Speech Lab',
          sub: 'Ashfield University',
          meta: raw('2019&ndash;Present'),
        },
        {
          title: 'Associate Professor',
          sub: 'Ashfield University',
          meta: raw('2014&ndash;2019'),
        },
        {
          title: 'Postdoctoral Researcher',
          sub: 'Fictional Institute for Language Technology',
          meta: raw('2011&ndash;2014'),
        },
        {
          title: 'Visiting Researcher',
          sub: 'Fictional AI Research Lab',
          meta: '2013',
          datetime: '2013',
        },
      ],
    }),
});
