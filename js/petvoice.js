/* What the pet says at the end of a round.

   `data/petlines.js` has held 113 lines across all sixteen pets since the
   night they were written, and nothing opened the file. This opens it.

   Four things have to line up before a line can be shown, and each of
   them was decided somewhere else:

     the band     from how she did, not from the tone word. 'done' covers
                  everything from 51% to 99%, and the difference between
                  those is the difference between 'almost' and 'not yet'.
     the name     {name} is in every string. She may not have set one, and
                  on the first day she will not have — so the token has to
                  go and take its comma with it, or the pet says
                  'Perfekt, . Gut gemacht.'
     the gender   Russian marks the listener in the ordinary past tense.
                  `ru` holds the feminine, `ruM` the masculine where it
                  differs, and the profile now knows which.
     the language German is what she sees. The translation is a button,
                  because a translation always on screen is a translation
                  she reads instead of the German.

   Nothing here decides what a pet is like. That is the writing, and the
   writing is in the data. */

window.GH = window.GH || {};

GH.petVoice = (function(){

  /* Where the bands divide. Inclusive at the bottom: 80 is `high`, 50 is
     `mid`, 49 is `low`. */
  var HIGH = 80;
  var MID  = 50;

  function bandFor(pct){
    if (pct >= 100) return 'perfect';
    if (pct >= HIGH) return 'high';
    if (pct >= MID)  return 'mid';
    return 'low';
  }

  /* Reading the score off an end screen that was never asked to report one.

     Every game builds its own `stats` array, and most of them use
     GH.run.stats(), which puts the percentage in as a string like '73%'.
     Failing that, a good/bad pair of counts gives the same answer. A
     caller can also just pass `pct` and skip all of it.

     The tone word is the last resort, and a poor one: 'done' spans 51 to
     99, so falling back to it loses the distinction the bands exist for. */
  function pctOf(spec){
    if (typeof spec.pct === 'number') return spec.pct;

    var stats = spec.stats || [];
    var i, n;
    for (i = 0; i < stats.length; i++){
      n = stats[i].n;
      if (typeof n === 'string' && /^\d+%$/.test(n)) return parseInt(n, 10);
    }
    var good = null, bad = null;
    for (i = 0; i < stats.length; i++){
      if (typeof stats[i].n !== 'number') continue;
      if (stats[i].kind === 'good' && good === null) good = stats[i].n;
      if (stats[i].kind === 'bad'  && bad  === null) bad  = stats[i].n;
    }
    if (good !== null && bad !== null && (good + bad) > 0){
      return Math.round(good / (good + bad) * 100);
    }
    if (spec.tone === 'perfect') return 100;
    if (spec.tone === 'lost') return 0;
    return 75;
  }

  /* {name} out, and the punctuation that was holding it up.

     'Perfekt, {name}. Gut gemacht.' with no name has to become
     'Perfekt. Gut gemacht.' — so the comma or dash before the token goes
     with it, and a token that opened the sentence takes the following
     punctuation instead. */
  function fill(text, name){
    if (!text) return '';
    if (name) return text.split('{name}').join(name);
    return text
      .replace(/\s*[,—–-]\s*\{name\}/g, '')     /* …, {name} */
      .replace(/\{name\}\s*[,!?]\s*/g, '')      /* {name}, … */
      .replace(/\s*\{name\}/g, '')              /* anything left */
      .replace(/\s+([,.!?…])/g, '$1')           /* space left before a stop */
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /* The translation she gets, in the language she is reading the app in.
     In German there is nothing to translate, so the caller shows no
     button rather than an empty one. */
  function translationOf(row, lang, male){
    if (lang === 'de') return '';
    if (lang === 'ru') return male && row.ruM ? row.ruM : (row.ru || '');
    return row.en || row.ru || '';
  }

  /* One line for one pet, or null when that pet has nothing for that band.
     Null is a real answer: the end screen shows the pet in silence, which
     is what it did before this existed. */
  function lineFor(petId, spec){
    var all = window.GH_PETLINES;
    if (!all || !petId || !all[petId]) return null;

    var band = bandFor(pctOf(spec || {}));
    var rows = all[petId][band];
    if (!rows || !rows.length) return null;

    var row = rows[Math.floor(Math.random() * rows.length)];
    var name = (GH.player && GH.player.current().name || '').trim();
    var lang = GH.i18n ? GH.i18n.lang() : 'de';
    var male = !!(GH.player && GH.player.gender() === 'm');

    var de = fill(row.de, name);
    return {
      band: band,
      de: de,
      /* what the speech engine says: the German, always, because that is
         the point of hearing it */
      say: de,
      tr: fill(translationOf(row, lang, male), name)
    };
  }

  /* A named band rather than one derived from a score.

     `lineFor` works out the band from how the round went, which is right
     on an end screen and meaningless on arrival — she has not done
     anything yet. Every pet has a `welcome` band and it has never been
     used, because until now nothing greeted her.

     Same name filling, same translation rules, same null-is-an-answer
     contract: a pet with no line for that band stays silent rather than
     borrowing one. */
  function bandLine(petId, band){
    var all = window.GH_PETLINES;
    if (!all || !petId || !all[petId]) return null;
    var rows = all[petId][band];
    if (!rows || !rows.length) return null;

    var row = rows[Math.floor(Math.random() * rows.length)];
    var name = (GH.player && GH.player.current().name || '').trim();
    var lang = GH.i18n ? GH.i18n.lang() : 'de';
    var male = !!(GH.player && GH.player.gender() === 'm');
    var de = fill(row.de, name);
    return { band:band, de:de, say:de, tr:fill(translationOf(row, lang, male), name) };
  }

  return { lineFor:lineFor, bandLine:bandLine, bandFor:bandFor,
           pctOf:pctOf, fill:fill };
})();
