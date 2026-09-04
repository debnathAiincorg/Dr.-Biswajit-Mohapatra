import { listPage } from './_includes/components/list-page.ts';
import { html, raw } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

/*
 * Every role's employment type, duration, location, team size, mission line
 * and full bullet list of achievements, sourced verbatim from the Experience
 * section of dr/linkdin3.docx -- nothing summarised or trimmed. Logos are the
 * same LinkedIn-served company thumbnails used on Education, pulled from the
 * same document (see education.ts for the extraction note); Education also
 * established the expand-on-click pattern this page reuses (see
 * publications.ts for where that pattern originated).
 *
 * Kanbay has no logo: unlike the other five employers, no company thumbnail
 * for it exists anywhere among linkdin3.docx's embedded images. Per this
 * round's instruction to use only logos and details already in dr/, none was
 * sourced externally -- the row runs title-flush, without a leading mark.
 *
 * Each role's "Skills" line names every skill for that role, in full. Two per
 * role came from linkdin3.docx's own text; LinkedIn's plain-text export names
 * only the first two tagged skills before collapsing the rest into a bare
 * "+N skills" count, and the names behind that count are not recoverable from
 * dr/ -- confirmed by checking document.xml for text boxes, content controls
 * and alternate-content blocks that might hold them elsewhere in the file;
 * none exist. The remaining names on every row were supplied directly by
 * Dr. Mohapatra in conversation, each one checked against its role's own
 * "+N skills" count before being added (e.g. IBM's count was +3, and exactly
 * three further names were given for it) -- not sourced from dr/, but not
 * guessed either.
 */

export const { data, render } = definePage({
  data: {
    title: 'Experience — Dr. Biswajit Mohapatra',
    description:
      'Career history of Dr. Biswajit Mohapatra, from Tata Consultancy Services through Zensar, Kanbay, IBM and AWS to his current role at Intuitive.ai.',
    navLabel: 'Experience',
    schemaType: 'CollectionPage',
    permalink: '/experience/',
  },

  render: () =>
    listPage({
      id: 'experience',
      eyebrow: 'Career',
      heading: 'Experience',
      rows: [
        {
          title: 'VP & Head of Product and Solutions Engineering',
          sub: 'Intuitive.ai',
          meta: raw('Apr 2026&ndash;Present'),
          logo: 'intuitive-ai',
          detail: html`<p class="row-detail-meta">Full-time &middot; Apr 2026&ndash;Present &middot; 5 mos &middot; Pune City, Maharashtra, India</p><ul><li>Cloud, Data, AI and Security practice (Sales, Solutioning, GTM, Delivery, Customer Success)</li><li>Building and scaling a high-impact Product and Solutions Engineering function</li><li>Driving customer-centric, outcome-led engagements</li><li>Accelerating adoption of AI-driven, product-led solutions for enterprise impact</li></ul><p class="row-detail-meta">Skills: Cloud Computing, AI/ML, GenAI, Information Security, Software Solution Sales, Customer Solutions, Agentic Automation, Product Management, Global Delivery.</p>`,
        },
        {
          title: 'Head of Customer Solutions and CIO Advisory, India and South Asia',
          sub: 'Amazon Web Services (AWS)',
          meta: raw('Mar 2022&ndash;Mar 2026'),
          logo: 'aws',
          detail: html`<p class="row-detail-meta">Full-time &middot; Mar 2022&ndash;Mar 2026 &middot; 4 yrs 1 mo &middot; Pune District, Maharashtra, India</p><p>Helping CXOs reimagine their business with Cloud + GenAI at scale.</p><ul><li>Built and influenced &#36;1.5B+ cloud transformation pipeline, closing &#36;600M+ strategic deals across BFSI, Telco, Healthcare, Manufacturing, Media and Entertainment.</li><li>Spearheaded 40+ GenAI enterprise deployments that generated &#36;75M+ incremental revenue and accelerated digital adoption by 3x for top 50 accounts.</li><li>Accelerated &#36;270M of in-year migration revenue, established 4 Industry Innovation Hubs, and launched 5 GenAI and 3 security offerings through the AWS Marketplace.</li><li>Shaped AWS India&rsquo;s &#36;4.4B Hyderabad Region launch, projected to deliver 38,000+ jobs and &#36;700M ARR impact by 2030.</li><li>Delivered 150+ CIO advisory and board sessions, aligning technology investments with regulatory, growth and innovation agendas; enabled 35% IT cost optimization and 5x agility gains.</li><li>Led 25+ concurrent cloud transformation programs, achieving 98% migration success rate and enabling 99.99% resilient uptime through DevSecOps, SRE and Chaos Engineering.</li><li>Established Zero Trust frameworks for 40+ enterprises, cutting security incidents by 75% and FinOps practices reducing cloud spend by 30%.</li><li>Built and scaled a 150+ member high-performing delivery team (95% retention); enabled 8,000+ client professionals via AWS-led digital skilling and immersion programs.</li><li>Forged strategic alliances with Deloitte, KPMG, McKinsey, AT Kearney and 25+ GSI/ISV partners, unlocking &#36;400M+ annual partner-sourced opportunities.</li></ul><p class="row-detail-meta">Skills: Cloud Migration and Modernization, Global Delivery, Customer Solutions, GenAI, Cloud Security.</p>`,
        },
        {
          title: raw('Executive Director and Global Delivery Leader &mdash; Hybrid Cloud Services'),
          sub: 'IBM India',
          meta: raw('May 2007&ndash;Mar 2022'),
          logo: 'ibm',
          detail: html`<p class="row-detail-meta">Full-time &middot; May 2007&ndash;Mar 2022 &middot; 14 yrs 11 mos &middot; Pune &middot; Team size: 7,000</p><p>Established and led the Hybrid Cloud Transformation practice (AWS, Azure, GCP, Red Hat) and Global Cloud Migration Factory, serving as Global Integrated Delivery Leader to drive offering incubation, solutioning, capability development and delivery of digital transformation engagements. Expanded global delivery by establishing capability centers across China, Philippines, Mexico, Romania, Egypt and Poland. Scaled IBM&rsquo;s Hybrid Cloud business from &#36;150M to &#36;1.2B, building one of IBM&rsquo;s largest modernization practices globally.</p><ul><li>Directed 350+ migration and modernization programs, cutting enterprise TCO by up to 40% and enabling 99.99% uptime post-migration.</li><li>Designed and industrialized the IBM Garage and Global Cloud Factory Model, applied in 18 complex programs including Delta Airlines (IBM&rsquo;s largest AWS migration) and Philip Morris International.</li><li>Executed &euro;25M Cognitive Banking Transformation (71% faster loan cycles, &euro;60M projected benefit), modernized global telco OSS/BSS cutting &#36;180M annually, and co-created &#36;500M+ GTM offerings with AWS, Microsoft and Google.</li><li>Created 14 reusable assets (13 deployed in solutioning, 8 linked directly to wins) and incubated Continuous Modernization and Containerization Decision Model offerings.</li><li>Built and scaled a 7,000+ global delivery workforce with &gt;96% billability and &lt;10% attrition, driving operational excellence across NA, EU, APAC and India.</li><li>Managed 42 strategic presales pursuits, delivering a &#36;328M pipeline, 33 wins (&gt;80% success rate), and &#36;28.3M base account growth.</li><li>Championed leadership development for 200+ managers, embedding next-gen consulting mindset and program rigor.</li></ul><p class="row-detail-meta">Skills: Cloud Migration and Modernization, DevSecOps and Observability, Cloud-Native Architecture, Global Delivery, CIO Advisory Services.</p>`,
        },
        {
          title: raw('Global Practice Leader &mdash; Legacy Transformation'),
          sub: 'Kanbay Software India Private Limited (Capgemini Group Company)',
          meta: raw('May 2006&ndash;May 2007'),
          detail: html`<p class="row-detail-meta">Full-time &middot; May 2006&ndash;May 2007 &middot; 1 yr 1 mo &middot; Pune &middot; Team size: 850</p><p>Defined the vision and roadmap for legacy transformation services, established the GTM strategy and drove innovation in processes, methodologies and tools to scale capabilities and deliver Tier-1 banking transformations.</p><ul><li>Doubled practice revenue from &#36;120M to &#36;232M in one year, securing &#36;100M+ modernization programs across BFSI.</li><li>Directed core banking and payments transformations, cutting operating costs by 35% and boosting transaction efficiency by 45%.</li><li>Delivered a &#36;90M core platform transformation for a US bank, reducing onboarding time by 60%.</li><li>Built reusable modernization accelerators, cutting delivery timelines by 30% across multiple clients.</li></ul><p class="row-detail-meta">Skills: Legacy Modernization, Technical Presales, Global Delivery, Practice Development, Capability Development.</p>`,
        },
        {
          title: 'SBU Head, Innovative Technology Services',
          sub: 'Zensar Technologies',
          meta: raw('Dec 2000&ndash;May 2006'),
          logo: 'zensar',
          detail: html`<p class="row-detail-meta">Full-time &middot; Dec 2000&ndash;May 2006 &middot; 5 yrs 6 mos &middot; Pune &middot; Team size: 1,200</p><p>Spearheaded R&amp;D to architect, build and monetize the Solution BluePrint (SBP) software engineering process automation framework. Established business and technology value propositions for PRIME (Porting, Re-engineering, Integration, Migration and Extension) practice. Set up and streamlined ODC operations for key customers; managed large accounts with P&amp;L responsibility, pipeline management and account growth plans. Expanded SBU revenues and pioneered automation-led modernization.</p><ul><li>Scaled cross-sector innovative technology-focused SBU revenue from &#36;50M to &#36;180M, securing 12+ global logos across North America, Europe and APAC.</li><li>Conceptualized and built Solution Blueprint (SBP) automation framework, delivering 35% productivity gains and 30% faster time-to-market, generated &#36;250M+ revenue pipeline in 2 years.</li><li>Delivered global ERP &amp; core banking rollouts, reducing operating costs by 25&ndash;38%.</li><li>Forged global partnerships with OEMs and consulting firms, enhancing Zensar&rsquo;s modernization positioning.</li></ul><p class="row-detail-meta">Skills: Migration and Modernization, Product Development, Global Delivery, Enterprise Architecture, Presales, Profit &amp; Loss Management.</p>`,
        },
        {
          title: raw('Project Manager &mdash; Financial Services'),
          sub: 'Tata Consultancy Services',
          meta: raw('Mar 1996&ndash;Dec 2000'),
          logo: 'tcs',
          detail: html`<p class="row-detail-meta">Full-time &middot; Mar 1996&ndash;Dec 2000 &middot; 4 yrs 10 mos &middot; Mumbai &middot; Team size: 80</p><p>Laid the foundation for offshore delivery excellence and large scale BFSI programs.</p><ul><li>Led solution architecture and delivery management for custom development, migration and data warehousing engagements.</li><li>Established an 80-member offshore delivery center, reducing operating costs by 42% and defect rates by 87%.</li><li>Delivered 25+ turnkey BFSI transformations, migrating mission-critical apps with zero business disruption.</li><li>Improved delivery efficiency by 30% via reusable development frameworks and standardized governance.</li><li>Recognized with the CEO Choice Award for driving business growth and innovation.</li></ul><p class="row-detail-meta">Skills: Solution Architecture, Data Warehousing, Analytics, Global Delivery, Project Management.</p>`,
        },
      ],
    }),
});
