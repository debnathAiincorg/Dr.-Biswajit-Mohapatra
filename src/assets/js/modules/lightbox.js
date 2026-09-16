/*
 * Proof-image lightbox.
 *
 * A row's proof photograph or a gallery figure links straight to its own
 * full-size JPEG in the markup -- that is the entire feature with JavaScript
 * off, and it stays correct. With JS on, this module intercepts the click and
 * opens the same image inside a native <dialog> instead of navigating away.
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
  const triggers = document.querySelectorAll('a.proof-zoom');
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
  const caption = document.createElement('p');
  caption.className = 'proof-lightbox-caption';
  dialog.append(closeButton, img, caption);
  document.body.append(dialog);

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
      img.src = trigger.href;
      img.alt = trigger.dataset.alt ?? '';
      caption.textContent = trigger.dataset.caption ?? '';
      caption.hidden = !trigger.dataset.caption;
      dialog.showModal();
    });
  });
}
