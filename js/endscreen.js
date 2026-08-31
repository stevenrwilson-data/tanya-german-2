/* The end of a round, built the same way everywhere.

   Seven games had written seven of these and they had drifted badly: two
   showed only a score and no review at all, and the one that mattered most
   — the fill-the-blank sections, which are the bulk of the app — told her
   nothing about what she had got wrong. Catch the word had the best of
   them, so its shape is the one this follows.

   The order is deliberate. Verdict, then the numbers, then the words she
   missed, then what to do next. Mistakes come before the buttons because a
   review below the actions is a review nobody reads.

   Every game passes the same description and gets the same screen:

     GH.endScreen.render(host, {
       tone:    'perfect' | 'lost' | 'done',
       glyph:   an emoji, or omitted for the default
       title:   already-translated heading
       badge:   optional chip under it, e.g. the topic
       stats:   [{ n, label, kind:'good'|'bad' }]
       note:    optional line under the stats
       reviews: [{ head, tone:'missed'|'wrong', items:[…], onTap }]
       actions: [{ label, kind:'primary'|'ghost', onClick }]
     }) */

window.GH = window.GH || {};

GH.endScreen = (function(){


  /* Every string used to be handed in by the caller, so this file never
     needed i18n. The Kronen and achievement panels changed that — they
     build their own labels — and referring to a t() that did not exist
     threw on every end screen that paid out. */
  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  var DEFAULT_GLYPH = { perfect:'🏆', lost:'💔', done:'✅' };

  function statTile(s){
    var box = el('div', 'es-stat es-stat-' + (s.kind || 'good'));
    /* String(), because a zero is a real answer and el() treats it as
       nothing — a perfect round showed a blank where 0 missed belonged. */
    box.appendChild(el('span', 'es-stat-n', String(s.n)));
    box.appendChild(el('span', 'es-stat-l', s.label));
    return box;
  }

  /* One reviewed item. `n` gives it a picture; without one it falls back to
     a text row, which is what the conjugation and gender games need. */
  function itemCard(item, onTap){
    var card = el('button', 'es-item');
    card.type = 'button';

    if (item.n && GH.sprite){
      card.appendChild(GH.sprite.tile(item.n, item.de));
      card.className += ' has-pic';
    }

    var body = el('span', 'es-item-body');
    if (item.strike) body.appendChild(el('span', 'es-item-strike', item.strike));
    body.appendChild(el('span', 'es-item-de', item.de));
    if (item.gloss) body.appendChild(el('span', 'es-item-gloss', item.gloss));
    if (item.flag) body.appendChild(el('span', 'es-item-flag', item.flag));
    card.appendChild(body);

    if (onTap) card.addEventListener('click', function(){ onTap(item); });
    else card.disabled = true;
    return card;
  }

  function reviewBlock(rev){
    if (!rev || !rev.items || !rev.items.length) return null;
    var wrap = el('div', 'es-review es-review-' + (rev.tone || 'missed'));
    wrap.appendChild(el('p', 'es-review-head', rev.head));
    var withPics = rev.items.some(function(i){ return !!i.n; });
    var grid = el('div', withPics ? 'es-grid' : 'es-list');
    rev.items.forEach(function(item){ grid.appendChild(itemCard(item, rev.onTap)); });
    wrap.appendChild(grid);
    if (rev.hearAll){
      var hear = el('button', 'btn btn-ghost es-hear', '🔊 ' + rev.hearAll.label);
      hear.type = 'button';
      hear.addEventListener('click', rev.hearAll.onClick);
      wrap.appendChild(hear);
    }
    return wrap;
  }

  function render(host, spec){
    /* Reaching this screen IS finishing a round, and every game routes
       through here — fifteen callers, one definition. Recorded here rather
       than in each game, so a game added next month counts without being
       told to.

       The activity's own name comes from whatever app.js told the log on
       the way in, so this needs no argument and cannot be given the wrong
       one. */
    if (GH.events && GH.events.finished) GH.events.finished(GH.events.game());
    /* She has just been paid, and the header holds the balance. Nothing
       broadcasts a change to the purse, so the two places that move it —
       here and the store — say so themselves. */
    if (GH.purse) GH.purse.refresh();

    var tone = spec.tone || 'done';
    var box = el('div', 'done es-done is-' + tone);

    box.appendChild(el('div', 'es-glyph', spec.glyph || DEFAULT_GLYPH[tone]));
    box.appendChild(el('h2', null, spec.title));

    if (spec.badge){
      var chip = el('p', 'es-badge');
      chip.appendChild(el('span', null, spec.badge));
      box.appendChild(chip);
    }

    if (spec.stats && spec.stats.length){
      var stats = el('div', 'es-stats');
      spec.stats.forEach(function(s){ stats.appendChild(statTile(s)); });
      box.appendChild(stats);
    }

    if (spec.note) box.appendChild(el('p', 'es-note', spec.note));

    (spec.reviews || []).forEach(function(rev){
      var b = reviewBlock(rev);
      if (b) box.appendChild(b);
    });

    /* Anything a game needs that this does not cover — the conjugation
       tables, for instance — goes here, still above the buttons. */
    if (spec.extra) box.appendChild(spec.extra);

    /* The pets she has chosen, turning up to say well done. Purely
       decorative, which is the point — nothing bought affects the German.

       One of them is active: shown at full size, and the one whose line is
       on screen. The others are shrunk. Tapping a shrunk pet makes it
       active and shows its line; tapping the active one enlarges the
       drawing. So the tap always means "look at this one", and what that
       means depends on whether you are already looking at it.

       Three pets talking at once would be noise, and the lines were
       written as a single voice reacting to the round — Noir's menace does
       not survive being one of a chorus. So there is still exactly one
       speaker; she just chooses which. */
    if (GH.store && GH.store.cheerers){
      /* a bad round gets the sympathetic face, where one has been drawn */
      var mood = (spec.tone === 'lost' || spec.tone === 'poor') ? 'kind' : 'cheer';
      var crew = GH.store.cheerers(mood);
      if (crew.length){
        var active = 0;

        /* Each pet's line, drawn once and kept.

           lineFor() picks at random from that pet's band, so rotating away
           and back would hand her a different Noir line every time and the
           row would behave like a slot machine. Drawn on first sight and
           cached, so rotating is rotating. */
        var lines = {};
        function lineOf(p){
          if (!(p.id in lines)){
            lines[p.id] = (GH.petVoice ? GH.petVoice.lineFor(p.id, spec) : null) || null;
          }
          return lines[p.id];
        }

        var row = el('div', 'pt-cheer pt-cheer-' + Math.min(3, crew.length));
        var bubbleSlot = el('div', 'pt-say-slot');

        function paintRow(){
          row.textContent = '';
          crew.forEach(function(p, i){
            var isOn = i === active;

            /* A button whenever there is something a tap can do, which is
               always when there is more than one pet. Keyboard-reachable
               and it announces itself, rather than a click handler on the
               image. A pet not yet drawn falls back to a glyph, and a
               glyph must not open a lightbox onto a 404 — so only the
               rotate half of the gesture is offered there. */
            var canLens = !!(p.pic && p.url);
            var one;
            if (canLens || crew.length > 1){
              one = el('button', 'pt-cheer-one' + (canLens ? ' pt-lens' : '') +
                                 (isOn ? ' is-on' : ' is-off'));
              one.type = 'button';
              one.setAttribute('aria-pressed', isOn ? 'true' : 'false');
              one.setAttribute('aria-label', (p.full || p.name || p.de) +
                ' \u2014 ' + (isOn ? t('refTapHint2') : t('ptSwitchTo')));
              one.addEventListener('click', function(){
                if (!isOn){ active = i; paintRow(); paintBubble(true); return; }
                if (canLens && GH.lightbox) GH.lightbox.openPic(p.url, p.caption);
              });
            } else {
              one = el('span', 'pt-cheer-one' + (isOn ? ' is-on' : ' is-off'));
            }

            if (p.pic) one.appendChild(p.pic);
            else one.appendChild(el('span', 'pt-cheer-blank', '\u25c9'));
            one.appendChild(el('span', 'pt-cheer-name', p.name || p.de));
            one.appendChild(el('span', 'pt-cheer-word', p.de));
            row.appendChild(one);
          });
        }

        /* `speak` is false on first paint and true on a rotate: the first
           line speaks itself because the round has just ended and she is
           looking at the screen anyway, and a rotate speaks because she
           asked for that pet. */
        function paintBubble(speak){
          bubbleSlot.textContent = '';
          var p = crew[active];
          var said = lineOf(p);
          if (!said) return;

          var bubble = el('div', 'pt-say');
          bubble.appendChild(el('span', 'pt-say-who', p.name || p.de));

          var de = el('button', 'pt-say-de');
          de.type = 'button';
          de.textContent = said.de;
          de.setAttribute('aria-label', said.de);
          de.addEventListener('click', function(){ GH.speech.say(said.say); });
          bubble.appendChild(de);

          var acts = el('div', 'pt-say-acts');

          var hear = el('button', 'pt-say-btn');
          hear.type = 'button';
          hear.textContent = '\ud83d\udd0a ' + t('ptHear');
          hear.addEventListener('click', function(){ GH.speech.say(said.say); });
          acts.appendChild(hear);

          /* Nothing to translate when she is reading the app in German,
             so no button rather than an empty one. */
          if (said.tr){
            var show = el('button', 'pt-say-btn');
            show.type = 'button';
            show.textContent = t('ptTranslate');
            show.addEventListener('click', function(){
              if (bubble.querySelector('.pt-say-tr')) return;
              show.disabled = true;
              bubble.appendChild(el('p', 'pt-say-tr', said.tr));
            });
            acts.appendChild(show);
          }

          bubble.appendChild(acts);
          bubbleSlot.appendChild(bubble);

          /* iOS will not speak until a tap has unlocked audio, and by the
             end of a round there have been plenty — but if it is refused
             the buttons are still there. */
          if (speak !== false) GH.speech.say(said.say);
        }

        paintRow();
        box.appendChild(row);
        box.appendChild(bubbleSlot);
        paintBubble(true);
      }
    }

    /* what the round was worth, and where it came from. A number that
       appears without explanation is a notification, not a reward. */
    if (spec.coins && spec.coins.total){
      var purse = el('div', 'co-earn');
      var head = el('div', 'co-earn-head');
      head.appendChild(el('span', 'co-earn-n', '+' + spec.coins.total));
      head.appendChild(el('span', 'co-earn-l', t('coEarned')));
      purse.appendChild(head);
      /* how close the day's bonus is — the number that decides whether
         she does another one now or leaves it */
      if (spec.coins.need && !spec.coins.bonusToday){
        head.appendChild(el('span', 'co-earn-goal',
          t('coProgress', { at:spec.coins.done, n:spec.coins.need })));
      }
      var why = el('div', 'co-earn-why');
      spec.coins.lines.forEach(function(l){
        var row = el('span', 'co-earn-row');
        row.appendChild(el('span', null, t(l.key)));
        row.appendChild(el('span', 'co-earn-plus', '+' + l.n));
        why.appendChild(row);
      });
      purse.appendChild(why);
      /* The store button used to live here, which put it above the
         achievement rows and therefore above coins she had not been shown
         yet. It is on the total row now, at the bottom, once everything
         has been counted. */
      box.appendChild(purse);
    }

    /* anything newly earned, said plainly. An achievement nobody is told
       about is a database row.

       `spec.awards` OR `spec.won`. Five activities pass `won:` — catch-word,
       conveyor, fill-blank, gender and wrong-form — and nine pass
       `awards:`, so in those five an achievement was earned, paid by
       awards.js, and never shown. Accepted here rather than corrected in
       five files, because the sixth activity to be written will guess too. */
    var earned = spec.awards || spec.won || [];
    if (earned.length){
      earned.forEach(function(a){
        var row = el('div', 'aw-won');
        row.appendChild(el('span', 'aw-won-glyph', '\u2605'));
        var body = el('span', 'aw-won-body');
        body.appendChild(el('span', 'aw-won-name', t(a.key)));
        body.appendChild(el('span', 'aw-won-sub', t('awUnlocked')));
        row.appendChild(body);
        row.appendChild(el('span', 'aw-won-pay', '+' + a.pay));
        box.appendChild(row);
      });
    }

    /* THE TOTAL, and it is not the same number as the purse panel above.

       `spec.coins.total` is what coins.award() paid. Achievements are paid
       separately — awards.js calls GH.coins.earn(a.pay) — and rendered in
       their own rows, so a round that unlocked two of them showed
       `+35 EARNED` and credited 130. The balance was right and the
       headline was wrong, which is the worse way round.

       So this adds them up: what the exercise paid, plus every achievement
       row on this screen. One number, at the bottom, after everything that
       contributes to it has been shown. */
    var paid = (spec.coins && spec.coins.total) || 0;
    earned.forEach(function(a){ paid += (a.pay || 0); });

    if (paid){
      var sum = el('div', 'co-total');
      var sumLine = el('div', 'co-total-line');
      sumLine.appendChild(el('span', 'co-total-l', t('coTotal')));
      sumLine.appendChild(el('span', 'co-total-n', GH.coins.label(paid)));
      sum.appendChild(sumLine);

      /* Somewhere for them to go, at the moment she has them, with the
         balance on the button so the decision needs no second screen. */
      if (GH.store){
        var toShop = el('button', 'btn co-total-shop',
          t('coToStore', { n:GH.coins.label() }));
        toShop.type = 'button';
        toShop.addEventListener('click', function(){
          var view = document.getElementById('view');
          if (!view) return;
          GH.speech.stop();
          view.textContent = '';
          GH.store.open(view, function(){ GH.app.hub(); });
        });
        sum.appendChild(toShop);
      }
      box.appendChild(sum);
    }

    var acts = el('div', 'done-actions');
    (spec.actions || []).forEach(function(a){
      /* The primary action — always 'again' — becomes the screen's one
         thing to do, so a tap anywhere, space or Enter starts another
         round. Back and Escape still leave, and the other buttons keep
         their own taps. Same rule as every other screen. */
      var primary = (a.kind === 'primary');
      var b = el('button', 'btn btn-' + (a.kind || 'ghost') +
                 (primary ? ' js-advance' : ''), a.label);
      b.type = 'button';
      b.addEventListener('click', a.onClick);
      acts.appendChild(b);
    });
    box.appendChild(acts);

    host.appendChild(box);
    if (GH.nav && GH.nav.ready) GH.nav.ready();
    return box;
  }

  return { render:render };
})();
