/* data/pets.js */
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
    /* `bg` is the section's own background — a velvet, behind the cards.

       Steven: "The cards will be rounded rectangles, and the velvet would
       just be a background and the cards don't need to be transparent.
       You'd only see this background between and on the sides of the
       tiles. The point isn't to stare at the background, the point is to
       have some sort of visual identity for the section."

       Which is why it is a BACKGROUND and not an emblem. A first pass put
       a 34px picture beside the tier's name; four postage stamps do far
       less to separate four sections than four fields of colour behind
       them. And because the cards stay opaque, no text ever sits on the
       texture — the rule about opaque text boxes holds without an
       exception.

       Optional per tier: a tier with no `bg` renders a plain section
       rather than a gap, so they can land one at a time.

       Files go in images/pets/, beside the pets, because they belong to
       the same set and petart.js already owns that folder. */
    { id:'common',    key:'ptCommon',    bg:'tier-common' },
    { id:'rare',      key:'ptRare',      bg:'tier-rare' },
    { id:'epic',      key:'ptEpic',      bg:'tier-epic' },
    { id:'legendary', key:'ptLegendary', bg:'tier-legendary' }
  ],

  pets: [
    /* common — three days in a row, and not much else.

       Low enough that it is reached in the first week rather than being a
       wall, but it means the very first pet is a small proof that coming
       back matters, not just that Kronen accumulate. */
    { id:'p01', tier:'common', name:'Flippy the Frog', slug:'flippy-the-frog',
      de:'der Frosch', ru:'жаба', en:'frog',
      cost:500, need:{ run:3 }, about:{ en:'Flippy jumps first and worries about the landing later. He loves lily pads, big splashes, and leaping straight into the next activity.',
              de:'Flippy springt zuerst und kümmert sich später um die Landung. Er liebt Seerosenblätter, große Spritzer und den direkten Sprung in die nächste Aktivität.',
              ru:'Флиппи сначала прыгает, а о приземлении думает потом. Он любит кувшинки, большие брызги и с радостью прыгает прямо к следующему заданию.' },
      art:[] },
    { id:'p02', tier:'common', name:'Squeaky the Bat', slug:'squeaky-the-bat',
      de:'die Fledermaus', ru:'летучая мышь', en:'bat',
      cost:500, need:{ run:3 }, about:{ en:'Squeaky listens for echoes and tries not to worry too much about what might be hiding in the dark. He can be jumpy, but when you\'re flying blind, he\'ll stay right beside you.',
              de:'Squeaky lauscht auf Echos und versucht, sich nicht zu viele Gedanken darüber zu machen, was sich in der Dunkelheit verstecken könnte. Er ist etwas schreckhaft, aber wenn du im Blindflug unterwegs bist, bleibt er direkt an deiner Seite.',
              ru:'Сквики прислушивается к эху и старается не слишком переживать о том, что может прятаться в темноте. Он немного пуглив, но если приходится лететь вслепую, он останется рядом с тобой.' },
      art:[] },
    { id:'p03', tier:'common', name:'Max the Scorpion', slug:'max-the-scorpion',
      de:'der Skorpion', ru:'скорпион', en:'scorpion',
      cost:500, need:{ run:3 }, about:{ en:'Max is a tough little desert coach who likes things simple: pinch, sting, keep moving. He\'s blunt, determined, and always ready for the next hunt.',
              de:'Max ist ein harter kleiner Wüstencoach, der es gern einfach hält: kneifen, stechen, weitermachen. Er ist direkt, entschlossen und immer bereit für die nächste Jagd.',
              ru:'Макс — суровый маленький тренер из пустыни, который любит простые правила: щипнуть, ужалить, двигаться дальше. Он прямолинеен, решителен и всегда готов к следующей охоте.' },
      art:[] },
    { id:'p04', tier:'common', name:'Quack Quack the Duck', slug:'quack-quack-the-duck',
      de:'die Ente', ru:'утка', en:'duck',
      cost:500, need:{ run:3 }, about:{ en:'Official announcement: Quack Quack is here! Encouragement is his official duty, volume control is not, and when in doubt, you should probably follow the duck.',
              de:'Offizielle Durchsage: Quack Quack ist da! Aufmunterung gehört zu seinen Amtspflichten, Lautstärkeregelung nicht – und wenn du nicht weiterweißt, solltest du wahrscheinlich der Ente folgen.',
              ru:'Официальное объявление: Квак-Квак прибыл! Подбадривать тебя — его служебная обязанность, регулировать громкость — нет, а если не знаешь, куда идти, наверное, лучше следовать за уткой.' },
      art:[] },
    { id:'p05', tier:'common', name:'Bun Bun the Bunny', slug:'bun-bun-the-bunny',
      de:'das Kaninchen', ru:'кролик', en:'rabbit',
      cost:500, need:{ run:3 }, about:{ en:'Bun Bun believes in warm burrows, happy hops, and carrots after a job well done. Learn a little, hop a little, enjoy your snack, and then you\'re ready to go again.',
              de:'Bun Bun glaubt an gemütliche Höhlen, fröhliche Hüpfer und Karotten nach getaner Arbeit. Lern ein bisschen, hüpf ein bisschen, genieß deinen Snack – und dann kann es weitergehen.',
              ru:'Бан-Бан любит уютные норки, весёлые прыжки и морковку после хорошо выполненной работы. Немного поучись, немного попрыгай, перекуси — и можно снова отправляться вперёд.' },
      art:[] },

    /* rare — a week. */
    { id:'p06', tier:'rare', name:'Bandito the Raccoon', slug:'bandito-the-raccoon',
      de:'der Waschbär', ru:'енот', en:'raccoon',
      cost:1500, need:{ now:3, run:7 }, about:{ en:'Bandito is a charming little rogue with an eye for jewels and suspiciously convenient knowledge of locked doors. Stay close, partner — the vault isn\'t going to find itself.',
              de:'Bandito ist ein charmanter kleiner Gauner mit einem Auge für Juwelen und verdächtig guten Kenntnissen über verschlossene Türen. Bleib in meiner Nähe, Partner – der Tresor findet sich schließlich nicht von allein.',
              ru:'Бандито — обаятельный маленький плут с глазом на драгоценности и подозрительно хорошими знаниями о запертых дверях. Держись рядом, напарник: сейф сам себя не найдёт.' },
      art:[] },
    { id:'p07', tier:'rare', name:'Cooper the Corgi', slug:'cooper-the-corgi',
      de:'der Hund', ru:'собака', en:'dog',
      cost:1500, need:{ now:3, run:7 }, about:{ en:'Cooper has a flock to herd, a pen to guard, and far too much energy to stand still. Expect wagging, zooming, and enthusiastic attempts to herd you toward your next activity.',
              de:'Cooper hat eine Herde zu hüten, einen Pferch zu bewachen und viel zu viel Energie, um stillzustehen. Freu dich auf Schwanzwedeln, wildes Herumflitzen und begeisterte Versuche, dich zur nächsten Aktivität zu treiben.',
              ru:'Куперу нужно пасти стадо, охранять загон, а энергии у него слишком много, чтобы стоять на месте. Жди виляющего хвоста, стремительных забегов и восторженных попыток загнать тебя прямо к следующему заданию.' },
      art:[] },
    { id:'p08', tier:'rare', name:'Henry the Hedgehog', slug:'henry-the-hedgehog',
      de:'der Igel', ru:'ёж', en:'hedgehog',
      cost:1500, need:{ now:3, run:7 }, about:{ en:'Henry is shy, but he\'s always trying to find the courage to peek out and cheer you on. His compliments sometimes sound rehearsed — only because he practised until he got them exactly right.',
              de:'Henry ist schüchtern, aber er versucht immer, genug Mut zu finden, um hervorzuschauen und dich anzufeuern. Seine Komplimente klingen manchmal einstudiert – aber nur, weil er so lange geübt hat, bis sie genau richtig waren.',
              ru:'Генри застенчив, но всегда старается набраться смелости, выглянуть и поддержать тебя. Иногда его комплименты звучат отрепетированно — только потому, что он тренировался, пока не научился говорить их как надо.' },
      art:[] },
    { id:'p09', tier:'rare', name:'Olivia the Baby Owl', slug:'olivia-the-baby-owl',
      de:'die Eule', ru:'сова', en:'owl',
      cost:1500, need:{ now:3, run:7 }, about:{ en:'Olivia is quiet, thoughtful, and always listening. In the dark, she watches the trees, follows the echoes, and notices the little things others miss.',
              de:'Olivia ist ruhig, nachdenklich und hört immer aufmerksam zu. In der Dunkelheit beobachtet sie die Bäume, folgt den Echos und bemerkt die kleinen Dinge, die andere übersehen.',
              ru:'Оливия тихая, вдумчивая и всегда внимательно слушает. В темноте она наблюдает за деревьями, следует за эхом и замечает мелочи, которые другие пропускают.' },
      art:[] },

    /* epic — Kronen and a month of consecutive days.

       Price alone made these a saving-up exercise: three good weeks and
       the shelf was clear. Asking for thirty days in a row as well means
       an epic pet cannot be bought in a burst, and the Kronen are what she
       chooses to spend rather than the whole of what she did. */
    { id:'p10', tier:'epic', name:'Wing Chung the Panda', slug:'wing-chung-panda',
      de:'der Panda', ru:'панда', en:'panda',
      cost:3000, need:{ now:7, run:30 }, about:{ en:'Wing Chung takes the slow and steady path, one step at a time. A little patience, a little wisdom, and perhaps some bamboo can carry you surprisingly far.',
              de:'Wing Chung geht seinen Weg ruhig und stetig, einen Schritt nach dem anderen. Ein wenig Geduld, ein wenig Weisheit und vielleicht etwas Bambus können dich erstaunlich weit bringen.',
              ru:'Винг Чунг идёт своим путём спокойно и не спеша, шаг за шагом. Немного терпения, немного мудрости и, возможно, немного бамбука могут привести тебя удивительно далеко.' },
      art:[] },
    { id:'p11', tier:'epic', name:'Luna the Blue Persian', slug:'luna-the-kitty',
      de:'die Katze', ru:'кошка', en:'cat',
      cost:3000, need:{ now:7, run:30 }, about:{ en:'Luna is elegant, composed, and quite certain that every good chair belongs to the court. Keep things proper and presentable, and you may earn the royal cat\'s approval.',
              de:'Luna ist elegant, gelassen und fest davon überzeugt, dass jeder gute Stuhl zum Hof gehört. Bleib ordentlich und präsentabel, dann verdienst du vielleicht die Zustimmung der königlichen Katze.',
              ru:'Луна элегантна, невозмутима и совершенно уверена, что каждый хороший стул принадлежит королевскому двору. Веди себя достойно и держи всё в порядке — и, возможно, заслужишь одобрение королевской кошки.' },
      art:[] },
    { id:'p12', tier:'epic', name:'Alisa the Fox', slug:'alisa-the-fox',
      de:'der Fuchs', ru:'лиса', en:'fox',
      cost:3000, need:{ now:7, run:30 }, about:{ en:'Alisa is sleek, confident, and always fabulous. To her, every new challenge is another runway, so show up, look sharp, and make it count, darling.',
              de:'Alisa ist elegant, selbstbewusst und immer fabelhaft. Für sie ist jede neue Herausforderung ein weiterer Laufsteg – also tritt auf, zeig Stil und mach etwas daraus, Darling.',
              ru:'Алиса элегантна, уверена в себе и всегда великолепна. Для неё каждое новое испытание — ещё один подиум, так что выходи, покажи стиль и сделай это красиво, дорогуша.' },
      art:[] },

    /* legendary — STALE COMMENT, CORRECTED 01 Sep 2026. It read "none of
       these can be bought at any price", which was true when it was written
       and is not now: all four have prices. Steven's rule as stated —
       "x days of repeated effort and some achievements along with earned
       currency" — so the money is real AND every condition below must hold.
       The comment was left standing long enough that `earned()` was checked
       against it and looked broken when it was not.

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
      cost:9000, need:{ run:60, slots:2 }, about:{ en:'Mimi looks sweet and sparkly, but that little horn comes with opinions. She likes a touch of magic, a good result, and just enough sarcasm to keep things interesting.',
              de:'Mimi sieht süß und glitzernd aus, aber zu diesem kleinen Horn gehört auch eine eigene Meinung. Sie mag ein bisschen Magie, gute Ergebnisse und gerade genug Sarkasmus, damit es interessant bleibt.',
              ru:'Мими выглядит милой и блестящей, но вместе с этим маленьким рогом у неё есть и собственное мнение. Она любит немного волшебства, хорошие результаты и ровно столько сарказма, чтобы с ней никогда не было скучно.' },
      art:[] },
    { id:'p14', tier:'legendary', name:'Daisy the Lucky Dragon', slug:'daisy-the-lucky-dragon',
      de:'der Drache', ru:'дракон', en:'dragon',
      cost:9000, need:{ run:60, quests:30 }, about:{ en:'Daisy is a cheerful little dragon who carries good luck wherever she goes. She loves sparkles, shiny days, and saving a little extra luck for when you need it.',
              de:'Daisy ist ein fröhlicher kleiner Drache, der überall Glück mitbringt. Sie liebt Glitzer, strahlende Tage und hebt gern ein bisschen zusätzliches Glück für den Moment auf, in dem du es brauchst.',
              ru:'Дейзи — весёлый маленький дракончик, который повсюду приносит с собой удачу. Она любит блеск, яркие дни и всегда приберегает немного удачи на тот момент, когда она тебе понадобится.' },
      art:[] },
    { id:'p15', tier:'legendary', name:'Noir the Black Panther Ninja', slug:'noir-the-black-panther-ninja',
      de:'der Panther', ru:'пантера', en:'panther',
      cost:9000, need:{ run:60, pets:6, awards:12 }, about:{ en:'Quiet, watchful, and most at home in the shadows. Noir notices everything, says little, and somehow makes even a compliment sound like a warning.',
              de:'Still, wachsam und in den Schatten ganz zu Hause. Noir bemerkt alles, sagt wenig und schafft es irgendwie, sogar ein Kompliment wie eine Warnung klingen zu lassen.',
              ru:'Тихий, бдительный и чувствующий себя в тени как дома. Нуар замечает всё, говорит мало и каким-то образом даже комплимент превращает в лёгкое предупреждение.' },
      art:[] },

    /* The capstone. Five months, and the other three already yours — so
       it cannot be reached by any route except having done all of it. */
    { id:'p16', tier:'legendary', name:'Ember the Baby Phoenix', slug:'ember-the-baby-phoenix',
      de:'der Phönix', ru:'феникс', en:'phoenix',
      cost:15000, need:{ run:90, legendaries:3 }, about:{ en:'Ember may be tiny, but she has enough fire for a grand performance. If something goes wrong, she shakes off the ashes, rises again, and gets ready for the encore.',
              de:'Ember mag winzig sein, aber sie hat genug Feuer für einen großen Auftritt. Wenn etwas schiefgeht, schüttelt sie die Asche ab, erhebt sich wieder und macht sich bereit für die Zugabe.',
              ru:'Эмбер совсем маленькая, но огня в ней хватит на целое представление. Если что-то не получается, она стряхивает пепел, снова поднимается и готовится выйти на бис.' },
      art:[] },

  ]
};
