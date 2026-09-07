/* js/questday.js */
/* The daily crystal quests — drawing them, noticing them, paying them.

   NAMED `questday`, NOT `quests`, on purpose: `data/quests.js` is the
   pool and two files with one name in different folders is banned in this
   project. It has broken the site twice — data/vocab.js against an
   activity also called vocab.js, then data/songs.js against songs.js —
   because whichever loads second wins and the first silently does
   nothing.

   ------------------------------------------------------------------
   WHAT IT PAYS, AND THE ONE PLACE THOSE NUMBERS LIVE

   Steven: "Say five points each for individual quests and an extra 10
   point bonus for doing all of them!" So QUEST_PAY and ALL_BONUS below,
   and PER_DAY for how many are drawn. Nothing else in the app knows these
   numbers — the Crystals screen reads them from here, the way it reads
   the rest of the economy from coins.js.

   ------------------------------------------------------------------
   THE SAME THREE ALL DAY

   Drawn once per day and stored, not chosen per paint. A set that
   reshuffled when she reopened the page would let her fish for easy ones,
   and worse, a quest she had half-finished could vanish mid-round.

   The draw is SEEDED from the date and the profile id rather than
   Math.random(), so the same day always produces the same three even if
   the store is cleared, and two people on one iPad get different sets on
   the same day.

   ------------------------------------------------------------------
   HOW A QUEST COMPLETES

   `coins.award()` is the single funnel every scored activity finishes
   through, so the hook is one line there, at the very end after its own
   write() has flushed. Nothing else had to be touched — except the two
   activities with easy and hard parts, which now pass a `tag`:

     reader    the tier id, so only 'short' counts
     wordlab   's' + stage index, so only the first three count

   An activity that passes no tag matches any quest for it, which is every
   other one.

   ------------------------------------------------------------------
   PAID ONCE, AND NOT FARMABLE

   A quest is marked done the first time it fires and pays nothing on the
   second. The all-three bonus pays once. Both flags live in the same
   day record, so a day roll clears them together and there is no way for
   one to survive without the other.
*/

window.GH = window.GH || {};

GH.questDay = (function(){

  var KEY = 'gh-quests-v1';

  var PER_DAY    = 3;    /* how many are drawn — Steven: "three or four" */
  var QUEST_PAY  = 5;    /* each */
  var ALL_BONUS  = 10;   /* for finishing all of them */

  var cache = null;

  function pool(){ return window.GH_QUESTS || []; }

  function today(){ return new Date().toDateString(); }

  function who(){ return (GH.player && GH.player.id) ? GH.player.id() : 'solo'; }

  function scoped(){
    /* Scoped by profile AND by target language, the same as every other
       progress key — see player.js. Her quests are not Nazar's, and a
       Spanish course would not inherit German's. */
    return (GH.player && GH.player.scope) ? GH.player.scope(KEY) : KEY;
  }

  function read(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(scoped());
      cache = raw ? JSON.parse(raw) : null;
    } catch (e){ cache = null; }
    if (!cache) cache = { day:'', pick:[], done:{}, hits:{}, allPaid:false };
    if (!cache.hits) cache.hits = {};
    return cache;
  }

  function write(){
    try { window.localStorage.setItem(scoped(), JSON.stringify(cache)); }
    catch (e){}
  }

  /* ---------- the draw ----------

     A small deterministic hash of the date and the profile, so the same
     day gives the same three without storing anything, and clearing the
     store does not hand her a fresh set to pick from. */
  function seedOf(str){
    var h = 0, i;
    for (i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return Math.abs(h) || 1;
  }

  function draw(){
    /* `hard:true` rows are written but not eligible — see the note in
       data/quests-data.js. Filtered at DRAW time and not at completion
       time, deliberately: a quest already drawn must go on working even
       if its flag changes under her mid-day. */
    var list = pool().filter(function(q){ return !q.hard; });
    if (!list.length) return [];
    var seed = seedOf(today() + ':' + who());
    /* A seeded shuffle: pull items out at a position the seed decides,
       advancing the seed each time. Not cryptographic and does not need to
       be — it needs to be the same tomorrow morning as it was tonight. */
    var out = [], n;
    while (list.length && out.length < PER_DAY){
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      n = seed % list.length;
      out.push(list[n].id);
      list.splice(n, 1);
    }
    return out;
  }

  /* Rolls the day if it has changed, then hands back the record. */
  function state(){
    var d = read();
    if (d.day !== today()){
      d.day = today();
      d.pick = draw();
      d.done = {};
      d.hits = {};
      d.allPaid = false;
      write();
    }
    /* A day whose draw came back empty — the pool file missing, say —
       gets another go rather than being stuck with nothing all day. */
    if (!d.pick || !d.pick.length){
      d.pick = draw();
      if (d.pick.length) write();
    }
    return d;
  }

  /* ---------- HOW MANY IT TAKES ----------

     Steven: "I think stuff that earns 5 pts counts as a daily task after
     you do 2. So the crystal quests should require 2."

     Exactly right, and it applies to one activity. Listening to a
     dialogue pays 5 and half a daily task — `awardPart('dialogue', 5, 2)`
     in talkview.js, where LISTENS_PER_TASK is 2 — so a quest satisfied by
     one listen would be worth five crystals for half the work every other
     quest in the pool asks for. Songs pay 10 and comic units 20, both
     whole tasks, so both stay at one.

     Declared per quest rather than derived from the payment: `awardPart`
     does not tell the quest what it paid, and reading the activity's own
     constants from here would mean this file knowing about talkview's
     internals. A number in the row is honest and visible. */
  function needOf(q){
    return (q && q.need > 1) ? q.need : 1;
  }

  function byId(id){
    var list = pool(), i;
    for (i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  /* ---------- what the screen asks for ---------- */

  /* Today's three, in draw order, each with whether it is finished.
     `label` is the raw multilingual object; the caller picks the
     language, the same as every other data file in the app. */
  function todays(){
    var d = state();
    var out = [];
    (d.pick || []).forEach(function(id){
      var q = byId(id);
      if (!q) return;                 /* a quest removed from the pool */
      out.push({ id:id, label:q.label, done:!!d.done[id],
                 need:needOf(q), got:Math.min(needOf(q), d.hits[id] || 0) });
    });
    return out;
  }

  function allDone(){
    var list = todays();
    if (!list.length) return false;
    return list.every(function(q){ return q.done; });
  }

  function rules(){
    return { perDay:PER_DAY, pay:QUEST_PAY, all:ALL_BONUS,
             max:PER_DAY * QUEST_PAY + ALL_BONUS };
  }

  /* ---------- completion ----------

     Called from coins.award(). Returns what it paid, so award() can put
     it in the end screen's breakdown alongside the round's own payment.

     Deliberately tolerant: an unknown game, a null tag, no pool at all —
     every one of those returns 0 and changes nothing. This runs inside
     the payment path of every activity in the app and must never be the
     reason one of them throws. */
  function saw(game, tag){
    if (!game) return 0;
    var d;
    try { d = state(); } catch (e){ return 0; }

    var paid = 0, marked = false;
    (d.pick || []).forEach(function(id){
      if (d.done[id]) return;
      var q = byId(id);
      if (!q) return;
      /* `act` is an exact match; `pre` is a prefix, for the activities
         whose award id carries which one it was. A grammar lesson pays as
         `lesson:haben-sein`, so no fixed string can match it and a quest
         for "finish a grammar lesson" has to match the family. */
      if (q.pre){ if (String(game).indexOf(q.pre) !== 0) return; }
      else if (q.act !== game) return;
      /* The difficulty fence. A quest with `only` needs the tag to be one
         of the listed ones — no tag means the activity did not say which
         part she did, and an unproven claim does not complete a quest
         that exists to exclude the hard parts. */
      if (q.only && q.only.length){
        if (!tag || q.only.indexOf(tag) < 0) return;
      }
      /* Counted, then completed. A quest needing two pays on the second
         and nothing on the first — she sees "1 of 2" on the Crystals
         page in between, so the progress is visible rather than silent. */
      d.hits[id] = (d.hits[id] || 0) + 1;
      if (d.hits[id] < needOf(q)) { marked = true; return; }
      d.done[id] = 1;
      paid += QUEST_PAY;
    });

    /* `marked` covers progress without payment — one of two done. The
       count has to survive even though nothing was earned, or she would
       start from zero every time. */
    if (paid || marked) write();
    if (paid && GH.coins && GH.coins.earn) GH.coins.earn(paid, 'quest');

    /* The all-three bonus, once. Checked after the marks above so
       finishing the last one pays both in the same breath. */
    if (!d.allPaid && allDone()){
      d.allPaid = true;
      write();
      if (GH.coins && GH.coins.earn) GH.coins.earn(ALL_BONUS, 'quest-all');
      paid += ALL_BONUS;
    }

    return paid;
  }

  /* For testing, and for Settings if it ever wants it. */
  function reset(){
    cache = { day:'', pick:[], done:{}, hits:{}, allPaid:false };
    write();
  }

  return { todays:todays, allDone:allDone, rules:rules, saw:saw, reset:reset,
           needOf:needOf };
})();
