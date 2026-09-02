/* The Jukebox.

   Nine songs, in whatever order she wants, played one after another.

   ------------------------------------------------------------------
   THIS IS THE ONE THING THAT WORKS WITH THE SCREEN OFF

   Every other listening idea in the app runs on speechSynthesis, and iOS
   gives that no audio session: lock the phone and it stops mid-word. The
   songs are real files, so an <audio> element carries them, and an
   <audio> element keeps playing when the screen sleeps. On a walk, on a
   bus, in a pocket.

   ONE ELEMENT, REUSED FOR THE WHOLE QUEUE. Never a second one. The audio
   session belongs to the element that started playing after her tap; a
   fresh element created mid-queue would ask for a new session and not get
   one with the screen locked, and the music would simply stop at the end
   of track one. So `src` is swapped on the same element and the session
   survives.

   ------------------------------------------------------------------
   MEDIASESSION IS THE POINT, NOT A GARNISH

   With the screen off there is nothing to tap. MediaSession puts the title
   and the skip buttons on the lock screen and wires her headphone controls,
   so she can move through the queue without taking the phone out. Without
   it, screen-off playback is a thing she can start and not steer.

   Guarded on `'mediaSession' in navigator`, so a browser without it plays
   the queue and simply has no lock-screen controls.

   ------------------------------------------------------------------
   WHAT IT IS NOT

   Not the songbook. That screen is one song with its lyrics and its
   vocabulary, and it is for reading. This is for listening, and the two
   share nothing but the file names — which come from data/songs.js in both
   cases, so a renamed track breaks neither.

   Nothing here is graded and nothing is paid. It stays out of the five
   exercises for the same reason the listening loop does: this is exposure,
   not practice. It does log a play per track, the way songbook.js already
   does, so which songs she actually listens to is answerable. */

window.GH = window.GH || {};

GH.jukebox = (function(){

  var host = null;
  var state = null;

  /* THE ONE ELEMENT. Created on the first play and kept for the life of
     the page, because that is what keeps the audio session alive across a
     track change with the screen locked. */
  var audio = null;

  var QUEUE_KEY = 'gh-jukebox-v1';

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function slot(){
    return (GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo');
  }

  function songs(){
    return (window.GH_SONGS || []).filter(function(s){ return !!s.audio; });
  }

  function byStem(stem){
    var S = songs(), i;
    for (i = 0; i < S.length; i++) if (S[i].audio === stem) return S[i];
    return null;
  }

  function titleOf(s){ return s ? GH.i18n.pick(s.title) : ''; }

  /* ---------- the queue, remembered ---------- */

  /* Stored as audio stems rather than indexes. songs.js is a positional
     array and an id there is a position — inserting a song would silently
     repoint a saved queue at the wrong tracks. */
  function readAll(){
    try {
      var raw = window.localStorage.getItem(QUEUE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  function saveQueue(){
    try {
      var d = readAll();
      d[slot()] = { q:state.queue.slice(), loop:state.loop };
      window.localStorage.setItem(QUEUE_KEY, JSON.stringify(d));
    } catch (e){}
  }

  function loadQueue(){
    var d = readAll()[slot()] || {};
    var q = (d.q || []).filter(byStem);         /* drop anything renamed away */
    return { queue:q, loop:!!d.loop };
  }

  /* ---------- playing ---------- */

  function ensureAudio(){
    if (audio) return audio;
    audio = document.createElement('audio');
    audio.preload = 'none';
    /* Not `controls`: the transport is the queue's own, and two sets of
       buttons on one screen is a question about which one is real. */
    audio.addEventListener('ended', function(){ advance(1, true); });
    audio.addEventListener('play', function(){
      var s = nowPlaying();
      if (s && GH.events && GH.events.mark) GH.events.mark('play', 'song:' + s.audio);
      paint();
    });
    audio.addEventListener('pause', paint);
    /* A missing file must not stall the queue in silence. Skip it and say
       so on the row rather than sitting on a track that cannot play. */
    audio.addEventListener('error', function(){
      var s = nowPlaying();
      if (s) state.broken[s.audio] = true;
      advance(1, true);
    });
    document.body.appendChild(audio);
    return audio;
  }

  function srcFor(s){
    var base = 'audio/' + s.audio;
    /* .ogg first, .m4a second, the same two the audit checks for. The
       element picks whichever it can decode; Safari has Vorbis now and
       both were tested on her phone. */
    return {
      ogg: GH.build ? GH.build.url(base + '.ogg') : base + '.ogg',
      m4a: GH.build ? GH.build.url(base + '.m4a') : base + '.m4a'
    };
  }

  function nowPlaying(){
    if (state.at < 0 || state.at >= state.queue.length) return null;
    return byStem(state.queue[state.at]);
  }

  function load(s, thenPlay){
    var a = ensureAudio();
    var urls = srcFor(s);
    /* `canPlayType` rather than <source> children: the element is reused
       for the whole queue, and swapping children on a live element is how
       a track change loses its audio session. One src, chosen here. */
    var useOgg = a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"');
    a.src = useOgg ? urls.ogg : urls.m4a;
    a.load();
    if (thenPlay){
      var p = a.play();
      /* Safari returns a promise that rejects when there was no gesture.
         Swallowed: the row will show it is not playing and she can press
         it again, which is a real gesture. */
      if (p && p.catch) p.catch(function(){});
    }
    setMeta(s);
  }

  function playAt(i){
    if (!state.queue.length) return;
    if (i < 0) i = 0;
    if (i >= state.queue.length){
      if (!state.loop){ stop(); return; }
      i = 0;
    }
    state.at = i;
    var s = nowPlaying();
    if (!s){ stop(); return; }
    load(s, true);
    paint();
  }

  /* `auto` is true when the track ended by itself rather than by her
     pressing skip, which is the only case where loop and the end of the
     queue mean anything. */
  function advance(d, auto){
    var next = state.at + d;
    if (next >= state.queue.length){
      if (state.loop) next = 0;
      else { if (auto) stop(); return; }
    }
    if (next < 0) next = state.queue.length - 1;
    playAt(next);
  }

  function toggle(){
    var a = ensureAudio();
    if (!nowPlaying()){ playAt(0); return; }
    if (a.paused){
      var p = a.play();
      if (p && p.catch) p.catch(function(){});
    } else {
      a.pause();
    }
    paint();
  }

  function stop(){
    if (audio){ audio.pause(); }
    state.at = -1;
    clearMeta();
    paint();
  }

  function playing(){
    return !!(audio && !audio.paused && nowPlaying());
  }

  /* ---------- the lock screen ---------- */

  function setMeta(s){
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: titleOf(s),
        artist: t('jbTitle'),
        album: t('sgTitle')
      });
      navigator.mediaSession.playbackState = 'playing';
      navigator.mediaSession.setActionHandler('play', function(){ toggle(); });
      navigator.mediaSession.setActionHandler('pause', function(){ toggle(); });
      navigator.mediaSession.setActionHandler('nexttrack', function(){ advance(1, false); });
      navigator.mediaSession.setActionHandler('previoustrack', function(){ advance(-1, false); });
    } catch (e){}
  }

  function clearMeta(){
    if (!('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.metadata = null;
    } catch (e){}
  }

  /* ---------- the queue, edited ---------- */

  function inQueue(stem){ return state.queue.indexOf(stem) >= 0; }

  function add(stem){
    if (inQueue(stem)) return;
    state.queue.push(stem);
    saveQueue();
    paint();
  }

  function drop(stem){
    var at = state.queue.indexOf(stem);
    if (at < 0) return;
    var wasPlaying = state.at === at && playing();
    state.queue.splice(at, 1);
    /* Keep the pointer on the same TRACK, not the same index. Removing
       something above the current one would otherwise skip a song. */
    if (at < state.at) state.at--;
    else if (at === state.at){
      if (wasPlaying && state.queue.length){ state.at = Math.min(at, state.queue.length - 1); playAt(state.at); saveQueue(); return; }
      state.at = -1;
      if (audio) audio.pause();
      clearMeta();
    }
    saveQueue();
    paint();
  }

  function move(at, d){
    var to = at + d;
    if (to < 0 || to >= state.queue.length) return;
    var row = state.queue.splice(at, 1)[0];
    state.queue.splice(to, 0, row);
    /* Follow the current track through the move, so reordering while
       something is playing does not change what is playing. */
    if (state.at === at) state.at = to;
    else if (state.at === to) state.at = at;
    saveQueue();
    paint();
  }

  function addAll(){
    songs().forEach(function(s){ if (!inQueue(s.audio)) state.queue.push(s.audio); });
    saveQueue();
    paint();
  }

  function clear(){
    state.queue = [];
    state.at = -1;
    if (audio) audio.pause();
    clearMeta();
    saveQueue();
    paint();
  }

  /* Shuffles the ORDER, and keeps whatever is playing playing — it just
     ends up somewhere else in the list. Stopping the music to shuffle it
     would be the wrong answer to "scramble". */
  function scramble(){
    var here = nowPlaying();
    state.queue = GH.text.shuffle(state.queue);
    state.at = here ? state.queue.indexOf(here.audio) : -1;
    saveQueue();
    paint();
  }

  /* ---------- the screen ---------- */

  function paint(){
    if (!host || !state) return;
    host.textContent = '';

    var bar = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    /* The music does NOT stop on the way out. That is the whole feature:
       she queues it up, leaves the screen, locks the phone and walks. */
    back.addEventListener('click', function(){ state.onExit(); });
    bar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('jbTitle')));
    titles.appendChild(el('p', null, t('jbSub')));
    bar.appendChild(titles);
    host.appendChild(bar);

    host.appendChild(transport());
    host.appendChild(queueCard());
    host.appendChild(pickCard());

    if (GH.nav) GH.nav.ready();
  }

  function transport(){
    var card = el('div', 'card');
    var s = nowPlaying();

    card.appendChild(el('p', 'jb-now-l', t('jbNow')));
    card.appendChild(el('p', 'jb-now', s ? titleOf(s) : t('jbNothing')));
    if (s){
      card.appendChild(el('p', 'jb-pos',
        t('jbTrackN', { at:state.at + 1, n:state.queue.length })));
    }

    var row = el('div', 'jb-controls');

    var prev = el('button', 'jb-btn', '\u23ee');
    prev.type = 'button';
    prev.setAttribute('aria-label', t('jbPrev'));
    prev.disabled = !state.queue.length;
    prev.addEventListener('click', function(){ advance(-1, false); });
    row.appendChild(prev);

    var go = el('button', 'jb-btn jb-play', playing() ? '\u23f8' : '\u25b6');
    go.type = 'button';
    go.setAttribute('aria-label', playing() ? t('jbPause') : t('jbPlay'));
    go.disabled = !state.queue.length;
    go.addEventListener('click', toggle);
    row.appendChild(go);

    var next = el('button', 'jb-btn', '\u23ed');
    next.type = 'button';
    next.setAttribute('aria-label', t('jbNext'));
    next.disabled = !state.queue.length;
    next.addEventListener('click', function(){ advance(1, false); });
    row.appendChild(next);

    card.appendChild(row);

    var opts = el('div', 'jb-opts');

    var lo = el('button', 'chip' + (state.loop ? ' on' : ''), '\u21bb ' + t('jbLoop'));
    lo.type = 'button';
    lo.setAttribute('aria-pressed', state.loop ? 'true' : 'false');
    lo.addEventListener('click', function(){
      state.loop = !state.loop; saveQueue(); paint();
    });
    opts.appendChild(lo);

    var sc = el('button', 'chip', '\u21c4 ' + t('jbScramble'));
    sc.type = 'button';
    sc.disabled = state.queue.length < 2;
    sc.addEventListener('click', scramble);
    opts.appendChild(sc);

    card.appendChild(opts);

    /* Said once, here, because it is the reason this screen exists and it
       is not obvious that leaving does not stop the music. */
    card.appendChild(el('p', 'jb-note', t('jbPocket')));

    return card;
  }

  function queueCard(){
    var card = el('div', 'card');
    var head = el('div', 'jb-head');
    head.appendChild(el('h2', 'jb-h', t('jbQueue')));
    if (state.queue.length){
      var x = el('button', 'jb-clear', t('jbClear'));
      x.type = 'button';
      x.addEventListener('click', clear);
      head.appendChild(x);
    }
    card.appendChild(head);

    if (!state.queue.length){
      card.appendChild(el('p', 'jb-note', t('jbEmpty')));
      return card;
    }

    var list = el('ol', 'jb-list');
    state.queue.forEach(function(stem, at){
      var s = byStem(stem);
      if (!s) return;
      var li = el('li', 'jb-row' + (at === state.at ? ' is-here' : '') +
                        (state.broken[stem] ? ' is-broken' : ''));

      var play = el('button', 'jb-row-go');
      play.type = 'button';
      play.appendChild(el('span', 'jb-row-n', String(at + 1)));
      play.appendChild(el('span', 'jb-row-t', titleOf(s)));
      if (state.broken[stem]) play.appendChild(el('span', 'jb-row-x', t('jbNoFile')));
      play.addEventListener('click', function(){ playAt(at); });
      li.appendChild(play);

      var up = el('button', 'jb-move', '\u2191');
      up.type = 'button';
      up.setAttribute('aria-label', t('jbUp'));
      up.disabled = at === 0;
      up.addEventListener('click', function(){ move(at, -1); });
      li.appendChild(up);

      var dn = el('button', 'jb-move', '\u2193');
      dn.type = 'button';
      dn.setAttribute('aria-label', t('jbDown'));
      dn.disabled = at === state.queue.length - 1;
      dn.addEventListener('click', function(){ move(at, 1); });
      li.appendChild(dn);

      var rm = el('button', 'jb-move jb-rm', '\u00d7');
      rm.type = 'button';
      rm.setAttribute('aria-label', t('jbRemove'));
      rm.addEventListener('click', function(){ drop(stem); });
      li.appendChild(rm);

      list.appendChild(li);
    });
    card.appendChild(list);
    return card;
  }

  function pickCard(){
    var card = el('div', 'card');
    var head = el('div', 'jb-head');
    head.appendChild(el('h2', 'jb-h', t('jbPick')));
    var all = el('button', 'jb-clear', t('jbAddAll'));
    all.type = 'button';
    all.addEventListener('click', addAll);
    head.appendChild(all);
    card.appendChild(head);

    var wrap = el('div', 'jb-songs');
    songs().forEach(function(s){
      var on = inQueue(s.audio);
      var b = el('button', 'jb-song' + (on ? ' is-on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.appendChild(el('span', 'jb-song-mark', on ? '\u2713' : '+'));
      b.appendChild(el('span', 'jb-song-t', titleOf(s)));
      b.addEventListener('click', function(){
        if (on) drop(s.audio); else add(s.audio);
      });
      wrap.appendChild(b);
    });
    card.appendChild(wrap);
    return card;
  }

  /* ---------- entry ---------- */

  function open(container, onExit){
    host = container;
    var saved = loadQueue();
    /* The queue survives leaving the screen, and so does the playback —
       so returning while something is playing must find its own place
       again rather than resetting to the top. */
    var was = state;
    state = {
      onExit: onExit,
      queue: (was && was.queue && was.queue.length) ? was.queue : saved.queue,
      loop: was ? was.loop : saved.loop,
      at: (was && typeof was.at === 'number') ? was.at : -1,
      broken: (was && was.broken) || {}
    };
    GH.app.redraw = paint;
    paint();
  }

  var entry = {
    id:'jukebox',
    kind:'read',
    glyph:'\ud83c\udfb5',
    name:{ ru:'\u041c\u0443\u0437\u044b\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0430\u0432\u0442\u043e\u043c\u0430\u0442',
           de:'Musikbox', en:'Jukebox' },
    sub:{ ru:'\u0421\u0432\u043e\u0439 \u0441\u043f\u0438\u0441\u043e\u043a \u043f\u0435\u0441\u0435\u043d \u043f\u043e\u0434\u0440\u044f\u0434',
          de:'Deine Liste, ein Lied nach dem anderen',
          en:'Your own list, one after another' },
    open:open
  };

  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register,
           playing:playing, stop:stop };
})();
