/* Settings: who is playing, and whether the app schedules.

   Kept deliberately small. The only two things here are the two that
   change what the app does to her: which profile the progress belongs to,
   and whether the tutor picks what she sees or leaves it to chance.

   The profile list stays hidden until there is more than one person, so a
   single user never has to think about accounts. Adding someone is one
   button, and the first profile does not need a name until a second one
   exists to be confused with. */

window.GH = window.GH || {};

GH.settings = (function(){

  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function nameOf(p, i){
    return p.name || t('stPlayerN', { n:i + 1 });
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('stTitle')));
    titles.appendChild(el('p', null, t('stSub')));
    head.appendChild(titles);
    host.appendChild(head);

    var card = el('div', 'card');

    /* ---------- who is playing ---------- */
    card.appendChild(el('h2', 'gr-group', t('stWhoHead')));
    card.appendChild(el('p', 'gr-note', t('stWhoNote')));

    var list = GH.player.all();
    var cur = GH.player.id();
    var box = el('div', 'st-players');
    list.forEach(function(p, i){
      var row = el('div', 'st-player' + (p.id === cur ? ' is-current' : ''));

      var pick = el('button', 'st-pick');
      pick.type = 'button';
      pick.appendChild(el('span', 'st-dot', p.id === cur ? '\u25cf' : '\u25cb'));
      pick.appendChild(el('span', 'st-name', nameOf(p, i)));
      pick.addEventListener('click', function(){
        GH.player.use(p.id);
        if (GH.coach) GH.coach.regreet();
        if (GH.app && GH.app.redraw) GH.app.redraw();
        paint();
      });
      row.appendChild(pick);

      var edit = el('button', 'st-edit', t('stRename'));
      edit.type = 'button';
      edit.addEventListener('click', function(){
        state.editing = p.id;
        paint();
      });
      row.appendChild(edit);

      if (list.length > 1){
        var del = el('button', 'st-del', '\u00d7');
        del.type = 'button';
        del.setAttribute('aria-label', t('stRemove'));
        del.addEventListener('click', function(){
          state.confirming = p.id;
          paint();
        });
        row.appendChild(del);
      }

      box.appendChild(row);

      if (state.editing === p.id){
        var field = el('div', 'st-rename');
        var input = document.createElement('input');
        input.type = 'text';
        input.className = 'st-input';
        input.value = p.name;
        input.placeholder = t('stNamePlaceholder');
        field.appendChild(input);
        var save = el('button', 'btn btn-primary', t('stSave'));
        save.type = 'button';
        save.addEventListener('click', function(){
          GH.player.rename(p.id, (input.value || '').trim());
          state.editing = null;
          paint();
        });
        field.appendChild(save);
        box.appendChild(field);
        setTimeout(function(){ input.focus(); }, 30);
      }

      /* Gender, asked once, and only for the person being played.

         It sits under the name because it is the same question — how the
         app should address her. Russian past-tense verbs and short
         adjectives change with it and German ones do not, so an interface
         that guesses is wrong to somebody every time it speaks.

         Three choices, the third being no answer. That is the default and
         it is a real answer, not a lesser one. */
      if (p.id === cur){
        var gwrap = el('div', 'st-gender');
        gwrap.appendChild(el('span', 'st-gender-l', t('stGenderHead')));
        var gnow = GH.player.gender(p.id);
        var gtoggle = el('div', 'mode-toggle st-toggle');
        [['f', 'stGenderF'], ['m', 'stGenderM'], ['', 'stGenderNone']].forEach(function(pair){
          var gb = el('button', null, t(pair[1]));
          gb.type = 'button';
          gb.setAttribute('aria-pressed', gnow === pair[0] ? 'true' : 'false');
          gb.addEventListener('click', function(){
            GH.player.setGender(p.id, pair[0]);
            paint();
          });
          gtoggle.appendChild(gb);
        });
        gwrap.appendChild(gtoggle);
        gwrap.appendChild(el('p', 'gr-note st-gender-note', t('stGenderNote')));
        box.appendChild(gwrap);
      }

      if (state.confirming === p.id){
        var warn = el('div', 'st-warn');
        warn.appendChild(el('p', null, t('stRemoveWarn', { name:nameOf(p, i) })));
        var yes = el('button', 'btn btn-primary', t('stRemoveYes'));
        yes.type = 'button';
        yes.addEventListener('click', function(){
          GH.player.remove(p.id);
          state.confirming = null;
          if (GH.app && GH.app.redraw) GH.app.redraw();
          paint();
        });
        var no = el('button', 'btn btn-ghost', t('stCancel'));
        no.type = 'button';
        no.addEventListener('click', function(){ state.confirming = null; paint(); });
        warn.appendChild(yes);
        warn.appendChild(no);
        box.appendChild(warn);
      }
    });
    card.appendChild(box);

    var add = el('button', 'btn btn-ghost st-add', '+ ' + t('stAddPlayer'));
    add.type = 'button';
    add.addEventListener('click', function(){
      var made = GH.player.add('');
      state.editing = made.id;
      if (GH.app && GH.app.redraw) GH.app.redraw();
      paint();
    });
    card.appendChild(add);

    /* ---------- the tutor ---------- */
    card.appendChild(el('h2', 'gr-group', t('stTutorHead')));
    card.appendChild(el('p', 'gr-note', t('stTutorNote')));

    var on = GH.tutor.enabled();
    var toggle = el('div', 'mode-toggle st-toggle');
    [[true, 'stTutorOn'], [false, 'stTutorOff']].forEach(function(pair){
      var b = el('button', null, t(pair[1]));
      b.type = 'button';
      b.setAttribute('aria-pressed', on === pair[0] ? 'true' : 'false');
      b.addEventListener('click', function(){ GH.tutor.setEnabled(pair[0]); paint(); });
      toggle.appendChild(b);
    });
    card.appendChild(toggle);

    if (on){
      var s = GH.tutor.stats();
      var row = el('div', 'es-stats st-stats');
      [[s.due, 'stDue', 'good'], [s.tracked, 'stTracked', 'good'],
       [s.mature, 'stMature', 'good'], [s.leeches, 'stLeeches', 'bad']]
        .forEach(function(p){
          var box = el('div', 'es-stat es-stat-' + p[2]);
          box.appendChild(el('span', 'es-stat-n', p[0]));
          box.appendChild(el('span', 'es-stat-l', t(p[1])));
          row.appendChild(box);
        });
      card.appendChild(row);
      if (s.tracked === 0) card.appendChild(el('p', 'gr-note', t('stNothingYet')));
    }

    /* ---------- what leaves this device ----------

       She should be able to see this without being told about it, and turn
       it off without asking anyone. Not a legal gesture: an app that
       reports on someone's practice silently is the kind of thing that ends
       a project when it is discovered, and this one is a gift between two
       people.

       Hidden entirely when there is no endpoint configured, because a
       switch that controls nothing is worse than no switch — it implies
       something is happening. */
    if (GH.send && GH.send.configured()){
      card.appendChild(el('h2', 'gr-group', t('stSendHead')));
      card.appendChild(el('p', 'gr-note', t('stSendNote')));

      var sending = GH.send.optedIn();
      var stog = el('div', 'mode-toggle st-toggle');
      [[true, 'stSendOn'], [false, 'stSendOff']].forEach(function(pair){
        var b = el('button', null, t(pair[1]));
        b.type = 'button';
        b.setAttribute('aria-pressed', sending === pair[0] ? 'true' : 'false');
        b.addEventListener('click', function(){
          GH.send.setOptedIn(pair[0]);
          paint();
        });
        stog.appendChild(b);
      });
      card.appendChild(stog);

      var st = GH.send.status();
      card.appendChild(el('p', 'gr-note',
        st.lastSent ? t('stSendLast', { day:st.lastSent }) : t('stSendNever')));
    }

    /* ---------- what she is learning ---------- */
    card.appendChild(el('h2', 'gr-group', t('pkHead')));
    card.appendChild(el('p', 'gr-note', t('pkNote')));

    var r = GH.packs.readiness();
    var sug = GH.packs.suggest();

    var bar = el('div', 'pk-bar');
    var fill = el('div', 'pk-fill');
    fill.style.width = Math.round(r.pct * 100) + '%';
    bar.appendChild(fill);
    card.appendChild(bar);
    card.appendChild(el('p', 'pk-read',
      t('pkSettled', { n:r.settled, total:r.live })));

    GH.packs.all().forEach(function(p){
      if (p.empty) return;
      var row = el('div', 'pk-row' + (p.on ? ' is-on' : ''));
      var b = el('button', 'pk-toggle');
      b.type = 'button';
      b.disabled = p.core;
      b.appendChild(el('span', 'pk-mark', p.on ? '\u2713' : ''));
      var body = el('span', 'pk-body');
      body.appendChild(el('span', 'pk-name', t(p.key)));
      body.appendChild(el('span', 'pk-sub',
        t('pkWordsN', { n:p.words }) + (p.core ? ' \u00b7 ' + t('pkAlways') : '')));
      b.appendChild(body);
      if (!p.core){
        b.addEventListener('click', function(){ GH.packs.setOn(p.id, !p.on); paint(); });
      }
      row.appendChild(b);

      /* the nudge, only where it belongs and only when it is earned */
      if (sug && sug.id === p.id){
        var tip = el('span', 'pk-tip', t('pkReady'));
        row.appendChild(tip);
      } else if (!p.on && !p.core && !r.ready){
        row.appendChild(el('span', 'pk-wait', t('pkNotYet')));
      }
      card.appendChild(row);
    });

    if (sug){
      card.appendChild(el('p', 'pk-suggest', t('pkSuggest', { name:t(sug.key), n:sug.words })));
    } else if (r.live && !r.ready){
      card.appendChild(el('p', 'gr-note', t('pkKeepGoing')));
    }

    /* ---------- which tenses ---------- */
    var tc = GH.packs.tenseCounts();
    if (tc.past || tc.future){
      card.appendChild(el('h2', 'gr-group', t('tnHead')));
      card.appendChild(el('p', 'gr-note', t('tnNote')));

      var on = GH.packs.tenses();
      [['present', tc.present, true],
       ['perfekt', tc.perfekt, false],
       ['prat',    tc.prat,    false],
       ['future',  tc.future,  false]].forEach(function(row){
        if (!row[1] && !row[2]) return;
        var live = row[2] || on[row[0]];
        var wrap = el('div', 'pk-row' + (live ? ' is-on' : ''));
        var b = el('button', 'pk-toggle');
        b.type = 'button';
        b.disabled = row[2];                       /* present cannot be off */
        b.appendChild(el('span', 'pk-mark', live ? '\u2713' : ''));
        var body = el('span', 'pk-body');
        body.appendChild(el('span', 'pk-name', t('tn_' + row[0])));
        body.appendChild(el('span', 'pk-sub',
          t('tnSentencesN', { n:row[1] }) + (row[2] ? ' \u00b7 ' + t('pkAlways') : '')));
        b.appendChild(body);
        if (!row[2]){
          b.addEventListener('click', function(){
            GH.packs.setTense(row[0], !on[row[0]]);
            paint();
          });
        }
        wrap.appendChild(b);
        card.appendChild(wrap);
      });
      card.appendChild(el('p', 'gr-note', t('tnLayer')));
    }


    /* ---------- testing ----------

       A way to hand yourself Kronen so the store can be walked through
       without a year of practice first. Deliberately at the bottom, under
       a heading that says what it is, so nobody arrives at it by accident
       and nobody mistakes it for a feature.

       Eighty thousand covers everything including Ember and both slots,
       which is the only amount that lets the whole shelf be checked. */
    card.appendChild(el('h2', 'gr-group', t('stTestHead')));
    card.appendChild(el('p', 'gr-note', t('stTestNote')));
    /* prompts in English, so a mechanic can be checked without German */
    var engRow = el('div', 'pk-row' + (GH.i18n.devEnglish() ? ' is-on' : ''));
    var eng = el('button', 'pk-toggle');
    eng.type = 'button';
    eng.appendChild(el('span', 'pk-mark', GH.i18n.devEnglish() ? '\u2713' : ''));
    var engBody = el('span', 'pk-body');
    engBody.appendChild(el('span', 'pk-name', t('stEnglishPrompts')));
    engBody.appendChild(el('span', 'pk-sub', t('stEnglishNote')));
    eng.appendChild(engBody);
    eng.addEventListener('click', function(){
      GH.i18n.setDevEnglish(!GH.i18n.devEnglish());
      paint();
    });
    engRow.appendChild(eng);
    card.appendChild(engRow);

    /* Every pet above common is gated on consecutive full days — ninety
       for a legendary, a hundred and fifty for Ember. Kronen alone will
       not open the shelf, so without this the store cannot be looked at
       for five months. */
    if (GH.store && GH.store.setGod){
      var godOn = GH.store.god();
      var godRow = el('div', 'pk-row' + (godOn ? ' is-on' : ''));
      var godBtn = el('button', 'pk-toggle');
      godBtn.type = 'button';
      godBtn.appendChild(el('span', 'pk-mark', godOn ? '\u2713' : ''));
      var godBody = el('span', 'pk-body');
      godBody.appendChild(el('span', 'pk-name', t('stGodMode')));
      godBody.appendChild(el('span', 'pk-sub', t('stGodNote')));
      godBtn.appendChild(godBody);
      godBtn.addEventListener('click', function(){
        GH.store.setGod(!GH.store.god());
        paint();
      });
      godRow.appendChild(godBtn);
      card.appendChild(godRow);
    }

    var giveRow = el('div', 'st-warn st-test');
    [1500, 10000, 80000].forEach(function(n){
      var g = el('button', 'btn btn-ghost', '\u25c8 +' + n);
      g.type = 'button';
      g.addEventListener('click', function(){
        GH.coins.earn(n, 'testing');
        paint();
      });
      giveRow.appendChild(g);
    });
    card.appendChild(giveRow);

    /* ---------- starting over ---------- */
    card.appendChild(el('h2', 'gr-group', t('stResetHead')));
    card.appendChild(el('p', 'gr-note', t('stResetNote')));
    if (state.resetting){
      var rw = el('div', 'st-warn');
      rw.appendChild(el('p', null, t('stResetWarn')));
      var ry = el('button', 'btn btn-primary', t('stResetYes'));
      ry.type = 'button';
      ry.addEventListener('click', function(){
        GH.progress.reset();
        GH.tutor.reset();
        state.resetting = false;
        paint();
      });
      var rn = el('button', 'btn btn-ghost', t('stCancel'));
      rn.type = 'button';
      rn.addEventListener('click', function(){ state.resetting = false; paint(); });
      rw.appendChild(ry); rw.appendChild(rn);
      card.appendChild(rw);
    } else {
      var rb = el('button', 'btn btn-ghost', t('stReset'));
      rb.type = 'button';
      rb.addEventListener('click', function(){ state.resetting = true; paint(); });
      card.appendChild(rb);
    }

    host.appendChild(card);
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, editing:null, confirming:null, resetting:false };
    paint();
  }

  return { open:open };
})();
