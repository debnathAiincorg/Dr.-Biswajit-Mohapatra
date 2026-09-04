import { listPage } from './_includes/components/list-page.ts';
import { sources } from './_includes/content/sources.ts';
import { raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Certifications.
 *
 * Row shape changed here: the issuer moved from `meta` into `sub`, and `meta`
 * now carries the date, matching Experience, Awards, Activities and every
 * other list page. Certifications was the one page putting a non-date in its
 * right-hand column.
 *
 * Dates matter on this page specifically: two credentials have lapsed, and
 * listing them undated implied they were current. Where the badge records an
 * expiry it is stated rather than quietly dropped.
 *
 * Every source link traces back to a hyperlink actually embedded in
 * dr/linkdin3.docx's "Licenses & certifications" section (15 of them,
 * fetched and matched to a name one by one, since the document itself
 * carries no certificate titles -- only bare URLs) or dr/linkdin2/ (the IICA
 * certificate image). Two of those 15 hyperlinks were missed on the first
 * pass and are only added now: the Gremlin credential below, and a duplicate
 * Accredible copy of the Catalyst Technology Award, which backs an Awards
 * row rather than a certification and is not wired in here.
 *
 * Each linked badge's own page (Credly, Oracle CertView, Accredible) does
 * carry a fuller description of what the certification covers -- fetched
 * and read to confirm each link is genuine, but not reproduced as page
 * content here, since that text lives on those external sites and not in
 * dr/.
 *
 * Every AWS certification, Google Cloud, IBM Certified Executive Consultant
 * and IBM Consulting Profession Certification were removed at the site
 * owner's request (2026-09-01) rather than shown unlinked. They are still
 * genuinely his -- named twice in dr/old website.docx's own bio text -- but
 * no certificate, badge or verification link for any of them exists
 * anywhere in dr/, and that gap could not be closed by reading dr/ more
 * closely; it needs a link from him directly. Removed rather than listed
 * unproven so every row remaining on this page carries a source, an image,
 * or both.
 */

export const { data, render } = definePage({
  data: {
    title: 'Certifications — Dr. Biswajit Mohapatra',
    description:
      'Professional certifications held by Dr. Biswajit Mohapatra across Microsoft Azure, Oracle Cloud, IBM and chaos engineering.',
    navLabel: 'Certifications',
    schemaType: 'CollectionPage',
    permalink: '/certifications/',
  },

  render: () =>
    listPage({
      id: 'certifications',
      eyebrow: 'Credentials',
      heading: 'Certifications',
      rows: [
        {
          title: 'Microsoft Certified: Azure Solutions Architect Expert',
          sub: raw('Microsoft &middot; expired Jan 2023'),
          meta: 'Jan 2020',
          datetime: '2020-01',
          source: sources.azureSolutionsArchitect,
        },
        {
          title: 'AZ-300: Microsoft Azure Architect Technologies',
          sub: 'Microsoft',
          meta: 'Jan 2020',
          datetime: '2020-01',
          source: sources.azureAz300,
        },
        {
          title: 'AZ-301: Microsoft Azure Architect Design',
          sub: 'Microsoft',
          meta: 'Jan 2020',
          datetime: '2020-01',
          source: sources.azureAz301,
        },
        {
          title: 'Oracle Cloud Infrastructure 2021 Architect Associate',
          sub: 'Oracle',
          meta: 'Jan 2022',
          datetime: '2022-01',
          source: sources.oracleArchitectAssociate,
        },
        {
          title: 'Oracle Cloud Infrastructure Foundations 2021 Associate',
          sub: 'Oracle',
          meta: 'Dec 2021',
          datetime: '2021-12',
          source: sources.oracleFoundationsAssociate,
        },
        {
          title: 'IBM Cloud Pak for Applications — Architect',
          sub: 'IBM',
          meta: 'Apr 2020',
          datetime: '2020-04',
          source: sources.ibmCloudPak,
        },
        {
          title: 'License to Lead — Executive',
          sub: raw('IBM &middot; expired Dec 2024'),
          meta: 'Oct 2020',
          datetime: '2020-10',
          source: sources.ibmLicenseToLead,
        },
        {
          title: 'Knowledge Sharing for Business Impact',
          sub: 'IBM',
          meta: 'Sep 2020',
          datetime: '2020-09',
          source: sources.ibmKnowledgeSharing,
        },
        {
          title: 'Be Equal Ally',
          sub: 'IBM',
          meta: 'Aug 2020',
          datetime: '2020-08',
          source: sources.ibmBeEqualAlly,
        },
        {
          title: 'Certified Chaos Engineering Practitioner',
          sub: 'Gremlin',
          meta: 'Jul 2021',
          datetime: '2021-07',
          source: sources.gremlinChaosEngineering,
        },
        {
          title: "Independent Director's Databank Qualification",
          sub: 'Indian Institute of Corporate Affairs',
          meta: 'Mar 2026',
          datetime: '2026-03',
          detail: raw(
            '<p>&ldquo;Certifies that Biswajit Mohapatra, IDDB-NR-202504-072447, has successfully qualified the Online Proficiency Self-Assessment Test For Independent Director&rsquo;s Databank.&rdquo; Signed by Gyaneshwar Kumar Singh, DG &amp; CEO, IICA.</p>',
          ),
          proofImage: {
            slug: 'proof-iica-independent-director',
            width: 1336,
            height: 1216,
            alt: "Indian Institute of Corporate Affairs certificate confirming Biswajit Mohapatra qualified the Online Proficiency Self-Assessment Test for the Independent Director's Databank, 12 March 2026",
            caption: 'IDDB-NR-202504-072447, 12 March 2026.',
          },
        },
      ],
    }),
});
