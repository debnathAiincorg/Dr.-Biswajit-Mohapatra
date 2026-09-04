import { listPage } from './_includes/components/list-page.ts';
import { sources } from './_includes/content/sources.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Every row now carries the actual certificate or trophy photograph as
 * proofImage (dr/AWARDS website/ and dr/linkdin2/), and, where the document
 * itself prints more than a bare title, a `detail` quoting that citation
 * text verbatim. Nothing here is written from scratch: every detail
 * paragraph is either a direct quote off the certificate or a fact printed
 * on it (an exact date, a venue, a role title at the time).
 *
 * Four rows are new, not previously on the site:
 *   - GCC Expo Distinguished Speaker (Aug 2026) -- a second, separate trophy
 *     visible in the same photograph as the Customer Impact Award.
 *   - CII Jury Award, three editions (2022, 2023, 2024) -- his own bio in
 *     dr/linkdin3.docx lists "CII Jury Award" under "Awards and
 *     Recognition", but no row for it existed. The certificates found are
 *     appreciation letters from CII-Tata Communications' Centre for Digital
 *     Transformation thanking him for serving as jury for their DX Best
 *     Practice(s) Award across its 4th, 5th and 6th editions.
 *
 * One correction worth stating plainly: the certificate behind "Hybrid
 * Cloud Champion Award" (Sep 2022) is titled "HYBRID CLOUD AWARDS 2022" on
 * the document itself -- the word "Champion" does not appear on it anywhere.
 * The row title is left as-is (matching how the award is referred to
 * elsewhere) but the detail text says plainly what the certificate actually
 * reads, rather than silently endorsing the fuller name.
 *
 * Not added: a "Certificate of Appreciation" from the Technical Agility
 * Institute (dr/linkdin2/Panelist and Jury at Technical Agility Conference
 * 2022.jpg), thanking him for participating at their 2022 conference. Unlike
 * the CII Jury letters, this one is not named anywhere in his own "Awards
 * and Recognition" summary, so it was left off rather than assumed to
 * belong here -- flagged for a decision instead of guessed.
 */

export const { data, render } = definePage({
  data: {
    title: 'Awards & Honors — Dr. Biswajit Mohapatra',
    description:
      'CIO, cloud and technology leadership awards received by Dr. Biswajit Mohapatra from 2019 to 2026.',
    navLabel: 'Awards',
    schemaType: 'CollectionPage',
    permalink: '/awards/',
  },

  render: () =>
    listPage({
      id: 'awards',
      eyebrow: 'Recognition',
      heading: 'Awards & Honors',
      rows: [
        {
          title: 'GCC Expo Customer Impact Award',
          sub: 'Eventex GCC Expo, Bengaluru',
          meta: 'Aug 2026',
          datetime: '2026-08',
          detail: html`<p>&ldquo;GCC Expo Award Winner &mdash; Dr. Biswajit Mohapatra, Intuitive.ai &mdash; Customer Impact Award: for projects or teams significantly improving client satisfaction.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-award-gcc-expo-2026',
            width: 800,
            height: 800,
            alt: 'GCC Expo Customer Impact Award and Distinguished Speaker trophies presented to Dr. Biswajit Mohapatra, 20 August 2026, Bengaluru',
            caption: 'Both GCC Expo trophies from the same 20 August 2026 ceremony in Bengaluru: Customer Impact Award (right) and Distinguished Speaker (left).',
          },
        },
        {
          title: 'GCC Expo Distinguished Speaker',
          sub: 'Eventex GCC Expo, Bengaluru',
          meta: 'Aug 2026',
          datetime: '2026-08',
          detail: html`<p>&ldquo;Distinguished Speaker &mdash; Presented to Dr. Biswajit Mohapatra, VP &amp; Head of Product and Solutions Engineering, Intuitive.ai &mdash; In recognition of your exceptional thought leadership and distinguished contribution towards shaping the future of Global Capability Centers. 20th August 2026 | Bengaluru.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-award-gcc-expo-2026',
            width: 800,
            height: 800,
            alt: 'GCC Expo Distinguished Speaker and Customer Impact Award trophies presented to Dr. Biswajit Mohapatra, 20 August 2026, Bengaluru',
            caption: 'Both GCC Expo trophies from the same 20 August 2026 ceremony in Bengaluru: Distinguished Speaker (left) and Customer Impact Award (right).',
          },
        },
        {
          title: 'AI Accelerator X Award',
          sub: 'Enterprise IT World, at the CIO 500 event',
          meta: 'Aug 2026',
          datetime: '2026-08',
          detail: html`<p>&ldquo;Accelerator X Awards 2026 &mdash; Recognizing the Best IT, Digital and Security Minds in the Industry at CIO 500 Event.&rdquo; &ldquo;Congratulations! Dr. Biswajit Mohapatra, VP - Product and Solutions Engineering, intuitive.ai, for Winning AI Accelerator X Awards 2026 - IT &amp; ITeS.&rdquo; 19th August 2026, Hyatt Pune.</p>`,
          proofImage: {
            slug: 'proof-award-accelerator-x-2026',
            width: 658,
            height: 800,
            alt: 'AI Accelerator X Award 2026 presented to Dr. Biswajit Mohapatra by Enterprise IT World',
            caption: '19 August 2026, Hyatt Pune.',
          },
        },
        {
          title: 'Top 100 Global Thought Leader & Influencer — Cloud, Data Center and DevOps',
          sub: 'Thinkers360',
          meta: '2025',
          datetime: '2025',
          source: sources.thinkers360Cloud,
          detail: html`<p>Three separate badges, one per category. Cloud is linked below; the other two:</p><p><a class="text-link" href="${sources.thinkers360DataCenter.url}" target="_blank" rel="noopener noreferrer">Verify at ${sources.thinkers360DataCenter.label}</a></p><p><a class="text-link" href="${sources.thinkers360DevOps.url}" target="_blank" rel="noopener noreferrer">Verify at ${sources.thinkers360DevOps.label}</a></p>`,
          proofImage: {
            slug: 'proof-award-top100-thinkers360-2025',
            width: 800,
            height: 339,
            alt: 'Three Thinkers360 Top 100 Thought Leader badges: Cloud, Data Center and DevOps',
            caption: 'All three 2025 badges: Cloud, Data Center and DevOps.',
          },
        },
        {
          title: 'Cyber Sentinel Award',
          sub: 'CISO100 & Cyber Sentinel Awards, Enterprise IT World',
          meta: 'Feb 2025',
          datetime: '2025-02',
          detail: html`<p>&ldquo;CISO 100 &amp; Cyber Sentinel Awards 2025 congratulates Biswajit Mohapatra, Head Customer Solutions, AWS, for winning Cyber Sentinel Awards 2025.&rdquo; Novotel Mumbai Juhu Beach, 21 February 2025.</p>`,
          proofImage: {
            slug: 'proof-award-cyber-sentinel-2025',
            width: 652,
            height: 800,
            alt: 'Cyber Sentinel Award 2025 presented to Biswajit Mohapatra, Head Customer Solutions, AWS',
            caption: 'Novotel Mumbai Juhu Beach, 21 February 2025.',
          },
        },
        {
          title: 'CII Jury Award — Digital Transformation (DX) Best Practice Award, 6th edition',
          sub: 'CII–Tata Communications Centre for Digital Transformation (CDT)',
          meta: '2024',
          datetime: '2024',
          detail: html`<p>&ldquo;CII Tata Communications Centre for Digital Transformation (CDT) thanks Dr Biswajit Mohapatra for contributing as the Jury member for the 6th edition of the coveted Digital Transformation (DX) Best Practice Award 2024. His experience, time and dedication made it possible for the team to appropriately shortlist the entries in their respective award category. We look forward to future engagements.&rdquo; &mdash; Team CDT</p>`,
          proofImage: {
            slug: 'proof-award-cii-dx-jury-2024',
            width: 623,
            height: 800,
            alt: 'CII Tata Communications Centre for Digital Transformation appreciation letter to Dr. Biswajit Mohapatra for serving as jury, 6th edition, 2024',
            caption: '6th edition, 2024.',
          },
        },
        {
          title: 'CISO100 & Cyber Sentinel Award',
          sub: 'Enterprise IT World',
          meta: '2023',
          datetime: '2023',
          detail: html`<p>&ldquo;CISO 100 &amp; Cyber Sentinel Awards 2023 &mdash; Presented to Dr. Biswajit Mohapatra, Head, Customer Solutions Management, India and South Asia, Amazon Web Services.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-award-ciso100-cyber-sentinel-2023',
            width: 600,
            height: 800,
            alt: 'CISO100 & Cyber Sentinel Award 2023 presented to Dr. Biswajit Mohapatra, Amazon Web Services',
            caption: 'The 2023 edition — a separate award from the Feb 2025 Cyber Sentinel Award above.',
          },
        },
        {
          title: 'CII Jury Award — Digital Transformation (DX) Best Practice Award, 5th edition',
          sub: 'CII–Tata Communications Centre for Digital Transformation (CDT)',
          meta: '2023',
          datetime: '2023',
          detail: html`<p>&ldquo;CII Tata Communications Centre for Digital Transformation (CDT) thanks Dr. Biswajit Mohapatra for contributing as the Jury member for the 5th edition of the coveted Digital Transformation (DX) Best Practice Award 2023. His experience, time and dedication made it possible for the team to appropriately shortlist the entries in their respective award category. We look forward to future engagements.&rdquo; &mdash; Team CDT</p>`,
          proofImage: {
            slug: 'proof-award-cii-dx-jury-2023',
            width: 594,
            height: 800,
            alt: 'CII Tata Communications Centre for Digital Transformation appreciation letter to Dr. Biswajit Mohapatra for serving as jury, 5th edition, 2023',
            caption: '5th edition, 2023.',
          },
        },
        {
          title: 'Eminent CIO of India',
          sub: 'VARINDIA',
          meta: '2023',
          datetime: '2023',
          detail: html`<p>&ldquo;Certificate of Recognition, Eminent CIO&rsquo;s of India &mdash; presented to Dr. Biswajit Mohapatra, CIO Advisory, Amazon Web Services.&rdquo; No date is printed on the certificate itself; 2023 is the year given in the source filename.</p>`,
          proofImage: {
            slug: 'proof-award-eminent-cio-india-2023',
            width: 1280,
            height: 904,
            alt: 'VARINDIA Certificate of Recognition, Eminent CIO of India, presented to Dr. Biswajit Mohapatra, CIO Advisory, Amazon Web Services',
            caption: 'Listed as CIO Advisory, Amazon Web Services — distinct from the IT Forum 2022 certificate below, which lists a different AWS title.',
          },
        },
        {
          title: 'The World CIO 200 Award',
          sub: 'Global CIO Forum',
          meta: 'Nov 2022',
          datetime: '2022-11',
          detail: html`<p>&ldquo;The World CIO 200 Awards, India Edition &mdash; Dr. Biswajit Mohapatra, Head, Customer Solutions Management, Amazon Web Services, is hereby recognized as a transformative technology leader by the Global CIO Forum Committee for his/her merits and achievements in driving organizational excellence and is proudly bestowed with the title of LEGEND.&rdquo; 4 November 2022, Certificate No. 61403633.</p>`,
          proofImage: {
            slug: 'proof-award-world-cio-200-2022',
            width: 618,
            height: 800,
            alt: 'The World CIO 200 Award, India Edition, bestowing the title of Legend on Dr. Biswajit Mohapatra',
            caption: '4 November 2022, Certificate No. 61403633.',
          },
        },
        {
          title: 'Eminent CIO of India',
          sub: 'VARINDIA, at IT Forum 2022',
          meta: '2022',
          datetime: '2022',
          detail: html`<p>&ldquo;Certificate of Recognition, Eminent CIO&rsquo;s of India &mdash; presented to Dr. Biswajit Mohapatra, Head Customer Solutions Management, Amazon Internet Services Pvt. Ltd.&rdquo; No date is printed on the certificate itself; 2022 is the year given in the source filename.</p>`,
          proofImage: {
            slug: 'proof-award-eminent-cio-india-2022',
            width: 1280,
            height: 747,
            alt: 'VARINDIA Certificate of Recognition, Eminent CIO of India, presented to Dr. Biswajit Mohapatra, Amazon Internet Services Pvt. Ltd.',
            caption: 'Listed as Head Customer Solutions Management, Amazon Internet Services Pvt. Ltd. — distinct from the 2023 certificate above.',
          },
        },
        {
          title: 'Hybrid Cloud Champion Award',
          sub: 'Enterprise IT World Hybrid Cloud Awards',
          meta: 'Sep 2022',
          datetime: '2022-09',
          detail: html`<p>The certificate itself is titled &ldquo;Hybrid Cloud Awards 2022&rdquo; &mdash; the word &ldquo;Champion&rdquo; does not appear on it. &ldquo;For the extraordinary work done by Dr. Biswajit Mohapatra to Amazon Web Services through innovation, foresight, unique IT strategies, thereby enhancing business agility, cost optimization, operational efficiency and contributing to the nation.&rdquo; 9 September 2022, Taj M.G. Road, Bangalore.</p>`,
          proofImage: {
            slug: 'proof-award-hybrid-cloud-2022',
            width: 1306,
            height: 735,
            alt: 'Hybrid Cloud Awards 2022 Certificate of Recognition presented to Dr. Biswajit Mohapatra, Amazon Web Services',
            caption: '9 September 2022, Taj M.G. Road, Bangalore.',
          },
        },
        {
          title: 'Transformational CIO of the Year',
          sub: 'DC Champion Awards, Enterprise IT World',
          meta: '2022',
          datetime: '2022',
          detail: html`<p>&ldquo;DC Champion Awards 2022 &mdash; CIO Award: Transformational CIO of the Year. This award is presented to Biswajit Mohapatra, Head, Customer Solutions Management, India and South Asia, AWS, for having successfully managed a transformational journey in data center management through innovative strategies.&rdquo; Presented by CtrlS.</p>`,
          proofImage: {
            slug: 'proof-award-transformational-cio-2022-dc-champion',
            width: 1280,
            height: 720,
            alt: 'DC Champion Awards 2022, Transformational CIO of the Year, presented to Biswajit Mohapatra',
            caption: 'DC Champion Awards 2022, presented by CtrlS.',
          },
        },
        {
          title: 'Channel-Recommended Top CIO of India Award',
          sub: 'Digital Edge Enterprise Channels Summit & Awards',
          meta: 'Feb 2022',
          datetime: '2022-02',
          detail: html`<p>&ldquo;Congratulations for winning Channel-Recommended Top CIO of India Award 2022 &mdash; Biswajit Mohapatra, Partner and Executive Director &mdash; CIO Advisory and Hybrid Cloud, IBM.&rdquo; 11 February 2022, Eros Hotel, New Delhi.</p>`,
          proofImage: {
            slug: 'proof-award-channel-recommended-top-cio-2022',
            width: 1280,
            height: 905,
            alt: 'Channel-Recommended Top CIO of India Award 2022 presented to Biswajit Mohapatra, IBM',
            caption: '11 February 2022, Eros Hotel, New Delhi.',
          },
        },
        {
          title: 'CII Jury Award — Digital Transformation (DX) Best Practices Award, 4th edition',
          sub: 'CII–Tata Communications Centre for Digital Transformation (CDT)',
          meta: '2022',
          datetime: '2022',
          detail: html`<p>&ldquo;CII &ndash; Tata Communications Centre for Digital Transformation (CDT) thanks Dr. Biswajit Mohapatra for contributing as the Jury member for the 4th edition of the coveted Digital Transformation (DX) Best Practices Award 2022. His experience, time and dedication made it possible for the team to appropriately shortlist the entries in their respective award category. We look forward to future engagements.&rdquo; &mdash; Team CDT</p>`,
          proofImage: {
            slug: 'proof-award-cii-dx-jury-2022',
            width: 600,
            height: 800,
            alt: 'CII Tata Communications Centre for Digital Transformation appreciation letter to Dr. Biswajit Mohapatra for serving as jury, 4th edition, 2022',
            caption: '4th edition, 2022.',
          },
        },
        {
          title: 'CIO1000 APAC Award',
          sub: 'Enterprise IT World',
          meta: 'Dec 2021',
          datetime: '2021-12',
          proofImage: {
            slug: 'proof-award-cio1000-apac-2021',
            width: 1024,
            height: 573,
            alt: 'CIO 1000 Award presented to Biswajit Mohapatra, Partner & Executive Director, IBM, December 2021',
            caption: 'Asia Pacific’s Largest Gathering of CIOs, December 2021.',
          },
        },
        {
          title: 'Second Plateau Invention Achievement Award',
          sub: 'IBM',
          meta: 'Nov 2021',
          datetime: '2021-11',
          source: sources.ibmPlateau,
          detail: html`<p>&ldquo;IBM presents to Biswajit Mohapatra a Second Plateau Invention Achievement Award in appreciation and recognition of creative contributions to IBM progress.&rdquo; Signed by Arvind Krishna, Chairman and Chief Executive Officer, 4 November 2021.</p>`,
          proofImage: {
            slug: 'proof-award-second-plateau-2021',
            width: 800,
            height: 624,
            alt: 'IBM Second Plateau Invention Achievement Award certificate presented to Biswajit Mohapatra, signed by Arvind Krishna',
            caption: 'Signed by Arvind Krishna, Chairman and CEO, 4 November 2021.',
          },
        },
        {
          title: 'No. 1 APN (AWS Partner Network) Ambassador Globally',
          sub: 'Amazon Web Services',
          meta: 'Oct 2021',
          datetime: '2021-10',
          detail: html`<p>Ranked #1 among &ldquo;Top Ambassadors globally&rdquo; (ahead of Carlos Diego Cavalcanti, CTO, Valcann, Brazil, and Yoichi Satake, Cloud Solutions Architect, Serverworks, Japan) and #1 among &ldquo;Top India Ambassadors&rdquo; in the AWS Partner Network Ambassador Program, listed as AWS service leader, IBM, India.</p>`,
          proofImage: {
            slug: 'proof-award-apn-ambassador-2021',
            width: 1024,
            height: 1024,
            alt: 'AWS Partner Network Top Ambassadors globally and Top India Ambassadors rankings, Biswajit Mohapatra ranked #1 in both',
            caption: 'Ranked #1 globally and #1 in India.',
          },
        },
        {
          title: 'Business Leader of the Year, Cloud Computing',
          sub: 'Asian-African Chamber of Commerce and Industry',
          meta: 'Oct 2021',
          datetime: '2021-10',
          detail: html`<p>&ldquo;Certificate of Appreciation, Asian-African Business Summit &mdash; proudly presented to Biswajit Mohapatra, Partner, Executive Director, IBM &mdash; The Business Leader of the Year in Cloud Computing. In recognition for your outstanding performance in your respective field and for excellent contribution as well as acknowledged commitment through your sustainable work.&rdquo; Asian-African Business Summit, &ldquo;Redefining Sustainable Leadership &amp; Building International Trade&rdquo;, 22&ndash;23 October 2021. Signed by Dr. GD Singh, Founder &amp; Chairman, AACCI, and Dr. Neetu Singh, Vice Chairperson, Asia, AACCI.</p>`,
          proofImage: {
            slug: 'proof-award-business-leader-cloud-2021-certificate',
            width: 568,
            height: 800,
            alt: 'Asian-African Chamber of Commerce and Industry Certificate of Appreciation, Business Leader of the Year in Cloud Computing, presented to Biswajit Mohapatra',
            caption: 'Asian-African Business Summit, 22–23 October 2021.',
          },
        },
        {
          title: 'Cloud Champion Award',
          sub: 'Enterprise IT World Cloud Summit',
          meta: 'Oct 2021',
          datetime: '2021-10',
          detail: html`<p>&ldquo;Award Certificate, Cloud Champion 2021 &mdash; presented to Biswajit Mohapatra, Partner, Executive Director, IBM. Cloud Summit &amp; Award 2021 is conferred on you because of your innovation in cloud to enable your organization to optimise cost and enhance productivity.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-award-cloud-champion-2021',
            width: 768,
            height: 431,
            alt: 'Cloud Champion 2021 Award certificate presented to Biswajit Mohapatra, IBM, Enterprise IT World Cloud Summit',
            caption: 'Enterprise IT World Cloud Summit & Awards 2021.',
          },
        },
        {
          title: 'Cyber Samurai Award',
          sub: 'Enterprise IT World',
          meta: 'Sep 2021',
          datetime: '2021-09',
          detail: html`<p>&ldquo;Cyber Samurai Award 2021 is conferred on you because of your immense contribution to the cyber security domain for a long time.&rdquo; Biswajit Mohapatra, Partner, Executive Director, IBM.</p>`,
          proofImage: {
            slug: 'proof-award-cyber-samurai-2021',
            width: 768,
            height: 768,
            alt: 'Cyber Samurai Award 2021 certificate presented to Biswajit Mohapatra, IBM, by Enterprise IT World Security Symposium',
            caption: 'Enterprise IT World Security Symposium, 2021.',
          },
        },
        {
          title: 'BTX Solution Awards',
          sub: 'BTX Roadshow, Asia Edition',
          meta: 'Sep 2021',
          datetime: '2021-09',
          detail: html`<p>Category: Information Technology Services. &ldquo;Biswajit Mohapatra, Partner, Executive Director, Hybrid Cloud Transformation Services, IBM.&rdquo;</p>`,
          proofImage: {
            slug: 'proof-award-btx-solution-2021',
            width: 768,
            height: 403,
            alt: 'BTX Solution Awards 2021, Information Technology Services category, presented to Biswajit Mohapatra, IBM',
            caption: 'Category: Information Technology Services.',
          },
        },
        {
          title: 'The Most Admired Global Indians',
          sub: 'Passion Vista',
          meta: 'Aug 2021',
          datetime: '2021-08',
          detail: html`<p>&ldquo;Hearty congratulations for being among the Most Admired Global Indians 2021.&rdquo; Biswajit Mohapatra, Partner and Executive Director, Hybrid Cloud Transformation Services, IBM.</p>`,
          proofImage: {
            slug: 'proof-award-most-admired-global-indians-2021',
            width: 768,
            height: 768,
            alt: 'The Most Admired Global Indians 2021 recognition, Passion Vista, Biswajit Mohapatra, IBM',
            caption: 'Passion Vista, 2021.',
          },
        },
        {
          title: 'Transformational CIO of the Year',
          sub: 'DC Summit and Awards, Enterprise IT World',
          meta: 'Jul 2021',
          datetime: '2021-07',
          detail: html`<p>&ldquo;Outsourced Data Center CIO Award: Transformational CIO of the Year. This award is presented to Biswajit Mohapatra, Partner and Executive Director, IBM, for having successfully managed a transformational journey in data center management through innovative strategies.&rdquo; Data Centre Summit &amp; 100 Data Centre Champion Awards 2021, 9 July 2021.</p>`,
          proofImage: {
            slug: 'proof-award-transformational-cio-2021-dc-summit',
            width: 768,
            height: 512,
            alt: 'Data Centre Summit & 100 Data Centre Champion Awards 2021, Transformational CIO of the Year, presented to Biswajit Mohapatra',
            caption: 'Data Centre Summit & Awards 2021, 9 July 2021.',
          },
        },
        {
          title: 'CIO of the Year',
          sub: '4th Leadership Summit and Awards',
          meta: 'May 2021',
          datetime: '2021-05',
          detail: html`<p>&ldquo;4th Edition, Leadership Summit &amp; Awards 2021, Virtual Awards Ceremony &mdash; Biswajit Mohapatra, IBM &mdash; Best CIO of the Year 2021.&rdquo; 28 May 2021.</p>`,
          proofImage: {
            slug: 'proof-award-cio-of-the-year-2021-leadership-summit',
            width: 768,
            height: 401,
            alt: 'Leadership Summit & Awards 2021 virtual ceremony graphic naming Biswajit Mohapatra Best CIO of the Year',
            caption: 'Virtual Awards Ceremony, 28 May 2021.',
          },
        },
        {
          title: 'Catalyst Technology Award',
          sub: 'Global CIO Forum',
          meta: 'Apr 2021',
          datetime: '2021-04',
          source: sources.catalystAward2021Accredible,
          detail: html`<p>&ldquo;Catalyst Awards 2021, Asia Edition &mdash; Biswajit Mohapatra, Partner, Executive Director, IBM, is hereby recognised as a Leader by the Committee for his/her merits &amp; achievements in driving organisation excellence and is proudly bestowed the Catalyst Technology Award.&rdquo; Signed by the Founder, Global CIO Forum, and Manoj Saxena, Chairman, RosettaNet.</p>`,
          proofImage: {
            slug: 'proof-award-catalyst-technology-2021',
            width: 768,
            height: 993,
            alt: 'Catalyst Awards 2021 certificate, Catalyst Technology Award, presented to Biswajit Mohapatra, IBM',
            caption: 'Catalyst Awards 2021, Asia Edition.',
          },
        },
        {
          title: 'Innovative CIO Award',
          sub: '6th Innovative CIO Awards and Symposium',
          meta: 'Feb 2021',
          datetime: '2021-02',
          detail: html`<p>&ldquo;Certificate of Excellence proudly presented to Biswajit Mohapatra, IBM, for winning 6th Innovative CIO Awards.&rdquo; Top 100. Presented by CIOAXIS, powered by VMRAY.</p>`,
          proofImage: {
            slug: 'proof-award-innovative-cio-2021',
            width: 768,
            height: 551,
            alt: '6th Innovative CIO Awards 2021 Certificate of Excellence presented to Biswajit Mohapatra, IBM',
            caption: '6th Innovative CIO Awards and Symposium, Top 100, 2021.',
          },
        },
        {
          title: 'Top 50 Global Thought Leaders and Influencers on Cloud Computing',
          sub: 'Thinkers360',
          meta: 'Jan 2021',
          datetime: '2021-01',
          proofImage: {
            slug: 'proof-award-top50-thinkers360-2021',
            width: 768,
            height: 384,
            alt: 'Thinkers360 Top 50 Global Thought Leaders on Cloud Computing, January 2021, list including Biswajit Mohapatra',
            caption: 'Thinkers360, January 2021.',
          },
        },
        {
          title: 'NEXT100 CIO Award',
          sub: 'ITNEXT Technology Awards',
          meta: 'Dec 2020',
          datetime: '2020-12',
          detail: html`<p>Featured on the December 2020 cover of IT NEXT magazine (Volume 11, Issue 09) as a &ldquo;NEXT 100 Winner 2020&rdquo;, listed as Biswajit Mohapatra, Director &ndash; IT, IBM India.</p>`,
          proofImage: {
            slug: 'proof-award-next100-cio-2020',
            width: 768,
            height: 1017,
            alt: 'IT NEXT magazine December 2020 cover featuring Biswajit Mohapatra as a NEXT100 Winner',
            caption: 'IT NEXT magazine, December 2020 cover.',
          },
        },
        {
          title: 'CXO Tech Excellence Award',
          sub: 'CXOTV Tech Summit and Awards',
          meta: 'Oct 2020',
          datetime: '2020-10',
          detail: html`<p>&ldquo;This certificate is awarded to League of Outstanding Innovators, Biswajit Mohapatra, Partner, Executive Director, IBM, for extra-ordinary work executed to power businesses through innovation, foresight and unique IT strategies.&rdquo; Signed by Kalpana Singhal, Co-Founder &amp; Editor in Chief, Techplus Media.</p>`,
          proofImage: {
            slug: 'proof-award-cxo-tech-excellence-2020',
            width: 768,
            height: 528,
            alt: 'CXO Tech Excellence Award 2020 certificate presented to Biswajit Mohapatra, IBM',
            caption: 'CXOTV Virtual Tech Summit & Awards 2020.',
          },
        },
        {
          title: 'Innovative CIO Award',
          sub: 'CIOAXIS',
          meta: 'Aug 2020',
          datetime: '2020-08',
          detail: html`<p>5th Innovative CIO 20 Awards, Special Achievement recognition. Biswajit Mohapatra, IBM. Presented by CIOAXIS, in association with Micro Focus and Bitstream Media Awards.</p>`,
          proofImage: {
            slug: 'proof-award-innovative-cio-2020-cioaxis',
            width: 768,
            height: 768,
            alt: '5th Innovative CIO 20 Awards, Special Achievement, presented to Biswajit Mohapatra by CIOAXIS',
            caption: '5th Innovative CIO 20 Awards, 2020.',
          },
        },
        {
          title: 'Super Hero CIO Award',
          sub: 'Global Awards Function, Enterprise IT World',
          meta: 'Jun 2020',
          datetime: '2020-06',
          detail: html`<p>Formally the &ldquo;COVID-19 Super Hero CIO&rdquo; award. &ldquo;Certificate of Recognition &mdash; this certificate is presented to Biswajit Mohapatra, Director, CIO Advisory and Cloud Migration, IBM India, India, for the extraordinary work done by him to power businesses through the COVID-19 crisis through innovation, foresight, unique IT strategies, thereby enhancing business agility, cost optimization, operational efficiency and contributing to the nation.&rdquo; Global Awards Function, 13 June 2020. Presented by Enterprise IT World and CtrlS.</p>`,
          proofImage: {
            slug: 'proof-award-super-hero-cio-2020',
            width: 768,
            height: 768,
            alt: 'COVID-19 Super Hero CIO Award Certificate of Recognition presented to Biswajit Mohapatra, IBM India',
            caption: 'Global Awards Function, 13 June 2020.',
          },
        },
        {
          title: 'Turn Around Strategy Award',
          sub: 'Chief Strategy Officer Summit',
          meta: 'Feb 2020',
          datetime: '2020-02',
          detail: html`<p>&ldquo;Certificate of Appreciation &mdash; this is to certify that Biswajit Mohapatra, IBM, was awarded at Chief Strategy Summit Awards 2020.&rdquo; 2nd Edition, Chief Strategy Officer Summit &amp; Awards 2020, &ldquo;Turnaround Strategy 2020 Winner&rdquo;, held 21 February 2020 at Ramada Plaza, Juhu. Conceptualised by Morpheus Enterprises.</p>`,
          proofImage: {
            slug: 'proof-award-turnaround-strategy-2020',
            width: 820,
            height: 1024,
            alt: 'Chief Strategy Officer Summit & Awards 2020 Turnaround Strategy Winner certificate and trophy, Biswajit Mohapatra, IBM',
            caption: '21 February 2020, Ramada Plaza, Juhu.',
          },
        },
        {
          title: 'CIO of the Year',
          sub: 'CIO500 Conclave',
          meta: 'Dec 2019',
          datetime: '2019-12',
          detail: html`<p>&ldquo;Enterprise IT World CIO500 Conclave Awards India congratulates Biswajit Mohapatra {Global Delivery Leader - CIO Advisory and Cloud Migration Factory}, IBM India, for winning award of CIO of the Year.&rdquo; 13&ndash;15 December 2019, New Delhi.</p>`,
          proofImage: {
            slug: 'proof-award-cio-of-the-year-2019-cio500',
            width: 768,
            height: 608,
            alt: 'Enterprise IT World CIO500 Conclave Awards plaque, CIO of the Year, presented to Biswajit Mohapatra, IBM India',
            caption: '13–15 December 2019, New Delhi.',
          },
        },
      ],
    }),
});
