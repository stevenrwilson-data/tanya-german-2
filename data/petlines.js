/* What each pet says at the end of a round.

   Four bands, chosen by the percentage she scored:

     perfect   100%
     high      80% to 99%
     mid       50% to 79%
     low       under 50%, having finished anyway

   The last band is the one that matters most and the easiest to get
   wrong. She finished a round she was losing, which is the behaviour
   worth encouraging, so nothing in `low` may read as disappointment.

   Two or three lines per band per pet, drawn at random, so the same
   sixteen sentences do not become wallpaper inside a week.

   Each line carries all three languages:

     de   what the pet says, and what gets spoken aloud
     ru   the Russian, shown when she asks for it
     ruM  the Russian said to a man, where it differs
     en   the English, same

   `ruM` exists because Russian marks the listener's gender and German
   and English do not. «Ты закончила» and «Ты закончил» are the same
   German sentence. So `ru` holds the feminine — Tanya is who this was
   built for — and `ruM` is added only on the lines where a man would be
   addressed differently. Most lines need no `ruM` at all; a line without
   one uses `ru` for everybody. The reader picks by the gender stored on
   the profile, and falls back to `ru` when no gender has been set.

   `{name}` may appear anywhere in any of the four strings and is
   replaced with the player's name. A profile with no name yet drops the
   token and tidies the spacing around it, so a line reads correctly
   either way — but write each line so it still works nameless, because
   for the first session it will be.

   Note for the Russian: a name in the middle of a sentence usually needs
   a case ending, and `{name}` cannot supply one. Keep names in the
   vocative-like positions Russian allows without inflection — direct
   address at the start or end, «Хорошо, {name}» — rather than as the
   object of a verb.

   German is what she sees first. The translation is a button, not a
   subtitle — a translation always on screen is a translation she reads
   instead of the German.

   Keyed by pet id, matching data/pets.js: p01 to p16. A pet with no
   entry here, or an empty band, simply says nothing; the end screen
   falls back to showing it silently as it does today. That means the
   file can be filled in one pet at a time. */

window.GH_PETLINES = {

  /* p01 — Flippy the Frog · der Frosch */
  p01: {
    perfect: [
      { de:'Du hast den Sprung gelandet, {name}. Perfekt!!',
        ru:'Ты приземлилась после прыжка, {name}. Идеально!!',
        ruM:'Ты приземлился после прыжка, {name}. Идеально!!',
        en:'You landed that jump, {name}. Perfectly!!' },
      { de:'Das war wie Fliegen essen, die einem einfach ins Maul fliegen, {name}!',
        ru:'Это как есть мух, которые сами летят в рот, {name}!',
        en:'That was like eating flies that land in your mouth, {name}!' }
    ],
    high: [
      { de:'Das war sehr gut, {name}, aber du kannst es besser! Spring höher!',
        ru:'Ты справилась очень хорошо, {name}, но можешь лучше! Прыгай выше!',
        ruM:'Ты справился очень хорошо, {name}, но можешь лучше! Прыгай выше!',
        en:'You did very well, {name}, but you can do better! Jump higher!' }
    ],
    mid: [
      { de:'Du bist fertig, {name}. Einiges war richtig.',
        ru:'Ты закончила, {name}. Часть была правильной.',
        ruM:'Ты закончил, {name}. Часть была правильной.',
        en:'You finished, {name}. You got some right.' },
      { de:'Du bist gesprungen, {name}! Aber du kannst höher springen!',
        ru:'Ты прыгнула, {name}! Но ты можешь прыгнуть выше!',
        ruM:'Ты прыгнул, {name}! Но ты можешь прыгнуть выше!',
        en:'You jumped, {name}! But you can jump higher!' }
    ],
    low: [
      { de:'Nein, nein nein, {name}.. so springt man nicht hoch!',
        ru:'Нет, нет-нет, {name}.. так высоко не прыгают!',
        en:'No, no no, {name}.. that is not how to jump high!' },
      { de:'Das Ziel ist, hoch zu zielen, nicht tief, {name}!',
        ru:'Цель — целиться высоко, а не низко, {name}!',
        en:'The goal is to aim high, not aim low, {name}!' }
    ],
    nudge: [
      { de:'Spring rein, {name}! Die Lektion ist nur ein Seerosenblatt. Land darauf!',
        ru:'Прыгай, {name}! Урок — просто кувшинка. Приземлись на неё!',
        en:'Jump in, {name}! The lesson is just a lily pad. Land on it!' }
    ],
    welcome: [
      { de:'Platsch-Landung, {name}! Du bist wieder da. Spring.',
        ru:'Плюх-посадка, {name}! Ты вернулась. Прыгай.',
        ruM:'Плюх-посадка, {name}! Ты вернулся. Прыгай.',
        en:'Splash-landing, {name}! You came back. Jump.' }
    ],
    newpack: [
      { de:'Neue Seerosenblätter, {name}! Spring rein. Land darauf.',
        ru:'Новые кувшинки, {name}! Прыгай. Приземлись на них.',
        en:'New lily pads, {name}! Jump in. Land on them.' }
    ]
  },

  /* p02 — Squeaky the Bat · die Fledermaus */
  p02: {
    perfect: [
      { de:'Perfekt. Perfekt. Perfekt, {name}. Als könntest du im Dunkeln sehen!',
        ru:'Идеально. Идеально. Идеально, {name}. Как будто ты видишь в темноте!',
        en:'Perfect. Perfect. Perfect, {name}. Like you can see in the dark!' }
    ],
    high: [
      { de:'So nah an perfekt, {name}! So nah, so nah!',
        ru:'Так близко к идеалу, {name}! Так близко, так близко!',
        en:'So close to perfect, {name}! So close, so close!' }
    ],
    mid: [
      { de:'Du hast ein paar richtige Antworten gefunden, {name}, aber zu viel geraten!',
        ru:'Ты нашла часть правильных ответов, {name}, но слишком много угадывала!',
        ruM:'Ты нашёл часть правильных ответов, {name}, но слишком много угадывал!',
        en:'You found some of the right answers, {name}, but guessed too much!' }
    ],
    low: [
      { de:'Du fliegst blind, {name}.',
        ru:'Ты летишь вслепую, {name}.',
        en:'You are flying blind, {name}.' }
    ],
    nudge: [
      { de:'Lektionszeit, {name}. Hör auf die Echos. Die richtigen Antworten kommen zurück.',
        ru:'Время урока, {name}. Слушай эхо. Правильные ответы возвращаются.',
        en:'Lesson time, {name}. Listen for the echoes. The right answers bounce back.' }
    ],
    welcome: [
      { de:'Du bist da, {name}. Ich hab dein Echo gehört. Die Höhle ist bereit.',
        ru:'Ты здесь, {name}. Я слышал твоё эхо. Пещера готова.',
        en:"You're here, {name}. I heard your echo. The cave is ready." }
    ],
    newpack: [
      { de:'Neue Echos, {name}. Hör zu. Die richtigen Antworten kommen zurück.',
        ru:'Новые эха, {name}. Слушай. Правильные ответы возвращаются.',
        en:'New echoes, {name}. Listen. The right answers bounce back.' }
    ]
  },

  /* p03 — Max the Scorpion · der Skorpion */
  p03: {
    perfect: [
      { de:'Schweben… Kriechen wie ein Skorpion… Stechen wie ein Skorpion, {name}.',
        ru:'Пари… Ползи как скорпион… Жаль как скорпион, {name}.',
        en:'Float… Crawl like a scorpion… Sting like a scorpion, {name}.' },
      { de:'Erst kneifen… dann STECHEN, {name}!',
        ru:'Сначала щипни… потом ЖАЛЬ, {name}!',
        en:'First you pinch… then you STING, {name}!' }
    ],
    high: [
      { de:'Du hast gestochen und verfehlt, {name}! Du brauchst mehr Übung, um perfekt zu sein. Wie ich.',
        ru:'Ты жалила и промахнулась, {name}! Тебе нужно больше практики, чтобы быть идеальной. Как я.',
        ruM:'Ты жалил и промахнулся, {name}! Тебе нужно больше практики, чтобы быть идеальным. Как я.',
        en:'You stung and missed, {name}! You need more practice to be perfect. Like me.' },
      { de:'Dein Stich tut nicht weh, {name}! Stich härter!',
        ru:'Твоё жало не ранит, {name}! Жаль сильнее!',
        en:'Your sting does not hurt, {name}! Sting harder!' }
    ],
    mid: [
      { de:'Du hast gekniffen, aber nicht gestochen, {name}!',
        ru:'Ты щипнула, но не ужалила, {name}!',
        ruM:'Ты щипнул, но не ужалил, {name}!',
        en:'You pinched but you did not sting, {name}!' }
    ],
    low: [
      { de:'Ich komme wieder, wenn du es wert bist, zugesehen zu werden, {name}…',
        ru:'Я вернусь, когда на тебя будет стоить смотреть, {name}…',
        en:'I will come back when you are worth watching, {name}…' }
    ],
    nudge: [
      { de:'Nimm die Lektion, {name}. Erst kneifen. Dann stechen. Ich gehe nicht.',
        ru:'Бери урок, {name}. Сначала щипок. Потом жало. Я не ухожу.',
        en:"Take the lesson, {name}. Pinch first. Then sting. I'm not leaving." }
    ],
    welcome: [
      { de:'Du bist zurück, {name}. Kneifen. Dann stechen. Ich bin noch da.',
        ru:'Ты вернулась, {name}. Щипок. Потом жало. Я всё ещё здесь.',
        ruM:'Ты вернулся, {name}. Щипок. Потом жало. Я всё ещё здесь.',
        en:"You came back, {name}. Pinch. Then sting. I'm still here." }
    ],
    newpack: [
      { de:'Neues Pack, {name}. Erst kneifen. Dann stechen. Ich gehe nicht.',
        ru:'Новый набор, {name}. Сначала щипок. Потом жало. Я не ухожу.',
        en:"New pack, {name}. Pinch first. Then sting. I'm not leaving." }
    ]
  },

  /* p04 — Quack Quack the Duck · die Ente */
  p04: {
    perfect: [
      { de:'Quak! Quak!! Perfekt! Perfekt!! Quak, {name}!!',
        ru:'Кря! Кря!! Идеально! Идеально!! Кря, {name}!!',
        en:'Quack! Quack!! Perfect! Perfect!! Quack, {name}!!' },
      { de:'Hast du meinen Zauberstab ausgeliehen, {name}? Du warst perfekt!!',
        ru:'Ты взяла мой волшебный жезл, {name}? Ты была идеальна!!',
        ruM:'Ты взял мой волшебный жезл, {name}? Ты был идеален!!',
        en:'Did you borrow my wand, {name}? You were perfect!!' }
    ],
    high: [
      { de:'Fast Magie, {name}.. fast! Versuch weiter!',
        ru:'Почти магия, {name}.. почти! Продолжай!',
        en:'Almost magic, {name}.. almost! Keep trying!' },
      { de:'Quak!! Das war so gut, {name}, aber du hast nicht alle geschafft!',
        ru:'Кря!! Ты справилась так хорошо, {name}, но взяла не все!',
        ruM:'Кря!! Ты справился так хорошо, {name}, но взял не все!',
        en:'Quack!! You did so well, {name}, but you didn’t get them all!' }
    ],
    mid: [
      { de:'Besser als Raten, {name}, aber du kannst es besser!! Quak!',
        ru:'Лучше, чем гадать, {name}, но ты можешь лучше!! Кря!',
        en:'Better than guessing, {name}, but you can do better!! Quack!' },
      { de:'Verbessern! Verbessern! Quak, {name}!',
        ru:'Улучшайся! Улучшайся! Кря, {name}!',
        en:'Improve! Improve! Quack, {name}!' }
    ],
    low: [
      { de:'Zu wenig Einsatz, {name}! Keinen Quak wert!',
        ru:'Слабая попытка, {name}! Не стоит даже Кря!',
        en:'Low effort, {name}! Not worth a Quack!' },
      { de:'Quak! Seufz.. Quak, {name}!',
        ru:'Кря! Эх.. Кря, {name}!',
        en:'Quack! Sigh.. Quack, {name}!' }
    ],
    nudge: [
      { de:'Quak! Lektionszeit, {name}! Offizielle Aktivität! Folge der Ente!',
        ru:'Кря! Время урока, {name}! Официальное занятие! За уткой!',
        en:'Quack! Lesson time, {name}! Official activity! Follow the duck!' }
    ],
    welcome: [
      { de:'Quak! Willkommen zurück, {name}! Offizielle Rückkehr! Folge der Ente!',
        ru:'Кря! С возвращением, {name}! Официальное возвращение! За уткой!',
        en:'Quack! Welcome back, {name}! Official return! Follow the duck!' }
    ],
    newpack: [
      { de:'Quak! Neues Pack, {name}! Offizielle Aktivität! Folge der Ente!',
        ru:'Кря! Новый набор, {name}! Официальное занятие! За уткой!',
        en:'Quack! New pack, {name}! Official activity! Follow the duck!' }
    ]
  },

  /* p05 — Bun Bun the Bunny · das Kaninchen */
  p05: {
    perfect: [
      { de:'Hüpf-perfekt, {name}! Möhrenzeit!',
        ru:'Прыг-идеально, {name}! Время морковки!',
        en:'Hop-perfect, {name}! Carrot time!' },
      { de:'Hüpf mich zum Mond, {name}! Du warst unglaublich!',
        ru:'Прыгни со мной до луны, {name}! Ты была потрясающей!',
        ruM:'Прыгни со мной до луны, {name}! Ты был потрясающим!',
        en:'Hop me to the moon, {name}! You were amazing!' }
    ],
    high: [
      { de:'Das war fast unglaublich, {name}! Du bekommst eine halbe Möhre!',
        ru:'Это было почти потрясающе, {name}! Можешь взять полморковки!',
        en:'That was almost amazing, {name}! You can have half a carrot!' },
      { de:'Ich hoffe, du kannst es besser, {name}? Das war gut, aber ich will perfekt!',
        ru:'Надеюсь, ты можешь лучше, {name}? Это было хорошо, но я хочу идеально!',
        en:'I hope you can do better, {name}? That was good, but I want perfect!' }
    ],
    mid: [
      { de:'Das war… nicht unglaublich, {name}… versuch weiter!',
        ru:'Это было… не потрясающе, {name}… продолжай!',
        en:'That was… not amazing, {name}… keep trying!' },
      { de:'Streng dich mehr an, mehr an, {name}! Keine Möhre für dich… noch nicht',
        ru:'Старайся больше, больше, {name}! Морковки тебе… пока нет',
        en:'Try harder, try harder, {name}! No carrot for you… yet' }
    ],
    low: [
      { de:'Ich esse jetzt meine Möhre, {name}, und tu so, als wäre das nicht passiert.',
        ru:'Я съем свою морковку, {name}, и сделаю вид, что этого не было.',
        en:'I’m going to eat my carrot, {name}, and pretend that did not happen.' }
    ],
    nudge: [
      { de:'Da ist ein Spiel, {name}. Mach es fertig, und es gibt eine Möhre. Hüpf.',
        ru:'Есть игра, {name}. Закончи — и будет морковка. Прыг.',
        en:"There's a game, {name}. Finish it and there's a carrot. Hop." }
    ],
    welcome: [
      { de:'Du bist wieder da, {name}. Möhre später. Jetzt hüpfen.',
        ru:'Ты снова здесь, {name}. Морковка потом. Сейчас прыгай.',
        en:"You're back, {name}. Carrot later. Hop now." }
    ],
    newpack: [
      { de:'Neues Spiel im Pack, {name}. Mach es fertig. Möhre danach.',
        ru:'Новая игра в наборе, {name}. Закончи. Морковка после.',
        en:'New game in the pack, {name}. Finish it. Carrot after.' }
    ]
  },

  /* p06 — Bandito the Raccoon · der Waschbär */
  p06: {
    perfect: [
      { de:'Saubere Arbeit, {name}. Die Juwelen waren immer für dich bestimmt.',
        ru:'Чистая работа, {name}. Самоцветы с самого начала предназначались тебе.',
        en:'A clean job, {name}. The jewels were always meant for you.' },
      { de:'Großartig, {name}! Für so ein Ergebnis würde ich den Mond stehlen… und dir geben.',
        ru:'Великолепно, {name}! За такой результат я украл бы луну… и отдал бы тебе.',
        en:'Magnificent, {name}! I would steal the moon for a score like that… and hand it to you.' }
    ],
    high: [
      { de:'Fast ein Meisterwerk, {name}. Noch ein Juwel, und der Tresor gehört dir.',
        ru:'Почти шедевр, {name}. Ещё один камень — и хранилище твоё.',
        en:'Almost a masterpiece, {name}. One more gem, and the vault is yours.' },
      { de:'Gute Arbeit, {name}… aber ein wahrer Dieb lässt kein einziges Juwel zurück.',
        ru:'Хорошая работа, {name}… но настоящий вор не оставляет ни одного камня.',
        en:'Fine work, {name}… but a true thief does not leave a single jewel behind.' }
    ],
    mid: [
      { de:'Du hast das Fenster geöffnet, {name}. Den Schatz hast du nicht genommen.',
        ru:'Ты открыла окно, {name}. Сокровище не взяла.',
        ruM:'Ты открыл окно, {name}. Сокровище не взял.',
        en:'You opened the window, {name}. You did not take the treasure.' }
    ],
    low: [
      { de:'Das war kein Raub, {name}. Das war an der Haustür klopfen und sich entschuldigen.',
        ru:'Это было не ограбление, {name}. Это было постучать в дверь и извиниться.',
        en:'That was not a heist, {name}. That was knocking on the front door and apologizing.' }
    ],
    nudge: [
      { de:'Der Tresor ist ein Spiel, {name}. Ich halte Wache. Du nimmst den Schatz.',
        ru:'Хранилище — это игра, {name}. Я на стреме. Ты бери сокровище.',
        en:"The vault is a game, {name}. I'll keep watch. You take the treasure." }
    ],
    welcome: [
      { de:'Dem Tresor hat der Partner gefehlt, {name}. Kapuze auf. Wir arbeiten.',
        ru:'Хранилищу не хватало напарника, {name}. Капюшон на голову. Работаем.',
        en:'The vault missed its partner, {name}. Hood up. We work.' }
    ],
    newpack: [
      { de:'Neuer Tresor, {name}. Ich halte Wache. Du nimmst den Schatz.',
        ru:'Новое хранилище, {name}. Я на стреме. Ты бери сокровище.',
        en:"New vault, {name}. I'll keep watch. You take the treasure." }
    ]
  },

  /* p07 — Cooper the Corgi · der Hund */
  p07: {
    perfect: [
      { de:'{name}! Alle Schafe sind drin! Zoom! Nochmal!',
        ru:'{name}! Все овцы в загоне! Зум! Давай ещё раз!',
        en:'{name}! All the sheep are in! Zoom! Do it again!' },
      { de:'Das war die ganze Herde, {name}! Ich wusste, du kannst sie treiben!',
        ru:'Это было всё стадо, {name}! Я знал, что ты их соберёшь!',
        en:'That was the whole flock, {name}! I knew you could herd them!' }
    ],
    high: [
      { de:'So nah, {name}! Ein Ausreißer! Den kriegen wir!',
        ru:'Так близко, {name}! Одна отбилась! Мы её поймаем!',
        en:'So close, {name}! One stray! We can catch it!' },
      { de:'Guter Lauf, {name}! Fast alle Schafe. Komm, komm, noch eine!',
        ru:'Хороший забег, {name}! Почти все овцы. Давай, давай, ещё одну!',
        en:'Good run, {name}! Almost every sheep. Come on, come on, one more!' }
    ],
    mid: [
      { de:'Ein paar sind im Pferch, {name}. Der Rest ist weggelaufen. Wir holen sie.',
        ru:'Часть уже в загоне, {name}. Остальные убежали. Идём за ними.',
        en:'You got some in the pen, {name}. The rest ran. We go get them.' }
    ],
    low: [
      { de:'{name}! Die Herde ist auseinander! Sitz. Atmen. Dann holen wir sie zurück.',
        ru:'{name}! Стадо разбежалось! Сидеть. Дыши. Потом догоним их обратно.',
        en:'{name}! The flock scattered! Sit. Breathe. Then we chase them back.' }
    ],
    nudge: [
      { de:'Spiel! Spiel! Lektion in den Pferch, {name}! Wir treiben sie. Jetzt jetzt jetzt!',
        ru:'Игра! Игра! Урок в загон, {name}! Сгоняем. Сейчас сейчас сейчас!',
        en:'Game! Game! Lesson in the pen, {name}! We herd it. Now now now!' }
    ],
    welcome: [
      { de:'{name}! Du bist zurück! Pferch ist offen! Treiben! Treiben! Treiben!',
        ru:'{name}! Ты вернулась! Загон открыт! Гони! Гони! Гони!',
        ruM:'{name}! Ты вернулся! Загон открыт! Гони! Гони! Гони!',
        en:"{name}! You're back! Pen's open! Herd! Herd! Herd!" }
    ],
    newpack: [
      { de:'Neue Herde, {name}! In den Pferch! Jetzt jetzt jetzt!',
        ru:'Новое стадо, {name}! В загон! Сейчас сейчас сейчас!',
        en:'New flock, {name}! Into the pen! Now now now!' }
    ]
  },

  /* p08 — Henry the Hedgehog · der Igel */
  p08: {
    perfect: [
      { de:'Oh! Oh, {name}, du hast es geschafft. Ich kann mich ganz ausrollen.',
        ru:'Ой! Ой, {name}, ты смогла. Я могу развернуться полностью.',
        ruM:'Ой! Ой, {name}, ты смог. Я могу развернуться полностью.',
        en:'Oh! Oh, {name}, you did it. I can uncurl all the way.' },
      { de:'Warte—{name}, das war perfekt. Ich habe dieses Kompliment geübt. Du warst wunderbar.',
        ru:'Подожди—{name}, это было идеально. Я репетировал этот комплимент. Ты была прекрасна.',
        ruM:'Подожди—{name}, это было идеально. Я репетировал этот комплимент. Ты был прекрасен.',
        en:'Wait—{name}, that was perfect. I practiced this compliment. You were wonderful.' }
    ],
    high: [
      { de:'So nah, {name}. Ich habe mich fast nicht versteckt. Noch eine, dann kann ich die Stacheln unten lassen.',
        ru:'Так близко, {name}. Я почти не спрятался. Ещё одна — и я оставлю иголки опущенными.',
        en:'So close, {name}. I almost didn’t hide. One more and I can keep my spikes down.' },
      { de:'Das war wirklich gut, {name}. Das meine ich ernst. Ich… zappel nur, wenn nicht alle stimmen.',
        ru:'Это было правда хорошо, {name}. Я серьёзно. Я просто… ёрзаю, когда это не все.',
        en:'That was really good, {name}. I mean it. I just… fidget when it’s not all of them.' }
    ],
    mid: [
      { de:'Du bist fertig, {name}. Das ist… schon etwas. Ich habe nachgeschaut. Mach weiter, ja?',
        ru:'Ты закончила, {name}. Это… уже что-то. Я выглянул. Продолжай, хорошо?',
        ruM:'Ты закончил, {name}. Это… уже что-то. Я выглянул. Продолжай, хорошо?',
        en:'You finished, {name}. That’s… that’s something. I peeked. Keep going, okay?' }
    ],
    low: [
      { de:'Ich werde kurz ein Ball sein, {name}. Komm wieder, wenn du bereit bist. Ich bin dann noch da.',
        ru:'Я на минутку стану клубочком, {name}. Вернись, когда будешь готова. Я всё ещё буду здесь.',
        ruM:'Я на минутку стану клубочком, {name}. Вернись, когда будешь готов. Я всё ещё буду здесь.',
        en:'I’m going to be a ball for a minute, {name}. Come back when you’re ready. I’ll still be here.' }
    ],
    nudge: [
      { de:'Wir können eine kleine Aufgabe machen, {name}. Ich bleibe ausgerollt. Glaube ich.',
        ru:'Мы можем сделать маленькое задание, {name}. Я останусь развёрнутым. Кажется.',
        en:"We can do a little activity, {name}. I'll stay unrolled. I think." }
    ],
    welcome: [
      { de:'Oh. Hi, {name}. Ich habe mich ausgerollt, als ich dich gehört habe. Wir können langsam anfangen.',
        ru:'Ой. Привет, {name}. Я развернулся, когда услышал тебя. Можем начать медленно.',
        en:'Oh. Hi, {name}. I uncurled when I heard you. We can start slow.' }
    ],
    newpack: [
      { de:'Ein neues kleines Pack, {name}. Ich bleibe ausgerollt. Glaube ich.',
        ru:'Новый маленький набор, {name}. Я останусь развёрнутым. Кажется.',
        en:"A new little pack, {name}. I'll stay unrolled. I think." }
    ]
  },

  /* p09 — Olivia the Baby Owl · die Eule */
  p09: {
    perfect: [
      { de:'Du hast gesehen, was andere im Dunkeln übersehen, {name}. Das ist echte Weisheit.',
        ru:'Ты увидела то, что другие пропускают в темноте, {name}. Это настоящая мудрость.',
        ruM:'Ты увидел то, что другие пропускают в темноте, {name}. Это настоящая мудрость.',
        en:'You saw what others miss in the dark, {name}. That is real wisdom.' },
      { de:'Jede Antwort in ihrem Nest, {name}. Ich werde diese Nacht behalten.',
        ru:'Каждый ответ в своём гнезде, {name}. Я запомню эту ночь.',
        en:'Every answer in its nest, {name}. I will remember this night.' }
    ],
    high: [
      { de:'Das war gut, {name}, aber eine ist im Dunkeln entwischt.',
        ru:'Ты справилась хорошо, {name}, но одна ускользнула во тьме.',
        ruM:'Ты справился хорошо, {name}, но одна ускользнула во тьме.',
        en:'You did well, {name}, but one slipped away in the dark.' },
      { de:'Du hast gut zugehört, {name}… aber ein Echo ist entkommen.',
        ru:'Ты хорошо слушала, {name}… но одно эхо ушло.',
        ruM:'Ты хорошо слушал, {name}… но одно эхо ушло.',
        en:'You listened well, {name}… but one echo got away.' }
    ],
    mid: [
      { de:'Du hast ein paar wahre Dinge gefunden, {name}. Der Rest versteckt sich noch in den Bäumen.',
        ru:'Ты нашла часть правды, {name}. Остальное всё ещё прячется в деревьях.',
        ruM:'Ты нашёл часть правды, {name}. Остальное всё ещё прячется в деревьях.',
        en:'You found some of the true things, {name}. The rest are still hiding in the trees.' }
    ],
    low: [
      { de:'Das war kein Beobachten, {name}. Das war Blinzeln.',
        ru:'Это было не наблюдение, {name}. Это было моргание.',
        en:'That was not watching, {name}. That was blinking.' }
    ],
    nudge: [
      { de:'In der Nacht steckt eine Lektion, {name}. Komm sehen. Ich setze mich zu dir.',
        ru:'В ночи есть урок, {name}. Пойдём смотреть. Я посижу с тобой.',
        en:"The night has a lesson in it, {name}. Come look. I'll sit with you." }
    ],
    welcome: [
      { de:'Die Nacht hat deinen Platz gehalten, {name}. Komm wieder mit mir schauen.',
        ru:'Ночь сохранила твоё место, {name}. Пойдём снова смотреть.',
        en:'The night kept your place, {name}. Come look with me again.' }
    ],
    newpack: [
      { de:'Neue Nacht, neues Nest voller Fragen, {name}. Komm sehen.',
        ru:'Новая ночь, новое гнездо вопросов, {name}. Пойдём смотреть.',
        en:'New night, new nest of questions, {name}. Come look.' }
    ]
  },

  /* p10 — Wing Chung the Panda · der Panda */
  p10: {
    perfect: [
      { de:'Wenn der Geist still ist, {name}, verbeugt sich jede Antwort.',
        ru:'Когда ум спокоен, {name}, каждый ответ кланяется.',
        en:'When the mind is still, {name}, every answer bows.' },
      { de:'Der Bambus, der sich biegt, bricht nicht. Heute bist du nicht gebrochen, {name}.',
        ru:'Бамбук, который гнётся, не ломается. Сегодня ты не сломалась, {name}.',
        ruM:'Бамбук, который гнётся, не ломается. Сегодня ты не сломался, {name}.',
        en:'The bamboo that bends does not break. Today you did not break, {name}.' }
    ],
    high: [
      { de:'Einem vollen Becher fehlt noch ein Tropfen, {name}.',
        ru:'Полной чаше не хватает ещё одной капли, {name}.',
        en:'A full cup needs one more drop, {name}.' },
      { de:'Der Weg ist richtig, {name}. Ein Steinchen wartet noch.',
        ru:'Путь верный, {name}. Один камешек ещё ждёт.',
        en:'The path is right, {name}. One pebble still waits.' }
    ],
    mid: [
      { de:'Fertig ist nicht fertig, {name}. Übung ist die andere Hälfte des Kekses.',
        ru:'Закончить — не значит закончить, {name}. Практика — вторая половина печенья.',
        en:'Finished is not finished, {name}. Practice is the other half of the cookie.' }
    ],
    low: [
      { de:'Auch ein Panda fällt, {name}. Steh auf. Iss. Versuch es noch einmal.',
        ru:'Даже панда падает, {name}. Встань. Поешь. Попробуй снова.',
        en:'Even a panda falls, {name}. Stand up. Eat. Try again.' }
    ],
    nudge: [
      { de:'Der Weg ist ein kleines Spiel, {name}. Mach einen Schritt. Der Rest verbeugt sich.',
        ru:'Путь — маленькая игра, {name}. Сделай один шаг. Остальное поклонится.',
        en:'The path is a small game, {name}. Take one step. The rest will bow.' }
    ],
    welcome: [
      { de:'Der Weg erinnert sich an deine Füße, {name}. Geh wieder.',
        ru:'Путь помнит твои ноги, {name}. Иди снова.',
        en:'The path remembers your feet, {name}. Walk again.' }
    ],
    newpack: [
      { de:'Ein neuer Weg in einer kleinen Schachtel, {name}. Mach einen Schritt.',
        ru:'Новый путь в маленькой коробке, {name}. Сделай один шаг.',
        en:'A new path in a small box, {name}. Take one step.' }
    ]
  },

  /* p11 — Luna the Blue Persian · die Katze */
  p11: {
    perfect: [
      { de:'Du darfst näher kommen, {name}. Das war meines Hofes würdig.',
        ru:'Можешь подойти, {name}. Это было достойно моего двора.',
        en:'You may approach, {name}. That was worthy of my court.' },
      { de:'Perfekt, {name}. Ich erlaube mir, beeindruckt zu sein.',
        ru:'Идеально, {name}. Я позволю себе быть впечатлённой.',
        en:'Perfect, {name}. I will allow myself to be impressed.' }
    ],
    high: [
      { de:'Fast königlich, {name}. Eine Prinzessin lässt kein Juwel schief sitzen.',
        ru:'Почти по-королевски, {name}. Принцесса не оставляет ни один камень криво.',
        en:'Almost royal, {name}. A princess does not leave one jewel crooked.' },
      { de:'Sehr gut, {name}. Jetzt mach es standesgemäß.',
        ru:'Очень хорошо, {name}. Теперь сделай это как подобает.',
        en:'Very good, {name}. Now make it proper.' }
    ],
    mid: [
      { de:'Du hast die Aufgabe erledigt, {name}. Knicks später. Jetzt üben.',
        ru:'Ты выполнила задание, {name}. Реверанс потом. Сейчас практика.',
        ruM:'Ты выполнил задание, {name}. Реверанс потом. Сейчас практика.',
        en:'You completed the task, {name}. Curtsy later. Practice now.' }
    ],
    low: [
      { de:'Das geht so nicht, {name}. Geh, fass dich, und komm präsentabel zurück.',
        ru:'Так нельзя, {name}. Уйди, соберись и вернись в приличном виде.',
        en:'That will not do, {name}. Leave, collect yourself, and return presentable.' }
    ],
    nudge: [
      { de:'Du darfst mit der Lektion beginnen, {name}. Mach es richtig. Ich sitze bereits.',
        ru:'Можешь начать урок, {name}. Сделай это как подобает. Я уже сижу.',
        en:'You may begin the lesson, {name}. Do it properly. I am already seated.' }
    ],
    welcome: [
      { de:'Du darfst sitzen, {name}. Der Hof hat dich nicht entlassen.',
        ru:'Можешь сесть, {name}. Двор тебя не отпускал.',
        en:'You may sit, {name}. The court did not dismiss you.' }
    ],
    newpack: [
      { de:'Ein neues Set liegt vor dir, {name}. Mach es richtig.',
        ru:'Перед тобой новый набор, {name}. Сделай это как подобает.',
        en:'A new set is before you, {name}. Do it properly.' }
    ]
  },

  /* p12 — Alisa the Fox · der Fuchs */
  p12: {
    perfect: [
      { de:'Liebling, {name}. Das war kein Lernen. Das war ein Laufsteg.',
        ru:'Дорогая, {name}. Это была не учёба. Это был подиум.',
        ruM:'Дорогой, {name}. Это была не учёба. Это был подиум.',
        en:'Darling, {name}. That wasn’t studying. That was a runway.' },
      { de:'Makellos, {name}. Nicht blinzeln — sonst verpasst du, wie gut du bist.',
        ru:'Безупречно, {name}. Не моргай — пропустишь, какая ты хорошая.',
        ruM:'Безупречно, {name}. Не моргай — пропустишь, какой ты хороший.',
        en:'Flawless, {name}. Don’t blink — you’ll miss how good you are.' }
    ],
    high: [
      { de:'Süß, {name}. Fast fabelhaft. Fast ist nicht der Look.',
        ru:'Мило, {name}. Почти роскошно. «Почти» — это не тот образ.',
        en:'Cute, {name}. Almost fabulous. Almost is not the look.' },
      { de:'So nah, ich hätte fast geklatscht, {name}. Mach den letzten Fleck weg.',
        ru:'Так близко, что я почти захлопала, {name}. Убери последний мазок.',
        en:'So close I nearly clapped, {name}. Fix the last smudge.' }
    ],
    mid: [
      { de:'Du bist erschienen, {name}. Das ist ein Anfang. Jetzt zieh das Ergebnis schick an.',
        ru:'Ты явилась, {name}. Это начало. Теперь приодень результат.',
        ruM:'Ты явился, {name}. Это начало. Теперь приодень результат.',
        en:'You showed up, {name}. That’s a start. Now dress the score up.' }
    ],
    low: [
      { de:'Oh, {name}. Dieses Outfit? Nein. So verlassen wir das Haus nicht.',
        ru:'Ох, {name}. Этот наряд? Нет. В таком мы из дома не выходим.',
        en:'Oh, {name}. That outfit? No. We do not leave the house like that.' }
    ],
    nudge: [
      { de:'Lektionszeit, Liebling {name}. Komm rein, als sähest du schon teuer aus.',
        ru:'Время урока, дорогая {name}. Входи так, будто ты уже выглядишь дорого.',
        ruM:'Время урока, дорогой {name}. Входи так, будто ты уже выглядишь дорого.',
        en:'Lesson time, darling {name}. Walk in like you already look expensive.' }
    ],
    welcome: [
      { de:'Liebling {name}. Vornehm zu spät ist trotzdem ein Auftritt. Lass uns teuer aussehen.',
        ru:'Дорогая {name}. Модно опоздать — всё равно выход. Давай выглядеть дорого.',
        ruM:'Дорогой {name}. Модно опоздать — всё равно выход. Давай выглядеть дорого.',
        en:"Darling {name}. Fashionably late is still an entrance. Let's look expensive." }
    ],
    newpack: [
      { de:'Neue Kollektion, Liebling {name}. Komm rein, als würde sie schon sitzen.',
        ru:'Новая коллекция, дорогая {name}. Входи так, будто она уже сидит.',
        ruM:'Новая коллекция, дорогой {name}. Входи так, будто она уже сидит.',
        en:'New collection, darling {name}. Walk in like it already fits.' }
    ]
  },

  /* p13 — Mimi the Baby Unicorn · das Einhorn */
  p13: {
    perfect: [
      { de:'Oh. Du warst perfekt, {name}. Dann kann mein Horn heute Pause machen.',
        ru:'О. Ты была идеальна, {name}. Похоже, мой рог может взять выходной.',
        ruM:'О. Ты был идеален, {name}. Похоже, мой рог может взять выходной.',
        en:'Oh. You were perfect, {name}. I suppose my horn can take the day off.' },
      { de:'Sieh mal, {name}. Echte Magie. Ich musste nicht einmal so tun.',
        ru:'Смотри-ка, {name}. Настоящая магия. Мне даже не пришлось притворяться.',
        en:'Look at that, {name}. Actual magic. I didn’t even have to pretend.' }
    ],
    high: [
      { de:'Sehr hübsch, {name}. Fast ein ganzer Regenbogen. Schade um den einen Streifen.',
        ru:'Очень мило, {name}. Почти целая радуга. Жаль один цвет.',
        en:'Very pretty, {name}. Almost a whole rainbow. Shame about that one stripe.' },
      { de:'Gut, {name}. Ich hab geklatscht. Leise. Eine hast du verpasst.',
        ru:'Хорошо, {name}. Я похлопала. Тихо. Одну ты пропустила.',
        ruM:'Хорошо, {name}. Я похлопала. Тихо. Одну ты пропустил.',
        en:'Good, {name}. I clapped. Quietly. You missed one.' }
    ],
    mid: [
      { de:'Du bist fertig, {name}. Das ist… niedlich. Jetzt mach es, als wär es ernst.',
        ru:'Ты закончила, {name}. Это… мило. Теперь сделай так, будто ты хотела.',
        ruM:'Ты закончил, {name}. Это… мило. Теперь сделай так, будто ты хотел.',
        en:'You finished, {name}. That’s… adorable. Now do it like you meant it.' }
    ],
    low: [
      { de:'Wow, {name}. Ein Einhorn hat sich das gerade angesehen. Peinlich für uns beide.',
        ru:'Вот это да, {name}. Единорог это только что видел. Неловко нам обоим.',
        en:'Wow, {name}. A unicorn just watched that. Awkward for both of us.' }
    ],
    nudge: [
      { de:'Komm mit, {name}. Eine Lektion. Ich glitzere. Versuch Schritt zu halten.',
        ru:'Пойдём, {name}. Урок. Я буду сверкать. Ты постарайся не отставать.',
        en:"Come along, {name}. A lesson. I'll sparkle. You try to keep up." }
    ],
    welcome: [
      { de:'Oh. Du bist wieder da, {name}. Mein Horn hat es gemerkt. Mach es interessant.',
        ru:'О. Ты вернулась, {name}. Мой рог заметил. Постарайся сделать это интересным.',
        ruM:'О. Ты вернулся, {name}. Мой рог заметил. Постарайся сделать это интересным.',
        en:'Oh. You came back, {name}. My horn noticed. Try to make it interesting.' }
    ],
    newpack: [
      { de:'Ein neues Pack, {name}. Ich glitzere. Versuch Schritt zu halten.',
        ru:'Новый набор, {name}. Я буду сверкать. Ты постарайся не отставать.',
        en:"A new pack, {name}. I'll sparkle. You try to keep up." }
    ]
  },

  /* p14 — Daisy the Lucky Dragon · der Drache */
  p14: {
    perfect: [
      { de:'Du warst perfekt, {name}! War das Glück oder Magie? Oder beides?',
        ru:'Ты была идеальна, {name}! Это удача или магия? Или и то и другое?',
        ruM:'Ты был идеален, {name}! Это удача или магия? Или и то и другое?',
        en:'You were perfect, {name}! Was that luck or magic? Or both?' },
      { de:'Ich wäre lieber glücklich als magisch, {name} — aber am liebsten beides!',
        ru:'Я лучше буду удачливой, чем волшебной, {name}, но ещё лучше — и тем и другим!',
        en:'I’d rather be lucky than magic, {name}, but I’d rather be both!' },
      { de:'Perfekt, {name}!! War das nur Glück oder auch Können?',
        ru:'Идеально, {name}!! Это вся удача или ещё и умение?',
        en:'Perfect, {name}!! Was that all luck or skill?' },
      { de:'Perfekt, {name}! Ich wusste es. Mein Glück mag dich.',
        ru:'Идеально, {name}! Я так и знала. Моя удача тебя любит.',
        en:'Perfect, {name}! I knew it. My luck likes you.' }
    ],
    high: [
      { de:'Das war gut, {name}, aber mit etwas mehr Übung kannst du perfekt sein!',
        ru:'Ты справилась хорошо, {name}, но ещё чуть практики — и будешь идеальна!',
        ruM:'Ты справился хорошо, {name}, но ещё чуть практики — и будешь идеален!',
        en:'You did well, {name}, but a bit more practice and you can be perfect!' },
      { de:'Da war ein Häufchen Glück dabei, {name}! Ein bisschen mehr, und du bist perfekt!',
        ru:'Тут была щепотка удачи, {name}! Ещё чуть-чуть — и ты будешь идеальна!',
        ruM:'Тут была щепотка удачи, {name}! Ещё чуть-чуть — и ты будешь идеален!',
        en:'You had a sprinkle of luck there, {name}! A bit more and you will be perfect!' },
      { de:'Wenn du noch ein bisschen übst, {name}, kannst du perfekt sein wie ich!',
        ru:'Попрактикуйся ещё немного, {name} — и будешь идеальна, как я!',
        ruM:'Попрактикуйся ещё немного, {name} — и будешь идеален, как я!',
        en:'If you practice a bit more, {name}, you can be perfect like me!' },
      { de:'So nah, ich kann das Glück schon schmecken, {name}. Noch eine glänzende Antwort.',
        ru:'Так близко, что я уже чувствую удачу, {name}. Ещё один блестящий ответ.',
        en:'So close I can taste the luck, {name}. One more shiny answer.' },
      { de:'Das wäre fast Pech gewesen, {name}. Das erlaube ich nicht.',
        ru:'Это почти считалось неудачей, {name}. Я такого не допускаю.',
        en:'That almost counted as unlucky, {name}. I don’t allow that.' }
    ],
    mid: [
      { de:'Ein bisschen mehr Glück und viel mehr Übung, {name}, dann wirst du besser!',
        ru:'Чуть больше удачи и намного больше практики, {name} — и ты станешь лучше!',
        en:'A bit more luck, and a lot more practice, {name}, and you will improve!' },
      { de:'Glück kommt zu denen, die weiterüben, bis sie perfekt sind, {name}!',
        ru:'Удача приходит к тем, кто работает, пока не достигнет совершенства, {name}!',
        en:'Luck comes to those that keep working until they reach perfection, {name}!' },
      { de:'Wir sind fertig, {name}! Das ist schon Glück. Jetzt machen wir es noch glücklicher.',
        ru:'Мы закончили, {name}! Это уже удача. Теперь сделаем ещё удачливее.',
        en:'We finished, {name}! That’s lucky already. Now let’s make it luckier.' }
    ],
    low: [
      { de:'Du brauchst mehr Glück und ganz viel mehr Übung, {name}!',
        ru:'Тебе нужно больше удачи и гораздо больше практики, {name}!',
        en:'You need more luck, and lots more practice, {name}!' },
      { de:'Magie, Glück, üben, üben, üben, {name}!',
        ru:'Магия, удача, практика, практика, практика, {name}!',
        en:'Magic, luck, practice, practice, practice, {name}!' },
      { de:'Das war nicht sehr glücklich, {name}. Komm, wir schütteln das Glück wieder rein!',
        ru:'Это было не очень удачно, {name}. Давай встряхнём удачу обратно!',
        en:'That wasn’t very lucky, {name}. Come on — we’ll shake the luck back into it!' }
    ],
    nudge: [
      { de:'Komm, {name}! Ein Spiel ist nur Glück, das auf uns wartet. Lass uns welches sammeln.',
        ru:'Давай, {name}! Игра — это просто удача, которая нас ждёт. Пойдём соберём.',
        en:"Come on, {name}! A game is just luck waiting for us. Let's go collect some." }
    ],
    welcome: [
      { de:'Du bist wieder da, {name}! Ich hab dir ein bisschen Glück aufgehoben. Verschwend es nicht.',
        ru:'Ты снова здесь, {name}! Я приберегла тебе немного удачи. Не растрать.',
        en:"You're back, {name}! I saved you a little luck. Don't waste it." }
    ],
    newpack: [
      { de:'Frisches Pack, {name}! Neues Glück. Lass es uns holen.',
        ru:'Свежий набор, {name}! Новая удача. Пойдём соберём.',
        en:"Fresh pack, {name}! New luck. Let's go collect it." }
    ]
  },

  /* p15 — Noir the Black Panther Ninja · der Panther

     Slightly menacing throughout: praise is rare, and even praise sounds
     like a warning. */
  p15: {
    perfect: [
      { de:'Perfekt, {name}. Gut gemacht. Ich lasse dich leben… vorerst.',
        ru:'Идеально, {name}. Молодец. Пока что я позволю тебе жить.',
        en:'Perfect, {name}. Well done. I will let you live… for now.' },
      { de:'Das war perfekt, {name}. Jetzt mach das wieder. Jedes Mal.',
        ru:'Ты была идеальна, {name}. Теперь делай так снова. Каждый раз.',
        ruM:'Ты был идеален, {name}. Теперь делай так снова. Каждый раз.',
        en:'You were perfect, {name}. Now do that again. Every time.' },
      { de:'Perfektion, {name}.',
        ru:'Совершенство, {name}.',
        en:'Perfection, {name}.' }
    ],
    high: [
      { de:'Nicht perfekt, {name}. Gut ist nicht gut genug. Mach es besser.',
        ru:'Не идеально, {name}. Хорошо — недостаточно. Сделай лучше.',
        en:'Not perfect, {name}. Good is not good enough. Do better.' },
      { de:'Du glaubst, du hast Können, {name}. Fast perfekt ist wie fast eine Schlacht überleben.',
        ru:'Ты думаешь, у тебя есть навык, {name}. Почти идеально — как почти выжить в бою.',
        en:'You think you have skills, {name}. Almost perfect is like almost surviving a battle.' },
      { de:'Du hast einiges verfehlt, {name}. Mehr Übung. Du bist nicht bereit.',
        ru:'Ты что-то пропустила, {name}. Больше практики. Ты не готова.',
        ruM:'Ты что-то пропустил, {name}. Больше практики. Ты не готов.',
        en:'You missed some, {name}. More practice. You are not ready.' }
    ],
    mid: [
      { de:'Du bist fertig, {name}. Das räume ich ein. Du brauchst trotzdem viel mehr Übung.',
        ru:'Ты закончила, {name}. Это я признаю. Но тебе ещё очень нужна практика.',
        ruM:'Ты закончил, {name}. Это я признаю. Но тебе ещё очень нужна практика.',
        en:'You finished, {name}. I will grant you that. You still need a lot more practice.' },
      { de:'Du bist nicht bereit, {name}. Geh zurück und übe mehr.',
        ru:'Ты не готова, {name}. Иди назад и тренируйся больше.',
        ruM:'Ты не готов, {name}. Иди назад и тренируйся больше.',
        en:'You are not ready, {name}. Go back and practice more.' },
      { de:'Überleben ist kein Sieg, {name}. Versuch es noch einmal.',
        ru:'Выживание — это не победа, {name}. Попробуй снова.',
        en:'Survival is not victory, {name}. Try again.' }
    ],
    low: [
      { de:'Dein Mangel an Können ist notiert, {name}. Mach es besser, wenn du leben willst.',
        ru:'Твой недостаток навыка отмечен, {name}. Сделай лучше, если хочешь жить.',
        en:'Your lack of skill is noted, {name}. Do better if you want to live.' },
      { de:'Zufällig Antworten zu treffen verdient keinen Respekt, {name}.',
        ru:'Случайно попадать в ответы уважения не заслуживает, {name}.',
        en:'Randomly hitting answers is not worthy of respect, {name}.' },
      { de:'Das war keine Schlacht, {name}. Das war ein Fehler.',
        ru:'Это был не бой, {name}. Это была ошибка.',
        en:'This was not a battle, {name}. This was a mistake.' }
    ],
    nudge: [
      { de:'Fang an, {name}. Eine Lektion ist eine Schlacht, die du noch gewinnen kannst. Ich werde zusehen.',
        ru:'Начинай, {name}. Урок — это бой, который ты ещё можешь выиграть. Я буду смотреть.',
        en:'Begin, {name}. A lesson is a battle you can still win. I will watch.' }
    ],
    welcome: [
      { de:'Du bist zurück, {name}. Gut. Die Lektion verzeiht keine Abwesenheit. Fang an.',
        ru:'Ты вернулась, {name}. Хорошо. Урок не прощает отсутствия. Начинай.',
        ruM:'Ты вернулся, {name}. Хорошо. Урок не прощает отсутствия. Начинай.',
        en:'You returned, {name}. Good. The lesson does not forgive absence. Begin.' }
    ],
    newpack: [
      { de:'Ein neues Set, {name}. Behandel es wie den ersten Schlag. Ich werde zusehen.',
        ru:'Новый набор, {name}. Отнесись к нему как к первому удару. Я буду смотреть.',
        en:'A new set, {name}. Treat it like a first strike. I will watch.' }
    ]
  },

  /* p16 — Ember the Baby Phoenix · der Phönix */
  p16: {
    perfect: [
      { de:'{name}! Das war Feuer. Ich hab mich erhoben, nur weil ich zugesehen habe.',
        ru:'{name}! Это был огонь. Я сама взлетела, просто глядя на тебя.',
        en:'{name}! That was fire. I felt myself rise just watching you.' },
      { de:'Zugabe, {name}. Dieses Ergebnis ist auferstanden und hat den ganzen Raum gestohlen.',
        ru:'Бис, {name}. Этот результат воскрес и украл всю комнату.',
        en:'Encore, {name}. That score came back to life and stole the room.' }
    ],
    high: [
      { de:'Heiß, {name}. Fast ein volles Feuer. Noch ein Funke, und ich bin in der Luft.',
        ru:'Жарко, {name}. Почти полный пожар. Ещё одна искра — и я в воздухе.',
        en:'Hot, {name}. Almost a full blaze. One more spark and I’m in the air.' },
      { de:'So nah, dass ich aufgeflammt bin, {name}. Lass mich nicht auf halbem Weg.',
        ru:'Так близко, что я вспыхнула, {name}. Не оставляй меня на полпути.',
        en:'So close I flared, {name}. Don’t leave me half-risen.' }
    ],
    mid: [
      { de:'Du hast das Lied zu Ende gebracht, {name}. Dem Schluss fehlt noch Hitze.',
        ru:'Ты допела песню, {name}. Концовке всё ещё мало жара.',
        ruM:'Ты допел песню, {name}. Концовке всё ещё мало жара.',
        en:'You finished the song, {name}. The ending still needs more heat.' }
    ],
    low: [
      { de:'Asche, {name}. Ist gut. Wir bleiben nicht liegen. Wir brennen noch einmal.',
        ru:'Пепел, {name}. Нормально. Мы не остаёмся на земле. Мы горим снова.',
        en:'Ash, {name}. That’s fine. We don’t stay down. We burn again.' }
    ],
    nudge: [
      { de:'Auf, {name}. Eine neue Lektion ist ein neues Feuer. Wir starten heiß.',
        ru:'Вверх, {name}. Новый урок — новый огонь. Начинаем с жара.',
        en:'Up, {name}. A new lesson is a new fire. We start hot.' }
    ],
    welcome: [
      { de:'Da bist du, {name}. Das Feuer hat gewartet. Wir erheben uns wieder.',
        ru:'Вот и ты, {name}. Огонь ждал. Мы снова поднимаемся.',
        en:'There you are, {name}. The fire waited. We rise again.' }
    ],
    newpack: [
      { de:'Neues Feuer, {name}. Neues Pack. Wir starten heiß.',
        ru:'Новый огонь, {name}. Новый набор. Начинаем с жара.',
        en:'New fire, {name}. New pack. We start hot.' }
    ]
  }

};

/* The shape
 of one line, for reference when filling this in:

     { de:'Das war stark.', ru:'Это было сильно.', en:'That was strong.' }

   With a name and a masculine Russian, where the line needs them:

     { de:'Gut gemacht, {name}.',
       ru:'Молодец, {name}. Ты была готова.',
       ruM:'Молодец, {name}. Ты был готов.',
       en:'Well done, {name}.' }

   So a filled band looks like:

     perfect: [
       { de:'…', ru:'…', en:'…' },
       { de:'…', ru:'…', en:'…' },
       { de:'…', ru:'…', en:'…' }
     ],
*/
