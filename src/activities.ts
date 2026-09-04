import { listPage } from './_includes/components/list-page.ts';
import { html, raw, type Html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Every row has a matching certificate or photograph in dr/ -- most from
 * dr/linkdin2/ (several of them files with a .pdf extension that are
 * actually JPEGs -- confirmed with `file`, not just assumed from the
 * extension), the last four from dr/GALLERY website/, reusing the exact
 * images already on Gallery rather than a second copy under a new slug.
 *
 * Where the certificate itself prints an exact date the row didn't
 * previously carry, it's added: AWS Community Day Kolkata was "2025"
 * on the site and the physical trophy reads 5 April 2025 (also resolving
 * the discrepancy CLAUDE.md already flagged); Digital Customer Experience
 * Confex was "2024" and the certificate reads 19 April 2024; Open Source
 * India was "2023" and the plaque reads 19-20 October 2023.
 *
 * The Jury Member row reuses all four CII-Tata Communications DX
 * appreciation letters already processed for Awards (2022-2024) plus a
 * fourth found later in dr/linkdin1/ (2025, 7th edition) -- the date range
 * is corrected from "2022-2024" to "2022-2025" accordingly. Each edition's
 * full citation is already quoted in full on Awards; repeating four full
 * appreciation letters verbatim a second time here would be duplication,
 * not completeness, so this row's own text stays to a summary and the
 * images carry the rest.
 */

function photoFigure(slug: string, alt: string, width: number, height: number, caption: string): Html {
  return html`<figure><a class="proof-zoom" href="/assets/images/photos/${slug}.jpg" data-caption="${caption}" data-alt="${alt}"><img src="/assets/images/photos/${slug}.jpg" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async"></a><figcaption>${caption}</figcaption></figure>`;
}

function proofGridFigure(slug: string, alt: string, width: number, height: number, caption: string): Html {
  return html`<figure><a class="proof-zoom" href="/assets/images/proof/${slug}.jpg" data-caption="${caption}" data-alt="${alt}"><img src="/assets/images/proof/${slug}.jpg" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async"></a></figure>`;
}

export const { data, render } = definePage({
  data: {
    title: 'Activities — Dr. Biswajit Mohapatra',
    description:
      'Keynotes, conference panels and jury service undertaken by Dr. Biswajit Mohapatra across the cloud, DevOps and technology leadership community.',
    navLabel: 'Activities',
    schemaType: 'CollectionPage',
    permalink: '/activities/',
  },

  render: () =>
    listPage({
      id: 'activities',
      eyebrow: 'Speaking & Service',
      heading: 'Activities',
      rows: [
        {
          title: 'Distinguished Speaker',
          sub: 'GCC Expo, Bengaluru',
          meta: 'Aug 2026',
          datetime: '2026-08',
          detail: html`<p>&ldquo;Distinguished Speaker &mdash; Presented to Dr. Biswajit Mohapatra, VP &amp; Head of Product and Solutions Engineering, Intuitive.ai &mdash; In recognition of your exceptional thought leadership and distinguished contribution towards shaping the future of Global Capability Centers.&rdquo; 20 August 2026, Bengaluru.</p>`,
          proofImage: {
            slug: 'proof-award-gcc-expo-2026',
            width: 800,
            height: 800,
            alt: 'GCC Expo Distinguished Speaker trophy presented to Dr. Biswajit Mohapatra, 20 August 2026, Bengaluru',
            caption: '20 August 2026, Bengaluru.',
          },
        },
        {
          title: 'Speaker',
          sub: 'AWS Community Day, Ahmedabad',
          meta: 'Feb 2025',
          datetime: '2025-02',
          detail: html`<p>&ldquo;AWS Community Day Ahmedabad, 8th February 2025 &mdash; Certificate of Appreciation. This certificate is awarded to Dr. Bishwajit Mohapatra for being an Esteemed Speaker at AWS Community Day Ahmedabad, 2025.&rdquo; AWS User Groups Ahmedabad.</p>`,
          proofImage: {
            slug: 'proof-activity-aws-ahmedabad-2025',
            width: 901,
            height: 1200,
            alt: 'AWS Community Day Ahmedabad 2025 Certificate of Appreciation presented to Dr. Bishwajit Mohapatra',
            caption: '8 February 2025.',
          },
        },
        {
          title: 'Keynote Speaker',
          sub: 'AWS Community Day, Kolkata',
          meta: 'Apr 2025',
          datetime: '2025-04',
          detail: html`<p>&ldquo;Community Day Kolkata 2025 &mdash; Technical Keynote Speaker, Dr. Biswajit Mohapatra, Head Customer Solutions, AWS India &amp; South Asia. Date: 5th April, 2025.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-activity-aws-kolkata-2025',
            width: 607,
            height: 800,
            alt: 'AWS Community Day Kolkata 2025 trophy naming Dr. Biswajit Mohapatra Technical Keynote Speaker, 5 April 2025',
            caption: '5 April 2025.',
          },
        },
        {
          title: 'Speaker',
          sub: 'Digital Customer Experience Confex & Awards, Bangalore Chapter',
          meta: 'Apr 2024',
          datetime: '2024-04',
          detail: html`<p>&ldquo;6th DCX Digital Customer Experience Confex &amp; Awards 2024, Bangalore Chapter &mdash; Certificate of Appreciation. This certificate is presented to Dr. Bishwajit Mohapatra from Amazon Web Services in recognition of the valuable contribution made as Speaker at the 6th DCX Confex &amp; Awards 2024 Bangalore Chapter held on 19th April at Taj MG Road, Bangalore.&rdquo; Signed by Sumeet Khatri, Founder &amp; MD, Gain Skills.</p>`,
          proofImage: {
            slug: 'proof-activity-dcx-confex-2024',
            width: 575,
            height: 800,
            alt: '6th DCX Digital Customer Experience Confex & Awards 2024 Certificate of Appreciation presented to Dr. Bishwajit Mohapatra',
            caption: '19 April 2024, Taj MG Road, Bangalore.',
          },
        },
        {
          title: 'Jury Member, Digital Transformation (DX) Best Practice Award',
          sub: 'CII–Tata Communications Centre for Digital Transformation',
          meta: raw('2022&ndash;2025'),
          detail: html`<p>Four consecutive editions of jury service, each documented by its own CII&ndash;CDT appreciation letter (the full citation for each is quoted on Awards): the 4th edition (2022), 5th (2023), 6th (2024) and 7th (2025, &ldquo;Driving Innovation towards Achieving the Vision of a Viksit Bharat&rdquo;, 3 December 2025, New Delhi).</p><div class="proof-grid">${proofGridFigure('proof-award-cii-dx-jury-2022', 'CII Tata Communications Centre for Digital Transformation appreciation letter, 4th edition, 2022', 600, 800, '4th edition, 2022')}${proofGridFigure('proof-award-cii-dx-jury-2023', 'CII Tata Communications Centre for Digital Transformation appreciation letter, 5th edition, 2023', 594, 800, '5th edition, 2023')}${proofGridFigure('proof-award-cii-dx-jury-2024', 'CII Tata Communications Centre for Digital Transformation appreciation letter, 6th edition, 2024', 623, 800, '6th edition, 2024')}${photoFigure('gallery-cii-dx-jury-2025', 'CII DX Awards & Summit 2025 photo collage, 7th edition jury recognition, New Delhi', 480, 480, '7th edition, 2025')}</div>`,
        },
        {
          title: 'Keynote Speaker',
          sub: 'Open Source India Conference',
          meta: 'Oct 2023',
          datetime: '2023-10',
          detail: html`<p>&ldquo;Thank You Dr. Biswajit Mohapatra for Sharing Your Knowledge &amp; Expertise at 20th Edition Open Source India, 19&ndash;20 October 2023, NIMHANS Convention Center, Bengaluru. Asia&rsquo;s Leading Open Source Event.&rdquo; An EFY Group / Open Source For You event.</p>`,
          proofImage: {
            slug: 'proof-activity-osi-2023',
            width: 602,
            height: 800,
            alt: 'Open Source India 2023 appreciation plaque thanking Dr. Biswajit Mohapatra for sharing his knowledge and expertise, 19-20 October 2023',
            caption: '20th Edition, 19–20 October 2023, NIMHANS Convention Center, Bengaluru.',
          },
        },
        {
          title: 'Speaker, DevOps India Summit (DOIS23)',
          sub: 'Xellentro',
          meta: 'Nov 2023',
          datetime: '2023-11',
          detail: html`<p>&ldquo;Certificate of Appreciation &mdash; Presented to Dr. Biswajit Mohapatra, Head, Customer Solutions Management, Amazon Web Services, AWS. Thank you for so generously sharing your valuable time and knowledge with us. Speaker.&rdquo; DevOps India Summit 2023, 18th November. Signed by Dr. Niladri Choudhuri, Founder &amp; CEO, Xellentro.</p>`,
          proofImage: {
            slug: 'proof-activity-dois23-2023',
            width: 1200,
            height: 675,
            alt: 'DevOps India Summit 2023 Certificate of Appreciation presented to Dr. Biswajit Mohapatra as Speaker',
            caption: '18 November 2023.',
          },
        },
        {
          title: 'Panelist & Jury',
          sub: 'Technical Agility Conference',
          meta: 'Sep 2022',
          datetime: '2022-09',
          detail: html`<p>&ldquo;Technical Agility Institute &mdash; Certificate of Appreciation. This certificate is presented to Dr. Biswajit Mohapatra. We are thankful for your support, guidance, thought leadership and valuable time at Technical Agility Conference 2022. Please accept this certificate as token of gratitude and respect, from us and entire TAC community.&rdquo; Signed by Vinay Krishna, Chair, TAC2022.</p>`,
          proofImage: {
            slug: 'proof-activity-technical-agility-2022',
            width: 1188,
            height: 848,
            alt: 'Technical Agility Conference 2022 Certificate of Appreciation presented to Dr. Biswajit Mohapatra',
            caption: '17 September 2022.',
          },
        },
        {
          title: 'Speaker',
          sub: 'DevOps India Summit',
          meta: '2022',
          datetime: '2022',
          detail: html`<p>&ldquo;Certificate of Appreciation &mdash; Presented to Dr. Biswajit Mohapatra. Thank you for so generously sharing your valuable time and knowledge with us. Speaker.&rdquo; DevOps India Summit 2022, Virtual Event, 26th August. Signed by Dr. Niladri Choudhuri, Founder &amp; CEO, Xellentro.</p>`,
          proofImage: {
            slug: 'proof-activity-devops-india-2022',
            width: 568,
            height: 800,
            alt: 'DevOps India Summit 2022 Certificate of Appreciation presented to Dr. Biswajit Mohapatra as Speaker',
            caption: 'Virtual Event, 26 August 2022.',
          },
        },
        {
          title: 'Speaker',
          sub: 'BTX RoadShow, Asia Edition',
          meta: '2022',
          datetime: '2022',
          detail: html`<p>&ldquo;BTX Road Show 2022 and Transformation Awards &mdash; Certificate of Appreciation. This recognition is presented to Dr. Biswajit Mohapatra, Head of Customer Solutions Management, Amazon Web Services, for knowledge sharing and thought leadership as a Speaker at BTX Road Show Asia 2022 New Delhi held on 16 September 2022.&rdquo; Signed by Tushar Sahoo, Founder. Organized by GEC Media Group.</p>`,
          proofImage: {
            slug: 'proof-activity-btx-roadshow-2022',
            width: 667,
            height: 800,
            alt: 'BTX Road Show Asia 2022 Certificate of Appreciation presented to Dr. Biswajit Mohapatra, New Delhi',
            caption: '16 September 2022, New Delhi.',
          },
        },
        {
          title: raw('Session Speaker, &ldquo;Leadership&rdquo; Track'),
          sub: '2021 IEEE TEMSMET, hosted by Symbiosis Institute of Computer Studies and Research (SICSR)',
          meta: 'Dec 2021',
          datetime: '2021-12',
          detail: html`<p>&ldquo;2021 IEEE Second International Conference on Technology, Engineering, Management for Societal Impact using Marketing, Entrepreneurship and Talent (TEMSMET), December 1&ndash;3, 2021, Conference Number #53515 &mdash; Certificate of Appreciation. This is to certify that Dr. Biswajit Mohapatra has conducted a Session Titled &lsquo;Leadership&rsquo; under Special Track &ndash; Industry Forum held on 3 December 2021, co-hosted by Symbiosis Institute of Computer Studies and Research (SICSR), Pune, India in association with IEEE TEMS Global.&rdquo; Signed by Dr. Shrikant Tangade, Secretary, IEEE TEMS Conferences &amp; Events Committee, and Prof. Dr. Jatinderkumar R. Saini, Professor &amp; Director, SICSR.</p>`,
          proofImage: {
            slug: 'proof-activity-temsmet-2021',
            width: 1200,
            height: 675,
            alt: '2021 IEEE TEMSMET Certificate of Appreciation for Dr. Biswajit Mohapatra conducting a session titled Leadership, 3 December 2021',
            caption: '3 December 2021.',
          },
        },
        {
          title: 'Speaker',
          sub: 'Enterprise IT World Cloud Summit',
          meta: 'Oct 2021',
          datetime: '2021-10',
          detail: html`<p>&ldquo;Certificate of Appreciation &mdash; Biswajit Mohapatra, Partner, Executive Director, CIO Advisory and Hybrid Cloud Transformation, IBM Services. Thank you for being a speaker at Cloud Summit &amp; Awards 2021 on 08th October 2021 and sharing your knowledge and experience among the attendees.&rdquo; Signed by Sanjay Mohapatra, Managing Editor, and Sanjib Mohapatra, Jury Chair.</p>`,
          proofImage: {
            slug: 'proof-activity-cloud-summit-2021',
            width: 800,
            height: 450,
            alt: 'Enterprise IT World Cloud Summit & Awards 2021 Certificate of Appreciation presented to Biswajit Mohapatra, IBM Services',
            caption: '8 October 2021.',
          },
        },
        {
          title: raw('Thought Leadership Certificate of Honor, Speaker'),
          sub: 'World DevOps Summit',
          meta: 'May 2020',
          datetime: '2020-05',
          detail: photoFigure(
            'photo-12',
            'Certificate of Honor presented to Dr. Biswajit Mohapatra for a thought leadership talk at the World DevOps Summit',
            800,
            560,
            'World DevOps Summit, May 2020 — the same photograph shown on Gallery.',
          ),
        },
        {
          title: 'Speaker',
          sub: "iTSM Summit India '19, organized by NovelVista",
          meta: '2019',
          datetime: '2019',
          detail: photoFigure(
            'photo-11',
            "Photo collage from iTSM Summit India '19 including a speaker plaque honoring Dr. Biswajit Mohapatra",
            300,
            300,
            'iTSM Summit India ‘19 — the same photograph shown on Gallery.',
          ),
        },
        {
          title: 'Speaker',
          sub: 'DevOps Institute Partner Days',
          meta: '2019',
          datetime: '2019',
          detail: photoFigure(
            'photo-3',
            'Photo collage from DevOps Institute Partner Days 2019: Dr. Biswajit Mohapatra speaking on stage, sitting on a panel, and with his Partner Days certificate',
            600,
            600,
            'DevOps Institute Partner Days 2019 — the same photograph shown on Gallery.',
          ),
        },
        {
          title: 'Speaker',
          sub: 'Pune Agile UnConference (PAUC19)',
          meta: 'Aug 2019',
          datetime: '2019-08',
          detail: photoFigure(
            'photo-4',
            'Photo collage from the Pune Agile UnConference 2019 at Hyatt Regency Pune, showing Dr. Biswajit Mohapatra speaking and the speaker plaque presented to him',
            768,
            768,
            'Pune Agile UnConference 2019, Hyatt Regency Pune — the same photograph shown on Gallery.',
          ),
        },
      ],
    }),
});
