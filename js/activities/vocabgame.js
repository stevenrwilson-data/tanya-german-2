/* Vocab sets.

   A set is six words from one topic. Phase one tests the words; phase
   two gives the sentences that use them. You have to get a word right
   to clear it — a miss puts it back in the queue.

   Phase one has three question shapes, toggled by the buttons:
     pic   see the image, pick the German
     word  see the German, pick the image
     mean  see the German, pick the Russian (or English)

   'mean' only appears when the interface is in Russian or English AND
   every word in the set has that translation. German-to-German would
   be pointless, and entries above 70 have no Russian yet.

   Phase two has two shapes:
     blank  the sentence with the word missing, pick the word
     pic    the sentence in German, pick the image it describes  */

window.GH = window.GH || {};

GH.vocab = (function(){

  var SET_SIZE = 6;
  var OPTIONS  = 4;

  var host = null;
  var state = null;

  function t(key, vars){ return GH.i18n.t(key, vars); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- sets ---------- */

  /* Phase two hands her the sentences that use each word, so a word with
     none yet has nothing to practise and is left out of the sets. It
     joins in on its own once its two sentences are written — no code
     change needed. */
  function wordsIn(cat){
    /* the words phase shows a picture and asks for the word, so a word
       without a picture cannot be in the set */
    return (GH.packs.vocab()).filter(function(v){
      return GH.packs.hasPicture(v) && GH.packs.inCat(v, cat)
             && GH.packs.sentencesOf(v).length;
    });
  }

  /* Sequential chunks, not random ones: the numbering runs thematically,
     so neighbours belong together and the set hangs together. */
  function setsFor(cat){
    var all = wordsIn(cat), out = [], i;
    for (i = 0; i < all.length; i += SET_SIZE){
      var chunk = all.slice(i, i + SET_SIZE);
      if (chunk.length >= 3) out.push(chunk);       /* a stub of 1-2 is not a set */
      else if (out.length) out[out.length - 1] = out[out.length - 1].concat(chunk);
    }
    return out;
  }

  function meaningKey(){
    var lang = GH.i18n.lang();
    return (lang === 'ru' || lang === 'en') ? lang : null;
  }

  function canMean(words){
    var k = meaningKey();
    if (!k) return false;
    for (var i = 0; i < words.length; i++) if (!words[i][k]) return false;
    return true;
  }

  /* ---------- distractors ---------- */

  /* Pulled from the same topic so the choice is a real one, and never
     from an entry whose German contains this one's — 'der Lippenstift'
     against 'der rote Lippenstift' is a coin toss, not a question. */
  function overlaps(a, b){
    var x = a.de.toLowerCase(), y = b.de.toLowerCase();
    return x.indexOf(y) >= 0 || y.indexOf(x) >= 0;
  }

  function distractors(word, pool, howMany){
    var near = [], far = [], i;
    for (i = 0; i < pool.length; i++){
      var c = pool[i];
      if (GH.packs.same(c, word) || overlaps(word, c)) continue;
      (GH.packs.shareCat(c, word) ? near : far).push(c);
    }
    near = GH.text.shuffle(near);
    far  = GH.text.shuffle(far);
    return near.concat(far).slice(0, howMany);
  }

  /* ---------- building the queues ---------- */

  function wordQuestions(words, shape){
    var pool = GH.packs.vocab();
    return GH.text.shuffle(words.map(function(w){
      return {
        word:w,
        shape:shape,
        options:GH.text.shuffle([w].concat(distractors(w, pool, OPTIONS - 1))),
        done:false
      };
    }));
  }

  function sentenceQuestions(words, shape){
    var pool = GH.packs.vocab(), out = [];
    words.forEach(function(w){
      GH.packs.sentencesOf(w).forEach(function(sen){
        out.push({
          word:w,
          sentence:sen,
          shape:shape,
          options:GH.text.shuffle([w].concat(distractors(w, pool, OPTIONS - 1)))
        });
      });
    });
    return GH.text.shuffle(out);
  }

  /* Blanks the word in the sentence. Tries each part of the entry,
     longest first, matching on a stem so inflected forms still hit.
     Separable verbs ('aufwachen' -> 'wache ... auf') and irregulars
     ('essen' -> 'isst') often cannot be found at all; those sentences
     report no blank and the activity shows them as picture questions
     instead of inventing a blank in the wrong place. */
  var SKIP = { der:1, die:1, das:1, ein:1, eine:1, einen:1, einem:1, einer:1,
               sich:1, etwas:1, mit:1, dem:1, den:1, zu:1, im:1, am:1, auf:1,
               in:1, bei:1, vor:1, nach:1, ins:1, zwei:1, sehr:1, eigenen:1,
               jemandem:1, jemanden:1, und:1 };

  /* Several stems are tried per part, longest first, because German
     verbs move a long way from their infinitive: 'hören' appears as
     'höre', 'blinzeln' as 'blinzle', 'bewegen' as 'bewegt'. Trimming a
     fixed two characters was not enough — the -en/-n/-e endings come off
     explicitly now.

     A word that is nothing but skip-list tokens ('zwei', which is filler
     in 'zwei Fahrkarten' but the whole point of entry #353) falls back to
     matching itself.

     Irregulars and separables still cannot be found — 'sehen' surfacing
     as 'sieht', 'eincremen' as 'cremt … ein'. Those report ok:false and
     the activity shows the sentence as a picture question rather than
     blanking the wrong word. */
  function stemsOf(part){
    var out = [part];
    if (/en$/.test(part) && part.length > 4) out.push(part.slice(0, -2));
    if (/n$/.test(part)  && part.length > 3) out.push(part.slice(0, -1));
    if (/e$/.test(part)  && part.length > 3) out.push(part.slice(0, -1));
    if (part.length > 6) out.push(part.slice(0, part.length - 3));
    return out.sort(function(a, b){ return b.length - a.length; });
  }

  function blankOut(sen, word){
    var all = word.de.split(/\s+/);
    var parts = all.filter(function(p){
      return p.length >= 3 && !SKIP[p.toLowerCase()];
    });
    /* nothing survived the skip list — the word IS a skip token */
    if (!parts.length) parts = all.filter(function(p){ return p.length >= 3; });
    parts.sort(function(a, b){ return b.length - a.length; });

    var m = null;
    for (var i = 0; i < parts.length && !m; i++){
      var stems = stemsOf(parts[i]);
      for (var k = 0; k < stems.length && !m; k++){
        if (stems[k].length < 3) continue;
        var re = new RegExp('[A-Za-zÄÖÜäöüß]*' +
                            stems[k].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
                            '[A-Za-zÄÖÜäöüß]*', 'i');
        m = sen.de.match(re);
      }
    }
    if (!m) return { before:sen.de, blank:'', after:'', ok:false };
    return {
      before:sen.de.slice(0, m.index),
      blank:m[0],
      after:sen.de.slice(m.index + m[0].length),
      ok:true
    };
  }

  /* ---------- painting ---------- */

  function tile(word, onPick){
    var lit = state.won && GH.packs.same(state.won.q.word, word);
    var b = el('button', 'vopt-pic' + (lit ? ' is-got' : ''));
    b.type = 'button';
    b.disabled = !!state.paused || !!state.won;
    b.appendChild(GH.sprite.tile(GH.packs.imgOf(word), word.de));
    /* the word appears on the picture she chose, so the two are together
       while it is spoken rather than one replacing the other */
    if (lit) b.appendChild(el('span', 'vopt-said', word.de));
    b.addEventListener('click', function(){ onPick(word, b); });
    return b;
  }

  function textOption(label, word, onPick){
    /* the default shape shows the picture and offers words, so this is the
       button that has to light up when she is right */
    var lit = state.won && GH.packs.same(state.won.q.word, word);
    var b = el('button', 'option' + (lit ? ' is-got' : ''), label);
    b.disabled = !!state.paused || !!state.won;
    b.type = 'button';
    b.addEventListener('click', function(){ onPick(word, b); });
    return b;
  }

  /* Shown over the card after a wrong answer. It names the right answer and
     explains that misses are collected rather than simply refused, then
     waits — any key, any tap, or a swipe right moves on, through the shared
     nav module, so it behaves like every other 'continue' in the app. */
  /* The word, named. Both panels use it, because both moments are the
     moment she is looking at the word and wondering what it was.

     `packs.vocab()` has already expanded a multi-sense headword into one
     item per sense, so `word.ru` here is that sense's own gloss — `der Fuß`
     confirms as ступня rather than as the bank's «ступня / нога». A sense
     also carries a definition; where one exists it is worth more than the
     gloss, so it goes underneath.

     Nothing in German mode. A German interface showing a Russian gloss is
     the one thing German mode exists to prevent. */
  function glossOf(word){
    var l = GH.i18n.lang();
    if (l === 'de') return null;
    var g = word[l] || word.en || '';
    var d = word.def ? (word.def[l] || word.def.en || '') : '';
    if (!g && !d) return null;
    var wrap = el('div', 'vg-face-gloss');
    if (g) wrap.appendChild(el('span', 'vg-face-g', g));
    if (d) wrap.appendChild(el('span', 'vg-face-d', d));
    return wrap;
  }

  function missNote(p){
    var box = el('div', 'vm-note');
    box.appendChild(el('p', 'vm-head', t('vocabMissHead')));
    var right = el('p', 'vm-right');
    right.appendChild(el('span', 'vm-right-l', t('vocabItWas')));
    right.appendChild(el('span', 'vm-right-w', p.q.word.de));
    box.appendChild(right);
    /* It already named the German. Knowing `das Licht` was the answer does
       not tell her it means light, which is the whole point of the round. */
    var mg = glossOf(p.q.word);
    if (mg) box.appendChild(mg);
    box.appendChild(el('p', 'vm-body', t('vocabMissBody')));
    var go = el('button', 'btn btn-primary js-advance', t('vocabMissGo'));
    go.type = 'button';
    go.addEventListener('click', resume);
    box.appendChild(go);
    return box;
  }

  /* Between the two phases: a score, and every word she stumbled on with
     its picture. She has to pass through this to reach the sentences, which
     is the point — it is the one moment the mistakes are still fresh. */
  function paintReview(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, state.title));
    titles.appendChild(el('p', null, t('vocabWords')));
    head.appendChild(titles);
    host.appendChild(head);

    var list = Object.keys(state.missed).map(function(k){ return state.missed[k]; });
    var total = state.words.length;
    var clean = total - list.length;

    var box = el('div', 'card');
    var score = el('div', 'vr-score');
    score.appendChild(el('span', 'vr-score-n', clean + '/' + total));
    score.appendChild(el('span', 'vr-score-l', t('vocabFirstTry')));
    box.appendChild(score);

    if (!list.length){
      box.appendChild(el('p', 'vr-clean', t('vocabAllClean')));
    } else {
      box.appendChild(el('h2', 'vr-head', t('vocabReviewHead')));
      list.sort(function(a, b){ return b.n - a.n; });
      var grid = el('div', 'vr-grid');
      list.forEach(function(m){
        var cell = el('div', 'vr-item');
        var pic = el('button', 'vr-pic');
        pic.type = 'button';
        pic.appendChild(GH.sprite.tile(GH.packs.imgOf(m.word), m.word.de));
        pic.addEventListener('click', function(){
          if (GH.lightbox) GH.lightbox.open(m.word.n, m.word);
        });
        cell.appendChild(pic);
        cell.appendChild(el('span', 'vr-de', m.word.de));
        var lang = GH.i18n.lang();
        var gloss = lang === 'ru' ? (m.word.ru || m.word.en) : m.word.en;
        if (lang !== 'de' && gloss) cell.appendChild(el('span', 'vr-gloss', gloss));
        if (m.n > 1) cell.appendChild(el('span', 'vr-times', t('vocabMissedN', { n:m.n })));
        grid.appendChild(cell);
      });
      box.appendChild(grid);
      var hear = el('button', 'btn btn-ghost', '🔊 ' + t('listen'));
      hear.type = 'button';
      hear.addEventListener('click', function(){
        GH.speech.say(list.map(function(m){ return m.word.de; }).join(', '));
      });
      box.appendChild(hear);
    }

    var acts = el('div', 'done-actions');
    var go = el('button', 'btn btn-primary js-advance', t('vocabToSentences'));
    go.type = 'button';
    go.addEventListener('click', function(){
      state.phase = 'sentences';
      state.sIndex = 0;
      state.sentences = sentenceQuestions(state.set, state.senShape);
      state.feedback = '';
      paint();
    });
    acts.appendChild(go);
    box.appendChild(acts);
    host.appendChild(box);
    GH.nav.ready();
  }

  function paint(){
    if (state.phase === 'review'){ paintReview(); return; }
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);

    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, state.title));
    titles.appendChild(el('p', null, state.phase === 'words'
      ? t('vocabWords') : t('vocabSentences')));
    head.appendChild(titles);

    var q = current();
    var total = state.phase === 'words' ? state.words.length : state.sentences.length;

    /* The two phases count differently and the old line treated them the
       same, which is how 'Question 13 of 12' got on screen: in the words
       phase the tally is of what is left to clear, in the sentences phase
       it is an index that climbs. Work out how many are behind her and
       derive both the number and the bar from that. */
    var behind = state.phase === 'words'
      ? total - state.words.filter(function(x){ return !x.done; }).length
      : state.sIndex;
    var atNow = Math.min(behind + 1, total);

    var prog = el('div', 'progress');
    var meter = el('div', 'meter');
    var bar = el('div', 'bar');
    bar.style.width = Math.round((behind / total) * 100) + '%';
    meter.appendChild(bar);
    prog.appendChild(meter);
    prog.appendChild(el('span', 'progress-label',
      t('roundOf', { i:atNow, n:total })));
    head.appendChild(prog);

    head.appendChild(GH.run.header(state.run));
    host.appendChild(head);

    if (!q){ paintDone(); return; }

    var card = el('div', 'card');

    /* shape toggle */
    var tools = el('div', 'card-tools');
    if (GH.speech.supported){
      var speak = el('button', 'speak');
      speak.type = 'button';
      speak.appendChild(el('span', 'speak-icon', '🔊'));
      speak.appendChild(el('span', null, t('listen')));
      speak.addEventListener('click', function(){
        GH.speech.say(q.sentence ? q.sentence.de : q.word.de);
      });
      tools.appendChild(speak);
    }
    tools.appendChild(shapeToggle());
    card.appendChild(tools);

    if (state.phase === 'words') paintWord(card, q);
    else paintSentence(card, q);

    if (state.won) card.appendChild(gotIt(state.won));
    if (state.paused) card.appendChild(missNote(state.paused));

    if (state.feedback){
      var fb = el('p', 'feedback ' + state.feedbackKind, state.feedback);
      card.appendChild(fb);
    }
    host.appendChild(card);
    if (state.paused) GH.nav.ready();

    if (state.autoSpeak){
      state.autoSpeak = false;
      GH.speech.say(q.sentence ? q.sentence.de : q.word.de);
    }
  }

  function shapeToggle(){
    var wrap = el('div', 'mode-toggle');
    var shapes = state.phase === 'words'
      ? [['pic', 'vShapePic'], ['word', 'vShapeWord']]
      : [['blank', 'vShapeBlank'], ['pic', 'vShapePic']];
    if (state.phase === 'words' && canMean(state.set)) shapes.push(['mean', 'vShapeMean']);
    shapes.forEach(function(pair){
      var b = el('button', null, t(pair[1]));
      b.type = 'button';
      b.setAttribute('aria-pressed', shapeOf() === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        if (state.phase === 'words') state.wordShape = pair[0];
        else state.senShape = pair[0];
        rebuild();
      });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function shapeOf(){
    return state.phase === 'words' ? state.wordShape : state.senShape;
  }

  function paintWord(card, q){
    var shape = state.wordShape;
    var pick = answerWord;

    if (shape === 'pic'){
      var fig = el('figure', 'figure');
      fig.appendChild(GH.sprite.tile(GH.packs.imgOf(q.word), q.word.de));
      card.appendChild(fig);
      var opts = el('div', 'options');
      q.options.forEach(function(o){ opts.appendChild(textOption(o.de, o, pick)); });
      card.appendChild(opts);
      return;
    }

    if (shape === 'word'){
      card.appendChild(el('p', 'vword', q.word.de));
      var grid = el('div', 'vpics');
      q.options.forEach(function(o){ grid.appendChild(tile(o, pick)); });
      card.appendChild(grid);
      return;
    }

    /* mean */
    var k = meaningKey();
    card.appendChild(el('p', 'vword', q.word.de));
    var mo = el('div', 'options');
    q.options.forEach(function(o){ mo.appendChild(textOption(o[k] || o.en, o, pick)); });
    card.appendChild(mo);
  }

  function paintSentence(card, q){
    var cut = blankOut(q.sentence, q.word);
    if (state.senShape === 'pic' || !cut.ok){
      card.appendChild(el('p', 'sentence', q.sentence.de));
      var tr = translationOf(q.sentence);
      if (tr) card.appendChild(el('p', 'translation', tr));
      var grid = el('div', 'vpics');
      q.options.forEach(function(o){ grid.appendChild(tile(o, answerSentence)); });
      card.appendChild(grid);
      return;
    }

    var p = el('p', 'sentence');
    p.appendChild(document.createTextNode(cut.before));
    p.appendChild(el('span', 'slot' + (state.revealed ? ' filled' : ''),
                     state.revealed ? cut.blank : '???'));
    p.appendChild(document.createTextNode(cut.after));
    card.appendChild(p);
    var tr2 = translationOf(q.sentence);
    if (tr2) card.appendChild(el('p', 'translation', tr2));
    var opts = el('div', 'options');
    q.options.forEach(function(o){ opts.appendChild(textOption(o.de, o, answerSentence)); });
    card.appendChild(opts);
  }

  /* Falls back to English rather than showing nothing: the newest
     sentences have their English but not yet their Russian, and a blank
     line under the German is worse than the wrong support language. */
  function translationOf(sen){
    var lang = GH.i18n.lang();
    if (lang === 'de') return '';
    return sen[lang] || sen.en || '';
  }

  function paintDone(){
    var lang = GH.i18n.lang();
    var list = Object.keys(state.missed).map(function(k){ return state.missed[k]; });
    list.sort(function(a, b){ return b.n - a.n; });
    var total = state.words.length;
    var clean = total - list.length;

    /* pay for the round before drawing the screen that reports it */

    var paid = GH.coins ? GH.coins.award('vocab', state.run,

      { record: !!state.newBest }) : null;
      /* and anything newly true — checked after the round is counted */
      var won = GH.awards ? GH.awards.afterRound('vocab', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: list.length ? 'done' : 'perfect',
      title: list.length ? t('doneTitle') : t('cwPerfect'),
      stats: [
        { n:clean, label:t('vocabFirstTry'), kind:'good' },
        { n:list.length, label:t('fbWrong'), kind:'bad' }
      ],
      reviews: [{
        head: t('vocabReviewHead'),
        tone: 'missed',
        items: list.map(function(m){
          return {
            n: m.word.n,
            de: m.word.de,
            gloss: lang === 'de' ? '' : (m.word[lang] || m.word.en || ''),
            flag: m.n > 1 ? t('vocabMissedN', { n:m.n }) : ''
          };
        }),
        onTap: function(i){ GH.speech.say(i.de); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ rebuild(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  /* ---------- answering ---------- */

  function current(){
    if (state.phase === 'words'){
      for (var i = 0; i < state.words.length; i++) if (!state.words[i].done) return state.words[i];
      return null;
    }
    return state.sentences[state.sIndex] || null;
  }

  /* Counted once per word, on the first attempt. A right answer used to
     set done, speak, and repaint — which from her side is the picture
     vanishing with no sign the app noticed. Nothing to protect, nothing
     going up, no moment of being told she got it. */
  /* The shared run handles the once-per-item guard, the streak and the
     percentage, so this is only the call. */
  function tally(q, ok){ state.run.saw(q.word.n, ok); }

  function answerWord(picked){
    var q = current();
    if (!q) return;
    if (GH.tutor){
      GH.tutor.grade(GH.packs.keyOf(q.word), GH.packs.same(picked, q.word));
      GH.packs.catsOf(q.word).forEach(function(c){
        GH.tutor.grade('topic:' + c, GH.packs.same(picked, q.word));
      });
    }
    if (GH.packs.same(picked, q.word)){
      tally(q, !state.missed[q.word.n]);
      /* Stay on this picture while it is spoken.

         Marking it done and repainting immediately meant paint() skipped
         to the next word — so she heard 'die Füße' while looking at a
         photograph of something else. That is worse than no audio: it
         pairs the word with the wrong image, which is precisely the thing
         the game exists to teach. Hold, glow, speak, then move. */
      state.won = { q:q, streak:state.run.streak };
      state.autoSpeak = false;
      state.feedback = '';
      paint();
      GH.speech.say(q.word.de, function(){
        if (!state.won || state.won.q !== q) return;   /* she moved on herself */
        advancePast(q);
      });
      /* speech can be unavailable or silently blocked, so never depend on
         the callback alone to keep the game moving */
      state.wonTimer = setTimeout(function(){
        if (state.won && state.won.q === q) advancePast(q);
      }, 1600);
    } else {
      /* Hold on this word rather than swapping the picture out from under
         her. The old behaviour re-queued immediately and repainted, so the
         image changed at the same moment the message about it appeared. */
      if (!state.missed[q.word.n]){ tally(q, false); state.missed[q.word.n] = { word:q.word, n:0 }; }
      state.missed[q.word.n].n++;
      state.missCount++;
      state.paused = { q:q, requeue:true };
      state.feedback = '';
      paint();
    }
  }

  /* Leaves the confirmed word behind and moves on. */
  function advancePast(q){
    if (state.wonTimer){ clearTimeout(state.wonTimer); state.wonTimer = null; }
    state.won = null;
    q.done = true;
    if (!current()){
      /* Every word cleared. Do not fall straight through into sentences —
         the mistakes she just made are the most useful thing in the round
         and this is the only moment she will look at them. */
      state.phase = 'review';
    }
    paint();
  }

  function answerSentence(picked){
    var q = current();
    if (!q) return;
    if (GH.tutor){
      GH.tutor.grade(GH.packs.keyOf(q.word), GH.packs.same(picked, q.word));
      GH.tutor.grade('skill:sentences', GH.packs.same(picked, q.word));
    }
    if (GH.packs.same(picked, q.word)){
      state.revealed = true;
      state.feedback = '';
      paint();
      GH.speech.say(q.sentence.de, function(){
        state.revealed = false;
        state.sIndex++;
        paint();
      });
    } else {
      if (!state.missed[q.word.n]){ state.missed[q.word.n] = { word:q.word, n:0 }; }
      state.missed[q.word.n].n++;
      state.missCount++;
      state.paused = { q:q, requeue:false };
      state.feedback = '';
      paint();
    }
  }

  /* The moment she gets one right. Shown over the picture she just chose,
     so the word and the image are on screen together while it is spoken.
     Short, and it clears itself. */
  /* A right answer said 'Correct' and nothing else — so the one moment she
     is certain she knows the word was the one moment the app would not tell
     her what it meant. A wrong answer named it; a right answer did not.
     Being right is when the pairing is worth confirming.

     It has to fit the hold: the word is spoken and the picture stays for
     about 1.6 seconds. So this is the German large and the gloss under it,
     nothing to read and nothing to dismiss. */
  function gotIt(w){
    var box = el('div', 'vg-got');

    var top = el('div', 'vg-got-top');
    top.appendChild(el('span', 'vg-got-tick', '\u2713'));
    top.appendChild(el('span', 'vg-got-word', t('correct')));
    if (w.streak >= 3){
      top.appendChild(el('span', 'vg-got-streak', t('vgStreakN', { n:w.streak })));
    }
    box.appendChild(top);

    var face = el('div', 'vg-face');
    face.appendChild(el('span', 'vg-face-de', w.q.word.de));
    var g = glossOf(w.q.word);
    if (g) face.appendChild(g);
    box.appendChild(face);

    return box;
  }

  /* Dismissing the overlay: only now does the word go to the back of the
     queue, so the picture changes when she is ready rather than while she
     is still reading. */
  function resume(){
    var p = state.paused;
    state.paused = null;
    if (p && p.requeue){
      var idx = state.words.indexOf(p.q);
      if (idx >= 0){ state.words.splice(idx, 1); state.words.push(p.q); }
    }
    paint();
  }

  function rebuild(){
    if (state.phase === 'words'){
      var cleared = {};
      state.words.forEach(function(x){ if (x.done) cleared[x.word.n] = true; });
      state.words = wordQuestions(state.set, state.wordShape);
      state.words.forEach(function(x){ if (cleared[x.word.n]) x.done = true; });
    } else {
      state.sentences = sentenceQuestions(state.set, state.senShape);
      state.sIndex = 0;
    }
    state.feedback = '';
    paint();
  }

  function start(set){
    state.set = set;
    state.phase = 'words';
    state.words = wordQuestions(set, state.wordShape);
    state.sentences = [];
    state.sIndex = 0;
    state.revealed = false;
    state.feedback = '';
    paint();
  }

  function mount(container, config){
    host = container;
    state = {
      title:config.title,
      set:config.set,
      onExit:config.onExit,
      wordShape:'pic',
      senShape:'blank',
      phase:'words',
      words:[], sentences:[], sIndex:0,
      revealed:false, feedback:'', feedbackKind:'', autoSpeak:false,
      /* which words she got wrong, and how often — the words phase ends
         with a review of exactly these */
      missed:{}, missCount:0, paused:null,
      won:null, wonTimer:null,
      run:GH.run.create()
    };
    start(config.set);
  }

  return { mount:mount, setsFor:setsFor, wordsIn:wordsIn };
})();
