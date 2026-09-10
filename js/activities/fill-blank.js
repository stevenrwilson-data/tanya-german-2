/* js/activities/fill-blank.js */
/* Fill in the missing word.
   Every round = one sentence with one blank taken out. A blank is either a
   single word or a whole noun phrase ("eine neue Jacke").
   The sentence is spoken before the round and again once it is solved. */

window.GH = window.GH || {};

GH.fillBlank = (function(){

  var t = function(k, v){ return GH.i18n.t(k, v); };

  var pool = null;   /* answer pool for the wrong choices */
  var host = null;   /* container element */
  var state = null;

  /* ---------- answer pool ---------- */

  function buildPool(){
    var byCat = {}, all = [];
    function add(cat, de){
      GH.text.allUnits(de).forEach(function(u){
        var item = { text:u.text.trim(), words:u.wordCount };
        if (!byCat[cat]) byCat[cat] = [];
        byCat[cat].push(item);
        all.push(item);
      });
    }
    (GH_BANK.sentences || []).forEach(function(s){ add(s.cat, s.de); });
    (GH_BANK.stories || []).forEach(function(st){
      (st.sentences || []).forEach(function(s){ add(st.cat, s.de); });
    });
    return { byCat:byCat, all:all };
  }

  function distractors(target, wordCount, cat, howMany){
    if (!pool) pool = buildPool();
    var cap = GH.text.capitalized(target);
    var seen = {};
    seen[GH.text.normalize(target)] = true;
    var near = [], far = [];

    [pool.byCat[cat] || [], pool.all].forEach(function(list){
      GH.text.shuffle(list).forEach(function(item){
        var key = GH.text.normalize(item.text);
        if (seen[key]) return;
        if (item.words !== wordCount) return;
        if (GH.text.capitalized(item.text) !== cap) return;
        seen[key] = true;
        if (Math.abs(item.text.length - target.length) <= 5) near.push(item.text);
        else far.push(item.text);
      });
    });
    return near.concat(far).slice(0, howMany);
  }

  /* ---------- rounds ---------- */

  /* Rounds are interleaved by pass, not grouped by sentence: every
     sentence's first blank, then every sentence's second, and so on.
     Grouping them put the same sentence on screen three times in a
     row. Stories pass ordered:true so their narrative sequence
     survives; topic lists get each pass shuffled separately so the
     three passes aren't in identical order. */
  function buildRounds(sentences, ordered){
    var perSentence = sentences.map(function(s){
      var tokens = GH.text.tokenize(s.de);
      return GH.text.blankUnits(s.de, s.blanks).map(function(u){
        return {
          sentence:s,
          tokens:tokens,
          start:u.start,
          end:u.end,
          words:u.wordCount,
          answer:u.text.trim(),
          options:null
        };
      });
    });

    var most = 0, i;
    for (i = 0; i < perSentence.length; i++){
      if (perSentence[i].length > most) most = perSentence[i].length;
    }

    var rounds = [], pass, group;
    for (pass = 0; pass < most; pass++){
      group = [];
      for (i = 0; i < perSentence.length; i++){
        if (perSentence[i][pass]) group.push(perSentence[i][pass]);
      }
      if (!ordered) group = GH.text.shuffle(group);
      rounds = rounds.concat(group);
    }

    /* A pass can end and the next begin on the same sentence when only
       one sentence carries that many blanks. Nudge those apart. */
    for (i = 1; i < rounds.length; i++){
      if (rounds[i].sentence !== rounds[i - 1].sentence) continue;
      var j;
      for (j = i + 1; j < rounds.length; j++){
        if (rounds[j].sentence !== rounds[i - 1].sentence &&
            (j + 1 >= rounds.length || rounds[j + 1].sentence !== rounds[i].sentence)){
          var tmp = rounds[i]; rounds[i] = rounds[j]; rounds[j] = tmp;
          break;
        }
      }
    }
    return rounds;
  }

  /* ---------- helpers ---------- */

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function translationOf(s){
    var lang = GH.i18n.lang();
    if (lang === 'de') return '';
    return s[lang] || '';
  }

  /* A topic can yield fifty-seven rounds, because every sentence has two or
     three blanks. Fifty-seven of anything without a pause is a slog and
     nothing about it feels like progress — she cannot see the end and gets
     no verdict until she reaches it. So the rounds are served in sets, with
     a short report between them and the option to stop. */
  var SET = 12;

  function setEnd(){ return Math.min(state.setStart + SET, state.rounds.length); }
  function inSet(){ return state.i - state.setStart; }
  function setSize(){ return setEnd() - state.setStart; }
  function lastSet(){ return setEnd() >= state.rounds.length; }

  function round(){ return state.rounds[state.i]; }

  /* ---------- speaking ---------- */

  /* Auto-play is the German spoken BEFORE she answers. It is a crutch,
     so it can be switched off; the sentence is still spoken after a
     correct answer either way, and the Listen button always works.
     Remembered between visits — a preference that resets every session
     is no preference at all. Private browsing on iOS throws rather
     than returning null, hence the try/catch. */
  var AUTO_KEY = 'gh-autoplay';

  /* ---------- FOUR TIERS, NOT TWO ----------

     Steven: "What happened to having the 1/2 point where you could see
     the word and type it out? This is a steep cliff between MC and type
     out from no help at all."

     He is right and the cliff was real: tapping one of four options and
     typing a word from nothing are not adjacent skills. Two rungs go
     between them.

       choose   four options, tap one
       copy     the word is shown; type it while looking at it
       options  the four options stay on screen; type it
       peek     look at the word, then it goes; type it from memory
       type     nothing shown but the audio

     FIVE, because Steven asked for both middles. His third rung was
     "type from MC" — the options still visible while she types — and
     GPT's was see-it-then-lose-it. Those are different exercises: one
     removes the tapping but keeps the spelling in front of her, the other
     removes the spelling but not the recall. Steven: "I would prefer you
     see it.. but we could have a see and disappear version in the middle,
     too. That could be a 5th.. More scaffolding is good."

     So the ladder takes away one support at a time: the tap, then the
     spelling, then the sight of it, then the options.

     `copy` is the rung Word Lab already uses — its own COPY_AGAIN line
     reads "Type it while you can see it" — so the idea is not new to the
     app, only new to the fill-blank screens.

     REMEMBERED, AND EVERYWHERE. Steven: "That should be persistent across
     ALL fill in blank type games all of sections 1, 2, 4. And anywhere
     else sentence completion exists." The mode used to live on `state`,
     so it reset to `choose` on every round and every screen. It is a
     stored preference now — and because this one file drives the blanks
     in Sections 1, 2 and 4, in the Reader and in the songbook, storing it
     here is what makes it apply in all five.

     SCOPED PER PLAYER, because Nazar and Tanya are not on the same rung
     and a shared key would put one of them on the wrong one. */

  /* ---------- THE FIVE ICONS ----------

     Steven's, drawn to spec: 24x24, monochrome, every stroke and fill
     `currentColor`.

     INLINE AND NOT FIVE .svg FILES, and that is a requirement rather than
     a preference: an `<img src="icon.svg">` CANNOT inherit currentColor.
     The whole reason these are monochrome is so the active rung takes the
     accent and the rest take soft ink, across twelve themes, with no
     extra art — and that only works if the markup is in the document.

     `innerHTML` on a span, once per button. The markup is a constant in
     this file, never anything a user typed, so there is nothing to
     sanitise.

     WHY THE LABELS STILL EXIST. An icon nobody has been taught is a
     guess, so the toggle shows the ACTIVE rung's name underneath, and the
     legend behind the ? explains all five in her own language. Steven:
     "you see icons but there's a help sheet/screen that pops up and shows
     the icons and their names in L1 with a description in L1."

     Copy against Peek is the pair doing the most work: both mean the word
     is visible, and the slashed eye is the only thing saying "was". If it
     ever reads as mute-or-hidden instead, that is the one to redraw. */
  var ICON = {
    choose: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2" fill="currentColor" stroke="none"/>',
    copy: '<rect x="4.5" y="3.25" width="15" height="8.5" rx="1.4"/><path d="M8 6.5h8M8 9.25h5.5"/><path d="M12 12.25v3.5"/><path d="M9.75 14.5L12 16.75 14.25 14.5"/><path d="M5.5 20.5h13"/>',
    options: '<path d="M3.5 5.5h8"/><path d="M3.5 10h6.5"/><path d="M3.5 14.5h7"/><path d="M16.25 6.5v11"/><path d="M16.25 18.75h4.25"/>',
    peek: '<path d="M3.5 12s3.2-5.25 8.5-5.25S20.5 12 20.5 12s-3.2 5.25-8.5 5.25S3.5 12 3.5 12z"/><circle cx="12" cy="12" r="2.35"/><path d="M4.5 19.5L19.5 4.5"/>',
    /* v2, Steven's redraw: speaker → two waves → I-beam, with a gap
       before the caret. The first version put a bare cursor beside a
       speaker outline and read as neither. A filled speaker says AUDIO
       plainly, and a proper I-beam with serifs reads as a text caret
       rather than a stray line. */
    type: '<path d="M2.4 9.05h2.45v5.9H2.4z" fill="currentColor" stroke="none"/>' +
          '<path d="M4.85 9.05L9.55 6.15v11.7L4.85 14.95z" fill="currentColor" stroke="none"/>' +
          '<path d="M11.55 8.35c1.25 1.2 1.9 2.55 1.9 3.65s-.65 2.45-1.9 3.65"/>' +
          '<path d="M14.15 6.55c1.85 1.75 2.8 3.7 2.8 5.45s-.95 3.7-2.8 5.45"/>' +
          '<path d="M20.35 4.2v15.6"/>' +
          '<path d="M18.5 4.2h3.7"/>' +
          '<path d="M18.5 19.8h3.7"/>'
  };

  function icon(m){
    var span = document.createElement('span');
    span.className = 'fb-ico';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
      (ICON[m] || '') + '</svg>';
    return span;
  }

  var MODES = ['choose', 'copy', 'options', 'peek', 'type'];
  var MODE_LABEL = { choose:'choose', copy:'fbmCopy', options:'fbmOptions',
                     peek:'fbmPeek', type:'type' };
  var MODE_HELP  = { choose:'fbhChoose', copy:'fbhCopy', options:'fbhOptions',
                     peek:'fbhPeek', type:'fbhType' };

  /* The help sheet: all five, each with its icon, its name and what it
     asks of her — in her own language. Handed to howto.js, which already
     owns the overlay, the close button and the focus handling, and whose
     panel was fixed earlier so it cannot clip its own top on a phone. */
  function legend(){
    if (!GH.howto || !GH.howto.legend) return;
    GH.howto.legend('fbLegendTitle', MODES.map(function(m){
      return { icon:icon(m), name:t(MODE_LABEL[m]), desc:t(MODE_HELP[m]) };
    }));
  }

  /* ---------- THE LEGEND EXPLAINS ITSELF, ONCE ----------

     Steven, 09 Sep: "the first time you hit any of the icons at all the
     window should pop up to explain them. Clicking Got It closes. Then
     the ? glows indicating you can open that window again from the ?"

     Five icons with no labels are not guessable, and the one control that
     would say what they are is the smallest thing on the screen. So the
     first tap on any rung opens the legend, unasked. After that it never
     interrupts again, and the ? carries a glow until she uses it — which
     is what tells her where the explanation went.

     TWO FLAGS, not one. `fbLegend` records that she has seen it;
     `fbLegendQ` records that she has since found the ?. The glow is the
     window between them. One flag could not express "seen, but does not
     yet know where it lives", which is exactly the state the glow is for.

     Both live on GH.howto's own storage, so this behaves like every other
     first-run explainer in the app and is forgotten if she resets. The
     legend's Got-it button and its close already exist in howto.js —
     nothing new was built here, only wired. */
  function legendSeen(){
    return !GH.howto || !GH.howto.seen || GH.howto.seen('fbLegend');
  }
  function markLegendSeen(){
    if (GH.howto && GH.howto.markSeen) GH.howto.markSeen('fbLegend');
  }
  function qFound(){
    return !GH.howto || !GH.howto.seen || GH.howto.seen('fbLegendQ');
  }
  function markQFound(){
    if (GH.howto && GH.howto.markSeen) GH.howto.markSeen('fbLegendQ');
  }

  function modeKey(){
    var k = 'gh-fb-mode';
    return (GH.player && GH.player.scope) ? GH.player.scope(k) : k;
  }

  function savedMode(){
    try {
      var v = window.localStorage.getItem(modeKey());
      return MODES.indexOf(v) >= 0 ? v : 'choose';
    } catch (e){ return 'choose'; }
  }

  function setMode(m){
    try { window.localStorage.setItem(modeKey(), m); } catch (e){}
  }

  function autoOn(){
    try {
      return window.localStorage.getItem(AUTO_KEY) !== 'off';
    } catch (e){ return true; }
  }

  function setAuto(on){
    try { window.localStorage.setItem(AUTO_KEY, on ? 'on' : 'off'); } catch (e){}
  }

  function speakSentence(){
    var r = round();
    if (!r) return;
    var btn = host.querySelector('.speak');
    if (btn) btn.classList.add('is-speaking');
    GH.speech.say(r.sentence.de, function(){
      var b = host.querySelector('.speak');
      if (b) b.classList.remove('is-speaking');
    });
  }

  /* ---------- painting ---------- */

  function paint(){
    var r = round();
    if (!r){ paintDone(); return; }
    if (state.i >= setEnd()){ paintSetBreak(); return; }

    host.textContent = '';

    var back = GH.back.button(function(){
      GH.speech.stop();
      state.onExit();
    });
    host.appendChild(back);

    /* header row */
    var top = el('div', 'practice-top');
    var titleWrap = el('div', 'practice-title');
    titleWrap.appendChild(el('h2', null, state.title));
    /* THE SUBTITLE IS GONE FROM THE ROUND. Steven: "Lose everything but
       Shopping."

       `Section 1 · Sentences` is where the topic CAME FROM, and she has
       just arrived from there — it told her nothing she did not know two
       seconds ago, and on a phone it wrapped to two lines and pushed the
       question down. `state.subtitle` is still set by every caller and is
       still used on the end screens; it is only this header that drops it. */
    top.appendChild(titleWrap);

    var prog = el('div', 'progress');
    var track = el('span', 'progress-track');
    var fill = el('span', 'progress-fill');
    fill.style.width = Math.round((inSet() / setSize()) * 100) + '%';
    track.appendChild(fill);
    prog.appendChild(track);
    prog.appendChild(el('span', null, t('progress', { i:inSet() + 1, n:setSize() })));
    top.appendChild(prog);

    /* `set 1 of 6` USED TO SIT HERE AND BROKE.

       It was the fourth thing in a flex row already holding the title, a
       progress bar, `1 of 12`, `100%` and the streak. On a phone it got no
       width at all and wrapped one word per line — `set / 1 / of / 6`,
       four lines of tiny text down the side of the header.

       It is a summary, not something she needs while answering a question,
       so it moved to the screen that exists to summarise: paintSetBreak()
       below carries it as the end screen's badge. */
    var run = GH.run.header(state.run);
    top.appendChild(run);
    host.appendChild(top);

    /* card */
    var card = el('div', 'card');

    /* THE STREAK RIDES THE CARD'S TOP EDGE. Steven's placement.

       A WRAPPER IS REQUIRED and is not decoration: `.card` is
       `overflow:hidden`, so a badge positioned to straddle its top edge
       from the inside is simply cut in half. `.card` is shared by every
       activity, so removing that clip to suit this one screen would reach
       all of them. The wrapper positions the badge over the card from
       outside instead, and nothing else changes.

       Moved rather than copied — appendChild takes it out of `run`, so the
       percentage keeps the header to itself and there is only ever one
       streak on screen. */
    var cardWrap = el('div', 'fb-cardwrap');
    var streak = run.querySelector('.run-streak');
    if (streak){
      streak.className += ' fb-streak';
      cardWrap.appendChild(streak);
    }

    var tools = el('div', 'card-tools');
    if (GH.speech.supported){
      var speak = el('button', 'speak');
      speak.type = 'button';
      speak.appendChild(el('span', 'speak-icon', '🔊'));
      speak.appendChild(el('span', null, state.solved ? t('listenAgain') : t('listen')));
      speak.addEventListener('click', speakSentence);
      tools.appendChild(speak);

      var auto = el('button', 'autotoggle', t('autoPlay'));
      auto.type = 'button';
      auto.setAttribute('aria-pressed', autoOn() ? 'true' : 'false');
      auto.setAttribute('title', t(autoOn() ? 'autoPlayOn' : 'autoPlayOff'));
      auto.addEventListener('click', function(){
        setAuto(!autoOn());
        paint();
      });
      tools.appendChild(auto);
    }

    var modes = el('div', 'mode-toggle is-five');
    MODES.forEach(function(m){
      var b = el('button', 'fb-rung' + (state.mode === m ? ' is-on' : ''));
      b.type = 'button';
      /* The name is on the button for a screen reader and in the tooltip
         for a mouse, but only the ACTIVE rung shows it on screen — see
         the note by ICON. */
      b.setAttribute('aria-label', t(MODE_LABEL[m]));
      b.setAttribute('title', t(MODE_LABEL[m]));
      b.appendChild(icon(m));
      b.setAttribute('aria-pressed', state.mode === m ? 'true' : 'false');
      b.addEventListener('click', function(){
        /* FIRST TAP ON ANY RUNG EXPLAINS THEM ALL.

           The mode change happens first and the legend opens over the
           top of it, so her tap is never swallowed — she gets the rung
           she asked for AND finds out what the other four are. */
        var first = !legendSeen();
        if (first) markLegendSeen();
        if (state.mode !== m){
          state.mode = m;
          setMode(m);               /* remembered — see the note above */
          state.shown = false;      /* a new rung starts unpeeked */
          paint();
        }
        if (first) legend();
      });
      modes.appendChild(b);
    });
    tools.appendChild(modes);
    card.appendChild(tools);

    /* One line saying what this rung asks of her. Labels of Choose, Copy,
       See-then-type and Type are not self-explanatory, and the difference
       between the middle two is exactly what a button label cannot
       carry. */
    var why = el('div', 'fb-mode-why');
    why.appendChild(el('span', 'fb-mode-name', t(MODE_LABEL[state.mode])));
    card.appendChild(why);

    /* THE ? GOES IN THE CARD'S TOP RIGHT CORNER.

       Steven, 09 Sep: "the ? to explain icons needs to be upper right."

       It used to sit inside `.fb-mode-why`, the centred row that names the
       current rung — so it rendered BELOW the Listen / AUTO / COPY
       toolbar, reading as part of the mode label rather than as help for
       the screen. A help affordance belongs in a corner where it is found
       by habit, not in the middle of a row where it competes with the
       thing it explains.

       Appended to the card and absolutely placed, so it does not push the
       toolbar around and does not care what order the rows are built in. */
    /* Glowing while she has seen the legend but not yet found the ? —
       see the note by `legendSeen`. The glow is a pointer, not an alert,
       and it stops the first time she uses it. */
    var glow = legendSeen() && !qFound();
    var q = el('button', 'fb-mode-q' + (glow ? ' is-new' : ''), '?');
    q.type = 'button';
    q.setAttribute('aria-label', t('fbLegendTitle'));
    q.addEventListener('click', function(){
      if (!qFound()){
        markQFound();
        q.className = 'fb-mode-q';   /* stop glowing immediately */
      }
      legend();
    });
    card.appendChild(q);
    card.appendChild(el('p', 'fb-mode-help', t(MODE_HELP[state.mode])));

    /* `sheet`/`pos` addresses a cell in one of data/gallery.js's named
       sheets (fruit-1, vegetables-01-leafy-greens, ...) — the newer
       addressing GH.sprite.cell() already crops, same as the hub's own
       galleries. `img` stays the older single-number address into the
       numbered images/1.webp.. bank, or a direct URL. A sentence carries
       one or the other, never both. */
    if (r.sentence.sheet){
      var fig = el('figure', 'figure');
      fig.appendChild(GH.sprite.cell(r.sentence.sheet, r.sentence.pos));
      card.appendChild(fig);
    } else if (r.sentence.img){
      var fig = el('figure', 'figure');
      if (typeof r.sentence.img === 'number'){
        fig.appendChild(GH.sprite.tile(r.sentence.img));
      } else {
        var im = document.createElement('img');
        im.src = r.sentence.img;
        im.alt = '';
        fig.appendChild(im);
      }
      card.appendChild(fig);
    }

    /* the sentence, with a slot where the blank is */
    var p = el('p', 'sentence');
    var i;
    for (i = 0; i < r.tokens.length; i++){
      if (i === r.start){
        var marks = [];
        var w;
        for (w = 0; w < r.words; w++) marks.push('???');
        var slot = el('span', 'slot' + (state.solved ? ' filled' : ''),
                      state.solved ? r.answer : marks.join(' '));
        p.appendChild(slot);
      } else if (i > r.start && i <= r.end){
        continue;
      } else {
        p.appendChild(document.createTextNode(r.tokens[i].text));
      }
    }
    card.appendChild(p);

    var tr = translationOf(r.sentence);
    if (tr) card.appendChild(el('p', 'translation', tr));

    /* What the word she just filled in actually means.

       Only after she has answered. Before, it is the answer — `das Hemd ·
       shirt` above a blank whose answer is Hemd is not a hint, it is the
       solution.

       And only when there is something to say. An article, a question
       word or a name resolves to nothing and shows nothing, rather than a
       hedged line: `Das` has a grammatical job, not a meaning.

       This is the gap the exercise had. She read `Das ___ ist sehr
       billig` with `That is very cheap` underneath, typed the right word,
       and was told she was right — without ever being shown which word
       she had translated. */
    if (state.solved){
      var said = GH.wordlook ? GH.wordlook.explain(r.answer) : null;
      if (said){
        var w = el('p', 'fb-word');
        var deb = el('button', 'fb-word-de', said.de);
        deb.type = 'button';
        deb.setAttribute('aria-label', said.de);
        deb.addEventListener('click', function(){ GH.speech.say(said.de); });
        w.appendChild(deb);
        w.appendChild(el('span', 'fb-word-gloss',
          said.senses ? '' : said.gloss));
        card.appendChild(w);

        /* A word with more than one meaning gets all of them. Showing the
           first would teach her that `Fuß` is ступня and quietly hide
           подножие, which is worse than the gap this block was written to
           close. */
        if (said.senses){
          var list = el('ul', 'fb-senses');
          said.senses.forEach(function(sn){
            var li = el('li', 'fb-sense');
            li.appendChild(el('span', 'fb-sense-gloss', sn.gloss));
            if (sn.def) li.appendChild(el('span', 'fb-sense-def', sn.def));
            list.appendChild(li);
          });
          card.appendChild(list);
        }
      }
    }

    /* answers */
    var answers = el('div', 'answers');

    if (!state.solved && state.mode === 'choose'){
      if (!r.options){
        r.options = GH.text.shuffle(
          [r.answer].concat(distractors(r.answer, r.words, r.sentence.cat || state.cat, 3))
        );
      }
      var opts = el('div', 'options');
      /* Two per row unless one of them is long. The blanks are usually a
         single word — `Haben`, `Das`, `Kleid` — and four of those down the
         whole screen is three quarters of a phone spent on four words. But
         a multi-word blank in a two-column track wraps to three lines, so
         the longest option in the set decides for all of them: mixed
         widths in a grid look like a mistake. */
      var longest = 0;
      r.options.forEach(function(w){ if (w.length > longest) longest = w.length; });
      var wide = longest > 14;

      r.options.forEach(function(word){
        var b = el('button', 'option' + (wide ? ' is-wide' : ''), word);
        b.type = 'button';
        if (state.ruledOut[GH.text.normalize(word)]){
          b.classList.add('is-wrong');
          b.disabled = true;
        }
        b.addEventListener('click', function(){ pickOption(word, b); });
        opts.appendChild(b);
      });
      answers.appendChild(opts);
    }

    /* COPY — the answer is on screen and she types it while looking at
       it. No options alongside: a word plus four alternatives is a harder
       screen than the word alone, not an easier one. */
    if (!state.solved && state.mode === 'copy'){
      answers.appendChild(el('p', 'fb-show', r.answer));
    }

    /* PEEK — the word first, then gone. Revealed by a button rather than
       a timer: a word that vanishes on a clock vanishes while she is
       still reading it, and there is no way to ask for it back. */
    if (!state.solved && state.mode === 'peek' && !state.shown){
      answers.appendChild(el('p', 'fb-show', r.answer));
      var ready = el('button', 'btn btn-primary fb-ready', t('fbReady'));
      ready.type = 'button';
      ready.addEventListener('click', function(){
        state.shown = true;
        paint();
      });
      answers.appendChild(ready);
    }

    /* OPTIONS — the four choices stay on screen but she types instead of
       tapping. Plain chips, not buttons: they are there to be read, and a
       tappable one here would just be `choose` again. */
    if (!state.solved && state.mode === 'options'){
      if (!r.options){
        r.options = GH.text.shuffle(
          [r.answer].concat(distractors(r.answer, r.words, r.sentence.cat || state.cat, 3))
        );
      }
      var ref = el('div', 'fb-ref');
      r.options.forEach(function(w){ ref.appendChild(el('span', 'fb-ref-w', w)); });
      answers.appendChild(ref);
    }

    var typing = state.mode === 'type' || state.mode === 'copy' ||
                 state.mode === 'options' ||
                 (state.mode === 'peek' && state.shown);

    if (!state.solved && typing){
      var box = el('div', 'typebox');
      var input = document.createElement('input');
      input.type = 'text';
      input.autocomplete = 'off';
      input.spellcheck = false;
      input.placeholder = t('typeHere');
      input.value = state.typed || '';
      input.addEventListener('input', function(){ state.typed = input.value; });
      input.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){ e.preventDefault(); checkTyped(input.value); }
      });
      var go = el('button', 'btn btn-primary', t('check'));
      go.type = 'button';
      go.addEventListener('click', function(){ checkTyped(input.value); });
      box.appendChild(input);
      box.appendChild(go);
      answers.appendChild(box);
      setTimeout(function(){ input.focus(); }, 0);
    }

    var fb = el('p', 'feedback' + (state.feedbackKind ? ' ' + state.feedbackKind : ''));
    if (state.feedback) fb.textContent = state.feedback;
    answers.appendChild(fb);
    card.appendChild(answers);

    /* foot */
    var foot = el('div', 'card-foot');
    if (!state.solved){
      var skip = el('button', 'btn-quiet', t('skip'));
      skip.type = 'button';
      skip.addEventListener('click', reveal);
      foot.appendChild(skip);
    }
    foot.appendChild(el('span', 'spacer'));
    if (state.solved){
      var last = state.i === state.rounds.length - 1;
      var endsSet = state.i === setEnd() - 1;
      var next = el('button', 'btn btn-primary js-advance',
        last ? t('finish') : (endsSet ? t('fbSetDone') : t('next')));
      next.type = 'button';
      next.addEventListener('click', function(){ goTo(state.i + 1); });
      foot.appendChild(next);
    }
    card.appendChild(foot);

    cardWrap.appendChild(card);
    host.appendChild(cardWrap);
    if (state.solved) GH.nav.ready();
  }

  /* Between sets: how she did, and a genuine choice about carrying on.
     A learner who has to abandon a round to stop learns to avoid starting
     one. Offering the exit is what makes the next set voluntary. */
  function paintSetBreak(){
    host.textContent = '';
    var done = state.setStart + SET;
    var left = state.rounds.length - done;
    GH.endScreen.render(host, {
      tone: state.run.streak >= SET ? 'perfect' : 'done',
      glyph: state.run.streak >= SET ? '\ud83c\udfc6' : '\u2713',
      title: t('fbSetTitle', { i:Math.floor(state.setStart / SET) + 1 }),
      /* Where `set 1 of 6` went. It was unreadable in the round header and
         it belongs on a summary screen anyway — this is the one place in
         the topic where knowing how much of it is left is the question she
         is actually being asked. Only when there IS more than one set. */
      badge: state.rounds.length > SET
        ? t('fbSetOf', { i:Math.floor(state.setStart / SET) + 1,
                         n:Math.ceil(state.rounds.length / SET) })
        : null,
      stats: GH.run.stats(state.run),
      /* Say why there are no Kronen here.

         A set break is a pause inside one round, not the end of it, and
         paying twelve at a time would make a fifty-question topic worth
         four exercises instead of one. So nothing is paid until the topic
         is finished — which is fine as a rule and was invisible as a
         screen: it showed the score, the misses and no coins, which reads
         exactly like a round that earned nothing. */
      note: t('fbLeftN', { n:left }) + ' ' + t('fbPayAtEnd'),
      reviews: [{
        head: t('fbMissedHead'),
        tone: 'missed',
        items: state.missed.slice(-8).map(function(m){
          var lang = GH.i18n.lang();
          return { n:m.sentence.img, de:m.answer, gloss:m.sentence.de,
                   flag: lang !== 'de' ? (m.sentence[lang] || '') : '' };
        }),
        onTap: function(x){ GH.speech.say(x.gloss); }
      }],
      actions: [
        { label:t('fbKeepGoing'), kind:'primary', onClick:function(){
            state.setStart = done;
            state.missed = [];
            goTo(done);
          } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  function paintDone(){
    host.textContent = '';
    var total = state.rounds.length;
    var wrong = state.missed.length;
    var right = total - wrong;
    var lang = GH.i18n.lang();

    /* pay for the round before drawing the screen that reports it.
       Ten Kronen an exercise, and a longer round counts as more than
       one — coins.unitsFor() reads the answer count. */
    var paid = GH.coins ? GH.coins.award('fillblank', state.run, {}) : null;
    var won = GH.awards ? GH.awards.afterRound('fillblank', state.run) : [];

    GH.endScreen.render(host, {
      coins: paid,
      won: won,
      tone: wrong === 0 ? 'perfect' : 'done',
      title: wrong === 0 ? t('cwPerfect') : t('doneTitle'),
      stats: [
        { n:right, label:t('fbRight'), kind:'good' },
        { n:wrong, label:t('fbWrong'), kind:'bad' }
      ],
      note: t('doneLede', { n:total }),
      reviews: [{
        head: t('fbMissedHead'),
        tone: 'missed',
        items: state.missed.map(function(m){
          return {
            n: m.sentence.img,
            de: m.answer,
            gloss: m.sentence.de,
            flag: lang !== 'de' ? (m.sentence[lang] || '') : ''
          };
        }),
        onTap: function(item){ GH.speech.say(item.gloss); }
      }],
      actions: [
        { label:t('again'), kind:'primary', onClick:function(){
            state.rounds = buildRounds(state.sentences, state.ordered);
            state.missed = [];
            goTo(0);
          } },
        { label:t('toHub'), onClick:function(){ state.onExit(); } }
      ]
    });
  }

  /* ---------- answering ---------- */

  function solve(){
    state.solved = true;
    paint();
    speakSentence();
  }

  function showFeedback(){
    var fb = host.querySelector('.feedback');
    if (fb){
      fb.textContent = state.feedback;
      fb.className = 'feedback ' + state.feedbackKind;
    }
  }

  function reportRound(r, ok){
    if (!GH.tutor) return;
    var cat = (r.sentence && r.sentence.cat) || state.cat;
    if (cat) GH.tutor.grade('topic:' + cat, ok);
    if (r.sentence && r.sentence.img) GH.tutor.grade('word:' + r.sentence.img, ok);
    GH.tutor.grade('skill:cloze', ok);
  }

  /* The shared run holds the once-per-item guard, the streak and the
     percentage. The round index is the item id. */
  function tally(ok){ state.run.saw('r' + state.i, ok); }

  function pickOption(word, btn){
    var r = round();
    if (word === r.answer){
      tally(!state.missedHere);
      reportRound(r, !state.missedHere);
      state.feedback = t('right');
      state.feedbackKind = 'right';
      btn.classList.add('is-right');
      solve();
      return;
    }
    state.ruledOut[GH.text.normalize(word)] = true;
    /* only the first wrong answer on a round counts against her — the
       retries after it are her working it out, not fresh mistakes */
    if (!state.missedHere){
      state.missedHere = true;
      tally(false);
      state.missed.push({ answer:r.answer, sentence:r.sentence });
      reportRound(r, false);
    }
    state.feedback = t('wrong');
    state.feedbackKind = 'wrong';
    btn.classList.add('is-wrong');
    btn.disabled = true;
    showFeedback();
  }

  function checkTyped(value){
    var r = round();
    var verdict = GH.text.compare(value, r.answer);
    if (verdict === 'exact' || verdict === 'close'){
      /* a near-miss on spelling still counts as knowing the word */
      tally(!state.missedHere);
      reportRound(r, !state.missedHere);
      state.feedback = verdict === 'exact' ? t('right') : t('closeSpelling', { word:r.answer });
      state.feedbackKind = verdict === 'exact' ? 'right' : 'close';
      solve();
    } else {
      if (!state.missedHere){
        state.missedHere = true;
        tally(false);
        state.missed.push({ answer:r.answer, sentence:r.sentence });
        reportRound(r, false);
      }
      state.feedback = t('wrong');
      state.feedbackKind = 'wrong';
      showFeedback();
    }
  }

  function reveal(){
    var r = round();
    state.feedback = t('answerWas', { word:r.answer });
    state.feedbackKind = 'close';
    solve();
  }

  /* ---------- entry ---------- */

  function goTo(i){
    state.i = i;
    state.solved = false;
    state.feedback = '';
    state.feedbackKind = '';
    state.typed = '';
    /* RE-ARM THE PEEK. Without this, `shown` stays true after the first
       reveal and every later round in peek mode goes straight to the type
       box — silently turning that rung into plain Type. */
    state.shown = false;
    state.ruledOut = {};
    state.missedHere = false;   /* fresh round, fresh slate for scoring */
    paint();
    if (state.i < state.rounds.length && autoOn()) speakSentence();
  }

  function mount(container, config){
    host = container;
    state = {
      title:config.title,
      subtitle:config.subtitle || '',
      cat:config.cat || null,
      sentences:config.sentences,
      ordered:!!config.ordered,
      rounds:buildRounds(config.sentences, !!config.ordered),
      i:0,
      setStart:0,
      run:GH.run.create(),
      missed:[],
      mode:savedMode(),   /* her rung, remembered — see modeKey() above */
      shown:false,
      solved:false,
      feedback:'',
      feedbackKind:'',
      typed:'',
      ruledOut:{},
      onExit:config.onExit
    };
    GH.app.redraw = paint;
    goTo(0);
  }

  return { mount:mount };
})();
