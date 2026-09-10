/* data/curriculum-en.js */
/* English lessons.

   Same engine, same four step kinds, same ladder as data/curriculum.js —
   see that file's header for what a lesson is. Nothing here is new
   machinery.

   WHY A SEPARATE FILE AND A SEPARATE GLOBAL. `curriculum.js` assigns
   `window.GH_LESSONS = [...]` outright, so a file that appended to that
   array and happened to load first would have its work wiped. This file
   owns `window.GH_LESSONS_EN` instead, and `GH.lessons.all()`
   concatenates the two — which makes the load order irrelevant.

   `target:'en'` is what puts these in front of an English learner and
   keeps them away from a German one. A lesson with no `target` counts as
   German, which is why none of the seventeen German lessons needed
   editing.

   ------------------------------------------------------------------
   THE `de` FIELD IS THE TARGET LANGUAGE, NOT GERMAN

   In a `pick` or `type` round, `de` holds the sentence being taught — in
   whatever language the lesson is for. It is the same convention packs.js
   uses across the whole site, and the reason ten games needed no changes
   to become multilingual. Here it holds English. `gloss` holds her own
   language, which is why these rounds carry `ru` and `de` glosses and no
   `en` one: she cannot be learning the language she already speaks.

   ------------------------------------------------------------------
   WRITTEN FOR A RUSSIAN SPEAKER

   The German course is contrastive throughout — "When Russian misleads",
   "Russian helps here". This is the same, and it is not decoration: the
   lesson below spends two of its steps on the one error a Russian speaker
   is guaranteed to make, and no other course would bother.

   A second first-language later means new explanations in this file, not
   new code. */

window.GH_LESSONS_EN = [

/* ==================================================================
   BE — am / is / are

   Russian has NO present-tense copula. Я студент. Она дома. Они готовы.
   The verb is simply absent, and it is absent correctly — adding one
   would be wrong Russian.

   So the mistake is not choosing the wrong form of BE. It is leaving BE
   out: "I ready", "She tired", "They at home". A lesson that only ever
   shows her a sentence with a gap already in it never rehearses the one
   thing she will actually get wrong, because the gap does her thinking
   for her.

   Steps 3 and 8 therefore offer the empty option and the dash, and step 2
   states the contrast outright. Everything else is the ordinary ladder.

   Questions and negatives are inside this lesson on purpose, so the
   do/does lesson can later set "Is she tired?" against "Does she work?"
   and land the point that BE is not like other English verbs.
   ================================================================== */
{
  id:'en-be',
  glyph:'\uD83D\uDD17',
  mins:6,
  target:'en',

  name:{
    ru:'\u0413\u043B\u0430\u0433\u043E\u043B be',
    de:'Das Verb be',
    en:'The verb BE'
  },

  sub:{
    ru:'am \u00b7 is \u00b7 are',
    de:'am \u00b7 is \u00b7 are',
    en:'am \u00b7 is \u00b7 are'
  },

  /* NO `topic`. It is the id of a grammar-reference section, and
     lessons.js renders a link to that section whenever it is set. The
     reference has case, gender, irregular, order, past and plural — all
     German. A topic of 'be' would put a button on the finish screen
     leading to a section that does not exist. It goes in the day the
     reference has an English side. */

  steps:[

    /* ---------- 1. the whole system, at once ---------- */
    { kind:'read',
      head:{ ru:'\u0422\u0440\u0438 \u0444\u043E\u0440\u043C\u044B', de:'Drei Formen', en:'Three forms' },
      body:{
        ru:'\u0412 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0443 \u0433\u043B\u0430\u0433\u043E\u043B\u0430 be \u0442\u0440\u0438 \u0444\u043E\u0440\u043C\u044B: am, is \u0438 are. \u0424\u043E\u0440\u043C\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u043F\u043E\u0434\u043B\u0435\u0436\u0430\u0449\u0435\u0433\u043E.',
        de:'Im Pr\u00E4sens hat das englische Verb be drei Formen: am, is und are. Die Form h\u00E4ngt vom Subjekt ab.',
        en:'In the present tense, BE has three forms: am, is, and are. The form depends on the subject.' },
      table:[
        ['I',             'am',  'I am ready.'],
        ['he / she / it', 'is',  'She is tired.'],
        ['you',           'are', 'You are early.'],
        ['we',            'are', 'We are ready.'],
        ['they',          'are', 'They are here.']
      ],
      note:{
        ru:'\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u043F\u043E\u043C\u043D\u0438 \u043F\u0440\u043E\u0441\u0442\u0443\u044E \u0441\u0445\u0435\u043C\u0443: I \u2192 am, he/she/it \u2192 is, \u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2192 are.',
        de:'Merke dir zuerst das einfache Muster: I \u2192 am, he/she/it \u2192 is, alles andere \u2192 are.',
        en:'Start with the simple pattern: I \u2192 am, he/she/it \u2192 is, everything else \u2192 are.' }
    },

    /* ---------- 2. the thing Russian does not do ---------- */
    { kind:'read',
      head:{ ru:'\u0417\u0434\u0435\u0441\u044C \u0440\u0443\u0441\u0441\u043A\u0438\u0439 \u043C\u0435\u0448\u0430\u0435\u0442', de:'Hier st\u00F6rt das Russische', en:'Where Russian misleads' },
      body:{
        ru:'\u041F\u043E-\u0440\u0443\u0441\u0441\u043A\u0438 \u0433\u043B\u0430\u0433\u043E\u043B \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0435 \u043D\u0443\u0436\u0435\u043D: \u042F \u0433\u043E\u0442\u043E\u0432\u0430. \u041E\u043D\u0430 \u0434\u043E\u043C\u0430. \u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439 \u0442\u0430\u043A \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043D\u0438\u043A\u043E\u0433\u0434\u0430. \u0411\u0435\u0437 am, is \u0438\u043B\u0438 are \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435\u0442.',
        de:'Im Russischen steht im Pr\u00E4sens gar kein Verb: \u042F \u0433\u043E\u0442\u043E\u0432\u0430, \u041E\u043D\u0430 \u0434\u043E\u043C\u0430. Englisch kann das nie. Ohne am, is oder are gibt es keinen Satz.',
        en:'Russian needs no verb in the present at all: \u042F \u0433\u043E\u0442\u043E\u0432\u0430, \u041E\u043D\u0430 \u0434\u043E\u043C\u0430. English can never do this. Without am, is or are there is no sentence.' },
      show:[
        { de:'\u2717 I ready. \u00b7 \u2713 I <b>am</b> ready.',
          gloss:{ ru:'\u042F \u0433\u043E\u0442\u043E\u0432\u0430.', de:'Ich bin bereit.' } },
        { de:'\u2717 She tired. \u00b7 \u2713 She <b>is</b> tired.',
          gloss:{ ru:'\u041E\u043D\u0430 \u0443\u0441\u0442\u0430\u043B\u0430.', de:'Sie ist m\u00FCde.' } },
        { de:'\u2717 They at home. \u00b7 \u2713 They <b>are</b> at home.',
          gloss:{ ru:'\u041E\u043D\u0438 \u0434\u043E\u043C\u0430.', de:'Sie sind zu Hause.' } }
      ],
      note:{
        ru:'\u042D\u0442\u043E \u0441\u0430\u043C\u0430\u044F \u0447\u0430\u0441\u0442\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0440\u0443\u0441\u0441\u043A\u043E\u0433\u043E\u0432\u043E\u0440\u044F\u0449\u0438\u0445 \u0432 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u2014 \u043D\u0435 \u043D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430, \u0430 \u043F\u0440\u043E\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0439 \u0433\u043B\u0430\u0433\u043E\u043B.',
        de:'Das ist der h\u00E4ufigste Fehler russischer Sprecher im Englischen \u2014 nicht die falsche Form, sondern das fehlende Verb.',
        en:'This is the commonest English mistake a Russian speaker makes \u2014 not the wrong form, but no verb at all.' }
    },

    /* ---------- 3. is it needed? first rung ---------- */
    { kind:'sort',
      ask:{
        ru:'\u041D\u0443\u0436\u0435\u043D \u0433\u043B\u0430\u0433\u043E\u043B \u0438\u043B\u0438 \u043D\u0435\u0442?',
        de:'Braucht der Satz ein Verb?',
        en:'Does the sentence need a verb?' },
      bins:[
        { id:'need', label:'needs BE' },
        { id:'ok',   label:'complete' }
      ],
      cards:[
        { text:'I ___ ready.',        bin:'need' },
        { text:'She ___ at home.',    bin:'need' },
        { text:'They ___ tired.',     bin:'need' },
        { text:'I am ready.',         bin:'ok'   },
        { text:'She is at home.',     bin:'ok'   },
        { text:'They are tired.',     bin:'ok'   }
      ]
    },

    /* ---------- 4. which form ---------- */
    { kind:'sort',
      ask:{ ru:'\u041A\u0430\u043A\u0430\u044F \u0444\u043E\u0440\u043C\u0430 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442?', de:'Welche Form passt?', en:'Which form fits?' },
      bins:[
        { id:'am',  label:'am'  },
        { id:'is',  label:'is'  },
        { id:'are', label:'are' }
      ],
      cards:[
        { text:'I',          bin:'am'  },
        { text:'she',        bin:'is'  },
        { text:'the dog',    bin:'is'  },
        { text:'you',        bin:'are' },
        { text:'we',         bin:'are' },
        { text:'my friends', bin:'are' }
      ]
    },

    /* ---------- 5. whole sentences ---------- */
    { kind:'pick',
      ask:{ ru:'\u0412\u044B\u0431\u0435\u0440\u0438 am, is \u0438\u043B\u0438 are', de:'W\u00E4hle am, is oder are', en:'Choose am, is or are' },
      rounds:[
        { de:'I ___ tired.', answer:'am', options:['am','is','are'],
          gloss:{ ru:'\u042F \u0443\u0441\u0442\u0430\u043B\u0430.', de:'Ich bin m\u00FCde.' } },
        { de:'She ___ at home.', answer:'is', options:['am','is','are'],
          gloss:{ ru:'\u041E\u043D\u0430 \u0434\u043E\u043C\u0430.', de:'Sie ist zu Hause.' } },
        { de:'The coffee ___ hot.', answer:'is', options:['am','is','are'],
          gloss:{ ru:'\u041A\u043E\u0444\u0435 \u0433\u043E\u0440\u044F\u0447\u0438\u0439.', de:'Der Kaffee ist hei\u00DF.' } },
        { de:'We ___ ready.', answer:'are', options:['am','is','are'],
          gloss:{ ru:'\u041C\u044B \u0433\u043E\u0442\u043E\u0432\u044B.', de:'Wir sind bereit.' } },
        { de:'You ___ early.', answer:'are', options:['am','is','are'],
          gloss:{ ru:'\u0422\u044B \u0440\u0430\u043D\u043E.', de:'Du bist fr\u00FCh.' } },
        { de:'The children ___ outside.', answer:'are', options:['am','is','are'],
          gloss:{ ru:'\u0414\u0435\u0442\u0438 \u043D\u0430 \u0443\u043B\u0438\u0446\u0435.', de:'Die Kinder sind drau\u00DFen.' } }
      ]
    },

    /* ---------- 6. negatives ---------- */
    { kind:'read',
      head:{ ru:'\u0427\u0442\u043E\u0431\u044B \u0441\u043A\u0430\u0437\u0430\u0442\u044C \u00AB\u043D\u0435\u00BB', de:'Verneinung', en:'To say NOT' },
      body:{
        ru:'\u0421 \u0433\u043B\u0430\u0433\u043E\u043B\u043E\u043C be \u0432\u0441\u0451 \u043F\u0440\u043E\u0441\u0442\u043E: \u043F\u043E\u0441\u0442\u0430\u0432\u044C not \u0441\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 am, is \u0438\u043B\u0438 are.',
        de:'Mit be ist die Verneinung einfach: not steht direkt nach am, is oder are.',
        en:'With BE, negatives are simple: put NOT directly after am, is or are.' },
      show:[
        { de:'I <b>am not</b> tired.',
          gloss:{ ru:'\u042F \u043D\u0435 \u0443\u0441\u0442\u0430\u043B\u0430.', de:'Ich bin nicht m\u00FCde.' } },
        { de:'She <b>is not</b> here.',
          gloss:{ ru:'\u0415\u0451 \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u0442.', de:'Sie ist nicht hier.' } },
        { de:'They <b>are not</b> ready.',
          gloss:{ ru:'\u041E\u043D\u0438 \u043D\u0435 \u0433\u043E\u0442\u043E\u0432\u044B.', de:'Sie sind nicht bereit.' } }
      ],
      note:{
        ru:'\u0421 be \u043D\u0435 \u043D\u0443\u0436\u0435\u043D do \u0438\u043B\u0438 does.',
        de:'Mit be braucht man kein do oder does.',
        en:'BE does not need do or does.' }
    },

    /* ---------- 7. positive or negative ---------- */
    { kind:'pick',
      ask:{ ru:'\u0412\u044B\u0431\u0435\u0440\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0443\u044E \u0444\u043E\u0440\u043C\u0443', de:'W\u00E4hle die richtige Form', en:'Choose the correct form' },
      rounds:[
        { de:'I ___ hungry.', answer:'am', options:['am','am not'],
          gloss:{ ru:'\u042F \u0433\u043E\u043B\u043E\u0434\u043D\u0430.', de:'Ich habe Hunger.' } },
        { de:'He ___ at work. He is at home.', answer:'is not', options:['is','is not'],
          gloss:{ ru:'\u041E\u043D \u043D\u0435 \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0435. \u041E\u043D \u0434\u043E\u043C\u0430.', de:'Er ist nicht bei der Arbeit. Er ist zu Hause.' } },
        { de:'We ___ late. We have plenty of time.', answer:'are not', options:['are','are not'],
          gloss:{ ru:'\u041C\u044B \u043D\u0435 \u043E\u043F\u0430\u0437\u0434\u044B\u0432\u0430\u0435\u043C. \u0423 \u043D\u0430\u0441 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438.', de:'Wir sind nicht sp\u00E4t dran. Wir haben genug Zeit.' } },
        { de:'The shop ___ open.', answer:'is', options:['is','are'],
          gloss:{ ru:'\u041C\u0430\u0433\u0430\u0437\u0438\u043D \u043E\u0442\u043A\u0440\u044B\u0442.', de:'Das Gesch\u00E4ft ist ge\u00F6ffnet.' } }
      ]
    },

    /* ---------- 8. questions ---------- */
    { kind:'read',
      head:{ ru:'\u0412\u043E\u043F\u0440\u043E\u0441', de:'Die Frage', en:'Make a question' },
      body:{
        ru:'\u0427\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441 \u0441 be, \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0432\u044C am, is \u0438\u043B\u0438 are \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0434\u043B\u0435\u0436\u0430\u0449\u0438\u043C.',
        de:'F\u00FCr eine Frage mit be stellst du am, is oder are vor das Subjekt.',
        en:'To make a question with BE, move am, is or are in front of the subject.' },
      show:[
        { de:'She <b>is</b> tired. \u2192 <b>Is</b> she tired?',
          gloss:{ ru:'\u041E\u043D\u0430 \u0443\u0441\u0442\u0430\u043B\u0430. \u2192 \u041E\u043D\u0430 \u0443\u0441\u0442\u0430\u043B\u0430?', de:'Sie ist m\u00FCde. \u2192 Ist sie m\u00FCde?' } },
        { de:'They <b>are</b> ready. \u2192 <b>Are</b> they ready?',
          gloss:{ ru:'\u041E\u043D\u0438 \u0433\u043E\u0442\u043E\u0432\u044B. \u2192 \u041E\u043D\u0438 \u0433\u043E\u0442\u043E\u0432\u044B?', de:'Sie sind bereit. \u2192 Sind sie bereit?' } },
        { de:'I <b>am</b> late. \u2192 <b>Am</b> I late?',
          gloss:{ ru:'\u042F \u043E\u043F\u0430\u0437\u0434\u044B\u0432\u0430\u044E. \u2192 \u042F \u043E\u043F\u0430\u0437\u0434\u044B\u0432\u0430\u044E?', de:'Ich bin sp\u00E4t dran. \u2192 Bin ich sp\u00E4t dran?' } }
      ],
      note:{
        ru:'\u041E\u043F\u044F\u0442\u044C \u0436\u0435: do \u043D\u0435 \u043D\u0443\u0436\u0435\u043D. \u0421\u0430\u043C \u0433\u043B\u0430\u0433\u043E\u043B be \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u0432\u043F\u0435\u0440\u0451\u0434.',
        de:'Auch hier braucht man kein do. BE selbst geht nach vorn.',
        en:'Again, no DO is needed. BE itself moves to the front.' }
    },

    /* ---------- 9. statements, negatives, questions, mixed ---------- */
    { kind:'pick',
      ask:{ ru:'\u041A\u0430\u043A\u043E\u0435 \u0441\u043B\u043E\u0432\u043E \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442?', de:'Welches Wort passt?', en:'Which word fits?' },
      rounds:[
        { de:'___ she at home?', answer:'Is', options:['Is','Does','Are'],
          gloss:{ ru:'\u041E\u043D\u0430 \u0434\u043E\u043C\u0430?', de:'Ist sie zu Hause?' } },
        { de:'___ they ready?', answer:'Are', options:['Is','Are','Do'],
          gloss:{ ru:'\u041E\u043D\u0438 \u0433\u043E\u0442\u043E\u0432\u044B?', de:'Sind sie bereit?' } },
        { de:'He ___ not hungry.', answer:'is', options:['is','does','are'],
          gloss:{ ru:'\u041E\u043D \u043D\u0435 \u0433\u043E\u043B\u043E\u0434\u0435\u043D.', de:'Er hat keinen Hunger.' } },
        { de:'I ___ not late.', answer:'am', options:['am','is','do'],
          gloss:{ ru:'\u042F \u043D\u0435 \u043E\u043F\u0430\u0437\u0434\u044B\u0432\u0430\u044E.', de:'Ich bin nicht sp\u00E4t dran.' } },
        { de:'___ you tired?', answer:'Are', options:['Are','Is','Do'],
          gloss:{ ru:'\u0422\u044B \u0443\u0441\u0442\u0430\u043B\u0430?', de:'Bist du m\u00FCde?' } }
      ]
    },

    /* ---------- 10. last rung, no choices ---------- */
    { kind:'type',
      ask:{ ru:'\u0412\u043F\u0438\u0448\u0438 \u043D\u0443\u0436\u043D\u0443\u044E \u0444\u043E\u0440\u043C\u0443 be', de:'Schreib die richtige Form von be', en:'Type the correct form of BE' },
      rounds:[
        { de:'I ___ ready.', answer:'am',
          gloss:{ ru:'\u042F \u0433\u043E\u0442\u043E\u0432\u0430.', de:'Ich bin bereit.' } },
        { de:'My son ___ at school.', answer:'is',
          gloss:{ ru:'\u041C\u043E\u0439 \u0441\u044B\u043D \u0432 \u0448\u043A\u043E\u043B\u0435.', de:'Mein Sohn ist in der Schule.' } },
        { de:'We ___ not late.', answer:'are',
          gloss:{ ru:'\u041C\u044B \u043D\u0435 \u043E\u043F\u0430\u0437\u0434\u044B\u0432\u0430\u0435\u043C.', de:'Wir sind nicht sp\u00E4t dran.' } },
        { de:'___ she tired?', answer:'Is',
          gloss:{ ru:'\u041E\u043D\u0430 \u0443\u0441\u0442\u0430\u043B\u0430?', de:'Ist sie m\u00FCde?' } },
        { de:'___ they at home?', answer:'Are',
          gloss:{ ru:'\u041E\u043D\u0438 \u0434\u043E\u043C\u0430?', de:'Sind sie zu Hause?' } },
        { de:'I ___ not hungry.', answer:'am',
          gloss:{ ru:'\u042F \u043D\u0435 \u0433\u043E\u043B\u043E\u0434\u043D\u0430.', de:'Ich habe keinen Hunger.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'\u041A\u043E\u0440\u043E\u0442\u043A\u043E', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'I \u2192 am. He, she, it \u2192 is. You, we, they \u2192 are. \u0413\u043B\u0430\u0433\u043E\u043B \u043D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C, \u043A\u0430\u043A \u0432 \u0440\u0443\u0441\u0441\u043A\u043E\u043C. \u0414\u043B\u044F \u043E\u0442\u0440\u0438\u0446\u0430\u043D\u0438\u044F \u0434\u043E\u0431\u0430\u0432\u044C not \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0433\u043E, \u0430 \u0434\u043B\u044F \u0432\u043E\u043F\u0440\u043E\u0441\u0430 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0438 \u0435\u0433\u043E \u0432\u043F\u0435\u0440\u0451\u0434.',
        de:'I \u2192 am. He, she, it \u2192 is. You, we, they \u2192 are. Das Verb darf nie fehlen, anders als im Russischen. F\u00FCr die Verneinung kommt not danach, f\u00FCr eine Frage kommt BE vor das Subjekt.',
        en:'I \u2192 am. He, she, it \u2192 is. You, we, they \u2192 are. The verb can never be left out, the way Russian leaves it out. Add NOT after it for a negative, and move it in front of the subject for a question.' },
      show:[
        { de:'I <b>am</b> ready.' },
        { de:'She <b>is not</b> ready.' },
        { de:'<b>Are</b> they ready?' }
      ]
    }

  ]
},

/* ==================================================================
   DO / DOES / DID — questions and negatives

   Russian makes a question with intonation alone and a negative with
   one word in front of the verb: Ты работаешь? Ты не работаешь. Nothing
   is added, nothing moves, and the verb never changes form. English
   inserts a whole extra verb and then TAKES THE GRAMMAR OFF the main
   one — which is two unfamiliar moves in one step.

   So the lesson's spine is not "which helper". It is: the helper carries
   the person and the tense, therefore the main verb goes back to base.
   Does she works and Did he went are the two errors that survive
   everything else, and they get their own card.

   Contractions ARE taught here, unlike the BE lesson. don't and doesn't
   so dominate real English that withholding them makes the lesson less
   useful rather than cleaner.

   Ends on the bridge back to lesson one — Is she tired? against Does she
   work? — because that contrast is what turns two lessons into a system.

   The pick step for the vanishing -s is written as a REVERSAL, not as a
   choice between two whole sentences: "She ___ here" wants works, "Does
   she ___ here?" wants work. The engine's pick step is a gap in one
   sentence, so a two-sentence comparison would not fit it — and the
   reversal is the better exercise anyway, because she produces both
   forms instead of recognising a wrong one.
   ================================================================== */
{
  id:'en-do',
  glyph:'❓',
  mins:8,
  target:'en',

  name:{
    ru:'do · does · did',
    de:'do · does · did',
    en:'DO · DOES · DID'
  },

  sub:{
    ru:'Вопросы и отрицания с обычными глаголами',
    de:'Fragen und Verneinungen mit normalen Verben',
    en:'Questions and negatives with ordinary verbs'
  },

  steps:[

    /* ---------- 1. the idea, and the link to BE ---------- */
    { kind:'read',
      head:{ ru:'Английскому нужен вспомогательный глагол', de:'Englisch braucht ein Hilfsverb', en:'English needs a helper' },
      body:{
        ru:'С большинством глаголов английский использует do, чтобы образовывать вопросы и отрицания. По-русски достаточно интонации или одного «не» — в английском добавляется целое слово.',
        de:'Bei den meisten Verben benutzt Englisch do, um Fragen und Verneinungen zu bilden. Im Russischen genügt die Betonung oder ein einziges «не» — im Englischen kommt ein ganzes Wort dazu.',
        en:'With most verbs, English uses do to make questions and negatives. Russian manages with intonation or a single «не»; English adds a whole word.' },
      show:[
        { de:'You work here. → <b>Do</b> you work here?',
          gloss:{ ru:'Ты работаешь здесь? — по-русски меняется только интонация.', de:'Im Russischen ändert sich nur die Betonung.' } },
        { de:'You work here. → You <b>do not</b> work here.',
          gloss:{ ru:'Ты здесь не работаешь.', de:'Du arbeitest hier nicht.' } },
        { de:'<b>Is</b> she tired? · <b>Does</b> she work?',
          gloss:{ ru:'be сам себе помощник. Обычным глаголам нужен do.', de:'BE ist sein eigenes Hilfsverb. Normale Verben brauchen do.' } }
      ],
      note:{
        ru:'С глаголом be вспомогательный do не нужен. С обычными глаголами он обычно нужен.',
        de:'BE braucht kein do. Normale Verben brauchen es normalerweise.',
        en:'BE does not need do. Ordinary verbs usually do.' }
    },

    /* ---------- 2. do or does ---------- */
    { kind:'sort',
      ask:{ ru:'DO или DOES?', de:'DO oder DOES?', en:'DO or DOES?' },
      bins:[
        { id:'do',   label:'do'   },
        { id:'does', label:'does' }
      ],
      cards:[
        { text:'I',          bin:'do'   },
        { text:'you',        bin:'do'   },
        { text:'we',         bin:'do'   },
        { text:'they',       bin:'do'   },
        { text:'my friends', bin:'do'   },
        { text:'he',         bin:'does' },
        { text:'she',        bin:'does' },
        { text:'my son',     bin:'does' },
        { text:'the dog',    bin:'does' }
      ]
    },

    /* ---------- 3. build the question ---------- */
    { kind:'pick',
      ask:{ ru:'Составь вопрос', de:'Bilde die Frage', en:'Make the question' },
      rounds:[
        { de:'___ you live here?', answer:'Do', options:['Do','Does'],
          gloss:{ ru:'Ты здесь живёшь?', de:'Wohnst du hier?' } },
        { de:'___ she work today?', answer:'Does', options:['Do','Does'],
          gloss:{ ru:'Она сегодня работает?', de:'Arbeitet sie heute?' } },
        { de:'___ they speak English?', answer:'Do', options:['Do','Does'],
          gloss:{ ru:'Они говорят по-английски?', de:'Sprechen sie Englisch?' } },
        { de:'___ he like coffee?', answer:'Does', options:['Do','Does'],
          gloss:{ ru:'Он любит кофе?', de:'Mag er Kaffee?' } },
        { de:'___ we need milk?', answer:'Do', options:['Do','Does'],
          gloss:{ ru:'Нам нужно молоко?', de:'Brauchen wir Milch?' } },
        { de:'___ your mother drive?', answer:'Does', options:['Do','Does'],
          gloss:{ ru:'Твоя мама водит машину?', de:'Fährt deine Mutter Auto?' } }
      ]
    },

    /* ---------- 4. the rule of the lesson ---------- */
    { kind:'read',
      head:{ ru:'Окончание -s переходит к DOES', de:'Das -s wandert zu DOES', en:'The -s moves to DOES' },
      body:{
        ru:'После does основной глагол возвращается к начальной форме. does уже показывает третье лицо, и второй раз это не показывают.',
        de:'Nach does steht das Hauptverb wieder in der Grundform. does trägt die 3. Person schon, und das wird nicht zweimal markiert.',
        en:'After does, the main verb returns to its base form. does already carries the third person, and English does not mark it twice.' },
      show:[
        { de:'She work<b>s</b> here. → <b>Does</b> she work here?',
          gloss:{ ru:'Не «Does she works here?»', de:'Nicht „Does she works here?“' } },
        { de:'He like<b>s</b> tea. → <b>Does</b> he like tea?',
          gloss:{ ru:'Он любит чай?', de:'Mag er Tee?' } },
        { de:'The shop open<b>s</b> at eight. → <b>Does</b> the shop open at eight?',
          gloss:{ ru:'Магазин открывается в восемь?', de:'Öffnet der Laden um acht?' } }
      ],
      note:{
        ru:'Окончание -s есть только в одном месте предложения — либо на глаголе, либо в does.',
        de:'Das -s steht nur an einer Stelle im Satz — entweder am Verb oder in does.',
        en:'The -s appears in one place only — on the verb, or inside does.' }
    },

    /* ---------- 5. the -s, both directions ---------- */
    { kind:'pick',
      ask:{ ru:'Найди правильную форму', de:'Finde die richtige Form', en:'Which form is right?' },
      rounds:[
        { de:'She ___ here.', answer:'works', options:['work','works'],
          gloss:{ ru:'Она здесь работает.', de:'Sie arbeitet hier.' } },
        { de:'Does she ___ here?', answer:'work', options:['work','works'],
          gloss:{ ru:'Она здесь работает?', de:'Arbeitet sie hier?' } },
        { de:'He ___ coffee.', answer:'likes', options:['like','likes'],
          gloss:{ ru:'Он любит кофе.', de:'Er mag Kaffee.' } },
        { de:'Does he ___ coffee?', answer:'like', options:['like','likes'],
          gloss:{ ru:'Он любит кофе?', de:'Mag er Kaffee?' } },
        { de:'Anna ___ in Berlin.', answer:'lives', options:['live','lives'],
          gloss:{ ru:'Анна живёт в Берлине.', de:'Anna wohnt in Berlin.' } },
        { de:'Does Anna ___ in Berlin?', answer:'live', options:['live','lives'],
          gloss:{ ru:'Анна живёт в Берлине?', de:'Wohnt Anna in Berlin?' } }
      ]
    },

    /* ---------- 6. negatives, with the contractions ---------- */
    { kind:'read',
      head:{ ru:'Отрицания', de:'Verneinungen', en:'Negatives' },
      body:{
        ru:'do not → don\u2019t и does not → doesn\u2019t — обычные сокращённые формы, и в живом языке слышно почти только их. Основной глагол снова в начальной форме.',
        de:'do not → don\u2019t und does not → doesn\u2019t sind die üblichen Kurzformen, und im echten Englisch hört man fast nur sie. Das Hauptverb steht wieder in der Grundform.',
        en:'do not → don\u2019t and does not → doesn\u2019t are the normal contracted forms, and in real English they are almost all you hear. The main verb is in its base form again.' },
      show:[
        { de:'I <b>don\u2019t</b> understand.',
          gloss:{ ru:'Я не понимаю.', de:'Ich verstehe nicht.' } },
        { de:'She <b>doesn\u2019t</b> drive.',
          gloss:{ ru:'Она не водит машину.', de:'Sie fährt nicht Auto.' } },
        { de:'She <b>doesn\u2019t</b> like coffee.',
          gloss:{ ru:'Не «doesn\u2019t likes».', de:'Nicht „doesn\u2019t likes“.' } },
        { de:'They <b>don\u2019t</b> live here.',
          gloss:{ ru:'Они здесь не живут.', de:'Sie wohnen nicht hier.' } }
      ]
    },

    /* ---------- 7. don't or doesn't ---------- */
    { kind:'pick',
      ask:{ ru:'Выбери правильную форму', de:'Wähle die richtige Form', en:'Choose the correct form' },
      rounds:[
        { de:'I ___ understand.', answer:'don\u2019t', options:['don\u2019t','doesn\u2019t'],
          gloss:{ ru:'Я не понимаю.', de:'Ich verstehe nicht.' } },
        { de:'He ___ eat meat.', answer:'doesn\u2019t', options:['don\u2019t','doesn\u2019t'],
          gloss:{ ru:'Он не ест мясо.', de:'Er isst kein Fleisch.' } },
        { de:'They ___ live here.', answer:'don\u2019t', options:['don\u2019t','doesn\u2019t'],
          gloss:{ ru:'Они здесь не живут.', de:'Sie wohnen nicht hier.' } },
        { de:'The shop ___ open today.', answer:'doesn\u2019t', options:['don\u2019t','doesn\u2019t'],
          gloss:{ ru:'Магазин сегодня не открывается.', de:'Der Laden öffnet heute nicht.' } },
        { de:'She doesn\u2019t ___ coffee.', answer:'like', options:['like','likes'],
          gloss:{ ru:'Она не любит кофе.', de:'Sie mag keinen Kaffee.' } }
      ]
    },

    /* ---------- 8. the past is simpler ---------- */
    { kind:'read',
      head:{ ru:'В прошедшем времени используется DID', de:'In der Vergangenheit verwendet man DID', en:'Past tense uses DID' },
      body:{
        ru:'Для всех лиц используется did. DID показывает прошедшее время, поэтому основной глагол возвращается к начальной форме — и это работает даже с неправильными глаголами.',
        de:'Für alle Personen verwendet man did. DID trägt die Vergangenheit, deshalb steht das Hauptverb wieder in der Grundform — und das gilt auch für unregelmäßige Verben.',
        en:'Everyone uses did. DID carries the past, so the main verb returns to its base form — and that holds for irregular verbs too.' },
      show:[
        { de:'She worked yesterday. → <b>Did</b> she work yesterday?',
          gloss:{ ru:'Она вчера работала?', de:'Hat sie gestern gearbeitet?' } },
        { de:'He <b>went</b> home. → <b>Did</b> he <b>go</b> home?',
          gloss:{ ru:'Не «Did he went home?»', de:'Nicht „Did he went home?“' } },
        { de:'They saw the film. → <b>Did</b> they see the film?',
          gloss:{ ru:'Они смотрели этот фильм?', de:'Haben sie den Film gesehen?' } },
        { de:'She <b>didn\u2019t</b> buy bread.',
          gloss:{ ru:'Она не купила хлеб.', de:'Sie hat kein Brot gekauft.' } }
      ],
      note:{
        ru:'Здесь английский проще русского: одна форма did на все лица.',
        de:'Hier ist Englisch einfacher als Russisch: ein einziges did für alle Personen.',
        en:'Here English is the easier language: one did for every person.' }
    },

    /* ---------- 9. person and time together ---------- */
    { kind:'pick',
      ask:{ ru:'DO, DOES или DID?', de:'DO, DOES oder DID?', en:'DO, DOES or DID?' },
      rounds:[
        { de:'___ you work here?', answer:'Do', options:['Do','Does','Did'],
          gloss:{ ru:'Ты здесь работаешь?', de:'Arbeitest du hier?' } },
        { de:'___ she work here?', answer:'Does', options:['Do','Does','Did'],
          gloss:{ ru:'Она здесь работает?', de:'Arbeitet sie hier?' } },
        { de:'___ she work here last year?', answer:'Did', options:['Do','Does','Did'],
          gloss:{ ru:'Она работала здесь в прошлом году?', de:'Hat sie letztes Jahr hier gearbeitet?' } },
        { de:'___ they like this restaurant?', answer:'Do', options:['Do','Does','Did'],
          gloss:{ ru:'Им нравится этот ресторан?', de:'Mögen sie dieses Restaurant?' } },
        { de:'___ he call you yesterday?', answer:'Did', options:['Do','Does','Did'],
          gloss:{ ru:'Он звонил тебе вчера?', de:'Hat er dich gestern angerufen?' } },
        { de:'___ your son play football?', answer:'Does', options:['Do','Does','Did'],
          gloss:{ ru:'Твой сын играет в футбол?', de:'Spielt dein Sohn Fußball?' } },
        { de:'___ they go to Berlin last week?', answer:'Did', options:['Do','Does','Did'],
          gloss:{ ru:'Они ездили в Берлин на прошлой неделе?', de:'Sind sie letzte Woche nach Berlin gefahren?' } }
      ],
      note:{
        ru:'Обращай внимание и на подлежащее, и на время.',
        de:'Achte sowohl auf das Subjekt als auch auf die Zeit.',
        en:'Notice both the subject and the time.' }
    },

    /* ---------- 10. the whole pattern on one card ---------- */
    { kind:'read',
      head:{ ru:'Посмотри на всю схему', de:'Sieh dir das ganze Muster an', en:'See the whole pattern' },
      body:{
        ru:'DO/DOES/DID передаёт грамматическую информацию. Основной глагол остаётся в начальной форме.',
        de:'DO/DOES/DID trägt die grammatische Information. Das Hauptverb bleibt in der Grundform.',
        en:'DO/DOES/DID carries the grammar. The main verb stays basic.' },
      show:[
        { de:'She works here. · <b>Does</b> she work here? · She <b>doesn\u2019t</b> work here.',
          gloss:{ ru:'Настоящее время.', de:'Gegenwart.' } },
        { de:'She worked here. · <b>Did</b> she work here? · She <b>didn\u2019t</b> work here.',
          gloss:{ ru:'Прошедшее время. Схема та же.', de:'Vergangenheit. Dasselbe Muster.' } }
      ]
    },

    /* ---------- 11. the two errors that survive ---------- */
    { kind:'read',
      head:{ ru:'Две частые ошибки', de:'Zwei häufige Fehler', en:'The two common errors' },
      body:{
        ru:'После does или did — начальная форма глагола. Ни -s, ни прошедшего времени второй раз.',
        de:'Nach does oder did steht das Verb in der Grundform. Kein zweites -s und keine zweite Vergangenheit.',
        en:'After does or did, use the base verb. No second -s, and no second past.' },
      show:[
        { de:'\u2717 Does she work<b>s</b>? · \u2713 Does she work?',
          gloss:{ ru:'-s уже внутри does.', de:'Das -s steckt schon in does.' } },
        { de:'\u2717 Did he <b>went</b>? · \u2713 Did he go?',
          gloss:{ ru:'Прошедшее время уже внутри did.', de:'Die Vergangenheit steckt schon in did.' } }
      ]
    },

    /* ---------- 12. no choices, and strict ----------
       `exact:true`: this step's own answers include both `Do` and `go`,
       which are one edit apart, so the fuzzy matcher accepted `go` where
       the answer was `Do` — in the lesson about do/does/did. */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши пропущенное слово', de:'Schreib das fehlende Wort', en:'Type the missing word' },
      rounds:[
        { de:'___ you speak English?', answer:'Do',
          gloss:{ ru:'Ты говоришь по-английски?', de:'Sprichst du Englisch?' } },
        { de:'___ she live here?', answer:'Does',
          gloss:{ ru:'Она здесь живёт?', de:'Wohnt sie hier?' } },
        { de:'She ___ not eat meat.', answer:'does',
          gloss:{ ru:'Она не ест мясо.', de:'Sie isst kein Fleisch.' } },
        { de:'___ they come yesterday?', answer:'Did',
          gloss:{ ru:'Они приходили вчера?', de:'Sind sie gestern gekommen?' } },
        { de:'Does he ___ coffee?', answer:'like',
          gloss:{ ru:'Он любит кофе?', de:'Mag er Kaffee?' } },
        { de:'Did she ___ the bus?', answer:'take',
          gloss:{ ru:'Она поехала на автобусе?', de:'Hat sie den Bus genommen?' } },
        { de:'He didn\u2019t ___ home early.', answer:'go',
          gloss:{ ru:'Он не пошёл домой рано.', de:'Er ist nicht früh nach Hause gegangen.' } },
        { de:'She doesn\u2019t ___ German.', answer:'speak',
          gloss:{ ru:'Она не говорит по-немецки.', de:'Sie spricht kein Deutsch.' } },
        { de:'Did they ___ the film?', answer:'see',
          gloss:{ ru:'Они смотрели этот фильм?', de:'Haben sie den Film gesehen?' } }
      ]
    },

    /* ---------- finish, and the bridge back to BE ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Zusammenfassung', en:'In short' },
      body:{
        ru:'Настоящее время: I / you / we / they → do, he / she / it → does. Прошедшее: для всех did. После do / does / did используй начальную форму глагола.',
        de:'Gegenwart: I / you / we / they → do, he / she / it → does. Vergangenheit: für alle did. Nach do / does / did steht das Verb in der Grundform.',
        en:'Present: I / you / we / they → do, he / she / it → does. Past: did for everyone. After do / does / did, use the base verb.' },
      show:[
        { de:'<b>Does</b> she work? · She <b>doesn\u2019t</b> work.',
          gloss:{ ru:'Настоящее время.', de:'Gegenwart.' } },
        { de:'<b>Did</b> she work? · She <b>didn\u2019t</b> work.',
          gloss:{ ru:'Прошедшее время.', de:'Vergangenheit.' } },
        { de:'<b>Is</b> she tired? · <b>Does</b> she work?',
          gloss:{ ru:'be — сам себе помощник. Обычный глагол берёт do.', de:'BE ist sein eigenes Hilfsverb. Ein normales Verb nimmt do.' } }
      ]
    }

  ]
},

/* ==================================================================
   Question words — who · what · where · when · why · how

   The fourth English lesson, and the first that is mostly assembly
   rather than new material. It teaches ONE rule — question word first,
   then the question she already knows — and spends its rungs on the
   part Russian does not prepare her for.

   Russian gets the easy half free: кто, что, где, когда, почему, как map
   onto the six English words with no surprises. So choosing the word is
   the first rung and it is deliberately short. The hard half is that
   Russian needs NOTHING after the question word:

     Где она работает?      → Where she works?     (no does)
     Почему они опаздывают? → Why they are late?   (no inversion)
     Кто звонил?            → Who did call?        (an extra did)

   The middle of the lesson is therefore the helper slot, not the word.

   who-as-subject comes last and small. It is a real distinction — Who
   called you? against Who did you call? — but it gets one card, because
   letting it dominate would bury the pattern the other five words share.
   German misleads here specifically: it uses the same verb form either
   way.

   Six bins do not fit a sort step, so the six words are sorted in two
   passes of three. Three is what curriculum.js's own header says a sort
   should carry.

   GENDERED RUSSIAN: «Почему ты устала?» addresses her directly and the
   Russian past inflects, so those glosses carry `ru` (feminine) and
   `ruM` (masculine); lessons.js's `say()` picks between them. Glosses
   about Nazar or about her — Назар устал, Она ушла рано — are NOT
   twinned. They are about someone else and already correct.
   ================================================================== */
{
  id:'en-questions',
  glyph:'\u2753',
  mins:8,
  target:'en',

  name:{
    ru:'Вопросительные слова',
    de:'Fragewörter',
    en:'Question words'
  },

  sub:{
    ru:'who · what · where · when · why · how',
    de:'who · what · where · when · why · how',
    en:'who · what · where · when · why · how'
  },

  steps:[

    /* ---------- 1. the six words ---------- */
    { kind:'read',
      head:{ ru:'Шесть полезных вопросительных слов', de:'Sechs nützliche Fragewörter', en:'Six useful question words' },
      body:{
        ru:'Вопросительное слово показывает, какую информацию ты хочешь получить. Здесь русский почти не мешает: слова соответствуют один к одному.',
        de:'Das Fragewort zeigt, welche Information du wissen möchtest. Hier stört das Russische kaum: die Wörter entsprechen sich eins zu eins.',
        en:'The question word tells you what information you want. Russian barely interferes here — the words match one for one.' },
      table:[
        ['who',   'кто · wer',      'a person'],
        ['what',  'что · was',      'a thing or information'],
        ['where', 'где, куда · wo', 'a place'],
        ['when',  'когда · wann',   'a time'],
        ['why',   'почему · warum', 'a reason'],
        ['how',   'как · wie',      'a way or manner']
      ],
      note:{
        ru:'Английское where покрывает и «где», и «куда» — выбирать не нужно.',
        de:'Englisch where deckt „wo“ und „wohin“ ab — man muss sich nicht entscheiden.',
        en:'English where covers both где and куда — there is nothing to choose between.' }
    },

    /* ---------- 2. sort, first three ---------- */
    { kind:'sort',
      ask:{ ru:'О чём ты спрашиваешь?', de:'Wonach fragst du?', en:'What are you asking about?' },
      bins:[
        { id:'person', label:'who'   },
        { id:'place',  label:'where' },
        { id:'time',   label:'when'  }
      ],
      cards:[
        { text:'a person',        bin:'person' },
        { text:'Nazar.',          bin:'person' },
        { text:'a place',         bin:'place'  },
        { text:'In the kitchen.', bin:'place'  },
        { text:'a time',          bin:'time'   },
        { text:'At seven.',       bin:'time'   }
      ]
    },

    /* ---------- 3. sort, second three ---------- */
    { kind:'sort',
      ask:{ ru:'О чём ты спрашиваешь?', de:'Wonach fragst du?', en:'What are you asking about?' },
      bins:[
        { id:'thing',  label:'what' },
        { id:'reason', label:'why'  },
        { id:'way',    label:'how'  }
      ],
      cards:[
        { text:'a thing',      bin:'thing'  },
        { text:'Coffee.',      bin:'thing'  },
        { text:'a reason',     bin:'reason' },
        { text:'It is cold.',  bin:'reason' },
        { text:'a way',        bin:'way'    },
        { text:'By bus.',      bin:'way'    }
      ]
    },

    /* ---------- 4. choose the word ---------- */
    { kind:'pick',
      ask:{ ru:'Выбери вопросительное слово', de:'Wähle das Fragewort', en:'Choose the question word' },
      rounds:[
        { de:'___ is that man?', answer:'Who', options:['Who','What'],
          gloss:{ ru:'Кто этот мужчина?', de:'Wer ist dieser Mann?' } },
        { de:'___ do you live?', answer:'Where', options:['Where','When'],
          gloss:{ ru:'Где ты живёшь?', de:'Wo wohnst du?' } },
        { de:'___ is your birthday?', answer:'When', options:['When','Where'],
          gloss:{ ru:'Когда у тебя день рождения?', de:'Wann hast du Geburtstag?' } },
        { de:'___ are you tired?', answer:'Why', options:['Why','How'],
          gloss:{ ru:'Почему ты устала?', ruM:'Почему ты устал?', de:'Warum bist du müde?' } },
        { de:'___ does this word mean?', answer:'What', options:['What','Who'],
          gloss:{ ru:'Что означает это слово?', de:'Was bedeutet dieses Wort?' } },
        { de:'___ do you go to work? By bus.', answer:'How', options:['How','Where'],
          gloss:{ ru:'Как ты едешь на работу?', de:'Wie fährst du zur Arbeit?' } },
        { de:'___ did she call? Yesterday.', answer:'When', options:['When','Why'],
          gloss:{ ru:'Когда она звонила?', de:'Wann hat sie angerufen?' } },
        { de:'___ did they go? To Berlin.', answer:'Where', options:['Where','When'],
          gloss:{ ru:'Куда они поехали?', de:'Wohin sind sie gefahren?' } }
      ]
    },

    /* ---------- 5. the rule ---------- */
    { kind:'read',
      head:{ ru:'Поставь его в начало вопроса', de:'Setze es an den Anfang der Frage', en:'Put it before the question' },
      body:{
        ru:'Поставь вопросительное слово в начало. После него используй обычный порядок слов вопроса — тот же, что с be и с do / does / did. Ничего нового учить не нужно.',
        de:'Setze das Fragewort an den Anfang. Danach bleibt die normale Frageform — dieselbe wie mit be und mit do / does / did. Es gibt nichts Neues zu lernen.',
        en:'Put the question word first. After that, keep the normal question structure — the same one you use with be and with do / does / did. There is nothing new to learn.' },
      show:[
        { de:'She is at home. → Is she at home? → <b>Where is</b> she?',
          gloss:{ ru:'Вопрос с be.', de:'Frage mit BE.' } },
        { de:'She works here. → Does she work here? → <b>Where does</b> she work?',
          gloss:{ ru:'Обычный глагол, настоящее время.', de:'Normales Verb, Gegenwart.' } },
        { de:'She arrived Monday. → Did she arrive? → <b>When did</b> she arrive?',
          gloss:{ ru:'Обычный глагол, прошедшее время.', de:'Normales Verb, Vergangenheit.' } }
      ],
      note:{
        ru:'По-русски после вопросительного слова ничего не добавляется. В английском добавляется — и это самая частая ошибка.',
        de:'Im Russischen kommt nach dem Fragewort nichts dazu. Im Englischen schon — und genau das ist der häufigste Fehler.',
        en:'Russian adds nothing after the question word. English does, and that is the commonest mistake.' }
    },

    /* ---------- 6. the helper slot ---------- */
    { kind:'pick',
      ask:{ ru:'Что идёт после вопросительного слова?', de:'Was kommt nach dem Fragewort?', en:'What comes after the question word?' },
      rounds:[
        { de:'Where ___ she?', answer:'is', options:['is','does'],
          gloss:{ ru:'Где она?', de:'Wo ist sie?' } },
        { de:'Where ___ she work?', answer:'does', options:['does','is'],
          gloss:{ ru:'Где она работает?', de:'Wo arbeitet sie?' } },
        { de:'When ___ they arrive?', answer:'did', options:['did','do'],
          gloss:{ ru:'Когда они приехали?', de:'Wann sind sie angekommen?' } },
        { de:'Why ___ you tired?', answer:'are', options:['are','do'],
          gloss:{ ru:'Почему ты устала?', ruM:'Почему ты устал?', de:'Warum bist du müde?' } },
        { de:'What ___ he want?', answer:'does', options:['does','is'],
          gloss:{ ru:'Чего он хочет?', de:'Was will er?' } },
        { de:'Where ___ your friends?', answer:'are', options:['are','do'],
          gloss:{ ru:'Где твои друзья?', de:'Wo sind deine Freunde?' } },
        { de:'Why ___ they leave early?', answer:'did', options:['did','are'],
          gloss:{ ru:'Почему они ушли рано?', de:'Warum sind sie früh gegangen?' } },
        { de:'How ___ you go to work?', answer:'do', options:['do','are'],
          gloss:{ ru:'Как ты едешь на работу?', de:'Wie fährst du zur Arbeit?' } }
      ]
    },

    /* ---------- 7. the errors, side by side ---------- */
    { kind:'read',
      head:{ ru:'Три ошибки, которые слышно', de:'Drei Fehler, die man hört', en:'Three errors you can hear' },
      body:{
        ru:'Каждая из них — русская конструкция, перенесённая напрямую. Английский требует помощника, инверсии и начальной формы глагола.',
        de:'Jeder davon ist eine direkt übertragene russische Konstruktion. Englisch verlangt ein Hilfsverb, die Umstellung und die Grundform.',
        en:'Each of these is a Russian structure carried straight across. English wants the helper, the inversion, and the base verb.' },
      show:[
        { de:'\u2717 Where she works? · \u2713 Where <b>does</b> she work?',
          gloss:{ ru:'Помощника не хватает.', de:'Das Hilfsverb fehlt.' } },
        { de:'\u2717 Why they are late? · \u2713 Why <b>are they</b> late?',
          gloss:{ ru:'be встаёт перед подлежащим.', de:'BE geht vor das Subjekt.' } },
        { de:'\u2717 When did he arrived? · \u2713 When did he <b>arrive</b>?',
          gloss:{ ru:'did уже показывает прошлое.', de:'did zeigt die Vergangenheit schon.' } }
      ]
    },

    /* ---------- 8. who, the one exception ---------- */
    { kind:'read',
      head:{ ru:'У WHO есть одна особая конструкция', de:'WHO hat eine besondere Konstruktion', en:'WHO has one special pattern' },
      body:{
        ru:'Иногда who само является подлежащим. Если who обозначает того, кто выполняет действие, обычно do / does / did не используется. Немецкий здесь подсказывает неверно: там форма глагола одна и та же.',
        de:'Manchmal ist who selbst das Subjekt. Wenn who die Person ist, die die Handlung ausführt, benutzt man normalerweise kein do / does / did. Deutsch führt hier in die Irre: dort ist die Verbform gleich.',
        en:'Sometimes who itself is the subject. If who is the person doing the action, you usually do not use do / does / did. German misleads here — it uses the same verb form either way.' },
      show:[
        { de:'<b>Who called</b> you?',
          gloss:{ ru:'Кто тебе звонил? — who делает действие.', de:'Wer hat dich angerufen? — who handelt.' } },
        { de:'<b>Who did</b> you call?',
          gloss:{ ru:'Кому ты звонила? — действие делаешь ты.', ruM:'Кому ты звонил? — действие делаешь ты.', de:'Wen hast du angerufen? — du handelst.' } },
        { de:'\u2717 Who did call Tanya? · \u2713 Who called Tanya?',
          gloss:{ ru:'Лишний did.', de:'Ein did zu viel.' } }
      ]
    },

    /* ---------- 9. who: subject or object ---------- */
    { kind:'pick',
      ask:{ ru:'WHO — подлежащее или дополнение?', de:'WHO — Subjekt oder Objekt?', en:'WHO — subject or object?' },
      rounds:[
        { de:'___ called you?', answer:'Who', options:['Who','Who did'],
          gloss:{ ru:'Кто тебе звонил?', de:'Wer hat dich angerufen?' } },
        { de:'Who ___ you call?', answer:'did', options:['did','was'],
          gloss:{ ru:'Кому ты звонила?', ruM:'Кому ты звонил?', de:'Wen hast du angerufen?' } },
        { de:'___ lives in this apartment?', answer:'Who', options:['Who','Who does'],
          gloss:{ ru:'Кто живёт в этой квартире?', de:'Wer wohnt in dieser Wohnung?' } },
        { de:'Who ___ she invite?', answer:'did', options:['did','was'],
          gloss:{ ru:'Кого она пригласила?', de:'Wen hat sie eingeladen?' } },
        { de:'___ wants pizza?', answer:'Who', options:['Who','Who does'],
          gloss:{ ru:'Кто хочет пиццу?', de:'Wer will Pizza?' } },
        { de:'Who ___ Tanya call?', answer:'did', options:['did','was'],
          gloss:{ ru:'Кому звонила Таня?', de:'Wen hat Tanya angerufen?' } }
      ]
    },

    /* ---------- 10. no choices, and strict ----------
       `exact:true` for the same reason the articles lesson needs it: the
       six question words are short and close together, and the fuzzy
       matcher accepts anything within one edit of a target this size.
       Measured 09 Sep — "when" typed for "Where" and "why" for "Who"
       were both being counted correct, in the one lesson whose whole
       job is telling those words apart. */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши пропущенное слово', de:'Schreib das fehlende Wort', en:'Type the missing word' },
      rounds:[
        { de:'___ do you live?', answer:'Where',
          gloss:{ ru:'Где ты живёшь?', de:'Wo wohnst du?' } },
        { de:'___ is that woman?', answer:'Who',
          gloss:{ ru:'Кто эта женщина?', de:'Wer ist diese Frau?' } },
        { de:'___ does she work? At the hospital.', answer:'Where',
          gloss:{ ru:'Где она работает?', de:'Wo arbeitet sie?' } },
        { de:'___ did he arrive? Yesterday.', answer:'When',
          gloss:{ ru:'Когда он приехал?', de:'Wann ist er angekommen?' } },
        { de:'___ do you make this?', answer:'How',
          gloss:{ ru:'Как ты это делаешь?', de:'Wie machst du das?' } },
        { de:'Where ___ she work?', answer:'does',
          gloss:{ ru:'Где она работает?', de:'Wo arbeitet sie?' } },
        { de:'Why ___ they late?', answer:'are',
          gloss:{ ru:'Почему они опоздали?', de:'Warum sind sie zu spät?' } },
        { de:'When ___ he leave?', answer:'did',
          gloss:{ ru:'Когда он ушёл?', de:'Wann ist er gegangen?' } },
        { de:'Who ___ Tanya yesterday?', answer:'called',
          gloss:{ ru:'Кто звонил Тане вчера?', de:'Wer hat Tanya gestern angerufen?' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Zusammenfassung', en:'In short' },
      body:{
        ru:'who — человек, what — предмет или информация, where — место, when — время, why — причина, how — способ. Поставь вопросительное слово в начало, а затем используй уже знакомую структуру вопроса. Когда who является подлежащим, обычно do / does / did не используется.',
        de:'who — Person, what — Sache oder Information, where — Ort, when — Zeit, why — Grund, how — Art und Weise. Setze das Fragewort an den Anfang und benutze danach die Frageform, die du bereits kennst. Wenn who das Subjekt ist, benutzt man normalerweise kein do / does / did.',
        en:'who a person, what a thing or information, where a place, when a time, why a reason, how a way. Put the question word first, then use the question structure you already know. When who is the subject, you usually do not use do / does / did.' },
      show:[
        { de:'<b>Where is</b> she? · <b>Where does</b> she work? · <b>Where did</b> she work?' },
        { de:'<b>Who called</b> you? · <b>Who did</b> you call?' }
      ]
    }

  ]
},

/* ==================================================================
   The future — will · be going to · arrangements

   Three futures, and a trap that looks like one of them.

   Russian and German both let the present tense carry the future —
   Завтра иду в магазин, Morgen gehe ich einkaufen — so the instinct
   is not "pick the wrong future", it is "use no future at all", and
   then over-correct to will for everything once she learns it.

   The lesson therefore does three things in order:
     1. will, and the base verb after it
     2. be going to, which reuses BE she already has
     3. the present continuous for an arrangement already fixed

   And in the middle, the trap: going to + VERB is the future, going +
   TO + PLACE is movement. The shortcut she can actually use is whether
   another VERB follows.

   WHY THE WILL/GOING-TO DISTINCTION STAYS LOOSE. GPT's instruction, and
   he is right: real English overlaps. The lesson teaches will for a
   decision made now, going to for a plan already made, present
   continuous for something already arranged — and then says out loud
   that the edges blur. A rule stated harder than the language behaves
   teaches her to second-guess correct sentences.

   Simple present for schedules — The train leaves at six — is named in
   the recap and is NOT drilled. It belongs in the reference page
   (data/en-future.js `schedules`), not on a ladder.

   NO GENDERED RUSSIAN. Every gloss is about Tanya, Nazar, she or he, or
   uses a gender-neutral first person. Nothing here inflects on the
   reader, so no `ruM` twins — GPT checked this and it holds.
   ================================================================== */
{
  id:'en-future',
  glyph:'\u23E9',
  mins:9,
  target:'en',

  name:{
    ru:'Будущее время',
    de:'Die Zukunft',
    en:'The future'
  },

  sub:{
    ru:'will · be going to · договорённости',
    de:'will · be going to · Vereinbarungen',
    en:'will · be going to · arrangements'
  },

  steps:[

    /* ---------- 1. will ---------- */
    { kind:'read',
      head:{ ru:'WILL', de:'WILL', en:'WILL' },
      body:{
        ru:'WILL говорит о будущем. Он особенно часто используется для решений, прогнозов, обещаний и того, что, как ожидается, произойдёт. После WILL — начальная форма глагола, и сам WILL не меняется ни с одним подлежащим.',
        de:'WILL spricht über die Zukunft. Es wird besonders für Entscheidungen, Vorhersagen, Versprechen und erwartete Ereignisse verwendet. Nach WILL steht die Grundform, und WILL selbst hat bei allen Subjekten dieselbe Form.',
        en:'WILL talks about the future. It is especially useful for decisions, predictions, promises, and things you expect to happen. After WILL comes the base verb, and WILL itself is the same with every subject.' },
      table:[
        ['I will go.',    'I will call you.',        'a promise'],
        ['He will go.',   'She will come tomorrow.', 'a fact later'],
        ['We will go.',   'It will rain tomorrow.',  'a prediction'],
        ['They will go.', 'They will be here soon.', 'a state later']
      ],
      note:{
        ru:'В русском и немецком будущее часто выражается настоящим временем. В английском так почти не получится — нужна одна из форм будущего.',
        de:'Im Russischen und Deutschen trägt oft die Gegenwart die Zukunft. Im Englischen geht das fast nie — es braucht eine Zukunftsform.',
        en:'Russian and German often let the present tense carry the future. English almost never can — it needs one of the future forms.' }
    },

    /* ---------- 2. the base verb after will ---------- */
    { kind:'pick',
      ask:{ ru:'Что идёт после WILL?', de:'Was kommt nach WILL?', en:'What comes after WILL?' },
      rounds:[
        { de:'She will ___ tomorrow.', answer:'come', options:['come','comes'],
          gloss:{ ru:'Она придёт завтра.', de:'Sie wird morgen kommen.' } },
        { de:'They will ___ at home.', answer:'be', options:['be','are'],
          gloss:{ ru:'Они будут дома.', de:'Sie werden zu Hause sein.' } },
        { de:'He will ___ me later.', answer:'call', options:['call','called'],
          gloss:{ ru:'Он позвонит мне позже.', de:'Er wird mich später anrufen.' } },
        { de:'He will ___ me back.', answer:'pay', options:['pay','paid'],
          gloss:{ ru:'Он вернёт мне деньги.', de:'Er wird mir das Geld zurückgeben.' } },
        { de:'We will ___ dinner at seven.', answer:'eat', options:['eat','eats'],
          gloss:{ ru:'Мы поужинаем в семь.', de:'Wir werden um sieben zu Abend essen.' } },
        { de:'I will ___ the door.', answer:'open', options:['open','opened'],
          gloss:{ ru:'Я открою дверь.', de:'Ich werde die Tür öffnen.' } }
      ],
      note:{
        ru:'После WILL используй начальную форму глагола. WILL уже показывает будущее.',
        de:'Nach WILL steht das Verb in der Grundform. WILL zeigt die Zukunft schon.',
        en:'After WILL, use the base form. WILL already carries the future.' }
    },

    /* ---------- 3. negative and question ---------- */
    { kind:'read',
      head:{ ru:'Отрицание и вопрос', de:'Verneinung und Frage', en:'Negative and question' },
      body:{
        ru:'will not сокращается до won\u2019t. Чтобы задать вопрос, поставь WILL перед подлежащим — точно так же, как ты уже делала с be.',
        de:'will not wird zu won\u2019t. Für eine Frage setze WILL vor das Subjekt — genau wie du es mit be schon gemacht hast.',
        en:'will not contracts to won\u2019t. To make a question, move WILL in front of the subject — exactly what you already did with be.' },
      show:[
        { de:'I <b>won\u2019t</b> forget.',
          gloss:{ ru:'Я не забуду.', de:'Ich werde es nicht vergessen.' } },
        { de:'She <b>won\u2019t</b> be late.',
          gloss:{ ru:'Она не опоздает.', de:'Sie wird nicht zu spät kommen.' } },
        { de:'<b>Will</b> you come?',
          gloss:{ ru:'Ты придёшь?', de:'Kommst du?' } },
        { de:'<b>Will</b> they be here?',
          gloss:{ ru:'Они будут здесь?', de:'Werden sie hier sein?' } }
      ],
      note:{
        ru:'Никакого do здесь не нужно — will сам переходит вперёд, как be.',
        de:'Hier braucht es kein do — will geht selbst nach vorn, wie be.',
        en:'No do is needed — will moves to the front itself, like be.' }
    },

    /* ---------- 4. be going to ---------- */
    { kind:'read',
      head:{ ru:'BE GOING TO', de:'BE GOING TO', en:'BE GOING TO' },
      body:{
        ru:'Используй BE GOING TO, когда говоришь о будущем плане или намерении — или о том, что уже видно. Форма BE меняется по лицу, а GOING TO не меняется никогда.',
        de:'Benutze BE GOING TO für einen zukünftigen Plan oder eine Absicht — oder für etwas, das man schon kommen sieht. Die Form von BE ändert sich; GOING TO bleibt immer gleich.',
        en:'Use BE GOING TO for a future plan or intention — or for something you can already see coming. The form of BE changes with the person; GOING TO never changes.' },
      table:[
        ['I',              'am going to',  'I am going to eat this apple.'],
        ['he / she / it',  'is going to',  'She is going to call tonight.'],
        ['you / we / they','are going to', 'We are going to leave tomorrow.']
      ],
      note:{
        ru:'Это тот же be, который ты уже знаешь. Ничего нового заучивать не нужно.',
        de:'Das ist dasselbe be, das du schon kennst. Es gibt nichts Neues zu lernen.',
        en:'This is the same be you already know. There is nothing new to memorise.' }
    },

    /* ---------- 5. am / is / are ---------- */
    { kind:'sort',
      ask:{ ru:'Какая форма BE?', de:'Welche Form von BE?', en:'Which form of BE?' },
      bins:[
        { id:'am',  label:'am going to'  },
        { id:'is',  label:'is going to'  },
        { id:'are', label:'are going to' }
      ],
      cards:[
        { text:'I',           bin:'am'  },
        { text:'Tanya',       bin:'is'  },
        { text:'he',          bin:'is'  },
        { text:'you',         bin:'are' },
        { text:'we',          bin:'are' },
        { text:'my friends',  bin:'are' }
      ]
    },

    /* ---------- 6. the movement trap ---------- */
    { kind:'read',
      head:{ ru:'Движение или будущее?', de:'Bewegung oder Zukunft?', en:'Going somewhere, or the future?' },
      body:{
        ru:'GOING TO не всегда обозначает будущее. Иногда GOING просто означает движение куда-либо. Если после going to идёт ещё один глагол — это конструкция будущего времени. Если идёт место — это движение.',
        de:'GOING TO bezeichnet nicht immer die Zukunft. Manchmal bedeutet GOING einfach, dass man sich irgendwohin bewegt. Wenn nach going to noch ein Verb folgt, ist es die Zukunftskonstruktion. Folgt ein Ort, ist es Bewegung.',
        en:'GOING TO does not always mark the future. Sometimes GOING simply means movement. If another verb follows going to, it is the future construction. If a place follows, it is movement.' },
      show:[
        { de:'I am going to <b>eat</b> this apple. \u2192 a plan',
          gloss:{ ru:'После going to — глагол. Это будущее.', de:'Nach going to ein Verb. Das ist Zukunft.' } },
        { de:'I am going to <b>the store</b>. \u2192 movement',
          gloss:{ ru:'После going to — место. Это просто «иду».', de:'Nach going to ein Ort. Das ist einfach „gehen“.' } },
        { de:'She is going to <b>visit</b> Berlin. · She is going to <b>Berlin</b>.',
          gloss:{ ru:'План, потом движение.', de:'Plan, dann Bewegung.' } }
      ],
      note:{
        ru:'Проверка: убери последние слова. «I am going to eat» всё ещё значит план. «I am going to the» не значит ничего — значит, to принадлежит месту.',
        de:'Test: streiche die letzten Wörter. „I am going to eat“ heißt weiter ein Plan. „I am going to the“ heißt nichts — also gehört das to zum Ort.',
        en:'Test: drop the last words. "I am going to eat" still means a plan. "I am going to the" means nothing — so the to belongs to the place.' }
    },

    /* ---------- 7. movement or future ---------- */
    { kind:'sort',
      ask:{ ru:'Движение или будущее?', de:'Bewegung oder Zukunft?', en:'Movement or future?' },
      bins:[
        { id:'move',   label:'movement' },
        { id:'future', label:'future'   }
      ],
      cards:[
        { text:'I am going to the store.',       bin:'move'   },
        { text:'She is going to Berlin.',        bin:'move'   },
        { text:'They are going to my house.',    bin:'move'   },
        { text:'I am going to eat.',             bin:'future' },
        { text:'She is going to visit Berlin.',  bin:'future' },
        { text:'They are going to come over.',   bin:'future' }
      ]
    },

    /* ---------- 8. negative and question with going to ---------- */
    { kind:'pick',
      ask:{ ru:'Вопрос и отрицание с GOING TO', de:'Frage und Verneinung mit GOING TO', en:'Negative and question with GOING TO' },
      rounds:[
        { de:'___ she going to come?', answer:'Is', options:['Is','Does'],
          gloss:{ ru:'Она собирается прийти?', de:'Wird sie kommen?' } },
        { de:'She ___ not going to come.', answer:'is', options:['is','does'],
          gloss:{ ru:'Она не собирается приходить.', de:'Sie wird nicht kommen.' } },
        { de:'___ they going to leave?', answer:'Are', options:['Are','Do'],
          gloss:{ ru:'Они собираются уходить?', de:'Werden sie gehen?' } },
        { de:'He isn\u2019t going to ___ today.', answer:'pay', options:['pay','pays'],
          gloss:{ ru:'Сегодня он платить не собирается.', de:'Heute wird er nicht zahlen.' } },
        { de:'I ___ going to cook tonight.', answer:'am', options:['am','is'],
          gloss:{ ru:'Сегодня вечером я собираюсь готовить.', de:'Heute Abend werde ich kochen.' } }
      ],
      note:{
        ru:'Вопрос и отрицание образуются с помощью BE. DO добавлять не нужно.',
        de:'Frage und Verneinung werden mit BE gebildet. DO wird nicht hinzugefügt.',
        en:'BE carries the question or the negative. You do not add DO.' }
    },

    /* ---------- 9. the third future ---------- */
    { kind:'read',
      head:{ ru:'Present Continuous для будущих договорённостей', de:'Present Continuous für zukünftige Vereinbarungen', en:'Present continuous for future arrangements' },
      body:{
        ru:'Мы также используем Present Continuous для будущих событий, которые уже запланированы или согласованы: am / is / are + глагол с -ing. Слова, указывающие на будущее время, обычно делают значение будущего понятным.',
        de:'Wir verwenden das Present Continuous auch für zukünftige Ereignisse, die bereits geplant oder vereinbart sind: am / is / are + Verb mit -ing. Eine zukünftige Zeitangabe macht die Zukunftsbedeutung normalerweise deutlich.',
        en:'We also use the present continuous for future arrangements that are already planned or fixed: am / is / are + verb-ing. A future time expression usually makes the future meaning clear.' },
      show:[
        { de:'I\u2019m <b>meeting</b> Tanya tomorrow.',
          gloss:{ ru:'Я встречаюсь с Таней завтра.', de:'Ich treffe Tanya morgen.' } },
        { de:'We\u2019re <b>having</b> dinner at seven.',
          gloss:{ ru:'Мы ужинаем в семь.', de:'Wir essen um sieben zu Abend.' } },
        { de:'She\u2019s <b>flying</b> to Berlin on Friday.',
          gloss:{ ru:'Она летит в Берлин в пятницу.', de:'Sie fliegt am Freitag nach Berlin.' } },
        { de:'I\u2019m going to call Tanya tonight. · I\u2019m meeting Tanya at seven.',
          gloss:{ ru:'План, потом уже назначенная договорённость.', de:'Plan, dann eine schon vereinbarte Verabredung.' } }
      ],
      note:{
        ru:'В реальном английском эти значения могут пересекаться. Не считай это различие абсолютным правилом.',
        de:'Im echten Englisch können sich diese Bedeutungen überschneiden. Behandle den Unterschied nicht als absolute Regel.',
        en:'In real English these meanings can overlap. Do not treat the difference as an absolute rule.' }
    },

    /* ---------- 10. which future? ---------- */
    { kind:'pick',
      ask:{ ru:'Какая форма будущего?', de:'Welche Zukunftsform?', en:'Which future form?' },
      rounds:[
        { de:'The phone is ringing. I ___ answer it.', answer:'will', options:['will','am going to'],
          gloss:{ ru:'Решение прямо сейчас.', de:'Eine Entscheidung jetzt.' } },
        { de:'Don\u2019t worry. I ___ help you.', answer:'will', options:['will','am meeting'],
          gloss:{ ru:'Обещание.', de:'Ein Versprechen.' } },
        { de:'I think it ___ rain tomorrow.', answer:'will', options:['will','is going'],
          gloss:{ ru:'Прогноз.', de:'Eine Vorhersage.' } },
        { de:'I have decided. I ___ study more English.', answer:'am going to', options:['am going to','will be'],
          gloss:{ ru:'План, который уже есть.', de:'Ein Plan, den es schon gibt.' } },
        { de:'We bought the food. We ___ cook tonight.', answer:'are going to', options:['are going to','will be'],
          gloss:{ ru:'План, который уже есть.', de:'Ein Plan, den es schon gibt.' } },
        { de:'We already bought the tickets. We ___ to Berlin tomorrow.', answer:'are flying', options:['are flying','will fly'],
          gloss:{ ru:'Уже назначено.', de:'Schon vereinbart.' } },
        { de:'She has an appointment. She ___ the doctor at ten.', answer:'is seeing', options:['is seeing','will see'],
          gloss:{ ru:'Уже назначено.', de:'Schon vereinbart.' } },
        { de:'We made plans yesterday. They ___ over tonight.', answer:'are coming', options:['are coming','will come'],
          gloss:{ ru:'Уже договорились.', de:'Schon verabredet.' } }
      ],
      note:{
        ru:'WILL — решение сейчас, обещание, прогноз. BE GOING TO — план, который уже есть. Present Continuous — уже назначенная договорённость. Границы размытые, и это нормально.',
        de:'WILL — Entscheidung jetzt, Versprechen, Vorhersage. BE GOING TO — ein Plan, den es schon gibt. Present Continuous — eine schon vereinbarte Verabredung. Die Grenzen sind fließend, und das ist normal.',
        en:'WILL for a decision now, a promise, a prediction. BE GOING TO for a plan you already have. Present continuous for something already arranged. The edges blur, and that is normal.' }
    },

    /* ---------- 11. no choices ---------- */
    { kind:'type',
      ask:{ ru:'Закончи предложение о будущем', de:'Vervollständige den Satz über die Zukunft', en:'Complete the future sentence' },
      rounds:[
        { de:'She ___ call tomorrow.', answer:'will',
          gloss:{ ru:'Она позвонит завтра.', de:'Sie wird morgen anrufen.' } },
        { de:'He will ___ me back.', answer:'pay',
          gloss:{ ru:'Он вернёт мне деньги.', de:'Er wird mir das Geld zurückgeben.' } },
        { de:'I ___ going to eat this apple.', answer:'am',
          gloss:{ ru:'Я собираюсь съесть это яблоко.', de:'Ich werde diesen Apfel essen.' } },
        { de:'They ___ going to come over.', answer:'are',
          gloss:{ ru:'Они собираются прийти к нам.', de:'Sie werden zu uns kommen.' } },
        { de:'She ___ going to visit Berlin.', answer:'is',
          gloss:{ ru:'Она собирается поехать в Берлин.', de:'Sie wird Berlin besuchen.' } },
        { de:'Will you ___ tomorrow?', answer:'come',
          gloss:{ ru:'Ты придёшь завтра?', de:'Kommst du morgen?' } },
        { de:'He won\u2019t ___ late.', answer:'be',
          gloss:{ ru:'Он не опоздает.', de:'Er wird nicht zu spät kommen.' } },
        { de:'___ they going to leave?', answer:'Are',
          gloss:{ ru:'Они собираются уходить?', de:'Werden sie gehen?' } },
        { de:'She isn\u2019t going to ___ tonight.', answer:'work',
          gloss:{ ru:'Сегодня вечером она работать не будет.', de:'Heute Abend wird sie nicht arbeiten.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Zusammenfassung', en:'In short' },
      body:{
        ru:'will + начальная форма — решения, обещания, прогнозы. am / is / are + going to + начальная форма — уже существующий план. am / is / are + глагол с -ing — уже назначенная договорённость. А going to + место — это не будущее, это движение.',
        de:'will + Grundform — Entscheidungen, Versprechen, Vorhersagen. am / is / are + going to + Grundform — ein schon bestehender Plan. am / is / are + Verb mit -ing — eine schon vereinbarte Verabredung. Und going to + Ort ist keine Zukunft, sondern Bewegung.',
        en:'will + base verb for decisions, promises, and predictions. am / is / are + going to + base verb for a plan you already have. am / is / are + verb-ing for something already arranged. And going to + a place is not the future at all — it is movement.' },
      show:[
        { de:'I <b>will</b> call. · She <b>won\u2019t</b> come. · <b>Will</b> they come?' },
        { de:'I\u2019m <b>going to</b> call. · She <b>isn\u2019t going to</b> come. · <b>Are</b> they going to come?' },
        { de:'I\u2019m <b>meeting</b> Tanya tomorrow. · They\u2019re <b>coming</b> over tonight.' },
        { de:'I\u2019m going to <b>the store</b>. \u2192 movement, not the future.' },
        { de:'The train <b>leaves</b> at six.',
          gloss:{ ru:'Для расписаний можно использовать Present Simple.', de:'Für Fahrpläne kann man das Simple Present verwenden.' } }
      ]
    }

  ]
},

/* ==================================================================
   Articles — a / an / the / nothing

   The hardest English topic for a Russian speaker, and the one where
   her first language gives her nothing to hold on to. Russian has no
   articles at all. «На столе кошка» and «Кошка на столе» both work and
   neither contains a word for a or the.

   So the transfer goes wrong in two opposite directions, and both are
   drilled here:

     drop it entirely      I see cat.
     then overuse the      I like the music. She speaks the English.

   German helps halfway and hurts halfway. ein/eine is close to a/an,
   der/die/das is close to the — but German puts an article on almost
   every singular noun, including many places English goes bare: in der
   Schule, die Musik, das Leben.

   THE DECISION IS THREE-WAY, NOT FOUR. a and an answer the same
   question and are one pocket; the sound split is a smaller decision
   inside it and comes only once the three-way choice is stable. Teaching
   a-vs-an first would drown the thing that is actually hard.

   ------------------------------------------------------------------
   EVERY SCORED STEP HERE IS STRICT

   `exact:true` on every type step. Steven, 09 Sep: "articles should be
   strict, they are super short." Without it `GH.text.compare()` accepts
   an answer within one edit of a target four characters or shorter, so
   `an` typed for `a` is graded correct — which would make the central
   distinction of the lesson unmarkable. See the note in
   js/activities/lessons.js.

   AND NO TYPE STEP ASKS FOR THE ZERO ARTICLE. It cannot: `submit()`
   returns early on an empty box, so the step would never advance and
   the lesson would hang with no way forward. Zero is asked for in the
   four-option pick, where it has an explicit dash.

   Reference bank: data/en-articles.js — 42 items, the sound rows, the
   traps. This lesson draws its sentences from there.
   ================================================================== */
{
  id:'en-articles',
  glyph:'\uD83D\uDD20',
  mins:8,
  target:'en',

  name:{
    ru:'Артикли',
    de:'Artikel',
    en:'Articles'
  },

  sub:{
    ru:'a, an, the или ничего',
    de:'a, an, the oder nichts',
    en:'a, an, the, or nothing'
  },

  steps:[

    /* ---------- 1. what the word is even for ---------- */
    { kind:'read',
      head:{ ru:'Слово, которого в русском нет', de:'Ein Wort, das es im Russischen nicht gibt', en:'A word Russian does not have' },
      body:{
        ru:'В русском нет слов вроде a или the. В немецком есть ein и der, но они также указывают на род. В английском эти маленькие слова говорят о другом: это одна новая вещь, та вещь, которую вы оба знаете, или такой вид вещей вообще?',
        de:'Im Russischen gibt es kein Wort wie a oder the. Im Deutschen gibt es ein und der, aber die zeigen auch das Geschlecht an. Im Englischen sagen diese kleinen Wörter etwas anderes: eine neue Sache, die Sache, die ihr beide kennt, oder die Sorte Sache überhaupt?',
        en:'Russian has no word like a or the. German has ein and der, but they also tell you the gender. English uses these small words to say something else: is this one new thing, the thing you both know, or the kind of thing in general?' },
      show:[
        { de:'Tanya sees <b>a</b> cat.',
          gloss:{ ru:'Новая кошка — впервые.', de:'Eine neue Katze — zum ersten Mal.' } },
        { de:'<b>The</b> cat is on the table.',
          gloss:{ ru:'Та самая кошка — уже знаем какая.', de:'Dieselbe Katze — wir wissen schon, welche.' } },
        { de:'Nazar likes music.',
          gloss:{ ru:'Музыка вообще — артикль не нужен.', de:'Musik überhaupt — kein Artikel.' } }
      ],
      note:{
        ru:'Слово стоит не у существительного, а у ситуации. Само существительное тебе ничего не подскажет.',
        de:'Das Wort gehört nicht zum Nomen, sondern zur Lage. Das Nomen selbst sagt dir nichts.',
        en:'The word is not about the noun, it is about the situation. The noun itself will not tell you.' }
    },

    /* ---------- 2. the three pockets ---------- */
    { kind:'read',
      head:{ ru:'Три корзины', de:'Drei Fächer', en:'Three pockets' },
      body:{
        ru:'a или an — одна новая вещь, и только если её можно посчитать в единственном числе. the — на это можно указать: только что назвали, здесь оно одно такое, или подходит только одно. Ничего — вид вообще, множественное число, вещественное или «голая» табличка: имена, языки, приёмы пищи.',
        de:'a oder an — eine neue Sache, und nur in der zählbaren Einzahl. the — man kann darauf zeigen: gerade genannt, hier einzig, oder nur eines passt. Nichts — die Sorte überhaupt, Mehrzahl, Stoffnamen oder ein nacktes Schild: Namen, Sprachen, Mahlzeiten.',
        en:'a or an — one new thing, and only when you can count it in the singular. the — you can point at it: just named, unique here, or only one thing fits. Nothing — the kind in general, a plural, a mass, or a bare label: names, languages, meals.' },
      table:[
        ['a / an', 'one, new, countable', 'Tanya sees a cat.'],
        ['the',    'known, specific',     'The cat is on the table.'],
        ['\u2014', 'the kind, or a label', 'Nazar likes music.']
      ]
    },

    /* ---------- 3. first rung: which pocket ---------- */
    { kind:'sort',
      ask:{ ru:'В какую корзину?', de:'Welches Fach?', en:'Which pocket?' },
      bins:[
        { id:'new',   label:'a / an' },
        { id:'known', label:'the'    },
        { id:'zero',  label:'\u2014' }
      ],
      cards:[
        { text:'Tanya sees ___ cat.',      bin:'new'   },
        { text:'Nazar eats ___ apple.',    bin:'new'   },
        { text:'___ cat is on the table.', bin:'known' },
        { text:'___ sun is warm today.',   bin:'known' },
        { text:'Nazar likes ___ music.',   bin:'zero'  },
        { text:'Tanya drinks ___ water.',  bin:'zero'  },
        { text:'Tanya is learning ___ English.', bin:'zero' },
        { text:'Nazar goes to ___ school.', bin:'zero' },
        { text:'Please sit at ___ table.', bin:'new'   }
      ]
    },

    /* ---------- 4. new against known ---------- */
    { kind:'pick',
      ask:{ ru:'Новая вещь или уже известная?', de:'Neue Sache oder schon bekannt?', en:'New thing, or already known?' },
      rounds:[
        { de:'Tanya sees ___ cat.', answer:'a', options:['a','the'],
          gloss:{ ru:'Впервые.', de:'Zum ersten Mal.' } },
        { de:'___ cat is on the table.', answer:'The', options:['A','The'],
          gloss:{ ru:'Та самая кошка.', de:'Dieselbe Katze.' } },
        { de:'She buys ___ bag.', answer:'a', options:['a','the'],
          gloss:{ ru:'Какую-то сумку.', de:'Irgendeine Tasche.' } },
        { de:'___ bag is on the table.', answer:'The', options:['A','The'],
          gloss:{ ru:'Ту самую сумку уже назвали.', de:'Die Tasche wurde schon genannt.' } },
        { de:'A bus is coming. Tanya gets on ___ bus.', answer:'the', options:['a','the'],
          gloss:{ ru:'Второй раз — уже понятно, какой.', de:'Zweites Mal — schon klar, welcher.' } },
        { de:'Please close ___ door.', answer:'the', options:['a','the'],
          gloss:{ ru:'Здесь дверь одна.', de:'Hier gibt es nur eine Tür.' } }
      ]
    },

    /* ---------- 5. the bare noun ---------- */
    { kind:'pick',
      ask:{ ru:'Нужен ли артикль вообще?', de:'Braucht es überhaupt einen Artikel?', en:'Is an article needed at all?' },
      rounds:[
        { de:'Nazar likes ___ music.', answer:'\u2014', options:['the','\u2014'],
          gloss:{ ru:'Музыка вообще.', de:'Musik überhaupt.' } },
        { de:'___ music in this café is loud.', answer:'The', options:['The','\u2014'],
          gloss:{ ru:'Именно эта музыка.', de:'Genau diese Musik.' } },
        { de:'Nazar goes to ___ school.', answer:'\u2014', options:['the','\u2014'],
          gloss:{ ru:'Школа как часть дня.', de:'Die Schule als Alltag.' } },
        { de:'___ school is next to the park.', answer:'The', options:['The','\u2014'],
          gloss:{ ru:'Здание, на которое можно показать.', de:'Das Gebäude, auf das man zeigen kann.' } },
        { de:'She speaks ___ German at home.', answer:'\u2014', options:['the','\u2014'],
          gloss:{ ru:'Названия языков — без артикля.', de:'Sprachnamen bekommen keinen Artikel.' } },
        { de:'Apples ___ healthy. They need no article.', answer:'are', options:['are','is'],
          gloss:{ ru:'Множественное число о виде вообще — без артикля.', de:'Mehrzahl über die Sorte — kein Artikel.' } }
      ]
    },

    /* ---------- 6. a or an is the sound ---------- */
    { kind:'read',
      head:{ ru:'a или an — решает звук', de:'a oder an — der Laut entscheidet', en:'a or an — the sound decides' },
      body:{
        ru:'a и an — одна корзина, они отвечают на один и тот же вопрос. Решает следующий звук, а не буква на бумаге.',
        de:'a und an sind dasselbe Fach, sie antworten auf dieselbe Frage. Es entscheidet der nächste Laut, nicht der Buchstabe auf der Seite.',
        en:'a and an are the same pocket — they answer the same question. The next sound decides, not the letter on the page.' },
      show:[
        { de:'<b>an</b> apple · <b>an</b> egg · <b>an</b> umbrella',
          gloss:{ ru:'Начинается с гласного звука.', de:'Beginnt mit einem Vokallaut.' } },
        { de:'<b>an</b> hour',
          gloss:{ ru:'h немое — слышно «ауэр».', de:'h ist stumm — man hört „our“.' } },
        { de:'<b>a</b> university · <b>a</b> useful bag',
          gloss:{ ru:'Буква гласная, а звук «ю».', de:'Der Buchstabe ist ein Vokal, der Laut ist „you“.' } },
        { de:'<b>a</b> house',
          gloss:{ ru:'Здесь h произносится.', de:'Hier wird das h gesprochen.' } }
      ],
      note:{
        ru:'Слушай слово, которое идёт сразу после — иногда это не существительное, а прилагательное: a new jacket, an old jacket.',
        de:'Hör auf das Wort direkt danach — manchmal ist das kein Nomen, sondern ein Adjektiv: a new jacket, an old jacket.',
        en:'Listen to the word that comes straight after — sometimes that is an adjective, not the noun: a new jacket, an old jacket.' }
    },

    /* ---------- 7. sort by sound ---------- */
    { kind:'sort',
      ask:{ ru:'Слушай следующее слово', de:'Hör auf das nächste Wort', en:'Listen to the next word' },
      bins:[
        { id:'a',  label:'a'  },
        { id:'an', label:'an' }
      ],
      cards:[
        { text:'apple',      bin:'an' },
        { text:'egg',        bin:'an' },
        { text:'hour',       bin:'an' },
        { text:'umbrella',   bin:'an' },
        { text:'old jacket', bin:'an' },
        { text:'university', bin:'a'  },
        { text:'house',      bin:'a'  },
        { text:'useful bag', bin:'a'  },
        { text:'new jacket', bin:'a'  }
      ]
    },

    /* ---------- 8. a or an in a sentence ---------- */
    { kind:'pick',
      ask:{ ru:'a или an?', de:'a oder an?', en:'a or an?' },
      rounds:[
        { de:'Nazar eats ___ apple.', answer:'an', options:['a','an'],
          gloss:{ ru:'Назар ест яблоко.', de:'Nazar isst einen Apfel.' } },
        { de:'The trip takes ___ hour.', answer:'an', options:['a','an'],
          gloss:{ ru:'Поездка длится час.', de:'Die Fahrt dauert eine Stunde.' } },
        { de:'She studies at ___ university.', answer:'a', options:['a','an'],
          gloss:{ ru:'Она учится в университете.', de:'Sie studiert an einer Universität.' } },
        { de:'He takes ___ umbrella.', answer:'an', options:['a','an'],
          gloss:{ ru:'Он берёт зонт.', de:'Er nimmt einen Regenschirm.' } },
        { de:'Tanya needs ___ new jacket.', answer:'a', options:['a','an'],
          gloss:{ ru:'Тане нужна новая куртка.', de:'Tanya braucht eine neue Jacke.' } },
        { de:'She eats ___ egg for breakfast.', answer:'an', options:['a','an'],
          gloss:{ ru:'Она ест яйцо на завтрак.', de:'Sie isst ein Ei zum Frühstück.' } }
      ]
    },

    /* ---------- 9. all four at once ---------- */
    { kind:'pick',
      ask:{ ru:'a, an, the или ничего?', de:'a, an, the oder nichts?', en:'a, an, the, or nothing?' },
      rounds:[
        { de:'___ bus is coming.', answer:'A', options:['A','An','The','\u2014'],
          gloss:{ ru:'Подходит автобус — какой-то.', de:'Ein Bus kommt — irgendeiner.' } },
        { de:'Tanya gets on ___ bus.', answer:'the', options:['a','an','the','\u2014'],
          gloss:{ ru:'Тот самый автобус.', de:'Derselbe Bus.' } },
        { de:'They have ___ breakfast at seven.', answer:'\u2014', options:['a','an','the','\u2014'],
          gloss:{ ru:'Завтрак как время дня.', de:'Frühstück als Tageszeit.' } },
        { de:'Tanya is learning ___ English.', answer:'\u2014', options:['a','an','the','\u2014'],
          gloss:{ ru:'Названия языков — без артикля.', de:'Sprachnamen ohne Artikel.' } },
        { de:'Please close ___ door.', answer:'the', options:['a','an','the','\u2014'],
          gloss:{ ru:'Дверь здесь одна.', de:'Hier gibt es nur eine Tür.' } },
        { de:'The trip takes ___ hour.', answer:'an', options:['a','an','the','\u2014'],
          gloss:{ ru:'Час — звук гласный.', de:'Eine Stunde — der Laut ist ein Vokal.' } },
        { de:'Nazar goes to ___ new school.', answer:'a', options:['a','an','the','\u2014'],
          gloss:{ ru:'Новая школа — впервые о ней.', de:'Eine neue Schule — zum ersten Mal.' } },
        { de:'___ milk is in the fridge.', answer:'The', options:['A','An','The','\u2014'],
          gloss:{ ru:'То самое молоко.', de:'Dieselbe Milch.' } }
      ]
    },

    /* ---------- 10. no choices, and strict ----------
       `exact:true` on the step, so it covers every round. a and an are
       one letter apart and the fuzzy matcher would accept either. No
       round here asks for the zero article — see the header. */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши артикль', de:'Schreib den Artikel', en:'Type the article' },
      rounds:[
        { de:'She buys ___ bag.', answer:'a',
          gloss:{ ru:'Она покупает сумку.', de:'Sie kauft eine Tasche.' } },
        { de:'Nazar eats ___ apple.', answer:'an',
          gloss:{ ru:'Назар ест яблоко.', de:'Nazar isst einen Apfel.' } },
        { de:'___ apple is red.', answer:'The',
          gloss:{ ru:'Яблоко красное.', de:'Der Apfel ist rot.' } },
        { de:'Tanya needs ___ mirror.', answer:'a',
          gloss:{ ru:'Тане нужно зеркало.', de:'Tanya braucht einen Spiegel.' } },
        { de:'___ sun is warm today.', answer:'The',
          gloss:{ ru:'Сегодня солнце тёплое.', de:'Die Sonne ist heute warm.' } },
        { de:'He takes ___ umbrella.', answer:'an',
          gloss:{ ru:'Он берёт зонт.', de:'Er nimmt einen Regenschirm.' } },
        { de:'She stands in front of ___ mirror.', answer:'the',
          gloss:{ ru:'Она стоит перед зеркалом.', de:'Sie steht vor dem Spiegel.' } },
        { de:'She studies at ___ university.', answer:'a',
          gloss:{ ru:'Она учится в университете.', de:'Sie studiert an einer Universität.' } }
      ]
    },

    /* ---------- 11. the two traps, named ---------- */
    { kind:'read',
      head:{ ru:'Две ловушки', de:'Zwei Fallen', en:'Two traps' },
      body:{
        ru:'В «I see cat» пропущено слово, которого в русском вообще нет. В «She likes the music» добавлено слово, которое в немецком здесь было бы нужно. Английский не делает ни того, ни другого.',
        de:'In „I see cat“ fehlt das Wort, das es im Russischen gar nicht gibt. In „She likes the music“ steht das Wort, das im Deutschen hier nötig wäre. Englisch macht beides nicht.',
        en:'In "I see cat" the missing word is one Russian never had. In "She likes the music" the added word is one German would still need. English does neither.' },
      show:[
        { de:'\u2717 I see cat. \u00b7 \u2713 I see <b>a</b> cat.',
          gloss:{ ru:'Русский инстинкт: назвать вещь и остановиться.', de:'Russischer Reflex: die Sache nennen und fertig.' } },
        { de:'\u2717 She speaks the English. \u00b7 \u2713 She speaks English.',
          gloss:{ ru:'Названия языков — без артикля.', de:'Sprachnamen ohne Artikel.' } },
        { de:'\u2717 She likes the music. \u00b7 \u2713 She likes music.',
          gloss:{ ru:'Немецкий инстинкт: die Musik даже про музыку вообще.', de:'Deutscher Reflex: die Musik auch für die Sorte.' } },
        { de:'\u2717 a hour \u00b7 \u2713 an hour \u00b7 \u2717 an university \u00b7 \u2713 a university',
          gloss:{ ru:'Английский слушает звук, а не букву.', de:'Englisch hört auf den Laut, nicht auf den Buchstaben.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Спроси себя: это одна новая вещь — a или an. На это можно указать — the. Речь о виде вообще, о множественном числе или это имя, язык, приём пищи — ничего. А между a и an решает звук, а не буква.',
        de:'Frag dich: eine neue Sache — a oder an. Man kann darauf zeigen — the. Es geht um die Sorte, die Mehrzahl, oder es ist ein Name, eine Sprache, eine Mahlzeit — nichts. Und zwischen a und an entscheidet der Laut, nicht der Buchstabe.',
        en:'Ask yourself: one new thing — a or an. You can point at it — the. The kind in general, a plural, or a name, a language, a meal — nothing at all. And between a and an, the sound decides, not the letter.' },
      show:[
        { de:'Tanya sees <b>a</b> cat. \u00b7 <b>The</b> cat is on the table. \u00b7 Cats like milk.' },
        { de:'<b>an</b> hour \u00b7 <b>a</b> university' },
        { de:'Nazar goes to school. \u00b7 <b>The</b> school is next to the park.',
          gloss:{ ru:'Учреждение и здание — разные вещи.', de:'Die Institution und das Gebäude sind zwei verschiedene Dinge.' } }
      ]
    }

  ]
},

/* ==================================================================
   Past simple — worked, went, was, didn't

   The lesson has three separate systems in it and they must not blur:

     regular      -ed, same form for every subject
     irregular    a list, and it has to be learned as one
     BE           was / were, which make their own questions and negatives

   And one rule that ties it back to lesson two: DID carries the past, so
   after it the main verb goes back to base. She worked → Did she work?
   She didn't work. That is the same "the helper carries the grammar"
   move she has already met with does.

   WHERE RUSSIAN HELPS AND WHERE IT DOES NOT

   Helps: Russian has a real past tense and marks it on the verb, so the
   idea needs no introduction. Она работала is not a foreign thought.

   Does not: Russian negates with one word in front and asks with
   intonation — Она не работала, Она работала? Nothing is added and
   nothing moves. English inserts didn't or Did, and then strips the past
   off the main verb. Both halves are new.

   Also: Russian past agrees with gender (работал / работала). English
   does not agree with anything. That is a simplification she can enjoy,
   and it is said out loud in the first step.

   GENDERED RUSSIAN. Four glosses address her directly in the past tense
   and carry `ru` (feminine) and `ruM` (masculine), per GPT's list:
   "I was tired", "You were right", "Were you tired?", "I wasn't tired".
   Glosses about Tanya, Nazar, he or she are NOT twinned.

   Left out deliberately: past continuous, present perfect, past perfect.
   Those are later lessons.
   ================================================================== */
{
  id:'en-past',
  glyph:'\u23EA',
  mins:9,
  target:'en',

  name:{
    ru:'Прошедшее время',
    de:'Die Vergangenheit',
    en:'Past simple'
  },

  sub:{
    ru:'worked · went · was · didn\u2019t',
    de:'worked · went · was · didn\u2019t',
    en:'worked · went · was · didn\u2019t'
  },

  steps:[

    /* ---------- 1. regular -ed ---------- */
    { kind:'read',
      head:{ ru:'Правильные глаголы: -ED', de:'Regelmäßige Verben: -ED', en:'Regular past: -ED' },
      body:{
        ru:'Многие английские глаголы образуют прошедшее время с помощью -ed. И форма одинакова для всех подлежащих — в отличие от русского, где она меняется по роду.',
        de:'Viele englische Verben bilden die Vergangenheit mit -ed. Und die Form ist bei allen Subjekten gleich — anders als im Russischen, wo sie sich nach dem Geschlecht ändert.',
        en:'Many English verbs form the past with -ed. And the form is the same with every subject — unlike Russian, where it changes with gender.' },
      table:[
        ['work \u2192 worked',   'I worked.',    'no change'],
        ['call \u2192 called',   'She worked.',  'no change'],
        ['play \u2192 played',   'They worked.', 'no change'],
        ['open \u2192 opened',   'We worked.',   'no change'],
        ['visit \u2192 visited', 'You worked.',  'no change']
      ],
      note:{
        ru:'По-русски «работал» и «работала» — разные формы. По-английски worked годится всем.',
        de:'Im Russischen sind «работал» und «работала» zwei Formen. Im Englischen passt worked für alle.',
        en:'Russian needs работал or работала. English has worked for everyone.' }
    },

    /* ---------- 2. the regular past in a sentence ---------- */
    { kind:'pick',
      ask:{ ru:'Выбери завершённое действие в прошлом', de:'Wähle die abgeschlossene Handlung', en:'Choose the finished past action' },
      rounds:[
        { de:'Yesterday she ___ me.', answer:'called', options:['call','called'],
          gloss:{ ru:'Вчера она мне звонила.', de:'Gestern hat sie mich angerufen.' } },
        { de:'We ___ the film last night.', answer:'watched', options:['watch','watched'],
          gloss:{ ru:'Вчера вечером мы смотрели фильм.', de:'Gestern Abend haben wir den Film gesehen.' } },
        { de:'He ___ the door.', answer:'opened', options:['open','opened'],
          gloss:{ ru:'Он открыл дверь.', de:'Er hat die Tür geöffnet.' } },
        { de:'They ___ in Berlin last year.', answer:'lived', options:['live','lived'],
          gloss:{ ru:'В прошлом году они жили в Берлине.', de:'Letztes Jahr haben sie in Berlin gewohnt.' } },
        { de:'I ___ Tanya yesterday.', answer:'visited', options:['visit','visited'],
          gloss:{ ru:'Вчера я был у Тани.', ruM:'Вчера я был у Тани.', de:'Gestern war ich bei Tanya.' } },
        { de:'Tanya ___ soup last night.', answer:'cooked', options:['cook','cooked'],
          gloss:{ ru:'Вчера вечером Таня сварила суп.', de:'Gestern Abend hat Tanya Suppe gekocht.' } }
      ]
    },

    /* ---------- 3. irregulars ---------- */
    { kind:'read',
      head:{ ru:'Неправильные глаголы', de:'Unregelmäßige Verben', en:'Irregular verbs' },
      body:{
        ru:'Некоторые распространённые глаголы не используют -ed. Их формы прошедшего времени нужно запомнить — списком, как в русском запоминают исключения.',
        de:'Einige häufige Verben verwenden kein -ed. Ihre Vergangenheitsformen muss man lernen — als Liste.',
        en:'Some common verbs do not use -ed. Their past forms have to be learned as a list.' },
      table:[
        ['go \u2192 went',    'come \u2192 came',   'see \u2192 saw'],
        ['eat \u2192 ate',    'take \u2192 took',   'get \u2192 got'],
        ['have \u2192 had',   'make \u2192 made',   'buy \u2192 bought'],
        ['give \u2192 gave',  'know \u2192 knew',   'say \u2192 said']
      ],
      show:[
        { de:'She <b>went</b> home.',      gloss:{ ru:'Она пошла домой.', de:'Sie ist nach Hause gegangen.' } },
        { de:'They <b>came</b> yesterday.', gloss:{ ru:'Они пришли вчера.', de:'Sie sind gestern gekommen.' } },
        { de:'We <b>bought</b> some food.', gloss:{ ru:'Мы купили еды.', de:'Wir haben Essen gekauft.' } }
      ],
      note:{
        ru:'Хорошая новость: этих глаголов немного, и они самые частые — значит, встретишь их быстро.',
        de:'Die gute Nachricht: es sind nicht viele, und es sind die häufigsten — du begegnest ihnen also schnell.',
        en:'The good news: there are not many, and they are the commonest verbs, so you meet them fast.' }
    },

    /* ---------- 4. regular or irregular ---------- */
    { kind:'sort',
      ask:{ ru:'Правильный или неправильный?', de:'Regelmäßig oder unregelmäßig?', en:'Regular or irregular?' },
      bins:[
        { id:'reg', label:'-ed' },
        { id:'irr', label:'irregular' }
      ],
      cards:[
        { text:'worked',  bin:'reg' },
        { text:'called',  bin:'reg' },
        { text:'played',  bin:'reg' },
        { text:'visited', bin:'reg' },
        { text:'went',    bin:'irr' },
        { text:'saw',     bin:'irr' },
        { text:'came',    bin:'irr' },
        { text:'ate',     bin:'irr' },
        { text:'bought',  bin:'irr' }
      ]
    },

    /* ---------- 5. was and were ---------- */
    { kind:'read',
      head:{ ru:'BE в прошлом: WAS и WERE', de:'BE in der Vergangenheit: WAS und WERE', en:'BE in the past: WAS / WERE' },
      body:{
        ru:'У BE есть свои формы прошедшего времени: was и were. Это единственный английский глагол, который в прошлом вообще меняется по лицу.',
        de:'BE hat eigene Vergangenheitsformen: was und were. Es ist das einzige englische Verb, das sich in der Vergangenheit überhaupt nach der Person ändert.',
        en:'BE has its own past forms: was and were. It is the only English verb that changes with the person in the past at all.' },
      table:[
        ['I / he / she / it', 'was',  'She was at home.'],
        ['you / we / they',   'were', 'We were late.']
      ],
      show:[
        { de:'I <b>was</b> tired.',
          gloss:{ ru:'Я была уставшей.', ruM:'Я был уставшим.', de:'Ich war müde.' } },
        { de:'Nazar <b>was</b> at school.',
          gloss:{ ru:'Назар был в школе.', de:'Nazar war in der Schule.' } },
        { de:'They <b>were</b> hungry.',
          gloss:{ ru:'Они были голодны.', de:'Sie hatten Hunger.' } },
        { de:'You <b>were</b> right.',
          gloss:{ ru:'Ты была права.', ruM:'Ты был прав.', de:'Du hattest recht.' } }
      ]
    },

    /* ---------- 6. was or were ---------- */
    { kind:'sort',
      ask:{ ru:'WAS или WERE?', de:'WAS oder WERE?', en:'WAS or WERE?' },
      bins:[
        { id:'was',  label:'was'  },
        { id:'were', label:'were' }
      ],
      cards:[
        { text:'I',           bin:'was'  },
        { text:'he',          bin:'was'  },
        { text:'Tanya',       bin:'was'  },
        { text:'it',          bin:'was'  },
        { text:'you',         bin:'were' },
        { text:'we',          bin:'were' },
        { text:'they',        bin:'were' },
        { text:'my friends',  bin:'were' }
      ]
    },

    /* ---------- 7. negatives and questions with did ---------- */
    { kind:'read',
      head:{ ru:'Отрицание и вопрос с DID', de:'Verneinung und Frage mit DID', en:'Negatives and questions with DID' },
      body:{
        ru:'DID показывает прошедшее время, поэтому основной глагол возвращается к начальной форме. Это то же правило, что и с does — помощник несёт грамматику.',
        de:'DID trägt die Vergangenheit, deshalb steht das Hauptverb wieder in der Grundform. Dieselbe Regel wie bei does — das Hilfsverb trägt die Grammatik.',
        en:'DID carries the past, so the main verb returns to its base form. The same rule as with does — the helper carries the grammar.' },
      show:[
        { de:'She worked. \u2192 She <b>didn\u2019t work</b>. \u2192 <b>Did</b> she <b>work</b>?',
          gloss:{ ru:'Правильный глагол.', de:'Regelmäßiges Verb.' } },
        { de:'He went home. \u2192 He <b>didn\u2019t go</b>. \u2192 <b>Did</b> he <b>go</b> home?',
          gloss:{ ru:'Неправильный глагол — то же самое.', de:'Unregelmäßiges Verb — genauso.' } },
        { de:'\u2717 She didn\u2019t worked. \u00b7 \u2717 Did he went home?',
          gloss:{ ru:'Прошедшее время уже внутри did.', de:'Die Vergangenheit steckt schon in did.' } }
      ],
      note:{
        ru:'По-русски достаточно поставить «не» и поменять интонацию. По-английски добавляется целое слово, и глагол теряет прошедшее время.',
        de:'Im Russischen genügt «не» und die Betonung. Im Englischen kommt ein ganzes Wort dazu, und das Verb verliert die Vergangenheit.',
        en:'Russian needs «не» and a change of intonation. English adds a whole word, and the verb gives up its past form.' }
    },

    /* ---------- 8. BE does it differently ---------- */
    { kind:'read',
      head:{ ru:'С BE всё иначе', de:'Bei BE ist es anders', en:'BE is different' },
      body:{
        ru:'WAS и WERE сами образуют вопросы и отрицания. DID добавлять не нужно — точно так же, как в настоящем времени be обходится без do.',
        de:'WAS und WERE bilden ihre Fragen und Verneinungen selbst. DID wird nicht hinzugefügt — genau wie be in der Gegenwart ohne do auskommt.',
        en:'WAS and WERE make their own questions and negatives. You do not add DID — exactly as be needs no do in the present.' },
      show:[
        { de:'She was tired. \u2192 <b>Was</b> she tired? \u2192 She <b>wasn\u2019t</b> tired.',
          gloss:{ ru:'Ты была уставшей?', ruM:'Ты был уставшим?', de:'War sie müde?' } },
        { de:'They were home. \u2192 <b>Were</b> they home? \u2192 They <b>weren\u2019t</b> home.',
          gloss:{ ru:'Они были дома?', de:'Waren sie zu Hause?' } },
        { de:'\u2717 Did she be tired? \u00b7 \u2713 Was she tired?',
          gloss:{ ru:'С be никогда не бывает did.', de:'Bei be gibt es niemals did.' } }
      ]
    },

    /* ---------- 9. did or was ---------- */
    { kind:'pick',
      ask:{ ru:'DID или WAS/WERE?', de:'DID oder WAS/WERE?', en:'DID or WAS/WERE?' },
      rounds:[
        { de:'___ she work yesterday?', answer:'Did', options:['Did','Was'],
          gloss:{ ru:'Она вчера работала?', de:'Hat sie gestern gearbeitet?' } },
        { de:'___ she tired yesterday?', answer:'Was', options:['Did','Was'],
          gloss:{ ru:'Она вчера устала?', de:'War sie gestern müde?' } },
        { de:'___ they at home?', answer:'Were', options:['Did','Were'],
          gloss:{ ru:'Они были дома?', de:'Waren sie zu Hause?' } },
        { de:'___ they see the film?', answer:'Did', options:['Did','Were'],
          gloss:{ ru:'Они смотрели этот фильм?', de:'Haben sie den Film gesehen?' } },
        { de:'She ___ not work yesterday.', answer:'did', options:['did','was'],
          gloss:{ ru:'Вчера она не работала.', de:'Gestern hat sie nicht gearbeitet.' } },
        { de:'She ___ not tired.', answer:'was', options:['did','was'],
          gloss:{ ru:'Она не устала.', de:'Sie war nicht müde.' } },
        { de:'He didn\u2019t ___ home.', answer:'go', options:['go','went'],
          gloss:{ ru:'Он не пошёл домой.', de:'Er ist nicht nach Hause gegangen.' } },
        { de:'Did they ___ Tanya?', answer:'see', options:['see','saw'],
          gloss:{ ru:'Они видели Таню?', de:'Haben sie Tanya gesehen?' } }
      ]
    },

    /* ---------- 10. time words ---------- */
    { kind:'read',
      head:{ ru:'Слова времени', de:'Zeitangaben', en:'Past time words' },
      body:{
        ru:'Выражения времени помогают показать, что действие завершилось в прошлом. В английском они особенно важны: сам глагол уже не меняется по роду, так что время несут именно эти слова.',
        de:'Zeitangaben helfen zu zeigen, dass die Handlung abgeschlossen ist. Im Englischen sind sie besonders wichtig, weil das Verb selbst wenig verrät.',
        en:'Past time expressions help show that the action is finished. They matter in English because the verb itself tells you so little.' },
      table:[
        ['yesterday',     'вчера · gestern',                    'I called her yesterday.'],
        ['last night',    'вчера вечером · gestern Abend',      'She cooked last night.'],
        ['last week',     'на прошлой неделе · letzte Woche',   'We went there last week.'],
        ['last year',     'в прошлом году · letztes Jahr',      'They lived in Berlin last year.'],
        ['two days ago',  'два дня назад · vor zwei Tagen',     'He called two days ago.'],
        ['in 2025',       'в 2025 году · im Jahr 2025',         'She moved to Berlin in 2025.']
      ]
    },

    /* ---------- 11. the whole pattern ---------- */
    { kind:'read',
      head:{ ru:'Вся схема', de:'Das ganze Muster', en:'The whole pattern' },
      body:{
        ru:'С обычными глаголами используется DID. С BE в прошлом используются WAS и WERE напрямую. Больше ничего запоминать не нужно.',
        de:'Normale Verben verwenden DID. Bei BE in der Vergangenheit verwendet man WAS und WERE direkt. Mehr gibt es nicht zu merken.',
        en:'Ordinary verbs use DID. Past BE uses WAS and WERE directly. There is nothing else to remember.' },
      show:[
        { de:'She worked here. \u00b7 <b>Did</b> she work here? \u00b7 She <b>didn\u2019t</b> work here.',
          gloss:{ ru:'Правильный глагол.', de:'Regelmäßiges Verb.' } },
        { de:'He went home. \u00b7 <b>Did</b> he go home? \u00b7 He <b>didn\u2019t</b> go home.',
          gloss:{ ru:'Неправильный глагол — та же схема.', de:'Unregelmäßiges Verb — dasselbe Muster.' } },
        { de:'They were late. \u00b7 <b>Were</b> they late? \u00b7 They <b>weren\u2019t</b> late.',
          gloss:{ ru:'BE — сам себе помощник.', de:'BE ist sein eigenes Hilfsverb.' } }
      ]
    },

    /* ---------- 12. no choices ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Закончи предложение в прошедшем времени', de:'Vervollständige den Satz in der Vergangenheit', en:'Complete the past sentence' },
      rounds:[
        { de:'Yesterday she ___ me.', answer:'called',
          gloss:{ ru:'Вчера она мне звонила.', de:'Gestern hat sie mich angerufen.' } },
        { de:'He ___ home early.', answer:'went',
          gloss:{ ru:'Он рано ушёл домой.', de:'Er ist früh nach Hause gegangen.' } },
        { de:'They ___ dinner at seven.', answer:'ate',
          gloss:{ ru:'Они поужинали в семь.', de:'Sie haben um sieben gegessen.' } },
        { de:'She ___ tired yesterday.', answer:'was',
          gloss:{ ru:'Вчера она устала.', de:'Gestern war sie müde.' } },
        { de:'We ___ at home.', answer:'were',
          gloss:{ ru:'Мы были дома.', de:'Wir waren zu Hause.' } },
        { de:'Did she ___ yesterday?', answer:'work',
          gloss:{ ru:'Она вчера работала?', de:'Hat sie gestern gearbeitet?' } },
        { de:'Did he ___ the film?', answer:'see',
          gloss:{ ru:'Он смотрел этот фильм?', de:'Hat er den Film gesehen?' } },
        { de:'She didn\u2019t ___ me.', answer:'call',
          gloss:{ ru:'Она мне не звонила.', de:'Sie hat mich nicht angerufen.' } },
        { de:'___ they late?', answer:'Were',
          gloss:{ ru:'Они опоздали?', de:'Waren sie zu spät?' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Zusammenfassung', en:'In short' },
      body:{
        ru:'В утвердительном предложении прошедшее время выражается формой основного глагола: worked, went. С DID основной глагол возвращается к начальной форме. У BE свои формы — was и were — и они сами образуют вопрос и отрицание.',
        de:'Im positiven Satz trägt das Hauptverb die Vergangenheit: worked, went. Mit DID steht das Hauptverb wieder in der Grundform. BE hat eigene Formen — was und were — und bildet Frage und Verneinung selbst.',
        en:'In a positive past statement the main verb carries the past: worked, went. With DID, the main verb goes back to its base form. BE has its own forms — was and were — and makes its own questions and negatives.' },
      show:[
        { de:'work \u2192 worked \u00b7 call \u2192 called \u00b7 go \u2192 went \u00b7 see \u2192 saw \u00b7 eat \u2192 ate' },
        { de:'<b>Did</b> she work? \u00b7 She <b>didn\u2019t</b> work.' },
        { de:'<b>Was</b> she tired? \u00b7 She <b>wasn\u2019t</b> tired.' }
      ]
    }

  ]
},

/* ==================================================================
   Commands — Open. Don't open. Be careful. Let's go.

   The shortest lesson in the English course, and one of the most
   immediately useful: the site itself talks to her this way, and so does
   every sign and every stranger in Berlin.

   Russian already has a clean imperative and German has two, so the idea
   needs no introduction. Three English facts do:

     the subject comes OFF        Open the window, not You open the window
     the negative is Don't        not a bare not in front of the verb
     BE has its own form          Be careful, not Are careful

   Let's and Let's not are in because they cost one row each and she will
   want them.

   The command-against-statement sort is the load-bearing step. "You open
   the window" is perfectly good English — it is just not a command — and
   that is the distinction a Russian speaker has to make consciously,
   because Russian marks it on the verb instead.

   Reference bank: data/en-commands.js.
   ================================================================== */
{
  id:'en-commands',
  glyph:'\u261D',
  mins:6,
  target:'en',

  name:{
    ru:'Повелительное наклонение',
    de:'Aufforderungen',
    en:'Commands'
  },

  sub:{
    ru:'Сделай. Не делай. Давай.',
    de:'Mach es. Mach es nicht. Lass uns.',
    en:'Do it. Don\u2019t do it. Let\u2019s.'
  },

  steps:[

    /* ---------- 1. the subject comes off ---------- */
    { kind:'read',
      head:{ ru:'Подлежащее убирается', de:'Das Subjekt fällt weg', en:'The subject comes off' },
      body:{
        ru:'Команда — это начальная форма глагола, и перед ней ничего не стоит. Ни I, ни you, ни she. По-русски команда видна по форме глагола: открой. По-английски её видно по тому, чего нет.',
        de:'Ein Befehl ist das Verb in der Grundform, und davor steht nichts. Kein I, kein you, kein she. Im Russischen zeigt die Verbform den Befehl an: открой. Im Englischen zeigt ihn das, was fehlt.',
        en:'A command is the base verb with nothing in front of it. No I, no you, no she. Russian shows a command in the verb\u2019s own form — открой. English shows it by what is missing.' },
      show:[
        { de:'<b>Open</b> the window.',  gloss:{ ru:'Открой окно.', de:'Mach das Fenster auf.' } },
        { de:'<b>Sit</b> down.',         gloss:{ ru:'Садись.', de:'Setz dich.' } },
        { de:'<b>Wait</b> here.',        gloss:{ ru:'Подожди здесь.', de:'Warte hier.' } },
        { de:'<b>Give</b> me the book.', gloss:{ ru:'Дай мне книгу.', de:'Gib mir das Buch.' } }
      ],
      note:{
        ru:'И никакого -s: не Opens the window, а Open the window.',
        de:'Und kein -s: nicht Opens the window, sondern Open the window.',
        en:'And no -s: not Opens the window, but Open the window.' }
    },

    /* ---------- 2. command or statement ---------- */
    { kind:'sort',
      ask:{ ru:'Команда или утверждение?', de:'Befehl oder Aussage?', en:'Command or statement?' },
      bins:[
        { id:'cmd',  label:'command'   },
        { id:'stmt', label:'statement' }
      ],
      cards:[
        { text:'Open the window.',        bin:'cmd'  },
        { text:'Wait here.',              bin:'cmd'  },
        { text:'Call Tanya.',             bin:'cmd'  },
        { text:'Don\u2019t touch that.',  bin:'cmd'  },
        { text:'You open the window.',    bin:'stmt' },
        { text:'She waits here.',         bin:'stmt' },
        { text:'You don\u2019t touch that.', bin:'stmt' },
        { text:'He calls Tanya.',         bin:'stmt' }
      ]
    },

    /* ---------- 3. Don't ---------- */
    { kind:'read',
      head:{ ru:'Чтобы сказать «не делай»', de:'Um „mach es nicht“ zu sagen', en:'To say don\u2019t' },
      body:{
        ru:'Поставь Don\u2019t перед глаголом. Глагол при этом не меняется. Голое not перед глаголом по-английски не работает.',
        de:'Setze Don\u2019t vor das Verb. Das Verb bleibt gleich. Ein bloßes not vor dem Verb funktioniert im Englischen nicht.',
        en:'Put Don\u2019t in front of the verb. The verb does not change. A bare not in front of the verb is not English.' },
      show:[
        { de:'<b>Don\u2019t</b> run.',              gloss:{ ru:'Не беги.', de:'Lauf nicht.' } },
        { de:'<b>Don\u2019t</b> touch that.',       gloss:{ ru:'Не трогай это.', de:'Fass das nicht an.' } },
        { de:'<b>Don\u2019t</b> forget the bread.', gloss:{ ru:'Не забудь хлеб.', de:'Vergiss das Brot nicht.' } },
        { de:'\u2717 Not open the window. \u00b7 \u2717 Don\u2019t opens the window.',
          gloss:{ ru:'Don\u2019t уже стоит — глагол остаётся open.', de:'Don\u2019t steht schon — das Verb bleibt open.' } }
      ]
    },

    /* ---------- 4. on and off ---------- */
    { kind:'pick',
      ask:{ ru:'Сделай или не делай?', de:'Mach es oder mach es nicht?', en:'Do it, or don\u2019t?' },
      rounds:[
        { de:'___ the window. It\u2019s hot in here.', answer:'Open', options:['Open','Don\u2019t open'],
          gloss:{ ru:'Здесь жарко — открой окно.', de:'Hier ist es heiß — mach das Fenster auf.' } },
        { de:'___ that. It\u2019s hot.', answer:'Don\u2019t touch', options:['Touch','Don\u2019t touch'],
          gloss:{ ru:'Это горячее — не трогай.', de:'Das ist heiß — fass es nicht an.' } },
        { de:'Don\u2019t ___ the bread.', answer:'forget', options:['forget','forgets'],
          gloss:{ ru:'Не забудь хлеб.', de:'Vergiss das Brot nicht.' } },
        { de:'___ Tanya. She\u2019s waiting.', answer:'Call', options:['Call','Calls'],
          gloss:{ ru:'Позвони Тане — она ждёт.', de:'Ruf Tanya an — sie wartet.' } },
        { de:'___ here. The bus is coming.', answer:'Wait', options:['Wait','You wait'],
          gloss:{ ru:'Подожди здесь — автобус идёт.', de:'Warte hier — der Bus kommt.' } }
      ]
    },

    /* ---------- 5. BE ---------- */
    { kind:'read',
      head:{ ru:'У BE своя форма', de:'BE hat seine eigene Form', en:'BE has its own command' },
      body:{
        ru:'Один глагол ведёт себя иначе. Команда от be — это Be, а не are и не is. Для отрицания — Don\u2019t be.',
        de:'Ein Verb verhält sich anders. Der Befehl von be ist Be, nicht are und nicht is. Für die Verneinung: Don\u2019t be.',
        en:'One verb behaves differently. The command from be is Be — not are, not is. For the negative, Don\u2019t be.' },
      show:[
        { de:'<b>Be</b> careful.',
          gloss:{ ru:'Будь осторожна.', ruM:'Будь осторожен.', de:'Sei vorsichtig.' } },
        { de:'<b>Be</b> quiet. \u00b7 <b>Be</b> patient.',
          gloss:{ ru:'Тише. · Потерпи.', de:'Sei still. · Sei geduldig.' } },
        { de:'<b>Don\u2019t be</b> late. \u00b7 <b>Don\u2019t be</b> afraid.',
          gloss:{ ru:'Не опаздывай. · Не бойся.', de:'Komm nicht zu spät. · Hab keine Angst.' } },
        { de:'\u2717 Are careful. \u00b7 \u2717 Don\u2019t are late.',
          gloss:{ ru:'Начальная форма be — это be.', de:'Die Grundform von be ist be.' } }
      ]
    },

    /* ---------- 6. Be or Don't be ---------- */
    { kind:'pick',
      ask:{ ru:'Какая форма?', de:'Welche Form?', en:'Which form?' },
      rounds:[
        { de:'___ careful. The floor is wet.', answer:'Be', options:['Be','Are'],
          gloss:{ ru:'Пол мокрый — будь осторожна.', ruM:'Пол мокрый — будь осторожен.', de:'Der Boden ist nass — sei vorsichtig.' } },
        { de:'___ late. The lesson starts at nine.', answer:'Don\u2019t be', options:['Don\u2019t be','Be'],
          gloss:{ ru:'Урок в девять — не опаздывай.', de:'Der Unterricht ist um neun — komm nicht zu spät.' } },
        { de:'___ quiet. Nazar is sleeping.', answer:'Be', options:['Be','Is'],
          gloss:{ ru:'Назар спит — тише.', de:'Nazar schläft — sei still.' } },
        { de:'Don\u2019t ___ afraid. The dog is friendly.', answer:'be', options:['be','are'],
          gloss:{ ru:'Собака добрая — не бойся.', de:'Der Hund ist freundlich — hab keine Angst.' } }
      ]
    },

    /* ---------- 7. please and Let's ---------- */
    { kind:'read',
      head:{ ru:'Мягче, и «давай»', de:'Höflicher, und „lass uns“', en:'Softer, and Let\u2019s' },
      body:{
        ru:'Please ставится в начало или в конец — сама команда не меняется. А Let\u2019s включает и говорящего: не «сделай», а «давай сделаем». Отрицание — Let\u2019s not.',
        de:'Please steht vorn oder am Ende — der Befehl selbst ändert sich nicht. Und Let\u2019s schließt den Sprecher mit ein: nicht „mach“, sondern „lass uns machen“. Die Verneinung ist Let\u2019s not.',
        en:'Please goes at the front or the end — the command itself does not change. And Let\u2019s includes the speaker: not do it, but let us do it. The negative is Let\u2019s not.' },
      show:[
        { de:'<b>Please</b> wait. \u00b7 Open the window, <b>please</b>.',
          gloss:{ ru:'Подожди, пожалуйста. · Открой окно, пожалуйста.', de:'Bitte warte. · Mach bitte das Fenster auf.' } },
        { de:'<b>Let\u2019s</b> go. \u00b7 <b>Let\u2019s</b> call Tanya.',
          gloss:{ ru:'Пойдём. · Давай позвоним Тане.', de:'Lass uns gehen. · Lass uns Tanya anrufen.' } },
        { de:'<b>Let\u2019s not</b> wait. \u00b7 <b>Let\u2019s not</b> tell Tanya yet.',
          gloss:{ ru:'Давай не будем ждать. · Давай пока не будем говорить Тане.', de:'Lass uns nicht warten. · Lass es Tanya noch nicht sagen.' } },
        { de:'\u2717 Let\u2019s don\u2019t go. \u00b7 \u2713 Let\u2019s not go.',
          gloss:{ ru:'С Let\u2019s используется not.', de:'Mit Let\u2019s benutzt man not.' } }
      ]
    },

    /* ---------- 8. the natural one ---------- */
    { kind:'pick',
      ask:{ ru:'Что здесь звучит естественно?', de:'Was klingt hier natürlich?', en:'Which sounds natural here?' },
      rounds:[
        { de:'You are a guest. ___ sit down.', answer:'Please', options:['Please','Let\u2019s'],
          gloss:{ ru:'Гостю: садитесь, пожалуйста.', de:'Zu einem Gast: bitte setz dich.' } },
        { de:'You are both hungry. ___ eat.', answer:'Let\u2019s', options:['Let\u2019s','Please'],
          gloss:{ ru:'Вы оба голодны — давай есть.', de:'Ihr habt beide Hunger — lass uns essen.' } },
        { de:'It\u2019s a secret. ___ tell Tanya yet.', answer:'Let\u2019s not', options:['Let\u2019s not','Don\u2019t be'],
          gloss:{ ru:'Это секрет — давай пока не будем говорить Тане.', de:'Das ist ein Geheimnis — lass es Tanya noch nicht sagen.' } },
        { de:'The floor is wet. ___ careful.', answer:'Be', options:['Be','Let\u2019s'],
          gloss:{ ru:'Пол мокрый — осторожно.', de:'Der Boden ist nass — sei vorsichtig.' } },
        { de:'The bus is late. ___ worry.', answer:'Don\u2019t', options:['Don\u2019t','Let\u2019s not'],
          gloss:{ ru:'Автобус опаздывает — не волнуйся.', de:'Der Bus ist spät — mach dir keine Sorgen.' } }
      ]
    },

    /* ---------- 9. no choices ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Составь команду', de:'Bilde den Befehl', en:'Build the command' },
      rounds:[
        { de:'___ the window, please.', answer:'Open',
          gloss:{ ru:'Открой окно, пожалуйста.', de:'Mach bitte das Fenster auf.' } },
        { de:'___ here. The bus is coming.', answer:'Wait',
          gloss:{ ru:'Подожди здесь — автобус идёт.', de:'Warte hier — der Bus kommt.' } },
        { de:'___ careful. The floor is wet.', answer:'Be',
          gloss:{ ru:'Пол мокрый — будь осторожна.', ruM:'Пол мокрый — будь осторожен.', de:'Der Boden ist nass — sei vorsichtig.' } },
        { de:'___ touch that. It\u2019s hot.', answer:'Don\u2019t',
          gloss:{ ru:'Это горячее — не трогай.', de:'Das ist heiß — fass es nicht an.' } },
        { de:'___ go. We\u2019re late.', answer:'Let\u2019s',
          gloss:{ ru:'Мы опаздываем — пойдём.', de:'Wir sind spät — lass uns gehen.' } },
        { de:'Don\u2019t ___ late.', answer:'be',
          gloss:{ ru:'Не опаздывай.', de:'Komm nicht zu spät.' } },
        { de:'___ me the book, please.', answer:'Give',
          gloss:{ ru:'Дай мне книгу, пожалуйста.', de:'Gib mir bitte das Buch.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Команда — начальная форма глагола без подлежащего и без -s. Don\u2019t перед глаголом — отрицание. У be своя форма: Be и Don\u2019t be. Please смягчает, Let\u2019s включает вас двоих, а его отрицание — Let\u2019s not.',
        de:'Ein Befehl ist die Grundform ohne Subjekt und ohne -s. Don\u2019t vor dem Verb verneint. BE hat eigene Formen: Be und Don\u2019t be. Please macht es höflicher, Let\u2019s schließt euch beide ein, und dessen Verneinung ist Let\u2019s not.',
        en:'A command is the base verb with no subject and no -s. Don\u2019t in front makes it negative. BE has its own: Be and Don\u2019t be. Please softens it, Let\u2019s includes both of you, and its negative is Let\u2019s not.' },
      show:[
        { de:'<b>Open</b> the window. \u00b7 <b>Don\u2019t open</b> the window.' },
        { de:'<b>Be</b> careful. \u00b7 <b>Don\u2019t be</b> late.' },
        { de:'<b>Please</b> wait. \u00b7 <b>Let\u2019s</b> go. \u00b7 <b>Let\u2019s not</b> wait.' }
      ]
    }

  ]
},

/* ==================================================================
   Modal verbs — can · should · must · have to

   One rule carries the whole lesson: after a modal, the base verb. No
   -s, no to, no second conjugation. And the modal itself never takes -s
   either, which is the mistake to expect from someone who has just
   learned he works.

   RUSSIAN MOSTLY HELPS HERE. Могу + infinitive, должен + infinitive,
   надо + infinitive — the shape is the same, and the instinct transfers.
   Two things do not:

     она может работать has no -s problem to make, so `she cans` and
     `she can works` come from English's own third person, not from Russian

     нельзя against не надо is exactly mustn't against don't have to, and
     Russian DOES distinguish them — so this contrast can be taught by
     pointing at her own language rather than against it

   GERMAN HELPS EVEN MORE, and the site already teaches the German modals
   as their own lesson: the bracket (modal second, other verb at the end)
   is German's complication and English simply does not have it. Worth
   saying, because she will be looking for the second verb to move.

   The one genuinely hard pair is mustn't / don't have to, and it gets
   its own read and its own pick. It is not a nicety: it is the
   difference between forbidden and optional, and getting it backwards
   in a real conversation is a problem.

   have to is in with the modals despite not being one grammatically. It
   is how English actually expresses outside necessity, and leaving it
   out to keep the category clean would teach her a category instead of a
   language.
   ================================================================== */
{
  id:'en-modals',
  glyph:'\uD83D\uDDDD',
  mins:9,
  target:'en',

  name:{
    ru:'Модальные глаголы',
    de:'Modalverben',
    en:'Modal verbs'
  },

  sub:{
    ru:'can · should · must · have to',
    de:'can · should · must · have to',
    en:'can · should · must · have to'
  },

  steps:[

    /* ---------- 1. the one rule ---------- */
    { kind:'read',
      head:{ ru:'После модального — начальная форма', de:'Nach einem Modalverb die Grundform', en:'After a modal, the base verb' },
      body:{
        ru:'После модального глагола используй начальную форму основного глагола. Здесь русский подсказывает верно: «могу работать», «должен работать» — то же самое.',
        de:'Nach einem Modalverb steht das Hauptverb in der Grundform. Hier hilft das Russische: «могу работать», «должен работать» — genauso.',
        en:'After a modal, use the base verb. Russian works the same way here: могу работать, должен работать.' },
      show:[
        { de:'I <b>can swim</b>.',           gloss:{ ru:'Я умею плавать.', de:'Ich kann schwimmen.' } },
        { de:'She <b>should rest</b>.',      gloss:{ ru:'Ей стоит отдохнуть.', de:'Sie sollte sich ausruhen.' } },
        { de:'You <b>must stop</b>.',        gloss:{ ru:'Ты должна остановиться.', ruM:'Ты должен остановиться.', de:'Du musst anhalten.' } },
        { de:'\u2717 She can works. \u00b7 \u2717 She cans work. \u00b7 \u2713 She can work.',
          gloss:{ ru:'Ни на модальном, ни на основном глаголе -s не бывает.', de:'Weder das Modalverb noch das Hauptverb bekommt ein -s.' } }
      ],
      note:{
        ru:'И в отличие от немецкого, второй глагол никуда не уходит: он стоит сразу за модальным, а не в конце.',
        de:'Und anders als im Deutschen wandert das zweite Verb nicht ans Ende — es steht direkt hinter dem Modalverb.',
        en:'And unlike German, the second verb does not move to the end — it sits right after the modal.' }
    },

    /* ---------- 2. what each one means ---------- */
    { kind:'read',
      head:{ ru:'Что означает каждый', de:'Was jedes bedeutet', en:'What each one means' },
      body:{
        ru:'Четыре слова, четыре разные работы. can — умение или возможность. should — совет. must — сильная необходимость. have to — необходимость извне: правило, работа, обстоятельства.',
        de:'Vier Wörter, vier verschiedene Aufgaben. can — Fähigkeit oder Möglichkeit. should — Rat. must — starke Notwendigkeit. have to — Notwendigkeit von außen: eine Regel, die Arbeit, die Umstände.',
        en:'Four words, four different jobs. can — ability or possibility. should — advice. must — strong necessity. have to — necessity from outside: a rule, a job, the circumstances.' },
      table:[
        ['can',     'умею, могу · kann',      'I can swim.'],
        ['should',  'стоит, следует · sollte', 'You should rest.'],
        ['must',    'должен · muss',          'You must stop.'],
        ['have to', 'приходится · muss',      'I have to work tomorrow.']
      ],
      note:{
        ru:'have to — не модальный глагол по форме, но именно так по-английски говорят о необходимости извне. И он меняется: he has to.',
        de:'have to ist formal kein Modalverb, aber genau so drückt Englisch äußere Notwendigkeit aus. Und es ändert sich: he has to.',
        en:'have to is not a modal by form, but it is how English expresses outside necessity. And it does change: he has to.' }
    },

    /* ---------- 3. can or should ---------- */
    { kind:'sort',
      ask:{ ru:'Умение или совет?', de:'Fähigkeit oder Rat?', en:'Ability, or advice?' },
      bins:[
        { id:'can',    label:'can'    },
        { id:'should', label:'should' }
      ],
      cards:[
        { text:'I swim well.',              bin:'can'    },
        { text:'She speaks three languages.', bin:'can'  },
        { text:'Nazar plays the guitar.',   bin:'can'    },
        { text:'You are tired \u2014 rest.', bin:'should' },
        { text:'It\u2019s cold \u2014 take a jacket.', bin:'should' },
        { text:'You look ill \u2014 see a doctor.', bin:'should' }
      ]
    },

    /* ---------- 4. must or have to ---------- */
    { kind:'sort',
      ask:{ ru:'Откуда идёт необходимость?', de:'Woher kommt die Notwendigkeit?', en:'Where does the necessity come from?' },
      bins:[
        { id:'must',   label:'must'    },
        { id:'haveto', label:'have to' }
      ],
      cards:[
        { text:'The light is red. Stop.',        bin:'must'   },
        { text:'This is important. Listen.',     bin:'must'   },
        { text:'I decided: I go now.',           bin:'must'   },
        { text:'My boss says: work Saturday.',   bin:'haveto' },
        { text:'The school starts at eight.',    bin:'haveto' },
        { text:'The doctor says: take the pills.', bin:'haveto' }
      ]
    },

    /* ---------- 5. pick the modal ---------- */
    { kind:'pick',
      ask:{ ru:'Какой модальный подходит?', de:'Welches Modalverb passt?', en:'Which modal fits?' },
      rounds:[
        { de:'Tanya ___ swim very well.', answer:'can', options:['can','should'],
          gloss:{ ru:'Таня очень хорошо плавает.', de:'Tanya kann sehr gut schwimmen.' } },
        { de:'You look tired. You ___ rest.', answer:'should', options:['can','should'],
          gloss:{ ru:'Ты выглядишь усталой — тебе стоит отдохнуть.', ruM:'Ты выглядишь усталым — тебе стоит отдохнуть.', de:'Du siehst müde aus — du solltest dich ausruhen.' } },
        { de:'The light is red. You ___ stop.', answer:'must', options:['must','can'],
          gloss:{ ru:'Красный свет — надо остановиться.', de:'Rot — du musst anhalten.' } },
        { de:'My boss called. I ___ work on Saturday.', answer:'have to', options:['have to','can'],
          gloss:{ ru:'Звонил начальник — придётся работать в субботу.', de:'Der Chef hat angerufen — ich muss am Samstag arbeiten.' } },
        { de:'Nazar ___ play the guitar.', answer:'can', options:['can','must'],
          gloss:{ ru:'Назар умеет играть на гитаре.', de:'Nazar kann Gitarre spielen.' } },
        { de:'She ___ call the doctor. She looks ill.', answer:'should', options:['should','can'],
          gloss:{ ru:'Ей стоит позвонить врачу — она плохо выглядит.', de:'Sie sollte den Arzt anrufen — sie sieht krank aus.' } },
        { de:'The school starts at eight, so Nazar ___ leave at half past seven.', answer:'has to', options:['has to','have to'],
          gloss:{ ru:'Школа в восемь, значит Назару надо выходить в полвосьмого.', de:'Die Schule beginnt um acht, also muss Nazar um halb acht losgehen.' } }
      ]
    },

    /* ---------- 6. the base verb after it ---------- */
    { kind:'pick',
      ask:{ ru:'Что идёт после модального?', de:'Was kommt nach dem Modalverb?', en:'What comes after the modal?' },
      rounds:[
        { de:'She can ___ three languages.', answer:'speak', options:['speak','speaks'],
          gloss:{ ru:'Она говорит на трёх языках.', de:'Sie kann drei Sprachen sprechen.' } },
        { de:'He should ___ the doctor.', answer:'call', options:['call','calls'],
          gloss:{ ru:'Ему стоит позвонить врачу.', de:'Er sollte den Arzt anrufen.' } },
        { de:'You must ___ now.', answer:'stop', options:['stop','stopped'],
          gloss:{ ru:'Тебе надо остановиться сейчас.', de:'Du musst jetzt anhalten.' } },
        { de:'Tanya has to ___ early tomorrow.', answer:'leave', options:['leave','leaves'],
          gloss:{ ru:'Тане завтра надо выйти рано.', de:'Tanya muss morgen früh los.' } },
        { de:'She ___ swim.', answer:'can', options:['can','cans'],
          gloss:{ ru:'Модальный глагол сам никогда не берёт -s.', de:'Das Modalverb selbst bekommt nie ein -s.' } }
      ]
    },

    /* ---------- 7. questions and negatives ---------- */
    { kind:'read',
      head:{ ru:'Вопрос и отрицание', de:'Frage und Verneinung', en:'Questions and negatives' },
      body:{
        ru:'Модальный сам переходит вперёд и сам принимает not — как be, и в отличие от обычных глаголов. Никакого do не нужно. Исключение — have to: у него как раз do.',
        de:'Das Modalverb geht selbst nach vorn und nimmt selbst not — wie be, anders als normale Verben. Kein do nötig. Die Ausnahme ist have to: das braucht do.',
        en:'The modal moves to the front itself and takes not itself — like be, unlike ordinary verbs. No do needed. The exception is have to, which does use do.' },
      show:[
        { de:'<b>Can</b> you help me? \u00b7 I <b>can\u2019t</b> come.',
          gloss:{ ru:'Ты можешь мне помочь? · Я не могу прийти.', de:'Kannst du mir helfen? · Ich kann nicht kommen.' } },
        { de:'You <b>shouldn\u2019t</b> worry.',
          gloss:{ ru:'Не стоит волноваться.', de:'Du solltest dir keine Sorgen machen.' } },
        { de:'<b>Do</b> you <b>have to</b> work? \u00b7 I <b>don\u2019t have to</b> work.',
          gloss:{ ru:'have to — единственный, кому нужен do.', de:'have to ist das Einzige, das do braucht.' } },
        { de:'\u2717 Do you can help me? \u00b7 \u2713 Can you help me?',
          gloss:{ ru:'С can никогда не бывает do.', de:'Bei can gibt es niemals do.' } }
      ]
    },

    /* ---------- 8. the pair that matters ---------- */
    { kind:'read',
      head:{ ru:'mustn\u2019t \u2014 это не don\u2019t have to', de:'mustn\u2019t ist nicht don\u2019t have to', en:'mustn\u2019t is not don\u2019t have to' },
      body:{
        ru:'Это не тонкость. mustn\u2019t — нельзя, запрещено. don\u2019t have to — не обязательно, можно и не делать. По-русски это «нельзя» против «не надо», и русский их различает — значит, инстинкт здесь верный, просто слова другие.',
        de:'Das ist keine Feinheit. mustn\u2019t heißt verboten. don\u2019t have to heißt nicht nötig. Im Russischen ist das «нельзя» gegen «не надо», und Russisch unterscheidet sie — der Instinkt ist also richtig, nur die Wörter sind andere.',
        en:'This is not a nicety. mustn\u2019t means forbidden. don\u2019t have to means not necessary. Russian marks the same difference — нельзя against не надо — so the instinct is right and only the words are new.' },
      show:[
        { de:'You <b>mustn\u2019t</b> park here. \u2192 forbidden',
          gloss:{ ru:'Здесь нельзя парковаться.', de:'Hier darf man nicht parken.' } },
        { de:'You <b>don\u2019t have to</b> come. \u2192 optional',
          gloss:{ ru:'Тебе не обязательно приходить.', de:'Du musst nicht kommen.' } },
        { de:'You <b>mustn\u2019t</b> tell Tanya. \u00b7 You <b>don\u2019t have to</b> tell Tanya.',
          gloss:{ ru:'Первое — запрет. Второе — можно и не говорить.', de:'Das erste ist ein Verbot. Das zweite heißt: du musst es nicht.' } }
      ],
      note:{
        ru:'Перепутать их наоборот — настоящая проблема в разговоре, а не мелкая ошибка.',
        de:'Diese beiden zu verwechseln ist ein echtes Problem im Gespräch, kein kleiner Fehler.',
        en:'Getting these two backwards is a real problem in a conversation, not a small mistake.' }
    },

    /* ---------- 9. forbidden or optional ---------- */
    { kind:'pick',
      ask:{ ru:'Нельзя или не обязательно?', de:'Verboten oder nicht nötig?', en:'Forbidden, or optional?' },
      rounds:[
        { de:'It\u2019s a hospital. You ___ smoke here.', answer:'mustn\u2019t', options:['mustn\u2019t','don\u2019t have to'],
          gloss:{ ru:'Это больница — здесь нельзя курить.', de:'Das ist ein Krankenhaus — hier darf man nicht rauchen.' } },
        { de:'The soup is ready, but you ___ eat it.', answer:'don\u2019t have to', options:['mustn\u2019t','don\u2019t have to'],
          gloss:{ ru:'Суп готов, но есть не обязательно.', de:'Die Suppe ist fertig, aber du musst sie nicht essen.' } },
        { de:'The paint is wet. You ___ touch it.', answer:'mustn\u2019t', options:['mustn\u2019t','don\u2019t have to'],
          gloss:{ ru:'Краска свежая — трогать нельзя.', de:'Die Farbe ist frisch — nicht anfassen.' } },
        { de:'It\u2019s Saturday. Nazar ___ go to school.', answer:'doesn\u2019t have to', options:['mustn\u2019t','doesn\u2019t have to'],
          gloss:{ ru:'Суббота — Назару не надо в школу.', de:'Es ist Samstag — Nazar muss nicht zur Schule.' } },
        { de:'It\u2019s a secret. You ___ tell anyone.', answer:'mustn\u2019t', options:['mustn\u2019t','don\u2019t have to'],
          gloss:{ ru:'Это секрет — никому нельзя говорить.', de:'Das ist ein Geheimnis — du darfst es niemandem sagen.' } }
      ]
    },

    /* ---------- 10. no choices ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши пропущенное слово', de:'Schreib das fehlende Wort', en:'Type the missing word' },
      rounds:[
        { de:'Tanya ___ swim very well.', answer:'can',
          gloss:{ ru:'Таня очень хорошо плавает.', de:'Tanya kann sehr gut schwimmen.' } },
        { de:'You look tired. You ___ rest.', answer:'should',
          gloss:{ ru:'Тебе стоит отдохнуть.', de:'Du solltest dich ausruhen.' } },
        { de:'The light is red. You ___ stop.', answer:'must',
          gloss:{ ru:'Надо остановиться.', de:'Du musst anhalten.' } },
        { de:'She can ___ three languages.', answer:'speak',
          gloss:{ ru:'Она говорит на трёх языках.', de:'Sie kann drei Sprachen sprechen.' } },
        { de:'___ you help me?', answer:'Can',
          gloss:{ ru:'Ты можешь мне помочь?', de:'Kannst du mir helfen?' } },
        { de:'I ___ come tonight. I have to work.', answer:'can\u2019t',
          gloss:{ ru:'Сегодня не могу — надо работать.', de:'Heute kann ich nicht — ich muss arbeiten.' } },
        { de:'Nazar has to ___ at half past seven.', answer:'leave',
          gloss:{ ru:'Назару надо выходить в полвосьмого.', de:'Nazar muss um halb acht losgehen.' } },
        { de:'It\u2019s Saturday. Nazar doesn\u2019t ___ to go to school.', answer:'have',
          gloss:{ ru:'Суббота — в школу не надо.', de:'Samstag — er muss nicht zur Schule.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'can — умение, should — совет, must — сильная необходимость, have to — необходимость извне. После любого из них — начальная форма глагола, и сам модальный никогда не берёт -s. Вопрос и отрицание модальный образует сам, кроме have to, которому нужен do. И главное: mustn\u2019t — нельзя, don\u2019t have to — не обязательно.',
        de:'can — Fähigkeit, should — Rat, must — starke Notwendigkeit, have to — Notwendigkeit von außen. Nach allen steht die Grundform, und das Modalverb selbst bekommt nie ein -s. Frage und Verneinung bildet es selbst, außer have to, das do braucht. Und vor allem: mustn\u2019t heißt verboten, don\u2019t have to heißt nicht nötig.',
        en:'can for ability, should for advice, must for strong necessity, have to for necessity from outside. After all of them, the base verb — and the modal itself never takes -s. It makes its own questions and negatives, except have to, which needs do. And above all: mustn\u2019t means forbidden, don\u2019t have to means not necessary.' },
      show:[
        { de:'I <b>can</b> swim. \u00b7 You <b>should</b> rest. \u00b7 You <b>must</b> stop. \u00b7 I <b>have to</b> work.' },
        { de:'<b>Can</b> you help? \u00b7 I <b>can\u2019t</b> come. \u00b7 <b>Do</b> you <b>have to</b> work?' },
        { de:'You <b>mustn\u2019t</b> park here. \u00b7 You <b>don\u2019t have to</b> come.',
          gloss:{ ru:'Запрещено · не обязательно', de:'Verboten · nicht nötig' } }
      ]
    }

  ]
},

/* ==================================================================
   There is · There are — saying that something exists

   English needs a word here that Russian does not have at all, and this
   is the lesson's whole difficulty.

   Russian says «В комнате стол» — in the room, a table. No verb, no
   dummy subject, nothing standing in for there. So the two errors are
   predictable:

     drop it            In the kitchen a table.
     or use it wrong    It is a shop nearby.

   The second is the interesting one. `It is` is a real English sentence
   and she will have met it in lesson one, so reaching for it is
   reasonable — but It is a shop means that thing is a shop, not a shop
   exists nearby.

   GERMAN HELPS DIRECTLY, and the site already teaches its counterpart:
   es gibt is the German equivalent, and the German course has a whole
   lesson on it. Two things differ, and both are in the lesson:

     es gibt never changes; there is / there are agrees with the noun
     es gibt takes the accusative; English has no case to get wrong

   So a German speaker has the concept and needs the agreement. A Russian
   speaker needs the concept.

   some and any ride along at the end because there isn't any milk is how
   the negative is actually said, and teaching there isn't milk alone
   would leave her a sentence short.
   ================================================================== */
{
  id:'en-there',
  glyph:'\uD83D\uDCCC',
  mins:7,
  target:'en',

  name:{
    ru:'There is · There are',
    de:'There is · There are',
    en:'There is · There are'
  },

  sub:{
    ru:'Сказать, что что-то есть',
    de:'Sagen, dass es etwas gibt',
    en:'Say that something exists'
  },

  steps:[

    /* ---------- 1. the missing word ---------- */
    { kind:'read',
      head:{ ru:'Слово, которого в русском нет', de:'Ein Wort, das im Russischen fehlt', en:'A word Russian does not have' },
      body:{
        ru:'Чтобы сказать, что что-то есть или находится где-то, английский начинает предложение с There. По-русски достаточно сказать «В комнате стол» — ни глагола, ни подлежащего не нужно. По-английски нужно и то, и другое.',
        de:'Um zu sagen, dass etwas vorhanden ist, beginnt Englisch den Satz mit There. Im Russischen genügt «В комнате стол» — kein Verb, kein Subjekt. Im Englischen braucht man beides.',
        en:'To say that something exists or is present, English starts the sentence with There. Russian manages with «В комнате стол» — no verb, no subject. English needs both.' },
      show:[
        { de:'<b>There is</b> a dog outside.',
          gloss:{ ru:'На улице собака.', de:'Draußen ist ein Hund.' } },
        { de:'<b>There is</b> a table in the kitchen.',
          gloss:{ ru:'На кухне стол.', de:'In der Küche steht ein Tisch.' } },
        { de:'\u2717 In the kitchen a table. \u00b7 \u2713 There is a table in the kitchen.',
          gloss:{ ru:'Русская конструкция напрямую не работает.', de:'Die russische Konstruktion funktioniert nicht direkt.' } }
      ],
      note:{
        ru:'В немецком есть прямой аналог — es gibt. Разница одна: es gibt не меняется, а there is / there are согласуется с существительным.',
        de:'Im Deutschen gibt es die direkte Entsprechung: es gibt. Ein Unterschied: es gibt bleibt gleich, there is / there are richtet sich nach dem Nomen.',
        en:'German has the direct equivalent: es gibt. One difference — es gibt never changes, while there is / there are agrees with the noun.' }
    },

    /* ---------- 2. one or more than one ---------- */
    { kind:'read',
      head:{ ru:'Один или несколько', de:'Eins oder mehrere', en:'One, or more than one' },
      body:{
        ru:'Форма зависит от того, что стоит после: одна вещь — there is, несколько — there are. Именно этого в немецком es gibt нет.',
        de:'Die Form richtet sich nach dem, was folgt: eine Sache — there is, mehrere — there are. Genau das kennt das deutsche es gibt nicht.',
        en:'The form depends on what follows: one thing — there is, more than one — there are. This is the part German\u2019s es gibt does not have.' },
      table:[
        ['there is',  'one thing',        'There is a dog outside.'],
        ['there are', 'more than one',    'There are two dogs outside.'],
        ['there is',  'a mass, uncountable', 'There is milk in the fridge.']
      ],
      note:{
        ru:'Вещественные существительные — молоко, вода, хлеб — считаются как «одно»: there is milk.',
        de:'Stoffnamen — Milch, Wasser, Brot — gelten als „eins“: there is milk.',
        en:'Mass nouns — milk, water, bread — count as one: there is milk.' }
    },

    /* ---------- 3. is or are ---------- */
    { kind:'sort',
      ask:{ ru:'IS или ARE?', de:'IS oder ARE?', en:'IS or ARE?' },
      bins:[
        { id:'is',  label:'there is'  },
        { id:'are', label:'there are' }
      ],
      cards:[
        { text:'a dog outside',        bin:'is'  },
        { text:'a table in the kitchen', bin:'is' },
        { text:'milk in the fridge',   bin:'is'  },
        { text:'bread on the table',   bin:'is'  },
        { text:'two dogs outside',     bin:'are' },
        { text:'three chairs here',    bin:'are' },
        { text:'some shops nearby',    bin:'are' },
        { text:'children in the park', bin:'are' }
      ]
    },

    /* ---------- 4. in a sentence ---------- */
    { kind:'pick',
      ask:{ ru:'Выбери is или are', de:'Wähle is oder are', en:'Choose is or are' },
      rounds:[
        { de:'There ___ a bus at ten.', answer:'is', options:['is','are'],
          gloss:{ ru:'В десять есть автобус.', de:'Um zehn gibt es einen Bus.' } },
        { de:'There ___ two buses at ten.', answer:'are', options:['is','are'],
          gloss:{ ru:'В десять два автобуса.', de:'Um zehn gibt es zwei Busse.' } },
        { de:'There ___ milk in the fridge.', answer:'is', options:['is','are'],
          gloss:{ ru:'В холодильнике есть молоко.', de:'Im Kühlschrank ist Milch.' } },
        { de:'There ___ children in the park.', answer:'are', options:['is','are'],
          gloss:{ ru:'В парке дети.', de:'Im Park sind Kinder.' } },
        { de:'There ___ a bathroom on this floor.', answer:'is', options:['is','are'],
          gloss:{ ru:'На этом этаже есть туалет.', de:'Auf dieser Etage gibt es ein Bad.' } },
        { de:'There ___ three shops on this street.', answer:'are', options:['is','are'],
          gloss:{ ru:'На этой улице три магазина.', de:'In dieser Straße gibt es drei Geschäfte.' } }
      ]
    },

    /* ---------- 5. saying there is not ---------- */
    { kind:'read',
      head:{ ru:'Чтобы сказать, что чего-то нет', de:'Um zu sagen, dass es etwas nicht gibt', en:'To say there is not' },
      body:{
        ru:'Отрицание образует сам be: there isn\u2019t, there aren\u2019t. И почти всегда рядом стоит any — так говорят на самом деле.',
        de:'Die Verneinung bildet be selbst: there isn\u2019t, there aren\u2019t. Und fast immer steht any dabei — so sagt man es wirklich.',
        en:'The negative comes from be itself: there isn\u2019t, there aren\u2019t. And any almost always comes with it — that is how it is really said.' },
      show:[
        { de:'There <b>isn\u2019t any</b> milk.',
          gloss:{ ru:'Молока нет.', de:'Es gibt keine Milch.' } },
        { de:'There <b>aren\u2019t any</b> chairs.',
          gloss:{ ru:'Стульев нет.', de:'Es gibt keine Stühle.' } },
        { de:'There <b>isn\u2019t</b> a bus after ten.',
          gloss:{ ru:'После десяти автобуса нет.', de:'Nach zehn gibt es keinen Bus.' } },
        { de:'\u2717 There don\u2019t have any milk. \u00b7 \u2713 There isn\u2019t any milk.',
          gloss:{ ru:'Здесь никогда не бывает have или do.', de:'Hier gibt es niemals have oder do.' } }
      ]
    },

    /* ---------- 6. asking ---------- */
    { kind:'read',
      head:{ ru:'Вопрос', de:'Die Frage', en:'Asking' },
      body:{
        ru:'be переходит вперёд, как всегда: Is there…? Are there…? В вопросе тоже обычно стоит any.',
        de:'be geht nach vorn, wie immer: Is there…? Are there…? Auch in der Frage steht meist any.',
        en:'be moves to the front, as always: Is there…? Are there…? Questions usually take any too.' },
      show:[
        { de:'<b>Is there</b> a bathroom?',
          gloss:{ ru:'Здесь есть туалет?', de:'Gibt es hier ein Bad?' } },
        { de:'<b>Are there any</b> shops nearby?',
          gloss:{ ru:'Рядом есть магазины?', de:'Gibt es hier Geschäfte in der Nähe?' } },
        { de:'<b>Is there any</b> bread?',
          gloss:{ ru:'Хлеб есть?', de:'Gibt es Brot?' } }
      ],
      note:{
        ru:'Эти три вопроса стоит выучить целиком — они нужны в первый же день в новом городе.',
        de:'Diese drei Fragen sind es wert, ganz gelernt zu werden — man braucht sie am ersten Tag in einer neuen Stadt.',
        en:'These three are worth learning whole. You need them on your first day in a new city.' }
    },

    /* ---------- 7. negatives and questions ---------- */
    { kind:'pick',
      ask:{ ru:'Выбери правильную форму', de:'Wähle die richtige Form', en:'Choose the correct form' },
      rounds:[
        { de:'There ___ any milk. We need some.', answer:'isn\u2019t', options:['isn\u2019t','aren\u2019t'],
          gloss:{ ru:'Молока нет — надо купить.', de:'Es gibt keine Milch — wir brauchen welche.' } },
        { de:'There ___ any chairs in this room.', answer:'aren\u2019t', options:['isn\u2019t','aren\u2019t'],
          gloss:{ ru:'В этой комнате нет стульев.', de:'In diesem Raum gibt es keine Stühle.' } },
        { de:'___ there a bathroom on this floor?', answer:'Is', options:['Is','Are'],
          gloss:{ ru:'На этом этаже есть туалет?', de:'Gibt es auf dieser Etage ein Bad?' } },
        { de:'___ there any shops nearby?', answer:'Are', options:['Is','Are'],
          gloss:{ ru:'Рядом есть магазины?', de:'Gibt es in der Nähe Geschäfte?' } },
        { de:'There isn\u2019t ___ bread.', answer:'any', options:['any','some'],
          gloss:{ ru:'В отрицании — any.', de:'In der Verneinung steht any.' } },
        { de:'There are ___ shops on this street.', answer:'some', options:['any','some'],
          gloss:{ ru:'В утверждении — some.', de:'In der Aussage steht some.' } }
      ]
    },

    /* ---------- 8. the two traps ---------- */
    { kind:'read',
      head:{ ru:'Две ловушки', de:'Zwei Fallen', en:'Two traps' },
      body:{
        ru:'Первая — взять have, как будто «есть» это «иметь». Вторая — взять It is, потому что оно уже знакомо. Но It is a shop значит «это магазин», а не «магазин есть».',
        de:'Die erste: have nehmen, als hieße „es gibt“ „haben“. Die zweite: It is nehmen, weil es schon bekannt ist. Aber It is a shop heißt „das ist ein Geschäft“, nicht „es gibt ein Geschäft“.',
        en:'The first is reaching for have, as if there is meant to have. The second is reaching for It is, because it is already familiar — but It is a shop means that thing is a shop, not a shop exists.' },
      show:[
        { de:'\u2717 There have a shop. \u00b7 \u2713 There is a shop.',
          gloss:{ ru:'have здесь не бывает.', de:'have gibt es hier nicht.' } },
        { de:'\u2717 It is a shop nearby. \u00b7 \u2713 There is a shop nearby.',
          gloss:{ ru:'It is a shop — «это магазин». Другое значение.', de:'It is a shop heißt „das ist ein Geschäft“. Andere Bedeutung.' } },
        { de:'<b>It is</b> a shop. \u00b7 <b>There is</b> a shop.',
          gloss:{ ru:'Первое описывает вещь. Второе говорит, что она есть.', de:'Das erste beschreibt die Sache. Das zweite sagt, dass sie existiert.' } }
      ]
    },

    /* ---------- 9. no choices ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши пропущенное слово', de:'Schreib das fehlende Wort', en:'Type the missing word' },
      rounds:[
        { de:'There ___ a dog outside.', answer:'is',
          gloss:{ ru:'На улице собака.', de:'Draußen ist ein Hund.' } },
        { de:'There ___ two dogs outside.', answer:'are',
          gloss:{ ru:'На улице две собаки.', de:'Draußen sind zwei Hunde.' } },
        { de:'There ___ milk in the fridge.', answer:'is',
          gloss:{ ru:'В холодильнике молоко.', de:'Im Kühlschrank ist Milch.' } },
        { de:'___ there a bathroom?', answer:'Is',
          gloss:{ ru:'Здесь есть туалет?', de:'Gibt es hier ein Bad?' } },
        { de:'___ there any shops nearby?', answer:'Are',
          gloss:{ ru:'Рядом есть магазины?', de:'Gibt es hier Geschäfte?' } },
        { de:'There isn\u2019t ___ bread.', answer:'any',
          gloss:{ ru:'Хлеба нет.', de:'Es gibt kein Brot.' } },
        { de:'___ is a table in the kitchen.', answer:'There',
          gloss:{ ru:'На кухне стол.', de:'In der Küche steht ein Tisch.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'There is для одной вещи и для вещественных, there are для нескольких. Отрицание — there isn\u2019t / aren\u2019t, обычно с any. Вопрос — Is there…? / Are there…? И никогда не have и не It is: It is a shop — это «это магазин», а не «магазин есть».',
        de:'There is für eine Sache und für Stoffnamen, there are für mehrere. Verneinung: there isn\u2019t / aren\u2019t, meist mit any. Frage: Is there…? / Are there…? Und niemals have oder It is: It is a shop heißt „das ist ein Geschäft“, nicht „es gibt ein Geschäft“.',
        en:'There is for one thing and for mass nouns, there are for more than one. The negative is there isn\u2019t / aren\u2019t, usually with any. The question is Is there…? / Are there…? And never have, and never It is — It is a shop means that thing is a shop.' },
      show:[
        { de:'<b>There is</b> a dog outside. \u00b7 <b>There are</b> two dogs outside.' },
        { de:'<b>There isn\u2019t any</b> milk. \u00b7 <b>Are there any</b> shops nearby?' },
        { de:'<b>Is there</b> a bathroom?',
          gloss:{ ru:'Стоит выучить целиком.', de:'Lohnt sich, ganz zu lernen.' } }
      ]
    }

  ]
},

/* ==================================================================
   How a sentence works — subject · verb · object · adjective

   The foundational lesson, and the one the rest of the grammar
   reference can point back at. Its whole job is one distinction:

       noun / verb / adjective   =  what KIND of word it is
       subject / object          =  what JOB it does in the sentence

   A noun can be either. That is why "noun" and "subject" are not
   synonyms, and it is the single idea most likely to be muddled — so it
   gets a read step of its own, a reversal step, and the closing line.

   THE RECURRING ANCHOR, said three times in the lesson:
   A noun is a kind of word. Subject and object are jobs in a sentence.

   ------------------------------------------------------------------
   WHY IT IS SORT-HEAVY

   The obvious exercise — tap a word inside a rendered sentence — is a
   step kind the engine does not have, and adding one is a change to
   js/activities/lessons.js rather than a data drop. What the engine
   scores today maps onto this topic unusually well anyway:

       sort   the words of one sentence into role bins. This IS the
              exercise, and it needs no new code.
       pick   the sentence in the stem, the role named, the words as
              options: "the verb is ___" with sees / dog / small.

   Three bins is the ceiling, so subject/verb/object is one sort and
   noun/verb/adjective is another — which suits the lesson, because
   those are the two systems being kept apart.

   ------------------------------------------------------------------
   ENGLISH LEANS ON WORD ORDER, AND THAT IS THE CONTRAST

   Max sees Alina and Alina sees Max contain the same words and mean
   opposite things. Nothing on the nouns changes; only the order does.
   Russian marks the roles with case endings and can move the words
   freely, so a Russian speaker will not expect the order to be doing
   this much work. The German version of this lesson (data/curriculum.js,
   `de-parts`) goes further, because German marks the object with its
   article — see the note there.

   Deliberately left out: adverbs, prepositions, articles, conjunctions,
   indirect objects, predicates, clauses, complements. Five labels is
   the lesson.
   ================================================================== */
{
  id:'en-parts',
  glyph:'\uD83E\uDDE9',
  mins:9,
  target:'en',

  name:{
    ru:'Как устроено предложение',
    de:'Wie ein Satz funktioniert',
    en:'How a sentence works'
  },

  sub:{
    ru:'Подлежащее · глагол · дополнение · прилагательное',
    de:'Subjekt · Verb · Objekt · Adjektiv',
    en:'Subject · verb · object · adjective'
  },

  steps:[

    /* ---------- 1. the simplest frame ---------- */
    { kind:'read',
      head:{ ru:'Подлежащее и глагол', de:'Subjekt und Verb', en:'Subject and verb' },
      body:{
        ru:'Подлежащее — это тот, кто или то, о чём говорится в предложении. Глагол показывает, что происходит или что кто-то делает. Двух этих частей уже достаточно для целого предложения.',
        de:'Das Subjekt ist die Person oder Sache, um die es im Satz geht. Das Verb sagt, was passiert oder was jemand tut. Diese zwei Teile genügen schon für einen ganzen Satz.',
        en:'The subject is who or what the sentence is about. The verb tells what happens or what someone does. Those two parts are already a whole sentence.' },
      table:[
        ['The dog sleeps.',  'the dog',  'sleeps'],
        ['Tanya works.',     'Tanya',    'works'],
        ['The children ran.', 'the children', 'ran']
      ],
      note:{
        ru:'Подлежащее может быть одним словом или несколькими: «the dog» — это тоже одно подлежащее.',
        de:'Das Subjekt kann ein Wort oder mehrere sein: „the dog“ ist ein einziges Subjekt.',
        en:'A subject can be one word or several: "the dog" is a single subject.' }
    },

    /* ---------- 2. sort: subject or verb ---------- */
    { kind:'sort',
      ask:{ ru:'Подлежащее или глагол?', de:'Subjekt oder Verb?', en:'Subject or verb?' },
      bins:[
        { id:'subj', label:'subject' },
        { id:'verb', label:'verb'    }
      ],
      cards:[
        { text:'the dog',      bin:'subj' },
        { text:'sleeps',       bin:'verb' },
        { text:'Tanya',        bin:'subj' },
        { text:'works',        bin:'verb' },
        { text:'the children', bin:'subj' },
        { text:'ran',          bin:'verb' },
        { text:'Nazar',        bin:'subj' },
        { text:'sees',         bin:'verb' }
      ]
    },

    /* ---------- 3. the object ---------- */
    { kind:'read',
      head:{ ru:'Добавляем дополнение', de:'Ein Objekt hinzufügen', en:'Add an object' },
      body:{
        ru:'Некоторые действия направлены на другого человека или предмет. Этот человек или предмет — дополнение. Дополнение обозначает того, на кого или на что направлено действие.',
        de:'Manche Handlungen richten sich auf eine andere Person oder Sache. Diese Person oder Sache ist das Objekt. Das Objekt erhält die Handlung.',
        en:'Some actions affect another person or thing. That person or thing is the object. The object receives the action.' },
      table:[
        ['Nazar reads a book.',  'Nazar', 'reads · a book'],
        ['Mila opens the door.', 'Mila',  'opens · the door'],
        ['Max drinks coffee.',   'Max',   'drinks · coffee'],
        ['Alina buys a phone.',  'Alina', 'buys · a phone']
      ],
      note:{
        ru:'Не у каждого предложения есть дополнение. «The dog sleeps» — полное предложение без него.',
        de:'Nicht jeder Satz hat ein Objekt. „The dog sleeps“ ist ein vollständiger Satz ohne eines.',
        en:'Not every sentence has an object. "The dog sleeps" is a complete sentence without one.' }
    },

    /* ---------- 4. sort: all three jobs ---------- */
    { kind:'sort',
      ask:{ ru:'Какая роль в предложении?', de:'Welche Funktion im Satz?', en:'Which job in the sentence?' },
      bins:[
        { id:'subj', label:'subject' },
        { id:'verb', label:'verb'    },
        { id:'obj',  label:'object'  }
      ],
      cards:[
        { text:'Nazar',     bin:'subj' },
        { text:'reads',     bin:'verb' },
        { text:'a book',    bin:'obj'  },
        { text:'Mila',      bin:'subj' },
        { text:'opens',     bin:'verb' },
        { text:'the door',  bin:'obj'  },
        { text:'drinks',    bin:'verb' },
        { text:'coffee',    bin:'obj'  },
        { text:'Alina',     bin:'subj' }
      ]
    },

    /* ---------- 5. the key idea ---------- */
    { kind:'read',
      head:{ ru:'Часть речи — не роль в предложении', de:'Wortart ist nicht Satzfunktion', en:'A word type is not a sentence job' },
      body:{
        ru:'Существительное — это часть речи. Подлежащее и дополнение — это роли в предложении. Существительное может быть и подлежащим, и дополнением: это зависит от того, что оно делает в конкретном предложении.',
        de:'Ein Nomen ist eine Wortart. Subjekt und Objekt sind Funktionen im Satz. Ein Nomen kann Subjekt oder Objekt sein — je nachdem, was es in diesem Satz tut.',
        en:'A noun is a kind of word. Subject and object are jobs in a sentence. A noun can be the subject or the object, depending on what it is doing in that particular sentence.' },
      show:[
        { de:'Nazar reads a book.',
          gloss:{ ru:'Назар читает книгу.', de:'Nazar liest ein Buch.' } },
        { de:'<b>Nazar</b> = noun AND subject',
          gloss:{ ru:'существительное и подлежащее', de:'Nomen und Subjekt' } },
        { de:'<b>book</b> = noun AND object',
          gloss:{ ru:'существительное и дополнение', de:'Nomen und Objekt' } },
        { de:'<b>reads</b> = verb',
          gloss:{ ru:'глагол', de:'Verb' } }
      ],
      note:{
        ru:'Это самая важная мысль всего урока. Слово имеет часть речи всегда, а роль — только внутри конкретного предложения.',
        de:'Das ist der wichtigste Gedanke der ganzen Lektion. Eine Wortart hat ein Wort immer, eine Funktion nur in einem bestimmten Satz.',
        en:'This is the most important idea in the lesson. A word always has a type; it only has a job inside a particular sentence.' }
    },

    /* ---------- 6. the same noun, both jobs ---------- */
    { kind:'read',
      head:{ ru:'Одно существительное — разные роли', de:'Dasselbe Nomen, andere Funktion', en:'The same noun can change jobs' },
      body:{
        ru:'Посмотри, кто выполняет действие — это подлежащее. Затем посмотри, на кого направлено действие — это дополнение. В английском роль определяется порядком слов: сами слова не меняются.',
        de:'Achte darauf, wer die Handlung ausführt — das ist das Subjekt. Dann darauf, auf wen sich die Handlung richtet — das ist das Objekt. Im Englischen entscheidet die Wortstellung: die Wörter selbst ändern sich nicht.',
        en:'Look at who does the action — that is the subject. Then at who receives it — that is the object. In English the word order decides: the words themselves do not change.' },
      show:[
        { de:'<b>Max</b> sees <b>Alina</b>. \u2192 Max subject, Alina object',
          gloss:{ ru:'Макс видит Алину.', de:'Max sieht Alina.' } },
        { de:'<b>Alina</b> sees <b>Max</b>. \u2192 Alina subject, Max object',
          gloss:{ ru:'Алина видит Макса.', de:'Alina sieht Max.' } },
        { de:'Same two words. Opposite meaning.',
          gloss:{ ru:'По-русски здесь помогли бы падежи: Макса, Алину. В английском их нет — работает только порядок.', de:'Im Russischen zeigen die Fälle es an: Макса, Алину. Englisch hat sie nicht — nur die Stellung.' } }
      ]
    },

    /* ---------- 7. who is doing it ---------- */
    { kind:'pick',
      ask:{ ru:'Кто выполняет действие?', de:'Wer führt die Handlung aus?', en:'Who is doing the action?' },
      rounds:[
        { de:'Max sees Alina. \u2014 the subject is ___', answer:'Max', options:['Max','Alina'],
          gloss:{ ru:'Макс видит Алину.', de:'Max sieht Alina.' } },
        { de:'Alina sees Max. \u2014 the subject is ___', answer:'Alina', options:['Max','Alina'],
          gloss:{ ru:'Алина видит Макса.', de:'Alina sieht Max.' } },
        { de:'Max sees Alina. \u2014 the object is ___', answer:'Alina', options:['Max','Alina'],
          gloss:{ ru:'Действие направлено на Алину.', de:'Die Handlung richtet sich auf Alina.' } },
        { de:'Mila calls Nazar. \u2014 the object is ___', answer:'Nazar', options:['Mila','Nazar'],
          gloss:{ ru:'Мила звонит Назару.', de:'Mila ruft Nazar an.' } },
        { de:'The cat sees the dog. \u2014 the subject is ___', answer:'the cat', options:['the cat','the dog'],
          gloss:{ ru:'Кошка видит собаку.', de:'Die Katze sieht den Hund.' } },
        { de:'The dog sees the cat. \u2014 the subject is ___', answer:'the dog', options:['the cat','the dog'],
          gloss:{ ru:'Собака видит кошку.', de:'Der Hund sieht die Katze.' } }
      ]
    },

    /* ---------- 8. adjectives ---------- */
    { kind:'read',
      head:{ ru:'Прилагательные', de:'Adjektive', en:'Adjectives' },
      body:{
        ru:'Прилагательное описывает существительное. Оно даёт больше информации о человеке, месте, предмете или понятии. В английском прилагательное почти всегда стоит перед существительным и никогда не меняет форму.',
        de:'Ein Adjektiv beschreibt ein Nomen. Es sagt mehr über eine Person, einen Ort, eine Sache oder eine Idee. Im Englischen steht es fast immer vor dem Nomen und ändert nie seine Form.',
        en:'An adjective describes a noun. It tells us more about a person, place, thing or idea. In English it almost always comes before the noun, and it never changes form.' },
      show:[
        { de:'The <b>happy</b> dog sleeps.',
          gloss:{ ru:'happy описывает dog.', de:'happy beschreibt dog.' } },
        { de:'Tanya buys a <b>new</b> phone.',
          gloss:{ ru:'new описывает phone.', de:'new beschreibt phone.' } },
        { de:'The <b>small</b> dog sees Mila.',
          gloss:{ ru:'small описывает dog.', de:'small beschreibt dog.' } }
      ],
      note:{
        ru:'В русском и немецком прилагательное согласуется с существительным и меняет окончание. В английском — никогда: a new phone, new phones, the new phone.',
        de:'Im Russischen und Deutschen passt sich das Adjektiv an und ändert die Endung. Im Englischen nie: a new phone, new phones, the new phone.',
        en:'Russian and German change the adjective ending to agree with the noun. English never does: a new phone, new phones, the new phone.' }
    },

    /* ---------- 9. sort: word types ---------- */
    { kind:'sort',
      ask:{ ru:'Какая это часть речи?', de:'Welche Wortart ist das?', en:'Which kind of word is it?' },
      bins:[
        { id:'noun', label:'noun'      },
        { id:'verb', label:'verb'      },
        { id:'adj',  label:'adjective' }
      ],
      cards:[
        { text:'phone',  bin:'noun' },
        { text:'buys',   bin:'verb' },
        { text:'new',    bin:'adj'  },
        { text:'dog',    bin:'noun' },
        { text:'sleeps', bin:'verb' },
        { text:'happy',  bin:'adj'  },
        { text:'bag',    bin:'noun' },
        { text:'carries', bin:'verb' },
        { text:'heavy',  bin:'adj'  }
      ]
    },

    /* ---------- 10. the whole pattern ---------- */
    { kind:'read',
      head:{ ru:'Собираем всё вместе', de:'Alles zusammensetzen', en:'Put the parts together' },
      body:{
        ru:'У слова есть часть речи, и одновременно оно может выполнять роль в предложении. Одно и то же слово можно описать двумя способами сразу.',
        de:'Ein Wort hat eine Wortart und kann gleichzeitig eine Funktion im Satz haben. Dasselbe Wort lässt sich auf zwei Weisen beschreiben.',
        en:'A word has a type, and at the same time it can have a job in the sentence. The same word can be described both ways at once.' },
      table:[
        ['Tanya',       'noun',      'subject'],
        ['buys',        'verb',      '\u2014'],
        ['a new phone', '\u2014',    'object'],
        ['phone',       'noun',      'part of the object'],
        ['new',         'adjective', '\u2014']
      ],
      show:[
        { de:'Tanya buys a new phone.',
          gloss:{ ru:'Таня покупает новый телефон.', de:'Tanya kauft ein neues Handy.' } }
      ]
    },

    /* ---------- 11. one part at a time ---------- */
    { kind:'pick',
      ask:{ ru:'Найди каждую часть', de:'Finde jeden Satzteil', en:'Find each part' },
      rounds:[
        { de:'The small dog sees Mila. \u2014 the verb is ___', answer:'sees', options:['sees','dog','small'],
          gloss:{ ru:'Маленькая собака видит Милу.', de:'Der kleine Hund sieht Mila.' } },
        { de:'The small dog sees Mila. \u2014 the subject is ___', answer:'the small dog', options:['the small dog','Mila','sees'],
          gloss:{ ru:'Подлежащее — вся группа: the small dog.', de:'Das Subjekt ist die ganze Gruppe: the small dog.' } },
        { de:'The small dog sees Mila. \u2014 the object is ___', answer:'Mila', options:['Mila','the small dog','small'],
          gloss:{ ru:'Действие направлено на Милу.', de:'Die Handlung richtet sich auf Mila.' } },
        { de:'The small dog sees Mila. \u2014 the adjective is ___', answer:'small', options:['small','dog','sees'],
          gloss:{ ru:'small описывает dog.', de:'small beschreibt dog.' } },
        { de:'Mila carries a heavy bag. \u2014 the adjective is ___', answer:'heavy', options:['heavy','bag','carries'],
          gloss:{ ru:'Мила несёт тяжёлую сумку.', de:'Mila trägt eine schwere Tasche.' } },
        { de:'Mila carries a heavy bag. \u2014 the verb is ___', answer:'carries', options:['carries','bag','Mila'],
          gloss:{ ru:'Глагол — carries.', de:'Das Verb ist carries.' } },
        { de:'The red car stops. \u2014 the subject is ___', answer:'the red car', options:['the red car','stops','red'],
          gloss:{ ru:'Красная машина останавливается. Дополнения здесь нет.', de:'Das rote Auto hält an. Hier gibt es kein Objekt.' } },
        { de:'Nazar opens the window. \u2014 the object is ___', answer:'the window', options:['the window','Nazar','opens'],
          gloss:{ ru:'Назар открывает окно.', de:'Nazar öffnet das Fenster.' } }
      ]
    },

    /* ---------- 12. no hints ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Определи часть без подсказок', de:'Bestimme den Satzteil ohne Hinweise', en:'Name the part, no hints' },
      rounds:[
        { de:'Mila carries a heavy bag. \u2014 the verb is ___', answer:'carries',
          gloss:{ ru:'Мила несёт тяжёлую сумку.', de:'Mila trägt eine schwere Tasche.' } },
        { de:'Mila carries a heavy bag. \u2014 the adjective is ___', answer:'heavy',
          gloss:{ ru:'heavy описывает bag.', de:'heavy beschreibt bag.' } },
        { de:'The red car stops. \u2014 the adjective is ___', answer:'red',
          gloss:{ ru:'red описывает car.', de:'red beschreibt car.' } },
        { de:'The red car stops. \u2014 the verb is ___', answer:'stops',
          gloss:{ ru:'Красная машина останавливается.', de:'Das rote Auto hält an.' } },
        { de:'Nazar opens the window. \u2014 the verb is ___', answer:'opens',
          gloss:{ ru:'Назар открывает окно.', de:'Nazar öffnet das Fenster.' } },
        { de:'Nazar opens the window. \u2014 the subject is ___', answer:'Nazar',
          gloss:{ ru:'Подлежащее — Назар.', de:'Das Subjekt ist Nazar.' } },
        { de:'Tanya buys a new phone. \u2014 the adjective is ___', answer:'new',
          gloss:{ ru:'new описывает phone.', de:'new beschreibt phone.' } },
        { de:'The happy dog sleeps. \u2014 the adjective is ___', answer:'happy',
          gloss:{ ru:'happy описывает dog.', de:'happy beschreibt dog.' } }
      ]
    },

    /* ---------- finish, on the anchor ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Существительное — это часть речи. Подлежащее и дополнение — это роли в предложении. Подлежащее выполняет действие, дополнение его получает, глагол — само действие, а прилагательное описывает существительное. В английском роли определяет порядок слов.',
        de:'Ein Nomen ist eine Wortart. Subjekt und Objekt sind Funktionen im Satz. Das Subjekt handelt, das Objekt erhält die Handlung, das Verb ist die Handlung, und das Adjektiv beschreibt ein Nomen. Im Englischen entscheidet die Wortstellung über die Funktionen.',
        en:'A noun is a kind of word. Subject and object are jobs in a sentence. The subject does the action, the object receives it, the verb is the action, and the adjective describes a noun. In English, word order decides the jobs.' },
      show:[
        { de:'Tanya buys a new phone.',
          gloss:{ ru:'Таня — подлежащее, buys — глагол, a new phone — дополнение, new — прилагательное.', de:'Tanya Subjekt, buys Verb, a new phone Objekt, new Adjektiv.' } },
        { de:'Max sees Alina. \u00b7 Alina sees Max.',
          gloss:{ ru:'Те же слова, обратный смысл — решает порядок.', de:'Dieselben Wörter, umgekehrter Sinn — die Stellung entscheidet.' } }
      ]
    }

  ]
},

/* ==================================================================
   Lists — commas, and/or, and the comma that carries the count

   Grok's teaching text and 28 drill items, 09 Sep. Steven's two calls
   are built in, and one of them changes the lesson's spine.

   THE SERIAL COMMA IS NOT OPTIONAL HERE. Grok's pack, and most style
   guides, teach it as "optional but recommended". Steven, 09 Sep:
   "I like several kinds of sandwich: turkey, pastrami, ham and cheese.
   You will NEVER convince me this comma should be optional." He is
   right, and it is the better lesson: without the comma, `ham and
   cheese` is one sandwich and the list has three items; with it, four.
   The comma is the only thing carrying the count.

   So this lesson teaches ALWAYS USE IT, and the drill asks the question
   that has one answer — HOW MANY THINGS — rather than "which sentence is
   correct", which the optional framing had made unanswerable because
   both are.

   And the course now matches: three lines in en-be and en-future were
   missing the comma and were fixed the same day. Measured after: zero
   three-item lists in any English file without it.

   NOTHING IS WITHHELD, IT IS LABELLED AND ORDERED. The colon and
   semicolon and the correlative connectors are B1 material in an A2
   course. They are at the END, carrying `level:'harder'`, not removed.
   Steven: "Nothing should be withheld just labeled — let learners pick
   how they want to learn."

   RESHAPES the engine forced: "which sentence is correct? A / B" has no
   gap, so it is written `de:'___'` with whole sentences as the options,
   which also makes the speak button read the correct one aloud. And the
   two "type the correctly punctuated sentence" items were 40-character
   exact-match answers on a phone — converted to picks.
   ================================================================== */
{
  id:'en-lists',
  glyph:'\uD83D\uDCCE',
  mins:9,
  target:'en',

  name:{
    ru:'Перечисления',
    de:'Aufzählungen',
    en:'Lists'
  },

  sub:{
    ru:'запятые · and · or',
    de:'Kommas · and · or',
    en:'commas · and · or'
  },

  steps:[

    /* ---------- 1. the rules ---------- */
    { kind:'read',
      head:{ ru:'Основные правила', de:'Grundregeln', en:'The rules' },
      body:{
        ru:'В английском элементы перечисления разделяются запятыми, а последние два соединяются словами and («и») или or («или»). И перед последним and или or запятая ставится тоже.',
        de:'Im Englischen trennt man Elemente einer Aufzählung durch Kommas, und die letzten beiden werden mit and oder or verbunden. Vor dem letzten and oder or steht ebenfalls ein Komma.',
        en:'English separates list items with commas, and the last two are joined with and or or. There is a comma before that final and or or as well.' },
      table:[
        ['A, B, C, and D', 'all of them',            'I bought bread, cheese, milk, and apples.'],
        ['A, B, C, or D',  'one of them',            'We can go today, tomorrow, or Friday.'],
        ['A and B',        'only two, no comma',     'I bought bread and cheese.']
      ],
      note:{
        ru:'В немецком правило обратное: там перед und запятой нет. Это одно из немногих мест, где две системы прямо расходятся.',
        de:'Im Deutschen ist die Regel umgekehrt: dort steht kein Komma vor und. Das ist eine der wenigen Stellen, an denen die beiden Systeme direkt auseinandergehen.',
        en:'German has the opposite rule — no comma before und. This is one of the few places where the two systems disagree outright.' }
    },

    /* ---------- 2. why the comma is not optional ---------- */
    { kind:'read',
      head:{ ru:'Эта запятая считает', de:'Dieses Komma zählt', en:'That comma does the counting' },
      body:{
        ru:'Многие справочники называют эту запятую необязательной. Но она несёт количество: без неё два последних слова могут склеиться в один элемент. Поэтому здесь мы ставим её всегда.',
        de:'Viele Stilbücher nennen dieses Komma optional. Es trägt aber die Anzahl: ohne es können die letzten zwei Wörter zu einem einzigen Element verschmelzen. Deshalb setzen wir es hier immer.',
        en:'Plenty of style guides call this comma optional. But it carries the count: without it, the last two words can fuse into a single item. So here, always use it.' },
      show:[
        { de:'turkey, pastrami, ham and cheese \u2192 <b>three</b> sandwiches',
          gloss:{ ru:'«Ветчина с сыром» — один сэндвич.', de:'„Schinken mit Käse“ ist ein Sandwich.' } },
        { de:'turkey, pastrami, ham, and cheese \u2192 <b>four</b> things',
          gloss:{ ru:'Запятая разделила ветчину и сыр.', de:'Das Komma trennt Schinken und Käse.' } },
        { de:'I invited the twins, Max, and Mila.',
          gloss:{ ru:'Без запятой Макс и Мила выглядели бы как имена близнецов.', de:'Ohne Komma sähen Max und Mila wie die Namen der Zwillinge aus.' } }
      ],
      note:{
        ru:'Проверка простая: если два последних слова могут оказаться одним предметом, запятая обязательна. А если сомневаешься — ставь.',
        de:'Der Test ist einfach: wenn die letzten zwei Wörter eine einzige Sache sein könnten, ist das Komma nötig. Und im Zweifel: setzen.',
        en:'The test is simple: if the last two words could be one thing, the comma is doing work. And when in doubt, use it.' }
    },

    /* ---------- 3. what is being listed ---------- */
    { kind:'sort',
      ask:{ ru:'Что перечисляется?', de:'Was wird aufgezählt?', en:'What is being listed?' },
      bins:[
        { id:'t', label:'things'  },
        { id:'a', label:'actions' },
        { id:'p', label:'people'  }
      ],
      cards:[
        { text:'bread, milk, and cheese',              bin:'t' },
        { text:'tomatoes, onions, and bread',           bin:'t' },
        { text:'a notebook, a pencil, and a ruler',     bin:'t' },
        { text:'reading, writing, and drawing',         bin:'a' },
        { text:'running, swimming, and dancing',        bin:'a' },
        { text:'eating, sleeping, and relaxing',        bin:'a' },
        { text:'Tanya, Nazar, and Anna',                bin:'p' },
        { text:'Alina, Max, and Mila',                  bin:'p' },
        { text:'my mother, my father, and my brother',  bin:'p' }
      ]
    },

    /* ---------- 4. how many things ---------- */
    { kind:'pick',
      ask:{ ru:'Сколько элементов названо?', de:'Wie viele Dinge werden genannt?', en:'How many things are named?' },
      rounds:[
        { de:'Several kinds of sandwich: turkey, pastrami, ham and cheese. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Ветчина с сыром — один сэндвич.', de:'Schinken mit Käse ist eines.' } },
        { de:'Three bagels: cream cheese, salmon, and bacon and egg. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Бекон с яйцом — один бейгл.', de:'Speck mit Ei ist einer.' } },
        { de:'The menu has chicken, tuna, and macaroni and cheese. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Макароны с сыром — одно блюдо.', de:'Makkaroni mit Käse ist ein Gericht.' } },
        { de:'Breakfast is eggs, pancakes, and bread and butter. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Хлеб с маслом — одно.', de:'Brot mit Butter ist eines.' } },
        { de:'I bought apples, bananas, salt, and pepper. \u2014 ___', answer:'four', options:['three','four'],
          gloss:{ ru:'Запятая разделила соль и перец.', de:'Das Komma trennt Salz und Pfeffer.' } },
        { de:'I bought apples, bananas, salt and pepper. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Без запятой соль с перцем — одно.', de:'Ohne Komma sind Salz und Pfeffer eines.' } },
        { de:'We served soup, salad, and mac and cheese. \u2014 ___', answer:'three', options:['three','four'],
          gloss:{ ru:'Запятая показала, что mac and cheese — одно блюдо.', de:'Das Komma zeigt, dass mac and cheese ein Gericht ist.' } },
        { de:'I invited my teachers, Alina, and Max. \u2014 ___', answer:'four or more', options:['two','four or more'],
          gloss:{ ru:'Запятая делает Алину и Макса отдельными людьми.', de:'Das Komma macht Alina und Max zu weiteren Personen.' } }
      ],
      note:{
        ru:'Одно и то же предложение меняет смысл от одной запятой. Именно поэтому мы ставим её всегда.',
        de:'Ein einziges Komma ändert die Bedeutung desselben Satzes. Genau deshalb setzen wir es immer.',
        en:'One comma changes what the same sentence means. That is exactly why we always use it.' }
    },

    /* ---------- 5. and or or ---------- */
    { kind:'pick',
      ask:{ ru:'and или or?', de:'and oder or?', en:'and or or?' },
      rounds:[
        { de:'I bought apples, bananas, ___ oranges. All three.', answer:'and', options:['and','or'],
          gloss:{ ru:'Я купила яблоки, бананы и апельсины.', ruM:'Я купил яблоки, бананы и апельсины.', de:'Ich habe Äpfel, Bananen und Orangen gekauft.' } },
        { de:'Would you like tea, coffee, ___ water? Choose one.', answer:'or', options:['and','or'],
          gloss:{ ru:'Ты хочешь чай, кофе или воду?', de:'Möchtest du Tee, Kaffee oder Wasser?' } },
        { de:'Tanya speaks Russian, Ukrainian, ___ German. All three.', answer:'and', options:['and','or'],
          gloss:{ ru:'Таня говорит по-русски, по-украински и по-немецки.', de:'Tanya spricht Russisch, Ukrainisch und Deutsch.' } },
        { de:'We can leave today, tomorrow, ___ Friday. One day.', answer:'or', options:['and','or'],
          gloss:{ ru:'Мы можем уехать сегодня, завтра или в пятницу.', de:'Wir können heute, morgen oder am Freitag fahren.' } },
        { de:'We need tomatoes, onions, meat, ___ cheese. All of them.', answer:'and', options:['and','or'],
          gloss:{ ru:'Нам нужны помидоры, лук, мясо и сыр.', de:'Wir brauchen Tomaten, Zwiebeln, Fleisch und Käse.' } },
        { de:'You can pay with cash, a card, ___ your phone. One is enough.', answer:'or', options:['and','or'],
          gloss:{ ru:'Можно заплатить наличными, картой или телефоном.', de:'Du kannst bar, mit Karte oder mit dem Handy bezahlen.' } }
      ]
    },

    /* ---------- 6. parallel form ---------- */
    { kind:'read',
      head:{ ru:'Одинаковая форма', de:'Dieselbe Form', en:'The same form' },
      body:{
        ru:'Все элементы перечисления должны быть в одной грамматической форме. Начала с -ing — продолжай с -ing. Начала с инфинитива — продолжай с инфинитивом.',
        de:'Alle Elemente einer Aufzählung sollten dieselbe grammatische Form haben. Mit -ing angefangen — mit -ing weiter. Mit Infinitiv angefangen — mit Infinitiv weiter.',
        en:'Every item in a list should be in the same grammatical form. Start with -ing, stay with -ing. Start with an infinitive, stay with an infinitive.' },
      show:[
        { de:'\u2713 I like reading, swimming, and <b>cooking</b>.',
          gloss:{ ru:'Три формы на -ing.', de:'Drei -ing-Formen.' } },
        { de:'\u2717 I like reading, <b>to swim</b>, and cooking.',
          gloss:{ ru:'Средний элемент выпал из строя.', de:'Das mittlere Element passt nicht.' } },
        { de:'\u2713 She wants to eat, sleep, and <b>relax</b>.',
          gloss:{ ru:'После to достаточно одного to.', de:'Nach to genügt ein einziges to.' } }
      ]
    },

    /* ---------- 7. keep the form ---------- */
    { kind:'pick',
      ask:{ ru:'Сохрани форму', de:'Behalte die Form', en:'Keep the form' },
      rounds:[
        { de:'I like reading, swimming, and ___.', answer:'cooking', options:['cooking','to cook','I cook'],
          gloss:{ ru:'Я люблю читать, плавать и готовить.', de:'Ich lese, schwimme und koche gern.' } },
        { de:'She wants to eat, sleep, and ___.', answer:'relax', options:['relax','relaxing','relaxed'],
          gloss:{ ru:'Она хочет поесть, поспать и отдохнуть.', de:'Sie möchte essen, schlafen und sich entspannen.' } },
        { de:'Nazar can read, write, and ___.', answer:'speak', options:['speak','speaking','to speak'],
          gloss:{ ru:'Назар умеет читать, писать и говорить.', de:'Nazar kann lesen, schreiben und sprechen.' } },
        { de:'___', answer:'She likes singing, dancing, and drawing.',
          options:['She likes singing, dancing, and drawing.','She likes singing, to dance, and drawing.','She likes singing, dancing, and she draws.'],
          gloss:{ ru:'Только в первом все три формы совпадают.', de:'Nur im ersten passen alle drei Formen zusammen.' } }
      ]
    },

    /* ---------- 8. the commas themselves ---------- */
    { kind:'pick',
      ask:{ ru:'Какой вариант правильный?', de:'Welche Variante ist richtig?', en:'Which one is right?' },
      rounds:[
        { de:'___', answer:'I bought bread, cheese, milk, and eggs.',
          options:['I bought bread, cheese, milk, and eggs.','I bought bread cheese milk, and eggs.'],
          gloss:{ ru:'Я купила хлеб, сыр, молоко и яйца.', ruM:'Я купил хлеб, сыр, молоко и яйца.', de:'Ich habe Brot, Käse, Milch und Eier gekauft.' } },
        { de:'___', answer:'We visited London, Paris, Rome, and Berlin.',
          options:['We visited London, Paris, Rome, and Berlin.','We visited London Paris Rome, and Berlin.'],
          gloss:{ ru:'Мы посетили Лондон, Париж, Рим и Берлин.', de:'Wir haben London, Paris, Rom und Berlin besucht.' } },
        { de:'___', answer:'I need tomatoes, onions, cheese, and bread.',
          options:['I need tomatoes, onions, cheese, and bread.','I need tomatoes onions cheese and bread.'],
          gloss:{ ru:'Мне нужны помидоры, лук, сыр и хлеб.', de:'Ich brauche Tomaten, Zwiebeln, Käse und Brot.' } },
        { de:'___', answer:'She reads, writes, paints, and sings.',
          options:['She reads, writes, paints, and sings.','She reads writes paints and sings.'],
          gloss:{ ru:'Она читает, пишет, рисует и поёт.', de:'Sie liest, schreibt, malt und singt.' } }
      ]
    },

    /* ---------- 9. colon and semicolon, harder ---------- */
    { kind:'read',
      level:'harder',
      head:{ ru:'Двоеточие и точка с запятой', de:'Doppelpunkt und Semikolon', en:'Colon and semicolon' },
      body:{
        ru:'Двоеточие открывает перечисление, если до него уже стоит законченное предложение. Точка с запятой нужна, когда внутри самих элементов уже есть запятые.',
        de:'Ein Doppelpunkt öffnet eine Aufzählung, wenn davor schon ein vollständiger Satz steht. Ein Semikolon braucht man, wenn die Elemente selbst schon Kommas enthalten.',
        en:'A colon opens a list when what comes before it is already a complete sentence. A semicolon is for when the items themselves already contain commas.' },
      show:[
        { de:'I need three things: bread, cheese, and milk.',
          gloss:{ ru:'До двоеточия — законченное предложение.', de:'Vor dem Doppelpunkt steht ein vollständiger Satz.' } },
        { de:'We visited Paris, France; Rome, Italy; and Berlin, Germany.',
          gloss:{ ru:'В каждом элементе уже есть запятая — поэтому точка с запятой.', de:'Jedes Element hat schon ein Komma — daher das Semikolon.' } }
      ]
    },

    /* ---------- 10. the other connectors, harder ---------- */
    { kind:'read',
      level:'harder',
      head:{ ru:'Другие связки', de:'Weitere Verbindungswörter', en:'The other connectors' },
      body:{
        ru:'Кроме and и or есть ещё несколько. Они звучат более формально, но встречаются часто — и почти у каждой есть точный немецкий аналог.',
        de:'Außer and und or gibt es noch einige. Sie klingen formeller, kommen aber häufig vor — und fast jede hat eine genaue deutsche Entsprechung.',
        en:'Besides and and or there are a few more. They sound more formal but turn up often, and nearly every one has an exact German counterpart.' },
      table:[
        ['as well as',            'а также · sowie',              'shirts, trousers, as well as two sweaters'],
        ['both … and',            'как … так и · sowohl … als auch', 'both German and English'],
        ['either … or',           'либо … либо · entweder … oder', 'either the bus or the train'],
        ['neither … nor',         'ни … ни · weder … noch',        'neither coffee nor tea'],
        ['not only … but also',   'не только … но и · nicht nur … sondern auch', 'not only talented but also hard-working']
      ],
      note:{
        ru:'neither … nor уже содержит отрицание — второго not не нужно.',
        de:'neither … nor enthält die Verneinung schon — ein zweites not braucht es nicht.',
        en:'neither … nor already carries the negative — it needs no second not.' }
    },

    /* ---------- 11. no choices ---------- */
    { kind:'type',
      exact:true,
      ask:{ ru:'Впиши пропущенное слово', de:'Schreib das fehlende Wort', en:'Type the missing word' },
      rounds:[
        { de:'I bought apples, bananas, ___ oranges. All three.', answer:'and',
          gloss:{ ru:'Всё вместе.', de:'Alles davon.' } },
        { de:'Would you like tea, coffee, ___ water? Choose one.', answer:'or',
          gloss:{ ru:'Выбрать одно.', de:'Eines auswählen.' } },
        { de:'Tanya speaks Russian, Ukrainian, ___ German.', answer:'and',
          gloss:{ ru:'Все три языка.', de:'Alle drei Sprachen.' } },
        { de:'I like reading, swimming, and ___.', answer:'cooking',
          gloss:{ ru:'Форма та же.', de:'Dieselbe Form.' } },
        { de:'She wants to eat, sleep, and ___.', answer:'relax',
          gloss:{ ru:'Форма та же.', de:'Dieselbe Form.' } },
        { de:'He drinks neither coffee ___ tea.', answer:'nor',
          gloss:{ ru:'neither … nor.', de:'neither … nor.' } },
        { de:'She speaks both German ___ English.', answer:'and',
          gloss:{ ru:'both … and.', de:'both … and.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Запятые между элементами, and или or перед последним — и запятая перед ним тоже. Эта запятая несёт количество: без неё два последних слова могут склеиться в одно. Все элементы — в одной грамматической форме. В немецком правило про запятую обратное.',
        de:'Kommas zwischen den Elementen, and oder or vor dem letzten — und davor ebenfalls ein Komma. Dieses Komma trägt die Anzahl: ohne es können die letzten zwei Wörter zu einem verschmelzen. Alle Elemente in derselben grammatischen Form. Im Deutschen ist die Kommaregel umgekehrt.',
        en:'Commas between the items, and or or before the last one — and a comma before that too. This comma carries the count: without it the last two words can fuse into one. Every item in the same grammatical form. In German the comma rule is the other way round.' },
      show:[
        { de:'I bought bread, cheese, milk<b>,</b> and apples.' },
        { de:'turkey, pastrami, ham<b>,</b> and cheese \u2192 four, not three.' },
        { de:'I like reading, swimming, and <b>cooking</b>.' },
        { de:'German: Brot, Käse, Milch <b>und</b> Äpfel \u2014 no comma.',
          gloss:{ ru:'Одно из немногих прямых расхождений.', de:'Eine der wenigen direkten Abweichungen.' } }
      ]
    }

  ]
},

/* ==================================================================
   Subject · Verb · Object — she taps the sentence

   The first lesson built on the `mark` step kind, added 09 Sep for
   exactly this. Steven: "I want you literally clicking on the sentence
   for each part. Scaffold with color. Then without color."

   Strictly S, V, O. No adjectives, no adverbs — those are a later colour
   layer, and Grok's pack says so explicitly. Blue subject, orange verb,
   green object, permanently.

   ONE `mark` STEP DRILLS ALL THREE ROLES. `ask` is generic — "tap the
   part I name" — and each round sets its own `find`. So six separate
   pick exercises collapse into one step of six rounds, and she cannot
   settle into "this step is about subjects", which was the flaw in the
   multiple-choice draft.

   THE THREE LEVELS ARE ONE FLAG APART. `colour:true` scaffolds: the
   boxes arrive already lit and she matches a colour to a name.
   `colour:false` removes it. Same data shape, so level 1 and level 2
   share their sentences instead of duplicating them.

   THE LAST THIRD IS WHERE THE COLOURS EARN THEIR KEEP, and it is GPT's
   addition: role is not position. The dog sees the cat against The cat
   sees the dog — same words, roles swapped, meaning swapped. Without
   that, the lesson is colouring-in; with it, the colours mean something.

   AND SOME WORDS ARE NEITHER. `from the store` has no role, renders
   plainly and is not tappable — which quietly teaches that a sentence
   holds more than three parts. The engine supports it, so the lesson
   uses it.
   ================================================================== */
{
  id:'en-svo',
  glyph:'\uD83D\uDD35',
  mins:8,
  target:'en',

  name:{
    ru:'Подлежащее, глагол, дополнение',
    de:'Subjekt, Verb, Objekt',
    en:'Subject, verb, object'
  },

  sub:{
    ru:'Нажми на часть предложения',
    de:'Tippe auf den Satzteil',
    en:'Tap the part of the sentence'
  },

  steps:[

    /* ---------- 1. the three roles ---------- */
    { kind:'read',
      head:{ ru:'Три части', de:'Drei Teile', en:'Three parts' },
      body:{
        ru:'В простом предложении часто есть три важные части. Подлежащее — кто или что выполняет действие. Глагол — само действие. Дополнение — на кого или на что действие направлено.',
        de:'Ein einfacher Satz hat oft drei wichtige Teile. Das Subjekt — wer oder was die Handlung ausführt. Das Verb — die Handlung selbst. Das Objekt — wen oder was die Handlung betrifft.',
        en:'A simple sentence often has three important parts. The subject — who or what does the action. The verb — the action itself. The object — who or what receives the action.' },
      table:[
        ['subject', 'blue',   'who or what does the action'],
        ['verb',    'orange', 'the action'],
        ['object',  'green',  'who or what receives it']
      ],
      show:[
        { de:'The dog sees the cat.',
          gloss:{ ru:'Собака видит кошку.', de:'Der Hund sieht die Katze.' } }
      ],
      note:{
        ru:'Артикль остаётся со своим существительным: the dog — это одна часть, не две.',
        de:'Der Artikel bleibt bei seinem Nomen: the dog ist ein Teil, nicht zwei.',
        en:'The article stays with its noun: the dog is one part, not two.' }
    },

    /* ---------- 2. scaffolded: coloured, and the asked part glows ----------
       SIX SENTENCES BECAME TWO, ASKED THREE WAYS EACH. Steven, 09 Sep:
       "if you are doing each part for each sentence then at least vary
       the order — don't ALWAYS go Sub, Verb, Obj. There's 6 orderings,
       use all 6."
       Which also fixed something I had not noticed: I was asking ONE
       part per sentence, so there was no order to vary and she never saw
       a whole sentence taken apart. Now each sentence is asked for all
       three roles, and each of the four mark steps uses two of the six
       orderings, so the sequence is never predictable.
       Step 2 uses S-V-O and V-O-S. */
    { kind:'mark',
      colour:true,
      ask:{ ru:'Нажми на названную часть', de:'Tippe auf den genannten Teil', en:'Tap the part I name' },
      rounds:[
        { parts:[{role:'subj',text:'The girl'}, {role:'verb',text:'eats'}, {role:'obj',text:'an apple'}],
          find:'subj', gloss:{ ru:'Девочка ест яблоко. Действие выполняет девочка.', de:'Das Mädchen isst einen Apfel. Das Mädchen handelt.' } },
        { parts:[{role:'subj',text:'The girl'}, {role:'verb',text:'eats'}, {role:'obj',text:'an apple'}],
          find:'verb', gloss:{ ru:'Действие — «eats».', de:'Die Handlung ist „eats“.' } },
        { parts:[{role:'subj',text:'The girl'}, {role:'verb',text:'eats'}, {role:'obj',text:'an apple'}],
          find:'obj', gloss:{ ru:'Действие направлено на яблоко.', de:'Die Handlung betrifft den Apfel.' } },
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'verb', gloss:{ ru:'Действие — «sees».', de:'Die Handlung ist „sees“.' } },
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'obj', gloss:{ ru:'Действие направлено на кошку.', de:'Die Handlung betrifft die Katze.' } },
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'subj', gloss:{ ru:'Видит собака.', de:'Der Hund sieht.' } }
      ]
    },

    /* ---------- 3. now without the colours ---------- */
    { kind:'read',
      head:{ ru:'Теперь без цвета', de:'Jetzt ohne Farbe', en:'Now without the colours' },
      body:{
        ru:'Дальше цвета появятся только после твоего ответа. Ищи не цвет, а роль: кто делает, что делает, на что направлено.',
        de:'Ab jetzt erscheinen die Farben erst nach deiner Antwort. Suche nicht die Farbe, sondern die Rolle: wer handelt, was passiert, worauf es sich richtet.',
        en:'From here the colours only appear after you answer. Look for the role, not the colour: who acts, what happens, what it lands on.' },
      show:[
        { de:'Ask: who or what does the action? That is the subject.',
          gloss:{ ru:'Кто или что выполняет действие?', de:'Wer oder was führt die Handlung aus?' } },
        { de:'Ask: what is the action? That is the verb.',
          gloss:{ ru:'Что за действие?', de:'Was ist die Handlung?' } },
        { de:'Ask: who or what receives it? That is the object.',
          gloss:{ ru:'На кого или на что оно направлено?', de:'Wen oder was betrifft es?' } }
      ]
    },

    /* ---------- 4. unscaffolded. Orderings O-S-V and S-O-V. ---------- */
    { kind:'mark',
      ask:{ ru:'Нажми на названную часть', de:'Tippe auf den genannten Teil', en:'Tap the part I name' },
      rounds:[
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'opens'}, {role:'obj',text:'the window'}],
          find:'obj', gloss:{ ru:'Открывает окно.', de:'Sie öffnet das Fenster.' } },
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'opens'}, {role:'obj',text:'the window'}],
          find:'subj', gloss:{ ru:'Открывает Таня.', de:'Tanya öffnet.' } },
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'opens'}, {role:'obj',text:'the window'}],
          find:'verb', gloss:{ ru:'Действие — «opens».', de:'Die Handlung ist „opens“.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'carries'}, {role:'obj',text:'the bag'}],
          find:'subj', gloss:{ ru:'Несёт Назар.', de:'Nazar trägt.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'carries'}, {role:'obj',text:'the bag'}],
          find:'obj', gloss:{ ru:'Несёт сумку.', de:'Er trägt die Tasche.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'carries'}, {role:'obj',text:'the bag'}],
          find:'verb', gloss:{ ru:'Действие — «carries».', de:'Die Handlung ist „carries“.' } }
      ]
    },

    /* ---------- 5. sort, to name them cold ---------- */
    { kind:'sort',
      ask:{ ru:'Какая это роль?', de:'Welche Rolle ist das?', en:'Which role is it?' },
      bins:[
        { id:'subj', label:'subject' },
        { id:'verb', label:'verb'    },
        { id:'obj',  label:'object'  }
      ],
      cards:[
        { text:'Tanya',      bin:'subj' },
        { text:'drinks',     bin:'verb' },
        { text:'coffee',     bin:'obj'  },
        { text:'Nazar',      bin:'subj' },
        { text:'reads',      bin:'verb' },
        { text:'a book',     bin:'obj'  },
        { text:'The dog',    bin:'subj' },
        { text:'sees',       bin:'verb' },
        { text:'the cat',    bin:'obj'  }
      ]
    },

    /* ---------- 6. role is not position ---------- */
    { kind:'read',
      head:{ ru:'Роль — это не место', de:'Die Rolle ist nicht die Position', en:'The role is not the position' },
      body:{
        ru:'Одни и те же слова, поменянные местами, дают другое предложение. Собака и кошка не меняются — меняются их роли, и вместе с ними смысл. Именно поэтому цвета вообще что-то значат.',
        de:'Dieselben Wörter, getauscht, ergeben einen anderen Satz. Hund und Katze bleiben dieselben Wörter — ihre Rollen ändern sich, und damit die Bedeutung. Genau deshalb bedeuten die Farben überhaupt etwas.',
        en:'The same words, swapped, make a different sentence. The dog and the cat are the same two words — their roles change, and the meaning changes with them. That is why the colours mean anything at all.' },
      show:[
        { de:'The dog sees the cat. \u2192 the dog does the seeing.',
          gloss:{ ru:'Собака видит кошку.', de:'Der Hund sieht die Katze.' } },
        { de:'The cat sees the dog. \u2192 the cat does the seeing.',
          gloss:{ ru:'Кошка видит собаку.', de:'Die Katze sieht den Hund.' } },
        { de:'Same words. Different subject. Different meaning.',
          gloss:{ ru:'В английском место в предложении и задаёт роль.', de:'Im Englischen bestimmt die Position die Rolle.' } }
      ],
      note:{
        ru:'В английском порядок слов почти всё решает. В немецком роль часто держится на артикле, поэтому там порядок может меняться без изменения смысла.',
        de:'Im Englischen entscheidet die Wortstellung fast alles. Im Deutschen hängt die Rolle oft am Artikel, deshalb kann sich dort die Stellung ändern, ohne dass sich der Sinn ändert.',
        en:'In English the word order decides almost everything. In German the role often hangs on the article, so there the order can move without the meaning moving.' }
    },

    /* ---------- 7. the swapped pair. Orderings V-S-O and O-V-S,
           which completes all six across the lesson. ---------- */
    { kind:'mark',
      ask:{ ru:'Нажми на названную часть', de:'Tippe auf den genannten Teil', en:'Tap the part I name' },
      rounds:[
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'verb', gloss:{ ru:'Действие то же — «sees».', de:'Die Handlung bleibt „sees“.' } },
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'subj', gloss:{ ru:'Видит собака.', de:'Der Hund sieht.' } },
        { parts:[{role:'subj',text:'The dog'}, {role:'verb',text:'sees'}, {role:'obj',text:'the cat'}],
          find:'obj', gloss:{ ru:'Действие направлено на кошку.', de:'Die Handlung betrifft die Katze.' } },
        { parts:[{role:'subj',text:'The cat'}, {role:'verb',text:'sees'}, {role:'obj',text:'the dog'}],
          find:'obj', gloss:{ ru:'Теперь действие направлено на собаку.', de:'Jetzt betrifft es den Hund.' } },
        { parts:[{role:'subj',text:'The cat'}, {role:'verb',text:'sees'}, {role:'obj',text:'the dog'}],
          find:'verb', gloss:{ ru:'Глагол не изменился.', de:'Das Verb ist unverändert.' } },
        { parts:[{role:'subj',text:'The cat'}, {role:'verb',text:'sees'}, {role:'obj',text:'the dog'}],
          find:'subj', gloss:{ ru:'Теперь видит кошка. Те же слова, другое подлежащее.', de:'Jetzt sieht die Katze. Dieselben Wörter, anderes Subjekt.' } }
      ]
    },

    /* ---------- 8. what changed ---------- */
    { kind:'pick',
      ask:{ ru:'Что изменилось?', de:'Was hat sich geändert?', en:'What changed?' },
      rounds:[
        { de:'The dog sees the cat. \u2192 The cat sees the dog. \u2014 ___ changed.', answer:'the meaning',
          options:['the meaning','only the spelling','nothing'],
          gloss:{ ru:'Изменился смысл.', de:'Die Bedeutung hat sich geändert.' } },
        { de:'The cat sees the dog. \u2014 who sees? ___', answer:'the cat', options:['the cat','the dog'],
          gloss:{ ru:'Видит кошка.', de:'Die Katze sieht.' } },
        { de:'The dog sees the cat. \u2014 who sees? ___', answer:'the dog', options:['the cat','the dog'],
          gloss:{ ru:'Видит собака.', de:'Der Hund sieht.' } },
        { de:'What makes "the girl" the subject in "The girl eats an apple"? ___', answer:'it does the action',
          options:['it does the action','it is first','it is blue'],
          gloss:{ ru:'Она выполняет действие. Цвет и место — только подсказки.', de:'Sie führt die Handlung aus. Farbe und Position sind nur Hinweise.' } }
      ]
    },

    /* ---------- 9. some words are neither ---------- */
    { kind:'read',
      head:{ ru:'Не каждая часть — S, V или O', de:'Nicht jeder Teil ist S, V oder O', en:'Not every part is S, V or O' },
      body:{
        ru:'В предложении может быть больше, чем подлежащее, глагол и дополнение. Пока мы выделяем только эти три части — остальное просто остаётся текстом и нажать на него нельзя.',
        de:'Ein Satz kann mehr enthalten als Subjekt, Verb und Objekt. Im Moment markieren wir nur diese drei Teile — der Rest bleibt einfach Text und ist nicht antippbar.',
        en:'A sentence can hold more than a subject, verb and object. For now we only mark those three — the rest simply stays text, and cannot be tapped.' },
      show:[
        { de:'Tanya buys bread <b>from the store</b>.',
          gloss:{ ru:'«from the store» — не подлежащее, не глагол и не дополнение.', de:'„from the store“ ist weder Subjekt noch Verb noch Objekt.' } },
        { de:'Nazar reads a book <b>at school</b>.',
          gloss:{ ru:'«at school» тоже вне этих трёх ролей.', de:'„at school“ liegt ebenfalls außerhalb der drei Rollen.' } }
      ]
    },

    /* ---------- 10. with a chunk that has no role at all ---------- */
    { kind:'mark',
      ask:{ ru:'Нажми на названную часть', de:'Tippe auf den genannten Teil', en:'Tap the part I name' },
      rounds:[
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'buys'}, {role:'obj',text:'bread'}, {text:'from the store'}],
          find:'subj', gloss:{ ru:'Покупает Таня.', de:'Tanya kauft.' } },
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'buys'}, {role:'obj',text:'bread'}, {text:'from the store'}],
          find:'obj', gloss:{ ru:'Покупает хлеб, а не «from the store».', de:'Sie kauft Brot, nicht „from the store“.' } },
        { parts:[{role:'subj',text:'Tanya'}, {role:'verb',text:'buys'}, {role:'obj',text:'bread'}, {text:'from the store'}],
          find:'verb', gloss:{ ru:'Действие — «buys».', de:'Die Handlung ist „buys“.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'reads'}, {role:'obj',text:'a book'}, {text:'at school'}],
          find:'obj', gloss:{ ru:'Читает книгу; «at school» вне трёх ролей.', de:'Er liest ein Buch; „at school“ liegt außerhalb.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'reads'}, {role:'obj',text:'a book'}, {text:'at school'}],
          find:'verb', gloss:{ ru:'Действие — «reads».', de:'Die Handlung ist „reads“.' } },
        { parts:[{role:'subj',text:'Nazar'}, {role:'verb',text:'reads'}, {role:'obj',text:'a book'}, {text:'at school'}],
          find:'subj', gloss:{ ru:'Читает Назар.', de:'Nazar liest.' } }
      ]
    },

    /* ---------- 11. no boxes at all: she writes the part ----------

       Steven's third tier, 09 Sep: "a more advanced part where you have
       to type out the part without any boxes, colors, or highlighting."

       So this is an ordinary `type` step, not a `mark` one — the
       sentence is plain text in the stem and she writes the part
       herself. Nothing to tap, nothing to eliminate, no three-way guess.

       `exact:true` because these are minimal pairs by nature: "the dog"
       against "the cat" is two edits and the fuzzy matcher would accept
       either on a target this short. Case is still forgiven — `the dog`
       for `The dog` is not a mistake. */
    { kind:'type',
      exact:true,
      level:'harder',
      ask:{ ru:'Напиши названную часть', de:'Schreib den genannten Teil', en:'Write the part I name' },
      rounds:[
        { de:'The dog sees the cat. \u2014 the subject is ___', answer:'The dog',
          gloss:{ ru:'Собака видит кошку.', de:'Der Hund sieht die Katze.' } },
        { de:'The dog sees the cat. \u2014 the object is ___', answer:'the cat',
          gloss:{ ru:'Действие направлено на кошку.', de:'Die Handlung betrifft die Katze.' } },
        { de:'Tanya drinks coffee. \u2014 the verb is ___', answer:'drinks',
          gloss:{ ru:'Таня пьёт кофе.', de:'Tanya trinkt Kaffee.' } },
        { de:'Nazar reads a book. \u2014 the object is ___', answer:'a book',
          gloss:{ ru:'Назар читает книгу.', de:'Nazar liest ein Buch.' } },
        { de:'Anna opens the door. \u2014 the subject is ___', answer:'Anna',
          gloss:{ ru:'Анна открывает дверь.', de:'Anna öffnet die Tür.' } },
        { de:'Tanya buys bread from the store. \u2014 the object is ___', answer:'bread',
          gloss:{ ru:'Не «from the store» — это вне трёх ролей.', de:'Nicht „from the store“ — das liegt außerhalb der drei Rollen.' } },
        { de:'The ball kicks Max. \u2014 the subject is ___', answer:'The ball',
          gloss:{ ru:'Странное предложение, но подлежащее — мяч.', de:'Ein seltsamer Satz, aber das Subjekt ist der Ball.' } }
      ]
    },

    /* ---------- finish ---------- */
    { kind:'read',
      head:{ ru:'Итог', de:'Kurz gesagt', en:'In short' },
      body:{
        ru:'Подлежащее, глагол и дополнение — это роли, а не места. Позиция помогает их узнать, но сама позиция ролью не является. В английском порядок слов решает почти всё: поменяешь подлежащее и дополнение — поменяется смысл.',
        de:'Subjekt, Verb und Objekt sind Rollen, keine Positionen. Die Stellung hilft, sie zu erkennen, aber die Stellung ist nicht die Rolle. Im Englischen entscheidet die Wortstellung fast alles: tauscht man Subjekt und Objekt, ändert sich die Bedeutung.',
        en:'Subject, verb and object are roles, not positions. Position helps you find them, but position is not the role. In English word order decides almost everything: swap the subject and object and the meaning swaps too.' },
      show:[
        { de:'The dog sees the cat. \u00b7 The cat sees the dog.',
          gloss:{ ru:'Те же слова, другой смысл.', de:'Dieselben Wörter, anderer Sinn.' } },
        { de:'Tanya buys bread from the store.',
          gloss:{ ru:'Три роли и одна часть вне них.', de:'Drei Rollen und ein Teil außerhalb.' } }
      ]
    }

  ]
}

];
