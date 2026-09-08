/* js/activities/refguide.js */
/* THE REFERENCE GUIDE — what each of the eight destinations actually is.
   Steven, 08 Sep: "the Reference section is basically the site's
   control/information center, so a guide is genuinely useful."

   WHY IT EXISTS. Reference holds eight unrelated things, and a glyph plus
   a one-word name does not tell her whether Progress, Crystals or
   Multi-Meaning is the one she wants. The Games section already solves
   this with `gdOpen` / gameguide.js; this is the same idea for Reference.

   WHY IT IS NOT THE `desc*` KEYS. The Table of Contents already lists
   these eight rows with `descProgress`, `descWords` and so on. Those sit
   permanently under a tile, so they must stay to one short line. This
   panel is optional — she opens it deliberately — so it can afford two
   sentences each: what the section holds, then what she can do there.
   Two sets of strings for two different jobs, not a duplicate.

   EVERY ROW IS A DOOR. Steven: "each description should be clickable and
   take her directly to that destination." So the routes here are the same
   two shapes toc.js uses — a view module for the six hub tiles, and
   `GH.app.find` for the two registered `kind:'ref'` activities — rather
   than a third way of opening the same screens.

   GENDERED RUSSIAN. Three of the eight use the past tense, so they carry
   a masculine twin: `rgProgressM`, `rgAwardsM`, `rgCrystalsM`. Unset
   gender falls to feminine, which is the convention everywhere else in
   the app. */
(function(){
  var GH = window.GH = window.GH || {};
  function t(k, v){ return GH.i18n.t(k, v); }
  function el(tag, cls, txt){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }

  var state = { onExit:null };

  /* The masculine twin when there is one and she is male. Falls through to
     the plain key for the five that are gender-neutral, and for every
     language other than Russian. */
  function line(key){
    if (GH.i18n.lang() === 'ru'
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      var m = t(key + 'M');
      /* `t()` returns the key itself when it is missing, so an
         unmatched lookup must not be shown to her. */
      if (m && m !== key + 'M') return m;
    }
    return t(key);
  }

  /* A hub tile: `GH.<mod>.open` behind `GH.app.play`, exactly as toc.js
     does it. Back returns HERE, not to the hub, so the guide behaves like
     a list she is browsing rather than a one-way door. */
  function openView(id, mod, fn){
    return function(){
      var m = GH[mod];
      if (!m || !m[fn || 'open']) return;
      GH.app.play({ id:id, open:m[fn || 'open'] }, backHere());
    };
  }

  /* A registered activity — Crystals and Multi-Meaning are `kind:'ref'`
     rather than hub tiles, so they are found by id. */
  function openActivity(id){
    return function(){
      var a = GH.app.find && GH.app.find(id);
      if (a) GH.app.play(a, backHere());
    };
  }

  function backHere(){
    var exit = state.onExit;
    return function(){
      GH.app.play({ id:'refguide', open:function(host, onExit){
        state.onExit = exit;
        paint(host);
      } });
    };
  }

  /* id, title key, description key, and how to open it. Order is
     Steven's, not the hub's: the two he added last — Crystals and
     Multi-Meaning — sit where they read best rather than at the end. */
  var ROWS = [
    ['progress-view', 'pvTitle', 'rgProgress', ['progressView']],
    ['reference',     'refTitle', 'rgWords',   ['reference']],
    ['awards-view',   'awTitle',  'rgAwards',  ['awardsView']],
    ['store',         'stStore',  'rgStore',   ['store']],
    ['settings',      'stTitle',  'rgSettings', ['settings']],
    ['crystals',      null,       'rgCrystals', null],
    ['grammar',       'grTitle',  'rgGrammar', ['grammar']],
    ['dictionary',    null,       'rgMulti',   null]
  ];

  /* Crystals and Multi-Meaning take their names from their own
     registration, so a rename there cannot leave this list stale. */
  function titleOf(r){
    if (r[1]) return t(r[1]);
    var a = GH.app.find && GH.app.find(r[0]);
    return (a && GH.i18n.pick(a.name)) || r[0];
  }

  function paint(host){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    headBar.appendChild(GH.back.button(function(){ state.onExit(); }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('rgTitle')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    /* `.toc-list` and `.toc-row` are the Table of Contents' own classes.
       Reused rather than styled again: this IS a miniature table of
       contents and should not look like a second thing. */
    var list = el('div', 'toc-list');
    ROWS.forEach(function(r){
      var go = r[3] ? openView(r[0], r[3][0]) : openActivity(r[0]);
      /* A destination whose module is not loaded is skipped rather than
         rendered as a dead row. */
      if (r[3] && !GH[r[3][0]]) return;
      if (!r[3] && !(GH.app.find && GH.app.find(r[0]))) return;

      var b = el('button', 'toc-row');
      b.type = 'button';
      b.setAttribute('data-refguide', r[0]);
      b.appendChild(el('span', 'toc-row-t', titleOf(r)));
      b.appendChild(el('span', 'toc-row-s', line(r[2])));
      b.addEventListener('click', go);
      list.appendChild(b);
    });
    host.appendChild(list);

    /* TO THE TABLE OF CONTENTS, the same button every section guide
       carries. `tocButton` is the label the real contents button already
       uses in all three languages — a new string would be a second name
       for one screen. */
    if (GH.toc && GH.toc.open){
      var tb = el('button', 'btn btn-quiet gd-toc', t('tocButton'));
      tb.type = 'button';
      tb.addEventListener('click', function(){
        GH.app.play({ id:'toc', open:GH.toc.open });
      });
      host.appendChild(tb);
    }
  }

  function open(host, onExit){
    state.onExit = onExit || function(){};
    paint(host);
  }

  GH.refguide = { open:open };
})();
