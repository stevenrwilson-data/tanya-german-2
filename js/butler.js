/* js/butler.js */
/* The butler.

   On first open, nothing tells her what is here or where to start. Thirty
   activities across eight sections, all reachable, none introduced. The
   butler is the missing first thirty seconds.

   ------------------------------------------------------------------
   THE SCRIPT IS NOT IN THIS FILE

   Every line comes from `data/butler-script.js`, and that file is
   Steven's. Not
   because the strings are awkward to place, but because I am not writing
   words that go in front of Tanya. The shape is mine; the voice is his.

   A missing script is a normal state: with no lines, `GH_BUTLER` is empty
   and the butler simply never appears. Nothing breaks and nothing shows a
   placeholder.

   ------------------------------------------------------------------
   THREE ANSWERS, ALL REAL

     yes      the tour
     later    gone for this visit, back on the next
     never    gone permanently

   `never` has to mean never or the offer is a nag with extra steps. But it
   is not a trapdoor either: on dismissal he points out the perch he retreats
   to, so it is always reversible from her side.

   ------------------------------------------------------------------
   THE TOUR ENDS BY DROPPING HER SOMEWHERE

   Not back at the hub. A tour that ends where it started has shown her a
   map and given her nothing to do. The last step names a destination and
   goes there.

   ------------------------------------------------------------------
   COINS ARE DEMONSTRATED, NOT DESCRIBED

   A step may carry `gift: n`. It pays her, and the header purse counts up
   in front of her — so "you earn these" is a thing she watched happen
   rather than a sentence she read. The same step tells her the balance is
   the way into the store, and she taps it once during the tour.

   Guarded so it can only ever pay once: `gh-butler` records it, because a
   tour she replays is a tour she could farm.

   ------------------------------------------------------------------
   HE HANDS OVER TO THE FIRST PET

   When she buys one, the butler formally resigns and the pet takes the
   role. That makes a purchase read as a promotion, and teaches in one
   moment that pets are guides rather than ornaments.

   Mechanically it is one guide, reskinned — which is why the handover
   lines live in the same data file as the tour. */

window.GH = window.GH || {};

GH.butler = (function(){

  var KEY = 'gh-butler';

  var host = null;         /* the overlay */
  var state = null;
  var pendingLit = null;   /* set by highlight(), scrolled once the bubble
                               is actually in the DOM — see show() and
                               positionForLit() below. */

  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  function script(){ return window.GH_BUTLER || null; }

  /* A line may be a plain string or a per-language object. Steven writes
     whichever suits; this does not care. */
  /* GENDERED RUSSIAN. Russian marks the listener in the ordinary past
     tense, so half the tour's lines have two forms — прошла against
     прошёл. `ru` holds the FEMININE one and `ruM` the masculine, and an
     unset gender falls to feminine: the site is built for Tanya, and
     that is the same convention petvoice.js already uses.

     A line with no `ruM` behaves exactly as before, so the navigation
     stops and everything ungendered stay single-valued. */
  function say(x){
    if (!x) return '';
    if (typeof x === 'string') return x;
    if (lang() === 'ru' && x.ruM
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      return x.ruM;
    }
    return x[lang()] || x.en || x.de || '';
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- what she has already told us ---------- */

  function slot(){
    return (GH.player && GH.player.id)
      ? GH.player.id() + ':' + GH.player.target() : 'solo';
  }

  function read(){
    try {
      var raw = window.localStorage.getItem(KEY);
      var all = raw ? JSON.parse(raw) : {};
      return all[slot()] || {};
    } catch (e){ return {}; }
  }

  function write(patch){
    try {
      var raw = window.localStorage.getItem(KEY);
      var all = raw ? JSON.parse(raw) : {};
      var mine = all[slot()] || {};
      var k;
      for (k in patch) if (patch.hasOwnProperty(k)) mine[k] = patch[k];
      all[slot()] = mine;
      window.localStorage.setItem(KEY, JSON.stringify(all));
    } catch (e){}
  }

  /* Should he offer? Only on the hub, only if there is a script, only if
     she has not said never, and only once per visit — `asked` is in memory,
     not storage, so "later" means the next time she opens the app rather
     than the next time the hub repaints. */
  var askedThisVisit = false;

  /* IS THERE ANYTHING TO SAY AT ALL.

     Split out of `due()` because two callers need it and only one of them
     wants the rest: `due()` decides whether to speak up UNPROMPTED, while
     the perch decides whether tapping him can do anything. Being asked
     overrides a refusal and a finished tour; it cannot conjure a script
     that has not been written.

     Both conditions were already here and both are load-bearing. An
     unwritten script ships as an object full of empty strings, and
     testing that `offer` merely EXISTED once put an empty bubble over the
     whole page with no way to close it. */
  function hasScript(){
    var o = script() && script().offer;
    if (!o || !say(o.line)) return false;
    var tours = (script().tours || []).filter(function(x){
      return x && x.steps && x.steps.length;
    });
    return !!tours.length;
  }

  function due(){
    /* HE MUST HAVE SOMETHING TO SAY.

       This tested that `offer` EXISTED, and it does — as an object full of
       empty strings, which is the state the script ships in. So he opened
       with an empty bubble covering the whole page and nothing to close it
       with. The page was rendered underneath and completely unusable.

       An unwritten script is the normal state while the words are being
       written, and it has to be invisible rather than fatal. */
    /* And somewhere for the answer to go. Every tour with steps becomes a
       button; with none, the only button would be the refusal, which is a
       question not worth asking. Both checks live in `hasScript()` now,
       shared with the perch. */
    if (!hasScript()) return false;

    if (askedThisVisit) return false;
    var mine = read();
    if (mine.never) return false;
    if (mine.done) return false;
    return true;
  }

  /* ---------- the overlay ---------- */

  function ensure(){
    if (host) return host;
    /* THREE LAYERS, NOT TWO. The dim used to be the overlay's own
       background, which made the scrim and the bubble one element and so
       one stacking context — z-index 70. `.bt-lit` is 81, so ANY
       highlighted element painted over the bubble, and a tall one buried
       it completely: highlighting `#sec-gamesHead` put the whole games
       grid on top of Waddles.

       There was no value of `.bt-lit` that could work: above 70 covers
       the bubble, below 70 gets dimmed, which defeats the highlight.

       So the dim is its own element underneath:

           .bt-scrim    70   paint only
           .bt-lit      81   the thing he is pointing at
           .bt-overlay  90   the bubble

       The scrim is created first and appended first, so it is also below
       in document order. Both are toggled together in show(). */
    scrim = el('div', 'bt-scrim');
    document.body.appendChild(scrim);

    host = el('div', 'bt-overlay');
    host.setAttribute('role', 'dialog');
    host.setAttribute('aria-modal', 'true');
    document.body.appendChild(host);
    return host;
  }

  function close(){
    if (!host) return;
    host.className = 'bt-overlay';
    host.textContent = '';
    document.body.style.overflow = '';
    clearHighlight();
    disarm();
  }

  /* ---------- WAITING FOR HER TO PRESS THE REAL BUTTON ----------

     A step with `tap:true` does not advance on a Next button. It lights up
     something on the page and waits for her to use it.

     That is the difference between a tour she watches and one she performs.
     Being told where the balance is and pressing it once are not the same
     memory, and the second one survives.

     The listener goes on the element itself and is removed when the step
     ends, so nothing is left behind if she abandons the tour. */
  var armedNode = null;
  var armedFn = null;

  function disarm(){
    if (armedNode && armedFn) armedNode.removeEventListener('click', armedFn);
    armedNode = null;
    armedFn = null;
  }

  function arm(sel, then){
    disarm();
    var n = document.querySelector(sel);
    if (!n) return false;
    armedNode = n;
    armedFn = function(){
      disarm();
      clearHighlight();
      /* The app is about to repaint — she pressed a real button and it
         does what it always does. The tour picks itself up on the other
         side, in `resume()`. */
      then();
    };
    n.addEventListener('click', armedFn);
    return true;
  }

  /* ---------- SURVIVING THE SCREEN CHANGE ----------

     `GH.app.launch()` empties the whole view, so the butler's box is
     destroyed along with everything else. The tour therefore lives out here
     in `state`, and re-draws itself once the new screen has painted.

     `GH.nav.ready()` is the hook, because every screen already calls it
     when it has finished painting — the same funnel the history and the
     event log hang off. Nothing new to remember to call. */
  var waitingForPaint = false;
  var paintTimer = null;

  function resume(){
    if (!state || !state.tour) return;
    if (!waitingForPaint) return;
    waitingForPaint = false;
    if (paintTimer){ clearTimeout(paintTimer); paintTimer = null; }
    step();
  }

  /* NOT EVERY BUTTON NAVIGATES.

     A tap step assumes the control she pressed repaints the screen, and
     most do. But a filter, a toggle, a play button does not — and then
     `waitingForPaint` would stay true, `resume()` would never fire, and the
     butler would simply disappear mid-tour with no way back.

     So the wait has a deadline. If no screen has painted shortly after her
     tap, the next step is drawn where she already is. */
  function waitForPaint(){
    waitingForPaint = true;
    if (paintTimer) clearTimeout(paintTimer);
    paintTimer = setTimeout(function(){
      paintTimer = null;
      if (!waitingForPaint) return;
      waitingForPaint = false;
      step();
    }, 700);
  }

  GH.butlerResume = resume;

  /* He stands at the side; the bubble comes out of his face.

     Deliberately NOT a centred modal that locks scrolling, which is what
     this was. A tour has to let her see and reach the page it is talking
     about — a modal over the top makes that impossible, and a highlighted
     button she cannot press is worse than no highlight.

     `blocking` is for the moments that really are a stop: the first offer,
     the handover. Those darken the page; a tour step never does. */
  /* `speaker` lets a screen be someone other than the butler. A pet saying
     goodbye must show ITS OWN face — Waddles standing there while Max says
     "sting on the shelf" would read as Waddles saying it. */
  function show(build, blocking, speaker){
    ensure();
    host.textContent = '';

    var stage = el('div', 'bt-stage');

    var bubble = el('div', 'bt-bubble');
    build(bubble);
    stage.appendChild(bubble);

    /* The figure. The tail on the bubble points at him, so he comes after
       it in the DOM and CSS puts him below. */
    var who = el('div', 'bt-who');
    if (speaker){
      /* A pet. petArt walks a chain of filenames, so a pet whose art is not
         drawn yet shows its best available picture rather than nothing. */
      if (GH.petArt && GH.petArt.tile){
        var pimg = GH.petArt.tile(speaker, 1, 'shop', 'bt-face');
        if (pimg) who.appendChild(pimg);
      }
      who.appendChild(el('span', 'bt-name', speaker.name || speaker.de || ''));
    } else {
      if (script().portrait){
        var img = document.createElement('img');
        img.className = 'bt-face';
        img.src = GH.build ? GH.build.url(script().portrait) : script().portrait;
        img.alt = '';
        /* No portrait yet is the normal state while one is being drawn, and
           the tour has to work without it. */
        img.addEventListener('error', function(){
          img.style.display = 'none';
          who.className += ' has-no-face';
        });
        who.appendChild(img);
      }
      if (script().name) who.appendChild(el('span', 'bt-name', say(script().name)));
    }
    stage.appendChild(who);

    host.appendChild(stage);
    host.className = 'bt-overlay is-open' + (blocking ? ' is-blocking' : '');
    if (scrim) scrim.className = 'bt-scrim is-open' + (blocking ? ' is-blocking' : '');
    document.body.style.overflow = blocking ? 'hidden' : '';

    /* highlight() ran inside build(), before the bubble existed — it could
       only guess where to scroll. Now that the stage is actually in the
       DOM, its real height is known, so do the scroll here instead. */
    if (pendingLit){
      scrollClear(pendingLit, stage);
      pendingLit = null;
    }

    if (GH.nav) GH.nav.ready();
  }

  /* The bubble sits fixed at the bottom of the screen (see .bt-overlay in
     style.css) — a plain scrollIntoView({block:'center'}) assumes the
     WHOLE viewport is free, so it can centre a tile right where the
     bubble is about to land on top of it, and everything below it in the
     same row along with it (this is exactly what happened with the
     Progress tile: the bubble covered part of Word List and all of
     Achievements underneath). Centring within the space the bubble
     actually leaves free fixes it, computed from `stage`'s real rendered
     height rather than a guess. */
  function scrollClear(n, stage){
    try {
      var stageTop = stage.getBoundingClientRect().top;
      var r = n.getBoundingClientRect();
      var gap = 14;
      var freeHeight = stageTop - gap;
      if (freeHeight < r.height){
        /* The element is taller than the space the bubble leaves — nothing
           to centre it within, so just bring it to the top instead of
           fighting for room that isn't there. */
        n.scrollIntoView({ block:'start', behavior:'smooth' });
        return;
      }
      /* JUST ABOVE THE BUBBLE, NOT CENTRED ABOVE IT.

         This used to centre the element in the whole space above the
         bubble. With a five-line bubble that space is most of the screen,
         so a small tile ended up pinned at the very top — half behind the
         jumpbar and about fifteen hundred pixels from the arrow pointing
         at it. Correct by its own rule, useless to look at: Steven, 08
         Sep, "look how far away the action is from Waddles."

         So the element is parked a short gap above the bubble instead.
         The pointer and the thing it points at then read as one unit, and
         the eye travels a few dozen pixels rather than a screenful.

         `minTop` keeps it clear of the header. The jumpbar and the title
         bar sit at the top of the hub, and an element scrolled under them
         is highlighted but unreadable — which was the other half of what
         that screenshot showed. */
      var minTop = 96;
      var desiredTop = stageTop - gap - r.height;
      if (desiredTop < minTop) desiredTop = minTop;
      var delta = r.top - desiredTop;
      if (Math.abs(delta) > 2){
        window.scrollBy({ top: delta, left: 0, behavior: 'smooth' });
      }
    } catch (e){
      try { n.scrollIntoView({ block:'center', behavior:'smooth' }); } catch (e2){}
    }
  }

  /* ---------- the offer ---------- */

  /* THE TOURS ARE THE ANSWERS.

     This used to ask yes / later / never, and then ask AGAIN which tour.
     Two screens for one decision, and the first screen offered a "yes" to a
     question whose real answer is "which one".

     So every written tour is a button, and refusing is the last one. A
     script with one tour shows one button and a refusal; with three, three.
     Nothing here needs to know how many there are. */
  /* `force` is the perch: SHE ASKED, so the once-per-visit rule and the
     done/never flags do not apply. Steven: "It should be there regardless
     at all times you should be able to repeat the tour you should be able
     to do the 200s of times if you want."

     Without this the perch was decorative after the first completed tour
     — `due()` returns false once `done` is written, and `offer()` bailed
     on that before doing anything. The content checks inside `due()` DO
     still apply when forced; they are the difference between a written
     script and an empty one, which no amount of asking changes. */
  function offer(force){
    if (force){
      if (!hasScript()) return;
    } else if (!due()) return;
    askedThisVisit = true;
    var o = script().offer || {};

    /* AN OPTIONAL GREETING BEAT, BEFORE THE QUESTION.

       `hello` is a second, earlier line with one button of its own —
       "there you are, I'm Waddles" before "what shall we do?" rather than
       both landing in her lap in the same breath. Writing `hello` is
       optional: leave it empty and the offer opens straight on the
       question, exactly as it always has. */
    if (say(o.hello)){
      show(function(box){
        box.appendChild(el('p', 'bt-line', say(o.hello)));
        var acts = el('div', 'bt-acts');
        add(acts, say(o.helloOk) || say(script().nextLabel), 'primary', askWhat);
        box.appendChild(acts);
      }, true);
      return;
    }
    askWhat();
  }

  function askWhat(){
    var o = script().offer || {};
    var tours = (script().tours || []).filter(function(x){
      return x && x.steps && x.steps.length;
    });

    show(function(box){
      box.appendChild(el('p', 'bt-line', say(o.line)));

      var acts = el('div', 'bt-acts');
      /* NO DEFAULT TOUR. `primary` on the first made the Quick Tour look
         recommended over the Full Tour purely because it is written first
         — and this is the first screen she ever sees, so that nudge was
         the loudest one in the app. Two equal offers. */
      tours.forEach(function(tour, i){
        add(acts, say(tour.label), 'ghost', function(){
          start(indexOf(tour));
        });
      });
      add(acts, say(o.no), 'ghost', refused);
      box.appendChild(acts);
    }, true);
  }

  function indexOf(tour){
    var list = script().tours || [];
    for (var i = 0; i < list.length; i++) if (list[i] === tour) return i;
    return 0;
  }

  /* SHE SAID NO. ONE FOLLOW-UP, THEN NEVER AGAIN.

     "Shall I come back later?" is the only question worth asking after a
     refusal, because the two answers are genuinely different — one is not
     now, the other is not ever. Asking anything else, or asking twice,
     turns a butler into a pop-up.

     Both answers end with him on the perch, so she always knows where he
     went. Refusing him is never the same as losing him. */
  function refused(){
    var r = script().refuse;
    if (!r || !r.line){
      /* No follow-up written: treat the refusal as final and say nothing
         further. Better than inventing a question. */
      write({ never: Date.now() });
      close();
      perch(true);
      return;
    }
    show(function(box){
      box.appendChild(el('p', 'bt-line', say(r.line)));
      var acts = el('div', 'bt-acts');

      /* Yes — come back next visit. Nothing is written, so `due()` finds
         him owed again tomorrow. */
      add(acts, say(r.yes), 'primary', function(){
        close();
        perch(true);
      });

      /* No — never on his own again. The perch stays. */
      add(acts, say(r.no), 'ghost', function(){
        write({ never: Date.now() });
        close();
        perch(true);
      });

      box.appendChild(acts);
    }, true);
  }

  function add(row, label, kind, fn){
    if (!label) return;
    var b = el('button', 'bt-btn' + (kind === 'primary' ? ' is-primary' : ''), label);
    b.type = 'button';
    b.addEventListener('click', fn);
    row.appendChild(b);
  }

  function pickTour(){
    show(function(box){
      var o = script().offer;
      if (o.which) box.appendChild(el('p', 'bt-line', say(o.which)));
      var acts = el('div', 'bt-acts');
      /* Same, for the perch's re-open screen. */
      script().tours.forEach(function(tour, i){
        add(acts, say(tour.label), 'ghost', function(){ start(i); });
      });
      box.appendChild(acts);
    }, true);
  }

  /* ---------- the tour ---------- */

  function start(which){
    var tour = (script().tours || [])[which];
    if (!tour || !tour.steps || !tour.steps.length){ close(); return; }
    state = { tour:tour, i:0 };
    step();
  }

  /* A way back to the Table of Contents, for anything the tour opens
     itself. `undefined` when the TOC is not loaded, which makes
     `GH.app.play` fall back to the hub exactly as it did before. */
  function tocExit(){
    if (!GH.toc || !GH.toc.open || !GH.app || !GH.app.play) return undefined;
    return function(){
      GH.app.play({ id:'toc', open:GH.toc.open });
    };
  }

  /* WHICH STEP IS CALLED `name`.

     A `picks` option jumps by NAME — the step it wants carries
     `at:'name'` — because a numeric index in data breaks silently the
     moment a step is inserted above it, and this tour is being written
     one stop at a time. Returns -1 for an unknown name, and the caller
     falls through to the next step rather than jumping nowhere. */
  function stepNamed(name){
    if (!name || !state || !state.tour) return -1;
    var st = state.tour.steps || [];
    for (var i = 0; i < st.length; i++){
      if (st[i] && st[i].at === name) return i;
    }
    return -1;
  }

  function step(){
    var s = state.tour.steps[state.i];
    if (!s){ finish(); return; }

    /* A step that pays. ONCE EVER PER TOUR, per profile — the tour is
       replayable without limit, so a gift that paid every time would be a
       tour she can farm.

       PER TOUR, not per profile. It was one `paid` flag for everything,
       which meant the quick tour's ten crystals blocked the full tour's
       twenty forever — the second tour would have paid nothing and looked
       broken. Steven: "Giving crystals should be a one time event, but it
       could be for each level of tour. 10 for quick. 20 for full."

       The amount stays in data/butler-script.js on the step, so changing
       it is a data edit. */
    var paidKey = 'paid_' + (state.tour.id || 'x');
    var alreadyPaid = !!read()[paidKey];
    if (s.gift && !alreadyPaid){
      if (GH.coins && GH.coins.earn) GH.coins.earn(s.gift, 'butler');
      var pay = {}; pay[paidKey] = s.gift;
      write(pay);
      if (GH.purse) GH.purse.refresh();
    }

    var last = state.i >= state.tour.steps.length - 1;

    show(function(box){
      /* SECOND TIME THROUGH, THE GIFT STEP SAYS SOMETHING ELSE.

         The written line hands over crystals, which would be a lie on a
         replay — the tour is repeatable without limit and the gift pays
         once per tour. So on a replay this one step swaps to a line that
         says so and still does the step's real job, which is showing her
         where the balance lives. Steven's text, all three languages, in
         js/i18n.js.

         TWO RUSSIAN FORMS. Russian past tense is gendered — проходил
         against проходила — so `btGiftDoneF` is the feminine one and the
         profile's own setting picks. German and English have no gendered
         past here and both keys carry the same line, so this asks for a
         variant in every language rather than branching on which language
         it is in.

         Unset gender falls to the feminine: the site is Deutsch für
         TANYA, so she is the one it is written for.

         Only the gift step: every other step of a replayed tour reads
         exactly as it did the first time. */
      var again = t((GH.player && GH.player.gender
                     && GH.player.gender() === 'm') ? 'btGiftDone'
                                                    : 'btGiftDoneF');
      box.appendChild(el('p', 'bt-line',
        (s.gift && alreadyPaid) ? again : say(s.line)));

      /* `points` names something on the page to draw her eye to. Absent is
         fine; most steps are just words. */
      var lit = false;
      if (s.points) lit = highlight(s.points);

      var acts = el('div', 'bt-acts');

      /* A BRANCH THAT DOES NOT END THE TOUR.

         `picks: [{ label, to, lesson, activity }]`. One button per
         option, in place of the usual single Next — the same shape as
         `choices` below and the opposite behaviour: `choices` is
         TERMINAL, it writes `done`, closes and nulls `state`, so it
         cannot be a branch point. This keeps `state` alive.

         Steven's design: "The learner chooses one of the three, and that
         choice becomes the next stop on the Full Tour. After showing
         that area, we can return to the Table of Contents and continue
         exploring the site." So the branches reconverge, which is why
         this is a jump inside one flat `steps` array and not a nested
         tree — no duplication, and the step counter stays honest.

         `to` NAMES A STEP, it does not index one. A step carrying
         `at:'somename'` is the target. Indices in data break the moment a
         step is inserted above them; a name does not.

         `lesson` opens a grammar lesson by id, `activity` a registered
         activity. Either one means the app is about to repaint, so this
         hands over exactly as a `tap` step does — `waitForPaint()` then
         `close()`, and `resume()` draws the target step on the new
         screen. With neither, it is a pure jump and draws immediately. */
      if (s.picks && s.picks.length){
        /* Same as `choices` above: no default. The three games are three
           equal offers, and `primary` on the first made "Listen and pick"
           look like the recommended one purely because it is written
           first. */
        s.picks.forEach(function(c, i){
          add(acts, say(c.label), 'ghost', function(){
            clearHighlight();
            disarm();

            var to = stepNamed(c.to);
            state.i = (to < 0) ? state.i + 1 : to;

            /* HAND OVER TO THE OTHER TOUR. `tour:'full'` on an option
               ends this tour and starts that one immediately, which is
               what lets the Quick Tour offer the Full Tour at its close
               rather than only mentioning it.

               `start()` takes an index, so the id is resolved here — a
               name, not a number, so reordering `tours` cannot silently
               launch the wrong one. Unknown id falls through to the
               ordinary step, which is a dead option rather than a
               crash. */
            /* THE BONUS, same field name and meaning as on `choices`.
               Moving the Quick Tour's ending from `choices` to `picks`
               would otherwise have dropped it silently — she would be
               promised a bonus and never paid one. Set BEFORE any of the
               navigation below, so it survives every branch. */
            if (c.bonus && GH.coins && GH.coins.setStarterBonus){
              GH.coins.setStarterBonus(c.bonusGame || null, c.bonus);
            }
            if (c.tour){
              var ti = -1;
              script().tours.forEach(function(t, k){ if (t.id === c.tour) ti = k; });
              if (ti >= 0){
                clearHighlight();
                disarm();
                close();
                state = null;
                start(ti);
                return;
              }
            }
            if (c.lesson && GH.app && GH.app.lesson){
              GH.app.lesson(c.lesson);
              waitForPaint();
              close();
              return;
            }
            if (c.activity && GH.app && GH.app.find && GH.app.play){
              var act = GH.app.find(c.activity);
              if (act){
                /* BACK GOES TO THE TABLE OF CONTENTS, not the hub.

                   `GH.app.play(act)` with no exit defaults to the hub, so
                   a game opened from a branch would have dropped her on
                   the front page — and the Full Tour uses the Table of
                   Contents as its home base, returning to it between
                   every section. One step landing somewhere else breaks
                   the pattern she is being taught.

                   Falls back to the hub if the Table of Contents is not
                   loaded, which is the old behaviour rather than a
                   crash. */
                GH.app.play(act, tocExit());
                waitForPaint();
                close();
                return;
              }
            }
            step();
          });
        });
        add(acts, say(script().stopLabel), 'ghost', function(){
          clearHighlight();
          disarm();
          stop();
        });
        box.appendChild(acts);
        box.appendChild(el('p', 'bt-count',
          t('btStepN', { n:state.i + 1, of:state.tour.steps.length })));
        return;
      }

      /* A STEP THAT ENDS THE TOUR WITH A CHOICE OF WHERE TO GO NEXT.

         `choices: [{ label, sel, bonusGame, bonus }]`. One button per
         choice, in place of the usual single Next. Picking one:

           - promises the bonus (coins.setStarterBonus), so whichever of
             the three things she finishes first pays it — she may not
             finish the exact thing this button opens
           - marks the tour done, the same as running off the end normally
           - scrolls to or opens the thing itself, rather than the tour
             deciding for her which vocabulary set or which game

         `sel` is a hub selector to scroll to (she picks the specific tile
         herself); `go` an activity id to open directly, for the one choice
         — reading — that already is a single real destination. */
      if (s.choices && s.choices.length){
        /* ALL THREE EQUAL. The first used to be `primary`, which is the
           recommended-action style — so whichever option happened to be
           written first looked like the default and the other two looked
           like alternatives. Steven, 08 Sep: there should be no default
           choice between the three. `ghost` for all of them presents
           them as three equal doors, which is what they are. */
        s.choices.forEach(function(c, i){
          add(acts, say(c.label), 'ghost', function(){
            clearHighlight();
            disarm();
            if (c.bonus && GH.coins && GH.coins.setStarterBonus){
              GH.coins.setStarterBonus(c.bonusGame || null, c.bonus);
            }
            write({ done: Date.now() });
            close();
            state = null;
            if (c.go && GH.app && GH.app.find && GH.app.play){
              var act = GH.app.find(c.go);
              if (act){ GH.app.play(act); return; }
            }
            if (c.sel){
              var n = document.querySelector(c.sel);
              if (n && n.scrollIntoView){
                n.scrollIntoView({ behavior:'smooth', block:'start' });
              }
            }
          });
        });
        box.appendChild(acts);
        return;
      }

      /* A STEP SHE PERFORMS.

         `tap:true` means the highlighted thing is the way on. No Next
         button — she presses the real control, the app does whatever it
         normally does, and the tour reappears on the other side.

         If the element is not on this screen, the step falls back to a
         plain Next rather than trapping her with an instruction she cannot
         follow. A tour that can dead-end is worse than one that is dull. */
      if (s.tap && lit && arm(s.points, function(){
            state.i++;
            /* The app is repainting. `nav.ready()` on the new screen calls
               resume(), which draws the next step there. */
            waitForPaint();
            close();
          })){
        box.appendChild(el('p', 'bt-do', t('btTapIt')));
      } else {
        add(acts, say(last ? (state.tour.finish || script().doneLabel) : script().nextLabel),
            'primary', function(){
          clearHighlight();
          disarm();
          state.i++;
          /* A step can also send her somewhere itself, for places with no
             obvious button to press. */
          if (s.go && GH.app && GH.app.find && GH.app.play){
            var act = GH.app.find(s.go);
            if (act){ waitForPaint(); close(); GH.app.play(act); return; }
          }
          if (s.go === 'hub' && GH.app && GH.app.hub){
            waitForPaint(); close(); GH.app.hub(); return;
          }
          step();
        });
      }

      add(acts, say(script().stopLabel), 'ghost', function(){
        clearHighlight();
        disarm();
        stop();
      });
      box.appendChild(acts);

      box.appendChild(el('p', 'bt-count',
        t('btStepN', { n:state.i + 1, of:state.tour.steps.length })));
    });
  }

  /* STOPPING EARLY IS NOT THE SAME AS FINISHING.

     `finish()` below writes `done` and jumps to the tour's destination —
     right when she has actually seen the whole thing. Wiring "That's
     enough for now" to `finish()` used to do both of those anyway, which
     is wrong on both counts: it marked a tour she cut short as complete
     forever (so due() would never offer it again and the perch — which
     only ever gets shown on a refusal — never appeared to say she could
     come back), and it could carry her off to a destination for a tour
     she never reached the end of.

     `refused()` already has the right shape for this: write nothing, so
     due() finds the tour owed again next visit exactly like "later" does,
     and always leave the perch behind so it's not next-visit-or-nothing —
     she can tap it right away. Stopping mid-tour gets the same courtesy. */
  function stop(){
    close();
    state = null;
    perch(true);
  }

  /* The tour ends by going somewhere. A tour that ends where it began has
     shown her a map and given her nothing to do. */
  function finish(){
    var go = state && state.tour ? state.tour.go : null;
    write({ done: Date.now() });
    close();
    state = null;
    /* THE PERCH SURVIVES FINISHING. `stop()` and both refusal paths
       already left it behind; `finish()` did not, so completing the tour
       properly was the one way to lose access to it — `done` is written,
       so `due()` will never offer again. Backwards.

       `true` to flash: she has just finished, and this is the moment to
       show her where he went and that he can be fetched back. */
    perch(true);
    if (go && GH.app && GH.app.find && GH.app.play){
      var act = GH.app.find(go);
      if (act){ GH.app.play(act); return; }
    }
    if (go === 'hub' && GH.app && GH.app.hub) GH.app.hub();
  }

  /* ---------- the perch ---------- */

  /* Dismissing him is never permanent from her side: he says where he has
     gone, and the button stays there. */
  function perch(flash){
    var host2 = document.querySelector('.topbar-controls');
    if (!host2) return;
    var existing = document.querySelector('.bt-perch');
    if (existing){
      /* Already there. Flash it anyway if this is a fresh refusal — she
         needs to see WHERE he went, and a button that was always there is
         not something anyone notices. */
      if (flash) blink(existing);
      return;
    }

    var b = el('button', 'bt-perch');
    b.type = 'button';
    b.setAttribute('aria-label', say(script().perchLabel) || t('btPerch'));

    /* His face, not a bell. He is a character now and the perch is where
       he is standing — a generic icon would make it a menu item.

       `perchFace` over `portrait` when it's set: the full standing figure
       shrunk to 30x40 reads as a smudge, so a purpose-cropped close-up
       belongs here instead. Falls back to `portrait`, then to the bell,
       so an unset `perchFace` is never a broken perch. */
    var faceSrc = script().perchFace || script().portrait;
    if (faceSrc){
      var img = document.createElement('img');
      img.className = 'bt-perch-face';
      img.src = GH.build ? GH.build.url(faceSrc) : faceSrc;
      img.alt = '';
      img.addEventListener('error', function(){
        img.style.display = 'none';
        b.textContent = '\uD83D\uDD14';
      });
      b.appendChild(img);
    } else {
      b.textContent = '\uD83D\uDD14';
    }

    b.addEventListener('click', function(){
      /* No `write({never:0})` any more. Clearing her refusal as a side
         effect of one tap meant he would start volunteering again on
         later visits, which is the opposite of what "no thanks, never"
         asked for. Tapping him is a request for this one conversation,
         not a change of standing instructions. */
      askedThisVisit = false;
      offer(true);
    });
    host2.appendChild(b);
    if (flash !== false) blink(b);
  }

  /* A few seconds of glow, then nothing. Long enough to be seen, short
     enough that it is not a thing blinking at her while she works. */
  function blink(b){
    b.className = 'bt-perch is-new';
    window.setTimeout(function(){ b.className = 'bt-perch'; }, 2600);
  }

  /* ---------- pointing at things ---------- */

  /* Light it up AND bring it on screen.

     A highlight five screens down is no highlight at all — she reads "the
     balance is at the top" and sees nothing, because the thing being
     pointed at is nowhere near her eyes. Returns whether it found
     anything, so a step can fall back rather than instruct her to press
     something that is not there. */
  function highlight(sel){
    clearHighlight();
    var n = document.querySelector(sel);
    if (!n) return false;
    n.className += ' bt-lit';
    /* The scroll itself waits for show() to finish appending the bubble —
       see pendingLit / scrollClear() there. The bubble does not exist yet
       at this point in the call, so there is nothing correct to measure
       here. */
    pendingLit = n;
    return true;
  }

  function clearHighlight(){
    var lit = document.querySelectorAll('.bt-lit');
    var i;
    for (i = 0; i < lit.length; i++){
      lit[i].className = lit[i].className.replace(/\s*bt-lit\b/, '');
    }
  }

  /* ---------- handing over to the first pet ----------

     Called by the store the first time she buys one. The butler resigns,
     the pet takes the role, and a purchase reads as a promotion. */
  /* TWO SCREENS, NOT ONE PANEL.

     He speaks and fades; the pet appears and speaks. A purchase reads as a
     promotion rather than a notice, and the new pet gets a moment of its
     own rather than a second paragraph under someone else's.

     `first` is the butler stepping down for her first pet — he speaks on
     screen one. A `switch` between two pets skips straight to screen two,
     because the arriving pet does the acknowledging itself and nobody has
     to speak for the one being replaced.

     `petId` keys the line. A display name cannot: `shortName` strips "the
     Frog", and two pets could share a first word. */
  function handover(petId, petName, first, leaving){
    var h = script() && script().handover;
    if (!h) return;

    var part = first ? h.first : h['switch'];
    if (!part) return;

    /* The butler resigns once ever. A switch can happen any number of
       times, so only the first is guarded. */
    if (first){
      if (read().handedOver) return;
      write({ handedOver: Date.now() });
    }

    var petLine = (part.pets && part.pets[petId]) || '';
    /* The arriving pet, so it shows its own face rather than the butler's. */
    var arriving = petOf(petId);
    var fill = function(x){
      return say(x)
        .replace(/\{name\}/g, who())
        .replace(/\{pet\}/g, petName || '');
    };

    /* Screen two: the pet. Drawn as a function so screen one can call it. */
    function petSpeaks(){
      if (!petLine){ close(); return; }
      show(function(box){
        box.appendChild(el('p', 'bt-line bt-pet', fill(petLine)));
        var acts = el('div', 'bt-acts');
        add(acts, say(part.ok) || t('close'), 'primary', close);
        box.appendChild(acts);
      }, true, arriving);
    }

    /* Screen one: him, but only when he is the one leaving. */
    if (first && part.butler){
      show(function(box){
        box.appendChild(el('p', 'bt-line', fill(part.butler)));
        var acts = el('div', 'bt-acts');
        add(acts, say(part.ok) || t('close'), 'primary', petSpeaks);
        box.appendChild(acts);
      }, true);
      return;
    }

    /* THE PET SHE ALREADY HAD SAYS GOODBYE FIRST.

       Swapping companions without a word from the one being put down would
       make the pets feel like equipment. They are not: they talk, they have
       voices, and the whole point of the shelf is that the old one is
       waiting rather than gone.

       So a switch is three screens — the leaving pet, then the arriving
       one. `leaving` is the pet object; absent means there was nobody to
       replace and it opens on the arrival. */
    var bye = h.leave;
    if (leaving && bye && bye.pets && bye.pets[leaving.id]){
      var byeName = (leaving.name || leaving.de || '').split(' the ')[0];
      show(function(box){
        if (bye.head){
          box.appendChild(el('p', 'bt-head',
            say(bye.head).replace(/\{pet\}/g, byeName)));
        }
        box.appendChild(el('p', 'bt-line bt-pet',
          say(bye.pets[leaving.id])
            .replace(/\{name\}/g, who())
            .replace(/\{pet\}/g, byeName)));
        var acts = el('div', 'bt-acts');
        add(acts, say(bye.ok) || say(part.ok) || t('close'), 'primary', petSpeaks);
        box.appendChild(acts);
      }, true, leaving);
      return;
    }

    petSpeaks();
  }

  /* Her name, whatever she signed up as. Empty rather than a guess if the
     profile has none — a line reading "Hello, friend" when she wrote a name
     is worse than one that simply does not use it. */
  /* A pet by id, from the pet data. Null rather than a guess if it is not
     found — a screen with the wrong face is worse than one with none. */
  function petOf(id){
    var list = (window.GH_PETS && (window.GH_PETS.pets || window.GH_PETS)) || [];
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function who(){
    try {
      var p = GH.player && GH.player.current && GH.player.current();
      return (p && p.name) ? p.name : '';
    } catch (e){ return ''; }
  }

  /* Escape closes it. Capture and stopImmediatePropagation because nav.js
     also listens on `document` — without them the dialog would close AND
     the screen behind it would leave. */
  document.addEventListener('keydown', function(e){
    if (!host || host.className.indexOf('is-open') < 0) return;
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    e.preventDefault();
    e.stopImmediatePropagation();
    close();
  }, true);

  /* START A TOUR ON PURPOSE.

     Nothing could, before. The only route in was the offer dialogue, which
     shows once per profile, so the perch could not restart one and neither
     could a test. `which` is a tour id or an index; absent means the first.

     It is the same path the offer takes, so a tour started here behaves
     identically to one accepted at the start — no second code path to keep
     in step. */
  function tour(which){
    var list = (script() && script().tours) || [];
    if (!list.length) return false;
    var i = 0;
    if (typeof which === 'number') i = which;
    else if (which){
      for (var k = 0; k < list.length; k++) if (list[k].id === which) i = k;
    }
    if (!list[i]) return false;
    start(i);
    return true;
  }

  return { offer:offer, close:close, handover:handover, tour:tour,
           due:due, perch:perch,
           /* For testing the tour without clearing storage by hand. It has to
              clear the once-per-visit flag too, or calling it appears to do
              nothing — which is what makes a debug hook worse than none. */
           reset:function(){
             askedThisVisit = false;
             write({ never:0, done:0 });
           },
           /* The gift is guarded separately, so replaying deliberately does
              not hand out coins again. */
           resetAll:function(){
             askedThisVisit = false;
             /* `paid_<tour>` now, one per tour — the old single `paid` is
                dead and clearing it would leave both real flags set, so
                replaying would silently pay nothing and look broken. */
             write({ never:0, done:0, paid:0,
                     paid_quick:0, paid_full:0, handedOver:0 });
           } };
})();
