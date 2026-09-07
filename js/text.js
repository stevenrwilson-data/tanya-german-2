/* js/text.js */
/* Tokenizing, blank selection, answer matching */

window.GH = window.GH || {};

GH.text = (function(){

  /* ==================================================================
     ONE TABLE PER TARGET LANGUAGE

     Everything in here used to be German constants at the top of the
     file: the word regex, the determiners, the function words. That was
     right while there was one target language and is the thing that
     stops there being two.

     Steven is adding English as a second target before branching to a
     multi-language build, so the German is now a ROW rather than the
     file. Adding Spanish is another row and no change to any function
     below.

     WHAT EACH FIELD IS FOR, because none of it is decoration:

       word     the regex that decides what a word IS. `[A-Za-z]` alone
                would split `Mädchen` into `M` and `dchen` and blank the
                fragment, and Cyrillic or accented Latin fails the same
                way. Every language needs its own alphabet here.
       det      words that can open a noun phrase. `nounPhrases()` uses
                these to keep `der Apfel` together as ONE blank instead
                of two, which is most of what makes a blank worth having.
       glue     never worth a blank alone.
       openers  pronouns skipped when they START a sentence — blanking
                the `Ich` of `Ich gehe` teaches nothing.
       lowvalue ranked down when choosing which blanks to keep.
       adjEnd   the endings an attributive adjective carries. German has
                five; English has none, which is why it is empty rather
                than guessed at.
       fold     spelling that answer-matching should forgive. German
                folds umlauts to ae/oe/ue and ß to ss because a learner
                typing `Strasse` has spelled it a real way. English has
                nothing to fold.

     A LANGUAGE WITH NO ROW FALLS BACK TO GERMAN, not to empty. An empty
     `det` would silently stop keeping noun phrases together and the
     blanks would quietly get worse, which is far harder to notice than
     a missing language.
     ================================================================== */
  var LANG = {

    de: {
      word: /[A-Za-zÄÖÜäöüßẞ]+(?:[-'\u2019][A-Za-zÄÖÜäöüßẞ]+)*/g,
      det: 'der die das den dem des ' +
           'ein eine einen einem einer eines ' +
           'kein keine keinen keinem keiner keines ' +
           'mein meine meinen meinem meiner meines ' +
           'dein deine deinen deinem deiner deines ' +
           'sein seine seinen seinem seiner seines ' +
           'ihr ihre ihren ihrem ihrer ihres ' +
           'unser unsere unseren unserem unserer ' +
           'euer eure euren eurem eurer ' +
           'dieser diese dieses diesen diesem ' +
           'jeder jede jedes jeden jedem ' +
           'welcher welche welches welchen welchem ' +
           'am im zum zur ins beim vom aufs',
      glue: 'und oder aber denn sondern es',
      openers: 'ich du er sie es wir ihr man',
      lowvalue: 'ist sind bin bist war waren hat habe haben hast ' +
                'mit auf in an von zu nach für über unter bei aus vor ' +
                'noch sehr auch nicht dann jetzt hier dort so als wie ' +
                'wo wann was wer da ja nein um mir mich sich ihm ihn ihr ' +
                'ein eine einen einem einer der die das den dem ' +
                'mein meine sein seine ihre zwei',
      adjEnd: /(e|en|er|es|em)$/,
      fold: [[/ä/g,'ae'], [/ö/g,'oe'], [/ü/g,'ue'], [/ß/g,'ss']]
    },

    /* English as a target. `adjEnd` is empty because an English
       attributive adjective carries no ending — `the big house`, not
       `the bige house` — so the German test would match `little`,
       `bigger` and `these` and treat them as adjectives. `fold` is
       empty for the same kind of reason: there is no alternative
       spelling of an English word that a learner has spelled right. */
    en: {
      word: /[A-Za-z]+(?:[-'\u2019][A-Za-z]+)*/g,
      det: 'the a an this that these those ' +
           'my your his her its our their ' +
           'each every some any no another ' +
           'which whose',
      glue: 'and or but so nor yet it',
      openers: 'i you he she it we they one',
      lowvalue: 'is are am was were has have had ' +
                'with on in at of to from for over under by out before ' +
                'still very also not then now here there as like ' +
                'where when what who there yes no about me my him her ' +
                'a an the this that two',
      adjEnd: null,
      fold: []
    }

    /* Ready to add, and nothing below changes:

    , ru: { word:/[А-Яа-яЁё]+.../g, det:'', glue:'и или но', ... }
    , es: { word:/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+.../g, det:'el la los las un una ...', ... }
    */
  };

  /* Turns a row into the lookup shape the functions below want. Built
     once per language on first use rather than on every call — this is
     read inside the blank-ranking loop for every word of every
     sentence. */
  var built = {};

  function set(str){
    var o = {};
    String(str || '').split(' ').forEach(function(w){ if (w) o[w] = true; });
    return o;
  }

  function rules(){
    var code = (GH.player && GH.player.target) ? GH.player.target() : 'de';
    if (!LANG[code]) code = 'de';
    if (built[code]) return built[code];
    var L = LANG[code];
    built[code] = {
      code: code,
      word: L.word,
      det: set(L.det),
      glue: set(L.glue),
      openers: set(L.openers),
      lowvalue: set(L.lowvalue),
      adjEnd: L.adjEnd,
      fold: L.fold || []
    };
    return built[code];
  }

  var BREAK = /[,.;:!?\u201e\u201c\u201d"\u00ab\u00bb()]/;

  /* how many blanks each sentence contributes */
  var PER_SENTENCE = 3;

  /* ---------- tokenizing ---------- */

  /* Splits a sentence into ordered pieces covering the whole string,
     so it can be rebuilt exactly. { text, isWord } */
  function tokenize(str){
    var out = [], last = 0, m;
    var WORD = rules().word;
    WORD.lastIndex = 0;
    while ((m = WORD.exec(str)) !== null){
      if (m.index > last) out.push({ text:str.slice(last, m.index), isWord:false });
      out.push({ text:m[0], isWord:true });
      last = m.index + m[0].length;
    }
    if (last < str.length) out.push({ text:str.slice(last), isWord:false });
    return out;
  }

  function words(str){
    var m = str.match(rules().word);
    return m ? m : [];
  }

  function capitalized(w){
    var c = w.charAt(0);
    return c === c.toUpperCase() && c !== c.toLowerCase();
  }

  /* attributive adjectives carry one of these endings */
  /* Attributive adjectives carry one of these endings — in a language
     that has them. `adjEnd` is null for English, and then nothing is
     adjective-shaped, which is correct rather than a gap: the German
     test would call `little`, `bigger` and `these` adjectives. */
  function adjectiveShaped(w){
    var R = rules();
    if (!R.adjEnd) return false;
    return !capitalized(w) && R.adjEnd.test(w) && !R.det[w.toLowerCase()];
  }

  function hash(str){
    var h = 0, i;
    for (i = 0; i < str.length; i++) h = ((h << 5) - h + str.charCodeAt(i)) | 0;
    return Math.abs(h);
  }

  /* ---------- blank units ---------- */

  function makeUnit(toks, start, end){
    var text = '', n = 0, i;
    for (i = start; i <= end; i++){
      text += toks[i].text;
      if (toks[i].isWord) n++;
    }
    return { start:start, end:end, text:text, wordCount:n };
  }

  function cleanBetween(toks, start, end){
    var i;
    for (i = start + 1; i < end; i++){
      if (!toks[i].isWord && BREAK.test(toks[i].text)) return false;
    }
    return true;
  }

  /* determiner (+ adjective) + noun, e.g. "der Apfel", "eine neue Jacke" */
  function nounPhrases(toks, wIdx){
    var spans = [], k;
    function isNoun(i){ return i !== undefined && capitalized(toks[i].text) && i !== wIdx[0]; }

    for (k = 0; k < wIdx.length; k++){
      var i = wIdx[k];
      if (!rules().det[toks[i].text.toLowerCase()]) continue;
      var n1 = wIdx[k + 1], n2 = wIdx[k + 2];
      if (isNoun(n1) && cleanBetween(toks, i, n1)){
        spans.push({ start:i, end:n1 });
        k += 1;
      } else if (n1 !== undefined && adjectiveShaped(toks[n1].text) && isNoun(n2) && cleanBetween(toks, i, n2)){
        spans.push({ start:i, end:n2 });
        k += 2;
      }
    }
    return spans;
  }

  function opensSentence(toks, i, wIdx){
    if (i === wIdx[0]) return true;
    var prev = toks[i - 1];
    return !!(prev && !prev.isWord && /[„“”":]/.test(prev.text));
  }

  function worthBlanking(toks, unit, wIdx){
    if (unit.wordCount > 1) return true;
    var w = toks[unit.start].text.toLowerCase();
    var R = rules();
    if (R.glue[w]) return false;
    if (R.openers[w] && opensSentence(toks, unit.start, wIdx)) return false;
    return true;
  }

  function score(toks, unit){
    if (unit.wordCount > 1) return 5;
    var w = toks[unit.start].text;
    if (capitalized(w) && unit.start !== 0) return 4;
    var lw = w.toLowerCase();
    if (rules().lowvalue[lw]) return w.length >= 4 ? 2 : 1;
    return w.length >= 4 ? 3 : 2;
  }

  /* Every candidate blank in a sentence. Half of all sentences keep the
     noun phrase together as one blank, half split it word by word — decided
     by the sentence itself, so it never changes between sessions. */
  function allUnits(de){
    var toks = tokenize(de);
    var wIdx = [], spans = [], claimed = {}, i;
    toks.forEach(function(tk, idx){ if (tk.isWord) wIdx.push(idx); });
    if (!wIdx.length) return [];

    if (hash(de) % 2 === 0){
      nounPhrases(toks, wIdx).forEach(function(sp){
        spans.push(sp);
        for (i = sp.start; i <= sp.end; i++) claimed[i] = true;
      });
    }
    wIdx.forEach(function(idx){ if (!claimed[idx]) spans.push({ start:idx, end:idx }); });
    spans.sort(function(a, b){ return a.start - b.start; });

    var units = spans.map(function(sp){ return makeUnit(toks, sp.start, sp.end); });
    var kept = units.filter(function(u){ return worthBlanking(toks, u, wIdx); });
    return kept.length ? kept : units;
  }

  /* The blanks actually used: the highest-value ones, capped per sentence.
     An explicit blanks:[…] in the data overrides all of this. */
  function blankUnits(de, override){
    var toks = tokenize(de);
    var wIdx = [], out = [];
    toks.forEach(function(tk, idx){ if (tk.isWord) wIdx.push(idx); });

    if (Object.prototype.toString.call(override) === '[object Array]' && override.length){
      override.forEach(function(n){
        var i = wIdx[n - 1];
        if (i !== undefined) out.push(makeUnit(toks, i, i));
      });
      return out;
    }

    var cands = allUnits(de);
    var ranked = cands.slice().sort(function(a, b){
      var d = score(toks, b) - score(toks, a);
      return d !== 0 ? d : a.start - b.start;
    }).slice(0, PER_SENTENCE);
    ranked.sort(function(a, b){ return a.start - b.start; });
    return ranked;
  }

  /* ---------- answer matching ---------- */

  /* Spelling that answer-matching forgives, per language. German folds
     umlauts and ß because `Strasse` for `Straße` is a real spelling a
     learner has typed correctly; English has nothing to fold, so the
     list is empty rather than the German one applied to it. */
  function normalize(str){
    var out = String(str).toLowerCase().replace(/[’']/g, '');
    rules().fold.forEach(function(pair){
      out = out.replace(pair[0], pair[1]);
    });
    return out.replace(/\s+/g, ' ').trim();
  }

  function distance(a, b){
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    var prev = new Array(n + 1), cur = new Array(n + 1), i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++){
      cur[0] = i;
      for (j = 1; j <= n; j++){
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  }

  /* 'exact' | 'close' | 'no' */
  function compare(input, target){
    var raw = String(input).trim();
    if (!raw) return 'no';
    if (raw === target) return 'exact';
    var a = normalize(raw), b = normalize(target);
    if (a === b) return 'close';        /* right words, wrong case or umlaut spelling */
    var limit = b.length <= 4 ? 1 : 2;
    return distance(a, b) <= limit ? 'close' : 'no';
  }

  /* SPELLING IS EXACT OR IT IS NOTHING.

     `compare()` accepts `close` — normalised umlauts, wrong case, up to two
     characters out — and that is right everywhere else, because a game
     about meaning should not fail her on a typo.

     It is exactly wrong for a copying drill. `Strasse` for `Straße`,
     `apfel` for `Apfel`, `schon` for `schön`: every one of those is the
     thing the exercise exists to teach, and every one of them passes
     `compare()` as 'close'.

     So this is character for character, with only surrounding whitespace
     forgiven. */
  function spelled(input, target){
    return String(input).trim() === String(target).trim();
  }

  /* Where it first went wrong, or -1 if it did not.

     Enough to show her the word was right up to the sixth character, which
     is a different piece of information from being told to try again. */
  function firstDiff(input, target){
    var a = String(input).trim(), b = String(target).trim();
    var n = Math.min(a.length, b.length), i;
    for (i = 0; i < n; i++) if (a[i] !== b[i]) return i;
    return a.length === b.length ? -1 : n;
  }

  function shuffle(arr){
    var a = arr.slice(), i, j, tmp;
    for (i = a.length - 1; i > 0; i--){
      j = Math.floor(Math.random() * (i + 1));
      tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  return {
    /* Which target languages have their own blanking rules. Anything
       else falls back to German — see the note on LANG. */
    langs: function(){ return Object.keys(LANG); },
    rules: rules,
    tokenize:tokenize,
    words:words,
    capitalized:capitalized,
    allUnits:allUnits,
    blankUnits:blankUnits,
    normalize:normalize,
    spelled:spelled,
    firstDiff:firstDiff,
    distance:distance,
    compare:compare,
    shuffle:shuffle
  };
})();
