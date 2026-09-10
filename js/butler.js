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

           .bt-scrim    700   paint only
           .bt-lit      810   the thing he is pointing at
           .bt-overlay  900   the bubble
           .bt-gift     950   the crystal hand-over

       Raised from 70/81/90 on 09 Sep. At 90 the bubble still sat under
       the lightbox (200), the how-to overlay (200) and the language
       picker (120), so "Waddles is behind" was reachable from several
       steps. He is now above every z-index in the stylesheet.
       Steven: "pull him to the top everywhere across the board." 

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
    /* THE SCRIM IS ITS OWN ELEMENT NOW, SO IT HAS TO BE CLOSED TOO.

       It used to be `.bt-overlay`'s own background, so clearing the
       class above cleared the dim with it. Splitting it into a separate
       layer (see the note by `ensure`) broke that and `close()` was never
       updated — so declining the tour hid Waddles and left the page
       under a full-screen dim with nothing on it.

       Steven, 09 Sep: "Dark because it wanted to do a tour and I said let
       me explore but stayed dark." Every exit runs through here — the
       decline, the finish, stop(), and each armed tap — so this one line
       covers all of them. */
    if (scrim) scrim.className = 'bt-scrim';
    document.body.style.overflow = '';
    clearHighlight();
    /* Everything pending, in one call — see `cancelPending`. This used to
       be a hand-written list here and each of the other exits kept its
       own, slightly different, copy. */
    cancelPending();
  }

  /* ---------- WAITING FOR HER TO PRESS THE REAL BUTTON ----------

     A step with `tap:true` does not advance on a Next button. It lights up
     something on the page and waits for her to use it.

     That is the difference between a tour she watches and one she performs.
     Being told where the balance is and pressing it once are not the same
     memory, and the second one survives.

     The listener goes on the element itself and is removed when the step
     ends, so nothing is left behind if she abandons the tour. */
  /* ONE DOCUMENT-LEVEL CAPTURE LISTENER, NOT A LISTENER ON THE NODE.

     The per-node version had a fatal ordering hole, and it is why the
     Full Tour could never get past its first "Open Read and listen" step
     (found 10 Sep by walking the tour in a scripted DOM):

       1. The target's OWN click handler was registered when its screen
          painted, so it runs BEFORE the butler's — listeners on one node
          fire in registration order.
       2. If that handler repaints a screen that STILL CONTAINS the same
          selector — every `[data-toc-group=…]` header, every `.backlink`
          on a screen whose destination also has one — the repaint chain
          runs nav.ready() → resume() → step() → arm() synchronously,
          inside her tap.
       3. arm() begins with disarm(), which removed the butler's
          not-yet-fired handler from the old node MID-DISPATCH. A listener
          removed mid-dispatch never fires (DOM spec), so `then()` — the
          state.i++ — never ran. The step re-armed on the new node and the
          tour looped on the same instruction forever.

     The Quick Tour never tripped it because none of its tap targets exist
     under the same selector on the screen the tap paints. The Full Tour
     tripped it at every group-open and every two-back chain.

     A capture listener on `document` fires before ANY handler on the
     target, so the advance happens first and nothing that runs later in
     the same tap can cancel it. Containment is checked so only a tap on
     (or inside) the armed element advances — the lit target is sometimes
     a wrapper like `.sg-songlist`, and the real tap lands on a tile
     inside it. disarm() just clears the reference; the one listener stays
     installed and idle. */
  var armedNode = null;
  var armedThen = null;

  function disarm(){
    armedNode = null;
    armedThen = null;
  }

  document.addEventListener('click', function(e){
    if (!armedNode || !armedThen) return;
    var t = e.target;
    if (t !== armedNode && !(armedNode.contains && armedNode.contains(t))) return;
    /* "OPEN X" MEANS ENSURE OPEN. A Table of Contents group header
       TOGGLES, and the tour reaches several of them while they are
       already open — `backHere()` restores the contents with the group
       she came from still expanded. Letting the tap through would CLOSE
       it, so the very next step's row ('Tap Songs', 'Tap Progress') is
       gone from the DOM and the tour desyncs into plain-Next fallbacks
       for the rest of the run. Found 10 Sep by walking the Full Tour.

       So when the armed target is a group header that is already open,
       the click advances the tour and goes no further: the group stays
       open, and the 700ms paint deadline draws the next step. Only group
       headers toggle among armed targets, so the check is exactly this
       narrow. */
    if (armedNode.hasAttribute && armedNode.hasAttribute('data-toc-group')
        && /\bis-open\b/.test(String(armedNode.className))){
      e.stopPropagation();
      e.preventDefault();
    }
    var go = armedThen;
    disarm();
    clearHighlight();
    /* The app is about to repaint — she pressed a real button and it
       does what it always does. The tour picks itself up on the other
       side, in `resume()`. Advancing here, in capture, means the
       target's own handler cannot cancel it however it repaints. */
    go();
  }, true);

  function arm(sel, then){
    disarm();
    var n = document.querySelector(sel);
    if (!n) return false;
    armedNode = n;
    armedThen = then;
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

  /* THE STEP FOLLOWS HER, EVEN WHEN SHE NAVIGATES HERSELF.

     `nav.js` calls this on every screen paint. It used to return early
     unless the tour was waiting for a paint — which it only ever is
     after a TAP step she performed as instructed. Any navigation she did
     on her own left the bubble showing the old step with its highlight
     pointing at an element that had gone with the previous screen.

     Reachable, and Steven hit it, 09 Sep: the Full Tour's step 6
     highlights the Table of Contents jump pills. Those are not a tap
     step, but they are ringed, and `toc.js`'s `jumpTo()` calls
     `state.onExit()` — so tapping one throws her out to the hub. The
     bubble stayed behind talking about the contents, and when she came
     back in, `[data-toc-group="read"]` was never re-highlighted because
     `step()` had never run again.

     So a paint now redraws the CURRENT step wherever she is. `step()`
     does not advance — the index only moves in the tap handler and the
     Next button — so this is idempotent: same text, highlight re-applied
     to the new screen, and the tap re-armed if the target is here. If it
     is not here, the step falls back to a plain Next, which is the
     existing behaviour for an off-screen target.

     `state` is null once the tour is stopped or finished, so a dismissed
     butler is not resurrected by navigating. */
  /* RE-ENTRY GUARD. `show()` finishes by calling `GH.nav.ready()`, and
     `ready()` calls this — so without the flag the chain is

         show() -> nav.ready() -> resume() -> step() -> show() -> ...

     which recurses until the stack overflows and the script dies. That is
     what "Waddles shows the jumpbar and then he is gone" was: not a
     misplaced bubble, a dead page.

     It did not happen before 09 Sep because `resume()` used to return
     early unless it was waiting for a paint, and that early return was
     the only thing breaking the loop. Widening resume() so he survives
     any repaint removed the brake without replacing it. */
  /* ==========================================================
     ONE PLACE THAT STOPS EVERYTHING.
     ==========================================================

     The tour keeps nine pieces of live state — the overlay, the current
     step, the element it lit, the armed node and its handler, the
     wait-for-paint flag and its deadline, the re-entry flag, and the
     scroll-settle poll. Every one of them used to be cleared by whichever
     function happened to remember it.

     That is what made this brittle, and it is exactly how four separate
     bugs arrived on 09 Sep: a settle poll that outlived its bubble, a
     deadline racing `resume()`, a re-entry loop through `nav.ready()`,
     and a stale measurement. None of them were the tour's LOGIC. All of
     them were something left running.

     So there is one canceller. Anything that ends or restarts a step
     calls it, and a new feature only has to add its cleanup HERE rather
     than remember to add it to close(), stop(), finish() and step().

     If you add a timer, an observer or a listener to this file, clear it
     in `cancelPending()`. That is the whole contract. */
  /* TWO DIFFERENT KINDS OF "STOP".

     `cancelPending()` tears down what belongs to the CURRENT BUBBLE — the
     armed handler, the element it lit, the scroll-settle poll. `close()`
     calls it, because the bubble is going away.

     `abandon()` additionally throws away the WAIT FOR THE NEXT SCREEN.
     Only `stop()` and `finish()` call it, because only they mean the tour
     is over.

     WHY THE SPLIT EXISTS. An armed tap runs

         waitForPaint(); close();

     — arm the wait, then take the bubble down while the app repaints. My
     first version of `cancelPending()` cleared `waitingForPaint` and the
     deadline as well, so `close()` wiped the wait the line above had just
     set: the step never redrew and Waddles was gone for good. Steven hit
     it on the Quick tour's Reference step, 10 Sep.

     The wait must survive the close. That is the whole point of it. */
  function cancelPending(){
    if (settleTimer){ clearTimeout(settleTimer); settleTimer = null; }
    pendingLit = null;
    disarm();
  }

  function abandon(){
    cancelPending();
    if (paintTimer){ clearTimeout(paintTimer); paintTimer = null; }
    waitingForPaint = false;
  }

  var drawing = false;

  /* THE ONE WAY A STEP GETS DRAWN.

     Everything that wants the current step on screen calls this: the
     armed tap's repaint, the wait deadline, `nav.ready()` on any new
     screen. It is the only function that calls `step()` from outside the
     tour's own advance, which means the re-entry guard only has to exist
     in one place.

     `drawing` is that guard. `show()` ends by calling `nav.ready()`,
     which calls back in here — without it the chain

         show() -> nav.ready() -> resume() -> step() -> show() -> ...

     recurses until the stack overflows and the page dies. That was the
     "Waddles vanishes after the jumpbar" bug of 09 Sep, and it is the
     reason this guard must never be removed to make some other case
     work. If a new caller needs a redraw, it calls resume(); it does not
     call step().

     `try/finally` rather than clearing the flag at the end: a throw
     inside step() would otherwise leave the tour permanently unable to
     draw itself again, turning one bad step into a dead tour. */
  /* EVERY DRAW GOES THROUGH HERE. `step()` is never called directly.

     Before 09 Sep four places called `step()` themselves — the wait
     deadline, `start()`, and the two Next-button advances — so the
     re-entry guard in `resume()` protected exactly one of the five paths.
     A guard that covers one caller is not a guard, it is a coincidence.

     `try/finally` so a throw inside a step cannot leave `drawing` stuck
     true, which would make the tour permanently unable to redraw itself:
     one bad step would become a dead tour. */
  /* ---------- WHERE SHE GOT TO ----------

     Steven, 09 Sep: "tour should have a resume later feature, especially
     full tour, it is huge." Ninety-three steps is more than one sitting,
     and a tour that can only be restarted from step one is a tour that
     gets abandoned at step forty.

     Written on every draw, so it survives a refresh, a crash, a closed
     tab — anything, without needing an exit path to remember to save.
     That matters more than it sounds: the reason four bugs landed
     tonight is that exit paths each remembered a different subset of
     things.

     Cleared in `finish()` only. Stopping does NOT clear it — stopping is
     precisely the case this exists for. */
  function mark(){
    if (!state || !state.tour) return;
    write({ at: { tour: state.tour.id || '', i: state.i } });
  }

  function resumePoint(){
    var a = read().at;
    if (!a || !a.tour) return null;
    var list = script().tours || [];
    for (var i = 0; i < list.length; i++){
      if (list[i] && list[i].id === a.tour){
        /* A saved index past the end of a rewritten tour is meaningless;
           so is one on the very first step, which is just "start". */
        if (!list[i].steps || a.i <= 0 || a.i >= list[i].steps.length) return null;
        return { which: i, i: a.i, tour: list[i] };
      }
    }
    return null;                       /* the tour it names is gone */
  }

  function draw(){
    if (!state || !state.tour) return;
    if (drawing) return;
    drawing = true;
    try { step(); mark(); }
    finally { drawing = false; }
  }

  function resume(){
    if (!state || !state.tour) return;
    if (waitingForPaint){
      waitingForPaint = false;
      if (paintTimer){ clearTimeout(paintTimer); paintTimer = null; }
    }
    draw();
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
      draw();
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
    /* Placement is decided below, in place(), once both the bubble and
       the target are measurable. Nothing to preserve here. */
    host.className = 'bt-overlay is-open' + (blocking ? ' is-blocking' : '');
    if (scrim) scrim.className = 'bt-scrim is-open' + (blocking ? ' is-blocking' : '');
    document.body.style.overflow = blocking ? 'hidden' : '';

    /* highlight() ran inside build(), before the bubble existed — it could
       only guess where to scroll. Now that the stage is actually in the
       DOM, its real height is known, so do the scroll here instead. */
    if (pendingLit){
      /* AFTER THE PAGE HAS STOPPED MOVING, not before.

         Steven, 09 Sep: the Games step zooms down from the jumpbar, then
         "he warps up and says 'and here are the games', which are no
         longer on the screen."

         The jumpbar scrolls SMOOTHLY. Measuring the target the instant
         the bubble is appended reads a rectangle that is still in flight,
         and then `scrollBy` adds a delta on top of an animation that has
         not finished — the two compound and the section overshoots off
         the screen.

         So wait for `scrollY` to hold still, then measure. */
      settleThenPlace(pendingLit, stage);
      pendingLit = null;
    }

    if (GH.nav) GH.nav.ready();
  }

  /* HE IS AT THE TOP LEFT NOW (see .bt-overlay.is-open in style.css), so
     the free space is BELOW him, not above. A plain
     scrollIntoView({block:'center'}) assumes the whole viewport is free
     and can centre a tile right where the bubble already is.

     This function used to park the target a short gap ABOVE the stage,
     which was correct while the stage sat on the bottom edge. Inverted 08
     Sep along with the move: the target is now parked a short gap BELOW
     the stage's bottom. The pointer and the thing it points at still read
     as one unit and the eye still travels a few dozen pixels — the axis is
     the only thing that changed. */
  /* Waits for any smooth scroll already running to finish, then places
     him. Polls `scrollY` and acts once it has not moved for two frames.

     A DEADLINE, because a page that never stops scrolling — a momentum
     fling on a phone, say — must not leave the step unplaced forever.
     After 400ms it places him wherever things have got to; a slightly
     wrong position is recoverable, no position at all is not. */
  var settleTimer = null;

  function settleThenPlace(n, stage){
    if (settleTimer){ clearTimeout(settleTimer); settleTimer = null; }
    var last = -1, still = 0, waited = 0;
    (function tick(){
      var y = window.scrollY || window.pageYOffset || 0;
      still = (y === last) ? still + 1 : 0;
      last = y;
      waited += 40;
      if (still >= 2 || waited >= 400){
        settleTimer = null;
        place(n, stage);
        return;
      }
      settleTimer = setTimeout(tick, 40);
    })();
  }

  /* ---------- WHICH END OF THE SCREEN HE STANDS AT ----------

     Steven, 09 Sep: first "Waddles hogs up the screen so you can't see
     the Appearance menu", then "he's over on top of the achievement
     button — thought you fixed this?"

     The first attempt decided this inside `highlight()`, which runs
     before the bubble exists and before anything has scrolled. So it was
     measuring a target that was about to move, against a bubble that was
     not there — and when the page could not scroll far enough to finish
     the job, he ended up sitting on the thing he was pointing at.

     Decided here instead, where both rectangles are real:

       1. Park the target with `scrollClear()`.
       2. Measure whether he now OVERLAPS it.
       3. If he does, move to the other end and park it again.

     Overlap is the actual test. Height on the page was a proxy for it,
     and a proxy is what let the Achievements step through: that tile sits
     low enough to look safe, and the page had no room left to scroll it
     clear.

     One flip, never a loop: if he overlaps at both ends the target is
     taller than the free space either way, and moving him a third time
     would only make the screen jump. */
  /* CLOSE COUNTS AS OVERLAPPING.

     Steven, 10 Sep: on the Quick tour's Reference step "his speech bubble
     slightly overlaps the top of Reference — he's crowding out the button
     he wants you to press."

     The first version asked only whether the two rectangles intersected,
     so a bubble whose bottom edge sat one pixel above the button counted
     as clear. Technically true and useless: a step that points at a
     button has to leave the button obviously reachable, not merely
     untouched.

     `PAD` is the breathing room required between them. Fail it and he
     moves to the other end, exactly as a real overlap does. */
  var PAD = 26;

  function overlaps(a, b){
    return !(a.bottom + PAD <= b.top || a.top - PAD >= b.bottom);
  }

  function place(n, stage){
    scrollClear(n, stage);
    try {
      var sr = stage.getBoundingClientRect();
      var r  = n.getBoundingClientRect();
      if (!overlaps(sr, r)) return;

      var wasLow = /\bis-low\b/.test(host.className);
      host.className = wasLow
        ? host.className.replace(/\s*is-low\b/, '')
        : host.className + ' is-low';
      scrollClear(n, stage);
    } catch (e){
      /* No geometry: leave him where the first pass put him. */
    }
  }

  function scrollClear(n, stage){
    try {
      var sr = stage.getBoundingClientRect();
      var r = n.getBoundingClientRect();
      /* The same breathing room the overlap test demands, so parking
         and checking cannot disagree. */
      var gap = PAD;
      var vh = window.innerHeight || document.documentElement.clientHeight;

      /* WHICH SIDE OF HIM THE FREE SPACE IS ON.

         This function was written when the bubble always sat at the top,
         so the space to park a target in was always BELOW him. Since 09
         Sep a step whose target is near the top of the screen moves him
         to the bottom instead (`is-low`) — and then the space is above
         him, `vh - stageBottom` is nearly zero, and this parked the tile
         just under a bubble already on the bottom edge, pushing it off
         the screen entirely. That is the Quick Tour's Progress step
         landing in the wrong place.

         So: measure where he actually is and park on the roomier side. */
      var lowNow = host && /\bis-low\b/.test(host.className);
      if (lowNow){
        /* He is at the bottom. Bring the target's BOTTOM to just above
           his top, so the two read as one unit the same way they do when
           he is at the top. */
        var desiredBottom = sr.top - gap;
        var dl = r.bottom - desiredBottom;
        if (Math.abs(dl) > 2){
          window.scrollBy({ top: dl, left: 0, behavior: 'smooth' });
        }
        return;
      }

      var stageBottom = sr.bottom;
      var freeHeight = vh - stageBottom - gap;
      if (freeHeight < r.height){
        /* Taller than the space he leaves below him. Nothing to park
           within, so bring its top to just under him and let the rest run
           off the bottom — she can scroll, and its top edge is the part
           that identifies it. */
        var over = r.top - (stageBottom + gap);
        if (Math.abs(over) > 2){
          window.scrollBy({ top: over, left: 0, behavior: 'smooth' });
        }
        return;
      }
      /* JUST BELOW THE BUBBLE, NOT CENTRED BELOW IT. Centring in the whole
         space under him would strand a small tile near the bottom of the
         screen, which is the same mistake the old version made at the
         other end: correct by its own rule, useless to look at. */
      var desiredTop = stageBottom + gap;
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

      /* CARRY ON WHERE SHE STOPPED, offered first and as the primary
         button — it is the only one of these that is not starting over.

         This is the ONE place a tour gets a `primary`. The note below
         explains why the two tours are deliberately equal; a saved
         position is different in kind, because she already chose a tour
         and simply did not finish it.

         Only when there is somewhere to go back to: `resumePoint()`
         returns null on step zero, past the end of a rewritten tour, or
         for a tour that no longer exists. */
      var back = resumePoint();
      if (back){
        add(acts, say(o.resume) || t('btResume'), 'primary', function(){
          state = { tour: back.tour, i: back.i };
          /* A BEAT BEFORE DROPPING HER BACK IN. Steven's line, 09 Sep.
             Landing straight on step 42 of 93 with no acknowledgement
             reads as a glitch — she has no way to tell a resume from a
             tour that started in the wrong place. */
          show(function(b2){
            b2.appendChild(el('p', 'bt-line', t('btBack')));
            var a2 = el('div', 'bt-acts');
            add(a2, say(script().nextLabel), 'primary', draw);
            b2.appendChild(a2);
          }, true);
        });
      }

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
    draw();
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

  /* ---------- THE GIFT, SHOWN RATHER THAN MENTIONED ----------

     The line says "here are 10 to get you started" and the balance in the
     header ticks up, which is a small number in a corner she is not
     looking at. Steven, 08 Sep: show it front of screen, the crystal at
     least as big as Waddles, with +10 above it.

     Deliberately `pointer-events:none` and self-removing on a timer. The
     same step asks her to tap the crystal icon, so a panel she has to
     dismiss first would be standing in front of the thing it is
     announcing. Nothing to press, nothing to get stuck behind.

     The image falls back to the crystal character if the file is missing,
     the same way coins.js's mark does — a 404 must not leave a blank box
     in the middle of the screen. */
  function giftPop(n){
    var pop = el('div', 'bt-gift');
    pop.setAttribute('aria-hidden', 'true');

    pop.appendChild(el('p', 'bt-gift-n', t('btGiftPop', { n:n })));

    var src = 'images/ui/crystal.webp';
    var img = document.createElement('img');
    img.className = 'bt-gift-img';
    img.alt = '';
    img.src = GH.build ? GH.build.url(src) : src;
    img.addEventListener('error', function(){
      var fb = el('span', 'bt-gift-img is-char', '\u25c8');
      if (img.parentNode) img.parentNode.replaceChild(fb, img);
    });
    pop.appendChild(img);

    document.body.appendChild(pop);
    window.setTimeout(function(){
      if (pop.parentNode) pop.parentNode.removeChild(pop);
    }, 2200);
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
      giftPop(s.gift);
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
            draw();
          });
        });
        exitActions(acts);
        box.appendChild(acts);
        /* NO STEP COUNTER. Removed 08 Sep: a step can now be two-part (see
           the Quick Tour's Reference→Progress pair), so `steps.length` is
           not the number of stops she experiences, and "2 of 13" was simply
           wrong. If a count comes back it has to be computed, not the array
           length. `btStepN` is left in i18n.js for that day. */
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
          draw();
        });
      }

      exitActions(acts);
      box.appendChild(acts);
      /* No step counter here either — see the note above. */
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
    /* The tour is over, so the wait for a next screen goes too — see the
       note by `cancelPending`. `close()` alone deliberately keeps it. */
    abandon();
    state = null;
    perch(true);
  }

  /* ---------- TWO WAYS OUT, AND THEY MEAN DIFFERENT THINGS ----------

     Steven, 09 Sep: "have 2 stop options — Continue tour later / End tour
     now."

     There was one button, and it saved her place silently. So a tour she
     meant to abandon kept offering to resume, and a tour she meant to
     pause never said it had been remembered. One button cannot answer a
     question with two answers.

       later   leaves the saved position alone. `draw()` has already
               written it, so there is nothing to do but close.
       end     clears it, so the next offer starts clean.

     Neither writes `done` — that is finish()'s to write, and it is what
     stops the tour being offered at all. Ending early is not finishing.

     Built here rather than at the two call sites so they cannot drift;
     they were already two identical copies of the old single button. */
  /* HE SAYS WHERE HE WENT ON THE WAY OUT.

     Steven's line, 09 Sep. Without it, closing the tour looks like
     dismissing him permanently — the perch at the top is small and she
     has no reason to know it is him.

     Shown on BOTH exits, because both leave him on the perch: pausing
     and ending differ only in whether the saved position survives.

     `state` is already null by the time this draws — `stop()` cleared it
     — so this is a plain bubble with one button, not a tour step. That
     also means `draw()` will not touch it. */
  function farewell(){
    show(function(box){
      box.appendChild(el('p', 'bt-line', t('btBye')));
      var acts = el('div', 'bt-acts');
      add(acts, t('howtoGot'), 'primary', function(){
        close();
        perch(true);
      });
      box.appendChild(acts);
    }, false);
  }

  function exitActions(acts){
    add(acts, t('btLater'), 'ghost', function(){
      clearHighlight();
      disarm();
      /* The position stays: `draw()` wrote it on the way in. */
      stop();
      farewell();
    });
    add(acts, t('btEndNow'), 'ghost', function(){
      clearHighlight();
      disarm();
      write({ at: null });
      stop();
      farewell();
    });
  }

  /* The tour ends by going somewhere. A tour that ends where it began has
     shown her a map and given her nothing to do. */
  function finish(){
    var go = state && state.tour ? state.tour.go : null;
    /* `at:null` — she reached the end, so there is nothing to come back
       to. Stopping deliberately leaves it. */
    write({ done: Date.now(), at: null });
    close();
    abandon();
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
    /* `bt-lit` gives the ring and the lift. But the lift needs
       `position` set, and setting it unconditionally CLOBBERS an element
       that is already positioned — `.backlink` is `position:fixed`, and
       eighteen tour steps point at it, so highlighting the back button
       dropped it out of its fixed corner and into the document flow.
       Measured 09 Sep.

       So the positioning half is its own class, added only when the
       element is actually static and therefore has nothing to lose. */
    n.className += ' bt-lit';
    try {
      var pos = window.getComputedStyle(n).position;
      if (pos === 'static') n.className += ' bt-lit-static';
    } catch (e){
      /* No computed style available: skip the lift rather than risk
         moving the element. The ring still shows. */
    }
    /* The scroll itself waits for show() to finish appending the bubble —
       see pendingLit / scrollClear() there. The bubble does not exist yet
       at this point in the call, so there is nothing correct to measure
       here. */
    /* WHERE HE STANDS IS DECIDED LATER, IN `place()`, once the bubble is
       in the DOM and the scroll has happened. It used to be decided here
       and that was wrong twice over: the target has not been scrolled yet,
       so the measurement is stale, and the bubble does not exist, so there
       is nothing to measure it against. */
    pendingLit = n;
    return true;
  }

  function clearHighlight(){
    var lit = document.querySelectorAll('.bt-lit');
    var i;
    for (i = 0; i < lit.length; i++){
      lit[i].className = lit[i].className
        .replace(/\s*bt-lit-static\b/, '')
        .replace(/\s*bt-lit\b/, '');
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
