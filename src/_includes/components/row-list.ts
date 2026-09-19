import { html, join, raw, type Html, type Renderable } from '../lib/html.ts';
import { assetUrl } from '../lib/asset.ts';
import { proofPicture } from '../lib/proof-picture.ts';
import type { Source } from '../content/sources.ts';

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
  /**
   * A figure that belongs beside `detail` rather than in its flow, for pages
   * that build their own `<figure>` instead of using `proofImage` (the book
   * cover and magazine tearsheet on Publications, the same two on News).
   * Rendered in the expanded row's right-hand column exactly as a
   * `proofImage` is, so one figure does not sit above the text on one page
   * and beside it on another.
   *
   * Only a figure keyed to the row as a whole belongs here. An image the
   * prose introduces in passing -- the spatial-data-warehouse diagram
   * Publications calls "given below" -- stays inside `detail`, in the flow,
   * where the sentence referring to it can still point at it.
   */
  readonly detailAside?: Renderable;
  /**
   * Pixel dimensions of the image inside `detailAside`, which the renderer
   * cannot read out of pre-rendered markup but needs in order to size the
   * figure column (see `asideTrack`). `proofImage` carries its own, so this
   * is only for the hand-built figures. Leaving it off is safe -- the column
   * falls back to its share of the body, which is the behaviour this field
   * refines rather than enables.
   */
  readonly detailAsideSize?: { readonly width: number; readonly height: number };
  /**
   * Figure-column width in px, stated outright instead of derived from an
   * image's dimensions. For an aside whose content is not a single image and
   * so has no aspect ratio to size from -- the six-graphic press grid on
   * News. Takes precedence over `detailAsideSize`; the share in
   * components/row-list.css still caps it, so a narrow window is unaffected.
   */
  readonly detailAsideTrack?: number;
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
  const jpg = assetUrl(`/assets/images/proof/${proof.slug}.jpg`);
  const img = html`<img src="${jpg}" alt="${proof.alt}" width="${proof.width}" height="${proof.height}" loading="lazy" decoding="async">`;
  /* The <a> always points at the JPEG regardless -- that is what keeps this
     working with JavaScript off (see the comment atop lightbox.js) and
     what the lightbox itself opens via trigger.href, so a slug's WebP
     savings apply to this inline figure, not to the lightbox view. */
  const picture = proofPicture(proof.slug, img);
  return html`<figure><a class="proof-zoom" href="${jpg}" data-caption="${proof.caption ?? ''}" data-alt="${proof.alt}">${picture}</a>${proof.caption ? html`<figcaption>${proof.caption}</figcaption>` : null}</figure>`;
}

/*
 * How wide the figure column is, for one row.
 *
 * The figure sits in the last grid track, so whatever this returns, the
 * figure's right-hand edge lands on the body's right margin -- in line with
 * the row's own date above it. What this decides is how much of the body the
 * figure takes from the left, and therefore how *tall* the row becomes.
 *
 * Sizing by width alone does not work here. A share of the body -- which is
 * what this used to be, 36% of it -- gives a portrait certificate scan a
 * 560px height next to two lines of text, so the row runs to 650px to carry
 * 47px of words. Sizing by height alone does not work either: a figure short
 * enough to match two lines is barely 100px wide and its content is
 * unreadable. So the height is budgeted from how much text the row actually
 * has, floored so a scan never gets too small to read, and the width follows
 * from the image's own aspect ratio:
 *
 *   height = clamp(360px, estimated text height x 1.6, 640px)
 *   width  = clamp(240px, height x aspect, the image's own pixel width)
 *
 * The effect across the 58 rows here: the 44 short ones all land on a 360px
 * figure height -- uniform, whatever their aspect ratio, which is what gives
 * a page of opened rows a consistent rhythm -- with the width falling between
 * 240px and 431px, and the row around 400px instead of 490-650px. Rows with
 * real prose scale up from there to 640px, and the one 11,789-character row
 * on Publications takes the ceiling. A landscape image is *shorter* than
 * 360px rather than wider than its share, because the share in
 * components/row-list.css still caps this from above at every width, which is
 * also what shrinks the figure on a tablet.
 *
 * Two floors, not one, because they guard different things: 360px of height
 * keeps a certificate legible in place, and 240px of width keeps a two-line
 * caption from setting as seven lines. Below aspect ~0.67 the width floor
 * wins and the figure is taller than its budget; seven rows are that portrait
 * and one of them, at 0.666, actually reaches it.
 *
 * Returns null when the row's figure has no declared size -- a `detailAside`
 * without `detailAsideSize`. Nothing is emitted and the share alone applies,
 * which is the previous behaviour rather than a broken one.
 */
const ASIDE_MIN_HEIGHT = 360;
const ASIDE_MAX_HEIGHT = 640;
const ASIDE_HEIGHT_RATIO = 1.6;
const ASIDE_MIN_TRACK = 240;

/* Body text in an opened row is 0.92rem on a 1.6 line-height, so ~23.5px a
   line, and the 80ch measure it is capped to holds about 90 characters.
   Paragraphs are separated by 0.75rem. */
const LINE_HEIGHT_PX = 23.55;
const CHARS_PER_LINE = 90;
const PARA_GAP_PX = 12;

/*
 * Rough size of a row's text, used for two decisions and nothing else: the
 * figure's height budget above, and `.is-prose` below.
 *
 * Counting is deliberately crude. Tags are dropped so markup is not counted
 * as text, and an entity reference collapses to the single character it
 * renders as -- without that, `&ldquo;` and `&rsquo;`, which these citations
 * are full of, would inflate a row by 10% or more. Both consumers clamp or
 * threshold the result, so being a line or two out changes nothing.
 */
function measureText(detail: Renderable): { chars: number; paragraphs: number } {
  const markup = String(detail);
  const chars = markup
    .replace(/<[^>]*>/g, '')
    .replace(/&(?:[a-zA-Z]+|#\d+);/g, 'x').length;
  return { chars, paragraphs: (markup.match(/<p[\s>]/g) ?? []).length };
}

function estimateTextHeight(measured: { chars: number; paragraphs: number }): number {
  return (
    (measured.chars / CHARS_PER_LINE) * LINE_HEIGHT_PX +
    Math.max(0, measured.paragraphs - 1) * PARA_GAP_PX
  );
}

function asideTrack(
  measured: { chars: number; paragraphs: number },
  size: { readonly width: number; readonly height: number } | undefined,
  explicit: number | undefined,
): number | null {
  /* A grid of thumbnails has no aspect ratio to budget a height from, so the
     row states its width and the calculation below is skipped. */
  if (explicit !== undefined) return explicit;
  if (size === undefined || size.height === 0) return null;
  const budget = Math.min(
    Math.max(ASIDE_MIN_HEIGHT, estimateTextHeight(measured) * ASIDE_HEIGHT_RATIO),
    ASIDE_MAX_HEIGHT,
  );
  const byHeight = Math.round(budget * (size.width / size.height));
  return Math.max(ASIDE_MIN_TRACK, Math.min(byHeight, size.width));
}

/*
 * Rows whose text runs past about four lines keep a measure; below that the
 * text is short enough that a wider one costs nothing and buys the layout its
 * width. 400 characters is roughly four lines, and is also where this set of
 * rows actually divides -- 44 of the 58 fall below it and 14 above, with the
 * median at 297. components/row-list.css turns the class into a 72ch cap and
 * a larger share.
 */
const PROSE_THRESHOLD = 400;

function rowItem(row: Row, indent: string): Html {
  const tag = row.tag ? html`<span class="row-tag">${row.tag}</span>` : null;
  const sub = row.sub ? html`<span class="row-sub">${row.sub}</span>` : null;

  /* A logo sits in the row's leading slot, grouped with the title so the
     outer flex row (title-side vs. meta-side, `justify-content:
     space-between`) still has exactly two children -- adding the logo as a
     third would let it float to the middle instead of hugging the title. */
  const titleInner = html`${row.title}${tag}${sub}`;
  const leading = row.logo
    ? html`<span class="row-lead"><img class="org-logo" src="${assetUrl(`/assets/images/logos/${row.logo}.png`)}" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}</span></span>`
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

    /* A row carrying both a figure and text lays them out side by side --
       text in the left column, figure in the right -- rather than stacking
       the figure above the first sentence, where an 800px-tall certificate
       scan pushed the text it belongs to off the bottom of the screen. The
       two-column geometry is components/row-list.css's; what is decided here
       is only that the figure is a sibling of the text rather than the first
       thing inside it, because a column layout needs the prose wrapped in
       one element it can size.

       A figure with no text beside it -- the four Activities rows whose
       whole `detail` is a photograph, or a hypothetical source + proofImage
       row with no `detail` at all -- takes the second branch and emits the
       markup it always did. There is nothing to put in a left column, so it
       gets no columns, and those rows' bytes are unchanged. */
    const hasAside = proofFig !== null || row.detailAside !== undefined;
    if (hasAside && row.detail !== undefined) {
      const measured = measureText(row.detail);
      const asideSize = row.proofImage ?? row.detailAsideSize;
      const track = asideTrack(measured, asideSize, row.detailAsideTrack);
      const capStyle = track === null ? null : raw(` style="--row-aside-cap: ${track}px"`);
      const prose = measured.chars >= PROSE_THRESHOLD ? ' is-prose' : '';
      return html`
${indent}<li class="reveal"><details class="row-details"><summary class="row-static">${leading}<span class="row-meta-group">${rowMeta(row)}${EXPAND_GLYPH}</span></summary><div class="row-detail-body has-aside${raw(prose)}"${capStyle}><div class="row-detail-main">${row.detail}${sourceLink}</div><div class="row-detail-aside">${proofFig}${row.detailAside}</div></div></details></li>`;
    }

    return html`
${indent}<li class="reveal"><details class="row-details"><summary class="row-static">${leading}<span class="row-meta-group">${rowMeta(row)}${EXPAND_GLYPH}</span></summary><div class="row-detail-body">${proofFig}${row.detailAside}${row.detail}${sourceLink}</div></details></li>`;
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
${indent}<li class="reveal"><a class="row-static row-sourced" href="${row.source.url}" target="_blank" rel="noopener noreferrer">${row.logo ? html`<span class="row-lead"><img class="org-logo" src="${assetUrl(`/assets/images/logos/${row.logo}.png`)}" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — verification: ${row.source.label}. Opens in a new tab.</span></span></span>` : html`<span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — verification: ${row.source.label}. Opens in a new tab.</span></span>`}${rowMeta(row)}</a></li>`;
  }

  if (row.proofImage) {
    const proof = row.proofImage;
    return html`
${indent}<li class="reveal"><a class="row-static row-sourced proof-zoom" href="${assetUrl(`/assets/images/proof/${proof.slug}.jpg`)}" data-caption="${proof.caption ?? ''}" data-alt="${proof.alt}">${row.logo ? html`<span class="row-lead"><img class="org-logo" src="${assetUrl(`/assets/images/logos/${row.logo}.png`)}" alt="" width="40" height="40" loading="lazy" decoding="async"><span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — view proof image: ${proof.alt}.</span></span></span>` : html`<span class="row-title">${titleInner}${PROOF_GLYPH}<span class="visually-hidden"> — view proof image: ${proof.alt}.</span></span>`}${rowMeta(row)}</a></li>`;
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
