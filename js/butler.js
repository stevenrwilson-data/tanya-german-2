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

  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  function script(){ return window.GH_BUTLER || null; }

  /* A line may be a plain string or a per-language object. Steven writes
     whichever suits; this does not care. */
  function say(x){
    if (!x) return '';
    if (typeof x === 'string') return x;
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

  function due(){
    /* HE MUST HAVE SOMETHING TO SAY.

       This tested that `offer` EXISTED, and it does — as an object full of
       empty strings, which is the state the script ships in. So he opened
       with an empty bubble covering the whole page and nothing to close it
       with. The page was rendered underneath and completely unusable.

       An unwritten script is the normal state while the words are being
       written, and it has to be invisible rather than fatal. */
    var o = script() && script().offer;
    if (!o || !say(o.line)) return false;

    /* And somewhere for the answer to go. Every tour with steps becomes a
       button; with none, the only button would be the refusal, which is a
       question not worth asking. */
    var tours = (script().tours || []).filter(function(x){
      return x && x.steps && x.steps.length;
    });
    if (!tours.length) return false;

    if (askedThisVisit) return false;
    var mine = read();
    if (mine.never) return false;
    if (mine.done) return false;
    return true;
  }

  /* ---------- the overlay ---------- */

  function ensure(){
    if (host) return host;
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
    document.body.style.overflow = blocking ? 'hidden' : '';
    if (GH.nav) GH.nav.ready();
  }

  /* ---------- the offer ---------- */

  /* THE TOURS ARE THE ANSWERS.

     This used to ask yes / later / never, and then ask AGAIN which tour.
     Two screens for one decision, and the first screen offered a "yes" to a
     question whose real answer is "which one".

     So every written tour is a button, and refusing is the last one. A
     script with one tour shows one button and a refusal; with three, three.
     Nothing here needs to know how many there are. */
  function offer(){
    if (!due()) return;
    askedThisVisit = true;
    var o = script().offer || {};
    var tours = (script().tours || []).filter(function(x){
      return x && x.steps && x.steps.length;
    });

    show(function(box){
      box.appendChild(el('p', 'bt-line', say(o.line)));

      var acts = el('div', 'bt-acts');
      tours.forEach(function(tour, i){
        add(acts, say(tour.label), i === 0 ? 'primary' : 'ghost', function(){
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
      script().tours.forEach(function(tour, i){
        add(acts, say(tour.label), i === 0 ? 'primary' : 'ghost', function(){ start(i); });
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

  function step(){
    var s = state.tour.steps[state.i];
    if (!s){ finish(); return; }

    /* A step that pays. Once ever, per profile — a replayable tour that
       pays is a tour she can farm. */
    if (s.gift && !read().paid){
      if (GH.coins && GH.coins.earn) GH.coins.earn(s.gift, 'butler');
      write({ paid: s.gift });
      if (GH.purse) GH.purse.refresh();
    }

    var last = state.i >= state.tour.steps.length - 1;

    show(function(box){
      box.appendChild(el('p', 'bt-line', say(s.line)));

      /* `points` names something on the page to draw her eye to. Absent is
         fine; most steps are just words. */
      var lit = false;
      if (s.points) lit = highlight(s.points);

      var acts = el('div', 'bt-acts');

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
        finish();
      });
      box.appendChild(acts);

      box.appendChild(el('p', 'bt-count',
        t('btStepN', { n:state.i + 1, of:state.tour.steps.length })));
    });
  }

  /* The tour ends by going somewhere. A tour that ends where it began has
     shown her a map and given her nothing to do. */
  function finish(){
    var go = state && state.tour ? state.tour.go : null;
    write({ done: Date.now() });
    close();
    state = null;
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
       he is standing — a generic icon would make it a menu item. */
    if (script().portrait){
      var img = document.createElement('img');
      img.className = 'bt-perch-face';
      img.src = GH.build ? GH.build.url(script().portrait) : script().portrait;
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
      askedThisVisit = false;
      write({ never: 0 });
      offer();
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
    try {
      n.scrollIntoView({ block:'center', behavior:'smooth' });
    } catch (e){
      try { n.scrollIntoView(); } catch (e2){}
    }
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
             write({ never:0, done:0, paid:0, handedOver:0 });
           } };
})();
