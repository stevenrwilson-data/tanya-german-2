/* js/coins.js */
/* Crystals — the currency.

   A number that goes up and can be exchanged for something. What it buys
   is deliberately not decided here — this is the ledger and the earning
   rules, and anything can register itself as a thing to spend on.

   IT WAS KRONEN, AND THIS FILE SPENT A LONG TIME SAYING SO AFTER IT WAS
   NOT TRUE. Steven replaced Kronen with crystals: crystals read the same
   in every language, and `die Krone` taught Tanya a word she has no use
   for. Every string she actually sees has said crystals for a while —
   `krSingular` / `krPlural` in js/i18n.js are Kristall/Kristalle,
   кристалл/кристаллов, Crystal/Crystals — but a dozen comments in here
   still described Kronen, including the header, which is the single most
   misleading place in the file for it to be wrong. Fixed 06 Sep.

   THE KEY NAMES `krSingular` AND `krPlural` ARE LEFT ALONE. They are
   vestigial and they read oddly, but they are read by this file and by
   several activities, and renaming a translation key is a rename in four
   language blocks plus every call site for no behavioural gain. If they
   ever move, they move as their own pass.

   THE EARNING RATE is the part worth getting right, because it decides
   what the game rewards. Paying by score would reward grinding the
   easiest level of the easiest game, which is the opposite of useful. So
   crystals come from finishing, from accuracy, from beating your own
   record, and from turning up on a new day — none of which are improved
   by playing badly for longer.

   Roughly twenty to thirty a day for someone practising properly, which
   means a fifty-crystal thing is a couple of days and a two-hundred one
   is a fortnight. Grinding is possible but tedious enough that it is not
   the obvious route.

   Per player, like everything else, so two people on one iPad keep
   separate purses. */
window.GH = window.GH || {};

GH.coins = (function(){

  var KEY = 'gh-coins-v1';

  /* The rate.

     Ten crystals an exercise, and a hundred more once five are done in a
     day. So a full day is 5 x 10 + 100 = 150, and the bonus is worth more
     than the exercises that earn it.

     That shape is deliberate. Paying by score would reward grinding the
     easiest level; paying a flat rate per exercise would make ten short
     rounds worth the same as five proper ones on ten different days. The
     bonus is what makes the day the unit rather than the round, and it
     cannot be reached by opening the app and answering one question.

     A legendary pet costs 9,000 — sixty full days. Two months of turning
     up, which is the point.

     Above five exercises she still earns ten each, so a long session is
     not wasted; it simply cannot substitute for tomorrow. */
  var PER_EXERCISE = 10;
  var DAILY_TARGET = 5;
  var DAILY_BONUS  = 100;

  /* Answering something the scheduler says is due.

     The tutor has been picking what she sees for weeks and has never once
     been worth anything. This pays for taking its advice: the first due
     item cleared in a day is worth 10, every one after it 5.

     Front-loaded on purpose. The first one is the hard one — it is the
     decision to open the progress screen and do what it says rather than
     playing whatever game is nearest. After that she is already there,
     and 5 apiece is enough to keep going without turning a review queue
     into a grind worth more than the exercises themselves.

     Paid once per item per day. A wrong answer sets the interval to zero
     and the card is immediately due again, so without that the same item
     could be failed repeatedly for money. */
  var DUE_FIRST = 10;
  var DUE_MORE  = 5;

  /* The log was capped at 60 entries and dropped the rest in silence. At
     five exercises a day that is under two weeks, and nothing outside this
     file ever read it — so it was a ring buffer sized for a display that
     does not exist, throwing away the only record of what was earned.

     Two changes. The cap is a real number and what it drops is counted, so
     a truncated log cannot be read as a complete one. And SPENDS go in
     their own list: she will buy sixteen pets and two slots in her life,
     against thousands of earnings, and a shared array evicts the eighteen
     things worth keeping to make room for the ten-kronen entries.

     Sizes measured the same way as the event log: an entry serialises to
     about 42 bytes, so 5,000 earnings is around 210KB — roughly two years
     at eight money events a day. 500 spends will not be reached. */
  var LOG_CAP   = 5000;
  var SPEND_CAP = 500;

  /* How many finished days the per-day archive keeps, for the progress
     screen's rolling week. 120 is months more than the 7 anything reads
     today — cheap to keep, and there the day it is needed for a longer
     view without a second decision about how much history to throw away. */
  var DAYS_CAP = 120;

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

  function purse(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = { n:0, lifetime:0, log:[], spends:[], lost:0,
                          day:'', done:0, gotBonus:false, dayCoins:0, days:{},
                          spends:[], lost:0,
              fullDays:0, fullRun:0, bestRun:0, lastFull:'', passes:0,
                          dueDay:'', duePaid:{}, dueN:0 };
    var p = d[id];
    if (!p.duePaid) { p.duePaid = {}; p.dueN = 0; p.dueDay = ''; }
    /* Purses written before this existed have neither field. */
    if (!p.spends) p.spends = [];
    if (typeof p.lost !== 'number') p.lost = 0;
    /* Purses written before the rolling week existed have neither field —
       today's tally starts from zero rather than guessing at a past she
       was never tracked for. */
    if (!p.days) p.days = {};
    if (typeof p.dayCoins !== 'number') p.dayCoins = 0;
    return p;
  }

  /* Roll `p.day` forward to today, archiving whatever the day now ending
     actually added up to.

     Every function that credits crystals calls this first, rather than one
     of them owning the rollover — award() and awardPart() used to each
     carry their own copy of this check, which is how the archive would
     have gone stale on any day that opened with a due-item answer or a
     testing grant instead of a finished round. One place now, called from
     all of them, so `p.day` can never be behind `today()` when a credit
     is about to be recorded against it. */
  function rollDay(p){
    if (p.day === today()) return;
    if (p.day){
      if (!p.days) p.days = {};
      p.days[p.day] = { done:p.done || 0, coins:p.dayCoins || 0, full:!!p.gotBonus };
      var keys = Object.keys(p.days);
      if (keys.length > DAYS_CAP){
        keys.sort(function(a, b){ return new Date(a) - new Date(b); });
        keys.slice(0, keys.length - DAYS_CAP).forEach(function(k){ delete p.days[k]; });
      }
    }
    p.day = today();
    p.done = 0;
    p.part = 0;
    p.gotBonus = false;
    p.dayCoins = 0;
  }

  /* Every push went through its own copy of the trim, which is how four
     places ended up agreeing on the wrong number. One function now. */
  function note(p, row){
    p.log.push(row);
    if (p.log.length > LOG_CAP){
      p.lost += p.log.length - LOG_CAP;
      p.log = p.log.slice(-LOG_CAP);
    }
  }

  /* ---------- THE CURRENCY'S OWN MARK ----------

     Steven, 05 Sep: the `\u25c8` character was a placeholder and is
     replaced with real art.

     WEBP, AND I ARGUED FOR SVG FIRST AND WAS WRONG. The argument was that
     a mark used from 14px to 26px should be vector so it is crisp at
     every size. That is right for a flat glyph and wrong for this art:
     the crystal is a SHADED illustration, and a vector version of it came
     back as 66 flat polygons that read as a crude trace. At 26px the
     shading is the only thing carrying the shape, so the format that
     keeps the shading wins.

     The size argument that pushed me to SVG turns out not to apply. The
     mark never renders larger than 1.6rem — about 26 CSS pixels, on the
     Crystals balance; everything else is 0.9rem to 1.1rem. So a 96x96
     export is already 3x for the largest instance on the densest phone,
     and it lands at a few KB rather than the 700KB the source PNG is,
     which is resolution nothing will ever see.

     LOSSY WEBP WITH ALPHA, not lossless. WebP has a full 8-bit alpha
     channel, so the anti-aliased crystal tips survive; lossy compresses
     the colour and keeps the alpha near-exact, which is the difference
     between 6KB and 700KB. Same reasoning petart.js gives for the pets:
     "a pet with a white box around it cannot sit on a coloured card".

     THE ONE THING THIS COSTS is tinting. The character picked up `color`
     wherever it sat — `--sand-deep` in the purse, `--flame` while the
     balance counts up after a payout, `--flame-pale` on achievement rows,
     `--fg-accent` on the Crystals page. A raster cannot do that, so the
     mark is now one fixed colour everywhere. Only the count-up one
     mattered, because the colour change was the signal she had just been
     paid; purse.js animates that instead now.

     HERE, in coins.js, because the currency's own module should own its
     symbol. It was written out as a literal in five files — app.js,
     purse.js, store.js, awards-view.js, crystals.js, eleven places — so
     replacing the art meant eleven edits and missing one meant two
     different currencies on screen. Now it is one constant.

     WORKS BEFORE THE FILE EXISTS. `mark()` returns an <img> that falls
     back to the character if the SVG 404s, so nothing looks broken today
     and everything upgrades the moment Steven drops the file in. Set
     MARK_SRC to '' to force the character everywhere.

     `markText()` is for the places that build a plain string rather than
     elements — a button label, an aria-label — where an <img> cannot go. */
  var MARK_SRC = 'images/ui/crystal.webp';
  var MARK_CHAR = '\u25c8';

  function markText(){ return MARK_CHAR; }

  function mark(cls){
    var span = document.createElement('span');
    span.className = 'crystal-mark' + (cls ? ' ' + cls : '');
    span.setAttribute('aria-hidden', 'true');
    if (!MARK_SRC){ span.textContent = MARK_CHAR; return span; }
    var img = document.createElement('img');
    img.alt = '';
    img.src = GH.build ? GH.build.url(MARK_SRC) : MARK_SRC;
    /* Not drawn yet is a normal state until it is. */
    img.addEventListener('error', function(){
      span.textContent = MARK_CHAR;
    });
    span.appendChild(img);
    return span;
  }

  /* `mark()` plus a number, which is what almost every caller wanted. */
  function markWith(n, cls){
    var wrap = document.createElement('span');
    wrap.className = 'crystal-n' + (cls ? ' ' + cls : '');
    wrap.appendChild(mark());
    var v = document.createElement('span');
    v.textContent = String(n);
    wrap.appendChild(v);
    return wrap;
  }

  function balance(){ return purse().n; }
  function lifetime(){ return purse().lifetime; }

  function today(){ return new Date().toDateString(); }

  /* Work out what a finished round is worth and pay it.

     `r` is a run from GH.run, or anything with answered / right / best.
     `opts.record` says a personal best was set. Returns a breakdown so the
     end screen can show where the coins came from — a number that appears
     without explanation is not a reward, it is a notification. */
  /* One finished exercise. Returns a breakdown so the end screen can show
     where the crystals came from and how close the day's bonus is — a number
     that appears without explanation is a notification, not a reward. */
  /* How many exercises a round is worth.

     Ten answers is one exercise, which is what a normal round of anything
     is. Beyond that a round is genuinely longer work and pays for it: a
     long story is 60 blanks and a topic set can be 69, against a plural
     round's ten. Capped at three, because the day is meant to be five
     sittings rather than one enormous one, and because an uncapped rule
     would let a single long session buy a full day.

     Passed as `opts.units` when a caller knows better — a lesson knows its
     own worth from its steps and does not need to count answers. */
  function unitsFor(r){
    var n = (r && r.answered) || 0;
    if (n >= 40) return 3;
    if (n >= 20) return 2;
    return 1;
  }

  function award(game, r, opts){
    opts = opts || {};
    var p = purse();
    var lines = [];

    if (!r || !r.answered){
      var idle = pending; pending = 0;
      if (idle) lines.push({ key:'coDueBonus', n:idle });
      return { total:idle, lines:lines, done:dayCount(), need:DAILY_TARGET };
    }

    /* roll the day over before counting into it */
    rollDay(p);

    /* one unit is one exercise: ten crystals and one of the five */
    var units = opts.units || unitsFor(r);
    if (units < 1) units = 1;

    p.done = (p.done || 0) + units;
    var total = PER_EXERCISE * units;
    lines.push({ key:'coExercise', n:total, units:units });

    /* the bonus, once, on the fifth */
    if (p.done >= DAILY_TARGET && !p.gotBonus){
      p.gotBonus = true;
      total += DAILY_BONUS;
      lines.push({ key:'coDailyBonus', n:DAILY_BONUS });
      /* a day that reached the target is the day that counts towards pets
         and achievements. Opening the app is not practising. */
      p.fullDays = (p.fullDays || 0) + 1;
      /* settle() has already charged for any gap and moved `lastFull` to
         today, so a run that survived a decay CONTINUES from where the
         decay left it rather than starting again at 1. That is the whole
         point: 87 after a long weekend, not 1. */
      settle();
      p.fullRun = (p.lastFull && sameOrNextDay(p.lastFull, today()))
        ? (p.fullRun || 0) + 1 : 1;
      if (p.fullRun > (p.bestRun || 0)) p.bestRun = p.fullRun;
      p.lastFull = today();
      maybePass(p);
    }

    /* what the due items in this round were worth, already banked by
       dueEarn(), reported here so the screen can show where it came from */
    var fromDue = pending;
    pending = 0;
    if (fromDue) lines.push({ key:'coDueBonus', n:fromDue });

    p.n += total;
    p.lifetime += total;
    p.dayCoins = (p.dayCoins || 0) + total;
    note(p, { t:Date.now(), game:game, n:total });
    write();

    /* The tour's starter bonus, if she is owed one and this is the game
       she was owed it for. Read after write() flushes the round's own
       payment, so the two entries in the log land in the order they
       actually happened. */
    var sbN = starterBonus(game);
    if (sbN) lines.push({ key:'coStarterBonus', n:sbN });

    /* THE DAILY QUESTS. Here and nowhere else: award() is the single
       funnel every scored activity finishes through, so one line covers
       all of them and no activity had to learn that quests exist.

       AFTER this function's own write(), so the quest payment lands in
       the log behind the round's payment rather than in front of it —
       same ordering reason the starter bonus is read here.

       `opts.tag` is how an activity with easy and hard parts says WHICH
       part she did: the reader passes its tier, Word Lab its stage. Every
       other caller passes nothing, which matches any quest for it.

       questDay.saw() is written to be unable to throw — an unknown game,
       a missing pool file, a cleared store all return 0. It runs inside
       the payment path of the entire app and must never be the reason a
       round fails to pay. */
    var qN = (GH.questDay && GH.questDay.saw) ? GH.questDay.saw(game, opts.tag) : 0;
    if (qN) lines.push({ key:'coQuest', n:qN });

    /* fromDue is already in the balance, so it is added to the reported
       total rather than to `total` before the purse is credited */
    return { total:total + fromDue + sbN + qN, lines:lines, done:p.done, need:DAILY_TARGET,
             bonusToday:!!p.gotBonus, due:fromDue };
  }

  /* Part of an exercise.

     Listening to a dialogue is worth five crystals and half of one of the
     day's five tasks: two listens make a task. award() cannot express
     that — it forces `units` to a minimum of one, so a half would pay a
     whole ten and count a whole task.

     The half is not stored as a fraction. `p.done` stays an integer
     everywhere, and the leftover lives in `p.part`, which rolls over into
     a whole task when it reaches `per`. Every screen that reads `done`
     keeps reading a whole number and none of them needed changing.

     `per` is how many of these make one task. It is passed in rather than
     fixed at two, but `p.part` is a single counter: if a second activity
     ever uses this with a different `per`, the two will share it. There
     is one caller today and this comment is the warning.

     Returns the same shape as award() so the caller can show the same
     breakdown. */
  function awardPart(game, n, per){
    var p = purse();
    var lines = [];

    /* THE QUESTS SEE THIS PATH TOO. A comic unit finishes through
       awardPart() and never through award(), so a quest for finishing one
       would never have completed. Comic calls this twice on purpose (see
       its own note) — harmless here, because a quest already marked done
       pays nothing the second time. */
    var qN = (GH.questDay && GH.questDay.saw) ? GH.questDay.saw(game, '') : 0;
    if (qN) lines.push({ key:'coQuest', n:qN });
    rollDay(p);

    var total = n;
    lines.push({ key:'coPart', n:n });

    p.part = (p.part || 0) + 1;
    if (p.part >= (per || 2)){
      p.part = 0;
      p.done = (p.done || 0) + 1;
      if (p.done >= DAILY_TARGET && !p.gotBonus){
        p.gotBonus = true;
        total += DAILY_BONUS;
        lines.push({ key:'coDailyBonus', n:DAILY_BONUS });
        p.fullDays = (p.fullDays || 0) + 1;
        settle();
        p.fullRun = (p.lastFull && sameOrNextDay(p.lastFull, today()))
          ? (p.fullRun || 0) + 1 : 1;
        if (p.fullRun > (p.bestRun || 0)) p.bestRun = p.fullRun;
        p.lastFull = today();
        maybePass(p);
      }
    }

    p.n += total;
    p.lifetime += total;
    p.dayCoins = (p.dayCoins || 0) + total;
    note(p, { t:Date.now(), game:game, n:total });
    write();
    /* qN is added here and not to `total` above, for the same reason the
       due bonus is: it has already been credited by earn() inside
       questDay.saw(), so adding it to `total` before the purse is
       credited would pay it twice. */
    return { total:total + qN, lines:lines, done:p.done, need:DAILY_TARGET,
             part:p.part, per:(per || 2), bonusToday:!!p.gotBonus, due:0 };
  }

  /* Was `then` yesterday or today relative to `now`? Compared as dates
     rather than by elapsed hours, so practising at 11pm and again at 8am
     is two days, which is what she would call it. */
  function sameOrNextDay(then, now){
    var a = new Date(then), b = new Date(now);
    var diff = Math.round((b - a) / 86400000);
    return diff === 0 || diff === 1;
  }

  /* ================= THE STREAK, AND WHAT A MISSED DAY COSTS =============

     IT USED TO RESET TO 1. Miss one day at day eighty-nine and three
     months were gone. `bestRun` banked the peak so the pets stayed
     reachable, but the number she looks at every day went to zero, and
     that number is the one that makes her open the app.

     So it decays instead, and the rate SLOWS the longer she is away —
     which is the opposite of a punishment curve and deliberate. The first
     days off cost least, because the first days off are the ones that
     happen to everyone: a bad week, a trip, flu.

         days 1 to 3      1 a day
         days 4 to 11     2 a day
         day 12 onward    3 a day, and never more

     A 90-day run survives a long weekend at 87, a fortnight at 68, and a
     month at 14. It cannot be wiped out by one bad patch, and it cannot be
     kept for ever by disappearing either.

     ---------------------------------------------------------------------
     THE FREE PASS

     One earned every ten consecutive days, and spent automatically on the
     first day she misses — before any decay is worked out. So a ten-day
     habit buys one guilt-free day, and a hundred-day habit has ten of them
     banked against a bad fortnight.

     Spent silently rather than asked about. A dialog that says "use a pass?"
     on the morning she already feels bad about missing is a dialog that
     makes her feel worse. She is told afterwards, on the hub. */
  var DECAY = [
    { upTo: 3,        perDay: 1 },
    { upTo: 11,       perDay: 2 },
    { upTo: Infinity, perDay: 3 }
  ];
  var PASS_EVERY = 10;      /* one earned per this many consecutive days */
  var PASS_COVERS = 3;      /* days of absence ONE pass absorbs */
  var PASS_CAP    = 5;      /* how many she can bank */
  var PASS_CASH   = 300;    /* what an eleventh pass is worth instead */

  /* What n missed days costs, as the sum of each day's own rate. */
  function decayFor(n){
    var lost = 0, i, b;
    for (i = 1; i <= n; i++){
      for (b = 0; b < DECAY.length; b++){
        if (i <= DECAY[b].upTo){ lost += DECAY[b].perDay; break; }
      }
    }
    return lost;
  }

  function daysBetween(then, now){
    var a = new Date(then), b = new Date(now);
    return Math.round((b - a) / 86400000);
  }

  /* Bring the run up to date. Called before anything READS or WRITES it, so
     the number is never stale — a streak that only decays when she opens a
     game would sit there looking healthy for a month.

     Returns what happened, so the hub can say so once. */
  function settle(){
    var p = purse();
    if (!p.lastFull) return null;
    var gap = daysBetween(p.lastFull, today());
    /* 0 is today, 1 is yesterday — the run is intact either way. */
    if (gap <= 1) return null;

    var missed = gap - 1;
    var used = 0;
    /* ONE PASS COVERS UP TO THREE DAYS, not one. So a long weekend costs a
       single pass, and the five she can bank are worth a fortnight rather
       than five days — which is what makes them feel like protection rather
       than small change.

       Spent whole: a pass used on one day off is the same pass used on
       three. Not hoarded on her behalf, because deciding for her that one
       day "is not worth a pass" would let the streak fall while she had
       protection sitting unused, and she would be right to be annoyed. */
    while (missed > 0 && (p.passes || 0) > 0){
      p.passes--;
      missed -= PASS_COVERS;
      used++;
    }
    if (missed < 0) missed = 0;

    var lost = decayFor(missed);
    var was = p.fullRun || 0;
    p.fullRun = Math.max(0, was - lost);
    /* The clock restarts from today whatever happened, so the same absence
       is never charged for twice. */
    p.lastFull = today();
    save();
    return { missed:missed, used:used, lost:Math.min(lost, was),
             was:was, now:p.fullRun };
  }

  /* One pass per ten consecutive days. Checked when the run grows. */
  /* Earned on every tenth consecutive day. Over the cap it becomes money
     instead, so a long unbroken run is never wasted — she cannot bank a
     sixth pass, and reaching day sixty should still be worth something.

     Returns what she got, so the end screen can say which it was. */
  function maybePass(p){
    if (!p.fullRun || p.fullRun % PASS_EVERY !== 0) return null;
    if ((p.passes || 0) < PASS_CAP){
      p.passes = (p.passes || 0) + 1;
      return { pass:true, n:p.passes };
    }
    /* Full. Paid as crystals rather than dropped on the floor.

       `p.n` IS THE BALANCE. My first version credited `p.coins`, which does
       not exist on the purse — it would have added 300 to a field nothing
       reads and she would never have seen the money. Checked against the
       shape rather than assumed.

       `note()` so it appears in her history like every other credit; a
       silent 300 looks like a bug to the person receiving it. */
    p.n += PASS_CASH;
    p.lifetime += PASS_CASH;
    note(p, { t:Date.now(), game:'streak-pass', n:PASS_CASH });
    return { pass:false, coins:PASS_CASH };
  }

  function passes(){ return purse().passes || 0; }

  function dayCount(){
    var p = purse();
    return p.day === today() ? (p.done || 0) : 0;
  }

  /* The last `n` calendar days, oldest first, today last — for the
     progress screen's rolling week.

     `rollDay` is called first so a day that has had no credits at all yet
     (she has not opened the app today) still archives correctly once she
     does, and so today's live tally — not yet written into `p.days` — is
     read from the purse itself rather than missed. Past days come from the
     archive; a day with no entry there (no activity, or older than
     DAYS_CAP) reads as zeros rather than as an error. */
  function lastDays(n){
    var p = purse();
    rollDay(p);
    var out = [], i, d, key, rec;
    n = n || 7;
    for (i = n - 1; i >= 0; i--){
      d = new Date();
      d.setDate(d.getDate() - i);
      key = d.toDateString();
      if (key === p.day){
        rec = { done:p.done || 0, coins:p.dayCoins || 0, full:!!p.gotBonus };
      } else {
        rec = (p.days || {})[key] || { done:0, coins:0, full:false };
      }
      out.push({ date:key, done:rec.done, coins:rec.coins, full:!!rec.full,
                 isToday:(i === 0) });
    }
    return out;
  }

  /* Days that reached the target, and the longest run of them.

     This is what pets and achievements are gated on, not days the app was
     opened. A day is a day when five exercises were done. */
  function fullDays(){ return purse().fullDays || 0; }
  function bestRun(){
    settle();
    var p = purse();
    /* a run that ended yesterday still stands; one older than that is over */
    var live = p.lastFull && sameOrNextDay(p.lastFull, today()) ? (p.fullRun || 0) : 0;
    return Math.max(p.bestRun || 0, live);
  }
  /* Settled first, so what she is shown is what she has — a run that decayed
     while she was away must not look healthy until she happens to finish a
     round. */
  function runToday(){
    settle();
    var p = purse();
    return p.lastFull && sameOrNextDay(p.lastFull, today()) ? (p.fullRun || 0) : 0;
  }

  /* One item the scheduler had marked due, now answered.

     Called from tutor.grade(), which is the single point every answer in
     the app passes through. Returns what it paid, or 0 — either because
     this item has already paid today, or because it was not due.

     `pending` accumulates within a round so the end screen can report the
     total in its breakdown rather than the balance silently ticking up.
     A number that appears without explanation is a notification, not a
     reward. */
  var pending = 0;

  function dueEarn(key){
    if (!key) return 0;
    var p = purse();
    rollDay(p);
    if (p.dueDay !== today()){ p.dueDay = today(); p.duePaid = {}; p.dueN = 0; }
    if (p.duePaid[key]) return 0;

    p.duePaid[key] = 1;
    var pay = p.dueN === 0 ? DUE_FIRST : DUE_MORE;
    p.dueN++;
    p.n += pay;
    p.lifetime += pay;
    p.dayCoins = (p.dayCoins || 0) + pay;
    note(p, { t:Date.now(), game:'due', n:pay });
    write();
    pending += pay;
    return pay;
  }

  /* How many due items she has cleared today, for anything that wants to
     say so out loud. */
  function dueToday(){
    var p = purse();
    return p.dueDay === today() ? (p.dueN || 0) : 0;
  }

  /* ---------- the tour's starter bonus ----------

     Waddles ends the quick tour by having her pick where to start, and
     promises an extra bonus for FINISHING that one activity — not for
     opening it. So the promise has to survive the trip from the tour
     overlay to wherever award() is eventually called, which can be several
     screens and any amount of time later.

     One flag, one game id, cleared the moment it pays. She can only ever
     be owed one starter bonus at a time — picking a second destination
     before finishing the first would silently discard the promise rather
     than stack it, and that is the right failure: two half-finished
     bonuses is worse than the one she was actually told about. */
  var SB_KEY = 'gh-starter-bonus';

  function sbRead(){
    try {
      var raw = window.localStorage.getItem(SB_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e){ return null; }
  }

  /* `game` may be a single id ('reader'), or left falsy for "whatever she
     finishes first" — the tour's "Play a Game" choice cannot name one game,
     since she has eleven to pick from once she gets there, and the promise
     was to reward finishing one of them, not a specific one. */
  function setStarterBonus(game, amount){
    if (!amount) return;
    try {
      window.localStorage.setItem(SB_KEY, JSON.stringify({ game:game || '', n:amount }));
    } catch (e){}
  }

  function clearStarterBonus(){
    try { window.localStorage.removeItem(SB_KEY); } catch (e){}
  }

  /* Called from award() once a real round for `game` has been paid. Adds
     its own line and its own total on top, rather than folding into
     `total` before award() returns — so the end screen can say "and a
     bonus for finishing this" as a separate fact rather than a mysteriously
     larger number. */
  function starterBonus(game){
    var sb = sbRead();
    if (!sb) return 0;
    if (sb.game && sb.game !== game) return 0;
    clearStarterBonus();
    var p = purse();
    rollDay(p);
    p.n += sb.n;
    p.lifetime += sb.n;
    p.dayCoins = (p.dayCoins || 0) + sb.n;
    note(p, { t:Date.now(), game:'starter-bonus', n:sb.n });
    write();
    return sb.n;
  }

  /* A flat payment, for anything that is not a finished round —
     achievements mostly. Kept separate from award() so the round formula
     stays the only thing that decides what a round is worth. */
  function earn(n, why){
    if (!n) return 0;
    var p = purse();
    rollDay(p);
    p.n += n;
    p.lifetime += n;
    p.dayCoins = (p.dayCoins || 0) + n;
    note(p, { t:Date.now(), game:why || 'award', n:n });
    write();
    return n;
  }

  /* Spending. Returns false and changes nothing if she cannot afford it,
     so a caller can offer the thing and let this refuse. */
  function spend(n, what){
    var p = purse();
    if (n > p.n) return false;
    p.n -= n;
    /* Both lists. The log keeps the running order of everything; `spends`
       keeps the purchases where thousands of ten-kronen earnings cannot
       push them out. */
    var row = { t:Date.now(), spent:what, n:-n };
    note(p, row);
    p.spends.push(row);
    if (p.spends.length > SPEND_CAP) p.spends = p.spends.slice(-SPEND_CAP);
    write();
    return true;
  }

  function afford(n){ return purse().n >= n; }

  /* Things that can be bought. Register from anywhere:

       GH.coins.offer({ id:'extra-time', cost:30, key:'shopTime',
                        onBuy:function(){ ... } });

     Nothing is registered yet, deliberately. The shop appears only when
     there is something in it. */
  var goods = [];

  function offer(item){
    if (!item || !item.id) return;
    for (var i = 0; i < goods.length; i++){
      if (goods[i].id === item.id){ goods[i] = item; return; }
    }
    goods.push(item);
  }

  function shop(){ return goods.slice(); }

  /* Has she bought this before? For one-off unlocks. */
  function owns(id){
    var p = purse();
    return (p.owned || []).indexOf(id) >= 0;
  }

  function keep(id){
    var p = purse();
    if (!p.owned) p.owned = [];
    if (p.owned.indexOf(id) < 0) p.owned.push(id);
    write();
  }

  function recent(n){
    return purse().log.slice(-(n || 10)).reverse();
  }

  /* ---------- THE PER-DAY ARCHIVE, READABLE AT LAST ----------

     `p.days` has been written on every day roll since this file was built
     and nothing has ever read it. DAYS_CAP's own comment said 120 days is
     "months more than the 7 anything reads today — cheap to keep, and
     there the day it is needed for a longer view". The Crystals screen is
     that day.

     Returns the last `n` days ENDING TODAY, oldest first, with a row for
     every date whether or not she practised — a week with a gap in it has
     to render as a gap and not as a shorter week. Today is included live
     from `p.dayCoins`, since it has not rolled into the archive yet.

     Each row: { day, coins, done, full, today }. Dates are the
     `toDateString()` form the archive is keyed by, because inventing a
     second date format here is how the two drift. */
  function days(n){
    var p = purse();
    var want = n || 7;
    var out = [];
    var now = new Date();
    var i, d, key, rec;
    for (i = want - 1; i >= 0; i--){
      d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      key = d.toDateString();
      if (key === today()){
        out.push({ day:key, coins:(p.day === today() ? (p.dayCoins || 0) : 0),
                   done:(p.day === today() ? (p.done || 0) : 0),
                   full:(p.day === today() ? !!p.gotBonus : false), today:true });
      } else {
        rec = (p.days || {})[key];
        out.push({ day:key, coins:(rec && rec.coins) || 0,
                   done:(rec && rec.done) || 0,
                   full:!!(rec && rec.full), today:false });
      }
    }
    return out;
  }

  /* The best single day, over a window of days or over everything kept.
     `null` when she has never earned anything, which the screen shows as
     nothing rather than as a best of zero. */
  function bestDay(withinDays){
    var p = purse();
    var all = p.days || {};
    var best = null;
    var cutoff = null;
    if (withinDays){
      var c = new Date();
      cutoff = new Date(c.getFullYear(), c.getMonth(), c.getDate() - (withinDays - 1));
    }
    Object.keys(all).forEach(function(k){
      if (cutoff && new Date(k) < cutoff) return;
      var v = all[k] && all[k].coins;
      if (!v) return;
      if (!best || v > best.coins) best = { day:k, coins:v };
    });
    /* Today counts too, and is not in the archive yet. */
    if (p.day === today() && (p.dayCoins || 0) > 0){
      if (!best || p.dayCoins > best.coins) best = { day:today(), coins:p.dayCoins };
    }
    return best;
  }

  function reset(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    d[id] = { n:0, lifetime:0, log:[], day:'', done:0, gotBonus:false,
              dayCoins:0, days:{},
              spends:[], lost:0,
              fullDays:0, fullRun:0, bestRun:0, lastFull:'', passes:0,
              dueDay:'', duePaid:{}, dueN:0 };
    pending = 0;
    write();
  }

  /* 1 Kristall, 2 Kristalle, 0 Kristalle — and 1 кристалл against
     2 кристаллов. Getting this wrong on the hub would quietly teach her
     the wrong plural, which is worse than showing no word at all. The
     key names still say `kr`; see the note in the header. */
  function label(n){
    if (n === undefined) n = balance();
    return n + ' ' + GH.i18n.t(n === 1 ? 'krSingular' : 'krPlural');
  }

  return {
    balance: balance, lifetime: lifetime, label: label,
    dayCount: dayCount, fullDays: fullDays, lastDays: lastDays,
    bestRun: bestRun, runToday: runToday,
    passes: passes, settle: settle, decayFor: decayFor,
    passRules: function(){ return { every:PASS_EVERY, covers:PASS_COVERS,
                                    cap:PASS_CAP, cash:PASS_CASH }; },
    award: award, awardPart: awardPart, earn: earn, spend: spend, afford: afford,
    setStarterBonus: setStarterBonus,
    dueEarn: dueEarn, dueToday: dueToday,
    offer: offer, shop: shop, owns: owns, keep: keep,
    recent: recent, reset: reset, days: days, bestDay: bestDay,
    mark: mark, markWith: markWith, markText: markText,
    spends: function(){ return purse().spends.slice(); },
    lost: function(){ return purse().lost; },
    logAll: function(){ return purse().log.slice(); },
    unitsFor: unitsFor,
    rates: { per:PER_EXERCISE, target:DAILY_TARGET, bonus:DAILY_BONUS,
             fullDay:DAILY_TARGET * PER_EXERCISE + DAILY_BONUS,
             dueFirst:DUE_FIRST, dueMore:DUE_MORE }
  };
})();
