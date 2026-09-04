import { cardGrid, photoCard } from './_includes/components/card-grid.ts';
import { rowList } from './_includes/components/row-list.ts';
import { asRows } from './_includes/content/lab-notes.ts';
import { homepagePhotoSlugs, photosBySlug } from './_includes/content/photos.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Dr. Biswajit Mohapatra — VP & Head of Product and Solutions Engineering',
    description:
      'Dr. Biswajit Mohapatra is VP & Head of Product and Solutions Engineering at Intuitive.ai, a cloud, data and AI strategist who previously led CIO advisory and cloud transformation at AWS and IBM.',
    navLabel: 'About',
    schemaType: 'ProfilePage',
    permalink: '/index.html',
    bodyClass: 'page-home',
    pageCss: 'home',
    ogType: 'profile',
    preloadImage: '/assets/images/photos/profile-photo.webp',
  },

  render: (_data, { url }) => {
    /* The homepage teases three of the eight gallery photographs; they are the
       same records the gallery renders, not a second copy of the captions. */
    const teaserCards = photosBySlug(homepagePhotoSlugs).map((photo) => photoCard(photo, url));

    return html`  <!-- Hero: full-bleed photo with overlaid nav and copy -->
  <section class="hero-full" id="about" aria-labelledby="hero-title">
    <picture class="hero-bg"><source type="image/webp" srcset="${url('/assets/images/photos/profile-photo.webp')}"><img src="${url('/assets/images/photos/profile-photo.jpg')}" alt="Dr. Biswajit Mohapatra speaking on stage at a conference, gesturing with both hands against a dark blue backdrop." width="1673" height="793" fetchpriority="high" decoding="async"></picture>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="container hero-full-inner">
      <div class="hero-full-content">
        <span class="eyebrow">VP &amp; Head of Product and Solutions Engineering &middot; Intuitive.ai</span>
        <h1 id="hero-title">Where <em>cloud, data and AI</em> meet business outcomes.</h1>
        <p class="lede">Dr. Biswajit Mohapatra leads Intuitive.ai&rsquo;s cloud, data, AI and security practice. An alumnus of IIT Bombay with more than three decades in enterprise technology, he previously led CIO advisory and cloud transformation for AWS across India and South Asia, and spent 15 years at IBM as Executive Director of its Hybrid Cloud Transformation practice. He holds patents in cloud automation and is the author of <em>The DevOps Odyssey</em>.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="${url('/experience/')}">View Experience</a>
          <a class="btn btn-outline" href="${url('/contact/')}">Get in Touch</a>
        </div>
      </div>
    </div>
  </section>

  <!-- News teaser: same structure as /news/ so the two read as one design.
       The tinted band comes from the .page-home #news rule in pages/home.css,
       which is scoped by id rather than to .panel, so the homepage keeps its
       cream band without the panel wrapper's 640px column. -->
  <section class="content-section" id="news" aria-labelledby="news-title">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Latest</span>
        <h2 class="reveal" id="news-title">News</h2>
        <p class="reveal">Recent updates on roles, publications, awards, and speaking engagements.</p>
      </div>
      ${rowList(asRows(), '      ', 'row-list with-cta')}
      <a class="btn btn-primary reveal" href="${url('/news/')}">All news</a>
    </div>
  </section>

  <!-- Gallery teaser: three photographs, full set on gallery.html -->
  <section class="content-section" id="gallery" aria-labelledby="gallery-title">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Moments</span>
        <h2 class="reveal" id="gallery-title">Highlights</h2>
      </div>

      ${cardGrid(teaserCards, '      ')}

      <div class="section-cta reveal">
        <a class="btn btn-outline" href="${url('/gallery/')}">View the full gallery</a>
      </div>
    </div>
  </section>
`;
  },
});
