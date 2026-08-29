import { html, type Html } from '../lib/html.ts';

/**
 * The bordered `.panel` band: News, PhD Opportunities, and the homepage news
 * teaser. Everything from the eyebrow down is supplied by the caller, because
 * the three differ in heading level and list type.
 *
 * These panels used to open with a decorative circular `.mark` icon above the
 * eyebrow. It was removed sitewide; the panel now starts at its eyebrow, the
 * same as every `.content-head` section.
 *
 * @param children Block starting at eight spaces of indentation, no trailing newline.
 */
export function panel(options: {
  readonly id: string;
  readonly ariaLabelledby?: string;
  readonly children: Html;
}): Html {
  const labelled = options.ariaLabelledby
    ? html` aria-labelledby="${options.ariaLabelledby}"`
    : null;

  return html`  <section class="content-section panel" id="${options.id}"${labelled}>
    <div class="container">
      <div class="panel-inner">
${options.children}
      </div>
    </div>
  </section>
`;
}
