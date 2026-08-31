/* Content packs: everything the app knows, released in waves.

   Four hundred words is what the app has. Four hundred words is not what a
   learner should be shown on day one — a picture game drawing from the
   whole vocabulary is mostly words she has never met, and a listening game
   is nine unfamiliar tiles. Difficulty has to arrive in layers or the
   early sessions are noise.

   So the vocabulary is cut into packs. One is on to begin with; the rest
   sit switched off, visible in the word list marked as not yet started, and
   she turns them on when she wants them. Nothing is hidden and nothing is
   locked — the app has an opinion about the order, not a rule.

   The suggestion is the useful part, and it is the reason this waited for
   the tutor. 'Ready for more' is not a word count or a number of sessions;
   it is whether the words she already has are actually holding. The
   scheduler knows that: a word with a long interval has survived being
   forgotten. When enough of the current pack is in that state, the app
   says so. Until then it says nothing, because pushing new material at
   somebody still dropping the old is how people quit.

   Packs are per player. Two people on one iPad progress separately. */

window.GH = window.GH || {};

GH.packs = (function(){

  var KEY = 'gh-packs-v1';

  /* A pack is a range of image numbers, which is also the order the words
     were made in, which is roughly the order they should be learned in.
     `core` is always on and cannot be turned off — there has to be a
     floor. */
  /* The packs.

     `from`/`to` are a FALLBACK for the 472 entries written before words
     carried a `pack` field. New entries should name their pack instead —
     ranges are the coupling that made a category a stretch of numbers,
     and they are what put 132 new words silently outside every enabled
     pack: their ids landed in `more`, which is off by default, so they
     were invisible with nothing to say so.

     Only `core` is on without being asked. Everything else waits for the
     switch in Settings. */
  var PACKS = [
    { id:'core',   from:1,   to:432, core:true,  key:'pkCore'   },
    { id:'extra',  from:433, to:495,             key:'pkExtra'  },   /* sheets 49-55 */
    { id:'verbs',  from:496, to:567,             key:'pkVerbs'  },   /* sheets 56-63 */
    { id:'jobs',   from:568, to:648,             key:'pkJobs'   },   /* sheets 64-72 */
    { id:'school', from:786, to:814,             key:'pkSchool' },
    { id:'more',   from:649, to:9999,            key:'pkMore'   }
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

  function slot(){
    return GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo';
  }

  function on(id){
    var p = byId(id);
    if (!p) return false;
    if (p.core) return true;
    var d = read()[slot()];
    return !!(d && d[id]);
  }

  function setOn(id, yes){
    var p = byId(id);
    if (!p || p.core) return;
    var d = read();
    if (!d[slot()]) d[slot()] = {};
    if (yes) d[slot()][id] = 1; else delete d[slot()][id];
    write();
  }

  function byId(id){
    for (var i = 0; i < PACKS.length; i++) if (PACKS[i].id === id) return PACKS[i];
    return null;
  }

  /* Which pack a word belongs to.

     Takes a word now, not a number. An explicit `pack` field wins; the
     number ranges below are the fallback for the 472 entries that predate
     the field. Ranges are the same coupling `cats` just removed, so new
     words should carry `pack` and the ranges should wither. */
  function packOf(word){
    var n = (typeof word === 'number') ? word : (word && word.n);
    if (word && word.pack) return byId(word.pack) || null;
    for (var i = 0; i < PACKS.length; i++){
      if (n >= PACKS[i].from && n <= PACKS[i].to) return PACKS[i];
    }
    return null;
  }

  /* Every pack, with what it holds and whether it is live. Packs with no
     words in them yet are still listed but marked empty, so she can see
     what is coming. */
  function all(){
    var V = window.GH_VOCAB || [];
    return PACKS.map(function(p){
      var words = V.filter(function(v){
        return playable(v) && v.n >= p.from && v.n <= p.to;
      });
      return {
        id: p.id, key: p.key, core: !!p.core,
        words: words.length,
        on: on(p.id),
        empty: words.length === 0
      };
    });
  }

  /* ---------- a word's categories ----------

     `n` used to do two jobs: it identified the word and it addressed the
     picture, since sheet = (n-1)/9+1. That coupling forced a category to
     be a contiguous range of numbers — which is why adding eight kitchen
     words meant renumbering, and why a word could only be in one place.

     Now `n` does one job. It is a permanent opaque id and nothing infers
     meaning from its value. Two things changed with it:

       cats   an array. A word can be in as many as make sense — scissors
              belong in the kitchen, the office and a school bag.
       img    the picture, defaulting to `n`. Explicit `img:0` means there
              is no picture, which is how an abstract word gets in at all.

     Both are read through here, never off the record directly, so the 472
     entries written before this keep working untouched: an old entry has
     `cat` and no `cats`, and catsOf() returns [cat]. Migrate whenever. */

  function catsOf(v){
    if (!v) return [];
    if (v.cats && v.cats.length) return v.cats;
    return v.cat ? [v.cat] : [];
  }

  /* Is this word in that category? */
  function inCat(v, cat){
    return catsOf(v).indexOf(cat) >= 0;
  }

  /* Every live word in a category. */
  function ofCat(cat){
    return vocab().filter(function(v){ return inCat(v, cat); });
  }

  /* Do two words share any category?

     The picture games use this to choose distractors: a kitchen scene
     against nine kitchen scenes is a real test, against nine random
     pictures it is not. With one category each this was `a.cat === b.cat`;
     with several it is an intersection, and scissors being in three
     categories makes it a plausible distractor in all three. */
  function shareCat(a, b){
    var A = catsOf(a), i;
    for (i = 0; i < A.length; i++) if (inCat(b, A[i])) return true;
    return false;
  }

  /* Where the picture is. `img` when given, `n` otherwise, and 0 means
     there is no picture — which sprite.js now renders as a word rather
     than silently showing image 1. */
  /* Where the picture is.

     `imgs` for a word drawn more than once — die Handtasche has three
     cells, ankommen has two — and one is chosen at random per question, so
     she learns the word rather than the drawing. `img` for a single
     picture. Otherwise `n`, which is right for the 468 entries written
     when a number was both identity and address.

     0 means there is no picture. */
  function imgOf(v){
    if (!v) return 0;
    if (v.imgs && v.imgs.length){
      return v.imgs[Math.floor(Math.random() * v.imgs.length)];
    }
    return (typeof v.img === 'number') ? v.img : (v.n || 0);
  }

  /* Every picture a word has, for anywhere that wants them all rather
     than one at random. */
  function imgsOf(v){
    if (!v) return [];
    if (v.imgs && v.imgs.length) return v.imgs.slice();
    var one = imgOf(v);
    return one ? [one] : [];
  }

  function hasPicture(v){
    if (v && v.imgs && v.imgs.length) return true;
    return imgOf(v) > 0;
  }

  /* ---------- senses ----------

     A headword in GH_DICT means more than one thing, and the games have
     always assumed the opposite: listen-pick schedules on 'word:' + v.n
     and vocabgame grades with picked.n === q.word.n. Two senses sharing
     one `n` would share one history and be indistinguishable as answers.

     Rather than teach three games about senses, the senses are expanded
     here into ordinary-looking items — one per sense — and the games go on
     receiving a flat list of things that mean exactly one thing each. That
     is why this is in packs.js: vocab() is the only door they come
     through.

     An expanded item is a real vocab record with `de`, `en`, `ru`, `img`,
     `cats`, `pack` and `s`, plus `sid` and `dict`. Anything reading it
     through the accessors above cannot tell the difference.

     The `primary` sense inherits the bank entry it replaces — its `n`,
     `cats`, `pack` and both example sentences — so nothing already written
     changes hands. Every other sense inherits `cats` and `pack` only: no
     sentences, and no `n`, because it has no drawing to address and no
     right to a number. With no sentences it never reaches vocabgame or
     listen-pick, both of which require sentencesOf(v).length, which is the
     correct outcome for a sense that exists only as a definition. */

  function dict(){ return window.GH_DICT || []; }

  function dictEntry(de){
    var D = dict(), i;
    for (i = 0; i < D.length; i++) if (D[i].de === de) return D[i];
    return null;
  }

  /* Every sense of a headword, as items. `base` is the GH_VOCAB record
     being taken over, or null when the headword has no bank entry. */
  function expand(entry, base){
    return (entry.senses || []).map(function(sn, idx){
      var item = {
        de: sn.de || entry.de,
        en: sn.en, ru: sn.ru,
        img: (typeof sn.img === 'number') ? sn.img : 0,
        def: sn.def || null,
        sid: sn.sid,
        dict: entry.de,
        head: entry.de,
        /* Its position in the dictionary entry, which is the order the
           senses were written in and the order they should be read in.
           Without it a lookup shows them in whatever order the index
           happened to fill: `treffen` headlined попадать / попасть,
           because sense two is the one whose own German is exactly
           `treffen` and so reached the index first. */
        ord: idx
      };
      /* n stays with the sense the bank entry was already describing, so
         its scheduling history and its picture survive untouched. */
      if (sn.primary && base){
        item.n = base.n;
        item.s = base.s;
        if (base.cats) item.cats = base.cats;
        if (base.cat) item.cat = base.cat;
        if (base.pack) item.pack = base.pack;
      } else {
        item.n = 0;
        item.s = [];
        if (base && base.cats) item.cats = base.cats;
        if (base && base.cat) item.cat = base.cat;
        if (base && base.pack) item.pack = base.pack;
      }
      return item;
    });
  }

  /* What the tutor and the graders should key on.

     'word:' + n for all 752 entries that have no senses, which is the
     string they have always used — no migration, no lost history. A sense
     has no number of its own, so it keys on its sid. */
  function keyOf(v){
    if (!v) return 'word:0';
    if (v.sid) return 'sense:' + v.sid;
    return 'word:' + v.n;
  }

  /* Are these two items the same thing? Was `picked.n === word.n`, which
     is 0 === 0 for any two pictureless senses. */
  function same(a, b){
    if (!a || !b) return false;
    return keyOf(a) === keyOf(b);
  }

  /* The vocabulary as the games should see it. Every game that draws words
     goes through here rather than reading GH_VOCAB, so switching a pack off
     genuinely removes it from play instead of merely hiding it in a list. */
  /* Words that exist but are not part of general play.

     `only:'lesson'` means the word belongs to one place — Tanya's course
     lessons — and must not turn up in the picture game, the listening game
     or a topic set. It is not a pack: a pack can be switched on, and this
     is not a preference. A word marked this way is invisible to every game
     that goes through vocab(), and reachable only by whatever asks for it
     by name.

     `only` rather than `lesson:true` because the next thing to need this
     will not be a lesson. */
  function playable(v){ return !(v && v.only); }

  function vocab(){
    var V = window.GH_VOCAB || [];
    var out = [];
    var taken = {};

    V.forEach(function(v){
      /* Claimed BEFORE the pack test, not after. der Fuß lives in pack
         'verbs', which is off until she turns it on, so the pack test
         returns early — and the fallback loop below then found no claim,
         expanded the headword with no base, and produced a der Fuß with
         no image, no sentences, no category and no pack, live in every
         game because an unranged word is always live. It lost its drawing
         and gained a place it had not earned, and nothing said a word. */
      if (!playable(v)) return;
      var d = dictEntry(v.de);
      if (d) taken[v.de] = true;
      var p = packOf(v);
      if (!(!p || p.core || on(p.id))) return;
      if (d) out = out.concat(expand(d, v));
      else out.push(v);
    });

    /* Headwords with no bank entry at all. They inherit no pack, so
       packOf() returns null and the same rule that keeps an unranged word
       live keeps these live. */
    dict().forEach(function(d){
      if (!taken[d.de]) out = out.concat(expand(d, null));
    });

    return out;
  }

  /* How well the live words are holding.

     Counts a word as settled if the scheduler has pushed it beyond a week,
     which means it has survived long enough to have been nearly forgotten
     and recalled anyway. Seen-once-and-right does not count; that is
     recognition, not memory. */
  function readiness(){
    var live = vocab();
    if (!live.length) return { ready:false, settled:0, live:0, pct:0 };

    var settled = 0, met = 0;
    live.forEach(function(v){
      var c = GH.tutor ? GH.tutor.card('word:' + v.n) : null;
      if (c && c.reps) met++;
      if (c && c.ivl >= 7) settled++;
    });

    var pct = live.length ? settled / live.length : 0;
    return {
      live: live.length,
      met: met,
      settled: settled,
      pct: pct,
      /* two thirds settled is the point where more material helps rather
         than buries. Below that, adding words makes every game thinner. */
      ready: pct >= 0.66
    };
  }

  /* The next pack worth turning on, or null if she is fine as she is. */
  function suggest(){
    if (!GH.tutor || !GH.tutor.enabled()) return null;
    var next = null;
    for (var i = 0; i < PACKS.length; i++){
      var p = PACKS[i];
      if (p.core || on(p.id)) continue;
      /* Counted through packOf(), not by number range. The range check
         missed every word that names its pack explicitly — which was all
         132 of the newest ones — and reported the pack as empty, so it
         was never suggested. The same coupling that hid them from
         vocab() in the first place. */
      var V = window.GH_VOCAB || [];
      var count = V.filter(function(v){
        var q = packOf(v);
        return q && q.id === p.id;
      }).length;
      if (!count) continue;
      next = { id:p.id, key:p.key, words:count };
      break;
    }
    if (!next) return null;
    var r = readiness();
    if (!r.ready) return null;
    /* how much of it has pictures, so the offer can be honest about a
       pack that is all words and no drawings yet */
    var V = window.GH_VOCAB || [];
    var drawn = V.filter(function(v){
      var q = packOf(v);
      return q && q.id === next.id && hasPicture(v);
    }).length;
    next.drawn = drawn;
    next.settled = r.settled;
    next.live = r.live;
    return next;
  }

  /* Which tenses the example sentences may use.

     Present is always on. The past layer is off until she asks for it,
     because a fill-in-the-blank that quietly serves 'Ich bin gestern
     gegangen' teaches the perfect tense by ambush — she meets a form
     nobody has explained, in an exercise about vocabulary.

     Turned on, the two layer rather than replace: the same word appears
     in both tenses, which is the point. */
  /* Three layers, not two, because German has two pasts and they are not
     interchangeable. Perfekt is what people say about actions — ich bin
     gegangen. Präteritum is what people say about states and about sein
     and haben — ich war müde, ich hatte Zeit. Teaching them as one thing
     called 'the past' means she learns a rule that immediately breaks.

     They enable independently, so Perfekt can arrive first and Präteritum
     later, which is the order that matches how she will actually hear
     them. */
  function tenses(){
    var out = { present:true };
    try {
      out.perfekt = window.localStorage.getItem('gh-tense-perfekt') === '1';
      out.prat    = window.localStorage.getItem('gh-tense-prat') === '1';
      out.future  = window.localStorage.getItem('gh-tense-future') === '1';
    } catch (e){}
    return out;
  }

  function setTense(which, on){
    try {
      if (on) window.localStorage.setItem('gh-tense-' + which, '1');
      else window.localStorage.removeItem('gh-tense-' + which);
    } catch (e){}
  }

  /* The example sentences a game may draw on, filtered by the above. */
  function sentencesOf(word){
    if (!word || !word.s) return [];
    var t = tenses();
    return word.s.filter(function(x){
      if (!x.t) return true;                 /* untagged is present */
      return !!t[x.t];
    });
  }

  /* How much past material exists, so the setting can say whether turning
     it on would actually do anything yet. */
  function tenseCounts(){
    var n = { present:0, perfekt:0, prat:0, future:0 };
    vocab().forEach(function(v){
      (v.s || []).forEach(function(x){ n[x.t || 'present']++; });
    });
    return n;
  }

  return {
    all: all, on: on, setOn: setOn, vocab: vocab,
    catsOf: catsOf, inCat: inCat, ofCat: ofCat, shareCat: shareCat,
    imgOf: imgOf, imgsOf: imgsOf, hasPicture: hasPicture,
    readiness: readiness, suggest: suggest, packOf: packOf,
    tenses: tenses, setTense: setTense,
    sentencesOf: sentencesOf, tenseCounts: tenseCounts,
    keyOf: keyOf, same: same, dictEntry: dictEntry, expand: expand,
    playable: playable,
    /* Every word held back from general play, optionally in one category.
       Reads GH_VOCAB directly and on purpose: going through vocab() would
       filter out exactly what is being asked for. */
    onlyOf: function(tag, cat){
      var V = window.GH_VOCAB || [];
      return V.filter(function(v){
        if (v.only !== (tag || 'lesson')) return false;
        return cat ? inCat(v, cat) : true;
      });
    }
  };
})();
