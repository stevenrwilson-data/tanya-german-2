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

  return { why:why, can:can, start:start, stop:stop, busy:busy,
           free:free, release:release };
})();
