import { html, type Html } from '../lib/html.ts';
import type { LayoutData, PartialContext } from '../lib/types.ts';
import { head } from '../partials/head.ts';
import { header } from '../partials/header.ts';
import { footer } from '../partials/footer.ts';

/**
 * The document shell every page renders into.
 *
 * Under Nunjucks this was reached through `layout: layouts/base.njk` -- a
 * string, resolved at build time, checked by nothing. It is now an ordinary
 * function, applied by `definePage`, so a page cannot reference a layout that
 * does not exist or hand it data it does not accept.
 */
export function baseLayout(data: LayoutData, context: PartialContext): Html {
  const { site, bodyClass, content } = data;
  const body = bodyClass ? html` class="${bodyClass}"` : null;

  return html`<!DOCTYPE html>
<html lang="${site.lang}">
<head>
${head(data, context.url)}
</head>
<body${body}>
${header(context)}

<main id="main">
${content}
</main>

${footer(site)}
</body>
</html>
`;
}
