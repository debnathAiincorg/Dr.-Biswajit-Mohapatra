import { cardGrid } from './_includes/components/card-grid.ts';
import { html, type Html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';
import type { UrlFilter } from './_includes/lib/url.ts';

interface Student {
  readonly name: string;
  readonly role: 'PhD Candidate' | 'MS Student';
  readonly area: string;
}

const students: readonly Student[] = [
  { name: 'Priya Menon', role: 'PhD Candidate', area: 'Spoken dialogue systems' },
  { name: 'Daniel Osei', role: 'PhD Candidate', area: 'Cross-linguistic prosody' },
  { name: 'Wren Alvarado', role: 'MS Student', area: 'Voice interface design' },
  { name: 'Sana Farooqi', role: 'PhD Candidate', area: 'Child language acquisition' },
];

/* alt="" is deliberate: the avatar is a decorative placeholder, and the name
   is already in the heading beside it. */
function studentCard(student: Student, url: UrlFilter): Html {
  return html`<div class="card student-card">
          <div class="student-avatar"><img src="${url('/assets/images/avatar-placeholder.svg')}" alt="" width="200" height="200" loading="lazy" decoding="async"></div>
          <h2>${student.name}</h2>
          <span class="student-role">${student.role}</span>
          <p>${student.area}</p>
        </div>`;
}

export const { data, render } = definePage({
  data: {
    title: 'Students — Dr. Biswajit Mohapatra',
    description:
      "Doctoral and master's students researching with Dr. Biswajit Mohapatra at the Speech Lab, Ashfield University, and the areas they work in.",
    navLabel: 'Students',
    schemaType: 'CollectionPage',
    permalink: '/students/',
  },

  render: (_data, { url }) => html`  <section class="content-section" id="students">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">The Lab</span>
        <h1 class="reveal">Students</h1>
      </div>
      ${cardGrid(
        students.map((student) => studentCard(student, url)),
        '      ',
      )}
    </div>
  </section>
`,
});
