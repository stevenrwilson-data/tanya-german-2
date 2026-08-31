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
    bar.addEventListener('click', open);
    /* First in the controls row, so it reads before the theme and language
       pickers — it is the only one of the three she has a reason to press
       rather than set once. */
    if (host.firstChild) host.insertBefore(bar, host.firstChild);
    else host.appendChild(bar);
    refresh();
  }

  function paint(n){
    bar.textContent = '';
    var d = document.createElement('span');
    d.className = 'purse-mark';
    d.textContent = '\u25c8';
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
    bar.className = 'purse is-up';
    var tick = window.setInterval(function(){
      step++;
      if (step >= 12){
        window.clearInterval(tick);
        paint(to);
        bar.className = 'purse';
        return;
      }
      paint(Math.round(from + (to - from) * (step / 12)));
    }, 45);
  }

  function open(){
    if (!GH.app || !GH.app.play || !GH.store) return;
    GH.speech && GH.speech.stop();
    GH.app.play({ id:'store', open:GH.store.open });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }

  return { refresh:refresh, open:open, build:build };
})();
