/* Где или куда? · Wo oder wohin? · Where or where to?

   Nine German prepositions take either case, and the choice turns on one
   thing: is something somewhere, or is it going there.

     Die Katze ist auf dem Tisch.      position  ->  dative
     Die Katze springt auf den Tisch.  motion    ->  accusative

   Russian makes the same split — где against куда — so the concept
   transfers and only the machinery is new. That is unusual here and worth
   leaning on: most of German's case system has no Russian counterpart, and
   this one does.

   The levels separate the two halves of the problem. First the concept,
   with no article to choose: is this where, or where to. Only then the
   form. Asking for the article before she can tell position from motion is
   asking her to guess.

   Every correction shows the matched pair, both sentences together, since
   the contrast is the entire lesson and a single sentence cannot carry it. */

window.GH = window.GH || {};

GH.woWohin = (function(){

  var LEVELS = [
    { id:'which',  key:'wwWhich',  hearts:4, rounds:12 },
    { id:'article',key:'wwArticle',hearts:3, rounds:12 },
    { id:'fixed',  key:'wwFixed',  hearts:4, rounds:10 },
    { id:'mixed',  key:'wwMixed',  hearts:3, rounds:14 }
  ];

  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- finding the article to blank ---------- */

  /* The preposition may carry an umlaut, so a word boundary in front of it
     does not fire — \b sits between a word and a non-word character, and
     JavaScript still counts ü as non-word. Match on the article instead. */
  var ARTICLES = 'dem|der|den|das|die|einem|einer|einen|eine';
  var MERGED = 'im|am|ins|ans|vom|zum|zur|beim';

  function findSlot(sentence, prep){
    var re = new RegExp('(' + prep + ')\\s+(' + ARTICLES + ')\\b');
    var m = sentence.match(re);
    if (m) return { text:m[2], start:m.index + m[1].length + 1, merged:false };
    var m2 = sentence.match(new RegExp('\\b(' + MERGED + ')\\b'));
    if (m2) return { text:m2[1], start:m2.index, merged:true };
    return null;
  }

  /* What else could plausibly go in that slot. For a merged form the
     alternatives are the other merged form and the accusative pair, since
     'im' against 'in den' is the contrast she will actually hear. */
  function choicesFor(slot, prep){
    if (slot.merged){
      var partner = { im:'in den', am:'an den', ins:'in dem', ans:'an dem',
                      vom:'von den', zum:'zu den', zur:'zu den', beim:'bei den' };
      return GH.text.shuffle([slot.text, partner[slot.text] || 'den']);
    }
    var GROUPS = [['dem','den'], ['der','die'], ['dem','das'],
                  ['einem','einen'], ['einer','eine']];
    for (var i = 0; i < GROUPS.length; i++){
      if (GROUPS[i].indexOf(slot.text) >= 0) return GH.text.shuffle(GROUPS[i].slice());
    }
    return GH.text.shuffle([slot.text, 'den']);
  }

  /* ---------- building a round ---------- */

  function pictureFor(noun){
    var v = (GH.packs.vocab()).filter(function(x){
      return x.de.toLowerCase() === noun.toLowerCase();
    })[0];
    return v ? v.n : 0;
  }

  function build(level){
    var C = window.GH_CASE || { pairs:[], fixed:[] };
    var out = [];

    if (level.id === 'fixed' || level.id === 'mixed'){
      GH.text.shuffle(C.fixed.slice()).forEach(function(f){
        var slot = findSlot(f.de, f.prep);
        if (!slot) return;
        out.push({ kind:'article', de:f.de, ru:f.ru, en:f.en, prep:f.prep,
                   slot:slot, answer:slot.text, fixedCase:f.c, img:0 });
      });
    }

    if (level.id !== 'fixed'){
      GH.text.shuffle(C.pairs.slice()).forEach(function(p){
        var img = pictureFor(p.noun);
        var half = Math.random() < 0.5 ? 'pos' : 'mot';
        var s = p[half];

        if (level.id === 'which' || (level.id === 'mixed' && Math.random() < 0.4)){
          out.push({ kind:'which', de:s.de, ru:s.ru, en:s.en,
                     answer:half, pair:p, img:img });
          return;
        }
        var slot = findSlot(s.de, p.prep);
        if (!slot) return;
        out.push({ kind:'article', de:s.de, ru:s.ru, en:s.en, prep:p.prep,
                   slot:slot, answer:slot.text, pair:p, half:half, img:img });
      });
    }

    return GH.tutor.pick(out, level.rounds, function(x){
      var keys = [];
      if (x.prep) keys.push('case:' + x.prep);
      keys.push(x.fixedCase ? 'case:fixed-' + x.fixedCase : 'case:twoway');
      return keys;
    });
  }

  function current(){ return state.items[state.i] || null; }

  function choose(pick){
    var it = current();
    if (!it || it.answered) return;
    it.answered = true;
    it.picked = pick;
    it.correct = pick === it.answer;
    if (it.correct) state.score++;
    else { state.hearts--; state.missed.push(it); }
    /* the shared run: streak, percentage, and what to say about it */
    state.run.saw('ww:' + state.i, it.correct);

    if (GH.tutor){
      /* WHAT SHE PICKED. `dem` for `den` is the case; `die` for `den` is the
         gender. Both are one wrong answer on a two-way preposition and they
         are not the same mistake — one needs the wo/wohin rule, the other
         needs the article table. `it.picked` is already recorded for the
         verdict line, so this costs nothing to collect. */
      var pk = it.picked;
      GH.tutor.grade('skill:case', it.correct, null, pk);
      if (it.prep) GH.tutor.grade('case:' + it.prep, it.correct, null, pk);
      /* two different rules wear the same skill name. A preposition whose
         case never changes is memorising; a two-way one is a judgement
         about motion, and she can be fine at one and lost in the other. */
      if (it.fixedCase) GH.tutor.grade('case:fixed-' + it.fixedCase, it.correct, null, pk);
      else GH.tutor.grade('case:twoway', it.correct, null, pk);
      if (it.kind === 'which') GH.tutor.grade('case:motion', it.correct, null, pk);
    }
    GH.speech.say(it.de);
    paint();
    if (state.hearts <= 0) setTimeout(finish, 900);
  }

  function next(){
    state.i++;
    if (!current()) { finish(); return; }
    paint();
  }

  function finish(){ state.phase = 'done'; paint(); }

  /* ---------- painting ---------- */

  function hearts(){
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

  /* The sentence, with the article hidden while she is choosing. */
  function sentenceLine(it){
    var p = el('p', 'ww-sentence');
    if (it.kind === 'which' || it.answered){
      p.textContent = it.de;
      return p;
    }
    var before = it.de.slice(0, it.slot.start);
    var after = it.de.slice(it.slot.start + it.slot.text.length);
    p.appendChild(document.createTextNode(before));
    p.appendChild(el('span', 'ww-gap', '\u2003\u2003'));
    p.appendChild(document.createTextNode(after));
    return p;
  }

  /* Both halves of the pair, side by side. This is the whole lesson and it
     cannot be shown with one sentence. */
  function pairCard(it){
    if (!it.pair) return null;
    var box = el('div', 'ww-pair');
    [['pos', 'wwWo'], ['mot', 'wwWohin']].forEach(function(row){
      var side = el('div', 'ww-side' + (it.half === row[0] || it.answer === row[0] ? ' is-this' : ''));
      side.appendChild(el('span', 'ww-side-l', t(row[1])));
      side.appendChild(el('span', 'ww-side-de', it.pair[row[0]].de));
      var lang = GH.i18n.lang();
      if (lang !== 'de') side.appendChild(el('span', 'ww-side-tr', it.pair[row[0]][lang] || ''));
      box.appendChild(side);
    });
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
    titles.appendChild(el('h1', null, t('wwTitle')));
    titles.appendChild(el('p', null,
      state.phase === 'pick' ? t('cgPickLevel') : t(state.level.key)));
    head.appendChild(titles);
    if (state.run) head.appendChild(GH.run.header(state.run));
    host.appendChild(head);

    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    var it = current();
    if (!it){ finish(); return; }

    var card = el('div', 'card');

    var status = el('div', 'cw-status');
    status.appendChild(hearts());
    status.appendChild(el('span', 'cw-score',
      t('roundOf', { i:state.i + 1, n:state.items.length })));
    card.appendChild(status);

    if (it.img && GH.sprite){
      var fig = el('div', 'ww-figure');
      fig.appendChild(GH.sprite.tile(it.img));
      card.appendChild(fig);
    }

    card.appendChild(sentenceLine(it));

    var lang = GH.i18n.lang();
    if (lang !== 'de' && it[lang]) card.appendChild(el('p', 'translation', it[lang]));

    if (!it.answered){
      var row = el('div', it.kind === 'which' ? 'ww-row' : 'options');
      var opts = it.kind === 'which'
        ? [['pos', t('wwWo')], ['mot', t('wwWohin')]]
        : choicesFor(it.slot, it.prep).map(function(x){ return [x, x]; });
      opts.forEach(function(o){
        var b = el('button', it.kind === 'which' ? 'ww-btn' : 'option', o[1]);
        b.type = 'button';
        b.addEventListener('click', function(){ choose(o[0]); });
        row.appendChild(b);
      });
      card.appendChild(row);
    } else {
      /* the shared acknowledgement — says more when the streak is
         worth mentioning, and nothing extra when it is not */
      var ack = GH.run.note(state.run);
      if (ack) card.appendChild(ack);

      if (it.fixedCase){
        card.appendChild(el('p', 'ww-note',
          t(it.fixedCase === 'dat' ? 'wwAlwaysDat' : 'wwAlwaysAcc', { p:it.prep })));
      } else {
        var pc = pairCard(it);
        if (pc) card.appendChild(pc);
        card.appendChild(el('p', 'ww-note', t('wwRule')));
      }

      var go = el('button', 'btn btn-primary js-advance', t('next'));
      go.type = 'button';
      go.addEventListener('click', next);
      var acts = el('div', 'done-actions');
      acts.appendChild(go);
      card.appendChild(acts);
    }

    host.appendChild(card);

    /* The question is on screen now, so time from here. Only when it is
       still unanswered — a repaint showing the verdict is not a new
       question, and marking it would measure how long she looked at the
       answer. */
    if (!it.answered && GH.events && GH.events.shown) GH.events.shown();
    if (it.answered) GH.nav.ready();
  }

  function paintLevels(){
    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('wwTitle', 'wwRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var n = build(lv).length;
      var b = el('button', 'tile');
      b.type = 'button';
      b.disabled = !n;
      b.appendChild(el('span', 'tile-glyph', '\ud83d\udccd'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', t('wwRoundsN', { n:lv.rounds })));
      b.appendChild(el('span', 'tile-foot', t('cwHeartsN', { n:lv.hearts })));
      b.addEventListener('click', function(){ begin(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function begin(level){
    state.level = level;
    /* Which level this round is, so accuracy can be read per level. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.items = build(level);
    state.i = 0;
    state.score = 0;
    state.run = GH.run.create();
    state.hearts = level.hearts;
    state.missed = [];
    state.phase = 'play';
    paint();
  }

  function paintDone(){
    var lost = state.hearts <= 0;
    var clean = !lost && !state.missed.length;
    var lang = GH.i18n.lang();

    var seen = {}, items = [];
    state.missed.forEach(function(it){
      var key = it.de;
      if (seen[key]) return;
      seen[key] = true;
      items.push({
        de: it.de,
        gloss: lang === 'de' ? '' : (it[lang] || ''),
        flag: it.kind === 'which'
          ? t(it.answer === 'pos' ? 'wwWo' : 'wwWohin')
          : it.answer,
        speak: it.de
      });
    });

    /* pay for the round before drawing the screen that reports it */

    var paid = GH.coins ? GH.coins.award('case', state.run,

      { record: !!state.newBest }) : null;
      /* and anything newly true — checked after the round is counted */
      var won = GH.awards ? GH.awards.afterRound('case', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: clean ? 'perfect' : (lost ? 'lost' : 'done'),
      glyph: clean ? '\ud83c\udfc6' : (lost ? '\ud83d\udc94' : '\ud83d\udccd'),
      title: clean ? t('cwPerfect') : (lost ? t('cwOut') : t('doneTitle')),
      stats: [
        { n:state.score, label:t('fbRight'), kind:'good' },
        { n:state.items.length - state.score, label:t('fbWrong'), kind:'bad' }
      ],
      reviews: [{
        head: t('wwMissedHead'),
        tone: 'missed',
        items: items,
        onTap: function(x){ GH.speech.say(x.speak); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.level); } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', level:LEVELS[0],
              items:[], i:0, score:0, hearts:0, missed:[] };
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
    id:'wo-wohin',
    glyph:'\ud83d\udccd',
    name:{ ru:'Где или куда?', de:'Wo oder wohin?', en:'Where or where to?' },
    sub:{ ru:'Падеж: стоит на месте или движется',
          de:'Der Fall: liegt es da, oder geht es dorthin',
          en:'Case: is it there, or is it going there' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'wwRule', rulesTitle:'wwTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.woWohin.levels,
    teaches:['case'],
    open:GH.woWohin.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
