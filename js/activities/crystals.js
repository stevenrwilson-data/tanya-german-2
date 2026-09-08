/* js/activities/crystals.js */
/* Crystals — where they came from and how to get more.

   Steven's four things, in his order: current balance, recent earning
   history, records, and ways to earn more.

   ------------------------------------------------------------------
   IT STATES THE ECONOMY, IT DOES NOT DESCRIBE IT

   Every number on this page is read out of `GH.coins.rates` and
   `GH.coins.passRules()` at paint time. Not one of them is typed into
   this file. That is the whole point: the achievements page already
   learned this lesson the hard way — a screen that explains the rules in
   prose is a screen that lies the first time the rules change, and
   nobody notices because prose does not throw.

   So if the daily bonus moves from 100 to 120, this page says 120 the
   next time it is opened, with no edit here.

   ------------------------------------------------------------------
   THE SEVEN DAYS ARE REAL DAYS

   `GH.coins.days(7)` returns a row per date ending today, whether or not
   she practised — a week with Wednesday missing renders as a gap and not
   as a six-day week. Today is live rather than archived, because the day
   has not rolled yet.

   The bars are CSS heights on a fixed baseline, not a charting library:
   seven numbers do not need one, and the app has no chart anywhere else
   to be consistent with.

   ------------------------------------------------------------------
   RECORDS ARE HONEST ABOUT THEIR WINDOW

   "Best ever" is the best day in `coins.js`'s archive, which is capped at
   120 days. That is four months, so it is true today and will quietly
   stop being true if she plays past it. Said here so the next person
   knows it is a known bound and not a bug.

   ------------------------------------------------------------------
   NOT BUILT: THE DAILY BONUS OFFERS

   Steven's examples — "Complete 3 different games today for +50", "Finish
   one Reader piece for +40", "Practice 10 due words for +30" — are the
   piece that makes this page active rather than historical, and they are
   deliberately absent until he settles four things: what is on offer,
   where the numbers come from, whether she taps to accept or it pays
   automatically, and whether an unclaimed offer expires at midnight.

   `GH.coins.setStarterBonus()` is most of the machinery already: the
   butler's tour promises a bonus, it survives the trip, and it pays
   itself the next time she finishes a round of the matching kind. When
   the offers are specced they should use it rather than grow a second
   promise-and-pay mechanism beside it.
*/

window.GH = window.GH || {};

GH.crystals = (function(){

  var host = null;
  var state = null;

  function t(k, v){ return GH.i18n.t(k, v); }
  function lang(){ return GH.i18n ? GH.i18n.lang() : 'en'; }

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

  /* The currency's mark comes from coins.js — the module that owns the
     currency owns its symbol. `mark()` is the mark alone and
     `markWith(n)` is the mark plus a number, both elements; nothing in
     this file writes the character out, so replacing the art is one edit
     in one file. */
  function mk(n){ return GH.coins.markWith(n); }
  function mkOnly(cls){ return GH.coins.mark(cls); }

  /* Labels local to this screen, with de and ru waiting for Steven —
     `pick()` falls back to English until he fills them. Kept here rather
     than in i18n.js so the whole screen's text is one block to translate
     rather than twelve keys scattered through a 238KB file. */
  var TXT = {
    title:     { en:'Crystals', de:'Kristalle', ru:'Кристаллы' },

    /* The section's own explanation, Steven's text. */
    sub:       { en:'You earn crystals by learning and practising German around the site. See how many crystals you have now, how many you\u2019ve earned recently, and your best earning days.',
                 de:'Du verdienst Kristalle, indem du auf der Seite Deutsch lernst und übst. Hier siehst du, wie viele Kristalle du gerade hast, wie viele du in letzter Zeit verdient hast und an welchen Tagen du am meisten verdient hast.',
                 ru:'Ты получаешь кристаллы, изучая и практикуя немецкий в разных разделах сайта. Здесь можно увидеть, сколько кристаллов у тебя сейчас, сколько ты заработала за последнее время и в какие дни заработала больше всего.' },

    /* The dashboard labels, from his table. `Your crystals` is
       "Твои кристаллы" per his own correction to it — the first draft had
       the German in the Russian column. */
    have:      { en:'Your crystals',       de:'Deine Kristalle',   ru:'Твои кристаллы' },
    week:      { en:'Last 7 days',         de:'Letzte 7 Tage',     ru:'Последние 7 дней' },
    earned:    { en:'Crystals earned',     de:'Verdiente Kristalle', ru:'Заработано кристаллов' },
    bestWeek:  { en:'Best day this week',  de:'Bester Tag diese Woche',  ru:'Лучший день за неделю' },
    bestMonth: { en:'Best day this month', de:'Bester Tag diesen Monat', ru:'Лучший день за месяц' },
    bestEver:  { en:'Best day ever',       de:'Bester Tag aller Zeiten', ru:'Лучший день за всё время' },

    earnedAll: { en:'Earned in total', de:'Insgesamt verdient', ru:'Всего заработано' },
    weekNone:  { en:'Nothing earned yet this week.', de:'Diese Woche noch nichts verdient.', ru:'На этой неделе пока ничего не заработано.' },
    records:   { en:'Records', de:'Rekorde', ru:'Рекорды' },
    noRecord:  { en:'Not yet', de:'Noch nicht', ru:'Пока нет' },
    ways:      { en:'Ways to earn crystals', de:'So verdienst du Kristalle', ru:'Как заработать кристаллы' },
    wEx:       { en:'Finish an exercise', de:'Eine Übung abschließen', ru:'Выполнить упражнение' },
    wFull:     { en:'A full day', de:'Ein voller Tag', ru:'Полный день' },
    wFullNote: { en:'{n} exercises in one day, and the bonus on top.', de:'{n} Übungen an einem Tag, plus Bonus obendrauf.', ru:'{n} упражнений за один день плюс дополнительный бонус.' },
    wDue:      { en:'Practise a word that is due', de:'Ein fälliges Wort üben', ru:'Повторить слово, которое пора повторить' },
    wDueNote:  { en:'The first one each day is worth more.', de:'Das erste jeden Tag bringt mehr.', ru:'Первое такое слово за день приносит больше.' },
    wAward:    { en:'Earn an achievement', de:'Eine Auszeichnung verdienen', ru:'Получить достижение' },
    wAwardNote:{ en:'{got} of {all} earned, worth {left} more.', de:'{got} von {all} erreicht, noch {left} weitere Kristalle möglich.', ru:'Получено {got} из {all}, можно заработать ещё {left} кристаллов.' },
    wPass:     { en:'Keep a streak', de:'Eine Serie halten', ru:'Поддерживать серию' },
    wPassNote: { en:'One skip pass every {every} days in a row. It covers {covers} missed days, or is worth {cash} if you already have {cap}.', de:'Alle {every} Tage in Folge bekommst du einen Pausentag. Er deckt {covers} verpasste Tage ab oder bringt dir {cash}, wenn du bereits {cap} hast.', ru:'За каждые {every} дней подряд ты получаешь один пропуск. Он покрывает {covers} пропущенных дней или приносит {cash}, если у тебя уже есть {cap}.' },
    full:      { en:'full day', de:'voller Tag', ru:'полный день' },

    quests:    { en:'Crystal Quests', de:'Kristall-Aufgaben', ru:'Задания с кристаллами' },

    /* Steven's text. It says WHY the quests are level-appropriate without
       listing the fence — she does not need to know that articles are
       excluded, only that nothing will be too hard. */
    questSub:  { en:'Every day, your Crystal Quests send you to different parts of the site to earn bonus crystals while practising German. Quests are chosen from activities that fit your level, so harder material won\u2019t appear before you\u2019re ready for it.',
                 de:'Jeden Tag schicken dich deine Kristall-Aufgaben zu verschiedenen Übungen auf der Seite. Dabei übst du Deutsch und verdienst zusätzliche Kristalle. Die Aufgaben passen zu deinem Niveau, damit schwierigere Inhalte erst erscheinen, wenn du dafür bereit bist.',
                 ru:'Каждый день задания с кристаллами предлагают тебе разные упражнения на сайте. Выполняй их, практикуй немецкий и получай дополнительные кристаллы. Задания подбираются по твоему уровню, поэтому слишком сложный материал не появится раньше времени.' },

    questNote: { en:'{pay} each, and {all} more for finishing all {n}.', de:'Je {pay}, plus weitere {all}, wenn du alle {n} abschließt.', ru:'По {pay} за каждое, плюс ещё {all}, если выполнишь все {n}.' },
    questAll:  { en:'All done \u2014 bonus paid.', de:'Alles geschafft — Bonus erhalten.', ru:'Всё выполнено — бонус получен.' },
    questOf:   { en:'{got} of {need}', de:'{got} von {need}', ru:'{got} из {need}' },
    toStore:   { en:'Spend them in the store', de:'Im Shop ausgeben', ru:'Потратить их в магазине' }
  };

  /* ---------- ART, FROM THE SHEETS THAT ALREADY EXIST ----------

     Steven: "These can be vocabulary but they are also going to be used
     as the game currency. I'll pick some for the top of the crystals
     section, and some can be occasional bonus crystal quests."

     So the art is NOT separate image files. The eighteen crystals landed
     in data/gallery.js as two 3x3 sheets — crystals-01 and crystals-02 —
     and `GH.sprite.cell(sheet, pos)` crops any one cell out of either.
     One set of pictures doing both jobs: taught as words in the gallery,
     shown as currency here. Nothing is duplicated, nothing is copied, and
     a redrawn sheet updates both at once.

     PICK BY NUMBER. `sheet` and `pos` below are the only things to change
     — pos is 1 to 9 in reading order, so crystals-01 pos 9 is the
     amethyst geode and crystals-02 pos 4 is the amethyst. Steven's picks
     go here; the two below are placeholders chosen for looking like
     treasure rather than for any reason he has given.

     `head` is the banner at the top. `questOpen` and `questDone` are the
     small crystal beside a quest row — set either to null for none.

     A sheet that has not been drawn yet shows the word instead of an
     empty box, which is sprite.js's own behaviour and the right one: it
     is legible and obviously a placeholder. */
  var ART = {
    head:      { sheet:'crystals-01', pos:9 },   /* amethyst geode */
    questOpen: null,
    questDone: { sheet:'crystals-02', pos:4 }    /* amethyst */
  };

  /* One cell out of a gallery sheet, or null when nothing is configured.
     `cell()` is sprite.js's named-sheet door — the same one the gallery's
     own screens use — so this needs no image path and no fallback of its
     own. */
  function crystalPic(spec, cls, label){
    if (!spec || !spec.sheet || !GH.sprite || !GH.sprite.cell) return null;
    var box = el('div', cls);
    box.appendChild(GH.sprite.cell(spec.sheet, spec.pos, label || ''));
    return box;
  }

  /* The word for a configured cell, so the banner can name the crystal it
     is showing rather than being decoration. Read out of the gallery, in
     her language, so it needs no second copy of the eighteen names. */
  function crystalWord(spec){
    if (!spec || !window.GH_GALLERY) return null;
    var G = window.GH_GALLERY, i, g;
    for (i = 0; i < G.length; i++){
      g = G[i];
      if (g.sheet === spec.sheet && g.pos === spec.pos) return g;
    }
    return null;
  }

  function coins(){ return GH.coins; }

  /* ---------- the balance ---------- */

  function balanceBlock(){
    var card = el('div', 'card cr-top');

    var big = el('div', 'cr-have');
    big.appendChild(mkOnly('cr-have-mark'));
    big.appendChild(el('span', 'cr-have-n', String(coins().balance())));
    card.appendChild(big);
    card.appendChild(el('p', 'cr-have-l', pick(TXT.have)));

    /* Lifetime, so the balance is not the only number she ever sees —
       spending it to zero should not read as having achieved nothing. */
    var life = coins().lifetime();
    if (life){
      var sub = el('p', 'cr-life');
      var lifeN = el('span', 'cr-life-n');
      lifeN.appendChild(mk(life));
      sub.appendChild(lifeN);
      sub.appendChild(el('span', 'cr-life-l', pick(TXT.earnedAll)));
      card.appendChild(sub);
    }
    return card;
  }

  /* ---------- the week ---------- */

  /* Short weekday names from the platform rather than a table of our own,
     so they arrive in her language for free and correctly for languages
     nobody has thought about yet. */
  function dayName(dayStr){
    var d = new Date(dayStr);
    try {
      return d.toLocaleDateString(lang(), { weekday:'short' });
    } catch (e){
      return dayStr.slice(0, 3);
    }
  }

  function weekBlock(){
    var card = el('div', 'card');
    card.appendChild(el('h2', 'cr-h', pick(TXT.week)));

    var rows = coins().days(7);
    var top = 0, sum = 0;
    rows.forEach(function(r){ sum += r.coins; if (r.coins > top) top = r.coins; });

    /* The week's total, under its heading. His label, and the number the
       heading was otherwise leaving her to add up herself. */
    if (sum){
      var tot = el('p', 'cr-life');
      var sumN = el('span', 'cr-life-n');
      sumN.appendChild(mk(sum));
      tot.appendChild(sumN);
      tot.appendChild(el('span', 'cr-life-l', pick(TXT.earned)));
      card.appendChild(tot);
    }

    if (!top){
      card.appendChild(el('p', 'cr-none', pick(TXT.weekNone)));
      return card;
    }

    var chart = el('div', 'cr-chart');
    rows.forEach(function(r){
      var col = el('div', 'cr-col' + (r.today ? ' is-today' : ''));

      /* The number above the bar, not inside it: inside, a small bar has
         no room for its own label and a zero has no bar at all. */
      col.appendChild(el('span', 'cr-col-n', r.coins ? String(r.coins) : ''));

      var track = el('div', 'cr-track');
      var bar = el('div', 'cr-bar' + (r.full ? ' is-full' : ''));
      /* A minimum of 3% so a day with one exercise is visibly not zero. */
      bar.style.height = r.coins ? Math.max(3, Math.round(r.coins / top * 100)) + '%' : '0';
      if (r.full) bar.title = pick(TXT.full);
      track.appendChild(bar);
      col.appendChild(track);

      col.appendChild(el('span', 'cr-col-d', dayName(r.day)));
      chart.appendChild(col);
    });
    card.appendChild(chart);
    return card;
  }

  /* The way out to the store.

     The header balance used to open the store directly; it opens this
     screen now, so this is what keeps spending reachable. Directly under
     the balance, because that is the moment she is looking at a number
     and deciding whether it is enough for anything. */
  function storeLink(){
    var b = el('button', 'btn btn-primary cr-store', pick(TXT.toStore));
    b.type = 'button';
    b.addEventListener('click', function(){
      if (!GH.app || !GH.app.play || !GH.store) return;
      GH.speech && GH.speech.stop();
      GH.app.play({ id:'store', open:GH.store.open });
    });
    return b;
  }

  /* ---------- the daily quests ----------

     Steven's numbers, read from GH.questDay.rules() rather than written
     here, for the same reason none of the economy is written here.

     The quests are NOT completed from this screen. She finishes them by
     doing the thing, wherever that lives; coins.award() notices and pays.
     So these rows are a checklist and not buttons — a tappable quest
     would imply this page is where the work happens. */
  function questBlock(){
    var card = el('div', 'card');
    card.appendChild(el('h2', 'cr-h', pick(TXT.quests)));

    card.appendChild(el('p', 'cr-quest-sub', pick(TXT.questSub)));

    var r = GH.questDay.rules();
    card.appendChild(el('p', 'cr-way-s',
      fill(pick(TXT.questNote), { pay:r.pay, all:r.all, n:r.perDay })));

    var list = GH.questDay.todays();
    list.forEach(function(q){
      var row = el('div', 'cr-quest' + (q.done ? ' is-done' : ''));
      var pic = crystalPic(q.done ? ART.questDone : ART.questOpen,
                           'cr-quest-pic');
      if (pic) row.appendChild(pic);
      row.appendChild(el('span', 'cr-quest-mark', q.done ? '\u2713' : '\u25cb'));
      row.appendChild(el('span', 'cr-quest-l', pick(q.label)));
      /* "1 of 2" while a multi-step quest is under way. Nothing shown on
         a one-step quest, where the tick already says everything. */
      if (q.need > 1 && !q.done){
        row.appendChild(el('span', 'cr-quest-of',
          fill(pick(TXT.questOf), { got:q.got, need:q.need })));
      }
      var qp = el('span', 'cr-quest-pay');
      qp.appendChild(mk(r.pay));
      row.appendChild(qp);
      card.appendChild(row);
    });

    if (GH.questDay.allDone()){
      card.appendChild(el('p', 'cr-quest-all', pick(TXT.questAll)));
    }
    return card;
  }

  /* ---------- records ---------- */

  function recordRow(label, best){
    var row = el('div', 'cr-rec');
    row.appendChild(el('span', 'cr-rec-l', label));
    if (best){
      var v = el('span', 'cr-rec-v');
      var recN = el('span', 'cr-rec-n');
      recN.appendChild(mk(best.coins));
      v.appendChild(recN);
      v.appendChild(el('span', 'cr-rec-d', dayName(best.day)));
      row.appendChild(v);
    } else {
      row.appendChild(el('span', 'cr-rec-none', pick(TXT.noRecord)));
    }
    return row;
  }

  function recordsBlock(){
    var card = el('div', 'card');
    card.appendChild(el('h2', 'cr-h', pick(TXT.records)));
    card.appendChild(recordRow(pick(TXT.bestWeek),  coins().bestDay(7)));
    card.appendChild(recordRow(pick(TXT.bestMonth), coins().bestDay(30)));
    card.appendChild(recordRow(pick(TXT.bestEver), coins().bestDay(0)));
    return card;
  }

  /* ---------- ways to earn ---------- */

  function wayRow(n, label, note){
    var row = el('div', 'cr-way');
    var pay = el('span', 'cr-way-pay');
    pay.appendChild(mkOnly('cr-way-mark'));
    pay.appendChild(el('span', 'cr-way-n', n));
    row.appendChild(pay);
    var body = el('span', 'cr-way-body');
    body.appendChild(el('span', 'cr-way-l', label));
    if (note) body.appendChild(el('span', 'cr-way-s', note));
    row.appendChild(body);
    return row;
  }

  function waysBlock(){
    var card = el('div', 'card');
    card.appendChild(el('h2', 'cr-h', pick(TXT.ways)));

    var r = coins().rates;

    card.appendChild(wayRow(r.per, pick(TXT.wEx)));

    card.appendChild(wayRow(r.fullDay, pick(TXT.wFull),
      t ? fill(pick(TXT.wFullNote), { n:r.target }) : ''));

    card.appendChild(wayRow(r.dueFirst, pick(TXT.wDue), pick(TXT.wDueNote)));

    /* Achievements, with how much is still unclaimed — a list of rules is
       less use than a number she has not collected yet. */
    if (GH.awards && GH.awards.all){
      var all = GH.awards.all();
      var got = all.filter(function(a){ return a.got; });
      var left = all.filter(function(a){ return !a.got; })
                    .reduce(function(x, a){ return x + a.pay; }, 0);
      card.appendChild(wayRow(left, pick(TXT.wAward),
        fill(pick(TXT.wAwardNote),
             { got:got.length, all:all.length, left:left })));
    }

    if (coins().passRules){
      var pr = coins().passRules();
      card.appendChild(wayRow(pr.cash, pick(TXT.wPass),
        fill(pick(TXT.wPassNote),
             { every:pr.every, covers:pr.covers, cash:pr.cash, cap:pr.cap })));
    }

    return card;
  }

  /* {token} substitution, because these strings live in this file's own
     table rather than in i18n.js where t() would do it. */
  function fill(s, vals){
    var out = String(s || ''), k;
    for (k in vals){
      if (vals.hasOwnProperty(k)) out = out.split('{' + k + '}').join(vals[k]);
    }
    return out;
  }

  /* ---------- the screen ---------- */

  function paint(){
    host.textContent = '';

    var headBar = el('div', 'practice-head');
    var back = GH.back.button(function(){ state.onExit(); });
    headBar.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, pick(TXT.title)));
    titles.appendChild(el('p', null, pick(TXT.sub)));
    headBar.appendChild(titles);
    host.appendChild(headBar);

    if (!coins()){
      if (GH.nav) GH.nav.ready();
      return;
    }

    var w = crystalWord(ART.head);
    var banner = crystalPic(ART.head, 'cr-banner', w ? (w.de || w.en) : '');
    if (banner){
      host.appendChild(banner);
      /* Named, because it is a vocabulary word as well as a picture and
         showing it unlabelled would waste half of what it is. */
      if (w && w.de){
        var cap = el('p', 'cr-banner-cap');
        cap.appendChild(el('span', 'cr-banner-de', w.de));
        var gloss = w[lang()] || w.en || '';
        if (gloss && lang() !== 'de') cap.appendChild(el('span', 'cr-banner-gl', gloss));
        host.appendChild(cap);
      }
    }

    host.appendChild(balanceBlock());
    host.appendChild(storeLink());
    if (GH.questDay) host.appendChild(questBlock());
    host.appendChild(weekBlock());
    host.appendChild(recordsBlock());
    host.appendChild(waysBlock());

    if (GH.nav) GH.nav.ready();
  }

  function open(container, onExit){
    host = container;
    state = { onExit:onExit };
    /* Achievements can become true just by being asked about, and the
       unclaimed total below depends on that being current. */
    if (GH.awards && GH.awards.check) GH.awards.check();
    GH.app.redraw = paint;
    paint();
  }

  var entry = {
    id:'crystals',
    /* Reference, beside Progress and Achievements: it reports on what she
       has done rather than asking anything of her. Steven's call for the
       Table of Contents is that it is a main entry there in its own
       right, not filed under Store. */
    kind:'ref',

    /* THE LONG DESCRIPTION, Steven's own, three languages.

       Shown behind the `+` in the game guide and available to the Table of
       Contents. His source document also carried notes ABOUT the table of
       contents — "Crystals should be treated as its own major section" and
       an arrow diagram of the reward loop. Those are instructions to
       whoever builds the TOC, not sentences Tanya reads, so they are not
       here; only the descriptive text is.

       ONE CLAIM IN HERE IS AHEAD OF THE CODE, deliberately left as he
       wrote it and flagged rather than quietly softened: the quests are
       drawn at RANDOM each day, seeded on the date and the profile, and
       nothing remembers yesterday's draw. So the pool of 21 does spread
       over weeks, but the same quest can appear two days running. Making
       "leads you through many different kinds of activity" strictly true
       needs a skip-what-she-had-recently rule in js/questday.js. */
    detail:{ en:'Crystals is the central section for the reward system and the site\'s currency. It shows your balance and how crystals are earned by learning and completing activities around the site. Crystal Quests are here too: bonus challenges drawn at random from across the site, which earn extra crystals and encourage you to explore parts you have not used yet. Quests can involve reading, vocabulary, listening, pronunciation, grammar, Word Lab, sentence exercises, games, dialogues, comics and songs. From here you can go straight to the Store and spend what you have earned.',
             de:'Kristalle ist der zentrale Bereich für das Belohnungssystem und die Währung der Website. Er zeigt dein Guthaben und wie Kristalle verdient werden, indem du lernst und Aktivitäten auf der Website abschließt. Auch die Kristall-Quests sind hier: zusätzliche Lernaufgaben, zufällig aus der ganzen Website ausgewählt, die Bonus-Kristalle einbringen und dazu anregen, Bereiche zu entdecken, die du noch nicht genutzt hast. Quests können Lesen, Wortschatz, Hörverständnis, Aussprache, Grammatik, Word Lab, Satzübungen, Lernspiele, Dialoge, Comics und Lieder umfassen. Von hier gelangst du direkt zum Shop und kannst verwenden, was du verdient hast.',
             ru:'«Кристаллы» — центральный раздел системы наград и валюта сайта. Здесь показан твой баланс и то, как зарабатывать кристаллы, изучая немецкий и выполняя задания на сайте. Кристальные задания тоже здесь: дополнительные учебные задания, выбираемые случайно из разных частей сайта, — они приносят бонусные кристаллы и побуждают открывать разделы, которыми ты ещё не пользовалась. Задания могут быть связаны с чтением, словарным запасом, аудированием, произношением, грамматикой, Word Lab, упражнениями с предложениями, играми, диалогами, комиксами и песнями. Отсюда можно сразу перейти в Магазин и потратить заработанное.' },
    /* A glyph STRING, not the element — the hub's tile() takes text, and
       so does the game guide's card. Read from coins.js at registration
       time so it is still the one source. */
    glyph:(window.GH && GH.coins && GH.coins.markText) ? GH.coins.markText() : '\u25c8',
    name:{ en:'Crystals', de:'Kristalle', ru:'Кристаллы' },
    sub:{ en:'What you have, and how to earn more',
          de:'Was du hast und wie du mehr verdienst',
          ru:'Сколько у тебя есть и как заработать больше' },
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

  return { open:open, entry:entry, register:register };
})();
