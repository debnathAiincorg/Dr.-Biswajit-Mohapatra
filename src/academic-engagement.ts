import { listPage } from './_includes/components/list-page.ts';
import { html, raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Four of the six rows have a matching photograph in dr/ -- the two D Y
 * Patil plaques (dr/linkdin2/) at full photographic resolution and quoted
 * verbatim, and two Symbiosis event photos (dr/GALLERY website/) at their
 * native 300x300, a size CLAUDE.md already documents as a hard limit of the
 * source material for this era of photo.
 *
 * The SICSR certificate (bottom-right panel of the Symbiosis conference
 * photo) is genuinely legible at that resolution for the parts quoted below
 * -- institution name, "This certificate is awarded to Biswajit Mohapatra",
 * the exact dates -- but not word-perfect throughout; where a word is a
 * best reading rather than a certain one, it isn't presented as a direct
 * quote. The Symbiosis "Interactive session" photo carries no readable text
 * at all, so it is image-only, same as it would be with no detail available.
 *
 * "Founder Member, IBM Faculty Academy" and "Member, Board of Studies,
 * Symbiosis University" remain text-only: both are named in dr/old
 * website.docx's memberships list, but neither has a certificate, letter or
 * photograph anywhere in dr/, and no public verification page exists for
 * either. Checked, not found -- not the same as not looked for.
 *
 * Two further items turned up in that same memberships list that belong on
 * other pages, not here: a dated (18 Feb 2021) membership on MeitY's Zero
 * Trust Architecture working group -- government policy, not a university
 * engagement -- and a large trove of ~15+ additional dated publications
 * from 2021 not yet on the Publications page. Both are reported separately
 * rather than pulled in here.
 */

export const { data, render } = definePage({
  data: {
    title: 'Academic Engagement — Dr. Biswajit Mohapatra',
    description:
      'Guest lectures, convocation appearances and institutional roles through which Dr. Biswajit Mohapatra engages with universities and students.',
    navLabel: 'Academic Engagement',
    schemaType: 'CollectionPage',
    permalink: '/academic-engagement/',
  },

  render: () =>
    listPage({
      id: 'academic-engagement',
      eyebrow: 'Industry–Academia',
      heading: 'Academic Engagement',
      rows: [
        {
          title: 'Chief Guest, 4th Convocation Ceremony',
          sub: 'D Y Patil University, Pune',
          meta: 'Jan 2025',
          datetime: '2025-01',
          detail: html`<p>&ldquo;D Y Patil University | Pune &mdash; 4th Convocation Ceremony, Saturday, 11th January 2025. Presented with Profound Gratitude. Chief Guest, Hon&rsquo;ble Dr. Biswajit Mohapatra, CIO&ndash;Amazon&ndash;India and South East Asia.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-academic-dypatil-convocation-2025',
            width: 1200,
            height: 969,
            alt: 'D Y Patil University 4th Convocation Ceremony plaque naming Dr. Biswajit Mohapatra as Chief Guest, 11 January 2025',
            caption: '4th Convocation Ceremony, 11 January 2025.',
          },
        },
        {
          title: raw('Guest of Honour &amp; Speaker, Aarambh 5.0 (Freshman Induction Programme)'),
          sub: 'D Y Patil University, Pune',
          meta: 'Aug 2024',
          datetime: '2024-08',
          detail: html`<p>&ldquo;D Y Patil University &mdash; Presented with Profound Gratitude. Guest of Honor, Dr. Bishwajit Mohapatra, Head of Customer Solutions, CIO Advisory, India and South Asia &ndash; Amazon Web Services. At ARAMBH-5.0, 5th Freshman Induction Programme, Tuesday, 13th August 2024.&rdquo; Signed by Prof. Dr. Sayalee Gankar, Vice Chancellor; Dr. Shivani V. Patil, Vice President &amp; Pro-Chancellor; and Dr. Vijay D. Patil, President &amp; Chancellor.</p>`,
          proofImage: {
            slug: 'proof-academic-dypatil-aarambh-2024',
            width: 1200,
            height: 900,
            alt: 'D Y Patil University Guest of Honor plaque for Aarambh 5.0 Freshman Induction Programme, naming Dr. Bishwajit Mohapatra, 13 August 2024',
            caption: 'Aarambh 5.0, 5th Freshman Induction Programme, 13 August 2024.',
          },
        },
        {
          title: 'Founder Member',
          sub: 'IBM Faculty Academy',
          meta: 'Honorary',
        },
        {
          title: 'Member, Board of Studies (Faculty of Computer Science)',
          sub: 'Symbiosis University',
          meta: 'Honorary',
        },
        {
          title: 'Guest Speaker, International Conference on Digital Transformation',
          sub: 'Symbiosis Institute of Computer Studies and Research (SICSR), Pune',
          meta: '2018',
          datetime: '2018',
          detail: html`<p>The conference certificate, legible at the resolution available: &ldquo;International Conference on Emerging Information and Communication Technology Solutions for Digital Transformation. Organized by Symbiosis Institute of Computer Studies and Research, under the Faculty of Computer Studies. This certificate is awarded to Biswajit Mohapatra for his valuable participation as an honoured speaker&rdquo; at the conference, held 8&ndash;9 March 2018.</p>`,
          proofImage: {
            slug: 'proof-academic-sicsr-conference-2018',
            width: 300,
            height: 300,
            alt: 'Photos from the International Conference on Emerging Information and Communication Technology Solutions for Digital Transformation, SICSR, March 2018, including Dr. Biswajit Mohapatra’s speaker certificate',
            caption: 'SICSR, 8–9 March 2018. Low resolution in the source — the largest available.',
          },
        },
        {
          title: 'Guest Session with Postgraduate Students',
          sub: 'Symbiosis Institute, Pune',
          meta: 'Guest Session',
          proofImage: {
            slug: 'proof-academic-symbiosis-session',
            width: 300,
            height: 300,
            alt: 'Dr. Biswajit Mohapatra speaking to postgraduate students at Symbiosis Institute, Pune',
            caption: 'Low resolution in the source — the largest available.',
          },
        },
      ],
    }),
});
