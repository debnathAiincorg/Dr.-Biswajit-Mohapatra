import type { Row } from '../components/row-list.ts';

/*
 * Lab news items, shared by /news/ and the homepage teaser, which previously
 * carried two hand-maintained copies of the same four headlines.
 *
 * The two pages once marked these up differently -- the homepage used
 * <time datetime="2026-06">, /news/ a plain <span>. They now both use <time>,
 * which is the correct element for a date and gives assistive technology and
 * crawlers a machine-readable value on every page.
 */

export interface LabNote {
  readonly title: string;
  /** Human-readable label, e.g. "Jun 2026". */
  readonly meta: string;
  /** Machine-readable value for <time datetime>. */
  readonly datetime: string;
}

export const labNotes: readonly LabNote[] = [
  {
    title: 'New paper accepted at the International Symposium on Speech Processing',
    meta: 'Jun 2026',
    datetime: '2026-06',
  },
  {
    title: 'Speech Lab welcomes two new PhD students',
    meta: 'May 2026',
    datetime: '2026-05',
  },
  {
    title: 'Dr. Mohapatra named Fellow of the Fictional Linguistics Society',
    meta: 'Apr 2026',
    datetime: '2026-04',
  },
  {
    title: 'Lab receives placeholder grant for spoken dialogue research',
    meta: 'Mar 2026',
    datetime: '2026-03',
  },
];

/** Rows for the `row-list` renderer, with the date as machine-readable `<time>`. */
export function asRows(): Row[] {
  return labNotes.map((note) => ({
    title: note.title,
    meta: note.meta,
    datetime: note.datetime,
  }));
}
