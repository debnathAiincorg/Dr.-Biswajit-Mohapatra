import { raw, type Renderable } from '../lib/html.ts';

/*
 * The photograph set, defined once.
 *
 * gallery.njk carried all eight as hand-written <figure> blocks and index.njk
 * repeated three of them verbatim, so a corrected caption or alt text had to be
 * edited in two places. They are now one list; the homepage takes a slice.
 *
 * Captions carry HTML entity references, as the Nunjucks markup did, so they
 * are marked `raw`. Alt text uses literal characters and is escaped normally.
 */

export interface Photo {
  /** Basename under /assets/images/photos, without extension. */
  readonly slug: string;
  readonly alt: string;
  readonly caption: Renderable;
  readonly date: string;
  readonly width: number;
  readonly height: number;
}

export const photos: readonly Photo[] = [
  {
    slug: 'photo-1',
    alt: 'Photo collage from the National Conference on Social Innovation at Pune International Centre, where Dr. Biswajit Mohapatra received the Anjani Mashelkar Inclusive Innovation Award.',
    caption: 'Anjani Mashelkar Inclusive Innovation Award, National Conference on Social Innovation',
    date: 'November 2019',
    width: 768,
    height: 768,
  },
  {
    slug: 'photo-2',
    alt: 'Photo collage from the DevOps Initiative: A Leader\u2019s Perspective event at Novotel Pune, showing Dr. Biswajit Mohapatra presenting at a whiteboard and with fellow delegates.',
    caption: raw('&ldquo;DevOps Initiative: A Leader&rsquo;s Perspective,&rdquo; Novotel Pune'),
    date: 'March 2020',
    width: 768,
    height: 959,
  },
  {
    slug: 'photo-3',
    alt: 'Photo collage from DevOps Institute Partner Days 2019: Dr. Biswajit Mohapatra speaking on stage, sitting on a panel, and with his Partner Days certificate.',
    caption: 'DevOps Institute Partner Days 2019',
    date: '2019',
    width: 600,
    height: 600,
  },
  {
    slug: 'photo-4',
    alt: 'Photo collage from the Pune Agile UnConference 2019 at Hyatt Regency Pune, showing Dr. Biswajit Mohapatra speaking and the speaker plaque presented to him.',
    caption: 'Pune Agile UnConference 2019 (PAUC19), Hyatt Regency Pune',
    date: 'August 2019',
    width: 768,
    height: 768,
  },
  {
    slug: 'photo-5',
    alt: 'Photo collage from the Nirmaan Leadership Summit at IIM Sirmaur, showing Dr. Biswajit Mohapatra speaking at the podium and receiving a commemorative plaque.',
    caption: 'Nirmaan Leadership Summit, IIM Sirmaur',
    date: 'November 2018',
    width: 600,
    height: 600,
  },
  {
    slug: 'photo-6',
    alt: 'Dr. Biswajit Mohapatra standing in front of the Anjani Mashelkar Inclusive Innovation Award backdrop at Pune International Centre.',
    caption: 'At the Anjani Mashelkar Inclusive Innovation Award, Pune International Centre',
    date: 'November 2019',
    width: 724,
    height: 543,
  },
  {
    slug: 'photo-8',
    alt: 'Dr. Biswajit Mohapatra accepting a commemorative wooden plaque from an event host on stage.',
    caption: 'Receiving a commemorative plaque at a DevOps Institute event',
    date: '2019',
    width: 724,
    height: 543,
  },
  {
    slug: 'photo-9',
    alt: 'Close-up photograph of Dr. Biswajit Mohapatra with a fellow delegate at the National Conference on Social Innovation.',
    caption: 'With a fellow delegate at the National Conference on Social Innovation',
    date: 'November 2019',
    width: 384,
    height: 256,
  },
];

/** The three the homepage teases, named rather than sliced by index. */
export const homepagePhotoSlugs = ['photo-1', 'photo-2', 'photo-4'] as const;

export function photosBySlug(slugs: readonly string[]): Photo[] {
  return slugs.map((slug) => {
    const photo = photos.find((candidate) => candidate.slug === slug);
    if (!photo) throw new Error(`Unknown photo slug: ${slug}`);
    return photo;
  });
}
