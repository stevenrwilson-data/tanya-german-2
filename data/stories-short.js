/* ============================================================
   SHORT STORIES — five sentences, with question banks.

   A separate tier from GH_LONG deliberately. Those are eighteen
   sentences and carry `img` and `blanks` on every line, because
   Section 4 exists to practise Section 3's vocabulary. These are
   five sentences and exist to be read and understood. Mixing the
   two in one list would put a thirty-second story next to a
   five-minute one with no warning.

   SHAPE

     id          ss-NN, matching the source numbering
     cat         one of the categories GH_LONG already uses
     title       de / en / ru
     sentences   de / ru / en. No img, no blanks — see below.
     q           the question bank. Five per story.

   THE QUESTION BANK

   Each question is tap-the-sentence: she reads the question and
   taps the line of the story that answers it.

     de / ru / en   the question, in all three
     a              which sentence answers it, 0 to 4

   Every bank has five questions and every one of the five
   sentences is the answer to exactly one of them. That is not
   decoration — it is what makes the draw safe. Two questions
   sharing an answer would mean a round where she answers the
   same line twice, and seven questions in the source set did
   exactly that before they were rewritten.

   HOW IT IS MEANT TO RUN

     Draw two of the five. Ten pairs per story.
     Shuffle the questions, so the pair order is not the bank
       order.
     Shuffle the five sentences when showing them as choices, so
       the answer is never at the position the question number
       would suggest.
     Lock the questions for five days after she answers them.
       The story itself never locks — she can re-read whenever
       she likes; only the questions rest.

   None of that lives in this file. This is data. The activity
   does the drawing, the shuffling and the clock.

   WHAT IS MISSING, ON PURPOSE

   `img` and `blanks`. Every GH_LONG sentence carries both. Image
   numbers come from the sheet mapping and are not mine to
   invent; a wrong number shows the wrong drawing and nothing
   warns. `blanks` can be computed by text.js if the reader wants
   them. Both can be added later without touching the questions.
   ============================================================ */

window.GH_SHORT = [

  {
    id:'ss-16', cat:'shopping',
    title:{ de:'Die schwere Tasche', en:'The Heavy Bag', ru:'Тяжёлая сумка' },
    sentences:[
      { de:'Anna kauft Lebensmittel im Supermarkt.',
        ru:'Анна покупает продукты в супермаркете.',
        en:'Anna buys food at the supermarket.' },
      { de:'Sie legt Milch, Gemüse, Brot und Äpfel in ihre Tasche.',
        ru:'Она кладёт молоко, овощи, хлеб и яблоки в свою сумку.',
        en:'She puts milk, vegetables, bread, and apples in her bag.' },
      { de:'Die Tasche ist sehr schwer.',
        ru:'Сумка очень тяжёлая.',
        en:'The bag is very heavy.' },
      { de:'Sie trägt sie langsam zur Bushaltestelle.',
        ru:'Она медленно несёт её к автобусной остановке.',
        en:'She carries it slowly to the bus stop.' },
      { de:'Im Bus stellt sie die Tasche endlich auf den Boden.',
        ru:'В автобусе она наконец ставит сумку на пол.',
        en:'On the bus, she finally puts the bag on the floor.' }
    ],
    q:[
      { kind:'tap', de:'Wo kauft Anna die Lebensmittel?',
        ru:'Где Анна покупает продукты?',
        en:'Where does Anna buy the food?', a:0 },
      { kind:'tap', de:'Welche vier Lebensmittel legt sie in ihre Tasche?',
        ru:'Какие четыре продукта она кладёт в сумку?',
        en:'What four foods does she put in her bag?', a:1 },
      { kind:'tap', de:'Warum trägt Anna die Tasche langsam?',
        ru:'Почему Анна несёт сумку медленно?',
        en:'Why does Anna carry the bag slowly?', a:2 },
      { kind:'tap', de:'Wohin trägt sie die Tasche, nachdem sie den Supermarkt verlassen hat?',
        ru:'Куда она несёт сумку после того, как выходит из супермаркета?',
        en:'Where does she take the bag after leaving the supermarket?', a:3 },
      { kind:'tap', de:'Was macht sie mit der Tasche, als sie im Bus ist?',
        ru:'Что она делает с сумкой, когда садится в автобус?',
        en:'What does she do with the bag once she is on the bus?', a:4 }
    ]
  },

  {
    id:'ss-17', cat:'kitchen',
    title:{ de:'Frühstück für zwei', en:'Breakfast for Two', ru:'Завтрак на двоих' },
    sentences:[
      { de:'Maria steht früh auf und geht in die Küche.',
        ru:'Мария рано встаёт и идёт на кухню.',
        en:'Maria gets up early and goes into the kitchen.' },
      { de:'Sie macht Eier und Brot zum Frühstück.',
        ru:'Она готовит яйца и хлеб на завтрак.',
        en:'She makes eggs and bread for breakfast.' },
      { de:'Ihr Ehemann macht Kaffee und stellt zwei Tassen auf den Tisch.',
        ru:'Её муж готовит кофе и ставит две чашки на стол.',
        en:'Her husband makes coffee and puts two cups on the table.' },
      { de:'Sie sitzen zusammen und essen.',
        ru:'Они сидят вместе и едят.',
        en:'They sit together and eat.' },
      { de:'Nach dem Frühstück wäscht Maria das Geschirr ab.',
        ru:'После завтрака Мария моет посуду.',
        en:'After breakfast, Maria washes the dishes.' }
    ],
    q:[
      { kind:'tap', de:'Wohin geht Maria, nachdem sie aufgestanden ist?',
        ru:'Куда Мария идёт после того, как встаёт?',
        en:'Where does Maria go after she gets up?', a:0 },
      { kind:'tap', de:'Was macht Maria zum Frühstück?',
        ru:'Что Мария готовит на завтрак?',
        en:'What does Maria make for breakfast?', a:1 },
      { kind:'tap', de:'Was macht ihr Ehemann?',
        ru:'Что готовит её муж?',
        en:'What does her husband prepare?', a:2 },
      { kind:'tap', de:'Was machen Maria und ihr Ehemann zusammen, bevor sie das Geschirr abwäscht?',
        ru:'Что Мария и её муж делают вместе перед тем, как она моет посуду?',
        en:'What do Maria and her husband do together before she washes the dishes?', a:3 },
      { kind:'tap', de:'Was macht Maria nach dem Frühstück?',
        ru:'Что Мария делает после завтрака?',
        en:'What does Maria do after breakfast?', a:4 }
    ]
  },

  {
    /* Q5 rewritten. It was "How does Paul help her?", which is the
       same sentence as Q4 — the draw could serve both and she would
       answer one line twice. It now tests sentence 0, which nothing
       else in the bank reached. */
    id:'ss-18', cat:'travel',
    title:{ de:'Der letzte Sitzplatz', en:'The Last Seat', ru:'Последнее свободное место' },
    sentences:[
      { de:'Paul steigt nach der Arbeit in den Bus.',
        ru:'Пауль садится в автобус после работы.',
        en:'Paul gets on the bus after work.' },
      { de:'Im Bus sind viele Menschen, und nur ein Sitzplatz ist frei.',
        ru:'В автобусе много людей, и свободно только одно место.',
        en:'There are many people on the bus and only one seat is free.' },
      { de:'Er setzt sich neben das Fenster.',
        ru:'Он садится рядом с окном.',
        en:'He sits down next to the window.' },
      { de:'An der nächsten Haltestelle steigt eine ältere Frau ein.',
        ru:'На следующей остановке в автобус садится пожилая женщина.',
        en:'At the next stop, an old woman gets on.' },
      { de:'Paul steht auf und gibt ihr seinen Platz.',
        ru:'Пауль встаёт и уступает ей своё место.',
        en:'Paul stands up and gives her his seat.' }
    ],
    q:[
      { kind:'tap', de:'Warum ist es schwierig, einen Sitzplatz im Bus zu finden?',
        ru:'Почему в автобусе трудно найти свободное место?',
        en:'Why is it difficult to find a seat on the bus?', a:1 },
      { kind:'tap', de:'Wo setzt sich Paul hin?',
        ru:'Где садится Пауль?',
        en:'Where does Paul sit?', a:2 },
      { kind:'tap', de:'Wer steigt an der nächsten Haltestelle in den Bus ein?',
        ru:'Кто садится в автобус на следующей остановке?',
        en:'Who gets on the bus at the next stop?', a:3 },
      { kind:'tap', de:'Was macht Paul, als er die ältere Frau sieht?',
        ru:'Что делает Пауль, когда видит пожилую женщину?',
        en:'What does Paul do when he sees the older woman?', a:4 },
      { kind:'tap', de:'Wann steigt Paul in den Bus ein?',
        ru:'Когда Пауль садится в автобус?',
        en:'When does Paul get on the bus?', a:0 }
    ]
  },

  {
    /* Q4 rewritten. "Why is she dressed warmly?" answered from the
       same sentence as Q1. It now tests sentence 0. */
    id:'ss-19', cat:'travel',
    title:{ de:'Ein kalter Morgen', en:'A Cold Morning', ru:'Холодное утро' },
    sentences:[
      { de:'Lisa schaut am Morgen aus dem Fenster.',
        ru:'Лиза утром смотрит в окно.',
        en:'Lisa looks out the window in the morning.' },
      { de:'Der Himmel ist grau, und der Wind weht.',
        ru:'Небо серое, и дует ветер.',
        en:'The sky is gray, and the wind is blowing.' },
      { de:'Sie zieht einen warmen Pullover, eine Jacke und einen Schal an.',
        ru:'Она надевает тёплый свитер, куртку и шарф.',
        en:'She puts on a warm sweater, a jacket, and a scarf.' },
      { de:'Dann verlässt sie das Haus und geht zum Bahnhof.',
        ru:'Потом она выходит из дома и идёт на вокзал.',
        en:'Then she leaves the house and walks to the train station.' },
      { de:'Sie freut sich, als der warme Zug ankommt.',
        ru:'Она рада, когда прибывает тёплый поезд.',
        en:'She is happy when the warm train arrives.' }
    ],
    q:[
      { kind:'tap', de:'Was sieht Lisa, als sie aus dem Fenster schaut?',
        ru:'Что Лиза видит, когда смотрит в окно?',
        en:'What does Lisa see when she looks out the window?', a:1 },
      { kind:'tap', de:'Welche drei Kleidungsstücke zieht sie an, bevor sie das Haus verlässt?',
        ru:'Какие три вещи она надевает перед выходом из дома?',
        en:'What three things does she put on before leaving?', a:2 },
      { kind:'tap', de:'Wohin geht Lisa, nachdem sie das Haus verlassen hat?',
        ru:'Куда Лиза идёт после того, как выходит из дома?',
        en:'Where does Lisa go after leaving the house?', a:3 },
      { kind:'tap', de:'Wo ist Lisa am Anfang der Geschichte?',
        ru:'Где Лиза в начале рассказа?',
        en:'Where is Lisa at the beginning of the story?', a:0 },
      { kind:'tap', de:'Was macht sie am Ende der Geschichte glücklich?',
        ru:'Что радует её в конце рассказа?',
        en:'What makes her happy at the end of the story?', a:4 }
    ]
  },

  {
    id:'ss-20', cat:'shopping',
    title:{ de:'Die falsche Größe', en:'The Wrong Size', ru:'Неподходящий размер' },
    sentences:[
      { de:'Sofia sieht ein schönes Kleid in einem Geschäft.',
        ru:'София видит красивое платье в магазине.',
        en:'Sofia sees a beautiful dress in a store.' },
      { de:'Sie probiert es an, aber es ist zu klein.',
        ru:'Она примеряет его, но оно слишком маленькое.',
        en:'She tries it on, but it is too small.' },
      { de:'Sie fragt eine Mitarbeiterin nach einer anderen Größe.',
        ru:'Она просит сотрудницу принести другой размер.',
        en:'She asks an employee for another size.' },
      { de:'Das zweite Kleid passt ihr gut.',
        ru:'Второе платье хорошо на ней сидит.',
        en:'The second dress fits her well.' },
      { de:'Sofia kauft es und bezahlt mit ihrer Kreditkarte.',
        ru:'София покупает его и платит кредитной картой.',
        en:'Sofia buys it and pays with her credit card.' }
    ],
    q:[
      { kind:'tap', de:'Was findet Sofia in dem Geschäft?',
        ru:'Что София находит в магазине?',
        en:'What does Sofia find in the store?', a:0 },
      { kind:'tap', de:'Warum braucht sie eine andere Größe?',
        ru:'Почему ей нужен другой размер?',
        en:'Why does she need another size?', a:1 },
      { kind:'tap', de:'Wen bittet sie um Hilfe?',
        ru:'Кого она просит о помощи?',
        en:'Who does she ask for help?', a:2 },
      { kind:'tap', de:'Wie passt ihr das zweite Kleid?',
        ru:'Как на ней сидит второе платье?',
        en:'How does the second dress fit?', a:3 },
      { kind:'tap', de:'Was macht Sofia, nachdem sie das richtige Kleid gefunden hat?',
        ru:'Что София делает после того, как находит подходящее платье?',
        en:'What does Sofia do after she finds the right dress?', a:4 }
    ]
  },

  {
    id:'ss-21', cat:'places',
    title:{ de:'Kaffee mit einer Freundin', en:'Coffee with a Friend', ru:'Кофе с подругой' },
    sentences:[
      { de:'Julia trifft ihre Freundin in einem Café.',
        ru:'Юлия встречается с подругой в кафе.',
        en:'Julia meets her friend at a café.' },
      { de:'Sie bestellen zwei Kaffee und etwas zu essen.',
        ru:'Они заказывают два кофе и что-нибудь поесть.',
        en:'They order two coffees and something to eat.' },
      { de:'Sie sitzen an einem kleinen Tisch neben dem Fenster.',
        ru:'Они сидят за маленьким столом рядом с окном.',
        en:'They sit at a small table near the window.' },
      { de:'Sie sprechen über die Arbeit und ihre Familien.',
        ru:'Они разговаривают о работе и своих семьях.',
        en:'They talk about work and their families.' },
      { de:'Nach einer Stunde bezahlen sie und gehen zusammen.',
        ru:'Через час они платят и уходят вместе.',
        en:'After an hour, they pay and leave together.' }
    ],
    q:[
      { kind:'tap', de:'Wo trifft Julia ihre Freundin?',
        ru:'Где Юлия встречается с подругой?',
        en:'Where does Julia meet her friend?', a:0 },
      { kind:'tap', de:'Was bestellen sie?',
        ru:'Что они заказывают?',
        en:'What do they order?', a:1 },
      { kind:'tap', de:'Wo sitzen sie im Café?',
        ru:'Где они сидят в кафе?',
        en:'Where do they sit in the café?', a:2 },
      { kind:'tap', de:'Über welche zwei Themen sprechen sie?',
        ru:'О каких двух темах они разговаривают?',
        en:'What two subjects do they talk about?', a:3 },
      { kind:'tap', de:'Was machen sie, nachdem sie ungefähr eine Stunde zusammen verbracht haben?',
        ru:'Что они делают после того, как проводят вместе около часа?',
        en:'What do they do after spending about an hour together?', a:4 }
    ]
  },

  {
    id:'ss-22', cat:'home',
    title:{ de:'Das verlorene Handy', en:'The Lost Phone', ru:'Потерянный телефон' },
    sentences:[
      { de:'Daniel ist bereit, zur Arbeit zu gehen, aber er kann sein Handy nicht finden.',
        ru:'Даниэль готов идти на работу, но не может найти свой телефон.',
        en:'Daniel is ready to go to work, but he cannot find his phone.' },
      { de:'Er sucht auf seinem Schreibtisch, auf dem Sofa und in seiner Tasche.',
        ru:'Он ищет на письменном столе, на диване и в своей сумке.',
        en:'He looks on his desk, on the sofa, and in his bag.' },
      { de:'Dann hört er das Handy im Schlafzimmer klingeln.',
        ru:'Потом он слышит, как телефон звонит в спальне.',
        en:'Then he hears the phone ringing in the bedroom.' },
      { de:'Es liegt unter seiner Jacke auf dem Bett.',
        ru:'Он лежит под его курткой на кровати.',
        en:'It is under his jacket on the bed.' },
      { de:'Er nimmt das Handy und geht zur Arbeit.',
        ru:'Он берёт телефон и идёт на работу.',
        en:'He takes the phone and leaves for work.' }
    ],
    q:[
      { kind:'tap', de:'Was versucht Daniel vor der Arbeit zu finden?',
        ru:'Что Даниэль пытается найти перед работой?',
        en:'What is Daniel trying to find before work?', a:0 },
      { kind:'tap', de:'An welchen drei Orten sucht er?',
        ru:'В каких трёх местах он ищет?',
        en:'What three places does he search?', a:1 },
      { kind:'tap', de:'Woher weiß Daniel schließlich, wo das Handy ist?',
        ru:'Как Даниэль наконец понимает, где находится телефон?',
        en:'How does Daniel finally know where the phone is?', a:2 },
      { kind:'tap', de:'Wo liegt das Handy tatsächlich?',
        ru:'Где на самом деле лежит телефон?',
        en:'Where is the phone actually lying?', a:3 },
      { kind:'tap', de:'Was macht Daniel, nachdem er das Handy gefunden hat?',
        ru:'Что Даниэль делает после того, как находит телефон?',
        en:'What does Daniel do after he finds it?', a:4 }
    ]
  },

  {
    id:'ss-23', cat:'places',
    title:{ de:'Ein volles Restaurant', en:'A Busy Restaurant', ru:'Переполненный ресторан' },
    sentences:[
      { de:'Das Restaurant ist am Abend sehr voll.',
        ru:'Вечером в ресторане очень много людей.',
        en:'The restaurant is very busy in the evening.' },
      { de:'Ein Kellner trägt Essen und Getränke zu mehreren Tischen.',
        ru:'Официант несёт еду и напитки к нескольким столам.',
        en:'A waiter carries food and drinks to several tables.' },
      { de:'Eine Familie bestellt Suppe, Salat und Kartoffeln.',
        ru:'Одна семья заказывает суп, салат и картофель.',
        en:'One family orders soup, salad, and potatoes.' },
      { de:'Sie warten auf ihr Essen und unterhalten sich.',
        ru:'Они ждут еду и разговаривают.',
        en:'They wait for their food and talk together.' },
      { de:'Als das Essen kommt, sind alle hungrig.',
        ru:'Когда еда приходит, все голодны.',
        en:'When the food arrives, everyone is hungry.' }
    ],
    q:[
      { kind:'tap', de:'Wann ist das Restaurant sehr voll?',
        ru:'Когда в ресторане очень много людей?',
        en:'When is the restaurant very busy?', a:0 },
      { kind:'tap', de:'Was trägt der Kellner zu den Tischen?',
        ru:'Что официант несёт к столам?',
        en:'What is the waiter carrying to the tables?', a:1 },
      { kind:'tap', de:'Welche drei Gerichte bestellt die Familie?',
        ru:'Какие три блюда заказывает семья?',
        en:'What three foods does the family order?', a:2 },
      { kind:'tap', de:'Was macht die Familie, während sie auf das Essen wartet?',
        ru:'Что делает семья, пока ждёт еду?',
        en:'What does the family do while waiting for the food?', a:3 },
      { kind:'tap', de:'Wie fühlen sie sich, als das Essen kommt?',
        ru:'Как они себя чувствуют, когда приходит еда?',
        en:'How do they feel when the food arrives?', a:4 }
    ]
  },

  {
    id:'ss-24', cat:'travel',
    title:{ de:'Die rote Ampel', en:'The Red Traffic Light', ru:'Красный светофор' },
    sentences:[
      { de:'Mark fährt am Morgen zur Arbeit.',
        ru:'Марк утром едет на работу.',
        en:'Mark is driving to work in the morning.' },
      { de:'Er kommt zu einer roten Ampel und hält an.',
        ru:'Он подъезжает к красному светофору и останавливается.',
        en:'He comes to a red traffic light and stops.' },
      { de:'Mehrere Autos warten vor ihm.',
        ru:'Перед ним ждут несколько машин.',
        en:'Several cars are waiting in front of him.' },
      { de:'Die Ampel wird grün, und die Autos beginnen zu fahren.',
        ru:'Светофор становится зелёным, и машины начинают двигаться.',
        en:'The light turns green, and the cars begin to move.' },
      { de:'Mark fährt weiter zur Arbeit.',
        ru:'Марк продолжает путь на работу.',
        en:'Mark continues to work.' }
    ],
    q:[
      { kind:'tap', de:'Wohin fährt Mark?',
        ru:'Куда едет Марк?',
        en:'Where is Mark going?', a:0 },
      { kind:'tap', de:'Warum hält Mark sein Auto an?',
        ru:'Почему Марк останавливает машину?',
        en:'Why does Mark stop his car?', a:1 },
      { kind:'tap', de:'Was passiert vor seinem Auto, während er wartet?',
        ru:'Что происходит перед его машиной, пока он ждёт?',
        en:'What is happening in front of his car while he waits?', a:2 },
      { kind:'tap', de:'Was ändert sich, bevor die Autos wieder losfahren?',
        ru:'Что меняется перед тем, как машины снова начинают двигаться?',
        en:'What changes before the cars begin moving again?', a:3 },
      { kind:'tap', de:'Was macht Mark, nachdem die Ampel grün geworden ist?',
        ru:'Что Марк делает после того, как светофор становится зелёным?',
        en:'What does Mark do after the light turns green?', a:4 }
    ]
  },

  {
    id:'ss-25', cat:'family',
    title:{ de:'Blumen für Mama', en:'Flowers for Mom', ru:'Цветы для мамы' },
    sentences:[
      { de:'Emma möchte am Sonntag ihre Mutter besuchen.',
        ru:'Эмма хочет навестить маму в воскресенье.',
        en:'Emma wants to visit her mother on Sunday.' },
      { de:'Auf dem Weg hält sie an einem kleinen Markt an.',
        ru:'По дороге она останавливается у небольшого рынка.',
        en:'On the way, she stops at a small market.' },
      { de:'Sie sieht rote, gelbe und weiße Blumen.',
        ru:'Она видит красные, жёлтые и белые цветы.',
        en:'She sees red, yellow, and white flowers.' },
      { de:'Sie wählt die gelben Blumen aus und kauft sie.',
        ru:'Она выбирает жёлтые цветы и покупает их.',
        en:'She chooses the yellow flowers and buys them.' },
      { de:'Ihre Mutter freut sich sehr über die Blumen.',
        ru:'Её мама очень рада цветам.',
        en:'Her mother is very happy to receive them.' }
    ],
    q:[
      { kind:'tap', de:'Wen möchte Emma besuchen?',
        ru:'Кого Эмма собирается навестить?',
        en:'Who does Emma plan to visit?', a:0 },
      { kind:'tap', de:'Wo hält sie auf dem Weg an?',
        ru:'Где она останавливается по дороге?',
        en:'Where does she stop on the way?', a:1 },
      { kind:'tap', de:'Welche Farben haben die Blumen, die sie sieht?',
        ru:'Какого цвета цветы, которые она видит?',
        en:'What colors of flowers does she see?', a:2 },
      { kind:'tap', de:'Welche Blumen wählt Emma aus?',
        ru:'Какие цветы выбирает Эмма?',
        en:'Which flowers does Emma choose?', a:3 },
      { kind:'tap', de:'Wie reagiert ihre Mutter, als sie die Blumen bekommt?',
        ru:'Как реагирует её мама, когда получает цветы?',
        en:'How does her mother react when she receives them?', a:4 }
    ]
  },

  {
    /* Q3 replaced. It asked why Peter writes the list; the story
       never says. It now asks what he writes, which sentence 2
       answers outright. */
    id:'ss-26', cat:'kitchen',
    title:{ de:'Der leere Kühlschrank', en:'The Empty Refrigerator', ru:'Пустой холодильник' },
    sentences:[
      { de:'Peter öffnet den Kühlschrank, weil er Hunger hat.',
        ru:'Петер открывает холодильник, потому что он голоден.',
        en:'Peter opens the refrigerator because he is hungry.' },
      { de:'Es gibt Milch und Käse, aber nicht viele andere Lebensmittel.',
        ru:'Там есть молоко и сыр, но других продуктов немного.',
        en:'There is milk and cheese, but there is not much other food.' },
      { de:'Er schreibt eine Einkaufsliste.',
        ru:'Он пишет список покупок.',
        en:'He writes a shopping list.' },
      { de:'Dann nimmt er seine Tasche und geht zum Supermarkt.',
        ru:'Потом он берёт сумку и идёт в супермаркет.',
        en:'Then he takes his bag and walks to the supermarket.' },
      { de:'Er kauft genug Lebensmittel für das Abendessen und das Frühstück.',
        ru:'Он покупает достаточно продуктов для ужина и завтрака.',
        en:'He buys enough food for dinner and breakfast.' }
    ],
    q:[
      { kind:'tap', de:'Warum öffnet Peter den Kühlschrank?',
        ru:'Почему Петер открывает холодильник?',
        en:'Why does Peter open the refrigerator?', a:0 },
      { kind:'tap', de:'Welche Lebensmittel findet er darin?',
        ru:'Какие продукты он находит внутри?',
        en:'What food does he find inside?', a:1 },
      { kind:'tap', de:'Was schreibt Peter?',
        ru:'Что пишет Петер?',
        en:'What does Peter write?', a:2 },
      { kind:'tap', de:'Wohin geht er, nachdem er die Liste geschrieben hat?',
        ru:'Куда он идёт после того, как пишет список?',
        en:'Where does he go after writing the list?', a:3 },
      { kind:'tap', de:'Für welche Mahlzeiten kauft er Lebensmittel?',
        ru:'Для каких приёмов пищи он покупает продукты?',
        en:'What meals does he buy food for?', a:4 }
    ]
  },

  {
    id:'ss-27', cat:'places',
    title:{ de:'Ein Tag im Büro', en:'A Day at the Office', ru:'День в офисе' },
    sentences:[
      { de:'Laura kommt um acht Uhr morgens im Büro an.',
        ru:'Лаура приходит в офис в восемь часов утра.',
        en:'Laura arrives at the office at eight in the morning.' },
      { de:'Sie setzt sich an ihren Schreibtisch und schaltet ihren Computer ein.',
        ru:'Она садится за письменный стол и включает компьютер.',
        en:'She sits at her desk and turns on her computer.' },
      { de:'Sie liest mehrere Nachrichten und schreibt eine E-Mail.',
        ru:'Она читает несколько сообщений и пишет электронное письмо.',
        en:'She reads several messages and writes an email.' },
      { de:'Später hat sie eine Besprechung mit ihren Kollegen.',
        ru:'Позже у неё встреча с коллегами.',
        en:'Later, she has a meeting with her colleagues.' },
      { de:'Nach einem langen Arbeitstag geht sie nach Hause.',
        ru:'После долгого рабочего дня она идёт домой.',
        en:'She goes home after a long day of work.' }
    ],
    q:[
      { kind:'tap', de:'Um wie viel Uhr kommt Laura im Büro an?',
        ru:'Во сколько Лаура приходит в офис?',
        en:'What time does Laura arrive at the office?', a:0 },
      { kind:'tap', de:'Was macht sie, nachdem sie sich an ihren Schreibtisch gesetzt hat?',
        ru:'Что она делает после того, как садится за свой стол?',
        en:'What does she do after sitting at her desk?', a:1 },
      { kind:'tap', de:'Welche zwei Dinge macht sie am Computer?',
        ru:'Какие две вещи она делает на компьютере?',
        en:'What two things does she do on the computer?', a:2 },
      { kind:'tap', de:'Mit wem hat sie später eine Besprechung?',
        ru:'С кем у неё позже встреча?',
        en:'Who does she meet with later?', a:3 },
      { kind:'tap', de:'Wann geht Laura schließlich nach Hause?',
        ru:'Когда Лаура наконец идёт домой?',
        en:'When does Laura finally go home?', a:4 }
    ]
  },

  {
    /* Q2 rewritten. "Where does he search for it?" and "Where does
       he finally find the key?" were both sentence 2. Q2 now tests
       sentence 0. */
    id:'ss-28', cat:'home',
    title:{ de:'Die verschlossene Tür', en:'The Closed Door', ru:'Запертая дверь' },
    sentences:[
      { de:'Michael kommt am Abend nach Hause und greift nach seinem Schlüssel.',
        ru:'Михаэль вечером приходит домой и тянется за ключом.',
        en:'Michael comes home in the evening and reaches for his key.' },
      { de:'Sein Schlüssel ist nicht in seiner Hosentasche.',
        ru:'Его ключа нет в кармане брюк.',
        en:'His key is not in his pocket.' },
      { de:'Er sucht in seinem Rucksack und findet ihn unter einem Buch.',
        ru:'Он ищет в рюкзаке и находит его под книгой.',
        en:'He looks in his backpack and finds it under a book.' },
      { de:'Er schließt die Tür auf und geht hinein.',
        ru:'Он отпирает дверь и входит внутрь.',
        en:'He unlocks the door and goes inside.' },
      { de:'Er legt den Schlüssel auf den Tisch, damit er ihn morgen finden kann.',
        ru:'Он кладёт ключ на стол, чтобы завтра его найти.',
        en:'He puts the key on the table so he can find it tomorrow.' }
    ],
    q:[
      { kind:'tap', de:'Was bemerkt Michael, als er nach seinem Schlüssel greift?',
        ru:'Что Михаэль обнаруживает, когда тянется за ключом?',
        en:'What does Michael discover when he reaches for his key?', a:1 },
      { kind:'tap', de:'Was macht Michael am Anfang der Geschichte?',
        ru:'Что Михаэль делает в начале рассказа?',
        en:'What is Michael doing at the beginning of the story?', a:0 },
      { kind:'tap', de:'Wo findet er den Schlüssel schließlich?',
        ru:'Где он наконец находит ключ?',
        en:'Where does he finally find the key?', a:2 },
      { kind:'tap', de:'Was macht er, nachdem er den Schlüssel gefunden hat?',
        ru:'Что он делает после того, как находит ключ?',
        en:'What does he do after finding it?', a:3 },
      { kind:'tap', de:'Warum legt er den Schlüssel auf den Tisch?',
        ru:'Почему он кладёт ключ на стол?',
        en:'Why does he put the key on the table?', a:4 }
    ]
  },

  {
    id:'ss-29', cat:'places',
    title:{ de:'Mittagessen im Park', en:'Lunch in the Park', ru:'Обед в парке' },
    sentences:[
      { de:'Drei Freunde kaufen Mittagessen und gehen in einen Park.',
        ru:'Трое друзей покупают обед и идут в парк.',
        en:'Three friends buy lunch and walk to a park.' },
      { de:'Sie finden einen Tisch unter einem großen Baum.',
        ru:'Они находят стол под большим деревом.',
        en:'They find a table under a large tree.' },
      { de:'Einer hat ein Sandwich, einer einen Salat und einer Obst.',
        ru:'У одного сэндвич, у другого салат, а у третьего фрукты.',
        en:'One has a sandwich, one has a salad, and one has fruit.' },
      { de:'Sie essen und reden eine halbe Stunde lang.',
        ru:'Они едят и разговаривают полчаса.',
        en:'They eat and talk for half an hour.' },
      { de:'Dann gehen sie zurück zur Arbeit.',
        ru:'Потом они возвращаются на работу.',
        en:'Then they return to work.' }
    ],
    q:[
      { kind:'tap', de:'Wie viele Freunde gehen in den Park?',
        ru:'Сколько друзей идут в парк?',
        en:'How many friends go to the park?', a:0 },
      { kind:'tap', de:'Wo setzen sie sich zum Essen hin?',
        ru:'Где они садятся есть?',
        en:'Where do they sit to eat?', a:1 },
      { kind:'tap', de:'Welche verschiedenen Lebensmittel haben die drei Freunde?',
        ru:'Какая разная еда есть у трёх друзей?',
        en:'What different foods do the three friends have?', a:2 },
      { kind:'tap', de:'Wie lange essen und reden sie?',
        ru:'Как долго они едят и разговаривают?',
        en:'How long do they eat and talk?', a:3 },
      { kind:'tap', de:'Wohin gehen sie danach?',
        ru:'Куда они идут после этого?',
        en:'Where do they go afterward?', a:4 }
    ]
  },

  {
    id:'ss-30', cat:'travel',
    title:{ de:'Der frühe Zug', en:'The Early Train', ru:'Ранний поезд' },
    sentences:[
      { de:'David muss wegen der Arbeit in eine andere Stadt fahren.',
        ru:'Давиду нужно по работе поехать в другой город.',
        en:'David needs to travel to another city for work.' },
      { de:'Er steht früh auf und nimmt ein Taxi zum Bahnhof.',
        ru:'Он рано встаёт и едет на такси до вокзала.',
        en:'He gets up early and takes a taxi to the train station.' },
      { de:'Er kauft eine Fahrkarte und findet den richtigen Bahnsteig.',
        ru:'Он покупает билет и находит нужную платформу.',
        en:'He buys a ticket and finds the correct platform.' },
      { de:'Sein Zug fährt um acht Uhr ab.',
        ru:'Его поезд отправляется в восемь часов.',
        en:'His train departs at eight o’clock.' },
      { de:'David sitzt am Fenster und liest während der Fahrt.',
        ru:'Давид сидит у окна и читает во время поездки.',
        en:'David sits by the window and reads during the trip.' }
    ],
    q:[
      { kind:'tap', de:'Warum muss David in eine andere Stadt fahren?',
        ru:'Почему Давиду нужно ехать в другой город?',
        en:'Why does David need to travel to another city?', a:0 },
      { kind:'tap', de:'Wie kommt er zum Bahnhof?',
        ru:'Как он добирается до вокзала?',
        en:'How does he get to the train station?', a:1 },
      { kind:'tap', de:'Was macht er, bevor er zum Bahnsteig geht?',
        ru:'Что он делает перед тем, как идти на платформу?',
        en:'What does he do before going to the platform?', a:2 },
      { kind:'tap', de:'Um wie viel Uhr fährt sein Zug ab?',
        ru:'Во сколько отправляется его поезд?',
        en:'What time does his train leave?', a:3 },
      { kind:'tap', de:'Was macht David während der Zugfahrt?',
        ru:'Что Давид делает во время поездки на поезде?',
        en:'What does David do during the train ride?', a:4 }
    ]
  },

  {
    id:'ss-31', cat:'shopping',
    title:{ de:'Ein Geschenk für eine Freundin', en:'A Present for a Friend', ru:'Подарок для подруги' },
    sentences:[
      { de:'Mia möchte ein Geburtstagsgeschenk für ihre Freundin kaufen.',
        ru:'Миа хочет купить подарок на день рождения для своей подруги.',
        en:'Mia wants to buy a birthday present for her friend.' },
      { de:'Sie geht in mehrere Geschäfte und sieht sich verschiedene Dinge an.',
        ru:'Она заходит в несколько магазинов и смотрит разные вещи.',
        en:'She goes into several stores and looks at different things.' },
      { de:'Schließlich wählt sie eine kleine blaue Handtasche aus.',
        ru:'Наконец она выбирает маленькую синюю сумочку.',
        en:'Finally, she chooses a small blue handbag.' },
      { de:'Sie bezahlt sie an der Kasse.',
        ru:'Она платит за неё на кассе.',
        en:'She pays for it at the checkout.' },
      { de:'Sie hofft, dass ihrer Freundin das Geschenk gefällt.',
        ru:'Она надеется, что подарок понравится её подруге.',
        en:'She hopes her friend will like it.' }
    ],
    q:[
      { kind:'tap', de:'Warum sucht Mia nach einem Geschenk?',
        ru:'Почему Миа ищет подарок?',
        en:'Why is Mia shopping for a present?', a:0 },
      { kind:'tap', de:'Was macht sie, bevor sie das Geschenk auswählt?',
        ru:'Что она делает перед тем, как выбрать подарок?',
        en:'What does she do before choosing the gift?', a:1 },
      { kind:'tap', de:'Welches Geschenk wählt sie schließlich aus?',
        ru:'Какой подарок она в конце концов выбирает?',
        en:'What gift does she finally choose?', a:2 },
      { kind:'tap', de:'Wo bezahlt sie dafür?',
        ru:'Где она за него платит?',
        en:'Where does she pay for it?', a:3 },
      { kind:'tap', de:'Was hofft Mia, nachdem sie das Geschenk gekauft hat?',
        ru:'На что надеется Миа после того, как покупает подарок?',
        en:'What does Mia hope after buying the present?', a:4 }
    ]
  },

  {
    id:'ss-32', cat:'kitchen',
    title:{ de:'Das Abendessen ist fast fertig', en:'Dinner Is Almost Ready', ru:'Ужин почти готов' },
    sentences:[
      { de:'Robert kocht Abendessen für seine Familie.',
        ru:'Роберт готовит ужин для своей семьи.',
        en:'Robert is cooking dinner for his family.' },
      { de:'Die Kartoffeln kochen, und das Gemüse ist fast fertig.',
        ru:'Картофель варится, а овощи почти готовы.',
        en:'The potatoes are cooking, and the vegetables are almost ready.' },
      { de:'Er stellt Teller, Gläser und Besteck auf den Tisch.',
        ru:'Он ставит тарелки, стаканы и столовые приборы на стол.',
        en:'He puts plates, glasses, and cutlery on the table.' },
      { de:'Seine Kinder kommen in die Küche, weil sie Hunger haben.',
        ru:'Его дети приходят на кухню, потому что они голодны.',
        en:'His children come into the kitchen because they are hungry.' },
      { de:'Ein paar Minuten später setzen sich alle zum Essen hin.',
        ru:'Через несколько минут все садятся есть.',
        en:'A few minutes later, everyone sits down to eat.' }
    ],
    q:[
      { kind:'tap', de:'Für wen kocht Robert Abendessen?',
        ru:'Для кого Роберт готовит ужин?',
        en:'Who is Robert cooking dinner for?', a:0 },
      { kind:'tap', de:'Welche Lebensmittel kochen schon oder sind fast fertig?',
        ru:'Какие продукты уже готовятся или почти готовы?',
        en:'What food is already cooking or almost ready?', a:1 },
      { kind:'tap', de:'Was stellt Robert auf den Tisch?',
        ru:'Что Роберт ставит на стол?',
        en:'What does Robert put on the table?', a:2 },
      { kind:'tap', de:'Warum kommen die Kinder in die Küche?',
        ru:'Почему дети приходят на кухню?',
        en:'Why do the children come into the kitchen?', a:3 },
      { kind:'tap', de:'Was passiert ein paar Minuten später?',
        ru:'Что происходит через несколько минут?',
        en:'What happens a few minutes later?', a:4 }
    ]
  },

  {
    id:'ss-33', cat:'places',
    title:{ de:'Warten beim Arzt', en:'Waiting for the Doctor', ru:'Ожидание у врача' },
    sentences:[
      { de:'Elena hat am Morgen einen Termin beim Arzt.',
        ru:'У Елены утром приём у врача.',
        en:'Elena has an appointment with the doctor in the morning.' },
      { de:'Sie kommt früh an und setzt sich ins Wartezimmer.',
        ru:'Она приходит рано и садится в зале ожидания.',
        en:'She arrives early and sits in the waiting room.' },
      { de:'Sie liest ein Buch, während sie wartet.',
        ru:'Пока она ждёт, она читает книгу.',
        en:'She reads a book while she waits.' },
      { de:'Nach zwanzig Minuten ruft der Arzt sie auf.',
        ru:'Через двадцать минут врач вызывает её.',
        en:'After twenty minutes, the doctor calls her.' },
      { de:'Elena legt das Buch in ihre Tasche und steht auf.',
        ru:'Елена кладёт книгу в сумку и встаёт.',
        en:'Elena puts the book in her bag and stands up.' }
    ],
    q:[
      { kind:'tap', de:'Warum geht Elena am Morgen zum Arzt?',
        ru:'Почему Елена утром идёт к врачу?',
        en:'Why does Elena go to the doctor in the morning?', a:0 },
      { kind:'tap', de:'Was macht sie, als sie früh ankommt?',
        ru:'Что она делает, когда приходит рано?',
        en:'What does she do when she arrives early?', a:1 },
      { kind:'tap', de:'Was macht sie, während sie wartet?',
        ru:'Что она делает, пока ждёт?',
        en:'How does she spend the time while waiting?', a:2 },
      { kind:'tap', de:'Wie lange wartet sie, bevor der Arzt sie aufruft?',
        ru:'Как долго она ждёт, прежде чем врач её вызывает?',
        en:'How long does she wait before the doctor calls her?', a:3 },
      { kind:'tap', de:'Was macht Elena, als der Arzt sie aufruft?',
        ru:'Что Елена делает, когда врач её вызывает?',
        en:'What does Elena do when she hears her name?', a:4 }
    ]
  },

  {
    id:'ss-34', cat:'home',
    title:{ de:'Ein sonniger Balkon', en:'A Sunny Balcony', ru:'Солнечный балкон' },
    sentences:[
      { de:'Clara hat mehrere Pflanzen auf ihrem Balkon.',
        ru:'У Клары на балконе несколько растений.',
        en:'Clara has several plants on her balcony.' },
      { de:'Der Morgen ist warm und sonnig.',
        ru:'Утро тёплое и солнечное.',
        en:'The morning is warm and sunny.' },
      { de:'Sie gibt den Pflanzen Wasser und sieht sich die Blumen an.',
        ru:'Она поливает растения и смотрит на цветы.',
        en:'She gives the plants water and looks at the flowers.' },
      { de:'Dann sitzt sie draußen mit einer Tasse Tee.',
        ru:'Потом она сидит на улице с чашкой чая.',
        en:'Then she sits outside with a cup of tea.' },
      { de:'Sie bleibt dort, bis es Zeit ist, zur Arbeit zu gehen.',
        ru:'Она остаётся там, пока не приходит время идти на работу.',
        en:'She stays there until it is time to go to work.' }
    ],
    q:[
      { kind:'tap', de:'Was hat Clara auf ihrem Balkon?',
        ru:'Что находится у Клары на балконе?',
        en:'What does Clara have on her balcony?', a:0 },
      { kind:'tap', de:'Wie ist das Wetter an diesem Morgen?',
        ru:'Какая погода этим утром?',
        en:'What is the weather like that morning?', a:1 },
      { kind:'tap', de:'Was macht Clara für die Pflanzen?',
        ru:'Что Клара делает для растений?',
        en:'What does Clara do for the plants?', a:2 },
      { kind:'tap', de:'Was trinkt sie, während sie draußen sitzt?',
        ru:'Что она пьёт, пока сидит на улице?',
        en:'What does she drink while sitting outside?', a:3 },
      { kind:'tap', de:'Warum verlässt sie schließlich den Balkon?',
        ru:'Почему она в конце концов уходит с балкона?',
        en:'Why does she eventually leave the balcony?', a:4 }
    ]
  },

  {
    /* Q3 realigned. The German had lost the "remembers" framing the
       English and Russian both carried, which made it a different
       question in one of the three languages. All three now ask what
       Alex remembers. */
    id:'ss-35', cat:'shopping',
    title:{ de:'Die vergessene Geldbörse', en:'The Forgotten Wallet', ru:'Забытый кошелёк' },
    sentences:[
      { de:'Alex steht mit einer Tasche voller Lebensmittel an der Kasse.',
        ru:'Алекс стоит у кассы с сумкой продуктов.',
        en:'Alex is at the checkout with a bag of food.' },
      { de:'Er greift in seine Hosentasche, kann aber seine Geldbörse nicht finden.',
        ru:'Он лезет в карман брюк, но не может найти кошелёк.',
        en:'He reaches into his pocket but cannot find his wallet.' },
      { de:'Dann erinnert er sich, dass sie im Auto liegt.',
        ru:'Потом он вспоминает, что кошелёк лежит в машине.',
        en:'Then he remembers that it is in the car.' },
      { de:'Er sagt der Kassiererin, dass er gleich zurückkommt.',
        ru:'Он говорит кассиру, что скоро вернётся.',
        en:'He tells the cashier that he will be back soon.' },
      { de:'Er holt seine Geldbörse und kommt zurück, um zu bezahlen.',
        ru:'Он забирает кошелёк и возвращается, чтобы заплатить.',
        en:'He gets his wallet and returns to pay.' }
    ],
    q:[
      { kind:'tap', de:'Wo ist Alex, als er merkt, dass es ein Problem gibt?',
        ru:'Где находится Алекс, когда понимает, что возникла проблема?',
        en:'Where is Alex when he realizes there is a problem?', a:0 },
      { kind:'tap', de:'Was kann er nicht finden?',
        ru:'Что он не может найти?',
        en:'What can he not find?', a:1 },
      { kind:'tap', de:'Woran erinnert sich Alex plötzlich?',
        ru:'О чём Алекс вдруг вспоминает?',
        en:'What does Alex suddenly remember?', a:2 },
      { kind:'tap', de:'Was sagt er der Kassiererin?',
        ru:'Что он говорит кассиру?',
        en:'What does he tell the cashier?', a:3 },
      { kind:'tap', de:'Was macht Alex, bevor er zurückkommt, um zu bezahlen?',
        ru:'Что Алекс делает перед тем, как вернуться и заплатить?',
        en:'What does Alex do before returning to pay?', a:4 }
    ]
  },

  {
    id:'ss-36', cat:'places',
    title:{ de:'Nach dem Film', en:'After the Movie', ru:'После фильма' },
    sentences:[
      { de:'Vier Freunde gehen am Abend ins Kino.',
        ru:'Четверо друзей вечером идут в кино.',
        en:'Four friends go to the cinema in the evening.' },
      { de:'Sie sehen zusammen einen lustigen Film.',
        ru:'Они вместе смотрят смешной фильм.',
        en:'They watch a funny movie together.' },
      { de:'Nach dem Film haben sie Hunger.',
        ru:'После фильма они голодны.',
        en:'After the movie, they are hungry.' },
      { de:'Sie finden ein Restaurant in der Nähe des Kinos und bestellen Abendessen.',
        ru:'Они находят ресторан рядом с кинотеатром и заказывают ужин.',
        en:'They find a restaurant near the cinema and order dinner.' },
      { de:'Beim Essen sprechen sie über den Film.',
        ru:'За едой они разговаривают о фильме.',
        en:'They talk about the movie while they eat.' }
    ],
    q:[
      { kind:'tap', de:'Wie viele Freunde gehen ins Kino?',
        ru:'Сколько друзей идут в кино?',
        en:'How many friends go to the cinema?', a:0 },
      { kind:'tap', de:'Was für einen Film sehen sie?',
        ru:'Какой фильм они смотрят?',
        en:'What kind of movie do they watch?', a:1 },
      { kind:'tap', de:'Warum suchen sie danach ein Restaurant?',
        ru:'Почему после фильма они ищут ресторан?',
        en:'Why do they look for a restaurant afterward?', a:2 },
      { kind:'tap', de:'Wo finden sie ein Restaurant?',
        ru:'Где они находят ресторан?',
        en:'Where do they find a restaurant?', a:3 },
      { kind:'tap', de:'Worüber sprechen sie beim Essen?',
        ru:'О чём они разговаривают во время еды?',
        en:'What do they talk about while eating?', a:4 }
    ]
  },

  {
    /* Q1 replaced. "How does Sara spend the beginning of her evening"
       was too loose to have one right line and overlapped Q2. It now
       asks about the day she has had, which sentence 0 states. */
    id:'ss-37', cat:'home',
    title:{ de:'Ein ruhiger Abend zu Hause', en:'A Quiet Evening at Home', ru:'Тихий вечер дома' },
    sentences:[
      { de:'Sara kommt nach einem anstrengenden Tag nach Hause.',
        ru:'Сара приходит домой после напряжённого дня.',
        en:'Sara comes home after a busy day.' },
      { de:'Sie zieht sich um und macht eine Tasse Tee.',
        ru:'Она переодевается и делает чашку чая.',
        en:'She changes her clothes and makes a cup of tea.' },
      { de:'Dann setzt sie sich mit einem Buch auf das Sofa.',
        ru:'Потом она садится на диван с книгой.',
        en:'Then she sits on the sofa with a book.' },
      { de:'Ihre Katze schläft neben ihr.',
        ru:'Её кошка спит рядом с ней.',
        en:'Her cat sleeps near her.' },
      { de:'Sara liest, bis sie müde ist.',
        ru:'Сара читает, пока не устаёт.',
        en:'Sara reads until she is tired.' }
    ],
    q:[
      { kind:'tap', de:'Was für einen Tag hatte Sara?',
        ru:'Какой день был у Сары?',
        en:'What kind of day has Sara had?', a:0 },
      { kind:'tap', de:'Was macht sie sich zu trinken?',
        ru:'Что она готовит себе попить?',
        en:'What does she make to drink?', a:1 },
      { kind:'tap', de:'Wo setzt sie sich mit ihrem Buch hin?',
        ru:'Где она садится с книгой?',
        en:'Where does she sit with her book?', a:2 },
      { kind:'tap', de:'Was macht ihre Katze, während Sara liest?',
        ru:'Что делает её кошка, пока Сара читает?',
        en:'What is her cat doing while she reads?', a:3 },
      { kind:'tap', de:'Wann hört Sara auf zu lesen?',
        ru:'Когда Сара перестаёт читать?',
        en:'When does Sara stop reading?', a:4 }
    ]
  },

  {
    /* Q2 replaced. "Who is Leo making the cake for?" and "Why is he
       making a cake?" were both answered by sentence 0. Q2 now tests
       sentence 2. */
    id:'ss-38', cat:'family',
    title:{ de:'Der Geburtstagskuchen', en:'The Birthday Cake', ru:'Торт на день рождения' },
    sentences:[
      { de:'Leo möchte einen Kuchen zum Geburtstag seiner Schwester backen.',
        ru:'Лео хочет испечь торт на день рождения своей сестры.',
        en:'Leo wants to make a cake for his sister’s birthday.' },
      { de:'Er arbeitet fast den ganzen Nachmittag in der Küche.',
        ru:'Он почти весь день работает на кухне.',
        en:'He works in the kitchen for most of the afternoon.' },
      { de:'Als der Kuchen fertig ist, stellt er ihn auf den Tisch.',
        ru:'Когда торт готов, он ставит его на стол.',
        en:'When the cake is ready, he puts it on the table.' },
      { de:'Seine Schwester kommt nach Hause und sieht ihn.',
        ru:'Его сестра приходит домой и видит торт.',
        en:'His sister comes home and sees it.' },
      { de:'Sie lächelt und dankt ihm.',
        ru:'Она улыбается и благодарит его.',
        en:'She smiles and thanks him.' }
    ],
    q:[
      { kind:'tap', de:'Für wen backt Leo den Kuchen?',
        ru:'Для кого Лео печёт торт?',
        en:'Who is Leo making the cake for?', a:0 },
      { kind:'tap', de:'Was macht Leo, als der Kuchen fertig ist?',
        ru:'Что Лео делает, когда торт готов?',
        en:'What does Leo do when the cake is ready?', a:2 },
      { kind:'tap', de:'Wo verbringt Leo fast den ganzen Nachmittag?',
        ru:'Где Лео проводит почти весь день?',
        en:'Where does Leo spend most of the afternoon?', a:1 },
      { kind:'tap', de:'Was passiert, als seine Schwester nach Hause kommt?',
        ru:'Что происходит, когда его сестра приходит домой?',
        en:'What happens when his sister comes home?', a:3 },
      { kind:'tap', de:'Wie reagiert sie auf den Kuchen?',
        ru:'Как она реагирует на торт?',
        en:'How does she react to the cake?', a:4 }
    ]
  },

  {
    id:'ss-39', cat:'travel',
    title:{ de:'Der Bus kommt nicht', en:'The Bus Does Not Come', ru:'Автобус не приходит' },
    sentences:[
      { de:'Nina beendet ihre Arbeit und geht zur Bushaltestelle.',
        ru:'Нина заканчивает работу и идёт к автобусной остановке.',
        en:'Nina finishes work and walks to the bus stop.' },
      { de:'Sie wartet auf den Bus, aber er kommt nicht.',
        ru:'Она ждёт автобус, но он не приходит.',
        en:'She waits for the bus, but it does not come.' },
      { de:'Nach zwanzig Minuten warten auch mehrere andere Menschen dort.',
        ru:'Через двадцать минут там также ждут несколько других людей.',
        en:'After twenty minutes, several other people are waiting too.' },
      { de:'Schließlich sehen sie den Bus die Straße entlangkommen.',
        ru:'Наконец они видят автобус, который едет по улице.',
        en:'Finally, they see the bus coming down the street.' },
      { de:'Nina steigt ein und findet einen Sitzplatz.',
        ru:'Нина садится в автобус и находит свободное место.',
        en:'Nina gets on and finds a seat.' }
    ],
    q:[
      { kind:'tap', de:'Wohin geht Nina, nachdem sie ihre Arbeit beendet hat?',
        ru:'Куда Нина идёт после окончания работы?',
        en:'Where does Nina go after finishing work?', a:0 },
      { kind:'tap', de:'Welches Problem hat sie an der Bushaltestelle?',
        ru:'Какая проблема возникает у неё на автобусной остановке?',
        en:'What problem does she have at the bus stop?', a:1 },
      { kind:'tap', de:'Was ändert sich, nachdem sie zwanzig Minuten gewartet hat?',
        ru:'Что меняется после того, как она ждёт двадцать минут?',
        en:'What changes after she has waited twenty minutes?', a:2 },
      { kind:'tap', de:'Was sehen die Leute schließlich die Straße entlangkommen?',
        ru:'Что люди наконец видят приближающимся по улице?',
        en:'What do the people finally see coming down the street?', a:3 },
      { kind:'tap', de:'Was macht Nina, nachdem der Bus angekommen ist?',
        ru:'Что Нина делает после того, как автобус приезжает?',
        en:'What does Nina do after the bus arrives?', a:4 }
    ]
  },

  {
    id:'ss-40', cat:'home',
    title:{ de:'Ein Samstag zu Hause', en:'A Saturday at Home', ru:'Суббота дома' },
    sentences:[
      { de:'Tom muss am Samstag nicht arbeiten.',
        ru:'Тому не нужно работать в субботу.',
        en:'Tom does not have to work on Saturday.' },
      { de:'Am Morgen putzt er die Küche und wäscht seine Kleidung.',
        ru:'Утром он убирает кухню и стирает одежду.',
        en:'In the morning, he cleans the kitchen and washes his clothes.' },
      { de:'Nach dem Mittagessen sitzt er eine Weile an seinem Computer.',
        ru:'После обеда он некоторое время сидит за компьютером.',
        en:'After lunch, he sits at his computer for a while.' },
      { de:'Später geht er nach draußen und macht einen Spaziergang.',
        ru:'Позже он выходит на улицу и идёт гулять.',
        en:'Later, he goes outside for a walk.' },
      { de:'Am Abend kocht er Abendessen und sieht einen Film.',
        ru:'Вечером он готовит ужин и смотрит фильм.',
        en:'In the evening, he cooks dinner and watches a movie.' }
    ],
    q:[
      { kind:'tap', de:'Warum hat Tom am Samstag mehr Freizeit?',
        ru:'Почему у Тома в субботу больше свободного времени?',
        en:'Why does Tom have more free time on Saturday?', a:0 },
      { kind:'tap', de:'Welche zwei Hausarbeiten macht er am Morgen?',
        ru:'Какие две домашние работы он делает утром?',
        en:'What two chores does he do in the morning?', a:1 },
      { kind:'tap', de:'Was macht er nach dem Mittagessen?',
        ru:'Что он делает после обеда?',
        en:'What does he do after lunch?', a:2 },
      { kind:'tap', de:'Wohin geht er später am Tag?',
        ru:'Куда он идёт позже?',
        en:'Where does he go later in the day?', a:3 },
      { kind:'tap', de:'Wie verbringt Tom seinen Abend?',
        ru:'Как Том проводит вечер?',
        en:'How does Tom spend his evening?', a:4 }
    ]
  },

  /* ---------------------------------------------------------------------
     SIX LINES, NOT FIVE — added 01 Sep 2026.

     Every piece above is exactly five sentences, and nothing in reader.js
     enforces that; five was a convention, not a rule. These six run to six
     lines and carry SEVEN questions rather than five, which the reader
     handles without being told: it draws two at random from whatever bank
     it finds.

     They are also the first short stories with `mc` and `tf` in them. The
     original twenty-five are all `tap` — 125 of them — which works
     beautifully on a five-line piece where the whole text fits on screen as
     a list of choices. At six lines that still holds.
     --------------------------------------------------------------------- */

  {
    id:'ss-41',
    cat:'food',
    title:{ de:'Das verschwundene Sushi', ru:'Пропавшие суши', en:'The Missing Sushi' },

    sentences:[
      { de:'Anna bestellt Sushi zum Abendessen.',
        ru:'Анна заказывает суши на ужин.',
        en:'Anna orders sushi for dinner.' },
      { de:'Sie bekommt Rollen mit Lachs, Thunfisch und Avocado.',
        ru:'Она берёт роллы с лососем, тунцом и авокадо.',
        en:'She gets salmon, tuna, and avocado rolls.' },
      { de:'Sie stellt das Sushi auf den Tisch und geht etwas zu trinken holen.',
        ru:'Она ставит суши на стол и идёт за напитком.',
        en:'She puts the sushi on the table and goes to get a drink.' },
      { de:'Als sie zurückkommt, fehlt ein Stück.',
        ru:'Когда она возвращается, одного кусочка не хватает.',
        en:'When she comes back, one piece is missing.' },
      { de:'Ihre Katze sitzt unter dem Tisch.',
        ru:'Её кот сидит под столом.',
        en:'Her cat is sitting under the table.' },
      { de:'Die Katze sieht sehr zufrieden aus.',
        ru:'Кот выглядит очень довольным.',
        en:'The cat looks very happy.' }
    ],

    q:[
      { kind:'mc',
        de:'Was bestellt Anna zum Abendessen?',
        ru:'Что Анна заказывает на ужин?',
        en:'What does Anna order for dinner?',
        opts:[
          { de:'Pizza',
            ru:'Пиццу',
            en:'Pizza' },
          { de:'Sushi',
            ru:'Суши',
            en:'Sushi' },
          { de:'Suppe',
            ru:'Суп',
            en:'Soup' },
          { de:'Salat',
            ru:'Салат',
            en:'Salad' }
        ],
        a:1 },
      { kind:'mc',
        de:'Welche Rollen bekommt sie?',
        ru:'Какие роллы она берёт?',
        en:'What kinds of rolls does she get?',
        opts:[
          { de:'Mit Lachs, Thunfisch und Avocado',
            ru:'С лососем, тунцом и авокадо',
            en:'Salmon, tuna and avocado' },
          { de:'Mit Gurke und Ei',
            ru:'С огурцом и яйцом',
            en:'Cucumber and egg' },
          { de:'Mit Garnelen und Reis',
            ru:'С креветками и рисом',
            en:'Prawn and rice' },
          { de:'Mit Käse und Tomate',
            ru:'С сыром и помидором',
            en:'Cheese and tomato' }
        ],
        a:0 },
      { kind:'tap',
        de:'Welche Zeile sagt, warum Anna vom Tisch weggeht?',
        ru:'В какой строке сказано, почему Анна отходит от стола?',
        en:'Which line says why Anna leaves the table?',
        a:2 }   /* line 3 */,
      { kind:'tf',
        de:'Als Anna zurückkommt, ist alles noch da.',
        ru:'Когда Анна возвращается, всё на месте.',
        en:'When Anna comes back, everything is still there.',
        a:false },
      { kind:'tap',
        de:'Welche Zeile sagt, wo die Katze sitzt?',
        ru:'В какой строке сказано, где сидит кот?',
        en:'Which line says where the cat is sitting?',
        a:4 }   /* line 5 */,
      { kind:'mc',
        de:'Wer hat wahrscheinlich das fehlende Sushi gegessen?',
        ru:'Кто, вероятно, съел пропавший кусочек суши?',
        en:'Who probably ate the missing sushi?',
        opts:[
          { de:'Anna selbst',
            ru:'Сама Анна',
            en:'Anna herself' },
          { de:'Die Katze',
            ru:'Кот',
            en:'The cat' },
          { de:'Ein Freund',
            ru:'Друг',
            en:'A friend' },
          { de:'Niemand',
            ru:'Никто',
            en:'Nobody' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile macht das Ende lustig?',
        ru:'Какая строка делает конец смешным?',
        en:'Which line makes the ending funny?',
        a:5 }   /* line 6 */
    ]
  },

  {
    id:'ss-42',
    cat:'food',
    title:{ de:'Zu viel Wasabi', ru:'Слишком много васаби', en:'Too Much Wasabi' },

    sentences:[
      { de:'Max geht mit seinem Freund in ein Sushi-Restaurant.',
        ru:'Макс идёт в суши-ресторан со своим другом.',
        en:'Max goes to a sushi restaurant with his friend.' },
      { de:'Er hat noch nie Wasabi gegessen.',
        ru:'Он никогда раньше не ел васаби.',
        en:'He has never eaten wasabi before.' },
      { de:'Er tut ein großes Stück Wasabi auf sein Sushi.',
        ru:'Он кладёт большой кусок васаби на суши.',
        en:'He puts a big piece of wasabi on his sushi.' },
      { de:'Sein Freund sagt: „Warte! Das ist zu viel!“',
        ru:'Его друг говорит: «Подожди! Это слишком много!»',
        en:'His friend says, “Wait! That is too much!”' },
      { de:'Aber Max hat das Sushi schon im Mund.',
        ru:'Но суши уже у Макса во рту.',
        en:'But Max already has the sushi in his mouth.' },
      { de:'Sein Gesicht wird rot, und er trinkt schnell etwas Wasser.',
        ru:'Его лицо краснеет, и он быстро пьёт воду.',
        en:'His face turns red, and he quickly drinks some water.' }
    ],

    q:[
      { kind:'mc',
        de:'Wohin geht Max?',
        ru:'Куда идёт Макс?',
        en:'Where does Max go?',
        opts:[
          { de:'In ein Sushi-Restaurant',
            ru:'В суши-ресторан',
            en:'To a sushi restaurant' },
          { de:'In ein Café',
            ru:'В кафе',
            en:'To a café' },
          { de:'Zum Markt',
            ru:'На рынок',
            en:'To the market' },
          { de:'Nach Hause',
            ru:'Домой',
            en:'Home' }
        ],
        a:0 },
      { kind:'mc',
        de:'Wer geht mit ihm?',
        ru:'Кто идёт с ним?',
        en:'Who goes with him?',
        opts:[
          { de:'Seine Schwester',
            ru:'Его сестра',
            en:'His sister' },
          { de:'Sein Freund',
            ru:'Его друг',
            en:'His friend' },
          { de:'Seine Mutter',
            ru:'Его мама',
            en:'His mother' },
          { de:'Niemand',
            ru:'Никто',
            en:'Nobody' }
        ],
        a:1 },
      { kind:'tf',
        de:'Max hat schon oft Wasabi gegessen.',
        ru:'Макс уже часто ел васаби.',
        en:'Max has eaten wasabi many times before.',
        a:false },
      { kind:'mc',
        de:'Wie viel Wasabi tut Max auf sein Sushi?',
        ru:'Сколько васаби Макс кладёт на суши?',
        en:'How much wasabi does Max put on his sushi?',
        opts:[
          { de:'Ein kleines Stück',
            ru:'Маленький кусочек',
            en:'A small piece' },
          { de:'Ein großes Stück',
            ru:'Большой кусок',
            en:'A big piece' },
          { de:'Gar keins',
            ru:'Совсем не кладёт',
            en:'None at all' },
          { de:'Nur ein paar Tropfen',
            ru:'Всего пару капель',
            en:'Only a few drops' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile zeigt, dass sein Freund ihn warnt?',
        ru:'Какая строка показывает, что его друг его предупреждает?',
        en:'Which line shows that his friend warns him?',
        a:3 }   /* line 4 */,
      { kind:'mc',
        de:'Warum wird Max’ Gesicht rot?',
        ru:'Почему лицо Макса краснеет?',
        en:'Why does Max’s face turn red?',
        opts:[
          { de:'Er schämt sich.',
            ru:'Ему стыдно.',
            en:'He is embarrassed.' },
          { de:'Das Wasabi ist viel zu scharf.',
            ru:'Васаби слишком острый.',
            en:'The wasabi is far too hot.' },
          { de:'Im Restaurant ist es warm.',
            ru:'В ресторане жарко.',
            en:'The restaurant is warm.' },
          { de:'Er hat sich verbrannt.',
            ru:'Он обжёгся.',
            en:'He burned himself.' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, was Max schnell trinkt?',
        ru:'В какой строке сказано, что Макс быстро пьёт?',
        en:'Which line says what Max quickly drinks?',
        a:5 }   /* line 6 */
    ]
  },

  {
    id:'ss-43',
    cat:'food',
    title:{ de:'Mit Stäbchen essen lernen', ru:'Учимся есть палочками', en:'Learning to Use Chopsticks' },

    sentences:[
      { de:'Lena möchte Sushi mit Stäbchen essen.',
        ru:'Лена хочет есть суши палочками.',
        en:'Lena wants to eat sushi with chopsticks.' },
      { de:'Sie hebt ein Stück hoch, aber es fällt auf ihren Teller.',
        ru:'Она поднимает кусочек, но он падает на её тарелку.',
        en:'She picks up a piece, but it falls on her plate.' },
      { de:'Sie versucht es noch einmal, und es fällt in die Sojasoße.',
        ru:'Она пробует ещё раз, и он падает в соевый соус.',
        en:'She tries again, and it falls into the soy sauce.' },
      { de:'Beim dritten Versuch fliegt das Sushi über den Tisch.',
        ru:'С третьей попытки суши летит через весь стол.',
        en:'On her third try, the sushi flies across the table.' },
      { de:'Der Mann am Nebentisch schaut auf seinen Teller.',
        ru:'Мужчина за соседним столиком смотрит на свою тарелку.',
        en:'The man at the next table looks down at his plate.' },
      { de:'Er hat keinen Lachs bestellt.',
        ru:'Он не заказывал лосося.',
        en:'He did not order salmon.' }
    ],

    q:[
      { kind:'mc',
        de:'Womit möchte Lena Sushi essen?',
        ru:'Чем Лена хочет есть суши?',
        en:'What does Lena want to eat sushi with?',
        opts:[
          { de:'Mit einer Gabel',
            ru:'Вилкой',
            en:'With a fork' },
          { de:'Mit Stäbchen',
            ru:'Палочками',
            en:'With chopsticks' },
          { de:'Mit einem Löffel',
            ru:'Ложкой',
            en:'With a spoon' },
          { de:'Mit den Händen',
            ru:'Руками',
            en:'With her hands' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, wohin das Sushi beim ersten Versuch fällt?',
        ru:'В какой строке сказано, куда падают суши с первой попытки?',
        en:'Which line says where the sushi falls on her first try?',
        a:1 }   /* line 2 */,
      { kind:'mc',
        de:'Wohin fällt es beim zweiten Versuch?',
        ru:'Куда оно падает со второй попытки?',
        en:'Where does it fall on her second try?',
        opts:[
          { de:'Auf den Boden',
            ru:'На пол',
            en:'On the floor' },
          { de:'In die Sojasoße',
            ru:'В соевый соус',
            en:'Into the soy sauce' },
          { de:'Auf ihren Schuh',
            ru:'На её туфлю',
            en:'On her shoe' },
          { de:'Zurück auf den Teller',
            ru:'Обратно на тарелку',
            en:'Back on the plate' }
        ],
        a:1 },
      { kind:'mc',
        de:'Was passiert beim dritten Versuch?',
        ru:'Что происходит с третьей попытки?',
        en:'What happens on the third try?',
        opts:[
          { de:'Sie schafft es endlich.',
            ru:'У неё наконец получается.',
            en:'She finally manages it.' },
          { de:'Das Sushi fliegt über den Tisch.',
            ru:'Суши летит через стол.',
            en:'The sushi flies across the table.' },
          { de:'Sie gibt auf.',
            ru:'Она сдаётся.',
            en:'She gives up.' },
          { de:'Der Kellner hilft ihr.',
            ru:'Официант ей помогает.',
            en:'The waiter helps her.' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, wer auf seinen Teller schaut?',
        ru:'В какой строке сказано, кто смотрит на свою тарелку?',
        en:'Which line says who looks down at his plate?',
        a:4 }   /* line 5 */,
      { kind:'mc',
        de:'Warum ist der letzte Satz lustig?',
        ru:'Почему последнее предложение смешное?',
        en:'Why is the last sentence funny?',
        opts:[
          { de:'Der Mann mag keinen Lachs.',
            ru:'Мужчина не любит лосося.',
            en:'The man does not like salmon.' },
          { de:'Lenas Sushi ist auf seinem Teller gelandet.',
            ru:'Суши Лены оказались у него на тарелке.',
            en:'Lena’s sushi has landed on his plate.' },
          { de:'Der Mann hat gar nichts bestellt.',
            ru:'Мужчина ничего не заказывал.',
            en:'The man ordered nothing at all.' },
          { de:'Der Kellner hat sich geirrt.',
            ru:'Официант ошибся.',
            en:'The waiter made a mistake.' }
        ],
        a:1 },
      { kind:'tf',
        de:'Lena kann von Anfang an gut mit Stäbchen essen.',
        ru:'Лена с самого начала хорошо ест палочками.',
        en:'Lena is good with chopsticks from the start.',
        a:false }
    ]
  },

  {
    id:'ss-44',
    cat:'food',
    title:{ de:'Der stinkende Käse', ru:'Вонючий сыр', en:'The Smelly Cheese' },

    sentences:[
      { de:'Max öffnet den Kühlschrank und riecht etwas Schreckliches.',
        ru:'Макс открывает холодильник и чувствует ужасный запах.',
        en:'Max opens the refrigerator and smells something terrible.' },
      { de:'Er prüft die Milch. Sie ist in Ordnung.',
        ru:'Он проверяет молоко. С ним всё в порядке.',
        en:'He checks the milk. It is fine.' },
      { de:'Er prüft den Fisch. Er ist auch in Ordnung.',
        ru:'Он проверяет рыбу. С ней тоже всё в порядке.',
        en:'He checks the fish. It is fine too.' },
      { de:'Dann findet er den Limburger.',
        ru:'Потом он находит лимбургер.',
        en:'Then he finds the Limburger.' },
      { de:'Er schließt den Kühlschrank.',
        ru:'Он закрывает холодильник.',
        en:'He closes the refrigerator.' },
      { de:'Er beschließt, dass er keinen Hunger mehr hat.',
        ru:'Он решает, что больше не голоден.',
        en:'He decides he is not hungry anymore.' }
    ],

    q:[
      { kind:'mc',
        de:'Was öffnet Max?',
        ru:'Что открывает Макс?',
        en:'What does Max open?',
        opts:[
          { de:'Das Fenster',
            ru:'Окно',
            en:'The window' },
          { de:'Den Kühlschrank',
            ru:'Холодильник',
            en:'The refrigerator' },
          { de:'Die Tür',
            ru:'Дверь',
            en:'The door' },
          { de:'Einen Schrank',
            ru:'Шкаф',
            en:'A cupboard' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, was Max riecht?',
        ru:'В какой строке сказано, что чувствует Макс?',
        en:'Which line says what Max smells?',
        a:0 }   /* line 1 */,
      { kind:'mc',
        de:'Was prüft Max zuerst?',
        ru:'Что Макс проверяет сначала?',
        en:'What does Max check first?',
        opts:[
          { de:'Die Milch',
            ru:'Молоко',
            en:'The milk' },
          { de:'Den Fisch',
            ru:'Рыбу',
            en:'The fish' },
          { de:'Den Käse',
            ru:'Сыр',
            en:'The cheese' },
          { de:'Das Gemüse',
            ru:'Овощи',
            en:'The vegetables' }
        ],
        a:0 },
      { kind:'tf',
        de:'Der Fisch ist das Problem.',
        ru:'Проблема в рыбе.',
        en:'The fish is the problem.',
        a:false },
      { kind:'mc',
        de:'Welchen Käse findet Max?',
        ru:'Какой сыр находит Макс?',
        en:'Which cheese does Max find?',
        opts:[
          { de:'Gouda',
            ru:'Гауду',
            en:'Gouda' },
          { de:'Limburger',
            ru:'Лимбургер',
            en:'Limburger' },
          { de:'Parmesan',
            ru:'Пармезан',
            en:'Parmesan' },
          { de:'Feta',
            ru:'Фету',
            en:'Feta' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile zeigt, was Max macht, nachdem er den Limburger findet?',
        ru:'Какая строка показывает, что делает Макс, найдя лимбургер?',
        en:'Which line shows what Max does after finding the Limburger?',
        a:4 }   /* line 5 */,
      { kind:'mc',
        de:'Warum hat Max keinen Hunger mehr?',
        ru:'Почему Макс больше не голоден?',
        en:'Why is Max not hungry anymore?',
        opts:[
          { de:'Er hat schon gegessen.',
            ru:'Он уже поел.',
            en:'He has already eaten.' },
          { de:'Der Geruch hat ihm den Appetit verdorben.',
            ru:'Запах отбил ему аппетит.',
            en:'The smell has ruined his appetite.' },
          { de:'Der Kühlschrank ist leer.',
            ru:'Холодильник пуст.',
            en:'The refrigerator is empty.' },
          { de:'Er mag keinen Fisch.',
            ru:'Он не любит рыбу.',
            en:'He does not like fish.' }
        ],
        a:1 }
    ]
  },

  {
    id:'ss-45',
    cat:'food',
    title:{ de:'Raclette-Abend', ru:'Вечер с раклетом', en:'Raclette Night' },

    sentences:[
      { de:'Anna und ihre Freunde essen Raclette zum Abendessen.',
        ru:'Анна и её друзья едят раклет на ужин.',
        en:'Anna and her friends have raclette for dinner.' },
      { de:'Sie schmelzen Raclettekäse und essen ihn mit Kartoffeln und Gemüse.',
        ru:'Они плавят сыр раклет и едят его с картофелем и овощами.',
        en:'They melt Raclette cheese and eat it with potatoes and vegetables.' },
      { de:'Anna gibt viel Käse auf ihre Kartoffel.',
        ru:'Анна кладёт много сыра на свою картошку.',
        en:'Anna puts a lot of cheese on her potato.' },
      { de:'Dann gibt sie noch ein bisschen mehr dazu.',
        ru:'Потом она добавляет ещё немного.',
        en:'Then she adds a little more.' },
      { de:'Dann noch ein bisschen mehr.',
        ru:'Потом ещё немного.',
        en:'Then a little more.' },
      { de:'Ihre Freundin schaut auf ihren Teller und fragt: „Möchtest du etwas Kartoffel zu deinem Käse?“',
        ru:'Её подруга смотрит на тарелку и спрашивает: «Тебе добавить немного картошки к сыру?»',
        en:'Her friend looks at her plate and asks, “Do you want some potato with your cheese?”' }
    ],

    q:[
      { kind:'mc',
        de:'Was essen Anna und ihre Freunde zum Abendessen?',
        ru:'Что Анна и её друзья едят на ужин?',
        en:'What do Anna and her friends have for dinner?',
        opts:[
          { de:'Pizza',
            ru:'Пиццу',
            en:'Pizza' },
          { de:'Raclette',
            ru:'Раклет',
            en:'Raclette' },
          { de:'Suppe',
            ru:'Суп',
            en:'Soup' },
          { de:'Sushi',
            ru:'Суши',
            en:'Sushi' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, was sie mit dem Käse essen?',
        ru:'В какой строке сказано, с чем они едят сыр?',
        en:'Which line says what they eat with the cheese?',
        a:1 }   /* line 2 */,
      { kind:'mc',
        de:'Wie viel Käse gibt Anna auf ihre Kartoffel?',
        ru:'Сколько сыра Анна кладёт на картошку?',
        en:'How much cheese does Anna put on her potato?',
        opts:[
          { de:'Gar keinen',
            ru:'Совсем не кладёт',
            en:'None at all' },
          { de:'Ein bisschen',
            ru:'Немного',
            en:'A little' },
          { de:'Viel',
            ru:'Много',
            en:'A lot' },
          { de:'Genau so viel wie die anderen',
            ru:'Столько же, сколько другие',
            en:'The same as everyone else' }
        ],
        a:2 },
      { kind:'tf',
        de:'Anna gibt danach noch mehr Käse dazu.',
        ru:'Потом Анна добавляет ещё сыра.',
        en:'Anna adds even more cheese afterwards.',
        a:true },
      { kind:'tap',
        de:'Welche Zeile sagt, worauf Annas Freundin schaut?',
        ru:'В какой строке сказано, на что смотрит подруга Анны?',
        en:'Which line says what Anna’s friend looks at?',
        a:5 }   /* line 6 */,
      { kind:'mc',
        de:'Welchen Witz macht ihre Freundin?',
        ru:'Как шутит её подруга?',
        en:'What joke does her friend make?',
        opts:[
          { de:'Sie fragt, ob Anna auch etwas Kartoffel möchte.',
            ru:'Она спрашивает, не хочет ли Анна ещё и картошки.',
            en:'She asks whether Anna would like some potato too.' },
          { de:'Sie sagt, der Käse sei kalt.',
            ru:'Она говорит, что сыр остыл.',
            en:'She says the cheese is cold.' },
          { de:'Sie will Annas Teller haben.',
            ru:'Она хочет забрать тарелку Анны.',
            en:'She wants Anna’s plate.' },
          { de:'Sie sagt, sie habe keinen Hunger.',
            ru:'Она говорит, что не голодна.',
            en:'She says she is not hungry.' }
        ],
        a:0 },
      { kind:'mc',
        de:'Was zeigt der Witz über Annas Teller?',
        ru:'Что шутка говорит о тарелке Анны?',
        en:'What does the joke tell you about Anna’s plate?',
        opts:[
          { de:'Es ist fast nur Käse darauf.',
            ru:'На ней почти один сыр.',
            en:'There is almost nothing but cheese on it.' },
          { de:'Es ist noch leer.',
            ru:'Она ещё пустая.',
            en:'It is still empty.' },
          { de:'Es ist zu klein.',
            ru:'Она слишком маленькая.',
            en:'It is too small.' },
          { de:'Es ist kein Käse darauf.',
            ru:'На ней нет сыра.',
            en:'There is no cheese on it.' }
        ],
        a:0 }
    ]
  },

  {
    id:'ss-46',
    cat:'food',
    title:{ de:'Das Parmesan-Problem', ru:'Проблема с пармезаном', en:'The Parmesan Problem' },

    sentences:[
      { de:'Lena macht Pasta zum Abendessen.',
        ru:'Лена готовит пасту на ужин.',
        en:'Lena makes pasta for dinner.' },
      { de:'Sie gibt etwas Parmesan darüber.',
        ru:'Она посыпает её пармезаном.',
        en:'She puts some Parmesan on top.' },
      { de:'Sie möchte noch ein bisschen mehr und reibt weiter.',
        ru:'Ей хочется ещё немного, и она продолжает тереть сыр.',
        en:'She wants a little more, so she keeps grating.' },
      { de:'Ihr Handy klingelt, und sie fängt an zu reden.',
        ru:'Звонит телефон, и Лена начинает разговаривать.',
        en:'Her phone rings, and she starts talking.' },
      { de:'Eine Minute später schaut sie auf ihren Teller.',
        ru:'Через минуту она смотрит на тарелку.',
        en:'A minute later, she looks down.' },
      { de:'Die Pasta ist nicht mehr zu sehen.',
        ru:'Пасты больше не видно.',
        en:'She cannot see the pasta anymore.' }
    ],

    q:[
      { kind:'mc',
        de:'Was macht Lena zum Abendessen?',
        ru:'Что Лена готовит на ужин?',
        en:'What does Lena make for dinner?',
        opts:[
          { de:'Suppe',
            ru:'Суп',
            en:'Soup' },
          { de:'Pasta',
            ru:'Пасту',
            en:'Pasta' },
          { de:'Salat',
            ru:'Салат',
            en:'Salad' },
          { de:'Sushi',
            ru:'Суши',
            en:'Sushi' }
        ],
        a:1 },
      { kind:'mc',
        de:'Welchen Käse gibt sie auf die Pasta?',
        ru:'Какой сыр она кладёт на пасту?',
        en:'What cheese does she put on the pasta?',
        opts:[
          { de:'Parmesan',
            ru:'Пармезан',
            en:'Parmesan' },
          { de:'Gouda',
            ru:'Гауду',
            en:'Gouda' },
          { de:'Feta',
            ru:'Фету',
            en:'Feta' },
          { de:'Mozzarella',
            ru:'Моцареллу',
            en:'Mozzarella' }
        ],
        a:0 },
      { kind:'tap',
        de:'Welche Zeile sagt, warum sie weiter reibt?',
        ru:'В какой строке сказано, почему она продолжает тереть сыр?',
        en:'Which line says why she keeps grating?',
        a:2 }   /* line 3 */,
      { kind:'mc',
        de:'Was unterbricht Lena?',
        ru:'Что отвлекает Лену?',
        en:'What interrupts Lena?',
        opts:[
          { de:'Die Türklingel',
            ru:'Дверной звонок',
            en:'The doorbell' },
          { de:'Ihr Handy',
            ru:'Её телефон',
            en:'Her phone' },
          { de:'Ein Gast',
            ru:'Гость',
            en:'A visitor' },
          { de:'Der Herd',
            ru:'Плита',
            en:'The stove' }
        ],
        a:1 },
      { kind:'tap',
        de:'Welche Zeile zeigt, dass Lena eine Weile nicht auf den Teller schaut?',
        ru:'Какая строка показывает, что Лена какое-то время не смотрит на тарелку?',
        en:'Which line shows that Lena is not looking at her plate for a while?',
        a:3 }   /* line 4 */,
      { kind:'tf',
        de:'Am Ende sieht Lena die Pasta noch.',
        ru:'В конце Лена всё ещё видит пасту.',
        en:'At the end Lena can still see the pasta.',
        a:false },
      { kind:'mc',
        de:'Warum kann sie die Pasta nicht mehr sehen?',
        ru:'Почему она больше не видит пасту?',
        en:'Why can she no longer see the pasta?',
        opts:[
          { de:'Sie hat sie schon gegessen.',
            ru:'Она её уже съела.',
            en:'She has already eaten it.' },
          { de:'Sie ist unter dem Parmesan verschwunden.',
            ru:'Она исчезла под пармезаном.',
            en:'It has disappeared under the Parmesan.' },
          { de:'Das Licht ist aus.',
            ru:'Свет выключен.',
            en:'The light is off.' },
          { de:'Der Teller ist umgefallen.',
            ru:'Тарелка перевернулась.',
            en:'The plate has tipped over.' }
        ],
        a:1 }
    ]
  }

];
