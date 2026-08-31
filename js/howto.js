/* How to play — one overlay, shared by every game.

   Each game names a key prefix and the module collects prefix + 1, 2, 3…
   until a key is missing, so adding or removing a rule line is an i18n
   edit rather than a code change. The text follows the interface language
   like everything else, which matters here more than anywhere: rules she
   cannot read are worse than no rules.

   Opens over the page rather than replacing it, so she can check the rules
   mid-round without losing her place. Escape, the backdrop and the close
   button all dismiss it, and focus returns to the button that opened it. */

window.GH = window.GH || {};

GH.howto = (function(){

  var overlay = null;
  var lastFocus = null;

  function t(k){ return GH.i18n.t(k); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* prefix + 1, 2, 3 … until one is missing */
  function lines(prefix){
    var out = [], i = 1;
    while (i < 20){
      var key = prefix + i;
      var s = GH.i18n.t(key);
      if (s === key) break;          /* t() returns the key when unset */
      out.push(s);
      i++;
    }
    return out;
  }

  function close(){
    if (!overlay) return;
    overlay.className = 'howto-overlay';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  function ensure(){
    if (overlay) return overlay;
    overlay = el('div', 'howto-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) close();
    });
    /* Same trap as lightbox.js, and worse: this did not check whether the
       overlay was open at all, so Escape on any game screen closed a
       closed overlay and then let nav.js leave the page.

       stopImmediatePropagation because both handlers are on `document` —
       preventDefault does not stop another listener and stopPropagation
       only stops them on other nodes. Capture so it does not depend on
       howto.js being loaded before nav.js. */
    document.addEventListener('keydown', function(e){
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.key !== 'Escape' && e.key !== 'Esc') return;
      if (overlay.className.indexOf('is-open') < 0) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      close();
    }, true);
    document.body.appendChild(overlay);
    return overlay;
  }

  function open(titleKey, prefix){
    var o = ensure();
    o.textContent = '';

    var box = el('div', 'howto-box');
    var head = el('div', 'howto-head');
    head.appendChild(el('h2', null, t(titleKey)));
    var x = el('button', 'howto-x');
    x.type = 'button';
    x.setAttribute('aria-label', t('close'));
    x.textContent = '✕';
    x.addEventListener('click', close);
    head.appendChild(x);
    box.appendChild(head);

    var list = el('ol', 'howto-list');
    lines(prefix).forEach(function(line){
      list.appendChild(el('li', null, line));
    });
    box.appendChild(list);

    var done = el('button', 'btn btn-primary', t('howtoGot'));
    done.type = 'button';
    done.addEventListener('click', close);
    var acts = el('div', 'done-actions');
    acts.appendChild(done);
    box.appendChild(acts);

    o.appendChild(box);
    o.className = 'howto-overlay is-open';
    done.focus();
  }

  /* Which games she has already had the rules for.

     Kept per profile, because Nazar opening the app for the first time
     should be told how catch-word works even though Tanya has played it
     for weeks. Keyed on the rule prefix rather than the game id: the
     prefix is what actually identifies a set of rules, and it is what
     button() already receives. */
  var SEEN = 'gh-howto-seen';

  function seenKey(){
    return SEEN + ':' + (GH.player ? GH.player.id() : 'solo');
  }

  function seen(prefix){
    try {
      var raw = window.localStorage.getItem(seenKey());
      return !!raw && raw.split(',').indexOf(prefix) >= 0;
    } catch (e){ return true; }   /* cannot remember, so do not nag */
  }

  function markSeen(prefix){
    try {
      var raw = window.localStorage.getItem(seenKey()) || '';
      var list = raw ? raw.split(',') : [];
      if (list.indexOf(prefix) < 0){
        list.push(prefix);
        window.localStorage.setItem(seenKey(), list.join(','));
      }
    } catch (e){}
  }

  /* For anything that wants to offer a game and say whether it is new. */
  function isNew(prefix){ return !seen(prefix); }

  /* The button a game drops onto its level screen.

     The first time she meets a game, the rules open by themselves. A
     learner staring at 'Wo oder wohin?' and four level tiles has no way
     to know what the game asks of her, and the one button that would say
     is the smallest thing on the screen. After that it stays a button and
     never interrupts again. */
  function button(titleKey, prefix){
    var b = el('button', 'howto-btn');
    b.type = 'button';
    b.appendChild(el('span', 'howto-q', '?'));
    b.appendChild(el('span', null, GH.i18n.t('howtoPlay')));
    b.addEventListener('click', function(){
      lastFocus = b;
      open(titleKey, prefix);
    });

    if (!seen(prefix)){
      markSeen(prefix);
      /* after the level screen has painted, so the overlay lands on top of
         a finished page rather than an empty one */
      setTimeout(function(){ open(titleKey, prefix); }, 0);
    }
    return b;
  }

  return { open: open, button: button, isNew: isNew, seen: seen, markSeen: markSeen };
})();
