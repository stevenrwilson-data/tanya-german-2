/* What every game is — one page.

   The hub gives her a glyph, a name and one line of subtitle per tile.
   `⚖️ der · die · das` says nothing about what happens when she taps it,
   so choosing between fifteen activities means opening fifteen of them.
   This is the page that answers "what is that one, and do I want it".

   ------------------------------------------------------------------
   IT WRITES NOTHING OF ITS OWN

   Every game already ships rule text in all three languages for the
   `?` How-to-play overlay — five lines each, `cwRule1` … `cwRule5`. That
   text is already hers, already translated, already reviewed. Inventing a
   second description per game would mean thirty more strings to keep in
   step with the first thirty, and the two would disagree within a month.

   So a game names its own prefix in its registration entry:

       rules:'gnRule', rulesTitle:'gnTitle'

   and this page collects prefix + 1, 2, 3… until a key is missing, which
   is exactly what howto.js does. A game added next month appears here by
   declaring those two fields and nothing else.

   Rule 1 is used as the summary — every one of them happens to be the
   sentence that says what the game is, because that is what a first rule
   is for. The rest expand on tap.

   ------------------------------------------------------------------
   WHAT IT CANNOT SHOW

   An activity with no `rules` prefix gets its name and its subtitle and
   nothing more. That is honest and it is also a to-do list: the vocabulary
   game and fill-blank have no rule text at all, and placement had a
   How-to-play button with an empty overlay until v194.

   Read-and-listen and reference activities are listed too, in their own
   sections. She is choosing what to do, and "the songs" is a real answer
   to that even though nothing there is graded. */

window.GH = window.GH || {};

GH.guide = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* prefix + 1, 2, 3 … until one is missing. t() returns the key itself
     when unset, which is how howto.js detects the end too. */
  function rules(prefix){
    var out = [], i = 1;
    if (!prefix) return out;
    while (i < 20){
      var k = prefix + i;
      var s = GH.i18n.t(k);
      if (s === k) break;
      out.push(s);
      i++;
    }
    return out;
  }

  /* Everything registered, split the way the hub splits it. */
  function groups(){
    var all = (GH.app && GH.app.list) ? GH.app.list() : [];
    return [
      /* Lessons first, matching the hub: a lesson is where a rule is
         learned and a game is where it is drilled. */
      { key:'gdLesson', items:all.filter(function(a){ return a.kind === 'lesson'; }) },
      { key:'gdGames',  items:all.filter(function(a){ return !a.kind; }) },
      { key:'gdRead',   items:all.filter(function(a){ return a.kind === 'read'; }) },
      { key:'gdRef',    items:all.filter(function(a){ return a.kind === 'ref'; }) }
    ].filter(function(g){ return g.items.length; });
  }

  function card(a){
    var box = el('div', 'gd-card');

    var head = el('button', 'gd-head');
    head.type = 'button';
    head.appendChild(el('span', 'gd-glyph', a.glyph || ''));
    var body = el('span', 'gd-head-body');
    body.appendChild(el('span', 'gd-name', GH.i18n.pick(a.name)));

    var lines = rules(a.rules);
    /* Rule one if there is one, the tile's own subtitle if not. */
    body.appendChild(el('span', 'gd-what',
      lines.length ? lines[0] : GH.i18n.pick(a.sub)));
    head.appendChild(body);

    var open = state.open[a.id];
    if (lines.length > 1){
      head.appendChild(el('span', 'gd-more', open ? '\u2212' : '+'));
    }
    box.appendChild(head);

    if (lines.length > 1){
      head.addEventListener('click', function(){
        state.open[a.id] = !state.open[a.id];
        paint();
      });
      if (open){
        var ol = el('ol', 'gd-rules');
        lines.slice(1).forEach(function(x){
          ol.appendChild(el('li', 'gd-rule', x));
        });
        box.appendChild(ol);
      }
    }

    /* Straight into it from here, so reading about it and starting it are
       one screen rather than two. */
    var go = el('button', 'btn gd-go', t('gdPlay'));
    go.type = 'button';
    go.addEventListener('click', function(){
      GH.speech.stop();
      state.onPlay(a);
    });
    box.appendChild(go);

    return box;
  }

  function paint(){
    host.textContent = '';

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('gdTitle')));
    titles.appendChild(el('p', null, t('gdSub')));
    head.appendChild(titles);
    host.appendChild(head);

    var gs = groups();
    if (!gs.length){
      host.appendChild(el('p', 'lede', t('gdEmpty')));
      if (GH.nav) GH.nav.ready();
      return;
    }

    gs.forEach(function(g){
      host.appendChild(el('h2', 'gd-sec', t(g.key)));
      var wrap = el('div', 'gd-list');
      g.items.forEach(function(a){ wrap.appendChild(card(a)); });
      host.appendChild(wrap);
    });

    if (GH.nav) GH.nav.ready();
  }

  /* `onPlay` gets the activity, because only app.js knows how to open one
     — it owns `launch()`, which is what tells the event log which game she
     is using. */
  function open(container, onExit, onPlay){
    host = container;
    state = { onExit:onExit, onPlay:onPlay, open:{} };
    GH.app.redraw = paint;
    paint();
  }

  return { open:open, rules:rules };
})();
