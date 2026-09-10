/* data/en-future.js */
/* The future — will · will be · be going to · present continuous

   English-as-target, fifth English topic. The filename is en-future.js
   because js/future.js already exists (the German tense sorter) and
   duplicate basenames are banned.

   Six patterns, and one of them is a trap:

     will + verb            a decision, promise, or clean future fact
     will be + state        I will be late.            no second verb
     will be + -ing         We will be visiting.       in progress then
     be going to + verb     a plan, or evidence now
     am/is/are + -ing       an arrangement already fixed
     going + to + PLACE     NOT the future — movement

   The trap is the fifth line against the sixth
   --------------------------------------------
     I am going to eat this apple.   going to + VERB    a plan
     I am going to the store.        going + TO + PLACE movement

   Test: drop the last words. "I am going to eat" still means a plan.
   "I am going to the" means nothing — the `to` belongs to the place.
   Shortcut for the lesson: if another VERB follows going to, it is the
   future construction.

   What the first languages do
   ---------------------------
   Russian usually lets the present carry the future: Завтра иду в
   магазин. German does the same with a time word — Morgen gehe ich
   einkaufen — and keeps werden for the unambiguous case. So learners
   over-use will for plans and miss going to, or else read every
   "going to" as the future auxiliary.

   Left out: shall, about to, future perfect. Simple present for fixed
   schedules is a reference note at the bottom, deliberately NOT a sixth
   drill family — it is worth naming and not worth a ladder yet.

   NO GENDERED RUSSIAN HERE. Every Russian row is either about Tanya,
   Nazar, she or he, or uses a gender-neutral first person (собираюсь,
   опоздаю, буду ждать). Nothing addresses the learner in a form that
   inflects, so no row carries a `ruM` twin. */

window.GH_EN_FUTURE = {

  title: { en:'The future', de:'Die Zukunft', ru:'Будущее' },
  sub:   { en:'will · be going to · arrangements',
           de:'will · be going to · Vereinbarungen',
           ru:'will · be going to · договорённости' },
  lede: {
    en: 'English has more than one future. will decides, promises and predicts. be going to describes a plan you already have. And the present continuous describes an arrangement that is already fixed. Russian and German often let the present tense do all three.',
    de: 'Englisch hat mehr als eine Zukunft. will entscheidet, verspricht und sagt voraus. be going to beschreibt einen Plan, den du schon hast. Und das Present Continuous beschreibt eine Vereinbarung, die schon feststeht. Russisch und Deutsch lassen oft die Gegenwart alle drei erledigen.',
    ru: 'В английском не одно будущее. will — решение, обещание, прогноз. be going to — план, который у тебя уже есть. А Present Continuous — уже назначенная договорённость. В русском и немецком всё это часто делает настоящее время.'
  },

  families: [
    { id:'will-verb', mark:'will + verb',
      title:{ en:'A decision, promise, or fact', de:'Entscheidung, Versprechen oder Tatsache', ru:'Решение, обещание или факт' },
      note: { en:'will call / help / come. Decided now, or simply true later. Same form with every subject.',
              de:'will call / help / come. Jetzt entschieden oder einfach später wahr. Bei allen Subjekten dieselbe Form.',
              ru:'will call / help / come. Решили сейчас или просто так будет. Форма одна со всеми подлежащими.' } },
    { id:'will-be', mark:'will be',
      title:{ en:'A state later', de:'Ein Zustand später', ru:'Состояние потом' },
      note: { en:'will be + late / here / at home / tired. No second verb.',
              de:'will be + late / here / at home / tired. Kein zweites Verb.',
              ru:'will be + late / here / at home / tired. Второго глагола нет.' } },
    { id:'will-ving', mark:'will be + -ing',
      title:{ en:'An action in progress then', de:'Eine Handlung, die dann läuft', ru:'Действие, которое тогда будет идти' },
      note: { en:'will be visiting / working / waiting. The action fills that future time.',
              de:'will be visiting / working / waiting. Die Handlung füllt diese Zukunftszeit.',
              ru:'will be visiting / working / waiting. Действие занимает то будущее время.' } },
    { id:'going-to', mark:'be going to + verb',
      title:{ en:'A plan, or something you can see coming', de:'Ein Plan, oder etwas Sichtbares', ru:'План или то, что уже видно' },
      note: { en:'am/is/are going to eat / come / rain. Intention, or evidence now. The form of be changes; going to never does.',
              de:'am/is/are going to eat / come / rain. Absicht oder ein Zeichen jetzt. Die Form von be ändert sich; going to nie.',
              ru:'am/is/are going to eat / come / rain. Намерение или признак уже сейчас. Форма be меняется, going to — никогда.' } },
    /* GPT's addition, 09 Sep: the third real-world future. */
    { id:'present-arrangement', mark:'am/is/are + -ing',
      title:{ en:'A future arrangement', de:'Eine zukünftige Vereinbarung', ru:'Будущая договорённость' },
      note: { en:'Present continuous can describe an arrangement that is already planned or organized. A future time expression usually makes the future meaning clear.',
              de:'Das Present Continuous kann ein zukünftiges Ereignis beschreiben, das bereits geplant oder organisiert ist. Eine zukünftige Zeitangabe macht die Zukunftsbedeutung normalerweise deutlich.',
              ru:'Present Continuous может описывать будущее событие, которое уже запланировано или организовано. Указание на будущее время обычно делает значение будущего понятным.' } },
    { id:'go-place', mark:'going + to + place',
      title:{ en:'Not the future auxiliary — movement', de:'Nicht das Zukunftswort — Bewegung', ru:'Это не будущее — это движение' },
      note: { en:'am going to the store / to school / home. A destination, not a second verb.',
              de:'am going to the store / to school / home. Ein Ziel, kein zweites Verb.',
              ru:'am going to the store / to school / home. Куда, а не второй глагол.' } }
  ],

  items: [
    /* ---------- will + verb ---------- */
    { id:'ef13', mark:'will-verb',
      en:'I will call you.',            de:'Ich werde dich anrufen.',        ru:'Я тебе позвоню.' },
    { id:'ef14', mark:'will-verb',
      en:'Tanya will help Nazar.',      de:'Tanya wird Nazar helfen.',       ru:'Таня поможет Назару.' },
    { id:'ef15', mark:'will-verb',
      en:'We will take the train.',     de:'Wir nehmen den Zug.',            ru:'Мы поедем на поезде.' },
    { id:'ef16', mark:'will-verb',
      en:'I will open the window.',     de:'Ich mache das Fenster auf.',     ru:'Я открою окно.' },
    { id:'ef17', mark:'will-verb',
      en:'He will buy bread.',          de:'Er wird Brot kaufen.',           ru:'Он купит хлеб.' },

    /* ---------- will be + state ---------- */
    { id:'ef01', mark:'will-be',
      en:'I will be late.',             de:'Ich werde zu spät kommen.',      ru:'Я опоздаю.' },
    { id:'ef02', mark:'will-be',
      en:'He will be here soon.',       de:'Er wird bald hier sein.',        ru:'Он скоро будет здесь.' },
    { id:'ef03', mark:'will-be',
      en:'Tanya will be at home at seven.', de:'Tanya wird um sieben zu Hause sein.', ru:'Таня будет дома в семь.' },
    { id:'ef04', mark:'will-be',
      en:'Nazar will be tired after school.', de:'Nazar wird nach der Schule müde sein.', ru:'Назар будет уставшим после школы.' },
    { id:'ef05', mark:'will-be',
      en:'The coffee will be cold.',    de:'Der Kaffee wird kalt sein.',     ru:'Кофе будет холодным.' },
    { id:'ef06', mark:'will-be',
      en:'It will be cold tomorrow.',   de:'Morgen wird es kalt sein.',      ru:'Завтра будет холодно.' },
    { id:'ef07', mark:'will-be',
      en:'We will be in Berlin on Monday.', de:'Am Montag werden wir in Berlin sein.', ru:'В понедельник мы будем в Берлине.' },

    /* ---------- will be + -ing ---------- */
    { id:'ef08', mark:'will-ving',
      en:'We will be visiting grandma.', de:'Wir werden die Oma besuchen.',  ru:'Мы будем в гостях у бабушки.' },
    { id:'ef09', mark:'will-ving',
      en:'Tanya will be cooking at six.', de:'Tanya wird um sechs kochen.',  ru:'Таня будет готовить в шесть.' },
    { id:'ef10', mark:'will-ving',
      en:'Nazar will be sleeping at ten.', de:'Nazar wird um zehn schlafen.', ru:'Назар будет спать в десять.' },
    { id:'ef11', mark:'will-ving',
      en:'I will be waiting at the station.', de:'Ich werde am Bahnhof warten.', ru:'Я буду ждать на вокзале.' },
    { id:'ef12', mark:'will-ving',
      en:'They will be sitting on the bus.', de:'Sie werden im Bus sitzen.', ru:'Они будут сидеть в автобусе.' },

    /* ---------- be going to + verb ---------- */
    { id:'ef18', mark:'going-to',
      en:'I am going to eat this apple.', de:'Ich werde diesen Apfel essen.', ru:'Я собираюсь съесть это яблоко.' },
    { id:'ef19', mark:'going-to',
      en:'They are going to come.',     de:'Sie werden kommen.',             ru:'Они собираются прийти.' },
    { id:'ef20', mark:'going-to',
      en:'Tanya is going to wash her hair.', de:'Tanya wird sich die Haare waschen.', ru:'Таня собирается вымыть волосы.' },
    { id:'ef21', mark:'going-to',
      en:'Nazar is going to play outside.', de:'Nazar wird draußen spielen.', ru:'Назар собирается играть на улице.' },
    { id:'ef22', mark:'going-to',
      en:'We are going to cook soup tonight.', de:'Wir werden heute Abend Suppe kochen.', ru:'Мы сегодня вечером будем варить суп.' },
    { id:'ef23', mark:'going-to',
      en:'It is going to rain.',        de:'Es wird regnen.',                ru:'Собирается дождь.' },
    { id:'ef24', mark:'going-to',
      en:'She is going to buy a new jacket.', de:'Sie wird eine neue Jacke kaufen.', ru:'Она собирается купить новую куртку.' },
    { id:'ef25', mark:'going-to',
      en:'I am going to call Tanya.',   de:'Ich werde Tanya anrufen.',       ru:'Я собираюсь позвонить Тане.' },

    /* ---------- present continuous: an arrangement already fixed ----------
       GPT's addition, 09 Sep. Six rows, so this family is not thinner
       than the ones it sits beside on the page. */
    { id:'ef31', mark:'present-arrangement',
      en:'I\u2019m meeting Tanya tomorrow.', de:'Ich treffe Tanya morgen.',  ru:'Я встречаюсь с Таней завтра.' },
    { id:'ef32', mark:'present-arrangement',
      en:'We\u2019re having dinner at seven.', de:'Wir essen um sieben zu Abend.', ru:'Мы ужинаем в семь.' },
    { id:'ef33', mark:'present-arrangement',
      en:'She\u2019s flying to Berlin on Friday.', de:'Sie fliegt am Freitag nach Berlin.', ru:'Она летит в Берлин в пятницу.' },
    { id:'ef34', mark:'present-arrangement',
      en:'They\u2019re coming over tonight.', de:'Sie kommen heute Abend zu uns.', ru:'Они придут к нам сегодня вечером.' },
    { id:'ef35', mark:'present-arrangement',
      en:'He\u2019s seeing the doctor tomorrow.', de:'Er geht morgen zum Arzt.', ru:'Он идёт к врачу завтра.' },
    { id:'ef36', mark:'present-arrangement',
      en:'I\u2019m working on Saturday.', de:'Ich arbeite am Samstag.',      ru:'Я работаю в субботу.' },

    /* ---------- the movement trap: going + to + place ---------- */
    { id:'ef26', mark:'go-place',
      en:'I am going to the store.',    de:'Ich gehe in den Laden.',         ru:'Я иду в магазин.' },
    { id:'ef27', mark:'go-place',
      en:'Tanya is going to school.',   de:'Tanya geht zur Schule.',         ru:'Таня идёт в школу.' },
    { id:'ef28', mark:'go-place',
      en:'They are going home.',        de:'Sie gehen nach Hause.',          ru:'Они идут домой.' },
    { id:'ef29', mark:'go-place',
      en:'Nazar is going to the playground.', de:'Nazar geht auf den Spielplatz.', ru:'Назар идёт на площадку.' },
    { id:'ef30', mark:'go-place',
      en:'We are going to the station.', de:'Wir gehen zum Bahnhof.',        ru:'Мы идём на вокзал.' }
  ],

  /* Same speaker, two readings. The word after `to` is the tell. */
  pairs: [
    { plan:{ en:'I am going to eat this apple.', de:'Ich werde diesen Apfel essen.', ru:'Я собираюсь съесть это яблоко.' },
      move:{ en:'I am going to the store.',      de:'Ich gehe in den Laden.',        ru:'Я иду в магазин.' } },
    { plan:{ en:'Tanya is going to buy bread.',  de:'Tanya wird Brot kaufen.',       ru:'Таня собирается купить хлеб.' },
      move:{ en:'Tanya is going to the bakery.', de:'Tanya geht zur Bäckerei.',      ru:'Таня идёт в пекарню.' } },
    { plan:{ en:'They are going to come.',       de:'Sie werden kommen.',            ru:'Они собираются прийти.' },
      move:{ en:'They are going home.',          de:'Sie gehen nach Hause.',         ru:'Они идут домой.' } },
    { plan:{ en:'Nazar is going to play football.', de:'Nazar wird Fußball spielen.', ru:'Назар собирается играть в футбол.' },
      move:{ en:'Nazar is going to the playground.', de:'Nazar geht auf den Spielplatz.', ru:'Назар идёт на площадку.' } }
  ],

  /* GPT's addition, 09 Sep: plan against arrangement. Shown as its own
     block rather than folded into `pairs`, because `pairs` is the
     movement trap and mixing the two would blur both. */
  planVsArranged: {
    head: { en:'Plan, or arrangement?', de:'Plan oder Vereinbarung?', ru:'План или договорённость?' },
    plan: { label:{ en:'a plan or intention', de:'ein Plan oder eine Absicht', ru:'план или намерение' },
            en:'I\u2019m going to call Tanya tonight.',
            de:'Ich werde Tanya heute Abend anrufen.',
            ru:'Я собираюсь позвонить Тане сегодня вечером.' },
    arranged: { label:{ en:'already arranged', de:'schon vereinbart', ru:'уже договорились' },
            en:'I\u2019m meeting Tanya at seven.',
            de:'Ich treffe Tanya um sieben.',
            ru:'Я встречаюсь с Таней в семь.' },
    note: { en:'BE GOING TO often emphasizes a plan or intention. Present continuous often emphasizes an arrangement that is already organized.',
            de:'BE GOING TO betont oft einen Plan oder eine Absicht. Das Present Continuous betont oft eine bereits organisierte Vereinbarung.',
            ru:'BE GOING TO часто подчёркивает план или намерение. Present Continuous часто подчёркивает уже организованную договорённость.' },
    caution: { en:'In real English these meanings can overlap. Do not treat the difference as an absolute rule.',
            de:'Im echten Englisch können sich diese Bedeutungen überschneiden. Behandle den Unterschied nicht als absolute Regel.',
            ru:'В реальном английском эти значения могут пересекаться. Не считай это различие абсолютным правилом.' }
  },

  traps: [
    { wrong:'I am going to the eat apple.', en:'I am going to eat this apple.',
      why:{ en:'going to + verb. No the between to and eat.',
            de:'going to + Verb. Kein the zwischen to und eat.',
            ru:'going to + глагол. Между to и eat нет the.' } },
    { wrong:'I will late.', en:'I will be late.',
      why:{ en:'late is not a verb. English still needs be.',
            de:'late ist kein Verb. Englisch braucht trotzdem be.',
            ru:'late — не глагол. Нужен be.' } },
    { wrong:'He will here soon.', en:'He will be here soon.',
      why:{ en:'here is a place. will be + place.',
            de:'here ist ein Ort. will be + Ort.',
            ru:'here — место. will be + место.' } },
    { wrong:'She will comes tomorrow.', en:'She will come tomorrow.',
      why:{ en:'After will, the base verb. will already carries the future.',
            de:'Nach will steht die Grundform. will trägt die Zukunft schon.',
            ru:'После will — начальная форма. will уже показывает будущее.' } },
    { wrong:'Does she going to come?', en:'Is she going to come?',
      why:{ en:'be carries the question. There is no do here.',
            de:'be bildet die Frage. Hier gibt es kein do.',
            ru:'Вопрос образует be. Никакого do здесь нет.' } },
    { wrong:'She is going to comes.', en:'She is going to come.',
      why:{ en:'going to + base verb, the same as after will.',
            de:'going to + Grundform, genau wie nach will.',
            ru:'going to + начальная форма, как и после will.' } }
  ],

  /* GPT's addition, 09 Sep, and deliberately NOT a drill family: worth
     naming so a timetable does not confuse her, not worth a ladder. */
  schedules: {
    head: { en:'Schedules can use the simple present',
            de:'Für Fahrpläne und feste Zeiten kann man das Simple Present verwenden',
            ru:'Для расписаний можно использовать Present Simple' },
    note: { en:'English often uses the simple present for fixed schedules and timetables. A useful pattern, but it does not need its own practice section yet.',
            de:'Im Englischen wird das Simple Present oft für feste Fahrpläne und Zeitpläne verwendet. Eine nützliche Konstruktion, die aber noch keinen eigenen Übungsabschnitt braucht.',
            ru:'В английском Present Simple часто используется для фиксированных расписаний и графиков. Это полезная конструкция, но отдельный тренировочный раздел пока не нужен.' },
    rows: [
      { en:'The train leaves at six.',  de:'Der Zug fährt um sechs ab.',     ru:'Поезд отправляется в шесть.' },
      { en:'The lesson starts at nine.', de:'Der Unterricht beginnt um neun.', ru:'Урок начинается в девять.' },
      { en:'The store opens at eight.', de:'Der Laden öffnet um acht.',      ru:'Магазин открывается в восемь.' },
      { en:'The flight arrives tomorrow morning.', de:'Der Flug kommt morgen früh an.', ru:'Рейс прибывает завтра утром.' }
    ]
  },

  notes: [
    { en:'shall, about to and the future perfect are not taught here.',
      de:'shall, about to und das Future Perfect stehen hier nicht im Lehrgang.',
      ru:'shall, about to и Future Perfect здесь не учим.' },
    { en:'Russian and German often let the present tense carry the future — Завтра иду в магазин, Morgen gehe ich einkaufen. English can do this too, but only for a fixed arrangement or a schedule.',
      de:'Russisch und Deutsch lassen oft die Gegenwart die Zukunft tragen — Завтра иду в магазин, Morgen gehe ich einkaufen. Englisch kann das auch, aber nur bei einer festen Vereinbarung oder einem Fahrplan.',
      ru:'В русском и немецком будущее часто выражается настоящим временем — «Завтра иду в магазин», Morgen gehe ich einkaufen. В английском так можно, но только для назначенной договорённости или расписания.' }
  ]
};

window.GH_EN_FUTURE.byMark = function(mark){
  return (this.items || []).filter(function(x){ return x.mark === mark; });
};
window.GH_EN_FUTURE.item = function(id){
  var i, items = this.items || [];
  for (i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
  return null;
};
window.GH_EN_FUTURE.counts = function(){
  var c = {};
  (this.families || []).forEach(function(f){ c[f.id] = 0; });
  (this.items || []).forEach(function(x){ if (c[x.mark] !== undefined) c[x.mark]++; });
  return c;
};
