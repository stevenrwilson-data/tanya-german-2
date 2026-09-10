/* js/activities/toc.js */
/* The Table of Contents.

   Reached from the button beside "Filter by Topic" at the top of the hub.
   That button shipped inert in v262 — Steven's instruction was to claim
   the spot before there was anywhere to go, so the destination would not
   have to be guessed at. This is the destination.

   ------------------------------------------------------------------
   WHAT IS HERE AND WHAT IS NOT

   The heading, the line under it, and the way back. That is deliberate
   and it is the whole file: Steven is writing the contents now, and the
   one thing this must not do is invent a structure he then has to argue
   with. `sections()` below returns an empty list today, and the screen
   says nothing rather than showing a scaffold nobody asked for.

   Adding the content is adding rows to that one function. Nothing else
   in here needs to change, and nothing outside it needs to change at
   all.

   ------------------------------------------------------------------
   A VIEW, NOT A TILE

   It is not registered with GH.app.register() and it must not be: a tile
   in the Reference row would put it in the game guide, in the hub grid
   and behind the topic filter, none of which is what a table of contents
   is. It is navigation ABOUT the hub, so it hangs off the hub's own
   header the way the game guide's "What are these games?" button does —
   same shape, same launch() call, same back-to-hub.

   ------------------------------------------------------------------
   ITS OWN LOOK, PER STEVEN

   His words, from the spec: "a separate looking page with text and links
   and specific behaviors" — distinct from the hub's tile grid. So the
   rows here are text and not cards, and the styling lives under `.toc-`
   in css/style.css rather than borrowing the tile classes.
*/

window.GH = window.GH || {};

GH.toc = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* ---------- THE CONTENTS ----------

     BUILT FROM THE APP, NOT TYPED OUT. Every label, and most of the
     descriptions, already exist somewhere: the section headings in
     js/i18n.js, each activity's own `name`/`sub`/`detail` on its
     registration, the lesson blurbs in data/lesson-guide.js, and the
     first rule line of every game. Retyping any of it here would mean a
     table of contents that goes stale the day a tile is renamed.

     So this reads the live app at paint time. Add a game and it appears.
     Rename a lesson and the name follows.

     STRUCTURE, per Steven: "Start by putting section 1 through 4 at the
     top as buttons... Below that put the section for reference learning
     listen in games... Inside of each of those will be all the content
     for each of those sections with descriptions and links."

     So: four jump buttons, then four groups, each group a heading plus
     everything inside it.

     THREE ROW KINDS, and paint() below draws each differently:
       jump  a section button — leaves this screen and scrolls the hub
       head  a group heading, not tappable
       row   one piece of content, with its description and its link

     WHAT IS STILL BLANK AND WHY. The four numbered sections have no
     description anywhere in the app — they are built inline in
     js/app.js with no registration, so there has never been a field to
     hold one. Those rows render with no line under them rather than
     with something invented. Steven's to write; a row with a wrong
     description is worse than a row with none. The six Reference tiles
     were in the same position until 07 Sep and now read from `desc*`
     in js/i18n.js.

     ONE LINK IS NOT WIRED. A row for an individual grammar lesson cannot
     open it: app.js's `openGrammarLesson` and `openLessonsOverview` are
     private to that file. Those rows jump to the Lessons section instead,
     which is one tap short of the lesson. Exposing either function would
     fix it and is a change to app.js, so it is flagged rather than done. */

  /* Leave for the hub, then scroll to a section. The hub has to repaint
     before the element exists, so the scroll waits a frame. */
  function jumpTo(secId){
    return function(){
      state.onExit();
      var go = function(){
        var n = document.getElementById(secId);
        if (n && n.scrollIntoView) n.scrollIntoView({ behavior:'smooth', block:'start' });
      };
      if (window.requestAnimationFrame) requestAnimationFrame(function(){ requestAnimationFrame(go); });
      else setTimeout(go, 60);
    };
  }

  /* THE WAY BACK IS THE TOC, NOT THE HUB.

     Steven: "When you go from TOC to a section, the back should take you
     back to the TOC." She did not arrive from the hub, so a Back that
     lands there throws away her place in the contents and makes the TOC
     something you pass through once rather than navigate from.

     The hub is still remembered — it is the TOC's OWN exit — so Back
     twice reaches it. And the expanded group is carried across, because
     returning to a fully collapsed list is not returning to where she
     was. */
  function backHere(){
    var home = state.onExit;
    var group = state.group;
    return function(){
      GH.app.play({ id:'toc', open:function(v){ open(v, home, group); } });
    };
  }

  /* One grammar lesson, by id, with Back coming home to the contents. */
  function openLesson(id){
    return function(){
      if (GH.app && GH.app.lesson) GH.app.lesson(id, backHere());
    };
  }

  /* A registered activity, opened the way the hub opens it. */
  function openActivity(id){
    return function(){
      var a = GH.app.find && GH.app.find(id);
      if (a) GH.app.play(a, backHere());
    };
  }

  /* A Reference screen. These are not registered activities — they are
     hub tiles built inline — but every module is public, so the TOC can
     hand app.js the same shape a registration would have. */
  /* WHICH GUIDE BELONGS TO WHICH GROUP.

     Three exist and they are not the same shape:
       games   `GH.guide.open(host, exit, onPlay)`  — gameguide.js
       ref     `GH.refguide.open(host, exit)`       — refguide.js
       lessons the Lessons Overview, built inside app.js off
               GH_LESSON_GUIDE, reached through `GH.app.lessonsOverview`

     read    `GH.readguide.open(host, exit)`     — readguide.js

     A missing module returns null rather than a button that throws, so a
     guide that has not loaded simply means no `?` on that heading. */
  function guideFor(id){
    if (id === 'games' && GH.guide && GH.guide.open){
      return function(){
        GH.app.play({ id:'guide', open:function(host, exit){
          GH.guide.open(host, exit, function(a){ GH.app.play(a, backHere()); });
        } }, backHere());
      };
    }
    if (id === 'ref' && GH.refguide && GH.refguide.open){
      return function(){
        GH.app.play({ id:'refguide', open:GH.refguide.open }, backHere());
      };
    }
    if (id === 'lessons' && GH.app && GH.app.lessonsOverview){
      return function(){ GH.app.lessonsOverview(backHere()); };
    }
    /* `read` had no guide, so its heading was the only one of the four
       without a `?`. Steven, 09 Sep: "Read and Listen needs a description
       hub like Lessons, Games, and Reference." Added the same day —
       js/activities/readguide.js, `open(host, exit)` like refguide. */
    if (id === 'read' && GH.readguide && GH.readguide.open){
      return function(){
        GH.app.play({ id:'readguide', open:GH.readguide.open }, backHere());
      };
    }
    return null;
  }

  function openView(id, mod, fn){
    return function(){
      var m = GH[mod];
      if (!m || !m[fn || 'open']) return;
      GH.app.play({ id:id, open:m[fn || 'open'] }, backHere());
    };
  }

  function pick(o){ return o ? GH.i18n.pick(o) : ''; }

  /* The first line of a game's rules, which is written as the sentence
     that says what the game is — the same line the game guide shows. */
  function ruleOne(prefix){
    if (!prefix) return '';
    var v = t(prefix + 'Rule1');
    return (v && v !== prefix + 'Rule1') ? v : '';
  }

  /* A lesson's blurb, from data/lesson-guide.js. */
  function lessonNote(id){
    var G = window.GH_LESSON_GUIDE || {};
    var e = G[id];
    if (!e) return '';
    return pick(e.sub || e.line || e.text || e.blurb || e);
  }

  function activitiesOfKind(kind){
    var all = (GH.app.list && GH.app.list()) || [];
    return all.filter(function(a){ return (a.kind || 'game') === kind; });
  }

  /* Which group is expanded. Null means all closed, which is how the
     screen opens — see the note in sections(). */
  function groupOpen(id){ return state.group === id; }

  function sections(){
    var out = [];

    /* ---- the four numbered sections, as buttons ---- */
    [['sentencesHead',    'sec-sentencesHead'],
     ['storiesHead',      'sec-storiesHead'],
     ['vocabHead',        'sec-vocabHead'],
     ['longStoriesHead',  'sec-longStoriesHead']
    ].forEach(function(pair){
      out.push({ kind:'jump', label:t(pair[0]), note:'', go:jumpTo(pair[1]) });
    });

    /* ---- COLLAPSIBLE GROUPS ----

       Steven: "Also need a way to collapse a lot of this stuff and expand
       it so it's not a giant list. You have to scroll down through like
       the old pet store... I think collapsible groups would be a great
       idea, with an obvious expand button and a description for each
       section."

       The flat version was forty-eight rows under four headings, which
       put Reference three screens down and made the Table of Contents
       the very thing it exists to prevent. Same fix as the store: a
       heading that says how many are inside, a line saying what the
       group is for, and a caret that turns.

       ONE OPEN AT A TIME, matching the store. Two expanded groups is
       most of the long list back, and the whole point is that the four
       groups plus the four section buttons fit one screen.

       CLOSED ON ARRIVAL. A table of contents should show its contents,
       not one group's worth of detail — and nothing here is a
       preference worth remembering between visits. */
    var groups = [];

    /* Lessons: Word Lab plus the seventeen grammar lessons. */
    var lessonRows = [];
    var wl = GH.app.find && GH.app.find('word-lab');
    if (wl){
      lessonRows.push({ id:'word-lab',
                        label:pick(wl.name) || 'Word Lab',
                        note:lessonNote('word-lab') || pick(wl.detail),
                        go:openActivity('word-lab') });
    }
    /* EACH ROW OPENS THE LESSON IT NAMES. These all used to
       `jumpTo('sec-lsHead')` — scroll to the hub's Lessons section — so a
       row titled "Where, or where to?" took her to a grid of eighteen
       tiles and left her to find it again. `GH.app.lesson` did not exist
       to call; the equivalent lived inside a closure in js/app.js and
       nothing outside could reach it. It is exported now.

       `backHere()` so Back returns to the Table of Contents, the same as
       every other row here. */
    /* GERMAN ONLY, the same gate the hub and the lessons overview apply.
       The seventeen grammar lessons are about German — haben or sein,
       separable verbs, der/die/das — and have no English or Russian
       counterpart, so on another course this list is empty rather than
       offering lessons the target cannot use.

       Third place this list was read, and the fourth reader is what the
       old note here predicted. The check MOVED into `GH.lessons.all()`,
       which now returns the lessons for the target she is learning — so
       this caller, and any future one, just asks for the list. */
    ((GH.lessons && GH.lessons.all()) || []).forEach(function(l){
      lessonRows.push({ id:l.id,
                        label:pick(l.name) || l.id,
                        note:lessonNote(l.id),
                        go:openLesson(l.id) });
    });
    /* No `go` on the group itself: the heading is a fold, not a link. It
       used to carry `jumpTo('sec-lsHead')` and nothing ever called it —
       only `r.go` on a ROW is wired to a click — so it was dead data that
       read as if tapping the heading left the page. */
    groups.push({ id:'lessons', label:t('lsHead'), note:t('tocNoteLessons'),
                  rows:lessonRows });

    /* Read and listen. */
    var readRows = [];
    activitiesOfKind('read').forEach(function(a){
      readRows.push({ id:a.id,
                      label:pick(a.name),
                      note:pick(a.sub) || pick(a.detail),
                      go:openActivity(a.id) });
    });
    groups.push({ id:'read', label:t('rlHead'), note:t('tocNoteRead'),
                  go:jumpTo('sec-rlHead'), rows:readRows });

    /* Games. */
    var gameRows = [];
    activitiesOfKind('game').forEach(function(a){
      if (a.id === 'word-lab') return;         /* a lesson, listed above */
      gameRows.push({ id:a.id,
                      label:pick(a.name),
                      note:pick(a.sub) || ruleOne(a.rules),
                      go:openActivity(a.id) });
    });
    groups.push({ id:'games', label:t('gamesHead'), note:t('tocNoteGames'),
                  go:jumpTo('sec-gamesHead'), rows:gameRows });

    /* Reference: the six hub tiles, then the two that register as `ref`.

       THE SIX NOW HAVE DESCRIPTIONS. They are built inline in js/app.js
       with no registration, so there was never a field to hold one and
       these rows rendered with nothing under them. The text is Steven's
       (via GPT, all three languages) and lives in js/i18n.js as
       `desc*` — named for the destination rather than for the TOC,
       because the tour and the game guide would want the same lines.

       Crystals and Multi-Meaning are NOT in this list: they are
       registered activities, so they already carry their own text and
       `activitiesOfKind('ref')` below picks it up. Adding them here
       would be a second source for the same sentence. */
    var refRows = [];
    [['progress-view', 'pvTitle', 'progressView', 'descProgress'],
     ['reference',     'refTitle', 'reference',   'descWords'],
     ['awards-view',   'awTitle',  'awardsView',  'descAwards'],
     ['store',         'stStore',  'store',       'descStore'],
     ['settings',      'stTitle',  'settings',    'descSettings'],
     ['grammar',       'grTitle',  'grammar',     'descGrammar']
    ].forEach(function(r){
      refRows.push({ id:r[0], label:t(r[1]), note:t(r[3]),
                     go:openView(r[0], r[2]) });
    });
    activitiesOfKind('ref').forEach(function(a){
      refRows.push({ id:a.id,
                     label:pick(a.name),
                     note:pick(a.detail) || pick(a.sub),
                     go:openActivity(a.id) });
    });
    groups.push({ id:'ref', label:t('refHead'), note:t('tocNoteRef'),
                  go:jumpTo('sec-refHead'), rows:refRows });

    groups.forEach(function(g){
      out.push({ kind:'head', id:g.id, label:g.label, note:g.note,
                 count:g.rows.length, go:g.go });
      if (groupOpen(g.id)){
        g.rows.forEach(function(r){
          out.push({ kind:'row', id:r.id, label:r.label, note:r.note, go:r.go });
        });
      }
    });

    return out;
  }

  function paint(){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = GH.back.button(function(){ state.onExit(); });
    headBar.appendChild(back);

    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('tocTitle')));
    titles.appendChild(el('p', null, t('tocSub')));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    var rows = sections();
    if (rows.length){
      var list = el('div', 'toc-list');
      rows.forEach(function(r){
        /* A heading is a heading and not a disabled button: it names the
           group and, because every group is also a place, it carries its
           own jump. */
        if (r.kind === 'head'){
          /* THE HEADING IS THE EXPAND BUTTON, and it says so: the name,
             how many are inside, and a caret that turns when it opens.
             Tapping it expands the group rather than leaving the screen —
             the group's own section is reachable from the four buttons at
             the top, and a heading that navigated away would make the
             collapse impossible to use. */
          var open = groupOpen(r.id);
          var h = el('button', 'toc-head' + (open ? ' is-open' : ''));
          h.type = 'button';
          /* Same reason as `data-toc` on a row: a tour step needs to be
             able to name ONE group. `lessons`, `read`, `games`, `ref`. */
          if (r.id) h.setAttribute('data-toc-group', r.id);
          h.setAttribute('aria-expanded', open ? 'true' : 'false');

          /* ORDER: chevron, count, then the text. The chevron is first
             and a fixed width, so it forms a column down the left edge —
             that column is what makes an indented child row read as
             structure rather than as a stray margin. A caret on the
             right has nothing for an indent to align to.

             U+203A, a single right chevron — not U+25B8, the filled
             triangle, which together with a circle background read as a
             play button. Rotated 90deg by CSS when the group is open. */
          h.appendChild(el('span', 'toc-caret', '\u203a'));
          if (r.count) h.appendChild(el('span', 'toc-head-n', String(r.count)));

          var hl = el('div', 'toc-head-l');
          hl.appendChild(el('span', 'toc-head-t', r.label));
          if (r.note) hl.appendChild(el('span', 'toc-head-s', r.note));
          h.appendChild(hl);
          h.addEventListener('click', function(){
            state.group = open ? null : r.id;
            paint();
          });

          /* THE SECTION'S OWN GUIDE, on the right of the heading.
             Steven, 08 Sep: a button next to the section name that opens
             that section's guide.

             NOT INSIDE `h`. `h` is a <button>, and a button inside a
             button is invalid HTML whose clicks fight each other —
             reference.js hit this exact problem with its thumb and its
             word, and solved it the same way: a plain wrapper holding two
             buttons rather than one wrapping the other.

             Only three of the four groups have a guide. `read` has none,
             so it simply gets no button rather than a dead one. */
          var g = guideFor(r.id);
          if (g){
            var wrap = el('div', 'toc-head-row');
            wrap.appendChild(h);
            var gb = el('button', 'toc-head-guide');
            gb.type = 'button';
            gb.setAttribute('aria-label', t('rgOpen'));
            gb.setAttribute('title', t('rgOpen'));
            gb.textContent = '?';
            gb.addEventListener('click', function(ev){
              /* The heading is a sibling, not a parent, so a bubbling
                 click cannot reach it — but stop it anyway so a future
                 wrapper change cannot start toggling the group. */
              ev.stopPropagation();
              g();
            });
            wrap.appendChild(gb);
            list.appendChild(wrap);
            return;
          }

          list.appendChild(h);
          return;
        }
        var b = el('button', r.kind === 'jump' ? 'toc-jump' : 'toc-row');
        b.type = 'button';
        /* SOMETHING FOR THE TOUR TO POINT AT. Every row used to be just
           `.toc-row`, so `document.querySelector` could not tell Songs
           from any of the other ninety-odd rows and a tour step could not
           name one. The id is whatever the row already knows itself by —
           an activity id, a lesson id, a hub tile id. */
        if (r.id) b.setAttribute('data-toc', r.id);
        b.appendChild(el('span', 'toc-row-t', r.label));
        if (r.note) b.appendChild(el('span', 'toc-row-s', r.note));
        if (r.go) b.addEventListener('click', r.go);
        else b.disabled = true;
        list.appendChild(b);
      });
      host.appendChild(list);
    }

    if (GH.nav) GH.nav.ready();
  }

  /* `onExit` is the hub. Same signature as every other screen's open(),
     so app.js's launch() wraps it the same way and the event log records
     it as one screen. */
  function open(container, onExit, group){
    host = container;
    state = { onExit:onExit, group:group || null };
    GH.app.redraw = paint;
    paint();
  }

  return { open:open };
})();
