import { cardGrid, photoCard } from './_includes/components/card-grid.ts';
import { panel } from './_includes/components/panel.ts';
import { rowList } from './_includes/components/row-list.ts';
import { asRows } from './_includes/content/lab-notes.ts';
import { homepagePhotoSlugs, photosBySlug } from './_includes/content/photos.ts';
import { html } from './_includes/lib/html.ts';
import { definePage } from './_includes/lib/page.ts';

export const { data, render } = definePage({
  data: {
    title: 'Dr. Biswajit Mohapatra — Professor & Director, Speech Lab',
    description:
      'Dr. Biswajit Mohapatra is a professor of cognitive and communication sciences and Director of the Speech Lab at Ashfield University, researching spoken language.',
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

    const newsPanel = panel({
      id: 'news',
      ariaLabelledby: 'news-title',
      children: html`        <span class="eyebrow reveal">Lab News</span>
        <h2 class="reveal" id="news-title">Lab Notes</h2>
        <p class="reveal">Occasional updates on publications, talks, and lab milestones.</p>

        ${rowList(asRows(), '        ', 'row-list with-cta')}

        <a class="btn btn-primary reveal" href="${url('/news/')}">All lab notes</a>`,
    });

    return html`  <!-- Hero: full-bleed photo with overlaid nav and copy -->
  <section class="hero-full" id="about" aria-labelledby="hero-title">
    <picture class="hero-bg"><source type="image/webp" srcset="${url('/assets/images/photos/profile-photo.webp')}"><img src="${url('/assets/images/photos/profile-photo.jpg')}" alt="Dr. Biswajit Mohapatra speaking on stage at a conference, gesturing with both hands against a dark blue backdrop." width="1673" height="793" fetchpriority="high" decoding="async"></picture>
    <div class="hero-scrim" aria-hidden="true"></div>
    <div class="container hero-full-inner">
      <div class="hero-full-content">
        <span class="eyebrow">Professor &middot; Director, Speech Lab</span>
        <h1 id="hero-title">The science behind <em>how we speak</em>.</h1>
        <p class="lede">Dr. Biswajit Mohapatra is a professor of cognitive and communication sciences at Ashfield University, where he directs the Speech Lab. His research explores how people produce and understand spoken language, and how that understanding might shape more natural human&ndash;AI communication. He is also the author of a memoir, <em>The Long Table</em>.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="${url('/experience/')}">Academic CV</a>
          <a class="btn btn-outline" href="${url('/phd-opportunities/')}">Prospective PhD Students</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Lab news teaser -->
${newsPanel}
  <!-- Gallery teaser: three photographs, full set on gallery.html -->
  <section class="content-section" id="gallery" aria-labelledby="gallery-title">
    <div class="container">
      <div class="content-head">
        <span class="eyebrow reveal">Moments</span>
        <h2 class="reveal" id="gallery-title">Around the Lab</h2>
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
