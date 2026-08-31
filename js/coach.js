/* The coach: someone noticing.

   A learner alone with a scoreboard gets one message from it, which is how
   badly she is doing. This is the other voice — the one that says the hard
   part is hard, that she has been at this for eleven days running, and
   that the four words she keeps dropping are these four and here is the
   page that explains them.

   Three things, in order of how often they happen.

   A greeting when she arrives, which is only ever a sentence and never
   asks for anything.

   Encouragement when a run of answers goes wrong. Not praise for being
   wrong — recognition that she is still going, which is the thing that
   actually predicts whether someone keeps learning. It says nothing about
   the answers.

   And help, when the run is long enough that pride is no longer the
   useful response. It names what is going wrong, shows the exact words she
   has been missing, and offers the grammar page for the rule underneath
   them. That is the whole intervention: three things she can act on.

   All of it is refusable. There is a button to stop the suggestions, and
   that button asks whether she means never or just not this week, because
   somebody irritated on a Tuesday should not lose a feature forever.

   Tone matters more than the mechanism here. She is an adult who is
   working hard at something difficult in a country she moved to. Nothing
   in here is allowed to sound like a sticker on a spelling test. */

window.GH = window.GH || {};

GH.coach = (function(){

  var KEY = 'gh-coach-v1';
  var DAY = 86400000;

  /* how many wrong answers in a row before each thing happens */
  var CHEER_AT = 3;
  var HELP_AT  = 6;
  var QUIET    = 8;      /* answers of peace after speaking, before again */

  var cache = null;
  /* Two counters, not one. The cheer at three sets a quiet period so it
     does not fire every other question — but if that same counter also
     gated the help at six, cheering would swallow the escalation and she
     would get sympathy where she needed the grammar page. */
  var run = { wrong:0, sinceCheer:99, sinceHelp:99, missed:[] };
  var box = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function read(){
    if (cache) return cache;
    try {
      var raw = window.localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : {};
    } catch (e){ cache = {}; }
    return cache;
  }

  function write(){
    try { window.localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e){}
  }

  function slot(){
    var d = read();
    var id = GH.player ? GH.player.id() : 'solo';
    if (!d[id]) d[id] = { last:0, days:0, streak:0, best:0, seen:0 };
    return d[id];
  }

  /* ---------- whether to speak at all ---------- */

  function muted(){
    var m = slot().mute;
    if (!m) return false;
    if (m === 'never') return true;
    return Date.now() < m;                     /* a timestamp: hidden until */
  }

  function mute(kind){
    var s = slot();
    s.mute = kind === 'never' ? 'never' : Date.now() + 3 * DAY;
    write();
  }

  function unmute(){
    delete slot().mute;
    write();
  }

  /* ---------- the greeting ---------- */

  /* Said once per visit, chosen by how long she has been away. Never a
     question, never a prompt to do anything — she has already opened the
     app, the decision is made.

     Uses her name when there is one. A greeting with a name in it is worth
     more than any of the wording around it, and an app that has been told
     a name and then does not use it feels like it was not listening.

     The language is a variable rather than the word German, so the same
     line works when this becomes the Spanish or Irish version. */
  /* Worked out once per page load and then held. The hub re-renders every
     time she comes back from a game or from settings, and recomputing
     would turn a single sitting into a string of arrivals — which is how
     'welcome back' became 'hello again' after a ten-second visit to the
     settings screen. */
  var saidThisVisit = null;

  function greeting(){
    if (saidThisVisit) return saidThisVisit;
    saidThisVisit = decide();
    return saidThisVisit;
  }

  /* The name can change mid-session. Telling the app your name and being
     answered with 'hello again' is the wrong reply — it is the first time
     it has been able to use it, so treat that as an arrival. */
  function regreet(fresh){
    saidThisVisit = null;
    if (fresh) justNamed = true;
  }
  var justNamed = false;

  function decide(){
    var s = slot();
    var now = Date.now();
    var gap = s.last ? now - s.last : -1;

    /* count the day, and the streak, before deciding what to say */
    var sameDay = gap >= 0 && new Date(s.last).toDateString() === new Date(now).toDateString();
    if (!sameDay){
      s.days++;
      s.streak = (gap >= 0 && gap < 2 * DAY) ? s.streak + 1 : 1;
      /* The longest run she has ever managed, kept separately.

         A ninety-day streak that resets on a missed day means one bout of
         flu at day eighty-nine destroys three months and the pet becomes
         unreachable. That does not reward commitment, it punishes being
         alive. So the record is banked: reaching ninety consecutive days
         once earns it, and getting ill afterwards cannot take it away.
         The requirement is unchanged — ninety days in a row — but it is a
         thing achieved rather than a thing to be maintained forever. */
      if (s.streak > (s.best || 0)) s.best = s.streak;
    }
    s.last = now;
    write();

    var who = (GH.player && GH.player.current().name || '').trim();
    var lang = GH.i18n.t('langName_' + (GH.player ? GH.player.target() : 'de'));
    var v = { name:who, lang:lang, n:s.streak };
    /* every greeting has a plain and a named form; there is no graceful way
       to leave a comma dangling where a name should be */
    var suffix = who ? 'Named' : '';

    if (justNamed && who){ justNamed = false; return { key:'coBackNamed', v:v }; }
    if (gap < 0)        return { key:'coFirst' + suffix,       v:v };
    if (sameDay)        return { key:'coAgain' + suffix,       v:v };
    if (s.streak >= 7)  return { key:'coStreak' + suffix,      v:v };
    if (s.streak >= 3)  return { key:'coStreakSmall' + suffix, v:v };
    if (gap > 10 * DAY) return { key:'coLongGap' + suffix,     v:v };
    if (gap > 3 * DAY)  return { key:'coGap' + suffix,         v:v };
    return { key:'coBack' + suffix, v:v };
  }

  /* ---------- watching a session ---------- */

  /* Every answer in the app arrives here. Tracks the run rather than the
     total: six wrong out of thirty is a normal session, six wrong in a row
     is someone stuck. */
  function saw(key, ok){
    run.sinceCheer++;
    run.sinceHelp++;
    if (ok){
      run.wrong = 0;
      return null;
    }
    run.wrong++;
    if (key && run.missed.indexOf(key) < 0) run.missed.push(key);
    if (muted()) return null;

    /* help first: a long run has moved past the point where being told to
       keep going is the useful thing */
    if (run.wrong >= HELP_AT && run.sinceHelp >= QUIET){
      run.sinceHelp = 0; run.sinceCheer = 0; run.wrong = 0;
      return { kind:'help' };
    }
    if (run.wrong === CHEER_AT && run.sinceCheer >= QUIET){
      run.sinceCheer = 0;
      return { kind:'cheer' };
    }
    return null;
  }

  function reset(){ run = { wrong:0, sinceCheer:99, sinceHelp:99, missed:[] }; }

  /* ---------- what she is struggling with ---------- */

  /* The missed keys point at a grammar page. Whichever area comes up most
     in the run is the one worth offering, because a session that goes
     wrong usually goes wrong about one thing. */
  var TO_TOPIC = {
    gender:'gender', 'case':'case', conj:'irregular', person:'irregular',
    word:'plural', sent:'order',
    /* the finer-grained keys the games now record */
    plural:'plural', order:'order', tense:'past', 'tense-bin':'past',
    verbkind:'shift'
  };
  var SKILL_TOPIC = {
    gender:'gender', 'case':'case', plural:'plural',
    wordorder:'order', conj:'irregular', conjugation:'irregular',
    tense:'past', cloze:'order', listening:null, recognition:null,
    sentences:'order', wrongform:'irregular'
  };

  function focusOf(){
    var count = {};
    run.missed.forEach(function(k){
      var bits = k.split(':');
      var topic;
      if (bits[0] === 'skill') topic = SKILL_TOPIC[bits[1]];
      else if (bits[0] === 'verbkind'){
        /* the class she is failing decides the page: an irregular verb and
           a vowel shift are explained in different places */
        topic = bits[1] === 'irregular' ? 'irregular'
              : bits[1] === 'regular' ? 'regular' : 'shift';
      }
      else topic = TO_TOPIC[bits[0]];
      if (topic) count[topic] = (count[topic] || 0) + 1;
    });
    var best = null, most = 0;
    Object.keys(count).forEach(function(k){
      if (count[k] > most){ most = count[k]; best = k; }
    });
    return best;
  }

  /* The actual words, so the offer is about her session and not a generic
     nudge. Only words, because a list of abstract keys helps nobody. */
  function missedWords(){
    var out = [];
    run.missed.forEach(function(k){
      var m = k.match(/^(?:word|gender):(\d+)$/);
      if (!m) return;
      var v = (window.GH_VOCAB || []).filter(function(x){ return String(x.n) === m[1]; })[0];
      if (v && out.indexOf(v) < 0) out.push(v);
    });
    return out;
  }

  /* ---------- the panel ---------- */

  function close(){
    if (box && box.parentNode) box.parentNode.removeChild(box);
    box = null;
  }

  function shell(){
    close();
    box = el('div', 'co-wrap');
    var panel = el('div', 'co-panel');
    box.appendChild(panel);
    document.body.appendChild(box);
    return panel;
  }

  /* just a sentence, and a way to make it go away */
  function cheer(){
    var p = shell();
    p.className += ' is-cheer';
    var lines = ['coCheer1','coCheer2','coCheer3','coCheer4','coCheer5'];
    p.appendChild(el('span', 'co-glyph', '\u2726'));
    p.appendChild(el('p', 'co-line', t(lines[Math.floor(Math.random() * lines.length)])));
    var ok = el('button', 'btn btn-primary', t('coGo'));
    ok.type = 'button';
    ok.addEventListener('click', close);
    p.appendChild(ok);
    setTimeout(function(){ if (box) close(); }, 6000);
  }

  /* the real intervention */
  function help(){
    var p = shell();
    var topic = focusOf();
    var words = missedWords();

    p.appendChild(el('span', 'co-glyph', '\ud83e\udded'));
    p.appendChild(el('h2', 'co-head', t('coHelpHead')));
    p.appendChild(el('p', 'co-line', t('coHelpLine')));

    if (words.length){
      p.appendChild(el('p', 'co-sub', t('coTheseWords', { n:words.length })));
      var grid = el('div', 'co-words');
      words.slice(0, 8).forEach(function(v){
        var b = el('button', 'co-word');
        b.type = 'button';
        if (GH.sprite) b.appendChild(GH.sprite.tile(GH.packs.imgOf(v), v.de));
        b.appendChild(el('span', 'co-word-de', v.de));
        var lang = GH.i18n.lang();
        if (lang !== 'de') b.appendChild(el('span', 'co-word-tr', v[lang] || v.en || ''));
        b.addEventListener('click', function(){ GH.speech.say(v.de); });
        grid.appendChild(b);
      });
      p.appendChild(grid);
    }

    var acts = el('div', 'co-acts');

    if (topic && GH.grammar){
      var go = el('button', 'btn btn-primary', t('coShowRule'));
      go.type = 'button';
      go.addEventListener('click', function(){
        close();
        var host = document.getElementById('view');
        if (!host) return;
        GH.speech.stop();
        host.textContent = '';
        GH.grammar.openTopic(host, topic, function(){
          host.textContent = '';
          GH.app.hub();
        });
      });
      acts.appendChild(go);
    }

    var later = el('button', 'btn btn-ghost', t('coNotNow'));
    later.type = 'button';
    later.addEventListener('click', close);
    acts.appendChild(later);
    p.appendChild(acts);

    var off = el('button', 'co-off', t('coStop'));
    off.type = 'button';
    off.addEventListener('click', askMute);
    p.appendChild(off);
  }

  /* Someone irritated on a Tuesday should not lose a feature for good, so
     the off switch asks which kind of off she means. */
  function askMute(){
    var p = shell();
    p.className += ' is-ask';
    p.appendChild(el('h2', 'co-head', t('coStopHead')));
    p.appendChild(el('p', 'co-line', t('coStopLine')));

    var acts = el('div', 'co-acts co-stack');
    var few = el('button', 'btn btn-primary', t('coStopDays'));
    few.type = 'button';
    few.addEventListener('click', function(){ mute('days'); close(); });
    var never = el('button', 'btn btn-ghost', t('coStopNever'));
    never.type = 'button';
    never.addEventListener('click', function(){ mute('never'); close(); });
    var cancel = el('button', 'btn btn-ghost', t('coStopCancel'));
    cancel.type = 'button';
    cancel.addEventListener('click', close);
    acts.appendChild(few); acts.appendChild(never); acts.appendChild(cancel);
    p.appendChild(acts);
  }

  /* called by the tutor on every graded answer */
  function heard(key, ok){
    var what = saw(key, ok);
    if (!what) return;
    if (what.kind === 'cheer') cheer();
    else help();
  }

  return {
    greeting: greeting,
    regreet: regreet,
    heard: heard,
    reset: reset,
    muted: muted,
    mute: mute,
    unmute: unmute,
    stats: function(){ var s = slot();
      return { days:s.days, streak:s.streak, best:s.best || s.streak }; }
  };
})();
