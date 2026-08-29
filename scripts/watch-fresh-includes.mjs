/*
 * Watch-mode ESM cache busting for the shared template modules.
 *
 * Eleventy re-imports a changed template with a cache-busting query, and its
 * own resolver (src/Util/EsmResolver.js) does the same for files it saw change.
 * Neither reaches a module that is only reachable *through* an unchanged one:
 * editing partials/footer.ts leaves lib/page.ts and layouts/base.ts cached, and
 * those cached modules still hold the old footer. The page rebuilds and looks
 * unchanged.
 *
 * This hook versions every module under src/_includes by the newest mtime in
 * that tree, so a change to any one of them gives all of them a new URL and the
 * whole shared graph is re-evaluated. When nothing changes the version is
 * stable, so modules stay cached and repeat builds are unaffected.
 *
 * Registered only for --serve/--watch; a one-shot build starts with an empty
 * module cache and needs none of this.
 */

import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let watchedDir = '';
let cachedVersion = 0;
let cachedAt = 0;

export function initialize(data) {
  watchedDir = data.dir;
}

/** Newest mtime under the watched directory, memoised briefly. */
function graphVersion() {
  const now = Date.now();
  if (now - cachedAt < 200) return cachedVersion;
  cachedAt = now;

  let latest = 0;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.ts')) {
        const { mtimeMs } = statSync(full);
        if (mtimeMs > latest) latest = mtimeMs;
      }
    }
  };

  try {
    walk(watchedDir);
  } catch {
    /* Directory can be mid-write during a save; keep the previous version. */
  }

  cachedVersion = latest;
  return latest;
}

export async function resolve(specifier, context, nextResolve) {
  const resolved = await nextResolve(specifier, context);
  if (!resolved.url.startsWith('file:')) return resolved;

  try {
    const withoutQuery = new URL(resolved.url);
    withoutQuery.search = '';
    if (!fileURLToPath(withoutQuery).startsWith(watchedDir)) return resolved;

    const versioned = new URL(resolved.url);
    versioned.searchParams.set('_includes_v', String(graphVersion()));
    return { ...resolved, url: versioned.href };
  } catch {
    return resolved;
  }
}
