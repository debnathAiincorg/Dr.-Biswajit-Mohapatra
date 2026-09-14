/*
 * The `url` filter, bound to this build's pathPrefix.
 *
 * Most partials receive a `UrlFilter` explicitly through `PartialContext`, and
 * that remains the preferred shape -- it is what makes them callable from a
 * test without booting Eleventy. This module exists for the handful of call
 * sites that emit an asset path from deep inside a render helper that has no
 * context to hand: `proofFigure` and `rowItem` in components/row-list.ts, the
 * figure helpers in content/lab-notes.ts, and the two in activities.ts.
 *
 * Those six sites hardcoded a root-absolute `/assets/...` string instead.
 * Under PATH_PREFIX that is simply wrong: a project-page build emitted 163
 * references to `/assets/...` where the files are actually served from
 * `/repo/assets/...`, so every organisation logo and all 38 proof images 404ed
 * on the GitHub Pages pipeline that .github/workflows/deploy.yml configures.
 *
 * Threading a filter down through rowList -> rowItem -> proofFigure would have
 * meant changing the signature of `rowList`, `listPage` and all nine of their
 * callers to fix six string literals. A module-level binding is the smaller
 * change and has precedent: lib/page.ts already keeps its own module-level
 * `urlFilterCache` keyed on pathPrefix, for the same reason -- pathPrefix is
 * fixed for the duration of a build, so a filter built from it is too.
 */

import site from '../../_data/site.ts';
import { createUrlFilter } from './url.ts';

/** `url`, pre-bound to `site.pathPrefix`. Use where no `UrlFilter` is in scope. */
export const assetUrl = createUrlFilter(site.pathPrefix);
