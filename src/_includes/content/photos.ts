import { raw, type Renderable } from '../lib/html.ts';

/*
 * The Gallery's contents, defined once and rendered by both /gallery/ and the
 * homepage teaser.
 *
 * Ordered BEST FIRST, at the site owner's request. Earlier revisions ordered
 * these newest-to-oldest with undated entries last; that convention is
 * superseded, and `date` no longer drives sequence. The strongest image leads
 * because it is the Gallery's LCP element -- see gallery.ts.
 *
 * Every entry comes from the owner's own photographs. The previous set of 36
 * was replaced wholesale: it was mostly multi-panel collages (one was six
 * crops of a single frame, another 300x300), and three entries republished
 * documents already served from proof/ under different filenames. See
 * docs/superpowers/specs/2026-09-19-gallery-media-refresh-design.md.
 *
 * Dates are evidence-only, the standard CLAUDE.md sets for this project: a
 * date appears only where it is printed in the photograph itself, or where a
 * visible role marker dates it. Everything else is DATE_UNKNOWN, not a guess.
 */

/** Rendered where a photograph carries no evidence of its date. */
const DATE_UNKNOWN = raw('&mdash;');

interface GalleryItemBase {
  /** Basename of the asset, without extension. */
  readonly slug: string;
  readonly alt: string;
  readonly caption: Renderable;
  readonly date: Renderable;
  /** Intrinsic size of the still, so cards reserve space before it loads. */
  readonly width: number;
  readonly height: number;
  /*
   * `object-position` for the card's crop, set only where centring is wrong.
   *
   * .photo-figure is `aspect-ratio: 4/5` with `object-fit: cover`, so a
   * landscape photograph is cropped hard to portrait. The set this replaced
   * was square collages and never showed it; these are mostly landscape, and
   * centring pushed the subject of gcc-leadership-conclave against the right
   * edge, partly cut. The full frame is still what gets served -- this moves
   * the visible window, and the lightbox shows the whole photograph.
   */
  readonly focus?: string;
}

/** A still photograph, served from /assets/images/gallery. */
export interface Photo extends GalleryItemBase {
  readonly kind: 'photo';
}

/** A video, served from /assets/video with a poster still beside it. */
export interface GalleryVideo extends GalleryItemBase {
  readonly kind: 'video';
  /** Running time, shown on the card and announced to screen readers. */
  readonly duration: string;
  /*
   * The caption as plain text, for the lightbox's `data-caption`.
   *
   * `caption` may carry markup -- this one italicises a book title -- and an
   * attribute value cannot. Left as `caption` it would reach the viewer as a
   * literal `<em>`, since the lightbox writes it with textContent.
   */
  readonly captionText: string;
}

export type GalleryItem = Photo | GalleryVideo;

/*
 * The discriminant is what lets the video sit in the order rather than being
 * appended to it -- it is the third card, inside the first desktop row.
 */
export const galleryItems: readonly GalleryItem[] = [
  {
    kind: 'photo',
    slug: 'passion-vista-cover-2021',
    alt: 'Dr. Biswajit Mohapatra on the cover of Passion Vista magazine, Collector’s Edition, under the heading The Most Admired Global Indians 2021, captioned Digital Transformation Evangelist.',
    caption: raw('Cover, <em>Passion Vista</em> &mdash; The Most Admired Global Indians'),
    date: 'December 2021',
    width: 928,
    height: 1200,
  },
  {
    kind: 'photo',
    slug: 'keynote-insights-experiment',
    alt: 'Dr. Biswajit Mohapatra speaking on stage beside a slide reading “To get insights, you need to experiment.”',
    caption: raw('&ldquo;To get insights, you need to experiment&rdquo;'),
    date: DATE_UNKNOWN,
    width: 1200,
    height: 800,
    focus: '35% 50%',
  },
  {
    kind: 'video',
    slug: 'devops-odyssey-kalinga-tv',
    alt: 'Kalinga TV news coverage of the launch of The DevOps Odyssey by Dr. Biswajit Mohapatra.',
    caption: raw('Television coverage of <em>The DevOps Odyssey</em> launch'),
    captionText: 'Television coverage of The DevOps Odyssey launch',
    date: 'September 2026',
    width: 600,
    height: 750,
    duration: '3:03',
  },
  {
    kind: 'photo',
    slug: 'conference-speaking-portrait',
    alt: 'Dr. Biswajit Mohapatra addressing a conference audience, holding a presentation clicker, with his slides projected behind him.',
    caption: 'Addressing a conference audience',
    date: DATE_UNKNOWN,
    width: 900,
    height: 1200,
  },
  {
    kind: 'photo',
    slug: 'renaissance-developer-keynote',
    alt: 'Dr. Biswajit Mohapatra presenting a slide titled “The Dawn of Renaissance Developer,” illustrated with a Vitruvian-man drawing holding a laptop.',
    caption: raw('&ldquo;The Dawn of the Renaissance Developer&rdquo;'),
    date: DATE_UNKNOWN,
    width: 1200,
    height: 900,
    focus: '30% 50%',
  },
  {
    kind: 'photo',
    slug: 'iim-sambalpur-ceo-programme-2026',
    alt: 'Dr. Biswajit Mohapatra speaking at a lectern at the Indian Institute of Management Sambalpur, in front of a backdrop reading CEO Immersion Programme 2026.',
    caption: 'CEO Immersion Programme, IIM Sambalpur',
    date: '2026',
    width: 1200,
    height: 800,
  },
  {
    kind: 'photo',
    slug: 'studio-portrait',
    alt: 'Studio portrait of Dr. Biswajit Mohapatra in a navy suit and red patterned tie.',
    caption: 'Portrait',
    date: DATE_UNKNOWN,
    width: 796,
    height: 1200,
  },
  {
    kind: 'photo',
    slug: 'iim-sambalpur-memento-2026',
    alt: 'Dr. Biswajit Mohapatra receiving a framed memento alongside two colleagues at the IIM Sambalpur CEO Immersion Programme.',
    caption: 'Receiving a memento, IIM Sambalpur',
    date: '2026',
    width: 1200,
    height: 800,
  },
  {
    kind: 'photo',
    slug: 'gcc-leadership-conclave',
    alt: 'Dr. Biswajit Mohapatra on stage at the GCC Leadership Conclave, beside a screen showing a hand reaching toward a point of light.',
    caption: 'GCC Leadership Conclave',
    date: DATE_UNKNOWN,
    width: 1200,
    height: 900,
    /* He stands in the right third; centring cropped him against the edge. */
    focus: '72% 50%',
  },
  {
    kind: 'photo',
    slug: 'agricultural-banking-address',
    alt: 'Dr. Biswajit Mohapatra being welcomed with a bouquet on stage at the College of Agricultural Banking, beneath a backdrop naming him VP and Head of Product and Solutions Engineering at Intuitive.ai.',
    caption: 'Guest address, College of Agricultural Banking',
    date: '2026',
    width: 1200,
    height: 800,
  },
  {
    kind: 'photo',
    slug: 'open-source-india-2022',
    alt: 'Dr. Biswajit Mohapatra at the lectern at the 19th edition of Open Source India, NIMHANS Convention Centre, Bengaluru.',
    caption: 'Open Source India, Bengaluru',
    date: 'September 2022',
    width: 900,
    height: 1200,
  },
  {
    kind: 'photo',
    slug: 'robust-to-resilience-talk',
    alt: 'Dr. Biswajit Mohapatra mid-gesture while presenting a slide titled “Robust to Resilience — Reimagining Digital Transformation.”',
    caption: raw('&ldquo;Robust to Resilience: Reimagining Digital Transformation&rdquo;'),
    date: DATE_UNKNOWN,
    width: 1200,
    height: 778,
    focus: '42% 50%',
  },
  {
    kind: 'photo',
    slug: 'press-intelligent-by-design',
    alt: 'Newspaper coverage of a technology keynote by Dr. Biswajit Mohapatra, headlined “The future of today: Intelligent by design and interconnect as default,” with a photograph of him presenting.',
    caption: 'Press coverage of a technology keynote',
    date: DATE_UNKNOWN,
    width: 794,
    height: 1200,
  },
  {
    kind: 'photo',
    slug: 'iim-sambalpur-lamp-lighting-2026',
    alt: 'Dr. Biswajit Mohapatra lighting a ceremonial lamp to open the CEO Immersion Programme at IIM Sambalpur, with colleagues standing alongside.',
    caption: 'Lamp lighting, IIM Sambalpur',
    date: '2026',
    width: 1200,
    height: 800,
    focus: '40% 50%',
  },
  {
    kind: 'photo',
    slug: 'intuitive-ai-colleagues-2026',
    alt: 'Two photographs of Dr. Biswajit Mohapatra with Intuitive.ai colleagues in a hotel lounge, all wearing the company’s branded tops.',
    caption: 'With Intuitive.ai colleagues',
    /* Dated by the Intuitive.ai star mark on the clothing, which he could not
       have worn before joining in April 2026 -- the same reasoning this file
       has always applied to that mark, rather than guessing from the photo. */
    date: '2026',
    /*
     * 480x480, where every other entry here is 1200px on the long edge.
     *
     * This one arrived as a loose file in the repository root named
     * 1787966414971.jpg and was restored from git history when it was wanted
     * back in the Gallery. There is no master: it predates image-src/ and came
     * from `dr/`, which is not in the repository, so 480px is the ceiling
     * until a higher-resolution original turns up. Placed near the end partly
     * for that reason.
     */
    width: 480,
    height: 480,
  },
  {
    kind: 'photo',
    slug: 'route-mobile-office-visit',
    alt: 'Dr. Biswajit Mohapatra with six colleagues at the Route Mobile offices, standing in front of the company’s reception signage.',
    caption: 'At the Route Mobile offices',
    date: DATE_UNKNOWN,
    width: 1200,
    height: 900,
  },
];

/** Just the stills, for callers that cannot render video. */
export const photos: readonly Photo[] = galleryItems.filter(
  (item): item is Photo => item.kind === 'photo',
);

/*
 * The three the homepage teases, named rather than sliced by index.
 *
 * Stills only: the teaser sits in the homepage's dark gallery band and reuses
 * photoCard, which has no video branch. The video is one tap away on /gallery/.
 */
export const homepagePhotoSlugs = [
  'passion-vista-cover-2021',
  'keynote-insights-experiment',
  'iim-sambalpur-ceo-programme-2026',
] as const;

export function photosBySlug(slugs: readonly string[]): Photo[] {
  return slugs.map((slug) => {
    const photo = photos.find((candidate) => candidate.slug === slug);
    if (!photo) throw new Error(`Unknown photo slug: ${slug}`);
    return photo;
  });
}
