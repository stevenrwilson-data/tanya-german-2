/* Bau den Satz — put the words in order.

   Word order is the largest untested thing in the app and the hardest
   transfer for a Russian speaker. Russian marks who-did-what-to-whom on the
   noun endings, so the words can go almost anywhere. German marks it by
   position, and the verb in particular has exactly one legal slot: second
   in a main clause, last in a subordinate one. There is nothing to feel
   your way to — it is a rule, and it has to be practised.

   The levels take a support away each time rather than adding difficulty
   for its own sake:

     1  she sees the sentence and hears it, then it scrambles
     2  she only hears it
     3  she only gets the meaning in her own language — no model at all,
        which is the first thing in this app that asks her to produce
        German rather than recognise it
     4  the subject is not first, so the verb has one legal slot and Russian
        gives no help finding it
     5  weil and dass, where the verb goes to the very end

   Two things that would quietly wreck this if left alone.

   The capital letter. German capitalises nouns, so a capital is normally
   information about word class — but the first word of a sentence gets one
   too, and that is information about position. Leaving it on would hand her
   the answer. So a word is shown capitalised only if the corpus has it
   capitalised in the middle of a sentence, which makes it a noun or a name.
   Everything else is lowercased in the tile and capitalised once placed
   first.

   Alternative orders. German often allows more than one, so a correct
   answer can be marked wrong. The game accepts the sentence as written and
   says as much when she misses — the feedback shows her order against the
   original rather than calling hers a mistake. */

window.GH = window.GH || {};

GH.scramble = (function(){

  var LEVELS = [
    { id:'see',   key:'scSee',   hearts:5, rounds:10, show:true,  hear:true  },
    { id:'hear',  key:'scHear',  hearts:4, rounds:10, show:false, hear:true  },
    { id:'mean',  key:'scMean',  hearts:3, rounds:10, show:false, hear:false },
    { id:'front', key:'scFront', hearts:3, rounds:10, show:false, hear:true  },
    { id:'sub',   key:'scSub',   hearts:3, rounds:8,  show:false, hear:true  }
  ];

  var host = null, state = null, pool = null, nouns = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- the corpus ---------- */

  var SUB = /\b(weil|dass|wenn|als|ob|obwohl|damit|während|bevor|nachdem)\b/;

  function everySentence(){
    var out = [];
    (GH_BANK.sentences || []).forEach(function(s){
      out.push({ de:s.de, ru:s.ru, en:s.en, img:s.img || 0 });
    });
    (GH_BANK.stories || []).forEach(function(st){
      st.sentences.forEach(function(l){ out.push({ de:l.de, ru:l.ru, en:l.en, img:l.img || 0 }); });
    });
    (window.GH_LONG || []).forEach(function(st){
      st.sentences.forEach(function(l){ out.push({ de:l.de, ru:l.ru, en:l.en, img:l.img || 0 }); });
    });
    (GH.packs.vocab()).forEach(function(v){
      GH.packs.sentencesOf(v).forEach(function(s){
        out.push({ de:s.de, ru:s.ru, en:s.en, img:v.n });
      });
    });
    /* The songs matter here more than anywhere else: the body song is forty
       weil clauses, and without them the subordinate level has four
       sentences in it. */
    (window.GH_SONGS || []).forEach(function(song){
      Object.keys(song.lines).forEach(function(id){
        var l = song.lines[id];
        out.push({ de:l.de, ru:l.ru, en:l.en, img:0 });
      });
    });
    return out;
  }

  /* Words German always capitalises: nouns, names, and the formal Sie.
     Found by looking for capitals in the middle of a sentence — but not
     straight after a colon or a quote, where a capital only means a new
     utterance has started. Those positions are why 'Ich' and 'Warum' looked
     like nouns on the first pass. */
  function buildNouns(list){
    var set = {};
    list.forEach(function(s){
      var raw = s.de.split(/\s+/);
      var afterBreak = false;
      raw.forEach(function(w, i){
        var clean = w.replace(/[.,!?;:„“"»«]/g, '');
        if (i > 0 && !afterBreak && /^[A-ZÄÖÜ]/.test(clean)) set[clean] = 1;
        afterBreak = /[:„“"]$/.test(w) || /[:]/.test(w);
      });
    });
    ['Tanya','Tanyas','Nazar','Nazars','Berlin','Hamburg','Sie','Ihr','Ihre','Ihnen']
      .forEach(function(w){ set[w] = 1; });
    return set;
  }

  function tokens(de){
    return de.replace(/[.!?]+$/, '').split(/\s+/).filter(Boolean);
  }

  /* how the word looks sitting in the tray */
  function loose(word, isFirst){
    if (!isFirst) return word;
    if (nouns[word]) return word;
    return word.charAt(0).toLowerCase() + word.slice(1);
  }

  function buildPool(){
    if (pool) return pool;
    var list = everySentence();
    nouns = buildNouns(list);

    var seen = {}, out = [];
    list.forEach(function(s){
      if (seen[s.de]) return;
      seen[s.de] = 1;
      var w = tokens(s.de);
      /* Below three there is nothing to order. Above nine the tray stops
         fitting a phone — except for subordinate clauses, which are long by
         nature and are the whole point of the last level. */
      var limit = SUB.test(s.de) ? 12 : 9;
      if (w.length < 3 || w.length > limit) return;
      if (/[:„“"]/.test(s.de)) return;               /* quoted speech scrambles badly */
      out.push({ de:s.de, ru:s.ru, en:s.en, img:s.img, words:w });
    });
    pool = out;
    return pool;
  }

  var FRONT = /^(Heute|Morgen|Am|Im|Jetzt|Dann|Später|Nach|Danach|Zuerst|Manchmal|Abends|Zum|Vor|Bei|Auf|Jeden|Nachts|Oft|Immer|Gestern|Zusammen|Draußen|Dort)\b/;

  function poolFor(level){
    var all = buildPool();
    if (level.id === 'sub')   return all.filter(function(s){ return SUB.test(s.de); });
    if (level.id === 'front') return all.filter(function(s){ return FRONT.test(s.de) && !SUB.test(s.de); });
    if (level.id === 'see')   return all.filter(function(s){ return s.words.length <= 5; });
    if (level.id === 'hear')  return all.filter(function(s){ return s.words.length >= 4 && s.words.length <= 7; });
    return all.filter(function(s){ return s.words.length >= 4 && s.words.length <= 7 && s.ru; });
  }

  /* ---------- a round ---------- */

  function build(level){
    var p = GH.tutor.pick(poolFor(level), level.rounds, function(s){
      var keys = ['sent:' + s.de.slice(0, 40)];
      if (SUB.test(s.de)) keys.push('order:final');
      return keys;
    });
    return p.map(function(s){
      /* a shuffle that never accidentally hands her the answer */
      var order = null, guard = 0;
      do { order = GH.text.shuffle(s.words.map(function(w, i){ return i; })); guard++; }
      while (guard < 20 && order.every(function(v, i){ return v === i; }));
      return { s:s, tray:order, placed:[], answered:false, correct:false, revealed:false };
    });
  }

  function current(){ return state.items[state.i] || null; }

  function place(idx){
    var it = current();
    if (!it || it.answered) return;
    var at = it.tray.indexOf(idx);
    if (at < 0) return;
    it.tray.splice(at, 1);
    it.placed.push(idx);
    if (!it.tray.length) check();
    else paint();
  }

  function unplace(pos){
    var it = current();
    if (!it || it.answered) return;
    var idx = it.placed.splice(pos, 1)[0];
    it.tray.push(idx);
    paint();
  }

  function check(){
    var it = current();
    it.answered = true;
    it.correct = it.placed.every(function(v, i){ return v === i; });
    if (it.correct) state.score++;
    else { state.hearts--; state.missed.push(it); }
    /* the shared run: streak, percentage, and what to say about it */
    state.run.saw('sc:' + state.i, it.correct);
    if (GH.tutor){
      GH.tutor.grade('skill:wordorder', it.correct);
      /* the level is the rule: fronted sentences are verb-second, weil
         clauses are verb-final, and they fail independently */
      GH.tutor.grade('order:' + state.level.id, it.correct);
      if (SUB.test(it.s.de)) GH.tutor.grade('order:final', it.correct);
    }
    GH.speech.say(it.s.de);
    paint();
    if (state.hearts <= 0) setTimeout(finish, 900);
  }

  function next(){
    state.i++;
    if (!current()){ finish(); return; }
    state.shown = state.level.show;
    paint();
    if (state.level.hear) GH.speech.say(current().s.de);
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

  /* what she has built so far */
  function line(it){
    var wrap = el('div', 'sc-line' + (it.answered ? (it.correct ? ' is-right' : ' is-wrong') : ''));
    if (!it.placed.length){
      wrap.appendChild(el('span', 'sc-empty', t('scTapWords')));
      return wrap;
    }
    it.placed.forEach(function(idx, pos){
      var w = it.s.words[idx];
      var b = el('button', 'sc-slot');
      b.type = 'button';
      b.textContent = pos === 0 ? (w.charAt(0).toUpperCase() + w.slice(1)) : loose(w, false);
      if (it.answered && idx !== pos) b.className += ' is-off';
      if (!it.answered) b.addEventListener('click', function(){ unplace(pos); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function tray(it){
    var wrap = el('div', 'sc-tray');
    it.tray.forEach(function(idx){
      var b = el('button', 'sc-word', loose(it.s.words[idx], idx === 0));
      b.type = 'button';
      b.addEventListener('click', function(){ place(idx); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('scTitle')));
    titles.appendChild(el('p', null,
      state.phase === 'pick' ? t('cgPickLevel') : t(state.level.key)));
    head.appendChild(titles);
    if (state.run) head.appendChild(GH.run.header(state.run));
    host.appendChild(head);

    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    var it = current();
    if (!it){ finish(); return; }
    var lang = GH.i18n.lang();

    var card = el('div', 'card');

    var status = el('div', 'cw-status');
    status.appendChild(hearts());
    status.appendChild(el('span', 'cw-score',
      t('roundOf', { i:state.i + 1, n:state.items.length })));
    card.appendChild(status);

    var tools = el('div', 'card-tools');
    if (state.level.hear){
      var play = el('button', 'speak', '\ud83d\udd0a ' + t('lpAgain'));
      play.type = 'button';
      play.addEventListener('click', function(){ GH.speech.say(it.s.de); });
      tools.appendChild(play);
    }
    if (!it.answered && state.level.show && state.shown){
      var hide = el('button', 'btn-quiet', t('scHide'));
      hide.type = 'button';
      hide.addEventListener('click', function(){ state.shown = false; paint(); });
      tools.appendChild(hide);
    }
    if (tools.children.length) card.appendChild(tools);

    /* level one shows the model until she hides it or starts placing */
    if (!it.answered && state.level.show && state.shown && !it.placed.length){
      card.appendChild(el('p', 'sc-model', it.s.de));
    }

    if (it.img && GH.sprite){
      var fig = el('div', 'sc-figure');
      fig.appendChild(GH.sprite.tile(it.img));
      card.appendChild(fig);
    }

    /* the meaning is the only clue on level three */
    if (lang !== 'de' && it.s[lang]){
      card.appendChild(el('p', 'translation', it.s[lang]));
    }

    card.appendChild(line(it));
    if (!it.answered) card.appendChild(tray(it));

    if (it.answered){
      /* the shared acknowledgement — says more when the streak is
         worth mentioning, and nothing extra when it is not */
      var ack = GH.run.note(state.run);
      if (ack) card.appendChild(ack);
      if (!it.correct){
        var was = el('div', 'sc-answer');
        was.appendChild(el('span', 'sc-answer-l', t('scItWas')));
        was.appendChild(el('span', 'sc-answer-de', it.s.de));
        card.appendChild(was);
        card.appendChild(el('p', 'sc-note', t('scAltNote')));
      }
      var go = el('button', 'btn btn-primary js-advance', t('next'));
      go.type = 'button';
      go.addEventListener('click', next);
      var acts = el('div', 'done-actions');
      acts.appendChild(go);
      card.appendChild(acts);
    }

    host.appendChild(card);
    if (it.answered) GH.nav.ready();
  }

  function paintLevels(){
    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('scTitle', 'scRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var n = poolFor(lv).length;
      var b = el('button', 'tile');
      b.type = 'button';
      b.disabled = n < 4;
      b.appendChild(el('span', 'tile-glyph', '\ud83e\udde9'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', t(lv.key + 'Sub')));
      b.appendChild(el('span', 'tile-foot',
        t('scPoolN', { n:n }) + ' \u00b7 ' + t('cwHeartsN', { n:lv.hearts })));
      b.addEventListener('click', function(){ begin(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function begin(level){
    state.level = level;
    /* Which level this round is, so accuracy can be read per level.
       Without it the tutor cannot choose a difficulty from evidence. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.items = build(level);
    state.i = 0;
    state.score = 0;
    state.run = GH.run.create();
    state.hearts = level.hearts;
    state.missed = [];
    state.shown = level.show;
    state.phase = 'play';
    paint();
    if (level.hear && current()) GH.speech.say(current().s.de);
  }

  function paintDone(){
    var lost = state.hearts <= 0;
    var clean = !lost && !state.missed.length;
    var lang = GH.i18n.lang();

    /* pay for the round before drawing the screen that reports it */

    var paid = GH.coins ? GH.coins.award('wordorder', state.run,

      { record: !!state.newBest }) : null;
      /* and anything newly true — checked after the round is counted */
      var won = GH.awards ? GH.awards.afterRound('wordorder', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: clean ? 'perfect' : (lost ? 'lost' : 'done'),
      glyph: clean ? '\ud83c\udfc6' : (lost ? '\ud83d\udc94' : '\ud83e\udde9'),
      title: clean ? t('cwPerfect') : (lost ? t('cwOut') : t('doneTitle')),
      stats: [
        { n:state.score, label:t('fbRight'), kind:'good' },
        { n:state.items.length - state.score, label:t('fbWrong'), kind:'bad' }
      ],
      reviews: [{
        head: t('scMissedHead'),
        tone: 'missed',
        items: state.missed.map(function(it){
          return {
            de: it.s.de,
            gloss: lang === 'de' ? '' : (it.s[lang] || ''),
            strike: it.placed.map(function(i){ return it.s.words[i]; }).join(' ')
          };
        }),
        onTap: function(x){ GH.speech.say(x.de); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.level); } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ GH.speech.stop(); state.onExit(); } }
      ]
    });
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', level:LEVELS[0],
              items:[], i:0, score:0, hearts:0, missed:[], shown:true };
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
    id:'scramble',
    glyph:'\ud83e\udde9',
    name:{ ru:'Собери предложение', de:'Bau den Satz', en:'Build the sentence' },
    sub:{ ru:'Порядок слов — где стоит глагол',
          de:'Wortstellung — wo das Verb steht',
          en:'Word order — where the verb goes' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'scRule', rulesTitle:'scTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.scramble.levels,
    teaches:['order'],
    open:GH.scramble.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
