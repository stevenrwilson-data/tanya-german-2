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

  /* THE TEXT FOLLOWS THE EDITION.

     This used to return `line.de` whatever was on screen, so the button
     marked "English edition" swapped the DRAWING to English and left the
     reader in German. Half the screen changed language and the other half
     did not, which is not a translation aid, it is a mismatch.

     It was defensible once: German was the only text in comics.js and the
     German simply WAS the line. All 520 lines now carry all three
     languages, so the edition can mean what it says.

     German edition  -> the line is German, the reveal is her language
     English edition -> the line is English, and the reveal is the GERMAN,
                        because on an English page the German is the thing
                        worth uncovering rather than the thing already read

     The narrator is deliberately NOT tied to this. She can read the English
     page and still hear the German, which is a good way round; the DEU /
     РУС / ENG picker says which, and says so on screen. */
  function lineText(line){
    if (!line) return '';
    if (state && state.edition === 'deu') return line.de || line.en || '';
    return line.en || line.de || '';
  }

  /* Kept under its old name so the two call sites read unchanged; it is the
     line in whichever edition is showing. */
  function german(line){ return lineText(line); }

  function meaning(line){
    if (!line) return '';
    /* On the English page the German is the reveal. */
    if (state && state.edition !== 'deu') return line.de || '';
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

  /* ---------- what she has already read ----------

     Per profile and per target language, the same slot key reader.js uses,
     so Tanya and Nazar on one iPad do not inherit each other's progress.

     A comic counts as read when she reaches its LAST line and presses
     Done. Leaving early does not count — she did not finish it, and a
     tick against a comic she abandoned is a tick that means nothing.

     Not read off the event log. That log is capped and pruned, so it
     forgets, and a unit that quietly un-reads itself after a few hundred
     events is worse than no marker at all. */
  var READ_KEY = 'gh-comic-read';

  function readSlot(){
    return (GH.player ? GH.player.id() + ':' + GH.player.target() : 'solo');
  }

  function readAll(){
    try {
      var raw = window.localStorage.getItem(READ_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  /* comics.js gives a comic no id of its own, so its identity is the pair
     that does identify it. */
  function keyOf(c){ return c.unit + '-' + c.comic; }

  function hasRead(c){
    var d = readAll()[readSlot()] || {};
    return !!d[keyOf(c)];
  }

  function markRead(c){
    if (!c) return;
    try {
      var all = readAll();
      if (!all[readSlot()]) all[readSlot()] = {};
      all[readSlot()][keyOf(c)] = 1;
      window.localStorage.setItem(READ_KEY, JSON.stringify(all));
    } catch (e){}
  }

  function readIn(u){
    var n = 0;
    u.comics.forEach(function(c){ if (hasRead(c)) n++; });
    return n;
  }

  function unitDone(u){ return readIn(u) === u.comics.length; }

  /* The one unit to draw her eye to: the first she has not finished. All
     of them finished means nothing is highlighted, which is the right
     answer — there is nothing left to point at. */
  function nextUnit(){
    var us = units(), i;
    for (i = 0; i < us.length; i++) if (!unitDone(us[i])) return us[i].n;
    return null;
  }

  /* ---------- the list of comics ----------

     ONE UNIT AT A TIME, AND NEVER ON ARRIVAL.

     This used to build all forty-six cards in five sections in one pass.
     Two things were wrong with that and they are separate faults.

     The first is the pile itself: five units of thumbnails is a screen she
     has to scroll through to find anything, and it opened wherever the
     last screen happened to be scrolled to rather than at the top.

     The second is the jitter, which was not scrolling at all. Forty-six
     lazy images with no declared dimensions each reflow the page as they
     land, so the list moved under her thumb for as long as it took them
     all to arrive. Opening one unit cuts that to seven or ten, and the
     aspect-ratio now on .cm-thumb img stops the reflow entirely.

     So: the units are the arrival screen. One expands, the others stay
     closed, and the open one is scrolled to the top of the view. */

  function paintIndex(){
    var host = state.host;
    host.textContent = '';
    /* Back on the index she is not in a comic any more. Without this the
       language switch sent her straight back into the last one she opened,
       because GH.app.redraw asks `state.comic` which was never cleared. */
    state.comic = null;

    var head = el('div', 'card cm-intro');
    head.appendChild(el('h1', null, t('cmTitle')));
    head.appendChild(el('p', 'cm-lede', t('cmLede')));
    host.appendChild(head);

    var us = units();
    var suggest = nextUnit();

    /* The units. `.tile` is the app's own selectable card, so this looks
       and behaves like every other chooser in the app and is already in
       nav.js's KEEP list — a tap here cannot also advance something. */
    var picker = el('div', 'tiles');
    us.forEach(function(u){
      var isOpen = state.unit === u.n;
      var done = unitDone(u);
      var b = el('button', 'tile' +
        (done ? ' is-done' : '') +
        (!done && u.n === suggest ? ' is-next' : ''));
      b.type = 'button';
      b.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      b.appendChild(el('span', 'tile-glyph', done ? '\u2713' : '\ud83d\udcd6'));
      b.appendChild(el('span', 'tile-name', t('cmUnitN', { n:u.n })));
      b.appendChild(el('span', 'tile-sub', t('cmComicsN', { n:u.comics.length })));
      /* How far through it she is. Digits, so it needs no translating. */
      b.appendChild(el('span', 'tile-foot', readIn(u) + '/' + u.comics.length));
      b.addEventListener('click', function(){
        /* Tapping the open one closes it, so she can get back to a screen
           of nothing but the five choices without leaving and returning. */
        state.unit = isOpen ? null : u.n;
        state.scrollUnit = !isOpen;
        paintIndex();
      });
      picker.appendChild(b);
    });
    host.appendChild(picker);

    /* ONE unit's comics, or none. */
    var open = null;
    us.forEach(function(u){ if (u.n === state.unit) open = u; });
    if (open){
      var sec = el('section', 'cm-unit');
      sec.appendChild(el('h2', 'cm-unit-h',
        t('cmUnitN', { n:open.n }) + ' \u00b7 ' + t('cmComicsN', { n:open.comics.length })));
      var grid = el('div', 'cm-grid');
      open.comics.forEach(function(c){
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
        /* The tick rather than a word, so no new string has to exist in
           three languages for it. */
        cap.appendChild(el('span', 'cm-card-meta',
          t('cmPanelsN', { n:c.panels.length }) + (hasRead(c) ? '  \u2713' : '')));
        b.appendChild(cap);

        b.addEventListener('click', function(){ openComic(c); });
        grid.appendChild(b);
      });
      sec.appendChild(grid);
      host.appendChild(sec);

      /* The unit she just opened goes to the top of the view. Only when
         she opened it — a language switch repaints this screen too, and
         being scrolled somewhere else for that would be its own bug.

         After the append, so there is a laid-out element to scroll to. */
      if (state.scrollUnit){
        state.scrollUnit = false;
        window.setTimeout(function(){
          try { sec.scrollIntoView(true); } catch (e){}
        }, 0);
      }
    } else {
      /* Nothing open: she is at the top of the list of five, which is
         where arriving should always put her. */
      window.setTimeout(function(){
        try { window.scrollTo(0, 0); } catch (e){}
      }, 0);
    }

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

  /* ---------- the two views ----------

     One line at a time is the teaching view and stays the default. The
     whole text is the reference view: everything the comic says, on one
     screen, for reading it through or checking a line she half remembers.

     It shows the German AND the translation together, which the line view
     deliberately does not. That is the trade she makes by choosing it, and
     it is her choice — a reference she has to reveal thirteen times is not
     a reference. Remembered, so it is a decision made once. */
  var VIEW_KEY = 'gh-comic-view';

  function view(){
    try { return window.localStorage.getItem(VIEW_KEY) === 'all' ? 'all' : 'line'; }
    catch (e){ return 'line'; }
  }
  function setView(v){
    try { window.localStorage.setItem(VIEW_KEY, v === 'all' ? 'all' : 'line'); }
    catch (e){}
  }

  /* ---------- the narrator ----------

     THE COMICS HAVE ALMOST NO GERMAN. Thirteen lines of four hundred and
     forty-six, all of them in unit one. Play and Auto were built inside
     `if (de)`, so on the other four hundred and thirty-three there was no
     speech control at all — which is why the section reads as having no
     voice. It has one; there was nothing for it to say.

     So the narrator takes a language. German first wherever German
     exists, because that is what she is here to learn. Where it does not
     exist yet the German button is DISABLED rather than silent, which
     says plainly that the text is missing instead of looking broken, and
     her own language reads the comic in the meantime.

     Remembered as a preference, but checked against each comic: a saved
     choice of German is not honoured in a comic that has none. */
  var VOICE_KEY = 'gh-comic-voice';
  var VOICES = ['de', 'ru', 'en'];
  /* Their own names, as in the header switch, so no string has to exist
     in three languages for a button that says РУС. */
  var VOICE_LABEL = { de:'DEU', ru:'\u0420\u0423\u0421', en:'ENG' };

  function textIn(line, code){
    if (!line) return '';
    return (code === 'de' ? line.de : code === 'ru' ? line.ru : line.en) || '';
  }

  /* How many of this comic's lines exist in that language. Zero means the
     button is dead and has to look it. */
  function linesIn(c, code){
    var n = 0;
    flat(c).forEach(function(x){ if (textIn(x.line, code)) n++; });
    return n;
  }

  function savedVoice(){
    try {
      var v = window.localStorage.getItem(VOICE_KEY);
      return VOICES.indexOf(v) >= 0 ? v : null;
    } catch (e){ return null; }
  }
  function setSavedVoice(v){
    try { window.localStorage.setItem(VOICE_KEY, v); } catch (e){}
  }

  /* German unless this comic has none of it. Then her own interface
     language, then English — the only two things left that can speak. */
  function voiceForComic(c){
    var saved = savedVoice();
    if (saved && linesIn(c, saved)) return saved;
    if (linesIn(c, 'de')) return 'de';
    if (lang() !== 'de' && linesIn(c, lang())) return lang();
    return 'en';
  }

  function speak(text){
    if (!text) return;
    if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(text, state.voice);
    else if (GH.speech) GH.speech.say(text);
  }

  function openComic(c){
    /* WHICH comic. The log had an open and a leave for this screen, so all
       forty-six looked like one activity. */
    if (GH.events && GH.events.mark) GH.events.mark('read', 'comic:' + c.id);
    state.comic = c;
    state.panel = 0;
    state.line = 0;
    state.shown = false;
    state.edition = preferred();
    state.view = view();
    state.voice = voiceForComic(c);
    state.playing = false;
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
    /* stopAll(), not just speech.stop(): a Read-it-all chain keeps going
       on its callback, so cancelling the current utterance would only
       start the next one and follow her out of the comic. */
    back.addEventListener('click', function(){ stopAll(); paintIndex(); });
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

    host.appendChild(tools());
    host.appendChild(state.view === 'all' ? allBox() : readerBox());
    armNav();
  }

  /* The two controls that belong to the whole comic rather than to one
     line: which view, and which language the narrator reads in. */
  function tools(){
    var c = state.comic;
    var row = el('div', 'card-tools cm-tools');

    var v = el('div', 'mode-toggle');
    [['line', 'cmViewLine'], ['all', 'cmViewAll']].forEach(function(pair){
      var b = el('button', null, t(pair[1]));
      b.type = 'button';
      b.setAttribute('aria-pressed', state.view === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        if (state.view === pair[0]) return;
        stopAll();
        state.view = pair[0];
        setView(pair[0]);
        paintComic();
      });
      v.appendChild(b);
    });
    row.appendChild(v);

    /* The narrator's language. A language with nothing written in this
       comic is disabled, not hidden: she should be able to see that the
       German exists as an option and has not been filled in, rather than
       wonder why the app has three buttons here and two there. */
    var pick = el('div', 'mode-toggle cm-voice');
    pick.setAttribute('aria-label', '\ud83d\udd0a');
    VOICES.forEach(function(code){
      var n = linesIn(c, code);
      var b = el('button', null, VOICE_LABEL[code]);
      b.type = 'button';
      b.disabled = !n;
      b.setAttribute('aria-pressed', state.voice === code ? 'true' : 'false');
      if (!n) b.setAttribute('title', t('cmNoGerman'));
      b.addEventListener('click', function(){
        if (!n || state.voice === code) return;
        stopAll();
        state.voice = code;
        setSavedVoice(code);
        paintComic();
      });
      pick.appendChild(b);
    });
    row.appendChild(pick);

    return row;
  }

  /* ---------- the whole text, on one screen ---------- */

  function allBox(){
    var c = state.comic;
    var box = el('div', 'card cm-read');

    /* One button, two states. A Play-all with no way to interrupt it is a
       button that commits her to forty seconds of audio. */
    var acts = el('div', 'cm-acts');
    var pa = el('button', 'cm-btn cm-playall',
      state.playing ? ('\u25a0 ' + t('cmStop')) : ('\ud83d\udd0a ' + t('cmPlayAll')));
    pa.type = 'button';
    pa.disabled = !linesIn(c, state.voice);
    pa.addEventListener('click', function(){
      if (state.playing) stopAll(); else playAll();
    });
    acts.appendChild(pa);
    box.appendChild(acts);

    var wrap = el('div', 'cm-all');
    c.panels.forEach(function(p){
      var pan = el('div', 'cm-all-panel');
      pan.appendChild(el('p', 'cm-where', t('cmPanelN', { n:p.n })));

      p.lines.forEach(function(line){
        var row = el('div', 'cm-all-line');

        if (!isNarration(line.who)){
          var who = el('p', 'cm-who', speaker(line.who));
          if (line.who.indexOf('thought') >= 0) who.className = 'cm-who is-thought';
          row.appendChild(who);
        } else {
          row.appendChild(el('p', 'cm-who is-narr', t('cmNarration')));
        }

        /* The German is the line where it exists, and tapping it speaks
           it in whichever language the narrator is set to — so a tap is
           the same action as Play, on one line.

           `.cm-de` and not a new class, so nav.js's KEEP list already
           protects the tap from also advancing the screen. */
        var de = german(line);
        var heard = textIn(line, state.voice);
        if (de){
          var deBtn = el('button', 'cm-de', de);
          deBtn.type = 'button';
          deBtn.disabled = !heard;
          deBtn.addEventListener('click', function(){ speak(heard); });
          row.appendChild(deBtn);
        } else {
          /* No German yet: the English carries the line, and says which
             it is rather than passing itself off as the German. */
          var en = el('button', 'cm-de is-pending', line.en || '');
          en.type = 'button';
          en.disabled = !heard;
          en.addEventListener('click', function(){ speak(heard); });
          row.appendChild(en);
        }

        /* Both at once, which is the point of this view. */
        var mean = meaning(line);
        if (mean && mean !== (de || line.en)){
          row.appendChild(el('p', 'cm-mean', mean));
        }

        pan.appendChild(row);
      });

      wrap.appendChild(pan);
    });
    box.appendChild(wrap);

    /* Said once, at the foot, rather than against every line it is true
       of — which in unit two would be ten copies of the same sentence. */
    if (!linesIn(c, 'de')) box.appendChild(el('p', 'cm-pending-note', t('cmNoGerman')));

    return box;
  }

  /* Read the comic through, in the chosen language, skipping the lines
     that language has nothing for. Chained on the callback rather than a
     timer, so it follows the actual audio. */
  function playAll(){
    var c = state.comic;
    var seq = [];
    flat(c).forEach(function(x){
      var s = textIn(x.line, state.voice);
      if (s) seq.push(s);
    });
    if (!seq.length) return;

    state.playing = true;
    var i = 0;
    (function step(){
      if (!state.playing || i >= seq.length){
        state.playing = false;
        repaint();
        return;
      }
      var txt = seq[i++];
      if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(txt, state.voice, step);
      else step();
    })();
    repaint();
  }

  function stopAll(){
    state.playing = false;
    if (GH.speech) GH.speech.stop();
  }

  /* Swap the reader in place, so the picture above it does not reload. */
  function repaint(){
    if (!state.comic) return;
    var old = state.host.querySelector('.cm-read');
    if (!old || !old.parentNode) return;
    old.parentNode.replaceChild(state.view === 'all' ? allBox() : readerBox(), old);
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
    /* What the narrator can say for THIS line, in the language she chose.
       Not necessarily the German: on four hundred and thirty-three of the
       lines there is no German to say. */
    var heard = textIn(line, state.voice);

    if (de){
      /* the German, and tapping it reads the line aloud */
      var deBtn = el('button', 'cm-de', de);
      deBtn.type = 'button';
      deBtn.disabled = !heard;
      deBtn.addEventListener('click', function(){ say(heard); });
      box.appendChild(deBtn);
    } else {
      /* No German yet: the English carries the line and is still
         tappable, so the reader works and is plain about which it is
         rather than passing it off as the German. */
      var enBtn = el('button', 'cm-de is-pending', line.en || '');
      enBtn.type = 'button';
      enBtn.disabled = !heard;
      enBtn.addEventListener('click', function(){ say(heard); });
      box.appendChild(enBtn);
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
       that looks like the action button beside it is not a switch.

       BOTH USED TO BE INSIDE `if (de)`. Thirteen of the comics' four
       hundred and forty-six lines have German, so on the rest there was no
       Play button, no Auto, and no way to hear anything — which is why the
       section reads as having no voice at all. The gate is now on whether
       the NARRATOR has something to say, which it does on every line in at
       least one language. */
    if (heard){
      var play = el('button', 'cm-btn', '\ud83d\udd0a ' + t('cmPlay'));
      play.type = 'button';
      play.addEventListener('click', function(){ say(heard); });
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
        if (on) say(heard);
      });
      acts.appendChild(auto);
    }

    var mean = meaning(line);
    /* The reveal is gated on hearing it only when the German is what she
       is being read. With the narrator on her own language the line and
       its meaning are the same sentence, and making her hear Russian
       before she may read Russian is a lock on nothing. */
    if (mean && de && state.voice === 'de'){
      /* She should hear the German before she is allowed to read what it
         means, or the translation is simply the line and the German is
         decoration. The callback fires whether it finished or failed, so
         the button cannot stick — and on iOS, where nothing speaks until a
         tap has unlocked audio, it enables at once rather than locking her
         out. */
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
    } else if (mean && mean !== (de || line.en)){
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
      if (at === lines.length - 1){
        /* The last line, pressed Done: that is what finishing a comic
           means, and it is the only thing that ticks one. */
        markRead(state.comic);
        stopAll();
        paintIndex();
        return;
      }
      step(1);
    });
    nav.appendChild(next);
    box.appendChild(nav);

    /* Say it on arrival only if she has asked for that. Off by default:
       pressing Hear is one tap, and a line that speaks itself cannot be
       un-spoken. */
    /* Say it on arrival only if she has asked for that, and in whichever
       language the narrator is set to. */
    if (heard && autoRead()) say(heard);

    return box;
  }

  /* Focus the advance button and start nav.js's bubble guard.

     Called after the box is in the document, not while it is being
     built — nav.js looks the button up in the page, and a node that has
     not been appended yet is not in the page. */
  function armNav(){
    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  /* One line, in the narrator's language, with the reveal button following
     the audio. sayIn() rather than say(): say() is hardcoded to a German
     voice reading de-DE, which is right everywhere else in the app and
     wrong for a comic being read in Russian. */
  function say(text){
    if (!text) return;
    state.heard = false;
    if (state.showBtn) state.showBtn.disabled = true;
    function done(){
      state.heard = true;
      if (state.showBtn) state.showBtn.disabled = false;
    }
    if (GH.speech && GH.speech.sayIn) GH.speech.sayIn(text, state.voice, done);
    else GH.speech.say(text, done);
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
    /* `unit:null` — she arrives at the five choices with none of them
       opened, which is the whole point of the change. */
    state = { host:host, onExit:onExit, comic:null, panel:0, line:0,
              edition:DEFAULT_EDITION, heard:false, showBtn:null,
              unit:null, scrollUnit:false };
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
