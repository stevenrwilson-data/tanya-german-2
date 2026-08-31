/* The past, which German has two of.

   Perfekt is what people say: haben or sein plus a participle. Präteritum
   is what people write, and what everyone says for a handful of very
   common verbs — war, hatte, konnte, wusste. Teaching only one of them
   leaves her unable to read; teaching Präteritum first leaves her sounding
   like a novel.

   Three classes, and the split is the lesson:

     weak    predictable. stem + -te, participle ge- + stem + -t.
     strong  the vowel changes and the participle ends in -en.
     mixed   a small group that changes its vowel like a strong verb but
             takes the weak -t ending. bringen, denken, kennen.

   aux is the part no rule quite covers. Most verbs take haben. Verbs of
   motion or of changing state take sein — gehen, kommen, fahren, bleiben,
   and sein itself. It has to be stored per verb.

   For a Russian speaker the hard part is not the forms. Russian marks
   whether an action finished; German does not, and leans on context and
   time words instead. Ich habe gearbeitet covers both 'I worked' and
   'I have been working', and no amount of looking at the verb will tell
   her which. That is worth saying out loud rather than leaving her to
   discover it. */

window.GH_PAST = [
  { v:'machen', pt:'machte', pp:'gemacht', aux:'haben', c:'weak',
    de:'Ich habe gestern Hausaufgaben gemacht.', ru:'Я вчера делал домашнее задание.', en:'I did my homework yesterday.' },
  { v:'spielen', pt:'spielte', pp:'gespielt', aux:'haben', c:'weak',
    de:'Wir haben Fußball gespielt.', ru:'Мы играли в футбол.', en:'We played football.' },
  { v:'lernen', pt:'lernte', pp:'gelernt', aux:'haben', c:'weak',
    de:'Sie hat Deutsch gelernt.', ru:'Она учила немецкий.', en:'She learned German.' },
  { v:'arbeiten', pt:'arbeitete', pp:'gearbeitet', aux:'haben', c:'weak',
    de:'Er hat den ganzen Tag gearbeitet.', ru:'Он работал весь день.', en:'He worked all day.' },
  { v:'wohnen', pt:'wohnte', pp:'gewohnt', aux:'haben', c:'weak',
    de:'Ich habe in Moskau gewohnt.', ru:'Я жил в Москве.', en:'I lived in Moscow.' },
  { v:'kaufen', pt:'kaufte', pp:'gekauft', aux:'haben', c:'weak',
    de:'Wir haben Brot gekauft.', ru:'Мы купили хлеб.', en:'We bought bread.' },
  { v:'fragen', pt:'fragte', pp:'gefragt', aux:'haben', c:'weak',
    de:'Ich habe den Lehrer gefragt.', ru:'Я спросил учителя.', en:'I asked the teacher.' },
  { v:'sein', pt:'war', pp:'gewesen', aux:'sein', c:'strong',
    de:'Ich bin in Berlin gewesen.', ru:'Я был в Берлине.', en:'I have been in Berlin.' },
  { v:'haben', pt:'hatte', pp:'gehabt', aux:'haben', c:'strong',
    de:'Ich habe Hunger gehabt.', ru:'Я был голоден.', en:'I was hungry.' },
  { v:'gehen', pt:'ging', pp:'gegangen', aux:'sein', c:'strong',
    de:'Wir sind nach Hause gegangen.', ru:'Мы пошли домой.', en:'We went home.' },
  { v:'kommen', pt:'kam', pp:'gekommen', aux:'sein', c:'strong',
    de:'Sie ist spät gekommen.', ru:'Она пришла поздно.', en:'She came late.' },
  { v:'sehen', pt:'sah', pp:'gesehen', aux:'haben', c:'strong',
    de:'Ich habe den Film gesehen.', ru:'Я посмотрел фильм.', en:'I saw the film.' },
  { v:'sprechen', pt:'sprach', pp:'gesprochen', aux:'haben', c:'strong',
    de:'Wir haben Russisch gesprochen.', ru:'Мы говорили по-русски.', en:'We spoke Russian.' },
  { v:'nehmen', pt:'nahm', pp:'genommen', aux:'haben', c:'strong',
    de:'Er hat das Buch genommen.', ru:'Он взял книгу.', en:'He took the book.' },
  { v:'geben', pt:'gab', pp:'gegeben', aux:'haben', c:'strong',
    de:'Es hat ein Problem gegeben.', ru:'Возникла проблема.', en:'There was a problem.' },
  { v:'finden', pt:'fand', pp:'gefunden', aux:'haben', c:'strong',
    de:'Ich habe den Schlüssel gefunden.', ru:'Я нашёл ключ.', en:'I found the key.' },
  { v:'schreiben', pt:'schrieb', pp:'geschrieben', aux:'haben', c:'strong',
    de:'Sie hat eine E-Mail geschrieben.', ru:'Она написала письмо.', en:'She wrote an email.' },
  { v:'lesen', pt:'las', pp:'gelesen', aux:'haben', c:'strong',
    de:'Ich habe das Buch gelesen.', ru:'Я прочитал книгу.', en:'I read the book.' },
  { v:'essen', pt:'aß', pp:'gegessen', aux:'haben', c:'strong',
    de:'Wir haben Pizza gegessen.', ru:'Мы ели пиццу.', en:'We ate pizza.' },
  { v:'trinken', pt:'trank', pp:'getrunken', aux:'haben', c:'strong',
    de:'Er hat Kaffee getrunken.', ru:'Он пил кофе.', en:'He drank coffee.' },
  { v:'fahren', pt:'fuhr', pp:'gefahren', aux:'sein', c:'strong',
    de:'Wir sind nach München gefahren.', ru:'Мы поехали в Мюнхен.', en:'We drove to Munich.' },
  { v:'schlafen', pt:'schlief', pp:'geschlafen', aux:'haben', c:'strong',
    de:'Ich habe gut geschlafen.', ru:'Я хорошо спал.', en:'I slept well.' },
  { v:'bleiben', pt:'blieb', pp:'geblieben', aux:'sein', c:'strong',
    de:'Sie ist zu Hause geblieben.', ru:'Она осталась дома.', en:'She stayed at home.' },
  { v:'helfen', pt:'half', pp:'geholfen', aux:'haben', c:'strong',
    de:'Er hat mir geholfen.', ru:'Он мне помог.', en:'He helped me.' },
  { v:'wissen', pt:'wusste', pp:'gewusst', aux:'haben', c:'mixed',
    de:'Ich habe es nicht gewusst.', ru:'Я этого не знал.', en:'I did not know that.' },
  { v:'bringen', pt:'brachte', pp:'gebracht', aux:'haben', c:'mixed',
    de:'Ich habe dir Blumen gebracht.', ru:'Я принёс тебе цветы.', en:'I brought you flowers.' },
  { v:'denken', pt:'dachte', pp:'gedacht', aux:'haben', c:'mixed',
    de:'Ich habe an dich gedacht.', ru:'Я думал о тебе.', en:'I thought about you.' },
  { v:'kennen', pt:'kannte', pp:'gekannt', aux:'haben', c:'mixed',
    de:'Wir haben uns gekannt.', ru:'Мы были знакомы.', en:'We knew each other.' },
  { v:'nennen', pt:'nannte', pp:'genannt', aux:'haben', c:'mixed',
    de:'Man hat ihn Max genannt.', ru:'Его назвали Максом.', en:'They called him Max.' },
  { v:'rennen', pt:'rannte', pp:'gerannt', aux:'sein', c:'mixed',
    de:'Er ist nach Hause gerannt.', ru:'Он побежал домой.', en:'He ran home.' },
];
