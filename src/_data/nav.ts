/*
 * Primary navigation, single source of truth.
 *
 * Rendered into both the inline nav and the compact panel, and used to build
 * sitemap.xml. Adding a destination here adds it everywhere.
 */

import type { NavItem } from '../_includes/lib/types.ts';

const nav: readonly NavItem[] = [
  { url: '/',                      label: 'About' },
  { url: '/patents/',              label: 'Patents' },
  { url: '/news/',                 label: 'News' },
  { url: '/awards/',               label: 'Awards' },
  { url: '/education/',            label: 'Education' },
  { url: '/experience/',           label: 'Experience' },
  { url: '/publications/',         label: 'Publications' },
  { url: '/projects/',             label: 'Projects' },
  { url: '/academic-engagement/',  label: 'Academic Engagement' },
  { url: '/board-roles/',          label: 'Board & Advisory' },
  { url: '/gallery/',              label: 'Gallery' },
  { url: '/certifications/',       label: 'Certifications' },
  { url: '/activities/',           label: 'Activities' },
  { url: '/contact/',              label: 'Contact' },
];

export default nav;
