import { readdirSync } from 'node:fs';
import { html, join, raw, type Html, type Renderable } from '../lib/html.ts';
import type { Source } from '../content/sources.ts';

/* Computed once per build, not per row: which proof slugs have a WebP
   sibling next to their JPEG. proofFigure() below only emits a <source> for
   a slug that appears here, so a slug with no WebP (there is one --
   proof-azteca-honorary-doctorate, checked at the time this was written)
   still renders correctly, just without the WebP <source>, instead of a
   <picture> pointing a browser at a file that 404s. */
const PROOF_WEBP_SLUGS = new Set(
  readdirSync('src/assets/images/proof')
    .filter((name) => name.endsWith('.webp'))
    .map((name) => name.slice(0, -'.webp'.length)),
);

/*
 * The `row-list` block.
 *
 * Seven pages -- Education, Experience, Awards, Publications, Courses,
 * Activities, Alumni -- were byte-for-byte the same markup with different
 * strings hand-repeated inside it. Under Nunjucks there was nowhere to put
 * that shape except in each file; here it is one renderer and seven arrays.
 */

/** A certificate or award photograph offered as evidence when no public URL
 *  exists for the claim. Served from /assets/images/proof/<slug>.{jpg,webp}. */
export interface ProofImage {
  readonly slug: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  /**
   * Shown under the image inside the lightbox, and as the figure's caption
   * where the image sits inside an expanded row's detail body. Plain string,
   * not `Renderable` -- it is also written into a `data-caption` HTML
   * attribute, where an unescaped `Html`/`raw()` value could break out of
   * the attribute; `html`'s escaping only runs on plain strings passed
   * through it.
   */
  readonly caption?: string;
}

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
  /**
   * Slug of an organisation mark under /assets/images/logos/<slug>.png,
   * shown in the row's leading slot at a fixed 20px height. alt="" always --
   * the organisation's name already sits in `sub`, and an alt would make a
   * screen reader announce it twice.
   */
  readonly logo?: string;
  /**
   * Public record backing this row. When set the row becomes a link to it.
   * Every entry is declared in content/sources.ts and must pass
   * scripts/check-links.mjs before it ships.
   */
  readonly source?: Source;
  /**
   * A certificate or award photograph offered as evidence when no `source`
   * URL exists. Renders with the same outbound-proof glyph as a sourced row,
   * but the click opens the image in the lightbox instead of navigating --
   * only one of `source` / `proofImage` should be set on the row itself
   * (both can appear together inside `detail`, which is a different slot).
   */
  readonly proofImage?: ProofImage;
  /**
   * Supporting material for the row -- a quote, an excerpt -- shown when the
   * row is expanded. When set, the row becomes a <details> disclosure instead
   * of a static or linked row, opening in place rather than navigating away.
   * `source` and `proofImage`, if also set, render inside the opened body
   * rather than on the row itself, so there is one unambiguous click target.
   */
  readonly detail?: Renderable;
}

function rowMeta(row: Row): Html {
  return row.datetime
    ? html`<time class="row-meta" datetime="${row.datetime}">${row.meta}</time>`
    : html`<span class="row-meta">${row.meta}</span>`;
}

/* Marks a row as leaving the site. Decorative -- the accessible "opens in a
   new tab" cue is the visually-hidden span beside it, because an icon alone
   is not announced. */
const PROOF_GLYPH = raw(
  '<svg class="row-proof-glyph" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">' +
    '<path d="M4.5 1.5h6v6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M10.5 1.5 5 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>' +
    '<path d="M9 8.5v2h-7.5V3h2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>',
);

/* The chevron on an expandable row. Rotates on [open] in row-list.css; a
   plain caret rather than a plus/minus, since it reads as "reveals below"
   rather than "adds something" -- there is nothing being added here, the
   content was already on the page, just collapsed. */
const EXPAND_GLYPH = raw(
  '<svg class="row-expand-glyph" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" focusable="false">' +
    '<path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>',
);

/** A proof image opened inside an already-expanded row's detail body: a
 *  small figure whose anchor the lightbox module intercepts, exactly like a
 *  proof-only row's anchor, just nested one level deeper. */
function proofFigure(proof: ProofImage): Html {
  const jpg = `/assets/images/proof/${proof.slug}.jpg`;
  const img = html`<img src="${jpg}" alt="${proof.alt}" width="${proof.width}" height="${proof.height}" loading="lazy" decoding="async">`;
  /* The <a> always points at the JPEG regardless -- that is what keeps this
     working with JavaScript off (see the comment atop lightbox.js) and
     what the lightbox itself opens via trigger.href, so a slug's WebP
     savings apply to this inline figure, not to the lightbox view. */
  const picture = PROOF_WEBP_SLUGS.has(proof.slug)
    ? html`<picture><source type="image/webp" srcset="/assets/images/proof/${proof.slug}.webp">${img}</picture>`
    : img;
  return html`<figure><a class="proof-zoom" href="${jpg}" data-caption="${proof.caption ?? ''}" data-alt="${proof.alt}">${picture}</a>${proof.caption ? html`<figcaption>${proof.caption}</figcaption>` : null}</figure>`;
}

function rowItem(row: Row, indent: string): Html {
  const tag = row.tag ? html`<span class="row-tag">${row.tag}</span>` : null;
  const sub = row.sub ? html`<span class="row-sub">${row.sub}</span>` : null;

  /* A logo sits in the row's leading slot, grouped with the title so the
     outer flex row (title-side vs. meta-side, `justify-content:
     space-between`) still has exactly two children -- adding the logo as a
     third would let it float to the middle instead of hugging the title. */
  const titleInner = html`${row.title}${tag}${sub}`;
  const leading = row.logo
    ? html`<span class="row-lead"><img class="org-logo" src="/assets/images/logos/${row.logo}.png" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}</span></span>`
    : html`<span class="row-title">${titleInner}</span>`;

  /* An expandable row is a <details> disclosure: the browser owns its open
     state, its keyboard handling (Enter/Space on the summary) and its
     accessible name, so none of that is hand-rolled here. It works with
     JavaScript blocked, which a click-driven accordion built from a <span>
     and an event listener would not.

     `source` and `proofImage`, when also present, move inside the opened
     body instead of turning the summary into a link -- a row cannot both
     navigate/zoom and expand in place from the same click.

     The condition also fires with no `detail` at all when a row carries
     both `source` and `proofImage`: those two, alone, already disagree
     about what a bare click on the row should do (leave the site, or open
     the lightbox), so the row needs the same body to hold both rather than
     one silently winning and the other never rendering anywhere. `detail`
     is simply absent from the body in that case -- proof and verification
     are both still one click away, just inside the opened row instead of
     on it. */
  if (row.detail || (row.source && row.proofImage)) {
    const sourceLink = row.source
      ? html`<p class="row-detail-source"><a class="text-link" href="${row.source.url}" target="_blank" rel="noopener noreferrer">Verify at ${row.source.label}</a></p>`
      : null;
    const proofFig = row.proofImage ? proofFigure(row.proofImage) : null;
    return html`
${indent}<li class="reveal"><details class="row-details"><summary class="row-static">${leading}<span class="row-meta-group">${rowMeta(row)}${EXPAND_GLYPH}</span></summary><div class="row-detail-body">${proofFig}${row.detail}${sourceLink}</div></details></li>`;
  }

  /* A sourced or proof-image row is an anchor *in place of* the static span,
     not nested inside it: components/row-list.css makes `.row-list a` and
     `.row-list .row-static` the same flex container, so reusing the class on
     the anchor keeps one rule set governing both shapes.

     An unsourced, unproven row renders exactly the markup it did before
     these fields existed -- no glyph, no anchor, no attribute churn. Most
     rows across the eight pages sharing this renderer still take this path. */
  if (row.source) {
    return html`
${indent}<li class="reveal"><a class="row-static row-sourced" href="${row.source.url}" target="_blank" rel="noopener noreferrer">${row.logo ? html`<span class="row-lead"><img class="org-logo" src="/assets/images/logos/${row.logo}.png" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — verification: ${row.source.label}. Opens in a new tab.</span></span></span>` : html`<span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — verification: ${row.source.label}. Opens in a new tab.</span></span>`}${rowMeta(row)}</a></li>`;
  }

  if (row.proofImage) {
    const proof = row.proofImage;
    return html`
${indent}<li class="reveal"><a class="row-static row-sourced proof-zoom" href="/assets/images/proof/${proof.slug}.jpg" data-caption="${proof.caption ?? ''}" data-alt="${proof.alt}">${row.logo ? html`<span class="row-lead"><img class="org-logo" src="/assets/images/logos/${row.logo}.png" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — view proof image: ${proof.alt}.</span></span></span>` : html`<span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — view proof image: ${proof.alt}.</span></span>`}${rowMeta(row)}</a></li>`;
  }

  return html`
${indent}<li class="reveal"><span class="row-static">${leading}${rowMeta(row)}</span></li>`;
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
