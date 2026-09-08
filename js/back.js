/* js/back.js */
/* EVERY BACK BUTTON IN THE APP, BUILT IN ONE PLACE.

   Steven: "I want you to code a back button js that handles them all."

   It used to be written out at 53 call sites across 36 files, and by the
   time it was 53 it existed in two spellings of the same character — 32
   using the escape `\u2039` and 17 a literal `‹`. Changing the glyph
   meant 53 edits and 53 chances for one to drift; four of them DID drift,
   because `comic.js`, `grammar.js` and `wordmatch.js` build theirs with a
   second class and a pattern that matched the other 49 skipped them.

   Now every screen calls `GH.back.button(onClick)` and the glyph lives in
   exactly one table below.

   ------------------------------------------------------------------
   THE GLYPH IS A TABLE, NOT A CONSTANT

   Steven wants to pick the arrow: "I was thinking of having like 2-3
   designs at the bottom of the color and font picker. So you can choose
   your back button arrow." So `ARROWS` is keyed by id from the start,
   even though only one entry exists today. Adding a design is adding a
   row here; it is not a restructuring.

   An entry is either:

     { id, glyph:'\u2190' }        a character
     { id, svg:'<svg …>…</svg>' }  inline SVG source

   SVG MUST BE INLINE, not an `<img>`. Steven's custom arrows will use
   `currentColor`, and an `<img>` cannot inherit it — the same reason the
   five fill-blank ladder icons are inlined. Draw them 24×24 with
   viewBox="0 0 24 24", no width/height attributes (the CSS sets those),
   stroke="currentColor", stroke-width 2, round caps and joins.

   ------------------------------------------------------------------
   DEVICE-WIDE, PER STEVEN

   "Just make it device wide." So a plain localStorage key like
   `gh-theme` and `gh-type`, NOT `GH.player.scope`. One arrow for the
   whole install, shared across profiles — it is cosmetic, the same as the
   palette and the type scale.

   IT DOES UPDATE LIVE. An earlier version of this note claimed no
   repaint was needed because the picker only opens on the hub and the
   hub has no back button. Wrong — the header is on every screen, so the
   panel opens inside lessons and games too, where a back button is
   sitting right there. `set()` calls `refresh()`, which redraws every
   `.backlink` in the DOM in place. Still no repaint: the buttons already
   exist, they just get their contents replaced.

   ------------------------------------------------------------------
   SIZE IS CSS, NOT HERE

   `.backlink` in css/style.css owns the font-size and the padding, and
   they are deliberately separate: the glyph's size and the tap target are
   independent, so the arrow can shrink without the button getting harder
   to hit. Do not set either from this file. */

window.GH = window.GH || {};

GH.back = (function(){

  /* THREE DESIGNS. The glyphs are PLACEHOLDERS — Steven is drawing his
     own and said "It might be an SVG I custom make." Swapping one is
     replacing `glyph:'…'` with `svg:'<svg …>'` on that row; nothing else
     in the app changes, because every back button is built from this
     table.

     Chosen to look genuinely different at 17px rather than to be three
     variations of the same mark: a plain arrow, a long-shafted one, and
     the small chevron the app used before today. Deliberately NOT a
     solid left-pointing triangle — that reintroduces the play-button
     problem the carets were just fixed for. */
  var ARROWS = [
    { id:'solid',   label:'Solid',   svg:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" transform="translate(-149.8152 -30.0957) scale(0.106462)"><path stroke="currentColor" stroke-width="3" stroke-miterlimit="10" d="M1558.888,372.193c-21.547-13.686-51.072-15.711-66.731-15.705v-48.54l-64.659,73.778l64.659,72.949v-45.22c17.298-0.035,44.953,0.616,66.317,9.575c25.698,10.776,46.422,42.277,53.883,63.83C1603.238,420.273,1589.56,391.674,1558.888,372.193z"/></g></svg>' },
    { id:'double',  label:'Double',  svg:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" transform="translate(-14.0514 -25.9558) scale(0.095992)"><polygon points="289.598,474.125 210.878,395.404 289.598,316.684 289.598,291.229 185.422,395.404 289.598,499.58"/><polygon points="357.361,474.125 278.642,395.404 357.361,316.684 357.361,291.229 253.186,395.404 357.361,499.58"/></g></svg>' },
    { id:'undo',    label:'Curved',  svg:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" transform="translate(-39.2825 -17.6486) scale(0.074047)"><polygon points="661.697,468.551 582.978,389.831 661.697,311.111 661.697,285.656 557.521,389.831 661.697,494.007"/><path fill="none" stroke="currentColor" stroke-width="20" stroke-miterlimit="10" d="M577.157,394.371c175.335-30.312,253.791,10.932,238.62,65.504c-4.653,16.736-25.185,33.515-66.182,45.278"/></g></svg>' },
    { id:'brush',   label:'Brush',   svg:'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="currentColor" transform="translate(-101.2167 -28.5585) scale(0.102575)"><path stroke="currentColor" stroke-width="10" stroke-miterlimit="10" d="M1192.659,423.061c-3.746-13.791-13.445-31.758-27.154-41.988c-6.934-5.175-36.539-17.377-55.142-24.221c0.856-12.675-1.044-30.057-12.472-36.162c-15.329-8.188-35.168,6.361-47.056,15.871c-14.75,13.155-40.03,27.886-39.566,48.537c0.469,20.861,37.269,49.947,43.325,54.218c9.797,6.862,31.092,19.685,39.751,13.011l0.113-0.089c9.156-7.745,11.142-19.647,11.63-31.305c3.537,1.236,25.823,6.896,36.497,12.707c10.291,5.603,17.592,9.715,24.626,18.163c5.943,6.604,14.941,19.55,23.171,20.722l0.097,0.002C1199.163,472.343,1196.414,436.886,1192.659,423.061z"/></g></svg>' }
  ];

  var KEY = 'gh-back';
  var DEFAULT = 'solid';

  function find(id){
    for (var i = 0; i < ARROWS.length; i++) if (ARROWS[i].id === id) return ARROWS[i];
    return null;
  }

  function stored(){
    try { return window.localStorage.getItem(KEY); } catch (e){ return null; }
  }

  function remember(id){
    try { window.localStorage.setItem(KEY, id); } catch (e){}
  }

  /* Falls back to the default rather than rendering an empty button if
     the stored id names a design that has since been removed. */
  function current(){
    return find(stored()) || find(DEFAULT) || ARROWS[0];
  }

  /* REDRAWS WHAT IS ALREADY ON SCREEN.

     The first version did not, on the reasoning that the picker only
     opens on the hub and the hub has no back button. That was wrong: the
     header is on EVERY screen, so she can open the panel in the middle
     of a lesson — and Steven did, and the arrow did not change until he
     left and came back.

     No repaint is needed to fix it. The buttons are already in the DOM,
     so they are simply redrawn in place. `draw()` replaces the whole
     contents, so this is idempotent and safe to call on a button that is
     already showing the chosen arrow. */
  function refresh(){
    var b = document.querySelectorAll('.backlink');
    for (var i = 0; i < b.length; i++) draw(b[i]);
  }

  function set(id){
    if (!find(id)) return;
    remember(id);
    refresh();
    mark();
  }

  function list(){ return ARROWS.slice(); }

  /* ---------- THE PICKER ROW ----------

     Steven: "I was thinking of having like 2-3 designs at the bottom of
     the color and font picker. So you can choose your back button arrow."

     A third row in the same panel, under the colours and the type
     variants, for the reason his own ruling gave about those two: they
     are axes of one decision — how the app looks — so they belong in one
     card, not in three controls.

     IT TAKES EFFECT IMMEDIATELY, wherever she is. `set()` redraws every
     back button already in the DOM — see `refresh()` above. The panel
     opens from the header, which is on every screen, so a back button is
     very often on screen when she picks.

     ORDERING: this appends into GH.theme's panel, the same as GH.type
     does, and takes the same fallback — if the panel is not there yet the
     row lands in the controls row unstyled but working, rather than
     vanishing. */
  var bar = null;

  function mark(){
    if (!bar) return;
    var id = current().id;
    var b = bar.querySelectorAll('button');
    for (var i = 0; i < b.length; i++){
      b[i].setAttribute('aria-pressed',
        b[i].getAttribute('data-back') === id ? 'true' : 'false');
    }
  }

  function init(){
    var panel = document.querySelector('#themeswitch .pick-panel');
    var host = panel || document.querySelector('.topbar-controls');
    if (!host) return;

    bar = document.createElement('div');
    bar.className = 'backswitch';
    bar.setAttribute('aria-label', 'Back button');

    ARROWS.forEach(function(a){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-back', a.id);
      b.setAttribute('title', a.label);
      b.setAttribute('aria-label', a.label);
      /* The swatch IS the thing being chosen — unlike a colour dot or an
         `Aa`, this previews exactly what she will get. */
      draw(b, a);
      b.addEventListener('click', function(){ set(a.id); });
      bar.appendChild(b);
    });

    host.appendChild(bar);
    mark();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Paints the chosen arrow into an element. Kept separate from
     `button()` so the picker can preview a design without building a
     whole back button around it. */
  function draw(node, arrow){
    if (!node) return;
    var a = arrow || current();
    if (a.svg) node.innerHTML = a.svg;
    else node.textContent = a.glyph || '\u2190';
  }

  /* THE ONE WAY TO MAKE A BACK BUTTON.

       GH.back.button(fn)              the ordinary case
       GH.back.button(fn, 'cm-exit')   with a screen's own extra class

     Returns the element; the caller appends it wherever it belongs, which
     differs by screen — some put it in a header bar, some straight on the
     host. `type='button'` is set here because a bare <button> inside a
     form would submit, and forgetting it was a per-site risk.

     The label is the arrow and nothing else, per Steven: "Arrow is
     language independent and it is explained and used in both tours so it
     doesn't need text." `t('back')` is still live in welcome.js and
     guesswho.js, so reverting to text is a change in this file only. */
  function button(onClick, extraClass){
    var b = document.createElement('button');
    b.className = 'backlink' + (extraClass ? ' ' + extraClass : '');
    b.type = 'button';
    draw(b);
    if (onClick) b.addEventListener('click', onClick);
    return b;
  }

  return { button:button, draw:draw, list:list, current:current, set:set };
})();
