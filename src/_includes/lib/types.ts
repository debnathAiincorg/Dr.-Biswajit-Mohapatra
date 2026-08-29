/*
 * Shape of the data cascade, as the templates actually consume it.
 *
 * Eleventy ships no type definitions, so these describe the contract this
 * project relies on rather than re-exporting anything upstream. Their value is
 * at the page/layout seam: under Nunjucks a page that omitted `description`
 * silently rendered an empty <meta name="description">, and nothing complained.
 */

import type { Html } from './html.ts';
import type { UrlFilter } from './url.ts';

/* Re-exported so templates can import every shared type from one module. */
export type { UrlFilter };

export interface NavItem {
  readonly url: string;
  readonly label: string;
}

export interface Site {
  readonly url: string;
  readonly pathPrefix: string;
  readonly name: string;
  readonly shortName: string;
  readonly jobTitle: string;
  readonly organization: string;
  readonly locale: string;
  readonly lang: string;
  readonly linkedin: string;
  readonly ogImage: string;
  readonly ogImageAlt: string;
  readonly themeLight: string;
  readonly themeDark: string;
  readonly allowIndexing: boolean;
  readonly buildYear: number;
}

/** The subset of Eleventy's `page` object these templates read. */
export interface EleventyPage {
  readonly url: string;
  readonly inputPath: string;
  readonly fileSlug: string;
  readonly filePathStem: string;
  readonly date: Date;
  readonly outputPath: string | false;
}

/**
 * Front matter. Required fields are required because `head` cannot render a
 * correct document without them -- omitting one is now a compile error rather
 * than an empty meta tag in production.
 */
export interface PageMeta {
  readonly title: string;
  readonly description: string;
  readonly permalink: string;
  readonly navLabel?: string;
  readonly schemaType?: string;
  readonly bodyClass?: string;
  readonly pageCss?: string;
  readonly ogType?: string;
  readonly preloadImage?: string;
  readonly breadcrumb?: false;
  readonly eleventyExcludeFromCollections?: boolean;
}

/** Front matter for output that is not an HTML document (robots.txt, sitemap.xml). */
export interface FileMeta {
  readonly permalink: string;
  readonly eleventyExcludeFromCollections?: boolean;
  readonly title?: string;
}

/** Global data, merged into every template's render data by Eleventy. */
export interface GlobalData {
  readonly site: Site;
  readonly nav: readonly NavItem[];
  readonly buildDate: string;
}

/** What a page's `render` receives: global data + its own front matter. */
export type PageData<Meta extends PageMeta = PageMeta> = GlobalData &
  Meta & {
    readonly page: EleventyPage;
    /** Built by _data/eleventyComputed.ts; already a JSON string. */
    readonly structuredData: string;
  };

/** What the base layout receives: page data plus the rendered page body. */
export type LayoutData<Meta extends PageMeta = PageMeta> = PageData<Meta> & {
  readonly content: Html;
};

/** Context threaded into partials in place of Nunjucks' bound `this`. */
export interface PartialContext {
  readonly site: Site;
  readonly nav: readonly NavItem[];
  readonly page: EleventyPage;
  readonly url: UrlFilter;
}
