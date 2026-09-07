/* js/theme.js */
/* Colour themes.

   Each theme is a block of CSS variables in css/style.css. This sets
   data-theme on <html>; the stylesheet does the rest.

   To add one: add the block in style.css, then add its id and label
   here. The two lists must agree.

   Runs from <head> so the stored theme is applied before first paint. */

window.GH = window.GH || {};

GH.theme = (function(){

  var THEMES = [
    { id:'sand',  label:'Sand'  },
    { id:'mint',  label:'Mint'  },
    { id:'plum',  label:'Plum'  },
    { id:'orchid', label:'Orchid' },
    { id:'moss', label:'Moss' },
    { id:'lagoon', label:'Lagoon' },
    { id:'tobacco', label:'Tobacco' },
    { id:'citrus', label:'Citrus' },
    { id:'grove', label:'Grove' },
    /* dark-page themes. Light ink on a dark ground, for reading at night.
       Nothing in the stylesheet is conditional on them — they redefine
       the same tokens the light themes do. */
    { id:'midnight', label:'Midnight' },
    { id:'ember', label:'Ember' },
    { id:'pine', label:'Pine' }
  ];

  var KEY = 'gh-theme';
  var current = 'sand';

  function known(id){
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return true;
    return false;
  }

  /* Private browsing on iOS throws on localStorage rather than
     returning null, so every access is wrapped. */
  function stored(){
    try { return window.localStorage.getItem(KEY); } catch (e){ return null; }
  }
  function remember(id){
    try { window.localStorage.setItem(KEY, id); } catch (e){}
  }

  function apply(id){
    if (!known(id)) id = 'sand';
    current = id;
    /* Sand is the :root default, so it carries no attribute. */
    if (id === 'sand') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', id);
  }

  function set(id){
    apply(id);
    remember(current);
    mark();
    showCurrent();
    /* THE PANEL DOES NOT CLOSE ON A PICK. Steven's rule, and he is right:
       choosing a theme is not one decision, it is trying four and keeping
       the one that looks best. Closing after each tap would mean reopening
       the panel to see the next one against the page. It closes when she
       touches anything else, which is the moment she is done. */
  }

  var bar = null;

  function mark(){
    if (!bar) return;
    var buttons = bar.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++){
      buttons[i].setAttribute('aria-pressed',
        buttons[i].getAttribute('data-theme') === current ? 'true' : 'false');
    }
  }

  /* ---------- TWELVE SWATCHES BEHIND ONE ----------

     Twelve 40px targets wrap to three rows on a phone and cost about
     130px of the first screen — more than the pet, the greeting and the
     next-up card put together. She picks a theme once and then lives with
     it, so the twelve sit behind the one that shows what she chose.

     THE PANEL IS ABSOLUTELY POSITIONED, and that is the whole point.
     Expanding in flow would push the page down by the height of the thing
     she just opened, which is the complaint this change exists to answer.

     A click anywhere outside closes it — including on the type picker's
     trigger, which is what stops two panels being open at once without
     either one needing to know the other exists. */
  var wrap = null, trigger = null, dot = null, open = false;

  /* ---------- THE PANEL IS CLAMPED, NOT FLIPPED ----------

     Steven: "let's not let it get chopped off no matter where it's being
     opened in whichever part of the app."

     WHAT WAS HERE, AND WHY IT KEPT BREAKING. The panel is 244px wide and
     hangs off a 48px trigger, so it always overhangs one side. The old
     code measured whether it would run off the RIGHT and, if so, added a
     class setting `right:0` to open leftward instead. A binary flip, and
     it has now failed in both directions:

       - shipped opening rightward off a trigger that turned out to be the
         leftmost control
       - then `right:0` against a controls row that shrank
       - and now `right:0` again, with the panel wider than the space to
         the LEFT of the trigger, so it hung off the left edge instead

     Every one of those is the same mistake: choosing between two fixed
     positions when neither is guaranteed to fit. Which side has room is
     not a property of the trigger — it moves with the header wrap, the
     type variant, the translated title and anything added to the controls
     row.

     SO IT IS NOT A CHOICE ANY MORE. The panel is measured against the
     viewport and its offset is SET, clamped to stay MARGIN px inside both
     edges. There is no flip, no class, and no side to get wrong. A panel
     wider than the viewport is capped to fit rather than centred, because
     a panel that has to overhang should overhang nothing.

     Read AFTER the panel is shown — a hidden panel has no width. */
  /* The clamp lives in nav.js — GH.nav.clampPanel — because the purse
     needs the same thing and two copies is two things to get wrong. The
     long note is there. */
  function place(){
    if (!wrap || !trigger) return;
    var panel = wrap.querySelector('.pick-panel');
    if (!panel) return;
    if (GH.nav && GH.nav.clampPanel) GH.nav.clampPanel(panel, trigger, wrap);
  }

  /* The viewport can change under an open panel — rotation, or the
     keyboard closing. Re-clamp rather than leave it where it was. */
  window.addEventListener('resize', function(){
    if (open) place();
  });

  function setOpen(on){
    open = !!on;
    if (wrap) wrap.className = 'pick' + (open ? ' is-open' : '');
    if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) place();
  }

  /* The trigger wears the theme she is on, so the control says what it is
     set to rather than just where to tap. */
  function showCurrent(){
    if (dot) dot.className = 'swatch-dot swatch-' + current;
  }

  /* Builds the swatch row. Called once the header exists. */
  function init(){
    wrap = document.getElementById('themeswitch');
    if (!wrap) return;
    wrap.className = 'pick';
    wrap.textContent = '';

    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'pick-now';
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    /* ONE CONTROL FOR BOTH, because they are the same kind of thing.
       Steven: "Same concept both are themes. Themes get one tiny element
       until you open — most of the time they don't need to be visible or
       hog space." So the type variants live in this panel too; see
       GH.type.init() below, which appends into it. */
    trigger.setAttribute('aria-label', 'Theme');
    dot = document.createElement('span');
    trigger.appendChild(dot);
    /* DELIBERATELY NOT stopPropagation. It looked like the right guard
       against the document listener closing the panel in the same tap that
       opened it — but `wrap.contains()` down there already handles that,
       and stopping the event meant the OTHER picker's listener never ran,
       so both panels could be open at once. */
    trigger.addEventListener('click', function(){ setOpen(!open); });
    wrap.appendChild(trigger);

    /* The panel is the card; `themeswitch` inside it is just the swatch
       grid. Splitting them is what lets the type variants sit underneath
       the colours in the same card instead of needing a card of their own. */
    var panel = document.createElement('div');
    panel.className = 'pick-panel';

    bar = document.createElement('div');
    bar.className = 'themeswitch';
    THEMES.forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch';
      b.setAttribute('data-theme', t.id);
      b.setAttribute('title', t.label);
      b.setAttribute('aria-label', t.label);
      /* the dot previews the theme without switching to it */
      b.innerHTML = '<span class="swatch-dot swatch-' + t.id + '"></span>';
      b.addEventListener('click', function(){ set(t.id); });
      bar.appendChild(b);
    });
    panel.appendChild(bar);
    wrap.appendChild(panel);

    document.addEventListener('click', function(e){
      if (open && wrap && !wrap.contains(e.target)) setOpen(false);
    });

    showCurrent();
    mark();
  }

  apply(stored() || 'sand');

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { set:set, list:THEMES, current:function(){ return current; } };
})();


/* Type variants.

   A second axis, independent of colour. A variant redefines
   --ff-display, --ff-ui and the root font size — which every type
   declaration in the stylesheet already reads — so it changes every
   screen without touching a single component, and without moving any
   size relative to any other.

   Four variants against twelve palettes is forty-eight combinations,
   and none of them can produce unreadable text: the ink is contextual
   (see the surface block in style.css) and the variant only moves
   family and scale, never colour.

   Editorial is the :root default and carries no attribute, the same
   way Sand does.

   Runs from <head>, before first paint, for the same reason. */

GH.type = (function(){

  var TYPES = [
    { id:'editorial', label:'Editorial', mark:'Aa' },
    { id:'plain',     label:'Plain',     mark:'Aa' },
    { id:'large',     label:'Large',     mark:'Aa' },
    { id:'loud',      label:'Loud',      mark:'Aa' }
  ];

  var KEY = 'gh-type';
  var current = 'editorial';

  function known(id){
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i].id === id) return true;
    return false;
  }

  function stored(){
    try { return window.localStorage.getItem(KEY); } catch (e){ return null; }
  }
  function remember(id){
    try { window.localStorage.setItem(KEY, id); } catch (e){}
  }

  function apply(id){
    if (!known(id)) id = 'editorial';
    current = id;
    if (id === 'editorial') document.documentElement.removeAttribute('data-type');
    else document.documentElement.setAttribute('data-type', id);
  }

  function set(id){
    apply(id);
    remember(current);
    mark();
    /* No close, for the same reason the colour picker does not close: she
       is comparing faces against the page, not making one decision. */
  }

  var bar = null;

  function mark(){
    if (!bar) return;
    var b = bar.querySelectorAll('button');
    for (var i = 0; i < b.length; i++){
      b[i].setAttribute('aria-pressed',
        b[i].getAttribute('data-type') === current ? 'true' : 'false');
    }
  }

  /* ---------- NO TRIGGER OF ITS OWN ----------

     This used to be a second collapsed control sitting beside the colour
     one. Steven's ruling, and it is the right one: "Same concept both are
     themes." A palette and a type scale are two axes of one decision — how
     the app looks — and asking for two taps in two places to make one
     choice was the header being organised by which module owns the code
     rather than by what she is doing.

     So the four variants are appended INTO the colour picker's panel and
     this module owns no header furniture at all.

     ORDERING: GH.theme is defined above and registers its DOMContentLoaded
     listener first, so its panel exists by the time this runs. The fallback
     is not decoration — if that ever stops being true, the variants land in
     the controls row unstyled-but-working rather than vanishing. */
  function init(){
    var panel = document.querySelector('#themeswitch .pick-panel');
    var host = panel || document.querySelector('.topbar-controls');
    if (!host) return;

    bar = document.createElement('div');
    bar.className = 'typeswitch';
    bar.setAttribute('aria-label', 'Type style');
    TYPES.forEach(function(t){
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-type', t.id);
      b.setAttribute('title', t.label);
      b.setAttribute('aria-label', t.label);
      b.textContent = t.mark;
      b.addEventListener('click', function(){ set(t.id); });
      bar.appendChild(b);
    });

    host.appendChild(bar);
    mark();
  }

  apply(stored() || 'editorial');

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { set:set, list:TYPES, current:function(){ return current; } };
})();
