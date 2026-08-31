/* Wörterbuch — the whole vocabulary in one scrolling list.

   Not an exercise. Paper has one advantage over every drill in this
   app: you can see the whole set at once and notice the patterns —
   that Jacke and Tasche are both feminine, that half the verbs end in
   -en. A single-item screen can never show that. So this is her sheet
   of paper, with the pictures and the audio attached.

   Grouping is the point. The same 278 entries sorted by gender teach
   something different from the same entries sorted by topic. */

window.GH = window.GH || {};

GH.reference = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- classifying ---------- */

  function article(de){
    var w = de.split(' ')[0].toLowerCase();
    return (w === 'der' || w === 'die' || w === 'das') ? w : null;
  }

  /* An entry can start with an article without being a noun:
     'das Gesicht waschen' and 'die Augen schließen' are verb phrases,
     'der Zug hat Verspätung' is a clause. German capitalises nouns and
     not infinitives, so the last word decides it, and a length cap of
     three rules out the clauses. Without this the gender groupings would
     happily try to compare the gender of "to wash the face". */
  function isNounEntry(de){
    if (!article(de)) return false;
    var p = de.split(/\s+/);
    if (p.length > 3) return false;
    return /^[A-ZÄÖÜ]/.test(p[p.length - 1]);
  }

  function bareNoun(de){
    var a = article(de);
    return a ? de.split(' ').slice(1).join(' ') : de;
  }

  /* Shape, not grammar: an entry with an article and few words is a
     noun, one ending in -en without an article is a verb, a lone word
     is an adjective, anything longer is a phrase. Good enough to sort
     by, and wrong on nothing that matters. */
  function shape(v){
    var parts = v.de.split(' ');
    var last = parts[parts.length - 1];
    if (article(v.de) && parts.length <= 3) return 'noun';
    if (/(en|ern|eln)$/.test(last) && !article(v.de)) return 'verb';
    if (parts.length === 1) return 'adj';
    return 'phrase';
  }

  function isPlural(v){
    return article(v.de) === 'die' && /s$/.test(v.en) && !/ss$/.test(v.en);
  }

  function isCompound(v){
    var p = v.de.split(' ');
    return !!article(v.de) && p.length === 2 && p[1].length >= 11;
  }

  /* Russian gender comes from the data now — an explicit label per
     entry rather than a guess from the word ending, which got -ь nouns
     wrong and read plurals like 'яйца' as feminine.

     rg is the gender of the Russian as written; rgs is the singular's
     gender when the Russian is plural. Where either language uses a
     plural the comparison is skipped: gender only means something
     singular to singular, and we hold no German singular for entries
     like 'die Augen'. */
  var DE_TO_RU = { der:'M', die:'F', das:'N' };

  function genderMatch(v){
    var a = article(v.de);
    if (!a || !v.rg || !isNounEntry(v.de)) return null;
    if (v.rg === 'PL' || isPlural(v)) return null;
    return DE_TO_RU[a] === v.rg ? 'same' : 'differ';
  }

  /* ---------- the groupings ---------- */

  var VIEWS = [
    { id:'topic',  key:'refByTopic' },
    { id:'gender', key:'refByGender' },
    { id:'type',   key:'refByType' },
    { id:'gsame',  key:'refGenderSame' },
    { id:'gdiff',  key:'refGenderDiff' },
    { id:'plural', key:'refPlurals' },
    { id:'compound', key:'refCompounds' },
    { id:'alpha',  key:'refAlpha' },
    { id:'number', key:'refByNumber' }
  ];

  function pool(){
    var V = (window.GH_VOCAB || []).slice();
    if (state.catCount){
      V = V.filter(function(v){
        return GH.packs.catsOf(v).some(function(c){ return state.cats[c]; });
      });
    }
    if (state.q){
      /* The dictionary supersedes its bank entry, exactly as packs.vocab()
         does. Without this, `ступня` returned `der Fuß` twice: once as the
         corrected sense and once as the bank's coarser «ступня / нога». Two
         rows, same word, different answers — which teaches her that the app
         does not know either. */
      var supers = {};
      (window.GH_DICT || []).forEach(function(d){ supers[d.de] = true; });
      V = V.filter(function(v){ return !supers[v.de]; });
      V = search(V.concat(dictItems()), state.q);
    }
    return V;
  }

  /* The dictionary's senses, searchable alongside the bank.

     `место` found `der Ort` and `der Sitzplatz` and NOT `der Platz`,
     because `der Platz` lives in dictionary.js and this screen only ever
     read GH_VOCAB. The multi-sense words — the ones where seeing the
     alternatives side by side IS the answer — were the only ones the search
     could not reach.

     packs.expand() already turns a headword into one item per sense with
     de, ru, en and an image number, which is the same shape a bank row has,
     so nothing downstream needs to know the difference.

     Only while searching. Adding thirteen senses to the browsable list
     would show `der Fuß` four times over: once from the bank and once per
     sense. */
  function dictItems(){
    if (!GH.packs || !GH.packs.expand) return [];
    var out = [];
    (window.GH_DICT || []).forEach(function(entry){
      GH.packs.expand(entry).forEach(function(item){ out.push(item); });
    });
    return out;
  }

  /* ---------- searching, in either language ----------

     Both directions matter and for different reasons. She hears a word and
     wants to know what it means: that is German in. She knows what she
     wants to say and cannot remember it: that is Russian in, and it is the
     harder, more useful case — the one a paper dictionary is for.

     `GH.text.normalize` already folds ä to ae, ö to oe, ü to ue and ß to
     ss, which is exactly what someone typing German on a Cyrillic keyboard
     produces. It also lowercases, so `FENSTER`, `fenster` and `Fenster` are
     one query.

     THE ARTICLE IS STRIPPED FROM THE HAYSTACK, NOT THE NEEDLE. Typing
     `Fenster` has to find `das Fenster`, and someone who types `das
     Fenster` should get it too — so both the bare noun and the full form
     are searched. Doing it the other way round means `die` matches three
     hundred rows.

     Ranked, not just filtered. An exact match first, then things that
     START with the query, then anything containing it. Searching `Bett`
     should not bury `das Bett` under `das Bettzeug` and `ein Bett machen`.
     Within a rank, shorter first: the plain word before the phrase built
     around it. */
  function fold(x){
    return GH.text && GH.text.normalize ? GH.text.normalize(x)
      : String(x).toLowerCase();
  }

  /* Every string a row can be found by. */
  function haystack(v){
    var out = [fold(v.de)];
    var bare = bareNoun(v.de);
    if (bare && bare !== v.de) out.push(fold(bare));
    if (v.ru) out.push(fold(v.ru));
    if (v.en) out.push(fold(v.en));
    /* the example sentences too — she may half-remember the phrase rather
       than the word, and 1500 sentences is a lot of recall to waste */
    (GH.packs.sentencesOf(v) || []).forEach(function(x){
      if (x.de) out.push(fold(x.de));
    });
    return out;
  }

  function rankOf(hay, q){
    var best = 9;
    hay.forEach(function(h, i){
      /* a hit in an example sentence is worth less than one in the word
         itself, so sentences (index 3 and up) never outrank a real match */
      var floor = i >= 3 ? 5 : 0;
      if (h === q) best = Math.min(best, floor + 0);
      else if (h.indexOf(q) === 0) best = Math.min(best, floor + 1);
      else if (h.indexOf(' ' + q) >= 0) best = Math.min(best, floor + 2);
      else if (h.indexOf(q) >= 0) best = Math.min(best, floor + 3);
    });
    return best;
  }

  function search(V, raw){
    var q = fold(raw);
    if (!q) return V;
    var hits = [];
    V.forEach(function(v){
      var r = rankOf(haystack(v), q);
      if (r < 9) hits.push({ v:v, r:r });
    });
    hits.sort(function(a, b){
      if (a.r !== b.r) return a.r - b.r;
      return a.v.de.length - b.v.de.length;
    });
    return hits.map(function(x){ return x.v; });
  }

  /* The box.

     Not rebuilt on every keystroke, and this is the whole difficulty: the
     list repaints as she types, and repainting destroys the input she is
     typing into — the field loses focus and the keyboard closes on the
     iPhone after one letter.

     So the node is created once and moved into place on each paint,
     carrying its value and its cursor with it. `state.box` holds it.

     Searching also opens every group, because a search with three hits
     hidden inside three collapsed sections looks like no hits at all. */
  function searchBox(){
    var wrap = el('div', 'ref-search');

    if (!state.box){
      var box = document.createElement('input');
      box.className = 'ref-search-in';
      box.type = 'search';
      box.setAttribute('autocomplete', 'off');
      box.setAttribute('autocapitalize', 'off');
      box.setAttribute('spellcheck', 'false');
      box.addEventListener('input', function(){
        state.q = box.value.trim();
        /* Every group open while searching, closed again when the query is
           cleared — otherwise she is left with 341 rows unrolled. */
        state.allOpen = !!state.q;
        paint();
      });
      state.box = box;
    }
    state.box.setAttribute('placeholder', t('refSearchPlaceholder'));
    wrap.appendChild(state.box);

    if (state.q){
      var clear = el('button', 'ref-search-x', '\u00d7');
      clear.type = 'button';
      clear.setAttribute('aria-label', t('close'));
      clear.addEventListener('click', function(){
        state.q = ''; state.allOpen = false;
        state.box.value = '';
        paint();
      });
      wrap.appendChild(clear);
    }
    return wrap;
  }

  function groups(view){
    var V = pool();
    var out = [];

    /* A SEARCH IS ONE FLAT RANKED LIST.

       The whole value of the search is the order — exact match, then
       prefix, then contains — and the grouped views destroy it. Sorting the
       hits back into `Kitchen` and `Clothes` puts an exact match three
       collapsed sections below a partial one.

       It matters most in the direction that matters most. Typing `место`
       should give `der Ort` and `der Platz` side by side, one under the
       other, because seeing the alternatives together IS the answer — it is
       the one thing a word list can do that a single translation cannot.
       Split across two category groups, she finds one and never learns the
       other exists. */
    if (state.q){
      if (!V.length) return [];
      return [{ label:t('refHitsN', { n:V.length }), items:V, note:'' }];
    }

    function push(label, items, note){
      if (items.length) out.push({ label:label, items:items, note:note || '' });
    }

    if (view === 'topic'){
      (GH_BANK.categories || []).forEach(function(c){
        /* a word in three categories appears under all three, which is the
           point of the change — the list is a view, not a filing cabinet */
        push(GH.i18n.pick(c), V.filter(function(v){ return GH.packs.inCat(v, c.id); }));
      });
      return out;
    }

    if (view === 'gender'){
      ['der', 'die', 'das'].forEach(function(a){
        push(a, V.filter(function(v){ return article(v.de) === a; }), t('refGender_' + a));
      });
      push(t('refNoArticle'), V.filter(function(v){ return !article(v.de); }));
      return out;
    }

    if (view === 'type'){
      [['noun', 'refNouns'], ['verb', 'refVerbs'], ['adj', 'refAdjs'], ['phrase', 'refPhrases']]
        .forEach(function(pair){
          push(t(pair[1]), V.filter(function(v){ return shape(v) === pair[0]; }));
        });
      return out;
    }

    if (view === 'gsame' || view === 'gdiff'){
      var want = view === 'gsame' ? 'same' : 'differ';
      var hits = V.filter(function(v){ return genderMatch(v) === want; });
      /* inside the differ list, split by what German uses — that is the
         thing she has to remember */
      ['der', 'die', 'das'].forEach(function(a){
        push(a, hits.filter(function(v){ return article(v.de) === a; }),
             t(want === 'same' ? 'refSameNote' : 'refDiffNote'));
      });
      var missing = V.filter(function(v){ return isNounEntry(v.de) && !v.rg; }).length;
      if (missing) push(t('refNoRussian'), [], t('refNoRussianNote', { n:missing }));
      return out;
    }

    if (view === 'plural'){
      push(t('refPlurals'), V.filter(isPlural), t('refPluralNote'));
      return out;
    }

    if (view === 'compound'){
      push(t('refCompounds'), V.filter(isCompound), t('refCompoundNote'));
      return out;
    }

    if (view === 'alpha'){
      var sorted = V.slice().sort(function(a, b){
        return bareNoun(a.de).localeCompare(bareNoun(b.de), 'de');
      });
      var letter = null, bucket = [];
      sorted.forEach(function(v){
        var L = bareNoun(v.de).charAt(0).toUpperCase();
        if (L !== letter){
          if (bucket.length) push(letter, bucket);
          letter = L; bucket = [];
        }
        bucket.push(v);
      });
      if (bucket.length) push(letter, bucket);
      return out;
    }

    /* number: her own generation order, in blocks of the sheet */
    var block = [];
    var from = 1;
    V.slice().sort(function(a, b){ return a.n - b.n; }).forEach(function(v){
      block.push(v);
      if (block.length === 30){
        push('#' + from + '–' + v.n, block);
        block = []; from = v.n + 1;
      }
    });
    if (block.length) push('#' + from + '–' + block[block.length - 1].n, block);
    return out;
  }

  /* Same collapsed-chip filter as the hub. Applied to the pool before
     grouping rather than to the rendered rows, so it narrows the list
     whichever way it is currently sorted — filtering to Кухня and then
     switching to A–Z gives the kitchen words alphabetically, not the
     whole vocabulary again. */
  /* One topic list for the whole app. Every topic has both sentences and
     words now, so there is nothing to filter out — the three that used to
     group sentences only were folded into the vocabulary topics their
     images already belonged to. */
  function allTopics(){
    return (GH_BANK.categories || []).slice();
  }

  function toggleCat(id){
    if (id === 'all'){
      state.cats = {}; state.catCount = 0;
    } else if (state.cats[id]){
      delete state.cats[id]; state.catCount--;
    } else {
      state.cats[id] = true; state.catCount++;
    }
    paint();
  }

  function filterBlock(){
    var wrap = el('div', 'filterwrap');

    var toggle = el('button', 'filter-toggle' + (state.catCount ? ' has' : ''));
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', state.filterOpen ? 'true' : 'false');
    toggle.appendChild(el('span', null, t('filterBy')));
    toggle.appendChild(el('span', 'filter-caret', state.filterOpen ? '▴' : '▾'));
    if (state.catCount) toggle.appendChild(el('span', 'filter-badge', state.catCount));
    toggle.addEventListener('click', function(){
      state.filterOpen = !state.filterOpen;
      paint();
    });
    wrap.appendChild(toggle);

    if (!state.filterOpen) return wrap;

    var chips = el('div', 'chips');
    var all = el('button', 'chip' + (state.catCount ? '' : ' on'), t('allTopics'));
    all.type = 'button';
    all.addEventListener('click', function(){ toggleCat('all'); });
    chips.appendChild(all);

    allTopics().forEach(function(c){
      var on = !!state.cats[c.id];
      var b = el('button', 'chip' + (on ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.appendChild(el('span', 'chip-glyph', c.glyph));
      b.appendChild(document.createTextNode(' ' + GH.i18n.pick(c)));
      b.addEventListener('click', function(){ toggleCat(c.id); });
      chips.appendChild(b);
    });
    wrap.appendChild(chips);
    wrap.appendChild(el('p', 'filter-hint', t('filterHint')));
    return wrap;
  }

  /* ---------- painting ---------- */

  /* A row is two targets, not one: the picture opens the lightbox, the
     text speaks the word. Nested buttons are invalid HTML, so the row is
     a plain div holding two buttons rather than one button wrapping
     another. */
  function row(v){
    var wrap = el('div', 'ref-row');

    var thumb = el('button', 'ref-thumb');
    thumb.type = 'button';
    thumb.setAttribute('aria-label', 'Enlarge ' + v.de);
    thumb.appendChild(GH.sprite.tile(GH.packs.imgOf(v), v.de));
    thumb.addEventListener('click', function(){ GH.lightbox.open(v.n, v); });
    wrap.appendChild(thumb);

    var b = el('button', 'ref-body');
    b.type = 'button';

    var de = el('span', 'ref-de');
    var a = article(v.de);
    if (a){
      de.appendChild(el('span', 'ref-art art-' + a, a));
      de.appendChild(document.createTextNode(' ' + bareNoun(v.de)));
    } else {
      de.appendChild(document.createTextNode(v.de));
    }
    b.appendChild(de);

    var lang = GH.i18n.lang();
    var gloss = (lang === 'ru' && v.ru) ? v.ru : v.en;
    var line = el('span', 'ref-gloss');
    line.appendChild(document.createTextNode(gloss));
    if (v.rg){
      line.appendChild(el('span', 'ref-rg ' + (v.rg === 'PL' ? 'rg-pl' : 'rg-' + v.rg.toLowerCase()),
                          v.rg === 'PL' && v.rgs ? 'PL·' + v.rgs : v.rg));
    }
    b.appendChild(line);
    if (lang === 'ru' && v.ru && v.en !== v.ru){
      b.appendChild(el('span', 'ref-gloss2', v.en));
    }
    b.appendChild(el('span', 'ref-num', '#' + v.n));

    b.addEventListener('click', function(){
      GH.speech.say(v.de);
      /* SEEKING, not browsing.

         Tapping a row while a search is running is the one unambiguous
         lookup this app has: she typed a word, out of 773 she chose this
         result, and she did it on purpose. Scrolling the list is not that,
         and neither is tapping a row she happened to pass — which is why
         this fires only when `state.q` is set.

         `looked()` pulls the card forward without grading her: no rep, no
         lapse, no change to her accuracy. Once a day per word, so leaning
         on the audio button twenty times is one signal. */
      if (state.q && GH.tutor && GH.tutor.looked){
        GH.tutor.looked(GH.packs.keyOf(v));
      }
    });
    wrap.appendChild(b);
    return wrap;
  }

  function paint(){
    /* Opening or closing a group rebuilds the whole list, which put her
       back at the top of a page that can be three hundred rows long. Held
       across the repaint — but not on the first paint, where the page
       should start at the top, and not when a jump has asked to scroll
       somewhere specific. */
    var keep = state.painted
      ? (window.pageYOffset ||
         (document.documentElement && document.documentElement.scrollTop) || 0)
      : 0;
    state.painted = true;

    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);

    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('refTitle')));
    titles.appendChild(el('p', null, t('refCount', { n:(window.GH_VOCAB || []).length })));
    head.appendChild(titles);
    host.appendChild(head);

    host.appendChild(searchBox());
    host.appendChild(filterBlock());

    var picker = el('div', 'ref-views');
    VIEWS.forEach(function(view){
      var b = el('button', 'ref-view', t(view.key));
      b.type = 'button';
      b.setAttribute('aria-pressed', state.view === view.id ? 'true' : 'false');
      b.addEventListener('click', function(){
        state.view = view.id;
        state.open = {};          /* group labels differ per view */
        paint();
      });
      picker.appendChild(b);
    });
    host.appendChild(picker);

    var shown = pool().length, total = (window.GH_VOCAB || []).length;
    if (state.q && !shown){
      /* A search with no hits, said plainly. The tap hint below an empty
         list is the app talking about pictures she cannot see. */
      var none = el('div', 'ref-none');
      none.appendChild(el('p', 'ref-none-t', t('refNoHits')));
      none.appendChild(el('p', 'ref-hint', t('refNoHitsHint')));
      host.appendChild(none);
    } else {
      host.appendChild(el('p', 'ref-hint',
        (shown === total ? t('refTapHint2')
                         : t('refShowing', { i:shown, n:total }) + ' \u00b7 ' + t('refTapHint2'))));
    }

    /* Groups start closed. 341 rows in one scroll is the thing that made
       this section unusable; a screen of headings you can open is not.
       A group opens on its own when it is the only one left after
       filtering, since collapsing a list of one is just an extra tap. */
    var gs = groups(state.view);
    var soloOpen = gs.length === 1;

    /* Jump row: Все opens everything, each other pill opens that one
       group and scrolls to it. Without this, "open all" hands you back
       the 341-row scroll the collapsing was meant to solve. */
    var jump = el('div', 'ref-jump');

    var allBtn = el('button', 'ref-jump-btn' + (state.allOpen ? ' on' : ''),
                    t('refAll') + ' · ' + pool().length);
    allBtn.type = 'button';
    allBtn.addEventListener('click', function(){
      state.allOpen = !state.allOpen;
      state.open = {};
      paint();
    });
    jump.appendChild(allBtn);

    var nodes = {};
    gs.forEach(function(g){
      var isOpen = soloOpen || state.allOpen || !!state.open[g.label];
      var b = el('button', 'ref-jump-btn' + (isOpen ? ' on' : ''));
      b.type = 'button';
      b.appendChild(el('span', null, g.label));
      b.appendChild(el('span', 'ref-jump-n', g.items.length));
      b.addEventListener('click', function(){
        if (state.allOpen){
          state.allOpen = false;
          state.open = {};
          gs.forEach(function(x){ state.open[x.label] = true; });
        }
        state.open[g.label] = true;
        state.scrollTo = g.label;
        paint();
      });
      jump.appendChild(b);
    });
    host.appendChild(jump);

    var list = el('div', 'ref-list');
    gs.forEach(function(g){
      var isOpen = soloOpen || state.allOpen || !!state.open[g.label];

      var h = el('button', 'ref-group' + (isOpen ? ' open' : ''));
      h.type = 'button';
      h.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      h.appendChild(el('span', 'ref-group-caret', isOpen ? '▾' : '▸'));
      h.appendChild(el('span', 'ref-group-name', g.label));
      h.appendChild(el('span', 'ref-group-count', g.items.length));
      if (g.note) h.appendChild(el('span', 'ref-group-note', g.note));
      h.addEventListener('click', function(){
        if (state.allOpen){
          state.allOpen = false;
          state.open = {};
          gs.forEach(function(x){ state.open[x.label] = true; });
        }
        if (state.open[g.label]) delete state.open[g.label];
        else state.open[g.label] = true;
        paint();
      });
      list.appendChild(h);
      nodes[g.label] = h;

      if (isOpen) g.items.forEach(function(v){ list.appendChild(row(v)); });
    });
    host.appendChild(list);

    if (state.scrollTo && nodes[state.scrollTo] && nodes[state.scrollTo].scrollIntoView){
      nodes[state.scrollTo].scrollIntoView({ behavior:'smooth', block:'start' });
    } else if (keep && window.scrollTo){
      if (window.requestAnimationFrame){
        window.requestAnimationFrame(function(){ window.scrollTo(0, keep); });
      } else {
        window.scrollTo(0, keep);
      }
    }
    state.scrollTo = null;
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, view:'topic', cats:{}, catCount:0,
              filterOpen:false, open:{}, allOpen:false, scrollTo:null,
              painted:false };
    paint();
  }

  return { open:open };
})();
