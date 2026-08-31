/* Welche Form? — a person and a verb are shown, she picks the right form.

   The table is the correction, not the lesson. She guesses first, and only
   a wrong answer opens the full six-form table with the right one lit up —
   so the table arrives at the moment she wants it rather than as something
   to memorise up front.

   Either way the sentence is spoken, because hearing 'du fährst' after
   choosing it is what makes the shift stick.

   Levels follow what actually has to be learned, not textbook labels:
   regular first, then sein and haben which cannot wait because they are
   everywhere, then the vowel shifts grouped by which vowel moves, because
   within a group they behave identically. */

window.GH = window.GH || {};

GH.conjGame = (function(){

  var LEVELS = [
    /* Sentence levels: sein and haben only, because those are the two that
       carry sentences today. The drill levels below need no sentences and
       cover every verb in the vocabulary. */
    { id:'s1', key:'cgS1', hearts:5, sentences:'1' },
    { id:'s2', key:'cgS2', hearts:4, sentences:'2' },
    { id:'s3', key:'cgS3', hearts:3, sentences:'3' },
    { id:'regular',  key:'cgRegular',  hearts:5, pick:function(v){ return GH.conjugate.kind(v) === 'regular'; } },
    { id:'core',     key:'cgCore',     hearts:4, list:['sein', 'haben', 'werden', 'wissen'] },
    { id:'modals',   key:'cgModals',   hearts:4, list:['können', 'müssen', 'wollen', 'sollen', 'dürfen', 'mögen'] },
    { id:'shift',    key:'cgShift',    hearts:3, pick:function(v){ var k = GH.conjugate.kind(v); return k !== 'regular' && k !== 'irregular'; } },
    { id:'mixed',    key:'cgMixed',    hearts:3, pick:function(){ return true; } }
  ];

  var ROUNDS = 12;

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* Verbs the vocabulary already teaches, so she is never asked to
     conjugate a word she has not met. */
  function vocabVerbs(){
    var out = {};
    (GH.packs.vocab()).forEach(function(v){
      var parts = v.de.split(/\s+/);
      var last = parts[parts.length - 1];
      /* 'sieben', 'trocken' and 'zufrieden' end in -en without being verbs,
         and the game must not offer to conjugate them */
      if (/^[a-zäöüß]/.test(last) && /(en|ern|eln)$/.test(last) && last.length > 3
          && GH.conjugate.isVerb(last)){
        out[last] = v;                      /* keep one entry per verb */
      }
    });
    return out;
  }

  function sentencePool(level){
    var bank = window.GH_CONJ_SENTENCES || {};
    var out = [];
    Object.keys(bank).forEach(function(verb){
      (bank[verb][level.sentences] || []).forEach(function(row){
        out.push({ verb:verb, p:row.p, de:row.de, both:!!row.both });
      });
    });
    return out;
  }

  function poolFor(level){
    if (level.sentences) return sentencePool(level);
    var known = vocabVerbs();
    var names = Object.keys(known);
    if (level.list){
      /* sein, haben and the modals are not vocabulary entries yet, so they
         come from the conjugator's own tables */
      return level.list.slice();
    }
    return names.filter(level.pick);
  }

  function build(level){
    var pool = GH.text.shuffle(poolFor(level));
    if (!pool.length) return [];

    if (level.sentences){
      var order = GH.conjugate.people.map(function(x){ return x.id; });
      return pool.slice(0, ROUNDS).map(function(row){
        var forms = GH.conjugate.forms(row.verb);
        var person = order.indexOf(row.p);
        return { verb:row.verb, person:person, forms:forms, sentence:row.de,
                 both:row.both, answered:false, correct:false, chosen:null };
      });
    }

    var items = [];
    for (var i = 0; i < ROUNDS; i++){
      var verb = pool[i % pool.length];
      var forms = GH.conjugate.forms(verb);
      var people = GH.conjugate.people;
      /* weight du and ihr up: they are the forms she will otherwise never
         be asked about, since the sentence bank has almost none */
      var weights = [1, 3, 2, 1, 3, 1];
      var bag = [];
      weights.forEach(function(w, k){ for (var j = 0; j < w; j++) bag.push(k); });
      var p = bag[Math.floor(Math.random() * bag.length)];
      items.push({ verb:verb, person:p, forms:forms, answered:false, correct:false, chosen:null });
    }
    return items;
  }

  function current(){ return state.items[state.i] || null; }

  /* Buttons are the distinct forms of this verb. Showing all six would mean
     picking between two identical strings, since wir and sie/Sie always
     match — the duplication is worth teaching, but not worth guessing at. */
  function choicesFor(it){
    var seen = {}, out = [];
    it.forms.forEach(function(f){ if (!seen[f]){ seen[f] = true; out.push(f); } });
    return GH.text.shuffle(out);
  }

  function say(it){
    if (it.sentence){
      GH.speech.say(it.sentence.replace('___', it.forms[it.person]));
      return;
    }
    var p = GH.conjugate.people[it.person];
    var pron = p.id === 'er' ? 'sie' : (p.id === 'sie' ? 'sie' : p.de);
    var pre = GH.conjugate.prefix(it.verb);
    GH.speech.say(pron + ' ' + it.forms[it.person] + (pre ? ' ' + pre : ''));
  }

  function choose(form){
    var it = current();
    if (!it || it.answered) return;
    it.answered = true;
    it.chosen = form;
    /* 'Sie ___ müde' is she, they, or formal you — all three are correct
       German, so any of those forms is accepted. */
    it.correct = it.both
      ? (form === it.forms[2] || form === it.forms[5])
      : form === it.forms[it.person];
    if (it.correct) state.score++; else state.hearts--;
    /* the shared run: streak, percentage, and what to say about it */
    state.run.saw('cg:' + state.i, it.correct);
    /* the verb, and separately the person — she can be fine on sein and
       still miss ihr every time */
    if (GH.tutor){
      GH.tutor.grade('conj:' + it.verb, it.correct);
      /* the class, so the tutor can tell a person who cannot do vowel
         shifts from one who cannot do irregulars */
      var kind = GH.conjugate.prefix(it.verb) ? 'separable'
               : (GH.conjugate.irregulars[it.verb] ? 'irregular' : GH.conjugate.kind(it.verb));
      GH.tutor.grade('verbkind:' + kind, it.correct);
      GH.tutor.grade('skill:conjugation', it.correct);
      GH.tutor.grade('person:' + GH.conjugate.people[it.person].id, it.correct);
    }
    paint();
    say(it);
    if (state.hearts <= 0) { state.phase = 'done'; setTimeout(paint, 900); }
  }

  function next(){
    state.i++;
    if (state.i >= state.items.length) state.phase = 'done';
    paint();
  }

  /* ---------- painting ---------- */

  function heartRow(){
    var wrap = el('span', 'cw-hearts');
    for (var i = 0; i < state.level.hearts; i++){
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 20 20');
      svg.setAttribute('class', 'cw-heart' + (i < state.hearts ? '' : ' spent'));
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M10 17.5s-6.5-4.03-8.5-7.86C.36 7.4 1.2 4.4 4 3.4c1.9-.68 3.9.1 5 1.7 1.1-1.6 3.1-2.38 5-1.7 2.8 1 3.64 4 2.5 6.24C16.5 13.47 10 17.5 10 17.5z');
      svg.appendChild(path);
      wrap.appendChild(svg);
    }
    return wrap;
  }

  /* The full paradigm, with the asked form lit. Shown only after a wrong
     answer, and on the end screen. */
  /* the shared table, so the grammar section and this game cannot drift */
  function table(it, highlight){
    return GH.verbTable.render(it.verb, { highlight:highlight });
  }


  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('cgTitle')));
    titles.appendChild(el('p', null, state.phase === 'pick' ? t('cgPickLevel') : t(state.level.key)));
    head.appendChild(titles);
    if (state.run) head.appendChild(GH.run.header(state.run));

    if (state.phase === 'play'){
      var prog = el('div', 'progress');
      var meter = el('div', 'meter');
      var bar = el('div', 'bar');
      bar.style.width = Math.round((state.i / state.items.length) * 100) + '%';
      meter.appendChild(bar);
      prog.appendChild(meter);
      prog.appendChild(el('span', 'progress-label',
        t('roundOf', { i:state.i + 1, n:state.items.length })));
      head.appendChild(prog);
    }
    host.appendChild(head);

    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    var it = current();
    if (!it){ state.phase = 'done'; paint(); return; }

    var card = el('div', 'card');

    var status = el('div', 'cw-status');
    status.appendChild(heartRow());
    status.appendChild(el('span', 'cw-score', t('cwScore', { n:state.score })));
    card.appendChild(status);

    var p = GH.conjugate.people[it.person];
    var lang = GH.i18n.lang();

    if (it.sentence){
      var line = el('p', 'cg-sentence');
      var bits = it.sentence.split('___');
      line.appendChild(document.createTextNode(bits[0]));
      line.appendChild(el('span', 'cg-gap', it.answered ? it.forms[it.person] : '\u2003\u2003'));
      line.appendChild(document.createTextNode(bits[1] || ''));
      card.appendChild(line);
      card.appendChild(el('p', 'cg-which', it.verb));
    } else {
      var q = el('div', 'cg-prompt');
      q.appendChild(el('span', 'cg-person', p.de));
      if (lang !== 'de') q.appendChild(el('span', 'cg-person-gloss', p[lang] || p.en));
      q.appendChild(el('span', 'cg-plus', '+'));
      q.appendChild(el('span', 'cg-verb', it.verb));
      card.appendChild(q);
    }

    if (!it.answered){
      if (!it.choices) it.choices = choicesFor(it);
      var opts = el('div', 'options');
      it.choices.forEach(function(f){
        var b = el('button', 'option', f);
        b.type = 'button';
        b.addEventListener('click', function(){ choose(f); });
        opts.appendChild(b);
      });
      card.appendChild(opts);
    } else {
      /* the shared acknowledgement — says more when the streak is
         worth mentioning, and nothing extra when it is not */
      var ack = GH.run.note(state.run);
      if (ack) card.appendChild(ack);
      if (it.sentence){
        if (it.both){
          /* show both readings — the point of these is that German does not
             distinguish them here */
          var alt = el('div', 'cg-both');
          alt.appendChild(el('p', 'cg-both-head', t('cgBothHead')));
          [2, 5].forEach(function(k){
            var r = el('p', 'cg-both-row');
            r.appendChild(el('span', 'cg-form', it.sentence.replace('___', it.forms[k])));
            r.appendChild(el('span', 'cg-gloss', GH.conjugate.people[k][lang] || GH.conjugate.people[k].en));
            alt.appendChild(r);
          });
          card.appendChild(alt);
        }
      } else {
        card.appendChild(el('p', 'sentence cg-answer', p.de + ' ' + it.forms[it.person]));
      }
      /* the table only opens when she got it wrong */
      if (!it.correct) card.appendChild(table(it, it.person));
      var nx = el('button', 'btn btn-primary js-advance', t('next'));
      nx.type = 'button';
      nx.addEventListener('click', next);
      var acts = el('div', 'done-actions');
      var hear = el('button', 'btn btn-ghost', '🔊 ' + t('again'));
      hear.type = 'button';
      hear.addEventListener('click', function(){ say(it); });
      acts.appendChild(nx); acts.appendChild(hear);
      card.appendChild(acts);
    }
    host.appendChild(card);
    if (it.answered) GH.nav.ready();
  }

  function paintLevels(){
    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('cgTitle', 'cgRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var n = poolFor(lv).length;
      var b = el('button', 'tile');
      b.type = 'button';
      b.disabled = !n;
      b.appendChild(el('span', 'tile-glyph', '🔀'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub',
        lv.sentences ? t('cgSentencesN', { n:n }) : t('cgVerbsN', { n:n })));
      b.appendChild(el('span', 'tile-foot', t('cwHeartsN', { n:lv.hearts })));
      b.addEventListener('click', function(){
        state.level = lv;
        /* Which level this round is, so accuracy can be read per level. */
        if (GH.events && GH.events.setLevel) GH.events.setLevel(lv && lv.id);
        state.items = build(lv);
        state.i = 0; state.score = 0; state.hearts = lv.hearts;
        state.run = GH.run.create();
        state.phase = 'play';
        paint();
      });
      grid.appendChild(b);
    });
    host.appendChild(grid);
    host.appendChild(el('p', 'cw-rules', t('cgRules')));
  }

  function paintDone(){
    var lost = state.hearts <= 0;
    var perfect = !lost && state.score === state.items.length;
    var missed = state.items.filter(function(x){ return x.answered && !x.correct; });

    /* the full paradigm for every verb she got wrong, which is the point of
       this game's ending — a list of words would teach nothing */
    var tables = null;
    if (missed.length){
      tables = document.createElement('div');
      var seen = {};
      missed.forEach(function(it){
        if (seen[it.verb]) return;
        seen[it.verb] = true;
        tables.appendChild(table(it, it.person));
      });
    }

    /* pay for the round before drawing the screen that reports it */

    var paid = GH.coins ? GH.coins.award('conjugate', state.run,

      { record: !!state.newBest }) : null;
      /* and anything newly true — checked after the round is counted */
      var won = GH.awards ? GH.awards.afterRound('conjugate', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: perfect ? 'perfect' : (lost ? 'lost' : 'done'),
      glyph: perfect ? '🏆' : (lost ? '💔' : '🔀'),
      title: perfect ? t('cwPerfect') : (lost ? t('cwOut') : t('doneTitle')),
      stats: [
        { n:state.score, label:t('fbRight'), kind:'good' },
        { n:state.items.length - state.score, label:t('fbWrong'), kind:'bad' }
      ],
      extra: tables,
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            state.items = build(state.level);
            state.i = 0; state.score = 0; state.hearts = state.level.hearts;
            state.run = GH.run.create();
            state.phase = 'play'; paint();
          } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', level:LEVELS[0], items:[], i:0, score:0, hearts:0,
              run:GH.run.create() };
    paint();
  }

  /* Its own level ids, read off its own LEVELS array. Declared here rather
     than typed into the entry below, so the two cannot drift apart — the
     tutor picks a level by id, and a stale list means it picks one that
     does not exist. */
  return { open:open, levels:LEVELS.map(function(l){ return l.id; }) };
})();

(function(){
  var entry = {
    id:'conjugate',
    glyph:'🔀',
    name:{ ru:'Какая форма?', de:'Welche Form?', en:'Which form?' },
    sub:{ ru:'Спряжение: подбери форму к лицу',
          de:'Konjugation: die Form zur Person',
          en:'Conjugation: match the form to the person' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'cgRule', rulesTitle:'cgTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which areas
       a round here actually grades. `skill:` is omitted — every game
       writes one, so it separates nothing. */
    levels:GH.conjGame.levels,
    teaches:['conj', 'person', 'verbkind'],
    open:GH.conjGame.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
