/* data/wordlab-words.js */
/* WORD LAB, the 30 words of kap16-18.

   THE WORDS AND EVERY GERMAN AND RUSSIAN STRING HERE ARE STEVEN'S.
   Headwords, glosses and example sentences come from vocab.js; the three
   definitions per word were written by Steven and are reproduced verbatim.
   Nothing German or Russian in this file was drafted here.

   `n`      the vocab.js bank id, so audio, images and the word bank all
            resolve through the bank rather than being duplicated.
   `kind`   part of speech, which is how Word Lab groups the words:
            6 nouns, 10 verbs, 4 verb phrases + 4 adjectives merged to 8,
            6 adverbs and set phrases. Four groups, none below the floor.
   `def`    the full definition, three languages.
   `s[].gap` the same sentence with the target removed.
   `also`   headwords the course treats as the same thing, so either is
            accepted for either definition.

   THE ANSWER-SET PRINCIPLE, AND THE ONE PAIR THAT NEEDS IT.

   Kapitel 17 does not list `bei etwas mitmachen` and `an etwas teilnehmen`
   as two words. It lists them on one line, joined by an equals sign — the
   course teaches them as the same thing. So on a matching board both are
   correct for either definition, and marking one of them wrong would be
   marking her wrong for knowing what the course taught.

   `also` is checked in BOTH directions by the game, so it holds whichever
   tile she happened to tap first. Both entries carry it rather than one,
   because a one-way declaration is a trap for whoever edits this next.

   WHERE gap PUTS THE BLANK, and why it is not always the whole word.
   A separable verb splits: `Ich mache bei einem Deutschkurs mit` has no
   contiguous span to remove. The blank takes the finite part and leaves
   the particle standing — the particle is the clue that the verb is
   separable, and that is worth showing rather than hiding. Same rule for
   `bietet ... an` and `nehmen ... teil`.

   NOT SUPPLIED, DELIBERATELY: a short ~25-character board form. Shortening
   the German or the Russian would mean writing German or Russian here, and
   that is not this file's to do. The board falls back to the full
   definition until Steven supplies short forms. */

window.GH_WORDLAB = [
  { n:574, de:'absagen', kind:'verb',
    def:{ de:'etwas Geplantes nicht machen',
          ru:'отменить то, что было запланировано',
          en:'to cancel something planned' },
    s:[
      { t:'Wir müssen die Besprechung absagen.',
        gap:'Wir müssen die Besprechung ___.',
        ru:'Нам нужно отменить совещание.',
        en:'We have to cancel the meeting.' },
      { t:'Sie hat den Termin gestern abgesagt.',
        gap:'Sie hat den Termin gestern ___.',
        ru:'Она вчера отменила встречу.',
        en:'She canceled the appointment yesterday.' }
    ] },
  { n:625, de:'bekommen', kind:'verb',
    def:{ de:'etwas erhalten',
          ru:'получить что-либо',
          en:'to receive something' },
    s:[
      { t:'Ich bekomme heute ein Paket.',
        gap:'Ich ___ heute ein Paket.',
        ru:'Я сегодня получу посылку.',
        en:'I am receiving a package today.' },
      { t:'Sie hat eine Nachricht von ihrer Freundin bekommen.',
        gap:'Sie hat eine Nachricht von ihrer Freundin ___.',
        ru:'Она получила сообщение от своей подруги.',
        en:'She received a message from her friend.' }
    ] },
  { n:815, de:'bitten', kind:'verb',
    def:{ de:'jemanden um etwas fragen',
          ru:'просить кого-либо о чём-либо',
          en:'to ask someone for something' },
    s:[
      { t:'Ich bitte meine Lehrerin um Hilfe.',
        gap:'Ich ___ meine Lehrerin um Hilfe.',
        ru:'Я прошу учительницу о помощи.',
        en:'I ask my teacher for help.' },
      { t:'Kann ich dich um einen Gefallen bitten?',
        gap:'Kann ich dich um einen Gefallen ___?',
        ru:'Можно попросить тебя об одолжении?',
        en:'Can I ask you for a favour?' }
    ] },
  { n:816, de:'anbieten', kind:'verb',
    def:{ de:'jemandem etwas geben wollen',
          ru:'предлагать кому-либо что-либо',
          en:'to offer something to someone' },
    s:[
      { t:'Er bietet mir eine Tasse Kaffee an.',
        gap:'Er ___ mir eine Tasse Kaffee an.',
        ru:'Он предлагает мне чашку кофе.',
        en:'He offers me a cup of coffee.' },
      { t:'Die Firma bietet einen neuen Kurs an.',
        gap:'Die Firma ___ einen neuen Kurs an.',
        ru:'Компания предлагает новый курс.',
        en:'The company offers a new course.' }
    ] },
  { n:817, de:'vorschlagen', kind:'verb',
    def:{ de:'eine Idee nennen',
          ru:'предложить идею',
          en:'to suggest an idea' },
    s:[
      { t:'Ich schlage einen Spaziergang im Park vor.',
        gap:'Ich ___ einen Spaziergang im Park vor.',
        ru:'Я предлагаю прогуляться в парке.',
        en:'I suggest a walk in the park.' },
      { t:'Was schlägst du für morgen vor?',
        gap:'Was ___ du für morgen vor?',
        ru:'Что ты предлагаешь на завтра?',
        en:'What do you suggest for tomorrow?' }
    ] },
  { n:818, de:'verschieben', kind:'verb',
    def:{ de:'etwas auf später legen',
          ru:'перенести что-либо на более позднее время',
          en:'to move something to a later time' },
    s:[
      { t:'Wir müssen den Termin auf Freitag verschieben.',
        gap:'Wir müssen den Termin auf Freitag ___.',
        ru:'Нам нужно перенести встречу на пятницу.',
        en:'We have to move the appointment to Friday.' },
      { t:'Können wir das Treffen um eine Stunde verschieben?',
        gap:'Können wir das Treffen um eine Stunde ___?',
        ru:'Можем мы перенести встречу на час?',
        en:'Can we move the meeting by one hour?' }
    ] },
  { n:627, de:'verkaufen', kind:'verb',
    def:{ de:'etwas für Geld geben',
          ru:'отдавать что-либо за деньги',
          en:'to give something for money' },
    s:[
      { t:'Das Geschäft verkauft Kleidung und Schuhe.',
        gap:'Das Geschäft ___ Kleidung und Schuhe.',
        ru:'Магазин продаёт одежду и обувь.',
        en:'The shop sells clothes and shoes.' },
      { t:'Er hat sein altes Fahrrad verkauft.',
        gap:'Er hat sein altes Fahrrad ___.',
        ru:'Он продал свой старый велосипед.',
        en:'He sold his old bicycle.' }
    ] },
  { n:770, de:'bestellen', kind:'verb',
    def:{ de:'um eine Ware oder ein Essen bitten',
          ru:'заказывать товар или еду',
          en:'to order goods or food' },
    s:[
      { t:'Sie bestellt einen Kaffee beim Kellner.',
        gap:'Sie ___ einen Kaffee beim Kellner.',
        ru:'Она заказывает кофе у официанта.',
        en:'She orders a coffee from the waiter.' },
      { t:'Sie hat einen Kaffee beim Kellner bestellt.',
        gap:'Sie hat einen Kaffee beim Kellner ___.',
        ru:'Она заказала кофе у официанта.',
        en:'She ordered a coffee from the waiter.' }
    ] },
  { n:821, de:'werden', kind:'verb',
    def:{ de:'sich zu etwas entwickeln',
          ru:'становиться кем-либо или чем-либо',
          en:'to become something' },
    s:[
      { t:'Im Winter werden die Tage kürzer.',
        gap:'Im Winter ___ die Tage kürzer.',
        ru:'Зимой дни становятся короче.',
        en:'In winter the days become shorter.' },
      { t:'Ich werde morgen meine Mutter besuchen.',
        gap:'Ich ___ morgen meine Mutter besuchen.',
        ru:'Завтра я навещу маму.',
        en:'I will visit my mother tomorrow.' }
    ] },
  { n:834, de:'bedeuten', kind:'verb',
    def:{ de:'einen bestimmten Sinn haben',
          ru:'иметь определённое значение',
          en:'to have a particular meaning' },
    s:[
      { t:'Was bedeutet dieses Wort?',
        gap:'Was ___ dieses Wort?',
        ru:'Что означает это слово?',
        en:'What does this word mean?' },
      { t:'Dieses Zeichen bedeutet, dass wir warten müssen.',
        gap:'Dieses Zeichen ___, dass wir warten müssen.',
        ru:'Этот знак означает, что нам нужно ждать.',
        en:'This sign means that we have to wait.' }
    ] },
  { n:609, de:'die Schauspielerin', kind:'noun',
    def:{ de:'eine Frau, die Rollen spielt',
          ru:'женщина, которая играет роли',
          en:'a woman who acts in plays or films' },
    s:[
      { t:'Die Schauspielerin spielt in einem neuen Film.',
        gap:'Die ___ spielt in einem neuen Film.',
        ru:'Актриса играет в новом фильме.',
        en:'The actress is appearing in a new movie.' },
      { t:'Viele Leute haben die Schauspielerin im Theater gesehen.',
        gap:'Viele Leute haben die ___ im Theater gesehen.',
        ru:'Многие люди видели актрису в театре.',
        en:'Many people saw the actress at the theater.' }
    ] },
  { n:624, de:'die Bestellung', kind:'noun',
    def:{ de:'etwas, das man bestellt hat',
          ru:'то, что было заказано',
          en:'something that has been ordered' },
    s:[
      { t:'Die Bestellung ist noch nicht fertig.',
        gap:'Die ___ ist noch nicht fertig.',
        ru:'Заказ ещё не готов.',
        en:'The order is not ready yet.' },
      { t:'Der Kellner bringt unsere Bestellung an den Tisch.',
        gap:'Der Kellner bringt unsere ___ an den Tisch.',
        ru:'Официант приносит наш заказ к столу.',
        en:'The waiter brings our order to the table.' }
    ] },
  { n:629, de:'die Krankheit', kind:'noun',
    def:{ de:'ein Zustand, in dem man krank ist',
          ru:'состояние, когда человек болен',
          en:'a condition in which someone is ill' },
    s:[
      { t:'Die Krankheit dauert schon eine Woche.',
        gap:'Die ___ dauert schon eine Woche.',
        ru:'Болезнь длится уже неделю.',
        en:'The illness has lasted for a week already.' },
      { t:'Nach der Krankheit fühlt er sich wieder besser.',
        gap:'Nach der ___ fühlt er sich wieder besser.',
        ru:'После болезни он снова чувствует себя лучше.',
        en:'After the illness, he feels better again.' }
    ] },
  { n:831, de:'das Übergewicht', kind:'noun',
    def:{ de:'zu hohes Körpergewicht',
          ru:'слишком большой вес тела',
          en:'excessive body weight' },
    s:[
      { t:'Bewegung kann gegen Übergewicht helfen.',
        gap:'Bewegung kann gegen ___ helfen.',
        ru:'Физическая активность может помочь при лишнем весе.',
        en:'Exercise can help with excess weight.' },
      { t:'Der Artikel handelt von Gesundheit und Übergewicht.',
        gap:'Der Artikel handelt von Gesundheit und ___.',
        ru:'Статья посвящена здоровью и лишнему весу.',
        en:'The article is about health and excess weight.' }
    ] },
  { n:630, de:'die Bewegung', kind:'noun',
    def:{ de:'körperliche Aktivität',
          ru:'физическая активность',
          en:'physical movement or exercise' },
    s:[
      { t:'Bewegung ist wichtig für den Körper.',
        gap:'___ ist wichtig für den Körper.',
        ru:'Движение важно для организма.',
        en:'Exercise is important for the body.' },
      { t:'Sie braucht nach einem langen Arbeitstag etwas Bewegung.',
        gap:'Sie braucht nach einem langen Arbeitstag etwas ___.',
        ru:'После долгого рабочего дня ей нужно немного подвигаться.',
        en:'She needs some exercise after a long workday.' }
    ] },
  { n:835, de:'der Ratschlag', kind:'noun',
    def:{ de:'eine Empfehlung, was man tun soll',
          ru:'совет о том, что следует делать',
          en:'advice about what someone should do' },
    s:[
      { t:'Meine Lehrerin gibt mir einen guten Ratschlag.',
        gap:'Meine Lehrerin gibt mir einen guten ___.',
        ru:'Моя учительница даёт мне хороший совет.',
        en:'My teacher gives me a good piece of advice.' },
      { t:'Danke für deinen Ratschlag.',
        gap:'Danke für deinen ___.',
        ru:'Спасибо за твой совет.',
        en:'Thank you for your advice.' }
    ] },
  { n:824, de:'sicher sein', kind:'vphrase',
    def:{ de:'keinen Zweifel haben',
          ru:'не сомневаться; быть уверенным',
          en:'to have no doubt; to be sure' },
    s:[
      { t:'Ich bin sicher, dass sie heute kommt.',
        gap:'Ich bin ___, dass sie heute kommt.',
        ru:'Я уверен, что она сегодня придёт.',
        en:'I am sure that she is coming today.' },
      { t:'Bist du sicher, dass das die richtige Straße ist?',
        gap:'Bist du ___, dass das die richtige Straße ist?',
        ru:'Ты уверен, что это правильная улица?',
        en:'Are you sure this is the right street?' }
    ] },
  { n:829, de:'wichtig sein', kind:'vphrase',
    def:{ de:'eine große Bedeutung haben',
          ru:'иметь большое значение',
          en:'to be important' },
    s:[
      { t:'Es ist wichtig, jeden Tag Deutsch zu üben.',
        gap:'Es ist ___, jeden Tag Deutsch zu üben.',
        ru:'Важно практиковать немецкий каждый день.',
        en:'It is important to practise German every day.' },
      { t:'Meine Familie ist mir sehr wichtig.',
        gap:'Meine Familie ist mir sehr ___.',
        ru:'Моя семья очень важна для меня.',
        en:'My family is very important to me.' }
    ] },
  { n:828, de:'teilnehmen an', kind:'vphrase',
    also:['mitmachen bei'],
    def:{ de:'bei einer Aktivität dabei sein',
          ru:'принимать участие в чём-либо',
          en:'to take part in something' },
    s:[
      { t:'Viele Schüler nehmen an dem Wettbewerb teil.',
        gap:'Viele Schüler ___ an dem Wettbewerb teil.',
        ru:'Многие ученики участвуют в конкурсе.',
        en:'Many students take part in the competition.' },
    ] },
  { n:827, de:'mitmachen bei', kind:'vphrase',
    also:['teilnehmen an'],
    def:{ de:'zusammen mit anderen teilnehmen',
          ru:'участвовать вместе с другими',
          en:'to join in an activity with others' },
    s:[
      { t:'Ich mache bei einem Deutschkurs mit.',
        gap:'Ich ___ bei einem Deutschkurs mit.',
        ru:'Я участвую в курсе немецкого языка.',
        en:'I am taking part in a German course.' },
      { t:'Möchtest du bei unserem Spiel mitmachen?',
        gap:'Möchtest du bei unserem Spiel ___?',
        ru:'Ты хочешь принять участие в нашей игре?',
        en:'Would you like to join our game?' }
    ] },
  { n:822, de:'spannend', kind:'adj',
    def:{ de:'sehr interessant und aufregend',
          ru:'очень интересный и захватывающий',
          en:'exciting and interesting' },
    s:[
      { t:'Der Film ist wirklich spannend.',
        gap:'Der Film ist wirklich ___.',
        ru:'Фильм действительно захватывающий.',
        en:'The movie is really exciting.' },
      { t:'Sie liest ein spannendes Buch.',
        gap:'Sie liest ein ___ Buch.',
        ru:'Она читает увлекательную книгу.',
        en:'She is reading an exciting book.' }
    ] },
  { n:825, de:'selbstständig', kind:'adj',
    def:{ de:'für sich selbst arbeiten',
          ru:'работать на себя',
          en:'self-employed; working for yourself' },
    s:[
      { t:'Meine Freundin arbeitet selbstständig.',
        gap:'Meine Freundin arbeitet ___.',
        ru:'Моя подруга работает на себя.',
        en:'My friend is self-employed.' },
      { t:'Das Kind kann die Aufgabe schon selbstständig machen.',
        gap:'Das Kind kann die Aufgabe schon ___ machen.',
        ru:'Ребёнок уже может выполнить задание самостоятельно.',
        en:'The child can already do the task independently.' }
    ] },
  { n:832, de:'sicher', kind:'adj',
    def:{ de:'ohne Gefahr',
          ru:'без опасности',
          en:'safe; not dangerous' },
    s:[
      { t:'Diese Straße ist nachts nicht sehr sicher.',
        gap:'Diese Straße ist nachts nicht sehr ___.',
        ru:'Эта улица ночью не очень безопасна.',
        en:'This street is not very safe at night.' },
      { t:'Ich bin mir sicher, dass er kommt.',
        gap:'Ich bin mir ___, dass er kommt.',
        ru:'Я уверен, что он придёт.',
        en:'I am certain that he is coming.' }
    ] },
  { n:826, de:'einfach', kind:'adj',
    def:{ de:'nicht schwierig',
          ru:'не трудный; простой',
          en:'not difficult; simple' },
    s:[
      { t:'Diese Übung ist ziemlich einfach.',
        gap:'Diese Übung ist ziemlich ___.',
        ru:'Это упражнение довольно простое.',
        en:'This exercise is quite easy.' },
      { t:'Ich brauche nur eine einfache Erklärung.',
        gap:'Ich brauche nur eine ___ Erklärung.',
        ru:'Мне нужно только простое объяснение.',
        en:'I only need a simple explanation.' }
    ] },
  { n:819, de:'hoffentlich', kind:'adv',
    def:{ de:'mit dem Wunsch, dass etwas passiert',
          ru:'с надеждой, что что-то произойдёт',
          en:'hoping that something will happen' },
    s:[
      { t:'Hoffentlich scheint morgen die Sonne.',
        gap:'___ scheint morgen die Sonne.',
        ru:'Надеюсь, завтра будет светить солнце.',
        en:'Hopefully the sun will shine tomorrow.' },
      { t:'Der Bus kommt hoffentlich bald.',
        gap:'Der Bus kommt ___ bald.',
        ru:'Надеюсь, автобус скоро придёт.',
        en:'Hopefully the bus will come soon.' }
    ] },
  { n:592, de:'auf jeden Fall', kind:'adv',
    def:{ de:'ganz sicher; unbedingt',
          ru:'обязательно; точно',
          en:'definitely; certainly' },
    s:[
      { t:'Ich komme auf jeden Fall morgen.',
        gap:'Ich komme ___ morgen.',
        ru:'Я обязательно приду завтра.',
        en:'I will definitely come tomorrow.' },
      { t:'Dieses Restaurant möchte ich auf jeden Fall besuchen.',
        gap:'Dieses Restaurant möchte ich ___ besuchen.',
        ru:'Я обязательно хочу посетить этот ресторан.',
        en:'I definitely want to visit this restaurant.' }
    ] },
  { n:823, de:'auf keinen Fall', kind:'adv',
    def:{ de:'ganz sicher nicht',
          ru:'ни в коем случае',
          en:'definitely not; under no circumstances' },
    s:[
      { t:'Das darfst du auf keinen Fall vergessen.',
        gap:'Das darfst du ___ vergessen.',
        ru:'Ты ни в коем случае не должен это забыть.',
        en:'You must not forget that under any circumstances.' },
      { t:'Ich möchte auf keinen Fall zu spät kommen.',
        gap:'Ich möchte ___ zu spät kommen.',
        ru:'Я ни в коем случае не хочу опоздать.',
        en:'I absolutely do not want to be late.' }
    ] },
  { n:830, de:'im Voraus', kind:'adv',
    def:{ de:'bevor etwas passiert',
          ru:'до того, как что-либо произойдёт',
          en:'before something happens; in advance' },
    s:[
      { t:'Vielen Dank im Voraus für deine Hilfe.',
        gap:'Vielen Dank ___ für deine Hilfe.',
        ru:'Заранее спасибо за помощь.',
        en:'Thank you in advance for your help.' },
      { t:'Wir müssen die Fahrkarten im Voraus kaufen.',
        gap:'Wir müssen die Fahrkarten ___ kaufen.',
        ru:'Нам нужно купить билеты заранее.',
        en:'We have to buy the tickets in advance.' }
    ] },
  { n:833, de:'sogar', kind:'adv',
    def:{ de:'auch etwas Unerwartetes',
          ru:'даже; включая неожиданное',
          en:'even; including something unexpected' },
    s:[
      { t:'Heute ist es sogar wärmer als gestern.',
        gap:'Heute ist es ___ wärmer als gestern.',
        ru:'Сегодня даже теплее, чем вчера.',
        en:'Today it is even warmer than yesterday.' },
      { t:'Sogar mein Bruder kennt dieses Lied.',
        gap:'___ mein Bruder kennt dieses Lied.',
        ru:'Даже мой брат знает эту песню.',
        en:'Even my brother knows this song.' }
    ] },
  { n:820, de:'ungefähr', kind:'adv',
    def:{ de:'nicht genau; etwa',
          ru:'не точно; примерно',
          en:'approximately; about' },
    s:[
      { t:'Die Fahrt dauert ungefähr zwanzig Minuten.',
        gap:'Die Fahrt dauert ___ zwanzig Minuten.',
        ru:'Поездка занимает примерно двадцать минут.',
        en:'The trip takes about twenty minutes.' },
      { t:'Ungefähr zehn Personen warten draußen.',
        gap:'___ zehn Personen warten draußen.',
        ru:'На улице ждут примерно десять человек.',
        en:'About ten people are waiting outside.' }
    ] }
];
