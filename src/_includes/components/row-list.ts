import { html, join, type Html, type Renderable } from '../lib/html.ts';

/*
 * The `row-list` block.
 *
 * Seven pages -- Education, Experience, Awards, Publications, Courses,
 * Activities, Alumni -- were byte-for-byte the same markup with different
 * strings hand-repeated inside it. Under Nunjucks there was nowhere to put
 * that shape except in each file; here it is one renderer and seven arrays.
 */

export interface Row {
  /** Primary label. Plain strings are escaped; use `raw()` for entities. */
  readonly title: Renderable;
  /** Secondary line inside the title, e.g. the institution. */
  readonly sub?: Renderable;
  /** Inline qualifier, e.g. "Trade nonfiction" on the memoir. */
  readonly tag?: Renderable;
  /** Right-hand column: a year, a term, or a range. */
  readonly meta: Renderable;
  /**
   * When set, meta renders as <time datetime="..."> instead of <span>.
   * Ranges like "2019-Present" have no single machine-readable value, so they
   * stay as spans -- which is what the Nunjucks markup did.
   */
  readonly datetime?: string;
}

function rowMeta(row: Row): Html {
  return row.datetime
    ? html`<time class="row-meta" datetime="${row.datetime}">${row.meta}</time>`
    : html`<span class="row-meta">${row.meta}</span>`;
}

function rowItem(row: Row, indent: string): Html {
  const tag = row.tag ? html`<span class="row-tag">${row.tag}</span>` : null;
  const sub = row.sub ? html`<span class="row-sub">${row.sub}</span>` : null;

  return html`
${indent}<li class="reveal"><span class="row-static"><span class="row-title">${row.title}${tag}${sub}</span>${rowMeta(row)}</span></li>`;
}

/**
 * @param indent Indentation of the `<ul>` itself; items sit two spaces deeper.
 */
export function rowList(
  rows: readonly Row[],
  indent: string,
  className = 'row-list',
): Html {
  const items = join(rows.map((row) => rowItem(row, `${indent}  `)));
  return html`<ul class="${className}">${items}
${indent}</ul>`;
}
