/* Lightbox — tap a picture, see it big.

   Adapted from the pink math site's shared lightbox, with one structural
   difference: nothing here is an <img>. Every picture in this app is a
   crop of a 3x3 sheet, positioned by CSS, so the enlarged view rebuilds
   the same crop at size rather than swapping a src.

   One overlay for the whole app, created on first use and reused after.
   Escape, the close button, the backdrop, or any arrow key closes it.
   Focus goes to the close button on open and returns to whatever was
   focused before on close, so keyboard and VoiceOver users do not get
   dropped at the top of the page. */

window.GH = window.GH || {};

GH.lightbox = (function(){

  var lastFocused = null;
  var built = false;

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function build(){
    if (built) return;
    built = true;

    var overlay = el('div', 'lb-overlay');
    overlay.id = 'gh-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var close = el('button', 'lb-close', '✕');
    close.type = 'button';
    close.id = 'gh-lightbox-close';
    close.setAttribute('aria-label', 'Close');
    overlay.appendChild(close);

    var fig = el('div', 'lb-figure');
    fig.appendChild(el('div', 'lb-pic'));
    var cap = el('div', 'lb-caption');
    cap.appendChild(el('div', 'lb-de'));
    cap.appendChild(el('div', 'lb-gloss'));
    cap.appendChild(el('div', 'lb-num'));
    fig.appendChild(cap);
    overlay.appendChild(fig);

    document.body.appendChild(overlay);

    /* Backdrop closes, the figure itself does not — clicking the picture
       you just opened should not dismiss it. */
    overlay.addEventListener('click', function(e){
      if (e.target === overlay || e.target === close) close_();
    });
  }

  function isOpen(){
    var o = document.getElementById('gh-lightbox');
    return !!(o && o.className.indexOf('open') >= 0);
  }

  /* n is the image number; word is the vocabulary entry, when there is one */
  /* Everything both entry points share: reveal the overlay, move focus,
     lock the page behind it. Split out because the two differ only in
     where the picture comes from. */
  function show(overlay){
    /* honour the OS setting rather than animating regardless */
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    overlay.className = 'lb-overlay open' + (still ? '' : ' fade');

    document.getElementById('gh-lightbox-close').focus();
    document.body.style.overflow = 'hidden';
  }

  function open(n, word){
    build();
    lastFocused = document.activeElement;

    var overlay = document.getElementById('gh-lightbox');
    var pic = overlay.querySelector('.lb-pic');

    /* same crop as the thumbnail, just bigger */
    var s = GH.sprite.locate(n);
    pic.style.backgroundImage = 'url("' + s.url + '")';
    pic.style.backgroundSize = s.sizeX + '% ' + s.sizeY + '%';
    pic.style.backgroundPosition = s.x + '% ' + s.y + '%';
    pic.style.aspectRatio = s.aspect;

    var lang = GH.i18n.lang();
    overlay.querySelector('.lb-de').textContent = word ? word.de : '';
    overlay.querySelector('.lb-gloss').textContent =
      word ? ((lang === 'ru' && word.ru) ? word.ru : (word.en || '')) : '';
    overlay.querySelector('.lb-num').textContent = '#' + n;
    overlay.setAttribute('aria-label', word ? word.de : ('#' + n));

    show(overlay);

    if (word && GH.speech && GH.speech.supported) GH.speech.say(word.de);
  }

  /* A whole picture rather than a crop of a sheet.

     Every image in the vocabulary is one ninth of a 3x3 jpg, which is why
     open() above reaches for GH.sprite. The pets are not: they are
     individual webp files with their own names and their own transparency,
     so there is no sheet to locate and no crop to reproduce. Same overlay,
     same keys, same focus handling — only the source differs.

     `contain` rather than `cover`, because a pet cropped to fill the frame
     loses its ears. The aspect ratio is left alone for the same reason:
     the drawings are not all the same shape and forcing one on them would
     stretch somebody. */
  function openPic(url, caption){
    if (!url) return;
    build();
    lastFocused = document.activeElement;

    var overlay = document.getElementById('gh-lightbox');
    var pic = overlay.querySelector('.lb-pic');

    pic.style.backgroundImage = 'url("' + url + '")';
    pic.style.backgroundSize = 'contain';
    pic.style.backgroundPosition = 'center';
    pic.style.backgroundRepeat = 'no-repeat';
    pic.style.aspectRatio = '1 / 1';

    caption = caption || {};
    overlay.querySelector('.lb-de').textContent = caption.de || '';
    overlay.querySelector('.lb-gloss').textContent = caption.gloss || '';
    overlay.querySelector('.lb-num').textContent = caption.note || '';
    overlay.setAttribute('aria-label', caption.de || '');

    show(overlay);

    if (caption.say && GH.speech && GH.speech.supported) GH.speech.say(caption.say);
  }

  function close_(){
    var overlay = document.getElementById('gh-lightbox');
    if (!overlay) return;
    overlay.className = 'lb-overlay';
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* This handler and nav.js's both sit on `document`, and lightbox.js is
     loaded first, so this one runs first. nav.js correctly refuses Escape
     while an overlay is open — but by the time it looks, close_() has
     already cleared the class, so it saw no overlay and left the page.
     Escape closed the picture AND the screen behind it.

     stopImmediatePropagation is the fix, and it is the only one that
     works here: preventDefault does not stop other listeners, and
     stopPropagation only stops them on OTHER nodes. Both of these are on
     document, so nothing short of Immediate reaches nav.js.

     Registered with capture:true as well, so it runs before nav.js
     whatever order the files are loaded in — a load-order dependency that
     is invisible in the source is a bug waiting for the next reshuffle of
     index.html. */
  document.addEventListener('keydown', function(e){
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (!isOpen()) return;
    if (e.key === 'Escape' || e.key === 'Esc' || e.key === ' ' ||
        e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' || e.key === 'ArrowDown'){
      e.preventDefault();
      e.stopImmediatePropagation();
      close_();
    }
  }, true);

  return { open:open, openPic:openPic, close:close_, isOpen:isOpen };
})();
