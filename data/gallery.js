/* data/gallery.js */
/* The picture-word bank — new content, outside vocab.js on purpose.

   vocab.js carries gender (`rg`/`rgs`) and two sentences per word because
   every entry there feeds the case and sentence-building machinery. This
   content does not: it is a word and a picture, meant for any exercise
   that only needs those two things (a matching game, a flashcard, a
   recognition round) — see GH.sprite.cell() and GH.packs' gallery() below.
   Mixing the two would mean either inventing grammar fields for words
   that do not need them, or leaving old fields half-filled and hoping
   nothing reads them. A second flat file costs nothing and risks nothing
   in the tested one.

   Each entry is one cell of a named 3x3 sheet:

     sheet   the file, without extension — 'flowers-01' lives at
             images/flowers-01.webp
     pos     1-9, its cell in that sheet, row-major (1 2 3 / 4 5 6 / 7 8 9)
     cats    array of category ids this word belongs to, for filtering.
             A word can carry more than one — see note below, this is not
             a tree.
     en      English. Filled in.
     de      German. Steven's to write — empty means not translated yet.
     ru      Russian. Same.

   GERMAN AND RUSSIAN ARE DELIBERATELY BLANK. Not a placeholder to be
   overwritten by guesswork — that content is Steven's, same as every
   other translation in this project. English is enough to wire the data
   up and prove the pipeline end to end; the two empty columns are exactly
   what needs filling before this is playable in German. */

/* THE CATEGORY REGISTRY — declared ahead of the words.

   Named 04 SEP, revised same day, four times. First: flowers live under
   `garden` rather than their own category (all 27 entries below carry
   'garden', not 'flowers'). Second: `misc` never actually shipped as a
   category — the 54 words that arrived as misc-01..misc-06 were sorted
   by Steven into seven real topics on sight, and `nature` (added empty,
   for mountains and rivers) is exactly one of those seven, so it picked
   up its first words here rather than getting a rival category next to
   it. The image FILE a word's picture lives on (misc-01.webp, etc.) and
   the CATEGORY(ies) it teaches under are two different things on
   purpose — see the note above the words below.

   Third attempt got this wrong and was corrected hard: NOT a nested
   tree. His own words — "NONE OF THIS IS NESTED SUBSETS. This is a PER
   WORD CATEGORY. NONE OF IT IS SUBSETS AT ALL" — and the concrete case
   that killed the tree idea: water is not a subset of nature (bathtub
   water, tap water, a drinking fountain, a water bottle — all water,
   none of them nature). So there is no `parent` field, no hierarchy at
   all. Categories are a flat list, full stop, and a WORD can carry more
   than one category when it genuinely belongs to more than one — that
   is the actual mechanism his "flowers < nature, water < nature" example
   was pointing at, not umbrella categories. A river is both nature and
   water; a garden-variety flower is just garden; a hypothetical glass of
   tap water would be just water. `cats` below is an array for exactly
   this reason.

   River, lake, island, and cloud (04 SEP) carry BOTH 'nature' and
   'water' — genuine natural water features, not filed under one at the
   exclusion of the other. Nothing else was multi-tagged; everything
   else keeps its single original category until there's a real reason
   to add a second one.

   `garden` (the flower category) was kept separate from `nature` — nothing
   forces every flower word to also carry 'nature'; that can be added
   per-word later if Steven wants specific flowers to show under both.

   TWO HARD RULES, his own words, 04 SEP — the actual curation guide
   lives in gallery-categories.md (send that to anyone, human or AI,
   helping fill this in), but the rules themselves belong here too since
   this file is what they constrain:

     1. A category needs 10+ words in it, or it isn't worth having.
        Below that, fold the words into a broader existing category
        instead of standing up a new one.
     2. No two categories may be the same thing under different names —
        no 'technology' next to 'electronics' next to 'computers'.

   `vegetables`/`fruit`/`sushi`/`cheese`/`alcohol` were the pre-registered
   exception: 0 words on purpose, because Steven asked for them ahead of
   specific large batches — vegetables/fruit/cheese/alcohol got that
   batch 05 SEP (see the words below), sushi got a first 2 words (still
   thin, still pending its own batch). `water`, flagged 04 SEP at 4
   words, is the same story per Steven 05 SEP — more water words
   (including a bottled-water image) are confirmed coming, so it stays
   registered rather than folded. `education` (6) is also not a real
   gap: there is a 760+ word set not yet categorized, and education is
   one of the categories it will land words in — the low count here is
   provisional, not a verdict on the category. `tech` (3) has no
   confirmed batch as of 05 SEP and is a genuinely open question. `nuts`
   and `italian` (9 words each, new 05 SEP) are below rule 1 too, same
   flagged-not-folded treatment — see gallery-categories.md.

   `actions` is NOT a verbs-only category (Steven, 05 SEP) — tag
   anything that's genuinely an action, task, or state regardless of
   part of speech (it already held 'tired' and 'energy' alongside verbs
   like 'throw' before this note existed).

   `en` only, same reason as the words: German and Russian are Steven's. */
window.GH_GALLERY_CATS = [
  { id:'vegetables', en:'Vegetables' },
  { id:'fruit',      en:'Fruit' },
  { id:'sushi',      en:'Sushi' },
  { id:'cheese',     en:'Cheese' },
  { id:'alcohol',    en:'Alcohol' },
  { id:'garden',     en:'Garden' },
  { id:'nature',     en:'Nature' },
  { id:'water',      en:'Water' },
  { id:'nuts',       en:'Nuts' },
  { id:'italian',    en:'Italian Food' },
  { id:'meat',       en:'Meat & Seafood' },
  { id:'school',     en:'School & office supplies' },
  { id:'education',  en:'Education, study & work' },
  { id:'home',       en:'Home & interiors' },
  { id:'places',     en:'Places & transportation' },
  { id:'tech',       en:'Technology & electronics' },
  { id:'actions',    en:'Actions, tasks & states' },
  { id:'carbs',      en:'Breads & Starches' },
  { id:'drinks',     en:'Non-Alcoholic Drinks' },
  { id:'condiments', en:'Condiments & Spices' },
  { id:'bodyparts',  en:'Body Parts' },
  { id:'accessories', en:'Clothing & Accessories' },
  { id:'crystals',   en:'Crystals' },
  { id:'health',     en:'Health & Medicine' }
];

window.GH_GALLERY = [

  /* -------------------------------------------------------------
     FLOWERS — 27, three sheets of nine, 04 SEP
     ------------------------------------------------------------- */
  { sheet:'flowers-01', pos:1, cats:['garden'], en:'Dandelion',           de:'der Löwenzahn', ru:'одуванчик' },
  { sheet:'flowers-01', pos:2, cats:['garden'], en:'Magnolia',            de:'die Magnolie', ru:'магнолия' },
  { sheet:'flowers-01', pos:3, cats:['garden'], en:'Geranium',            de:'die Geranie', ru:'герань' },
  { sheet:'flowers-01', pos:4, cats:['garden'], en:'Marigold',            de:'die Ringelblume', ru:'календула' },
  { sheet:'flowers-01', pos:5, cats:['garden'], en:'Jasmine',             de:'der Jasmin', ru:'жасмин' },
  { sheet:'flowers-01', pos:6, cats:['garden'], en:'Hibiscus',            de:'der Hibiskus', ru:'гибискус' },
  { sheet:'flowers-01', pos:7, cats:['garden'], en:'Chrysanthemum',       de:'die Chrysantheme', ru:'хризантема' },
  { sheet:'flowers-01', pos:8, cats:['garden'], en:'Forget-me-not',       de:'das Vergissmeinnicht', ru:'незабудка' },
  { sheet:'flowers-01', pos:9, cats:['garden'], en:'Dahlia',              de:'die Dahlie', ru:'георгин' },

  { sheet:'flowers-02', pos:1, cats:['garden'], en:'Violet',              de:'das Veilchen', ru:'фиалка' },
  { sheet:'flowers-02', pos:2, cats:['garden'], en:'Poppy',               de:'die Mohnblume', ru:'мак' },
  { sheet:'flowers-02', pos:3, cats:['garden'], en:'Iris',                de:'die Schwertlilie', ru:'ирис' },
  { sheet:'flowers-02', pos:4, cats:['garden'], en:'Hydrangea',           de:'die Hortensie', ru:'гортензия' },
  { sheet:'flowers-02', pos:5, cats:['garden'], en:'Lilacs',              de:'der Flieder', ru:'сирень' },
  { sheet:'flowers-02', pos:6, cats:['garden'], en:'Red rose',            de:'die rote Rose', ru:'красная роза' },
  { sheet:'flowers-02', pos:7, cats:['garden'], en:'Red tulip',           de:'die rote Tulpe', ru:'красный тюльпан' },
  { sheet:'flowers-02', pos:8, cats:['garden'], en:'Sunflower',           de:'die Sonnenblume', ru:'подсолнух' },
  { sheet:'flowers-02', pos:9, cats:['garden'], en:'Daisy',               de:'das Gänseblümchen', ru:'маргаритка' },

  { sheet:'flowers-03', pos:1, cats:['garden'], en:'Oriental lily',       de:'die Orientlilie', ru:'восточная лилия' },
  { sheet:'flowers-03', pos:2, cats:['garden'], en:'Phalaenopsis orchid', de:'die Phalaenopsis-Orchidee', ru:'орхидея фаленопсис' },
  { sheet:'flowers-03', pos:3, cats:['garden'], en:'Daffodils',           de:'die Osterglocken', ru:'нарциссы' },
  { sheet:'flowers-03', pos:4, cats:['garden'], en:'Carnations',          de:'die Nelken', ru:'гвоздики' },
  { sheet:'flowers-03', pos:5, cats:['garden'], en:'Peony',               de:'die Pfingstrose', ru:'пион' },
  { sheet:'flowers-03', pos:6, cats:['garden'], en:'Lotus',               de:'die Lotusblume', ru:'лотос' },
  { sheet:'flowers-03', pos:7, cats:['garden'], en:'Lesser periwinkle',   de:'das Kleine Immergrün', ru:'барвинок малый' },
  { sheet:'flowers-03', pos:8, cats:['garden'], en:'Lavender',            de:'der Lavendel', ru:'лаванда' },
  { sheet:'flowers-03', pos:9, cats:['garden'], en:'Nasturtiums',         de:'die Kapuzinerkressen', ru:'настурции' },

  /* flowers-04.webp — flower ANATOMY, not more flower names. Steven's
     own image map, EN/DE/RU all given directly, 04 Sep. */
  { sheet:'flowers-04', pos:1, cats:['garden'], en:'Thorn',  de:'der Dorn',        ru:'шип' },
  { sheet:'flowers-04', pos:2, cats:['garden'], en:'Petal',  de:'das Blütenblatt', ru:'лепесток' },
  { sheet:'flowers-04', pos:3, cats:['garden'], en:'Leaf',   de:'das Blatt',       ru:'лист' },
  { sheet:'flowers-04', pos:4, cats:['garden'], en:'Bud',    de:'die Knospe',      ru:'бутон' },
  { sheet:'flowers-04', pos:5, cats:['garden'], en:'Stem',   de:'der Stiel',       ru:'стебель' },
  { sheet:'flowers-04', pos:6, cats:['garden'], en:'Pot',    de:'der Blumentopf',  ru:'цветочный горшок' },
  { sheet:'flowers-04', pos:7, cats:['garden'], en:'Roots',  de:'die Wurzeln',     ru:'корни' },
  { sheet:'flowers-04', pos:8, cats:['garden'], en:'Wilted', de:'verwelkt',        ru:'увядший' },
  { sheet:'flowers-04', pos:9, cats:['garden'], en:'Seed',   de:'der Samen',       ru:'семя' },

  /* -------------------------------------------------------------
     54 words that arrived as six sheets, misc-01.webp..misc-06.webp,
     04 SEP — the SHEET names still say misc because that is the actual
     filename on disk, but every entry's `cats` below is one of the seven
     real topics Steven sorted them into (school, education, home,
     nature, places, tech, actions), not 'misc'. Sheet and category are
     independent: `sheet`/`pos` say which picture to crop, `cats` says
     which set(s) she picks to practice. A sheet can freely mix
     categories, same as this one does.

     English/German/Russian below are Steven's own final table, not my
     first-pass scene descriptions — several cells teach the concept the
     picture illustrates rather than a literal caption of the scene
     ('want'/'wollen' for the boy reaching at the shelf; 'send back'/
     'zurückschicken' for the packing box; 'energy'/'die Energie' for
     the tired woman on the bench). His table is the source of truth;
     nothing here was guessed.

     Sheet 6 / pos 1: his own note — a wooden, school-style chair, not
     a sofa chair — is what 'der Holzstuhl' is standing in for.

     Four cells (misc-01:1, misc-02:2, misc-03:8, misc-06:2) were
     revised 05 SEP after a second, more literal description of the same
     pictures came in from GPT and Steven confirmed all four as correct,
     no conflict: the woman is worried, not just riding a tram; the girl
     is studying, not "study" in the abstract; the man is tired because
     he's up early, not tired in the abstract; and the ceiling is the
     ceiling (die Decke), not a ceiling light fixture (die Deckenlampe —
     a genuinely different word, that one was a real correction, not a
     wording preference). misc-01:1 moved from cats:['places'] to
     cats:['actions'] to match — it's a state/mood word now, same
     bucket as 'tired', not really about the tram itself. */
  { sheet:'misc-01', pos:1, cats:['actions'], en:'Woman traveling, worried', de:'die besorgte reisende Frau', ru:'встревоженная путешественница' },
  { sheet:'misc-01', pos:2, cats:['actions'], en:'Wash dishes',   de:'Geschirr spülen',             ru:'мыть посуду' },
  { sheet:'misc-01', pos:3, cats:['home'], en:'Wardrobe',      de:'der Kleiderschrank',          ru:'шкаф для одежды' },
  { sheet:'misc-01', pos:4, cats:['actions'], en:'Want',          de:'wollen',                      ru:'хотеть' },
  { sheet:'misc-01', pos:5, cats:['home'], en:'Picture on the wall', de:'das Bild an der Wand',  ru:'картина на стене' },
  { sheet:'misc-01', pos:6, cats:['tech'], en:'USB cable',     de:'das USB-Kabel',               ru:'USB-кабель' },
  { sheet:'misc-01', pos:7, cats:['places'], en:'Tram',          de:'die Straßenbahn',             ru:'трамвай' },
  { sheet:'misc-01', pos:8, cats:['actions'], en:'Throw',         de:'werfen',                      ru:'бросать' },
  { sheet:'misc-01', pos:9, cats:['school'], en:'Tape',          de:'das Klebeband',               ru:'клейкая лента / скотч' },

  { sheet:'misc-02', pos:1, cats:['education'], en:'Study / learn', de:'lernen',            ru:'учиться / изучать' },
  { sheet:'misc-02', pos:2, cats:['education'], en:'Girl studying', de:'das lernende Mädchen', ru:'девушка за учёбой' },
  { sheet:'misc-02', pos:3, cats:['nature'], en:'Stone',         de:'der Stein',         ru:'камень' },
  { sheet:'misc-02', pos:4, cats:['nature'], en:'Star',          de:'der Stern',         ru:'звезда' },
  { sheet:'misc-02', pos:5, cats:['actions'], en:'Send back',     de:'zurückschicken',    ru:'отправить обратно' },
  { sheet:'misc-02', pos:6, cats:['school'], en:'Scissors',      de:'die Schere',        ru:'ножницы' },
  { sheet:'misc-02', pos:7, cats:['school'], en:'Ruler',         de:'das Lineal',        ru:'линейка' },
  { sheet:'misc-02', pos:8, cats:['school'], en:'Ruler',         de:'das Lineal',        ru:'линейка' },
  { sheet:'misc-02', pos:9, cats:['home'], en:'Roof',          de:'das Dach',          ru:'крыша' },

  { sheet:'misc-03', pos:1, cats:['nature','water'], en:'River',              de:'der Fluss',                  ru:'река' },
  { sheet:'misc-03', pos:2, cats:['education'], en:'Put on a lab coat',  de:'einen Laborkittel anziehen', ru:'надевать лабораторный халат' },
  { sheet:'misc-03', pos:3, cats:['school'], en:'Pencil',             de:'der Bleistift',              ru:'карандаш' },
  { sheet:'misc-03', pos:4, cats:['places'], en:'Parking lot',        de:'der Parkplatz',              ru:'парковка' },
  { sheet:'misc-03', pos:5, cats:['school'], en:'Notebook',           de:'das Notizbuch',              ru:'блокнот' },
  { sheet:'misc-03', pos:6, cats:['places'], en:'Museum',             de:'das Museum',                 ru:'музей' },
  { sheet:'misc-03', pos:7, cats:['nature'], en:'Mountain',           de:'der Berg',                   ru:'гора' },
  { sheet:'misc-03', pos:8, cats:['actions'], en:'Man up early, tired', de:'der früh aufgestandene, müde Mann', ru:'мужчина, рано вставший и уставший' },
  { sheet:'misc-03', pos:9, cats:['nature'], en:'Leaf',               de:'das Blatt',                  ru:'лист' },

  { sheet:'misc-04', pos:1, cats:['nature','water'], en:'Lake',        de:'der See',                          ru:'озеро' },
  { sheet:'misc-04', pos:2, cats:['nature','water'], en:'Island',      de:'die Insel',                         ru:'остров' },
  { sheet:'misc-04', pos:3, cats:['tech'], en:'Headphones',  de:'die Kopfhörer',                     ru:'наушники' },
  { sheet:'misc-04', pos:4, cats:['home'], en:'Hallway',     de:'der Flur',                          ru:'коридор' },
  { sheet:'misc-04', pos:5, cats:['nature'], en:'Grass',       de:'das Gras',                          ru:'трава' },
  { sheet:'misc-04', pos:6, cats:['education'], en:'Graduate',    de:'der Absolvent / die Absolventin',   ru:'выпускник / выпускница' },
  { sheet:'misc-04', pos:7, cats:['nature'], en:'Garden',      de:'der Garten',                        ru:'сад' },
  { sheet:'misc-04', pos:8, cats:['school'], en:'Eraser',      de:'der Radiergummi',                   ru:'ластик' },
  { sheet:'misc-04', pos:9, cats:['actions'], en:'Energy',      de:'die Energie',                       ru:'энергия' },

  { sheet:'misc-05', pos:1, cats:['education'], en:'Doctor',                de:'der Arzt / die Ärztin', ru:'врач' },
  { sheet:'misc-05', pos:2, cats:['school'], en:'Dictionary',            de:'das Wörterbuch',        ru:'словарь' },
  { sheet:'misc-05', pos:3, cats:['school'], en:'Desk',                  de:'der Schreibtisch',      ru:'письменный стол' },
  { sheet:'misc-05', pos:4, cats:['home'], en:'Curtain',               de:'der Vorhang',           ru:'занавеска / штора' },
  { sheet:'misc-05', pos:5, cats:['nature','water'], en:'Cloud',                 de:'die Wolke',             ru:'облако' },
  { sheet:'misc-05', pos:6, cats:['education'], en:'Classroom',             de:'das Klassenzimmer',     ru:'класс / классная комната' },
  { sheet:'misc-05', pos:7, cats:['places'], en:'Cinema / movie theater',de:'das Kino',              ru:'кинотеатр' },
  { sheet:'misc-05', pos:8, cats:['places'], en:'Church',                de:'die Kirche',            ru:'церковь' },
  { sheet:'misc-05', pos:9, cats:['school'], en:'Chalkboard',            de:'die Tafel',             ru:'классная доска' },

  { sheet:'misc-06', pos:1, cats:['home'], en:'Wooden chair', de:'der Holzstuhl',   ru:'деревянный стул' },
  { sheet:'misc-06', pos:2, cats:['home'], en:'Ceiling',de:'die Decke', ru:'потолок' },
  { sheet:'misc-06', pos:3, cats:['places'], en:'Bridge',       de:'die Brücke',      ru:'мост' },
  { sheet:'misc-06', pos:4, cats:['home'], en:'Bookcase',     de:'das Bücherregal', ru:'книжный шкаф / книжный стеллаж' },
  { sheet:'misc-06', pos:5, cats:['tech'], en:'Battery',      de:'die Batterie',    ru:'батарейка' },
  { sheet:'misc-06', pos:6, cats:['home'], en:'Basket',       de:'der Korb',        ru:'корзина' },
  { sheet:'misc-06', pos:7, cats:['home'], en:'Basement',     de:'der Keller',      ru:'подвал' },
  { sheet:'misc-06', pos:8, cats:['home'], en:'Balcony',      de:'der Balkon',      ru:'балкон' },
  { sheet:'misc-06', pos:9, cats:['school'], en:'Backpack',     de:'der Rucksack',    ru:'рюкзак' },

  /* -------------------------------------------------------------
     ALCOHOL — 27, three sheets of nine, 05 SEP
     ------------------------------------------------------------- */
  { sheet:'alcohol-01', pos:1, cats:['alcohol'], en:'Bartender', de:'der Barkeeper', ru:'бармен' },
  { sheet:'alcohol-01', pos:2, cats:['alcohol'], en:'Beer mug', de:'der Bierkrug', ru:'пивная кружка' },
  { sheet:'alcohol-01', pos:3, cats:['alcohol'], en:'Brandy', de:'der Brandy', ru:'бренди' },
  { sheet:'alcohol-01', pos:4, cats:['alcohol'], en:'Champagne', de:'der Champagner', ru:'шампанское' },
  { sheet:'alcohol-01', pos:5, cats:['alcohol'], en:'Champagne', de:'der Champagner', ru:'шампанское' },
  { sheet:'alcohol-01', pos:6, cats:['alcohol'], en:'Cider', de:'der Cider', ru:'сидр' },
  { sheet:'alcohol-01', pos:7, cats:['alcohol'], en:'Cocktail shaker', de:'der Cocktailshaker', ru:'шейкер' },
  { sheet:'alcohol-01', pos:8, cats:['alcohol'], en:'Cocktail', de:'der Cocktail', ru:'коктейль' },
  { sheet:'alcohol-01', pos:9, cats:['alcohol'], en:'Drink shot / shot', de:'der Shot', ru:'шот' },
  { sheet:'alcohol-02', pos:1, cats:['alcohol'], en:'Gin', de:'der Gin', ru:'джин' },
  { sheet:'alcohol-02', pos:2, cats:['alcohol'], en:'Liqueur', de:'der Likör', ru:'ликёр' },
  { sheet:'alcohol-02', pos:3, cats:['alcohol'], en:'Margarita', de:'die Margarita', ru:'маргарита' },
  { sheet:'alcohol-02', pos:4, cats:['alcohol'], en:'Martini', de:'der Martini', ru:'мартини' },
  { sheet:'alcohol-02', pos:5, cats:['alcohol'], en:'Mimosa', de:'die Mimosa', ru:'мимоза' },
  { sheet:'alcohol-02', pos:6, cats:['alcohol'], en:'Mojito', de:'der Mojito', ru:'мохито' },
  { sheet:'alcohol-02', pos:7, cats:['alcohol'], en:'Old fashioned whiskey', de:'der Old Fashioned / Whiskeycocktail', ru:'олд-фэшн / коктейль с виски' },
  { sheet:'alcohol-02', pos:8, cats:['alcohol'], en:'Piña colada', de:'die Piña Colada', ru:'пина колада' },
  { sheet:'alcohol-02', pos:9, cats:['alcohol'], en:'Red wine', de:'der Rotwein', ru:'красное вино' },
  { sheet:'alcohol-03', pos:1, cats:['alcohol'], en:'Rosé wine', de:'der Roséwein', ru:'розовое вино' },
  { sheet:'alcohol-03', pos:2, cats:['alcohol'], en:'Rum', de:'der Rum', ru:'ром' },
  { sheet:'alcohol-03', pos:3, cats:['alcohol'], en:'Sake', de:'der Sake', ru:'саке' },
  { sheet:'alcohol-03', pos:4, cats:['alcohol'], en:'Sangria', de:'die Sangria', ru:'сангрия' },
  { sheet:'alcohol-03', pos:5, cats:['alcohol'], en:'Tequila', de:'der Tequila', ru:'текила' },
  { sheet:'alcohol-03', pos:6, cats:['alcohol'], en:'Toast / cheer', de:'anstoßen', ru:'чокаться / произносить тост' },
  { sheet:'alcohol-03', pos:7, cats:['alcohol'], en:'Vodka', de:'der Wodka', ru:'водка' },
  { sheet:'alcohol-03', pos:8, cats:['alcohol'], en:'Whiskey', de:'der Whisky', ru:'виски' },
  { sheet:'alcohol-03', pos:9, cats:['alcohol'], en:'White wine', de:'der Weißwein', ru:'белое вино' },

  /* -------------------------------------------------------------
     NUTS — 9, one sheet, 05 SEP. Below the 10-word rule, flagged in
     gallery-categories.md, kept as its own category rather than force-
     folded into fruit (nuts and fruit are not the same case to Tanya
     even though a botanist would object).
     ------------------------------------------------------------- */
  { sheet:'nuts-1', pos:1, cats:['nuts'], en:'Hazelnut', de:'die Haselnuss', ru:'фундук' },
  { sheet:'nuts-1', pos:2, cats:['nuts'], en:'Chestnut', de:'die Esskastanie', ru:'каштан' },
  { sheet:'nuts-1', pos:3, cats:['nuts'], en:'Macadamia nut', de:'die Macadamianuss', ru:'макадамия' },
  { sheet:'nuts-1', pos:4, cats:['nuts'], en:'Peanut', de:'die Erdnuss', ru:'арахис' },
  { sheet:'nuts-1', pos:5, cats:['nuts'], en:'Pistachio', de:'die Pistazie', ru:'фисташка' },
  { sheet:'nuts-1', pos:6, cats:['nuts'], en:'Walnut', de:'die Walnuss', ru:'грецкий орех' },
  { sheet:'nuts-1', pos:7, cats:['nuts'], en:'Cashew', de:'die Cashewnuss', ru:'кешью' },
  { sheet:'nuts-1', pos:8, cats:['nuts'], en:'Almond', de:'die Mandel', ru:'миндаль' },
  { sheet:'nuts-1', pos:9, cats:['nuts'], en:'Pecan', de:'die Pekannuss', ru:'пекан' },

  /* -------------------------------------------------------------
     FRUIT — 27, three sheets of nine, 05 SEP
     ------------------------------------------------------------- */
  { sheet:'fruit-1', pos:1, cats:['fruit'], en:'Apricot', de:'die Aprikose', ru:'абрикос' },
  { sheet:'fruit-1', pos:2, cats:['fruit'], en:'Bananas', de:'die Bananen', ru:'бананы' },
  { sheet:'fruit-1', pos:3, cats:['fruit'], en:'Blackberries', de:'die Brombeeren', ru:'ежевика' },
  { sheet:'fruit-1', pos:4, cats:['fruit'], en:'Blueberries', de:'die Heidelbeeren', ru:'голубика' },
  { sheet:'fruit-1', pos:5, cats:['fruit'], en:'Cantaloupe', de:'die Cantaloupe-Melone', ru:'дыня канталупа' },
  { sheet:'fruit-1', pos:6, cats:['fruit'], en:'Cherry', de:'die Kirsche', ru:'вишня' },
  { sheet:'fruit-1', pos:7, cats:['fruit'], en:'Coconut', de:'die Kokosnuss', ru:'кокос' },
  { sheet:'fruit-1', pos:8, cats:['fruit'], en:'Fig', de:'die Feige', ru:'инжир' },
  { sheet:'fruit-1', pos:9, cats:['fruit'], en:'Grapefruit', de:'die Grapefruit', ru:'грейпфрут' },
  { sheet:'fruit-2', pos:1, cats:['fruit'], en:'Kiwi', de:'die Kiwi', ru:'киви' },
  { sheet:'fruit-2', pos:2, cats:['fruit'], en:'Limes', de:'die Limetten', ru:'лаймы' },
  { sheet:'fruit-2', pos:3, cats:['fruit'], en:'Mandarin', de:'die Mandarine', ru:'мандарин' },
  { sheet:'fruit-2', pos:4, cats:['fruit'], en:'Mango', de:'die Mango', ru:'манго' },
  { sheet:'fruit-2', pos:5, cats:['fruit'], en:'Nectarine', de:'die Nektarine', ru:'нектарин' },
  { sheet:'fruit-2', pos:6, cats:['fruit'], en:'Orange', de:'die Orange', ru:'апельсин' },
  { sheet:'fruit-2', pos:7, cats:['fruit'], en:'Papaya', de:'die Papaya', ru:'папайя' },
  { sheet:'fruit-2', pos:8, cats:['fruit'], en:'Passion fruit', de:'die Passionsfrucht', ru:'маракуйя' },
  { sheet:'fruit-2', pos:9, cats:['fruit'], en:'Peach', de:'der Pfirsich', ru:'персик' },
  { sheet:'fruit-3', pos:1, cats:['fruit'], en:'Pear', de:'die Birne', ru:'груша' },
  { sheet:'fruit-3', pos:2, cats:['fruit'], en:'Persimmon', de:'die Kaki', ru:'хурма' },
  { sheet:'fruit-3', pos:3, cats:['fruit'], en:'Pineapple', de:'die Ananas', ru:'ананас' },
  { sheet:'fruit-3', pos:4, cats:['fruit'], en:'Plums', de:'die Pflaumen', ru:'сливы' },
  { sheet:'fruit-3', pos:5, cats:['fruit'], en:'Pomegranate', de:'der Granatapfel', ru:'гранат' },
  { sheet:'fruit-3', pos:6, cats:['fruit'], en:'Raspberries', de:'die Himbeeren', ru:'малина' },
  { sheet:'fruit-3', pos:7, cats:['fruit'], en:'Red grapes', de:'die roten Weintrauben', ru:'красный виноград' },
  { sheet:'fruit-3', pos:8, cats:['fruit'], en:'Strawberry', de:'die Erdbeere', ru:'клубника' },
  { sheet:'fruit-3', pos:9, cats:['fruit'], en:'Watermelon', de:'die Wassermelone', ru:'арбуз' },

  /* -------------------------------------------------------------
     CHEESES — 18, two sheets, 05 SEP. Sheet files say 'cheeses',
     category id stays singular 'cheese' to match the pre-existing
     registry entry.
     ------------------------------------------------------------- */
  { sheet:'cheeses-01', pos:1, cats:['cheese'], en:'Blue cheese', de:'der Blauschimmelkäse', ru:'сыр с голубой плесенью' },
  { sheet:'cheeses-01', pos:2, cats:['cheese'], en:'Butter cheese', de:'der Butterkäse', ru:'буттеркезе' },
  { sheet:'cheeses-01', pos:3, cats:['cheese'], en:'Camembert', de:'der Camembert', ru:'камамбер' },
  { sheet:'cheeses-01', pos:4, cats:['cheese'], en:'Cottage cheese', de:'der Hüttenkäse', ru:'зернёный творог' },
  { sheet:'cheeses-01', pos:5, cats:['cheese'], en:'Cream cheese', de:'der Frischkäse', ru:'сливочный сыр' },
  { sheet:'cheeses-01', pos:6, cats:['cheese'], en:'Edam', de:'der Edamer', ru:'эдам' },
  { sheet:'cheeses-01', pos:7, cats:['cheese'], en:'Emmental', de:'der Emmentaler', ru:'эмменталь' },
  { sheet:'cheeses-01', pos:8, cats:['cheese'], en:'Feta', de:'der Feta', ru:'фета' },
  { sheet:'cheeses-01', pos:9, cats:['cheese'], en:'Goat cheese', de:'der Ziegenkäse', ru:'козий сыр' },
  { sheet:'cheeses-02', pos:1, cats:['cheese'], en:'Gouda', de:'der Gouda', ru:'гауда' },
  { sheet:'cheeses-02', pos:2, cats:['cheese'], en:'Hand cheese', de:'der Handkäse', ru:'хандкезе' },
  { sheet:'cheeses-02', pos:3, cats:['cheese'], en:'Harzer cheese', de:'der Harzer Käse', ru:'гарцский сыр' },
  { sheet:'cheeses-02', pos:4, cats:['cheese'], en:'Limburger', de:'der Limburger', ru:'лимбургер' },
  { sheet:'cheeses-02', pos:5, cats:['cheese'], en:'Mountain cheese', de:'der Bergkäse', ru:'горный сыр' },
  { sheet:'cheeses-02', pos:6, cats:['cheese'], en:'Mozzarella', de:'der Mozzarella', ru:'моцарелла' },
  { sheet:'cheeses-02', pos:7, cats:['cheese'], en:'Parmesan', de:'der Parmesan', ru:'пармезан' },
  { sheet:'cheeses-02', pos:8, cats:['cheese'], en:'Raclette cheese', de:'der Raclettekäse', ru:'сыр раклет' },
  { sheet:'cheeses-02', pos:9, cats:['cheese'], en:'Tilsit cheese', de:'der Tilsiter', ru:'тильзитер' },

  /* -------------------------------------------------------------
     ITALIAN FOOD — 9, one sheet, 05 SEP. Below the 10-word rule,
     flagged in gallery-categories.md — first sheet of what may become
     a bigger set, not force-folded anywhere for lack of an honest fit.
     ------------------------------------------------------------- */
  { sheet:'italian-01', pos:1, cats:['italian'], en:'Bruschetta', de:'die Bruschetta', ru:'брускетта' },
  { sheet:'italian-01', pos:2, cats:['italian'], en:'Focaccia', de:'die Focaccia', ru:'фокачча' },
  { sheet:'italian-01', pos:3, cats:['italian'], en:'Gnocchi', de:'die Gnocchi', ru:'ньокки' },
  { sheet:'italian-01', pos:4, cats:['italian'], en:'Lasagna', de:'die Lasagne', ru:'лазанья' },
  { sheet:'italian-01', pos:5, cats:['italian'], en:'Meatballs', de:'die Fleischbällchen', ru:'фрикадельки' },
  { sheet:'italian-01', pos:6, cats:['italian'], en:'Pesto', de:'das Pesto', ru:'песто' },
  { sheet:'italian-01', pos:7, cats:['italian'], en:'Ravioli', de:'die Ravioli', ru:'равиоли' },
  { sheet:'italian-01', pos:8, cats:['italian'], en:'Risotto', de:'das Risotto', ru:'ризотто' },
  { sheet:'italian-01', pos:9, cats:['italian'], en:'Tiramisu', de:'das Tiramisu', ru:'тирамису' },

  /* -------------------------------------------------------------
     MEAT & SEAFOOD — 40, five sheets, 05 SEP (42 slots minus 3 blank/
     unused cells on meat-03, minus 2 that are sushi below). New
     category, clears the 10-word rule easily. 'Cutting meat' and
     'grilling meat' are tagged actions AND meat on purpose — an action
     involving meat is still meat AND still an action, not a choice
     between the two (actions is not verbs-only, same reasoning applies
     both ways). 'Spoiled meat' is the grey, moldy-looking image Steven
     confirmed intentional earlier this project.
     ------------------------------------------------------------- */
  { sheet:'meat-01', pos:1, cats:['meat'], en:'Bacon', de:'der Speck / Bacon', ru:'бекон' },
  { sheet:'meat-01', pos:2, cats:['meat'], en:'Steak', de:'das Steak', ru:'стейк' },
  { sheet:'meat-01', pos:3, cats:['meat'], en:'Bratwurst', de:'die Bratwurst', ru:'братвурст' },
  { sheet:'meat-01', pos:4, cats:['meat'], en:'Canned sardines', de:'die Sardinen in der Dose', ru:'консервированные сардины' },
  { sheet:'meat-01', pos:5, cats:['meat'], en:'Caviar', de:'der Kaviar', ru:'икра' },
  { sheet:'meat-01', pos:6, cats:['meat'], en:'Chicken breast', de:'die Hähnchenbrust', ru:'куриная грудка' },
  { sheet:'meat-01', pos:7, cats:['meat'], en:'Chicken drumstick', de:'die Hähnchenkeule', ru:'куриная голень' },
  { sheet:'meat-01', pos:8, cats:['meat'], en:'Chopsticks', de:'die Essstäbchen', ru:'палочки для еды' },
  { sheet:'meat-01', pos:9, cats:['meat'], en:'Cod fillet', de:'das Kabeljaufilet', ru:'филе трески' },
  { sheet:'meat-02', pos:1, cats:['meat'], en:'Currywurst', de:'die Currywurst', ru:'карривурст' },
  { sheet:'meat-02', pos:2, cats:['actions','meat'], en:'Cutting meat', de:'Fleisch schneiden', ru:'резать мясо' },
  { sheet:'meat-02', pos:3, cats:['meat'], en:'Edamame', de:'die Edamame', ru:'эдамаме' },
  { sheet:'meat-02', pos:4, cats:['meat'], en:'Fillet', de:'das Filet', ru:'филе' },
  { sheet:'meat-02', pos:5, cats:['meat'], en:'Fish sticks', de:'die Fischstäbchen', ru:'рыбные палочки' },
  { sheet:'meat-02', pos:6, cats:['meat'], en:'Frankfurter', de:'das Frankfurter Würstchen', ru:'франкфуртская сосиска' },
  { sheet:'meat-02', pos:7, cats:['actions','meat'], en:'Grilling meat', de:'Fleisch grillen', ru:'жарить мясо на гриле' },
  { sheet:'meat-02', pos:8, cats:['meat'], en:'Ground meat', de:'das Hackfleisch', ru:'фарш' },
  { sheet:'meat-02', pos:9, cats:['meat'], en:'Ham', de:'der Schinken', ru:'ветчина' },
  { sheet:'meat-03', pos:1, cats:['meat'], en:'Herring', de:'der Hering', ru:'сельдь' },
  { sheet:'meat-03', pos:2, cats:['meat'], en:'Lamb chop', de:'das Lammkotelett', ru:'отбивная из баранины' },
  { sheet:'meat-03', pos:3, cats:['meat'], en:'Leberkäse', de:'der Leberkäse', ru:'леберкез' },
  { sheet:'meat-03', pos:4, cats:['meat'], en:'Liver', de:'die Leber', ru:'печень' },
  { sheet:'meat-03', pos:5, cats:['meat'], en:'Meat patty', de:'die Frikadelle', ru:'мясная котлета' },
  { sheet:'meat-03', pos:6, cats:['meat'], en:'Pickled ginger', de:'der eingelegte Ingwer', ru:'маринованный имбирь' },
  { sheet:'meat-04', pos:1, cats:['meat'], en:'Rib', de:'die Rippe', ru:'ребро' },
  { sheet:'meat-04', pos:2, cats:['meat'], en:'Salami', de:'die Salami', ru:'салями' },
  { sheet:'meat-04', pos:3, cats:['meat'], en:'Salmon fillet', de:'das Lachsfilet', ru:'филе лосося' },
  { sheet:'meat-04', pos:4, cats:['meat'], en:'Sashimi', de:'das Sashimi', ru:'сашими' },
  { sheet:'meat-04', pos:5, cats:['meat'], en:'Schnitzel', de:'das Schnitzel', ru:'шницель' },
  { sheet:'meat-04', pos:6, cats:['meat'], en:'Seaweed', de:'die Algen', ru:'морские водоросли' },
  { sheet:'meat-04', pos:7, cats:['meat'], en:'Shrimp', de:'die Garnele', ru:'креветка' },
  { sheet:'meat-04', pos:8, cats:['meat'], en:'Soy sauce', de:'die Sojasoße', ru:'соевый соус' },
  { sheet:'meat-04', pos:9, cats:['meat'], en:'Spoiled meat', de:'das verdorbene Fleisch', ru:'испорченное мясо' },
  { sheet:'meat-05', pos:1, cats:['meat'], en:'Steak', de:'das Steak', ru:'стейк' },
  { sheet:'meat-05', pos:2, cats:['sushi'], en:'Sushi maki roll', de:'die Maki-Rolle', ru:'ролл маки' },
  { sheet:'meat-05', pos:3, cats:['sushi'], en:'Sushi nigiri', de:'das Nigiri', ru:'нигири' },
  { sheet:'meat-05', pos:4, cats:['meat'], en:'Trout', de:'die Forelle', ru:'форель' },
  { sheet:'meat-05', pos:5, cats:['meat'], en:'Tuna steak', de:'das Thunfischsteak', ru:'стейк из тунца' },
  { sheet:'meat-05', pos:6, cats:['meat'], en:'Turkey', de:'die Pute', ru:'индейка' },
  { sheet:'meat-05', pos:7, cats:['meat'], en:'Wasabi', de:'der Wasabi', ru:'васаби' },
  { sheet:'meat-05', pos:8, cats:['meat'], en:'Whole chicken', de:'das ganze Hähnchen', ru:'целая курица' },
  { sheet:'meat-05', pos:9, cats:['meat'], en:'Whole duck', de:'die ganze Ente', ru:'целая утка' },

  /* -------------------------------------------------------------
     VEGETABLES — 54, six sheets, 05 SEP. Mushrooms and cooking herbs
     are folded in here (sheets 05/06) rather than split into their own
     categories, since neither clears the 10-word rule on its own and
     both are naturally 'stuff you cook vegetables with/like'.
     ------------------------------------------------------------- */
  { sheet:'vegetables-01-leafy-greens', pos:1, cats:['vegetables'], en:'Spinach', de:'der Spinat', ru:'шпинат' },
  { sheet:'vegetables-01-leafy-greens', pos:2, cats:['vegetables'], en:'Kale', de:'der Grünkohl', ru:'кудрявая капуста' },
  { sheet:'vegetables-01-leafy-greens', pos:3, cats:['vegetables'], en:'Arugula', de:'der Rucola', ru:'руккола' },
  { sheet:'vegetables-01-leafy-greens', pos:4, cats:['vegetables'], en:'Romaine lettuce', de:'der Römersalat', ru:'салат ромэн' },
  { sheet:'vegetables-01-leafy-greens', pos:5, cats:['vegetables'], en:'Swiss chard', de:'der Mangold', ru:'мангольд' },
  { sheet:'vegetables-01-leafy-greens', pos:6, cats:['vegetables'], en:'Watercress', de:'die Brunnenkresse', ru:'водяной кресс' },
  { sheet:'vegetables-01-leafy-greens', pos:7, cats:['vegetables'], en:'Green cabbage', de:'der Weißkohl', ru:'белокочанная капуста' },
  { sheet:'vegetables-01-leafy-greens', pos:8, cats:['vegetables'], en:'Red cabbage', de:'der Rotkohl', ru:'краснокочанная капуста' },
  { sheet:'vegetables-01-leafy-greens', pos:9, cats:['vegetables'], en:'Bok choy', de:'der Pak Choi', ru:'пак-чой' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:1, cats:['vegetables'], en:'Broccoli', de:'der Brokkoli', ru:'брокколи' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:2, cats:['vegetables'], en:'Cauliflower', de:'der Blumenkohl', ru:'цветная капуста' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:3, cats:['vegetables'], en:'Brussels sprouts', de:'der Rosenkohl', ru:'брюссельская капуста' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:4, cats:['vegetables'], en:'Artichoke', de:'die Artischocke', ru:'артишок' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:5, cats:['vegetables'], en:'Celery', de:'der Sellerie', ru:'сельдерей' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:6, cats:['vegetables'], en:'Asparagus', de:'der Spargel', ru:'спаржа' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:7, cats:['vegetables'], en:'Fennel', de:'der Fenchel', ru:'фенхель' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:8, cats:['vegetables'], en:'Leeks', de:'der Lauch', ru:'лук-порей' },
  { sheet:'vegetables-02-cruciferous-and-green-vegetables', pos:9, cats:['vegetables'], en:'Green onions', de:'die Frühlingszwiebeln', ru:'зелёный лук' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:1, cats:['vegetables'], en:'Tomatoes', de:'die Tomaten', ru:'помидоры' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:2, cats:['vegetables'], en:'Eggplant', de:'die Aubergine', ru:'баклажан' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:3, cats:['vegetables'], en:'Cucumbers', de:'die Gurken', ru:'огурцы' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:4, cats:['vegetables'], en:'Zucchini', de:'die Zucchini', ru:'цукини' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:5, cats:['vegetables'], en:'Butternut squash', de:'der Butternusskürbis', ru:'тыква баттернат' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:6, cats:['vegetables'], en:'Pumpkin', de:'der Kürbis', ru:'тыква' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:7, cats:['vegetables'], en:'Bell peppers', de:'die Paprika', ru:'болгарский перец' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:8, cats:['vegetables'], en:'Chili peppers', de:'die Chilischoten', ru:'перец чили' },
  { sheet:'vegetables-03-fruiting-vegetables-and-squash', pos:9, cats:['vegetables'], en:'Corn', de:'der Mais', ru:'кукуруза' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:1, cats:['vegetables'], en:'Beets', de:'die Rote Bete', ru:'свёкла' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:2, cats:['vegetables'], en:'Sweet potato', de:'die Süßkartoffel', ru:'батат' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:3, cats:['vegetables'], en:'Radishes', de:'die Radieschen', ru:'редис' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:4, cats:['vegetables'], en:'Red onion', de:'die rote Zwiebel', ru:'красный лук' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:5, cats:['vegetables'], en:'Shallots', de:'die Schalotten', ru:'лук-шалот' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:6, cats:['vegetables'], en:'Garlic', de:'der Knoblauch', ru:'чеснок' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:7, cats:['vegetables'], en:'Ginger', de:'der Ingwer', ru:'имбирь' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:8, cats:['vegetables'], en:'Okra', de:'die Okra', ru:'бамия' },
  { sheet:'vegetables-04-roots-and-bulbs', pos:9, cats:['vegetables'], en:'Snap peas', de:'die Zuckerschoten', ru:'сахарный горох' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:1, cats:['vegetables'], en:'Cremini mushrooms', de:'die Cremini-Pilze / braunen Champignons', ru:'грибы кремини' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:2, cats:['vegetables'], en:'Chanterelles', de:'die Pfifferlinge', ru:'лисички' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:3, cats:['vegetables'], en:'Oyster mushrooms', de:'die Austernpilze', ru:'вёшенки' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:4, cats:['vegetables'], en:'King oyster mushrooms', de:'die Kräuterseitlinge', ru:'королевские вёшенки' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:5, cats:['vegetables'], en:'Green beans', de:'die grünen Bohnen', ru:'зелёная фасоль' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:6, cats:['vegetables'], en:'Basil', de:'das Basilikum', ru:'базилик' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:7, cats:['vegetables'], en:'Parsley', de:'die Petersilie', ru:'петрушка' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:8, cats:['vegetables'], en:'Cilantro', de:'der Koriander', ru:'кинза' },
  { sheet:'vegetables-05-mushrooms-and-soft-herbs', pos:9, cats:['vegetables'], en:'Dill', de:'der Dill', ru:'укроп' },
  { sheet:'vegetables-06-herbs-and-stock', pos:1, cats:['vegetables'], en:'Rosemary', de:'der Rosmarin', ru:'розмарин' },
  { sheet:'vegetables-06-herbs-and-stock', pos:2, cats:['vegetables'], en:'Thyme', de:'der Thymian', ru:'тимьян' },
  { sheet:'vegetables-06-herbs-and-stock', pos:3, cats:['vegetables'], en:'Mint', de:'die Minze', ru:'мята' },
  { sheet:'vegetables-06-herbs-and-stock', pos:4, cats:['vegetables'], en:'Sage', de:'der Salbei', ru:'шалфей' },
  { sheet:'vegetables-06-herbs-and-stock', pos:5, cats:['vegetables'], en:'Oregano', de:'der Oregano', ru:'орегано' },
  { sheet:'vegetables-06-herbs-and-stock', pos:6, cats:['vegetables'], en:'Chives', de:'der Schnittlauch', ru:'шнитт-лук' },
  { sheet:'vegetables-06-herbs-and-stock', pos:7, cats:['vegetables'], en:'Bay leaf', de:'das Lorbeerblatt', ru:'лавровый лист' },
  { sheet:'vegetables-06-herbs-and-stock', pos:8, cats:['vegetables'], en:'Bouquet garni', de:'das Bouquet garni', ru:'букет гарни' },
  { sheet:'vegetables-06-herbs-and-stock', pos:9, cats:['vegetables'], en:'Soup vegetables', de:'das Suppengrün', ru:'суповой набор овощей' },

  /* -------------------------------------------------------------
     FOOD — 18, two sheets of nine, 05 SEP. Three new categories
     (carbs, drinks, condiments) are all below the 10-word rule —
     same treatment as nuts/italian: not force-folded into an
     unrelated category, flagged in gallery-categories.md pending
     more sheets. Four words reuse existing categories they
     genuinely belong to (meat, cheese, vegetables, actions).
     de/ru filled in by Steven 05 SEP. */

  { sheet:'food-01', pos:1, cats:['drinks'], en:'Apple spritzer', de:'die Apfelschorle', ru:'яблочный шорле' },
  { sheet:'food-01', pos:2, cats:['carbs'], en:'Berliner', de:'der Berliner', ru:'берлинер' },
  { sheet:'food-01', pos:3, cats:['actions'], en:'Bite', de:'der Biss', ru:'укус' },
  { sheet:'food-01', pos:4, cats:['actions'], en:'Burned', de:'verbrannt', ru:'подгоревший / сгоревший' },
  { sheet:'food-01', pos:5, cats:['drinks'], en:'Cappuccino', de:'der Cappuccino', ru:'капучино' },
  { sheet:'food-01', pos:6, cats:['carbs'], en:'Bread crust', de:'die Brotkruste', ru:'корка хлеба' },
  { sheet:'food-01', pos:7, cats:['carbs'], en:'Pizza crust', de:'der Pizzarand', ru:'корочка пиццы' },
  { sheet:'food-01', pos:8, cats:['carbs'], en:'Dumpling', de:'der Knödel', ru:'кнедль' },
  { sheet:'food-01', pos:9, cats:['condiments'], en:'Mayonnaise', de:'die Mayonnaise', ru:'майонез' },
  { sheet:'food-02', pos:1, cats:['condiments'], en:'Mustard', de:'der Senf', ru:'горчица' },
  { sheet:'food-02', pos:2, cats:['drinks'], en:'Oat milk', de:'die Hafermilch', ru:'овсяное молоко' },
  { sheet:'food-02', pos:3, cats:['condiments'], en:'Paprika', de:'das Paprikapulver', ru:'паприка' },
  { sheet:'food-02', pos:4, cats:['condiments'], en:'Pickle', de:'die Essiggurke', ru:'маринованный огурец' },
  { sheet:'food-02', pos:5, cats:['carbs'], en:'Potato pancake', de:'der Kartoffelpuffer', ru:'картофельная оладья' },
  { sheet:'food-02', pos:6, cats:['cheese'], en:'Quark', de:'der Quark', ru:'творог' },
  { sheet:'food-02', pos:7, cats:['vegetables'], en:'Red cabbage', de:'der Rotkohl', ru:'краснокочанная капуста' },
  { sheet:'food-02', pos:8, cats:['carbs'], en:'Rye bread', de:'das Roggenbrot', ru:'ржаной хлеб' },
  { sheet:'food-02', pos:9, cats:['meat'], en:'Weisswurst', de:'die Weißwurst', ru:'вайсвурст' },

  /* -------------------------------------------------------------
     BODY OBJECTS — 18, two sheets of nine, 05 SEP. Three genuinely
     new topics here, none matching an existing category (rule 2
     checked — nothing else covers body parts, clothing/accessories,
     or health items). All three are below the 10-word rule, same
     flagged-not-folded treatment as nuts/italian/carbs/drinks/
     condiments. `baby` fits none of them and isn't a big enough
     topic on its own yet (1 word) — left with no category, flagged
     in gallery-categories.md as an open question rather than forced
     into a bad fit. */

  { sheet:'body-objects-01', pos:1, cats:[], en:'baby', de:'das Baby', ru:'младенец' },
  { sheet:'body-objects-01', pos:2, cats:['health'], en:'band-aid', de:'das Pflaster', ru:'пластырь' },
  { sheet:'body-objects-01', pos:3, cats:['accessories'], en:'belt', de:'der Gürtel', ru:'ремень' },
  { sheet:'body-objects-01', pos:4, cats:['accessories'], en:'comb', de:'der Kamm', ru:'расчёска' },
  { sheet:'body-objects-01', pos:5, cats:['bodyparts'], en:'finger', de:'der Finger', ru:'палец' },
  { sheet:'body-objects-01', pos:6, cats:['accessories'], en:'glasses', de:'die Brille', ru:'очки' },
  { sheet:'body-objects-01', pos:7, cats:['accessories'], en:'glove', de:'der Handschuh', ru:'перчатка' },
  { sheet:'body-objects-01', pos:8, cats:['bodyparts'], en:'knee', de:'das Knie', ru:'колено' },
  { sheet:'body-objects-01', pos:9, cats:['health'], en:'medicine bottle', de:'die Medizinflasche', ru:'флакон с лекарством' },
  { sheet:'body-objects-02', pos:1, cats:['health'], en:'pill', de:'die Tablette', ru:'таблетка' },
  { sheet:'body-objects-02', pos:2, cats:['accessories'], en:'engagement ring', de:'der Verlobungsring', ru:'помолвочное кольцо' },
  { sheet:'body-objects-02', pos:3, cats:['accessories'], en:'ring', de:'der Ring', ru:'кольцо' },
  { sheet:'body-objects-02', pos:4, cats:['bodyparts'], en:'shoulder', de:'die Schulter', ru:'плечо' },
  { sheet:'body-objects-02', pos:5, cats:['accessories'], en:'skirt', de:'der Rock', ru:'юбка' },
  { sheet:'body-objects-02', pos:6, cats:['health'], en:'thermometer', de:'das Thermometer', ru:'термометр' },
  { sheet:'body-objects-02', pos:7, cats:['health'], en:'tissues', de:'die Taschentücher', ru:'салфетки' },
  { sheet:'body-objects-02', pos:8, cats:['bodyparts'], en:'tongue', de:'die Zunge', ru:'язык' },
  { sheet:'body-objects-02', pos:9, cats:['bodyparts'], en:'tooth', de:'der Zahn', ru:'зуб' },


  /* ---------- CRYSTALS, 05 Sep 2026 — Steven's own EN/DE/RU ----------

     Eighteen minerals over two sheets. `crystals` is a new category and it
     clears both rules in gallery-categories.md on its own: 18 is well over
     the 10-word minimum, and nothing existing covers minerals — `nature`
     is stone, star, river, mountain, lake, island, grass, cloud, which is
     landscape rather than specimens.

     NOT also tagged `nature`. Several of these could honestly carry it,
     but the checklist is explicit that a word must not be padded with
     categories it only half belongs to in order to help a thin category,
     and `nature` is not thin.

     TWO THINGS FOR STEVEN, BOTH FLAGGED RATHER THAN GUESSED:

     1  ARTICLES SUPPLIED 05 Sep, and they were worth waiting for rather
        than guessing. Adding `der` forces the ADJECTIVE ENDING to change
        with it — weak declension after a definite article — so six of
        these are not the names plus a word in front:

          Schwarzer Turmalin  ->  der schwarze Turmalin
          Grüner Turmalin     ->  der grüne Turmalin
          Aquamarin-ähnlicher ->  der Aquamarin-ähnliche Kristallcluster
          Gemischtes Krist.   ->  das gemischte Kristallstück
          Kunzit-ähnliche     ->  die Kunzit-ähnlichen Kristalle
          Blauer Kristall.    ->  der blaue Kristallcluster

        Which is the whole reason a machine-added article would have been
        wrong six times out of eighteen, and exactly the lesson stage 8 of
        Word Lab teaches. `die Kunzit-ähnlichen Kristalle` is the only
        PLURAL headword here; every other entry in this file is singular.

     2  THE DESCRIPTIONS ARE NOT HERE. They were, briefly, in a `def`
        field on each row — and Steven moved them where they belong:
        "Def => dictionary." So they live in `data/dictionary-data.js`,
        keyed by the German headword, and this file is back to the exact
        six-key shape all 330 rows share: sheet, pos, cats, en, de, ru.

        That is the right split. A picture-word row says WHICH CELL and
        WHAT IT IS CALLED. What a word MEANS is a different fact about a
        different thing, it is the same fact whether or not there is a
        picture, and the dictionary is where every other word's meaning
        will live too. A definition hanging off a gallery row would have
        been the only copy in the app in the wrong place. */

  { sheet:'crystals-01', pos:1, cats:['crystals'], en:'celestite', de:'der Celestin', ru:'целестин' },
  { sheet:'crystals-01', pos:2, cats:['crystals'], en:'black tourmaline', de:'der schwarze Turmalin', ru:'чёрный турмалин' },
  { sheet:'crystals-01', pos:3, cats:['crystals'], en:'pyrite', de:'der Pyrit', ru:'пирит' },
  { sheet:'crystals-01', pos:4, cats:['crystals'], en:'green tourmaline', de:'der grüne Turmalin', ru:'зелёный турмалин' },
  { sheet:'crystals-01', pos:5, cats:['crystals'], en:'smoky quartz', de:'der Rauchquarz', ru:'дымчатый кварц' },
  { sheet:'crystals-01', pos:6, cats:['crystals'], en:'fluorite', de:'der Fluorit', ru:'флюорит' },
  { sheet:'crystals-01', pos:7, cats:['crystals'], en:'garnet', de:'der Granat', ru:'гранат' },
  { sheet:'crystals-01', pos:8, cats:['crystals'], en:'aquamarine-like crystal cluster', de:'der Aquamarin-ähnliche Kristallcluster', ru:'кластер кристаллов, похожий на аквамарин' },
  { sheet:'crystals-01', pos:9, cats:['crystals'], en:'amethyst geode', de:'die Amethyst-Geode', ru:'аметистовая жеода' },
  { sheet:'crystals-02', pos:1, cats:['crystals'], en:'citrine-like crystal cluster', de:'der Citrin-ähnliche Kristallcluster', ru:'кластер кристаллов, похожий на цитрин' },
  { sheet:'crystals-02', pos:2, cats:['crystals'], en:'rose quartz', de:'der Rosenquarz', ru:'розовый кварц' },
  { sheet:'crystals-02', pos:3, cats:['crystals'], en:'mixed crystal specimen', de:'das gemischte Kristallstück', ru:'смешанный кристаллический образец' },
  { sheet:'crystals-02', pos:4, cats:['crystals'], en:'amethyst', de:'der Amethyst', ru:'аметист' },
  { sheet:'crystals-02', pos:5, cats:['crystals'], en:'vanadinite', de:'der Vanadinit', ru:'ванадинит' },
  { sheet:'crystals-02', pos:6, cats:['crystals'], en:'labradorite', de:'der Labradorit', ru:'лабрадорит' },
  { sheet:'crystals-02', pos:7, cats:['crystals'], en:'kunzite-like crystals', de:'die Kunzit-ähnlichen Kristalle', ru:'кристаллы, похожие на кунцит' },
  { sheet:'crystals-02', pos:8, cats:['crystals'], en:'blue crystal cluster', de:'der blaue Kristallcluster', ru:'синий кристаллический кластер' },
  { sheet:'crystals-02', pos:9, cats:['crystals'], en:'malachite', de:'der Malachit', ru:'малахит' },

];
