/*
 * Structured data, computed per page.
 *
 * Built here rather than hand-written into each template so the Person and
 * WebSite nodes are identical across every page by construction. Each page
 * only declares `schemaType` (and optionally `breadcrumb: false`) in its front
 * matter; everything else is derived.
 */

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
  /** Never set by any page; kept so the WebSite description falls back as before. */
  readonly siteDescription?: string;
}

/** Loose node shape -- schema.org graphs are not worth modelling exactly. */
type SchemaNode = Record<string, unknown>;

function abs(site: Site, urlPath: string): string {
  const prefix = site.pathPrefix === '/' ? '' : site.pathPrefix.replace(/\/+$/, '');
  return `${site.url}${prefix}${urlPath}`;
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
      worksFor: { '@type': 'CollegeOrUniversity', name: site.organization },
      knowsAbout: [
        'Spoken language processing',
        'Speech perception',
        'Human–AI communication',
        'Psycholinguistics',
        'Conversational turn-taking',
      ],
      sameAs: [site.linkedin],
    };

    const website: SchemaNode = {
      '@type': 'WebSite',
      '@id': `${home}#website`,
      url: home,
      name: site.name,
      description: data.siteDescription || description,
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

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  },
};
