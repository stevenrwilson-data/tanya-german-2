/* js/devtools.js */
/* THE TWO DEV CONTROLS, IN A FILE THAT CAN BE DELETED.

   Steven: "want to test all pets and then pull out dev tools off
   settings — I would like that to work by adding or removing a file so I
   can put it back in."

   So that is exactly what this is. Both controls used to be written
   inline in js/activities/settings.js, which meant removing them for
   Tanya was an edit to a 598-line file and putting them back was the
   same edit in reverse, from memory. Now:

     TO REMOVE THEM   delete this file
     TO PUT THEM BACK put it back

   Nothing else changes either way. `settings.js` calls `mount()` behind
   `if (GH.devtools)`, so with the file gone the Settings screen simply
   draws the next section. No error, no gap, no placeholder.

   WHAT IS AND IS NOT IN HERE. Steven's definition, verbatim: "Dev tools
   are just parts of settings that turn off pet restrictions and add
   coins." So two things only:

     1. the pet gate bypass (GH.store.setGod)
     2. the crystal grant buttons

   Everything else that lives under the same heading in Settings STAYS
   THERE and is not a dev tool:

     - the English prompts toggle. Useful for checking a mechanic without
       reading German, but it is a real preference, not a bypass.
     - Reset progress. A learner starting over is a genuine feature.
     - See the onboarding again.
     - Wipe everything on this device. That is a privacy control.

   THE HEADING IS NOT IN HERE EITHER, and that is deliberate rather than
   an oversight: `stTestHead`/`stTestNote` sit above the English prompts
   toggle in settings.js, so pulling them in here would leave that toggle
   under no heading at all. Consequence worth knowing: `stTestNote` reads
   "Give yourself crystals so the store can be looked at..." in all three
   languages, which describes buttons that are absent once this file is.
   Flagged for Steven, not silently rewritten.

   NO STATE OF ITS OWN. `god` lives in store.js and the balance lives in
   coins.js, so deleting this file removes the way to SET them and
   changes nothing that is already set. A profile left in god mode stays
   in god mode — turn it off before pulling the file, or turn it off from
   the console with GH.store.setGod(false). */

window.GH = window.GH || {};

GH.devtools = (function(){

  function t(k, v){ return GH.i18n ? GH.i18n.t(k, v) : k; }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  /* `card` is the container settings.js is building; `repaint` is its own
     paint(), so a toggle here redraws the whole screen exactly as it did
     when this code lived there. Same classes (`pk-row`, `pk-toggle`,
     `st-warn st-test`), so nothing in css/style.css needs to know this
     moved. */
  function mount(card, repaint){
    if (!card) return;

    /* Every pet above common is gated on consecutive full days — ninety
       for a legendary, a hundred and fifty for Ember. Crystals alone will
       not open the shelf, so without this the store cannot be looked at
       for five months. */
    if (GH.store && GH.store.setGod){
      var godOn = GH.store.god();
      var godRow = el('div', 'pk-row' + (godOn ? ' is-on' : ''));
      var godBtn = el('button', 'pk-toggle');
      godBtn.type = 'button';
      godBtn.appendChild(el('span', 'pk-mark', godOn ? '\u2713' : ''));
      var godBody = el('span', 'pk-body');
      godBody.appendChild(el('span', 'pk-name', t('stGodMode')));
      godBody.appendChild(el('span', 'pk-sub', t('stGodNote')));
      godBtn.appendChild(godBody);
      godBtn.addEventListener('click', function(){
        GH.store.setGod(!GH.store.god());
        if (repaint) repaint();
      });
      godRow.appendChild(godBtn);
      card.appendChild(godRow);
    }

    /* Eighty thousand covers everything including Ember and both slots,
       which is the only amount that lets the whole shelf be checked. */
    if (GH.coins && GH.coins.earn){
      var giveRow = el('div', 'st-warn st-test');
      [1500, 10000, 80000].forEach(function(n){
        var g = el('button', 'btn btn-ghost', '\u25c8 +' + n);
        g.type = 'button';
        g.addEventListener('click', function(){
          GH.coins.earn(n, 'testing');
          if (repaint) repaint();
        });
        giveRow.appendChild(g);
      });
      card.appendChild(giveRow);
    }
  }

  return { mount:mount };
})();
