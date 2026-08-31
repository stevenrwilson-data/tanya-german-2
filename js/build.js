/* The build number, and what depends on it.

   index.html carries `?v=219` on every script and stylesheet, so the build
   is already written down once per deploy. Three separate things need it and
   two of them were guessing.

   ------------------------------------------------------------------
   IMAGES AND AUDIO CARRIED NO VERSION AT ALL

   `images/5.webp`, `audio/x.ogg`, `images/faces/face-1.webp` — no query
   string, so a redrawn sheet or a re-recorded song could be served from a
   stale cache indefinitely. On Cloudflare Pages the default
   `must-revalidate` hides that, at the cost of a round trip for every one
   of the 72 sheets on every load, which on a phone is the slow part.

   `GH.build.url(path)` appends the version, which fixes both: a changed
   file is a changed URL, so it can then be cached hard.

   ------------------------------------------------------------------
   NOTICING A NEW DEPLOY

   She may leave the app open for days. Nothing server-side can help with a
   page already loaded — so the app asks, occasionally and cheaply, whether
   the build it is running is still the current one.

   It does NOT reload by itself. Reloading under someone mid-round throws
   away the round, and an app that restarts without being asked is
   frightening rather than helpful. It offers. */

window.GH = window.GH || {};

GH.build = (function(){

  /* Read once from the same place events.js reads it. */
  var N = (function(){
    try {
      var s = document.querySelector('script[src*="?v="]');
      var hit = s && s.getAttribute('src').match(/\?v=(\d+)/);
      return hit ? +hit[1] : 0;
    } catch (e){ return 0; }
  })();

  function number(){ return N; }

  /* An asset URL with the version on it. No-op when the build is unknown,
     which is the case when the page is opened straight off the filesystem —
     and a `?v=0` on every image would be a lie rather than a default. */
  function url(path){
    if (!N || !path) return path;
    return path + (path.indexOf('?') >= 0 ? '&' : '?') + 'v=' + N;
  }

  /* ---------- is there a newer build? ----------

     `index.html` is fetched with cache disabled and its own `?v=` read out.
     No extra file to deploy and nothing to keep in step: the answer comes
     from the thing that defines the answer.

     Checked at most every twenty minutes, and only when the tab is
     actually visible — a backgrounded phone must not sit there polling. */
  var CHECK_EVERY = 20 * 60 * 1000;
  var lastCheck = 0;
  var newer = 0;

  function check(then){
    if (!N) return;                       /* opened from a file, nothing to check */
    if (newer) { if (then) then(newer); return; }
    var now = Date.now();
    if (now - lastCheck < CHECK_EVERY) return;
    lastCheck = now;

    try {
      fetch('index.html?probe=' + now, { cache:'no-store' })
        .then(function(r){ return r.ok ? r.text() : null; })
        .then(function(html){
          if (!html) return;
          var hit = html.match(/\?v=(\d+)/);
          if (!hit) return;
          var out = +hit[1];
          /* Only ever forward. A cached older copy answering the probe must
             not tell her to "update" back to where she came from. */
          if (out > N){
            newer = out;
            if (then) then(out);
          }
        })
        .catch(function(){});
    } catch (e){}
  }

  function pending(){ return newer || 0; }

  /* She asked for it. A plain reload is enough — index.html is revalidated,
     it names the new asset versions, and every file follows. */
  function reload(){
    try { window.location.reload(); } catch (e){}
  }

  return { number:number, url:url, check:check, pending:pending, reload:reload };
})();
