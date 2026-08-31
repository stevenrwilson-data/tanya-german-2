/* der · die · das

   German gender against a Russian speaker's instinct. In this vocabulary
   the split is almost exactly even — 79 nouns agree with Russian, 74 do
   not — which is the worst case for a learner, because her instinct feels
   reliable and is right about half the time. So the levels are built on
   that divide rather than on topics: one level where Russian helps, one
   where it actively misleads, and a mixed level which is the honest test
   because she cannot tell in advance which kind she has.

   Suffix rules are deliberately not taught here. They cover only 40% of
   these nouns and hold 70% of the time, which is worse than useless as a
   rule — it would teach her to trust a coin flip.

   Two modes. Basic is a set of rounds with hearts, and a clean run unlocks
   the speed run: sixty seconds, as many as she can, with the value of each
   answer growing along the streak so a long clean run is worth many times
   a broken one. A wrong answer costs no heart there — it resets the
   streak, which hurts more. */

window.GH = window.GH || {};

GH.gender = (function(){

  var ARTICLES = ['der', 'die', 'das'];
  var RU_OF = { der:'M', die:'F', das:'N' };

  var LEVELS = [
    { id:'agree',  key:'gnAgree',  hearts:4, rounds:12 },
    { id:'differ', key:'gnDiffer', hearts:3, rounds:12 },
    { id:'plural', key:'gnPlural', hearts:4, rounds:10 },
    { id:'all',    key:'gnAll',    hearts:3, rounds:14 }
  ];

  var RUN_SECONDS = 60;
  var UNLOCK_KEY = 'gh-gender-unlocked';
  var BEST_KEY   = 'gh-gender-best';

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

  function unlocked(){ return store(UNLOCK_KEY) === '1'; }
  function best(){ return parseInt(store(BEST_KEY) || '0', 10); }

  /* ---------- the pool ---------- */

  /* Bare nouns only. 'der rote Lippenstift' is an adjective phrase and
     would show up as a second copy of a word she already has. */
  function nouns(){
    return (GH.packs.vocab()).filter(GH.packs.hasPicture).filter(function(v){
      return /^(der|die|das) [A-ZÄÖÜ][a-zäöüß]+$/.test(v.de);
    });
  }

  function article(v){ return v.de.split(' ')[0]; }
  function bare(v){ return v.de.split(' ').slice(1).join(' '); }

  function agrees(v){ return !!v.rg && v.rg !== 'PL' && RU_OF[article(v)] === v.rg; }
  function differs(v){ return !!v.rg && v.rg !== 'PL' && RU_OF[article(v)] !== v.rg; }
  function plural(v){ return v.rg === 'PL'; }

  /* ---------- reading the app in English ----------

     The three levels compare German gender to Russian gender, and English
     has none to compare, so `agree` and `differ` have no content for an
     English reader: the pools come back empty and the game looks broken.

     In English the game teaches the thing an English speaker actually has
     to learn — that every noun carries a gender and it has to be attached
     to the word. The word is shown as `F Tafel`, `M Stuhl`, `N Heft`, all
     three levels draw from one pool, and the note about Russian
     misleading her is suppressed because it would be explaining a problem
     Nazar does not have.

     Nothing about the data changes. `rg` is still there and still used
     when the app is read in Russian. */
  function english(){ return GH.i18n && GH.i18n.lang() === 'en'; }

  /* F / M / N — the label she has to remember, in front of the word. */
  var TAG_OF = { der:'M', die:'F', das:'N' };
  function tagged(v){
    var a = article(v);
    var tag = TAG_OF[a];
    return tag ? (tag + ' ' + bare(v)) : v.de;
  }

  function poolFor(id){
    var all = nouns();
    /* One pool in English: the three levels are a Russian distinction.

       Plurals still come out, and that matters more than it looks. German
       plurals take `die` whatever their gender, so tagging `die Augen` as
       F would teach the opposite of the rule. `rg:'PL'` is doing double
       duty here — it is the Russian gender field, but PL is really a
       German-plural flag, and that is what plural() reads. Do not remove
       this filter on the grounds that English has no gender. */
    if (english()) return all.filter(function(v){ return !plural(v); });
    if (id === 'agree')  return all.filter(agrees);
    if (id === 'differ') return all.filter(differs);
    if (id === 'plural') return all.filter(plural);
    return all;
  }

  /* This game had its own weighting before the tutor existed. The tutor
     does the same job across every game and adds the schedule, so the
     local version goes — except for one thing it knew that the tutor
     cannot: the nouns where Russian disagrees deserve to come round more
     often whatever her record says. That bias stays, applied on top. */
  function pick(pool, n){
    var wide = GH.tutor.pick(pool, Math.min(pool.length, n * 2), function(v){
      return 'gender:' + v.n;
    });
    wide.sort(function(a, b){
      var da = (differs(a) ? 1 : 0) + Math.random() * 0.8;
      var db = (differs(b) ? 1 : 0) + Math.random() * 0.8;
      return db - da;
    });
    return wide.slice(0, n);
  }

  /* ---------- scoring ---------- */

  /* 10, 15, 25, 40, 60 … the step grows by five each time, so the twentieth
     answer in a row is worth 960 on its own. Breaking the streak costs all
     of that, which is the whole tension of the mode. */
  function worth(streak){ return 10 + 5 * (streak - 1) * streak / 2; }

  /* ---------- rounds ---------- */

  function beginBasic(level){
    stopClock();
    var pool = poolFor(level.id);
    state.mode = 'basic';
    state.level = level;
    /* Which level this round is, so accuracy can be read per level.
       Without it the tutor cannot choose a difficulty from evidence. */
    if (GH.events && GH.events.setLevel) GH.events.setLevel(level && level.id);
    state.items = pick(pool, Math.min(level.rounds, pool.length));
    state.i = 0;
    state.hearts = level.hearts;
    state.score = 0;
    state.missed = [];
    state.answer = null;
    state.justUnlocked = false;
    state.phase = 'play';
    paint();
  }

  function beginSpeed(){
    stopClock();
    state.mode = 'speed';
    state.level = { id:'all', key:'gnSpeed', hearts:0 };
    state.pool = poolFor('all');
    state.items = pick(state.pool, 400);
    state.i = 0;
    state.score = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.answered = 0;
    state.right = 0;
    state.missed = [];
    state.answer = null;
    /* without these the run after a record still believes it is one */
    state.newBest = false;
    state.prevBest = 0;
    state.endsAt = Date.now() + RUN_SECONDS * 1000;
    state.phase = 'play';
    paint();
    ticker = setInterval(tick, 200);
  }

  function stopClock(){ if (ticker){ clearInterval(ticker); ticker = null; } }

  function tick(){
    if (state.phase !== 'play') return;
    var left = Math.max(0, state.endsAt - Date.now());
    var bar = host.querySelector('.gn-clock-bar');
    if (bar) bar.style.width = (left / (RUN_SECONDS * 1000) * 100) + '%';
    var num = host.querySelector('.gn-clock-n');
    if (num) num.textContent = Math.ceil(left / 1000);
    if (left <= 0) finish();
  }

  function current(){ return state.items[state.i] || null; }

  function choose(art){
    var v = current();
    if (!v || state.answer) return;
    var ok = article(v) === art;
    state.answer = { picked:art, ok:ok, word:v };

    if (GH.tutor){
      GH.tutor.grade('gender:' + v.n, ok);
      GH.tutor.grade('skill:gender', ok);
      GH.packs.catsOf(v).forEach(function(c){ GH.tutor.grade('topic:' + c, ok); });
    }

    if (state.mode === 'speed'){
      state.answered++;
      if (ok){
        state.right++;
        state.streak++;
        if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        state.gained = worth(state.streak);
        state.score += state.gained;
      } else {
        state.streak = 0;
        state.gained = 0;
        state.missed.push(v);
      }
      paint();
      /* no blocking card here — speed is the point */
      setTimeout(function(){
        if (state.phase !== 'play') return;
        state.answer = null;
        state.i++;
        if (!current()) state.items = state.items.concat(pick(state.pool, 200));
        paint();
      }, ok ? 260 : 700);
      return;
    }

    if (ok){ state.score++; }
    else { state.hearts--; state.missed.push(v); }
    GH.speech.say(v.de);
    paint();
    if (state.hearts <= 0) setTimeout(finish, 900);
  }

  function next(){
    state.answer = null;
    state.i++;
    if (!current()) { finish(); return; }
    paint();
  }

  function finish(){
    stopClock();
    if (state.mode === 'speed'){
      state.prevBest = best();
      if (state.score > state.prevBest){
        store(BEST_KEY, String(state.score));
        state.newBest = true;
        state.phase = 'splash';   /* the record gets its own screen */
        paint();
        return;
      }
    } else if (state.hearts > 0 && !state.missed.length){
      if (!unlocked()){ store(UNLOCK_KEY, '1'); state.justUnlocked = true; }
    }
    state.phase = 'done';
    paint();
  }

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

  function head(){
    var h = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stopClock(); state.onExit(); });
    h.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('gnTitle')));
    titles.appendChild(el('p', null,
      state.phase === 'pick' ? t('cgPickLevel') : t(state.level.key)));
    h.appendChild(titles);
    return h;
  }

  /* A record deserves more than a line of text on the results screen, so it
     takes over the whole view for a moment: the number, how far it beat the
     old one, and nothing else competing for attention. The header and back
     link are deliberately absent — there is one thing to do here. */
  function paintSplash(){
    host.textContent = '';
    var wrap = el('div', 'gn-splash');

    var burst = el('div', 'gn-burst');
    ['⚡','✨','🏆','✨','⚡'].forEach(function(g, i){
      var s2 = el('span', 'gn-spark', g);
      s2.style.animationDelay = (i * 90) + 'ms';
      burst.appendChild(s2);
    });
    wrap.appendChild(burst);

    wrap.appendChild(el('p', 'gn-splash-kicker', t('gnNewBest')));
    wrap.appendChild(el('p', 'gn-splash-score', state.score));

    var beat = state.score - (state.prevBest || 0);
    if (state.prevBest){
      wrap.appendChild(el('p', 'gn-splash-beat',
        t('gnBeatBy', { n:beat, old:state.prevBest })));
    } else {
      wrap.appendChild(el('p', 'gn-splash-beat', t('gnFirstRun')));
    }

    var stats = el('div', 'gn-splash-stats');
    [[state.right + '/' + state.answered, t('gnStatRight')],
     ['×' + state.bestStreak, t('gnStatStreak')]].forEach(function(pair){
      var c = el('div', 'gn-splash-stat');
      c.appendChild(el('span', 'gn-splash-stat-n', pair[0]));
      c.appendChild(el('span', 'gn-splash-stat-l', pair[1]));
      stats.appendChild(c);
    });
    wrap.appendChild(stats);

    var acts = el('div', 'done-actions');
    var again = el('button', 'btn btn-primary js-advance', t('gnGoAgain'));
    again.type = 'button';
    again.addEventListener('click', beginSpeed);
    var see = el('button', 'btn btn-ghost', t('gnSeeResults'));
    see.type = 'button';
    see.addEventListener('click', function(){ state.phase = 'done'; paint(); });
    acts.appendChild(again); acts.appendChild(see);
    wrap.appendChild(acts);

    host.appendChild(wrap);
    GH.nav.ready();
  }

  function paint(){
    host.textContent = '';
    host.appendChild(head());
    if (state.phase === 'pick'){ paintLevels(); return; }
    if (state.phase === 'splash'){ paintSplash(); return; }
    if (state.phase === 'done'){ paintDone(); return; }

    var v = current();
    if (!v){ finish(); return; }

    var card = el('div', 'card');

    var status = el('div', 'cw-status');
    if (state.mode === 'basic'){
      status.appendChild(hearts());
      status.appendChild(el('span', 'cw-score',
        t('roundOf', { i:state.i + 1, n:state.items.length })));
    } else {
      status.appendChild(el('span', 'gn-score', state.score));
      var st = el('span', 'gn-streak' + (state.streak > 2 ? ' is-hot' : ''),
        '×' + Math.max(1, state.streak));
      status.appendChild(st);
    }
    card.appendChild(status);

    if (state.mode === 'speed'){
      var clock = el('div', 'gn-clock');
      var track = el('div', 'gn-clock-track');
      var cb = el('div', 'gn-clock-bar');
      cb.style.width = '100%';
      track.appendChild(cb);
      clock.appendChild(track);
      clock.appendChild(el('span', 'gn-clock-n', RUN_SECONDS));
      card.appendChild(clock);
    }

    var fig = el('div', 'gn-figure');
    fig.appendChild(GH.sprite.tile(GH.packs.imgOf(v), v.de));
    card.appendChild(fig);

    card.appendChild(el('p', 'gn-word', bare(v)));

    var row = el('div', 'gn-row');
    ARTICLES.forEach(function(a){
      var b = el('button', 'gn-btn', a);
      b.type = 'button';
      if (state.answer){
        if (a === article(v)) b.className += ' is-right';
        else if (a === state.answer.picked) b.className += ' is-wrong';
        b.disabled = true;
      }
      b.addEventListener('click', function(){ choose(a); });
      row.appendChild(b);
    });
    card.appendChild(row);

    if (state.answer && state.mode === 'speed' && state.answer.ok && state.gained){
      card.appendChild(el('p', 'gn-gained', '+' + state.gained));
    }

    if (state.answer && state.mode === 'basic') card.appendChild(verdict(v));

    host.appendChild(card);
    if (state.answer && state.mode === 'basic') GH.nav.ready();
  }

  /* The teaching moment: German's gender against Russian's, side by side,
     with the conflict named. */
  function verdict(v){
    var box = el('div', 'gn-verdict' + (state.answer.ok ? ' is-right' : ''));
    box.appendChild(el('p', 'gn-verdict-head',
      state.answer.ok
        ? (differs(v) ? t('gnRightHard') : t('correct'))
        : t('notQuite')));

    var pair = el('div', 'gn-pair');
    var de = el('div', 'gn-side');
    de.appendChild(el('span', 'gn-side-l', t('gnGerman')));
    de.appendChild(el('span', 'gn-side-w', v.de));
    pair.appendChild(de);
    if (english()){
      /* the label to remember, rather than a comparison she cannot make */
      var tag = el('div', 'gn-side');
      tag.appendChild(el('span', 'gn-side-l', t('gnRemember')));
      tag.appendChild(el('span', 'gn-side-w', tagged(v)));
      pair.appendChild(tag);
    } else if (v.rg){
      var ru = el('div', 'gn-side');
      ru.appendChild(el('span', 'gn-side-l', t('gnRussian')));
      ru.appendChild(el('span', 'gn-side-w', v.ru || ''));
      ru.appendChild(el('span', 'gn-side-g', t('gnGender_' + v.rg)));
      pair.appendChild(ru);
    }
    box.appendChild(pair);

    if (english()){
      box.appendChild(el('p', 'gn-note', t('gnTagNote')));
    } else if (differs(v)) box.appendChild(el('p', 'gn-note', t('gnMismatch')));
    else if (plural(v)) box.appendChild(el('p', 'gn-note', t('gnPluralNote')));

    var go = el('button', 'btn btn-primary js-advance', t('next'));
    go.type = 'button';
    go.addEventListener('click', next);
    box.appendChild(go);
    return box;
  }

  function paintLevels(){
    var tools = el('div', 'card-tools');
    tools.appendChild(GH.howto.button('gnTitle', 'gnRule'));
    host.appendChild(tools);

    var grid = el('div', 'tiles');
    LEVELS.forEach(function(lv){
      var n = poolFor(lv.id).length;
      var b = el('button', 'tile');
      b.type = 'button';
      b.disabled = !n;
      b.appendChild(el('span', 'tile-glyph', '⚖️'));
      b.appendChild(el('span', 'tile-name', t(lv.key)));
      b.appendChild(el('span', 'tile-sub', t('gnNounsN', { n:n })));
      b.appendChild(el('span', 'tile-foot', t('cwHeartsN', { n:lv.hearts })));
      b.addEventListener('click', function(){ beginBasic(lv); });
      grid.appendChild(b);
    });
    host.appendChild(grid);

    /* the speed run, locked until a clean basic round */
    var open = unlocked();
    var sp = el('button', 'gn-speed-tile' + (open ? ' is-open' : ' is-locked'));
    sp.type = 'button';
    sp.disabled = !open;
    sp.appendChild(el('span', 'gn-speed-glyph', open ? '⚡' : '🔒'));
    var body = el('span', 'gn-speed-body');
    body.appendChild(el('span', 'gn-speed-name', t('gnSpeed')));
    body.appendChild(el('span', 'gn-speed-sub',
      open ? t('gnSpeedSub', { n:RUN_SECONDS }) : t('gnSpeedLocked')));
    if (open && best()) body.appendChild(el('span', 'gn-speed-best', t('gnBest', { n:best() })));
    sp.appendChild(body);
    sp.addEventListener('click', beginSpeed);
    host.appendChild(sp);
  }

  function paintDone(){
    var speed = state.mode === 'speed';
    var lost = !speed && state.hearts <= 0;
    var clean = !speed && !lost && !state.missed.length;
    var lang = GH.i18n.lang();

    var seen = {}, items = [];
    state.missed.forEach(function(v){
      if (seen[v.n]) return;
      seen[v.n] = true;
      items.push({
        n: v.n,
        de: v.de,
        gloss: lang === 'de' ? '' : (v.ru || v.en || ''),
        flag: differs(v) ? t('gnGender_' + v.rg) : ''
      });
    });

    var stats = speed
      ? [{ n:state.right, label:t('gnStatRight'), kind:'good' },
         { n:state.answered - state.right, label:t('fbWrong'), kind:'bad' },
         { n:'×' + state.bestStreak, label:t('gnStatStreak'), kind:'good' }]
      : [{ n:state.score, label:t('fbRight'), kind:'good' },
         { n:state.items.length - state.score, label:t('fbWrong'), kind:'bad' }];

    var unlock = null;
    if (state.justUnlocked){
      unlock = el('div', 'gn-unlock');
      unlock.appendChild(el('span', 'gn-unlock-glyph', '⚡'));
      unlock.appendChild(el('span', 'gn-unlock-head', t('gnUnlocked')));
      unlock.appendChild(el('span', 'gn-unlock-sub', t('gnUnlockedSub')));
      var jump = el('button', 'btn btn-primary', t('gnSpeedGo'));
      jump.type = 'button';
      jump.addEventListener('click', beginSpeed);
      unlock.appendChild(jump);
    }

    /* pay for the round before drawing the screen that reports it.
       This game counts its own answers rather than using GH.run, so
       award() is handed a run-shaped object built from them. */
    var runLike = { answered:(state.score||0)+(state.missed?state.missed.length:0), right:(state.score||0) };
    var paid = GH.coins ? GH.coins.award('gender', runLike, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('gender', runLike) : [];

    GH.endScreen.render(host, {
      coins: paid,
      won: won,
      tone: speed ? 'done' : (clean ? 'perfect' : (lost ? 'lost' : 'done')),
      glyph: speed ? '⚡' : (clean ? '🏆' : (lost ? '💔' : '⚖️')),
      title: speed ? t('doneTitle')
           : (lost ? t('cwOut') : (clean ? t('cwPerfect') : t('doneTitle'))),
      stats: stats,
      note: speed && best() ? t('gnBest', { n:best() }) : '',
      extra: unlock,
      reviews: [{
        head: t('gnMissedHead'),
        tone: 'missed',
        items: items,
        onTap: function(i){ GH.speech.say(i.de); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            if (speed) beginSpeed(); else beginBasic(state.level);
          } },
        { label:t('cwChangeLevel'), onClick:function(){ state.phase = 'pick'; paint(); } },
        { label:t('toHub'), onClick:function(){ stopClock(); state.onExit(); } }
      ]
    });
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, phase:'pick', mode:'basic', level:LEVELS[0],
              items:[], i:0, hearts:0, score:0, missed:[], answer:null };
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
    id:'gender',
    glyph:'⚖️',
    name:{ ru:'der · die · das', de:'der · die · das', en:'der · die · das' },
    sub:{ ru:'Род существительных — там, где русский подводит',
          de:'Artikel — auch wo Russisch in die Irre führt',
          en:'Noun gender, including where Russian misleads' },
    /* The rule text this game already ships, so the guide can list
          it without keeping a map that drifts out of date. */
    rules:'gnRule', rulesTitle:'gnTitle',
    /* What the tutor needs to choose FOR her: the ladder, and which
       areas a round here actually grades. `skill:` is omitted — every
       game writes one, so it separates nothing. */
    levels:GH.gender.levels,
    teaches:['gender', 'topic'],
    open:GH.gender.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
