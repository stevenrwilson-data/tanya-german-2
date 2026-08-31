/* The butler's script.

   THIS FILE IS YOURS. Every word the butler says comes from here, and I
   have not written any of them. The shape is set up and annotated; the
   voice is not mine to supply.

   ------------------------------------------------------------------
   IT DOES NOTHING UNTIL YOU FILL IT IN

   `offer` absent or empty means the butler never appears. That is the
   current state and it is not an error — nothing breaks, nothing shows a
   placeholder, and the site behaves exactly as it did before.

   So you can write one tour, or the short one first and the full one later,
   and each becomes live the moment it has lines.

   ------------------------------------------------------------------
   EVERY LINE TAKES EITHER FORM

       line: 'Willkommen.'

       line: { de:'Willkommen.', ru:'Добро пожаловать.', en:'Welcome.' }

   A plain string is used as-is in every language, which is right for a
   name. An object picks by her interface language and falls back to English
   then German if one is missing — so a half-translated script still works.

   ------------------------------------------------------------------
   A STEP

       { line:  what he says
         points: OPTIONAL — a CSS selector for something on the page to
                 light up while this step is showing. `.purse` for the coin
                 counter, `#sec-gamesHead` for the games section, and so on.
                 Leave it out and the step is just words.
         gift:   OPTIONAL — a number of Kronen to pay her, once ever.
                 The header counter counts up in front of her, so earning
                 becomes something she watched rather than read. }

   `go` on a tour names where to send her when it ends: an activity id, or
   `'hub'`. A tour that ends where it started has shown her a map and given
   her nothing to do.

   ------------------------------------------------------------------
   WHAT THE SHORT TOUR WAS SPECCED TO COVER

   From the design conversation, in order — the content is decided, only the
   wording is missing:

     the four core sections, and what is in each
     the games section, properly
     mentioned only, no navigation:
        the filters at the top · the vocabulary list ·
        the grammar section · the pet store
     the coin sequence, DEMONSTRATED:
        1  exercises earn coins
        2  he gifts about ten, and the counter visibly moves
        3  five exercises in a day earns a bonus
        4  the balance at the top is the way into the store —
           and she taps it once, here, rather than being told
     end by dropping her into the first section, not back at the hub

   ------------------------------------------------------------------
   THE THREE ANSWERS ARE ALL REAL

   `never` means never. He does not come back on his own, because an offer
   that returns after being refused is a nag. But he leaves a perch in the
   header and says so, so she can always fetch him.

   ------------------------------------------------------------------
   THE HANDOVER

   The first time she buys a pet, the butler resigns and the pet takes the
   role. `{name}` in the pet's line is filled with the pet's name.

   It makes a purchase read as a promotion, and teaches in one moment that
   pets are guides rather than ornaments.
*/

window.GH_BUTLER = {

  /* His name, and his picture. Both optional; without a picture the bubble
     still works and he is just a name. */
  name: '',
  portrait: '',

  /* Button labels used throughout a tour. */
  nextLabel: '',
  doneLabel: '',
  stopLabel: '',
  perchLabel: '',

  /* ------------------------------------------------------------------
     THE FIRST THING SHE EVER SEES

     `line` empty means he never appears. That is the current state and it
     is not an error — nothing breaks and nothing shows a placeholder.

     THE TOURS BELOW ARE THE ANSWERS. Every tour with steps in it becomes a
     button here, labelled with its own `label`. `no` is the last button.
     Nothing needs to be listed twice: write a third tour and a third
     button appears. */
  offer: {
    line: '',
    no:   ''      /* "No tour" */
  },

  /* ------------------------------------------------------------------
     SHE SAID NO. ONE FOLLOW-UP, THEN NEVER AGAIN.

     "Shall I come back later?" is the only question worth asking after a
     refusal, because the two answers are genuinely different — one is not
     now, the other is not ever. Asking anything else, or asking twice,
     turns a butler into a pop-up.

     `yes` leaves him owed, so he offers again on her next visit.
     `no` means never on his own again.

     BOTH end with him on the perch in the header, glowing for a couple of
     seconds so she sees where he went. Refusing him is never the same as
     losing him.

     Leave `line` empty and a refusal is simply final, with no follow-up
     asked. Better than inventing a question. */
  refuse: {
    line: '',
    yes:  '',     /* "Yes, come back later" */
    no:   ''      /* "No, I will find you if I need you" */
  },

  /* ------------------------------------------------------------------
     THE TOURS

     One entry each. `label` is the button in the offer, so it has to read
     as an answer: "Show me everything", "Just the basics".

     A STEP:

       { line:   what he says
         points: OPTIONAL - a CSS selector to light up and scroll to
         tap:    OPTIONAL - with `points`, she must PRESS that thing to go
                 on. No Next button. The app does whatever that control
                 normally does and the tour reappears on the new screen.
         go:     OPTIONAL - an activity id, or 'hub'. The step takes her
                 there itself, for places with no obvious button to press.
         gift:   OPTIONAL - Kronen to pay her, once ever. The header
                 counter moves in front of her. }

     `go` on the TOUR names where to leave her at the end. A tour that ends
     where it started has shown her a map and given her nothing to do. */
  tours: [
    // {
    //   label:  'Show me everything',
    //   go:     'hub',
    //   finish: 'That is everything.',
    //   steps: [
    //     { line: 'This is where you start.' },
    //     { line: 'Your coins live up here.', points: '.co-purse', tap: true },
    //     { line: 'Here is one for you.', gift: 10 }
    //   ]
    // }
  ],

  /* ------------------------------------------------------------------
     HANDING OVER TO A PET

     TWO SCREENS, not one panel. He speaks and fades; the pet appears and
     speaks. A purchase reads as a promotion rather than a notice.

     `first` is the butler stepping down when she buys her FIRST pet.
     `switch` is one pet replacing another, where he is long gone.

     `pets` is keyed by pet id, p01 to p16:

       p01 Flippy      p05 Bun Bun     p09 Olivia    p13 Mimi
       p02 Squeaky     p06 Bandito     p10 Wing Chung p14 Daisy
       p03 Max         p07 Cooper      p11 Luna      p15 Noir
       p04 Quack Quack p08 Henry       p12 Alisa     p16 Ember

     {name} is HER name, whatever she signed up as.
     {pet}  is the pet's own name.

     A pet with no line here simply does not speak. */
  handover: {

    first: {
      butler: '',        /* screen 1: Waddles steps down */
      ok:     '',        /* the button */
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    /* ------------------------------------------------------------------
       THE PET BEING PUT DOWN SAYS GOODBYE

       Shown BEFORE the arriving pet, so a swap is three screens: the one
       leaving, then the one arriving.

       This fires when she PICKS a pet and the slots are full — not when she
       buys one. Buying only fills an empty slot; a new pet with no room is
       owned and silent until she chooses it.

       `head` is the line above, with {pet} filled in:
          '{pet} is returning to the store to wait for you…'

       {name} is HER name. {pet} is the departing pet's own name. */
    leave: {
      head: '',
      ok:   '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    'switch': {
      /* No screen 1 here: the arriving pet does the acknowledging, so
         nobody has to speak for the pet being replaced. */
      ok: '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    }
  }

};
