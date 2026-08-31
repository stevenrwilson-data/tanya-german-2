/* Fill in the missing word.
   Every round = one sentence with one blank taken out. A blank is either a
   single word or a whole noun phrase ("eine neue Jacke").
   The sentence is spoken before the round and again once it is solved. */

window.GH = window.GH || {};

GH.fillBlank = (function(){

  var t = function(k, v){ return GH.i18n.t(k, v); };

  var pool = null;   /* answer pool for the wrong choices */
  var host = null;   /* container element */
  var state = null;

  /* ---------- answer pool ---------- */

  function buildPool(){
    var byCat = {}, all = [];
    function add(cat, de){
      GH.text.allUnits(de).forEach(function(u){
        var item = { text:u.text.trim(), words:u.wordCount };
        if (!byCat[cat]) byCat[cat] = [];
        byCat[cat].push(item);
        all.push(item);
      });
    }
    (GH_BANK.sentences || []).forEach(function(s){ add(s.cat, s.de); });
    (GH_BANK.stories || []).forEach(function(st){
      (st.sentences || []).forEach(function(s){ add(st.cat, s.de); });
    });
    return { byCat:byCat, all:all };
  }

  function distractors(target, wordCount, cat, howMany){
    if (!pool) pool = buildPool();
    var cap = GH.text.capitalized(target);
    var seen = {};
    seen[GH.text.normalize(target)] = true;
    var near = [], far = [];

    [pool.byCat[cat] || [], pool.all].forEach(function(list){
      GH.text.shuffle(list).forEach(function(item){
        var key = GH.text.normalize(item.text);
        if (seen[key]) return;
        if (item.words !== wordCount) return;
        if (GH.text.capitalized(item.text) !== cap) return;
        seen[key] = true;
        if (Math.abs(item.text.length - target.length) <= 5) near.push(item.text);
        else far.push(item.text);
      });
    });
    return near.concat(far).slice(0, howMany);
  }

  /* ---------- rounds ---------- */

  /* Rounds are interleaved by pass, not grouped by sentence: every
     sentence's first blank, then every sentence's second, and so on.
     Grouping them put the same sentence on screen three times in a
     row. Stories pass ordered:true so their narrative sequence
     survives; topic lists get each pass shuffled separately so the
     three passes aren't in identical order. */
  function buildRounds(sentences, ordered){
    var perSentence = sentences.map(function(s){
      var tokens = GH.text.tokenize(s.de);
      return GH.text.blankUnits(s.de, s.blanks).map(function(u){
        return {
          sentence:s,
          tokens:tokens,
          start:u.start,
          end:u.end,
          words:u.wordCount,
          answer:u.text.trim(),
          options:null
        };
      });
    });

    var most = 0, i;
    for (i = 0; i < perSentence.length; i++){
      if (perSentence[i].length > most) most = perSentence[i].length;
    }

    var rounds = [], pass, group;
    for (pass = 0; pass < most; pass++){
      group = [];
      for (i = 0; i < perSentence.length; i++){
        if (perSentence[i][pass]) group.push(perSentence[i][pass]);
      }
      if (!ordered) group = GH.text.shuffle(group);
      rounds = rounds.concat(group);
    }

    /* A pass can end and the next begin on the same sentence when only
       one sentence carries that many blanks. Nudge those apart. */
    for (i = 1; i < rounds.length; i++){
      if (rounds[i].sentence !== rounds[i - 1].sentence) continue;
      var j;
      for (j = i + 1; j < rounds.length; j++){
        if (rounds[j].sentence !== rounds[i - 1].sentence &&
            (j + 1 >= rounds.length || rounds[j + 1].sentence !== rounds[i].sentence)){
          var tmp = rounds[i]; rounds[i] = rounds[j]; rounds[j] = tmp;
          break;
        }
      }
    }
    return rounds;
  }

  /* ---------- helpers ---------- */

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function translationOf(s){
    var lang = GH.i18n.lang();
    if (lang === 'de') return '';
    return s[lang] || '';
  }

  /* A topic can yield fifty-seven rounds, because every sentence has two or
     three blanks. Fifty-seven of anything without a pause is a slog and
     nothing about it feels like progress — she cannot see the end and gets
     no verdict until she reaches it. So the rounds are served in sets, with
     a short report between them and the option to stop. */
  var SET = 12;

  function setEnd(){ return Math.min(state.setStart + SET, state.rounds.length); }
  function inSet(){ return state.i - state.setStart; }
  function setSize(){ return setEnd() - state.setStart; }
  function lastSet(){ return setEnd() >= state.rounds.length; }

  function round(){ return state.rounds[state.i]; }

  /* ---------- speaking ---------- */

  /* Auto-play is the German spoken BEFORE she answers. It is a crutch,
     so it can be switched off; the sentence is still spoken after a
     correct answer either way, and the Listen button always works.
     Remembered between visits — a preference that resets every session
     is no preference at all. Private browsing on iOS throws rather
     than returning null, hence the try/catch. */
  var AUTO_KEY = 'gh-autoplay';

  function autoOn(){
    try {
      return window.localStorage.getItem(AUTO_KEY) !== 'off';
    } catch (e){ return true; }
  }

  function setAuto(on){
    try { window.localStorage.setItem(AUTO_KEY, on ? 'on' : 'off'); } catch (e){}
  }

  function speakSentence(){
    var r = round();
    if (!r) return;
    var btn = host.querySelector('.speak');
    if (btn) btn.classList.add('is-speaking');
    GH.speech.say(r.sentence.de, function(){
      var b = host.querySelector('.speak');
      if (b) b.classList.remove('is-speaking');
    });
  }

  /* ---------- painting ---------- */

  function paint(){
    var r = round();
    if (!r){ paintDone(); return; }
    if (state.i >= setEnd()){ paintSetBreak(); return; }

    host.textContent = '';

    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      GH.speech.stop();
      state.onExit();
    });
    host.appendChild(back);

    /* header row */
    var top = el('div', 'practice-top');
    var titleWrap = el('div', 'practice-title');
    titleWrap.appendChild(el('h2', null, state.title));
    if (state.subtitle) titleWrap.appendChild(el('p', null, state.subtitle));
    top.appendChild(titleWrap);

    var prog = el('div', 'progress');
    var track = el('span', 'progress-track');
    var fill = el('span', 'progress-fill');
    fill.style.width = Math.round((inSet() / setSize()) * 100) + '%';
    track.appendChild(fill);
    prog.appendChild(track);
    prog.appendChild(el('span', null, t('progress', { i:inSet() + 1, n:setSize() })));
    top.appendChild(prog);

    var run = GH.run.header(state.run);
    if (state.rounds.length > SET){
      run.appendChild(el('span', 'run-best',
        t('fbSetOf', { i:Math.floor(state.setStart / SET) + 1,
                       n:Math.ceil(state.rounds.length / SET) })));
    }
    top.appendChild(run);
    host.appendChild(top);

    /* card */
    var card = el('div', 'card');

    var tools = el('div', 'card-tools');
    if (GH.speech.supported){
      var speak = el('button', 'speak');
      speak.type = 'button';
      speak.appendChild(el('span', 'speak-icon', '🔊'));
      speak.appendChild(el('span', null, state.solved ? t('listenAgain') : t('listen')));
      speak.addEventListener('click', speakSentence);
      tools.appendChild(speak);

      var auto = el('button', 'autotoggle', t('autoPlay'));
      auto.type = 'button';
      auto.setAttribute('aria-pressed', autoOn() ? 'true' : 'false');
      auto.setAttribute('title', t(autoOn() ? 'autoPlayOn' : 'autoPlayOff'));
      auto.addEventListener('click', function(){
        setAuto(!autoOn());
        paint();
      });
      tools.appendChild(auto);
    }

    var modes = el('div', 'mode-toggle');
    [['choose', 'choose'], ['type', 'type']].forEach(function(pair){
      var b = el('button', null, t(pair[1]));
      b.type = 'button';
      b.setAttribute('aria-pressed', state.mode === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        if (state.mode === pair[0]) return;
        state.mode = pair[0];
        paint();
      });
      modes.appendChild(b);
    });
    tools.appendChild(modes);
    card.appendChild(tools);

    if (r.sentence.img){
      var fig = el('figure', 'figure');
      if (typeof r.sentence.img === 'number'){
        fig.appendChild(GH.sprite.tile(r.sentence.img));
      } else {
        var im = document.createElement('img');
        im.src = r.sentence.img;
        im.alt = '';
        fig.appendChild(im);
      }
      card.appendChild(fig);
    }

    /* the sentence, with a slot where the blank is */
    var p = el('p', 'sentence');
    var i;
    for (i = 0; i < r.tokens.length; i++){
      if (i === r.start){
        var marks = [];
        var w;
        for (w = 0; w < r.words; w++) marks.push('???');
        var slot = el('span', 'slot' + (state.solved ? ' filled' : ''),
                      state.solved ? r.answer : marks.join(' '));
        p.appendChild(slot);
      } else if (i > r.start && i <= r.end){
        continue;
      } else {
        p.appendChild(document.createTextNode(r.tokens[i].text));
      }
    }
    card.appendChild(p);

    var tr = translationOf(r.sentence);
    if (tr) card.appendChild(el('p', 'translation', tr));

    /* What the word she just filled in actually means.

       Only after she has answered. Before, it is the answer — `das Hemd ·
       shirt` above a blank whose answer is Hemd is not a hint, it is the
       solution.

       And only when there is something to say. An article, a question
       word or a name resolves to nothing and shows nothing, rather than a
       hedged line: `Das` has a grammatical job, not a meaning.

       This is the gap the exercise had. She read `Das ___ ist sehr
       billig` with `That is very cheap` underneath, typed the right word,
       and was told she was right — without ever being shown which word
       she had translated. */
    if (state.solved){
      var said = GH.wordlook ? GH.wordlook.explain(r.answer) : null;
      if (said){
        var w = el('p', 'fb-word');
        var deb = el('button', 'fb-word-de', said.de);
        deb.type = 'button';
        deb.setAttribute('aria-label', said.de);
        deb.addEventListener('click', function(){ GH.speech.say(said.de); });
        w.appendChild(deb);
        w.appendChild(el('span', 'fb-word-gloss',
          said.senses ? '' : said.gloss));
        card.appendChild(w);

        /* A word with more than one meaning gets all of them. Showing the
           first would teach her that `Fuß` is ступня and quietly hide
           подножие, which is worse than the gap this block was written to
           close. */
        if (said.senses){
          var list = el('ul', 'fb-senses');
          said.senses.forEach(function(sn){
            var li = el('li', 'fb-sense');
            li.appendChild(el('span', 'fb-sense-gloss', sn.gloss));
            if (sn.def) li.appendChild(el('span', 'fb-sense-def', sn.def));
            list.appendChild(li);
          });
          card.appendChild(list);
        }
      }
    }

    /* answers */
    var answers = el('div', 'answers');

    if (!state.solved && state.mode === 'choose'){
      if (!r.options){
        r.options = GH.text.shuffle(
          [r.answer].concat(distractors(r.answer, r.words, r.sentence.cat || state.cat, 3))
        );
      }
      var opts = el('div', 'options');
      /* Two per row unless one of them is long. The blanks are usually a
         single word — `Haben`, `Das`, `Kleid` — and four of those down the
         whole screen is three quarters of a phone spent on four words. But
         a multi-word blank in a two-column track wraps to three lines, so
         the longest option in the set decides for all of them: mixed
         widths in a grid look like a mistake. */
      var longest = 0;
      r.options.forEach(function(w){ if (w.length > longest) longest = w.length; });
      var wide = longest > 14;

      r.options.forEach(function(word){
        var b = el('button', 'option' + (wide ? ' is-wide' : ''), word);
        b.type = 'button';
        if (state.ruledOut[GH.text.normalize(word)]){
          b.classList.add('is-wrong');
          b.disabled = true;
        }
        b.addEventListener('click', function(){ pickOption(word, b); });
        opts.appendChild(b);
      });
      answers.appendChild(opts);
    }

    if (!state.solved && state.mode === 'type'){
      var box = el('div', 'typebox');
      var input = document.createElement('input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.placeholder = t('typeHere');
      input.value = state.typed || '';
      input.addEventListener('input', function(){ state.typed = input.value; });
      input.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){ e.preventDefault(); checkTyped(input.value); }
      });
      var go = el('button', 'btn btn-primary', t('check'));
      go.type = 'button';
      go.addEventListener('click', function(){ checkTyped(input.value); });
      box.appendChild(input);
      box.appendChild(go);
      answers.appendChild(box);
      setTimeout(function(){ input.focus(); }, 0);
    }

    var fb = el('p', 'feedback' + (state.feedbackKind ? ' ' + state.feedbackKind : ''));
    if (state.feedback) fb.textContent = state.feedback;
    answers.appendChild(fb);
    card.appendChild(answers);

    /* foot */
    var foot = el('div', 'card-foot');
    if (!state.solved){
      var skip = el('button', 'btn-quiet', t('skip'));
      skip.type = 'button';
      skip.addEventListener('click', reveal);
      foot.appendChild(skip);
    }
    foot.appendChild(el('span', 'spacer'));
    if (state.solved){
      var last = state.i === state.rounds.length - 1;
      var endsSet = state.i === setEnd() - 1;
      var next = el('button', 'btn btn-primary js-advance',
        last ? t('finish') : (endsSet ? t('fbSetDone') : t('next')));
      next.type = 'button';
      next.addEventListener('click', function(){ goTo(state.i + 1); });
      foot.appendChild(next);
    }
    card.appendChild(foot);

    host.appendChild(card);
    if (state.solved) GH.nav.ready();
  }

  /* Between sets: how she did, and a genuine choice about carrying on.
     A learner who has to abandon a round to stop learns to avoid starting
     one. Offering the exit is what makes the next set voluntary. */
  function paintSetBreak(){
    host.textContent = '';
    var done = state.setStart + SET;
    var left = state.rounds.length - done;
    GH.endScreen.render(host, {
      tone: state.run.streak >= SET ? 'perfect' : 'done',
      glyph: state.run.streak >= SET ? '\ud83c\udfc6' : '\u2713',
      title: t('fbSetTitle', { i:Math.floor(state.setStart / SET) + 1 }),
      stats: GH.run.stats(state.run),
      /* Say why there are no Kronen here.

         A set break is a pause inside one round, not the end of it, and
         paying twelve at a time would make a fifty-question topic worth
         four exercises instead of one. So nothing is paid until the topic
         is finished — which is fine as a rule and was invisible as a
         screen: it showed the score, the misses and no coins, which reads
         exactly like a round that earned nothing. */
      note: t('fbLeftN', { n:left }) + ' ' + t('fbPayAtEnd'),
      reviews: [{
        head: t('fbMissedHead'),
        tone: 'missed',
        items: state.missed.slice(-8).map(function(m){
          var lang = GH.i18n.lang();
          return { n:m.sentence.img, de:m.answer, gloss:m.sentence.de,
                   flag: lang !== 'de' ? (m.sentence[lang] || '') : '' };
        }),
        onTap: function(x){ GH.speech.say(x.gloss); }
      }],
      actions: [
        { label:t('fbKeepGoing'), kind:'primary', onClick:function(){
            state.setStart = done;
            state.missed = [];
            goTo(done);
          } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function paintDone(){
    host.textContent = '';
    var total = state.rounds.length;
    var wrong = state.missed.length;
    var right = total - wrong;
    var lang = GH.i18n.lang();

    /* pay for the round before drawing the screen that reports it.
       Ten Kronen an exercise, and a longer round counts as more than
       one — coins.unitsFor() reads the answer count. */
    var paid = GH.coins ? GH.coins.award('fillblank', state.run, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('fillblank', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      won: won,
      tone: wrong === 0 ? 'perfect' : 'done',
      title: wrong === 0 ? t('cwPerfect') : t('doneTitle'),
      stats: [
        { n:right, label:t('fbRight'), kind:'good' },
        { n:wrong, label:t('fbWrong'), kind:'bad' }
      ],
      note: t('doneLede', { n:total }),
      reviews: [{
        head: t('fbMissedHead'),
        tone: 'missed',
        items: state.missed.map(function(m){
          return {
            n: m.sentence.img,
            de: m.answer,
            gloss: m.sentence.de,
            flag: lang !== 'de' ? (m.sentence[lang] || '') : ''
          };
        }),
        onTap: function(item){ GH.speech.say(item.gloss); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            state.rounds = buildRounds(state.sentences, state.ordered);
            state.missed = [];
            goTo(0);
          } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  /* ---------- answering ---------- */

  function solve(){
    state.solved = true;
    paint();
    speakSentence();
  }

  function showFeedback(){
    var fb = host.querySelector('.feedback');
    if (fb){
      fb.textContent = state.feedback;
      fb.className = 'feedback ' + state.feedbackKind;
    }
  }

  function reportRound(r, ok){
    if (!GH.tutor) return;
    var cat = (r.sentence && r.sentence.cat) || state.cat;
    if (cat) GH.tutor.grade('topic:' + cat, ok);
    if (r.sentence && r.sentence.img) GH.tutor.grade('word:' + r.sentence.img, ok);
    GH.tutor.grade('skill:cloze', ok);
  }

  /* The shared run holds the once-per-item guard, the streak and the
     percentage. The round index is the item id. */
  function tally(ok){ state.run.saw('r' + state.i, ok); }

  function pickOption(word, btn){
    var r = round();
    if (word === r.answer){
      tally(!state.missedHere);
      reportRound(r, !state.missedHere);
      state.feedback = t('right');
      state.feedbackKind = 'right';
      btn.classList.add('is-right');
      solve();
      return;
    }
    state.ruledOut[GH.text.normalize(word)] = true;
    /* only the first wrong answer on a round counts against her — the
       retries after it are her working it out, not fresh mistakes */
    if (!state.missedHere){
      state.missedHere = true;
      tally(false);
      state.missed.push({ answer:r.answer, sentence:r.sentence });
      reportRound(r, false);
    }
    state.feedback = t('wrong');
    state.feedbackKind = 'wrong';
    btn.classList.add('is-wrong');
    btn.disabled = true;
    showFeedback();
  }

  function checkTyped(value){
    var r = round();
    var verdict = GH.text.compare(value, r.answer);
    if (verdict === 'exact' || verdict === 'close'){
      /* a near-miss on spelling still counts as knowing the word */
      tally(!state.missedHere);
      reportRound(r, !state.missedHere);
      state.feedback = verdict === 'exact' ? t('right') : t('closeSpelling', { word:r.answer });
      state.feedbackKind = verdict === 'exact' ? 'right' : 'close';
      solve();
    } else {
      if (!state.missedHere){
        state.missedHere = true;
        tally(false);
        state.missed.push({ answer:r.answer, sentence:r.sentence });
        reportRound(r, false);
      }
      state.feedback = t('wrong');
      state.feedbackKind = 'wrong';
      showFeedback();
    }
  }

  function reveal(){
    var r = round();
    state.feedback = t('answerWas', { word:r.answer });
    state.feedbackKind = 'close';
    solve();
  }

  /* ---------- entry ---------- */

  function goTo(i){
    state.i = i;
    state.solved = false;
    state.feedback = '';
    state.feedbackKind = '';
    state.typed = '';
    state.ruledOut = {};
    state.missedHere = false;   /* fresh round, fresh slate for scoring */
    paint();
    if (state.i < state.rounds.length && autoOn()) speakSentence();
  }

  function mount(container, config){
    host = container;
    state = {
      title:config.title,
      subtitle:config.subtitle || '',
      cat:config.cat || null,
      sentences:config.sentences,
      ordered:!!config.ordered,
      rounds:buildRounds(config.sentences, !!config.ordered),
      i:0,
      setStart:0,
      run:GH.run.create(),
      missed:[],
      mode:'choose',
      solved:false,
      feedback:'',
      feedbackKind:'',
      typed:'',
      ruledOut:{},
      onExit:config.onExit
    };
    GH.app.redraw = paint;
    goTo(0);
  }

  return { mount:mount };
})();
