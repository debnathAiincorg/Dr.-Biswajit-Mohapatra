/* Stable per-build timestamp for <lastmod>, so every sitemap entry in a given
   build agrees rather than drifting by milliseconds across pages. */
export default (): string => new Date().toISOString().slice(0, 10);
