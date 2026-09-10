/* data/en-articles.js */
/* Articles — a / an / the / Ø

   English-as-target grammar bank. The filename is en-articles.js on
   purpose: data/articles.js is already the reader tier (cheese, sushi,
   Kitchen Wars) and duplicate basenames are banned.

   Why this topic is the richest of the English reference areas
   -----------------------------------------------------------
   German articles carry gender and case. Russian has no articles at all.
   English articles carry *discourse*: is this one new thing, the thing we
   already share, or a kind of thing in general? The word itself will not
   tell her. The situation will.

   So the reference is organised by the decision, not by the form:

     a / an   one, new, any member of a class     (singular countable only)
     the      known, specific, unique in context
     Ø        general, plural, mass, or a label    (meals, languages, names…)

   a vs an is a SECOND decision, and a small one: the next sound, not the
   next letter. It does not belong in the main three-way choice or it will
   drown the thing that is actually hard.

   What Russian does here
   ----------------------
   Russian marks a new thing with word order, a particle, or nothing.
   «На столе кошка» and «Кошка на столе» are both legal and neither one
   contains a, an, or the. Transfer therefore goes two ways, both wrong:

     1. drop the article            I see cat.
     2. once "the" exists, overuse  I like the music. She speaks the English.

   German helps a little and misleads a little. ein/eine is close to a/an
   (one, new); der/die/das is close to the (known). But German still needs
   an article on almost every singular noun, including many places English
   goes bare — in der Schule, die Musik, das Leben. A German speaker
   over-uses the; a Russian speaker under-uses everything. Both errors are
   in the bank.

   THE LESSON IS NOT IN THIS FILE. Lessons live in data/curriculum-en.js,
   in the four-kind step schema the engine actually renders. An earlier
   draft of this file carried a `lesson:` block written against a
   different schema — step-level `prompt`/`options`/`answer`, string
   `bins`, item-id `cards` — none of which js/activities/lessons.js reads.
   It would have rendered blank steps and thrown on the first sort. The
   teaching content from that draft belongs in curriculum-en.js as
   `en-articles`; this file stays pure reference data.

   Scheme
   ------
   mark    'a' | 'an' | 'the' | 'zero'
   kind    why that mark won, so a page or a future game can bin a row
           new-one | any-one | vowel-sound | known | unique | repeated
           general-plural | mass | meal | language | name | institution
           sport | day
   noun    the noun the article is deciding about
   next    the word whose SOUND decides a/an. Only on a/an rows.
   img     existing vocab.js sprite address where one exists, so a future
           game can show the picture for free. Optional and unread today.

   A sentence that honestly allows two marks (I play (the) piano) does not
   belong in a scored item — it goes in notes[] and stays off the ladder. */

window.GH_EN_ARTICLES = {

  /* Shown on the reference index tile and at the top of the topic. Three
     languages because the interface language is independent of the
     course; the target language of every example sentence is English. */
  title: {
    en: 'Articles',
    de: 'Artikel',
    ru: 'Артикли'
  },
  sub: {
    en: 'a, an, the, or nothing',
    de: 'a, an, the oder nichts',
    ru: 'a, an, the или ничего'
  },
  lede: {
    en: 'English uses a small word Russian does not have, and German uses for a different job. The word is not about the noun. It is about whether this is one new thing, the thing you both know, or the kind of thing in general.',
    de: 'Englisch benutzt ein kleines Wort, das Russisch nicht hat und das Deutsch für etwas anderes braucht. Es sagt nichts über das Nomen. Es sagt, ob das eine neue Sache ist, die Sache, die ihr beide kennt, oder die Sorte Sache überhaupt.',
    ru: 'В английском есть маленькое слово, которого в русском нет, а в немецком оно делает другую работу. Оно говорит не о существительном. Оно говорит: это одна новая вещь, та вещь, которую вы оба знаете, или такой вид вещей вообще.'
  },

  /* The three families the reference is built from. a and an share a
     family because they answer the same question; the sound split is a
     row inside it, not a fourth family. */
  families: [
    { id: 'new',  mark: 'a / an', glyph: '1\uFE0F\u20E3',
      title: { en: 'One, new thing', de: 'Eine neue Sache', ru: 'Одна новая вещь' },
      note:  { en: 'Singular and countable. You cannot see which one yet, or it does not matter which one.',
               de: 'Einzahl und zählbar. Man sieht noch nicht, welches, oder es ist egal, welches.',
               ru: 'Единственное число и исчисляемое. Ещё не видно, какое именно, или это неважно.' },
      kinds: ['new-one', 'any-one', 'vowel-sound'] },
    { id: 'known', mark: 'the', glyph: '\uD83C\uDFAF',
      title: { en: 'Known, specific thing', de: 'Bekannte, bestimmte Sache', ru: 'Известная, конкретная вещь' },
      note:  { en: 'You and the listener can both point at it: it was just named, it is unique here, or only one thing fits.',
               de: 'Du und die andere Person könnt beide darauf zeigen: es wurde gerade genannt, es ist hier einzig, oder nur eines passt.',
               ru: 'Вы оба можете на это указать: только что назвали, здесь оно одно такое, или подходит только одно.' },
      kinds: ['known', 'unique', 'repeated'] },
    { id: 'zero', mark: '\u2205', glyph: '\u2205',
      title: { en: 'No article', de: 'Kein Artikel', ru: 'Без артикля' },
      note:  { en: 'Plurals and mass nouns talking about the kind, plus a short list of labels English leaves bare: names, languages, meals, most days, most sports.',
               de: 'Mehrzahl und Stoffnamen, wenn die Sorte gemeint ist, plus eine kurze Liste nackter Wörter: Namen, Sprachen, Mahlzeiten, die meisten Tage, die meisten Sportarten.',
               ru: 'Множественное число и вещественные, когда речь о виде вообще, плюс короткий список «голых» слов: имена, языки, приёмы пищи, большинство дней, большинство видов спорта.' },
      kinds: ['general-plural', 'mass', 'meal', 'language', 'name', 'institution', 'sport', 'day'] }
  ],

  /* Matched pairs. Nothing in the noun changes. The article changes
     because the situation changed — first time, against the one you both
     now share. This is the wo/wohin move applied to English. */
  pairs: [
    { id: 'cat-table', noun: 'cat', img: 416,
      neu: { en: 'Tanya sees a cat.',      de: 'Tanya sieht eine Katze.',    ru: 'Таня видит кошку.' },
      kno: { en: 'The cat is on the table.', de: 'Die Katze ist auf dem Tisch.', ru: 'Кошка на столе.' } },
    { id: 'apple', noun: 'apple', img: 50,
      neu: { en: 'Nazar eats an apple.',   de: 'Nazar isst einen Apfel.',    ru: 'Назар ест яблоко.' },
      kno: { en: 'The apple is red.',      de: 'Der Apfel ist rot.',         ru: 'Яблоко красное.' } },
    { id: 'jacket', noun: 'jacket', img: 16,
      neu: { en: 'Tanya needs a new jacket.', de: 'Tanya braucht eine neue Jacke.', ru: 'Тане нужна новая куртка.' },
      kno: { en: 'The jacket is too expensive.', de: 'Die Jacke ist zu teuer.', ru: 'Куртка слишком дорогая.' } },
    { id: 'bus', noun: 'bus', img: 105,
      neu: { en: 'A bus is coming.',       de: 'Ein Bus kommt.',             ru: 'Подходит автобус.' },
      kno: { en: 'Tanya gets on the bus.', de: 'Tanya steigt in den Bus.',   ru: 'Таня садится в автобус.' } },
    { id: 'bag', noun: 'bag', img: 21,
      neu: { en: 'She buys a bag.',        de: 'Sie kauft eine Tasche.',     ru: 'Она покупает сумку.' },
      kno: { en: 'The bag is on the table.', de: 'Die Tasche liegt auf dem Tisch.', ru: 'Сумка лежит на столе.' } },
    { id: 'mirror', noun: 'mirror', img: 39,
      neu: { en: 'Tanya needs a mirror.',  de: 'Tanya braucht einen Spiegel.', ru: 'Тане нужно зеркало.' },
      kno: { en: 'She stands in front of the mirror.', de: 'Sie steht vor dem Spiegel.', ru: 'Она стоит перед зеркалом.' } },
    { id: 'song', noun: 'song', img: 404,
      neu: { en: 'Nazar hears a song.',    de: 'Nazar hört ein Lied.',       ru: 'Назар слышит песню.' },
      kno: { en: 'The song makes him happy.', de: 'Das Lied macht ihn glücklich.', ru: 'Песня делает его счастливым.' } },
    { id: 'gift', noun: 'gift', img: 412,
      neu: { en: 'Tanya gives Nazar a gift.', de: 'Tanya schenkt Nazar ein Geschenk.', ru: 'Таня дарит Назару подарок.' },
      kno: { en: 'The gift is on the table.', de: 'Das Geschenk liegt auf dem Tisch.', ru: 'Подарок лежит на столе.' } }
  ],

  /* Flat example bank. `en` is the target sentence; de and ru are the
     gloss. This file does not go through packs.js, so nothing is remapped
     here — interface copy lives on title/sub/lede/note, not on these
     rows. */
  items: [

    /* ---------- a / an : one, new ---------- */
    { id:'ea01', mark:'a',  kind:'new-one',     noun:'cat',    next:'cat',    img:416,
      en:'Tanya sees a cat.',              de:'Tanya sieht eine Katze.',           ru:'Таня видит кошку.' },
    { id:'ea02', mark:'a',  kind:'new-one',     noun:'jacket', next:'new',    img:16,
      en:'Tanya needs a new jacket.',      de:'Tanya braucht eine neue Jacke.',    ru:'Тане нужна новая куртка.' },
    { id:'ea03', mark:'a',  kind:'new-one',     noun:'bag',    next:'bag',    img:21,
      en:'She buys a bag.',                de:'Sie kauft eine Tasche.',            ru:'Она покупает сумку.' },
    { id:'ea04', mark:'a',  kind:'new-one',     noun:'mirror', next:'mirror', img:39,
      en:'Tanya needs a mirror.',          de:'Tanya braucht einen Spiegel.',      ru:'Тане нужно зеркало.' },
    { id:'ea05', mark:'a',  kind:'new-one',     noun:'gift',   next:'gift',   img:412,
      en:'Tanya gives Nazar a gift.',      de:'Tanya schenkt Nazar ein Geschenk.', ru:'Таня дарит Назару подарок.' },
    { id:'ea06', mark:'a',  kind:'any-one',     noun:'bus',    next:'bus',    img:105,
      en:'A bus is coming.',               de:'Ein Bus kommt.',                    ru:'Подходит автобус.' },
    { id:'ea07', mark:'a',  kind:'any-one',     noun:'table',  next:'table',  img:75,
      en:'Please sit at a table.',         de:'Bitte setz dich an einen Tisch.',   ru:'Пожалуйста, сядь за стол.' },
    { id:'ea08', mark:'an', kind:'vowel-sound', noun:'apple',  next:'apple',  img:50,
      en:'Nazar eats an apple.',           de:'Nazar isst einen Apfel.',           ru:'Назар ест яблоко.' },
    { id:'ea09', mark:'an', kind:'vowel-sound', noun:'egg',    next:'egg',    img:51,
      en:'She eats an egg for breakfast.', de:'Sie isst ein Ei zum Frühstück.',    ru:'Она ест яйцо на завтрак.' },
    { id:'ea10', mark:'an', kind:'vowel-sound', noun:'umbrella', next:'umbrella', img:100,
      en:'He takes an umbrella.',          de:'Er nimmt einen Regenschirm.',       ru:'Он берёт зонт.' },
    { id:'ea11', mark:'an', kind:'vowel-sound', noun:'hour',   next:'hour',   img:362,
      en:'The trip takes an hour.',        de:'Die Fahrt dauert eine Stunde.',     ru:'Поездка длится час.' },
    { id:'ea12', mark:'a',  kind:'vowel-sound', noun:'university', next:'university',
      en:'She studies at a university.',   de:'Sie studiert an einer Universität.', ru:'Она учится в университете.' },
    { id:'ea13', mark:'a',  kind:'new-one',     noun:'song',   next:'song',   img:404,
      en:'Nazar hears a song.',            de:'Nazar hört ein Lied.',              ru:'Назар слышит песню.' },

    /* ---------- the : known, specific, unique ---------- */
    { id:'ea14', mark:'the', kind:'known',    noun:'cat',     img:416,
      en:'The cat is on the table.',           de:'Die Katze ist auf dem Tisch.',      ru:'Кошка на столе.' },
    { id:'ea15', mark:'the', kind:'known',    noun:'apple',   img:50,
      en:'The apple is red.',                  de:'Der Apfel ist rot.',                ru:'Яблоко красное.' },
    { id:'ea16', mark:'the', kind:'known',    noun:'jacket',  img:16,
      en:'The jacket is too expensive.',       de:'Die Jacke ist zu teuer.',           ru:'Куртка слишком дорогая.' },
    { id:'ea17', mark:'the', kind:'known',    noun:'bus',     img:105,
      en:'Tanya gets on the bus.',             de:'Tanya steigt in den Bus.',          ru:'Таня садится в автобус.' },
    { id:'ea18', mark:'the', kind:'repeated', noun:'song',    img:404,
      en:'The song makes him happy.',          de:'Das Lied macht ihn glücklich.',     ru:'Песня делает его счастливым.' },
    { id:'ea19', mark:'the', kind:'unique',   noun:'sun',     img:93,
      en:'The sun is warm today.',             de:'Die Sonne ist heute warm.',         ru:'Сегодня солнце тёплое.' },
    { id:'ea20', mark:'the', kind:'unique',   noun:'door',    img:74,
      en:'Please close the door.',             de:'Bitte mach die Tür zu.',            ru:'Пожалуйста, закрой дверь.' },
    { id:'ea21', mark:'the', kind:'unique',   noun:'kitchen', img:72,
      en:'Tanya is in the kitchen.',           de:'Tanya ist in der Küche.',           ru:'Таня на кухне.' },
    { id:'ea22', mark:'the', kind:'unique',   noun:'fridge',  img:325,
      en:'The milk is in the fridge.',         de:'Die Milch ist im Kühlschrank.',     ru:'Молоко в холодильнике.' },
    { id:'ea23', mark:'the', kind:'known',    noun:'mirror',  img:39,
      en:'She stands in front of the mirror.', de:'Sie steht vor dem Spiegel.',        ru:'Она стоит перед зеркалом.' },
    { id:'ea24', mark:'the', kind:'known',    noun:'table',   img:75,
      en:'The bag is on the table.',           de:'Die Tasche liegt auf dem Tisch.',   ru:'Сумка лежит на столе.' },

    /* ---------- Ø : general, mass, labels ---------- */
    { id:'ea25', mark:'zero', kind:'general-plural', noun:'apples', img:50,
      en:'Apples are healthy.',            de:'Äpfel sind gesund.',                ru:'Яблоки полезные.' },
    { id:'ea26', mark:'zero', kind:'general-plural', noun:'cats',   img:416,
      en:'Cats like milk.',                de:'Katzen mögen Milch.',               ru:'Кошки любят молоко.' },
    { id:'ea27', mark:'zero', kind:'mass',      noun:'water',     img:44,
      en:'Tanya drinks water.',            de:'Tanya trinkt Wasser.',              ru:'Таня пьёт воду.' },
    { id:'ea28', mark:'zero', kind:'mass',      noun:'music',     img:402,
      en:'Nazar likes music.',             de:'Nazar mag Musik.',                  ru:'Назару нравится музыка.' },
    { id:'ea29', mark:'zero', kind:'mass',      noun:'bread',     img:46,
      en:'We need bread.',                 de:'Wir brauchen Brot.',                ru:'Нам нужен хлеб.' },
    { id:'ea30', mark:'zero', kind:'mass',      noun:'milk',      img:54,
      en:'The children drink milk.',       de:'Die Kinder trinken Milch.',         ru:'Дети пьют молоко.' },
    { id:'ea31', mark:'zero', kind:'meal',      noun:'breakfast', img:52,
      en:'They have breakfast at seven.',  de:'Sie frühstücken um sieben.',        ru:'Они завтракают в семь.' },
    { id:'ea32', mark:'zero', kind:'language',  noun:'English',
      en:'Tanya is learning English.',     de:'Tanya lernt Englisch.',             ru:'Таня учит английский.' },
    { id:'ea33', mark:'zero', kind:'language',  noun:'German',
      en:'She speaks German at home.',     de:'Sie spricht zu Hause Deutsch.',     ru:'Дома она говорит по-немецки.' },
    { id:'ea34', mark:'zero', kind:'name',      noun:'Tanya',
      en:'Tanya is in the kitchen.',       de:'Tanya ist in der Küche.',           ru:'Таня на кухне.' },
    { id:'ea35', mark:'zero', kind:'name',      noun:'Berlin',
      en:'They live in Berlin.',           de:'Sie wohnen in Berlin.',             ru:'Они живут в Берлине.' },
    { id:'ea36', mark:'zero', kind:'institution', noun:'school',  img:90,
      en:'Nazar goes to school.',          de:'Nazar geht zur Schule.',            ru:'Назар ходит в школу.' },
    { id:'ea37', mark:'zero', kind:'sport',     noun:'football',
      en:'The children play football.',    de:'Die Kinder spielen Fußball.',       ru:'Дети играют в футбол.' },
    { id:'ea38', mark:'zero', kind:'day',       noun:'Monday',    img:343,
      en:'School starts on Monday.',       de:'Die Schule beginnt am Montag.',     ru:'Школа начинается в понедельник.' },

    /* Contrast rows, so "the music" and "the school" can be marked wrong
       for the right reason rather than because the sentence is
       impossible. The bare version is the default; these are the
       situations where the really is correct. */
    { id:'ea39', mark:'the', kind:'known', noun:'music',     img:402,
      en:'The music in this café is loud.',   de:'Die Musik in diesem Café ist laut.',    ru:'Музыка в этом кафе громкая.' },
    { id:'ea40', mark:'the', kind:'known', noun:'school',    img:90,
      en:'The school is next to the park.',   de:'Die Schule liegt neben dem Park.',      ru:'Школа рядом с парком.' },
    { id:'ea41', mark:'the', kind:'known', noun:'breakfast', img:52,
      en:'The breakfast on the table is cold.', de:'Das Frühstück auf dem Tisch ist kalt.', ru:'Завтрак на столе холодный.' },
    { id:'ea42', mark:'a',   kind:'new-one', noun:'school',  img:90,
      en:'Nazar goes to a new school.',       de:'Nazar geht auf eine neue Schule.',      ru:'Назар ходит в новую школу.' }
  ],

  /* a vs an is sound, not spelling. The rows that actually teach it sit
     together so the page can print them as one block. */
  sound: [
    { next:'apple',      mark:'an', en:'an apple',        de:'ein Apfel',            ru:'яблоко',
      why:{ en:'starts with a vowel sound', de:'beginnt mit einem Vokallaut', ru:'начинается с гласного звука' } },
    { next:'egg',        mark:'an', en:'an egg',          de:'ein Ei',               ru:'яйцо',
      why:{ en:'starts with a vowel sound', de:'beginnt mit einem Vokallaut', ru:'начинается с гласного звука' } },
    { next:'hour',       mark:'an', en:'an hour',         de:'eine Stunde',          ru:'час',
      why:{ en:'h is silent — the sound is "our"', de:'h ist stumm — man hört „our“', ru:'h немое — слышно «ауэр»' } },
    { next:'umbrella',   mark:'an', en:'an umbrella',     de:'ein Regenschirm',      ru:'зонт',
      why:{ en:'starts with a vowel sound', de:'beginnt mit einem Vokallaut', ru:'начинается с гласного звука' } },
    { next:'old',        mark:'an', en:'an old jacket',   de:'eine alte Jacke',      ru:'старая куртка',
      why:{ en:'starts with a vowel sound', de:'beginnt mit einem Vokallaut', ru:'начинается с гласного звука' } },
    { next:'university', mark:'a',  en:'a university',    de:'eine Universität',     ru:'университет',
      why:{ en:'starts with a "you" sound, not a vowel', de:'beginnt mit „you“, nicht mit einem Vokal', ru:'начинается со звука «ю», не с гласного' } },
    { next:'house',      mark:'a',  en:'a house',         de:'ein Haus',             ru:'дом',
      why:{ en:'h is sounded', de:'h wird gesprochen', ru:'h произносится' } },
    { next:'useful',     mark:'a',  en:'a useful bag',    de:'eine nützliche Tasche', ru:'полезная сумка',
      why:{ en:'starts with a "you" sound', de:'beginnt mit „you“', ru:'начинается со звука «ю»' } }
  ],

  /* Where instinct betrays her. Same job as the "Where Russian misleads"
     block on the gender page: a short list, not a rule to memorise.
     `wrong` is the form a Russian or German speaker produces. */
  traps: [
    { from:'ru', mark:'a', wrong:'I see cat.', en:'I see a cat.',
      why:{ en:'Russian names the thing and stops. English still needs a on a new singular.',
            de:'Russisch nennt die Sache und ist fertig. Englisch braucht trotzdem a bei einer neuen Einzahl.',
            ru:'По-русски достаточно назвать вещь. По-английски для новой исчисляемой в единственном числе нужно a.' } },
    { from:'ru', mark:'the', wrong:'Cat is on table.', en:'The cat is on the table.',
      why:{ en:'Once you can both point at it, English wants the — on the cat and on the table.',
            de:'Sobald ihr beide darauf zeigen könnt, will Englisch the — bei der Katze und beim Tisch.',
            ru:'Как только на это можно указать, английский хочет the — и у кошки, и у стола.' } },
    { from:'de', mark:'zero', wrong:'She likes the music.', en:'She likes music.',
      why:{ en:'German says die Musik even for the kind. English drops the article when the kind is meant.',
            de:'Deutsch sagt die Musik auch für die Sorte. Englisch lässt den Artikel weg, wenn die Sorte gemeint ist.',
            ru:'По-немецки даже про музыку вообще говорят die Musik. По-английски про вид вообще артикль не ставят.' } },
    { from:'de', mark:'zero', wrong:'Nazar goes to the school.', en:'Nazar goes to school.',
      why:{ en:'The institution as a daily thing is bare. the school is the building you can point at.',
            de:'Die Institution als Alltag bleibt nackt. the school ist das Gebäude, auf das man zeigen kann.',
            ru:'Учреждение как часть дня — без артикля. the school — это здание, на которое можно показать.' } },
    { from:'ru', mark:'zero', wrong:'She speaks the English.', en:'She speaks English.',
      why:{ en:'Language names take nothing.',
            de:'Sprachnamen bekommen nichts.',
            ru:'Названия языков стоят без артикля.' } },
    { from:'both', mark:'an', wrong:'a hour', en:'an hour',
      why:{ en:'The letter is a consonant. The sound is a vowel. English listens.',
            de:'Der Buchstabe ist ein Konsonant. Der Laut ist ein Vokal. Englisch hört hin.',
            ru:'Буква согласная, звук гласный. Английский ориентируется на звук.' } },
    { from:'both', mark:'a', wrong:'an university', en:'a university',
      why:{ en:'The letter is a vowel. The sound is "you". English still listens.',
            de:'Der Buchstabe ist ein Vokal. Der Laut ist „you“. Englisch hört trotzdem hin.',
            ru:'Буква гласная, звук «ю». Английский всё равно слушает звук.' } },
    { from:'de', mark:'zero', wrong:'They have the breakfast at seven.', en:'They have breakfast at seven.',
      why:{ en:'Meals as a time of day are bare. the breakfast is the plate in front of you.',
            de:'Mahlzeiten als Tageszeit bleiben nackt. the breakfast ist der Teller vor dir.',
            ru:'Приём пищи как время дня — без артикля. the breakfast — это тарелка перед тобой.' } }
  ],

  /* Not scored. Honest leftovers the page can name so she is not
     surprised later. Do not promote these into items[] until a lesson
     step can teach them without undoing the three-way decision. */
  notes: [
    { en:'Musical instruments often take the: she plays the piano. Sports do not: she plays football.',
      de:'Musikinstrumente nehmen oft the: she plays the piano. Sportarten nicht: she plays football.',
      ru:'Музыкальные инструменты часто берут the: she plays the piano. Виды спорта — нет: she plays football.' },
    { en:'Some country names take the (the United States, the Netherlands). Most do not (Germany, Russia, France).',
      de:'Manche Ländernamen nehmen the (the United States, the Netherlands). Die meisten nicht (Germany, Russia, France).',
      ru:'Некоторые названия стран берут the (the United States, the Netherlands). Большинство — нет (Germany, Russia, France).' },
    { en:'in hospital / in the hospital is a British against American split. Not taught here. the hospital as a building is safe in both.',
      de:'in hospital / in the hospital ist britisch gegen amerikanisch. Steht hier nicht im Lehrgang. the hospital als Gebäude gilt in beiden.',
      ru:'in hospital / in the hospital — британский и американский варианты. Здесь это не учим. the hospital как здание подходит в обоих.' }
  ]
};

/* Helpers the topic page and a future game share, kept on the data
   object so js/activities/eng-grammar.js does not grow a second copy. */
window.GH_EN_ARTICLES.byMark = function(mark){
  return (this.items || []).filter(function(x){ return x.mark === mark; });
};
window.GH_EN_ARTICLES.byKind = function(kind){
  return (this.items || []).filter(function(x){ return x.kind === kind; });
};
window.GH_EN_ARTICLES.item = function(id){
  var i, items = this.items || [];
  for (i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
  return null;
};
window.GH_EN_ARTICLES.counts = function(){
  var c = { a:0, an:0, the:0, zero:0 };
  (this.items || []).forEach(function(x){ if (c[x.mark] !== undefined) c[x.mark]++; });
  return c;
};
