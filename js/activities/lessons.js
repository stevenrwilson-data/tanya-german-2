/* The lesson engine.

   Reads a lesson from data/curriculum.js and walks its steps. It knows
   about four kinds of step and nothing about any particular lesson, so
   adding one is a block of data and never a change here.

   Three decisions worth keeping.

   A read step has no button to get it wrong. She reads and moves on. That
   sounds trivial and is the reason lessons can teach at all — a game
   cannot pause to explain, so the explaining has to be somewhere that is
   not scored.

   Answers within a step are not shuffled away on a miss. She sees what she
   chose, what was right, and why, and then goes on. A round that vanishes
   on a wrong answer teaches nothing except that wrong answers make things
   disappear.

   And the whole lesson is one run for the streak, not one per step. A
   lesson is a sitting, and the number that matters is how the sitting
   went. */

window.GH = window.GH || {};

GH.lessons = (function(){

  var host = null, state = null;

  /* ---------- how fast she actually is ----------

     A lesson that says "about 5 minutes" is guessing about a person. We
     can simply measure instead: time every step she does, keep a rolling
     average per kind of step, and estimate from that.

     Kept per kind rather than per lesson, because a read step is a read
     step wherever it appears — so a lesson she has never opened can still
     be estimated accurately from the ones she has.

     Until there is data the defaults below are used, and the estimate is
     marked as approximate rather than measured. */
  var PACE_KEY = 'gh-pace-v1';

  var DEFAULT_PACE = { read:22000, sort:7000, pick:9000, type:18000 };

  /* anything longer than this is her putting the phone down, not reading */
  var PACE_CAP = 90000;

  function pace(){
    var d = {};
    try {
      var raw = window.localStorage.getItem(PACE_KEY);
      d = raw ? JSON.parse(raw) : {};
    } catch (e){}
    var id = (GH.player ? GH.player.id() : 'solo');
    return d[id] || null;
  }

  /* One completed step. `kind` is the step type, `ms` how long it took. */
  function notePace(kind, ms){
    if (!ms || ms > PACE_CAP || ms < 400) return;
    var d = {};
    try {
      var raw = window.localStorage.getItem(PACE_KEY);
      d = raw ? JSON.parse(raw) : {};
    } catch (e){}
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = {};
    var cur = d[id][kind];
    /* a rolling average that leans on the recent, so getting faster shows
       up within a few sessions rather than being buried by history */
    d[id][kind] = cur ? Math.round(cur * 0.75 + ms * 0.25) : ms;
    d[id][kind + '_n'] = (d[id][kind + '_n'] || 0) + 1;
    try { window.localStorage.setItem(PACE_KEY, JSON.stringify(d)); } catch (e){}
  }

  /* Minutes for a lesson, from her own pace where there is enough of it.
     Returns { mins, measured } so the caller can say 'about' or not. */
  function estimate(lesson){
    var p = pace() || {};
    var ms = 0, seen = 0, want = 0;
    lesson.steps.forEach(function(st){
      var per = p[st.kind] || DEFAULT_PACE[st.kind] || 10000;
      if (p[st.kind] && (p[st.kind + '_n'] || 0) >= 4) seen++;
      want++;
      var n = st.kind === 'read' ? 1
            : st.kind === 'sort' ? st.cards.length
            : st.rounds.length;
      ms += per * n;
    });
    return {
      mins: Math.max(1, Math.round(ms / 60000)),
      measured: want > 0 && seen / want >= 0.6
    };
  }

  /* What a lesson is worth in exercises. Deliberately fixed rather than
     derived from her pace: it should not shrink as she gets faster, and it
     should mean the same thing on two different devices.

     A read step counts one, a tap one, a typed answer two. */
  function worth(lesson){
    if (lesson.worth) return lesson.worth;
    var units = 0;
    lesson.steps.forEach(function(st){
      if (st.kind === 'read') units += 1;
      else if (st.kind === 'type') units += st.rounds.length * 2;
      else units += (st.cards || st.rounds).length;
    });
    return units <= 30 ? 1 : units <= 42 ? 2 : 3;
  }

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n.lang(); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* a {ru,de,en} bundle in her interface language, falling back to English
     rather than showing a key */
  function say(bundle){
    if (!bundle) return '';
    if (typeof bundle === 'string') return bundle;
    return bundle[lang()] || bundle.en || bundle.de || '';
  }

  function all(){ return window.GH_LESSONS || []; }

  function find(id){
    var out = null;
    all().forEach(function(l){ if (l.id === id) out = l; });
    return out;
  }

  /* ---------- how far she has got ---------- */

  var KEY = 'gh-lessons-v1';

  function read(){
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  function mine(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = {};
    return { all:d, me:d[id] };
  }

  function done(lessonId){ return !!mine().me[lessonId]; }

  function markDone(lessonId){
    var m = mine();
    m.me[lessonId] = Date.now();
    try { window.localStorage.setItem(KEY, JSON.stringify(m.all)); } catch (e){}
  }

  /* ---------- the steps ---------- */

  function step(){ return state.lesson.steps[state.at]; }

  function total(){ return state.lesson.steps.length; }

  /* Every step type ends by calling this. `ok` is null for a read step,
     which is not answered and so does not count. */
  function answered(ok){
    if (ok !== null && state.run) state.run.saw(state.at + ':' + state.round, ok);
    /* SEVENTEEN LESSONS, FOUR STEPS EACH, AND NOT ONE ANSWER RECORDED.

       The run object counted them for the end screen and nothing else — no
       scheduler card, no event row. So the lessons could never come up as
       due, a rule she failed repeatedly looked identical to one she had
       never met, and the log could see that she opened a lesson and nothing
       about how it went.

       `answered()` is the single funnel every step type ends at, so one
       call here covers all seventeen. Keyed on the lesson and step rather
       than a bank word, because a lesson step is not a vocabulary item —
       `lesson:wo-wohin:2` is a thing she can be good or bad at. */
    if (ok !== null && state.lesson && GH.tutor && GH.tutor.grade){
      GH.tutor.grade('lesson:' + state.lesson.id + ':' + state.at, ok,
                     'lessons');
    }
    if (ok === false) state.wrong.push(current());
    paint();
  }

  function current(){
    var s = step();
    if (s.kind === 'sort') return s.cards[state.round];
    if (s.kind === 'pick' || s.kind === 'type') return s.rounds[state.round];
    return null;
  }

  function roundsIn(s){
    if (s.kind === 'sort') return s.cards.length;
    if (s.kind === 'pick' || s.kind === 'type') return s.rounds.length;
    return 1;
  }

  function next(){
    var s = step();
    /* time the step she is leaving, so the estimate improves as she goes */
    if (state.stepAt){
      notePace(s.kind, Date.now() - state.stepAt);
      state.stepAt = 0;
    }
    state.shown = null;
    if (state.round + 1 < roundsIn(s)){
      state.round++;
    } else {
      state.at++;
      state.round = 0;
    }
    if (state.at >= total()){
      markDone(state.lesson.id);
      state.phase = 'done';
    }
    paint();
  }

  /* ---------- painting ---------- */

  function head(){
    var h = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); state.onExit(); });
    h.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, say(state.lesson.name)));
    titles.appendChild(el('p', null, say(state.lesson.sub)));
    h.appendChild(titles);

    /* how far through, since a lesson she cannot see the end of is a
       lesson she may not finish */
    var prog = el('div', 'progress');
    var track = el('span', 'progress-track');
    var fill = el('span', 'progress-fill');
    fill.style.width = Math.round((state.at / total()) * 100) + '%';
    track.appendChild(fill);
    prog.appendChild(track);
    prog.appendChild(el('span', null, t('lsStepOf', { i:state.at + 1, n:total() })));
    h.appendChild(prog);
    if (state.run && state.run.answered) h.appendChild(GH.run.header(state.run));
    return h;
  }

  function speakBtn(text){
    var b = el('button', 'speak');
    b.type = 'button';
    b.appendChild(el('span', 'speak-icon', '\ud83d\udd0a'));
    b.addEventListener('click', function(){
      GH.speech.say(String(text).replace(/<[^>]+>/g, '').replace(/___/g, ''));
    });
    return b;
  }

  /* a German line with bold parts kept, and its gloss underneath */
  function example(x){
    var row = el('div', 'ls-eg');
    var de = el('p', 'ls-eg-de');
    de.innerHTML = x.de;
    row.appendChild(de);
    var g = say(x.gloss);
    if (g && lang() !== 'de') row.appendChild(el('p', 'ls-eg-gloss', g));
    row.appendChild(speakBtn(x.de));
    return row;
  }

  function paintRead(s, card){
    if (s.head) card.appendChild(el('h2', 'ls-head', say(s.head)));
    if (s.body) card.appendChild(el('p', 'ls-body', say(s.body)));
    (s.show || []).forEach(function(x){ card.appendChild(example(x)); });

    if (s.table){
      var tb = el('div', 'ls-table');
      s.table.forEach(function(r){
        var row = el('button', 'ls-row');
        row.type = 'button';
        row.appendChild(el('span', 'ls-row-a', r[0]));
        row.appendChild(el('span', 'ls-row-b', r[1]));
        row.appendChild(el('span', 'ls-row-c', r[2]));
        row.addEventListener('click', function(){ GH.speech.say(r[1]); });
        tb.appendChild(row);
      });
      card.appendChild(tb);
    }

    if (s.note) card.appendChild(el('p', 'ls-note', say(s.note)));

    var foot = el('div', 'card-foot');
    foot.appendChild(el('span', 'spacer'));
    var on = el('button', 'btn btn-primary js-advance', t('lsGotIt'));
    on.type = 'button';
    on.addEventListener('click', function(){ answered(null); next(); });
    foot.appendChild(on);
    card.appendChild(foot);
  }

  function paintSort(s, card){
    var c = s.cards[state.round];
    card.appendChild(el('p', 'ls-ask', say(s.ask)));
    card.appendChild(el('div', 'ls-card', c.text));

    if (state.shown){
      card.appendChild(verdict(state.shown, c.bin, s.bins));
      card.appendChild(onward());
      return;
    }

    var bins = el('div', 'ls-bins');
    s.bins.forEach(function(b){
      var btn = el('button', 'ls-bin', b.label);
      btn.type = 'button';
      btn.addEventListener('click', function(){
        state.shown = { chose:b.id, right:c.bin };
        answered(b.id === c.bin);
      });
      bins.appendChild(btn);
    });
    card.appendChild(bins);
  }

  function paintPick(s, card){
    var r = s.rounds[state.round];
    card.appendChild(el('p', 'ls-ask', say(s.ask)));

    var line = el('div', 'ls-sentence');
    line.appendChild(el('span', 'ls-sentence-de', r.de));
    line.appendChild(speakBtn(r.de.replace('___', r.answer)));
    card.appendChild(line);
    var g = say(r.gloss);
    if (g && lang() !== 'de') card.appendChild(el('p', 'ls-gloss', g));

    if (state.shown){
      card.appendChild(verdict(state.shown, r.answer));
      card.appendChild(onward());
      return;
    }

    var opts = el('div', 'ls-opts' + (r.options.length > 2 ? ' is-four' : ''));
    GH.text.shuffle(r.options.slice()).forEach(function(o){
      var b = el('button', 'ls-opt', o);
      b.type = 'button';
      b.addEventListener('click', function(){
        state.shown = { chose:o, right:r.answer };
        answered(o === r.answer);
      });
      opts.appendChild(b);
    });
    card.appendChild(opts);
  }

  function paintType(s, card){
    var r = s.rounds[state.round];
    card.appendChild(el('p', 'ls-ask', say(s.ask)));

    var line = el('div', 'ls-sentence');
    line.appendChild(el('span', 'ls-sentence-de', r.de));
    line.appendChild(speakBtn(r.de.replace('___', r.answer)));
    card.appendChild(line);
    var g = say(r.gloss);
    if (g && lang() !== 'de') card.appendChild(el('p', 'ls-gloss', g));

    if (state.shown){
      card.appendChild(verdict(state.shown, r.answer));
      card.appendChild(onward());
      return;
    }

    var wrap = el('div', 'ls-type');
    var input = el('input', 'ls-input');
    input.type = 'text';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    wrap.appendChild(input);
    var go = el('button', 'btn btn-primary', t('check'));
    go.type = 'button';
    function submit(){
      var v = (input.value || '').trim();
      if (!v) return;
      /* spelling near enough counts, as it does everywhere else */
      var how = GH.text.compare(v, r.answer);
      state.shown = { chose:v, right:r.answer, close:how === 'close' };
      answered(how === 'exact' || how === 'close');
    }
    go.addEventListener('click', submit);
    input.addEventListener('keydown', function(e){ if (e.key === 'Enter') submit(); });
    wrap.appendChild(go);
    card.appendChild(wrap);
    setTimeout(function(){ try { input.focus(); } catch (e){} }, 30);
  }

  /* What she chose against what was right. Shown rather than flashed,
     because the moment after a wrong answer is the only moment she is
     actually curious about the rule. */
  function verdict(shown, right, bins){
    var ok = shown.chose === right || shown.close;
    var box = el('div', 'ls-verdict' + (ok ? ' is-right' : ' is-wrong'));
    box.appendChild(el('span', 'ls-verdict-mark', ok ? '\u2713' : '\u2717'));
    var body = el('span', 'ls-verdict-body');
    if (ok){
      body.appendChild(el('span', 'ls-verdict-main',
        shown.close ? t('closeSpelling', { word:right }) : t('correct')));
    } else {
      body.appendChild(el('span', 'ls-verdict-main', t('lsRightIs', { word:label(right, bins) })));
      body.appendChild(el('span', 'ls-verdict-sub', t('lsYouSaid', { word:label(shown.chose, bins) })));
    }
    box.appendChild(body);
    return box;
  }

  function label(id, bins){
    if (!bins) return id;
    var out = id;
    bins.forEach(function(b){ if (b.id === id) out = b.label; });
    return out;
  }

  function onward(){
    var foot = el('div', 'card-foot');
    foot.appendChild(el('span', 'spacer'));
    var last = state.at === total() - 1 && state.round === roundsIn(step()) - 1;
    var b = el('button', 'btn btn-primary js-advance', last ? t('finish') : t('next'));
    b.type = 'button';
    b.addEventListener('click', next);
    foot.appendChild(b);
    return foot;
  }

  function paintDone(){
    host.textContent = '';
    /* A long lesson counts as two or three exercises, so it pays and
       advances the daily bonus accordingly.

       This used to call award() in a loop, which worked but wrote three
       ledger entries and three breakdown lines for one lesson. `units`
       does it in one, and a lesson knows its own worth from its steps —
       it does not need award() to guess from the answer count. */
    var paid = GH.coins
      ? GH.coins.award('lesson:' + state.lesson.id, state.run,
                       { units: worth(state.lesson) })
      : null;
    var won = GH.awards ? GH.awards.afterRound('lesson', state.run) : [];

    var items = [];
    var seen = {};
    state.wrong.forEach(function(w){
      if (!w) return;
      var k = (w.text || w.de || '');
      if (seen[k]) return;
      seen[k] = true;
      items.push({
        de: (w.de || w.text || '').replace('___', (w.answer || w.bin || '')),
        gloss: say(w.gloss) || '',
        speak: (w.de || w.text || '').replace('___', (w.answer || ''))
      });
    });

    GH.endScreen.render(host, {
      tone: state.wrong.length === 0 ? 'perfect' : 'done',
      glyph: state.wrong.length === 0 ? '\ud83c\udf1f' : '\u2713',
      title: t('lsFinished'),
      stats: GH.run.stats(state.run),
      note: t('lsNote'),
      coins: paid,
      awards: won,
      reviews: items.length ? [{
        head: t('lsMissedHead'),
        tone: 'missed',
        items: items,
        onTap: function(x){ GH.speech.say(x.speak); }
      }] : [],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.lesson, true); } },
        /* the page that explains the same rule, for reading at leisure */
        /* Over this screen rather than replacing it. It used to clear `host`
           and render the topic in its place, so reading the rule threw away
           the result she had just been shown and Back went to the hub. */
        (state.lesson.topic && GH.grammar ? { label:t('lsToGrammar'), onClick:function(){
            if (GH.grammar.overlay){ GH.grammar.overlay(state.lesson.topic); return; }
            host.textContent = '';
            GH.grammar.openTopic(host, state.lesson.topic, state.onExit);
          } } : null),
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ].filter(Boolean)
    });
  }

  function paint(){
    if (state.phase === 'done'){ paintDone(); return; }
    if (state.phase === 'pick'){ paintList(); return; }
    if (state.phase === 'intro'){ paintIntro(); return; }
    if (!state.stepAt) state.stepAt = Date.now();

    host.textContent = '';
    host.appendChild(head());

    var card = el('div', 'card');
    var s = step();
    if (s.kind === 'read') paintRead(s, card);
    else if (s.kind === 'sort') paintSort(s, card);
    else if (s.kind === 'pick') paintPick(s, card);
    else if (s.kind === 'type') paintType(s, card);
    host.appendChild(card);
    GH.nav.ready();
  }

  /* Before it begins: what it is worth, and how long it will take her.

     The time is measured from her own pace rather than asserted, because a
     static 'about 5 minutes' is a guess about a person. Once there is
     enough data it says four minutes rather than about four, which is a
     small honesty that matters when someone is deciding whether they have
     time. */
  function paintIntro(){
    host.textContent = '';
    var l = state.lesson;

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, say(l.name)));
    titles.appendChild(el('p', null, say(l.sub)));
    head.appendChild(titles);
    host.appendChild(head);

    var card = el('div', 'card');
    card.appendChild(el('div', 'ls-intro-glyph', l.glyph || '\ud83d\udcda'));

    var est = estimate(l);
    var w = worth(l);

    var facts = el('div', 'ls-facts');

    var f1 = el('div', 'ls-fact');
    f1.appendChild(el('span', 'ls-fact-n', String(est.mins)));
    f1.appendChild(el('span', 'ls-fact-l',
      est.measured ? t('lsMinsYours') : t('lsMinsAbout')));
    facts.appendChild(f1);

    var f2 = el('div', 'ls-fact');
    f2.appendChild(el('span', 'ls-fact-n', String(w)));
    f2.appendChild(el('span', 'ls-fact-l', t('lsCountsAs', { n:w })));
    facts.appendChild(f2);

    var f3 = el('div', 'ls-fact');
    var pay = w * (GH.coins ? GH.coins.rates.per : 10);
    f3.appendChild(el('span', 'ls-fact-n', '\u25c8 ' + pay));
    f3.appendChild(el('span', 'ls-fact-l', t('lsEarns')));
    facts.appendChild(f3);

    card.appendChild(facts);

    /* how the day is going, since that is what decides whether she starts
       another one now */
    if (GH.coins && GH.coins.dayCount() < GH.coins.rates.target){
      card.appendChild(el('p', 'ls-intro-day',
        t('coProgress', { at:GH.coins.dayCount(), n:GH.coins.rates.target })));
    }

    if (done(l.id)) card.appendChild(el('p', 'ls-intro-again', t('lsDoneBefore')));

    var foot = el('div', 'card-foot');
    foot.appendChild(el('span', 'spacer'));
    var go = el('button', 'btn btn-primary js-advance', t('lsBegin'));
    go.type = 'button';
    go.addEventListener('click', function(){ state.phase = 'run'; paint(); });
    foot.appendChild(go);
    card.appendChild(foot);

    host.appendChild(card);
  }

  function paintList(){
    host.textContent = '';
    var h = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    h.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('lsTitle')));
    titles.appendChild(el('p', null, t('lsSub')));
    h.appendChild(titles);
    host.appendChild(h);

    var grid = el('div', 'tiles');
    all().forEach(function(l){
      var b = el('button', 'tile' + (done(l.id) ? ' is-done' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'tile-glyph', l.glyph || '\ud83d\udcda'));
      b.appendChild(el('span', 'tile-name', say(l.name)));
      b.appendChild(el('span', 'tile-sub', say(l.sub)));
      var e = estimate(l);
      b.appendChild(el('span', 'tile-foot',
        (done(l.id) ? '\u2713  ' : '') +
        t('lsMins', { n:e.mins }) + '  \u00b7  ' + t('lsCountsAs', { n:worth(l) })));
      b.addEventListener('click', function(){ begin(l); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function begin(lesson, skipIntro){
    state.lesson = lesson;
    state.at = 0;
    state.round = 0;
    state.shown = null;
    state.wrong = [];
    state.stepAt = 0;
    state.run = GH.run.create();
    state.phase = skipIntro ? 'run' : 'intro';
    paint();
  }

  function open(container, onExit, lessonId){
    host = container;
    state = { onExit:onExit, phase:'pick', at:0, round:0, shown:null, wrong:[], run:null };
    var one = lessonId ? find(lessonId) : null;
    if (one) begin(one);
    else if (all().length === 1) begin(all()[0]);
    else paint();
  }

  return { open:open, all:all, find:find, done:done,
           estimate:estimate, worth:worth };
})();
