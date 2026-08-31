/* Nouns the position game can arrange, with the Russian case forms it
   needs.

   Russian marks these relations on the noun ending, and the ending depends
   on gender, stem and stress — so the forms are stored rather than derived.
   A wrong ending in her native language would be spotted instantly and
   would undermine confidence in everything else the app says.

   German mostly needs no table: the case lands on the article, which is a
   closed set of eight forms. Two exceptions are marked here.

   dat   the dative form of the noun itself, for the weak masculines that
         take -n — dem Bären, dem Elefanten, dem Löwen, dem Affen. Note that
         der Hund, der Wolf and der Fuchs are not weak and take nothing.

   Also: von + dem contracts to vom, which is mandatory rather than a
   stylistic choice, so 'links von dem Wolf' is simply wrong.

   g   genitive       after слева от, справа от
   i   instrumental   after над, под, перед, за, рядом с, между
   p   prepositional  after на, в

   And рядом с becomes рядом со before an awkward initial cluster. The test
   runs on the inflected form, not the dictionary form: лев begins with a
   vowel but львом does not, so it is со львом. In this pool that catches
   со столом, со слоном, со свитером, со свиньёй and со львом.

   Only static description is supported — 'the cat is in front of the dog',
   never 'put the cat in front of the dog'. Movement would need accusative
   forms in Russian and a different case in German, and mixing the two
   would teach two things badly instead of one thing well. */

window.GH_POSITION_NOUNS = [
  { n:415, de:'der Hund', en:'dog', ru:{ n:'собака', g:'собаки', i:'собакой', p:'собаке' } },
  { n:416, de:'die Katze', en:'cat', ru:{ n:'кошка', g:'кошки', i:'кошкой', p:'кошке' } },
  { n:417, de:'der Vogel', en:'bird', ru:{ n:'птица', g:'птицы', i:'птицей', p:'птице' } },
  { n:418, de:'das Pferd', en:'horse', ru:{ n:'лошадь', g:'лошади', i:'лошадью', p:'лошади' } },
  { n:419, de:'die Kuh', en:'cow', ru:{ n:'корова', g:'коровы', i:'коровой', p:'корове' } },
  { n:420, de:'das Schwein', en:'pig', ru:{ n:'свинья', g:'свиньи', i:'свиньёй', p:'свинье' } },
  { n:421, de:'das Schaf', en:'sheep', ru:{ n:'овца', g:'овцы', i:'овцой', p:'овце' } },
  { n:422, de:'das Huhn', en:'chicken', ru:{ n:'курица', g:'курицы', i:'курицей', p:'курице' } },
  { n:423, de:'der Fisch', en:'fish', ru:{ n:'рыба', g:'рыбы', i:'рыбой', p:'рыбе' } },
  { n:424, de:'die Maus', en:'mouse', ru:{ n:'мышь', g:'мыши', i:'мышью', p:'мыши' } },
  { n:425, de:'die Ente', en:'duck', ru:{ n:'утка', g:'утки', i:'уткой', p:'утке' } },
  { n:426, de:'der Bär', dat:'Bären', en:'bear', ru:{ n:'медведь', g:'медведя', i:'медведем', p:'медведе' } },
  { n:427, de:'der Wolf', en:'wolf', ru:{ n:'волк', g:'волка', i:'волком', p:'волке' } },
  { n:428, de:'der Fuchs', en:'fox', ru:{ n:'лиса', g:'лисы', i:'лисой', p:'лисе' } },
  { n:429, de:'das Kaninchen', en:'rabbit', ru:{ n:'кролик', g:'кролика', i:'кроликом', p:'кролике' } },
  { n:430, de:'der Elefant', dat:'Elefanten', en:'elephant', ru:{ n:'слон', g:'слона', i:'слоном', p:'слоне' } },
  { n:431, de:'der Löwe', dat:'Löwen', en:'lion', ru:{ n:'лев', g:'льва', i:'львом', p:'льве' } },
  { n:432, de:'der Affe', dat:'Affen', en:'monkey', ru:{ n:'обезьяна', g:'обезьяны', i:'обезьяной', p:'обезьяне' } },
  { n:317, de:'die Badewanne', en:'bathtub', ru:{ n:'ванна', g:'ванны', i:'ванной', p:'ванне' } },
  { n:318, de:'das Handtuch', en:'towel', ru:{ n:'полотенце', g:'полотенца', i:'полотенцем', p:'полотенце' } },
  { n:39, de:'der Spiegel', en:'mirror', ru:{ n:'зеркало', g:'зеркала', i:'зеркалом', p:'зеркале' } },
  { n:46, de:'das Brot', en:'bread', ru:{ n:'хлеб', g:'хлеба', i:'хлебом', p:'хлебе' } },
  { n:50, de:'der Apfel', en:'apple', ru:{ n:'яблоко', g:'яблока', i:'яблоком', p:'яблоке' } },
  { n:57, de:'die Tomate', en:'tomato', ru:{ n:'помидор', g:'помидора', i:'помидором', p:'помидоре' } },
  { n:60, de:'die Zitrone', en:'lemon', ru:{ n:'лимон', g:'лимона', i:'лимоном', p:'лимоне' } },
  { n:63, de:'der Kochtopf', en:'cooking pot', ru:{ n:'кастрюля', g:'кастрюли', i:'кастрюлей', p:'кастрюле' } },
  { n:67, de:'das Bett', en:'bed', ru:{ n:'кровать', g:'кровати', i:'кроватью', p:'кровати' } },
  { n:73, de:'das Sofa', en:'sofa', ru:{ n:'диван', g:'дивана', i:'диваном', p:'диване' } },
  { n:75, de:'der Tisch', en:'table', ru:{ n:'стол', g:'стола', i:'столом', p:'столе' } },
  { n:76, de:'das Handy', en:'phone', ru:{ n:'телефон', g:'телефона', i:'телефоном', p:'телефоне' } },
  { n:77, de:'der Fernseher', en:'television', ru:{ n:'телевизор', g:'телевизора', i:'телевизором', p:'телевизоре' } },
  { n:325, de:'der Kühlschrank', en:'refrigerator', ru:{ n:'холодильник', g:'холодильника', i:'холодильником', p:'холодильнике' } },
  { n:329, de:'der Teller', en:'plate', ru:{ n:'тарелка', g:'тарелки', i:'тарелкой', p:'тарелке' } },
  { n:330, de:'die Schüssel', en:'bowl', ru:{ n:'миска', g:'миски', i:'миской', p:'миске' } },
  { n:331, de:'die Tasse', en:'cup', ru:{ n:'чашка', g:'чашки', i:'чашкой', p:'чашке' } },
  { n:374, de:'das Messer', en:'knife', ru:{ n:'нож', g:'ножа', i:'ножом', p:'ноже' } },
  { n:375, de:'die Gabel', en:'fork', ru:{ n:'вилка', g:'вилки', i:'вилкой', p:'вилке' } },
  { n:376, de:'der Löffel', en:'spoon', ru:{ n:'ложка', g:'ложки', i:'ложкой', p:'ложке' } },
  { n:16, de:'die Jacke', en:'jacket', ru:{ n:'куртка', g:'куртки', i:'курткой', p:'куртке' } },
  { n:18, de:'das Kleid', en:'dress', ru:{ n:'платье', g:'платья', i:'платьем', p:'платье' } },
  { n:21, de:'die Tasche', en:'bag', ru:{ n:'сумка', g:'сумки', i:'сумкой', p:'сумке' } },
  { n:27, de:'der Pullover', en:'sweater', ru:{ n:'свитер', g:'свитера', i:'свитером', p:'свитере' } },
  { n:29, de:'der Schal', en:'scarf', ru:{ n:'шарф', g:'шарфа', i:'шарфом', p:'шарфе' } },
  { n:306, de:'der Kassenzettel', en:'receipt', ru:{ n:'чек', g:'чека', i:'чеком', p:'чеке' } },
  { n:105, de:'der Bus', en:'bus', ru:{ n:'автобус', g:'автобуса', i:'автобусом', p:'автобусе' } },
  { n:106, de:'der Zug', en:'train', ru:{ n:'поезд', g:'поезда', i:'поездом', p:'поезде' } },
  { n:109, de:'die Fahrkarte', en:'ticket', ru:{ n:'билет', g:'билета', i:'билетом', p:'билете' } },
  { n:111, de:'der Koffer', en:'suitcase', ru:{ n:'чемодан', g:'чемодана', i:'чемоданом', p:'чемодане' } },
  { n:378, de:'der Pass', en:'passport', ru:{ n:'паспорт', g:'паспорта', i:'паспортом', p:'паспорте' } },
];

/* The relations, and how each one renders.

   axis   which coordinate carries the meaning
   flip   the same relation seen from the other object, for generating the
          full set of true and false statements over an arrangement
   ruCase which stored Russian form the reference noun takes */
window.GH_POSITION_RELATIONS = [
  { id:'ueber', de:'über', ru:'над', en:'above', axis:'y', flip:'unter', ruCase:'i' },
  { id:'unter', de:'unter', ru:'под', en:'below', axis:'y', flip:'ueber', ruCase:'i' },
  { id:'vor', de:'vor', ru:'перед', en:'in front of', axis:'z', flip:'hinter', ruCase:'i' },
  { id:'hinter', de:'hinter', ru:'за', en:'behind', axis:'z', flip:'vor', ruCase:'i' },
  { id:'neben', de:'neben', ru:'рядом с', en:'next to', axis:'x', flip:'neben', ruCase:'i' },
  { id:'links', de:'links von', ru:'слева от', en:'to the left of', axis:'x', flip:'rechts', ruCase:'g' },
  { id:'rechts', de:'rechts von', ru:'справа от', en:'to the right of', axis:'x', flip:'links', ruCase:'g' },
  { id:'zwischen', de:'zwischen', ru:'между', en:'between', axis:'x', flip:null, ruCase:'i' },
];
