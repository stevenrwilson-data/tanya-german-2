/* A song's vocabulary, on its own page.

   Row Your Boat has four words worth teaching. Sending her to a bank of
   752 to find them is not a vocabulary page, it is a search problem. This
   is that song's words and nothing else: tap Wortschatz on the song, get
   the list, tap Back.

   ------------------------------------------------------------------
   IT RESOLVES, IT DOES NOT STORE

   data/song-words.js holds a list of German words per song and no text at
   all for the ones that live elsewhere. Each reference is resolved here,
   first hit wins:

     1  GH_DICT       the multi-sense ones, FIRST. A dictionary headword
                      exists precisely to supersede a vocab entry that was
                      too coarse: `der Fuß` is «ступня / нога» in the bank
                      and ступня · подножие · фут in the dictionary, and
                      the bank's gloss is the ambiguity the dictionary was
                      written to fix. Checking vocab first showed the old
                      answer and hid the three senses. Nothing is lost by
                      going this way round — a sense carries its own image
                      number, so `der Fuß` still arrives with #558.

                      This is also the order packs.vocab() already uses,
                      where a dictionary headword takes over its GH_VOCAB
                      entry outright.
     2  GH_VOCAB      already in the bank with an image number, a gender
                      and two example sentences. The song shows the same
                      item the tutor schedules and the picture costs
                      nothing.
     3  GH_SONGWORDS  everything that exists nowhere else yet.

   So a word graduating — a drawing arrives, or it becomes a dictionary
   headword — needs no edit here and no edit in the song's list. The row in
   song-words.js is deleted and the resolver finds it one level up.

   ------------------------------------------------------------------
   WHAT A CARD SHOWS

   A picture if the word has one, at the sense level where senses exist,
   because a drawing is a claim about which meaning is meant. Otherwise the
   German set large, which is what sprite.js already does for an abstract
   word and is honest about there being no picture.

   Then the gloss in her language, then the definition if there is one.
   79 of these are waiting on a definition; until it arrives the card shows
   the gloss, which is thinner than intended and not wrong.

   German is spoken on tap. In German UI there is no second line, because
   the German is already the whole card.

   Reads window.GH_SONGWORDS. No file, no button — songbook.js checks. */

window.GH = window.GH || {};

GH.songWords = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function data(){ return window.GH_SONGWORDS || null; }

  /* Does this song have a list at all? songbook.js asks before drawing a
     button, so a song with no words shows none rather than an empty page. */
  function has(song){
    var d = data();
    return !!(d && song && song.audio && d.songs[song.audio] &&
              d.songs[song.audio].length);
  }

  function refs(song){
    var d = data();
    if (!d || !song || !song.audio) return [];
    return (d.songs[song.audio] || []).slice();
  }

  /* ---------- resolution ---------- */

  function fromBank(de){
    var V = window.GH_VOCAB || [], i;
    for (i = 0; i < V.length; i++) if (V[i].de === de) return V[i];
    return null;
  }

  function fromDict(de){
    var D = window.GH_DICT || [], i;
    for (i = 0; i < D.length; i++) if (D[i].de === de) return D[i];
    return null;
  }

  /* One reference -> what the card needs, whichever file answered.

       de       the German, always
       gloss    her language
       other    the third language, or '' when it duplicates the gloss
       img      one image number, 0 for none
       def      a definition string, or ''
       senses   [{ de, gloss, def, img }] when the dictionary answered with
                more than one meaning; null otherwise
       source   'vocab' | 'dict' | 'song', for the audit line at the foot */
  function resolve(de){
    var l = lang();

    /* Dictionary first. See the note at the top: the bank's gloss for a
       word that has since become a headword is the coarse one. */
    var d = fromDict(de);
    if (d){
      var senses = (d.senses || []).map(function(sn){
        return {
          de: sn.de || de,
          gloss: l === 'de' ? '' : (sn[l] || sn.en || ''),
          def: sn.def ? (sn.def[l] || sn.def.en || '') : '',
          img: sn.img || 0
        };
      });
      var first = senses[0] || { gloss:'', def:'', img:0 };
      return {
        de: de,
        gloss: first.gloss,
        other: '',
        img: first.img,
        def: first.def,
        senses: senses.length > 1 ? senses : null,
        source: 'dict'
      };
    }

    var v = fromBank(de);
    if (v){
      return {
        de: de,
        gloss: l === 'de' ? '' : (v[l] || v.en || ''),
        other: l === 'en' ? (v.ru || '') : (v.en || ''),
        img: GH.packs ? GH.packs.imgOf(v) : (v.img || v.n || 0),
        def: '',
        senses: null,
        source: 'vocab'
      };
    }

    var w = (data() && data().words[de]) || null;
    if (!w) return null;
    return {
      de: de,
      gloss: l === 'de' ? '' : (w[l] || w.en || ''),
      other: l === 'en' ? (w.ru || '') : (w.en || ''),
      img: w.img || 0,
      def: w.def ? (w.def[l] || w.def.en || '') : '',
      senses: null,
      kind: w.kind || 'word',
      source: 'song'
    };
  }

  /* A phrase with a gap in it cannot be read out as written. `so tun, als
     …` would be spoken with the ellipsis, and `an etwas denken` is fine but
     `jemandem etwas bringen` read aloud is three placeholders in a row. The
     gap words are replaced with something sayable so the button never
     produces nonsense, and the CARD still shows the real form, because the
     placeholder is the thing being taught. */
  function sayable(de){
    return String(de)
      .replace(/\u2026/g, '')
      .replace(/\bjemandem\b/g, 'ihm')
      .replace(/\bjemanden\b/g, 'ihn')
      .replace(/\bjemand\b/g, 'er')
      .replace(/\betwas\b/g, 'das')
      .replace(/,\s*als\s*$/, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  /* ---------- the same list, as an exercise ----------

     This page is already the one place a song's words are collected, which
     is exactly what a matching quiz needs — so the list becomes a session
     rather than only a page to read.

     resolve() returns what the CARD needs: a gloss in her current language
     and nothing in the other. Word Matching needs both languages, because
     the quiz shows her language on one side and it must still work after
     she switches. So this reaches back to the three sources directly
     instead of reusing resolve().

     A real GH_VOCAB entry is handed over untouched, so the word arrives
     with its own image number and its bank identity. The other two are
     built to the same shape.

     `say` carries the readable form for the five entries that have a
     placeholder in them — sayable() already exists here for the card's own
     speak button, and Word Matching honours the field. */
  function matchWords(song){
    var out = [];
    refs(song).forEach(function(de){
      var v = fromBank(de);
      if (v){ out.push(v); return; }

      var d = fromDict(de);
      if (d){
        /* The first sense carries the headword's picture and is the one the
           card shows; the others are meanings the dictionary page is for. */
        var sn = (d.senses || [])[0];
        if (!sn) return;
        out.push({ de:de, say:sayable(de), n:0, img:sn.img || 0,
                   ru:sn.ru || '', en:sn.en || '' });
        return;
      }

      var w = (data() && data().words[de]) || null;
      if (!w) return;
      out.push({ de:de, say:sayable(de), n:0, img:w.img || 0,
                 ru:w.ru || '', en:w.en || '' });
    });
    return out;
  }

  /* ---------- the page ---------- */

  function paint(){
    host.textContent = '';
    var song = state.song;

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      GH.speech.stop();
      state.onExit();
    });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('swTitle')));
    titles.appendChild(el('p', null, GH.i18n.pick(song.title)));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var list = refs(song);
    var cards = el('div', 'sw-list');
    var shown = 0, missing = [], withPic = 0;

    list.forEach(function(de){
      var r = resolve(de);
      if (!r){ missing.push(de); return; }
      shown++;
      if (r.img) withPic++;
      cards.appendChild(card(r));
    });

    host.appendChild(el('p', 'sw-count',
      t('swCountN', { n:shown, pics:withPic })));

    /* Straight from reading the list to being tested on it. Only when there
       are enough for a real quiz — Word Matching's own floor is ten pairs,
       and below that it runs but does not count, so offering it on a
       four-word list would be offering something that pays nothing. */
    var pool = matchWords(state.song);
    if (pool.length >= 10 && GH.wordMatch && GH.wordMatch.openWords){
      var go = el('button', 'btn btn-primary sw-match',
                  t('swMatchN', { n:pool.length }));
      go.type = 'button';
      go.addEventListener('click', function(){
        GH.speech.stop();
        /* Back returns HERE, to the song's word list, rather than to the
           hub — she came from a song and that is where she is going back
           to. */
        var back = state.onExit, song = state.song;
        GH.wordMatch.openWords(host, pool, function(){
          open(host, song, back);
        });
      });
      host.appendChild(go);
    }

    host.appendChild(cards);

    /* A reference that resolved to nothing is a typo between two files and
       has to say so. Silently showing 217 of 218 is the failure mode this
       whole arrangement exists to avoid. */
    if (missing.length){
      host.appendChild(el('p', 'sw-missing',
        t('swMissingN', { n:missing.length }) + ' ' + missing.join(', ')));
    }

    if (GH.nav) GH.nav.ready();
  }

  function card(r){
    var box = el('div', 'sw-card');

    /* Tap to enlarge. The thumbnail is 62px because the card is a
       reference entry rather than a test, which is right for scanning and
       useless for actually looking at the drawing.

       GH.lightbox.open(n, word) is the sheet-crop entry point — the same
       crop as the thumbnail, just bigger — and it takes the vocabulary
       entry for the caption. Passing `r` rather than the real entry is
       deliberate: `r` already carries the resolved `de` and the gloss for
       her CURRENT language, whereas the raw entry would caption a
       dictionary sense with the bank's coarser wording.

       `.sw-lens` and not the bare div, so nav's KEEP list can stop this
       tap also advancing whatever is behind it. */
    if (r.img && GH.sprite && GH.sprite.has(r.img)){
      var pic = el('button', 'sw-pic sw-lens');
      pic.type = 'button';
      pic.setAttribute('aria-label', r.de);
      pic.appendChild(GH.sprite.tile(r.img, r.de));
      pic.addEventListener('click', function(){
        if (!GH.lightbox) return;
        /* lightbox.open() reads word.ru when the interface is Russian and
           word.en otherwise, so both are filled with the gloss resolve()
           already worked out for the language she is in.

           In German both are empty on purpose. `r.gloss` is '' there, and
           falling back to `r.other` would caption a German card in
           English — which is the one thing German mode exists to avoid. */
        var cap = (lang() === 'de') ? '' : (r.gloss || r.other || '');
        GH.lightbox.open(r.img, { de:r.de, ru:cap, en:cap });
      });
      box.appendChild(pic);
    }

    var body = el('div', 'sw-body');

    var de = el('button', 'sw-de' + (r.kind ? ' is-' + r.kind : ''), r.de);
    de.type = 'button';
    de.addEventListener('click', function(){ GH.speech.say(sayable(r.de)); });
    body.appendChild(de);

    if (r.senses){
      /* More than one meaning, so all of them. A card that shows сон and
         quietly drops мечта teaches her half the word. */
      var ul = el('ul', 'sw-senses');
      r.senses.forEach(function(sn){
        var li = el('li', 'sw-sense');
        li.appendChild(el('span', 'sw-sense-gloss', sn.gloss));
        if (sn.def) li.appendChild(el('span', 'sw-sense-def', sn.def));
        ul.appendChild(li);
      });
      body.appendChild(ul);
    } else {
      if (r.gloss) body.appendChild(el('p', 'sw-gloss', r.gloss));
      if (r.other && r.other !== r.gloss){
        body.appendChild(el('p', 'sw-other', r.other));
      }
      if (r.def) body.appendChild(el('p', 'sw-def', r.def));
    }

    box.appendChild(body);
    return box;
  }

  /* ---------- entry ---------- */

  function open(container, song, onExit){
    host = container;
    state = { song:song, onExit:onExit };
    /* WHICH song's word list. This screen is reached from a song, so
       app.js's open/leave records it as one activity for all nine. */
    if (song && GH.events && GH.events.mark){
      GH.events.mark('read', 'songwords:' + song.audio);
    }
    /* Repaint in place on the language switch rather than being sent back
       to the song, which is the whole point of app.js's launch(). */
    GH.app.redraw = paint;
    paint();
  }

  return { open:open, has:has, resolve:resolve, refs:refs };
})();
