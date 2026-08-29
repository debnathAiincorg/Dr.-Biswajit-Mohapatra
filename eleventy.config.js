import { build as esbuild } from 'esbuild';
import { minify as minifyHtml } from 'html-minifier-terser';
import { stat } from 'node:fs/promises';
import module from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PROD = process.env.NODE_ENV === 'production';
const PATH_PREFIX = process.env.PATH_PREFIX || '/';
const WATCHING = process.argv.includes('--serve') || process.argv.includes('--watch');

/* See scripts/watch-fresh-includes.mjs: without this, editing a partial or a
   component that pages reach indirectly rebuilds the site from stale modules. */
if (WATCHING) {
  module.register('./scripts/watch-fresh-includes.mjs', import.meta.url, {
    data: { dir: path.resolve('src/_includes') },
  });
}

/*
 * This config stays JavaScript on purpose.
 *
 * Eleventy only auto-discovers `.eleventy.js` and `eleventy.config.{js,mjs,cjs}`
 * -- an `eleventy.config.ts` would need `--config=` on every invocation, and a
 * bare `npx eleventy` would silently build with default settings instead. It
 * would also gain nothing: Eleventy ships no type definitions, so
 * `eleventyConfig` is untyped either way. The templates it loads are TypeScript;
 * this file is the Node plumbing around them.
 */

/*
 * Assets are bundled by esbuild rather than by Eleventy passthrough, so that:
 *   - main.css's @import graph collapses into one file (authoring split, one request)
 *   - main.js's ES modules bundle into one classic script (no import waterfall)
 *   - both minify in production and stay readable in dev
 */
async function buildAssets() {
  const common = {
    bundle: true,
    minify: PROD,
    sourcemap: !PROD,
    logLevel: 'silent',
    absWorkingDir: process.cwd(),
  };

  await esbuild({
    ...common,
    entryPoints: ['src/assets/js/main.js'],
    outfile: 'dist/assets/js/main.js',
    format: 'iife',
    target: ['es2019'],
    /* Ignore the project tsconfig.json. It exists to type-check the TypeScript
       templates; esbuild would otherwise apply its `strict` (and so
       `alwaysStrict`) setting to this browser bundle, changing the emitted
       JavaScript. The client-side assets are plain JS and are not part of the
       template type-check. */
    tsconfigRaw: {},
  });

  await esbuild({
    ...common,
    entryPoints: ['src/assets/css/main.css'],
    outfile: 'dist/assets/css/main.css',
    loader: { '.css': 'css' },
  });

  await esbuild({
    ...common,
    entryPoints: ['src/assets/css/pages/home.css'],
    outfile: 'dist/assets/css/pages/home.css',
    loader: { '.css': 'css' },
  });
}

/*
 * Loader for `_data/*.ts`.
 *
 * Eleventy resolves .js/.cjs/.mjs data files itself but treats every other
 * extension as user-registered, and -- unlike the built-in path -- it does not
 * invoke a function export. buildDate.ts exports a function, so that call
 * happens here.
 */
async function importDataModule(filePath) {
  const fileUrl = pathToFileURL(path.resolve(filePath));

  /* Busts the ESM module cache on watch rebuilds; without it an edited data
     file would keep serving whatever the first import returned. */
  const { mtimeMs } = await stat(filePath);
  fileUrl.search = `mtime=${mtimeMs}`;

  const module = await import(fileUrl.href);
  const value = module.default ?? module;
  return typeof value === 'function' ? await value() : value;
}

export default function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', buildAssets);

  /*
   * TypeScript templates.
   *
   * `key: '11ty.js'` aliases the extension onto Eleventy's built-in JavaScript
   * engine, so a `.ts` module exporting `data` and `render` is handled exactly
   * like a `.11ty.js` one. TypeScript itself is stripped at import time by tsx,
   * loaded via NODE_OPTIONS in the npm scripts.
   */
  eleventyConfig.addExtension(['ts'], { key: '11ty.js' });
  eleventyConfig.addDataExtension('ts', { parser: importDataModule, read: false });

  /*
   * Required because `ts` is registered as both a template format and a data
   * extension.
   *
   * Eleventy looks for a template's own local data file by joining the
   * template's basename with each entry in the data-file suffix list and each
   * registered data extension. That list defaults to `['.11tydata', '']` -- and
   * the empty suffix makes `src/index.ts` resolve as the data file for
   * `src/index.ts` itself. Every page would import itself a second time, purely
   * for its `data` export, doubling the module work on each build and making
   * the template its own data dependency. Dropping the empty suffix leaves only
   * `<name>.11tydata.ts`, which is what a local data file was always meant to
   * be named. No `<name>.json` local data files exist in src/, so nothing else
   * relied on the empty-suffix lookup.
   */
  eleventyConfig.setDataFileSuffixes(['.11tydata']);

  /* Source files esbuild owns; Eleventy watches them but must not copy them. */
  eleventyConfig.addWatchTarget('./src/assets/css/');
  eleventyConfig.addWatchTarget('./src/assets/js/');
  eleventyConfig.ignores.add('./src/assets/css/**');
  eleventyConfig.ignores.add('./src/assets/js/**');

  /* Partials and components are imported by the templates, not rendered, so an
     edit to one has to invalidate the pages that import it. */
  eleventyConfig.addWatchTarget('./src/_includes/');

  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': 'assets/icons' });
  eleventyConfig.addPassthroughCopy({ 'src/assets/vendor': 'assets/vendor' });
  eleventyConfig.addPassthroughCopy({ 'src/site.webmanifest': 'site.webmanifest' });

  /*
   * CNAME is opt-in, never committed into the build by default.
   *
   * Writing a CNAME tells GitHub Pages to claim that hostname. The production
   * domain currently serves a different, live site, so a build that always
   * emitted one could take it over -- or, if DNS does not point at Pages,
   * make this site unreachable at both URLs. Set CNAME_DOMAIN explicitly at
   * cutover time:  CNAME_DOMAIN=example.com npm run build
   */
  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    const domain = process.env.CNAME_DOMAIN;
    if (!domain) return;
    const { writeFile, mkdir } = await import('node:fs/promises');
    await mkdir(dir.output, { recursive: true });
    await writeFile(path.join(dir.output, 'CNAME'), `${domain}
`, 'utf8');
  });

  /*
   * No `addFilter` calls remain.
   *
   * The Nunjucks filters these templates used are now ordinary functions:
   * `url` is src/_includes/lib/url.ts, `safe`/autoescaping is the `html` tag in
   * src/_includes/lib/html.ts, and `replace`/`join`/`default`/`dump` are
   * JavaScript expressions at the point of use. The two custom filters this
   * config previously registered, `absolute` and `jsonld`, were called by no
   * template and depended on Nunjucks' `this.ctx`, so they are gone rather
   * than ported.
   */

  if (PROD) {
    eleventyConfig.addTransform('minify-html', async function (content) {
      if (!(this.page.outputPath || '').endsWith('.html')) return content;
      return minifyHtml(content, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        sortClassName: true,
      });
    });
  }

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    pathPrefix: PATH_PREFIX,
    /* Every page is a TypeScript template; no other engine is enabled, so
       nothing can silently fall back to Liquid or Nunjucks. */
    templateFormats: ['ts'],
    markdownTemplateEngine: false,
    htmlTemplateEngine: false,
  };
}
