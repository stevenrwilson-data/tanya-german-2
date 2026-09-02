/* READER WORDS — the vocabulary of each piece in the reader.

   Her way in. Reading a story cold is hard; reading it after five minutes
   with its own word list is not. So every piece carries a small list, and
   getting it costs her NOTHING — unlike the translation, which rests the
   questions for five days. That asymmetry is the whole point: the cheap
   path is the one that builds comprehension, and the expensive one is the
   shortcut.

   ------------------------------------------------------------------
   MOST OF THESE WORDS ARE ALREADY HERS

   814 references across 58 pieces resolve to 457 distinct words, and 191
   of those are already in vocab.js — 163 of them WITH A PICTURE and two
   example sentences. So this is not a second vocabulary. It is mostly the
   bank she is already drilling, met again inside a story where it means
   something.

   Resolved exactly as song-words.js is, in this order:

     dictionary.js   a headword with senses, if there is one
     vocab.js        the bank word, with its picture and sentences
     the table below  everything else

   A word in more than one piece is listed once here and referenced by each
   piece, so `die Tasse` in a poem and in a story is one entry.

   ------------------------------------------------------------------
   `want:'def'` marks an entry that has a gloss but no definition yet. The
   card works — it shows the gloss — it is simply thinner than intended. */

window.GH_READERWORDS = {

  words:{
    'der Spaziergang':
      { en:'walk',
        ru:'прогулка',
        img:0, kind:'word', want:'def' },
    'eilen':
      { en:'to hurry',
        ru:'спешить',
        img:0, kind:'word', want:'def' },
    'sich verabschieden':
      { en:'to say goodbye',
        ru:'прощаться',
        img:0, kind:'phrase', want:'def' },
    'leer':
      { en:'empty',
        ru:'пустой',
        img:0, kind:'word', want:'def' },
    'der Scheinwerfer':
      { en:'headlight',
        ru:'фара',
        img:0, kind:'word', want:'def' },
    'vorbeifahren':
      { en:'to pass by',
        ru:'проезжать мимо',
        img:0, kind:'word', want:'def' },
    'anhalten':
      { en:'to stop',
        ru:'останавливаться',
        img:0, kind:'word', want:'def' },
    'spät':
      { en:'late',
        ru:'поздно',
        img:0, kind:'word', want:'def' },
    'bemerken':
      { en:'to notice',
        ru:'замечать',
        img:0, kind:'word', want:'def' },
    'sich fragen':
      { en:'to wonder',
        ru:'задаваться вопросом',
        img:0, kind:'phrase', want:'def' },
    'vertraut':
      { en:'familiar',
        ru:'знакомый',
        img:0, kind:'word', want:'def' },
    'die Stuhllehne':
      { en:'back of a chair',
        ru:'спинка стула',
        img:0, kind:'word', want:'def' },
    'die Theke':
      { en:'counter',
        ru:'стойка',
        img:0, kind:'word', want:'def' },
    'umdrehen':
      { en:'to turn around',
        ru:'разворачиваться',
        img:0, kind:'word', want:'def' },
    'zurückgehen':
      { en:'to go back',
        ru:'возвращаться',
        img:0, kind:'word', want:'def' },
    'sich bedanken':
      { en:'to thank',
        ru:'благодарить',
        img:0, kind:'phrase', want:'def' },
    'die Pfütze':
      { en:'puddle',
        ru:'лужа',
        img:0, kind:'word', want:'def' },
    'der Donner':
      { en:'thunder',
        ru:'гром',
        img:0, kind:'word', want:'def' },
    'klopfen':
      { en:'to tap / knock',
        ru:'стучать',
        img:0, kind:'word', want:'def' },
    'einschlafen':
      { en:'to fall asleep',
        ru:'засыпать',
        img:0, kind:'word', want:'def' },
    'kühl':
      { en:'cool',
        ru:'прохладный',
        img:0, kind:'word', want:'def' },
    'die Nachrichten':
      { en:'news',
        ru:'новости',
        img:0, kind:'word', want:'def' },
    'sich setzen':
      { en:'to sit down',
        ru:'садиться',
        img:0, kind:'phrase', want:'def' },
    'kennenlernen':
      { en:'to get to know',
        ru:'знакомиться',
        img:0, kind:'word', want:'def' },
    'besetzt':
      { en:'occupied',
        ru:'занятый',
        img:0, kind:'word', want:'def' },
    'der Zweig':
      { en:'branch',
        ru:'ветка',
        img:0, kind:'word', want:'def' },
    'der Topf':
      { en:'pot',
        ru:'горшок',
        img:0, kind:'word', want:'def' },
    'gießen':
      { en:'to water',
        ru:'поливать',
        img:0, kind:'word', want:'def' },
    'lachen':
      { en:'to laugh',
        ru:'смеяться',
        img:0, kind:'word', want:'def' },
    'Zeit geben':
      { en:'to give time',
        ru:'дать время',
        img:0, kind:'phrase', want:'def' },
    'umtopfen':
      { en:'to repot',
        ru:'пересаживать',
        img:0, kind:'word', want:'def' },
    'groß':
      { en:'bigger',
        ru:'больше',
        img:0, kind:'word', want:'def' },
    'das Gebäude':
      { en:'building',
        ru:'здание',
        img:0, kind:'word', want:'def' },
    'erscheinen':
      { en:'to appear',
        ru:'появляться',
        img:0, kind:'word', want:'def' },
    'stehen bleiben':
      { en:'to stop',
        ru:'останавливаться',
        img:0, kind:'phrase', want:'def' },
    'der Hausschlüssel':
      { en:'house key',
        ru:'ключ от дома',
        img:0, kind:'word', want:'def' },
    'das Fahrradschloss':
      { en:'bicycle lock',
        ru:'велосипедный замок',
        img:0, kind:'word', want:'def' },
    'die Manteltasche':
      { en:'coat pocket',
        ru:'карман пальто',
        img:0, kind:'word', want:'def' },
    'das Schloss':
      { en:'lock',
        ru:'замок',
        img:0, kind:'word', want:'def' },
    'drehen':
      { en:'to turn',
        ru:'поворачивать',
        img:0, kind:'word', want:'def' },
    'falsch':
      { en:'wrong',
        ru:'неправильный',
        img:0, kind:'word', want:'def' },
    'schwer':
      { en:'heavy',
        ru:'тяжёлый',
        img:0, kind:'word', want:'def' },
    'das Gleis':
      { en:'platform / track',
        ru:'путь / платформа',
        img:0, kind:'word', want:'def' },
    'die Abfahrtstafel':
      { en:'departure board',
        ru:'табло отправлений',
        img:0, kind:'word', want:'def' },
    'der Schaffner':
      { en:'conductor',
        ru:'проводник',
        img:0, kind:'word', want:'def' },
    'kontrollieren':
      { en:'to check',
        ru:'проверять',
        img:0, kind:'word', want:'def' },
    'schütteln':
      { en:'to shake',
        ru:'качать',
        img:0, kind:'word', want:'def' },
    'sich irren':
      { en:'to be mistaken',
        ru:'ошибаться',
        img:0, kind:'phrase', want:'def' },
    'eilig':
      { en:'hurried',
        ru:'торопливый',
        img:0, kind:'word', want:'def' },
    'probieren':
      { en:'to taste / try',
        ru:'пробовать',
        img:0, kind:'word', want:'def' },
    'salzig':
      { en:'salty',
        ru:'солёный',
        img:0, kind:'word', want:'def' },
    'die Jackentasche':
      { en:'jacket pocket',
        ru:'карман куртки',
        img:0, kind:'word', want:'def' },
    'klingeln':
      { en:'to ring',
        ru:'звонить',
        img:0, kind:'word', want:'def' },
    'zu spät kommen':
      { en:'to be late',
        ru:'опаздывать',
        img:0, kind:'phrase', want:'def' },
    'der Zettel':
      { en:'note',
        ru:'записка',
        img:0, kind:'word', want:'def' },
    'das Sandwich':
      { en:'sandwich',
        ru:'бутерброд',
        img:0, kind:'word', want:'def' },
    'anfassen':
      { en:'to touch',
        ru:'трогать',
        img:0, kind:'word', want:'def' },
    'folgen':
      { en:'to follow',
        ru:'следовать',
        img:0, kind:'word', want:'def' },
    'zufrieden':
      { en:'satisfied',
        ru:'довольный',
        img:0, kind:'word', want:'def' },
    'glauben':
      { en:'to believe',
        ru:'верить',
        img:0, kind:'word', want:'def' },
    'die Stange':
      { en:'rail / pole',
        ru:'поручень',
        img:0, kind:'word', want:'def' },
    'die Etage':
      { en:'floor / story',
        ru:'этаж',
        img:0, kind:'word', want:'def' },
    'drücken':
      { en:'to push',
        ru:'толкать',
        img:0, kind:'word', want:'def' },
    'erstarren':
      { en:'to freeze',
        ru:'замереть',
        img:0, kind:'word', want:'def' },
    'sich entschuldigen':
      { en:'to apologize',
        ru:'извиняться',
        img:0, kind:'phrase', want:'def' },
    'der Becher':
      { en:'cup',
        ru:'стакан',
        img:0, kind:'word', want:'def' },
    'die Kassiererin':
      { en:'cashier',
        ru:'кассирша',
        img:0, kind:'word', want:'def' },
    'der Straßenreiniger':
      { en:'street cleaner',
        ru:'дворник',
        img:0, kind:'word', want:'def' },
    'sich umsehen':
      { en:'to look around',
        ru:'оглядываться',
        img:0, kind:'phrase', want:'def' },
    'zusätzlich':
      { en:'extra / additional',
        ru:'дополнительный',
        img:0, kind:'word', want:'def' },
    'die Mitbewohnerin':
      { en:'roommate',
        ru:'соседка по квартире',
        img:0, kind:'word', want:'def' },
    'das Datum':
      { en:'date',
        ru:'дата',
        img:0, kind:'word', want:'def' },
    'rennen':
      { en:'to run',
        ru:'бежать',
        img:0, kind:'word', want:'def' },
    'die Hälfte':
      { en:'half',
        ru:'половина',
        img:0, kind:'word', want:'def' },
    'schneiden':
      { en:'to cut',
        ru:'резать',
        img:0, kind:'word', want:'def' },
    'reif':
      { en:'ripe',
        ru:'спелый',
        img:0, kind:'word', want:'def' },
    'der Gehweg':
      { en:'sidewalk',
        ru:'тротуар',
        img:0, kind:'word', want:'def' },
    'das Loch':
      { en:'hole',
        ru:'дырка',
        img:0, kind:'word', want:'def' },
    'rollen':
      { en:'to roll',
        ru:'катиться',
        img:0, kind:'word', want:'def' },
    'herausfallen':
      { en:'to fall out',
        ru:'выпадать',
        img:0, kind:'word', want:'def' },
    'entdecken':
      { en:'to discover',
        ru:'обнаруживать',
        img:0, kind:'word', want:'def' },
    'zeigen':
      { en:'to point',
        ru:'показывать',
        img:0, kind:'word', want:'def' },
    'einsammeln':
      { en:'to collect',
        ru:'собирать',
        img:0, kind:'word', want:'def' },
    'die Nachbarin':
      { en:'neighbour',
        ru:'соседка',
        img:0, kind:'word', want:'def' },
    'das Klavier':
      { en:'piano',
        ru:'пианино',
        img:0, kind:'word', want:'def' },
    'die Tochter':
      { en:'daughter',
        ru:'дочь',
        img:0, kind:'word', want:'def' },
    'zurückkommen':
      { en:'to return',
        ru:'возвращаться',
        img:0, kind:'word', want:'def' },
    'leiser stellen':
      { en:'to turn down',
        ru:'сделать тише',
        img:0, kind:'phrase', want:'def' },
    'still':
      { en:'silent',
        ru:'тихий',
        img:0, kind:'word', want:'def' },
    'regelmäßig':
      { en:'regularly',
        ru:'регулярно',
        img:0, kind:'word', want:'def' },
    'das Schuhgeschäft':
      { en:'shoe shop',
        ru:'обувной магазин',
        img:0, kind:'word', want:'def' },
    'die Turnschuhe':
      { en:'sneakers',
        ru:'кроссовки',
        img:0, kind:'word', want:'def' },
    'ignorieren':
      { en:'to ignore',
        ru:'игнорировать',
        img:0, kind:'word', want:'def' },
    'weitergehen':
      { en:'to keep walking',
        ru:'идти дальше',
        img:0, kind:'word', want:'def' },
    'das Bibliotheksbuch':
      { en:'library book',
        ru:'библиотечная книга',
        img:0, kind:'word', want:'def' },
    'die Bibliothek':
      { en:'library',
        ru:'библиотека',
        img:0, kind:'word', want:'def' },
    'die Gebühr':
      { en:'fee',
        ru:'штраф / плата',
        img:0, kind:'word', want:'def' },
    'die Bibliothekarin':
      { en:'librarian',
        ru:'библиотекарь',
        img:0, kind:'word', want:'def' },
    'zurückgeben':
      { en:'to return',
        ru:'возвращать',
        img:0, kind:'word', want:'def' },
    'sich Sorgen machen':
      { en:'to worry',
        ru:'беспокоиться',
        img:0, kind:'phrase', want:'def' },
    'schulden':
      { en:'to owe',
        ru:'быть должным',
        img:0, kind:'word', want:'def' },
    'prüfen':
      { en:'to check',
        ru:'проверять',
        img:0, kind:'word', want:'def' },
    'der Ständer':
      { en:'stand / rack',
        ru:'подставка',
        img:0, kind:'word', want:'def' },
    'der Buchstabe':
      { en:'letter',
        ru:'буква',
        img:0, kind:'word', want:'def' },
    'der Opa':
      { en:'grandpa',
        ru:'дедушка',
        img:0, kind:'word', want:'def' },
    'vertauschen':
      { en:'to mix up',
        ru:'перепутать',
        img:0, kind:'word', want:'def' },
    'der Mitternachtssnack':
      { en:'midnight snack',
        ru:'полуночный перекус',
        img:0, kind:'word', want:'def' },
    'wecken':
      { en:'to wake someone',
        ru:'будить',
        img:0, kind:'word', want:'def' },
    'greifen':
      { en:'to reach / grab',
        ru:'тянуться / хватать',
        img:0, kind:'word', want:'def' },
    'sich erschrecken':
      { en:'to get scared',
        ru:'пугаться',
        img:0, kind:'phrase', want:'def' },
    'das Mittagessen':
      { en:'lunch',
        ru:'обед',
        img:0, kind:'word', want:'def' },
    'die Brotdose':
      { en:'lunch box',
        ru:'контейнер для обеда',
        img:0, kind:'word', want:'def' },
    'seufzen':
      { en:'to sigh',
        ru:'вздыхать',
        img:0, kind:'word', want:'def' },
    'rufen':
      { en:'to call out',
        ru:'звать',
        img:0, kind:'word', want:'def' },
    'streichen':
      { en:'to paint',
        ru:'красить',
        img:0, kind:'word', want:'def' },
    'frisch gestrichen':
      { en:'freshly painted',
        ru:'свежевыкрашенный',
        img:0, kind:'phrase', want:'def' },
    'knapp':
      { en:'close / narrowly',
        ru:'едва / чуть не',
        img:0, kind:'word', want:'def' },
    'der Akku':
      { en:'battery',
        ru:'аккумулятор',
        img:0, kind:'word', want:'def' },
    'das Ladegerät':
      { en:'charger',
        ru:'зарядное устройство',
        img:0, kind:'word', want:'def' },
    'die Steckdose':
      { en:'electrical outlet',
        ru:'розетка',
        img:0, kind:'word', want:'def' },
    'der Ladeanschluss':
      { en:'charging port',
        ru:'разъём для зарядки',
        img:0, kind:'word', want:'def' },
    'der Sitz':
      { en:'seat',
        ru:'сиденье',
        img:0, kind:'word', want:'def' },
    'der Fahrgast':
      { en:'passenger',
        ru:'пассажир',
        img:0, kind:'word', want:'def' },
    'aufladen':
      { en:'to charge',
        ru:'заряжать',
        img:0, kind:'word', want:'def' },
    'der Geburtstag':
      { en:'birthday',
        ru:'день рождения',
        img:0, kind:'word', want:'def' },
    'der Geburtstagskuchen':
      { en:'birthday cake',
        ru:'праздничный торт',
        img:0, kind:'word', want:'def' },
    'der Wunsch':
      { en:'wish',
        ru:'желание',
        img:0, kind:'word', want:'def' },
    'die Scherzkerze':
      { en:'trick candle',
        ru:'шуточная свеча',
        img:0, kind:'word', want:'def' },
    'sich etwas wünschen':
      { en:'to make a wish',
        ru:'загадывать желание',
        img:0, kind:'phrase', want:'def' },
    'pusten':
      { en:'to blow',
        ru:'дуть',
        img:0, kind:'word', want:'def' },
    'sich anzünden':
      { en:'to light itself',
        ru:'загораться',
        img:0, kind:'phrase', want:'def' },
    'die Sporttasche':
      { en:'sports bag',
        ru:'спортивная сумка',
        img:0, kind:'word', want:'def' },
    'das Fitnessstudio':
      { en:'gym',
        ru:'спортзал',
        img:0, kind:'word', want:'def' },
    'die Fußballschuhe':
      { en:'football shoes',
        ru:'футбольные бутсы',
        img:0, kind:'word', want:'def' },
    'das Trikot':
      { en:'jersey',
        ru:'спортивная футболка',
        img:0, kind:'word', want:'def' },
    'das Namensschild':
      { en:'name tag',
        ru:'бирка с именем',
        img:0, kind:'word', want:'def' },
    'die Rezeption':
      { en:'front desk',
        ru:'стойка регистрации',
        img:0, kind:'word', want:'def' },
    'gehören':
      { en:'to belong',
        ru:'принадлежать',
        img:0, kind:'word', want:'def' },
    'verwechseln':
      { en:'to mix up',
        ru:'перепутать',
        img:0, kind:'word', want:'def' },
    'der Schneemann':
      { en:'snowman',
        ru:'снеговик',
        img:0, kind:'word', want:'def' },
    'die Karotte':
      { en:'carrot',
        ru:'морковь',
        img:0, kind:'word', want:'def' },
    'die Fußspur':
      { en:'footprint',
        ru:'след',
        img:0, kind:'word', want:'def' },
    'das Gartentor':
      { en:'garden gate',
        ru:'калитка',
        img:0, kind:'word', want:'def' },
    'bauen':
      { en:'to build',
        ru:'строить',
        img:0, kind:'word', want:'def' },
    'holen':
      { en:'to get / fetch',
        ru:'приносить',
        img:0, kind:'word', want:'def' },
    'führen':
      { en:'to lead',
        ru:'вести',
        img:0, kind:'word', want:'def' },
    'brauchen':
      { en:'to need',
        ru:'нуждаться',
        img:0, kind:'word', want:'def' },
    'beobachten':
      { en:'to watch / observe',
        ru:'наблюдать',
        img:0, kind:'word', want:'def' },
    'bleiben':
      { en:'to stay',
        ru:'оставаться',
        img:0, kind:'word', want:'def' },
    'Angst haben':
      { en:'to be afraid',
        ru:'бояться',
        img:0, kind:'phrase', want:'def' },
    'landen':
      { en:'to land',
        ru:'приземляться',
        img:0, kind:'word', want:'def' },
    'singen':
      { en:'to sing',
        ru:'петь',
        img:0, kind:'word', want:'def' },
    'näher kommen':
      { en:'to come closer',
        ru:'приближаться',
        img:0, kind:'phrase', want:'def' },
    'einsam':
      { en:'lonely',
        ru:'одинокий',
        img:0, kind:'word', want:'def' },
    'allein':
      { en:'alone',
        ru:'один / одна',
        img:0, kind:'word', want:'def' },
    'das Futter':
      { en:'food / feed',
        ru:'корм',
        img:0, kind:'word', want:'def' },
    'schwimmen':
      { en:'to swim',
        ru:'плавать',
        img:0, kind:'word', want:'def' },
    'wissen':
      { en:'to know',
        ru:'знать',
        img:0, kind:'word', want:'def' },
    'fressen':
      { en:'to eat (animal)',
        ru:'есть',
        img:0, kind:'word', want:'def' },
    'sich fühlen':
      { en:'to feel',
        ru:'чувствовать себя',
        img:0, kind:'phrase', want:'def' },
    'wegschwimmen':
      { en:'to swim away',
        ru:'уплывать',
        img:0, kind:'word', want:'def' },
    'hilfsbereit':
      { en:'helpful',
        ru:'готовый помочь',
        img:0, kind:'word', want:'def' },
    'das Ticket':
      { en:'ticket',
        ru:'билет',
        img:0, kind:'word', want:'def' },
    'verloren':
      { en:'lost',
        ru:'потерянный',
        img:0, kind:'word', want:'def' },
    'die Lebensmittel':
      { en:'groceries / food',
        ru:'продукты',
        img:0, kind:'word', want:'def' },
    'legen':
      { en:'to put',
        ru:'класть',
        img:0, kind:'word', want:'def' },
    'stellen':
      { en:'to put / set',
        ru:'ставить',
        img:0, kind:'word', want:'def' },
    'das Ei':
      { en:'egg',
        ru:'яйцо',
        img:0, kind:'word', want:'def' },
    'der Ehemann':
      { en:'husband',
        ru:'муж',
        img:0, kind:'word', want:'def' },
    'das Geschirr':
      { en:'dishes',
        ru:'посуда',
        img:0, kind:'word', want:'def' },
    'früh aufstehen':
      { en:'to get up early',
        ru:'рано вставать',
        img:0, kind:'phrase', want:'def' },
    'frei':
      { en:'free / available',
        ru:'свободный',
        img:0, kind:'word', want:'def' },
    'jemandem seinen Platz geben':
      { en:'to give someone your seat',
        ru:'уступить кому-то место',
        img:0, kind:'phrase', want:'def' },
    'sich freuen':
      { en:'to be happy / pleased',
        ru:'радоваться',
        img:0, kind:'phrase', want:'def' },
    'die Mitarbeiterin':
      { en:'employee',
        ru:'сотрудница',
        img:0, kind:'word', want:'def' },
    'passen':
      { en:'to fit',
        ru:'подходить по размеру',
        img:0, kind:'word', want:'def' },
    'die Arbeit':
      { en:'work',
        ru:'работа',
        img:0, kind:'word', want:'def' },
    'das Schlafzimmer':
      { en:'bedroom',
        ru:'спальня',
        img:0, kind:'word', want:'def' },
    'bereit sein':
      { en:'to be ready',
        ru:'быть готовым',
        img:0, kind:'phrase', want:'def' },
    'liegen':
      { en:'to lie / be located',
        ru:'лежать',
        img:0, kind:'word', want:'def' },
    'das Essen':
      { en:'food',
        ru:'еда',
        img:0, kind:'word', want:'def' },
    'das Getränk':
      { en:'drink',
        ru:'напиток',
        img:0, kind:'word', want:'def' },
    'die Kartoffel':
      { en:'potato',
        ru:'картофель',
        img:0, kind:'word', want:'def' },
    'sich unterhalten':
      { en:'to talk / chat',
        ru:'разговаривать',
        img:0, kind:'phrase', want:'def' },
    'weiterfahren':
      { en:'to continue driving',
        ru:'ехать дальше',
        img:0, kind:'word', want:'def' },
    'die Einkaufsliste':
      { en:'shopping list',
        ru:'список покупок',
        img:0, kind:'word', want:'def' },
    'genug':
      { en:'enough',
        ru:'достаточно',
        img:0, kind:'word', want:'def' },
    'das Büro':
      { en:'office',
        ru:'офис',
        img:0, kind:'word', want:'def' },
    'der Computer':
      { en:'computer',
        ru:'компьютер',
        img:0, kind:'word', want:'def' },
    'die Nachricht':
      { en:'message',
        ru:'сообщение',
        img:0, kind:'word', want:'def' },
    'die E-Mail':
      { en:'email',
        ru:'электронное письмо',
        img:0, kind:'word', want:'def' },
    'der Arbeitstag':
      { en:'workday',
        ru:'рабочий день',
        img:0, kind:'word', want:'def' },
    'nach Hause gehen':
      { en:'to go home',
        ru:'идти домой',
        img:0, kind:'phrase', want:'def' },
    'die Hosentasche':
      { en:'trouser pocket',
        ru:'карман брюк',
        img:0, kind:'word', want:'def' },
    'aufschließen':
      { en:'to unlock',
        ru:'отпирать',
        img:0, kind:'word', want:'def' },
    'hineingehen':
      { en:'to go inside',
        ru:'входить',
        img:0, kind:'word', want:'def' },
    'verschließen':
      { en:'to lock',
        ru:'запирать',
        img:0, kind:'word', want:'def' },
    'das Obst':
      { en:'fruit',
        ru:'фрукты',
        img:0, kind:'word', want:'def' },
    'reden':
      { en:'to talk',
        ru:'разговаривать',
        img:0, kind:'word', want:'def' },
    'eine halbe Stunde':
      { en:'half an hour',
        ru:'полчаса',
        img:0, kind:'phrase', want:'def' },
    'das Taxi':
      { en:'taxi',
        ru:'такси',
        img:0, kind:'word', want:'def' },
    'die Fahrt':
      { en:'journey / ride',
        ru:'поездка',
        img:0, kind:'word', want:'def' },
    'richtig':
      { en:'correct',
        ru:'правильный',
        img:0, kind:'word', want:'def' },
    'das Geburtstagsgeschenk':
      { en:'birthday present',
        ru:'подарок на день рождения',
        img:0, kind:'word', want:'def' },
    'sich etwas ansehen':
      { en:'to look at something',
        ru:'рассматривать',
        img:0, kind:'phrase', want:'def' },
    'gefallen':
      { en:'to please / be liked',
        ru:'нравиться',
        img:0, kind:'word', want:'def' },
    'schließlich':
      { en:'finally',
        ru:'наконец',
        img:0, kind:'word', want:'def' },
    'das Glas':
      { en:'glass',
        ru:'стакан / бокал',
        img:0, kind:'word', want:'def' },
    'fertig sein':
      { en:'to be ready',
        ru:'быть готовым',
        img:0, kind:'phrase', want:'def' },
    'fast':
      { en:'almost',
        ru:'почти',
        img:0, kind:'word', want:'def' },
    'das Wartezimmer':
      { en:'waiting room',
        ru:'зал ожидания',
        img:0, kind:'word', want:'def' },
    'aufrufen':
      { en:'to call someone in',
        ru:'вызывать',
        img:0, kind:'word', want:'def' },
    'früh':
      { en:'early',
        ru:'рано',
        img:0, kind:'word', want:'def' },
    'draußen sitzen':
      { en:'to sit outside',
        ru:'сидеть на улице',
        img:0, kind:'phrase', want:'def' },
    'sonnig':
      { en:'sunny',
        ru:'солнечный',
        img:0, kind:'word', want:'def' },
    'Hunger haben':
      { en:'to be hungry',
        ru:'быть голодным',
        img:0, kind:'phrase', want:'def' },
    'lustig':
      { en:'funny',
        ru:'смешной',
        img:0, kind:'word', want:'def' },
    'in der Nähe':
      { en:'nearby',
        ru:'поблизости',
        img:0, kind:'phrase', want:'def' },
    'nach Hause kommen':
      { en:'to come home',
        ru:'приходить домой',
        img:0, kind:'phrase', want:'def' },
    'sich umziehen':
      { en:'to change clothes',
        ru:'переодеваться',
        img:0, kind:'phrase', want:'def' },
    'anstrengend':
      { en:'tiring / exhausting',
        ru:'утомительный',
        img:0, kind:'word', want:'def' },
    'danken':
      { en:'to thank',
        ru:'благодарить',
        img:0, kind:'word', want:'def' },
    'beenden':
      { en:'to finish',
        ru:'заканчивать',
        img:0, kind:'word', want:'def' },
    'entlangkommen':
      { en:'to come along',
        ru:'приближаться',
        img:0, kind:'word', want:'def' },
    'putzen':
      { en:'to clean',
        ru:'убирать',
        img:0, kind:'word', want:'def' },
    'draußen':
      { en:'outside',
        ru:'на улице',
        img:0, kind:'word', want:'def' },
    'einen Spaziergang machen':
      { en:'to take a walk',
        ru:'гулять',
        img:0, kind:'phrase', want:'def' },
    'einen Film sehen':
      { en:'to watch a movie',
        ru:'смотреть фильм',
        img:0, kind:'phrase', want:'def' },
    'das Sushi':
      { en:'sushi',
        ru:'суши',
        img:0, kind:'word', want:'def' },
    'der Lachs':
      { en:'salmon',
        ru:'лосось',
        img:0, kind:'word', want:'def' },
    'der Thunfisch':
      { en:'tuna',
        ru:'тунец',
        img:0, kind:'word', want:'def' },
    'die Avocado':
      { en:'avocado',
        ru:'авокадо',
        img:0, kind:'word', want:'def' },
    'das Stück':
      { en:'piece',
        ru:'кусочек',
        img:0, kind:'word', want:'def' },
    'fehlen':
      { en:'to be missing',
        ru:'не хватать',
        img:0, kind:'word', want:'def' },
    'der Freund':
      { en:'friend',
        ru:'друг',
        img:0, kind:'word', want:'def' },
    'der Wasabi':
      { en:'wasabi',
        ru:'васаби',
        img:0, kind:'word', want:'def' },
    'früher':
      { en:'before / earlier',
        ru:'раньше',
        img:0, kind:'word', want:'def' },
    'zu viel':
      { en:'too much',
        ru:'слишком много',
        img:0, kind:'phrase', want:'def' },
    'der Mund':
      { en:'mouth',
        ru:'рот',
        img:0, kind:'word', want:'def' },
    'die Stäbchen':
      { en:'chopsticks',
        ru:'палочки',
        img:0, kind:'word', want:'def' },
    'versuchen':
      { en:'to try',
        ru:'пробовать',
        img:0, kind:'word', want:'def' },
    'die Sojasoße':
      { en:'soy sauce',
        ru:'соевый соус',
        img:0, kind:'word', want:'def' },
    'der Versuch':
      { en:'attempt',
        ru:'попытка',
        img:0, kind:'word', want:'def' },
    'der Nebentisch':
      { en:'the next table',
        ru:'соседний столик',
        img:0, kind:'word', want:'def' },
    'hochheben':
      { en:'to pick up',
        ru:'поднимать',
        img:0, kind:'word', want:'def' },
    'schrecklich':
      { en:'terrible',
        ru:'ужасный',
        img:0, kind:'word', want:'def' },
    'der Limburger':
      { en:'Limburger',
        ru:'лимбургер',
        img:0, kind:'word', want:'def' },
    'das Raclette':
      { en:'raclette',
        ru:'раклет',
        img:0, kind:'word', want:'def' },
    'der Raclettekäse':
      { en:'Raclette cheese',
        ru:'сыр раклет',
        img:0, kind:'word', want:'def' },
    'viel':
      { en:'a lot',
        ru:'много',
        img:0, kind:'word', want:'def' },
    'ein bisschen':
      { en:'a little',
        ru:'немного',
        img:0, kind:'phrase', want:'def' },
    'dazugeben':
      { en:'to add',
        ru:'добавлять',
        img:0, kind:'word', want:'def' },
    'die Pasta':
      { en:'pasta',
        ru:'паста / макароны',
        img:0, kind:'word', want:'def' },
    'der Parmesan':
      { en:'Parmesan',
        ru:'пармезан',
        img:0, kind:'word', want:'def' },
    'darüber':
      { en:'on top',
        ru:'сверху',
        img:0, kind:'word', want:'def' },
    'der Mozzarella':
      { en:'mozzarella',
        ru:'моцарелла',
        img:0, kind:'word', want:'def' },
    'der Emmentaler':
      { en:'Emmental',
        ru:'эмменталь',
        img:0, kind:'word', want:'def' },
    'der Feta':
      { en:'feta',
        ru:'фета',
        img:0, kind:'word', want:'def' },
    'der Camembert':
      { en:'camembert',
        ru:'камамбер',
        img:0, kind:'word', want:'def' },
    'der Blauschimmelkäse':
      { en:'blue cheese',
        ru:'сыр с голубой плесенью',
        img:0, kind:'word', want:'def' },
    'der Frischkäse':
      { en:'cream cheese',
        ru:'сливочный сыр',
        img:0, kind:'word', want:'def' },
    'der Bergkäse':
      { en:'mountain cheese',
        ru:'горный сыр',
        img:0, kind:'word', want:'def' },
    'die Rinde':
      { en:'rind',
        ru:'корочка',
        img:0, kind:'word', want:'def' },
    'hart':
      { en:'hard',
        ru:'твёрдый',
        img:0, kind:'word', want:'def' },
    'kräftig':
      { en:'strong / full-flavoured',
        ru:'насыщенный',
        img:0, kind:'word', want:'def' },
    'seltsam':
      { en:'strange',
        ru:'странный',
        img:0, kind:'word', want:'def' },
    'zerfallen':
      { en:'to crumble / fall apart',
        ru:'крошиться',
        img:0, kind:'word', want:'def' },
    'der Mensch':
      { en:'person / human',
        ru:'человек',
        img:0, kind:'word', want:'def' },
    'der Gouda':
      { en:'Gouda',
        ru:'гауда',
        img:0, kind:'word', want:'def' },
    'der Edamer':
      { en:'Edam',
        ru:'эдам',
        img:0, kind:'word', want:'def' },
    'der Butterkäse':
      { en:'butter cheese',
        ru:'буттеркезе',
        img:0, kind:'word', want:'def' },
    'der Tilsiter':
      { en:'Tilsit',
        ru:'тильзитер',
        img:0, kind:'word', want:'def' },
    'der Hartkäse':
      { en:'hard cheese',
        ru:'твёрдый сыр',
        img:0, kind:'word', want:'def' },
    'der Ziegenkäse':
      { en:'goat cheese',
        ru:'козий сыр',
        img:0, kind:'word', want:'def' },
    'die Ziegenmilch':
      { en:'goat\'s milk',
        ru:'козье молоко',
        img:0, kind:'word', want:'def' },
    'der Schimmel':
      { en:'mould',
        ru:'плесень',
        img:0, kind:'word', want:'def' },
    'der Harzer Käse':
      { en:'Harzer cheese',
        ru:'гарцский сыр',
        img:0, kind:'word', want:'def' },
    'der Handkäse':
      { en:'hand cheese',
        ru:'хандкезе',
        img:0, kind:'word', want:'def' },
    'der Hüttenkäse':
      { en:'cottage cheese',
        ru:'зернёный творог',
        img:0, kind:'word', want:'def' },
    'der Quark':
      { en:'quark',
        ru:'кварк',
        img:0, kind:'word', want:'def' },
    'das Milchprodukt':
      { en:'dairy product',
        ru:'молочный продукт',
        img:0, kind:'word', want:'def' },
    'das Fett':
      { en:'fat',
        ru:'жир',
        img:0, kind:'word', want:'def' },
    'krümelig':
      { en:'crumbly',
        ru:'рассыпчатый',
        img:0, kind:'word', want:'def' },
    'mild':
      { en:'mild',
        ru:'мягкий по вкусу',
        img:0, kind:'word', want:'def' },
    'herzhaft':
      { en:'savoury',
        ru:'несладкий / сытный',
        img:0, kind:'word', want:'def' },
    'reiben':
      { en:'to grate',
        ru:'тереть на тёрке',
        img:0, kind:'word', want:'def' },
    'erhitzen':
      { en:'to heat',
        ru:'нагревать',
        img:0, kind:'word', want:'def' },
    'herstellen':
      { en:'to make / produce',
        ru:'изготавливать',
        img:0, kind:'word', want:'def' },
    'enthalten':
      { en:'to contain',
        ru:'содержать',
        img:0, kind:'word', want:'def' },
    'streichen':
      { en:'to spread',
        ru:'намазывать',
        img:0, kind:'word', want:'def' },
    'sich unterscheiden':
      { en:'to differ',
        ru:'отличаться',
        img:0, kind:'phrase', want:'def' },
    'das Gericht':
      { en:'dish',
        ru:'блюдо',
        img:0, kind:'word', want:'def' },
    'Japan':
      { en:'Japan',
        ru:'Япония',
        img:0, kind:'word', want:'def' },
    'roh':
      { en:'raw',
        ru:'сырой',
        img:0, kind:'word', want:'def' },
    'der Reis':
      { en:'rice',
        ru:'рис',
        img:0, kind:'word', want:'def' },
    'die Zutat':
      { en:'ingredient',
        ru:'ингредиент',
        img:0, kind:'word', want:'def' },
    'zubereiten':
      { en:'to prepare',
        ru:'готовить',
        img:0, kind:'word', want:'def' },
    'kombinieren':
      { en:'to combine',
        ru:'сочетать',
        img:0, kind:'word', want:'def' },
    'die Meeresfrüchte':
      { en:'seafood',
        ru:'морепродукты',
        img:0, kind:'word', want:'def' },
    'die Garnele':
      { en:'shrimp / prawn',
        ru:'креветка',
        img:0, kind:'word', want:'def' },
    'die Krabbe':
      { en:'crab',
        ru:'краб',
        img:0, kind:'word', want:'def' },
    'die Gurke':
      { en:'cucumber',
        ru:'огурец',
        img:0, kind:'word', want:'def' },
    'vegetarisch':
      { en:'vegetarian',
        ru:'вегетарианский',
        img:0, kind:'word', want:'def' },
    'genießen':
      { en:'to enjoy',
        ru:'наслаждаться',
        img:0, kind:'word', want:'def' },
    'die Sushi-Rolle':
      { en:'sushi roll',
        ru:'ролл',
        img:0, kind:'word', want:'def' },
    'die Algen':
      { en:'seaweed',
        ru:'водоросли',
        img:0, kind:'word', want:'def' },
    'das Nigiri':
      { en:'nigiri',
        ru:'нигири',
        img:0, kind:'word', want:'def' },
    'der Belag':
      { en:'topping',
        ru:'начинка',
        img:0, kind:'word', want:'def' },
    'die Beilage':
      { en:'side dish',
        ru:'дополнение / гарнир',
        img:0, kind:'word', want:'def' },
    'scharf':
      { en:'sharp / hot',
        ru:'острый',
        img:0, kind:'word', want:'def' },
    'die Menge':
      { en:'amount',
        ru:'количество',
        img:0, kind:'word', want:'def' },
    'der Ingwer':
      { en:'ginger',
        ru:'имбирь',
        img:0, kind:'word', want:'def' },
    'eingelegt':
      { en:'pickled',
        ru:'маринованный',
        img:0, kind:'word', want:'def' },
    'erfahren':
      { en:'experienced',
        ru:'опытный',
        img:0, kind:'word', want:'def' },
    'das Aussehen':
      { en:'appearance',
        ru:'внешний вид',
        img:0, kind:'word', want:'def' },
    'der Koch':
      { en:'chef / cook',
        ru:'повар',
        img:0, kind:'word', want:'def' },
    'anordnen':
      { en:'to arrange',
        ru:'располагать',
        img:0, kind:'word', want:'def' },
    'das Kunstwerk':
      { en:'work of art',
        ru:'произведение искусства',
        img:0, kind:'word', want:'def' },
    'bevorzugen':
      { en:'to prefer',
        ru:'предпочитать',
        img:0, kind:'word', want:'def' },
    'vorsichtig':
      { en:'careful',
        ru:'осторожный',
        img:0, kind:'word', want:'def' },
    'lebhaft':
      { en:'lively / busy',
        ru:'оживлённый',
        img:0, kind:'word', want:'def' },
    'der Garten':
      { en:'garden',
        ru:'сад',
        img:0, kind:'word', want:'def' },
    'die Wiese':
      { en:'lawn / meadow',
        ru:'лужайка',
        img:0, kind:'word', want:'def' },
    'der Weg':
      { en:'path',
        ru:'дорожка',
        img:0, kind:'word', want:'def' },
    'der Lärm':
      { en:'noise',
        ru:'шум',
        img:0, kind:'word', want:'def' },
    'entkommen':
      { en:'to escape',
        ru:'убежать / спастись',
        img:0, kind:'word', want:'def' },
    'joggen':
      { en:'to jog',
        ru:'бегать',
        img:0, kind:'word', want:'def' },
    'das Radfahren':
      { en:'cycling',
        ru:'езда на велосипеде',
        img:0, kind:'word', want:'def' },
    'das Picknick':
      { en:'picnic',
        ru:'пикник',
        img:0, kind:'word', want:'def' },
    'entspannen':
      { en:'to relax',
        ru:'отдыхать',
        img:0, kind:'word', want:'def' },
    'das Gelände':
      { en:'grounds / site',
        ru:'территория',
        img:0, kind:'word', want:'def' },
    'der Flughafen':
      { en:'airport',
        ru:'аэропорт',
        img:0, kind:'word', want:'def' },
    'ehemalig':
      { en:'former',
        ru:'бывший',
        img:0, kind:'word', want:'def' },
    'die Start- und Landebahn':
      { en:'runway',
        ru:'взлётно-посадочная полоса',
        img:0, kind:'word', want:'def' },
    'die Landschaft':
      { en:'landscape',
        ru:'местность / пейзаж',
        img:0, kind:'word', want:'def' },
    'öffentlich':
      { en:'public',
        ru:'общественный',
        img:0, kind:'word', want:'def' },
    'das Jahrhundert':
      { en:'century',
        ru:'век',
        img:0, kind:'word', want:'def' },
    'die Erholung':
      { en:'recreation / rest',
        ru:'отдых',
        img:0, kind:'word', want:'def' },
    'der Brunnen':
      { en:'fountain',
        ru:'фонтан',
        img:0, kind:'word', want:'def' },
    'der Fluss':
      { en:'river',
        ru:'река',
        img:0, kind:'word', want:'def' },
    'das Ehrenmal':
      { en:'memorial',
        ru:'мемориал',
        img:0, kind:'word', want:'def' },
    'die Grünanlage':
      { en:'green space',
        ru:'зелёная зона',
        img:0, kind:'word', want:'def' },
    'die Bedeutung':
      { en:'meaning / importance',
        ru:'значение',
        img:0, kind:'word', want:'def' },
    'der Spielplatz':
      { en:'playground',
        ru:'детская площадка',
        img:0, kind:'word', want:'def' },
    'der Teich':
      { en:'pond',
        ru:'пруд',
        img:0, kind:'word', want:'def' },
    'das Viertel':
      { en:'neighbourhood',
        ru:'район',
        img:0, kind:'word', want:'def' },
    'der Treffpunkt':
      { en:'meeting place',
        ru:'место встречи',
        img:0, kind:'word', want:'def' },
    'die Jahreszeit':
      { en:'season',
        ru:'время года',
        img:0, kind:'word', want:'def' },
    'blühen':
      { en:'to bloom',
        ru:'цвести',
        img:0, kind:'word', want:'def' },
    'bunt':
      { en:'colourful',
        ru:'разноцветный',
        img:0, kind:'word', want:'def' },
    'die Natur':
      { en:'nature',
        ru:'природа',
        img:0, kind:'word', want:'def' },
    'die Bewegung':
      { en:'exercise / movement',
        ru:'движение',
        img:0, kind:'word', want:'def' },
    'aufwendig':
      { en:'elaborate',
        ru:'сложный',
        img:0, kind:'word', want:'def' },
    'das Produkt':
      { en:'product',
        ru:'средство / продукт',
        img:0, kind:'word', want:'def' },
    'der Anlass':
      { en:'occasion',
        ru:'повод / случай',
        img:0, kind:'word', want:'def' },
    'der Lippenstift':
      { en:'lipstick',
        ru:'помада',
        img:0, kind:'word', want:'def' },
    'die Lippe':
      { en:'lip',
        ru:'губа',
        img:0, kind:'word', want:'def' },
    'der Farbton':
      { en:'shade / tone',
        ru:'оттенок',
        img:0, kind:'word', want:'def' },
    'glänzend':
      { en:'shiny',
        ru:'блестящий',
        img:0, kind:'word', want:'def' },
    'die Wimper':
      { en:'eyelash',
        ru:'ресница',
        img:0, kind:'word', want:'def' },
    'auftragen':
      { en:'to apply',
        ru:'наносить',
        img:0, kind:'word', want:'def' },
    'wasserfest':
      { en:'waterproof',
        ru:'водостойкий',
        img:0, kind:'word', want:'def' },
    'verlaufen':
      { en:'to run / smudge',
        ru:'растекаться',
        img:0, kind:'word', want:'def' },
    'betonen':
      { en:'to emphasise',
        ru:'подчёркивать',
        img:0, kind:'word', want:'def' },
    'der Lidschatten':
      { en:'eyeshadow',
        ru:'тени',
        img:0, kind:'word', want:'def' },
    'das Augenlid':
      { en:'eyelid',
        ru:'веко',
        img:0, kind:'word', want:'def' },
    'gleichmäßig':
      { en:'even',
        ru:'ровный',
        img:0, kind:'word', want:'def' },
    'der Fleck':
      { en:'spot / mark',
        ru:'пятно',
        img:0, kind:'word', want:'def' },
    'abdecken':
      { en:'to cover',
        ru:'скрывать',
        img:0, kind:'word', want:'def' },
    'der Glanz':
      { en:'shine',
        ru:'блеск',
        img:0, kind:'word', want:'def' },
    'die Haut':
      { en:'skin',
        ru:'кожа',
        img:0, kind:'word', want:'def' },
    'die Wange':
      { en:'cheek',
        ru:'щека',
        img:0, kind:'word', want:'def' },
    'die Augenbraue':
      { en:'eyebrow',
        ru:'бровь',
        img:0, kind:'word', want:'def' },
    'die Form':
      { en:'shape',
        ru:'форма',
        img:0, kind:'word', want:'def' },
    'der Pinsel':
      { en:'brush',
        ru:'кисть',
        img:0, kind:'word', want:'def' },
    'das Hilfsmittel':
      { en:'tool',
        ru:'инструмент',
        img:0, kind:'word', want:'def' },
    'die Hautpflege':
      { en:'skin care',
        ru:'уход за кожей',
        img:0, kind:'word', want:'def' },
    'die Feuchtigkeit':
      { en:'moisture',
        ru:'влага',
        img:0, kind:'word', want:'def' },
    'reinigen':
      { en:'to clean',
        ru:'очищать',
        img:0, kind:'word', want:'def' },
    'das Parfüm':
      { en:'perfume',
        ru:'духи',
        img:0, kind:'word', want:'def' },
    'der Duft':
      { en:'scent',
        ru:'аромат',
        img:0, kind:'word', want:'def' },
    'blumig':
      { en:'floral',
        ru:'цветочный',
        img:0, kind:'word', want:'def' },
    'fruchtig':
      { en:'fruity',
        ru:'фруктовый',
        img:0, kind:'word', want:'def' },
    'sich wohlfühlen':
      { en:'to feel comfortable',
        ru:'чувствовать себя комфортно',
        img:0, kind:'phrase', want:'def' },
    'belebt':
      { en:'busy / lively',
        ru:'оживлённый',
        img:0, kind:'word', want:'def' },
    'das Nachtleben':
      { en:'nightlife',
        ru:'ночная жизнь',
        img:0, kind:'word', want:'def' },
    'die Seite':
      { en:'side',
        ru:'сторона',
        img:0, kind:'word', want:'def' },
    'der See':
      { en:'lake',
        ru:'озеро',
        img:0, kind:'word', want:'def' },
    'die Badestelle':
      { en:'swimming spot',
        ru:'место для купания',
        img:0, kind:'word', want:'def' },
    'die Hitze':
      { en:'heat',
        ru:'жара',
        img:0, kind:'word', want:'def' },
    'baden':
      { en:'to bathe / swim',
        ru:'купаться',
        img:0, kind:'word', want:'def' },
    'der Südwesten':
      { en:'southwest',
        ru:'юго-запад',
        img:0, kind:'word', want:'def' },
    'das Strandbad':
      { en:'lido / lakeside bathing area',
        ru:'оборудованное место для купания',
        img:0, kind:'word', want:'def' },
    'der Sandstrand':
      { en:'sandy beach',
        ru:'песчаный пляж',
        img:0, kind:'word', want:'def' },
    'das Sommerleben':
      { en:'summer life',
        ru:'летняя жизнь',
        img:0, kind:'word', want:'def' },
    'der Sommertag':
      { en:'summer day',
        ru:'летний день',
        img:0, kind:'word', want:'def' },
    'der Südosten':
      { en:'southeast',
        ru:'юго-восток',
        img:0, kind:'word', want:'def' },
    'die Umgebung':
      { en:'surroundings',
        ru:'окрестности',
        img:0, kind:'word', want:'def' },
    'das Paddeln':
      { en:'paddling',
        ru:'гребля',
        img:0, kind:'word', want:'def' },
    'die Fläche':
      { en:'area / open space',
        ru:'площадь / пространство',
        img:0, kind:'word', want:'def' },
    'das Stadtzentrum':
      { en:'city centre',
        ru:'центр города',
        img:0, kind:'word', want:'def' },
    'das Erlebnis':
      { en:'experience',
        ru:'впечатление',
        img:0, kind:'word', want:'def' },
    'umgeben':
      { en:'surrounded',
        ru:'окружённый',
        img:0, kind:'word', want:'def' },
    'sich ausruhen':
      { en:'to rest',
        ru:'отдыхать',
        img:0, kind:'phrase', want:'def' },
    'der Ausflug':
      { en:'outing / trip',
        ru:'поездка',
        img:0, kind:'word', want:'def' },
    'der Nordosten':
      { en:'northeast',
        ru:'северо-восток',
        img:0, kind:'word', want:'def' },
    'das Gewässer':
      { en:'body of water',
        ru:'водоём',
        img:0, kind:'word', want:'def' },
    'die Umkleide':
      { en:'changing room',
        ru:'раздевалка',
        img:0, kind:'word', want:'def' },
    'die Einrichtung':
      { en:'facility',
        ru:'удобство',
        img:0, kind:'word', want:'def' },
    'der Aufenthalt':
      { en:'stay',
        ru:'пребывание',
        img:0, kind:'word', want:'def' },
    'das Freibad':
      { en:'outdoor pool',
        ru:'открытый бассейн',
        img:0, kind:'word', want:'def' },
    'das Hallenbad':
      { en:'indoor pool',
        ru:'крытый бассейн',
        img:0, kind:'word', want:'def' },
    'der Schwimmer':
      { en:'swimmer',
        ru:'пловец',
        img:0, kind:'word', want:'def' },
    'der Vogel':
      { en:'bird',
        ru:'птица',
        img:0, kind:'word', want:'def' },
    'das Boot':
      { en:'boat',
        ru:'лодка',
        img:0, kind:'word', want:'def' },
    'örtlich':
      { en:'local',
        ru:'местный',
        img:0, kind:'word', want:'def' },
    'erlaubt':
      { en:'allowed',
        ru:'разрешено',
        img:0, kind:'word', want:'def' },
    'überwachen':
      { en:'to monitor',
        ru:'контролировать',
        img:0, kind:'word', want:'def' },
    'die Badesaison':
      { en:'swimming season',
        ru:'купальный сезон',
        img:0, kind:'word', want:'def' },
    'die Wasserqualität':
      { en:'water quality',
        ru:'качество воды',
        img:0, kind:'word', want:'def' },
    'der Zustand':
      { en:'condition',
        ru:'состояние',
        img:0, kind:'word', want:'def' },
    'der Charakter':
      { en:'character',
        ru:'характер',
        img:0, kind:'word', want:'def' },
    'der Verkehr':
      { en:'traffic',
        ru:'движение / транспорт',
        img:0, kind:'word', want:'def' },
    'entdecken':
      { en:'to discover',
        ru:'открывать',
        img:0, kind:'word', want:'def' }
  },

  pieces:{
    'ar-05': [
      'belebt',
      'die Straße',
      'das Museum',
      'das Nachtleben',
      'die Seite',
      'das Wasser',
      'der See',
      'die Badestelle',
      'die Hitze',
      'baden',
      'der Südwesten',
      'das Strandbad',
      'der Sandstrand',
      'das Sommerleben',
      'der Sommertag',
      'der Südosten',
      'die Umgebung',
      'das Paddeln',
      'die Fläche',
      'das Stadtzentrum',
      'das Erlebnis',
      'umgeben',
      'sich ausruhen',
      'der Ausflug',
      'der Nordosten',
      'das Gewässer',
      'die Umkleide',
      'die Einrichtung',
      'der Aufenthalt',
      'das Freibad',
      'das Hallenbad',
      'der Schwimmer',
      'der Vogel',
      'das Boot',
      'örtlich',
      'erlaubt',
      'überwachen',
      'die Badesaison',
      'die Wasserqualität',
      'der Zustand',
      'der Charakter',
      'der Verkehr',
      'entdecken'
    ],
    'ar-03': [
      'die Stadt',
      'lebhaft',
      'der Park',
      'der Garten',
      'die Wiese',
      'der Baum',
      'der Weg',
      'der Lärm',
      'entkommen',
      'joggen',
      'das Radfahren',
      'das Picknick',
      'entspannen',
      'das Gelände',
      'der Flughafen',
      'ehemalig',
      'die Start- und Landebahn',
      'die Landschaft',
      'öffentlich',
      'das Jahrhundert',
      'die Erholung',
      'der Brunnen',
      'der Fluss',
      'das Ehrenmal',
      'die Grünanlage',
      'die Bedeutung',
      'der Spielplatz',
      'der Teich',
      'das Viertel',
      'der Treffpunkt',
      'die Jahreszeit',
      'blühen',
      'bunt',
      'die Natur',
      'die Bewegung',
      'die Bank'
    ],
    'ar-04': [
      'aufwendig',
      'das Produkt',
      'der Anlass',
      'der Lippenstift',
      'die Lippe',
      'der Farbton',
      'glänzend',
      'die Wimper',
      'auftragen',
      'wasserfest',
      'verlaufen',
      'betonen',
      'der Lidschatten',
      'das Augenlid',
      'gleichmäßig',
      'der Fleck',
      'abdecken',
      'der Glanz',
      'die Haut',
      'die Wange',
      'die Augenbraue',
      'die Form',
      'der Pinsel',
      'das Hilfsmittel',
      'die Hautpflege',
      'die Feuchtigkeit',
      'reinigen',
      'das Parfüm',
      'der Duft',
      'blumig',
      'fruchtig',
      'sich wohlfühlen'
    ],
    'ar-02': [
      'das Sushi',
      'das Gericht',
      'Japan',
      'roh',
      'der Fisch',
      'der Reis',
      'die Zutat',
      'zubereiten',
      'kombinieren',
      'der Lachs',
      'der Thunfisch',
      'die Meeresfrüchte',
      'die Garnele',
      'die Krabbe',
      'die Avocado',
      'die Gurke',
      'vegetarisch',
      'genießen',
      'die Sushi-Rolle',
      'die Algen',
      'das Nigiri',
      'der Belag',
      'die Beilage',
      'die Sojasoße',
      'der Wasabi',
      'scharf',
      'die Menge',
      'der Ingwer',
      'eingelegt',
      'die Stäbchen',
      'erfahren',
      'das Aussehen',
      'der Koch',
      'anordnen',
      'das Kunstwerk',
      'bevorzugen',
      'vorsichtig',
      'der Teller'
    ],
    'ar-01': [
      'der Käse',
      'der Camembert',
      'der Gouda',
      'der Edamer',
      'der Butterkäse',
      'der Emmentaler',
      'der Bergkäse',
      'der Tilsiter',
      'der Mozzarella',
      'der Parmesan',
      'der Hartkäse',
      'der Raclettekäse',
      'der Feta',
      'der Ziegenkäse',
      'die Ziegenmilch',
      'der Blauschimmelkäse',
      'der Schimmel',
      'der Harzer Käse',
      'der Handkäse',
      'der Limburger',
      'der Frischkäse',
      'der Hüttenkäse',
      'der Quark',
      'das Milchprodukt',
      'das Fett',
      'die Rinde',
      'das Loch',
      'krümelig',
      'mild',
      'herzhaft',
      'reiben',
      'erhitzen',
      'herstellen',
      'enthalten',
      'streichen',
      'sich unterscheiden',
      'schmelzen'
    ],
    'pm-13': [
      'der Mozzarella',
      'der Parmesan',
      'der Emmentaler',
      'der Feta',
      'der Camembert',
      'der Blauschimmelkäse',
      'der Limburger',
      'der Frischkäse',
      'der Raclettekäse',
      'der Bergkäse',
      'das Loch',
      'die Rinde',
      'das Herz',
      'hart',
      'kräftig',
      'seltsam',
      'zerfallen',
      'der Mensch'
    ],
    'ss-41': [
      'das Sushi',
      'das Abendessen',
      'der Lachs',
      'der Thunfisch',
      'die Avocado',
      'der Tisch',
      'das Getränk',
      'das Stück',
      'die Katze',
      'fehlen'
    ],
    'ss-42': [
      'das Restaurant',
      'der Freund',
      'der Wasabi',
      'früher',
      'groß',
      'das Stück',
      'zu viel',
      'der Mund',
      'das Gesicht',
      'das Wasser'
    ],
    'ss-43': [
      'die Stäbchen',
      'der Teller',
      'versuchen',
      'die Sojasoße',
      'der Versuch',
      'fliegen',
      'der Nebentisch',
      'der Lachs',
      'hochheben',
      'bestellen'
    ],
    'ss-44': [
      'der Käse',
      'der Kühlschrank',
      'riechen',
      'schrecklich',
      'die Milch',
      'der Fisch',
      'der Limburger',
      'finden',
      'schließen',
      'hungrig'
    ],
    'ss-45': [
      'das Raclette',
      'der Raclettekäse',
      'schmelzen',
      'die Kartoffel',
      'das Gemüse',
      'viel',
      'ein bisschen',
      'dazugeben',
      'der Teller',
      'die Freundin'
    ],
    'ss-46': [
      'die Pasta',
      'das Abendessen',
      'der Parmesan',
      'darüber',
      'reiben',
      'das Handy',
      'klingeln',
      'reden',
      'sehen',
      'verschwinden'
    ],
    'pm-01': [
      'der Vogel',
      'der Baum',
      'der Morgen',
      'der Himmel',
      'das Haus',
      'der Park',
      'fliegen',
      'beobachten',
      'bleiben',
      'Angst haben',
      'landen',
      'singen',
      'zuhören',
      'näher kommen',
      'folgen',
      'einsam',
      'allein',
      'grau'
    ],
    'pm-02': [
      'der Fisch',
      'der See',
      'die Pflanze',
      'der Stein',
      'das Futter',
      'das Wasser',
      'schwimmen',
      'suchen',
      'wissen',
      'folgen',
      'finden',
      'fressen',
      'sich fühlen',
      'wegschwimmen',
      'bleiben',
      'ruhig',
      'hungrig',
      'hilfsbereit'
    ],
    'pm-03': [
      'das Ticket',
      'die Handtasche',
      'das Buch',
      'die Jacke',
      'der Zug',
      'das Wasser',
      'das Geschäft',
      'die Kasse',
      'der Bahnsteig',
      'das Fenster',
      'die Stadt',
      'suchen',
      'stehen bleiben',
      'sich erinnern',
      'kaufen',
      'zurückgehen',
      'nehmen',
      'eilen',
      'abfahren',
      'verschwinden',
      'verloren'
    ],
    'ss-16': [
      'die Lebensmittel',
      'der Supermarkt',
      'die Milch',
      'das Gemüse',
      'das Brot',
      'der Apfel',
      'die Tasche',
      'die Bushaltestelle',
      'der Boden',
      'kaufen',
      'legen',
      'tragen',
      'stellen',
      'schwer',
      'langsam'
    ],
    'ss-17': [
      'das Frühstück',
      'die Küche',
      'das Ei',
      'das Brot',
      'der Ehemann',
      'der Kaffee',
      'die Tasse',
      'der Tisch',
      'das Geschirr',
      'früh aufstehen',
      'machen',
      'sich setzen',
      'essen',
      'abwaschen'
    ],
    'ss-18': [
      'der Bus',
      'der Sitzplatz',
      'das Fenster',
      'die Haltestelle',
      'die Frau',
      'einsteigen',
      'frei',
      'sich setzen',
      'aufstehen',
      'jemandem seinen Platz geben'
    ],
    'ss-19': [
      'der Morgen',
      'das Fenster',
      'der Himmel',
      'der Wind',
      'der Pullover',
      'die Jacke',
      'der Schal',
      'das Haus',
      'der Bahnhof',
      'der Zug',
      'wehen',
      'anziehen',
      'verlassen',
      'ankommen',
      'sich freuen',
      'kalt',
      'warm'
    ],
    'ss-20': [
      'das Kleid',
      'das Geschäft',
      'die Mitarbeiterin',
      'die Größe',
      'die Kreditkarte',
      'anprobieren',
      'fragen',
      'passen',
      'kaufen',
      'bezahlen',
      'klein',
      'falsch'
    ],
    'ss-21': [
      'die Freundin',
      'das Café',
      'der Kaffee',
      'der Tisch',
      'das Fenster',
      'die Arbeit',
      'die Familie',
      'treffen',
      'bestellen',
      'sich setzen',
      'sprechen',
      'bezahlen',
      'zusammen'
    ],
    'ss-22': [
      'das Handy',
      'der Schreibtisch',
      'das Sofa',
      'die Tasche',
      'das Schlafzimmer',
      'die Jacke',
      'das Bett',
      'bereit sein',
      'finden',
      'suchen',
      'hören',
      'klingeln',
      'liegen',
      'verloren'
    ],
    'ss-23': [
      'das Restaurant',
      'der Kellner',
      'das Essen',
      'das Getränk',
      'der Tisch',
      'die Suppe',
      'der Salat',
      'die Kartoffel',
      'tragen',
      'bestellen',
      'warten',
      'sich unterhalten',
      'hungrig',
      'voll'
    ],
    'ss-24': [
      'die Ampel',
      'das Auto',
      'die Arbeit',
      'fahren',
      'ankommen',
      'anhalten',
      'warten',
      'weiterfahren',
      'rot',
      'grün'
    ],
    'ss-25': [
      'die Mutter',
      'der Sonntag',
      'der Markt',
      'die Blume',
      'der Weg',
      'besuchen',
      'anhalten',
      'sehen',
      'auswählen',
      'kaufen',
      'sich freuen',
      'gelb',
      'weiß'
    ],
    'ss-26': [
      'der Kühlschrank',
      'der Hunger',
      'die Milch',
      'der Käse',
      'die Lebensmittel',
      'die Einkaufsliste',
      'die Tasche',
      'der Supermarkt',
      'das Abendessen',
      'das Frühstück',
      'öffnen',
      'schreiben',
      'kaufen',
      'genug',
      'leer'
    ],
    'ss-27': [
      'das Büro',
      'der Schreibtisch',
      'der Computer',
      'die Nachricht',
      'die E-Mail',
      'die Besprechung',
      'der Kollege',
      'der Arbeitstag',
      'ankommen',
      'sich setzen',
      'einschalten',
      'lesen',
      'schreiben',
      'nach Hause gehen'
    ],
    'ss-28': [
      'die Tür',
      'der Schlüssel',
      'die Hosentasche',
      'der Rucksack',
      'das Buch',
      'der Tisch',
      'greifen',
      'suchen',
      'finden',
      'aufschließen',
      'hineingehen',
      'legen',
      'verschließen'
    ],
    'ss-29': [
      'das Mittagessen',
      'der Park',
      'der Tisch',
      'der Baum',
      'das Sandwich',
      'der Salat',
      'das Obst',
      'kaufen',
      'finden',
      'essen',
      'reden',
      'zurückgehen',
      'eine halbe Stunde'
    ],
    'ss-30': [
      'die Stadt',
      'das Taxi',
      'der Bahnhof',
      'die Fahrkarte',
      'der Bahnsteig',
      'der Zug',
      'das Fenster',
      'die Fahrt',
      'fahren',
      'früh aufstehen',
      'nehmen',
      'kaufen',
      'finden',
      'abfahren',
      'lesen',
      'richtig'
    ],
    'ss-31': [
      'das Geburtstagsgeschenk',
      'die Freundin',
      'das Geschäft',
      'die Handtasche',
      'die Kasse',
      'das Geschenk',
      'kaufen',
      'sich etwas ansehen',
      'auswählen',
      'bezahlen',
      'hoffen',
      'gefallen',
      'verschieden',
      'schließlich'
    ],
    'ss-32': [
      'das Abendessen',
      'die Kartoffel',
      'das Gemüse',
      'der Teller',
      'das Glas',
      'das Besteck',
      'der Tisch',
      'die Küche',
      'kochen',
      'fertig sein',
      'stellen',
      'sich hinsetzen',
      'hungrig',
      'fast'
    ],
    'ss-33': [
      'der Termin',
      'der Arzt',
      'das Wartezimmer',
      'das Buch',
      'die Tasche',
      'ankommen',
      'sich setzen',
      'lesen',
      'warten',
      'aufrufen',
      'aufstehen',
      'früh'
    ],
    'ss-34': [
      'der Balkon',
      'die Pflanze',
      'die Blume',
      'das Wasser',
      'die Tasse',
      'der Tee',
      'gießen',
      'sich etwas ansehen',
      'draußen sitzen',
      'bleiben',
      'warm',
      'sonnig'
    ],
    'ss-35': [
      'die Tasche',
      'die Lebensmittel',
      'die Kasse',
      'die Hosentasche',
      'die Geldbörse',
      'das Auto',
      'die Kassiererin',
      'greifen',
      'finden',
      'sich erinnern',
      'zurückkommen',
      'holen',
      'bezahlen',
      'vergessen'
    ],
    'ss-36': [
      'das Kino',
      'der Film',
      'das Restaurant',
      'das Abendessen',
      'sehen',
      'Hunger haben',
      'finden',
      'bestellen',
      'sprechen',
      'lustig',
      'in der Nähe'
    ],
    'ss-37': [
      'der Abend',
      'die Tasse',
      'der Tee',
      'das Buch',
      'das Sofa',
      'die Katze',
      'nach Hause kommen',
      'sich umziehen',
      'sich setzen',
      'schlafen',
      'lesen',
      'müde',
      'ruhig',
      'anstrengend'
    ],
    'ss-38': [
      'der Kuchen',
      'der Geburtstag',
      'die Schwester',
      'der Nachmittag',
      'die Küche',
      'der Tisch',
      'backen',
      'arbeiten',
      'fertig sein',
      'stellen',
      'lächeln',
      'danken'
    ],
    'ss-39': [
      'die Arbeit',
      'die Bushaltestelle',
      'der Bus',
      'die Straße',
      'der Sitzplatz',
      'beenden',
      'warten',
      'sehen',
      'entlangkommen',
      'einsteigen',
      'finden',
      'schließlich'
    ],
    'ss-40': [
      'der Samstag',
      'die Küche',
      'die Kleidung',
      'das Mittagessen',
      'der Computer',
      'der Spaziergang',
      'das Abendessen',
      'der Film',
      'putzen',
      'waschen',
      'draußen',
      'einen Spaziergang machen',
      'kochen',
      'einen Film sehen'
    ],
    'ms-01': [
      'der Bahnhof',
      'der Zug',
      'das Gleis',
      'die Abfahrtstafel',
      'die Fahrkarte',
      'der Schaffner',
      'der Sitzplatz',
      'einsteigen',
      'abfahren',
      'kontrollieren',
      'schütteln',
      'sich irren',
      'eilig',
      'falsch'
    ],
    'ms-02': [
      'das Abendessen',
      'die Tomate',
      'die Zwiebel',
      'der Käse',
      'die Nudeln',
      'der Teller',
      'kochen',
      'sich setzen',
      'lächeln',
      'probieren',
      'schließen',
      'salzig',
      'lecker'
    ],
    'ms-03': [
      'das Handy',
      'der Tisch',
      'das Sofa',
      'die Handtasche',
      'das Bett',
      'die Jackentasche',
      'suchen',
      'finden',
      'anrufen',
      'klingeln',
      'zuhören',
      'zu spät kommen',
      'vertraut'
    ],
    'ms-04': [
      'der Kühlschrank',
      'der Kuchen',
      'die Schokolade',
      'der Zettel',
      'das Sandwich',
      'der Boden',
      'die Spur',
      'der Hund',
      'anfassen',
      'bemerken',
      'folgen',
      'verschwinden',
      'zufrieden',
      'glauben'
    ],
    'ms-05': [
      'der Bus',
      'der Sitzplatz',
      'die Einkaufstasche',
      'die Stange',
      'die Orange',
      'einsteigen',
      'stehen',
      'halten',
      'aufstehen',
      'sich setzen',
      'sich bedanken',
      'geben',
      'freundlich'
    ],
    'ms-06': [
      'die Wohnung',
      'die Tür',
      'der Schlüssel',
      'das Schloss',
      'die Treppe',
      'die Musik',
      'die Etage',
      'öffnen',
      'drücken',
      'schlagen',
      'hören',
      'erstarren',
      'sich entschuldigen',
      'verwirrt'
    ],
    'ms-07': [
      'das Café',
      'der Kaffee',
      'die Milch',
      'der Becher',
      'die Kassiererin',
      'der Straßenreiniger',
      'bezahlen',
      'bestellen',
      'sich umsehen',
      'anbieten',
      'lächeln',
      'müde',
      'warm',
      'zusätzlich'
    ],
    'ms-08': [
      'der Wecker',
      'das Handy',
      'das Fenster',
      'der Unterricht',
      'die Kleidung',
      'die Schuhe',
      'die Mitbewohnerin',
      'das Datum',
      'aufwachen',
      'verschlafen',
      'springen',
      'suchen',
      'rennen',
      'bemerken',
      'ruhig'
    ],
    'ms-09': [
      'die Erdbeere',
      'der Kühlschrank',
      'der Teller',
      'das Messer',
      'die Hälfte',
      'sehen',
      'kaufen',
      'teilen',
      'schneiden',
      'aussuchen',
      'schütteln',
      'reif'
    ],
    'ms-10': [
      'die Einkaufstasche',
      'der Supermarkt',
      'der Apfel',
      'der Gehweg',
      'das Loch',
      'die Orange',
      'die Straße',
      'rollen',
      'herausfallen',
      'entdecken',
      'tragen',
      'zeigen',
      'einsammeln',
      'schwer'
    ],
    'ms-11': [
      'die Nachbarin',
      'die Wohnung',
      'das Klavier',
      'die Musik',
      'der Koffer',
      'der Flur',
      'die Tochter',
      'spielen',
      'hören',
      'helfen',
      'besuchen',
      'zurückkommen',
      'leiser stellen',
      'still',
      'regelmäßig'
    ],
    'ms-12': [
      'die Schuhe',
      'der Fuß',
      'der Schmerz',
      'der Park',
      'das Schuhgeschäft',
      'die Turnschuhe',
      'die Einkaufstasche',
      'tragen',
      'weh tun',
      'ignorieren',
      'weitergehen',
      'kaufen',
      'bequem',
      'billig'
    ],
    'ms-13': [
      'das Bibliotheksbuch',
      'die Bibliothek',
      'das Datum',
      'der Rucksack',
      'die Gebühr',
      'die Bibliothekarin',
      'der Bildschirm',
      'finden',
      'zurückgeben',
      'sich Sorgen machen',
      'schulden',
      'prüfen',
      'sich erinnern',
      'erleichtert'
    ],
    'ms-14': [
      'der Regenschirm',
      'das Restaurant',
      'der Ständer',
      'der Regen',
      'der Buchstabe',
      'der Opa',
      'nehmen',
      'öffnen',
      'bemerken',
      'zurückkehren',
      'vertauschen',
      'lachen',
      'schwarz'
    ],
    'ms-15': [
      'der Mitternachtssnack',
      'die Küche',
      'das Licht',
      'der Kühlschrank',
      'der Käse',
      'die Katze',
      'der Stuhl',
      'aufwachen',
      'einschalten',
      'wecken',
      'greifen',
      'sich erschrecken',
      'flüstern',
      'hungrig'
    ],
    'ms-16': [
      'das Mittagessen',
      'der Schreibtisch',
      'der Kühlschrank',
      'die Brotdose',
      'die Geldbörse',
      'der Kollege',
      'das Sandwich',
      'vergessen',
      'sich erinnern',
      'seufzen',
      'prüfen',
      'rufen',
      'hungrig'
    ],
    'ms-17': [
      'die Bank',
      'der Park',
      'der Baum',
      'die Farbe',
      'das Schild',
      'die Hose',
      'sich setzen',
      'winken',
      'rufen',
      'bemerken',
      'streichen',
      'frisch gestrichen',
      'hell',
      'knapp'
    ],
    'ms-18': [
      'der Akku',
      'das Handy',
      'das Ladegerät',
      'die Steckdose',
      'der Ladeanschluss',
      'der Sitz',
      'der Fahrgast',
      'der Bildschirm',
      'zeigen',
      'drücken',
      'aufladen',
      'suchen',
      'leer'
    ],
    'ms-19': [
      'der Geburtstag',
      'der Geburtstagskuchen',
      'die Kerze',
      'die Flamme',
      'der Wunsch',
      'die Scherzkerze',
      'sich etwas wünschen',
      'pusten',
      'ausgehen',
      'sich anzünden',
      'lachen',
      'zeigen',
      'brennen'
    ],
    'ms-20': [
      'die Sporttasche',
      'das Fitnessstudio',
      'die Fußballschuhe',
      'das Trikot',
      'das Namensschild',
      'die Rezeption',
      'öffnen',
      'gehören',
      'prüfen',
      'anrufen',
      'sich treffen',
      'verwechseln',
      'falsch'
    ],
    'ms-21': [
      'der Schnee',
      'der Schneemann',
      'der Stein',
      'der Schal',
      'die Karotte',
      'die Nase',
      'die Fußspur',
      'das Gartentor',
      'die Nachbarin',
      'bauen',
      'holen',
      'bemerken',
      'führen',
      'lachen',
      'brauchen'
    ],
    'pm-04': [
      'der Regenschirm',
      'der Regen',
      'die Straße',
      'der Park',
      'der Weg',
      'der Baum',
      'der Spaziergang',
      'die Ecke',
      'warten',
      'eilen',
      'teilen',
      'sich verabschieden',
      'lächeln',
      'nass',
      'leer'
    ],
    'pm-05': [
      'die Bushaltestelle',
      'der Bus',
      'die Bank',
      'der Wind',
      'das Blatt',
      'die Straße',
      'der Scheinwerfer',
      'der Fahrer',
      'warten',
      'vorbeifahren',
      'anhalten',
      'winken',
      'einsteigen',
      'spät',
      'erleichtert'
    ],
    'pm-06': [
      'das Licht',
      'das Fenster',
      'die Wohnung',
      'die Bäckerei',
      'das Buch',
      'der Tee',
      'die Katze',
      'die Straße',
      'bemerken',
      'lesen',
      'trinken',
      'sich fragen',
      'zurückkehren',
      'winken',
      'vertraut',
      'dunkel'
    ],
    'pm-07': [
      'der Schal',
      'das Café',
      'der Bahnhof',
      'der Stuhl',
      'die Stuhllehne',
      'der Kellner',
      'die Theke',
      'sich erinnern',
      'umdrehen',
      'zurückgehen',
      'suchen',
      'finden',
      'sich bedanken',
      'kalt',
      'warm'
    ],
    'pm-08': [
      'das Dach',
      'der Regen',
      'das Fenster',
      'die Straße',
      'die Lampe',
      'die Pfütze',
      'der Donner',
      'aufwachen',
      'fallen',
      'klopfen',
      'öffnen',
      'schließen',
      'zuhören',
      'einschlafen',
      'kühl',
      'leise'
    ],
    'pm-09': [
      'der Stuhl',
      'der Tisch',
      'das Café',
      'der Kaffee',
      'der Tee',
      'die Nachrichten',
      'das Wetter',
      'die Tasse',
      'sich setzen',
      'sprechen',
      'lächeln',
      'kennenlernen',
      'warten',
      'leer',
      'besetzt'
    ],
    'pm-10': [
      'die Pflanze',
      'das Blatt',
      'das Fenster',
      'die Küche',
      'der Zweig',
      'der Topf',
      'der Markt',
      'gießen',
      'wachsen',
      'bemerken',
      'lachen',
      'Zeit geben',
      'umtopfen',
      'klein',
      'groß'
    ],
    'pm-11': [
      'die Sonne',
      'die Wolke',
      'der Regen',
      'der Regenschirm',
      'das Gebäude',
      'die Straße',
      'die Pfütze',
      'scheinen',
      'erscheinen',
      'stehen bleiben',
      'schließen',
      'öffnen',
      'springen',
      'grau',
      'hell'
    ],
    'pm-12': [
      'der Schlüssel',
      'der Hausschlüssel',
      'das Fahrradschloss',
      'die Tasche',
      'die Manteltasche',
      'die Tür',
      'das Schloss',
      'suchen',
      'drehen',
      'öffnen',
      'lachen',
      'tragen',
      'falsch',
      'schwer'
    ]
  }
};
