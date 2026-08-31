/* Wer ist es? — Guess Who.

   The app picks one of the people in secret. She asks questions in German
   and gets Ja or Nein. She works out who it is.

   ------------------------------------------------------------------
   THE APP NEVER TOUCHES THE BOARD

   It answers, and that is all. She flips the faces down herself.

   That is the design, not a shortcut. A game that eliminates for her is a
   quiz with pictures: she taps a question, watches faces grey out, and the
   thinking has been done on her behalf. Doing it herself is the reason the
   German has to be understood rather than recognised — the answer is
   useless until she works out what it rules out.

   It also means she can flip down the wrong person, and that has to be
   recoverable and diagnosable. See `verdict()`.

   ------------------------------------------------------------------
   THE QUESTION IS A FULL SENTENCE

   She taps HAARE, then LANG, and the app shows and speaks

       Hat die Person lange Haare?     Ja

   rather than a bare Ja. The structure arrives free, attached to something
   she actually wanted to know, which is the only way grammar sticks. A
   category with one value is already a question (`Hat die Person eine
   Brille?`); one with several asks which.

   ------------------------------------------------------------------
   THREE BOARDS, ONE SET OF PAINTINGS

   12, 20 and 32 people with 4, 6 and 9 categories. The levels nest, and
   the order of GH_FACES is load-bearing — see the note in data/faces.js.

   ------------------------------------------------------------------
   WHAT IS SCORED

   Questions asked, against the number a perfect player needs. The board is
   built so that is 4, 5 and 6. Asking more is fine; asking a question that
   could not have told her anything is the thing worth noticing, and
   `dead` counts those.

   A wrong final guess ends the round. She gets told WHY she was wrong,
   which is the whole teaching moment:

     the answer was still on the board  -> she guessed too early
     she had flipped the answer down    -> a question was misread, and the
                                           game says which one */

window.GH = window.GH || {};

GH.guessWho = (function(){

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

  function levels(){ return window.GH_FACE_LEVELS || []; }
  function askDefs(){ return window.GH_FACE_ASK || {}; }
  function allFaces(){ return window.GH_FACES || []; }

  /* The word for a value, in her language: `lange Haare`, `blond`. Used
     both in the question and on the palette button, so they cannot drift
     apart. */
  function word(cat, v){ return t('gwV_' + cat + '_' + String(v)); }

  /* The question as a sentence. */
  function sentence(cat, v){
    var def = askDefs()[cat];
    return t(def.q, { v: word(cat, v) });
  }

  /* The German, always, whatever the interface language — it is what gets
     spoken and what she is learning.

     Its own keys rather than reading the German table, because i18n has no
     way to ask for one language while another is selected and adding one
     for this would be a lot of reach for a sentence. `gwDQ_*` and `gwDV_*`
     are German in all three tables, so they come back German whatever is
     selected. */
  function germanSentence(cat, v){
    return t('gwDQ_' + cat, { v: t('gwDV_' + cat + '_' + String(v)) });
  }

  function answerFor(face, cat, v){ return face[cat] === v; }

  /* ---------- a round ---------- */

  /* One board of twenty-seven, not three nested ones. A smaller board would
     need its own check that fewer questions can still tell everyone apart,
     and that check has not been run — so it is not offered. `LEVELS` is
     still a list, so adding one later needs no code here. */

  /* WHICH BOARD SHE GETS, WITHOUT BEING ASKED.

     A chooser is a screen with buttons on it standing between her and the
     game. The board IS the interface, so it appears immediately and the
     size sits on it — one tap to change, and the change is visible rather
     than described.

     Remembered per profile, because a size is a preference and asking
     again tomorrow is asking twice. `medium` to start: the small board is
     four questions and seven words, which is right for a first go and
     thin as a default.

     Per player and per target language, like every other stored
     preference — Nazar switching to the small board must not move Tanya's. */
  var SIZE_KEY = 'gh-gw-size';

  function slot(){
    return (GH.player && GH.player.id)
      ? GH.player.id() + ':' + GH.player.target() : 'solo';
  }

  function prefer(){
    var want = null;
    try {
      var raw = window.localStorage.getItem(SIZE_KEY);
      if (raw) want = (JSON.parse(raw) || {})[slot()];
    } catch (e){}
    var ids = levels().map(function(l){ return l.id; });
    /* A remembered size that no longer exists — a board removed from the
       data — must not leave her with nothing. */
    if (want && ids.indexOf(want) >= 0) return want;
    return ids.indexOf('medium') >= 0 ? 'medium' : ids[0];
  }

  function remember(id){
    try {
      var raw = window.localStorage.getItem(SIZE_KEY);
      var all = raw ? (JSON.parse(raw) || {}) : {};
      all[slot()] = id;
      window.localStorage.setItem(SIZE_KEY, JSON.stringify(all));
    } catch (e){}
  }

  function begin(levelId){
    var lv = levels().filter(function(x){ return x.id === levelId; })[0] || levels()[0];
    var board = allFaces().slice(0, lv.n);
    var secret = board[Math.floor(Math.random() * board.length)];
    remember(lv.id);
    state.round = {
      level: lv,
      board: board,
      secret: secret,
      down: {},          /* face id -> true, flipped down by her */
      asked: [],         /* { cat, v, yes, dead } */
      cat: null,         /* the category she has opened */
      last: null,        /* the most recent answer, shown large */
      over: null         /* { won:bool, why:string, face:face } */
    };
    paint();
  }

  /* Would this question have told her anything, given what she has NOT
     flipped down? Not whether it is optimal — whether it can split the
     faces still standing. Asking `Ist die Person eine Frau?` when only men
     are left is a wasted turn, and saying so is more useful than silently
     counting it. */
  function isDead(cat, v){
    var live = standing();
    var yes = 0, no = 0;
    live.forEach(function(f){ if (answerFor(f, cat, v)) yes++; else no++; });
    return !yes || !no;
  }

  function standing(){
    var r = state.round;
    return r.board.filter(function(f){ return !r.down[f.id]; });
  }

  function ask(cat, v){
    var r = state.round;
    if (r.over) return;
    var dead = isDead(cat, v);
    var yes = answerFor(r.secret, cat, v);
    r.asked.push({ cat:cat, v:v, yes:yes, dead:dead });
    r.last = { cat:cat, v:v, yes:yes, dead:dead };
    r.cat = null;
    if (GH.speech) GH.speech.say(germanSentence(cat, v));
    paint();
  }

  function flip(face){
    var r = state.round;
    if (r.over) return;
    if (r.down[face.id]) delete r.down[face.id];
    else r.down[face.id] = true;
    paint();
  }

  /* Her final answer. */
  function guess(face){
    var r = state.round;
    if (r.over) return;
    r.over = verdict(face);
    finish();
  }

  /* WHY she was wrong, which is the only part of losing that teaches.

     Three cases, and they call for different things:

       right                  — she deduced it
       still standing         — she guessed before she had narrowed it, so
                                the fix is patience
       flipped down herself   — she eliminated the answer, which means one
                                of her questions was misread. The game
                                names that question, because "you were
                                wrong" without it teaches nothing. */
  function verdict(face){
    var r = state.round;
    if (face.id === r.secret.id){
      return { won:true, why:'right', face:face };
    }
    if (r.down[r.secret.id]){
      /* find the question whose answer she acted against */
      var culprit = null;
      r.asked.forEach(function(a){
        var trueFor = answerFor(r.secret, a.cat, a.v);
        if (trueFor !== a.yes) return;          /* cannot happen, but cheap */
        /* she flipped the answer down, so some question she asked must
           have been read backwards: the one where the answer said keep and
           she removed */
        if (!culprit && trueFor === a.yes) culprit = a;
      });
      return { won:false, why:'eliminated', face:face, question:culprit };
    }
    return { won:false, why:'early', face:face, left:standing().length };
  }

  function finish(){
    var r = state.round;
    /* What a perfect player needs on this board, verified against the data
       rather than guessed: six. Keyed on the level id so a second board
       gets its own number. */
    var need = { all:6, easy:4, medium:5, hard:6 }[r.level.id] || 6;
    var asked = r.asked.length;
    var dead = r.asked.filter(function(a){ return a.dead; }).length;

    var paid = null;
    if (GH.coins){
      /* A win is one of the day's exercises. A loss pays nothing, which is
         what makes the guess worth thinking about — but nothing is taken
         away either, and she can start another round immediately. */
      paid = r.over.won
        ? GH.coins.award('guess-who', { answered:asked, right:asked - dead })
        : null;
    }
    if (GH.tutor){
      /* One grade for the round, on the skill the game exercises: reading a
         German description and acting on it. Not per question — a question
         is not right or wrong, it is just information. */
      GH.tutor.grade('skill:describe', r.over.won && asked <= need + 2);
    }

    host.textContent = '';
    host.appendChild(head(true));

    GH.endScreen.render(host, {
      coins: paid,
      tone: r.over.won ? (asked <= need ? 'perfect' : 'done') : 'lost',
      title: r.over.won ? t('gwWon') : t('gwLost'),
      stats: [
        { n:asked, label:t('gwQuestions'), kind:r.over.won ? 'good' : null },
        { n:need,  label:t('gwPerfect') }
      ].concat(dead ? [{ n:dead, label:t('gwDead'), kind:'bad' }] : []),
      /* Above the buttons, because a review under the actions is a review
         nobody reads — the end screen's own note says so. */
      extra: explain(),
      actions: [
        { label:t('gwAgain'), kind:'primary',
          onClick: function(){ begin(r.level.id); } },
        { label:t('back'), kind:'ghost',
          onClick: function(){ state.onExit(); } }
      ].concat(levels().length > 1
        ? [{ label:t('gwOtherLevel'), kind:'ghost',
             onClick: function(){ state.round = null; paint(); } }]
        : [])
    });
    if (GH.nav) GH.nav.ready();
  }

  /* The line that does the teaching. */
  function explain(){
    var r = state.round;
    var box = el('div', 'gw-verdict is-' + r.over.why);
    box.appendChild(el('p', 'gw-verdict-t',
      t('gwWas', { name:r.secret.name })));

    var pic = GH.facePic.tile(r.secret, 'gw-verdict-pic');
    box.appendChild(pic);

    if (r.over.why === 'early'){
      box.appendChild(el('p', 'gw-verdict-why',
        t('gwEarly', { n:r.over.left })));
    } else if (r.over.why === 'eliminated'){
      box.appendChild(el('p', 'gw-verdict-why', t('gwEliminated')));
      if (r.over.question){
        var q = r.over.question;
        box.appendChild(el('p', 'gw-verdict-q',
          sentence(q.cat, q.v) + '  \u2192  ' + t(q.yes ? 'gwYes' : 'gwNo')));
      }
    }
    return box;
  }

  /* ---------- painting ---------- */

  function head(bare){
    var h = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      GH.speech.stop();
      /* With no chooser there is nowhere between the round and the hub, so
         Back leaves. Abandoning a round mid-way is allowed and costs
         nothing — the app only pays for a finished one. */
      if (state.round && !bare && levels().length > 1){
        state.round = null; paint(); return;
      }
      state.onExit();
    });
    h.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('gwTitle')));
    if (state.round){
      titles.appendChild(el('p', null,
        t('gwAskedN', { n:state.round.asked.length })));
    } else {
      titles.appendChild(el('p', null, t('gwSub')));
    }
    h.appendChild(titles);
    return h;
  }

  function paint(){
    host.textContent = '';
    /* ONE BOARD MEANS NO CHOOSER.

       The chooser earned its place when there were three sizes. With one
       it is a screen holding a single button — a gate she taps through
       every time to reach the game, which is the worst kind of screen.

       So it appears only when there is something to choose. Add a second
       board to GH_FACE_LEVELS and it comes back on its own. */
    if (!state.round){ begin(prefer()); return; }
    paintRound();
  }

  function paintLevels(){
    host.appendChild(head());
    var wrap = el('div', 'gw-levels');
    levels().forEach(function(lv){
      var words = 0;
      lv.ask.forEach(function(k){ words += askDefs()[k].values.length; });
      var b = el('button', 'gw-level');
      b.type = 'button';
      b.appendChild(el('span', 'gw-level-name', t('gwLevel_' + lv.id)));
      b.appendChild(el('span', 'gw-level-sub',
        t('gwLevelSub', { faces:lv.n, words:words })));
      b.addEventListener('click', function(){ begin(lv.id); });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    if (GH.nav) GH.nav.ready();
  }

  function paintRound(){
    var r = state.round;
    host.appendChild(head());

    /* The answer to the last question, large, before the board — she has
       just asked and this is what she came for. */
    if (r.last){
      var a = el('div', 'gw-answer is-' + (r.last.yes ? 'yes' : 'no'));
      var sq = el('button', 'gw-answer-q', sentence(r.last.cat, r.last.v));
      sq.type = 'button';
      sq.addEventListener('click', function(){
        GH.speech.say(germanSentence(r.last.cat, r.last.v));
      });
      a.appendChild(sq);
      a.appendChild(el('span', 'gw-answer-a', t(r.last.yes ? 'gwYes' : 'gwNo')));
      if (r.last.dead){
        /* She asked something that could not separate anyone still
           standing. Said once, plainly, because it is the single most
           useful thing to notice about your own play. */
        a.appendChild(el('span', 'gw-answer-dead', t('gwDeadNote')));
      }
      host.appendChild(a);
    }

    host.appendChild(sizes());
    host.appendChild(board());
    host.appendChild(palette());

    var left = standing().length;
    host.appendChild(el('p', 'gw-left', t('gwLeftN', { n:left })));
    if (GH.nav) GH.nav.ready();
  }

  /* The size, on the board rather than before it.

     Switching starts a fresh round, which it must: the secret person may
     not be on the new board, and half-eliminated faces from a different
     size are meaningless. So it is only offered BEFORE she has asked
     anything — swapping four questions into a round would throw away work
     she has done, and a control that silently discards progress is worse
     than no control.

     Once she has asked, the row shows which size she is on and nothing
     else. Still information; just not a button any more. */
  function sizes(){
    var r = state.round;
    var wrap = el('div', 'gw-sizes');
    var fresh = !r.asked.length;
    levels().forEach(function(lv){
      var here = lv.id === r.level.id;
      var b = el('button', 'gw-size' + (here ? ' is-on' : '') +
        (fresh ? '' : ' is-locked'));
      b.type = 'button';
      b.appendChild(el('span', 'gw-size-name', t('gwLevel_' + lv.id)));
      b.appendChild(el('span', 'gw-size-n', String(lv.n)));
      if (fresh && !here){
        b.addEventListener('click', function(){ begin(lv.id); });
      } else if (!fresh && !here){
        b.disabled = true;
      }
      wrap.appendChild(b);
    });
    if (!fresh) wrap.appendChild(el('span', 'gw-size-note', t('gwSizeLocked')));
    return wrap;
  }

  function board(){
    var r = state.round;
    var grid = el('div', 'gw-board gw-n' + r.board.length);
    r.board.forEach(function(f){
      var down = !!r.down[f.id];
      var cell = el('div', 'gw-cell' + (down ? ' is-down' : ''));

      var pic = el('button', 'gw-pic');
      pic.type = 'button';
      pic.setAttribute('aria-label', f.name);
      pic.appendChild(GH.facePic.tile(f));
      /* Tap the picture to flip. Tapping again brings her back — she will
         eliminate someone by mistake and a game that cannot be undone
         punishes a misread twice. */
      pic.addEventListener('click', function(){ flip(f); });
      cell.appendChild(pic);

      cell.appendChild(el('span', 'gw-cell-name', f.name));

      /* Guessing is a separate, deliberate button, and only on faces still
         standing. Making the picture do both would end rounds by accident. */
      if (!down){
        var g = el('button', 'gw-guess', t('gwThisOne'));
        g.type = 'button';
        g.addEventListener('click', function(){ confirmGuess(f); });
        cell.appendChild(g);
      }
      grid.appendChild(cell);
    });
    return grid;
  }

  /* A guess ends the round, so it asks first. */
  function confirmGuess(f){
    var r = state.round;
    r.confirm = f;
    host.textContent = '';
    host.appendChild(head());
    var box = el('div', 'card gw-confirm');
    box.appendChild(GH.facePic.tile(f, 'gw-confirm-pic'));
    box.appendChild(el('p', 'gw-confirm-t', t('gwSure', { name:f.name })));
    var yes = el('button', 'btn btn-primary gw-confirm-yes', t('gwSureYes'));
    yes.type = 'button';
    yes.addEventListener('click', function(){ r.confirm = null; guess(f); });
    var no = el('button', 'btn gw-confirm-no', t('gwSureNo'));
    no.type = 'button';
    no.addEventListener('click', function(){ r.confirm = null; paint(); });
    box.appendChild(yes);
    box.appendChild(no);
    host.appendChild(box);
    if (GH.nav) GH.nav.ready();
  }

  function palette(){
    var r = state.round;
    var wrap = el('div', 'gw-ask');

    if (!r.cat){
      r.level.ask.forEach(function(cat){
        var def = askDefs()[cat];
        var b = el('button', 'gw-cat', t('gwC_' + cat));
        b.type = 'button';
        /* A category she has exhausted is dimmed rather than removed: the
           palette is also the vocabulary list, and a shrinking list hides
           words she has not met yet. */
        var allDead = def.values.every(function(v){ return isDead(cat, v); });
        if (allDead) b.className += ' is-spent';
        b.addEventListener('click', function(){ r.cat = cat; paint(); });
        wrap.appendChild(b);
      });
      return wrap;
    }

    var def = askDefs()[r.cat];
    var head2 = el('div', 'gw-ask-head');
    var backb = el('button', 'gw-ask-back', '\u2039 ' + t('gwC_' + r.cat));
    backb.type = 'button';
    backb.addEventListener('click', function(){ r.cat = null; paint(); });
    head2.appendChild(backb);
    wrap.appendChild(head2);

    var row = el('div', 'gw-vals');
    def.values.forEach(function(v){
      var b = el('button', 'gw-val' + (isDead(r.cat, v) ? ' is-spent' : ''),
        word(r.cat, v));
      b.type = 'button';
      /* Still askable when dead. It costs her a question and tells her
         nothing, which is a lesson the game should let her learn rather
         than prevent. */
      b.addEventListener('click', function(){ ask(r.cat, v); });
      row.appendChild(b);
    });
    wrap.appendChild(row);
    return wrap;
  }

  /* ---------- entry ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, round:null };
    GH.app.redraw = paint;
    paint();
  }

  var entry = {
    id:'guess-who',
    glyph:'\ud83d\udd75\ufe0f',
    name:{ ru:'Кто это?', de:'Wer ist es?', en:'Who is it?' },
    sub:{ ru:'Задавай вопросы по-немецки и угадай человека',
          de:'Stelle Fragen und finde die Person',
          en:'Ask questions in German and work out who it is' },
    rules:'gwRule', rulesTitle:'gwTitle',
    /* The board sizes ARE the ladder here, and they come from the data so
       adding a fourth board needs no edit to this line.

       `teaches` is empty on purpose. This game grades `skill:describe` and
       nothing else: reading a German description and acting on it. It never
       asks about a specific word from the bank, so it can teach no area the
       tutor schedules — and claiming otherwise would have it suggested for
       weak vocabulary, which it would not help. */
    levels:(window.GH_FACE_LEVELS || []).map(function(l){ return l.id; }),
    teaches:[],
    open:open
  };

  function register(){
    /* No people, no tile. The board comes from data/faces.js and the game
       is meaningless without it. */
    if (!(window.GH_FACES || []).length) return;
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register };
})();
