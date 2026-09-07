/* js/activities/wordlab.js */
/* WORD LAB — the thirty course words of kap16, kap17 and kap18.

   Seven stages and two bonus stages. Every stage is one to three rounds,
   and every STAGE scores — once, when its last round ends.

     1  word and meaning        learn · match with color · match without
     2  word in a sentence      learn · match with color · match without
     3  listening               heard word to meaning · heard word to sentence
     4  typing                  copy it · from memory
     5  story blanks            tap it in · type it shown
     6  story from memory       type it shown · type it unshown
     7  word order              see it then rebuild · rebuild it unseen
     B1 bonus, type a sentence  one round, worth double
     B2 bonus, type it broken    words shown · nothing shown

   ------------------------------------------------------------------
   PROGRESSIVE REMOVAL IS THE WHOLE DESIGN

   Same material, three rungs: everything visible and nothing asked, then
   the pairing visible as color while she still has to act, then from
   memory. Round 2 of a matching stage can be finished with no German at
   all — she matches green to green. That is what a scaffold is. Its job is
   to make her look at each pair once more WHILE PERFORMING the pairing, so
   round 3 has something to retrieve.

   And the same shape governs every typed round in here: SEE IT AND COPY IT
   FIRST. Stage 4 types the word while looking at it before it types it
   from memory; stage 6 repeats stage 5's typing round before removing the
   word. Steven's rule, and it holds app-wide — no typed recall anywhere
   without a copy pass in front of it.

   ------------------------------------------------------------------
   THE STAGE PAYS, NOT THE ROUND

   Ten points and one daily activity per STAGE, paid once when its last
   round ends. Twenty and two for a bonus stage.

   A round is not the unit of work — the rungs of one stage are one
   exercise taken three times with a support removed each time, and paying
   each rung separately would make the three-round stages worth three
   times a two-round one for no extra learning. It would also pay her
   twice for the color round, which can be finished with no German at
   all.

   Every round still ends on its own screen with its own percentage and a
   button onward, because chaining silently gives her no place to stop.
   The screens between rounds simply do not pay.

   The percentage on the last screen is the WHOLE STAGE, not that round —
   it is the stage being scored, so it is the stage being reported.

   The score is RIGHT over RIGHT PLUS WRONG, not (words - wrong) / words.
   The second one GOES NEGATIVE as soon as she has more wrong answers than
   there are words, which is easily reached because a miss requeues rather
   than ending the round: eight words and twelve misses returns -50%.
   Steven's formula cannot go below zero and still falls as the misses pile
   up, which is what a score is for.

   Mechanically that means every ATTEMPT is passed to run.saw() under its
   own id. run.saw() dedupes by id on purpose — a retry is not a second
   answer, for a game where the item is the unit. Here the answer is the
   unit, so the id carries the attempt number.

   ------------------------------------------------------------------
   WHAT THIS FILE DOES NOT WRITE

   Every string on screen comes from i18n.js, and all of them already
   existed: back, listen, listenAgain, check, next, finish, skip, progress,
   right, correct, notQuite, answerWas, closeSpelling, doneTitle, again,
   toHub. Nothing German or Russian was drafted here.

   The one exception is the block directly below — the tile name and the
   six stage names. They are STEVEN'S TO WRITE. English is filled in so the
   screen is never blank; German and Russian are empty and fall back to it.
   Roughly fourteen short strings, and they are the only thing between this
   file and being finished. Same arrangement as data/butler-script.js.

   ------------------------------------------------------------------
   READS

   window.GH_WORDLAB     the thirty words, their definitions and their
                         gapped sentences
   window.GH_GAPSTORIES  the stories, for stages 5 and 6

   Neither present, no tile — app.js checks. */

window.GH = window.GH || {};

GH.wordlab = (function(){

  /* ================================================================
     STEVEN'S STRINGS. The German and the Russian are not mine to write.
     ================================================================ */

  var NAME = { en:'Word Lab', de:'Wortlabor', ru:'Лаборатория слов' };
  var SUB  = { en:'Learn new words step by step — from meaning and examples to listening, recall, and use in context.', de:'Lerne neue Wörter Schritt für Schritt — von Bedeutung und Beispielen bis hin zu Hören, Erinnern und Verwenden im Kontext.', ru:'Учи новые слова шаг за шагом — от значения и примеров до восприятия на слух, запоминания и употребления в контексте.' };

  /* WHICH WORDS THESE ARE. Steven: "I need to let Tanya know that's where
     I put the lessons for her new words."

     `SUB` used to say "Chapters 16-18 . thirty words" and now says what
     the lesson DOES, which is the right thing on a tile she has never
     tapped. But it no longer says whose words are in it, and she has to
     know that to know this is her coursework rather than a general
     vocabulary drill.

     So it moves inside, onto the stage list — the screen she lands on,
     where the question is "is this the right lesson" rather than "what is
     this". Shown once, above the stages.

     THIS IS THE FIELD THE HUB WILL NEED. When Word Lab becomes several
     lessons over several word sets, this is the line each of them names
     its own set with; kap16-18 stops being the only answer and this stops
     being a constant. */
  var SET_NAME = { en:'Chapters 16–18 · thirty words', de:'Kapitel 16–18 · dreißig Wörter', ru:'Главы 16–18 · тридцать слов' };

  /* What opens when she taps the guide card. Steven's text.

     The guide screen's own subtitle is "A line on each. Tap one for
     more", and until now Word Lab had no more: the expander only appears
     for an activity with rules 2 and up, and a lesson has no rules. So
     `SUB` above is the line, on the hub tile and on the guide card both,
     and this is the "more".

     Read by gameguide.js as `a.detailHead` / `a.detail`. */
  var DETAIL_HEAD = { en:'How Word Lab works', de:'So funktioniert das Wortlabor', ru:'Как работает лаборатория слов' };
  var DETAIL = { en:'Word Lab teaches a small group of words through several stages. You begin with meanings and examples, then gradually lose the hints as you match, listen, type, and use the words in sentences and short stories. If you struggle, extra help is available along the way.',
                 de:'Word Lab bringt dir eine kleine Gruppe von Wörtern in mehreren Stufen bei. Du beginnst mit Bedeutungen und Beispielen. Danach werden die Hilfen nach und nach reduziert, während du Wörter zuordnest, hörst, eintippst und in Sätzen und kurzen Geschichten verwendest. Wenn etwas schwierig ist, bekommst du unterwegs zusätzliche Hilfe.',
                 ru:'Word Lab помогает выучить небольшую группу слов за несколько этапов. Сначала ты знакомишься со значениями и примерами, затем подсказок становится всё меньше: ты сопоставляешь слова, слушаешь их, вводишь их и используешь в предложениях и коротких историях. Если что-то оказывается трудным, по ходу работы можно получить дополнительную помощь.' };

  var STAGE_NAME = [
    { en:'Word and meaning',      de:'Wort und Bedeutung', ru:'Слово и значение' },
    { en:'Word in a sentence',    de:'Wort im Satz', ru:'Слово в предложении' },
    { en:'Listening',             de:'Hören', ru:'Аудирование' },
    { en:'Typing',                de:'Tippen', ru:'Ввод текста' },
    { en:'Story blanks',          de:'Lücken im Text', ru:'Пропуски в тексте' },
    { en:'Story from memory',     de:'Text aus dem Gedächtnis', ru:'Текст по памяти' },
    { en:'Word order',            de:'Wortstellung', ru:'Порядок слов' },
    { en:'Bonus — type the sentence', de:'Bonus — Satz tippen', ru:'Бонус — напечатай предложение' },
    { en:'Bonus — type it broken',     de:'Bonus — Satz in Teilen tippen', ru:'Бонус — напечатай его по частям' }
  ];

  /* The categories she picks from on the way into a stage. `all` draws
     eight at random from the whole thirty. */
  var CATEGORY = [
    { kind:'noun',    en:'Nouns',                  de:'Substantive', ru:'Существительные' },
    { kind:'verb',    en:'Verbs',                  de:'Verben', ru:'Глаголы' },
    { kind:'vphrase', en:'Phrases and adjectives', de:'Wendungen und Adjektive', ru:'Фразы и прилагательные' },
    { kind:'adv',     en:'Adverbs',                de:'Adverbien', ru:'Наречия' },
    { kind:'all',     en:'All of them',            de:'Alle', ru:'Все' }
  ];

  var ROUND_NAME = [
    { en:'Learn',              de:'Lernen', ru:'Изучение' },
    { en:'Match, with color',  de:'Zuordnen, mit Farbe', ru:'Сопоставление, с цветом' },
    { en:'Match, no color',    de:'Zuordnen, ohne Farbe', ru:'Сопоставление, без цвета' },
    { en:'Copy it',            de:'Abschreiben', ru:'Перепиши' },
    { en:'From memory',        de:'Aus dem Gedächtnis', ru:'По памяти' },
    { en:'See it, then rebuild', de:'Ansehen, dann wieder zusammensetzen', ru:'Посмотри, затем восстанови' },
    { en:'Rebuild it unseen',    de:'Ohne Vorlage zusammensetzen', ru:'Восстанови без подсказки' },
    { en:'Copy the sentence',    de:'Satz abschreiben', ru:'Перепиши предложение' },
    { en:'See the words, type it', de:'Wörter ansehen, dann tippen', ru:'Посмотри на слова, затем напечатай' },
    { en:'Nothing shown',        de:'Nichts wird angezeigt', ru:'Ничего не показано' },
    /* THE LISTENING ROUNDS HAD NO NAMES OF THEIR OWN.

       paintListen() was reaching for indexes 1 and 2 — `Match, with color`
       and `Match, no color` — which describe the board in stages 1 and 2.
       Steven: "There's no color matching going on here whatsoever. You
       can't even see the word it's just audio."

       Exactly right, and the subtitle was describing a different exercise.
       The two listening rounds differ by what the CHOICES are: meanings in
       the first, the sentence with its gap in the second. */
    { en:'Heard word to meaning',  de:'Gehörtes Wort zur Bedeutung', ru:'Услышанное слово — к значению' },
    { en:'Heard word to sentence', de:'Gehörtes Wort zum Satz', ru:'Услышанное слово — к предложению' },
    /* THE SECOND PASS THROUGH THE WORDS THAT NEEDED THE HELP.

       Not a round of its own — see the note above startListen(). Stage 3
       has two rounds and both of them now have a second pass, so these are
       subtitles for the same two rounds running without the highlight. */
    { en:'Heard word to meaning — no help',  de:'Gehörtes Wort zur Bedeutung — ohne Hilfe', ru:'Услышанное слово — к значению, без помощи' },
    { en:'Heard word to sentence — no help', de:'Gehörtes Wort zum Satz — ohne Hilfe', ru:'Услышанное слово — к предложению, без помощи' }
  ];

  /* The line on the copy screen, telling her the word is coming back.

     Steven: "it should say you will get tested on the word again, so
     he/she knows to expect to re-hear the word." Without it the Continue
     button reads as "done with this one", which is the opposite of what
     happens — it goes to the back of the queue and she hears it again.

     Here rather than in i18n.js for the same reason STAGE_NAME and
     ROUND_NAME are here: it is this stage's own label, and the empty de
     and ru are what "Steven has not written it yet" looks like in this
     file. `pick()` falls back to the English until he does. */
  var COPY_AGAIN = { en:'Type it while you can see it. You will hear this word again later in the round.', de:'Tippe es, solange du es sehen kannst. Du wirst dieses Wort später in dieser Runde noch einmal hören.', ru:'Напечатай его, пока видишь его. Ты услышишь это слово ещё раз позже в этом раунде.' };

  /* The two audio buttons on a story round. Steven: "have it do two
     things — Say the word you need to type or read whole story without
     the word." Local, same as the labels above, de and ru his to write. */
  /* The word-set screen that now opens every story in the recall round.
     Steven, agreeing with GPT's read of the stage: "she needs to see the
     set of words for the story, with a button to show definitions. Then,
     after that, show the story with the blanks and just to fill them in."
     Local labels, de and ru his to write. */
  var SET_HEAD = { en:'The words for this story', de:'Die Wörter für diesen Text', ru:'Слова для этого текста' };
  var SET_NOTE = { en:'Learn these, then fill them into the story.', de:'Lerne diese Wörter und setze sie dann in den Text ein.', ru:'Выучи их, а затем вставь их в текст.' };
  var SET_DEFS = { en:'Definitions', de:'Definitionen', ru:'Определения' };

  var HEAR_WORD  = { en:'Hear the word',  de:'Wort anhören', ru:'Прослушать слово' };
  var HEAR_STORY = { en:'Hear the story without the word', de:'Text ohne das Wort anhören', ru:'Прослушать текст без слова' };

  /* ================================================================ */

  var PAY_UNITS = 1;      /* one daily task per STAGE */
  var BONUS_UNITS = 2;    /* a bonus stage is worth two, and so 20 points */
  var BONUS_TRIES = 2;    /* two goes, then round the queue, then two more */
  var CLEAN_B1 = 5;       /* all three inside the first two tries */
  var CLEAN_B2 = 10;
  var TYPO_PER = 3;       /* one forgiven typo per three words */
  var BOARD     = 4;      /* four visible; refill when two have gone */
  var REFILL_AT = 2;
  var GROUP_HI  = 8;      /* target */
  var GROUP_LO  = 6;      /* floor — below this, guessing beats knowing */
  var LISTEN_CAP= 8;      /* a listening round tests at most eight */
  var HELP_MS   = 3500;   /* stage 3: how long she gets before the highlight */
  var TYPE_CAP  = 5;      /* eight typed recalls in a row is a slog */
  var ALL_DRAW  = 8;      /* "all of them" draws eight of the thirty */
  var STORY_N   = 3;      /* three stories a sitting, least recently used */
  var TINTS = ['green', 'blue', 'pink', 'coral', 'amber'];

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

  /* Falls back to English so a slot Steven has not filled shows the
     English rather than an empty tile. */
  function pick(o){
    if (!o) return '';
    return o[lang()] || o.en || '';
  }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function words(){ return window.GH_WORDLAB || []; }
  function stories(){ return window.GH_GAPSTORIES || []; }

  function shuffle(a){
    if (GH.text && GH.text.shuffle) return GH.text.shuffle(a);
    var out = a.slice(), i, j, x;
    for (i = out.length - 1; i > 0; i--){
      j = Math.floor(Math.random() * (i + 1));
      x = out[i]; out[i] = out[j]; out[j] = x;
    }
    return out;
  }

  function say(text, then){
    if (!GH.speech) { if (then) then(); return; }
    if (GH.speech.sayIn) GH.speech.sayIn(text, 'de', then);
    else GH.speech.say(text, then);
  }

  function stopSpeech(){ if (GH.speech && GH.speech.stop) GH.speech.stop(); }

  /* The key every answer is filed under, so a word learned here is the
     same word the tutor is scheduling everywhere else. */
  function keyOf(w){ return 'word:' + w.n; }

  function meaning(w){
    return (w.def && (w.def[lang()] || w.def.en)) || '';
  }

  /* ------------------------------------------------------------------
     GROUPING — target 8, floor 6, remainder below the floor merges up

     min(ceil(n/8), floor(n/6)) groups, spread evenly. The first version
     sliced by eight and merged a short tail, which turned 12 into one
     group of 12 rather than 6+6. The second computed ceil(n/8) and gave
     17 as 6+6+5, below the floor. This one is right for every size from
     6 to 60: totals correct, nothing under 6, nothing over 11.
     ------------------------------------------------------------------ */

  function chunk(list){
    var n = list.length;
    if (n <= GROUP_HI + 3) return [list.slice()];
    var g = Math.min(Math.ceil(n / GROUP_HI), Math.floor(n / GROUP_LO));
    if (g < 1) g = 1;
    var base = Math.floor(n / g), extra = n % g, out = [], at = 0, i, size;
    for (i = 0; i < g; i++){
      size = base + (i < extra ? 1 : 0);
      out.push(list.slice(at, at + size));
      at += size;
    }
    return out;
  }

  /* Grouped by part of speech, because a definition is the only
     representation that works for all thirty uniformly — only six of them
     are nouns, which is why the picture approach was never going to carry
     this chapter.

     Verb phrases and adjectives are four each. Four is below the floor, so
     they merge into one group of eight rather than sitting at the guess
     floor on their own. */
  /* THE CATEGORIES SHE CHOOSES FROM, and how big each one is.

     Grouped by part of speech, because a definition is the only
     representation that works for all thirty uniformly — only six of them
     are nouns, which is why the picture approach was never going to carry
     this chapter.

     Verb phrases and adjectives are four each. Four is below the floor —
     blind picking on a board of four is one real decision — so they are
     one category of eight rather than two that guess themselves. Every
     other part of speech already reaches the floor on its own.

     `all` is not a category, it is a draw: eight of the thirty, shuffled
     per call, so two sittings do not meet the same eight.  */
  function categories(){
    var all = words(), by = {}, out = [], i;
    for (i = 0; i < all.length; i++){
      var k = all[i].kind || 'other';
      (by[k] || (by[k] = [])).push(all[i]);
    }
    /* the two short ones are one category; the data calls them vphrase
       and adj, the screen calls them one thing */
    by.vphrase = (by.vphrase || []).concat(by.adj || []);
    delete by.adj;

    for (i = 0; i < CATEGORY.length; i++){
      var c = CATEGORY[i];
      if (c.kind === 'all'){
        if (all.length > ALL_DRAW) out.push({ c:c, words:null, n:ALL_DRAW });
        continue;
      }
      var g = by[c.kind];
      if (g && g.length) out.push({ c:c, words:g, n:g.length });
    }
    return out;
  }

  /* What a stage actually runs on, once she has chosen. `all` is drawn
     fresh each time; a named category is the whole category. */
  function drawFrom(choice){
    if (!choice.words) return shuffle(words()).slice(0, choice.n);
    return choice.words.slice();
  }

  /* Always a real tint class. Stages 3 and 4 have no group behind them, so
     they fall back to a stable tint per word rather than to a class name
     that is not declared anywhere and silently paints nothing. */
  function tintOf(w){
    if (!w) return TINTS[0];
    if (state && state.tints && state.tints[w.n]) return state.tints[w.n];
    return TINTS[Math.abs(Number(w.n) || 0) % TINTS.length];
  }

  /* ------------------------------------------------------------------
     THE ANSWER-SET PRINCIPLE

     Near-synonyms are not kept apart on the board. They are simply both
     accepted, checked in both directions so it holds whichever tile she
     tapped first.
     ------------------------------------------------------------------ */
  function accepts(a, b){
    if (!a || !b) return false;
    if (a.n === b.n) return true;
    if (a.also && a.also.indexOf(b.de) >= 0) return true;
    if (b.also && b.also.indexOf(a.de) >= 0) return true;
    return false;
  }

  /* A tile wider than half the row takes the whole row. Recalculated from
     the words actually on the board, so it collapses back to two-up once
     the long ones have cleared — one reflow, not one per refill. */
  function wide(s){ return String(s || '').length > 16; }

  /* ------------------------------------------------------------------
     SCREEN FURNITURE
     ------------------------------------------------------------------ */

  function head(title, sub, onBack){
    var bar = el('div', 'practice-head');
    var back = el('button', 'backlink', '‹ ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ stopSpeech(); onBack(); });
    bar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, title));
    if (sub) titles.appendChild(el('p', null, sub));
    bar.appendChild(titles);
    return bar;
  }

  function flash(msg, cls){
    var old = host.querySelector('.wl-flash');
    if (old) old.parentNode.removeChild(old);
    if (!msg) return;
    var f = el('p', 'wl-flash' + (cls ? ' ' + cls : ''), msg);
    host.appendChild(f);
  }

  /* ------------------------------------------------------------------
     THE STAGE LIST
     ------------------------------------------------------------------ */

  function paintStages(){
    stopSpeech();
    host.textContent = '';
    host.appendChild(head(pick(NAME), pick(SUB), function(){ state.onExit(); }));

    /* Which set of words this lesson is, above the stages — see SET_NAME. */
    if (pick(SET_NAME)) host.appendChild(el('p', 'wl-set', pick(SET_NAME)));

    if (!words().length){
      host.appendChild(el('p', 'lede', t('noneYet')));
      if (GH.nav) GH.nav.ready();
      return;
    }

    var wrap = el('div', 'wl-groups');
    STAGE_NAME.forEach(function(nm, i){
      var bonus = isBonus(i), locked = shut(i);
      var b = el('button', 'wl-group');
      b.type = 'button';
      b.appendChild(el('span', 'wl-group-n',
        (bonus ? '\u2605 ' : (i + 1) + '. ') + pick(nm)));
      b.appendChild(el('span', 'wl-group-s',
        locked ? '\ud83d\udd12' : t('progress', { i:0, n:roundsIn(i) })));
      b.disabled = locked;
      if (!locked) b.addEventListener('click', function(){ startStage(i); });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    if (GH.nav) GH.nav.ready();
  }

  function roundsIn(stage){
    if (stage === 0 || stage === 1) return 3;
    if (stage === 7) return 1;
    return 2;
  }

  /* ------------------------------------------------------------------
     THE BONUS IS EARNED, NOT GIVEN

     Stages 1 to 7 are the achievement. The bonus sits OUTSIDE it, so
     nothing is gated behind the hardest thing in the lesson and nobody is
     stuck on word order to finish. It opens when stage 7 has been
     finished once, and it stays open.
     ------------------------------------------------------------------ */

  /* Three gates, each opened by doing the thing before it cleanly:

       stage 7 finished          opens bonus 1
       bonus 1 clean             opens bonus 2
       bonus 2 clean as well     the mastery flag

     CLEAN means every sentence inside its first two tries — no lap round
     the queue. A sentence inside the typo allowance counts as right, so
     clean does not mean flawless typing; it means she never needed the
     second pass. */
  var GATE = { b1:'gh-wl-bonus', b2:'gh-wl-bonus2', all:'gh-wl-mastery' };
  var DONE_KEY = 'gh-wl-done';   /* which stages have been finished */

  function gateOpen(k){
    try { return localStorage.getItem(scoped(k)) === '1'; }
    catch (e){ return false; }
  }

  function openGate(k){
    try { localStorage.setItem(scoped(k), '1'); } catch (e){}
  }

  function isBonus(stage){ return stage >= 7; }

  /* Which gate a stage sits behind. Stages 1 to 7 sit behind none. */
  function gateFor(stage){
    if (stage === 7) return GATE.b1;
    if (stage === 8) return GATE.b2;
    return null;
  }

  function shut(stage){
    var g = gateFor(stage);
    return !!g && !gateOpen(g);
  }

  function unlocked(){ return gateOpen(GATE.b1); }

  function doneRead(){
    try { return JSON.parse(localStorage.getItem(scoped(DONE_KEY)) || '{}') || {}; }
    catch (e){ return {}; }
  }

  function markDone(stage){
    var d = doneRead();
    d['s' + stage] = 1;
    try { localStorage.setItem(scoped(DONE_KEY), JSON.stringify(d)); } catch (e){}
  }

  /* What awards.js asks about. Kept here rather than having awards.js read
     this file's storage keys directly — every other fact in facts() comes
     from a module's own accessor, and a second file that knows the shape
     of these keys is a second file to change when the shape moves. */
  function progress(){
    var d = doneRead(), n = 0, i;
    for (i = 0; i < 7; i++) if (d['s' + i]) n++;
    return {
      stages: n,                       /* of the seven */
      allStages: n >= 7,
      bonus1: gateOpen(GATE.b2),       /* opened only by a clean bonus 1 */
      mastery: gateOpen(GATE.all)
    };
  }

  /* The five tints are round 2's scaffold in stages 1 and 2 only. Stage 7
     has none: a color that grouped the words of a sentence would answer
     the sentence. */

  /* ------------------------------------------------------------------
     STARTING A ROUND
     ------------------------------------------------------------------ */

  /* The group is cleared HERE and not in startRound(). A group is chosen
     once per stage and kept across its rounds — the three rungs only work
     on the same material. Clearing it at the top of round 0 sent her
     straight back to the picker she had just used. */
  function startStage(stage){
    state.stage = stage;
    state.round = 0;
    state.group = null;
    /* ROUND 2 MUST BE THE SAME STORIES AS ROUND 1. Steven: "For round two
       - recall it has to be the same story that can't shift."

       It shifted, and it could not have done otherwise: startStory() drew
       a fresh set on every round, and drawStories() both sorts by
       least-recently-seen AND stamps what it drew as seen now — so round
       1's three went to the back of the queue and round 2 was guaranteed
       to draw three different ones. The recall round has never once
       tested what the round before it taught.

       Cleared here and not in startRound(), exactly as `group` above is
       and for the same reason: chosen once per stage, kept across its
       rounds, because the rungs only work on the same material. */
    state.storyQueue = null;
    /* The stage is what gets paid, so the stage keeps its own tally
       across every round in it. The per-round one still exists, because
       each round's own screen reports that round. */
    state.stageRun = GH.run ? GH.run.create() : null;
    state.sAttempt = 0;
    state.sRight = 0;
    state.sWrong = 0;
    state.sSeen = {};
    startRound();
  }

  function startRound(){
    var s = state.stage, r = state.round;
    state.run = GH.run ? GH.run.create() : null;
    state.attempt = 0;
    state.right = 0;
    state.wrong = 0;
    state.seen = {};

    /* Stages 1 to 4 run on a chosen category, so the picker gates all
       four of them and the choice is kept across a stage's rounds — the
       rungs only work on the same material. Stages 5 and 6 run on
       stories, where the story is the unit and a part of speech is not
       something to pick. */
    if (s <= 3){
      if (!state.group){ paintCategoryPick(); return; }
      if (s === 0 || s === 1){ if (r === 0) startLearn(); else startBoard(); }
      else if (s === 2) startListen();
      else startType();
    } else if (s === 4 || s === 5){
      startStory();
    } else if (s === 6){
      startOrder();
    } else {
      startBonus();
    }
  }

  function paintCategoryPick(){
    stopSpeech();
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[state.stage]), null, paintStages));

    var wrap = el('div', 'wl-groups');
    categories().forEach(function(choice){
      var b = el('button', 'wl-group');
      b.type = 'button';
      b.appendChild(el('span', 'wl-group-n', pick(choice.c)));
      b.appendChild(el('span', 'wl-group-s', t('vocabSetN', { n:choice.n })));
      b.addEventListener('click', function(){
        state.choice = choice;
        state.group = drawFrom(choice);
        state.tints = assignTints(state.group);
        startRound();
      });
      wrap.appendChild(b);
    });
    host.appendChild(wrap);
    if (GH.nav) GH.nav.ready();
  }

  /* ------------------------------------------------------------------
     THE COLOR BELONGS TO THE WORD. THE BOARD NEVER SHOWS TWO THE SAME.

     Steven's rule, and it is better than the two obvious alternatives.

     Assigning a color to the whole group and keeping it was the first
     version, and it was wrong: a group is six to ten words and there are
     five colors, so at least two words share one — and the moment both
     landed on the board together, two tiles were the same color and the
     scaffold said something false.

     Reassigning every color on every refill fixes that but throws away the
     hook: a word that was green a moment ago is suddenly pink, and the
     color stops meaning anything beyond the current four.

     So the color stays with the word, AND the board is filled so that no
     two visible words share one. When that is impossible — the last words
     in the pool happen to be the pair that share — the arriving word
     CHANGES COLOR LIKE A CHAMELEON and takes a free one. The word keeps
     that new color from then on, so it is still stable; it just bent once
     to avoid a lie.
     ------------------------------------------------------------------ */

  function assignTints(group){
    var rot = shuffle(TINTS), map = {}, i;
    for (i = 0; i < group.length; i++) map[group[i].n] = rot[i % rot.length];
    return map;
  }

  function tintsOnBoard(){
    var used = {}, i;
    for (i = 0; i < state.left.length; i++) used[state.tints[state.left[i].n]] = true;
    return used;
  }

  function freeTint(used){
    var i;
    for (i = 0; i < TINTS.length; i++) if (!used[TINTS[i]]) return TINTS[i];
    return TINTS[0];          /* five colors, four slots — unreachable */
  }

  /* Takes the first word in the pool whose color is not already on the
     board. Falls back to the front of the pool and recolors it, which is
     the chameleon case. */
  function takeNext(){
    var used = tintsOnBoard(), i, w;
    for (i = 0; i < state.pool.length; i++){
      if (!used[state.tints[state.pool[i].n]]) return state.pool.splice(i, 1)[0];
    }
    w = state.pool.shift();
    state.tints[w.n] = freeTint(used);
    return w;
  }

  /* ==================================================================
     STAGE 1 and 2, ROUND 1 — LEARN

     Cycles the set one at a time. Word 2 arrives, word 1 begins to fade,
     word 1 is gone before word 4 appears: at most three on screen. The
     leaving tile fades to 60%, NOT 35% — at 35% it is unreadable while it
     is still there, which is worse than either being present or gone.
     ================================================================== */

  var LEARN_MS = 4200;

  /* SPEED CONTROL + MANUAL ADVANCE — Steven: "the word exercises are a
     little slow with no ability to advance faster or control speed..
     it should allow manual advance as an option. Maybe also a speed
     control you can go faster or slower than the default."

     Two separate, small controls, not a mode switch: a Next button that
     always works (advance right now, regardless of the timer), and a
     speed dial that scales how long the timer waits between ticks.
     Persisted per player, same key pattern as the gates above. */
  var SPEED_KEY = 'gh-wl-learn-speed';
  var SPEEDS = [
    { id:'slow',   mult:1.6, label:'−' },   /* minus sign, slower */
    { id:'normal', mult:1,   label:'●' },   /* dot, default pace */
    { id:'fast',   mult:0.55,label:'+' }
  ];

  function speedId(){
    try {
      var v = localStorage.getItem(scoped(SPEED_KEY));
      return SPEEDS.some(function(s){ return s.id === v; }) ? v : 'normal';
    } catch (e){ return 'normal'; }
  }
  function speedMult(){
    var id = speedId();
    var s = SPEEDS.filter(function(s){ return s.id === id; })[0];
    return s ? s.mult : 1;
  }
  function setSpeedId(id){
    try { localStorage.setItem(scoped(SPEED_KEY), id); } catch (e){}
  }
  function learnMs(){ return Math.round(LEARN_MS * speedMult()); }

  function startLearn(){
    state.queue = shuffle(state.group).slice();
    state.shown = [];
    state.at = 0;
    /* Tinted as they arrive rather than up front. At most three are on
       screen and the rotation is five long, so any three consecutive
       tiles are three different colours. */

    paintLearn();
    tickLearn();
  }

  function tickLearn(){
    if (state.timer) clearTimeout(state.timer);
    if (state.at >= state.queue.length){
      state.timer = setTimeout(finishRound, learnMs());
      return;
    }
    var w = state.queue[state.at++];
    /* Same rule on the learn tiles: at most three are on screen, and a
       word arriving beside one of its own color bends to a free one. */
    var seen = {}, i;
    for (i = 0; i < state.shown.length; i++) seen[state.tints[state.shown[i].n]] = true;
    if (seen[state.tints[w.n]]) state.tints[w.n] = freeTint(seen);
    state.shown.push(w);
    if (state.shown.length > 3) state.shown.shift();
    paintLearn();
    say(state.stage === 0 ? w.de : (w.s && w.s[0] ? w.s[0].t : w.de));
    state.timer = setTimeout(tickLearn, learnMs());
  }

  /* The row above the tiles: a Next button (advance right now, works no
     matter what the timer is doing) and a three-step speed dial (slower
     / normal / faster) that scales learnMs() for every tick after this
     one. Neither is a mode switch — the conveyor keeps running either
     way, this just lets her push past a word she already knows or slow
     down one she doesn't, without waiting on the default pace. */
  function learnControls(){
    var row = el('div', 'wl-learn-controls');

    var next = el('button', 'wl-next-btn', t('wlNext') || 'Next ▸');
    next.type = 'button';
    next.addEventListener('click', function(){
      if (state.timer) clearTimeout(state.timer);
      tickLearn();
    });
    row.appendChild(next);

    var dial = el('div', 'wl-speed-dial');
    var cur = speedId();
    SPEEDS.forEach(function(s){
      var b = el('button', 'wl-speed-btn' + (s.id === cur ? ' is-active' : ''), s.label);
      b.type = 'button';
      b.setAttribute('aria-pressed', s.id === cur ? 'true' : 'false');
      b.setAttribute('title', t('wlSpeed' + s.id) || s.id);
      b.addEventListener('click', function(){
        if (s.id === speedId()) return;
        setSpeedId(s.id);
        /* Re-arm any pending timer at the new pace right away, rather
           than finishing out one tick at the old speed first. */
        if (state.timer){
          clearTimeout(state.timer);
          state.timer = setTimeout(tickLearn, learnMs());
        }
        paintLearn();
      });
      dial.appendChild(b);
    });
    row.appendChild(dial);

    return row;
  }

  function paintLearn(){
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(ROUND_NAME[0]), stopRound));
    host.appendChild(learnControls());

    var box = el('div', 'wl-learn');
    state.shown.forEach(function(w, i){
      var leaving = (state.shown.length === 3 && i === 0);
      /* A BUTTON, SO SHE CAN HEAR IT AGAIN. Steven: "you can't click on any
         sentences to hear them a second time it's just on a conveyor belt
         no interaction allowed."

         It was a div. The only thing that spoke was the conveyor, once, as
         each tile arrived — so a sentence she wanted twice was gone.

         THE TAP ALSO RESTARTS THE INTERVAL, and that is the half that makes
         it work rather than a decoration. Speaking a sentence takes about
         as long as the tile has left, so a replay without the reset gets
         cut off mid-word by the next tick, which is worse than no replay. */
      var tile = el('button', 'wl-tile is-' + tintOf(w) +
        (leaving ? ' is-leaving' : ''));
      tile.type = 'button';
      var text = w.de;
      tile.appendChild(el('p', 'wl-tile-w', w.de));
      if (state.stage === 0){
        tile.appendChild(el('p', 'wl-tile-d', meaning(w)));
      } else {
        var s = w.s && w.s[0];
        if (s){
          tile.appendChild(sentenceWithBold(s.t, w.de));
          text = s.t;
        }
      }
      tile.addEventListener('click', function(){
        say(text);
        if (state.timer) clearTimeout(state.timer);
        state.timer = setTimeout(tickLearn, learnMs());
      });
      box.appendChild(tile);
    });
    host.appendChild(box);
    if (GH.nav) GH.nav.ready();
  }

  /* Round 1 of stage 2 shows the word IN the sentence, bolded in place —
     the copy pass before anything is removed. */
  function sentenceWithBold(text, word){
    var p = el('p', 'wl-tile-s');
    var stem = String(word).replace(/^(der|die|das)\s+/, '');
    var i = String(text).toLowerCase().indexOf(stem.toLowerCase());
    if (i < 0){ p.textContent = text; return p; }
    p.appendChild(document.createTextNode(text.slice(0, i)));
    p.appendChild(el('span', 'wl-in', text.slice(i, i + stem.length)));
    p.appendChild(document.createTextNode(text.slice(i + stem.length)));
    return p;
  }

  /* ==================================================================
     STAGE 1 and 2, ROUNDS 2 and 3 — THE BOARD

     Four visible. Wait for any TWO slots to empty, then fill both. The
     board size sets the guess rate: blind picking is 1 in 4, then 1 in 3,
     then the last pair is free. Six is the first set size where guessing
     is clearly worse than knowing.

     RESHUFFLE EVERY POSITION ON EVERY REFILL. Otherwise the two survivors
     are visibly the old ones and the newcomers are obviously each other's
     match, and the board answers itself.

     Long words are cycled early, shuffled within length bands, so a long
     slot is refilled with a long word while any remain. The layout
     reflows ONCE — when the long pool runs dry — rather than every refill.
     ================================================================== */

  function startBoard(){
    var g = state.group.slice();
    g.sort(function(a, b){ return partOf(b).length - partOf(a).length; });
    var bands = [], i;
    for (i = 0; i < g.length; i += BOARD) bands.push(shuffle(g.slice(i, i + BOARD)));
    state.pool = [];
    bands.forEach(function(b){ state.pool = state.pool.concat(b); });
    state.left = [];
    state.right2 = [];
    state.picked = null;
    fillBoard();
    paintBoard();
  }

  function partOf(w){
    if (state.stage === 0) return meaning(w);
    var s = w.s && w.s[0];
    return s ? s.gap : w.de;
  }

  function fillBoard(){
    while (state.left.length < BOARD && state.pool.length){
      state.left.push(takeNext());
    }
    state.left = shuffle(state.left);
    state.right2 = shuffle(state.left.slice());
    /* no word opposite its own partner */
    if (state.left.length > 1){
      var tries = 0;
      while (tries++ < 24 && state.left.some(function(w, i){ return state.right2[i] === w; })){
        state.right2 = shuffle(state.left.slice());
      }
    }
  }

  function paintBoard(){
    host.textContent = '';
    var color = (state.round === 1);
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(ROUND_NAME[color ? 1 : 2]), stopRound));
    /* No header in the coloured round: there is no score to show, and a
       running percentage on a round that does not count is exactly what
       Steven objected to. */
    if (scoring() && state.run && GH.run) host.appendChild(GH.run.header(state.run));

    var top = el('div', 'wl-words');
    var anyWide = state.left.some(function(w){ return wide(w.de); });
    state.left.forEach(function(w){
      var b = el('button', 'wl-w' + (anyWide ? ' is-wide' : '') +
        (color ? ' is-' + tintOf(w) : '') +
        (state.picked === w ? ' is-picked' : ''));
      b.type = 'button';
      b.textContent = w.de;
      b.addEventListener('click', function(){
        say(w.de);
        state.picked = (state.picked === w) ? null : w;
        paintBoard();
      });
      top.appendChild(b);
    });
    host.appendChild(top);

    host.appendChild(el('div', 'wl-rule'));

    var bottom = el('div', 'wl-parts');
    state.right2.forEach(function(w){
      var b = el('button', 'wl-p' + (color ? ' is-' + tintOf(w) : ''));
      b.type = 'button';
      b.textContent = partOf(w);
      b.addEventListener('click', function(){ tryPair(w); });
      bottom.appendChild(b);
    });
    host.appendChild(bottom);
    if (GH.nav) GH.nav.ready();
  }

  /* ---------- THE PAIR SHE JUST MADE, SAID ONCE ----------

     Steven: "when you match the word to a sentence, it just disappears
     immediately, I want to show the sentence in the word and say it one
     time connected together before it disappears... And since round two
     never connected the word in the sentence together after you clicked on
     them to reinforce that a huge learning opportunity was already lost."

     He is right, and it is the whole point of the round. She has just
     worked out that `die Bewegung` belongs in `___ ist wichtig für den
     Körper`, and the app answered by deleting both halves before she could
     read the result. The one moment the sentence is complete and she has
     earned it is the moment it vanished.

     So it is shown whole, with the word in place, and spoken once.

     LENGTH IS THE SPEECH, NOT A TIMER. `say()` calls back when it has
     finished, so the pause is exactly as long as the sentence and not a
     guess. DEMO_MAX only covers the cases where speech never reports back
     at all — muted, unsupported, or interrupted — and must never be the
     normal path, or every pair would wait the full three and a half
     seconds however short the sentence. */
  var DEMO_MAX = 3500;

  function showPair(w, then){
    host.textContent = '';
    var color = (state.round === 1);
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(ROUND_NAME[color ? 1 : 2]), stopRound));

    var box = el('div', 'wl-demo');
    var tile = el('div', 'wl-demo-tile is-' + tintOf(w));
    var text = w.de;
    tile.appendChild(el('p', 'wl-tile-w', w.de));
    if (state.stage === 0){
      tile.appendChild(el('p', 'wl-tile-d', meaning(w)));
    } else {
      var s = w.s && w.s[0];
      if (s){
        tile.appendChild(sentenceWithBold(s.t, w.de));
        text = s.t;
      }
    }
    box.appendChild(tile);
    host.appendChild(box);

    var done = false;
    function go(){
      if (done) return;
      done = true;
      if (state.timer) clearTimeout(state.timer);
      then();
    }
    say(text, go);
    state.timer = setTimeout(go, DEMO_MAX);
  }

  function tryPair(target){
    if (!state.picked){ flash(t('notQuite'), 'is-hint'); return; }
    var w = state.picked, ok = accepts(w, target);
    record(w, ok, 'wordlab-match', target.de, 'm' + w.n);
    if (ok){
      state.left = state.left.filter(function(x){ return x !== w; });
      state.right2 = state.right2.filter(function(x){ return x !== w; });
      state.picked = null;
      /* Wait for TWO slots, then fill both. Shape does not gate the
         refill; it only decides which word goes into which slot. */
      if (state.left.length <= BOARD - REFILL_AT && state.pool.length) fillBoard();
      var last = !state.left.length;
      showPair(w, function(){
        if (last){ finishRound(); return; }
        paintBoard();
      });
    } else {
      state.picked = null;
      paintBoard();
      flash(t('wrong'), 'is-no');
    }
  }

  /* ==================================================================
     STAGE 3 — HEARD, NOT SEEN

     She hears a German word and picks its meaning WITHOUT EVER SEEING IT;
     the word appears only after she chooses, and is spoken again as it
     appears.

     One word at a time, four choices, and the direction is FIXED: heard
     word to meaning, never the reverse. That is what makes an ambiguous
     target harmless — the word is the prompt, so two similar meanings
     cannot produce a wrong answer the way two similar words could.

     Replay is free and unlimited. Charging for a replay would make it a
     memory test rather than a listening one.

     Two tries, then to the back of the pile. She cannot finish without
     getting every word right, so a miss costs time and never the round.

     Capped at eight, drawn at random: a set of 6, 7 or 8 always tests the
     whole set; 9 leaves one out, 10 leaves two, 11 leaves three.
     ================================================================== */

  /* ---------- THE HELP, AND THE PASS THAT TAKES IT BACK ----------

     Steven: "I want it to remain with the 4 definitions no color but after
     3-4 seconds I want it to highlight one.. this gives a chance to get it
     without help. Then, after you finish that round. Any words that you
     had to wait for the color to appear to answer come back but without
     the color assistance."

     So the board opens plain and stays plain for HELP_MS. After that the
     right answer lights up, and from then on the question is free.

     WHAT COUNTS. A word answered while the highlight is showing scores
     NOTHING — not a hit, not a miss, and nothing reaches the tutor. It
     goes on a list and is asked again in a second pass with no highlight
     at all, and THAT answer is the one that counts. A word answered
     before the highlight appeared counts immediately and never comes
     back. So the round's percentage is exactly what he asked for: the
     second pass, plus the words she got unaided the first time.

     Suppressing the record rather than marking it is the same decision
     `scoring()` already makes for the coloured matching round in stages 1
     and 2, and for the same reason given there — a hit that leaned on a
     cue which will not be there next time must not push the word's next
     review further out.

     NOT A ROUND OF ITS OWN, deliberately. Stage 3 already has two rounds
     — heard-to-meaning and heard-to-sentence — and he wants this on both,
     so a third `state.round` would collide with that distinction and with
     `roundsIn()`, which is what decides when the stage pays. It is a
     second pass INSIDE each round: the stage still pays once, at the end,
     on the stage tally.

     THE PASS IS PART OF THE RECORD ID for the same reason the round
     already is. Both passes ask about the same word, `record()` dedupes
     on the id, and without the pass in the key the second answer would
     merge into the first and score nothing.

     Runs on the category she chose, still capped at eight. A set of 6, 7
     or 8 always tests the whole thing; 9 leaves one out, 10 leaves two.
     So `verbs` at ten tests eight of the ten, shuffled per call. */
  function startListen(){
    state.queue = shuffle(state.group).slice(0, LISTEN_CAP);
    state.tries = {};
    state.revealed = null;
    state.pass = 1;
    state.again = [];       /* words that waited for the highlight */
    state.help = false;     /* is the highlight showing right now */
    state.helpBtn = null;
    nextListen();
  }

  function nextListen(){
    if (state.timer) clearTimeout(state.timer);
    state.revealed = null;
    state.help = false;
    state.helpBtn = null;

    if (!state.queue.length){
      /* The words that needed the highlight, once, without it. Only ever
         one extra pass: a second would be the same question a third time
         and she has already been shown the answer. */
      if (state.pass === 1 && state.again.length){
        state.pass = 2;
        state.queue = shuffle(state.again);
        state.again = [];
        state.tries = {};
      } else {
        finishRound();
        return;
      }
    }

    state.cur = state.queue[0];
    state.choices = choicesFor(state.cur);
    paintListen();
    say(state.cur.de);
  }

  /* Lights up the right answer and leaves it lit. Called by the timer
     armed in paintListen(), never on a repaint — a repaint that re-armed
     it would restart her clock every time the screen redrew. */
  function showHelp(){
    state.help = true;
    if (state.helpBtn) state.helpBtn.className = 'wl-p is-help';
  }

  /* The right one plus three drawn from the WHOLE chapter, not only the
     untested words — a meaning she has already matched can turn up again. */
  /* The three wrong choices come from the WHOLE chapter, not only from
     her chosen category and not only from the untested words — a meaning
     she has already matched can turn up again. Drawing them from the
     category alone would make `nouns` a six-way board that runs out. */
  function choicesFor(w){
    var others = shuffle(words().filter(function(x){ return x.n !== w.n; })).slice(0, 3);
    return shuffle([w].concat(others));
  }

  function paintListen(){
    host.textContent = '';
    /* 10 and 11 are the two rounds with the help available, 12 and 13 the
       same two on the second pass where it is not. */
    host.appendChild(head(pick(STAGE_NAME[2]),
      pick(ROUND_NAME[(state.round === 0 ? 10 : 11) + (state.pass === 2 ? 2 : 0)]),
      stopRound));
    if (state.run && GH.run) host.appendChild(GH.run.header(state.run));

    var play = el('button', 'btn btn-primary',
      '▶ ' + t(state.revealed ? 'listenAgain' : 'listen'));
    play.type = 'button';
    play.addEventListener('click', function(){ say(state.cur.de); });
    host.appendChild(play);

    if (state.revealed){
      var seen = el('div', 'wl-tile is-' + tintOf(state.cur));
      seen.appendChild(el('p', 'wl-tile-w', state.cur.de));
      seen.appendChild(el('p', 'wl-tile-d', meaning(state.cur)));
      host.appendChild(seen);
    }

    var box = el('div', 'wl-parts');
    state.helpBtn = null;
    state.choices.forEach(function(c){
      var right = accepts(state.cur, c);
      /* Already lit when the screen redraws after the highlight has
         appeared, so a repaint does not take the help away again. */
      var b = el('button', 'wl-p' + (right && state.help ? ' is-help' : ''));
      b.type = 'button';
      /* Round 1 asks for the meaning; round 2 asks for the gapped
         sentence — same engine, same fixed direction, different target. */
      b.textContent = state.round === 0 ? meaning(c) : gapOf(c);
      b.disabled = !!state.revealed;
      b.addEventListener('click', function(){ answerListen(c); });
      if (right) state.helpBtn = b;
      box.appendChild(b);
    });
    host.appendChild(box);

    /* Armed only on the first pass, and only while the question is still
       open. `state.timer` rather than a field of its own because
       stopRound() and finishRound() already clear it, so leaving the round
       cannot leave a highlight waiting to fire on the next screen. */
    if (state.timer) clearTimeout(state.timer);
    if (state.pass === 1 && !state.revealed && !state.help){
      state.timer = setTimeout(showHelp, HELP_MS);
    }

    if (GH.nav) GH.nav.ready();
  }

  function gapOf(w){
    var s = w.s && w.s[0];
    return s ? s.gap : w.de;
  }

  function answerListen(c){
    var w = state.cur, ok = accepts(w, c);
    /* Read before anything else changes it: whether the highlight was on
       screen at the moment she tapped is the whole of what decides
       here. */
    var helped = state.pass === 1 && state.help;

    /* THE CLOCK IS NOT STOPPED HERE. A wrong first try leaves the question
       open, so the help must still arrive on its original schedule —
       clearing it here meant one wrong guess at two seconds cancelled the
       highlight for that word altogether. The two paths that actually
       close the question clear it themselves: the right answer repaints
       (and paintListen() will not re-arm once `revealed` is set), and the
       second wrong try clears it below. */

    /* A right answer taken off the highlight is a demonstration, not an
       answer: nothing is recorded and the word is asked again without it.
       A WRONG answer still counts, highlight or not — she was shown the
       answer and chose something else, and the second pass is a fresh
       question rather than an amnesty. */
    if (!(ok && helped)){
      record(w, ok, 'wordlab-listen', c.de,
             (state.pass === 2 ? 'l2' : 'l') + w.n);
    }

    if (ok){
      if (helped) state.again.push(w);
      state.queue.shift();
      state.revealed = w;
      paintListen();
      say(w.de, function(){ setTimeout(nextListen, 500); });
      return;
    }
    var n = (state.tries[w.n] = (state.tries[w.n] || 0) + 1);
    if (n >= 2){
      if (state.timer) clearTimeout(state.timer);
      state.queue.shift();
      state.queue.push(w);          /* to the back of the pile, not gone */
      flash(t('answerWas', { word:w.de }), 'is-no');
      setTimeout(nextListen, 1400);
    } else {
      flash(t('wrong'), 'is-no');
    }
  }

  /* ==================================================================
     STAGE 4 — TYPING IT. The first typed production in the app.

     Everything else is tap, pick or drag. She can recognise verschieben
     in four options and has never once had to produce it.

     Round 1 COPY IT — she hears the word AND sees it, and types it while
     looking at it. Not a test: the only place in the app that teaches
     spelling, and German spelling has to be taught before it is recalled.

     Round 2 FROM MEMORY — she hears the word and sees the MEANING, never
     the word.

     Four or five words, not eight. Eight typed recalls in a row is a slog
     rather than an exercise.

     Three tries, then a COPY and a requeue. After the third miss the word
     is shown — and she types it while looking at it, which is the whole
     point of showing it. It returns at the end of the list and she keeps
     going until she can spell it unaided.

     NOTHING HERE IS ON A CLOCK. Steven: "It flashes the correct spelling
     then moves on. IT SHOULD NOT AT ALL MOVE ON until they click.. it
     should NOT be timed. In fact, it should give them a chance to type it
     while seeing it."

     What it used to do, and why it was wrong on both counts: the word
     appeared, `input.disabled` turned the box OFF — the file's own comment
     called it "deliberately not typeable at that moment" — and a 2200ms
     timer moved her on. So the single moment she could see the correct
     spelling was the single moment she was forbidden from typing it, and
     it was taken away again before she had read it. She now types it, and
     the round waits.

     THE COPY IS NOT SCORED, and this is not the same as the score simply
     not changing. `record()` dedupes its right/wrong tally on first
     attempt, so a copy would not move the percentage — but the call to
     `GH.tutor.grade()` inside it is NOT deduped and fires on every
     attempt. Copying a word off the screen and having that filed as "she
     knows this" would push its next review further out on the strength of
     an answer that was visible, which is the same mistake `scoring()`
     exists to prevent for the coloured round and the stage-3 help. So the
     copy goes nowhere near `record()`.

     WHAT COUNTS AS CORRECT. Case ignored — a capital is a rule about
     sentence position and this is a word alone. Surrounding space
     ignored. The article is OPTIONAL, since the games already test
     gender. Umlauts and ß are NOT forgiven: Ubergewicht is a different
     word to a German reader, and spelling is this round's entire job.
     ================================================================== */

  function startType(){
    state.queue = shuffle(state.group).slice(0, TYPE_CAP);
    state.tries = {};
    state.look = null;
    nextType();
  }

  function nextType(){
    state.look = null;
    if (!state.queue.length){ finishRound(); return; }
    state.cur = state.queue[0];
    paintType();
    say(state.cur.de);
  }

  function paintType(){
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[3]),
      pick(ROUND_NAME[state.round === 0 ? 3 : 4]), stopRound));
    if (state.run && GH.run) host.appendChild(GH.run.header(state.run));

    var play = el('button', 'btn', '▶ ' + t('listen'));
    play.type = 'button';
    play.addEventListener('click', function(){ say(state.cur.de); });
    host.appendChild(play);

    var mid = el('div', 'wl-tile is-' + tintOf(state.cur));
    /* Round 1 shows the word — that is the copy pass. Round 2 shows the
       meaning and never the word. After a third miss the word is shown in
       both, and stays shown while she copies it. */
    if (state.round === 0 || state.look){
      mid.appendChild(el('p', 'wl-tile-w', state.cur.de));
    }
    mid.appendChild(el('p', 'wl-tile-d', meaning(state.cur)));
    host.appendChild(mid);

    var box = el('div', 'tw-type-box');
    var input = el('input', 'tw-type-in');
    input.type = 'text';
    input.autocapitalize = 'off';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = t('typeHere');
    /* LIVE DURING THE COPY. This read `input.disabled = !!state.look`,
       which switched the box off at the one moment the correct spelling
       was on screen. */
    box.appendChild(input);
    host.appendChild(box);

    var go = el('button', 'btn btn-primary', t('check'));
    go.type = 'button';
    go.addEventListener('click', function(){ answerType(input.value); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') answerType(input.value);
    });
    host.appendChild(go);

    /* The only way out of a copy, and there is no timer beside it. She
       reads the word, types it as many times as she likes, and leaves when
       she says so. The word is already at the back of the queue, so this
       just moves to the next one — which is exactly what the line above
       the button has to say, or Continue reads as "finished with this
       one". */
    if (state.look){
      host.appendChild(el('p', 'wl-again', pick(COPY_AGAIN)));
      var on = el('button', 'btn', t('next'));
      on.type = 'button';
      on.addEventListener('click', nextType);
      host.appendChild(on);
    }

    /* Filled by answerType() without a repaint, and ONLY where the correct
       spelling is already on screen — round 1, or a copy. Marking up her
       letters in round 2 before the third miss would insert the missing
       ones in dark orange and hand her the word she is meant to be
       recalling. */
    if (state.round === 0 || state.look){
      host.appendChild(el('div', 'wl-diff-slot'));
    }

    input.focus();
    if (GH.nav) GH.nav.ready();
  }

  function normal(s){
    return String(s || '').trim().toLowerCase()
      .replace(/^(der|die|das)\s+/, '')
      .replace(/\s+/g, ' ');
  }

  function typedOk(given, want){
    return normal(given) === normal(want);
  }

  /* ---------- WHAT SHE TYPED, MARKED UP ----------

     Steven: "I also want it to compare how the word is typed vs how it
     should be. Maybe highlight the wrong letters or if there's an omitted
     letter insert it with a color showing it was missing (maybe dark
     orange) and wrong letter is dark pink."

     `closeSpelling` already prints the correct word, which tells her the
     answer and nothing about her mistake. Übergewicht against Ubergewicht
     is one character out of twelve and reading the two side by side to
     find it is the work this does for her.

     A CHARACTER ALIGNMENT, NOT A POSITION-BY-POSITION WALK. Comparing
     index against index only works while the two strings stay in step,
     and the commonest German spelling mistake — a dropped letter — throws
     every character after it out of position, so a naive compare would
     mark the whole tail of the word wrong. This is the same edit-distance
     table `GH.text.distance()` computes, kept rather than reduced to one
     number so the path through it can be walked back into three kinds of
     mark:

       ok     she typed the right letter
       bad    she typed a letter where a different one belongs
       miss   a letter she left out, inserted here so she can see the gap
       extra  a letter she typed that does not belong

     `extra` is MINE and not in his brief. Left out, a typed extra letter
     has nowhere to go and the alignment would report it as a substitution
     plus a run of misses — a wrong explanation of a real mistake. It is
     marked in the same dark pink and struck through, so it reads as
     "take this out" rather than as a fourth thing to learn.

     Case is not a mistake here, matching typedOk(): a capital is a rule
     about sentence position and this is a word alone. The article is
     stripped from both sides for the same reason it is optional there.
     Umlauts and ß ARE mistakes and show up as `bad` — Ubergewicht is a
     different word to a German reader, and that is the whole job of this
     round. */
  function sameLetter(a, b){
    return String(a).toLowerCase() === String(b).toLowerCase();
  }

  function unarticled(s){
    return String(s || '').trim().replace(/^(der|die|das)\s+/i, '');
  }

  function spellDiff(given, want){
    var a = unarticled(given), b = unarticled(want);
    var m = a.length, n = b.length, i, j, cost;

    var d = [];
    for (i = 0; i <= m; i++){ d[i] = [i]; }
    for (j = 0; j <= n; j++){ d[0][j] = j; }
    for (i = 1; i <= m; i++){
      for (j = 1; j <= n; j++){
        cost = sameLetter(a.charAt(i - 1), b.charAt(j - 1)) ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      }
    }

    /* Walked from the end, so the marks come out in reading order. */
    var out = [];
    i = m; j = n;
    while (i > 0 || j > 0){
      if (i > 0 && j > 0){
        cost = sameLetter(a.charAt(i - 1), b.charAt(j - 1)) ? 0 : 1;
        if (d[i][j] === d[i - 1][j - 1] + cost){
          /* Her letter is shown, not the right one: the correct spelling
             is already on the tile above and what she needs to see here is
             which of HER letters is the wrong one. */
          out.unshift({ ch:a.charAt(i - 1), kind:cost ? 'bad' : 'ok' });
          i--; j--;
          continue;
        }
      }
      if (j > 0 && d[i][j] === d[i][j - 1] + 1){
        /* The letter she left out, put back where it belongs. */
        out.unshift({ ch:b.charAt(j - 1), kind:'miss' });
        j--;
        continue;
      }
      out.unshift({ ch:a.charAt(i - 1), kind:'extra' });
      i--;
    }
    return out;
  }

  function diffLine(given, want){
    var wrap = el('div', 'wl-diff');
    spellDiff(given, want).forEach(function(p){
      wrap.appendChild(el('span', 'wl-d-' + p.kind,
        p.ch === ' ' ? '\u00b7' : p.ch));
    });
    return wrap;
  }

  /* Fills the slot paintType() left, or clears it. Does nothing where
     there is no slot, which is round 2 before the third miss — so no
     caller has to know whether marking up is allowed on this screen. */
  function showDiff(given, want){
    var slot = host.querySelector('.wl-diff-slot');
    if (!slot) return;
    slot.textContent = '';
    if (given !== null) slot.appendChild(diffLine(given, want));
  }

  function answerType(given){
    var w = state.cur;

    /* THE COPY. She is looking at the word, so this is practice and not an
       answer: it says whether she got the letters right and it does not
       touch the score, the tutor or the queue. Nothing moves until she
       presses the button. */
    if (state.look){
      var copied = typedOk(given, w.de);
      showDiff(copied ? null : given, w.de);
      flash(copied ? t('correct') : t('wrong'), copied ? null : 'is-no');
      return;
    }

    var ok = typedOk(given, w.de);
    record(w, ok, 'wordlab-type', String(given || ''), 't' + w.n);
    if (ok){
      showDiff(null, w.de);
      state.queue.shift();
      flash(t('correct'));
      setTimeout(nextType, 700);
      return;
    }
    var n = (state.tries[w.n] = (state.tries[w.n] || 0) + 1);
    if (n >= 3){
      state.queue.shift();
      state.queue.push(w);
      state.look = true;
      paintType();
      /* AFTER the repaint, so it lands in the slot the copy screen has
         just built — in round 2 there was no slot until this moment. */
      showDiff(given, w.de);
      flash(t('closeSpelling', { word:w.de }), 'is-no');
      /* NO TIMER. `setTimeout(nextType, 2200)` used to sit here and was
         the whole of the complaint — see the note at the top of this
         stage. The Continue button in paintType() is the only way on. */
    } else {
      showDiff(given, w.de);
      flash(t('wrong'), 'is-no');
    }
  }

  /* ==================================================================
     STAGES 5 and 6 — THE STORY WITH BLANKS

     Three stories a sitting, drawn LEAST RECENTLY USED rather than at
     random: a random three of twelve serves the same story twice in a row
     often enough to be noticed, and the point of holding twelve is that
     studying should not feel like rereading.

     Stage 5 round 1 — tap a blank, tap a word. Matching, story visible.
     Stage 5 round 2 — the word is SHOWN and she types it in. Copy.
     Stage 6 round 1 — see and type, again. That is the scaffolding: copy
                       first, always.
     Stage 6 round 2 — the word is NOT shown. Three misses and it is shown
                       AND LOCKED OUT for that story — a lockout rather
                       than a requeue, because here the story is the unit.

     A BLANK IS THREE FIELDS: line, surface, word. German will not let it
     be one. vorschlagen appears as `schlägt vor`; anbieten as `bietet ihm
     Kaffee und Brot an`, split across seven words, so the blank takes
     `bietet` and leaves `an` visible — the trailing particle is a clue
     that the verb is separable and worth showing rather than hiding.
     `line` is needed because a surface form can repeat inside one story.
     ================================================================== */

  var SEEN_KEY = 'gh-wl-seen';

  function scoped(k){
    return (GH.player && GH.player.scope) ? GH.player.scope(k) : k;
  }

  function seenRead(){
    try { return JSON.parse(localStorage.getItem(scoped(SEEN_KEY)) || '{}') || {}; }
    catch (e){ return {}; }
  }

  function seenWrite(m){
    try { localStorage.setItem(scoped(SEEN_KEY), JSON.stringify(m)); } catch (e){}
  }

  function drawStories(){
    var all = stories(), seen = seenRead(), now = Date.now();
    var sorted = all.slice().sort(function(a, b){
      return (seen[a.id] || 0) - (seen[b.id] || 0);
    });
    var take = sorted.slice(0, STORY_N);
    take.forEach(function(s){ seen[s.id] = now; });
    seenWrite(seen);
    return take;
  }

  function startStory(){
    /* Only when the stage has not already chosen them — see startStage(). */
    if (!state.storyQueue) state.storyQueue = drawStories();
    state.storyAt = 0;
    nextStory();
  }

  function nextStory(){
    if (state.storyAt >= state.storyQueue.length){ finishRound(); return; }
    state.story = state.storyQueue[state.storyAt++];
    state.blanks = (state.story.blanks || []).map(function(b, i){
      return { i:i, line:b.line, surface:b.surface, word:b.word, filled:false, locked:false };
    });
    state.slot = null;
    state.tries = {};
    state.showTrans = false;
    /* Per story, not per round: each story teaches its own three to five
       words and each one gets its own set screen. */
    state.setSeen = false;
    state.setDefs = false;
    paintStory();
  }

  /* Typed in stage 5 round 2, stage 6 both rounds. Tapped in stage 5
     round 1. Stage 6 round 2 is the only one that does not show the word. */
  function typedStory(){ return !(state.stage === 4 && state.round === 0); }
  function showsWord(){ return !(state.stage === 5 && state.round === 1); }

  /* ---- THE WORD SET COMES FIRST ----

     GPT's diagnosis, which Steven agreed with: a recall round over 36
     stories was asking her to reconstruct arbitrary missing words from
     the whole vocabulary, with nothing naming the target set. That is not
     a harder version of the previous round, it is a different and
     unbounded task.

     The narrowing is per story. Every story blanks three to five words
     and every one of those resolves to a `GH_WORDLAB` headword with a
     definition in all three languages — checked against the data, all 36
     stories, no misses. So the set is already there to be shown.

     Shown ONLY in the round that hides the words. Where the word sits
     beside the blank anyway there is nothing to narrow, and a screen
     naming five words she is about to be shown one at a time is a screen
     in the way.

     DEFINITIONS ARE BEHIND A BUTTON, his call. The German is the thing to
     learn; a definition beside every word turns the set screen into
     reading rather than studying. */
  function setWords(){
    var seen = {}, out = [];
    (state.blanks || []).forEach(function(b){
      if (seen[b.word]) return;
      seen[b.word] = true;
      out.push(b.word);
    });
    return out;
  }

  function wordlabEntry(de){
    var all = words(), i;
    for (i = 0; i < all.length; i++) if (all[i].de === de) return all[i];
    return null;
  }

  function paintWordSet(){
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(SET_HEAD), stopRound));
    host.appendChild(el('p', 'wl-again', pick(SET_NOTE)));

    var defs = el('button', 'btn', pick(SET_DEFS));
    defs.type = 'button';
    defs.setAttribute('aria-pressed', state.setDefs ? 'true' : 'false');
    defs.addEventListener('click', function(){
      state.setDefs = !state.setDefs; paintWordSet();
    });
    host.appendChild(defs);

    var box = el('div', 'wl-parts');
    setWords().forEach(function(de){
      var w = wordlabEntry(de);
      /* Tappable, because hearing it is half of learning it. */
      var card = el('button', 'wl-tile is-' + tintOf(w || { n:0 }));
      card.type = 'button';
      card.appendChild(el('p', 'wl-tile-w', de));
      if (state.setDefs && w){
        card.appendChild(el('p', 'wl-tile-d', meaning(w)));
      }
      card.addEventListener('click', function(){ say(de); });
      box.appendChild(card);
    });
    host.appendChild(box);

    var on = el('button', 'btn btn-primary', t('next'));
    on.type = 'button';
    on.addEventListener('click', function(){
      state.setSeen = true;
      paintStory();
    });
    host.appendChild(on);

    if (GH.nav) GH.nav.ready();
  }

  function paintStory(){
    /* The set screen stands in front of the story, once per story. */
    if (!showsWord() && !state.setSeen){ paintWordSet(); return; }
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(ROUND_NAME[showsWord() ? 3 : 4]), stopRound));
    if (state.run && GH.run) host.appendChild(GH.run.header(state.run));

    /* ---- THE ANSWERS COME FIRST, ABOVE THE STORY ----

       Steven, with two screenshots: "Design of this has words you are
       supposed to type at bottom which the iPhone happily obscures. Put
       them at the top."

       He is right and the second screenshot is unarguable — Safari's
       bottom toolbar sits directly over vorschlagen / absagen /
       hoffentlich and hides all three completely. The bank was the LAST
       thing in the DOM, so on a phone it is the first thing the browser
       chrome eats, and the tiles she has to tap were the one part of the
       screen she could not reach.

       Nothing about the exercise wanted them last. The story is long, it
       scrolls, and the reading is the part she can scroll to; the tiles
       are the controls and controls belong where the thumb is. So the
       panel and its toggle move above the story, and the story keeps the
       whole of the space below.

       ONE BUTTON, TWO PANELS, SAME SPOT. She sees the word bank or the
       translation, never both — screen space is the cost here, the way
       credit is the cost in the Reader. */
    var flip = el('button', 'btn',
      state.showTrans ? (typedStory() ? t('type') : t('choose'))
                      : t('rdTranslate'));
    flip.type = 'button';
    flip.addEventListener('click', function(){
      state.showTrans = !state.showTrans; paintStory();
    });
    host.appendChild(flip);

    if (state.showTrans) host.appendChild(translationPanel());
    else if (!typedStory()) host.appendChild(bankPanel());
    else host.appendChild(typePanel());

    host.appendChild(el('div', 'wl-rule'));

    var lines = state.story.de || [];
    var box = el('div', 'wl-parts');
    lines.forEach(function(line, li){
      var p = el('p', 'wl-tile-s');
      renderLine(p, line, li);
      box.appendChild(p);
    });
    host.appendChild(box);

    /* TWO THINGS, HIS WORDS: the word she has to type, or the story read
       with that word left out. Two buttons rather than one that guesses
       which she wanted.

       The story reading is round 1 only. Steven: "since you just did the
       story it can be omitted" — she has just worked through it, so
       reading all of it back is eighteen words she has already heard. */
    var hearWord = el('button', 'btn', '▶ ' + pick(HEAR_WORD));
    hearWord.type = 'button';
    hearWord.addEventListener('click', function(){ sayBlank(); });
    host.appendChild(hearWord);

    if (state.round === 0){
      var hearStory = el('button', 'btn', '▶ ' + pick(HEAR_STORY));
      hearStory.type = 'button';
      hearStory.addEventListener('click', function(){ sayGapped(); });
      host.appendChild(hearStory);
    }

    if (GH.nav) GH.nav.ready();
  }

  /* ---- THE BLANK IS WHERE SHE TYPES ----

     Steven, with two screenshots of the keyboard up: "It expects you to
     type the entire line, but when you click on it to type it, it jumps
     you down to where you can fill it in and the visible line jumps
     beyond the top of the screen... What I would do is have to fill in
     the blank right underneath the sentence when you click it it turns
     into a fill in the blank line right there not jumping you down at
     all."

     WHY IT JUMPED. Tapping a blank only SELECTED it; the box to type in
     was somewhere else on the page, in `typePanel()`. Focusing that box
     made iOS scroll IT into view, and because the box and the sentence
     were far apart, the sentence she was answering about went off the top
     of the screen. So she typed a word into a gap she could no longer
     see, with the keyboard over the rest. His second screenshot has the
     sentence, the blank and the input in three different places, two of
     them unreachable.

     So the blank IS the input. Tapping it turns that gap in the sentence
     into a field in place, the sentence stays put around it, and iOS
     scrolling the field into view now scrolls the sentence into view
     because they are the same piece of the page. There is nowhere left
     to jump to.

     Typed rounds only. Stage 4's first round fills blanks by tapping
     words out of the bank, where a blank is a target and not a field, so
     there it stays a button. */
  function renderLine(p, line, li){
    var mine = state.blanks.filter(function(b){ return b.line === li; });
    if (!mine.length){ p.textContent = line; return; }
    var rest = line, i;
    for (i = 0; i < mine.length; i++){
      var b = mine[i], at = rest.indexOf(b.surface);
      if (at < 0) continue;
      p.appendChild(document.createTextNode(rest.slice(0, at)));
      p.appendChild(slotFor(b));
      rest = rest.slice(at + b.surface.length);
    }
    p.appendChild(document.createTextNode(rest));
  }

  /* The gap itself: a finished word, a button waiting to be tapped, or —
     once tapped in a typed round — the field she answers in. */
  function slotFor(b){
    if (typedStory() && state.slot === b && !b.filled && !b.locked){
      return liveSlot(b);
    }
    var slot = el('button', 'wl-w' + (state.slot === b ? ' is-picked' : ''),
      b.filled ? b.surface : ' ___ ');
    slot.type = 'button';
    slot.disabled = b.filled || b.locked;
    slot.addEventListener('click', function(){ state.slot = b; paintStory(); });
    return slot;
  }

  function liveSlot(b){
    var wrap = el('span', 'wl-slot-live');

    /* Where the round shows the word, it belongs beside the field she is
       copying it into. It used to sit at the top of `typePanel()`, which
       was the part of the screen she could not see. */
    if (showsWord()) wrap.appendChild(el('span', 'wl-slot-word', b.word));

    var input = el('input', 'wl-slot-in');
    input.type = 'text';
    input.autocapitalize = 'off';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = t('typeHere');
    /* Sized to the answer, so tapping a gap does not reflow the sentence
       into a different shape underneath her. */
    input.size = Math.max(6, String(b.word || '').length + 2);
    wrap.appendChild(input);

    var go = el('button', 'btn btn-primary wl-slot-go', t('check'));
    go.type = 'button';
    go.addEventListener('click', function(){ typeBlank(b, input.value); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter'){ e.preventDefault(); typeBlank(b, input.value); }
    });
    wrap.appendChild(go);

    /* After the paint, so there is an element to focus. iOS scrolling it
       into view is now exactly what is wanted. */
    setTimeout(function(){ try { input.focus(); } catch (e){} }, 0);
    return wrap;
  }

  /* ---- LISTEN SAYS THE WORD, NOT THE STORY ----

     Steven: "It does not read the sentence with the word you are supposed
     to type it reads the story without it. There are over twenty stories
     this is a retarded design. Have it speak the word that goes there."

     What it used to do: read the whole story aloud with every unfilled
     blank replaced by an ellipsis, on the theory that she would hear "the
     shape of the sentence with the hole in it". In practice the one thing
     she needs to hear is the one thing it refused to say, and it read
     eighteen other words to avoid saying it. On a stage with more than
     twenty stories that is a lot of listening for no information.

     So Listen now speaks the word for the blank she is working on. The
     blank she has tapped, or the first one still empty if she has not
     tapped one yet — "the word that goes there" has to mean something
     before she has picked a there. */
  function activeBlank(){
    if (state.slot) return state.slot;
    var open = (state.blanks || []).filter(function(b){ return !b.filled; });
    return open.length ? open[0] : null;
  }

  function sayBlank(){
    var b = activeBlank();
    if (b) say(b.word);
  }

  /* The other of the two: the story read straight through with the
     unfilled blanks left silent, so she hears the sentence around the
     hole. This is what the single Listen button used to do on its own,
     which was the complaint — as the ONLY option it read eighteen words
     to avoid saying the one she needed. As one of two it is worth
     having. */
  function sayGapped(){
    var lines = state.story.de || [], out = [], li;
    for (li = 0; li < lines.length; li++){
      var line = lines[li];
      state.blanks.filter(function(b){ return b.line === li; })
        .forEach(function(b){
          if (!b.filled) line = line.replace(b.surface, '…');
        });
      out.push(line);
    }
    say(out.join(' '));
  }

  function translationPanel(){
    var box = el('div', 'wl-parts');
    var l = lang() === 'de' ? 'en' : lang();
    (state.story[l] || state.story.en || []).forEach(function(line){
      box.appendChild(el('p', 'wl-tile-s', line));
    });
    return box;
  }

  function bankPanel(){
    var box = el('div', 'wl-words');
    var pool = shuffle(state.blanks.filter(function(b){ return !b.filled; }));
    pool.forEach(function(b){
      var btn = el('button', 'wl-w', b.word);
      btn.type = 'button';
      btn.addEventListener('click', function(){ dropWord(b); });
      box.appendChild(btn);
    });
    return box;
  }

  function typePanel(){
    var box = el('div', null);
    var b = state.slot;
    if (!b){ box.appendChild(el('p', 'wl-flash is-hint', t('notQuite'))); return box; }
    if (showsWord()) box.appendChild(el('p', 'wl-tile-w', b.word));

    var wrap = el('div', 'tw-type-box');
    var input = el('input', 'tw-type-in');
    input.type = 'text';
    input.autocapitalize = 'off';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = t('typeHere');
    wrap.appendChild(input);
    box.appendChild(wrap);

    var go = el('button', 'btn btn-primary', t('check'));
    go.type = 'button';
    go.addEventListener('click', function(){ typeBlank(b, input.value); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') typeBlank(b, input.value);
    });
    box.appendChild(go);
    setTimeout(function(){ input.focus(); }, 0);
    return box;
  }

  function dropWord(b){
    if (!state.slot){ flash(t('notQuite'), 'is-hint'); return; }
    var ok = (state.slot === b);
    recordBlank(state.slot, ok);
    if (ok){ state.slot.filled = true; state.slot = null; }
    paintStory();
    flash(ok ? t('correct') : t('wrong'), ok ? null : 'is-no');
    if (allDone()) setTimeout(nextStory, 900);
  }

  function typeBlank(b, given){
    var ok = typedOk(given, b.surface) || typedOk(given, b.word);
    recordBlank(b, ok);
    if (ok){
      b.filled = true; state.slot = null;
      paintStory();
      flash(t('correct'));
      if (allDone()) setTimeout(nextStory, 900);
      return;
    }
    var n = (state.tries[b.i] = (state.tries[b.i] || 0) + 1);
    if (n >= 3){
      /* A lockout, not a requeue. In stage 4 the word is the unit and it
         comes back; here the STORY is the unit, so a word that has beaten
         her three times is shown, filled and closed. */
      b.filled = true; b.locked = true; state.slot = null;
      paintStory();
      flash(t('answerWas', { word:b.word }), 'is-no');
      if (allDone()) setTimeout(nextStory, 1400);
    } else {
      paintStory();
      flash(t('wrong'), 'is-no');
    }
  }

  function allDone(){
    return state.blanks.every(function(b){ return b.filled; });
  }

  /* A blank whose headword is not one of the thirty still counts toward
     the round, but it is NOT filed under an invented tutor key — a key of
     `word:absagen` beside `word:574` would split one word's history in two
     and neither half would schedule correctly. */
  function recordBlank(b, ok){
    var w = words().filter(function(x){ return x.de === b.word; })[0];
    record(w || null, ok, 'wordlab-story', b.word, itemId(b, 'b'));
  }

  /* ==================================================================
     STAGE 7 — WORD ORDER

     The story is on screen whole. One sentence in it is the target: she
     reads it, presses start, and that sentence SHATTERS — its words drop
     out of the text and reappear below as tiles. She taps them back into
     order. Audio is there the whole time and costs nothing.

     Round 1 she sees the sentence before she starts. Round 2 it starts
     broken and she never sees it whole — only hears it.

     WHY THIS ONE MATTERS MORE THAN IT LOOKS. Russian word order is free
     and German's is not, so reconstruction is the most valuable exercise
     in the lesson for her, and the hardest.

     A WRONG TAP IS REFUSED rather than placed and corrected. Two readings
     were possible — strict left-to-right makes it a word-order drill, any
     order accepted makes it a listening walk through the sentence — and
     this stage exists to be the drill. Round 1 is where the walk already
     happened: she read the sentence before she pressed start.

     THE SHORTEST SENTENCE IN EACH STORY IS THE TARGET. Across the twelve
     they run 4 to 12 words averaging 8, and the shortest per story runs 4
     to 9. Picking the shortest keeps the tile row from swamping a phone.

     A placed word can be tapped to take it back, because there is no
     undo on a phone otherwise and a mis-tap should not cost the sentence.
     ================================================================== */

  function startOrder(){
    state.orderQueue = drawStories();
    state.orderAt = 0;
    nextOrder();
  }

  /* Tokens for the tiles carry no sentence-final punctuation — a full stop
     riding on one tile says "this one is last". It is put back when the
     sentence is complete. */
  function tokens(line){
    return String(line || '').replace(/[.!?]+\s*$/, '').split(/\s+/).filter(Boolean);
  }

  function shortestLine(story){
    var lines = story.de || [], best = 0, bestN = 1e9, i, n;
    for (i = 0; i < lines.length; i++){
      n = tokens(lines[i]).length;
      if (n < bestN){ bestN = n; best = i; }
    }
    return best;
  }

  function nextOrder(){
    if (state.orderAt >= state.orderQueue.length){ finishRound(); return; }
    state.story = state.orderQueue[state.orderAt++];
    state.line = shortestLine(state.story);
    state.want = tokens((state.story.de || [])[state.line]);
    state.placed = [];
    /* shattered from the start in round 2; round 1 shows it first */
    state.shattered = (state.round === 1);
    state.pool = state.shattered ? shuffle(state.want) : [];
    paintOrder();
  }

  function paintOrder(){
    host.textContent = '';
    host.appendChild(head(pick(STAGE_NAME[6]),
      pick(ROUND_NAME[state.round === 0 ? 5 : 6]), stopRound));
    if (state.run && GH.run) host.appendChild(GH.run.header(state.run));

    var lines = state.story.de || [];
    var box = el('div', 'wl-parts');
    lines.forEach(function(line, li){
      if (li !== state.line){ box.appendChild(el('p', 'wl-tile-s', line)); return; }
      if (!state.shattered){
        /* before start, the target sentence is the one she is reading */
        var t1 = el('div', 'wl-tile is-' + TINTS[0]);
        t1.appendChild(el('p', 'wl-tile-s', line));
        box.appendChild(t1);
        return;
      }
      /* shattered: the gap where the sentence was, filling as she taps */
      var slot = el('div', 'wl-tile is-' + TINTS[0]);
      slot.appendChild(el('p', 'wl-tile-s',
        state.placed.length ? state.placed.join(' ') + (done() ? '.' : ' …') : '…'));
      box.appendChild(slot);
    });
    host.appendChild(box);

    /* free and unlimited, in both rounds — charging for a replay would
       make this a memory test rather than a word-order one */
    var play = el('button', 'btn', '▶ ' + t('listen'));
    play.type = 'button';
    play.addEventListener('click', function(){ say((state.story.de || [])[state.line]); });
    host.appendChild(play);

    if (!state.shattered){
      var go = el('button', 'btn btn-primary', t('next'));
      go.type = 'button';
      go.addEventListener('click', function(){
        state.shattered = true;
        state.pool = shuffle(state.want);
        paintOrder();
      });
      host.appendChild(go);
      if (GH.nav) GH.nav.ready();
      return;
    }

    host.appendChild(el('div', 'wl-rule'));

    /* the words she has already placed, tappable to take back */
    if (state.placed.length){
      var back = el('div', 'wl-words');
      state.placed.forEach(function(w, i){
        var b = el('button', 'wl-w is-picked', w);
        b.type = 'button';
        b.addEventListener('click', function(){ unplace(i); });
        back.appendChild(b);
      });
      host.appendChild(back);
    }

    var pool = el('div', 'wl-words');
    var anyWide = state.pool.some(function(w){ return wide(w); });
    state.pool.forEach(function(w, i){
      var b = el('button', 'wl-w' + (anyWide ? ' is-wide' : ''), w);
      b.type = 'button';
      b.addEventListener('click', function(){ placeWord(i); });
      pool.appendChild(b);
    });
    host.appendChild(pool);
    if (GH.nav) GH.nav.ready();
  }

  function done(){ return state.placed.length === state.want.length; }

  function placeWord(i){
    var w = state.pool[i], ok = (w === state.want[state.placed.length]);
    /* the whole sentence is one item as far as the tutor is concerned —
       the word is not what is being tested here, the order is */
    record(null, ok, 'wordlab-order', w, itemId(state.want, 'o') + '.' + state.placed.length);
    if (!ok){ paintOrder(); flash(t('wrong'), 'is-no'); return; }
    state.placed.push(w);
    state.pool.splice(i, 1);
    paintOrder();
    if (done()){
      flash(t('correct'));
      say((state.story.de || [])[state.line], function(){
        setTimeout(nextOrder, 400);
      });
    }
  }

  function unplace(i){
    /* everything after it comes back too — a sentence is built left to
       right, so taking a word out of the middle would leave a hole she
       cannot fill without the same rule applying again */
    var back = state.placed.splice(i);
    state.pool = state.pool.concat(back);
    paintOrder();
  }

  /* ==================================================================
     BONUS STAGE 1 — TYPE THE WHOLE SENTENCE

     She sees the story's missing sentence, in order, and types it. Seeing
     it is the point: this is the copy pass for a whole sentence, the same
     way stage 4 round 1 is the copy pass for a word.

     Worth 20 points and two daily activities, twice a normal round.

     ------------------------------------------------------------------
     THE TOLERANCE: ONE TYPO PER THREE WORDS

     1 to 3 words allows one, 4 to 6 allows two, 7 to 9 allows three. That
     scales, which a flat "three or four typos" would not — the same
     allowance is generous on four words and mean on twelve.

     WHY A TOLERANCE HERE WHEN STAGE 4 FORGIVES NOTHING. Stage 4 types ONE
     WORD and its entire job is the spelling, so an umlaut matters. A whole
     sentence is testing word order, agreement and recall together, and
     failing all of that for one slipped key teaches nothing except that
     typing on a phone is hard. Different exercise, different standard —
     stated plainly so nobody later "fixes" the inconsistency.

     HOW A TYPO IS COUNTED. Per word, not by edit distance over the whole
     string: character distance charges 1 for `verschiben` and 11 for a
     missing `verschieben`, which is not how a person counts. So the words
     are aligned and each difference costs one — a missing word, an extra
     word, or a misspelt one. A substitution that is nowhere near the
     expected word costs two, because that is a wrong word rather than a
     slip. Word order still has to be right; that is what the exercise is
     for, and an alignment charges for a transposition.

     ------------------------------------------------------------------
     TWO GOES, THEN ROUND THE QUEUE, THEN TWO MORE

     Fail twice and the sentence goes to the back: she moves to the next
     story and types that one, and the first comes back for two more
     tries. Fail those and it counts as practice and stops asking.

     SHE IS PAID EITHER WAY. Having a real go at all three earns the full
     20 — an optional hard thing that pays nothing when you fail is one
     people stop attempting after the second miss. The percentage still
     falls, so the score is honest about how it went.
     ================================================================== */

  function startBonus(){
    state.bonusQueue = drawStories().map(function(st){
      var li = shortestLine(st);
      return { story:st, line:li, text:(st.de || [])[li], tries:0, lap:0, practice:false };
    });
    /* Clean until something needs a second lap. Bonus 2 round 1 shatters
       the sentence and shows the words; round 2 shows nothing at all. */
    state.clean = true;
    state.shattered = false;
    state.miss = null;
    nextBonus();
  }

  function nextBonus(){
    state.miss = null;
    if (!state.bonusQueue.length){ finishRound(); return; }
    state.cur = state.bonusQueue[0];
    /* Shattering belongs to bonus 2 round 1 and nowhere else. Bonus 1
       SHOWS the sentence the whole time — it is the copy pass, and hiding
       it turns it into bonus 2. Bonus 2 round 2 shows nothing at all, so
       there is nothing there to shatter either. */
    state.shattered = false;
    state.pool = null;
    paintBonus();
  }

  /* ------------------------------------------------------------------
     POINTING OUT THE MISTAKES

     A sentence inside the allowance counts as right — and she is still
     shown what was wrong with it. Passing is not the same as having typed
     it correctly, and a pass that says nothing teaches nothing.

     The expected sentence is rendered word by word with the ones she did
     not get marked. Aligned rather than compared position by position, so
     one missing word early does not mark every word after it.
     ------------------------------------------------------------------ */
  function diffWords(given, want){
    var a = tokens(given), b = tokens(want), m = a.length, n = b.length;
    var d = [], i, j;
    for (i = 0; i <= m; i++){ d[i] = []; d[i][0] = i; }
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++){
      for (j = 1; j <= n; j++){
        var same = bare(a[i - 1]) === bare(b[j - 1]);
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1,
                           d[i - 1][j - 1] + (same ? 0 : 1));
      }
    }
    var out = [];
    i = m; j = n;
    while (j > 0){
      if (i > 0 && bare(a[i - 1]) === bare(b[j - 1]) && d[i][j] === d[i - 1][j - 1]){
        out.unshift({ w:b[j - 1], bad:false }); i--; j--;
      } else if (i > 0 && d[i][j] === d[i - 1][j - 1] + 1){
        out.unshift({ w:b[j - 1], bad:true }); i--; j--;
      } else if (d[i][j] === d[i][j - 1] + 1){
        out.unshift({ w:b[j - 1], bad:true }); j--;
      } else { i--; }
    }
    return out;
  }

  function missPanel(){
    var box = el('div', 'wl-tile is-' + TINTS[3]);
    var p = el('p', 'wl-tile-s');
    diffWords(state.miss.given, state.miss.want).forEach(function(x, i){
      if (i) p.appendChild(document.createTextNode(' '));
      if (x.bad) p.appendChild(el('span', 'wl-in', x.w));
      else p.appendChild(document.createTextNode(x.w));
    });
    box.appendChild(p);
    return box;
  }

  function allowance(text){
    return Math.ceil(tokens(text).length / TYPO_PER);
  }

  /* character distance, used only to tell a slip from a different word */
  function charDist(a, b){
    a = String(a).toLowerCase(); b = String(b).toLowerCase();
    var m = a.length, n = b.length, prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++){
      cur[0] = i;
      for (j = 1; j <= n; j++){
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
                          prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  }

  function bare(w){ return String(w).toLowerCase().replace(/[.,!?;:»«"']/g, ''); }

  /* word-level alignment. Insert, delete and a near-miss substitution cost
     one each; a substitution that is not close costs two. */
  function typos(given, want){
    var a = tokens(given), b = tokens(want), m = a.length, n = b.length;
    var prev = [], cur = [], i, j, sub;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++){
      cur[0] = i;
      for (j = 1; j <= n; j++){
        if (bare(a[i - 1]) === bare(b[j - 1])) sub = prev[j - 1];
        else sub = prev[j - 1] + (charDist(bare(a[i - 1]), bare(b[j - 1])) <= 2 ? 1 : 2);
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, sub);
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  }

  function paintBonus(){
    host.textContent = '';
    var b2 = (state.stage === 8);
    host.appendChild(head(pick(STAGE_NAME[state.stage]),
      pick(ROUND_NAME[b2 ? (state.round === 0 ? 8 : 9) : 7]), stopRound));
    if (state.run && GH.run) host.appendChild(GH.run.header(state.run));

    var c = state.cur, lines = c.story.de || [];

    /* Bonus 2 round 2 shows nothing — not the story, not the sentence,
       not the words. She has the audio and that is all. */
    var blind = b2 && state.round === 1;
    if (!blind){
      var box = el('div', 'wl-parts');
      lines.forEach(function(line, li){
        if (li !== c.line){ box.appendChild(el('p', 'wl-tile-s', line)); return; }
        var tile = el('div', 'wl-tile is-' + TINTS[0]);
        /* whole before start, gone after — the sentence shatters out of
           the story and its words appear below as a reference she types
           from rather than taps */
        tile.appendChild(el('p', 'wl-tile-s', state.shattered ? '\u2026' : line));
        box.appendChild(tile);
      });
      host.appendChild(box);
    }

    /* EVERY stage replays audio, free and unlimited, and the two bonus
       stages are no exception — this one is the only prompt she has. */
    var play = el('button', 'btn' + (blind ? ' btn-primary' : ''), '\u25b6 ' + t('listen'));
    play.type = 'button';
    play.addEventListener('click', function(){ say(c.text); });
    host.appendChild(play);

    /* bonus 2 round 1: the start button, then the shattered words */
    if (b2 && state.round === 0 && !state.shattered){
      var go = el('button', 'btn btn-primary', t('next'));
      go.type = 'button';
      go.addEventListener('click', function(){
        state.shattered = true;
        state.pool = shuffle(tokens(c.text));
        paintBonus();
      });
      host.appendChild(go);
      if (GH.nav) GH.nav.ready();
      return;
    }

    host.appendChild(el('div', 'wl-rule'));

    if (b2 && state.round === 0 && state.pool){
      /* the words, shuffled and NOT tappable. This round types rather
         than taps, so they are a reference and not an answer. */
      var pool = el('div', 'wl-words');
      state.pool.forEach(function(w){
        var tile = el('button', 'wl-w', w);
        tile.type = 'button';
        tile.disabled = true;
        pool.appendChild(tile);
      });
      host.appendChild(pool);
    }

    if (state.miss) host.appendChild(missPanel());

    var wrap = el('div', 'tw-type-box');
    var input = el('input', 'tw-type-in');
    input.type = 'text';
    input.autocapitalize = 'off';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.placeholder = t('typeHere');
    input.disabled = !!state.miss;
    wrap.appendChild(input);
    host.appendChild(wrap);

    var check = el('button', 'btn btn-primary', t('check'));
    check.type = 'button';
    check.disabled = !!state.miss;
    check.addEventListener('click', function(){ answerBonus(input.value); });
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') answerBonus(input.value);
    });
    host.appendChild(check);
    if (!state.miss) setTimeout(function(){ input.focus(); }, 0);
    if (GH.nav) GH.nav.ready();
  }

  function answerBonus(given){
    var c = state.cur, n = typos(given, c.text), allow = allowance(c.text);
    var ok = n <= allow;
    record(null, ok, 'wordlab-bonus', String(given || ''), itemId(state.cur, 'x'));
    state.bonusQueue.shift();

    if (ok){
      /* Inside the allowance is a pass. It is still shown what was wrong,
         because a pass is not the same as having typed it right. */
      if (n > 0){
        state.miss = { given:given, want:c.text };
        paintBonus();
        flash(t('closeSpelling', { word:c.text }));
        setTimeout(nextBonus, 2600);
      } else {
        flash(t('correct'));
        setTimeout(nextBonus, 900);
      }
      return;
    }

    c.tries++;
    if (c.tries >= BONUS_TRIES){
      c.tries = 0;
      c.lap++;
      /* A second lap is what makes the round not clean — the five and ten
         point bonuses are for never needing one. */
      state.clean = false;
      if (c.lap >= 2){
        c.practice = true;
        state.miss = { given:given, want:c.text };
        paintBonus();
        flash(t('answerWas', { word:c.text }), 'is-no');
        setTimeout(nextBonus, 2600);
        return;
      }
      state.bonusQueue.push(c);
      state.miss = { given:given, want:c.text };
      paintBonus();
      flash(t('answerWas', { word:c.text }), 'is-no');
      setTimeout(nextBonus, 2600);
      return;
    }
    state.bonusQueue.unshift(c);
    paintBonus();
    flash(t('wrong'), 'is-no');
  }

  /* ==================================================================
     SCORING AND THE END OF A ROUND
     ================================================================== */

  /* One funnel. Every answer in here goes through it, which is what makes
     the schedule, the log, the coins and the coach all agree. The attempt
     counter is what makes the percentage a ratio of ANSWERS rather than
     of words — see the note at the top. */
  /* ---------- THE COLOURED ROUND DOES NOT SCORE ----------

     Steven: "I got a score of 100% for clicking on colored boxes, there
     should be no scoring of round 2 whatsoever. It's just a learning
     round. Only round three with no colors should have a score."

     Round 2 of stages 1 and 2 tints each word and its partner the same
     colour. A correct answer there is evidence about her eyesight, not her
     German — and it was being counted twice over: once as the round's own
     percentage, and once into the stage total that decides what she is
     paid. The uncoloured round immediately after asks the same questions
     honestly, so that is the one that counts.

     NOTHING is recorded, not merely the visible score. The tutor's
     schedule is the reason: filing a colour-matched hit as "she knows
     this" would push the word's next review further out on the strength
     of a cue that will not be there next time. A demonstration must not
     teach the scheduler anything. */
  function scoring(){
    return !((state.stage === 0 || state.stage === 1) && state.round === 1);
  }

  /* ---------- SCORED ONCE PER THING ASKED, ON THE FIRST TRY ----------

     Steven, on a round he was guessing his way through: "I was pretty lost
     and just randomly clicking and missed almost every single word except
     for maybe 2... there's no way I should have 60%. I should've had 30 or
     40% at the most."

     He is exactly right and the arithmetic shows why. Twelve words, four
     of them right first time and eight wrong-then-right, produced 12 right
     and 8 missed — 60% — because EVERY ATTEMPT was counted as its own
     answer. A word she did not know scored 50% instead of 0.

     Counting first attempts gives 4 of 12, 33%, which is what he expected
     and what actually happened.

     This is what `run.saw()` was built to do — "a question got wrong and
     then right is one answer, not two" — and Word Lab was defeating it by
     passing `'a' + attempt`, a NEW id every time, so the dedupe never
     fired. It now passes the id of the thing being asked about.

     THE ROUND IS PART OF THE ID. Stage 3 asks about the same word in both
     of its rounds — heard-to-meaning, then heard-to-sentence — and those
     are two different questions. Without the round in the key the stage
     total would dedupe them into one and the second round would score
     nothing.

     `state.right`/`state.wrong` are deduped the same way, because they
     feed the percentage on the end screen and a second, differently-wrong
     number beside the first would be worse than the bug. `clean` still
     means no wrong answer at any point, which is what it should mean. */
  var itemSeq = 0;

  function itemId(obj, prefix){
    if (!obj) return prefix + (++itemSeq);
    if (!obj.__wlid) obj.__wlid = prefix + (++itemSeq);
    return obj.__wlid;
  }

  function record(w, ok, from, chose, item){
    if (!scoring()) return;
    state.attempt++;
    state.sAttempt++;
    /* No `item` means the caller has nothing stable to offer, so it falls
       back to the old per-attempt behaviour rather than silently merging
       two different questions into one. */
    var id = state.round + ':' + (item || ('a' + state.attempt));
    if (!state.seen[id]){
      state.seen[id] = true;
      if (ok) state.right++; else state.wrong++;
    }
    if (!state.sSeen[id]){
      state.sSeen[id] = true;
      if (ok) state.sRight++; else state.sWrong++;
    }
    /* `w` is null where the item under test is not a word — a word-order
       tap is evidence about the sentence, not about any one word in it,
       and filing it under a word would corrupt that word's schedule. */
    if (GH.tutor && w && w.n) GH.tutor.grade(keyOf(w), ok, from, chose);
    if (state.run) state.run.saw(id, ok);
    if (state.stageRun) state.stageRun.saw(id, ok);
  }

  function stopRound(){
    if (state.timer) clearTimeout(state.timer);
    stopSpeech();
    paintStages();
  }

  function finishRound(){
    if (state.timer) clearTimeout(state.timer);
    stopSpeech();

    var id = 'wordlab';

    /* THE GATES OPEN HERE, before the end screen is drawn, so the button
       onward can point at a stage that has just become available.

       Finishing word order completes the achievement and opens bonus 1.
       A CLEAN bonus 1 opens bonus 2 — clean meaning every sentence inside
       its first two tries, no lap round the queue. Clean on both sets the
       mastery flag. */
    var bonus = isBonus(state.stage);
    var lastRound = state.round + 1 >= roundsIn(state.stage);
    if (lastRound) markDone(state.stage);
    if (state.stage === 6 && lastRound) openGate(GATE.b1);
    if (state.stage === 7 && state.clean) openGate(GATE.b2);
    if (state.stage === 8 && state.clean && lastRound){
      if (gateOpen(GATE.b2)) openGate(GATE.all);
    }

    /* NOTHING IS PAID UNTIL THE STAGE ENDS, and it is paid on the stage's
       own tally rather than the last round's. An intermediate round still
       gets its screen, its percentage and its button onward — it just does
       not pay, and it does not count as one of her five. */
    var units = bonus ? BONUS_UNITS : PAY_UNITS;
    var paid = (lastRound && GH.coins)
      /* `tag` is the stage, for the daily quests — Steven: "only the
         first 3 stages for word lab". 's0' to 's2' are word and meaning,
         word in a sentence, and listening; the quest lists those three,
         so typing, the story stages, word order and the bonus stages pay
         the stage normally and complete no quest. */
      ? GH.coins.award(id, state.stageRun,
          { units:units, tag:'s' + state.stage }) : null;
    var won = (lastRound && GH.awards)
      ? GH.awards.afterRound(id, state.stageRun) : [];

    /* The clean bonus is paid on top and separately: award() is the daily
       task, this is the extra for not having needed a second lap. Five for
       bonus 1, ten for bonus 2. */
    var extra = 0;
    if (bonus && state.clean && lastRound){
      extra = (state.stage === 7) ? CLEAN_B1 : CLEAN_B2;
      if (GH.coins && GH.coins.earn) GH.coins.earn(extra, 'wordlab-clean');
    }

    /* The last screen reports the STAGE, because the stage is what was
       scored. The screens before it report their own round. */
    var right = lastRound ? state.sRight : state.right;
    var wrong = lastRound ? state.sWrong : state.wrong;
    var total = right + wrong;

    /* A ROUND THAT ASKED NOTHING IS NOT SCORED AND SHOWS NO NUMBERS.

       Round 1 of stages 1 and 2 is look, read and listen. She is not asked
       to do anything, so there is no right, no wrong and no percentage —
       and printing `0 RIGHT · 0 MISSED · 0% RIGHT` under a round she could
       not have got wrong reads as a report that she failed at it.

       The screen still exists, because she needs somewhere to stop and a
       button onward. It just carries the title and the button and nothing
       else. */
    var asked = total > 0;
    var pct = asked ? Math.round(right / total * 100) : 0;
    var clean = asked && wrong === 0;

    var last = lastRound;
    var acts = [];

    /* Each round ends on its own screen with a button onward rather than
       chaining silently, so there is always somewhere to stop. Only the
       last one of a stage has paid anything. */
    if (!last){
      acts.push({ label:t('next'), kind:'primary', onClick:function(){
        state.round++; startRound();
      } });
    } else if (state.stage + 1 < STAGE_NAME.length && !shut(state.stage + 1)){
      acts.push({ label:t('next'), kind:'primary', onClick:function(){
        startStage(state.stage + 1);
      } });
    }
    acts.push({ label:t('again'), onClick:function(){ startRound(); } });
    acts.push({ label:t('toHub'), onClick:paintStages });

    host.textContent = '';
    GH.endScreen.render(host, {
      coins: paid,
      awards: won,
      tone: clean ? 'perfect' : 'done',
      glyph: clean ? '🏆' : '🧪',
      title: !asked ? t('doneBadge')
           : (clean ? t('vocabAllClean') : t('doneTitle')),
      stats: (asked && GH.run) ? GH.run.stats(lastRound ? state.stageRun : state.run) : null,
      /* Only the clean bonus goes here. The percentage does NOT: run.stats()
         already renders a `100% RIGHT` tile, and printing `100%` again on
         the line underneath it said the same thing twice. The bonus is the
         one thing the tiles cannot explain — it is why the number in her
         purse is bigger than the exercise alone would make it. */
      note: extra ? ('+' + extra) : null,
      actions: acts,
      /* A round that asked nothing (see `asked` above) has no numbers on
         this screen for the same reason it should have no coach offer:
         there is nothing here to be wrong about. Without this the coach's
         session-wide missed-word pool showed up on the watch-only round
         and the coloured round too, flagging misses from something else
         she'd played earlier as if this round had produced them. */
      showCoach: asked
    });
    if (GH.nav) GH.nav.ready();
  }

  /* ==================================================================
     ENTRY
     ================================================================== */

  function open(container, onExit){
    host = container;
    state = { onExit:onExit, stage:0, round:0, choice:null, group:null, tints:{}, rot:null, rotAt:0,
              run:null, timer:null, attempt:0, right:0, wrong:0 };
    GH.app.redraw = paintStages;
    paintStages();
  }

  var entry = {
    id:'word-lab',
    /* A LESSON, not a game. It replaces `tanya-words` and `tanya-lessons`,
       both of which were lessons, and it belongs in the Lessons row beside
       the seventeen grammar ones: a lesson is where something is learned
       and a game is where it is drilled. Registered without `kind` it
       landed in Games, which is why it was not where it was looked for. */
    kind:'lesson',
    glyph:'🧪',
    name:NAME,
    sub:SUB,
    detailHead:DETAIL_HEAD,
    detail:DETAIL,
    open:open
  };

  /* index.html loads the activities before app.js, so a bare guarded call
     registers nothing, silently. Retry once the document is ready. */
  function register(){
    if (window.GH && GH.app && GH.app.register) GH.app.register(entry);
  }
  if (window.GH && GH.app && GH.app.register) register();
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', register);
  else register();

  return { open:open, entry:entry, register:register, progress:progress,
           chunk:chunk, categories:categories, typedOk:typedOk,
           typos:typos, allowance:allowance, diffWords:diffWords,
           /* read-only, for the test harness: bonus 2 round 2 shows
              nothing, so nothing on screen says what to type */
           peek:function(){ return (state && state.cur) ? state.cur.text : null; } };
})();
