import { listPage } from './_includes/components/list-page.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Awards & Honours — Dr. Biswajit Mohapatra',
    description:
      'Awards, honours and fellowships received by Dr. Biswajit Mohapatra for research and teaching in cognitive and communication sciences.',
    navLabel: 'Awards',
    schemaType: 'CollectionPage',
    permalink: '/awards/',
  },

  render: () =>
    listPage({
      id: 'awards',
      eyebrow: 'Recognition',
      heading: 'Awards & Honors',
      rows: [
        {
          title: 'Placeholder Early Career Award',
          sub: 'Fictional Society for Cognitive Science',
          meta: '2024',
          datetime: '2024',
        },
        {
          title: 'Ashfield University Teaching Excellence Award',
          sub: 'Ashfield University',
          meta: '2023',
          datetime: '2023',
        },
        {
          title: 'Best Paper Award (placeholder)',
          sub: 'Fictional Conference on Speech Technology',
          meta: '2022',
          datetime: '2022',
        },
        {
          title: 'Rising Investigator Prize',
          sub: 'Fictional Foundation for Language Research',
          meta: '2021',
          datetime: '2021',
        },
      ],
    }),
});
