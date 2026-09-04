import { listPage } from './_includes/components/list-page.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Three rows get an image or detail from dr/; three stay exactly as they
 * were, because nothing further exists in dr/ for them.
 *
 * The Global Ambassador and APN Ambassador rows both have documentary
 * evidence: the DevOps Institute Ambassador certificate from dr/GALLERY
 * website/, and the AWS ranking screenshot already used on Awards, reused
 * here rather than duplicated under a new slug. The MeitY Zero Trust row
 * gets an exact date -- dr/old website.docx prints "(18.02.2021)" after it,
 * which the row previously carried nowhere.
 *
 * IIBA Pune Chapter, CII-CDT Executive Council and Asian-African Chamber
 * Board Advisor are named only in bio prose (dr/old website.docx) with no
 * certificate, photo or working link behind any of them -- pune.iiba.org no
 * longer resolves, confirmed dead. The CII-CDT relationship is the one
 * partial exception: its most direct documentary evidence is the jury
 * appreciation letters on Activities, which are noted here rather than
 * re-embedded a third time (they already appear on Awards and Activities).
 */

export const { data, render } = definePage({
  data: {
    title: 'Board & Advisory Roles — Dr. Biswajit Mohapatra',
    description:
      'Ambassadorships, board memberships and advisory positions held by Dr. Biswajit Mohapatra across industry bodies and policy initiatives.',
    navLabel: 'Board & Advisory',
    schemaType: 'CollectionPage',
    permalink: '/board-roles/',
  },

  render: () =>
    listPage({
      id: 'board-roles',
      eyebrow: 'Affiliations',
      heading: 'Board & Advisory Roles',
      rows: [
        {
          title: 'Global Ambassador',
          sub: 'DevOps Institute',
          meta: 'Since 2020',
          proofImage: {
            slug: 'proof-board-devops-institute-ambassador',
            width: 719,
            height: 1024,
            alt: 'Certificate recognizing Dr. Biswajit Mohapatra as a DevOps Institute Ambassador, with his portrait at the center',
            caption: 'DevOps Institute Ambassador certificate.',
          },
        },
        {
          title: 'APN Ambassador — Ranked No. 1 Globally',
          sub: 'Amazon Web Services (AWS Partner Network)',
          meta: '2021',
          datetime: '2021',
          detail: html`<p>Ranked #1 among &ldquo;Top Ambassadors globally&rdquo; (ahead of Carlos Diego Cavalcanti, CTO, Valcann, Brazil, and Yoichi Satake, Cloud Solutions Architect, Serverworks, Japan) and #1 among &ldquo;Top India Ambassadors&rdquo; in the AWS Partner Network Ambassador Program, listed as AWS service leader, IBM, India.</p>`,
          proofImage: {
            slug: 'proof-award-apn-ambassador-2021',
            width: 1024,
            height: 1024,
            alt: 'AWS Partner Network Top Ambassadors globally and Top India Ambassadors rankings, Biswajit Mohapatra ranked #1 in both',
            caption: 'Ranked #1 globally and #1 in India, October 2021 — the same image shown on Awards.',
          },
        },
        {
          title: 'Board Member',
          sub: 'International Institute of Business Analysis (IIBA), Pune Chapter',
          meta: 'Honorary',
        },
        {
          title: 'Executive Council Member',
          sub: 'CII–Tata Communications Centre for Digital Transformation (CDT)',
          meta: 'Honorary',
          detail: html`<p>The most direct documentary evidence of this relationship is his four years of CII&ndash;CDT jury appreciation letters (4th through 7th editions, 2022&ndash;2025), quoted and shown in full on Activities and Awards.</p>`,
        },
        {
          title: 'Board Advisor',
          sub: 'Asian-African Chamber of Commerce and Industry',
          meta: 'Honorary',
        },
        {
          title: 'Contributor, Zero Trust Security Architecture initiative',
          sub: 'Ministry of Electronics and Information Technology (MeitY), Government of India',
          meta: 'Feb 2021',
          datetime: '2021-02',
          detail: html`<p>&ldquo;Member, Working Group on &lsquo;Zero Trust Architecture&rsquo; under the project &lsquo;e-Governance Standards and Guidelines&rsquo; supported by Ministry of Electronics and Information Technology (MeitY), Government of India (GoI).&rdquo; Dated 18 February 2021 in the source.</p>`,
        },
      ],
    }),
});
