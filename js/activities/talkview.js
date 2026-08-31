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
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
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
        state.id = d.id; state.mode = 'listen'; state.paid = null;
        paintDialogue();
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
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
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
        state.qi = 0; state.picked = null; state.opts = null; state.paid = null;
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
    row.appendChild(body);
    return row;
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

  function paintDone(d){
    host.appendChild(el('p', 'dg-done', t('dgDone')));
    var again = el('button', 'btn dg-again', t('dgListen'));
    again.type = 'button';
    again.addEventListener('click', function(){
      state.mode = 'listen'; state.qi = 0; state.picked = null; state.opts = null;
      paintDialogue();
    });
    host.appendChild(again);
  }

  /* ---------- entry point ---------- */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, id:null, mode:'listen', at:-1,
              playing:false, qi:0, picked:null, opts:null, paid:null };
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
          en:'Listen to a conversation, then fill the gap' },
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
