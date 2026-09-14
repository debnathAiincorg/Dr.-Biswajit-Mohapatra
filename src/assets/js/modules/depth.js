/*
 * Pointer-driven depth: hero parallax and card tilt.
 *
 * This module writes custom properties and nothing else. It never sets
 * `transform`, never adds inline styles the stylesheet cannot override, and
 * never reads layout inside a pointermove handler. Everything it produces is
 * inert at its default value, so the page with this file absent, blocked, or
 * throwing is the page as it was before the depth system existed -- the same
 * contract reveal-arm.js keeps for the reveal system.
 *
 * Two gates, both checked once at init:
 *
 *   (pointer: fine)  -- a touch device has no hover position to track. Worse,
 *                       a tap fires pointermove once and then pointerleave
 *                       may never arrive, which would strand a card tilted.
 *   reduced motion   -- returns early. components/depth.css independently
 *                       zeroes the same variables, so motion is off in both
 *                       layers and neither can silently re-enable it alone.
 *
 * Neither is watched for changes afterwards. A pointer type does not change
 * mid-session on any device this site will see, and a mid-session change to
 * the motion preference is picked up on the next navigation -- this is a
 * multi-page site, so that is at most one page away.
 */

/* Pointer moves arrive far faster than frames. Every handler below only
   records its input; the write happens once per frame from this scheduler, so
   a burst of twenty moves between two frames costs twenty assignments rather
   than twenty style recalculations. */
function rafBatched(fn) {
  let queued = false;
  let latest = null;
  return (arg) => {
    latest = arg;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fn(latest);
    });
  };
}

/*
 * Hero: three layers separating under the cursor.
 *
 * The hero's box is measured on pointerenter rather than per move -- reading
 * getBoundingClientRect() inside a pointermove handler forces a synchronous
 * layout on every event, which is the classic way an effect like this turns a
 * smooth page into a janky one. The hero does not resize while the pointer is
 * inside it, so once per entry is enough; resize and scroll invalidate it.
 */
function initHeroParallax() {
  const hero = document.querySelector('.hero-full');
  if (!hero) return;

  let box = null;
  const measure = () => { box = hero.getBoundingClientRect(); };

  const write = rafBatched((point) => {
    if (!point || !box) return;
    /* -1..1 from the centre of the hero, clamped so a pointer that leaves
       through a corner cannot push a layer past its stated maximum. */
    const px = Math.max(-1, Math.min(1, (point.x - box.left) / box.width * 2 - 1));
    const py = Math.max(-1, Math.min(1, (point.y - box.top) / box.height * 2 - 1));
    hero.style.setProperty('--px', px.toFixed(3));
    hero.style.setProperty('--py', py.toFixed(3));
  });

  hero.addEventListener('pointerenter', (e) => {
    if (e.pointerType !== 'mouse') return;
    measure();
    hero.classList.add('is-tracking');
    write({ x: e.clientX, y: e.clientY });
  });

  hero.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    write({ x: e.clientX, y: e.clientY });
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    hero.classList.remove('is-tracking');
    /* Removed, not set to 0: the properties fall back to the stylesheet's own
       defaults rather than being pinned to an inline value that would then
       override any future change to them. */
    hero.style.removeProperty('--px');
    hero.style.removeProperty('--py');
  });

  /* The rect is stale after either of these; re-measuring on the next entry
     is enough, so they only invalidate. */
  const invalidate = () => { box = null; };
  window.addEventListener('resize', invalidate, { passive: true });
  window.addEventListener('scroll', invalidate, { passive: true });
}

/*
 * Cards: tilt toward the pointer, plus the sheen's origin.
 *
 * Listeners are delegated to each .card-grid rather than attached per card.
 * The gallery renders 38 cards; per-card listeners would mean 114 handlers on
 * that page alone, against 3 per grid this way.
 *
 * Delegation for pointerenter/leave uses pointerover/pointerout, which bubble
 * where enter/leave do not -- with a guard on relatedTarget so moving between
 * two elements inside the same card does not read as leaving it.
 */
function initCardTilt() {
  const grids = document.querySelectorAll('.card-grid');
  if (!grids.length) return;

  /* Read per card, on pointerenter only -- never from a pointermove handler,
     where getComputedStyle() would force a synchronous style resolution on
     every event.

     Per card rather than once from :root because the ceiling is not uniform:
     a photograph tolerates more rotation than a paragraph does. components/
     depth.css lowers --tilt-max on .project-card for exactly that reason, and
     reading the value off the element is what lets CSS make that call instead
     of hard-coding the exception here. */
  const tiltMaxFor = (card) =>
    parseFloat(getComputedStyle(card).getPropertyValue('--tilt-max')) || 6;
  let tiltMax = 6;

  /* The one piece of shared state in this module, and it is shared on purpose.
     `active` has to be visible both to every grid's handlers and to the single
     scroll listener at the bottom, and the rAF callback below has to be able
     to ask whether the card it was queued for is still the hovered one. */
  let active = null;
  let box = null;

  const write = rafBatched((state) => {
    if (!state) return;
    const { card, box: cardBox, x, y } = state;

    /* The guard this whole module turned out to need.

       write() is rAF-batched, so it runs a frame after the pointermove that
       queued it -- and `clear()` can run in between, from a pointerout or
       from the scroll listener. Without this check the stale frame then
       writes --tilt-x/--tilt-y straight back onto a card that was just
       released, leaving it permanently tilted with .is-tilting already
       removed: the transition is back to 0.78s, so it does not even ease
       back. Lenis emits scroll events continuously, which made this fire on
       essentially every hover rather than being a rare race. */
    if (card !== active) return;

    const nx = Math.max(-1, Math.min(1, (x - cardBox.left) / cardBox.width * 2 - 1));
    const ny = Math.max(-1, Math.min(1, (y - cardBox.top) / cardBox.height * 2 - 1));

    /* rotateX is negated against the vertical axis: a pointer near the top of
       a card should tip its top edge away from the reader, and positive
       rotateX tips it toward them. rotateY takes the horizontal offset
       directly, which already leans the near edge toward the pointer. */
    card.style.setProperty('--tilt-x', `${(-ny * tiltMax).toFixed(2)}deg`);
    card.style.setProperty('--tilt-y', `${(nx * tiltMax).toFixed(2)}deg`);

    /* The sheen's centre, as a percentage of the card's own box. */
    card.style.setProperty('--mx', `${(((x - cardBox.left) / cardBox.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--my', `${(((y - cardBox.top) / cardBox.height) * 100).toFixed(1)}%`);
  });

  const clear = (card) => {
    card.classList.remove('is-tilting');
    card.style.removeProperty('--tilt-x');
    card.style.removeProperty('--tilt-y');
    card.style.removeProperty('--mx');
    card.style.removeProperty('--my');
  };

  /* Releases whichever card is currently tracked, from anywhere. */
  const release = () => {
    if (!active) return;
    clear(active);
    active = null;
    box = null;
  };

  grids.forEach((grid) => {
    grid.addEventListener('pointerover', (e) => {
      if (e.pointerType !== 'mouse') return;
      const card = e.target.closest?.('.card');
      if (!card || !grid.contains(card) || card === active) return;
      if (active) clear(active);
      active = card;
      box = card.getBoundingClientRect();
      tiltMax = tiltMaxFor(card);
      card.classList.add('is-tilting');
    });

    grid.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !active || !box) return;
      write({ card: active, box, x: e.clientX, y: e.clientY });
    }, { passive: true });

    grid.addEventListener('pointerout', (e) => {
      if (!active) return;
      /* Fires for every move between children inside the card too. Only a
         relatedTarget outside the active card is a real exit. */
      const to = e.relatedTarget;
      if (to && active.contains(to)) return;
      release();
    });
  });

  /* One listener, not one per grid. Registered here rather than inside the
     forEach above, where a page with three card grids would have installed
     three window-level scroll handlers that each did the same work.

     A card can lose the pointer without any pointerout at all -- the page
     scrolls under a stationary cursor and the card simply moves out from
     under it -- which would otherwise leave it tilted with nothing to
     release it. */
  window.addEventListener('scroll', release, { passive: true });
}

export function initDepth() {
  if (!window.matchMedia) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  initHeroParallax();
  initCardTilt();
}
