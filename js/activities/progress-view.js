/* Прогресс — what she knows, what has slipped, and what is due.

   The old version of this screen showed percentages, which answer the
   wrong question. A percentage tells her how she has done; what a learner
   actually wants to know is what to do next, and whether the work is
   sticking. Those are different, and the scheduler knows both.

   So the screen leads with the schedule. How many items are waiting today.
   How many have reached the point of being genuinely learned — a long
   interval means the word survived nearly being forgotten and came back
   anyway, which is the only real evidence of memory. How many are still
   being fought over.

   Then the areas, then the individual items, and only then percentages,
   because a number without a next action is trivia.

   Two numbers per row rather than one, kept from the old screen because
   the reasoning was right: lifetime says whether she ever learned it,
   recent says whether she knows it today, and the gap between them is
   slippage. A topic at 90% lifetime and 40% recent has not been failed —
   it has been forgotten, and that needs revisiting rather than teaching. */

window.GH = window.GH || {};

GH.progressView = (function(){

  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function pct(x){ return Math.round(x * 100) + '%'; }

  /* Turn a stored key into something a person can read. */
  function label(key){
    var bits = key.split(':');
    var area = bits[0], thing = bits.slice(1).join(':');

    if (area === 'word' || area === 'gender'){
      var v = (window.GH_VOCAB || []).filter(function(x){ return String(x.n) === thing; })[0];
      return v ? v.de : thing;
    }
    if (area === 'topic'){
      var c = ((window.GH_BANK || {}).categories || [])
        .filter(function(x){ return x.id === thing; })[0];
      return c ? (c.glyph + ' ' + GH.i18n.pick(c)) : thing;
    }
    if (area === 'person'){
      var p = (GH.conjugate.people || []).filter(function(x){ return x.id === thing; })[0];
      return p ? p.de : thing;
    }
    if (area === 'sent') return thing + '…';

    /* the newer areas hold rule names rather than words, and a bare
       'twoway' or 'e-i' on the screen means nothing */
    var NAMED = {
      'plural:n':'-n / -en', 'plural:e':'-e', 'plural:same':'no change',
      'plural:er':'-er', 'plural:s':'-s',
      'plural:umlaut':t('pvUmlaut'), 'plural:none':t('mzNoPlural'),
      'case:twoway':t('grCaseNine'), 'case:motion':t('wwTitle'),
      'case:fixed-dat':t('cv_past') === '' ? 'dative' : t('grPastPrat'),
      'order:final':t('grOrderEnd'), 'order:bare':t('scBare'),
      'order:marked':t('scSee'), 'order:varied':t('scHear'),
      'order:mean':t('scMean'), 'order:front':t('scFront'), 'order:sub':t('scSub'),
      'tense-bin:past':t('cv_past'), 'tense-bin:present':t('cv_present'),
      'tense-bin:future':t('cv_future'),
      'tense:plain-future':t('cvTricky')
    };
    if (NAMED[key]) return NAMED[key];
    if (area === 'verbkind'){
      return thing === 'irregular' ? t('cgKind_irregular')
           : thing === 'separable' ? t('grFutureWerden')
           : thing === 'regular' ? t('grRegular') : thing;
    }
    if (area === 'case') return thing;
    return thing;
  }

  var AREA_KEY = {
    word:'pvWords', topic:'pvTopics', conj:'pvVerbs', person:'pvPersons',
    gender:'pvGender', 'case':'pvCase', skill:'pvSkills', sent:'pvSentences',
    plural:'pvPlural', order:'pvOrder', tense:'pvTense',
    verbkind:'pvVerbKind', 'tense-bin':'pvTenseBin'
  };

  function areaName(a){
    return AREA_KEY[a] ? t(AREA_KEY[a]) : a;
  }

  /* ---------- the headline ---------- */

  /* Four numbers that between them say where she stands. Deliberately not
     a single score: 'due' is a call to action, 'learned' is the reward,
     and the other two are the work in between. */
  function headline(){
    var s = GH.tutor.stats();
    var wrap = el('div', 'pv-head');

    var tiles = [
      { n:s.due,     key:'pvDue',      kind: s.due ? 'act' : 'calm', act:'due' },
      { n:s.mature,  key:'pvLearned',  kind:'good', act:'settled' },
      { n:s.young,   key:'pvLearning', kind:'calm' },
      { n:s.leeches, key:'pvStuck',    kind: s.leeches ? 'bad' : 'calm' }
    ];
    tiles.forEach(function(x){
      /* The due tile is the only one that is a call to action, so it is
         the only one that is a button. A number that cannot be tapped is
         a fact; the whole point of 'twelve are due' is doing the twelve. */
      var live = !!x.act && x.n > 0;
      var open_ = live && state.panel === x.act;
      var b = el(live ? 'button' : 'div',
                 'pv-tile pv-' + x.kind + (live ? ' is-live' : '') +
                 (open_ ? ' is-on' : ''));
      if (live){
        b.type = 'button';
        b.addEventListener('click', function(){
          state.panel = state.panel === x.act ? null : x.act;
          paint();
        });
      }
      b.appendChild(el('span', 'pv-tile-n', x.n));
      b.appendChild(el('span', 'pv-tile-l', t(x.key)));
      if (live) b.appendChild(el('span', 'pv-tile-go', open_ ? '\u25b4' : '\u25be'));
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* What has settled, and the honest caveats.

     'Settled' is a threshold, not a trophy, and the screen has to say so:
     what the word means, how it was earned, and that it can be lost. A
     count with no definition behind it is the same dead end the due
     number was. */
  function settledBlock(){
    var rows = GH.tutor.matureList(null);
    var wrap = el('div', 'pv-due pv-settled');

    if (!rows.length){
      wrap.appendChild(el('p', 'gr-note', t('pvNoneSettled')));
      return wrap;
    }

    wrap.appendChild(el('p', 'pv-due-head', t('pvSettledHead', { n:rows.length })));
    wrap.appendChild(el('p', 'pv-settled-what',
      t('pvSettledWhat', { n:GH.tutor.matureDays })));
    wrap.appendChild(el('p', 'pv-settled-what', t('pvSettledLoss')));

    var byArea = {}, order = [];
    rows.forEach(function(r){
      if (!byArea[r.area]){ byArea[r.area] = []; order.push(r.area); }
      byArea[r.area].push(r);
    });
    order.sort(function(a, b){ return byArea[b].length - byArea[a].length; });

    order.forEach(function(a){
      var items = byArea[a];
      var group = el('div', 'pv-due-group');

      var top = el('div', 'pv-due-top');
      top.appendChild(el('span', 'pv-due-area', areaName(a)));
      top.appendChild(el('span', 'pv-due-n', items.length));
      group.appendChild(top);

      var chips = el('div', 'pv-due-chips');
      items.slice(0, 60).forEach(function(r){
        /* the interval is the strength; the countdown is the honesty */
        var c = el('span', 'pv-due-chip is-settled');
        c.appendChild(el('span', 'pv-due-chip-t', label(r.key)));
        c.appendChild(el('span', 'pv-due-chip-d',
          r.days <= 0 ? t('pvDueNow')
            : r.days === 1 ? t('pvTomorrow')
            : t('pvInDays', { n:r.days })));
        chips.appendChild(c);
      });
      if (items.length > 60){
        chips.appendChild(el('span', 'pv-due-chip',
          t('pvAndMore', { n:items.length - 60 })));
      }
      group.appendChild(chips);
      wrap.appendChild(group);
    });

    return wrap;
  }

  /* Open a game and come back here afterwards, rather than to the hub —
     she tapped through from this screen and expects to land on it again. */
  function playArea(game){
    var act = GH.app && GH.app.find ? GH.app.find(game) : null;
    if (!act) return;
    GH.speech.stop();
    host.textContent = '';
    act.open(host, function(){ host.textContent = ''; open(host, state.onExit); });
  }

  /* The list behind the number.

     Grouped by area, because that is the unit a game can drill — twelve
     loose items scattered across five games is not a session, and there
     is no activity in the app that takes a mixed queue. Each group says
     how many and offers the game that covers them. */
  function dueBlock(){
    var rows = GH.tutor.dueList(null);
    var wrap = el('div', 'pv-due');

    if (!rows.length){
      wrap.appendChild(el('p', 'gr-note', t('pvNoneDue')));
      return wrap;
    }

    wrap.appendChild(el('p', 'pv-due-head', t('pvDueHead', { n:rows.length })));

    var byArea = {}, order = [];
    rows.forEach(function(r){
      if (!byArea[r.area]){ byArea[r.area] = []; order.push(r.area); }
      byArea[r.area].push(r);
    });
    order.sort(function(a, b){ return byArea[b].length - byArea[a].length; });

    order.forEach(function(a){
      var items = byArea[a];
      var group = el('div', 'pv-due-group');

      var top = el('div', 'pv-due-top');
      top.appendChild(el('span', 'pv-due-area', areaName(a)));
      top.appendChild(el('span', 'pv-due-n', items.length));
      group.appendChild(top);

      /* the actual items, so the number is answerable */
      var chips = el('div', 'pv-due-chips');
      items.slice(0, 30).forEach(function(r){
        var c = el('span', 'pv-due-chip' + (r.over >= 7 ? ' is-late' : ''));
        c.appendChild(el('span', 'pv-due-chip-t', label(r.key)));
        if (r.over >= 1){
          c.appendChild(el('span', 'pv-due-chip-d',
            t('pvOverdueN', { n:Math.floor(r.over) })));
        }
        chips.appendChild(c);
      });
      if (items.length > 30){
        chips.appendChild(el('span', 'pv-due-chip',
          t('pvAndMore', { n:items.length - 30 })));
      }
      group.appendChild(chips);

      /* and the way to actually do them */
      var game = GH.tutor.gameFor(a);
      var act = game && GH.app && GH.app.find ? GH.app.find(game) : null;
      if (act){
        var go = el('button', 'btn btn-primary pv-due-go');
        go.type = 'button';
        go.textContent = t('pvDoThese', { game:GH.i18n.pick(act.name) });
        go.addEventListener('click', function(){ playArea(game); });
        group.appendChild(go);
      } else {
        group.appendChild(el('p', 'gr-note pv-due-nogame', t('pvNoGameFor')));
      }

      wrap.appendChild(group);
    });

    return wrap;
  }

  /* What the numbers mean, said once, in a sentence rather than a legend. */
  function readingOf(){
    var s = GH.tutor.stats();
    if (!s.tracked) return t('pvNothingYet');
    if (s.due > 20) return t('pvLotsDue', { n:s.due });
    if (s.due) return t('pvSomeDue', { n:s.due });
    return t('pvNoneDue');
  }

  /* ---------- rows ---------- */

  function bar(value, kind){
    var track = el('div', 'pv-bar');
    var fill = el('div', 'pv-fill pv-fill-' + kind);
    fill.style.width = Math.max(2, Math.round(value * 100)) + '%';
    track.appendChild(fill);
    return track;
  }

  function row(r){
    var wrap = el('button', 'pv-row');
    wrap.type = 'button';

    var head = el('div', 'pv-row-head');
    head.appendChild(el('span', 'pv-name', label(r.key)));

    /* The schedule, where there is one. A card that has just lapsed has
       reps back at zero but is due immediately — checking reps alone hid
       the chip on exactly the items that most needed it. */
    var c = GH.tutor.card(r.key);
    if (c && (c.reps || c.lapses)){
      var days = Math.round((c.due - Date.now()) / 86400000);
      var chip = el('span', 'pv-when' + (days <= 0 ? ' is-due' : ''));
      chip.textContent = days <= 0 ? t('pvDueNow')
        : days === 1 ? t('pvTomorrow')
        : t('pvInDays', { n:days });
      head.appendChild(chip);
    }
    wrap.appendChild(head);

    var bars = el('div', 'pv-bars');
    bars.appendChild(bar(r.lifetime, 'life'));
    bars.appendChild(bar(r.recent, 'now'));
    wrap.appendChild(bars);

    var foot = el('div', 'pv-foot');
    foot.appendChild(el('span', null, t('pvSeenN', { n:r.seen })));
    foot.appendChild(el('span', null, pct(r.recent)));
    /* the gap is the interesting part, so it gets said rather than implied */
    if (r.seen >= 4 && r.lifetime - r.recent > 0.2){
      foot.appendChild(el('span', 'pv-slip', t('pvSlipped')));
    } else if (r.seen >= 4 && r.recent - r.lifetime > 0.2){
      foot.appendChild(el('span', 'pv-up', t('pvImproving')));
    }
    wrap.appendChild(foot);

    /* Tapping a row goes and practises it.

       It used to unfold '0 reviews, 2 lapses, ease 2.15' — the scheduler's
       internals, which tell a learner nothing and cannot be acted on. The
       row says a thing is due; the only useful response to that is to do
       it. The interval and ease are still there for anyone who wants
       them, behind the small button on the right, rather than being what
       the whole row is for. */
    var game = GH.tutor.gameFor(r.key.split(':')[0]);
    var act = game && GH.app && GH.app.find ? GH.app.find(game) : null;

    if (act){
      wrap.className += ' is-live';
      var go = el('span', 'pv-row-go', t('pvPractise', { game:GH.i18n.pick(act.name) }));
      head.appendChild(go);
      wrap.addEventListener('click', function(e){
        if (e.target && e.target.closest && e.target.closest('.pv-why')) return;
        playArea(game);
      });
    } else {
      wrap.disabled = true;
    }

    /* the scheduler's own numbers, for when they are wanted */
    if (c){
      var why = el('span', 'pv-why');
      why.textContent = state.open === r.key ? '\u00d7' : '?';
      why.addEventListener('click', function(e){
        e.stopPropagation();
        state.open = state.open === r.key ? null : r.key;
        paint();
      });
      foot.appendChild(why);
    }

    if (state.open === r.key && c){
      var d = el('div', 'pv-detail');
      d.appendChild(el('p', null, t('pvDetail', {
        reps: c.reps, lapses: c.lapses,
        ivl: c.ivl, ease: c.ease.toFixed(2)
      })));
      wrap.appendChild(d);
    }
    return wrap;
  }

  /* ---------- the screen ---------- */

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('pvTitle')));
    var who = GH.player.shared() ? (GH.player.current().name || t('stPlayerN', { n:1 })) : '';
    titles.appendChild(el('p', null, who || t('pvSub')));
    head.appendChild(titles);
    host.appendChild(head);

    var card = el('div', 'card');

    card.appendChild(headline());
    card.appendChild(el('p', 'pv-reading', readingOf()));

    /* the list behind whichever number she tapped */
    if (state.panel === 'due') card.appendChild(dueBlock());
    else if (state.panel === 'settled') card.appendChild(settledBlock());

    if (!GH.tutor.enabled()){
      card.appendChild(el('p', 'pv-off', t('pvTutorOff')));
    }

    /* where the work is going */
    var areas = GH.progress.areas().filter(function(a){ return AREA_KEY[a]; });
    if (!areas.length){
      card.appendChild(el('p', 'gr-note', t('pvPlaySomething')));
      host.appendChild(card);
      return;
    }

    card.appendChild(el('h2', 'gr-group', t('pvByArea')));
    var grid = el('div', 'pv-areas');
    areas.forEach(function(a){
      var s = GH.progress.summary(a);
      var b = el('button', 'pv-area' + (state.area === a ? ' is-open' : ''));
      b.type = 'button';
      b.appendChild(el('span', 'pv-area-n', areaName(a)));
      b.appendChild(el('span', 'pv-area-c', t('pvItemsN', { n:s.items })));
      b.appendChild(bar(s.recent, 'now'));
      b.appendChild(el('span', 'pv-area-p', pct(s.recent)));
      b.addEventListener('click', function(){
        state.area = state.area === a ? null : a;
        state.open = null;
        paint();
      });
      grid.appendChild(b);
    });
    card.appendChild(grid);

    /* the shaky ones, which is what she came for */
    var weak = GH.progress.weakest(state.area || null, 12);
    if (weak.length){
      card.appendChild(el('h2', 'gr-group',
        state.area ? t('pvWeakIn', { a:areaName(state.area) }) : t('pvWeak')));
      card.appendChild(el('p', 'gr-note', t('pvWeakNote')));
      weak.forEach(function(r){ card.appendChild(row(r)); });
    } else if (state.area){
      card.appendChild(el('p', 'gr-note', t('pvAreaClean')));
    }

    /* and the ones that have stuck, because a screen that only ever shows
       failure is one she stops opening */
    var solid = (state.area ? GH.progress.area(state.area) : null);
    if (solid){
      var good = solid.filter(function(r){ return r.seen >= 3 && r.recent >= 0.9; });
      if (good.length){
        card.appendChild(el('h2', 'gr-group', t('pvSolid', { n:good.length })));
        var chips = el('div', 'pv-chips');
        good.slice(0, 40).forEach(function(r){
          chips.appendChild(el('span', 'pv-chip', label(r.key)));
        });
        card.appendChild(chips);
      }
    }

    host.appendChild(card);
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, area:null, open:null, panel:null };
    paint();
  }

  return { open:open };
})();

/* Not registered as an activity.

   It used to add itself to the games row, which is where activities go —
   but this is a reference screen. It reports on the games rather than
   being one, and sitting among them made the row read as twelve games,
   one of which is a report. app.js places it in the reference row
   alongside the word list and the grammar pages. */
