import { cardGrid } from './_includes/components/card-grid.ts';
import { sources } from './_includes/content/sources.ts';
import { html, type Html, type Renderable } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';
import type { Source } from './_includes/content/sources.ts';

/*
 * "AWS Capability Development" carries the one "Show project" link in
 * dr/linkdin3.docx's Projects section, wired through content/sources.ts
 * like every other outbound link on the site so scripts/check-links.mjs
 * keeps covering it. Verified before shipping: 200 response, and the page
 * itself was fetched and checked to name him, not just a title-string match.
 */

interface Project {
  readonly status: 'Active' | 'Completed';
  readonly name: Renderable;
  readonly blurb: string;
  readonly source?: Source;
}

const projects: readonly Project[] = [
  {
    status: 'Active',
    name: 'AWS Capability Development',
    blurb: 'Training and certification enablement program building cloud skills across enterprise delivery teams, associated with IBM India. Running since September 2019.',
    source: sources.awsCapabilityDevVideo,
  },
  {
    status: 'Completed',
    name: 'IBM Garage & Global Cloud Factory Model',
    blurb: 'Designed and industrialized IBM’s delivery framework for hybrid cloud transformation, applied across 18 major programs including Delta Air Lines and Philip Morris International.',
  },
  {
    status: 'Completed',
    name: 'Zero Trust Security Framework Rollout',
    blurb: 'Established Zero Trust frameworks for 40+ enterprises at AWS, cutting security incidents by 75%.',
  },
  {
    status: 'Completed',
    name: 'GenAI Enterprise Deployment Program',
    blurb: 'Led 40+ generative AI deployments across top enterprise accounts at AWS, generating $75M+ in incremental revenue.',
  },
  {
    status: 'Completed',
    name: 'Solution BluePrint (SBP) Automation Framework',
    blurb: 'Conceptualized and built a software engineering process automation framework at Zensar, delivering measurable productivity gains and a $250M+ revenue pipeline.',
  },
  {
    status: 'Completed',
    name: 'R5 Legacy Transformation Offering',
    blurb: 'Created the Rehost-Reengineer-Reface-Restructure-Re-use (R5) modernization offering for banking, finance and insurance applications at Kanbay.',
  },
];

function projectCard(project: Project): Html {
  const link = project.source
    ? html`<p class="project-link"><a class="text-link" href="${project.source.url}" target="_blank" rel="noopener noreferrer">Watch: ${project.source.label}</a></p>`
    : null;
  return html`<div class="card project-card">
          <span class="project-tag">${project.status}</span>
          <h2>${project.name}</h2>
          <p>${project.blurb}</p>${link}
        </div>`;
}

export const { data, render } = definePage({
  data: {
    title: 'Projects — Dr. Biswajit Mohapatra',
    description:
      'Flagship transformation programs and frameworks built by Dr. Biswajit Mohapatra at AWS, IBM, Zensar and Kanbay.',
    navLabel: 'Projects',
    schemaType: 'CollectionPage',
    permalink: '/projects/',
  },

  render: () => html`  <section class="content-section" id="projects">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Flagship Work</span>
        <h1 class="reveal">Projects</h1>
      </div>
      ${cardGrid(projects.map(projectCard), '      ')}
    </div>
  </section>
`,
});
