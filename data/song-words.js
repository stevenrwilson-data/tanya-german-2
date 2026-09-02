/* The words a song teaches.

   A song is a vocabulary list with a scene attached to every item. `der
   Fernsehturm` is not a television tower here, it is the day they went up
   it, and the lyric, the sung German and the picture all point at the same
   memory. That is a better retrieval network than a flashcard.

   ------------------------------------------------------------------
   THIS FILE HOLDS REFERENCES, NOT TEXT

   `songs` maps a song to a list of German words and holds nothing else —
   no glosses, no Russian, no pictures. `die Kälte` is in three of these
   songs and `der Platz` in three more, and writing a word once per song is
   how the Russian in one ends up disagreeing with the Russian in another.
   It had already started in the source lists, every time:

     der Platz    square / plaza · place · place; space
     der Traum    мечта · мечта / сон · сон / мечта
     scheinen     to shine · to seem; shine
     erschöpft    изнурённый; обессиленный · измученный / уставший
     der Weg      way; path · way / path
     vergehen     to pass; fade · to pass

   A reference is resolved in this order, first hit wins:

     1  data/dictionary.js  FIRST, because a headword exists to supersede
                            a vocab entry that was too coarse. `der Fuß` is
                            «ступня / нога» in the bank and ступня ·
                            подножие · фут in the dictionary, and the
                            bank's gloss is the ambiguity the dictionary
                            was written to fix. A sense carries its own
                            image number, so nothing is lost.
     2  data/vocab.js       127 of the 339 are already there, with an image
                            number, a gender and two example sentences. The
                            song gets all of it for nothing and points at
                            the same item the tutor schedules.
     3  `words` below       everything that exists nowhere else yet.

   A word graduating — a drawing arrives, or it becomes a dictionary
   headword — means deleting its row here. Nothing else changes and no
   song's list is touched.

   It also graduates by being ADDED TO THE BANK for some other reason.
   `sogar` sat here for weeks and was then written into vocab.js as one of
   Tanya's course words; the bank wins, so this row had been shadowed ever
   since. Same gloss, so nothing looked wrong — the row was simply dead.
   Worth re-running the duplicate check after any vocab.js change.

   ------------------------------------------------------------------
   A ROW IN `words`

     en, ru   the gloss
     img      image number, 0 for none. With no picture the card sets the
              German large, which is what sprite.js already does and what
              an abstract word has to be.
     def      definition per language. ABSENT ON EVERY ROW RIGHT NOW.
              gpt-prompts-songdefs.md is the prompt for the first 78.
     kind     computed from the string, never judged:
                'word'    one word, article aside          199
                'phrase'  more than one, fixed              11
                'slot'    has a gap: `so tun, als …`         0
              There are no `slot` items in the current data — the cleaned
              lists removed them — but songvocab.js keeps the handling. A
              slot phrase cannot be read aloud as written, so it
              substitutes for speech (`jemandem` -> `ihm`, `etwas` -> `das`)
              while the card keeps the real form, because the placeholder
              is what is being taught. Delete that and the next one added
              speaks its own ellipsis.
     want     what it is waiting for, so the file is its own to-do list
                'img'   a drawing asked for, does not exist yet      69
                'def'   a definition, no drawing needed              77
                'dict'  means more than one thing, belongs in
                        dictionary.js, sits here until it moves       1
                'flag'  NOT DECIDED. The cleaned lists arrived without
                        the picture/definition column                 63

   ------------------------------------------------------------------
   PHRASES ARE NOT A SEPARATE BANK

   175 of the 752 entries in vocab.js are already multi-word — `die
   schwarze Jacke`, `das Glas Wasser`, `ein Handy unter dem Pullover`. A
   phrase resolves exactly like a word and needs no second file.

   ------------------------------------------------------------------
   DECIDED, ONCE

     der Abschied  'farewell / goodbye'   the fuller gloss
     der Krieg     definition             no drawing exists for the
                                          picture flag to point at
     der Platz     dictionary             square, place and space are
                                          three meanings, given in three
                                          different songs
     der Traum     dictionary             already a headword there
     scheinen      dictionary             `to seem; shine` is a semicolon
                                          doing a dictionary's job
     flüstern      definition             the 'audio' half of
     pfeifen       definition             'definition/audio' is what the
                                          song itself is for: she hears it
                                          sung
   */

window.GH_SONGWORDS = {

  /* de -> gloss. Written once, however many songs ask for it. */
  words: {
    'der Abschied': { en:'farewell / goodbye', ru:'прощание', img:0, kind:'word', want:'def' },
    'Abschied nehmen': { en:'to say goodbye', ru:'прощаться', img:0, kind:'phrase', want:'img' },
    'der Anfang': { en:'beginning', ru:'начало', img:0, kind:'word', want:'def' },
    'angenehm': { en:'pleasant', ru:'приятный', img:0, kind:'word', want:'def' },
    'die Angst': { en:'fear', ru:'страх', img:0, kind:'word', want:'def' },
    'anprobieren': { en:'to try on', ru:'примерять', img:0, kind:'word', want:'img' },
    'der Anwalt': { en:'lawyer', ru:'адвокат', img:0, kind:'word', want:'img' },
    'der Arm': { en:'arm', ru:'рука', img:0, kind:'word', want:'img' },
    'der Atem': { en:'breath', ru:'дыхание', img:0, kind:'word', want:'def' },
    'atmen': { en:'to breathe', ru:'дышать', img:0, kind:'word', want:'img' },
    'aufblühen': { en:'to blossom', ru:'расцветать', img:0, kind:'word', want:'img' },
    'auftragen': { en:'to apply', ru:'наносить', img:0, kind:'word', want:'img' },
    'das Auge': { en:'eye', ru:'глаз', img:0, kind:'word', want:'img' },
    'der Augenblick': { en:'moment', ru:'мгновение', img:0, kind:'word', want:'def' },
    'ausgehen': { en:'to run out', ru:'заканчиваться', img:0, kind:'word', want:'def' },
    'auspacken': { en:'to unpack', ru:'распаковывать', img:0, kind:'word', want:'img' },
    'ausruhen': { en:'to rest', ru:'отдыхать', img:0, kind:'word', want:'img' },
    'ausverkauft sein': { en:'to be sold out', ru:'быть распроданным', img:0, kind:'phrase', want:'def' },
    'das Auto': { en:'car', ru:'машина', img:0, kind:'word', want:'img' },
    'der Bart': { en:'beard', ru:'борода', img:0, kind:'word', want:'img' },
    'beginnen': { en:'to begin', ru:'начинаться', img:0, kind:'word', want:'def' },
    'benutzen': { en:'to use', ru:'использовать', img:0, kind:'word', want:'img' },
    'die Bergluft': { en:'mountain air', ru:'горный воздух', img:0, kind:'word', want:'img' },
    'der beste Freund': { en:'best friend', ru:'лучший друг', img:0, kind:'phrase', want:'def' },
    'der Besuch': { en:'visit', ru:'визит', img:0, kind:'word', want:'def' },
    'bewahren': { en:'to preserve / keep', ru:'хранить / сохранять', img:0, kind:'word', want:'def' },
    'bewegen': { en:'to move', ru:'двигать', img:0, kind:'word', want:'img' },
    'der BH': { en:'bra', ru:'бюстгальтер', img:0, kind:'word', want:'img' },
    'der BH-Träger': { en:'bra strap', ru:'бретелька бюстгальтера', img:0, kind:'word', want:'img' },
    'der Bildschirm': { en:'screen', ru:'экран', img:0, kind:'word', want:'img' },
    'der Blick': { en:'look / glance', ru:'взгляд', img:0, kind:'word', want:'def' },
    'der Blumenladen': { en:'flower shop', ru:'цветочный магазин', img:0, kind:'word', want:'img' },
    'der Blumenstrauß': { en:'bouquet', ru:'букет цветов', img:0, kind:'word', want:'img' },
    'brennen': { en:'to burn', ru:'гореть', img:0, kind:'word', want:'img' },
    'die Brust': { en:'chest', ru:'грудь', img:0, kind:'word', want:'img' },
    'der Bäcker': { en:'baker', ru:'пекарь', img:0, kind:'word', want:'img' },
    'bürsten': { en:'to brush', ru:'расчёсывать щёткой', img:0, kind:'word', want:'img' },
    'davonziehen': { en:'to drift/go away', ru:'уходить / удаляться', img:0, kind:'word', want:'def' },
    'den Atem anhalten': { en:'to hold one\'s breath', ru:'задерживать дыхание', img:0, kind:'phrase', want:'def' },
    'den ganzen Tag': { en:'all day', ru:'весь день', img:0, kind:'phrase', want:'def' },
    'den Kopf hochhalten': { en:'to keep one\'s head held high', ru:'держать голову высоко', img:0, kind:'phrase', want:'def' },
    'der Diamant': { en:'diamond', ru:'бриллиант / алмаз', img:0, kind:'word', want:'img' },
    'direkt': { en:'directly', ru:'прямо / непосредственно', img:0, kind:'word', want:'def' },
    'dunkel': { en:'dark', ru:'тёмный', img:0, kind:'word', want:'img' },
    'die Dunkelheit': { en:'darkness', ru:'темнота', img:0, kind:'word', want:'img' },
    'duschen': { en:'to shower', ru:'принимать душ', img:0, kind:'word', want:'img' },
    'egal': { en:'unimportant; no matter', ru:'всё равно', img:0, kind:'word', want:'def' },
    'eincremen': { en:'to apply cream', ru:'намазывать кремом', img:0, kind:'word', want:'img' },
    'einnehmen': { en:'to take / occupy', ru:'занимать', img:0, kind:'word', want:'def' },
    'einreden': { en:'to persuade by talking', ru:'уговаривать', img:0, kind:'word', want:'def' },
    'einstehen für': { en:'to stand up for', ru:'выступать за / защищать', img:0, kind:'phrase', want:'def' },
    'endlich': { en:'finally', ru:'наконец', img:0, kind:'word', want:'def' },
    'der Engel': { en:'angel', ru:'ангел', img:0, kind:'word', want:'img' },
    'die Entfernung': { en:'distance', ru:'расстояние', img:0, kind:'word', want:'def' },
    'erfüllen': { en:'to fill; fulfill', ru:'наполнять; исполнять', img:0, kind:'word', want:'def' },
    'erhoben': { en:'raised', ru:'поднятый', img:0, kind:'word', want:'img' },
    'die Erinnerung': { en:'memory', ru:'воспоминание', img:0, kind:'word', want:'def' },
    'erwachen': { en:'to awaken', ru:'просыпаться / пробуждаться', img:0, kind:'word', want:'def' },
    'etwas in den Müll werfen': { en:'to throw something in the trash', ru:'выбрасывать в мусор', img:0, kind:'slot', want:'def' },
    'ewig': { en:'forever', ru:'вечно', img:0, kind:'word', want:'def' },
    'die Fensterscheibe': { en:'windowpane', ru:'оконное стекло', img:0, kind:'word', want:'img' },
    'der Fernsehturm': { en:'television tower', ru:'телебашня', img:0, kind:'word', want:'img' },
    'festhalten': { en:'to hold tightly', ru:'крепко держать', img:0, kind:'word', want:'img' },
    'feuerrot': { en:'fiery red', ru:'огненно-красный', img:0, kind:'word', want:'img' },
    'der Finger': { en:'finger', ru:'палец', img:0, kind:'word', want:'img' },
    'der Fingernagel': { en:'fingernail', ru:'ноготь', img:0, kind:'word', want:'img' },
    'die Flamme': { en:'flame', ru:'пламя', img:0, kind:'word', want:'img' },
    'fliegen': { en:'to fly', ru:'лететь', img:0, kind:'word', want:'img' },
    'flüstern': { en:'to whisper', ru:'шептать', img:0, kind:'word', want:'def' },
    'forttragen': { en:'to carry away', ru:'уносить', img:0, kind:'word', want:'def' },
    'die Freiheit': { en:'freedom', ru:'свобода', img:0, kind:'word', want:'def' },
    'freundlich': { en:'kind, friendly', ru:'добрый, приветливый', img:0, kind:'word', want:'def' },
    'friedlich': { en:'peacefully / peaceful', ru:'мирно / спокойный', img:0, kind:'word', want:'def' },
    'frische Luft': { en:'fresh air', ru:'свежий воздух', img:0, kind:'phrase', want:'def' },
    'der Frost': { en:'frost', ru:'мороз', img:0, kind:'word', want:'img' },
    'funkeln': { en:'to sparkle / twinkle', ru:'сверкать / мерцать', img:0, kind:'word', want:'img' },
    'fürchten': { en:'to fear', ru:'бояться', img:0, kind:'word', want:'def' },
    'der Gang': { en:'corridor; hallway', ru:'коридор', img:0, kind:'word', want:'img' },
    'das Gebet': { en:'prayer', ru:'молитва', img:0, kind:'word', want:'def' },
    'die Geburt': { en:'birth', ru:'рождение', img:0, kind:'word', want:'def' },
    'der Gedanke': { en:'thought', ru:'мысль', img:0, kind:'word', want:'def' },
    'das Gefühl': { en:'feeling', ru:'чувство', img:0, kind:'word', want:'def' },
    'gemein': { en:'mean; nasty', ru:'злой; противный', img:0, kind:'word', want:'def' },
    'gemeinsam': { en:'together', ru:'вместе / совместно', img:0, kind:'word', want:'def' },
    'geschlossen': { en:'closed', ru:'закрытый', img:0, kind:'word', want:'img' },
    'getrennt': { en:'separated', ru:'разлучённый / отдельно', img:0, kind:'word', want:'def' },
    'glitzern': { en:'to sparkle / glitter', ru:'сверкать', img:0, kind:'word', want:'img' },
    'golden': { en:'golden', ru:'золотой', img:0, kind:'word', want:'img' },
    'halb besiegt': { en:'half defeated', ru:'наполовину побеждённый', img:0, kind:'phrase', want:'def' },
    'die Haltestelle': { en:'stop', ru:'остановка', img:0, kind:'word', want:'img' },
    'die Hand': { en:'hand', ru:'рука', img:0, kind:'word', want:'img' },
    'der Hass': { en:'hate', ru:'ненависть', img:0, kind:'word', want:'def' },
    'heiser': { en:'hoarse', ru:'охрипший', img:0, kind:'word', want:'img' },
    'herab': { en:'down; downward', ru:'вниз', img:0, kind:'word', want:'def' },
    'hereinlassen': { en:'to let in', ru:'впускать', img:0, kind:'word', want:'img' },
    'der Himmel': { en:'sky', ru:'небо', img:0, kind:'word', want:'img' },
    'hinein': { en:'into / inward', ru:'внутрь', img:0, kind:'word', want:'def' },
    'in der Schlange stehen': { en:'to wait in line', ru:'стоять в очереди', img:0, kind:'phrase', want:'def' },
    'der Januar': { en:'January', ru:'январь', img:0, kind:'word', want:'def' },
    'jemanden umarmen': { en:'to hug someone', ru:'обнимать кого-либо', img:0, kind:'slot', want:'def' },
    'jemanden verlassen': { en:'to leave someone', ru:'покидать кого-либо', img:0, kind:'slot', want:'def' },
    'jemanden vermissen': { en:'to miss someone', ru:'скучать по кому-либо', img:0, kind:'slot', want:'def' },
    'das Juwel': { en:'jewel', ru:'драгоценный камень', img:0, kind:'word', want:'img' },
    'die Kerze': { en:'candle', ru:'свеча', img:0, kind:'word', want:'img' },
    'die Kiefer': { en:'pine tree', ru:'сосна', img:0, kind:'word', want:'img' },
    'der Klang': { en:'sound', ru:'звучание / звук', img:0, kind:'word', want:'def' },
    'klatschen': { en:'to clap', ru:'хлопать', img:0, kind:'word', want:'img' },
    'der kleine Hund': { en:'little dog', ru:'маленькая собака', img:0, kind:'phrase', want:'img' },
    'klettern': { en:'to climb', ru:'карабкаться', img:0, kind:'word', want:'img' },
    'die Klinik': { en:'clinic / hospital', ru:'клиника', img:0, kind:'word', want:'img' },
    'die Kopfschmerzen': { en:'headache', ru:'головная боль', img:0, kind:'word', want:'img' },
    'die Kraft': { en:'strength / energy', ru:'сила', img:0, kind:'word', want:'def' },
    'kratzen': { en:'to scratch', ru:'чесать', img:0, kind:'word', want:'img' },
    'der Krieg': { en:'war', ru:'война', img:0, kind:'word', want:'def' },
    'kämpfen': { en:'to fight', ru:'бороться', img:0, kind:'word', want:'def' },
    'das Labyrinth': { en:'maze', ru:'лабиринт', img:0, kind:'word', want:'img' },
    'lackieren': { en:'to paint; polish', ru:'красить; покрывать лаком', img:0, kind:'word', want:'img' },
    'das Land': { en:'country / land', ru:'страна / земля', img:0, kind:'word', want:'img' },
    'lebendig': { en:'alive', ru:'живой', img:0, kind:'word', want:'def' },
    'lecker': { en:'delicious', ru:'вкусный', img:0, kind:'word', want:'def' },
    'leise': { en:'quietly / softly', ru:'тихо', img:0, kind:'word', want:'def' },
    'das Lid': { en:'eyelid', ru:'веко', img:0, kind:'word', want:'img' },
    'locker': { en:'loose', ru:'свободный, незатянутый', img:0, kind:'word', want:'def' },
    'losmüssen': { en:'to have to leave', ru:'быть вынужденным уходить', img:0, kind:'word', want:'def' },
    'das Lächeln': { en:'smile', ru:'улыбка', img:0, kind:'word', want:'img' },
    'die Lücke': { en:'gap', ru:'пробел / промежуток', img:0, kind:'word', want:'img' },
    'malen': { en:'to paint', ru:'рисовать', img:0, kind:'word', want:'img' },
    'die Mandel': { en:'almond', ru:'миндаль', img:0, kind:'word', want:'img' },
    'der Mantel': { en:'coat', ru:'пальто', img:0, kind:'word', want:'img' },
    'die Mauer': { en:'wall', ru:'стена', img:0, kind:'word', want:'img' },
    'die Meinung': { en:'opinion', ru:'мнение', img:0, kind:'word', want:'def' },
    'mitbringen': { en:'to bring along', ru:'приносить с собой', img:0, kind:'word', want:'img' },
    'mitmachen': { en:'to participate', ru:'участвовать', img:0, kind:'word', want:'def' },
    'der Mondstrahl': { en:'moonbeam', ru:'лунный луч', img:0, kind:'word', want:'img' },
    'die Morgensonne': { en:'morning sun', ru:'утреннее солнце', img:0, kind:'word', want:'img' },
    'mutig': { en:'brave', ru:'смелый', img:0, kind:'word', want:'def' },
    'der Müll': { en:'trash', ru:'мусор', img:0, kind:'word', want:'img' },
    'nach etwas greifen': { en:'to reach for something', ru:'тянуться за чем-либо', img:0, kind:'slot', want:'def' },
    'nach Hause wollen': { en:'to want to go home', ru:'хотеть домой', img:0, kind:'phrase', want:'def' },
    'nach vorn schauen': { en:'to look ahead', ru:'смотреть вперёд', img:0, kind:'phrase', want:'def' },
    'nachwinken': { en:'to wave goodbye', ru:'махать вслед', img:0, kind:'word', want:'img' },
    'nie wieder': { en:'never again', ru:'никогда больше', img:0, kind:'phrase', want:'def' },
    'nirgendwo': { en:'nowhere', ru:'нигде', img:0, kind:'word', want:'def' },
    'noch drei Haltestellen': { en:'three more stops', ru:'ещё три остановки', img:0, kind:'phrase', want:'def' },
    'die Nähe': { en:'closeness / nearness', ru:'близость', img:0, kind:'word', want:'def' },
    'das Ohr': { en:'ear', ru:'ухо', img:0, kind:'word', want:'img' },
    'der Ozean': { en:'ocean', ru:'океан', img:0, kind:'word', want:'img' },
    'packen': { en:'to pack', ru:'паковать', img:0, kind:'word', want:'img' },
    'die Pandemie': { en:'pandemic', ru:'пандемия', img:0, kind:'word', want:'def' },
    'das Papier': { en:'paper', ru:'бумага', img:0, kind:'word', want:'img' },
    'das Pfefferminzbonbon': { en:'breath mint', ru:'мятная конфета', img:0, kind:'word', want:'img' },
    'pfeifen': { en:'to whistle', ru:'свистеть', img:0, kind:'word', want:'def' },
    'die Pizzeria': { en:'pizzeria', ru:'пиццерия', img:0, kind:'word', want:'img' },
    'reiben': { en:'to rub', ru:'тереть', img:0, kind:'word', want:'img' },
    'der Rennfahrer': { en:'race-car driver', ru:'автогонщик', img:0, kind:'word', want:'img' },
    'der Riemen': { en:'strap', ru:'ремешок', img:0, kind:'word', want:'img' },
    'sacht': { en:'gently', ru:'нежно; осторожно', img:0, kind:'word', want:'def' },
    'sanft': { en:'gentle / gently', ru:'нежный / мягко', img:0, kind:'word', want:'def' },
    'der Schatten': { en:'shadow', ru:'тень', img:0, kind:'word', want:'img' },
    'der Schauspieler': { en:'actor', ru:'актёр', img:0, kind:'word', want:'img' },
    'der Schein': { en:'glow / light', ru:'сияние / свет', img:0, kind:'word', want:'img' },
    'scheinen': { en:'to seem / to shine', ru:'казаться / светить', img:0, kind:'word', want:'dict' },
    'die Schlafzimmertür': { en:'bedroom door', ru:'дверь спальни', img:0, kind:'word', want:'img' },
    'die Schlange': { en:'queue, line', ru:'очередь', img:0, kind:'word', want:'img' },
    'schlecht behandeln': { en:'to treat badly', ru:'плохо обращаться', img:0, kind:'phrase', want:'def' },
    'schmelzen': { en:'to melt', ru:'таять', img:0, kind:'word', want:'img' },
    'der Schmerz': { en:'pain', ru:'боль', img:0, kind:'word', want:'def' },
    'schnappen': { en:'to grab', ru:'хватать', img:0, kind:'word', want:'img' },
    'das Schokoladencroissant': { en:'chocolate croissant', ru:'шоколадный круассан', img:0, kind:'word', want:'img' },
    'der Schuh': { en:'shoe', ru:'туфля, ботинок', img:0, kind:'word', want:'img' },
    'schweben': { en:'to float / hover', ru:'парить', img:0, kind:'word', want:'img' },
    'die Seele': { en:'soul', ru:'душа', img:0, kind:'word', want:'def' },
    'sich entscheiden': { en:'to decide', ru:'решать', img:0, kind:'phrase', want:'def' },
    'sich erheben': { en:'to rise', ru:'подниматься', img:0, kind:'phrase', want:'def' },
    'sich erinnern': { en:'to remember', ru:'помнить / вспоминать', img:0, kind:'phrase', want:'def' },
    'sich heben': { en:'to rise', ru:'подниматься', img:0, kind:'phrase', want:'img' },
    'sich senken': { en:'to lower / sink', ru:'опускаться', img:0, kind:'phrase', want:'img' },
    'sich treffen': { en:'to meet', ru:'встречаться', img:0, kind:'phrase', want:'img' },
    'sich wiedersehen': { en:'to see each other again', ru:'снова увидеться', img:0, kind:'phrase', want:'def' },
    'der Sieg': { en:'victory', ru:'победа', img:0, kind:'word', want:'def' },
    'silberblau': { en:'silver-blue', ru:'серебристо-голубой', img:0, kind:'word', want:'img' },
    'der Sonnenuntergang': { en:'sunset', ru:'закат', img:0, kind:'word', want:'img' },
    'die Sorge': { en:'worry', ru:'забота / тревога', img:0, kind:'word', want:'def' },
    'die Sorgfalt': { en:'care / carefulness', ru:'забота / тщательность', img:0, kind:'word', want:'def' },
    'springen': { en:'to jump', ru:'прыгать', img:0, kind:'word', want:'img' },
    'die Spur': { en:'trace / track', ru:'след', img:0, kind:'word', want:'img' },
    'später': { en:'later', ru:'позже', img:0, kind:'word', want:'def' },
    'die Stadt': { en:'city', ru:'город', img:0, kind:'word', want:'img' },
    'steinern': { en:'made of stone / stone', ru:'каменный', img:0, kind:'word', want:'img' },
    'das Sternenlicht': { en:'starlight', ru:'звёздный свет', img:0, kind:'word', want:'img' },
    'die Stille': { en:'silence', ru:'тишина', img:0, kind:'word', want:'def' },
    'die Stimme': { en:'voice', ru:'голос', img:0, kind:'word', want:'def' },
    'strahlen': { en:'to shine', ru:'сиять', img:0, kind:'word', want:'def' },
    'die Straßenbahn': { en:'tram', ru:'трамвай', img:0, kind:'word', want:'img' },
    'strecken': { en:'to stretch', ru:'потягиваться; вытягивать', img:0, kind:'word', want:'img' },
    'stärker': { en:'stronger', ru:'сильнее', img:0, kind:'word', want:'def' },
    'das Symbol': { en:'symbol', ru:'символ', img:0, kind:'word', want:'img' },
    'das Tal': { en:'valley', ru:'долина', img:0, kind:'word', want:'img' },
    'tausend': { en:'thousand', ru:'тысяча', img:0, kind:'word', want:'def' },
    'der Teil': { en:'part', ru:'часть', img:0, kind:'word', want:'def' },
    'teilen': { en:'to share', ru:'делиться', img:0, kind:'word', want:'def' },
    'der Termin': { en:'appointment', ru:'встреча, приём', img:0, kind:'word', want:'img' },
    'der Ton': { en:'tone / musical note', ru:'тон / звук', img:0, kind:'word', want:'def' },
    'die Trauer': { en:'grief', ru:'печаль / горе', img:0, kind:'word', want:'def' },
    'trennen': { en:'to separate', ru:'разделять', img:0, kind:'word', want:'def' },
    'die Trennung': { en:'separation', ru:'разлука', img:0, kind:'word', want:'def' },
    'treu': { en:'loyal, faithful', ru:'верный, преданный', img:0, kind:'word', want:'def' },
    'der Tropfen': { en:'drop', ru:'капля', img:0, kind:'word', want:'img' },
    'die Träne': { en:'tear', ru:'слеза', img:0, kind:'word', want:'img' },
    'umarmen': { en:'to hug / embrace', ru:'обнимать', img:0, kind:'word', want:'img' },
    'die Umarmung': { en:'hug', ru:'объятие', img:0, kind:'word', want:'img' },
    'der Umriss': { en:'outline', ru:'контур', img:0, kind:'word', want:'img' },
    'umstimmen': { en:'to change someone\'s mind', ru:'переубеждать', img:0, kind:'word', want:'def' },
    'unbequem': { en:'uncomfortable', ru:'неудобный', img:0, kind:'word', want:'def' },
    'ein und aus': { en:'in and out', ru:'внутрь и наружу / вдох и выдох', img:0, kind:'phrase', want:'def' },
    'ungeteilt': { en:'undivided', ru:'неделимый', img:0, kind:'word', want:'def' },
    'unterwegs': { en:'on the way; traveling', ru:'в пути', img:0, kind:'word', want:'def' },
    'verbergen': { en:'to hide / conceal', ru:'скрывать', img:0, kind:'word', want:'def' },
    'verbinden': { en:'to connect / unite', ru:'соединять', img:0, kind:'word', want:'def' },
    'vergehen': { en:'to pass; fade', ru:'проходить', img:0, kind:'word', want:'def' },
    'verlassen': { en:'to leave', ru:'покидать', img:0, kind:'word', want:'def' },
    'versagen': { en:'to fail; give out', ru:'отказывать; подводить', img:0, kind:'word', want:'def' },
    'verschieden': { en:'different; various', ru:'разный; различный', img:0, kind:'word', want:'def' },
    'verschränken': { en:'to cross; fold', ru:'скрещивать', img:0, kind:'word', want:'img' },
    'verschwimmen': { en:'to blur', ru:'расплываться', img:0, kind:'word', want:'img' },
    'verschwinden': { en:'to disappear', ru:'исчезать', img:0, kind:'word', want:'def' },
    'das Versprechen': { en:'promise', ru:'обещание', img:0, kind:'word', want:'def' },
    'verstecken': { en:'to hide', ru:'прятать; скрывать', img:0, kind:'word', want:'img' },
    'voll': { en:'full', ru:'полный', img:0, kind:'word', want:'def' },
    'wackeln': { en:'to wiggle', ru:'покачивать', img:0, kind:'word', want:'img' },
    'warten auf': { en:'to wait for', ru:'ждать кого-либо, чего-либо', img:0, kind:'phrase', want:'def' },
    'der Wasserpark': { en:'water park', ru:'аквапарк', img:0, kind:'word', want:'img' },
    'der Wecker': { en:'alarm clock', ru:'будильник', img:0, kind:'word', want:'img' },
    'wehen': { en:'to blow', ru:'дуть', img:0, kind:'word', want:'img' },
    'wehtun': { en:'to hurt', ru:'болеть', img:0, kind:'word', want:'img' },
    'weiterleben': { en:'to live on', ru:'продолжать жить', img:0, kind:'word', want:'def' },
    'weiterschlafen': { en:'to continue sleeping', ru:'продолжать спать', img:0, kind:'word', want:'img' },
    'die Welt': { en:'world', ru:'мир', img:0, kind:'word', want:'img' },
    'die Wimper': { en:'eyelash', ru:'ресница', img:0, kind:'word', want:'img' },
    'wippen': { en:'to bob; tap', ru:'покачивать', img:0, kind:'word', want:'img' },
    'woanders': { en:'somewhere else', ru:'в другом месте', img:0, kind:'word', want:'def' },
    'die Zeichnung': { en:'drawing', ru:'рисунок', img:0, kind:'word', want:'img' },
    'zerbrechlich': { en:'fragile', ru:'хрупкий', img:0, kind:'word', want:'def' },
    'zu spät sein': { en:'to be late', ru:'опаздывать', img:0, kind:'phrase', want:'def' },
    'zu viel Arbeit': { en:'too much work', ru:'слишком много работы', img:0, kind:'phrase', want:'def' },
    'zubereiten': { en:'to prepare', ru:'готовить', img:0, kind:'word', want:'img' },
    'zuhören': { en:'to listen', ru:'слушать', img:0, kind:'word', want:'def' },
    'zurückbringen': { en:'to bring back', ru:'возвращать', img:0, kind:'word', want:'def' },
    'zurückkehren': { en:'to return', ru:'возвращаться', img:0, kind:'word', want:'def' },
    'zusammen': { en:'together', ru:'вместе', img:0, kind:'word', want:'def' },
    'das Zusammensein': { en:'being together', ru:'совместное время', img:0, kind:'word', want:'def' },
    'zwischen': { en:'between', ru:'между', img:0, kind:'word', want:'def' },
    'die Zärtlichkeit': { en:'tenderness', ru:'нежность', img:0, kind:'word', want:'def' },
    'überfüllt': { en:'overcrowded', ru:'переполненный', img:0, kind:'word', want:'def' },
    'überleben': { en:'to survive', ru:'выживать', img:0, kind:'word', want:'def' },
    'überqueren': { en:'to cross', ru:'пересекать', img:0, kind:'word', want:'def' },
    'übrig': { en:'remaining / left', ru:'оставшийся', img:0, kind:'word', want:'def' },
    'hinaus':
      { en:'outward / out',
        ru:'наружу',
        img:0, kind:'word', want:'def' },
    'schick':
      { en:'dressed up / stylish',
        ru:'нарядный',
        img:0, kind:'word', want:'def' },
    'die Dämmerung':
      { en:'twilight',
        ru:'сумерки',
        img:0, kind:'word', want:'def' },
    'richten':
      { en:'to fix / arrange',
        ru:'поправлять',
        img:0, kind:'word', want:'def' },
    'das Haar':
      { en:'hair',
        ru:'волосы',
        img:0, kind:'word', want:'def' },
    'der Depp':
      { en:'chump / fool',
        ru:'дурак',
        img:0, kind:'word', want:'def' },
    'makellos':
      { en:'flawless',
        ru:'безупречный',
        img:0, kind:'word', want:'def' },
    'kriechen':
      { en:'to crawl',
        ru:'ползти',
        img:0, kind:'word', want:'def' },
    'der Fiebertraum':
      { en:'fever dream',
        ru:'горячечный сон',
        img:0, kind:'word', want:'def' },
    'die Schleife':
      { en:'loop',
        ru:'цикл / петля',
        img:0, kind:'word', want:'def' },
    'beschweren':
      { en:'to complain',
        ru:'жаловаться',
        img:0, kind:'word', want:'def' },
    'die Schönheit':
      { en:'beauty',
        ru:'красота',
        img:0, kind:'word', want:'def' },
    'froh':
      { en:'glad / happy',
        ru:'рад',
        img:0, kind:'word', want:'def' },
    'hinaus in die Nacht':
      { en:'out into the night',
        ru:'выйти в ночь',
        img:0, kind:'phrase', want:'def' },
    'bereit für den Spaß':
      { en:'ready to have fun',
        ru:'готов веселиться',
        img:0, kind:'phrase', want:'def' },
    'die Schlüssel nehmen':
      { en:'to take the keys',
        ru:'брать ключи',
        img:0, kind:'phrase', want:'def' },
    'zur Tür gehen':
      { en:'to head for the door',
        ru:'идти к двери',
        img:0, kind:'phrase', want:'def' },
    'noch fünf Minuten':
      { en:'five more minutes',
        ru:'ещё пять минут',
        img:0, kind:'phrase', want:'def' },
    'warten und warten':
      { en:'waiting and waiting',
        ru:'ждать и ждать',
        img:0, kind:'phrase', want:'def' },
    'ihr letztes Licht in den Himmel brennen':
      { en:'to burn its last light into the sky',
        ru:'сжигать свой последний свет в небе',
        img:0, kind:'phrase', want:'def' },
    'aus der Dämmerung herabscheinen':
      { en:'to shine down from the twilight',
        ru:'сиять с высоты сквозь сумерки',
        img:0, kind:'phrase', want:'def' },
    'nach mir rufen':
      { en:'to call out to me',
        ru:'звать меня',
        img:0, kind:'phrase', want:'def' },
    'Jacke an, Schuhe zu':
      { en:'jacket on, shoes tied',
        ru:'куртка надета, шнурки завязаны',
        img:0, kind:'phrase', want:'def' },
    'Schlüssel in der Hand':
      { en:'keys in my hand',
        ru:'ключи в руке',
        img:0, kind:'phrase', want:'def' },
    'vorm Spiegel stehen':
      { en:'to stand at the mirror',
        ru:'стоять у зеркала',
        img:0, kind:'phrase', want:'def' },
    'ihr Haar richten':
      { en:'to fix her hair',
        ru:'поправлять волосы',
        img:0, kind:'phrase', want:'def' },
    'wie ein Depp herumstehen':
      { en:'to stand around like a chump',
        ru:'торчать как дурак',
        img:0, kind:'phrase', want:'def' },
    'wie ein langsam brennendes Fieber':
      { en:'like a slow-burning fever',
        ru:'как медленно разгорающаяся лихорадка',
        img:0, kind:'phrase', want:'def' },
    'verdammt heiß aussehen':
      { en:'to look damn hot',
        ru:'выглядеть чертовски горячо',
        img:0, kind:'phrase', want:'def' },
    'so manchen Kopf verdrehen':
      { en:'to turn quite a few heads',
        ru:'вскружить не одну голову',
        img:0, kind:'phrase', want:'def' },
    'Die Minuten kriechen vorbei':
      { en:'The minutes crawl past',
        ru:'Минуты медленно ползут',
        img:0, kind:'phrase', want:'def' },
    'wie ein Fiebertraum':
      { en:'like a fever dream',
        ru:'как горячечный сон',
        img:0, kind:'phrase', want:'def' },
    'in Schleife laufen':
      { en:'to keep looping',
        ru:'повторяться по кругу',
        img:0, kind:'phrase', want:'def' },
    'sich weiterdrehen':
      { en:'to keep turning',
        ru:'продолжать крутиться',
        img:0, kind:'phrase', want:'def' },
    'das Warten wert sein':
      { en:'to be worth the wait',
        ru:'стоить ожидания',
        img:0, kind:'phrase', want:'def' },
    'in ihrer ganzen Schönheit':
      { en:'in all her beauty',
        ru:'во всей её красе',
        img:0, kind:'phrase', want:'def' },
    'froh sein, gewartet zu haben':
      { en:'to be glad one waited',
        ru:'быть рад, что дождался',
        img:0, kind:'phrase', want:'def' },
    'der Spaß':
      { en:'fun',
        ru:'веселье',
        img:0, kind:'word', want:'def' },
    'gelingen':
      { en:'to succeed / turn out right',
        ru:'удаваться',
        img:0, kind:'word', want:'def' },
    'mühelos':
      { en:'effortless',
        ru:'без усилий',
        img:0, kind:'word', want:'def' },
    'der Brand':
      { en:'fire / blaze',
        ru:'пожар / огонь',
        img:0, kind:'word', want:'def' },
    'leuchten':
      { en:'to shine / glow',
        ru:'сиять',
        img:0, kind:'word', want:'def' },
    'rufen':
      { en:'to call',
        ru:'звать',
        img:0, kind:'word', want:'def' },
    'der Diamantring':
      { en:'diamond ring',
        ru:'кольцо с бриллиантом',
        img:0, kind:'word', want:'def' },
    'fast bereit sein':
      { en:'to be almost ready',
        ru:'быть почти готовой',
        img:0, kind:'phrase', want:'def' },
    'Dieser Look muss mir gelingen':
      { en:'I have to nail this look',
        ru:'я должна довести этот образ до совершенства',
        img:0, kind:'phrase', want:'def' },
    'noch fünf Minuten brauchen':
      { en:'to need five more minutes',
        ru:'нужно ещё пять минут',
        img:0, kind:'phrase', want:'def' },
    'die Welt in Brand setzen':
      { en:'to set the world on fire',
        ru:'поджечь этот мир',
        img:0, kind:'phrase', want:'def' },
    'die Sterne zum Leuchten bringen':
      { en:'to make the stars shine',
        ru:'заставить звёзды сиять',
        img:0, kind:'phrase', want:'def' },
    'die Schuhe passen dazu':
      { en:'the shoes match it',
        ru:'туфли подходят к этому',
        img:0, kind:'phrase', want:'def' },
    'die Haare hinkriegen':
      { en:'to get one\'s hair right',
        ru:'привести волосы в порядок',
        img:0, kind:'phrase', want:'def' },
    'wie ein Diamantring aussehen':
      { en:'to look like a diamond ring',
        ru:'выглядеть как кольцо с бриллиантом',
        img:0, kind:'phrase', want:'def' },
    'alle Hälse nach mir drehen sehen':
      { en:'to see every neck turn toward me',
        ru:'увидеть, как все шеи повернутся мне вслед',
        img:0, kind:'phrase', want:'def' },
    'fast so weit sein':
      { en:'to be almost ready / almost there',
        ru:'быть почти готовой',
        img:0, kind:'phrase', want:'def' },
    'etwas mit diesen Haaren machen':
      { en:'to do something about this hair',
        ru:'что-то сделать с этими волосами',
        img:0, kind:'phrase', want:'def' },
    'jemanden warten lassen':
      { en:'to keep someone waiting',
        ru:'заставить кого-то ждать',
        img:0, kind:'phrase', want:'def' },
    'tief im Innern':
      { en:'deep down',
        ru:'в глубине души',
        img:0, kind:'phrase', want:'def' },
    'Auf mich zu warten lohnt sich':
      { en:'I\'m worth waiting for',
        ru:'меня стоит ждать',
        img:0, kind:'phrase', want:'def' },
    'sich nicht beschweren können':
      { en:'to have no right to complain',
        ru:'не иметь причин жаловаться',
        img:0, kind:'phrase', want:'def' },
    'jemanden fest in der Hand haben':
      { en:'to have someone in the palm of one\'s hand',
        ru:'крепко держать кого-то в своих руках',
        img:0, kind:'phrase', want:'def' },
    'wieder und wieder':
      { en:'again and again',
        ru:'снова и снова',
        img:0, kind:'phrase', want:'def' },
    'weitere fünf Minuten':
      { en:'another five minutes',
        ru:'ещё пять минут',
        img:0, kind:'phrase', want:'def' },
    'danach noch fünf Minuten':
      { en:'five more minutes after that',
        ru:'а потом ещё пять минут',
        img:0, kind:'phrase', want:'def' },
  },

  /* Keyed on the audio stem, the only stable identifier a song has: songs
     4 to 8 carry no `n` and songbook.js finds a song by its position in the
     array, so an index here would break the day a song is inserted. */
  songs: {

    'noch-fuenf-minuten': [
      'hinaus',
      'schick',
      'bereit',
      'warten',
      'die Dämmerung',
      'herab',
      'die Jacke',
      'der Spiegel',
      'richten',
      'das Haar',
      'der Depp',
      'das Fieber',
      'makellos',
      'der Kopf',
      'kriechen',
      'der Fiebertraum',
      'die Schleife',
      'beschweren',
      'die Schönheit',
      'froh',
      'hinaus in die Nacht',
      'bereit für den Spaß',
      'die Schlüssel nehmen',
      'zur Tür gehen',
      'noch fünf Minuten',
      'warten und warten',
      'ihr letztes Licht in den Himmel brennen',
      'aus der Dämmerung herabscheinen',
      'nach mir rufen',
      'Jacke an, Schuhe zu',
      'Schlüssel in der Hand',
      'vorm Spiegel stehen',
      'ihr Haar richten',
      'wie ein Depp herumstehen',
      'wie ein langsam brennendes Fieber',
      'verdammt heiß aussehen',
      'so manchen Kopf verdrehen',
      'Die Minuten kriechen vorbei',
      'wie ein Fiebertraum',
      'in Schleife laufen',
      'sich weiterdrehen',
      'das Warten wert sein',
      'in ihrer ganzen Schönheit',
      'froh sein, gewartet zu haben'
    ],
    'ihre-fuenf-minuten': [
      'hinaus',
      'die Nacht',
      'schick',
      'bereit',
      'der Spaß',
      'gelingen',
      'mühelos',
      'makellos',
      'die Zeit',
      'der Brand',
      'der Stern',
      'leuchten',
      'rufen',
      'das Kleid',
      'die Handtasche',
      'der Spiegel',
      'die Haare',
      'der Diamantring',
      'die Schönheit',
      'warten',
      'beschweren',
      'das Make-up',
      'hinaus in die Nacht',
      'fast bereit sein',
      'Dieser Look muss mir gelingen',
      'noch fünf Minuten brauchen',
      'die Welt in Brand setzen',
      'die Sterne zum Leuchten bringen',
      'nach mir rufen',
      'die Schuhe passen dazu',
      'die Haare hinkriegen',
      'wie ein Diamantring aussehen',
      'verdammt heiß aussehen',
      'alle Hälse nach mir drehen sehen',
      'fast so weit sein',
      'etwas mit diesen Haaren machen',
      'jemanden warten lassen',
      'tief im Innern',
      'Auf mich zu warten lohnt sich',
      'sich nicht beschweren können',
      'jemanden fest in der Hand haben',
      'wieder und wieder',
      'weitere fünf Minuten',
      'danach noch fünf Minuten'
    ],
    /* Unterwegs bei Sonne, unterwegs bei Regen · 35 words */
    'unterwegs-bei-sonne-unterwegs-bei-regen': [
      'unterwegs', 'das Wetter', 'der Zug', 'die Straßenbahn',
      'das Geschäft', 'das Krankenhaus', 'der Sonnenschein', 'herab',
      'das Sonnenlicht', 'malen', 'die Freude', 'erfüllen', 'reisen',
      'der Spritzer', 'nass', 'angenehm', 'die Haut', 'weich', 'die Wärme',
      'die Kälte', 'trocken', 'frisch', 'der Wind', 'der Duft', 'riechen',
      'die Aufgabe', 'die Energie', 'erschöpft', 'müde', 'wehtun',
      'das Leben', 'der Ort', 'heiß', 'der Abend', 'der Platz',
    ],

    /* Das Bett sieht so schön aus · 32 words */
    'das-bett-sieht-so-schoen-aus': [
      'der Vormittag', 'verschlafen', 'aufwachen', 'hereinlassen',
      'ausruhen', 'ausschalten', 'gähnen', 'strecken', 'weiterschlafen',
      'aufstehen', 'der Spiegel', 'die Mascara', 'der Lippenstift',
      'das Parfüm', 'die Gesichtscreme', 'auftragen', 'benutzen', 'bürsten',
      'losmüssen', 'zubereiten', 'frühstücken', 'die Tasse', 'die Schüssel',
      'die Gabel', 'der Schlüssel', 'vergehen', 'erhoben', 'feuerrot',
      'bereit', 'schnappen', 'die Handtasche', 'gemein',
    ],

    /* Mein wunderbarer bester Freund · 73 words */
    'mein-wunderbarer-bester-freund': [
      'der Termin', 'zu spät sein', 'der BH', 'der BH-Träger',
      'die Schulter', 'wehtun', 'der Schuh', 'der Riemen', 'locker',
      'das Pfefferminzbonbon', 'ausgehen', 'unbequem', 'müde',
      'den Kopf hochhalten', 'warten auf', 'treu', 'der beste Freund',
      'das Bett', 'weich', 'warm', 'jemanden vermissen',
      'nach Hause wollen', 'die Schlange', 'in der Schlange stehen',
      'der Kaffee', 'bestellen', 'endlich', 'der Sieg', 'ankommen',
      'lecker', 'das Lächeln', 'nirgendwo', 'sitzen',
      'das Schokoladencroissant', 'ausverkauft sein', 'die Mandel',
      'der Zug', 'voll', 'überfüllt', 'der Körper', 'zwischen', 'duschen',
      'der kleine Hund', 'das Bein', 'die Haltestelle',
      'noch drei Haltestellen', 'aussteigen', 'frische Luft', 'atmen',
      'halb besiegt', 'der Hunger', 'hungrig', 'die Energie',
      'das Abendessen', 'der Apfel', 'nach etwas greifen', 'zu viel Arbeit',
      'sich wiedersehen', 'den ganzen Tag', 'die Schlafzimmertür', 'öffnen',
      'das Bett machen', 'schlecht behandeln', 'die Umarmung',
      'jemanden umarmen', 'sanft', 'freundlich', 'flüstern', 'nie wieder',
      'jemanden verlassen', 'der Wecker', 'der Müll',
      'etwas in den Müll werfen',
    ],

    /* Dein Körper braucht Liebe · 50 words */
    'dein-koerper-braucht-liebe': [
      'der Körper', 'sich bewegen', 'der Rhythmus', 'tanzen', 'jucken',
      'kratzen', 'sacht', 'blinzeln', 'das Auge', 'hell', 'werfen', 'stark',
      'wehen', 'verschränken', 'der Arm', 'der Finger', 'der Himmel',
      'wippen', 'der Fuß', 'klatschen', 'wackeln', 'der Rücken', 'lauschen',
      'das Ohr', 'das Geräusch', 'lackieren', 'der Fingernagel', 'rosa',
      'sauber', 'eincremen', 'die Haut', 'der Zahn', 'lächeln', 'der Teil',
      'tragen', 'der Schritt', 'der Schnee', 'langsam', 'egal', 'die Nase',
      'strecken', 'das Bein', 'der Krampf', 'reiben', 'der Bauch',
      'der Hunger', 'der Kopf', 'die Kopfschmerzen', 'besonders',
      'das Geschenk',
    ],

    /* Der kleine Ninja · 31 words */
    'der-kleine-ninja': [
      'der Traum', 'scheinen', 'der Weg', 'später', 'einreden', 'heiser',
      'der Bleistift', 'das Papier', 'zuhören', 'verstehen', 'lächeln',
      'sogar', 'mitmachen', 'verschieden', 'der Anwalt', 'der Schauspieler',
      'der Bäcker', 'der Klempner', 'der Rennfahrer', 'der Gedanke',
      'klettern', 'die Wand', 'der Schatten', 'der Gang', 'springen',
      'verstecken', 'bewegen', 'woanders', 'versagen', 'die Meinung',
      'umstimmen',
    ],

    /* Das Lied zweier Herzen · 88 words */
    'das-lied-zweier-herzen': [
      'dunkel', 'das Zimmer', 'friedlich', 'erschöpft', 'die Reise',
      'die Trennung', 'verschwinden', 'leise', 'der Schein', 'das Licht',
      'das Fenster', 'der Blumenstrauß', 'mitbringen', 'die Kraft',
      'das Herz', 'der Koffer', 'auspacken', 'der Schlaf', 'umarmen',
      'der Schmerz', 'zurückbringen', 'verstehen', 'das Wort', 'die Seele',
      'das Auge', 'direkt', 'die Kiefer', 'wachsen', 'der Himmel',
      'die Morgensonne', 'der Fluss', 'golden', 'das Wasser', 'scheinen',
      'der Wasserpark', 'der Tropfen', 'fangen', 'steinern', 'die Kirche',
      'die Kerze', 'der Traum', 'der Berg', 'der Zug', 'pfeifen',
      'forttragen', 'nachwinken', 'die Träne', 'verbergen', 'der Abschied',
      'Abschied nehmen', 'der Schnee', 'der Frost', 'die Spur', 'das Tal',
      'der Sonnenuntergang', 'lebendig', 'glitzern', 'die Wimper',
      'die Kälte', 'der Wind', 'flüstern', 'das Glück', 'stärker',
      'fürchten', 'der Krieg', 'die Angst', 'überleben', 'die Zärtlichkeit',
      'die Antwort', 'der Anfang', 'sich erinnern', 'bewahren', 'die Wärme',
      'der Schritt', 'der Stein', 'der Frühling', 'finden', 'der Stern',
      'das Dach', 'der Blick', 'verbinden', 'aufblühen', 'der Platz',
      'nach vorn schauen', 'die Stadt', 'der Ton', 'gemeinsam',
      'weiterleben',
    ],

    /* Für Tanusha · 46 words */
    'fuer-tanusha': [
      'das Sternenlicht', 'funkeln', 'der Traum', 'hell', 'der Schein',
      'der Mond', 'schweben', 'geschlossen', 'das Lid', 'atmen',
      'die Nacht', 'leise', 'die Sorge', 'der Tag', 'davonziehen',
      'langsam', 'sanft', 'der Rhythmus', 'der Atem', 'ein und aus',
      'die Brust', 'sich heben', 'sich senken', 'erwachen', 'die Welt',
      'tausend', 'der Stern', 'die Dunkelheit', 'schmelzen', 'das Herz',
      'das Wort', 'der Platz', 'einnehmen', 'das Juwel', 'das Licht',
      'die Stille', 'hinein', 'der Diamant', 'der Himmel', 'silberblau',
      'der Mondstrahl', 'die Wolke', 'fallen', 'das Gesicht', 'der Engel',
      'schlafen',
    ],

    /* Hafermilch-Cappuccino in unserem Café · 48 words */
    'hafermilch-cappuccino-in-unserem-cafe': [
      'die Wärme', 'die Nähe', 'das Labyrinth', 'das Herz', 'das Gesicht',
      'die Liebe', 'der Ort', 'die Tasse', 'das Licht', 'der Augenblick',
      'verschwinden', 'das Café', 'der Regen', 'die Hafermilch', 'zusammen',
      'ewig', 'die Stimme', 'der Klang', 'das Wort', 'die Lücke',
      'die Brücke', 'die Spur', 'das Fenster', 'vergehen',
      'der Sonnenschein', 'übrig', 'verlassen', 'fliegen',
      'das Zusammensein', 'das Gefühl', 'die Erinnerung', 'der Koffer',
      'die Sorgfalt', 'packen', 'der Bahnhof', 'die Brust', 'festhalten',
      'verschwimmen', 'die Fensterscheibe', 'der Himmel', 'der Fernsehturm',
      'der Blumenladen', 'die Pizzeria', 'das Eis', 'laufen',
      'das Pflaster', 'der Fuß', 'der Teil',
    ],

    /* Ich bin ein Berliner – Teil 2 · 74 words */
    'ich-bin-ein-berliner-part-2': [
      'die Stunde', 'die Mauer', 'sich erheben', 'den Atem anhalten',
      'die Stimme', 'das Herz', 'das Symbol', 'die Geburt',
      'das Versprechen', 'die Freiheit', 'einstehen für', 'der Schmerz',
      'flüstern', 'trennen', 'der Krieg', 'der Weg', 'sich entscheiden',
      'die Liebe', 'sich treffen', 'der Bildschirm', 'der Sommer',
      'der Bahnhof', 'das Lächeln', 'das Auge', 'ansehen', 'der Traum',
      'zurückkehren', 'der Januar', 'der Schnee', 'strahlen', 'das Kleid',
      'anprobieren', 'die Kälte', 'der Schal', 'der Mantel', 'das Eis',
      'die Schokolade', 'teilen', 'die Stille', 'die Pandemie', 'beginnen',
      'brennen', 'der Winter', 'getrennt', 'die Bergluft', 'der Bart',
      'der Abschied', 'der Zug', 'der Bahnsteig', 'die Zeichnung',
      'das Kind', 'mutig', 'der Umriss', 'ungeteilt', 'die Angst',
      'der Hass', 'das Land', 'das Gebet', 'die Flamme', 'die Trauer',
      'die Freude', 'der Sohn', 'die Klinik', 'die Hand', 'zerbrechlich',
      'kämpfen', 'der Himmel', 'der Bus', 'das Auto', 'der Besuch',
      'die Entfernung', 'überqueren', 'der Ozean', 'die Seele',
    ],
  }

};
