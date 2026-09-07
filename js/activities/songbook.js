/* js/activities/songbook.js */
/* Lieder — the songs, with their words.

   Three views of the same lines, because they answer different questions.
   Singen follows the recording, chorus and all, so she can read along.
   Text shows each block once, which is how you learn the words rather than
   how you hear them. Zeilen strips the repetition down to the distinct
   lines, which for the body song is 37 instead of 76 — that is the real
   size of what she has to learn.

   The translation sits under the German rather than beside it, so her eye
   lands on the German first and the Russian is there when she needs it.
   Tapping a line speaks it.

   Timestamps are not here yet. When they arrive they attach to line ids,
   which is why the data is an inventory and not running text. */

window.GH = window.GH || {};

GH.songs = (function(){

  var VIEWS = ['sing', 'text', 'lines'];
  var VIEW_KEY = 'gh-song-view';

  var host = null, state = null, audio = null;
  /* The player, held outside the repainted DOM. `playerFor` is the song
     stem it belongs to, so arriving at a DIFFERENT song builds a new one
     rather than inheriting the last song's position. */
  var playerWrap = null;
  var playerFor = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function view(){
    try {
      var v = window.localStorage.getItem(VIEW_KEY);
      return VIEWS.indexOf(v) >= 0 ? v : 'text';
    } catch (e){ return 'text'; }
  }
  function setView(v){
    try { window.localStorage.setItem(VIEW_KEY, v); } catch (e){}
  }

  /* A real stop: leaving the song, or the section. Discards the held
     element so the next paintSong() builds a fresh one. */
  function stopAudio(){
    if (audio){ audio.pause(); audio = null; }
    playerWrap = null;
    playerFor = null;
  }

  /* ---------- one line ---------- */


  /* ==================================================================
     LISTENING TO EVERY LINE PAYS

     Steven: "If you click on and listen to every single line in German
     through the entire song, that should be worth one exercise."

     Tapping one line is a lookup. Tapping every line of a song is thirty
     to a hundred lines of German heard deliberately, one at a time, which
     is a session — so it pays like one and then rests for a week, the same
     shape the comics use.

     KEYED BY `audio`, NOT BY `n`. Eight of the eleven songs have no `n` at
     all, so a store keyed by song number would file eight songs under
     `undefined` and treat them as one. `audio` is the filename, unique
     across all eleven and present on every one of them.
     ================================================================== */
  var SUNG_KEY  = 'gh-song-lines';
  var SPAID_KEY = 'gh-song-paid';
  var TOLD_KEY  = 'gh-song-told';
  var SONG_COINS = 10;
  var SONG_REST_MS = 7 * 24 * 60 * 60 * 1000;

  function songSlot(){
    return (GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo');
  }
  function songKey(song){ return song && song.audio ? song.audio : '?'; }

  function jread(k){
    try { var r = window.localStorage.getItem(k); return r ? JSON.parse(r) : {}; }
    catch (e){ return {}; }
  }
  function jwrite(k, v){
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e){}
  }

  function heardLines(song){
    var d = jread(SUNG_KEY)[songSlot()] || {};
    return d[songKey(song)] || {};
  }

  function lineTotal(song){
    return song && song.lines ? Object.keys(song.lines).length : 0;
  }

  function heardCount(song){ return Object.keys(heardLines(song)).length; }

  function songResting(song){
    var at = (jread(SPAID_KEY)[songSlot()] || {})[songKey(song)] || 0;
    return !!at && (Date.now() - at) < SONG_REST_MS;
  }

  /* Marks one line and pays when the last one lands. Returns true only on
     the tap that completed the song, so the caller can react once. */
  function markLine(song, id){
    if (!song || !id) return false;
    var all = jread(SUNG_KEY), slot = songSlot(), k = songKey(song);
    if (!all[slot]) all[slot] = {};
    if (!all[slot][k]) all[slot][k] = {};
    if (all[slot][k][id]) return false;            /* already heard */
    all[slot][k][id] = 1;
    jwrite(SUNG_KEY, all);

    if (Object.keys(all[slot][k]).length < lineTotal(song)) return false;
    if (songResting(song)) return false;
    if (!GH.coins || !GH.coins.awardPart) return false;

    /* One whole exercise: one partial against a threshold of one. */
    GH.coins.awardPart('song', SONG_COINS, 1);
    var paid = jread(SPAID_KEY);
    if (!paid[slot]) paid[slot] = {};
    paid[slot][k] = Date.now();
    jwrite(SPAID_KEY, paid);
    /* Cleared so the next week has to be earned again rather than being
       already complete the moment the rest expires — the same trap the
       comic units had. */
    all[slot][k] = {};
    jwrite(SUNG_KEY, all);
    if (GH.purse) GH.purse.refresh();
    return true;
  }

  /* Said once per profile, the first time she taps any line in any song. */
  function toldYet(){
    var d = jread(TOLD_KEY);
    return !!d[songSlot()];
  }
  function markTold(){
    var d = jread(TOLD_KEY);
    d[songSlot()] = Date.now();
    jwrite(TOLD_KEY, d);
  }


  /* ==================================================================
     TEN LINES, FILLED IN

     Steven: "have the song randomly pick 10 lines... make sure they're 10
     different lines with different dialogue so if a line gets repeated, it
     can't be used twice and prefer lines that are more than four words
     long."

     All three rules earn their place against the real songs:

       DEDUPE BY TEXT, not by line id. A chorus is several ids carrying the
       same words — one song is 101 lines and 92 distinct, another 63 and
       52 — and drawing the same line twice would look like a bug and test
       nothing the second time.

       FOUR WORDS IS THE FLOOR because a three-word line with one word
       removed is not a sentence to complete, it is a guess between the two
       words left. Every song has at least thirteen lines that clear it, so
       the preference never has to be broken; the fallback below exists for
       a song added later that cannot fill ten.

       RANDOM, so the second run through a song is not the first one again.

     The exercise itself is `fill-blank`, unchanged. It already takes
     `{de, ru, en}` and finds its own blanks and distractors, which is
     exactly the shape a song line already has. */
  var FILL_LINES = 10;
  var FILL_MIN_WORDS = 4;

  function normLine(x){
    return String(x || '').toLowerCase()
      .replace(/[^a-zäöüß ]/g, '').replace(/\s+/g, ' ').trim();
  }

  function fillCandidates(song){
    var seen = {}, longEnough = [], shorter = [];
    Object.keys(song.lines || {}).forEach(function(id){
      var L = song.lines[id];
      if (!L || !L.de) return;
      var k = normLine(L.de);
      if (!k || seen[k]) return;
      seen[k] = 1;
      var row = { de:L.de, ru:L.ru, en:L.en, blanks:null };
      /* AND IT HAS TO HAVE A TRANSLATION. fill-blank prints her language
         under the German, so an untranslated line shows a bare sentence
         and quietly becomes a harder question than the ones around it.

         Seven lines in the whole library fail this, all of them in `Das
         Lied zweier Herzen`, whose chorus is five lines in German and four
         in Russian — a documented mismatch in this file, not a gap to fill
         in. 414 of the 420 long lines are complete, so excluding them
         costs nothing. */
      var whole = !!(L.ru && L.en);
      if (whole && L.de.trim().split(/\s+/).length > FILL_MIN_WORDS) longEnough.push(row);
      else shorter.push(row);
    });
    return { long:longEnough, short:shorter };
  }

  function pickFillLines(song){
    var c = fillCandidates(song);
    var out = GH.text.shuffle(c.long.slice()).slice(0, FILL_LINES);
    /* Only if a song cannot field ten long ones. Never happens with the
       eleven songs here; it is here so adding a short song degrades to a
       shorter exercise rather than an empty one. */
    if (out.length < FILL_LINES){
      out = out.concat(GH.text.shuffle(c.short.slice())
                        .slice(0, FILL_LINES - out.length));
    }
    return out;
  }

  function openFill(song){
    var lines = pickFillLines(song);
    if (!lines.length) return;
    GH.speech.stop();
    stopAudio();
    host.textContent = '';
    GH.fillBlank.mount(host, {
      title: song.title.de,
      subtitle: t('sgFillSub'),
      sentences: lines,
      onExit: function(){
        host.textContent = '';
        paintSong();
        if (GH.nav && GH.nav.top) GH.nav.top();
      }
    });
  }

  function lineRow(song, id, n){
    var L = song.lines[id];
    if (!L) return el('p', 'sg-line', '?');
    var row = el('button', 'sg-line');
    row.type = 'button';
    if (n) row.appendChild(el('span', 'sg-num', n));
    var body = el('span', 'sg-line-body');
    body.appendChild(el('span', 'sg-de', L.de));
    var lang = GH.i18n.lang();
    if (lang !== 'de' && L[lang]) body.appendChild(el('span', 'sg-tr', L[lang]));
    row.appendChild(body);
    row.addEventListener('click', function(){
      GH.speech.say(L.de);
      var first = !toldYet();
      var done = markLine(song, id);
      if (first) markTold();
      /* Repaint only when something changed on screen — the counter, the
         tip, or a payment. A repaint on every tap would rebuild a hundred
         rows to speak one line. */
      if (first || done) paintSong();
    });
    return row;
  }

  /* ---------- when the languages break differently ----------

     A translated song is not a song with subtitles. Verse for verse the
     lines usually correspond, and the row above puts the translation
     under the German because that is honest there. But `Das Lied zweier
     Herzen` has a chorus that is five lines in German and four in Russian
     and English — the German splits one thought across two lines for the
     melody — and there is no arrangement of five against four that does
     not either invent a line or join two.

     Joining them was the obvious fix and it is wrong. The break is the
     poem. Editing where a line ends to make a table line up is editing
     the song, and the same argument would let you shorten a soliloquy to
     its plot.

     So a section marked `par` gets two columns instead: German on the
     left, her language on the right, each keeping its own count and its
     own line breaks, with nothing implying the third line of one is the
     third line of the other.

     In German there is no second column, because the left one is already
     the German. A mismatched section then looks like any other, which is
     correct — read in German there is nothing mismatched to see. */

  function parallelBlock(song, sec){
    var lang = GH.i18n.lang();
    var block = el('div', 'sg-block sg-par');
    var h = el('h3', 'sg-block-head', sec.label);
    block.appendChild(h);

    if (lang === 'de'){
      /* nothing to sit beside it */
      (sec.de || []).forEach(function(id){ block.appendChild(lineRow(song, id)); });
      return block;
    }

    h.appendChild(el('span', 'sg-par-note', t('sgParNote')));

    var cols = el('div', 'sg-cols');
    [['de', sec.de], [lang, sec[lang] || sec.en]].forEach(function(pair){
      var col = el('div', 'sg-col');
      col.appendChild(el('span', 'sg-col-h', t('langName_' + pair[0])));
      (pair[1] || []).forEach(function(id){
        var L = song.lines[id];
        if (!L) return;
        var txt = L[pair[0]] || L.de || '';
        var row = el('button', 'sg-par-line');
        row.type = 'button';
        row.textContent = txt;
        /* only the German is worth hearing; the other column is the
           meaning, and a speech engine set to de-DE reading Russian is
           noise */
        if (pair[0] === 'de'){
          row.addEventListener('click', function(){ GH.speech.say(txt); });
        } else {
          row.disabled = true;
        }
        col.appendChild(row);
      });
      cols.appendChild(col);
    });
    block.appendChild(cols);
    return block;
  }

  /* ---------- the three views ---------- */

  function paintSing(song, into){
    song.play.forEach(function(sid, i){
      var sec = song.secs.filter(function(s){ return s.id === sid; })[0];
      if (!sec) return;
      if (sec.par){ into.appendChild(parallelBlock(song, sec)); return; }
      var block = el('div', 'sg-block');
      block.appendChild(el('h3', 'sg-block-head', sec.label));
      sec.lines.forEach(function(id){ block.appendChild(lineRow(song, id)); });
      into.appendChild(block);
    });
  }

  /* Text follows the running order but writes each block out only once. A
     block that comes round again is a link back to where it was printed —
     so the shape of the song is visible without four copies of the chorus
     between the verses, which is what makes it readable as words to learn
     rather than as a transcript. */
  function paintText(song, into){
    var printed = {};
    song.play.forEach(function(sid, i){
      var sec = song.secs.filter(function(s){ return s.id === sid; })[0];
      if (!sec) return;

      if (printed[sid]){
        var jump = el('button', 'sg-recur');
        jump.type = 'button';
        jump.appendChild(el('span', 'sg-recur-arrow', '↑'));
        jump.appendChild(el('span', 'sg-recur-label', sec.label));
        jump.appendChild(el('span', 'sg-recur-hint', t('sgAgain')));
        jump.addEventListener('click', function(){
          var target = into.querySelector('[data-sec="' + sid + '"]');
          if (target && target.scrollIntoView){
            target.scrollIntoView({ behavior:'smooth', block:'start' });
          }
        });
        into.appendChild(jump);
        return;
      }

      printed[sid] = true;
      if (sec.par){
        var pb = parallelBlock(song, sec);
        pb.setAttribute('data-sec', sid);
        into.appendChild(pb);
        return;
      }
      var block = el('div', 'sg-block');
      block.setAttribute('data-sec', sid);
      var h = el('h3', 'sg-block-head', sec.label);
      var times = song.play.filter(function(x){ return x === sid; }).length;
      if (times > 1) h.appendChild(el('span', 'sg-times', t('sgTimesN', { n:times })));
      block.appendChild(h);
      sec.lines.forEach(function(id){ block.appendChild(lineRow(song, id)); });
      into.appendChild(block);
    });
  }

  function paintLines(song, into){
    /* Every distinct line once. A line that exists in one language only —
       half of a chorus that breaks differently — is shown in that
       language rather than as an empty German row. */
    var ids = Object.keys(song.lines);
    var block = el('div', 'sg-block');
    block.appendChild(el('p', 'sg-note', t('sgLinesNote', { n:ids.length })));
    ids.forEach(function(id, i){
      var L = song.lines[id];
      if (L && L.only){
        var row = el('button', 'sg-line sg-line-one');
        row.type = 'button';
        row.appendChild(el('span', 'sg-num', i + 1));
        var body = el('span', 'sg-line-body');
        body.appendChild(el('span', 'sg-de', L[L.only]));
        body.appendChild(el('span', 'sg-tr', t('langName_' + L.only)));
        row.appendChild(body);
        if (L.only === 'de'){
          row.addEventListener('click', function(){ GH.speech.say(L.de); });
        } else { row.disabled = true; }
        block.appendChild(row);
        return;
      }
      block.appendChild(lineRow(song, id, i + 1));
    });
    into.appendChild(block);
  }

  /* ---------- screens ---------- */

  function paintList(){
    host.textContent = '';
    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stopAudio(); state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('sgTitle')));
    titles.appendChild(el('p', null, t('sgSub')));
    head.appendChild(titles);
    host.appendChild(head);

    /* ---------- PAIRED SONGS SIT TOGETHER ----------

       Two songs can be two halves of one thing: the same evening from his
       side and from hers, each complete on its own and each meaning more
       beside the other. Listing them as two tiles among nine hides that
       entirely, and putting them next to each other only suggests it.

       A song declares its partner with `pair:'<id>'`, and both halves carry
       the same id. Nothing else is needed — no ordering here, no list of
       pairs to maintain, and a song with no `pair` behaves exactly as
       before.

       `voice:'f'` or `'m'` is optional and only labels the half. Where it
       is absent the tile is simply unlabelled.

       ONE HALF ALONE IS NOT A PAIR. While only her version exists it
       renders as an ordinary tile, so a half-finished pair never shows a
       box with a gap in it. */
    var all = (window.GH_SONGS || []).slice();

    function tileFor(song){
      var b = el('button', 'tile');
      b.type = 'button';
      b.appendChild(el('span', 'tile-glyph', '🎵'));
      b.appendChild(el('span', 'tile-name', song.title.de));
      var lang = GH.i18n.lang();
      if (lang !== 'de') b.appendChild(el('span', 'tile-sub', song.title[lang]));
      /* A section whose languages break differently has no shared line
         list — it has one per language — so it is counted in the German,
         which is the song being learned. Reading `.lines` on it returns
         undefined and threw, taking the whole list down with it and not
         just the one tile. */
      var distinct = Object.keys(song.lines).length;
      var sung = song.play.reduce(function(a, sid){
        var s = song.secs.filter(function(x){ return x.id === sid; })[0];
        if (!s) return a;
        return a + (s.par ? (s.de || []).length : (s.lines || []).length);
      }, 0);
      b.appendChild(el('span', 'tile-foot', t('sgLineCount', { d:distinct, s:sung })));
      b.addEventListener('click', function(){ state.song = song; paintSong(); });
      return b;
    }

    /* Which pair ids have BOTH halves present. */
    var count = {};
    all.forEach(function(x){ if (x.pair) count[x.pair] = (count[x.pair] || 0) + 1; });

    var grid = el('div', 'tiles');
    host.appendChild(grid);

    var done = {};
    all.forEach(function(song){
      var id = song.pair;
      if (!id || count[id] < 2){
        grid.appendChild(tileFor(song));
        return;
      }
      if (done[id]) return;
      done[id] = true;

      /* The shaded box. It goes OUTSIDE the tile grid, because a box inside
         a CSS grid becomes one grid cell and the two tiles in it would be
         squeezed into the width of one. */
      var half = all.filter(function(x){ return x.pair === id; });
      var box = el('div', 'sg-pair');
      var lbl = el('p', 'sg-pair-l', t('sgPairHead'));
      box.appendChild(lbl);
      var inner = el('div', 'sg-pair-two');
      half.forEach(function(x){
        var wrap = el('div', 'sg-pair-half');
        if (x.voice) wrap.appendChild(el('span', 'sg-pair-voice', t(x.voice === 'm' ? 'sgVoiceM' : 'sgVoiceF')));
        wrap.appendChild(tileFor(x));
        inner.appendChild(wrap);
      });
      box.appendChild(inner);
      host.appendChild(box);

      /* A fresh grid after the box, so any songs listed later do not jump
         above it. */
      grid = el('div', 'tiles');
      host.appendChild(grid);
    });
  }

  /* ---------- the player, which OUTLIVES a repaint ----------

     paintSong() clears the page and rebuilds it, and it used to build a
     fresh <audio> every time. So switching РУС / DEU / ENG, or switching
     the lyric view, silently killed the track she was listening to —
     because the language switch calls GH.app.redraw, which calls
     paintSong().

     Now the element is held in `playerWrap` and put back into the newly
     built page. Re-attaching a detached media element is safe here
     SPECIFICALLY because it happens in the same synchronous block as the
     detach: the spec pauses a media element removed from a document, but
     only after awaiting a stable state, and only if it is still not in a
     document by then. By then this one is back in.

     Everything below runs only when there is no player for this song, so
     the event handlers are attached once rather than once per repaint. */
  function playerBlock(song, wasPlaying){
    if (playerWrap && playerFor === song.audio){
      /* A belt-and-braces resume, in case an engine does pause it. She
         gets the track continuing rather than silence and a language
         button to blame. */
      if (wasPlaying && audio && audio.paused){
        var again = audio.play();
        if (again && again.catch) again.catch(function(){});
      }
      return playerWrap;
    }

    /* the player. The file may not be there yet, so the whole block hides
       itself rather than showing a broken control. */
    var wrap = el('div', 'sg-player');
    var a = document.createElement('audio');
    a.controls = true;
    a.preload = 'none';
    a.className = 'sg-audio';
    var ogg = document.createElement('source');
    ogg.src = GH.build ? GH.build.url('audio/' + song.audio + '.ogg')
                       : 'audio/' + song.audio + '.ogg';
    ogg.type = 'audio/ogg; codecs=vorbis';
    a.appendChild(ogg);
    /* Safari plays Vorbis — tested on the Mac and the iPhone — so the ogg
       above is enough. The m4a source stays as a fallback for anything
       that does not, and costs nothing when it is absent. */
    var m4a = document.createElement('source');
    m4a.src = GH.build ? GH.build.url('audio/' + song.audio + '.m4a')
                       : 'audio/' + song.audio + '.m4a';
    m4a.type = 'audio/mp4';
    a.appendChild(m4a);
    a.addEventListener('error', function(){
      wrap.style.display = 'none';
      /* Not just hidden — released. A media element left attached in an
         error state, even hidden, can go on holding the page's shared
         audio session. On iOS that session is also what speechSynthesis
         runs through, and an <audio> stuck in error has been seen to leave
         the WHOLE PAGE'S text-to-speech silent — every dialogue, every
         sentence, every tapped word — until she leaves the app entirely.
         removeAttribute + load() is the standard way to make the browser
         let go of an element's media resource; clearing the cache too
         means the next paintSong() for this song builds a genuinely fresh
         <audio> instead of handing back the one that broke. */
      while (a.firstChild) a.removeChild(a.firstChild);
      a.removeAttribute('src');
      a.load();
      if (playerFor === song.audio){
        playerWrap = null;
        playerFor = null;
        audio = null;
      }
    });
    /* WHICH song, and whether she actually played it.

       The log had an open and a leave for this screen and nothing else, so
       nine songs looked like one activity. `play` fires once per press of
       the button rather than once per screen — a song played twice is two
       plays, and that is the number worth having. */
    a.addEventListener('play', function(){
      if (GH.events && GH.events.mark) GH.events.mark('play', 'song:' + song.audio);
    });
    /* How far in she got, as a percentage. A song abandoned at 20% and one
       heard to the end are the same 'play' otherwise, and the difference is
       the whole point. Recorded on pause and on end, not on a timer. */
    function progress(){
      if (!GH.events || !GH.events.mark) return;
      if (!a.duration || !isFinite(a.duration)) return;
      GH.events.mark('heard', 'song:' + song.audio,
        Math.round((a.currentTime / a.duration) * 100));
    }
    a.addEventListener('pause', progress);
    a.addEventListener('ended', progress);
    wrap.appendChild(a);
    audio = a;
    playerWrap = wrap;
    playerFor = song.audio;
    return wrap;
  }

  function paintSong(){
    var song = state.song;
    /* ONLY stop when this is a DIFFERENT song. Stopping unconditionally is
       what made a language switch kill the music, because paintSong() is
       what the switch and the view toggle both call. */
    if (playerFor && playerFor !== song.audio) stopAudio();
    var wasPlaying = !!(audio && !audio.paused && !audio.ended);

    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stopAudio(); state.song = null; paintList(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, song.title.de));
    /* Marked so the block below can be inserted after the header without
       hunting for it again. */
    var lang = GH.i18n.lang();
    /* a song title, not a section label — the shared subtitle style is 0.8rem
       and meant for 'Section 1 · Sentences', which reads as small print here */
    if (lang !== 'de') titles.appendChild(el('p', 'sg-subtitle', song.title[lang]));
    head.appendChild(titles);
    host.appendChild(head);

    /* ---------- what listening through is worth ----------

       The counter first, because a number that moves is what makes tapping
       every line feel like a thing rather than a habit. The explanation
       only on her very first tap in any song, and never again — a tip that
       reappears is a nag. */
    /* ---------- ONE ROW, NOT A BAND ACROSS THE SCREEN ----------

       The counter and the quiz share a line. The first version gave the
       quiz its own full-width button ABOVE the card, which put it 66px
       higher than the play button and made it the widest thing on screen —
       so opening a song to listen to it offered homework first. A song
       page's primary action is the song.

       Side by side it is still the second thing she reads and one tap
       away, and the player keeps the top of the card. */
    var totalLines = lineTotal(song);
    var row = el('div', 'sg-credit-row');
    if (totalLines){
      if (songResting(song)){
        row.appendChild(el('p', 'sg-credit is-rest', t('sgRested')));
      } else {
        row.appendChild(el('p', 'sg-credit',
          t('sgHeardN', { n:heardCount(song), of:totalLines })));
      }
    }
    if (GH.fillBlank && GH.fillBlank.mount && GH.text && GH.text.shuffle){
      var fb = el('button', 'btn btn-quiet sg-fill', t('sgFill', { n:FILL_LINES }));
      fb.type = 'button';
      fb.addEventListener('click', function(){ openFill(song); });
      row.appendChild(fb);
    }
    if (row.children.length) host.appendChild(row);

    if (!toldYet()){
      host.appendChild(el('p', 'sg-tip', t('sgCreditTip')));
    }

    var card = el('div', 'card');

    card.appendChild(playerBlock(song, wasPlaying));

    var tools = el('div', 'card-tools');
    var toggle = el('div', 'mode-toggle');
    [['sing', 'sgViewSing'], ['text', 'sgViewText'], ['lines', 'sgViewLines']]
      .forEach(function(pair){
        var b = el('button', null, t(pair[1]));
        b.type = 'button';
        b.setAttribute('aria-pressed', view() === pair[0] ? 'true' : 'false');
        b.addEventListener('click', function(){ setView(pair[0]); paintSong(); });
        toggle.appendChild(b);
      });
    tools.appendChild(toggle);

    /* Wortschatz. Only for a song that has a list — a button leading to an
       empty page is worse than no button, and four of the eight songs have
       no words written yet. */
    if (GH.songWords && GH.songWords.has(song)){
      var wb = el('button', 'btn btn-ghost sg-words', t('swOpen'));
      wb.type = 'button';
      wb.addEventListener('click', function(){
        stopAudio();
        GH.speech.stop();
        /* Comes back to THIS song, not the list. */
        GH.songWords.open(host, song, function(){
          GH.app.redraw = function(){ if (state.song) paintSong(); else paintList(); };
          paintSong();
        });
      });
      tools.appendChild(wb);
    }

    card.appendChild(tools);

    var body = el('div', 'sg-body');
    var v = view();
    if (v === 'sing') paintSing(song, body);
    else if (v === 'lines') paintLines(song, body);
    else paintText(song, body);
    card.appendChild(body);

    host.appendChild(card);
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, song:null };
    /* Switching РУС / DEU / ENG has to redraw the screen she is on, not
       throw her back to the hub — and not back to the song list either.
       The whole reason to change language mid-song is to read the other
       translation of the line in front of her. */
    GH.app.redraw = function(){ if (state.song) paintSong(); else paintList(); };
    paintList();
  }

  return { open:open };
})();

(function(){
  var entry = {
    id:'songs',
    /* Read and listen, not Games: nothing here is marked. */
    kind:'read',
    glyph:'🎵',
    name:{ ru:'Песни', de:'Lieder', en:'Songs' },
    sub:{ ru:'Слова песен на трёх языках',
          de:'Die Liedtexte in drei Sprachen',
          en:'The lyrics in three languages' },
    /* What opens behind the + on the game guide. Steven's text.

       NO `detailHead`: Word Lab's says "How Word Lab works" because that
       card needed a title for a description of a nine-stage lesson. This
       card is already headed "Songs" and a second heading saying the same
       word would be furniture.

       DELIBERATELY SAYS NOTHING ABOUT GERMAN. Steven: "Songs is supposed
       to be a reusable activity, so the description shouldn't know what
       language is being learned." So it is "in your language" and not "in
       Russian", the same way `sub` above says three languages without
       naming them. When there is a second target language this line needs
       no edit. */
    detail:{ en:'Listen to songs while following the lyrics in several different views, with line-by-line translation in your language. Explore vocabulary from each song and tap any lyric line to hear it spoken clearly, helping you connect the words you read with what you hear.',
             de:'Höre Lieder und folge dem Liedtext in verschiedenen Ansichten mit einer zeilenweisen Übersetzung in deine Sprache. Entdecke den Wortschatz jedes Liedes und tippe auf eine beliebige Zeile, um sie deutlich gesprochen zu hören und so das Gelesene besser mit dem Gehörten zu verbinden.',
             ru:'Слушай песни и следи за текстом в нескольких вариантах отображения с построчным переводом на твой язык. Изучай лексику каждой песни и нажимай на любую строку, чтобы услышать её в обычной речи и лучше связать написанные слова с их звучанием.' },
    open:GH.songs.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
