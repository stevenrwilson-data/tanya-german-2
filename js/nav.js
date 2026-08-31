/* Moving around, the same way everywhere.

   Two actions exist on every screen in the app, so they are defined once
   here rather than re-invented per activity — which is how they drifted
   apart in the first place.

     leaving   Escape, or a long swipe left
     advancing space, Enter, a tap, or a swipe right

   Both work by clicking a button that is already on the page: `.backlink`
   for leaving, `.js-advance` for moving on. That matters more than it
   looks. Each activity wires its own cleanup to its back button — stopping
   clocks, cancelling spawn timers, unhooking listeners — and calling the
   hub directly would skip all of it. Going through the button means every
   screen, including any added later, behaves correctly for free.

   An activity opts in to advancing by putting `js-advance` on its next
   button and calling GH.nav.ready() once it has painted. */

window.GH = window.GH || {};

GH.nav = (function(){

  /* Controls that own their own taps and keys. Everything else on the page
     — pictures, text, empty space — is fair game for advancing, which is
     what makes 'tap anywhere' usable on a phone where the pictures cover
     most of the screen. */
  var KEEP = 'input, textarea, select, .backlink, .btn, .btn-quiet, .speak,' +
             ' .lp-play, .mode-toggle, .howto-btn, .chip, .jumpbar, .filterwrap,' +
             ' .theme-swatch, .langswitch, .typeswitch,' +
             /* Anything with its own job on a screen that also has an
                advance button has to be listed here, or one tap does two
                things. Three screens were quietly wrong:

                  .rd-line     tapping a line of a story to hear it also
                               started the questions
                  .rd-choice   tapping an answer also submitted it
                  .pt-lens     tapping a pet to enlarge it also started
                               another round
                  .cm-btn      Play and Auto also advanced the comic
                  .cm-de       tapping the German to repeat it advanced
                  .sg-line     tapping a lyric to hear it advanced

                Two of those only failed intermittently, because ready()
                resets the 450ms bubble guard on every repaint and that
                sometimes swallowed the second action. A control that
                works when the screen happens to have just repainted is
                not working. */
             ' .rd-line, .rd-choice, .pt-lens, .cm-btn, .cm-de, .cm-swap,' +
             ' .sg-line, .sg-par-line, .sg-recur, .co-word, .es-item,' +
             ' .pt-say-de, .pt-say-btn, .co-earn-shop, .co-total-shop, .es-hear, .tile,' +
             ' .cm-card, .cm-prev, .cm-next, .cm-auto,' +
             /* The dialogues. Every one of these has its own job on a
                screen that also has an advance button, which is the
                condition that made the six above fire twice. */
             ' .dg-line, .dg-choice, .dg-play, .dg-next, .dg-again, .dg-mode,' +
             /* The reader's translate button and its warning. The read
                view arms nav, so without these one tap would translate
                the piece AND start the questions it just spent. */
             ' .rd-translate, .rd-warn-yes, .rd-warn-no, .sg-words, .sw-de, .sw-lens, .pt-buy,' +
             ' .gd-open, .gd-head, .gd-go, .purse,' +
             ' .bt-btn, .bt-perch, .bt-box,' +
             ' .pt-strip-say, .petstrip, .petstrip-btn, .ptg-cell, .ptg-close,' +
             ' .ref-search, .ref-search-in, .ref-search-x,' +
             ' .gw-pic, .gw-guess, .gw-cat, .gw-val, .gw-ask-back, .gw-answer-q,' +
             ' .gw-size,' +
             ' .update-bar, .update-go, .update-no,' +
             ' .wc-lang, .wc-gender, .wc-btn, .wc-input,' +
             ' .gw-level, .gw-confirm-yes, .gw-confirm-no,' +
             ' .tl-card, .tl-stage, .tl-de, .tl-choice, .tl-order-btn,' +
             ' .tl-next, .tl-play,' +
             ' .dg-card, .dc-entry, .dc-sense-de, .dc-say';

  /* Space belongs to these when they have focus, so she can replay a
     sentence over and over without leaving the round. */
  var REPLAY = '.speak, .lp-play';

  var armedAt = 0;

  function q(sel){ return document.querySelector(sel); }

  function overlayOpen(){
    /* The pet grid is a third overlay and it was not in this list, so a
       tap or a swipe behind it would have advanced the screen underneath.
       Every overlay that covers the page belongs here. */
    return !!(q('.howto-overlay.is-open') || q('.lb-overlay.open') ||
              q('.ptg-overlay.is-open'));
  }

  function inside(node, sel){
    return !!(node && node.closest && node.closest(sel));
  }

  function advanceBtn(){
    var b = q('.js-advance');
    return (b && !b.disabled) ? b : null;
  }

  function leave(){
    var back = q('.backlink');
    if (!back) return false;
    back.click();
    return true;
  }

  /* ---------- THE BROWSER'S BACK BUTTON ----------

     This is one page, so nothing had ever put an entry in the history and
     Back left the site entirely. On a phone that is the swipe-from-the-left
     gesture as well, which makes it the most natural way to go back and the
     most destructive.

     The fix is not a router. `leave()` already does the right thing at
     every depth — it clicks whatever back link is on screen, which each
     activity has wired to its own idea of "up" — so the history only needs
     to know THAT THERE IS SOMEWHERE TO GO, not where.

     One spare entry is kept on the stack while a back link exists. Back
     pops it, we leave one screen, and a fresh entry is pushed so the next
     Back works too. When there is no back link — the hub — the entry is
     not replaced, so Back from the hub leaves the site, which is correct.

     `depth` guards against pushing two entries for one screen, which would
     make Back need two presses. */
  var pushed = false;

  function armHistory(){
    if (!window.history || !window.history.pushState) return;
    if (pushed) return;
    if (!q('.backlink')) return;          /* nothing to go back FROM */
    try {
      window.history.pushState({ gh:1 }, '', window.location.href);
      pushed = true;
    } catch (e){}
  }

  window.addEventListener('popstate', function(){
    pushed = false;
    /* Escape and the swipe now do the same thing, which is the point: one
       way back, however she asks for it. */
    if (leave()) armHistory();
  });

  function advance(){
    var b = advanceBtn();
    if (!b) return false;
    /* The tap or key that revealed the answer is still bubbling; without
       this she would never see the correction. */
    if (Date.now() - armedAt < 450) return false;
    b.click();
    return true;
  }

  /* An activity calls this once it has painted a screen with an advance
     button: focus lands where the next action is, so space works without
     her aiming at anything, and the clock starts on the bubble guard. */
  function ready(){
    armedAt = Date.now();
    /* Every activity calls this once it has painted, so it is the one place
       that knows a new screen exists — the same reason app.js hangs the
       event log off launch(). */
    armHistory();
    /* A tour in progress redraws itself here: launch() destroyed its box
       along with the rest of the view, and this is the one call every
       screen already makes once it has painted. */
    if (GH.butlerResume) GH.butlerResume();
    var b = advanceBtn();
    if (!b || !b.focus) return;
    var active = document.activeElement;
    /* leave focus alone if she is on a replay button, unless that button is
       the primary action itself */
    if (inside(active, REPLAY) && !inside(active, '.js-advance')) return;
    b.focus();
  }

  function onKey(e){
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;

    if (e.key === 'Escape' || e.key === 'Esc'){
      if (overlayOpen()) return;          /* the overlay owns Escape first */
      if (leave()) e.preventDefault();
      return;
    }

    if (e.key === 'Tab') return;          /* keep the page keyboard-reachable */
    if (overlayOpen()) return;
    if (inside(t, 'input, textarea, select')) return;

    var space = e.key === ' ' || e.key === 'Spacebar' || e.code === 'Space';
    var enter = e.key === 'Enter';
    if (!space && !enter) return;
    /* Space belongs to a replay button when it has focus — unless that
       button is itself the screen's primary action, which happens before
       she has heard the sentence at all. */
    if (space && inside(t, REPLAY) && !inside(t, '.js-advance')) return;
    if (inside(t, '.js-advance')) return; /* let the button's own click run */

    if (advance()) e.preventDefault();
  }

  function onClick(e){
    if (overlayOpen()) return;
    /* a tap on the primary button is its own business, but a tap anywhere
       else should still trigger it */
    if (inside(e.target, '.js-advance')) return;
    if (inside(e.target, KEEP)) return;
    advance();
  }

  /* Swipes have to be deliberate. A short flick is how you scroll a row of
     chips, and a screen that changes on a stray thumb movement is worse
     than one with no gesture at all. */
  var MIN_X = 130, MAX_Y = 90, MAX_MS = 900;
  var x0 = 0, y0 = 0, t0 = 0, live = false;

  function onTouchStart(e){
    if (e.touches.length !== 1){ live = false; return; }
    if (overlayOpen()){ live = false; return; }
    if (inside(e.target, 'input, textarea, .jumpbar, .filterwrap, .chips')){
      live = false; return;
    }
    var t = e.touches[0];
    x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); live = true;
  }

  function onTouchEnd(e){
    if (!live) return;
    live = false;
    var t = e.changedTouches && e.changedTouches[0];
    if (!t) return;
    var dx = t.clientX - x0, dy = t.clientY - y0;
    if (Date.now() - t0 > MAX_MS) return;
    if (Math.abs(dx) < MIN_X) return;
    if (Math.abs(dy) > MAX_Y) return;
    if (Math.abs(dx) < Math.abs(dy) * 2) return;   /* too diagonal */
    if (dx < 0) leave(); else advance();
  }

  function init(){
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouchStart, { passive:true });
    document.addEventListener('touchend', onTouchEnd, { passive:true });
  }

  return { init:init, ready:ready, leave:leave, advance:advance };
})();
