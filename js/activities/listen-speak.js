/* LISTEN AND SPEAK — the pronunciation lab.

   Everything else in the app asks her to recognise German. This is the only
   place she has to PRODUCE it, and the only way to know whether what she
   produces sounds like what she heard is to hear both, back to back.

   So one line at a time:

     1. the line at normal speed
     2. the same line slowly, which is where the consonants are
     3. normal again, so the target is the last thing in her ear
     4. she records herself
     5. she plays the two against each other, in whatever order helps

   ------------------------------------------------------------------
   IT NEEDS HTTPS AND THERE IS NO WAY AROUND THAT

   `getUserMedia` is gated to secure contexts — https or localhost. Served
   from http://192.168.x.x the browser refuses the microphone outright, with
   no prompt and no flag to override it, on iOS especially. So this screen
   works on the deployed site and cannot work on the LAN.

   That is not treated as an error. `mic()` fails, `state.denied` is set, and
   the screen says plainly that recording needs the real site — because a
   dead Record button with no explanation is worse than no button.

   ------------------------------------------------------------------
   WHERE THE LINES COME FROM

   Everything the app already has in German, at one line each:

     poems      GH_POEMS       181 lines
     stories    GH_MEDIUM      252
                GH_SHORT       125
     songs      GH_SONGS       463 distinct lines
     sentences  GH_VOCAB       the two examples on every bank word

   She picks which. A line is only used if it is long enough to be worth
   saying and short enough to hold in her head — see LEN.

   ------------------------------------------------------------------
   CHUNKS

   A twelve-word line is not one pronunciation problem, it is four. So a
   line can be split at two or three words, and each chunk is practised on
   its own. Split on word count rather than punctuation because the point is
   mouth-sized pieces, not grammatical ones.

   ------------------------------------------------------------------
   WHAT COUNTS

   Steven's rule: the same work as a short story. So SIX items, and an item
   only counts when she has heard it, recorded it AND played the comparison
   at least once — because recording without listening back is not practice,
   it is just talking. */

window.GH = window.GH || {};

GH.listenSpeak = (function(){

  var host = null;
  var state = null;

  /* Six items is a round. Same as a short story, which is what Steven asked
     the price to be. */
  var NEED = 6;

  /* HOW LONG A LINE SHE WANTS.

     The pool already had 1,399 lines of 12 to 35 characters — four or five
     words, "Mein Ticket ist weg" — sitting mixed in with twelve-word ones.
     Nothing needed writing; the short material was there and there was no
     way to ask for it. A whole sentence is a lot to hold in the mouth on a
     first go, and starting on the hard end is how someone stops.

     Measured in characters, not words, because four long compounds are
     harder to say than eight short words.

     `min` stays 12 throughout: below that it is a fragment with no rhythm
     to copy. */
  var LENS = [
    { id:'short',  key:'spLenShort',  min:12, max:35 },
    { id:'medium', key:'spLenMedium', min:12, max:55 },
    { id:'any',    key:'spLenAny',    min:12, max:90 }
  ];

  function lenNow(){
    var f = LENS.filter(function(x){ return x.id === state.len; })[0];
    return f || LENS[0];
  }

  /* THE SLOW PASS IS ADJUSTABLE, BECAUSE THE RIGHT VALUE IS AN EAR
     JUDGEMENT AND NOT MINE TO MAKE.

     Below about 0.5 the engine stops speaking German and starts reciting
     syllables; at 0.8 the difference from normal is barely audible. So three
     usable settings rather than a slider, and whichever she picks is
     remembered — this is a preference, not a per-round choice.

     The GAP between the three passes is adjustable for the same reason: on a
     real device the utterances either run together or feel draggy, and which
     one depends on the voice. */
  var SLOWS = [
    { id:'slower', key:'spSlower', rate:0.52 },
    { id:'slow',   key:'spSlow',   rate:0.62 },
    { id:'easy',   key:'spEasy',   rate:0.72 }
  ];
  var GAPS = [
    { id:'tight', key:'spTight', ms:140 },
    { id:'even',  key:'spEven',  ms:260 },
    { id:'wide',  key:'spWide',  ms:450 }
  ];
  var PREF = 'gh-speak-v1';

  function prefs(){
    var d = { slow:'slow', gap:'even', len:'short', split:0 };
    try {
      var raw = window.localStorage.getItem(PREF);
      var o = raw ? JSON.parse(raw) : null;
      if (o){
        if (SLOWS.some(function(x){ return x.id === o.slow; })) d.slow = o.slow;
        if (GAPS.some(function(x){ return x.id === o.gap; }))  d.gap  = o.gap;
        if (LENS.some(function(x){ return x.id === o.len; }))  d.len  = o.len;
        if (o.split === 0 || o.split === 2 || o.split === 3) d.split = o.split;
      }
    } catch (e){}
    return d;
  }

  function savePrefs(){
    try {
      window.localStorage.setItem(PREF,
        JSON.stringify({ slow:state.slow, gap:state.gap, len:state.len,
                         split:state.split }));
    } catch (e){}
  }

  function slowRate(){
    var f = SLOWS.filter(function(x){ return x.id === state.slow; })[0];
    return f ? f.rate : 0.62;
  }
  function gapMs(){
    var f = GAPS.filter(function(x){ return x.id === state.gap; })[0];
    return f ? f.ms : 260;
  }

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- the lines ---------- */

  function clean(s){
    return String(s || '')
      .replace(/[„“”"»«]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function usable(s){
    var c = clean(s);
    var L = lenNow();
    if (c.length < L.min || c.length > L.max) return null;
    /* A line that is only a sound effect teaches nothing about speaking. */
    if (!/[a-zäöüßA-ZÄÖÜ]{3}/.test(c)) return null;
    return c;
  }

  /* WHAT THE LINE MEANS.

     The harvest used to keep only the German and the source, and threw the
     other two languages away — so the screen showed a sentence and the
     title of the story it came from, and NOTHING about what it meant. She
     was practising the pronunciation of something she might not understand,
     which is backwards for this site: every other screen puts meaning
     first.

     Every source has all three languages already. It cost nothing to keep
     the right one. */
  /* Which label the source line gets. Set by the harvest, because only the
     harvest knows whether it read a poem, a story, a song or a bank word. */
  function srcLabel(it){
    if (it.kind === 'poem')     return 'spFromPoem';
    if (it.kind === 'song')     return 'spFromSong';
    if (it.kind === 'sentence') return 'spFromWord';
    return 'spFromStory';
  }

  function meaning(o){
    if (!o) return '';
    var l = GH.i18n.lang();
    if (l === 'de') return '';           /* reading the app in German: the line IS the meaning */
    if (l === 'ru') return o.ru || o.en || '';
    return o.en || '';
  }

  /* Each source returns [{ de, tr, from }]. `from` is shown under the line
     so she knows what she is saying a line out of; `tr` is what it means. */
  function fromPoems(){
    var out = [];
    (window.GH_POEMS || []).forEach(function(p){
      (p.sentences || []).forEach(function(s){
        var c = usable(s.de);
        if (c) out.push({ de:c, tr:meaning(s), kind:'poem', from:GH.i18n.pick(p.title) });
      });
    });
    return out;
  }

  function fromStories(){
    var out = [];
    [].concat(window.GH_MEDIUM || [], window.GH_SHORT || []).forEach(function(p){
      (p.sentences || []).forEach(function(s){
        var c = usable(s.de);
        if (c) out.push({ de:c, tr:meaning(s), kind:'story', from:GH.i18n.pick(p.title) });
      });
    });
    return out;
  }

  function fromSongs(){
    var out = [], seen = {};
    (window.GH_SONGS || []).forEach(function(s){
      /* ONLY THE LINES THE SONG ACTUALLY SHOWS.

         `s.lines` is an inventory, not a lyric. `das-lied-zweier-herzen`
         holds Russian verses tagged `only:'ru'` which belong to NO section,
         so no view in the songbook ever renders them — and this was
         scraping them anyway, then reporting twelve lines with no English
         as if that were a data fault. It was my harvest reading rows the
         song does not use.

         So walk the SECTIONS, which is what the songbook does. */
      var used = {};
      (s.secs || []).forEach(function(sec){
        (sec.lines || []).forEach(function(id){ used[id] = 1; });
      });
      Object.keys(used).forEach(function(id){
        if (!s.lines[id]) return;
        if (s.lines[id].only) return;      /* a line for one language only */
        var c = usable(s.lines[id].de);
        /* A chorus line appears once in the data but three times in the
           song; it should appear once here. */
        if (c && !seen[c]){ seen[c] = 1;
          out.push({ de:c, tr:meaning(s.lines[id]), kind:'song',
                     from:GH.i18n.pick(s.title) }); }
      });
    });
    return out;
  }

  function fromSentences(){
    var out = [];
    (window.GH_VOCAB || []).forEach(function(v){
      /* `s`, not `ex` or `sent`. Checked against the file rather than
         guessed — the wrong field name here yields silently zero lines and
         the source just looks empty. */
      (v.s || []).forEach(function(s){
        var c = usable(s && s.de);
        if (c) out.push({ de:c, tr:meaning(s), kind:'sentence', from:v.de });
      });
    });
    return out;
  }

  var SOURCES = [
    { id:'poems',     key:'spSrcPoems',     get:fromPoems },
    { id:'stories',   key:'spSrcStories',   get:fromStories },
    { id:'songs',     key:'spSrcSongs',     get:fromSongs },
    { id:'sentences', key:'spSrcSentences', get:fromSentences }
  ];

  function poolFor(ids){
    var out = [];
    SOURCES.forEach(function(s){
      if (ids.indexOf(s.id) < 0) return;
      out = out.concat(s.get());
    });
    return out;
  }

  /* ---------- chunks ----------

     Two or three words at a time. The last chunk absorbs any remainder
     rather than being left as a single dangling word, because one word on
     its own has no rhythm to copy. */
  function chunk(line, size){
    var w = line.split(' ');
    if (w.length <= size) return [line];
    var out = [], i;
    for (i = 0; i < w.length; i += size) out.push(w.slice(i, i + size).join(' '));
    if (out.length > 1 && out[out.length - 1].split(' ').length === 1){
      out[out.length - 2] += ' ' + out.pop();
    }
    return out;
  }

  /* ---------- the microphone ----------

     Asked for once, on the first Record, and held for the round. Asking per
     line would mean a permission prompt every line on some browsers. */
  function mimeType(){
    if (!window.MediaRecorder) return '';
    /* Safari records mp4, everything else webm. Asked rather than assumed,
       because a wrong mime silently produces a zero-byte blob. */
    var want = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'];
    var i;
    for (i = 0; i < want.length; i++){
      try { if (MediaRecorder.isTypeSupported(want[i])) return want[i]; } catch (e){}
    }
    return '';
  }

  /* WHY it cannot record, not just whether — because the two causes need
     different actions and the old message could not tell them apart.

       'insecure'  the page is not a secure context. `getUserMedia` is
                   simply absent, so this is indistinguishable from an old
                   browser unless `isSecureContext` is asked directly.
                   Served from http://192.168.x.x it is false; from
                   http://localhost it is TRUE, which is the confusion worth
                   naming — secure context is decided by the URL in the
                   address bar, not by where the server runs.
       'browser'   secure, but the browser has no MediaRecorder.
       ''          fine. */
  function whyNot(){
    var secure = (typeof window.isSecureContext === 'boolean')
      ? window.isSecureContext
      : (location.protocol === 'https:' ||
         location.hostname === 'localhost' || location.hostname === '127.0.0.1');
    if (!secure) return 'insecure';
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return 'browser';
    if (!window.MediaRecorder) return 'browser';
    return '';
  }

  function canRecord(){ return !whyNot(); }

  function mic(then, fail){
    if (state.stream){ then(state.stream); return; }
    if (!canRecord()){ fail('unsupported'); return; }
    navigator.mediaDevices.getUserMedia({ audio:true }).then(function(st){
      state.stream = st;
      then(st);
    })['catch'](function(e){
      /* NotAllowedError covers both a refused prompt and an insecure origin,
         which the browser reports identically. So the message names both. */
      fail((e && e.name) === 'NotAllowedError' ? 'denied' : 'error');
    });
  }

  function dropMic(){
    if (!state || !state.stream) return;
    try {
      state.stream.getTracks().forEach(function(tr){ tr.stop(); });
    } catch (e){}
    state.stream = null;
  }

  /* ---------- recording ---------- */

  function startRec(){
    var it = current();
    if (!it) return;
    mic(function(st){
      var type = mimeType();
      var rec;
      try { rec = type ? new MediaRecorder(st, { mimeType:type }) : new MediaRecorder(st); }
      catch (e){ state.micState = 'error'; paint(); return; }
      var bits = [];
      rec.addEventListener('dataavailable', function(e){
        if (e.data && e.data.size) bits.push(e.data);
      });
      rec.addEventListener('stop', function(){
        var blob = new Blob(bits, { type: type || 'audio/webm' });
        /* The old url is revoked before the new one replaces it; a round of
           twelve re-recordings otherwise leaks twelve blobs. */
        if (it.url){ try { URL.revokeObjectURL(it.url); } catch (e){} }
        it.url = blob.size ? URL.createObjectURL(blob) : null;
        it.heardBack = false;
        state.rec = null;
        state.recording = false;
        paint();
      });
      state.rec = rec;
      state.recording = true;
      state.micState = 'ok';
      rec.start();
      paint();
      /* A hard stop, so a forgotten recording cannot run for ten minutes. */
      state.recTimer = window.setTimeout(stopRec, 15000);
    }, function(why){
      state.micState = why;
      paint();
    });
  }

  function stopRec(){
    if (state.recTimer){ window.clearTimeout(state.recTimer); state.recTimer = null; }
    if (state.rec && state.rec.state !== 'inactive'){
      try { state.rec.stop(); } catch (e){}
    }
  }

  /* ---------- playing ----------

     One <audio> element for the whole round, reused. A fresh element per
     playback leaves a pile of them holding blob urls open. */
  function player(){
    if (!state.audio){
      state.audio = document.createElement('audio');
      state.audio.preload = 'auto';
    }
    return state.audio;
  }

  function stopAll(){
    if (GH.speech) GH.speech.stop();
    if (state.audio){ try { state.audio.pause(); } catch (e){} }
    if (state.chain){ window.clearTimeout(state.chain); state.chain = null; }
    state.playing = '';
  }

  function playMine(then){
    var it = current();
    if (!it || !it.url){ if (then) then(); return; }
    var a = player();
    a.src = it.url;
    it.heardBack = true;
    state.playing = 'me';
    a.onended = function(){ state.playing = ''; paint(); if (then) then(); };
    var p = a.play();
    if (p && p['catch']) p['catch'](function(){ state.playing = ''; if (then) then(); });
    paint();
  }

  function playTts(rate, then){
    var text = target();
    if (!text){ if (then) then(); return; }
    state.playing = 'tts';
    paint();
    var done = function(){ state.playing = ''; paint(); if (then) then(); };
    if (rate && GH.speech.sayRate) GH.speech.sayRate(text, rate, done);
    else GH.speech.say(text, done);
  }

  /* The three-pass hearing: normal, slow, normal. */
  function hearThree(){
    stopAll();
    var it = current();
    if (it) it.heard = true;
    var g = gapMs();
    playTts(null, function(){
      state.chain = window.setTimeout(function(){
        playTts(slowRate(), function(){
          state.chain = window.setTimeout(function(){
            playTts(null, function(){ paint(); });
          }, g);
        });
      }, g);
    });
  }

  /* A sequence of 'me' and 'tts', played in order with a gap between. Used
     for every comparison mode, so the modes are data rather than code. */
  function sequence(list, i){
    i = i || 0;
    if (i >= list.length){ state.playing = ''; paint(); return; }
    var next = function(){
      state.chain = window.setTimeout(function(){ sequence(list, i + 1); }, gapMs() + 60);
    };
    if (list[i] === 'me') playMine(next);
    else playTts(null, next);
  }

  var MODES = [
    { id:'me',    key:'spHearMe',   seq:['me'] },
    { id:'tts',   key:'spHearTts',  seq:['tts'] },
    { id:'mt',    key:'spMeThen',   seq:['me','tts'] },
    { id:'tm',    key:'spTtsThen',  seq:['tts','me'] },
    { id:'cycle', key:'spCycle',    seq:['tts','me','tts','me','tts','me'] }
  ];

  /* ---------- the round ---------- */

  function current(){ return state.items[state.i] || null; }

  function target(){
    var it = current();
    if (!it) return '';
    return state.split > 1 ? (it.chunks[it.ci] || it.de) : it.de;
  }

  /* Practised means heard, recorded and played back. Recording without
     listening back is not practice. */
  function practised(){
    return state.items.filter(function(x){
      return x.heard && x.url && x.heardBack;
    }).length;
  }

  function build(ids, split){
    var pool = poolFor(ids);
    pool = GH.text.shuffle(pool).slice(0, NEED);
    return pool.map(function(x){
      return { de:x.de, tr:x.tr, kind:x.kind, from:x.from,
               chunks:chunk(x.de, split), ci:0,
               heard:false, url:null, heardBack:false };
    });
  }

  /* ---------- screens ---------- */

  function head(sub){
    var h = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){
      stopAll(); stopRec(); dropMic();
      if (state.phase === 'lab'){ state.phase = 'pick'; paint(); return; }
      state.onExit();
    });
    h.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('spTitle')));
    titles.appendChild(el('p', null, sub || t('spSub')));
    h.appendChild(titles);
    return h;
  }

  function paintPick(){
    host.textContent = '';
    host.appendChild(head());

    var card = el('div', 'card');

    card.appendChild(el('h2', 'sp-h', t('spFrom')));
    var srcs = el('div', 'sp-opts');
    SOURCES.forEach(function(s){
      var n = s.get().length;
      var b = el('button', 'sp-opt' + (state.src.indexOf(s.id) >= 0 ? ' is-on' : ''));
      b.type = 'button';
      b.disabled = !n;
      b.appendChild(el('span', 'sp-opt-n', t(s.key)));
      b.appendChild(el('span', 'sp-opt-s', t('spLinesN', { n:n })));
      b.addEventListener('click', function(){
        var at = state.src.indexOf(s.id);
        if (at >= 0){ if (state.src.length > 1) state.src.splice(at, 1); }
        else state.src.push(s.id);
        paint();
      });
      srcs.appendChild(b);
    });
    card.appendChild(srcs);

    card.appendChild(el('h2', 'sp-h', t('spHowLong')));
    var ln = el('div', 'sp-opts');
    LENS.forEach(function(o){
      /* The count is live, so she can see that "short" is not a tiny corner
         of the material. */
      var was = state.len; state.len = o.id;
      var n = poolFor(state.src).length;
      state.len = was;
      var b = el('button', 'sp-opt' + (state.len === o.id ? ' is-on' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'sp-opt-n', t(o.key)));
      b.appendChild(el('span', 'sp-opt-s', t('spLinesN', { n:n })));
      b.addEventListener('click', function(){ state.len = o.id; savePrefs(); paint(); });
      ln.appendChild(b);
    });
    card.appendChild(ln);

    card.appendChild(el('h2', 'sp-h', t('spHowMuch')));
    var sp = el('div', 'sp-opts');
    [[0, 'spWhole'], [2, 'spTwo'], [3, 'spThree']].forEach(function(o){
      var b = el('button', 'sp-opt' + (state.split === o[0] ? ' is-on' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'sp-opt-n', t(o[1])));
      b.addEventListener('click', function(){ state.split = o[0]; paint(); });
      sp.appendChild(b);
    });
    card.appendChild(sp);

    card.appendChild(el('h2', 'sp-h', t('spSlowSpeed')));
    var sl = el('div', 'sp-opts');
    SLOWS.forEach(function(o){
      var b = el('button', 'sp-opt' + (state.slow === o.id ? ' is-on' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'sp-opt-n', t(o.key)));
      b.addEventListener('click', function(){
        state.slow = o.id; savePrefs(); paint();
        /* Heard immediately, on a real line, because a speed setting she
           cannot hear is a setting she cannot choose. */
        if (GH.speech && GH.speech.sayRate) GH.speech.sayRate(t('spTaste'), o.rate);
      });
      sl.appendChild(b);
    });
    card.appendChild(sl);

    card.appendChild(el('h2', 'sp-h', t('spGap')));
    var gp = el('div', 'sp-opts');
    GAPS.forEach(function(o){
      var b = el('button', 'sp-opt' + (state.gap === o.id ? ' is-on' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'sp-opt-n', t(o.key)));
      b.addEventListener('click', function(){ state.gap = o.id; savePrefs(); paint(); });
      gp.appendChild(b);
    });
    card.appendChild(gp);

    /* Said here rather than discovered at the first Record, and it names
       which of the two problems it is. */
    var why = whyNot();
    if (why){
      card.appendChild(el('p', 'sp-warn',
        t(why === 'insecure' ? 'spNoMicHttps' : 'spNoMicBrowser')));
    }

    card.appendChild(el('p', 'sp-note', t('spCountsN', { n:NEED })));

    var foot = el('div', 'card-foot');
    foot.appendChild(el('span', 'spacer'));
    var go = el('button', 'btn btn-primary js-advance', t('start'));
    go.type = 'button';
    go.disabled = !state.src.length;
    go.addEventListener('click', function(){
      state.items = build(state.src, state.split || 1);
      if (!state.items.length) return;
      state.i = 0;
      state.phase = 'lab';
      paint();
      hearThree();
    });
    foot.appendChild(go);
    card.appendChild(foot);

    host.appendChild(card);
    if (GH.nav) GH.nav.ready();
  }

  function paintLab(){
    host.textContent = '';
    var it = current();
    if (!it){ finish(); return; }

    host.appendChild(head(t('spProgress', { i:state.i + 1, n:state.items.length })));

    var card = el('div', 'card');

    var prog = el('div', 'progress');
    var track = el('span', 'progress-track');
    var fill = el('span', 'progress-fill');
    fill.style.width = Math.round((practised() / NEED) * 100) + '%';
    track.appendChild(fill);
    prog.appendChild(track);
    prog.appendChild(el('span', null, t('spDoneN', { n:practised(), of:NEED })));
    card.appendChild(prog);

    /* The line, and the chunk of it she is on. */
    var box = el('div', 'sp-line');
    if (state.split > 1){
      it.chunks.forEach(function(c, i){
        var sp = el('span', 'sp-chunk' + (i === it.ci ? ' is-now' : ''), c);
        box.appendChild(sp);
      });
    } else {
      box.appendChild(el('span', 'sp-chunk is-now', it.de));
    }
    card.appendChild(box);

    /* WHAT IT MEANS, under the line.

       Always visible rather than behind a reveal: this is a pronunciation
       screen, not a comprehension test — hiding the meaning would make her
       guess at a sentence while trying to say it, and there is nothing to
       protect here the way there is in the Reader.

       The WHOLE line's meaning, even when she is practising a two-word
       piece of it, because "und die Autos" does not mean anything on its
       own and translating a fragment would teach her that it does. */
    /* LABELLED, both of them. Two unlabelled lines under a German sentence
       are two guesses — "The Red Traffic Light" read as a translation of
       "Die Ampel wird grün", which is what it looked like. A title and a
       meaning are different kinds of fact and each says which it is. */
    if (it.tr){
      var mean = el('p', 'sp-mean');
      mean.appendChild(el('span', 'sp-lab', t('spMeans')));
      mean.appendChild(el('span', 'sp-mean-t', it.tr));
      card.appendChild(mean);
    }
    if (it.from){
      var src = el('p', 'sp-from');
      /* Which KIND of thing it came from, not just its name — a song line
         and a story line are said differently and she should know which she
         is looking at. */
      src.appendChild(el('span', 'sp-lab', t(srcLabel(it))));
      src.appendChild(el('span', null, it.from));
      card.appendChild(src);
    }

    /* ---------- BREAK IT UP, HERE, NOW ----------

       The setup screen already asks whole-or-pieces, but she finds out a
       line is too much to say AFTER she is looking at it — and going back to
       setup would abandon the round. So the same choice again, on the line
       in front of her, live.

       Per item, not per round: a short line can stay whole while the next
       long one gets cut into twos. `ci` resets because the piece she was on
       does not exist at a different size. */
    var cut = el('div', 'sp-cuts');
    cut.appendChild(el('span', 'sp-cuts-l', t('spCutTo')));
    [[0, 'spWhole'], [2, 'spTwo'], [3, 'spThree']].forEach(function(o){
      var b = el('button', 'sp-cut' + ((state.split || 0) === o[0] ? ' is-on' : ''), t(o[1]));
      b.type = 'button';
      b.addEventListener('click', function(){
        stopAll();
        state.split = o[0];
        /* Re-cut every item, so the rest of the round follows too — she
           asked for shorter pieces, not shorter this once. */
        state.items.forEach(function(x){
          x.chunks = chunk(x.de, state.split || 1);
          x.ci = 0;
        });
        savePrefs();
        paint();
        hearThree();
      });
      cut.appendChild(b);
    });
    card.appendChild(cut);

    /* Hear it: normal, slow, normal. */
    var hear = el('button', 'btn btn-primary sp-hear',
                  state.playing === 'tts' ? t('spPlaying') : t('spHearThree'));
    hear.type = 'button';
    hear.addEventListener('click', hearThree);
    card.appendChild(hear);

    /* Record. */
    var rec = el('button', 'btn sp-rec' + (state.recording ? ' is-rec' : ''),
                 state.recording ? t('spStop') : (it.url ? t('spAgain') : t('spRecord')));
    rec.type = 'button';
    rec.disabled = !canRecord();
    rec.addEventListener('click', function(){
      if (state.recording){ stopRec(); return; }
      stopAll();
      startRec();
    });
    card.appendChild(rec);

    var why2 = whyNot();
    if (why2){
      card.appendChild(el('p', 'sp-warn',
        t(why2 === 'insecure' ? 'spNoMicHttps' : 'spNoMicBrowser')));
    } else if (state.micState && state.micState !== 'ok'){
      card.appendChild(el('p', 'sp-warn',
        t(state.micState === 'denied' ? 'spMicDenied' : 'spMicError')));
    }

    /* Compare. Only once there is something of hers to compare. */
    if (it.url){
      card.appendChild(el('h2', 'sp-h', t('spCompare')));
      var row = el('div', 'sp-modes');
      MODES.forEach(function(m){
        var b = el('button', 'sp-mode', t(m.key));
        b.type = 'button';
        b.addEventListener('click', function(){ stopAll(); sequence(m.seq); });
        row.appendChild(b);
      });
      card.appendChild(row);
      if (state.playing) card.appendChild(el('p', 'sp-note', t('spNowPlaying')));
    }

    var foot = el('div', 'card-foot');

    /* Chunks move within the line before the line moves on. */
    if (state.split > 1 && it.ci < it.chunks.length - 1){
      var nc = el('button', 'btn', t('spNextChunk'));
      nc.type = 'button';
      nc.addEventListener('click', function(){
        stopAll(); it.ci++; paint(); hearThree();
      });
      foot.appendChild(nc);
    }
    foot.appendChild(el('span', 'spacer'));

    var last = state.i === state.items.length - 1;
    var nx = el('button', 'btn btn-primary', last ? t('finish') : t('next'));
    nx.type = 'button';
    nx.addEventListener('click', function(){
      stopAll();
      if (last){ finish(); return; }
      state.i++;
      paint();
      hearThree();
    });
    foot.appendChild(nx);
    card.appendChild(foot);

    host.appendChild(card);
    if (GH.nav) GH.nav.ready();
  }

  function finish(){
    stopAll(); stopRec(); dropMic();
    state.phase = 'done';

    var did = practised();
    /* The same price as a short story, and only when the work matches. */
    var full = did >= NEED;
    var paid = (full && GH.coins)
      ? GH.coins.award('listen-speak', { answered:did, right:did, wrong:0 }, { units:1 })
      : null;

    host.textContent = '';
    GH.endScreen.render(host, {
      coins: paid,
      tone: full ? 'perfect' : 'done',
      title: full ? t('spDoneTitle') : t('spShortTitle'),
      lines: [
        { n:did, label:t('spPractised'), kind: full ? 'good' : 'bad' }
      ],
      note: full ? '' : t('spShortNote', { n:NEED }),
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            state.phase = 'pick'; state.micState = ''; paint(); } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function paint(){
    if (state.phase === 'pick') return paintPick();
    if (state.phase === 'lab') return paintLab();
    if (state.phase === 'done') return;
    paintPick();
  }

  function open(container, onExit){
    host = container;
    var pr = prefs();
    state = { onExit:onExit, phase:'pick', src:['stories'], split:pr.split,
              slow:pr.slow, gap:pr.gap, len:pr.len,
              items:[], i:0, stream:null, rec:null, recording:false,
              recTimer:null, audio:null, chain:null, playing:'', micState:'' };
    GH.app.redraw = paint;
    paint();
  }

  /* Leaving for any reason lets go of the microphone. A held stream leaves
     the recording indicator on, which reads as the app listening to her when
     it is not. */
  function close(){
    stopAll(); stopRec(); dropMic();
    /* and the blobs */
    if (state && state.items){
      state.items.forEach(function(x){
        if (x.url){ try { URL.revokeObjectURL(x.url); } catch (e){} x.url = null; }
      });
    }
  }

  return { open:open, close:close };
})();

(function(){
  var entry = {
    id:'listen-speak',
    /* Listen and read, not Games: it is practice, not a test. */
    kind:'read',
    glyph:'\ud83c\udfa4',
    name:{ ru:'Слушай и говори', de:'Hören und sprechen', en:'Listen and Speak' },
    sub:{ ru:'Произношение: услышь, запиши себя, сравни',
          de:'Aussprache: hören, sich aufnehmen, vergleichen',
          en:'Pronunciation: hear it, record yourself, compare' },
    open:function(view, back){
      GH.listenSpeak.open(view, function(){ GH.listenSpeak.close(); back(); });
    }
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
