/* js/app.js */
/* Screen wiring + the hub. Add new games with GH.app.register(). */

window.GH = window.GH || {};

GH.app = (function(){

  var t = function(k, v){ return GH.i18n.t(k, v); };
  var view = document.getElementById('view');
  var extras = [];

  /* A new game only needs: an id, names in the three languages, a glyph,
     and an open(container, onExit) function. */
  function register(activity){ extras.push(activity); }

  /* so the grammar section can hand straight over to the game that drills
     what she has just read, without knowing anything about it beyond its id */
  function find(id){
    for (var i = 0; i < extras.length; i++) if (extras[i].id === id) return extras[i];
    return null;
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function countBlanks(s){
    return GH.text.blankUnits(s.de, s.blanks).length;
  }

  function sentencesIn(catId){
    return (GH_BANK.sentences || []).filter(function(s){ return s.cat === catId; });
  }

  /* `id` is the sixth argument and every caller must pass it, because a
     tile with no id cannot be counted as seen — and "never on screen" is
     the one diagnosis nothing else can produce. An unused feature and an
     undiscovered one need opposite fixes.

     Fifteen call sites, so the marking happens HERE rather than at each
     one. Passing the id is unavoidable — this function has no other way to
     know what it is drawing — but the observer wiring is written once. */
  function tile(glyph, name, sub, footer, onOpen, id){
    var b = el('button', 'tile');
    b.type = 'button';
    if (glyph) b.appendChild(el('span', 'tile-glyph', glyph));
    b.appendChild(el('span', 'tile-name', name));
    if (sub) b.appendChild(el('span', 'tile-sub', sub));
    if (footer) b.appendChild(el('span', 'tile-de', footer));
    if (onOpen) b.addEventListener('click', onOpen);
    else b.disabled = true;
    if (id){
      b.setAttribute('data-tile', id);
      watch(b);
    }
    return b;
  }

  /* ---------- was this tile ever actually on screen? ----------

     `seen()` in events.js could not be called until something knew when a
     tile became visible. Scroll position is the wrong instrument: a tile
     can be below the fold on a long hub and never enter the viewport, and
     that is exactly the case worth recording.

     IntersectionObserver, one instance for the whole page, reused across
     repaints — the hub rebuilds on every filter change and language switch,
     and a new observer per paint would leak one per rebuild.

     `unobserve` on first sight, because a tile she scrolls past forty times
     is one impression. events.seen() also dedupes per session, so this is
     belt and braces; the cheap half is here so forty callbacks do not
     become forty storage writes.

     No IntersectionObserver — old Safari, or a test — and nothing is
     recorded. Undercounting is the safe direction: it makes a tile look
     undiscovered, which is a prompt to look rather than a false all-clear.

     THRESHOLD 0.5 and not 0. A single pixel of a tile clipping into the
     viewport is not her having seen it, and 0 would mark the whole hub as
     seen the moment she flicked to the bottom. */
  var watcher = null;

  function watch(node){
    if (!window.IntersectionObserver) return;
    if (!watcher){
      watcher = new window.IntersectionObserver(function(rows){
        rows.forEach(function(r){
          if (!r.isIntersecting) return;
          var id = r.target.getAttribute('data-tile');
          if (id && GH.events && GH.events.seen) GH.events.seen(id);
          watcher.unobserve(r.target);
        });
      }, { threshold: 0.5 });
    }
    watcher.observe(node);
  }

  /* Sections register themselves for the jump bar as they are built, so
     the bar always matches what is actually on the page — a section that
     gets skipped (no data yet) never shows up as a dead link. */
  var jumps = [];

  /* Topic filter, following the same rules as the pink math org list:
     a set of active topics OR-matched together, "All" as a real state
     that clears the rest, and the set emptying out re-activates "All"
     rather than leaving nothing selected.

     The chips stay collapsed behind a button — seventeen topics is far
     too much furniture to leave on screen above the content. */
  var activeCats = {};
  var catCount = 0;
  var filterOpen = false;

  function keep(catId){
    return catCount === 0 || !!activeCats[catId];
  }

  function allTopics(){
    return (GH_BANK.categories || []);
  }

  function toggleCat(id){
    if (id === 'all'){
      activeCats = {}; catCount = 0;
    } else if (activeCats[id]){
      delete activeCats[id]; catCount--;
    } else {
      activeCats[id] = true; catCount++;
    }
    hub();
  }

  function filterBlock(){
    var wrap = el('div', 'filterwrap');
    var row = el('div', 'filter-row');

    var toggle = el('button', 'filter-toggle' + (catCount ? ' has' : ''));
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', filterOpen ? 'true' : 'false');
    toggle.appendChild(el('span', null, t('filterBy')));
    toggle.appendChild(el('span', 'filter-caret', filterOpen ? '▴' : '▾'));
    if (catCount){
      toggle.appendChild(el('span', 'filter-badge', catCount));
    }
    toggle.addEventListener('click', function(){
      filterOpen = !filterOpen;
      hub();
    });
    row.appendChild(toggle);

    /* NOW WIRED. It shipped inert in v262 — Steven's instruction was to
       claim the spot next to the filter toggle before there was anywhere
       to go, so the destination would not have to be guessed at. There is
       somewhere to go now.

       Opened the same way the game guide's button is, a few hundred lines
       down: stop the speech, tell the log we are leaving the hub, clear
       the view, and launch() the screen with `hub` as its way back. Doing
       it any other way is how a screen ends up outside the event log —
       launch() is the only thing that records which screen she is on. */
    if (GH.toc){
      var toc = el('button', 'filter-toggle toc-toggle');
      toc.type = 'button';
      toc.appendChild(el('span', null, t('tocButton')));
      toc.addEventListener('click', function(){
        GH.speech.stop();
        leaving();
        view.textContent = '';
        launch(function(){ GH.toc.open(view, hub); }, 'toc');
      });
      row.appendChild(toc);
    }

    wrap.appendChild(row);

    if (!filterOpen) return wrap;

    var chips = el('div', 'chips');

    var all = el('button', 'chip' + (catCount ? '' : ' on'), t('allTopics'));
    all.type = 'button';
    all.setAttribute('aria-pressed', catCount ? 'false' : 'true');
    all.addEventListener('click', function(){ toggleCat('all'); });
    chips.appendChild(all);

    allTopics().forEach(function(c){
      var on = !!activeCats[c.id];
      var b = el('button', 'chip' + (on ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.appendChild(el('span', 'chip-glyph', c.glyph));
      b.appendChild(document.createTextNode(' ' + GH.i18n.pick(c)));
      b.addEventListener('click', function(){ toggleCat(c.id); });
      chips.appendChild(b);
    });
    wrap.appendChild(chips);
    wrap.appendChild(el('p', 'filter-hint', t('filterHint')));
    return wrap;
  }

  /* ---------- FOUR AT A TIME, NOT ALL OF THEM ----------

     Steven, having timed it: five seconds of accelerated scrolling to reach
     the bottom. Seventeen topics of sentences, every story, a vocabulary set
     for every topic and every long story, all laid out in full, before the
     lessons and games have even started.

     Two per row and tighter tiles halved the height. This is the part that
     actually fixes it: the four data-heavy sections show four and offer the
     rest. Her idea of the app is the same — everything is still there and
     one tap away — but the page is a menu again rather than an inventory.

     A FILTER TURNS THIS OFF ENTIRELY. Choosing topics is her saying which
     ones she wants; hiding some of THOSE behind a button would be the app
     arguing with an instruction it was just given.

     Expanded per section and only until she leaves the hub, deliberately.
     Nothing is stored: a section she opened once should not be permanently
     long, and the next visit starts short again.

     The tiles are built and then trimmed rather than sliced at the source,
     because the four sections read four differently-shaped lists and one
     trim after the fact is far less to get wrong than four slices. The
     observer is released as each one goes — `watch()` registers every tile
     with the IntersectionObserver, and dropping the node without
     unobserving would leak one per repaint, and the hub repaints often. */
  var SHOW_FIRST = 4;
  var openedSections = {};

  /* A CAP THAT OPENS MUST ALSO CLOSE. Steven: "there needs to be a way to
     hide the extras after you uncollapse."

     It used to be one-way. `openedSections[key]` made this function
     return immediately, so an opened section showed every tile and no
     button at all — and the only route back was reloading the page. On a
     section of 21 that is a lot of scrolling with no way out.

     So the flag now chooses WHICH button rather than whether to draw
     one, and the same click handler shape toggles it either way. Both
     buttons carry `.sec-more`, so there is nothing new to style and the
     two cannot drift apart visually. */
  function capTiles(sec, key){
    if (catCount) return;                    /* she filtered; show what she asked for */
    var total = sec._tiles.children.length;
    if (total <= SHOW_FIRST) return;

    var btn = el('button', 'btn btn-quiet sec-more');
    btn.type = 'button';

    if (openedSections[key]){
      btn.textContent = t('secShowLess');
    } else {
      while (sec._tiles.children.length > SHOW_FIRST){
        var last = sec._tiles.lastChild;
        if (watcher && watcher.unobserve) watcher.unobserve(last);
        sec._tiles.removeChild(last);
      }
      btn.textContent = t('secShowAll', { n:total });
    }

    btn.addEventListener('click', function(){
      openedSections[key] = !openedSections[key];
      hub();
    });
    sec.appendChild(btn);
  }

  function section(headKey, count){
    var wrap = el('section', 'hub-section');
    wrap.id = 'sec-' + headKey;
    var head = el('div', 'hub-head');
    head.appendChild(el('h2', null, t(headKey)));
    if (count) head.appendChild(el('span', 'hub-count', count));
    wrap.appendChild(head);
    var tiles = el('div', 'tiles');
    wrap.appendChild(tiles);
    wrap._tiles = tiles;
    jumps.push({ id: wrap.id, key: headKey, node: wrap });
    return wrap;
  }

  /* Built last but inserted at the top, once every section is known. */
  function jumpBar(){
    if (jumps.length < 2) return null;
    var bar = el('nav', 'jumpbar');
    bar.setAttribute('aria-label', t('jumpTo'));

    /* BACK TO THE TOP, FIRST IN THE ROW. Steven: "Up top is the filters,
       the crystal totals with a link to crystal section, and language
       change and theme change. A small arrow that lets you jump up there
       might be worth having."

       Why it earns its place: this row is the ONLY sticky thing on the
       hub. Everything at the top — the purse, the language switch, the
       theme picker, the filters — scrolls away, so from three sections
       down there is no route back to any of it but a long swipe.

       First rather than last, so the two navigation aids bracket the
       eight section jumps: up-arrow, the sections, then the Table of
       Contents. */
    var up = el('button', 'jump is-up');
    up.type = 'button';
    up.setAttribute('aria-label', t('jumpTop'));
    up.setAttribute('title', t('jumpTop'));
    up.textContent = '\u2191';
    up.addEventListener('click', function(){
      if (window.scrollTo) window.scrollTo({ top:0, behavior:'smooth' });
    });
    bar.appendChild(up);
    jumps.forEach(function(j){
      var b = el('button', 'jump');
      b.type = 'button';
      /* SOMETHING FOR THE TOUR TO POINT AT. Every pill was just `.jump`,
         so `querySelector('.jump')` returned whichever came first and no
         step could name a particular one — only `.jump.is-up` and
         `.jump.is-toc` were distinguishable.

         The Quick Tour navigates by these pills, deliberately: Steven,
         08 Sep — the Quick Tour teaches the jumpbar, the Full Tour
         teaches the Table of Contents, so one tour covers each way of
         getting around. A step can now say `[data-jump="gamesHead"]`.

         `j.key` is the section's head key, the same string `section()`
         builds `#sec-<key>` from, so the two cannot drift apart. */
      b.setAttribute('data-jump', j.key);
      /* full label on a wide screen, just the section number on a phone;
         CSS picks which one shows */
      var full = t(j.key);
      var parts = full.split(' · ');
      b.appendChild(el('span', 'jump-long', full));
      b.appendChild(el('span', 'jump-short', parts.length > 1 ? parts[0] : full));
      b.addEventListener('click', function(){
        if (j.node.scrollIntoView) j.node.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      bar.appendChild(b);
    });

    /* THE TABLE OF CONTENTS, LAST IN THE ROW. Steven: "Add TOC to the
       rolling buttons. It can be on the bottom row and would be very
       useful."

       It is the odd one out and deliberately so: every other button here
       scrolls to a section of this page, and this one leaves for another
       screen. Last rather than first for that reason — the eight jumps
       stay a contiguous group and the thing that behaves differently sits
       after them rather than in the middle.

       `jump is-toc` and not a class of its own, so it inherits the pill
       shape, the wrapping and the sticky row's sizing for free. Only the
       colour says it is different.

       Opened exactly as the button in the filter row is: stop the speech,
       log the exit, clear the view, launch() with `hub` as the way back.
       launch() is the only thing that records which screen she is on, so
       any other route would lose her from the event log. */
    if (GH.toc){
      var tb = el('button', 'jump is-toc');
      tb.type = 'button';
      /* Always the abbreviation, at every width — not the row's
         long/short mechanism. The full label already appears on the
         filter-row button directly above this row, so spelling it out
         twice on one screen is the thing to avoid. Steven's
         abbreviations: TOC, IV, ОГЛ.

         aria-label and title carry the full name so the short text is
         not the only thing a screen reader gets. */
      tb.appendChild(document.createTextNode(t('tocShort')));
      tb.setAttribute('aria-label', t('tocButton'));
      tb.setAttribute('title', t('tocButton'));
      tb.addEventListener('click', function(){
        GH.speech.stop();
        leaving();
        view.textContent = '';
        launch(function(){ GH.toc.open(view, hub); }, 'toc');
      });
      bar.appendChild(tb);
    }

    return bar;
  }

  /* Who is playing, at the top of the hub, always.

     Both fields change how the app talks to her. Every pet line carries
     {name}, and Russian marks the listener's gender in the ordinary past
     tense — «ты закончила» against «ты закончил» — so an app that does not
     know these two things is either impersonal or wrong.

     Permanent rather than a one-time prompt. The first version hid itself
     once both were answered, which meant the only way back to them was
     Settings — and a profile you cannot see is a profile nobody edits.
     It sits collapsed to a single line once filled in, and opens on a tap.

     Only ever the person currently playing. Adding and removing profiles
     stays in Settings, because that is a different job. */

  var openWho = false;

  function genderWord(g){
    return g === 'f' ? t('stGenderF') : g === 'm' ? t('stGenderM') : t('stGenderNone');
  }

  function whoCard(){
    var name = (GH.player.current().name || '').trim();
    var g = GH.player.gender();
    /* NAME ONLY. Gender does not gate this card.

       It used to require both, and "не указывать" / "do not specify" —
       the default, pre-selected choice — DELETES the gender field rather
       than storing one (see GH.player.setGender). So choosing the option
       that was already selected left the card permanently blank, and
       `hub()` reopens it on every redraw: a closed loop with no exit,
       because the dismiss button below only appears when the card is NOT
       blank.

       player.js says it outright: "Empty is a real answer and the
       default. Nothing may require this to be set." This card was the one
       place in the app breaking that promise. */
    var blank = !name;

    var box = document.createElement('div');
    /* surf-paper carries both the background and the text colour, so the
       controls inside it cannot end up light-on-light. See the surfaces
       block at the top of style.css. */
    box.className = 'who-card surf-paper' + (blank ? ' is-blank' : '') + (openWho ? ' is-open' : '');

    /* The collapsed line: who the app thinks you are, and a way in.
       Opened automatically while either field is still missing, because a
       summary reading 'someone, unspecified' is not worth a tap. */
    if (!blank && !openWho){
      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'who-summary';
      var whoTxt = document.createElement('span');
      whoTxt.className = 'who-summary-name';
      whoTxt.textContent = name;
      row.appendChild(whoTxt);
      var gTxt = document.createElement('span');
      gTxt.className = 'who-summary-g';
      gTxt.textContent = genderWord(g);
      row.appendChild(gTxt);
      var edit = document.createElement('span');
      edit.className = 'who-summary-edit';
      edit.textContent = t('stRename');
      row.appendChild(edit);
      row.addEventListener('click', function(){ openWho = true; hub(); });
      box.appendChild(row);
      return box;
    }

    var h = document.createElement('h2');
    h.className = 'who-head';
    h.textContent = t('whoHead');
    box.appendChild(h);

    var note = document.createElement('p');
    note.className = 'who-note';
    note.textContent = t('whoNote');
    box.appendChild(note);

    var row2 = document.createElement('div');
    row2.className = 'who-row';
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'who-input';
    input.value = name;
    input.placeholder = t('stNamePlaceholder');
    input.setAttribute('aria-label', t('stNamePlaceholder'));
    row2.appendChild(input);
    box.appendChild(row2);

    var gl = document.createElement('span');
    gl.className = 'who-label';
    gl.textContent = t('stGenderHead');
    box.appendChild(gl);

    var chosenG = g;
    var toggle = document.createElement('div');
    toggle.className = 'mode-toggle who-toggle';
    [['f', 'stGenderF'], ['m', 'stGenderM'], ['', 'stGenderNone']].forEach(function(pair){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t(pair[1]);
      b.setAttribute('aria-pressed', chosenG === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        chosenG = pair[0];
        var all = toggle.querySelectorAll('button');
        for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-pressed', 'true');
      });
      toggle.appendChild(b);
    });
    box.appendChild(toggle);

    var acts = document.createElement('div');
    acts.className = 'who-acts';

    var save = document.createElement('button');
    save.type = 'button';
    save.className = 'btn btn-primary';
    save.textContent = t('stSave');
    save.addEventListener('click', function(){
      var fresh = (input.value || '').trim();
      var had = (GH.player.current().name || '').trim();
      GH.player.rename(GH.player.id(), fresh);
      GH.player.setGender(GH.player.id(), chosenG);
      /* Being told a name and answering 'hello again' is the wrong reply —
         it is the first time the app can use it, so treat it as arriving.
         Only when the name actually changed, or every save re-greets. */
      if (GH.coach) GH.coach.regreet(!!fresh && fresh !== had);
      openWho = false;
      hub();
    });
    acts.appendChild(save);

    /* Only offered once there is something to collapse back to. */
    if (!blank){
      var shut = document.createElement('button');
      shut.type = 'button';
      shut.className = 'btn btn-ghost';
      shut.textContent = t('whoLater');
      shut.addEventListener('click', function(){ openWho = false; hub(); });
      acts.appendChild(shut);
    }

    box.appendChild(acts);
    return box;
  }

  /* Where she was on the hub when she left it.

     Every launch below clears the view and hands it to an activity, and
     coming back rebuilds the hub from scratch — which put her at the top
     of a very long page every time, however far down the section she had
     been playing from. Recorded on the way out, restored on the way back.

     Restored without smooth behaviour and after the page has been
     painted, so it lands rather than animating up from the top. */
  var hubScroll = 0;

  /* Declared here rather than beside petStrip() because leaving() below
     clears them, and a var used forty lines above its declaration reads as
     a bug even though hoisting makes it work. */
  var sawPet = null;          /* the pet's greeting, once per arrival */
  /* Everything the pet says and offers, handed to its card. Nothing is
     drawn below the card any more — see the note in hub(). Both cleared
     on every paint. */
  var petSays = [];
  var petGo = null;

  function leaving(){
    hubScroll = window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) || 0;
    /* The pet greets once per ARRIVAL, and leaving is what makes the next
       paint an arrival. Without this it would speak once ever, because
       `sawPet` is set on the first paint and the hub repaints on every
       language switch, filter change and return from a game.

       The grid is not this file's business any more: it is an overlay in
       petstrip.js, and it closes itself. */
    sawPet = null;
    /* And whatever she was doing has ended. */
    closeActivity();
    /* The new screen starts at the top. Recorded ABOVE first, so coming
       back still lands where she was on the hub. */
    if (GH.nav && GH.nav.top) GH.nav.top();
  }

  function restoreScroll(){
    if (!hubScroll || !window.scrollTo) return;
    var y = hubScroll;
    /* Consumed, not kept. The jump bar scrolls to a section itself and the
       filter row rebuilds the hub — either would be dragged back to a
       stale position by a restore that fires every time. This one is for
       coming back from an activity, which happens once. */
    hubScroll = 0;
    /* after paint: the page has to be tall enough to scroll to before the
       browser will honour it */
    if (window.requestAnimationFrame) window.requestAnimationFrame(function(){ window.scrollTo(0, y); });
    else window.scrollTo(0, y);
  }

  /* Handing a screen over, and remembering how to redraw it.

     GH.app.redraw is what the language switch calls. hub() sets it to
     itself, so any activity that did not overwrite it sent her back to
     the top of the main page the moment she touched РУС / DEU / ENG —
     mid-song, mid-round, mid-story. Three activities set it and eighteen
     did not.

     So the hand-off is wrapped once here rather than trusted to every
     activity. The default is to reopen the same activity, which keeps her
     where she is at the cost of its internal position — back at the song
     list rather than in the song. An activity that can do better sets
     GH.app.redraw itself inside open(), the way comic.js and the reader
     do, and this never overwrites that: it is set BEFORE open() runs, so
     open() has the last word. */
  function launch(fn, id){
    /* Every activity is handed off through here, so this is where the event
       log is told what she is using. Doing it in the activities would be
       forty-five call sites and forty-five chances to pass the wrong name;
       doing it here means a game added next month is attributed without
       being told to be.

       Set BEFORE fn() runs, so anything the activity grades on its first
       paint is already attributed. */
    if (GH.events){
      /* Close the previous activity before opening the next. She can go
         game -> game without touching the hub, and without this the first
         one would never record a leave. */
      closeActivity();
      GH.events.setGame(id || '');
      GH.events.opened(id || '');
      openId = id || '';
      openAt = GH.events.graded();
      openedAt = Date.now();
    }
    GH.app.redraw = function(){ view.textContent = ''; fn(); };
    view.textContent = '';
    fn();

    /* TELL THE TOUR A NEW SCREEN EXISTS — ONCE, HERE.

       `nav.ready()` is what `butler.js`'s `resume()` hangs off, so a tour
       step landing on a screen can find and arm what it points at. Every
       activity is SUPPOSED to call it after painting, and ten of them
       never did: awards-view, progress-view, store, songbook, reference,
       settings, refguide, catch-word, conveyor, wrong-form.

       On those the tour fell through to `waitForPaint`'s 700ms deadline
       instead, which is a race. Lose it and the step draws before the
       screen's `.backlink` exists, fails to arm, and then asks her to
       press a back button it never attached to — tapping it navigates
       away without advancing. Steven hit exactly that on the Quick Tour's
       Achievements step, 09 Sep.

       Here rather than in ten files: `launch()` is the single door every
       activity is opened through, the same reason the event log is
       written here and not at forty-five call sites.

       SAFE TO CALL TWICE, checked before adding: `armHistory()` returns
       early on `pushed`, and `resume()` redraws the current step without
       moving the index. So the screens that already call it are
       unaffected.

       Not a substitute for an activity calling it after ITS OWN later
       repaints — reader.js and comic.js still do that, and must. */
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  /* What she was in, and how many answers the log held when she went in.
     The difference on the way out is how many she gave — which makes a
     bounce visible, and a bounce is the one thing the answer log can never
     show on its own. */
  var openId = '';
  var openAt = 0;
  var openedAt = 0;

  function closeActivity(){
    if (!GH.events || !openId) return;
    GH.events.left(openId,
      Math.max(0, GH.events.graded() - openAt),
      openedAt ? Date.now() - openedAt : 0);
    openId = '';
    openAt = 0;
    openedAt = 0;
  }

  /* SHE DOES NOT ALWAYS LEAVE BY THE BACK BUTTON.

     Closing the tab, switching apps, the phone locking — none of those ran
     `leaving()`, so the LAST activity of every single session had an open
     row and no leave row. Its duration was lost, and it was always the
     activity she was most engaged with, because it is the one she was still
     in.

     `visibilitychange` to hidden is the event that actually fires on a
     phone; `pagehide` covers the desktop close. `beforeunload` is
     deliberately not used — it is unreliable on iOS and firing three
     handlers for one departure would record three leaves.

     Switching apps for a moment and coming back must not lose the rest of
     the visit, so the activity is remembered in `pausedIn` and the clock
     restarted when she returns. Without that, everything after her first
     app-switch would be untimed, and a phone user switches away
     constantly.

     `closeActivity()` clears `openId`, so a second hide is a no-op. */
  var pausedIn = '';

  function pause(){
    if (!openId) return;
    pausedIn = openId;
    closeActivity();
  }

  function resume(){
    if (!pausedIn || openId) return;
    /* A second open row, deliberately: she did come back to it, and two
       visits of four minutes is a truer picture than one of eight. */
    if (GH.events){
      GH.events.opened(pausedIn);
      openId = pausedIn;
      openAt = GH.events.graded();
      openedAt = Date.now();
    }
    pausedIn = '';
  }

  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') pause();
    else resume();
  });
  window.addEventListener('pagehide', pause);

  /* ---------- her pets, at the top ----------

     A row of small faces above the greeting, and a grid behind them.
     Tapping an unowned pet in the grid goes to the store AT that pet
     rather than at the top of a shelf of sixteen.

     The pet speaks once per arrival, not once per paint. `sawPet` is
     cleared by leaving() the way the coach's greeting is, so switching
     language or coming back from a game does not make the pet repeat
     itself — one utterance per screen entry was the rule from the pet
     brief and it applies here more than anywhere, because the hub
     repaints often. */
  function petSpeak(pets){
    if (sawPet !== null) return sawPet;
    sawPet = '';
    if (!GH.petVoice || !GH.petVoice.bandLine || !pets.length) return sawPet;
    /* The first of her chosen pets does the talking. With three on the
       shelf, three greetings on arrival is noise. */
    var line = GH.petVoice.bandLine(pets[0].id, 'welcome');
    if (line) sawPet = line;
    return sawPet;
  }

  /* The FACES live in the header now — see js/petstrip.js. What stays here
     is the one thing that does not belong in a header: the sentence.

     A line of dialogue in a topbar is a banner, and it would follow her
     into every round. The pet brief's rule is one utterance per screen
     entry, and the hub is the entry. */
  function petStrip(){
    var pets = GH.store.strip();

    /* NO PET? WADDLES STANDS IN.

       Steven, 09 Sep: "I don't ever want to see ANY suggestions without
       being in the pet window. If no pet? Have Waddles fill in."

       Before her first pet there was nobody to carry the card, so the
       suggestions had nowhere to live — which is why they used to be
       drawn below it. The butler already has a portrait and a name in
       data/butler-script.js, so he takes the card until a pet does.

       Only the face and the name are borrowed. The greeting stays a pet's
       to give; a stand-in card carries the suggestions alone. */
    var standIn = null;
    if (!pets.length){
      var sc = window.GH_BUTLER;
      if (!sc || !petSays.length) return;
      standIn = { name:sc.name || 'Waddles', src:sc.perchFace || sc.portrait || '' };
    }

    /* A stand-in has no line of its own — see the note above. */
    var line = standIn ? null : petSpeak(pets);
    if (!line && !standIn && !petSays.length) return;

    var wrap = el('div', 'pt-strip');
    var say = el('button', 'pt-strip-say');
    say.type = 'button';

    /* The pet doing the talking, at a size where she can see it.

       The 26px face in the header is a control — enough to tell which
       animal and to be tapped. A card with a paragraph of speech in it and
       a thumbnail the size of a full stop does not look like the pet is
       speaking; it looks like a caption. So the greeting gets its own
       portrait.

       `pets[0]` is the speaker — petSpeak() picks the first of her chosen
       pets, because three greetings on arrival is noise — and `pic` here is
       a fresh element: strip() builds new <img>s per call, so the one in
       the header is not stolen. */
    if (pets[0] && pets[0].pic){
      pets[0].pic.classList.add('pt-strip-face');
      say.appendChild(pets[0].pic);
    } else if (standIn && standIn.src){
      var si = document.createElement('img');
      si.className = 'pt-strip-face';
      si.src = GH.build ? GH.build.url(standIn.src) : standIn.src;
      si.alt = '';
      say.appendChild(si);
    }

    var words = el('span', 'pt-strip-words');
    /* Whose voice it is. With three pets on the shelf the portrait alone
       is not always enough, and the name is the reason she chose it. */
    words.appendChild(el('span', 'pt-strip-who',
      pets[0] ? pets[0].name : (standIn ? standIn.name : '')));
    /* German first, her language under it, and the German is what is
       spoken — the same rule as every other surface. */
    if (line){
      words.appendChild(el('span', 'pt-strip-de', line.de));
      if (line.tr) words.appendChild(el('span', 'pt-strip-tr', line.tr));
    }

    /* WHAT IS DUE, SAID BY THE PET.

       Steven, 09 Sep: "that message has to be moved into the pet thing —
       pet has to say this."

       It used to be its own `.nx-card` under the greeting: a second box
       saying a second thing, in a column that already had the pet
       talking. The pet is the one voice on this screen, so the count
       belongs in its mouth rather than in a panel beside it.

       Set by the block further down that asks the scheduler what is
       waiting; empty when nothing is. The Start button stays in its own
       card because it is an action, not something said. */
    /* Each on its own line: the quest count, the named quest, then what
       is due. Order matters — the quests pay and expire at midnight, the
       review is there tomorrow. */
    petSays.forEach(function(txt){
      words.appendChild(el('span', 'pt-strip-due', txt));
    });

    say.appendChild(words);

    if (line) say.addEventListener('click', function(){ GH.speech.say(line.say); });
    wrap.appendChild(say);

    /* THE BUTTONS LIVE IN THE PET'S CARD, and outside `say`.

       Inside the card because Steven wants one window rather than a
       greeting with panels stacked under it. Outside `say` because that
       element owns its own tap — it speaks the line — and a button nested
       in it would make one tap mean two things depending on where it
       landed.

       Crystals only while quests remain: when the day is finished the pet
       still says so, but there is nowhere left to send her. */
    var acts = el('div', 'pt-strip-acts');

    if (GH.questDay && GH.questDay.todays && GH.questDay.todays().length
        && !GH.questDay.allDone()){
      var qAct = GH.app.find && GH.app.find('crystals');
      if (qAct){
        var qGo = el('button', 'btn btn-primary pt-strip-go', t('petToCrystals'));
        qGo.type = 'button';
        qGo.addEventListener('click', function(ev){
          if (ev && ev.stopPropagation) ev.stopPropagation();
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ qAct.open(view, hub); }, 'crystals');
        });
        acts.appendChild(qGo);
      }
    }

    if (petGo){
      var go = el('button', 'btn btn-ghost pt-strip-go',
        /* No longer names the game — Steven, 10 Sep: it is "Daily pet
           task", a standing label rather than a description of whichever
           activity the scheduler picked. */
        t('petToActivity'));
      go.type = 'button';
      go.addEventListener('click', function(ev){
        if (ev && ev.stopPropagation) ev.stopPropagation();
        GH.speech.stop();
        leaving();
        view.textContent = '';
        launch(function(){ petGo.act.open(view, hub); }, petGo.id);
      });
      acts.appendChild(go);
    }

    /* INTO `say`, WHICH IS THE VISIBLE CARD.

       `.pt-strip-say` is what has the background, the padding and the left
       rule — `wrap` is just the element around it. Appending the buttons
       to `wrap` put them OUTSIDE the box, unstyled, sitting on the page
       background: exactly the "suggestion below the pet window" Steven
       has now asked to be rid of repeatedly, reintroduced by me while
       claiming to have removed it.

       `say` owns a click that speaks the line, so each button stops the
       event rather than letting it reach that handler — see the
       stopPropagation on both. */
    if (acts.childNodes.length) say.appendChild(acts);

    view.appendChild(wrap);

    /* The header's faces can be stale: she may have bought or swapped a
       pet since it was built. */
    if (GH.petStrip) GH.petStrip.refresh();
  }

  /* A NEW BUILD IS AVAILABLE.

     It offers; it does not reload. Reloading under someone mid-round throws
     the round away, and an app that restarts without being asked is
     frightening rather than helpful.

     Dismissable, and dismissing lasts for the session — she is allowed to
     not care. It reappears next time she opens the app, because eventually
     she does need the new one. */
  var updateShown = false;
  var updateHidden = false;

  function updateBar(){
    if (updateShown || updateHidden) return;
    if (!GH.build || !GH.build.pending()) return;
    updateShown = true;

    var bar = el('div', 'update-bar');
    bar.appendChild(el('span', 'update-msg', GH.i18n.t('upNew')));

    var go = el('button', 'update-go', GH.i18n.t('upReload'));
    go.type = 'button';
    go.addEventListener('click', function(){ GH.build.reload(); });
    bar.appendChild(go);

    var no = el('button', 'update-no', '\u00d7');
    no.type = 'button';
    no.setAttribute('aria-label', GH.i18n.t('close'));
    no.addEventListener('click', function(){
      updateHidden = true;
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    });
    bar.appendChild(no);

    document.body.appendChild(bar);
  }

  /* NOTHING MODAL SURVIVES A TRIP TO THE HUB.

     The pet-purchase window locks body scrolling while it is open and
     unlocks it when dismissed. If it is ever left behind — a repaint
     under it, a route change, a crash mid-animation — the lock stays and
     the page will not scroll. Steven's iPhone, 10 Sep: "can't see below
     lessons."

     The hub is the one screen everything returns to, so it is the right
     place to guarantee the page is scrollable. */
  function clearModals(){
    var stray = document.querySelectorAll('.pt-got-wrap');
    for (var i = 0; i < stray.length; i++){
      if (stray[i].parentNode) stray[i].parentNode.removeChild(stray[i]);
    }
    if (document.body.style.overflow === 'hidden'){
      document.body.style.overflow = '';
    }
  }

  function hub(){
    clearModals();
    GH.speech.stop();
    GH.app.redraw = hub;
    view.textContent = '';

    /* The butler, on arrival and only on the hub. He decides for himself
       whether he is due — a written offer line, at least one tour with
       steps, first visit, not dismissed — so this is one line and no
       conditions.

       That list is longer than it was because "script present" was not
       enough: the script ships as an object full of empty strings, which
       is truthy, and he opened an empty bubble over the whole page with
       nothing to close it with. */
    /* FIRST RUN COMES FIRST.

       Before Waddles can use her name, something has to ask for it. The
       welcome takes over the screen only on a genuinely fresh install and
       hands straight to him when it is done — so she tells the app her
       name and the very next thing that happens is someone using it.

       WHEN IT FINISHES, THE HUB IS DRAWN AGAIN — not the butler directly.

       The early return below skips everything that fills the hub, and
       `view.textContent = ''` has already emptied it. So handing straight
       to the butler left her on a blank page with a header and nothing
       else: the whole site, gone, right after she typed her name.

       Calling `hub()` again is the fix and the honest one. The welcome is
       no longer due the second time through, so it falls past this line,
       paints normally, and offers the butler at the end like any other
       visit. One code path, not two. */
    if (GH.welcome && GH.welcome.open(hub)) return;

    /* HE IS ALWAYS REACHABLE FROM THE HEADER.

       Steven: "There's no icon for waddles at the top. He's the only
       thing that will let you get a tour of the site and without him,
       there's no explanation of what's in the inside or how to find
       anything or how to do anything."

       `offer()` only speaks up when `due()` says so — once per visit, and
       never again after the tour is finished or refused for good. The
       perch was the way back, but it was only ever CREATED on a refusal,
       so finishing the tour, or dismissing him for good, removed the only
       route to the one thing that explains the site.

       So the perch is mounted first and unconditionally. `false` means no
       flash: a permanent control should not blink at her every time she
       loads the hub. `perch()` itself is idempotent — it returns early if
       one is already there. */
    if (GH.butler && GH.butler.perch) GH.butler.perch(false);

    if (GH.butler) GH.butler.offer();

    /* She is here, so today counts — recorded before anything can decide
       not to. coach.js counts a day inside greeting(), which is only
       called below when the coach is unmuted, so muting the encouraging
       sentence quietly stopped the attendance count. This is not attached
       to anything she can switch off.

       And the current activity is cleared. An answer with no activity is
       honest; an answer attributed to the last screen she was on is a lie
       in the data. */
    if (GH.events){ GH.events.visit(); GH.events.setGame(''); }
    /* Once a day, on arrival at the hub. Silent in every failure case, and
       silent entirely until an endpoint is configured. */
    if (GH.send && GH.send.maybe) GH.send.maybe();

    /* Is she running an old build? Asked here rather than on a timer, so it
       happens when she arrives at the hub and never while she is mid-round.
       Rate-limited inside GH.build to once every twenty minutes. */
    if (GH.build && GH.build.check){
      GH.build.check(function(){ updateBar(); });
      if (GH.build.pending()) updateBar();
    }

    /* before anything else, because it changes what everything else says */
    view.appendChild(whoCard());

    /* Her pets, and one of them speaking.

       Sixteen pets, a `welcome` line written for every one of them, and
       until now the pet only ever appeared on the end screen — so buying
       Mimi bought a thing that showed up after a round and was absent from
       the screen she opens. The lines existed for months; nothing greeted
       her. */
    /* WORK OUT WHAT IS DUE BEFORE THE PET SPEAKS.

       `petStrip()` paints the pet's card, and the due sentence now lives
       inside it — so the count has to exist by the time that runs. The
       block further down still owns the Start button; this only asks the
       scheduler the question early and holds the answer in `nxLine`.

       Measured the wrong way round first: setting `nxLine` down there left
       it empty on every paint, because the pet card had already been
       built and appended. */
    /* EVERYTHING THE PET SAYS, WORKED OUT BEFORE IT SPEAKS.

       Steven, 09 Sep: "the pets should offer 3 things: crystal quests
       (links you to crystals section), 1 unique pet quest, and show how
       many of your daily activities you have done. No links to quests
       should exist below the pet window."

       So the hub no longer draws anything under the pet. The count, the
       named quest, the review line and both buttons all live in the one
       card, which is what makes it the pet's window rather than a
       greeting with panels stacked beneath it.

       THE NAMED QUEST IS DRAWN FROM TODAY'S UNDONE LIST, not from a
       per-pet pool — there isn't one. `data/quests-data.js` is a single
       shared set with no pet association, so "Ember's own quest" does not
       exist as a concept yet. Naming one of the five she has not finished
       reads as the pet picking something for her, and uses only data that
       is already there. A genuinely per-pet quest needs a field on each
       pet and a tag on each quest.

       `questday.todays()` supplies the draw and its `done` flags, and
       `rules().perDay` owns the number five. Nothing here invents either,
       so changing the draw size changes what the pet says. */
    petSays = [];
    petGo = null;
    var nxEarly = null;

    /* IT GREETS HER BEFORE IT ASKS ANYTHING.

       Steven, 10 Sep: "that should be below a greeting — like hello and
       welcome, not 'hey, you walk in the front door, here is a list of
       chores'."

       A pet already opens with its own line, in character. A stand-in
       has none, so it went straight to the count — which is exactly the
       clipboard-at-the-door feeling. This is the stand-in's hello. */
    var hasPet = !!(GH.store && GH.store.strip && GH.store.strip().length);
    if (!hasPet) petSays.push(t('petHello'));

    /* THE FIVE A DAY, NOT THE THREE QUESTS.

       Steven: "he says I have completed 0 of my 3 daily activities, it
       should say 5." They were two different things. `questDay.todays()`
       is the daily QUEST draw, which is three. The five she counts toward
       is `coins.rates.target` — five finished activities, worth the
       100-crystal bonus, and the number every gate in the app is built
       around. The pet was reporting the wrong one.

       Read from coins, so if the target ever moves the sentence moves
       with it.

       GENDERED RUSSIAN. "You have completed" is a past tense and Russian
       marks the doer — выполнил against выполнила. `t()` returns the key
       itself when a string is missing, so an unmatched lookup must never
       reach the screen. */
    /* `rates` is an OBJECT, not a function — coins.js exports it as a
       literal. Calling it throws, which would take the whole hub paint
       down with it. */
    var rates  = (GH.coins && GH.coins.rates) ? GH.coins.rates : null;
    var target = (rates && rates.target) ? rates.target : 5;
    var didDay = (GH.coins && GH.coins.dayCount) ? GH.coins.dayCount() : 0;

    if (didDay >= target){
      petSays.push(t('petQuestAllDone', { n:target }));
    } else {
      var line = null;
      if (GH.i18n.lang() === 'ru'
          && GH.player && GH.player.gender && GH.player.gender() === 'm'){
        var mk = t('petQuestCountM', { a:didDay, n:target });
        if (mk && mk !== 'petQuestCountM') line = mk;
      }
      petSays.push(line || t('petQuestCount', { a:didDay, n:target }));
    }

    /* One quest by name, if any are unfinished. The COUNT of quests is
       deliberately not said — the line above already answers "how am I
       doing today", and two counts in one breath is a status report
       rather than a greeting. */
    var qs = (GH.questDay && GH.questDay.todays) ? GH.questDay.todays() : [];
    var open_ = qs.filter(function(q){ return !q.done; });
    if (open_.length){
      petSays.push(t('petQuestPick', { q:GH.i18n.pick(open_[0].label) }));
    }

    if (GH.tutor && GH.tutor.whatNext && GH.coach && !GH.coach.muted()){
      nxEarly = GH.tutor.whatNext();
      if (nxEarly && nxEarly.due) petSays.push(t('petReview', { n:nxEarly.due }));
      if (nxEarly && nxEarly.game){
        var act0 = GH.app.find && GH.app.find(nxEarly.game);
        if (act0) petGo = { act:act0, id:nxEarly.game };
      }
    }

    /* Never an empty mouth: a pet that greets her and then says nothing
       reads as broken rather than as a quiet day. */
    if (!petSays.length) petSays.push(t('petNothing'));

    if (GH.store && GH.store.strip) petStrip();

    /* The purse used to be printed here. It is in the HEADER now — visible
       on every screen instead of this one, and tappable, which is the whole
       point: the balance is the door to the store.

       Removed rather than kept alongside, because the same number twice on
       one screen makes both look like decoration. */
    if (GH.purse) GH.purse.refresh();

    /* HER PET GREETS HER, SO THE COACH NO LONGER SAYS IT TWICE.

       petStrip() above already greets her by name and in character — "Oh.
       Du bist wieder da, Steven. Mein Horn hat es gemerkt." — and this
       printed "Hello again, Steven. Back to some German." directly
       underneath it. The same sentence twice, with the plain one second.
       Greeting is the pet's job and the pet is better at it.

       THE CALL STAYS, AND MUST. greeting() is not a getter: decide()
       inside it is what increments the day count, the streak and the best
       streak, and awards.js reads all three back through
       GH.coach.stats(). Deleting the call along with the paragraph would
       have silently stopped her streak and every day-count achievement.

       Separately, and NOT fixed here because it is not what this change
       is: the call sits behind !muted(), so muting the coach already stops
       the streak counting today. Same class of bug as the one the comment
       above GH.events.visit() describes, in the one place it was not
       fixed. */
    if (GH.coach && !GH.coach.muted()) GH.coach.greeting();

    /* NOTHING IS DRAWN UNDER THE PET ANY MORE.

       Two cards used to sit here: one for the scheduler's suggestion and
       one for the quests. Steven, 09 Sep: "No links to quests should
       exist below the pet window at the top of the main page."

       Both moved INTO the pet's card — the lines it speaks and the two
       buttons beside them. See the block above that fills `petSays` and
       `petGo`, and the note by `.pt-strip-acts` where they are drawn.

       `nxEarly` is still computed up there, because the pet's review line
       and its Start button both come from it. It just no longer paints
       anything of its own down here. */

    jumps = [];

    /* THE HUB HEADING IS GONE. Steven, 09 Sep: "lose this waste of space
       too — What do you want to practice?"

       It asked a question the page below already answers, and it did it
       between the pet's card and the sections themselves, pushing the
       thing she came for further down the screen. The eyebrow above it
       went with it: a language list over a heading that no longer exists
       is a label for nothing.

       `hubTitle` is left in i18n.js unused rather than deleted, in case
       the heading is wanted back somewhere else. */
    /* `hubLede` USED TO SIT HERE AND DESCRIBED THE WRONG THING.

       "Hear the sentence, fill in the missing word, hear it again" is
       fill-blank — Section 1, one of eight — printed directly under a
       heading that asks what she wants to practise out of all of them. A
       leftover from when this site was only sentences.

       Removed rather than moved: no other section carries a description,
       so giving one to Section 1 alone would make it look like the odd one
       out rather than the explained one.

       THE STRING IS STILL IN i18n.js in all three languages. Steven wrote
       it, it is correct about what it describes, and restoring it anywhere
       is one line. */

    /* sentences by topic */
    var cats = GH_BANK.categories || [];
    var sec = section('sentencesHead', t('byTopic'));
    cats.filter(function(c){ return keep(c.id); }).forEach(function(cat){
      var list = sentencesIn(cat.id);
      var blanks = list.reduce(function(sum, s){ return sum + countBlanks(s); }, 0);
      sec._tiles.appendChild(tile(
        cat.glyph,
        GH.i18n.pick(cat),
        t('itemsN', { n:list.length }),
        t('blanksN', { n:blanks }),
        list.length ? function(){ openSentences(cat); } : null,
        'fill-blank:' + cat.id
      ));
    });
    capTiles(sec, 'sentences');
    if (sec._tiles.children.length) view.appendChild(sec); else jumps.pop();

    /* stories */
    var stories = GH_BANK.stories || [];
    var shown2 = stories.filter(function(x){ return keep(x.cat); });
    var sec2 = section('storiesHead', t('storiesN', { n:shown2.length }));
    shown2.forEach(function(story){
      var blanks = (story.sentences || []).reduce(function(sum, s){ return sum + countBlanks(s); }, 0);
      var cat = cats.filter(function(c){ return c.id === story.cat; })[0];
      sec2._tiles.appendChild(tile(
        /* THE STORY'S OWN TOPIC, not a book for all of them.

           `cat` is looked up right above this and used on the next line but
           one for the footer, so the topic glyph was already in hand and a
           hardcoded 📖 was printed over it. Twelve stories, twelve identical
           icons, in a section where the icon is the only thing the eye can
           use to tell one card from another at a glance.

           Falls back to the book where a story has no category, which is a
           real state — nothing requires `story.cat` to match a known one. */
        (cat && cat.glyph) || '📖',
        GH.i18n.pick(story.title),
        t('itemsN', { n:(story.sentences || []).length }),
        cat ? GH.i18n.pick(cat) + ' · ' + t('blanksN', { n:blanks }) : t('blanksN', { n:blanks }),
        function(){ openStory(story); },
        'story:' + (story.id || story.cat)
      ));
    });
    capTiles(sec2, 'stories');
    if (sec2._tiles.children.length) view.appendChild(sec2); else jumps.pop();

    /* vocab sets: words first, then the sentences that use them */
    if (window.GH_VOCAB && GH.vocab){
      var sec25 = section('vocabHead', t('byTopic'));
      var any = false;
      /* the original eight plus the vocabulary-only topics */
      allTopics().filter(function(c){ return keep(c.id); }).forEach(function(cat){
        GH.vocab.setsFor(cat.id).forEach(function(set, i){
          any = true;
          sec25._tiles.appendChild(tile(
            cat.glyph,
            GH.i18n.pick(cat) + ' ' + (i + 1),
            t('vocabSetN', { n:set.length }),
            set.slice(0, 3).map(function(w){ return w.de; }).join(' · '),
            function(){ openVocab(cat, set, i + 1); },
            'vocab:' + cat.id
          ));
        });
      });
      capTiles(sec25, 'vocab');
      if (any) view.appendChild(sec25); else jumps.pop();
    }

    /* Section 4: longer stories, one blank per sentence */
    if (window.GH_LONG && GH_LONG.length){
      var shown4 = GH_LONG.filter(function(x){ return keep(x.cat); });
      var sec4 = section('longStoriesHead', t('storiesN', { n:shown4.length }));
      shown4.forEach(function(story){
        var c = cats.filter(function(x){ return x.id === story.cat; })[0];
        sec4._tiles.appendChild(tile(
          /* Same as Section 2 above: the topic it is about, falling back to
             the stack of books where there is no category to name. */
          (c && c.glyph) || '📚',
          GH.i18n.pick(story.title),
          t('itemsN', { n:story.sentences.length }),
          c ? GH.i18n.pick(c) : null,
          function(){ openLongStory(story); },
          'long-story:' + (story.id || story.cat)
        ));
      });
      capTiles(sec4, 'long');
      if (sec4._tiles.children.length) view.appendChild(sec4); else jumps.pop();
    }

    /* Lessons, in their own row above the games.

       A lesson is where a rule is learned and a game is where it is
       drilled. Doing those in the other order is how a game becomes
       guessing, so the row sits above. */
    /* Two kinds of thing live here now: the seventeen grammar lessons,
       which GH.lessons owns, and anything that registers with
       `kind:'lesson'` — which is how Tanya's course lessons arrive, and
       how the next set will.

       The registered ones come FIRST. Hers are what she is being taught
       this month; the grammar lessons are a permanent library and can
       wait below. */
    var taught = extras.filter(function(a){ return a.kind === 'lesson'; });
    /* THE SEVENTEEN GRAMMAR LESSONS ARE GERMAN. haben-or-sein, separable
       verbs, der/die/das, the two-way prepositions — every one is about
       German and none has an English or Russian counterpart. Empty on
       another course, same as the grammar reference they link to.

       Word Lab and Tanya's own course lessons come through `extras` as
       `kind:'lesson'` and are NOT filtered here: those are vocabulary
       sets, and packs.js hands them the language being learned. */
    /* The language check now lives inside `GH.lessons.all()` — it returns
       the lessons for the target she is learning and nothing else. */
    var grammarLessons = (GH.lessons && GH.lessons.all()) || [];

    /* Named rather than inline, so the overview list below can open the
       exact same lesson the same way a tile does \u2014 one place that
       decides what "open lesson X" means, not two that have to be kept
       in step. */
    if (taught.length || grammarLessons.length){
      var secL = section('lsHead');

      /* Steven: "For the section Lessons there is like around 20
         lessons. A button at the top that lets you get an overview of
         all lessons would be helpful." \u2014 a compact list next to the big
         tile grid, so she can scan titles instead of scrolling past
         twenty cards to find one. Only worth showing once there is
         actually a list to overview. */
      if (taught.length + grammarLessons.length > 1){
        var lsHead = secL.querySelector('.hub-head');
        var overviewBtn = el('button', 'btn btn-quiet', t('lsOverview'));
        overviewBtn.type = 'button';
        overviewBtn.addEventListener('click', function(){
          openLessonsOverview(taught, grammarLessons,
            openTaughtLesson, openGrammarLesson);
        });
        if (lsHead) lsHead.appendChild(overviewBtn);
      }

      taught.forEach(function(a){
        secL._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name),
          GH.i18n.pick(a.sub), null, function(){ openTaughtLesson(a); }, a.id));
      });

      grammarLessons.forEach(function(l){
        secL._tiles.appendChild(tile(l.glyph || '\ud83d\udcda',
          GH.i18n.pick(l.name), GH.i18n.pick(l.sub),
          GH.lessons.done(l.id) ? '\u2713' : null,
          function(){ openGrammarLesson(l); }));
      });

      /* CAPPED AT FOUR, like the other long sections. Steven: "lessons
         has way more than 8 categories. It should collapse to first 4
         with link to open the rest."

         This section had no cap at all, so around twenty lesson tiles
         ran down the page and pushed everything below Lessons — Words,
         Read and listen, Games, Reference — off the first several
         screens. Four plus a "Show all" is the same treatment
         Sentences, Short stories, Words and Long stories already get.

         AND THE OVERVIEW BUTTON IS THE BETTER DOOR. It is already in
         this section's header and it is a compact scannable list of
         every lesson, which is a far better answer to "where is the one
         I want" than twenty cards. `capTiles` adds the generic Show-all
         underneath; the Overview above it stays the recommended route.

         Read and listen is deliberately NOT capped — see the note at its
         own section. Seven is not a wall, and the three the cap trimmed
         were the comic, the Reader and the dialogues. */
      capTiles(secL, 'lessons');

      view.appendChild(secL);
    }

    /* the word list — reference, not an exercise */
    if (window.GH_VOCAB && GH.reference){
      var secR = section('refHead');

      /* WHAT'S HERE? Same idea as the Games section's `gd-open`, for the
         same reason: eight unrelated destinations, and a glyph plus a
         one-word name does not say which one she wants. Steven, 08 Sep —
         Reference is the site's control centre, so it earns a guide.

         In the header row next to the title, Lessons-style — Steven,
         10 Sep: "fix ALL of the hub descriptions to look like Lessons." */
      if (GH.refguide){
        var rb = el('button', 'btn btn-quiet rg-open', t('rgOpen'));
        rb.type = 'button';
        rb.addEventListener('click', function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){
            GH.refguide.open(view, hub);
          }, 'refguide');
        });
        var rHead = secR.querySelector('.hub-head');
        if (rHead) rHead.appendChild(rb);
      }

      /* how she is doing comes first — it is the thing she opens */
      if (GH.progressView){
        secR._tiles.appendChild(tile('📈', t('pvTitle'), t('pvSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.progressView.open(view, hub); }, 'progress-view');
        }, 'progress-view'));
      }
      secR._tiles.appendChild(tile('📖', t('refTitle'),
        t('refCount', { n:GH_VOCAB.length }), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.reference.open(view, hub); }, 'reference');
        }));
      /* what she has done, and what it buys */
      if (GH.awardsView){
        secR._tiles.appendChild(tile('⭐', t('awTitle'),
          t('awEarnedN', { a:GH.awards.earned(), b:GH.awards.total() }), null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ GH.awardsView.open(view, hub); }, 'awards-view');
          }, 'awards-view'));
      }
      if (GH.store && GH.coins){
        /* tile() takes a glyph STRING, so the character rather than the
           element — see markText() in coins.js. */
        secR._tiles.appendChild(tile(GH.coins.markText(), t('stStore'), GH.coins.label(), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.store.open(view, hub); }, 'store');
        }, 'store'));
      }
      /* who is playing and how questions get chosen */
      if (GH.settings){
        secR._tiles.appendChild(tile('⚙️', t('stTitle'), t('stSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.settings.open(view, hub); }, 'settings');
        }));
      }
      /* Anything else that is reference rather than a game.

         Same opt-in as `kind:'read'` below: an activity says where it
         belongs and this file does not carry a list of ids. The
         dictionary is the first, and it appears only when GH_DICT
         exists — an empty dictionary should show no tile at all. */
      /* A REFERENCE TILE CAN BE FOR ONE LANGUAGE ONLY.
         The games filter below has honoured `onlyDe` all along; this loop
         did not, so a reference page written for one course showed up on
         every course. `onlyEn` is the mirror, carried by the English
         grammar reference (js/activities/eng-grammar.js). Read off the
         entry, so neither this file nor the activity keeps a list. */
      extras.filter(function(a){ return a.kind === 'ref'; }).forEach(function(a){
        if (a.onlyDe && learningTarget() !== 'de') return;
        if (a.onlyEn && learningTarget() !== 'en') return;
        if (a.id === 'dictionary' && !(window.GH_DICT && GH_DICT.length)) return;
        secR._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name),
          GH.i18n.pick(a.sub), null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ a.open(view, hub); }, a.id);
          }, a.id));
      });

      /* the rules, beside the words.

         GERMAN ONLY, same reason as the five German games: the reference
         is German grammar — cases, articles, separable verbs — and there
         is no English or Russian version of it. Hidden on another course
         rather than offered empty. Steven, 08 Sep: "we can dim out the
         grammar section because there is no English grammar created yet."

         `learning` is read once at the top of the games filter below and
         reused here. */
      if (GH.grammar && learningTarget() === 'de'){
        secR._tiles.appendChild(tile('📐', t('grTitle'), t('grSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.grammar.open(view, hub); }, 'grammar');
        }));
      }
      view.appendChild(secR);
    }

    /* Read and listen.

       Everything else in the app asks her a question. These two do not:
       she reads and she listens, and nothing grades her. That is a
       different kind of thing and it was getting lost at the bottom of
       the games row.

       An activity opts in with `kind:'read'` rather than the section
       being a list of ids here — a new one should not need app.js
       edited. */
    var reading = extras.filter(function(a){ return a.kind === 'read'; });
    if (reading.length){
      var secRL = section('rlHead');
      reading.forEach(function(a){
        secRL._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name), GH.i18n.pick(a.sub),
          null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ a.open(view, hub); }, a.id);
          }, a.id));
      });
      /* WHAT'S HERE? The guide that was written and then never reachable
         from the hub. Steven wrote readguide.js's text on 09 Sep and the
         Table of Contents got its `?` — but this section, unlike Games
         and Reference, never got a button, so from the hub the guide did
         not exist. Found 10 Sep; placed in the header row next to the
         title the same day, per "fix ALL of the hub descriptions to look
         like Lessons." */
      if (GH.readguide){
        var rlb = el('button', 'btn btn-quiet rl-open', t('rlOpen'));
        rlb.type = 'button';
        rlb.addEventListener('click', function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){
            GH.readguide.open(view, hub);
          }, 'readguide');
        });
        var rlHead = secRL.querySelector('.hub-head');
        if (rlHead) rlHead.appendChild(rlb);
      }
      /* NOT CAPPED. Steven: "Read and Listen section only has 7 sections,
         I don't want that collapsed.. It hides the comic!"

         SHOW_FIRST is 4 and this section has exactly 7, so three were
         trimmed behind a "Show all 7" button — and the three were the
         comic, the Reader and the dialogues, because the cap keeps load
         order and those load last. So the cap was hiding the three
         biggest pieces of content in the section and showing four
         smaller ones.

         A cap earns its place on a section with eleven games in it,
         where the alternative is a wall. Seven is not a wall, and three
         of seven is not a saving worth burying the comic for. */
      /* capTiles(secRL, 'reading'); */
      view.appendChild(secRL);
    }

    /* anything registered later */
    /* Games is everything that is neither reading nor reference. It used
       to be `kind !== 'read'`, which is a default-yes list: the first
       activity to arrive with a third kind appeared here as well as in
       its own section, twice on one screen, with nothing to say so. */
    /* GERMAN-ONLY ACTIVITIES DISAPPEAR ON ANOTHER COURSE.

       Five games teach German morphology and nothing else: noun gender,
       German plurals, the two-way prepositions, German conjugation, and
       spotting a wrong German verb form. There is no English or Russian
       version of any of them — English has no der/die/das to choose and
       Russian marks case on the noun rather than the preposition.

       So they are hidden rather than served with content they cannot
       teach. `onlyDe` on the activity's own entry, so the game declares
       this about itself instead of app.js keeping a list that drifts.

       The other games follow the target automatically: packs.js hands
       them the language being learned, so nothing here has to know. */
    var learning = learningTarget();
    var games = extras.filter(function(a){
      if (a.kind === 'read' || a.kind === 'ref' || a.kind === 'lesson') return false;
      if (a.onlyDe && learning !== 'de') return false;
      /* A GAME CAN ANSWER FOR ITSELF INSTEAD OF CARRYING A FLAG.

         `onlyDe` above is a hand-set boolean, and a hand-set boolean
         drifts: conveyor was German-only for months without one, and
         served German sentences to an English course until 09 Sep.

         `available()` lets a game ask its own data whether it can run in
         the current target — GH_QUESTION_CUES.hasLang(learning), say.
         Then adding a language is a data change and a missing bank can
         never mean showing the wrong language. Absent means yes, so no
         existing game is affected. */
      if (typeof a.available === 'function'){
        try { if (!a.available(learning)) return false; }
        catch (e){ return false; }
      }
      return true;
    });
    if (games.length){
      var sec3 = section('gamesHead');

      /* What each one IS, before she has to open fifteen of them to find
         out. A glyph and a name do not tell her whether she wants it.

         IN THE HEADER ROW, next to the title — Steven, 10 Sep: "fix ALL
         of the hub descriptions to look like Lessons." The hub-head is
         already flex space-between, so appending puts the link at the
         title's far side, exactly where the Lesson Guide sits. The
         `.gd-open` class stays: the Full Tour points at and taps it. */
      if (GH.guide){
        var gb = el('button', 'btn btn-quiet gd-open', t('gdOpen'));
        gb.type = 'button';
        gb.addEventListener('click', function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){
            GH.guide.open(view, hub, function(a){ play(a); });
          }, 'guide');
        });
        var gHead = sec3.querySelector('.hub-head');
        if (gHead) gHead.appendChild(gb);
      }

      games.forEach(function(a){
        sec3._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name), GH.i18n.pick(a.sub), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ a.open(view, hub); }, a.id);
        }, a.id));
      });
      view.appendChild(sec3);
    }

    /* Nothing matched the filter at all. */
    if (!jumps.length){
      view.appendChild(el('p', 'empty', t('nothingHere')));
    }

    /* Built last so every section is known, inserted first so they sit
       above them. Filter row first, then the jump row. */
    var anchor = jumps.length ? jumps[0].node : null;
    var jb = jumpBar();
    if (jb && anchor) view.insertBefore(jb, anchor);
    var fb = filterBlock();
    view.insertBefore(fb, jb || anchor || null);

    /* the page is complete, so it is now tall enough to scroll */
    restoreScroll();
  }

  /* The overview list: taught lessons first (same order as the tile
     grid), then the grammar library, each row title + subtitle + a
     lock/done mark where the tile grid shows one. Tapping a row closes
     this list and opens that lesson exactly as its tile would. */
  function lessonGuideSub(id, fallback){
    var guide = window.GH_LESSON_GUIDE && window.GH_LESSON_GUIDE[id];
    if (guide){
      var picked = GH.i18n.pick(guide);
      if (picked) return picked;
    }
    return fallback;
  }

  /* LIFTED OUT OF `hub()`. These were nested inside it, so the exported
     `lessonsOverview` below — which the Table of Contents' Lessons guide
     button calls — could not see them and would have thrown.

     Nothing in either depends on hub's scope: `leaving`, `view`, `launch`
     and `hub` are all module-level, which is why lifting them is safe
     rather than a rewrite. */
  function openTaughtLesson(a){
    GH.speech.stop();
    leaving();
    view.textContent = '';
    launch(function(){ a.open(view, hub); }, a.id);
  }
  function openGrammarLesson(l){
    GH.speech.stop();
    leaving();
    view.textContent = '';
    launch(function(){ GH.lessons.open(view, hub, l.id); }, 'lessons');
  }

  /* `exit` is optional and defaults to the hub — which is what the hub's
     own overview button has always wanted. The Table of Contents passes
     its own return path instead, so opening the Lessons guide from the
     contents and pressing back lands her in the contents rather than on
     the front page. */
  function openLessonsOverview(taught, grammarLessons, openTaught, openGrammar, exit){
    GH.speech.stop();
    leaving();
    view.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = GH.back.button(exit || hub);
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('lsOverviewTitle')));
    titles.appendChild(el('p', null, t('lsOverviewSub',
      { n: taught.length + grammarLessons.length })));
    headBar.appendChild(titles);
    view.appendChild(headBar);

    var list = el('div', 'ls-list');

    taught.forEach(function(a){
      var row = el('button', 'ls-entry');
      row.type = 'button';
      row.appendChild(el('span', 'ls-entry-glyph', a.glyph || '📘'));
      var body = el('span', 'ls-entry-body');
      body.appendChild(el('span', 'ls-entry-title', GH.i18n.pick(a.name)));
      var sub = lessonGuideSub(a.id, GH.i18n.pick(a.sub));
      if (sub) body.appendChild(el('span', 'ls-entry-sub', sub));
      row.appendChild(body);
      row.addEventListener('click', function(){ openTaught(a); });
      list.appendChild(row);
    });

    grammarLessons.forEach(function(l){
      var row = el('button', 'ls-entry');
      row.type = 'button';
      row.appendChild(el('span', 'ls-entry-glyph', l.glyph || '📚'));
      var body = el('span', 'ls-entry-body');
      body.appendChild(el('span', 'ls-entry-title', GH.i18n.pick(l.name)));
      var sub = lessonGuideSub(l.id, GH.i18n.pick(l.sub));
      if (sub) body.appendChild(el('span', 'ls-entry-sub', sub));
      row.appendChild(body);
      if (GH.lessons.done(l.id)) row.appendChild(el('span', 'ls-entry-status', '✓'));
      row.addEventListener('click', function(){ openGrammar(l); });
      list.appendChild(row);
    });

    view.appendChild(list);

    /* TO THE TABLE OF CONTENTS, the third of the three section guides to
       carry it. `tocButton` is the label the real contents button already
       uses in all three languages. */
    if (GH.toc && GH.toc.open){
      var tb = el('button', 'btn btn-quiet gd-toc', t('tocButton'));
      tb.type = 'button';
      tb.addEventListener('click', function(){
        GH.app.play({ id:'toc', open:GH.toc.open });
      });
      view.appendChild(tb);
    }
    if (GH.nav) GH.nav.ready();
  }

  function openLongStory(story){
    if (GH.events) GH.events.setGame('long-story');
    var list = (story.sentences || []).map(function(s){
      return { de:s.de, ru:s.ru, en:s.en, blanks:s.blanks, img:s.img, cat:story.cat };
    });
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(story.title),
      subtitle:t('longStoriesHead'),
      cat:story.cat,
      sentences:list,
      ordered:true,
      onExit:hub
    });
  }

  function openVocab(cat, set, num){
    if (GH.events) GH.events.setGame('vocab');
    GH.speech.stop();
    leaving();
    view.textContent = '';
    GH.vocab.mount(view, {
      title:GH.i18n.pick(cat) + ' ' + num,
      set:set,
      onExit:hub
    });
  }

  function openSentences(cat){
    if (GH.events) GH.events.setGame('fill-blank');
    var list = GH.text.shuffle(sentencesIn(cat.id));
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(cat),
      subtitle:t('sentencesHead'),
      cat:cat.id,
      sentences:list,
      onExit:hub
    });
  }

  function openStory(story){
    if (GH.events) GH.events.setGame('story');
    var list = (story.sentences || []).map(function(s){
      return { de:s.de, ru:s.ru, en:s.en, blanks:s.blanks, img:s.img, cat:story.cat };
    });
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(story.title),
      subtitle:t('storiesHead'),
      cat:story.cat,
      sentences:list,
      ordered:true,
      onExit:hub
    });
  }

  /* ---------- L1 → L2 ----------

     Three buttons — РУС DEU ENG — used to sit permanently in the header
     saying only which language the INTERFACE was in. They took 48px of
     every screen and never mentioned the language she is actually here to
     learn.

     Steven's replacement: one small string, `Рус → Нем`, naming both. His
     rule, and it is the one that makes the whole thing coherent —
     EVERYTHING IN THIS CONTROL IS WRITTEN IN L1. A Russian speaker sees
     `Рус → Нем`, not endonyms and not English. Tapping it asks the two
     questions in order.

     L1 IS THE INTERFACE LANGUAGE. There is no second store for it and
     there must not be: `GH.i18n.lang()` already is her language, and a
     separate `nativeLanguage` beside it would be two sources of truth that
     drift the first time one is set without the other.

     L2 IS `GH.player.target()`, which has existed all along — every
     progress key runs through `GH.player.scope()` and carries it. */

  /* Step one is the ONE screen that cannot be translated, because it runs
     before she has told us anything. Endonyms solve it outright: `Русский`
     reads correctly to the person who needs it whatever the app is set to,
     and this list never needs a translator again — including for languages
     added later. */
  var ENDONYM = { ru:'Русский', de:'Deutsch', en:'English',
                  es:'Español', fr:'Français', tl:'Tagalog', ga:'Gaeilge' };

  /* L1 can only be a language the interface exists in. Offering French as a
     native language would handto her an app written in something else. */
  var UI_LANGS = ['ru', 'de', 'en'];

  /* L2 offers everything i18n can name, but only the ones with a course
     behind them are selectable. Every data file in this app is German;
     a picker that lets her choose Spanish and then shows her an empty app
     is worse than one that says "not yet" out loud. */
  var TARGETS = ['de', 'ru', 'es', 'fr', 'tl', 'en', 'ga'];
  /* WHICH TARGETS HAVE ENOUGH CONTENT TO BE A COURSE.

     German, English and Russian, as of 08 Sep. Measured rather than
     assumed: every word, every example sentence, and every line of every
     story, poem, article and dialogue carries all three languages with
     zero gaps. The games follow because the language swap happens at one
     point in packs.js rather than inside each game.

     The other four stay off. They have a speech voice and a name and
     nothing else — no words, no sentences, no reading — so they show
     `lgSoon` rather than a course with nothing in it.

     HER OWN LANGUAGE IS FILTERED OUT BELOW, not here. This list says what
     exists; the picker decides what to offer her. */
  var HAS_COURSE = { de:true, en:true, ru:true };

  /* WHICH LANGUAGE SHE IS LEARNING, in one place. Several parts of the
     hub need it — the games filter, the grammar tile — and reading it
     from three different spots is three chances to read it differently. */
  function learningTarget(){
    return (GH.player && GH.player.target) ? GH.player.target() : 'de';
  }

  function langShort(code){
    var s = t('langShort_' + code);
    return s === ('langShort_' + code) ? String(code).toUpperCase() : s;
  }

  var lgBox = null;

  function lgClose(){
    if (lgBox && lgBox.parentNode) lgBox.parentNode.removeChild(lgBox);
    lgBox = null;
  }

  function lgShell(){
    lgClose();
    lgBox = el('div', 'lg-wrap');
    var panel = el('div', 'lg-panel surf-paper');
    lgBox.appendChild(panel);
    /* The backdrop dismisses, the panel does not. */
    lgBox.addEventListener('click', function(e){ if (e.target === lgBox) lgClose(); });
    document.body.appendChild(lgBox);
    return panel;
  }

  function lgOption(label, note, on, off, onPick){
    var b = el('button', 'lg-opt' + (on ? ' is-on' : '') + (off ? ' is-soon' : ''));
    b.type = 'button';
    b.appendChild(el('span', 'lg-opt-name', label));
    if (note) b.appendChild(el('span', 'lg-opt-note', note));
    if (off) b.disabled = true;
    else b.addEventListener('click', onPick);
    return b;
  }

  function askNative(){
    var p = lgShell();
    p.appendChild(el('p', 'lg-step', t('lgStep1')));
    p.appendChild(el('h2', 'lg-q', t('lgNative')));
    var list = el('div', 'lg-opts');
    UI_LANGS.forEach(function(code){
      list.appendChild(lgOption(ENDONYM[code], null, code === GH.i18n.lang(), false,
        function(){
          /* Set FIRST, so the second question is already in her language —
             Steven's rule, and the reason the two questions are two screens
             rather than one form. */
          GH.i18n.set(code);
          askTarget();
        }));
    });
    p.appendChild(list);
    lgCancel(p);
  }

  function askTarget(){
    var p = lgShell();
    p.appendChild(el('p', 'lg-step', t('lgStep2')));
    p.appendChild(el('h2', 'lg-q', t('lgTarget')));
    var list = el('div', 'lg-opts');
    var now = GH.player ? GH.player.target() : 'de';
    TARGETS.forEach(function(code){
      /* Her own language is not a course she can take — every prompt and
         every answer would be the same string. Skipped entirely rather
         than shown as unavailable, so the list never offers something
         nonsensical. Same rule as welcome.js's first-run picker. */
      if (code === GH.i18n.lang()) return;
      var ok = !!HAS_COURSE[code];
      list.appendChild(lgOption(t('langName_' + code), ok ? null : t('lgSoon'),
        code === now, !ok,
        function(){
          if (GH.player && GH.player.setTarget) GH.player.setTarget(code);
          lgClose();
          paintLang();
          if (GH.app.redraw) GH.app.redraw();
        }));
    });
    p.appendChild(list);
    /* Switching course hides her progress rather than destroying it, and
       she is owed that sentence before she is surprised by it. */
    p.appendChild(el('p', 'lg-note', t('lgSwitchNote')));
    lgCancel(p);
  }

  function lgCancel(p){
    var b = el('button', 'btn btn-ghost lg-x', t('close'));
    b.type = 'button';
    b.addEventListener('click', lgClose);
    p.appendChild(b);
  }

  var langBar = null;

  /* THE BRAND MARK IS THE LANGUAGE SWITCH.

     Steven, 09 Sep: "swap the DE button at the top to be the toggle for
     language and get rid of Eng -> Germ pill."

     It was a static `DE` tile in index.html — the site's logo, and
     nothing else. Which made it the one thing in the corner that looked
     pressable and was not, while a separate `Рус → Нем` pill in the
     toolbar did the actual job. One control now, in the place the eye
     already goes.

     STACKED, NOT AN ARROW. The pill read left-to-right as
     "from → to". Two lines put the language she is LEARNING on top,
     which is the one she wants to see at a glance, and her own
     underneath in a quieter size. */
  function paintLang(){
    if (!langBar) return;
    langBar.textContent = '';
    langBar.setAttribute('aria-haspopup', 'true');
    langBar.setAttribute('aria-label', t('lgNative'));
    langBar.appendChild(el('span', 'bm-to',
      langShort(GH.player ? GH.player.target() : 'de')));
    langBar.appendChild(el('span', 'bm-from', langShort(GH.i18n.lang())));
  }

  function initLangSwitch(){
    /* The brand mark first; the old `#langswitch` nav is the fallback so
       an older index.html still gets a working control rather than none. */
    langBar = document.getElementById('brandmark')
           || document.getElementById('langswitch');
    if (!langBar) return;
    langBar.addEventListener('click', askNative);
    /* Repaint has to run on every change, not just at boot — the stored
       language is restored after this function runs, so without it the
       header would show Рус while the page rendered in German. */
    GH.i18n.onChange(function(){
      paintLang();
      if (GH.app.redraw) GH.app.redraw();
    });
    paintLang();
  }

  function start(){
    initLangSwitch();
    GH.nav.init();
    /* Whatever she last chose, or Russian the very first time. Restoring is
       quiet so it does not write the default back over a real choice. */
    GH.i18n.set(GH.i18n.stored() || 'ru', true);
    hub();
  }

  /* `list` and `play` exist for the guide: it needs to enumerate what is
     registered, and it must not open an activity itself — launch() is what
     tells the event log which game she is using, and it lives here. */
  function list(){ return extras.slice(); }

  /* `back` is optional and defaults to the hub, which is what every hub
     tile wants. The Table of Contents passes its own, so that Back from
     a screen SHE OPENED FROM THE TOC returns her to the TOC rather than
     dropping her on the hub — she did not come from the hub, and sending
     her there loses her place in the contents. */
  function play(a, back){
    if (!a || !a.open) return;
    GH.speech.stop();
    leaving();
    view.textContent = '';
    launch(function(){ a.open(view, back || hub); }, a.id);
  }

  /* OPEN A GRAMMAR LESSON BY ID.

     There was already an `openGrammarLesson` doing exactly this, but it
     lives INSIDE the lessons-overview closure, so nothing outside app.js
     could reach it. The Table of Contents therefore listed all eighteen
     lessons and every row jumped to the hub's Lessons section instead of
     opening the lesson it named — and the Full Tour needs to open a
     specific one when she picks it from Waddles.

     Same shape as `play()`, including the optional `back`, so the TOC can
     send Back to itself rather than to the hub. `launch()` is what
     records which screen she is on, which is why this cannot be done by
     calling GH.lessons.open directly from outside. */
  function lesson(id, back){
    if (!id || !GH.lessons || !GH.lessons.open) return;
    GH.speech.stop();
    leaving();
    view.textContent = '';
    launch(function(){ GH.lessons.open(view, back || hub, id); }, 'lessons');
  }

  /* THE LESSONS OVERVIEW, from outside. The Table of Contents' heading
     buttons open each section's guide, and Lessons' guide is this screen —
     but it lived inside `hub()` as a local call, so nothing else could
     reach it.

     The two lists are rebuilt here rather than captured from `hub()`, so
     this works whether or not the hub has been painted, and cannot serve
     a stale list of lessons.

     `exit` is where its back button goes; omitted, the hub, which is what
     the hub's own overview button has always done. */
  function lessonsOverview(exit){
    var taught = extras.filter(function(a){ return a.kind === 'lesson'; });
    /* SAME GATE AS THE HUB. This reads the lesson list a second time, so
       without the target check the overview would list all seventeen
       German grammar lessons on an English course while the hub showed
       none — two answers to one question. */
    /* Same as the hub: `all()` is already filtered by target. */
    var grammarLessons = (GH.lessons && GH.lessons.all()) || [];
    openLessonsOverview(taught, grammarLessons,
      openTaughtLesson, openGrammarLesson, exit);
  }

  return { start:start, hub:hub, register:register, find:find,
           list:list, play:play, lesson:lesson,
           lessonsOverview:lessonsOverview, redraw:null };
})();

document.addEventListener('DOMContentLoaded', GH.app.start);
