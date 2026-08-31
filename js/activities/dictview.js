/* The dictionary screen.

   Two views. A list of headwords, and one headword with all of its senses
   opened out. Nothing is graded here and nothing is scheduled — this is
   the place she comes to when a word in a song or a story meant something
   she did not expect.

   WHAT IT SHOWS PER SENSE

     the German for that sense, which is not always the headword —
       `halten für` and `eine Entscheidung treffen` are senses that carry
       their own German, and hiding that behind `halten` is how a learner
       meets `Ich halte das für falsch` and finds nothing
     her language and the other one, both, because Nazar reads the English
     the definition in her language
     the German definition, second and quieter, for when she wants it
     the picture, if this sense has one

   A sense with no picture is not a gap. Rule 4: an abstract meaning is
   taught by its definition and by the songs, stories and sentences it
   turns up in, and a drawing of a foot has nothing to say about the foot
   of a mountain.

   The image comes through GH.sprite.tile() with the sense's own number, so
   the drawing sits with the meaning it illustrates and nothing implies it
   covers the others.

   Reads window.GH_DICT. No dictionary, no tile — app.js checks. */

window.GH = window.GH || {};

GH.dictView = (function(){

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

  function entries(){ return window.GH_DICT || []; }

  /* Sorted the way a dictionary is: by the word, not by the article. */
  function sorted(){
    return entries().slice().sort(function(a, b){
      return bare(a.de).localeCompare(bare(b.de), 'de');
    });
  }

  function bare(de){
    var p = String(de || '').split(' ');
    if (p.length > 1 && (p[0] === 'der' || p[0] === 'die' || p[0] === 'das')){
      return p.slice(1).join(' ');
    }
    return de || '';
  }

  function speak(de){
    if (GH.speech) GH.speech.say(de);
  }

  /* ---------- the list ---------- */

  function paintIndex(){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('dcTitle')));
    titles.appendChild(el('p', null, t('dcSub')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var list = sorted();
    if (!list.length){
      host.appendChild(el('p', 'lede', t('dcEmpty')));
      if (GH.nav) GH.nav.ready();
      return;
    }

    var grid = el('div', 'dc-list');
    list.forEach(function(entry){
      var b = el('button', 'dc-entry');
      b.type = 'button';
      b.appendChild(el('span', 'dc-entry-de', entry.de));
      b.appendChild(el('span', 'dc-entry-n',
        t('dcSenseCount', { n:(entry.senses || []).length })));
      /* the first line of each sense, so the list already answers "which
         meanings does this word have" without opening anything */
      var gl = (entry.senses || []).map(function(sn){
        return sn[lang()] || sn.en || '';
      }).filter(Boolean).join(' · ');
      if (gl) b.appendChild(el('span', 'dc-entry-gloss', gl));
      b.addEventListener('click', function(){
        state.head = entry.de;
        paintEntry();
      });
      grid.appendChild(b);
    });
    host.appendChild(grid);

    if (GH.nav) GH.nav.ready();
  }

  /* ---------- one headword ---------- */

  function paintEntry(){
    var entry = null, all = entries(), i;
    for (i = 0; i < all.length; i++) if (all[i].de === state.head) entry = all[i];
    if (!entry){ paintIndex(); return; }

    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.head = null; paintIndex(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    var h = el('h1', null, entry.de);
    titles.appendChild(h);
    titles.appendChild(el('p', null,
      t('dcSenseCount', { n:(entry.senses || []).length })));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var say = el('button', 'btn dc-say', '\u25b6 ' + entry.de);
    say.type = 'button';
    say.addEventListener('click', function(){ speak(entry.de); });
    host.appendChild(say);

    (entry.senses || []).forEach(function(sn, idx){
      host.appendChild(senseCard(sn, idx + 1, entry.de));
    });

    if (GH.nav) GH.nav.ready();
  }

  function senseCard(sn, num, head){
    var card = el('div', 'card dc-sense');

    card.appendChild(el('p', 'dc-sense-num', t('dcSenseN', { n:num })));

    /* The sense's own German first, and said out loud on tap. Where it
       differs from the headword that difference is the point. */
    var de = el('button', 'dc-sense-de', sn.de || head);
    de.type = 'button';
    de.addEventListener('click', function(){ speak(sn.de || head); });
    card.appendChild(de);

    /* Both glosses, hers larger. Nazar reads the English. */
    var mine = sn[lang()] || '';
    var other = lang() === 'en' ? (sn.ru || '') : (sn.en || '');
    if (mine) card.appendChild(el('p', 'dc-sense-gloss', mine));
    if (other && other !== mine) card.appendChild(el('p', 'dc-sense-alt', other));

    /* The picture belongs to this sense and to no other. */
    if (sn.img && GH.sprite && GH.sprite.has(sn.img)){
      var pic = el('div', 'dc-sense-pic');
      pic.appendChild(GH.sprite.tile(sn.img, sn.de || head));
      card.appendChild(pic);
    }

    if (sn.def){
      var d = sn.def[lang()] || '';
      if (d) card.appendChild(el('p', 'dc-sense-def', d));
      /* The German definition second and quieter — useful when she wants
         it, noise when she does not. Not shown twice when she is already
         reading in German. */
      if (sn.def.de && lang() !== 'de'){
        card.appendChild(el('p', 'dc-sense-defde', sn.def.de));
      }
    }

    return card;
  }

  /* ---------- entry point ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, head:null };
    GH.app.redraw = function(){
      if (state.head) paintEntry(); else paintIndex();
    };
    paintIndex();
  }

  var entry = {
    id:'dictionary',
    /* Beside the word list rather than in Games: nothing here is scored. */
    kind:'ref',
    glyph:'\ud83d\udcd5',
    name:{ ru:'Словарь', de:'Wörterbuch', en:'Dictionary' },
    sub:{ ru:'Слова с несколькими значениями',
          de:'Wörter mit mehreren Bedeutungen',
          en:'Words with more than one meaning' },
    open:open
  };

  /* index.html loads the activities before app.js, so a bare guarded call
     registers nothing, silently. Retry once the document is ready. */
  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register };
})();
