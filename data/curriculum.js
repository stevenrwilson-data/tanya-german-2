/* Lessons.

   The layer the app has been missing. A grammar page explains and a game
   drills; neither teaches. A lesson does both in one sitting, and it takes
   the support away as it goes.

   Each lesson is a list of steps, and a step is one of four kinds:

     read   nothing to answer. A rule, a table, examples. She reads it.
     sort   a card and two or three bins. The fastest kind of answer.
     pick   a gap and a few options. The middle of the ladder.
     type   a gap and a keyboard. No options, no hints.

   The ladder matters more than the content. The same material appears
   three or four times at decreasing support, so by the end she is
   producing what she was recognising at the start. A lesson that only ever
   offers four buttons teaches her to eliminate three of them.

   Steps are deliberately short. Six to ten of them, five minutes. A lesson
   she does not finish teaches nothing, and one she finishes tired teaches
   less than one she finishes wanting another.

   Adding a lesson is a block in this file. Nothing in the engine knows
   about any particular lesson. */

window.GH_LESSONS = [

/* ==================================================================
   haben or sein

   The commonest mistake in the German perfect tense, and the one Russian
   gives no warning about: я пошла and я работала are built identically,
   so nothing in her first language flags that German splits them.

   It is also a closed set. Thirteen verbs she will actually meet take
   sein, and everything else takes haben — so unlike most of German
   grammar this can be finished rather than merely improved. That is why it
   is the first lesson.
   ================================================================== */
{
  id:'haben-sein',
  glyph:'\u2696',
  mins:5,
  name:{ ru:'haben или sein?', de:'haben oder sein?', en:'haben or sein?' },
  sub:{ ru:'Прошедшее время: с каким глаголом',
        de:'Perfekt: welches Hilfsverb',
        en:'The perfect tense: which helper' },
  /* which grammar page this belongs beside */
  topic:'past',

  steps:[

    { kind:'read',
      head:{ ru:'Две половины одного времени',
             de:'Zwei Hälften einer Zeit',
             en:'Two halves of one tense' },
      body:{
        ru:'Чтобы сказать о прошлом, немецкий берёт два слова: помощник и сам глагол в конце. Помощник почти всегда haben.',
        de:'Für die Vergangenheit nimmt Deutsch zwei Wörter: ein Hilfsverb und das Verb am Ende. Das Hilfsverb ist fast immer haben.',
        en:'To talk about the past, German uses two words: a helper, and the verb itself at the end. The helper is almost always haben.' },
      show:[
        { de:'Ich <b>habe</b> gestern gearbeitet.', gloss:{ ru:'Вчера я работала.', en:'I worked yesterday.' } },
        { de:'Ich <b>habe</b> viel Wasser getrunken.', gloss:{ ru:'Я выпила много воды.', en:'I drank a lot of water.' } },
        { de:'Sie <b>hat</b> an ihre Arbeit gedacht.', gloss:{ ru:'Она думала о своей работе.', en:'She thought about her work.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Но не всегда', de:'Aber nicht immer', en:'But not always' },
      body:{
        ru:'Небольшая группа глаголов берёт sein вместо haben. Это те, что про движение из одного места в другое — и про смену состояния.',
        de:'Eine kleine Gruppe nimmt sein statt haben: Verben der Bewegung von einem Ort zum anderen, und des Zustandswechsels.',
        en:'A small group takes sein instead. They are the verbs of moving from one place to another, and of changing state.' },
      show:[
        { de:'Ich <b>bin</b> zu Fu\u00df gegangen.', gloss:{ ru:'Я пошла пешком.', en:'I went on foot.' } },
        { de:'Sie <b>ist</b> mit dem Bus gefahren.', gloss:{ ru:'Она поехала на автобусе.', en:'She went by bus.' } },
        { de:'Er <b>ist</b> fr\u00fch aufgewacht.', gloss:{ ru:'Он рано проснулся.', en:'He woke up early.' } }
      ],
      note:{
        ru:'В русском разницы нет: «я пошла» и «я работала» устроены одинаково. Поэтому подсказки не будет — только список.',
        de:'Im Russischen gibt es diesen Unterschied nicht, deshalb hilft die Muttersprache hier nicht.',
        en:'Russian makes no such split — я пошла and я работала are built the same way. So there is nothing in her own language to warn her, only the list.' }
    },

    /* first rung: the verb alone, two bins */
    { kind:'sort',
      ask:{ ru:'Какой помощник?', de:'Welches Hilfsverb?', en:'Which helper?' },
      bins:[
        { id:'haben', label:'haben' },
        { id:'sein', label:'sein' }
      ],
      cards:[
        { text:'arbeiten',  bin:'haben' },
        { text:'gehen',     bin:'sein'  },
        { text:'essen',     bin:'haben' },
        { text:'fahren',    bin:'sein'  },
        { text:'kaufen',    bin:'haben' },
        { text:'kommen',    bin:'sein'  }
      ]
    },

    { kind:'read',
      head:{ ru:'Весь список', de:'Die ganze Liste', en:'The whole list' },
      body:{
        ru:'Их немного. Выучив эти тринадцать, всё остальное — haben.',
        de:'Es sind wenige. Wer diese dreizehn kennt, nimmt \u00fcberall sonst haben.',
        en:'There are not many. Learn these thirteen and everything else takes haben.' },
      table:[
        ['gehen',      'ist gegangen',     'go'],
        ['kommen',     'ist gekommen',     'come'],
        ['fahren',     'ist gefahren',     'travel'],
        ['laufen',     'ist gelaufen',     'run, walk'],
        ['fallen',     'ist gefallen',     'fall'],
        ['bleiben',    'ist geblieben',    'stay'],
        ['wachsen',    'ist gewachsen',    'grow'],
        ['aufwachen',  'ist aufgewacht',   'wake up'],
        ['einsteigen', 'ist eingestiegen', 'get on'],
        ['aussteigen', 'ist ausgestiegen', 'get off'],
        ['umsteigen',  'ist umgestiegen',  'change trains'],
        ['ankommen',   'ist angekommen',   'arrive'],
        ['abfahren',   'ist abgefahren',   'depart']
      ],
      note:{
        ru:'Обрати внимание: bleiben — «оставаться» — тоже sein, хотя никакого движения нет. Дело в том, где ты оказалась.',
        de:'Beachte: bleiben nimmt sein, obwohl es keine Bewegung ist — es geht darum, wo man endet.',
        en:'Notice bleiben — to stay — takes sein although nothing moves. It is about where you ended up, not the journey.' }
    },

    /* second rung: whole sentences, the helper removed */
    { kind:'pick',
      ask:{ ru:'Какое слово подходит?', de:'Welches Wort passt?', en:'Which word fits?' },
      rounds:[
        { de:'Gestern ___ ich lange gearbeitet.', answer:'habe', options:['habe','bin'],
          gloss:{ ru:'Вчера я долго работала.', en:'Yesterday I worked a long time.' } },
        { de:'Gestern ___ ich zu Fu\u00df gegangen.', answer:'bin', options:['habe','bin'],
          gloss:{ ru:'Вчера я пошла пешком.', en:'Yesterday I walked.' } },
        { de:'Sie ___ mit dem Zug gefahren.', answer:'ist', options:['hat','ist'],
          gloss:{ ru:'Она поехала на поезде.', en:'She travelled by train.' } },
        { de:'Sie ___ eine Pizza gegessen.', answer:'hat', options:['hat','ist'],
          gloss:{ ru:'Она съела пиццу.', en:'She ate a pizza.' } },
        { de:'Wir ___ zu Hause geblieben.', answer:'sind', options:['haben','sind'],
          gloss:{ ru:'Мы остались дома.', en:'We stayed at home.' } },
        { de:'Wir ___ viel gelernt.', answer:'haben', options:['haben','sind'],
          gloss:{ ru:'Мы много выучили.', en:'We learned a lot.' } }
      ]
    },

    /* third rung: four options, so the person has to be right too */
    { kind:'pick',
      ask:{ ru:'Теперь сложнее — следи и за лицом',
            de:'Jetzt schwerer — achte auch auf die Person',
            en:'Harder now — watch the person as well' },
      rounds:[
        { de:'Du ___ heute fr\u00fch aufgewacht.', answer:'bist', options:['bist','hast','ist','hat'],
          gloss:{ ru:'Ты рано проснулась.', en:'You woke up early.' } },
        { de:'Er ___ den Schl\u00fcssel gefunden.', answer:'hat', options:['hat','ist','habe','bin'],
          gloss:{ ru:'Он нашёл ключ.', en:'He found the key.' } },
        { de:'Ich ___ am Bahnhof umgestiegen.', answer:'bin', options:['bin','habe','ist','hat'],
          gloss:{ ru:'Я сделала пересадку на вокзале.', en:'I changed trains at the station.' } },
        { de:'Die Kinder ___ schnell gewachsen.', answer:'sind', options:['sind','haben','ist','hat'],
          gloss:{ ru:'Дети быстро выросли.', en:'The children grew quickly.' } }
      ]
    },

    /* last rung: no options at all */
    { kind:'type',
      ask:{ ru:'Впиши слово сама', de:'Schreib das Wort selbst', en:'Write the word yourself' },
      rounds:[
        { de:'Ich ___ gestern nach Berlin gefahren.', answer:'bin',
          gloss:{ ru:'Вчера я поехала в Берлин.', en:'Yesterday I travelled to Berlin.' } },
        { de:'Ich ___ ein Buch gelesen.', answer:'habe',
          gloss:{ ru:'Я читала книгу.', en:'I read a book.' } },
        { de:'Sie ___ an der falschen Station ausgestiegen.', answer:'ist',
          gloss:{ ru:'Она вышла не на той остановке.', en:'She got off at the wrong stop.' } },
        { de:'Wir ___ die Teller abgewaschen.', answer:'haben',
          gloss:{ ru:'Мы вымыли тарелки.', en:'We washed the plates.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'haben — почти всегда. sein — тринадцать глаголов про движение и смену состояния. Если сомневаешься, haben скорее прав.',
        de:'haben fast immer. sein bei dreizehn Verben der Bewegung und des Zustandswechsels. Im Zweifel ist haben wahrscheinlicher richtig.',
        en:'haben almost always. sein for thirteen verbs of movement and change of state. When in doubt, haben is the better guess.' },
      show:[
        { de:'Ich <b>habe</b> gegessen, geschlafen, gearbeitet, gelesen.',
          gloss:{ ru:'Ела, спала, работала, читала — всё с haben.', en:'Ate, slept, worked, read — all haben.' } },
        { de:'Ich <b>bin</b> gegangen, gefahren, gekommen, geblieben.',
          gloss:{ ru:'Шла, ехала, пришла, осталась — всё с sein.', en:'Went, travelled, came, stayed — all sein.' } }
      ]
    }

  ]
},

/* ==================================================================
   Separable verbs

   Four hundred and fifty examples in the app and no explanation anywhere.
   The prefix is the whole difficulty: it detaches, flies to the end of the
   sentence, and then in the past it comes back and the ge- lands *inside*
   it. Nothing in Russian does this — приходить keeps its при- wherever it
   goes — so she has no instinct to fall back on, only the pattern.
   ================================================================== */
{
  id:'separable',
  glyph:'\u2702',
  mins:6,
  name:{ ru:'\u0413\u043b\u0430\u0433\u043e\u043b\u044b, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0440\u0430\u0437\u0434\u0435\u043b\u044f\u044e\u0442\u0441\u044f',
         de:'Trennbare Verben', en:'Verbs that split' },
  sub:{ ru:'anrufen \u2192 ich rufe an', de:'anrufen \u2192 ich rufe an', en:'anrufen becomes ich rufe an' },
  topic:'irregular',

  steps:[

    { kind:'read',
      head:{ ru:'\u041f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430 \u0443\u0431\u0435\u0433\u0430\u0435\u0442 \u0432 \u043a\u043e\u043d\u0435\u0446',
             de:'Das Pr\u00e4fix wandert ans Ende', en:'The prefix runs to the end' },
      body:{
        ru:'\u041d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0433\u043b\u0430\u0433\u043e\u043b\u044b \u0441\u043e\u0441\u0442\u043e\u044f\u0442 \u0438\u0437 \u0434\u0432\u0443\u0445 \u0447\u0430\u0441\u0442\u0435\u0439. \u0412 \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0438 \u043f\u0435\u0440\u0432\u0430\u044f \u0447\u0430\u0441\u0442\u044c \u043e\u0442\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0438 \u0443\u0435\u0437\u0436\u0430\u0435\u0442 \u0432 \u0441\u0430\u043c\u044b\u0439 \u043a\u043e\u043d\u0435\u0446.',
        de:'Manche Verben bestehen aus zwei Teilen. Im Satz l\u00f6st sich der erste Teil und wandert ganz nach hinten.',
        en:'Some verbs are made of two parts. In a sentence the first part detaches and travels to the very end.' },
      show:[
        { de:'anrufen \u2192 Ich rufe meine Mutter <b>an</b>.', gloss:{ ru:'\u042f \u0437\u0432\u043e\u043d\u044e \u043c\u0430\u043c\u0435.', en:'I ring my mother.' } },
        { de:'aufstehen \u2192 Ich stehe um sieben <b>auf</b>.', gloss:{ ru:'\u042f \u0432\u0441\u0442\u0430\u044e \u0432 \u0441\u0435\u043c\u044c.', en:'I get up at seven.' } },
        { de:'fernsehen \u2192 Wir sehen am Abend <b>fern</b>.', gloss:{ ru:'\u0412\u0435\u0447\u0435\u0440\u043e\u043c \u043c\u044b \u0441\u043c\u043e\u0442\u0440\u0438\u043c \u0442\u0435\u043b\u0435\u0432\u0438\u0437\u043e\u0440.', en:'We watch television in the evening.' } }
      ],
      note:{
        ru:'\u0412 \u0440\u0443\u0441\u0441\u043a\u043e\u043c \u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430 \u043d\u0438\u043a\u0443\u0434\u0430 \u043d\u0435 \u0434\u0435\u0432\u0430\u0435\u0442\u0441\u044f: \u00ab\u043f\u0440\u0438\u0445\u043e\u0434\u0438\u0442\u044c\u00bb \u043e\u0441\u0442\u0430\u0451\u0442\u0441\u044f \u0441 \u0441\u0432\u043e\u0438\u043c \u043f\u0440\u0438-. \u041f\u043e\u044d\u0442\u043e\u043c\u0443 \u0437\u0434\u0435\u0441\u044c \u043d\u0435 \u043d\u0430 \u0447\u0442\u043e \u043e\u043f\u0435\u0440\u0435\u0442\u044c\u0441\u044f \u2014 \u0442\u043e\u043b\u044c\u043a\u043e \u043d\u0430 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0443.',
        de:'Im Russischen bleibt das Pr\u00e4fix, wo es ist. Hier gibt es also nichts, woran man sich festhalten kann, au\u00dfer der Gewohnheit.',
        en:'In Russian the prefix stays put: приходить keeps its при- wherever it goes. So there is nothing to fall back on here except the habit.' }
    },

    { kind:'sort',
      ask:{ ru:'\u042d\u0442\u043e\u0442 \u0433\u043b\u0430\u0433\u043e\u043b \u0440\u0430\u0437\u0434\u0435\u043b\u044f\u0435\u0442\u0441\u044f?',
            de:'Trennt sich dieses Verb?', en:'Does this verb split?' },
      bins:[
        { id:'yes', label:'anrufen \u2192 rufe an' },
        { id:'no',  label:'arbeiten \u2192 arbeite' }
      ],
      cards:[
        { text:'aufstehen', bin:'yes' },
        { text:'kochen',    bin:'no'  },
        { text:'mitnehmen', bin:'yes' },
        { text:'verstehen', bin:'no'  },
        { text:'einsteigen',bin:'yes' },
        { text:'besuchen',  bin:'no'  },
        { text:'abwaschen', bin:'yes' },
        { text:'bezahlen',  bin:'no'  }
      ]
    },

    { kind:'read',
      head:{ ru:'\u041a\u0430\u043a \u0443\u0437\u043d\u0430\u0442\u044c', de:'Woran man es erkennt', en:'How to tell' },
      body:{
        ru:'\u0420\u0430\u0437\u0434\u0435\u043b\u044f\u044e\u0442\u0441\u044f \u0442\u0435, \u0447\u044c\u044f \u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430 \u2014 \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0435 \u0441\u043b\u043e\u0432\u043e: an, auf, aus, ein, mit. \u041d\u0435 \u0440\u0430\u0437\u0434\u0435\u043b\u044f\u044e\u0442\u0441\u044f be-, ver-, ent-, er- \u2014 \u043e\u043d\u0438 \u0441\u0430\u043c\u0438 \u043f\u043e \u0441\u0435\u0431\u0435 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u0437\u043d\u0430\u0447\u0430\u0442.',
        de:'Trennbar sind die, deren Pr\u00e4fix ein eigenes Wort ist: an, auf, aus, ein, mit. Nicht trennbar sind be-, ver-, ent-, er- \u2014 die bedeuten allein nichts.',
        en:'A verb splits when its prefix is a word in its own right: an, auf, aus, ein, mit, ab, zu. It does not split on be-, ver-, ent-, er- — those mean nothing on their own.' },
      table:[
        ['an',   'anrufen',     'ring up'],
        ['auf',  'aufstehen',   'get up'],
        ['aus',  'ausschalten', 'switch off'],
        ['ein',  'einsteigen',  'get on'],
        ['mit',  'mitnehmen',   'take along'],
        ['ab',   'abfahren',    'depart'],
        ['zu',   'zumachen',    'close'],
        ['be-',  'bezahlen',    'does not split'],
        ['ver-', 'verstehen',   'does not split'],
        ['er-',  'erz\u00e4hlen',   'does not split']
      ]
    },

    { kind:'pick',
      ask:{ ru:'\u0413\u0434\u0435 \u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430?', de:'Wohin geh\u00f6rt das Pr\u00e4fix?', en:'Where does the prefix go?' },
      rounds:[
        { de:'Ich ___ meine Mutter an.', answer:'rufe', options:['rufe','anrufe'],
          gloss:{ ru:'\u042f \u0437\u0432\u043e\u043d\u044e \u043c\u0430\u043c\u0435.', en:'I ring my mother.' } },
        { de:'Sie ___ um sieben Uhr auf.', answer:'steht', options:['steht','aufsteht'],
          gloss:{ ru:'\u041e\u043d\u0430 \u0432\u0441\u0442\u0430\u0451\u0442 \u0432 \u0441\u0435\u043c\u044c.', en:'She gets up at seven.' } },
        { de:'Wir ___ den Schirm mit.', answer:'nehmen', options:['nehmen','mitnehmen'],
          gloss:{ ru:'\u041c\u044b \u0431\u0435\u0440\u0451\u043c \u0437\u043e\u043d\u0442.', en:'We take the umbrella.' } },
        { de:'Er ___ das Licht aus.', answer:'schaltet', options:['schaltet','ausschaltet'],
          gloss:{ ru:'\u041e\u043d \u0432\u044b\u043a\u043b\u044e\u0447\u0430\u0435\u0442 \u0441\u0432\u0435\u0442.', en:'He switches off the light.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'\u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u043c: ge- \u0432\u043d\u0443\u0442\u0440\u0438',
             de:'In der Vergangenheit: ge- in der Mitte', en:'In the past: ge- goes inside' },
      body:{
        ru:'\u0412 \u043f\u0440\u043e\u0448\u0435\u0434\u0448\u0435\u043c \u0432\u0440\u0435\u043c\u0435\u043d\u0438 \u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044f \u2014 \u0438 ge- \u0432\u0441\u0442\u0430\u0451\u0442 \u043c\u0435\u0436\u0434\u0443 \u043d\u0435\u0439 \u0438 \u0433\u043b\u0430\u0433\u043e\u043b\u043e\u043c. \u041d\u0435 geanrufen, \u0430 angerufen.',
        de:'Im Perfekt kommt das Pr\u00e4fix zur\u00fcck, und ge- steht dazwischen. Nicht geanrufen, sondern angerufen.',
        en:'In the perfect the prefix comes back, and ge- sits between it and the verb. Not geanrufen but angerufen.' },
      show:[
        { de:'Ich habe dich <b>an</b>ge<b>rufen</b>.', gloss:{ ru:'\u042f \u0442\u0435\u0431\u0435 \u0437\u0432\u043e\u043d\u0438\u043b\u0430.', en:'I rang you.' } },
        { de:'Er ist fr\u00fch <b>auf</b>ge<b>wacht</b>.', gloss:{ ru:'\u041e\u043d \u0440\u0430\u043d\u043e \u043f\u0440\u043e\u0441\u043d\u0443\u043b\u0441\u044f.', en:'He woke up early.' } },
        { de:'Wir sind am Bahnhof <b>um</b>ge<b>stiegen</b>.', gloss:{ ru:'\u041c\u044b \u043f\u0435\u0440\u0435\u0441\u0435\u043b\u0438 \u043d\u0430 \u0432\u043e\u043a\u0437\u0430\u043b\u0435.', en:'We changed trains at the station.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'\u041a\u0430\u043a \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e?', de:'Was ist richtig?', en:'Which is right?' },
      rounds:[
        { de:'Ich habe meine Mutter ___.', answer:'angerufen', options:['angerufen','geanrufen'],
          gloss:{ ru:'\u042f \u043f\u043e\u0437\u0432\u043e\u043d\u0438\u043b\u0430 \u043c\u0430\u043c\u0435.', en:'I rang my mother.' } },
        { de:'Sie ist sp\u00e4t ___.', answer:'aufgewacht', options:['aufgewacht','geaufwacht'],
          gloss:{ ru:'\u041e\u043d\u0430 \u043f\u043e\u0437\u0434\u043d\u043e \u043f\u0440\u043e\u0441\u043d\u0443\u043b\u0430\u0441\u044c.', en:'She woke up late.' } },
        { de:'Wir haben die Teller ___.', answer:'abgewaschen', options:['abgewaschen','geabwaschen'],
          gloss:{ ru:'\u041c\u044b \u0432\u044b\u043c\u044b\u043b\u0438 \u0442\u0430\u0440\u0435\u043b\u043a\u0438.', en:'We washed the plates.' } },
        { de:'Er hat das Video ___.', answer:'heruntergeladen', options:['heruntergeladen','geheruntergeladen'],
          gloss:{ ru:'\u041e\u043d \u0441\u043a\u0430\u0447\u0430\u043b \u0432\u0438\u0434\u0435\u043e.', en:'He downloaded the video.' } },
        { de:'Ich habe die T\u00fcr ___.', answer:'abgeschlossen', options:['abgeschlossen','geabschlossen'],
          gloss:{ ru:'\u042f \u0437\u0430\u043f\u0435\u0440\u043b\u0430 \u0434\u0432\u0435\u0440\u044c.', en:'I locked the door.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'\u0412\u043f\u0438\u0448\u0438 \u043f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0443, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u0443\u0431\u0435\u0436\u0430\u043b\u0430 \u0432 \u043a\u043e\u043d\u0435\u0446',
            de:'Schreib das Pr\u00e4fix, das ans Ende gewandert ist',
            en:'Write the prefix that ran to the end' },
      rounds:[
        { de:'anrufen \u2014 Ich rufe meinen Bruder ___.', answer:'an',
          gloss:{ ru:'\u042f \u0437\u0432\u043e\u043d\u044e \u0431\u0440\u0430\u0442\u0443.', en:'I ring my brother.' } },
        { de:'aufr\u00e4umen \u2014 Sie r\u00e4umt die K\u00fcche ___.', answer:'auf',
          gloss:{ ru:'\u041e\u043d\u0430 \u0443\u0431\u0438\u0440\u0430\u0435\u0442 \u043d\u0430 \u043a\u0443\u0445\u043d\u0435.', en:'She tidies the kitchen.' } },
        { de:'einsteigen \u2014 Wir steigen vorne ___.', answer:'ein',
          gloss:{ ru:'\u041c\u044b \u0441\u0430\u0434\u0438\u043c\u0441\u044f \u0432\u043f\u0435\u0440\u0435\u0434\u0438.', en:'We get on at the front.' } },
        { de:'fernsehen \u2014 Am Abend sehe ich ___.', answer:'fern',
          gloss:{ ru:'\u0412\u0435\u0447\u0435\u0440\u043e\u043c \u044f \u0441\u043c\u043e\u0442\u0440\u044e \u0442\u0435\u043b\u0435\u0432\u0438\u0437\u043e\u0440.', en:'In the evening I watch television.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'\u0418\u0442\u043e\u0433', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'\u041f\u0440\u0438\u0441\u0442\u0430\u0432\u043a\u0430-\u0441\u043b\u043e\u0432\u043e \u043e\u0442\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0438 \u0443\u0435\u0437\u0436\u0430\u0435\u0442 \u0432 \u043a\u043e\u043d\u0435\u0446. \u0412 \u043f\u0440\u043e\u0448\u043b\u043e\u043c \u043e\u043d\u0430 \u0432\u043e\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044f, \u0430 ge- \u043f\u0440\u044f\u0447\u0435\u0442\u0441\u044f \u0432\u043d\u0443\u0442\u0440\u044c.',
        de:'Ein Pr\u00e4fix, das ein eigenes Wort ist, l\u00f6st sich und geht ans Ende. Im Perfekt kommt es zur\u00fcck und ge- steckt in der Mitte.',
        en:'A prefix that is a word of its own detaches and goes to the end. In the perfect it comes back, with ge- tucked inside.' },
      show:[
        { de:'jetzt \u2014 Ich rufe dich <b>an</b>.', gloss:{ ru:'\u0421\u0435\u0439\u0447\u0430\u0441: \u044f \u0442\u0435\u0431\u0435 \u0437\u0432\u043e\u043d\u044e.', en:'Now: I ring you.' } },
        { de:'gestern \u2014 Ich habe dich <b>an</b>ge<b>rufen</b>.', gloss:{ ru:'\u0412\u0447\u0435\u0440\u0430: \u044f \u0442\u0435\u0431\u0435 \u0437\u0432\u043e\u043d\u0438\u043b\u0430.', en:'Yesterday: I rang you.' } },
        { de:'morgen \u2014 Ich werde dich <b>anrufen</b>.', gloss:{ ru:'\u0417\u0430\u0432\u0442\u0440\u0430: \u044f \u0442\u0435\u0431\u0435 \u043f\u043e\u0437\u0432\u043e\u043d\u044e \u2014 \u0442\u0443\u0442 \u0433\u043b\u0430\u0433\u043e\u043b \u0446\u0435\u043b\u044b\u0439.', en:'Tomorrow: I will ring you — here the verb stays whole.' } }
      ],
      note:{
        ru:'\u0417\u0430\u043c\u0435\u0442\u044c: \u0432 \u0431\u0443\u0434\u0443\u0449\u0435\u043c \u0441 werden \u0433\u043b\u0430\u0433\u043e\u043b \u043d\u0435 \u0440\u0430\u0437\u0434\u0435\u043b\u044f\u0435\u0442\u0441\u044f \u0432\u043e\u043e\u0431\u0449\u0435 \u2014 \u043e\u043d \u0441\u0442\u043e\u0438\u0442 \u0432 \u043a\u043e\u043d\u0446\u0435 \u0446\u0435\u043b\u0438\u043a\u043e\u043c.',
        de:'Beachte: mit werden bleibt das Verb ganz und steht komplett am Ende.',
        en:'Notice that with werden the verb does not split at all — it sits whole at the end.' }
    }

  ]
},

/* ==================================================================
   der, die, das — and where Russian lies

   Ninety-one of the app's nouns have a different gender in German from
   their Russian translation. That is the whole difficulty: she is not
   guessing from nothing, she is being actively misled by something she
   knows. Голова is feminine and der Kopf is masculine; вода is feminine
   and das Wasser is neuter.

   So this lesson does not teach der/die/das in general. It teaches the
   specific habit of not trusting the Russian.
   ================================================================== */
{
  id:'gender-clash',
  glyph:'\u2696',
  mins:6,
  name:{ ru:'Когда русский обманывает', de:'Wenn Russisch täuscht', en:'When Russian misleads' },
  sub:{ ru:'der · die · das и ложные подсказки',
        de:'der · die · das und falsche Freunde',
        en:'der, die, das and the false clues' },
  topic:'gender',

  steps:[

    { kind:'read',
      head:{ ru:'Род не переводится', de:'Genus wird nicht übersetzt', en:'Gender does not translate' },
      body:{
        ru:'В немецком у каждого существительного свой род, и он почти никогда не совпадает с русским. Это не совпадение, которое иногда ломается — это две независимые системы.',
        de:'Jedes deutsche Substantiv hat sein eigenes Genus, und es stimmt fast nie mit dem russischen überein. Es sind zwei unabhängige Systeme.',
        en:'Every German noun has its own gender, and it almost never matches the Russian one. These are two independent systems, not one system with exceptions.' },
      show:[
        { de:'<b>der</b> Kopf', gloss:{ ru:'голова — женский в русском, мужской в немецком', en:'голова is feminine; der Kopf is masculine' } },
        { de:'<b>das</b> Wasser', gloss:{ ru:'вода — женский в русском, средний в немецком', en:'вода is feminine; das Wasser is neuter' } },
        { de:'<b>die</b> Nase', gloss:{ ru:'нос — мужской в русском, женский в немецком', en:'нос is masculine; die Nase is feminine' } }
      ],
      note:{
        ru:'Девяносто одно слово в этом приложении расходится с русским. Это не редкость, а норма.',
        de:'Einundneunzig Wörter in dieser App weichen vom Russischen ab. Das ist nicht die Ausnahme.',
        en:'Ninety-one words in this app disagree with their Russian translation. That is not the exception, it is the ordinary case.' }
    },

    { kind:'sort',
      ask:{ ru:'Какой артикль?', de:'Welcher Artikel?', en:'Which article?' },
      bins:[
        { id:'der', label:'der' },
        { id:'die', label:'die' },
        { id:'das', label:'das' }
      ],
      cards:[
        { text:'Kopf',    bin:'der' },
        { text:'Nase',    bin:'die' },
        { text:'Wasser',  bin:'das' },
        { text:'Rücken',  bin:'der' },
        { text:'Bein',    bin:'das' },
        { text:'Hand',    bin:'die' },
        { text:'Spiegel', bin:'der' },
        { text:'Geschäft',bin:'das' }
      ]
    },

    { kind:'read',
      head:{ ru:'Кое-что всё же подсказывает', de:'Ein paar Hinweise gibt es doch', en:'A few endings do help' },
      body:{
        ru:'Полных правил нет, но окончания иногда выдают род. Это единственное, на что можно опереться.',
        de:'Es gibt keine vollständigen Regeln, aber manche Endungen verraten das Genus.',
        en:'There is no complete rule, but some endings give the gender away. This is the only thing to lean on.' },
      table:[
        ['-ung',   'die Wohnung',   'always die'],
        ['-heit',  'die Gesundheit','always die'],
        ['-keit',  'die Möglichkeit','always die'],
        ['-e',     'die Tasche',    'usually die'],
        ['-chen',  'das Brötchen',  'always das'],
        ['-lein',  'das Fräulein',  'always das'],
        ['-er',    'der Spiegel',   'often der'],
        ['-ling',  'der Frühling',  'always der']
      ],
      note:{
        ru:'-chen делает средним даже то, что заведомо женское: das Mädchen — девочка. Окончание сильнее смысла.',
        de:'-chen macht selbst Eindeutiges neutral: das Mädchen. Die Endung ist stärker als die Bedeutung.',
        en:'-chen makes a word neuter even when the thing plainly is not: das Mädchen, the girl. The ending beats the meaning.' }
    },

    { kind:'pick',
      ask:{ ru:'По окончанию', de:'Nach der Endung', en:'By the ending' },
      rounds:[
        { de:'___ Wohnung ist klein.', answer:'Die', options:['Der','Die','Das'],
          gloss:{ ru:'-ung всегда die.', en:'-ung is always die.' } },
        { de:'___ Brötchen ist frisch.', answer:'Das', options:['Der','Die','Das'],
          gloss:{ ru:'-chen всегда das.', en:'-chen is always das.' } },
        { de:'___ Zeitung liegt auf dem Tisch.', answer:'Die', options:['Der','Die','Das'],
          gloss:{ ru:'-ung снова die.', en:'-ung again.' } },
        { de:'___ Mädchen wartet draußen.', answer:'Das', options:['Der','Die','Das'],
          gloss:{ ru:'Девочка — но -chen сильнее.', en:'A girl — but -chen wins.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'А здесь окончание не поможет', de:'Hier hilft die Endung nicht', en:'Here the ending will not help' },
      rounds:[
        { de:'___ Kopf tut weh.', answer:'Der', options:['Der','Die','Das'],
          gloss:{ ru:'Голова болит. В русском женский — не верь.', en:'My head hurts. Feminine in Russian — do not trust it.' } },
        { de:'___ Wasser ist kalt.', answer:'Das', options:['Der','Die','Das'],
          gloss:{ ru:'Вода холодная.', en:'The water is cold.' } },
        { de:'___ Bein ist lang.', answer:'Das', options:['Der','Die','Das'],
          gloss:{ ru:'Нога длинная.', en:'The leg is long.' } },
        { de:'___ Spiegel hängt an der Wand.', answer:'Der', options:['Der','Die','Das'],
          gloss:{ ru:'Зеркало на стене.', en:'The mirror hangs on the wall.' } },
        { de:'___ Nase ist rot.', answer:'Die', options:['Der','Die','Das'],
          gloss:{ ru:'Нос красный.', en:'The nose is red.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши артикль', de:'Schreib den Artikel', en:'Write the article' },
      rounds:[
        { de:'___ Buch liegt auf dem Tisch.', answer:'Das',
          gloss:{ ru:'Книга на столе.', en:'The book is on the table.' } },
        { de:'___ Straße ist lang.', answer:'Die',
          gloss:{ ru:'Улица длинная.', en:'The street is long.' } },
        { de:'___ Schlüssel ist klein.', answer:'Der',
          gloss:{ ru:'Ключ маленький.', en:'The key is small.' } },
        { de:'___ Wetter ist schön.', answer:'Das',
          gloss:{ ru:'Погода хорошая.', en:'The weather is nice.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Русский род — не подсказка, а помеха. Учи слово вместе с артиклем, как одно целое: не «Kopf», а «der Kopf».',
        de:'Das russische Genus ist kein Hinweis, sondern eine Störung. Lerne das Wort mit dem Artikel als ein Stück.',
        en:'The Russian gender is not a clue, it is interference. Learn the word with its article as one piece: not Kopf but der Kopf.' }
    }

  ]
},

/* ==================================================================
   Plurals — which ending

   A hundred and forty-eight nouns with known plurals, in five families.
   The difficulty is that German has five patterns where Russian has one
   reliable habit, and nothing in the singular reliably says which family
   a noun belongs to — but the article and the ending together narrow it
   a great deal, and that narrowing is teachable.
   ================================================================== */
{
  id:'plural-families',
  glyph:'\ud83d\udc65',
  mins:6,
  name:{ ru:'Пять способов сказать «много»', de:'Fünf Wege zum Plural', en:'Five ways to say more than one' },
  sub:{ ru:'-n · -e · -er · -s · без изменений',
        de:'-n · -e · -er · -s · unverändert',
        en:'-n · -e · -er · -s · no change' },
  topic:'plural',

  steps:[

    { kind:'read',
      head:{ ru:'Одно правило, которое всегда верно',
             de:'Eine Regel, die immer stimmt', en:'One rule that is always true' },
      body:{
        ru:'Во множественном числе артикль всегда die. Всегда, без исключений — независимо от того, какой он был в единственном.',
        de:'Im Plural ist der Artikel immer die. Ohne Ausnahme, egal wie der Singular war.',
        en:'In the plural the article is always die. Always, without exception, whatever it was in the singular.' },
      show:[
        { de:'der Mann \u2192 <b>die</b> Männer', gloss:{ ru:'мужчина → мужчины', en:'man → men' } },
        { de:'das Kind \u2192 <b>die</b> Kinder', gloss:{ ru:'ребёнок → дети', en:'child → children' } },
        { de:'die Tasche \u2192 <b>die</b> Taschen', gloss:{ ru:'сумка → сумки', en:'bag → bags' } }
      ],
      note:{
        ru:'Это единственная бесплатная вещь в немецких существительных. Всё остальное придётся выучить.',
        de:'Das ist das Einzige, was hier geschenkt wird.',
        en:'That is the only thing German gives away free here. Everything else has to be learned.' }
    },

    { kind:'read',
      head:{ ru:'Пять семей', de:'Fünf Familien', en:'The five families' },
      body:{
        ru:'Окончаний всего пять. Иногда к ним добавляется умлаут — гласная меняется: a → ä, o → ö, u → ü.',
        de:'Es gibt fünf Endungen. Manchmal kommt ein Umlaut dazu: a → ä, o → ö, u → ü.',
        en:'There are five endings. Sometimes a vowel change comes with them: a → ä, o → ö, u → ü.' },
      table:[
        ['-n, -en', 'die Tasche \u2192 die Taschen', 'mostly die words'],
        ['-e',      'der Tisch \u2192 die Tische',    'mostly der words'],
        ['-er',     'das Kind \u2192 die Kinder',     'mostly das words'],
        ['-s',      'das Handy \u2192 die Handys',    'borrowed words'],
        ['nothing', 'der Löffel \u2192 die Löffel',   '-el, -en, -er endings'],
        ['\u2014',  'der Kopf \u2192 die Köpfe',      'with umlaut: o \u2192 ö'],
        ['\u2014',  'die Nacht \u2192 die Nächte',    'with umlaut: a \u2192 ä'],
        ['\u2014',  'der Apfel \u2192 die Äpfel',     'umlaut and nothing else']
      ]
    },

    { kind:'sort',
      ask:{ ru:'Какое окончание?', de:'Welche Endung?', en:'Which ending?' },
      bins:[
        { id:'n',    label:'-n / -en' },
        { id:'e',    label:'-e' },
        { id:'same', label:'nothing' }
      ],
      cards:[
        { text:'die Tasche',  bin:'n'    },
        { text:'der Tisch',   bin:'e'    },
        { text:'der Löffel',  bin:'same' },
        { text:'die Blume',   bin:'n'    },
        { text:'der Tag',     bin:'e'    },
        { text:'das Fenster', bin:'same' }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Множественное число', de:'Der Plural', en:'The plural' },
      rounds:[
        { de:'die Tasche \u2192 die ___', answer:'Taschen', options:['Taschen','Tasche','Tascher'],
          gloss:{ ru:'-e на конце → просто добавь -n.', en:'A word ending in -e just adds -n.' } },
        { de:'das Kind \u2192 die ___', answer:'Kinder', options:['Kinder','Kinde','Kinds'],
          gloss:{ ru:'das-слова часто берут -er.', en:'das words often take -er.' } },
        { de:'der Tisch \u2192 die ___', answer:'Tische', options:['Tische','Tischen','Tischer'],
          gloss:{ ru:'der-слова часто берут -e.', en:'der words often take -e.' } },
        { de:'das Handy \u2192 die ___', answer:'Handys', options:['Handys','Handyen','Handye'],
          gloss:{ ru:'Заимствования берут -s.', en:'Borrowed words take -s.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Теперь с умлаутом', de:'Jetzt mit Umlaut', en:'Now with the vowel change' },
      rounds:[
        { de:'der Kopf \u2192 die ___', answer:'Köpfe', options:['Köpfe','Kopfe','Köpfen','Kopfer'],
          gloss:{ ru:'o → ö, и -e.', en:'o becomes ö, and -e is added.' } },
        { de:'die Nacht \u2192 die ___', answer:'Nächte', options:['Nächte','Nachte','Nächten','Nachten'],
          gloss:{ ru:'a → ä, и -e.', en:'a becomes ä, and -e.' } },
        { de:'der Apfel \u2192 die ___', answer:'Äpfel', options:['Äpfel','Apfel','Äpfele','Apfeln'],
          gloss:{ ru:'Только умлаут — ничего не добавляется.', en:'Only the umlaut. Nothing is added.' } },
        { de:'das Handtuch \u2192 die ___', answer:'Handtücher', options:['Handtücher','Handtuche','Handtuchen','Handtücher n'],
          gloss:{ ru:'u → ü, и -er.', en:'u becomes ü, and -er.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши множественное число', de:'Schreib den Plural', en:'Write the plural' },
      rounds:[
        { de:'die Blume \u2192 die ___', answer:'Blumen',
          gloss:{ ru:'цветок → цветы', en:'flower → flowers' } },
        { de:'der Fisch \u2192 die ___', answer:'Fische',
          gloss:{ ru:'рыба → рыбы. Гласная не меняется.', en:'fish → fish. No vowel change here.' } },
        { de:'der Löffel \u2192 die ___', answer:'Löffel',
          gloss:{ ru:'ложка → ложки. Ничего не меняется.', en:'spoon → spoons. Nothing changes.' } },
        { de:'die Hand \u2192 die ___', answer:'Hände',
          gloss:{ ru:'рука → руки. a → ä.', en:'hand → hands. a becomes ä.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Артикль всегда die. Окончаний пять, и артикль единственного числа подсказывает, какое вероятнее: die → -n, der → -e, das → -er. Умлаут приходит вместе с окончанием, а иногда вместо него.',
        de:'Der Artikel ist immer die. Fünf Endungen, und der Singular-Artikel deutet an, welche: die → -n, der → -e, das → -er.',
        en:'The article is always die. Five endings, and the singular article hints at which: die → -n, der → -e, das → -er. The umlaut comes with the ending, and occasionally instead of it.' }
    }

  ]
},

/* ==================================================================
   Where or where to — the two-way prepositions

   Nine prepositions that take either case depending on whether something
   is moving. Russian does the same thing — в комнате against в комнату —
   which is the rare occasion when her first language actively helps, and
   the lesson leans on that rather than fighting it.
   ================================================================== */
{
  id:'two-way',
  glyph:'\ud83d\udccd',
  mins:5,
  name:{ ru:'Где или куда?', de:'Wo oder wohin?', en:'Where, or where to?' },
  sub:{ ru:'Девять предлогов с двумя падежами',
        de:'Neun Präpositionen, zwei Fälle',
        en:'Nine prepositions, two cases' },
  topic:'case',

  steps:[

    { kind:'read',
      head:{ ru:'Русский здесь помогает', de:'Russisch hilft hier', en:'Russian helps here' },
      body:{
        ru:'Девять предлогов меняют падеж в зависимости от того, есть ли движение. В русском то же самое: «в комнате» — где, «в комнату» — куда. Немецкий делает ровно это, только другими падежами.',
        de:'Neun Präpositionen wechseln den Fall, je nachdem ob Bewegung im Spiel ist. Russisch macht dasselbe.',
        en:'Nine prepositions change case depending on whether something moves. Russian does exactly this — в комнате against в комнату — so for once the instinct transfers.' },
      show:[
        { de:'Ich bin <b>in der</b> Küche.', gloss:{ ru:'Я на кухне — где. Dativ.', en:'I am in the kitchen — where. Dative.' } },
        { de:'Ich gehe <b>in die</b> Küche.', gloss:{ ru:'Я иду на кухню — куда. Akkusativ.', en:'I go into the kitchen — where to. Accusative.' } }
      ],
      note:{
        ru:'Вопрос простой: «где?» — Dativ. «куда?» — Akkusativ. Если предмет никуда не движется, это Dativ.',
        de:'Die Frage entscheidet: wo? → Dativ. wohin? → Akkusativ.',
        en:'The question decides it. Where? → dative. Where to? → accusative. If nothing is going anywhere, it is dative.' }
    },

    { kind:'read',
      head:{ ru:'Девять предлогов', de:'Die neun', en:'The nine' },
      body:{
        ru:'Только эти девять ведут себя так. Остальные предлоги всегда с одним падежом.',
        de:'Nur diese neun verhalten sich so.',
        en:'Only these nine behave this way. Every other preposition takes one fixed case.' },
      table:[
        ['in',       'in der / in die',       'in, into'],
        ['auf',      'auf dem / auf den',     'on, onto'],
        ['an',       'an der / an die',       'at, to'],
        ['über',     'über dem / über den',   'above, over'],
        ['unter',    'unter dem / unter den', 'under'],
        ['vor',      'vor dem / vor den',     'in front of'],
        ['hinter',   'hinter dem / hinter den','behind'],
        ['neben',    'neben dem / neben den', 'beside'],
        ['zwischen', 'zwischen dem / den',    'between']
      ]
    },

    { kind:'sort',
      ask:{ ru:'Где или куда?', de:'Wo oder wohin?', en:'Where, or where to?' },
      bins:[
        { id:'wo',    label:'wo? \u2014 Dativ' },
        { id:'wohin', label:'wohin? \u2014 Akkusativ' }
      ],
      cards:[
        { text:'Das Buch liegt auf dem Tisch.',   bin:'wo'    },
        { text:'Ich lege das Buch auf den Tisch.',bin:'wohin' },
        { text:'Sie sitzt in der Küche.',          bin:'wo'    },
        { text:'Sie geht in die Küche.',           bin:'wohin' },
        { text:'Die Katze schläft unter dem Bett.',bin:'wo'    },
        { text:'Die Katze läuft unter das Bett.',  bin:'wohin' }
      ]
    },

    { kind:'read',
      head:{ ru:'Глагол выдаёт ответ', de:'Das Verb verrät es', en:'The verb gives it away' },
      body:{
        ru:'Некоторые глаголы почти всегда означают «где», другие — «куда». Это надёжнее, чем гадать по смыслу.',
        de:'Manche Verben bedeuten fast immer wo, andere wohin.',
        en:'Some verbs almost always mean where, others almost always mean where to. That is more reliable than reasoning about the meaning each time.' },
      table:[
        ['liegen',  'wo? \u2014 Dativ',       'to be lying'],
        ['sitzen',  'wo? \u2014 Dativ',       'to be sitting'],
        ['stehen',  'wo? \u2014 Dativ',       'to be standing'],
        ['sein',    'wo? \u2014 Dativ',       'to be'],
        ['legen',   'wohin? \u2014 Akkusativ','to put down'],
        ['setzen',  'wohin? \u2014 Akkusativ','to set down'],
        ['stellen', 'wohin? \u2014 Akkusativ','to stand up'],
        ['gehen',   'wohin? \u2014 Akkusativ','to go']
      ],
      note:{
        ru:'liegen и legen — почти одно слово, но одно про покой, другое про движение. То же с sitzen/setzen и stehen/stellen.',
        de:'liegen und legen sind fast dasselbe Wort — eines ruht, eines bewegt.',
        en:'liegen and legen are nearly the same word, but one rests and one moves. The same goes for sitzen against setzen, and stehen against stellen.' }
    },

    { kind:'pick',
      ask:{ ru:'Какой артикль?', de:'Welcher Artikel?', en:'Which article?' },
      rounds:[
        { de:'Der Teller steht auf ___ Tisch.', answer:'dem', options:['dem','den'],
          gloss:{ ru:'stehen — стоит, никуда не движется.', en:'stehen — it is standing, not moving.' } },
        { de:'Ich stelle den Teller auf ___ Tisch.', answer:'den', options:['dem','den'],
          gloss:{ ru:'stellen — ставлю, есть движение.', en:'stellen — I am putting it there.' } },
        { de:'Die Schuhe sind unter ___ Bett.', answer:'dem', options:['dem','das'],
          gloss:{ ru:'sein — где.', en:'sein — where.' } },
        { de:'Ich lege die Schuhe unter ___ Bett.', answer:'das', options:['dem','das'],
          gloss:{ ru:'legen — куда.', en:'legen — where to.' } },
        { de:'Sie wartet vor ___ Haus.', answer:'dem', options:['dem','das'],
          gloss:{ ru:'warten — стоит и ждёт.', en:'warten — she is standing there.' } },
        { de:'Sie geht hinter ___ Haus.', answer:'das', options:['dem','das'],
          gloss:{ ru:'gehen — идёт.', en:'gehen — she is going there.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши артикль', de:'Schreib den Artikel', en:'Write the article' },
      rounds:[
        { de:'Die Lampe steht neben ___ Bett.', answer:'dem',
          gloss:{ ru:'Лампа стоит рядом с кроватью.', en:'The lamp stands beside the bed.' } },
        { de:'Ich hänge das Bild an ___ Wand.', answer:'die',
          gloss:{ ru:'Я вешаю картину на стену — есть движение.', en:'I hang the picture on the wall — movement.' } },
        { de:'Das Bild hängt an ___ Wand.', answer:'der',
          gloss:{ ru:'Картина висит на стене — покой.', en:'The picture hangs on the wall — at rest.' } },
        { de:'Der Hund läuft in ___ Garten.', answer:'den',
          gloss:{ ru:'Собака бежит в сад.', en:'The dog runs into the garden.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Спроси себя: где или куда? Где — Dativ: dem, der, dem. Куда — Akkusativ: den, die, das. Глагол почти всегда подскажет, какой это случай.',
        de:'Frage dich: wo oder wohin? Wo → Dativ. Wohin → Akkusativ. Das Verb sagt fast immer, welches.',
        en:'Ask yourself: where, or where to? Where takes the dative — dem, der, dem. Where to takes the accusative — den, die, das. The verb will nearly always tell you which.' }
    }

  ]
},

/* ==================================================================
   The verb comes second

   The single most audible mistake a Russian speaker makes in German, and
   the reason is exactly that Russian allows what German forbids. Сегодня
   я иду на работу is fine; Heute ich gehe zur Arbeit is not. Russian
   moves words freely because its endings carry the grammar. German has
   almost no endings left, so position does the work — and the second slot
   is reserved.
   ================================================================== */
{
  id:'verb-second',
  glyph:'\ud83e\udde9',
  mins:6,
  name:{ ru:'Глагол всегда второй', de:'Das Verb steht an zweiter Stelle', en:'The verb comes second' },
  sub:{ ru:'Heute gehe ich — не Heute ich gehe',
        de:'Heute gehe ich — nicht Heute ich gehe',
        en:'Heute gehe ich, never Heute ich gehe' },
  topic:'order',

  steps:[

    { kind:'read',
      head:{ ru:'Второе место занято', de:'Der zweite Platz ist besetzt', en:'The second slot is taken' },
      body:{
        ru:'В немецком предложении глагол стоит на втором месте. Не второе слово — второе место: то, что стоит первым, может быть длинным.',
        de:'Im deutschen Satz steht das Verb an zweiter Stelle. Nicht das zweite Wort, sondern die zweite Position.',
        en:'In a German sentence the verb takes the second position. Not the second word — the second slot, and what fills the first can be long.' },
      show:[
        { de:'Ich <b>gehe</b> heute zur Arbeit.', gloss:{ ru:'Я иду на работу.', en:'I go to work today.' } },
        { de:'Heute <b>gehe</b> ich zur Arbeit.', gloss:{ ru:'Сегодня я иду на работу — глагол не сдвинулся.', en:'Today I go to work — the verb has not moved.' } },
        { de:'Am Montag <b>gehe</b> ich zur Arbeit.', gloss:{ ru:'В понедельник — тоже одно место.', en:'On Monday — still one slot.' } }
      ],
      note:{
        ru:'Обрати внимание: когда впереди «heute», подлежащее уезжает за глагол. Не «Heute ich gehe», а «Heute gehe ich». Русский так не делает — и это самая заметная ошибка.',
        de:'Wenn heute vorne steht, rutscht das Subjekt hinter das Verb. Russisch macht das nicht.',
        en:'Notice that when heute comes first, the subject moves behind the verb. Russian does not do this, and it is the most audible mistake there is.' }
    },

    { kind:'sort',
      ask:{ ru:'Правильно или нет?', de:'Richtig oder falsch?', en:'Right or wrong?' },
      bins:[
        { id:'ok',  label:'\u2713 richtig' },
        { id:'bad', label:'\u2717 falsch' }
      ],
      cards:[
        { text:'Heute gehe ich zur Arbeit.',     bin:'ok'  },
        { text:'Heute ich gehe zur Arbeit.',     bin:'bad' },
        { text:'Morgen habe ich viel Zeit.',     bin:'ok'  },
        { text:'Morgen ich habe viel Zeit.',     bin:'bad' },
        { text:'Jetzt bin ich müde.',            bin:'ok'  },
        { text:'Jetzt ich bin müde.',            bin:'bad' },
        { text:'Am Abend koche ich Suppe.',      bin:'ok'  },
        { text:'Am Abend ich koche Suppe.',      bin:'bad' }
      ]
    },

    { kind:'read',
      head:{ ru:'Что может стоять первым', de:'Was vorne stehen kann', en:'What can go first' },
      body:{
        ru:'Первым может быть почти что угодно: подлежащее, время, место. Что бы там ни стояло — глагол сразу за ним.',
        de:'Fast alles kann vorne stehen. Was auch dort steht, das Verb kommt direkt danach.',
        en:'Almost anything can go first: the subject, a time, a place. Whatever stands there, the verb comes directly after it.' },
      table:[
        ['Ich',          'gehe',   'ins Bett.'],
        ['Heute',        'gehe',   'ich ins Bett.'],
        ['Um zehn',      'gehe',   'ich ins Bett.'],
        ['Jetzt',        'gehe',   'ich ins Bett.'],
        ['Nach der Arbeit','gehe', 'ich ins Bett.'],
        ['Manchmal',     'gehe',   'ich früh ins Bett.']
      ],
      note:{
        ru:'Средний столбец не двигается никогда. Это и есть правило.',
        de:'Die mittlere Spalte bewegt sich nie. Das ist die ganze Regel.',
        en:'The middle column never moves. That is the whole rule.' }
    },

    { kind:'pick',
      ask:{ ru:'Какой порядок?', de:'Welche Reihenfolge?', en:'Which order?' },
      rounds:[
        { de:'Heute ___ zur Arbeit.', answer:'gehe ich', options:['gehe ich','ich gehe'],
          gloss:{ ru:'Сегодня я иду на работу.', en:'Today I go to work.' } },
        { de:'Morgen ___ nach Berlin.', answer:'fahren wir', options:['fahren wir','wir fahren'],
          gloss:{ ru:'Завтра мы едем в Берлин.', en:'Tomorrow we travel to Berlin.' } },
        { de:'Am Abend ___ oft fern.', answer:'sieht er', options:['sieht er','er sieht'],
          gloss:{ ru:'Вечером он часто смотрит телевизор.', en:'In the evening he often watches television.' } },
        { de:'Jetzt ___ keine Zeit.', answer:'habe ich', options:['habe ich','ich habe'],
          gloss:{ ru:'Сейчас у меня нет времени.', en:'Right now I have no time.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Одно исключение: weil, dass, wenn',
             de:'Eine Ausnahme: weil, dass, wenn', en:'One exception: weil, dass, wenn' },
      body:{
        ru:'После weil, dass и wenn глагол уезжает в самый конец. Это единственный случай, когда второе место не работает.',
        de:'Nach weil, dass und wenn wandert das Verb ans Ende. Das ist der einzige Fall.',
        en:'After weil, dass and wenn the verb goes to the very end instead. That is the one place the second-slot rule does not apply.' },
      show:[
        { de:'Ich bleibe zu Hause, weil ich müde <b>bin</b>.', gloss:{ ru:'Я остаюсь дома, потому что устала.', en:'I am staying home because I am tired.' } },
        { de:'Ich glaube, dass sie recht <b>hat</b>.', gloss:{ ru:'Думаю, что она права.', en:'I think that she is right.' } },
        { de:'Wenn es regnet, bleibe ich zu Hause.', gloss:{ ru:'Если дождь, я остаюсь дома.', en:'If it rains, I stay home.' } }
      ],
      note:{
        ru:'В русском «потому что я устала» — глагол там же, где и был. По-немецки он должен уехать в конец.',
        de:'Im Russischen bleibt das Verb, wo es war. Im Deutschen muss es ans Ende.',
        en:'In Russian потому что я устала leaves the verb where it was. German makes it travel to the end.' }
    },

    { kind:'pick',
      ask:{ ru:'После weil', de:'Nach weil', en:'After weil' },
      rounds:[
        { de:'Ich bleibe zu Hause, weil ich müde ___.', answer:'bin', options:['bin','bin nicht'],
          gloss:{ ru:'…потому что я устала.', en:'…because I am tired.' } },
        { de:'Sie kommt später, weil sie viel Arbeit ___.', answer:'hat', options:['hat','hat viel'],
          gloss:{ ru:'…потому что у неё много работы.', en:'…because she has a lot of work.' } },
        { de:'Wir gehen nicht raus, weil es ___.', answer:'regnet', options:['regnet','regnet stark'],
          gloss:{ ru:'…потому что идёт дождь.', en:'…because it is raining.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши глагол на своё место', de:'Setz das Verb an die richtige Stelle', en:'Put the verb where it belongs' },
      rounds:[
        { de:'Heute ___ ich zu Hause. (bleiben)', answer:'bleibe',
          gloss:{ ru:'Сегодня я остаюсь дома.', en:'Today I am staying home.' } },
        { de:'Morgen ___ wir früh auf. (aufstehen)', answer:'stehen',
          gloss:{ ru:'Завтра мы встаём рано — приставка уже в конце.', en:'Tomorrow we get up early — the prefix is already at the end.' } },
        { de:'Ich bin müde, weil ich lange ___. (arbeiten)', answer:'arbeite',
          gloss:{ ru:'Я устала, потому что долго работаю.', en:'I am tired because I work long hours.' } },
        { de:'Am Montag ___ sie nach Berlin. (fahren)', answer:'fährt',
          gloss:{ ru:'В понедельник она едет в Берлин.', en:'On Monday she travels to Berlin.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Глагол — второй. Если впереди стоит что-то кроме подлежащего, подлежащее уезжает за глагол. Исключение одно: после weil, dass, wenn глагол уходит в конец.',
        de:'Das Verb steht zweitens. Steht etwas anderes vorne, rutscht das Subjekt hinter das Verb. Nach weil, dass, wenn geht das Verb ans Ende.',
        en:'The verb is second. If anything other than the subject comes first, the subject moves behind the verb. The one exception: after weil, dass and wenn, the verb goes to the end.' }
    }

  ]
},

/* ==================================================================
   Reflexive verbs

   Russian has -ся, which covers some of this and not all of it, and the
   partial overlap is worse than no overlap: she will assume the two match
   and be wrong in a specific place. And German has a second wrinkle
   Russian lacks entirely — mich against mir, depending on whether
   something else in the sentence is already the object.
   ================================================================== */
{
  id:'reflexive',
  glyph:'\ud83e\ude9e',
  mins:5,
  name:{ ru:'sich — глаголы на себя', de:'Reflexive Verben', en:'Verbs that turn back on you' },
  sub:{ ru:'ich wasche mich · ich wasche mir die Hände',
        de:'ich wasche mich · ich wasche mir die Hände',
        en:'ich wasche mich against ich wasche mir die Hände' },
  topic:'irregular',

  steps:[

    { kind:'read',
      head:{ ru:'Как русское -ся, но не совсем', de:'Wie -ся, aber nicht ganz', en:'Like -ся, but not quite' },
      body:{
        ru:'Некоторые немецкие глаголы требуют слова, указывающего на себя: mich, dich, sich. Похоже на русское -ся, но список глаголов другой.',
        de:'Manche Verben brauchen ein Wort, das auf einen selbst zeigt: mich, dich, sich.',
        en:'Some German verbs need a word pointing back at yourself: mich, dich, sich. It works like Russian -ся, but the list of verbs is not the same.' },
      show:[
        { de:'Ich wasche <b>mich</b>.', gloss:{ ru:'Я мою\u0301сь.', en:'I wash myself.' } },
        { de:'Ich strecke <b>mich</b>.', gloss:{ ru:'Я потягиваюсь.', en:'I stretch.' } },
        { de:'Sie freut <b>sich</b>.', gloss:{ ru:'Она радуется.', en:'She is pleased.' } }
      ],
      note:{
        ru:'Совпадение частичное, и это хуже, чем никакого: «отдыхать» по-русски без -ся, а по-немецки sich ausruhen — с sich.',
        de:'Die Überschneidung ist teilweise, und das ist schlimmer als keine.',
        en:'The overlap is partial, which is worse than none: отдыхать has no -ся, but German says sich ausruhen with the sich.' }
    },

    { kind:'read',
      head:{ ru:'Формы', de:'Die Formen', en:'The forms' },
      body:{
        ru:'Слово меняется по лицу, кроме третьего — там всегда sich.',
        de:'Das Wort ändert sich mit der Person, außer in der dritten — dort immer sich.',
        en:'The word changes with the person, except in the third, where it is always sich.' },
      table:[
        ['ich',     'mich',  'ich wasche mich'],
        ['du',      'dich',  'du wäschst dich'],
        ['er, sie', 'sich',  'sie wäscht sich'],
        ['wir',     'uns',   'wir waschen uns'],
        ['ihr',     'euch',  'ihr wascht euch'],
        ['sie, Sie','sich',  'sie waschen sich']
      ]
    },

    { kind:'sort',
      ask:{ ru:'Нужно ли sich?', de:'Braucht es sich?', en:'Does it need sich?' },
      bins:[
        { id:'yes', label:'sich \u2026' },
        { id:'no',  label:'no sich' }
      ],
      cards:[
        { text:'strecken \u2014 to stretch',   bin:'yes' },
        { text:'kochen \u2014 to cook',        bin:'no'  },
        { text:'ausruhen \u2014 to rest',      bin:'yes' },
        { text:'lesen \u2014 to read',         bin:'no'  },
        { text:'anziehen \u2014 to get dressed',bin:'yes' },
        { text:'arbeiten \u2014 to work',      bin:'no'  }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какая форма?', de:'Welche Form?', en:'Which form?' },
      rounds:[
        { de:'Ich strecke ___ am Morgen.', answer:'mich', options:['mich','sich','dich'],
          gloss:{ ru:'Я потягиваюсь утром.', en:'I stretch in the morning.' } },
        { de:'Sie freut ___ über das Geschenk.', answer:'sich', options:['mich','sich','dich'],
          gloss:{ ru:'Она радуется подарку.', en:'She is pleased about the present.' } },
        { de:'Wir ruhen ___ nach der Arbeit aus.', answer:'uns', options:['uns','sich','euch'],
          gloss:{ ru:'Мы отдыхаем после работы.', en:'We rest after work.' } },
        { de:'Du wäschst ___ jeden Morgen.', answer:'dich', options:['dich','mich','sich'],
          gloss:{ ru:'Ты умываешься каждое утро.', en:'You wash every morning.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'mich или mir', de:'mich oder mir', en:'mich or mir' },
      body:{
        ru:'Если в предложении есть другой объект, sich переходит в дательный: mich → mir. «Я мою руки» — руки уже объект, значит mir.',
        de:'Steht ein anderes Objekt im Satz, wird mich zu mir.',
        en:'If something else in the sentence is already the object, mich becomes mir. I wash my hands — the hands are the object, so it is mir.' },
      show:[
        { de:'Ich wasche <b>mich</b>.', gloss:{ ru:'Я мою\u0301сь. Больше объектов нет.', en:'I wash myself. Nothing else is the object.' } },
        { de:'Ich wasche <b>mir</b> die Hände.', gloss:{ ru:'Я мою руки. Руки — объект, поэтому mir.', en:'I wash my hands. The hands are the object, so mir.' } },
        { de:'Ich putze <b>mir</b> die Zähne.', gloss:{ ru:'Я чищу зубы.', en:'I brush my teeth.' } }
      ],
      note:{
        ru:'Немцы не говорят «мои руки» — они говорят «руки» и ставят mir. Притяжательное не нужно.',
        de:'Man sagt nicht meine Hände, sondern die Hände und mir.',
        en:'German does not say my hands here. It says the hands, and lets mir do the possessing.' }
    },

    { kind:'pick',
      ask:{ ru:'mich или mir?', de:'mich oder mir?', en:'mich or mir?' },
      rounds:[
        { de:'Ich wasche ___.', answer:'mich', options:['mich','mir'],
          gloss:{ ru:'Я мою\u0301сь — других объектов нет.', en:'I wash. No other object.' } },
        { de:'Ich wasche ___ die Haare.', answer:'mir', options:['mich','mir'],
          gloss:{ ru:'Я мою волосы — волосы объект.', en:'I wash my hair — the hair is the object.' } },
        { de:'Ich putze ___ die Zähne.', answer:'mir', options:['mich','mir'],
          gloss:{ ru:'Я чищу зубы.', en:'I brush my teeth.' } },
        { de:'Ich strecke ___ nach dem Schlaf.', answer:'mich', options:['mich','mir'],
          gloss:{ ru:'Я потягиваюсь после сна.', en:'I stretch after sleeping.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши слово', de:'Schreib das Wort', en:'Write the word' },
      rounds:[
        { de:'Sie zieht ___ ein blaues Kleid an.', answer:'sich',
          gloss:{ ru:'Она надевает синее платье.', en:'She puts on a blue dress.' } },
        { de:'Wir setzen ___ auf das Sofa.', answer:'uns',
          gloss:{ ru:'Мы садимся на диван.', en:'We sit down on the sofa.' } },
        { de:'Ich kämme ___ die Haare.', answer:'mir',
          gloss:{ ru:'Я расчёсываю волосы — есть объект.', en:'I comb my hair — there is an object.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'sich-глаголы надо просто выучить — русское -ся тут только сбивает. Форма меняется по лицу, а если в предложении есть другой объект, mich превращается в mir.',
        de:'Reflexive Verben muss man lernen. Die Form richtet sich nach der Person, und bei einem weiteren Objekt wird mich zu mir.',
        en:'The reflexive verbs have to be learned as a list — Russian -ся only misleads here. The form follows the person, and when something else is the object, mich becomes mir.' }
    }

  ]
},

/* ==================================================================
   Adjective endings

   The hardest thing in this set, and worth being honest about that. Every
   adjective before a noun takes an ending, and which one depends on the
   article, the gender and the case at once. A full table has forty-eight
   cells and teaching it that way teaches nothing.

   So this lesson does not show the table. It teaches the one thing that
   is nearly always true — after der, die and das almost everything is -e
   or -en — and lets the rest arrive by exposure. An approximate rule she
   uses beats a complete one she avoids.
   ================================================================== */
{
  id:'adjective-endings',
  glyph:'\ud83c\udfa8',
  mins:6,
  name:{ ru:'Окончания прилагательных', de:'Adjektivendungen', en:'Adjective endings' },
  sub:{ ru:'das große Haus — почему -e',
        de:'das große Haus — warum -e',
        en:'das große Haus — why the -e' },
  topic:'gender',

  steps:[

    { kind:'read',
      head:{ ru:'Перед существительным — всегда окончание',
             de:'Vor einem Substantiv immer eine Endung',
             en:'Before a noun there is always an ending' },
      body:{
        ru:'Прилагательное после sein стоит без окончания. Но если оно стоит перед существительным, окончание обязательно.',
        de:'Nach sein steht das Adjektiv ohne Endung. Vor einem Substantiv braucht es immer eine.',
        en:'After sein an adjective takes no ending at all. Put it in front of a noun and it always needs one.' },
      show:[
        { de:'Das Haus ist <b>groß</b>.', gloss:{ ru:'Дом большой — окончания нет.', en:'The house is big — no ending.' } },
        { de:'Das <b>große</b> Haus.', gloss:{ ru:'Большой дом — окончание -e.', en:'The big house — the -e ending.' } },
        { de:'Die Suppe ist <b>heiß</b>. \u2192 Die <b>heiße</b> Suppe.', gloss:{ ru:'То же самое с другим словом.', en:'The same shift with another word.' } }
      ],
      note:{
        ru:'В русском прилагательное меняется всегда — и перед словом, и после. По-немецки после sein оно замирает. Это первое, что стоит запомнить.',
        de:'Im Russischen ändert sich das Adjektiv immer. Im Deutschen bleibt es nach sein unverändert.',
        en:'Russian changes the adjective in both positions. German freezes it after sein, and that difference is the first thing worth noticing.' }
    },

    { kind:'sort',
      ask:{ ru:'Нужно окончание?', de:'Braucht es eine Endung?', en:'Does it need an ending?' },
      bins:[
        { id:'no',  label:'gro\u00df' },
        { id:'yes', label:'gro\u00dfe' }
      ],
      cards:[
        { text:'Das Haus ist ___',   bin:'no'  },
        { text:'Das ___ Haus',       bin:'yes' },
        { text:'Die Suppe ist ___',  bin:'no'  },
        { text:'Die ___ Suppe',      bin:'yes' },
        { text:'Der Tisch ist ___',  bin:'no'  },
        { text:'Der ___ Tisch',      bin:'yes' }
      ]
    },

    { kind:'read',
      head:{ ru:'Почти всегда -e или -en', de:'Fast immer -e oder -en', en:'Almost always -e or -en' },
      body:{
        ru:'Полная таблица — сорок восемь клеток, и она бесполезна. Но после der, die, das работает почти всегда одно правило: -e, а если слово стоит как объект или во множественном — -en.',
        de:'Die vollständige Tabelle hat achtundvierzig Felder und hilft nicht. Nach der, die, das gilt fast immer: -e, und -en beim Objekt oder im Plural.',
        en:'The full table has forty-eight cells and helps nobody. But after der, die and das one rule is nearly always right: -e, and -en when the thing is an object or a plural.' },
      table:[
        ['der',  'der gro\u00dfe Tisch',    '-e'],
        ['die',  'die gro\u00dfe Suppe',    '-e'],
        ['das',  'das gro\u00dfe Haus',     '-e'],
        ['plural','die gro\u00dfen H\u00e4user', '-en'],
        ['object','den gro\u00dfen Tisch',  '-en'],
        ['dative','dem gro\u00dfen Tisch',  '-en']
      ],
      note:{
        ru:'То есть: -e в самом простом случае, -en во всех остальных после der/die/das. Это неполное правило, но верное в большинстве случаев — а правилом, которое помнишь, пользуешься.',
        de:'Also: -e im einfachsten Fall, sonst -en. Unvollständig, aber meistens richtig.',
        en:'So: -e in the simplest case, -en in the rest. It is an incomplete rule that is right most of the time — and a rule you remember is a rule you use.' }
    },

    { kind:'pick',
      ask:{ ru:'Какое окончание?', de:'Welche Endung?', en:'Which ending?' },
      rounds:[
        { de:'Das ___ Haus steht dort. (groß)', answer:'große', options:['große','großen'],
          gloss:{ ru:'Простой случай — -e.', en:'The simple case — -e.' } },
        { de:'Ich mag die ___ Suppe. (heiß)', answer:'heiße', options:['heiße','heißen'],
          gloss:{ ru:'die Suppe как объект остаётся die — значит -e.', en:'die Suppe as object is still die, so -e.' } },
        { de:'Ich sehe den ___ Tisch. (klein)', answer:'kleinen', options:['kleine','kleinen'],
          gloss:{ ru:'den — объект мужского рода, значит -en.', en:'den is a masculine object, so -en.' } },
        { de:'Die ___ Häuser sind alt. (groß)', answer:'großen', options:['große','großen'],
          gloss:{ ru:'Множественное — -en.', en:'Plural takes -en.' } },
        { de:'Sie sitzt auf dem ___ Sofa. (weich)', answer:'weichen', options:['weiche','weichen'],
          gloss:{ ru:'dem — Dativ, значит -en.', en:'dem is dative, so -en.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'После ein чуть иначе', de:'Nach ein etwas anders', en:'After ein it differs slightly' },
      body:{
        ru:'После ein прилагательное берёт на себя работу артикля: оно должно показать род. Поэтому у мужского -er, у среднего -es.',
        de:'Nach ein übernimmt das Adjektiv die Arbeit des Artikels und zeigt das Genus: -er, -es.',
        en:'After ein the adjective has to do the article\u2019s job and show the gender, so masculine takes -er and neuter takes -es.' },
      show:[
        { de:'ein <b>großer</b> Tisch', gloss:{ ru:'der Tisch → -er, потому что ein ничего не показывает.', en:'der Tisch → -er, because ein shows nothing.' } },
        { de:'eine <b>große</b> Suppe', gloss:{ ru:'die Suppe → -e, как обычно.', en:'die Suppe → -e, as usual.' } },
        { de:'ein <b>großes</b> Haus', gloss:{ ru:'das Haus → -es.', en:'das Haus → -es.' } }
      ],
      note:{
        ru:'Смотри: der → -er, das → -es. Прилагательное просто заканчивается тем же, чем артикль. Это работает и запоминается.',
        de:'Das Adjektiv endet wie der Artikel: der → -er, das → -es.',
        en:'Look at it this way: the adjective ends the way the article would have. der → -er, das → -es. That trick works and it sticks.' }
    },

    { kind:'pick',
      ask:{ ru:'После ein', de:'Nach ein', en:'After ein' },
      rounds:[
        { de:'Das ist ein ___ Tisch. (groß)', answer:'großer', options:['große','großer','großes'],
          gloss:{ ru:'der Tisch → -er.', en:'der Tisch → -er.' } },
        { de:'Das ist ein ___ Haus. (alt)', answer:'altes', options:['alte','alter','altes'],
          gloss:{ ru:'das Haus → -es.', en:'das Haus → -es.' } },
        { de:'Das ist eine ___ Tasche. (neu)', answer:'neue', options:['neue','neuer','neues'],
          gloss:{ ru:'die Tasche → -e.', en:'die Tasche → -e.' } },
        { de:'Ich kaufe einen ___ Tisch. (klein)', answer:'kleinen', options:['kleine','kleinen','kleiner'],
          gloss:{ ru:'einen — объект, значит -en.', en:'einen is the object, so -en.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши прилагательное с окончанием',
            de:'Schreib das Adjektiv mit Endung',
            en:'Write the adjective with its ending' },
      rounds:[
        { de:'Ich trinke den ___ Kaffee. (heiß)', answer:'heißen',
          gloss:{ ru:'Я пью горячий кофе.', en:'I drink the hot coffee.' } },
        { de:'Das ist ein ___ Tag. (schön)', answer:'schöner',
          gloss:{ ru:'Это хороший день. der Tag → -er.', en:'That is a nice day. der Tag → -er.' } },
        { de:'Die ___ Schuhe sind neu. (blau)', answer:'blauen',
          gloss:{ ru:'Синие туфли новые. Множественное → -en.', en:'The blue shoes are new. Plural → -en.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'После sein — без окончания. Перед существительным после der/die/das — -e в простом случае и -en во всех остальных. После ein прилагательное берёт окончание артикля: -er для der, -es для das. Полная таблица не нужна — нужна привычка.',
        de:'Nach sein keine Endung. Nach der/die/das -e oder -en. Nach ein übernimmt das Adjektiv die Artikelendung.',
        en:'After sein, no ending. Before a noun with der, die or das, -e in the simple case and -en otherwise. After ein the adjective borrows the article\u2019s ending. The full table is not the point; the habit is.' }
    }

  ]
},

/* ==================================================================
   Commands

   The app had zero examples of this before now, which was the largest hole
   in it: she is surrounded by commands every day — on signs, in shops,
   from strangers — and could not produce one.

   Russian helps here more than anywhere else in the app. It makes the same
   social split, приходи against приходите, so she already knows when to
   use which. What she does not know is how German builds them, and that
   the separable prefix goes to the end.
   ================================================================== */
{
  id:'imperative',
  glyph:'\u261d',
  mins:6,
  name:{ ru:'Приказы и просьбы', de:'Befehle und Bitten', en:'Commands and requests' },
  sub:{ ru:'Komm! · Kommen Sie! — кому что говорить',
        de:'Komm! · Kommen Sie! — wem was',
        en:'Komm! and Kommen Sie! — who gets which' },
  topic:'irregular',

  steps:[

    { kind:'read',
      head:{ ru:'Здесь русский помогает', de:'Hier hilft Russisch', en:'Russian helps here' },
      body:{
        ru:'В русском есть «приходи» и «приходите» — своему и незнакомому. В немецком то же самое: Komm! и Kommen Sie!. Когда что говорить, ты уже знаешь. Осталось выучить, как они делаются.',
        de:'Russisch hat приходи und приходите. Deutsch macht dasselbe: Komm! und Kommen Sie!. Die Entscheidung kennst du schon.',
        en:'Russian has приходи for someone you know and приходите for a stranger. German does the same: Komm! and Kommen Sie!. You already know which to use — only the forming is new.' },
      show:[
        { de:'<b>Komm</b> bitte um sieben.', gloss:{ ru:'Приходи, пожалуйста, в семь. — своему.', en:'Please come at seven — to someone you know.' } },
        { de:'<b>Kommen Sie</b> bitte herein.', gloss:{ ru:'Войдите, пожалуйста. — незнакомому.', en:'Please come in — to a stranger.' } }
      ],
      note:{
        ru:'bitte стоит почти в каждой просьбе. Без него команда звучит резко — а с ним это уже вежливо, даже в форме du.',
        de:'bitte steht in fast jeder Bitte. Ohne klingt es scharf.',
        en:'bitte belongs in nearly every request. Without it a command sounds sharp; with it even the du form is polite.' }
    },

    { kind:'read',
      head:{ ru:'Форма для своих', de:'Die du-Form', en:'The du form' },
      body:{
        ru:'Берёшь форму du и убираешь и du, и окончание -st. Остаётся голый глагол.',
        de:'Nimm die du-Form und streiche du und die Endung -st.',
        en:'Take the du form and remove both the du and the -st ending. What is left is the command.' },
      table:[
        ['du kommst',  'Komm!',   'come'],
        ['du wartest', 'Warte!',  'wait'],
        ['du machst',  'Mach!',   'do, make'],
        ['du kaufst',  'Kauf!',   'buy'],
        ['du nimmst',  'Nimm!',   'take'],
        ['du gibst',   'Gib!',    'give'],
        ['du liest',   'Lies!',   'read'],
        ['du f\u00e4hrst',  'Fahr!',   'drive \u2014 the umlaut goes']
      ],
      note:{
        ru:'Заметь fahren: du fährst, но команда — Fahr!, без умлаута. Гласная возвращается на место. А вот nimm и gib меняются и остаются изменёнными.',
        de:'Bei fahren verschwindet der Umlaut: du f\u00e4hrst, aber Fahr!. Bei nimm und gib bleibt der Wechsel.',
        en:'Notice fahren: du f\u00e4hrst but Fahr!, with the umlaut gone. The a comes back. But nimm and gib keep their change.' }
    },

    { kind:'sort',
      ask:{ ru:'Какая это форма?', de:'Welche Form ist das?', en:'Which form is this?' },
      bins:[
        { id:'du',  label:'\u0441\u0432\u043e\u0435\u043c\u0443 \u2014 du' },
        { id:'sie', label:'\u043d\u0435\u0437\u043d\u0430\u043a\u043e\u043c\u043e\u043c\u0443 \u2014 Sie' }
      ],
      cards:[
        { text:'Warte bitte hier.',        bin:'du'  },
        { text:'Warten Sie bitte drau\u00dfen.',bin:'sie' },
        { text:'Nimm den n\u00e4chsten Bus.',   bin:'du'  },
        { text:'Nehmen Sie den n\u00e4chsten Bus.', bin:'sie' },
        { text:'Ruf mich sp\u00e4ter an.',       bin:'du'  },
        { text:'Rufen Sie morgen wieder an.', bin:'sie' },
        { text:'Lies bitte diese Nachricht.', bin:'du' },
        { text:'\u00d6ffnen Sie bitte das Fenster.', bin:'sie' }
      ]
    },

    { kind:'read',
      head:{ ru:'Форма для незнакомых', de:'Die Sie-Form', en:'The Sie form' },
      body:{
        ru:'Здесь проще: берёшь инфинитив как есть и ставишь после него Sie. Ничего не меняется.',
        de:'Einfacher: Infinitiv plus Sie. Nichts ver\u00e4ndert sich.',
        en:'This one is easier: the infinitive as it stands, then Sie. Nothing changes at all.' },
      table:[
        ['kommen',   'Kommen Sie!',   'come'],
        ['warten',   'Warten Sie!',   'wait'],
        ['nehmen',   'Nehmen Sie!',   'take'],
        ['lesen',    'Lesen Sie!',    'read'],
        ['fahren',   'Fahren Sie!',   'drive'],
        ['bezahlen', 'Bezahlen Sie!', 'pay']
      ],
      note:{
        ru:'Никаких исключений. Это самая простая форма во всём немецком языке — глагол в словарной форме плюс Sie.',
        de:'Keine Ausnahmen. Wahrscheinlich die einfachste Form im ganzen Deutschen.',
        en:'No exceptions anywhere. It is probably the simplest form in the whole language: dictionary verb, then Sie.' }
    },

    { kind:'pick',
      ask:{ ru:'Как сказать своему?', de:'Wie sagt man es zu einem Freund?', en:'How would you say it to a friend?' },
      rounds:[
        { de:'___ bitte hier. (warten)', answer:'Warte', options:['Warte','Warten'],
          gloss:{ ru:'Подожди, пожалуйста, здесь.', en:'Please wait here.' } },
        { de:'___ den n\u00e4chsten Bus. (nehmen)', answer:'Nimm', options:['Nimm','Nehme'],
          gloss:{ ru:'Сядь на следующий автобус. e \u2192 i остаётся.', en:'Take the next bus. The e \u2192 i change stays.' } },
        { de:'___ mir bitte die Tasche. (geben)', answer:'Gib', options:['Gib','Gebe'],
          gloss:{ ru:'Дай мне, пожалуйста, сумку.', en:'Please give me the bag.' } },
        { de:'___ langsam nach Hause. (fahren)', answer:'Fahr', options:['Fahr','F\u00e4hr'],
          gloss:{ ru:'Езжай домой медленно. Умлаут уходит.', en:'Drive home slowly. The umlaut goes.' } },
        { de:'___ bitte etwas Brot. (kaufen)', answer:'Kauf', options:['Kauf','Kaufe'],
          gloss:{ ru:'Купи, пожалуйста, немного хлеба.', en:'Please buy some bread.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Приставка уезжает в конец', de:'Das Pr\u00e4fix wandert ans Ende', en:'The prefix goes to the end' },
      body:{
        ru:'Если глагол разделяемый, приставка уходит в самый конец — как и в обычном предложении. В русском такого нет вообще.',
        de:'Bei trennbaren Verben geht das Pr\u00e4fix ans Ende, genau wie im normalen Satz.',
        en:'If the verb is separable, the prefix goes right to the end, exactly as in an ordinary sentence. Russian has nothing like this.' },
      show:[
        { de:'anrufen \u2192 <b>Ruf</b> mich sp\u00e4ter <b>an</b>.', gloss:{ ru:'Позвони мне позже.', en:'Call me later.' } },
        { de:'zumachen \u2192 <b>Mach</b> bitte die T\u00fcr <b>zu</b>.', gloss:{ ru:'Закрой, пожалуйста, дверь.', en:'Please close the door.' } },
        { de:'aussteigen \u2192 <b>Steig</b> hier <b>aus</b>.', gloss:{ ru:'Выйди здесь.', en:'Get off here.' } },
        { de:'ausf\u00fcllen \u2192 <b>F\u00fcllen Sie</b> dieses Formular <b>aus</b>.', gloss:{ ru:'Заполните эту форму. — и в вежливой форме тоже.', en:'Fill out this form — the same in the polite form.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Куда денется приставка?', de:'Wohin geht das Pr\u00e4fix?', en:'Where does the prefix go?' },
      rounds:[
        { de:'___ mich sp\u00e4ter an. (anrufen, du)', answer:'Ruf', options:['Ruf','Anruf','Rufe an'],
          gloss:{ ru:'Позвони мне позже.', en:'Call me later.' } },
        { de:'___ bitte das Licht an. (anmachen, du)', answer:'Mach', options:['Mach','Anmach','Mache an'],
          gloss:{ ru:'Включи, пожалуйста, свет.', en:'Please turn on the light.' } },
        { de:'___ hier aus. (aussteigen, Sie)', answer:'Steigen Sie', options:['Steigen Sie','Aussteigen Sie','Steig Sie'],
          gloss:{ ru:'Выйдите здесь.', en:'Get off here.' } },
        { de:'___ deine Jacke an. (anziehen, du)', answer:'Zieh', options:['Zieh','Anzieh','Ziehe an'],
          gloss:{ ru:'Надень свою куртку.', en:'Put on your jacket.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Как сказать «не делай»', de:'Wie man nicht sagt', en:'Saying do not' },
      body:{
        ru:'Просто добавляешь nicht после глагола. Ничего больше не меняется.',
        de:'Einfach nicht nach dem Verb. Sonst \u00e4ndert sich nichts.',
        en:'Simply put nicht after the verb. Nothing else changes.' },
      show:[
        { de:'<b>Lauf nicht</b> \u00fcber die Stra\u00dfe.', gloss:{ ru:'Не перебегай улицу.', en:'Do not run across the street.' } },
        { de:'<b>Vergiss</b> deinen Schl\u00fcssel <b>nicht</b>.', gloss:{ ru:'Не забудь свой ключ. — nicht в конце.', en:'Do not forget your key — nicht at the end here.' } }
      ],
      note:{
        ru:'Место nicht зависит от того, есть ли после глагола объект. Если есть — nicht уходит за него.',
        de:'Die Stelle von nicht h\u00e4ngt vom Objekt ab.',
        en:'Where nicht sits depends on whether an object follows the verb. If one does, nicht goes after it.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши команду', de:'Schreib den Befehl', en:'Write the command' },
      rounds:[
        { de:'___ bitte die T\u00fcr zu. (machen, du)', answer:'Mach',
          gloss:{ ru:'Закрой, пожалуйста, дверь.', en:'Please close the door.' } },
        { de:'___ Sie bitte hier. (unterschreiben)', answer:'Unterschreiben',
          gloss:{ ru:'Подпишите, пожалуйста, здесь.', en:'Please sign here.' } },
        { de:'___ bitte diese Nachricht. (lesen, du)', answer:'Lies',
          gloss:{ ru:'Прочитай, пожалуйста, это сообщение.', en:'Please read this message.' } },
        { de:'___ Sie bitte etwas langsamer. (sprechen)', answer:'Sprechen',
          gloss:{ ru:'Говорите, пожалуйста, немного медленнее.', en:'Please speak a little more slowly.' } },
        { de:'___ dich bitte hierhin. (setzen, du)', answer:'Setz',
          gloss:{ ru:'Сядь, пожалуйста, сюда.', en:'Please sit down here.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Своему: форма du без du и без -st. Незнакомому: инфинитив плюс Sie. Приставка — в конец. nicht — после глагола. И bitte почти всегда.',
        de:'Zu Bekannten: du-Form ohne du und ohne -st. Zu Fremden: Infinitiv plus Sie. Das Pr\u00e4fix ans Ende, nicht nach dem Verb, und fast immer bitte.',
        en:'To someone you know: the du form without the du and without the -st. To a stranger: the infinitive plus Sie. The prefix goes to the end, nicht goes after the verb, and bitte goes in almost always.' },
      show:[
        { de:'Komm! \u00b7 Warte! \u00b7 Nimm! \u00b7 Gib! \u00b7 Lies! \u00b7 Fahr!', gloss:{ ru:'Своему.', en:'To someone you know.' } },
        { de:'Kommen Sie! \u00b7 Warten Sie! \u00b7 Nehmen Sie!', gloss:{ ru:'Незнакомому.', en:'To a stranger.' } }
      ]
    }

  ]
},

/* ==================================================================
   Prepositions with a fixed case

   The two-way lesson taught the nine that need a decision. These twelve
   need none: each takes one case and keeps it, whatever is happening in
   the sentence.

   Russian helps with the idea and not with the answer, which is the
   awkward middle. She already knows a preposition can change what follows
   it — с другом, для друга, без билета — so the concept transfers
   perfectly. But the cases do not line up: German mit takes the dative
   where Russian с takes the instrumental, and German für takes the
   accusative where Russian для takes the genitive. So the instinct that
   something must change is right, and the instinct about what it changes
   to is wrong. The only strategy is to learn each preposition together
   with its case, as one item.
   ================================================================== */
{
  id:'fixed-case',
  glyph:'\ud83d\udd12',
  mins:7,
  name:{ ru:'Предлоги с одним падежом', de:'Präpositionen mit festem Fall', en:'Prepositions with a fixed case' },
  sub:{ ru:'mit dem · für den — и никогда иначе',
        de:'mit dem · für den — immer gleich',
        en:'mit dem, für den — and never otherwise' },
  topic:'case',

  steps:[

    { kind:'read',
      head:{ ru:'Русский помогает наполовину', de:'Russisch hilft halb', en:'Russian helps halfway' },
      body:{
        ru:'Ты уже знаешь, что предлог меняет форму слова: с другом, для друга, без билета. Идея та же. Но падежи не совпадают: немецкое mit требует Dativ, а русское «с» — творительный. für требует Akkusativ, а «для» — родительный.',
        de:'Du weißt schon, dass eine Präposition die Form ändert: с другом, для друга. Die Idee stimmt, die Fälle nicht.',
        en:'You already know a preposition changes what follows it — с другом, для друга, без билета. The idea carries over perfectly. The cases do not: German mit wants the dative where Russian с wants the instrumental.' },
      show:[
        { de:'Ich fahre <b>mit dem</b> Bus.', gloss:{ ru:'Я еду на автобусе. mit — всегда Dativ.', en:'I am going by bus. mit is always dative.' } },
        { de:'Das Geschenk ist <b>für den</b> Mann.', gloss:{ ru:'Подарок для мужчины. für — всегда Akkusativ.', en:'The present is for the man. für is always accusative.' } }
      ],
      note:{
        ru:'Значит, копировать русский падеж нельзя. Учить надо предлог вместе с падежом, как одно слово: mit + Dativ, für + Akkusativ.',
        de:'Man kann den russischen Fall nicht übernehmen. Präposition und Fall gehören zusammen gelernt.',
        en:'So the Russian case cannot be copied across. Learn the preposition and its case as a single item: mit plus dative, für plus accusative.' }
    },

    { kind:'read',
      head:{ ru:'Восемь с Dativ', de:'Acht mit Dativ', en:'Eight take the dative' },
      body:{
        ru:'Есть строчка, которую немецкие школьники учат наизусть: aus, außer, bei, mit, nach, seit, von, zu. Стоит выучить её так же.',
        de:'Es gibt einen Merksatz, den deutsche Kinder lernen: aus, außer, bei, mit, nach, seit, von, zu.',
        en:'German schoolchildren learn these as one line: aus, außer, bei, mit, nach, seit, von, zu. Worth learning the same way.' },
      table:[
        ['aus',   'aus dem Supermarkt', 'out of, from'],
        ['außer', 'außer mir',          'except for'],
        ['bei',   'bei dem Arzt',       'at, near'],
        ['mit',   'mit dem Bus',        'with, by'],
        ['nach',  'nach der Arbeit',    'after, to'],
        ['seit',  'seit einem Monat',   'since, for'],
        ['von',   'von meinem Bruder',  'from, of'],
        ['zu',    'zu dem Bahnhof',     'to'],
        ['gegen\u00fcber', 'gegen\u00fcber dem Bahnhof', 'opposite']
      ],
      note:{
        ru:'После них: der → dem, das → dem, die → der. А во множественном числе — den, и к самому слову добавляется -n: mit den Kindern.',
        de:'Danach: der → dem, das → dem, die → der. Im Plural den, und das Substantiv bekommt ein -n: mit den Kindern.',
        en:'After these: der becomes dem, das becomes dem, die becomes der. In the plural it is den, and the noun itself takes an -n: mit den Kindern.' }
    },

    { kind:'read',
      head:{ ru:'Как их сокращают', de:'Die Kurzformen', en:'How they contract' },
      body:{
        ru:'В обычной речи четыре из них сливаются с артиклем. Это не другое слово — просто короче, и слышишь ты почти всегда именно так.',
        de:'Vier davon verschmelzen mit dem Artikel. Kein anderes Wort, nur kürzer.',
        en:'Four of them merge with the article in ordinary speech. Not a different word, just shorter — and this is almost always what she will actually hear.' },
      table:[
        ['bei dem', 'beim',  'beim Arzt'],
        ['von dem', 'vom',   'vom Bahnhof'],
        ['zu dem',  'zum',   'zum Supermarkt'],
        ['zu der',  'zur',   'zur Arbeit']
      ],
      note:{
        ru:'zur Arbeit, zum Arzt, beim Bäcker, vom Bahnhof — их услышишь в Берлине сто раз в день.',
        de:'zur Arbeit, zum Arzt, beim Bäcker — das hört man hundertmal am Tag.',
        en:'zur Arbeit, zum Arzt, beim Bäcker, vom Bahnhof — she will hear these a hundred times a day in Berlin.' }
    },

    { kind:'read',
      head:{ ru:'Пять с Akkusativ', de:'F\u00fcnf mit Akkusativ', en:'Five take the accusative' },
      body:{
        ru:'Тоже одна строчка: durch, für, gegen, ohne, um. Всё остальное распространённое — Dativ.',
        de:'Auch eine Zeile: durch, f\u00fcr, gegen, ohne, um. Fast alles andere ist Dativ.',
        en:'Another single line: durch, für, gegen, ohne, um. Almost everything else common is dative.' },
      table:[
        ['durch', 'durch den Park',    'through'],
        ['f\u00fcr',   'f\u00fcr meinen Sohn',  'for'],
        ['gegen', 'gegen den Wind',    'against, around'],
        ['ohne',  'ohne meinen Schl\u00fcssel', 'without'],
        ['um',    'um den Tisch',      'around, at']
      ],
      note:{
        ru:'Хорошая новость: в Akkusativ меняется только мужской род — der → den. die, das и множественное остаются как есть. То есть запомнить надо ровно одно изменение.',
        de:'Im Akkusativ \u00e4ndert sich nur der Maskulin: der → den. Alles andere bleibt.',
        en:'The good news: in the accusative only the masculine changes, der to den. die, das and the plural all stay as they are. So there is exactly one change to remember.' }
    },

    { kind:'sort',
      ask:{ ru:'Какой падеж требует этот предлог?', de:'Welcher Fall?', en:'Which case does this one take?' },
      bins:[
        { id:'dat', label:'Dativ \u2014 dem, der' },
        { id:'akk', label:'Akkusativ \u2014 den' }
      ],
      cards:[
        { text:'mit',   bin:'dat' },
        { text:'f\u00fcr',   bin:'akk' },
        { text:'aus',   bin:'dat' },
        { text:'durch', bin:'akk' },
        { text:'nach',  bin:'dat' },
        { text:'ohne',  bin:'akk' },
        { text:'seit',  bin:'dat' },
        { text:'um',    bin:'akk' },
        { text:'von',   bin:'dat' },
        { text:'gegen', bin:'akk' }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какой артикль?', de:'Welcher Artikel?', en:'Which article?' },
      rounds:[
        { de:'Ich fahre mit ___ Bus.', answer:'dem', options:['dem','den'],
          gloss:{ ru:'Я еду на автобусе.', en:'I am going by bus.' } },
        { de:'Wir gehen durch ___ Park.', answer:'den', options:['dem','den'],
          gloss:{ ru:'Мы идём через парк.', en:'We are walking through the park.' } },
        { de:'Tanya spricht mit ___ \u00c4rztin.', answer:'der', options:['der','die'],
          gloss:{ ru:'Таня разговаривает с врачом.', en:'Tanya is speaking with the doctor.' } },
        { de:'Ich kaufe Blumen f\u00fcr ___ Mutter.', answer:'meine', options:['meine','meiner'],
          gloss:{ ru:'Я покупаю цветы для мамы. f\u00fcr — Akkusativ, die остаётся.', en:'für takes the accusative, and die stays die.' } },
        { de:'Nach ___ Arbeit f\u00e4hrt sie nach Hause.', answer:'der', options:['der','die'],
          gloss:{ ru:'После работы она едет домой.', en:'After work she goes home.' } },
        { de:'Das Geschenk ist f\u00fcr ___ Sohn.', answer:'meinen', options:['meinen','meinem'],
          gloss:{ ru:'Подарок для сына.', en:'The present is for my son.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'mit и für рядом', de:'mit und f\u00fcr im Vergleich', en:'mit and für side by side' },
      body:{
        ru:'Два самых частых предлога, и падежи у них разные. Стоит посмотреть их вместе — тогда видно, что меняется только мужской род.',
        de:'Zwei sehr h\u00e4ufige Pr\u00e4positionen mit verschiedenen F\u00e4llen.',
        en:'Two of the commonest prepositions, and they take different cases. Put them side by side and it becomes clear how little actually changes.' },
      table:[
        ['der Mann',    'mit dem Mann',     'f\u00fcr den Mann'],
        ['das Kind',    'mit dem Kind',     'f\u00fcr das Kind'],
        ['die Frau',    'mit der Frau',     'f\u00fcr die Frau'],
        ['die Kinder',  'mit den Kindern',  'f\u00fcr die Kinder']
      ],
      note:{
        ru:'Заметь: für меняет только первую строчку. mit меняет все четыре. Поэтому Dativ и приходится учить, а Akkusativ почти сам собой получается.',
        de:'f\u00fcr \u00e4ndert nur die erste Zeile, mit alle vier.',
        en:'Notice that für changes only the first row while mit changes all four. That is why the dative has to be learned and the accusative almost looks after itself.' }
    },

    { kind:'read',
      head:{ ru:'С местоимениями то же самое', de:'Auch bei Pronomen', en:'The same with pronouns' },
      body:{
        ru:'Правило работает и для «меня», «тебя», «него». После mit — дательные формы, после für — винительные.',
        de:'Die Regel gilt auch f\u00fcr Pronomen: nach mit Dativ, nach f\u00fcr Akkusativ.',
        en:'The rule applies to me, you and him as well. After mit come the dative forms, after für the accusative ones.' },
      table:[
        ['ich',  'mit mir',    'f\u00fcr mich'],
        ['du',   'mit dir',    'f\u00fcr dich'],
        ['er',   'mit ihm',    'f\u00fcr ihn'],
        ['sie',  'mit ihr',    'f\u00fcr sie'],
        ['wir',  'mit uns',    'f\u00fcr uns'],
        ['sie',  'mit ihnen',  'f\u00fcr sie'],
        ['Sie',  'mit Ihnen',  'f\u00fcr Sie']
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какое местоимение?', de:'Welches Pronomen?', en:'Which pronoun?' },
      rounds:[
        { de:'Ist dieser Platz f\u00fcr ___?', answer:'mich', options:['mich','mir'],
          gloss:{ ru:'Это место для меня? f\u00fcr — Akkusativ.', en:'Is this seat for me? für takes the accusative.' } },
        { de:'Kommst du mit ___?', answer:'mir', options:['mich','mir'],
          gloss:{ ru:'Пойдёшь со мной? mit — Dativ.', en:'Are you coming with me? mit takes the dative.' } },
        { de:'Das Geschenk ist f\u00fcr ___.', answer:'ihn', options:['ihn','ihm'],
          gloss:{ ru:'Подарок для него.', en:'The present is for him.' } },
        { de:'Sie spricht mit ___.', answer:'ihm', options:['ihn','ihm'],
          gloss:{ ru:'Она говорит с ним.', en:'She is speaking with him.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Теперь с сокращениями', de:'Jetzt mit Kurzformen', en:'Now with the contractions' },
      rounds:[
        { de:'Sie f\u00e4hrt jeden Morgen ___ Arbeit.', answer:'zur', options:['zur','zum'],
          gloss:{ ru:'die Arbeit → zu der → zur.', en:'die Arbeit → zu der → zur.' } },
        { de:'Wir gehen ___ Supermarkt.', answer:'zum', options:['zur','zum'],
          gloss:{ ru:'der Supermarkt → zu dem → zum.', en:'der Supermarkt → zu dem → zum.' } },
        { de:'Ich komme gerade ___ Arzt.', answer:'vom', options:['vom','beim'],
          gloss:{ ru:'Я только что от врача. von dem → vom.', en:'I have just come from the doctor. von dem → vom.' } },
        { de:'Wir treffen uns ___ Bahnhof.', answer:'beim', options:['beim','zum'],
          gloss:{ ru:'Мы встречаемся у вокзала. bei dem → beim.', en:'We are meeting near the station. bei dem → beim.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши артикль', de:'Schreib den Artikel', en:'Write the article' },
      rounds:[
        { de:'Sie nimmt das Brot aus ___ Tasche.', answer:'der',
          gloss:{ ru:'Она достаёт хлеб из сумки. aus + Dativ, die Tasche → der.', en:'She takes the bread out of the bag. aus plus dative.' } },
        { de:'Der Brief ist von ___ Bruder. (mein)', answer:'meinem',
          gloss:{ ru:'Письмо от моего брата.', en:'The letter is from my brother.' } },
        { de:'Die Kinder laufen um ___ Tisch.', answer:'den',
          gloss:{ ru:'Дети бегают вокруг стола.', en:'The children are running around the table.' } },
        { de:'Ich gehe nie ohne ___ Schl\u00fcssel. (mein)', answer:'meinen',
          gloss:{ ru:'Я никогда не ухожу без ключа.', en:'I never leave without my key.' } },
        { de:'Ich lerne seit ___ Monat Deutsch. (ein)', answer:'einem',
          gloss:{ ru:'Я учу немецкий уже месяц.', en:'I have been learning German for a month.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'aus, außer, bei, mit, nach, seit, von, zu — Dativ. durch, für, gegen, ohne, um — Akkusativ. Русский подсказывает, что что-то поменяется, но не подсказывает что. Учи предлог вместе с падежом.',
        de:'aus, außer, bei, mit, nach, seit, von, zu sind Dativ. durch, f\u00fcr, gegen, ohne, um sind Akkusativ.',
        en:'aus, außer, bei, mit, nach, seit, von, zu take the dative. durch, für, gegen, ohne, um take the accusative. Russian tells her something will change but not what to. Learn the preposition and its case together.' },
      show:[
        { de:'aus \u00b7 au\u00dfer \u00b7 bei \u00b7 mit \u00b7 nach \u00b7 seit \u00b7 von \u00b7 zu', gloss:{ ru:'\u2014 всегда Dativ.', en:'always dative.' } },
        { de:'durch \u00b7 f\u00fcr \u00b7 gegen \u00b7 ohne \u00b7 um', gloss:{ ru:'\u2014 всегда Akkusativ.', en:'always accusative.' } }
      ]
    }

  ]
},

/* ==================================================================
   mein, dein, sein, ihr

   Two decisions, not one, and that is the whole lesson. The owner chooses
   the beginning of the word; the thing owned chooses the end of it. Get
   those the wrong way round and you produce *seine Mutter* when you meant
   his mother — which is right — but also *ihr Mutter* when you meant hers,
   which is not.

   Russian helps with the agreement and then hands her a trap. мой, моя,
   моё already agree with the noun, so the idea is familiar. But Russian
   has свой, which sidesteps the question of who entirely — Таня ищет свой
   ключ works whoever Таня is. German has no свой. It makes her name the
   owner every single time, and that is the habit this lesson is really
   building.
   ================================================================== */
{
  id:'possessive',
  glyph:'\ud83e\udd1d',
  mins:7,
  name:{ ru:'мой, твой, его, её', de:'mein, dein, sein, ihr', en:'mein, dein, sein, ihr' },
  sub:{ ru:'Хозяин выбирает начало, вещь — конец',
        de:'Der Besitzer w\u00e4hlt den Anfang, das Ding die Endung',
        en:'The owner picks the start, the thing picks the ending' },
  topic:'gender',

  steps:[

    { kind:'read',
      head:{ ru:'Два решения, не одно', de:'Zwei Entscheidungen', en:'Two decisions, not one' },
      body:{
        ru:'Сначала смотришь, кто хозяин — от этого зависит начало слова. Потом смотришь на саму вещь — от неё зависит окончание. Две разные вещи, и путать их нельзя.',
        de:'Erst der Besitzer — davon h\u00e4ngt der Anfang ab. Dann das Ding — davon die Endung.',
        en:'First look at who owns it: that decides the start of the word. Then look at the thing itself: that decides the ending. Two separate questions.' },
      show:[
        { de:'<b>seine</b> Mutter', gloss:{ ru:'его мама. Хозяин — он, значит sein-. Mutter женского рода, значит -e.', en:'his mother. The owner is male, so sein-. Mutter is feminine, so -e.' } },
        { de:'<b>ihr</b> Bruder', gloss:{ ru:'её брат. Хозяйка — она, значит ihr-. Bruder мужского рода, окончания нет.', en:'her brother. The owner is female, so ihr-. Bruder is masculine, so no ending.' } }
      ],
      note:{
        ru:'Заметь, как это сбивает: «его мама» — seine, с женским окончанием, хотя хозяин мужчина. Хозяин на окончание не влияет вообще.',
        de:'seine Mutter — weibliche Endung, m\u00e4nnlicher Besitzer. Der Besitzer beeinflusst die Endung nie.',
        en:'Notice how that reads wrongly at first: his mother is seine, with a feminine ending, though the owner is male. The owner never touches the ending.' }
    },

    { kind:'read',
      head:{ ru:'Начало — по хозяину', de:'Der Anfang: der Besitzer', en:'The start: who owns it' },
      body:{
        ru:'Восемь слов. Заглавная буква у Ihr важна: ihr Name — её имя, Ihr Name — Ваше имя.',
        de:'Acht W\u00f6rter. Die Gro\u00dfschreibung z\u00e4hlt: ihr Name gegen Ihr Name.',
        en:'Eight words, and the capital letter matters: ihr Name is her name, Ihr Name is your name, formally.' },
      table:[
        ['ich',  'mein',  'my'],
        ['du',   'dein',  'your'],
        ['er',   'sein',  'his'],
        ['sie',  'ihr',   'her'],
        ['es',   'sein',  'its'],
        ['wir',  'unser', 'our'],
        ['ihr',  'euer',  'your, several people'],
        ['sie',  'ihr',   'their'],
        ['Sie',  'Ihr',   'your, formal']
      ],
      note:{
        ru:'ihr — это и «её», и «их». Различает только смысл. А euer при добавлении окончания теряет вторую e: eure Schwester, а не euere.',
        de:'ihr hei\u00dft her und their. euer verliert das zweite e: eure, euren.',
        en:'ihr means both her and their; only the context separates them. And euer drops its second e once it takes an ending: eure Schwester, not euere.' }
    },

    { kind:'read',
      head:{ ru:'Окончание — по вещи', de:'Die Endung: das Ding', en:'The ending: the thing owned' },
      body:{
        ru:'Окончания те же, что у ein. Знаешь ein — знаешь их все. Учить надо один набор, а не восемь.',
        de:'Die Endungen sind die von ein. Ein Satz f\u00fcr alle acht W\u00f6rter.',
        en:'The endings are those of ein. One set covers all eight words, so there is nothing new to learn per word.' },
      table:[
        ['Nominativ', 'mein Bruder',   'meine Schwester'],
        ['\u2014',    'mein Kind',     'meine Freunde'],
        ['Akkusativ', 'meinen Bruder', 'meine Schwester'],
        ['\u2014',    'mein Kind',     'meine Freunde'],
        ['Dativ',     'meinem Bruder', 'meiner Schwester'],
        ['\u2014',    'meinem Kind',   'meinen Freunden']
      ],
      note:{
        ru:'В Akkusativ меняется только мужской род: mein → meinen. Всё остальное как в Nominativ. Так что запомнить надо одно изменение, а не четыре.',
        de:'Im Akkusativ \u00e4ndert sich nur der Maskulin: mein → meinen.',
        en:'In the accusative only the masculine changes, mein to meinen. Everything else is as it was, so that is one change to remember rather than four.' }
    },

    { kind:'sort',
      ask:{ ru:'Какое начало?', de:'Welcher Anfang?', en:'Which word?' },
      bins:[
        { id:'sein', label:'sein\u2026 \u2014 \u0435\u0433\u043e' },
        { id:'ihr',  label:'ihr\u2026 \u2014 \u0435\u0451' }
      ],
      cards:[
        { text:'Markus sucht ___ Schl\u00fcssel.',  bin:'sein' },
        { text:'Anna sucht ___ Schl\u00fcssel.',    bin:'ihr'  },
        { text:'Nazar nimmt ___ Rucksack.',    bin:'sein' },
        { text:'Tanya hilft ___ Freundin.',    bin:'ihr'  },
        { text:'Er repariert ___ Fahrrad.',    bin:'sein' },
        { text:'Sie tr\u00e4gt ___ neue Jacke.',    bin:'ihr'  }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Подлежащее — окончания нет или -e',
            de:'Im Nominativ', en:'As the subject' },
      rounds:[
        { de:'___ Bruder wohnt in Berlin.', answer:'Mein', options:['Mein','Meine'],
          gloss:{ ru:'Мой брат живёт в Берлине. der Bruder — без окончания.', en:'My brother lives in Berlin. der Bruder — no ending.' } },
        { de:'___ Schwester arbeitet heute.', answer:'Meine', options:['Mein','Meine'],
          gloss:{ ru:'Моя сестра сегодня работает.', en:'My sister is working today.' } },
        { de:'___ Kind schl\u00e4ft schon.', answer:'Mein', options:['Mein','Meine'],
          gloss:{ ru:'Мой ребёнок уже спит. das Kind — без окончания.', en:'My child is already sleeping. das Kind — no ending.' } },
        { de:'___ Freunde kommen sp\u00e4ter.', answer:'Meine', options:['Mein','Meine'],
          gloss:{ ru:'Мои друзья придут позже. Множественное — -e.', en:'My friends are coming later. Plural takes -e.' } },
        { de:'___ Jacke ist sehr warm. (du)', answer:'Deine', options:['Dein','Deine'],
          gloss:{ ru:'Твоя куртка очень тёплая.', en:'Your jacket is very warm.' } },
        { de:'___ Essen ist fertig. (wir)', answer:'Unser', options:['Unser','Unsere'],
          gloss:{ ru:'Наша еда готова. das Essen — без окончания.', en:'Our food is ready. das Essen — no ending.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Объект — мужской род берёт -en',
            de:'Im Akkusativ', en:'As the object' },
      rounds:[
        { de:'Ich sehe ___ Bruder.', answer:'meinen', options:['mein','meinen'],
          gloss:{ ru:'Я вижу своего брата. Объект мужского рода → -en.', en:'I see my brother. Masculine object → -en.' } },
        { de:'Ich brauche ___ Handy.', answer:'mein', options:['mein','meinen'],
          gloss:{ ru:'Мне нужен телефон. das Handy не меняется.', en:'I need my phone. das Handy does not change.' } },
        { de:'Tanya sucht ___ Schl\u00fcssel.', answer:'ihren', options:['ihr','ihren'],
          gloss:{ ru:'Таня ищет свой ключ. Хозяйка — она, ключ мужского рода и объект.', en:'Tanya is looking for her key. Female owner, masculine object.' } },
        { de:'Nazar nimmt ___ Rucksack.', answer:'seinen', options:['sein','seinen'],
          gloss:{ ru:'Назар берёт свой рюкзак.', en:'Nazar takes his backpack.' } },
        { de:'Sie tr\u00e4gt ___ neue Jacke.', answer:'ihre', options:['ihr','ihre','ihren'],
          gloss:{ ru:'Она носит свою новую куртку. die Jacke → -e.', en:'She is wearing her new jacket. die Jacke → -e.' } },
        { de:'Wir besuchen ___ Freunde.', answer:'unsere', options:['unser','unsere','unseren'],
          gloss:{ ru:'Мы навещаем наших друзей.', en:'We are visiting our friends.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'После mit, bei, zu — Dativ', de:'Nach mit, bei, zu', en:'After mit, bei and zu' },
      body:{
        ru:'После предлогов с Dativ и после глаголов вроде helfen и gehören окончания другие: -em, -er, -en.',
        de:'Nach Dativ-Pr\u00e4positionen und nach helfen, geh\u00f6ren: -em, -er, -en.',
        en:'After the dative prepositions, and after verbs like helfen and gehören, the endings are -em, -er and -en.' },
      show:[
        { de:'Ich spreche mit <b>meinem</b> Bruder.', gloss:{ ru:'Я разговариваю с братом.', en:'I am speaking with my brother.' } },
        { de:'Tanya hilft <b>ihrer</b> Freundin.', gloss:{ ru:'Таня помогает подруге. helfen требует Dativ.', en:'Tanya helps her friend. helfen takes the dative.' } },
        { de:'Wir wohnen bei <b>unseren</b> Eltern.', gloss:{ ru:'Мы живём у родителей. Множественное — -en.', en:'We live with our parents. Plural takes -en.' } },
        { de:'Das geh\u00f6rt <b>meiner</b> Schwester.', gloss:{ ru:'Это принадлежит моей сестре.', en:'That belongs to my sister.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'В Dativ', de:'Im Dativ', en:'In the dative' },
      rounds:[
        { de:'Ich spreche mit ___ Bruder.', answer:'meinem', options:['meinen','meinem'],
          gloss:{ ru:'mit требует Dativ, der Bruder → meinem.', en:'mit takes the dative; der Bruder → meinem.' } },
        { de:'Sie f\u00e4hrt mit ___ Sohn.', answer:'ihrem', options:['ihren','ihrem'],
          gloss:{ ru:'Она едет со своим сыном.', en:'She is travelling with her son.' } },
        { de:'Tanya hilft ___ Freundin.', answer:'ihrer', options:['ihre','ihrer'],
          gloss:{ ru:'helfen — Dativ, die Freundin → ihrer.', en:'helfen takes the dative; die Freundin → ihrer.' } },
        { de:'Ich komme von ___ Arbeit.', answer:'meiner', options:['meine','meiner'],
          gloss:{ ru:'Я иду со своей работы.', en:'I am coming from my work.' } },
        { de:'Er spricht mit ___ Nachbarn.', answer:'seinen', options:['seine','seinen'],
          gloss:{ ru:'Он разговаривает с соседями. Множественное — -en.', en:'He is speaking with his neighbours. Plural takes -en.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'В русском есть «свой», в немецком нет',
             de:'Russisch hat \u0441\u0432\u043e\u0439, Deutsch nicht',
             en:'Russian has свой, German does not' },
      body:{
        ru:'По-русски можно сказать «Таня ищет свой ключ» — и не важно, кто Таня. В немецком такого слова нет: приходится называть хозяина. Таня — она, значит ihren. Назар — он, значит seinen.',
        de:'Russisch kann \u0441\u0432\u043e\u0439 sagen, ohne den Besitzer zu nennen. Deutsch muss ihn nennen.',
        en:'Russian can say Таня ищет свой ключ and never name the owner. German has no such word, so the owner has to be named every time.' },
      show:[
        { de:'Tanya sucht <b>ihren</b> Schl\u00fcssel.', gloss:{ ru:'Таня ищет свой ключ. Таня — она.', en:'Tanya is looking for her key. Tanya is female.' } },
        { de:'Nazar sucht <b>seinen</b> Schl\u00fcssel.', gloss:{ ru:'Назар ищет свой ключ. Назар — он.', en:'Nazar is looking for his key. Nazar is male.' } }
      ],
      note:{
        ru:'Это не мелочь: русское «свой» позволяет не думать о том, кто хозяин, а немецкий заставляет думать всегда. Именно эту привычку и надо выработать.',
        de:'\u0441\u0432\u043e\u0439 erlaubt es, den Besitzer zu \u00fcbergehen. Deutsch erlaubt das nie.',
        en:'This is not a small thing: свой lets her skip the question of who owns it, and German never lets her skip it. That habit is what this lesson is really for.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши форму', de:'Schreib die Form', en:'Write the form' },
      rounds:[
        { de:'Das ist ___ Tasche. (ich)', answer:'meine',
          gloss:{ ru:'Это моя сумка.', en:'That is my bag.' } },
        { de:'Ich suche ___ Schl\u00fcssel. (ich)', answer:'meinen',
          gloss:{ ru:'Я ищу свой ключ. Объект мужского рода.', en:'I am looking for my key. Masculine object.' } },
        { de:'Sie spricht mit ___ Freundin. (sie)', answer:'ihrer',
          gloss:{ ru:'Она говорит со своей подругой.', en:'She is speaking with her friend.' } },
        { de:'Sind das ___ Schuhe? (du)', answer:'deine',
          gloss:{ ru:'Это твои туфли?', en:'Are those your shoes?' } },
        { de:'Wir fahren mit ___ Auto. (wir)', answer:'unserem',
          gloss:{ ru:'Мы едем на своей машине.', en:'We are going in our car.' } },
        { de:'Ich fahre zu ___ Mutter. (ich)', answer:'meiner',
          gloss:{ ru:'Я едy к маме.', en:'I am going to my mother.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Хозяин выбирает начало: mein, dein, sein, ihr, unser. Вещь выбирает окончание — те же, что у ein. И помни: «свой» перевести нельзя, надо каждый раз решать, чей.',
        de:'Der Besitzer w\u00e4hlt den Anfang, das Ding die Endung. Und \u0441\u0432\u043e\u0439 gibt es nicht.',
        en:'The owner picks the start — mein, dein, sein, ihr, unser. The thing picks the ending, and they are the endings of ein. And свой has no translation: whose it is has to be decided every time.' },
      show:[
        { de:'sein Bruder \u00b7 seine Schwester \u00b7 seinen Bruder \u00b7 seinem Bruder',
          gloss:{ ru:'Одно начало, четыре окончания.', en:'One start, four endings.' } },
        { de:'ihr Bruder \u00b7 ihre Schwester \u00b7 ihren Bruder \u00b7 ihrem Bruder',
          gloss:{ ru:'Другое начало, те же окончания.', en:'A different start, the same endings.' } }
      ]
    }

  ]
},

/* ==================================================================
   Modal verbs

   Six words that are among the commonest in German, and one structure
   that Russian does not have: the conjugated modal near the front, the
   main verb parked as an infinitive at the very end, and everything else
   living between them. Я могу сегодня прийти keeps its infinitive next to
   the modal; Ich kann heute kommen sends it to the far end of the
   sentence. That bracket is the lesson.

   And one distinction that is not grammar but consequence: nicht müssen
   means she does not have to, while nicht dürfen means she is not allowed
   to. Confusing those two is the difference between optional and
   forbidden, which is worth more than a grammar point.
   ================================================================== */
{
  id:'modals',
  glyph:'\ud83d\udddd',
  mins:8,
  name:{ ru:'Могу, должен, хочу', de:'Modalverben', en:'Modal verbs' },
  sub:{ ru:'können · müssen · wollen · dürfen · sollen · möchten',
        de:'können · müssen · wollen · dürfen · sollen · möchten',
        en:'können, müssen, wollen, dürfen, sollen, möchten' },
  topic:'irregular',

  steps:[

    { kind:'read',
      head:{ ru:'Скобка, которой нет в русском', de:'Die Klammer', en:'A bracket Russian does not have' },
      body:{
        ru:'Модальный глагол спрягается и стоит на своём обычном втором месте. А второй глагол не спрягается вообще — он уезжает в самый конец. Между ними помещается всё остальное.',
        de:'Das Modalverb wird konjugiert und steht an zweiter Stelle. Das andere Verb bleibt Infinitiv und geht ans Ende.',
        en:'The modal is conjugated and sits in its normal second position. The other verb is not conjugated at all — it goes to the very end, and everything else lives between them.' },
      show:[
        { de:'Ich <b>muss</b> heute <b>arbeiten</b>.', gloss:{ ru:'Мне надо сегодня работать. По-русски «работать» стоит рядом с «надо», по-немецки — в конце.', en:'I have to work today. Russian keeps the infinitive next to the modal; German sends it to the end.' } },
        { de:'Ich <b>kann</b> heute nicht <b>kommen</b>.', gloss:{ ru:'Я не могу сегодня прийти.', en:'I cannot come today.' } },
        { de:'Wir <b>wollen</b> nach Berlin <b>fahren</b>.', gloss:{ ru:'Мы хотим поехать в Берлин.', en:'We want to travel to Berlin.' } }
      ],
      note:{
        ru:'Запомни фразу как рамку с дыркой посередине: Ich kann … kommen. Ich muss … arbeiten. Что угодно вставляется внутрь, а концы не двигаются.',
        de:'Denk daran als Rahmen: Ich kann … kommen. Alles kommt in die Mitte.',
        en:'Think of it as a frame with a gap: Ich kann … kommen. Ich muss … arbeiten. Anything at all goes in the middle, and the two ends never move.' }
    },

    { kind:'read',
      head:{ ru:'Только модальный спрягается', de:'Nur das Modalverb wird konjugiert', en:'Only the modal is conjugated' },
      body:{
        ru:'Второй глагол остаётся в словарной форме. Всегда. Это самая частая ошибка — спрягать оба.',
        de:'Das zweite Verb bleibt im Infinitiv. Immer.',
        en:'The second verb stays in its dictionary form. Always. Conjugating both is the commonest mistake here.' },
      table:[
        ['\u2713', 'Ich muss heute arbeiten.',  'arbeiten stays'],
        ['\u2717', 'Ich muss heute arbeite.',   'wrong'],
        ['\u2713', 'Sie kann gut kochen.',      'kochen stays'],
        ['\u2717', 'Sie kann gut kocht.',       'wrong'],
        ['\u2713', 'Ich muss hier aussteigen.', 'the prefix stays attached'],
        ['\u2717', 'Ich muss hier steigen aus.','wrong']
      ],
      note:{
        ru:'Заметь последнюю пару: разделяемый глагол после модального НЕ разделяется. Приставка остаётся на месте, потому что глагол в инфинитиве.',
        de:'Trennbare Verben trennen sich nach einem Modalverb nicht.',
        en:'Notice the last pair: a separable verb after a modal does not separate. The prefix stays attached, because the verb is an infinitive.' }
    },

    { kind:'read',
      head:{ ru:'Шесть глаголов', de:'Die sechs', en:'The six' },
      body:{
        ru:'У каждого своё значение. Формы для ich и er совпадают — это удобно.',
        de:'Jedes hat seine Bedeutung. ich und er sind gleich.',
        en:'Each has its own meaning, and the ich and er forms are identical, which helps.' },
      table:[
        ['k\u00f6nnen', 'ich kann',    'can, am able to'],
        ['m\u00fcssen', 'ich muss',    'have to, must'],
        ['wollen', 'ich will',    'want to'],
        ['d\u00fcrfen', 'ich darf',    'am allowed to'],
        ['sollen', 'ich soll',    'am supposed to'],
        ['m\u00f6chten','ich m\u00f6chte',  'would like to']
      ],
      note:{
        ru:'В русском для них есть свои слова: мочь, надо, хотеть, можно, следует, хотел бы. Значения совпадают почти полностью — трудность только в порядке слов.',
        de:'Die Bedeutungen entsprechen dem Russischen fast genau. Das Problem ist die Wortstellung.',
        en:'Russian has a word for each — мочь, надо, хотеть, можно, следует, хотел бы — and the meanings line up almost exactly. The word order is the only real difficulty.' }
    },

    { kind:'sort',
      ask:{ ru:'Какой глагол подходит?', de:'Welches Modalverb?', en:'Which modal fits?' },
      bins:[
        { id:'kann',  label:'kann \u2014 \u0443\u043c\u0435\u044e' },
        { id:'muss',  label:'muss \u2014 \u043d\u0430\u0434\u043e' },
        { id:'darf',  label:'darf \u2014 \u043c\u043e\u0436\u043d\u043e' }
      ],
      cards:[
        { text:'Ich ___ ein bisschen Deutsch sprechen.', bin:'kann' },
        { text:'Ich ___ morgen fr\u00fch arbeiten.',         bin:'muss' },
        { text:'___ ich hier sitzen?',                  bin:'darf' },
        { text:'Nazar ___ sehr schnell lesen.',         bin:'kann' },
        { text:'Du ___ deinen Ausweis zeigen.',         bin:'muss' },
        { text:'Hier ___ man nicht rauchen.',           bin:'darf' }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какая форма глагола в конце?',
            de:'Welche Form am Ende?', en:'Which form goes at the end?' },
      rounds:[
        { de:'Ich muss morgen fr\u00fch ___.', answer:'arbeiten', options:['arbeiten','arbeite'],
          gloss:{ ru:'Мне надо завтра рано работать.', en:'I have to work early tomorrow.' } },
        { de:'Sie kann gut ___.', answer:'kochen', options:['kochen','kocht'],
          gloss:{ ru:'Она хорошо готовит.', en:'She can cook well.' } },
        { de:'Wir wollen Deutsch ___.', answer:'lernen', options:['lernen','lernt'],
          gloss:{ ru:'Мы хотим учить немецкий.', en:'We want to learn German.' } },
        { de:'Ich muss hier ___.', answer:'aussteigen', options:['aussteigen','steigen aus'],
          gloss:{ ru:'Мне надо здесь выйти. Приставка не отрывается.', en:'I have to get off here. The prefix stays attached.' } },
        { de:'Sie soll den Arzt ___.', answer:'anrufen', options:['anrufen','rufen an'],
          gloss:{ ru:'Ей надо позвонить врачу.', en:'She is supposed to call the doctor.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'nicht müssen и nicht dürfen — не одно и то же',
             de:'nicht m\u00fcssen gegen nicht d\u00fcrfen',
             en:'nicht müssen is not nicht dürfen' },
      body:{
        ru:'Это не тонкость, а разница между «не обязательно» и «нельзя». Их путают постоянно, и последствия бывают неприятные.',
        de:'Das ist keine Feinheit, sondern der Unterschied zwischen freiwillig und verboten.',
        en:'This is not a nicety. It is the difference between optional and forbidden, and it is confused constantly.' },
      show:[
        { de:'Du <b>musst nicht</b> warten.', gloss:{ ru:'Тебе не обязательно ждать. Можешь, если хочешь.', en:'You do not have to wait. You may if you like.' } },
        { de:'Du <b>darfst nicht</b> warten.', gloss:{ ru:'Тебе нельзя здесь ждать. Запрещено.', en:'You are not allowed to wait. It is forbidden.' } },
        { de:'Du <b>musst</b> hier <b>nicht</b> parken.', gloss:{ ru:'Тебе не обязательно здесь парковаться.', en:'You do not have to park here.' } },
        { de:'Du <b>darfst</b> hier <b>nicht</b> parken.', gloss:{ ru:'Здесь парковаться нельзя.', en:'You are not allowed to park here.' } }
      ],
      note:{
        ru:'По-русски «не должен» может значить и то и другое — и именно поэтому здесь легко ошибиться. Запрет — это всегда darf nicht.',
        de:'Verbot ist immer darf nicht.',
        en:'Russian «не должен» can cover both, which is exactly why this trips people. A prohibition is always darf nicht.' }
    },

    { kind:'pick',
      ask:{ ru:'Не обязательно или нельзя?',
            de:'Freiwillig oder verboten?', en:'Optional, or forbidden?' },
      rounds:[
        { de:'Hier ___ man nicht rauchen. (\u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e)', answer:'darf', options:['darf','muss'],
          gloss:{ ru:'Здесь нельзя курить.', en:'Smoking is not allowed here.' } },
        { de:'Sie ___ heute nicht warten. (\u043d\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)', answer:'m\u00fcssen', options:['m\u00fcssen','d\u00fcrfen'],
          gloss:{ ru:'Вам не нужно сегодня ждать.', en:'You do not have to wait today.' } },
        { de:'Du ___ hier nicht parken. (\u0437\u0430\u043f\u0440\u0435\u0449\u0435\u043d\u043e)', answer:'darfst', options:['darfst','musst'],
          gloss:{ ru:'Здесь нельзя парковаться.', en:'You are not allowed to park here.' } },
        { de:'Du ___ nicht kommen. (\u043d\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)', answer:'musst', options:['musst','darfst'],
          gloss:{ ru:'Тебе не обязательно приходить.', en:'You do not have to come.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'wollen звучит резко', de:'wollen klingt hart', en:'wollen sounds blunt' },
      body:{
        ru:'wollen — это прямое «хочу». В магазине или кафе это звучит слишком в лоб. Там нужен möchten — «хотел бы».',
        de:'wollen ist direkt. Im Caf\u00e9 nimmt man m\u00f6chten.',
        en:'wollen is a flat I want. In a shop or a café that lands too hard, and möchten — I would like — is what people say.' },
      show:[
        { de:'Ich <b>will</b> einen Kaffee.', gloss:{ ru:'Хочу кофе. — прямо, почти требование.', en:'I want a coffee — blunt, nearly a demand.' } },
        { de:'Ich <b>m\u00f6chte</b> einen Kaffee.', gloss:{ ru:'Я хотела бы кофе. — так и говорят.', en:'I would like a coffee — this is what people say.' } }
      ],
      note:{
        ru:'В русском то же различие: «хочу кофе» и «хотела бы кофе». Так что чувство у тебя уже есть — просто перенеси его.',
        de:'Russisch macht denselben Unterschied: \u0445\u043e\u0447\u0443 gegen \u0445\u043e\u0442\u0435\u043b\u0430 \u0431\u044b.',
        en:'Russian makes the same distinction — хочу against хотела бы — so the instinct is already there. It just needs carrying across.' }
    },

    { kind:'read',
      head:{ ru:'müssen или sollen', de:'m\u00fcssen oder sollen', en:'müssen or sollen' },
      body:{
        ru:'müssen — надо по обстоятельствам. sollen — кто-то так сказал: врач, начальник, мама.',
        de:'m\u00fcssen: die Umst\u00e4nde. sollen: jemand hat es gesagt.',
        en:'müssen is a necessity from circumstances. sollen is a necessity because somebody said so — a doctor, a boss, a mother.' },
      show:[
        { de:'Ich <b>muss</b> zum Arzt gehen.', gloss:{ ru:'Мне надо к врачу — сама решила, или иначе нельзя.', en:'I have to go to the doctor — my own conclusion.' } },
        { de:'Ich <b>soll</b> zum Arzt gehen.', gloss:{ ru:'Мне сказали идти к врачу.', en:'I have been told to go to the doctor.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какой глагол?', de:'Welches Modalverb?', en:'Which modal?' },
      rounds:[
        { de:'Ich ___ einen Kaffee bestellen. (\u0432\u0435\u0436\u043b\u0438\u0432\u043e)', answer:'m\u00f6chte', options:['m\u00f6chte','will'],
          gloss:{ ru:'Я хотела бы заказать кофе.', en:'I would like to order a coffee.' } },
        { de:'Du ___ deine Mutter anrufen. (\u0442\u0435\u0431\u0435 \u0441\u043a\u0430\u0437\u0430\u043b\u0438)', answer:'sollst', options:['sollst','musst'],
          gloss:{ ru:'Тебе надо позвонить маме — так сказали.', en:'You are supposed to call your mother.' } },
        { de:'Tanya ___ gut Russisch sprechen. (\u0443\u043c\u0435\u0435\u0442)', answer:'kann', options:['kann','darf'],
          gloss:{ ru:'Таня хорошо говорит по-русски.', en:'Tanya can speak Russian well.' } },
        { de:'Nazar ___ seine Freunde besuchen. (\u0445\u043e\u0447\u0435\u0442)', answer:'will', options:['will','soll'],
          gloss:{ ru:'Назар хочет навестить друзей.', en:'Nazar wants to visit his friends.' } },
        { de:'___ ich das Fenster \u00f6ffnen?', answer:'Soll', options:['Soll','Muss'],
          gloss:{ ru:'Мне открыть окно? — предлагаю.', en:'Should I open the window? — offering.' } }
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши глагол в конец предложения',
            de:'Schreib das Verb ans Ende', en:'Write the verb that goes at the end' },
      rounds:[
        { de:'Ich kann heute nicht ___. (kommen)', answer:'kommen',
          gloss:{ ru:'Я не могу сегодня прийти.', en:'I cannot come today.' } },
        { de:'Wir m\u00fcssen jetzt ___. (aussteigen)', answer:'aussteigen',
          gloss:{ ru:'Нам надо сейчас выйти. Одним словом.', en:'We have to get off now. One word.' } },
        { de:'M\u00f6chten Sie die Jacke ___? (anprobieren)', answer:'anprobieren',
          gloss:{ ru:'Вы хотели бы примерить куртку?', en:'Would you like to try on the jacket?' } },
        { de:'Ich soll mehr Wasser ___. (trinken)', answer:'trinken',
          gloss:{ ru:'Мне следует пить больше воды.', en:'I should drink more water.' } },
        { de:'Sie will nicht zu Hause ___. (bleiben)', answer:'bleiben',
          gloss:{ ru:'Она не хочет оставаться дома.', en:'She does not want to stay home.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Модальный спрягается и стоит вторым, второй глагол — в конце и без изменений. nicht ставится перед этим последним глаголом. Запрет — только darf nicht. В кафе — möchten, не will.',
        de:'Modalverb an zweiter Stelle, Infinitiv am Ende, nicht davor. Verbot ist darf nicht. Im Caf\u00e9 m\u00f6chten.',
        en:'The modal is conjugated and second; the other verb sits unchanged at the end; nicht goes just before it. A prohibition is always darf nicht. In a café it is möchten, not will.' },
      show:[
        { de:'Ich kann \u2026 kommen. \u00b7 Ich muss \u2026 arbeiten. \u00b7 Ich will \u2026 fahren.',
          gloss:{ ru:'Рамка с дыркой посередине.', en:'A frame with a gap in the middle.' } },
        { de:'Ich darf \u2026 bleiben. \u00b7 Ich soll \u2026 anrufen. \u00b7 Ich m\u00f6chte \u2026 bestellen.',
          gloss:{ ru:'И так со всеми шестью.', en:'The same with all six.' } }
      ]
    }

  ]
},

/* ==================================================================
   kein or nicht

   German has two words for no and picks between them by what is being
   denied: a thing, or anything else. Getting it wrong is immediately
   audible — ich habe nicht Zeit marks somebody out in one syllable.

   And Russian hands her a shortcut that is very nearly a rule. Russian
   already splits нет from не: нет for a thing that is absent, не for
   everything else. That maps onto kein and nicht closely enough to be
   worth teaching as the first test, and the lesson does exactly that
   rather than starting from an ending table.
   ================================================================== */
{
  id:'kein-nicht',
  glyph:'\ud83d\udeab',
  mins:7,
  name:{ ru:'kein или nicht', de:'kein oder nicht', en:'kein or nicht' },
  sub:{ ru:'Нет чего-то — или что-то не так',
        de:'Kein Ding — oder etwas stimmt nicht',
        en:'No such thing, or something is not the case' },
  topic:'order',

  steps:[

    { kind:'read',
      head:{ ru:'Русский почти даёт ответ', de:'Russisch gibt fast die Antwort', en:'Russian nearly gives the answer' },
      body:{
        ru:'В русском уже есть два слова: «нет» — когда чего-то нет вообще, и «не» — во всех остальных случаях. Немецкий делит точно так же: kein там, где по-русски «нет», nicht там, где «не».',
        de:'Russisch hat \u043d\u0435\u0442 und \u043d\u0435. Deutsch teilt genauso: kein und nicht.',
        en:'Russian already has two words: нет when a thing is simply absent, не for everything else. German splits the same way — kein where Russian says нет, nicht where it says не.' },
      show:[
        { de:'Ich habe <b>kein</b> Auto.', gloss:{ ru:'У меня нет машины. — «нет» → kein.', en:'I have no car. Russian нет → kein.' } },
        { de:'Ich fahre <b>nicht</b>.', gloss:{ ru:'Я не еду. — «не» → nicht.', en:'I am not driving. Russian не → nicht.' } },
        { de:'Hier gibt es <b>keinen</b> Bahnhof.', gloss:{ ru:'Здесь нет вокзала.', en:'There is no station here.' } },
        { de:'Der Bahnhof ist <b>nicht</b> ge\u00f6ffnet.', gloss:{ ru:'Вокзал не открыт.', en:'The station is not open.' } }
      ],
      note:{
        ru:'Это не идеальное правило, но как первая проверка работает почти всегда. Спроси себя: по-русски тут «нет» или «не»?',
        de:'Keine perfekte Regel, aber als erster Test fast immer richtig.',
        en:'Not a perfect rule, but as a first test it is right nearly every time. Ask yourself: would Russian say нет here, or не?' }
    },

    { kind:'read',
      head:{ ru:'Точное правило', de:'Die genaue Regel', en:'The exact rule' },
      body:{
        ru:'kein заменяет ein — или ставится там, где артикля не было вообще. nicht отрицает всё остальное: действие, признак, время, место.',
        de:'kein ersetzt ein oder steht, wo kein Artikel war. nicht negiert alles andere.',
        en:'kein replaces ein, or goes where there was no article at all. nicht denies everything else: an action, a quality, a time, a place.' },
      table:[
        ['ein Auto',      'kein Auto',        'replaces ein'],
        ['Kaffee',        'keinen Kaffee',    'no article to start with'],
        ['Zeit',          'keine Zeit',       'no article'],
        ['ist frisch',    'ist nicht frisch', 'an adjective'],
        ['ich komme',     'ich komme nicht',  'an action'],
        ['mit dem Bus',   'nicht mit dem Bus','a phrase'],
        ['das Brot',      'das Brot nicht',   'already has der/die/das'],
        ['meine Tasche',  'nicht meine Tasche','already has a possessive']
      ],
      note:{
        ru:'Последние две строчки — самое важное: если у слова уже есть der/die/das или mein, kein поставить нельзя. Только nicht.',
        de:'Steht schon der/die/das oder mein davor, geht kein nicht mehr.',
        en:'The last two rows matter most: if the noun already has der, die, das or a possessive, kein cannot go there. Only nicht.' }
    },

    { kind:'sort',
      ask:{ ru:'kein или nicht?', de:'kein oder nicht?', en:'kein or nicht?' },
      bins:[
        { id:'kein',  label:'kein\u2026' },
        { id:'nicht', label:'nicht' }
      ],
      cards:[
        { text:'Ich habe heute ___ Zeit.',      bin:'kein'  },
        { text:'Ich komme heute ___.',          bin:'nicht' },
        { text:'Ich esse ___ Fleisch.',         bin:'kein'  },
        { text:'Das Fleisch ist ___ frisch.',   bin:'nicht' },
        { text:'Tanya hat ___ Auto.',           bin:'kein'  },
        { text:'Tanya f\u00e4hrt ___ mit dem Auto.', bin:'nicht' },
        { text:'Das ist ___ Problem.',          bin:'kein'  },
        { text:'Das Problem ist ___ gro\u00df.',     bin:'nicht' }
      ]
    },

    { kind:'read',
      head:{ ru:'Пара, которую стоит запомнить',
             de:'Ein Paar zum Merken', en:'The pair worth memorising' },
      body:{
        ru:'Одно и то же слово, два разных отрицания — и два разных смысла. «Никакой куртки» и «не эту куртку».',
        de:'Dasselbe Wort, zwei Verneinungen, zwei Bedeutungen.',
        en:'The same noun, two negations, two different meanings. No jacket at all, against not this particular jacket.' },
      show:[
        { de:'Ich kaufe <b>keine</b> Jacke.', gloss:{ ru:'Я не покупаю никакую куртку. Вообще не покупаю.', en:'I am not buying a jacket at all.' } },
        { de:'Ich kaufe die Jacke <b>nicht</b>.', gloss:{ ru:'Эту куртку я не покупаю. Может, куплю другую.', en:'I am not buying that jacket. Maybe a different one.' } },
        { de:'Sie hat <b>keinen</b> Termin.', gloss:{ ru:'У неё нет записи.', en:'She has no appointment.' } },
        { de:'Ihr Termin ist <b>nicht</b> heute.', gloss:{ ru:'Запись есть, но не сегодня.', en:'She has one, but not today.' } }
      ],
      note:{
        ru:'Заметь, где стоит слово: kein — перед существительным, nicht — после него. Место тоже несёт смысл.',
        de:'kein steht vor dem Substantiv, nicht danach.',
        en:'Notice the positions: kein goes before the noun, nicht after it. The placement carries meaning too.' }
    },

    { kind:'pick',
      ask:{ ru:'Что здесь отрицается?', de:'Was wird verneint?', en:'What is being denied?' },
      rounds:[
        { de:'Ich habe heute ___ Zeit.', answer:'keine', options:['keine','nicht'],
          gloss:{ ru:'У меня нет времени. Отрицаем само время.', en:'I have no time. The time itself is absent.' } },
        { de:'Das Essen ist ___ warm.', answer:'nicht', options:['kein','nicht'],
          gloss:{ ru:'Еда не тёплая. Отрицаем признак.', en:'The food is not warm. An adjective.' } },
        { de:'Wir haben ___ Fahrkarten.', answer:'keine', options:['keine','nicht'],
          gloss:{ ru:'У нас нет билетов.', en:'We have no tickets.' } },
        { de:'Der Bus kommt heute ___.', answer:'nicht', options:['kein','nicht'],
          gloss:{ ru:'Автобус сегодня не придёт. Отрицаем действие.', en:'The bus is not coming today. An action.' } },
        { de:'Hier gibt es ___ Apotheke.', answer:'keine', options:['keine','nicht'],
          gloss:{ ru:'Здесь нет аптеки.', en:'There is no pharmacy here.' } },
        { de:'Die Apotheke ist heute ___ ge\u00f6ffnet.', answer:'nicht', options:['keine','nicht'],
          gloss:{ ru:'Аптека сегодня не открыта.', en:'The pharmacy is not open today.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Окончания у kein — как у ein', de:'Die Endungen von kein', en:'kein takes the endings of ein' },
      body:{
        ru:'Ничего нового: kein ведёт себя точно как ein, а значит как mein и dein. Мужской род в роли объекта — keinen.',
        de:'kein verh\u00e4lt sich wie ein und wie mein.',
        en:'Nothing new here: kein behaves exactly like ein, and therefore like mein and dein. A masculine object takes keinen.' },
      table:[
        ['Nominativ',  'kein Bus',       'keine Zeit'],
        ['Akkusativ',  'keinen Bus',     'keine Zeit'],
        ['Dativ',      'keinem Bus',     'keiner Zeit'],
        ['\u2014',     'kein Brot',      'keine Tickets']
      ],
      note:{
        ru:'Самое частое — keinen: Ich trinke keinen Kaffee. Ich habe keinen Termin. Ich brauche keinen Mantel. Мужской род как объект.',
        de:'Am h\u00e4ufigsten ist keinen: Ich trinke keinen Kaffee.',
        en:'The commonest of them is keinen: Ich trinke keinen Kaffee, Ich habe keinen Termin. A masculine noun as the object.' }
    },

    { kind:'pick',
      ask:{ ru:'Какая форма kein?', de:'Welche Form von kein?', en:'Which form of kein?' },
      rounds:[
        { de:'Ich habe ___ Hunger.', answer:'keinen', options:['kein','keine','keinen'],
          gloss:{ ru:'Я не голодна. der Hunger как объект → keinen.', en:'I am not hungry. der Hunger as object → keinen.' } },
        { de:'Tanya braucht ___ neuen Mantel.', answer:'keinen', options:['kein','keine','keinen'],
          gloss:{ ru:'Тане не нужно новое пальто.', en:'Tanya does not need a new coat.' } },
        { de:'Er trinkt ___ Kaffee.', answer:'keinen', options:['kein','keine','keinen'],
          gloss:{ ru:'Он не пьёт кофе.', en:'He does not drink coffee.' } },
        { de:'Wir kaufen heute ___ Milch.', answer:'keine', options:['kein','keine','keinen'],
          gloss:{ ru:'Мы сегодня не покупаем молоко. die Milch → keine.', en:'We are not buying milk today. die Milch → keine.' } },
        { de:'Ich esse ___ Fleisch.', answer:'kein', options:['kein','keine','keinen'],
          gloss:{ ru:'Я не ем мясо. das Fleisch → kein.', en:'I do not eat meat. das Fleisch → kein.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Три ошибки, которые слышно', de:'Drei h\u00f6rbare Fehler', en:'Three mistakes you can hear' },
      body:{
        ru:'Эти три — самые частые, и каждая сразу выдаёт иностранца.',
        de:'Diese drei verraten sofort.',
        en:'These three are the commonest, and each one gives a foreigner away instantly.' },
      table:[
        ['\u2717', 'Ich habe nicht Zeit.',      '\u2713 Ich habe keine Zeit.'],
        ['\u2717', 'Ich trinke nicht Kaffee.',  '\u2713 Ich trinke keinen Kaffee.'],
        ['\u2717', 'Das Brot ist kein frisch.', '\u2713 Das Brot ist nicht frisch.'],
        ['\u2717', 'Ich kaufe kein das Brot.',  '\u2713 Ich kaufe das Brot nicht.'],
        ['\u2717', 'Das ist keine meine Tasche.','\u2713 Das ist nicht meine Tasche.']
      ],
      note:{
        ru:'Обрати внимание на последние две: kein нельзя ставить рядом с das или mein. Одно отрицание на одно слово.',
        de:'kein und das stehen nie zusammen. Auch kein und mein nicht.',
        en:'Look at the last two: kein never stands beside das, and never beside mein. One determiner per noun.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши kein, keine, keinen или nicht',
            de:'Schreib kein, keine, keinen oder nicht',
            en:'Write kein, keine, keinen or nicht' },
      rounds:[
        { de:'Ich habe ___ Auto.', answer:'kein',
          gloss:{ ru:'У меня нет машины. das Auto → kein.', en:'I have no car. das Auto → kein.' } },
        { de:'Der Kaffee ist ___ hei\u00df.', answer:'nicht',
          gloss:{ ru:'Кофе не горячий.', en:'The coffee is not hot.' } },
        { de:'Ich brauche ___ Termin.', answer:'keinen',
          gloss:{ ru:'Мне не нужна запись.', en:'I do not need an appointment.' } },
        { de:'Die Jacke passt Tanya ___.', answer:'nicht',
          gloss:{ ru:'Куртка Тане не подходит.', en:'The jacket does not fit Tanya.' } },
        { de:'Das ist ___ meine Tasche.', answer:'nicht',
          gloss:{ ru:'Это не моя сумка. Уже есть meine — значит nicht.', en:'That is not my bag. meine is already there, so nicht.' } },
        { de:'Sie spricht noch ___ Deutsch.', answer:'kein',
          gloss:{ ru:'Она ещё не говорит по-немецки.', en:'She does not speak German yet.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Спроси себя: по-русски здесь «нет» или «не»? «Нет» — значит kein, и он встаёт перед существительным. «Не» — значит nicht. И если у слова уже есть der/die/das или mein — только nicht.',
        de:'Frage dich: \u043d\u0435\u0442 oder \u043d\u0435? \u043d\u0435\u0442 \u2192 kein, \u043d\u0435 \u2192 nicht.',
        en:'Ask yourself whether Russian would say нет or не here. нет means kein, and it goes before the noun. не means nicht. And if the noun already has der, die, das or a possessive, it can only be nicht.' },
      show:[
        { de:'kein Auto \u00b7 keine Zeit \u00b7 keinen Kaffee \u00b7 keine Fahrkarten',
          gloss:{ ru:'Чего-то нет.', en:'A thing is absent.' } },
        { de:'nicht frisch \u00b7 nicht heute \u00b7 nicht mit dem Bus \u00b7 das Brot nicht',
          gloss:{ ru:'Что-то не так.', en:'Something is not the case.' } }
      ]
    }

  ]
},

/* ==================================================================
   es gibt and es gab

   One of the commonest structures in German and the app had two examples
   of it before this lesson.

   Russian does two things here, one helpful and one not. Есть and нет
   cover the same ground, so the idea is familiar — but Russian drops есть
   whenever the meaning is obvious, and German never drops es gibt. В
   Берлине много парков has no verb at all; In Berlin gibt es viele Parks
   must have one.

   The other half is a gift, and it is the part of this lesson worth
   pointing at: Russian changes the past form for gender and number — был,
   была, было, были — and German does not. Es gab covers all four. So the
   German is genuinely easier here, and it is worth telling her so, because
   almost nothing else in this language is.
   ================================================================== */
{
  id:'es-gibt',
  glyph:'\ud83d\udccc',
  mins:7,
  name:{ ru:'es gibt \u2014 «есть» и «было»', de:'es gibt und es gab', en:'es gibt and es gab' },
  sub:{ ru:'Что-то существует — всегда с Akkusativ',
        de:'Etwas existiert \u2014 immer mit Akkusativ',
        en:'Something exists — always with the accusative' },
  topic:'case',

  steps:[

    { kind:'read',
      head:{ ru:'Русский «есть», но по-немецки обязательно',
             de:'Russisch \u0435\u0441\u0442\u044c, aber im Deutschen Pflicht',
             en:'Russian есть, but German insists on it' },
      body:{
        ru:'es gibt значит «есть», «имеется», «бывает». По-русски «есть» часто опускают — «В Берлине много парков». По-немецки без es gibt так сказать нельзя.',
        de:'es gibt hei\u00dft \u0435\u0441\u0442\u044c. Russisch l\u00e4sst \u0435\u0441\u0442\u044c oft weg, Deutsch nie.',
        en:'es gibt means there is, there are, one can find. Russian often drops есть when the meaning is obvious. German never drops es gibt.' },
      show:[
        { de:'Hier <b>gibt es</b> einen Supermarkt.', gloss:{ ru:'Здесь есть супермаркет.', en:'There is a supermarket here.' } },
        { de:'In Berlin <b>gibt es</b> viele Parks.', gloss:{ ru:'В Берлине много парков. — по-русски глагола нет, по-немецки обязателен.', en:'In Berlin there are many parks. Russian has no verb here; German must have one.' } },
        { de:'<b>Es gibt</b> heute frisches Brot.', gloss:{ ru:'Сегодня есть свежий хлеб.', en:'There is fresh bread today.' } }
      ],
      note:{
        ru:'Форма никогда не меняется. Один автобус или сто — всё равно gibt: es gibt einen Bus, es gibt viele Busse. Никакого «es geben».',
        de:'Die Form \u00e4ndert sich nie: es gibt einen Bus, es gibt viele Busse.',
        en:'The form never changes. One bus or a hundred, it stays gibt: es gibt einen Bus, es gibt viele Busse. There is no es geben.' }
    },

    { kind:'read',
      head:{ ru:'Всегда Akkusativ', de:'Immer Akkusativ', en:'Always the accusative' },
      body:{
        ru:'То, что «есть», грамматически не подлежащее, а объект. Поэтому после es gibt всегда Akkusativ — и у мужского рода это видно.',
        de:'Das Ding nach es gibt ist Objekt, nicht Subjekt. Daher Akkusativ.',
        en:'The thing that exists is grammatically the object, not the subject. So the accusative follows — and on a masculine noun that shows.' },
      table:[
        ['ein Bahnhof',   'einen Bahnhof',   'masculine \u2014 it changes'],
        ['ein Caf\u00e9',      'ein Caf\u00e9',        'neuter \u2014 no change'],
        ['eine Apotheke','eine Apotheke',   'feminine \u2014 no change'],
        ['viele Parks',  'viele Parks',     'plural \u2014 no change']
      ],
      note:{
        ru:'Меняется только мужской род. Значит запомнить надо одно: einen, keinen. Всё остальное как было.',
        de:'Nur der Maskulin \u00e4ndert sich: einen, keinen.',
        en:'Only the masculine changes, so there is exactly one thing to remember: einen and keinen. Everything else stays as it was.' }
    },

    { kind:'pick',
      ask:{ ru:'Какой артикль?', de:'Welcher Artikel?', en:'Which article?' },
      rounds:[
        { de:'Hier gibt es ___ Supermarkt.', answer:'einen', options:['ein','einen'],
          gloss:{ ru:'der Supermarkt \u2192 einen.', en:'der Supermarkt → einen.' } },
        { de:'Gibt es ___ Caf\u00e9 in der N\u00e4he?', answer:'ein', options:['ein','einen'],
          gloss:{ ru:'das Caf\u00e9 не меняется.', en:'das Café does not change.' } },
        { de:'Gibt es hier ___ Apotheke?', answer:'eine', options:['eine','einen'],
          gloss:{ ru:'die Apotheke не меняется.', en:'die Apotheke does not change.' } },
        { de:'Es gibt noch ___ freien Platz.', answer:'einen', options:['ein','einen'],
          gloss:{ ru:'der Platz \u2192 einen freien Platz.', en:'der Platz → einen freien Platz.' } },
        { de:'Gibt es ___ Geldautomaten in der N\u00e4he?', answer:'einen', options:['ein','einen'],
          gloss:{ ru:'der Geldautomat \u2192 einen.', en:'der Geldautomat → einen.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Прошедшее время — и здесь немецкий проще',
             de:'Die Vergangenheit \u2014 hier ist Deutsch einfacher',
             en:'The past — and here German is the easier language' },
      body:{
        ru:'В русском форма меняется по роду и числу: был магазин, была проблема, было кафе, были автобусы. В немецком одно слово на все случаи: es gab.',
        de:'Russisch \u00e4ndert die Form: \u0431\u044b\u043b, \u0431\u044b\u043b\u0430, \u0431\u044b\u043b\u043e, \u0431\u044b\u043b\u0438. Deutsch hat nur es gab.',
        en:'Russian changes the form for gender and number — был, была, было, были. German has one word for all of them: es gab.' },
      table:[
        ['\u0431\u044b\u043b \u043c\u0430\u0433\u0430\u0437\u0438\u043d',   'es gab ein Gesch\u00e4ft',  'there was a shop'],
        ['\u0431\u044b\u043b\u0430 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0430', 'es gab ein Problem',   'there was a problem'],
        ['\u0431\u044b\u043b\u043e \u043a\u0430\u0444\u0435',     'es gab ein Caf\u00e9',      'there was a café'],
        ['\u0431\u044b\u043b\u0438 \u0430\u0432\u0442\u043e\u0431\u0443\u0441\u044b','es gab Busse',         'there were buses']
      ],
      note:{
        ru:'Четыре русские формы против одной немецкой. Такое в немецком бывает редко — стоит порадоваться.',
        de:'Vier russische Formen, eine deutsche. Das kommt selten vor.',
        en:'Four Russian forms against one German one. That does not happen often in this language, so it is worth enjoying.' }
    },

    { kind:'sort',
      ask:{ ru:'Сейчас или тогда?', de:'Jetzt oder damals?', en:'Now, or then?' },
      bins:[
        { id:'gibt', label:'gibt \u2014 \u0441\u0435\u0439\u0447\u0430\u0441' },
        { id:'gab',  label:'gab \u2014 \u0442\u043e\u0433\u0434\u0430' }
      ],
      cards:[
        { text:'Heute ___ es frisches Brot.',        bin:'gibt' },
        { text:'Gestern ___ es ein Problem.',        bin:'gab'  },
        { text:'___ es hier eine Apotheke?',         bin:'gibt' },
        { text:'___ es fr\u00fcher mehr Gesch\u00e4fte?',    bin:'gab'  },
        { text:'Was ___ es heute zum Essen?',        bin:'gibt' },
        { text:'Fr\u00fcher ___ es hier ein Caf\u00e9.',      bin:'gab'  }
      ]
    },

    { kind:'read',
      head:{ ru:'Порядок слов', de:'Die Wortstellung', en:'The word order' },
      body:{
        ru:'gibt — обычный глагол, значит второе место. Если впереди стоит время или место, es уезжает за глагол: не «Heute es gibt», а «Heute gibt es».',
        de:'gibt steht an zweiter Stelle. Steht Zeit oder Ort vorne, kommt es dahinter.',
        en:'gibt is an ordinary verb, so it takes second position. If a time or place comes first, es moves behind it — not Heute es gibt, but Heute gibt es.' },
      show:[
        { de:'<b>Heute gibt es</b> frisches Brot.', gloss:{ ru:'Сегодня есть свежий хлеб.', en:'There is fresh bread today.' } },
        { de:'<b>In Berlin gibt es</b> viele Parks.', gloss:{ ru:'В Берлине много парков.', en:'There are many parks in Berlin.' } },
        { de:'<b>Gibt es</b> hier einen Bus?', gloss:{ ru:'Здесь есть автобус? — в вопросе глагол первый.', en:'Is there a bus here? In a question the verb comes first.' } },
        { de:'<b>Was gibt es</b> heute?', gloss:{ ru:'Что сегодня есть? — вопросительное слово, потом глагол.', en:'What is there today? Question word, then the verb.' } }
      ],
      note:{
        ru:'Это то же правило второго места, что и во всех остальных предложениях. Просто здесь подлежащее — маленькое es, и его легко забыть переставить.',
        de:'Dieselbe Zweitstellungsregel wie sonst auch.',
        en:'This is the same verb-second rule as everywhere else. It is only harder to see because the subject is the tiny word es, which is easy to forget to move.' }
    },

    { kind:'pick',
      ask:{ ru:'Какой порядок?', de:'Welche Reihenfolge?', en:'Which order?' },
      rounds:[
        { de:'Heute ___ frisches Brot.', answer:'gibt es', options:['gibt es','es gibt'],
          gloss:{ ru:'Сегодня есть свежий хлеб.', en:'There is fresh bread today.' } },
        { de:'In Berlin ___ viele Parks.', answer:'gibt es', options:['gibt es','es gibt'],
          gloss:{ ru:'В Берлине много парков.', en:'There are many parks in Berlin.' } },
        { de:'Gestern ___ einen Unfall.', answer:'gab es', options:['gab es','es gab'],
          gloss:{ ru:'Вчера была авария.', en:'There was an accident yesterday.' } },
        { de:'___ hier eine Toilette?', answer:'Gibt es', options:['Gibt es','Es gibt'],
          gloss:{ ru:'Здесь есть туалет?', en:'Is there a toilet here?' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Отрицание — только kein', de:'Verneinung mit kein', en:'Negating it: kein, never nicht' },
      body:{
        ru:'После es gibt отрицается существительное, а значит — kein. Никогда nicht. Это ровно тот случай, который мы разбирали в прошлом уроке.',
        de:'Nach es gibt wird ein Substantiv verneint, also kein.',
        en:'What follows es gibt is a noun, so it is negated with kein. Never nicht. This is exactly the case from the previous lesson.' },
      show:[
        { de:'Es gibt <b>keinen</b> Bahnhof.', gloss:{ ru:'Вокзала нет. По-русски «нет» \u2192 kein.', en:'There is no station. Russian нет → kein.' } },
        { de:'Es gibt <b>keine</b> Apotheke.', gloss:{ ru:'Аптеки нет.', en:'There is no pharmacy.' } },
        { de:'Es gibt <b>kein</b> Problem.', gloss:{ ru:'Проблемы нет.', en:'There is no problem.' } },
        { de:'Heute gibt es <b>keine</b> Versp\u00e4tung.', gloss:{ ru:'Сегодня задержки нет.', en:'There is no delay today.' } }
      ],
      note:{
        ru:'«Es gibt nicht Bahnhof» — так не говорят никогда. Русское «нет вокзала» подсказывает правильно: kein.',
        de:'Es gibt nicht Bahnhof sagt niemand.',
        en:'Es gibt nicht Bahnhof is never said. And Russian нет вокзала points at the right answer: kein.' }
    },

    { kind:'pick',
      ask:{ ru:'Как сказать, что этого нет?',
            de:'Wie sagt man, dass es das nicht gibt?',
            en:'How to say it is not there' },
      rounds:[
        { de:'Es gibt hier ___ Aufzug.', answer:'keinen', options:['keinen','nicht'],
          gloss:{ ru:'Здесь нет лифта. der Aufzug \u2192 keinen.', en:'There is no lift here. der Aufzug → keinen.' } },
        { de:'Es gab ___ freien Pl\u00e4tze.', answer:'keine', options:['keine','nicht'],
          gloss:{ ru:'Свободных мест не было.', en:'There were no free seats.' } },
        { de:'Damals gab es ___ Bahnhof.', answer:'keinen', options:['keinen','kein'],
          gloss:{ ru:'Тогда вокзала не было.', en:'There was no station then.' } },
        { de:'Es gibt ___ Problem.', answer:'kein', options:['kein','keinen'],
          gloss:{ ru:'Проблемы нет. das Problem \u2192 kein.', en:'There is no problem. das Problem → kein.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Что спрашивать в Берлине', de:'Was man in Berlin fragt', en:'What to ask in Berlin' },
      body:{
        ru:'Четыре фразы, которые пригодятся сразу. Стоит выучить их целиком, как готовые.',
        de:'Vier S\u00e4tze, die sofort n\u00fctzlich sind.',
        en:'Four phrases that are useful immediately. Worth learning whole, as ready-made units.' },
      table:[
        ['Gibt es hier eine Apotheke?',       '\u0410\u043f\u0442\u0435\u043a\u0430 \u0435\u0441\u0442\u044c?',    'a pharmacy'],
        ['Gibt es einen Supermarkt in der N\u00e4he?', '\u0421\u0443\u043f\u0435\u0440\u043c\u0430\u0440\u043a\u0435\u0442 \u0440\u044f\u0434\u043e\u043c?', 'nearby'],
        ['Gibt es noch freie Pl\u00e4tze?',        '\u0415\u0441\u0442\u044c \u0441\u0432\u043e\u0431\u043e\u0434\u043d\u044b\u0435 \u043c\u0435\u0441\u0442\u0430?', 'free seats'],
        ['Gibt es dieses Kleid in Blau?',      '\u042d\u0442\u043e \u043f\u043b\u0430\u0442\u044c\u0435 \u0432 \u0441\u0438\u043d\u0435\u043c?', 'in blue']
      ]
    },

    { kind:'type',
      ask:{ ru:'Впиши gibt или gab', de:'Schreib gibt oder gab', en:'Write gibt or gab' },
      rounds:[
        { de:'Heute ___ es frisches Brot.', answer:'gibt',
          gloss:{ ru:'Сегодня есть свежий хлеб.', en:'There is fresh bread today.' } },
        { de:'Gestern ___ es ein Problem.', answer:'gab',
          gloss:{ ru:'Вчера была проблема.', en:'There was a problem yesterday.' } },
        { de:'Fr\u00fcher ___ es hier ein Caf\u00e9.', answer:'gab',
          gloss:{ ru:'Раньше здесь было кафе.', en:'There used to be a café here.' } },
        { de:'Was ___ es heute zum Essen?', answer:'gibt',
          gloss:{ ru:'Что сегодня поесть?', en:'What is there to eat today?' } },
        { de:'Am Morgen ___ es starken Regen.', answer:'gab',
          gloss:{ ru:'Утром был сильный дождь.', en:'There was heavy rain in the morning.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'es gibt — сейчас, es gab — тогда. Форма не меняется никогда, ни по числу, ни по роду. После неё Akkusativ, и виден он только у мужского рода: einen, keinen. Отрицание — kein, никогда nicht. И на втором месте стоит глагол, а не es.',
        de:'es gibt jetzt, es gab damals. Immer Akkusativ, verneint mit kein, Verb an zweiter Stelle.',
        en:'es gibt for now, es gab for then. The form never changes for number or gender. The accusative follows, and only the masculine shows it: einen, keinen. It is negated with kein, never nicht. And the verb takes second position, not es.' },
      show:[
        { de:'Es gibt einen Bahnhof. \u00b7 Es gab einen Bahnhof.',
          gloss:{ ru:'Есть вокзал. Был вокзал.', en:'There is a station. There was a station.' } },
        { de:'Gibt es einen Bahnhof? \u00b7 Gab es einen Bahnhof?',
          gloss:{ ru:'Есть вокзал? Был вокзал?', en:'Is there a station? Was there a station?' } }
      ]
    }

  ]
},

/* ==================================================================
   Comparing things

   She had two examples of this in the whole app before now, which meant
   she could not compare two things at all — no shopping, no opinions,
   nothing described relative to anything else.

   Russian is unusually helpful here. быстрее works exactly like schneller,
   чем works exactly like als, and both languages have irregular forms in
   the same places — хороший/лучше against gut/besser. So most of this
   lesson is confirming an instinct.

   Two things it must catch. English says more expensive and Russian can
   say более дорогой, so mehr teuer feels reasonable and is wrong — German
   nearly always adds -er instead. And besser is not lieber: one is about
   quality, the other about preference, and Tanya spricht besser Deutsch
   means something quite different from Tanya spricht lieber Deutsch.
   ================================================================== */
{
  id:'comparatives',
  glyph:'\ud83d\udcca',
  mins:7,
  name:{ ru:'Больше, лучше, лучше всего', de:'Gr\u00f6\u00dfer, besser, am besten', en:'Bigger, better, best' },
  sub:{ ru:'schneller als · am schnellsten',
        de:'schneller als · am schnellsten',
        en:'schneller als and am schnellsten' },
  topic:'gender',

  steps:[

    { kind:'read',
      head:{ ru:'Здесь русский почти совпадает', de:'Hier passt Russisch fast', en:'Here Russian nearly matches' },
      body:{
        ru:'Три формы, как и в русском: быстрый — быстрее — быстрее всего. По-немецки: schnell — schneller — am schnellsten. И «чем» это als.',
        de:'Drei Formen wie im Russischen. \u0447\u0435\u043c ist als.',
        en:'Three forms, just as in Russian: быстрый, быстрее, быстрее всего. In German: schnell, schneller, am schnellsten. And чем is als.' },
      show:[
        { de:'Der Zug ist <b>schneller als</b> der Bus.', gloss:{ ru:'Поезд быстрее, чем автобус.', en:'The train is faster than the bus.' } },
        { de:'Heute ist es <b>k\u00e4lter als</b> gestern.', gloss:{ ru:'Сегодня холоднее, чем вчера.', en:'Today it is colder than yesterday.' } },
        { de:'Dieser Zug f\u00e4hrt <b>am schnellsten</b>.', gloss:{ ru:'Этот поезд едет быстрее всех.', en:'This train travels the fastest.' } }
      ],
      note:{
        ru:'Сравнительная форма — просто -er на конце. Превосходная — am и -sten. Две вещи, и обе короткие.',
        de:'Komparativ: -er. Superlativ: am \u2026 -sten.',
        en:'The comparative is just -er on the end. The superlative is am plus -sten. Two things, both short.' }
    },

    { kind:'read',
      head:{ ru:'Никакого «mehr»', de:'Kein mehr', en:'Never mehr' },
      body:{
        ru:'По-английски говорят more expensive, по-русски можно «более дорогой». По-немецки так нельзя почти никогда — просто -er.',
        de:'Englisch sagt more expensive. Deutsch sagt teurer.',
        en:'English says more expensive and Russian can say более дорогой. German almost never does this. It adds -er instead.' },
      table:[
        ['\u2717', 'mehr schnell',  '\u2713 schneller'],
        ['\u2717', 'mehr billig',   '\u2713 billiger'],
        ['\u2717', 'mehr teuer',    '\u2713 teurer'],
        ['\u2717', 'mehr klein',    '\u2713 kleiner'],
        ['\u2717', 'mehr sch\u00f6n',    '\u2713 sch\u00f6ner']
      ],
      note:{
        ru:'Даже у длинных слов: interessant \u2192 interessanter. Немецкий не боится длинных слов.',
        de:'Auch bei langen W\u00f6rtern: interessanter.',
        en:'Even with long words: interessant becomes interessanter. German is not shy about length.' }
    },

    { kind:'pick',
      ask:{ ru:'Как правильно?', de:'Was ist richtig?', en:'Which is right?' },
      rounds:[
        { de:'Der Zug ist ___ als der Bus.', answer:'schneller', options:['schneller','mehr schnell'],
          gloss:{ ru:'Поезд быстрее автобуса.', en:'The train is faster than the bus.' } },
        { de:'Dieses Ticket ist ___ als das andere.', answer:'billiger', options:['billiger','mehr billig'],
          gloss:{ ru:'Этот билет дешевле другого.', en:'This ticket is cheaper than the other.' } },
        { de:'Diese Wohnung ist ___ als meine.', answer:'gr\u00f6\u00dfer', options:['gr\u00f6\u00dfer','mehr gro\u00df'],
          gloss:{ ru:'Эта квартира больше моей. groß \u2192 größer, с умлаутом.', en:'This apartment is bigger than mine. groß takes an umlaut.' } },
        { de:'Die Apotheke ist ___ als der Supermarkt.', answer:'n\u00e4her', options:['n\u00e4her','mehr nah'],
          gloss:{ ru:'Аптека ближе супермаркета.', en:'The pharmacy is closer than the supermarket.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Короткие слова берут умлаут', de:'Kurze W\u00f6rter nehmen einen Umlaut', en:'Short words take an umlaut' },
      body:{
        ru:'У многих коротких слов с a, o, u гласная меняется. Не у всех — но у самых частых да, и их стоит выучить сразу тройками.',
        de:'Viele kurze W\u00f6rter mit a, o, u bekommen einen Umlaut.',
        en:'Many short adjectives with a, o or u change the vowel. Not all of them, but the commonest ones do, and they are worth learning as sets of three.' },
      table:[
        ['alt',   'älter',   'am ältesten'],
        ['gro\u00df',  'gr\u00f6\u00dfer',  'am gr\u00f6\u00dften'],
        ['jung',  'jünger',  'am jüngsten'],
        ['kalt',  'kälter',  'am kältesten'],
        ['kurz',  'kürzer',  'am kürzesten'],
        ['lang',  'länger',  'am längsten'],
        ['warm',  'wärmer',  'am wärmsten'],
        ['hoch',  'höher',   'am höchsten']
      ],
      note:{
        ru:'После t, d, s, z добавляется -esten, а не -sten: am kältesten, am kürzesten. Просто иначе не выговорить.',
        de:'Nach t, d, s, z kommt -esten: am k\u00e4ltesten.',
        en:'After t, d, s or z it is -esten rather than -sten: am kältesten, am kürzesten. Otherwise it is unpronounceable.' }
    },

    { kind:'sort',
      ask:{ ru:'Меняется гласная?', de:'Umlaut oder nicht?', en:'Does the vowel change?' },
      bins:[
        { id:'yes', label:'\u0434\u0430 \u2014 alt \u2192 \u00e4lter' },
        { id:'no',  label:'\u043d\u0435\u0442 \u2014 schnell \u2192 schneller' }
      ],
      cards:[
        { text:'kalt',    bin:'yes' },
        { text:'schnell', bin:'no'  },
        { text:'gro\u00df',   bin:'yes' },
        { text:'billig',  bin:'no'  },
        { text:'lang',    bin:'yes' },
        { text:'sch\u00f6n',   bin:'no'  },
        { text:'jung',    bin:'yes' },
        { text:'leicht',  bin:'no'  }
      ]
    },

    { kind:'read',
      head:{ ru:'als или wie', de:'als oder wie', en:'als or wie' },
      body:{
        ru:'als — когда вещи разные. so … wie — когда одинаковые. Это как «чем» и «такой же … как».',
        de:'als bei Unterschied, so \u2026 wie bei Gleichheit.',
        en:'als when the things differ, so … wie when they are the same. Exactly like чем against такой же … как.' },
      show:[
        { de:'Der Zug ist schneller <b>als</b> der Bus.', gloss:{ ru:'Поезд быстрее, чем автобус. Разные.', en:'The train is faster than the bus. Different.' } },
        { de:'Der Bus ist <b>so</b> schnell <b>wie</b> der Zug.', gloss:{ ru:'Автобус такой же быстрый, как поезд. Одинаковые.', en:'The bus is as fast as the train. The same.' } }
      ],
      note:{
        ru:'«schneller wie» слышно на улице, но это не литературный немецкий. Правильно только «schneller als».',
        de:'schneller wie h\u00f6rt man, ist aber nicht Standard.',
        en:'schneller wie is heard on the street but it is not standard German. After a comparative it is always als.' }
    },

    { kind:'pick',
      ask:{ ru:'als или wie?', de:'als oder wie?', en:'als or wie?' },
      rounds:[
        { de:'Der Zug ist schneller ___ der Bus.', answer:'als', options:['als','wie'],
          gloss:{ ru:'Разные \u2192 als.', en:'Different → als.' } },
        { de:'Der Bus ist so schnell ___ der Zug.', answer:'wie', options:['als','wie'],
          gloss:{ ru:'Одинаковые \u2192 wie.', en:'The same → wie.' } },
        { de:'Heute ist es w\u00e4rmer ___ gestern.', answer:'als', options:['als','wie'],
          gloss:{ ru:'Сегодня теплее, чем вчера.', en:'Today is warmer than yesterday.' } },
        { de:'Diese Jacke ist so teuer ___ jene.', answer:'wie', options:['als','wie'],
          gloss:{ ru:'Эта куртка такая же дорогая, как та.', en:'This jacket is as expensive as that one.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Три набора, которые надо просто выучить',
             de:'Drei S\u00e4tze zum Lernen', en:'Three sets to learn whole' },
      body:{
        ru:'Эти три не подчиняются правилу — как и в русском «хороший — лучше — лучший». Учить надо тройками.',
        de:'Diese drei folgen keiner Regel, wie \u0445\u043e\u0440\u043e\u0448\u0438\u0439 \u2013 \u043b\u0443\u0447\u0448\u0435 auch nicht.',
        en:'These three follow no rule, and neither does Russian хороший, лучше, лучший. Learn them as sets.' },
      table:[
        ['gut',  'besser', 'am besten'],
        ['viel', 'mehr',   'am meisten'],
        ['gern', 'lieber', 'am liebsten']
      ],
      note:{
        ru:'Никаких guter, mehrer, gerner. Такие формы не существуют.',
        de:'Es gibt kein guter, mehrer, gerner.',
        en:'There is no guter, no mehrer, no gerner. Those forms do not exist.' }
    },

    { kind:'read',
      head:{ ru:'besser и lieber — не одно и то же',
             de:'besser gegen lieber', en:'besser is not lieber' },
      body:{
        ru:'besser — про качество: получается лучше. lieber — про желание: нравится больше. Разница большая.',
        de:'besser: Qualit\u00e4t. lieber: Vorliebe.',
        en:'besser is about quality — it comes out better. lieber is about preference — you like it more. The gap between them is wide.' },
      show:[
        { de:'Tanya spricht <b>besser</b> Deutsch.', gloss:{ ru:'Таня говорит по-немецки лучше. — умеет лучше.', en:'Tanya speaks German better — she is more able.' } },
        { de:'Tanya spricht <b>lieber</b> Deutsch.', gloss:{ ru:'Таня предпочитает говорить по-немецки. — ей так больше нравится.', en:'Tanya prefers speaking German — she would rather.' } },
        { de:'Ich trinke <b>lieber</b> Tee.', gloss:{ ru:'Я предпочитаю чай.', en:'I prefer tea.' } },
        { de:'<b>Am liebsten</b> trinke ich Kakao.', gloss:{ ru:'Больше всего люблю какао.', en:'Most of all I like cocoa.' } }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Качество или предпочтение?',
            de:'Qualit\u00e4t oder Vorliebe?', en:'Quality, or preference?' },
      rounds:[
        { de:'Die andere Jacke passt ___. (\u043b\u0443\u0447\u0448\u0435 \u0441\u0438\u0434\u0438\u0442)', answer:'besser', options:['besser','lieber'],
          gloss:{ ru:'Другая куртка лучше подходит.', en:'The other jacket fits better.' } },
        { de:'Ich trinke ___ Tee. (\u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0438\u0442\u0430\u044e)', answer:'lieber', options:['besser','lieber'],
          gloss:{ ru:'Я предпочитаю чай.', en:'I prefer tea.' } },
        { de:'Die blaue Jacke passt ___. (\u043b\u0443\u0447\u0448\u0435 \u0432\u0441\u0435\u0433\u043e)', answer:'am besten', options:['am besten','am liebsten'],
          gloss:{ ru:'Синяя куртка подходит лучше всего.', en:'The blue jacket fits best.' } },
        { de:'___ bleibe ich zu Hause. (\u0431\u043e\u043b\u044c\u0448\u0435 \u0432\u0441\u0435\u0433\u043e \u043b\u044e\u0431\u043b\u044e)', answer:'Am liebsten', options:['Am liebsten','Am besten'],
          gloss:{ ru:'Больше всего я люблю оставаться дома.', en:'Most of all I like staying home.' } },
        { de:'Morgen habe ich ___ Zeit als heute.', answer:'mehr', options:['mehr','am meisten'],
          gloss:{ ru:'Завтра у меня будет больше времени, чем сегодня.', en:'Tomorrow I will have more time than today.' } },
        { de:'Am Sonntag habe ich ___ Zeit.', answer:'am meisten', options:['mehr','am meisten'],
          gloss:{ ru:'В воскресенье у меня больше всего времени.', en:'On Sunday I have the most time.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Перед существительным — по-другому',
             de:'Vor einem Substantiv anders', en:'Before a noun it changes' },
      body:{
        ru:'am … sten ставится после глагола. А прямо перед существительным нужен артикль и окончание: der schnellste Zug. В русском тут «самый».',
        de:'Nach dem Verb am \u2026 sten, vor dem Substantiv der schnellste.',
        en:'am …sten goes after a verb. Directly before a noun it needs an article and an ending instead: der schnellste Zug. Russian uses самый here.' },
      show:[
        { de:'Dieser Zug f\u00e4hrt <b>am schnellsten</b>.', gloss:{ ru:'Этот поезд едет быстрее всех. — после глагола.', en:'This train travels the fastest — after the verb.' } },
        { de:'Das ist <b>der schnellste</b> Zug.', gloss:{ ru:'Это самый быстрый поезд. — перед существительным.', en:'That is the fastest train — before the noun.' } },
        { de:'Sie kauft <b>die billigste</b> Jacke.', gloss:{ ru:'Она покупает самую дешёвую куртку.', en:'She buys the cheapest jacket.' } }
      ],
      note:{
        ru:'«der am schnellsten Zug» — так не говорят. Перед существительным am не бывает.',
        de:'der am schnellsten Zug gibt es nicht.',
        en:'der am schnellsten Zug is not a thing. am never appears directly before a noun.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши форму', de:'Schreib die Form', en:'Write the form' },
      rounds:[
        { de:'Heute ist es ___ als gestern. (kalt)', answer:'k\u00e4lter',
          gloss:{ ru:'Сегодня холоднее, чем вчера.', en:'Today it is colder than yesterday.' } },
        { de:'Dieses Gesch\u00e4ft ist ___. (billig, \u0441\u0430\u043c\u044b\u0439)', answer:'am billigsten',
          gloss:{ ru:'Этот магазин самый дешёвый.', en:'This shop is the cheapest.' } },
        { de:'Die andere Jacke passt ___. (gut)', answer:'besser',
          gloss:{ ru:'Другая куртка лучше подходит.', en:'The other jacket fits better.' } },
        { de:'Ich fahre ___ mit dem Zug. (gern, \u043f\u0440\u0435\u0434\u043f\u043e\u0447\u0438\u0442\u0430\u044e)', answer:'lieber',
          gloss:{ ru:'Я предпочитаю ездить на поезде.', en:'I prefer travelling by train.' } },
        { de:'Dieser Weg ist ___ als der andere. (kurz)', answer:'k\u00fcrzer',
          gloss:{ ru:'Этот путь короче другого.', en:'This route is shorter than the other.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'-er для сравнительной, am … sten для превосходной. als когда разные, so … wie когда одинаковые. Никогда mehr перед прилагательным. И три набора наизусть: gut–besser–am besten, viel–mehr–am meisten, gern–lieber–am liebsten.',
        de:'-er, am \u2026 sten, als bei Unterschied, wie bei Gleichheit, nie mehr, und die drei S\u00e4tze auswendig.',
        en:'-er for the comparative, am …sten for the superlative. als when different, so … wie when equal. Never mehr before an adjective. And three sets learned whole: gut–besser–am besten, viel–mehr–am meisten, gern–lieber–am liebsten.' },
      show:[
        { de:'schnell \u00b7 schneller \u00b7 am schnellsten',
          gloss:{ ru:'Обычное слово.', en:'An ordinary word.' } },
        { de:'gut \u00b7 besser \u00b7 am besten',
          gloss:{ ru:'И три исключения — как «хороший — лучше — лучший».', en:'And the three exceptions, like хороший, лучше, лучший.' } }
      ]
    }

  ]
},

/* ==================================================================
   The person in the dative

   The one lesson in this set where Russian is simply right. Мне холодно,
   мне плохо, мне нравится — Russian already puts the person in the dative
   for feelings and reactions, and German does the same thing. The English
   habit of making I the subject is the odd one out, so a Russian speaker
   arrives at this already thinking correctly.

   So the work is not persuasion but two mechanical details: the verb
   agrees with the thing, not the person — die Schuhe gefallen mir, not
   gefällt — and mir ist kalt is not ich bin kalt. The second is worth
   drilling because ich bin kalt is grammatical and means something else
   entirely.
   ================================================================== */
{
  id:'dative-person',
  glyph:'\ud83e\udec2',
  mins:7,
  name:{ ru:'Мне нравится, мне холодно', de:'Mir gef\u00e4llt, mir ist kalt', en:'Mir gefällt, mir ist kalt' },
  sub:{ ru:'Человек в дательном — как в русском',
        de:'Die Person im Dativ \u2014 wie im Russischen',
        en:'The person in the dative — as in Russian' },
  topic:'case',

  steps:[

    { kind:'read',
      head:{ ru:'Здесь русский прав', de:'Hier hat Russisch recht', en:'Here Russian is simply right' },
      body:{
        ru:'«Мне холодно», «мне нравится», «мне плохо» — по-русски человек стоит в дательном. По-немецки точно так же. Странный тут английский, где везде «I».',
        de:'\u041c\u043d\u0435 \u0445\u043e\u043b\u043e\u0434\u043d\u043e, \u043c\u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f \u2014 Deutsch macht dasselbe.',
        en:'Мне холодно, мне нравится, мне плохо — Russian already puts the person in the dative here, and German does exactly the same. English is the odd one out.' },
      show:[
        { de:'<b>Mir</b> ist kalt.', gloss:{ ru:'Мне холодно. — слово в слово.', en:'Мне холодно — word for word.' } },
        { de:'<b>Mir</b> gef\u00e4llt diese Jacke.', gloss:{ ru:'Мне нравится эта куртка.', en:'I like this jacket.' } },
        { de:'<b>Mir</b> ist schlecht.', gloss:{ ru:'Мне плохо.', en:'I feel sick.' } },
        { de:'Der Arzt hilft <b>mir</b>.', gloss:{ ru:'Врач помогает мне.', en:'The doctor helps me.' } }
      ],
      note:{
        ru:'Твоё чутьё здесь работает. Этот урок — самый простой из всех, если довериться русскому.',
        de:'Dein Gef\u00fchl stimmt hier. Diese Lektion ist die einfachste.',
        en:'Her instinct is correct here. This is the easiest lesson in the set if she trusts the Russian.' }
    },

    { kind:'read',
      head:{ ru:'Формы', de:'Die Formen', en:'The forms' },
      body:{
        ru:'Восемь слов. mir и dir встречаются чаще всего остального вместе взятого.',
        de:'Acht W\u00f6rter. mir und dir am h\u00e4ufigsten.',
        en:'Eight words, and mir and dir come up more often than all the rest together.' },
      table:[
        ['ich',  'mir',    'to me'],
        ['du',   'dir',    'to you'],
        ['er',   'ihm',    'to him'],
        ['sie',  'ihr',    'to her'],
        ['wir',  'uns',    'to us'],
        ['ihr',  'euch',   'to you, several'],
        ['sie',  'ihnen',  'to them'],
        ['Sie',  'Ihnen',  'to you, formal']
      ],
      note:{
        ru:'Осторожно: ihr — это и «ей», и «вам» (несколько). А Ihnen с большой буквы — вежливое «вам».',
        de:'ihr hei\u00dft ihr und euch. Ihnen ist die H\u00f6flichkeitsform.',
        en:'Careful: ihr means to her, while euch is to several people. And Ihnen with a capital is the polite form.' }
    },

    { kind:'read',
      head:{ ru:'Шесть глаголов', de:'Sechs Verben', en:'Six verbs' },
      body:{
        ru:'У этих глаголов подлежащее — вещь, а человек в дательном. Проще всего понимать так: «куртка мне нравится», «суп мне вкусен».',
        de:'Das Ding ist Subjekt, die Person steht im Dativ.',
        en:'With these verbs the thing is the subject and the person is dative. The easiest way to hold it: the jacket is pleasing to me, the soup tastes good to me.' },
      table:[
        ['gefallen', 'Die Jacke gef\u00e4llt mir.',  'I like it'],
        ['schmecken','Die Suppe schmeckt mir.',  'it tastes good'],
        ['geh\u00f6ren',  'Die Tasche geh\u00f6rt mir.',  'it is mine'],
        ['helfen',   'Der Arzt hilft mir.',      'helps me'],
        ['passen',   'Die Jacke passt mir.',     'it fits'],
        ['wehtun',   'Der R\u00fccken tut mir weh.', 'it hurts']
      ],
      note:{
        ru:'passen — это и про одежду, и про время: «der Termin passt mir nicht» — время мне не подходит.',
        de:'passen gilt f\u00fcr Kleidung und f\u00fcr Termine.',
        en:'passen covers clothes and appointments alike: der Termin passt mir nicht means the time does not suit me.' }
    },

    { kind:'pick',
      ask:{ ru:'Какое слово?', de:'Welches Wort?', en:'Which word?' },
      rounds:[
        { de:'Die Jacke gef\u00e4llt ___.', answer:'mir', options:['mir','mich'],
          gloss:{ ru:'Мне нравится куртка. Дательный, не винительный.', en:'I like the jacket. Dative, not accusative.' } },
        { de:'Schmeckt der Kaffee ___?', answer:'dir', options:['dir','dich'],
          gloss:{ ru:'Тебе нравится кофе?', en:'Do you like the coffee?' } },
        { de:'Das Handy geh\u00f6rt ___.', answer:'ihm', options:['ihm','ihn'],
          gloss:{ ru:'Телефон принадлежит ему.', en:'The phone belongs to him.' } },
        { de:'Der Arzt hilft ___.', answer:'ihr', options:['ihr','sie'],
          gloss:{ ru:'Врач помогает ей.', en:'The doctor helps her.' } },
        { de:'Kann ich ___ helfen?', answer:'Ihnen', options:['Ihnen','Sie'],
          gloss:{ ru:'Могу я вам помочь? — вежливо.', en:'Can I help you? Formally.' } },
        { de:'Tut der Kopf ___ weh?', answer:'dir', options:['dir','dich'],
          gloss:{ ru:'У тебя болит голова?', en:'Does your head hurt?' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Глагол согласуется с вещью, не с человеком',
             de:'Das Verb richtet sich nach dem Ding',
             en:'The verb agrees with the thing, not the person' },
      body:{
        ru:'Человек в дательном на глагол не влияет вообще. Считай саму вещь: одна или много.',
        de:'Die Dativperson beeinflusst das Verb nicht. Z\u00e4hle das Ding.',
        en:'The dative person has no effect on the verb at all. Count the thing instead: one, or several.' },
      show:[
        { de:'Die Jacke <b>gef\u00e4llt</b> mir. \u2192 Die Schuhe <b>gefallen</b> mir.', gloss:{ ru:'Куртка одна, туфли — много.', en:'One jacket, several shoes.' } },
        { de:'Die Suppe <b>schmeckt</b> mir. \u2192 Die Kartoffeln <b>schmecken</b> mir.', gloss:{ ru:'То же самое.', en:'The same again.' } },
        { de:'Mein R\u00fccken <b>tut</b> mir weh. \u2192 Meine F\u00fc\u00dfe <b>tun</b> mir weh.', gloss:{ ru:'Спина одна, ноги — две.', en:'One back, two feet.' } }
      ],
      note:{
        ru:'В русском ровно так же: «мне нравится куртка», но «мне нравятся туфли». Глагол смотрит на вещь.',
        de:'Russisch macht es genauso: \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f gegen \u043d\u0440\u0430\u0432\u044f\u0442\u0441\u044f.',
        en:'Russian does precisely this too: мне нравится куртка but мне нравятся туфли. The verb looks at the thing.' }
    },

    { kind:'sort',
      ask:{ ru:'Одна вещь или много?', de:'Eins oder mehrere?', en:'One thing, or several?' },
      bins:[
        { id:'one',  label:'gef\u00e4llt \u00b7 schmeckt \u00b7 passt' },
        { id:'many', label:'gefallen \u00b7 schmecken \u00b7 passen' }
      ],
      cards:[
        { text:'Die Jacke ___ mir.',        bin:'one'  },
        { text:'Die Schuhe ___ mir.',       bin:'many' },
        { text:'Die Suppe ___ mir.',        bin:'one'  },
        { text:'Die Kartoffeln ___ uns.',   bin:'many' },
        { text:'Der Mantel ___ ihr.',       bin:'one'  },
        { text:'Die Hosen ___ ihr.',        bin:'many' }
      ]
    },

    { kind:'pick',
      ask:{ ru:'Какая форма глагола?', de:'Welche Verbform?', en:'Which verb form?' },
      rounds:[
        { de:'Die roten Schuhe ___ ihr nicht.', answer:'gefallen', options:['gef\u00e4llt','gefallen'],
          gloss:{ ru:'Красные туфли ей не нравятся. Много \u2192 gefallen.', en:'She does not like the red shoes. Plural → gefallen.' } },
        { de:'Die Kartoffeln ___ uns sehr gut.', answer:'schmecken', options:['schmeckt','schmecken'],
          gloss:{ ru:'Нам очень нравится картошка.', en:'The potatoes taste very good to us.' } },
        { de:'Mein R\u00fccken ___ mir weh.', answer:'tut', options:['tut','tun'],
          gloss:{ ru:'У меня болит спина. Одна \u2192 tut.', en:'My back hurts. Singular → tut.' } },
        { de:'Nach der Arbeit ___ ihr die F\u00fc\u00dfe weh.', answer:'tun', options:['tut','tun'],
          gloss:{ ru:'После работы у неё болят ноги.', en:'Her feet hurt after work.' } },
        { de:'Die Schl\u00fcssel ___ meinem Sohn.', answer:'geh\u00f6ren', options:['geh\u00f6rt','geh\u00f6ren'],
          gloss:{ ru:'Ключи принадлежат моему сыну.', en:'The keys belong to my son.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'mir ist kalt, а не ich bin kalt',
             de:'mir ist kalt, nicht ich bin kalt',
             en:'mir ist kalt, never ich bin kalt' },
      body:{
        ru:'«Ich bin kalt» — грамматически верно и значит совсем другое: что ты холодная на ощупь или холодный человек. Про самочувствие говорят только «mir ist kalt».',
        de:'Ich bin kalt ist korrekt, hei\u00dft aber etwas anderes.',
        en:'Ich bin kalt is grammatical and means something else — that you are cold to the touch, or a cold person. For the feeling it is only mir ist kalt.' },
      show:[
        { de:'<b>Mir ist</b> kalt.', gloss:{ ru:'Мне холодно. — как по-русски.', en:'I feel cold. Exactly the Russian shape.' } },
        { de:'<b>Mir ist</b> warm.', gloss:{ ru:'Мне тепло.', en:'I feel warm.' } },
        { de:'<b>Mir ist</b> schlecht.', gloss:{ ru:'Мне плохо, тошнит.', en:'I feel sick.' } }
      ],
      note:{
        ru:'«Ich bin schlecht» значит «я плохая» или «я плохо это делаю». Не то, что хочется сказать в аптеке.',
        de:'Ich bin schlecht hei\u00dft ich bin schlecht als Mensch.',
        en:'And ich bin schlecht means I am bad, or bad at something. Not what she wants to say in a pharmacy.' }
    },

    { kind:'pick',
      ask:{ ru:'Как сказать про самочувствие?',
            de:'Wie sagt man das Gef\u00fchl?', en:'How to say the feeling' },
      rounds:[
        { de:'___ heute sehr kalt.', answer:'Mir ist', options:['Mir ist','Ich bin'],
          gloss:{ ru:'Мне сегодня очень холодно.', en:'I am very cold today.' } },
        { de:'___ nach dem Essen schlecht.', answer:'Mir ist', options:['Mir ist','Ich bin'],
          gloss:{ ru:'Мне плохо после еды.', en:'I feel sick after eating.' } },
        { de:'___ in der Wohnung warm?', answer:'Ist dir', options:['Ist dir','Bist du'],
          gloss:{ ru:'Тебе тепло в квартире?', en:'Are you warm in the apartment?' } },
        { de:'Der Termin passt ___ nicht.', answer:'uns', options:['uns','wir'],
          gloss:{ ru:'Это время нам не подходит.', en:'The appointment does not suit us.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Про боль — свой оборот', de:'Beim Schmerz', en:'For pain' },
      body:{
        ru:'Болит не «я», а часть тела. Она подлежащее, а человек — в дательном. По-русски похоже: «у меня болит спина» — тоже не «я болю».',
        de:'Nicht ich tut weh, sondern der K\u00f6rperteil.',
        en:'It is not I who hurts but the body part. The part is the subject, the person is dative. Russian avoids I here too: у меня болит спина.' },
      show:[
        { de:'Mein R\u00fccken tut mir weh.', gloss:{ ru:'У меня болит спина.', en:'My back hurts.' } },
        { de:'Tut dir der Kopf weh?', gloss:{ ru:'У тебя болит голова?', en:'Does your head hurt?' } },
        { de:'Meine F\u00fc\u00dfe tun mir weh.', gloss:{ ru:'У меня болят ноги.', en:'My feet hurt.' } }
      ],
      note:{
        ru:'weh уезжает в самый конец, как приставка у разделяемого глагола — потому что это и есть разделяемый глагол: wehtun.',
        de:'weh geht ans Ende, denn wehtun ist trennbar.',
        en:'The weh goes to the very end, like a separable prefix — because that is what it is: wehtun is a separable verb.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши слово', de:'Schreib das Wort', en:'Write the word' },
      rounds:[
        { de:'Diese Jacke passt ___ gut.', answer:'mir',
          gloss:{ ru:'Эта куртка мне хорошо подходит.', en:'This jacket fits me well.' } },
        { de:'___ ist heute kalt.', answer:'Mir',
          gloss:{ ru:'Мне сегодня холодно.', en:'I am cold today.' } },
        { de:'Kannst du ___ bitte helfen?', answer:'mir',
          gloss:{ ru:'Ты можешь мне помочь?', en:'Can you help me please?' } },
        { de:'Die Gr\u00f6\u00dfe passt ___ Mutter. (mein)', answer:'meiner',
          gloss:{ ru:'Размер подходит моей маме. Дательный \u2192 meiner.', en:'The size fits my mother. Dative → meiner.' } },
        { de:'Wir helfen ___ Nachbarn. (unser)', answer:'unseren',
          gloss:{ ru:'Мы помогаем нашим соседям. Множественное \u2192 unseren.', en:'We help our neighbours. Plural → unseren.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Человек в дательном: mir, dir, ihm, ihr, uns. Глагол согласуется с вещью, а не с человеком. И про самочувствие — только «mir ist», никогда «ich bin». Русское чутьё здесь верное, доверься ему.',
        de:'Person im Dativ, Verb nach dem Ding, und mir ist statt ich bin.',
        en:'The person goes in the dative: mir, dir, ihm, ihr, uns. The verb agrees with the thing, never the person. And for a feeling it is mir ist, never ich bin. The Russian instinct is right here — trust it.' },
      show:[
        { de:'Mir gef\u00e4llt \u2026 \u00b7 Mir schmeckt \u2026 \u00b7 Das geh\u00f6rt mir. \u00b7 Das passt mir.',
          gloss:{ ru:'Мне нравится, мне вкусно, это моё, мне подходит.', en:'I like it, it tastes good, it is mine, it fits.' } },
        { de:'Mir ist kalt. \u00b7 Mir ist warm. \u00b7 Mir ist schlecht. \u00b7 Mir tut \u2026 weh.',
          gloss:{ ru:'Мне холодно, тепло, плохо, у меня болит.', en:'I am cold, warm, sick, in pain.' } }
      ]
    }

  ]
},

/* ==================================================================
   zu plus infinitive

   Russian carries the whole idea and none of the marking. Я стараюсь
   учить немецкий puts two verbs side by side with nothing between them;
   German requires zu. So she will produce ich versuche Deutsch lernen and
   it will feel finished to her — a missing word rather than a wrong one,
   which is the hardest kind of error to notice in your own speech.

   Two things make this worth its own lesson rather than a footnote to the
   modals. Separable verbs swallow the zu — anrufen becomes anzurufen,
   which Russian has no equivalent for at all. And modals take no zu,
   which means the two structures sit right next to each other: Ich muss
   anrufen against Ich versuche anzurufen. Learning them apart guarantees
   confusing them.
   ================================================================== */
{
  id:'zu-infinitive',
  glyph:'\ud83d\udd17',
  mins:8,
  name:{ ru:'zu перед вторым глаголом', de:'zu plus Infinitiv', en:'zu plus infinitive' },
  sub:{ ru:'Ich versuche, Deutsch zu lernen',
        de:'Ich versuche, Deutsch zu lernen',
        en:'Ich versuche, Deutsch zu lernen' },
  topic:'order',

  steps:[

    { kind:'read',
      head:{ ru:'Русский ставит два глагола рядом, немецкий — нет',
             de:'Russisch stellt zwei Verben nebeneinander',
             en:'Russian puts two verbs side by side; German does not' },
      body:{
        ru:'«Я стараюсь учить немецкий» — два глагола подряд, ничего между ними. По-немецки между ними обязательно zu. Смысл тот же, просто нужно ещё одно слово.',
        de:'\u042f \u0441\u0442\u0430\u0440\u0430\u044e\u0441\u044c \u0443\u0447\u0438\u0442\u044c \u2014 zwei Verben ohne etwas dazwischen. Deutsch braucht zu.',
        en:'Я стараюсь учить немецкий puts two verbs together with nothing between them. German insists on zu. The meaning is identical; one extra word is needed.' },
      show:[
        { de:'Ich versuche, Deutsch <b>zu</b> lernen.', gloss:{ ru:'Я стараюсь учить немецкий.', en:'I try to learn German.' } },
        { de:'Wir planen, nach Berlin <b>zu</b> fahren.', gloss:{ ru:'Мы планируем поехать в Берлин.', en:'We plan to travel to Berlin.' } },
        { de:'Es ist wichtig, genug Wasser <b>zu</b> trinken.', gloss:{ ru:'Важно пить достаточно воды.', en:'It is important to drink enough water.' } }
      ],
      note:{
        ru:'Опасность именно в этом: «ich versuche Deutsch lernen» звучит для тебя законченно, потому что по-русски так и есть. Пропущенное слово заметить труднее, чем неправильное.',
        de:'Ich versuche Deutsch lernen klingt vollst\u00e4ndig \u2014 im Russischen ist es das auch.',
        en:'That is the danger: ich versuche Deutsch lernen sounds finished to her, because in Russian it is finished. A missing word is harder to hear than a wrong one.' }
    },

    { kind:'read',
      head:{ ru:'Форма', de:'Die Form', en:'The shape' },
      body:{
        ru:'Первая часть вводит ситуацию, потом запятая, потом всё остальное, и в самом конце zu + глагол.',
        de:'Einleitung, Komma, Rest, dann zu plus Infinitiv am Ende.',
        en:'An opening phrase, a comma, everything else, and then zu plus the infinitive right at the end.' },
      table:[
        ['Ich versuche,',          'Deutsch',        'zu lernen'],
        ['Wir planen,',            'nach Berlin',    'zu fahren'],
        ['Es ist wichtig,',        'genug Wasser',   'zu trinken'],
        ['Ich habe vergessen,',    'die T\u00fcr',        'zu schlie\u00dfen'],
        ['Ich habe keine Zeit,',   'heute',          'zu kochen'],
        ['Sie hat Lust,',          'im Park',        'spazieren zu gehen']
      ],
      note:{
        ru:'Запятая — это метка: всё, что после неё, относится ко второму действию. Полезно как ориентир для глаза.',
        de:'Das Komma markiert, wo die Infinitivphrase beginnt.',
        en:'The comma is a marker: everything after it belongs to the second action. Useful as a landmark for the eye.' }
    },

    { kind:'read',
      head:{ ru:'После каких слов', de:'Nach welchen W\u00f6rtern', en:'What triggers it' },
      body:{
        ru:'Три группы: определённые глаголы, оборот «es ist …», и выражения с haben.',
        de:'Drei Gruppen: bestimmte Verben, es ist \u2026, und Ausdr\u00fccke mit haben.',
        en:'Three groups: certain verbs, the es ist … frame, and expressions with haben.' },
      table:[
        ['versuchen',       'Ich versuche, zu \u2026',        'try'],
        ['hoffen',          'Ich hoffe, zu \u2026',           'hope'],
        ['planen',          'Wir planen, zu \u2026',          'plan'],
        ['vergessen',       'Ich habe vergessen, zu \u2026',  'forget'],
        ['anfangen',        'Ich fange an, zu \u2026',        'begin'],
        ['aufh\u00f6ren',        'Sie h\u00f6rt auf, zu \u2026',        'stop'],
        ['Es ist wichtig,', 'genug zu schlafen',        'it is important'],
        ['Es ist schwer,',  'alles zu verstehen',       'it is hard'],
        ['Zeit haben',      'keine Zeit, zu \u2026',          'have time'],
        ['Lust haben',      'Lust, zu \u2026',                'feel like'],
        ['Angst haben',     'Angst, zu \u2026',               'be afraid']
      ]
    },

    { kind:'pick',
      ask:{ ru:'Чего не хватает?', de:'Was fehlt?', en:'What is missing?' },
      rounds:[
        { de:'Ich versuche, jeden Tag Deutsch ___ lernen.', answer:'zu', options:['zu','\u2014'],
          gloss:{ ru:'Я стараюсь каждый день учить немецкий.', en:'I try to study German every day.' } },
        { de:'Wir planen, im Sommer nach Berlin ___ fahren.', answer:'zu', options:['zu','\u2014'],
          gloss:{ ru:'Мы планируем летом поехать в Берлин.', en:'We plan to travel to Berlin in summer.' } },
        { de:'Ich kann heute Deutsch ___ sprechen.', answer:'\u2014', options:['zu','\u2014'],
          gloss:{ ru:'После модального zu не нужно.', en:'No zu after a modal.' } },
        { de:'Es ist wichtig, genug Wasser ___ trinken.', answer:'zu', options:['zu','\u2014'],
          gloss:{ ru:'Важно пить достаточно воды.', en:'It is important to drink enough water.' } },
        { de:'Ich muss heute ___ arbeiten.', answer:'\u2014', options:['zu','\u2014'],
          gloss:{ ru:'Мне надо сегодня работать. Модальный \u2014 без zu.', en:'I have to work today. A modal, so no zu.' } },
        { de:'Sie hat Lust, im Park spazieren ___ gehen.', answer:'zu', options:['zu','\u2014'],
          gloss:{ ru:'Она хочет погулять в парке.', en:'She feels like walking in the park.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Разделяемые глаголы проглатывают zu',
             de:'Trennbare Verben schlucken das zu',
             en:'Separable verbs swallow the zu' },
      body:{
        ru:'У разделяемых глаголов zu встаёт внутрь, между приставкой и глаголом. Одним словом. В русском такого нет вообще — это самое трудное здесь.',
        de:'Bei trennbaren Verben steht zu in der Mitte, als ein Wort.',
        en:'With a separable verb the zu goes inside it, between the prefix and the verb, written as one word. Russian has nothing like this, and it is the hardest part of the lesson.' },
      show:[
        { de:'anrufen \u2192 Tanya versucht, den Arzt <b>anzurufen</b>.', gloss:{ ru:'Таня пытается позвонить врачу.', en:'Tanya is trying to call the doctor.' } },
        { de:'ausmachen \u2192 Ich habe vergessen, das Licht <b>auszumachen</b>.', gloss:{ ru:'Я забыла выключить свет.', en:'I forgot to turn off the light.' } },
        { de:'aufstehen \u2192 Nazar versucht, fr\u00fcher <b>aufzustehen</b>.', gloss:{ ru:'Назар старается вставать раньше.', en:'Nazar is trying to get up earlier.' } },
        { de:'fernsehen \u2192 Sie h\u00f6rt auf, so viel <b>fernzusehen</b>.', gloss:{ ru:'Она перестаёт так много смотреть телевизор.', en:'She is stopping watching so much television.' } }
      ],
      note:{
        ru:'Схема простая: приставка + zu + глагол. an-zu-rufen, auf-zu-stehen, ein-zu-kaufen. Пишется слитно.',
        de:'Pr\u00e4fix + zu + Verb, zusammengeschrieben.',
        en:'The pattern is prefix, then zu, then the verb: an-zu-rufen, auf-zu-stehen, ein-zu-kaufen. Written as one word.' }
    },

    { kind:'sort',
      ask:{ ru:'Где стоит zu?', de:'Wo steht das zu?', en:'Where does the zu go?' },
      bins:[
        { id:'before', label:'zu lernen \u2014 \u043f\u0435\u0440\u0435\u0434' },
        { id:'inside', label:'anzurufen \u2014 \u0432\u043d\u0443\u0442\u0440\u0438' }
      ],
      cards:[
        { text:'lernen',    bin:'before' },
        { text:'anrufen',   bin:'inside' },
        { text:'trinken',   bin:'before' },
        { text:'aufstehen', bin:'inside' },
        { text:'verstehen', bin:'before' },
        { text:'einkaufen', bin:'inside' },
        { text:'bezahlen',  bin:'before' },
        { text:'fernsehen', bin:'inside' }
      ]
    },

    { kind:'read',
      head:{ ru:'be-, ver-, er- не разделяются',
             de:'be-, ver-, er- trennen sich nicht',
             en:'be-, ver-, er- do not split' },
      body:{
        ru:'Приставки be-, ver-, er-, ent-, ge- — не самостоятельные слова, поэтому глагол не разделяется, и zu стоит просто перед ним.',
        de:'be-, ver-, er- sind keine eigenen W\u00f6rter, also bleibt zu davor.',
        en:'The prefixes be-, ver-, er-, ent- and ge- are not words in their own right, so the verb does not split and the zu simply stands in front.' },
      table:[
        ['besuchen',    'zu besuchen',    'not bezusuchen'],
        ['bezahlen',    'zu bezahlen',    'not bezuzahlen'],
        ['verstehen',   'zu verstehen',   'not verzustehen'],
        ['vergessen',   'zu vergessen',   'not verzugessen'],
        ['erkl\u00e4ren',    'zu erkl\u00e4ren',    'not erzukl\u00e4ren'],
        ['probieren',   'zu probieren',   '-ieren verbs too']
      ],
      note:{
        ru:'Проверка та же, что в уроке про разделяемые глаголы: если приставка — самостоятельное слово (an, auf, ein), то zu внутрь. Если нет — снаружи.',
        de:'Dieselbe Probe wie in der Lektion \u00fcber trennbare Verben.',
        en:'The same test as in the separable-verbs lesson: if the prefix is a word on its own — an, auf, ein — the zu goes inside. If not, it stays outside.' }
    },

    { kind:'pick',
      ask:{ ru:'Как правильно?', de:'Welche Form?', en:'Which form?' },
      rounds:[
        { de:'Tanya versucht, den Arzt ___.', answer:'anzurufen', options:['anzurufen','zu anrufen'],
          gloss:{ ru:'anrufen \u2192 anzurufen.', en:'anrufen → anzurufen.' } },
        { de:'Ich habe vergessen, das Licht ___.', answer:'auszumachen', options:['auszumachen','zu ausmachen'],
          gloss:{ ru:'ausmachen \u2192 auszumachen.', en:'ausmachen → auszumachen.' } },
        { de:'Es ist schwer, alles ___.', answer:'zu verstehen', options:['zu verstehen','verzustehen'],
          gloss:{ ru:'ver- не разделяется.', en:'ver- does not split.' } },
        { de:'Wir planen, morgen ___.', answer:'einzukaufen', options:['einzukaufen','zu einkaufen'],
          gloss:{ ru:'einkaufen \u2192 einzukaufen.', en:'einkaufen → einzukaufen.' } },
        { de:'Wir haben die M\u00f6glichkeit, online ___.', answer:'zu bezahlen', options:['zu bezahlen','bezuzahlen'],
          gloss:{ ru:'be- не разделяется.', en:'be- does not split.' } },
        { de:'Nazar versucht, fr\u00fcher ___.', answer:'aufzustehen', options:['aufzustehen','zu aufstehen'],
          gloss:{ ru:'aufstehen \u2192 aufzustehen.', en:'aufstehen → aufzustehen.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Пары, которые надо видеть рядом',
             de:'Paare zum Vergleich', en:'The pairs to see side by side' },
      body:{
        ru:'Модальный глагол — без zu. Всё остальное — с zu. Если учить эти структуры по отдельности, их обязательно перепутаешь.',
        de:'Nach Modalverben kein zu. Sonst mit zu.',
        en:'After a modal, no zu. Everywhere else, zu. Learning the two apart is how they get confused.' },
      show:[
        { de:'Ich <b>muss</b> anrufen. \u00b7 Ich <b>versuche</b>, anzurufen.', gloss:{ ru:'Мне надо позвонить. Я пытаюсь позвонить.', en:'I have to call. I am trying to call.' } },
        { de:'Ich <b>kann</b> fahren. \u00b7 Ich <b>hoffe</b>, zu fahren.', gloss:{ ru:'Я могу поехать. Я надеюсь поехать.', en:'I can drive. I hope to drive.' } },
        { de:'Ich <b>gehe</b> einkaufen. \u00b7 Ich <b>plane</b>, einzukaufen.', gloss:{ ru:'Я иду за покупками. Я планирую сходить за покупками.', en:'I am going shopping. I plan to go shopping.' } }
      ],
      note:{
        ru:'gehen и fahren тоже без zu, когда идёшь что-то делать: ich gehe schwimmen, wir gehen einkaufen. И после lassen — тоже без zu.',
        de:'Auch nach gehen, fahren und lassen kein zu.',
        en:'gehen and fahren also take no zu when you go somewhere to do something: ich gehe schwimmen. Nor does lassen.' }
    },

    { kind:'pick',
      ask:{ ru:'Нужно zu или нет?', de:'Mit oder ohne zu?', en:'With zu, or without?' },
      rounds:[
        { de:'Ich muss den Arzt ___.', answer:'anrufen', options:['anrufen','anzurufen'],
          gloss:{ ru:'После müssen \u2014 без zu.', en:'After müssen, no zu.' } },
        { de:'Ich versuche, den Arzt ___.', answer:'anzurufen', options:['anrufen','anzurufen'],
          gloss:{ ru:'После versuchen \u2014 с zu, и внутрь.', en:'After versuchen, zu — and inside.' } },
        { de:'Wir gehen morgen ___.', answer:'einkaufen', options:['einkaufen','einzukaufen'],
          gloss:{ ru:'gehen + действие \u2014 без zu.', en:'gehen plus an activity takes no zu.' } },
        { de:'Wir planen, morgen ___.', answer:'einzukaufen', options:['einkaufen','einzukaufen'],
          gloss:{ ru:'После planen \u2014 с zu.', en:'After planen, zu.' } },
        { de:'Sie m\u00f6chte heute fr\u00fcher ___.', answer:'aufstehen', options:['aufstehen','aufzustehen'],
          gloss:{ ru:'möchten \u2014 модальный, без zu.', en:'möchten is a modal, so no zu.' } },
        { de:'Sie hofft, heute fr\u00fcher ___.', answer:'aufzustehen', options:['aufstehen','aufzustehen'],
          gloss:{ ru:'После hoffen \u2014 с zu.', en:'After hoffen, zu.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Когда нужен dass, а не zu',
             de:'Wann dass statt zu', en:'When it has to be dass' },
      body:{
        ru:'zu работает, только если действует тот же человек. Если второе действие делает кто-то другой — нужен dass и полное предложение.',
        de:'zu geht nur bei gleichem Subjekt. Sonst dass.',
        en:'zu only works when the same person does both things. If somebody else does the second one, it needs dass and a full clause.' },
      show:[
        { de:'Tanya versucht, Deutsch <b>zu</b> lernen.', gloss:{ ru:'Таня старается учить немецкий. Оба действия её.', en:'Tanya tries, Tanya learns. Same person.' } },
        { de:'Tanya m\u00f6chte, <b>dass</b> Nazar ihr hilft.', gloss:{ ru:'Таня хочет, чтобы Назар ей помог. Разные люди \u2014 нужен dass.', en:'Tanya wants, Nazar helps. Different people, so dass.' } }
      ],
      note:{
        ru:'В русском здесь «чтобы»: «хочу, чтобы он помог». Если по-русски нужно «чтобы» — по-немецки нужен dass, а не zu.',
        de:'Russisch sagt \u0447\u0442\u043e\u0431\u044b. Wo \u0447\u0442\u043e\u0431\u044b steht, braucht Deutsch dass.',
        en:'Russian uses чтобы here — хочу, чтобы он помог. Wherever Russian needs чтобы, German needs dass rather than zu.' }
    },

    { kind:'type',
      ask:{ ru:'Впиши глагол с zu, если нужно',
            de:'Schreib das Verb, mit zu wenn n\u00f6tig',
            en:'Write the verb, with zu if it needs one' },
      rounds:[
        { de:'Ich habe vergessen, die T\u00fcr ___. (schlie\u00dfen)', answer:'zu schlie\u00dfen',
          gloss:{ ru:'Я забыла закрыть дверь.', en:'I forgot to close the door.' } },
        { de:'Tanya versucht, den Arzt ___. (anrufen)', answer:'anzurufen',
          gloss:{ ru:'Таня пытается позвонить врачу.', en:'Tanya is trying to call the doctor.' } },
        { de:'Ich kann heute nicht ___. (kommen)', answer:'kommen',
          gloss:{ ru:'Я не могу сегодня прийти. Модальный \u2014 без zu.', en:'I cannot come today. A modal, so no zu.' } },
        { de:'Es ist wichtig, genug ___. (schlafen)', answer:'zu schlafen',
          gloss:{ ru:'Важно достаточно спать.', en:'It is important to sleep enough.' } },
        { de:'Sie h\u00f6rt auf, so viel ___. (fernsehen)', answer:'fernzusehen',
          gloss:{ ru:'Она перестаёт так много смотреть телевизор.', en:'She is stopping watching so much television.' } },
        { de:'Ich habe keine Zeit, heute ___. (kochen)', answer:'zu kochen',
          gloss:{ ru:'У меня нет времени сегодня готовить.', en:'I have no time to cook today.' } }
      ]
    },

    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'После versuchen, hoffen, planen, vergessen, после «es ist …» и после Zeit/Lust/Angst haben — нужен zu, и он стоит в самом конце. У разделяемых глаголов zu уходит внутрь: anzurufen. После модальных, а также gehen, fahren, lassen — zu не нужен. А если действует другой человек — нужен dass.',
        de:'zu nach versuchen, hoffen, planen, es ist \u2026 und Zeit haben. Bei trennbaren Verben in der Mitte. Nach Modalverben kein zu.',
        en:'zu after versuchen, hoffen, planen, vergessen, after es ist … and after Zeit, Lust or Angst haben — and it sits right at the end. In a separable verb it goes inside: anzurufen. After a modal, or gehen, fahren and lassen, there is no zu. And when somebody else does the second action, it takes dass.' },
      show:[
        { de:'Ich versuche, Deutsch zu lernen. \u00b7 Ich versuche, dich anzurufen.',
          gloss:{ ru:'Обычный глагол и разделяемый.', en:'An ordinary verb, then a separable one.' } },
        { de:'Ich muss Deutsch lernen. \u00b7 Ich muss dich anrufen.',
          gloss:{ ru:'После модального \u2014 ничего.', en:'After a modal, nothing at all.' } }
      ]
    }

  ]
},

];
