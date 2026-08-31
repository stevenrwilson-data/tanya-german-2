/* The pets.

   Sixteen companions: five common, four rare, three epic, four legendary.

   Each has a name and a German word it is. The name is the character —
   Noir the Black Panther Ninja, Daisy the Lucky Dragon — and the word is
   the teaching. Flippy is a Frosch, and after a fortnight of choosing
   Flippy to cheer at the end of rounds, Frosch is a word she owns rather
   than one she revised.

   Five of the fifteen she already knows from the animal sheets: Hund,
   Katze, Ente, Fuchs, Kaninchen. The other ten arrive as new vocabulary
   attached to something she wanted, which is the best way for a word to
   arrive.

   The articles land at nine der, four die, two das — lopsided, but that is
   German rather than an arrangement, and the collection rehearses the
   gender she keeps getting wrong either way.

   cost   Kronen to buy it. Legendary ones have none.
   need   a gate with two halves, both counted in days where five
          exercises were finished:

            run   the longest run she has ever managed. Banked, so illness
                  at day eighty-nine does not destroy three months.
            now   the run she is on today. Not banked, and it resets.

                        run   now
            common        3     —
            rare          7     3
            epic         30     7
            legendary    90    30
            Ember       150    30

          The two halves ask different questions. `run` asks whether she
          has ever sustained this, and once answered it stays answered.
          `now` asks whether she is sustaining it at the moment of buying,
          which closes the hole where somebody disappears for three months
          and comes back to spend saved Kronen on the rarest thing in the
          app.

          So a legendary needs three months reached at some point, and a
          month in hand right now. Coming back after a long gap means
          rebuilding the month before the shelf opens again — the pets
          already owned are never taken away, but the next one has to be
          earned from where she actually is.

          A day counts only when five exercises were done. Opening the app
          and answering one question is not a day, which is the whole
          reason the gate exists.

   cost   flat within a tier, so the choice inside a tier is about which
          animal she wants rather than which is cheapest. At 150 Kronen for
          a full day:

            a common      500   three and a half days
            a rare      1,500   ten days
            an epic     3,000   twenty days
            a legendary 9,000   sixty days
            Ember      15,000   a hundred

          Note that a common pet costs more than its three-day gate earns,
          so the first pet lands on about day four rather than the moment
          the shelf opens. That is deliberate: the gate says she may, the
          price says not quite yet, and the gap is one more day.
   need   for the legendary three: what must be true before it appears.
          Never bought, only earned. Each asks for a different kind of
          persistence, so none of them is the same grind twice:
            Mimi   collecting  — every buyable pet, every place
            Daisy  staying     — words that survived, over enough days
            Noir   depth       — pets grown and achievements earned
   slug   the filename stem. Two of them do not follow from the name —
          Wing Chung the Panda is wing-chung-panda and Luna the Blue
          Persian is luna-the-kitty — so it is stored rather than derived.
          Pictures live at images/pets/<slug>-<form>-<mood>.webp, where
          form is 1 to 3 and mood is shop, cheer or kind.

          WebP for transparency: a pet with a white box around it cannot
          sit on a coloured card. Missing files fall back to an earlier
          form, then to a glyph, so the store works from the first drawing
          onward. */

window.GH_PETS = {

  /* How many pets turn up at the end of a round.

     The second place costs more than any common pet and the third more
     than any epic one, because two pets together is a different thing from
     one pet twice — and the third is the rarest sight in the app. */
  slots: [
    { n:1, cost:0 },
    { n:2, cost:1500 },
    { n:3, cost:4500 }
  ],

  grow: {
    common:    [120, 260],
    rare:      [240, 520],
    epic:      [450, 950],
    legendary: [500, 1200]
  },

  tiers: [
    { id:'common',    key:'ptCommon'    },
    { id:'rare',      key:'ptRare'      },
    { id:'epic',      key:'ptEpic'      },
    { id:'legendary', key:'ptLegendary' }
  ],

  pets: [
    /* common — three days in a row, and not much else.

       Low enough that it is reached in the first week rather than being a
       wall, but it means the very first pet is a small proof that coming
       back matters, not just that Kronen accumulate. */
    { id:'p01', tier:'common', name:'Flippy the Frog', slug:'flippy-the-frog',
      de:'der Frosch', ru:'жаба', en:'frog',
      cost:500, need:{ run:3 }, art:[] },
    { id:'p02', tier:'common', name:'Squeaky the Bat', slug:'squeaky-the-bat',
      de:'die Fledermaus', ru:'летучая мышь', en:'bat',
      cost:500, need:{ run:3 }, art:[] },
    { id:'p03', tier:'common', name:'Max the Scorpion', slug:'max-the-scorpion',
      de:'der Skorpion', ru:'скорпион', en:'scorpion',
      cost:500, need:{ run:3 }, art:[] },
    { id:'p04', tier:'common', name:'Quack Quack the Duck', slug:'quack-quack-the-duck',
      de:'die Ente', ru:'утка', en:'duck',
      cost:500, need:{ run:3 }, art:[] },
    { id:'p05', tier:'common', name:'Bun Bun the Bunny', slug:'bun-bun-the-bunny',
      de:'das Kaninchen', ru:'кролик', en:'rabbit',
      cost:500, need:{ run:3 }, art:[] },

    /* rare — a week. */
    { id:'p06', tier:'rare', name:'Bandito the Raccoon', slug:'bandito-the-raccoon',
      de:'der Waschbär', ru:'енот', en:'raccoon',
      cost:1500, need:{ now:3, run:7 }, art:[] },
    { id:'p07', tier:'rare', name:'Cooper the Corgi', slug:'cooper-the-corgi',
      de:'der Hund', ru:'собака', en:'dog',
      cost:1500, need:{ now:3, run:7 }, art:[] },
    { id:'p08', tier:'rare', name:'Henry the Hedgehog', slug:'henry-the-hedgehog',
      de:'der Igel', ru:'ёж', en:'hedgehog',
      cost:1500, need:{ now:3, run:7 }, art:[] },
    { id:'p09', tier:'rare', name:'Olivia the Baby Owl', slug:'olivia-the-baby-owl',
      de:'die Eule', ru:'сова', en:'owl',
      cost:1500, need:{ now:3, run:7 }, art:[] },

    /* epic — Kronen and a month of consecutive days.

       Price alone made these a saving-up exercise: three good weeks and
       the shelf was clear. Asking for thirty days in a row as well means
       an epic pet cannot be bought in a burst, and the Kronen are what she
       chooses to spend rather than the whole of what she did. */
    { id:'p10', tier:'epic', name:'Wing Chung the Panda', slug:'wing-chung-panda',
      de:'der Panda', ru:'панда', en:'panda',
      cost:3000, need:{ now:7, run:30 }, art:[] },
    { id:'p11', tier:'epic', name:'Luna the Blue Persian', slug:'luna-the-kitty',
      de:'die Katze', ru:'кошка', en:'cat',
      cost:3000, need:{ now:7, run:30 }, art:[] },
    { id:'p12', tier:'epic', name:'Alisa the Fox', slug:'alisa-the-fox',
      de:'der Fuchs', ru:'лиса', en:'fox',
      cost:3000, need:{ now:7, run:30 }, art:[] },

    /* legendary — none of these can be bought at any price.

       Every one asks for three months of practice on consecutive days,
       and the Phoenix for five. That is the floor; each then asks for
       something different on top, so the four are not one grind repeated
       four times.

       The day count is measured against her longest run ever, not her
       current one. Ninety days that reset on a missed day would mean flu
       at day eighty-nine destroys three months and the pet becomes
       unreachable — which punishes being alive rather than rewarding
       commitment. Reaching it once earns it. */
    { id:'p13', tier:'legendary', name:'Mimi the Baby Unicorn', slug:'mimi-the-baby-unicorn',
      de:'das Einhorn', ru:'единорог', en:'unicorn',
      cost:9000, need:{ now:30, run:90, allPets:true, allSlots:true }, art:[] },
    { id:'p14', tier:'legendary', name:'Daisy the Lucky Dragon', slug:'daisy-the-lucky-dragon',
      de:'der Drache', ru:'дракон', en:'dragon',
      cost:9000, need:{ now:30, run:90, mature:150 }, art:[] },
    { id:'p15', tier:'legendary', name:'Noir the Black Panther Ninja', slug:'noir-the-black-panther-ninja',
      de:'der Panther', ru:'пантера', en:'panther',
      cost:9000, need:{ now:30, run:90, grown:6, awards:12 }, art:[] },

    /* The capstone. Five months, and the other three already yours — so
       it cannot be reached by any route except having done all of it. */
    { id:'p16', tier:'legendary', name:'Ember the Baby Phoenix', slug:'ember-the-baby-phoenix',
      de:'der Phönix', ru:'феникс', en:'phoenix',
      cost:15000, need:{ now:30, run:150, legendaries:3 }, art:[] },

  ]
};
