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
 *
 * Ordered newest to oldest, undated entries last. Two entries whose photo
 * itself has no visible date were assigned 2026 because the Intuitive.ai
 * star mark is visible on his clothing in them (gallery-googlecloudnext-
 * candid, gallery-informal-photos) -- he joined Intuitive.ai in April 2026,
 * so that logo dates the photo at least that precisely even without a
 * printed date. Every other undated entry was checked for the same mark and
 * does not carry it, so stays undated rather than guessed.
 *
 * photo-9 (a close-up with a fellow delegate), photo-5 (Nirmaan Leadership
 * Summit, IIM Sirmaur -- first cropped to drop a plaque-handoff panel, then
 * removed entirely) and gallery-aws-certified-portrait (an AWS-jacket
 * portrait) were removed at the user's request.
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
    slug: 'gallery-gcc-expo-ceremony-2026',
    alt: 'Photo collage from the GCC Expo Award Ceremony 2026, Bengaluru, showing the Distinguished Speaker and Customer Impact Award trophies, a panel discussion, and the ceremony stage.',
    caption: 'GCC Expo Award Ceremony, Bengaluru',
    date: 'August 2026',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-cio500-acceleratorx-2026',
    alt: 'Photo collage from the Enterprise IT World CIO500 & Accelerator X Awards 2026, Pune, including the event backdrop, his award, and a panel discussion.',
    caption: raw('CIO500 &amp; Accelerator X Awards 2026, Pune'),
    date: 'August 2026',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-googlecloudnext26-portrait',
    alt: 'Promotional portrait of Dr. Bishwajit Mohapatra announcing his appearance at Google Cloud Next 26, April 22–24.',
    caption: 'Speaking at Google Cloud Next 26',
    date: 'April 2026',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-googlecloudnext26-catalyst-card',
    alt: '"The Catalyst" promotional persona card for Dr. Biswajit Mohapatra at Google Cloud Next 26.',
    caption: raw('&ldquo;The Catalyst,&rdquo; Google Cloud Next 26'),
    date: 'April 2026',
    width: 480,
    height: 430,
  },
  {
    slug: 'gallery-googlecloudnext-candid',
    alt: 'Candid photographs of Dr. Biswajit Mohapatra at Google Cloud Next, including at the Intuitive booth and with fellow attendees.',
    caption: 'At Google Cloud Next',
    date: '2026',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-informal-photos',
    alt: 'Informal photographs of Dr. Biswajit Mohapatra with colleagues, wearing an Intuitive.ai branded top.',
    caption: 'With colleagues',
    date: '2026',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-cii-dx-jury-2025',
    alt: 'Photo collage from the CII DX Awards & Summit 2025, New Delhi, including Dr. Biswajit Mohapatra receiving a jury appreciation certificate for the 7th edition of the Digital Transformation Best Practice Award.',
    caption: raw('CII DX Awards &amp; Summit, jury recognition, New Delhi'),
    date: 'December 2025',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-telegraph-infocom-2025',
    alt: 'The Telegraph newspaper’s coverage of Dr. Biswajit Mohapatra’s keynote at INFOCOM 2025, Calcutta, with the full article and a photo of him presenting.',
    caption: raw('Keynote coverage in <em>The Telegraph</em>, INFOCOM 2025'),
    date: 'November 2025',
    width: 480,
    height: 794,
  },
  {
    slug: 'gallery-aws-student-day-silveroak-2025',
    alt: 'Photo collage from AWS Student Community Day at Silver Oak University, Ahmedabad, featuring Dr. Bishwajit Mohapatra speaking and receiving a certificate.',
    caption: 'AWS Student Community Day, Silver Oak University, Ahmedabad',
    date: '2025',
    width: 480,
    height: 600,
  },
  {
    slug: 'gallery-aws-student-day-parul-2025',
    alt: 'Photo collage from AWS Student Community Day at Parul University, showing Dr. Bishwajit Mohapatra presenting "The Next Frontier: Innovation, Intelligence and Impact" to a full auditorium.',
    caption: 'AWS Student Community Day, Parul University',
    date: '2025',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-gcc-leadership-conclave',
    alt: 'Dr. Biswajit Mohapatra speaking at the GCC Leadership Conclave, in front of a screen reading "Not Buying AI: Engineering an Intelligence Layer."',
    caption: 'GCC Leadership Conclave',
    date: '2025',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-route-amplify-2024',
    alt: 'Speaker announcement graphic for Route Amplify 2.0, presented by Route Mobile in association with CNBC TV18, naming Dr. Bishwajit Mohapatra, Mumbai.',
    caption: 'Speaking at Route Amplify 2.0, Mumbai',
    date: 'September 2024',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-stpi-roundtable',
    alt: 'Photo collage from a Software Technology Parks of India (STPI) roundtable, showing a lamp-lighting ceremony, a group photo, and a meeting-room discussion.',
    caption: 'STPI roundtable',
    date: '2024',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-symbiosis-international-panel',
    alt: 'Dr. Biswajit Mohapatra on a panel discussion at Symbiosis International (Deemed University), with a full student auditorium in a further photo.',
    caption: 'Panel discussion, Symbiosis International (Deemed University)',
    date: '2024',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-global-stem-expo-2024',
    alt: 'Photo collage from the Global STEM Education Expo 2024, showing Dr. Biswajit Mohapatra speaking, on a panel, and with student attendees.',
    caption: 'Global STEM Education Expo 2024',
    date: '2024',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-cii-cio-conclave-2023',
    alt: 'Dr. Biswajit Mohapatra receiving recognition on stage at the CII CIO Conclave & Awards, New Delhi.',
    caption: raw('CII CIO Conclave &amp; Awards, New Delhi'),
    date: 'November 2023',
    width: 480,
    height: 360,
  },
  {
    slug: 'gallery-rptech-starnite-awards-2023',
    alt: 'Photo collage from the RPtech Starnite Awards 2023 at Hotel Le Meridien, New Delhi, including a group photo and award presentations.',
    caption: 'RPtech Starnite Awards 2023, Hotel Le Meridien',
    date: 'September 2023',
    width: 480,
    height: 480,
  },
  {
    slug: 'photo-14',
    alt: 'The World CIO 200 Awards certificate presented to Dr. Biswajit Mohapatra by the Global CIO Forum.',
    caption: 'The World CIO 200 Award, Global CIO Forum',
    date: 'November 2022',
    width: 541,
    height: 700,
  },
  {
    slug: 'photo-15',
    alt: 'Framed United States Patent 11,150,880 B1, "Automating an Adoption of Cloud Services," naming Dr. Biswajit Mohapatra as a co-inventor, presented as an IBM Honors plaque.',
    caption: 'US Patent 11,150,880 B1, Automating an Adoption of Cloud Services',
    date: 'October 2021',
    width: 568,
    height: 700,
  },
  {
    slug: 'photo-12',
    alt: 'Certificate of Honor presented to Dr. Biswajit Mohapatra for a thought leadership talk at the World DevOps Summit.',
    caption: 'Thought Leadership Certificate of Honor, World DevOps Summit',
    date: 'May 2020',
    width: 800,
    height: 560,
  },
  {
    slug: 'photo-2',
    alt: 'Photo collage from the DevOps Initiative: A Leader’s Perspective event at Novotel Pune, showing Dr. Biswajit Mohapatra presenting at a whiteboard and with fellow delegates.',
    caption: raw('&ldquo;DevOps Initiative: A Leader&rsquo;s Perspective,&rdquo; Novotel Pune'),
    date: 'March 2020',
    width: 768,
    height: 959,
  },
  {
    slug: 'photo-10',
    alt: 'Certificate recognizing Dr. Biswajit Mohapatra as a DevOps Institute Ambassador, with his portrait at the center.',
    caption: 'Recognized as a DevOps Institute Ambassador',
    date: 'March 2020',
    width: 562,
    height: 800,
  },
  {
    slug: 'photo-1',
    alt: 'Photo collage from the National Conference on Social Innovation at Pune International Centre, where Dr. Biswajit Mohapatra received the Anjani Mashelkar Inclusive Innovation Award.',
    caption: 'Anjani Mashelkar Inclusive Innovation Award, National Conference on Social Innovation',
    date: 'November 2019',
    width: 768,
    height: 768,
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
    slug: 'photo-4',
    alt: 'Photo collage from the Pune Agile UnConference 2019 at Hyatt Regency Pune, showing Dr. Biswajit Mohapatra speaking and the speaker plaque presented to him.',
    caption: 'Pune Agile UnConference 2019 (PAUC19), Hyatt Regency Pune',
    date: 'August 2019',
    width: 768,
    height: 768,
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
    slug: 'photo-8',
    alt: 'Dr. Biswajit Mohapatra accepting a commemorative wooden plaque from an event host on stage.',
    caption: 'Receiving a commemorative plaque at a DevOps Institute event',
    date: '2019',
    width: 724,
    height: 543,
  },
  {
    slug: 'photo-11',
    alt: 'Photo collage from iTSM Summit India ’19 including a speaker plaque honoring Dr. Biswajit Mohapatra and photographs of him presenting and on a panel.',
    caption: raw('iTSM Summit India &lsquo;19, organized by NovelVista'),
    date: '2019',
    width: 300,
    height: 300,
  },
  {
    slug: 'gallery-guest-induction-session',
    alt: 'Dr. Biswajit Mohapatra speaking at a postgraduate induction programme, with a biography slide and an audience of seated students.',
    caption: 'Guest speaker, postgraduate induction programme',
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-mba-guest-talk',
    alt: 'Dr. Biswajit Mohapatra giving a guest talk to students, with a slide reading "It’s a wonder what goes into an MBA" visible in the background.',
    caption: 'Guest talk on an MBA programme',
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-classroom-guest-lecture',
    alt: 'Dr. Biswajit Mohapatra giving a guest lecture to a classroom of students, with a group photo afterward.',
    caption: 'Guest lecture to students',
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-workshop-session',
    alt: 'Dr. Biswajit Mohapatra presenting at a student workshop, and a group photo with attendees in front of a timer screen.',
    caption: 'Student workshop session',
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-ai-in-action-expo',
    alt: 'Photo collage from the "AI in Action" zone of a technology expo, including exhibit signage, an audience shot, and a photo with two other attendees.',
    caption: raw('&ldquo;AI in Action&rdquo; zone, technology expo'),
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-security-summit-panel',
    alt: 'Photo collage from a technology security summit, showing a lamp-lighting ceremony, a panel discussion, and a group photo with fellow delegates.',
    caption: raw('&ldquo;Securing the Future&hellip; Security for Next-Tech Era&rdquo; summit'),
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-corporate-event',
    alt: 'Dr. Biswajit Mohapatra at a corporate event, including a ribbon-cutting ceremony and a group photo.',
    caption: 'At an industry event',
    date: '—',
    width: 480,
    height: 480,
  },
  {
    slug: 'gallery-industry-event-portrait',
    alt: 'Dr. Biswajit Mohapatra with a fellow attendee at an industry event.',
    caption: 'With a fellow attendee',
    date: '—',
    width: 480,
    height: 353,
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
