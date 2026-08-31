/* The future, which German mostly does not have.

   Two ways to say it, and the everyday one is not a tense at all: the
   present, plus a word telling you when. Morgen mache ich das. Nächste
   Woche fahren wir nach Berlin. That is how people actually speak.

   Futur I — werden plus an infinitive at the end — is the real tense, and
   it is used when the future is the point: a promise, a prediction, a
   plan being stressed. Ich werde dir helfen carries weight that Ich helfe
   dir morgen does not.

   The consequence matters for anything that asks her to sort by tense:
   the present-tense future is formally identical to the present. Mache
   ich das is present or future depending only on whether morgen is in the
   sentence. No amount of looking at the verb resolves it, which is why a
   sorting game has to either keep the time word or use werden throughout.

   And one trap worth naming early: werden on its own means to become.
   Ich werde Lehrer is I am going to be a teacher. Ich werde arbeiten is
   I will work. Same verb, and only the infinitive at the end tells them
   apart.

   The forms need no table — werden is already in the conjugator and the
   other verb stays in the infinitive. What is stored here is the pair of
   sentences per verb, so she can see the two styles side by side, and the
   time expressions that carry the everyday version. */

window.GH_FUTURE = {
  verbs: [
    { v:'machen', futur:'Ich werde die Hausaufgaben machen.', now:'Morgen mache ich die Hausaufgaben.', ru:'Я завтра сделаю домашнее задание.', en:'I will do the homework.' },
    { v:'gehen', futur:'Wir werden ins Kino gehen.', now:'Heute Abend gehen wir ins Kino.', ru:'Сегодня вечером мы идём в кино.', en:'We are going to the cinema.' },
    { v:'kommen', futur:'Sie wird später kommen.', now:'Sie kommt um acht Uhr.', ru:'Она придёт в восемь.', en:'She is coming at eight.' },
    { v:'sehen', futur:'Du wirst den Film sehen.', now:'Nächste Woche siehst du den Film.', ru:'На следующей неделе ты посмотришь фильм.', en:'You will see the film next week.' },
    { v:'sprechen', futur:'Ich werde mit ihr sprechen.', now:'Morgen spreche ich mit ihr.', ru:'Завтра я поговорю с ней.', en:'I will speak with her tomorrow.' },
    { v:'lernen', futur:'Er wird Deutsch lernen.', now:'Ab September lernt er Deutsch.', ru:'С сентября он учит немецкий.', en:'He starts learning German in September.' },
    { v:'fahren', futur:'Wir werden nach München fahren.', now:'Nächsten Monat fahren wir nach München.', ru:'В следующем месяце мы едем в Мюнхен.', en:'We are going to Munich next month.' },
    { v:'essen', futur:'Ich werde Pizza essen.', now:'Heute esse ich Pizza.', ru:'Сегодня я ем пиццу.', en:'I am having pizza today.' },
    { v:'trinken', futur:'Sie wird Kaffee trinken.', now:'Später trinkt sie Kaffee.', ru:'Позже она выпьет кофе.', en:'She will have coffee later.' },
    { v:'bleiben', futur:'Ich werde zu Hause bleiben.', now:'Heute bleibe ich zu Hause.', ru:'Сегодня я остаюсь дома.', en:'I am staying home today.' },
    { v:'helfen', futur:'Er wird dir helfen.', now:'Er hilft dir morgen.', ru:'Он поможет тебе завтра.', en:'He will help you tomorrow.' },
    { v:'schreiben', futur:'Ich werde dir eine E-Mail schreiben.', now:'Bald schreibe ich dir.', ru:'Скоро я тебе напишу.', en:'I will write to you soon.' },
    { v:'kaufen', futur:'Wir werden ein Auto kaufen.', now:'Nächstes Jahr kaufen wir ein Auto.', ru:'В следующем году мы купим машину.', en:'We are buying a car next year.' },
    { v:'arbeiten', futur:'Sie wird in Berlin arbeiten.', now:'Ab Juni arbeitet sie in Berlin.', ru:'С июня она работает в Берлине.', en:'She starts work in Berlin in June.' },
    { v:'sein', futur:'Ich werde müde sein.', now:'Morgen bin ich frei.', ru:'Завтра я свободна.', en:'I am free tomorrow.' },
    { v:'haben', futur:'Du wirst Zeit haben.', now:'Nächste Woche hast du Zeit.', ru:'На следующей неделе у тебя будет время.', en:'You will have time next week.' },
  ],

  /* the words that turn a present tense into a future */
  markers: [
    { de:'morgen', ru:'завтра', en:'tomorrow' },
    { de:'übermorgen', ru:'послезавтра', en:'the day after tomorrow' },
    { de:'heute Abend', ru:'сегодня вечером', en:'this evening' },
    { de:'nächste Woche', ru:'на следующей неделе', en:'next week' },
    { de:'nächsten Monat', ru:'в следующем месяце', en:'next month' },
    { de:'nächstes Jahr', ru:'в следующем году', en:'next year' },
    { de:'in zwei Tagen', ru:'через два дня', en:'in two days' },
    { de:'in einer Stunde', ru:'через час', en:'in an hour' },
    { de:'bald', ru:'скоро', en:'soon' },
    { de:'später', ru:'позже', en:'later' },
    { de:'gleich', ru:'сейчас, вот-вот', en:'in a moment' },
    { de:'ab September', ru:'с сентября', en:'from September' },
  ]
};
