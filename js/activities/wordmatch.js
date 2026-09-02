/* Word Matching — hear the words, then match them.

   Two halves of one activity. The first is hands-free listening: German,
   her language, German again, next word. The second is a matching quiz over
   the words she just heard.

   ------------------------------------------------------------------
   WHY THE LISTENING HALF EXISTS

   Nothing else in the app works without her eyes and a free hand. On a bus,
   doing dishes, walking to the Amt, every other activity is unusable. This
   is the one that fits the rest of her day.

   ------------------------------------------------------------------
   AND WHY IT IS NOT WORTH MUCH ON ITS OWN

   Five minutes of listening pays ten Kronen, ONCE a day, and does not
   advance the five exercises that make a full day. Listening is exposure,
   not practice, and a passive activity that could earn a full day would let
   the pets be bought without ever answering anything.

   The quiz is the practice, so the quiz is what counts: ten Kronen and one
   of the five, through the same coins.award() every game uses.

   ------------------------------------------------------------------
   PICTURES ARE OPTIONAL, AND THAT IS ABOUT HER DATA BILL

   On a phone away from wifi, seventy-two sprite sheets is real money. With
   pictures off nothing is fetched at all: the word is set large on a dark
   ground, which is also what the 133 words with no drawing get either way.

   ------------------------------------------------------------------
   THE QUIZ REFILLS IN BATCHES, ON PURPOSE

   Six pairs on screen. A matched pair fades, but its slot stays empty until
   at least two are empty, and then both fill at once. Replacing one
   immediately would make the newcomer obviously the partner of the other
   newcomer, and the quiz would answer itself.

   The two columns are shuffled independently, so no row ever sits beside
   its own answer.

   ------------------------------------------------------------------
   WHAT IT READS AND NEVER WRITES

   GH.packs.vocab()     the word source, with pack state already applied
   GH.packs.imgOf(v)    the picture number, 0 for none
   GH.packs.catsOf(v)   for the topic filter
   GH_BANK.categories   the topic list, so the chips match every other
                        screen's chips and a topic added there appears here
   GH.speech.sayIn()    German in a German voice, her language in hers
   GH.sprite.tile()     the picture
   GH.coins             the payout
   endScreen.render()   the finish, like every other activity  */

window.GH = window.GH || {};

GH.wordMatch = (function(){

  /* Six on screen, refilled once two or more slots are free. */
  var BOARD = 6;
  var REFILL_AT = 2;

  /* A quiz is not a quiz below ten pairs, and twenty is as long as one
     should ever be. Both are Steven's numbers. */
  var QUIZ_MIN = 10;
  var QUIZ_MAX = 20;

  /* Five minutes of listening earns once a day. */
  var PAY_AFTER = 5 * 60;
  var PAY = 10;

  /* At most three topics, so the pool is never one word wide. */
  var MAX_CATS = 3;

  /* The gap between one word and the next. Short: this is a loop, not a
     drill with thinking time. */
  var GAP = 700;

  var LENGTHS = [
    { id:'w10',  words:10 },
    { id:'w20',  words:20 },
    { id:'w40',  words:40 },
    { id:'m5',   mins:5 },
    { id:'m10',  mins:10 },
    { id:'m20',  mins:20 },
    { id:'free' }
  ];

  var host = null;
  var state = null;

  var LISTEN_KEY = 'gh-wm-listen';   /* the day the listening bonus was paid */
  var SAVED_KEY  = 'gh-wm-saved';    /* sets kept for later */
  var PREF_KEY   = 'gh-wm-prefs';    /* topics, pictures, length */

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  /* Her language for the middle utterance. In a German interface there is
     no German-to-German to say, so English carries it. */
  function l1(){ return lang() === 'de' ? 'en' : lang(); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function slot(){
    return (GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo');
  }

  function readJSON(key){
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }
  function writeJSON(key, d){
    try { window.localStorage.setItem(key, JSON.stringify(d)); } catch (e){}
  }

  function today(){ return new Date().toDateString(); }

  /* ---------- the words ---------- */

  function pool(){
    var all = (GH.packs && GH.packs.vocab) ? GH.packs.vocab() : (window.GH_VOCAB || []);
    var cats = Object.keys(state.cats);
    if (!cats.length) return all.slice();
    return all.filter(function(v){
      var mine = GH.packs ? GH.packs.catsOf(v) : (v.cats || (v.cat ? [v.cat] : []));
      for (var i = 0; i < cats.length; i++) if (mine.indexOf(cats[i]) >= 0) return true;
      return false;
    });
  }

  function topics(){
    return (window.GH_BANK && GH_BANK.categories) ? GH_BANK.categories.slice() : [];
  }

  function glossOf(v){
    var l = l1();
    return v[l] || v.en || v.ru || '';
  }

  /* ---------- setup ---------- */

  function prefs(){
    var d = readJSON(PREF_KEY)[slot()] || {};
    return { cats:d.cats || {}, pics:d.pics !== false, length:d.length || 'w20' };
  }
  function savePrefs(){
    var d = readJSON(PREF_KEY);
    d[slot()] = { cats:state.cats, pics:state.pics, length:state.length };
    writeJSON(PREF_KEY, d);
  }

  function savedSets(){
    var d = readJSON(SAVED_KEY)[slot()];
    return (d && d.length) ? d.slice() : [];
  }
  function saveSet(words){
    var d = readJSON(SAVED_KEY);
    if (!d[slot()]) d[slot()] = [];
    d[slot()].push({
      when: Date.now(),
      /* the words themselves are not stored, only their numbers: the bank
         is the single source and a copy here would go stale */
      ns: words.map(function(v){ return v.n; })
    });
    writeJSON(SAVED_KEY, d);
  }
  function dropSet(at){
    var d = readJSON(SAVED_KEY);
    if (!d[slot()]) return;
    d[slot()].splice(at, 1);
    writeJSON(SAVED_KEY, d);
  }
  function wordsByN(ns){
    var all = (GH.packs && GH.packs.vocab) ? GH.packs.vocab() : (window.GH_VOCAB || []);
    var out = [];
    ns.forEach(function(n){
      for (var i = 0; i < all.length; i++) if (all[i].n === n){ out.push(all[i]); return; }
    });
    return out;
  }

  function head(onBack, title, sub){
    var bar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', onBack);
    bar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, title));
    if (sub) titles.appendChild(el('p', null, sub));
    bar.appendChild(titles);
    return bar;
  }

  function paintSetup(){
    host.textContent = '';
    stopAudio();

    host.appendChild(head(function(){ state.onExit(); },
      t('wmTitle'), t('wmSub')));

    var card = el('div', 'card');

    /* ---- topics ---- */
    card.appendChild(el('h2', 'wm-h', t('wmTopics')));
    var n = Object.keys(state.cats).length;
    var chips = el('div', 'chips');
    var all = el('button', 'chip' + (n ? '' : ' on'), t('allTopics'));
    all.type = 'button';
    all.addEventListener('click', function(){ state.cats = {}; savePrefs(); paintSetup(); });
    chips.appendChild(all);
    topics().forEach(function(c){
      var on = !!state.cats[c.id];
      var b = el('button', 'chip' + (on ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      /* Nothing is greyed out at the limit — she can always swap one for
         another. Greying three chips out and leaving sixteen live reads as
         a fault rather than as a rule. */
      b.appendChild(el('span', 'chip-glyph', c.glyph));
      b.appendChild(document.createTextNode(' ' + GH.i18n.pick(c)));
      b.addEventListener('click', function(){
        if (on) delete state.cats[c.id];
        else {
          if (Object.keys(state.cats).length >= MAX_CATS) return;
          state.cats[c.id] = true;
        }
        savePrefs();
        paintSetup();
      });
      chips.appendChild(b);
    });
    card.appendChild(chips);
    card.appendChild(el('p', 'wm-note', t('wmTopicsMax', { n:MAX_CATS })));

    /* how many words that actually leaves */
    var have = pool().length;
    card.appendChild(el('p', 'wm-count', t('wmPoolN', { n:have })));
    /* Two topics are smaller than one quiz: questions has 7 words and
       music has 8. Said here rather than discovered at the payout. */
    if (have && have < QUIZ_MIN){
      card.appendChild(el('p', 'wm-note', t('wmTooFew', { n:QUIZ_MIN })));
    }

    /* ---- pictures ---- */
    card.appendChild(el('h2', 'wm-h', t('wmPics')));
    var pic = el('div', 'mode-toggle wm-toggle');
    [[true, 'wmPicsOn'], [false, 'wmPicsOff']].forEach(function(pair){
      var b = el('button', null, t(pair[1]));
      b.type = 'button';
      b.setAttribute('aria-pressed', state.pics === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        state.pics = pair[0]; savePrefs(); paintSetup();
      });
      pic.appendChild(b);
    });
    card.appendChild(pic);
    card.appendChild(el('p', 'wm-note', t('wmPicsNote')));

    /* ---- how long ---- */
    card.appendChild(el('h2', 'wm-h', t('wmHowLong')));
    var lens = el('div', 'wm-lens');
    LENGTHS.forEach(function(L){
      var b = el('button', 'chip' + (state.length === L.id ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', state.length === L.id ? 'true' : 'false');
      b.textContent = L.words ? t('wmWordsN', { n:L.words })
                   : L.mins  ? t('wmMinsN',  { n:L.mins })
                             : t('wmUnlimited');
      b.addEventListener('click', function(){
        state.length = L.id; savePrefs(); paintSetup();
      });
      lens.appendChild(b);
    });
    card.appendChild(lens);

    var go = el('button', 'btn btn-primary wm-go', t('wmStart'));
    go.type = 'button';
    go.disabled = !have;
    go.addEventListener('click', begin);
    card.appendChild(go);
    if (!have) card.appendChild(el('p', 'wm-note', t('wmNoWords')));

    host.appendChild(card);

    /* ---- quizzes she kept for later ---- */
    var kept = savedSets();
    if (kept.length){
      var box = el('div', 'card wm-saved');
      box.appendChild(el('h2', 'wm-h', t('wmSavedHead')));
      kept.forEach(function(s, at){
        var row = el('div', 'wm-saved-row');
        var b = el('button', 'btn wm-saved-go');
        b.type = 'button';
        b.textContent = t('wmSavedN', { n:s.ns.length }) + ' \u00b7 ' +
                        new Date(s.when).toLocaleDateString();
        b.addEventListener('click', function(){
          var words = wordsByN(s.ns);
          if (!words.length) return;
          dropSet(at);
          startQuiz(words);
        });
        row.appendChild(b);
        var x = el('button', 'wm-saved-x', '\u00d7');
        x.type = 'button';
        x.setAttribute('aria-label', t('wmSavedDrop'));
        x.addEventListener('click', function(){ dropSet(at); paintSetup(); });
        row.appendChild(x);
        box.appendChild(row);
      });
      host.appendChild(box);
    }

    if (GH.nav) GH.nav.ready();
  }

  /* ---------- the listening loop ---------- */

  function lengthOf(){
    for (var i = 0; i < LENGTHS.length; i++) if (LENGTHS[i].id === state.length) return LENGTHS[i];
    return LENGTHS[0];
  }

  function begin(){
    var words = GH.text.shuffle(pool());
    if (!words.length) return;
    var L = lengthOf();
    state.queue = words;
    state.at = 0;
    state.heard = [];
    state.limitWords = L.words || 0;
    state.limitMs = L.mins ? L.mins * 60000 : 0;
    state.startedAt = Date.now();
    state.paused = false;
    state.tapped = false;
    state.stage = 'listen';
    paintListen();
    speakCurrent();
  }

  function current(){
    if (!state.queue.length) return null;
    if (state.at >= state.queue.length){
      /* A FIXED list ends. Only a topic session wraps round — wrapping a
         list of six missed words would loop her forever on the six. */
      if (state.fixed) return null;
      state.queue = GH.text.shuffle(state.queue);
      state.at = 0;
    }
    return state.queue[state.at];
  }

  function elapsed(){ return Date.now() - state.startedAt; }

  function listenDone(){
    if (state.limitWords && state.heard.length >= state.limitWords) return true;
    if (state.limitMs && elapsed() >= state.limitMs) return true;
    return false;
  }

  function stopAudio(){
    if (state && state.timer){ window.clearTimeout(state.timer); state.timer = null; }
    if (GH.speech) GH.speech.stop();
  }

  /* de -> her language -> de -> pause -> next.

     Chained on the speech callback rather than on timers, so a slow voice
     or a long word does not have the next utterance talking over it. */
  function speakCurrent(){
    if (state.stage !== 'listen' || state.paused) return;
    var v = current();
    if (!v){ finishListening(); return; }
    var de = v.de, heard = sayable(v), tr = glossOf(v);

    say(heard, 'de', function(){
      if (state.stage !== 'listen' || state.paused) return;
      say(tr, l1(), function(){
        if (state.stage !== 'listen' || state.paused) return;
        say(heard, 'de', function(){
          if (state.stage !== 'listen' || state.paused) return;
          /* heard means heard all three times */
          if (state.heard.indexOf(v) < 0) state.heard.push(v);
          state.at++;
          paintListen();
          if (listenDone()){ finishListening(); return; }
          state.timer = window.setTimeout(speakCurrent, GAP);
        });
      });
    });
  }

  /* What to READ ALOUD, which is not always what is written. Five of the
     song word entries are phrases with a placeholder in them — `jemanden
     vermissen`, `nach etwas greifen` — and read literally they give her a
     grammar slot rather than a sentence. A caller that knows better passes
     `say`; everything else falls back to the German. */
  function sayable(v){ return (v && (v.say || v.de)) || ''; }

  function say(text, code, then){
    if (!text){ if (then) then(); return; }
    if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(text, code, then);
    else if (GH.speech) GH.speech.say(text, then);
    else if (then) then();
  }

  function paintListen(){
    host.textContent = '';
    var v = current();

    var stage = el('div', 'wm-stage' + (state.pics ? '' : ' is-dark'));

    var img = state.pics && GH.packs ? GH.packs.imgOf(v) : 0;
    if (img && GH.sprite && GH.sprite.has(img)){
      var pic = el('div', 'wm-pic');
      pic.appendChild(GH.sprite.tile(img, v.de));
      stage.appendChild(pic);
      stage.appendChild(el('p', 'wm-word', v.de));
    } else {
      /* No picture, or she asked for none: the German set large on a dark
         ground. Which is what an abstract word gets in any case. */
      stage.className = 'wm-stage is-dark';
      stage.appendChild(el('p', 'wm-word is-big', v.de));
    }

    /* Where she is. Words when the length is words, the clock when it is
       minutes, and the count either way when it is unlimited. */
    var L = lengthOf();
    var meta = L.words ? (state.heard.length + '/' + L.words)
             : L.mins  ? (Math.max(0, Math.ceil((state.limitMs - elapsed()) / 60000)) + '\u2032')
                       : String(state.heard.length);
    stage.appendChild(el('p', 'wm-meta', meta));

    if (state.paused){
      var pausedBox = el('div', 'wm-paused');
      pausedBox.appendChild(el('p', 'wm-paused-t', t('wmPaused')));
      var resume = el('button', 'btn btn-primary', t('wmResume'));
      resume.type = 'button';
      resume.addEventListener('click', function(e){
        e.stopPropagation();
        state.paused = false;
        state.tapped = false;
        paintListen();
        speakCurrent();
      });
      pausedBox.appendChild(resume);
      pausedBox.appendChild(el('p', 'wm-paused-n', t('wmTapExit')));
      stage.appendChild(pausedBox);
    }

    /* One tap pauses. A second tap on the stage leaves. Steven's rule:
       Resume is the button, so the bare screen keeps one meaning at a
       time. */
    stage.addEventListener('click', function(){
      if (!state.paused){
        state.paused = true;
        stopAudio();
        paintListen();
        return;
      }
      finishListening();
    });

    host.appendChild(stage);

    /* A back link, because every screen in the app has one and nav.js
       leaves by clicking it. Kept small and out of the way. */
    var back = el('button', 'backlink wm-exit', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ finishListening(); });
    host.appendChild(back);
  }

  /* ---------- after the listening ---------- */

  function payListening(){
    var secs = Math.round(elapsed() / 1000);
    if (secs < PAY_AFTER) return 0;
    var d = readJSON(LISTEN_KEY);
    if (d[slot()] === today()) return 0;      /* once a day, and only once */
    d[slot()] = today();
    writeJSON(LISTEN_KEY, d);
    if (GH.coins && GH.coins.earn) GH.coins.earn(PAY, 'wordmatch-listen');
    if (GH.purse) GH.purse.refresh();
    return PAY;
  }

  function finishListening(){
    state.stage = 'ask';
    stopAudio();
    state.paid = payListening();
    paintAsk();
  }

  function paintAsk(){
    host.textContent = '';

    host.appendChild(head(function(){ state.stage = 'setup'; paintSetup(); },
      t('wmTitle'), null));

    var card = el('div', 'card wm-ask');
    card.appendChild(el('p', 'wm-ask-n', t('wmHeardN', { n:state.heard.length })));
    if (state.paid){
      card.appendChild(el('p', 'wm-ask-paid', t('wmListenPaid', { n:state.paid })));
    }

    if (!state.heard.length){
      var b0 = el('button', 'btn btn-primary', t('wmAgain'));
      b0.type = 'button';
      b0.addEventListener('click', function(){ state.stage = 'setup'; paintSetup(); });
      card.appendChild(b0);
      host.appendChild(card);
      if (GH.nav) GH.nav.ready();
      return;
    }

    card.appendChild(el('h2', 'wm-h', t('wmQuizAsk')));
    var acts = el('div', 'wm-acts');

    var yes = el('button', 'btn btn-primary', t('wmQuizYes'));
    yes.type = 'button';
    yes.addEventListener('click', function(){ startQuiz(state.heard); });
    acts.appendChild(yes);

    var later = el('button', 'btn', t('wmQuizLater'));
    later.type = 'button';
    later.addEventListener('click', function(){
      saveSet(quizWords(state.heard));
      state.stage = 'setup';
      paintSetup();
    });
    acts.appendChild(later);

    var no = el('button', 'btn btn-ghost', t('wmQuizNo'));
    no.type = 'button';
    no.addEventListener('click', function(){ state.stage = 'setup'; paintSetup(); });
    acts.appendChild(no);

    card.appendChild(acts);
    host.appendChild(card);
    if (GH.nav) GH.nav.ready();
  }

  /* ---------- the quiz ----------

     Ten pairs at least, or it does not count; twenty at most. Where she
     heard fewer than ten, the rest come from the topics she chose — the
     quiz is about those topics, and a five-pair quiz is not a quiz. */
  function quizWords(heardList){
    var out = heardList.slice(0, QUIZ_MAX);
    /* A fixed list is the whole point of the session — topping it up with
       words she never missed would dilute the thing she asked for. The
       coach only offers this at six or more, so it is a real quiz. */
    if (state.fixed) return out.filter(function(v){ return !!glossOf(v); });
    if (out.length < QUIZ_MIN){
      var extra = GH.text.shuffle(pool()).filter(function(v){
        return out.indexOf(v) < 0 && glossOf(v);
      });
      out = out.concat(extra.slice(0, QUIZ_MIN - out.length));
    }
    return out.filter(function(v){ return !!glossOf(v); });
  }

  function startQuiz(words){
    var set = quizWords(words);
    if (set.length < 2){ state.stage = 'setup'; paintSetup(); return; }
    state.stage = 'quiz';
    state.quiz = {
      waiting: GH.text.shuffle(set.slice()),
      board: [],           /* { v, doneLeft, doneRight } */
      pickedLeft: null,
      pickedRight: null,
      wrong: null,
      run: GH.run.create(),
      total: set.length,
      matched: 0
    };
    fillBoard(true);
    paintQuiz();
  }

  /* Slots are filled only when REFILL_AT of them are free, so a newcomer is
     never the only fresh face on the board. `force` is the first fill. */
  function fillBoard(force){
    var q = state.quiz;
    var live = q.board.filter(function(s){ return !s.gone; });
    var room = BOARD - live.length;
    if (!force && room < REFILL_AT) return;
    var add = [];
    while (add.length < room && q.waiting.length) add.push(q.waiting.shift());
    if (!add.length) return;
    q.board = live.concat(add.map(function(v){ return { v:v, gone:false }; }));
    /* the two columns are ordered independently, so no row sits beside its
       own answer */
    q.left  = GH.text.shuffle(q.board.slice());
    q.right = GH.text.shuffle(q.board.slice());
  }

  function paintQuiz(){
    host.textContent = '';
    var q = state.quiz;

    var bar = head(function(){ state.stage = 'setup'; paintSetup(); },
      t('wmQuizTitle'), t('wmQuizAtN', { at:q.matched, n:q.total }));
    bar.appendChild(GH.run.header(q.run));
    host.appendChild(bar);

    var card = el('div', 'card');
    var grid = el('div', 'wm-board');

    var cols = [['left', l1()], ['right', 'de']];
    cols.forEach(function(pair){
      var side = pair[0];
      var col = el('div', 'wm-col wm-col-' + side);
      (q[side] || []).forEach(function(s){
        var text = side === 'left' ? glossOf(s.v) : s.v.de;
        var picked = (side === 'left' ? q.pickedLeft : q.pickedRight) === s;
        var cls = 'wm-cell';
        if (s.gone) cls += ' is-gone';
        if (picked) cls += ' is-picked';
        if (q.wrong && q.wrong.indexOf(s) >= 0) cls += ' is-wrong';
        var b = el('button', cls, text);
        b.type = 'button';
        b.disabled = !!s.gone;
        b.addEventListener('click', function(){ pick(side, s); });
        col.appendChild(b);
      });
      grid.appendChild(col);
    });
    card.appendChild(grid);
    host.appendChild(card);

    if (GH.nav) GH.nav.ready();
  }

  function pick(side, s){
    var q = state.quiz;
    if (s.gone) return;
    q.wrong = null;
    if (side === 'left') q.pickedLeft = s; else q.pickedRight = s;
    if (!q.pickedLeft || !q.pickedRight){ paintQuiz(); return; }

    var a = q.pickedLeft, b = q.pickedRight;
    var right = a === b;
    /* Counted once per word, by its own number, so a second attempt at the
       same pair is her working it out rather than a second answer. */
    /* `n` where there is one, the German where there is not. A song word
       list includes entries that live only in song-words.js and carry no
       bank number, and keying those on `n` would make them all 'wm:0' —
       one counted answer shared between them. */
    q.run.saw('wm:' + (a.v.n || a.v.de), right);

    if (right){
      a.gone = true;
      q.matched++;
      q.pickedLeft = null; q.pickedRight = null;
      if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(sayable(a.v), 'de');
      fillBoard(false);
      paintQuiz();
      if (q.matched >= q.total || !q.board.filter(function(x){ return !x.gone; }).length){
        window.setTimeout(finishQuiz, 500);
      }
      return;
    }

    q.wrong = [a, b];
    q.pickedLeft = null; q.pickedRight = null;
    paintQuiz();
  }

  function finishQuiz(){
    var q = state.quiz;
    stopAudio();
    host.textContent = '';

    /* TEN PAIRS OR IT DOES NOT COUNT.

       Steven's rule, and it needs enforcing rather than assuming: the
       `questions` topic has seven words and `music` has eight, so a quiz
       on either alone cannot reach ten however many she heard. It still
       runs and still teaches; it simply is not one of the five.

       `units:1` on the ones that do count, because unitsFor() would pay a
       twenty-pair quiz double and the rule is ten for any quiz. */
    /* Ten pairs or it does not count, fixed list or not. The coach hands
       over six or more; six to nine pairs still teaches and still says so,
       and only ten or more is one of her five. */
    var counts = q.total >= QUIZ_MIN;
    var paid = (counts && GH.coins) ? GH.coins.award('wordmatch', q.run, { units:1 }) : null;
    var won = (counts && GH.awards) ? GH.awards.afterRound('wordmatch', q.run) : [];

    var clean = q.run.answered > 0 && q.run.right === q.run.answered;

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: clean ? 'perfect' : 'done',
      glyph: clean ? '\ud83c\udfc6' : '\ud83d\udd0a',
      title: clean ? t('cwPerfect') : t('doneTitle'),
      stats: GH.run.stats(q.run),
      note: counts ? null : t('wmTooFew', { n:QUIZ_MIN }),
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            state.stage = 'setup'; paintSetup(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  /* ---------- entry ---------- */

  /* ---------- opened on a specific list of words ----------

     The coach hands over the words she has just been missing, so this runs
     the same hear-then-match pass over exactly those rather than over a
     topic. No setup screen: the words are already decided, and asking her
     to choose topics after she has said "the words are the problem" would
     be asking the wrong question.

     `pics` and the narrator come from her saved preferences, so a data
     setting she made earlier is respected here too. */
  function openWords(container, words, onExit){
    host = container;
    var pr = prefs();
    var list = (words || []).filter(function(v){ return v && v.de && glossOfIn(v, pr); });
    state = { onExit:onExit, stage:'listen',
              cats:pr.cats, pics:pr.pics, length:'free',
              queue:GH.text.shuffle(list), at:0, heard:[],
              paused:false, timer:null, quiz:null, paid:0,
              /* The list IS the session: no time limit and no word count,
                 because it ends when the words run out. */
              limitWords:list.length, limitMs:0,
              startedAt:Date.now(), fixed:true };
    GH.app.redraw = function(){
      if (state.stage === 'listen') paintListen();
      else if (state.stage === 'ask') paintAsk();
      else if (state.stage === 'quiz') paintQuiz();
      else paintSetup();
    };
    if (!state.queue.length){ state.stage = 'ask'; paintAsk(); return; }
    paintListen();
    speakCurrent();
  }

  /* glossOf() reads the live language; this variant exists only so
     openWords can filter before `state` is built. */
  function glossOfIn(v){
    var l = l1();
    return v[l] || v.en || v.ru || '';
  }

  function open(container, onExit){
    host = container;
    var p = prefs();
    state = { onExit:onExit, stage:'setup',
              cats:p.cats, pics:p.pics, length:p.length,
              queue:[], at:0, heard:[], paused:false, timer:null,
              quiz:null, paid:0 };
    GH.app.redraw = function(){
      /* Mid-loop a language switch changes which language the middle
         utterance is in, which is a change she asked for; the loop is left
         running and the next word uses the new one. */
      if (state.stage === 'listen') paintListen();
      else if (state.stage === 'ask') paintAsk();
      else if (state.stage === 'quiz') paintQuiz();
      else paintSetup();
    };
    paintSetup();
  }

  var entry = {
    id:'word-matching',
    /* Read and listen, beside the songs and the comics: the listening half
       is exposure rather than a drill, and it is what she opens this for. */
    kind:'read',
    glyph:'\ud83d\udd0a',
    name:{ ru:'\u0421\u043b\u043e\u0432\u0430 \u043f\u0430\u0440\u0430\u043c\u0438',
           de:'W\u00f6rter zuordnen', en:'Word Matching' },
    sub:{ ru:'\u0421\u043b\u0443\u0448\u0430\u0439, \u043f\u043e\u0442\u043e\u043c \u0441\u043e\u043f\u043e\u0441\u0442\u0430\u0432\u044c',
          de:'H\u00f6ren, dann zuordnen',
          en:'Hear them, then match them' },
    rules:'wmRule', rulesTitle:'wmTitle',
    open:open
  };

  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, openWords:openWords, entry:entry, register:register };
})();
