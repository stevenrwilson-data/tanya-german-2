/* READER WORDS — the word list for one piece.

   songvocab.js with three things changed: the data global, the key it looks
   a piece up by, and the class prefix. Everything else is the same because
   the job is the same — resolve a list of German headwords through
   dictionary, bank and own table, and draw a card for each.

   THE DIFFERENCE THAT MATTERS IS NOT IN THIS FILE. Opening this costs her
   nothing. Revealing a translation in the reader rests that piece's
   questions for five days; this does not touch the rest at all. The cheap
   path is the one that builds comprehension.

*/

window.GH = window.GH || {};

GH.readerWords = (function(){

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

  function data(){ return window.GH_READERWORDS || null; }

  /* Does this piece have a list at all? reader.js asks before drawing a
     button, so a piece with no words shows none rather than an empty page. */
  function has(piece){
    var d = data();
    return !!(d && piece && piece.id && d.pieces[piece.id] &&
              d.pieces[piece.id].length);
  }

  function refs(piece){
    var d = data();
    if (!d || !piece || !piece.id) return [];
    return (d.pieces[piece.id] || []).slice();
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

  /* ---------- the page ---------- */

  function paint(){
    host.textContent = '';
    var piece = state.piece;

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      GH.speech.stop();
      state.onExit();
    });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('rwTitle')));
    titles.appendChild(el('p', null, GH.i18n.pick(piece.title)));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var list = refs(piece);
    var cards = el('div', 'rw-list');
    var shown = 0, missing = [], withPic = 0;

    list.forEach(function(de){
      var r = resolve(de);
      if (!r){ missing.push(de); return; }
      shown++;
      if (r.img) withPic++;
      cards.appendChild(card(r));
    });

    host.appendChild(el('p', 'rw-count',
      t('rwCountN', { n:shown, pics:withPic })));
    host.appendChild(cards);

    /* A reference that resolved to nothing is a typo between two files and
       has to say so. Silently showing 217 of 218 is the failure mode this
       whole arrangement exists to avoid. */
    if (missing.length){
      host.appendChild(el('p', 'rw-missing',
        t('swMissingN', { n:missing.length }) + ' ' + missing.join(', ')));
    }

    if (GH.nav) GH.nav.ready();
  }

  function card(r){
    var box = el('div', 'rw-card');

    /* Tap to enlarge. The thumbnail is 62px because the card is a
       reference entry rather than a test, which is right for scanning and
       useless for actually looking at the drawing.

       GH.lightbox.open(n, word) is the sheet-crop entry point — the same
       crop as the thumbnail, just bigger — and it takes the vocabulary
       entry for the caption. Passing `r` rather than the real entry is
       deliberate: `r` already carries the resolved `de` and the gloss for
       her CURRENT language, whereas the raw entry would caption a
       dictionary sense with the bank's coarser wording.

       `.rw-lens` and not the bare div, so nav's KEEP list can stop this
       tap also advancing whatever is behind it. */
    if (r.img && GH.sprite && GH.sprite.has(r.img)){
      var pic = el('button', 'rw-pic rw-lens');
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

    var body = el('div', 'rw-body');

    var de = el('button', 'rw-de' + (r.kind ? ' is-' + r.kind : ''), r.de);
    de.type = 'button';
    de.addEventListener('click', function(){ GH.speech.say(sayable(r.de)); });
    body.appendChild(de);

    if (r.senses){
      /* More than one meaning, so all of them. A card that shows сон and
         quietly drops мечта teaches her half the word. */
      var ul = el('ul', 'rw-senses');
      r.senses.forEach(function(sn){
        var li = el('li', 'rw-sense');
        li.appendChild(el('span', 'rw-sense-gloss', sn.gloss));
        if (sn.def) li.appendChild(el('span', 'rw-sense-def', sn.def));
        ul.appendChild(li);
      });
      body.appendChild(ul);
    } else {
      if (r.gloss) body.appendChild(el('p', 'rw-gloss', r.gloss));
      if (r.other && r.other !== r.gloss){
        body.appendChild(el('p', 'rw-other', r.other));
      }
      if (r.def) body.appendChild(el('p', 'rw-def', r.def));
    }

    box.appendChild(body);
    return box;
  }

  /* ---------- entry ---------- */

  function open(container, piece, onExit){
    host = container;
    state = { piece:piece, onExit:onExit };
    /* WHICH piece's word list. This screen is reached from a piece, so
       app.js's open/leave records it as one activity for all nine. */
    if (piece && GH.events && GH.events.mark){
      GH.events.mark('read', 'songwords:' + piece.id);
    }
    /* Repaint in place on the language switch rather than being sent back
       to the song, which is the whole point of app.js's launch(). */
    GH.app.redraw = paint;
    paint();
  }

  return { open:open, has:has, resolve:resolve, refs:refs };
})();
