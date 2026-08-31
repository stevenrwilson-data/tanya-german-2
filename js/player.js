/* Who is playing.

   Everything the app remembers — what she has met, what she keeps missing,
   when a word is next due — belongs to a person, not to a browser. Tanya
   and Nazar on the same iPad must not share a schedule, or each will be
   drilled on the other's gaps and neither number will mean anything.

   So every progress key is prefixed with a player id, and the whole store
   is scoped by target language as well. `de:word:342` for Tanya's German is
   a different record from the same word in a Spanish course, which matters
   the moment this becomes more than one language.

   The first time the app runs there is no profile, so one is made silently
   and any progress already in the store is adopted by it. Nobody is asked
   to sign up before they can play; the profile only becomes visible when a
   second person is added. */

window.GH = window.GH || {};

GH.player = (function(){

  var KEY = 'gh-players-v1';
  var cache = null;

  function read(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : null;
    } catch (e){ cache = null; }

    if (!cache || !cache.list || !cache.list.length){
      cache = {
        list: [{ id:'p1', name:'', made:Date.now() }],
        current: 'p1',
        adopted: true          /* any pre-existing progress belongs to p1 */
      };
      write();
    }
    return cache;
  }

  function write(){
    try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e){}
  }

  function all(){ return read().list.slice(); }

  function current(){
    var d = read();
    var hit = d.list.filter(function(p){ return p.id === d.current; })[0];
    return hit || d.list[0];
  }

  function id(){ return current().id; }

  /* Only one profile means nobody has asked for profiles, so the app should
     not show a switcher or mention them at all. */
  function shared(){ return read().list.length > 1; }

  function add(name){
    var d = read();
    var n = 1;
    while (d.list.some(function(p){ return p.id === 'p' + n; })) n++;
    var made = { id:'p' + n, name:name || '', made:Date.now() };
    d.list.push(made);
    d.current = made.id;
    write();
    return made;
  }

  function rename(pid, name){
    var d = read();
    d.list.forEach(function(p){ if (p.id === pid) p.name = name; });
    write();
  }

  function use(pid){
    var d = read();
    if (!d.list.some(function(p){ return p.id === pid; })) return false;
    d.current = pid;
    write();
    return true;
  }

  /* Whether to address this person as a woman or a man.

     German and English do not care. Russian does, and it cares in the
     ordinary past tense — «ты закончила» against «ты закончил» — so a
     Russian interface that guesses is wrong to somebody every time it
     speaks. It is asked once, beside the name, and stored per profile
     rather than per device, because two people on one iPad are not
     necessarily the same.

     Empty is a real answer and the default. Nothing may require this to
     be set; anything reading it falls back to the feminine form the
     lines are written in, which is right for the person this was built
     for and merely unremarkable for anyone else. */
  function gender(pid){
    var d = read();
    var hit = d.list.filter(function(p){ return p.id === (pid || d.current); })[0];
    return (hit && hit.gender) || '';
  }

  function setGender(pid, g){
    var d = read();
    d.list.forEach(function(p){
      if (p.id !== pid) return;
      if (g === 'f' || g === 'm') p.gender = g;
      else delete p.gender;
    });
    write();
  }

  function remove(pid){
    var d = read();
    if (d.list.length < 2) return false;      /* never leave nobody */
    d.list = d.list.filter(function(p){ return p.id !== pid; });
    if (d.current === pid) d.current = d.list[0].id;
    write();
    return true;
  }

  /* The language being learned. One value today; the branch to other
     languages turns this into a real setting rather than a rewrite. */
  function target(){
    try { return window.localStorage.getItem('gh-target') || 'de'; }
    catch (e){ return 'de'; }
  }

  /* Every progress key runs through here. */
  function scope(key){
    return id() + ':' + target() + ':' + key;
  }

  return {
    all: all, current: current, id: id, shared: shared,
    add: add, rename: rename, use: use, remove: remove,
    gender: gender, setGender: setGender,
    target: target, scope: scope
  };
})();
