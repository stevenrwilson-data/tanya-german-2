/* js/sprite.js */
/* One word out of a 3x3 sheet.

   Same idea as facepic.js, different grid — that one does 2x2 face sheets
   and hardcodes its own arithmetic; this one does 3x3 vocabulary sheets.
   Kept separate rather than generalised into one shared cropper for the
   same reason facepic.js gives: a wrong number silently shows the wrong
   picture, and in a matching game that is a wrong answer she cannot argue
   with. Better two small files that are each obviously correct.

   ------------------------------------------------------------------
   TWO KINDS OF CALLER

   The 278-word bank in vocab.js addresses a picture with a single number,
   `n` — "the image number, so the picture comes free" is the comment
   there, and it is: `n` decomposes into (sheet, cell) by division, sheet
   = ceil(n/9), cell = ((n-1) mod 9) + 1, sheet N living at `images/N.webp`.
   `tile(n, word)` is that caller's door — packs.js's `imgOf()` is what
   hands it the number.

   Newer content (flowers, and everything after it) is generated and named
   in named 3x3 batches instead of one running number — `flowers-01.webp`
   is a sheet, not a word, and which of its 9 cells is which word is data,
   not arithmetic. `cell(sheetName, pos, word)` is that caller's door —
   `data/gallery.js` is what has the (sheet, pos) pairs. Both doors end up
   at the same crop function once the sheet and position are known.

   ------------------------------------------------------------------
   HOW THE CROP WORKS — same technique as facepic.js

   A box sized to the cell, the sheet as a background scaled to 300% in
   both directions, offset to the right ninth. No canvas, no slicing, and
   the browser decodes each sheet once no matter how many cells from it
   are on screen at once.

     pos 1 2 3   top row,    0% / 50% / 100%   0% down
     pos 4 5 6   middle row, same across,      50% down
     pos 7 8 9   bottom row, same across,     100% down

   ------------------------------------------------------------------
   A MISSING SHEET MUST NOT BREAK THE GAME

   Sheets arrive over days and nights, not all at once, so a missing one is
   a normal state, not a bug. Until a sheet is confirmed loaded, the cell
   shows the word instead of a blank box — playable, and obviously a
   placeholder rather than something broken. */

window.GH = window.GH || {};

GH.sprite = (function(){

  var DIR = 'images/';
  var COLS = 3;
  var PER_SHEET = 9;

  /* sheet key (a number or a name, both used as strings) -> status */
  var sheets = {};
  var waiting = {};
  var found = {};

  function keyOf(sheet){ return String(sheet); }

  function url(sheet){
    var p = DIR + sheet + '.webp';
    return GH.build ? GH.build.url(p) : p;
  }

  function probe(sheet, then){
    var k = keyOf(sheet);
    if (sheets[k] === 'ok' || sheets[k] === 'missing'){
      then(sheets[k]);
      return;
    }
    (waiting[k] = waiting[k] || []).push(then);
    if (sheets[k] === 'loading') return;
    sheets[k] = 'loading';
    var img = new Image();
    img.onload = function(){
      found[k] = url(sheet);
      settle(k, 'ok');
    };
    img.onerror = function(){ settle(k, 'missing'); };
    img.src = url(sheet);
  }

  function settle(k, how){
    sheets[k] = how;
    var list = waiting[k] || [];
    waiting[k] = [];
    list.forEach(function(fn){ fn(how); });
  }

  /* The box, once sheet and 1-based position are both known. */
  function crop(sheet, pos, word, cls){
    var box = document.createElement('div');
    box.className = 'sp' + (cls ? ' ' + cls : '');
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', word || '');

    var fallback = document.createElement('span');
    fallback.className = 'sp-word';
    fallback.textContent = word || '';
    box.appendChild(fallback);

    probe(sheet, function(how){
      if (how !== 'ok') return;
      var col = (pos - 1) % COLS;
      var row = Math.floor((pos - 1) / COLS);
      box.style.backgroundImage = 'url("' + (found[keyOf(sheet)] || url(sheet)) + '")';
      box.style.backgroundSize = (COLS * 100) + '% ' + (COLS * 100) + '%';
      box.style.backgroundPosition = (col * 50) + '% ' + (row * 50) + '%';
      box.className += ' has-art';
    });

    return box;
  }

  /* THE OLD DOOR — a single running number, as every existing game already
     calls it. 0 (or falsy) means no picture: a word-only tile, same shape
     as a real one so callers do not have to branch. */
  function tile(n, word, cls){
    if (!n){
      var box = document.createElement('div');
      box.className = 'sp sp-noart' + (cls ? ' ' + cls : '');
      box.setAttribute('role', 'img');
      box.setAttribute('aria-label', word || '');
      var span = document.createElement('span');
      span.className = 'sp-word';
      span.textContent = word || '';
      box.appendChild(span);
      return box;
    }
    var sheet = Math.ceil(n / PER_SHEET);
    var pos = ((n - 1) % PER_SHEET) + 1;
    return crop(sheet, pos, word, cls);
  }

  /* THE NEW DOOR — a named sheet plus its 1-based position, for
     `data/gallery.js` and anything shaped like it. */
  function cell(sheetName, pos, word, cls){
    if (!sheetName || !pos) return tile(0, word, cls);
    return crop(sheetName, pos, word, cls);
  }

  /* Which sheets have been asked for and come back missing — for the
     audit, same purpose as facepic.js's `missing()`. Callers pass the
     list of sheet keys they care about. */
  function missing(sheetKeys){
    var out = [];
    (sheetKeys || []).forEach(function(k){
      if (sheets[keyOf(k)] === 'missing') out.push(k);
    });
    return out;
  }

  /* THE GEOMETRY OF ONE CELL, WITHOUT BUILDING AN ELEMENT.

     `tile()` and `cell()` return a ready-made div. The lightbox needs the
     same crop applied to an element it already owns and sizes itself, so
     it needs the numbers rather than the div.

     THIS FUNCTION WAS MISSING. `js/lightbox.js` has always called
     `GH.sprite.locate(n)` on the first line of its `open()`, and this
     module never exported it — so `GH.lightbox.open()` threw a TypeError
     before painting anything, in every caller: the word list
     (`reference.js`), `readerwords.js`, `songvocab.js` and
     `vocabgame.js`. Tapping a picture did nothing, silently. Found when
     Steven reported the word-list pictures not enlarging.

     `openPic(url, caption)`, the other entry point, does not go through
     here and was never affected — which is why the store and the end
     screen could enlarge a picture while nothing else could.

     Same arithmetic as `crop()` below, deliberately: a second copy that
     drifts would put the thumbnail and its enlargement on different
     cells of the same sheet. Cells are square, matching `.sp`. */
  function locate(n){
    var sheet = Math.ceil(n / PER_SHEET);
    var pos = ((n - 1) % PER_SHEET) + 1;
    var col = (pos - 1) % COLS;
    var row = Math.floor((pos - 1) / COLS);
    return {
      url:   found[keyOf(sheet)] || url(sheet),
      sizeX: COLS * 100,
      sizeY: COLS * 100,
      x:     col * 50,
      y:     row * 50,
      aspect:'1 / 1'
    };
  }

  return { tile:tile, cell:cell, url:url, missing:missing, locate:locate };
})();
