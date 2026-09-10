/* js/activities/cuegame.js */
/* Which question does this answer?

   A statement is shown. She taps the question word it answers.

       I went to the store.        →  where
       I had that yesterday.       →  when
       I met your friend Max.      →  who

   ------------------------------------------------------------------
   THE ONE GAME THAT WORKS IN EVERY LANGUAGE

   Almost nothing else here does. The five German games are about German
   morphology and conveyor is about German's present-tense future; none
   of them travel. This one travels by construction, because every
   language has question words and statements that answer them.

   The per-language part is a button list, and it comes from the DATA:

       English   6 buttons   where covers location, destination, origin
       German    8 buttons   wo · wohin · woher kept apart
       Russian   8 buttons   где · куда · откуда kept apart

   `GH_QUESTION_CUES.cuesFor(lang)` returns the distinct cue words with
   the bins each one covers, so grading is against the CUE WORD, not the
   bin id: in English, tapping `where` is right for all three location
   bins, and in German only `wohin` is right for a destination.

   THERE IS NO `if (lang === 'de')` IN THIS FILE AND THERE MUST NEVER BE.
   That is the difference between a game that scales to a new language on
   a data drop and one that needs editing every time.

   ------------------------------------------------------------------
   IT HIDES ITSELF RATHER THAN CARRYING A FLAG

   `available()` on the entry asks the bank whether it has that language.
   A missing bank therefore means no tile, never a tile serving the wrong
   language — which is exactly what conveyor did while it had no flag.

   ------------------------------------------------------------------
   THE GAME SHOWS THE STATEMENT AND NOTHING ELSE

   Steven's spec, and it is deliberately narrow: read the statement, tap
   the question word it answers, get told whether that was right. That
   is the whole loop.

   An earlier version of this file also revealed the full question after
   she chose, with a button to hear it. That was added on my own
   initiative and removed on 09 Sep — it was not asked for, and a second
   screen per round doubles the taps in a game whose point is speed of
   recognition.

   THE QUESTIONS DO APPEAR — ON THE END SCREEN. Steven, 09 Sep: showing
   the statement and its question side by side is worth having, just not
   mid-round. So `finish()` lists every statement from the round with
   its question, and tapping one reads the question aloud. */

window.GH = window.GH || {};

GH.cueGame = (function(){

  var host = null, state = null;

  var ROUND = 10;          /* statements per round */

  function t(k, v){ return GH.i18n.t(k, v); }

  function lang(){
    return (GH.player && GH.player.target) ? GH.player.target() : 'de';
  }

  function bank(){ return window.GH_QUESTION_CUES || null; }

  /* Her own language, for the line under the statement. Empty when she
     is reading in the language she is learning. `ruM` is the masculine
     Russian twin — same convention as lessons.js and butler.js. */
  function mine(bundle){
    var ui = (GH.i18n && GH.i18n.lang) ? GH.i18n.lang() : 'en';
    if (ui === lang()) return '';
    if (ui === 'ru' && bundle.ruM
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      return bundle.ruM;
    }
    return bundle[ui] || '';
  }

  /* The target-language text, honouring the gendered Russian twin for
     the case where she is learning Russian. */
  function target(bundle){
    var l = lang();
    if (l === 'ru' && bundle.ruM
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      return bundle.ruM;
    }
    return bundle[l] || bundle.en || '';
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function shuffle(a){
    return (GH.text && GH.text.shuffle) ? GH.text.shuffle(a) : a;
  }

  /* ---------- building a round ---------- */

  function pickItems(){
    var D = bank();
    var l = lang();
    /* Take from every bin rather than at random across the whole bank,
       so a round cannot come out as ten `where` statements and teach
       nothing. One per bin first, then fill. */
    var cues = D.cuesFor(l);
    var pool = [];
    (D.bins || []).forEach(function(b){
      var rows = shuffle(D.byBin(b.id).slice());
      if (rows.length) pool.push(rows[0]);
    });
    pool = shuffle(pool).slice(0, ROUND);

    if (pool.length < ROUND){
      var taken = {};
      pool.forEach(function(x){ taken[x.id] = 1; });
      var rest = shuffle((D.items || []).filter(function(x){ return !taken[x.id]; }));
      pool = pool.concat(rest.slice(0, ROUND - pool.length));
    }
    /* `cues` is captured so the round's buttons cannot change mid-round
       if she switches language in another tab. */
    state.cues = cues;
    return shuffle(pool);
  }

  /* ---------- the round ---------- */

  function paintRound(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    head.appendChild(GH.back.button(function(){ state.onExit(); }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('qcTitle')));
    head.appendChild(titles);
    host.appendChild(head);

    var it = state.items[state.i];
    var card = el('div', 'card');

    card.appendChild(el('p', 'ls-ask', t('qcAsk')));

    var line = el('div', 'ls-sentence');
    var st = target(it.st);
    line.appendChild(el('span', 'ls-sentence-de', st));
    card.appendChild(line);

    var tr = mine(it.st);
    if (tr) card.appendChild(el('p', 'ls-gloss', tr));

    /* the cue buttons, built from the data for this language */
    var opts = el('div', 'ls-opts' + (state.cues.length > 6 ? ' is-four' : ''));
    state.cues.forEach(function(c){
      var b = el('button', 'ls-opt', c.word);
      b.type = 'button';
      b.addEventListener('click', function(){ answer(c); });
      opts.appendChild(b);
    });
    card.appendChild(opts);

    card.appendChild(el('p', 'bt-count',
      t('qcProgress', { n:state.i + 1, of:state.items.length })));

    host.appendChild(card);
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  /* Graded against the CUE WORD. In English `where` covers three bins,
     so the right cue is whichever one lists this item's bin. */
  function answer(chose){
    var it = state.items[state.i];
    var right = chose.bins.indexOf(it.bin) >= 0;
    if (right) state.score++;
    else state.missed.push(it);
    state.shown = { chose:chose, right:right, item:it };
    paintVerdict();
  }

  function paintVerdict(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    head.appendChild(GH.back.button(function(){ state.onExit(); }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('qcTitle')));
    head.appendChild(titles);
    host.appendChild(head);

    var s = state.shown;
    var it = s.item;
    var D = bank();
    var l = lang();
    var correctCue = D.cueFor(it.bin, l);

    var card = el('div', 'card');

    card.appendChild(el('p', 'ls-verdict' + (s.right ? ' is-right' : ' is-wrong'),
      s.right ? '\u2713 ' + correctCue : '\u2717 ' + correctCue));

    var line = el('div', 'ls-sentence');
    line.appendChild(el('span', 'ls-sentence-de', target(it.st)));
    card.appendChild(line);

    var acts = el('div', 'bt-acts');
    var go = el('button', 'btn btn-primary js-advance',
      state.i + 1 >= state.items.length ? t('qcFinish') : t('qcNext'));
    go.type = 'button';
    go.addEventListener('click', function(){
      state.shown = null;
      state.i++;
      if (state.i >= state.items.length) finish();
      else paintRound();
    });
    acts.appendChild(go);
    card.appendChild(acts);
    host.appendChild(card);
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  /* ---------- the end ---------- */

  function finish(){
    var D = bank();
    var l = lang();
    var clean = state.score === state.items.length;

    var runLike = { answered:state.items.length, right:state.score };
    var paid = GH.coins ? GH.coins.award('cuegame', runLike, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('cuegame', runLike) : [];

    /* `de` and `gloss` are the fields endscreen.js's itemCard actually
       reads — along with `n`, `strike` and `flag`. An earlier version of
       this used `ru`, which itemCard ignores, so the second line of every
       review row rendered as nothing. Fixed 09 Sep. */
    var reviews = [];

    /* What she got wrong, and the word she should have tapped. */
    if (state.missed.length){
      reviews.push({
        head: t('qcMissedHead'),
        tone: 'missed',
        items: state.missed.map(function(it){
          return { de: target(it.st), gloss: D.cueFor(it.bin, l) };
        }),
        onTap: function(i){
          if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(i.de, l);
        }
      });
    }

    /* EVERY STATEMENT WITH ITS QUESTION, at the end of the round.

       Steven, 09 Sep: not during the game — that would double the taps
       in a game whose point is quick recognition — but afterwards, where
       seeing the pair together is worth something. So the questions live
       here and nowhere else in the game.

       Tapping a row reads the QUESTION aloud, not the statement: the
       question is the part she is being pointed at, and she has just
       read every statement anyway. */
    reviews.push({
      head: t('qcPairsHead'),
      items: state.items.map(function(it){
        return { de: target(it.st), gloss: target(it.q) };
      }),
      onTap: function(i){
        if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(i.gloss, l);
        else if (GH.speech && GH.speech.say) GH.speech.say(i.gloss);
      }
    });

    GH.endScreen.render(host, {
      coins: paid,
      won: won,
      tone: clean ? 'perfect' : 'done',
      glyph: clean ? '\uD83C\uDFC6' : '\u2753',
      title: clean ? t('cwPerfect') : t('doneTitle'),
      stats: [{ label:t('qcTitle'), value:state.score + ' / ' + state.items.length }],
      reviews: reviews,
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  /* ---------- entry ---------- */

  function begin(){
    state.i = 0;
    state.score = 0;
    state.missed = [];
    state.shown = null;
    state.items = pickItems();
    paintRound();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, i:0, score:0, missed:[], shown:null, items:[], cues:[] };
    if (!bank() || !bank().hasLang(lang())){
      /* Should be unreachable — `available()` keeps the tile off the hub
         when this is true — but a tutor or a deep link could still call
         open() directly, and a blank screen is worse than a way out. */
      host.textContent = '';
      var head = el('div', 'practice-head');
      head.appendChild(GH.back.button(function(){ onExit(); }));
      host.appendChild(head);
      host.appendChild(el('p', 'gr-note', t('qcNoBank')));
      return;
    }
    begin();
  }

  return { open:open };
})();

(function(){
  var entry = {
    id:'cuegame',
    glyph:'\u2753',
    name:{ ru:'Какой это вопрос?', de:'Welche Frage ist das?', en:'Which question?' },
    sub:{ ru:'На какой вопрос отвечает это предложение',
          de:'Welche Frage beantwortet dieser Satz',
          en:'Which question does this sentence answer' },
    rules:'qcRule', rulesTitle:'qcTitle',
    teaches:['question-words'],
    /* NO onlyDe AND NO onlyEn. The bank answers instead: the tile appears
       for any target the data covers, and adding a language is a column
       in data/question-cues.js rather than an edit here. */
    available: function(learning){
      /* `window.`-qualified on BOTH halves. The bare form resolves in a
         browser and throws anywhere the global object is not implicit —
         which is exactly where this gets tested. */
      var D = window.GH_QUESTION_CUES;
      return !!(D && D.hasLang(learning));
    },
    open:GH.cueGame.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
