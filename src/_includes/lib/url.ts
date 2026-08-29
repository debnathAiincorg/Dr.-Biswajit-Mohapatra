/*
 * The `url` filter, as a plain function.
 *
 * Nunjucks reached Eleventy's built-in `url` filter through the template
 * engine. Partials here are ordinary functions with no engine context bound to
 * `this`, so the filter is passed down explicitly instead -- which also makes
 * every partial callable from a test without booting Eleventy.
 *
 * Semantics match Eleventy's filter (src/Filters/Url.js) for the inputs this
 * site uses: root-absolute paths and fully-qualified URLs. Equivalence is
 * verified by building with PATH_PREFIX set and diffing the output.
 */

export type UrlFilter = (urlPath: string) => string;

const ABSOLUTE_URL = /^[a-z][a-z0-9+.-]*:\/\//i;

export function createUrlFilter(pathPrefix: string): UrlFilter {
  /* Normalised to exactly one leading and one trailing slash: "/" or "/repo/". */
  const prefix = `/${pathPrefix}/`.replace(/\/+/g, '/');

  return function url(urlPath: string): string {
    if (!urlPath) return prefix;

    /* External and protocol-relative URLs pass through untouched. */
    if (ABSOLUTE_URL.test(urlPath) || urlPath.startsWith('//')) return urlPath;

    /* Relative paths are resolved by the browser, not by the prefix. */
    if (!urlPath.startsWith('/')) return urlPath;

    return `${prefix}${urlPath}`.replace(/\/+/g, '/');
  };
}
