/*
 * External link checker.
 *
 * Nothing on this site links outward until this script says the URL answers.
 * See docs/superpowers/specs/2026-08-31-proof-links-gallery-logos-design.md,
 * "The governing rule: nothing ships unverified".
 *
 * By default it checks every entry in src/_includes/content/sources.ts. Pass
 * URLs as arguments to check an ad-hoc set instead:
 *
 *   node scripts/check-links.mjs
 *   node scripts/check-links.mjs https://example.com/a https://example.com/b
 *   node scripts/check-links.mjs --json
 *
 * Exit code is 1 if any checked URL failed, so CI can gate on it.
 *
 * Why GET and not HEAD: several of the hosts here (Credly, Oracle certview,
 * Accredible) answer HEAD with 403 or 405 while serving GET perfectly well.
 * A HEAD-only checker would report working links as dead.
 */

import process from 'node:process';

const TIMEOUT_MS = 30_000;
const CONCURRENCY = 6;

/* A real browser UA. Credly and Accredible serve a challenge page or an
   outright 403 to obviously-automated agents; this is about being served the
   same document a visitor gets, not about evading anything. */
const HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
};

function extractTitle(html) {
  const og = /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i.exec(html);
  if (og?.[1]) return decode(og[1]);
  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return title?.[1] ? decode(title[1].replace(/\s+/g, ' ').trim()) : '';
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function check(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: HEADERS,
    });
    /* Only text is worth reading for a title; a PDF or an image is fine as
       proof but has no <title> to report. */
    const type = response.headers.get('content-type') ?? '';
    let title = '';
    if (type.includes('html')) {
      title = extractTitle((await response.text()).slice(0, 400_000));
    }
    return {
      url,
      ok: response.ok,
      status: response.status,
      finalUrl: response.url !== url ? response.url : '',
      type: type.split(';')[0],
      title,
    };
  } catch (error) {
    return { url, ok: false, status: 0, error: error.cause?.code ?? error.name ?? String(error) };
  } finally {
    clearTimeout(timer);
  }
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await worker(items[index]);
      }
    }),
  );
  return results;
}

async function urlsFromRegistry() {
  const module = await import('../src/_includes/content/sources.ts');
  const registry = module.sources ?? module.default;
  return Object.entries(registry).map(([key, source]) => ({ key, url: source.url }));
}

const argv = process.argv.slice(2);
const asJson = argv.includes('--json');
const explicit = argv.filter((argument) => !argument.startsWith('--'));

let targets;
if (explicit.length > 0) {
  targets = explicit.map((url) => ({ key: '', url }));
} else {
  try {
    targets = await urlsFromRegistry();
  } catch (error) {
    console.error('Could not load the source registry:', error.message);
    console.error('Pass URLs as arguments to check an ad-hoc set instead.');
    process.exit(2);
  }
}

const results = await mapLimit(targets, CONCURRENCY, async ({ key, url }) => ({
  key,
  ...(await check(url)),
}));

if (asJson) {
  console.log(JSON.stringify(results, null, 2));
} else {
  for (const result of results) {
    const mark = result.ok ? 'OK  ' : 'DEAD';
    const code = String(result.status || result.error).padEnd(5);
    console.log(`${mark} ${code} ${result.key ? result.key.padEnd(28) : ''}${result.url}`);
    if (result.title) console.log(`          ${result.title}`);
    if (result.finalUrl) console.log(`       -> ${result.finalUrl}`);
  }
  const dead = results.filter((result) => !result.ok);
  console.log(`\n${results.length - dead.length}/${results.length} answered.`);
  if (dead.length > 0) console.log(`${dead.length} failed.`);
}

process.exit(results.some((result) => !result.ok) ? 1 : 0);
