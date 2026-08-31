/* Sending the event log somewhere Steven can read it.

   The log lives in her browser. He is not near her and cannot read it off
   her phone, so without this there is no way to tell whether the app is
   used at all — and no way to improve it after it ships except by guessing.

   ------------------------------------------------------------------
   WHAT THIS IS NOT

   Not analytics in the usual sense. Nothing is sent per tap, nothing runs
   on a timer, no third party is involved, and no identity is collected. It
   is `GH.events.dump()` — the same object the log already produces — posted
   once a day to one URL.

   ------------------------------------------------------------------
   SHE KNOWS, AND SHE CAN STOP IT

   `gh-send-off` turns it off, and Settings says in plain words what is
   sent. That is not a legal gesture. An app that reports on someone's
   practice without telling them is the kind of thing that ends the project
   when it is discovered, and this one is a gift between two people.

   For a public version the default flips: nothing is sent until asked.
   `optedIn()` is the single place that decides, so flipping it is a
   one-line change rather than an audit of this file.

   ------------------------------------------------------------------
   IT MUST NEVER COST HER ANYTHING

   No await on the interface, no retry storm, no blocked navigation. If the
   endpoint is down, unreachable, or not configured, the app behaves exactly
   as if this file did not exist. The log is not cleared on success either —
   it is small, it is capped, and losing it to a failed upload would lose
   the only copy.

   ------------------------------------------------------------------
   ONCE A DAY, PER DEVICE

   She may use a phone and a laptop; each keeps its own log and sends its
   own. `sentOn` is the last day this device uploaded, so a dozen visits in
   one day is one upload. Sending on every visit would be a dozen copies of
   almost the same thing and a bill for someone eventually. */

window.GH = window.GH || {};

GH.send = (function(){

  /* The one line to change. Empty means "not configured": nothing is sent,
     nothing is logged as an error, and the app runs normally — which is the
     state it ships in until the endpoint exists. */
  var URL = '';

  var KEY = 'gh-send-v1';
  var OFF = 'gh-send-off';

  /* Public version: default this to false and ask first. */
  var DEFAULT_ON = true;

  function today(){
    var d = new Date();
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function read(){
    try { return JSON.parse(window.localStorage.getItem(KEY) || '{}') || {}; }
    catch (e){ return {}; }
  }
  function write(d){
    try { window.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e){}
  }

  function optedIn(){
    try {
      var raw = window.localStorage.getItem(OFF);
      if (raw === '1') return false;
      if (raw === '0') return true;
    } catch (e){}
    return DEFAULT_ON;
  }

  function setOptedIn(on){
    try { window.localStorage.setItem(OFF, on ? '0' : '1'); } catch (e){}
  }

  /* A name for this device that is not a name.

     Two devices must be distinguishable or her phone and her laptop merge
     into one contradictory picture. But nothing here identifies a person:
     it is a random string made once and kept. No fingerprinting, no
     account, nothing that survives clearing the browser. */
  function deviceId(){
    var d = read();
    if (!d.id){
      d.id = 'd' + Math.random().toString(36).slice(2, 10) +
                   Date.now().toString(36).slice(-4);
      write(d);
    }
    return d.id;
  }

  function configured(){ return !!URL; }

  /* ---------- the upload ---------- */

  function payload(){
    if (!GH.events || !GH.events.dump) return null;
    var body = GH.events.dump();
    body.device_id = deviceId();
    body.sent_at = Date.now();
    body.tz = (function(){
      try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; }
      catch (e){ return ''; }
    })();
    /* Her interface language and target language, because "she switched to
       German mode" is a real finding and costs one field. */
    body.lang = GH.i18n ? GH.i18n.lang() : '';
    body.target = (GH.player && GH.player.target) ? GH.player.target() : '';
    return body;
  }

  /* `sendBeacon` where it exists: the browser takes the payload and
     delivers it on its own time, including after the page is closed, which
     is exactly when a language app gets closed. It cannot report failure,
     which is the trade — and the right one, because a failed upload must
     not cost her anything and there is nothing useful to do about it. */
  function post(body){
    var text = JSON.stringify(body);
    try {
      if (navigator.sendBeacon){
        var blob = new Blob([text], { type:'application/json' });
        if (navigator.sendBeacon(URL, blob)) return true;
      }
    } catch (e){}
    /* Fall back to fetch, deliberately fire-and-forget. `keepalive` lets it
       outlive the page the way a beacon would. */
    try {
      fetch(URL, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body:text,
        keepalive:true,
        mode:'cors'
      }).catch(function(){});
      return true;
    } catch (e){}
    return false;
  }

  /* Called on arrival at the hub. Silent in every failure case. */
  function maybe(){
    if (!configured()) return 'not configured';
    if (!optedIn()) return 'switched off';
    var d = read();
    if (d.sentOn === today()) return 'already today';
    var body = payload();
    if (!body) return 'no log';
    /* Mark BEFORE sending. A beacon cannot report success, so a failure
       that retried on every visit would hammer the endpoint for a day; one
       lost day of data is the cheaper mistake, and tomorrow's upload
       carries it anyway because the log is cumulative. */
    d.sentOn = today();
    write(d);
    post(body);
    return 'sent';
  }

  /* For Settings, and for checking by hand. */
  function status(){
    var d = read();
    return {
      configured: configured(),
      on: optedIn(),
      lastSent: d.sentOn || null,
      device: deviceId()
    };
  }

  /* The whole payload as text, so it can be moved by hand if there is no
     endpoint — copied out of a phone and pasted into a message. That is the
     fallback that needs no hosting at all. */
  function asText(){
    var body = payload();
    return body ? JSON.stringify(body) : '';
  }

  /* Ignores `sentOn`. For testing the endpoint. */
  function now(){
    if (!configured()) return 'not configured';
    var body = payload();
    if (!body) return 'no log';
    post(body);
    var d = read(); d.sentOn = today(); write(d);
    return 'sent';
  }

  return {
    maybe:maybe, now:now, status:status, asText:asText,
    optedIn:optedIn, setOptedIn:setOptedIn, configured:configured,
    deviceId:deviceId, endpoint:function(){ return URL; }
  };
})();
