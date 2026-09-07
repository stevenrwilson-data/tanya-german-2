/* data/quests-data.js */
/* Steven's naming convention for anything in data/: the name says where
   it lives. "If something goes in data, you can put dash data after it —
   fast-data.js. That also makes it very obvious where I put that file."

   It settles a second thing for free. `js/questday.js` is the engine, and
   it is called that because two files with one name in different folders
   is banned in this project — it has broken the site twice. With the
   `-data` suffix that collision cannot happen, so a future engine could
   simply be `js/quests.js`. The existing forty-odd files in data/ do NOT
   follow this convention yet; renaming them is a job for after the push,
   since every one is referenced by index.html and by audit.sh. */
/* THE DAILY CRYSTAL QUESTS — the pool they are drawn from.

   Steven: "We can create three or four daily Crystal quests and you can
   earn extra points for doing those. Say five points each for individual
   quests and an extra 10 point bonus for doing all of them! We can have
   it randomly select among site activities."

   Three are drawn each day. The numbers live in js/quests.js as
   constants, not here — this file is WHAT can be asked, not what it pays.

   ------------------------------------------------------------------
   EVERY QUEST IS ONE ROUND OF ONE THING

   No quest asks for two of anything, and none asks for a score. Steven:
   "I don't want certain quests to be too hard." A quest that can be
   failed is a quest that punishes her for opening it, and five crystals
   is not worth that. Finish it and it is done, whatever the percentage.

   ------------------------------------------------------------------
   `act` IS THE ID award() IS CALLED WITH, NOT THE TILE'S ID

   These have to match the first argument of `GH.coins.award()` at the
   activity's own end screen, which is NOT always its registration id —
   the plural game registers as `mehrzahl` and awards as `plural`, the
   scramble registers as `scramble` and awards as `wordorder`. Every
   value below was read out of the award call itself rather than from the
   tile.

   ------------------------------------------------------------------
   THE RULE, IN HIS WORDS

   "Literally anything that's not too hard that you can earn points on
   should be able to be a Crystal quest. As long as there's a way to track
   to the point where you finish something, see an end screen and get
   crystals, that should count. The only thing I want to exclude is
   content that's too hard for beginner content."

   So the pool is EVERY activity that pays, and the fence is only on the
   hard parts of the two activities that have easy and hard parts. Checked
   by command against every `coins.award()` and `coins.awardPart()` call
   in the app: nothing that pays is missing from this file.

   `hard:true` is the other half of it — "I wouldn't mind allowing that to
   be a quest after you reach a certain level." Those rows are written and
   translated and the engine does not draw them, so when there is a level
   to test they become eligible by deleting a flag rather than by writing
   new content. There is no level system today and this file does not
   pretend there is one.

   ------------------------------------------------------------------
   `only` IS THE DIFFICULTY FENCE, AND IT IS WHY TWO OF THESE ARE SAFE

   Steven: "Exclude anything labeled B1 or higher on the reader. In fact
   only the small short stories on the reader should ever be eligible and
   only the first 3 stages for word lab."

   An activity that has easy and hard parts cannot be quested as a whole,
   so those two pass a `tag` when they finish and the quest lists the tags
   it accepts:

     reader    tag is the TIER id — 'short', 'medium', 'poem', 'article'.
               Only 'short' is listed. That also settles the B1 question
               without needing to read levels: every B1 piece in the app
               is an article or the long Kitchen Wars, and neither tier is
               eligible.
     wordlab   tag is 's' plus the stage index, zero-based. 's0', 's1',
               's2' are the first three — word and meaning, word in a
               sentence, listening. Typing, the story stages, word order
               and both bonus stages are excluded.

   A quest with no `only` accepts any tag, which is every other entry
   here.

   ------------------------------------------------------------------
   ADDING ONE

   A row, and nothing else. `js/quests.js` reads this file and knows
   nothing about any particular activity. A quest whose `act` never fires
   simply never completes, which is why the ids above were checked rather
   than assumed.

   `label` is what she reads. de and ru are Steven's to write; the engine
   falls back to English until then.
*/

/* A QUEST LABEL USES THE TILE'S NAME, NOT ITS OWN.

   Steven caught this: the quest for the placement game said „Wo ist es?“
   / «Где это?» while the tile on the hub says `Wo steht was` / «Где что
   стоит». A quest is an instruction to go and find something, so naming
   it anything other than what is written on the thing she is looking for
   makes it a riddle. Four were out of step — placement, catch-word,
   listen-and-pick and wrong-form — and the placement one was unfindable
   in Russian.

   So a label that names a game quotes `xxTitle` from js/i18n.js exactly.
   If a game is ever renamed, its quest label has to move with it; there
   is no mechanism enforcing that, which is why it is written here. */
window.GH_QUESTS = [

  /* ---------- reading and listening ---------- */

  { id:'q-short', act:'reader', only:['short'],
    label:{ en:'Read a short story', de:'Eine Kurzgeschichte lesen', ru:'Прочитать короткий рассказ' } },

  { id:'q-listen', act:'listen',
    label:{ en:'Finish a round of Listen and pick', de:'Eine Runde „Hören und wählen“ abschließen', ru:'Завершить раунд «Слушай и выбирай»' } },

  { id:'q-speak', act:'listen-speak',
    label:{ en:'Practise your pronunciation', de:'Deine Aussprache üben', ru:'Потренировать произношение' } },

  /* ---------- vocabulary ---------- */

  { id:'q-vocab', act:'vocab',
    label:{ en:'Finish a set of words', de:'Eine Wortgruppe abschließen', ru:'Завершить набор слов' } },

  { id:'q-catch', act:'catchword',
    label:{ en:'Play Catch the word', de:'„Wörter fangen“ spielen', ru:'Сыграть в «Поймай слово»' } },

  { id:'q-match', act:'wordmatch',
    label:{ en:'Finish a round of Word Matching', de:'Eine Runde „Wörter zuordnen“ abschließen', ru:'Завершить раунд «Слова парами»' } },

  /* ---------- the course words, easy stages only ---------- */

  { id:'q-lab', act:'wordlab', only:['s0', 's1', 's2'],
    label:{ en:'Finish an early stage of Word Lab', de:'Eine frühe Stufe im Wortlabor abschließen', ru:'Завершить начальный этап «Лаборатории слов»' } },

  /* ---------- grammar drills ---------- */

  { id:'q-gender', act:'gender',
    label:{ en:'Play der, die, das', de:'„der, die, das“ spielen', ru:'Сыграть в «der, die, das»' } },

  { id:'q-plural', act:'plural',
    label:{ en:'Play the plural game', de:'„Mehrzahl“ spielen', ru:'Сыграть в «Множественное число»' } },

  { id:'q-conj', act:'conjugate',
    label:{ en:'Play Which form?', de:'„Welche Form?“ spielen', ru:'Сыграть в «Какая форма?»' } },

  { id:'q-case', act:'case',
    label:{ en:'Play wo oder wohin?', de:'„Wo oder wohin?“ spielen', ru:'Сыграть в «Где или куда?»' } },

  { id:'q-wrong', act:'wrongform',
    label:{ en:'Play Wrong form', de:'„Falsche Form“ spielen', ru:'Сыграть в «Найди ошибку»' } },

  /* ---------- sentences ---------- */

  { id:'q-blank', act:'fillblank',
    label:{ en:'Fill in a missing word', de:'Ein fehlendes Wort einsetzen', ru:'Вставить пропущенное слово' } },

  { id:'q-order', act:'wordorder',
    label:{ en:'Build a sentence', de:'Einen Satz bilden', ru:'Составить предложение' } },

  { id:'q-guess', act:'guess-who',
    label:{ en:'Play Who is it?', de:'„Wer ist es?“ spielen', ru:'Сыграть в «Кто это?»' } },

  { id:'q-conveyor', act:'conveyor',
    label:{ en:'Sort sentences by tense', de:'Sätze nach Zeitform sortieren', ru:'Рассортировать предложения по временам' } },

  { id:'q-place', act:'placement',
    label:{ en:'Play Where is it?', de:'„Wo steht was“ spielen', ru:'Сыграть в «Где что стоит»' } },

  /* ---------- a grammar LESSON, not the reference page ----------

     Steven: "grammar lessons/practice rather than merely opening the
     Grammar reference" and "It never becomes 'visit three pages for free
     crystals'."

     `pre` and not `act`, because a lesson pays as `lesson:haben-sein` —
     the id is in the game name, so no fixed string matches and a quest
     for the family has to match the prefix. The Grammar REFERENCE pays
     nothing at all, so it cannot complete this or anything else: opening
     a page is not an activity and the economy already agrees. */
  { id:'q-lesson', pre:'lesson:', act:'lesson',
    label:{ en:'Finish a grammar lesson', de:'Eine Grammatiklektion abschließen', ru:'Завершить урок грамматики' } },

  /* ---------- a comic unit ----------

     Pays through awardPart() rather than award() — see the hook in
     coins.js. A unit is ten comics, so this is the longest quest in the
     pool by some distance; it is here because Steven listed it and
     because a unit part-finished carries over, so it is never wasted
     work. */
  { id:'q-comic', act:'comic',
    label:{ en:'Finish a comic unit', de:'Eine Comic-Einheit abschließen', ru:'Завершить часть комикса' } },

  /* ---------- the three that pay and had no quest ----------

     Found by command rather than by memory: every `coins.award()` and
     `coins.awardPart()` id in the app, checked against this file. These
     three were the gap.

     `tanya-words` is deliberately NOT here. It pays, but the activity was
     deleted on 03 Sep — the file is out of index.html and out of the
     manifest and only the award id survives in a dead file. A quest for
     something she cannot open would never complete. */

  /* TWO, not one. Listening to a dialogue pays 5 and HALF a daily task —
     `awardPart('dialogue', 5, 2)` — so one listen is half the work every
     other quest here asks for. Steven: "stuff that earns 5 pts counts as
     a daily task after you do 2. So the crystal quests should require 2."
     The only row in this file that needs it; songs pay 10 and comic units
     20, both whole tasks. */
  { id:'q-dialogue', act:'dialogue', need:2,
    label:{ en:'Listen to two dialogues', de:'Zwei Dialoge anhören', ru:'Прослушать два диалога' } },

  { id:'q-song', act:'song',
    label:{ en:'Listen to a song', de:'Ein Lied anhören', ru:'Прослушать песню' } },

  /* ---------- WRITTEN, TRANSLATED, AND NOT DRAWN YET ----------

     `hard:true`, so the engine skips them. Steven: "I wouldn't mind
     allowing that to be a quest after you reach a certain level."

     They exist now so that turning them on later is deleting a flag, not
     writing content — and so the fence is visible in one place rather
     than being an absence somebody has to notice. */

  { id:'q-read-medium', act:'reader', only:['medium'], hard:true,
    label:{ en:'Read a longer story', de:'Eine längere Geschichte lesen', ru:'Прочитать более длинный рассказ' } },

  { id:'q-read-poem', act:'reader', only:['poem'], hard:true,
    label:{ en:'Read a poem', de:'Ein Gedicht lesen', ru:'Прочитать стихотворение' } },

  { id:'q-read-article', act:'reader', only:['article'], hard:true,
    label:{ en:'Read an article', de:'Einen Artikel lesen', ru:'Прочитать статью' } },

  { id:'q-lab-late', act:'wordlab', only:['s3','s4','s5','s6'], hard:true,
    label:{ en:'Finish a later stage of Word Lab', de:'Eine spätere Stufe im Wortlabor abschließen', ru:'Завершить более поздний этап «Лаборатории слов»' } },

  { id:'q-lab-bonus', act:'wordlab', only:['s7','s8'], hard:true,
    label:{ en:'Finish a Word Lab bonus stage', de:'Eine Bonusstufe im Wortlabor abschließen', ru:'Завершить бонусный этап «Лаборатории слов»' } }

];
