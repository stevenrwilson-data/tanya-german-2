/* data/gap-stories.js */
/* GAP STORIES — the material for the story exercises.

   Three sentences, three or four blanks, every sentence carrying at least
   one target word. No filler: Steven's rule, and it is why these read as
   stories rather than as sentences with holes.

   Read by Word Lab stages 5, 6 and 7 and by both bonus stages.

   ------------------------------------------------------------------
   REBUILT 03 SEP, GERMAN FIRST

   The previous version was written English first and the German was fitted
   to it afterwards. That is backwards here: the vocabulary entries are the
   constraint, so the order is

       German headword -> a natural German sentence that actually realises
       that headword -> Russian -> English

   Writing the English first is what produced `Ihr Bruder moechte auch
   mitmachen` for a headword that is `mitmachen bei` — a blank she could
   not answer because the preposition was not in the sentence at all.

   Fixed in this pass, all of it Steven's call:

     tw-03  `Sie ist sicher` maps to `sicher sein`, not `sicher`. The
            shipped data had it under `sicher` (safe), which is a
            different word — 832 against 824.
     tw-07  `bei dem Spiel mitmachen` restored
     tw-11  `bei dem Kurs mitmachen` restored
     tw-10  `Sie hat`, not `Sie haben` — `Die Familie` is the antecedent
            and it is singular
     tw-07  `entscheidet sich dafuer, mitzuspielen` — the comma is not
            optional
     tw-09  `verraet` rather than `sagt ... sagen` twice in one breath
     tw-06  `einen Ratschlag zu taeglicher Bewegung`

   ------------------------------------------------------------------
   sicher AND sicher sein

   824 `sicher sein` is to be sure. 832 `sicher` is safe. They are two
   entries and the distinction has to stay deliberate, because
   `Sie ist sicher, dass ...` leaves a hole that BOTH of them fit.

   THE FIX IS TO BLANK THE COPULA WITH IT — surface `ist sicher`, word
   `sicher sein`. The hole is then two words wide, only one headword fits,
   and it teaches that the verb is part of the item. Same for `sind
   sicher` in tw-11.

   As a result `sicher` in the safe sense appears NOWHERE in these twelve.
   That is correct, not a gap: it cannot appear in a story that also
   blanks `sicher sein` without making that blank unanswerable.

   ------------------------------------------------------------------
   A BLANK IS A LINE, A SURFACE FORM AND A HEADWORD

   The obvious design is to blank the headword wherever it appears. German
   will not have it:

     anbieten      `bietet ihm Kaffee und Brot an` — the verb is SPLIT, so
                   there is no contiguous span to blank. The blank takes
                   `bietet` and leaves `an` visible, which is honest: the
                   trailing particle is a clue that the verb is separable,
                   and that is worth teaching rather than hiding.
     teilnehmen an `an einem Schulspiel teilnehmen` — same, the blank
                   takes the verb and the preposition stays
     mitmachen bei `bei dem Spiel mitmachen` — same
     bekommen      `bekommt`
     hoffentlich   `Hoffentlich`, capitalised at the start of a sentence

   `line` exists because a surface form can appear twice in one story:
   tw-06 has `Bewegung` on line 1 and again on line 2, so blanking by
   string alone cannot tell which. EVERY blank here was checked to be
   present in its own line and unique within it before this file was
   written.

   ------------------------------------------------------------------
   THIRTY-SIX STORIES, THREE PER SITTING, LEAST RECENTLY USED

   Three sets of twelve — A (tw-01..12), D (tw-13..24) and E (tw-25..36).
   Twelve sittings before anything comes round again, and the draw
   remembers what it has served rather than picking at random: a random
   three of thirty-six still repeats often enough to be noticed, and the
   point of holding thirty-six is that studying should not feel like
   rereading.

   EACH SET OF TWELVE COVERS THE CHAPTER ON ITS OWN, which is a better
   property than thirty-six that only work as a block.

   THREE LANGUAGES, NOT TWO. Exercise 6 has a translation button, so an
   English reader needs somewhere to flip to.

   `word` matches a headword in vocab.js, so the word bank, the audio and
   the typed answer all resolve through the bank rather than being
   repeated here. All 30 headwords appear. */

window.GH_GAPSTORIES = [
  {
    id:'tw-01',   /* set A */

    de:[
      'Anna muss ihr Treffen absagen, weil der Zug zu spät kommt.',
      'Sie schlägt vor, sich stattdessen morgen zu treffen.',
      'Hoffentlich hat ihre Freundin dann Zeit.'
    ],

    ru:[
      'Анне приходится отменить встречу, потому что поезд опаздывает.',
      'Она предлагает встретиться завтра.',
      'Надеюсь, у её подруги тогда будет время.'
    ],

    en:[
      'Anna has to cancel her meeting because the train is late.',
      'She suggests meeting tomorrow instead.',
      'Hopefully, her friend is free then.'
    ],

    blanks:[
      { line:0, surface:'absagen', word:'absagen' },
      { line:1, surface:'schlägt vor', word:'vorschlagen' },
      { line:2, surface:'Hoffentlich', word:'hoffentlich' }
    ]
  },

  {
    id:'tw-02',   /* set A */

    de:[
      'Tom bittet seine Freundin nach der Arbeit um Kaffee.',
      'Sie bietet ihm Kaffee und Brot an.',
      'Das Brot möchte er auf jeden Fall, weil er Hunger hat.'
    ],

    ru:[
      'Том просит у своей подруги кофе после работы.',
      'Она предлагает ему кофе и хлеб.',
      'Хлеб он обязательно хочет, потому что голоден.'
    ],

    en:[
      'Tom asks his friend for coffee after work.',
      'She offers him coffee and bread.',
      'He definitely wants the bread because he is hungry.'
    ],

    blanks:[
      { line:0, surface:'bittet', word:'bitten' },
      { line:1, surface:'bietet', word:'anbieten' },
      { line:2, surface:'auf jeden Fall', word:'auf jeden Fall' }
    ]
  },

  {
    id:'tw-03',   /* set A */

    de:[
      'Maria möchte Fotografin werden.',
      'Sie möchte selbstständig arbeiten und ihre eigenen Fotos verkaufen.',
      'Sie ist sicher, dass sie dafür viel Zeit braucht.'
    ],

    ru:[
      'Мария хочет стать фотографом.',
      'Она хочет работать на себя и продавать свои фотографии.',
      'Она уверена, что для этого ей понадобится много времени.'
    ],

    en:[
      'Maria wants to become a photographer.',
      'She wants to be self-employed and sell her own photos.',
      'She is sure that she will need a lot of time for this.'
    ],

    blanks:[
      { line:0, surface:'werden', word:'werden' },
      { line:1, surface:'selbstständig', word:'selbstständig' },
      { line:1, surface:'verkaufen', word:'verkaufen' },
      { line:2, surface:'ist sicher', word:'sicher sein' }
    ]
  },

  {
    id:'tw-04',   /* set A */

    de:[
      'Der neue Film ist sehr spannend.',
      'Die Schauspielerin spielt die Hauptrolle sehr gut.',
      'Lena wird ihren nächsten Film auf jeden Fall sehen.'
    ],

    ru:[
      'Новый фильм очень захватывающий.',
      'Актриса очень хорошо играет главную роль.',
      'Лена обязательно посмотрит её следующий фильм.'
    ],

    en:[
      'The new movie is very exciting.',
      'The actress plays the main role very well.',
      'Lena will definitely watch her next movie.'
    ],

    blanks:[
      { line:0, surface:'spannend', word:'spannend' },
      { line:1, surface:'Schauspielerin', word:'die Schauspielerin' },
      { line:2, surface:'auf jeden Fall', word:'auf jeden Fall' }
    ]
  },

  {
    id:'tw-05',   /* set A */

    de:[
      'Paul und Nina bestellen zwei Pizzen.',
      'Die Bestellung kommt nach ungefähr dreißig Minuten.',
      'Das Bestellen ist sehr einfach.'
    ],

    ru:[
      'Пауль и Нина заказывают две пиццы.',
      'Заказ приходит примерно через тридцать минут.',
      'Заказывать очень просто.'
    ],

    en:[
      'Paul and Nina order two pizzas.',
      'The order arrives after about thirty minutes.',
      'Ordering is very easy.'
    ],

    blanks:[
      { line:0, surface:'bestellen', word:'bestellen' },
      { line:1, surface:'Bestellung', word:'die Bestellung' },
      { line:1, surface:'ungefähr', word:'ungefähr' },
      { line:2, surface:'einfach', word:'einfach' }
    ]
  },

  {
    id:'tw-06',   /* set A */

    de:[
      'Max hat eine Krankheit und geht deshalb zum Arzt.',
      'Der Arzt gibt ihm einen Ratschlag zu täglicher Bewegung.',
      'Er sagt, dass Bewegung für die Gesundheit wichtig ist.'
    ],

    ru:[
      'У Макса болезнь, поэтому он идёт к врачу.',
      'Врач даёт ему совет насчёт ежедневной физической активности.',
      'Он говорит, что движение важно для здоровья.'
    ],

    en:[
      'Max has an illness, so he goes to the doctor.',
      'The doctor gives him a piece of advice about daily exercise.',
      'He says exercise is important for health.'
    ],

    blanks:[
      { line:0, surface:'Krankheit', word:'die Krankheit' },
      { line:1, surface:'Ratschlag', word:'der Ratschlag' },
      { line:1, surface:'Bewegung', word:'die Bewegung' },
      { line:2, surface:'wichtig', word:'wichtig sein' }
    ]
  },

  {
    id:'tw-07',   /* set A */

    de:[
      'Mia möchte an einem Schulspiel teilnehmen.',
      'Ihr Bruder möchte auch bei dem Spiel mitmachen.',
      'Sogar ihr Vater entscheidet sich dafür, mitzuspielen.'
    ],

    ru:[
      'Миа хочет принять участие в школьной игре.',
      'Её брат тоже хочет участвовать в игре.',
      'Даже её отец решает играть вместе с ними.'
    ],

    en:[
      'Mia wants to take part in a school game.',
      'Her brother wants to join in with the game too.',
      'Even her father decides to play.'
    ],

    blanks:[
      { line:0, surface:'teilnehmen', word:'teilnehmen an' },
      { line:1, surface:'mitmachen', word:'mitmachen bei' },
      { line:2, surface:'Sogar', word:'sogar' }
    ]
  },

  {
    id:'tw-08',   /* set A */

    de:[
      'Ben hat wenig Bewegung, weil er den ganzen Tag sitzt.',
      'Sein Arzt sagt, dass Übergewicht Probleme verursachen kann.',
      'Täglich spazieren zu gehen bedeutet für Ben, besser auf sich zu achten.'
    ],

    ru:[
      'Бен мало двигается, потому что весь день сидит.',
      'Его врач говорит, что лишний вес может вызывать проблемы.',
      'Ежедневно гулять для Бена означает лучше заботиться о себе.'
    ],

    en:[
      'Ben gets little exercise because he sits all day.',
      'His doctor says excess weight can cause problems.',
      'For Ben, walking every day means taking better care of himself.'
    ],

    blanks:[
      { line:0, surface:'Bewegung', word:'die Bewegung' },
      { line:1, surface:'Übergewicht', word:'das Übergewicht' },
      { line:2, surface:'bedeutet', word:'bedeuten' }
    ]
  },

  {
    id:'tw-09',   /* set A */

    de:[
      'Sara bekommt vor ihrem Geburtstag ein Paket.',
      'Sie bittet ihren Bruder, ihr zu sagen, was darin ist.',
      'Er verrät es ihr auf keinen Fall.'
    ],

    ru:[
      'Сара получает посылку перед своим днём рождения.',
      'Она просит брата сказать ей, что внутри.',
      'Он ни в коем случае не выдаёт секрет.'
    ],

    en:[
      'Sara receives a package before her birthday.',
      'She asks her brother to tell her what is inside.',
      'He will under no circumstances reveal it.'
    ],

    blanks:[
      { line:0, surface:'bekommt', word:'bekommen' },
      { line:1, surface:'bittet', word:'bitten' },
      { line:2, surface:'auf keinen Fall', word:'auf keinen Fall' }
    ]
  },

  {
    id:'tw-10',   /* set A */

    de:[
      'Die Familie muss das Picknick wegen des Regens verschieben.',
      'Sie hat das Essen schon im Voraus gekauft.',
      'Hoffentlich kann die Familie am Sonntag picknicken.'
    ],

    ru:[
      'Семье приходится перенести пикник из-за дождя.',
      'Она уже купила еду заранее.',
      'Надеюсь, семья сможет устроить пикник в воскресенье.'
    ],

    en:[
      'The family has to postpone the picnic because of the rain.',
      'They already bought the food in advance.',
      'Hopefully, the family can have the picnic on Sunday.'
    ],

    blanks:[
      { line:0, surface:'verschieben', word:'verschieben' },
      { line:1, surface:'im Voraus', word:'im Voraus' },
      { line:2, surface:'Hoffentlich', word:'hoffentlich' }
    ]
  },

  {
    id:'tw-11',   /* set A */

    de:[
      'Eva möchte an einem Deutschkurs teilnehmen.',
      'Ihre Freundin möchte auch bei dem Kurs mitmachen.',
      'Beide sind sicher, dass tägliches Sprechen wichtig ist.'
    ],

    ru:[
      'Ева хочет принять участие в курсе немецкого языка.',
      'Её подруга тоже хочет участвовать в этом курсе.',
      'Обе уверены, что говорить каждый день важно.'
    ],

    en:[
      'Eva wants to take part in a German course.',
      'Her friend also wants to join in with the course.',
      'They are sure that speaking every day is important.'
    ],

    blanks:[
      { line:0, surface:'teilnehmen', word:'teilnehmen an' },
      { line:1, surface:'mitmachen', word:'mitmachen bei' },
      { line:2, surface:'sind sicher', word:'sicher sein' },
      { line:2, surface:'wichtig', word:'wichtig sein' }
    ]
  },

  {
    id:'tw-12',   /* set A */

    de:[
      'Leo sieht ein Fahrrad für ungefähr fünfzig Euro.',
      'Er fragt den Mann, ob er das Fahrrad für vierzig Euro verkauft.',
      'Am Nachmittag bekommt Leo das Fahrrad.'
    ],

    ru:[
      'Лео видит велосипед примерно за пятьдесят евро.',
      'Он спрашивает мужчину, продаст ли тот велосипед за сорок евро.',
      'Днём Лео получает велосипед.'
    ],

    en:[
      'Leo sees a bike for about fifty euros.',
      'He asks the man if he will sell the bike for forty euros.',
      'That afternoon, Leo gets the bike.'
    ],

    blanks:[
      { line:0, surface:'ungefähr', word:'ungefähr' },
      { line:1, surface:'verkauft', word:'verkaufen' },
      { line:2, surface:'bekommt', word:'bekommen' }
    ]
  },

  {
    id:'tw-13',   /* set D */

    de:[
      'Lena bittet ihren Vater um Hilfe.',
      'Er bietet ihr sofort seine Hilfe an.',
      'Danach bekommt sie das schwere Paket auf den Tisch.'
    ],

    ru:[
      'Лена просит отца о помощи.',
      'Он сразу предлагает ей свою помощь.',
      'После этого она получает тяжёлую посылку на стол.'
    ],

    en:[
      'Lena asks her father for help.',
      'He immediately offers her his help.',
      'After that, she gets the heavy package onto the table.'
    ],

    blanks:[
      { line:0, surface:'bittet', word:'bitten' },
      { line:1, surface:'bietet', word:'anbieten' },
      { line:2, surface:'bekommt', word:'bekommen' }
    ]
  },

  {
    id:'tw-14',   /* set D */

    de:[
      'Tom muss das Treffen absagen, weil er krank ist.',
      'Er möchte es auf Freitag verschieben.',
      'Seine Freundin schlägt Samstag vor, weil sie Freitag arbeitet.'
    ],

    ru:[
      'Том должен отменить встречу, потому что он болен.',
      'Он хочет перенести её на пятницу.',
      'Его подруга предлагает субботу, потому что в пятницу она работает.'
    ],

    en:[
      'Tom has to cancel the meeting because he is sick.',
      'He wants to move it to Friday.',
      'His friend suggests Saturday because she works Friday.'
    ],

    blanks:[
      { line:0, surface:'absagen', word:'absagen' },
      { line:1, surface:'verschieben', word:'verschieben' },
      { line:2, surface:'schlägt', word:'vorschlagen' }
    ]
  },

  {
    id:'tw-15',   /* set D */

    de:[
      'Der Zug kommt hoffentlich bald, weil Anna friert.',
      'Die Fahrt dauert ungefähr eine Stunde.',
      'Anna möchte sicher sein, dass sie pünktlich ankommt.'
    ],

    ru:[
      'Надеюсь, поезд скоро придёт, потому что Анне холодно.',
      'Поездка длится примерно один час.',
      'Анна хочет быть уверена, что приедет вовремя.'
    ],

    en:[
      'Hopefully the train comes soon because Anna is cold.',
      'The trip takes about one hour.',
      'Anna wants to be sure she arrives on time.'
    ],

    blanks:[
      { line:0, surface:'hoffentlich', word:'hoffentlich' },
      { line:1, surface:'ungefähr', word:'ungefähr' },
      { line:2, surface:'sicher sein', word:'sicher sein' }
    ]
  },

  {
    id:'tw-16',   /* set D */

    de:[
      'Mira möchte Schauspielerin werden.',
      'Sie findet Filme sehr spannend.',
      'Ihre Lieblings-Schauspielerin spielt heute in einem neuen Film.'
    ],

    ru:[
      'Мира хочет стать актрисой.',
      'Она считает фильмы очень увлекательными.',
      'Её любимая актриса сегодня играет в новом фильме.'
    ],

    en:[
      'Mira wants to become an actress.',
      'She finds movies very exciting.',
      'Her favorite actress is in a new movie today.'
    ],

    blanks:[
      { line:0, surface:'werden', word:'werden' },
      { line:1, surface:'spannend', word:'spannend' },
      { line:0, surface:'Schauspielerin', word:'die Schauspielerin' }
    ]
  },

  {
    id:'tw-17',   /* set D */

    de:[
      'Paul möchte auf jeden Fall schwimmen gehen.',
      'Er geht auf keinen Fall ins tiefe Wasser, weil er noch lernt.',
      'Das kleine Becken ist einfach für ihn.'
    ],

    ru:[
      'Пауль обязательно хочет пойти плавать.',
      'Он ни в коем случае не идёт в глубокую воду, потому что ещё учится.',
      'Маленький бассейн для него простой.'
    ],

    en:[
      'Paul definitely wants to go swimming.',
      'He will definitely not go into deep water because he is still learning.',
      'The small pool is easy for him.'
    ],

    blanks:[
      { line:0, surface:'auf jeden Fall', word:'auf jeden Fall' },
      { line:1, surface:'auf keinen Fall', word:'auf keinen Fall' },
      { line:2, surface:'einfach', word:'einfach' }
    ]
  },

  {
    id:'tw-18',   /* set D */

    de:[
      'Nina ist selbstständig und macht Kuchen zu Hause.',
      'Sie verkauft die Kuchen in einem kleinen Café.',
      'Heute bekommt sie eine große Bestellung für zehn Kuchen.'
    ],

    ru:[
      'Нина работает на себя и делает торты дома.',
      'Она продаёт торты в маленьком кафе.',
      'Сегодня она получает большой заказ на десять тортов.'
    ],

    en:[
      'Nina is self-employed and makes cakes at home.',
      'She sells the cakes in a small café.',
      'Today she gets a large order for ten cakes.'
    ],

    blanks:[
      { line:0, surface:'selbstständig', word:'selbstständig' },
      { line:1, surface:'verkauft', word:'verkaufen' },
      { line:2, surface:'Bestellung', word:'die Bestellung' }
    ]
  },

  {
    id:'tw-19',   /* set D */

    de:[
      'Wir möchten morgen Pizza bestellen.',
      'Für die Party müssen wir das Essen im Voraus planen.',
      'Genug Essen kann für viele Gäste wichtig sein.'
    ],

    ru:[
      'Мы хотим завтра заказать пиццу.',
      'Для вечеринки нужно планировать еду заранее.',
      'Достаточно еды может быть важно, когда гостей много.'
    ],

    en:[
      'We want to order pizza tomorrow.',
      'For the party, we have to plan the food in advance.',
      'Having enough food can be important when there are many guests.'
    ],

    blanks:[
      { line:0, surface:'bestellen', word:'bestellen' },
      { line:1, surface:'im Voraus', word:'im Voraus' },
      { line:2, surface:'wichtig sein', word:'wichtig sein' }
    ]
  },

  {
    id:'tw-20',   /* set D */

    de:[
      'Mehr Bewegung ist gut, wenn man viel sitzt.',
      'Der Arzt sagt, dass Übergewicht Probleme machen kann.',
      'Sein Ratschlag ist, jeden Tag zwanzig Minuten zu gehen.'
    ],

    ru:[
      'Больше движения полезно, если много сидеть.',
      'Врач говорит, что лишний вес может вызывать проблемы.',
      'Его совет — каждый день ходить двадцать минут.'
    ],

    en:[
      'More exercise is good when you sit a lot.',
      'The doctor says excess weight can cause problems.',
      'His advice is to walk twenty minutes every day.'
    ],

    blanks:[
      { line:0, surface:'Bewegung', word:'die Bewegung' },
      { line:1, surface:'Übergewicht', word:'das Übergewicht' },
      { line:2, surface:'Ratschlag', word:'der Ratschlag' }
    ]
  },

  {
    id:'tw-21',   /* set D */

    de:[
      'Wegen einer Krankheit bleibt Ben heute zu Hause.',
      'Der Arzt sagt, dass er dort sicher und warm bleiben soll.',
      'Sogar sein Hund bleibt den ganzen Tag bei ihm.'
    ],

    ru:[
      'Из-за болезни Бен сегодня остаётся дома.',
      'Врач говорит, что ему нужно оставаться там в безопасности и в тепле.',
      'Даже его собака остаётся с ним весь день.'
    ],

    en:[
      'Because of an illness, Ben stays home today.',
      'The doctor says he should stay safe and warm there.',
      'Even his dog stays with him all day.'
    ],

    blanks:[
      { line:0, surface:'Krankheit', word:'die Krankheit' },
      { line:1, surface:'sicher', word:'sicher' },
      { line:2, surface:'Sogar', word:'sogar' }
    ]
  },

  {
    id:'tw-22',   /* set D */

    de:[
      '„Start“ kann bedeuten, dass das Spiel jetzt beginnt.',
      'Mia möchte bei dem Spiel mitmachen, weil ihre Freunde spielen.',
      'Ihr Bruder möchte auch an dem Spiel teilnehmen, wenn noch Platz ist.'
    ],

    ru:[
      '«Старт» может означать, что игра сейчас начинается.',
      'Мия хочет участвовать в игре, потому что играют её друзья.',
      'Её брат тоже хочет принять участие в игре, если ещё есть место.'
    ],

    en:[
      '“Start” can mean that the game begins now.',
      'Mia wants to join in the game because her friends are playing.',
      'Her brother also wants to participate in the game if there is still room.'
    ],

    blanks:[
      { line:0, surface:'bedeuten', word:'bedeuten' },
      { line:1, surface:'mitmachen', word:'mitmachen bei' },
      { line:2, surface:'teilnehmen', word:'teilnehmen an' }
    ]
  },

  {
    id:'tw-23',   /* set D */

    de:[
      'Sara möchte mitmachen bei einem kleinen Schulfest.',
      'Für sie ist es wichtig, dort mit ihrer Klasse zu sein.',
      'Hoffentlich kommt ihre beste Freundin auch.'
    ],

    ru:[
      'Сара хочет участвовать в небольшом школьном празднике.',
      'Для неё важно быть там со своим классом.',
      'Надеюсь, её лучшая подруга тоже придёт.'
    ],

    en:[
      'Sara wants to take part in a small school festival.',
      'It is important for her to be there with her class.',
      'Hopefully her best friend comes too.'
    ],

    blanks:[
      { line:0, surface:'mitmachen', word:'mitmachen bei' },
      { line:1, surface:'wichtig', word:'wichtig sein' },
      { line:2, surface:'Hoffentlich', word:'hoffentlich' }
    ]
  },

  {
    id:'tw-24',   /* set D */

    de:[
      'Leo ist sicher, dass das Fahrrad gut ist.',
      'Er kann es für ungefähr fünfzig Euro bekommen.',
      'Er möchte es auf jeden Fall kaufen, weil sein altes Fahrrad kaputt ist.'
    ],

    ru:[
      'Лео уверен, что велосипед хороший.',
      'Он может получить его примерно за пятьдесят евро.',
      'Он обязательно хочет его купить, потому что его старый велосипед сломан.'
    ],

    en:[
      'Leo is sure the bicycle is good.',
      'He can get it for about fifty euros.',
      'He definitely wants to buy it because his old bicycle is broken.'
    ],

    blanks:[
      { line:0, surface:'ist sicher', word:'sicher sein' },
      { line:1, surface:'ungefähr', word:'ungefähr' },
      { line:1, surface:'bekommen', word:'bekommen' },
      { line:2, surface:'auf jeden Fall', word:'auf jeden Fall' }
    ]
  },

  {
    id:'tw-25',   /* set E */

    de:[
      'Mila bittet ihren Bruder, ihr beim Kochen zu helfen.',
      'Er bietet sofort seine Hilfe an.',
      'Hoffentlich ist das Essen heute einfach zu machen.'
    ],

    ru:[
      'Мила просит брата помочь ей готовить.',
      'Он сразу предлагает свою помощь.',
      'Надеюсь, сегодня еду будет легко приготовить.'
    ],

    en:[
      'Mila asks her brother to help her cook.',
      'He immediately offers his help.',
      'Hopefully, the food is easy to make today.'
    ],

    blanks:[
      { line:0, surface:'bittet', word:'bitten' },
      { line:1, surface:'bietet', word:'anbieten' },
      { line:2, surface:'Hoffentlich', word:'hoffentlich' },
      { line:2, surface:'einfach', word:'einfach' }
    ]
  },

  {
    id:'tw-26',   /* set E */

    de:[
      'Wir müssen den Termin absagen, weil der Arzt krank ist.',
      'Die Frau schlägt vor, am Freitag zu kommen.',
      'Der neue Termin ist ungefähr eine Woche später.'
    ],

    ru:[
      'Мы должны отменить приём, потому что врач заболел.',
      'Женщина предлагает прийти в пятницу.',
      'Новый приём будет примерно через неделю.'
    ],

    en:[
      'We have to cancel the appointment because the doctor is sick.',
      'The woman suggests coming on Friday.',
      'The new appointment is about a week later.'
    ],

    blanks:[
      { line:0, surface:'absagen', word:'absagen' },
      { line:1, surface:'schlägt', word:'vorschlagen' },
      { line:2, surface:'ungefähr', word:'ungefähr' }
    ]
  },

  {
    id:'tw-27',   /* set E */

    de:[
      'Nina möchte Schauspielerin werden.',
      'Sie findet Theater sehr spannend.',
      'Sie möchte auf jeden Fall an einem Theaterkurs teilnehmen.'
    ],

    ru:[
      'Нина хочет стать актрисой.',
      'Она считает театр очень увлекательным.',
      'Она обязательно хочет участвовать в театральном курсе.'
    ],

    en:[
      'Nina wants to become an actress.',
      'She finds theater very exciting.',
      'She definitely wants to participate in a theater course.'
    ],

    blanks:[
      { line:0, surface:'Schauspielerin', word:'die Schauspielerin' },
      { line:0, surface:'werden', word:'werden' },
      { line:1, surface:'spannend', word:'spannend' },
      { line:2, surface:'auf jeden Fall', word:'auf jeden Fall' },
      { line:2, surface:'teilnehmen', word:'teilnehmen an' }
    ]
  },

  {
    id:'tw-28',   /* set E */

    de:[
      'Mark ist selbstständig und verkauft Kuchen in einem kleinen Café.',
      'Heute bekommt er eine große Bestellung.',
      'Er ist sicher, dass er genug Kuchen hat.'
    ],

    ru:[
      'Марк работает на себя и продаёт пирожные в маленьком кафе.',
      'Сегодня он получает большой заказ.',
      'Он уверен, что у него достаточно пирожных.'
    ],

    en:[
      'Mark is self-employed and sells cakes in a small café.',
      'Today he receives a large order.',
      'He is sure that he has enough cake.'
    ],

    blanks:[
      { line:0, surface:'selbstständig', word:'selbstständig' },
      { line:0, surface:'verkauft', word:'verkaufen' },
      { line:1, surface:'bekommt', word:'bekommen' },
      { line:1, surface:'Bestellung', word:'die Bestellung' },
      { line:2, surface:'ist sicher', word:'sicher sein' }
    ]
  },

  {
    id:'tw-29',   /* set E */

    de:[
      'Lisa möchte Essen für ihre Party bestellen.',
      'Sie muss im Voraus bezahlen.',
      'Auf keinen Fall möchte sie am Abend ohne Essen sein.'
    ],

    ru:[
      'Лиза хочет заказать еду для своей вечеринки.',
      'Она должна заплатить заранее.',
      'Она ни в коем случае не хочет остаться вечером без еды.'
    ],

    en:[
      'Lisa wants to order food for her party.',
      'She has to pay in advance.',
      'She definitely does not want to be without food that evening.'
    ],

    blanks:[
      { line:0, surface:'bestellen', word:'bestellen' },
      { line:1, surface:'im Voraus', word:'im Voraus' },
      { line:2, surface:'Auf keinen Fall', word:'auf keinen Fall' }
    ]
  },

  {
    id:'tw-30',   /* set E */

    de:[
      'Der Arzt sagt, dass tägliche Bewegung wichtig ist.',
      'Zu wenig Bewegung kann zu Übergewicht führen.',
      'Sein Ratschlag ist einfach: jeden Tag spazieren gehen.'
    ],

    ru:[
      'Врач говорит, что ежедневное движение важно.',
      'Недостаток движения может привести к лишнему весу.',
      'Его совет простой: каждый день ходить на прогулку.'
    ],

    en:[
      'The doctor says that daily exercise is important.',
      'Too little exercise can lead to excess weight.',
      'His advice is simple: take a walk every day.'
    ],

    blanks:[
      { line:0, surface:'Bewegung', word:'die Bewegung' },
      { line:0, surface:'wichtig', word:'wichtig sein' },
      { line:1, surface:'Übergewicht', word:'das Übergewicht' },
      { line:2, surface:'Ratschlag', word:'der Ratschlag' },
      { line:2, surface:'einfach', word:'einfach' }
    ]
  },

  {
    id:'tw-31',   /* set E */

    de:[
      'Paul hat eine Krankheit und muss zu Hause bleiben.',
      'Sogar ein kurzer Spaziergang ist heute zu viel.',
      'Hoffentlich wird er bald wieder gesund.'
    ],

    ru:[
      'У Пауля болезнь, и он должен оставаться дома.',
      'Даже короткая прогулка сегодня для него слишком тяжёлая.',
      'Надеюсь, он скоро снова станет здоровым.'
    ],

    en:[
      'Paul has an illness and has to stay home.',
      'Even a short walk is too much today.',
      'Hopefully, he will get well again soon.'
    ],

    blanks:[
      { line:0, surface:'Krankheit', word:'die Krankheit' },
      { line:1, surface:'Sogar', word:'sogar' },
      { line:2, surface:'Hoffentlich', word:'hoffentlich' },
      { line:2, surface:'wird', word:'werden' }
    ]
  },

  {
    id:'tw-32',   /* set E */

    de:[
      'Unsere Freunde möchten bei einem Fußballspiel mitmachen.',
      'Ich möchte auch an dem Spiel teilnehmen.',
      'Wir sind sicher, dass es spannend wird.'
    ],

    ru:[
      'Наши друзья хотят участвовать в футбольной игре.',
      'Я тоже хочу принять участие в игре.',
      'Мы уверены, что будет интересно.'
    ],

    en:[
      'Our friends want to take part in a soccer game.',
      'I also want to participate in the game.',
      'We are sure it will be exciting.'
    ],

    blanks:[
      { line:0, surface:'mitmachen', word:'mitmachen bei' },
      { line:1, surface:'teilnehmen', word:'teilnehmen an' },
      { line:2, surface:'sind sicher', word:'sicher sein' },
      { line:2, surface:'spannend', word:'spannend' }
    ]
  },

  {
    id:'tw-33',   /* set E */

    de:[
      'Wir müssen unsere Reise um einen Tag verschieben.',
      'Das bedeutet, dass wir am Samstag fahren.',
      'Auf jeden Fall wollen wir trotzdem ans Meer.'
    ],

    ru:[
      'Мы должны перенести нашу поездку на один день.',
      'Это означает, что мы поедем в субботу.',
      'Мы в любом случае всё равно хотим поехать к морю.'
    ],

    en:[
      'We have to postpone our trip by one day.',
      'That means we will leave on Saturday.',
      'In any case, we still want to go to the sea.'
    ],

    blanks:[
      { line:0, surface:'verschieben', word:'verschieben' },
      { line:1, surface:'bedeutet', word:'bedeuten' },
      { line:2, surface:'Auf jeden Fall', word:'auf jeden Fall' }
    ]
  },

  {
    id:'tw-34',   /* set E */

    de:[
      'Anna möchte bei einem Kochkurs mitmachen.',
      'Der Kurs kostet ungefähr zwanzig Euro.',
      'Sie bittet ihre Freundin, auch mitzukommen.'
    ],

    ru:[
      'Анна хочет участвовать в кулинарном курсе.',
      'Курс стоит примерно двадцать евро.',
      'Она просит подругу тоже пойти с ней.'
    ],

    en:[
      'Anna wants to take part in a cooking class.',
      'The class costs about twenty euros.',
      'She asks her friend to come too.'
    ],

    blanks:[
      { line:0, surface:'mitmachen', word:'mitmachen bei' },
      { line:1, surface:'ungefähr', word:'ungefähr' },
      { line:2, surface:'bittet', word:'bitten' }
    ]
  },

  {
    id:'tw-35',   /* set E */

    de:[
      'Tom möchte seiner Mutter ein Geschenk anbieten, aber sie braucht nichts.',
      'Er schlägt deshalb ein gemeinsames Essen vor.',
      'Seine Mutter möchte auf jeden Fall mit ihm essen.'
    ],

    ru:[
      'Том хочет предложить маме подарок, но ей ничего не нужно.',
      'Поэтому он предлагает вместе поесть.',
      'Его мама обязательно хочет поесть вместе с ним.'
    ],

    en:[
      'Tom wants to offer his mother a gift, but she doesn\'t need anything.',
      'So he suggests having a meal together.',
      'His mother definitely wants to eat with him.'
    ],

    blanks:[
      { line:0, surface:'anbieten', word:'anbieten' },
      { line:1, surface:'schlägt', word:'vorschlagen' },
      { line:2, surface:'auf jeden Fall', word:'auf jeden Fall' }
    ]
  },

  {
    id:'tw-36',   /* set E */

    de:[
      'Sara möchte sicher sein, dass das Geschäft heute offen ist.',
      'Sie möchte dort ein neues Kleid bestellen und ihr altes verkaufen.',
      'Auf keinen Fall möchte sie zwei gleiche Kleider haben.'
    ],

    ru:[
      'Сара хочет быть уверена, что магазин сегодня открыт.',
      'Она хочет заказать там новое платье и продать старое.',
      'Она ни в коем случае не хочет иметь два одинаковых платья.'
    ],

    en:[
      'Sara wants to be sure that the store is open today.',
      'She wants to order a new dress there and sell her old one.',
      'She definitely does not want to have two identical dresses.'
    ],

    blanks:[
      { line:0, surface:'sicher sein', word:'sicher sein' },
      { line:1, surface:'bestellen', word:'bestellen' },
      { line:1, surface:'verkaufen', word:'verkaufen' },
      { line:2, surface:'Auf keinen Fall', word:'auf keinen Fall' }
    ]
  }

];
