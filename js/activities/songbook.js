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

  function stopAudio(){
    if (audio){ audio.pause(); audio = null; }
  }

  /* ---------- one line ---------- */

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
    row.addEventListener('click', function(){ GH.speech.say(L.de); });
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

    var grid = el('div', 'tiles');
    (window.GH_SONGS || []).forEach(function(song){
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
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function paintSong(){
    stopAudio();
    host.textContent = '';
    var song = state.song;

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stopAudio(); state.song = null; paintList(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, song.title.de));
    var lang = GH.i18n.lang();
    /* a song title, not a section label — the shared subtitle style is 0.8rem
       and meant for 'Section 1 · Sentences', which reads as small print here */
    if (lang !== 'de') titles.appendChild(el('p', 'sg-subtitle', song.title[lang]));
    head.appendChild(titles);
    host.appendChild(head);

    var card = el('div', 'card');

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
    a.addEventListener('error', function(){ wrap.style.display = 'none'; });
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
    card.appendChild(wrap);
    audio = a;

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
    open:GH.songs.open
  };
  function register(){ if (window.GH && GH.app && GH.app.register) GH.app.register(entry); }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();
})();
