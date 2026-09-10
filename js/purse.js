/* js/purse.js */
/* The balance, in the header, as the door to the store.

   It used to sit in the hub body: visible on one screen out of thirty, and
   not tappable. So the only reliable way into the store was the tile in the
   Reference row, which is a leftover doorway rather than the real one.

   The real doorway is the moment after an exercise when she is paid, and
   that repeats and cannot be missed. This covers the remaining case —
   wanting to spend without finishing a lesson first.

   ------------------------------------------------------------------
   THE BALANCE IS THE DOORKNOB

   Not a "Store" button with a number beside it. The number itself is what
   she taps, because the number is what makes her want to. A count sitting
   there unspent is its own small pull, and putting a label on it would turn
   a temptation into a menu item.

   ------------------------------------------------------------------
   IT DOES NOT APPEAR UNTIL SHE HAS EARNED SOMETHING

   `lifetime()` of zero means she has never finished an exercise, so a
   balance of nought in the header is a reminder of what she has not done.
   It arrives the first time it has a number worth reading — which is also
   the first time the coin sequence in the tour has anything to point at.

   ------------------------------------------------------------------
   REFRESHING

   Nothing in the app broadcasts a change to the purse, and the header is
   built once. So `refresh()` is exported and called by the end screen after
   a payout and by the store after a purchase. Cheap: it writes one string.

   The count animates from the old value to the new one when it grows, so
   being paid is visible from anywhere on the page rather than only on the
   end screen. It does not animate downwards — watching a purchase drain
   the counter is a punishment for spending. */

window.GH = window.GH || {};

GH.purse = (function(){

  var bar = null;
  var shown = null;          /* the number currently on screen */

  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }

  function balance(){
    return (GH.coins && GH.coins.balance) ? GH.coins.balance() : 0;
  }

  function earned(){
    return (GH.coins && GH.coins.lifetime) ? GH.coins.lifetime() : 0;
  }

  function build(){
    var host = document.querySelector('.topbar-controls');
    if (!host) return;
    bar = document.createElement('button');
    bar.type = 'button';
    bar.className = 'purse';
    bar.setAttribute('aria-label', t('stStore'));
    bar.setAttribute('aria-haspopup', 'true');
    bar.setAttribute('aria-expanded', 'false');
    bar.addEventListener('click', openPop);
    /* First in the controls row, so it reads before the theme and language
       pickers — it is the only one of the three she has a reason to press
       rather than set once. */
    if (host.firstChild) host.insertBefore(bar, host.firstChild);
    else host.appendChild(bar);
    refresh();
  }

  function paint(n){
    bar.textContent = '';
    /* The currency's mark comes from coins.js now, not a character
       written out here — see the note there. Falls back to the old glyph
       until the SVG exists, so this looks the same today. */
    var d = (GH.coins && GH.coins.mark) ? GH.coins.mark('purse-mark')
          : (function(){ var x = document.createElement('span');
                         x.className = 'purse-mark';
                         x.textContent = '\u25c8'; return x; })();
    bar.appendChild(d);
    var num = document.createElement('span');
    num.className = 'purse-n';
    num.textContent = String(n);
    bar.appendChild(num);
  }

  function refresh(){
    if (!bar) return;
    if (!earned()){ bar.style.display = 'none'; return; }
    bar.style.display = '';

    var now = balance();
    if (shown === null || now <= shown){ shown = now; paint(now); return; }

    /* Count up. Twelve steps whatever the size of the rise, so a hundred
       and a thousand take the same time — the point is that she notices,
       not that she can read every intermediate number. */
    var from = shown, to = now, step = 0;
    shown = now;
    /* `classList`, NOT `className =`. Assigning the whole string wipes
       every other class on the button, and the tour puts one there: the
       Quick Tour's crystal step highlights `.purse` with `bt-lit`, and the
       same step carries the 10-crystal gift. So highlight ran, then this
       count-up finished ~540ms later and silently stripped the outline —
       leaving a step that says "tap the highlighted button" with nothing
       highlighted. Steven, 08 Sep. */
    bar.classList.add('is-up');
    var tick = window.setInterval(function(){
      step++;
      if (step >= 12){
        window.clearInterval(tick);
        paint(to);
        bar.classList.remove('is-up');
        return;
      }
      paint(Math.round(from + (to - from) * (step / 12)));
    }, 45);
  }

  /* ---------- THE BALANCE OPENS A PANEL, NOT A SCREEN ----------

     Steven: "I don't want it to bounce you out of a part of the site by
     pressing on it. I'd like it to be a pop-up with a little button that
     says go to Crystals."

     THE PROBLEM WITH NAVIGATING. The balance sits in the HEADER, so it is
     on every screen in the app — including the middle of a round. Opening
     a screen from it means `GH.app.play()`, and that clears the view: a
     tap mid-round threw the round away. Worse, the tap is easy to make by
     accident, because the number is the thing that catches the eye.

     So it opens a panel over the page instead. The panel says what she
     has and offers the way on; nothing is destroyed until she asks for
     it. Same shape the pet grid uses, and for the same reason its own
     file gives: "it must not throw away a round to open."

     THE PANEL CANNOT BE CLIPPED. `GH.nav.clampPanel` measures it against
     the viewport and pulls it inside both edges — the same clamp the
     theme picker uses, after that one shipped broken off both sides on
     separate occasions. The purse is the leftmost control, so its panel
     would otherwise hang off the right on a narrow phone.

     Escape, a tap outside, and a second tap on the balance all close it.
     Nothing about the page behind it changes. */

  var pop = null;

  function closePop(){
    if (pop && pop.parentNode) pop.parentNode.removeChild(pop);
    pop = null;
    if (bar) bar.setAttribute('aria-expanded', 'false');
  }

  function isOpen(){ return !!pop; }

  /* Steven supplied de/ru for `go` on 08 Sep, because the Quick Tour now
     has a step that tells her to press this button BY NAME — an English
     label under a Russian instruction would be a dead end. `have` and
     `note` are still waiting for him and fall back to English via
     `pick()`. Kept here rather than in i18n.js so the whole panel's text
     is one block to translate. */
  var TXT = {
    have:  { en:'You have', de:'', ru:'' },
    go:    { en:'Go to Crystals', de:'Zu den Kristallen', ru:'К кристаллам' },
    /* Steven, 10 Sep: a second way out of this panel, straight to the
       Store. Crystals are earned in one place and spent in another, and
       this panel is where she looks at the balance — so it should offer
       both. German and Russian are mine and want checking. */
    shop:  { en:'Pet Store', de:'Tierladen', ru:'Магазин питомцев' },
    note:  { en:'Earn more by learning around the site.', de:'', ru:'' }
  };

  function pick(o){
    if (!o) return '';
    var l = GH.i18n ? GH.i18n.lang() : 'en';
    return o[l] || o.en || '';
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function openPop(){
    if (pop){ closePop(); return; }
    if (!bar) return;

    var host = document.querySelector('.topbar-controls');
    if (!host) return;

    pop = el('div', 'purse-pop');
    pop.setAttribute('role', 'dialog');

    var big = el('div', 'purse-pop-n');
    if (GH.coins && GH.coins.markWith) big.appendChild(GH.coins.markWith(balance()));
    else big.textContent = String(balance());
    pop.appendChild(big);
    pop.appendChild(el('p', 'purse-pop-l', pick(TXT.have)));

    var go = el('button', 'btn btn-primary purse-pop-go', pick(TXT.go));
    go.type = 'button';
    go.addEventListener('click', function(){
      closePop();
      if (!GH.app || !GH.app.play) return;
      GH.speech && GH.speech.stop();
      if (GH.crystals && GH.crystals.open){
        GH.app.play({ id:'crystals', open:GH.crystals.open });
      } else if (GH.store){
        GH.app.play({ id:'store', open:GH.store.open });
      }
    });
    pop.appendChild(go);

    /* WHERE THE CRYSTALS GET SPENT. The button above goes to the place
       that EXPLAINS them; this one goes to the place that takes them.

       `btn-ghost` rather than a second primary: looking at your balance
       is usually curiosity, and two equally loud buttons would make the
       panel an ultimatum. */
    if (GH.store && GH.store.open){
      var shop = el('button', 'btn btn-ghost purse-pop-shop', pick(TXT.shop));
      shop.type = 'button';
      shop.addEventListener('click', function(){
        closePop();
        if (!GH.app || !GH.app.play) return;
        GH.speech && GH.speech.stop();
        GH.app.play({ id:'store', open:GH.store.open });
      });
      pop.appendChild(shop);
    }

    pop.appendChild(el('p', 'purse-pop-note', pick(TXT.note)));

    /* Inside the controls row so the clamp has a positioned parent to
       measure against, and so it travels with the header. */
    host.appendChild(pop);
    bar.setAttribute('aria-expanded', 'true');

    if (GH.nav && GH.nav.clampPanel) GH.nav.clampPanel(pop, bar, host);
    if (go.focus) try { go.focus({ preventScroll:true }); } catch (e){ go.focus(); }
  }

  /* A tap anywhere else closes it. Registered once, and it checks the
     purse itself too so the tap that opened it does not also close it. */
  document.addEventListener('click', function(e){
    if (!pop) return;
    if (pop.contains(e.target)) return;
    if (bar && bar.contains(e.target)) return;
    closePop();
  });

  /* Escape closes the panel and NOTHING else. Capture and
     stopImmediatePropagation for the reason lightbox.js gives: nav.js
     also listens for Escape on `document`, and without this the panel
     would close AND the screen behind it would leave. */
  document.addEventListener('keydown', function(e){
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    if (!pop) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    closePop();
  }, true);

  /* Kept exported under its old name: the tour and the end screen both
     call `GH.purse.open()`, and they mean "show her the crystals", which
     is now the panel. */
  function open(){ openPop(); }

  window.addEventListener('resize', function(){
    if (pop && GH.nav && GH.nav.clampPanel){
      var host = document.querySelector('.topbar-controls');
      if (host) GH.nav.clampPanel(pop, bar, host);
    }
  });

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  return { refresh:refresh, open:open, build:build,
           close:closePop, isOpen:isOpen };
})();
