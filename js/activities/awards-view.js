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

  function row(a){
    var box = el('div', 'aw-row' + (a.got ? ' is-got' : ''));
    box.appendChild(el('span', 'aw-mark', a.got ? '\u2605' : '\u2606'));
    var body = el('span', 'aw-body');
    body.appendChild(el('span', 'aw-name', t(a.key)));
    if (a.got && a.when){
      body.appendChild(el('span', 'aw-when',
        new Date(a.when).toLocaleDateString()));
    } else {
      body.appendChild(el('span', 'aw-when', t('awLocked')));
    }
    box.appendChild(body);
    box.appendChild(el('span', 'aw-pay' + (a.got ? '' : ' is-dim'), '\u25c8 ' + a.pay));
    return box;
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
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
      purse.appendChild(el('span', 'aw-paid-n', '\u25c8 ' + paid));
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
      rule.appendChild(el('span', 'aw-rule-glyph', '\u25c8'));
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
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit };
    if (GH.awards) GH.awards.check();
    paint();
  }

  return { open:open };
})();
