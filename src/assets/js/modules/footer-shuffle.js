/*
 * Footer social-badge shuffle.
 *
 * Three seconds after the footer badges scroll into view, the four social
 * badges slide sideways through a fixed sequence of arrangements and settle
 * back where they started:
 *
 *     1 2 3 4   ->   2 1 4 3   ->   3 4 1 2   ->   1 2 3 4
 *
 * Fixed, not random: the three steps below are literal slot assignments, so
 * the same choreography plays every time. Purely decorative -- nothing here
 * changes layout, so a failure or an unsupported browser just leaves four
 * static badges.
 *
 * Animates the `translate` property, not `transform`, for two reasons:
 *
 *   - `.social-badge:hover` already sets `transform: translateY(...)` (see
 *     components/header.css). `translate` is an independent property applied
 *     before `transform`, so the two compose instead of overwriting each
 *     other -- a badge hovered mid-shuffle still lifts, and the shuffle is
 *     not disturbed by the pointer crossing a badge.
 *   - the animation runs with the default `fill: 'none'`, so once it
 *     finishes there is no residual inline style at all. The badges are left
 *     in their original positions because nothing is overriding them, rather
 *     than because something reset a value. The DOM order never changes.
 *
 * Offsets are measured at trigger time rather than at load, so a resize --
 * or the 640px column-reverse footer layout -- is read correctly instead of
 * replaying stale geometry. Because every position is derived from the
 * badges' own measured rects, the choreography holds at any badge size or
 * gap without a hardcoded step value.
 */

/*
 * Which slot each badge occupies at each stage, indexed by the badge's
 * position in the DOM. Read `[1, 0, 3, 2]` as "badge 1 moves to slot 1,
 * badge 2 to slot 0, badge 3 to slot 3, badge 4 to slot 2" -- which is the
 * arrangement 2 1 4 3 reading left to right.
 */
const STAGES = [
  [1, 0, 3, 2], // 2 1 4 3 -- adjacent pairs trade places
  [2, 3, 0, 1], // 3 4 1 2 -- the halves trade places
  [0, 1, 2, 3], // 1 2 3 4 -- home
];

/* Requested delay between the badges arriving on screen and the sequence
   starting. It also keeps the shuffle clear of the footer's own reveal
   transition, which runs for well under a second after .is-visible lands. */
const DELAY_MS = 3000;

/* Long enough that each arrangement registers, short enough that the whole
   sequence stays brisk: 440 + 200 + 440 + 200 + 480 = 1760ms. The holds are
   what make the intermediate states legible rather than a blur. */
const MOVE_MS = 440;
const HOLD_MS = 200;
const RETURN_MS = 480;

/* easeInOutCubic. Applied per segment rather than across the whole timeline,
   so each slide accelerates and settles on its own and the holds stay flat. */
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const LINEAR = 'linear';

export function initFooterShuffle() {
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const socials = footer.querySelector('.footer-socials');
  if (!socials) return;

  /* Matches the sitewide reduced-motion stance in base/tokens.css, which
     strips the badges' hover travel for the same reason. */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* The two APIs this module needs; without either, the badges stay put. */
  if (typeof Element.prototype.animate !== 'function') return;
  if (!('IntersectionObserver' in window)) return;

  const total = MOVE_MS + HOLD_MS + MOVE_MS + HOLD_MS + RETURN_MS;

  /* Timeline in milliseconds, converted to keyframe offsets below. Each
     stage is reached, held, then left for the next one. */
  const marks = [
    { at: 0, stage: null, easing: EASE },
    { at: MOVE_MS, stage: 0, easing: LINEAR },
    { at: MOVE_MS + HOLD_MS, stage: 0, easing: EASE },
    { at: MOVE_MS + HOLD_MS + MOVE_MS, stage: 1, easing: LINEAR },
    { at: MOVE_MS + HOLD_MS + MOVE_MS + HOLD_MS, stage: 1, easing: EASE },
    { at: total, stage: 2, easing: LINEAR },
  ];

  let timer = null;
  let running = false;
  /* Latched for as long as the badges stay on screen, so the sequence plays
     once per arrival rather than repeating while the footer sits in view.
     Cleared when they leave, which is what re-arms it for a later return. */
  let playedThisVisit = false;

  function play() {
    const badges = Array.from(socials.querySelectorAll('.social-badge'));
    /* The sequence above is written for exactly four badges. */
    if (badges.length !== STAGES[0].length) return;

    /* Read every position before writing any animation, so the measurements
       describe one consistent layout. With nothing animating, each badge's
       own left edge is its slot's left edge. */
    const slots = badges.map((badge) => badge.getBoundingClientRect().left);

    running = true;

    const animations = badges.map((badge, index) => {
      const keyframes = marks.map((mark) => {
        /* stage null is the resting arrangement: no displacement at all. */
        const slot = mark.stage === null ? index : STAGES[mark.stage][index];
        const dx = slots[slot] - slots[index];
        return {
          translate: `${dx}px 0px`,
          offset: mark.at / total,
          easing: mark.easing,
        };
      });

      return badge.animate(keyframes, { duration: total, easing: LINEAR });
    });

    Promise.all(animations.map((animation) => animation.finished))
      .catch(() => {
        /* An animation cancelled by navigation or a page-visibility change
           rejects here; nothing to clean up, since fill is 'none'. */
      })
      .finally(() => {
        running = false;
      });
  }

  /*
   * Observing .footer-socials rather than the footer itself, and at a real
   * threshold rather than 0.
   *
   * reveal.js documents why a threshold on the footer element is fragile: the
   * footer is the last thing on the page, so its lower edge is always partly
   * outside the viewport, and clearing even a 0.12 threshold depends on the
   * footer being tall enough -- currently ~83px against a 68.2px requirement,
   * about 15px of headroom. One padding change could strand it. The badges
   * are a small element that sits fully in view once the page bottom is
   * reached, so 0.5 is comfortably reachable there and means what it says:
   * the logos being animated are actually on screen.
   */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (playedThisVisit || running || timer !== null || reduced.matches) return;
          timer = window.setTimeout(() => {
            timer = null;
            playedThisVisit = true;
            play();
          }, DELAY_MS);
          return;
        }

        /* Scrolled away. Drop any pending run rather than letting it fire at
           an off-screen footer and count as the one play for this visit, and
           re-arm so returning later starts the wait again. */
        if (timer !== null) {
          window.clearTimeout(timer);
          timer = null;
        }
        playedThisVisit = false;
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(socials);
}
