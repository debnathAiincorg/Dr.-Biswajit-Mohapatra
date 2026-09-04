import { listPage } from './_includes/components/list-page.ts';
import { html, raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Both rows are everything dr/ documents about his education -- nothing more
 * exists to add. Sourced from dr/linkdin3.docx's Education section (the
 * degree citation, verbatim) and dr/linkdin2/Honorary Doctorate Degree in
 * Computer Science.jpg (the certificate itself, both its Spanish and English
 * faces, used as proofImage since no public verification page exists for it).
 *
 * IIT Bombay carries no degree/branch name anywhere in the source material --
 * every document names only the institution and the 1991-1995 span, so none
 * is invented here. It also carries no proof: the only IIT Bombay link in the
 * source is a generic https://www.linkedin.com/school/157266/ page, which is
 * LinkedIn's own institution directory entry and not evidence he attended --
 * anyone can select a school from that same dropdown. Reported as "not found"
 * rather than linked as if it verified the claim.
 */

export const { data, render } = definePage({
  data: {
    title: 'Education — Dr. Biswajit Mohapatra',
    description:
      'Academic background of Dr. Biswajit Mohapatra — an IIT Bombay alumnus and holder of an honorary doctorate in computer science.',
    navLabel: 'Education',
    schemaType: 'CollectionPage',
    permalink: '/education/',
  },

  render: () =>
    listPage({
      id: 'education',
      eyebrow: 'Background',
      heading: 'Education',
      rows: [
        {
          title: 'Honorary Doctor of Advanced Studies, Computer Science',
          sub: 'Universidad Azteca',
          meta: 'Mar 2022',
          datetime: '2022-03',
          logo: 'universidad-azteca',
          detail: html`<p>Received Honorary Doctorate of Advanced Studies on Computer Science from Azteca University on March 2022. The University awards this degree to individuals who have made extraordinary academic or social contributions, particularly in fields of relevance and importance at national and at international levels.</p>`,
          proofImage: {
            slug: 'proof-azteca-honorary-doctorate',
            width: 533,
            height: 800,
            alt: "Honorary Doctor of Advanced Studies certificate from Universidad Azteca, awarded to Biswajit Mohapatra, dated 10 March 2022, Folio No. 004484",
            caption: 'The certificate, Spanish and English faces. Folio No. 004484, 10 March 2022.',
          },
        },
        {
          title: 'Indian Institute of Technology, Bombay',
          meta: raw('1991&ndash;1995'),
          logo: 'iit-bombay',
        },
      ],
    }),
});
