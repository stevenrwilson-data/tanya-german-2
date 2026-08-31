/* Das Fließband — sentences arrive, she sorts them by tense.

   Not a quiz with a right answer waited on, but a belt that keeps feeding.
   Sixty seconds, as many as she can, and the point is not comprehension
   but speed: knowing that habe ich gearbeitet is past should stop being a
   decision and become a reflex.

   Three sentences of one verb form a set, and they arrive interleaved with
   other sets rather than together. Getting all three of a set right is
   worth a bonus, so she is tracking something across the round rather than
   answering isolated questions.

   The four levels take a support away each time, and the last one gives
   one back for a reason.

     1  the marker is gestern, heute or morgen. She can sort on that alone,
        and that is fine — reading the time word is a real skill.
     2  the marker is vaguer: neulich, übermorgen, im Moment. Still a
        marker, but she has to know what it means.
     3  no marker at all. Now only the verb can tell her: a participle is
        past, werden is future, anything else is present.
     4  the marker is back, and some future cards use the present tense —
        morgen arbeite ich. The verb form is now useless and only the
        marker decides. This is how German actually behaves, and it is the
        reason the earlier levels use werden throughout: a three-way sort
        is impossible otherwise.

   Level four is generated rather than written. A present-tense card with
   its marker swapped for a future one is already a correct future
   sentence, which is precisely the fact being taught.

   Scoring rewards the run rather than the total. Each card is worth more
   the longer the streak, a completed set pays a bonus, and a mistake costs
   the streak but never time — a game that punishes error with less time to
   recover is a game that spirals. */

window.GH = window.GH || {};

GH.conveyor = (function(){

  var BINS = ['past', 'present', 'future'];

  var LEVELS = [
    { id:'marked',  key:'cvMarked',  secs:60, alt:false, hide:false, tricky:false, tier:1 },
    { id:'varied',  key:'cvVaried',  secs:60, alt:true,  hide:false, tricky:false, tier:1 },
    { id:'bare',    key:'cvBare',    secs:60, alt:false, hide:true,  tricky:false, tier:2 },
    { id:'tricky',  key:'cvTricky',  secs:75, alt:true,  hide:false, tricky:true,  tier:2 },
    { id:'deep',    key:'cvDeep',    secs:75, alt:true,  hide:false, tricky:true,  tier:3, locked:true }
  ];

  /* The fifth level is held back.

     Its sentences carry things she has not been taught — wegen des Regens
     is genitive, beim Aussteigen is a verb wearing a capital letter,
     spazieren gegangen is two verbs sharing one participle. Meeting those
     by accident on a timer teaches nothing except that the game is unfair.

     It opens after a good run on the second level, which is the medium
     one: the time words are the vaguer set but the verb still helps. That
     is the point at which she is reading the sentence rather than pattern
     matching on gestern, and harder sentences become interesting rather
     than punishing. */
  var UNLOCK_KEY = 'gh-conveyor-deep';
  var UNLOCK_AT = 0.8;        /* accuracy on the medium level */
  var UNLOCK_MIN = 15;        /* over at least this many cards */

  function deepOpen(){ return store(UNLOCK_KEY) === '1'; }

  /* the value of one card at a given streak: 10, 15, 25, 40, 60 … */
  function worth(streak){ return 10 + 5 * (streak - 1) * streak / 2; }
  var SET_BONUS = 40;

  var BEST_KEY = 'gh-conveyor-best';

  var host = null, state = null, ticker = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function store(k, v){
    try {
      if (v === undefined) return window.localStorage.getItem(k);
      window.localStorage.setItem(k, v);
    } catch (e){ return null; }
  }

  function bestFor(id){ return parseInt(store(BEST_KEY + ':' + id) || '0', 10); }

  /* ---------- building the belt ---------- */

  function pick(list){ return list[Math.floor(Math.random() * list.length)]; }

  /* One verb becomes three cards, or four at the tricky level where the
     present sentence also appears wearing a future marker. */
  function cardsFor(v, level){
    var T = window.GH_TENSES;
    var out = [];

    BINS.forEach(function(bin){
      var c = v[bin];
      /* the harder tiers only exist on the thirteen sein verbs; everything
         else falls back to its ordinary sentence */
      if (bin === 'past' && level.tier >= 3 && v.past3) c = v.past3;
      else if (bin === 'past' && level.tier === 2 && v.past2) c = v.past2;
      if (!c || !c.de) return;
      /* A stored empty time word means the sentence is self-contained and
         begins with its own subject — Sie ist trotz des Verkehrs pünktlich
         angekommen. Prepending a marker to that produces 'Letztes Jahr Sie
         ist…', which is not German. Those cards go bare, which suits the
         tier they belong to: the verb is what she should be reading. */
      var marker = c.t;
      if (level.alt && c.t) marker = pick(T.alt[bin]);
      out.push({
        setId: v.n,
        verb: v.v,
        bin: bin,
        marker: level.hide ? '' : marker,
        de: c.de,
        ru: c.ru,
        en: c.en,
        real: c.t
      });
    });

    /* the present sentence, given a future marker — grammatical, correct,
       and unsortable by the verb, which is the whole lesson */
    if (level.tricky && v.present && v.present.de){
      out.push({
        setId: v.n,
        verb: v.v,
        bin: 'future',
        marker: pick(T.alt.future),
        de: v.present.de,
        ru: v.present.ru,
        en: v.present.en,
        real: v.present.t,
        plain: true
      });
    }
    return out;
  }

  function build(level){
    var T = window.GH_TENSES || { verbs:[] };
    var pool = T.verbs;

    /* The harder tiers only exist on the thirteen sein verbs. Drawing from
       all ninety would mean the level almost never showed a hard sentence
       and was indistinguishable from the one below it. */
    if (level.tier >= 3) pool = pool.filter(function(v){ return v.past3; });
    else if (level.tier === 2) {
      var withTwo = pool.filter(function(v){ return v.past2; });
      /* mix rather than restrict: the second tier is a step, not a wall */
      pool = withTwo.concat(GH.text.shuffle(pool.slice()).slice(0, 20));
    }

    /* the tutor decides which verbs come up, so a verb she keeps mis-sorting
       appears more often than one she has settled */
    var verbs = GH.tutor.pick(pool, 40, function(v){ return 'tense:' + v.v; });

    var belt = [];
    verbs.forEach(function(v){ belt = belt.concat(cardsFor(v, level)); });

    /* Interleave. A set arriving together would be sorted from the first
       card's answer rather than each being read. */
    return GH.text.shuffle(belt);
  }

  /* ---------- the round ---------- */

  function begin(level){
    stop();
    state.level = level;
    /* Which level this round is, so accuracy can be read per level. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.belt = build(level);
    state.i = 0;
    state.score = 0;
    state.streak = 0;
    state.best = 0;
    state.right = 0;
    state.done = 0;
    state.sets = {};
    state.missed = [];
    state.flash = null;
    state.justUnlocked = false;
    state.endsAt = Date.now() + level.secs * 1000;
    state.phase = 'play';
    paint();
    ticker = setInterval(tick, 200);
  }

  function stop(){ if (ticker){ clearInterval(ticker); ticker = null; } }

  function tick(){
    if (state.phase !== 'play') return;
    var left = Math.max(0, state.endsAt - Date.now());
    var bar = host.querySelector('.cv-clock-bar');
    if (bar) bar.style.width = (left / (state.level.secs * 1000) * 100) + '%';
    var num = host.querySelector('.cv-clock-n');
    if (num) num.textContent = Math.ceil(left / 1000);
    if (left <= 0) finish();
  }

  function current(){ return state.belt[state.i] || null; }

  function sort(bin){
    var c = current();
    if (!c || state.phase !== 'play') return;

    var ok = bin === c.bin;
    state.done++;

    if (ok){
      state.right++;
      state.streak++;
      if (state.streak > state.best) state.best = state.streak;
      var gained = worth(state.streak);

      /* the set: three of one verb, all correct */
      var s = state.sets[c.setId] || (state.sets[c.setId] = { got:0, need:3 });
      s.got++;
      var bonus = 0;
      if (s.got === 3){ bonus = SET_BONUS; state.score += bonus; }

      state.score += gained;
      state.flash = { ok:true, gained:gained, bonus:bonus, verb:c.verb };
    } else {
      state.streak = 0;
      state.missed.push(c);
      state.flash = { ok:false, was:c.bin, card:c };
    }

    if (GH.tutor){
      GH.tutor.grade('tense:' + c.verb, ok);
      GH.tutor.grade('skill:tense', ok);
      /* which bin it belonged in, so 'she cannot spot the future' is
         distinguishable from 'she cannot spot the past' */
      GH.tutor.grade('tense-bin:' + c.bin, ok);
      /* and the hard case specifically: a future wearing a present verb */
      if (c.plain) GH.tutor.grade('tense:plain-future', ok);
    }

    state.i++;
    /* keep the belt fed */
    if (state.i > state.belt.length - 6){
      state.belt = state.belt.concat(build(state.level));
    }
    paint();
    setTimeout(function(){
      if (state.phase !== 'play') return;
      state.flash = null;
      paint();
    }, ok ? 320 : 900);
  }

  function finish(){
    stop();
    /* a good run on the medium level opens the last one */
    var acc = state.done ? state.right / state.done : 0;
    if (state.level.id === 'varied' && !deepOpen() &&
        state.done >= UNLOCK_MIN && acc >= UNLOCK_AT){
      store(UNLOCK_KEY, '1');
      state.justUnlocked = true;
    }
    state.prevBest = bestFor(state.level.id);
    if (state.score > state.prevBest){
      store(BEST_KEY + ':' + state.level.id, String(state.score));
      state.newBest = true;
    } else {
      state.newBest = false;
    }
    state.phase = 'done';
    paint();
  }

  /* ---------- painting ---------- */

  function clock(){
    var wrap = el('div', 'cv-clock');
    var track = el('div', 'cv-clock-track');
    var bar = el('div', 'cv-clock-bar');
    bar.style.width = '100%';
    track.appendChild(bar);
    wrap.appendChild(track);
    wrap.appendChild(el('span', 'cv-clock-n', state.level.secs));
    return wrap;
  }

  function scoreRow(){
    var row = el('div', 'cv-score-row');
    row.appendChild(el('span', 'cv-score', state.score));
    var st = el('span', 'cv-streak' + (state.streak > 2 ? ' is-hot' : ''),
      '\u00d7' + Math.max(1, state.streak));
    row.appendChild(st);
    return row;
  }

  function cardFace(c){
    var card = el('div', 'cv-card' + (state.flash ? (state.flash.ok ? ' is-right' : ' is-wrong') : ''));
    if (c.marker) card.appendChild(el('span', 'cv-marker', c.marker));
    card.appendChild(el('span', 'cv-de', c.de));
    var lang = GH.i18n.lang();
    if (lang !== 'de' && c[lang]) card.appendChild(el('span', 'cv-tr', c[lang]));
    return card;
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stop(); GH.speech.stop(); state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('cvTitle')));
    titles.appendChild(el('p', null,
      state.phase === 'pick' ? t('cgPickLevel') : t(state.level.key)));
    head.appendChild(titles);
    host.appendChild(head);

    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    var c = current();
    if (!c){ finish(); return; }

    var card = el('div', 'card cv-stage');
    card.appendChild(scoreRow());
    card.appendChild(clock());

    /* the one behind, so it reads as a belt rather than a flashcard */
    var next = state.belt[state.i + 1];
    if (next) card.appendChild(el('div', 'cv-behind', next.de));

    card.appendChild(cardFace(c));

    if (state.flash){
      var f = el('p', 'cv-flash' + (state.flash.ok ? ' is-right' : ' is-wrong'));
      if (state.flash.ok){
        f.textContent = '+' + state.flash.gained +
          (state.flash.bonus ? '   ' + t('cvSetBonus', { n:state.flash.bonus }) : '');
      } else {
        f.textContent = t('cvWas', { bin:t('cv_' + state.flash.was) });
      }
      card.appendChild(f);
    }

    var bins = el('div', 'cv-bins');
    BINS.forEach(function(b){
      var btn = el('button', 'cv-bin cv-bin-' + b);
      btn.type = 'button';
      btn.appendChild(el('span', 'cv-bin-de', t('cvBin_' + b)));
      btn.appendChild(el('span', 'cv-bin-l', t('cv_' + b)));
      btn.addEventListener('click', function(){ sort(b); });
      bins.appendChild(btn);
    });
    card.appendChild(bins);

    host.appendChild(card);
  }

  function paintLevels(){
    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('cvTitle', 'cvRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var shut = lv.locked && !deepOpen();
      var b = el('button', 'tile' + (shut ? ' is-shut' : ''));
      b.type = 'button';
      b.disabled = shut;
      b.appendChild(el('span', 'tile-glyph', shut ? '\ud83d\udd12' : '\ud83c\udfad'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', shut ? t('cvDeepLocked') : t(lv.key + 'Sub')));
      var best = bestFor(lv.id);
      b.appendChild(el('span', 'tile-foot',
        shut ? t('cvDeepHow', { n:Math.round(UNLOCK_AT * 100) })
             : lv.secs + 's' + (best ? '  \u00b7  ' + t('gnBest', { n:best }) : '')));
      if (!shut) b.addEventListener('click', function(){ begin(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function paintDone(){
    var lang = GH.i18n.lang();
    var pct = state.done ? Math.round(state.right / state.done * 100) : 0;
    var setsDone = Object.keys(state.sets)
      .filter(function(k){ return state.sets[k].got === 3; }).length;

    var seen = {}, items = [];
    state.missed.forEach(function(c){
      var k = c.verb + c.bin;
      if (seen[k]) return;
      seen[k] = true;
      items.push({
        de: (c.marker ? c.marker + ' ' : '') + c.de,
        gloss: t('cv_' + c.bin),
        strike: c.verb,
        speak: (c.real ? c.real + ' ' : '') + c.de
      });
    });

    /* pay for the round before drawing the screen that reports it.
       This game counts its own answers rather than using GH.run, so
       award() is handed a run-shaped object built from them. */
    var runLike = { answered:(state.done||0), right:(state.right||0) };
    var paid = GH.coins ? GH.coins.award('conveyor', runLike, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('conveyor', runLike) : [];

    GH.endScreen.render(host, {
      coins: paid,
      won: won,
      tone: state.newBest ? 'perfect' : 'done',
      glyph: state.newBest ? '\ud83c\udfc6' : '\ud83c\udfad',
      title: state.newBest ? t('gnNewBest') : t('doneTitle'),
      stats: [
        { n:state.score, label:t('cvScore'), kind:'good' },
        { n:setsDone, label:t('cvSets'), kind:'good' },
        { n:'\u00d7' + state.best, label:t('gnStatStreak'), kind:'good' },
        { n:pct + '%', label:t('gnStatRight'), kind: pct >= 70 ? 'good' : 'bad' }
      ],
      note: state.justUnlocked ? t('cvDeepOpen')
        : state.newBest && state.prevBest
        ? t('gnBeatBy', { n:state.score - state.prevBest, old:state.prevBest })
        : (bestFor(state.level.id) ? t('gnBest', { n:bestFor(state.level.id) }) : ''),
      reviews: [{
        head: t('cvMissedHead'),
        tone: 'missed',
        items: items,
        onTap: function(x){ GH.speech.say(x.speak); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.level); } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ stop(); state.onExit(); } }
      ]
    });
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', level:LEVELS[0],
              belt:[], i:0, score:0, streak:0, best:0, right:0, done:0,
              sets:{}, missed:[], flash:null };
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
    id:'conveyor',
    glyph:'\ud83c\udfad',
    name:{ ru:'Вчера, сегодня, завтра', de:'Gestern, heute, morgen', en:'Yesterday, today, tomorrow' },
    sub:{ ru:'Сортируй предложения по времени, пока идут часы',
          de:'Sätze nach Zeit sortieren, gegen die Uhr',
          en:'Sort sentences by tense against the clock' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'cvRule', rulesTitle:'cvTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.conveyor.levels,
    teaches:['tense', 'tense-bin'],
    open:GH.conveyor.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
