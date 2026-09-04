/*
 * Structured data, computed per page.
 *
 * Built here rather than hand-written into each template so the Person and
 * WebSite nodes are identical across every page by construction. Each page
 * only declares `schemaType` (and optionally `breadcrumb: false`) in its front
 * matter; everything else is derived.
 */

import { createUrlFilter } from '../_includes/lib/url.ts';
import type { EleventyPage, Site } from '../_includes/lib/types.ts';

/** The slice of the cascade this computation reads. */
interface ComputedInput {
  readonly site: Site;
  readonly page: EleventyPage;
  readonly title?: string;
  readonly description?: string;
  readonly navLabel?: string;
  readonly schemaType?: string;
  readonly breadcrumb?: false;
}

/** Loose node shape -- schema.org graphs are not worth modelling exactly. */
type SchemaNode = Record<string, unknown>;

/* Delegates prefix-joining to the same `url()` used for canonicals/OG tags,
   rather than re-deriving it -- `url()` normalises to exactly one leading and
   one trailing slash, so a misconfigured PATH_PREFIX (e.g. missing its
   leading slash) self-heals here exactly as it does everywhere else, instead
   of producing a JSON-LD URL with no separator between host and path. */
function abs(site: Site, urlPath: string): string {
  return `${site.url}${createUrlFilter(site.pathPrefix)(urlPath)}`;
}

export default {
  structuredData: (data: ComputedInput): string => {
    const { site, page, title, description } = data;
    if (!title) return '{}';

    const pageUrl = abs(site, page.url);
    const home = abs(site, '/');

    const person: SchemaNode = {
      '@type': 'Person',
      '@id': `${home}#person`,
      name: site.name,
      givenName: 'Biswajit',
      familyName: 'Mohapatra',
      honorificPrefix: 'Dr.',
      url: home,
      image: abs(site, site.ogImage),
      jobTitle: site.jobTitle,
      worksFor: { '@type': 'Organization', name: site.organization },
      knowsAbout: [
        'Cloud transformation',
        'Artificial intelligence',
        'DevOps',
        'CIO advisory',
        'Digital modernization',
      ],
      sameAs: [site.linkedin, site.youtube, site.x, site.facebook],
    };

    const website: SchemaNode = {
      '@type': 'WebSite',
      '@id': `${home}#website`,
      url: home,
      name: site.name,
      description: site.description,
      publisher: { '@id': `${home}#person` },
      inLanguage: site.lang,
    };

    const webpage: SchemaNode = {
      '@type': data.schemaType || 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { '@id': `${home}#website` },
      about: { '@id': `${home}#person` },
      inLanguage: site.lang,
      primaryImageOfPage: { '@type': 'ImageObject', url: abs(site, site.ogImage) },
    };

    const graph: SchemaNode[] = [website, person, webpage];

    if (page.url === '/') {
      webpage['mainEntity'] = { '@id': `${home}#person` };
    } else if (data.breadcrumb !== false) {
      webpage['breadcrumb'] = { '@id': `${pageUrl}#breadcrumb` };
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: home },
          { '@type': 'ListItem', position: 2, name: data.navLabel || title, item: pageUrl },
        ],
      });
    }

    /* This is embedded via raw() into a <script type="application/ld+json">
       element -- correctly, since HTML-escaping JSON would corrupt it (e.g.
       '"' becoming '&quot;' breaks JSON.parse). But the browser's HTML
       tokenizer looks for "</script" independent of JSON quoting: a title or
       description that ever contained that substring would prematurely close
       the script element and spill the remainder of the JSON as raw markup.
       "<" has no meaning in JSON, so replacing it with its Unicode escape
       neutralises "</script", "<!--" and any other tag-like substring without
       touching the JSON's validity or its parsed values. */
    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
      /</g,
      '\\u003c',
    );
  },
};
