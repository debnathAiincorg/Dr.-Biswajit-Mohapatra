(function () {
  // Arm the reveal system, before anything else in this file can fail.
  //
  // styles.css leaves .reveal / .card / .footer-rule fully visible by default
  // and hangs their hidden start state off .js-reveal on <html>. Adding the
  // class here -- first statement in the file, outside every guard below --
  // ties the whole animation to this file having actually loaded and begun
  // executing. If script.js 404s, is blocked by a proxy, or throws before this
  // line, nothing arms and the page renders as plain static content. The
  // previous arrangement had it the other way round (hidden by default, shown
  // only once JS ran), so any of those failures left every revealed element,
  // and the footer's text and hairline, invisible permanently.
  document.documentElement.classList.add('js-reveal');

  // Measure the reserved scrollbar gutter and expose it as --scrollbar-w.
  //
  // about.html's full-bleed gallery band breaks out of .container using the
  // standard `width: 100vw; margin: 0 calc(50% - 50vw)` trick. `100vw` is
  // defined as the window's full width INCLUDING whatever gutter the browser
  // reserves for a vertical scrollbar, whereas the .container it's escaping
  // from is laid out against the narrower visible area (clientWidth). On any
  // desktop browser that reserves scrollbar space, that mismatch left the
  // band about 15px wider than the true viewport, split as ~7px overflow on
  // each edge -- invisible today only because body already carries
  // overflow-x: hidden as a separate safety net (styles.css), not because the
  // band was actually sized correctly. --scrollbar-w lets that rule subtract
  // the real gutter width from both its size and its centering math, so nothing
  // needs to be clipped in the first place. try/catch because a layout
  // measurement has nothing to do with the reveal system below, and must not
  // be able to take it down.
  try {
    var scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-w', Math.max(0, scrollbarW) + 'px');
  } catch (e) {}

  // Everything below runs inside a guard that DISARMS on failure. Arming above
  // is what makes a missing script.js fail visible; this is what makes a
  // *throwing* script.js fail visible too. Without it, any error between the
  // arming line and the observer setup would leave .js-reveal set with nothing
  // to ever add .is-visible -- the same blank page, reached a different way.
  try {

    // Header, nav and menu wiring. Null-guarded individually and wrapped as a
    // whole, so a missing element -- or any other throw in here -- cannot stop
    // the reveal setup below from running. Caught here rather than by the outer
    // guard because a broken burger button is no reason to drop the animation
    // for the whole page; the outer guard is the last resort, not the first.
    try {
      var header = document.getElementById('siteHeader');
      if (header) {
        // Hysteresis rather than one threshold. The scrolled header condenses,
        // which shortens the document by the padding it gives up (~12px); on a
        // page with only a little scroll room the browser then clamps scrollY
        // back below a single threshold, the header expands, the room returns --
        // and it flickers indefinitely (observed on education.html). This band is
        // wider than the padding given up, so neither state can undo itself.
        var CONDENSE_AT = 24;
        var EXPAND_AT = 8;
        // classList.add/remove rewrites the class attribute even when the token
        // is already in the desired state, so track it and only touch the DOM on
        // an actual change rather than on every scroll frame.
        var condensed = false;
        var onScroll = function () {
          var y = window.scrollY;
          var next = condensed ? y >= EXPAND_AT : y > CONDENSE_AT;
          if (next !== condensed) {
            condensed = next;
            header.classList.toggle('is-scrolled', condensed);
          }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
      }

      var burger = document.getElementById('burgerBtn');
      var panel = document.getElementById('mobilePanel');
      if (burger && panel) {
        burger.addEventListener('click', function () {
          var isOpen = panel.classList.toggle('is-open');
          burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        panel.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', function () {
            panel.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
          });
        });
      }

      // Mark the current page's nav link, in both the inline nav and the mobile panel.
      var currentFile = location.pathname.split('/').pop() || 'about.html';
      document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href) return;
        var linkFile = href.split('#')[0] || 'about.html';
        if (linkFile === currentFile) {
          link.setAttribute('aria-current', 'page');
        }
      });
    } catch (e) {
      // Non-fatal: the page is fully readable without the header behaviours, and
      // the reveal setup below still runs.
    }

    // Scroll reveal. Elements are visible in CSS until .js-reveal is set above;
    // from there the observer adds .is-visible as they enter the viewport.
    var MAX_STAGGER_STEPS = 8;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var revealTargets = document.querySelectorAll('.card, .reveal');
    // The footer animates its drawn hairline and its own children from
    // .is-visible on the footer element itself rather than carrying .reveal,
    // which would fade and shift the whole footer bar. All 14 pages carry
    // .footer-rule, about.html included.
    var footerRule = document.querySelector('.footer-rule');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
      if (footerRule) { footerRule.classList.add('is-visible'); }
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      // Stagger by position within this batch rather than by index in the
      // page, so a group scrolled to halfway down still cascades from zero
      // instead of inheriting a long delay from the elements above it.
      var arriving = entries.filter(function (entry) { return entry.isIntersecting; });
      arriving.sort(function (a, b) {
        return a.boundingClientRect.top - b.boundingClientRect.top;
      });
      arriving.forEach(function (entry, index) {
        entry.target.style.setProperty('--reveal-i', Math.min(index, MAX_STAGGER_STEPS));
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(function (el) { observer.observe(el); });

    // The footer gets its own observer, with threshold 0 and no bottom cut.
    //
    // Sharing the grid observer made the footer's reveal depend on its own
    // height. It is the last element on the page, so the rootMargin's 60px
    // excluded band always eats its lower edge: to clear a 0.12 threshold it has
    // to be at least 60 / 0.88 = 68.2px tall. The current footer measures 83.5px
    // and reached ratio 0.282 -- correct, but only ~15px of headroom, so a
    // padding change or dropping a line of footer copy could silently strand it
    // at opacity 0 forever. threshold 0 against the default root fires on the
    // footer's first visible pixel, removing the height dependency entirely.
    if (footerRule) {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          entry.target.classList.add('is-visible');
          footerObserver.unobserve(entry.target);
        });
      }, { threshold: 0 });
      footerObserver.observe(footerRule);
    }
  } catch (e) {
    // Reveal setup failed: drop the hidden start state so the page falls back
    // to plain, fully visible content instead of staying blank.
    document.documentElement.classList.remove('js-reveal');
  }
})();
