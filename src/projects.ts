import { cardGrid } from './_includes/components/card-grid.ts';
import { html, type Html, type Renderable } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

interface Project {
  readonly status: 'Active' | 'Completed';
  readonly name: Renderable;
  readonly blurb: string;
}

const projects: readonly Project[] = [
  {
    status: 'Active',
    name: 'Voice & Trust',
    blurb: 'Placeholder: studying how vocal tone shapes trust in AI voice assistants.',
  },
  {
    status: 'Active',
    name: 'The Turn-Taking Corpus',
    blurb: 'Placeholder: building an open dataset of conversational timing patterns.',
  },
  {
    status: 'Completed',
    name: 'Speech After Stroke',
    blurb: 'Placeholder: a completed project on rehabilitative speech therapy tools.',
  },
];

function projectCard(project: Project): Html {
  return html`<div class="card project-card">
          <span class="project-tag">${project.status}</span>
          <h2>${project.name}</h2>
          <p>${project.blurb}</p>
        </div>`;
}

export const { data, render } = definePage({
  data: {
    title: 'Research Projects — Dr. Biswajit Mohapatra',
    description:
      'Current and completed research projects at the Speech Lab — voice and trust in AI assistants, conversational timing corpora, and speech rehabilitation.',
    navLabel: 'Projects',
    schemaType: 'CollectionPage',
    permalink: '/projects/',
  },

  render: () => html`  <section class="content-section" id="projects">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Current Work</span>
        <h1 class="reveal">Projects</h1>
      </div>
      ${cardGrid(projects.map(projectCard), '      ')}
    </div>
  </section>
`,
});
