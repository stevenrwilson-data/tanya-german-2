/* data/en-questions.js */
/* Question words — who · what · where · when · why · how

   English-as-target, and the fourth English topic. It builds on BE and
   DO/DOES/DID and does not reteach either. It puts a question word in
   front of the question she already knows how to make:

     She is at home.       → Is she at home?        → Where is she?
     She works in Berlin.  → Does she work there?   → Where does she work?
     She arrived Monday.   → Did she arrive Monday? → When did she arrive?

   Core rule: question word first, then the normal question.

   What Russian does here
   ----------------------
   The six words map cleanly — кто, что, где/куда, когда, почему, как —
   so choosing WHICH word is the easy rung. The hard part is what comes
   after, because Russian needs nothing there:

     Где она работает?      → Where she works?     (no does)
     Почему они опаздывают? → Why they are late?   (no inversion)
     Кто звонил?            → Who did call?        (an extra did)

   German helps on the inversion (Wo arbeitet sie?) and misleads on
   who-as-subject, because German uses the same verb form either way:
   Wer hat angerufen? against Wen hat Tanya angerufen? English drops
   do/does/did only when who IS the subject.

   What this file does not do
   --------------------------
   which, whose, whom, how much, how many, how long, how often. Those are
   Questions II. English where covering both wo and wohin is named in a
   note, not scored — teaching that split here would undo the six-word
   table this lesson is built on.

   ------------------------------------------------------------------
   GENDERED RUSSIAN

   Five rows address the learner directly in the Russian past tense,
   which inflects. They carry `ru` (feminine) and `ruM` (masculine), the
   convention butler.js and js/activities/lessons.js both use; an unset
   `ruM` means the feminine form serves everyone.

     Почему ты устал(а)?   — words[], eq14, eq23
     Кому ты помог(ла)?    — whoPairs wp-help, object side
     Кому ты звонил(а)?    — eq38

   Rows gendered because of the PERSON BEING TALKED ABOUT — Назар сегодня
   устал, Она ушла рано, Кому звонила Таня — are already correct and
   deliberately carry NO twin. Splitting those would be wrong: the
   sentence is about Nazar or about her, not about the reader.

   Gender-neutral direct address — Где ты? Где ты живёшь? Как дела? — is
   also left alone. It works for both.

   THE LESSON IS NOT IN THIS FILE, for the same reason it is not in
   en-articles.js: lessons live in data/curriculum-en.js, in the four-kind
   schema the engine renders. `en-questions` is there.

   Scheme
   ------
   wh      'who' | 'what' | 'where' | 'when' | 'why' | 'how'
   about   person | thing | place | time | reason | way
   aux     'be' | 'do' | 'does' | 'did' | 'none'
           none = who-as-subject (Who called you?)
   role    'subject' | 'object' | 'other'   (who rows only)
   slot    'aux' on the rows that test what comes AFTER the question word
   prompt  sentence with ___ for the scored slot
   answer  the missing piece
   en/de/ru  the full correct question */

window.GH_EN_QUESTIONS = {

  title: {
    en: 'Question words',
    de: 'Fragewörter',
    ru: 'Вопросительные слова'
  },
  sub: {
    en: 'Who · What · Where · When · Why · How',
    de: 'Who · What · Where · When · Why · How',
    ru: 'Who · What · Where · When · Why · How'
  },
  lede: {
    en: 'The question word says what information you want. After it, keep the question you already know how to make with be or do/does/did.',
    de: 'Das Fragewort sagt, welche Information du willst. Danach bleibt die Frage, die du mit be oder do/does/did schon bilden kannst.',
    ru: 'Вопросительное слово говорит, какую информацию ты хочешь. После него — тот же вопрос, который ты уже умеешь строить с be или do/does/did.'
  },

  words: [
    { wh:'who',   about:'person', ru:'кто', de:'wer',
      ask:{ en:'a person', de:'eine Person', ru:'человека' },
      ex:{ en:'Who is she?', de:'Wer ist sie?', ru:'Кто она?' } },
    { wh:'what',  about:'thing', ru:'что / какой', de:'was',
      ask:{ en:'a thing or information', de:'eine Sache oder Information', ru:'предмет или информацию' },
      ex:{ en:'What is this?', de:'Was ist das?', ru:'Что это?' } },
    { wh:'where', about:'place', ru:'где / куда', de:'wo / wohin',
      ask:{ en:'a place', de:'einen Ort', ru:'место' },
      ex:{ en:'Where are you?', de:'Wo bist du?', ru:'Где ты?' } },
    { wh:'when',  about:'time', ru:'когда', de:'wann',
      ask:{ en:'a time', de:'eine Zeit', ru:'время' },
      ex:{ en:'When is the lesson?', de:'Wann ist der Unterricht?', ru:'Когда урок?' } },
    /* direct address, gendered */
    { wh:'why',   about:'reason', ru:'почему', de:'warum',
      ask:{ en:'a reason', de:'einen Grund', ru:'причину' },
      ex:{ en:'Why are you tired?', de:'Warum bist du müde?',
           ru:'Почему ты устала?', ruM:'Почему ты устал?' } },
    { wh:'how',   about:'way', ru:'как', de:'wie',
      ask:{ en:'a way or manner', de:'eine Art und Weise', ru:'способ' },
      ex:{ en:'How are you?', de:'Wie geht es dir?', ru:'Как дела?' } }
  ],

  /* Statement → yes/no → WH. Same noun, same verb. The only honest way
     to show that the question word sits on top of a system she already
     has rather than replacing it. */
  chains: [
    { id:'ch-be-place', aux:'be', about:'place', img:65,
      stmt:{ en:'Tanya is at home.', de:'Tanya ist zu Hause.', ru:'Таня дома.' },
      yn:  { en:'Is Tanya at home?', de:'Ist Tanya zu Hause?', ru:'Таня дома?' },
      wh:  { en:'Where is Tanya?', de:'Wo ist Tanya?', ru:'Где Таня?' } },
    { id:'ch-be-who', aux:'be', about:'person',
      stmt:{ en:'She is Tanya.', de:'Sie ist Tanya.', ru:'Она Таня.' },
      yn:  { en:'Is she Tanya?', de:'Ist sie Tanya?', ru:'Она Таня?' },
      wh:  { en:'Who is she?', de:'Wer ist sie?', ru:'Кто она?' } },
    { id:'ch-be-why', aux:'be', about:'reason', img:116,
      stmt:{ en:'Nazar is tired today.', de:'Nazar ist heute müde.', ru:'Назар сегодня устал.' },
      yn:  { en:'Is Nazar tired today?', de:'Ist Nazar heute müde?', ru:'Назар сегодня устал?' },
      wh:  { en:'Why is Nazar tired?', de:'Warum ist Nazar müde?', ru:'Почему Назар устал?' } },
    { id:'ch-be-how', aux:'be', about:'way',
      stmt:{ en:'The coffee is hot.', de:'Der Kaffee ist heiß.', ru:'Кофе горячий.' },
      yn:  { en:'Is the coffee hot?', de:'Ist der Kaffee heiß?', ru:'Кофе горячий?' },
      wh:  { en:'How is the coffee?', de:'Wie ist der Kaffee?', ru:'Какой кофе?' } },
    { id:'ch-does-place', aux:'does', about:'place', img:90,
      stmt:{ en:'Nazar goes to school.', de:'Nazar geht zur Schule.', ru:'Назар ходит в школу.' },
      yn:  { en:'Does Nazar go to school?', de:'Geht Nazar zur Schule?', ru:'Назар ходит в школу?' },
      wh:  { en:'Where does Nazar go?', de:'Wohin geht Nazar?', ru:'Куда ходит Назар?' } },
    { id:'ch-does-what', aux:'does', about:'thing', img:16,
      stmt:{ en:'Tanya needs a new jacket.', de:'Tanya braucht eine neue Jacke.', ru:'Тане нужна новая куртка.' },
      yn:  { en:'Does Tanya need a new jacket?', de:'Braucht Tanya eine neue Jacke?', ru:'Тане нужна новая куртка?' },
      wh:  { en:'What does Tanya need?', de:'Was braucht Tanya?', ru:'Что нужно Тане?' } },
    { id:'ch-does-how', aux:'does', about:'way', img:105,
      stmt:{ en:'She goes to work by bus.', de:'Sie fährt mit dem Bus zur Arbeit.', ru:'Она едет на работу на автобусе.' },
      yn:  { en:'Does she go to work by bus?', de:'Fährt sie mit dem Bus zur Arbeit?', ru:'Она едет на работу на автобусе?' },
      wh:  { en:'How does she go to work?', de:'Wie fährt sie zur Arbeit?', ru:'Как она едет на работу?' } },
    { id:'ch-did-time', aux:'did', about:'time', img:108,
      stmt:{ en:'The train left at ten.', de:'Der Zug fuhr um zehn ab.', ru:'Поезд ушёл в десять.' },
      yn:  { en:'Did the train leave at ten?', de:'Fuhr der Zug um zehn ab?', ru:'Поезд ушёл в десять?' },
      wh:  { en:'When did the train leave?', de:'Wann fuhr der Zug ab?', ru:'Когда ушёл поезд?' } },
    { id:'ch-did-place', aux:'did', about:'place',
      stmt:{ en:'They went to Berlin.', de:'Sie sind nach Berlin gefahren.', ru:'Они поехали в Берлин.' },
      yn:  { en:'Did they go to Berlin?', de:'Sind sie nach Berlin gefahren?', ru:'Они поехали в Берлин?' },
      wh:  { en:'Where did they go?', de:'Wohin sind sie gefahren?', ru:'Куда они поехали?' } },
    { id:'ch-did-why', aux:'did', about:'reason',
      stmt:{ en:'She left early.', de:'Sie ist früh gegangen.', ru:'Она ушла рано.' },
      yn:  { en:'Did she leave early?', de:'Ist sie früh gegangen?', ru:'Она ушла рано?' },
      wh:  { en:'Why did she leave early?', de:'Warum ist sie früh gegangen?', ru:'Почему она ушла рано?' } }
  ],

  /* who as subject against who as object. Nothing else in the sentence
     changes except which part is unknown. */
  whoPairs: [
    { id:'wp-call',
      subj:{ en:'Who called Tanya?', de:'Wer hat Tanya angerufen?', ru:'Кто звонил Тане?',
             prompt:'___ called Tanya?', answer:'Who', aux:'none' },
      obj: { en:'Who did Tanya call?', de:'Wen hat Tanya angerufen?', ru:'Кому звонила Таня?',
             prompt:'Who ___ Tanya call?', answer:'did', aux:'did' } },
    { id:'wp-see',
      subj:{ en:'Who saw Nazar?', de:'Wer hat Nazar gesehen?', ru:'Кто видел Назара?',
             prompt:'___ saw Nazar?', answer:'Who', aux:'none' },
      obj: { en:'Who did Nazar see?', de:'Wen hat Nazar gesehen?', ru:'Кого видел Назар?',
             prompt:'Who ___ Nazar see?', answer:'did', aux:'did' } },
    { id:'wp-invite',
      subj:{ en:'Who invited her?', de:'Wer hat sie eingeladen?', ru:'Кто её пригласил?',
             prompt:'___ invited her?', answer:'Who', aux:'none' },
      obj: { en:'Who did she invite?', de:'Wen hat sie eingeladen?', ru:'Кого она пригласила?',
             prompt:'Who ___ she invite?', answer:'did', aux:'did' } },
    { id:'wp-help',
      subj:{ en:'Who helped you?', de:'Wer hat dir geholfen?', ru:'Кто тебе помог?',
             prompt:'___ helped you?', answer:'Who', aux:'none' },
      /* direct address, gendered */
      obj: { en:'Who did you help?', de:'Wem hast du geholfen?',
             ru:'Кому ты помогла?', ruM:'Кому ты помог?',
             prompt:'Who ___ you help?', answer:'did', aux:'did' } },
    { id:'wp-live',
      subj:{ en:'Who lives here?', de:'Wer wohnt hier?', ru:'Кто здесь живёт?',
             prompt:'___ lives here?', answer:'Who', aux:'none' },
      obj: { en:'Who does she live with?', de:'Mit wem wohnt sie?', ru:'С кем она живёт?',
             prompt:'Who ___ she live with?', answer:'does', aux:'does' } }
  ],

  items: [
    /* ---------- choose the question word ---------- */
    { id:'eq01', wh:'who',   about:'person', aux:'be',   role:'other',
      prompt:'___ is that man?', answer:'Who',
      en:'Who is that man?', de:'Wer ist dieser Mann?', ru:'Кто этот мужчина?' },
    { id:'eq02', wh:'who',   about:'person', aux:'be',   role:'other',
      prompt:'___ is that woman?', answer:'Who',
      en:'Who is that woman?', de:'Wer ist diese Frau?', ru:'Кто эта женщина?' },
    { id:'eq03', wh:'what',  about:'thing',  aux:'be',   role:'other',
      prompt:'___ is this?', answer:'What',
      en:'What is this?', de:'Was ist das?', ru:'Что это?' },
    { id:'eq04', wh:'what',  about:'thing',  aux:'does', role:'other',
      prompt:'___ does this word mean?', answer:'What',
      en:'What does this word mean?', de:'Was bedeutet dieses Wort?', ru:'Что означает это слово?' },
    { id:'eq05', wh:'what',  about:'thing',  aux:'does', role:'other',
      prompt:'___ does she want?', answer:'What',
      en:'What does she want?', de:'Was will sie?', ru:'Чего она хочет?' },
    { id:'eq06', wh:'where', about:'place',  aux:'be',   role:'other', img:65,
      prompt:'___ are you?', answer:'Where',
      en:'Where are you?', de:'Wo bist du?', ru:'Где ты?' },
    { id:'eq07', wh:'where', about:'place',  aux:'do',   role:'other',
      prompt:'___ do you live?', answer:'Where',
      en:'Where do you live?', de:'Wo wohnst du?', ru:'Где ты живёшь?' },
    { id:'eq08', wh:'where', about:'place',  aux:'does', role:'other',
      prompt:'___ does she work?', answer:'Where',
      en:'Where does she work?', de:'Wo arbeitet sie?', ru:'Где она работает?' },
    { id:'eq09', wh:'where', about:'place',  aux:'did',  role:'other',
      prompt:'___ did they go? To Berlin.', answer:'Where',
      en:'Where did they go?', de:'Wohin sind sie gefahren?', ru:'Куда они поехали?' },
    { id:'eq10', wh:'when',  about:'time',   aux:'be',   role:'other',
      prompt:'___ is the lesson?', answer:'When',
      en:'When is the lesson?', de:'Wann ist der Unterricht?', ru:'Когда урок?' },
    /* GPT fix: aux was 'is', which is not a value the scheme allows. */
    { id:'eq11', wh:'when',  about:'time',   aux:'be',   role:'other',
      prompt:'___ is your birthday?', answer:'When',
      en:'When is your birthday?', de:'Wann hast du Geburtstag?', ru:'Когда у тебя день рождения?' },
    { id:'eq12', wh:'when',  about:'time',   aux:'did',  role:'other',
      prompt:'___ did she call? Yesterday.', answer:'When',
      en:'When did she call?', de:'Wann hat sie angerufen?', ru:'Когда она звонила?' },
    { id:'eq13', wh:'when',  about:'time',   aux:'did',  role:'other', img:108,
      prompt:'___ did the train leave?', answer:'When',
      en:'When did the train leave?', de:'Wann fuhr der Zug ab?', ru:'Когда ушёл поезд?' },
    /* direct address, gendered */
    { id:'eq14', wh:'why',   about:'reason', aux:'be',   role:'other', img:116,
      prompt:'___ are you tired?', answer:'Why',
      en:'Why are you tired?', de:'Warum bist du müde?',
      ru:'Почему ты устала?', ruM:'Почему ты устал?' },
    { id:'eq15', wh:'why',   about:'reason', aux:'be',   role:'other',
      prompt:'___ are they late?', answer:'Why',
      en:'Why are they late?', de:'Warum sind sie zu spät?', ru:'Почему они опоздали?' },
    { id:'eq16', wh:'why',   about:'reason', aux:'did',  role:'other',
      prompt:'___ did they leave early?', answer:'Why',
      en:'Why did they leave early?', de:'Warum sind sie früh gegangen?', ru:'Почему они ушли рано?' },
    { id:'eq17', wh:'how',   about:'way',    aux:'be',   role:'other',
      prompt:'___ are you?', answer:'How',
      en:'How are you?', de:'Wie geht es dir?', ru:'Как дела?' },
    { id:'eq18', wh:'how',   about:'way',    aux:'do',   role:'other', img:105,
      prompt:'___ do you go to work? By bus.', answer:'How',
      en:'How do you go to work?', de:'Wie fährst du zur Arbeit?', ru:'Как ты едешь на работу?' },
    { id:'eq19', wh:'how',   about:'way',    aux:'do',   role:'other',
      prompt:'___ do you make this?', answer:'How',
      en:'How do you make this?', de:'Wie machst du das?', ru:'Как ты это делаешь?' },

    /* ---------- what comes AFTER the question word ---------- */
    { id:'eq20', wh:'where', about:'place',  aux:'be',   slot:'aux',
      prompt:'Where ___ she?', answer:'is',
      en:'Where is she?', de:'Wo ist sie?', ru:'Где она?' },
    { id:'eq21', wh:'where', about:'place',  aux:'does', slot:'aux',
      prompt:'Where ___ she work?', answer:'does',
      en:'Where does she work?', de:'Wo arbeitet sie?', ru:'Где она работает?' },
    { id:'eq22', wh:'when',  about:'time',   aux:'did',  slot:'aux',
      prompt:'When ___ they arrive?', answer:'did',
      en:'When did they arrive?', de:'Wann sind sie angekommen?', ru:'Когда они приехали?' },
    /* direct address, gendered */
    { id:'eq23', wh:'why',   about:'reason', aux:'be',   slot:'aux',
      prompt:'Why ___ you tired?', answer:'are',
      en:'Why are you tired?', de:'Warum bist du müde?',
      ru:'Почему ты устала?', ruM:'Почему ты устал?' },
    { id:'eq24', wh:'what',  about:'thing',  aux:'does', slot:'aux',
      prompt:'What ___ he want?', answer:'does',
      en:'What does he want?', de:'Was will er?', ru:'Чего он хочет?' },
    { id:'eq25', wh:'where', about:'place',  aux:'be',   slot:'aux',
      prompt:'Where ___ your friends?', answer:'are',
      en:'Where are your friends?', de:'Wo sind deine Freunde?', ru:'Где твои друзья?' },
    { id:'eq26', wh:'why',   about:'reason', aux:'did',  slot:'aux',
      prompt:'Why ___ they leave early?', answer:'did',
      en:'Why did they leave early?', de:'Warum sind sie früh gegangen?', ru:'Почему они ушли рано?' },
    { id:'eq27', wh:'how',   about:'way',    aux:'do',   slot:'aux',
      prompt:'How ___ you go to work?', answer:'do',
      en:'How do you go to work?', de:'Wie fährst du zur Arbeit?', ru:'Как ты едешь на работу?' },
    { id:'eq28', wh:'when',  about:'time',   aux:'did',  slot:'aux',
      prompt:'When ___ he leave?', answer:'did',
      en:'When did he leave?', de:'Wann ist er gegangen?', ru:'Когда он ушёл?' },
    { id:'eq29', wh:'why',   about:'reason', aux:'be',   slot:'aux',
      prompt:'Why ___ they late?', answer:'are',
      en:'Why are they late?', de:'Warum sind sie zu spät?', ru:'Почему они опоздали?' },

    /* eq30–eq36 IN THE ORIGINAL BANK ARE NOT HERE.

       They were whole-question multiple choice — an `options` array of
       three complete sentences with no `___` slot. The engine's pick step
       is a gap inside one sentence, so those cannot be scored items; the
       same reason Lesson 2's "choose the correct sentence" became a
       reversal drill instead.

       Nothing is lost. Every error they tested is already in traps[]
       below, shown side by side against the right form, which is what
       the reference page and the lesson's read step both use:
       Where she works · Why they are late · When did he arrived ·
       Where does she works. Adding a scored whole-sentence step would
       need a new step kind in js/activities/lessons.js, which is a
       change to the engine rather than to this data. */

    /* ---------- who: subject or object ---------- */
    { id:'eq37', wh:'who', about:'person', aux:'none', role:'subject',
      prompt:'___ called you?', answer:'Who',
      en:'Who called you?', de:'Wer hat dich angerufen?', ru:'Кто тебе звонил?' },
    /* direct address, gendered */
    { id:'eq38', wh:'who', about:'person', aux:'did',  role:'object',
      prompt:'Who ___ you call?', answer:'did',
      en:'Who did you call?', de:'Wen hast du angerufen?',
      ru:'Кому ты звонила?', ruM:'Кому ты звонил?' },
    { id:'eq39', wh:'who', about:'person', aux:'none', role:'subject',
      prompt:'___ lives in this apartment?', answer:'Who',
      en:'Who lives in this apartment?', de:'Wer wohnt in dieser Wohnung?', ru:'Кто живёт в этой квартире?' },
    { id:'eq40', wh:'who', about:'person', aux:'did',  role:'object',
      prompt:'Who ___ she invite?', answer:'did',
      en:'Who did she invite?', de:'Wen hat sie eingeladen?', ru:'Кого она пригласила?' },
    { id:'eq41', wh:'who', about:'person', aux:'none', role:'subject',
      prompt:'___ wants pizza?', answer:'Who',
      en:'Who wants pizza?', de:'Wer will Pizza?', ru:'Кто хочет пиццу?' },
    { id:'eq42', wh:'who', about:'person', aux:'none', role:'subject',
      prompt:'___ lives here?', answer:'Who',
      en:'Who lives here?', de:'Wer wohnt hier?', ru:'Кто здесь живёт?' },
    { id:'eq43', wh:'who', about:'person', aux:'did',  role:'object',
      prompt:'Who ___ Tanya call?', answer:'did',
      en:'Who did Tanya call?', de:'Wen hat Tanya angerufen?', ru:'Кому звонила Таня?' },
    { id:'eq44', wh:'who', about:'person', aux:'none', role:'subject',
      prompt:'Who ___ Tanya?', answer:'called',
      en:'Who called Tanya?', de:'Wer hat Tanya angerufen?', ru:'Кто звонил Тане?' },

    /* ---------- extra recognition rows, so no sort bin is starved ---------- */
    { id:'eq45', wh:'who',   about:'person', aux:'be',
      prompt:'___ is Nazar?', answer:'Who',
      en:'Who is Nazar?', de:'Wer ist Nazar?', ru:'Кто такой Назар?' },
    { id:'eq46', wh:'what',  about:'thing',  aux:'be', img:47,
      prompt:'___ is on the table? Coffee.', answer:'What',
      en:'What is on the table?', de:'Was steht auf dem Tisch?', ru:'Что на столе?' },
    { id:'eq47', wh:'where', about:'place',  aux:'be', img:72,
      prompt:'___ is Tanya? In the kitchen.', answer:'Where',
      en:'Where is Tanya?', de:'Wo ist Tanya?', ru:'Где Таня?' },
    { id:'eq48', wh:'when',  about:'time',   aux:'do',
      prompt:'___ do they have breakfast? At seven.', answer:'When',
      en:'When do they have breakfast?', de:'Wann frühstücken sie?', ru:'Когда они завтракают?' },
    { id:'eq49', wh:'why',   about:'reason', aux:'does',
      prompt:'___ does she need a jacket? It is cold.', answer:'Why',
      en:'Why does she need a jacket?', de:'Warum braucht sie eine Jacke?', ru:'Почему ей нужна куртка?' },
    { id:'eq50', wh:'how',   about:'way',    aux:'be', img:48,
      prompt:'___ is the soup? Good.', answer:'How',
      en:'How is the soup?', de:'Wie ist die Suppe?', ru:'Какой суп?' }
  ],

  traps: [
    { from:'ru', wrong:'Where she works?', en:'Where does she work?',
      why:{ en:'Russian puts the question word first and stops. English still needs does.',
            de:'Russisch setzt das Fragewort nach vorn und ist fertig. Englisch braucht trotzdem does.',
            ru:'По-русски достаточно поставить вопросительное слово вперёд. По-английски после него всё ещё нужно does.' } },
    { from:'ru', wrong:'Why they are late?', en:'Why are they late?',
      why:{ en:'After why, be still moves in front of they.',
            de:'Nach why steht be weiter vor they.',
            ru:'После why глагол be всё равно встаёт перед they.' } },
    { from:'ru', wrong:'When he arrived?', en:'When did he arrive?',
      why:{ en:'Past questions take did plus the base verb. arrived stays arrived only in the statement.',
            de:'Vergangenheitsfragen nehmen did plus die Grundform. arrived bleibt nur in der Aussage.',
            ru:'В прошедшем вопросе — did и начальная форма. arrived остаётся только в утверждении.' } },
    { from:'both', wrong:'Where does she works?', en:'Where does she work?',
      why:{ en:'does already marks the person. The main verb stays work.',
            de:'does markiert die Person schon. Das Hauptverb bleibt work.',
            ru:'does уже показывает лицо. Основной глагол остаётся work.' } },
    { from:'both', wrong:'When did he arrived?', en:'When did he arrive?',
      why:{ en:'did already marks the past. The main verb goes back to arrive.',
            de:'did markiert die Vergangenheit schon. Das Hauptverb wird wieder arrive.',
            ru:'did уже показывает прошлое. Основной глагол возвращается к arrive.' } },
    { from:'ru', wrong:'Who did call Tanya?', en:'Who called Tanya?',
      why:{ en:'who is the person doing the action. No do/does/did.',
            de:'who ist die Person, die die Handlung ausführt. Kein do/does/did.',
            ru:'who — тот, кто делает действие. do/does/did не нужен.' } },
    { from:'de', wrong:'Who you called?', en:'Who did you call?',
      why:{ en:'who is the object here. You are the subject, so did stays.',
            de:'who ist hier das Objekt. Du bist das Subjekt, also bleibt did.',
            ru:'Здесь who — объект. Подлежащее — ты, поэтому did остаётся.' } }
  ],

  notes: [
    { en:'English where covers both German wo and wohin, and both Russian где and куда. That split is not taught in this lesson.',
      de:'Englisch where deckt wo und wohin ab, und где und куда. Diese Trennung steht nicht in dieser Lektion.',
      ru:'Английское where покрывает и wo, и wohin, и «где», и «куда». Это различие в уроке не учим.' },
    { en:'which, whose, whom, how much, how many, how long and how often wait for Questions II.',
      de:'which, whose, whom, how much, how many, how long und how often kommen in Questions II.',
      ru:'which, whose, whom, how much, how many, how long, how often — во втором уроке про вопросы.' }
  ]
};

window.GH_EN_QUESTIONS.byWh = function(wh){
  return (this.items || []).filter(function(x){ return x.wh === wh; });
};
window.GH_EN_QUESTIONS.byAbout = function(about){
  return (this.items || []).filter(function(x){ return x.about === about; });
};
window.GH_EN_QUESTIONS.item = function(id){
  var i, items = this.items || [];
  for (i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
  return null;
};
window.GH_EN_QUESTIONS.counts = function(){
  var c = { who:0, what:0, where:0, when:0, why:0, how:0 };
  (this.items || []).forEach(function(x){ if (c[x.wh] !== undefined) c[x.wh]++; });
  return c;
};
