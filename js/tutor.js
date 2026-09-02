/* The tutor: what to show her next, and when.

   Every game used to pick its rounds at random from the whole pool, which
   means she spends most of a session on words she already knows. The store
   has been recording what she misses for weeks and nothing read it. This
   reads it.

   Two clocks run at once, and conflating them is the usual mistake.

   Within a session, a missed item has to come back — not immediately,
   which is just copying, but after a few others have gone by, so she has
   to retrieve it rather than echo it. Anki calls these learning steps.

   Across sessions, an item she gets right should disappear for a while and
   come back just as it is about to fade. That is SM-2, the algorithm behind
   Anki: hold an interval and an ease factor per item, multiply the interval
   by the ease on a success, collapse it on a failure. It is twenty lines
   and it is the whole of spaced repetition.

   The scheduler only earns its keep if she comes back over weeks. For a
   single sitting, the useful part is the weighting: draw the round from
   what is due and what is weak rather than from everything. So both are
   here, and the weighting works whether or not the schedule ever matures.

   It can be switched off, and then every game picks at random exactly as
   before. On by default, because a learner should not have to opt in to
   being taught properly. */

window.GH = window.GH || {};

GH.tutor = (function(){

  var KEY = 'gh-sched-v1';
  var OFF = 'gh-tutor-off';

  var DAY = 86400000;

  /* SM-2, with the constants Anki settled on */
  var EASE_START = 2.5;
  var EASE_MIN   = 1.3;
  var EASE_UP    = 0.05;
  var EASE_DOWN  = 0.2;
  var FIRST      = 1;        /* days after the first success */
  var SECOND     = 3;        /* days after the second */

  /* learning steps, in items rather than minutes — a lapsed card comes back
     after this many other questions inside the same round */
  var STEP_NEAR = 3;
  var STEP_FAR  = 9;

  var cache = null;

  function read(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : {};
    } catch (e){ cache = {}; }
    return cache;
  }

  function write(){
    try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e){}
  }

  function enabled(){
    try { return window.localStorage.getItem(OFF) !== '1'; } catch (e){ return true; }
  }

  function setEnabled(on){
    try {
      if (on) window.localStorage.removeItem(OFF);
      else window.localStorage.setItem(OFF, '1');
    } catch (e){}
  }

  function scoped(key){
    return GH.player ? GH.player.scope(key) : key;
  }

  function card(key){
    var d = read(), k = scoped(key);
    return d[k] || null;
  }

  function blank(){
    return { ivl:0, ease:EASE_START, due:0, reps:0, lapses:0, last:0 };
  }

  /* SHE LOOKED THIS WORD UP.

     The strongest signal in the app and until now it was thrown away. A
     wrong answer in a four-choice question might be a guess; opening a word
     to read what it means is her telling you, unprompted, that she does not
     have it. Nothing else she does is that unambiguous.

     What it must NOT do is grade her. She has not answered anything, so
     `reps`, `lapses`, `ease` and her accuracy are untouched — treating a
     lookup as a failure would punish her for being curious, and would make
     the progress screen lie about how she is doing.

     What it does instead is move the card FORWARD. Three cases:

       never seen    a card due tomorrow, so it enters the rotation instead
                     of waiting for the pack rotation to reach it
       already due   nothing to do, it is already coming
       settled       the interval is halved and capped at three days

     Halved rather than reset: a word she has known for two months and
     briefly blanked on does not belong back at day one, and resetting it
     would throw away real evidence in favour of one moment of doubt. Three
     days is the cap because a lookup should always mean she meets it again
     this week.

     Idempotent within a day — twenty taps on the same card is one signal,
     which also means the points lockout and this cannot disagree. */
  var LOOK_CAP = 3;          /* days: a lookup means she sees it this week */

  function looked(key){
    if (!key || !enabled()) return null;
    var d = read(), k = scoped(key);
    var now = Date.now();
    var c = d[k];

    /* The lookup itself goes to the event log, not only to the schedule.

       This is the strongest signal in the app — she typed a word, chose one
       result out of 783, on purpose — and it was reaching the scheduler and
       stopping there. Steven could see that she opened the word list and
       nothing about what she could not remember.

       Recorded before the early returns below, because a word she looks up
       twice in a day is still evidence even when the schedule ignores the
       second one. */
    if (GH.events && GH.events.mark) GH.events.mark('look', key);

    if (!c){
      /* Never scheduled. Put it in the queue for tomorrow rather than
         today: she has just read the meaning, and asking her to recall it
         thirty seconds later tests her short-term memory and nothing
         else. */
      c = d[k] = blank();
      c.ivl = 1;
      c.due = now + DAY;
      c.looked = now;
      write();
      return { key:key, was:null, ivl:c.ivl };
    }

    if (c.looked && now - c.looked < DAY) return null;   /* once a day */

    var was = c.ivl;
    if (c.due <= now){ c.looked = now; write(); return null; }  /* already due */

    c.ivl = Math.max(1, Math.min(LOOK_CAP, Math.round(c.ivl / 2)));
    c.due = now + c.ivl * DAY;
    c.looked = now;
    write();
    return { key:key, was:was, ivl:c.ivl };
  }

  /* One answer. Updates the plain progress record, the schedule and the
     event log, so a game only has to call this.

     `from` is the activity that asked, and is optional: GH.events falls
     back to whatever app.js said was on screen. It exists so a caller that
     knows better than the screen can say so — nothing uses it yet. */
  /* `chose` rides through untouched: the scheduler does not care WHAT she
     answered, only whether it was right. It exists so the log can tell
     `der` for `die Tür` from `das` for `die Tür`, which is the difference
     between over-applying the masculine default and confusing two
     feminine-looking nouns. Passed on and never read here. */
  function grade(key, ok, from, chose){
    if (!key) return;
    if (GH.progress) GH.progress.record(key, ok);
    /* The log is the only record that holds the item, the activity and the
       outcome in one row. Guarded because it is a later file than this one
       and the app has to work without it. */
    if (GH.events) GH.events.grade(key, ok, from, chose);

    var d = read(), k = scoped(key);
    var c = d[k] || (d[k] = blank());
    var now = Date.now();

    /* Was this one of the items the progress screen was calling due?
       Asked before the card is updated, because grading it is what stops
       it being due — afterwards the answer is always no.

       Tested on `last` rather than `reps`: a card that has just lapsed
       has reps back at zero and is due immediately, and those are exactly
       the ones worth coming back for. A card never seen has last = 0 and
       is unmet rather than overdue, so it pays nothing. */
    var wasDue = !!(c.last && c.due <= now);

    if (ok){
      c.reps++;
      if (c.reps === 1)      c.ivl = FIRST;
      else if (c.reps === 2) c.ivl = SECOND;
      else                   c.ivl = Math.round(c.ivl * c.ease) || SECOND;
      c.ease = Math.min(2.8, c.ease + EASE_UP);
    } else {
      c.lapses++;
      c.reps = 0;
      c.ivl = 0;                                  /* due again immediately */
      c.ease = Math.max(EASE_MIN, c.ease - EASE_DOWN);
    }
    c.last = now;
    c.due = now + c.ivl * DAY;
    write();

    /* Taking the tutor's advice is worth something. Paid only when a due
       item is actually got right — a wrong answer leaves it due, so
       paying for that would pay for failing the same card all afternoon.
       coins.dueEarn() also refuses to pay the same item twice in a day. */
    if (wasDue && ok && GH.coins && GH.coins.dueEarn) GH.coins.dueEarn(key);

    /* the one place every answer in the app passes through, so the coach
       watches from here rather than each game having to remember to tell it */
    if (GH.coach) GH.coach.heard(key, ok);
  }

  /* How overdue something is, in days. Negative means not due yet, and
     never-seen counts as maximally due. */
  function overdue(key){
    var c = card(key);
    if (!c || !c.reps) return 999;
    return (Date.now() - c.due) / DAY;
  }

  function isDue(key){
    var c = card(key);
    return !c || !c.reps || c.due <= Date.now();
  }

  /* How badly she needs this one. Combines three things: whether the
     schedule says it is due, how shaky the recent record is, and how long
     since she last met it. Never-seen items sit in the middle rather than
     the top — a round of nothing but new material is as bad as a round of
     nothing but revision. */
  function need(key){
    var p = GH.progress ? GH.progress.get(key) : null;
    var c = card(key);

    if (!p || p.seen === 0) return 1.6;           /* new: worth showing, not urgent */

    var weak = 1 - p.recent;                      /* 0 solid, 1 hopeless */
    var od = overdue(key);
    var ready = od >= 0 ? Math.min(1, 0.4 + od / 7) : Math.max(0, 0.4 + od / 14);

    /* the gap between lifetime and recent is slippage — she knew this once */
    var slip = Math.max(0, p.lifetime - p.recent);

    var score = weak * 2 + ready * 1.5 + slip * 1.2;
    if (c && c.lapses >= 5) score += 0.4;         /* a leech deserves attention */
    return score;
  }

  /* Choose n items from a pool.

     `keyOf` turns a pool entry into its progress key. Entries with no key
     are treated as new. With the tutor off this is a plain shuffle, which
     is what every game did before.

     Selection is deliberately not "the n neediest". A round of pure
     weakness is demoralising and teaches nothing about what she has
     already got. So roughly two thirds comes from the needy end and the
     rest is drawn at random from everything else. */
  /* keyOf may return one key or several. Several is the useful case: a
     plural question is both a particular word and a particular pattern,
     and she can know das Kind perfectly while being lost on -er plurals
     in general. Averaging the two, with the pattern weighted lower,
     surfaces words that are individually fine but sit in a family she
     keeps failing. */
  function needOf(k){
    if (!k) return 1.6;
    if (typeof k === 'string') return need(k);
    if (!k.length) return 1.6;
    var item = need(k[0]);
    if (k.length === 1) return item;
    var rest = 0;
    for (var i = 1; i < k.length; i++) rest += need(k[i]);
    rest = rest / (k.length - 1);
    return item * 0.7 + rest * 0.3;
  }

  function pick(pool, n, keyOf){
    if (!pool || !pool.length) return [];
    if (!enabled() || !keyOf) return GH.text.shuffle(pool.slice()).slice(0, n);

    var scored = pool.map(function(x){
      return { x:x, need:needOf(keyOf(x)), r:Math.random() };
    });

    /* a little noise so the same round is not served twice running */
    scored.sort(function(a, b){ return (b.need + b.r * 0.5) - (a.need + a.r * 0.5); });

    var wanted = Math.min(n, pool.length);
    var fromNeed = Math.ceil(wanted * 0.65);
    var out = scored.slice(0, fromNeed).map(function(s){ return s.x; });

    var rest = GH.text.shuffle(scored.slice(fromNeed).map(function(s){ return s.x; }));
    out = out.concat(rest.slice(0, wanted - out.length));

    return GH.text.shuffle(out);
  }

  /* A round queue that brings missed items back before the end.

     Hand it the items for a round; it hands them out one at a time. A wrong
     answer puts that item back a few places down, so she meets it again in
     the same sitting after enough has passed that she has to remember it
     rather than repeat it. */
  function queue(items){
    var q = items.slice();
    var tries = new Map ? null : null;      /* keyed by identity below */
    var count = [];
    var subject = [];

    function seenCount(item){
      var i = subject.indexOf(item);
      return i < 0 ? 0 : count[i];
    }
    function bump(item){
      var i = subject.indexOf(item);
      if (i < 0){ subject.push(item); count.push(1); return 1; }
      return ++count[i];
    }

    return {
      next: function(){ return q.length ? q[0] : null; },
      size: function(){ return q.length; },
      done: function(item, ok){
        q.shift();
        if (ok || !enabled()) return;
        /* Twice is enough. A third failure means she does not know it
           today, and grinding the same card while the rest of the round
           waits teaches nothing — the scheduler has it due tomorrow
           anyway. Without this cap one stubborn item eats the session. */
        var n = bump(item);
        if (n > 2) return;
        q.splice(Math.min(n === 1 ? STEP_NEAR : STEP_FAR, q.length), 0, item);
      }
    };
  }

  /* What is waiting, for the hub and the progress screen. */
  function dueCount(prefix){
    var d = read(), now = Date.now(), n = 0;
    var mine = (GH.player ? GH.player.id() + ':' + GH.player.target() + ':' : '');
    Object.keys(d).forEach(function(k){
      if (mine && k.indexOf(mine) !== 0) return;
      var bare = mine ? k.slice(mine.length) : k;
      if (prefix && bare.indexOf(prefix + ':') !== 0) return;
      if (d[k].reps && d[k].due <= now) n++;
    });
    return n;
  }

  /* What is actually due, not just how many.

     dueCount() answered 'twelve' and kept the twelve to itself, which
     makes the number a fact rather than a thing to act on. This returns
     the items, most overdue first, so a screen can list them and offer
     to drill them.

     Only cards with reps: something never seen is not overdue, it is
     unmet, and mixing the two would report the whole vocabulary as due
     on day one. */
  function dueList(prefix, limit){
    var d = read(), now = Date.now(), out = [];
    var mine = (GH.player ? GH.player.id() + ':' + GH.player.target() + ':' : '');
    Object.keys(d).forEach(function(k){
      if (mine && k.indexOf(mine) !== 0) return;
      var bare = mine ? k.slice(mine.length) : k;
      if (prefix && bare.indexOf(prefix + ':') !== 0) return;
      var c = d[k];
      if (!c.reps || c.due > now) return;
      out.push({ key:bare, area:bare.split(':')[0],
                 over:(now - c.due) / DAY, ivl:c.ivl, lapses:c.lapses });
    });
    out.sort(function(a, b){ return b.over - a.over; });
    return limit ? out.slice(0, limit) : out;
  }

  /* Which game drills a given area, so a due row has somewhere to go. */
  function gameFor(area){
    return AREA_GAME[area] || null;
  }

  /* What has settled, not just how many.

     A card counts as settled at an interval of 21 days or more: it has
     survived being nearly forgotten and come back anyway, three times or
     so, which is the only evidence of memory the scheduler has.

     It is not permanent and should never be presented as such. Every
     settled item still has a due date, and getting it wrong on that day
     collapses the interval to nothing and puts it straight back into
     circulation. So each row carries when it next comes round, which is
     the honest answer to 'for how long'.

     Sorted by interval, longest first — the ones furthest from being
     forgotten at the top. */
  function matureList(limit){
    var d = read(), now = Date.now(), out = [];
    var mine = (GH.player ? GH.player.id() + ':' + GH.player.target() + ':' : '');
    Object.keys(d).forEach(function(k){
      if (mine && k.indexOf(mine) !== 0) return;
      var c = d[k];
      if (c.ivl < 21) return;
      out.push({ key: mine ? k.slice(mine.length) : k,
                 area: (mine ? k.slice(mine.length) : k).split(':')[0],
                 ivl: c.ivl,
                 days: Math.round((c.due - now) / DAY),
                 reps: c.reps, lapses: c.lapses });
    });
    out.sort(function(a, b){ return b.ivl - a.ivl; });
    return limit ? out.slice(0, limit) : out;
  }

  /* The threshold, exposed rather than repeated. Two places were already
     hardcoding a number and they disagreed. */
  var MATURE_DAYS = 21;

  function stats(){
    var d = read(), now = Date.now();
    var mine = (GH.player ? GH.player.id() + ':' + GH.player.target() + ':' : '');
    var tracked = 0, due = 0, young = 0, mature = 0, leeches = 0;
    Object.keys(d).forEach(function(k){
      if (mine && k.indexOf(mine) !== 0) return;
      var c = d[k];
      tracked++;
      if (c.reps && c.due <= now) due++;
      if (c.ivl >= MATURE_DAYS) mature++; else if (c.reps) young++;
      /* Anki calls a card a leech at eight lapses. Three was far too eager:
         over a few weeks almost everything trips it, and a screen saying
         thirty-five items are stubborn tells her nothing except that she
         is bad at German. */
      if (c.lapses >= 8) leeches++;
    });
    return { tracked:tracked, due:due, young:young, mature:mature, leeches:leeches };
  }

  /* What is worth doing right now, for the hub to offer.

     The scheduler already knows how many items are due and which area is
     weakest; without this it keeps that to itself and she has to go
     looking. A learner deciding whether to open the app at all will not
     first visit a progress screen.

     Returns the count due, the weakest area with enough history to judge,
     and the game that drills it — or null when there is genuinely nothing
     to say, which is better than manufacturing urgency. */
  /* Every value here must be an id an activity actually registers.

     `word` pointed at 'vocab' — but vocabgame is not an activity, it is
     mounted by the hub with a particular word set, so GH.app.find('vocab')
     has always returned null and every vocabulary row on the progress
     screen was dead while the verb rows worked. catch-word is the
     registered activity that drills word recognition across the whole
     vocabulary, so that is where a word goes. */
  /* WHICH GAME FOR A WEAK AREA.

     This used to be a table written by hand, and it was wrong in a way that
     is easy to miss: it said `word: 'catch-word'`, one game per area. Four
     games grade `word:` keys — catch-word, listen-pick, mehrzahl and
     placement — so three of them could never be suggested for weak
     vocabulary however much they would have helped.

     Every activity now declares `teaches` in its registration entry, read
     off the grade() calls it actually makes, so this is computed. A game
     added next month is a candidate without anything here being edited, and
     a game that stops grading an area stops being suggested for it.

     The hand-written table stays as a fallback for the two areas no game
     declares — `sent` is graded by fill-blank, which app.js mounts directly
     and which has no registration entry to declare anything in. */
  var AREA_FALLBACK = {
    sent:'scramble', word:'catch-word', topic:'catch-word'
  };

  function gamesFor(area){
    var out = [];
    if (GH.app && GH.app.list){
      GH.app.list().forEach(function(a){
        if ((a.teaches || []).indexOf(area) >= 0) out.push(a.id);
      });
    }
    if (!out.length && AREA_FALLBACK[area]) out.push(AREA_FALLBACK[area]);
    return out;
  }

  /* Of the games that teach this area, the one she has NOT just played.

     Without this, `whatNext()` names catch-word every day that vocabulary
     is weakest, which is both boring and a worse way to learn than meeting
     the same words through a different door. The event log knows what she
     opened and when; without it this falls back to the first candidate,
     which is the old behaviour. */
  function freshestFor(area){
    var list = gamesFor(area);
    if (list.length < 2) return list[0] || null;
    if (!GH.events || !GH.events.acts) return list[0];

    var lastSeen = {};
    GH.events.acts().forEach(function(e){
      if (e.kind === 'open') lastSeen[e.id] = e.t;
    });
    /* never opened first, then longest ago */
    list.sort(function(a, b){ return (lastSeen[a] || 0) - (lastSeen[b] || 0); });
    return list[0];
  }
  var SKILL_GAME = {
    plural:'mehrzahl', 'case':'wo-wohin', wordorder:'scramble',
    conjugation:'conjugate', gender:'gender', tense:'conveyor',
    listening:'listen-pick', recognition:'catch-word', cloze:null,
    sentences:null, wrongform:'wrong-form'
  };

  function whatNext(){
    if (!enabled()) return null;
    var due = dueCount();

    /* the weakest area that has been met often enough to mean something */
    var worst = null, worstRate = 1;
    (GH.progress.areas() || []).forEach(function(a){
      var sum = GH.progress.summary(a);
      if (sum.items < 3 || sum.seen < 12) return;
      if (sum.recent < worstRate){ worstRate = sum.recent; worst = a; }
    });

    var game = null, label = null;
    if (worst === 'skill'){
      /* skill holds several different things, so look inside it */
      var rows = GH.progress.area('skill')
        .filter(function(r){ return r.seen >= 6; });
      if (rows.length){
        var w = rows[0];                       /* area() sorts worst first */
        game = SKILL_GAME[w.key.split(':')[1]];
        label = w.key.split(':')[1];
      }
    } else if (worst){
      game = freshestFor(worst);
      label = worst;
    }

    if (!due && (!worst || worstRate > 0.75)) return null;
    return { due:due, area:label, name:areaName(label),
             rate:worstRate, game:game };
  }

  /* What to call an area out loud.

     Building a key by capitalising the area name gave 'pvTopic' where the
     key was 'pvTopics', and a missing key comes back as itself rather than
     as nothing — so the fallback never fired and the raw key went on
     screen. An explicit map cannot do that. */
  var AREA_NAME = {
    word:'nxAreaWords', topic:'nxAreaTopics', conj:'nxAreaVerbs',
    person:'nxAreaPersons', gender:'nxAreaGender', 'case':'nxAreaCase',
    plural:'nxAreaPlural', order:'nxAreaOrder', tense:'nxAreaTense',
    verbkind:'nxAreaVerbs', 'tense-bin':'nxAreaTense', sent:'nxAreaOrder',
    wordorder:'nxAreaOrder', conjugation:'nxAreaVerbs',
    listening:'nxAreaListening', recognition:'nxAreaWords',
    cloze:'nxAreaSentences', sentences:'nxAreaSentences',
    wrongform:'nxAreaVerbs'
  };

  function areaName(a){
    return a && AREA_NAME[a] ? GH.i18n.t(AREA_NAME[a]) : '';
  }

  function forget(key){
    var d = read();
    delete d[scoped(key)];
    write();
  }

  function reset(){
    cache = {};
    write();
  }

  return {
    grade: grade,
    looked: looked,
    gamesFor: gamesFor,
    freshestFor: freshestFor,
    pick: pick,
    queue: queue,
    need: need,
    needOf: needOf,
    isDue: isDue,
    overdue: overdue,
    card: card,
    dueCount: dueCount,
    dueList: dueList,
    matureList: matureList,
    matureDays: MATURE_DAYS,
    gameFor: gameFor,
    whatNext: whatNext,
    stats: stats,
    enabled: enabled,
    setEnabled: setEnabled,
    forget: forget,
    reset: reset
  };
})();
