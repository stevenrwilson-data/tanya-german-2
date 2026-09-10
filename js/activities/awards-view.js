/* js/activities/awards-view.js */
/* The achievements page.

   Earned ones first, then the ones still ahead. That order matters: a
   list led by twenty locked grey boxes tells a beginner she has failed at
   twenty things, when in fact she has just started.

   Locked ones say what they need in plain language rather than hiding
   behind a question mark. A goal you cannot see is not a goal. */

window.GH = window.GH || {};

GH.awardsView = (function(){

  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* Tap a row, get a description of what it actually asks for \u2014 requested
     directly, and the row had nowhere else to send a tap, so the whole
     row is the target rather than a small button squeezed onto it.

     The description key is the achievement's own key with 'Desc' on the
     end (awFirstRound -> awFirstRoundDesc), so a new achievement only
     needs the one new i18n key to be explained here too \u2014 nothing in this
     file has to change to cover it. */
  function row(a){
    var open_ = state.open === a.id;
    var box = el('button', 'aw-row' + (a.got ? ' is-got' : '') + (open_ ? ' is-open' : ''));
    box.type = 'button';
    box.appendChild(el('span', 'aw-mark', a.got ? '\u2605' : '\u2606'));
    var body = el('span', 'aw-body');
    body.appendChild(el('span', 'aw-name', t(a.key)));
    if (a.got && a.when){
      body.appendChild(el('span', 'aw-when',
        new Date(a.when).toLocaleDateString()));
    } else {
      body.appendChild(el('span', 'aw-when', t('awLocked')));
    }
    if (open_){
      body.appendChild(el('span', 'aw-desc', t(a.key + 'Desc')));
    }
    box.appendChild(body);
    var pay = el('span', 'aw-pay' + (a.got ? '' : ' is-dim'));
    pay.appendChild(GH.coins.markWith(a.pay));
    box.appendChild(pay);
    box.addEventListener('click', function(){
      state.open = open_ ? null : a.id;
      paint();
    });
    return box;
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = GH.back.button(function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('awTitle')));
    head.appendChild(titles);
    host.appendChild(head);

    var card = el('div', 'card');

    var all = GH.awards.all();
    var got = all.filter(function(a){ return a.got; });
    var left = all.filter(function(a){ return !a.got; });

    /* The count, said properly.

       It used to be the page subtitle — 0.8rem in the muted colour, under
       a 3rem heading — which read as a stray line of debug rather than as
       the number the page is about. It belongs on the bar it describes,
       at a size that says it matters. */
    var score = el('div', 'aw-score');
    var big = el('span', 'aw-score-n');
    big.appendChild(el('span', 'aw-score-got', got.length));
    big.appendChild(el('span', 'aw-score-of', '/'));
    big.appendChild(el('span', 'aw-score-all', all.length));
    score.appendChild(big);
    score.appendChild(el('span', 'aw-score-l', t('awTitle')));
    card.appendChild(score);

    /* a bar, because a fraction is easier to feel than to read */
    var bar = el('div', 'pk-bar');
    var fill = el('div', 'pk-fill');
    fill.style.width = Math.round(got.length / all.length * 100) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);

    /* What the achievements have paid so far — but only once they have
       paid something. 'Earned from achievements: 0' is a label reporting
       the absence of a thing, which reads as a bug, and the line below it
       already says nothing has happened yet. */
    var paid = got.reduce(function(a, b){ return a + b.pay; }, 0);
    if (GH.coins && paid){
      var purse = el('p', 'aw-paid');
      var paidN = el('span', 'aw-paid-n');
      paidN.appendChild(GH.coins.markWith(paid));
      purse.appendChild(paidN);
      purse.appendChild(el('span', 'aw-paid-l', t('awFromAwards')));
      card.appendChild(purse);
    }

    /* What a full day is.

       Nine of the nineteen achievements are counted in full days, and
       nothing on this page said what one was — so 'Three full days in a
       row' read as three days of opening the app. The numbers come from
       the economy rather than being written out, so they cannot drift
       away from what coins.js actually pays. */
    if (GH.coins && GH.coins.rates){
      var rule = el('div', 'aw-rule');
      rule.appendChild(GH.coins.mark('aw-rule-glyph'));
      var txt = el('p', 'aw-rule-text');
      txt.appendChild(el('b', null, t('awFullDayIs', { n:GH.coins.rates.target })));
      txt.appendChild(document.createTextNode(' ' +
        t('awFullDayNote', { k:GH.coins.rates.fullDay })));
      rule.appendChild(txt);
      card.appendChild(rule);
    }

    if (got.length){
      card.appendChild(el('h2', 'gr-group', t('awDone')));
      got.forEach(function(a){ card.appendChild(row(a)); });
    } else {
      card.appendChild(el('p', 'gr-note', t('awNoneYet')));
    }

    if (left.length){
      card.appendChild(el('h2', 'gr-group', t('awAhead')));
      card.appendChild(el('p', 'gr-note', t('awAheadNote')));
      left.forEach(function(a){ card.appendChild(row(a)); });
    }

    host.appendChild(card);

    /* TELL THE TOUR THE SCREEN EXISTS.

       `nav.ready()` is what every activity calls once it has painted, and
       it is the one place that knows a new screen is up — `butler.js`'s
       `resume()` hangs off it, so a tour step landing here can find and
       arm what it is pointing at.

       This view never called it. So on the Quick Tour's Achievements step
       the tour fell through to `waitForPaint`'s 700ms deadline instead —
       a race, and when this screen lost it the step drew before
       `.backlink` existed, failed to arm, and then asked her to press a
       back button it had never attached to. Tapping it navigated away
       without advancing. Steven, 09 Sep.

       Last line of `paint()`, so it fires after the card is in the
       document rather than while it is still being built. */
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, open:null };
    if (GH.awards) GH.awards.check();
    paint();
  }

  return { open:open };
})();
