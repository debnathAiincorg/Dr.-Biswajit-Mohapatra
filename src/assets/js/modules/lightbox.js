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

export function initLightbox() {
  const triggers = document.querySelectorAll('a.proof-zoom');
  if (triggers.length === 0) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'proof-lightbox';
  const img = document.createElement('img');
  img.alt = '';
  const caption = document.createElement('p');
  caption.className = 'proof-lightbox-caption';
  dialog.append(img, caption);
  document.body.append(dialog);

  /* Clicking the backdrop closes the dialog. The image and caption sit above
     it in paint order, so a click that reaches this handler landed outside
     them -- no bounding-box math needed. */
  dialog.addEventListener('click', () => dialog.close());

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
