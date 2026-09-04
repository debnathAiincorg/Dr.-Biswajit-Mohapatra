import type { ProofImage, Row } from '../components/row-list.ts';
import { html } from '../lib/html.ts';
import type { Renderable } from '../lib/html.ts';

/*
 * News items, shared by /news/ and the homepage teaser, so a corrected
 * headline is a one-line edit rather than two hand-maintained copies.
 *
 * The Intuitive.ai appointment row's `detail` is the complete press
 * coverage of it from dr/linkdin3.docx: the original announcement post, the
 * "Leadership Spotlight" description, both LinkedIn reaction comments (CXO
 * Chapter, CXO Lanes), and the full text of both press articles
 * (Digitaltech Media, Enterprise IT World) that ran the appointment as news
 * -- quoted verbatim, not summarised. The eight images that ran alongside
 * this coverage in the source document (his LinkedIn profile banner plus
 * seven outlets' congratulations/announcement graphics) are all included:
 * the banner at full width, the other seven in a compact grid so seven
 * near-identical "congratulations" graphics don't turn one row into the
 * length of the whole page. Every image opens full-size in the lightbox.
 */

export interface LabNote {
  readonly title: string;
  /** Human-readable label, e.g. "Jun 2026". */
  readonly meta: string;
  /** Machine-readable value for <time datetime>. */
  readonly datetime: string;
  /** Expands the row in place, matching Publications/Education/Experience/Awards. */
  readonly detail?: Renderable;
  readonly proofImage?: ProofImage;
}

function pressGridFigure(slug: string, alt: string, width: number, height: number, caption: string): Renderable {
  return html`<figure><a class="proof-zoom" href="/assets/images/proof/${slug}.jpg" data-caption="${caption}" data-alt="${alt}"><img src="/assets/images/proof/${slug}.jpg" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async"></a></figure>`;
}

/** Like pressGridFigure, but for an image outside /assets/images/proof/ -- the
 *  GCC Expo, book-cover and OSFY-tearsheet images below are the same files
 *  Awards and Publications already serve, referenced by path rather than
 *  duplicated as a second copy under a second slug. */
function figureAt(path: string, alt: string, width: number, height: number, caption: string): Renderable {
  return html`<figure><a class="proof-zoom" href="${path}.jpg" data-caption="${caption}" data-alt="${alt}"><img src="${path}.jpg" alt="${alt}" width="${width}" height="${height}" loading="lazy" decoding="async"></a><figcaption>${caption}</figcaption></figure>`;
}

const intuitiveAiAppointmentDetail = html`<p><strong>A major leadership move in the AI and cloud ecosystem.</strong> Dr. Bishwajit Mohapatra joins Intuitive.ai as VP &amp; Head of Product and Solutions Engineering. Ex-Amazon Web Services and IBM leader, he brings deep expertise in AI, cloud, and large-scale enterprise transformation. Announced by ET Edge &ndash; The Times Group, CIOandLeader and CISO FORUM.</p><p class="row-detail-q">Leadership Spotlight</p><p>Dr. Bishwajit Mohapatra has been appointed as Vice President &amp; Head of Product and Solutions Engineering at Intuitive.ai. In this role, he will lead the cloud, data, AI, and security practices, while building and scaling a high-performing product and solutions engineering organization focused on delivering customer-centric and outcome-driven solutions.</p><p>Previously, he was with Amazon Web Services (AWS) as Head of Customer Solutions and CIO Advisory for India and South Asia, where he led major cloud transformation programs and drove GenAI adoption initiatives across enterprises.</p><p>He also brings over a decade of experience from IBM, where he led global hybrid cloud services, along with earlier leadership roles at Zensar Technologies and Tata Consultancy Services.</p><p>His appointment highlights Intuitive.ai&rsquo;s focus on strengthening its product engineering capabilities and scaling advanced AI-driven, cloud-first solutions for customers.</p><p class="row-detail-q">CXO Chapter (6,111 followers)</p><p>&ldquo;Congratulations to Dr. Bishwajit Mohapatra on joining Intuitive.ai as VP &amp; Head of Product and Solutions Engineering! This exciting new role marks a significant step in driving AI-led enterprise innovation. With your deep expertise in product leadership and solutions engineering, you are well-positioned to build impactful, scalable solutions that enable organizations to harness the true potential of AI. Wishing you great success as you lead innovation, shape product strategy, and deliver transformative outcomes in this new chapter. Looking forward to the impact you will create at Intuitive.ai!&rdquo;</p><p class="row-detail-q">CXO Lanes (506,710 followers)</p><p>&ldquo;Dr. Bishwajit Mohapatra has been appointed as VP &amp; Head of Product and Solutions Engineering at Intuitive.ai. In this role, he will lead cloud, data, AI, and security practices while building and scaling a high-impact product and solutions engineering function, focused on delivering customer-centric and outcome-driven engagements. Prior to this, he served at Amazon Web Services (AWS) as Head of Customer Solutions and CIO Advisory for India and South Asia, where he drove large-scale cloud transformation initiatives and GenAI adoption. He also spent over a decade at IBM leading global hybrid cloud services, alongside earlier leadership roles at Zensar Technologies and Tata Consultancy Services.&rdquo;</p><p class="row-detail-q">Digitaltech Media &mdash; &ldquo;Intuitive.ai Appoints Dr. Bishwajit Mohapatra as Vice President &amp; Head of Solutions Engineering&rdquo;</p><p><em>Career Movement, April 9, 2026</em></p><p>Intuitive.ai today announced the appointment of Dr. Bishwajit Mohapatra as Vice President &amp; Head of Solutions Engineering. With over three decades of global leadership in cloud, data, AI, and digital transformation, Dr. Mohapatra brings unmatched expertise in scaling innovation and driving enterprise modernization across industries.</p><p>Dr. Mohapatra previously led Customer Solutions for India &amp; South Asia at Amazon Web Services (AWS), where he helped CXOs reimagine their businesses with Cloud, Data and AI at scale. Prior to AWS, Dr. Mohapatra served as Executive Director and Global Integrated Delivery Leader at IBM, where he scaled IBM&rsquo;s Hybrid Cloud business across Global Delivery Centres. His earlier leadership roles include TCS, Zensar Technologies, and Kanbay (Capgemini Group), where he pioneered automation-led modernization and solution frameworks.</p><p>Beyond corporate leadership, Dr. Mohapatra has actively contributed to industry and policy development. He played a key role in MeitY&rsquo;s Zero Trust Security Architecture, served on the CII&ndash;CDT executive council, and advised international industry bodies. A recognized global keynote speaker on Cloud, AI/ML, and Cybersecurity, he holds 5 patents, has delivered 50+ keynotes, and received 20+ CXO awards.</p><p class="row-detail-q">Enterprise IT World &mdash; &ldquo;Intuitive.ai Appoints Dr. Bishwajit Mohapatra to Lead Customer-Centric Cloud and AI Growth&rdquo;</p><p><em>by enterpriseitworld, April 9, 2026</em></p><p>Intelligent automation and enterprise AI firm Intuitive.ai has announced the onboarding of Dr. Bishwajit Mohapatra, a globally respected technology leader with more than three decades of experience in enterprise transformation, cloud strategy and large-scale digital modernization. At Intuitive.ai, Dr. Mohapatra will spearhead customer-centric strategies across Cloud, Data, Artificial Intelligence and Security, focusing on helping enterprises translate complex technology investments into measurable business outcomes. The appointment aligns with Intuitive.ai&rsquo;s ambition to scale its offerings globally while deepening industry-specific impact in regulated and data-intensive sectors.</p><p>Dr. Mohapatra brings a rare blend of strategic advisory depth and execution leadership. Over a career spanning 30+ years, he has led digital reinvention initiatives for 35+ Fortune 500 enterprises, delivering more than 60 large-scale, mission-critical transformation programs across banking, insurance, telecom, manufacturing, media and healthcare. His work has consistently focused on modernizing legacy systems, enabling hybrid and multi-cloud adoption, and embedding security and resilience at the core of enterprise architectures.</p><p>Most recently, Dr. Mohapatra held senior leadership roles at Amazon Web Services (AWS), where he led customer solutions and cloud transformation programs across India and South Asia, advising CXOs on cloud-native modernization, data platforms and AI-led innovation. Prior to AWS, he spent over 15 years at IBM, serving as Partner and Executive Director for Hybrid Cloud Transformation Services, where he built global practices and delivery centers and incubated next-generation transformation offerings. An alumnus of IIT Bombay, Dr. Mohapatra is widely recognized as a Top 50 Global Thought Leader in Cloud Computing, a prolific author, and a recipient of 20+ CIO and leadership awards for technology innovation and enterprise impact. He also holds multiple cloud and architecture certifications across AWS, Microsoft Azure and Google Cloud, and has contributed patents and publications in emerging technology domains. At Intuitive.ai, Dr. Mohapatra is expected to play a pivotal role in shaping industry-focused solutions that combine cloud platforms, secure data foundations and AI accelerators, reinforcing the company&rsquo;s positioning as a partner for scalable, outcome-driven enterprise transformation.</p><p>With this appointment, Intuitive.ai signals a strong push toward global expansion and execution-led innovation, anchored by leadership that has repeatedly delivered transformation at scale.</p><p class="row-detail-q">Congratulations graphics from six outlets</p><div class="proof-grid">${pressGridFigure('proof-news-etedge-congrats', 'ET Edge / CIOandLeader congratulations graphic on Dr. Bishwajit Mohapatra joining Intuitive.ai', 800, 1000, 'ET Edge / CIOandLeader')}${pressGridFigure('proof-news-veloxx-media', 'Veloxx Media news graphic: Bishwajit Mohapatra joins Intuitive.ai as VP', 800, 800, 'Veloxx Media')}${pressGridFigure('proof-news-bharat-cxo', 'Bharat CXO Leadership Spotlight graphic on Dr. Bishwajit Mohapatra', 800, 800, 'Bharat CXO')}${pressGridFigure('proof-news-cxo-chapter', 'CXO Chapter congratulations graphic on Dr. Bishwajit Mohapatra joining Intuitive.ai', 800, 772, 'CXO Chapter')}${pressGridFigure('proof-news-cxo-lanes', 'CXO Lanes congratulations graphic on Dr. Bishwajit Mohapatra joining Intuitive.ai', 800, 800, 'CXO Lanes')}${pressGridFigure('proof-news-digitaltech-media', 'Digitaltech Media congratulations graphic on Dr. Bishwajit Mohapatra joining Intuitive.ai', 700, 410, 'Digitaltech Media')}</div>`;

/** Same two citations already quoted in full on Awards (both trophies from
 *  the same 20 August 2026 GCC Expo ceremony), reusing that page's image. */
const gccExpoDetail = html`<p>&ldquo;GCC Expo Award Winner &mdash; Dr. Biswajit Mohapatra, Intuitive.ai &mdash; Customer Impact Award: for projects or teams significantly improving client satisfaction.&rdquo;</p><p>&ldquo;Distinguished Speaker &mdash; Presented to Dr. Biswajit Mohapatra, VP &amp; Head of Product and Solutions Engineering, Intuitive.ai &mdash; In recognition of your exceptional thought leadership and distinguished contribution towards shaping the future of Global Capability Centers.&rdquo; 20 August 2026, Bengaluru.</p>`;

/** Same launch-post text and cover image already on Publications. */
const devOpsOdysseyPublishDetail = html`${figureAt(
  '/assets/images/photos/pub-devops-odyssey-cover',
  'Cover of The DevOps Odyssey by Dr. Biswajit Mohapatra',
  160,
  185,
  'Cover image, from the book’s LinkedIn launch post.',
)}<p>&ldquo;It&rsquo;s a reflection of real-world experiences, leadership lessons and practical insights from the evolving world of DevOps, SRE, Observability and Chaos Engineering &mdash; built for practitioners, CXOs and builders who are shaping modern, scalable and resilient technology ecosystems.&rdquo;</p>`;

/** The interview's own pull quote and intro paragraph -- the complete
 *  13-question transcript lives on Publications; duplicating all of it here
 *  as well would be re-typing the same interview twice on the same site. */
const osfyFeatureDetail = html`${figureAt(
  '/assets/images/photos/pub-osfy-interview-tearsheet',
  'Scanned pages of the Open Source For You interview with Dr. Biswajit Mohapatra, April 2024',
  1364,
  1929,
  'The original tearsheet, Open Source For You, April 2024.',
)}<p>&ldquo;Open source allows us to lower costs, accelerate delivery, and customise solutions to meet the market&rsquo;s fast-paced demands.&rdquo;</p><p>At OSI 2023, OSFY&rsquo;s Yashasvini Razdan spoke with Dr. Mohapatra, then Head, Customer Solutions at Amazon Web Services, about how open source empowers businesses with flexibility, experimentation and agile methodologies for genuine customer satisfaction.</p>`;

export const labNotes: readonly LabNote[] = [
  {
    title: 'GCC Expo names Biswajit Mohapatra Distinguished Speaker and awards Intuitive.ai its Customer Impact Award',
    meta: 'Aug 2026',
    datetime: '2026-08',
    detail: gccExpoDetail,
    proofImage: {
      slug: 'proof-award-gcc-expo-2026',
      width: 800,
      height: 800,
      alt: 'GCC Expo Customer Impact Award and Distinguished Speaker trophies presented to Dr. Biswajit Mohapatra, 20 August 2026, Bengaluru',
      caption: 'Both GCC Expo trophies from the same 20 August 2026 ceremony in Bengaluru.',
    },
  },
  {
    title: 'Joins Intuitive.ai as VP & Head of Product and Solutions Engineering',
    meta: 'Apr 2026',
    datetime: '2026-04',
    detail: intuitiveAiAppointmentDetail,
  },
  {
    title: 'Publishes “The DevOps Odyssey”, a book on scaling DevOps and building high-performance engineering cultures',
    meta: '2026',
    datetime: '2026',
    detail: devOpsOdysseyPublishDetail,
  },
  {
    title: 'Featured in Open Source For You magazine on open source, AI and enterprise cloud adoption',
    meta: 'Apr 2024',
    datetime: '2024-04',
    detail: osfyFeatureDetail,
  },
];

/** Rows for the `row-list` renderer, with the date as machine-readable `<time>`. */
export function asRows(): Row[] {
  return labNotes.map((note) => ({
    title: note.title,
    meta: note.meta,
    datetime: note.datetime,
    ...(note.detail !== undefined ? { detail: note.detail } : {}),
    ...(note.proofImage !== undefined ? { proofImage: note.proofImage } : {}),
  }));
}
