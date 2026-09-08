/* js/activities/talkview.js */
/* The dialogues.

   Stage one of four. Two things happen here and nothing else:

     LISTEN     the whole conversation, both speakers, her language under
                every German line. Play runs it start to finish and marks
                the line being said. Tapping any line repeats that line.
     PRACTISE   the same conversation truncated at a blanked line, with
                the missing words offered as four choices.

   Stages C and D — a whole turn missing, and comprehension questions
   after a stop — are not here. C needs plausible wrong turns written per
   line, which the data does not have; D should point the Reader's six
   question kinds at these dialogues rather than grow a second question
   system.

   ------------------------------------------------------------------
   TWO VOICES

   A conversation read in one voice is not a conversation. Speaker A gets
   GH.speech.sayAs(text, 0) and speaker B gets sayAs(text, 1), which is
   the second-best German voice on the device, or the same voice pitched
   down where there is only one. The line being spoken is marked so she
   can follow without reading ahead.

   Play chains through onDone rather than on a timer, so a slow voice
   never gets talked over by the next line.

   ------------------------------------------------------------------
   PRACTISE, AND WHAT IT DELIBERATELY DOES NOT DO

   No points, no round, no end screen, no scheduling. She picks, she is
   told, the line completes, and she can listen to the whole thing. A
   scoring scheme was not asked for and inventing one here would put a
   fourth grading model in the app.

   The blank is a phrase, taken from the data as a string rather than a
   word index — `blank:{ de:'halb vier' }`. Distractors come from the
   other dialogues' blanks, preferring ones with the same number of
   words, because `halb vier` against `Hafermilch` is answerable on shape
   alone.

   Six of the twenty German blanks have their answer printed elsewhere in
   the same eight lines and carry `seen:{ de:true }`. That is left alone
   here: in PRACTISE the dialogue is truncated at the blank, so a repeat
   in a later line is gone, and a repeat in an earlier line is the
   inference the blank was chosen for. The flag matters for stage C, where
   the whole turn is missing.

   Reads window.GH_DIALOGUES. No data, no tile. */

window.GH = window.GH || {};

GH.talkView = (function(){

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

  function all(){ return window.GH_DIALOGUES || []; }

  function byId(id){
    var D = all(), i;
    for (i = 0; i < D.length; i++) if (D[i].id === id) return D[i];
    return null;
  }

  function who(line){ return line.w === 'b' ? 1 : 0; }

  /* ---------- listening, and what it costs ----------

     Listening to a whole dialogue is worth five Kronen and half of one of
     the day's five tasks: two listens make a task. That is what
     GH.coins.awardPart exists for — award() forces a minimum of one whole
     unit, so a half would pay ten and count a whole task.

     And listening spends the fill-in-blank for five days. It has to: she
     has just heard the answer read aloud, so the gap is not a gap any
     more. Same rule and the same arithmetic as the Reader's rest, kept in
     its own key so the two cannot tread on each other.

     Days are counted as calendar days rather than elapsed hours. Listening
     at 11pm on Monday and coming back at 8am on Saturday is five days,
     which is what she would call it; elapsed hours would call it four and
     a half and lock her out of a day she has already waited.

     Paying and resting are the SAME event, which also settles a question
     nobody asked: replaying a dialogue during its rest pays nothing. */
  var REST_DAYS = 5;
  var REST_KEY  = 'gh-dialogue-rest';
  var LISTEN_COINS = 5;
  var LISTENS_PER_TASK = 2;

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

  function markListened(id){
    try {
      var all = restAll();
      if (!all[restSlot()]) all[restSlot()] = {};
      all[restSlot()][id] = new Date().toDateString();
      window.localStorage.setItem(REST_KEY, JSON.stringify(all));
    } catch (e){}
  }

  /* Called once, when Play reaches the last line. Tapping single lines is
     not listening to the dialogue and does not pay or rest it — otherwise
     hearing one line she did not catch would cost her the exercise. */
  function finishedListening(d){
    if (restingFor(d.id)) return null;          /* already spent */
    markListened(d.id);
    /* A dialogue listened to all the way through. The log had opens and
       leaves for this screen and nothing about which dialogue or whether
       she played it. */
    if (GH.events && GH.events.mark) GH.events.mark('hear', 'dialogue:' + d.id);
    if (!GH.coins || !GH.coins.awardPart) return null;
    return GH.coins.awardPart('dialogue', LISTEN_COINS, LISTENS_PER_TASK);
  }

  /* Every line that carries a German blank, as indices. */
  function blankedLines(d){
    var out = [];
    (d.lines || []).forEach(function(l, i){
      if (l.blank && l.blank.de) out.push(i);
    });
    return out;
  }

  /* ---------- distractors ----------

     Every other dialogue's German blanks, minus this one's, preferring
     the same word count. Same count first because the shape of the gap
     is a clue on its own: a two-word answer among three one-word options
     needs no German at all. */
  function otherBlanks(exceptId){
    var out = [];
    all().forEach(function(d){
      if (d.id === exceptId) return;
      (d.lines || []).forEach(function(l){
        if (l.blank && l.blank.de) out.push(l.blank.de);
      });
    });
    return out;
  }

  function words(s){ return String(s).split(/\s+/).length; }

  function options(d, answer){
    var pool = otherBlanks(d.id).filter(function(x){ return x !== answer; });
    var n = words(answer);
    var same = pool.filter(function(x){ return words(x) === n; });
    var rest = pool.filter(function(x){ return words(x) !== n; });
    var picked = GH.text.shuffle(same).concat(GH.text.shuffle(rest)).slice(0, 3);
    return GH.text.shuffle([answer].concat(picked));
  }

  /* ---------- the list ---------- */

  function paintIndex(){
    host.textContent = '';
    GH.speech.stop();

    var headBar = el('div', 'practice-head');
    var back = GH.back.button(function(){ clearTakes(); state.onExit(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('dgTitle')));
    titles.appendChild(el('p', null, t('dgSub')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var D = all();
    if (!D.length){
      host.appendChild(el('p', 'lede', t('dgEmpty')));
      if (GH.nav) GH.nav.ready();
      return;
    }

    var list = el('div', 'dg-list');
    D.forEach(function(d){
      var b = el('button', 'dg-card');
      b.type = 'button';
      b.appendChild(el('span', 'dg-card-de', d.title.de));
      if (lang() !== 'de'){
        b.appendChild(el('span', 'dg-card-mine', d.title[lang()] || d.title.en));
      }
      var nb = blankedLines(d).length;
      b.appendChild(el('span', 'dg-card-meta',
        t('dgLinesN', { n:(d.lines || []).length }) +
        (nb ? ' \u00b7 ' + t('dgBlanksN', { n:nb }) : '')));
      var left = restingFor(d.id);
      if (left && blankedLines(d).length){
        b.appendChild(el('span', 'dg-card-rest', t('dgRestN', { n:left })));
      }
      b.addEventListener('click', function(){
        /* Another conversation: her takes belong to the one she is
           leaving, and their blob urls have to go with it. */
        clearTakes();
        state.id = d.id; state.mode = 'listen'; state.paid = null;
        paintDialogue();
        /* Opening a dialogue is a new screen, not a repaint of the list.
           Without this she keeps the list's scroll offset and lands part
           way down the conversation. Same fault as the songbook. */
        if (GH.nav && GH.nav.top) GH.nav.top();
      });
      list.appendChild(b);
    });
    host.appendChild(list);

    if (GH.nav) GH.nav.ready();
  }

  /* ---------- listen ---------- */

  function paintDialogue(){
    var d = byId(state.id);
    if (!d){ paintIndex(); return; }

    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = GH.back.button(function(){
      GH.speech.stop();
      state.id = null; state.playing = false;
      paintIndex();
    });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, d.title.de));
    if (lang() !== 'de'){
      titles.appendChild(el('p', null, d.title[lang()] || d.title.en));
    }
    headBar.appendChild(titles);
    host.appendChild(headBar);

    /* A dialogue offers the modes its own data supports. dg-01 to dg-10
       carry `blank` and no `c` or `d`; dg-11 to dg-15 are the other way
       round. A button for a mode with no data promises an empty exercise,
       so the list is built from the data rather than written out here. */
    var modes = [['listen', 'dgListen']];
    if (blankedLines(d).length) modes.push(['practise', 'dgPractise']);
    if ((d.c || []).length)      modes.push(['respond', 'dgRespond']);
    if ((d.d || []).length)      modes.push(['quiz', 'dgQuestions']);

    /* She can arrive in a mode this dialogue does not have: the language
       switch repaints, and so does coming back from another one. */
    if (!modes.some(function(m){ return m[0] === state.mode; })) state.mode = 'listen';

    var bar = el('div', 'dg-modes');
    modes.forEach(function(pair){
      /* Its own class, not `.mode-toggle` — that one is the container in
         style.css, with margin-left:auto and a pill background, and
         putting it on each button styles two containers. */
      var b = el('button', 'dg-mode' +
        (state.mode === pair[0] ? ' is-on' : ''), t(pair[1]));
      b.type = 'button';
      b.addEventListener('click', function(){
        GH.speech.stop();
        state.playing = false;
        state.mode = pair[0];
        resetRun();
        paintDialogue();
      });
      bar.appendChild(b);
    });
    host.appendChild(bar);

    if (state.mode === 'practise')      paintPractise(d);
    else if (state.mode === 'respond')  paintRespond(d);
    else if (state.mode === 'quiz')     paintQuiz(d);
    else paintListen(d);

    if (GH.nav) GH.nav.ready();
  }

  function paintListen(d){
    var play = el('button', 'btn btn-primary dg-play',
      state.playing ? t('dgStop') : t('dgPlay'));
    play.type = 'button';
    play.addEventListener('click', function(){
      if (state.playing){ stopPlay(); return; }
      startPlay(d);
    });
    host.appendChild(play);

    var wrap = el('div', 'dg-talk');
    (d.lines || []).forEach(function(l, i){
      wrap.appendChild(lineRow(l, i, i === state.at));
    });
    host.appendChild(wrap);

    /* What the listen was worth, shown once, right after it finishes. A
       number that appears with no explanation is a notification, not a
       reward. */
    if (state.paid){
      var got = el('div', 'dg-paid');
      got.appendChild(el('p', 'dg-paid-n',
        t('dgEarned', { n:state.paid.total })));
      got.appendChild(el('p', 'dg-paid-day',
        state.paid.part
          ? t('dgHalfTask', { n:state.paid.done, of:state.paid.need })
          : t('dgWholeTask', { n:state.paid.done, of:state.paid.need })));
      host.appendChild(got);
    }

    host.appendChild(el('p', 'dg-note', t('dgTapNote')));
    /* One explanation, under the conversation, and only once she has
       actually tried to record — not eight apologies down the page. */
    var note = micNote();
    if (note) host.appendChild(note);
  }

  /* One turn. The German is the button, because hearing it is the point.
     Her language sits under it rather than beside it: eight lines of two
     languages side by side is a wall. */
  function lineRow(l, i, live){
    var row = el('div', 'dg-row dg-' + (l.w === 'b' ? 'b' : 'a') +
      (live ? ' is-live' : ''));

    row.appendChild(el('span', 'dg-who', l.w === 'b' ? 'B' : 'A'));

    var body = el('div', 'dg-body');
    var de = el('button', 'dg-line', l.de);
    de.type = 'button';
    de.addEventListener('click', function(){
      stopPlay();
      state.at = i;
      GH.speech.sayAs(l.de, who(l));
      mark(i);
    });
    body.appendChild(de);

    if (lang() !== 'de'){
      body.appendChild(el('p', 'dg-mine', l[lang()] || l.en));
    }

    /* Only where the browser can actually record. A mic that explains why
       it does not work, on all eight lines, is eight apologies. The
       explanation appears once, under the conversation, and only after she
       has tried — see micNote(). */
    if (GH.record && GH.record.can()) body.appendChild(recRow(l, i));

    row.appendChild(body);
    return row;
  }

  /* ---------- SAY IT YOURSELF, THEN COMPARE ----------

     Steven: "Record your voice against any line of dialogue and compare it
     to the spoken version."

     A mic beside every line. Tap it and it records; tap it again and it
     stops. From then on that line carries two playback buttons —
     `spHearTts` (Computer) and `spHearMe` (Me) — and she can press them
     back to back as many times as she likes. Re-recording replaces the
     take.

     NOTHING IS SCORED, and that is a decision rather than an omission.
     Automatic pronunciation scoring is confidently wrong often enough to
     teach the wrong thing, and the A/B comparison is the part that
     actually works: hear it, say it, hear both, try again.

     THE RECORDER IS SHARED, NOT COPIED. `GH.record` (js/record.js) is the
     same machinery Listen and Speak uses — Safari's mp4 against everyone
     else's webm, the secure-context gate, one permission for the whole
     screen, blob urls revoked before they are replaced. A second copy in
     here would have had to re-learn all four.

     THE TAKES DO NOT SURVIVE THE DIALOGUE. They are blob urls in memory,
     so leaving has to revoke them or every conversation she practises
     leaks eight recordings for the rest of the session. Nothing is written
     to disk: a recording of her voice is not something this app should
     keep without being asked. */
  function clearTakes(){
    var k;
    for (k in state.takes){
      if (state.takes.hasOwnProperty(k)) GH.record.free(state.takes[k]);
    }
    state.takes = {};
    state.recAt = -1;
    if (GH.record) GH.record.release();
  }

  /* Her own take, played through a plain Audio element rather than the
     speech engine — it is a recording, not synthesis. */
  var mine = null;

  function playMine(i){
    var url = state.takes[i];
    if (!url) return;
    GH.speech.stop();
    stopMine();
    mine = new Audio(url);
    mine.play()['catch'](function(){});
  }

  function stopMine(){
    if (!mine) return;
    try { mine.pause(); } catch (e){}
    mine = null;
  }

  function toggleRec(i){
    if (!GH.record) return;

    /* Already recording this line: stop and keep it. */
    if (state.recAt === i){
      GH.record.stop();
      return;
    }
    /* Recording a DIFFERENT line: stop that one first, then start here on
       its way out, so two recorders are never live at once. */
    if (GH.record.busy()){
      GH.record.stop();
      window.setTimeout(function(){ toggleRec(i); }, 60);
      return;
    }

    var no = GH.record.why();
    if (no){ state.micWhy = no; paintDialogue(); return; }

    GH.speech.stop();
    stopMine();
    stopPlay();
    state.micWhy = '';
    state.recAt = i;
    paintDialogue();

    GH.record.start(function(url){
      state.recAt = -1;
      if (url){
        /* Replacing a take revokes the old one; free() is a no-op on a
           line that has none. */
        GH.record.free(state.takes[i]);
        state.takes[i] = url;
      }
      paintDialogue();
    }, function(w){
      state.recAt = -1;
      state.micWhy = w;
      paintDialogue();
    });
  }

  /* Why it cannot record, in words, reusing Listen and Speak's own
     messages — they are already written and already translated. */
  function micNote(){
    if (!state.micWhy) return null;
    var key = state.micWhy === 'denied'   ? 'spMicDenied'
            : state.micWhy === 'insecure' ? 'spMicDenied'
            : state.micWhy === 'browser'  ? 'spNoMicBrowser'
            : 'spMicError';
    return el('p', 'dg-mic-note', t(key));
  }

  /* The mic, and — once there is a take — the two playback buttons. */
  function recRow(l, i){
    var wrap = el('div', 'dg-rec');

    var rec = el('button', 'dg-mic' + (state.recAt === i ? ' is-rec' : ''));
    rec.type = 'button';
    rec.setAttribute('aria-label', t(state.recAt === i ? 'spStop' : 'spRecord'));
    rec.setAttribute('aria-pressed', state.recAt === i ? 'true' : 'false');
    rec.textContent = state.recAt === i ? '\u25a0' : '\ud83c\udfa4';
    rec.addEventListener('click', function(){ toggleRec(i); });
    wrap.appendChild(rec);

    if (state.takes[i]){
      var orig = el('button', 'btn dg-cmp', t('spHearTts'));
      orig.type = 'button';
      orig.addEventListener('click', function(){
        stopMine();
        GH.speech.sayAs(l.de, who(l));
      });
      wrap.appendChild(orig);

      var me = el('button', 'btn dg-cmp', t('spHearMe'));
      me.type = 'button';
      me.addEventListener('click', function(){ playMine(i); });
      wrap.appendChild(me);
    }

    return wrap;
  }

  /* Repaints nothing: moves one class. A full repaint per line would
     rebuild eight buttons and lose the scroll position mid-playback. */
  function mark(i){
    var rows = host.querySelectorAll('.dg-row');
    var k;
    for (k = 0; k < rows.length; k++){
      if (k === i) rows[k].classList.add('is-live');
      else rows[k].classList.remove('is-live');
    }
  }

  function startPlay(d){
    state.playing = true;
    state.at = -1;
    var btn = host.querySelector('.dg-play');
    if (btn) btn.textContent = t('dgStop');
    step(d, 0);
  }

  /* Chained on onDone, not on a timer: a slow voice on a long line must
     not be talked over by the next speaker. */
  function step(d, i){
    if (!state.playing) return;
    var lines = d.lines || [];
    if (i >= lines.length){
      stopPlay();
      state.paid = finishedListening(d);
      paintDialogue();
      return;
    }
    state.at = i;
    mark(i);
    GH.speech.sayAs(lines[i].de, who(lines[i]), function(){
      if (!state.playing) return;
      window.setTimeout(function(){ step(d, i + 1); }, 320);
    });
  }

  function stopPlay(){
    state.playing = false;
    GH.speech.stop();
    var btn = host.querySelector('.dg-play');
    if (btn) btn.textContent = t('dgPlay');
  }

  /* ---------- practise ---------- */

  function paintPractise(d){
    /* Spent by listening. She has just heard the missing word read out,
       so the gap is not a gap. The dialogue itself stays open — only the
       exercise waits. */
    var left = restingFor(d.id);
    if (left){
      host.appendChild(el('p', 'dg-rest', t('dgRestN', { n:left })));
      var back = el('button', 'btn dg-again', t('dgListen'));
      back.type = 'button';
      back.addEventListener('click', function(){
        state.mode = 'listen'; paintDialogue();
      });
      host.appendChild(back);
      return;
    }

    var marks = blankedLines(d);
    if (state.qi >= marks.length){ paintDone(d); return; }

    var at = marks[state.qi];
    var line = d.lines[at];
    var answer = line.blank.de;

    if (!state.opts) state.opts = options(d, answer);

    /* Truncated at the blanked line. Everything after it is not merely
       hidden — it has not happened yet, and one of those later lines is
       sometimes where the answer is written. */
    var wrap = el('div', 'dg-talk');
    var i;
    for (i = 0; i < at; i++) wrap.appendChild(lineRow(d.lines[i], i, false));

    /* the line under test */
    var row = el('div', 'dg-row dg-' + (line.w === 'b' ? 'b' : 'a') + ' is-ask');
    row.appendChild(el('span', 'dg-who', line.w === 'b' ? 'B' : 'A'));
    var body = el('div', 'dg-body');

    var shown = state.picked === answer
      ? line.de
      : line.de.replace(answer, '\u2003' + '_'.repeat(Math.max(3, answer.length)) + '\u2003');
    var deb = el('button', 'dg-line', shown);
    deb.type = 'button';
    deb.addEventListener('click', function(){
      if (state.picked === answer) GH.speech.sayAs(line.de, who(line));
    });
    body.appendChild(deb);

    /* The translation is the support: it is what makes the gap
       answerable rather than a guess. */
    if (lang() !== 'de'){
      body.appendChild(el('p', 'dg-mine', line[lang()] || line.en));
    }
    row.appendChild(body);
    wrap.appendChild(row);
    host.appendChild(wrap);

    if (state.picked === answer){
      host.appendChild(el('p', 'dg-right', t('dgRight')));
      var next = el('button', 'btn btn-primary dg-next', t('dgNext'));
      next.type = 'button';
      next.addEventListener('click', function(){
        state.qi++; state.picked = null; state.opts = null;
        paintDialogue();
      });
      host.appendChild(next);
      GH.speech.sayAs(line.de, who(line));
      return;
    }

    var opts = el('div', 'dg-choices');
    state.opts.forEach(function(o){
      var b = el('button', 'dg-choice' +
        (state.picked === o ? ' is-wrong' : ''), o);
      b.type = 'button';
      b.addEventListener('click', function(){
        /* THE FIRST ATTEMPT AT A GAP IS THE ONE THAT COUNTS. Same rule as
           Word Lab: a gap got wrong and then right is a gap she did not
           know, and retries in between are her working it out. Without
           this the end screen would report a percentage of taps. */
        if (!state.tried[state.qi]){
          state.tried[state.qi] = true;
          if (o === answer) state.right++; else state.wrong++;
        }
        state.picked = o;
        paintDialogue();
      });
      opts.appendChild(b);
    });
    host.appendChild(opts);

    if (state.picked && state.picked !== answer){
      host.appendChild(el('p', 'dg-wrong', t('dgTryAgain')));
    }
  }

  /* ---------- respond: stage C ----------

     One turn is missing and four whole replies are offered. The wrong
     ones are correct language that does not answer what was just said, so
     the exercise is comprehension rather than spotting broken grammar.
     That is why they are written per dialogue and never drawn from
     elsewhere: a cafe reply inside a train conversation is eliminated on
     topic alone and measures nothing.

     Truncated at the missing line, so nothing after it is on screen. */
  function paintRespond(d){
    var items = d.c || [];
    if (state.qi >= items.length){ paintDone(d); return; }

    var item = items[state.qi];
    var at = item.at;
    var line = d.lines[at];
    var right = line[lang()] || line.en;
    var rightDe = line.de;

    if (!state.opts){
      var wrong = (item.wrong[lang()] || item.wrong.en || []).slice(0, 3);
      state.opts = GH.text.shuffle([right].concat(wrong));
    }

    host.appendChild(el('p', 'dg-step',
      t('dgStepN', { n:state.qi + 1, of:items.length })));

    var wrap = el('div', 'dg-talk');
    var i;
    for (i = 0; i < at; i++) wrap.appendChild(lineRow(d.lines[i], i, false));

    var gap = el('div', 'dg-row dg-' + (line.w === 'b' ? 'b' : 'a') + ' is-ask');
    gap.appendChild(el('span', 'dg-who', line.w === 'b' ? 'B' : 'A'));
    var gbody = el('div', 'dg-body');
    if (state.picked === right){
      var deb = el('button', 'dg-line', rightDe);
      deb.type = 'button';
      deb.addEventListener('click', function(){ GH.speech.sayAs(rightDe, who(line)); });
      gbody.appendChild(deb);
      if (lang() !== 'de') gbody.appendChild(el('p', 'dg-mine', right));
    } else {
      gbody.appendChild(el('p', 'dg-gap', '?'));
    }
    gap.appendChild(gbody);
    wrap.appendChild(gap);
    host.appendChild(wrap);

    if (state.picked === right){
      host.appendChild(el('p', 'dg-right', t('dgRight')));
      host.appendChild(nextButton(function(){
        state.qi++; state.picked = null; state.opts = null;
        paintDialogue();
      }));
      GH.speech.sayAs(rightDe, who(line));
      return;
    }

    /* The choices are in HER language, not German. Stage C is about
       following the conversation; making her read four unfamiliar German
       sentences to do it turns one exercise into two. */
    var opts = el('div', 'dg-choices dg-choices-long');
    state.opts.forEach(function(o){
      var b = el('button', 'dg-choice' + (state.picked === o ? ' is-wrong' : ''), o);
      b.type = 'button';
      b.addEventListener('click', function(){ state.picked = o; paintDialogue(); });
      opts.appendChild(b);
    });
    host.appendChild(opts);

    if (state.picked !== null && state.picked !== right){
      host.appendChild(el('p', 'dg-wrong', t('dgTryAgain')));
    }
  }

  /* ---------- quiz: stage D ----------

     Comprehension of the whole conversation, so the conversation stays on
     screen. These are not memory questions. The ones written after the
     "no answers that are simply visible" pass ask why, and what follows
     from it, and for those the text being there is the point.

     Two of the Reader's six kinds. `mc` stores the right answer FIRST and
     shuffles here, so the data stays readable and position never gives it
     away. */
  function paintQuiz(d){
    var bank = d.d || [];
    if (state.qi >= bank.length){ paintDone(d); return; }
    var q = bank[state.qi];

    host.appendChild(el('p', 'dg-step',
      t('dgStepN', { n:state.qi + 1, of:bank.length })));

    var wrap = el('div', 'dg-talk dg-talk-quiet');
    d.lines.forEach(function(l, i){ wrap.appendChild(lineRow(l, i, false)); });
    host.appendChild(wrap);

    host.appendChild(el('p', 'dg-q', q.q[lang()] || q.q.en));

    if (q.kind === 'tf'){
      var asked = state.picked !== null;
      var solved = asked && state.picked === q.a;
      var row = el('div', 'dg-choices');
      [[true, 'dgTrue'], [false, 'dgFalse']].forEach(function(pair){
        var cls = 'dg-choice';
        if (asked && state.picked === pair[0]) cls += solved ? ' is-right' : ' is-wrong';
        var b = el('button', cls, t(pair[1]));
        b.type = 'button';
        b.addEventListener('click', function(){
          if (solved) return;
          state.picked = pair[0];
          paintDialogue();
        });
        row.appendChild(b);
      });
      host.appendChild(row);
      if (solved){
        host.appendChild(el('p', 'dg-right', t('dgRight')));
        host.appendChild(nextButton(function(){
          state.qi++; state.picked = null; state.opts = null; paintDialogue();
        }));
      } else if (asked){
        host.appendChild(el('p', 'dg-wrong', t('dgTryAgain')));
      }
      return;
    }

    var list = q.opts[lang()] || q.opts.en;
    var answer = list[q.a || 0];
    if (!state.opts) state.opts = GH.text.shuffle(list.slice());

    var opts2 = el('div', 'dg-choices dg-choices-long');
    state.opts.forEach(function(o){
      var cls = 'dg-choice';
      if (state.picked === o) cls += (o === answer ? ' is-right' : ' is-wrong');
      var b = el('button', cls, o);
      b.type = 'button';
      b.addEventListener('click', function(){
        if (state.picked === answer) return;
        state.picked = o;
        paintDialogue();
      });
      opts2.appendChild(b);
    });
    host.appendChild(opts2);

    if (state.picked === answer){
      host.appendChild(el('p', 'dg-right', t('dgRight')));
      host.appendChild(nextButton(function(){
        state.qi++; state.picked = null; state.opts = null; paintDialogue();
      }));
    } else if (state.picked !== null){
      host.appendChild(el('p', 'dg-wrong', t('dgTryAgain')));
    }
  }

  function nextButton(fn){
    var b = el('button', 'btn btn-primary dg-next', t('dgNext'));
    b.type = 'button';
    b.addEventListener('click', fn);
    return b;
  }

  /* ---------- WHAT A PRACTICE RUN IS WORTH ----------

     Steven: "If dialogue has two places to answer it should be worth half
     of a exercise. If it has four, it should be worth a full exercise."

     So a gap is a QUARTER of one of the five daily exercises, and the
     dialogue is worth whatever it holds. Two gaps is half, four is one,
     six is one and a half. A conversation with more to answer is worth
     more, which is the only arrangement that does not reward picking the
     shortest one.

     Ten Kronen is a whole exercise, so a gap is two and a half — rounded,
     because the purse holds whole coins. Two gaps pay 5, four pay 10.

     `awardPart(game, coins, per)` counts ONE partial per call, so the run
     calls it once per gap with `per:4`. The coins ride on the first call
     and the rest carry zero, or a four-gap dialogue would pay four times
     over.

     It pays once and then rests, using the same store listening already
     uses — a dialogue that has just been practised is spent either way,
     and two rest timers on one conversation would be two ways to be
     confused. */
  var BLANKS_PER_TASK = 4;
  var TASK_COINS = 10;

  function payPractise(d, n){
    if (state.paid) return state.paid;
    if (!n || restingFor(d.id)) return null;
    if (!GH.coins || !GH.coins.awardPart) return null;
    var coins = Math.round(n * TASK_COINS / BLANKS_PER_TASK);
    var got = GH.coins.awardPart('dialogue', coins, BLANKS_PER_TASK), i;
    for (i = 1; i < n; i++) GH.coins.awardPart('dialogue', 0, BLANKS_PER_TASK);
    markListened(d.id);
    if (GH.purse) GH.purse.refresh();
    state.paid = { n:n, coins:coins, got:got };
    return state.paid;
  }

  function paintDone(d){
    var n = blankedLines(d).length;
    var paid = payPractise(d, n);
    var right = state.right, wrong = state.wrong;

    host.textContent = '';
    GH.endScreen.render(host, {
      tone: wrong === 0 ? 'perfect' : 'done',
      glyph: '\ud83d\udcac',
      title: t('dgDone'),
      /* The badge says what this one was worth; the note says why. Steven
         asked for the screen to EXPLAIN the rule, not just apply it. */
      badge: t('dgWorth', { n:n, of:BLANKS_PER_TASK }),
      note: t('dgCreditNote', { of:BLANKS_PER_TASK }),
      stats: [
        { n:right, label:t('fbRight'), kind:'good' },
        { n:wrong, label:t('fbWrong'), kind:'bad' }
      ],
      coins: paid ? paid.got : null,
      actions: [
        { label:t('dgListen'), kind:'primary', onClick:function(){
            state.mode = 'listen'; resetRun(); paintDialogue();
          } },
        { label:t('dgBackToList'), onClick:function(){
            state.id = null; resetRun(); paintIndex();
            if (GH.nav && GH.nav.top) GH.nav.top();
          } }
      ]
    });
  }

  function resetRun(){
    state.qi = 0; state.picked = null; state.opts = null;
    state.tried = {}; state.right = 0; state.wrong = 0; state.paid = null;
  }

  /* ---------- entry point ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, id:null, mode:'listen', at:-1,
              playing:false, qi:0, picked:null, opts:null, paid:null,
              tried:{}, right:0, wrong:0,
              /* line index -> blob url of her own voice, and which line is
                 recording right now. Per DIALOGUE, cleared when she opens
                 another one — see clearTakes(). */
              takes:{}, recAt:-1, micWhy:'' };
    GH.app.redraw = function(){
      /* The language switch must not restart the audio, and must not
         throw her back to the list from inside a conversation. */
      state.playing = false;
      GH.speech.stop();
      if (state.id) paintDialogue(); else paintIndex();
    };
    paintIndex();
  }

  var entry = {
    id:'dialogues',
    /* Read and listen. Nothing here is scored. */
    kind:'read',
    glyph:'\ud83d\udcac',
    name:{ ru:'Диалоги', de:'Dialoge', en:'Dialogues' },
    sub:{ ru:'Послушай разговор, потом заполни пропуск',
          de:'Ein Gespräch hören, dann die Lücke füllen',
          /* Steven's line for the new recording work. The Russian and
             German above still describe listen-then-fill only — accurate,
             just narrower — and are NOT blanked to force an English
             fallback, which would show Tanya English on her own hub. His
             DE/RU to match when he wants to. */
          en:'Record your voice against any line of dialogue and compare it to the spoken version' },
    /* What opens behind the + on the game guide. Steven's text.

       Written to be true only AFTER the recording work in this file: the
       earlier draft of this sentence described a feature that did not
       exist yet, which is the one thing a guide description must never
       do. It exists now — see the mic block above recRow(). */
    detail:{ en:'Listen to short conversations about everyday situations, then practice by completing missing words and phrases. Record your voice against any line of dialogue and compare it to the spoken version.',
             de:'Höre kurze Gespräche über Alltagssituationen und übe anschließend, indem du fehlende Wörter und Ausdrücke ergänzt. Nimm deine Stimme zu einer beliebigen Dialogzeile auf und vergleiche sie mit der gesprochenen Version.',
             ru:'Слушай короткие разговоры на повседневные темы, а затем тренируйся, заполняя пропущенные слова и фразы. Запиши свой голос для любой реплики и сравни его с озвученной версией.' },
    open:open
  };

  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register };
})();
