/*
 * Minimal static server for previewing a production build.
 *
 * `npm run dev` is the normal workflow (Eleventy's own dev server, with live
 * reload). This exists to check the *built* output -- minified HTML/CSS/JS,
 * clean URLs, the real 404 page -- exactly as a static host would serve it.
 *
 * Serves directory URLs as index.html and falls back to 404.html, which is how
 * Netlify, Vercel and GitHub Pages behave, so previewing here matches production.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';

const ROOT = resolve('dist');
const PORT = Number(process.env.PORT) || 8080;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function send404(res) {
  try {
    const body = await readFile(join(ROOT, '404.html'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}

createServer(async (req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  // Resolve against ROOT and confirm the result is still inside it. This
  // handles ../ traversal and absolute paths without hand-rolled regex.
  const target = resolve(ROOT, '.' + (rel.startsWith('/') ? rel : `/${rel}`));
  if (target !== ROOT && !target.startsWith(ROOT + sep)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const body = await readFile(target);
    res.writeHead(200, { 'Content-Type': TYPES[extname(target)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    await send404(res);
  }
}).listen(PORT, () => console.log(`dist/ served on http://localhost:${PORT}`));
