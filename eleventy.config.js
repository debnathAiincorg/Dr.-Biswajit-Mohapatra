import { build as esbuild } from 'esbuild';
import { minify as minifyHtml } from 'html-minifier-terser';
import path from 'node:path';

const PROD = process.env.NODE_ENV === 'production';
const PATH_PREFIX = process.env.PATH_PREFIX || '/';

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

export default function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', buildAssets);

  /* Source files esbuild owns; Eleventy watches them but must not copy them. */
  eleventyConfig.addWatchTarget('./src/assets/css/');
  eleventyConfig.addWatchTarget('./src/assets/js/');
  eleventyConfig.ignores.add('./src/assets/css/**');
  eleventyConfig.ignores.add('./src/assets/js/**');

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

  /* Absolute URL for feeds, canonicals and structured data. */
  eleventyConfig.addFilter('absolute', function (urlPath) {
    const base = this.ctx?.site?.url ?? '';
    return base + eleventyConfig.getFilter('url')(urlPath);
  });

  /* JSON-LD is assembled in JS rather than hand-written per page, so the
     Person and WebSite nodes cannot drift between the 16 pages. */
  eleventyConfig.addFilter('jsonld', function (value) {
    return JSON.stringify(value, null, PROD ? 0 : 2);
  });

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
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'html', 'md'],
  };
}
