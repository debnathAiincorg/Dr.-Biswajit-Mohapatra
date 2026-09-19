/*
 * Proof-image and gallery-video lightbox.
 *
 * A row's proof photograph or a gallery figure links straight to its own
 * full-size JPEG in the markup, and the Gallery's video card links straight to
 * its .mp4 -- that is the entire feature with JavaScript off, and it stays
 * correct. With JS on, this module intercepts the click and opens the same
 * file inside a native <dialog> instead of navigating away.
 *
 * Native <dialog>, not a hand-rolled overlay: focus trapping, Esc-to-close,
 * the top layer and return-focus-to-invoker all come from the platform. The
 * one dialog element is created once and reused for every trigger on the
 * page, since only one can ever be open at a time.
 */

/* Drawn with the same stroke vocabulary as the row glyphs in
   components/row-list.ts, so the viewer's one control matches the rest of the
   site rather than being a browser-default character. */
const CLOSE_GLYPH =
  '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">' +
  '<path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
  '</svg>';

export function initLightbox() {
  const triggers = document.querySelectorAll('a.proof-zoom, a.video-zoom');
  if (triggers.length === 0) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'proof-lightbox';
  /* A modal dialog with no accessible name is announced as just "dialog".
     The image's own alt is set per trigger below and describes the content;
     this names the container. */
  dialog.setAttribute('aria-label', 'Image viewer');

  /* Esc closes a native modal dialog, which covers keyboards but not touch.
     Without this, closing on a phone meant guessing that a tap outside the
     photograph would do it. First child, so it takes the dialog's initial
     focus and leads the tab order. */
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'proof-lightbox-close';
  closeButton.setAttribute('aria-label', 'Close image viewer');
  closeButton.innerHTML = CLOSE_GLYPH;
  closeButton.addEventListener('click', () => dialog.close());

  const img = document.createElement('img');
  img.alt = '';

  /* One <video>, reused like the <img>. `preload` stays "none" so opening the
     page costs nothing -- the file is only fetched once someone opens it. */
  const video = document.createElement('video');
  video.controls = true;
  video.preload = 'none';
  video.playsInline = true;
  video.hidden = true;

  const caption = document.createElement('p');
  caption.className = 'proof-lightbox-caption';
  dialog.append(closeButton, img, video, caption);
  document.body.append(dialog);

  /* Closing must stop playback and drop the source. A native <dialog> merely
     hides its contents, so without this the audio carries on over the page
     after the viewer is gone, and the browser keeps buffering a 10MB file. */
  dialog.addEventListener('close', () => {
    video.pause();
    video.removeAttribute('src');
    video.removeAttribute('poster');
    video.load();
  });

  /* Backdrop click closes; a click on the contents does not.
     The target test is what makes that true. Clicks on the image and caption
     bubble up to this same listener, so an unconditional close() here shut the
     viewer whenever anyone clicked the photograph they had just opened --
     which is most clicks. A click landing on ::backdrop reports the dialog
     itself as the target, so comparing against it separates the two cases.
     (Paint order does not: stacking has no bearing on event bubbling.) */
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const isVideo = trigger.classList.contains('video-zoom');

      img.hidden = isVideo;
      video.hidden = !isVideo;

      if (isVideo) {
        /* The poster keeps the dialog from opening on a black rectangle while
           the first bytes are still in flight. */
        if (trigger.dataset.poster) video.poster = trigger.dataset.poster;
        video.src = trigger.href;
        video.setAttribute('aria-label', trigger.dataset.alt ?? '');
      } else {
        img.src = trigger.href;
        img.alt = trigger.dataset.alt ?? '';
      }

      caption.textContent = trigger.dataset.caption ?? '';
      caption.hidden = !trigger.dataset.caption;
      dialog.showModal();

      /* Autoplay only after the modal is up, and only on an explicit click --
         a rejected promise here is normal (a browser may block it) and must
         not surface, since the controls are right there. */
      if (isVideo) video.play().catch(() => {});
    });
  });
}
