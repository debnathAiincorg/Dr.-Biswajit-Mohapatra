import { listPage } from './_includes/components/list-page.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Education — Dr. Biswajit Mohapatra',
    description:
      "Academic background of Dr. Biswajit Mohapatra — doctoral, master's and undergraduate study in cognitive science, linguistics and psychology.",
    navLabel: 'Education',
    schemaType: 'CollectionPage',
    permalink: '/education/',
  },

  render: () =>
    listPage({
      id: 'education',
      eyebrow: 'Background',
      heading: 'Education',
      rows: [
        {
          title: 'Ph.D. in Cognitive Science',
          sub: 'Fictional Institute of Technology',
          meta: '2011',
          datetime: '2011',
        },
        {
          title: 'M.S. in Linguistics',
          sub: 'Ashfield University',
          meta: '2006',
          datetime: '2006',
        },
        {
          title: 'B.A. in Psychology',
          sub: 'Fictional State University',
          meta: '2004',
          datetime: '2004',
        },
      ],
    }),
});
