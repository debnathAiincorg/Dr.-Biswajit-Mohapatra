import { listPage } from './_includes/components/list-page.ts';
import { raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Publications — Dr. Biswajit Mohapatra',
    description:
      'Peer-reviewed papers, conference contributions and books by Dr. Biswajit Mohapatra on speech, prosody, turn-taking and human–AI conversation.',
    navLabel: 'Publications',
    schemaType: 'CollectionPage',
    permalink: '/publications/',
  },

  render: () =>
    listPage({
      id: 'publications',
      eyebrow: 'Research',
      heading: 'Publications',
      rows: [
        {
          title: 'Prosody and Prediction in Spoken Dialogue',
          sub: 'Journal of Fictional Linguistics',
          meta: '2026',
          datetime: '2026',
        },
        {
          title: raw('Modeling Turn-Taking in Human&ndash;AI Conversation'),
          sub: 'Fictional Conference on Spoken Language',
          meta: '2025',
          datetime: '2025',
        },
        {
          title: 'Cross-Linguistic Perception of Speech Rhythm',
          sub: 'Fictional Journal of Cognitive Science',
          meta: '2024',
          datetime: '2024',
        },
        {
          title: 'Toward Naturalistic Voice Interfaces',
          sub: 'Fictional Symposium on Human-Computer Interaction',
          meta: '2023',
          datetime: '2023',
        },
        {
          title: 'Speech Errors as a Window into Planning',
          sub: 'Fictional Psycholinguistics Review',
          meta: '2022',
          datetime: '2022',
        },
        {
          title: "Children's Acquisition of Conversational Timing",
          sub: 'Fictional Journal of Child Language',
          meta: '2021',
          datetime: '2021',
        },
        /* The memoir, kept as one entry alongside the papers. */
        {
          title: 'The Long Table',
          tag: 'Trade nonfiction',
          sub: 'Fictional Publishing House',
          meta: '2025',
          datetime: '2025',
        },
      ],
    }),
});
