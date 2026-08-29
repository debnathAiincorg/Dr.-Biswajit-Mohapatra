/*
 * Template module factories.
 *
 * Eleventy expects a JavaScript/TypeScript template to export `data` and
 * `render`. These wrap that contract so that:
 *
 *   - front matter is type-checked against `PageMeta` rather than being a
 *     free-form object (a page with no `description` no longer builds);
 *   - the base layout is applied by construction, so "layout inheritance" is
 *     function composition that a page cannot forget to opt into;
 *   - partials receive an explicit context instead of relying on whatever
 *     Nunjucks had bound to `this`.
 */

import type { Html } from './html.ts';
import { createUrlFilter, type UrlFilter } from './url.ts';
import type { FileMeta, LayoutData, PageData, PageMeta, PartialContext } from './types.ts';
import { baseLayout } from '../layouts/base.ts';

/* pathPrefix is fixed for a build, so the filter is built once per value. */
const urlFilterCache = new Map<string, UrlFilter>();

function urlFilterFor(pathPrefix: string): UrlFilter {
  let filter = urlFilterCache.get(pathPrefix);
  if (!filter) {
    filter = createUrlFilter(pathPrefix);
    urlFilterCache.set(pathPrefix, filter);
  }
  return filter;
}

function contextFrom(data: PageData): PartialContext {
  return {
    site: data.site,
    nav: data.nav,
    page: data.page,
    url: urlFilterFor(data.site.pathPrefix),
  };
}

export interface PageDefinition<Meta extends PageMeta> {
  data: Meta;
  render: (data: PageData<Meta>, context: PartialContext) => Html;
}

/** A page rendered into the base layout. */
export function definePage<Meta extends PageMeta>(definition: PageDefinition<Meta>): {
  data: Meta;
  render: (data: PageData<Meta>) => string;
} {
  return {
    data: definition.data,
    render(data: PageData<Meta>): string {
      const context = contextFrom(data);
      const content = definition.render(data, context);
      const layoutData: LayoutData<Meta> = { ...data, content };
      return baseLayout(layoutData, context).toString();
    },
  };
}

export interface StandaloneDefinition<Meta extends FileMeta> {
  data: Meta;
  render: (data: Meta & PageData, url: UrlFilter) => Html | string;
}

/**
 * Output that is not rendered into the base layout: the /about.html redirect
 * stub, robots.txt and sitemap.xml.
 */
export function defineStandalone<Meta extends FileMeta>(definition: StandaloneDefinition<Meta>): {
  data: Meta;
  render: (data: Meta & PageData) => string;
} {
  return {
    data: definition.data,
    render(data: Meta & PageData): string {
      return String(definition.render(data, urlFilterFor(data.site.pathPrefix)));
    },
  };
}
