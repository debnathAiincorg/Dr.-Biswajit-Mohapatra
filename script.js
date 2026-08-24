(function () {
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burgerBtn');
  var panel = document.getElementById('mobilePanel');
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

  // Mark the current page's nav link, in both the inline nav and the mobile panel.
  var currentFile = location.pathname.split('/').pop() || 'about.html';
  document.querySelectorAll('.nav-links a, .mobile-panel a').forEach(function (link) {
    var linkFile = link.getAttribute('href').split('#')[0] || 'about.html';
    if (linkFile === currentFile) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Scroll reveal. Elements start hidden via CSS (.reveal / .card) and are
  // revealed as they enter the viewport.
  var MAX_STAGGER_STEPS = 8;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.card, .reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
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
  }
})();
