/* data/en-commands.js */
/* Commands — base verb, Don't, Be, please, Let's.

   Worth a lesson. Deliberately not worth a fat bank.

   Why it belongs
   --------------
   The site already talks to her in the imperative — Open. Listen. Tap.
   And so does Berlin: Sit down. Wait here. Don't run. A short lesson
   pays for itself on the next game screen.

   Why it stays thin
   -----------------
   English commands have almost no machinery:

     Open the window.          base verb, no subject
     Don't open the window.    Don't + base
     Be careful.               BE has its own imperative
     Please wait.              same command, softer
     Let's go.                 both of you, not her

   Russian already has a clean imperative (открой / не открывай). German
   has two (mach / machen Sie). The English facts are the missing subject
   and the Don't. That is one read, one sort, a couple of picks, one type.

   GPT's additions, 09 Sep, both folded in
   ---------------------------------------
   BE commands got their own family. Grok mentioned "Don't be late" in
   passing but never taught the pattern, and a learner will otherwise
   reach for `are` or a conjugated form — Be careful is not something
   Russian or German morphology predicts.

   Let's not is in, against Grok's exclusion. It costs one row per verb
   once Let's exists, and "Let's not tell Tanya yet" is a sentence she
   will want.

   The German subtitle was "Tu es. Tu es nicht. Lass uns.", which is
   stilted; it is "Mach es. Mach es nicht. Lass uns." now.

   Left out: could you, would you, would you mind, third-person commands
   (Somebody call Tanya). Those are politeness and requests, not
   commands, and they are their own material. */

window.GH_EN_COMMANDS = {

  title: { en:'Commands', de:'Aufforderungen', ru:'Повелительное наклонение' },
  sub:   { en:'Do it. Don\u2019t do it. Let\u2019s.',
           de:'Mach es. Mach es nicht. Lass uns.',
           ru:'Сделай. Не делай. Давай.' },

  lede: {
    en:'A command is the base verb with no I, you or she in front of it. Don\u2019t turns it off. Be is the one verb with its own command form. Please makes it softer, and Let\u2019s is for both of you.',
    de:'Ein Befehl ist das Verb in der Grundform, ohne I, you oder she davor. Don\u2019t schaltet ihn aus. Be ist das eine Verb mit eigener Befehlsform. Please macht ihn weicher, und Let\u2019s gilt für euch beide.',
    ru:'Команда — начальная форма глагола, без I, you или she перед ним. Don\u2019t её отменяет. У be своя форма команды. Please смягчает, а Let\u2019s — для вас двоих.'
  },

  families: [
    { id:'do',     mark:'base verb',
      title:{ en:'Do it', de:'Mach es', ru:'Сделай' },
      note: { en:'The base verb, and no subject at all.',
              de:'Das Verb in der Grundform, und kein Subjekt.',
              ru:'Начальная форма глагола, и никакого подлежащего.' } },
    { id:'dont',   mark:'Don\u2019t + base verb',
      title:{ en:'Don\u2019t do it', de:'Mach es nicht', ru:'Не делай' },
      note: { en:'Don\u2019t in front, and the verb does not change.',
              de:'Don\u2019t davor, und das Verb bleibt gleich.',
              ru:'Don\u2019t впереди, а глагол не меняется.' } },
    { id:'be',     mark:'Be / Don\u2019t be',
      title:{ en:'BE has its own command', de:'BE hat seine eigene Befehlsform', ru:'У BE своя форма' },
      note: { en:'Not are, not is — just Be. And Don\u2019t be for the negative.',
              de:'Nicht are, nicht is — einfach Be. Und Don\u2019t be für die Verneinung.',
              ru:'Не are и не is — просто Be. А для отрицания Don\u2019t be.' } },
    { id:'please', mark:'please',
      title:{ en:'Softer', de:'Höflicher', ru:'Мягче' },
      note: { en:'Please goes at the front or the end. The command itself does not change.',
              de:'Please steht vorn oder am Ende. Der Befehl selbst ändert sich nicht.',
              ru:'Please ставится в начало или в конец. Сама команда не меняется.' } },
    { id:'lets',   mark:'Let\u2019s / Let\u2019s not',
      title:{ en:'Both of you', de:'Ihr beide', ru:'Вы вдвоём' },
      note: { en:'Let\u2019s + base verb includes the speaker. Let\u2019s not is the negative.',
              de:'Let\u2019s + Grundform schließt den Sprecher mit ein. Let\u2019s not ist die Verneinung.',
              ru:'Let\u2019s + начальная форма включает и говорящего. Отрицание — Let\u2019s not.' } }
  ],

  items: [
    /* ---------- base verb ---------- */
    { id:'ec01', kind:'do', en:'Open the window.', de:'Mach das Fenster auf.', ru:'Открой окно.' },
    { id:'ec02', kind:'do', en:'Close the door.',  de:'Mach die Tür zu.',      ru:'Закрой дверь.' },
    { id:'ec03', kind:'do', en:'Sit down.',        de:'Setz dich.',            ru:'Садись.' },
    { id:'ec04', kind:'do', en:'Come here.',       de:'Komm her.',             ru:'Иди сюда.' },
    { id:'ec05', kind:'do', en:'Wait.',            de:'Warte.',                ru:'Подожди.' },
    { id:'ec06', kind:'do', en:'Listen.',          de:'Hör zu.',               ru:'Слушай.' },
    { id:'ec07', kind:'do', en:'Look.',            de:'Schau.',                ru:'Смотри.' },
    { id:'ec08', kind:'do', en:'Take the bus.',    de:'Nimm den Bus.',         ru:'Садись на автобус.' },
    { id:'ec09', kind:'do', en:'Eat the apple.',   de:'Iss den Apfel.',        ru:'Ешь яблоко.' },
    { id:'ec10', kind:'do', en:'Call Tanya.',      de:'Ruf Tanya an.',         ru:'Позвони Тане.' },
    { id:'ec11', kind:'do', en:'Help Nazar.',      de:'Hilf Nazar.',           ru:'Помоги Назару.' },
    { id:'ec12', kind:'do', en:'Wash your hands.', de:'Wasch dir die Hände.',  ru:'Помой руки.' },
    { id:'ec13', kind:'do', en:'Put the phone on the table.', de:'Leg das Handy auf den Tisch.', ru:'Положи телефон на стол.' },
    { id:'ec14', kind:'do', en:'Give me the book.', de:'Gib mir das Buch.',    ru:'Дай мне книгу.' },
    { id:'ec15', kind:'do', en:'Wait outside.',    de:'Warte draußen.',        ru:'Подожди на улице.' },

    /* ---------- Don't ---------- */
    { id:'ec16', kind:'dont', en:'Don\u2019t run.',              de:'Lauf nicht.',                ru:'Не беги.' },
    { id:'ec17', kind:'dont', en:'Don\u2019t open the window.',  de:'Mach das Fenster nicht auf.', ru:'Не открывай окно.' },
    { id:'ec18', kind:'dont', en:'Don\u2019t eat that.',         de:'Iss das nicht.',             ru:'Не ешь это.' },
    { id:'ec19', kind:'dont', en:'Don\u2019t wait.',             de:'Warte nicht.',               ru:'Не жди.' },
    { id:'ec20', kind:'dont', en:'Don\u2019t call him.',         de:'Ruf ihn nicht an.',          ru:'Не звони ему.' },
    { id:'ec21', kind:'dont', en:'Don\u2019t touch that.',       de:'Fass das nicht an.',         ru:'Не трогай это.' },
    { id:'ec22', kind:'dont', en:'Don\u2019t worry.',            de:'Mach dir keine Sorgen.',     ru:'Не волнуйся.' },
    { id:'ec23', kind:'dont', en:'Don\u2019t forget the bread.', de:'Vergiss das Brot nicht.',    ru:'Не забудь хлеб.' },

    /* ---------- BE, GPT's addition ---------- */
    { id:'ec24', kind:'be', en:'Be careful.',          de:'Sei vorsichtig.',   ru:'Будь осторожна.', ruM:'Будь осторожен.' },
    { id:'ec25', kind:'be', en:'Be quiet.',            de:'Sei still.',        ru:'Тише.' },
    { id:'ec26', kind:'be', en:'Be patient.',          de:'Sei geduldig.',     ru:'Потерпи.' },
    { id:'ec27', kind:'be', en:'Be here at seven.',    de:'Sei um sieben hier.', ru:'Будь здесь в семь.' },
    { id:'ec28', kind:'be', en:'Don\u2019t be late.',  de:'Komm nicht zu spät.', ru:'Не опаздывай.' },
    { id:'ec29', kind:'be', en:'Don\u2019t be afraid.', de:'Hab keine Angst.', ru:'Не бойся.' },
    { id:'ec30', kind:'be', en:'Don\u2019t be silly.', de:'Sei nicht albern.', ru:'Не глупи.' },
    { id:'ec31', kind:'be', en:'Don\u2019t be angry.', de:'Sei nicht böse.',   ru:'Не злись.' },

    /* ---------- please ---------- */
    { id:'ec32', kind:'please', en:'Please wait.',                 de:'Bitte warte.',               ru:'Подожди, пожалуйста.' },
    { id:'ec33', kind:'please', en:'Please sit down.',             de:'Bitte setz dich.',           ru:'Садись, пожалуйста.' },
    { id:'ec34', kind:'please', en:'Please help Nazar.',           de:'Bitte hilf Nazar.',          ru:'Помоги Назару, пожалуйста.' },
    { id:'ec35', kind:'please', en:'Open the window, please.',     de:'Mach bitte das Fenster auf.', ru:'Открой окно, пожалуйста.' },
    { id:'ec36', kind:'please', en:'Please don\u2019t touch that.', de:'Fass das bitte nicht an.',  ru:'Пожалуйста, не трогай это.' },

    /* ---------- Let's, and Let's not ---------- */
    { id:'ec37', kind:'lets', en:'Let\u2019s go.',                  de:'Lass uns gehen.',            ru:'Пойдём.' },
    { id:'ec38', kind:'lets', en:'Let\u2019s eat.',                 de:'Lass uns essen.',            ru:'Давай есть.' },
    { id:'ec39', kind:'lets', en:'Let\u2019s wait here.',           de:'Lass uns hier warten.',      ru:'Давай подождём здесь.' },
    { id:'ec40', kind:'lets', en:'Let\u2019s call Tanya.',          de:'Lass uns Tanya anrufen.',    ru:'Давай позвоним Тане.' },
    { id:'ec41', kind:'lets', en:'Let\u2019s not go.',              de:'Lass uns nicht gehen.',      ru:'Давай не пойдём.' },
    { id:'ec42', kind:'lets', en:'Let\u2019s not wait.',            de:'Lass uns nicht warten.',     ru:'Давай не будем ждать.' },
    { id:'ec43', kind:'lets', en:'Let\u2019s not tell Tanya yet.',  de:'Lass es Tanya noch nicht sagen.', ru:'Давай пока не будем говорить Тане.' },
    { id:'ec44', kind:'lets', en:'Let\u2019s not argue.',           de:'Lass uns nicht streiten.',   ru:'Давай не будем спорить.' }
  ],

  /* The same verb, on and off. */
  pairs: [
    { do:{ en:'Open the window.', de:'Mach das Fenster auf.', ru:'Открой окно.' },
      dont:{ en:'Don\u2019t open the window.', de:'Mach das Fenster nicht auf.', ru:'Не открывай окно.' } },
    { do:{ en:'Wait.', de:'Warte.', ru:'Подожди.' },
      dont:{ en:'Don\u2019t wait.', de:'Warte nicht.', ru:'Не жди.' } },
    { do:{ en:'Call Tanya.', de:'Ruf Tanya an.', ru:'Позвони Тане.' },
      dont:{ en:'Don\u2019t call Tanya.', de:'Ruf Tanya nicht an.', ru:'Не звони Тане.' } },
    { do:{ en:'Eat the apple.', de:'Iss den Apfel.', ru:'Ешь яблоко.' },
      dont:{ en:'Don\u2019t eat that.', de:'Iss das nicht.', ru:'Не ешь это.' } },
    { do:{ en:'Be careful.', de:'Sei vorsichtig.', ru:'Будь осторожна.', ruM:'Будь осторожен.' },
      dont:{ en:'Don\u2019t be late.', de:'Komm nicht zu spät.', ru:'Не опаздывай.' } },
    { do:{ en:'Let\u2019s go.', de:'Lass uns gehen.', ru:'Пойдём.' },
      dont:{ en:'Let\u2019s not go.', de:'Lass uns nicht gehen.', ru:'Давай не пойдём.' } }
  ],

  traps: [
    { wrong:'You open the window.', en:'Open the window.',
      why:{ en:'The subject stays off. You open the window is a statement, not a command.',
            de:'Das Subjekt bleibt weg. You open the window ist eine Aussage, kein Befehl.',
            ru:'Подлежащее не ставят. You open the window — это утверждение, а не команда.' } },
    { wrong:'Opens the window.', en:'Open the window.',
      why:{ en:'Commands use the base verb. No -s.',
            de:'Befehle nehmen die Grundform. Kein -s.',
            ru:'Команда — начальная форма. Без -s.' } },
    { wrong:'Don\u2019t opens the window.', en:'Don\u2019t open the window.',
      why:{ en:'Don\u2019t already marks it. The verb stays open.',
            de:'Don\u2019t markiert es schon. Das Verb bleibt open.',
            ru:'Don\u2019t уже стоит. Глагол остаётся open.' } },
    { wrong:'Not open the window.', en:'Don\u2019t open the window.',
      why:{ en:'English uses Don\u2019t, not a bare not in front of the verb.',
            de:'Englisch nimmt Don\u2019t, nicht ein bloßes not vor dem Verb.',
            ru:'По-английски Don\u2019t, а не голое not перед глаголом.' } },
    { wrong:'Are careful.', en:'Be careful.',
      why:{ en:'BE has its own command form. Not are, not is — Be.',
            de:'BE hat seine eigene Befehlsform. Nicht are, nicht is — Be.',
            ru:'У be своя форма команды. Не are и не is, а Be.' } },
    { wrong:'Don\u2019t are late.', en:'Don\u2019t be late.',
      why:{ en:'After Don\u2019t the verb is the base form, and BE\u2019s base form is be.',
            de:'Nach Don\u2019t steht die Grundform, und die Grundform von BE ist be.',
            ru:'После Don\u2019t — начальная форма, а у be она и есть be.' } },
    { wrong:'Let\u2019s don\u2019t go.', en:'Let\u2019s not go.',
      why:{ en:'Let\u2019s takes not, not Don\u2019t.',
            de:'Let\u2019s nimmt not, nicht Don\u2019t.',
            ru:'С Let\u2019s используется not, а не Don\u2019t.' } }
  ],

  notes: [
    { en:'Could you…? Would you…? and Would you mind…? are requests rather than commands. They are their own material.',
      de:'Could you…? Would you…? und Would you mind…? sind Bitten, keine Befehle. Das ist eigener Stoff.',
      ru:'Could you…? Would you…? и Would you mind…? — это просьбы, а не команды. Это отдельная тема.' },
    { en:'German has two commands — mach for someone you know, machen Sie for a stranger. English has one form for everyone, so there is nothing to choose.',
      de:'Deutsch hat zwei Befehlsformen — mach und machen Sie. Englisch hat eine für alle, es gibt also nichts zu wählen.',
      ru:'В немецком две формы — mach и machen Sie. В английском одна для всех, выбирать не нужно.' }
  ]
};

window.GH_EN_COMMANDS.byKind = function(k){
  return (this.items || []).filter(function(x){ return x.kind === k; });
};
window.GH_EN_COMMANDS.item = function(id){
  var i, items = this.items || [];
  for (i = 0; i < items.length; i++) if (items[i].id === id) return items[i];
  return null;
};
window.GH_EN_COMMANDS.counts = function(){
  var c = {};
  (this.families || []).forEach(function(f){ c[f.id] = 0; });
  (this.items || []).forEach(function(x){ if (c[x.kind] !== undefined) c[x.kind]++; });
  return c;
};
