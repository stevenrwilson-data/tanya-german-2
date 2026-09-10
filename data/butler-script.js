/* data/butler-script.js */
/* data/butler-script.js

   THIS FILE IS YOURS. Every word the butler says comes from here, and I
   have not written any of them. The shape is set up and annotated; the
   voice is not mine to supply.

   ------------------------------------------------------------------
   03 SEP — THE QUICK TOUR, LOCKED IN ENGLISH

   Every line below is your own text from the GPT draft, placed into the
   engine exactly the way you specced it in the last revision: Waddles
   never teleports her anywhere. He takes her to the edge of a section,
   explains it, and then she presses the REAL control herself — the
   Progress tile, Back, the crystal icon, Back again. By the time he says
   goodbye she has actually used every one of those controls, not just
   been told they exist.

   `{ en:'...', ru:'', de:'' }` on every real line, on purpose — empty
   ru/de is what "not translated yet" looks like in this file, and `say()`
   falls back to English until you fill them in. Nothing to fix here
   before that happens; the tour runs in English for everyone until it
   doesn't.

   TWO THINGS I FILLED IN THAT ARE MINE TO FLAG, NOT YOURS TO HAVE WRITTEN:

     1  bonusGame / bonus:15 on the closing three choices. You wrote "I'll
        give you an extra bonus" with no number. 15 is a guess — half of
        one exercise. Change the number in the three `choices` entries
        below, search for `bonus:15`.

     2  "Full Tour" is missing on purpose. Your script only ever wrote the
        quick one. The offer screen below has ONE tour button plus "Let Me
        Explore" — not the three-button screen 2 from your draft — because
        `due()` only turns a tour into a button once it has steps, and a
        Full Tour with no steps would be a button that does nothing. Add a
        second entry to `tours` below, in the same shape, whenever you
        write it, and the button appears on its own — nothing else changes.

   ------------------------------------------------------------------
   THE HANDS-ON MECHANIC, FOR WHEN YOU EDIT THIS

   A step with `tap:true` lights up a real control and WAITS for her to
   press it — no Next button of its own. `points:'.backlink'` is how a
   step says "and now she presses Back herself"; the tour reappears on
   whatever screen that leaves her on. `points:'#sec-gamesHead'` with no
   `tap` just shows her something without asking her to press it — used
   for the sections that have no button to walk her onto.

   The closing step is a different shape: `choices`, not `line` + Next.
   Each one promises a bonus for FINISHING whatever she lands near — the
   promise survives the trip through `GH.coins.setStarterBonus()` and pays
   itself the next time she finishes a round of the matching kind.

   ------------------------------------------------------------------
   EVERY LINE TAKES EITHER FORM

       line: 'Willkommen.'

       line: { de:'Willkommen.', ru:'Добро пожаловать.', en:'Welcome.' }

   A plain string is used as-is in every language, which is right for a
   name. An object picks by her interface language and falls back to
   English then German if one is missing — so a half-translated script
   still works.
*/

window.GH_BUTLER = {

  /* His name, and his picture. Both optional; without a picture the bubble
     still works and he is just a name. */
  name: 'Waddles',
  portrait: 'images/pets/waddles.webp',

  /* The corner perch button (js/butler.js, perch()) is 30x40 — the full
     standing portrait above, shrunk that far down and cropped to `contain`,
     reads as a smudge more than a face. `perchFace` is a separate, tighter
     close-up crop meant specifically for that size; falls back to
     `portrait` when not set, so leaving this blank is a normal state, not
     a broken one. */
  perchFace: '',

  /* Button labels used throughout a tour. */
  nextLabel: { en:'Continue', ru:'Продолжить', de:'Weiter' },
  /* All three are OBJECTS. `say()` handles strings too, so this was safe
     to change, but `nextLabel` had one raw read left — butler.js line 416
     used it as a bare `||` fallback and would have printed an object.
     That call now wraps it in `say()` like every other. */
  doneLabel: { en:'Off you go!', ru:'Вперёд!', de:'Los geht\u2019s!' },
  stopLabel: { en:"That's enough for now", ru:'На сегодня хватит', de:'Das reicht fürs Erste' },
  /* DELETED, not translated. `butler.js` reads
     `say(script().perchLabel) || t('btPerch')`, and a non-empty raw
     English string here always won — so the already-translated `btPerch`
     ("Позвать помощника" / "Den Helfer rufen") was never reached and the
     perch's aria-label was English in every language. Empty means it
     falls through to the i18n key, which is the translated one. */
  perchLabel: '',

  /* ------------------------------------------------------------------
     THE FIRST THING SHE EVER SEES

     Two screens, per your revision: a short hello with one button, THEN
     the real question. `hello` is optional — leave it empty and the
     offer opens straight on `line`, which is how this behaved before
     today. */
  offer: {
    /* Russian is the same in both genders here — nothing in this line is
       past tense — so no `ruM` is needed. */
    hello: { en:'Ah, there you are. Welcome! I’m Waddles. It’s my job to help you get settled in.', ru:'А, вот ты где. Добро пожаловать! Я Уоддлс. Моя задача — помочь тебе здесь освоиться.', de:'Ah, da bist du ja. Willkommen! Ich bin Waddles. Meine Aufgabe ist es, dir zu helfen, dich hier zurechtzufinden.' },
    helloOk: { en:'Hi, Waddles!', ru:'Привет, Уоддлс!', de:'Hallo, Waddles!' },

    /* GENDERED: сам against сама. Steven collapsed this to one paragraph
       on 07 Sep — it was three — so no \n\n here any more. */
    line: { en:'Lovely to meet you. There’s quite a lot to see around here. I’d be happy to show you around—or, if you prefer, you may explore on your own. What shall we do?', ru:'Очень приятно познакомиться. Здесь довольно много всего интересного. Я с удовольствием всё тебе покажу — или, если хочешь, можешь осмотреться сама. Что будем делать?', ruM:'Очень приятно познакомиться. Здесь довольно много всего интересного. Я с удовольствием всё тебе покажу — или, если хочешь, можешь осмотреться сам. Что будем делать?', de:'Schön, dich kennenzulernen. Hier gibt es ziemlich viel zu entdecken. Ich zeige dir gerne alles – oder du kannst dich auch selbst umsehen. Was möchtest du machen?' },

    /* GENDERED too: самому against самой. */
    no:   { en:'Let Me Explore', ru:'Осмотреться самой', ruM:'Осмотреться самому', de:'Selbst erkunden' }
  },

  /* ------------------------------------------------------------------
     SHE SAID NO. ONE FOLLOW-UP, THEN NEVER AGAIN.

     Left empty on purpose — you have not written a refusal line, and an
     invented one is worse than none. Empty here means the refusal is
     simply final, no follow-up asked, which the engine already handles. */
  refuse: {
    line: '',
    yes:  '',     /* "Yes, come back later" */
    no:   ''      /* "No, I will find you if I need you" */
  },

  /* ------------------------------------------------------------------
     THE TOURS */
  tours: [
    {
      id: 'quick',
      label: { en:'Quick Tour', ru:'Краткий тур', de:'Kurze Tour' },
      /* Never reached — the tour ends on a `choices` step, which closes
         itself. Kept filled in anyway as a safety net for any tour that
         ends the ordinary way. */
      /* The last button of the tour, on the goodbye step. Steven, 08 Sep:
         "Let's go!" rather than "Off you go". */
      finish: { en:'Let\u2019s go!', ru:'Вперёд!', de:'Los geht\u2019s!' },
      /* NO `go`. The tour now ends on the activity she chose, so sending
         her to the hub would undo her own choice. `finish()` navigates
         only when `go` is set. */

      steps: [
        /* ---------- 1. the table of contents ---------- */
        { line: { en:'Excellent choice — I’ll be quick.\n\nThis is the Jump Bar. Tap any button to go straight to that part of the site, or tap TOC to see everything at once.', ru:'Отличный выбор — я буду краток.\n\nЭто Панель переходов. Нажми любую кнопку, чтобы сразу перейти к нужному разделу, или ОГЛ — чтобы увидеть всё сразу.', de:'Ausgezeichnete Wahl — ich mache es kurz.\n\nDas ist die Sprungleiste. Tippe auf eine Taste, um direkt zu diesem Bereich zu springen, oder auf TOC, um alles auf einmal zu sehen.' },
          points: '.jumpbar' },

        /* ---------- 2. progress ---------- */
        /* 2a. She gets there herself. The jumpbar pill only scrolls, so no
           screen repaints — `waitForPaint()`'s 700ms deadline draws the next
           step where she now is. Labels named in the line are the real UI
           labels: refHead is Reference / Nachschlagen / Справочник. */
        { line: { en:'Next, let’s look at your Progress.\n\nTap Reference on the Jump Bar to jump down to that section.', ru:'Теперь посмотрим твой прогресс.\n\nНажми Справочник на Панели переходов, чтобы перейти к этому разделу.', de:'Als Nächstes sehen wir uns deinen Fortschritt an.\n\nTippe auf Nachschlagen in der Sprungleiste, um zu diesem Bereich zu springen.' },
          points: '[data-jump="refHead"]', tap: true },

        { line: { en:'This is your Progress.\n\nIt keeps track of what’s settled in and what’s still due for another look.', ru:'Это твой Прогресс.\n\nЗдесь видно, над чем ты работала — что закрепилось, а к чему стоит вернуться.', ruM:'Это твой Прогресс.\n\nЗдесь видно, над чем ты работал — что закрепилось, а к чему стоит вернуться.', de:'Das ist dein Fortschritt.\n\nHier siehst du, was schon sitzt und was du dir noch einmal ansehen solltest.' },
          points: '[data-tile="progress-view"]', tap: true },

        { line: { en:'Have a look around, then use the Back button when you’re ready. I’ll be waiting for you.', ru:'Осмотрись, а когда захочешь продолжить, нажми «Назад». Я буду ждать тебя.', de:'Sieh dich ruhig um und tippe dann auf Zurück, wenn du weitermachen möchtest. Ich warte auf dich.' },
          points: '.backlink', tap: true },

        /* ---------- 3. achievements ---------- */
        { line: { en:'And here are your Achievements. They’re earned as you learn, practise, and explore the site — and some of them come with rewards. I’m rather fond of those.', ru:'А вот и твои Достижения. Ты получаешь их, пока учишься, практикуешься и исследуешь сайт — а за некоторые ещё и полагаются награды. Вот это мне особенно нравится.', de:'Und hier sind deine Erfolge. Du erhältst sie, während du lernst, übst und die Seite erkundest — und für manche gibt es sogar Belohnungen. Die gefallen mir ganz besonders.' },
          points: '[data-tile="awards-view"]', tap: true },

        { line: { en:'Have a look, then tap Back when you’re ready.', ru:'Осмотрись, а когда захочешь продолжить, нажми «Назад».', de:'Sieh dich ruhig um und tippe dann auf Zurück, wenn du weitermachen möchtest.' },
          points: '.backlink', tap: true },

        /* ---------- 4. games ---------- */
        /* 4a. SHE GETS HERSELF THERE, same as Reference above. Without this
           step the Games line was spoken while the page was still parked at
           the Reference section, so she had to hunt for what he was talking
           about. The pill is also the lesson: Games on the Jump Bar is a
           shortcut she can use again, not the page moving by itself.
           Labels named in the line are the real ones: gamesHead is
           Games / Spiele / Игры. */
        { line: { en:'Next, let’s look at the games.\n\nTap Games on the Jump Bar to jump down to them.', ru:'Теперь посмотрим игры.\n\nНажми Игры на Панели переходов, чтобы перейти к ним.', de:'Als Nächstes sehen wir uns die Spiele an.\n\nTippe auf Spiele in der Sprungleiste, um zu ihnen zu springen.' },
          points: '[data-jump="gamesHead"]', tap: true },

        { line: { en:'And here are the games. They’re another way to practise what you’re learning — and there are quite a few to choose from.', ru:'А вот и Игры. Это ещё один способ потренировать то, что ты учишь, — и выбирать есть из чего.', de:'Und hier sind die Spiele. Sie sind eine weitere Möglichkeit, das zu üben, was du gerade lernst — und es gibt ziemlich viele zur Auswahl.' },
          points: '#sec-gamesHead' },

        { line: { en:'If you’d like, I can explain what each game does.', ru:'Если хочешь, я могу объяснить, как работает каждая игра.', de:'Wenn du möchtest, kann ich dir erklären, wie jedes Spiel funktioniert.' },
          points: '.gd-open', tap: true },

        { line: { en:'Have a look through, then tap Back when you’re ready.', ru:'Посмотри всё как следует, а когда захочешь продолжить, нажми «Назад».', de:'Sieh dich in Ruhe um und tippe dann auf Zurück, wenn du weitermachen möchtest.' },
          points: '.backlink', tap: true },

        /* ---------- 5. back to the top, then currency ---------- */
        /* 5a. The ↑ pill, taught rather than left sitting there unexplained.
           She comes back from the game guide parked at the Games section,
           and the purse she is about to be sent to lives in the header at
           the very top of the page. Same shape as the Reference and Games
           pills: she does the scrolling, and learns the control doing it.
           `.jump.is-up` is created in app.js (~line 305). */
        { line: { en:'Back from the games?\n\nTap this button to jump back to the top of the page.', ru:'Вернулась из игр?\n\nНажми эту кнопку, чтобы вернуться к началу страницы.', ruM:'Вернулся из игр?\n\nНажми эту кнопку, чтобы вернуться к началу страницы.', de:'Zurück von den Spielen?\n\nTippe auf diese Taste, um wieder an den Anfang der Seite zu springen.' },
          points: '.jump.is-up', tap: true },

        /* ---------- 6. the table of contents, the real one ---------- */
        /* `.toc-toggle` is the button beside the filter toggle at the top of
           the hub (app.js ~line 166) — NOT `.jump.is-toc`, the TOC pill in
           the jumpbar. Two different controls with the same label. She has
           just used ↑ to come back to the top, so the top one is the one in
           front of her. It launches a real screen with `hub` as its way
           back, so `.backlink` exists on the next step. */
        { line: { en:'Now that we’re back at the top, tap Table of Contents to have a look at the full site guide.', ru:'Теперь, когда мы снова наверху, нажми Оглавление, чтобы посмотреть полный путеводитель по сайту.', de:'Jetzt, wo wir wieder ganz oben sind, tippe auf Inhaltsverzeichnis, um dir den vollständigen Wegweiser durch die Seite anzusehen.' },
          points: '.toc-toggle', tap: true },

        { line: { en:'This is the full Table of Contents. You can see everything on the site and jump straight to it from here. The Full Tour explains this page in more detail.\n\nHave a look, then tap Back when you’re ready.', ru:'Это полное Оглавление. Здесь ты можешь увидеть всё, что есть на сайте, и сразу перейти куда нужно. В полной экскурсии эта страница объясняется подробнее.\n\nОсмотрись, а когда будешь готова, нажми «Назад».', ruM:'Это полное Оглавление. Здесь ты можешь увидеть всё, что есть на сайте, и сразу перейти куда нужно. В полной экскурсии эта страница объясняется подробнее.\n\nОсмотрись, а когда будешь готов, нажми «Назад».', de:'Das ist das vollständige Inhaltsverzeichnis. Hier siehst du alles auf der Seite und kannst direkt dorthin springen. In der ausführlichen Tour wird diese Seite genauer erklärt.\n\nSchau dich um und tippe auf Zurück, wenn du bereit bist.' },
          points: '.backlink', tap: true },

        /* ---------- 7. currency, demonstrated ---------- */
        { line: { en:'You earn crystals by completing activities. Here are 10 to get you started. Tap the crystal icon to see your balance.', ru:'За выполненные задания ты получаешь кристаллы. Вот 10 для начала. Нажми на значок кристалла, чтобы увидеть свой баланс.', de:'Für abgeschlossene Aktivitäten bekommst du Kristalle. Hier sind 10 zum Start. Tippe auf das Kristallsymbol, um deinen Kontostand zu sehen.' },
          points: '.purse', tap: true, gift: 10 },

        /* ---------- 6. the crystals section, then the store ---------- */
        /* The store used to be spoken about here with nothing having opened
           it, and `.backlink` does not exist on the hub, so the step named
           a place she was not in and highlighted nothing. Two stops added
           08 Sep so she walks the real route: popover → Crystals → Store.

           `.purse-pop-go` is the "Go to Crystals" button inside the purse
           popover (purse.js). Its de/ru were empty until today — see the
           note on TXT there. */
        { line: { en:'Here’s your crystal balance.\n\nTap Go to Crystals to open the Crystals section.', ru:'Вот твой баланс кристаллов.\n\nНажми «К кристаллам», чтобы открыть раздел «Кристаллы».', de:'Hier ist dein Kristallstand.\n\nTippe auf Zu den Kristallen, um den Bereich Kristalle zu öffnen.' },
          points: '.purse-pop-go', tap: true },

        /* `.cr-store` (crystals.js) is labelled "Spend them in the store" /
           "Im Shop ausgeben" / "Потратить их в магазине". The line names it
           by that label, not "Store", so the words she reads and the words
           on the button are the same. */
        { line: { en:'This is your Crystals page.\n\nTap Spend them in the store to visit the Store.', ru:'Это твоя страница кристаллов.\n\nНажми Потратить в магазине, чтобы открыть Магазин.', de:'Das ist deine Kristallseite.\n\nTippe auf Im Shop ausgeben, um den Shop zu öffnen.' },
          points: '.cr-store', tap: true },

        { line: { en:'Ah, the Store.\n\nThis is where you can spend your crystals and adopt pets. Some pets take longer to unlock than others.\n\nHave a look around, then use Back when you’re ready.', ru:'А, Магазин.\n\nЗдесь ты можешь тратить кристаллы и брать питомцев. Некоторые питомцы открываются дольше, чем другие.\n\nОсмотрись, а когда будешь готова, нажми «Назад».', ruM:'А, Магазин.\n\nЗдесь ты можешь тратить кристаллы и брать питомцев. Некоторые питомцы открываются дольше, чем другие.\n\nОсмотрись, а когда будешь готов, нажми «Назад».', de:'Ah, der Shop.\n\nHier kannst du deine Kristalle ausgeben und Haustiere adoptieren. Manche Haustiere brauchen länger zum Freischalten als andere.\n\nSchau dich um und benutze dann Zurück, wenn du bereit bist.' },
          points: '.backlink', tap: true },

        /* ---------- 7. back at the top, and a real choice ---------- */
        { line: { en:'And that concludes our quick tour.\n\nYou’re ready to start practising. Complete five activities in a day and it counts as a full day of learning — and you’ll earn a bonus.\n\nBut since you’ve been such an attentive guest, I have one more offer.\n\nChoose where you’d like to begin below. Finish it, and I’ll give you an extra bonus.', ru:'Вот и всё — наш краткий тур закончен.\n\nТеперь можно начинать заниматься. Выполни пять активностей за день — это засчитается как полный день обучения, и ты получишь бонус.\n\nНо раз ты была такой внимательной гостьей, у меня есть для тебя ещё одно предложение.\n\nВыбери ниже, с чего хочешь начать. Заверши выбранное занятие — и я дам тебе дополнительный бонус.', ruM:'Вот и всё — наш краткий тур закончен.\n\nТеперь можно начинать заниматься. Выполни пять активностей за день — это засчитается как полный день обучения, и ты получишь бонус.\n\nНо раз ты был таким внимательным гостем, у меня есть для тебя ещё одно предложение.\n\nВыбери ниже, с чего хочешь начать. Заверши выбранное занятие — и я дам тебе дополнительный бонус.', de:'Und damit ist unsere kurze Tour beendet.\n\nJetzt kannst du mit dem Üben loslegen. Schließe an einem Tag fünf Aktivitäten ab, dann zählt er als voller Lerntag — und du bekommst einen Bonus.\n\nAber weil du so aufmerksam dabei warst, habe ich noch ein Angebot für dich.\n\nWähle unten aus, womit du anfangen möchtest. Schließe die gewählte Aktivität ab, und ich gebe dir einen zusätzlichen Bonus.' },
          /* `picks`, NOT `choices`. `choices` is terminal — it writes
             `done`, closes and nulls `state`, so the tour cannot say
             anything after she has chosen. Steven's ending, 08 Sep, needs
             three more stops AFTER the choice: she arrives at the
             activity, is offered the Full Tour there, and if she declines
             is shown the perch before being left where she chose.

             So each option OPENS its activity and jumps to `after-pick`,
             and the tour carries on over the top of the activity she is
             now standing in.

             THE BONUS MOVED. `choices` set the starter bonus; `picks` has
             no such field, so the bonus is set on the `after-pick` step
             instead — see the note there. */
          /* BONUS KEYS ARE NOT ACTIVITY IDS. `bonusGame` is matched
             against what the activity passes to `coins.award()`, and for
             two of these three it is a different string from the id used
             to open it:

                 opened as        pays under
                 word-lab         wordlab      (wordlab.js line 2552)
                 listen-pick      listen       (listen-pick.js)
                 reader           reader       (the only one that matches)

             Bound to the id instead and the promised bonus would never
             have been claimable — she finishes the activity and is paid
             nothing. Checked against each file, not assumed. */
          picks: [
            { label: { en:'Learn Some Words', ru:'Выучить несколько слов', de:'Ein paar Wörter lernen' },
              activity: 'word-lab', to: 'after-pick', bonusGame: 'wordlab', bonus: 15 },
            { label: { en:'Play a Game', ru:'Сыграть в игру', de:'Ein Spiel spielen' },
              activity: 'listen-pick', to: 'after-pick', bonusGame: 'listen', bonus: 15 },
            { label: { en:'Read a Short Story', ru:'Прочитать короткую историю', de:'Eine kurze Geschichte lesen' },
              activity: 'reader', to: 'after-pick', bonusGame: 'reader', bonus: 15 }
          ]
        },

        /* SHE IS NOW STANDING IN WHATEVER SHE CHOSE. Two ways on: start
           the activity, or take the Full Tour instead.

           `tour:'full'` ends this tour and starts that one immediately —
           the field added to butler.js for exactly this. The other option
           carries her to `bye`, where the perch is shown before the
           bubble closes and leaves her on the activity. */
        { at: 'after-pick',
          line: { en:'You’re ready to start! You can do the activity you chose now, or take the Full Tour if you’d like to learn more about the site.', ru:'Ты можешь начинать! Выполни выбранное задание или пройди полную экскурсию, если хочешь узнать больше о сайте.', de:'Du kannst jetzt loslegen! Mach die ausgewählte Aktivität oder nimm an der vollständigen Tour teil, wenn du noch mehr über die Seite erfahren möchtest.' },
          picks: [
            { label: { en:'Do the Activity', ru:'Начать задание', de:'Aktivität starten' }, to: 'bye' },
            { label: { en:'Take the Full Tour', ru:'Полная экскурсия', de:'Vollständige Tour' }, tour: 'full' }
          ]
        },

        /* THE GOODBYE, and the one control the tour never taught. Ending
           here leaves her on the activity she picked rather than throwing
           her back to the hub — the tour's `go` was removed for this. */
        { at: 'bye',
          line: { en:'I’ll be here at the top of the screen whenever you need me. You can also come back and take the Full Tour anytime.', ru:'Я всегда буду здесь, вверху экрана, если понадоблюсь. Ты также можешь вернуться и пройти полную экскурсию в любое время.', de:'Du findest mich immer hier oben, wenn du mich brauchst. Du kannst auch jederzeit zurückkommen und die vollständige Tour machen.' },
          points: '.bt-perch' }
      ]
    },

    /* Written but empty — see the note at the top of this file. Add
       `steps` here and the button appears on the offer screen on its
       own; nothing else in the app needs to change. */
    {
      id: 'full',
      label: { en:'Full Tour', ru:'Полная экскурсия', de:'Vollständige Tour' },
      finish: { en:'', ru:'', de:'' },
      go: 'hub',

      /* ENGLISH ONLY WHILE THIS IS BEING BUILT. Steven: "English only
         while we build the Full Tour. We'll translate the entire
         finished script afterward." `say()` falls back to English when a
         language is empty, so an untranslated tour runs correctly in all
         three — it just speaks English. Same order the Quick Tour was
         built in. */
      steps: [
        /* ---------- opening ---------- */
        { line: { en:'Thank you for choosing the full tour. I\u2019ll show you around and point out what you can do here.', ru:'Спасибо, что выбрала полную экскурсию. Я покажу тебе сайт и расскажу, что здесь можно делать.', ruM:'Спасибо, что выбрал полную экскурсию. Я покажу тебе сайт и расскажу, что здесь можно делать.', de:'Danke, dass du dich für die vollständige Tour entschieden hast. Ich zeige dir die Seite und was du hier alles machen kannst.' } },

        /* ---------- 1. appearance ----------

           NO `tap: true` HERE, DELIBERATELY, and this is the one thing to
           get right about this step.

           `tap` arms the real control and then does `state.i++`,
           `waitForPaint()`, `close()`. It hands over and waits for the app
           to repaint, which `nav.ready()` reports on a screen change.
           Opening the theme panel changes no screen — but `waitForPaint()`
           has a 700ms fallback that calls `step()` regardless, so the tour
           is not LOST. It simply advances about two thirds of a second
           after she taps, which is worse: the bubble moves on before she
           has looked at the panel she was just told to open.

           A plain Next instead. The overlay is non-blocking —
           `pointer-events:none`, the dim is paint only — so the real
           control underneath is fully tappable while the bubble is up.
           She opens the panel, changes what she likes, and presses Next
           when she is done, which is the point: an instant advance would
           mean she never got to try anything.

           `points: '.pick'` and not `.pick-now`: `.bt-lit` gives the node
           `z-index:81`, above the overlay's 70, so lighting the WRAPPER
           lifts the opened panel out of the dim with it. Lighting just
           the trigger would leave the panel she is using greyed out. */
        { line: { en:'Let\u2019s start up here. Tap this button to choose the site\u2019s colors, fonts, and back-arrow style.', ru:'Начнём здесь, наверху. Нажми эту кнопку, чтобы выбрать цвета сайта, шрифты и стиль стрелки «Назад».', de:'Fangen wir hier oben an. Tippe auf diesen Button, um Farben, Schriftarten und den Stil des Zurück-Pfeils auszuwählen.' },
          points: '.pick' },

        /* ---------- 2. crystals ----------

           LIT BUT NOT ARMED, and not because of the panel mechanics this
           time: Steven is holding the Crystals screen back for its own
           stop later in the tour, so this one names the balance and moves
           on. "I wouldn't have her open it yet, because we're deliberately
           saving the actual Crystal section for later."

           She CAN still tap it — the overlay does not block — and that is
           fine. Nothing breaks, and the line does not invite her to. */
        { line: { en:'These are your Crystals. You earn them by learning and completing activities around the site. We\u2019ll come back to Crystals later in the tour.', ru:'Это твои кристаллы. Ты зарабатываешь их, когда учишься и выполняешь задания на сайте. Мы ещё вернёмся к кристаллам позже.', de:'Das sind deine Kristalle. Du verdienst sie, indem du lernst und Aktivitäten auf der Seite abschließt. Später in der Tour kommen wir noch einmal darauf zurück.' },
          points: '.purse' },

        /* ---------- 3. languages ----------

           The picker is a FULL-SCREEN MODAL — `.lg-wrap`, appended to
           body at `z-index:120` — not a panel in the header like the
           theme one. So it covers the bubble entirely while it is open,
           and she gets the tour back when she picks or cancels. Which is
           the right behaviour and the reason there is no `tap` here
           either: an armed tap would advance underneath the modal and she
           would come out of it a step further on than she expected.

           `.brand-mark` since 09 Sep. It was `.langswitch`, the wrapper
           around the `Рус → Нем` pill — and that pill is gone: the brand
           mark in the corner is the language switch now, and `#langswitch`
           is `hidden`, so this step would have lit nothing at all. */
        { line: { en:'You can also change the language you speak and the language you want to learn here.', ru:'Здесь ты также можешь изменить язык, на котором говоришь, и язык, который хочешь изучать.', de:'Hier kannst du auch die Sprache ändern, die du sprichst, und die Sprache, die du lernen möchtest.' },
          points: '.brand-mark' },

        /* ---------- 4. filter by topic ----------

           Opening the filter calls `hub()`, a full repaint of the hub.
           The bubble survives it — it lives in `.bt-overlay` on body, and
           nav.js's KEEP list protects `.bt-*` — but the `.bt-lit` outline
           does NOT, because the button itself is rebuilt. So the glow
           goes as soon as she opens the filter. That is acceptable: by
           then she is looking at the topic pills, not the button.

           No `tap` again, and here it matters most of the four. Steven
           wants her to actually choose a couple of topics and watch the
           content change — an armed tap would move the tour on the moment
           the filter opened, before she picked anything. */
        { line: { en:'You can filter activities by topic. Choose one or more topics, and the site will show you words, sentences, and stories related to what you chose. For example, choosing Weather and Kitchen gives you activities using those topics.', ru:'Ты можешь фильтровать задания по темам. Выбери одну или несколько тем, и сайт покажет тебе связанные с ними слова, предложения и истории. Например, выбрав «Погода» и «Кухня», ты получишь задания по этим темам.', de:'Du kannst Aktivitäten nach Themen filtern. Wähle ein oder mehrere Themen aus, und die Seite zeigt dir passende Wörter, Sätze und Geschichten. Wenn du zum Beispiel Wetter und Küche auswählst, bekommst du Aktivitäten zu diesen Themen.' },
          points: '.filter-toggle' },

        /* ---------- 5. table of contents ----------

           THE FIRST STOP THAT ARMS THE TAP, and the first that should:
           this one really does change screens. `.toc-toggle` opens the
           Table of Contents through `launch()`, the app repaints, and
           `nav.ready()` calls `resume()` — which is exactly what `tap`
           was built for. The four stops before it all deliberately do
           NOT arm, because none of them leaves the hub.

           `.toc-toggle` and not `.filter-toggle`: the button carries both
           classes, and `.filter-toggle` would match the filter button
           first since that one is built first. `.toc-toggle` is only on
           this one.

           WHICH OF THE TWO BUTTONS: this points at the one in the filter
           row, not the pill in the jumpbar — the full-label one, above
           the row, which is the one Steven's line describes first before
           telling her the short TOC pill goes to the same place. */
        { line: { en:'The Table of Contents shows you everything on the site and where to find it. You\u2019ll also see a TOC button as you move around the site. It takes you to this same Table of Contents.', ru:'Оглавление показывает всё, что есть на сайте, и где это найти. Перемещаясь по сайту, ты также будешь видеть кнопку TOC. Она открывает это же оглавление.', de:'Das Inhaltsverzeichnis zeigt dir alles auf der Seite und wo du es findest. Während du dich durch die Seite bewegst, siehst du auch einen TOC-Button. Er führt dich zu diesem selben Inhaltsverzeichnis.' },
          points: '.toc-toggle', tap: true },

        /* `.toc-jump` is ALREADY the class of exactly these four rows and
           nothing else — toc.js gives a row `toc-jump` when its kind is
           `jump`, `toc-row` otherwise, and only the four numbered
           sections are jumps. No new class needed. */
        /* A TAP STEP NOW, AND A WAY BACK AFTER IT.

           These pills were highlighted as a read step, but `toc.js`'s
           `jumpTo()` calls `state.onExit()` — tapping one throws her out
           of the contents to the hub section. So a ringed button whose
           whole job is to leave sat in the middle of a run that carried
           on describing the contents. Steven hit it, 09 Sep.

           Rather than ring it and ask her not to press it, the tour now
           uses it: she jumps out on purpose, and the next step points at
           the TOC pill in the jumpbar to bring her back. Both controls
           get taught and nothing is a trap.

           `.jump.is-toc` is the recovery target rather than `.toc-toggle`
           because the jumpbar is `position:sticky` — the pill is on
           screen at any scroll depth, and the filter-row button she used
           on step 5 has scrolled away by the time she lands in a section.
           Steven: "the TOC button is on the jump bar that moves down,
           always visible on the top level." */
        { line: { en:'At the top are the four main learning sections. Here you can practise with sentences, short stories, vocabulary, and longer stories.\n\nTap one and it takes you straight there.', ru:'Вверху находятся четыре основных учебных раздела. Здесь ты будешь заниматься с предложениями, короткими рассказами, лексикой и более длинными историями.\n\nНажми на любой — и он сразу тебя туда перенесёт.', de:'Oben findest du die vier Hauptbereiche zum Lernen. Hier übst du mit Sätzen, kurzen Geschichten, Wortschatz und längeren Geschichten.\n\nTippe auf einen, und er bringt dich direkt dorthin.' },
          points: '.toc-jump', tap: true },

        /* STEVEN'S SCRIPT, verbatim. He supplied this line for exactly this
           situation — back has not reached the contents, so she uses the
           TOC button instead — and it replaces a draft of mine, 09 Sep.

           His text carried `[]` where the button's name goes, because the
           label differs per language. It is `tocShort`: TOC, IV, ОГЛ.
           Filled in below.

           Gender-neutral in Russian, so no `ruM` twin: «нажми» and
           «вернуться» do not inflect for the listener. */
        { line: { en:'Now, hit the TOC button at the top of the screen to get back to the Table of Contents.', ru:'Теперь нажми кнопку ОГЛ вверху экрана, чтобы вернуться к содержанию.', de:'Drück jetzt oben auf dem Bildschirm auf den IV-Button, um zurück zum Inhaltsverzeichnis zu kommen.' },
          points: '.jump.is-toc', tap: true },

        /* NOT armed. Tapping the Lessons heading expands the group and
           the tour would move on before she read anything; the line only
           describes what is inside. The overlay is `pointer-events:none`,
           so she can still open it herself. */
        { line: { en:'Lessons includes Word Lab and grammar lessons. They explain new material and then give you activities to practise what you have learned.', ru:'В разделе «Уроки» находятся Word Lab и уроки грамматики. Сначала они объясняют новый материал, а затем дают тебе возможность его потренировать.', de:'Unter Lektionen findest du Word Lab und Grammatiklektionen. Sie erklären dir etwas Neues und geben dir anschließend Übungen dazu.' },
          points: '[data-toc-group="lessons"]' },

        /* ---------- 6. open Read and listen ----------

           NEEDED BEFORE "Tap Songs" CAN WORK, and it is a mechanical
           requirement rather than a design choice.

           The Table of Contents arrives with EVERY GROUP CLOSED, which is
           deliberate — it shows its contents, not one group's worth of
           detail. So the Songs row is not in the DOM at all until the
           Read and listen group is opened. `highlight()` returns false
           for a selector it cannot find and a `tap` step then falls back
           to a plain Next, so "Tap Songs" on a closed group would show a
           bubble pointing at nothing.

           `tap: true` works here even though nothing navigates: opening a
           group repaints the Table of Contents, and `waitForPaint()`'s
           700ms fallback advances the tour. Which is what is wanted — she
           opens the group and the instruction changes to the next thing. */
        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        /* ---------- 7. songs ----------

           `[data-toc="songs"]` — the row's own id, which the Table of
           Contents did not expose until now. Every row was `.toc-row` and
           nothing distinguished Songs from the other ninety, so a step
           could not name one; rows and group headings both carry an id
           attribute now. `songs` is the songbook's registered id. */
        { line: { en:'Let\u2019s look at Songs next. Tap Songs.', ru:'Теперь посмотрим Песни. Нажми Песни.', de:'Sehen wir uns als Nächstes die Lieder an. Tippe auf Lieder.' },
          points: '[data-toc="songs"]', tap: true },

        /* ---------- 8. pick a song ----------

           The tiles are plain `.tile` buttons, so this points at the grid
           that holds them rather than at one song — she chooses, not the
           tour. Tapping a tile repaints inside the songbook, and the
           700ms fallback carries the tour to the next step. */
        { line: { en:'Pick a song to take a closer look.', ru:'Выбери песню, которую хочешь рассмотреть подробнее.', de:'Wähle ein Lied aus, das du dir genauer ansehen möchtest.' },
          /* `.sg-songlist`, not `.tiles`. The song view holds SEVERAL `.tiles`
             grids — a fresh one starts after each paired-song box — and
             `butler.js` highlights and arms the FIRST match only, so just the
             top group lit up and only a tile in it advanced the tour. The
             wrapper added to songbook.js on 09 Sep covers every song, and a
             tap on any tile bubbles up to it. Steven, 09 Sep. */
          points: '.sg-songlist', tap: true },

        /* ---------- 9. inside the song ----------

           Explaining AFTER she is on the page, not before: Steven's
           order, and the reason steps 7 and 8 are bare instructions.

           Points at the player, which is the top of the page and where
           the eye should start. The individual pointers he wants after
           this — lyrics and lines, Word list, Fill in N lines, the word
           practice — are `.mode-toggle`, `.sg-words`, `.sg-fill` and the
           song word-practice tile, each needing its own short line. */
        { line: { en:'Here you can play the whole song and follow the lyrics. Tap any line to hear that line spoken instead of sung.\n\nYou can also open the word list to see the vocabulary from this song and its translations.\n\nThere are activities here where you can earn credit, too. You can fill in missing lines and practice the words from the song.', ru:'Здесь ты можешь включить всю песню и следить за текстом. Нажми на любую строку, чтобы услышать её произнесённой, а не спетой.\n\nМожно также открыть список слов и посмотреть лексику из песни с переводами.\n\nЗдесь есть и задания, за которые можно получить баллы. Ты можешь вставлять пропущенные строки и тренировать слова из песни.', de:'Hier kannst du das ganze Lied abspielen und den Text mitlesen. Tippe auf eine Zeile, um sie gesprochen statt gesungen zu hören.\n\nDu kannst auch die Wortliste öffnen und den Wortschatz des Liedes mit Übersetzungen ansehen.\n\nAuch hier gibt es Aktivitäten, für die du Punkte bekommst. Du kannst fehlende Zeilen ergänzen und die Wörter aus dem Lied üben.' },
          points: '.sg-audio' },

        /* ---------- back to the contents ----------

           `.backlink` is the same class on every screen, so one step
           serves every return trip. Back from the songbook lands on the
           Table of Contents rather than the hub, because the TOC opened
           it and passes its own exit — which is what makes Steven's
           "home base" structure work at all. */
        /* TWO BACKS, NOT ONE.

           This activity is two screens deep from the contents: a list,
           then the thing you opened from it. One back arrow lands on the
           LIST — songbook.js's song back and reader.js's piece back both
           repaint their own index rather than calling `onExit()`. So a
           single step saying "return to the Table of Contents" left her
           on the list while the next step told her to open something that
           is not on that screen. Steven found it on Songs, 09 Sep; the
           Reader has the same shape.

           Both steps arm `.backlink`, and `resume()` redraws on every
           paint, so the second lights the same arrow on the new screen.

           NINE OTHER STEPS STILL SAY THE ONE-BACK LINE. They are the
           activities with no list-then-item tap inside them, so one back
           should be right — but that is reasoning, not testing. Checked
           09 Sep: comics, listen-and-speak, word matching, dialogues, the
           word list, progress, achievements, grammar, settings. */
        { line: { en:'Tap the back arrow. That brings you to the list of songs.', ru:'Нажми стрелку «Назад». Так ты попадёшь к списку песен.', de:'Tippe auf den Zurück-Pfeil. Damit kommst du zur Liste der Lieder.' },
          points: '.backlink', tap: true },

        { line: { en:'Songs was two screens deep, so tap it once more to get back to the Table of Contents.', ru:'Песни были на два экрана в глубину, поэтому нажми ещё раз, чтобы вернуться к оглавлению.', de:'Die Lieder lagen zwei Bildschirme tief, also tippe noch einmal, um zum Inhaltsverzeichnis zurückzukommen.' },
          points: '.backlink', tap: true },

        /* ---------- comics ---------- */
        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        /* NOT armed: one explanatory line, and she is already on the
           right screen — the Jukebox row sits in the same open Read and
           listen group the comic is reached from, so no navigation. */
        /* A TAP STEP, AND A WAY BACK.

           This was a read-only step highlighting a TOC ROW. A row
           navigates — `toc.js`'s `openActivity()` calls
           `GH.app.play(a, backHere())` — so she tapped the ringed thing,
           as every other step has trained her to, landed in the Jukebox,
           and the next step told her to open Alina and Stella, which is
           in the contents she had just left. Steven, 09 Sep.

           So she goes in on purpose and comes back on purpose. The back
           line is Steven's wording, and it is the pattern for any step
           that sends her into a section.

           ONE BACK IS ENOUGH HERE. `backHere()` restores the Table of
           Contents with the group still open, so the arrow lands her
           exactly where the next step expects. Steven's second line —
           "hit the TOC button at the top of the screen" — is for the
           cases where back does NOT reach the contents; the button is
           `.jump.is-toc` in the sticky jumpbar, labelled TOC / IV / ОГЛ
           (`tocShort`), and step 7 already uses it that way.

           AUDITED 09 Sep, and this is the only case. The other two
           read-only TOC targets are GROUP HEADERS —
           `[data-toc-group="lessons"]` at step 8 and `"ref"` at step 82 —
           and a group header expands in place rather than navigating, so
           tapping one cannot strand her. */
        { line: { en:'In the Jukebox, you can build your own playlist and arrange the songs in any order you like. The music keeps playing when your phone is locked, so you can listen while you walk.', ru:'В Jukebox ты можешь собрать свой плейлист и расположить песни в любом порядке. Музыка продолжит играть даже с заблокированным телефоном, поэтому её можно слушать во время прогулки.', de:'In der Jukebox kannst du deine eigene Playlist zusammenstellen und die Lieder beliebig anordnen. Die Musik läuft auch bei gesperrtem Handy weiter, sodass du sie beim Spazierengehen hören kannst.' },
          points: '[data-toc="jukebox"]', tap: true },

        { line: { en:'When you are done looking around here, hit the back button.', ru:'Когда закончишь здесь осматриваться, нажми кнопку «Назад».', de:'Wenn du dich hier fertig umgesehen hast, drück auf den Zurück-Button.' },
          points: '.backlink', tap: true },

        { line: { en:'Let\u2019s look at a comic next. Tap Alina and Stella.', ru:'Теперь посмотрим комикс. Нажми Alina and Stella.', de:'Sehen wir uns als Nächstes einen Comic an. Tippe auf Alina und Stella.' },
          points: '[data-toc="comic"]', tap: true },

        /* The unit picker is `.tiles`; the comics inside a unit are
           `.cm-grid`. Two taps, so two steps — she picks a unit, then a
           comic, exactly as Steven described. */
        { line: { en:'Alina and Stella follows the adventures of a girl named Alina and her magical purse, Stella. The story is divided into units, and each unit contains several comics. Pick a unit, then choose a comic.', ru:'Alina and Stella рассказывает о приключениях девочки Алины и её волшебной сумочки Стеллы. История разделена на части, в каждой из которых несколько комиксов. Выбери часть, а затем комикс.', de:'Alina und Stella erzählt die Abenteuer eines Mädchens namens Alina und ihrer magischen Handtasche Stella. Die Geschichte ist in Einheiten mit mehreren Comics unterteilt. Wähle eine Einheit und dann einen Comic.' },
          points: '.tiles', tap: true },

        { line: { en:'Now choose a comic.', ru:'Теперь выбери комикс.', de:'Wähle jetzt einen Comic.' },
          points: '.cm-grid', tap: true },

        { line: { en:'Each comic has a German edition and an English edition. You can read the text one panel at a time, or choose All text to read the text for the entire comic at once.', ru:'У каждого комикса есть немецкая и английская версии. Ты можешь читать текст по одной панели или выбрать Весь текст, чтобы прочитать весь текст комикса сразу.', de:'Jeder Comic hat eine deutsche und eine englische Ausgabe. Du kannst den Text Bild für Bild lesen oder Gesamter Text wählen, um den ganzen Comictext auf einmal zu lesen.' },
          points: '.cm-swap' },

        /* The view toggle and the narrator picker are both `.mode-toggle`
           inside `.cm-tools`; the narrator one also carries `.cm-voice`,
           so `:not(.cm-voice)` names the view one without depending on
           which order they were appended in. */
        { line: { en:'One line shows the text panel by panel. All text shows the text from every panel together.', ru:'Одна строка показывает текст панель за панелью. Весь текст показывает текст всех панелей вместе.', de:'Eine Zeile zeigt den Text Bild für Bild. Gesamter Text zeigt den Text aller Bilder zusammen.' },
          points: '.cm-tools .mode-toggle:not(.cm-voice)' },

        { line: { en:'Choose which language to display for the accompanying text.', ru:'Выбери язык сопровождающего текста.', de:'Wähle aus, in welcher Sprache der Begleittext angezeigt werden soll.' },
          points: '.cm-voice' },

        { line: { en:'Read it all plays the whole comic aloud.', ru:'Прочитать всё воспроизводит вслух весь комикс.', de:'Alles vorlesen liest dir den ganzen Comic vor.' },
          points: '.cm-playall' },

        /* ---------- the reader ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        { line: { en:'Let\u2019s look at The Reader next. Tap The Reader.', ru:'Теперь посмотрим Reader. Нажми The Reader.', de:'Sehen wir uns als Nächstes den Reader an. Tippe auf The Reader.' },
          points: '[data-toc="reader"]', tap: true },

        { line: { en:'The Reader has a large collection of short stories, longer stories, poems, and articles. Choose something you\u2019d like to read.', ru:'В Reader есть большая коллекция коротких и длинных рассказов, стихотворений и статей. Выбери то, что тебе хочется прочитать.', de:'Der Reader enthält viele kurze und längere Geschichten, Gedichte und Artikel. Wähle etwas aus, das du lesen möchtest.' },
          /* `.rd-list`, not `.tiles`. The Reader builds one grid per tier, and
             butler.js arms the first match only — so just the top tier lit up
             and only a tile in it advanced the tour. Wrapper added to
             reader.js on 09 Sep, same fault as the song list. */
          points: '.rd-list', tap: true },

        /* The four controls each got a class of their own for this —
           `rd-hear` and `rd-startqs` did not exist, both were bare
           `btn btn-ghost`/`btn btn-primary` shared with other buttons on
           the same screen. */
        { line: { en:'You can hear the entire text, see a translation, or look at the words used in the text.\n\nIf you use the translation, you\u2019ll have to wait five days before you can answer the questions for daily credit. Looking at the word bank does not lock the questions, so you can use it for help and still answer the questions for daily credit.', ru:'Ты можешь прослушать весь текст, посмотреть перевод или открыть слова из текста.\n\nЕсли воспользуешься переводом, придётся подождать пять дней, прежде чем вопросы снова будут засчитываться в ежедневную практику. Список слов вопросы не блокирует – им можно пользоваться как подсказкой и всё равно ответить на вопросы сегодня.', de:'Du kannst dir den gesamten Text anhören, eine Übersetzung ansehen oder die Wörter aus dem Text öffnen.\n\nWenn du die Übersetzung benutzt, musst du fünf Tage warten, bevor die Fragen für deine tägliche Leistung zählen. Die Wortliste sperrt die Fragen nicht – du kannst sie als Hilfe nutzen und die Fragen trotzdem heute beantworten.' },
          points: '.rd-hear' },

        { line: { en:'Translate shows the translation \u2014 but using it starts the five-day wait before the questions count for daily credit.', ru:'Перевести показывает перевод, но после этого начинается пятидневное ожидание, прежде чем вопросы снова будут засчитываться в ежедневную практику.', de:'Übersetzen zeigt dir die Übersetzung – aber dadurch beginnt die fünftägige Wartezeit, bevor die Fragen für deine tägliche Leistung zählen.' },
          points: '.rd-translate' },

        { line: { en:'Words in this text opens the story\u2019s word bank. This one does not start the wait, so you can use it for help and still answer the questions today.', ru:'Слова в этом тексте открывает список слов из истории. Он не запускает ожидание, поэтому ты можешь пользоваться им как подсказкой и всё равно ответить на вопросы сегодня.', de:'Wörter in diesem Text öffnet die Wortliste der Geschichte. Dadurch beginnt die Wartezeit nicht, also kannst du sie als Hilfe nutzen und die Fragen noch heute beantworten.' },
          points: '.rd-words' },

        { line: { en:'And here are the questions. Answer them for daily credit, as long as the translation has not been used.', ru:'А вот и вопросы. Ответь на них, чтобы они засчитались в ежедневную практику, если ты не пользовалась переводом.', ruM:'А вот и вопросы. Ответь на них, чтобы они засчитались в ежедневную практику, если ты не пользовался переводом.', de:'Und hier sind die Fragen. Beantworte sie für deine tägliche Leistung, solange du die Übersetzung nicht benutzt hast.' },
          points: '.rd-startqs' },

        /* ---------- listen and speak ---------- */
        /* TWO BACKS HERE TOO — see the note on the Songs pair above.
           reader.js's piece view backs to `paintIndex()`, not `onExit()`. */
        { line: { en:'Tap the back arrow. That brings you to the list of stories.', ru:'Нажми стрелку «Назад». Так ты попадёшь к списку историй.', de:'Tippe auf den Zurück-Pfeil. Damit kommst du zur Liste der Geschichten.' },
          points: '.backlink', tap: true },

        { line: { en:'The Reader was two screens deep as well, so tap it once more for the Table of Contents.', ru:'Читалка тоже была на два экрана в глубину, поэтому нажми ещё раз, чтобы вернуться к оглавлению.', de:'Der Leser lag ebenfalls zwei Bildschirme tief, also tippe noch einmal für das Inhaltsverzeichnis.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        { line: { en:'Next, let\u2019s look at Listen and Speak. Tap Listen and Speak.', ru:'Теперь посмотрим Слушай и говори. Нажми Слушай и говори.', de:'Als Nächstes sehen wir uns Hören und Sprechen an. Tippe auf Hören und Sprechen.' },
          points: '[data-toc="listen-speak"]', tap: true },

        /* SHE ARRIVES ON THE SETUP SCREEN, not the practice one. Listen
           and Speak opens on sources, length, speed and gap with a Start
           button; the hear and record controls Steven's lines describe do
           not exist until Start is pressed. So a Start step sits between
           them — without it the next two steps would point at nothing.

           `.sp-setup` and `.sp-start` both had to be added: the panel was
           a bare `.card`, which dozens of screens use, and Start was
           `btn btn-primary js-advance`, shared with half the app. */
        { line: { en:'You can choose what kinds of lines to practice \u2014 poems, stories, songs, or example sentences \u2014 and adjust the line length, the slow speed, and the pause between passes.', ru:'Ты можешь выбрать, какие строки тренировать – из стихов, рассказов, песен или примеров предложений – а также настроить длину строки, медленную скорость и паузу между повторами.', de:'Du kannst auswählen, welche Texte du üben möchtest – Gedichte, Geschichten, Lieder oder Beispielsätze – und die Zeilenlänge, das langsame Tempo und die Pause zwischen den Durchgängen einstellen.' },
          points: '.sp-setup' },

        { line: { en:'Tap Start when you are ready.', ru:'Нажми «Старт», когда будешь готова.', ruM:'Нажми «Старт», когда будешь готов.', de:'Tippe auf Start, wenn du bereit bist.' },
          points: '.sp-start', tap: true },

        { line: { en:'Here you can practice hearing German spoken. First, listen to the line at normal speed, then slowly, then normally again. You can also break it into two- or three-word pieces.', ru:'Здесь ты можешь тренироваться понимать немецкую речь. Сначала послушай строку с обычной скоростью, затем медленно, а потом снова с обычной. Её также можно разбить на части по два или три слова.', de:'Hier kannst du gesprochenes Deutsch trainieren. Höre die Zeile zuerst in normalem Tempo, dann langsam und danach wieder normal. Du kannst sie auch in Abschnitte von zwei oder drei Wörtern aufteilen.' },
          points: '.sp-cuts' },

        /* SHE ACTUALLY LISTENS. `tap` arms the real button, so the tour
           waits while the three passes play instead of describing them.
           Steven: "Then have her tap 'Hear it: normal, slow, normal' and
           actually listen to the line." */
        { line: { en:'Tap Hear it: normal, slow, normal, and listen to the line.', ru:'Нажми «Послушать: нормально, медленно, нормально» и прослушай строку.', de:'Tippe auf Hören: normal, langsam, normal und höre dir die Zeile an.' },
          points: '.sp-hear', tap: true },

        { line: { en:'Now it\u2019s your turn. Tap Record yourself, say the same line, and then compare your pronunciation with the original.', ru:'Теперь твоя очередь. Нажми Записать себя, произнеси ту же строку, а затем сравни своё произношение с оригиналом.', de:'Jetzt bist du dran. Tippe auf Selbst aufnehmen, sprich dieselbe Zeile und vergleiche anschließend deine Aussprache mit dem Original.' },
          points: '.sp-rec', tap: true },

        /* `.sp-modes` only exists once there is a recording of hers to
           compare against — the block is inside `if (it.url)`. If she
           skipped recording, this step falls back to a plain Next with
           nothing lit rather than pointing at a control that is not
           there. */
        { line: { en:'Now play them back against each other and hear the difference.', ru:'Теперь прослушай обе версии и сравни, как они звучат.', de:'Spiele jetzt beide Aufnahmen gegeneinander ab und höre dir den Unterschied an.' },
          points: '.sp-modes' },

        /* ---------- word matching ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        { line: { en:'Now Word Matching. Tap Word Matching.', ru:'Теперь Word Matching. Нажми «Word Matching».', de:'Jetzt kommt Word Matching. Tippe auf Word Matching.' },
          points: '[data-toc="word-matching"]', tap: true },

        /* Topics are `.chips`, the count is `.wm-lens`, and one line
           covers both — so this points at the topic chips, which is where
           she starts, and the count is two inches below it. */
        { line: { en:'Pick a topic, then choose how many words you want to practice.', ru:'Выбери тему, а затем количество слов, которые хочешь потренировать.', de:'Wähle ein Thema und dann, wie viele Wörter du üben möchtest.' },
          points: '.chips' },

        { line: { en:'Tap Start when you are ready.', ru:'Нажми «Старт», когда будешь готова.', ruM:'Нажми «Старт», когда будешь готов.', de:'Tippe auf Start, wenn du bereit bist.' },
          points: '.wm-go', tap: true },

        /* The listening pass runs on a timer with no button to arm, so
           this is a plain Next she presses when it is done. `.wm-stage`
           is the full-screen listening view. */
        { line: { en:'You\u2019ll hear each word three times: German, your language, then German again.', ru:'Ты услышишь каждое слово три раза: по-немецки, на твоём языке и снова по-немецки.', de:'Du hörst jedes Wort dreimal: Deutsch, deine Sprache und dann noch einmal Deutsch.' },
          points: '.wm-stage' },

        { line: { en:'Now match the words. Tap a word in one language, then tap its match in the other language.', ru:'Теперь сопоставь слова. Нажми на слово на одном языке, а затем на соответствующее ему слово на другом.', de:'Jetzt ordne die Wörter einander zu. Tippe auf ein Wort in einer Sprache und dann auf das passende Wort in der anderen.' },
          points: '.wm-board' },

        { line: { en:'Matched pairs disappear, and new words appear until you\u2019ve worked through the set.', ru:'Найденные пары исчезают, а новые слова появляются, пока ты не пройдёшь весь набор.', de:'Gefundene Paare verschwinden, und neue Wörter erscheinen, bis du das ganze Set durchgearbeitet hast.' },
          points: '.wm-board' },

        /* ---------- dialogues ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Read and listen.', ru:'Открой «Чтение и аудирование».', de:'Öffne Lesen und Hören.' },
          points: '[data-toc-group="read"]', tap: true },

        { line: { en:'Now Dialogues. Tap Dialogues.', ru:'Теперь диалоги. Нажми «Диалоги».', de:'Jetzt kommen die Dialoge. Tippe auf Dialoge.' },
          points: '[data-toc="dialogues"]', tap: true },

        { line: { en:'Choose a dialogue. These are short conversations in everyday situations.', ru:'Выбери диалог. Это короткие разговоры из повседневных ситуаций.', de:'Wähle einen Dialog. Das sind kurze Gespräche aus Alltagssituationen.' },
          points: '.dg-list', tap: true },

        /* `.dg-talk` is the transcript itself — the German and the
           translation, line by line — which is what she is following
           along with. */
        { line: { en:'First, listen to the whole conversation and follow along with the German and translation.', ru:'Сначала прослушай весь разговор и следи за немецким текстом и переводом.', de:'Höre dir zuerst das ganze Gespräch an und lies den deutschen Text und die Übersetzung mit.' },
          points: '.dg-talk' },

        /* `.dg-modes` is the Listen/Practise switch, and NOT
           `.mode-toggle` — talkview.js has its own class here, noted in
           the file as deliberate.

           IT IS NOT ALWAYS THERE: Practise only appears when the dialogue
           has blanked lines (`blankedLines(d).length`), so on one without
           them the switch has a single button and nothing to switch to.
           `highlight()` returns false for a missing selector and this
           falls back to a plain Next rather than pointing at nothing. */
        { line: { en:'When you\u2019re ready, switch to Practise. You can work through the conversation yourself and practise the individual lines.', ru:'Когда будешь готова, переключись на Практику. Ты сможешь пройти диалог самостоятельно и потренировать отдельные реплики.', ruM:'Когда будешь готов, переключись на Практику. Ты сможешь пройти диалог самостоятельно и потренировать отдельные реплики.', de:'Wenn du bereit bist, wechsle zu Üben. Du kannst den Dialog selbst durcharbeiten und die einzelnen Zeilen üben.' },
          points: '.dg-modes' },

        /* ---------- games ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Games.', ru:'Открой «Игры».', de:'Öffne Spiele.' },
          points: '[data-toc-group="games"]', tap: true },

        /* THE FIRST BRANCH IN THE TOUR, and what `picks` was added for.

           Steven: "Waddles shouldn't march her through all eleven. Give
           her a choice of three representative games and let her actually
           try one." So three buttons, each opening a real game, chosen to
           show different kinds of practice — listening, gender, word
           order.

           `picks` is NOT `choices`. `choices` is terminal: it writes
           `done`, closes and nulls `state`, so it can only ever end a
           tour. `picks` keeps `state` alive, opens the thing, and jumps to
           a named step — here all three land on `at:'after-game'`, which
           is what makes this a diamond rather than three dead ends.

           `to` names the step rather than indexing it, so inserting stops
           above the target cannot silently point this somewhere else. */
        { picks: [
            { label:{ en:'Listen and pick', ru:'Слушай и выбирай', de:'Hören und auswählen' },
              activity:'listen-pick', to:'after-game' },
            { label:{ en:'der \u00b7 die \u00b7 das', ru:'der \u00b7 die \u00b7 das', de:'der \u00b7 die \u00b7 das' },
              activity:'gender', to:'after-game' },
            { label:{ en:'Build the sentence', ru:'Собери предложение', de:'Satz bauen' },
              activity:'scramble', to:'after-game' }
          ],
          line: { en:'There are eleven games here for practising different German skills. Let\u2019s try one. Pick whichever sounds interesting.', ru:'Здесь одиннадцать игр для тренировки разных навыков немецкого. Давай попробуем одну. Выбери ту, которая тебе интересна.', de:'Hier gibt es elf Spiele, mit denen du verschiedene Deutschkenntnisse üben kannst. Probieren wir eines aus. Wähle das Spiel, das dich interessiert.' } },

        /* WHERE THE THREE BRANCHES MEET. She is inside whichever game she
           chose, so this points at nothing specific — the games share no
           common element worth lighting, and she is meant to be playing
           rather than being pointed at. */
        { at: 'after-game',
          line: { en:'Have a go. Play as long as you like, then tap the back arrow when you want to carry on with the tour.', ru:'Попробуй. Играй столько, сколько хочешь, а когда захочешь продолжить экскурсию, нажми стрелку «Назад».', de:'Probier es aus. Spiele so lange du möchtest und tippe dann auf den Zurück-Pfeil, wenn du mit der Tour weitermachen willst.' },
          points: '.backlink', tap: true },

        /* ---------- the word list ----------

           Steven treats this as the one part of Reference that is
           learning content rather than site plumbing, so it gets its own
           stop while Progress, Achievements, Store, Settings, Grammar,
           Crystals and Multi-Meaning are handled separately later
           according to what each actually does.

           `[data-toc="reference"]` — the word list's hub tile id, which
           is `reference`. Confusing but it is the real one; the SECTION
           is `[data-toc-group="ref"]`. */
        { line: { en:'Open Reference.', ru:'Открой раздел «Справочник».', de:'Öffne den Bereich Referenz.' },
          points: '[data-toc-group="ref"]', tap: true },

        { line: { en:'Tap Word List.', ru:'Нажми «Список слов».', de:'Tippe auf Wortliste.' },
          points: '[data-toc="reference"]', tap: true },

        { line: { en:'This is your Word List. It\u2019s a large bank of German vocabulary from around the site. Many words have pictures, and you can open a word to see example sentences and hear how it sounds.', ru:'Это твой Список слов. Здесь собрана большая коллекция немецких слов со всего сайта. У многих есть картинки, а открыв слово, ты увидишь примеры предложений и сможешь услышать, как оно звучит.', de:'Das ist deine Wortliste. Sie enthält viele deutsche Wörter aus der gesamten Seite. Viele haben Bilder, und du kannst ein Wort öffnen, um Beispielsätze zu sehen und zu hören, wie es klingt.' },
          points: '.ref-thumb.has-pic' },

        /* THE PICTURE ACTUALLY OPENS. `.ref-thumb` is the 52px crop on a
           word row, and tapping it opens the lightbox at full size.

           `tap: true` works because the lightbox is `z-index:200` against
           the tour overlay's 70 — it covers the bubble completely while
           it is open, so the 700ms advance happens underneath and the
           next step is waiting for her when she closes it. Nothing is
           missed.

           This only works at all because of a fix earlier today:
           `GH.sprite.locate` did not exist, so `GH.lightbox.open()` threw
           before painting and tapping a picture did nothing. */
        { line: { en:'Tap a picture to see it full size.', ru:'Нажми на картинку, чтобы увидеть её в полном размере.', de:'Tippe auf ein Bild, um es in voller Größe zu sehen.' },
          points: '.ref-thumb.has-pic', tap: true },

        { line: { en:'Close it when you have had a look.', ru:'Закрой её, когда закончишь смотреть.', de:'Schließe es, wenn du es dir angesehen hast.' },
          points: '.lb-close', tap: true },

        /* ---------- progress ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Reference.', ru:'Открой раздел «Справочник».', de:'Öffne den Bereich Referenz.' },
          points: '[data-toc-group="ref"]', tap: true },

        { line: { en:'Tap Progress.', ru:'Нажми «Прогресс».', de:'Tippe auf Fortschritt.' },
          points: '[data-toc="progress-view"]', tap: true },

        /* Kept as ONE step with Steven's three paragraphs intact, rather
           than split into three pointers. `.pv-head` is the row of counts
           — settled, learning, due, stuck — which is what the first
           paragraph names and where the eye starts.

           The other two paragraphs describe things without a single
           element to light: the per-area breakdown is repeated
           `.pv-due-group` blocks, and the jump-in control is a
           `.pv-row-go` span inside whichever rows happen to be due
           today. Pointing at either would be pointing at one of several. */
        { line: { en:'Here you can see how your learning is going. You can see what you\u2019ve already worked on, what has settled, what is still in progress, and what is due for another look.\n\nThe site keeps track of different areas separately, so you can see where you\u2019re doing well and where a little more practice might help.\n\nWhen something is due, you can jump straight into a suggested activity and practise it again.', ru:'Здесь ты увидишь, как продвигается твоё обучение: что ты уже изучала, что хорошо запомнила, что ещё закрепляется и что пора повторить.\n\nЕсли что-то пора повторить, отсюда можно сразу перейти к подходящему упражнению.', ruM:'Здесь ты увидишь, как продвигается твоё обучение: что ты уже изучал, что хорошо запомнил, что ещё закрепляется и что пора повторить.\n\nЕсли что-то пора повторить, отсюда можно сразу перейти к подходящему упражнению.', de:'Hier siehst du, wie dein Lernen vorangeht: was du schon geübt hast, was sitzt, was noch in Arbeit ist und was du wiederholen solltest.\n\nWenn etwas fällig ist, kannst du direkt zu einer passenden Übung springen.' },
          points: '.pv-head' },

        /* ---------- achievements ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Reference.', ru:'Открой раздел «Справочник».', de:'Öffne den Bereich Referenz.' },
          points: '[data-toc-group="ref"]', tap: true },

        { line: { en:'Tap Achievements.', ru:'Нажми «Достижения».', de:'Tippe auf Erfolge.' },
          points: '[data-toc="awards-view"]', tap: true },

        /* `.aw-score` is the earned-of-total count with its bar — the one
           element on the page that answers all three of Steven's
           paragraphs at once: how many are unlocked, how many exist, and
           how far there is to go. The individual achievements are
           repeated `.aw-row` buttons with no single one worth lighting.

           NOTE FOR WHOEVER TRANSLATES THIS: the achievements themselves
           are still English in the Russian and German blocks — all 25
           names and descriptions. So this stop currently sends her to a
           page of English text while Waddles speaks her language. It is
           the largest untranslated cluster in js/i18n.js. */
        { line: { en:'Here are your Achievements. As you explore the site and complete different kinds of activities, you can unlock them and earn extra Crystals.\n\nThere are achievements for many different things you can do, so you may earn some just by learning normally \u2014 and others might encourage you to try something new.\n\nYou can come here anytime to see what you\u2019ve already earned, what you\u2019re close to earning, and what challenges are still waiting for you.', ru:'Здесь находятся твои достижения. Ты можешь открывать их, выполняя разные задания на сайте, и получать дополнительные кристаллы.\n\nЗдесь также видно, чего ты уже достигла и какие испытания ещё впереди.', ruM:'Здесь находятся твои достижения. Ты можешь открывать их, выполняя разные задания на сайте, и получать дополнительные кристаллы.\n\nЗдесь также видно, чего ты уже достиг и какие испытания ещё впереди.', de:'Hier findest du deine Erfolge. Du kannst sie durch verschiedene Aktivitäten auf der Website freischalten und dabei zusätzliche Kristalle verdienen.\n\nDu siehst auch, was du schon geschafft hast und welche Herausforderungen noch vor dir liegen.' },
          points: '.aw-score' },

        /* ---------- grammar ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Reference.', ru:'Открой раздел «Справочник».', de:'Öffne den Bereich Referenz.' },
          points: '[data-toc-group="ref"]', tap: true },

        { line: { en:'Tap Grammar.', ru:'Нажми «Грамматика».', de:'Tippe auf Grammatik.' },
          points: '[data-toc="grammar"]', tap: true },

        /* `.tiles` is the topic index she lands on. */
        { line: { en:'Here you\u2019ll find German grammar explained with rules, examples, and tables. Many topics also have lessons, so you can learn and practise them.', ru:'Здесь собрана немецкая грамматика: правила, примеры и таблицы. Многие темы ведут прямо к урокам, где ты сможешь их потренировать.', de:'Hier findest du deutsche Grammatik mit Regeln, Beispielen und Tabellen. Viele Themen führen auch direkt zu Lektionen, in denen du sie üben kannst.' },
          points: '.tiles' },

        /* ---------- settings ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        { line: { en:'Open Reference.', ru:'Открой раздел «Справочник».', de:'Öffne den Bereich Referenz.' },
          points: '[data-toc-group="ref"]', tap: true },

        { line: { en:'Tap Settings.', ru:'Нажми «Настройки».', de:'Tippe auf Einstellungen.' },
          points: '[data-toc="settings"]', tap: true },

        { line: { en:'Here you can adjust how the site works for you. You can manage your learning preferences, choose which vocabulary is active, unlock words, and change other options to suit how you want to learn.', ru:'Здесь ты можешь настроить сайт под себя: изменить параметры обучения, выбрать активные наборы слов, разблокировать слова и изменить другие настройки.', de:'Hier kannst du einstellen, wie die Website für dich funktioniert: Lernoptionen ändern, aktive Wortschätze auswählen, Wörter freischalten und weitere Einstellungen anpassen.' },
          points: '.settings-card' },

        /* ---------- crystals and the store: the shortcut ---------- */
        { line: { en:'Tap the back arrow to return to the Table of Contents.', ru:'Нажми стрелку «Назад», чтобы вернуться к оглавлению.', de:'Tippe auf den Zurück-Pfeil, um zum Inhaltsverzeichnis zurückzukehren.' },
          points: '.backlink', tap: true },

        /* POINTS AT THE GROUP, NOT A ROW. Steven's line names Crystals
           AND the Store, and they are two separate rows —
           `[data-toc="crystals"]` and `[data-toc="store"]` — so no single
           row is the thing being described. The Reference heading is the
           one element that contains both.

           It is already open at this point: she came here from Settings,
           which is in the same group, and `backHere()` carries the
           expanded group across. */
        { line: { en:'You can reach both Crystals and the Store from the Table of Contents. They\u2019re also available outside the Table of Contents. Let me show you.', ru:'И Кристаллы, и Магазин можно открыть из оглавления. Но попасть туда можно и другим способом. Я покажу тебе.', de:'Du kannst sowohl Kristalle als auch den Store über das Inhaltsverzeichnis öffnen. Du findest sie aber auch außerhalb des Inhaltsverzeichnisses. Ich zeige dir, wo.' },
          points: '[data-toc-group="ref"]' },

        /* Out of the contents entirely this time, not back into it. The
           back arrow on the Table of Contents itself goes to the hub —
           the TOC's own exit — which is where the other route lives. */
        { line: { en:'Close the Table of Contents.', ru:'Закрыть оглавление.', de:'Inhaltsverzeichnis schließen.' },
          points: '.backlink', tap: true },

        /* ---------- the crystal menu ----------

           THE GIFT STEP. `gift: 20` for the Full Tour, against the Quick
           Tour's 10, and paid once per tour — the flag is `paid_full`,
           separate from `paid_quick`, so completing one does not block
           the other's gift.

           ON A REPLAY this line is REPLACED, not repeated: butler.js
           swaps in `btGiftDone` ("You've already taken this tour and got
           your free crystals! Here's where your crystal balance is.")
           because announcing twenty crystals she is not being given
           would be a lie. The step still points at the purse and still
           arms the tap, so the instruction survives the swap. */
        /* THE GIFT STAYS ON THE NEXT STEP, not this one. butler.js swaps
           the line for `btGiftDone` on a replay, and only on the step
           carrying `gift`. Whichever of these two lines does not carry it
           reads falsely on a repeat run, so it sits on the second: this
           line claims a gift and the next immediately corrects it with
           "you've already taken this tour". The other order states the
           correction first and the false claim after. */
        { line: { en:'You\u2019ve seen a lot already. Here are 20 Crystals for coming this far. Let me show you where they go.', ru:'Ты уже многое увидела. Вот тебе 20 кристаллов за то, что дошла со мной до этого места. Покажу, куда они попали.', ruM:'Ты уже многое увидел. Вот тебе 20 кристаллов за то, что дошёл со мной до этого места. Покажу, куда они попали.', de:'Du hast schon viel gesehen. Hier sind 20 Kristalle dafür, dass du so weit mitgekommen bist. Ich zeige dir, wo sie gelandet sind.' } },

        { line: { en:'Your 20 Crystals have been added. Tap the Crystal at the top of the screen to see your Crystal menu.', ru:'Твои 20 кристаллов уже добавлены. Нажми на кристалл вверху экрана, чтобы открыть меню кристаллов.', de:'Deine 20 Kristalle wurden hinzugefügt. Tippe oben auf den Kristall, um das Kristall-Menü zu öffnen.' },
          points: '.purse', tap: true, gift: 20 },

        /* `.purse-pop-go` is the "Go to Crystals" button inside the
           balance panel. That panel was INVISIBLE until this afternoon —
           `.purse-pop` is absolutely positioned and neither
           `.topbar-controls` nor `.topbar` declared `position`, so it
           rendered a full viewport height below the header. It opened
           every time and could not be seen. This stop would have pointed
           at nothing.

           Its three strings — `have`, `go`, `note` in purse.js — are
           still English-only in the German and Russian, so the panel she
           opens here speaks English. */
        { line: { en:'Now tap Crystals to open the full Crystal section.', ru:'Теперь нажми «Кристаллы», чтобы открыть полный раздел кристаллов.', de:'Tippe jetzt auf Kristalle, um den vollständigen Kristall-Bereich zu öffnen.' },
          points: '.purse-pop-go', tap: true },

        /* ---------- the crystal centre ----------

           `.cr-have` is the balance at the top. The three things the line
           describes below it are separate blocks — `.cr-chart` (the week),
           `.cr-quest` rows (the daily quests) and the records block — with
           no wrapper holding all three, so the balance is where the eye
           starts and the line does the rest. */
        { line: { en:'This is your Crystal center. You can see how you\u2019ve earned Crystals, your recent totals and best days, and complete daily Crystal Quests chosen from activities around the site for bonus Crystals.\n\nYou can also spend your Crystals on pets. Let\u2019s visit the Store.', ru:'Это твой центр кристаллов. Здесь видно, как ты зарабатывала кристаллы, сколько получила за последние дни и какие дни были лучшими.\n\nВ ежедневных Кристальных заданиях можно заработать дополнительные кристаллы за случайно выбранные занятия на сайте.\n\nА ещё на кристаллы можно покупать питомцев. Заглянем в Магазин.', ruM:'Это твой центр кристаллов. Здесь видно, как ты зарабатывал кристаллы, сколько получил за последние дни и какие дни были лучшими.\n\nВ ежедневных Кристальных заданиях можно заработать дополнительные кристаллы за случайно выбранные занятия на сайте.\n\nА ещё на кристаллы можно покупать питомцев. Заглянем в Магазин.', de:'Das ist deine Kristall-Zentrale. Hier siehst du, wie du Kristalle verdient hast, deine letzten Ergebnisse und deine besten Tage.\n\nMit täglichen Kristall-Quests kannst du bei zufällig ausgewählten Aktivitäten zusätzliche Kristalle verdienen.\n\nMit deinen Kristallen kannst du auch Haustiere kaufen. Besuchen wir den Store.' },
          points: '.cr-have' },

        /* `.cr-store` is the Crystals page's own way out to the store —
           crystals.js notes that the header balance used to open the
           store directly and now opens this panel instead, so this
           button is the replacement route. */
        { line: { en:'Tap the Store link.', ru:'Нажми на ссылку «Магазин».', de:'Tippe auf den Link zum Store.' },
          points: '.cr-store', tap: true },

        /* ---------- the store ----------

           STREAK NUMBERS CHECKED against pets.js: common `run:3`, rare
           `run:7`, epic `run:30`, legendary `run:90` and `run:150`. A
           "day" here means five activities finished, not the app being
           opened — `GH.coins.fullDays()`, which is the counter the gates
           read after today's fix.

           "You can own more than one and switch between them" is true as
           written: `own` is an unbounded list and switching is free and
           instant (store.js toggles `chosen`, shifting the oldest out
           when slots are full).

           WHAT IT DOES NOT SAY, deliberately, per Steven: she starts with
           ONE slot, so only one pet appears at a time. A second slot
           costs 1500 crystals and a third 4500 (`GH_PETS.slots`). If this
           line is ever reworded towards "have several out at once", that
           cost has to be mentioned with it. */
        { line: { en:'Pets come in Common, Rare, Epic, and Legendary tiers. Common pets unlock after a 3-day streak, Rare after 7 days, and higher tiers take longer.\n\nEach pet has its own personality. You can own more than one and switch between them whenever you like.', ru:'Питомцы бывают обычными, редкими, эпическими и легендарными. Обычные открываются после серии в 3 дня, редкие — после 7 дней. Для более высоких уровней нужны более длинные серии.\n\nУ каждого питомца свой характер. Ты можешь иметь нескольких и переключаться между ними в любое время.', de:'Haustiere gibt es in den Stufen Gewöhnlich, Selten, Episch und Legendär. Gewöhnliche Haustiere werden nach einer 3-Tage-Serie freigeschaltet, seltene nach 7 Tagen. Höhere Stufen brauchen längere Serien.\n\nJedes Haustier hat seine eigene Persönlichkeit. Du kannst mehrere besitzen und jederzeit zwischen ihnen wechseln.' },
          points: '.gr-band' },

        /* ---------- the close ----------

           `choices` and NOT `picks`: this is the end. `choices` writes
           `done`, closes the bubble and nulls `state`, which is exactly
           right here and exactly why `picks` had to be added for the
           games branch earlier.

           BONUS: 30 IS MINE, NOT STEVEN'S. His line promises bonus
           crystals without a number. The Quick Tour pays a 10 gift and a
           15 bonus, so the Full Tour's 20 gift is matched with 30. Search
           `bonus: 30` to change all three.

           `bonusGame` NAMES THE ACTIVITY THAT CAN CLAIM IT, and empty
           means whatever she finishes first (coins.js: `if (sb.game &&
           sb.game !== game) return 0`).

             - Read a Story  -> 'reader'. reader.js pays under exactly
               that key, checked.
             - Start a Lesson -> LEFT OPEN ON PURPOSE. Lessons pay under
               `lesson:<id>` — `lesson:haben-sein` and so on, one key per
               lesson — so naming a single game id here could never
               match and the promised bonus would silently never arrive.
             - Play a Game -> left open too; the choice cannot name one
               of eleven.

           The cost of leaving it open is that any finished activity
           claims it, so picking "Start a Lesson" and then playing a game
           still pays. Loose, but it pays rather than lying. */
        /* THE NEW PENULTIMATE STOP. No `points`: the line says Waddles
           lives at the top of the screen, and his perch is `.bt-perch`,
           but at this moment she is inside the store — the perch is only
           created when the hub paints, and `finish()` flashes it after
           the tour ends. Pointing at it would highlight nothing. Same
           shape as the opening step, which also has no target. */
        { line: { en:'Thank you for taking the tour! You can take it again anytime you want. I\u2019ll always be here at the top of the screen.', ru:'Спасибо, что прошла экскурсию! Ты можешь пройти её снова в любое время. Я всегда буду здесь, в верхней части экрана.', ruM:'Спасибо, что прошёл экскурсию! Ты можешь пройти её снова в любое время. Я всегда буду здесь, в верхней части экрана.', de:'Danke, dass du die Tour gemacht hast! Du kannst sie jederzeit wiederholen. Du findest mich immer hier oben auf dem Bildschirm.' } },

        /* "Thank you for taking the tour" removed from this line — the
           stop above now says it, and Steven's instruction was that
           Waddles must not say it twice.

           NO `ruM`: the masculine and feminine forms Steven supplied for
           this line are identical, so a second copy would be dead weight
           that could drift out of step with the first. */
        { line: { en:'You\u2019re ready to start learning. Choose where you\u2019d like to begin, and if you finish it, I\u2019ll give you bonus Crystals.', ru:'Теперь можно начинать заниматься. Выбери, с чего хочешь начать. Если закончишь выбранное занятие, я дам тебе бонусные кристаллы.', de:'Jetzt kannst du mit dem Lernen beginnen. Wähle aus, womit du anfangen möchtest. Wenn du es abschließt, bekommst du von mir Bonus-Kristalle.' },
          choices: [
            { label: { en:'Start a Lesson', ru:'Начать урок', de:'Eine Lektion beginnen' },
              sel: '#sec-lsHead', bonusGame: null, bonus: 30 },
            { label: { en:'Play a Game', ru:'Сыграть в игру', de:'Ein Spiel spielen' },
              sel: '#sec-gamesHead', bonusGame: null, bonus: 30 },
            { label: { en:'Read a Story', ru:'Прочитать рассказ', de:'Eine Geschichte lesen' },
              go: 'reader', bonusGame: 'reader', bonus: 30 }
          ]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     HANDING OVER TO A PET

     Not written yet. A pet with no line here simply does not speak —
     the handover still happens, silently, the first time she buys one. */
  handover: {

    first: {
      butler: '',        /* screen 1: Waddles steps down */
      ok:     '',        /* the button */
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    leave: {
      head: '',
      ok:   '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    },

    'switch': {
      ok: '',
      pets: {
        p01:'', p02:'', p03:'', p04:'', p05:'', p06:'', p07:'', p08:'',
        p09:'', p10:'', p11:'', p12:'', p13:'', p14:'', p15:'', p16:''
      }
    }
  }

};
