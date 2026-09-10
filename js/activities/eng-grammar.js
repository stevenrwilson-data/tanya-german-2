/* js/activities/eng-grammar.js */
/* English grammar reference — the rules, laid out.

   Sibling of js/activities/grammar.js, not a second copy of it. The
   German topics stay in grammar.js and stay German-only; this file is
   what an English learner gets in their place.

   The filename is eng-grammar.js because grammar.js is taken and
   duplicate basenames are banned.

   First topic: articles (a / an / the / Ø), from data/en-articles.js. The
   other English reference areas get an index tile when they have a data
   file — `countFor()` returns 0 without one and the tile is omitted
   rather than shown disabled, because a dead tile on a one-tile page
   looks like a broken page.

   ------------------------------------------------------------------
   THE LANGUAGE GATE IS ON THE ACTIVITY ENTRY, NOT IN HERE

   Registered with `onlyEn: true`, the mirror of the `onlyDe` the five
   German games already carry. app.js honours both when it paints the
   Reference section, so neither this file nor app.js keeps a list of
   ids that can drift out of date.

   ------------------------------------------------------------------
   LAYOUT

   Deliberately the same shape as the German gender and case pages, so
   the screen she already knows how to read still works when the course
   is English:

       lede
       four count chips     a · an · the · Ø
       three families       new / known / zero, with worked rows
       matched pairs        the new sentence against the known one
       sound block          a against an
       traps                where Russian or German betrays her
       notes                named, not scored
       practise button      only once a drill exists

   Every class here already exists in css/style.css — the .gr-* set from
   the grammar pages and the .ww-* set from wo-wohin. No new CSS.

   ------------------------------------------------------------------
   SPEECH

   Rows call GH.speech.sayIn(text, 'en') so an English example is never
   read out by the German course voice, and fall back to say() on a build
   without sayIn. */

window.GH = window.GH || {};

GH.engGrammar = (function(){

  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function lang(){
    return (GH.i18n && GH.i18n.lang && GH.i18n.lang()) || 'en';
  }

  /* Picks her interface language off a three-language bundle. Falls back
     through en, de, ru rather than to Russian first — this is English
     course material and English is the honest default here.

     `ruM` is the masculine Russian twin, same convention as butler.js
     and js/activities/lessons.js: `ru` is feminine, `ruM` masculine,
     unset means the feminine form serves both. Only for Russian that
     addresses her directly. */
  function L(obj){
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    var l = lang();
    if (l === 'ru' && obj.ruM
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      return obj.ruM;
    }
    return obj[l] || obj.en || obj.de || obj.ru || '';
  }

  /* The same pick, for the flat rows in the data banks that carry
     en/de/ru directly rather than in a bundle. */
  function mine(row){
    var l = lang();
    if (l === 'en') return '';
    if (l === 'ru' && row.ruM
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      return row.ruM;
    }
    return row[l] || '';
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* Topics the English course can explain today. Add a row when the
     matching data file exists. `game` stays null until a drill exists —
     a button that opens nothing is worse than no button. */
  var TOPICS = [
    { id:'articles',  glyph:'\uD83D\uDD20', game:null,
      titleKey:'egArticles',  subKey:'egArticlesSub' },
    { id:'questions', glyph:'\u2753', game:null,
      titleKey:'egQuestions', subKey:'egQuestionsSub' },
    { id:'future',    glyph:'\u23E9', game:null,
      titleKey:'egFuture',    subKey:'egFutureSub' },
    { id:'commands',  glyph:'\u261D', game:null,
      titleKey:'egCommands',  subKey:'egCommandsSub' }
  ];

  function dataOf(tp){
    if (tp.id === 'articles')  return window.GH_EN_ARTICLES  || null;
    if (tp.id === 'questions') return window.GH_EN_QUESTIONS || null;
    if (tp.id === 'future')    return window.GH_EN_FUTURE    || null;
    if (tp.id === 'commands')  return window.GH_EN_COMMANDS  || null;
    return null;
  }

  function countFor(tp){
    var D = dataOf(tp);
    if (!D) return 0;
    return (D.items || []).length;
  }

  /* ---------- index ---------- */

  function paintList(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    head.appendChild(GH.back.button(function(){ state.onExit(); }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('egTitle')));
    titles.appendChild(el('p', null, t('egSub')));
    head.appendChild(titles);
    host.appendChild(head);

    var grid = el('div', 'tiles');
    TOPICS.forEach(function(tp){
      var n = countFor(tp);
      if (!n) return;
      var b = el('button', 'tile');
      b.type = 'button';
      b.appendChild(el('span', 'tile-glyph', tp.glyph));
      b.appendChild(el('span', 'tile-name', t(tp.titleKey)));
      b.appendChild(el('span', 'tile-sub', t(tp.subKey)));
      b.appendChild(el('span', 'tile-foot', t('grItemsN', { n:n })));
      b.addEventListener('click', function(){
        state.topic = tp;
        paintTopic();
        if (GH.nav && GH.nav.top) GH.nav.top();
      });
      grid.appendChild(b);
    });
    host.appendChild(grid);

    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  /* ---------- shared chrome ---------- */

  function topicHead(tp){
    var head = el('div', 'practice-head');
    head.appendChild(GH.back.button(function(){
      state.topic = null;
      paintList();
    }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t(tp.titleKey)));
    head.appendChild(titles);
    return head;
  }

  function practiseButton(tp){
    if (!tp.game) return document.createTextNode('');
    var wrap = el('div', 'gr-practise');
    wrap.appendChild(el('p', 'gr-practise-l', t('grReadyQ')));
    var b = el('button', 'btn btn-primary js-advance', t('grPractise'));
    b.type = 'button';
    b.addEventListener('click', function(){
      var a = GH.app && GH.app.find ? GH.app.find(tp.game) : null;
      if (!a){ state.onExit(); return; }
      host.textContent = '';
      if (GH.speech && GH.speech.stop) GH.speech.stop();
      a.open(host, function(){ state.topic = tp; paintTopic(); });
    });
    wrap.appendChild(b);
    return wrap;
  }

  function sayEn(s){
    return function(){
      if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(s, 'en');
      else if (GH.speech && GH.speech.say) GH.speech.say(s);
    };
  }

  /* A row: the English sentence, and her own language underneath when
     she is not reading in English already. */
  function exampleRow(en, tr){
    var r = el('button', 'gr-pair');
    r.type = 'button';
    r.appendChild(el('span', 'gr-pair-de', en));
    if (tr) r.appendChild(el('span', 'gr-pair-ru', tr));
    r.addEventListener('click', sayEn(en));
    return r;
  }

  /* ---------- articles ---------- */

  /* The wrong form beside the right one. Identical on every topic page,
     so it lives here rather than being copied per topic. The wrong side
     is a div, not a button: it must not be tappable, because tapping it
     would read the mistake aloud in her ear. */
  function trapBlock(D){
    var wrap = el('div', 'gr-traps');
    wrap.appendChild(el('h2', 'gr-group', t('egTrapHead')));
    wrap.appendChild(el('p', 'gr-note', t('egTrapNote')));
    (D.traps || []).forEach(function(tr){
      var box = el('div', 'ww-pair');

      var bad = el('div', 'ww-side');
      bad.appendChild(el('span', 'ww-side-l', t('egTrapWrong')));
      bad.appendChild(el('span', 'ww-side-de', tr.wrong));
      box.appendChild(bad);

      var good = el('button', 'ww-side');
      good.type = 'button';
      good.appendChild(el('span', 'ww-side-l', t('egTrapRight')));
      good.appendChild(el('span', 'ww-side-de', tr.en));
      good.appendChild(el('span', 'ww-side-tr', L(tr.why)));
      good.addEventListener('click', sayEn(tr.en));
      box.appendChild(good);

      wrap.appendChild(box);
    });
    return wrap;
  }

  function markLabel(mark){
    return mark === 'zero' ? '\u2205' : mark;
  }

  function articlesTopic(tp){
    var D = window.GH_EN_ARTICLES;
    var card = el('div', 'card');

    card.appendChild(el('p', 'gr-lede', L(D.lede)));

    var counts = D.counts();
    var row = el('div', 'gr-stats');
    [['a', counts.a], ['an', counts.an], ['the', counts.the], ['\u2205', counts.zero]]
      .forEach(function(p){
        var b = el('div', 'gr-stat');
        b.appendChild(el('span', 'gr-stat-a', p[0]));
        b.appendChild(el('span', 'gr-stat-n', String(p[1])));
        row.appendChild(b);
      });
    card.appendChild(row);

    (D.families || []).forEach(function(fam){
      var list = (D.items || []).filter(function(x){
        return fam.kinds.indexOf(x.kind) >= 0;
      });
      /* The count on the heading is the family she is reading, not the
         raw mark count — the known family also holds the contrast rows
         (the music in this café). */
      var h = el('h2', 'gr-group', L(fam.title));
      h.appendChild(el('span', 'gr-count',
        markLabel(fam.mark) + ' \u00b7 ' + t('grItemsN', { n:list.length })));
      card.appendChild(h);
      card.appendChild(el('p', 'gr-note', L(fam.note)));

      var rows = el('div', 'gr-pairs');
      list.slice(0, 6).forEach(function(x){
        rows.appendChild(exampleRow(x.en, mine(x)));
      });
      card.appendChild(rows);
    });

    /* new against known — the same noun, two situations */
    card.appendChild(el('h2', 'gr-group', t('egPairHead')));
    card.appendChild(el('p', 'gr-note', t('egPairNote')));
    (D.pairs || []).forEach(function(p){
      var box = el('div', 'ww-pair');
      [['neu', 'egNew'], ['kno', 'egKnown']].forEach(function(side){
        var s = p[side[0]];
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', t(side[1])));
        b.appendChild(el('span', 'ww-side-de', s.en));
        var tr = mine(s);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s.en));
        box.appendChild(b);
      });
      card.appendChild(box);
    });

    /* a against an — sound, not spelling */
    card.appendChild(el('h2', 'gr-group', t('egSoundHead')));
    card.appendChild(el('p', 'gr-note', t('egSoundNote')));
    var soundRows = el('div', 'gr-pairs');
    (D.sound || []).forEach(function(s){
      soundRows.appendChild(exampleRow(s.en + '   \u00b7   ' + s.mark, L(s.why)));
    });
    card.appendChild(soundRows);

    card.appendChild(trapBlock(D));

    if ((D.notes || []).length){
      card.appendChild(el('h2', 'gr-group', t('egNotesHead')));
      D.notes.forEach(function(n){
        card.appendChild(el('p', 'gr-note', L(n)));
      });
    }

    card.appendChild(practiseButton(tp));
    return card;
  }

  /* ---------- questions ----------

     Same furniture as the articles page. The one thing this page has and
     that one does not is `chains`: statement, then yes/no, then WH, on
     the same sentence — the only honest way to show that a question word
     sits on top of a question she can already build rather than
     replacing it. */
  function questionsTopic(tp){
    var D = window.GH_EN_QUESTIONS;
    var card = el('div', 'card');

    card.appendChild(el('p', 'gr-lede', L(D.lede)));

    var counts = D.counts();
    var row = el('div', 'gr-stats');
    ['who','what','where','when','why','how'].forEach(function(w){
      var b = el('div', 'gr-stat');
      b.appendChild(el('span', 'gr-stat-a', w));
      b.appendChild(el('span', 'gr-stat-n', String(counts[w])));
      row.appendChild(b);
    });
    card.appendChild(row);

    /* the six words and what each one asks for */
    card.appendChild(el('h2', 'gr-group', t('egWordsHead')));
    var words = el('div', 'gr-pairs');
    (D.words || []).forEach(function(w){
      var tr = lang() === 'en' ? L(w.ask)
             : (w[lang()] || '') + ' \u00b7 ' + L(w.ask);
      words.appendChild(exampleRow(w.wh + '   \u00b7   ' + L(w.ex), tr));
    });
    card.appendChild(words);

    /* statement, yes/no, WH */
    card.appendChild(el('h2', 'gr-group', t('egChainHead')));
    card.appendChild(el('p', 'gr-note', t('egChainNote')));
    (D.chains || []).forEach(function(c){
      var box = el('div', 'ww-pair');
      [['stmt','egStmt'], ['yn','egYesNo'], ['wh','egWh']].forEach(function(side){
        var s2 = c[side[0]];
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', t(side[1])));
        b.appendChild(el('span', 'ww-side-de', s2.en));
        var tr = mine(s2);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s2.en));
        box.appendChild(b);
      });
      card.appendChild(box);
    });

    /* who as subject against who as object */
    card.appendChild(el('h2', 'gr-group', t('egWhoHead')));
    card.appendChild(el('p', 'gr-note', t('egWhoNote')));
    (D.whoPairs || []).forEach(function(p2){
      var box = el('div', 'ww-pair');
      [['subj','egWhoSubj'], ['obj','egWhoObj']].forEach(function(side){
        var s2 = p2[side[0]];
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', t(side[1])));
        b.appendChild(el('span', 'ww-side-de', s2.en));
        var tr = mine(s2);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s2.en));
        box.appendChild(b);
      });
      card.appendChild(box);
    });

    card.appendChild(trapBlock(D));

    if ((D.notes || []).length){
      card.appendChild(el('h2', 'gr-group', t('egNotesHead')));
      D.notes.forEach(function(n){ card.appendChild(el('p', 'gr-note', L(n))); });
    }

    card.appendChild(practiseButton(tp));
    return card;
  }

  /* ---------- the future ----------

     Six families, one of which is the movement trap, so the families
     block does most of the work here. Two things this page has and the
     others do not: `planVsArranged`, the going-to against present
     continuous comparison, and `schedules` — a reference note that is
     deliberately not drilled anywhere. */
  function futureTopic(tp){
    var D = window.GH_EN_FUTURE;
    var card = el('div', 'card');

    card.appendChild(el('p', 'gr-lede', L(D.lede)));

    var counts = D.counts();
    var row = el('div', 'gr-stats');
    (D.families || []).forEach(function(f){
      var b = el('div', 'gr-stat');
      b.appendChild(el('span', 'gr-stat-a', f.mark));
      b.appendChild(el('span', 'gr-stat-n', String(counts[f.id] || 0)));
      row.appendChild(b);
    });
    card.appendChild(row);

    (D.families || []).forEach(function(f){
      var list = D.byMark(f.id);
      var h = el('h2', 'gr-group', L(f.title));
      h.appendChild(el('span', 'gr-count',
        f.mark + ' \u00b7 ' + t('grItemsN', { n:list.length })));
      card.appendChild(h);
      card.appendChild(el('p', 'gr-note', L(f.note)));
      var rows = el('div', 'gr-pairs');
      list.forEach(function(x){ rows.appendChild(exampleRow(x.en, mine(x))); });
      card.appendChild(rows);
    });

    /* the trap, as a pair: a plan against a destination */
    card.appendChild(el('h2', 'gr-group', t('egMoveHead')));
    card.appendChild(el('p', 'gr-note', t('egMoveNote')));
    (D.pairs || []).forEach(function(p2){
      var box = el('div', 'ww-pair');
      [['plan','egPlan'], ['move','egMove']].forEach(function(side){
        var s2 = p2[side[0]];
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', t(side[1])));
        b.appendChild(el('span', 'ww-side-de', s2.en));
        var tr = mine(s2);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s2.en));
        box.appendChild(b);
      });
      card.appendChild(box);
    });

    /* a plan against something already arranged */
    var P = D.planVsArranged;
    if (P){
      card.appendChild(el('h2', 'gr-group', L(P.head)));
      card.appendChild(el('p', 'gr-note', L(P.note)));
      var pbox = el('div', 'ww-pair');
      [P.plan, P.arranged].forEach(function(s2){
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', L(s2.label)));
        b.appendChild(el('span', 'ww-side-de', s2.en));
        var tr = mine(s2);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s2.en));
        pbox.appendChild(b);
      });
      card.appendChild(pbox);
      /* Said out loud, because a rule stated harder than the language
         behaves teaches her to distrust correct sentences. */
      card.appendChild(el('p', 'gr-note', L(P.caution)));
    }

    card.appendChild(trapBlock(D));

    /* named, not drilled */
    if (D.schedules){
      card.appendChild(el('h2', 'gr-group', L(D.schedules.head)));
      card.appendChild(el('p', 'gr-note', L(D.schedules.note)));
      var srows = el('div', 'gr-pairs');
      (D.schedules.rows || []).forEach(function(r){
        srows.appendChild(exampleRow(r.en, mine(r)));
      });
      card.appendChild(srows);
    }

    if ((D.notes || []).length){
      card.appendChild(el('h2', 'gr-group', t('egNotesHead')));
      D.notes.forEach(function(n){ card.appendChild(el('p', 'gr-note', L(n))); });
    }

    card.appendChild(practiseButton(tp));
    return card;
  }

  /* ---------- commands ----------

     The thinnest page, on purpose: English imperatives have almost no
     machinery. Five families, the on/off pairs, and the traps. */
  function commandsTopic(tp){
    var D = window.GH_EN_COMMANDS;
    var card = el('div', 'card');

    card.appendChild(el('p', 'gr-lede', L(D.lede)));

    var counts = D.counts();
    var row = el('div', 'gr-stats');
    (D.families || []).forEach(function(f){
      var b = el('div', 'gr-stat');
      b.appendChild(el('span', 'gr-stat-a', f.mark));
      b.appendChild(el('span', 'gr-stat-n', String(counts[f.id] || 0)));
      row.appendChild(b);
    });
    card.appendChild(row);

    (D.families || []).forEach(function(f){
      var list = D.byKind(f.id);
      var h = el('h2', 'gr-group', L(f.title));
      h.appendChild(el('span', 'gr-count',
        f.mark + ' \u00b7 ' + t('grItemsN', { n:list.length })));
      card.appendChild(h);
      card.appendChild(el('p', 'gr-note', L(f.note)));
      var rows = el('div', 'gr-pairs');
      list.forEach(function(x){ rows.appendChild(exampleRow(x.en, mine(x))); });
      card.appendChild(rows);
    });

    card.appendChild(el('h2', 'gr-group', t('egOnOffHead')));
    card.appendChild(el('p', 'gr-note', t('egOnOffNote')));
    (D.pairs || []).forEach(function(p2){
      var box = el('div', 'ww-pair');
      [['do','egOn'], ['dont','egOff']].forEach(function(side){
        var s2 = p2[side[0]];
        var b = el('button', 'ww-side');
        b.type = 'button';
        b.appendChild(el('span', 'ww-side-l', t(side[1])));
        b.appendChild(el('span', 'ww-side-de', s2.en));
        var tr = mine(s2);
        if (tr) b.appendChild(el('span', 'ww-side-tr', tr));
        b.addEventListener('click', sayEn(s2.en));
        box.appendChild(b);
      });
      card.appendChild(box);
    });

    card.appendChild(trapBlock(D));

    if ((D.notes || []).length){
      card.appendChild(el('h2', 'gr-group', t('egNotesHead')));
      D.notes.forEach(function(n){ card.appendChild(el('p', 'gr-note', L(n))); });
    }

    card.appendChild(practiseButton(tp));
    return card;
  }

  function paintTopic(){
    host.textContent = '';
    var tp = state.topic;
    if (!tp){ paintList(); return; }
    host.appendChild(topicHead(tp));
    if (tp.id === 'articles')  host.appendChild(articlesTopic(tp));
    if (tp.id === 'questions') host.appendChild(questionsTopic(tp));
    if (tp.id === 'future')    host.appendChild(futureTopic(tp));
    if (tp.id === 'commands')  host.appendChild(commandsTopic(tp));
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, topic:null };
    /* One topic and nothing to choose between: go straight in, the same
       way the lessons list opens a lone lesson. Add a second topic and
       the index appears on its own. */
    var live = TOPICS.filter(function(tp){ return countFor(tp) > 0; });
    if (live.length === 1){
      state.topic = live[0];
      if (GH.events && GH.events.mark) GH.events.mark('read', 'eng-grammar:' + live[0].id);
      paintTopic();
      return;
    }
    paintList();
  }

  function openTopic(container, id, onExit){
    var tp = null, i;
    for (i = 0; i < TOPICS.length; i++) if (TOPICS[i].id === id) tp = TOPICS[i];
    host = container;
    state = { onExit:onExit, topic:tp };
    if (tp && GH.events && GH.events.mark) GH.events.mark('read', 'eng-grammar:' + tp.id);
    if (tp) paintTopic(); else paintList();
  }

  /* ---------- the rule, mid-round ----------

     Same job as grammar.js's overlay: she can open the rule without
     losing the round she is in. Reuses the .gr-overlay classes already
     in style.css. */
  var over = null;

  function overlayOpen(){
    return !!(over && over.className.indexOf('is-open') >= 0);
  }

  function closeOverlay(){
    if (!over) return;
    over.className = 'gr-overlay';
    over.textContent = '';
    document.body.style.overflow = '';
    if (GH.nav && GH.nav.ready) GH.nav.ready();
    var then = over._then;
    over._then = null;
    if (then) then();
  }

  function overlay(topic, onClose){
    if (!over){
      over = el('div', 'gr-overlay');
      over.setAttribute('role', 'dialog');
      over.setAttribute('aria-modal', 'true');
      over.addEventListener('click', function(e){
        if (e.target === over) closeOverlay();
      });
      document.body.appendChild(over);
    }
    over.textContent = '';
    over._then = onClose || null;

    var box = el('div', 'gr-over-box');
    var bar = el('div', 'gr-over-bar');
    bar.appendChild(GH.back.button(closeOverlay, 'gr-over-back'));
    var ret = el('button', 'btn btn-primary gr-over-return', t('grReturn'));
    ret.type = 'button';
    ret.addEventListener('click', closeOverlay);
    bar.appendChild(ret);
    box.appendChild(bar);

    var body = el('div', 'gr-over-body');
    box.appendChild(body);
    over.appendChild(box);
    over.className = 'gr-overlay is-open';
    document.body.style.overflow = 'hidden';

    if (topic) openTopic(body, topic, closeOverlay);
    else open(body, closeOverlay);
    try { ret.focus(); } catch (e){}
  }

  /* Escape closes the overlay and nothing else. Capture phase with
     stopImmediatePropagation so a screen underneath does not also act on
     the same key. */
  document.addEventListener('keydown', function(e){
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (!overlayOpen()) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    closeOverlay();
  }, true);

  /* ---------- registration ----------

     `onlyEn` is the mirror of the `onlyDe` the German games carry, and
     app.js honours both when it paints the Reference section. The flag
     lives here so the activity declares this about itself rather than
     app.js keeping a list of ids that drifts.

     `detail` is the longer line the Table of Contents and the reference
     guide use; `sub` stays as the tile caption. */
  var entry = {
    id:'eng-grammar',
    kind:'ref',
    onlyEn:true,
    glyph:'\uD83D\uDCD8',
    name:{ ru:'Грамматика', de:'Grammatik', en:'Grammar' },
    sub:{ ru:'Правила и таблицы',
          de:'Die Regeln und die Tabellen',
          en:'The rules and the tables' },
    detail:{ ru:'Правила английского языка, разложенные по полкам: артикли a, an, the и случаи, когда артикль не нужен, с примерами и с местами, где русский или немецкий подсказывают неверно.',
             de:'Die englischen Regeln, aufgeräumt dargestellt: die Artikel a, an, the und die Fälle ohne Artikel, mit Beispielen und mit den Stellen, an denen Russisch oder Deutsch in die Irre führen.',
             en:'The English rules, laid out: the articles a, an and the, the places English takes none at all, with worked examples and the points where Russian or German instinct misleads.' },
    open:open
  };

  /* index.html loads the activities before app.js, so a bare guarded
     call registers nothing, silently. Retry once the document is ready.
     Same shape dictview.js uses. */
  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, openTopic:openTopic,
           overlay:overlay, closeOverlay:closeOverlay,
           isOverlayOpen:overlayOpen, TOPICS:TOPICS,
           entry:entry, register:register };
})();
