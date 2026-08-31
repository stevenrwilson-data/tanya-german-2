/* Poems.

   Their own file and their own tier, not because they are short — some of
   them are longer than a short story — but because the line is the unit.
   A story breaks where a sentence ends. A poem breaks where the writer
   decided, and "I go back to the shop / and look near the counter" is one
   sentence deliberately set as two lines.

   That difference is real in three places:

     display   `verse:true` sets the lines tight rather than as paragraphs
     speech    a line is spoken as a line. Joining the enjambed pairs would
               make the audio and the page disagree about what a line is,
               and the page is the poem.
     `tap`     the answer is a line index, so the two halves of an enjambed
               sentence are two different answers. Every `tap` question
               below points at the line that actually carries the answer.

   THE NARRATOR OF THE LOST TICKET IS A WOMAN and stays one. The Russian
   says «Я покупала воду» and it is not adjusted for a male reader — a
   first-person narrator has a gender the way any character does, and
   reading it does not mean claiming it. That is the opposite of the pet
   lines, where the app addresses the reader directly and «вернулась» to a
   man is the app getting a fact wrong.

   SHAPE — the same as data/stories-short.js, plus `verse`:

     id          pm-NN
     verse       true. Set the lines tight; speak them as lines.
     title       de / en / ru
     sentences   de / ru / en — lines, here, not sentences
     q           six questions, every one auto-gradeable

   Worth 15, same as a short story. Six objective questions is the same
   work, and paying more for the form would make the tier a target rather
   than a choice.

   No `img`, no `blanks`. Image numbers are the sheet mapping and are not
   mine to invent. */

window.GH_POEMS = [

  {
    id:'pm-01', verse:true,
    title:{ de:'Der einsame Vogel', en:'The Lonely Bird', ru:'Одинокая птица' },
    sentences:[
      { de:'Ein kleiner Vogel sitzt allein auf einem Baum.',
        ru:'Маленькая птица сидит одна на дереве.',
        en:'A little bird sits alone in a tree.' },
      { de:'Der Morgen ist kalt und der Himmel ist grau.',
        ru:'Утро холодное, а небо серое.',
        en:'The morning is cold and the sky is gray.' },
      { de:'Andere Vögel fliegen zusammen über die Häuser.',
        ru:'Другие птицы вместе летят над домами.',
        en:'Other birds fly together over the houses.' },
      { de:'Der kleine Vogel beobachtet sie, aber er bleibt auf dem Baum.',
        ru:'Маленькая птица смотрит на них, но остаётся на дереве.',
        en:'The little bird watches them but stays where it is.' },
      { de:'Er möchte mit ihnen fliegen, aber er hat Angst.',
        ru:'Она хочет лететь с ними, но боится.',
        en:'It wants to fly with them, but it is afraid.' },
      { de:'Dann landet ein anderer Vogel auf dem Baum.',
        ru:'Потом на дерево прилетает другая птица.',
        en:'Then another bird lands on the tree.' },
      { de:'Er setzt sich neben den kleinen Vogel und beginnt zu singen.',
        ru:'Она садится рядом с маленькой птицей и начинает петь.',
        en:'It sits beside the little bird and begins to sing.' },
      { de:'Der einsame Vogel hört zu und kommt langsam näher.',
        ru:'Одинокая птица слушает и медленно придвигается ближе.',
        en:'The lonely bird listens and slowly moves closer.' },
      { de:'Bald singen die beiden Vögel zusammen.',
        ru:'Вскоре две птицы поют вместе.',
        en:'Soon the two birds sing together.' },
      { de:'Als der andere Vogel wegfliegt, folgt ihm der kleine Vogel.',
        ru:'Когда другая птица улетает, маленькая птица летит за ней.',
        en:'When the other bird flies away, the little bird follows.' },
      { de:'Sie fliegen über die Bäume und durch den Park.',
        ru:'Они летят над деревьями и через парк.',
        en:'They fly over the trees and across the park.' },
      { de:'Der kleine Vogel ist nicht mehr allein.',
        ru:'Маленькая птица больше не одна.',
        en:'The little bird is not lonely anymore.' }
    ],
    q:[
      { kind:'mc',
        de:'Wo sitzt der kleine Vogel am Anfang?',
        ru:'Где сидит маленькая птица в начале?',
        en:'Where does the little bird sit at the beginning?',
        opts:[
          { de:'auf einem Haus', ru:'на доме', en:'On a house' },
          { de:'auf einem Baum', ru:'на дереве', en:'In a tree' },
          { de:'im Park', ru:'в парке', en:'In the park' },
          { de:'am Wasser', ru:'у воды', en:'Near the water' }
        ], a:1 },
      { kind:'tf',
        de:'Der Morgen ist warm und sonnig.',
        ru:'Утро тёплое и солнечное.',
        en:'The morning is warm and sunny.', a:false },
      { kind:'multi',
        de:'Was sieht der kleine Vogel die anderen Vögel tun?',
        ru:'Что маленькая птица видит, когда смотрит на других птиц?',
        en:'What does the little bird see the other birds doing?',
        opts:[
          { de:'Sie fliegen zusammen.', ru:'Они летят вместе.', en:'Flying together' },
          { de:'Sie fliegen über die Häuser.', ru:'Они летят над домами.', en:'Flying over the houses' },
          { de:'Sie sitzen im Park.', ru:'Они сидят в парке.', en:'Sitting in the park' },
          { de:'Sie suchen nach Futter.', ru:'Они ищут еду.', en:'Looking for food' }
        ], a:[0,1] },
      { kind:'yn',
        de:'Möchte der kleine Vogel mit den anderen Vögeln fliegen?',
        ru:'Хочет ли маленькая птица лететь с другими птицами?',
        en:'Does the little bird want to fly with the other birds?', a:true },
      { kind:'tap',
        de:'Welche Zeile sagt, was der zweite Vogel tut, nachdem er gelandet ist?',
        ru:'В какой строке сказано, что делает вторая птица после того, как прилетела?',
        en:'Which line says what the second bird does after it lands?', a:6 },
      { kind:'mc',
        de:'Was verändert sich für den kleinen Vogel bis zum Ende?',
        ru:'Что меняется для маленькой птицы к концу?',
        en:'What changes for the little bird by the end?',
        opts:[
          { de:'Er sitzt immer noch allein auf dem Baum.', ru:'Он всё ещё сидит один на дереве.', en:'It is still alone in the tree.' },
          { de:'Er folgt dem anderen Vogel und ist nicht mehr allein.', ru:'Он летит за другой птицей и больше не один.', en:'It follows the other bird and is no longer lonely.' },
          { de:'Er bekommt Angst vor den anderen Vögeln.', ru:'Он начинает бояться других птиц.', en:'It becomes afraid of the other birds.' },
          { de:'Er fliegt zurück zu seinem Haus.', ru:'Он летит обратно к своему дому.', en:'It goes back to its house.' }
        ], a:1 }
    ]
  },

  {
    id:'pm-02', verse:true,
    title:{ de:'Der hilfsbereite Fisch', en:'The Helpful Fish', ru:'Полезная рыбка' },
    sentences:[
      { de:'Ein kleiner Fisch lebt in einem ruhigen See.',
        ru:'Маленькая рыбка живёт в тихом озере.',
        en:'A small fish lives in a quiet lake.' },
      { de:'Jeden Morgen schwimmt er in der Nähe der Pflanzen und Steine.',
        ru:'Каждое утро она плавает возле растений и камней.',
        en:'Every morning, it swims near the plants and rocks.' },
      { de:'Eines Tages sieht er einen größeren Fisch, der nach Futter sucht.',
        ru:'Однажды она видит большую рыбу, которая ищет еду.',
        en:'One day, it sees a larger fish looking for food.' },
      { de:'Der größere Fisch sucht schon lange.',
        ru:'Большая рыба ищет уже давно.',
        en:'The larger fish has been searching for a long time.' },
      { de:'Er ist müde und hungrig.',
        ru:'Она устала и голодна.',
        en:'It is tired and hungry.' },
      { de:'Der kleine Fisch weiß, wo es Futter gibt.',
        ru:'Маленькая рыбка знает, где есть еда.',
        en:'The small fish knows where there is food.' },
      { de:'Er schwimmt zur anderen Seite des Sees.',
        ru:'Она плывёт на другую сторону озера.',
        en:'It swims toward the other side of the lake.' },
      { de:'Der größere Fisch folgt ihm durch das Wasser.',
        ru:'Большая рыба плывёт за ней.',
        en:'The larger fish follows it through the water.' },
      { de:'Bald finden sie Futter in der Nähe einiger Pflanzen.',
        ru:'Вскоре они находят еду возле растений.',
        en:'Soon they find food near some plants.' },
      { de:'Der größere Fisch frisst und fühlt sich viel besser.',
        ru:'Большая рыба ест и чувствует себя намного лучше.',
        en:'The larger fish eats and feels much better.' },
      { de:'Bevor er wegschwimmt, bleibt er noch eine Weile bei dem kleinen Fisch.',
        ru:'Перед тем как уплыть, она ещё немного остаётся с маленькой рыбкой.',
        en:'Before it swims away, it stays with the small fish for a while.' },
      { de:'Jetzt sind sie Freunde.',
        ru:'Теперь они друзья.',
        en:'They are now friends.' }
    ],
    q:[
      { kind:'mc',
        de:'Wo lebt der kleine Fisch?',
        ru:'Где живёт маленькая рыбка?',
        en:'Where does the small fish live?',
        opts:[
          { de:'in einem Fluss', ru:'в реке', en:'In a river' },
          { de:'in einem ruhigen See', ru:'в тихом озере', en:'In a quiet lake' },
          { de:'im Meer', ru:'в море', en:'In the sea' },
          { de:'in einem kleinen Teich', ru:'в маленьком пруду', en:'In a small pool' }
        ], a:1 },
      { kind:'multi',
        de:'Was ist in der Nähe des kleinen Fisches, wenn er jeden Morgen schwimmt?',
        ru:'Что находится рядом с маленькой рыбкой, когда она плавает каждое утро?',
        en:'What is near the small fish when it swims each morning?',
        opts:[
          { de:'Pflanzen', ru:'растения', en:'Plants' },
          { de:'Steine', ru:'камни', en:'Rocks' },
          { de:'Häuser', ru:'дома', en:'Houses' },
          { de:'Boote', ru:'лодки', en:'Boats' }
        ], a:[0,1] },
      { kind:'tf',
        de:'Der größere Fisch sucht schon lange nach Futter.',
        ru:'Большая рыба уже давно ищет еду.',
        en:'The larger fish has been looking for food for a long time.', a:true },
      { kind:'yn',
        de:'Weiß der kleine Fisch, wo er Futter finden kann?',
        ru:'Знает ли маленькая рыбка, где можно найти еду?',
        en:'Does the small fish know where to find food?', a:true },
      { kind:'mc',
        de:'Wie hilft der kleine Fisch dem größeren Fisch?',
        ru:'Как маленькая рыбка помогает большой рыбе?',
        en:'How does the small fish help the larger fish?',
        opts:[
          { de:'Er gibt ihm sein eigenes Futter.', ru:'Он отдаёт ей свою еду.', en:'It gives the larger fish its own food.' },
          { de:'Er zeigt ihm, wo es Futter gibt.', ru:'Он показывает ей, где есть еда.', en:'It shows the larger fish where to find food.' },
          { de:'Er trägt Futter durch den See.', ru:'Он несёт еду через озеро.', en:'It carries food across the lake.' },
          { de:'Er sagt ihm, dass er wegschwimmen soll.', ru:'Он говорит ей уплыть.', en:'It tells the larger fish to leave.' }
        ], a:1 },
      { kind:'tap',
        de:'Welche Zeile sagt, wie die Geschichte für die beiden Fische endet?',
        ru:'В какой строке сказано, чем всё заканчивается для двух рыб?',
        en:'Which line says how it ends for the two fish?', a:11 }
    ]
  },

  {
    /* Enjambed twice: lines 10/11 are one sentence, and so are 18/19.
       They stay two lines. The break is the poem. */
    id:'pm-03', verse:true,
    title:{ de:'Das verlorene Ticket', en:'The Lost Ticket', ru:'Потерянный билет' },
    sentences:[
      { de:'Mein Ticket ist weg.', ru:'Мой билет пропал.', en:'My ticket is missing.' },
      { de:'Vorher war es noch da.', ru:'Недавно он был здесь.', en:'It was here before.' },
      { de:'Ich suche in meiner Handtasche.', ru:'Я ищу в своей сумочке.', en:'I look in my handbag.' },
      { de:'Ich suche noch einmal.', ru:'Я ищу ещё раз.', en:'I look once more.' },
      { de:'Nicht unter meinem Buch.', ru:'Не под моей книгой.', en:'Not under my book.' },
      { de:'Nicht in meiner Jacke.', ru:'Не в моей куртке.', en:'Not in my jacket.' },
      { de:'Der Zug fährt bald ab.', ru:'Поезд скоро отправляется.', en:'The train leaves soon.' },
      { de:'Wo ist mein Ticket?', ru:'Где мой билет?', en:'Where is my ticket?' },
      { de:'Ich bleibe stehen und erinnere mich.', ru:'Я останавливаюсь и вспоминаю.', en:'I stop and remember.' },
      { de:'Ich habe Wasser gekauft.', ru:'Я покупала воду.', en:'I bought some water.' },
      { de:'Ich gehe zurück zum Geschäft', ru:'Я возвращаюсь в магазин', en:'I go back to the shop' },
      { de:'und suche in der Nähe der Kasse.', ru:'и ищу возле кассы.', en:'and look near the counter.' },
      { de:'Da ist mein Ticket.', ru:'Вот мой билет.', en:'There is my ticket.' },
      { de:'Ich nehme es schnell.', ru:'Я быстро беру его.', en:'I pick it up quickly.' },
      { de:'Ich eile zum Bahnsteig.', ru:'Я спешу на платформу.', en:'I hurry to the platform.' },
      { de:'Mein Zug ist noch da.', ru:'Мой поезд ещё здесь.', en:'My train is still there.' },
      { de:'Jetzt habe ich mein Ticket.', ru:'Теперь у меня есть билет.', en:'Now I have my ticket.' },
      { de:'Jetzt kann ich fahren.', ru:'Теперь я могу ехать.', en:'Now I can go.' },
      { de:'Ich sitze am Fenster', ru:'Я сижу у окна', en:'I sit by the window' },
      { de:'und sehe die Stadt verschwinden.', ru:'и смотрю, как город исчезает из виду.', en:'and watch the city disappear.' }
    ],
    q:[
      { kind:'mc',
        de:'Wo sucht sie zuerst nach ihrem Ticket?',
        ru:'Где она сначала ищет свой билет?',
        en:'Where does she look for her ticket first?',
        opts:[
          { de:'in ihrer Handtasche', ru:'в своей сумочке', en:'In her handbag' },
          { de:'an der Kasse', ru:'у кассы', en:'At the counter' },
          { de:'am Bahnsteig', ru:'на платформе', en:'On the platform' },
          { de:'unter ihrer Jacke', ru:'под своей курткой', en:'Under her jacket' }
        ], a:0 },
      { kind:'tf',
        de:'Der Zug fährt bald ab.',
        ru:'Поезд скоро отправляется.',
        en:'The train is leaving soon.', a:true },
      { kind:'multi',
        de:'Wo sucht sie, bevor sie sich an das Wasser erinnert?',
        ru:'Где она ищет, прежде чем вспоминает про воду?',
        en:'Where does she look before she remembers buying water?',
        opts:[
          { de:'in ihrer Handtasche', ru:'в своей сумочке', en:'In her handbag' },
          { de:'unter ihrem Buch', ru:'под своей книгой', en:'Under her book' },
          { de:'in ihrer Jacke', ru:'в своей куртке', en:'In her jacket' },
          { de:'an der Kasse', ru:'у кассы', en:'Near the counter' }
        ], a:[0,1,2] },
      { kind:'tap',
        de:'Welche Zeile sagt, woran sie sich erinnert?',
        ru:'В какой строке сказано, что она вспоминает?',
        en:'Which line says what she remembers?', a:9 },
      { kind:'mc',
        de:'Wo findet sie ihr Ticket?',
        ru:'Где она находит свой билет?',
        en:'Where does she find the ticket?',
        opts:[
          { de:'unter ihrem Buch', ru:'под своей книгой', en:'Under her book' },
          { de:'in ihrer Jacke', ru:'в своей куртке', en:'In her jacket' },
          { de:'in der Nähe der Kasse', ru:'возле кассы', en:'Near the counter' },
          { de:'am Bahnsteig', ru:'на платформе', en:'On the platform' }
        ], a:2 },
      { kind:'order',
        de:'Bring es in die richtige Reihenfolge.',
        ru:'Расставь по порядку.',
        en:'Put these in order.',
        opts:[
          { de:'Sie erinnert sich an das Wasser.', ru:'Она вспоминает про воду.', en:'She remembers the water.' },
          { de:'Sie geht zurück zum Geschäft.', ru:'Она возвращается в магазин.', en:'She goes back to the shop.' },
          { de:'Sie findet das Ticket.', ru:'Она находит билет.', en:'She finds the ticket.' },
          { de:'Sie eilt zum Bahnsteig.', ru:'Она спешит на платформу.', en:'She hurries to the platform.' }
        ], a:[0,1,2,3] }
    ]
  }

];
