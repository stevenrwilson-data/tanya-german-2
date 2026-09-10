/* js/petstrip.js */
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

  /* `v` was missing, so `t('ptSlotsFull', { n:3 })` handed i18n the key
     alone and the placeholder came through to the screen as literal
     "{n}". Every other file's helper takes the second argument —
     lessons.js and store.js both do — and this one silently did not. */
  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }

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

    /* WHAT A TAP IN HERE DOES, said once at the top.

       Steven, 09 Sep: "when you click the pets it shows all the pets but
       you can't choose them." The cells were always meant to be
       tappable — `tapped()` has handled 'own' and 'can' since it was
       written — but nothing on the screen said so, and until store.js
       grew `pickById` the taps did nothing anyway. With the taps working,
       the grid still needs to admit what it is for. */
    box.appendChild(el('p', 'ptg-how', t('ptGridHow')));

    box.appendChild(el('div', 'ptg-grid'));
    /* A quiet line under the grid, used only to say "every carrier is
       full" when a tap is refused. Empty the rest of the time, and
       cleared on every fill(). */
    box.appendChild(el('p', 'ptg-note'));

    /* TO THE STORE. `go(id)` has existed since this file was written and
       NOTHING EVER CALLED IT — so the grid showed sixteen pets, half of
       them locked, with no way to reach the place that sells them.
       Passing no id opens the store at the top rather than at a pet. */
    /* `btn-primary`, not `btn-quiet`. Steven, 09 Sep: "make the store a
       BUTTON not a tiny underlined link." `btn-quiet` is literally the
       link style — no background, no border, underlined text — so it read
       as a footnote under a grid of sixteen pictures. This is the only
       route from here to the place that sells the locked half of them,
       which makes it the most important thing on the panel after the
       cells themselves. */
    var shop = el('button', 'btn btn-primary ptg-shop', t('stStore'));
    shop.type = 'button';
    shop.addEventListener('click', function(){ go(null); });
    box.appendChild(shop);

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
    /* Cleared whenever the grid repaints, so a "carriers are full"
       message cannot outlive the state that caused it. */
    var note0 = overlay.querySelector('.ptg-note');
    if (note0) note0.textContent = '';
    if (!GH.store || !GH.store.shelf) return;

    GH.store.shelf().forEach(function(p){
      var cell = el('button', 'ptg-cell' +
        (p.own ? ' is-own' : ' is-locked') +
        (p.picked ? ' is-picked' : ''));
      cell.type = 'button';
      cell.setAttribute('aria-label', p.full);
      /* So `tapped()` can find this cell again to flash it. */
      cell.setAttribute('data-pet', p.id);
      if (p.pic){
        p.pic.classList.add('ptg-img');
        cell.appendChild(p.pic);
      }
      cell.appendChild(el('span', 'ptg-name', p.name));
      /* The German word, because a pet is also a vocabulary card and the
         grid is the one place all sixteen are visible at once. Only for
         the ones she owns — the word arrives with the animal. */
      if (p.own) cell.appendChild(el('span', 'ptg-de', p.de));

      /* WHY THIS ONE CANNOT BE HAD, ON THE CELL ITSELF.

         Steven, 10 Sep: "it needs to have a message on every single pet."
         Not on tap, not on another screen — on the pet.

         A greyed picture says something is wrong; it does not say what.
         `needFor` comes from store.js, which owns the gate and its
         wording, so the grid and the shelf can never give different
         reasons for the same lock. */
      if (!p.own && GH.store.needFor){
        var why = GH.store.needFor(p.id);
        if (why) cell.appendChild(el('span', 'ptg-need', why));
      }
      cell.addEventListener('click', function(){ tapped(p.id); });
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

  /* ---------- THE GRID IS DIRECT ----------

     No panel, no confirmation. One tap does the thing:

       owned            equip it. That is what tapping a pet she has means.
       unlocked, afford buy it — and store.buy() adds it to her chosen pets
                        if there is a free slot, exactly as the store does.
       locked, or dear  NOTHING. Not an error, not an explanation.

     Doing nothing is deliberate. The grid is the fast path, used mid-round
     with three taps to spare; a locked pet that opens a panel about
     ninety-day streaks is an interruption she did not ask for. The cell is
     already drawn `is-locked`, so the screen has told her before she taps.

     The STORE is where the why lives — the gate with her progress against
     it, the pet's own pitch, the carriers. `go(id)` still opens it at this
     pet, from the store tile and from the purse.

     `refresh()` and purse afterwards, so the header strip and the balance
     both show what just happened. That is the only feedback, and for an
     equip it is the right amount. */
  function tapped(id){
    var S = GH.store;
    if (!S || !S.buyState) return;
    var st = S.buyState(id);

    if (st === 'own'){
      /* A REFUSAL HAS TO LOOK DIFFERENT FROM A NO-OP.

         `pickById` returns 'on', 'off' or 'full'. 'full' means every
         carrier is occupied, so nothing changed — and a tap that changes
         nothing and says nothing is exactly the dead-feeling grid this
         whole fix exists to replace. So the cell is marked for a moment
         and the count is said out loud. */
      var got = S.pickById(id);
      if (got === 'full'){
        /* `overlay` is module-scoped; the `grid` variable is local to
           fill(). And there is no toast anywhere in this file, so the
           message goes in a line the grid already owns rather than in a
           mechanism invented for one case. */
        var cell = overlay && overlay.querySelector('[data-pet="' + id + '"]');
        if (cell){
          cell.className += ' is-full';
          window.setTimeout(function(){
            cell.className = cell.className.replace(/\s*is-full\b/, '');
          }, 900);
        }
        var note = overlay && overlay.querySelector('.ptg-note');
        if (note) note.textContent = t('ptSlotsFull', { n:S.slots() });
        return;
      }
    } else if (st === 'can'){
      if (!S.buyById(id)) return;
      if (GH.purse) GH.purse.refresh();
    } else {
      /* LOCKED, TOO DEAR, OR EARNED-ONLY — AND IT HAS TO SAY WHICH.

         This did nothing at all. Steven, 10 Sep: "Bun Bun needs 3 days
         activity to unlock, but no reference to it, just can't buy."

         Exactly the dead grid the 'full' branch above was written to
         replace, left in place three lines below it. The store shelf has
         always shown the requirement; the grid greyed the cell and kept
         the reason to itself.

         `needFor` comes from store.js, which owns the gate and the
         wording — this only displays it, so the two can never disagree
         about why something is locked. */
      /* AN ACHIEVEMENT GATE SENDS HER TO THE ACHIEVEMENTS.

         Steven, 10 Sep: "if a pet requires an achievement then make that
         achievement a link that takes you to the achievement section."

         The shelf has had that button for a while; the grid had nothing.
         A grid cell is already a <button>, so a link INSIDE it would be a
         button in a button — invalid, and the clicks fight. The tap
         itself goes there instead, which is the same destination with no
         nesting.

         Only when the gate actually mentions achievements. Every other
         locked pet still just says why. */
      if (S.needsAward && S.needsAward(id) && GH.awardsView && GH.app && GH.app.play){
        close();
        GH.app.play({ id:'awards-view', open:GH.awardsView.open });
        return;
      }

      var why = (S.needFor ? S.needFor(id) : '') || t('ptLocked');
      var lcell = overlay && overlay.querySelector('[data-pet="' + id + '"]');
      if (lcell){
        lcell.className += ' is-full';
        window.setTimeout(function(){
          lcell.className = lcell.className.replace(/\s*is-full\b/, '');
        }, 900);
      }
      var ln = overlay && overlay.querySelector('.ptg-note');
      if (ln) ln.textContent = why;
      return;
    }

    refresh();
    fill();
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
      /* `id` may be null — the Store button at the foot of the grid
         passes nothing, which opens the shelf at the top instead of
         scrolled to one pet. */
      GH.store.open(view, back, id || null);
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
