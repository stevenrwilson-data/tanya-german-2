/* js/activities/store.js */
/* The store.

   Pets, and places for them to stand. Nothing here affects how the app
   teaches — that is the point. Kronen cannot buy a hint, a second chance
   or a skipped question, so there is no way to spend your way out of not
   knowing German. They buy a companion who turns up at the end of a round
   and says well done, which is worth exactly as much as she decides it is.

   Every pet has a German name with its article, so owning one is a word
   learned and choosing a favourite is that word said again. The articles
   are spread across der, die and das on purpose.

   The two legendary ones are not for sale at any price. One asks for the
   whole collection, the other for months of turning up — and the store
   says which, because a locked box with no explanation is just a locked
   box. */

window.GH = window.GH || {};

GH.store = (function(){

  var KEY = 'gh-pets-v1';
  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function read(){
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  function write(d){
    try { window.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e){}
  }

  function mine(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = { own:[], slots:1, chosen:[], tokens:{} };
    /* `tokens` was a single number for one drop, when the only kind was
       rare. A number found here is that. */
    if (typeof d[id].tokens === 'number'){
      d[id].tokens = d[id].tokens ? { rare:d[id].tokens } : {};
    }
    if (!d[id].tokens) d[id].tokens = {};
    return { all:d, me:d[id] };
  }

  function save(m){ write(m.all); }

  function owns(id){ return mine().me.own.indexOf(id) >= 0; }
  function slots(){ return mine().me.slots || 1; }

  /* Which pets she has picked to appear. Trimmed to the slots she has, so
     buying a slot and losing it later cannot leave a ghost. */
  function chosen(){
    var m = mine().me;
    return (m.chosen || []).filter(function(id){
      return m.own.indexOf(id) >= 0;
    }).slice(0, slots());
  }

  function petsOf(){ return (window.GH_PETS || { pets:[] }).pets; }

  /* Everything below legendary — the twelve that can simply be bought. */
  function ordinary(){
    return petsOf().filter(function(x){ return x.tier !== 'legendary'; });
  }

  /* Noir the Black Panther Ninja does not fit on a card two inches wide,
     but the title is most of why he is worth having. Full name where
     there is room, first word where there is not. */
  /* ---------- A SMALL SOUND, WITHOUT AN AUDIO FILE ----------

     Two short notes on a rising third, about a fifth of a second. Enough
     to register as a reward and short enough that it never gets in the
     way of the twentieth purchase.

     SYNTHESISED, NOT A FILE. A .ogg would mean another asset, another
     format question, another thing that can 404 and another row in the
     audit. WebAudio makes this in a dozen lines and cannot go missing.

     BUILT ON DEMAND AND THROWN AWAY. A context created at load time is a
     context iOS suspends before she ever buys anything; creating it
     inside the tap keeps it inside the user gesture that unlocks audio.

     WRAPPED IN try/catch AND SILENT ON FAILURE. A browser with no
     WebAudio, or one that refuses the context, must not stop the card
     from appearing — the sound is the garnish, the card is the reward. */
  /* The just-bought window. Built as an overlay so it interrupts — she
     should not have to notice a strip further down a page she is already
     scrolling. Dismissed by the button, the backdrop, or Escape. */
  function gotWindow(p){
    /* CLEAR ANY STRAY WINDOW FIRST, AND UNLOCK SCROLLING.

       This sets `document.body.style.overflow = 'hidden'` while it is open
       and restores it in `shut()`. If the window is ever removed by
       anything other than `shut()` — a repaint, a route change, a second
       purchase before the first was dismissed — the lock survives and the
       page cannot be scrolled at all.

       Steven, 10 Sep: "my iPhone can't see below lessons." That is what a
       stranded `overflow:hidden` looks like.

       Cheap insurance: sweep before opening, so at worst the lock lasts
       until the next purchase rather than until a reload. */
    var stray = document.querySelectorAll('.pt-got-wrap');
    for (var si = 0; si < stray.length; si++){
      if (stray[si].parentNode) stray[si].parentNode.removeChild(stray[si]);
    }
    document.body.style.overflow = '';

    var wrap = el('div', 'pt-got-wrap');

    /* THE TIER DRESSES THE WHOLE WINDOW.

       Steven, 09 Sep: "green for commons, blue for rare, purple for epic,
       amber for legendary" — and "I really want to elevate the experience
       of buying pets."

       So rarity is not just a colour swap: the window gets a class and
       everything downstream reads from it. A legendary arrives with a
       wider burst, more sparkles and a longer settle than a common,
       because a legendary that lands exactly like a common teaches her
       the tiers do not matter.

       `--tier-common` and friends already exist and are already tuned for
       light and dark themes — the shop headings use them. Reusing them
       means the glow can never disagree with the badge on the card she
       just bought from. */
    var tier = p.tier || 'common';
    /* THE TIER CLASS GOES ON THE FRAME, not the box.

       `--got` and `--got-reach` are declared by it, and BOTH the box and
       the sparkle layer need them — they are siblings inside the frame,
       so the variables have to live on their shared parent. Putting the
       class on the box left the sparkles with no colour at all. */
    var box = el('div', 'pt-got pt-got-pop');

    /* The glow sits behind the picture, in its own layer, so a missing
       file leaves the animal exactly where it was. */
    var stage = el('div', 'pt-got-stage');
    /* The coloured burst is CSS, so the tier reads even before any glow
       file exists — and it keeps reading if one never does. */
    stage.appendChild(el('span', 'pt-got-burst'));
    /* ONE GLOW FILE FOR ALL FOUR TIERS.

       It was trying `pet-glow-<tier>.webp` first and falling back to the
       shared one — which 404s on every purchase, because there is only
       ever one file. The tier colour comes from a CSS hue rotation on
       that single image (see `--got-spin`), so a per-tier file was never
       part of the design and asking for one was my mistake. Steven's
       console, 10 Sep.

       If a tier ever wants genuinely different artwork rather than a
       recolour, add the chain back — but only for the tier that has it. */
    var glowSrc = 'images/pets/pet-glow.webp';
    var glow = document.createElement('img');
    glow.className = 'pt-got-glow';
    glow.alt = '';
    glow.src = GH.build ? GH.build.url(glowSrc) : glowSrc;
    glow.addEventListener('error', function(){ glow.style.display = 'none'; });
    stage.appendChild(glow);

    var pic = art(p, 'greet');
    if (pic){
      pic.className = (pic.className || '') + ' pt-got-pic';
      stage.appendChild(pic);
    }
    box.appendChild(stage);

    box.appendChild(el('p', 'pt-got-sub', t('stBought')));
    box.appendChild(el('h2', 'pt-got-name', shortName(p)));
    if (p.de) box.appendChild(el('p', 'pt-got-de', p.de));

    var line = GH.petVoice && GH.petVoice.bandLine
      ? GH.petVoice.bandLine(p.id, 'buy') : null;
    if (line){
      /* German on top, her language under it — the same rule as every
         other surface. Tap to hear it again. */
      var says = el('button', 'pt-got-say');
      says.type = 'button';
      says.appendChild(el('span', 'pt-got-de-line', line.de));
      if (line.tr) says.appendChild(el('span', 'pt-got-tr', line.tr));
      says.addEventListener('click', function(){
        if (GH.speech) GH.speech.say(line.say);
      });
      box.appendChild(says);
    }

    function shut(){
      /* THE JINGLE IS NOT STOPPED. Steven, 10 Sep: "let the jingle finish,
         it's only 10s — it's not like she'll open a new lesson right after
         buying a pet and start working before it finishes."

         Right. Cutting the music the instant she taps Yes! makes the
         reward feel retracted, and closing the window is not a request for
         silence. It plays out. */
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = '';
    }
    function onKey(e){ if (e.key === 'Escape'){ e.stopPropagation(); shut(); } }

    var ok = el('button', 'btn btn-primary pt-got-ok', t('stGotPet'));
    ok.type = 'button';
    ok.addEventListener('click', shut);
    box.appendChild(ok);

    /* The backdrop closes it, but only the backdrop — a tap inside the
       window must not dismiss the thing she is reading. */
    wrap.addEventListener('click', function(e){ if (e.target === wrap) shut(); });

    /* NO SPARKLES FLYING OUT OF THE WINDOW.

       They were there and they are gone. Steven, 10 Sep: "the glow that
       flies out from the window just looks lame, sorta distorts the
       screen — if I can't have sparkles I don't want anything. The music
       and the special image and the glow around the pet do a lot."

       Right. Three things were competing for the same moment and the
       weakest one was the loudest. What carries it is the jingle, the
       artwork, and the glow behind the animal INSIDE the window — all of
       which are still here.

       The frame stays because it carries the tier variables that both the
       window and its contents read. */
    var frame = el('div', 'pt-got-frame pt-got-' + tier);
    frame.appendChild(box);

    wrap.appendChild(frame);
    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey, true);
    if (ok.focus) ok.focus();

    /* If it turns out there is no jingle, the greeting speaks after all —
       see `fanfare`. The flag stops it speaking twice if the failure
       arrives late. */
    var spoke = false;
    function speakLine(){
      if (spoke || !line || !GH.speech) return;
      spoke = true;
      GH.speech.say(line.say);
    }
    var tune = fanfare(tier, speakLine);

    /* THE JINGLE AND THE GREETING DO NOT TALK OVER EACH OTHER.

       With a tier jingle playing, the pet's line is NOT spoken
       automatically — the button under it still speaks on tap. Two audio
       streams at once makes both unintelligible, and the jingle is the
       one carrying the celebration.

       Without a jingle the synth chime is 200ms, so the greeting speaks
       on arrival as before. A greeting she has to press for is not a
       greeting; a greeting buried under music is worse. */
    if (!tune) speakLine();
  }

  /* ---------- A SOUND PER TIER, WITH THE SYNTH AS A FLOOR ----------

     Steven, 09 Sep: "there will be a sound for each tier."

     Tries `audio/pet-<tier>.ogg` and falls back to the two-note chime
     below if there is no file, no decoder, or playback is refused. So the
     moment always has a sound, the tiers get their own the day the files
     land, and nothing 404s in a way she can hear.

     OGG ONLY — the project's rule, recorded in _local-only/HANDOFF.md.
     One track is one file; do not add an m4a fallback here.

     `play()` returns a promise in modern browsers and throws in old ones,
     so both are handled: a rejected promise means autoplay policy or a
     missing file, and either way the synth covers it. */
  /* Returns the <audio> so the window can stop it on the way out, or null
     when it fell back to the synth.

     THE JINGLES ARE 9-10 SECONDS. Steven is making them in Suno, 10 Sep.
     That is far longer than the window is open — she dismisses in two or
     three — so an unstopped clip plays on over whatever she does next.
     `shut()` stops it. */
  /* `onSilent` runs when there turns out to be no jingle — because the
     file is missing, the codec is unsupported, or autoplay was refused.

     IT HAS TO BE A CALLBACK. A missing file does NOT throw: `new Audio()`
     succeeds and only the `play()` promise rejects, asynchronously. So a
     synchronous return value cannot tell "playing" from "about to fail",
     and treating the object as proof of sound would suppress the spoken
     greeting AND never chime — silence on every purchase until the files
     exist. */
  /* ===================================================================
     THE ACHIEVEMENT WINDOW.

     Steven, 10 Sep: "I need that same window used for achievements. Same
     picture same glow, same button, different sound."

     So it is the pet-buy window's structure — the same `.pt-got-*`
     classes, the same tier frame, glow, `Yes!` button and Escape/backdrop
     close — with two differences he asked for:

       • the SOUND is chosen by the achievement's payout, not the pet tier
         (see `awardFanfare` below): A under 350, B 350–999, C 1000+.
       • the TEXT is two lines: the active pet's own congratulation (its
         `award` band in petlines.js), then the announcement of which
         achievement was earned (`awGotAch`).

     WHO SPEAKS: her active pet — `chosen()[0]`, the companion she has
     already picked. That is why every pet has an `award` line. If she has
     no pet yet (the first achievement can land before she owns one), the
     window still shows, with the announcement line alone and no portrait
     — it cannot show a pet that is not there.

     The buy window (`gotWindow`) is deliberately left untouched: the Full
     Tour taps into it and the buy flow is tuned, so this is a sibling
     rather than a shared rewrite. The shared surface is the CSS. */
  function awardWindow(won){
    if (!won) return;
    var list = won.length ? won : [won];
    if (!list.length) return;
    /* One window. If a round unlocks several at once, the first is the
       one announced here — the rest are still paid and still listed on
       the end screen; this is the moment, not the ledger. */
    var a = list[0];

    /* The active pet, if any, and its tier for the frame colour. */
    var petId = (chosen()[0]) || null;
    var pet = petId ? find(petId) : null;
    var tier = (pet && pet.tier) || 'common';

    var stray = document.querySelectorAll('.pt-got-wrap');
    for (var si = 0; si < stray.length; si++){
      if (stray[si].parentNode) stray[si].parentNode.removeChild(stray[si]);
    }
    document.body.style.overflow = '';

    var wrap = el('div', 'pt-got-wrap');
    var box = el('div', 'pt-got pt-got-pop');

    var stage = el('div', 'pt-got-stage');
    stage.appendChild(el('span', 'pt-got-burst'));
    var glowSrc = 'images/pets/pet-glow.webp';
    var glow = document.createElement('img');
    glow.className = 'pt-got-glow';
    glow.alt = '';
    glow.src = GH.build ? GH.build.url(glowSrc) : glowSrc;
    glow.addEventListener('error', function(){ glow.style.display = 'none'; });
    stage.appendChild(glow);

    /* The portrait is the active pet's pleased face, the same one the end
       screen cheers with. Skipped cleanly when she has no pet. */
    if (pet){
      var pic = art(pet, 'greet');
      if (pic){
        pic.className = (pic.className || '') + ' pt-got-pic';
        stage.appendChild(pic);
      }
    }
    box.appendChild(stage);

    /* Eyebrow + the achievement's own name, in place of the pet's name. */
    box.appendChild(el('p', 'pt-got-sub', t('awUnlocked')));
    box.appendChild(el('h2', 'pt-got-name', t(a.key)));

    /* LINE ONE: the pet's congratulation, German over her language, tap to
       replay — exactly the buy window's `.pt-got-say`. Absent with no pet. */
    var line = (pet && GH.petVoice && GH.petVoice.bandLine)
      ? GH.petVoice.bandLine(pet.id, 'award') : null;
    if (line){
      var says = el('button', 'pt-got-say');
      says.type = 'button';
      says.appendChild(el('span', 'pt-got-de-line', line.de));
      if (line.tr) says.appendChild(el('span', 'pt-got-tr', line.tr));
      says.addEventListener('click', function(){
        if (GH.speech) GH.speech.say(line.say);
      });
      box.appendChild(says);
    }

    /* LINE TWO: the announcement. Its own quieter row so it does not
       compete with the pet's voice for the eye. */
    var told = el('p', 'pt-got-told');
    told.textContent = t('awGotAch', { a:t(a.key) });
    box.appendChild(told);

    /* THE CRYSTAL BONUS, just above the button. Steven, 10 Sep — the number
       is the achievement's own payout, so it adjusts per achievement. */
    box.appendChild(el('p', 'pt-got-crystals', t('awGotCrystals', { n:a.pay })));

    function shut(){
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = '';
    }
    function onKey(e){ if (e.key === 'Escape'){ e.stopPropagation(); shut(); } }

    var ok = el('button', 'btn btn-primary pt-got-ok', t('stGotPet'));
    ok.type = 'button';
    ok.addEventListener('click', shut);
    box.appendChild(ok);

    wrap.addEventListener('click', function(e){ if (e.target === wrap) shut(); });

    var frame = el('div', 'pt-got-frame pt-got-' + tier);
    frame.appendChild(box);
    wrap.appendChild(frame);
    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey, true);
    if (ok.focus) ok.focus();

    /* Sound by payout band. Same speak-on-silent contract as the buy
       window: with a jingle the pet line waits for a tap, without one it
       speaks on arrival. */
    var spoke = false;
    function speakLine(){
      if (spoke || !line || !GH.speech) return;
      spoke = true;
      GH.speech.say(line.say);
    }
    var tune = awardFanfare(a.pay, speakLine);
    if (!tune) speakLine();
  }

  /* THREE SOUNDS, CHOSEN BY PAYOUT. Steven, 10 Sep: "A is any achievement
     under 350 crystals payout. B is 350 to 999. C is anything 1000+."

     Files live beside the pet jingles, same `.ogg` rule. A missing file
     falls through to the synth chime exactly as the pet fanfare does, so
     an unrecorded band never 404-crashes the celebration. */
  function awardBand(pay){
    var n = pay || 0;
    if (n >= 1000) return 'c';
    if (n >= 350)  return 'b';
    return 'a';
  }
  function awardFanfare(pay, onSilent){
    var src = 'audio/pets/award-' + awardBand(pay) + '.ogg';
    var done = false;
    function silent(){
      if (done) return;
      done = true;
      chime();
      if (onSilent) onSilent();
    }
    try {
      var au = new Audio(GH.build ? GH.build.url(src) : src);
      au.volume = 0.7;
      au.addEventListener('error', silent);
      var pr = au.play();
      if (pr && pr.catch) pr.catch(silent);
      else if (!pr) silent();
      return au;
    } catch (e){ silent(); }
    return null;
  }

  function fanfare(tier, onSilent){
    /* `audio/pets/`, not `audio/`. Steven, 10 Sep — the songs already own
       the top of that folder and these are a different kind of thing. */
    var src = 'audio/pets/pet-' + (tier || 'common') + '.ogg';
    var done = false;
    function silent(){
      if (done) return;
      done = true;
      chime();
      if (onSilent) onSilent();
    }
    try {
      var a = new Audio(GH.build ? GH.build.url(src) : src);
      a.volume = 0.7;
      a.addEventListener('error', silent);
      var pr = a.play();
      if (pr && pr.catch) pr.catch(silent);
      else if (!pr) silent();          /* old browser, no promise: assume none */
      return a;
    } catch (e){ silent(); }
    return null;
  }

  function chime(){
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      var ctx = new AC();
      var now = ctx.currentTime;
      [[660, 0], [880, 0.09]].forEach(function(n){
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = n[0];
        /* A quick fade rather than a hard stop: an abrupt cut on a sine
           wave clicks, and the click is louder than the note. */
        gain.gain.setValueAtTime(0.0001, now + n[1]);
        gain.gain.exponentialRampToValueAtTime(0.16, now + n[1] + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n[1] + 0.16);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now + n[1]);
        osc.stop(now + n[1] + 0.18);
      });
      /* Close it once the notes are done, so a session of buying does not
         leave a stack of live audio contexts behind. */
      window.setTimeout(function(){
        try { ctx.close(); } catch (e){}
      }, 600);
    } catch (e){}
  }

  function shortName(p){
    return (p.name || p.de).split(' the ')[0];
  }

  /* Which picture to use, and what to do when it does not exist yet.

     A pet may have a shop portrait, a pleased one and a sympathetic one.
     Falling back in order means a pet drawn only once still appears
     everywhere rather than leaving a hole, and the art can arrive one
     picture at a time. */
  /* Which form of a pet she has grown to. Stored per pet, one-based. */
  function form(id){
    var m = mine().me;
    return (m.form && m.form[id]) || 1;
  }

  function growCost(p){
    var g = (window.GH_PETS.grow || {})[p.tier];
    if (!g) return 0;
    var at = form(p.id);
    return g[at - 1] || 0;         /* nothing beyond the third form */
  }

  function canGrow(p){ return owns(p.id) && growCost(p) > 0; }

  function grow(p){
    var cost = growCost(p);
    if (!cost || !GH.coins.spend(cost, p.id + ':grow')) return;
    if (GH.events && GH.events.mark) GH.events.mark('grow', 'pet:' + p.id, cost);
    var m = mine();
    if (!m.me.form) m.me.form = {};
    m.me.form[p.id] = form(p.id) + 1;
    save(m);
    state.justGrew = p.id;
    paint();
  }

  /* Pictures come from petart.js, which builds a path from the pet's slug,
     its current form and the mood wanted. Returns an element ready to
     append — an img where the file exists, a glyph where it does not —
     so nothing here needs to know whether the art has been drawn yet. */
  function art(p, want){
    return GH.petArt ? GH.petArt.tile(p, form(p.id), want) : null;
  }

  function find(id){
    var out = null;
    petsOf().forEach(function(p){ if (p.id === id) out = p; });
    return out;
  }

  /* Has a legendary been earned? Asked of the app, never bought. */
  /* God mode, for testing.

     Every pet above common is gated on consecutive full days — a
     legendary wants ninety, Ember a hundred and fifty — which means the
     shelf cannot be looked at without either waiting five months or
     forging the ledger. Kronen alone are not enough and never were.

     This one switch makes every gate report itself met. It changes
     nothing about what is stored: the days, the streaks and the counts
     are all still whatever they really are, and turning it off puts the
     shelf straight back to the truth. Buying while it is on spends real
     Kronen and the pet is really owned, which is the point — the store
     has to be walked through as it will actually behave.

     Deliberately not remembered per player and deliberately in the
     testing block, under a heading that says what it is. */
  function god(){
    try { return window.localStorage.getItem('gh-god') === '1'; }
    catch (e){ return false; }
  }

  function setGod(on){
    try {
      if (on) window.localStorage.setItem('gh-god', '1');
      else window.localStorage.removeItem('gh-god');
    } catch (e){}
  }

  function earned(p){
    if (!p.need) return true;
    if (god()) return true;
    var n = p.need;
    if (n.allPets){
      /* the twelve ordinary ones, not the legendaries.

         Filtering on 'has a cost' worked until the legendaries were given
         prices, at which point Mimi's condition included Mimi and could
         never be satisfied. */
      if (!ordinary().every(function(x){ return owns(x.id); })) return false;
    }
    if (n.allSlots && slots() < (window.GH_PETS.slots.length)) return false;
    if (n.mature){
      var s = GH.tutor ? GH.tutor.stats() : { mature:0 };
      if (s.mature < n.mature) return false;
    }
    /* DAYS FIVE ACTIVITIES WERE FINISHED. Not days the app was opened.

       This read `GH.coach.stats().days` — the coach's counter, which
       increments on any visit. So a gate meant to say "complete five
       activities on ninety days" was satisfied by opening the app ninety
       times and doing nothing.

       `GH.coins.fullDays()` is the counter for the real thing: it goes up
       only when `p.done` reaches `DAILY_TARGET`, which is five. It was
       built, exported, and never read by anything. The comment on the
       `run` gate below has always drawn exactly this distinction — the
       code just did not follow it.

       Total days, deliberately not consecutive: `run` and `now` are the
       streak gates and this is the one that is not. */
    if (n.days){
      if (!GH.coins || GH.coins.fullDays() < n.days) return false;
    }
    /* Consecutive days, counted from the ledger rather than from the
       coach. The coach counts days the app was opened; this counts days
       five exercises were finished, which is the thing being asked for.
       Measured against her longest run ever, so illness at day
       eighty-nine does not destroy three months. */
    if (n.run){
      if (!GH.coins || GH.coins.bestRun() < n.run) return false;
    }
    /* AND THE RUN SHE IS ON RIGHT NOW.

       `now` was in the data from the day the legendaries were written and
       nothing read it, so `{now:30, run:90}` enforced only the 90. The two
       ask different questions on purpose: `run` is whether she has EVER
       sustained it, banked so illness at day eighty-nine does not destroy
       three months — and `now` is whether she is sustaining it at the
       moment of buying.

       Without it the walk-away hole this file's own comment describes was
       open: bank a ninety-day run, disappear for three months, come back
       and spend saved Kronen on the rarest thing in the app. The whole
       point of a legendary is that it is evidence of a habit, and a habit
       is present tense.

       The store panel has been HONESTLY DISPLAYING `Run right now: 0 of 30`
       while letting the purchase through, which is worse than either
       enforcing it or not showing it. */
    if (n.now){
      if (!GH.coins || !GH.coins.runToday || GH.coins.runToday() < n.now) return false;
    }
    if (n.legendaries){
      var got = 0;
      petsOf().forEach(function(x){
        if (x.tier === 'legendary' && owns(x.id)) got++;
      });
      if (got < n.legendaries) return false;
    }
    /* grown asks for forms, not purchases — a shelf of first-form pets is
       collecting, growing them is staying */
    if (n.grown){
      var g = 0;
      petsOf().forEach(function(x){ if (owns(x.id) && form(x.id) > 1) g++; });
      if (g < n.grown) return false;
    }
    /* THREE NEW GATE KEYS, 10 Sep. Steven replaced the old ones:

         slots   carrier slots owned, so `slots:2` is the second carrier
         pets    how many pets she owns, any tier
         quests  crystal quests finished, all time

       The keys they replace — `allPets`, `allSlots`, `mature`, `grown` —
       still work, because nothing says a pet cannot use them and removing
       live code for data that no longer references it is how a future
       change breaks silently. */
    if (n.slots && slots() < n.slots) return false;
    if (n.pets){
      var owned = 0;
      petsOf().forEach(function(x){ if (owns(x.id)) owned++; });
      if (owned < n.pets) return false;
    }
    if (n.quests){
      var qd = (GH.questDay && GH.questDay.lifetime) ? GH.questDay.lifetime() : 0;
      if (qd < n.quests) return false;
    }
    if (n.awards){
      if (!GH.awards || GH.awards.earned() < n.awards) return false;
    }
    return true;
  }

  /* What it needs, and how far along she is.

     Ninety days is a long time to look at a locked box that says only
     'ninety days'. Each line carries her own number against the target,
     so the thing is visibly approaching rather than merely distant. */
  function needText(p){
    var n = p.need || {};
    var c = GH.coach ? GH.coach.stats() : { best:0, days:0 };
    var tu = GH.tutor ? GH.tutor.stats() : { mature:0 };
    var bits = [];

    /* `q` is the daily target — five — read from coins rather than written
       into the sentence, so the wording follows if it ever changes. */
    /* An object, not a function — see the note in app.js. */
    var dayTarget = (GH.coins && GH.coins.rates) ? (GH.coins.rates.target || 5) : 5;
    if (n.run) bits.push(t('stNeedRun', {
      at:GH.coins ? GH.coins.bestRun() : 0, n:n.run, q:dayTarget }));
    /* Now that `now` is enforced it has to be SAID, or the shelf refuses for
       a reason it never gave. Its own line, not folded into `run`: they are
       different questions and she should be able to see which one she is
       short on. */
    if (n.now){
      bits.push(t('stNeedNow', {
        at:(GH.coins && GH.coins.runToday) ? GH.coins.runToday() : 0, n:n.now }));
    }
    /* `at` as well as `n`: the string shows progress now, and it reads
       from the same counter `earned()` checks — days five activities were
       finished, not days the app was opened. */
    if (n.days){
      bits.push(t('stNeedDays', {
        at:(GH.coins && GH.coins.fullDays) ? GH.coins.fullDays() : 0, n:n.days }));
    }
    if (n.allPets){
      var ord = ordinary();
      bits.push(t('stNeedAllPets', {
        at:ord.filter(function(x){ return owns(x.id); }).length, n:ord.length }));
    }
    if (n.allSlots) bits.push(t('stNeedAllSlots', { at:slots(), n:window.GH_PETS.slots.length }));
    if (n.mature) bits.push(t('stNeedMature2', { at:tu.mature, n:n.mature }));
    if (n.grown){
      var g = 0;
      petsOf().forEach(function(x){ if (owns(x.id) && form(x.id) > 1) g++; });
      bits.push(t('stNeedGrown2', { at:g, n:n.grown }));
    }
    if (n.slots){
      bits.push(t('stNeedSlots', { at:slots(), n:n.slots }));
    }
    if (n.pets){
      var op = 0;
      petsOf().forEach(function(x){ if (owns(x.id)) op++; });
      bits.push(t('stNeedPets', { at:op, n:n.pets }));
    }
    if (n.quests){
      bits.push(t('stNeedQuests', {
        at:(GH.questDay && GH.questDay.lifetime) ? GH.questDay.lifetime() : 0,
        n:n.quests }));
    }
    if (n.awards){
      bits.push(t('stNeedAwards2', { at:GH.awards ? GH.awards.earned() : 0, n:n.awards }));
    }
    if (n.legendaries){
      var lg = 0;
      petsOf().forEach(function(x){ if (x.tier === 'legendary' && owns(x.id)) lg++; });
      bits.push(t('stNeedLegend', { at:lg, n:n.legendaries }));
    }
    return bits.join('\n');
  }

  /* ---------- buying ---------- */

  /* ---------- pet tokens ----------

     A token is: take any pet of this tier or below, free, with no
     requirement to have met. No Kronen, no gate, no waiting. Earned by
     finishing course lessons.

     Three kinds, and what each one reaches is written out rather than
     computed from a rank:

         common  common
         rare    common, rare
         epic    common, rare, epic

     Not `tiers.indexOf(x) <= tiers.indexOf(token)`. GH_PETS orders its
     tiers but nothing in the data says the order means anything, and a
     tier inserted between rare and epic would silently widen every rare
     token ever granted. Legendary is absent from all three lists on
     purpose: those are the twelve-pet, twenty-day-run pets, and a token
     that could take Noir would empty the far end of the shop.

     SPENDING PICKS THE CHEAPEST TOKEN THAT WORKS. An epic token on a
     common pet is a waste she cannot undo, so if she holds both, the
     common one goes. */
  var TOKEN = {
    common: ['common'],
    rare:   ['common', 'rare'],
    epic:   ['common', 'rare', 'epic']
  };
  /* weakest first, which is the order spendToken tries them in */
  var TOKEN_ORDER = ['common', 'rare', 'epic'];

  function tokens(kind){
    var t = mine().me.tokens || {};
    if (kind) return t[kind] || 0;
    var n = 0;
    TOKEN_ORDER.forEach(function(k){ n += t[k] || 0; });
    return n;
  }

  function tokensHeld(){
    var t = mine().me.tokens || {}, out = [];
    TOKEN_ORDER.forEach(function(k){ if (t[k] > 0) out.push({ kind:k, n:t[k] }); });
    return out;
  }

  /* Which token she holds that would take this pet, weakest first. */
  function tokenFor(p){
    if (!p || owns(p.id)) return null;
    var t = mine().me.tokens || {}, i;
    for (i = 0; i < TOKEN_ORDER.length; i++){
      var k = TOKEN_ORDER[i];
      if ((t[k] || 0) > 0 && TOKEN[k].indexOf(p.tier) >= 0) return k;
    }
    return null;
  }

  /* Called by whatever finishes the lessons. Nothing calls it yet. */
  function grantToken(kind, n){
    if (!TOKEN[kind]) return 0;
    var m = mine();
    if (!m.me.tokens) m.me.tokens = {};
    m.me.tokens[kind] = (m.me.tokens[kind] || 0) + (n || 1);
    save(m);
    return m.me.tokens[kind];
  }

  function spendToken(p){
    var kind = tokenFor(p);
    if (!kind) return false;
    var m = mine();
    m.me.tokens[kind]--;
    if (m.me.tokens[kind] <= 0) delete m.me.tokens[kind];
    m.me.own.push(p.id);
    if (m.me.chosen.length < slots()) m.me.chosen.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
    return true;
  }

  /* Her FIRST pet, ever. The butler resigns and the pet takes the guide
     role, which makes a purchase read as a promotion rather than a
     transaction — and teaches in one moment that a pet is a guide, not an
     ornament.

     Guarded on the count rather than a flag, so it cannot fire twice and
     needs no extra storage. */
  /* The butler steps down for the FIRST pet, and one pet replaces another
     after that. Both are handovers and the butler module tells them apart
     by which it is given.

     The ID goes across as well as the name, because each pet has its own
     line and a display name cannot be keyed on — `shortName` strips "the
     Frog", and two pets could share a first word. */
  function handOver(p, first){
    if (!GH.butler || !GH.butler.handover) return;
    GH.butler.handover(p.id, shortName(p), first);
  }

  function buy(p){
    if (owns(p.id)) return;
    /* the gate is checked here as well as in the card, so a stale screen
       cannot be used to buy something not yet earned */
    if (p.need && !earned(p)) return;
    if (!p.cost || !GH.coins.spend(p.cost, p.id)) return;
    /* What she spends on, which lived only in the coin log and never
       reached the event log or the upload. Whether the pets motivate
       anything is a real question and this is the only evidence for it. */
    if (GH.events && GH.events.mark) GH.events.mark('buy', 'pet:' + p.id, p.cost);
    var m = mine();
    m.me.own.push(p.id);
    if (m.me.chosen.length < slots()) m.me.chosen.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
  }

  function claim(p){
    if (owns(p.id) || !earned(p)) return;
    var m = mine();
    m.me.own.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
  }

  function buySlot(){
    var S = window.GH_PETS.slots;
    var next = S[slots()];
    if (!next || !GH.coins.spend(next.cost, 'slot' + next.n)) return;
    var m = mine();
    m.me.slots = next.n;
    save(m);
    paint();
  }

  /* PICKING A PET WHEN THE SLOTS ARE FULL DISPLACES ONE.

     This is where a swap actually happens — not on buying. Buying only adds
     to `chosen` if there is room, so a new pet with full slots is owned and
     silent until she picks it.

     The displaced pet says goodbye. Swapping companions without a word from
     the one being put down would make them feel like equipment, and the
     whole point of the shelf is that the old one is waiting rather than
     gone. */
  function toggle(id){
    var m = mine();
    var at = m.me.chosen.indexOf(id);
    if (at >= 0){
      m.me.chosen.splice(at, 1);
      save(m);
      paint();
      return;
    }

    var displaced = null;
    if (m.me.chosen.length >= slots()){
      var goneId = m.me.chosen.shift();
      displaced = petsOf().filter(function(x){ return x.id === goneId; })[0] || null;
    }
    m.me.chosen.push(id);
    save(m);
    paint();

    /* Only when someone was actually put down. Filling an empty slot is not
       a swap and nobody has left. */
    if (displaced && GH.butler && GH.butler.handover){
      var p = petsOf().filter(function(x){ return x.id === id; })[0];
      GH.butler.handover(id, p ? shortName(p) : '', false, displaced);
    }
  }

  /* ---------- painting ---------- */

  function petCard(p){
    var have = owns(p.id);
    var legendary = p.tier === 'legendary';
    var open = legendary ? earned(p) : GH.coins.afford(p.cost);
    var picked = chosen().indexOf(p.id) >= 0;

    var box = el('div', 'pt-card pt-' + p.tier +
      (have ? ' is-own' : '') + (picked ? ' is-picked' : '') +
      (state.focus === p.id ? ' is-focus' : ''));
    /* Sent here by the hub's grid. Scrolled to after the paint, because
       the element has no position until it is in the document. */
    if (state.focus === p.id){
      box.id = 'pt-focus';
      window.setTimeout(function(){
        var n = document.getElementById('pt-focus');
        if (n && n.scrollIntoView) n.scrollIntoView({ block:'center' });
        /* Cleared so a later repaint — a purchase, a language switch —
           does not keep dragging her back to the same card. */
        state.focus = null;
      }, 30);
    }

    /* The picture, tappable. A card two inches wide cannot show what was
       actually drawn, so the same tap-to-enlarge the vocabulary sheets
       have applies here. Wrapped in a button rather than given a click
       handler on the img, so it is reachable by keyboard and announces
       itself. */
    var pic = art(p, 'shop');
    if (pic){
      var lens = el('button', 'pt-lens');
      lens.type = 'button';
      lens.setAttribute('aria-label', (p.name || p.de) + ' — ' + t('refTapHint2'));
      lens.appendChild(pic);
      lens.addEventListener('click', function(){
        GH.lightbox.openPic(lensUrl(p, 'shop'), lensCaption(p));
      });
      box.appendChild(lens);
    }

    var body = el('span', 'pt-body');
    /* the name she calls it, then the German word it is. The name is the
       reason she chose it; the word is what she takes away. */
    /* A legendary shows its name even when locked. Noir the Black Panther
       Ninja is most of the reason to work for him, and a row of dashes is
       nothing to want. Only the German word stays hidden until it is
       hers — that is the part she is being taught, and it should arrive
       with the animal. */
    /* Always shown. Hiding the name until she can afford it made the shop
       a row of dashes on the day she most needed a reason to come back —
       and a shop that will not say what it sells is not a shop. */
    body.appendChild(el('span', 'pt-name', shortName(p)));
    body.appendChild(el('span', 'pt-full', p.name || ''));
    body.appendChild(el('span', 'pt-word', p.de));
    var lang = GH.i18n.lang();
    if (lang !== 'de') body.appendChild(el('span', 'pt-tr', p[lang] || p.en));
    body.appendChild(el('span', 'pt-tier', t('pt' +
      p.tier.charAt(0).toUpperCase() + p.tier.slice(1))));

    /* ---------- WHO THIS ONE IS ----------

       Steven, looking at the store: "it gives her almost no reason to
       want Flippy specifically. She can't tell that Flippy is the
       impulsive, cheerful little frog who jumps into everything."

       Right, and the card had everything except that. Name, German word,
       translation, rarity and price told her WHAT it is and what it costs
       — nothing told her why she would pick this one over the next one at
       the same price. So a short personality line sits between the rarity
       chip and the unlock line, which is where he put it.

       AFTER the tier and BEFORE the cost on purpose: rarity and price are
       the two facts she compares cards on, and a paragraph between them
       would break the comparison. This way the numbers stay adjacent and
       the character sits above them.

       OPTIONAL, PER PET. `about` is absent on a pet that has not been
       written yet, and an absent one renders nothing at all rather than a
       gap or a placeholder — sixteen of these are a lot of prose and they
       can land a few at a time.

       Two or three sentences is the ceiling. His point: the cards are
       already tall on a phone, and a wall of text per card is worse than
       no text. */
    if (p.about){
      var about = GH.i18n.pick(p.about);
      if (about) body.appendChild(el('p', 'pt-about', about));
    }

    box.appendChild(body);

    if (have){
      if (form(p.id) > 1){
        body.appendChild(el('span', 'pt-form', t('stFormN', { n:form(p.id) })));
      }
      var pick = el('button', 'pt-pick' + (picked ? ' is-on' : ''));
      pick.type = 'button';
      pick.textContent = picked ? t('stCheering') : t('stChoose');
      pick.addEventListener('click', function(){ toggle(p.id); });
      box.appendChild(pick);
      if (canGrow(p)){
        var g = el('button', 'pt-grow');
        g.type = 'button';
        g.disabled = !GH.coins.afford(growCost(p));
        /* A string label, so the CHARACTER and not the element — an
           <img> cannot go in textContent. markText() is coins.js's answer
           for exactly these places. */
        g.textContent = t('stGrow') + '  ' + GH.coins.markText() + ' ' + growCost(p);
        g.addEventListener('click', function(){ grow(p); });
        box.appendChild(g);
      } else if (form(p.id) >= 3){
        box.appendChild(el('span', 'pt-need', t('stFullGrown')));
      }
      return box;
    }

    /* Not owned. Three states, decided by whether there is a gate and
       whether it is open — not by tier, because an epic pet now has both
       a price and a gate and the old tier branch could not express that. */
    var gated = !!p.need;
    var gateOpen = gated ? earned(p) : true;

    /* The token comes first, before the gate gets a chance to refuse her.
       That is what 'bypasses the wait requirement' means: a rare pet she
       has not waited for is exactly the case the token exists for, so
       offering it only on unlocked pets would make it worthless. */
    var useKind = tokenFor(p);
    if (useKind){
      var tk = el('button', 'pt-buy is-token',
        t('stUseToken', { kind:t('ptTok_' + useKind) }));
      tk.type = 'button';
      tk.addEventListener('click', function(){ spendToken(p); });
      box.appendChild(tk);
      /* Still say what it would otherwise have cost or needed, so using a
         token is a visible choice rather than a shortcut she stumbles on. */
      if (gated && !gateOpen) box.appendChild(el('span', 'pt-need', needText(p)));
      else if (p.cost){
        var lc = el('span', 'pt-locked-cost');
        lc.appendChild(GH.coins.markWith(p.cost));
        box.appendChild(lc);
      }
      return box;
    }

    if (gated && !gateOpen){
      /* SAY "LOCKED" BEFORE SAYING WHY.

         Steven, 10 Sep: "nothing says this, it just looks broken."

         The requirement line was there and has been all along — but a
         quiet grey sentence under a button that does nothing reads as a
         fault, not as a condition. Nothing on the card ever used the word.

         So: a label with a padlock, then the requirement under it. The
         card now states its state before it states its terms. */
      var lk = el('div', 'pt-lockrow');
      lk.appendChild(el('span', 'pt-lock-ico', '\uD83D\uDD12'));
      lk.appendChild(el('span', 'pt-lock-word', t('stLocked')));
      box.appendChild(lk);
      box.appendChild(el('span', 'pt-need', needText(p)));

      /* A WAY TO GO AND LOOK. Steven: "if there's an achievement
         required, there should be a link from that pet to the
         achievements tab."

         Only when the gate actually mentions achievements, so it does not
         appear on the sixteen pets that just want days.

         It cannot go to a SPECIFIC achievement, and that is a data limit
         rather than an omission: the only achievement gate in
         data/pets.js is `awards:12`, a COUNT. No pet names an
         achievement, so there is no id to jump to. Naming one would need
         a new field on the pet plus focus support in
         js/activities/awards-view.js, whose `open(container, onExit)`
         takes no focus argument today. */
      if (p.need.awards && GH.awardsView && GH.app && GH.app.play){
        var toAw = el('button', 'pt-gate-link', t('stSeeAwards'));
        toAw.type = 'button';
        toAw.addEventListener('click', function(){
          GH.app.play({ id:'awards-view', open:GH.awardsView.open });
        });
        box.appendChild(toAw);
      }

      if (p.cost){
        var lc2 = el('span', 'pt-locked-cost');
        lc2.appendChild(GH.coins.markWith(p.cost));
        box.appendChild(lc2);
      }
      return box;
    }

    if (p.cost){
      var b = el('button', 'pt-buy' + (GH.coins.afford(p.cost) ? '' : ' is-dear'));
      b.type = 'button';
      b.disabled = !GH.coins.afford(p.cost);
      b.textContent = '';
      b.appendChild(GH.coins.markWith(p.cost));
      b.addEventListener('click', function(){ buy(p); });
      box.appendChild(b);

      /* EVERY PET THAT CANNOT BE BOUGHT SAYS WHY.

         Steven, 10 Sep: "if you cannot buy the pet, it needs to have a
         message on the pet — why you cannot buy the pet." On every one,
         not just the gated ones.

         The gate has its own label further up. This is the other reason:
         the gate is open, the price is simply out of reach. A disabled
         button with a number on it and nothing else is the same dead end
         as the locked card was — she can see the price, but not that the
         price IS the problem, nor how far off she is.

         The shortfall is stated, because "you need 240 more" is a target
         and "you cannot afford this" is a wall. */
      if (!GH.coins.afford(p.cost)){
        var short = p.cost - (GH.coins.balance ? GH.coins.balance() : 0);
        var dr = el('div', 'pt-lockrow is-dear');
        dr.appendChild(el('span', 'pt-lock-ico', '\uD83D\uDC8E'));
        dr.appendChild(el('span', 'pt-lock-word', t('stNeedMore', { n:Math.max(0, short) })));
        box.appendChild(dr);
      }

      /* the gate is behind her, so say so rather than leaving the card
         looking the same as one that was never gated */
      if (gated) box.appendChild(el('span', 'pt-need is-open', t('stGateOpen')));
    } else {
      var c = el('button', 'pt-buy is-claim', t('stClaim'));
      c.type = 'button';
      c.addEventListener('click', function(){ claim(p); });
      box.appendChild(c);
    }

    return box;
  }

  function paint(){
    host.textContent = '';

    /* The header's faces are built once and go stale the moment she buys,
       swaps or grows a pet — all of which repaint this screen and none of
       which anything broadcasts. */
    if (GH.petStrip) GH.petStrip.refresh();
    if (GH.purse) GH.purse.refresh();

    var head = el('div', 'practice-head st-head');
    var back = GH.back.button(leave);
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('stStore')));
    titles.appendChild(el('p', null, GH.coins.label()));
    head.appendChild(titles);
    host.appendChild(head);

    /* A token she does not know she has is not a reward. Said once, at the
       top, and absent entirely when there are none — a permanent 'tokens:
       0' is a reminder of what she has not got. */
    if (tokens() > 0){
      /* Named by kind, because an epic token and a common token are not
         the same reward and a bare count would hide the difference. */
      host.appendChild(el('p', 'pt-tokens',
        tokensHeld().map(function(x){
          return t('stTokensOf', { n:x.n, kind:t('ptTok_' + x.kind) });
        }).join(' \u00b7 ')));
    }

    /* `st-card` as well as `card`, so the store can drop the theme
       entirely — see the note in css/style.css. Steven: "Absolutely lose
       with prejudice all colors and identity of the themes in the store...
       Look how much fucking wasted space that is lost to theme cruft." */
    var card = el('div', 'card st-card');

    if (state.justGrew){
      var gp = find(state.justGrew);
      if (gp){
        var grew = el('div', 'pt-got');
        grew.appendChild(el('span', 'pt-got-name', (gp.name || gp.de) + ' \u00b7 ' + gp.de));
        grew.appendChild(el('span', 'pt-got-sub', t('stGrewTo', { n:form(gp.id) })));
        card.appendChild(grew);
      }
      state.justGrew = null;
    }

    /* ---------- SHE JUST BOUGHT ONE ----------

       Steven, 09 Sep: "when you buy a pet I want a window to open, the
       pet greets you" — with a glow behind the animal, the message below
       it, and a cheerful button.

       A WINDOW, NOT A STRIP. This began as one green line under the
       shelf. A pet costs real crystals and is the one thing in the app
       she picks out and keeps; a receipt is the wrong shape for that.

       VERTICAL, and the order matters: the animal first with its glow
       behind it, then who it is, then what it says. The glow is
       decoration and sits UNDER the picture, so a missing file changes
       nothing but the sparkle.

       IT SAYS ITS OWN LINE. All sixteen pets have a `buy` line written in
       data/petlines.js — German, English, Russian in both genders — and
       nothing had ever read it. This is a screen for text that was
       already there, not new content. */
    if (state.justBought){
      var p = find(state.justBought);
      if (p) gotWindow(p);
      state.justBought = null;
    }

    card.appendChild(el('p', 'gr-lede', t('stStoreLede')));

    /* the slots, first, because they change what everything else is for */
    var S = window.GH_PETS.slots;
    card.appendChild(el('h2', 'gr-group', t('stSlots')));
    card.appendChild(el('p', 'gr-note', t('stSlotsNote', { n:slots() })));
    if (slots() < S.length){
      var next = S[slots()];
      var sb = el('button', 'btn btn-primary pt-slot-buy');
      sb.type = 'button';
      sb.disabled = !GH.coins.afford(next.cost);
      sb.textContent = t('stBuySlot', { n:next.n }) + '  ' +
                       GH.coins.markText() + ' ' + next.cost;
      sb.addEventListener('click', buySlot);
      card.appendChild(sb);
    }

    /* ---------- TIERS COLLAPSE, ONE OPENS ----------

       Steven: "Right now when you open the store, you see a large card
       with the common pets at the beginning and you have to scroll past
       them to see the rare pets and scroll past them to see the epic
       pets. Instead, I want them all squished down and show the different
       tiers. You click on a tier and then that section expands... But
       without expanding, you see a small squished version of them so you
       could see all the pets at the same time."

       Sixteen full cards is a very long page, and the shape of it hid the
       thing she is actually shopping for: she could not see that a
       legendary pet exists without scrolling past eleven others. Now
       every tier shows a row of thumbnails, so all sixteen are on one
       screen, and tapping a tier opens that one at full size.

       ONE OPEN AT A TIME. Opening a second closes the first, which is
       what keeps the whole shelf glanceable — two expanded tiers is
       already most of the old problem back.

       NOT REMEMBERED between visits. This is a browsing state, not a
       preference: she comes to the store to look at a particular pet, and
       reopening on whatever she last expanded is as likely to be wrong as
       right. The `focus` path below already handles arriving with a pet
       in mind, and it now opens that pet's tier for her.

       The thumbnails are the same art at a smaller size, and a pet she
       owns is marked there too — so the row reads as a collection, not
       just a menu. */
    var TIERS = (window.GH_PETS.tiers || []);
    TIERS.forEach(function(tier){
      var group = petsOf().filter(function(x){ return x.tier === tier.id; });
      if (!group.length) return;

      var mine = group.filter(function(x){ return owns(x.id); }).length;
      var open = state.tier === tier.id;

      /* The heading is the switch. A button and not an <h2> with a
         handler: it is the only way into the tier, so it has to be
         reachable by keyboard and announce that it expands. */
      /* `gr-<tier>` so each heading takes its own colour — Steven wants
         rare blue, epic purple, legendary its own, so that arriving at a
         section tells you which one it is before you read the word. The
         four colours are in css/style.css, keyed on these ids. */
      var h = el('button', 'gr-group gr-' + tier.id + (open ? ' is-open' : ''));
      h.type = 'button';
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
      /* THE PILL, INSIDE THE BAND. Two elements, because they do two
         different jobs: the band is a solid stripe of the tier's colour
         and the pill is a readable ground for the text sitting on it.
         Steven: "The pill behind the text is totally fine. That has to be
         set so the text is readable. But the rest of that stripe should be
         the color for their tier."

         The three spans go inside one wrapper so the pill hugs them
         rather than spanning the whole width. */
      var pill = el('span', 'gr-pill');
      pill.appendChild(el('span', 'gr-group-t', t(tier.key)));
      pill.appendChild(el('span', 'gr-count', mine + '/' + group.length));
      /* One triangle that turns, not a + swapped for a -. Steven: "Maybe
         it has a little arrow that turns when it opens up and then you
         click it again and it turns back to the side." A rotation is one
         element and one transition; two characters is two states that can
         disagree with the panel. */
      /* U+203A, chevron — not the filled triangle. See `.gr-caret`. */
      pill.appendChild(el('span', 'gr-caret', '\u203a'));
      h.appendChild(pill);
      h.addEventListener('click', function(){
        state.tier = open ? null : tier.id;
        paint();
      });

      /* The band wraps the heading AND the note, so the whole stripe is
         one solid block of the tier's colour with no gap between them. */
      var band = el('div', 'gr-band gr-' + tier.id);
      band.appendChild(h);

      /* THE RUN NOTE GOES ABOVE THE SECTION, not on it. Steven: "The
         background colors for each tier don't need to have any text
         visible on top of it. It's simply a background color." So the
         velvet carries pictures and nothing else — the note sits on the
         page between the heading and the panel, where it needs no plate
         of its own to stay readable. Only when the tier is open: a
         collapsed tier is a glance, not a place to read. */
      /* `gr-<tier>` on the note as well as the heading, so the two form
         ONE continuous band of the tier's colour. Without it the note
         renders on the store page background and puts back the pale
         stripe the band exists to remove — Steven: "there is this ugly
         and pointless white or off white stripe behind that." */
      if (open) band.appendChild(el('p', 'gr-note', t('stNote_' + tier.id)));
      card.appendChild(band);

      /* ONE ROUNDED RECTANGLE, EITHER WAY. Collapsed it holds the pets in
         miniature; open it holds them full size. Same panel, same
         background, same corners — so opening a tier looks like the panel
         growing rather than one thing being replaced by another.

         The background is set inline because the filename lives in
         data/pets.js. CSS cannot read it, and four hardcoded rules in the
         stylesheet would be four things to change when a tier is
         renamed. */
      var sect = el('div', 'gr-sect gr-sect-' + tier.id +
                            (open ? ' is-open' : ' is-mini'));
      if (tier.bg){
        var url = GH.build ? GH.build.url('images/pets/' + tier.bg + '.webp')
                           : 'images/pets/' + tier.bg + '.webp';
        sect.style.backgroundImage = 'url("' + url + '")';
        sect.className += ' has-bg';
      }

      /* The rounded rectangle the pets sit on, inside the velvet. Two
         layers rather than one, per Steven: "The background is behind the
         rounded rectangle containing all of the pets. The rounded
         rectangle doesn't fill the entire page/screen. There's a little
         bit of the background visible behind it." */
      var plate = el('div', 'gr-plate');

      if (open){
        var grid = el('div', 'pt-grid');
        group.forEach(function(x){ grid.appendChild(petCard(x)); });
        plate.appendChild(grid);
      } else {
        /* Every pet in the tier at thumbnail size. Tapping one opens the
           tier AND focuses that pet, so a tap on the thing she wants does
           not just expand a list she then has to search. */
        var strip = el('div', 'pt-strip-row');
        group.forEach(function(x){
          var b = el('button', 'pt-thumb' + (owns(x.id) ? ' is-own' : ''));
          b.type = 'button';
          b.setAttribute('aria-label', x.name || x.de);
          b.setAttribute('title', x.name || x.de);
          var pic = art(x, 'shop');
          if (pic) b.appendChild(pic);
          else b.appendChild(el('span', 'pt-thumb-t', (x.name || x.de || '?').charAt(0)));
          b.addEventListener('click', function(e){
            /* Stop it reaching the section handler below, which would
               open the tier without the focus and undo the point of
               tapping a specific pet. */
            e.stopPropagation();
            state.tier = tier.id;
            state.focus = x.id;
            paint();
          });
          strip.appendChild(b);
        });
        plate.appendChild(strip);

        /* THE WHOLE FIELD OPENS THE TIER, not just the heading. Steven:
           "you should be able to click *anywhere* in the field of a tier
           to get it to open not just the title."

           A collapsed tier is a wide band of velvet with a few small
           thumbnails at the left, so most of what she is looking at was
           dead. Only when collapsed: once the tier is open the section
           is full of pet cards with their own buttons, and a catch-all
           click there would fire whenever she missed one. */
        sect.classList.add('is-tap');
        sect.addEventListener('click', function(){
          state.tier = tier.id;
          paint();
        });
      }
      sect.appendChild(plate);
      card.appendChild(sect);
    });

    host.appendChild(card);
  }

  /* `focus` is a pet id to scroll to and mark — the grid on the hub sends
     her here when she taps one she does not own, and landing at the top of
     a shelf of sixteen would make her hunt for it again. */
  /* ---------- THE WHOLE SCREEN IS THE STORE ----------

     Steven: "ALL THEME JUNK CAN DIE in the store at least. The ONLY bit
     that lives is 3 dark themes get the dark store and light themes get
     the light store."

     The card alone was not enough. `main` pads the page by
     clamp(16px,4vw,40px) and `body` paints the theme's own gradient, so
     even a full-bleed card left theme colour above it, below it and
     behind the header. A class on <html> lets the stylesheet repaint the
     page itself for as long as the store is open.

     CLEARED ON EVERY WAY OUT, which is the part that matters: a class
     left behind would repaint the hub too. Both the back button and
     `onExit` go through leave(). */
  function storeMode(on){
    var d = document.documentElement;
    if (!d || !d.classList) return;
    if (on) d.classList.add('st-mode');
    else d.classList.remove('st-mode');
  }

  function leave(){
    storeMode(false);
    state.onExit();
  }

  function open(container, onExit, focus){
    host = container;
    storeMode(true);
    state = { onExit:onExit, justBought:null, justGrew:null, focus:focus || null,
              /* Which tier is expanded. Null means all collapsed — see the
                 note in paint(). Arriving with a `focus` pet opens that
                 pet's tier, or the hub would send her here and she would
                 land on a collapsed shelf with nothing to scroll to. */
              tier:null };
    if (state.focus){
      var f = find(state.focus);
      if (f) state.tier = f.tier;
    }
    /* Repaint in place on a language change rather than letting app.js
       reopen the shelf — every pet's word and every tier name changes,
       which is much of the reason to switch language here at all. */
    GH.app.redraw = paint;
    paint();
  }

  /* For the end screen: who is cheering, and which face to wear.

     A round that went badly gets the sympathetic picture where one
     exists. A pet grinning at someone who just scored 30% is the wrong
     animal. */
  function cheerers(mood){
    var want = mood === 'kind' ? 'kind' : 'cheer';
    return chosen().map(find).filter(Boolean).map(function(p){
      return { id:p.id, name:shortName(p), full:p.name,
               de:p.de, ru:p.ru, en:p.en, tier:p.tier,
               pic:art(p, want),
               /* The end screen needs the same tap-to-enlarge the shelf
                  has, and it needs the picture it is actually showing —
                  the cheering or sympathetic face, not the shop pose. So
                  the path and the caption travel with the pet rather than
                  being rebuilt by a caller that does not know about forms
                  or moods. */
               url:lensUrl(p, want),
               caption:lensCaption(p) };
    });
  }

  /* Which file to enlarge.

     NOT pathFor(). That returns the suffixed name — flippy-the-frog-1-
     cheer.webp — and every pet in the data declares `art:[]`, meaning
     the drawings on disk are still the plain one-file-per-pet names from
     the first batch. chain() knows that and ends at plain(); pathFor()
     does not, so the shelf has been enlarging a 404 for all sixteen
     pets while the thumbnail beside it showed the picture correctly.

     chain()[0] is the same file the <img> chose, which is the whole
     point: the lightbox should show what she just tapped. */
  function lensUrl(p, mood){
    var tries = GH.petArt.chain(p, form(p.id), mood || 'shop');
    return tries[0];
  }

  /* One caption, used by the shelf and by the end screen, so the two
     cannot drift. */
  function lensCaption(p){
    var lang = GH.i18n.lang();
    return {
      de: p.name || p.de,
      gloss: p.de + (lang !== 'de' ? ' \u00b7 ' + (p[lang] || p.en) : ''),
      note: t('pt' + p.tier.charAt(0).toUpperCase() + p.tier.slice(1)),
      say: p.de
    };
  }

  /* What the hub's pet strip needs. All of it already existed inside this
     file; none of it was reachable, so the hub had no way to show a pet
     even though the pet lines were written months ago. */
  function strip(){
    return chosen().map(find).filter(Boolean).map(function(p){
      return { id:p.id, name:shortName(p), full:p.name, tier:p.tier,
               pic:art(p, 'kind'), url:lensUrl(p, 'kind'),
               caption:lensCaption(p) };
    });
  }

  /* ---------- THE THREE THE PET GRID CALLS ----------

     `petstrip.js`'s `tapped()` has always called `S.buyState(id)`,
     `S.pickById(id)` and `S.buyById(id)`. NONE OF THE THREE EXISTED.
     store.js exported eighteen functions and not one of those, so every
     tap in the pet grid threw and the grid did nothing — which is the
     "8 of 16 cells do nothing when tapped" noted days ago and never
     chased down. Steven found the consequence, 09 Sep: "if I buy pet
     carriers there's no clear way to choose which 3 I want to bring."

     It was not that choosing was unimplemented. petstrip.js was written
     against an interface store.js never grew.

     AND `chosen` WAS APPEND-ONLY. Both `buy()` and `spendToken()` do

         if (m.me.chosen.length < slots()) m.me.chosen.push(p.id);

     so a pet joins the strip only if there is room at the moment it is
     bought. Buy a carrier AFTER owning pets and the older ones can never
     be brought out; get bored of one and it can never be put away. That
     is the three-slots-showing-two Steven saw. `pickById` is the only
     thing in the file that can remove an id, which is why it is the
     important one of the three. */

  /* No `byId` existed either, and three call sites now want one. */
  function byId(id){
    var all = petsOf(), i;
    for (i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  /* What the grid needs to know about a pet to decide what a tap means.

     `tokenFor(p)` already returns the token kind she holds that would
     take this pet, or null, AND already returns null for one she owns —
     so it is the whole token question in one call. My first version
     paired it with `tokensHeld(kind)`, which does not take an argument
     and returns a list; that would have been true for every pet. */
  function buyState(id){
    var p = byId(id);
    if (!p) return 'locked';
    if (owns(id)) return 'own';
    if (p.need && !earned(p)) return 'locked';
    if (tokenFor(p)) return 'can';
    if (!p.cost) return 'locked';
    return (GH.coins && GH.coins.balance && GH.coins.balance() >= p.cost)
      ? 'can' : 'locked';
  }

  function buyById(id){
    var p = byId(id);
    if (!p || owns(id)) return false;

    /* THE STORE SCREEN DOES NOT HAVE TO BE OPEN.

       `buy()` and `spendToken()` both end with `state.justBought = ...`
       and `paint()`. `state` is assigned only inside `open()` and
       `paint()` writes into `host` — so both are screen operations, and
       calling them from the PET GRID, which can be opened from the header
       without ever visiting the Store, throws on a null `state`.

       That is a live path: the grid is where Steven expects to buy and
       equip, and it is reachable from every screen.

       So the screen bookkeeping is stubbed for the duration of the call
       and put back afterwards. Stubbing rather than guarding inside
       `buy()` keeps the store screen's own behaviour exactly as it was —
       when the Store IS open, `state` is real and this changes nothing. */
    var hadState = state, hadHost = host;
    var headless = !state;
    if (headless){
      /* BOTH of them. `state` alone is not enough: `paint()` starts with
         `host.textContent = ''`, so a null host throws one line after the
         purchase has already been saved. Measured — the first version of
         this stubbed only `state` and every buy came back false while
         quietly succeeding.

         A detached div rather than the real host: `paint()` then draws a
         complete store screen into nothing and it is discarded. Cheap,
         and far safer than teaching `buy()` to skip its repaint. */
      state = { onExit:null, justBought:null, justGrew:null, focus:null };
      host = document.createElement('div');
    }
    try {
      /* A token pays before crystals do: it is the narrower currency, and
         spending crystals on a pet a held token would have taken wastes
         the token, which may fit nothing else. */
      if (tokenFor(p)) spendToken(p); else buy(p);
    } catch (e){
      /* Nothing above should throw now. If something does, the save has
         already happened or it has not — `owns()` below is read AFTER
         the fact either way, which is what the first version got wrong:
         it captured the answer before the save. */
    }
    if (headless){ state = hadState; host = hadHost; }
    return owns(id);
  }

  /* IN AND OUT OF THE STRIP. Toggles, capped at the carriers she owns.

     REFUSES rather than swapping when the slots are full. Steven's call
     was mine to make and this is the safer half: swapping the oldest
     would silently put away a pet she had deliberately chosen, on a tap
     she may have meant for something else. Refusing costs her one extra
     tap and cannot lose anything.

     Returns 'on', 'off' or 'full' so the caller can say which happened —
     a refusal that looks identical to a no-op is the bug this replaces. */
  function pickById(id){
    if (!owns(id)) return 'no';
    var m = mine();
    var list = (m.me.chosen || []).filter(function(x){
      return m.me.own.indexOf(x) >= 0;
    });
    var at = list.indexOf(id);
    var out;
    if (at >= 0){
      list.splice(at, 1);
      out = 'off';
    } else if (list.length >= slots()){
      return 'full';                 /* nothing saved, nothing lost */
    } else {
      list.push(id);
      out = 'on';
    }
    m.me.chosen = list;
    save(m);
    return out;
  }

  /* Every pet, with whether it is hers — for the grid. `earned` says
     whether the gate is behind her, so the grid can tell "not bought yet"
     from "not available yet", which are different disappointments. */
  function shelf(){
    return petsOf().map(function(p){
      return { id:p.id, name:shortName(p), full:p.name, tier:p.tier,
               de:p.de, ru:p.ru, en:p.en, cost:p.cost || 0,
               own:owns(p.id), open:!p.need || earned(p),
               pic:art(p, owns(p.id) ? 'kind' : 'shop'),
               picked:chosen().indexOf(p.id) >= 0 };
    });
  }

  /* WHY A PET CANNOT BE BOUGHT, in her language.

     The grid greys a locked cell and needs to say what would open it.
     `needText` already builds that sentence for the shelf, so this is the
     same wording rather than a second one that could drift from it.

     Empty string when the pet is not gated — the caller then falls back
     to "not yet", which covers simply not affording it. */
  /* Does this pet's gate mention achievements? The grid asks, so a tap on
     such a pet can go straight there rather than only saying so. */
  /* Counts the achievements read. Exported so awards.js can test them
     without reaching into this module's storage. */
  function ownedCount(){
    var n = 0;
    petsOf().forEach(function(x){ if (owns(x.id)) n++; });
    return n;
  }
  function slotCount(){ return slots(); }

  function needsAward(id){
    var p = find(id);
    return !!(p && p.need && p.need.awards);
  }

  function needFor(id){
    var p = find(id);
    if (!p || !p.need) return '';
    return needText(p) || '';
  }

  return { open:open, cheerers:cheerers, art:art, owns:owns, needFor:needFor, needsAward:needsAward,
           awardWindow:awardWindow,
           ownedCount:ownedCount, slotCount:slotCount,
           /* The three petstrip.js has always called — see the note by
              `buyState`. Missing until 09 Sep. */
           buyState:buyState, buyById:buyById, pickById:pickById,
           strip:strip, shelf:shelf, chosen:chosen,
           slots:slots, form:form, god:god, setGod:setGod,
           tokens:tokens, tokensHeld:tokensHeld, tokenFor:tokenFor,
           grantToken:grantToken, tokenKinds:TOKEN_ORDER, tokenReach:TOKEN,
           lensCaption:lensCaption, lensUrl:lensUrl };
})();
