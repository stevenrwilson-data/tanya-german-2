/* The event log.

   The app already knew two things and could not join them.

   `gh-progress-v1` knew that `der Kühlschrank` is at 40% over her last
   twelve attempts. It did not know which game asked, because
   GH.tutor.grade(key, ok) was never told.

   `gh-coins-v1` knew that she played listen-pick at 21:40. It kept the
   last SIXTY entries and nothing about what was answered, so at five
   exercises a day it forgot the fortnight before last.

   So neither could answer the only question worth asking — what is
   actually helping her — because that needs one row holding the item, the
   activity and the outcome together. This file is that row.

   ------------------------------------------------------------------
   WHAT IS RECORDED

     ANSWERS   t | game | key | ok | dev | level | think | chose
               One per graded answer. `key` is the tutor's own key —
               'word:342', 'topic:kitchen', 'skill:listening' — so the log
               joins straight onto gh-progress-v1 and gh-sched-v1 with no
               translation.
     VISITS    a day number per day the app was opened.

   Visits are separate and are NOT derived from answers, because a day she
   opened the app and did nothing is exactly as interesting as a day she
   practised — more so, if it happens twice in a row.

   `t` is milliseconds, not a day number. A day number is five characters
   against thirteen and loses the time of day, which is the difference
   between knowing she practises and knowing she practises at eleven at
   night when she is tired. 6,000 events is a few hundred KB against a 5MB
   budget; the saving was not worth the blindness.

   ------------------------------------------------------------------
   HOW THE ACTIVITY IS KNOWN

   Not by editing forty-five grade() calls across twenty files — that is
   forty-five chances to pass the wrong name or forget. app.js hands every
   activity off through launch(), and that is where the current activity is
   set. One place, and a game added next month is attributed without being
   told to be.

   The cost of doing it there: everything a screen grades is attributed to
   that screen, so fill-blank opened on a story and fill-blank opened on a
   topic set are both 'fill-blank'. That is the right grain for `what is
   helping her` and the wrong grain for `which story`. The story is
   recoverable from the keys.

   ------------------------------------------------------------------
   IT IS PERSONAL DATA

   This is a dated record of everything she got wrong. It never leaves the
   device — there is no server and nothing is transmitted — but anything
   that exports it should say what it is in plain words rather than being
   labelled 'Export'.

   ------------------------------------------------------------------
   FAILING QUIETLY IS NOT AN OPTION, AND NEITHER IS FAILING LOUDLY

   localStorage throws when it is full. A log that throws mid-round would
   lose her the round to save a statistic, which is the wrong trade every
   time. So a write failure sets `stopped` and the log gives up
   permanently, silently to her and visibly to anyone reading the file.

   And when the cap is reached the oldest events go, but `dropped` counts
   them — so nobody reads a truncated log as a complete one. */

window.GH = window.GH || {};

GH.events = (function(){

  var KEY = 'gh-events-v1';
  /* Answers kept per profile.

     Measured, not guessed: 6,000 events serialise to 196KB, so 20,000 is
     about 650KB. Two profiles is 1.3MB against a 5MB origin budget that
     also holds the purse, the pets, the schedule and the progress record —
     comfortable, with room for the rest to grow.

     At fifty answers a day that is over a year of history. The old 6,000
     was four months, which is not long enough to see a season. */
  var CAP = 20000;

  /* Activity rows: opens, leaves, impressions, finishes. Perhaps forty a
     day against the answer log's fifty, so a smaller cap is plenty — and
     `tally` keeps the counts when these roll off. */
  var ACT_CAP = 8000;

  var cache = null;
  var stopped = false;     /* storage refused a write; stop trying */
  var current = '';        /* the activity being used right now */
  var lastGrade = 0;       /* when she last answered, for the think gap */
  var shownAt = 0;         /* when the current question went up, if a game said */

  /* ---------- which device ----------

     Phone, tablet or desktop, as one character on every row. On the row
     rather than in a table of its own because the question worth asking is
     not "does she use a phone" — it is whether she does DIFFERENT things on
     each. Listening on the phone and typing on the laptop is a fact about
     the app's design; a device list on its own is trivia.

     Two characters per row against a 5MB budget is nothing.

     NOT user-agent sniffing. An iPad in Safari reports itself as a
     Macintosh and has done since iPadOS 13, so any UA test calls her tablet
     a desktop. `maxTouchPoints` is the signal Apple did not disguise: a Mac
     reports 0, every iPad reports 5.

         p  phone     coarse pointer, short side under 500px
         t  tablet    coarse pointer, larger than that
         d  desktop   fine pointer and no touch
         ?  unknown   nothing to go on

     Measured once per load. A screen does not become a phone mid-session,
     and rotating it must not look like a new device — hence the SHORT side
     rather than the width. */
  var device = null;

  function dev(){
    if (device) return device;
    try {
      /* `(pointer: coarse)` asks about the PRIMARY pointer, and that is the
         right question. A touchscreen laptop reports maxTouchPoints of ten
         and is still a desktop, because the thing she actually points with
         is a trackpad — testing for the presence of touch calls it a
         tablet, which is how the first version of this got it wrong.

         Touch presence is only the fallback, for a browser with no
         matchMedia at all. */
      var mm = window.matchMedia;
      var coarse;
      if (mm){
        coarse = !!mm('(pointer: coarse)').matches;
      } else {
        coarse = (navigator.maxTouchPoints || 0) > 0 || ('ontouchstart' in window);
      }
      if (!coarse){ device = 'd'; return device; }
      var w = window.screen ? window.screen.width : window.innerWidth;
      var h = window.screen ? window.screen.height : window.innerHeight;
      var small = Math.min(w || 0, h || 0);
      device = small && small < 500 ? 'p' : 't';
    } catch (e){ device = '?'; }
    return device;
  }

  function slot(){
    return (GH.player && GH.player.id)
      ? GH.player.id() + ':' + GH.player.target()
      : 'solo';
  }

  function read(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : {};
    } catch (e){ cache = {}; }
    return cache;
  }

  function mine(){
    var d = read(), s = slot();
    if (!d[s]) d[s] = { ev:[], days:[], dropped:0, from:Date.now() };
    var m = d[s];
    if (!m.ev) m.ev = [];
    if (!m.days) m.days = [];
    if (!m.sess) m.sess = [];
    if (!m.act) m.act = [];
    if (!m.tally) m.tally = {};
    if (typeof m.dropped !== 'number') m.dropped = 0;
    return m;
  }

  function save(){
    if (stopped) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(cache));
    } catch (e){
      /* Full, or private browsing. Give up rather than throw into the
         middle of a round. */
      stopped = true;
    }
  }

  /* Days since 1970 in LOCAL time, so a day boundary is midnight where she
     is rather than in UTC. The same arithmetic coach.js uses when it
     compares toDateString(). */
  function dayOf(ms){
    var d = new Date(ms);
    return Math.floor((d - d.getTimezoneOffset() * 60000) / 86400000);
  }

  function today(){ return dayOf(Date.now()); }

  /* ---------- writing ---------- */

  /* Which activity is on screen. Set by app.js at the hand-off. Cleared
     rather than left stale: an answer with no activity is honest, an answer
     attributed to the last screen she was on is a lie in the data. */
  function setGame(id){ current = id || ''; currentLevel = ''; lastGrade = 0; }

  /* WHICH LEVEL A ROUND WAS.

     `open` recorded the activity and not the level, so the log could see a
     hundred rounds of `gender` and nothing about whether she played `agree`
     or `all`. That made adaptive difficulty impossible: the tutor cannot
     choose a level from evidence it does not have.

     It also answers a question that blocked the tutor this morning. Array
     order is NOT the difficulty climb — verified against each game's own
     hearts count, and wrong for four of the eight games. With accuracy
     recorded PER LEVEL, the climb stops being a guess: the order falls out
     of how often she gets each one right.

     Games call this when a round begins. Absent means the activity has no
     levels, which is different from an unrecorded one. */
  var currentLevel = '';

  function setLevel(id){ currentLevel = id || ''; }
  function game(){ return current; }

  /* One graded answer. `game` is optional — the caller may know better
     than the current screen — and falls back to it. */
  /* `chose` is WHAT SHE PICKED when she was wrong, and it is the field this
     log was missing.

     `ok:false` says she missed `word:342`. It does not say she answered
     *der* for *die Tür* — which is a different error from answering *das*.
     One is over-applying the masculine default, the other is confusing two
     feminine-looking nouns, and they want different teaching. Same for
     case: *dem* for *den* is the case, *die* for *den* is the gender.

     RECORDED ON RIGHT ANSWERS TOO. It looked redundant — a correct answer's
     choice is derivable from the key — but only by joining against
     vocab.js, and only for some games. Stored, the row is self-contained:
     `der` beside `gender:14` and `ok:1` says what right WAS, without
     needing the bank to interpret it. Six characters a row against a 650KB
     budget, and it means a year of history can be read by anything that can
     split a string.

     Games that do not know what she picked pass nothing and the field is
     empty, which is different from zero.

     No pipes: the row is pipe-delimited, so a choice containing one would
     split into two fields and shift everything after it. */
  /* A GAME SAYING "THE QUESTION IS NOW ON SCREEN".

     Called from the paint that shows a question, once per question. Turns
     `think` into the time from the question appearing to her answering it,
     rather than the gap since her last answer.

     Cheap to be wrong about: calling it twice just uses the later time,
     never calling it falls back to the gap, and calling it and then never
     grading leaves a stale timestamp that the NEXT grade would consume — so
     `clear()` exists for a game that paints a question and then leaves. */
  function shown(){
    if (stopped) return;
    shownAt = Date.now();
  }
  function clearShown(){ shownAt = 0; }

  function grade(key, ok, from, chose){
    if (stopped || !key) return;
    var m = mine();
    /* HOW LONG SHE TOOK.

       A word answered correctly in one second is known. The same word
       answered correctly in nine is recalled, or guessed. Every spaced
       repetition system worth the name uses that, and it was not recorded.

       Measured as the gap since her previous answer in the same activity,
       which needs no change at any of the fourteen call sites — the
       alternative was threading a timestamp through every game.

       Zero on the first answer of a round, because there is nothing to
       measure from. Capped at two minutes: beyond that she put the phone
       down, and a five-minute gap is not five minutes of thinking. */
    var now = Date.now();

    /* TWO WAYS TO MEASURE, AND THE BETTER ONE WHERE IT EXISTS.

       The gap since her previous answer is what this always used, and it
       needs nothing from the games. But it includes everything the app did
       in between — painting, and in Listen and Pick speaking a whole
       sentence aloud. On that screen the "thinking" was mostly listening.

       So a game can call `events.shown()` when it puts a question up, and
       the measurement runs from there instead: the time from the question
       appearing to her answering it. Games that do not call it fall back to
       the gap exactly as before, so nothing had to be changed to keep
       working.

       `src` records WHICH measure it was, because comparing a shown-based
       1.4s against a gap-based 1.4s from another game would be comparing
       two different things. */
    var think, src;
    if (shownAt){
      think = Math.min(now - shownAt, 120000);
      src = 'q';
      shownAt = 0;
    } else {
      think = lastGrade ? Math.min(now - lastGrade, 120000) : 0;
      src = think ? 'g' : '';
    }
    lastGrade = now;

    var pick = '';
    if (chose !== undefined && chose !== null && chose !== ''){
      pick = String(chose).replace(/\|/g, '/').slice(0, 40);
    }
    m.ev.push([now, (from || current || '?'), key, ok ? 1 : 0,
               dev(), currentLevel, think ? Math.round(think / 100) : '',
               pick, src].join('|'));
    /* A lifetime count that the cap never touches.

       app.js measures a bounce by comparing the answer count on the way in
       and on the way out. Using `ev.length` for that works until the cap is
       reached, at which point the length stops rising and EVERY activity
       looks like a bounce for ever. */
    m.total = (m.total || 0) + 1;
    if (m.ev.length > CAP){
      m.dropped += m.ev.length - CAP;
      m.ev = m.ev.slice(-CAP);
    }
    save();
  }

  /* One per day the app was opened.

     Called from app.js on arrival at the hub and NOT gated on anything.
     coach.js counts a day inside greeting(), which app.js only calls when
     the coach is unmuted — so muting the encouraging sentence silently
     stopped the attendance count and the streak. This does not have that
     bug because it is not attached to anything she can turn off. */
  function visit(){
    if (stopped) return;
    var m = mine(), d = today();

    /* One session row per DEVICE per day, with the viewport.

       Separate from `days` for two reasons. A day she opened the app on
       both her phone and her laptop is one day and two sessions, and
       collapsing that loses the more interesting half. And the viewport is
       worth keeping: whether she ever sees the two-column song list is a
       layout question nothing else in the app can answer.

       `days` stays a plain list of numbers, so everything already reading
       it keeps working. */
    var here = d + '|' + dev();
    var seen = false, i;
    for (i = m.sess.length - 1; i >= 0 && i > m.sess.length - 12; i--){
      if (m.sess[i].split('|').slice(0, 2).join('|') === here){ seen = true; break; }
    }
    if (!seen){
      m.sess.push([d, dev(), (window.innerWidth || 0),
                   (window.innerHeight || 0)].join('|'));
      if (m.sess.length > 800) m.sess = m.sess.slice(-800);
    }

    if (!(m.days.length && m.days[m.days.length - 1] === d)) m.days.push(d);
    save();
  }

  /* ---------- what she opened, what she never saw ----------

     The answer log records ANSWERS, so an activity she opened and backed
     straight out of left no trace at all — nothing was graded. "Never
     discovered" and "opened it once and hated it" were the same row:
     absent. They need completely different fixes, so they need to be
     different rows.

     Four events, and between them they separate the four reasons content
     goes unused:

       seen    the tile was on screen        never seen -> not discovered
       open    the activity was entered      seen, never opened -> the tile
                                             does not sell it
       leave   with how many answers         opened, zero answers -> it puts
                                             her off on sight
       finish  a round reached its end       opened often, rarely finished ->
                                             too hard, or too long

     `act` holds the rows and is capped like everything else. `tally` holds
     the counts and is NOT capped — thirty keys, a few hundred bytes, and it
     survives the day the raw rows start rolling off. The coins log taught
     that lesson: a capped record with no running total silently forgets. */

  function bump(id, field){
    if (!id) return;
    var m = mine();
    var t = m.tally[id] || (m.tally[id] = { seen:0, open:0, bounce:0, finish:0, answers:0 });
    t[field] = (t[field] || 0) + 1;
    return t;
  }

  function note(id, kind, n, extra){
    if (stopped || !id) return;
    var m = mine();
    var row = [Date.now(), kind, id, (n === undefined ? '' : n), dev()];
    /* Only appended when there is something to append, so every existing
       row shape is untouched. */
    if (extra !== undefined && extra !== '') row.push(extra);
    m.act.push(row.join('|'));
    if (m.act.length > ACT_CAP){
      m.actDropped = (m.actDropped || 0) + (m.act.length - ACT_CAP);
      m.act = m.act.slice(-ACT_CAP);
    }
  }

  /* A tile was on screen. Once per session per tile — twenty scrolls past
     the same tile is one impression, not twenty, or the count measures
     scrolling rather than exposure. */
  var sawThisSession = {};

  function seen(id){
    if (stopped || !id) return;
    var key = today() + ':' + dev() + ':' + id;
    if (sawThisSession[key]) return;
    sawThisSession[key] = 1;
    bump(id, 'seen');
    note(id, 's');
    save();
  }

  /* She entered the activity. */
  function opened(id){
    if (stopped || !id) return;
    bump(id, 'open');
    note(id, 'o');
    save();
  }

  /* She left it. `n` is how many answers happened while she was in there,
     which is the whole point: n === 0 is a bounce and there is no other way
     to see one. */
  /* HOW LONG SHE STAYED.

     The duration was always derivable — an `open` row and a `leave` row
     each carry a timestamp — but only while both rows are inside the cap,
     and only if something reads them as a pair. So the seconds are TOTALLED
     in the tally as well, where nothing can roll off.

     `ms` comes from app.js, which is the only place that knows when the
     activity was entered.

     THIRTY MINUTES IS THE CEILING. A phone put down mid-round with the tab
     still open would otherwise record four hours of study, and one such
     visit would swamp every real number in the file. Anything longer is
     counted as thirty minutes and the excess is tallied separately in
     `overlong`, so the distortion is visible rather than silent. */
  var VISIT_CAP_MS = 30 * 60 * 1000;

  function left(id, n, ms){
    if (stopped || !id) return;
    var t = bump(id, 'answers');
    t.answers = (t.answers - 1) + (n || 0);      /* bump added one; undo it */
    if (!n) bump(id, 'bounce');

    if (ms > 0){
      var capped = Math.min(ms, VISIT_CAP_MS);
      t.secs = (t.secs || 0) + Math.round(capped / 1000);
      if (ms > VISIT_CAP_MS) t.overlong = (t.overlong || 0) + 1;
    }

    /* The row carries the seconds too, so a reader can see the shape of
       her visits and not only the total. `n` already holds the answer
       count, so this is a sixth field — v1 to v4 rows have five and read
       back with `secs` undefined, which is correct for them. */
    note(id, 'l', n || 0, ms > 0 ? Math.round(Math.min(ms, VISIT_CAP_MS) / 1000) : '');
    save();
  }

  /* SOMETHING HAPPENED THAT IS NOT AN ANSWER.

     Fourteen activities grade nothing — the songs, the dialogues, the
     comics, the word list, the dictionary, the store. Opens and leaves were
     recorded, so the log knew she went into the songs and came out, and
     nothing about which song, whether she played it, or how far she got.
     The entire read-and-listen half of the app was a black box.

     `mark(kind, what)` fills that in with one call per event rather than a
     bespoke schema per activity. `kind` is a short verb — play, hear, look,
     buy — and `what` names the thing. Rides in the same `act` rows, so the
     cap, the device field and the upload all work unchanged.

     Deliberately NOT once per day like `seen`: playing a song twice is two
     plays and that is the interesting number. */
  function mark(kind, what, n){
    if (stopped || !kind) return;
    var m = mine();
    m.act.push([Date.now(), kind, (what || ''), (n === undefined ? '' : n), dev()].join('|'));
    if (m.act.length > ACT_CAP){
      m.actDropped = (m.actDropped || 0) + (m.act.length - ACT_CAP);
      m.act = m.act.slice(-ACT_CAP);
    }
    /* Counted in the tally too, so the totals survive the cap. Prefixed to
       keep them apart from activity ids. */
    bump(kind + ':' + (what || '?'), 'open');
    save();
  }

  /* A round reached the end screen, which is the one definition of
     finishing that every game already agrees on. */
  function finished(id){
    if (stopped || !id) return;
    bump(id, 'finish');
    note(id, 'f');
    save();
  }

  /* ---------- reading ---------- */

  function all(){
    return mine().ev.map(function(row){
      var p = row.split('|');
      return {
        t:+p[0], day:dayOf(+p[0]), game:p[1], key:p[2], ok:p[3] === '1',
        /* rows written before the device field existed have four parts */
        dev: p.length > 4 ? p[4] : '?',
        /* v6: the level the round was on, and tenths of a second of
           thinking. Both undefined on older rows, which is a different
           fact from empty or zero. */
        level: p.length > 5 && p[5] !== '' ? p[5] : undefined,
        think: p.length > 6 && p[6] !== '' ? +p[6] / 10 : undefined,
        /* v7: what she picked, right or wrong. Undefined only where the
           game does not know, and on every row written before this. */
        chose: p.length > 7 && p[7] !== '' ? p[7] : undefined,
        /* v7: how the time was measured. 'q' is from the question appearing
           — the real one. 'g' is the gap since her last answer, which
           includes whatever the app did in between. Undefined means there
           was no measurement at all, which is the first answer of a round. */
        timing: p.length > 8 && p[8] !== '' ? p[8] : undefined
      };
    });
  }

  function days(){ return mine().days.slice(); }

  /* ---------- the diagnosis ----------

     `tally` per activity, and the four questions it answers. Read these
     rather than the raw rows: they survive the cap and they are cheap. */

  function tally(id){
    var t = mine().tally;
    if (id) return t[id] ? JSON.parse(JSON.stringify(t[id])) : null;
    return JSON.parse(JSON.stringify(t));
  }

  /* SHE KEEPS BOUNCING OFF THIS ONE.

     Opened two or more times, never finished. Two rather than one because
     everybody opens something by accident once; twice is a pattern, and by
     the third time offering her the how-to or an easier level is help
     rather than nagging.

     `worst first`, so a caller can take the head of the list and act on it.
     `answers` is included because bouncing with zero answers every time is
     a different problem from grinding through half a round and quitting —
     the first is the level screen, the second is the length. */
  function troubled(minOpens){
    var need = minOpens || 2;
    var t = mine().tally, out = [];
    Object.keys(t).forEach(function(id){
      var x = t[id];
      if (x.open >= need && !x.finish){
        out.push({ id:id, opens:x.open, bounces:x.bounce,
                   answers:x.answers, finishes:0,
                   kind: x.bounce >= x.open ? 'bounces' : 'gives-up' });
      }
    });
    out.sort(function(a, b){ return b.opens - a.opens; });
    return out;
  }

  /* SEEN AND NEVER CHOSEN. The tile is on screen and she goes past it, so
     the name, the glyph or the subtitle is not selling it. */
  function ignored(){
    var t = mine().tally, out = [];
    Object.keys(t).forEach(function(id){
      if (t[id].seen >= 3 && !t[id].open) out.push({ id:id, seen:t[id].seen });
    });
    out.sort(function(a, b){ return b.seen - a.seen; });
    return out;
  }

  /* NEVER ON SCREEN AT ALL. Not disliked — never found. The caller passes
     everything that exists, because this file only knows what it has been
     told about, and the whole point of this one is the things it has not. */
  function undiscovered(allIds){
    var t = mine().tally;
    return (allIds || []).filter(function(id){ return !t[id] || !t[id].seen; });
  }

  /* FINISHED AT LEAST ONCE, so she has actually met it. */
  function tried(){
    var t = mine().tally;
    return Object.keys(t).filter(function(id){ return t[id].finish > 0; });
  }

  /* [{ day, dev, w, h }] — one per device per day. */
  function sessions(){
    return mine().sess.map(function(row){
      var p = row.split('|');
      return { day:+p[0], dev:p[1], w:+p[2], h:+p[3] };
    });
  }

  /* How much of her practice happened on each device, and which games.
     This is the reason the device is on the row at all. */
  function byDevice(){
    var out = {};
    all().forEach(function(e){
      var d = out[e.dev] || (out[e.dev] = { n:0, right:0, games:{} });
      d.n++;
      if (e.ok) d.right++;
      d.games[e.game] = (d.games[e.game] || 0) + 1;
    });
    return out;
  }
  function count(){ return mine().ev.length; }
  /* Answers ever, ignoring the cap. This is the one to compare against. */
  function graded(){ return mine().total || 0; }
  function dropped(){ return mine().dropped; }
  function halted(){ return stopped; }
  function since(){ return mine().from; }

  /* Everything for this profile, ready to be written to a file by whatever
     exports it. `v` is the schema, `build` the cache version, so a file
     opened in three months says which app produced it. */
  function dump(){
    var m = mine();
    return {
      /* 6: `level` and `think` on answer rows — which level the round was,
         and how long since her previous answer. Without the level, adaptive
         difficulty is impossible; without the think time, a word recalled
         instantly and one dragged up after nine seconds look identical.
         5: durations. `leave` rows gained a sixth field, seconds, and the
         tally gained `secs` and `overlong`. app.js also records a leave on
         visibilitychange and pagehide, so the last activity of a session is
         no longer lost.
         4 added mark() rows and the coins summary, and was the first
         version in which the 17 grammar lessons graded at all; 3 added
         `act` and `tally`; 2 added the device field and sessions; a v1 file
         has four-part answer rows and neither. */
      v: 6,
      build: (function(){
        var s = document.querySelector('script[src*="?v="]');
        var hit = s && s.getAttribute('src').match(/\?v=(\d+)/);
        return hit ? +hit[1] : 0;
      })(),
      slot: slot(),
      from: m.from,
      days: m.days.slice(),
      sess: m.sess.slice(),
      act: m.act.slice(),
      tally: m.tally,
      actDropped: m.actDropped || 0,
      device: dev(),
      dropped: m.dropped,
      total: m.total || 0,
      stopped: stopped,

      /* THE ECONOMY, which lived in a different store and never left the
         device.

         Whether the pets motivate anything is a real question, and the coin
         log is the only evidence for it. A summary rather than the whole
         log: the balance, what she has ever earned, how many full days she
         has had, and her best run. Four numbers instead of five thousand
         rows.

         Wrapped because coins.js may not have loaded — the log must never
         be the thing that breaks. */
      coins: (function(){
        if (!GH.coins) return null;
        try {
          return {
            balance: GH.coins.balance(),
            lifetime: GH.coins.lifetime(),
            fullDays: GH.coins.fullDays(),
            bestRun: GH.coins.bestRun(),
            today: GH.coins.dayCount(),
            spends: GH.coins.spends().length,
            lost: GH.coins.lost()
          };
        } catch (e){ return null; }
      })(),

      ev: m.ev.slice()
    };
  }

  function reset(){
    var d = read();
    delete d[slot()];
    cache = d;
    stopped = false;
    save();
  }

  return {
    setGame:setGame, game:game,
    grade:grade, visit:visit, shown:shown, clearShown:clearShown,
    all:all, days:days, sessions:sessions, byDevice:byDevice, dev:dev,
    seen:seen, opened:opened, left:left, finished:finished, mark:mark,
    setLevel:setLevel,
    tally:tally, troubled:troubled, ignored:ignored,
    undiscovered:undiscovered, tried:tried,
    acts:function(){
      return mine().act.map(function(row){
        var p = row.split('|');
        return { t:+p[0], day:dayOf(+p[0]),
                 kind:{ s:'seen', o:'open', l:'leave', f:'finish' }[p[1]] || p[1],
                 /* anything else is a mark(): play, hear, look, buy */
                 id:p[2], n:p[3] === '' ? null : +p[3], dev:p[4],
                 /* seconds, on leave rows from v5 onward. Undefined on
                    older rows, which is different from zero. */
                 secs:p.length > 5 && p[5] !== '' ? +p[5] : undefined };
      });
    },
    count:count, graded:graded, dropped:dropped,
    halted:halted, since:since, dump:dump, reset:reset,
    cap:CAP
  };
})();
