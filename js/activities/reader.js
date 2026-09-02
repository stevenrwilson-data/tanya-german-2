/* The Reader — short stories, medium stories, poems.

   Everything she reads for comprehension, in one place. Three sections
   inside one tile rather than three tiles, because they differ in length
   and form but not in what she does with them: read it, then answer two
   questions about it.

   Not here: the comics, which have their own tile because they are
   pictures first; the songs, same; and GH_LONG, which despite the name is
   not reading at all. Those eighteen-sentence stories carry `blanks` on
   every line and app.js hands them to GH.fillBlank — they are vocabulary
   practice wearing a story.

   ------------------------------------------------------------------
   WHAT A PIECE LOOKS LIKE

     id          ss-NN short story · ms-NN medium · pm-NN poem
     cat         one of GH_BANK's categories, or absent for a poem
     title       de / en / ru
     sentences   de / ru / en per line
     q           the question bank

   Read from three globals, any of which may be absent — a section with
   no data simply does not appear:

     GH_SHORT    five sentences.  15 points.
     GH_MEDIUM   twenty.          20 points.
     GH_POEMS    lines, not sentences. 15 points. See `verse` below.

   ------------------------------------------------------------------
   THE SIX QUESTION KINDS

   All auto-graded. Open-ended questions were removed from the source
   material rather than shown and left ungraded, because a question that
   cannot be marked is a question the round cannot count.

     tap     tap the line of the piece that answers it. `a` is its index.
     mc      one right answer from four. `a` indexes `opts`.
     tf      true or false. `a` is a boolean.
     yn      yes or no. `a` is a boolean.
     multi   choose all that apply. `a` is an array of indices.
     order   put the events in order. `a` is the correct index order.

   `tap` only works while the whole piece fits on screen as a list of
   choices, which is five lines and not twenty — so the short stories and
   the poems use it and the medium stories do not. That is why the tiers
   have different question mixes. It is not drift.

   ------------------------------------------------------------------
   TWO OF FIVE, AND A FIVE-DAY REST

   Each bank holds five or more questions and a round serves TWO. Ten
   pairs out of five, so she can come back several times before a pair
   repeats, and the piece keeps earning its keep instead of being spent
   on one reading.

   Both shuffles matter and they do different jobs:

     the questions are shuffled, so the pair is not always the first two
     the CHOICES are shuffled, so position never gives the answer away

   The second is the one that would have quietly broken this. In the
   source material the questions run in story order, so an unshuffled
   `tap` list would have answered question one with line one every time.

   Then the questions rest for five days. Not the piece — she can re-read
   whenever she likes, and re-reading is the behaviour worth encouraging.
   Only the questions go quiet, so the second reading is reading rather
   than remembering which line she tapped last time.

   ------------------------------------------------------------------
   WHAT IT PAYS

   A round is one exercise via `opts.units`, and coins.js decides the
   rest. The 15 and 20 here are the round's own score, shown on the end
   screen — they are not Kronen and must not be confused with them.
   Kronen come from finishing, the same as everywhere else, because
   paying more for a longer piece would make the medium stories the only
   thing worth opening. 
   ------------------------------------------------------------------
   WHAT A QUESTION IS FOR

   The site exists to teach German — and later some other second language.
   Every question is judged by one thing: does it move that needle. There
   are exactly two ways it can, and a question does ONE of them:

     1. IT NEEDS THE PASSAGE. She cannot answer without having understood
        the German text. Translating the QUESTION costs nothing, because
        the comprehension already happened upstream, in the reading.

     2. IT IS ANSWERABLE FROM PRIOR KNOWLEDGE — but only asked in German.
        "Which two fish are popular for sushi?" with four German fish names
        is answerable by anyone who has eaten sushi. Read in German it is
        still an exercise: the reading of the question and the options IS
        the whole of it. Translate it and nothing is left.

   Both are legitimate. They are not the same job, and a question cannot do
   both — which is what `inL2` marks. NOT a flaw, and not a bad question:
   it says which of the two this one is.

   So: `inL2:true` renders that question and its options in German whatever
   the interface language, and translating it forfeits ITS credit only. She
   is warned before, never after. Everything unmarked translates freely.

   TRANSLATION IS NEVER BLOCKED anywhere in this app. It sometimes costs the
   credit, and the price is always stated first.
*/

window.GH = window.GH || {};

GH.reader = (function(){

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  /* Two questions a round. Any bank shorter than this is skipped rather
     than served short — a one-question round is not a round. */
  var ASK = 2;

  /* How long the questions rest after she answers them. The piece never
     rests. */
  var REST_DAYS = 5;

  var SECTIONS = [
    { id:'short',  data:'GH_SHORT',  score:15, glyph:'\ud83d\udcc4', key:'rdShort'  },
    { id:'medium', data:'GH_MEDIUM', score:20, glyph:'\ud83d\udcd7', key:'rdMedium' },
    /* 20, same as medium: the poems run 12 to 20 lines, so paying them a
       five-line rate was wrong. */
    { id:'poem',   data:'GH_POEMS',  score:20, glyph:'\u2712\ufe0f', key:'rdPoems'  },
    /* ARTICLES — expository prose, 26 lines against a medium story's 12, so
       worth more and asked more. `ask:3` is the only place any tier asks a
       number other than two; see askFor() below. */
    { id:'article', data:'GH_ARTICLES', score:25, ask:3,
      glyph:'\ud83d\udcf0', key:'rdArticles' }
  ];

  /* HOW MANY QUESTIONS THIS TIER ASKS.

     `ASK` was a single number for the whole reader, which was right while
     every tier was one to two screens of text. An article is twice a medium
     story, and two questions on 26 lines is a spot check rather than
     comprehension. So a tier may override it and the rest do not have to
     know. */
  function askFor(sec){
    return (sec && sec.ask) ? sec.ask : ASK;
  }

  var host = null, state = null;

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function pieces(sec){
    var d = window[sec.data];
    return (d && d.length) ? d : [];
  }

  function pick(obj){
    if (!obj) return '';
    var l = lang();
    return obj[l] || obj.en || obj.de || '';
  }

  /* ---------- ASKED IN THE TARGET LANGUAGE ----------

     See the note at the top of this file for why. In short: a question does
     one of two jobs, and this marks which.

     WAS CALLED `giveaway`, AND THAT NAME WAS WRONG. It read as "this
     question is flawed", when what it means is "this question tests the
     German of the question rather than comprehension of the passage" — a
     different job, not a worse one. "Which two fish are popular for sushi?"
     in German with four German fish names is a perfectly good vocabulary
     exercise. It simply cannot ALSO be a comprehension check, because
     anyone who has eaten sushi knows the answer.

     Renamed while there were eleven of them rather than a hundred.

     The makeup article is what forced the mechanism. German borrows nearly
     all of that vocabulary from English — Mascara, Eyeliner, Lidschatten,
     Foundation, Concealer, Puder, Rouge, Lipgloss, Parfüm — so "which goes
     on the eyelids? ... C. EYESHADOW" is real in German and free in
     English.

     PER QUESTION, NOT PER PIECE. The first version was per piece and it was
     wrong: only three of that article's twelve are of this kind, and
     penalising "why clean your face before makeup and again before bed?"
     would punish reading. 11 of 48 across the four articles.

     The piece TEXT always translates freely — the five-day rest and the
     reveal are untouched. */
  function inL2(q){
    return !!(q && q.inL2);
  }

  /* Rendered in German while it is still worth credit; in her language once
     she has chosen to spend it. */
  function askPick(q, obj){
    if (!obj) return '';
    if (inL2(q) && !state.qShown[state.qi]) return obj.de || obj.en || '';
    return pick(obj);
  }

  /* Whether THIS question still counts. Per question: one look does not
     spoil the other two. */
  function counts(){
    var item = state.qs[state.qi];
    return !(item && inL2(item.q) && state.qShown[state.qi]);
  }

  /* ---------- the rest clock ----------

     One timestamp per piece, in her own progress store so two people on
     one iPad rest separately. Stored as a day string rather than a
     millisecond count, and compared as dates: answering at 11pm on
     Monday and again at 8am on Saturday is five days, which is what she
     would call it. Elapsed hours would call it four and a half and lock
     her out for a day she has already waited. */
  var REST_KEY = 'gh-reader-rest';

  function restAll(){
    try {
      var raw = window.localStorage.getItem(REST_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  function restSlot(){
    return (GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo');
  }

  function daysSince(dayStr){
    if (!dayStr) return 9999;
    var a = new Date(dayStr), b = new Date(new Date().toDateString());
    var n = Math.round((b - a) / 86400000);
    return isNaN(n) ? 9999 : n;
  }

  function restingFor(id){
    var d = restAll()[restSlot()] || {};
    var left = REST_DAYS - daysSince(d[id]);
    return left > 0 ? left : 0;
  }

  function markAnswered(id){
    try {
      var all = restAll();
      if (!all[restSlot()]) all[restSlot()] = {};
      all[restSlot()][id] = new Date().toDateString();
      window.localStorage.setItem(REST_KEY, JSON.stringify(all));
    } catch (e){}
  }

  /* ---------- the draw ----------

     Two of the bank, shuffled. Nothing here remembers which pair came
     last, and it does not need to: the five-day rest is a far stronger
     guard than any recency rule, and one number is cheaper than a
     history. */
  function drawQuestions(piece){
    var bank = (piece.q || []).filter(function(q){ return q && q.kind; });
    var n = askFor(state.sec);
    if (bank.length < n) return [];
    return GH.text.shuffle(bank).slice(0, n);
  }

  /* The choices for one question, already shuffled, each carrying whether
     it is a right answer. Shuffling here rather than at render time means
     the order is fixed for the life of the question — she cannot reshuffle
     it by triggering a repaint. */
  function choicesFor(piece, q){
    var out = [], i;

    if (q.kind === 'tap'){
      piece.sentences.forEach(function(s, idx){
        out.push({ label:s.de, right:idx === q.a, i:idx });
      });
      return GH.text.shuffle(out);
    }

    if (q.kind === 'tf' || q.kind === 'yn'){
      var yes = q.kind === 'yn' ? t('rdYes') : t('rdTrue');
      var no  = q.kind === 'yn' ? t('rdNo')  : t('rdFalse');
      /* Not shuffled. True is always first and yes is always first,
         because the pair has a conventional order and scrambling it makes
         her read two words instead of recognising a shape. There is no
         positional giveaway to remove: the answer is not a position. */
      return [{ label:yes, right:q.a === true,  i:1 },
              { label:no,  right:q.a === false, i:0 }];
    }

    var opts = q.opts || [];
    if (q.kind === 'multi'){
      var right = q.a || [];
      opts.forEach(function(o, idx){
        out.push({ label:askPick(q, o), right:right.indexOf(idx) >= 0, i:idx });
      });
      return GH.text.shuffle(out);
    }

    if (q.kind === 'order'){
      /* Every option is used and the answer is the sequence, so nothing is
         right on its own. Shuffled so the printed order is never the
         answer. */
      opts.forEach(function(o, idx){ out.push({ label:askPick(q, o), right:false, i:idx }); });
      return GH.text.shuffle(out);
    }

    /* mc */
    opts.forEach(function(o, idx){ out.push({ label:askPick(q, o), right:idx === q.a, i:idx }); });
    return GH.text.shuffle(out);
  }

  function isRight(q, chosen, choices){
    if (q.kind === 'multi'){
      var want = 0, i;
      for (i = 0; i < choices.length; i++) if (choices[i].right) want++;
      if (chosen.length !== want) return false;
      for (i = 0; i < chosen.length; i++) if (!choices[chosen[i]].right) return false;
      return true;
    }
    if (q.kind === 'order'){
      var order = q.a || [];
      if (chosen.length !== order.length) return false;
      for (var k = 0; k < order.length; k++){
        if (choices[chosen[k]].i !== order[k]) return false;
      }
      return true;
    }
    return chosen.length === 1 && !!choices[chosen[0]].right;
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
    titles.appendChild(el('h1', null, t('rdTitle')));
    titles.appendChild(el('p', null, t('rdSub')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var any = false;

    /* ---------- JUMP TO A TIER ----------

       With three tiers filled the index is long enough that the poems are
       well below the fold — so the row of tiles she wants is the one she
       cannot see. A row of jumps at the top costs one line each and saves
       the scroll.

       Built from the same SECTIONS list that draws the sections, so a tier
       with no data has no button and a fourth tier added later gets one
       without being told to.

       `scrollIntoView` rather than a hash: a hash would put `#rd-poem` in
       the address bar, and reloading that URL lands her on the hub with a
       fragment that means nothing. */
    var jumps = el('div', 'rd-jump');
    var jumped = 0;
    SECTIONS.forEach(function(sec){
      var n = pieces(sec).length;
      if (!n) return;
      jumped++;
      var j = el('button', 'rd-jump-b', t(sec.key) + '  ' + n);
      j.type = 'button';
      j.addEventListener('click', function(){
        var target = document.getElementById('rd-sec-' + sec.id);
        if (!target) return;
        try { target.scrollIntoView({ behavior:'smooth', block:'start' }); }
        catch (e){ target.scrollIntoView(); }
      });
      jumps.appendChild(j);
    });
    /* One tier is not a choice, so no row. */
    if (jumped > 1) host.appendChild(jumps);

    SECTIONS.forEach(function(sec){
      var list = pieces(sec);
      if (!list.length) return;
      any = true;

      var wrap = el('section', 'rd-sec');
      wrap.id = 'rd-sec-' + sec.id;
      wrap.appendChild(el('h2', 'rd-sec-h',
        t(sec.key) + ' \u00b7 ' + t('rdPiecesN', { n:list.length })));

      var grid = el('div', 'tiles');
      list.forEach(function(p){
        var b = el('button', 'tile');
        b.type = 'button';
        b.appendChild(el('span', 'tile-glyph', sec.glyph));
        b.appendChild(el('span', 'tile-name', pick(p.title)));
        b.appendChild(el('span', 'tile-sub',
          t('rdLinesN', { n:(p.sentences || []).length })));

        /* The questions may be resting; the piece never is. Saying which,
           and for how long, so a missing button is a rule rather than a
           fault. */
        var left = restingFor(p.id);
        var bank = (p.q || []).length;
        b.appendChild(el('span', 'tile-foot',
          !bank ? t('rdNoQuestions')
                : left ? t('rdRestingN', { n:left })
                       : t('rdAskN', { n:askFor(state.sec) })));
        if (left) b.className += ' is-resting';

        b.addEventListener('click', function(){ openPiece(sec, p); });
        grid.appendChild(b);
      });
      wrap.appendChild(grid);
      host.appendChild(wrap);
    });

    if (!any) host.appendChild(el('p', 'empty', t('nothingHere')));
  }

  /* ---------- reading ---------- */

  function openPiece(sec, piece){
    state.sec = sec;
    state.piece = piece;
    state.phase = 'read';
    /* Per piece, not per session. Translating The Lonely Bird must not
       arrive already translated on the next story. */
    state.translated = false;
    state.confirmTr = false;
    state.qs = [];
    state.qi = 0;
    state.chosen = [];
    state.answered = false;
    state.right = 0;
    state.voided = 0;
    state.qShown = {};
    state.qWarn = -1;
    state.run = GH.run ? GH.run.create() : null;
    paintRead();
  }

  function paintRead(){
    host.textContent = '';
    var p = state.piece, sec = state.sec;

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); paintIndex(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, pick(p.title)));
    titles.appendChild(el('p', null, t(sec.key)));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var card = el('div', 'card');

    /* The whole piece, German first. Tapping a line speaks it.

       A poem is set line by line because the line break is the form; a
       story is set as paragraphs of one sentence each, which is the same
       markup and a different rhythm. `verse` on the piece says which. */
    /* THE TRANSLATION IS NOT FREE.

       It used to sit under every German line, always, on the same screen
       as the button that starts the questions. `Der kleine Vogel ist nicht
       mehr allein` with `The little bird is not lonely anymore` under it
       is not a comprehension exercise, it is a reading of the answers.

       So it is behind a button, and pressing it rests the questions for
       five days — the same five days and the same stored key as answering
       them, because it is the same fact: these questions have been spent.

       Two states show the translation without asking: German (there is
       nothing to translate to) and a piece already resting (the questions
       are gone either way, so withholding it achieves nothing). */
    var l = lang();
    var left = restingFor(p.id);
    var showTr = (l !== 'de') && (state.translated || !!left);

    var body = el('div', 'rd-body' + (p.verse ? ' is-verse' : ''));
    (p.sentences || []).forEach(function(s, i){
      var row = el('button', 'rd-line');
      row.type = 'button';
      row.appendChild(el('span', 'rd-n', String(i + 1)));
      var col = el('span', 'rd-line-body');
      col.appendChild(el('span', 'rd-de', s.de));
      if (showTr && s[l]) col.appendChild(el('span', 'rd-tr', s[l]));
      row.appendChild(col);
      row.addEventListener('click', function(){ GH.speech.say(s.de); });
      body.appendChild(row);
    });
    card.appendChild(body);

    var acts = el('div', 'done-actions');

    var hear = el('button', 'btn btn-ghost', '\ud83d\udd0a ' + t('rdHearAll'));
    hear.type = 'button';
    hear.addEventListener('click', function(){
      GH.speech.say((p.sentences || []).map(function(s){ return s.de; }).join(' '));
    });
    acts.appendChild(hear);

    var bank = (p.q || []).filter(function(q){ return q && q.kind; });
    var hasQs = bank.length >= ASK;

    /* Translate. Absent in German, and absent once the translation is
       already on screen — a button that does what has been done is
       clutter. The warning comes first and only when there is something
       to lose: with no questions, or with the questions already resting,
       translating costs nothing and should not be dressed up as a
       decision. */
    if (l !== 'de' && !showTr){
      var tr = el('button', 'btn btn-ghost rd-translate', t('rdTranslate'));
      tr.type = 'button';
      tr.addEventListener('click', function(){
        if (hasQs && !left && !state.confirmTr){
          state.confirmTr = true;
          paintRead();
          return;
        }
        state.translated = true;
        state.confirmTr = false;
        /* Same key as answering, because it is the same fact: spent. */
        if (hasQs && !left) markAnswered(p.id);
        paintRead();
      });
      acts.appendChild(tr);
    }

    /* ---------- THE WORD LIST, WHICH COSTS HER NOTHING ----------

       Deliberately beside the translate button, because the two are the
       same shape and opposite prices. Translating rests the questions for
       five days; this does not touch the rest at all.

       That asymmetry is the whole design. Reading a story cold is hard;
       reading it after five minutes with its own words is not. So the path
       that builds comprehension is free and the shortcut is expensive.

       Only when the piece has a list. `has()` answers that, so a piece
       without one shows no button rather than an empty page. */
    if (GH.readerWords && GH.readerWords.has(p)){
      var wb = el('button', 'btn btn-ghost rd-words', t('rdWords'));
      wb.type = 'button';
      wb.addEventListener('click', function(){
        GH.speech.stop();
        /* Back returns HERE, to the piece she was reading, not to the
           index — she opened the list in order to read this. */
        GH.readerWords.open(host, p, function(){ paintRead(); });
      });
      acts.appendChild(wb);
    }

    if (hasQs && !left){
      /* Dimmed rather than hidden while the warning is up, so she can see
         what she is about to give up. */
      var go = el('button', 'btn btn-primary' +
        (state.confirmTr ? ' is-spent' : ' js-advance'), t('rdStartQs', { n:ASK }));
      go.type = 'button';
      if (!state.confirmTr) go.addEventListener('click', beginQuestions);
      acts.appendChild(go);
    } else if (hasQs && left){
      /* The button stays on the screen, dimmed and dead, rather than
         vanishing. A control that disappears reads as a bug; a control
         that is visibly spent reads as a rule. */
      var dim = el('button', 'btn btn-primary is-spent', t('rdStartQs', { n:ASK }));
      dim.type = 'button';
      dim.disabled = true;
      acts.appendChild(dim);
    }

    if (!hasQs){
      card.appendChild(el('p', 'rd-note', t('rdNoQuestionsWhy')));
    } else if (left){
      card.appendChild(el('p', 'rd-note',
        t('rdRestingWhy', { n:left, days:REST_DAYS })));
    }

    /* The warning, in the card and above the buttons, so it is read
       before the finger is already moving. */
    if (state.confirmTr){
      var warn = el('div', 'rd-warn');
      warn.appendChild(el('p', 'rd-warn-t', t('rdTrWarn', { days:REST_DAYS })));
      var yes = el('button', 'btn rd-warn-yes', t('rdTrYes'));
      yes.type = 'button';
      yes.addEventListener('click', function(){
        state.translated = true;
        state.confirmTr = false;
        markAnswered(p.id);
        paintRead();
      });
      var no = el('button', 'btn btn-ghost rd-warn-no', t('rdTrNo'));
      no.type = 'button';
      no.addEventListener('click', function(){
        state.confirmTr = false;
        paintRead();
      });
      warn.appendChild(yes);
      warn.appendChild(no);
      card.appendChild(warn);
    }

    card.appendChild(acts);
    host.appendChild(card);
    if (hasQs && !left && !state.confirmTr && GH.nav) GH.nav.ready();
  }

  /* ---------- answering ---------- */

  function beginQuestions(){
    GH.speech.stop();
    state.qs = drawQuestions(state.piece).map(function(q){
      return { q:q, choices:choicesFor(state.piece, q) };
    });
    state.qi = 0;
    state.chosen = [];
    state.answered = false;
    state.right = 0;
    state.voided = 0;
    state.qShown = {};
    state.qWarn = -1;
    state.phase = 'ask';
    paintAsk();
  }

  function currentQ(){ return state.qs[state.qi] || null; }

  function toggleChoice(i){
    var item = currentQ();
    if (!item || state.answered) return;
    var k = item.q.kind;
    var at = state.chosen.indexOf(i);

    if (k === 'multi'){
      if (at >= 0) state.chosen.splice(at, 1); else state.chosen.push(i);
    } else if (k === 'order'){
      /* Tapping adds to the sequence; tapping a chosen one removes it and
         everything after, because an order with a hole in it is not an
         order she can reason about. */
      if (at >= 0) state.chosen = state.chosen.slice(0, at);
      else state.chosen.push(i);
    } else {
      state.chosen = [i];
    }
    paintAsk();
  }

  function submit(){
    var item = currentQ();
    if (!item || state.answered || !state.chosen.length) return;
    state.answered = true;
    var ok = isRight(item.q, state.chosen, item.choices);
    /* Right, but translated: correct on screen and worth nothing, which is
       what she was warned about. Counted separately so the end screen can
       say so rather than leaving her to work out why the score is short. */
    if (ok && counts()) state.right++;
    else if (ok) state.voided++;
    if (state.run) state.run.saw('rd:' + state.qi, ok);
    if (GH.tutor){
      GH.tutor.grade('skill:reading', ok);
      if (state.piece.cat) GH.tutor.grade('topic:' + state.piece.cat, ok);
    }
    paintAsk();
  }

  function nextQ(){
    state.qi++;
    state.chosen = [];
    state.answered = false;
    if (state.qi >= state.qs.length){ finish(); return; }
    paintAsk();
  }

  function paintAsk(){
    host.textContent = '';
    var item = currentQ();
    if (!item){ finish(); return; }
    var p = state.piece;

    var headBar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); paintIndex(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, pick(p.title)));
    titles.appendChild(el('p', null,
      t('roundOf', { i:state.qi + 1, n:state.qs.length })));
    headBar.appendChild(titles);
    if (state.run && GH.run) headBar.appendChild(GH.run.header(state.run));
    host.appendChild(headBar);

    var card = el('div', 'card');

    card.appendChild(el('p', 'rd-kind', t('rdKind_' + item.q.kind)));
    card.appendChild(el('p', 'rd-q', askPick(item.q, item.q)));

    /* ---------- SHE MAY TRANSLATE IT, AND IT THEN COUNTS FOR NOTHING ----

       Not hidden and not forbidden. On a loanword-heavy topic the English
       question answers itself, so translating it has to cost something —
       but refusing outright would leave her stuck on a question she cannot
       read, which teaches nothing either.

       WARNED BEFORE, NEVER AFTER. A penalty she discovers on the end screen
       is a trap; a penalty she agreed to is a choice. Two taps, and the
       first one only tells her the price. */
    if (inL2(item.q) && lang() !== 'de'){
      if (state.qShown[state.qi]){
        card.appendChild(el('p', 'rd-q-void', t('rdQVoid')));
      } else if (state.qWarn === state.qi){
        var warn = el('div', 'rd-q-warn');
        warn.appendChild(el('p', null, t('rdQWarn')));
        var yes = el('button', 'btn btn-ghost', t('rdQWarnYes'));
        yes.type = 'button';
        yes.addEventListener('click', function(){
          state.qShown[state.qi] = true;
          state.qWarn = -1;
          paintAsk();
        });
        var no = el('button', 'btn btn-ghost', t('rdQWarnNo'));
        no.type = 'button';
        no.addEventListener('click', function(){ state.qWarn = -1; paintAsk(); });
        warn.appendChild(yes); warn.appendChild(no);
        card.appendChild(warn);
      } else {
        var trq = el('button', 'btn btn-ghost rd-q-tr', t('rdQTranslate'));
        trq.type = 'button';
        trq.addEventListener('click', function(){ state.qWarn = state.qi; paintAsk(); });
        card.appendChild(trq);
      }
    }

    var list = el('div', 'rd-choices');
    item.choices.forEach(function(c, i){
      var b = el('button', 'rd-choice');
      b.type = 'button';

      var at = state.chosen.indexOf(i);
      if (at >= 0) b.className += ' is-picked';

      /* An ordering question has to show the position she has given each
         line, or she is choosing blind. */
      if (item.q.kind === 'order' && at >= 0){
        b.appendChild(el('span', 'rd-pos', String(at + 1)));
      } else if (item.q.kind === 'multi'){
        b.appendChild(el('span', 'rd-box', at >= 0 ? '\u2713' : ''));
      }

      b.appendChild(el('span', 'rd-choice-t', c.label));

      if (state.answered){
        b.disabled = true;
        if (item.q.kind === 'order'){
          var want = (item.q.a || []).indexOf(c.i);
          if (want >= 0) b.appendChild(el('span', 'rd-was', String(want + 1)));
        } else if (c.right){
          b.className += ' is-right';
        } else if (at >= 0){
          b.className += ' is-wrong';
        }
      }

      b.addEventListener('click', function(){ toggleChoice(i); });
      list.appendChild(b);
    });
    card.appendChild(list);

    if (state.answered && state.run && GH.run){
      var ack = GH.run.note(state.run);
      if (ack) card.appendChild(ack);
    }

    var acts = el('div', 'done-actions');
    if (!state.answered){
      var go = el('button', 'btn btn-primary js-advance', t('rdCheck'));
      go.type = 'button';
      go.disabled = !state.chosen.length;
      go.addEventListener('click', submit);
      acts.appendChild(go);
    } else {
      var nx = el('button', 'btn btn-primary js-advance',
        state.qi === state.qs.length - 1 ? t('cmDone') : t('next'));
      nx.type = 'button';
      nx.addEventListener('click', nextQ);
      acts.appendChild(nx);
    }
    card.appendChild(acts);

    host.appendChild(card);
    if (GH.nav) GH.nav.ready();
  }

  /* ---------- the end ---------- */

  function finish(){
    var p = state.piece, sec = state.sec;
    var asked = state.qs.length;
    var right = state.right;

    /* The rest starts now, whatever the score. Resting on a good round
       only would mean a bad round could be retried until it was a good
       one, which is not comprehension, it is elimination. */
    markAnswered(p.id);

    /* The score is the piece's own, scaled by how much she got. Kronen are
       separate and come from finishing, the same as every other activity —
       paying more for a longer piece would make the medium stories the
       only ones worth opening. */
    var score = asked ? Math.round(sec.score * (right / asked)) : 0;

    var paid = GH.coins ? GH.coins.award('reader', state.run, { units:1 }) : null;
    var won = GH.awards ? GH.awards.afterRound('reader', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: right === asked ? 'perfect' : (right ? 'done' : 'lost'),
      glyph: sec.glyph,
      title: right === asked ? t('cwPerfect') : t('doneTitle'),
      badge: pick(p.title),
      stats: (function(){
        var rows = [{ n:right, label:t('fbRight'), kind:'good' }];
        /* Right but translated. Its own row rather than folded into wrong,
           because she DID answer it correctly and being told otherwise is
           a lie. It simply did not score, which is what she agreed to. */
        if (state.voided) rows.push({ n:state.voided, label:t('rdVoided'), kind:'bad' });
        rows.push({ n:asked - right - state.voided, label:t('fbWrong'), kind:'bad' });
        rows.push({ n:score, label:t('rdScore'),
                    kind: right === asked ? 'good' : 'bad' });
        return rows;
      })(),
      note: state.voided
        ? t('rdVoidNote') + ' ' + t('rdRestNote', { n:REST_DAYS })
        : t('rdRestNote', { n:REST_DAYS }),
      actions: [
        { label:t('rdReadAgain'), kind:'primary', onClick:function(){
            state.phase = 'read'; paintRead(); } },
        { label:t('toHub'), onClick:function(){ GH.speech.stop(); state.onExit(); } }
      ]
    });
  }

  /* ---------- entry ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, sec:null, piece:null, phase:'index',
              translated:false, confirmTr:false,
              qs:[], qi:0, chosen:[], answered:false, right:0,
              voided:0, qShown:{}, qWarn:-1, run:null };
    GH.app.redraw = function(){
      if (state.phase === 'read') paintRead();
      else if (state.phase === 'ask') paintAsk();
      else paintIndex();
    };
    paintIndex();
  }

  var entry = {
    id:'reader',
    /* Read and listen, not Games. She is marked here, but on
       understanding rather than on production, and the piece itself is
       always readable whatever the score. */
    kind:'read',
    glyph:'\ud83d\udcda',
    name:{ ru:'Читальня', de:'Lesestunde', en:'The Reader' },
    sub:{ ru:'Рассказы и стихи, с вопросами',
          de:'Geschichten und Gedichte, mit Fragen',
          en:'Stories and poems, with questions' },
    open:open
  };

  /* index.html loads the activities before app.js, so GH.app usually does
     not exist yet and a bare guarded call registers nothing, silently.
     Retry once the document is ready. Load order should not decide
     whether a feature exists. */
  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register };
})();
