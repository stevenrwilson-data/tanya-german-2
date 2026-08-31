/* Hören und wählen — hear a German sentence, tap the image it describes.

   The only exercise in the app where the audio IS the question: nothing
   is written down, so it tests whether she understood the sentence
   rather than whether she recognised a word on screen.

   Difficulty bundles three things — how many images, whether a clock
   runs, and how often she can replay the audio — because those are the
   same axis, not three separate settings.

   iOS will not speak unless a tap started it, so the first round always
   waits for the play button. After that the audio may start on its own,
   the browser having been unlocked by that first tap. */

window.GH = window.GH || {};

GH.listenPick = (function(){

  var LEVELS = [
    { id:'easy',   pics:4, seconds:0,  plays:0, key:'lpEasy'   },
    { id:'normal', pics:9, seconds:0,  plays:0, key:'lpNormal' },
    { id:'quick',  pics:9, seconds:10, plays:0, key:'lpQuick'  },
    { id:'hard',   pics:9, seconds:6,  plays:1, key:'lpHard'   }
  ];

  var ROUNDS = 10;

  var host = null;
  var state = null;
  var ticker = null;
  var unlocked = false;          /* has a tap started audio at least once */

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- items ---------- */

  function overlaps(a, b){
    var x = a.de.toLowerCase(), y = b.de.toLowerCase();
    return x.indexOf(y) >= 0 || y.indexOf(x) >= 0;
  }

  /* Distractors come from the same topic first: picking a kitchen scene
     out of nine kitchen scenes is a real test, out of nine random
     pictures it is not. Entries whose German contains this one's are
     excluded — 'der Lippenstift' against 'der rote Lippenstift' would
     make two pictures both correct. */
  function build(level){
    /* only the tenses she has switched on */
    /* the tiles are pictures, so a word without one cannot appear */
    var pool = (GH.packs.vocab()).filter(function(v){
      return GH.packs.hasPicture(v) && GH.packs.sentencesOf(v).length;
    });
    var items = [];
    /* drawn by need rather than at random, so a word she keeps missing
       comes round more often than one she has had right ten times */
    GH.tutor.pick(pool, ROUNDS, function(v){ return GH.packs.keyOf(v); }).forEach(function(v){
      var ss = GH.packs.sentencesOf(v);
      var sen = ss[Math.floor(Math.random() * ss.length)];
      var near = [], far = [];
      pool.forEach(function(c){
        if (GH.packs.same(c, v) || overlaps(v, c)) return;
        (GH.packs.shareCat(c, v) ? near : far).push(c);
      });
      /* A few words exist twice in the vocabulary under different numbers
         — 'zusammen einen Film ansehen' is both #225 and #274 — so without
         this the same phrase can land on two tiles in one round. The answer
         itself is safe, since overlaps() excludes it, but two identical
         pictures still look like a mistake. */
      var picked = {}, others = [];
      GH.text.shuffle(near).concat(GH.text.shuffle(far)).forEach(function(c){
        var key = c.de.toLowerCase();
        if (picked[key] || others.length >= level.pics - 1) return;
        picked[key] = true;
        others.push(c);
      });
      items.push({
        word:v,
        sentence:sen,
        options:GH.text.shuffle([v].concat(others)),
        plays:0,
        answered:false,
        correct:false,
        timedOut:false
      });
    });
    return items;
  }

  /* ---------- audio ---------- */

  /* The play limit exists so the harder levels cannot be brute-forced by
     listening ten times before choosing. Once she has answered, that reason
     is gone and hearing it again is the useful part — so replay is always
     allowed after the answer, whatever the level. */
  function canPlay(){
    var it = current();
    if (!it) return false;
    if (it.answered) return true;
    if (!state.level.plays) return true;
    return it.plays < state.level.plays;
  }

  function play(fromTap){
    var it = current();
    if (!it) return;
    if (fromTap) unlocked = true;
    if (!canPlay()) return;
    if (!it.answered) it.plays++;   /* replays after the answer are free */
    GH.speech.say(it.sentence.de);
    if (state.level.seconds && !state.deadline) startClock();
    paint();
  }

  /* ---------- clock ---------- */

  function startClock(){
    stopClock();
    state.deadline = Date.now() + state.level.seconds * 1000;
    ticker = setInterval(function(){
      var left = state.deadline - Date.now();
      if (left <= 0){ stopClock(); timeUp(); return; }
      var bar = host.querySelector('.lp-clock-bar');
      if (bar) bar.style.width = (left / (state.level.seconds * 1000) * 100) + '%';
    }, 100);
  }

  function stopClock(){
    if (ticker){ clearInterval(ticker); ticker = null; }
    state.deadline = 0;
  }

  function timeUp(){
    var it = current();
    if (!it || it.answered) return;
    it.answered = true;
    it.answeredAt = Date.now();
    state.answeredAt = it.answeredAt;
    it.timedOut = true;
    it.correct = false;
    /* running out of time is a miss, and the streak should feel it */
    state.run.saw('lp:' + state.i, false);
    if (GH.tutor){
      GH.tutor.grade(GH.packs.keyOf(it.word), false);
      GH.packs.catsOf(it.word).forEach(function(c){ GH.tutor.grade('topic:' + c, false); });
      GH.tutor.grade('skill:listening', false);
    }
    paint();
    GH.speech.say(it.sentence.de);
  }

  /* ---------- answering ---------- */

  function current(){ return state.items[state.i] || null; }

  function choose(opt){
    var it = current();
    if (!it || it.answered) return;
    stopClock();
    it.answered = true;
    state.answeredAt = Date.now();
    it.correct = opt.n === it.word.n;
    state.run.saw('lp:' + state.i, it.correct);
    if (GH.tutor){
      GH.tutor.grade(GH.packs.keyOf(it.word), it.correct);
      GH.packs.catsOf(it.word).forEach(function(c){ GH.tutor.grade('topic:' + c, it.correct); });
      GH.tutor.grade('skill:listening', it.correct);
    }
    paint();
    GH.speech.say(it.sentence.de);
  }

  function next(){
    stopClock();
    state.answeredAt = 0;
    state.i++;
    paint();
    var it = current();
    /* only self-start once a tap has unlocked audio on this device */
    if (it && unlocked && !state.level.plays) play(false);
  }

  /* ---------- painting ---------- */

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', leave);
    head.appendChild(back);

    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('lpTitle')));
    titles.appendChild(el('p', null, t(state.level.key)));
    head.appendChild(titles);
    if (state.run) head.appendChild(GH.run.header(state.run));

    if (state.i < state.items.length){
      var right = state.items.filter(function(x){ return x.correct; }).length;
      var prog = el('div', 'progress');
      var meter = el('div', 'meter');
      var bar = el('div', 'bar');
      bar.style.width = Math.round((state.i / state.items.length) * 100) + '%';
      meter.appendChild(bar);
      prog.appendChild(meter);
      prog.appendChild(el('span', 'progress-label',
        t('roundOf', { i:state.i + 1, n:state.items.length }) + ' · ' + right + '/' + state.i));
      head.appendChild(prog);
    }
    host.appendChild(head);

    if (state.i >= state.items.length){ paintDone(); return; }

    var it = current();
    var card = el('div', 'card');

    /* play button, and the clock if this level has one */
    var tools = el('div', 'card-tools');
    var pb = el('button', 'speak lp-play');
    pb.type = 'button';
    pb.appendChild(el('span', 'speak-icon', '🔊'));
    pb.appendChild(el('span', null, it.plays ? t('lpAgain') : t('lpPlay')));
    pb.disabled = !canPlay();
    /* Until she has heard it, the pictures are locked and this is the only
       thing to do — so it becomes the screen's primary action and answers to
       a tap anywhere, space or Enter, the same as Next does afterwards.
       Once she has answered, Next takes the role back. */
    if (!it.answered && !it.plays) pb.className += ' js-advance';
    pb.addEventListener('click', function(){ play(true); });
    tools.appendChild(pb);
    if (state.level.plays){
      tools.appendChild(el('span', 'lp-plays',
        t('lpPlaysLeft', { n:Math.max(0, state.level.plays - it.plays) })));
    }
    card.appendChild(tools);

    if (state.level.seconds && !it.answered){
      var clock = el('div', 'lp-clock');
      var cbar = el('div', 'lp-clock-bar');
      cbar.style.width = state.deadline ? '100%' : '0%';
      clock.appendChild(cbar);
      card.appendChild(clock);
    }

    if (!it.plays){
      card.appendChild(el('p', 'lp-hint', t('lpTapPlay')));
    }

    /* the grid */
    var grid = el('div', 'lp-grid' + (state.level.pics > 4 ? ' lp-nine' : ''));
    it.options.forEach(function(o){
      var b = el('button', 'lp-pic');
      b.type = 'button';
      b.appendChild(GH.sprite.tile(GH.packs.imgOf(o), o.de));
      if (it.answered){
        if (o.n === it.word.n) b.className += ' is-right';
        else if (!it.correct) b.className += ' is-dim';
      } else if (!it.plays){
        b.disabled = true;
      }
      b.addEventListener('click', function(){ choose(o); });
      grid.appendChild(b);
    });
    card.appendChild(grid);

    /* after answering, show what it said */
    if (it.answered){
      var ack = GH.run.note(state.run);
      if (ack) card.appendChild(ack);
      card.appendChild(el('p', 'sentence lp-reveal', it.sentence.de));
      var lang = GH.i18n.lang();
      if (lang !== 'de' && it.sentence[lang]){
        card.appendChild(el('p', 'translation', it.sentence[lang]));
      }
      card.appendChild(el('p', 'lp-word', it.word.de));
      var nx = el('button', 'btn btn-primary js-advance', t('next'));
      nx.type = 'button';
      nx.addEventListener('click', next);
      var acts = el('div', 'done-actions');
      acts.appendChild(nx);
      card.appendChild(acts);
    }

    host.appendChild(card);
    /* arm whichever button is currently the primary one */
    if (it.answered || !it.plays) GH.nav.ready();
  }

  function paintDone(){
    state.playing = false;
    var right = state.items.filter(function(x){ return x.correct; }).length;
    var missed = state.items.filter(function(x){ return !x.correct; });
    var lang = GH.i18n.lang();

    var seen = {}, items = [];
    missed.forEach(function(it){
      if (seen[it.word.n]) return;
      seen[it.word.n] = true;
      items.push({
        n: it.word.n,
        de: it.word.de,
        gloss: lang === 'de' ? '' : (it.word[lang] || it.word.en || ''),
        flag: it.timedOut ? t('lpRanOut') : '',
        sentence: it.sentence.de
      });
    });

    /* pay for the round before drawing the screen that reports it */

    var paid = GH.coins ? GH.coins.award('listen', state.run,

      { record: !!state.newBest }) : null;
      /* and anything newly true — checked after the round is counted */
      var won = GH.awards ? GH.awards.afterRound('listen', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: missed.length ? 'done' : 'perfect',
      title: missed.length ? t('doneTitle') : t('cwPerfect'),
      stats: [
        { n:right, label:t('fbRight'), kind:'good' },
        { n:state.items.length - right, label:t('fbWrong'), kind:'bad' }
      ],
      reviews: [{
        head: t('lpMissedHead', { n:items.length }),
        tone: 'missed',
        items: items,
        onTap: function(i){ GH.speech.say(i.sentence); },
        hearAll: items.length > 1 ? {
          label: t('lpHearAll'),
          onClick: function(){
            GH.speech.say(items.map(function(x){ return x.de; }).join(', '));
          }
        } : null
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){ begin(state.level); } },
        { label:t('lpChangeLevel'), onClick:paintLevels },
        { label:t('toHub'), onClick:leave }
      ]
    });
  }

  function paintLevels(){
    stopClock();
    state.playing = false;      /* no round in progress, so no shortcuts */
    host.textContent = '';
    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', leave);
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('lpTitle')));
    titles.appendChild(el('p', null, t('lpPickLevel')));
    head.appendChild(titles);
    host.appendChild(head);

    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('lpTitle', 'lpRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var b = el('button', 'tile');
      b.type = 'button';
      b.appendChild(el('span', 'tile-glyph', lv.pics > 4 ? '🎧' : '🎵'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', t('lpPicsN', { n:lv.pics })));
      b.appendChild(el('span', 'tile-foot',
        (lv.seconds ? t('lpSecondsN', { n:lv.seconds }) : t('lpNoClock')) + ' · ' +
        (lv.plays ? t('lpOnePlay') : t('lpFreePlays'))));
      b.addEventListener('click', function(){ begin(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function begin(level){
    stopClock();
    state.level = level;
    /* Which level this round is, so accuracy can be read per level. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.items = build(level);
    state.i = 0;
    if (GH.run) state.run = GH.run.create();
    state.deadline = 0;
    state.playing = true;
    paint();
  }

  function leave(){
    stopClock();
    state.playing = false;
    state.onExit();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, level:LEVELS[1], items:[], i:0, deadline:0, playing:false,
              run:GH.run.create() };
    paintLevels();
  }

  /* Its own level ids, read off its own LEVELS array. Declared here
     rather than typed into the entry below, so the two cannot drift
     apart — the tutor picks a level by id and a stale list means it
     picks one that does not exist. */
  return { open:open, levels:LEVELS.map(function(l){ return l.id; }) };
})();

/* Register on the hub.

   app.js loads AFTER this file, so GH.app does not exist yet — checking
   for it here and giving up silently is what kept this game off the hub.
   app.js boots on DOMContentLoaded and our listener is added first, so
   registering there runs before the hub is drawn regardless of the order
   the script tags happen to be in. */
(function(){
  var entry = {
    id:'listen-pick',
    glyph:'🎧',
    name:{ ru:'Слушай и выбирай', de:'Hören und wählen', en:'Listen and pick' },
    sub:{ ru:'Картинка к тому, что услышала',
          de:'Das Bild zum Gehörten',
          en:'The picture for what you heard' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'lpRule', rulesTitle:'lpTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.listenPick.levels,
    teaches:['word', 'topic'],
    open:GH.listenPick.open
  };

  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }

  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
