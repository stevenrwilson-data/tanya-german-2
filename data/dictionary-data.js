/* data/dictionary-data.js */
/* THE DICTIONARY — one definition per headword, in all three languages.

   Steven, 05 Sep: "Def => dictionary. If you don't have a dictionary.js
   file make it now.. it will be huge soon. I am making a dictionary
   section."

   So this file is new, it is nearly empty, and that is its normal state
   today. The eighteen crystals are in it because their definitions
   arrived first — they were briefly a `def` field on each gallery row and
   were moved here rather than left in the wrong file.

   ------------------------------------------------------------------
   WHAT THIS IS NOT

   NOT `data/multi-definitions-data.js`. That file holds the words that
   mean more than one thing — five headwords, thirteen senses, each with
   its own equivalents and its own picture. A word belongs there when one
   German word maps to two unrelated Russian ones and a single gloss would
   have to lie. It belongs HERE when it has one meaning and that meaning
   needs saying properly.

   Most words are the second kind, which is why this one will be large and
   that one will not.

   ------------------------------------------------------------------
   KEYED BY THE GERMAN HEADWORD, WITH ITS ARTICLE

   `GH_DEFS['der Malachit']`, not `['Malachit']` and not by number. The
   article is part of the headword everywhere else in this app — vocab.js,
   gallery.js and multi-definitions-data.js all carry it — and a key that
   dropped it would be the one place the same word is written two ways.

   An object rather than an array, because this is a LOOKUP: something has
   a German word and wants its definition. At a few thousand entries a
   linear scan per word would be silly, and an array would invite one.

   ------------------------------------------------------------------
   NOTHING READS IT YET

   Said plainly so nobody assumes it is wired. The dictionary SECTION is
   Steven's to design; when it exists it reads this. Until then adding
   definitions here is safe and costs nothing.

   Two callers are the obvious first ones on the day it is wanted:
   `reference.js`'s word list, which currently shows a one-line gloss and
   has a "Definitions" button in its open spec, and `wordlook.js`, which
   already resolves a German form to a headword and could hand back the
   definition with it.

   ------------------------------------------------------------------
   ADDING ONE

     'der Pyrit': { en:'...', de:'...', ru:'...' }

   All three languages. Steven's rule, stated 05 Sep: "Always English +
   Russian + German for these descriptions." A definition in one language
   is a definition Tanya cannot read.
*/

window.GH_DEFS = {

  /* ---------- crystals, 05 Sep ----------
     Eighteen minerals, two sheets in data/gallery.js. These descriptions
     are what tell two look-alike specimens apart — a pale blue pointed
     cluster from aqua-blue elongated points — which is exactly the job a
     definition does and exactly what a one-word gloss cannot. */
  'der Celestin': {
    en:'Pale blue translucent crystals forming a dense pointed cluster.',
    de:'Blassblaue, durchscheinende Kristalle, die einen dichten, spitzen Cluster bilden.',
    ru:'Бледно-голубые полупрозрачные кристаллы, образующие плотный заострённый кластер.' },
  'der schwarze Turmalin': {
    en:'Long black prismatic crystals with strong vertical grooves.',
    de:'Lange schwarze prismatische Kristalle mit starken vertikalen Rillen.',
    ru:'Длинные чёрные призматические кристаллы с выраженными вертикальными бороздками.' },
  'der Pyrit': {
    en:'Bright metallic gold crystals with chunky cubic faces.',
    de:'Helle metallisch-goldene Kristalle mit klobigen würfelförmigen Flächen.',
    ru:'Яркие металлически-золотые кристаллы с массивными кубическими гранями.' },
  'der grüne Turmalin': {
    en:'Tall, vivid green prismatic crystals growing together in a cluster.',
    de:'Hohe, leuchtend grüne prismatische Kristalle, die zusammen in einem Cluster wachsen.',
    ru:'Высокие яркие зелёные призматические кристаллы, растущие вместе в кластере.' },
  'der Rauchquarz': {
    en:'Transparent to dark brown quartz points with smoky coloration.',
    de:'Durchsichtige bis dunkelbraune Quarzspitzen mit rauchiger Färbung.',
    ru:'Прозрачные до тёмно-коричневых кварцевые острия с дымчатой окраской.' },
  'der Fluorit': {
    en:'Purple and green translucent cubic crystals growing on rock.',
    de:'Violette und grüne durchscheinende würfelförmige Kristalle auf Gestein.',
    ru:'Фиолетовые и зелёные полупрозрачные кубические кристаллы на породе.' },
  'der Granat': {
    en:'Deep red, glossy geometric crystals embedded in a dark matrix.',
    de:'Tiefrote, glänzende geometrische Kristalle in einer dunklen Matrix eingebettet.',
    ru:'Тёмно-красные глянцевые геометрические кристаллы, вкраплённые в тёмную матрицу.' },
  'der Aquamarin-ähnliche Kristallcluster': {
    en:'Clear aqua-blue elongated points forming a bright cluster.',
    de:'Klare aqua-blaue längliche Spitzen, die einen hellen Cluster bilden.',
    ru:'Прозрачные аквамариново-голубые удлинённые острия, образующие яркий кластер.' },
  'die Amethyst-Geode': {
    en:'A hollow rock cavity lined with many small purple crystals.',
    de:'Ein hohler Gesteinshohlraum, ausgekleidet mit vielen kleinen violetten Kristallen.',
    ru:'Полая полость в породе, выстланная множеством мелких фиолетовых кристаллов.' },
  'der Citrin-ähnliche Kristallcluster': {
    en:'Golden-yellow transparent crystal points packed into a tall cluster.',
    de:'Goldgelbe durchsichtige Kristallspitzen, dicht in einem hohen Cluster gepackt.',
    ru:'Золотисто-жёлтые прозрачные кристаллические острия, плотно упакованные в высокий кластер.' },
  'der Rosenquarz': {
    en:'Soft pink translucent crystals with both rough and pointed forms.',
    de:'Sanftrosa durchscheinende Kristalle mit sowohl rauen als auch spitzen Formen.',
    ru:'Нежно-розовые полупрозрачные кристаллы как с грубыми, так и с заострёнными формами.' },
  'das gemischte Kristallstück': {
    en:'Pink, golden-yellow, and pale green crystals growing together on one matrix.',
    de:'Rosa, goldgelbe und blassgrüne Kristalle, die zusammen auf einer Matrix wachsen.',
    ru:'Розовые, золотисто-жёлтые и бледно-зелёные кристаллы, растущие вместе на одной матрице.' },
  'der Amethyst': {
    en:'Deep violet crystal points forming a dense upright cluster.',
    de:'Tiefviolette Kristallspitzen, die einen dichten aufrechten Cluster bilden.',
    ru:'Тёмно-фиолетовые кристаллические острия, образующие плотный вертикальный кластер.' },
  'der Vanadinit': {
    en:'Orange-red hexagonal crystals growing on a dark brown rocky base.',
    de:'Orangerote hexagonale Kristalle auf einer dunkelbraunen felsigen Basis.',
    ru:'Оранжево-красные гексагональные кристаллы на тёмно-коричневой каменистой основе.' },
  'der Labradorit': {
    en:'Smooth dark stone showing a brilliant blue-green iridescent flash.',
    de:'Glatter dunkler Stein mit einem brillanten blau-grünen irisierenden Schimmer.',
    ru:'Гладкий тёмный камень с яркой сине-зелёной иридесцентной вспышкой.' },
  'die Kunzit-ähnlichen Kristalle': {
    en:'Pale pink elongated prismatic crystals with strong vertical striations.',
    de:'Blassrosa längliche prismatische Kristalle mit starken vertikalen Streifen.',
    ru:'Бледно-розовые удлинённые призматические кристаллы с выраженными вертикальными штрихами.' },
  'der blaue Kristallcluster': {
    en:'Intense royal-blue blocky crystals scattered across a brown matrix.',
    de:'Intensive königsblaue blockige Kristalle, verstreut auf einer braunen Matrix.',
    ru:'Интенсивные королевско-синие глыбовидные кристаллы, разбросанные по коричневой матрице.' },
  'der Malachit': {
    en:'Rich green mineral with rounded formations and distinctive dark-and-light banding.',
    de:'Sattes grünes Mineral mit abgerundeten Formen und markanter dunkel-heller Bänderung.',
    ru:'Насыщенно-зелёный минерал с округлыми формами и характерной тёмно-светлой полосчатостью.' },

};
