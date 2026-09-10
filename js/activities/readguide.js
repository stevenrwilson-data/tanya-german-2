/* js/activities/readguide.js */
/* THE READ AND LISTEN GUIDE — what each of the seven things actually is.

   Steven, 09 Sep: "Read and Listen needs a description hub like Lessons,
   Games, and Reference."

   WHY IT EXISTS. The Table of Contents gave `read` no `?` button while
   the other three groups had one, because `guideFor()` in toc.js returned
   null for it. And this is the section that needs it most: Reference
   holds eight unrelated tools and Games holds eleven variations on one
   idea, but Read and listen holds seven things that are neither — the
   Reader, Listen and Speak, the Jukebox, Songs, Word Matching, the comic
   and Dialogues. A glyph and a two-word name does not say which of those
   is the one she wants.

   MODELLED ON refguide.js, not gameguide.js. The game guide compares
   eleven things that all do the same KIND of thing; this one has to say
   what each thing IS, which is the Reference problem. So the shape is
   `open(host, onExit)`, the rows reuse `.toc-list` / `.toc-row`, and
   every row is a door.

   EVERY ROW IS A DOOR, and back returns HERE rather than to the hub, so
   the guide behaves like a list she is browsing.

   GENDERED RUSSIAN. One of the seven uses the past tense — the Reader's
   "what you understood" — so it carries a masculine twin, `rlReaderM`.
   Unset gender falls to feminine, the convention everywhere else.

   ONE ROW HAS NO DOOR. `rlSection` is the section's own description and
   heads the panel; it is text, not a destination.

   Text is Steven's, 09 Sep, in all three languages. */
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

  /* The masculine twin when there is one and she is male. Falls through
     to the plain key for the six that are gender-neutral, and for every
     language other than Russian. Same helper as refguide.js — copied
     rather than shared because a guide should not depend on a sibling
     guide being loaded. */
  function line(key){
    if (GH.i18n.lang() === 'ru'
        && GH.player && GH.player.gender && GH.player.gender() === 'm'){
      var m = t(key + 'M');
      /* `t()` returns the key itself when it is missing, so an unmatched
         lookup must never be shown to her. */
      if (m && m !== key + 'M') return m;
    }
    return t(key);
  }

  function backHere(){
    var exit = state.onExit;
    return function(){
      GH.app.play({ id:'readguide', open:function(host){
        state.onExit = exit;
        paint(host);
      } });
    };
  }

  /* All seven are registered activities in this section, so one route
     shape covers every row — unlike Reference, which mixes hub tiles and
     registrations and needs two. */
  function openActivity(id){
    return function(){
      var a = GH.app.find && GH.app.find(id);
      if (a) GH.app.play(a, backHere());
    };
  }

  /* activity id, description key. The NAME comes from the activity's own
     registration rather than from a key here, so renaming a section
     cannot leave this list stale — the same reason refguide.js looks up
     Crystals and Multi-Meaning that way.

     Order is Steven's from the document, which reads better than the
     hub's: the two listening tools first, then the songs, then the
     reading. */
  var ROWS = [
    ['listen-speak',  'rlListenSpeak'],
    ['jukebox',       'rlJukebox'],
    ['songs',         'rlSongs'],
    ['word-matching', 'rlWordMatch'],
    ['comic',         'rlComic'],
    ['reader',        'rlReader'],
    ['dialogues',     'rlDialogues']
  ];

  function titleOf(id){
    var a = GH.app.find && GH.app.find(id);
    return (a && GH.i18n.pick(a.name)) || id;
  }

  function paint(host){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    headBar.appendChild(GH.back.button(function(){ state.onExit(); }));
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('rlHead')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    /* The section's own description, above the rows. Not a row itself:
       it names the whole section and has nowhere to go. */
    /* `.lede` is the class gameguide.js already uses for an intro
       paragraph — reused rather than styled again. */
    host.appendChild(el('p', 'lede', t('rlSection')));

    /* `.toc-list` and `.toc-row` are the Table of Contents' own classes.
       Reused rather than styled again: this IS a miniature table of
       contents and should not look like a second thing. */
    var list = el('div', 'toc-list');
    ROWS.forEach(function(r){
      /* A destination whose activity is not registered is skipped rather
         than rendered as a dead row — same guard the other guides use,
         and it means a section can lose a tile without this list
         breaking. */
      if (!(GH.app.find && GH.app.find(r[0]))) return;

      var b = el('button', 'toc-row');
      b.type = 'button';
      b.setAttribute('data-readguide', r[0]);
      b.appendChild(el('span', 'toc-row-t', titleOf(r[0])));
      b.appendChild(el('span', 'toc-row-s', line(r[1])));
      b.addEventListener('click', openActivity(r[0]));
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

    if (GH.nav && GH.nav.ready) GH.nav.ready();
  }

  function open(host, onExit){
    state.onExit = onExit || function(){};
    paint(host);
  }

  GH.readguide = { open:open };
})();
