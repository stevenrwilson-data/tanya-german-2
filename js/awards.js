/* Achievements.

   Things worth marking, each paid once. Not a score — a score already
   exists and climbs on its own. These are moments: the first time she
   finished a round, the first perfect one, a week of turning up.

   Two rules keep them honest.

   Each pays once and cannot be farmed. Playing the easiest level fifty
   times earns fifty rounds' worth of Kronen and exactly one achievement,
   which is the point.

   And they are checked rather than announced. Nothing here fires on a
   timer or a login. Every one asks the store a question — how many words
   have settled, how many days running, which games have been played — so
   an achievement means something happened, not that time passed.

   The list is deliberately short to start with. A page of grey locked
   boxes tells a beginner she has failed at forty things she has not heard
   of yet. Better to add them as the app grows. */

window.GH = window.GH || {};

GH.awards = (function(){

  var KEY = 'gh-awards-v1';

  /* Every achievement: an id, what it pays, and a test.

     The test gets a small bundle of everything knowable, so adding one
     rarely means adding a new source of truth. */
  /* Paid in proportion to how long the thing takes.

     A full day of practice earns 150, so an achievement worth 1,000 is
     about a third of what the twenty days it demands would earn anyway —
     a bonus on top of the work, not a substitute for it. That ratio holds
     across the list: roughly a third of the Kronen those days produce.

     The day counts are **full days**: five exercises finished. Opening the
     app and answering one question does not advance them, because an
     achievement for turning up is an achievement for nothing. */
  var LIST = [
    { id:'first-round',   pay:20,   key:'awFirstRound',
      is:function(f){ return f.rounds >= 1; } },

    { id:'first-full-day', pay:50,  key:'awFirstFullDay',
      is:function(f){ return f.fullDays >= 1; } },

    { id:'first-perfect', pay:50,   key:'awFirstPerfect',
      is:function(f){ return f.perfects >= 1; } },

    { id:'streak-10',     pay:40,   key:'awStreak10',
      is:function(f){ return f.bestStreak >= 10; } },

    { id:'streak-25',     pay:100,  key:'awStreak25',
      is:function(f){ return f.bestStreak >= 25; } },

    /* runs of full days — the spine of the list, and the dear part */
    { id:'run-3',         pay:100,  key:'awRun3',
      is:function(f){ return f.run >= 3; } },

    { id:'run-7',         pay:350,  key:'awRun7',
      is:function(f){ return f.run >= 7; } },

    { id:'run-20',        pay:1000, key:'awRun20',
      is:function(f){ return f.run >= 20; } },

    { id:'run-30',        pay:1500, key:'awRun30',
      is:function(f){ return f.run >= 30; } },

    { id:'run-60',        pay:3000, key:'awRun60',
      is:function(f){ return f.run >= 60; } },

    { id:'run-90',        pay:4500, key:'awRun90',
      is:function(f){ return f.run >= 90; } },

    /* the tutor's measure of learning rather than of effort */
    { id:'settled-25',    pay:75,   key:'awSettled25',
      is:function(f){ return f.mature >= 25; } },

    { id:'settled-100',   pay:400,  key:'awSettled100',
      is:function(f){ return f.mature >= 100; } },

    { id:'settled-250',   pay:1200, key:'awSettled250',
      is:function(f){ return f.mature >= 250; } },

    /* breadth, so one favourite game is not the whole app */
    { id:'five-games',    pay:100,  key:'awFiveGames',
      is:function(f){ return f.games >= 5; } },

    { id:'every-game',    pay:300,  key:'awEveryGame',
      is:function(f){ return f.games >= 11; } },

    { id:'grammar',       pay:100,  key:'awGrammar',
      is:function(f){ return f.topics >= 5; } },

    { id:'new-pack',      pay:75,   key:'awNewPack',
      is:function(f){ return f.packs >= 1; } },

    { id:'past-tense',    pay:100,  key:'awPastTense',
      is:function(f){ return f.tenses >= 1; } }
  ];

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

  function mine(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = { got:{}, counts:{ rounds:0, perfects:0, bestStreak:0, games:{}, topics:{} } };
    var m = d[id];
    if (!m.counts) m.counts = { rounds:0, perfects:0, bestStreak:0, games:{}, topics:{} };
    if (!m.counts.games) m.counts.games = {};
    if (!m.counts.topics) m.counts.topics = {};
    return m;
  }

  /* Everything an achievement might want to ask about, gathered once. */
  function facts(){
    var m = mine();
    var t = GH.tutor ? GH.tutor.stats() : { mature:0 };
    var c = GH.coach ? GH.coach.stats() : { days:0, streak:0 };
    var packs = GH.packs
      ? GH.packs.all().filter(function(p){ return p.on && !p.core; }).length : 0;
    var tn = GH.packs ? GH.packs.tenses() : {};
    var tenses = ['perfekt','prat','future'].filter(function(k){ return tn[k]; }).length;
    return {
      run: GH.coins ? GH.coins.bestRun() : 0,
      fullDays: GH.coins ? GH.coins.fullDays() : 0,
      rounds: m.counts.rounds,
      perfects: m.counts.perfects,
      bestStreak: m.counts.bestStreak,
      games: Object.keys(m.counts.games).length,
      topics: Object.keys(m.counts.topics).length,
      mature: t.mature,
      days: c.days,
      packs: packs,
      tenses: tenses
    };
  }

  /* Called when a round finishes. Records what happened, then looks for
     anything newly true. Returns the achievements just earned, so the end
     screen can say so — an achievement nobody is told about is a database
     row. */
  function afterRound(game, r){
    var m = mine();
    m.counts.rounds++;
    if (game) m.counts.games[game] = 1;
    if (r){
      if (r.answered >= 5 && r.right === r.answered) m.counts.perfects++;
      if ((r.best || 0) > m.counts.bestStreak) m.counts.bestStreak = r.best;
    }
    write();
    return check();
  }

  /* Reading a grammar page counts towards breadth. */
  function sawTopic(id){
    var m = mine();
    if (m.counts.topics[id]) return [];
    m.counts.topics[id] = 1;
    write();
    return check();
  }

  /* Anything newly true gets paid and remembered. */
  function check(){
    var m = mine();
    var f = facts();
    var won = [];
    LIST.forEach(function(a){
      if (m.got[a.id]) return;
      if (!a.is(f)) return;
      m.got[a.id] = Date.now();
      won.push(a);
      if (GH.coins) GH.coins.earn ? GH.coins.earn(a.pay) : null;
    });
    if (won.length) write();
    return won;
  }

  function has(id){ return !!mine().got[id]; }

  function all(){
    var m = mine();
    var f = facts();
    return LIST.map(function(a){
      return { id:a.id, key:a.key, pay:a.pay,
               got:!!m.got[a.id], when:m.got[a.id] || 0,
               close:!m.got[a.id] && a.is(f) };
    });
  }

  function earned(){ return all().filter(function(a){ return a.got; }).length; }
  function total(){ return LIST.length; }

  function reset(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    delete d[id];
    write();
  }

  return {
    afterRound: afterRound, sawTopic: sawTopic, check: check,
    has: has, all: all, earned: earned, total: total,
    facts: facts, reset: reset
  };
})();
