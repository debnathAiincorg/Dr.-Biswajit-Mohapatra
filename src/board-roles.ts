import { listPage } from './_includes/components/list-page.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Alumni — Dr. Biswajit Mohapatra',
    description:
      "Former doctoral and master's students of the Speech Lab at Ashfield University, and where their research careers have taken them.",
    navLabel: 'Alumni',
    schemaType: 'CollectionPage',
    permalink: '/alumni/',
  },

  render: () =>
    listPage({
      id: 'speech-lab-alumni',
      eyebrow: 'Legacy',
      heading: 'Alumni',
      rows: [
        { title: 'Tomas Reyes', sub: 'Now at Fictional Tech Labs', meta: 'PhD 2023' },
        { title: 'Aiko Tanaka', sub: 'Now at Ashfield University (Faculty)', meta: 'PhD 2021' },
        { title: 'Marcus Webb', sub: 'Now at Fictional Health Institute', meta: 'PhD 2020' },
        { title: 'Leah Grunwald', sub: 'Now at Fictional Voice AI Startup', meta: 'MS 2019' },
        { title: 'Oluwaseun Bello', sub: 'Now at Fictional National Language Lab', meta: 'PhD 2018' },
      ],
    }),
});
