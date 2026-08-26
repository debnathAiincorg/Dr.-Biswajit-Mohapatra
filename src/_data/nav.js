/*
 * Primary navigation, single source of truth.
 *
 * Rendered into both the inline nav and the compact panel, and used to build
 * sitemap.xml. Adding a destination here adds it everywhere.
 */
export default [
  { url: '/',                    label: 'About' },
  { url: '/phd-opportunities/',  label: 'PhD Opportunities' },
  { url: '/news/',               label: 'News' },
  { url: '/awards/',             label: 'Awards' },
  { url: '/education/',          label: 'Education' },
  { url: '/experience/',         label: 'Experience' },
  { url: '/publications/',       label: 'Publications' },
  { url: '/projects/',           label: 'Projects' },
  { url: '/students/',           label: 'Students' },
  { url: '/alumni/',             label: 'Alumni' },
  { url: '/gallery/',            label: 'Gallery' },
  { url: '/courses/',            label: 'Courses' },
  { url: '/activities/',         label: 'Activities' },
  { url: '/contact/',            label: 'Contact' },
];
