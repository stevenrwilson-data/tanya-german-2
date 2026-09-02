/* Wo ist das? — the placement game.

   Pictures arranged on a board, and a sentence about where something is or
   should go. Two things to do with that sentence, and they are different
   grammar:

     find   Klicke auf das Objekt links vom Hund.
            Nothing moves, so the preposition takes the dative.

     move   Lege die Katze neben den Hund.
            Something travels, so the same preposition takes the accusative.

   That is the whole Wo/Wohin distinction, and this is the first place in
   the app where she feels it rather than picking an article from four
   buttons. The grammar follows from what she is being asked to do, which
   is the only way a case system ever becomes instinct.

   Three modes rather than a toggle, because mixed is genuinely harder than
   either alone. On its own, each mode has one consistent case and she will
   stop reading the sentence after four rounds. Mixed, the verb is the only
   signal — ist against lege — and noticing that is the reflex worth
   building.

   Tap to pick, tap to place. Not drag: a dropped drag on a small target on
   a scrolling page is indistinguishable from a wrong answer, and the point
   is to measure whether she understood the preposition.

   One asymmetry worth knowing, which the game exposes for free: links von
   and rechts von are always dative, because von is a fixed-case
   preposition. So left and right never take the accusative while hinter,
   über, unter, neben and zwischen do. Nothing else in the app shows her
   that. */

window.GH = window.GH || {};

GH.placement = (function(){

  var LEVELS = [
    { id:'find',  key:'plFind',  mode:'find', rounds:10, hearts:4 },
    { id:'move',  key:'plMove',  mode:'move', rounds:10, hearts:4 },
    { id:'mixed', key:'plMixed', mode:'both', rounds:14, hearts:3 }
  ];

  /* The relations, and what each one does to the grammar.

     dat / akk hold the article for a masculine noun, which is the only
     gender where the two differ visibly — so that is where the case shows.
     `fixedDat` marks the ones built on von, which never take accusative. */
  var REL = [
    { id:'left',   grid:true,  fixedDat:true,
      de:'links von', ru:'слева от', en:'to the left of' },
    { id:'right',  grid:true,  fixedDat:true,
      de:'rechts von', ru:'справа от', en:'to the right of' },
    { id:'above',  grid:true,
      de:'über', ru:'над', en:'above' },
    { id:'below',  grid:true,
      de:'unter', ru:'под', en:'below' },
    { id:'behind', overlap:true,
      de:'hinter', ru:'за', en:'behind' },
    { id:'front',  overlap:true,
      de:'vor', ru:'перед', en:'in front of' },
    { id:'beside', grid:true,
      de:'neben', ru:'рядом с', en:'next to' },
    { id:'between', grid:true, three:true,
      de:'zwischen', ru:'между', en:'between' }
  ];

  /* Verbs, which change with the mode. Static takes liegt and ist; moving
     takes lege and stelle — the liegen/legen pair from the two-way lesson,
     unavoidable here rather than a footnote. */
  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function nouns(){
    return (window.GH_POSITION_NOUNS || []).filter(function(x){ return x.n; });
  }

  function pick(list){ return list[Math.floor(Math.random() * list.length)]; }

  function shuffle(a){ return GH.text.shuffle(a.slice()); }

  /* ---------- building a round ---------- */

  /* The article a preposition needs, for the noun given.

     Dative: dem / der / dem. Accusative: den / die / das. Only the
     masculine differs, which is why the masculine nouns are where the case
     is actually being tested. */
  function article(noun, acc){
    var a = noun.de.split(' ')[0];
    if (acc) return a === 'der' ? 'den' : a;
    return a === 'der' ? 'dem' : a === 'die' ? 'der' : 'dem';
  }

  function bare(noun){ return noun.de.split(' ').slice(1).join(' '); }

  /* der Bär becomes dem Bären in the dative — the weak masculines. */
  function nounIn(noun, acc){
    if (!acc && noun.dat) return noun.dat;
    return bare(noun);
  }

  /* links von dem Hund contracts to links vom Hund, which is mandatory
     rather than a preference. */
  function phrase(rel, noun, acc){
    var art = article(noun, acc);
    var word = nounIn(noun, acc);
    if (rel.fixedDat){
      /* von is always dative, whatever the mode */
      var d = article(noun, false);
      var joined = d === 'dem' ? 'vom' : d === 'der' ? 'von der' : 'vom';
      return rel.de.replace(' von', '') + ' ' + joined + ' ' + nounIn(noun, false);
    }
    return rel.de + ' ' + art + ' ' + word;
  }

  function askText(rel, target, mover, mode){
    var lang = GH.i18n.askLang();
    if (lang === 'en'){
      var rl = rel.en;
      if (mode === 'move'){
        return 'Put the ' + mover.en + ' ' + rl + ' the ' + target.en + '.';
      }
      return 'Click the one ' + rl + ' the ' + target.en + '.';
    }
    if (mode === 'move'){
      return 'Lege ' + article(mover, true) + ' ' + bare(mover) + ' ' +
             phrase(rel, target, true) + '.';
    }
    return 'Klicke auf das Objekt ' + phrase(rel, target, false) + '.';
  }

  /* A find round: a filled board and one right answer. */
  function findRound(rel){
    var pool = shuffle(nouns());
    var cells = rel.overlap ? 3 : 4;
    var used = pool.slice(0, cells);

    /* positions are indexes into a 2x2 grid, or a left-to-right stack */
    var target, answer;
    if (rel.overlap){
      /* 0 is furthest back, 2 nearest the front */
      var at = 1;
      target = used[at];
      answer = used[rel.id === 'behind' ? at - 1 : at + 1];
    } else if (rel.id === 'between'){
      target = null;
      answer = used[1];
    } else {
      /* grid: 0 1 / 2 3 */
      var spot = { left:1, right:0, above:2, below:0, beside:0 };
      var ans  = { left:0, right:1, above:0, below:2, beside:1 };
      target = used[spot[rel.id]];
      answer = used[ans[rel.id]];
    }

    return {
      mode:'find', rel:rel, board:used, overlap:!!rel.overlap,
      target:target, answer:answer,
      ask: rel.id === 'between'
        ? betweenAsk(used)
        : askText(rel, target, null, 'find')
    };
  }

  function betweenAsk(used){
    var lang = GH.i18n.askLang();
    if (lang === 'en'){
      return 'Click the one between the ' + used[0].en + ' and the ' + used[2].en + '.';
    }
    return 'Klicke auf das Objekt zwischen ' + article(used[0], false) + ' ' +
      nounIn(used[0], false) + ' und ' + article(used[2], false) + ' ' +
      nounIn(used[2], false) + '.';
  }

  /* A move round: a board with several empty slots, and one card in hand.

     There must always be more than one slot. My first version left a
     single gap, which meant the only tappable thing was the right answer
     and the round could not be got wrong — it measured nothing at all.

     So: four positions, two of them filled, two empty. The preposition is
     what tells her which empty one. */
  function moveRound(rel){
    var pool = shuffle(nouns());
    var three = rel.id === 'between';

    if (three){
      /* Two anchors with a space between them, and a decoy slot outside
         the pair. Which end the pair sits at varies, so the middle is not
         always cell 1. */
      var m = pool[0], a = pool[1], b = pool[2];
      var atLeft = Math.random() < 0.5;
      var f = {}, gap;
      if (atLeft){ f[0] = a; f[2] = b; gap = 1; }
      else       { f[1] = a; f[3] = b; gap = 2; }
      return {
        mode:'move', rel:rel, overlap:false, slots:4, gap:gap,
        filled:f, mover:m, target:a,
        ask: betweenMoveAsk(m, [a, b])
      };
    }

    if (rel.overlap){
      /* three depths, the middle filled, front and back both open */
      var anchor = pool[1];
      return {
        mode:'move', rel:rel, overlap:true, slots:3,
        gap: rel.id === 'behind' ? 0 : 2,
        filled:{ 1:anchor }, mover:pool[0], target:anchor,
        ask: askText(rel, anchor, pool[0], 'move')
      };
    }

    /* A two-by-two grid, cells numbered 0 1 across the top and 2 3 below.

       The anchor goes in a randomly chosen cell that the relation can
       actually be satisfied from — "to the left of" needs the anchor in the
       right-hand column, or there is no cell to its left. Then the gap
       follows from the anchor.

       Randomising matters more than it looks. My first version put the
       anchor in a fixed cell per relation, which meant the answer was
       almost always the lowest-numbered empty slot — so tapping the first
       slot every time scored nine out of ten. The round was measuring
       nothing. */
    var CAN = {
      left:   [[1,0],[3,2]],
      right:  [[0,1],[2,3]],
      above:  [[2,0],[3,1]],
      below:  [[0,2],[1,3]],
      beside: [[0,1],[1,0],[2,3],[3,2]]
    };
    var opts = CAN[rel.id] || CAN.beside;
    var choice = opts[Math.floor(Math.random() * opts.length)];
    var an = choice[0], gp = choice[1];

    var anch = pool[1];
    var filled = {};
    filled[an] = anch;
    /* a decoy in a cell that does not answer the question, so two slots
       remain open and neither is obviously the one */
    var free = [0,1,2,3].filter(function(i){ return i !== an && i !== gp; });
    if (free.length){
      filled[free[Math.floor(Math.random() * free.length)]] = pool[2];
    }

    return {
      mode:'move', rel:rel, overlap:false, slots:4, gap:gp,
      filled:filled, mover:pool[0], target:anch,
      ask: askText(rel, anch, pool[0], 'move')
    };
  }

  function betweenMoveAsk(mover, placed){
    var lang = GH.i18n.askLang();
    if (lang === 'en'){
      return 'Put the ' + mover.en + ' between the ' + placed[0].en +
             ' and the ' + placed[1].en + '.';
    }
    return 'Lege ' + article(mover, true) + ' ' + bare(mover) + ' zwischen ' +
      article(placed[0], true) + ' ' + bare(placed[0]) + ' und ' +
      article(placed[1], true) + ' ' + bare(placed[1]) + '.';
  }

  function build(level){
    var out = [];
    for (var i = 0; i < level.rounds; i++){
      var mode = level.mode === 'both'
        ? (Math.random() < 0.5 ? 'find' : 'move')
        : level.mode;
      /* between needs three cards and reads badly in a 2x2, so it only
         appears in its own shape */
      var pool = REL.filter(function(r){
        if (mode === 'move' && r.fixedDat) return true;
        return true;
      });
      var rel = pick(pool);
      out.push(mode === 'find' ? findRound(rel) : moveRound(rel));
    }
    return out;
  }

  /* ---------- playing ---------- */

  function current(){ return state.items[state.i]; }

  function answerFind(noun){
    var it = current();
    if (it.done) return;
    it.done = true;
    it.correct = noun.n === it.answer.n;
    it.chose = noun;
    grade(it);
    paint();
  }

  function answerMove(slot){
    var it = current();
    if (it.done) return;
    it.done = true;
    it.correct = slot === it.gap;
    it.chose = slot;
    grade(it);
    paint();
  }

  function grade(it){
    if (it.correct) state.score++;
    else { state.hearts--; state.missed.push(it); }
    if (state.run) state.run.saw('pl:' + state.i, it.correct);
    if (GH.tutor){
      /* WHAT SHE CHOSE. In find mode `it.chose` is the noun she picked, so
         the log gets the word she confused with the right one. In move mode
         it is the slot index — which says whether she put it on the wrong
         side or in the wrong place entirely, and those are different
         misreadings of the same preposition. */
      var pk;
      if (it.chose === undefined || it.chose === null) pk = '';
      else if (it.mode === 'find') pk = 'word:' + (it.chose.n === undefined ? '?' : it.chose.n);
      else pk = 'slot:' + it.chose;

      GH.tutor.grade('skill:placement', it.correct, null, pk);
      GH.tutor.grade('prep:' + it.rel.id, it.correct, null, pk);
      /* the two modes are different grammar and fail independently */
      GH.tutor.grade(it.mode === 'find' ? 'case:wo' : 'case:wohin', it.correct, null, pk);
      if (it.target) GH.tutor.grade('word:' + it.target.n, it.correct, null, pk);
    }
  }

  /* ---------- painting ---------- */

  function pic(noun, cls, onTap){
    var b = el('button', 'pl-card' + (cls ? ' ' + cls : ''));
    b.type = 'button';
    if (GH.sprite) b.appendChild(GH.sprite.tile(noun.n));
    b.appendChild(el('span', 'pl-card-name', noun.de));
    if (onTap) b.addEventListener('click', function(){ onTap(noun); });
    else b.disabled = true;
    return b;
  }

  function emptySlot(i, onTap, label){
    var b = el('button', 'pl-slot');
    b.type = 'button';
    b.appendChild(el('span', 'pl-slot-mark', label || '?'));
    b.addEventListener('click', function(){ onTap(i); });
    return b;
  }

  function boardFind(it){
    var wrap = el('div', it.overlap ? 'pl-stack' : 'pl-grid');
    it.board.forEach(function(nn, i){
      var cls = '';
      if (it.done){
        if (nn.n === it.answer.n) cls = 'is-right';
        else if (it.chose && nn.n === it.chose.n) cls = 'is-wrong';
      }
      if (it.target && nn.n === it.target.n) cls += ' is-anchor';
      if (it.overlap) cls += ' pl-depth-' + i;
      wrap.appendChild(pic(nn, cls, it.done ? null : answerFind));
    });
    return wrap;
  }

  function boardMove(it){
    var wrap = el('div', it.overlap ? 'pl-stack' : 'pl-grid');
    for (var i = 0; i < it.slots; i++){
      var depth = it.overlap ? ' pl-depth-' + i : '';
      var here = it.filled[i];
      if (here){
        var c = (it.target && here.n === it.target.n) ? 'is-anchor' : '';
        wrap.appendChild(pic(here, c + depth, null));
      } else if (it.done && i === it.gap){
        wrap.appendChild(pic(it.mover, (it.correct ? 'is-right' : 'is-right') + depth, null));
      } else if (it.done && it.chose === i){
        wrap.appendChild(pic(it.mover, 'is-wrong' + depth, null));
      } else if (it.done){
        wrap.appendChild(el('div', 'pl-slot is-past' + depth));
      } else {
        wrap.appendChild(emptySlot(i, answerMove));
      }
    }
    return wrap;
  }

  function hand(it){
    var row = el('div', 'pl-hand');
    row.appendChild(el('span', 'pl-hand-l', t('plInHand')));
    row.appendChild(pic(it.mover, 'is-held', null));
    return row;
  }

  function hearts(){
    var row = el('div', 'cw-hearts');
    for (var i = 0; i < state.hearts; i++) row.appendChild(el('span', 'heart', '\u2665'));
    return row;
  }

  function paint(){
    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('plTitle')));
    titles.appendChild(el('p', null, t(state.level.key)));
    head.appendChild(titles);
    var prog = el('div', 'progress');
    var track = el('span', 'progress-track');
    var fill = el('span', 'progress-fill');
    fill.style.width = Math.round((state.i / state.items.length) * 100) + '%';
    track.appendChild(fill);
    prog.appendChild(track);
    prog.appendChild(el('span', null, t('progress', { i:state.i + 1, n:state.items.length })));
    head.appendChild(prog);
    if (state.run) head.appendChild(GH.run.header(state.run));
    host.appendChild(head);

    var it = current();
    if (!it){ finish(); return; }

    var card = el('div', 'card');
    card.appendChild(hearts());

    /* the sentence, and a way to hear it */
    var ask = el('div', 'pl-ask');
    ask.appendChild(el('span', 'pl-ask-de', it.ask));
    if (!GH.i18n.devEnglish()){
      var sp = el('button', 'speak');
      sp.type = 'button';
      sp.appendChild(el('span', 'speak-icon', '\ud83d\udd0a'));
      sp.addEventListener('click', function(){ GH.speech.say(it.ask); });
      ask.appendChild(sp);
    }
    card.appendChild(ask);

    if (it.mode === 'move' && !it.done) card.appendChild(hand(it));

    card.appendChild(it.mode === 'find' ? boardFind(it) : boardMove(it));

    if (it.done){
      var v = el('div', 'ls-verdict' + (it.correct ? ' is-right' : ' is-wrong'));
      v.appendChild(el('span', 'ls-verdict-mark', it.correct ? '\u2713' : '\u2717'));
      var body = el('span', 'ls-verdict-body');
      body.appendChild(el('span', 'ls-verdict-main',
        it.correct ? t('correct') : t('notQuite')));
      body.appendChild(el('span', 'ls-verdict-sub', why(it)));
      v.appendChild(body);
      card.appendChild(v);

      var foot = el('div', 'card-foot');
      foot.appendChild(el('span', 'spacer'));
      var next = el('button', 'btn btn-primary js-advance',
        state.i === state.items.length - 1 ? t('finish') : t('next'));
      next.type = 'button';
      next.addEventListener('click', function(){
        if (state.hearts <= 0){ finish(); return; }
        state.i++;
        if (state.i >= state.items.length) finish(); else paint();
      });
      foot.appendChild(next);
      card.appendChild(foot);
    }

    host.appendChild(card);

    /* The question is on screen now, so time from here. Only when it is
       still unanswered — a repaint showing the verdict is not a new
       question, and marking it would measure how long she looked at the
       answer. */
    if (!it.done && GH.events && GH.events.shown) GH.events.shown();
    GH.nav.ready();
  }

  /* Why it was right, naming the case — since that is the thing being
     taught and it is invisible otherwise. */
  function why(it){
    var lang = GH.i18n.lang();
    var rel = it.rel;
    var name = rel[lang] || rel.en;
    if (rel.fixedDat) return t('plWhyVon', { p:name });
    return it.mode === 'find'
      ? t('plWhyWo', { p:name })
      : t('plWhyWohin', { p:name });
  }

  function paintLevels(){
    host.textContent = '';
    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('plTitle')));
    titles.appendChild(el('p', null, t('cgPickLevel')));
    head.appendChild(titles);
    host.appendChild(head);

    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('plTitle', 'plRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var b = el('button', 'tile');
      b.type = 'button';
      b.appendChild(el('span', 'tile-glyph',
        lv.mode === 'find' ? '\ud83d\udc46' : lv.mode === 'move' ? '\u27a1\ufe0f' : '\ud83d\udd00'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', t(lv.key + 'Sub')));
      b.appendChild(el('span', 'tile-foot', lv.rounds + ' \u00b7 ' + lv.hearts + ' \u2665'));
      b.addEventListener('click', function(){ begin(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function finish(){
    state.phase = 'done';
    paint();
  }

  function paintDone(){
    host.textContent = '';
    var paid = GH.coins ? GH.coins.award('placement', state.run, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('placement', state.run) : [];

    var items = state.missed.map(function(m){
      return {
        de: m.ask,
        gloss: m.mode === 'find' ? t('plWasWo') : t('plWasWohin'),
        speak: m.ask
      };
    });

    GH.endScreen.render(host, {
      tone: state.hearts <= 0 ? 'lost' : (state.missed.length ? 'done' : 'perfect'),
      glyph: state.hearts <= 0 ? '\ud83d\udca7' : (state.missed.length ? '\u2713' : '\ud83c\udf1f'),
      title: state.hearts <= 0 ? t('outOfHearts') : t('doneTitle'),
      stats: GH.run.stats(state.run),
      coins: paid,
      awards: won,
      reviews: items.length ? [{
        head: t('plMissedHead'),
        tone: 'missed',
        items: items,
        onTap: function(x){ GH.speech.say(x.speak); }
      }] : [],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.level); } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function begin(level){
    state.level = level;
    /* Which level this round is, so accuracy can be read per level. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.items = build(level);
    state.i = 0;
    state.score = 0;
    state.hearts = level.hearts;
    state.missed = [];
    state.run = GH.run.create();
    state.phase = 'play';
    paint();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', level:LEVELS[0],
              items:[], i:0, score:0, hearts:0, missed:[], run:null };
    paint();
  }

  /* Its own level ids, read off its own LEVELS array. Declared here
     rather than typed into the entry below, so the two cannot drift
     apart — the tutor picks a level by id and a stale list means it
     picks one that does not exist. */
  return { open:open, levels:LEVELS.map(function(l){ return l.id; }) };
})();

(function(){
  var entry = {
    id:'placement',
    glyph:'\ud83e\udded',
    name:{ ru:'Где что стоит', de:'Wo steht was', en:'Where things are' },
    sub:{ ru:'Найди по описанию или поставь на место',
          de:'Finden oder hinstellen',
          en:'Find it, or put it there' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'plRule', rulesTitle:'plTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.placement.levels,
    teaches:['prep', 'word'],
    open:GH.placement.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
