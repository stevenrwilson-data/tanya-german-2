/* Screen wiring + the hub. Add new games with GH.app.register(). */

window.GH = window.GH || {};

GH.app = (function(){

  var t = function(k, v){ return GH.i18n.t(k, v); };
  var view = document.getElementById('view');
  var extras = [];

  /* A new game only needs: an id, names in the three languages, a glyph,
     and an open(container, onExit) function. */
  function register(activity){ extras.push(activity); }

  /* so the grammar section can hand straight over to the game that drills
     what she has just read, without knowing anything about it beyond its id */
  function find(id){
    for (var i = 0; i < extras.length; i++) if (extras[i].id === id) return extras[i];
    return null;
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function countBlanks(s){
    return GH.text.blankUnits(s.de, s.blanks).length;
  }

  function sentencesIn(catId){
    return (GH_BANK.sentences || []).filter(function(s){ return s.cat === catId; });
  }

  /* `id` is the sixth argument and every caller must pass it, because a
     tile with no id cannot be counted as seen — and "never on screen" is
     the one diagnosis nothing else can produce. An unused feature and an
     undiscovered one need opposite fixes.

     Fifteen call sites, so the marking happens HERE rather than at each
     one. Passing the id is unavoidable — this function has no other way to
     know what it is drawing — but the observer wiring is written once. */
  function tile(glyph, name, sub, footer, onOpen, id){
    var b = el('button', 'tile');
    b.type = 'button';
    if (glyph) b.appendChild(el('span', 'tile-glyph', glyph));
    b.appendChild(el('span', 'tile-name', name));
    if (sub) b.appendChild(el('span', 'tile-sub', sub));
    if (footer) b.appendChild(el('span', 'tile-de', footer));
    if (onOpen) b.addEventListener('click', onOpen);
    else b.disabled = true;
    if (id){
      b.setAttribute('data-tile', id);
      watch(b);
    }
    return b;
  }

  /* ---------- was this tile ever actually on screen? ----------

     `seen()` in events.js could not be called until something knew when a
     tile became visible. Scroll position is the wrong instrument: a tile
     can be below the fold on a long hub and never enter the viewport, and
     that is exactly the case worth recording.

     IntersectionObserver, one instance for the whole page, reused across
     repaints — the hub rebuilds on every filter change and language switch,
     and a new observer per paint would leak one per rebuild.

     `unobserve` on first sight, because a tile she scrolls past forty times
     is one impression. events.seen() also dedupes per session, so this is
     belt and braces; the cheap half is here so forty callbacks do not
     become forty storage writes.

     No IntersectionObserver — old Safari, or a test — and nothing is
     recorded. Undercounting is the safe direction: it makes a tile look
     undiscovered, which is a prompt to look rather than a false all-clear.

     THRESHOLD 0.5 and not 0. A single pixel of a tile clipping into the
     viewport is not her having seen it, and 0 would mark the whole hub as
     seen the moment she flicked to the bottom. */
  var watcher = null;

  function watch(node){
    if (!window.IntersectionObserver) return;
    if (!watcher){
      watcher = new window.IntersectionObserver(function(rows){
        rows.forEach(function(r){
          if (!r.isIntersecting) return;
          var id = r.target.getAttribute('data-tile');
          if (id && GH.events && GH.events.seen) GH.events.seen(id);
          watcher.unobserve(r.target);
        });
      }, { threshold: 0.5 });
    }
    watcher.observe(node);
  }

  /* Sections register themselves for the jump bar as they are built, so
     the bar always matches what is actually on the page — a section that
     gets skipped (no data yet) never shows up as a dead link. */
  var jumps = [];

  /* Topic filter, following the same rules as the pink math org list:
     a set of active topics OR-matched together, "All" as a real state
     that clears the rest, and the set emptying out re-activates "All"
     rather than leaving nothing selected.

     The chips stay collapsed behind a button — seventeen topics is far
     too much furniture to leave on screen above the content. */
  var activeCats = {};
  var catCount = 0;
  var filterOpen = false;

  function keep(catId){
    return catCount === 0 || !!activeCats[catId];
  }

  function allTopics(){
    return (GH_BANK.categories || []);
  }

  function toggleCat(id){
    if (id === 'all'){
      activeCats = {}; catCount = 0;
    } else if (activeCats[id]){
      delete activeCats[id]; catCount--;
    } else {
      activeCats[id] = true; catCount++;
    }
    hub();
  }

  function filterBlock(){
    var wrap = el('div', 'filterwrap');

    var toggle = el('button', 'filter-toggle' + (catCount ? ' has' : ''));
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', filterOpen ? 'true' : 'false');
    toggle.appendChild(el('span', null, t('filterBy')));
    toggle.appendChild(el('span', 'filter-caret', filterOpen ? '▴' : '▾'));
    if (catCount){
      toggle.appendChild(el('span', 'filter-badge', catCount));
    }
    toggle.addEventListener('click', function(){
      filterOpen = !filterOpen;
      hub();
    });
    wrap.appendChild(toggle);

    if (!filterOpen) return wrap;

    var chips = el('div', 'chips');

    var all = el('button', 'chip' + (catCount ? '' : ' on'), t('allTopics'));
    all.type = 'button';
    all.setAttribute('aria-pressed', catCount ? 'false' : 'true');
    all.addEventListener('click', function(){ toggleCat('all'); });
    chips.appendChild(all);

    allTopics().forEach(function(c){
      var on = !!activeCats[c.id];
      var b = el('button', 'chip' + (on ? ' on' : ''));
      b.type = 'button';
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.appendChild(el('span', 'chip-glyph', c.glyph));
      b.appendChild(document.createTextNode(' ' + GH.i18n.pick(c)));
      b.addEventListener('click', function(){ toggleCat(c.id); });
      chips.appendChild(b);
    });
    wrap.appendChild(chips);
    wrap.appendChild(el('p', 'filter-hint', t('filterHint')));
    return wrap;
  }

  function section(headKey, count){
    var wrap = el('section', 'hub-section');
    wrap.id = 'sec-' + headKey;
    var head = el('div', 'hub-head');
    head.appendChild(el('h2', null, t(headKey)));
    if (count) head.appendChild(el('span', 'hub-count', count));
    wrap.appendChild(head);
    var tiles = el('div', 'tiles');
    wrap.appendChild(tiles);
    wrap._tiles = tiles;
    jumps.push({ id: wrap.id, key: headKey, node: wrap });
    return wrap;
  }

  /* Built last but inserted at the top, once every section is known. */
  function jumpBar(){
    if (jumps.length < 2) return null;
    var bar = el('nav', 'jumpbar');
    bar.setAttribute('aria-label', t('jumpTo'));
    jumps.forEach(function(j){
      var b = el('button', 'jump');
      b.type = 'button';
      /* full label on a wide screen, just the section number on a phone;
         CSS picks which one shows */
      var full = t(j.key);
      var parts = full.split(' · ');
      b.appendChild(el('span', 'jump-long', full));
      b.appendChild(el('span', 'jump-short', parts.length > 1 ? parts[0] : full));
      b.addEventListener('click', function(){
        if (j.node.scrollIntoView) j.node.scrollIntoView({ behavior:'smooth', block:'start' });
      });
      bar.appendChild(b);
    });
    return bar;
  }

  /* Who is playing, at the top of the hub, always.

     Both fields change how the app talks to her. Every pet line carries
     {name}, and Russian marks the listener's gender in the ordinary past
     tense — «ты закончила» against «ты закончил» — so an app that does not
     know these two things is either impersonal or wrong.

     Permanent rather than a one-time prompt. The first version hid itself
     once both were answered, which meant the only way back to them was
     Settings — and a profile you cannot see is a profile nobody edits.
     It sits collapsed to a single line once filled in, and opens on a tap.

     Only ever the person currently playing. Adding and removing profiles
     stays in Settings, because that is a different job. */

  var openWho = false;

  function genderWord(g){
    return g === 'f' ? t('stGenderF') : g === 'm' ? t('stGenderM') : t('stGenderNone');
  }

  function whoCard(){
    var name = (GH.player.current().name || '').trim();
    var g = GH.player.gender();
    var blank = !name || !g;

    var box = document.createElement('div');
    /* surf-paper carries both the background and the text colour, so the
       controls inside it cannot end up light-on-light. See the surfaces
       block at the top of style.css. */
    box.className = 'who-card surf-paper' + (blank ? ' is-blank' : '') + (openWho ? ' is-open' : '');

    /* The collapsed line: who the app thinks you are, and a way in.
       Opened automatically while either field is still missing, because a
       summary reading 'someone, unspecified' is not worth a tap. */
    if (!blank && !openWho){
      var row = document.createElement('button');
      row.type = 'button';
      row.className = 'who-summary';
      var whoTxt = document.createElement('span');
      whoTxt.className = 'who-summary-name';
      whoTxt.textContent = name;
      row.appendChild(whoTxt);
      var gTxt = document.createElement('span');
      gTxt.className = 'who-summary-g';
      gTxt.textContent = genderWord(g);
      row.appendChild(gTxt);
      var edit = document.createElement('span');
      edit.className = 'who-summary-edit';
      edit.textContent = t('stRename');
      row.appendChild(edit);
      row.addEventListener('click', function(){ openWho = true; hub(); });
      box.appendChild(row);
      return box;
    }

    var h = document.createElement('h2');
    h.className = 'who-head';
    h.textContent = t('whoHead');
    box.appendChild(h);

    var note = document.createElement('p');
    note.className = 'who-note';
    note.textContent = t('whoNote');
    box.appendChild(note);

    var row2 = document.createElement('div');
    row2.className = 'who-row';
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'who-input';
    input.value = name;
    input.placeholder = t('stNamePlaceholder');
    input.setAttribute('aria-label', t('stNamePlaceholder'));
    row2.appendChild(input);
    box.appendChild(row2);

    var gl = document.createElement('span');
    gl.className = 'who-label';
    gl.textContent = t('stGenderHead');
    box.appendChild(gl);

    var chosenG = g;
    var toggle = document.createElement('div');
    toggle.className = 'mode-toggle who-toggle';
    [['f', 'stGenderF'], ['m', 'stGenderM'], ['', 'stGenderNone']].forEach(function(pair){
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = t(pair[1]);
      b.setAttribute('aria-pressed', chosenG === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){
        chosenG = pair[0];
        var all = toggle.querySelectorAll('button');
        for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-pressed', 'true');
      });
      toggle.appendChild(b);
    });
    box.appendChild(toggle);

    var acts = document.createElement('div');
    acts.className = 'who-acts';

    var save = document.createElement('button');
    save.type = 'button';
    save.className = 'btn btn-primary';
    save.textContent = t('stSave');
    save.addEventListener('click', function(){
      var fresh = (input.value || '').trim();
      var had = (GH.player.current().name || '').trim();
      GH.player.rename(GH.player.id(), fresh);
      GH.player.setGender(GH.player.id(), chosenG);
      /* Being told a name and answering 'hello again' is the wrong reply —
         it is the first time the app can use it, so treat it as arriving.
         Only when the name actually changed, or every save re-greets. */
      if (GH.coach) GH.coach.regreet(!!fresh && fresh !== had);
      openWho = false;
      hub();
    });
    acts.appendChild(save);

    /* Only offered once there is something to collapse back to. */
    if (!blank){
      var shut = document.createElement('button');
      shut.type = 'button';
      shut.className = 'btn btn-ghost';
      shut.textContent = t('whoLater');
      shut.addEventListener('click', function(){ openWho = false; hub(); });
      acts.appendChild(shut);
    }

    box.appendChild(acts);
    return box;
  }

  /* Where she was on the hub when she left it.

     Every launch below clears the view and hands it to an activity, and
     coming back rebuilds the hub from scratch — which put her at the top
     of a very long page every time, however far down the section she had
     been playing from. Recorded on the way out, restored on the way back.

     Restored without smooth behaviour and after the page has been
     painted, so it lands rather than animating up from the top. */
  var hubScroll = 0;

  /* Declared here rather than beside petStrip() because leaving() below
     clears them, and a var used forty lines above its declaration reads as
     a bug even though hoisting makes it work. */
  var sawPet = null;          /* the pet's greeting, once per arrival */

  function leaving(){
    hubScroll = window.pageYOffset ||
      (document.documentElement && document.documentElement.scrollTop) || 0;
    /* The pet greets once per ARRIVAL, and leaving is what makes the next
       paint an arrival. Without this it would speak once ever, because
       `sawPet` is set on the first paint and the hub repaints on every
       language switch, filter change and return from a game.

       The grid is not this file's business any more: it is an overlay in
       petstrip.js, and it closes itself. */
    sawPet = null;
    /* And whatever she was doing has ended. */
    closeActivity();
  }

  function restoreScroll(){
    if (!hubScroll || !window.scrollTo) return;
    var y = hubScroll;
    /* Consumed, not kept. The jump bar scrolls to a section itself and the
       filter row rebuilds the hub — either would be dragged back to a
       stale position by a restore that fires every time. This one is for
       coming back from an activity, which happens once. */
    hubScroll = 0;
    /* after paint: the page has to be tall enough to scroll to before the
       browser will honour it */
    if (window.requestAnimationFrame) window.requestAnimationFrame(function(){ window.scrollTo(0, y); });
    else window.scrollTo(0, y);
  }

  /* Handing a screen over, and remembering how to redraw it.

     GH.app.redraw is what the language switch calls. hub() sets it to
     itself, so any activity that did not overwrite it sent her back to
     the top of the main page the moment she touched РУС / DEU / ENG —
     mid-song, mid-round, mid-story. Three activities set it and eighteen
     did not.

     So the hand-off is wrapped once here rather than trusted to every
     activity. The default is to reopen the same activity, which keeps her
     where she is at the cost of its internal position — back at the song
     list rather than in the song. An activity that can do better sets
     GH.app.redraw itself inside open(), the way comic.js and the reader
     do, and this never overwrites that: it is set BEFORE open() runs, so
     open() has the last word. */
  function launch(fn, id){
    /* Every activity is handed off through here, so this is where the event
       log is told what she is using. Doing it in the activities would be
       forty-five call sites and forty-five chances to pass the wrong name;
       doing it here means a game added next month is attributed without
       being told to be.

       Set BEFORE fn() runs, so anything the activity grades on its first
       paint is already attributed. */
    if (GH.events){
      /* Close the previous activity before opening the next. She can go
         game -> game without touching the hub, and without this the first
         one would never record a leave. */
      closeActivity();
      GH.events.setGame(id || '');
      GH.events.opened(id || '');
      openId = id || '';
      openAt = GH.events.graded();
      openedAt = Date.now();
    }
    GH.app.redraw = function(){ view.textContent = ''; fn(); };
    view.textContent = '';
    fn();
  }

  /* What she was in, and how many answers the log held when she went in.
     The difference on the way out is how many she gave — which makes a
     bounce visible, and a bounce is the one thing the answer log can never
     show on its own. */
  var openId = '';
  var openAt = 0;
  var openedAt = 0;

  function closeActivity(){
    if (!GH.events || !openId) return;
    GH.events.left(openId,
      Math.max(0, GH.events.graded() - openAt),
      openedAt ? Date.now() - openedAt : 0);
    openId = '';
    openAt = 0;
    openedAt = 0;
  }

  /* SHE DOES NOT ALWAYS LEAVE BY THE BACK BUTTON.

     Closing the tab, switching apps, the phone locking — none of those ran
     `leaving()`, so the LAST activity of every single session had an open
     row and no leave row. Its duration was lost, and it was always the
     activity she was most engaged with, because it is the one she was still
     in.

     `visibilitychange` to hidden is the event that actually fires on a
     phone; `pagehide` covers the desktop close. `beforeunload` is
     deliberately not used — it is unreliable on iOS and firing three
     handlers for one departure would record three leaves.

     Switching apps for a moment and coming back must not lose the rest of
     the visit, so the activity is remembered in `pausedIn` and the clock
     restarted when she returns. Without that, everything after her first
     app-switch would be untimed, and a phone user switches away
     constantly.

     `closeActivity()` clears `openId`, so a second hide is a no-op. */
  var pausedIn = '';

  function pause(){
    if (!openId) return;
    pausedIn = openId;
    closeActivity();
  }

  function resume(){
    if (!pausedIn || openId) return;
    /* A second open row, deliberately: she did come back to it, and two
       visits of four minutes is a truer picture than one of eight. */
    if (GH.events){
      GH.events.opened(pausedIn);
      openId = pausedIn;
      openAt = GH.events.graded();
      openedAt = Date.now();
    }
    pausedIn = '';
  }

  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') pause();
    else resume();
  });
  window.addEventListener('pagehide', pause);

  /* ---------- her pets, at the top ----------

     A row of small faces above the greeting, and a grid behind them.
     Tapping an unowned pet in the grid goes to the store AT that pet
     rather than at the top of a shelf of sixteen.

     The pet speaks once per arrival, not once per paint. `sawPet` is
     cleared by leaving() the way the coach's greeting is, so switching
     language or coming back from a game does not make the pet repeat
     itself — one utterance per screen entry was the rule from the pet
     brief and it applies here more than anywhere, because the hub
     repaints often. */
  function petSpeak(pets){
    if (sawPet !== null) return sawPet;
    sawPet = '';
    if (!GH.petVoice || !GH.petVoice.bandLine || !pets.length) return sawPet;
    /* The first of her chosen pets does the talking. With three on the
       shelf, three greetings on arrival is noise. */
    var line = GH.petVoice.bandLine(pets[0].id, 'welcome');
    if (line) sawPet = line;
    return sawPet;
  }

  /* The FACES live in the header now — see js/petstrip.js. What stays here
     is the one thing that does not belong in a header: the sentence.

     A line of dialogue in a topbar is a banner, and it would follow her
     into every round. The pet brief's rule is one utterance per screen
     entry, and the hub is the entry. */
  function petStrip(){
    var pets = GH.store.strip();
    if (!pets.length) return;

    var line = petSpeak(pets);
    if (!line) return;

    var wrap = el('div', 'pt-strip');
    var say = el('button', 'pt-strip-say');
    say.type = 'button';

    /* The pet doing the talking, at a size where she can see it.

       The 26px face in the header is a control — enough to tell which
       animal and to be tapped. A card with a paragraph of speech in it and
       a thumbnail the size of a full stop does not look like the pet is
       speaking; it looks like a caption. So the greeting gets its own
       portrait.

       `pets[0]` is the speaker — petSpeak() picks the first of her chosen
       pets, because three greetings on arrival is noise — and `pic` here is
       a fresh element: strip() builds new <img>s per call, so the one in
       the header is not stolen. */
    if (pets[0] && pets[0].pic){
      pets[0].pic.classList.add('pt-strip-face');
      say.appendChild(pets[0].pic);
    }

    var words = el('span', 'pt-strip-words');
    /* Whose voice it is. With three pets on the shelf the portrait alone
       is not always enough, and the name is the reason she chose it. */
    words.appendChild(el('span', 'pt-strip-who', pets[0] ? pets[0].name : ''));
    /* German first, her language under it, and the German is what is
       spoken — the same rule as every other surface. */
    words.appendChild(el('span', 'pt-strip-de', line.de));
    if (line.tr) words.appendChild(el('span', 'pt-strip-tr', line.tr));
    say.appendChild(words);

    say.addEventListener('click', function(){ GH.speech.say(line.say); });
    wrap.appendChild(say);
    view.appendChild(wrap);

    /* The header's faces can be stale: she may have bought or swapped a
       pet since it was built. */
    if (GH.petStrip) GH.petStrip.refresh();
  }

  /* A NEW BUILD IS AVAILABLE.

     It offers; it does not reload. Reloading under someone mid-round throws
     the round away, and an app that restarts without being asked is
     frightening rather than helpful.

     Dismissable, and dismissing lasts for the session — she is allowed to
     not care. It reappears next time she opens the app, because eventually
     she does need the new one. */
  var updateShown = false;
  var updateHidden = false;

  function updateBar(){
    if (updateShown || updateHidden) return;
    if (!GH.build || !GH.build.pending()) return;
    updateShown = true;

    var bar = el('div', 'update-bar');
    bar.appendChild(el('span', 'update-msg', GH.i18n.t('upNew')));

    var go = el('button', 'update-go', GH.i18n.t('upReload'));
    go.type = 'button';
    go.addEventListener('click', function(){ GH.build.reload(); });
    bar.appendChild(go);

    var no = el('button', 'update-no', '\u00d7');
    no.type = 'button';
    no.setAttribute('aria-label', GH.i18n.t('close'));
    no.addEventListener('click', function(){
      updateHidden = true;
      if (bar.parentNode) bar.parentNode.removeChild(bar);
    });
    bar.appendChild(no);

    document.body.appendChild(bar);
  }

  function hub(){
    GH.speech.stop();
    GH.app.redraw = hub;
    view.textContent = '';

    /* The butler, on arrival and only on the hub. He decides for himself
       whether he is due — a written offer line, at least one tour with
       steps, first visit, not dismissed — so this is one line and no
       conditions.

       That list is longer than it was because "script present" was not
       enough: the script ships as an object full of empty strings, which
       is truthy, and he opened an empty bubble over the whole page with
       nothing to close it with. */
    /* FIRST RUN COMES FIRST.

       Before Waddles can use her name, something has to ask for it. The
       welcome takes over the screen only on a genuinely fresh install and
       hands straight to him when it is done — so she tells the app her
       name and the very next thing that happens is someone using it.

       WHEN IT FINISHES, THE HUB IS DRAWN AGAIN — not the butler directly.

       The early return below skips everything that fills the hub, and
       `view.textContent = ''` has already emptied it. So handing straight
       to the butler left her on a blank page with a header and nothing
       else: the whole site, gone, right after she typed her name.

       Calling `hub()` again is the fix and the honest one. The welcome is
       no longer due the second time through, so it falls past this line,
       paints normally, and offers the butler at the end like any other
       visit. One code path, not two. */
    if (GH.welcome && GH.welcome.open(hub)) return;

    if (GH.butler) GH.butler.offer();

    /* She is here, so today counts — recorded before anything can decide
       not to. coach.js counts a day inside greeting(), which is only
       called below when the coach is unmuted, so muting the encouraging
       sentence quietly stopped the attendance count. This is not attached
       to anything she can switch off.

       And the current activity is cleared. An answer with no activity is
       honest; an answer attributed to the last screen she was on is a lie
       in the data. */
    if (GH.events){ GH.events.visit(); GH.events.setGame(''); }
    /* Once a day, on arrival at the hub. Silent in every failure case, and
       silent entirely until an endpoint is configured. */
    if (GH.send && GH.send.maybe) GH.send.maybe();

    /* Is she running an old build? Asked here rather than on a timer, so it
       happens when she arrives at the hub and never while she is mid-round.
       Rate-limited inside GH.build to once every twenty minutes. */
    if (GH.build && GH.build.check){
      GH.build.check(function(){ updateBar(); });
      if (GH.build.pending()) updateBar();
    }

    /* before anything else, because it changes what everything else says */
    view.appendChild(whoCard());

    /* Her pets, and one of them speaking.

       Sixteen pets, a `welcome` line written for every one of them, and
       until now the pet only ever appeared on the end screen — so buying
       Mimi bought a thing that showed up after a round and was absent from
       the screen she opens. The lines existed for months; nothing greeted
       her. */
    if (GH.store && GH.store.strip) petStrip();

    /* The purse used to be printed here. It is in the HEADER now — visible
       on every screen instead of this one, and tappable, which is the whole
       point: the balance is the door to the store.

       Removed rather than kept alongside, because the same number twice on
       one screen makes both look like decoration. */
    if (GH.purse) GH.purse.refresh();

    /* a sentence when she arrives, said once per visit */
    if (GH.coach && !GH.coach.muted()){
      var g = GH.coach.greeting();
      var hi = document.createElement('p');
      hi.className = 'co-hello';
      hi.textContent = t(g.key, g.v || {});
      view.appendChild(hi);
    }

    /* What is waiting, and one tap to it.

       The scheduler has always known how many items are due and which
       area is weakest; until now it kept that to itself and she had to
       open the progress screen to find out. Somebody deciding whether to
       open the app at all does not first go looking for a report. */
    if (GH.tutor && GH.coach && !GH.coach.muted()){
      var nx = GH.tutor.whatNext();
      if (nx && (nx.due || nx.game)){
        var box = document.createElement('div');
        box.className = 'nx-card';

        var line = document.createElement('p');
        line.className = 'nx-line';
        line.textContent = nx.due ? t('nxDue', { n:nx.due })
          : (nx.name ? t('nxWeak', { a:nx.name }) : t('nxJustPlay'));
        box.appendChild(line);

        var act = GH.app.find && nx.game ? GH.app.find(nx.game) : null;
        if (act){
          var go = document.createElement('button');
          go.type = 'button';
          go.className = 'btn btn-primary nx-go';
          go.textContent = t('nxStart', { game:GH.i18n.pick(act.name) });
          go.addEventListener('click', function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ act.open(view, hub); }, nx.game);
          });
          box.appendChild(go);
        }
        view.appendChild(box);
      }
    }
    jumps = [];

    view.appendChild(el('p', 'eyebrow', 'Deutsch · Русский · English'));
    view.appendChild(el('h1', null, t('hubTitle')));
    view.appendChild(el('p', 'lede', t('hubLede')));

    /* sentences by topic */
    var cats = GH_BANK.categories || [];
    var sec = section('sentencesHead', t('byTopic'));
    cats.filter(function(c){ return keep(c.id); }).forEach(function(cat){
      var list = sentencesIn(cat.id);
      var blanks = list.reduce(function(sum, s){ return sum + countBlanks(s); }, 0);
      sec._tiles.appendChild(tile(
        cat.glyph,
        GH.i18n.pick(cat),
        t('itemsN', { n:list.length }),
        t('blanksN', { n:blanks }),
        list.length ? function(){ openSentences(cat); } : null,
        'fill-blank:' + cat.id
      ));
    });
    if (sec._tiles.children.length) view.appendChild(sec); else jumps.pop();

    /* stories */
    var stories = GH_BANK.stories || [];
    var shown2 = stories.filter(function(x){ return keep(x.cat); });
    var sec2 = section('storiesHead', t('storiesN', { n:shown2.length }));
    shown2.forEach(function(story){
      var blanks = (story.sentences || []).reduce(function(sum, s){ return sum + countBlanks(s); }, 0);
      var cat = cats.filter(function(c){ return c.id === story.cat; })[0];
      sec2._tiles.appendChild(tile(
        '📖',
        GH.i18n.pick(story.title),
        t('itemsN', { n:(story.sentences || []).length }),
        cat ? GH.i18n.pick(cat) + ' · ' + t('blanksN', { n:blanks }) : t('blanksN', { n:blanks }),
        function(){ openStory(story); },
        'story:' + (story.id || story.cat)
      ));
    });
    if (sec2._tiles.children.length) view.appendChild(sec2); else jumps.pop();

    /* vocab sets: words first, then the sentences that use them */
    if (window.GH_VOCAB && GH.vocab){
      var sec25 = section('vocabHead', t('byTopic'));
      var any = false;
      /* the original eight plus the vocabulary-only topics */
      allTopics().filter(function(c){ return keep(c.id); }).forEach(function(cat){
        GH.vocab.setsFor(cat.id).forEach(function(set, i){
          any = true;
          sec25._tiles.appendChild(tile(
            cat.glyph,
            GH.i18n.pick(cat) + ' ' + (i + 1),
            t('vocabSetN', { n:set.length }),
            set.slice(0, 3).map(function(w){ return w.de; }).join(' · '),
            function(){ openVocab(cat, set, i + 1); },
            'vocab:' + cat.id
          ));
        });
      });
      if (any) view.appendChild(sec25); else jumps.pop();
    }

    /* Section 4: longer stories, one blank per sentence */
    if (window.GH_LONG && GH_LONG.length){
      var shown4 = GH_LONG.filter(function(x){ return keep(x.cat); });
      var sec4 = section('longStoriesHead', t('storiesN', { n:shown4.length }));
      shown4.forEach(function(story){
        var c = cats.filter(function(x){ return x.id === story.cat; })[0];
        sec4._tiles.appendChild(tile(
          '📚',
          GH.i18n.pick(story.title),
          t('itemsN', { n:story.sentences.length }),
          c ? GH.i18n.pick(c) : null,
          function(){ openLongStory(story); },
          'long-story:' + (story.id || story.cat)
        ));
      });
      if (sec4._tiles.children.length) view.appendChild(sec4); else jumps.pop();
    }

    /* Lessons, in their own row above the games.

       A lesson is where a rule is learned and a game is where it is
       drilled. Doing those in the other order is how a game becomes
       guessing, so the row sits above. */
    /* Two kinds of thing live here now: the seventeen grammar lessons,
       which GH.lessons owns, and anything that registers with
       `kind:'lesson'` — which is how Tanya's course lessons arrive, and
       how the next set will.

       The registered ones come FIRST. Hers are what she is being taught
       this month; the grammar lessons are a permanent library and can
       wait below. */
    var taught = extras.filter(function(a){ return a.kind === 'lesson'; });
    var grammarLessons = (GH.lessons && GH.lessons.all()) || [];

    if (taught.length || grammarLessons.length){
      var secL = section('lsHead');

      taught.forEach(function(a){
        secL._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name),
          GH.i18n.pick(a.sub), null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ a.open(view, hub); }, a.id);
          }, a.id));
      });

      grammarLessons.forEach(function(l){
        secL._tiles.appendChild(tile(l.glyph || '\ud83d\udcda',
          GH.i18n.pick(l.name), GH.i18n.pick(l.sub),
          GH.lessons.done(l.id) ? '\u2713' : null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ GH.lessons.open(view, hub, l.id); }, 'lessons');
          }));
      });

      view.appendChild(secL);
    }

    /* the word list — reference, not an exercise */
    if (window.GH_VOCAB && GH.reference){
      var secR = section('refHead');
      /* how she is doing comes first — it is the thing she opens */
      if (GH.progressView){
        secR._tiles.appendChild(tile('📈', t('pvTitle'), t('pvSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.progressView.open(view, hub); }, 'progress-view');
        }));
      }
      secR._tiles.appendChild(tile('📖', t('refTitle'),
        t('refCount', { n:GH_VOCAB.length }), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.reference.open(view, hub); }, 'reference');
        }));
      /* what she has done, and what it buys */
      if (GH.awardsView){
        secR._tiles.appendChild(tile('⭐', t('awTitle'),
          t('awEarnedN', { a:GH.awards.earned(), b:GH.awards.total() }), null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ GH.awardsView.open(view, hub); }, 'awards-view');
          }));
      }
      if (GH.store && GH.coins){
        secR._tiles.appendChild(tile('◈', t('stStore'), GH.coins.label(), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.store.open(view, hub); }, 'store');
        }));
      }
      /* who is playing and how questions get chosen */
      if (GH.settings){
        secR._tiles.appendChild(tile('⚙️', t('stTitle'), t('stSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.settings.open(view, hub); }, 'settings');
        }));
      }
      /* Anything else that is reference rather than a game.

         Same opt-in as `kind:'read'` below: an activity says where it
         belongs and this file does not carry a list of ids. The
         dictionary is the first, and it appears only when GH_DICT
         exists — an empty dictionary should show no tile at all. */
      extras.filter(function(a){ return a.kind === 'ref'; }).forEach(function(a){
        if (a.id === 'dictionary' && !(window.GH_DICT && GH_DICT.length)) return;
        secR._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name),
          GH.i18n.pick(a.sub), null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ a.open(view, hub); }, a.id);
          }, a.id));
      });

      /* the rules, beside the words */
      if (GH.grammar){
        secR._tiles.appendChild(tile('📐', t('grTitle'), t('grSub'), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ GH.grammar.open(view, hub); }, 'grammar');
        }));
      }
      view.appendChild(secR);
    }

    /* Read and listen.

       Everything else in the app asks her a question. These two do not:
       she reads and she listens, and nothing grades her. That is a
       different kind of thing and it was getting lost at the bottom of
       the games row.

       An activity opts in with `kind:'read'` rather than the section
       being a list of ids here — a new one should not need app.js
       edited. */
    var reading = extras.filter(function(a){ return a.kind === 'read'; });
    if (reading.length){
      var secRL = section('rlHead');
      reading.forEach(function(a){
        secRL._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name), GH.i18n.pick(a.sub),
          null, function(){
            GH.speech.stop();
            leaving();
            view.textContent = '';
            launch(function(){ a.open(view, hub); }, a.id);
          }, a.id));
      });
      view.appendChild(secRL);
    }

    /* anything registered later */
    /* Games is everything that is neither reading nor reference. It used
       to be `kind !== 'read'`, which is a default-yes list: the first
       activity to arrive with a third kind appeared here as well as in
       its own section, twice on one screen, with nothing to say so. */
    var games = extras.filter(function(a){
      return a.kind !== 'read' && a.kind !== 'ref' && a.kind !== 'lesson';
    });
    if (games.length){
      var sec3 = section('gamesHead');

      /* What each one IS, before she has to open fifteen of them to find
         out. A glyph and a name do not tell her whether she wants it. */
      if (GH.guide){
        var gb = el('button', 'btn btn-quiet gd-open', t('gdOpen'));
        gb.type = 'button';
        gb.addEventListener('click', function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){
            GH.guide.open(view, hub, function(a){ play(a); });
          }, 'guide');
        });
        /* Before the tiles, not after. section() has already appended the
           grid by the time we get here, so appendChild would put the
           button under fifteen tiles where she would never see it. */
        sec3.insertBefore(gb, sec3._tiles);
      }

      games.forEach(function(a){
        sec3._tiles.appendChild(tile(a.glyph, GH.i18n.pick(a.name), GH.i18n.pick(a.sub), null, function(){
          GH.speech.stop();
          leaving();
          view.textContent = '';
          launch(function(){ a.open(view, hub); }, a.id);
        }, a.id));
      });
      view.appendChild(sec3);
    }

    /* Nothing matched the filter at all. */
    if (!jumps.length){
      view.appendChild(el('p', 'empty', t('nothingHere')));
    }

    /* Built last so every section is known, inserted first so they sit
       above them. Filter row first, then the jump row. */
    var anchor = jumps.length ? jumps[0].node : null;
    var jb = jumpBar();
    if (jb && anchor) view.insertBefore(jb, anchor);
    var fb = filterBlock();
    view.insertBefore(fb, jb || anchor || null);

    /* the page is complete, so it is now tall enough to scroll */
    restoreScroll();
  }

  function openLongStory(story){
    if (GH.events) GH.events.setGame('long-story');
    var list = (story.sentences || []).map(function(s){
      return { de:s.de, ru:s.ru, en:s.en, blanks:s.blanks, img:s.img, cat:story.cat };
    });
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(story.title),
      subtitle:t('longStoriesHead'),
      cat:story.cat,
      sentences:list,
      ordered:true,
      onExit:hub
    });
  }

  function openVocab(cat, set, num){
    if (GH.events) GH.events.setGame('vocab');
    GH.speech.stop();
    leaving();
    view.textContent = '';
    GH.vocab.mount(view, {
      title:GH.i18n.pick(cat) + ' ' + num,
      set:set,
      onExit:hub
    });
  }

  function openSentences(cat){
    if (GH.events) GH.events.setGame('fill-blank');
    var list = GH.text.shuffle(sentencesIn(cat.id));
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(cat),
      subtitle:t('sentencesHead'),
      cat:cat.id,
      sentences:list,
      onExit:hub
    });
  }

  function openStory(story){
    if (GH.events) GH.events.setGame('story');
    var list = (story.sentences || []).map(function(s){
      return { de:s.de, ru:s.ru, en:s.en, blanks:s.blanks, img:s.img, cat:story.cat };
    });
    leaving();
    view.textContent = '';
    GH.fillBlank.mount(view, {
      title:GH.i18n.pick(story.title),
      subtitle:t('storiesHead'),
      cat:story.cat,
      sentences:list,
      ordered:true,
      onExit:hub
    });
  }

  function initLangSwitch(){
    var bar = document.getElementById('langswitch');
    var buttons = bar.querySelectorAll('button');
    function mark(){
      for (var i = 0; i < buttons.length; i++){
        buttons[i].setAttribute('aria-pressed',
          buttons[i].getAttribute('data-lang') === GH.i18n.lang() ? 'true' : 'false');
      }
    }
    for (var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(){
        GH.i18n.set(this.getAttribute('data-lang'));
        mark();
      });
    }
    /* mark has to run on every change, not just at boot — the stored
       language is restored after this function runs, so without it the
       header would show РУС highlighted while the page rendered in German */
    GH.i18n.onChange(function(){
      mark();
      if (GH.app.redraw) GH.app.redraw();
    });
    mark();
  }

  function start(){
    initLangSwitch();
    GH.nav.init();
    /* Whatever she last chose, or Russian the very first time. Restoring is
       quiet so it does not write the default back over a real choice. */
    GH.i18n.set(GH.i18n.stored() || 'ru', true);
    hub();
  }

  /* `list` and `play` exist for the guide: it needs to enumerate what is
     registered, and it must not open an activity itself — launch() is what
     tells the event log which game she is using, and it lives here. */
  function list(){ return extras.slice(); }

  function play(a){
    if (!a || !a.open) return;
    GH.speech.stop();
    leaving();
    view.textContent = '';
    launch(function(){ a.open(view, hub); }, a.id);
  }

  return { start:start, hub:hub, register:register, find:find,
           list:list, play:play, redraw:null };
})();

document.addEventListener('DOMContentLoaded', GH.app.start);
