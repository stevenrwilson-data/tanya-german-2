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

  /* Builds the swatch row. Called once the header exists. */
  function init(){
    bar = document.getElementById('themeswitch');
    if (!bar) return;
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

  /* Built here rather than in index.html, so the markup stays a shell
     and adding a variant needs one edit, not two. */
  function init(){
    var host = document.querySelector('.topbar-controls');
    if (!host) return;
    bar = document.createElement('nav');
    bar.className = 'typeswitch';
    bar.id = 'typeswitch';
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
