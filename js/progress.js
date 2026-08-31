/* What she knows, kept locally.

   One store for every activity, so a verb she keeps missing in the
   conjugation game and the same verb missed in a sentence both land on the
   same record. Nothing is uploaded anywhere; it lives in this browser.

   Two numbers per record rather than one, because they answer different
   questions. Lifetime accuracy says whether she has ever learned a thing.
   Recent accuracy — the last twelve attempts — says whether she knows it
   now. A topic at 90% lifetime and 40% recent is one she used to know, and
   that is exactly the topic worth putting in front of her; a single
   percentage hides it.

   Keys are 'area:thing', e.g. conj:sein, topic:body, word:342. The area
   prefix is what the progress screen groups by.

   On disk every key also carries who it belongs to and which language is
   being learned: p1:de:word:342. Two people on one iPad must not share a
   schedule, and when this becomes more than one language a Spanish word
   must not land on top of a German one. Callers never see the prefix —
   they pass 'word:342' and this adds it.

   Records written before profiles existed have no prefix, so on first run
   they are adopted by the first profile rather than abandoned. */

window.GH = window.GH || {};

GH.progress = (function(){

  var KEY = 'gh-progress-v1';
  var WINDOW = 12;          /* how many attempts count as 'recent' */
  var cache = null;

  function load(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : { items:{}, started:Date.now() };
    } catch (e){
      cache = { items:{}, started:Date.now() };
    }
    if (!cache.items) cache.items = {};
    adopt();
    return cache;
  }

  /* Anything written before profiles existed belongs to whoever was using
     the app, which is the first profile. Runs once. */
  function adopt(){
    if (cache.adopted) return;
    cache.adopted = true;
    if (!GH.player) return;
    var pre = GH.player.scope('');
    var moved = 0;
    Object.keys(cache.items).forEach(function(k){
      if (k.indexOf(':') < 0) return;
      if (/^p\d+:/.test(k)) return;                 /* already scoped */
      cache.items[pre + k] = cache.items[k];
      delete cache.items[k];
      moved++;
    });
    if (moved) save();
  }

  /* Callers pass a bare 'area:thing'; storage sees the scoped form. */
  function full(key){
    return GH.player ? GH.player.scope(key) : key;
  }

  function bare(key){
    var m = key.match(/^p\d+:[a-z]{2}:(.*)$/);
    return m ? m[1] : key;
  }

  function mine(key){
    if (!GH.player) return true;
    return key.indexOf(GH.player.scope('')) === 0;
  }

  function save(){
    try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e){}
  }

  function blank(){
    return { seen:0, right:0, streak:0, best:0, recent:'', last:0 };
  }

  /* One attempt. `key` is 'area:thing', `ok` is whether she got it. */
  function record(key, ok){
    if (!key) return;
    var d = load();
    var k = full(key);
    var r = d.items[k] || (d.items[k] = blank());
    r.seen++;
    if (ok){
      r.right++;
      r.streak++;
      if (r.streak > r.best) r.best = r.streak;
    } else {
      r.streak = 0;
    }
    /* recent form as a string of 1s and 0s, newest last, capped */
    r.recent = (r.recent + (ok ? '1' : '0')).slice(-WINDOW);
    r.last = Date.now();
    save();
  }

  /* Several attempts at once, for a whole round. */
  function recordMany(pairs){
    (pairs || []).forEach(function(p){ record(p[0], p[1]); });
  }

  function get(key){
    var r = load().items[full(key)];
    if (!r) return null;
    return {
      key: key,
      seen: r.seen,
      right: r.right,
      streak: r.streak,
      best: r.best,
      last: r.last,
      lifetime: r.seen ? r.right / r.seen : 0,
      recent: recentRate(r),
      recentN: r.recent.length
    };
  }

  function recentRate(r){
    if (!r.recent.length) return 0;
    var hits = 0;
    for (var i = 0; i < r.recent.length; i++) if (r.recent[i] === '1') hits++;
    return hits / r.recent.length;
  }

  /* Everything in one area, e.g. all of conj: */
  function area(prefix){
    var d = load(), out = [];
    Object.keys(d.items).forEach(function(k){
      if (!mine(k)) return;
      var b = bare(k);
      if (b.indexOf(prefix + ':') === 0) out.push(get(b));
    });
    return out.sort(function(a, b){ return a.recent - b.recent; });
  }

  function areas(){
    var d = load(), set = {};
    Object.keys(d.items).forEach(function(k){
      if (!mine(k)) return;
      set[bare(k).split(':')[0]] = true;
    });
    return Object.keys(set);
  }

  /* Rolled up across a prefix, for the headline number. */
  function summary(prefix){
    var rows = prefix ? area(prefix) : allRows();
    var seen = 0, right = 0, rec = 0, recN = 0;
    rows.forEach(function(r){
      seen += r.seen; right += r.right;
      rec += r.recent * r.recentN; recN += r.recentN;
    });
    return {
      items: rows.length,
      seen: seen,
      right: right,
      lifetime: seen ? right / seen : 0,
      recent: recN ? rec / recN : 0
    };
  }

  function allRows(){
    var d = load();
    return Object.keys(d.items).filter(mine).map(function(k){ return get(bare(k)); });
  }

  /* The ones worth putting in front of her: seen enough to judge, and
     currently shaky. Sorted worst first. */
  function weakest(prefix, n){
    return (prefix ? area(prefix) : allRows())
      .filter(function(r){ return r.seen >= 3 && r.recent < 0.7; })
      .sort(function(a, b){ return a.recent - b.recent; })
      .slice(0, n || 8);
  }

  /* Solid enough to skip the easy drill: a real run of correct answers. */
  function isSolid(key){
    var r = get(key);
    return !!r && r.seen >= 5 && r.streak >= 5;
  }

  /* Clears this profile only. Wiping the other person's history because
     one of them wanted a fresh start would be its own kind of bug. */
  function reset(){
    var d = load();
    Object.keys(d.items).forEach(function(k){ if (mine(k)) delete d.items[k]; });
    save();
  }

  function resetAll(){
    cache = { items:{}, started:Date.now(), adopted:true };
    save();
  }

  return {
    record: record,
    recordMany: recordMany,
    get: get,
    area: area,
    areas: areas,
    summary: summary,
    weakest: weakest,
    isSolid: isSolid,
    reset: reset,
    resetAll: resetAll,
    windowSize: WINDOW
  };
})();
