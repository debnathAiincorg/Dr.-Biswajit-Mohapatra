/*
 * Primary navigation, single source of truth.
 *
 * Rendered into the drawer (every entry but About, which the wordmark links
 * to) and used to build sitemap.xml. Adding a destination here adds it
 * everywhere. The order is the drawer's order, set by the site owner
 * 2026-09-26 -- keep it when adding or renaming entries.
 */

import type { NavItem } from '../_includes/lib/types.ts';

const nav: readonly NavItem[] = [
  { url: '/',                      label: 'About' },
  { url: '/awards/',               label: 'Awards' },
  { url: '/patents/',              label: 'Patents' },
  { url: '/publications/',         label: 'Publications' },
  { url: '/board-roles/',          label: 'Board & Advisory' },
  { url: '/academic-engagement/',  label: 'Academic Engagement' },
  { url: '/news/',                 label: 'News' },
  { url: '/projects/',             label: 'Projects' },
  { url: '/activities/',           label: 'Activities' },
  { url: '/education/',            label: 'Education' },
  { url: '/experience/',           label: 'Experience' },
  { url: '/certifications/',       label: 'Certifications' },
  { url: '/gallery/',              label: 'Gallery' },
  { url: '/contact/',              label: 'Social' },
];

export default nav;
