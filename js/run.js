/* The run: something going up, and something to lose.

   Every game was reporting a bare verdict — correct, not quite — and
   nothing else. A right answer produced a line of text that vanished, and
   there was no number climbing, nothing at stake, no sign the app had
   noticed. Seven of the eleven games had no streak at all, and the four
   that did had each grown their own slightly different one.

   This is that, once. A game creates a run, tells it about each answer,
   and asks it for two things to render: a header line with the streak and
   the percentage, and a short acknowledgement to show beside the question.

   Three deliberate choices.

   Counted once per item. A question got wrong and then right is one
   answer, not two, and the retries in between are her working it out. The
   older per-game versions double-counted, which meant the percentage could
   only ever fall.

   The streak is the motivating number, not the score. A total that only
   climbs says nothing about how the last few minutes went. A streak has
   tension because it can be lost, and it recovers within a round, so a bad
   patch is not the end of the session.

   And the acknowledgement changes with the streak. The same two words
   after every correct answer stops being information within about ninety
   seconds. At three it notices, at eight it says so, at fifteen it is
   impressed — and none of it fires often enough to become wallpaper. */

window.GH = window.GH || {};

GH.run = (function(){

  /* where the wording steps up */
  var NOTICE = 3;
  var GOOD   = 8;
  var GREAT  = 15;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function create(){
    var r = {
      answered: 0,
      right: 0,
      streak: 0,
      best: 0,
      counted: {},
      last: null        /* the most recent answer, for the acknowledgement */
    };

    /* `id` identifies the question, so a retry is not a second answer.
       Games without a stable id can pass the round index. */
    r.saw = function(id, ok){
      var key = String(id);
      if (r.counted[key]) return null;
      r.counted[key] = true;
      r.answered++;
      if (ok){
        r.right++;
        r.streak++;
        if (r.streak > r.best) r.best = r.streak;
      } else {
        r.streak = 0;
      }
      r.last = { ok:ok, streak:r.streak };
      return r.last;
    };

    r.pct = function(){
      return r.answered ? Math.round(r.right / r.answered * 100) : 0;
    };

    r.reset = function(){
      r.answered = 0; r.right = 0; r.streak = 0; r.best = 0;
      r.counted = {}; r.last = null;
    };

    return r;
  }

  /* The line that sits under the title: how she is doing, and the streak.
     Hidden entirely until she has answered something, because 0% before
     the first question is discouraging and untrue. */
  function header(r){
    var wrap = el('div', 'run-line');
    if (!r.answered) return wrap;

    var pct = r.pct();
    wrap.appendChild(el('span', 'run-pct' + (pct >= 80 ? ' is-good' : ''), pct + '%'));

    var st = el('span', 'run-streak' + (r.streak >= NOTICE ? ' is-hot' : ''));
    st.textContent = (r.streak >= NOTICE ? '\u25b8 ' : '') + '\u00d7' + Math.max(1, r.streak);
    wrap.appendChild(st);

    if (r.best >= NOTICE && r.best > r.streak){
      wrap.appendChild(el('span', 'run-best', t('runBest', { n:r.best })));
    }
    return wrap;
  }

  /* What to say about the answer she has just given. Returns null when
     there is nothing worth saying, which is most of the time — praise that
     arrives after every single answer is not praise. */
  function words(r){
    if (!r.last) return null;
    if (!r.last.ok) return { ok:false, text:t('notQuite') };

    var n = r.last.streak;
    if (n >= GREAT && n % 5 === 0) return { ok:true, text:t('runGreat', { n:n }), big:true };
    if (n === GREAT)               return { ok:true, text:t('runGreat', { n:n }), big:true };
    if (n === GOOD)                return { ok:true, text:t('runGood', { n:n }), big:true };
    if (n === NOTICE)              return { ok:true, text:t('runNotice', { n:n }) };
    return { ok:true, text:t('correct') };
  }

  /* The acknowledgement itself, ready to append. */
  function note(r){
    var w = words(r);
    if (!w) return null;
    var box = el('div', 'run-note' + (w.ok ? ' is-right' : ' is-wrong') + (w.big ? ' is-big' : ''));
    box.appendChild(el('span', 'run-note-mark', w.ok ? '\u2713' : '\u2717'));
    box.appendChild(el('span', 'run-note-text', w.text));
    if (w.ok && r.streak >= NOTICE && !w.big){
      box.appendChild(el('span', 'run-note-streak', '\u00d7' + r.streak));
    }
    return box;
  }

  /* For the end screen, so every game reports the same four numbers. */
  function stats(r){
    return [
      { n:r.right, label:t('fbRight'), kind:'good' },
      { n:r.answered - r.right, label:t('fbWrong'), kind:'bad' },
      { n:r.pct() + '%', label:t('gnStatRight'), kind: r.pct() >= 70 ? 'good' : 'bad' },
      { n:'\u00d7' + r.best, label:t('gnStatStreak'), kind:'good' }
    ];
  }

  return { create:create, header:header, note:note, words:words, stats:stats };
})();
