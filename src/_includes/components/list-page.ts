import { html, type Html, type Renderable } from '../lib/html.ts';
import { rowList, type Row } from './row-list.ts';

/**
 * A whole page body: eyebrow, heading, and one `row-list`.
 *
 * Education, Experience, Awards, Publications, Courses, Activities and Alumni
 * all render exactly this, so each of those pages is now its heading plus its
 * rows and nothing else.
 */
export function listPage(options: {
  readonly id: string;
  readonly eyebrow: Renderable;
  readonly heading: Renderable;
  readonly rows: readonly Row[];
}): Html {
  return html`  <section class="content-section" id="${options.id}">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">${options.eyebrow}</span>
        <h1 class="reveal">${options.heading}</h1>
      </div>
      ${rowList(options.rows, '      ')}
    </div>
  </section>
`;
}
