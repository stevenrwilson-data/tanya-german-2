/* Tanya's lessons.

   Her actual coursework — the words her class is teaching her — with her
   name on it, in the reference row rather than among the games. The words
   are held out of general play in vocab.js with `only:'lesson'`, so they
   exist here and nowhere else.

   ------------------------------------------------------------------
   ONE STORY, FIVE STAGES, PROGRESSIVELY DAMAGED

   The story is the object. Every stage runs against the same ten
   sentences, taking more away each time, so by the last one she is
   reconstructing it. That is the whole design, and it is why this is not
   five separate pieces of content.

     read    the whole German story, with the translation, and four
             comprehension questions. The only stage that shows the
             translation at all.
     words   four or five of her target words removed, with a word bank.
     line    a whole sentence removed, three choices. The wrong ones are
             correct German that does not fit what happened either side.
     order   four events out of order, put them back.
     listen  one line spoken, not shown, choose what happened.

   ------------------------------------------------------------------
   WHY THE STAGES ARE NOT SPACED-REPETITION ITEMS

   The Reader rests a piece's questions for five days once they are
   answered, and spends them if the translation is opened. Neither applies
   here. Progressive damage means she moves FORWARD through one story in
   one sitting if she wants to, and a five-day wall between stage one and
   stage two would break the only idea the lesson has.

   So: stages unlock in order, each is recorded done the first time she
   finishes it, and redoing one is allowed and pays nothing. `read` is the
   only stage that offers the translation, and the four damaged stages
   never do — which resolves the collision without needing a rule.

   ------------------------------------------------------------------
   THE GERMAN AND THE RUSSIAN ARE STEVEN'S

   Both arrived from him and neither was written here. That rule stands for
   every lesson added after this one: the English may be drafted, the German
   may not.

   `ready:false` on a lesson means the screen shows what it is waiting for
   instead of running a stage against blank lines. tl-01 is `ready:true`.

   ------------------------------------------------------------------
   `gaps` ARE STRINGS, NOT WORD INDICES

   stories-long.js stores indices and they break the moment the same
   sentence exists in another language, which is the trap written up in
   TRANSLATION-BRIEF.md. Each `de` below is an exact substring of the German
   line it sits on.

   Two of the five target words are in sentence 9, so that line comes up
   twice with a different word missing. That is not a fault: the second
   pass is the same sentence read again for a different reason.

   ------------------------------------------------------------------
   THE ORDER STAGE, HONESTLY

   The design note says four events whose real sequence is NOT the sequence
   they are told in, because four events from a linear narrative listed in
   reading order tests memory of reading order and nothing else.

   THIS STORY IS LINEAR AND DOES NOT OFFER THAT. Anna orders, checks the
   calendar, proposes Monday, proposes Saturday — told in the order they
   happen. The four chosen below are the four most separable events, which
   makes the stage a real recall exercise and not the comprehension test it
   was specified to be. Worth writing lesson two with the gap deliberately
   built in. */

window.GH_TANYA = [

  {
    id: 'tl-01',
    /* Her name is on it deliberately. */
    title: { de: 'Tanusha Lektion Eins', ru: 'Урок Танюши, первый',
             en: 'Tanya Lesson One' },
    /* Which of her chapters this draws on, so the lesson can show which
       of her words it is actually teaching. */
    kaps: ['kap16', 'kap17'],

    ready: true,

    sentences: [
      { de:'Anna ist selbstständig und verkauft Kleidung online. Heute erhält sie eine wichtige Bestellung von einer Kundin.',
        ru:'Анна работает на себя и продаёт одежду через интернет. Сегодня она получает важный заказ от клиентки.',
        en:'Anna is self-employed and sells clothes online. Today she receives an important order from a customer.' },
      /* Corrected 31 Aug 2026. The English drafted here read "Hopefully,
         she needs it by Friday", with `hopefully` on a clause it cannot
         modify, and the German had translated that faithfully.

         `hoffentlich` is one of her kap16 words, so it could not simply be
         removed — moving it onto the delivery rather than the need fixes
         the sense and brings in `bekommen`, a second kap16 word the story
         did not use anywhere. It also mends the plot: she HOPES for Friday
         rather than requiring it, so Saturday is a small disappointment
         instead of a broken promise. */
      { de:'Die Kundin möchte einen roten Pullover bestellen. Hoffentlich bekommt sie ihn bis Freitag.',
        ru:'Клиентка хочет заказать красный свитер. Надеюсь, она получит его к пятнице.',
        en:'The customer wants to order a red sweater. Hopefully, she\u2019ll get it by Friday.' },
      { de:'Anna schaut in ihren Kalender. Normalerweise dauert die Lieferung ungefähr drei Tage. Aber diese Woche gibt es ein Problem.',
        ru:'Анна смотрит в свой календарь. Обычно доставка занимает около трёх дней. Но на этой неделе возникла проблема.',
        en:'Anna looks at her calendar. Normally, delivery takes about three days. But there is a problem this week.' },
      { de:'Anna ruft die Kundin an und erklärt ihr die Situation.',
        ru:'Анна звонит клиентке и объясняет ей ситуацию.',
        en:'Anna calls the customer and explains the situation.' },
      { de:'„Können wir die Lieferung auf Montag verschieben?“, fragt Anna.',
        ru:'«Мы можем перенести доставку на понедельник?» — спрашивает Анна.',
        en:'\u201cCan we move the delivery to Monday?\u201d Anna asks.' },
      { de:'Zuerst ist sich die Kundin nicht sicher. Sie hat am Montag einen wichtigen Termin.',
        ru:'Сначала клиентка не уверена. В понедельник у неё важная встреча.',
        en:'At first, the customer isn\u2019t sure. She has an important appointment on Monday.' },
      { de:'Anna macht einen anderen Vorschlag: „Ich kann Ihnen den Pullover auf jeden Fall am Samstag schicken.“',
        ru:'Анна предлагает другой вариант: «Я точно могу отправить вам свитер в субботу».',
        en:'Anna makes another suggestion: \u201cI can definitely send you the sweater on Saturday.\u201d' },
      { de:'Die Kundin denkt einen Moment nach und sagt: „Ja, das ist in Ordnung.“',
        ru:'Клиентка на мгновение задумывается и говорит: «Да, меня это устраивает».',
        en:'The customer thinks for a moment and says, \u201cYes, that\u2019s fine.\u201d' },
      { de:'Anna ist froh. Sie muss die Bestellung nicht absagen.',
        ru:'Анна рада. Ей не придётся отменять заказ.',
        en:'Anna is happy. She doesn\u2019t have to cancel the order.' },
      { de:'An diesem Abend erhält die Kundin eine Nachricht von Anna. Der Pullover ist bereits unterwegs.',
        ru:'В тот же вечер клиентка получает сообщение от Анны. Свитер уже в пути.',
        en:'That evening, the customer receives a message from Anna. The sweater is already on its way.' }
    ],

    /* STAGE read — four questions. `mc` and `tf`, the two kinds the
       dialogues already use, so nothing new has to be graded.

       The rule Steven set for the dialogue questions applies here too: no
       question whose answer is simply printed in the text. "What colour is
       the sweater" is copying; "why does Anna telephone" is not.

       None of the four below can be answered by finding one sentence:

         1  the story never says what the problem is, only that there is
            one, so the reason for the call has to be joined up from
            sentences 3 and 4.
         2  the story never explains why Saturday suits her. Friday, the
            Monday appointment and the Saturday offer are in three
            different sentences.
         3  sentence 9 states the negative — she does NOT have to cancel —
            so the answer is a negation to resolve rather than a fact to
            copy.
         4  needs sentence 2 against sentence 7: she wanted it by Friday
            and it goes out on Saturday. */
    q: [
      { kind: 'mc',
        q: { de:'Warum ruft Anna die Kundin an?',
             ru:'Почему Анна звонит клиентке?',
             en:'Why does Anna call the customer?' },
        opts: {
          de: ['Weil die Lieferung diese Woche nicht wie gewohnt funktioniert.',
               'Weil sie die Adresse der Kundin nicht kennt.',
               'Weil der Pullover nicht mehr im Laden ist.',
               'Weil die Kundin noch nicht bezahlt hat.'],
          ru: ['Потому что на этой неделе доставка работает не как обычно.',
               'Потому что она не знает адрес клиентки.',
               'Потому что свитера больше нет в магазине.',
               'Потому что клиентка ещё не заплатила.'],
          en: ['Because delivery is not working as usual this week.',
               'Because she does not know the customer\u2019s address.',
               'Because the sweater is no longer in the shop.',
               'Because the customer has not paid yet.']
        },
        a: 0 },

      /* REWRITTEN 31 Aug 2026. The keyed answer used to be "because she will
         already have the sweater before her appointment" — which the story
         never establishes. Anna says she can SEND it on Saturday; nothing
         says when it arrives, so the answer asserted a delivery date out of
         nowhere and there was no correct option on the screen.

         Question and correct answer are GPT's wording. The three wrong ones
         are new, because the old ones were written against the old question:
         `am Montag nicht zu Hause` is now nearly right, and `am Samstag
         frei` competes with the real answer. */
      { kind: 'mc',
        q: { de:'Warum findet die Kundin Annas zweiten Vorschlag besser?',
             ru:'Почему второй вариант Анны больше устраивает клиентку?',
             en:'Why does Anna\u2019s second suggestion suit the customer better?' },
        opts: {
          de: ['Weil Montag für sie wegen ihres wichtigen Termins schwierig ist.',
               'Weil der Versand am Samstag billiger ist.',
               'Weil sie den Pullover nicht mehr braucht.',
               'Weil sie den Pullover selbst abholen möchte.'],
          ru: ['Потому что понедельник ей неудобен из-за важной встречи.',
               'Потому что доставка в субботу дешевле.',
               'Потому что свитер ей больше не нужен.',
               'Потому что она хочет забрать свитер сама.'],
          en: ['Because Monday is difficult for her because of her important appointment.',
               'Because postage is cheaper on Saturday.',
               'Because she does not need the sweater any more.',
               'Because she wants to collect the sweater herself.']
        },
        a: 0 },

      { kind: 'tf',
        q: { de:'Am Ende muss Anna die Bestellung absagen.',
             ru:'В конце Анне приходится отменить заказ.',
             en:'In the end Anna has to cancel the order.' },
        a: false },

      /* REPLACED 31 Aug 2026. The old question asserted that she gets the
         sweater later than she wanted, and after the sentence 2 rewrite the
         story does not support it: she HOPED for Friday, Anna offers to send
         on Saturday, and then sentence 10 says the sweater is already on its
         way THAT EVENING. So it may well reach her early, and the question
         claimed more than the text.

         GPT proposed "Anna's first suggestion does not suit the customer as
         well as her second." That is sound, but it asks the same thing as
         Q2 above, one as a choice and one as true/false.

         This asks the one inference nothing else in the lesson touches, and
         it needs sentence 7 read against sentence 10: Anna promises Saturday
         and ships the same evening. THE GERMAN AND RUSSIAN HERE ARE
         CLAUDE'S AND UNREVIEWED. */
      { kind: 'tf',
        q: { de:'Anna schickt den Pullover früher, als sie es der Kundin versprochen hat.',
             ru:'Анна отправляет свитер раньше, чем обещала клиентке.',
             en:'Anna sends the sweater earlier than she promised the customer.' },
        a: true }
    ],

    /* STAGE words — the target words to remove, as they appear in the
       German. All five are hers, and each `de` is an exact substring of the
       line it sits on.

       `die Bestellung` is taken from sentence 9 rather than sentence 1,
       where it reads `eine wichtige Bestellung` — so the bank shows the
       article with the noun and the gender is part of what she puts back.

       The glosses are the ones vocab.js already carries, so the word bank
       and the word list cannot disagree. One of them is worth a second
       look: `selbstständig` is filed as самостоятельный, which is
       independent or self-reliant, and here it means self-employed. Change
       it in one place or the other, not only here. */
    gaps: [
      { at:0, de:'selbstständig',
        ru:'самостоятельный', en:'independent, self-employed' },
      { at:2, de:'ungefähr',
        ru:'примерно', en:'approximately, about' },
      { at:4, de:'verschieben',
        ru:'переносить / перенести', en:'to postpone, to move' },
      { at:8, de:'die Bestellung',
        ru:'заказ', en:'the order' },
      { at:8, de:'absagen',
        ru:'отменять / отменить', en:'to cancel' }
    ],

    /* STAGE line — each entry removes one sentence by index and offers
       three wrong replies per language. Written, never drawn from
       elsewhere: a wrong line taken from another story is eliminated on
       topic alone and measures nothing.

       All three cuts are middle sentences, so both sides of the gap are
       the clue. Every wrong reply is correct German about this same
       transaction — the wrong one for what happened either side, not the
       wrong topic.

       This array also drives the `listen` stage, so these three lines are
       the three she hears spoken. */
    cut: [
      { at:3,
        wrong: {
          de: ['Anna schreibt der Kundin eine kurze Nachricht und wartet.',
               'Anna bestellt sofort einen neuen Pullover.',
               'Anna bringt den Pullover selbst zur Kundin.'],
          ru: ['Анна пишет клиентке короткое сообщение и ждёт.',
               'Анна сразу заказывает новый свитер.',
               'Анна сама везёт свитер клиентке.'],
          en: ['Anna writes the customer a short message and waits.',
               'Anna immediately orders a new sweater.',
               'Anna takes the sweater to the customer herself.']
        } },

      { at:4,
        wrong: {
          de: ['„Können wir den Preis noch einmal besprechen?“, fragt Anna.',
               '„Möchten Sie den Pullover in einer anderen Farbe?“, fragt Anna.',
               '„Haben Sie meine Rechnung schon bezahlt?“, fragt Anna.'],
          ru: ['«Мы можем ещё раз обсудить цену?» — спрашивает Анна.',
               '«Хотите свитер другого цвета?» — спрашивает Анна.',
               '«Вы уже оплатили мой счёт?» — спрашивает Анна.'],
          en: ['\u201cCan we discuss the price again?\u201d Anna asks.',
               '\u201cWould you like the sweater in a different colour?\u201d Anna asks.',
               '\u201cHave you already paid my invoice?\u201d Anna asks.']
        } },

      { at:6,
        wrong: {
          de: ['Anna antwortet: „Dann müssen wir die Bestellung leider absagen.“',
               'Anna antwortet: „Ich schicke Ihnen morgen das Geld zurück.“',
               'Anna antwortet: „Sie können den Pullover selbst im Laden abholen.“'],
          ru: ['Анна отвечает: «Тогда, к сожалению, придётся отменить заказ».',
               'Анна отвечает: «Я верну вам деньги завтра».',
               'Анна отвечает: «Вы можете сами забрать свитер в магазине».'],
          en: ['Anna answers: \u201cThen unfortunately we have to cancel the order.\u201d',
               'Anna answers: \u201cI will send your money back tomorrow.\u201d',
               'Anna answers: \u201cYou can collect the sweater from the shop yourself.\u201d']
        } }
    ],

    /* STAGE order — four line indices, in the order they truly happened.
       See the note at the top of the file: this story tells them in the
       order they happen, so this is recall rather than comprehension. */
    order: [1, 2, 4, 6]
  }

];
