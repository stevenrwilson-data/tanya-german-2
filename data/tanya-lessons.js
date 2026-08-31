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
   WHAT IS MISSING FROM THIS FILE

   THE GERMAN AND THE RUSSIAN. Every `de` and `ru` below is an empty
   string. The English is Steven's story, written out; the German has to
   come from him, and this file must not invent it.

   `ready:false` on a lesson means the screen shows what it is waiting for
   instead of running a stage against blank lines. Set it true when the
   German lands.

   Also missing, and each needed by exactly one stage:

     q      four comprehension questions           -> read
     gaps   which words to remove, as STRINGS      -> words
     cut    which sentences are removable, with
            three wrong replies each, per language -> line
     order  four line indices and their true order -> order

   `gaps` are strings, not word indices. stories-long.js stores indices and
   they break the moment the same sentence exists in another language,
   which is the trap already written up in TRANSLATION-BRIEF.md.

   ------------------------------------------------------------------
   THE ORDER STAGE IS ONLY WORTH DOING PROPERLY

   Four events from a linear narrative, listed in reading order, tests
   memory of reading order. It becomes a comprehension test when the
   events are ones whose real sequence is NOT the sequence they are told
   in — Anna checks the calendar before she telephones, but the story
   mentions the problem first. Choose the four for that. */

window.GH_TANYA = [

  {
    id: 'tl-01',
    /* Her name is on it deliberately. */
    title: { de: 'Tanusha Lektion Eins', ru: 'Урок Танюши, первый',
             en: 'Tanya Lesson One' },
    /* Which of her chapters this draws on, so the lesson can show which
       of her words it is actually teaching. */
    kaps: ['kap16', 'kap17'],

    /* NOT READY: the German and Russian are missing. */
    ready: false,

    sentences: [
      { de:'', ru:'',
        en:'Anna is self-employed and sells clothes online. Today she receives an important order from a customer.' },
      { de:'', ru:'',
        en:'The customer wants to order a red sweater. Hopefully, she needs it by Friday.' },
      { de:'', ru:'',
        en:'Anna looks at her calendar. Normally, delivery takes about three days. But there is a problem this week.' },
      { de:'', ru:'',
        en:'Anna calls the customer and explains the situation.' },
      { de:'', ru:'',
        en:'\u201cCan we move the delivery to Monday?\u201d Anna asks.' },
      { de:'', ru:'',
        en:'At first, the customer isn\u2019t sure. She has an important appointment on Monday.' },
      { de:'', ru:'',
        en:'Anna makes another suggestion: \u201cI can definitely send you the sweater on Saturday.\u201d' },
      { de:'', ru:'',
        en:'The customer thinks for a moment and says, \u201cYes, that\u2019s fine.\u201d' },
      { de:'', ru:'',
        en:'Anna is happy. She doesn\u2019t have to cancel the order.' },
      { de:'', ru:'',
        en:'That evening, the customer receives a message from Anna. The sweater is already on its way.' }
    ],

    /* STAGE read — four questions. `mc` and `tf`, the two kinds the
       dialogues already use, so nothing new has to be graded.

       The rule Steven set for the dialogue questions applies here too: no
       question whose answer is simply printed in the text. "What colour is
       the sweater" is copying; "why does Anna telephone" is not. */
    q: [],

    /* STAGE words — the target words to remove, as they appear in the
       German. Four or five, all of them hers. Steven's shortlist:
       selbstständig · die Bestellung · ungefähr · verschieben · absagen */
    gaps: [],

    /* STAGE line — each entry removes one sentence by index and offers
       three wrong replies per language. Written, never drawn from
       elsewhere: a wrong line taken from another story is eliminated on
       topic alone and measures nothing. */
    cut: [],

    /* STAGE order — four line indices, in the order they truly happened. */
    order: []
  }

];
