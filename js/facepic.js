/* One face out of a 2x2 sheet.

   `images/faces/face-1.webp` to `face-8.webp`, four people each, in reading
   order. A face is addressed by `sheet` and `pos` in data/faces.js.

   Same idea as sprite.js, different grid — that one does 3x3 vocabulary
   sheets and hardcodes the arithmetic. Kept separate rather than
   generalised: a shared "grid cropper" would have to be told the grid by
   both callers, and then a wrong number silently shows the wrong face,
   which in this game means a wrong answer she cannot argue with.

   ------------------------------------------------------------------
   HOW THE CROP WORKS

   A div sized to the cell, with the sheet as a background scaled to 200% in
   both directions and offset to the right quadrant. No canvas, no image
   slicing, and the browser decodes each sheet once however many faces are
   on screen.

     pos 1  top-left       0%   0%
     pos 2  top-right    100%   0%
     pos 3  bottom-left    0% 100%
     pos 4  bottom-right 100% 100%

   ------------------------------------------------------------------
   A MISSING SHEET MUST NOT BREAK THE GAME

   Steven paints these over days, and half a board is a normal state while
   that happens. A background image that 404s leaves an empty box with no
   explanation, and in a deduction game an unreadable face is indistinguishable
   from a face that has been eliminated.

   So each sheet is probed once with an Image(), and until it loads the cell
   shows the person's name instead. That is playable — she can still deduce
   from the name and the answers — and it is obviously a placeholder rather
   than a bug. */

window.GH = window.GH || {};

GH.facePic = (function(){

  var DIR = 'images/faces/';
  var COLS = 2;

  /* sheet number -> 'loading' | 'ok' | 'missing' */
  var sheets = {};
  var waiting = {};

  /* The set arrived as .png and the app does not care, so nothing is
     converted and nothing is lost to a conversion. The extension is tried
     rather than assumed, because a later batch may well be .webp and a
     hardcoded extension would 404 silently — which in this game looks
     identical to a face that has been ruled out. */
  var EXTS = ['png', 'webp', 'jpg'];

  function url(sheet, which){
    var p = DIR + 'face-' + sheet + '.' + EXTS[which || 0];
    return GH.build ? GH.build.url(p) : p;
  }

  /* Ask about a sheet once, and tell anyone who is waiting when the answer
     arrives. Called on first use rather than up front: a board of 12 needs
     three sheets, not eight. */
  function probe(sheet, then){
    if (sheets[sheet] === 'ok' || sheets[sheet] === 'missing'){
      then(sheets[sheet]);
      return;
    }
    (waiting[sheet] = waiting[sheet] || []).push(then);
    if (sheets[sheet] === 'loading') return;
    sheets[sheet] = 'loading';
    var tryAt = 0;
    var img = new Image();
    img.onload = function(){
      found[sheet] = url(sheet, tryAt);
      settle(sheet, 'ok');
    };
    img.onerror = function(){
      tryAt++;
      if (tryAt < EXTS.length){ img.src = url(sheet, tryAt); return; }
      settle(sheet, 'missing');
    };
    img.src = url(sheet, 0);
  }

  /* sheet -> the url that actually loaded */
  var found = {};

  function settle(sheet, how){
    sheets[sheet] = how;
    var list = waiting[sheet] || [];
    waiting[sheet] = [];
    list.forEach(function(fn){ fn(how); });
  }

  /* A cell. `f` is a row from GH_FACES. */
  function tile(f, cls){
    var box = document.createElement('div');
    box.className = 'fp' + (cls ? ' ' + cls : '');
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', f.name);

    /* The name, shown until the sheet is known to be there and left in
       place if it is not. */
    var fallback = document.createElement('span');
    fallback.className = 'fp-name';
    fallback.textContent = f.name;
    box.appendChild(fallback);

    probe(f.sheet, function(how){
      if (how !== 'ok') return;
      var col = (f.pos - 1) % COLS;
      var row = Math.floor((f.pos - 1) / COLS);
      box.style.backgroundImage = 'url("' + (found[f.sheet] || url(f.sheet)) + '")';
      box.style.backgroundSize = (COLS * 100) + '% ' + (COLS * 100) + '%';
      box.style.backgroundPosition = (col * 100) + '% ' + (row * 100) + '%';
      box.className += ' has-art';
    });

    return box;
  }

  /* For the enlarged view: the whole sheet is the wrong thing to show, so
     the lightbox gets a cropped cell too, just bigger. Returns the url and
     the offsets rather than an element, so the caller can size it. */
  function crop(f){
    return {
      url: found[f.sheet] || url(f.sheet),
      col: (f.pos - 1) % COLS,
      row: Math.floor((f.pos - 1) / COLS),
      cols: COLS
    };
  }

  /* Which sheets are missing, for the audit and for a warning on screen. */
  function missing(faces){
    var out = {};
    (faces || []).forEach(function(f){
      if (sheets[f.sheet] === 'missing') out[f.sheet] = true;
    });
    return Object.keys(out).map(Number);
  }

  return { tile:tile, crop:crop, url:url, missing:missing };
})();
