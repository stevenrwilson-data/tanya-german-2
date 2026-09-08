/* js/record.js */
/* Recording her own voice, once, for whoever wants it.

   Listen and Speak has had a working recorder since it was built. Dialogues
   now needs the same thing — Steven: "Record your voice against any line of
   dialogue and compare it to the spoken version" — and the wrong way to get
   it is a second copy of that code. There are four things in here that were
   each learned the hard way, and a duplicate would have to learn them
   again:

     - Safari records mp4 and everything else webm, and a wrong mime type
       silently produces a ZERO-BYTE blob rather than an error.
     - `getUserMedia` is absent, not merely refused, outside a secure
       context — so http://192.168.x.x is indistinguishable from an old
       browser unless `isSecureContext` is asked directly. And
       http://localhost IS secure, which is the confusing part: it is
       decided by the URL in the address bar, not by where the server runs.
     - the permission is asked for ONCE and the stream held, because asking
       per line means a prompt per line on some browsers.
     - a blob URL has to be revoked before it is replaced, or a round of
       twelve re-recordings leaks twelve blobs.

   NO UI IN HERE, deliberately. Listen and Speak draws a lab; a dialogue
   draws a mic beside a line. Both want the same recorder and neither wants
   the other's screen, so this hands back a URL and says nothing about how
   to present it.

   ------------------------------------------------------------------
   LISTEN AND SPEAK HAS NOT BEEN MIGRATED TO THIS YET

   Its own copy still runs, untouched. That is deliberate and temporary:
   rewriting the core of a 31KB file that works, days before a release, to
   save duplication that is not currently hurting anything, is the wrong
   trade this week. It IS the right thing to do the week after — the two
   should not be allowed to drift, and this file is the one that should
   survive.

   ------------------------------------------------------------------
   USAGE

     GH.record.why()            '' when it can record, else a reason code
     GH.record.can()            convenience for !why()
     GH.record.start(ok, fail)  begins; `fail` gets a reason code
     GH.record.stop()           ends it; the `ok` from start() gets a url
     GH.record.busy()           is it recording right now
     GH.record.free(url)        revoke a url this made

   Reason codes, because the causes need different actions:
     'insecure'  not a secure context — needs https
     'browser'   secure, but no MediaRecorder
     'denied'    she said no to the prompt
     'error'     something else went wrong
*/

window.GH = window.GH || {};

GH.record = (function(){

  var stream = null;
  var rec = null;
  var timer = null;

  /* A hard ceiling, so a forgotten recording cannot run for ten minutes.
     Same number Listen and Speak uses. */
  var MAX_MS = 15000;

  function why(){
    var secure = (typeof window.isSecureContext === 'boolean')
      ? window.isSecureContext
      : (location.protocol === 'https:' ||
         location.hostname === 'localhost' || location.hostname === '127.0.0.1');
    if (!secure) return 'insecure';
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) return 'browser';
    if (!window.MediaRecorder) return 'browser';
    return '';
  }

  function can(){ return !why(); }

  /* Asked rather than assumed: a mime type the browser does not support
     produces an empty blob and no error at all. */
  function mimeType(){
    if (!window.MediaRecorder) return '';
    var want = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'];
    var i;
    for (i = 0; i < want.length; i++){
      try { if (MediaRecorder.isTypeSupported(want[i])) return want[i]; } catch (e){}
    }
    return '';
  }

  function mic(then, fail){
    if (stream){ then(stream); return; }
    var no = why();
    if (no){ fail(no); return; }
    navigator.mediaDevices.getUserMedia({ audio:true }).then(function(st){
      stream = st;
      then(st);
    })['catch'](function(e){
      /* NotAllowedError covers a refused prompt AND an insecure origin,
         which the browser reports identically. */
      fail((e && e.name) === 'NotAllowedError' ? 'denied' : 'error');
    });
  }

  function busy(){ return !!rec; }

  /* `ok` is called with a blob url, or null when nothing was captured.
     Null is a real answer: a tap on Record and an immediate Stop records
     no audio, and a zero-byte url would play silence and look broken. */
  function start(ok, fail){
    fail = fail || function(){};
    if (rec){ fail('error'); return; }
    mic(function(st){
      var type = mimeType();
      var r;
      try { r = type ? new MediaRecorder(st, { mimeType:type }) : new MediaRecorder(st); }
      catch (e){ fail('error'); return; }

      var bits = [];
      r.addEventListener('dataavailable', function(e){
        if (e.data && e.data.size) bits.push(e.data);
      });
      r.addEventListener('stop', function(){
        if (timer){ window.clearTimeout(timer); timer = null; }
        rec = null;
        var blob = new Blob(bits, { type: type || 'audio/webm' });
        ok(blob.size ? URL.createObjectURL(blob) : null);
      });

      rec = r;
      r.start();
      timer = window.setTimeout(stop, MAX_MS);
    }, fail);
  }

  function stop(){
    if (!rec) return;
    try { rec.stop(); }
    catch (e){ rec = null; }
  }

  /* Hand back a url this made. The caller owns it and has to say when it
     is finished with it, because only the caller knows whether it is still
     on screen. */
  function free(url){
    if (!url) return;
    try { URL.revokeObjectURL(url); } catch (e){}
  }

  /* Let the microphone go. Called when a screen that was recording is
     left — the browser shows a recording indicator until every track is
     stopped, and leaving one live looks like the app is still listening. */
  function release(){
    stop();
    if (!stream) return;
    try { stream.getTracks().forEach(function(tr){ tr.stop(); }); } catch (e){}
    stream = null;
  }

  /* ==================================================================
     A DECK — the recording UI, once, for every screen that wants it

     Steven: "I want you to add the 'record me' to sections with spoken L2
     language... You can actually have this 'record' button at the top of
     every place you add it then it allows you to record literally
     anything and compare it to the active section. If there's more than 1
     line then add a mic next to every line (like do that for songs) but
     it is off by default so they only appear if you toggle it on up at
     the top."

     WHY THIS IS HERE AND NOT COPIED INTO FIVE SCREENS. Everything above
     in this file is capture — permission, MediaRecorder, the Safari
     container. The UI around it was written once, in talkview.js: a mic
     per line, a take per line, Computer and Me appearing after the first
     recording, one recorder live at a time. Five screens each with their
     own copy of that state machine is five places for the same bug.

     So a deck owns: the on/off switch, the takes, which line is live, and
     the two elements a caller mounts.

       d = GH.record.deck(repaint)
       d.button()            the 🎤 Record toggle for the top of the screen
       d.on()                is it switched on
       d.row(key, sayFn)     the mic + compare row for one line
       d.clear()             free every take, on leaving the screen

     OFF BY DEFAULT, and remembered. A song has thirty lines; thirty mics
     nobody asked for is a wall. But a learner who wants to practise
     pronunciation wants it on for every song, not once — so the switch is
     stored, per player and per screen.

     `sayFn` is a function rather than a string because the caller knows
     how its own line should be spoken — talkview uses a per-character
     voice, the songbook a plain line, the comic a panel. This file must
     not know any of that.

     ONE RECORDER AT A TIME, enforced here: starting on a new line stops
     the old one first and retries on its way out. Two live recorders is
     the failure that produces silent takes on iOS. */
  function deck(repaint){
    var d = {
      takes: {},        /* key -> blob url */
      at: null,         /* key currently recording */
      why: '',          /* why it cannot, in words */
      key: null         /* the storage key for the on/off switch */
    };

    function paint(){ if (typeof repaint === 'function') repaint(); }

    function storeKey(){
      var k = 'gh-rec-on' + (d.key ? '-' + d.key : '');
      return (GH.player && GH.player.scope) ? GH.player.scope(k) : k;
    }

    function isOn(){
      try { return window.localStorage.getItem(storeKey()) === 'on'; }
      catch (e){ return false; }
    }

    function setOn(on){
      try { window.localStorage.setItem(storeKey(), on ? 'on' : 'off'); }
      catch (e){}
    }

    function stopMine(){
      if (d.audio){
        try { d.audio.pause(); } catch (e){}
        d.audio = null;
      }
    }

    function playMine(k){
      var url = d.takes[k];
      if (!url) return;
      if (GH.speech) GH.speech.stop();
      stopMine();
      d.audio = new Audio(url);
      d.audio.play();
    }

    function toggleRec(k, sayFn){
      if (d.at === k){ stop(); return; }

      /* A different line is live: stop it, then start here on its way
         out. Two recorders at once is what produces silent takes. */
      if (busy()){
        stop();
        window.setTimeout(function(){ toggleRec(k, sayFn); }, 60);
        return;
      }

      var no = why();
      if (no){ d.why = no; paint(); return; }

      if (GH.speech) GH.speech.stop();
      stopMine();
      d.why = '';
      d.at = k;
      paint();

      start(function(url){
        d.at = null;
        if (url){
          free(d.takes[k]);     /* replacing a take revokes the old one */
          d.takes[k] = url;
        }
        paint();
      }, function(w){
        d.at = null;
        d.why = w;
        paint();
      });
    }

    function el(tag, cls, text){
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      if (text !== undefined && text !== null) n.textContent = text;
      return n;
    }

    function t(k){ return GH.i18n ? GH.i18n.t(k) : k; }

    d.on = isOn;

    /* The switch. Hidden entirely where recording is impossible — an
       http:// origin has no getUserMedia at all, and a toggle that
       cannot do anything is worse than no toggle. */
    d.button = function(scopeKey){
      d.key = scopeKey || d.key;
      if (!can()) return null;
      var b = el('button', 'rec-on' + (isOn() ? ' is-on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', isOn() ? 'true' : 'false');
      b.appendChild(el('span', 'rec-on-ico', '\ud83c\udfa4'));
      b.appendChild(el('span', 'rec-on-t', t('recOn')));
      b.addEventListener('click', function(){
        setOn(!isOn());
        if (!isOn()) d.clear();
        paint();
      });
      return b;
    };

    /* One line's mic, and the two compare buttons once there is a take.
       Returns null when the switch is off, so a caller can append
       unconditionally. */
    d.row = function(k, sayFn){
      if (!isOn() || !can()) return null;
      var wrap = el('span', 'rec-row');

      var mic = el('button', 'rec-mic' + (d.at === k ? ' is-rec' : ''));
      mic.type = 'button';
      mic.setAttribute('aria-label', t(d.at === k ? 'spStop' : 'spRecord'));
      mic.setAttribute('aria-pressed', d.at === k ? 'true' : 'false');
      mic.textContent = d.at === k ? '\u25a0' : '\ud83c\udfa4';
      mic.addEventListener('click', function(e){
        e.stopPropagation();
        toggleRec(k, sayFn);
      });
      wrap.appendChild(mic);

      if (d.takes[k]){
        var orig = el('button', 'btn rec-cmp', t('spHearTts'));
        orig.type = 'button';
        orig.addEventListener('click', function(e){
          e.stopPropagation();
          stopMine();
          if (typeof sayFn === 'function') sayFn();
        });
        wrap.appendChild(orig);

        var me = el('button', 'btn rec-cmp', t('spHearMe'));
        me.type = 'button';
        me.addEventListener('click', function(e){
          e.stopPropagation();
          playMine(k);
        });
        wrap.appendChild(me);
      }
      return wrap;
    };

    /* Why it cannot record, for a caller that wants to say so. */
    d.note = function(){ return d.why; };

    d.clear = function(){
      var k;
      stopMine();
      if (busy()) stop();
      for (k in d.takes){
        if (d.takes.hasOwnProperty(k)) free(d.takes[k]);
      }
      d.takes = {};
      d.at = null;
    };

    return d;
  }

  return { why:why, can:can, start:start, stop:stop, busy:busy,
           free:free, release:release,
           deck:deck };
})();
