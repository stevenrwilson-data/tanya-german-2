/* data/butler-script.js */
/* data/butler-script.js

   THIS FILE IS YOURS. Every word the butler says comes from here, and I
   have not written any of them. The shape is set up and annotated; the
   voice is not mine to supply.

   ------------------------------------------------------------------
   03 SEP — THE QUICK TOUR, LOCKED IN ENGLISH

   Every line below is your own text from the GPT draft, placed into the
   engine exactly the way you specced it in the last revision: Waddles
   never teleports her anywhere. He takes her to the edge of a section,
   explains it, and then she presses the REAL control herself — the
   Progress tile, Back, the crystal icon, Back again. By the time he says
   goodbye she has actually used every one of those controls, not just
   been told they exist.

   `{ en:'...', ru:'', de:'' }` on every real line, on purpose — empty
   ru/de is what "not translated yet" looks like in this file, and `say()`
   falls back to English until you fill them in. Nothing to fix here
   before that happens; the tour runs in English for everyone until it
   doesn't.

   TWO THINGS I FILLED IN THAT ARE MINE TO FLAG, NOT YOURS TO HAVE WRITTEN:

     1  bonusGame / bonus:15 on the closing three choices. You wrote "I'll
        give you an extra bonus" with no number. 15 is a guess — half of
        one exercise. Change the number in the three `choices` entries
        below, search for `bonus:15`.

     2  "Full Tour" is missing on purpose. Your script only ever wrote the
        quick one. The offer screen below has ONE tour button plus "Let Me
        Explore" — not the three-button screen 2 from your draft — because
        `due()` only turns a tour into a button once it has steps, and a
        Full Tour with no steps would be a button that does nothing. Add a
        second entry to `tours` below, in the same shape, whenever you
        write it, and the button appears on its own — nothing else changes.

   ------------------------------------------------------------------
   THE HANDS-ON MECHANIC, FOR WHEN YOU EDIT THIS

   A step with `tap:true` lights up a real control and WAITS for her to
   press it — no Next button of its own. `points:'.backlink'` is how a
   step says "and now she presses Back herself"; the tour reappears on
   whatever screen that leaves her on. `points:'#sec-gamesHead'` with no
   `tap` just shows her something without asking her to press it — used
   for the sections that have no button to walk her onto.

   The closing step is a different shape: `choices`, not `line` + Next.
   Each one promises a bonus for FINISHING whatever she lands near — the
   promise survives the trip through `GH.coins.setStarterBonus()` and pays
   itself the next time she finishes a round of the matching kind.

   ------------------------------------------------------------------
   EVERY LINE TAKES EITHER FORM

       line: 'Willkommen.'

       line: { de:'Willkommen.', ru:'Добро пожаловать.', en:'Welcome.' }

   A plain string is used as-is in every language, which is right for a
   name. An object picks by her interface language and falls back to
   English then German if one is missing — so a half-translated script
   still works.
*/

window.GH_BUTLER = {

  /* His name, and his picture. Both optional; without a picture the bubble
     still works and he is just a name. */
  name: 'Waddles',
  portrait: 'images/pets/waddles.webp',

  /* The corner perch button (js/butler.js, perch()) is 30x40 — the full
     standing portrait above, shrunk that far down and cropped to `contain`,
     reads as a smudge more than a face. `perchFace` is a separate, tighter
     close-up crop meant specifically for that size; falls back to
     `portrait` when not set, so leaving this blank is a normal state, not
     a broken one. */
  perchFace: '',

  /* Button labels used throughout a tour. */
  nextLabel: 'Continue',
  doneLabel: 'Off you go',
  stopLabel: "That's enough for now",
  perchLabel: 'Bring Waddles back',

  /* ------------------------------------------------------------------
     THE FIRST THING SHE EVER SEES

     Two screens, per your revision: a short hello with one button, THEN
     the real question. `hello` is optional — leave it empty and the
     offer opens straight on `line`, which is how this behaved before
     today. */
  offer: {
    hello: { en:'Ah, there you are. Welcome! I’m Waddles. It’s my job to help you get settled in.', ru:'', de:'' },
    helloOk: { en:'Hi, Waddles!', ru:'', de:'' },

    line: { en:'Lovely to meet you.\n\nThere’s quite a lot to see around here. I’d be happy to show you around—or, if you prefer, you may explore on your own.\n\nWhat shall we do?', ru:'', de:'' },
    no:   { en:'Let Me Explore', ru:'', de:'' }      /* "No tour" */
  },

  /* ------------------------------------------------------------------
     SHE SAID NO. ONE FOLLOW-UP, THEN NEVER AGAIN.

     Left empty on purpose — you have not written a refusal line, and an
     invented one is worse than none. Empty here means the refusal is
     simply final, no follow-up asked, which the engine already handles. */
  refuse: {
    line: '',
    yes:  '',     /* "Yes, come back later" */
    no:   ''      /* "No, I will find you if I need you" */
  },

  /* ------------------------------------------------------------------
     THE TOURS */
  tours: [
    {
      id: 'quick',
      label: { en:'Quick Tour', ru:'', de:'' },
      /* Never reached — the tour ends on a `choices` step, which closes
         itself. Kept filled in anyway as a safety net for any tour that
         ends the ordinary way. */
      finish: { en:'Off you go', ru:'', de:'' },
      go: 'hub',

      steps: [
        /* ---------- 1. the table of contents ---------- */
        { line: { en:'Excellent choice. We’ll keep this brief.\n\nFirst, let me show you the Table of Contents. From here, you can jump directly to any part of the site without all that tiresome scrolling.\n\nYou’ll also find a short description of what’s waiting for you in each section.', ru:'', de:'' },
          points: '.jumpbar' },

        /* ---------- 2. progress ---------- */
        { line: { en:'Next, we have your Progress.\n\nIt keeps track of what you’ve been working on — what’s settled in, and what’s still due for another look.', ru:'', de:'' },
          points: '[data-tile="progress-view"]', tap: true },

        { line: { en:'Have a look around, then use the Back button when you’re ready. I’ll be waiting for you.', ru:'', de:'' },
          points: '.backlink', tap: true },

        /* ---------- 3. achievements ---------- */
        { line: { en:'And here are your Achievements. They’re earned as you learn, practise, and explore the site — and some of them come with rewards. I’m rather fond of those.', ru:'', de:'' },
          points: '[data-tile="awards-view"]', tap: true },

        { line: { en:'Have a look, then tap Back when you’re ready.', ru:'', de:'' },
          points: '.backlink', tap: true },

        /* ---------- 4. games ---------- */
        { line: { en:'And here are the games. They’re another way to practise what you’re learning — and there are quite a few to choose from.', ru:'', de:'' },
          points: '#sec-gamesHead' },

        { line: { en:'If you’d like, I can explain what each game does.', ru:'', de:'' },
          points: '.gd-open', tap: true },

        { line: { en:'Have a look through, then tap Back when you’re ready.', ru:'', de:'' },
          points: '.backlink', tap: true },

        /* ---------- 5. currency, demonstrated ---------- */
        { line: { en:'Ah. Now we come to something important.\n\nCompleting games, exercises, and other activities earns you crystals. Most activities are worth ten, while some of the more challenging ones are worth even more.\n\nYou shouldn’t have to begin completely empty-handed, of course. Here — ten crystals, on me.\n\nYou’ll always find your balance at the top of the screen. Go ahead — tap the crystal icon now. Let’s see where it takes us.', ru:'', de:'' },
          points: '.purse', tap: true, gift: 10 },

        /* ---------- 6. the store, pets ---------- */
        { line: { en:'Ah, the store.\n\nThis is where you can spend the crystals you earn from learning and playing.\n\nOnce you’ve been active for a few days, you’ll be able to adopt a pet. More unusual pets take a little longer to unlock.\n\nApparently, one of them may eventually take my place.\n\nI have chosen not to dwell on this.\n\nHave a look around. When you’re finished, use the Back button to return.', ru:'', de:'' },
          points: '.backlink', tap: true },

        /* ---------- 7. back at the top, and a real choice ---------- */
        { line: { en:'And that concludes our quick tour.\n\nYou’re ready to start practising. Complete five activities in a day and it counts as a full day of learning — and you’ll earn a bonus.\n\nBut since you’ve been such an attentive guest, I have one more offer.\n\nChoose where you’d like to begin below. Finish it, and I’ll give you an extra bonus.', ru:'', de:'' },
          choices: [
            { label: { en:'Learn Some Words', ru:'', de:'' },
              sel: '#sec-vocabHead', bonusGame: 'vocab', bonus: 15 },
            { label: { en:'Play a Game', ru:'', de:'' },
              sel: '#sec-gamesHead', bonusGame: null, bonus: 15 },
            { label: { en:'Read a Short Story', ru:'', de:'' },
              go: 'reader', bonusGame: 'reader', bonus: 15 }
          ]
        }
      ]
    },

    /* Written but empty — see the note at the top of this file. Add
       `steps` here and the button appears on the offer screen on its
       own; nothing else in the app needs to change. */
    {
      id: 'full',
      label: { en:'Full Tour', ru:'', de:'' },
      steps: []
    }
  ],

  /* ------------------------------------------------------------------
     HANDING OVER TO A PET

     Not written yet. A pet with no line here simply does not speak —
     the handover still happens, silently, the first time she buys one. */
  handover: {

    first: {
      butler: '',        /* screen 1: Waddles steps down */
      ok:     '',        /* the button */
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    leave: {
      head: '',
      ok:   '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    'switch': {
      ok: '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    }
  }

};
