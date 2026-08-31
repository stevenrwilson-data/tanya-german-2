/* Alina and Stella — the reader.

   A comic is one image with its panels drawn into it, so nothing is
   cropped and nothing depends on panel geometry. The image is shown whole
   at its own aspect ratio; the text lives in `data/comics.js` and is read
   underneath, one line at a time.

   Why the text is separate at all, when it is also lettered into the
   picture: speech cannot read pixels, a translation cannot be revealed on
   demand from a drawing, and the images are not uniform — two of the
   forty-six are 4:3 rather than 3:2. Shown whole, that does not matter.

   One line at a time, not the whole panel. A page of English under a
   German picture is a page of English she reads instead of the German.
   The order is: see the German, hear it, then choose to see the meaning.

   Hearing it is her decision. Play speaks the line once; Auto decides
   whether the next line speaks by itself, and Auto is off until she says
   otherwise.

   The German is still being verified, so most lines have only `en`. A line
   with no German is shown, said to be untranslated, and cannot be spoken —
   rather than the reader pretending or falling silent with no explanation. */

window.GH = window.GH || {};

GH.comic = (function(){

  var t = function(k, v){ return GH.i18n.t(k, v); };
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  /* Where the pictures are.

     Two editions of the same 46 comics, `-eng` and `-deu`, and neither is
     a fallback for the other. English is a first-class edition the app
     will keep — Nazar reads in English, and Tanya may want it as a
     parallel text. German is a second edition of equal standing.

         images/comic/eng/comic-01-01-eng.webp
         images/comic/deu/comic-01-01-deu.webp

     ONE FOLDER PER EDITION. Forty-six comics in two languages is ninety-two
     files in one directory; five chapters and three languages is several
     hundred, and a folder that size is unusable for the person putting
     pictures into it.

     The suffix stays in the filename even though the folder already says
     it. It costs nothing, it means a file dragged out of its folder is
     still identifiable, and it means the existing files need no renaming.

     EDITIONS lists what is on disk, and the toggle appears on its own once
     there is more than one. A missing picture falls back to the other
     edition rather than to an error, because a comic drawn in only one
     language is still a comic.

     This was built the wrong way round first — asking for German and
     treating English as an error handler — which cost a 404 on every
     comic and described the language she may end up reading in as a
     failure case. */
  var DIR = 'images/comic/';

  /* `images/comic/<edition>/comic-<unit>-<n>-<edition>.webp` */
  function dirFor(edition){ return DIR + edition + '/'; }
  var EDITIONS = ['eng', 'deu'];
  var DEFAULT_EDITION = 'eng';

  /* Which edition to open in. German while she is reading the app in
     German, English otherwise — she chose her interface language on the
     first screen and this is the same preference. Overridden by her own
     toggle for the rest of the session. */
  function preferred(){
    var want = lang() === 'de' ? 'deu' : 'eng';
    return EDITIONS.indexOf(want) >= 0 ? want : DEFAULT_EDITION;
  }

  function otherEdition(e){ return e === 'deu' ? 'eng' : 'deu'; }
  function pic(c, edition){
    return dirFor(edition) +
      'comic-' + pad(c.unit) + '-' + pad(c.comic) + '-' + edition + '.webp';
  }
  function pad(n){ return (n < 10 ? '0' : '') + n; }

  /* ---------- speaking on arrival ----------

     Off unless she turns it on. A line that speaks the moment it appears
     takes the choice away: she cannot look at the German first, cannot
     sit on a panel, and cannot read in a quiet room without the sound
     starting for her.

     Remembered, so turning it on is a decision she makes once rather than
     every comic. Private browsing on iOS throws on localStorage rather
     than returning null, so both accesses are wrapped, the same way
     theme.js does it. */
  var AUTO_KEY = 'gh-comic-auto';

  function autoRead(){
    try { return window.localStorage.getItem(AUTO_KEY) === '1'; }
    catch (e){ return false; }
  }
  function setAutoRead(on){
    try { window.localStorage.setItem(AUTO_KEY, on ? '1' : '0'); } catch (e){}
  }

  var state = null;

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function all(){ return window.GH_COMICS || []; }

  function units(){
    var seen = {}, out = [];
    all().forEach(function(c){
      if (!seen[c.unit]){ seen[c.unit] = []; out.push({ n:c.unit, comics:seen[c.unit] }); }
      seen[c.unit].push(c);
    });
    return out;
  }

  /* ---------- what a line says ----------

     German is the line. Everything else is the translation, and which one
     depends on the language she is reading the app in. In German there is
     nothing to reveal. */

  function german(line){ return line.de || ''; }

  function meaning(line){
    var l = lang();
    if (l === 'de') return '';
    if (l === 'ru') return line.ru || line.en || '';
    return line.en || '';
  }

  /* A narration label carries no speaker; a speech label does. */
  function isNarration(who){
    return who.indexOf('Narrative') === 0 || who === 'Sound effect';
  }
  function speaker(who){ return who.split(',')[0].trim(); }

  /* ---------- the list of comics ---------- */

  function paintIndex(){
    var host = state.host;
    host.textContent = '';

    var head = el('div', 'card cm-intro');
    head.appendChild(el('h1', null, t('cmTitle')));
    head.appendChild(el('p', 'cm-lede', t('cmLede')));
    host.appendChild(head);

    units().forEach(function(u){
      var sec = el('section', 'cm-unit');
      sec.appendChild(el('h2', 'cm-unit-h',
        t('cmUnitN', { n:u.n }) + ' \u00b7 ' + t('cmComicsN', { n:u.comics.length })));
      var grid = el('div', 'cm-grid');
      u.comics.forEach(function(c){
        var b = el('button', 'cm-card');
        b.type = 'button';

        var thumb = el('div', 'cm-thumb');
        var img = document.createElement('img');
        img.loading = 'lazy';
        img.alt = '';
        /* The index follows her language as well, so the German edition is
           not hidden behind opening a comic first. */
        img.src = pic(c, preferred());
        img.addEventListener('error', function(){
          if (img.src.indexOf('-' + DEFAULT_EDITION + '.') < 0) img.src = pic(c, DEFAULT_EDITION);
        });
        thumb.appendChild(img);
        b.appendChild(thumb);

        var cap = el('div', 'cm-card-cap');
        cap.appendChild(el('span', 'cm-card-n', t('cmComicN', { n:c.comic })));
        var sc = c.scene && (c.scene[lang()] || c.scene.en || '');
        if (sc) cap.appendChild(el('span', 'cm-card-scene', sc));
        cap.appendChild(el('span', 'cm-card-meta',
          t('cmPanelsN', { n:c.panels.length })));
        b.appendChild(cap);

        b.addEventListener('click', function(){ openComic(c); });
        grid.appendChild(b);
      });
      sec.appendChild(grid);
      host.appendChild(sec);
    });

    /* `.backlink`, not `js-back`.

       nav.js leaves a screen by clicking `.backlink` — it goes through
       the button on purpose, so each activity's own cleanup runs. This
       one was called `js-back`, which nothing looks for, so Escape and
       swipe-left did nothing here and worked everywhere else. */
    var back = el('button', 'backlink cm-exit', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    host.appendChild(back);
  }

  /* ---------- one comic ---------- */

  function openComic(c){
    /* WHICH comic. The log had an open and a leave for this screen, so all
       forty-six looked like one activity. */
    if (GH.events && GH.events.mark) GH.events.mark('read', 'comic:' + c.id);
    state.comic = c;
    state.panel = 0;
    state.line = 0;
    state.shown = false;
    state.edition = preferred();
    paintComic();
  }

  /* every line in the comic, flattened, so next/back is one index */
  function flat(c){
    var out = [];
    c.panels.forEach(function(p){
      p.lines.forEach(function(l){ out.push({ panel:p.n, line:l }); });
    });
    return out;
  }

  function paintComic(){
    var host = state.host, c = state.comic;
    host.textContent = '';

    var bar = el('div', 'cm-bar');
    /* Same class as every other screen's back button, for the same
       reason, and it stops the speech on the way out — which is why
       nav.js clicks the button rather than calling the hub itself. */
    var back = el('button', 'backlink cm-back', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ GH.speech.stop(); paintIndex(); });
    bar.appendChild(back);
    bar.appendChild(el('span', 'cm-bar-t',
      t('cmUnitN', { n:c.unit }) + ' \u00b7 ' + t('cmComicN', { n:c.comic })));

    /* The lettering toggle, offered only when there is something to
       toggle to. With one edition on disk a switch that leads to a
       missing picture is worse than no switch. */
    if (EDITIONS.length > 1){
      var swap = el('button', 'cm-swap');
      swap.type = 'button';
      swap.textContent = state.edition === 'deu' ? t('cmSeeEng') : t('cmSeeDeu');
      swap.addEventListener('click', function(){
        state.edition = otherEdition(state.edition);
        paintComic();
      });
      bar.appendChild(swap);
    }
    host.appendChild(bar);

    /* the picture, whole. Not cropped, not fixed to one aspect ratio:
       two of the forty-six are 4:3 and the rest 3:2, and both are fine. */
    var frame = el('div', 'cm-page');
    var img = document.createElement('img');
    img.alt = '';
    img.src = pic(c, state.edition);
    /* A German page that has not been drawn yet falls back to the English
       one ONCE, rather than showing an error. The German edition arrives
       comic by comic over weeks; a gap in it is a normal state, and an
       English page is far more use to her than a message saying there is
       no picture. */
    var fellBack = false;
    img.addEventListener('error', function(){
      if (!fellBack && state.edition !== DEFAULT_EDITION){
        fellBack = true;
        img.src = pic(c, DEFAULT_EDITION);
        return;
      }
      frame.className = 'cm-page is-gone';
      img.style.display = 'none';
      frame.appendChild(el('p', 'cm-gone', t('cmNoImage')));
    });
    frame.appendChild(img);
    host.appendChild(frame);

    host.appendChild(readerBox());
    armNav();
  }

  /* ---------- the line she is on ---------- */

  function readerBox(){
    var c = state.comic;
    var lines = flat(c);
    var at = Math.min(state.line, lines.length - 1);
    var item = lines[at];
    var line = item.line;

    var box = el('div', 'card cm-read');

    box.appendChild(el('p', 'cm-where',
      t('cmPanelN', { n:item.panel }) + '  \u00b7  ' + (at + 1) + '/' + lines.length));

    /* who is speaking, when anyone is */
    if (!isNarration(line.who)){
      var who = el('p', 'cm-who', speaker(line.who));
      if (line.who.indexOf('thought') >= 0) who.className = 'cm-who is-thought';
      box.appendChild(who);
    } else {
      box.appendChild(el('p', 'cm-who is-narr', t('cmNarration')));
    }

    var de = german(line);

    if (de){
      /* the German, and tapping it says it again */
      var deBtn = el('button', 'cm-de', de);
      deBtn.type = 'button';
      deBtn.addEventListener('click', function(){ say(de); });
      box.appendChild(deBtn);
    } else {
      /* no German yet: show the English so the reader still works, and be
         plain about which it is rather than passing it off as the line */
      box.appendChild(el('p', 'cm-de is-pending', line.en || ''));
      box.appendChild(el('p', 'cm-pending-note', t('cmNoGerman')));
    }

    var acts = el('div', 'cm-acts');

    /* Two controls, because they are two different things and one button
       cannot be both.

       Play is an action. It speaks this line, once, now. Its label used to
       be 'Again' — which was written when every line spoke itself on
       arrival, so pressing it really was a repeat. With auto off nothing
       has been said yet and 'Again' is simply wrong.

       Auto is a switch. It decides whether the next line speaks by itself,
       it is remembered across comics, and it is off until she turns it on.
       aria-pressed and the filled style both carry that, because a switch
       that looks like the action button beside it is not a switch. */
    if (de){
      var play = el('button', 'cm-btn', '\ud83d\udd0a ' + t('cmPlay'));
      play.type = 'button';
      play.addEventListener('click', function(){ say(de); });
      acts.appendChild(play);

      var auto = el('button', 'cm-btn cm-auto', t('cmAuto'));
      auto.type = 'button';
      auto.setAttribute('aria-pressed', autoRead() ? 'true' : 'false');
      auto.addEventListener('click', function(){
        var on = !autoRead();
        setAutoRead(on);
        auto.setAttribute('aria-pressed', on ? 'true' : 'false');
        /* Turning it on speaks this line rather than waiting for the next
           one. She pressed a sound button; silence would read as broken. */
        if (on) say(de);
      });
      acts.appendChild(auto);
    }

    var mean = meaning(line);
    if (mean && de){
      /* The reveal waits for the audio.

         She should hear the German before she is allowed to read what it
         means, or the translation is simply the line and the German is
         decoration. speech.say() calls back whether it finished or failed,
         so the button cannot stick — and on iOS, where nothing speaks
         until a tap has unlocked audio, it enables at once rather than
         locking her out. */
      var show = el('button', 'cm-btn');
      show.type = 'button';
      show.textContent = t('cmShowMeaning');
      show.disabled = !state.heard;
      show.addEventListener('click', function(){
        if (box.querySelector('.cm-mean')) return;
        show.disabled = true;
        box.appendChild(el('p', 'cm-mean', mean));
      });
      acts.appendChild(show);
      state.showBtn = show;
    } else if (mean){
      box.appendChild(el('p', 'cm-mean', mean));
    }

    box.appendChild(acts);

    var nav = el('div', 'cm-nav');
    var prev = el('button', 'btn cm-prev', t('cmPrev'));
    prev.type = 'button';
    prev.disabled = at === 0;
    prev.addEventListener('click', function(){ step(-1); });
    nav.appendChild(prev);

    /* `js-advance` makes this the screen's one thing to do, so a tap
       anywhere, a swipe right, space or Enter all move to the next line.
       Without it the comic was the only activity in the app where none of
       that worked — and it is the one where she presses Next most, forty
       times in a row for a six-panel strip. */
    var next = el('button', 'btn btn-primary cm-next js-advance',
                  at === lines.length - 1 ? t('cmDone') : t('cmNext'));
    next.type = 'button';
    next.addEventListener('click', function(){
      if (at === lines.length - 1){ GH.speech.stop(); paintIndex(); return; }
      step(1);
    });
    nav.appendChild(next);
    box.appendChild(nav);

    /* Say it on arrival only if she has asked for that. Off by default:
       pressing Hear is one tap, and a line that speaks itself cannot be
       un-spoken. */
    if (de && autoRead()) say(de);

    return box;
  }

  /* Focus the advance button and start nav.js's bubble guard.

     Called after the box is in the document, not while it is being
     built — nav.js looks the button up in the page, and a node that has
     not been appended yet is not in the page. */
  function armNav(){
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  function say(text){
    state.heard = false;
    if (state.showBtn) state.showBtn.disabled = true;
    GH.speech.say(text, function(){
      state.heard = true;
      if (state.showBtn) state.showBtn.disabled = false;
    });
  }

  function step(d){
    var lines = flat(state.comic);
    var at = state.line + d;
    if (at < 0) at = 0;
    if (at > lines.length - 1) at = lines.length - 1;
    state.line = at;
    state.heard = false;
    state.showBtn = null;
    GH.speech.stop();
    /* repaint only the reader, so the picture does not reload on every line */
    var old = state.host.querySelector('.cm-read');
    var box = readerBox();
    if (old && old.parentNode) old.parentNode.replaceChild(box, old);
    else state.host.appendChild(box);
    armNav();
  }

  /* ---------- entry ---------- */

  function open(host, onExit){
    state = { host:host, onExit:onExit, comic:null, panel:0, line:0,
              edition:DEFAULT_EDITION, heard:false, showBtn:null };
    GH.app.redraw = function(){ if (state.comic) paintComic(); else paintIndex(); };
    paintIndex();
  }

  var entry = {
    id:'comic',
    /* Read and listen, not Games: nothing here is marked. */
    kind:'read',
    glyph:'\ud83d\udcd6',
    name:{ ru:'Алина и Стелла', de:'Alina und Stella', en:'Alina and Stella' },
    sub:{ ru:'Комиксы', de:'Comics', en:'Comics' },
    open:open
  };
  /* Register whenever app.js turns up.

     index.html loads the activities before js/app.js, so at this point
     GH.app usually does not exist yet — a bare guarded call here does
     nothing at all, silently, and the tile never appears. songbook.js
     already solved this; the fix is to retry once the document is ready.

     Load order should not decide whether a feature exists. */
  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register };
})();
