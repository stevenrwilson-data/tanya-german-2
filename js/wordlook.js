/* What word is that?

   The fill-in-the-blank exercises show a German sentence with a word
   removed and its translation underneath, and until now the two never met.
   She reads `Das ___ ist sehr billig` and `That is very cheap`, types
   `Hemd`, and is told she is right — without ever being shown that Hemd is
   the shirt. The exercise tests recall of a word it never names.

   So: given the German she just filled in, hand back the vocabulary entry
   behind it, and the caller can print `das Hemd · shirt · рубашка`.

   ------------------------------------------------------------------
   WHY THIS IS A LOOKUP AND NOT AN ALIGNMENT

   The obvious version is to highlight the matching word inside the
   translation, so she can see that `billig` is the `cheap` in `That is
   very cheap`. That needs to know which word of the translation
   corresponds, and nothing in the data says. String-matching the gloss
   against the sentence works often and fails quietly: `die Zähne putzen`
   glosses as `brush teeth`, which is not a contiguous run in every
   translation, and Russian word order does not follow German at all.

   A lookup is exact or absent. An alignment is right most of the time and
   silently teaching a wrong mapping the rest, which is worse in something
   that is meant to be trusted. So this returns the word or nothing, and
   never a guess.

   ------------------------------------------------------------------
   WHAT IT CAN AND CANNOT FIND

   Measured against all 1,236 blanks the app generates from Section 1:

     the German as written              38%
     plus conjugated verb forms
     and plural nouns                   48%

   The rest are words that should not light up anyway. The commonest
   misses are `ist`, `Die`, `Das`, `Der`, `Wo`, `Wen`, `einen` — articles,
   question words and forms of sein — and the two names, Tanya and Nazar.
   None of those is a vocabulary item and none of them has a meaning worth
   printing. A determiner has no gloss; it has a grammatical job.

   So the honest description is not "48% coverage". It is: **every content
   word in the vocabulary resolves, and function words do not, because
   there is nothing to say about them.**

   ------------------------------------------------------------------
   HOW THE INDEX IS BUILT

   Four passes, each only filling gaps the earlier ones left, so a real
   entry always beats a derived form:

     1. the German exactly as the entry writes it — `der Apfel`
     2. the same without its article — `Apfel`
     3. every conjugated form of anything the conjugator calls a verb, so
        `geht`, `gehe` and `gingen` all reach `gehen`
     4. plural forms from the plural data, so `Äpfel` reaches `der Apfel`

   Built once on first use and held, because it is 1,658 forms over 752
   entries and rebuilding it per question would be silly. Rebuilt when the
   pack selection changes, since a word in a switched-off pack should not
   be explained.

   Case-insensitive, because German capitalises its nouns and a blank at
   the start of a sentence is capitalised whatever it is. Punctuation is
   stripped: the blank may carry the full stop. */

window.GH = window.GH || {};

GH.wordlook = (function(){

  var index = null;
  var builtFor = '';
  /* form -> every sense that form belongs to. Only populated for
     dictionary headwords; empty for the other 747 words. */
  var senses = {};

  function bare(de){
    return String(de || '').replace(/^(der|die|das)\s+/i, '').trim();
  }

  /* The key a form is stored under. Lower case, no punctuation, no
     surrounding space. */
  function key(w){
    return String(w || '')
      .replace(/[.,!?;:\u201e\u201c\u201d"'\u00ab\u00bb()]/g, '')
      .trim()
      .toLowerCase();
  }

  /* Which packs are on, so the index can be rebuilt when that changes and
     a word she has switched off is not explained to her. */
  function stamp(){
    if (!GH.packs) return 'all';
    try {
      return GH.packs.all().filter(function(p){ return p.on; })
        .map(function(p){ return p.id; }).join(',');
    } catch (e){ return 'all'; }
  }

  function build(){
    var out = {};
    senses = {};
    var words = (GH.packs && GH.packs.vocab) ? GH.packs.vocab() : (window.GH_VOCAB || []);

    /* Only fills a gap. The order of these four passes is the priority:
       an entry's own German always wins over a form derived from another
       entry, which matters where a plural collides with a singular. */
    function put(k, v){
      k = key(k);
      if (!k) return;
      if (!out[k]) out[k] = v;
      /* A word that means two things needs both, and only the first would
         survive the gap-filling rule above. Senses are collected
         separately and only senses are: two vocabulary entries that happen
         to share their German — 'zusammen einen Film ansehen' is both #225
         and #274 — are a duplicate, not a second meaning. */
      if (v.sid){
        if (!senses[k]) senses[k] = [];
        for (var i = 0; i < senses[k].length; i++){
          if (senses[k][i].sid === v.sid) return;
        }
        senses[k].push(v);
      }
    }

    words.forEach(function(v){ put(v.de, v); });
    words.forEach(function(v){ put(bare(v.de), v); });

    /* A sense is also filed under its HEADWORD, not only under its own
       German. `halten für` is the third sense of halten and carries that
       German, so without this it indexed under `halten für` alone: she
       meets `Ich halte das für falsch`, looks up `halte`, and the one
       meaning she needed is the one that is missing. The dictionary page
       groups senses under the headword; this makes the lookup agree with
       it. */
    words.forEach(function(v){
      if (!v.sid || !v.head || v.head === v.de) return;
      put(v.head, v);
      put(bare(v.head), v);
    });

    /* Conjugated forms. isVerb() exists because the vocabulary is full of
       words that merely end in -en — sieben, trocken, zufrieden — and
       without it the generator happily produces `immere, immerst, immert`
       and this index would claim they mean something. */
    if (GH.conjugate){
      words.forEach(function(v){
        /* the headword for a sense, because `halten für` has a space in it
           and would be skipped — and then `hältst` would reach two of
           halten's three meanings and quietly not the third */
        var inf = bare(v.head || v.de);
        if (!inf || inf.indexOf(' ') >= 0) return;
        if (!/e?n$/.test(inf)) return;
        if (!GH.conjugate.isVerb(inf)) return;
        var forms;
        try { forms = GH.conjugate.forms(inf); } catch (e){ return; }
        forms.forEach(function(f){ put(f, v); });
      });
    }

    /* Plurals, from the plural data rather than guessed — the five German
       patterns are not reliable enough to derive and a wrong plural here
       would be a wrong answer presented as an explanation.

       Both fields carry an article: `sg` is `der Kopf` and `pl` is `die
       Köpfe`. So the singular is matched with and without it, and the
       plural is stored both ways — a blank might be `Köpfe` or `die
       Köpfe` depending on how the sentence blanked it, and `n` gives a
       direct route to the entry when the German has drifted. */
    var P = window.GH_PLURALS;
    if (P){
      var rows = P.words || P;
      for (var i = 0; i < rows.length; i++){
        var row = rows[i];
        if (!row || !row.pl) continue;
        var hit = null;
        if (row.n){
          for (var j = 0; j < words.length; j++){
            if (words[j].n === row.n){ hit = words[j]; break; }
          }
        }
        if (!hit && row.sg) hit = out[key(row.sg)] || out[key(bare(row.sg))];
        if (!hit) continue;
        put(row.pl, hit);
        put(bare(row.pl), hit);
      }
    }

    return out;
  }

  function idx(){
    var s = stamp();
    if (!index || builtFor !== s){ index = build(); builtFor = s; }
    return index;
  }

  /* The vocabulary entry behind a German form, or null.

     Null is a real answer and the common one — an article, a question
     word, a name. A caller should show nothing rather than something
     hedged. */
  function find(word){
    if (!word) return null;
    var k = key(word);
    if (!k) return null;
    var hit = idx()[k];
    return hit || null;
  }

  /* Ready to print: the entry's German with its article, and the gloss in
     whichever language she is reading the app in.

     Returns null when there is nothing to say, and also when she is
     reading in German — the sentence is already German and repeating one
     of its words with no translation beside it explains nothing. */
  function explain(word){
    var v = find(word);
    if (!v) return null;
    var lang = GH.i18n ? GH.i18n.lang() : 'en';
    if (lang === 'de') return null;
    var gloss = v[lang] || v.en || '';
    if (!gloss) return null;

    /* Where the word means more than one thing, saying one of them is
       worse than saying nothing: she has just typed `Fuß` correctly and
       being told it is ступня teaches her that and hides подножие. So all
       of them come back and the caller shows all of them. */
    var many = (senses[key(word)] || []).slice().sort(function(a, b){
      return (a.ord || 0) - (b.ord || 0);
    });
    var out = { de:v.de, gloss:gloss, n:v.n, word:v, senses:null };
    if (many.length > 1){
      /* The headline comes from the first sense, not from whichever one
         the index reached first. */
      out.de = many[0].head || many[0].de;
      out.gloss = many[0][lang] || many[0].en || gloss;
      out.senses = many.map(function(sn){
        return {
          de: sn.de,
          gloss: sn[lang] || sn.en || '',
          def: sn.def ? (sn.def[lang] || sn.def.en || '') : '',
          sid: sn.sid,
          ord: sn.ord || 0
        };
      }).filter(function(x){ return !!x.gloss; });
      if (out.senses.length < 2) out.senses = null;
    }
    return out;
  }

  /* For anything that wants to know how much of a set can be explained
     before offering the feature. */
  function coverage(list){
    var seen = 0, hit = 0;
    (list || []).forEach(function(w){
      seen++;
      if (find(w)) hit++;
    });
    return { seen:seen, hit:hit, pct:seen ? hit / seen : 0 };
  }

  function reset(){ index = null; builtFor = ''; senses = {}; }

  return { find:find, explain:explain, coverage:coverage, reset:reset };
})();
