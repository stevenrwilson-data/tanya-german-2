/* The dictionary.

   A third way of holding vocabulary, beside the image bank and the
   contextual material. The bank teaches recognition: a picture, a German
   word, a gloss. That works until one German word means two things, and
   then the gloss has to pick one and she learns half.

   der Traum is сон and it is мечта. das Glück is счастье and it is удача.
   Those are not shades of one meaning, they are separate Russian words,
   and a single `ru:` field cannot hold both without lying.

   So this file is organised around MEANINGS. A headword has senses; each
   sense carries its own equivalents, its own definitions in all three
   languages, and its own picture if a picture exists for THAT sense. The
   counts do not match across languages and are not supposed to: English
   `box` has four senses and German splits three of them into Kiste,
   Schachtel and Karton, so there is no one-to-one anything.

   WHAT A SENSE FIELD MEANS

     sid      the sense's permanent id. This, not `n`, is what the tutor
              schedules a sense by. `n` was doing three jobs — identity,
              image address, pack membership — and two senses cannot share
              it without merging their histories.
     de       the German for this sense. Usually the headword, but not
              always: `halten für` is a sense of halten and says so.
     en, ru   the equivalents. Aspect pairs stay TOGETHER inside one sense
              — покупать / купить is one meaning — and different meanings
              are different senses, never a slash.
     def      the definition in all three. de, ru and en are all present so
              the switch has something to show whichever language she is
              reading in.
     img      the image number for this sense, 0 for none. An abstract
              sense is taught by its definition and by the songs, stories
              and sentences it appears in.
     primary  the sense the existing GH_VOCAB entry was describing. It
              inherits that entry's `n`, `cats`, `pack` and its two example
              sentences, so nothing already written moves. At most one
              sense per headword may carry it.

   WHAT THIS FILE DOES NOT DO

   It does not replace the bank. A headword here that also exists in
   GH_VOCAB takes over that entry, and the 747 words with nothing here are
   untouched and behave exactly as before. Conversion is one word at a
   time, forever if you like.

   THE FIVE HERE ARE A TEST

   der Traum and das Glück have no bank entry at all, so they exercise the
   dictionary-only path. der Fuß, halten and treffen do have one, so they
   exercise the takeover path — including `treffen` carrying image 506 on
   its first sense and nothing on the other two.

   The definitions below are drafts, written to have something to display.
   Replace them. */

window.GH_DICT = [

  /* No bank entry. Two senses, no picture for either, and the pair of
     Russian words is the whole reason this file exists. */
  {
    de: 'der Traum',
    senses: [
      { sid: 'traum-schlaf',
        de: 'der Traum', en: 'dream', ru: 'сон', img: 0,
        def: {
          de: 'Bilder, Gedanken und Erlebnisse, die man während des Schlafens erlebt.',
          en: 'Images, thoughts, and experiences that occur while someone is sleeping.',
          ru: 'Образы, мысли и события, которые человек переживает во время сна.'
        } },
      { sid: 'traum-wunsch',
        de: 'der Traum', en: 'dream; aspiration', ru: 'мечта', img: 0,
        def: {
          de: 'Etwas, das man sich für die Zukunft sehr wünscht oder erreichen möchte.',
          en: 'Something someone strongly wishes for or hopes to achieve in the future.',
          ru: 'То, чего человек очень хочет или надеется достичь в будущем.'
        } }
    ]
  },

  /* No bank entry either. счастье and удача are as far apart as сон and
     мечта, and English `luck / happiness` hides it behind a slash. */
  {
    de: 'das Glück',
    senses: [
      { sid: 'glueck-freude',
        de: 'das Glück', en: 'happiness', ru: 'счастье', img: 0,
        def: {
          de: 'Das Gefühl, sehr zufrieden und froh zu sein.',
          en: 'The feeling of being very content and glad.',
          ru: 'Чувство глубокой радости и удовлетворения.'
        } },
      { sid: 'glueck-zufall',
        de: 'das Glück', en: 'luck; good fortune', ru: 'удача', img: 0,
        def: {
          de: 'Ein günstiger Zufall, der einem etwas Gutes bringt.',
          en: 'A favourable chance that brings someone something good.',
          ru: 'Благоприятный случай, который приносит человеку что-то хорошее.'
        } }
    ]
  },

  /* Bank entry n:558, img:558, cats ['body'], pack 'verbs'.

     Its Russian was 'ступня / нога', which is the C-bucket problem: das
     Bein is also glossed нога, so the two German words were indis-
     tinguishable from her side. Sense one is ступня only, and the
     definition says which part of the leg. */
  {
    de: 'der Fuß',
    senses: [
      { sid: 'fuss-koerper', primary: true,
        de: 'der Fuß', en: 'foot', ru: 'ступня', img: 558,
        def: {
          de: 'Der unterste Teil des Beins, auf dem man steht.',
          en: 'The lowest part of the leg, the part someone stands on.',
          ru: 'Нижняя часть ноги, на которой человек стоит.'
        } },
      { sid: 'fuss-unten',
        de: 'der Fuß', en: 'foot; base', ru: 'подножие', img: 0,
        def: {
          de: 'Der unterste Teil von etwas Großem, zum Beispiel eines Berges.',
          en: 'The lowest part of something large, for example a mountain.',
          ru: 'Нижняя часть чего-то большого, например горы.'
        } },
      { sid: 'fuss-mass',
        de: 'der Fuß', en: 'foot (unit of length)', ru: 'фут', img: 0,
        def: {
          de: 'Ein altes Längenmaß von etwa dreißig Zentimetern.',
          en: 'An old unit of length of about thirty centimetres.',
          ru: 'Старая мера длины, около тридцати сантиметров.'
        } }
    ]
  },

  /* Bank entry n:766, img:0, cats ['describe'], pack 'more'.

     Its Russian was already two senses separated by a semicolon and one
     aspect pair separated by a slash. That notation is exactly right and
     this file only gives it somewhere to live.

     The third sense has its own German: `halten für` is not the same verb
     used differently, and pretending otherwise is how she meets
     `Ich halte das für falsch` and finds nothing that explains it. */
  {
    de: 'halten',
    senses: [
      { sid: 'halten-fassen', primary: true,
        de: 'halten', en: 'to hold', ru: 'держать', img: 0,
        def: {
          de: 'Etwas mit der Hand fassen und nicht loslassen.',
          en: 'To take something in the hand and not let go of it.',
          ru: 'Взять что-то в руку и не отпускать.'
        } },
      { sid: 'halten-stehen',
        de: 'halten', en: 'to stop; to come to a halt',
        ru: 'останавливаться / остановиться', img: 0,
        def: {
          de: 'Nicht weiterfahren, sondern stehen bleiben.',
          en: 'To come to a standstill rather than carry on.',
          ru: 'Прекратить движение и остаться на месте.'
        } },
      { sid: 'halten-meinen',
        de: 'halten für', en: 'to consider; to regard as',
        ru: 'считать', img: 0,
        def: {
          de: 'Von jemandem oder etwas eine bestimmte Meinung haben.',
          en: 'To have a particular opinion about someone or something.',
          ru: 'Иметь определённое мнение о кому-то или о чём-то.'
        } }
    ]
  },

  /* Bank entry n:769, img:506, cats ['describe'], pack 'more'.

     The picture belongs to the first sense and to no other. This is the
     entry that proves rule 3: one image on the headword would have
     asserted that a drawing of two people meeting also illustrates
     hitting a target. */
  {
    de: 'treffen',
    senses: [
      { sid: 'treffen-begegnen', primary: true,
        de: 'treffen; sich treffen', en: 'to meet',
        ru: 'встречать / встретить; встречаться / встретиться', img: 506,
        def: {
          de: 'Mit jemandem zusammenkommen, meist verabredet.',
          en: 'To come together with someone, usually by arrangement.',
          ru: 'Сойтись с кем-то, обычно по договорённости.'
        } },
      { sid: 'treffen-ziel',
        de: 'treffen', en: 'to hit (a target)',
        ru: 'попадать / попасть', img: 0,
        def: {
          de: 'Ein Ziel mit einem Wurf oder einem Schuss erreichen.',
          en: 'To reach a target with a throw or a shot.',
          ru: 'Достичь цели броском или выстрелом.'
        } },
      { sid: 'treffen-entscheiden',
        de: 'eine Entscheidung treffen', en: 'to make a decision',
        ru: 'принимать решение / принять решение', img: 0,
        def: {
          de: 'Sich nach einiger Überlegung für eine Möglichkeit festlegen.',
          en: 'To settle on one option after some consideration.',
          ru: 'После размышления выбрать один из вариантов.'
        } }
    ]
  }

];
