import { listPage } from './_includes/components/list-page.ts';
import { html, raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Was a single-bullet .panel, the one page on the site not yet in the
 * row-list style every other credential page uses. Converted here, and the
 * content grows with it: dr/old website.docx carries a complete patents
 * table (date, patent ID, name, status) that names three patents, not the
 * one the page previously showed.
 *
 * The table's own patent number for the granted one has a typo --
 * "US11155880" -- caught by checking it against the actual certificate in
 * dr/linkdin2/, which prints US 11,150,880 B1. The certificate is the
 * primary source (a legal document); the bio table is not, so the
 * certificate's number is what's used, not the typo.
 *
 * The table's "Reference Link" column is the patent ID repeated as plain
 * text, not an actual hyperlink -- there is no working URL for any of the
 * three anywhere in dr/, so none is added. A live Google Patents or USPTO
 * link could be constructed and verified if wanted, but that's a link this
 * site would be adding, not one dr/ already carries, so it isn't done here
 * without being asked.
 *
 * His LinkedIn headline claims "5 Patents"; dr/ documents three, of which
 * two are Issued and one is still Filed (not yet granted). The page states
 * three, matching what's actually documented, not the headline number.
 */

export const { data, render } = definePage({
  data: {
    title: 'Patents — Dr. Biswajit Mohapatra',
    description:
      'Patents held by Dr. Biswajit Mohapatra in cloud automation and AI-driven service adoption, from his time as an IBM inventor.',
    navLabel: 'Patents',
    schemaType: 'CollectionPage',
    permalink: '/patents/',
  },

  render: () =>
    listPage({
      id: 'patents',
      eyebrow: 'Innovation',
      heading: 'Patents',
      rows: [
        {
          title: raw('&ldquo;Automating an Adoption of Cloud Services&rdquo;'),
          tag: 'Issued',
          sub: 'US 11,150,880 B1 · IBM',
          meta: 'Oct 2021',
          datetime: '2021-10',
          detail: html`<p>Filed 11 June 2020 (Appl. No. 16/946,227); granted 19 October 2021.</p><p>Co-inventors: Venkata Vinay Kumar Parisa (Secunderabad, IN), Bruce G. Taylor (Golden, CO, US), Debasis Roy Chaudhuri (Kolkata, IN), Laurence Swift (Atlanta, GA, US), Corey Allen (Nicholasville, KY, US), and Biswajit Mohapatra (Pune, IN). Assigned to International Business Machines Corporation.</p><p class="row-detail-q">Abstract</p><p>&ldquo;An approach is provided for automating an adoption of cloud services. A machine learning model is developed to learn application source code accessed from a source code repository. The machine learning model is trained by building training data that includes the application source code and technical data. Services are extracted from the application source code and a context of the application source code is derived. Using a decision tree model, a mapping of the extracted services to respective cloud services is determined. Based on the mapping, portions of the application source code are identified that are recommended to be replaced by the respective cloud services.&rdquo; 20 Claims, 7 Drawing Sheets.</p>`,
          proofImage: {
            slug: 'proof-patent-cloud-services',
            width: 649,
            height: 800,
            alt: 'United States Patent 11,150,880 B1, "Automating an Adoption of Cloud Services," naming Biswajit Mohapatra as a co-inventor, IBM Honors plaque',
            caption: 'US 11,150,880 B1, granted 19 October 2021.',
          },
        },
        {
          title: raw('&ldquo;Incident Management for Triaging Service Disruptions&rdquo;'),
          tag: 'Issued',
          sub: 'US 2021/0357284 A1 · IBM',
          meta: 'Nov 2021',
          datetime: '2021-11',
          detail: html`<p>Published 18 November 2021, per dr/old website.docx&rsquo;s patents table. No certificate or public verification link exists in dr/ for this one, unlike the cloud-services patent above.</p>`,
        },
        {
          title: raw('&ldquo;Data Analysis for Predictive Scaling of Container(s) Based on Prior User Transaction(s)&rdquo;'),
          tag: 'Filed',
          sub: 'US 2021/0240517 A1 · IBM',
          meta: 'Feb 2020',
          datetime: '2020-02',
          detail: html`<p>Filed 5 February 2020, per dr/old website.docx&rsquo;s patents table, and listed there as &ldquo;Filed&rdquo; rather than &ldquo;Issued&rdquo; &mdash; the only one of the three not yet granted as of that document. No certificate or public verification link exists in dr/ for it.</p>`,
        },
      ],
    }),
});
