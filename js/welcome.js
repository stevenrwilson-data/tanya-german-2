/* The first thing she ever sees.

   Before this, a fresh install created a profile silently with an empty
   name, defaulted to whatever language the browser happened to report, and
   dropped her on the hub. Her name and gender existed only in Settings,
   several taps down, where a new arrival would never look — so the pets
   addressed her as nobody and the butler had no name to use.

   Three questions, then Waddles.

   ------------------------------------------------------------------
   IT ASKS ONCE AND NEVER AGAIN

   `gh-welcome-v1` records that it ran. Everything it sets is editable in
   Settings afterwards, so nothing here is a decision she is stuck with —
   which is the only reason it is acceptable to ask at all.

   Skipping is allowed at every step. A first run that cannot be escaped is
   a wall in front of the thing she came for, and she can set all of it
   later.

   ------------------------------------------------------------------
   WHY THE TARGET IS A QUESTION AT ALL

   There is one target language and it is German. Asking looks pointless
   today, and it is the reason the app can have a second one without a
   redesign: `GH.player.target()` already scopes every progress key, so the
   machinery is there and only the question was missing.

   Shown, but with one answer selected and nothing to decide. She reads it
   and moves on. */

window.GH = window.GH || {};

GH.welcome = (function(){

  var KEY = 'gh-welcome-v1';

  var host = null;
  var step = 0;
  var done = null;

  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function seen(){
    try { return window.localStorage.getItem(KEY) === '1'; }
    catch (e){ return true; }        /* no storage: never ask */
  }

  function mark(){
    try { window.localStorage.setItem(KEY, '1'); } catch (e){}
  }

  /* Only on a genuinely fresh install. A profile with a name, or any
     progress at all, means she has used this before and being asked to
     introduce herself would be worse than not asking. */
  function due(){
    if (seen()) return false;
    try {
      var p = GH.player && GH.player.current && GH.player.current();
      if (p && p.name) return false;
    } catch (e){}
    try {
      if (GH.coins && GH.coins.lifetime && GH.coins.lifetime() > 0) return false;
    } catch (e){}
    return true;
  }

  /* ---------- the frame ---------- */

  function ensure(){
    host = document.querySelector('.wc-overlay');
    if (host) return;
    host = el('div', 'wc-overlay');
    document.body.appendChild(host);
  }

  function close(){
    if (host && host.parentNode) host.parentNode.removeChild(host);
    host = null;
    document.body.style.overflow = '';
  }

  function paint(build){
    ensure();
    host.textContent = '';
    /* `card` is the app's own surface — opaque, and it declares its own
       ink. Inventing one is how the first version ended up transparent
       with unreadable text. */
    var card = el('div', 'card wc-card');
    build(card);

    /* Where she is, out of three. Not a progress bar — three dots, because
       the honest message is "this is short". */
    var dots = el('div', 'wc-dots');
    for (var i = 0; i < 4; i++){
      dots.appendChild(el('span', 'wc-dot' + (i === step ? ' is-on' : '')));
    }
    card.appendChild(dots);

    host.appendChild(card);
    host.className = 'wc-overlay is-open';
    document.body.style.overflow = 'hidden';
  }

  function button(row, label, kind, fn){
    var b = el('button', 'wc-btn' + (kind ? ' is-' + kind : ''), label);
    b.type = 'button';
    b.addEventListener('click', fn);
    row.appendChild(b);
    return b;
  }

  /* ---------- THE LANGUAGES ----------

     ONE TABLE. Adding French means adding a row here and its strings — no
     screen is rewritten, no logic changes, and nothing counts the entries.

       code    the i18n / target code
       flag    shown before the name
       own     its name IN ITSELF. A Russian speaker looks for Русский, not
               for "Russian", and that is the whole trick of screen one.
       ui      the interface can be read in it
       target  it can be learnt

     A language can be one, the other, or both. German is both: she can read
     the app in German AND learn it. Spanish would arrive as target-only
     until someone translates the interface. */
  var LANGS = [
    { code:'en', flag:'\uD83C\uDDFA\uD83C\uDDF8', own:'English',
      ask:'Choose your language', ui:true,  target:false },
    { code:'ru', flag:'\uD83C\uDDF7\uD83C\uDDFA', own:'\u0420\u0443\u0441\u0441\u043A\u0438\u0439',
      ask:'\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044F\u0437\u044B\u043A', ui:true, target:false },
    { code:'de', flag:'\uD83C\uDDE9\uD83C\uDDEA', own:'Deutsch',
      ask:'Sprache w\u00E4hlen', ui:true,  target:true }

    /* Ready to add, and nothing else changes:
    ,{ code:'es', flag:'\uD83C\uDDEA\uD83C\uDDF8', own:'Espa\u00F1ol',
       ask:'Elige tu idioma',    ui:false, target:true }
    ,{ code:'fr', flag:'\uD83C\uDDEB\uD83C\uDDF7', own:'Fran\u00E7ais',
       ask:'Choisissez la langue', ui:false, target:true }
    ,{ code:'it', flag:'\uD83C\uDDEE\uD83C\uDDF9', own:'Italiano',
       ask:'Scegli la lingua',   ui:false, target:true }
    */
  ];

  function uiLangs(){
    return LANGS.filter(function(l){ return l.ui; });
  }
  function targetLangs(){
    return LANGS.filter(function(l){ return l.target; });
  }

  /* A language's name IN HER LANGUAGE — "Немецкий" once she has chosen
     Russian, not "Deutsch". Screen one is the only place a language names
     itself; after that she is being spoken to and should be spoken to
     properly. Falls back to the native name, which is wrong but readable. */
  function named(l){
    var k = t('lgName_' + l.code);
    return (k && k !== 'lgName_' + l.code) ? k : l.own;
  }

  function langButton(row, l, label, on, fn){
    var b = el('button', 'wc-lang' + (on ? ' is-on' : ''));
    b.type = 'button';
    b.appendChild(el('span', 'wc-flag', l.flag));
    b.appendChild(el('span', 'wc-lang-t', label));
    b.addEventListener('click', fn);
    row.appendChild(b);
    return b;
  }

  /* ---------- 1. the language she already understands ---------- */

  function askLanguage(){
    step = 0;
    paint(function(card){
      /* The heading is the question in every interface language at once,
         because she cannot read any single one of them yet.

         NOT from i18n. `t()` resolves in whatever language is currently
         active, so `t('wcPickLang_de')` while English is loaded returns the
         key itself — the exact bug this line had. These three strings must
         each appear in THEIR OWN language regardless of what is loaded, so
         they live beside the table they belong to. */
      card.appendChild(el('p', 'wc-neutral',
        uiLangs().map(function(l){ return l.ask; })
                 .filter(Boolean).join(' \u00B7 ')));

      var row = el('div', 'wc-langs');
      uiLangs().forEach(function(l){
        langButton(row, l, l.own,
          GH.i18n && GH.i18n.lang() === l.code,
          function(){
            if (GH.i18n && GH.i18n.set) GH.i18n.set(l.code);
            askTarget();
          });
      });
      card.appendChild(row);
    });
  }

  /* ---------- 2. what she wants to learn, in her language ---------- */

  function askTarget(){
    step = 1;
    var list = targetLangs();
    paint(function(card){
      card.appendChild(el('h2', 'wc-head', t('wcLearnHead')));

      var row = el('div', 'wc-langs');
      list.forEach(function(l){
        langButton(row, l, named(l), current('gh-target', 'de') === l.code,
          function(){
            try { window.localStorage.setItem('gh-target', l.code); } catch (e){}
            askName();
          });
      });
      card.appendChild(row);

      /* Only worth saying while there is one. It explains the screen
         rather than apologising for it. */
      if (list.length === 1){
        card.appendChild(el('p', 'wc-note', t('wcLearnOnly')));
      }

      var acts = el('div', 'wc-acts');
      button(acts, t('back'), 'ghost', askLanguage);
      card.appendChild(acts);
    });
  }

  function current(key, dflt){
    try { return window.localStorage.getItem(key) || dflt; }
    catch (e){ return dflt; }
  }

  /* ---------- 3. what to call her ---------- */

  /* Not a full name. What the pets and the coach will say out loud, which
     is a different thing and a much smaller ask. */
  var heldName = '';

  function askName(){
    step = 2;
    paint(function(card){
      card.appendChild(el('h2', 'wc-head', t('wcNameHead')));
      card.appendChild(el('p', 'wc-note', t('wcNameNote')));

      var input = document.createElement('input');
      input.className = 'wc-input';
      input.type = 'text';
      input.setAttribute('autocomplete', 'given-name');
      input.setAttribute('placeholder', t('wcNamePlaceholder'));
      input.value = heldName || (function(){
        try {
          var p = GH.player && GH.player.current && GH.player.current();
          return (p && p.name) || '';
        } catch (e){ return ''; }
      })();
      card.appendChild(input);

      var acts = el('div', 'wc-acts');
      button(acts, t('wcNext'), 'primary', function(){
        heldName = (input.value || '').trim();
        askForms();
      });
      button(acts, t('back'), 'ghost', askTarget);
      card.appendChild(acts);

      input.addEventListener('keydown', function(e){
        if (e.key === 'Enter'){
          e.preventDefault();
          heldName = (input.value || '').trim();
          askForms();
        }
      });
      try { input.focus(); } catch (e){}
    });
  }

  /* ---------- 4. which grammatical forms ---------- */

  /* NOT a demographic question, and it is phrased so she can tell.

     German makes this grammar: what a pet calls her, how an adjective
     agrees, which past participle the coach uses. Asking "are you a woman"
     would be asking something the app has no business knowing; asking which
     forms to use is asking the only thing it actually needs.

     "Neither" is a real answer, not a way out. The app already handles an
     empty value everywhere. */
  function askForms(){
    step = 3;
    var g = (function(){
      try { return GH.player.gender(); } catch (e){ return ''; }
    })();

    paint(function(card){
      card.appendChild(el('h2', 'wc-head', t('wcFormsHead')));
      card.appendChild(el('p', 'wc-note', t('wcFormsNote')));

      var row = el('div', 'wc-genders');
      [['f','wcFormsF'], ['m','wcFormsM'], ['','wcFormsNone']].forEach(function(pair){
        var b = el('button', 'wc-gender' + (g === pair[0] ? ' is-on' : ''),
                   t(pair[1]));
        b.type = 'button';
        b.addEventListener('click', function(){
          g = pair[0];
          var all = row.childNodes, i;
          for (i = 0; i < all.length; i++){
            all[i].className = all[i].className.replace(/\s*is-on\b/, '');
          }
          b.className += ' is-on';
        });
        row.appendChild(b);
      });
      card.appendChild(row);

      var acts = el('div', 'wc-acts');
      button(acts, t('wcStart'), 'primary', function(){ finish(heldName, g); });
      button(acts, t('back'), 'ghost', askName);
      card.appendChild(acts);
    });
  }

  function finish(name, g){
    try {
      var id = GH.player.id();
      if (name && GH.player.rename) GH.player.rename(id, name);
      if (GH.player.setGender) GH.player.setGender(id, g || '');
    } catch (e){}
    mark();
    close();
    /* Hand straight to Waddles. She has just told the app her name; the
       first thing that happens should be someone using it. */
    if (done) done();
  }

  /* ---------- entry ---------- */

  /* Returns true if it took over the screen, so the caller knows whether to
     carry on with whatever it was going to do. */
  function open(then){
    if (!due()) return false;
    done = then || null;
    askLanguage();
    return true;
  }

  /* For testing without clearing storage by hand. */
  function reset(){
    try { window.localStorage.removeItem(KEY); } catch (e){}
  }

  return { open:open, due:due, reset:reset };
})();
