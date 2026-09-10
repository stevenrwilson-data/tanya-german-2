/* data/songs.js */
/* The songs, as a line inventory rather than as running text.

   Verses are cumulative — each one adds a line and then walks back down
   through the ones before it — so a single line can appear five times in
   one song. Storing the text five times would mean five translations that
   drift apart, and a cloze generator that thinks ten timestamps are ten
   different items when they are four.

   So every distinct line gets an id, and everything else refers to it.
   Timestamps, when they arrive, attach to ids too.

   AN ID IS A POSITION, NOT A STRING. Two lines share an id only when all
   THREE languages are identical. Song 4's second verse ends with
   `Nicht dieser kleine Junge` twice and the Russian differs — «Но не
   этот…» then «Не этот…» — so those are two ids. Deduplicating on the
   German alone would have silently dropped a word from her own language,
   and nothing would have complained.

   The rule for the data, stated once: preserve every lyric line in its
   exact position and translate that line. Never rewrite, combine,
   deduplicate or substitute.

   audio  the filename in audio/, without an extension. OGG VORBIS ONLY.
          There is no second format and there will not be one — Steven,
          09 Sep: "There will never be m4a. Only ogg." Vorbis is tested
          on the Mac, the iPad and an iPhone older than Tanya's; anything
          that cannot decode it gets no music, and that is the accepted
          trade rather than a gap to fill
   lines  id -> the line in all three languages
   secs   the named blocks, each an ordered list of line ids
   play   the order the blocks run in the recording, so the chorus appears
          once in secs and four times here */

window.GH_SONGS = [
  {
    n: 1,
    audio: 'unterwegs-bei-sonne-unterwegs-bei-regen',
    title: { de: 'Unterwegs bei Sonne, unterwegs bei Regen', ru: 'В пути под солнцем, в пути под дождём', en: 'Out and About in Sunshine, Out and About in Rain' },
    lines: {
      s1l01: { de: 'Unterwegs bei jedem Wetter', ru: 'В пути в любую погоду', en: 'Out and about in every kind of weather' },
      s1l02: { de: 'Mit Bus, Zug, Straßenbahn, zu Fuß', ru: 'На автобусе, поезде, трамвае, пешком', en: 'By bus, train, tram, on foot' },
      s1l03: { de: 'Unterwegs durch den Tag', ru: 'В пути весь день', en: 'Out and about throughout the day' },
      s1l04: { de: 'Nach Hause, ins Geschäft, ins Krankenhaus', ru: 'Домой, в магазин, в больницу', en: 'Home, to the store, to the hospital' },
      s1l05: { de: 'Unterwegs Tag für Tag', ru: 'В пути день за днём', en: 'Out and about day after day' },
      s1l06: { de: 'Jeden Tag, jede Woche', ru: 'Каждый день, каждую неделю', en: 'Every day, every week' },
      s1l07: { de: 'Unterwegs im Sonnenschein, die Sonne scheint auf mich herab', ru: 'Быть в пути при солнечном свете — солнце светит на меня сверху', en: 'Being out and about in the sunshine, the sun shines down on me' },
      s1l08: { de: 'Warmes Sonnenlicht malt Freude auf mein Gesicht', ru: 'Тёплый солнечный свет рисует радость на моём лице', en: 'Warm sunlight paints joy on my face' },
      s1l09: { de: 'Durch dieses Sonnenlicht zu reisen erfüllt mein Herz', ru: 'Путешествовать сквозь этот солнечный свет наполняет моё сердце', en: 'Traveling through this sunlight fills my heart' },
      s1l10: { de: 'Doch Berlin liebt den Regen, also darf ich durch den Regen reisen', ru: 'Но Берлин любит дождь, поэтому мне приходится путешествовать под дождём', en: 'But Berlin loves the rain, so I get to travel through the rain' },
      s1l11: { de: 'Statt Wärme bekomme ich nasse Spritzer ab', ru: 'Вместо тепла на меня попадают мокрые брызги', en: 'Instead of warmth, I get wet splashes' },
      s1l12: { de: 'Und meine Schuhe füllen sich mit Wasser', ru: 'И мои туфли наполняются водой', en: 'And my shoes fill with water' },
      s1l13: { de: 'Wenn es warm ist, ist Reisen angenehm', ru: 'Когда тепло, путешествовать приятно', en: 'When it is warm, traveling is pleasant' },
      s1l14: { de: 'Ich bin unterwegs und meine Haut fühlt sich weich an', ru: 'Я в пути, и моя кожа кажется мягкой', en: 'I am out and about, and my skin feels soft' },
      s1l15: { de: 'Durch die Wärme zu reisen erfüllt mein Herz', ru: 'Путешествовать сквозь тепло наполняет моё сердце', en: 'Traveling through the warmth fills my heart' },
      s1l16: { de: 'Doch Berlin mag es kalt, also darf ich durch die Kälte reisen', ru: 'Но Берлин любит холод, поэтому мне приходится путешествовать по холоду', en: 'But Berlin likes it cold, so I get to travel through the cold' },
      s1l17: { de: 'Statt weicher Haut bekomme ich trockene Haut', ru: 'Вместо мягкой кожи у меня становится сухая кожа', en: 'Instead of soft skin, I get dry skin' },
      s1l18: { de: 'Und meine Füße werden auch kalt', ru: 'И мои ноги тоже мёрзнут', en: 'And my feet get cold too' },
      s1l19: { de: 'Am Morgen zu reisen ist angenehm, wenn der Tag noch jung ist', ru: 'Путешествовать утром приятно, когда день ещё молод', en: 'Traveling in the morning is pleasant, when the day is still young' },
      s1l20: { de: 'Ich spüre die frische Luft und den Wind in meinem Gesicht', ru: 'Я чувствую свежий воздух и ветер на своём лице', en: 'I feel the fresh air and the wind on my face' },
      s1l21: { de: 'Ich kann den Duft von frischem Kaffee riechen', ru: 'Я чувствую аромат свежего кофе', en: 'I can smell the aroma of fresh coffee' },
      s1l22: { de: 'Doch später am Tag, nach vielen langen Aufgaben', ru: 'Но позже днём, после множества долгих дел', en: 'But later in the day, after many long tasks' },
      s1l23: { de: 'Statt der Energie des Morgens bin ich erschöpft und müde', ru: 'Вместо утренней энергии я измотана и устала', en: 'Instead of the energy of the morning, I am exhausted and tired' },
      s1l24: { de: 'Und auch meine Füße tun weh', ru: 'И мои ноги тоже болят', en: 'And my feet hurt too' },
      s1l25: { de: 'Reisen ist Leben', ru: 'Путешествовать — значит жить', en: 'Traveling is life' },
      s1l26: { de: 'Ich gehe von Ort zu Ort', ru: 'Я хожу с места на место', en: 'I go from place to place' },
      s1l27: { de: 'Ich liebe so viele Dinge', ru: 'Я люблю так много всего', en: 'I love so many things' },
      s1l28: { de: 'Ich liebe warmes Sonnenlicht und frische Morgen', ru: 'Я люблю тёплый солнечный свет и свежие утра', en: 'I love warm sunlight and fresh mornings' },
      s1l29: { de: 'Doch ich werde müde, nass und kalt', ru: 'Но я устаю, промокаю и мёрзну', en: 'But I get tired, wet, and cold' },
      s1l30: { de: 'Manchmal will ich einfach nur zu Hause sitzen', ru: 'Иногда я просто хочу сидеть дома', en: 'Sometimes I simply want to sit at home' },
      s1l31: { de: 'Und eine Tasse heißen Kaffee trinken', ru: 'И пить чашку горячего кофе', en: 'And drink a cup of hot coffee' },
      s1l32: { de: 'Sonnenschein, Regen', ru: 'Солнечный свет, дождь', en: 'Sunshine, rain' },
      s1l33: { de: 'Warm, kalt', ru: 'Тепло, холод', en: 'Warm, cold' },
      s1l34: { de: 'Morgen, Abend', ru: 'Утро, вечер', en: 'Morning, evening' },
      s1l35: { de: 'Alles hat seine Zeit und seinen Platz', ru: 'У всего есть своё время и своё место', en: 'Everything has its time and its place' },
      s1l36: { de: 'Aber manchmal ist es zu Hause doch am schönsten', ru: 'Но иногда дома всё-таки лучше всего', en: 'But sometimes home really is the nicest place' },
      s1l37: { de: 'Zu Hause ist es am schönsten!', ru: 'Дома лучше всего!', en: 'Home is the nicest place!' },
    },
    secs: [
      { id: 'chorus', label: 'Chorus', lines: ['s1l01', 's1l02', 's1l03', 's1l04', 's1l05', 's1l06'] },
      { id: 'verse1', label: 'Verse 1', lines: ['s1l07', 's1l08', 's1l09', 's1l10', 's1l11', 's1l12'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s1l13', 's1l14', 's1l15', 's1l16', 's1l17', 's1l18'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s1l19', 's1l20', 's1l21', 's1l22', 's1l23', 's1l24'] },
      { id: 'bridge', label: 'Bridge', lines: ['s1l25', 's1l26', 's1l27', 's1l28', 's1l29', 's1l30', 's1l31'] },
      { id: 'outro', label: 'Outro', lines: ['s1l32', 's1l33', 's1l34', 's1l35', 's1l36', 's1l37'] },
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'outro'],
  },
  {
    n: 2,
    audio: 'das-bett-sieht-so-schoen-aus',
    title: { de: 'Das Bett sieht so schön aus', ru: 'Кровать выглядит такой красивой', en: 'The Bed Looks So Nice' },
    lines: {
      s2l01: { de: 'Es ist Morgen, später Vormittag, ich habe verschlafen, verschlafen!', ru: 'Утро, уже позднее утро, я проспала, проспала!', en: 'It is morning, late morning, I overslept, overslept!' },
      s2l02: { de: 'Schnell aufwachen, ich muss mich fertig machen!', ru: 'Быстро просыпайся, мне нужно собираться!', en: 'Wake up quickly, I have to get ready!' },
      s2l03: { de: 'Das Fenster lässt das Sonnenlicht herein', ru: 'Окно впускает солнечный свет', en: 'The window lets the sunlight in' },
      s2l04: { de: 'Ich will mich ausruhen, die Sonne ausschalten, wieder schlafen gehen', ru: 'Я хочу отдохнуть, выключить солнце и снова лечь спать', en: 'I want to rest, turn off the sun, go back to sleep' },
      s2l05: { de: 'Die Sonne scheint! Warum scheint sie? Aber sie scheint!', ru: 'Солнце светит! Почему оно светит? Но оно светит!', en: 'The sun is shining! Why is it shining? But it is shining!' },
      s2l06: { de: 'Ich bin wach, ich bin wach! Ich gähne und strecke mich', ru: 'Я не сплю, я не сплю! Я зеваю и потягиваюсь', en: 'I am awake, I am awake! I yawn and stretch' },
      s2l07: { de: 'Ich will mehr Schlaf!', ru: 'Я хочу ещё поспать!', en: 'I want more sleep!' },
      s2l08: { de: 'Die Sonne sagt: Wach auf, meine Augen sagen: Schlaf weiter!', ru: 'Солнце говорит: «Просыпайся!», а мои глаза говорят: «Спи дальше!»', en: 'The sun says: Wake up, my eyes say: Keep sleeping!' },
      s2l09: { de: 'Ich will schlafen', ru: 'Я хочу спать', en: 'I want to sleep' },
      s2l10: { de: 'Aber ich stehe auf!', ru: 'Но я встаю!', en: 'But I get up!' },
      s2l11: { de: 'Ich muss mich fertig machen, für einen weiteren Tag', ru: 'Мне нужно собираться на ещё один день', en: 'I have to get ready for another day' },
      s2l12: { de: 'Ich muss mich fertig machen, aber das Bett sieht so schön aus…', ru: 'Мне нужно собираться, но кровать выглядит такой красивой...', en: 'I have to get ready, but the bed looks so nice...' },
      s2l13: { de: 'Ich schaue in den Spiegel, ich brauche Make-up', ru: 'Я смотрю в зеркало, мне нужен макияж', en: 'I look in the mirror, I need makeup' },
      s2l14: { de: 'Ich brauche Mascara und Lippenstift und Parfüm', ru: 'Мне нужны тушь, помада и духи', en: 'I need mascara and lipstick and perfume' },
      s2l15: { de: 'Ich trage roten Lippenstift auf und benutze Gesichtscreme', ru: 'Я наношу красную помаду и пользуюсь кремом для лица', en: 'I apply red lipstick and use face cream' },
      s2l16: { de: 'Ich trage Mascara auf und trage Make-up auf', ru: 'Я наношу тушь и наношу макияж', en: 'I apply mascara and apply makeup' },
      s2l17: { de: 'Ich bürste meine Haare, schaue in den Spiegel', ru: 'Я расчёсываю волосы, смотрю в зеркало', en: 'I brush my hair, look in the mirror' },
      s2l18: { de: 'Ich bin fast fertig!', ru: 'Я почти готова!', en: 'I am almost ready!' },
      s2l19: { de: 'Noch ein Tag, noch ein Tag', ru: 'Ещё один день, ещё один день', en: 'Another day, another day' },
      s2l20: { de: 'Ich muss bald los, aber Schlafen klingt gut', ru: 'Мне скоро нужно уходить, но поспать звучит неплохо', en: 'I have to leave soon, but sleeping sounds good' },
      s2l21: { de: 'Ich muss bald los, aber das Bett sieht so schön aus…', ru: 'Мне скоро нужно уходить, но кровать выглядит такой красивой...', en: 'I have to leave soon, but the bed looks so nice...' },
      s2l22: { de: 'Ich gehe in die Küche, ich bin hungrig', ru: 'Я иду на кухню, я голодна', en: 'I go into the kitchen, I am hungry' },
      s2l23: { de: 'Ich trinke Kaffee und koche Eier', ru: 'Я пью кофе и готовлю яйца', en: 'I drink coffee and cook eggs' },
      s2l24: { de: 'Ich bereite Frühstück zu, ich frühstücke', ru: 'Я готовлю завтрак, я завтракаю', en: 'I prepare breakfast, I eat breakfast' },
      s2l25: { de: 'Ich esse einen Apfel, ich esse Eier', ru: 'Я ем яблоко, я ем яйца', en: 'I eat an apple, I eat eggs' },
      s2l26: { de: 'Ich wasche die Tasse und putze die Küche', ru: 'Я мою чашку и убираю кухню', en: 'I wash the cup and clean the kitchen' },
      s2l27: { de: 'Ich putze alles: Teller, Schüssel, Tasse, Gabel', ru: 'Я мою всё: тарелку, миску, чашку, вилку', en: 'I clean everything: plate, bowl, cup, fork' },
      s2l28: { de: 'Es ist fast Zeit zu gehen, aber Schlafen klingt gut', ru: 'Уже почти пора уходить, но поспать звучит неплохо', en: 'It is almost time to go, but sleeping sounds good' },
      s2l29: { de: 'Ich nehme die Schlüssel, mache mich fertig zum Gehen, aber das Bett sieht so schön aus…', ru: 'Я беру ключи, собираюсь уходить, но кровать выглядит такой красивой...', en: 'I take the keys, get ready to leave, but the bed looks so nice...' },
      s2l30: { de: 'Der Schlaf vergeht, ich muss mich dem Tag stellen', ru: 'Сон проходит, мне нужно встретить новый день', en: 'Sleep passes, I have to face the day' },
      s2l31: { de: 'Mit hoch erhobenem Kopf und meinen feuerroten Lippen', ru: 'С высоко поднятой головой и моими огненно-красными губами', en: 'With my head held high and my fiery-red lips' },
      s2l32: { de: 'Ich bin bereit für alles, was der Tag mir bringt', ru: 'Я готова ко всему, что принесёт мне этот день', en: 'I am ready for anything the day brings me' },
      s2l33: { de: 'Ich schnappe mir meine Handtasche und gehe zur Tür', ru: 'Я хватаю свою сумочку и иду к двери', en: 'I grab my handbag and go to the door' },
      s2l34: { de: 'Ich mache mich fertig zum Gehen und schalte die Lichter aus', ru: 'Я собираюсь уходить и выключаю свет', en: 'I get ready to leave and turn off the lights' },
      s2l35: { de: 'Die Sonne ist gemein, sie lässt mich nicht schlafen', ru: 'Солнце злое, оно не даёт мне спать', en: 'The sun is mean, it will not let me sleep' },
      s2l36: { de: 'Ich kann nur daran denken: Das Bett sieht so schön aus…', ru: 'Я могу думать только об одном: кровать выглядит такой красивой...', en: 'All I can think is: The bed looks so nice...' },
      s2l37: { de: 'Das Bett sieht so schön aus… Das Bett sieht so schön aus…', ru: 'Кровать выглядит такой красивой... Кровать выглядит такой красивой...', en: 'The bed looks so nice... The bed looks so nice...' },
      s2l38: { de: 'Das Bett sieht so schön aus!!', ru: 'Кровать выглядит такой красивой!!', en: 'The bed looks so nice!!' },
    },
    secs: [
      { id: 'chorus', label: 'Chorus', lines: ['s2l01', 's2l02', 's2l03', 's2l04'] },
      { id: 'verse1', label: 'Verse 1', lines: ['s2l05', 's2l06', 's2l07', 's2l08', 's2l09', 's2l10', 's2l11', 's2l12'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s2l13', 's2l14', 's2l15', 's2l16', 's2l17', 's2l18', 's2l19', 's2l20', 's2l21'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s2l22', 's2l23', 's2l24', 's2l25', 's2l26', 's2l27', 's2l28', 's2l29'] },
      { id: 'bridge', label: 'Bridge', lines: ['s2l30', 's2l31', 's2l32', 's2l33', 's2l34'] },
      { id: 'lastchorus', label: 'Last Chorus', lines: ['s2l01', 's2l02', 's2l03', 's2l04', 's2l35', 's2l36', 's2l37', 's2l38'] },
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'lastchorus'],
  },
  {
    /* The sequel to `Das Bett sieht so schön aus`, and placed next to it
       on purpose — she leaves the bed in that one and spends the whole of
       this one trying to get back to it. Reading them in order is the
       joke, so this sits at position 3 rather than at the end.

       No `n`. Five of the eight songs already have none, nothing reads it,
       and a number here would have to be renumbered every time a song is
       inserted. Position in this array is the identity; song-words.js keys
       on the audio stem, so inserting breaks no word list. */
    audio: 'mein-wunderbarer-bester-freund',
    title: { de: 'Mein wunderbarer bester Freund',
             ru: 'Мой замечательный лучший друг',
             en: 'My Wonderful Best Friend' },
    lines: {
      s9l01: { de: 'Mein Tag fing fast perfekt an', ru: 'Мой день начался почти идеально', en: 'My day started out almost perfect' },
      s9l02: { de: 'Dann fing mein Tag an …', ru: 'А потом начался мой день…', en: 'Then my day started…' },
      s9l03: { de: 'Ich machte den Fehler', ru: 'Я совершила ошибку —', en: 'I made the mistake of' },
      s9l04: { de: 'Aus meiner Haustür zu gehen, und', ru: 'Вышла из дома, и', en: 'Walking out my front door, and' },
      s9l05: { de: 'Ich kam schon wieder zu spät zu meinem Termin', ru: 'Я опять опоздала на встречу', en: 'I was late to my appointment again' },
      s9l06: { de: 'Mein BH-Träger tat mir an der Schulter weh', ru: 'Бретелька бюстгальтера натирала мне плечо', en: 'My bra strap made my shoulder sore' },
      s9l07: { de: 'Das Riemchen an meinem Schuh ging auf', ru: 'Ремешок на туфле расстегнулся', en: 'The strap on my shoe came loose' },
      s9l08: { de: 'Und meine Pfefferminzbonbons waren alle', ru: 'А мятные конфеты закончились', en: 'And I ran out of breath mints' },
      s9l09: { de: 'Die Sonne hörte auf zu scheinen, er hatte seine Arbeit getan', ru: 'Солнце перестало светить — оно сделало своё дело', en: 'The sun stopped shining; he had done his job' },
      s9l10: { de: 'Er hatte mich aus dem Bett geholt, dann schickte er seinen Freund: den Regen', ru: 'Оно вытащило меня из постели, а потом прислало своего друга — дождь', en: 'He had got me out of bed, then he sent his friend: rain' },
      s9l11: { de: 'Jetzt war ich nass, aber ich hielt den Kopf hoch', ru: 'Теперь я промокла, но всё равно держала голову высоко', en: 'I was now wet, but I kept my head held high' },
      s9l12: { de: 'Ich wusste, zu Hause wartete mein bester Freund auf mich', ru: 'Я знала: дома меня ждёт мой лучший друг', en: 'I knew that at home my best friend was waiting for me' },
      s9l13: { de: 'Weich und warm und wartet auf mich', ru: 'Мягкий, тёплый и ждёт меня', en: 'Soft and warm and waiting' },
      s9l14: { de: 'Immer da, wenn ich nach Hause komme', ru: 'Всегда на месте, когда я прихожу домой', en: 'Always there when I come home' },
      s9l15: { de: 'Mein wunderbarer, treuer bester Freund', ru: 'Мой замечательный, верный лучший друг', en: 'My wonderful, loyal best friend' },
      s9l16: { de: 'Mein Bett ist mein bester Freund', ru: 'Моя кровать — мой лучший друг', en: 'My bed is my best friend' },
      s9l17: { de: 'Mein Bett wird mich niemals verlassen', ru: 'Моя кровать никогда меня не покинет', en: 'My bed will never leave me' },
      s9l18: { de: 'Mein Bett wird mich niemals verlassen', ru: 'Моя кровать никогда меня не покинет', en: 'My bed will never leave me' },
      s9l19: { de: 'Mein Bett ist mein bester Freund', ru: 'Моя кровать — мой лучший друг', en: 'My bed is my best friend' },
      s9l20: { de: 'Mein Bett wird mich niemals verlassen', ru: 'Моя кровать никогда меня не покинет', en: 'My bed will never leave me' },
      s9l21: { de: 'Mein Bett wird mich niemals verlassen', ru: 'Моя кровать никогда меня не покинет', en: 'My bed will never leave me' },
      s9l22: { de: 'Ich vermisse mein Bett, ich will nach Hause', ru: 'Я скучаю по кровати, я хочу домой', en: 'I miss my bed, I want to go home' },
      s9l23: { de: 'Zu meinem weichen, warmen besten Freund!', ru: 'К моему мягкому и тёплому лучшему другу!', en: 'To my soft and warm best friend!' },
      s9l24: { de: 'Wo kommen die alle her?', ru: 'Откуда они все взялись?', en: 'Where did they all come from?' },
      s9l25: { de: 'Die Schlange vor dem Café ist heute lang', ru: 'Сегодня очередь за кофе такая длинная', en: 'The coffee line is long today' },
      s9l26: { de: 'Wissen all diese Leute denn nicht, dass ich meinen Kaffee brauche?', ru: 'Неужели все эти люди не знают, что мне нужен кофе?', en: 'Don\'t all these people know I need my coffee?' },
      s9l27: { de: 'Warum sind sie alle hier?', ru: 'Почему они все здесь?', en: 'Why are they all here?' },
      s9l28: { de: 'Ich warte und warte', ru: 'Я жду и жду', en: 'I wait and wait' },
      s9l29: { de: 'Und ich warte auch noch und warte', ru: 'А потом ещё жду и жду', en: 'And I also wait and wait' },
      s9l30: { de: 'Und während ich warte, bin ich', ru: 'И пока я жду, меня', en: 'And while I wait, I am' },
      s9l31: { de: 'Umgeben von Menschen', ru: 'Окружают люди,', en: 'Surrounded by people' },
      s9l32: { de: 'Die köstlichen Kaffee trinken', ru: 'Которые пьют восхитительный кофе', en: 'Drinking delicious coffee' },
      s9l33: { de: 'Endlich bestelle ich', ru: 'Наконец я делаю заказ', en: 'Finally, I order' },
      s9l34: { de: 'Doch dann darf ich warten und warten', ru: 'Но потом мне выпадает счастье ждать и ждать', en: 'But then I get to wait, and wait' },
      s9l35: { de: 'Und während ich warte, darf ich', ru: 'И пока я жду, мне также', en: 'And while I wait, I also' },
      s9l36: { de: 'Auch noch warten …', ru: 'Можно ещё подождать…', en: 'Get to wait…' },
      s9l37: { de: 'Endlich – ein Sieg! Mein Kaffee kommt', ru: 'Наконец-то — победа! Мой кофе готов', en: 'At last—victory! My coffee arrives' },
      s9l38: { de: 'Kaffee in meiner Hand', ru: 'Кофе в моей руке', en: 'Coffee in my hand' },
      s9l39: { de: 'Ein Lächeln auf meinem Gesicht', ru: 'Улыбка на моём лице', en: 'A smile on my face' },
      s9l40: { de: 'Doch jetzt gibt es keinen freien Platz', ru: 'Но теперь негде сесть', en: 'But now there\'s nowhere to sit' },
      s9l41: { de: 'Ich war müde, aber ich hielt den Kopf hoch', ru: 'Я устала, но всё равно держала голову высоко', en: 'I was tired, but I kept my head held high' },
      s9l42: { de: 'Ich wusste, zu Hause wartete mein bester Freund auf mich', ru: 'Я знала: дома меня ждёт мой лучший друг', en: 'I knew that at home my best friend was waiting for me' },
      s9l43: { de: 'Irgendwie, ich weiß nicht wie', ru: 'Как-то — сама не знаю как —', en: 'Somehow, I don\'t know how' },
      s9l44: { de: 'Habe ich noch einen Tag überstanden', ru: 'Я пережила ещё один день', en: 'I made it through another day' },
      s9l45: { de: 'Endlich auf dem Heimweg, endlich, endlich', ru: 'Наконец-то еду домой, наконец-то, наконец-то', en: 'Going home at last, at last' },
      s9l46: { de: 'Fast liegt ein Lächeln auf meinem müden Gesicht', ru: 'На моём усталом лице почти появилась улыбка', en: 'I almost have a smile on my tired face' },
      s9l47: { de: 'Jetzt werde ich zwischen Körpern zerquetscht', ru: 'Теперь меня зажало между людьми', en: 'Now I\'m crushed between bodies' },
      s9l48: { de: 'In der überfüllten Bahn auf dem Heimweg', ru: 'В переполненном поезде по дороге домой', en: 'On the crowded train going home' },
      s9l49: { de: 'Die Hälfte dieser Leute weiß nicht, wie man duscht', ru: 'Половина этих людей не знает, как принимать душ', en: 'Half of these people don\'t know how to bathe' },
      s9l50: { de: 'Und ein kleiner Hund rammelt mein Bein', ru: 'А маленькая собачка совокупляется с моей ногой', en: 'And a little dog is humping my leg' },
      s9l51: { de: 'Noch drei', ru: 'Ещё три', en: 'Three more' },
      s9l52: { de: 'Nur noch drei Stationen, dann', ru: 'Всего три остановки, и', en: 'Just three more stops until' },
      s9l53: { de: 'Kann ich endlich aussteigen', ru: 'Я наконец смогу выйти', en: 'I can finally get off' },
      s9l54: { de: 'Und wieder frische Luft atmen', ru: 'И снова вдохнуть свежий воздух', en: 'And breathe fresh air again' },
      s9l55: { de: 'Ich war müde, aber ich hielt den Kopf hoch', ru: 'Я устала, но всё равно держала голову высоко', en: 'I was tired, but I kept my head held high' },
      s9l56: { de: 'Ich wusste, zu Hause wartete mein bester Freund auf mich', ru: 'Я знала: дома меня ждёт мой лучший друг', en: 'I knew that at home my best friend was waiting for me' },
      s9l57: { de: 'Dort auf meinem Bahnsteig steht ein kleiner Gebäckstand', ru: 'Там, на моей платформе, стоит маленький киоск с выпечкой', en: 'There on my platform, a little pastry stand' },
      s9l58: { de: 'Ich wollte doch nur ein Schokoladencroissant', ru: 'Я всего лишь хотела шоколадный круассан', en: 'I just wanted a chocolate croissant' },
      s9l59: { de: 'Aber sie waren ausverkauft', ru: 'Но они закончились', en: 'But they were out of them' },
      s9l60: { de: 'Mandelcroissants hatten sie noch', ru: 'Остались только миндальные', en: 'They still had almond' },
      s9l61: { de: 'Ich mag keine Mandeln', ru: 'Я не люблю миндаль', en: 'I don\'t like almond' },
      s9l62: { de: 'Ich bin müde, aber ich halte den Kopf hoch', ru: 'Я устала, но всё равно держу голову высоко', en: 'I am tired, but I keep my head held high' },
      s9l63: { de: 'Denn irgendwo zu Hause', ru: 'Потому что где-то дома', en: 'Because somewhere at home' },
      s9l64: { de: 'Wartet mein bester und treuer Freund', ru: 'Мой лучший и верный друг', en: 'My best and loyal friend' },
      s9l65: { de: 'Noch immer auf mich', ru: 'Всё ещё ждёт меня', en: 'Is still waiting for me' },
      s9l66: { de: 'Ich komme halb besiegt nach Hause', ru: 'Я прихожу домой, наполовину побеждённая', en: 'I arrive home, half defeated' },
      s9l67: { de: 'Hungrig genug, um drei Abendessen zu essen', ru: 'Голодная настолько, что могла бы съесть три ужина', en: 'With enough hunger to eat three dinners' },
      s9l68: { de: 'Aber ohne genug Kraft, auch nur eines zu machen', ru: 'Но без сил приготовить хотя бы один', en: 'But no energy to make even one' },
      s9l69: { de: 'Ich greife nach einem Apfel', ru: 'Я тянусь за яблоком', en: 'I reach for an apple' },
      s9l70: { de: 'Es ist mein letzter', ru: 'Оно последнее', en: 'It\'s my last one' },
      s9l71: { de: 'Jetzt ist er mein Abendessen, denn', ru: 'Теперь это мой ужин, потому что', en: 'It\'s my dinner now, because' },
      s9l72: { de: 'Alles andere macht zu viel Arbeit', ru: 'Всё остальное требует слишком много усилий', en: 'Everything else takes too much work' },
      s9l73: { de: 'Nach diesem Abendessen', ru: 'После этого ужина', en: 'After that dinner' },
      s9l74: { de: 'Diesem herrlichen Abendessen', ru: 'Этого великолепного ужина', en: 'That glorious dinner' },
      s9l75: { de: 'Kann ich wieder mit meinem besten Freund vereint sein', ru: 'Я наконец смогу воссоединиться со своим лучшим другом', en: 'I can be reunited with my best friend' },
      s9l76: { de: 'Endlich, endlich!', ru: 'Наконец-то, наконец-то!', en: 'At last, at last!' },
      s9l77: { de: 'Mein bester und treuer Freund', ru: 'Мой лучший и верный друг,', en: 'My best and loyal friend' },
      s9l78: { de: 'Der den ganzen Tag auf mich gewartet hat', ru: 'Который ждал меня весь день', en: 'Who waited for me all day' },
      s9l79: { de: 'Mit müden Händen', ru: 'Усталыми руками', en: 'With tired hands' },
      s9l80: { de: 'Öffne ich meine Schlafzimmertür', ru: 'Я открываю дверь спальни', en: 'I open my bedroom door' },
      s9l81: { de: 'Da ist mein bester Freund', ru: 'Вот он, мой лучший друг', en: 'There\'s my best friend' },
      s9l82: { de: 'Ich habe dich heute Morgen nicht einmal zurechtgemacht', ru: 'Этим утром я даже не застелила тебя', en: 'I didn\'t even make you this morning' },
      s9l83: { de: 'Du hast den ganzen Tag auf mich gewartet', ru: 'Ты ждал меня весь день', en: 'You waited for me all day' },
      s9l84: { de: 'Und sieh nur, wie schlecht', ru: 'И только посмотри, как плохо', en: 'And look how poorly' },
      s9l85: { de: 'Ich meinen besten Freund behandelt habe', ru: 'Я обращалась со своим лучшим другом', en: 'I treated my best friend' },
      s9l86: { de: 'Mein bester Freund ist mein bester Freund', ru: 'Мой лучший друг — мой лучший друг', en: 'My best friend is my best friend' },
      s9l87: { de: 'Meinem besten Freund ist das egal', ru: 'Моему лучшему другу всё равно', en: 'My best friend doesn\'t care' },
      s9l88: { de: 'Er sagt einfach:', ru: 'Он просто говорит:', en: 'He just says,' },
      s9l89: { de: '„Komm, umarme mich', ru: '«Иди ко мне, обними меня', en: '"Come, give me a hug' },
      s9l90: { de: 'Ich habe dich den ganzen Tag vermisst“', ru: 'Я скучал по тебе весь день»', en: 'I\'ve missed you all day"' },
      s9l91: { de: 'Diese Umarmung war die beste Umarmung überhaupt', ru: 'Это были лучшие объятия на свете', en: 'That hug was the best hug ever' },
      s9l92: { de: 'Weicher, liebevoller, sanfter', ru: 'Мягче, добрее, нежнее —', en: 'Softer, kinder, gentler' },
      s9l93: { de: 'Besser, als eine Umarmung', ru: 'Лучше, чем любые объятия', en: 'Better than any hug' },
      s9l94: { de: 'Überhaupt sein dürfte', ru: 'Вообще имеют право быть', en: 'Had any right to be' },
      s9l95: { de: 'Sie ließ meinen ganzen Tag dahinschmelzen', ru: 'Они растопили весь мой тяжёлый день', en: 'It melted away my day' },
      s9l96: { de: 'Ich lag da', ru: 'Я лежала', en: 'I lay there' },
      s9l97: { de: 'Und flüsterte leise:', ru: 'И тихо прошептала:', en: 'And softly whispered,' },
      s9l98: { de: '„Ich verlasse dich nie wieder', ru: '«Я больше никогда тебя не покину', en: '"I\'m never leaving you again' },
      s9l99: { de: 'Ich verlasse dich nie wieder“', ru: 'Я больше никогда тебя не покину»', en: 'I\'m never leaving you again"' },
      s9l100: { de: 'Ich verlasse dich nie wieder!', ru: 'Я больше никогда тебя не покину!', en: 'I\'m never leaving you again!' },
      s9l101: { de: 'Ich warf meinen Wecker in den Müll.', ru: 'Я выбросила будильник в мусор.', en: 'I threw my alarm clock in the trash.' },
    },
    /* `secs`, not `sections` — songbook.js reads song.secs, and the other
       eight all use it. Naming it from memory rather than from the file
       gave this song a title and an empty page. */
    secs: [
      { id: 'verse1', label: 'Verse 1', lines: ['s9l01', 's9l02', 's9l03', 's9l04', 's9l05', 's9l06', 's9l07', 's9l08', 's9l09', 's9l10', 's9l11', 's9l12'] },
      { id: 'chorus', label: 'Chorus', lines: ['s9l13', 's9l14', 's9l15', 's9l16', 's9l17', 's9l18', 's9l19', 's9l20', 's9l21', 's9l22', 's9l23'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s9l24', 's9l25', 's9l26', 's9l27', 's9l28', 's9l29', 's9l30', 's9l31', 's9l32', 's9l33', 's9l34', 's9l35', 's9l36', 's9l37', 's9l38', 's9l39', 's9l40', 's9l41', 's9l42'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s9l43', 's9l44', 's9l45', 's9l46', 's9l47', 's9l48', 's9l49', 's9l50', 's9l51', 's9l52', 's9l53', 's9l54', 's9l55', 's9l56'] },
      { id: 'bridge', label: 'Bridge', lines: ['s9l57', 's9l58', 's9l59', 's9l60', 's9l61', 's9l62', 's9l63', 's9l64', 's9l65'] },
      { id: 'verse4', label: 'Verse 4', lines: ['s9l66', 's9l67', 's9l68', 's9l69', 's9l70', 's9l71', 's9l72', 's9l73', 's9l74', 's9l75', 's9l76', 's9l77', 's9l78', 's9l79', 's9l80', 's9l81', 's9l82', 's9l83', 's9l84', 's9l85'] },
      { id: 'outro', label: 'Ending', lines: ['s9l86', 's9l87', 's9l88', 's9l89', 's9l90', 's9l91', 's9l92', 's9l93', 's9l94', 's9l95', 's9l96', 's9l97', 's9l98', 's9l99', 's9l100', 's9l101'] },
    ],
    /* The chorus is written once and played four times. */
    play: ['verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'verse4', 'chorus', 'outro'],
  },
  {
    n: 3,
    audio: 'dein-koerper-braucht-liebe',
    title: { de: 'Dein Körper braucht Liebe', ru: 'Твоему телу нужна любовь', en: 'Your Body Needs Love' },
    lines: {
      s3l01: { de: 'Dein Körper fühlt sich gut, wenn du dich bewegst,', ru: 'Твоему телу хорошо, когда ты двигаешься,', en: 'Your body feels good when you move,' },
      s3l02: { de: 'Er liebt Musik und Rhythmus, wenn du tanzt und gehst.', ru: 'Оно любит музыку и ритм, когда ты танцуешь и ходишь.', en: 'It loves music and rhythm when you dance and walk.' },
      s3l03: { de: 'Wenn dich etwas juckt, dann kratz dich sacht,', ru: 'Если что-то чешется, осторожно почешись,', en: 'When something itches, scratch yourself gently,' },
      s3l04: { de: 'Dein Körper braucht Liebe, drum gib gut auf ihn acht.', ru: 'Твоему телу нужна любовь, поэтому хорошо о нём заботься.', en: 'Your body needs love, so take good care of it.' },
      s3l05: { de: 'Ich kenne eine liebe Frau,', ru: 'Я знаю одну милую женщину,', en: 'I know a lovely woman,' },
      s3l06: { de: 'sie blinzelt mit den Augen, weil die Sonne hell scheint.', ru: 'она моргает глазами, потому что солнце светит ярко.', en: 'she blinks her eyes because the sun is shining brightly.' },
      s3l07: { de: 'Sie wirft die Haare zurück, weil der Wind so stark weht.', ru: 'Она откидывает волосы назад, потому что ветер дует так сильно.', en: 'She tosses her hair back because the wind is blowing so strongly.' },
      s3l08: { de: 'Sie blinzelt mit den Augen, weil die Sonne hell scheint.', ru: 'Она моргает глазами, потому что солнце светит ярко.', en: 'She blinks her eyes because the sun is shining brightly.' },
      s3l09: { de: 'Sie verschränkt die Arme, weil ihr kalt ist.', ru: 'Она скрещивает руки, потому что ей холодно.', en: 'She crosses her arms because she is cold.' },
      s3l10: { de: 'Sie zeigt mit den Fingern nach oben, weil sie etwas am Himmel sieht.', ru: 'Она показывает пальцами вверх, потому что видит что-то в небе.', en: 'She points upward with her fingers because she sees something in the sky.' },
      s3l11: { de: 'sie wippt mit den Füßen, weil sie ein Lied im Kopf hat.', ru: 'она покачивает ногами, потому что у неё в голове звучит песня.', en: 'she taps her feet because she has a song in her head.' },
      s3l12: { de: 'Sie klatscht in die Hände, weil sie den Rhythmus fühlt.', ru: 'Она хлопает в ладоши, потому что чувствует ритм.', en: 'She claps her hands because she feels the rhythm.' },
      s3l13: { de: 'Sie wippt mit den Füßen, weil sie ein Lied im Kopf hat.', ru: 'Она покачивает ногами, потому что у неё в голове звучит песня.', en: 'She taps her feet because she has a song in her head.' },
      s3l14: { de: 'Sie wackelt mit dem Rücken, weil sie gern tanzt.', ru: 'Она двигает спиной, потому что любит танцевать.', en: 'She wiggles her back because she likes to dance.' },
      s3l15: { de: 'Sie lauscht mit den Ohren, weil sie ein Geräusch hört.', ru: 'Она прислушивается, потому что слышит звук.', en: 'She listens attentively with her ears because she hears a sound.' },
      s3l16: { de: 'sie lackiert sich die Fingernägel, weil sie Rosa mag.', ru: 'она красит ногти, потому что любит розовый цвет.', en: 'she paints her fingernails because she likes pink.' },
      s3l17: { de: 'Sie wäscht ihr Gesicht, weil sie sich gern sauber fühlt.', ru: 'Она умывает лицо, потому что ей нравится чувствовать себя чистой.', en: 'She washes her face because she likes feeling clean.' },
      s3l18: { de: 'Sie lackiert sich die Fingernägel, weil sie Rosa mag.', ru: 'Она красит ногти, потому что любит розовый цвет.', en: 'She paints her fingernails because she likes pink.' },
      s3l19: { de: 'Sie cremt ihre Haut ein, weil sie sich gern weich anfühlt.', ru: 'Она наносит крем на кожу, потому что ей нравится, когда кожа мягкая.', en: 'She applies cream to her skin because she likes it to feel soft.' },
      s3l20: { de: 'Sie zeigt ihre Zähne, weil sie gern lächelt.', ru: 'Она показывает зубы, потому что любит улыбаться.', en: 'She shows her teeth because she likes to smile.' },
      s3l21: { de: 'Alle Teile machen mit,', ru: 'Все части тела участвуют,', en: 'All the parts join in,' },
      s3l22: { de: 'tragen dich bei jedem Schritt.', ru: 'они несут тебя с каждым шагом.', en: 'they carry you with every step.' },
      s3l23: { de: 'Bei Sonne, Regen, Wind und Schnee,', ru: 'При солнце, дожде, ветре и снеге,', en: 'In sun, rain, wind, and snow,' },
      s3l24: { de: 'weiter, weiter – geh, geh, geh!', ru: 'вперёд, вперёд — иди, иди, иди!', en: 'onward, onward — go, go, go!' },
      s3l25: { de: 'Schnell, langsam – ganz egal,', ru: 'Быстро, медленно — всё равно,', en: 'Fast, slow — it does not matter,' },
      s3l26: { de: 'beweg dich weiter, jedes Mal.', ru: 'продолжай двигаться каждый раз.', en: 'keep moving, every time.' },
      s3l27: { de: 'sie kratzt sich an der Nase, weil ihre Nase juckt.', ru: 'она чешет нос, потому что у неё чешется нос.', en: 'she scratches her nose because her nose itches.' },
      s3l28: { de: 'Sie streckt ihr Bein, weil sie einen Krampf hat.', ru: 'Она вытягивает ногу, потому что у неё судорога.', en: 'She stretches her leg because she has a cramp.' },
      s3l29: { de: 'Sie kratzt sich an der Nase, weil ihre Nase juckt.', ru: 'Она чешет нос, потому что у неё чешется нос.', en: 'She scratches her nose because her nose itches.' },
      s3l30: { de: 'Sie reibt sich den Bauch, weil sie Hunger hat.', ru: 'Она трёт живот, потому что голодна.', en: 'She rubs her stomach because she is hungry.' },
      s3l31: { de: 'Sie reibt sich den Kopf, weil sie Kopfschmerzen hat.', ru: 'Она трёт голову, потому что у неё болит голова.', en: 'She rubs her head because she has a headache.' },
      s3l32: { de: 'Dein Leben ist dein Körper,', ru: 'Твоя жизнь — это твоё тело,', en: 'Your life is your body,' },
      s3l33: { de: 'dein Körper ist dein Leben.', ru: 'твоё тело — это твоя жизнь.', en: 'your body is your life.' },
      s3l34: { de: 'Dein Körper ist besonders,', ru: 'Твоё тело особенное,', en: 'Your body is special,' },
      s3l35: { de: 'das schönste Geschenk, das es geben kann!', ru: 'самый прекрасный подарок, который только может быть!', en: 'the most beautiful gift there can be!' },
      s3l36: { de: 'Lieb ihn jeden Tag,', ru: 'Люби его каждый день,', en: 'Love it every day,' },
      s3l37: { de: 'lieb ihn jeden Tag.', ru: 'люби его каждый день.', en: 'love it every day.' },
    },
    secs: [
      { id: 'chorus', label: 'Chorus', lines: ['s3l01', 's3l02', 's3l03', 's3l04'] },
      { id: 'verse1', label: 'Verse 1', lines: ['s3l05', 's3l06', 's3l07', 's3l08', 's3l09', 's3l07', 's3l08', 's3l10', 's3l09', 's3l07', 's3l08'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s3l05', 's3l11', 's3l12', 's3l13', 's3l14', 's3l12', 's3l13', 's3l15', 's3l14', 's3l12', 's3l13'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s3l05', 's3l16', 's3l17', 's3l18', 's3l19', 's3l17', 's3l18', 's3l20', 's3l19', 's3l17', 's3l18'] },
      { id: 'bridge', label: 'Bridge', lines: ['s3l21', 's3l22', 's3l23', 's3l24', 's3l25', 's3l26'] },
      { id: 'verse4', label: 'Verse 4', lines: ['s3l05', 's3l27', 's3l28', 's3l29', 's3l30', 's3l28', 's3l29', 's3l31', 's3l30', 's3l28', 's3l29'] },
      { id: 'outro', label: 'Outro', lines: ['s3l32', 's3l33', 's3l34', 's3l35', 's3l36', 's3l37'] },
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'verse4', 'chorus', 'outro'],
  },
  {
    /* Line-for-line against the German. An id is a POSITION, not a
       string: two lines share one only when all three languages match
       exactly. Verse 2 ends with `Nicht dieser kleine Junge` twice and
       the Russian differs — «Но не этот…» then «Не этот…» — so those are
       two ids. Deduplicating on the German would have silently dropped a
       word from her own language. */
    title: { de: 'Der kleine Ninja', ru: 'Маленький ниндзя', en: 'Tiny Ninja' },
    audio: 'der-kleine-ninja',
    lines: {
      s4l01: { de: 'Kleiner Junge, große Träume', ru: 'Маленький мальчик, большие мечты', en: 'Tiny boy, big dreams' },
      s4l02: { de: 'Doch nichts ist ganz so, wie es scheint', ru: 'Но всё не совсем так, как кажется', en: 'But nothing is quite what it seems' },
      s4l03: { de: 'Sein großes Herz kennt nur einen Weg', ru: 'Его большое сердце знает только один путь', en: 'His big heart knows only one path' },
      s4l04: { de: 'Er will später einmal Ninja sein', ru: 'Когда он вырастет, он хочет стать ниндзя', en: 'He wants to be a ninja when he grows up' },
      s4l05: { de: 'Du kannst auf ihn einreden, bis du heiser bist', ru: 'Можно уговаривать его, пока не охрипнешь', en: 'You can talk to him until you’re hoarse' },
      s4l06: { de: 'Doch er wird dir immer wieder sagen:', ru: 'Но он будет снова и снова говорить тебе:', en: 'But he’ll keep telling you again and again:' },
      s4l07: { de: 'Ein kleiner Junge geht zur Schule und lernt', ru: 'Маленький мальчик ходит в школу и учится', en: 'A little boy goes to school and learns' },
      s4l08: { de: 'Mit Büchern, Bleistiften und Papier', ru: 'С книгами, карандашами и бумагой', en: 'With books, pencils, and paper' },
      s4l09: { de: 'Er sitzt an seinem Tisch', ru: 'Он сидит за своей партой', en: 'He sits at his desk' },
      s4l10: { de: 'Er hört dem Lehrer zu', ru: 'Он слушает учителя', en: 'He listens to the teacher' },
      s4l11: { de: 'Und tut so, als würde er alles verstehen', ru: 'И делает вид, что всё понимает', en: 'And pretends that he understands everything' },
      s4l12: { de: 'Manchmal lächelt er sogar', ru: 'Иногда он даже улыбается', en: 'Sometimes he even smiles' },
      s4l13: { de: 'Und hebt die Hand', ru: 'И поднимает руку', en: 'And raises his hand' },
      s4l14: { de: 'Er macht einfach mit, doch ich weiß genau …', ru: 'Он просто делает вид, что участвует, но я всё прекрасно знаю…', en: 'He plays along, but I know exactly what’s going on…' },
      s4l15: { de: 'Andere Kinder lachen und spielen', ru: 'Другие дети смеются и играют', en: 'The other children laugh and play' },
      s4l16: { de: 'Sie wollen später einmal', ru: 'Когда они вырастут, они хотят стать', en: 'When they grow up, they want to be' },
      s4l17: { de: 'So viele verschiedene Dinge werden', ru: 'Самыми разными людьми', en: 'So many different things' },
      s4l18: { de: 'Arzt oder Anwalt', ru: 'Врачом или адвокатом', en: 'A doctor or a lawyer' },
      s4l19: { de: 'Filmstar oder Schauspieler', ru: 'Кинозвездой или актёром', en: 'A movie star or an actor' },
      s4l20: { de: 'Vielleicht Bäcker oder Klempner', ru: 'Может быть, пекарем или сантехником', en: 'Maybe a baker or a plumber' },
      s4l21: { de: 'Oder Rennfahrer', ru: 'Или автогонщиком', en: 'Or a race car driver' },
      s4l22: { de: 'Nicht dieser kleine Junge', ru: 'Но не этот маленький мальчик', en: 'Not this little boy' },
      s4l23: { de: 'Nicht dieser kleine Junge', ru: 'Не этот маленький мальчик', en: 'Not this little boy' },
      s4l24: { de: 'In Gedanken klettert er die Wände hoch', ru: 'В своих мыслях он взбирается по стенам', en: 'In his mind, he climbs the walls' },
      s4l25: { de: 'Läuft durch Schatten, durch die Gänge', ru: 'Бежит сквозь тени по коридорам', en: 'Runs through shadows, down the halls' },
      s4l26: { de: 'Er kann springen, er kann sich verstecken', ru: 'Он умеет прыгать, умеет прятаться', en: 'He can jump, he can hide' },
      s4l27: { de: 'Und sich draußen ganz leise bewegen', ru: 'И бесшумно двигаться на улице', en: 'And move quietly outside' },
      s4l28: { de: 'Die Bücher liegen offen auf seinem Tisch', ru: 'Книги лежат открытыми на его парте', en: 'The books lie open on his desk' },
      s4l29: { de: 'Doch seine Gedanken sind ganz woanders', ru: 'Но мыслями он совсем в другом месте', en: 'But his mind is somewhere else' },
      s4l30: { de: 'Der Lehrer fragt: „Was willst du einmal werden?“', ru: 'Учитель спрашивает: «Кем ты хочешь стать, когда вырастешь?»', en: 'The teacher asks, “What do you want to be when you grow up?”' },
      s4l31: { de: 'Er kennt die Antwort schon …', ru: 'Он уже знает ответ…', en: 'He already knows the answer…' },
      s4l32: { de: 'Du kannst mit ihm reden, bis deine Stimme versagt', ru: 'Можно говорить с ним, пока не пропадёт голос', en: 'You can talk to him until your voice gives out' },
      s4l33: { de: 'Du wirst seine Meinung nicht ändern', ru: 'Ты не изменишь его решения', en: 'You won’t change his mind' },
      s4l34: { de: 'So klein er auch ist', ru: 'Каким бы маленьким он ни был', en: 'No matter how small he is' },
      s4l35: { de: 'Ja, er ist noch ein kleiner Junge', ru: 'Да, он ещё маленький мальчик', en: 'Yes, he’s still a little boy' },
      s4l36: { de: 'Doch er hat große Träume', ru: 'Но у него большие мечты', en: 'But he’s got big dreams' },
      s4l37: { de: 'Okay, okay', ru: 'Ладно, ладно', en: 'Okay, okay' },
      s4l38: { de: 'Wenn ich ihn nicht umstimmen kann', ru: 'Если я не могу его переубедить', en: 'If I can’t change his mind' },
      s4l39: { de: 'Mach ich eben mit', ru: 'Тогда я просто присоединюсь', en: 'I’ll just join him' },
      s4l40: { de: 'Ich werde auch ein Ninja!', ru: 'Я тоже стану ниндзя!', en: 'I’m going to be a ninja too!' },
      s4l41: { de: 'Schlaf mit einem Auge offen!', ru: 'Спи с одним открытым глазом!', en: 'Sleep with one eye open!' },
      s4l42: { de: 'Ich komme dich holen! 🥷', ru: 'Я иду за тобой!', en: 'I’m coming for you! 🥷' },
    },
    secs: [
      { id: 'chorus', label: 'Chorus', lines: ['s4l01', 's4l02', 's4l03', 's4l04', 's4l05', 's4l06', 's4l04'] },
      { id: 'verse1', label: 'Verse 1', lines: ['s4l07', 's4l08', 's4l09', 's4l10', 's4l11', 's4l12', 's4l13', 's4l14'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s4l15', 's4l16', 's4l17', 's4l18', 's4l19', 's4l20', 's4l21', 's4l22', 's4l23'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s4l24', 's4l25', 's4l26', 's4l27', 's4l28', 's4l29', 's4l30', 's4l31'] },
      { id: 'bridge', label: 'Bridge', lines: ['s4l32', 's4l33', 's4l34', 's4l35', 's4l36'] },
      { id: 'outro', label: 'Outro', lines: ['s4l37', 's4l38', 's4l39', 's4l40', 's4l41', 's4l42'] },
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'outro'],
  },
  {
    /* The chorus and the outro's last stanza break DIFFERENTLY in each
       language — five German lines against four Russian and four English.
       Those sections carry `par: true` and a list per language instead of
       one shared list, because the break is the poem and joining the
       German pair would edit the song. Everything else is 8/8/8 and
       aligns. */
    title: { de: 'Das Lied zweier Herzen', ru: 'Песня двух сердец', en: 'The Song of Two Hearts' },
    audio: 'das-lied-zweier-herzen',
    lines: {
      s5l01: { de: 'Im dunklen Zimmer hast du friedlich geschlafen', ru: 'В тёмном номере ты спала безмятежно', en: 'In the dark hotel room, you slept peacefully' },
      s5l02: { de: 'Ich kam herein, erschöpft von Reise und Zeit', ru: 'Я вошёл, дрожа от дороги и дней', en: 'I came in, trembling from the journey and the long days' },
      s5l03: { de: 'Vier lange Jahre der Trennung verschwanden ganz leise', ru: 'Четыре года разлуки растаяли нежно', en: 'Four years of separation gently melted away' },
      s5l04: { de: 'Als ich dich schlafen sah im Schein der Lichter', ru: 'Когда я увидел твой сон при свете огней', en: 'When I saw you sleeping in the glow of the lights' },
      s5l05: { de: 'Am Fenster stand der Blumenstrauß, den ich schon mitgebracht hatte', ru: 'У окна стоял букет, что принёс заранее', en: 'By the window stood the bouquet I had brought beforehand' },
      s5l06: { de: 'Ich hatte kaum noch Kraft, doch mein Herz sang', ru: 'Сил почти не осталось, но сердце поёт', en: 'I had almost no strength left, but my heart was singing' },
      s5l07: { de: 'Ich fiel aufs Bett, ohne die Koffer auszupacken', ru: 'Я упал на кровать, не раскрыв чемоданы', en: 'I fell onto the bed without even opening my suitcases' },
      s5l08: { de: 'Lass den Schlaf uns umarmen und den Schmerz mit sich nehmen', ru: 'Пусть сон обнимает и боль унесёт', en: 'Let sleep embrace us and carry the pain away' },
      s5l09: { de: 'Lwiw brachte uns die Liebe zurück', ru: '', en: '', only: 'de' },
      s5l10: { de: 'Das Herz spricht und versteht jedes Wort', ru: '', en: '', only: 'de' },
      s5l11: { de: 'Nicht mit Worten, sondern mit der Seele', ru: '', en: '', only: 'de' },
      s5l12: { de: 'Sprechen wir durch unsere Augen', ru: '', en: '', only: 'de' },
      s5l13: { de: 'Direkt von Herz zu Herz', ru: '', en: '', only: 'de' },
      s5l14: { de: '', ru: 'Львов вернул любовь нам снова', en: '', only: 'ru' },
      s5l15: { de: '', ru: 'Сердце говорит и слышит слово', en: '', only: 'ru' },
      s5l16: { de: '', ru: 'Мы не словами, а душой говорим через глаза', en: '', only: 'ru' },
      s5l17: { de: '', ru: 'Прямо в сердце другим', en: '', only: 'ru' },
      s5l18: { de: '', ru: '', en: 'Lviv brought our love back to us again', only: 'en' },
      s5l19: { de: '', ru: '', en: 'The heart speaks and hears every word', only: 'en' },
      s5l20: { de: '', ru: '', en: 'We speak not with words, but with our souls through our eyes', only: 'en' },
      s5l21: { de: '', ru: '', en: 'Straight into each other’s hearts', only: 'en' },
      s5l22: { de: 'Wir fuhren nach Worochta, wo die Kiefern zum Himmel wachsen', ru: 'Мы поехали в Ворохту, где сосны к небу', en: 'We went to Vorokhta, where the pine trees reach toward the sky' },
      s5l23: { de: 'Wo die Morgensonne über dem Fluss wie goldenes Wasser scheint', ru: 'Где заря над рекой, как золотой ручей', en: 'Where the dawn above the river is like a golden stream' },
      s5l24: { de: 'Nazar lachte im Wasserpark und fing die Tropfen des Himmels', ru: 'Назар смеялся в аквапарке, ловя капли неба', en: 'Nazar laughed in the water park, catching drops from the sky' },
      s5l25: { de: 'Und in der steinernen Kirche erzählten Kerzen von einem Traum', ru: 'А в каменной церкви свечи пели о мечте', en: 'And in the stone church, the candles sang of a dream' },
      s5l26: { de: 'Doch die Zeit läuft schneller als das Wasser in den Bergen', ru: 'Но время бежит быстрее горной воды', en: 'But time runs faster than mountain water' },
      s5l27: { de: 'Und der Zug pfiff und trug mich wieder fort', ru: 'И поезд свистел, увозил меня прочь', en: 'And the train whistled as it carried me away' },
      s5l28: { de: 'Du hast mir nachgewinkt und deine Tränen verborgen', ru: 'Я махала рукой, пряча слёзы беды', en: 'I waved goodbye, hiding tears of sadness' },
      s5l29: { de: 'Es ist so schwer, Abschied zu nehmen, wenn die Nacht beginnt', ru: 'Так тяжело прощаться, когда началась ночь', en: 'It is so hard to say goodbye when night has begun' },
      s5l30: { de: 'Im Januar kam ich zurück, als der Schnee alles still machte', ru: 'Я вернулся январём, когда снег — тишина', en: 'I returned in January, when the snow was silence' },
      s5l31: { de: 'Der Frost malte die Spuren der Zeit ans Fenster', ru: 'Мороз рисовал на стекле узоры времён', en: 'The frost painted patterns of time upon the glass' },
      s5l32: { de: 'Wir standen über dem Tal, der Sonnenuntergang rot wie Wein', ru: 'Мы стояли над долиной, где закат — как вина', en: 'We stood above the valley, where the sunset was like wine' },
      s5l33: { de: 'Und ich wusste: Mit dir wird mein Traum wieder lebendig', ru: 'И понял: с тобой оживает мой сон', en: 'And I realized: with you, my dream comes alive' },
      s5l34: { de: 'Schnee glitzerte auf unseren Wimpern, doch uns war warm', ru: 'Снег искрил на ресницах, но грело тепло', en: 'Snow sparkled on our eyelashes, but warmth kept us warm' },
      s5l35: { de: 'Wir lachten über die Kälte und blickten auf den Fluss', ru: 'Мы смеялись над холодом, смотря на реку', en: 'We laughed at the cold as we looked at the river' },
      s5l36: { de: 'Dort, wo der Wind sein Lied sang, flüstertest du: „Wir haben Glück“', ru: 'Там, где ветер поёт, я шептала: нам повезло', en: 'There, where the wind sings, I whispered, “We are lucky”' },
      s5l37: { de: 'Unsere Liebe wurde stärker als Trennung und Zeit', ru: 'Любовь стала сильней цепей и разлук навеку', en: 'Our love became stronger than chains and separation forever' },
      s5l38: { de: 'Wir fürchten weder die Zeit noch den Krieg', ru: 'Мы не боимся ни времени, ни войны', en: 'We are not afraid of time or war' },
      s5l39: { de: 'Durch Kälte und Angst hat unsere Liebe überlebt', ru: 'Сквозь холод и страх любовь спасены', en: 'Through cold and fear, our love has survived' },
      s5l40: { de: 'Du bist meine Zärtlichkeit, mein Licht, meine Antwort', ru: 'Ты моя нежность, мой свет, мой ответ', en: 'You are my tenderness, my light, my answer' },
      s5l41: { de: 'Und Lwiw ist der Anfang, an den sich jeder Morgen erinnert', ru: 'И Львов — начало, где помнит рассвет', en: 'And Lviv is the beginning that the dawn remembers' },
      s5l42: { de: 'Lwiw bewahrt die Wärme unserer Schritte', ru: 'Львов хранит тепло наших шагов', en: 'Lviv holds the warmth of our footsteps' },
      s5l43: { de: 'Jeder Stein flüstert von einem neuen Frühling', ru: 'Каждый камень шепчет о новой весне', en: 'Every stone whispers of a new spring' },
      s5l44: { de: 'Wir haben nicht gesucht und trotzdem gefunden', ru: 'Мы не искали, но всё же нашли', en: 'We weren’t searching, but still we found' },
      s5l45: { de: 'Einen Ort, an dem Liebe wir beide sind und nicht nur ein Traum', ru: 'Где любовь — это мы, а не просто мечты', en: 'A place where love is us, not simply a dream' },
      s5l46: { de: 'Hier fand ich uns wieder zwischen Sternen und Dächern', ru: 'Здесь я нашёл нас заново среди звёзд и крыш', en: 'Here I found us again among the stars and rooftops' },
      s5l47: { de: 'Hier hörte ich den Traum in deinem Herzen sprechen', ru: 'Здесь услышал, как в сердце твоё мечта говорит', en: 'Here I heard the dream inside your heart speak' },
      s5l48: { de: 'Mit jedem Blick bist du mir näher als gestern', ru: 'С каждым взглядом ты ближе, чем было вчера', en: 'With every look, you are closer than you were yesterday' },
      s5l49: { de: 'Als hätte Lwiw uns gesagt: Das hier ist für immer', ru: 'Словно Львов нам сказал: это навсегда', en: 'As if Lviv told us: this is forever' },
      s5l50: { de: 'Die Stadt verband unsere Herzen stärker als zuvor', ru: 'Город соединил сердца сильней, чем прежде', en: 'The city joined our hearts more strongly than before' },
      s5l51: { de: 'Unsere Liebe blühte auf den Plätzen der Stadt', ru: 'Любовь расцвела в цветении площадей', en: 'Love blossomed among the flowering squares' },
      s5l52: { de: 'Wir schauen nach vorn und wissen: Hier begann es', ru: 'Мы смотрим вперёд, зная: начало здесь же', en: 'We look ahead, knowing that the beginning is here' },
      s5l53: { de: 'Lwiw bleibt für immer in uns', ru: '', en: '', only: 'de' },
      s5l54: { de: 'Das Lied zweier Herzen', ru: '', en: '', only: 'de' },
      s5l55: { de: '', ru: 'Львов навсегда в нас — песня двух сердец', en: '', only: 'ru' },
      s5l56: { de: '', ru: '', en: 'Lviv is forever within us—the song of two hearts', only: 'en' },
      s5l57: { de: 'In Berlin gingen unsere Herzen auf eine neue Reise', ru: 'В Берлине наши сердца отправились в новое путешествие', en: 'In Berlin, our hearts went on another journey' },
      s5l58: { de: 'Und das Lied, das wir gemeinsam sangen', ru: 'И песня, которую мы пели вместе,', en: 'And the song we sang together' },
      s5l59: { de: 'lernte neue Töne', ru: 'научилась новым нотам', en: 'Learned new notes' },
      s5l60: { de: 'Doch das Lied, das wir singen', ru: 'Но песня, которую мы поём,', en: 'But the song we sing' },
      s5l61: { de: 'wird für immer in unseren Herzen weiterleben', ru: 'будет вечно жить в наших сердцах', en: 'Will live on in our hearts forever' },
      s5l62: { de: 'Unsere Herzen singen in Liebe wie ein einziges Herz', ru: 'Наши сердца поют как одно, наполненные любовью', en: 'Our hearts sing as one with love' },
      s5l63: { de: 'Das Lied zweier Herzen', ru: 'Песня двух сердец', en: 'The song of two hearts' },
    },
    secs: [
      { id: 'verse1', label: 'Verse 1', lines: ['s5l01', 's5l02', 's5l03', 's5l04', 's5l05', 's5l06', 's5l07', 's5l08'] },
      { id: 'chorus', label: 'Chorus', par: true,
        de: ['s5l09', 's5l10', 's5l11', 's5l12', 's5l13'],
        ru: ['s5l14', 's5l15', 's5l16', 's5l17'],
        en: ['s5l18', 's5l19', 's5l20', 's5l21'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s5l22', 's5l23', 's5l24', 's5l25', 's5l26', 's5l27', 's5l28', 's5l29'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s5l30', 's5l31', 's5l32', 's5l33', 's5l34', 's5l35', 's5l36', 's5l37'] },
      { id: 'bridge', label: 'Bridge', lines: ['s5l38', 's5l39', 's5l40', 's5l41'] },
      { id: 'outro', label: 'Outro', lines: ['s5l42', 's5l43', 's5l44', 's5l45', 's5l46', 's5l47', 's5l48', 's5l49', 's5l50', 's5l51', 's5l52'] },
      { id: 'outroEnd', label: 'Outro (Ende)', par: true,
        de: ['s5l53', 's5l54'],
        ru: ['s5l55'],
        en: ['s5l56'] },
      { id: 'berlin', label: 'Final Outro — Berlin', lines: ['s5l57', 's5l58', 's5l59', 's5l60', 's5l61', 's5l62', 's5l63'] },
    ],
    play: ['verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'outro', 'outroEnd', 'berlin'],
  },
  {
    /* Aligns throughout — every section the same count in all three. The
       instrumental blocks are structural rather than decorative, so they
       are sections with a single stage-direction line rather than gaps in
       the running order. */
    title: { de: 'Für Tanusha', ru: 'Для Танюши', en: 'For Tanusha' },
    audio: 'fuer-tanusha',
    lines: {
      s6l01: { de: 'Sternenlicht funkelt in deinen Träumen', ru: 'Звёздный свет мерцает в твоих снах', en: 'Starlight twinkles in your dreams' },
      s6l02: { de: 'Ein heller Schein des Mondes', ru: 'Сияние луны', en: 'A halo of the moon' },
      s6l03: { de: 'Schwebt unter deinen geschlossenen Lidern', ru: 'Плывёт под твоими закрытыми веками', en: 'Drifts beneath your closed eyelids' },
      s6l04: { de: 'Du atmest in die Nacht, ganz leise', ru: 'Ты дышишь в ночи, совсем тихо', en: 'You breathe in the night, softly' },
      s6l05: { de: 'Die Sorgen des Tages ziehen davon', ru: 'Дневные тревоги уплывают прочь', en: 'The worries of the day drift away' },
      s6l06: { de: 'Im langsamen, sanften Rhythmus', ru: 'В медленном, нежном ритме', en: 'To the slow and gentle rhythm' },
      s6l07: { de: 'Deines Atems, ein und aus', ru: 'Твоего дыхания, вдох и выдох', en: 'Of your breathing, in and out' },
      s6l08: { de: 'Deine Brust hebt sich, senkt sich, hebt sich', ru: 'Твоя грудь поднимается, опускается, поднимается', en: 'Your chest rising, falling, rising' },
      s6l09: { de: 'Meine Träume erwachen in deiner Welt', ru: 'Мои мечты оживают в твоём мире', en: 'My dreams awaken in your world' },
      s6l10: { de: 'Tausend funkelnde Sterne und noch mehr', ru: 'Тысяча сверкающих звёзд и ещё больше', en: 'A thousand sparkling stars, and more' },
      s6l11: { de: 'Die Dunkelheit schmilzt zwischen deinem Herzen und meinem', ru: 'Темнота тает между твоим сердцем и моим', en: 'The darkness melts between your heart and mine' },
      s6l12: { de: 'Und noch mehr', ru: 'И ещё больше', en: 'And more' },
      s6l13: { de: '[Instrumental – Cello, Oboe und Waldhorn; sanft, verträumt und wie ein Schlaflied]', ru: '[Инструментал – виолончель, гобой и валторна; нежно, мечтательно, как колыбельная]', en: '[Instrumental – cello, oboe and French horn; soft, dreamlike, like a lullaby]' },
      s6l14: { de: 'Die Worte schmelzen dahin', ru: 'Слова тают', en: 'Words melt away' },
      s6l15: { de: 'Und die Dunkelheit nimmt ihren Platz ein', ru: 'И темнота занимает их место', en: 'And darkness takes their place' },
      s6l16: { de: 'Kleine Juwelen aus Licht', ru: 'Маленькие драгоценности из света', en: 'Tiny jewels of light' },
      s6l17: { de: 'Funkeln in der Stille', ru: 'Сверкают в тишине', en: 'Sparkling in the silence' },
      s6l18: { de: 'In deinen Träumen', ru: 'В твоих снах', en: 'In your dreams' },
      s6l19: { de: 'Ganz leise, ganz leise', ru: 'Совсем тихо, совсем тихо', en: 'Softly, softly' },
      s6l20: { de: 'Sternenlicht schmilzt', ru: 'Звёздный свет тает', en: 'Starlight melting' },
      s6l21: { de: 'In deine Träume hinein', ru: 'В твоих снах', en: 'Into your dreams' },
      s6l22: { de: 'Diamanten schweben am Himmel', ru: 'Бриллианты плывут по небу', en: 'Diamonds floating in the sky' },
      s6l23: { de: 'Ein silberblauer Mondstrahl', ru: 'Серебристо-голубой лунный луч', en: 'A silver-blue moonbeam' },
      s6l24: { de: 'Zieht durch die Wolken', ru: 'Плывёт сквозь облака', en: 'Drifts through clouds' },
      s6l25: { de: 'Und fällt sanft auf dein Gesicht', ru: 'И нежно ложится на твоё лицо', en: 'And lands gently on your face' },
      s6l26: { de: 'Ein Engel schläft', ru: 'Спящий ангел', en: 'An angel sleeping' },
    },
    secs: [
      { id: 'verse1', label: 'Verse 1', lines: ['s6l01', 's6l02', 's6l03', 's6l04', 's6l05', 's6l06', 's6l07', 's6l08'] },
      { id: 'chorus', label: 'Chorus', lines: ['s6l09', 's6l10', 's6l11', 's6l10', 's6l12', 's6l12'] },
      { id: 'break', label: 'Instrumental', lines: ['s6l13'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s6l14', 's6l15', 's6l16', 's6l17', 's6l18', 's6l19', 's6l20', 's6l21'] },
      { id: 'outro', label: 'Outro', lines: ['s6l22', 's6l23', 's6l24', 's6l25', 's6l26', 's6l19'] },
      { id: 'outroInstr', label: 'Instrumental Outro', lines: ['s6l13'] },
    ],
    play: ['verse1', 'chorus', 'break', 'verse2', 'chorus', 'outro', 'outroInstr'],
  },
  {
    /* Aligns throughout — every section the same count in all three, so
       no parallel sections. The outro's `Viel zu wenig` appears twice and
       is identical in German, Russian and English, so it is one id used
       twice: the legitimate dedupe, unlike song 4's verse 2 where the
       German repeated and the Russian did not.

       Named. The Russian and English titles below are translated from the
       German and have not been checked. */
    title: { de: 'Hafermilch-Cappuccino in unserem Café',
             ru: 'Капучино на овсяном молоке в нашем кафе',
             en: 'Oat Milk Cappuccino in Our Café' },
    audio: 'hafermilch-cappuccino-in-unserem-cafe',
    lines: {
      s7l01: { de: 'So weit entfernt von der Welt, in der du lebst', ru: 'Так далеко от мира, в котором ты живёшь', en: 'So far away from the world you live in' },
      s7l57: { de: 'Mir fehlt deine Wärme, mir fehlt deine Nähe', ru: 'Мне не хватает твоего тепла, мне не хватает твоей близости', en: 'I miss your warmth, I miss your closeness' },
      s7l02: { de: 'Ich irre durch die Tage wie durch ein Labyrinth ohne Ende', ru: 'Я брожу по дням, словно по бесконечному лабиринту', en: 'I wander through the days like an endless maze' },
      s7l03: { de: 'Zu weit weg von deinem Herzen, deinem Gesicht, deiner Liebe', ru: 'Слишком далеко от твоего сердца, твоего лица, твоей любви', en: 'Too far from your heart, your face, your love' },
      s7l04: { de: 'Doch wenn ich die Augen schließe, sehe ich diesen kleinen Ort', ru: 'Но когда я закрываю глаза, я вижу то маленькое место', en: 'But when I close my eyes, I see that little place' },
      s7l05: { de: 'Deine Hände um die Tasse, das Licht auf deinem Gesicht', ru: 'Твои руки обнимают чашку, свет падает на твоё лицо', en: 'Your hands around the cup, the light upon your face' },
      s7l06: { de: 'Für einen kleinen Augenblick verschwand die ganze Welt', ru: 'На одно короткое мгновение весь мир исчез', en: 'For one brief moment, the whole world disappeared' },
      s7l07: { de: 'In unserem Café, als du ganz nah bei mir warst', ru: 'В нашем кафе, когда ты была совсем рядом со мной', en: 'In our café, when you were so close to me' },
      s7l08: { de: 'In unserem Café, während draußen der Regen fiel', ru: 'В нашем кафе, пока за окном шёл дождь', en: 'In our café, while the rain fell outside' },
      s7l09: { de: 'Hatten wir unsere kleine Welt, nur für uns zwei', ru: 'У нас был свой маленький мир, только для нас двоих', en: 'We had our little world, just for the two of us' },
      s7l10: { de: 'Hafermilch-Cappuccino, wir saßen zusammen', ru: 'Капучино на овсяном молоке, мы сидели вместе', en: 'Oat milk cappuccino, we sat together' },
      s7l11: { de: 'Wir dachten, wir hätten ewig, doch uns blieb nur diese Zeit', ru: 'Мы думали, что у нас есть вечность, но нам досталось лишь это время', en: 'We thought we had forever, but we only had that time' },
      s7l12: { de: 'In unserem Café sehe ich noch immer deine Augen', ru: 'В нашем кафе я всё ещё вижу твои глаза', en: 'In our café, I still see your eyes' },
      s7l13: { de: 'Ich höre noch das Lied deiner Stimme, erfüllt vom Klang des Russischen', ru: 'Я всё ещё слышу песню твоего голоса, наполненную звуками русского языка', en: 'I still hear the song of your voice, filled with the sounds of Russian' },
      s7l14: { de: 'Zwischen unseren Worten lag manchmal eine Lücke', ru: 'Между нашими словами иногда была пропасть', en: 'Sometimes there was a gap between our words' },
      s7l15: { de: 'Doch unsere Liebe baute eine Brücke', ru: 'Но наша любовь построила через неё мост', en: 'But our love built a bridge' },
      s7l16: { de: 'Ich erinnere mich an uns in unserem Café', ru: 'Я помню нас вместе в нашем кафе', en: 'I remember us in our café' },
      s7l17: { de: 'Ich kaufte dir deinen Cappuccino mit Hafermilch', ru: 'Я покупал тебе капучино на овсяном молоке', en: 'I bought you your cappuccino with oat milk' },
      s7l18: { de: 'Der Regen zog langsam seine Spuren am Fenster', ru: 'Дождь медленно рисовал свои следы на окне', en: 'The rain slowly traced its paths down the window' },
      s7l19: { de: 'Und unsere Zeit verging viel zu schnell', ru: 'А наше время уходило слишком быстро', en: 'And our time passed much too quickly' },
      s7l20: { de: 'Berlin liebt seinen Regen', ru: 'Берлин любит свой дождь', en: 'Berlin loves its rain' },
      s7l21: { de: 'Mehr als seinen Sonnenschein', ru: 'Больше, чем солнечный свет', en: 'More than its sunshine' },
      s7l22: { de: 'Doch ich liebte diese Zeit', ru: 'Но я любил то время', en: 'But I loved that time' },
      s7l23: { de: 'Jeden einzelnen Augenblick', ru: 'Каждое мгновение', en: 'Every single moment' },
      s7l24: { de: 'Bis keiner mehr übrig war', ru: 'Пока не осталось ни одного', en: 'Until there were no moments left' },
      s7l25: { de: 'Viel zu schnell war sie vorbei', ru: 'Слишком быстро оно прошло', en: 'Too quickly it was gone' },
      s7l26: { de: 'Viel zu schnell hatte unser Café kein „Uns“ mehr', ru: 'Слишком быстро в нашем кафе больше не стало «нас»', en: 'Too quickly our café had no “us” anymore' },
      s7l27: { de: 'Ich musste dich verlassen, musste nach Hause fliegen', ru: 'Мне пришлось оставить тебя, пришлось лететь домой', en: 'I had to leave you, had to fly back home' },
      s7l28: { de: 'Wieder nahm die Zeit uns voneinander fort', ru: 'И снова время разлучило нас', en: 'Once again, time pulled us apart' },
      s7l29: { de: 'Nahm uns unser Zusammensein', ru: 'Отняло у нас возможность быть вместе', en: 'Took away our being together' },
      s7l30: { de: 'Und ließ uns nur Gefühle und Erinnerungen', ru: 'И оставило нам лишь чувства и воспоминания', en: 'And left us only feelings and memories' },
      s7l31: { de: 'Du hast meine Koffer mit so viel Sorgfalt gepackt', ru: 'Ты с такой заботой собрала мои чемоданы', en: 'You packed my bags with so much care' },
      s7l32: { de: 'Deine Liebe kam mit mir, als ich ging', ru: 'Твоя любовь отправилась со мной, когда я ушёл', en: 'Your love came with me when I left' },
      s7l33: { de: 'Ich trug sie durch jeden Bahnhof', ru: 'Я нёс её через каждый вокзал', en: 'I carried it through every station' },
      s7l34: { de: 'Und hielt sie fest an meiner Brust', ru: 'И крепко прижимал к груди', en: 'And held it tightly against my chest' },
      s7l35: { de: 'Diese Momente verschwimmen', ru: 'Эти мгновения расплываются', en: 'Those moments blur' },
      s7l36: { de: 'Wie Regen auf einer Fensterscheibe', ru: 'Как дождь на оконном стекле', en: 'Like rain on a window' },
      s7l37: { de: 'Wir teilten einen Augenblick im Himmel', ru: 'Мы разделили мгновение в небе', en: 'We shared a moment in the sky' },
      s7l38: { de: 'Ganz oben auf dem Fernsehturm', ru: 'Высоко на вершине телебашни', en: 'At the top of the TV Tower' },
      s7l39: { de: 'Der kleine Blumenladen', ru: 'Маленький цветочный магазин', en: 'The little flower shop' },
      s7l40: { de: 'Die italienische Pizzeria', ru: 'Итальянская пиццерия', en: 'The Italian pizza place' },
      s7l41: { de: 'Ich kaufte dir Eis', ru: 'Я покупал тебе мороженое', en: 'I bought you ice cream' },
      s7l42: { de: 'Und Kaffee von Dunkin’ Donuts', ru: 'И кофе из Dunkin’ Donuts', en: 'And coffee from Dunkin’ Donuts' },
      s7l43: { de: 'Ich lief vierzig Minuten', ru: 'Я шёл сорок минут', en: 'I walked forty minutes' },
      s7l44: { de: 'Um ein Pflaster für deinen Fuß zu kaufen', ru: 'Чтобы купить пластырь для твоей ноги', en: 'To buy a Band-Aid for your foot' },
      s7l45: { de: 'Ich würde es wieder tun', ru: 'Я бы сделал это снова', en: 'I would do it again' },
      s7l46: { de: 'Und wieder', ru: 'И снова', en: 'And again' },
      s7l47: { de: 'Auch weit weg von dir', ru: 'Даже вдали от тебя', en: 'Even far away from you' },
      s7l48: { de: 'Bleibt ein Teil meines Herzens für immer', ru: 'Часть моего сердца навсегда остаётся', en: 'A piece of my heart stays forever' },
      s7l49: { de: 'In diesem kleinen Café', ru: 'В том маленьком кафе', en: 'In that little café' },
      s7l50: { de: 'Ganz nah bei dir', ru: 'Совсем рядом с тобой', en: 'So close to you' },
      s7l51: { de: 'Und bei diesem Hafermilch-Cappuccino', ru: 'И с тем капучино на овсяном молоке', en: 'And with that oat milk cappuccino' },
      s7l52: { de: 'Unser Café', ru: 'Наше кафе', en: 'Our café' },
      s7l53: { de: 'Unsere kleine Welt', ru: 'Наш маленький мир', en: 'Our little world' },
      s7l54: { de: 'Unsere kleine Zeit', ru: 'Наше маленькое время', en: 'Our little time' },
      s7l55: { de: 'Viel zu wenig', ru: 'Слишком мало', en: 'Too little' },
      s7l56: { de: 'Zeit', ru: 'Времени', en: 'Time' },
    },
    secs: [
      { id: 'verse1', label: 'Verse 1', lines: ['s7l01', 's7l57', 's7l02', 's7l03', 's7l04', 's7l05', 's7l06', 's7l07'] },
      { id: 'chorus', label: 'Chorus', lines: ['s7l08', 's7l09', 's7l10', 's7l11', 's7l12', 's7l13', 's7l14', 's7l15'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s7l16', 's7l17', 's7l18', 's7l19', 's7l20', 's7l21', 's7l22', 's7l23', 's7l24', 's7l25', 's7l26'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s7l27', 's7l28', 's7l29', 's7l30', 's7l31', 's7l32', 's7l33', 's7l34'] },
      { id: 'bridge', label: 'Bridge', lines: ['s7l35', 's7l36', 's7l37', 's7l38', 's7l39', 's7l40', 's7l41', 's7l42', 's7l43', 's7l44', 's7l45', 's7l46'] },
      { id: 'outro', label: 'Outro', lines: ['s7l47', 's7l48', 's7l49', 's7l50', 's7l51', 's7l52', 's7l53', 's7l54', 's7l55', 's7l55', 's7l56'] },
    ],
    play: ['verse1', 'chorus', 'verse2', 'chorus', 'verse3', 'bridge', 'chorus', 'outro'],
  },
  {
    /* Aligns throughout: 8 / 4 / 8 / 8 / 2 / 8 / 10 / 14 in all three
       languages, so no parallel sections.

       The German title phrase is left in the German inside the Russian and
       English lines, because it is the title and the hook and Kennedy said
       it in German to a German crowd. Translating it would remove the point
       of the song. */
    title: { de: 'Ich bin ein Berliner \u2013 Teil 2',
             ru: 'Ich bin ein Berliner \u2013 \u0427\u0430\u0441\u0442\u044c 2',
             en: 'Ich bin ein Berliner \u2013 Part 2' },
    audio: 'ich-bin-ein-berliner-part-2',
    lines: {
      s8l01: { de: 'John F. Kennedy stand Berlin in seiner schwersten Stunde bei', ru: 'Джон Кеннеди стоял с Берлином в час тревоги,', en: 'John Kennedy stood with Berlin in its hour of fear,' },
      s8l02: { de: 'Die Mauer erhob sich, und die ganze Welt hielt den Atem an', ru: 'Стена поднялась, и весь мир напрягся.', en: 'The Wall went up, and the whole world tensed.' },
      s8l03: { de: 'Mit fester Stimme und brennendem Herzen', ru: 'С твёрдым голосом и пылающим сердцем', en: 'With a steady voice and a burning heart,' },
      s8l04: { de: 'Sprach er Worte, die zu einem Symbol wurden', ru: 'Он произнёс слова, что стали символом.', en: 'He spoke the words that became a symbol.' },
      s8l05: { de: '„Ich bin ein Berliner“ — nicht durch Geburt, sondern durch ein Versprechen', ru: '«Ich bin ein Berliner» — не по рождению, а по обету,', en: '“Ich bin ein Berliner” — not by birth, but by a pledge,' },
      s8l06: { de: 'Für die Freiheit einzustehen — damals wie heute', ru: 'Стоять за свободу — тогда и теперь.', en: 'To stand for freedom — then and now.' },
      s8l07: { de: 'Ein Versprechen im Angesicht des Schmerzes', ru: 'Обещание, данное перед лицом боли…', en: 'A promise made in the face of pain…' },
      s8l08: { de: 'Und ich flüstere diese Worte erneut', ru: 'И я шепчу эти слова вновь.', en: 'And I whisper those words again.' },
      s8l09: { de: '„Ich bin ein Berliner“ — keine Mauer kann uns trennen', ru: '«Ich bin ein Berliner» — ни стены не разлучат,', en: '“Ich bin ein Berliner” — no walls will separate us,' },
      s8l10: { de: 'Kein Krieg, kein Weg bringt mich von meinem Weg ab', ru: 'Ни война, ни дорога не собьёт с пути.', en: 'No war, no road will turn me from the path.' },
      s8l11: { de: 'Immer wieder entscheide ich mich für die Liebe', ru: 'Я снова и снова выбираю любовь —', en: 'Again and again, I choose love —' },
      s8l12: { de: '„Ich bin ein Berliner“ — mein Herz ist dort, wo du bist', ru: '«Ich bin ein Berliner» — моё сердце там, где ты.', en: '“Ich bin ein Berliner” — my heart is where you are.' },
      s8l13: { de: 'Wir trafen uns online in einer Nacht im April', ru: 'Мы встретились онлайн в апрельскую ночь,', en: 'We met online on an April night,' },
      s8l14: { de: 'Ein Funke durch die Bildschirme, sanftes blaues Licht', ru: 'Искра через экраны, нежный синий свет.', en: 'A spark across the screens, a gentle blue light.' },
      s8l15: { de: 'Dann kam der Sommer — und da standest du', ru: 'Потом пришло лето — и вот ты стоишь,', en: 'Then summer came — and there you stood,' },
      s8l16: { de: 'Am Bahnhof in Charkiw, und die ganze Welt blieb stehen', ru: 'На вокзале в Харькове, и весь мир замер.', en: 'At the station in Kharkiv, and the whole world stopped.' },
      s8l17: { de: 'Dein Lächeln, deine blauen Augen', ru: 'Твоя улыбка, глаза голубые,', en: 'Your smile, your blue eyes,' },
      s8l18: { de: 'Die Zeit blieb stehen, als du mich ansahst', ru: 'Время застыло, когда ты взглянула.', en: 'Time stood still when you looked at me.' },
      s8l19: { de: 'Ich wohnte im Mirax, du kamst zu mir', ru: 'Я жил в Мираксе, ты приходила ко мне,', en: 'I stayed at the Mirax, you came to see me,' },
      s8l20: { de: 'Wir sahen Minions — und alles war wie ein Traum', ru: 'Мы смотрели Миньонов — и всё было мечтой.', en: 'We watched Minions — and everything felt like a dream.' },
      s8l21: { de: 'Ich kehrte im kalten Januar nach Charkiw zurück', ru: 'Я вернулся в Харьков в январский мороз,', en: 'I returned to Kharkiv in the January cold,' },
      s8l22: { de: 'Wir lachten im Schnee, dein Lächeln strahlte', ru: 'Мы смеялись в снегу, сияла улыбка.', en: 'We laughed in the snow, your smile shining.' },
      s8l23: { de: 'Du probiertest Kleider an — und die Kälte verschwand', ru: 'Ты примеряла платья — и холод ушёл,', en: 'You tried on dresses — and the cold disappeared,' },
      s8l24: { de: 'Wieder zusammen, und alles fühlte sich leicht an', ru: 'Снова вместе, и всё было легко.', en: 'Together again, and everything felt easy.' },
      s8l25: { de: 'Deine Mutter und ich suchten Schals aus', ru: 'Мы с мамой твоей выбирали платки,', en: 'Your mother and I picked out scarves,' },
      s8l26: { de: 'Der Mantel war grau, das Eis war süß', ru: 'Пальто было серым, мороженое — сладким.', en: 'The coat was gray, the ice cream was sweet.' },
      s8l27: { de: 'Die Schokolade war für dich — du wolltest nicht teilen', ru: 'Шоколад был для тебя, ты не поделилась,', en: 'The chocolate was for you — you wouldn’t share,' },
      s8l28: { de: 'Doch selbst das konnte ich nur an dir lieben', ru: 'Но даже это я не мог не обожать.', en: 'But even that, I couldn’t help but love.' },
      s8l29: { de: 'Fast vier Jahre der Stille vergingen', ru: 'Прошли почти четыре года молчания,', en: 'Almost four years of silence passed,' },
      s8l30: { de: 'Die Welt blieb stehen — Pandemie und Krieg', ru: 'Мир остановился — пандемия, война.', en: 'The world stopped — pandemic, war.' },
      s8l31: { de: 'Der Krieg begann, doch die Liebe rief', ru: 'Началась война, но любовь звала,', en: 'The war began, but love was calling,' },
      s8l32: { de: 'Kiew brannte, du kamst von weit her', ru: 'Киев пылал, ты ехала издалека.', en: 'Kyiv was burning, you traveled from far away.' },
      s8l33: { de: 'Wir trafen uns im Winter wieder in Lwiw', ru: 'Мы встретились снова во Львове зимой,', en: 'We met again in Lviv in winter,' },
      s8l34: { de: 'Drei Jahre getrennt — doch du warst wieder bei mir', ru: 'Три года разлуки — но ты снова со мной.', en: 'Three years apart — but you were with me again.' },
      s8l35: { de: 'Schnee in den Karpaten, frische Bergluft', ru: 'В Карпатах снег, и свежий воздух,', en: 'Snow in the Carpathians, the fresh mountain air,' },
      s8l36: { de: 'Du hast gelacht, und der Bart kam ab', ru: 'Ты смеялась, и борода ушла.', en: 'You laughed, and the beard came off.' },
      s8l37: { de: 'Wieder ein Abschied, der Zug trug dich fort', ru: 'Прощание снова, поезд уносит вдаль,', en: 'Another goodbye, the train carried you away,' },
      s8l38: { de: 'Und mein Herz blieb dort auf diesem Bahnsteig zurück', ru: 'А сердце моё — на том перроне осталось.', en: 'And my heart remained there on that platform.' },
      s8l39: { de: 'Ich kehrte nach Lwiw zurück, während die Welt den Atem anhielt', ru: 'Я вернулся во Львов, когда мир затаил дыханье,', en: 'I returned to Lviv while the world held its breath,' },
      s8l40: { de: 'Und sah die Zeichnung eines Kindes — einfach und mutig', ru: 'И увидел детский рисунок — простой и смелый.', en: 'And saw a child’s drawing — simple and brave.' },
      s8l41: { de: 'Die Umrisse der Ukraine — ganz und ungeteilt', ru: 'Контур Украины — целый, большой,', en: 'The outline of Ukraine — whole and complete,' },
      s8l42: { de: 'Und das Wort „home“ auf Englisch — ohne Angst, ohne Hass', ru: 'И слово “home” по-английски — без страха, без злобы.', en: 'And the word “home” in English — without fear, without anger.' },
      s8l43: { de: 'Keine Fahnen, keine Parolen, kein Rauch des Krieges', ru: 'Ни флагов, ни лозунгов, ни дыма войны —', en: 'No flags, no slogans, no smoke from the war —' },
      s8l44: { de: 'Nur Liebe zu dem Land, wo die Herzen zu Hause sein wollen', ru: 'Лишь любовь к земле, где сердца хотят быть.', en: 'Only love for the land where hearts long to be.' },
      s8l45: { de: 'Es blieb in mir wie ein Gebet, wie eine Flamme', ru: 'Он остался во мне, как молитва, как пламя,', en: 'It stayed inside me like a prayer, like a flame,' },
      s8l46: { de: 'Und ich flüsterte es wieder, während ich deinen Namen sprach', ru: 'И я прошептал вновь, произнося твоё имя:', en: 'And I whispered again as I spoke your name:' },
      s8l47: { de: '„Ich bin ein Berliner“ — für dich werde ich bleiben', ru: '«Ich bin ein Berliner» — ради тебя я останусь', en: '“Ich bin ein Berliner” — for you, I will remain,' },
      s8l48: { de: 'Durch die Stille, durch die Trauer, durch Freude und Schmerz', ru: 'Сквозь тишину, сквозь печаль, сквозь радость и боль.', en: 'Through silence, through sorrow, through happiness and pain.' },
      s8l49: { de: 'Dein Sohn wurde schwer krank — und du musstest gehen', ru: 'Твой сын тяжело заболел — и ты уехала.', en: 'Your son became seriously ill — and you left,' },
      s8l50: { de: 'Nach Berlin, in die Klinik, wo die Zeit stillstand', ru: 'В Берлин, в клинику, где время застыло.', en: 'For Berlin, to the hospital, where time stood still.' },
      s8l51: { de: 'Du hieltest seine Hand — so zerbrechlich und klein', ru: 'Ты держала его руку — такого хрупкого и маленького,', en: 'You held his hand — so fragile and small,' },
      s8l52: { de: 'Du kämpftest mit Liebe und zeigtest keine Angst', ru: 'Сражалась с любовью, не показывая страх.', en: 'You fought with love, never showing your fear.' },
      s8l53: { de: 'Und ich flog durch den Himmel zu dir', ru: 'А я летел через небо к тебе,', en: 'And I flew through the sky to you,' },
      s8l54: { de: 'Dein Schmerz ist meiner, so wie dein Lachen, so wie deine Träume', ru: 'Твоя боль — моя, как и смех, как мечты.', en: 'Your pain is mine, just like your laughter, just like your dreams.' },
      s8l55: { de: 'Charkiw, Lwiw und Berlin — mit Bus, Zug und Auto', ru: 'Харьков, Львов и Берлин — на автобусе, поезде, машине —', en: 'Kharkiv, Lviv, and Berlin — by bus, by train, by car,' },
      s8l56: { de: '„Ich bin ein Berliner“ — denn mein Herz ist bei dir', ru: '«Ich bin ein Berliner» — ведь сердце моё с тобой.', en: '“Ich bin ein Berliner” — because my heart is with you.' },
      s8l57: { de: 'Mein Besuch war viel zu kurz', ru: 'Мой визит был слишком коротким,', en: 'My visit was too short,' },
      s8l58: { de: 'Und die Entfernung ist viel zu groß', ru: 'А расстояние слишком велико.', en: 'And the distance is too far,' },
      s8l59: { de: 'Doch ich werde einen Weg finden', ru: 'Но я найду дорогу,', en: 'But I will find a way.' },
      s8l60: { de: 'Ich werde jeden Ozean überqueren', ru: 'Я пересеку любой океан,', en: 'I will cross any ocean to be' },
      s8l61: { de: 'Um dort zu sein, wo du bist', ru: 'Чтобы быть там, где ты.', en: 'Where you are.' },
      s8l62: { de: '„Ich bin ein Berliner“ — denn meine Seele gehört dir', ru: '«Ich bin ein Berliner» — ведь моя душа принадлежит тебе.', en: '“Ich bin ein Berliner” — because my soul belongs to you.' },
    },
    secs: [
      { id: 'intro', label: 'Intro', lines: ['s8l01', 's8l02', 's8l03', 's8l04', 's8l05', 's8l06', 's8l07', 's8l08'] },
      { id: 'chorus', label: 'Chorus', lines: ['s8l09', 's8l10', 's8l11', 's8l12'] },
      { id: 'verse1', label: 'Verse 1', lines: ['s8l13', 's8l14', 's8l15', 's8l16', 's8l17', 's8l18', 's8l19', 's8l20'] },
      { id: 'verse2', label: 'Verse 2', lines: ['s8l21', 's8l22', 's8l23', 's8l24', 's8l25', 's8l26', 's8l27', 's8l28'] },
      { id: 'transition', label: 'Transition', lines: ['s8l29', 's8l30'] },
      { id: 'verse3', label: 'Verse 3', lines: ['s8l31', 's8l32', 's8l33', 's8l34', 's8l35', 's8l36', 's8l37', 's8l38'] },
      { id: 'bridge', label: 'Bridge', lines: ['s8l39', 's8l40', 's8l41', 's8l42', 's8l43', 's8l44', 's8l45', 's8l46', 's8l47', 's8l48'] },
      { id: 'outro', label: 'Outro', lines: ['s8l49', 's8l50', 's8l51', 's8l52', 's8l53', 's8l54', 's8l55', 's8l56', 's8l57', 's8l58', 's8l59', 's8l60', 's8l61', 's8l62'] },
    ],
    play: ['intro', 'chorus', 'verse1', 'verse2', 'chorus', 'transition', 'verse3', 'bridge', 'chorus', 'outro'],
  },

  {
    n: 15,
    audio: 'mein-herz-will-nach-hause',
    title: {
      de: 'Mein Herz will nach Hause',
      ru: 'Моё сердце хочет домой',
      en: 'My Heart Wants to Go Home'
    },
    lines: {
    s15l01: { de:'Mein Herz singt und weint', ru:'Моё сердце поёт и плачет', en:'My heart sings and cries' },
    s15l02: { de:'Es will nach Hause', ru:'Оно хочет домой', en:'It wants to go home' },
    s15l03: { de:'An einen Ort mit vertrauten Dingen', ru:'Туда, где всё такое родное', en:'To a place of familiar things' },
    s15l04: { de:'Wo ich ein kleines Mädchen war', ru:'Где я была маленькой девочкой', en:'Where I was a little girl' },
    s15l05: { de:'Wo ich jedes Wort kannte', ru:'Где я знала каждое слово', en:'Where I knew every word' },
    s15l06: { de:'Wo ich jeden Ort kannte', ru:'Где я знала каждое место', en:'Where I knew every place' },
    s15l07: { de:'Ein kleines Mädchen lief unter der Sonne', ru:'Маленькая девочка бежала под солнцем', en:'A little girl ran under the sun' },
    s15l08: { de:'Frische Luft, sorgenfrei, kindlicher Spaß', ru:'Свежий воздух, беззаботное детское счастье', en:'Fresh air, carefree, childish fun' },
    s15l09: { de:'Ich kannte nichts als die Liebe', ru:'Я не знала ничего, кроме любви', en:'I knew nothing but the love' },
    s15l10: { de:'Von Mama und Papa', ru:'Мамы и папы', en:'Of my mom and dad' },
    s15l11: { de:'Der süße Duft von Sonnenblumen', ru:'Сладкий запах подсолнухов', en:'Sweet smell of sunflowers' },
    s15l12: { de:'Wind in meinem Haar, diese schönen Tage', ru:'Ветер в волосах, те прекрасные дни', en:'Wind in my hair, those sweet days' },
    s15l13: { de:'Ich zählte Wolken am Himmel', ru:'Я считала облака в небе', en:'Counting clouds across the sky' },
    s15l14: { de:'Schöne Tage und schöne Gedanken', ru:'Светлые дни и светлые мысли', en:'Sweet days and sweet thoughts' },
    s15l15: { de:'Die Schöne und das Biest', ru:'Красавица и Чудовище', en:'Beauty and the Beast' },
    s15l16: { de:'Ich war Belle', ru:'Я была Белль', en:'I was Belle' },
    s15l17: { de:'Das Leben ging weiter, mein Haar wurde lang', ru:'Жизнь шла вперёд, мои волосы стали длиннее', en:'Life moved on, I grew out my hair' },
    s15l18: { de:'Ich dachte, ich hätte Liebe gefunden, doch ich täuschte mich', ru:'Я думала, что нашла любовь, но ошиблась', en:'I thought I found love, but was misled' },
    s15l19: { de:'Stattdessen fand ich ein gebrochenes Herz', ru:'Вместо неё я нашла разбитое сердце', en:'I found a broken heart instead' },
    s15l20: { de:'Doch ich ließ es nicht ganz zerbrechen', ru:'Но не позволила ему разбиться до конца', en:'But I didn’t let it break all the way' },
    s15l21: { de:'Dann traf ich einen Mann, der sich um mich sorgte', ru:'Потом я встретила мужчину, который заботился обо мне', en:'I met another man who cared for me' },
    s15l22: { de:'Der mich ich selbst sein ließ und mich frei sein ließ', ru:'Позволял мне быть собой, позволял мне быть свободной', en:'Let me be me, and let me be free' },
    s15l23: { de:'In seinen Armen konnte ich noch ein kleines Mädchen sein', ru:'В его объятиях я всё ещё могла быть маленькой девочкой', en:'I could still be a little girl in his arms' },
    s15l24: { de:'Und mit der Zeit wurde mein Herz wieder warm', ru:'И с годами моё сердце становилось теплее', en:'And as time flew by, my heart grew warm' },
    s15l25: { de:'Doch während unsere Liebe wuchs', ru:'Но пока росла наша любовь', en:'But as our love grew' },
    s15l26: { de:'Wurde die Welt grausam', ru:'Мир становился жестоким', en:'The world grew cruel' },
    s15l27: { de:'Erst kam die Pandemie und dann', ru:'Сначала пришла пандемия, а потом', en:'First came the pandemic, and then' },
    s15l28: { de:'Die schreckliche Invasion meiner Heimat', ru:'Страшное вторжение в мой дом', en:'The terrible invasion of my home' },
    s15l29: { de:'Doch selbst als der Krieg kam', ru:'Но даже когда пришла война', en:'But even as the war came' },
    s15l30: { de:'Kam meine Liebe zu mir zurück', ru:'Моя любовь вернулась ко мне', en:'My love came back for me' },
    s15l31: { de:'Doch jetzt hatte ich meinen süßen Jungen', ru:'Но теперь у меня был мой милый мальчик', en:'But now I had my sweet boy' },
    s15l32: { de:'Der mich auch brauchte', ru:'Которому я тоже была нужна', en:'Who also needed me' },
    s15l33: { de:'Dann kam der Tag, an dem ich gehen musste', ru:'Потом настал день, когда мне пришлось уехать', en:'Then the day came when I had to leave' },
    s15l34: { de:'Um meinen Jungen zu retten, der besondere Hilfe brauchte', ru:'Чтобы спасти моего мальчика, которому нужна была особая помощь', en:'To save my boy who needed special care' },
    s15l35: { de:'Ich ließ die Heimat zurück, die ich kannte', ru:'Я оставила родной дом, который знала', en:'I left behind the home I knew' },
    s15l36: { de:'Und nahm all meine Liebe mit', ru:'И унесла с собой всю свою любовь', en:'And carried all my love with me' },
    s15l37: { de:'Jetzt lebe ich in einem Land, das kalt ist', ru:'Теперь я живу в холодной стране', en:'I now live in a land that is cold' },
    s15l38: { de:'Und ich fühle, als hätte ich einen Teil meiner Seele verloren', ru:'И чувствую, будто потеряла часть своей души', en:'And I feel like I have lost a part of my soul' },
    s15l39: { de:'Meine nackten Füße sehnen sich danach zu laufen', ru:'Мои босые ноги тоскуют по земле', en:'My bare feet long to walk' },
    s15l40: { de:'Zwischen den Sonnenblumen meiner Kindheitsheimat', ru:'Среди подсолнухов моего детства', en:'Among the sunflowers of my childhood home' },
    s15l41: { de:'Ich sehne mich danach, die freie ukrainische Luft zu atmen', ru:'Я хочу снова дышать свободным украинским воздухом', en:'I long to breathe the free Ukrainian air' },
    s15l42: { de:'Die ukrainische Sonne in meinem Haar zu spüren', ru:'Чувствовать украинское солнце в своих волосах', en:'Feel the Ukrainian sun shine in my hair' },
    s15l43: { de:'Mein Herz will nach Hause', ru:'Моё сердце хочет домой', en:'My heart wants to go home' }
    },
    secs: [
      { id:'chorus', label:'Chorus',  lines:['s15l01', 's15l02', 's15l03', 's15l04', 's15l05', 's15l06', 's15l01', 's15l02'] },
      { id:'verse1', label:'Verse 1', lines:['s15l07', 's15l08', 's15l09', 's15l10', 's15l11', 's15l12', 's15l13', 's15l14', 's15l15', 's15l16'] },
      { id:'verse2', label:'Verse 2', lines:['s15l17', 's15l18', 's15l19', 's15l20', 's15l21', 's15l22', 's15l23', 's15l24'] },
      { id:'verse3', label:'Verse 3', lines:['s15l25', 's15l26', 's15l27', 's15l28', 's15l29', 's15l30', 's15l31', 's15l32', 's15l33', 's15l34', 's15l35', 's15l36'] },
      { id:'outro',  label:'Outro',   lines:['s15l37', 's15l38', 's15l39', 's15l40', 's15l41', 's15l42', 's15l43', 's15l43'] }
    ],
    play: ['chorus','verse1','chorus','verse2','chorus','verse3','chorus','outro']
  },
  {
    audio:'noch-fuenf-minuten',
    pair:'five-minutes', voice:'m',
    title:{ de:'Noch fünf Minuten', ru:'Ещё пять минут', en:'Five More Minutes' },

    lines:{
      s10l01:{ de:'Zeit, hinaus in die Nacht zu gehen',
              ru:'Пора выходить в ночь',
              en:'Time to go out into the night' },
      s10l02:{ de:'Schick gemacht, bereit für den Spaß',
              ru:'Мы нарядились, готовы веселиться',
              en:'Dressed up, ready to have some fun' },
      s10l03:{ de:'Ich nehm die Schlüssel, geh zur Tür',
              ru:'Я хватаю ключи и иду к двери',
              en:'Grab my keys and head for the door' },
      s10l04:{ de:'„Noch fünf Minuten“, höre ich sie sagen',
              ru:'«Ещё пять минут», — слышу я от неё',
              en:'Five more minutes, I hear her say' },
      s10l05:{ de:'Noch fünf Minuten warten',
              ru:'Ещё пять минут ждать',
              en:'Five more minutes of waiting' },
      s10l06:{ de:'Und warten und warten',
              ru:'И ждать, и ждать',
              en:'And waiting and waiting' },
      s10l07:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s10l08:{ de:'Und warten und warten',
              ru:'И ждать, и ждать',
              en:'And waiting and waiting' },
      s10l09:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s10l10:{ de:'Die Sonne brennt ihr letztes Licht in den Himmel',
              ru:'Солнце сжигает свой последний свет в небе',
              en:'The sun burns its last light in the sky' },
      s10l11:{ de:'Bald wird es Zeit für uns zu gehen',
              ru:'Скоро нам пора будет уходить',
              en:'Soon it will be time for us to leave' },
      s10l12:{ de:'Der Mond scheint aus der Dämmerung herab',
              ru:'Луна в сумерках сияет с высоты',
              en:'The twilight moon is shining down' },
      s10l13:{ de:'Die Nacht ruft nach mir',
              ru:'Ночь зовёт меня',
              en:'The night is calling out to me' },
      s10l14:{ de:'Jacke an, Schuhe zu',
              ru:'Куртка надета, шнурки завязаны',
              en:'My jacket\'s on, shoes are tied' },
      s10l15:{ de:'Schlüssel in der Hand',
              ru:'Ключи в руке',
              en:'Keys in my hand' },
      s10l16:{ de:'Doch sie steht vorm Spiegel, richtet ihr Haar',
              ru:'Но она у зеркала поправляет волосы',
              en:'But she\'s at the mirror fixing her hair' },
      s10l17:{ de:'Und ich steh hier rum wie ein Depp',
              ru:'А я торчу здесь как дурак',
              en:'And I\'m just standing here like a chump' },
      s10l18:{ de:'Die Nacht ist wie ein langsam brennendes Fieber',
              ru:'Ночь — как медленно разгорающаяся лихорадка',
              en:'The night is like a slow-burning fever' },
      s10l19:{ de:'Sie wird verdammt heiß aussehn, wenn ich sie seh',
              ru:'Я знаю: увижу её — она будет просто огонь',
              en:'I know she\'ll look so hot when I see her' },
      s10l20:{ de:'Ihr Make-up wird bestimmt makellos sein',
              ru:'Её макияж точно будет безупречен',
              en:'No doubt her makeup will be flawless' },
      s10l21:{ de:'Sie wird so manchen Kopf verdrehen',
              ru:'Она вскружит не одну голову',
              en:'She\'s gonna turn some heads' },
      s10l22:{ de:'Wir müssen doch nur endlich los',
              ru:'Нам всего-то нужно выйти за дверь',
              en:'All we have to do is head on out' },
      s10l23:{ de:'Doch die Minuten kriechen vorbei',
              ru:'Но минуты ползут мимо нас',
              en:'But as the minutes crawl past us' },
      s10l24:{ de:'Langsam fühlt es sich an wie ein Fiebertraum',
              ru:'Всё становится похоже на горячечный сон',
              en:'That starts to feel like a fever dream' },
      s10l25:{ de:'„Noch fünf Minuten“ läuft in Schleife',
              ru:'«Ещё пять минут» крутится по кругу',
              en:'Five more minutes keeps looping' },
      s10l26:{ de:'Und dreht sich weiter',
              ru:'И крутится дальше',
              en:'And looping' },
      s10l27:{ de:'Ich weiß, sie ist das Warten wert',
              ru:'Я знаю, её стоит ждать',
              en:'I know that she is worth the wait' },
      s10l28:{ de:'Ich sollte mich nicht beschweren',
              ru:'Мне правда не стоит жаловаться',
              en:'I really shouldn\'t complain' },
      s10l29:{ de:'Bald seh ich sie in ihrer ganzen Schönheit',
              ru:'Скоро я увижу её во всей красе',
              en:'Soon I\'ll get to see her beauty' },
      s10l30:{ de:'Und bin froh, dass ich gewartet hab',
              ru:'И буду рад, что дождался',
              en:'And be grateful that I waited' },
      s10l31:{ de:'Und ich weiß, ich würd es wieder tun',
              ru:'И я знаю — я повторил бы всё сначала',
              en:'And I know I\'d do it all over again' },
      s10l32:{ de:'Wieder und wieder …',
              ru:'Снова и снова…',
              en:'Again and again…' },
      s10l33:{ de:'Warten und warten',
              ru:'Ждать и ждать',
              en:'Waiting and waiting' },
      s10l34:{ de:'Und warten und warten',
              ru:'И ждать, и ждать',
              en:'And waiting and waiting' },
      s10l35:{ de:'Was sind schon fünf Minuten mehr',
              ru:'Что значат ещё пять минут',
              en:'What\'s five more minutes' },
      s10l36:{ de:'Nach noch fünf Minuten, nach—',
              ru:'После ещё пяти минут, после—',
              en:'After five more minutes after—' },
      s10l37:{ de:'(Und warten und warten)',
              ru:'(И ждать, и ждать)',
              en:'(And waiting and waiting)' },
      s10l38:{ de:'Noch fünf Minuten danach—',
              ru:'Ещё пять минут после—',
              en:'Five more minutes after—' },
      s10l39:{ de:'(Und warten und warten)',
              ru:'(И ждать, и ждать)',
              en:'(And waiting and waiting)' },
      s10l40:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s10l41:{ de:'(Und warten und warten)',
              ru:'(И ждать, и ждать)',
              en:'(And waiting and waiting)' },
      s10l42:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s10l43:{ de:'(Und warten und warten)',
              ru:'(И ждать, и ждать)',
              en:'(And waiting and waiting)' },
      s10l44:{ de:'Noch fünf Minuten …',
              ru:'Ещё пять минут…',
              en:'Five more minutes…' }
    },

    secs:[
      { id:'chorus', label:'Chorus', lines:['s10l01', 's10l02', 's10l03', 's10l04', 's10l05', 's10l06', 's10l07', 's10l08', 's10l09'] },
      { id:'verse1', label:'Verse 1', lines:['s10l10', 's10l11', 's10l12', 's10l13', 's10l14', 's10l15', 's10l16', 's10l17'] },
      { id:'verse2', label:'Verse 2', lines:['s10l18', 's10l19', 's10l20', 's10l21', 's10l22', 's10l23', 's10l24', 's10l25', 's10l26'] },
      { id:'bridge', label:'Bridge', lines:['s10l27', 's10l28', 's10l29', 's10l30', 's10l31', 's10l32'] },
      { id:'outro', label:'Outro', lines:['s10l33', 's10l34', 's10l35', 's10l36', 's10l37', 's10l38', 's10l39', 's10l40', 's10l41', 's10l42', 's10l43', 's10l44'] }
    ],

    play:['chorus', 'verse1', 'chorus', 'verse2', 'bridge', 'chorus', 'outro']
  },
  {
    audio:'ihre-fuenf-minuten',
    pair:'five-minutes', voice:'f',
    title:{ de:'Ihre fünf Minuten', ru:'Её пять минут', en:'Her Five More Minutes' },

    lines:{
      s11l01:{ de:'Bald ziehen wir hinaus in die Nacht',
              ru:'Скоро мы выйдем навстречу ночи',
              en:'Soon we\'ll be going out into the night' },
      s11l02:{ de:'Schick gemacht, fast bereit für den Spaß',
              ru:'Я нарядилась, почти готова веселиться',
              en:'Dressed up, almost ready for fun' },
      s11l03:{ de:'Doch zuerst muss mir dieser Look gelingen',
              ru:'Но сначала я должна довести свой образ до совершенства',
              en:'But first I have to nail this look' },
      s11l04:{ de:'Mühelos schön und vollkommen makellos',
              ru:'Красота без усилий, без единого изъяна',
              en:'Of effortlessly flawless beauty' },
      s11l05:{ de:'Ich brauch noch fünf Minuten',
              ru:'Мне нужно ещё пять минут',
              en:'I need five more minutes' },
      s11l06:{ de:'Dann bin ich bereit',
              ru:'И я буду готова',
              en:'And I\'ll be ready' },
      s11l07:{ de:'Brauch noch fünf Minuten',
              ru:'Нужно ещё пять минут',
              en:'Need five more minutes' },
      s11l08:{ de:'Dann bin ich bereit',
              ru:'И я буду готова',
              en:'And I\'ll be ready' },
      s11l09:{ de:'Die Sonne ging unter, jetzt ist unsre Zeit',
              ru:'Солнце село, теперь наше время',
              en:'The sun went down and this is our time' },
      s11l10:{ de:'Wir setzen die Welt in Brand',
              ru:'Мы подожжём этот мир',
              en:'To make the world burn' },
      s11l11:{ de:'Und bringen die Sterne zum Leuchten',
              ru:'И заставим звёзды сиять',
              en:'And make the stars shine' },
      s11l12:{ de:'Die Nacht, sie ruft nach mir',
              ru:'Ночь зовёт меня',
              en:'The night is calling out to me' },
      s11l13:{ de:'Mein Kleid ist an, die Schuhe passen dazu',
              ru:'Платье надето, туфли подходят к нему',
              en:'My dress is on, matching shoes' },
      s11l14:{ de:'Die Handtasche in der Hand',
              ru:'Сумочка в руке',
              en:'Purse in my hand' },
      s11l15:{ de:'Vor dem Spiegel versuch ich, meine Haare hinzukriegen',
              ru:'Перед зеркалом пытаюсь привести волосы в порядок',
              en:'I\'m at the mirror trying to fix my hair' },
      s11l16:{ de:'Ich muss aussehen wie ein Diamantring',
              ru:'Я должна выглядеть как кольцо с бриллиантом',
              en:'I gotta look a diamond ring' },
      s11l17:{ de:'Heute Nacht werden wir richtig Spaß haben',
              ru:'Сегодня ночью мы как следует повеселимся',
              en:'We are going to have some fun' },
      s11l18:{ de:'Wenn ich fertig bin, werd ich verdammt heiß aussehen',
              ru:'Когда закончу, буду выглядеть чертовски сексуально',
              en:'Going to look so hot when I am done' },
      s11l19:{ de:'Ich muss makellos sein',
              ru:'Я должна быть безупречной',
              en:'I gotta be flawless' },
      s11l20:{ de:'(muss makellos sein)',
              ru:'(должна быть безупречной)',
              en:'(gotta be flawless)' },
      s11l21:{ de:'Ich muss alle Hälse nach mir drehen sehen',
              ru:'Я должна увидеть, как все шеи повернутся мне вслед',
              en:'I\'ve gotta turn those necks' },
      s11l22:{ de:'Nur ein kleines bisschen Make-up und',
              ru:'Ещё совсем немного макияжа и',
              en:'Just a little more make-up and' },
      s11l23:{ de:'Nur ein kleines bisschen Make-up',
              ru:'Ещё совсем немного макияжа',
              en:'Just a little more make up' },
      s11l24:{ de:'Ich bin fast so weit, fast so weit',
              ru:'Я почти готова, почти готова',
              en:'I\'m almost there, almost there' },
      s11l25:{ de:'Ich muss nur noch irgendwas mit diesen Haaren machen',
              ru:'Мне нужно только что-то сделать с этими волосами',
              en:'I just gotta do something about this hair' },
      s11l26:{ de:'Und ich muss ihn warten lassen',
              ru:'И я должна заставить его ждать',
              en:'And I gotta keep him waiting' },
      s11l27:{ de:'Muss ihn warten lassen',
              ru:'Должна заставить его ждать',
              en:'gotta keep him waiting' },
      s11l28:{ de:'Tief im Innern weiß er: Auf mich zu warten lohnt sich',
              ru:'В глубине души он знает: меня стоит ждать',
              en:'He knows deep down I\'m worth the wait' },
      s11l29:{ de:'Er kann sich wirklich nicht beschweren',
              ru:'Он правда не может жаловаться',
              en:'He really can\'t complain' },
      s11l30:{ de:'Wenn er meine makellose Schönheit sieht',
              ru:'Когда увидит мою безупречную красоту',
              en:'When he sees my flawless beauty' },
      s11l31:{ de:'Hab ich ihn fest in meiner Hand',
              ru:'Он будет крепко у меня в руках',
              en:'I\'ll have him right in the palm of my hand' },
      s11l32:{ de:'Und ich weiß, er wird wieder auf mich warten',
              ru:'И я знаю, он снова будет ждать меня',
              en:'And I know he\'ll do it all over again' },
      s11l33:{ de:'Wieder und wieder',
              ru:'Снова и снова',
              en:'Again and again' },
      s11l34:{ de:'Was sind schon weitere fünf Minuten?',
              ru:'Что значат ещё пять минут?',
              en:'What\'s five more minutes?' },
      s11l35:{ de:'Dann bin ich bereit',
              ru:'И я буду готова',
              en:'I\'ll be ready' },
      s11l36:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes after' },
      s11l37:{ de:'Und danach noch fünf Minuten',
              ru:'А потом ещё пять минут',
              en:'five more minutes after' },
      s11l38:{ de:'(und dann bin ich bereit)',
              ru:'(и тогда я буду готова)',
              en:'(and I\'ll be ready)' },
      s11l39:{ de:'(er wartet und wartet)',
              ru:'(он ждёт и ждёт)',
              en:'(he\'s waiting and waiting)' },
      s11l40:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'five more minutes' },
      s11l41:{ de:'(und dann bin ich bereit)',
              ru:'(и тогда я буду готова)',
              en:'(and I\'ll be ready)' },
      s11l42:{ de:'Immer wieder',
              ru:'Снова и снова',
              en:'over and over' },
      s11l43:{ de:'Wieder und wieder',
              ru:'Опять и опять',
              en:'Again and again' },
      s11l44:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s11l45:{ de:'Und danach noch fünf Minuten',
              ru:'А потом ещё пять минут',
              en:'after five more minutes' },
      s11l46:{ de:'(er wartet und wartet)',
              ru:'(он ждёт и ждёт)',
              en:'(he\'s waiting and waiting)' },
      s11l47:{ de:'Noch fünf Minuten',
              ru:'Ещё пять минут',
              en:'Five more minutes' },
      s11l48:{ de:'(und dann bin ich bereit)',
              ru:'(и тогда я буду готова)',
              en:'(and I\'ll be ready)' },
      s11l49:{ de:'Noch fünf Minuten …',
              ru:'Ещё пять минут …',
              en:'Five more minutes…' }
    },

    secs:[
      { id:'chorus', label:'Chorus', lines:['s11l01', 's11l02', 's11l03', 's11l04', 's11l05', 's11l06', 's11l07', 's11l08'] },
      { id:'verse1', label:'Verse 1', lines:['s11l09', 's11l10', 's11l11', 's11l12', 's11l13', 's11l14', 's11l15', 's11l16'] },
      { id:'verse2', label:'Verse 2', lines:['s11l17', 's11l18', 's11l19', 's11l20', 's11l21', 's11l22', 's11l23', 's11l24', 's11l25', 's11l26', 's11l27'] },
      { id:'bridge', label:'Bridge', lines:['s11l28', 's11l29', 's11l30', 's11l31', 's11l32', 's11l33'] },
      { id:'outro', label:'Outro', lines:['s11l34', 's11l35', 's11l36', 's11l37', 's11l38', 's11l39', 's11l40', 's11l41', 's11l42', 's11l43', 's11l44', 's11l45', 's11l46', 's11l47', 's11l48', 's11l49'] }
    ],

    play:['chorus', 'verse1', 'chorus', 'verse2', 'bridge', 'chorus', 'outro']
  },

  {
    audio:'wo-ist-mein-verdammtes-handy',
    title:{ de:'Wo ist mein verdammtes Handy?', ru:'Где мой чёртов телефон?', en:'Where\'s My Damn Phone?' },

    lines:{
      s12l01:{ de:'Startklar, ich will raus durch die Tür',
              ru:'Готова, я хочу выйти наружу через дверь',
              en:'Ready to head on out that door' },
      s12l02:{ de:'Doch mein verdammtes Handy ist weg',
              ru:'Но мой чёртов телефон пропал',
              en:'But I can\'t find where I put my damn phone' },
      s12l03:{ de:'Ich sollte schon vor fünf Minuten los',
              ru:'Мне следовало уйти уже пять минут назад',
              en:'I needed to leave five minutes ago' },
      s12l04:{ de:'Wo zur Hölle ist mein verdammtes Handy?',
              ru:'Где, к чёрту, мой чёртов телефон?',
              en:'But where the hell is my damn phone?' },
      s12l05:{ de:'Wo ist es, wo ist es?',
              ru:'Где он, где он?',
              en:'Where is it, where is it?' },
      s12l06:{ de:'Wo ist mein Handy?',
              ru:'Где мой телефон?',
              en:'Where\'s my phone?' },
      s12l07:{ de:'Startklar, ich will raus durch die Tür',
              ru:'Готова, я хочу выйти наружу через дверь',
              en:'I am all ready to head out that door' },
      s12l08:{ de:'Warum passiert das immer, wenn ich spät dran bin?',
              ru:'Почему это всегда происходит, когда я опаздываю?',
              en:'But why does this always happen when I\'m running late?' },
      s12l09:{ de:'Ich fass es nicht, lauf hin und her',
              ru:'Не могу поверить, хожу туда-сюда',
              en:'I can\'t believe it, I\'m pacing the floor' },
      s12l10:{ de:'Als ob bei einem Date Pünktlichkeit zählt',
              ru:'Как будто на свидании пунктуальность имеет значение',
              en:'Not like being on time matters when you\'re meeting a date' },
      s12l11:{ de:'Ich such oben, ich such unten, schau unters Bett',
              ru:'Я ищу наверху, я ищу внизу, смотрю под кровать',
              en:'I look high, I look low, I look under the bed' },
      s12l12:{ de:'Mal schnell, mal langsam, geh ich Schritt für Schritt zurück',
              ru:'То быстро, то медленно, я иду шаг за шагом назад',
              en:'I move fast, then slow, retracing my steps' },
      s12l13:{ de:'Ich fass es nicht, ich find es einfach nicht',
              ru:'Не могу поверить, я просто не могу его найти',
              en:'I can\'t believe I cannot find it' },
      s12l14:{ de:'Wo hab ich\'s hingelegt?',
              ru:'Куда я его положила?',
              en:'Where did I put it down?' },
      s12l15:{ de:'Ich muss, muss es finden',
              ru:'Я должна, должна его найти',
              en:'I gotta, gotta find it' },
      s12l16:{ de:'Ich renn im Kreis herum',
              ru:'Я бегаю по кругу',
              en:'I\'m running around' },
      s12l17:{ de:'Wie ein kopfloses Huhn',
              ru:'Как безголовая курица',
              en:'Like a chicken with no head' },
      s12l18:{ de:'Die Uhr zählt weiter runter',
              ru:'Часы продолжают отсчитывать вниз',
              en:'While the clock keeps counting down' },
      s12l19:{ de:'Ich brauch den Segen von da oben',
              ru:'Мне нужно благословение оттуда сверху',
              en:'I need some blessings from heaven above' },
      s12l20:{ de:'Oder Glück, das mir zufliegt',
              ru:'Или удача, которая прилетает ко мне',
              en:'Or a little luck thrown at me' },
      s12l21:{ de:'Mein Handy und ich – wie Hand im Handschuh',
              ru:'Мой телефон и я — как рука в перчатке',
              en:'Me and my phone are like a hand and a glove' },
      s12l22:{ de:'Doch wo es ist, bleibt ein Rätsel',
              ru:'Но где он — остаётся загадкой',
              en:'But where I left it is a mystery' },
      s12l23:{ de:'Endlich, endlich, längst viel zu spät',
              ru:'Наконец, наконец, уже давно слишком поздно',
              en:'At last, at last, and I\'m already so late' },
      s12l24:{ de:'Mein Handy klemmte tief im Sofa',
              ru:'Мой телефон застрял глубоко в диване',
              en:'I found my phone stuck inside the couch' },
      s12l25:{ de:'Jemand spielt hier mit meinem Schicksal',
              ru:'Кто-то здесь играет с моей судьбой',
              en:'But someone\'s having fun with my fate' },
      s12l26:{ de:'Der Akku: nur noch dreizehn Prozent',
              ru:'Аккумулятор: осталось только тринадцать процентов',
              en:'Just thirteen percent left on the battery' },
      s12l27:{ de:'Dreizehn Prozent?!',
              ru:'Тринадцать процентов?!',
              en:'Thirteen percent?!' },
      s12l28:{ de:'Das darf doch nicht wahr sein …',
              ru:'Это же не может быть правдой…',
              en:'Oh, you\'ve gotta be kidding me…' },
      s12l29:{ de:'Wo ist es, wo ist es?',
              ru:'Где оно, где оно?',
              en:'Where is it, where is it?' },
      s12l30:{ de:'Wo ist mein Ladegerät?',
              ru:'Где моё зарядное устройство?',
              en:'Where\'s my charger?' }
    },

    secs:[
      { id:'chorus', label:'Chorus', lines:['s12l01', 's12l02', 's12l03', 's12l04', 's12l05', 's12l06', 's12l05', 's12l06'] },
      { id:'verse1', label:'Verse 1', lines:['s12l07', 's12l08', 's12l09', 's12l10'] },
      { id:'verse2', label:'Verse 2', lines:['s12l11', 's12l12', 's12l13', 's12l14', 's12l15', 's12l16', 's12l17', 's12l18'] },
      { id:'bridge', label:'Bridge', lines:['s12l19', 's12l20', 's12l21', 's12l22'] },
      { id:'outro', label:'Outro', lines:['s12l23', 's12l24', 's12l25', 's12l26', 's12l27', 's12l28', 's12l29', 's12l30', 's12l29', 's12l30'] }
    ],

    play:['chorus', 'verse1', 'chorus', 'verse2', 'bridge', 'chorus', 'outro']
  },

  {
    audio:'mathe-rebellen',
    title:{ de:'Mathe-Rebellen', ru:'Математические бунтари', en:'Math Rebels' },

    lines:{
      s13l01:{ de:'Mathe den ganzen Tag, keine Zeit zum Spielen,',
              ru:'Математика весь день, нет времени играть,',
              en:'Math all day, no time to play,' },
      s13l02:{ de:'Der Lehrer ist gemein, zwingt uns zu bleiben,',
              ru:'Учитель злой, заставляет нас оставаться,',
              en:'Teacher\'s mean, makes us stay,' },
      s13l03:{ de:'Kein Entkommen, nur endlose Summen,',
              ru:'Никакого спасения, только бесконечные суммы,',
              en:'No escape, just endless sums,' },
      s13l04:{ de:'Mathe ist das Elend, da kommt es!',
              ru:'Математика — это страдание, вот оно идёт!',
              en:'Math is misery, here it comes!' },
      s13l05:{ de:'Ich komme zum Matheunterricht, die Folter beginnt,',
              ru:'Я прихожу на урок математики, пытка начинается,',
              en:'I come to Math class, the torture begins,' },
      s13l06:{ de:'Es ist, als würde ich für all meine Sünden bezahlen,',
              ru:'Это как будто я плачу за все свои грехи,',
              en:'It\'s like I\'m payin\' for all my sins,' },
      s13l07:{ de:'In irgendeinem früheren Leben, in dem ich Schlechtes getan habe,',
              ru:'В какой-то прошлой жизни, в которой я делала плохое,',
              en:'In some past life where I did bad,' },
      s13l08:{ de:'Und jetzt sitze ich hier, sehr traurig.',
              ru:'И теперь я сижу здесь, очень грустная.',
              en:'And now I sit here, very sad.' },
      s13l09:{ de:'Einfach zu viele Zahlen für mein Gehirn',
              ru:'Просто слишком много чисел для моего мозга',
              en:'Just too many numbers for my brain' },
      s13l10:{ de:'Ich wünschte, ich könnte aus diesen Ketten ausbrechen',
              ru:'Я бы хотела, чтобы я могла вырваться из этих цепей',
              en:'I wish I could break out of these chains' },
      s13l11:{ de:'Endlose Zahlen, endloser Schmerz,',
              ru:'Бесконечные числа, бесконечная боль,',
              en:'Endless numbers, endless pain,' },
      s13l12:{ de:'Die Regeln des Lehrers treiben uns in den Wahnsinn,',
              ru:'Правила учителя сводят нас с ума,',
              en:'Teacher\'s rules, drive us insane,' },
      s13l13:{ de:'Mathe ist schwer; die Freude ist weg,',
              ru:'Математика трудная; радость исчезла,',
              en:'Math is hard; joy is gone,' },
      s13l14:{ de:'Hölle auf Erden, lasst uns dieses Lied singen.',
              ru:'Ад на Земле, давайте споём эту песню.',
              en:'Hell on Earth, let\'s sing this song.' },
      s13l15:{ de:'Probleme häufen sich, kein Ende in Sicht,',
              ru:'Задачи накапливаются, конца не видно,',
              en:'Problems pile, no end in sight,' },
      s13l16:{ de:'Mathe den ganzen Tag und bis in die Nacht,',
              ru:'Математика весь день и до самой ночи,',
              en:'Math all day, and into night,' },
      s13l17:{ de:'Unser Verstand ist taub, unser Geist ist schwach,',
              ru:'Наш разум онемел, наш дух слаб,',
              en:'Our minds are numb, our spirits weak,' },
      s13l18:{ de:'Der Matheunterricht lässt uns trostlos zurück.',
              ru:'Урок математики оставляет нас безутешными.',
              en:'Math class leaves us feeling bleak.' },
      s13l19:{ de:'Zahlen zählen, den Überblick verlieren,',
              ru:'Считать числа, терять представление о происходящем,',
              en:'Counting numbers, losing track,' },
      s13l20:{ de:'Wir wünschen, wir könnten einfach weg,',
              ru:'Мы хотим, чтобы мы могли просто уйти,',
              en:'Wishing we could just turn back,' },
      s13l21:{ de:'Nur ein wacher Albtraum, ganz schwarz!',
              ru:'Только кошмар наяву, весь чёрный!',
              en:'Just a waking nightmare all black!' },
      s13l22:{ de:'Probleme stapeln sich, wir verlieren die Hoffnung,',
              ru:'Задачи складываются в стопку, мы теряем надежду,',
              en:'Problems stack, we\'re losing hope,' },
      s13l23:{ de:'Der Lehrer ist streng, wir kommen einfach nicht zurecht,',
              ru:'Учитель строгий, мы просто не справляемся,',
              en:'Teacher\'s strict, we just can\'t cope,' },
      s13l24:{ de:'Tag für Tag leiden wir weiter,',
              ru:'День за днём мы продолжаем страдать,',
              en:'Day by day, we suffer on,' },
      s13l25:{ de:'Der Matheunterricht saugt uns aus, bis wir weg sind!',
              ru:'Урок математики высасывает нас, пока мы не исчезнем!',
              en:'Math class drains us till we\'re gone!' },
      s13l26:{ de:'(Der Lehrer ist ein Vampir!)',
              ru:'(Учитель — вампир!)',
              en:'(The teacher\'s a vampire!)' },
      s13l27:{ de:'Wir haben genug, wir werden uns nicht fügen,',
              ru:'С нас достаточно, мы не будем подчиняться,',
              en:'We\'ve had enough, we won\'t comply,' },
      s13l28:{ de:'Wir werfen unsere Bücher, lassen Mathe vorbeiziehen,',
              ru:'Мы бросаем наши книги, позволяем математике пройти мимо,',
              en:'Toss our books, let math go by,' },
      s13l29:{ de:'Rebellieren müssen wir, keine Verzweiflung mehr,',
              ru:'Бунтовать мы должны, больше никакого отчаяния,',
              en:'Rebel we must, no more despair,' },
      s13l30:{ de:'Der Lehrer ist wütend, es ist uns einfach egal',
              ru:'Учитель злой, нам просто всё равно',
              en:'Teacher\'s mad, we just don\'t care' },
      s13l31:{ de:'Bleistifte runter, und sie bleiben unten',
              ru:'Карандаши вниз, и они остаются внизу',
              en:'Pencils down they\'re gonna stay down' },
      s13l32:{ de:'Wir sind fertig; wir halten stand',
              ru:'Мы закончили; мы держим свою позицию',
              en:'We are done; we\'re standing our ground' },
      s13l33:{ de:'Jetzt schrubben wir und wischen den Boden,',
              ru:'Теперь мы скребём и моем пол,',
              en:'Now we scrub, and mop the floor,' },
      s13l34:{ de:'Mathe ist weg, doch so viel mehr auch,',
              ru:'Математика исчезла, но и намного больше тоже,',
              en:'Math is gone, but so much more,' },
      s13l35:{ de:'Jetzt sind wir Putzkräfte bei McDonald\'s,',
              ru:'Теперь мы уборщики в McDonald\'s,',
              en:'Janitors now, at McDonald\'s,' },
      s13l36:{ de:'Unsere Rebellion endete nicht so gut.',
              ru:'Наш бунт закончился не так хорошо.',
              en:'Our rebellion didn\'t end so well.' },
      s13l37:{ de:'Wir haben die Schlacht gewonnen, aber den Krieg verloren,',
              ru:'Мы выиграли битву, но проиграли войну,',
              en:'We won the battle, but lost the war,' },
      s13l38:{ de:'Mathe war grausam, jetzt wischen wir den Boden,',
              ru:'Математика была жестокой, теперь мы моем пол,',
              en:'Math was cruel, now we mop the floor,' },
      s13l39:{ de:'Lektionen gelernt, kein einfacher Weg,',
              ru:'Уроки усвоены, никакого простого пути,',
              en:'Lessons learned, no easy way,' },
      s13l40:{ de:'Mathe ist der Boss, und wir gehorchen.',
              ru:'Математика — босс, и мы подчиняемся.',
              en:'Math\'s the boss, and we obey.' },
      s13l41:{ de:'Also, wenn du im grausamen Griff der Mathematik feststeckst,',
              ru:'Итак, если ты застрял в жестокой хватке математики,',
              en:'So if you\'re stuck in math\'s cruel grip,' },
      s13l42:{ de:'Geh auf die Reise und tritt die Fahrt an,',
              ru:'Отправляйся в путешествие и начинай поездку,',
              en:'Go on the journey and take the trip,' },
      s13l43:{ de:'Lern die Zahlen, gib dein Bestes,',
              ru:'Учи числа, делай всё возможное,',
              en:'Learn the numbers, do your best,' },
      s13l44:{ de:'Oder du wirst am Ende die Unordnung aufräumen.',
              ru:'Или в конце ты будешь убирать беспорядок.',
              en:'Or you\'ll end up cleaning the mess.' },
    },

    secs:[
      { id:'chorus1', label:'Chorus 1', lines:['s13l01', 's13l02', 's13l03', 's13l04'] },
      { id:'verse1', label:'Verse 1', lines:['s13l05', 's13l06', 's13l07', 's13l08', 's13l09', 's13l10'] },
      { id:'chorus2', label:'Chorus 2', lines:['s13l11', 's13l12', 's13l13', 's13l14'] },
      { id:'verse2', label:'Verse 2', lines:['s13l15', 's13l16', 's13l17', 's13l18', 's13l19', 's13l20', 's13l21'] },
      { id:'chorus3', label:'Chorus 3', lines:['s13l22', 's13l23', 's13l24', 's13l25', 's13l26'] },
      { id:'verse3', label:'Verse 3', lines:['s13l27', 's13l28', 's13l29', 's13l30', 's13l31', 's13l32'] },
      { id:'bridge', label:'Bridge', lines:['s13l33', 's13l34', 's13l35', 's13l36'] },
      { id:'outro', label:'Outro', lines:['s13l37', 's13l38', 's13l39', 's13l40', 's13l41', 's13l42', 's13l43', 's13l44'] }
    ],

    play:['chorus1', 'verse1', 'chorus2', 'verse2', 'chorus3', 'verse3', 'chorus1', 'bridge', 'outro']
  }
,

  {
    audio:'wer-braucht-schon-die-sonne',
    title:{ de:'Wer braucht schon die Sonne?', ru:'Кому вообще нужно солнце?', en:'Who needs the sun?' },

    lines:{
      s14l01:{ de:'Wer braucht schon die Sonne? Ich liebe Regen, Regen, Regen',
              ru:'Кому вообще нужно солнце? Я люблю дождь, дождь, дождь',
              en:'Who needs the sun? I love the rain, rain, rain' },
      s14l02:{ de:'Wer braucht warmen Sonnenschein, warmen, warmen Sonnenschein?',
              ru:'Кому нужен тёплый солнечный свет, тёплый, тёплый солнечный свет?',
              en:'Who needs warm sunshine, warm, warm sunshine?' },
      s14l03:{ de:'Sonne, geh weg',
              ru:'Солнце, уходи',
              en:'Sunshine, go away' },
      s14l04:{ de:'Sonne, geh weg',
              ru:'Солнце, уходи',
              en:'Sunshine, go away' },
      s14l05:{ de:'Ich will den ganzen Tag nass sein',
              ru:'Я хочу весь день быть мокрым',
              en:'I want to be wet all day' },
      s14l06:{ de:'Ich will den ganzen Tag nass sein',
              ru:'Я хочу весь день быть мокрым',
              en:'I want to be wet all day' },
      s14l07:{ de:'Wer braucht schon Wärme?',
              ru:'Кому вообще нужно тепло?',
              en:'Who needs to be warm?' },
      s14l08:{ de:'Es war ein schöner Tag, ich lief einfach so',
              ru:'Это был прекрасный день, я просто шёл себе',
              en:'It was a happy day, I was walking along' },
      s14l09:{ de:'Der Himmel war blau und die Luft war warm',
              ru:'Небо было голубым, и воздух был тёплым',
              en:'And the sky was blue and the air was warm' },
      s14l10:{ de:'Doch dann kamen Wolken und machten mir klar',
              ru:'Но потом пришли облака и дали мне понять',
              en:'But then the clouds came and made it clear' },
      s14l11:{ de:'Der Himmel hatte genug von all dem Glück',
              ru:'Что небу уже хватит всего этого счастья',
              en:'The sky had had enough of all that cheer' },
      s14l12:{ de:'Zeit, dass die Wolken mir die Parade verregnen',
              ru:'Пора облакам испортить дождём мой праздник',
              en:'Time for the clouds to rain on my parade' },
      s14l13:{ de:'Zeit, dass die Sonne endlich verschwindet',
              ru:'Пора солнцу наконец исчезнуть',
              en:'Time for the sun to finally go away' },
      s14l14:{ de:'Zeit, dass mein Tag zu einem Fluss vom Himmel wird',
              ru:'Пора моему дню превратиться в реку с неба',
              en:'Time for my day to become a river from the sky' },
      s14l15:{ de:'Zeit, dass die Wolken mir ins Auge pissen',
              ru:'Пора облакам нассать мне в глаз',
              en:'Time for the clouds to piss in my eye' },
      s14l16:{ de:'Später am Tag sah ich ein bisschen Sonne',
              ru:'Позже в тот день я увидел немного солнца',
              en:'Later that day, I saw a little bit of sun' },
      s14l17:{ de:'Sie wollte durch die Wolken schauen, doch dann war sie weg',
              ru:'Оно хотело выглянуть сквозь облака, но потом исчезло',
              en:'It tried to peek through the clouds, but then it was gone' },
      s14l18:{ de:'Die Wolken waren mit dem Regen noch nicht fertig',
              ru:'Облака ещё не закончили со своим дождём',
              en:'The clouds were not finished with all their rain' },
      s14l19:{ de:'Sie wollten mir einfach noch mehr Wasser geben',
              ru:'Они просто хотели дать мне ещё немного воды',
              en:'They just wanted to give me some more water again' },
      s14l20:{ de:'Etwas in meinen Schuh, und jede Menge in mein Haar',
              ru:'Немного в мой ботинок и целую кучу в мои волосы',
              en:'Some in my shoe, and lots in my hair' },
      s14l21:{ de:'Ich hab wirklich überall genug Wasser',
              ru:'У меня и правда воды уже повсюду хватает',
              en:'I really have plenty of water everywhere' },
      s14l22:{ de:'Der Regen hörte nicht mehr auf, nachdem er angefangen hatte',
              ru:'Дождь так и не прекратился после того, как начался',
              en:'The rain never stopped after it started' },
      s14l23:{ de:'Die Sonne kam nicht zurück, die Wolken teilten sich nicht',
              ru:'Солнце не вернулось, облака не разошлись',
              en:'The sun didn\'t come back, the clouds never parted' },
      s14l24:{ de:'Ich würde sagen, ich wäre gern warm',
              ru:'Я бы сказал, что хотел бы быть в тепле',
              en:'I would say I\'d like to be warm' },
      s14l25:{ de:'Doch das wird niemals sein',
              ru:'Но этого никогда не будет',
              en:'But that will never be' },
      s14l26:{ de:'Der Himmel hat entschieden',
              ru:'Небо решило',
              en:'The sky has decided' },
      s14l27:{ de:'Er will mich einfach ertränken',
              ru:'Что оно просто хочет меня утопить',
              en:'It just wants to drown me' },
      s14l28:{ de:'Wenn er mich schon nicht gewinnen lässt',
              ru:'Если оно всё равно не даст мне победить',
              en:'If it won\'t let me win' },
      s14l29:{ de:'Muss ich wohl schwimmen lernen',
              ru:'Значит, мне, наверное, придётся научиться плавать',
              en:'I guess I just need to learn to swim' },
      s14l30:{ de:'Der Tag ist fast vorbei, und die Wolken sind endlich fertig',
              ru:'День почти закончился, и облака наконец-то тоже закончили',
              en:'The day is nearly done, and the clouds are finally done' },
      s14l31:{ de:'Doch für ein bisschen Sonne ist es jetzt zu spät',
              ru:'Но теперь уже слишком поздно для хоть какого-нибудь солнца',
              en:'But now it\'s too late to have any sun' },
      s14l32:{ de:'Sie sinkt hinter den Horizont, und jetzt bekomme ich die Nacht',
              ru:'Оно садится за горизонт, и теперь мне достаётся ночь',
              en:'It sinks behind the horizon, and now I get the night' },
      s14l33:{ de:'Also steh ich hier mit Wasser im Schuh und seufze nur',
              ru:'Так что я просто стою здесь с водой в ботинке и вздыхаю',
              en:'So with water in my shoe, I just stand here and sigh' },
      s14l34:{ de:'Wer brauchte schon einen schönen sonnigen Tag?',
              ru:'Кому вообще был нужен хороший солнечный день?',
              en:'Who needed a nice sunny day?' },
      s14l35:{ de:'Regen, Regen, Regen und Wolken',
              ru:'Дождь, дождь, дождь и облака',
              en:'Rain, rain, rain and clouds' },
      s14l36:{ de:'Haben meine Sonne',
              ru:'Моё солнце',
              en:'Made my sun' },
      s14l37:{ de:'Vertrieben',
              ru:'Прогнали',
              en:'Go away' },
    },

    secs:[
      { id:'chorus', label:'Chorus', lines:['s14l01', 's14l02', 's14l03', 's14l04', 's14l05', 's14l06', 's14l07'] },
      { id:'verse1', label:'Verse 1', lines:['s14l08', 's14l09', 's14l10', 's14l11', 's14l12', 's14l13', 's14l14', 's14l15'] },
      { id:'verse2', label:'Verse 2', lines:['s14l16', 's14l17', 's14l18', 's14l19', 's14l20', 's14l21', 's14l22', 's14l23'] },
      { id:'bridge', label:'Bridge', lines:['s14l24', 's14l25', 's14l26', 's14l27', 's14l28', 's14l29'] },
      { id:'outro', label:'Outro', lines:['s14l30', 's14l31', 's14l32', 's14l33', 's14l34', 's14l35', 's14l36', 's14l37'] }
    ],

    play:['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'bridge', 'chorus', 'outro']
  },

  /* ------------------------------------------------------------------
     15. MEIN HERZ WILL NACH HAUSE

     Steven's, and the only song here that is not a lesson dressed up as
     one — it is autobiographical, about leaving Ukraine. Everything else
     in this file teaches a grammar point or a topic; this one is on the
     site because it is hers.

     THE CHORUS AND THE LAST LINE ARE STORED ONCE. `s15l01` and `s15l02`
     close the chorus as well as opening it, and `s15l43` is the outro's
     last two lines, so both appear twice in a `lines` array and once in
     the data. That is the same shape der-kleine-ninja and
     dein-koerper-braucht-liebe already use; storing a repeat twice would
     mean two rows to keep in step for one lyric.

     `play` names `chorus` four times. The lines are not duplicated for
     that either — the section is played again, not copied.

     Audio: audio/mein-herz-will-nach-hause.ogg. The filename is the
     slugified German title, which every one of the other fourteen
     follows; the audit reads the name out of this file, so a rename on
     either side shows up as a missing file rather than as silence. */

  /* ------------------------------------------------------------------
     16. SO ZOG ICH IN EINEN KERKER

     Steven's own, words and all three languages. The longest song in the
     file by a distance: 79 unique lines, 115 as played, and the outro
     alone is 35 of them.

     THE CHORUS IS STORED ONCE and named four times in `play`. Twelve
     lines x 4 would have been 48 rows to keep in step for twelve lyrics.

     THE OUTRO IS NOT A SECTION THAT REPEATS — it is one long run that
     counts upward, so every line of it is its own row.

     NO `instrumental` MARKER. The draft transcript carried one where the
     count pauses before resuming, and it is gone: the take Steven chose
     has no break there, so the line would have put a pause on screen
     that the audio never plays. A marker for something not in the
     recording is worse than no marker at all.

     `Groove` and `Grind` are left in English inside the German, as
     written. They are what the line says.

     Audio: audio/so-zog-ich-in-einen-kerker.ogg. */
  {
    n: 16,
    audio: 'also-zog-ich-in-nen-kerker',
    title: {
      /* The chorus's own opening line, so the title matches what she
         hears rather than being a tidied-up version of it. The audio
         filename was renamed to match — `also-zog-ich-in-nen-kerker` —
         so this song keeps the slugified-title convention every other
         one follows, with the apostrophe in 'nen dropped the way every
         other slug drops punctuation. */
      de: "Also zog ich in 'nen Kerker",
      ru: 'Вот я и въехала в подземелье',
      en: 'So I Moved Into a Dungeon'
    },
    lines: {
    s16l01: { de:'Also zog ich in \'nen Kerker', ru:'Вот я въехала в подземелье', en:'So I moved into a dungeon' },
    s16l02: { de:'Und ließ zehn Kilo zurück', ru:'И оставила десять кило позади', en:'And I left ten kilos behind' },
    s16l03: { de:'Farbe klebte auf meinem T-Shirt', ru:'Краска прилипла к моей футболке', en:'Got paint all on my T-shirt' },
    s16l04: { de:'Und ein bisschen an der Wand', ru:'И немножко попало на стену', en:'And some got on the walls' },
    s16l05: { de:'Ich hielt meinen Kopf schön hoch', ru:'Я держала голову высоко', en:'I held my head up high' },
    s16l06: { de:'Dann ging ich runter auf den Boden', ru:'А потом опустилась к полу', en:'Then got down to the floor' },
    s16l07: { de:'Da musste erst ein Boden hin', ru:'Потому что сначала надо было положить пол', en:'I had to put one down there' },
    s16l08: { de:'Und noch so vieles mehr', ru:'И сделать ещё столько всего', en:'And had to do much more' },
    s16l09: { de:'Ein Fuß ging nach links', ru:'Одна нога пошла налево', en:'I put one foot to the left' },
    s16l10: { de:'Und der andere nach rechts', ru:'А другая направо', en:'And one foot to the right' },
    s16l11: { de:'Ich musste mich bewegen, meinen Groove finden', ru:'Мне пришлось двигаться, искать свой грув', en:'I had to move and get my groove' },
    s16l12: { de:'Und arbeiten Tag und Nacht', ru:'И работать день и ночь', en:'And work both day and night' },
    s16l13: { de:'Nein, es war wirklich kein Palast', ru:'Нет, это точно был не дворец', en:'No, it sure was no palace' },
    s16l14: { de:'Es war kein Taj Mahal', ru:'Это был не Тадж-Махал', en:'It was no Taj Mahal' },
    s16l15: { de:'Es waren nicht die Pyramiden von Gizeh', ru:'Это были не пирамиды Гизы', en:'It wasn\'t the pyramids of Giza' },
    s16l16: { de:'Es waren kaum vier Wände da', ru:'Там едва было четыре стены', en:'It was barely four walls' },
    s16l17: { de:'Es brauchte Farbe, es brauchte \'nen Boden', ru:'Нужна была краска, нужен был пол', en:'It needed paint, it needed a floor' },
    s16l18: { de:'Es brauchte eine Küche', ru:'Нужна была кухня', en:'It needed a kitchen' },
    s16l19: { de:'Fast hätte auch die Tür gefehlt', ru:'И чуть было не оказалось даже двери', en:'It nearly needed a door' },
    s16l20: { de:'Ich weiß nicht, wie ich das geschafft hab', ru:'Я не знаю, как я это сделала', en:'I don\'t know how I did it' },
    s16l21: { de:'Ich weiß nicht, ob ich\'s noch mal könnte', ru:'Я не знаю, смогла бы я сделать это ещё раз', en:'I don\'t know if I could do it again' },
    s16l22: { de:'Doch irgendwie hab ich\'s geschafft', ru:'Но каким-то образом я справилась', en:'But somehow I made it' },
    s16l23: { de:'Und jetzt bin ich wieder dünn', ru:'И теперь я снова худая', en:'And now I\'m back to being thin' },
    s16l24: { de:'Ich musste Kisten schleppen', ru:'Мне пришлось таскать коробки', en:'I had to move some boxes' },
    s16l25: { de:'Und noch viel mehr Zeug', ru:'И ещё кучу вещей', en:'And had to move more stuff' },
    s16l26: { de:'Ich schleppte und schleppte und schleppte', ru:'Я таскала, таскала и таскала', en:'I kept on moving, and moving and moving' },
    s16l27: { de:'Und es schien einfach nie genug', ru:'И казалось, что этого никогда не кончится', en:'There never seemed to be enough' },
    s16l28: { de:'Ich schuftete wie ein Hund', ru:'Я пахала как пёс', en:'I worked like a dog' },
    s16l29: { de:'Und schuftete wie sein Knochen', ru:'И пахала как его кость', en:'And worked like his bone' },
    s16l30: { de:'Und schuftete und schuftete und schuftete, bis es fertig war', ru:'И пахала, пахала и пахала, пока всё не было закончено', en:'And worked and worked and worked and did it' },
    s16l31: { de:'Und ich tat es ganz allein', ru:'И я сделала всё совсем одна', en:'And I did it all alone' },
    s16l32: { de:'Du denkst, Umziehen ist das Schlimmste?', ru:'Думаешь, переезд — это самое худшее?', en:'You think moving is the worst?' },
    s16l33: { de:'Zieh mal eines Tages in \'nen Kerker', ru:'Попробуй однажды въехать в подземелье', en:'Try moving into a dungeon someday' },
    s16l34: { de:'Und dreh dann den ganzen verdammten Ort um', ru:'А потом перевернуть всё это чёртово место', en:'Then turning the whole damn place around' },
    s16l35: { de:'Bis man irgendwie drin wohnen kann', ru:'Чтобы там хоть как-то можно было жить', en:'Into somewhere you can stay' },
    s16l36: { de:'Ich hab\'s gemacht, und ich kann nur sagen...', ru:'Я это сделала, и могу сказать только одно...', en:'I did it, and all I have to say is...' },
    s16l37: { de:'Ich war oben, ich war unten', ru:'Я была наверху, я была внизу', en:'I moved up, I moved down' },
    s16l38: { de:'Ich war überall', ru:'Я была повсюду', en:'I moved all around' },
    s16l39: { de:'Kein einziger Fleck blieb unberührt', ru:'Не осталось ни одного нетронутого места', en:'There\'s not one spot that went untouched' },
    s16l40: { de:'Nicht die Wände, nicht der Boden', ru:'Ни стены, ни пола', en:'Not the walls, not the ground' },
    s16l41: { de:'Ich strich und schleppte, ich weiß nicht mal was', ru:'Я красила и таскала, сама не знаю что', en:'I painted and lifted, I don\'t even know what' },
    s16l42: { de:'Ich kam richtig in den Grind', ru:'Я реально втянулась в эту пахоту', en:'I got myself into the grind' },
    s16l43: { de:'Ich schleppte Kisten und Kisten und bewegte meinen Hintern', ru:'Я таскала коробки и коробки и двигала попой', en:'I moved boxes and boxes and moved my butt' },
    s16l44: { de:'Und ließ diese zehn Kilo zurück', ru:'И оставила эти десять кило позади', en:'And left those ten kilos behind' },
    s16l45: { de:'Wenn du mal Sorgen hast', ru:'Если у тебя когда-нибудь будут проблемы', en:'So if you ever have some worries' },
    s16l46: { de:'Und irgendwann mal Zweifel', ru:'И когда-нибудь появятся сомнения', en:'And ever have some doubts' },
    s16l47: { de:'Zieh einfach in einen Kerker', ru:'Просто въедь в подземелье', en:'Just try moving into a dungeon' },
    s16l48: { de:'Und arbeite die Probleme raus', ru:'И выработай все эти проблемы', en:'And work those problems out' },
    s16l49: { de:'Beweg dich hoch, beweg dich runter', ru:'Двигайся вверх, двигайся вниз', en:'Just move up, just move down' },
    s16l50: { de:'Beweg dich überall herum', ru:'Двигайся повсюду', en:'Just move all around' },
    s16l51: { de:'Streich einfach die Wände', ru:'Просто покрась стены', en:'Just paint the walls' },
    s16l52: { de:'Und leg den Boden rein', ru:'И положи пол', en:'And lay the ground' },
    s16l53: { de:'Setz einen Fuß hin, dann den anderen', ru:'Поставь одну ногу, потом другую', en:'Put one foot down, then put down another' },
    s16l54: { de:'Und schuft wie ein Hund', ru:'И паши как пёс', en:'And work like a dog' },
    s16l55: { de:'Dann schuft wie sein Bruder', ru:'Потом паши как его брат', en:'Then work like his brother' },
    s16l56: { de:'Dann schuft wie der Knochen', ru:'Потом паши как кость', en:'Then work like the bone' },
    s16l57: { de:'An dem die beiden zusammen kauen', ru:'Которую они оба вместе грызут', en:'That they both chew' },
    s16l58: { de:'Und schuft und schuft immer weiter', ru:'И паши, и паши дальше', en:'And keep working and working' },
    s16l59: { de:'Es gibt viel zu viel zu tun', ru:'Дел ещё слишком много', en:'There\'s way too much to do' },
    s16l60: { de:'Beweg deine Hüften', ru:'Двигай бёдрами', en:'Move your hips' },
    s16l61: { de:'Und beweg deinen Hintern herum', ru:'И двигай попой', en:'And move your butt around' },
    s16l62: { de:'Und schlepp noch eine Kiste', ru:'И тащи ещё одну коробку', en:'And move another box' },
    s16l63: { de:'Und die halbe Stadt', ru:'И половину города', en:'And half the town' },
    s16l64: { de:'Dann ist ein Kilo weg', ru:'Вот один килограмм исчез', en:'You\'ll find a kilo gone and' },
    s16l65: { de:'Und gleich noch eins hinterher', ru:'А за ним сразу ещё один', en:'Then another kilo down' },
    s16l66: { de:'Das ist der Diätplan', ru:'Это тот самый план диеты', en:'It\'s the diet plan' },
    s16l67: { de:'Von dem jetzt alle reden', ru:'О котором теперь говорят все', en:'They are talking about all around' },
    s16l68: { de:'Und schlepp eine Kiste', ru:'И тащи коробку', en:'And move a box' },
    s16l69: { de:'Und schlepp noch eine Kiste', ru:'И тащи ещё одну коробку', en:'And move another box' },
    s16l70: { de:'Dann schlepp eine Kiste', ru:'Потом тащи коробку', en:'Then move a box' },
    s16l71: { de:'Und schlepp eine Kiste!', ru:'И тащи коробку!', en:'And move a box!' },
    s16l72: { de:'Oder zwei, oder drei', ru:'Или две, или три', en:'Or two, or three' },
    s16l73: { de:'Oder vier, oder fünf', ru:'Или четыре, или пять', en:'Or four, or five' },
    s16l74: { de:'Oder sechs, oder sieben', ru:'Или шесть, или семь', en:'Or six, or seven' },
    s16l75: { de:'Oder acht, oder neun...', ru:'Или восемь, или девять...', en:'Or eight, or nine...' },
    s16l76: { de:'Oder zehn!', ru:'Или десять!', en:'Or ten!' },
        s16l78: { de:'oder elf, oder zwölf...', ru:'или одиннадцать, или двенадцать...', en:'or eleven, or twelve...' },
    s16l79: { de:'oder dreizehn, oder vierzehn...', ru:'или тринадцать, или четырнадцать...', en:'or thirteen, or fourteen...' }
    },
    secs: [
      { id:'chorus', label:'Chorus', lines:['s16l01', 's16l02', 's16l03', 's16l04', 's16l05', 's16l06', 's16l07', 's16l08', 's16l09', 's16l10', 's16l11', 's16l12'] },
      { id:'verse1', label:'Verse 1', lines:['s16l13', 's16l14', 's16l15', 's16l16', 's16l17', 's16l18', 's16l19', 's16l20', 's16l21', 's16l22', 's16l23'] },
      { id:'verse2', label:'Verse 2', lines:['s16l24', 's16l25', 's16l26', 's16l27', 's16l28', 's16l29', 's16l30', 's16l31', 's16l32', 's16l33', 's16l34', 's16l35', 's16l36'] },
      { id:'bridge', label:'Bridge', lines:['s16l37', 's16l38', 's16l39', 's16l40', 's16l41', 's16l42', 's16l43', 's16l44'] },
      { id:'outro', label:'Outro', lines:['s16l45', 's16l46', 's16l47', 's16l48', 's16l49', 's16l50', 's16l51', 's16l52', 's16l53', 's16l54', 's16l55', 's16l56', 's16l57', 's16l58', 's16l59', 's16l60', 's16l61', 's16l62', 's16l63', 's16l64', 's16l65', 's16l66', 's16l67', 's16l68', 's16l69', 's16l70', 's16l71', 's16l72', 's16l73', 's16l74', 's16l75', 's16l76', 's16l78', 's16l79'] }
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'bridge', 'chorus', 'outro']
  },

  /* ------------------------------------------------------------------
     17. HOL DIR GUTE LAUNE

     Steven's own, all three languages.

     EVERY LINE IS ITS OWN ROW, INCLUDING THE REPEATS. The chorus closes
     with the same line four times and the bridge is four pairs said
     twice; both are written out rather than stored once and referenced.

     Steven, when I suggested collapsing them: "4 lines. This is a song.
     So the reader needs to be fixed if it is so broken it can't handle a
     song having repeated lines. The comma is in there for phrasing."

     He is right and I was wrong: nothing in the reader dedupes, and 96
     of the 98 sections in this file already work exactly this way. The
     comma placement differs between the English repeats and carries the
     phrasing, so collapsing them would have thrown away the one thing
     that distinguishes them.

     The CHORUS is still stored once as a section and named four times in
     `play` — that is a section repeat, which is how the format works,
     not a line-level trick.

     `Groove`, `Move` and `Floor` stay in English inside the German, as
     written.

     Audio: audio/hol-dir-gute-laune.ogg. */
  {
    n: 17,
    audio: 'hol-dir-gute-laune',
    title: {
      de: 'Hol dir gute Laune',
      ru: 'Подними себе настроение',
      en: 'Get Your Good Mood On'
    },
    lines: {
    s17l01: { de:'Ich hab Pech in meiner Tasche', ru:'У меня невезение в кармане', en:'I have bad luck in my pocket' },
    s17l02: { de:'Und ich lächle trotzdem weiter', ru:'Но я всё равно продолжаю улыбаться', en:'And I\'m still gonna keep my smile' },
    s17l03: { de:'Ich hab ein Problem zu viel', ru:'У меня на одну проблему слишком много', en:'I got one too many problems' },
    s17l04: { de:'Und ich halt den Kopf trotzdem hoch', ru:'Но я всё равно держу голову высоко', en:'And I\'m still gonna keep my head held high' },
    s17l05: { de:'Ich mach einen Schritt nach links', ru:'Я делаю шаг налево', en:'I\'m gonna take one step to the left' },
    s17l06: { de:'Und gleit dann wieder nach rechts', ru:'А потом скольжу обратно направо', en:'And then slide back to the right' },
    s17l07: { de:'Ich find meinen Groove und mach meinen Move', ru:'Я нахожу свой грув и делаю свой мув', en:'I\'m gonna find my groove and make a move' },
    s17l08: { de:'Und tanz durch die ganze Nacht', ru:'И танцую всю ночь напролёт', en:'Gonna dance right through the night' },
    s17l09: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'Gonna get my good mood on' },
    s17l10: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'Gonna get my good mood, on' },
    s17l11: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'Gonna get my good mood on' },
    s17l12: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'Gonna get my good mood, on' },
    s17l13: { de:'Mein Tag brachte mir Probleme', ru:'Мой день нашёл несколько проблем', en:'My day sure found me some problems' },
    s17l14: { de:'Die wollten einfach nicht weg', ru:'Они просто не хотели уходить', en:'They just won\'t go away' },
    s17l15: { de:'Überall, wo ich auch hinsah', ru:'Он находил их, куда бы я ни посмотрела', en:'It found them everywhere I looked' },
    s17l16: { de:'Und alle wollten bleiben', ru:'И все они хотели остаться', en:'They all wanted to stay' },
    s17l17: { de:'Ein paar fand ich in der Tasche', ru:'Несколько я нашла в кармане', en:'I found some in my pocket' },
    s17l18: { de:'Ein paar fand ich in meinem Schuh', ru:'Несколько я нашла в ботинке', en:'And found some in my shoe' },
    s17l19: { de:'Ein paar sogar in der Unterwäsche', ru:'Несколько — в моём нижнем белье', en:'Found some in my underwear' },
    s17l20: { de:'Die versteckten sich dort auch', ru:'Они прятались и там', en:'They were hiding in there too' },
    s17l21: { de:'Ich halt meinen Kopf schön hoch', ru:'Я держу голову высоко', en:'I keep my head held high' },
    s17l22: { de:'Und die Füße fest am Boden', ru:'А ноги — на земле', en:'And keep my feet on the ground' },
    s17l23: { de:'Doch wenn ich diese Musik hör', ru:'Но когда я слышу эту музыку', en:'But when I hear that music' },
    s17l24: { de:'Dann beweg ich mich zum Takt', ru:'Я начинаю двигаться под её звуки', en:'I start moving to the sound' },
    s17l25: { de:'Ich schüttel alle Sorgen ab', ru:'Я стряхиваю все свои заботы', en:'I shake off all my worries' },
    s17l26: { de:'Und geb mir selbst \'ne Chance', ru:'И даю себе шанс', en:'And give myself a chance' },
    s17l27: { de:'Wenn Ärger mir noch folgen will', ru:'Если неприятности хотят идти за мной', en:'If trouble wants to follow me' },
    s17l28: { de:'Dann sollte er tanzen lernen', ru:'Тогда им лучше научиться танцевать', en:'It better learn to dance' },
    s17l29: { de:'Pech, Pech, zieh weiter', ru:'Невезение, невезение, иди дальше', en:'Bad luck, bad luck, move along' },
    s17l30: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'I got my good mood on' },
    s17l31: { de:'Pech, Pech, zieh weiter', ru:'Невезение, невезение, иди дальше', en:'Bad luck, bad luck, move along' },
    s17l32: { de:'Ich hol mir gute Laune', ru:'Я достаю хорошее настроение', en:'I got my good mood on' },
    s17l33: { de:'Steh auf, steh auf, komm auf den Floor', ru:'Вставай, вставай, выходи на танцпол', en:'Get up, get up on the floor' },
    s17l34: { de:'Lass deine Füße den Song spür\'n', ru:'Пусть твои ноги почувствуют эту песню', en:'Let your feet feel this song' },
    s17l35: { de:'Steh auf, steh auf, komm auf den Floor', ru:'Вставай, вставай, выходи на танцпол', en:'Get up, get up on the floor' },
    s17l36: { de:'Lass deine Füße den Song spür\'n', ru:'Пусть твои ноги почувствуют эту песню', en:'Let your feet feel this song' },
    s17l37: { de:'Meine Probleme wissen, wo sie mich finden', ru:'Мои проблемы знают, где меня найти', en:'My troubles know where to find me' },
    s17l38: { de:'Doch ich bleib bei guter Laune', ru:'Но я сохраняю своё хорошее настроение', en:'But I\'m gonna keep my good mood on' },
    s17l39: { de:'Probleme, Probleme rings um mich', ru:'Проблемы, проблемы повсюду вокруг меня', en:'Troubles, troubles all around me' },
    s17l40: { de:'Doch ich bleib bei guter Laune', ru:'Но я сохраняю своё хорошее настроение', en:'But gonna keep my good mood, on' },
    s17l41: { de:'Steh auf, steh auf, folge mir', ru:'Вставай, вставай, следуй за мной', en:'Gotta get up, get up, follow me' },
    s17l42: { de:'Lass deine Sorgen hinter dir', ru:'Оставь свои заботы позади', en:'Leave your worries behind' },
    s17l43: { de:'Hol dir gute Laune', ru:'Достань хорошее настроение', en:'Get your good mood on' },
    s17l44: { de:'Hol dir gute Laune', ru:'Достань хорошее настроение', en:'Get your good mood, on' },
    s17l45: { de:'Steh auf, steh auf, folge mir', ru:'Вставай, вставай, следуй за мной', en:'Gotta get up, get up, follow me' },
    s17l46: { de:'Hol dir gute Laune!', ru:'Достань хорошее настроение!', en:'Get your good mood, on!' }
    },
    secs: [
      { id:'chorus', label:'Chorus', lines:['s17l01', 's17l02', 's17l03', 's17l04', 's17l05', 's17l06', 's17l07', 's17l08', 's17l09', 's17l10', 's17l11', 's17l12'] },
      { id:'verse1', label:'Verse 1', lines:['s17l13', 's17l14', 's17l15', 's17l16', 's17l17', 's17l18', 's17l19', 's17l20'] },
      { id:'verse2', label:'Verse 2', lines:['s17l21', 's17l22', 's17l23', 's17l24', 's17l25', 's17l26', 's17l27', 's17l28'] },
      { id:'bridge', label:'Bridge', lines:['s17l29', 's17l30', 's17l31', 's17l32', 's17l33', 's17l34', 's17l35', 's17l36'] },
      { id:'outro', label:'Outro', lines:['s17l37', 's17l38', 's17l39', 's17l40', 's17l41', 's17l42', 's17l43', 's17l44', 's17l45', 's17l46'] }
    ],
    play: ['chorus', 'verse1', 'chorus', 'verse2', 'chorus', 'bridge', 'chorus', 'outro']
  }

,

  /* ---------------- ENGLISH VERSIONS ----------------

     Six English recordings of songs already in this file. CLONED from
     their German entries by script, 09 Sep — not transcribed, so a
     lyric line cannot have drifted, been reordered, or lost a
     language on the way across.

     Only two fields differ from the German original:

       audio   the -eng stem. That suffix is what GH_SONG_LANG reads to
               decide the song is English, so the player treats the en
               line as the lyric and the others as glosses. Nothing else
               in the entry knows or needs to know the language.

       pair    suffixed -eng on the two that have one. songbook.js boxes
               two songs together when a pair id appears twice in the
               FILTERED list, so sharing `five-minutes` with the German
               pair would put four songs in one pair with both chips on
               and box the wrong two.

     title, lines, secs, play and voice are byte-identical to the German
     entries: the titles and every lyric line already carried de, ru and
     en, and the English recordings follow the same block structure.

     Written with quoted keys because they came out of JSON.stringify.
     Cosmetic only. */

  {
    "n": 16,
    "audio": "so-i-moved-into-a-dungeon-eng",
    "title": {
      "de": "Also zog ich in 'nen Kerker",
      "ru": "Вот я и въехала в подземелье",
      "en": "So I Moved Into a Dungeon"
    },
    "lines": {
      "s16l01": {
        "de": "Also zog ich in 'nen Kerker",
        "ru": "Вот я въехала в подземелье",
        "en": "So I moved into a dungeon"
      },
      "s16l02": {
        "de": "Und ließ zehn Kilo zurück",
        "ru": "И оставила десять кило позади",
        "en": "And I left ten kilos behind"
      },
      "s16l03": {
        "de": "Farbe klebte auf meinem T-Shirt",
        "ru": "Краска прилипла к моей футболке",
        "en": "Got paint all on my T-shirt"
      },
      "s16l04": {
        "de": "Und ein bisschen an der Wand",
        "ru": "И немножко попало на стену",
        "en": "And some got on the walls"
      },
      "s16l05": {
        "de": "Ich hielt meinen Kopf schön hoch",
        "ru": "Я держала голову высоко",
        "en": "I held my head up high"
      },
      "s16l06": {
        "de": "Dann ging ich runter auf den Boden",
        "ru": "А потом опустилась к полу",
        "en": "Then got down to the floor"
      },
      "s16l07": {
        "de": "Da musste erst ein Boden hin",
        "ru": "Потому что сначала надо было положить пол",
        "en": "I had to put one down there"
      },
      "s16l08": {
        "de": "Und noch so vieles mehr",
        "ru": "И сделать ещё столько всего",
        "en": "And had to do much more"
      },
      "s16l09": {
        "de": "Ein Fuß ging nach links",
        "ru": "Одна нога пошла налево",
        "en": "I put one foot to the left"
      },
      "s16l10": {
        "de": "Und der andere nach rechts",
        "ru": "А другая направо",
        "en": "And one foot to the right"
      },
      "s16l11": {
        "de": "Ich musste mich bewegen, meinen Groove finden",
        "ru": "Мне пришлось двигаться, искать свой грув",
        "en": "I had to move and get my groove"
      },
      "s16l12": {
        "de": "Und arbeiten Tag und Nacht",
        "ru": "И работать день и ночь",
        "en": "And work both day and night"
      },
      "s16l13": {
        "de": "Nein, es war wirklich kein Palast",
        "ru": "Нет, это точно был не дворец",
        "en": "No, it sure was no palace"
      },
      "s16l14": {
        "de": "Es war kein Taj Mahal",
        "ru": "Это был не Тадж-Махал",
        "en": "It was no Taj Mahal"
      },
      "s16l15": {
        "de": "Es waren nicht die Pyramiden von Gizeh",
        "ru": "Это были не пирамиды Гизы",
        "en": "It wasn't the pyramids of Giza"
      },
      "s16l16": {
        "de": "Es waren kaum vier Wände da",
        "ru": "Там едва было четыре стены",
        "en": "It was barely four walls"
      },
      "s16l17": {
        "de": "Es brauchte Farbe, es brauchte 'nen Boden",
        "ru": "Нужна была краска, нужен был пол",
        "en": "It needed paint, it needed a floor"
      },
      "s16l18": {
        "de": "Es brauchte eine Küche",
        "ru": "Нужна была кухня",
        "en": "It needed a kitchen"
      },
      "s16l19": {
        "de": "Fast hätte auch die Tür gefehlt",
        "ru": "И чуть было не оказалось даже двери",
        "en": "It nearly needed a door"
      },
      "s16l20": {
        "de": "Ich weiß nicht, wie ich das geschafft hab",
        "ru": "Я не знаю, как я это сделала",
        "en": "I don't know how I did it"
      },
      "s16l21": {
        "de": "Ich weiß nicht, ob ich's noch mal könnte",
        "ru": "Я не знаю, смогла бы я сделать это ещё раз",
        "en": "I don't know if I could do it again"
      },
      "s16l22": {
        "de": "Doch irgendwie hab ich's geschafft",
        "ru": "Но каким-то образом я справилась",
        "en": "But somehow I made it"
      },
      "s16l23": {
        "de": "Und jetzt bin ich wieder dünn",
        "ru": "И теперь я снова худая",
        "en": "And now I'm back to being thin"
      },
      "s16l24": {
        "de": "Ich musste Kisten schleppen",
        "ru": "Мне пришлось таскать коробки",
        "en": "I had to move some boxes"
      },
      "s16l25": {
        "de": "Und noch viel mehr Zeug",
        "ru": "И ещё кучу вещей",
        "en": "And had to move more stuff"
      },
      "s16l26": {
        "de": "Ich schleppte und schleppte und schleppte",
        "ru": "Я таскала, таскала и таскала",
        "en": "I kept on moving, and moving and moving"
      },
      "s16l27": {
        "de": "Und es schien einfach nie genug",
        "ru": "И казалось, что этого никогда не кончится",
        "en": "There never seemed to be enough"
      },
      "s16l28": {
        "de": "Ich schuftete wie ein Hund",
        "ru": "Я пахала как пёс",
        "en": "I worked like a dog"
      },
      "s16l29": {
        "de": "Und schuftete wie sein Knochen",
        "ru": "И пахала как его кость",
        "en": "And worked like his bone"
      },
      "s16l30": {
        "de": "Und schuftete und schuftete und schuftete, bis es fertig war",
        "ru": "И пахала, пахала и пахала, пока всё не было закончено",
        "en": "And worked and worked and worked and did it"
      },
      "s16l31": {
        "de": "Und ich tat es ganz allein",
        "ru": "И я сделала всё совсем одна",
        "en": "And I did it all alone"
      },
      "s16l32": {
        "de": "Du denkst, Umziehen ist das Schlimmste?",
        "ru": "Думаешь, переезд — это самое худшее?",
        "en": "You think moving is the worst?"
      },
      "s16l33": {
        "de": "Zieh mal eines Tages in 'nen Kerker",
        "ru": "Попробуй однажды въехать в подземелье",
        "en": "Try moving into a dungeon someday"
      },
      "s16l34": {
        "de": "Und dreh dann den ganzen verdammten Ort um",
        "ru": "А потом перевернуть всё это чёртово место",
        "en": "Then turning the whole damn place around"
      },
      "s16l35": {
        "de": "Bis man irgendwie drin wohnen kann",
        "ru": "Чтобы там хоть как-то можно было жить",
        "en": "Into somewhere you can stay"
      },
      "s16l36": {
        "de": "Ich hab's gemacht, und ich kann nur sagen...",
        "ru": "Я это сделала, и могу сказать только одно...",
        "en": "I did it, and all I have to say is..."
      },
      "s16l37": {
        "de": "Ich war oben, ich war unten",
        "ru": "Я была наверху, я была внизу",
        "en": "I moved up, I moved down"
      },
      "s16l38": {
        "de": "Ich war überall",
        "ru": "Я была повсюду",
        "en": "I moved all around"
      },
      "s16l39": {
        "de": "Kein einziger Fleck blieb unberührt",
        "ru": "Не осталось ни одного нетронутого места",
        "en": "There's not one spot that went untouched"
      },
      "s16l40": {
        "de": "Nicht die Wände, nicht der Boden",
        "ru": "Ни стены, ни пола",
        "en": "Not the walls, not the ground"
      },
      "s16l41": {
        "de": "Ich strich und schleppte, ich weiß nicht mal was",
        "ru": "Я красила и таскала, сама не знаю что",
        "en": "I painted and lifted, I don't even know what"
      },
      "s16l42": {
        "de": "Ich kam richtig in den Grind",
        "ru": "Я реально втянулась в эту пахоту",
        "en": "I got myself into the grind"
      },
      "s16l43": {
        "de": "Ich schleppte Kisten und Kisten und bewegte meinen Hintern",
        "ru": "Я таскала коробки и коробки и двигала попой",
        "en": "I moved boxes and boxes and moved my butt"
      },
      "s16l44": {
        "de": "Und ließ diese zehn Kilo zurück",
        "ru": "И оставила эти десять кило позади",
        "en": "And left those ten kilos behind"
      },
      "s16l45": {
        "de": "Wenn du mal Sorgen hast",
        "ru": "Если у тебя когда-нибудь будут проблемы",
        "en": "So if you ever have some worries"
      },
      "s16l46": {
        "de": "Und irgendwann mal Zweifel",
        "ru": "И когда-нибудь появятся сомнения",
        "en": "And ever have some doubts"
      },
      "s16l47": {
        "de": "Zieh einfach in einen Kerker",
        "ru": "Просто въедь в подземелье",
        "en": "Just try moving into a dungeon"
      },
      "s16l48": {
        "de": "Und arbeite die Probleme raus",
        "ru": "И выработай все эти проблемы",
        "en": "And work those problems out"
      },
      "s16l49": {
        "de": "Beweg dich hoch, beweg dich runter",
        "ru": "Двигайся вверх, двигайся вниз",
        "en": "Just move up, just move down"
      },
      "s16l50": {
        "de": "Beweg dich überall herum",
        "ru": "Двигайся повсюду",
        "en": "Just move all around"
      },
      "s16l51": {
        "de": "Streich einfach die Wände",
        "ru": "Просто покрась стены",
        "en": "Just paint the walls"
      },
      "s16l52": {
        "de": "Und leg den Boden rein",
        "ru": "И положи пол",
        "en": "And lay the ground"
      },
      "s16l53": {
        "de": "Setz einen Fuß hin, dann den anderen",
        "ru": "Поставь одну ногу, потом другую",
        "en": "Put one foot down, then put down another"
      },
      "s16l54": {
        "de": "Und schuft wie ein Hund",
        "ru": "И паши как пёс",
        "en": "And work like a dog"
      },
      "s16l55": {
        "de": "Dann schuft wie sein Bruder",
        "ru": "Потом паши как его брат",
        "en": "Then work like his brother"
      },
      "s16l56": {
        "de": "Dann schuft wie der Knochen",
        "ru": "Потом паши как кость",
        "en": "Then work like the bone"
      },
      "s16l57": {
        "de": "An dem die beiden zusammen kauen",
        "ru": "Которую они оба вместе грызут",
        "en": "That they both chew"
      },
      "s16l58": {
        "de": "Und schuft und schuft immer weiter",
        "ru": "И паши, и паши дальше",
        "en": "And keep working and working"
      },
      "s16l59": {
        "de": "Es gibt viel zu viel zu tun",
        "ru": "Дел ещё слишком много",
        "en": "There's way too much to do"
      },
      "s16l60": {
        "de": "Beweg deine Hüften",
        "ru": "Двигай бёдрами",
        "en": "Move your hips"
      },
      "s16l61": {
        "de": "Und beweg deinen Hintern herum",
        "ru": "И двигай попой",
        "en": "And move your butt around"
      },
      "s16l62": {
        "de": "Und schlepp noch eine Kiste",
        "ru": "И тащи ещё одну коробку",
        "en": "And move another box"
      },
      "s16l63": {
        "de": "Und die halbe Stadt",
        "ru": "И половину города",
        "en": "And half the town"
      },
      "s16l64": {
        "de": "Dann ist ein Kilo weg",
        "ru": "Вот один килограмм исчез",
        "en": "You'll find a kilo gone and"
      },
      "s16l65": {
        "de": "Und gleich noch eins hinterher",
        "ru": "А за ним сразу ещё один",
        "en": "Then another kilo down"
      },
      "s16l66": {
        "de": "Das ist der Diätplan",
        "ru": "Это тот самый план диеты",
        "en": "It's the diet plan"
      },
      "s16l67": {
        "de": "Von dem jetzt alle reden",
        "ru": "О котором теперь говорят все",
        "en": "They are talking about all around"
      },
      "s16l68": {
        "de": "Und schlepp eine Kiste",
        "ru": "И тащи коробку",
        "en": "And move a box"
      },
      "s16l69": {
        "de": "Und schlepp noch eine Kiste",
        "ru": "И тащи ещё одну коробку",
        "en": "And move another box"
      },
      "s16l70": {
        "de": "Dann schlepp eine Kiste",
        "ru": "Потом тащи коробку",
        "en": "Then move a box"
      },
      "s16l71": {
        "de": "Und schlepp eine Kiste!",
        "ru": "И тащи коробку!",
        "en": "And move a box!"
      },
      "s16l72": {
        "de": "Oder zwei, oder drei",
        "ru": "Или две, или три",
        "en": "Or two, or three"
      },
      "s16l73": {
        "de": "Oder vier, oder fünf",
        "ru": "Или четыре, или пять",
        "en": "Or four, or five"
      },
      "s16l74": {
        "de": "Oder sechs, oder sieben",
        "ru": "Или шесть, или семь",
        "en": "Or six, or seven"
      },
      "s16l75": {
        "de": "Oder acht, oder neun...",
        "ru": "Или восемь, или девять...",
        "en": "Or eight, or nine..."
      },
      "s16l76": {
        "de": "Oder zehn!",
        "ru": "Или десять!",
        "en": "Or ten!"
      },
      "s16l78": {
        "de": "oder elf, oder zwölf...",
        "ru": "или одиннадцать, или двенадцать...",
        "en": "or eleven, or twelve..."
      },
      "s16l79": {
        "de": "oder dreizehn, oder vierzehn...",
        "ru": "или тринадцать, или четырнадцать...",
        "en": "or thirteen, or fourteen..."
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s16l01",
          "s16l02",
          "s16l03",
          "s16l04",
          "s16l05",
          "s16l06",
          "s16l07",
          "s16l08",
          "s16l09",
          "s16l10",
          "s16l11",
          "s16l12"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s16l13",
          "s16l14",
          "s16l15",
          "s16l16",
          "s16l17",
          "s16l18",
          "s16l19",
          "s16l20",
          "s16l21",
          "s16l22",
          "s16l23"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s16l24",
          "s16l25",
          "s16l26",
          "s16l27",
          "s16l28",
          "s16l29",
          "s16l30",
          "s16l31",
          "s16l32",
          "s16l33",
          "s16l34",
          "s16l35",
          "s16l36"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s16l37",
          "s16l38",
          "s16l39",
          "s16l40",
          "s16l41",
          "s16l42",
          "s16l43",
          "s16l44"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s16l45",
          "s16l46",
          "s16l47",
          "s16l48",
          "s16l49",
          "s16l50",
          "s16l51",
          "s16l52",
          "s16l53",
          "s16l54",
          "s16l55",
          "s16l56",
          "s16l57",
          "s16l58",
          "s16l59",
          "s16l60",
          "s16l61",
          "s16l62",
          "s16l63",
          "s16l64",
          "s16l65",
          "s16l66",
          "s16l67",
          "s16l68",
          "s16l69",
          "s16l70",
          "s16l71",
          "s16l72",
          "s16l73",
          "s16l74",
          "s16l75",
          "s16l76",
          "s16l78",
          "s16l79"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "chorus",
      "bridge",
      "chorus",
      "outro"
    ]
  },
  {
    "audio": "wheres-my-damn-phone-eng",
    "title": {
      "de": "Wo ist mein verdammtes Handy?",
      "ru": "Где мой чёртов телефон?",
      "en": "Where's My Damn Phone?"
    },
    "lines": {
      "s12l01": {
        "de": "Startklar, ich will raus durch die Tür",
        "ru": "Готова, я хочу выйти наружу через дверь",
        "en": "Ready to head on out that door"
      },
      "s12l02": {
        "de": "Doch mein verdammtes Handy ist weg",
        "ru": "Но мой чёртов телефон пропал",
        "en": "But I can't find where I put my damn phone"
      },
      "s12l03": {
        "de": "Ich sollte schon vor fünf Minuten los",
        "ru": "Мне следовало уйти уже пять минут назад",
        "en": "I needed to leave five minutes ago"
      },
      "s12l04": {
        "de": "Wo zur Hölle ist mein verdammtes Handy?",
        "ru": "Где, к чёрту, мой чёртов телефон?",
        "en": "But where the hell is my damn phone?"
      },
      "s12l05": {
        "de": "Wo ist es, wo ist es?",
        "ru": "Где он, где он?",
        "en": "Where is it, where is it?"
      },
      "s12l06": {
        "de": "Wo ist mein Handy?",
        "ru": "Где мой телефон?",
        "en": "Where's my phone?"
      },
      "s12l07": {
        "de": "Startklar, ich will raus durch die Tür",
        "ru": "Готова, я хочу выйти наружу через дверь",
        "en": "I am all ready to head out that door"
      },
      "s12l08": {
        "de": "Warum passiert das immer, wenn ich spät dran bin?",
        "ru": "Почему это всегда происходит, когда я опаздываю?",
        "en": "But why does this always happen when I'm running late?"
      },
      "s12l09": {
        "de": "Ich fass es nicht, lauf hin und her",
        "ru": "Не могу поверить, хожу туда-сюда",
        "en": "I can't believe it, I'm pacing the floor"
      },
      "s12l10": {
        "de": "Als ob bei einem Date Pünktlichkeit zählt",
        "ru": "Как будто на свидании пунктуальность имеет значение",
        "en": "Not like being on time matters when you're meeting a date"
      },
      "s12l11": {
        "de": "Ich such oben, ich such unten, schau unters Bett",
        "ru": "Я ищу наверху, я ищу внизу, смотрю под кровать",
        "en": "I look high, I look low, I look under the bed"
      },
      "s12l12": {
        "de": "Mal schnell, mal langsam, geh ich Schritt für Schritt zurück",
        "ru": "То быстро, то медленно, я иду шаг за шагом назад",
        "en": "I move fast, then slow, retracing my steps"
      },
      "s12l13": {
        "de": "Ich fass es nicht, ich find es einfach nicht",
        "ru": "Не могу поверить, я просто не могу его найти",
        "en": "I can't believe I cannot find it"
      },
      "s12l14": {
        "de": "Wo hab ich's hingelegt?",
        "ru": "Куда я его положила?",
        "en": "Where did I put it down?"
      },
      "s12l15": {
        "de": "Ich muss, muss es finden",
        "ru": "Я должна, должна его найти",
        "en": "I gotta, gotta find it"
      },
      "s12l16": {
        "de": "Ich renn im Kreis herum",
        "ru": "Я бегаю по кругу",
        "en": "I'm running around"
      },
      "s12l17": {
        "de": "Wie ein kopfloses Huhn",
        "ru": "Как безголовая курица",
        "en": "Like a chicken with no head"
      },
      "s12l18": {
        "de": "Die Uhr zählt weiter runter",
        "ru": "Часы продолжают отсчитывать вниз",
        "en": "While the clock keeps counting down"
      },
      "s12l19": {
        "de": "Ich brauch den Segen von da oben",
        "ru": "Мне нужно благословение оттуда сверху",
        "en": "I need some blessings from heaven above"
      },
      "s12l20": {
        "de": "Oder Glück, das mir zufliegt",
        "ru": "Или удача, которая прилетает ко мне",
        "en": "Or a little luck thrown at me"
      },
      "s12l21": {
        "de": "Mein Handy und ich – wie Hand im Handschuh",
        "ru": "Мой телефон и я — как рука в перчатке",
        "en": "Me and my phone are like a hand and a glove"
      },
      "s12l22": {
        "de": "Doch wo es ist, bleibt ein Rätsel",
        "ru": "Но где он — остаётся загадкой",
        "en": "But where I left it is a mystery"
      },
      "s12l23": {
        "de": "Endlich, endlich, längst viel zu spät",
        "ru": "Наконец, наконец, уже давно слишком поздно",
        "en": "At last, at last, and I'm already so late"
      },
      "s12l24": {
        "de": "Mein Handy klemmte tief im Sofa",
        "ru": "Мой телефон застрял глубоко в диване",
        "en": "I found my phone stuck inside the couch"
      },
      "s12l25": {
        "de": "Jemand spielt hier mit meinem Schicksal",
        "ru": "Кто-то здесь играет с моей судьбой",
        "en": "But someone's having fun with my fate"
      },
      "s12l26": {
        "de": "Der Akku: nur noch dreizehn Prozent",
        "ru": "Аккумулятор: осталось только тринадцать процентов",
        "en": "Just thirteen percent left on the battery"
      },
      "s12l27": {
        "de": "Dreizehn Prozent?!",
        "ru": "Тринадцать процентов?!",
        "en": "Thirteen percent?!"
      },
      "s12l28": {
        "de": "Das darf doch nicht wahr sein …",
        "ru": "Это же не может быть правдой…",
        "en": "Oh, you've gotta be kidding me…"
      },
      "s12l29": {
        "de": "Wo ist es, wo ist es?",
        "ru": "Где оно, где оно?",
        "en": "Where is it, where is it?"
      },
      "s12l30": {
        "de": "Wo ist mein Ladegerät?",
        "ru": "Где моё зарядное устройство?",
        "en": "Where's my charger?"
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s12l01",
          "s12l02",
          "s12l03",
          "s12l04",
          "s12l05",
          "s12l06",
          "s12l05",
          "s12l06"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s12l07",
          "s12l08",
          "s12l09",
          "s12l10"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s12l11",
          "s12l12",
          "s12l13",
          "s12l14",
          "s12l15",
          "s12l16",
          "s12l17",
          "s12l18"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s12l19",
          "s12l20",
          "s12l21",
          "s12l22"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s12l23",
          "s12l24",
          "s12l25",
          "s12l26",
          "s12l27",
          "s12l28",
          "s12l29",
          "s12l30",
          "s12l29",
          "s12l30"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "bridge",
      "chorus",
      "outro"
    ]
  },
  {
    "audio": "five-more-minutes-eng",
    "pair": "five-minutes-eng",
    "voice": "m",
    "title": {
      "de": "Noch fünf Minuten",
      "ru": "Ещё пять минут",
      "en": "Five More Minutes"
    },
    "lines": {
      "s10l01": {
        "de": "Zeit, hinaus in die Nacht zu gehen",
        "ru": "Пора выходить в ночь",
        "en": "Time to go out into the night"
      },
      "s10l02": {
        "de": "Schick gemacht, bereit für den Spaß",
        "ru": "Мы нарядились, готовы веселиться",
        "en": "Dressed up, ready to have some fun"
      },
      "s10l03": {
        "de": "Ich nehm die Schlüssel, geh zur Tür",
        "ru": "Я хватаю ключи и иду к двери",
        "en": "Grab my keys and head for the door"
      },
      "s10l04": {
        "de": "„Noch fünf Minuten“, höre ich sie sagen",
        "ru": "«Ещё пять минут», — слышу я от неё",
        "en": "Five more minutes, I hear her say"
      },
      "s10l05": {
        "de": "Noch fünf Minuten warten",
        "ru": "Ещё пять минут ждать",
        "en": "Five more minutes of waiting"
      },
      "s10l06": {
        "de": "Und warten und warten",
        "ru": "И ждать, и ждать",
        "en": "And waiting and waiting"
      },
      "s10l07": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s10l08": {
        "de": "Und warten und warten",
        "ru": "И ждать, и ждать",
        "en": "And waiting and waiting"
      },
      "s10l09": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s10l10": {
        "de": "Die Sonne brennt ihr letztes Licht in den Himmel",
        "ru": "Солнце сжигает свой последний свет в небе",
        "en": "The sun burns its last light in the sky"
      },
      "s10l11": {
        "de": "Bald wird es Zeit für uns zu gehen",
        "ru": "Скоро нам пора будет уходить",
        "en": "Soon it will be time for us to leave"
      },
      "s10l12": {
        "de": "Der Mond scheint aus der Dämmerung herab",
        "ru": "Луна в сумерках сияет с высоты",
        "en": "The twilight moon is shining down"
      },
      "s10l13": {
        "de": "Die Nacht ruft nach mir",
        "ru": "Ночь зовёт меня",
        "en": "The night is calling out to me"
      },
      "s10l14": {
        "de": "Jacke an, Schuhe zu",
        "ru": "Куртка надета, шнурки завязаны",
        "en": "My jacket's on, shoes are tied"
      },
      "s10l15": {
        "de": "Schlüssel in der Hand",
        "ru": "Ключи в руке",
        "en": "Keys in my hand"
      },
      "s10l16": {
        "de": "Doch sie steht vorm Spiegel, richtet ihr Haar",
        "ru": "Но она у зеркала поправляет волосы",
        "en": "But she's at the mirror fixing her hair"
      },
      "s10l17": {
        "de": "Und ich steh hier rum wie ein Depp",
        "ru": "А я торчу здесь как дурак",
        "en": "And I'm just standing here like a chump"
      },
      "s10l18": {
        "de": "Die Nacht ist wie ein langsam brennendes Fieber",
        "ru": "Ночь — как медленно разгорающаяся лихорадка",
        "en": "The night is like a slow-burning fever"
      },
      "s10l19": {
        "de": "Sie wird verdammt heiß aussehn, wenn ich sie seh",
        "ru": "Я знаю: увижу её — она будет просто огонь",
        "en": "I know she'll look so hot when I see her"
      },
      "s10l20": {
        "de": "Ihr Make-up wird bestimmt makellos sein",
        "ru": "Её макияж точно будет безупречен",
        "en": "No doubt her makeup will be flawless"
      },
      "s10l21": {
        "de": "Sie wird so manchen Kopf verdrehen",
        "ru": "Она вскружит не одну голову",
        "en": "She's gonna turn some heads"
      },
      "s10l22": {
        "de": "Wir müssen doch nur endlich los",
        "ru": "Нам всего-то нужно выйти за дверь",
        "en": "All we have to do is head on out"
      },
      "s10l23": {
        "de": "Doch die Minuten kriechen vorbei",
        "ru": "Но минуты ползут мимо нас",
        "en": "But as the minutes crawl past us"
      },
      "s10l24": {
        "de": "Langsam fühlt es sich an wie ein Fiebertraum",
        "ru": "Всё становится похоже на горячечный сон",
        "en": "That starts to feel like a fever dream"
      },
      "s10l25": {
        "de": "„Noch fünf Minuten“ läuft in Schleife",
        "ru": "«Ещё пять минут» крутится по кругу",
        "en": "Five more minutes keeps looping"
      },
      "s10l26": {
        "de": "Und dreht sich weiter",
        "ru": "И крутится дальше",
        "en": "And looping"
      },
      "s10l27": {
        "de": "Ich weiß, sie ist das Warten wert",
        "ru": "Я знаю, её стоит ждать",
        "en": "I know that she is worth the wait"
      },
      "s10l28": {
        "de": "Ich sollte mich nicht beschweren",
        "ru": "Мне правда не стоит жаловаться",
        "en": "I really shouldn't complain"
      },
      "s10l29": {
        "de": "Bald seh ich sie in ihrer ganzen Schönheit",
        "ru": "Скоро я увижу её во всей красе",
        "en": "Soon I'll get to see her beauty"
      },
      "s10l30": {
        "de": "Und bin froh, dass ich gewartet hab",
        "ru": "И буду рад, что дождался",
        "en": "And be grateful that I waited"
      },
      "s10l31": {
        "de": "Und ich weiß, ich würd es wieder tun",
        "ru": "И я знаю — я повторил бы всё сначала",
        "en": "And I know I'd do it all over again"
      },
      "s10l32": {
        "de": "Wieder und wieder …",
        "ru": "Снова и снова…",
        "en": "Again and again…"
      },
      "s10l33": {
        "de": "Warten und warten",
        "ru": "Ждать и ждать",
        "en": "Waiting and waiting"
      },
      "s10l34": {
        "de": "Und warten und warten",
        "ru": "И ждать, и ждать",
        "en": "And waiting and waiting"
      },
      "s10l35": {
        "de": "Was sind schon fünf Minuten mehr",
        "ru": "Что значат ещё пять минут",
        "en": "What's five more minutes"
      },
      "s10l36": {
        "de": "Nach noch fünf Minuten, nach—",
        "ru": "После ещё пяти минут, после—",
        "en": "After five more minutes after—"
      },
      "s10l37": {
        "de": "(Und warten und warten)",
        "ru": "(И ждать, и ждать)",
        "en": "(And waiting and waiting)"
      },
      "s10l38": {
        "de": "Noch fünf Minuten danach—",
        "ru": "Ещё пять минут после—",
        "en": "Five more minutes after—"
      },
      "s10l39": {
        "de": "(Und warten und warten)",
        "ru": "(И ждать, и ждать)",
        "en": "(And waiting and waiting)"
      },
      "s10l40": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s10l41": {
        "de": "(Und warten und warten)",
        "ru": "(И ждать, и ждать)",
        "en": "(And waiting and waiting)"
      },
      "s10l42": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s10l43": {
        "de": "(Und warten und warten)",
        "ru": "(И ждать, и ждать)",
        "en": "(And waiting and waiting)"
      },
      "s10l44": {
        "de": "Noch fünf Minuten …",
        "ru": "Ещё пять минут…",
        "en": "Five more minutes…"
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s10l01",
          "s10l02",
          "s10l03",
          "s10l04",
          "s10l05",
          "s10l06",
          "s10l07",
          "s10l08",
          "s10l09"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s10l10",
          "s10l11",
          "s10l12",
          "s10l13",
          "s10l14",
          "s10l15",
          "s10l16",
          "s10l17"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s10l18",
          "s10l19",
          "s10l20",
          "s10l21",
          "s10l22",
          "s10l23",
          "s10l24",
          "s10l25",
          "s10l26"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s10l27",
          "s10l28",
          "s10l29",
          "s10l30",
          "s10l31",
          "s10l32"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s10l33",
          "s10l34",
          "s10l35",
          "s10l36",
          "s10l37",
          "s10l38",
          "s10l39",
          "s10l40",
          "s10l41",
          "s10l42",
          "s10l43",
          "s10l44"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "bridge",
      "chorus",
      "outro"
    ]
  },
  {
    "audio": "her-five-more-minutes-eng",
    "pair": "five-minutes-eng",
    "voice": "f",
    "title": {
      "de": "Ihre fünf Minuten",
      "ru": "Её пять минут",
      "en": "Her Five More Minutes"
    },
    "lines": {
      "s11l01": {
        "de": "Bald ziehen wir hinaus in die Nacht",
        "ru": "Скоро мы выйдем навстречу ночи",
        "en": "Soon we'll be going out into the night"
      },
      "s11l02": {
        "de": "Schick gemacht, fast bereit für den Spaß",
        "ru": "Я нарядилась, почти готова веселиться",
        "en": "Dressed up, almost ready for fun"
      },
      "s11l03": {
        "de": "Doch zuerst muss mir dieser Look gelingen",
        "ru": "Но сначала я должна довести свой образ до совершенства",
        "en": "But first I have to nail this look"
      },
      "s11l04": {
        "de": "Mühelos schön und vollkommen makellos",
        "ru": "Красота без усилий, без единого изъяна",
        "en": "Of effortlessly flawless beauty"
      },
      "s11l05": {
        "de": "Ich brauch noch fünf Minuten",
        "ru": "Мне нужно ещё пять минут",
        "en": "I need five more minutes"
      },
      "s11l06": {
        "de": "Dann bin ich bereit",
        "ru": "И я буду готова",
        "en": "And I'll be ready"
      },
      "s11l07": {
        "de": "Brauch noch fünf Minuten",
        "ru": "Нужно ещё пять минут",
        "en": "Need five more minutes"
      },
      "s11l08": {
        "de": "Dann bin ich bereit",
        "ru": "И я буду готова",
        "en": "And I'll be ready"
      },
      "s11l09": {
        "de": "Die Sonne ging unter, jetzt ist unsre Zeit",
        "ru": "Солнце село, теперь наше время",
        "en": "The sun went down and this is our time"
      },
      "s11l10": {
        "de": "Wir setzen die Welt in Brand",
        "ru": "Мы подожжём этот мир",
        "en": "To make the world burn"
      },
      "s11l11": {
        "de": "Und bringen die Sterne zum Leuchten",
        "ru": "И заставим звёзды сиять",
        "en": "And make the stars shine"
      },
      "s11l12": {
        "de": "Die Nacht, sie ruft nach mir",
        "ru": "Ночь зовёт меня",
        "en": "The night is calling out to me"
      },
      "s11l13": {
        "de": "Mein Kleid ist an, die Schuhe passen dazu",
        "ru": "Платье надето, туфли подходят к нему",
        "en": "My dress is on, matching shoes"
      },
      "s11l14": {
        "de": "Die Handtasche in der Hand",
        "ru": "Сумочка в руке",
        "en": "Purse in my hand"
      },
      "s11l15": {
        "de": "Vor dem Spiegel versuch ich, meine Haare hinzukriegen",
        "ru": "Перед зеркалом пытаюсь привести волосы в порядок",
        "en": "I'm at the mirror trying to fix my hair"
      },
      "s11l16": {
        "de": "Ich muss aussehen wie ein Diamantring",
        "ru": "Я должна выглядеть как кольцо с бриллиантом",
        "en": "I gotta look a diamond ring"
      },
      "s11l17": {
        "de": "Heute Nacht werden wir richtig Spaß haben",
        "ru": "Сегодня ночью мы как следует повеселимся",
        "en": "We are going to have some fun"
      },
      "s11l18": {
        "de": "Wenn ich fertig bin, werd ich verdammt heiß aussehen",
        "ru": "Когда закончу, буду выглядеть чертовски сексуально",
        "en": "Going to look so hot when I am done"
      },
      "s11l19": {
        "de": "Ich muss makellos sein",
        "ru": "Я должна быть безупречной",
        "en": "I gotta be flawless"
      },
      "s11l20": {
        "de": "(muss makellos sein)",
        "ru": "(должна быть безупречной)",
        "en": "(gotta be flawless)"
      },
      "s11l21": {
        "de": "Ich muss alle Hälse nach mir drehen sehen",
        "ru": "Я должна увидеть, как все шеи повернутся мне вслед",
        "en": "I've gotta turn those necks"
      },
      "s11l22": {
        "de": "Nur ein kleines bisschen Make-up und",
        "ru": "Ещё совсем немного макияжа и",
        "en": "Just a little more make-up and"
      },
      "s11l23": {
        "de": "Nur ein kleines bisschen Make-up",
        "ru": "Ещё совсем немного макияжа",
        "en": "Just a little more make up"
      },
      "s11l24": {
        "de": "Ich bin fast so weit, fast so weit",
        "ru": "Я почти готова, почти готова",
        "en": "I'm almost there, almost there"
      },
      "s11l25": {
        "de": "Ich muss nur noch irgendwas mit diesen Haaren machen",
        "ru": "Мне нужно только что-то сделать с этими волосами",
        "en": "I just gotta do something about this hair"
      },
      "s11l26": {
        "de": "Und ich muss ihn warten lassen",
        "ru": "И я должна заставить его ждать",
        "en": "And I gotta keep him waiting"
      },
      "s11l27": {
        "de": "Muss ihn warten lassen",
        "ru": "Должна заставить его ждать",
        "en": "gotta keep him waiting"
      },
      "s11l28": {
        "de": "Tief im Innern weiß er: Auf mich zu warten lohnt sich",
        "ru": "В глубине души он знает: меня стоит ждать",
        "en": "He knows deep down I'm worth the wait"
      },
      "s11l29": {
        "de": "Er kann sich wirklich nicht beschweren",
        "ru": "Он правда не может жаловаться",
        "en": "He really can't complain"
      },
      "s11l30": {
        "de": "Wenn er meine makellose Schönheit sieht",
        "ru": "Когда увидит мою безупречную красоту",
        "en": "When he sees my flawless beauty"
      },
      "s11l31": {
        "de": "Hab ich ihn fest in meiner Hand",
        "ru": "Он будет крепко у меня в руках",
        "en": "I'll have him right in the palm of my hand"
      },
      "s11l32": {
        "de": "Und ich weiß, er wird wieder auf mich warten",
        "ru": "И я знаю, он снова будет ждать меня",
        "en": "And I know he'll do it all over again"
      },
      "s11l33": {
        "de": "Wieder und wieder",
        "ru": "Снова и снова",
        "en": "Again and again"
      },
      "s11l34": {
        "de": "Was sind schon weitere fünf Minuten?",
        "ru": "Что значат ещё пять минут?",
        "en": "What's five more minutes?"
      },
      "s11l35": {
        "de": "Dann bin ich bereit",
        "ru": "И я буду готова",
        "en": "I'll be ready"
      },
      "s11l36": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes after"
      },
      "s11l37": {
        "de": "Und danach noch fünf Minuten",
        "ru": "А потом ещё пять минут",
        "en": "five more minutes after"
      },
      "s11l38": {
        "de": "(und dann bin ich bereit)",
        "ru": "(и тогда я буду готова)",
        "en": "(and I'll be ready)"
      },
      "s11l39": {
        "de": "(er wartet und wartet)",
        "ru": "(он ждёт и ждёт)",
        "en": "(he's waiting and waiting)"
      },
      "s11l40": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "five more minutes"
      },
      "s11l41": {
        "de": "(und dann bin ich bereit)",
        "ru": "(и тогда я буду готова)",
        "en": "(and I'll be ready)"
      },
      "s11l42": {
        "de": "Immer wieder",
        "ru": "Снова и снова",
        "en": "over and over"
      },
      "s11l43": {
        "de": "Wieder und wieder",
        "ru": "Опять и опять",
        "en": "Again and again"
      },
      "s11l44": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s11l45": {
        "de": "Und danach noch fünf Minuten",
        "ru": "А потом ещё пять минут",
        "en": "after five more minutes"
      },
      "s11l46": {
        "de": "(er wartet und wartet)",
        "ru": "(он ждёт и ждёт)",
        "en": "(he's waiting and waiting)"
      },
      "s11l47": {
        "de": "Noch fünf Minuten",
        "ru": "Ещё пять минут",
        "en": "Five more minutes"
      },
      "s11l48": {
        "de": "(und dann bin ich bereit)",
        "ru": "(и тогда я буду готова)",
        "en": "(and I'll be ready)"
      },
      "s11l49": {
        "de": "Noch fünf Minuten …",
        "ru": "Ещё пять минут …",
        "en": "Five more minutes…"
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s11l01",
          "s11l02",
          "s11l03",
          "s11l04",
          "s11l05",
          "s11l06",
          "s11l07",
          "s11l08"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s11l09",
          "s11l10",
          "s11l11",
          "s11l12",
          "s11l13",
          "s11l14",
          "s11l15",
          "s11l16"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s11l17",
          "s11l18",
          "s11l19",
          "s11l20",
          "s11l21",
          "s11l22",
          "s11l23",
          "s11l24",
          "s11l25",
          "s11l26",
          "s11l27"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s11l28",
          "s11l29",
          "s11l30",
          "s11l31",
          "s11l32",
          "s11l33"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s11l34",
          "s11l35",
          "s11l36",
          "s11l37",
          "s11l38",
          "s11l39",
          "s11l40",
          "s11l41",
          "s11l42",
          "s11l43",
          "s11l44",
          "s11l45",
          "s11l46",
          "s11l47",
          "s11l48",
          "s11l49"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "bridge",
      "chorus",
      "outro"
    ]
  },
  {
    "audio": "who-needs-the-sun-eng",
    "title": {
      "de": "Wer braucht schon die Sonne?",
      "ru": "Кому вообще нужно солнце?",
      "en": "Who needs the sun?"
    },
    "lines": {
      "s14l01": {
        "de": "Wer braucht schon die Sonne? Ich liebe Regen, Regen, Regen",
        "ru": "Кому вообще нужно солнце? Я люблю дождь, дождь, дождь",
        "en": "Who needs the sun? I love the rain, rain, rain"
      },
      "s14l02": {
        "de": "Wer braucht warmen Sonnenschein, warmen, warmen Sonnenschein?",
        "ru": "Кому нужен тёплый солнечный свет, тёплый, тёплый солнечный свет?",
        "en": "Who needs warm sunshine, warm, warm sunshine?"
      },
      "s14l03": {
        "de": "Sonne, geh weg",
        "ru": "Солнце, уходи",
        "en": "Sunshine, go away"
      },
      "s14l04": {
        "de": "Sonne, geh weg",
        "ru": "Солнце, уходи",
        "en": "Sunshine, go away"
      },
      "s14l05": {
        "de": "Ich will den ganzen Tag nass sein",
        "ru": "Я хочу весь день быть мокрым",
        "en": "I want to be wet all day"
      },
      "s14l06": {
        "de": "Ich will den ganzen Tag nass sein",
        "ru": "Я хочу весь день быть мокрым",
        "en": "I want to be wet all day"
      },
      "s14l07": {
        "de": "Wer braucht schon Wärme?",
        "ru": "Кому вообще нужно тепло?",
        "en": "Who needs to be warm?"
      },
      "s14l08": {
        "de": "Es war ein schöner Tag, ich lief einfach so",
        "ru": "Это был прекрасный день, я просто шёл себе",
        "en": "It was a happy day, I was walking along"
      },
      "s14l09": {
        "de": "Der Himmel war blau und die Luft war warm",
        "ru": "Небо было голубым, и воздух был тёплым",
        "en": "And the sky was blue and the air was warm"
      },
      "s14l10": {
        "de": "Doch dann kamen Wolken und machten mir klar",
        "ru": "Но потом пришли облака и дали мне понять",
        "en": "But then the clouds came and made it clear"
      },
      "s14l11": {
        "de": "Der Himmel hatte genug von all dem Glück",
        "ru": "Что небу уже хватит всего этого счастья",
        "en": "The sky had had enough of all that cheer"
      },
      "s14l12": {
        "de": "Zeit, dass die Wolken mir die Parade verregnen",
        "ru": "Пора облакам испортить дождём мой праздник",
        "en": "Time for the clouds to rain on my parade"
      },
      "s14l13": {
        "de": "Zeit, dass die Sonne endlich verschwindet",
        "ru": "Пора солнцу наконец исчезнуть",
        "en": "Time for the sun to finally go away"
      },
      "s14l14": {
        "de": "Zeit, dass mein Tag zu einem Fluss vom Himmel wird",
        "ru": "Пора моему дню превратиться в реку с неба",
        "en": "Time for my day to become a river from the sky"
      },
      "s14l15": {
        "de": "Zeit, dass die Wolken mir ins Auge pissen",
        "ru": "Пора облакам нассать мне в глаз",
        "en": "Time for the clouds to piss in my eye"
      },
      "s14l16": {
        "de": "Später am Tag sah ich ein bisschen Sonne",
        "ru": "Позже в тот день я увидел немного солнца",
        "en": "Later that day, I saw a little bit of sun"
      },
      "s14l17": {
        "de": "Sie wollte durch die Wolken schauen, doch dann war sie weg",
        "ru": "Оно хотело выглянуть сквозь облака, но потом исчезло",
        "en": "It tried to peek through the clouds, but then it was gone"
      },
      "s14l18": {
        "de": "Die Wolken waren mit dem Regen noch nicht fertig",
        "ru": "Облака ещё не закончили со своим дождём",
        "en": "The clouds were not finished with all their rain"
      },
      "s14l19": {
        "de": "Sie wollten mir einfach noch mehr Wasser geben",
        "ru": "Они просто хотели дать мне ещё немного воды",
        "en": "They just wanted to give me some more water again"
      },
      "s14l20": {
        "de": "Etwas in meinen Schuh, und jede Menge in mein Haar",
        "ru": "Немного в мой ботинок и целую кучу в мои волосы",
        "en": "Some in my shoe, and lots in my hair"
      },
      "s14l21": {
        "de": "Ich hab wirklich überall genug Wasser",
        "ru": "У меня и правда воды уже повсюду хватает",
        "en": "I really have plenty of water everywhere"
      },
      "s14l22": {
        "de": "Der Regen hörte nicht mehr auf, nachdem er angefangen hatte",
        "ru": "Дождь так и не прекратился после того, как начался",
        "en": "The rain never stopped after it started"
      },
      "s14l23": {
        "de": "Die Sonne kam nicht zurück, die Wolken teilten sich nicht",
        "ru": "Солнце не вернулось, облака не разошлись",
        "en": "The sun didn't come back, the clouds never parted"
      },
      "s14l24": {
        "de": "Ich würde sagen, ich wäre gern warm",
        "ru": "Я бы сказал, что хотел бы быть в тепле",
        "en": "I would say I'd like to be warm"
      },
      "s14l25": {
        "de": "Doch das wird niemals sein",
        "ru": "Но этого никогда не будет",
        "en": "But that will never be"
      },
      "s14l26": {
        "de": "Der Himmel hat entschieden",
        "ru": "Небо решило",
        "en": "The sky has decided"
      },
      "s14l27": {
        "de": "Er will mich einfach ertränken",
        "ru": "Что оно просто хочет меня утопить",
        "en": "It just wants to drown me"
      },
      "s14l28": {
        "de": "Wenn er mich schon nicht gewinnen lässt",
        "ru": "Если оно всё равно не даст мне победить",
        "en": "If it won't let me win"
      },
      "s14l29": {
        "de": "Muss ich wohl schwimmen lernen",
        "ru": "Значит, мне, наверное, придётся научиться плавать",
        "en": "I guess I just need to learn to swim"
      },
      "s14l30": {
        "de": "Der Tag ist fast vorbei, und die Wolken sind endlich fertig",
        "ru": "День почти закончился, и облака наконец-то тоже закончили",
        "en": "The day is nearly done, and the clouds are finally done"
      },
      "s14l31": {
        "de": "Doch für ein bisschen Sonne ist es jetzt zu spät",
        "ru": "Но теперь уже слишком поздно для хоть какого-нибудь солнца",
        "en": "But now it's too late to have any sun"
      },
      "s14l32": {
        "de": "Sie sinkt hinter den Horizont, und jetzt bekomme ich die Nacht",
        "ru": "Оно садится за горизонт, и теперь мне достаётся ночь",
        "en": "It sinks behind the horizon, and now I get the night"
      },
      "s14l33": {
        "de": "Also steh ich hier mit Wasser im Schuh und seufze nur",
        "ru": "Так что я просто стою здесь с водой в ботинке и вздыхаю",
        "en": "So with water in my shoe, I just stand here and sigh"
      },
      "s14l34": {
        "de": "Wer brauchte schon einen schönen sonnigen Tag?",
        "ru": "Кому вообще был нужен хороший солнечный день?",
        "en": "Who needed a nice sunny day?"
      },
      "s14l35": {
        "de": "Regen, Regen, Regen und Wolken",
        "ru": "Дождь, дождь, дождь и облака",
        "en": "Rain, rain, rain and clouds"
      },
      "s14l36": {
        "de": "Haben meine Sonne",
        "ru": "Моё солнце",
        "en": "Made my sun"
      },
      "s14l37": {
        "de": "Vertrieben",
        "ru": "Прогнали",
        "en": "Go away"
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s14l01",
          "s14l02",
          "s14l03",
          "s14l04",
          "s14l05",
          "s14l06",
          "s14l07"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s14l08",
          "s14l09",
          "s14l10",
          "s14l11",
          "s14l12",
          "s14l13",
          "s14l14",
          "s14l15"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s14l16",
          "s14l17",
          "s14l18",
          "s14l19",
          "s14l20",
          "s14l21",
          "s14l22",
          "s14l23"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s14l24",
          "s14l25",
          "s14l26",
          "s14l27",
          "s14l28",
          "s14l29"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s14l30",
          "s14l31",
          "s14l32",
          "s14l33",
          "s14l34",
          "s14l35",
          "s14l36",
          "s14l37"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "chorus",
      "bridge",
      "chorus",
      "outro"
    ]
  },
  {
    "n": 17,
    "audio": "get-your-good-mood-on-eng",
    "title": {
      "de": "Hol dir gute Laune",
      "ru": "Подними себе настроение",
      "en": "Get Your Good Mood On"
    },
    "lines": {
      "s17l01": {
        "de": "Ich hab Pech in meiner Tasche",
        "ru": "У меня невезение в кармане",
        "en": "I have bad luck in my pocket"
      },
      "s17l02": {
        "de": "Und ich lächle trotzdem weiter",
        "ru": "Но я всё равно продолжаю улыбаться",
        "en": "And I'm still gonna keep my smile"
      },
      "s17l03": {
        "de": "Ich hab ein Problem zu viel",
        "ru": "У меня на одну проблему слишком много",
        "en": "I got one too many problems"
      },
      "s17l04": {
        "de": "Und ich halt den Kopf trotzdem hoch",
        "ru": "Но я всё равно держу голову высоко",
        "en": "And I'm still gonna keep my head held high"
      },
      "s17l05": {
        "de": "Ich mach einen Schritt nach links",
        "ru": "Я делаю шаг налево",
        "en": "I'm gonna take one step to the left"
      },
      "s17l06": {
        "de": "Und gleit dann wieder nach rechts",
        "ru": "А потом скольжу обратно направо",
        "en": "And then slide back to the right"
      },
      "s17l07": {
        "de": "Ich find meinen Groove und mach meinen Move",
        "ru": "Я нахожу свой грув и делаю свой мув",
        "en": "I'm gonna find my groove and make a move"
      },
      "s17l08": {
        "de": "Und tanz durch die ganze Nacht",
        "ru": "И танцую всю ночь напролёт",
        "en": "Gonna dance right through the night"
      },
      "s17l09": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "Gonna get my good mood on"
      },
      "s17l10": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "Gonna get my good mood, on"
      },
      "s17l11": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "Gonna get my good mood on"
      },
      "s17l12": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "Gonna get my good mood, on"
      },
      "s17l13": {
        "de": "Mein Tag brachte mir Probleme",
        "ru": "Мой день нашёл несколько проблем",
        "en": "My day sure found me some problems"
      },
      "s17l14": {
        "de": "Die wollten einfach nicht weg",
        "ru": "Они просто не хотели уходить",
        "en": "They just won't go away"
      },
      "s17l15": {
        "de": "Überall, wo ich auch hinsah",
        "ru": "Он находил их, куда бы я ни посмотрела",
        "en": "It found them everywhere I looked"
      },
      "s17l16": {
        "de": "Und alle wollten bleiben",
        "ru": "И все они хотели остаться",
        "en": "They all wanted to stay"
      },
      "s17l17": {
        "de": "Ein paar fand ich in der Tasche",
        "ru": "Несколько я нашла в кармане",
        "en": "I found some in my pocket"
      },
      "s17l18": {
        "de": "Ein paar fand ich in meinem Schuh",
        "ru": "Несколько я нашла в ботинке",
        "en": "And found some in my shoe"
      },
      "s17l19": {
        "de": "Ein paar sogar in der Unterwäsche",
        "ru": "Несколько — в моём нижнем белье",
        "en": "Found some in my underwear"
      },
      "s17l20": {
        "de": "Die versteckten sich dort auch",
        "ru": "Они прятались и там",
        "en": "They were hiding in there too"
      },
      "s17l21": {
        "de": "Ich halt meinen Kopf schön hoch",
        "ru": "Я держу голову высоко",
        "en": "I keep my head held high"
      },
      "s17l22": {
        "de": "Und die Füße fest am Boden",
        "ru": "А ноги — на земле",
        "en": "And keep my feet on the ground"
      },
      "s17l23": {
        "de": "Doch wenn ich diese Musik hör",
        "ru": "Но когда я слышу эту музыку",
        "en": "But when I hear that music"
      },
      "s17l24": {
        "de": "Dann beweg ich mich zum Takt",
        "ru": "Я начинаю двигаться под её звуки",
        "en": "I start moving to the sound"
      },
      "s17l25": {
        "de": "Ich schüttel alle Sorgen ab",
        "ru": "Я стряхиваю все свои заботы",
        "en": "I shake off all my worries"
      },
      "s17l26": {
        "de": "Und geb mir selbst 'ne Chance",
        "ru": "И даю себе шанс",
        "en": "And give myself a chance"
      },
      "s17l27": {
        "de": "Wenn Ärger mir noch folgen will",
        "ru": "Если неприятности хотят идти за мной",
        "en": "If trouble wants to follow me"
      },
      "s17l28": {
        "de": "Dann sollte er tanzen lernen",
        "ru": "Тогда им лучше научиться танцевать",
        "en": "It better learn to dance"
      },
      "s17l29": {
        "de": "Pech, Pech, zieh weiter",
        "ru": "Невезение, невезение, иди дальше",
        "en": "Bad luck, bad luck, move along"
      },
      "s17l30": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "I got my good mood on"
      },
      "s17l31": {
        "de": "Pech, Pech, zieh weiter",
        "ru": "Невезение, невезение, иди дальше",
        "en": "Bad luck, bad luck, move along"
      },
      "s17l32": {
        "de": "Ich hol mir gute Laune",
        "ru": "Я достаю хорошее настроение",
        "en": "I got my good mood on"
      },
      "s17l33": {
        "de": "Steh auf, steh auf, komm auf den Floor",
        "ru": "Вставай, вставай, выходи на танцпол",
        "en": "Get up, get up on the floor"
      },
      "s17l34": {
        "de": "Lass deine Füße den Song spür'n",
        "ru": "Пусть твои ноги почувствуют эту песню",
        "en": "Let your feet feel this song"
      },
      "s17l35": {
        "de": "Steh auf, steh auf, komm auf den Floor",
        "ru": "Вставай, вставай, выходи на танцпол",
        "en": "Get up, get up on the floor"
      },
      "s17l36": {
        "de": "Lass deine Füße den Song spür'n",
        "ru": "Пусть твои ноги почувствуют эту песню",
        "en": "Let your feet feel this song"
      },
      "s17l37": {
        "de": "Meine Probleme wissen, wo sie mich finden",
        "ru": "Мои проблемы знают, где меня найти",
        "en": "My troubles know where to find me"
      },
      "s17l38": {
        "de": "Doch ich bleib bei guter Laune",
        "ru": "Но я сохраняю своё хорошее настроение",
        "en": "But I'm gonna keep my good mood on"
      },
      "s17l39": {
        "de": "Probleme, Probleme rings um mich",
        "ru": "Проблемы, проблемы повсюду вокруг меня",
        "en": "Troubles, troubles all around me"
      },
      "s17l40": {
        "de": "Doch ich bleib bei guter Laune",
        "ru": "Но я сохраняю своё хорошее настроение",
        "en": "But gonna keep my good mood, on"
      },
      "s17l41": {
        "de": "Steh auf, steh auf, folge mir",
        "ru": "Вставай, вставай, следуй за мной",
        "en": "Gotta get up, get up, follow me"
      },
      "s17l42": {
        "de": "Lass deine Sorgen hinter dir",
        "ru": "Оставь свои заботы позади",
        "en": "Leave your worries behind"
      },
      "s17l43": {
        "de": "Hol dir gute Laune",
        "ru": "Достань хорошее настроение",
        "en": "Get your good mood on"
      },
      "s17l44": {
        "de": "Hol dir gute Laune",
        "ru": "Достань хорошее настроение",
        "en": "Get your good mood, on"
      },
      "s17l45": {
        "de": "Steh auf, steh auf, folge mir",
        "ru": "Вставай, вставай, следуй за мной",
        "en": "Gotta get up, get up, follow me"
      },
      "s17l46": {
        "de": "Hol dir gute Laune!",
        "ru": "Достань хорошее настроение!",
        "en": "Get your good mood, on!"
      }
    },
    "secs": [
      {
        "id": "chorus",
        "label": "Chorus",
        "lines": [
          "s17l01",
          "s17l02",
          "s17l03",
          "s17l04",
          "s17l05",
          "s17l06",
          "s17l07",
          "s17l08",
          "s17l09",
          "s17l10",
          "s17l11",
          "s17l12"
        ]
      },
      {
        "id": "verse1",
        "label": "Verse 1",
        "lines": [
          "s17l13",
          "s17l14",
          "s17l15",
          "s17l16",
          "s17l17",
          "s17l18",
          "s17l19",
          "s17l20"
        ]
      },
      {
        "id": "verse2",
        "label": "Verse 2",
        "lines": [
          "s17l21",
          "s17l22",
          "s17l23",
          "s17l24",
          "s17l25",
          "s17l26",
          "s17l27",
          "s17l28"
        ]
      },
      {
        "id": "bridge",
        "label": "Bridge",
        "lines": [
          "s17l29",
          "s17l30",
          "s17l31",
          "s17l32",
          "s17l33",
          "s17l34",
          "s17l35",
          "s17l36"
        ]
      },
      {
        "id": "outro",
        "label": "Outro",
        "lines": [
          "s17l37",
          "s17l38",
          "s17l39",
          "s17l40",
          "s17l41",
          "s17l42",
          "s17l43",
          "s17l44",
          "s17l45",
          "s17l46"
        ]
      }
    ],
    "play": [
      "chorus",
      "verse1",
      "chorus",
      "verse2",
      "chorus",
      "bridge",
      "chorus",
      "outro"
    ]
  }
];

/* ------------------------------------------------------------------
   WHAT LANGUAGE IS A SONG IN

   Steven, 07 Sep: this is a MULTILINGUAL site. There will be sets of
   songs in different languages, and she can listen in her own language
   and in others. So the language is not a two-way English/Russian flag —
   it is any language the app supports.

   THE CONVENTION: the last hyphen-delimited segment of the audio
   filename is the language code. `hello-world-en`, `cancion-es`,
   `moya-pesnya-rus`. No suffix means German, which is the course.

   `rus` IS AN ALIAS. Steven writes Russian as `-rus`, three letters,
   while every other code is the two-letter one. So the suffix and the
   language code are deliberately NOT the same string for Russian —
   never compare a filename suffix to a language code directly, go
   through here.

   ANCHORED TO A WHOLE SEGMENT. Four German songs end in the letters
   "en" — regen, herzen, rebellen, minuten — so a substring test would
   call all four English and pull them out of German practice. Only a
   complete trailing segment counts.

   UNKNOWN SUFFIX MEANS GERMAN. A filename ending in something that is
   not a supported code is treated as German, which is the existing
   behaviour for all 17 songs and cannot regress them.

   ONE RESOLVER, SIX CALLERS. songbook.js, jukebox.js, listen-speak.js,
   scramble.js and grammar.js all need this, and this file loads before
   every one of them (index.html line 81 against 109-120). Six copies of
   the pattern would drift, and a drifted copy means a song that is
   English in the list and German in the practice pool. */
window.GH_SONG_LANG = (function(){
  /* Every code the app supports: the speech LOCALE map and the
     langName_* strings in i18n.js both cover exactly these. */
  var CODES = { de:1, ru:1, en:1, es:1, fr:1, tl:1, ga:1 };

  /* THREE-LETTER SUFFIXES, Steven's convention for the multilingual site
     (07 Sep). After Tanya's deploy the songs that stay get an explicit
     suffix — German becomes `-deu` rather than no suffix at all — so both
     spellings are accepted and neither breaks the other.

       -eng English   -rus Russian    -ita Italian   -fra French
       -ukr Ukrainian -deu German     -tag Tagalog   -esp Spanish

     These are the ISO 639-2 three-letter codes; the codes this returns
     are the 639-1 two-letter ones the rest of the app uses (`fr`, `de`,
     `ru`). `-fre` also resolves to French — it is the older
     English-language variant of `fra` and both are real.

     `eng:'en'` IS MY ASSUMPTION, not his instruction: he named English as
     `-en` before the three-letter scheme and has not restated it. Both
     resolve, so a song named either way works, but confirm which he
     intends before renaming anything.

     TWO OF STEVEN'S EIGHT ARE NOT WIRED UP YET: Italian (`it`) and
     Ukrainian (`uk`). Neither is in CODES, so `-ita` and `-ukr` songs
     resolve to GERMAN today — accepted but inert, and they would show up
     in German practice. Each needs a row in speech.js's LOCALE map
     (`it-IT`, `uk-UA`) and `langName_it` / `langName_uk` in all three
     i18n blocks. Post-deploy work, Steven's decision 07 Sep. Do not
     add songs in those two languages before that is done.

     The other six — English, Russian, French, German, Tagalog, Spanish —
     are fully supported and safe to use now. */
  var ALIAS = { eng:'en', rus:'ru', ita:'it', fra:'fr', ukr:'uk',
                deu:'de', tag:'tl', esp:'es',
                /* also accepted, so a filename cannot be wrong. `fre` is
                   the older English-language variant of `fra` — both are
                   real ISO 639-2 codes for French. `en`, `ger` and `gle`
                   are earlier or alternate forms. All resolve
                   identically, so a file named either way works. */
                fre:'fr', en:'en', ger:'de', gle:'ga' };

  return function(song){
    var a = (song && song.audio) || '';
    var cut = a.lastIndexOf('-');
    if (cut < 0) return 'de';
    var tail = a.slice(cut + 1);
    var code = ALIAS[tail] || tail;
    return CODES[code] ? code : 'de';
  };
})();
