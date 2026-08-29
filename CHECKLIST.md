# CHECKLIST.md — Post-Build Verification (5 passes)

Run after `index.html` is rebuilt, each pass checking something different against the live
reference site. Filled in with actual results after the build; this is the rubric, agreed
before building starts.

## Pass 1 — Layout structure
- [ ] Section order top-to-bottom matches the intended pattern (nav → About/hero → PhD
      Opportunities → News → Awards → Education → Experience → Publications → Projects →
      Students → Alumni → Gallery → Courses → Activities → Contact → Footer).
- [ ] Nav has exactly 14 items, exact labels, exact anchor ids, in the specified order.
- [ ] Every nav link's `href` resolves to an existing `id` in the document (no dead anchors).
- [ ] Hero/About retains: image, headline, description, 2 CTAs, secondary link row (reference's
      hero mechanic).
- [ ] News section retains: icon, heading, 4-item list, subscribe button (reference's
      newsletter mechanic).
- [ ] Gallery retains: heading, grid of cards, image + caption + date per card.
- [ ] Footer retains: social icons, copyright, credit line.

## Pass 2 — Spacing/sizing (desktop, 1440px)
- [ ] Container max-width compared: ours vs. reference's measured 1300px.
- [ ] Section vertical padding compared against reference's visible ~96–140px inter-section
      rhythm (approximate on the reference side, see CLAUDE.md).
- [ ] Gallery grid gap compared against reference's measured 13px (ours is intentionally wider
      per the fixed-grid decision — check it's a deliberate, not accidental, difference).
- [ ] Button padding compared against reference's measured `17.6px 29.4px`.
- [ ] Nav item gap compared against the 1250px-breakpoint value (~0.5rem, after two tightening passes).

## Pass 3 — Typography
- [ ] Nav link font-size/weight/case compared against reference's measured 16px/300/normal-case
      (ours: Inter, adapted per Fidelity Decisions — check it reads as a deliberate adaptation,
      not a miss).
- [ ] H1 line-height ratio compared against reference's measured ~0.97 (ours target: ~1.05).
- [ ] Body paragraph line-height ratio compared against reference's measured 1.6 (ours should
      match at 1.6).
- [ ] Gallery caption style compared: reference is upright/normal, confirm ours is upright too
      (post re-audit correction — was italic in v1).
- [ ] Button letter-spacing/case compared against reference's measured 0.285px/uppercase.

## Pass 4 — Responsive behavior (390px mobile, 768px tablet)
- [ ] Nav collapse behavior at the 1249/1250px threshold checked directly (not just at 390/768) —
      confirm hamburger shows at 1249px and below, full row shows at 1250px and above, no
      wrap/clip at the threshold. (Measured crossover: burger at 1024px, full nav at 1280px.)
- [ ] Mobile nav panel scroll behavior checked with all 14 items open on a 390×844 viewport.
- [ ] Gallery/card grids collapse 3→2→1 at the existing 1024px/768px breakpoints, compared
      against reference's own measured masonry column collapse (5→2, different mechanism, per
      Fidelity Decisions — confirm the difference is the known/accepted one, not a new bug).
- [ ] Hero/About image+text stacking at mobile compared against reference's stacking behavior.

## Pass 5 — Interaction states
- [ ] Button hover/focus states checked (color/transform change, focus-visible outline).
- [ ] Nav link hover/focus states checked.
- [ ] Sticky header behavior checked on scroll (ours: sticky + shadow-on-scroll; reference:
      absolute/non-sticky — confirm this is the known, deliberate Fidelity Decision, not
      something that silently drifted).
- [ ] Gallery/card hover states checked (image scale, caption rule animation).
- [ ] Console error check (0 expected) at both desktop and mobile viewports.

## Reporting format for each pass
For each of the 5 passes: what matched, what didn't, what (if anything) was changed as a
result, and anything that structurally can't be matched with a plain explanation why — not a
silent approximation.
