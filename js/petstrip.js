/* Her pets, in the header.

   Up to three small faces beside the theme and language pickers, and a
   grid of all sixteen behind them.

   Three because that is the most she can ever have out: GH_PETS.slots has
   three entries, the second costs 1,500 Kronen and the third 4,500, and
   store.chosen() already caps its list at whatever she has bought. This
   file does not decide the number — it asks.

   ------------------------------------------------------------------
   WHY THE HEADER AND NOT THE HUB

   The first version put the faces at the top of the hub, which meant the
   pet existed on one screen out of thirty. A pet that is only visible
   where she chooses what to do is a menu decoration; a pet in the header
   is present while she works, which is the whole idea of having one.

   The greeting stays on the hub. A sentence in a header is a banner, and
   the pet brief's rule is one utterance per screen entry — a line that
   followed her into every round would be the opposite of that.

   ------------------------------------------------------------------
   THE GRID IS AN OVERLAY, NOT A SCREEN

   Because the faces are reachable from anywhere, the grid has to be too,
   and it must not throw away a round to open. So it behaves like the
   lightbox: it opens over the page, Escape and the backdrop close it, and
   nothing behind it is disturbed.

   Tapping a pet in the grid is a different matter — that goes to the
   store, and from mid-round it costs the round. Deliberately: it is the
   same cost as pressing Back, and it was her tap.

   Unowned pets are greyed and still legible. A row of blanks is nothing to
   want, and the shelf is meant to be a reason to come back.

   ------------------------------------------------------------------
   REFRESHING

   The faces change when she buys a pet, picks a different one, grows one,
   or switches profile. Nothing in the app broadcasts those, so `refresh()`
   is exported and called by the store after it paints and by app.js on the
   hub. Cheap: it rebuilds three <img> elements. */

window.GH = window.GH || {};

GH.petStrip = (function(){

  var MAX = 3;
  var host = null;
  var bar = null;
  var overlay = null;

  function t(k){ return GH.i18n ? GH.i18n.t(k) : k; }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function pets(){
    if (!GH.store || !GH.store.strip) return [];
    return GH.store.strip().slice(0, MAX);
  }

  /* ---------- the faces ---------- */

  function build(){
    host = document.querySelector('.topbar-controls');
    if (!host) return;
    bar = el('nav', 'petstrip');
    bar.setAttribute('aria-label', t('ptYourPets'));
    host.appendChild(bar);
    refresh();
  }

  function refresh(){
    if (!bar) return;
    bar.textContent = '';
    var mine = pets();
    /* No pets, no strip. An empty frame in the header is worse than
       nothing there — it looks like something failed to load. */
    if (!mine.length){ bar.style.display = 'none'; return; }
    bar.style.display = '';

    var btn = el('button', 'petstrip-btn');
    btn.type = 'button';
    btn.setAttribute('aria-label', t('ptYourPets'));
    mine.forEach(function(p){
      /* `pic` is a ready <img> with its own fallback chain — petArt builds
         it and works down form 2, form 1, plain name as files appear. It is
         an element, not a URL. */
      if (!p.pic) return;
      p.pic.classList.add('petstrip-mini');
      btn.appendChild(p.pic);
    });
    btn.addEventListener('click', open);
    bar.appendChild(btn);
  }

  /* ---------- the grid ---------- */

  function ensure(){
    if (overlay) return overlay;
    overlay = el('div', 'ptg-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var box = el('div', 'ptg-box');

    var head = el('div', 'ptg-head');
    head.appendChild(el('h2', 'ptg-title', t('ptAllPets')));
    var x = el('button', 'ptg-close', '\u00d7');
    x.type = 'button';
    x.id = 'ptg-close';
    x.setAttribute('aria-label', t('close'));
    x.addEventListener('click', close);
    head.appendChild(x);
    box.appendChild(head);

    box.appendChild(el('div', 'ptg-grid'));
    overlay.appendChild(box);

    /* the backdrop, but only the backdrop */
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) close();
    });
    document.body.appendChild(overlay);
    return overlay;
  }

  function isOpen(){
    return !!(overlay && overlay.className.indexOf('is-open') >= 0);
  }

  function fill(){
    var grid = overlay.querySelector('.ptg-grid');
    grid.textContent = '';
    if (!GH.store || !GH.store.shelf) return;

    GH.store.shelf().forEach(function(p){
      var cell = el('button', 'ptg-cell' +
        (p.own ? ' is-own' : ' is-locked') +
        (p.picked ? ' is-picked' : ''));
      cell.type = 'button';
      cell.setAttribute('aria-label', p.full);
      if (p.pic){
        p.pic.classList.add('ptg-img');
        cell.appendChild(p.pic);
      }
      cell.appendChild(el('span', 'ptg-name', p.name));
      /* The German word, because a pet is also a vocabulary card and the
         grid is the one place all sixteen are visible at once. Only for
         the ones she owns — the word arrives with the animal. */
      if (p.own) cell.appendChild(el('span', 'ptg-de', p.de));
      cell.addEventListener('click', function(){ go(p.id); });
      grid.appendChild(cell);
    });
  }

  function open(){
    ensure();
    fill();
    overlay.className = 'ptg-overlay is-open';
    document.body.style.overflow = 'hidden';
    var x = document.getElementById('ptg-close');
    if (x && x.focus) x.focus();
  }

  function close(){
    if (!overlay) return;
    overlay.className = 'ptg-overlay';
    document.body.style.overflow = '';
  }

  /* To the store, at that pet. */
  function go(id){
    close();
    if (!GH.app || !GH.app.play) return;
    /* Routed through app.js rather than opened here, because launch() is
       what tells the event log which screen she is on and it lives there.
       `focus` rides along so the shelf scrolls to the pet she tapped
       instead of dumping her at the top of sixteen. */
    GH.app.play({ id:'store', open:function(view, back){
      GH.store.open(view, back, id);
    }});
  }

  /* Escape closes the grid and nothing else.

     Capture and stopImmediatePropagation for the same reason lightbox.js
     needs them: nav.js also listens for Escape on `document`, and without
     this the grid would close AND the screen behind it would leave. */
  document.addEventListener('keydown', function(e){
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (!isOpen()) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    close();
  }, true);

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  return { refresh:refresh, open:open, close:close, isOpen:isOpen, max:MAX };
})();
