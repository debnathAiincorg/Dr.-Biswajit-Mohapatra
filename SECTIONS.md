# SECTIONS.md

**v3 update: this file's content mapping is unchanged.** The only thing that changed is
*delivery* — each row below used to be an in-page anchor section on one `index.html`; each is
now its own standalone page (see the "File" column added below and `PLAN.md` for the full
file list). The content plan, component reuse, and persona facts are identical to v2.

Page order (now file-by-file rather than scroll order) still matches nav order — same
reasoning as before, just applied to a site map instead of a scroll sequence.

Fictional persona facts used throughout (all invented, none real):

- **Name:** Dr. Meera Kapoor
- **Role:** Professor of Cognitive & Communication Sciences; Director, **Speech Lab**
- **University:** Ashfield University (fictional)
- **Research area:** spoken language processing, human–AI communication, cognitive linguistics
  (generic/invented field description)
- **Book (carried over from v1):** *The Long Table*, a memoir — now a supporting thread, not
  the page's main focus

| # | Nav label | File | Section content plan |
|---|---|---|---|
| 1 | About | `index.html` (`#about`) | Hero-equivalent, on the homepage. Portrait image, eyebrow ("Professor · Speech Lab"), headline, short bio paragraph (research focus + university + one-line nod to the memoir), two CTAs — **"View CV (PDF)"** and **"Prospective PhD Students"** (→ `phd-opportunities.html`) — keeping the reference's "two-CTA + secondary link row" hero mechanic, with a small "Affiliated with" link row. Plus the new "From the Lab" teaser section (see below). |
| 2 | PhD Opportunities | `phd-opportunities.html` | Callout panel (same visual family as the News panel). Short blurb on openings, a bullet list of 3 fictional research areas seeking students, a "Get in Touch" button → `contact.html`. |
| 3 | News | `news.html` | Panel: heading "Lab Notes", 4 fictional dated news items (list-row style), plus a **"Subscribe to Lab Updates"** button — keeps the newsletter-subscribe mechanic the original brief asked to retain. |
| 4 | Awards | `awards.html` | List of 4 fictional awards/honors: title, granting body (fictional), year. List-row component. |
| 5 | Education | `education.html` | Simple vertical list: degree, fictional institution, year (3 entries, reverse-chronological). |
| 6 | Experience | `experience.html` | Simple vertical list: title, fictional organization, year range (4 entries). |
| 7 | Publications | `publications.html` | List of 6 fictional paper titles with fictional venue + year; the memoir gets one line here too, tagged "Trade nonfiction" so it doesn't read as a research paper. |
| 8 | Projects | `projects.html` | Card grid (3 cards): fictional research project name, one-line description, a status tag ("Active" / "Completed"). |
| 9 | Students | `students.html` | Card grid (4 cards): placeholder headshot (placehold.co), name, role ("PhD Candidate" / "MS Student"), one-line research focus. |
| 10 | Alumni | `alumni.html` (section keeps `id="speech-lab-alumni"` internally) | List (no photos): name, "now at" (fictional placement), graduation year. 5 entries. |
| 11 | Gallery | `gallery.html` | 3-col/1-col responsive grid, 9 placeholder photo cards, upright serif caption + date — academic/lab event captions. |
| 12 | Courses | `courses.html` | List of 4 fictional courses: course code + title, term offered. |
| 13 | Activities | `activities.html` | List of 4 fictional service/outreach activities. |
| 14 | Contact | `contact.html` | Placeholder email, placeholder office location/address, a short "get in touch" line. |

## Visual system for the new sections (kept small on purpose)

To avoid 14 visually distinct section designs, everything reuses **three** existing component
families from v1, restyled slightly per the fidelity pass:

1. **List-row component** (v1's `.editions` styling) → News, Awards, Education, Experience,
   Publications, Alumni, Courses, Activities.
2. **Card grid component** (v1's `.gallery-card` styling) → Projects, Students, Gallery.
3. **Callout panel component** (v1's `.newsletter` panel styling) → PhD Opportunities, News.

Alternating background bands (`--paper` / `--paper-dim`) between consecutive sections provide
rhythm across the site without adding heavy borders everywhere — loosely inspired by the
reference's own alternating section-theme rhythm, translated to our light palette per the
Fidelity Decisions in `CLAUDE.md` (light/light alternation, not light/dark). On standalone
pages this now shows up as: odd-numbered pages in nav order plain `--paper`, even-numbered
`--paper-dim`, same assignment each page already had within the old single-page layout.

## Homepage "From the Lab" teaser (new in v3)

`index.html` gets one addition beyond the unchanged About/hero: a `content-section` titled
"From the Lab" (eyebrow "Explore") holding a 3-card row, reusing the existing card-grid +
project-card visual pattern (bordered box, heading, one line of copy) plus a small new
`.card-link` text-link style ("→" affordance) at the bottom of each card. Three cards, not all
13 destinations, because the nav already covers full navigation — this picks the three most
likely first stops for a new visitor:

1. **Latest News** — "New paper accepted at the International Symposium on Speech Processing,
   and the lab welcomes two new PhD students." → "Read Lab Notes →" → `news.html`
2. **PhD Opportunities** — "The Speech Lab is currently seeking doctoral students in spoken
   dialogue systems, cross-linguistic perception, and human–AI communication." → "View
   Opportunities →" → `phd-opportunities.html`
3. **Gallery** — "A look at recent talks, lab milestones, and events." → "View Gallery →" →
   `gallery.html`
