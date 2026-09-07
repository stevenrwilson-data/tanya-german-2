/* js/activities/toc.js */
/* The Table of Contents.

   Reached from the button beside "Filter by Topic" at the top of the hub.
   That button shipped inert in v262 — Steven's instruction was to claim
   the spot before there was anywhere to go, so the destination would not
   have to be guessed at. This is the destination.

   ------------------------------------------------------------------
   WHAT IS HERE AND WHAT IS NOT

   The heading, the line under it, and the way back. That is deliberate
   and it is the whole file: Steven is writing the contents now, and the
   one thing this must not do is invent a structure he then has to argue
   with. `sections()` below returns an empty list today, and the screen
   says nothing rather than showing a scaffold nobody asked for.

   Adding the content is adding rows to that one function. Nothing else
   in here needs to change, and nothing outside it needs to change at
   all.

   ------------------------------------------------------------------
   A VIEW, NOT A TILE

   It is not registered with GH.app.register() and it must not be: a tile
   in the Reference row would put it in the game guide, in the hub grid
   and behind the topic filter, none of which is what a table of contents
   is. It is navigation ABOUT the hub, so it hangs off the hub's own
   header the way the game guide's "What are these games?" button does —
   same shape, same launch() call, same back-to-hub.

   ------------------------------------------------------------------
   ITS OWN LOOK, PER STEVEN

   His words, from the spec: "a separate looking page with text and links
   and specific behaviors" — distinct from the hub's tile grid. So the
   rows here are text and not cards, and the styling lives under `.toc-`
   in css/style.css rather than borrowing the tile classes.
*/

window.GH = window.GH || {};

GH.toc = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- THE CONTENTS ----------

     Empty on purpose — see the note at the top. Steven's to fill.

     The shape each row will want, so it is written down before there are
     any: a label, and something to do when tapped. Whether a row jumps to
     a hub section, opens a piece directly, or expands into sub-rows is one
     of the open questions in `claude/table-of-contents.md` and is his to
     answer, so nothing here decides it. */
  function sections(){
    return [];
  }

  function paint(){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    headBar.appendChild(back);

    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('tocTitle')));
    titles.appendChild(el('p', null, t('tocSub')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var rows = sections();
    if (rows.length){
      var list = el('div', 'toc-list');
      rows.forEach(function(r){
        var b = el('button', 'toc-row');
        b.type = 'button';
        b.appendChild(el('span', 'toc-row-t', r.label));
        if (r.note) b.appendChild(el('span', 'toc-row-s', r.note));
        if (r.go) b.addEventListener('click', r.go);
        else b.disabled = true;
        list.appendChild(b);
      });
      host.appendChild(list);
    }

    if (GH.nav) GH.nav.ready();
  }

  /* `onExit` is the hub. Same signature as every other screen's open(),
     so app.js's launch() wraps it the same way and the event log records
     it as one screen. */
  function open(container, onExit){
    host = container;
    state = { onExit:onExit };
    GH.app.redraw = paint;
    paint();
  }

  return { open:open };
})();
