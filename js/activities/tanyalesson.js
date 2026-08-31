/* Tanya's lessons — the screen.

   Her coursework, with her name on it, in the reference row. Five stages
   against one story, taking more of it away each time.

   ------------------------------------------------------------------
   IT RUNS THE STAGES ITSELF, AND HERE IS WHY

   Four of the five already exist elsewhere: the Reader grades `mc` and
   `tf`, fill-blank removes words, talkview's stage C removes a whole line
   and offers three replies, and the Reader has an `order` kind used once
   in the entire app. Reusing them would have meant handing each one a
   piece of story and taking it back — five hand-offs, five sets of state,
   and a Back button that has to know where it came from.

   What is shared instead is the SHAPE, deliberately: the same `mc`/`tf`
   question kinds as the dialogues, the same string-not-index blanks, the
   same rule that a wrong whole-line choice must be written rather than
   drawn from elsewhere. Nothing here invents a sixth way to ask a
   question.

   ------------------------------------------------------------------
   NO REST, NO SPACED REPETITION, NO TUTOR

   The lesson is a course, not a scheduler. Stages unlock in order, a
   finished stage stays finished, redoing one is allowed and pays nothing
   twice. The Reader's five-day rest and its translation-spends-the-
   questions rule are both absent, because progressive damage means moving
   forward through one story in one sitting and a five-day wall between
   stage one and stage two would break the only idea the lesson has.

   `read` is the one stage that shows the translation. The four damaged
   stages never do, which settles the same collision without a rule.

   ------------------------------------------------------------------
   WHAT FINISHING PAYS

   Every stage finished is recorded. A lesson with all five finished pays
   its achievement. All lessons finished pays another, and grants a
   FREE RARE PET TOKEN — any pet of tier rare or below, no Kronen, no
   requirement met. Both go through GH.awards, which already refuses to
   pay the same achievement twice.

   ------------------------------------------------------------------
   A LESSON WITH NO GERMAN SAYS SO

   `ready:false` in the data means the German has not arrived. The lesson
   is listed and opens, and says what it is waiting for, rather than
   running a stage against ten empty strings. */

window.GH = window.GH || {};

GH.tanyaLesson = (function(){

  var host = null;
  var state = null;

  var KEY = 'gh-tanya-v1';

  /* In order. `at` is the index, which is what decides what unlocks. */
  /* `after` is the unlock rule and it is optional.

       absent   the one before it must be finished  — a straight ladder
       a number ANY that many other stages, in any order
       an array those named stages, all of them

     The game is last and gated on a count rather than on the stage above
     it, because it is the reward: doing three of the four earning it is a
     different promise from grinding all four in a fixed order. `after` is
     data, so moving that number is one edit and no logic. */
  var STAGES = [
    { id:'read',   key:'tlRead'   },
    { id:'words',  key:'tlWords'  },
    { id:'line',   key:'tlLine'   },
    { id:'order',  key:'tlOrder'  },
    { id:'listen', key:'tlListen' },
    { id:'game',   key:'tlGame',  after:3, game:true }
  ];

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function all(){ return window.GH_TANYA || []; }

  function byId(id){
    var L = all(), i;
    for (i = 0; i < L.length; i++) if (L[i].id === id) return L[i];
    return null;
  }

  /* ---------- what is finished ---------- */

  function slot(){
    return (GH.player && GH.player.id)
      ? GH.player.id() + ':' + GH.player.target() : 'solo';
  }

  function read(){
    try {
      var raw = window.localStorage.getItem(KEY);
      var d = raw ? JSON.parse(raw) : {};
      if (!d[slot()]) d[slot()] = {};
      return d;
    } catch (e){
      var f = {}; f[slot()] = {}; return f;
    }
  }

  function save(d){
    try { window.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e){}
  }

  function doneList(id){
    var d = read()[slot()] || {};
    return (d[id] && d[id].done) ? d[id].done.slice() : [];
  }

  function isDone(id, stage){ return doneList(id).indexOf(stage) >= 0; }

  /* A stage is open when the one before it is finished. The first is
     always open; a stage already finished stays open, so she can go back
     and read the story again. */
  /* How many of the OTHER stages are finished. The stage in question is
     excluded, so `after:3` cannot be satisfied by having already played
     the game itself. */
  function othersDone(id, at){
    var got = doneList(id), me = STAGES[at].id, n = 0;
    STAGES.forEach(function(s){
      if (s.id !== me && got.indexOf(s.id) >= 0) n++;
    });
    return n;
  }

  function isOpen(id, at){
    var st = STAGES[at];
    /* A finished stage stays open, so she can go back and read the story
       again or replay the game. */
    if (isDone(id, st.id)) return true;

    if (typeof st.after === 'number') return othersDone(id, at) >= st.after;
    if (st.after && st.after.length){
      return st.after.every(function(x){ return isDone(id, x); });
    }
    if (at === 0) return true;
    return isDone(id, STAGES[at - 1].id);
  }

  /* What a shut stage is waiting for, so the row says why rather than just
     being grey. A control that is dim for no stated reason reads as a
     fault. */
  function whyShut(id, at){
    var st = STAGES[at];
    if (typeof st.after === 'number'){
      return t('tlAfterN', { n:st.after - othersDone(id, at), of:st.after });
    }
    if (st.after && st.after.length){
      var left = st.after.filter(function(x){ return !isDone(id, x); });
      var names = left.map(function(x){
        var d = STAGES.filter(function(s){ return s.id === x; })[0];
        return d ? t(d.key) : x;
      });
      return t('tlAfterThese', { list:names.join(', ') });
    }
    var prev = STAGES[at - 1];
    return prev ? t('tlAfterThese', { list:t(prev.key) }) : '';
  }

  function markDone(id, stage){
    if (isDone(id, stage)) return false;
    var d = read();
    if (!d[slot()][id]) d[slot()][id] = { done:[] };
    d[slot()][id].done.push(stage);
    save(d);
    payout();
    return true;
  }

  function lessonComplete(id){
    var got = doneList(id);
    return STAGES.every(function(s){ return got.indexOf(s.id) >= 0; });
  }

  function allComplete(){
    var L = all();
    return L.length > 0 && L.every(function(x){ return lessonComplete(x.id); });
  }

  /* Achievements and the token. awards.js refuses to pay the same one
     twice, so this can be called after every stage without counting. */
  function payout(){
    if (GH.awards && GH.awards.check) GH.awards.check();
    /* The token is granted here rather than by an achievement, because an
       achievement pays Kronen and this pays a pet. Guarded on the same
       record the achievement uses, so it cannot be granted twice. */
    if (!allComplete()) return;
    var d = read();
    if (d[slot()].tokenGiven) return;
    d[slot()].tokenGiven = Date.now();
    save(d);
    if (GH.store && GH.store.grantToken) GH.store.grantToken('rare', 1);
  }

  /* For awards.js to test against. */
  function stats(){
    var L = all();
    var stages = 0;
    L.forEach(function(x){ stages += doneList(x.id).length; });
    return {
      lessons: L.length,
      finished: L.filter(function(x){ return lessonComplete(x.id); }).length,
      stages: stages,
      all: allComplete()
    };
  }

  /* ---------- the list ---------- */

  function paintIndex(){
    host.textContent = '';
    GH.speech.stop();

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('tlTitle')));
    titles.appendChild(el('p', null, t('tlSub')));
    head.appendChild(titles);
    host.appendChild(head);

    var L = all();
    if (!L.length){
      host.appendChild(el('p', 'lede', t('tlEmpty')));
      if (GH.nav) GH.nav.ready();
      return;
    }

    var list = el('div', 'tl-list');
    L.forEach(function(x){
      var b = el('button', 'tl-card' + (lessonComplete(x.id) ? ' is-done' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'tl-card-name', GH.i18n.pick(x.title)));
      b.appendChild(el('span', 'tl-card-meta',
        t('tlStagesN', { n:doneList(x.id).length, of:STAGES.length })));
      if (!x.ready) b.appendChild(el('span', 'tl-card-wait', t('tlNotReady')));
      b.addEventListener('click', function(){
        state.id = x.id; state.stage = null;
        paintLesson();
      });
      list.appendChild(b);
    });
    host.appendChild(list);

    if (GH.nav) GH.nav.ready();
  }

  /* ---------- one lesson: the stage list ---------- */

  function paintLesson(){
    var L = byId(state.id);
    if (!L){ paintIndex(); return; }
    host.textContent = '';
    GH.speech.stop();

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      state.id = null; state.stage = null; paintIndex();
    });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, GH.i18n.pick(L.title)));
    titles.appendChild(el('p', null,
      t('tlStagesN', { n:doneList(L.id).length, of:STAGES.length })));
    head.appendChild(titles);
    host.appendChild(head);

    /* Which of her words this lesson is teaching, counted from vocab.js
       rather than listed here — the tags are the single source. */
    if (GH.packs && GH.packs.onlyOf && (L.kaps || []).length){
      var n = 0;
      L.kaps.forEach(function(k){ n += GH.packs.onlyOf('lesson', k).length; });
      host.appendChild(el('p', 'tl-words', t('tlWordsN', { n:n })));
    }

    /* A lesson with no German cannot run the four story stages — but the
       game runs off her WORDS, which exist, so it is offered anyway.
       Holding the only playable thing back until the prose arrives would
       be the wrong way round. */
    if (!L.ready){
      host.appendChild(waiting(L));
      if (GH.lessonGame && GH.lessonGame.open){
        var gb = el('button', 'btn btn-primary tl-next', t('tlGame'));
        gb.type = 'button';
        gb.addEventListener('click', function(){
          state.stage = 'game'; state.step = 0; paintStage();
        });
        host.appendChild(gb);
      }
      if (GH.nav) GH.nav.ready();
      return;
    }

    var wrap = el('div', 'tl-stages');
    STAGES.forEach(function(s, at){
      var open = isOpen(L.id, at);
      var done = isDone(L.id, s.id);
      var b = el('button', 'tl-stage' +
        (done ? ' is-done' : '') + (open ? '' : ' is-shut'));
      b.type = 'button';
      b.disabled = !open;
      b.appendChild(el('span', 'tl-stage-n', String(at + 1)));
      var body = el('span', 'tl-stage-body');
      body.appendChild(el('span', 'tl-stage-name', t(s.key)));
      body.appendChild(el('span', 'tl-stage-sub', t(s.key + 'Sub')));
      b.appendChild(body);
      if (done) b.appendChild(el('span', 'tl-stage-tick', '\u2713'));
      else if (!open){
        /* Grey with no reason reads as a fault. Say what opens it. */
        body.appendChild(el('span', 'tl-stage-why', whyShut(L.id, at)));
      }
      if (open){
        b.addEventListener('click', function(){
          state.stage = s.id; state.step = 0; state.picked = null;
          state.opts = null; state.got = 0;
          paintStage();
        });
      }
      wrap.appendChild(b);
    });
    host.appendChild(wrap);

    if (lessonComplete(L.id)){
      host.appendChild(el('p', 'tl-complete', t('tlComplete')));
      if (allComplete()) host.appendChild(el('p', 'tl-token', t('tlTokenWon')));
    }

    if (GH.nav) GH.nav.ready();
  }

  /* A lesson whose German has not arrived says what it needs rather than
     running a stage against empty strings. */
  function waiting(L){
    var box = el('div', 'tl-wait');
    box.appendChild(el('p', 'tl-wait-t', t('tlWaitingFor')));
    var ul = el('ul', 'tl-wait-list');
    var need = [];
    if (!L.sentences.filter(function(s){ return s.de; }).length) need.push('tlNeedGerman');
    if (!(L.q || []).length)     need.push('tlNeedQuestions');
    if (!(L.gaps || []).length)  need.push('tlNeedGaps');
    if (!(L.cut || []).length)   need.push('tlNeedCut');
    if (!(L.order || []).length) need.push('tlNeedOrder');
    need.forEach(function(k){ ul.appendChild(el('li', 'tl-wait-item', t(k))); });
    box.appendChild(ul);

    /* The English is here, so the lesson is at least readable while it
       waits — and so the story can be checked against the words. */
    var story = el('div', 'tl-body');
    L.sentences.forEach(function(s, i){
      var row = el('p', 'tl-line-en');
      row.appendChild(el('span', 'tl-n', String(i + 1)));
      row.appendChild(el('span', null, s.en));
      story.appendChild(row);
    });
    box.appendChild(story);
    return box;
  }

  /* ---------- the stages ---------- */

  function paintStage(){
    var L = byId(state.id);
    if (!L || !state.stage){ paintLesson(); return; }
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      GH.speech.stop();
      state.stage = null; paintLesson();
    });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    var sdef = STAGES.filter(function(s){ return s.id === state.stage; })[0];
    titles.appendChild(el('h1', null, t(sdef.key)));
    titles.appendChild(el('p', null, GH.i18n.pick(L.title)));
    head.appendChild(titles);
    host.appendChild(head);

    if (state.stage === 'game')   stageGame(L);
    else if (state.stage === 'read')   stageRead(L);
    else if (state.stage === 'words')  stageWords(L);
    else if (state.stage === 'line')   stageLine(L);
    else if (state.stage === 'order')  stageOrder(L);
    else if (state.stage === 'listen') stageListen(L);

    if (GH.nav) GH.nav.ready();
  }

  /* the story, however much of it the stage wants to show */
  function storyBlock(L, opts){
    opts = opts || {};
    var l = lang();
    var wrap = el('div', 'tl-body');
    L.sentences.forEach(function(s, i){
      if (opts.upto !== undefined && i >= opts.upto) return;
      if (opts.hide === i) return;
      var row = el('div', 'tl-row');
      row.appendChild(el('span', 'tl-n', String(i + 1)));
      var col = el('div', 'tl-line-body');
      var de = el('button', 'tl-de', s.de);
      de.type = 'button';
      de.addEventListener('click', function(){ GH.speech.say(s.de); });
      col.appendChild(de);
      /* Only `read` shows the translation. */
      if (opts.translate && l !== 'de' && s[l]){
        col.appendChild(el('p', 'tl-tr', s[l]));
      }
      row.appendChild(col);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function nextBtn(label, fn){
    var b = el('button', 'btn btn-primary tl-next', label);
    b.type = 'button';
    b.addEventListener('click', fn);
    return b;
  }

  function finishStage(L, stage){
    var fresh = markDone(L.id, stage);
    host.textContent = '';
    var box = el('div', 'card tl-finish');
    box.appendChild(el('p', 'tl-finish-t',
      fresh ? t('tlStageDone') : t('tlStageAgain')));
    if (fresh && lessonComplete(L.id)){
      box.appendChild(el('p', 'tl-finish-all', t('tlComplete')));
      if (allComplete()) box.appendChild(el('p', 'tl-token', t('tlTokenWon')));
    }
    var on = el('button', 'btn btn-primary tl-next', t('tlBackToStages'));
    on.type = 'button';
    on.addEventListener('click', function(){ state.stage = null; paintLesson(); });
    box.appendChild(on);
    host.appendChild(box);
    if (GH.nav) GH.nav.ready();
  }

  /* STAGE 1 — read, with the translation, then the questions. */
  function stageRead(L){
    var bank = L.q || [];
    if (!state.asking){
      host.appendChild(storyBlock(L, { translate:true }));
      host.appendChild(el('p', 'tl-note', t('tlTapNote')));
      if (bank.length){
        host.appendChild(nextBtn(t('tlStartQs', { n:bank.length }), function(){
          state.asking = true; state.step = 0; state.picked = null;
          state.opts = null; paintStage();
        }));
      } else {
        host.appendChild(nextBtn(t('tlDoneReading'), function(){
          state.asking = false; finishStage(L, 'read');
        }));
      }
      return;
    }
    if (state.step >= bank.length){
      state.asking = false;
      finishStage(L, 'read');
      return;
    }
    askQuestion(L, bank, function(){
      state.step++; state.picked = null; state.opts = null; paintStage();
    });
  }

  /* One `mc` or `tf` question — the same two kinds the dialogues use. */
  function askQuestion(L, bank, onNext){
    var q = bank[state.step];
    var l = lang();
    host.appendChild(el('p', 'tl-step',
      t('tlStepN', { n:state.step + 1, of:bank.length })));
    host.appendChild(el('p', 'tl-q', (q.q && (q.q[l] || q.q.en)) || ''));

    if (q.kind === 'tf'){
      var asked = state.picked !== null;
      var right = asked && state.picked === q.a;
      var row = el('div', 'tl-choices');
      [[true, 'dgTrue'], [false, 'dgFalse']].forEach(function(pair){
        var cls = 'tl-choice';
        if (asked && state.picked === pair[0]) cls += right ? ' is-right' : ' is-wrong';
        var b = el('button', cls, t(pair[1]));
        b.type = 'button';
        b.addEventListener('click', function(){
          if (right) return;
          state.picked = pair[0]; paintStage();
        });
        row.appendChild(b);
      });
      host.appendChild(row);
      if (right) host.appendChild(nextBtn(t('dgNext'), onNext));
      else if (asked) host.appendChild(el('p', 'tl-wrong', t('dgTryAgain')));
      return;
    }

    var list = (q.opts && (q.opts[l] || q.opts.en)) || [];
    var answer = list[q.a || 0];
    if (!state.opts) state.opts = GH.text.shuffle(list.slice());
    var opts = el('div', 'tl-choices tl-choices-long');
    state.opts.forEach(function(o){
      var cls = 'tl-choice';
      if (state.picked === o) cls += (o === answer ? ' is-right' : ' is-wrong');
      var b = el('button', cls, o);
      b.type = 'button';
      b.addEventListener('click', function(){
        if (state.picked === answer) return;
        state.picked = o; paintStage();
      });
      opts.appendChild(b);
    });
    host.appendChild(opts);
    if (state.picked === answer) host.appendChild(nextBtn(t('dgNext'), onNext));
    else if (state.picked !== null) host.appendChild(el('p', 'tl-wrong', t('dgTryAgain')));
  }

  /* STAGE 2 — words removed, with a bank. Blanks are STRINGS: an index
     breaks the moment the sentence exists in another language. */
  function stageWords(L){
    var gaps = L.gaps || [];
    if (state.step >= gaps.length){ finishStage(L, 'words'); return; }
    var gap = gaps[state.step];
    var l = lang();

    host.appendChild(el('p', 'tl-step',
      t('tlStepN', { n:state.step + 1, of:gaps.length })));

    var line = L.sentences[gap.at] || { de:'' };
    var solved = state.picked === gap.de;
    var shown = solved ? line.de
      : line.de.replace(gap.de, '\u2003' + '_'.repeat(Math.max(3, gap.de.length)) + '\u2003');

    var row = el('div', 'tl-row is-ask');
    row.appendChild(el('span', 'tl-n', String(gap.at + 1)));
    var col = el('div', 'tl-line-body');
    var deb = el('button', 'tl-de', shown);
    deb.type = 'button';
    deb.addEventListener('click', function(){ if (solved) GH.speech.say(line.de); });
    col.appendChild(deb);
    /* the gloss of the missing word, not the whole line — enough to make
       the gap answerable, not enough to be a translation of the story */
    if (l !== 'de' && gap[l]) col.appendChild(el('p', 'tl-tr', gap[l]));
    row.appendChild(col);
    host.appendChild(row);

    if (solved){
      host.appendChild(el('p', 'tl-right', t('dgRight')));
      host.appendChild(nextBtn(t('dgNext'), function(){
        state.step++; state.picked = null; state.opts = null; paintStage();
      }));
      GH.speech.say(line.de);
      return;
    }

    /* The bank is every gap in this lesson, so the wrong answers are her
       own target words rather than filler. */
    if (!state.opts) state.opts = GH.text.shuffle(gaps.map(function(g){ return g.de; }));
    var bank = el('div', 'tl-choices');
    state.opts.forEach(function(w){
      var b = el('button', 'tl-choice' +
        (state.picked === w ? ' is-wrong' : ''), w);
      b.type = 'button';
      b.addEventListener('click', function(){ state.picked = w; paintStage(); });
      bank.appendChild(b);
    });
    host.appendChild(bank);
    if (state.picked !== null && !solved){
      host.appendChild(el('p', 'tl-wrong', t('dgTryAgain')));
    }
  }

  /* STAGE 3 — a whole sentence removed, three written wrong replies. */
  function stageLine(L){
    var cuts = L.cut || [];
    if (state.step >= cuts.length){ finishStage(L, 'line'); return; }
    var cut = cuts[state.step];
    var l = lang();
    var truth = L.sentences[cut.at] || { de:'' };
    var right = truth[l] || truth.en;

    host.appendChild(el('p', 'tl-step',
      t('tlStepN', { n:state.step + 1, of:cuts.length })));

    if (!state.opts){
      var wrong = ((cut.wrong && (cut.wrong[l] || cut.wrong.en)) || []).slice(0, 3);
      state.opts = GH.text.shuffle([right].concat(wrong));
    }

    /* The whole story with the one line missing — both sides of the gap
       are the clue, which is the point of removing a middle sentence. */
    host.appendChild(storyBlock(L, { hide:cut.at }));

    if (state.picked === right){
      var got = el('div', 'tl-row is-ask');
      got.appendChild(el('span', 'tl-n', String(cut.at + 1)));
      var col = el('div', 'tl-line-body');
      var deb = el('button', 'tl-de', truth.de);
      deb.type = 'button';
      deb.addEventListener('click', function(){ GH.speech.say(truth.de); });
      col.appendChild(deb);
      if (l !== 'de') col.appendChild(el('p', 'tl-tr', right));
      got.appendChild(col);
      host.appendChild(got);
      host.appendChild(el('p', 'tl-right', t('dgRight')));
      host.appendChild(nextBtn(t('dgNext'), function(){
        state.step++; state.picked = null; state.opts = null; paintStage();
      }));
      GH.speech.say(truth.de);
      return;
    }

    var opts = el('div', 'tl-choices tl-choices-long');
    state.opts.forEach(function(o){
      var b = el('button', 'tl-choice' + (state.picked === o ? ' is-wrong' : ''), o);
      b.type = 'button';
      b.addEventListener('click', function(){ state.picked = o; paintStage(); });
      opts.appendChild(b);
    });
    host.appendChild(opts);
    if (state.picked !== null){
      host.appendChild(el('p', 'tl-wrong', t('dgTryAgain')));
    }
  }

  /* STAGE 4 — four events, put back in order. Tap to build the sequence;
     tap a placed one to take it out again. */
  function stageOrder(L){
    var want = L.order || [];
    if (!want.length){ finishStage(L, 'order'); return; }
    var l = lang();
    if (!state.built) state.built = [];
    if (!state.pool) state.pool = GH.text.shuffle(want.slice());

    host.appendChild(el('p', 'tl-q', t('tlOrderAsk')));

    var placed = el('ol', 'tl-order-built');
    state.built.forEach(function(idx){
      var li = el('li', 'tl-order-item');
      var b = el('button', 'tl-order-btn', (L.sentences[idx] || {})[l] ||
        (L.sentences[idx] || {}).en || '');
      b.type = 'button';
      b.addEventListener('click', function(){
        state.built = state.built.filter(function(x){ return x !== idx; });
        state.pool.push(idx);
        state.wrongOrder = false;
        paintStage();
      });
      li.appendChild(b);
      placed.appendChild(li);
    });
    host.appendChild(placed);

    if (state.pool.length){
      var pool = el('div', 'tl-choices tl-choices-long');
      state.pool.forEach(function(idx){
        var b = el('button', 'tl-choice', (L.sentences[idx] || {})[l] ||
          (L.sentences[idx] || {}).en || '');
        b.type = 'button';
        b.addEventListener('click', function(){
          state.built.push(idx);
          state.pool = state.pool.filter(function(x){ return x !== idx; });
          state.wrongOrder = false;
          paintStage();
        });
        pool.appendChild(b);
      });
      host.appendChild(pool);
      return;
    }

    var ok = state.built.join(',') === want.join(',');
    if (ok){
      host.appendChild(el('p', 'tl-right', t('dgRight')));
      host.appendChild(nextBtn(t('dgNext'), function(){
        state.built = null; state.pool = null;
        finishStage(L, 'order');
      }));
      return;
    }
    host.appendChild(el('p', 'tl-wrong', t('tlOrderWrong')));
    var again = el('button', 'btn tl-next', t('tlOrderAgain'));
    again.type = 'button';
    again.addEventListener('click', function(){
      state.built = []; state.pool = GH.text.shuffle(want.slice());
      paintStage();
    });
    host.appendChild(again);
  }

  /* STAGE 5 — one line spoken and not shown, choose what happened.
     Draws on `cut`, because a removable line with three written wrong
     replies is exactly what this needs and writing a second set would be
     the same data twice. */
  function stageListen(L){
    var cuts = L.cut || [];
    if (!cuts.length){ finishStage(L, 'listen'); return; }
    if (state.step >= cuts.length){ finishStage(L, 'listen'); return; }
    var cut = cuts[state.step];
    var l = lang();
    var truth = L.sentences[cut.at] || { de:'' };
    var right = truth[l] || truth.en;

    host.appendChild(el('p', 'tl-step',
      t('tlStepN', { n:state.step + 1, of:cuts.length })));
    host.appendChild(el('p', 'tl-q', t('tlListenAsk')));

    var play = el('button', 'btn btn-primary tl-play', t('tlPlayLine'));
    play.type = 'button';
    play.addEventListener('click', function(){ GH.speech.say(truth.de); });
    host.appendChild(play);

    if (!state.opts){
      var wrong = ((cut.wrong && (cut.wrong[l] || cut.wrong.en)) || []).slice(0, 3);
      state.opts = GH.text.shuffle([right].concat(wrong));
    }

    if (state.picked === right){
      /* Only now is the German shown. Showing it earlier would make this
         a reading exercise wearing headphones. */
      host.appendChild(el('p', 'tl-heard', truth.de));
      host.appendChild(el('p', 'tl-right', t('dgRight')));
      host.appendChild(nextBtn(t('dgNext'), function(){
        state.step++; state.picked = null; state.opts = null; paintStage();
      }));
      return;
    }

    var opts = el('div', 'tl-choices tl-choices-long');
    state.opts.forEach(function(o){
      var b = el('button', 'tl-choice' + (state.picked === o ? ' is-wrong' : ''), o);
      b.type = 'button';
      b.addEventListener('click', function(){ state.picked = o; paintStage(); });
      opts.appendChild(b);
    });
    host.appendChild(opts);
    if (state.picked !== null) host.appendChild(el('p', 'tl-wrong', t('dgTryAgain')));

    /* Spoken once on arrival. iOS refuses until a tap has unlocked audio,
       which by this stage has happened many times over — and the button is
       there either way. */
    if (!state.spoke){ state.spoke = true; GH.speech.say(truth.de); }
  }

  /* ---------- the game ----------

     The game itself is Steven's and lives in its own file. This is the
     socket, and the contract is one function:

         GH.lessonGame = {
           open: function(host, ctx, onDone){ ... }
         };

     `host` is an empty element to build into — the header and the Back
     link are already painted above it, so the game does not draw its own.

     `ctx` is everything it should not have to look up:

         lesson   the GH_TANYA record
         words    the course words for this lesson's chapters, already
                  resolved out of vocab.js: full entries with de, en, ru,
                  their two example sentences and an image number where one
                  exists. This is the pool the game should draw from and it
                  is the whole point of the stage — thirty words, hers, and
                  nothing else in the app.
         story    the lesson's sentences, for a game that wants context
         lang     her interface language right now

     `onDone(won)` is called when the game finishes. A truthy argument
     marks the stage done and pays; a falsy one leaves it unfinished, so a
     game she abandons or loses costs her nothing and can be replayed.

     If the file is not loaded the stage says so and offers Back. It does
     not throw, and it does not pretend to be finished. */
  function courseWords(L){
    if (!GH.packs || !GH.packs.onlyOf) return [];
    var seen = {}, out = [];
    (L.kaps || []).forEach(function(k){
      GH.packs.onlyOf('lesson', k).forEach(function(v){
        if (seen[v.de]) return;
        seen[v.de] = 1;
        out.push(v);
      });
    });
    return out;
  }

  function stageGame(L){
    if (!GH.lessonGame || !GH.lessonGame.open){
      var miss = el('div', 'tl-wait');
      miss.appendChild(el('p', 'tl-wait-t', t('tlGameMissing')));
      host.appendChild(miss);
      var b = el('button', 'btn tl-next', t('tlBackToStages'));
      b.type = 'button';
      b.addEventListener('click', function(){ state.stage = null; paintLesson(); });
      host.appendChild(b);
      return;
    }

    var box = el('div', 'tl-game');
    host.appendChild(box);
    var words = courseWords(L);
    GH.lessonGame.open(box, {
      lesson: L,
      words: words,
      story: L.sentences || [],
      lang: lang()
    }, function(won){
      if (won) finishStage(L, 'game');
      else { state.stage = null; paintLesson(); }
    });
  }

  /* ---------- entry ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, id:null, stage:null, step:0,
              picked:null, opts:null, asking:false, spoke:false,
              built:null, pool:null };
    GH.app.redraw = function(){
      GH.speech.stop();
      state.spoke = false;
      if (state.stage) paintStage();
      else if (state.id) paintLesson();
      else paintIndex();
    };
    paintIndex();
  }

  var entry = {
    id:'tanya-lessons',
    /* The Lessons row, above the games and beside the seventeen grammar
       lessons. A lesson is where something is learned and a game is where
       it is drilled; her coursework belongs with the former.

       Registered lessons sort above the grammar ones, because hers is what
       she is being taught this month. */
    kind:'lesson',
    glyph:'\ud83c\udf93',
    name:{ ru:'Уроки Танюши', de:'Tanushas Lektionen', en:'Tanya Lessons' },
    sub:{ ru:'Слова из её курса, по одному рассказу',
          de:'Ihre Kurswörter, eine Geschichte auf einmal',
          en:'Her course words, one story at a time' },
    open:open
  };

  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register,
           stats:stats, stages:STAGES };
})();
