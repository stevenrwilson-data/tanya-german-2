/* ============================================================
   VOCAB BANK — 278 words, each with two sentences.

   n   the image number, so the picture comes free
   de  the German word, with its article where it has one
   ru  Russian (missing above 70 for now — the translate mode
       simply skips any entry with no ru)
   en  English
   cat which topic it belongs to
   s   the two sentences, each in all three languages
   ============================================================ */

window.GH_VOCAB = [
  { n:1, cat:'body', de:'der Kopf', en:'head', ru:'голова', rg:'F',
    s:[{ de:'Mein Kopf tut weh.', en:'My head hurts.', ru:'У меня болит голова.' }, { de:'Ich berühre meinen Kopf.', en:'I touch my head.', ru:'Я трогаю свою голову.' }] },
  { n:2, cat:'body', de:'die Augen', en:'eyes', ru:'глаза', rg:'PL', rgs:'M',
    s:[{ de:'Ich habe blaue Augen.', en:'I have blue eyes.', ru:'У меня голубые глаза.' }, { de:'Meine Augen sind müde.', en:'My eyes are tired.', ru:'Мои глаза устали.' }] },
  { n:3, cat:'body', de:'die Hände', en:'hands', ru:'кисти рук', rg:'PL', rgs:'F',
    s:[{ de:'Ich wasche meine Hände.', en:'I wash my hands.', ru:'Я мою руки.' }, { de:'Meine Hände sind kalt.', en:'My hands are cold.', ru:'Мои руки холодные.' }] },
  { n:4, cat:'body', de:'die Füße', en:'feet', ru:'ступни', rg:'PL', rgs:'F',
    s:[{ de:'Meine Füße sind müde.', en:'My feet are tired.', ru:'Мои ноги устали.' }, { de:'Ich wasche meine Füße.', en:'I wash my feet.', ru:'Я мою ноги.' }] },
  { n:5, cat:'body', de:'die Haare', en:'hair', ru:'волосы', rg:'PL', rgs:'M',
    s:[{ de:'Meine Haare sind lang.', en:'My hair is long.', ru:'У меня длинные волосы.' }, { de:'Ich wasche meine Haare.', en:'I wash my hair.', ru:'Я мою волосы.' }] },
  { n:6, cat:'body', de:'der Rücken', en:'back', ru:'спина', rg:'F',
    s:[{ de:'Mein Rücken tut weh.', en:'My back hurts.', ru:'У меня болит спина.' }, { de:'Ich lege mich auf den Rücken.', en:'I lie on my back.', ru:'Я ложусь на спину.' }] },
  { n:7, cat:'body', de:'der Bauch', en:'stomach', ru:'живот', rg:'M',
    s:[{ de:'Mein Bauch tut weh.', en:'My stomach hurts.', ru:'У меня болит живот.' }, { de:'Ich berühre meinen Bauch.', en:'I touch my stomach.', ru:'Я трогаю свой живот.' }] },
  { n:8, cat:'body', de:'das Gesicht', en:'face', ru:'лицо', rg:'N',
    s:[{ de:'Ich wasche mein Gesicht.', en:'I wash my face.', ru:'Я мою лицо.' }, { de:'Mein Gesicht ist warm.', en:'My face is warm.', ru:'Моё лицо тёплое.' }] },
  { n:9, cat:'body', de:'die Zähne', en:'teeth', ru:'зубы', rg:'PL', rgs:'M',
    s:[{ de:'Ich putze meine Zähne.', en:'I brush my teeth.', ru:'Я чищу зубы.' }, { de:'Meine Zähne sind sauber.', en:'My teeth are clean.', ru:'Мои зубы чистые.' }] },
  { n:10, cat:'body', de:'die Nase', en:'nose', ru:'нос', rg:'M',
    s:[{ de:'Ich habe eine kleine Nase.', en:'I have a small nose.', ru:'У меня маленький нос.' }, { de:'Meine Nase ist kalt.', en:'My nose is cold.', ru:'Мой нос холодный.' }] },
  { n:11, cat:'body', de:'die Haut', en:'skin', ru:'кожа', rg:'F',
    s:[{ de:'Meine Haut ist trocken.', en:'My skin is dry.', ru:'Моя кожа сухая.' }, { de:'Diese Creme ist gut für meine Haut.', en:'This cream is good for my skin.', ru:'Этот крем хорош для моей кожи.' }] },
  { n:12, cat:'body', de:'die Arme', en:'arms', ru:'руки', rg:'PL', rgs:'F',
    s:[{ de:'Ich bewege meine Arme.', en:'I move my arms.', ru:'Я двигаю руками.' }, { de:'Meine Arme sind müde.', en:'My arms are tired.', ru:'Мои руки устали.' }] },
  { n:13, cat:'body', de:'das Bein', en:'leg', ru:'нога', rg:'F',
    s:[{ de:'Mein Bein tut weh.', en:'My leg hurts.', ru:'У меня болит нога.' }, { de:'Ich bewege mein Bein.', en:'I move my leg.', ru:'Я двигаю ногой.' }] },
  { n:14, cat:'body', de:'die Finger', en:'fingers', ru:'пальцы рук', rg:'PL', rgs:'M',
    s:[{ de:'Ich habe zehn Finger.', en:'I have ten fingers.', ru:'У меня десять пальцев.' }, { de:'Meine Finger sind kalt.', en:'My fingers are cold.', ru:'Мои пальцы холодные.' }] },
  { n:15, cat:'body', de:'die Ohren', en:'ears', ru:'уши', rg:'PL', rgs:'N',
    s:[{ de:'Meine Ohren sind kalt.', en:'My ears are cold.', ru:'Мои уши холодные.' }, { de:'Ich habe zwei Ohren.', en:'I have two ears.', ru:'У меня два уха.' }] },
  { n:16, cat:'shopping', de:'die Jacke', en:'jacket', ru:'куртка', rg:'F',
    s:[{ de:'Ich brauche eine neue Jacke.', en:'I need a new jacket.', ru:'Мне нужна новая куртка.' }, { de:'Meine Jacke ist warm.', en:'My jacket is warm.', ru:'Моя куртка тёплая.' }] },
  { n:17, cat:'shopping', de:'die schwarze Jacke', en:'black jacket', ru:'чёрная куртка', rg:'F',
    s:[{ de:'Sie trägt eine schwarze Jacke.', en:'She is wearing a black jacket.', ru:'Она носит чёрную куртку.' }, { de:'Die schwarze Jacke ist schön.', en:'The black jacket is beautiful.', ru:'Чёрная куртка красивая.' }] },
  { n:18, cat:'shopping', de:'das Kleid', en:'dress', ru:'платье', rg:'N',
    s:[{ de:'Ich möchte dieses Kleid.', en:'I would like this dress.', ru:'Я хочу это платье.' }, { de:'Das Kleid passt gut.', en:'The dress fits well.', ru:'Платье хорошо сидит.' }] },
  { n:19, cat:'shopping', de:'die Schuhe', en:'shoes', ru:'обувь', rg:'PL',
    s:[{ de:'Ich suche neue Schuhe.', en:'I am looking for new shoes.', ru:'Я ищу новую обувь.' }, { de:'Diese Schuhe sind bequem.', en:'These shoes are comfortable.', ru:'Эти туфли удобные.' }] },
  { n:20, cat:'shopping', de:'die Hose', en:'pants', ru:'брюки', rg:'PL',
    s:[{ de:'Die Hose ist zu groß.', en:'The pants are too big.', ru:'Брюки слишком большие.' }, { de:'Ich brauche eine neue Hose.', en:'I need new pants.', ru:'Мне нужны новые брюки.' }] },
  { n:21, cat:'shopping', de:'die Tasche', en:'bag', ru:'сумка', rg:'F',
    s:[{ de:'Ich brauche eine Tasche.', en:'I need a bag.', ru:'Мне нужна сумка.' }, { de:'Meine Tasche ist auf dem Tisch.', en:'My bag is on the table.', ru:'Моя сумка на столе.' }] },
  { n:22, cat:'shopping', de:'das Geschäft', en:'store', ru:'магазин', rg:'M',
    s:[{ de:'Ich gehe in ein Geschäft.', en:'I am going into a store.', ru:'Я иду в магазин.' }, { de:'Das Geschäft ist heute offen.', en:'The store is open today.', ru:'Магазин сегодня открыт.' }] },
  { n:23, cat:'shopping', de:'die Kasse', en:'checkout counter', ru:'касса', rg:'F',
    s:[{ de:'Wo ist die Kasse?', en:'Where is the checkout?', ru:'Где касса?' }, { de:'Ich bezahle an der Kasse.', en:'I pay at the checkout.', ru:'Я плачу на кассе.' }] },
  { n:24, cat:'shopping', de:'die Kreditkarte', en:'credit card', ru:'кредитная карта', rg:'F',
    s:[{ de:'Ich habe eine Kreditkarte.', en:'I have a credit card.', ru:'У меня есть кредитная карта.' }, { de:'Ich bezahle mit meiner Kreditkarte.', en:'I pay with my credit card.', ru:'Я плачу кредитной картой.' }] },
  { n:25, cat:'shopping', de:'das Größenetikett', en:'clothing size tag', ru:'бирка с размером одежды', rg:'F',
    s:[{ de:'Ich sehe das Größenetikett.', en:'I see the size tag.', ru:'Я вижу ярлык с размером.' }, { de:'Die Größe steht auf dem Größenetikett.', en:'The size is on the size tag.', ru:'Размер написан на ярлыке.' }] },
  { n:26, cat:'shopping', de:'ein Paar Schuhe', en:'pair of shoes', ru:'пара обуви', rg:'F',
    s:[{ de:'Ich brauche ein Paar Schuhe.', en:'I need a pair of shoes.', ru:'Мне нужна пара обуви.' }, { de:'Dieses Paar Schuhe ist schön.', en:'This pair of shoes is beautiful.', ru:'Эта пара обуви красивая.' }] },
  { n:27, cat:'shopping', de:'der Pullover', en:'sweater', ru:'свитер', rg:'M',
    s:[{ de:'Mein Pullover ist weich.', en:'My sweater is soft.', ru:'Мой свитер мягкий.' }, { de:'Ich ziehe einen Pullover an.', en:'I put on a sweater.', ru:'Я надеваю свитер.' }] },
  { n:28, cat:'shopping', de:'der warme Pullover', en:'warm sweater', ru:'тёплый свитер', rg:'M',
    s:[{ de:'Ich trage einen warmen Pullover.', en:'I am wearing a warm sweater.', ru:'Я ношу тёплый свитер.' }, { de:'Der warme Pullover ist sehr bequem.', en:'The warm sweater is very comfortable.', ru:'Тёплый свитер очень удобный.' }] },
  { n:29, cat:'shopping', de:'der Schal', en:'scarf', ru:'шарф', rg:'M',
    s:[{ de:'Ich trage einen Schal.', en:'I am wearing a scarf.', ru:'Я ношу шарф.' }, { de:'Mein Schal ist rosa.', en:'My scarf is pink.', ru:'Мой шарф розовый.' }] },
  { n:30, cat:'shopping', de:'der Lippenstift', en:'lipstick', ru:'губная помада', rg:'F',
    s:[{ de:'Ich benutze Lippenstift.', en:'I use lipstick.', ru:'Я пользуюсь помадой.' }, { de:'Der Lippenstift ist neu.', en:'The lipstick is new.', ru:'Помада новая.' }] },
  { n:31, cat:'beauty', de:'der rote Lippenstift', en:'red lipstick', ru:'красная губная помада', rg:'F',
    s:[{ de:'Der rote Lippenstift ist schön.', en:'The red lipstick is beautiful.', ru:'Красная помада красивая.' }, { de:'Sie benutzt roten Lippenstift.', en:'She uses red lipstick.', ru:'Она пользуется красной помадой.' }] },
  { n:32, cat:'beauty', de:'der Nagellack', en:'nail polish', ru:'лак для ногтей', rg:'M',
    s:[{ de:'Ich benutze Nagellack.', en:'I use nail polish.', ru:'Я пользуюсь лаком для ногтей.' }, { de:'Der Nagellack ist auf dem Tisch.', en:'The nail polish is on the table.', ru:'Лак для ногтей на столе.' }] },
  { n:33, cat:'beauty', de:'der rosa Nagellack', en:'pink nail polish', ru:'розовый лак для ногтей', rg:'M',
    s:[{ de:'Ich mag rosa Nagellack.', en:'I like pink nail polish.', ru:'Мне нравится розовый лак для ногтей.' }, { de:'Der rosa Nagellack ist schön.', en:'The pink nail polish is beautiful.', ru:'Розовый лак красивый.' }] },
  { n:34, cat:'beauty', de:'die Fingernägel', en:'fingernails', ru:'ногти на руках', rg:'PL', rgs:'M',
    s:[{ de:'Meine Fingernägel sind kurz.', en:'My fingernails are short.', ru:'Мои ногти короткие.' }, { de:'Ich lackiere meine Fingernägel.', en:'I paint my fingernails.', ru:'Я крашу ногти.' }] },
  { n:35, cat:'beauty', de:'die Haarbürste', en:'hairbrush', ru:'щётка для волос', rg:'F',
    s:[{ de:'Ich brauche eine neue Haarbürste.', en:'I need a new hairbrush.', ru:'Мне нужна новая расчёска.' }, { de:'Meine Haarbürste liegt im Badezimmer.', en:'My hairbrush is in the bathroom.', ru:'Моя расчёска лежит в ванной.' }] },
  { n:36, cat:'beauty', de:'die Gesichtscreme', en:'face cream', ru:'крем для лица', rg:'M',
    s:[{ de:'Ich benutze Gesichtscreme.', en:'I use face cream.', ru:'Я пользуюсь кремом для лица.' }, { de:'Die Gesichtscreme riecht gut.', en:'The face cream smells good.', ru:'Крем для лица хорошо пахнет.' }] },
  { n:37, cat:'beauty', de:'das Make-up', en:'makeup', ru:'макияж', rg:'M',
    s:[{ de:'Ich trage heute Make-up.', en:'I am wearing makeup today.', ru:'Сегодня я накрашена.' }, { de:'Mein Make-up ist leicht.', en:'My makeup is light.', ru:'Мой макияж лёгкий.' }] },
  { n:38, cat:'beauty', de:'die Mascara', en:'mascara', ru:'тушь для ресниц', rg:'F',
    s:[{ de:'Ich benutze Mascara.', en:'I use mascara.', ru:'Я пользуюсь тушью.' }, { de:'Die Mascara ist schwarz.', en:'The mascara is black.', ru:'Тушь чёрная.' }] },
  { n:39, cat:'beauty', de:'der Spiegel', en:'mirror', ru:'зеркало', rg:'N',
    s:[{ de:'Ich brauche einen Spiegel.', en:'I need a mirror.', ru:'Мне нужно зеркало.' }, { de:'Ich sehe mich im Spiegel.', en:'I look at myself in the mirror.', ru:'Я смотрю на себя в зеркало.' }] },
  { n:40, cat:'beauty', de:'das Parfüm', en:'perfume', ru:'духи', rg:'PL',
    s:[{ de:'Mein Parfüm riecht schön.', en:'My perfume smells nice.', ru:'Мои духи хорошо пахнут.' }, { de:'Ich benutze heute Parfüm.', en:'I am using perfume today.', ru:'Сегодня я пользуюсь духами.' }] },
  { n:41, cat:'beauty', de:'das Kosmetikgeschäft', en:'cosmetics store', ru:'магазин косметики', rg:'M',
    s:[{ de:'Ich gehe in ein Kosmetikgeschäft.', en:'I am going into a cosmetics store.', ru:'Я иду в магазин косметики.' }, { de:'Das Kosmetikgeschäft ist groß.', en:'The cosmetics store is big.', ru:'Магазин косметики большой.' }] },
  { n:42, cat:'beauty', de:'der Cremetiegel', en:'cream container', ru:'баночка с кремом', rg:'F',
    s:[{ de:'Der Cremetiegel ist klein.', en:'The cream jar is small.', ru:'Баночка с кремом маленькая.' }, { de:'Ich öffne den Cremetiegel.', en:'I open the cream jar.', ru:'Я открываю баночку с кремом.' }] },
  { n:43, cat:'beauty', de:'die kleine Packung', en:'small package', ru:'маленькая упаковка', rg:'F',
    s:[{ de:'Ich kaufe die kleine Packung.', en:'I buy the small package.', ru:'Я покупаю маленькую упаковку.' }, { de:'Die kleine Packung ist billiger.', en:'The small package is cheaper.', ru:'Маленькая упаковка дешевле.' }] },
  { n:44, cat:'beauty', de:'das Wasser', en:'water', ru:'вода', rg:'F',
    s:[{ de:'Ich trinke viel Wasser.', en:'I drink a lot of water.', ru:'Я пью много воды.' }, { de:'Das Wasser ist kalt.', en:'The water is cold.', ru:'Вода холодная.' }] },
  { n:45, cat:'body', de:'das Glas Wasser', en:'glass of water', ru:'стакан воды', rg:'M',
    s:[{ de:'Ich trinke ein Glas Wasser.', en:'I drink a glass of water.', ru:'Я пью стакан воды.' }, { de:'Das Glas Wasser steht auf dem Tisch.', en:'The glass of water is on the table.', ru:'Стакан воды стоит на столе.' }] },
  { n:46, cat:'food', de:'das Brot', en:'bread', ru:'хлеб', rg:'M',
    s:[{ de:'Ich esse gern Brot.', en:'I like eating bread.', ru:'Я люблю есть хлеб.' }, { de:'Das Brot ist frisch.', en:'The bread is fresh.', ru:'Хлеб свежий.' }] },
  { n:47, cat:'food', de:'der Kaffee', en:'coffee', ru:'кофе', rg:'M',
    s:[{ de:'Der Kaffee ist heiß.', en:'The coffee is hot.', ru:'Кофе горячий.' }, { de:'Ich trinke morgens Kaffee.', en:'I drink coffee in the morning.', ru:'Я пью кофе по утрам.' }] },
  { n:48, cat:'food', de:'die Suppe', en:'soup', ru:'суп', rg:'M',
    s:[{ de:'Die Suppe ist lecker.', en:'The soup is tasty.', ru:'Суп вкусный.' }, { de:'Ich esse eine warme Suppe.', en:'I eat a warm soup.', ru:'Я ем тёплый суп.' }] },
  { n:49, cat:'food', de:'das Gemüse', en:'vegetables', ru:'овощи', rg:'PL', rgs:'M',
    s:[{ de:'Ich esse gern Gemüse.', en:'I like eating vegetables.', ru:'Я люблю есть овощи.' }, { de:'Das Gemüse ist frisch.', en:'The vegetables are fresh.', ru:'Овощи свежие.' }] },
  { n:50, cat:'food', imgs:[50,528], de:'der Apfel', en:'apple', ru:'яблоко', rg:'N',
    s:[{ de:'Ich esse einen Apfel.', en:'I am eating an apple.', ru:'Я ем яблоко.' }, { de:'Der Apfel ist rot.', en:'The apple is red.', ru:'Яблоко красное.' }] },
  { n:51, cat:'food', de:'die Eier', en:'eggs', ru:'яйца', rg:'PL', rgs:'N',
    s:[{ de:'Ich esse zwei Eier.', en:'I eat two eggs.', ru:'Я ем два яйца.' }, { de:'Die Eier sind zum Frühstück.', en:'The eggs are for breakfast.', ru:'Яйца на завтрак.' }] },
  { n:52, cat:'food', de:'das Frühstück', en:'breakfast', ru:'завтрак', rg:'M',
    s:[{ de:'Mein Frühstück ist einfach.', en:'My breakfast is simple.', ru:'Мой завтрак простой.' }, { de:'Ich mache jeden Morgen Frühstück.', en:'I make breakfast every morning.', ru:'Я готовлю завтрак каждое утро.' }] },
  { n:53, cat:'food', de:'der Tee', en:'tea', ru:'чай', rg:'M',
    s:[{ de:'Ich trinke gern Tee.', en:'I like drinking tea.', ru:'Я люблю пить чай.' }, { de:'Der Tee ist heiß.', en:'The tea is hot.', ru:'Чай горячий.' }] },
  { n:54, cat:'food', de:'die Milch', en:'milk', ru:'молоко', rg:'N',
    s:[{ de:'Ich trinke Milch.', en:'I drink milk.', ru:'Я пью молоко.' }, { de:'Die Milch ist kalt.', en:'The milk is cold.', ru:'Молоко холодное.' }] },
  { n:55, cat:'food', de:'der Salat', en:'salad', ru:'салат', rg:'M',
    s:[{ de:'Ich möchte einen Salat.', en:'I would like a salad.', ru:'Я хочу салат.' }, { de:'Der Salat ist frisch.', en:'The salad is fresh.', ru:'Салат свежий.' }] },
  { n:56, cat:'food', de:'die Kartoffeln', en:'potatoes', ru:'картофель', rg:'PL',
    s:[{ de:'Wir brauchen Kartoffeln.', en:'We need potatoes.', ru:'Нам нужна картошка.' }, { de:'Ich schneide die Kartoffeln.', en:'I cut the potatoes.', ru:'Я режу картошку.' }] },
  { n:57, cat:'food', de:'die Tomate', en:'tomato', ru:'помидор', rg:'M',
    s:[{ de:'Ich schneide eine Tomate.', en:'I cut a tomato.', ru:'Я режу помидор.' }, { de:'Die Tomate ist rot.', en:'The tomato is red.', ru:'Помидор красный.' }] },
  { n:58, cat:'food', de:'das Fleisch', en:'meat', ru:'мясо', rg:'N',
    s:[{ de:'Ich esse kein Fleisch.', en:'I do not eat meat.', ru:'Я не ем мясо.' }, { de:'Das Fleisch ist auf dem Teller.', en:'The meat is on the plate.', ru:'Мясо на тарелке.' }] },
  { n:59, cat:'food', de:'die Schokolade', en:'chocolate', ru:'шоколад', rg:'M',
    s:[{ de:'Die Schokolade ist süß.', en:'The chocolate is sweet.', ru:'Шоколад сладкий.' }, { de:'Ich esse gern Schokolade.', en:'I like eating chocolate.', ru:'Я люблю есть шоколад.' }] },
  { n:60, cat:'food', de:'die Zitrone', en:'lemon', ru:'лимон', rg:'M',
    s:[{ de:'Die Zitrone ist sauer.', en:'The lemon is sour.', ru:'Лимон кислый.' }, { de:'Ich schneide eine Zitrone.', en:'I cut a lemon.', ru:'Я режу лимон.' }] },
  { n:61, cat:'food', de:'die Karotten', en:'carrots', ru:'морковь', rg:'PL',
    s:[{ de:'Ich schneide die Karotten.', en:'I cut the carrots.', ru:'Я режу морковь.' }, { de:'Die Karotten sind frisch.', en:'The carrots are fresh.', ru:'Морковь свежая.' }] },
  { n:62, cat:'food', de:'die Zwiebeln', en:'onions', ru:'репчатый лук', rg:'PL',
    s:[{ de:'Wir brauchen zwei Zwiebeln.', en:'We need two onions.', ru:'Нам нужны две луковицы.' }, { de:'Ich schneide die Zwiebeln.', en:'I cut the onions.', ru:'Я режу лук.' }] },
  { n:63, cat:'food', de:'der Kochtopf', en:'cooking pot', ru:'кастрюля', rg:'F',
    s:[{ de:'Der Kochtopf steht auf dem Herd.', en:'The cooking pot is on the stove.', ru:'Кастрюля стоит на плите.' }, { de:'Ich gebe das Gemüse in den Kochtopf.', en:'I put the vegetables into the pot.', ru:'Я кладу овощи в кастрюлю.' }] },
  { n:64, cat:'food', de:'das Abendessen', en:'dinner', ru:'ужин', rg:'M',
    s:[{ de:'Das Abendessen ist fertig.', en:'Dinner is ready.', ru:'Ужин готов.' }, { de:'Wir essen zusammen Abendessen.', en:'We eat dinner together.', ru:'Мы ужинаем вместе.' }] },
  { n:65, cat:'home', de:'das Zuhause', en:'home', ru:'дом', rg:'M',
    s:[{ de:'Mein Zuhause ist ruhig.', en:'My home is quiet.', ru:'Мой дом тихий.' }, { de:'Ich mag mein Zuhause.', en:'I like my home.', ru:'Мне нравится мой дом.' }] },
  { n:66, cat:'home', de:'die Wohnung', en:'apartment', ru:'квартира', rg:'F',
    s:[{ de:'Meine Wohnung ist warm.', en:'My apartment is warm.', ru:'Моя квартира тёплая.' }, { de:'Die Wohnung hat eine kleine Küche.', en:'The apartment has a small kitchen.', ru:'В квартире маленькая кухня.' }] },
  { n:67, cat:'home', de:'das Bett', en:'bed', ru:'кровать', rg:'F',
    s:[{ de:'Ich mache mein Bett.', en:'I make my bed.', ru:'Я застилаю кровать.' }, { de:'Mein Handy liegt auf dem Bett.', en:'My phone is on the bed.', ru:'Мой телефон лежит на кровати.' }] },
  { n:68, cat:'home', de:'das Fenster', en:'window', ru:'окно', rg:'N',
    s:[{ de:'Ich öffne das Fenster.', en:'I open the window.', ru:'Я открываю окно.' }, { de:'Das Fenster ist offen.', en:'The window is open.', ru:'Окно открыто.' }] },
  { n:69, cat:'home', de:'das Licht', en:'light', ru:'свет', rg:'M',
    s:[{ de:'Ich mache das Licht an.', en:'I turn on the light.', ru:'Я включаю свет.' }, { de:'Das Licht ist sehr hell.', en:'The light is very bright.', ru:'Свет очень яркий.' }] },
  { n:70, cat:'home', de:'das Zimmer', en:'room', ru:'комната', rg:'F',
    s:[{ de:'Ich räume mein Zimmer auf.', en:'I tidy my room.', ru:'Я убираю свою комнату.' }, { de:'Mein Zimmer ist sauber.', en:'My room is clean.', ru:'Моя комната чистая.' }] },
  { n:71, cat:'home', de:'die Wäsche', en:'laundry', ru:'бельё', rg:'N',
    s:[{ de:'Ich wasche die Wäsche.', en:'I wash the laundry.', ru:'Я стираю бельё.' }, { de:'Die Wäsche ist sauber.', en:'The laundry is clean.', ru:'Бельё чистое.' }] },
  { n:72, cat:'home', de:'die Küche', en:'kitchen', ru:'кухня', rg:'F',
    s:[{ de:'Ich putze die Küche.', en:'I clean the kitchen.', ru:'Я убираю кухню.' }, { de:'Meine Küche ist klein.', en:'My kitchen is small.', ru:'Моя кухня маленькая.' }] },
  { n:73, cat:'home', de:'das Sofa', en:'sofa', ru:'диван', rg:'M',
    s:[{ de:'Ich sitze auf dem Sofa.', en:'I sit on the sofa.', ru:'Я сижу на диване.' }, { de:'Das Sofa ist bequem.', en:'The sofa is comfortable.', ru:'Диван удобный.' }] },
  { n:74, cat:'home', de:'die Tür', en:'door', ru:'дверь', rg:'F',
    s:[{ de:'Ich öffne die Tür.', en:'I open the door.', ru:'Я открываю дверь.' }, { de:'Die Tür ist geschlossen.', en:'The door is closed.', ru:'Дверь закрыта.' }] },
  { n:75, cat:'home', de:'der Tisch', en:'table', ru:'стол', rg:'M',
    s:[{ de:'Das Essen steht auf dem Tisch.', en:'The food is on the table.', ru:'Еда стоит на столе.' }, { de:'Ich sitze am Tisch.', en:'I sit at the table.', ru:'Я сижу за столом.' }] },
  { n:76, cat:'home', de:'das Handy', en:'phone', ru:'телефон', rg:'M',
    s:[{ de:'Mein Handy liegt auf dem Bett.', en:'My phone is on the bed.', ru:'Мой телефон лежит на кровати.' }, { de:'Ich benutze mein Handy.', en:'I use my phone.', ru:'Я пользуюсь телефоном.' }] },
  { n:77, cat:'home', de:'der Fernseher', en:'television', ru:'телевизор', rg:'M',
    s:[{ de:'Der Fernseher ist im Wohnzimmer.', en:'The television is in the living room.', ru:'Телевизор стоит в гостиной.' }, { de:'Ich schalte den Fernseher an.', en:'I turn on the television.', ru:'Я включаю телевизор.' }] },
  { n:78, cat:'home', de:'ein Pullover auf dem Bett', en:'sweater lying on bed', ru:'свитер на кровати', rg:'M',
    s:[{ de:'Der Pullover liegt auf dem Bett.', en:'The sweater is lying on the bed.', ru:'Свитер лежит на кровати.' }, { de:'Ich sehe einen Pullover auf dem Bett.', en:'I see a sweater on the bed.', ru:'Я вижу свитер на кровати.' }] },
  { n:79, cat:'home', de:'ein Handy unter dem Pullover', en:'phone under sweater', ru:'телефон под свитером', rg:'M',
    s:[{ de:'Das Handy liegt unter dem Pullover.', en:'The phone is under the sweater.', ru:'Телефон лежит под свитером.' }, { de:'Ich finde mein Handy unter dem Pullover.', en:'I find my phone under the sweater.', ru:'Я нахожу свой телефон под свитером.' }] },
  { n:80, cat:'family', de:'der Sohn', en:'son', ru:'сын', rg:'M',
    s:[{ de:'Ich habe einen Sohn.', en:'I have a son.', ru:'У меня есть сын.' }, { de:'Mein Sohn geht zur Schule.', en:'My son goes to school.', ru:'Мой сын ходит в школу.' }] },
  { n:81, cat:'family', de:'die Mutter', en:'mother', ru:'мама', rg:'F',
    s:[{ de:'Meine Mutter wohnt weit weg.', en:'My mother lives far away.', ru:'Моя мама живёт далеко.' }, { de:'Ich rufe meine Mutter an.', en:'I call my mother.', ru:'Я звоню маме.' }] },
  { n:82, cat:'family', de:'der Vater', en:'father', ru:'папа', rg:'M',
    s:[{ de:'Mein Vater arbeitet heute.', en:'My father is working today.', ru:'Мой папа сегодня работает.' }, { de:'Ich spreche mit meinem Vater.', en:'I talk to my father.', ru:'Я разговариваю с папой.' }] },
  { n:83, cat:'family', de:'die Schwester', en:'sister', ru:'сестра', rg:'F',
    s:[{ de:'Ich habe eine Schwester.', en:'I have a sister.', ru:'У меня есть сестра.' }, { de:'Meine Schwester ist jünger als ich.', en:'My sister is younger than me.', ru:'Моя сестра младше меня.' }] },
  { n:84, cat:'family', de:'der Bruder', en:'brother', ru:'брат', rg:'M',
    s:[{ de:'Ich habe einen Bruder.', en:'I have a brother.', ru:'У меня есть брат.' }, { de:'Mein Bruder ist älter als ich.', en:'My brother is older than me.', ru:'Мой брат старше меня.' }] },
  { n:85, cat:'family', de:'die Eltern', en:'parents', ru:'родители', rg:'PL',
    s:[{ de:'Meine Eltern sind zu Hause.', en:'My parents are at home.', ru:'Мои родители дома.' }, { de:'Ich besuche meine Eltern.', en:'I visit my parents.', ru:'Я навещаю родителей.' }] },
  { n:86, cat:'family', de:'die Familie', en:'family', ru:'семья', rg:'F',
    s:[{ de:'Meine Familie ist wichtig für mich.', en:'My family is important to me.', ru:'Моя семья важна для меня.' }, { de:'Ich liebe meine Familie.', en:'I love my family.', ru:'Я люблю свою семью.' }] },
  { n:87, cat:'family', de:'das Kind', en:'child', ru:'ребёнок', rg:'M',
    s:[{ de:'Das Kind spielt draußen.', en:'The child is playing outside.', ru:'Ребёнок играет на улице.' }, { de:'Das Kind geht zur Schule.', en:'The child goes to school.', ru:'Ребёнок ходит в школу.' }] },
  { n:88, cat:'family', de:'die Frau', en:'woman', ru:'женщина', rg:'F',
    s:[{ de:'Die Frau trinkt Kaffee.', en:'The woman is drinking coffee.', ru:'Женщина пьёт кофе.' }, { de:'Die Frau geht einkaufen.', en:'The woman is going shopping.', ru:'Женщина идёт за покупками.' }] },
  { n:89, cat:'family', de:'der Junge', en:'boy', ru:'мальчик', rg:'M',
    s:[{ de:'Der Junge geht zur Schule.', en:'The boy goes to school.', ru:'Мальчик ходит в школу.' }, { de:'Der Junge macht seine Hausaufgaben.', en:'The boy is doing his homework.', ru:'Мальчик делает домашнее задание.' }] },
  { n:90, cat:'family', de:'die Schule', en:'school', ru:'школа', rg:'F',
    s:[{ de:'Mein Sohn ist in der Schule.', en:'My son is at school.', ru:'Мой сын в школе.' }, { de:'Die Schule ist nicht weit.', en:'The school is not far.', ru:'Школа недалеко.' }] },
  { n:91, cat:'family', de:'die Hausaufgaben', en:'homework', ru:'домашнее задание', rg:'PL',
    s:[{ de:'Er macht seine Hausaufgaben.', en:'He is doing his homework.', ru:'Он делает домашнее задание.' }, { de:'Die Hausaufgaben sind einfach.', en:'The homework is easy.', ru:'Домашнее задание простое.' }] },
  { n:92, cat:'family', de:'der Schulrucksack', en:'school bag', ru:'школьный рюкзак', rg:'M',
    s:[{ de:'Mein Sohn hat einen Schulrucksack.', en:'My son has a school bag.', ru:'У моего сына есть школьный рюкзак.' }, { de:'Der Schulrucksack ist blau.', en:'The school bag is blue.', ru:'Школьный рюкзак синий.' }] },
  { n:93, cat:'weather', de:'die Sonne', en:'sun', ru:'солнце', rg:'N',
    s:[{ de:'Die Sonne scheint heute.', en:'The sun is shining today.', ru:'Сегодня светит солнце.' }, { de:'Ich mag die Sonne.', en:'I like the sun.', ru:'Мне нравится солнце.' }] },
  { n:94, cat:'weather', de:'der Regen', en:'rain', ru:'дождь', rg:'M',
    s:[{ de:'Der Regen ist stark.', en:'The rain is heavy.', ru:'Дождь сильный.' }, { de:'Ich gehe nicht gern im Regen spazieren.', en:'I do not like walking in the rain.', ru:'Я не люблю гулять под дождём.' }] },
  { n:95, cat:'weather', de:'der Schnee', en:'snow', ru:'снег', rg:'M',
    s:[{ de:'Der Schnee ist weiß.', en:'The snow is white.', ru:'Снег белый.' }, { de:'Die Kinder spielen im Schnee.', en:'The children are playing in the snow.', ru:'Дети играют в снегу.' }] },
  { n:96, cat:'weather', de:'der blaue Himmel', en:'blue sky', ru:'голубое небо', rg:'N',
    s:[{ de:'Der Himmel ist blau.', en:'The sky is blue.', ru:'Небо голубое.' }, { de:'Ich sehe den blauen Himmel.', en:'I see the blue sky.', ru:'Я вижу голубое небо.' }] },
  { n:97, cat:'weather', de:'der graue Himmel', en:'gray sky', ru:'серое небо', rg:'N',
    s:[{ de:'Der Himmel ist grau.', en:'The sky is gray.', ru:'Небо серое.' }, { de:'Der graue Himmel sieht dunkel aus.', en:'The gray sky looks dark.', ru:'Серое небо выглядит тёмным.' }] },
  { n:98, cat:'weather', de:'die Wolken', en:'clouds', ru:'облака', rg:'PL', rgs:'N',
    s:[{ de:'Heute gibt es viele Wolken.', en:'There are many clouds today.', ru:'Сегодня много облаков.' }, { de:'Die Wolken sind grau.', en:'The clouds are gray.', ru:'Облака серые.' }] },
  { n:99, cat:'weather', de:'der Wind', en:'wind', ru:'ветер', rg:'M',
    s:[{ de:'Der Wind ist stark.', en:'The wind is strong.', ru:'Ветер сильный.' }, { de:'Der Wind ist heute kalt.', en:'The wind is cold today.', ru:'Сегодня ветер холодный.' }] },
  { n:100, cat:'weather', de:'der Regenschirm', en:'umbrella', ru:'зонт', rg:'M',
    s:[{ de:'Ich nehme einen Regenschirm mit.', en:'I am taking an umbrella with me.', ru:'Я беру с собой зонт.' }, { de:'Mein Regenschirm ist schwarz.', en:'My umbrella is black.', ru:'Мой зонт чёрный.' }] },
  { n:101, cat:'weather', de:'das kalte Wetter', en:'cold weather', ru:'холодная погода', rg:'F',
    s:[{ de:'Ich mag das kalte Wetter nicht.', en:'I do not like cold weather.', ru:'Я не люблю холодную погоду.' }, { de:'Bei kaltem Wetter trage ich eine Jacke.', en:'In cold weather I wear a jacket.', ru:'В холодную погоду я ношу куртку.' }] },
  { n:102, cat:'weather', de:'das sonnige Wetter', en:'sunny weather', ru:'солнечная погода', rg:'F',
    s:[{ de:'Ich mag sonniges Wetter.', en:'I like sunny weather.', ru:'Мне нравится солнечная погода.' }, { de:'Bei sonnigem Wetter gehe ich spazieren.', en:'In sunny weather I go for a walk.', ru:'В солнечную погоду я гуляю.' }] },
  { n:103, cat:'weather', de:'das regnerische Wetter', en:'rainy weather', ru:'дождливая погода', rg:'F',
    s:[{ de:'Das regnerische Wetter ist nicht schön.', en:'Rainy weather is not nice.', ru:'Дождливая погода нехорошая.' }, { de:'Bei regnerischem Wetter brauche ich einen Regenschirm.', en:'In rainy weather I need an umbrella.', ru:'В дождливую погоду мне нужен зонт.' }] },
  { n:104, cat:'weather', de:'das Schneewetter', en:'snowy weather', ru:'снежная погода', rg:'F',
    s:[{ de:'Im Winter gibt es oft Schneewetter.', en:'In winter there is often snowy weather.', ru:'Зимой часто бывает снежная погода.' }, { de:'Bei Schneewetter ist es kalt.', en:'In snowy weather it is cold.', ru:'В снежную погоду холодно.' }] },
  { n:105, cat:'travel', de:'der Bus', en:'bus', ru:'автобус', rg:'M',
    s:[{ de:'Der Bus kommt um neun Uhr.', en:'The bus comes at nine o\'clock.', ru:'Автобус приходит в девять часов.' }, { de:'Ich fahre mit dem Bus.', en:'I travel by bus.', ru:'Я езжу на автобусе.' }] },
  { n:106, cat:'travel', de:'der Zug', en:'train', ru:'поезд', rg:'M',
    s:[{ de:'Der Zug kommt um zehn Uhr.', en:'The train comes at ten o\'clock.', ru:'Поезд приходит в десять часов.' }, { de:'Ich fahre mit dem Zug.', en:'I travel by train.', ru:'Я езжу на поезде.' }] },
  { n:107, cat:'travel', de:'die Bushaltestelle', en:'bus stop', ru:'автобусная остановка', rg:'F',
    s:[{ de:'Wo ist die Bushaltestelle?', en:'Where is the bus stop?', ru:'Где автобусная остановка?' }, { de:'Ich warte an der Bushaltestelle.', en:'I wait at the bus stop.', ru:'Я жду на автобусной остановке.' }] },
  { n:108, cat:'travel', de:'der Bahnhof', en:'train station', ru:'вокзал', rg:'M',
    s:[{ de:'Wo ist der Bahnhof?', en:'Where is the train station?', ru:'Где вокзал?' }, { de:'Ich fahre zum Bahnhof.', en:'I am going to the train station.', ru:'Я еду на вокзал.' }] },
  { n:109, cat:'travel', de:'die Fahrkarte', en:'ticket', ru:'билет', rg:'M',
    s:[{ de:'Ich brauche eine Fahrkarte.', en:'I need a ticket.', ru:'Мне нужен билет.' }, { de:'Ich kaufe eine Fahrkarte am Bahnhof.', en:'I buy a ticket at the train station.', ru:'Я покупаю билет на вокзале.' }] },
  { n:110, cat:'travel', de:'das Stadtzentrum', en:'city center', ru:'центр города', rg:'M',
    s:[{ de:'Ich fahre ins Stadtzentrum.', en:'I am going to the city center.', ru:'Я еду в центр города.' }, { de:'Das Stadtzentrum ist sehr groß.', en:'The city center is very big.', ru:'Центр города очень большой.' }] },
  { n:111, cat:'travel', imgs:[111,540], de:'der Koffer', en:'suitcase', ru:'чемодан', rg:'M',
    s:[{ de:'Mein Koffer ist schwer.', en:'My suitcase is heavy.', ru:'Мой чемодан тяжёлый.' }, { de:'Ich nehme meinen Koffer mit.', en:'I am taking my suitcase with me.', ru:'Я беру с собой чемодан.' }] },
  { n:112, cat:'travel', de:'der kleine Koffer', en:'small suitcase', ru:'маленький чемодан', rg:'M',
    s:[{ de:'Ich habe einen kleinen Koffer.', en:'I have a small suitcase.', ru:'У меня маленький чемодан.' }, { de:'Der kleine Koffer ist leicht.', en:'The small suitcase is light.', ru:'Маленький чемодан лёгкий.' }] },
  { n:113, cat:'travel', de:'das Zugfenster', en:'train window', ru:'окно поезда', rg:'N',
    s:[{ de:'Ich sitze am Zugfenster.', en:'I sit by the train window.', ru:'Я сижу у окна в поезде.' }, { de:'Ich schaue aus dem Zugfenster.', en:'I look out of the train window.', ru:'Я смотрю в окно поезда.' }] },
  { n:114, cat:'travel', de:'der Sitzplatz', en:'seat', ru:'место', rg:'N',
    s:[{ de:'Ich finde einen Sitzplatz.', en:'I find a seat.', ru:'Я нахожу место.' }, { de:'Mein Sitzplatz ist am Fenster.', en:'My seat is by the window.', ru:'Моё место у окна.' }] },
  { n:115, cat:'travel', de:'zwei Fahrkarten', en:'two tickets', ru:'два билета', rg:'PL',
    s:[{ de:'Ich habe zwei Fahrkarten.', en:'I have two tickets.', ru:'У меня два билета.' }, { de:'Wir brauchen zwei Fahrkarten.', en:'We need two tickets.', ru:'Нам нужны два билета.' }] },
  { n:116, cat:'body', de:'müde', en:'tired', ru:'уставшая',
    s:[{ de:'Ich bin heute müde.', en:'I am tired today.', ru:'Я сегодня устала.' }, { de:'Nach der Arbeit bin ich müde.', en:'After work I am tired.', ru:'После работы я устаю.' }] },
  { n:117, cat:'body', de:'sehr müde', en:'very tired', ru:'очень уставшая',
    s:[{ de:'Ich bin heute sehr müde.', en:'I am very tired today.', ru:'Я сегодня очень устала.' }, { de:'Am Abend ist sie sehr müde.', en:'In the evening she is very tired.', ru:'Вечером она очень устала.' }] },
  { n:118, cat:'family', de:'glücklich', en:'happy', ru:'счастливая',
    s:[{ de:'Ich bin heute glücklich.', en:'I am happy today.', ru:'Я сегодня счастлива.' }, { de:'Sie ist sehr glücklich.', en:'She is very happy.', ru:'Она очень счастлива.' }] },
  { n:119, cat:'body', de:'sich gut fühlen', en:'feeling good', ru:'чувствует себя хорошо',
    s:[{ de:'Ich fühle mich gut.', en:'I feel good.', ru:'Я чувствую себя хорошо.' }, { de:'Heute fühlt sie sich gut.', en:'Today she feels good.', ru:'Сегодня она чувствует себя хорошо.' }] },
  { n:120, cat:'body', de:'sich besser fühlen', en:'feeling better', ru:'чувствует себя лучше',
    s:[{ de:'Ich fühle mich heute besser.', en:'I feel better today.', ru:'Сегодня я чувствую себя лучше.' }, { de:'Nach dem Schlafen fühlt sie sich besser.', en:'After sleeping she feels better.', ru:'После сна она чувствует себя лучше.' }] },
  { n:121, cat:'food', de:'hungrig', en:'hungry', ru:'голодная',
    s:[{ de:'Ich bin hungrig.', en:'I am hungry.', ru:'Я голодна.' }, { de:'Am Morgen bin ich oft hungrig.', en:'In the morning I am often hungry.', ru:'Утром я часто голодна.' }] },
  { n:122, cat:'food', de:'satt', en:'full', ru:'сытая',
    s:[{ de:'Ich bin satt.', en:'I am full.', ru:'Я сыта.' }, { de:'Nach dem Abendessen bin ich satt.', en:'After dinner I am full.', ru:'После ужина я сыта.' }] },
  { n:123, cat:'weather', de:'kalt', en:'cold', ru:'холодно',
    s:[{ de:'Mir ist kalt.', en:'I am cold.', ru:'Мне холодно.' }, { de:'Am Abend ist mir oft kalt.', en:'In the evening I am often cold.', ru:'Вечером мне часто холодно.' }] },
  { n:124, cat:'body', de:'kalte Hände', en:'hands feeling cold', ru:'руки мёрзнут',
    s:[{ de:'Meine Hände sind kalt.', en:'My hands are cold.', ru:'Мои руки холодные.' }, { de:'Im Winter habe ich oft kalte Hände.', en:'In winter I often have cold hands.', ru:'Зимой у меня часто холодные руки.' }] },
  { n:125, cat:'body', de:'müde Füße', en:'feet feeling tired', ru:'ноги устали',
    s:[{ de:'Meine Füße sind müde.', en:'My feet are tired.', ru:'Мои ноги устали.' }, { de:'Nach dem Spaziergang habe ich müde Füße.', en:'After the walk I have tired feet.', ru:'После прогулки у меня устали ноги.' }] },
  { n:126, cat:'body', de:'müde Augen', en:'eyes feeling tired', ru:'глаза устали',
    s:[{ de:'Meine Augen sind müde.', en:'My eyes are tired.', ru:'Мои глаза устали.' }, { de:'Am Abend habe ich müde Augen.', en:'In the evening I have tired eyes.', ru:'Вечером у меня устают глаза.' }] },
  { n:127, cat:'body', de:'Rückenschmerzen', en:'back pain', ru:'боль в спине',
    s:[{ de:'Ich habe Rückenschmerzen.', en:'I have back pain.', ru:'У меня болит спина.' }, { de:'Wegen der Rückenschmerzen ruhe ich mich aus.', en:'Because of the back pain I rest.', ru:'Из-за боли в спине я отдыхаю.' }] },
  { n:128, cat:'body', de:'Kopfschmerzen', en:'headache', ru:'головная боль',
    s:[{ de:'Ich habe Kopfschmerzen.', en:'I have a headache.', ru:'У меня болит голова.' }, { de:'Wegen der Kopfschmerzen möchte ich schlafen.', en:'Because of the headache I want to sleep.', ru:'Из-за головной боли я хочу спать.' }] },
  { n:129, cat:'body', de:'Bauchschmerzen', en:'stomachache', ru:'боль в животе',
    s:[{ de:'Ich habe Bauchschmerzen.', en:'I have a stomachache.', ru:'У меня болит живот.' }, { de:'Wegen der Bauchschmerzen esse ich nichts.', en:'Because of the stomachache I do not eat anything.', ru:'Из-за боли в животе я ничего не ем.' }] },
  { n:130, cat:'body', de:'Beinschmerzen', en:'leg pain', ru:'боль в ноге',
    s:[{ de:'Ich habe Beinschmerzen.', en:'I have leg pain.', ru:'У меня болит нога.' }, { de:'Wegen der Beinschmerzen sitze ich heute viel.', en:'Because of the leg pain I sit a lot today.', ru:'Из-за боли в ноге я сегодня много сижу.' }] },
  { n:131, cat:'body', de:'trockene Haut', en:'dry skin', ru:'сухая кожа',
    s:[{ de:'Ich habe trockene Haut.', en:'I have dry skin.', ru:'У меня сухая кожа.' }, { de:'Gesichtscreme hilft bei trockener Haut.', en:'Face cream helps with dry skin.', ru:'Крем для лица помогает при сухой коже.' }] },
  { n:132, cat:'beauty', de:'weiche Haut', en:'soft skin', ru:'мягкая кожа',
    s:[{ de:'Meine Haut ist weich.', en:'My skin is soft.', ru:'Моя кожа мягкая.' }, { de:'Die Creme macht meine Haut weich.', en:'The cream makes my skin soft.', ru:'Крем делает мою кожу мягкой.' }] },
  { n:133, cat:'shopping', de:'bequem', en:'comfortable', ru:'удобно',
    s:[{ de:'Diese Schuhe sind bequem.', en:'These shoes are comfortable.', ru:'Эти туфли удобные.' }, { de:'Der Pullover ist sehr bequem.', en:'The sweater is very comfortable.', ru:'Свитер очень удобный.' }] },
  { n:134, cat:'shopping', de:'etwas mögen', en:'liking something', ru:'что-то нравится',
    s:[{ de:'Ich mag diese Farbe.', en:'I like this color.', ru:'Мне нравится этот цвет.' }, { de:'Sie mag diese Jacke.', en:'She likes this jacket.', ru:'Ей нравится эта куртка.' }] },
  { n:135, cat:'beauty', de:'mit dem eigenen Aussehen zufrieden', en:'pleased with appearance', ru:'довольна своей внешностью',
    s:[{ de:'Sie ist mit ihrem Aussehen zufrieden.', en:'She is pleased with her appearance.', ru:'Она довольна своим внешним видом.' }, { de:'Heute ist sie mit ihrem Aussehen sehr zufrieden.', en:'Today she is very pleased with her appearance.', ru:'Сегодня она очень довольна своим внешним видом.' }] },
  { n:136, cat:'beauty', de:'bereit', en:'ready', ru:'готова',
    s:[{ de:'Ich bin bereit.', en:'I am ready.', ru:'Я готова.' }, { de:'Sie ist bereit zu gehen.', en:'She is ready to go.', ru:'Она готова идти.' }] },
  { n:137, cat:'home', de:'ruhig', en:'calm', ru:'спокойная',
    s:[{ de:'Ich bin heute ruhig.', en:'I am calm today.', ru:'Я сегодня спокойна.' }, { de:'Nach dem Kaffee sitzt sie ruhig auf dem Sofa.', en:'After the coffee she sits calmly on the sofa.', ru:'После кофе она спокойно сидит на диване.' }] },
  { n:138, cat:'home', de:'verwirrt', en:'confused', ru:'растерянная',
    s:[{ de:'Ich bin ein bisschen verwirrt.', en:'I am a little confused.', ru:'Я немного растеряна.' }, { de:'Sie ist verwirrt und sucht ihr Handy.', en:'She is confused and is looking for her phone.', ru:'Она растеряна и ищет свой телефон.' }] },
  { n:139, cat:'home', de:'erleichtert', en:'relieved', ru:'испытывает облегчение',
    s:[{ de:'Ich bin erleichtert.', en:'I am relieved.', ru:'Я чувствую облегчение.' }, { de:'Sie findet ihr Handy und ist erleichtert.', en:'She finds her phone and is relieved.', ru:'Она находит телефон и чувствует облегчение.' }] },
  { n:140, cat:'home', de:'interessiert', en:'interested', ru:'заинтересована',
    s:[{ de:'Ich bin interessiert.', en:'I am interested.', ru:'Мне интересно.' }, { de:'Sie ist an diesem Kleid interessiert.', en:'She is interested in this dress.', ru:'Её интересует это платье.' }] },
  { n:141, cat:'home', de:'einen Film genießen', en:'enjoying movie', ru:'наслаждается фильмом',
    s:[{ de:'Ich genieße den Film.', en:'I am enjoying the movie.', ru:'Я наслаждаюсь фильмом.' }, { de:'Am Abend genießt sie einen Film.', en:'In the evening she enjoys a movie.', ru:'Вечером она наслаждается фильмом.' }] },
  { n:142, cat:'home', de:'Essen genießen', en:'enjoying food', ru:'наслаждается едой',
    s:[{ de:'Ich genieße mein Essen.', en:'I am enjoying my food.', ru:'Я наслаждаюсь едой.' }, { de:'Sie sitzt am Tisch und genießt ihr Essen.', en:'She sits at the table and enjoys her food.', ru:'Она сидит за столом и наслаждается едой.' }] },
  { n:143, cat:'body', de:'Hände waschen', en:'wash hands', ru:'мыть руки',
    s:[{ de:'Ich wasche meine Hände.', en:'I wash my hands.', ru:'Я мою руки.' }, { de:'Vor dem Essen wäscht sie ihre Hände.', en:'Before eating she washes her hands.', ru:'Перед едой она моет руки.' }] },
  { n:144, cat:'body', de:'das Gesicht waschen', en:'wash face', ru:'умываться',
    s:[{ de:'Ich wasche mein Gesicht.', en:'I wash my face.', ru:'Я мою лицо.' }, { de:'Am Morgen wäscht sie ihr Gesicht.', en:'In the morning she washes her face.', ru:'Утром она моет лицо.' }] },
  { n:145, cat:'body', de:'Zähne putzen', en:'brush teeth', ru:'чистить зубы',
    s:[{ de:'Ich putze meine Zähne.', en:'I brush my teeth.', ru:'Я чищу зубы.' }, { de:'Am Abend putzt sie ihre Zähne.', en:'In the evening she brushes her teeth.', ru:'Вечером она чистит зубы.' }] },
  { n:146, cat:'beauty', de:'Haare bürsten', en:'brush hair', ru:'расчёсывать волосы',
    s:[{ de:'Ich bürste meine Haare.', en:'I brush my hair.', ru:'Я расчёсываю волосы.' }, { de:'Am Morgen bürstet sie ihre Haare.', en:'In the morning she brushes her hair.', ru:'Утром она расчёсывает волосы.' }] },
  { n:147, cat:'beauty', de:'Haare waschen', en:'wash hair', ru:'мыть волосы',
    s:[{ de:'Ich wasche meine Haare.', en:'I wash my hair.', ru:'Я мою волосы.' }, { de:'Heute Abend wäscht sie ihre Haare.', en:'This evening she washes her hair.', ru:'Сегодня вечером она моет волосы.' }] },
  { n:148, cat:'body', de:'die Augen schließen', en:'close eyes', ru:'закрывать глаза',
    s:[{ de:'Ich schließe meine Augen.', en:'I close my eyes.', ru:'Я закрываю глаза.' }, { de:'Sie schließt ihre Augen und ruht sich aus.', en:'She closes her eyes and rests.', ru:'Она закрывает глаза и отдыхает.' }] },
  { n:149, cat:'body', de:'die Augen öffnen', en:'open eyes', ru:'открывать глаза',
    s:[{ de:'Ich öffne meine Augen.', en:'I open my eyes.', ru:'Я открываю глаза.' }, { de:'Am Morgen öffnet sie ihre Augen.', en:'In the morning she opens her eyes.', ru:'Утром она открывает глаза.' }] },
  { n:150, cat:'body', de:'die Arme bewegen', en:'move arms', ru:'двигать руками',
    s:[{ de:'Ich bewege meine Arme.', en:'I move my arms.', ru:'Я двигаю руками.' }, { de:'Sie bewegt ihre Arme langsam.', en:'She moves her arms slowly.', ru:'Она медленно двигает руками.' }] },
  { n:151, cat:'body', de:'sich hinsetzen', en:'sit down', ru:'садиться',
    s:[{ de:'Ich setze mich auf das Sofa.', en:'I sit down on the sofa.', ru:'Я сажусь на диван.' }, { de:'Sie setzt sich auf einen Stuhl.', en:'She sits down on a chair.', ru:'Она садится на стул.' }] },
  { n:152, cat:'body', de:'sich ausruhen', en:'rest', ru:'отдыхать',
    s:[{ de:'Ich ruhe mich aus.', en:'I rest.', ru:'Я отдыхаю.' }, { de:'Nach der Arbeit ruht sie sich aus.', en:'After work she rests.', ru:'После работы она отдыхает.' }] },
  { n:153, cat:'food', de:'Wasser trinken', en:'drink water', ru:'пить воду',
    s:[{ de:'Ich trinke viel Wasser.', en:'I drink a lot of water.', ru:'Я пью много воды.' }, { de:'Nach dem Spaziergang trinkt sie Wasser.', en:'After the walk she drinks water.', ru:'После прогулки она пьёт воду.' }] },
  { n:154, cat:'body', de:'einen Pullover anziehen', en:'put on sweater', ru:'надевать свитер',
    s:[{ de:'Ich ziehe einen warmen Pullover an.', en:'I put on a warm sweater.', ru:'Я надеваю тёплый свитер.' }, { de:'Sie zieht ihren Pullover an.', en:'She puts on her sweater.', ru:'Она надевает свой свитер.' }] },
  { n:155, cat:'weather', de:'eine Jacke anziehen', en:'put on jacket', ru:'надевать куртку',
    s:[{ de:'Ich ziehe meine Jacke an.', en:'I put on my jacket.', ru:'Я надеваю куртку.' }, { de:'Sie zieht eine warme Jacke an.', en:'She puts on a warm jacket.', ru:'Она надевает тёплую куртку.' }] },
  { n:156, cat:'weather', de:'einen Schal anziehen', en:'put on scarf', ru:'надевать шарф',
    s:[{ de:'Ich ziehe meinen Schal an.', en:'I put on my scarf.', ru:'Я надеваю шарф.' }, { de:'Im Winter zieht sie einen warmen Schal an.', en:'In winter she puts on a warm scarf.', ru:'Зимой она надевает тёплый шарф.' }] },
  { n:157, cat:'beauty', de:'in den Spiegel schauen', en:'look in mirror', ru:'смотреть в зеркало',
    s:[{ de:'Ich schaue in den Spiegel.', en:'I look in the mirror.', ru:'Я смотрю в зеркало.' }, { de:'Sie schaut am Morgen in den Spiegel.', en:'In the morning she looks in the mirror.', ru:'Утром она смотрит в зеркало.' }] },
  { n:158, cat:'beauty', de:'Lippenstift auftragen', en:'apply lipstick', ru:'наносить помаду',
    s:[{ de:'Ich trage Lippenstift auf.', en:'I apply lipstick.', ru:'Я наношу помаду.' }, { de:'Sie trägt roten Lippenstift auf.', en:'She applies red lipstick.', ru:'Она наносит красную помаду.' }] },
  { n:159, cat:'beauty', de:'Mascara auftragen', en:'apply mascara', ru:'наносить тушь',
    s:[{ de:'Ich trage Mascara auf.', en:'I apply mascara.', ru:'Я наношу тушь.' }, { de:'Am Morgen trägt sie Mascara auf.', en:'In the morning she applies mascara.', ru:'Утром она наносит тушь.' }] },
  { n:160, cat:'beauty', de:'Make-up auftragen', en:'apply makeup', ru:'наносить макияж',
    s:[{ de:'Ich trage Make-up auf.', en:'I apply makeup.', ru:'Я наношу макияж.' }, { de:'Sie trägt vor dem Abendessen Make-up auf.', en:'She applies makeup before dinner.', ru:'Перед ужином она наносит макияж.' }] },
  { n:161, cat:'beauty', de:'Fingernägel lackieren', en:'paint fingernails', ru:'красить ногти',
    s:[{ de:'Ich lackiere meine Fingernägel.', en:'I paint my fingernails.', ru:'Я крашу ногти.' }, { de:'Sie lackiert ihre Fingernägel rosa.', en:'She paints her fingernails pink.', ru:'Она красит ногти в розовый цвет.' }] },
  { n:162, cat:'beauty', de:'Gesichtscreme benutzen', en:'use face cream', ru:'пользоваться кремом для лица',
    s:[{ de:'Ich benutze Gesichtscreme.', en:'I use face cream.', ru:'Я пользуюсь кремом для лица.' }, { de:'Am Abend benutzt sie Gesichtscreme.', en:'In the evening she uses face cream.', ru:'Вечером она пользуется кремом для лица.' }] },
  { n:163, cat:'beauty', de:'Parfüm benutzen', en:'use perfume', ru:'пользоваться духами',
    s:[{ de:'Ich benutze Parfüm.', en:'I use perfume.', ru:'Я пользуюсь духами.' }, { de:'Sie benutzt heute ihr neues Parfüm.', en:'Today she uses her new perfume.', ru:'Сегодня она пользуется новыми духами.' }] },
  { n:164, cat:'beauty', de:'Haare schneiden', en:'cut hair', ru:'стричь волосы',
    s:[{ de:'Ich möchte meine Haare schneiden.', en:'I want to cut my hair.', ru:'Я хочу подстричься.' }, { de:'Die Friseurin schneidet ihre Haare.', en:'The hairdresser cuts her hair.', ru:'Парикмахерша стрижёт ей волосы.' }] },
  { n:165, cat:'beauty', de:'sich fertig machen', en:'get ready', ru:'собираться',
    s:[{ de:'Ich mache mich fertig.', en:'I get ready.', ru:'Я собираюсь.' }, { de:'Sie macht sich für den Abend fertig.', en:'She gets ready for the evening.', ru:'Она собирается на вечер.' }] },
  { n:166, cat:'shopping', de:'einkaufen gehen', en:'go shopping', ru:'идти за покупками',
    s:[{ de:'Ich gehe heute einkaufen.', en:'I am going shopping today.', ru:'Сегодня я иду за покупками.' }, { de:'Am Samstag geht sie einkaufen.', en:'On Saturday she goes shopping.', ru:'В субботу она идёт за покупками.' }] },
  { n:167, cat:'shopping', de:'ein Geschäft betreten', en:'enter store', ru:'заходить в магазин',
    s:[{ de:'Ich betrete das Geschäft.', en:'I enter the store.', ru:'Я вхожу в магазин.' }, { de:'Sie betritt ein kleines Geschäft.', en:'She enters a small store.', ru:'Она входит в маленький магазин.' }] },
  { n:168, cat:'shopping', de:'nach etwas suchen', en:'look for something', ru:'искать что-то',
    s:[{ de:'Ich suche nach einer Jacke.', en:'I am looking for a jacket.', ru:'Я ищу куртку.' }, { de:'Sie sucht nach neuen Schuhen.', en:'She is looking for new shoes.', ru:'Она ищет новую обувь.' }] },
  { n:169, cat:'shopping', de:'Kleidung ansehen', en:'look at clothing', ru:'рассматривать одежду',
    s:[{ de:'Ich sehe mir die Kleidung an.', en:'I look at the clothing.', ru:'Я смотрю на одежду.' }, { de:'Sie sieht sich die Kleidung im Geschäft an.', en:'She looks at the clothing in the store.', ru:'Она рассматривает одежду в магазине.' }] },
  { n:170, cat:'shopping', de:'eine Jacke auswählen', en:'choose jacket', ru:'выбирать куртку',
    s:[{ de:'Ich wähle eine schwarze Jacke aus.', en:'I choose a black jacket.', ru:'Я выбираю чёрную куртку.' }, { de:'Sie wählt eine warme Jacke aus.', en:'She chooses a warm jacket.', ru:'Она выбирает тёплую куртку.' }] },
  { n:171, cat:'shopping', de:'Kleidung anprobieren', en:'try on clothing', ru:'примерять одежду',
    s:[{ de:'Ich probiere die Kleidung an.', en:'I try on the clothing.', ru:'Я примеряю одежду.' }, { de:'Sie probiert ein Kleid an.', en:'She tries on a dress.', ru:'Она примеряет платье.' }] },
  { n:172, cat:'shopping', de:'Schuhe anprobieren', en:'try on shoes', ru:'примерять обувь',
    s:[{ de:'Ich probiere die Schuhe an.', en:'I try on the shoes.', ru:'Я примеряю туфли.' }, { de:'Sie probiert ein Paar Schuhe an.', en:'She tries on a pair of shoes.', ru:'Она примеряет пару обуви.' }] },
  { n:173, cat:'shopping', de:'das Verkaufspersonal fragen', en:'ask salesperson', ru:'спрашивать продавца',
    s:[{ de:'Ich frage die Verkäuferin.', en:'I ask the saleswoman.', ru:'Я спрашиваю продавщицу.' }, { de:'Sie fragt den Verkäufer nach dem Preis.', en:'She asks the salesman about the price.', ru:'Она спрашивает продавца о цене.' }] },
  { n:174, cat:'shopping', de:'die Größe prüfen', en:'check size', ru:'проверять размер',
    s:[{ de:'Ich prüfe die Größe.', en:'I check the size.', ru:'Я проверяю размер.' }, { de:'Sie prüft die Größe der Jacke.', en:'She checks the size of the jacket.', ru:'Она проверяет размер куртки.' }] },
  { n:175, cat:'shopping', de:'etwas kaufen', en:'buy something', ru:'покупать что-то',
    s:[{ de:'Ich kaufe etwas.', en:'I buy something.', ru:'Я что-то покупаю.' }, { de:'Sie kauft eine neue Jacke.', en:'She buys a new jacket.', ru:'Она покупает новую куртку.' }] },
  { n:176, cat:'shopping', de:'mit Karte bezahlen', en:'pay by card', ru:'платить картой',
    s:[{ de:'Ich bezahle mit Karte.', en:'I pay by card.', ru:'Я плачу картой.' }, { de:'Sie bezahlt die Schuhe mit Karte.', en:'She pays for the shoes by card.', ru:'Она платит за туфли картой.' }] },
  { n:177, cat:'shopping', de:'eine Einkaufstasche tragen', en:'carry shopping bag', ru:'нести пакет с покупками',
    s:[{ de:'Ich trage eine Einkaufstasche.', en:'I carry a shopping bag.', ru:'Я несу сумку с покупками.' }, { de:'Sie trägt ihre Einkaufstasche nach Hause.', en:'She carries her shopping bag home.', ru:'Она несёт сумку с покупками домой.' }] },
  { n:178, cat:'shopping', de:'einen Artikel nehmen', en:'take item', ru:'брать вещь',
    s:[{ de:'Ich nehme diesen Artikel.', en:'I take this item.', ru:'Я беру этот товар.' }, { de:'Sie nimmt den Artikel und geht zur Kasse.', en:'She takes the item and goes to the checkout.', ru:'Она берёт товар и идёт к кассе.' }] },
  { n:179, cat:'food', imgs:[179,530], de:'essen', en:'eat', ru:'есть',
    s:[{ de:'Ich möchte etwas essen.', en:'I want to eat something.', ru:'Я хочу что-нибудь поесть.' }, { de:'Sie isst am Tisch.', en:'She is eating at the table.', ru:'Она ест за столом.' }] },
  { n:180, cat:'food', de:'trinken', en:'drink', ru:'пить',
    s:[{ de:'Ich möchte etwas trinken.', en:'I want to drink something.', ru:'Я хочу что-нибудь выпить.' }, { de:'Sie trinkt ein Glas Wasser.', en:'She drinks a glass of water.', ru:'Она пьёт стакан воды.' }] },
  { n:181, cat:'food', de:'Gemüse essen', en:'eat vegetables', ru:'есть овощи',
    s:[{ de:'Ich esse gern Gemüse.', en:'I like eating vegetables.', ru:'Я люблю есть овощи.' }, { de:'Sie isst jeden Tag Gemüse.', en:'She eats vegetables every day.', ru:'Она ест овощи каждый день.' }] },
  { n:182, cat:'food', de:'Brot essen', en:'eat bread', ru:'есть хлеб',
    s:[{ de:'Ich esse Brot zum Frühstück.', en:'I eat bread for breakfast.', ru:'Я ем хлеб на завтрак.' }, { de:'Sie isst ein Stück Brot.', en:'She eats a piece of bread.', ru:'Она ест кусок хлеба.' }] },
  { n:183, cat:'food', de:'Kaffee trinken', en:'drink coffee', ru:'пить кофе',
    s:[{ de:'Ich trinke morgens Kaffee.', en:'I drink coffee in the morning.', ru:'Я пью кофе по утрам.' }, { de:'Sie trinkt eine Tasse Kaffee.', en:'She drinks a cup of coffee.', ru:'Она пьёт чашку кофе.' }] },
  { n:184, cat:'food', de:'Tee trinken', en:'drink tea', ru:'пить чай',
    s:[{ de:'Ich trinke gern Tee.', en:'I like drinking tea.', ru:'Я люблю пить чай.' }, { de:'Am Abend trinkt sie Tee.', en:'In the evening she drinks tea.', ru:'Вечером она пьёт чай.' }] },
  { n:185, cat:'food', de:'einen Apfel essen', en:'eat apple', ru:'есть яблоко',
    s:[{ de:'Ich esse einen Apfel.', en:'I eat an apple.', ru:'Я ем яблоко.' }, { de:'Sie isst am Nachmittag einen Apfel.', en:'In the afternoon she eats an apple.', ru:'Днём она ест яблоко.' }] },
  { n:186, cat:'food', de:'Eier essen', en:'eat eggs', ru:'есть яйца',
    s:[{ de:'Ich esse zwei Eier.', en:'I eat two eggs.', ru:'Я ем два яйца.' }, { de:'Sie isst Eier zum Frühstück.', en:'She eats eggs for breakfast.', ru:'Она ест яйца на завтрак.' }] },
  { n:187, cat:'food', de:'frühstücken', en:'eat breakfast', ru:'завтракать',
    s:[{ de:'Ich frühstücke jeden Morgen.', en:'I have breakfast every morning.', ru:'Я завтракаю каждое утро.' }, { de:'Sie frühstückt um acht Uhr.', en:'She has breakfast at eight o\'clock.', ru:'Она завтракает в восемь часов.' }] },
  { n:188, cat:'food', de:'Salat essen', en:'eat salad', ru:'есть салат',
    s:[{ de:'Ich esse gern Salat.', en:'I like eating salad.', ru:'Я люблю есть салат.' }, { de:'Sie isst einen Salat zum Abendessen.', en:'She eats a salad for dinner.', ru:'Она ест салат на ужин.' }] },
  { n:189, cat:'food', de:'kochen', en:'cook', ru:'готовить',
    s:[{ de:'Ich koche heute Abend.', en:'I am cooking this evening.', ru:'Сегодня вечером я готовлю.' }, { de:'Sie kocht gern zu Hause.', en:'She likes cooking at home.', ru:'Она любит готовить дома.' }] },
  { n:190, cat:'food', de:'Frühstück zubereiten', en:'make breakfast', ru:'готовить завтрак',
    s:[{ de:'Ich bereite das Frühstück zu.', en:'I prepare breakfast.', ru:'Я готовлю завтрак.' }, { de:'Am Morgen bereitet sie das Frühstück zu.', en:'In the morning she prepares breakfast.', ru:'Утром она готовит завтрак.' }] },
  { n:191, cat:'food', de:'Suppe kochen', en:'make soup', ru:'готовить суп',
    s:[{ de:'Ich koche eine Suppe.', en:'I cook a soup.', ru:'Я варю суп.' }, { de:'Am Abend kocht sie eine warme Suppe.', en:'In the evening she cooks a warm soup.', ru:'Вечером она варит тёплый суп.' }] },
  { n:192, cat:'food', de:'eine Tomate schneiden', en:'cut tomato', ru:'резать помидор',
    s:[{ de:'Ich schneide eine Tomate.', en:'I cut a tomato.', ru:'Я режу помидор.' }, { de:'Sie schneidet die Tomate für den Salat.', en:'She cuts the tomato for the salad.', ru:'Она режет помидор для салата.' }] },
  { n:193, cat:'food', de:'Gemüse schneiden', en:'cut vegetables', ru:'резать овощи',
    s:[{ de:'Ich schneide das Gemüse.', en:'I cut the vegetables.', ru:'Я режу овощи.' }, { de:'Sie schneidet Gemüse für die Suppe.', en:'She cuts vegetables for the soup.', ru:'Она режет овощи для супа.' }] },
  { n:194, cat:'food', de:'Kartoffeln schneiden', en:'cut potatoes', ru:'резать картофель',
    s:[{ de:'Ich schneide die Kartoffeln.', en:'I cut the potatoes.', ru:'Я режу картошку.' }, { de:'Sie schneidet Kartoffeln für das Abendessen.', en:'She cuts potatoes for dinner.', ru:'Она режет картошку на ужин.' }] },
  { n:195, cat:'food', de:'Karotten schneiden', en:'cut carrots', ru:'резать морковь',
    s:[{ de:'Ich schneide die Karotten.', en:'I cut the carrots.', ru:'Я режу морковь.' }, { de:'Sie schneidet Karotten für die Suppe.', en:'She cuts carrots for the soup.', ru:'Она режет морковь для супа.' }] },
  { n:196, cat:'food', de:'Zwiebeln schneiden', en:'cut onions', ru:'резать лук',
    s:[{ de:'Ich schneide die Zwiebeln.', en:'I cut the onions.', ru:'Я режу лук.' }, { de:'Sie schneidet zwei Zwiebeln.', en:'She cuts two onions.', ru:'Она режет две луковицы.' }] },
  { n:197, cat:'food', de:'Gemüse in einen Topf geben', en:'put vegetables into pot', ru:'класть овощи в кастрюлю',
    s:[{ de:'Ich gebe das Gemüse in den Topf.', en:'I put the vegetables into the pot.', ru:'Я кладу овощи в кастрюлю.' }, { de:'Sie gibt die Karotten und Kartoffeln in den Topf.', en:'She puts the carrots and potatoes into the pot.', ru:'Она кладёт морковь и картошку в кастрюлю.' }] },
  { n:198, cat:'food', de:'Essen probieren', en:'taste food', ru:'пробовать еду',
    s:[{ de:'Ich probiere das Essen.', en:'I taste the food.', ru:'Я пробую еду.' }, { de:'Sie probiert die Suppe.', en:'She tastes the soup.', ru:'Она пробует суп.' }] },
  { n:199, cat:'family', de:'Essen servieren', en:'serve food', ru:'подавать еду',
    s:[{ de:'Ich serviere das Essen.', en:'I serve the food.', ru:'Я подаю еду.' }, { de:'Sie serviert das Abendessen.', en:'She serves dinner.', ru:'Она подаёт ужин.' }] },
  { n:200, cat:'home', de:'aufwachen', en:'wake up', ru:'просыпаться',
    s:[{ de:'Ich wache um sieben Uhr auf.', en:'I wake up at seven o\'clock.', ru:'Я просыпаюсь в семь часов.' }, { de:'Sie wacht jeden Morgen früh auf.', en:'She wakes up early every morning.', ru:'Она просыпается каждое утро рано.' }] },
  { n:201, cat:'home', de:'das Bett machen', en:'make bed', ru:'заправлять кровать',
    s:[{ de:'Ich mache mein Bett.', en:'I make my bed.', ru:'Я застилаю кровать.' }, { de:'Am Morgen macht sie ihr Bett.', en:'In the morning she makes her bed.', ru:'Утром она застилает кровать.' }] },
  { n:202, cat:'home', de:'das Fenster öffnen', en:'open window', ru:'открывать окно',
    s:[{ de:'Ich öffne das Fenster.', en:'I open the window.', ru:'Я открываю окно.' }, { de:'Am Morgen öffnet sie das Fenster.', en:'In the morning she opens the window.', ru:'Утром она открывает окно.' }] },
  { n:203, cat:'home', de:'das Licht einschalten', en:'turn on light', ru:'включать свет',
    s:[{ de:'Ich schalte das Licht ein.', en:'I turn on the light.', ru:'Я включаю свет.' }, { de:'Am Abend schaltet sie das Licht ein.', en:'In the evening she turns on the light.', ru:'Вечером она включает свет.' }] },
  { n:204, cat:'home', de:'das Licht ausschalten', en:'turn off light', ru:'выключать свет',
    s:[{ de:'Ich schalte das Licht aus.', en:'I turn off the light.', ru:'Я выключаю свет.' }, { de:'Vor dem Schlafen schaltet sie das Licht aus.', en:'Before sleeping she turns off the light.', ru:'Перед сном она выключает свет.' }] },
  { n:205, cat:'home', de:'das Zimmer putzen', en:'clean room', ru:'убирать комнату',
    s:[{ de:'Ich putze mein Zimmer.', en:'I clean my room.', ru:'Я убираю свою комнату.' }, { de:'Am Samstag putzt sie ihr Zimmer.', en:'On Saturday she cleans her room.', ru:'В субботу она убирает свою комнату.' }] },
  { n:206, cat:'home', de:'aufräumen', en:'tidy up', ru:'прибираться',
    s:[{ de:'Ich räume heute auf.', en:'I tidy up today.', ru:'Сегодня я убираюсь.' }, { de:'Am Morgen räumt sie die Wohnung auf.', en:'In the morning she tidies the apartment.', ru:'Утром она убирает квартиру.' }] },
  { n:207, cat:'home', de:'Wäsche waschen', en:'do laundry', ru:'стирать бельё',
    s:[{ de:'Ich wasche heute die Wäsche.', en:'I do the laundry today.', ru:'Сегодня я стираю бельё.' }, { de:'Am Samstag wäscht sie die Wäsche.', en:'On Saturday she does the laundry.', ru:'В субботу она стирает бельё.' }] },
  { n:208, cat:'home', de:'die Küche putzen', en:'clean kitchen', ru:'убирать кухню',
    s:[{ de:'Ich putze die Küche.', en:'I clean the kitchen.', ru:'Я убираю кухню.' }, { de:'Nach dem Abendessen putzt sie die Küche.', en:'After dinner she cleans the kitchen.', ru:'После ужина она убирает кухню.' }] },
  { n:209, cat:'home', de:'auf dem Sofa sitzen', en:'sit on sofa', ru:'сидеть на диване',
    s:[{ de:'Ich sitze auf dem Sofa.', en:'I sit on the sofa.', ru:'Я сижу на диване.' }, { de:'Am Abend sitzt sie auf dem Sofa.', en:'In the evening she sits on the sofa.', ru:'Вечером она сидит на диване.' }] },
  { n:210, cat:'home', de:'fernsehen', en:'watch TV', ru:'смотреть телевизор',
    s:[{ de:'Ich sehe am Abend fern.', en:'I watch TV in the evening.', ru:'Вечером я смотрю телевизор.' }, { de:'Sie sieht nach dem Abendessen fern.', en:'She watches TV after dinner.', ru:'После ужина она смотрит телевизор.' }] },
  { n:211, cat:'home', de:'ins Bett gehen', en:'go to bed', ru:'ложиться спать',
    s:[{ de:'Ich gehe um zehn Uhr ins Bett.', en:'I go to bed at ten o\'clock.', ru:'Я ложусь спать в десять часов.' }, { de:'Sie geht heute früh ins Bett.', en:'She is going to bed early today.', ru:'Сегодня она ложится спать рано.' }] },
  { n:212, cat:'home', de:'schlafen', en:'sleep', ru:'спать',
    s:[{ de:'Ich schlafe acht Stunden.', en:'I sleep eight hours.', ru:'Я сплю восемь часов.' }, { de:'Sie schläft heute lange.', en:'She is sleeping late today.', ru:'Сегодня она долго спит.' }] },
  { n:213, cat:'home', de:'zu Hause bleiben', en:'stay home', ru:'оставаться дома',
    s:[{ de:'Ich bleibe heute zu Hause.', en:'I am staying home today.', ru:'Сегодня я остаюсь дома.' }, { de:'Bei schlechtem Wetter bleibt sie zu Hause.', en:'In bad weather she stays home.', ru:'В плохую погоду она остаётся дома.' }] },
  { n:214, cat:'home', de:'nach dem Handy suchen', en:'look for phone', ru:'искать телефон',
    s:[{ de:'Ich suche nach meinem Handy.', en:'I am looking for my phone.', ru:'Я ищу свой телефон.' }, { de:'Sie sucht im Zimmer nach ihrem Handy.', en:'She is looking for her phone in the room.', ru:'Она ищет свой телефон в комнате.' }] },
  { n:215, cat:'home', de:'auf dem Tisch nachsehen', en:'look on table', ru:'искать на столе',
    s:[{ de:'Ich sehe auf dem Tisch nach.', en:'I look on the table.', ru:'Я смотрю на стол.' }, { de:'Sie sieht zuerst auf dem Tisch nach.', en:'She first looks on the table.', ru:'Сначала она смотрит на стол.' }] },
  { n:216, cat:'home', de:'auf dem Sofa nachsehen', en:'look on sofa', ru:'искать на диване',
    s:[{ de:'Ich sehe auf dem Sofa nach.', en:'I look on the sofa.', ru:'Я смотрю на диван.' }, { de:'Sie sieht auch auf dem Sofa nach.', en:'She also looks on the sofa.', ru:'Она также смотрит на диван.' }] },
  { n:217, cat:'home', de:'auf dem Bett nachsehen', en:'look on bed', ru:'искать на кровати',
    s:[{ de:'Ich sehe auf dem Bett nach.', en:'I look on the bed.', ru:'Я смотрю на кровать.' }, { de:'Dann sieht sie auf dem Bett nach.', en:'Then she looks on the bed.', ru:'Потом она смотрит на кровать.' }] },
  { n:218, cat:'home', de:'das Handy finden', en:'find phone', ru:'найти телефон',
    s:[{ de:'Ich finde mein Handy.', en:'I find my phone.', ru:'Я нахожу свой телефон.' }, { de:'Sie findet ihr Handy auf dem Bett.', en:'She finds her phone on the bed.', ru:'Она находит свой телефон на кровати.' }] },
  { n:219, cat:'family', de:'sprechen', en:'talk', ru:'разговаривать',
    s:[{ de:'Ich spreche mit meiner Mutter.', en:'I talk to my mother.', ru:'Я разговариваю с мамой.' }, { de:'Wir sprechen jeden Tag.', en:'We talk every day.', ru:'Мы разговариваем каждый день.' }] },
  { n:220, cat:'family', de:'miteinander sprechen', en:'talk together', ru:'разговаривать вместе',
    s:[{ de:'Wir sprechen miteinander.', en:'We talk to each other.', ru:'Мы разговариваем друг с другом.' }, { de:'Am Abend sprechen sie miteinander.', en:'In the evening they talk to each other.', ru:'Вечером они разговаривают друг с другом.' }] },
  { n:221, cat:'family', de:'jemanden anrufen', en:'call someone on phone', ru:'звонить кому-то',
    s:[{ de:'Ich rufe meine Mutter an.', en:'I call my mother.', ru:'Я звоню маме.' }, { de:'Sie ruft ihren Sohn an.', en:'She calls her son.', ru:'Она звонит сыну.' }] },
  { n:222, cat:'family', de:'die Familie besuchen', en:'visit family', ru:'навещать семью',
    s:[{ de:'Ich besuche meine Familie.', en:'I visit my family.', ru:'Я навещаю семью.' }, { de:'Am Wochenende besucht sie ihre Familie.', en:'On the weekend she visits her family.', ru:'В выходные она навещает семью.' }] },
  { n:223, cat:'family', de:'zusammen essen', en:'eat together', ru:'есть вместе',
    s:[{ de:'Wir essen zusammen.', en:'We eat together.', ru:'Мы едим вместе.' }, { de:'Am Abend essen sie zusammen.', en:'In the evening they eat together.', ru:'Вечером они едят вместе.' }] },
  { n:224, cat:'family', de:'zusammen Kaffee trinken', en:'drink coffee together', ru:'пить кофе вместе',
    s:[{ de:'Wir trinken zusammen Kaffee.', en:'We drink coffee together.', ru:'Мы пьём кофе вместе.' }, { de:'Am Nachmittag trinken sie zusammen Kaffee.', en:'In the afternoon they drink coffee together.', ru:'Днём они пьют кофе вместе.' }] },
  { n:225, cat:'family', de:'zusammen einen Film ansehen', en:'watch movie together', ru:'смотреть фильм вместе',
    s:[{ de:'Wir sehen zusammen einen Film an.', en:'We watch a movie together.', ru:'Мы смотрим фильм вместе.' }, { de:'Am Abend sehen sie zusammen einen Film an.', en:'In the evening they watch a movie together.', ru:'Вечером они смотрят фильм вместе.' }] },
  { n:226, cat:'family', de:'von der Schule nach Hause kommen', en:'come home from school', ru:'приходить домой из школы',
    s:[{ de:'Der Junge kommt von der Schule nach Hause.', en:'The boy comes home from school.', ru:'Мальчик приходит домой из школы.' }, { de:'Er kommt um drei Uhr von der Schule nach Hause.', en:'He comes home from school at three o\'clock.', ru:'Он приходит домой из школы в три часа.' }] },
  { n:227, cat:'family', de:'jemandem vom eigenen Tag erzählen', en:'tell someone about your day', ru:'рассказывать кому-то о своём дне',
    s:[{ de:'Ich erzähle meiner Mutter von meinem Tag.', en:'I tell my mother about my day.', ru:'Я рассказываю маме о своём дне.' }, { de:'Der Junge erzählt ihr von seinem Tag.', en:'The boy tells her about his day.', ru:'Мальчик рассказывает ей о своём дне.' }] },
  { n:228, cat:'family', de:'jemandem zuhören', en:'listen to someone', ru:'слушать кого-то',
    s:[{ de:'Ich höre meiner Mutter zu.', en:'I listen to my mother.', ru:'Я слушаю маму.' }, { de:'Sie hört ihrem Sohn zu.', en:'She listens to her son.', ru:'Она слушает сына.' }] },
  { n:229, cat:'family', de:'zusammen Hausaufgaben machen', en:'do homework together', ru:'делать домашнее задание вместе',
    s:[{ de:'Wir machen zusammen Hausaufgaben.', en:'We do homework together.', ru:'Мы делаем домашнее задание вместе.' }, { de:'Mutter und Sohn machen zusammen die Hausaufgaben.', en:'Mother and son do the homework together.', ru:'Мама и сын делают домашнее задание вместе.' }] },
  { n:230, cat:'weather', de:'es regnet', en:'raining', ru:'идёт дождь',
    s:[{ de:'Heute regnet es.', en:'It is raining today.', ru:'Сегодня идёт дождь.' }, { de:'Am Nachmittag regnet es stark.', en:'In the afternoon it is raining hard.', ru:'Днём идёт сильный дождь.' }] },
  { n:231, cat:'weather', de:'es schneit', en:'snowing', ru:'идёт снег',
    s:[{ de:'Heute schneit es.', en:'It is snowing today.', ru:'Сегодня идёт снег.' }, { de:'Draußen schneit es stark.', en:'Outside it is snowing hard.', ru:'На улице идёт сильный снег.' }] },
  { n:232, cat:'weather', de:'die Sonne scheint', en:'sun shining', ru:'светит солнце',
    s:[{ de:'Die Sonne scheint.', en:'The sun is shining.', ru:'Светит солнце.' }, { de:'Heute Morgen scheint die Sonne.', en:'This morning the sun is shining.', ru:'Сегодня утром светит солнце.' }] },
  { n:233, cat:'weather', de:'der Wind weht', en:'wind blowing', ru:'дует ветер',
    s:[{ de:'Der Wind weht stark.', en:'The wind is blowing hard.', ru:'Ветер сильно дует.' }, { de:'Heute weht ein kalter Wind.', en:'Today a cold wind is blowing.', ru:'Сегодня дует холодный ветер.' }] },
  { n:234, cat:'weather', de:'aus dem Fenster schauen', en:'look out window', ru:'смотреть в окно',
    s:[{ de:'Ich schaue aus dem Fenster.', en:'I look out the window.', ru:'Я смотрю в окно.' }, { de:'Sie sitzt am Fenster und schaut nach draußen.', en:'She sits by the window and looks outside.', ru:'Она сидит у окна и смотрит на улицу.' }] },
  { n:235, cat:'weather', de:'einen Regenschirm mitnehmen', en:'take umbrella', ru:'брать зонт',
    s:[{ de:'Ich nehme einen Regenschirm mit.', en:'I take an umbrella with me.', ru:'Я беру с собой зонт.' }, { de:'Sie nimmt heute ihren Regenschirm mit.', en:'Today she takes her umbrella with her.', ru:'Сегодня она берёт с собой зонт.' }] },
  { n:236, cat:'weather', de:'bei kaltem Wetter draußen spazieren gehen', en:'walk outside in cold weather', ru:'гулять на улице в холодную погоду',
    s:[{ de:'Ich gehe bei kaltem Wetter draußen spazieren.', en:'I walk outside in cold weather.', ru:'Я гуляю на улице в холодную погоду.' }, { de:'Sie trägt eine warme Jacke, wenn sie bei kaltem Wetter draußen spazieren geht.', en:'She wears a warm jacket when she walks outside in cold weather.', ru:'Она надевает тёплую куртку, когда гуляет на улице в холодную погоду.' }] },
  { n:237, cat:'travel', de:'mit dem Bus fahren', en:'ride bus', ru:'ехать на автобусе',
    s:[{ de:'Ich fahre mit dem Bus.', en:'I ride the bus.', ru:'Я езжу на автобусе.' }, { de:'Sie fährt jeden Morgen mit dem Bus.', en:'She rides the bus every morning.', ru:'Она каждое утро ездит на автобусе.' }] },
  { n:238, cat:'travel', de:'mit dem Zug fahren', en:'ride train', ru:'ехать на поезде',
    s:[{ de:'Ich fahre mit dem Zug.', en:'I ride the train.', ru:'Я езжу на поезде.' }, { de:'Wir fahren morgen mit dem Zug.', en:'We are riding the train tomorrow.', ru:'Завтра мы едем на поезде.' }] },
  { n:239, cat:'travel', de:'auf den Bus warten', en:'wait for bus', ru:'ждать автобус',
    s:[{ de:'Ich warte auf den Bus.', en:'I wait for the bus.', ru:'Я жду автобус.' }, { de:'Sie wartet an der Bushaltestelle auf den Bus.', en:'She waits for the bus at the bus stop.', ru:'Она ждёт автобус на остановке.' }] },
  { n:240, cat:'travel', de:'zur Bushaltestelle gehen', en:'go to bus stop', ru:'идти на автобусную остановку',
    s:[{ de:'Ich gehe zur Bushaltestelle.', en:'I go to the bus stop.', ru:'Я иду на автобусную остановку.' }, { de:'Sie geht am Morgen zur Bushaltestelle.', en:'In the morning she goes to the bus stop.', ru:'Утром она идёт на автобусную остановку.' }] },
  { n:241, cat:'travel', de:'zum Bahnhof gehen', en:'go to train station', ru:'идти на вокзал',
    s:[{ de:'Ich gehe zum Bahnhof.', en:'I go to the train station.', ru:'Я иду на вокзал.' }, { de:'Sie geht mit ihrem Koffer zum Bahnhof.', en:'She goes to the train station with her suitcase.', ru:'Она идёт на вокзал со своим чемоданом.' }] },
  { n:242, cat:'travel', de:'eine Fahrkarte bei sich tragen', en:'carry ticket', ru:'нести билет',
    s:[{ de:'Ich habe meine Fahrkarte bei mir.', en:'I have my ticket with me.', ru:'У меня с собой билет.' }, { de:'Sie trägt ihre Fahrkarte bei sich.', en:'She is carrying her ticket with her.', ru:'Она носит с собой билет.' }] },
  { n:243, cat:'travel', de:'in den Bus einsteigen', en:'get on bus', ru:'садиться в автобус',
    s:[{ de:'Ich steige in den Bus ein.', en:'I get on the bus.', ru:'Я сажусь в автобус.' }, { de:'Sie steigt an der Bushaltestelle in den Bus ein.', en:'She gets on the bus at the bus stop.', ru:'Она садится в автобус на остановке.' }] },
  { n:244, cat:'travel', de:'aus dem Bus aussteigen', en:'get off bus', ru:'выходить из автобуса',
    s:[{ de:'Ich steige aus dem Bus aus.', en:'I get off the bus.', ru:'Я выхожу из автобуса.' }, { de:'Sie steigt im Stadtzentrum aus dem Bus aus.', en:'She gets off the bus in the city center.', ru:'Она выходит из автобуса в центре города.' }] },
  { n:245, cat:'travel', de:'im Bus sitzen', en:'sit on bus', ru:'сидеть в автобусе',
    s:[{ de:'Ich sitze im Bus.', en:'I sit on the bus.', ru:'Я сижу в автобусе.' }, { de:'Sie sitzt im Bus am Fenster.', en:'She sits on the bus by the window.', ru:'Она сидит в автобусе у окна.' }] },
  { n:246, cat:'travel', de:'einen Sitzplatz finden', en:'find seat', ru:'найти место',
    s:[{ de:'Ich finde einen Sitzplatz.', en:'I find a seat.', ru:'Я нахожу место.' }, { de:'Sie steigt ein und findet einen Sitzplatz.', en:'She gets on and finds a seat.', ru:'Она садится и находит место.' }] },
  { n:247, cat:'travel', de:'am Zugfenster sitzen', en:'sit by train window', ru:'сидеть у окна в поезде',
    s:[{ de:'Ich sitze am Zugfenster.', en:'I sit by the train window.', ru:'Я сижу у окна в поезде.' }, { de:'Der Junge sitzt gern am Zugfenster.', en:'The boy likes sitting by the train window.', ru:'Мальчик любит сидеть у окна в поезде.' }] },
  { n:248, cat:'travel', de:'aus dem Zugfenster schauen', en:'look out train window', ru:'смотреть в окно поезда',
    s:[{ de:'Ich schaue aus dem Zugfenster.', en:'I look out the train window.', ru:'Я смотрю в окно поезда.' }, { de:'Sie schaut aus dem Zugfenster und sieht die Landschaft.', en:'She looks out the train window and sees the landscape.', ru:'Она смотрит в окно поезда и видит пейзаж.' }] },
  { n:249, cat:'travel', de:'einen Koffer tragen', en:'carry suitcase', ru:'нести чемодан',
    s:[{ de:'Ich trage meinen Koffer.', en:'I carry my suitcase.', ru:'Я несу свой чемодан.' }, { de:'Sie trägt einen kleinen Koffer.', en:'She carries a small suitcase.', ru:'Она несёт маленький чемодан.' }] },
  { n:250, cat:'travel', de:'ins Stadtzentrum fahren', en:'travel to city center', ru:'ехать в центр города',
    s:[{ de:'Ich fahre ins Stadtzentrum.', en:'I travel to the city center.', ru:'Я еду в центр города.' }, { de:'Sie fährt mit dem Bus ins Stadtzentrum.', en:'She travels to the city center by bus.', ru:'Она едет в центр города на автобусе.' }] },
  { n:251, cat:'travel', de:'am Bahnhof ankommen', en:'arrive at train station', ru:'прибывать на вокзал',
    s:[{ de:'Ich komme am Bahnhof an.', en:'I arrive at the train station.', ru:'Я приезжаю на вокзал.' }, { de:'Sie kommt um neun Uhr am Bahnhof an.', en:'She arrives at the train station at nine o\'clock.', ru:'Она приезжает на вокзал в девять часов.' }] },
  { n:252, cat:'travel', de:'mit dem Zug abfahren', en:'depart by train', ru:'уезжать на поезде',
    s:[{ de:'Ich fahre mit dem Zug ab.', en:'I depart by train.', ru:'Я отправляюсь на поезде.' }, { de:'Sie fährt am Morgen mit dem Zug ab.', en:'In the morning she departs by train.', ru:'Утром она отправляется на поезде.' }] },
  { n:253, cat:'shopping', de:'zu teuer', en:'too expensive', ru:'слишком дорого',
    s:[{ de:'Diese Jacke ist zu teuer.', en:'This jacket is too expensive.', ru:'Эта куртка слишком дорогая.' }, { de:'Die Schuhe sind schön, aber zu teuer.', en:'The shoes are beautiful, but too expensive.', ru:'Туфли красивые, но слишком дорогие.' }] },
  { n:254, cat:'shopping', de:'billig', en:'cheap', ru:'дёшево',
    s:[{ de:'Diese Tasche ist billig.', en:'This bag is cheap.', ru:'Эта сумка дешёвая.' }, { de:'Der Pullover ist sehr billig.', en:'The sweater is very cheap.', ru:'Свитер очень дешёвый.' }] },
  { n:255, cat:'shopping', de:'zu groß', en:'too big', ru:'слишком большой',
    s:[{ de:'Die Jacke ist zu groß.', en:'The jacket is too big.', ru:'Куртка слишком большая.' }, { de:'Diese Hose ist mir zu groß.', en:'These pants are too big for me.', ru:'Эти брюки мне слишком большие.' }] },
  { n:256, cat:'shopping', de:'zu klein', en:'too small', ru:'слишком маленький',
    s:[{ de:'Das Kleid ist zu klein.', en:'The dress is too small.', ru:'Платье слишком маленькое.' }, { de:'Diese Schuhe sind mir zu klein.', en:'These shoes are too small for me.', ru:'Эти туфли мне слишком маленькие.' }] },
  { n:257, cat:'shopping', de:'passt gut', en:'fits well', ru:'хорошо сидит',
    s:[{ de:'Das Kleid passt gut.', en:'The dress fits well.', ru:'Платье хорошо сидит.' }, { de:'Die kleinere Jacke passt ihr gut.', en:'The smaller jacket fits her well.', ru:'Меньшая куртка ей хорошо сидит.' }] },
  { n:258, cat:'shopping', de:'bequeme Schuhe', en:'comfortable shoes', ru:'удобная обувь',
    s:[{ de:'Ich brauche bequeme Schuhe.', en:'I need comfortable shoes.', ru:'Мне нужна удобная обувь.' }, { de:'Diese Schuhe sind sehr bequem.', en:'These shoes are very comfortable.', ru:'Эти туфли очень удобные.' }] },
  { n:259, cat:'shopping', de:'das Geschäft ist geöffnet', en:'store is open', ru:'магазин открыт',
    s:[{ de:'Das Geschäft ist heute geöffnet.', en:'The store is open today.', ru:'Магазин сегодня открыт.' }, { de:'Am Samstag ist das Geschäft geöffnet.', en:'On Saturday the store is open.', ru:'В субботу магазин открыт.' }] },
  { n:260, cat:'beauty', de:'sich für den Abend fertig machen', en:'getting ready for evening', ru:'готовится к вечеру',
    s:[{ de:'Ich mache mich für den Abend fertig.', en:'I get ready for the evening.', ru:'Я собираюсь на вечер.' }, { de:'Sie macht sich vor dem Spiegel für den Abend fertig.', en:'She gets ready for the evening in front of the mirror.', ru:'Она собирается на вечер перед зеркалом.' }] },
  { n:261, cat:'beauty', de:'frisch gewaschene Haare', en:'freshly washed hair', ru:'свежевымытые волосы',
    s:[{ de:'Meine Haare sind frisch gewaschen.', en:'My hair is freshly washed.', ru:'Мои волосы свежевымытые.' }, { de:'Sie hat heute frisch gewaschene Haare.', en:'Today she has freshly washed hair.', ru:'Сегодня у неё свежевымытые волосы.' }] },
  { n:262, cat:'food', de:'das Essen ist fertig', en:'food is ready', ru:'еда готова',
    s:[{ de:'Das Essen ist fertig.', en:'The food is ready.', ru:'Еда готова.' }, { de:'Sie sagt: „Das Essen ist fertig.“', en:'She says: "The food is ready."', ru:'Она говорит: «Еда готова».' }] },
  { n:263, cat:'food', de:'vor dem Essen hungrig', en:'hungry before eating', ru:'голодная перед едой',
    s:[{ de:'Ich bin vor dem Essen hungrig.', en:'I am hungry before eating.', ru:'Перед едой я голодна.' }, { de:'Am Morgen ist sie vor dem Frühstück sehr hungrig.', en:'In the morning she is very hungry before breakfast.', ru:'Утром перед завтраком она очень голодна.' }] },
  { n:264, cat:'food', de:'nach dem Essen satt', en:'full after eating', ru:'сытая после еды',
    s:[{ de:'Ich bin nach dem Essen satt.', en:'I am full after eating.', ru:'После еды я сыта.' }, { de:'Nach dem Abendessen ist sie sehr satt.', en:'After dinner she is very full.', ru:'После ужина она очень сыта.' }] },
  { n:265, cat:'weather', de:'ein kalter Morgen', en:'cold morning', ru:'холодное утро',
    s:[{ de:'Heute ist ein kalter Morgen.', en:'Today is a cold morning.', ru:'Сегодня холодное утро.' }, { de:'An einem kalten Morgen trage ich eine warme Jacke.', en:'On a cold morning I wear a warm jacket.', ru:'В холодное утро я надеваю тёплую куртку.' }] },
  { n:266, cat:'weather', de:'eine warme Wohnung', en:'warm apartment', ru:'тёплая квартира',
    s:[{ de:'Meine Wohnung ist warm.', en:'My apartment is warm.', ru:'Моя квартира тёплая.' }, { de:'Im Winter ist eine warme Wohnung sehr schön.', en:'In winter a warm apartment is very nice.', ru:'Зимой тёплая квартира очень приятна.' }] },
  { n:267, cat:'weather', de:'ein regnerischer Nachmittag', en:'rainy afternoon', ru:'дождь после обеда',
    s:[{ de:'Heute ist ein regnerischer Nachmittag.', en:'Today is a rainy afternoon.', ru:'Сегодня дождливый день.' }, { de:'An einem regnerischen Nachmittag nehme ich einen Regenschirm mit.', en:'On a rainy afternoon I take an umbrella with me.', ru:'В дождливый день я беру с собой зонт.' }] },
  { n:268, cat:'weather', de:'ein sonniger Abend', en:'sunny evening', ru:'солнечный вечер',
    s:[{ de:'Heute ist ein sonniger Abend.', en:'Today is a sunny evening.', ru:'Сегодня солнечный вечер.' }, { de:'An einem sonnigen Abend gehe ich gern spazieren.', en:'On a sunny evening I like to go for a walk.', ru:'В солнечный вечер я люблю гулять.' }] },
  { n:269, cat:'weather', de:'auf den Bus warten', en:'waiting for bus', ru:'ожидание автобуса',
    s:[{ de:'Ich warte auf den Bus.', en:'I wait for the bus.', ru:'Я жду автобус.' }, { de:'Sie steht an der Bushaltestelle und wartet auf den Bus.', en:'She stands at the bus stop and waits for the bus.', ru:'Она стоит на остановке и ждёт автобус.' }] },
  { n:270, cat:'travel', de:'der Zug hat Verspätung', en:'train is late', ru:'поезд опаздывает',
    s:[{ de:'Der Zug hat Verspätung.', en:'The train is late.', ru:'Поезд опаздывает.' }, { de:'Heute hat der Zug zehn Minuten Verspätung.', en:'Today the train is ten minutes late.', ru:'Сегодня поезд опаздывает на десять минут.' }] },
  { n:271, cat:'travel', de:'fast da', en:'almost there', ru:'почти на месте',
    s:[{ de:'Ich bin fast da.', en:'I am almost there.', ru:'Я почти на месте.' }, { de:'Wir sind jetzt fast da.', en:'We are almost there now.', ru:'Мы сейчас почти на месте.' }] },
  { n:272, cat:'travel', de:'von der Schule nach Hause kommen', en:'coming home from school', ru:'возвращается домой из школы',
    s:[{ de:'Der Junge kommt von der Schule nach Hause.', en:'The boy is coming home from school.', ru:'Мальчик идёт домой из школы.' }, { de:'Am Nachmittag kommt er von der Schule nach Hause.', en:'In the afternoon he comes home from school.', ru:'Днём он приходит домой из школы.' }] },
  { n:273, cat:'family', de:'über den eigenen Tag sprechen', en:'talking about day', ru:'рассказывает о своём дне',
    s:[{ de:'Ich spreche über meinen Tag.', en:'I talk about my day.', ru:'Я рассказываю о своём дне.' }, { de:'Mutter und Sohn sprechen über ihren Tag.', en:'Mother and son talk about their day.', ru:'Мама и сын рассказывают о своём дне.' }] },
  { n:274, cat:'family', de:'zusammen einen Film ansehen', en:'watching movie together', ru:'смотрят фильм вместе',
    s:[{ de:'Wir sehen zusammen einen Film an.', en:'We watch a movie together.', ru:'Мы смотрим фильм вместе.' }, { de:'Am Abend sehen sie zusammen einen Film an.', en:'In the evening they watch a movie together.', ru:'Вечером они смотрят фильм вместе.' }] },
  { n:275, cat:'home', de:'nach dem verlorenen Handy suchen', en:'looking for lost phone', ru:'ищет потерянный телефон',
    s:[{ de:'Ich suche nach meinem verlorenen Handy.', en:'I am looking for my lost phone.', ru:'Я ищу свой потерянный телефон.' }, { de:'Sie sucht im Wohnzimmer nach ihrem verlorenen Handy.', en:'She is looking for her lost phone in the living room.', ru:'Она ищет свой потерянный телефон в гостиной.' }] },
  { n:276, cat:'home', de:'das verlorene Handy finden', en:'finding lost phone', ru:'находит потерянный телефон',
    s:[{ de:'Ich finde mein verlorenes Handy.', en:'I find my lost phone.', ru:'Я нахожу свой потерянный телефон.' }, { de:'Sie findet ihr verlorenes Handy unter dem Sofa.', en:'She finds her lost phone under the sofa.', ru:'Она находит свой потерянный телефон под диваном.' }] },
  { n:277, cat:'home', de:'sich wegen Rückenschmerzen ausruhen', en:'resting because of back pain', ru:'отдыхает из-за боли в спине',
    s:[{ de:'Ich ruhe mich wegen meiner Rückenschmerzen aus.', en:'I rest because of my back pain.', ru:'Я отдыхаю из-за боли в спине.' }, { de:'Sie hat Rückenschmerzen und ruht sich auf dem Sofa aus.', en:'She has back pain and rests on the sofa.', ru:'У неё болит спина, и она отдыхает на диване.' }] },
  { n:278, cat:'body', de:'sich nach dem Ausruhen besser fühlen', en:'feeling better after resting', ru:'чувствует себя лучше после отдыха',
    s:[{ de:'Ich fühle mich nach dem Ausruhen besser.', en:'I feel better after resting.', ru:'После отдыха я чувствую себя лучше.' }, { de:'Nach dem Ausruhen fühlt sie sich viel besser.', en:'After resting she feels much better.', ru:'После отдыха она чувствует себя намного лучше.' }] },

  /* --- sheets 32-38: colours, descriptions, time, bathroom,
     kitchen, places. Same shape as everything above. --- */
  { n:280, cat:'colors', de:'rot', en:'red', ru:'красный',
    s:[{ de:'Die Jacke ist rot.', en:'The jacket is red.', ru:'Куртка красная.' }, { de:'Der Apfel ist rot.', en:'The apple is red.', ru:'Яблоко красное.' }] },
  { n:281, cat:'colors', de:'blau', en:'blue', ru:'синий',
    s:[{ de:'Der Himmel ist blau.', en:'The sky is blue.', ru:'Небо голубое.' }, { de:'Die Tasche ist blau.', en:'The bag is blue.', ru:'Сумка синяя.' }] },
  { n:282, cat:'colors', de:'grün', en:'green', ru:'зелёный',
    s:[{ de:'Das Gemüse ist grün.', en:'The vegetables are green.', ru:'Овощи зелёные.' }, { de:'Die Jacke ist grün.', en:'The jacket is green.', ru:'Куртка зелёная.' }] },
  { n:283, cat:'colors', de:'gelb', en:'yellow', ru:'жёлтый',
    s:[{ de:'Die Zitrone ist gelb.', en:'The lemon is yellow.', ru:'Лимон жёлтый.' }, { de:'Der Pullover ist gelb.', en:'The sweater is yellow.', ru:'Свитер жёлтый.' }] },
  { n:284, cat:'colors', de:'schwarz', en:'black', ru:'чёрный',
    s:[{ de:'Die Jacke ist schwarz.', en:'The jacket is black.', ru:'Куртка чёрная.' }, { de:'Die Tasche ist schwarz.', en:'The bag is black.', ru:'Сумка чёрная.' }] },
  { n:285, cat:'colors', de:'weiß', en:'white', ru:'белый',
    s:[{ de:'Das T-Shirt ist weiß.', en:'The T-shirt is white.', ru:'Футболка белая.' }, { de:'Der Schnee ist weiß.', en:'The snow is white.', ru:'Снег белый.' }] },
  { n:286, cat:'colors', de:'grau', en:'gray', ru:'серый',
    s:[{ de:'Der Himmel ist grau.', en:'The sky is gray.', ru:'Небо серое.' }, { de:'Der Pullover ist grau.', en:'The sweater is gray.', ru:'Свитер серый.' }] },
  { n:287, cat:'colors', de:'rosa', en:'pink', ru:'розовый',
    s:[{ de:'Der Nagellack ist rosa.', en:'The nail polish is pink.', ru:'Лак для ногтей розовый.' }, { de:'Der Schal ist rosa.', en:'The scarf is pink.', ru:'Шарф розовый.' }] },
  { n:288, cat:'colors', de:'lila', en:'purple', ru:'фиолетовый',
    s:[{ de:'Die Tasche ist lila.', en:'The bag is purple.', ru:'Сумка фиолетовая.' }, { de:'Der Pullover ist lila.', en:'The sweater is purple.', ru:'Свитер фиолетовый.' }] },
  { n:289, cat:'describe', de:'groß', en:'big', ru:'большой',
    s:[{ de:'Das Geschäft ist groß.', en:'The store is big.', ru:'Магазин большой.' }, { de:'Die Wohnung ist groß.', en:'The apartment is big.', ru:'Квартира большая.' }] },
  { n:290, cat:'describe', de:'klein', en:'small', ru:'маленький',
    s:[{ de:'Der Koffer ist klein.', en:'The suitcase is small.', ru:'Чемодан маленький.' }, { de:'Die Küche ist klein.', en:'The kitchen is small.', ru:'Кухня маленькая.' }] },
  { n:291, cat:'describe', de:'warm', en:'warm', ru:'тёплый',
    s:[{ de:'Die Wohnung ist warm.', en:'The apartment is warm.', ru:'В квартире тепло.' }, { de:'Die Suppe ist warm.', en:'The soup is warm.', ru:'Суп тёплый.' }] },
  { n:292, cat:'describe', de:'kalt', en:'cold', ru:'холодный',
    s:[{ de:'Das Wasser ist kalt.', en:'The water is cold.', ru:'Вода холодная.' }, { de:'Der Morgen ist kalt.', en:'The morning is cold.', ru:'Утро холодное.' }] },
  { n:293, cat:'describe', de:'weich', en:'soft', ru:'мягкий',
    s:[{ de:'Der Pullover ist weich.', en:'The sweater is soft.', ru:'Свитер мягкий.' }, { de:'Meine Haut ist weich.', en:'My skin is soft.', ru:'Моя кожа мягкая.' }] },
  { n:294, cat:'describe', de:'trocken', en:'dry', ru:'сухой',
    s:[{ de:'Meine Haut ist trocken.', en:'My skin is dry.', ru:'Моя кожа сухая.' }, { de:'Das Handtuch ist trocken.', en:'The towel is dry.', ru:'Полотенце сухое.' }] },
  { n:295, cat:'describe', de:'frisch', en:'fresh', ru:'свежий',
    s:[{ de:'Das Brot ist frisch.', en:'The bread is fresh.', ru:'Хлеб свежий.' }, { de:'Das Gemüse ist frisch.', en:'The vegetables are fresh.', ru:'Овощи свежие.' }] },
  { n:296, cat:'describe', de:'teuer', en:'expensive', ru:'дорогой',
    s:[{ de:'Die Jacke ist teuer.', en:'The jacket is expensive.', ru:'Куртка дорогая.' }, { de:'Diese Schuhe sind teuer.', en:'These shoes are expensive.', ru:'Эти туфли дорогие.' }] },
  { n:297, cat:'describe', de:'billig', en:'cheap', ru:'дешёвый',
    s:[{ de:'Der Pullover ist billig.', en:'The sweater is cheap.', ru:'Свитер дешёвый.' }, { de:'Diese Tasche ist billig.', en:'This bag is cheap.', ru:'Эта сумка дешёвая.' }] },
  { n:298, cat:'shopping', de:'die Kleidung', en:'clothing', ru:'одежда', rg:'F',
    s:[{ de:'Die Kleidung ist im Geschäft.', en:'The clothing is in the store.', ru:'Одежда находится в магазине.' }, { de:'Ich sehe mir die Kleidung an.', en:'I am looking at the clothing.', ru:'Я рассматриваю одежду.' }] },
  { n:299, cat:'shopping', de:'die Größe', en:'size', ru:'размер', rg:'M',
    s:[{ de:'Welche Größe brauchen Sie?', en:'What size do you need?', ru:'Какой размер вам нужен?' }, { de:'Die Größe steht auf dem Etikett.', en:'The size is written on the label.', ru:'Размер указан на этикетке.' }] },
  { n:300, cat:'shopping', de:'das Verkaufspersonal', en:'sales staff', ru:'продавцы', rg:'PL',
    s:[{ de:'Das Verkaufspersonal ist freundlich.', en:'The sales staff are friendly.', ru:'Продавцы дружелюбные.' }, { de:'Ich frage das Verkaufspersonal nach dem Preis.', en:'I ask the sales staff about the price.', ru:'Я спрашиваю продавцов о цене.' }] },
  { n:301, cat:'shopping', de:'der Artikel', en:'item', ru:'товар', rg:'M',
    s:[{ de:'Dieser Artikel ist billig.', en:'This item is cheap.', ru:'Этот товар дешёвый.' }, { de:'Ich kaufe den Artikel.', en:'I am buying the item.', ru:'Я покупаю этот товар.' }] },
  { n:302, cat:'shopping', de:'die Einkaufstasche', en:'shopping bag', ru:'сумка для покупок', rg:'F',
    s:[{ de:'Die Einkaufstasche ist schwer.', en:'The shopping bag is heavy.', ru:'Сумка для покупок тяжёлая.' }, { de:'Ich trage die Einkaufstasche nach Hause.', en:'I carry the shopping bag home.', ru:'Я несу сумку с покупками домой.' }] },
  { n:303, cat:'home', de:'der Film', en:'movie', ru:'фильм', rg:'M',
    s:[{ de:'Der Film ist interessant.', en:'The movie is interesting.', ru:'Фильм интересный.' }, { de:'Wir sehen am Abend einen Film.', en:'We watch a movie in the evening.', ru:'Вечером мы смотрим фильм.' }] },
  { n:304, cat:'shopping', de:'der Preis', en:'price', ru:'цена', rg:'F',
    s:[{ de:'Der Preis ist zu hoch.', en:'The price is too high.', ru:'Цена слишком высокая.' }, { de:'Ich frage nach dem Preis.', en:'I ask about the price.', ru:'Я спрашиваю о цене.' }] },
  { n:305, cat:'shopping', de:'das Geld', en:'money', ru:'деньги', rg:'PL',
    s:[{ de:'Das Geld ist in meiner Tasche.', en:'The money is in my bag.', ru:'Деньги в моей сумке.' }, { de:'Ich brauche Geld für die Jacke.', en:'I need money for the jacket.', ru:'Мне нужны деньги на куртку.' }] },
  { n:306, cat:'shopping', de:'der Kassenzettel', en:'receipt', ru:'чек', rg:'M',
    s:[{ de:'Der Kassenzettel ist in meiner Tasche.', en:'The receipt is in my bag.', ru:'Чек в моей сумке.' }, { de:'Ich nehme den Kassenzettel mit.', en:'I take the receipt with me.', ru:'Я беру чек с собой.' }] },
  { n:307, cat:'time', de:'der Morgen', en:'morning', ru:'утро', rg:'N',
    s:[{ de:'Der Morgen ist ruhig.', en:'The morning is quiet.', ru:'Утро спокойное.' }, { de:'Am Morgen trinke ich Kaffee.', en:'I drink coffee in the morning.', ru:'Утром я пью кофе.' }] },
  { n:308, cat:'time', de:'der Vormittag', en:'late morning', ru:'первая половина дня', rg:'F',
    s:[{ de:'Der Vormittag ist warm.', en:'The late morning is warm.', ru:'В первой половине дня тепло.' }, { de:'Am Vormittag gehe ich einkaufen.', en:'I go shopping in the late morning.', ru:'В первой половине дня я иду за покупками.' }] },
  { n:309, cat:'time', de:'der Mittag', en:'midday', ru:'полдень', rg:'M',
    s:[{ de:'Am Mittag esse ich Suppe.', en:'At noon I eat soup.', ru:'В полдень я ем суп.' }, { de:'Der Mittag ist heute sehr warm.', en:'It is very warm at midday today.', ru:'Сегодня в полдень очень тепло.' }] },
  { n:310, cat:'time', de:'der Nachmittag', en:'afternoon', ru:'вторая половина дня', rg:'F',
    s:[{ de:'Am Nachmittag trinke ich Kaffee.', en:'I drink coffee in the afternoon.', ru:'Днём я пью кофе.' }, { de:'Der Nachmittag ist sonnig.', en:'The afternoon is sunny.', ru:'День солнечный.' }] },
  { n:311, cat:'time', de:'der Abend', en:'evening', ru:'вечер', rg:'M',
    s:[{ de:'Am Abend sehe ich einen Film.', en:'I watch a movie in the evening.', ru:'Вечером я смотрю фильм.' }, { de:'Der Abend ist ruhig.', en:'The evening is quiet.', ru:'Вечер спокойный.' }] },
  { n:312, cat:'time', de:'die Nacht', en:'night', ru:'ночь', rg:'F',
    s:[{ de:'Die Nacht ist kalt.', en:'The night is cold.', ru:'Ночь холодная.' }, { de:'In der Nacht schlafe ich.', en:'I sleep at night.', ru:'Ночью я сплю.' }] },
  { n:313, cat:'time', de:'der Tag', en:'day', ru:'день', rg:'M',
    s:[{ de:'Der Tag ist lang.', en:'The day is long.', ru:'День длинный.' }, { de:'Heute ist ein schöner Tag.', en:'Today is a beautiful day.', ru:'Сегодня прекрасный день.' }] },
  { n:314, cat:'time', de:'die Woche', en:'week', ru:'неделя', rg:'F',
    s:[{ de:'Die Woche ist sehr lang.', en:'The week is very long.', ru:'Неделя очень длинная.' }, { de:'Diese Woche gehe ich oft einkaufen.', en:'I go shopping often this week.', ru:'На этой неделе я часто хожу за покупками.' }] },
  { n:315, cat:'time', de:'das Wochenende', en:'weekend', ru:'выходные', rg:'PL',
    s:[{ de:'Am Wochenende besuche ich meine Familie.', en:'I visit my family on the weekend.', ru:'На выходных я навещаю свою семью.' }, { de:'Das Wochenende ist ruhig.', en:'The weekend is quiet.', ru:'Выходные спокойные.' }] },
  { n:316, cat:'bath', de:'die Dusche', en:'shower', ru:'душ', rg:'M',
    s:[{ de:'Die Dusche ist warm.', en:'The shower is warm.', ru:'Душ тёплый.' }, { de:'Am Morgen gehe ich unter die Dusche.', en:'In the morning I take a shower.', ru:'Утром я принимаю душ.' }] },
  { n:317, cat:'bath', de:'die Badewanne', en:'bathtub', ru:'ванна', rg:'F',
    s:[{ de:'Die Badewanne ist groß.', en:'The bathtub is big.', ru:'Ванна большая.' }, { de:'Das Wasser ist in der Badewanne.', en:'The water is in the bathtub.', ru:'Вода в ванне.' }] },
  { n:318, cat:'bath', de:'das Handtuch', en:'towel', ru:'полотенце', rg:'N',
    s:[{ de:'Das Handtuch ist weich.', en:'The towel is soft.', ru:'Полотенце мягкое.' }, { de:'Ich trockne meine Hände mit dem Handtuch.', en:'I dry my hands with the towel.', ru:'Я вытираю руки полотенцем.' }] },
  { n:319, cat:'bath', de:'die Seife', en:'soap', ru:'мыло', rg:'N',
    s:[{ de:'Die Seife liegt an der Spüle.', en:'The soap is by the sink.', ru:'Мыло лежит у раковины.' }, { de:'Ich wasche meine Hände mit Seife.', en:'I wash my hands with soap.', ru:'Я мою руки с мылом.' }] },
  { n:320, cat:'bath', de:'das Shampoo', en:'shampoo', ru:'шампунь', rg:'M',
    s:[{ de:'Das Shampoo ist in der Dusche.', en:'The shampoo is in the shower.', ru:'Шампунь находится в душе.' }, { de:'Ich wasche meine Haare mit Shampoo.', en:'I wash my hair with shampoo.', ru:'Я мою волосы шампунем.' }] },
  { n:321, cat:'bath', de:'die Zahnbürste', en:'toothbrush', ru:'зубная щётка', rg:'F',
    s:[{ de:'Meine Zahnbürste ist blau.', en:'My toothbrush is blue.', ru:'Моя зубная щётка синяя.' }, { de:'Ich putze meine Zähne mit der Zahnbürste.', en:'I brush my teeth with the toothbrush.', ru:'Я чищу зубы зубной щёткой.' }] },
  { n:322, cat:'bath', de:'die Zahnpasta', en:'toothpaste', ru:'зубная паста', rg:'F',
    s:[{ de:'Die Zahnpasta liegt neben der Zahnbürste.', en:'The toothpaste is next to the toothbrush.', ru:'Зубная паста лежит рядом с зубной щёткой.' }, { de:'Ich brauche neue Zahnpasta.', en:'I need new toothpaste.', ru:'Мне нужна новая зубная паста.' }] },
  { n:323, cat:'bath', de:'die Toilette', en:'toilet', ru:'туалет', rg:'M',
    s:[{ de:'Die Toilette ist im Badezimmer.', en:'The toilet is in the bathroom.', ru:'Туалет находится в ванной комнате.' }, { de:'Ich putze die Toilette.', en:'I clean the toilet.', ru:'Я чищу туалет.' }] },
  { n:324, cat:'bath', de:'das Toilettenpapier', en:'toilet paper', ru:'туалетная бумага', rg:'F',
    s:[{ de:'Das Toilettenpapier ist neben der Toilette.', en:'The toilet paper is next to the toilet.', ru:'Туалетная бумага находится рядом с туалетом.' }, { de:'Wir brauchen neues Toilettenpapier.', en:'We need new toilet paper.', ru:'Нам нужна новая туалетная бумага.' }] },
  { n:325, cat:'kitchen', de:'der Kühlschrank', en:'refrigerator', ru:'холодильник', rg:'M',
    s:[{ de:'Die Milch ist im Kühlschrank.', en:'The milk is in the refrigerator.', ru:'Молоко в холодильнике.' }, { de:'Ich nehme das Gemüse aus dem Kühlschrank.', en:'I take the vegetables out of the refrigerator.', ru:'Я достаю овощи из холодильника.' }] },
  { n:326, cat:'kitchen', de:'der Herd', en:'stove', ru:'плита', rg:'F',
    s:[{ de:'Der Kochtopf steht auf dem Herd.', en:'The cooking pot is on the stove.', ru:'Кастрюля стоит на плите.' }, { de:'Ich koche die Suppe auf dem Herd.', en:'I cook the soup on the stove.', ru:'Я варю суп на плите.' }] },
  { n:327, cat:'kitchen', de:'der Backofen', en:'oven', ru:'духовка', rg:'F',
    s:[{ de:'Der Backofen ist heiß.', en:'The oven is hot.', ru:'Духовка горячая.' }, { de:'Das Essen ist im Backofen.', en:'The food is in the oven.', ru:'Еда в духовке.' }] },
  { n:328, cat:'kitchen', de:'die Spüle', en:'kitchen sink', ru:'раковина', rg:'F',
    s:[{ de:'Die Spüle ist in der Küche.', en:'The sink is in the kitchen.', ru:'Раковина находится на кухне.' }, { de:'Ich wasche den Teller in der Spüle.', en:'I wash the plate in the sink.', ru:'Я мою тарелку в раковине.' }] },
  { n:329, cat:'kitchen', de:'der Teller', en:'plate', ru:'тарелка', rg:'F',
    s:[{ de:'Das Essen ist auf dem Teller.', en:'The food is on the plate.', ru:'Еда на тарелке.' }, { de:'Der Teller steht auf dem Tisch.', en:'The plate is on the table.', ru:'Тарелка стоит на столе.' }] },
  { n:330, cat:'kitchen', de:'die Schüssel', en:'bowl', ru:'миска', rg:'F',
    s:[{ de:'Die Suppe ist in der Schüssel.', en:'The soup is in the bowl.', ru:'Суп в миске.' }, { de:'Ich stelle die Schüssel auf den Tisch.', en:'I put the bowl on the table.', ru:'Я ставлю миску на стол.' }] },
  { n:331, cat:'kitchen', de:'die Tasse', en:'cup', ru:'чашка', rg:'F',
    s:[{ de:'Der Kaffee ist in der Tasse.', en:'The coffee is in the cup.', ru:'Кофе в чашке.' }, { de:'Die Tasse steht auf dem Tisch.', en:'The cup is on the table.', ru:'Чашка стоит на столе.' }] },
  { n:332, cat:'kitchen', de:'das Besteck', en:'cutlery', ru:'столовые приборы', rg:'PL',
    s:[{ de:'Das Besteck liegt auf dem Tisch.', en:'The cutlery is on the table.', ru:'Столовые приборы лежат на столе.' }, { de:'Ich brauche Besteck für das Abendessen.', en:'I need cutlery for dinner.', ru:'Мне нужны столовые приборы для ужина.' }] },
  { n:333, cat:'kitchen', de:'das Schneidebrett', en:'cutting board', ru:'разделочная доска', rg:'F',
    s:[{ de:'Das Schneidebrett liegt in der Küche.', en:'The cutting board is in the kitchen.', ru:'Разделочная доска находится на кухне.' }, { de:'Ich schneide die Karotten auf dem Schneidebrett.', en:'I cut the carrots on the cutting board.', ru:'Я режу морковь на разделочной доске.' }] },
  { n:334, cat:'places', de:'der Supermarkt', en:'supermarket', ru:'супермаркет', rg:'M',
    s:[{ de:'Ich gehe in den Supermarkt.', en:'I go to the supermarket.', ru:'Я иду в супермаркет.' }, { de:'Der Supermarkt ist heute geöffnet.', en:'The supermarket is open today.', ru:'Супермаркет сегодня открыт.' }] },
  { n:335, cat:'places', de:'die Apotheke', en:'pharmacy', ru:'аптека', rg:'F',
    s:[{ de:'Ich gehe in die Apotheke.', en:'I go to the pharmacy.', ru:'Я иду в аптеку.' }, { de:'Die Apotheke ist neben dem Supermarkt.', en:'The pharmacy is next to the supermarket.', ru:'Аптека находится рядом с супермаркетом.' }] },
  { n:336, cat:'places', de:'die Bäckerei', en:'bakery', ru:'пекарня', rg:'F',
    s:[{ de:'Ich kaufe Brot in der Bäckerei.', en:'I buy bread at the bakery.', ru:'Я покупаю хлеб в пекарне.' }, { de:'Die Bäckerei ist am Morgen geöffnet.', en:'The bakery is open in the morning.', ru:'Пекарня открыта утром.' }] },
  { n:337, cat:'places', de:'das Restaurant', en:'restaurant', ru:'ресторан', rg:'M',
    s:[{ de:'Wir essen in einem Restaurant.', en:'We eat at a restaurant.', ru:'Мы едим в ресторане.' }, { de:'Das Restaurant ist im Stadtzentrum.', en:'The restaurant is in the city center.', ru:'Ресторан находится в центре города.' }] },
  { n:338, cat:'places', de:'das Café', en:'café', ru:'кафе', rg:'N',
    s:[{ de:'Ich trinke Kaffee im Café.', en:'I drink coffee at the café.', ru:'Я пью кофе в кафе.' }, { de:'Das Café ist klein und ruhig.', en:'The café is small and quiet.', ru:'Кафе маленькое и спокойное.' }] },
  { n:339, cat:'places', de:'die Bank', en:'bank', ru:'банк', rg:'M',
    s:[{ de:'Ich gehe heute zur Bank.', en:'I am going to the bank today.', ru:'Сегодня я иду в банк.' }, { de:'Die Bank ist im Stadtzentrum.', en:'The bank is in the city center.', ru:'Банк находится в центре города.' }] },
  { n:340, cat:'places', de:'die Post', en:'post office', ru:'почта', rg:'F',
    s:[{ de:'Ich gehe zur Post.', en:'I go to the post office.', ru:'Я иду на почту.' }, { de:'Die Post ist neben der Bank.', en:'The post office is next to the bank.', ru:'Почта находится рядом с банком.' }] },
  { n:341, cat:'places', de:'die Arztpraxis', en:'doctor\'s office', ru:'кабинет врача', rg:'M',
    s:[{ de:'Ich gehe heute in die Arztpraxis.', en:'I am going to the doctor\'s office today.', ru:'Сегодня я иду к врачу.' }, { de:'Die Arztpraxis ist nicht weit.', en:'The doctor\'s office is not far away.', ru:'Кабинет врача находится недалеко.' }] },
  { n:342, cat:'places', de:'der Spielplatz', en:'playground', ru:'детская площадка', rg:'F',
    s:[{ de:'Der Junge spielt auf dem Spielplatz.', en:'The boy is playing on the playground.', ru:'Мальчик играет на детской площадке.' }, { de:'Der Spielplatz ist neben der Schule.', en:'The playground is next to the school.', ru:'Детская площадка находится рядом со школой.' }] },

  /* --- sheets 39-46: days, numbers, time, seasons, cutlery, body
     movement, senses, music and song words.

     s:[] for now — the two sentences per word are still being written.
     Section 3 and the audio game both skip any entry with no sentences,
     so these show up in the word list and in Поймай слово (which only
     needs the word and its topic) and join the rest automatically the
     moment sentences land. --- */
  { n:343, cat:'time', de:'der Montag', en:'Monday', ru:'понедельник', rg:'M',
    s:[{ de:'Heute ist Montag.', en:'Today is Monday.', ru:'Сегодня понедельник.' }, { de:'Am Montag arbeite ich.', en:'On Monday I work.', ru:'В понедельник я работаю.' }] },
  { n:344, cat:'time', de:'der Dienstag', en:'Tuesday', ru:'вторник', rg:'M',
    s:[{ de:'Heute ist Dienstag.', en:'Today is Tuesday.', ru:'Сегодня вторник.' }, { de:'Am Dienstag lerne ich Deutsch.', en:'On Tuesday I learn German.', ru:'Во вторник я учу немецкий.' }] },
  { n:345, cat:'time', de:'der Mittwoch', en:'Wednesday', ru:'среда', rg:'F',
    s:[{ de:'Heute ist Mittwoch.', en:'Today is Wednesday.', ru:'Сегодня среда.' }, { de:'Am Mittwoch koche ich zu Hause.', en:'On Wednesday I cook at home.', ru:'В среду я готовлю дома.' }] },
  { n:346, cat:'time', de:'der Donnerstag', en:'Thursday', ru:'четверг', rg:'M',
    s:[{ de:'Heute ist Donnerstag.', en:'Today is Thursday.', ru:'Сегодня четверг.' }, { de:'Am Donnerstag gehe ich einkaufen.', en:'On Thursday I go shopping.', ru:'В четверг я хожу за покупками.' }] },
  { n:347, cat:'time', de:'der Freitag', en:'Friday', ru:'пятница', rg:'F',
    s:[{ de:'Heute ist Freitag.', en:'Today is Friday.', ru:'Сегодня пятница.' }, { de:'Am Freitag bin ich müde.', en:'On Friday I am tired.', ru:'В пятницу я уставшая.' }] },
  { n:348, cat:'time', de:'der Samstag', en:'Saturday', ru:'суббота', rg:'F',
    s:[{ de:'Heute ist Samstag.', en:'Today is Saturday.', ru:'Сегодня суббота.' }, { de:'Am Samstag schlafe ich lange.', en:'On Saturday I sleep a long time.', ru:'В субботу я долго сплю.' }] },
  { n:349, cat:'time', de:'der Sonntag', en:'Sunday', ru:'воскресенье', rg:'N',
    s:[{ de:'Heute ist Sonntag.', en:'Today is Sunday.', ru:'Сегодня воскресенье.' }, { de:'Am Sonntag besuche ich meine Familie.', en:'On Sunday I visit my family.', ru:'В воскресенье я навещаю свою семью.' }] },
  { n:350, cat:'time', de:'heute', en:'today', ru:'сегодня',
    s:[{ de:'Heute bin ich zu Hause.', en:'Today I am at home.', ru:'Сегодня я дома.' }, { de:'Heute ist das Wetter schön.', en:'Today the weather is nice.', ru:'Сегодня хорошая погода.' }] },
  { n:351, cat:'time', de:'der Kalender', en:'calendar', ru:'календарь', rg:'M',
    s:[{ de:'Der Kalender hängt an der Wand.', en:'The calendar hangs on the wall.', ru:'Календарь висит на стене.' }, { de:'Ich sehe das Datum im Kalender.', en:'I see the date in the calendar.', ru:'Я смотрю дату в календаре.' }] },
  { n:352, cat:'numbers', de:'eins', en:'one', ru:'один',
    s:[{ de:'Ich habe eins.', en:'I have one.', ru:'У меня один.' }, { de:'Eins ist eine kleine Zahl.', en:'One is a small number.', ru:'Один — маленькое число.' }] },
  { n:353, cat:'numbers', de:'zwei', en:'two', ru:'два',
    s:[{ de:'Ich sehe zwei Hunde.', en:'I see two dogs.', ru:'Я вижу двух собак.' }, { de:'Zwei Kinder spielen hier.', en:'Two children are playing here.', ru:'Здесь играют двое детей.' }] },
  { n:354, cat:'numbers', de:'drei', en:'three', ru:'три',
    s:[{ de:'Wir haben drei Äpfel.', en:'We have three apples.', ru:'У нас три яблока.' }, { de:'Drei Bücher liegen auf dem Tisch.', en:'Three books are lying on the table.', ru:'Три книги лежат на столе.' }] },
  { n:355, cat:'numbers', de:'vier', en:'four', ru:'четыре',
    s:[{ de:'Ich habe vier Bälle.', en:'I have four balls.', ru:'У меня четыре мяча.' }, { de:'Vier Stühle stehen im Zimmer.', en:'Four chairs are in the room.', ru:'В комнате стоят четыре стула.' }] },
  { n:356, cat:'numbers', de:'fünf', en:'five', ru:'пять',
    s:[{ de:'Das Kind zeigt fünf Finger.', en:'The child shows five fingers.', ru:'Ребёнок показывает пять пальцев.' }, { de:'Ich kaufe fünf Bananen.', en:'I buy five bananas.', ru:'Я покупаю пять бананов.' }] },
  { n:357, cat:'numbers', de:'sechs', en:'six', ru:'шесть',
    s:[{ de:'Wir sehen sechs Blumen.', en:'We see six flowers.', ru:'Мы видим шесть цветов.' }, { de:'Sechs Tassen stehen auf dem Tisch.', en:'Six cups are on the table.', ru:'На столе стоят шесть чашек.' }] },
  { n:358, cat:'numbers', de:'sieben', en:'seven', ru:'семь',
    s:[{ de:'Ich habe sieben Euro.', en:'I have seven euros.', ru:'У меня семь евро.' }, { de:'Sieben Tage sind eine Woche.', en:'Seven days are one week.', ru:'Семь дней — это одна неделя.' }] },
  { n:359, cat:'numbers', de:'acht', en:'eight', ru:'восемь',
    s:[{ de:'Acht Kinder sind in der Schule.', en:'Eight children are in the school.', ru:'В школе восемь детей.' }, { de:'Ich sehe acht Vögel.', en:'I see eight birds.', ru:'Я вижу восемь птиц.' }] },
  { n:360, cat:'numbers', de:'neun', en:'nine', ru:'девять',
    s:[{ de:'Wir haben neun Eier.', en:'We have nine eggs.', ru:'У нас девять яиц.' }, { de:'Neun Schuhe stehen an der Tür.', en:'Nine shoes are by the door.', ru:'Девять туфель стоят у двери.' }] },
  { n:361, cat:'numbers', de:'zehn', en:'ten', ru:'десять',
    s:[{ de:'Ich habe zehn Finger.', en:'I have ten fingers.', ru:'У меня десять пальцев.' }, { de:'Zehn ist eine große Zahl für ein Kind.', en:'Ten is a big number for a child.', ru:'Десять — большое число для ребёнка.' }] },
  { n:362, cat:'time', de:'die Stunde', en:'hour', ru:'час', rg:'M',
    s:[{ de:'Eine Stunde hat sechzig Minuten.', en:'An hour has sixty minutes.', ru:'В одном часе шестьдесят минут.' }, { de:'Der Film dauert eine Stunde.', en:'The movie lasts one hour.', ru:'Фильм длится один час.' }] },
  { n:363, cat:'time', de:'die Minute', en:'minute', ru:'минута', rg:'F',
    s:[{ de:'Eine Minute ist kurz.', en:'One minute is short.', ru:'Одна минута — это недолго.' }, { de:'Ich warte nur eine Minute.', en:'I wait only one minute.', ru:'Я подожду только одну минуту.' }] },
  { n:364, cat:'time', de:'gestern', en:'yesterday', ru:'вчера',
    s:[{ de:'Gestern war ich zu Hause.', en:'Yesterday I was at home.', ru:'Вчера я была дома.' }, { de:'Gestern habe ich Kaffee getrunken.', en:'Yesterday I drank coffee.', ru:'Вчера я пила кофе.' }] },
  { n:365, cat:'time', de:'morgen', en:'tomorrow', ru:'завтра',
    s:[{ de:'Morgen gehe ich zur Arbeit.', en:'Tomorrow I am going to work.', ru:'Завтра я иду на работу.' }, { de:'Morgen ist das Wetter besser.', en:'Tomorrow the weather will be better.', ru:'Завтра погода будет лучше.' }] },
  { n:366, cat:'time', de:'in einer Stunde', en:'in an hour', ru:'через час',
    s:[{ de:'Ich komme in einer Stunde.', en:'I am coming in an hour.', ru:'Я приду через час.' }, { de:'Der Bus fährt in einer Stunde.', en:'The bus leaves in an hour.', ru:'Автобус отправляется через час.' }] },
  { n:367, cat:'time', de:'vor einer Stunde', en:'an hour ago', ru:'час назад',
    s:[{ de:'Ich war vor einer Stunde hier.', en:'I was here an hour ago.', ru:'Я была здесь час назад.' }, { de:'Der Film begann vor einer Stunde.', en:'The movie began an hour ago.', ru:'Фильм начался час назад.' }] },
  { n:368, cat:'time', de:'in einer Minute', en:'in a minute', ru:'через минуту',
    s:[{ de:'Ich bin in einer Minute da.', en:'I will be there in a minute.', ru:'Я буду там через минуту.' }, { de:'Das Essen ist in einer Minute fertig.', en:'The food will be ready in a minute.', ru:'Еда будет готова через минуту.' }] },
  { n:369, cat:'time', de:'vor einer Minute', en:'a minute ago', ru:'минуту назад',
    s:[{ de:'Er war vor einer Minute hier.', en:'He was here a minute ago.', ru:'Он был здесь минуту назад.' }, { de:'Ich habe sie vor einer Minute gesehen.', en:'I saw her a minute ago.', ru:'Я видела её минуту назад.' }] },
  { n:370, cat:'weather', de:'der Frühling', en:'spring', ru:'весна', rg:'F',
    s:[{ de:'Im Frühling blühen die Blumen.', en:'In spring the flowers bloom.', ru:'Весной цветут цветы.' }, { de:'Der Frühling ist schön und warm.', en:'Spring is beautiful and warm.', ru:'Весна красивая и тёплая.' }] },
  { n:371, cat:'weather', de:'der Sommer', en:'summer', ru:'лето', rg:'N',
    s:[{ de:'Im Sommer ist es heiß.', en:'In summer it is hot.', ru:'Летом жарко.' }, { de:'Wir schwimmen im Sommer.', en:'We swim in summer.', ru:'Летом мы плаваем.' }] },
  { n:372, cat:'weather', de:'der Herbst', en:'autumn', ru:'осень', rg:'F',
    s:[{ de:'Im Herbst fallen die Blätter.', en:'In autumn the leaves fall.', ru:'Осенью опадают листья.' }, { de:'Der Herbst ist oft windig.', en:'Autumn is often windy.', ru:'Осенью часто ветрено.' }] },
  { n:373, cat:'weather', de:'der Winter', en:'winter', ru:'зима', rg:'F',
    s:[{ de:'Im Winter liegt Schnee.', en:'In winter there is snow.', ru:'Зимой лежит снег.' }, { de:'Der Winter ist kalt.', en:'Winter is cold.', ru:'Зима холодная.' }] },
  { n:374, cat:'kitchen', de:'das Messer', en:'knife', ru:'нож', rg:'M',
    s:[{ de:'Das Messer liegt auf dem Tisch.', en:'The knife is lying on the table.', ru:'Нож лежит на столе.' }, { de:'Ich schneide das Brot mit dem Messer.', en:'I cut the bread with the knife.', ru:'Я режу хлеб ножом.' }] },
  { n:375, cat:'kitchen', de:'die Gabel', en:'fork', ru:'вилка', rg:'F',
    s:[{ de:'Die Gabel ist sauber.', en:'The fork is clean.', ru:'Вилка чистая.' }, { de:'Ich esse mit der Gabel.', en:'I eat with the fork.', ru:'Я ем вилкой.' }] },
  { n:376, cat:'kitchen', de:'der Löffel', en:'spoon', ru:'ложка', rg:'F',
    s:[{ de:'Der Löffel liegt neben dem Teller.', en:'The spoon is next to the plate.', ru:'Ложка лежит рядом с тарелкой.' }, { de:'Ich esse Suppe mit dem Löffel.', en:'I eat soup with the spoon.', ru:'Я ем суп ложкой.' }] },
  { n:377, cat:'bath', de:'das Badezimmer', en:'bathroom', ru:'ванная комната', rg:'F',
    s:[{ de:'Das Badezimmer ist klein.', en:'The bathroom is small.', ru:'Ванная комната маленькая.' }, { de:'Ich bin im Badezimmer.', en:'I am in the bathroom.', ru:'Я в ванной комнате.' }] },
  { n:378, cat:'travel', de:'der Pass', en:'passport', ru:'паспорт', rg:'M',
    s:[{ de:'Mein Pass ist in der Tasche.', en:'My passport is in the bag.', ru:'Мой паспорт в сумке.' }, { de:'Ich brauche meinen Pass für die Reise.', en:'I need my passport for the trip.', ru:'Мне нужен паспорт для поездки.' }] },
  { n:379, cat:'body', de:'der Körper', en:'body', ru:'тело', rg:'N',
    s:[{ de:'Der Körper ist wichtig.', en:'The body is important.', ru:'Тело важно.' }, { de:'Mein Körper ist müde.', en:'My body is tired.', ru:'Моё тело устало.' }] },
  { n:380, cat:'body', de:'sich bewegen', en:'to move', ru:'двигаться',
    s:[{ de:'Ich bewege mich jeden Tag.', en:'I move every day.', ru:'Я двигаюсь каждый день.' }, { de:'Das Kind bewegt sich schnell.', en:'The child moves quickly.', ru:'Ребёнок двигается быстро.' }] },
  { n:381, cat:'body', de:'tanzen', en:'to dance', ru:'танцевать',
    s:[{ de:'Ich tanze gern.', en:'I like to dance.', ru:'Я люблю танцевать.' }, { de:'Wir tanzen zur Musik.', en:'We dance to the music.', ru:'Мы танцуем под музыку.' }] },
  { n:382, cat:'body', de:'sich kratzen', en:'to scratch oneself', ru:'чесаться',
    s:[{ de:'Der Junge kratzt sich am Arm.', en:'The boy scratches his arm.', ru:'Мальчик чешет руку.' }, { de:'Ich kratze mich am Kopf.', en:'I scratch my head.', ru:'Я чешу голову.' }] },
  { n:383, cat:'body', de:'blinzeln', en:'to blink', ru:'моргать',
    s:[{ de:'Ich blinzle in die Sonne.', en:'I blink in the sun.', ru:'Я щурюсь на солнце.' }, { de:'Das Baby blinzelt oft.', en:'The baby blinks often.', ru:'Малыш часто моргает.' }] },
  { n:384, cat:'body', de:'die Haare zurückwerfen', en:'to toss the hair back', ru:'откидывать волосы назад',
    s:[{ de:'Sie wirft die Haare zurück.', en:'She tosses her hair back.', ru:'Она отбрасывает волосы назад.' }, { de:'Das Mädchen wirft die Haare zurück.', en:'The girl tosses her hair back.', ru:'Девочка отбрасывает волосы назад.' }] },
  { n:385, cat:'body', de:'die Arme verschränken', en:'to fold the arms', ru:'скрещивать руки',
    s:[{ de:'Er verschränkt die Arme.', en:'He crosses his arms.', ru:'Он скрещивает руки.' }, { de:'Sie steht da und verschränkt die Arme.', en:'She stands there and crosses her arms.', ru:'Она стоит и скрещивает руки.' }] },
  { n:386, cat:'body', de:'nach oben zeigen', en:'to point upward', ru:'показывать вверх',
    s:[{ de:'Ich zeige nach oben.', en:'I point upward.', ru:'Я показываю вверх.' }, { de:'Das Kind zeigt nach oben zum Himmel.', en:'The child points upward to the sky.', ru:'Ребёнок показывает вверх, на небо.' }] },
  { n:387, cat:'body', de:'mit den Füßen wippen', en:'to tap the feet', ru:'покачивать ногами',
    s:[{ de:'Er wippt mit den Füßen.', en:'He taps his feet.', ru:'Он покачивает ногами.' }, { de:'Ich wippe mit den Füßen zur Musik.', en:'I tap my feet to the music.', ru:'Я покачиваю ногами в такт музыке.' }] },
  { n:388, cat:'body', de:'in die Hände klatschen', en:'to clap one\'s hands', ru:'хлопать в ладоши',
    s:[{ de:'Die Kinder klatschen in die Hände.', en:'The children clap their hands.', ru:'Дети хлопают в ладоши.' }, { de:'Ich klatsche vor Freude in die Hände.', en:'I clap my hands with joy.', ru:'Я хлопаю в ладоши от радости.' }] },
  { n:389, cat:'body', de:'mit dem Rücken wackeln', en:'to wiggle the back', ru:'двигать спиной',
    s:[{ de:'Das Kind wackelt mit dem Rücken.', en:'The child wiggles its back.', ru:'Ребёнок двигает спиной из стороны в сторону.' }, { de:'Er tanzt und wackelt mit dem Rücken.', en:'He dances and wiggles his back.', ru:'Он танцует и двигает спиной.' }] },
  { n:390, cat:'body', de:'lauschen', en:'to listen attentively', ru:'прислушиваться',
    s:[{ de:'Ich lausche der Musik.', en:'I listen closely to the music.', ru:'Я внимательно слушаю музыку.' }, { de:'Das Kind lauscht am Fenster.', en:'The child listens closely at the window.', ru:'Ребёнок внимательно слушает у окна.' }] },
  { n:391, cat:'body', de:'hören', en:'to hear', ru:'слышать',
    s:[{ de:'Ich höre ein Geräusch.', en:'I hear a sound.', ru:'Я слышу звук.' }, { de:'Wir hören Musik.', en:'We hear music.', ru:'Мы слушаем музыку.' }] },
  { n:392, cat:'body', de:'sehen', en:'to see', ru:'видеть',
    s:[{ de:'Ich sehe den Hund.', en:'I see the dog.', ru:'Я вижу собаку.' }, { de:'Sie sieht den Bus.', en:'She sees the bus.', ru:'Она видит автобус.' }] },
  { n:393, cat:'body', de:'lächeln', en:'to smile', ru:'улыбаться',
    s:[{ de:'Das Baby lächelt.', en:'The baby smiles.', ru:'Малыш улыбается.' }, { de:'Sie lächelt mich an.', en:'She smiles at me.', ru:'Она улыбается мне.' }] },
  { n:394, cat:'body', de:'die Haut eincremen', en:'to apply cream to the skin', ru:'наносить крем на кожу',
    s:[{ de:'Ich creme meine Haut ein.', en:'I put cream on my skin.', ru:'Я наношу крем на кожу.' }, { de:'Sie cremt ihre Hände ein.', en:'She puts cream on her hands.', ru:'Она мажет руки кремом.' }] },
  { n:395, cat:'body', de:'die Zähne zeigen', en:'to show one\'s teeth', ru:'показывать зубы',
    s:[{ de:'Der Hund zeigt die Zähne.', en:'The dog shows its teeth.', ru:'Собака показывает зубы.' }, { de:'Er zeigt die Zähne und lacht.', en:'He shows his teeth and laughs.', ru:'Он показывает зубы и смеётся.' }] },
  { n:396, cat:'body', de:'das Bein strecken', en:'to stretch the leg', ru:'вытягивать ногу',
    s:[{ de:'Ich strecke mein Bein.', en:'I stretch my leg.', ru:'Я вытягиваю ногу.' }, { de:'Sie sitzt und streckt das Bein.', en:'She sits and stretches her leg.', ru:'Она сидит и вытягивает ногу.' }] },
  { n:397, cat:'body', de:'der Krampf', en:'cramp', ru:'судорога', rg:'F',
    s:[{ de:'Ich habe einen Krampf im Bein.', en:'I have a cramp in my leg.', ru:'У меня судорога в ноге.' }, { de:'Der Krampf tut weh.', en:'The cramp hurts.', ru:'Судорога болит.' }] },
  { n:398, cat:'body', de:'der Hunger', en:'hunger', ru:'голод', rg:'M',
    s:[{ de:'Ich habe Hunger.', en:'I am hungry.', ru:'Я голодна.' }, { de:'Der Hunger ist groß.', en:'The hunger is strong.', ru:'Голод сильный.' }] },
  { n:399, cat:'body', de:'den Bauch reiben', en:'to rub the stomach', ru:'тереть живот',
    s:[{ de:'Das Kind reibt den Bauch.', en:'The child rubs its stomach.', ru:'Ребёнок трёт живот.' }, { de:'Ich reibe meinen Bauch nach dem Essen.', en:'I rub my stomach after eating.', ru:'Я тру живот после еды.' }] },
  { n:400, cat:'body', de:'den Kopf reiben', en:'to rub the head', ru:'тереть голову',
    s:[{ de:'Er reibt den Kopf.', en:'He rubs his head.', ru:'Он трёт голову.' }, { de:'Ich reibe meinen Kopf, weil ich müde bin.', en:'I rub my head because I am tired.', ru:'Я тру голову, потому что устала.' }] },
  { n:401, cat:'music', de:'das Geräusch', en:'sound', ru:'звук', rg:'M',
    s:[{ de:'Ich höre ein Geräusch.', en:'I hear a sound.', ru:'Я слышу звук.' }, { de:'Das Geräusch ist laut.', en:'The sound is loud.', ru:'Звук громкий.' }] },
  { n:402, cat:'music', de:'die Musik', en:'music', ru:'музыка', rg:'F',
    s:[{ de:'Die Musik ist schön.', en:'The music is beautiful.', ru:'Музыка красивая.' }, { de:'Ich höre gern Musik.', en:'I like listening to music.', ru:'Я люблю слушать музыку.' }] },
  { n:403, cat:'music', de:'der Rhythmus', en:'rhythm', ru:'ритм', rg:'M',
    s:[{ de:'Der Rhythmus ist gut.', en:'The rhythm is good.', ru:'Ритм хороший.' }, { de:'Ich höre den Rhythmus.', en:'I hear the rhythm.', ru:'Я слышу ритм.' }] },
  { n:404, cat:'music', de:'das Lied', en:'song', ru:'песня', rg:'F',
    s:[{ de:'Das Lied ist sehr schön.', en:'The song is very beautiful.', ru:'Песня очень красивая.' }, { de:'Ich singe ein Lied.', en:'I sing a song.', ru:'Я пою песню.' }] },
  { n:405, cat:'music', de:'der Schritt', en:'step', ru:'шаг', rg:'M',
    s:[{ de:'Ein Schritt ist klein.', en:'One step is small.', ru:'Один шаг маленький.' }, { de:'Ich mache einen Schritt nach vorn.', en:'I take a step forward.', ru:'Я делаю шаг вперёд.' }] },
  { n:406, cat:'describe', de:'schnell', en:'fast', ru:'быстро',
    s:[{ de:'Der Hund läuft schnell.', en:'The dog runs fast.', ru:'Собака бежит быстро.' }, { de:'Ich gehe nicht so schnell.', en:'I do not walk that fast.', ru:'Я иду не так быстро.' }] },
  { n:407, cat:'describe', de:'langsam', en:'slow', ru:'медленно',
    s:[{ de:'Die Schildkröte ist langsam.', en:'The turtle is slow.', ru:'Черепаха медленная.' }, { de:'Bitte sprich langsam.', en:'Please speak slowly.', ru:'Пожалуйста, говори медленно.' }] },
  { n:408, cat:'describe', de:'hell', en:'bright', ru:'яркий',
    s:[{ de:'Das Zimmer ist hell.', en:'The room is bright.', ru:'Комната светлая.' }, { de:'Die Lampe ist sehr hell.', en:'The lamp is very bright.', ru:'Лампа очень яркая.' }] },
  { n:409, cat:'describe', de:'stark', en:'strong', ru:'сильный',
    s:[{ de:'Der Mann ist stark.', en:'The man is strong.', ru:'Мужчина сильный.' }, { de:'Der Kaffee ist stark.', en:'The coffee is strong.', ru:'Кофе крепкий.' }] },
  { n:410, cat:'describe', de:'sauber', en:'clean', ru:'чистый',
    s:[{ de:'Meine Hände sind sauber.', en:'My hands are clean.', ru:'Мои руки чистые.' }, { de:'Das Badezimmer ist sauber.', en:'The bathroom is clean.', ru:'Ванная комната чистая.' }] },
  { n:411, cat:'describe', de:'besonders', en:'special', ru:'особенный',
    s:[{ de:'Dieser Tag ist besonders.', en:'This day is special.', ru:'Этот день особенный.' }, { de:'Das ist ein besonders schönes Geschenk.', en:'That is a particularly beautiful gift.', ru:'Это особенно красивый подарок.' }] },
  { n:412, cat:'music', de:'das Geschenk', en:'gift', ru:'подарок', rg:'M',
    s:[{ de:'Das Geschenk ist für dich.', en:'The gift is for you.', ru:'Этот подарок для тебя.' }, { de:'Ich habe ein Geschenk.', en:'I have a gift.', ru:'У меня есть подарок.' }] },
  { n:413, cat:'music', de:'die Liebe', en:'love', ru:'любовь', rg:'F',
    s:[{ de:'Liebe ist wichtig.', en:'Love is important.', ru:'Любовь важна.' }, { de:'Die Liebe ist schön.', en:'Love is beautiful.', ru:'Любовь прекрасна.' }] },
  { n:414, cat:'music', de:'das Leben', en:'life', ru:'жизнь', rg:'F',
    s:[{ de:'Das Leben ist schön.', en:'Life is beautiful.', ru:'Жизнь прекрасна.' }, { de:'Mein Leben ist ruhig.', en:'My life is calm.', ru:'Моя жизнь спокойная.' }] },

  /* ---------- Животные ---------- */
  { n:415, cat:'animals', imgs:[415,518], de:'der Hund', en:'dog', ru:'собака', rg:'F',
    s:[
      { de:'Der Hund läuft im Park.', en:'The dog runs in the park.', ru:'Собака бегает в парке.' },
      { de:'Der Hund bellt laut.', en:'The dog barks loudly.', ru:'Собака громко лает.' },
    ] },
  { n:416, cat:'animals', de:'die Katze', en:'cat', ru:'кошка', rg:'F',
    s:[
      { de:'Die Katze schläft auf dem Sofa.', en:'The cat sleeps on the sofa.', ru:'Кошка спит на диване.' },
      { de:'Die Katze springt auf den Tisch.', en:'The cat jumps onto the table.', ru:'Кошка прыгает на стол.' },
    ] },
  { n:417, cat:'animals', de:'der Vogel', en:'bird', ru:'птица', rg:'F',
    s:[
      { de:'Der Vogel fliegt am Himmel.', en:'The bird flies in the sky.', ru:'Птица летает в небе.' },
      { de:'Der Vogel singt am Morgen.', en:'The bird sings in the morning.', ru:'Птица поёт утром.' },
    ] },
  { n:418, cat:'animals', de:'das Pferd', en:'horse', ru:'лошадь', rg:'F',
    s:[
      { de:'Das Pferd läuft schnell.', en:'The horse runs fast.', ru:'Лошадь быстро бегает.' },
      { de:'Das Pferd frisst Gras.', en:'The horse eats grass.', ru:'Лошадь ест траву.' },
    ] },
  { n:419, cat:'animals', de:'die Kuh', en:'cow', ru:'корова', rg:'F',
    s:[
      { de:'Die Kuh frisst Gras.', en:'The cow eats grass.', ru:'Корова ест траву.' },
      { de:'Die Kuh lebt auf dem Bauernhof.', en:'The cow lives on a farm.', ru:'Корова живёт на ферме.' },
    ] },
  { n:420, cat:'animals', de:'das Schwein', en:'pig', ru:'свинья', rg:'F',
    s:[
      { de:'Das Schwein frisst gern.', en:'The pig likes to eat.', ru:'Свинья любит есть.' },
      { de:'Das Schwein lebt auf dem Bauernhof.', en:'The pig lives on a farm.', ru:'Свинья живёт на ферме.' },
    ] },
  { n:421, cat:'animals', de:'das Schaf', en:'sheep', ru:'овца', rg:'F',
    s:[
      { de:'Das Schaf frisst Gras.', en:'The sheep eats grass.', ru:'Овца ест траву.' },
      { de:'Das Schaf hat weiche Wolle.', en:'The sheep has soft wool.', ru:'У овцы мягкая шерсть.' },
    ] },
  { n:422, cat:'animals', de:'das Huhn', en:'chicken', ru:'курица', rg:'F',
    s:[
      { de:'Das Huhn legt Eier.', en:'The chicken lays eggs.', ru:'Курица несёт яйца.' },
      { de:'Das Huhn läuft auf dem Hof.', en:'The chicken walks around the yard.', ru:'Курица ходит по двору.' },
    ] },
  { n:423, cat:'animals', de:'der Fisch', en:'fish', ru:'рыба', rg:'F',
    s:[
      { de:'Der Fisch schwimmt im Wasser.', en:'The fish swims in the water.', ru:'Рыба плавает в воде.' },
      { de:'Der Fisch lebt im Wasser.', en:'The fish lives in the water.', ru:'Рыба живёт в воде.' },
    ] },
  { n:424, cat:'animals', de:'die Maus', en:'mouse', ru:'мышь', rg:'F',
    s:[
      { de:'Die Maus ist sehr klein.', en:'The mouse is very small.', ru:'Мышь очень маленькая.' },
      { de:'Die Maus läuft schnell.', en:'The mouse runs fast.', ru:'Мышь быстро бегает.' },
    ] },
  { n:425, cat:'animals', de:'die Ente', en:'duck', ru:'утка', rg:'F',
    s:[
      { de:'Die Ente schwimmt im Wasser.', en:'The duck swims in the water.', ru:'Утка плавает в воде.' },
      { de:'Die Ente läuft am Wasser.', en:'The duck walks near the water.', ru:'Утка ходит возле воды.' },
    ] },
  { n:426, cat:'animals', de:'der Bär', en:'bear', ru:'медведь', rg:'M',
    s:[
      { de:'Der Bär ist sehr stark.', en:'The bear is very strong.', ru:'Медведь очень сильный.' },
      { de:'Der Bär schläft im Winter.', en:'The bear sleeps in winter.', ru:'Медведь спит зимой.' },
    ] },
  { n:427, cat:'animals', de:'der Wolf', en:'wolf', ru:'волк', rg:'M',
    s:[
      { de:'Der Wolf lebt im Wald.', en:'The wolf lives in the forest.', ru:'Волк живёт в лесу.' },
      { de:'Der Wolf läuft schnell.', en:'The wolf runs fast.', ru:'Волк быстро бегает.' },
    ] },
  { n:428, cat:'animals', de:'der Fuchs', en:'fox', ru:'лиса', rg:'F',
    s:[
      { de:'Der Fuchs lebt im Wald.', en:'The fox lives in the forest.', ru:'Лиса живёт в лесу.' },
      { de:'Der Fuchs ist schnell und schlau.', en:'The fox is fast and clever.', ru:'Лиса быстрая и умная.' },
    ] },
  { n:429, cat:'animals', de:'das Kaninchen', en:'rabbit', ru:'кролик', rg:'M',
    s:[
      { de:'Das Kaninchen frisst Gras.', en:'The rabbit eats grass.', ru:'Кролик ест траву.' },
      { de:'Das Kaninchen springt schnell.', en:'The rabbit jumps quickly.', ru:'Кролик быстро прыгает.' },
    ] },
  { n:430, cat:'animals', de:'der Elefant', en:'elephant', ru:'слон', rg:'M',
    s:[
      { de:'Der Elefant ist sehr groß.', en:'The elephant is very big.', ru:'Слон очень большой.' },
      { de:'Der Elefant ist sehr schwer.', en:'The elephant is very heavy.', ru:'Слон очень тяжёлый.' },
    ] },
  { n:431, cat:'animals', de:'der Löwe', en:'lion', ru:'лев', rg:'M',
    s:[
      { de:'Der Löwe ist sehr stark.', en:'The lion is very strong.', ru:'Лев очень сильный.' },
      { de:'Der Löwe lebt in Afrika.', en:'The lion lives in Africa.', ru:'Лев живёт в Африке.' },
    ] },
  { n:432, cat:'animals', de:'der Affe', en:'monkey', ru:'обезьяна', rg:'F',
    s:[
      { de:'Der Affe klettert gut.', en:'The monkey climbs well.', ru:'Обезьяна хорошо лазает.' },
      { de:'Der Affe frisst Obst.', en:'The monkey eats fruit.', ru:'Обезьяна ест фрукты.' },
    ] },

  /* ---------- sheets 49 to 52 ----------
     Loaded with no example sentences yet, which is deliberate: the
     words appear in the list, the gender game and the reference view
     immediately, and the games that need a sentence skip them until
     the sentences arrive rather than showing a blank. */
  { n:433, cat:'places', de:'das Krankenhaus', en:'hospital', ru:'больница', rg:'F', s:[
      { de:'Das Krankenhaus ist sehr groß.', ru:'Больница очень большая.', en:'The hospital is very big.' },
      { de:'Sie arbeitet im Krankenhaus.', ru:'Она работает в больнице.', en:'She works at the hospital.' },] },
  { n:434, cat:'home', de:'der Schlüssel', en:'key', ru:'ключ', rg:'M', s:[
      { de:'Der Schlüssel liegt auf dem Tisch.', ru:'Ключ лежит на столе.', en:'The key is on the table.' },
      { de:'Ich suche meinen Schlüssel.', ru:'Я ищу свой ключ.', en:'I am looking for my key.' },] },
  { n:435, cat:'body', de:'das Herz', en:'heart', ru:'сердце', rg:'N', s:[
      { de:'Mein Herz schlägt schnell.', ru:'Моё сердце бьётся быстро.', en:'My heart is beating fast.' },
      { de:'Ihr Herz schlägt ruhig.', ru:'Её сердце бьётся спокойно.', en:'Her heart is beating calmly.' },] },
  { n:436, cat:'home', de:'das Buch', en:'book', ru:'книга', rg:'F', s:[
      { de:'Das Buch liegt auf dem Tisch.', ru:'Книга лежит на столе.', en:'The book is on the table.' },
      { de:'Ich lese ein Buch.', ru:'Я читаю книгу.', en:'I am reading a book.' },] },
  { n:437, cat:'places', de:'die Straße', en:'street', ru:'улица', rg:'F', s:[
      { de:'Die Straße ist sehr lang.', ru:'Улица очень длинная.', en:'The street is very long.' },
      { de:'Sie geht über die Straße.', ru:'Она переходит улицу.', en:'She crosses the street.' },] },
  { n:438, cat:'places', de:'der Baum', en:'tree', ru:'дерево', rg:'N', s:[
      { de:'Der Baum ist sehr groß.', ru:'Дерево очень большое.', en:'The tree is very big.' },
      { de:'Sie steht unter dem Baum.', ru:'Она стоит под деревом.', en:'She stands under the tree.' },] },
  { n:439, cat:'home', de:'das Haus', en:'house', ru:'дом', rg:'M', s:[
      { de:'Das Haus ist sehr alt.', ru:'Дом очень старый.', en:'The house is very old.' },
      { de:'Wir gehen nach Hause.', ru:'Мы идём домой.', en:'We are going home.' },] },
  { n:440, cat:'home', de:'die Lampe', en:'lamp', ru:'лампа', rg:'F', s:[
      { de:'Die Lampe steht neben dem Bett.', ru:'Лампа стоит рядом с кроватью.', en:'The lamp is beside the bed.' },
      { de:'Ich mache die Lampe an.', ru:'Я включаю лампу.', en:'I turn on the lamp.' },] },
  { n:441, cat:'home', de:'die Waschmaschine', en:'washing machine', ru:'стиральная машина', rg:'F', s:[
      { de:'Die Waschmaschine ist in der Küche.', ru:'Стиральная машина на кухне.', en:'The washing machine is in the kitchen.' },
      { de:'Ich benutze die Waschmaschine heute.', ru:'Я сегодня пользуюсь стиральной машиной.', en:'I use the washing machine today.' },] },
  { n:442, cat:'travel', de:'reisen', en:'travel', ru:'путешествовать', s:[
      { de:'Ich reise gern mit dem Zug.', ru:'Я люблю путешествовать на поезде.', en:'I like traveling by train.' },
      { de:'Sie reist heute nach Berlin.', ru:'Она сегодня едет в Берлин.', en:'She travels to Berlin today.' },
      { de:'Ich bin mit dem Zug gereist.', ru:'Я ездила на поезде.', en:'I traveled by train.', t:'perfekt' },
      { de:'Sie ist nach Berlin gereist.', ru:'Она ездила в Берлин.', en:'She traveled to Berlin.', t:'perfekt' },
    
      { de:'Ich werde morgen mit dem Zug reisen.', ru:'Я завтра поеду на поезде.', en:'I will travel by train tomorrow.', t:'future' },
      { de:'Sie wird bald nach Berlin reisen.', ru:'Она скоро поедет в Берлин.', en:'She will travel to Berlin soon.', t:'future' },
    ] },
  { n:443, cat:'body', de:'riechen', en:'smell', ru:'нюхать', s:[
      { de:'Ich rieche das Essen.', ru:'Я чувствую запах еды.', en:'I smell the food.' },
      { de:'Sie riecht die Blumen.', ru:'Она нюхает цветы.', en:'She smells the flowers.' },] },
  { n:444, cat:'home', de:'sitzen', en:'sit', ru:'сидеть', s:[
      { de:'Ich sitze am Fenster.', ru:'Я сижу у окна.', en:'I sit by the window.' },
      { de:'Sie sitzt auf dem Bett.', ru:'Она сидит на кровати.', en:'She sits on the bed.' },] },
  { n:445, cat:'body', de:'gähnen', en:'yawn', ru:'зевать', s:[
      { de:'Ich gähne am Morgen.', ru:'Я зеваю утром.', en:'I yawn in the morning.' },
      { de:'Sie gähnt und ist müde.', ru:'Она зевает и устала.', en:'She yawns and is tired.' },
      { de:'Ich habe am Morgen gegähnt.', ru:'Я зевала утром.', en:'I yawned in the morning.', t:'perfekt' },
      { de:'Sie hat vor Müdigkeit gegähnt.', ru:'Она зевала от усталости.', en:'She yawned from tiredness.', t:'perfekt' },
    
      { de:'Ich werde am Morgen wieder gähnen.', ru:'Я утром снова буду зевать.', en:'I will yawn again in the morning.', t:'future' },
      { de:'Sie wird vor Müdigkeit gähnen.', ru:'Она будет зевать от усталости.', en:'She will yawn from tiredness.', t:'future' },
    ] },
  { n:446, cat:'body', de:'sich strecken', en:'stretch', ru:'потягиваться', s:[
      { de:'Ich strecke mich am Morgen.', ru:'Я потягиваюсь утром.', en:'I stretch in the morning.' },
      { de:'Sie streckt sich nach dem Schlaf.', ru:'Она потягивается после сна.', en:'She stretches after sleeping.' },] },
  { n:447, cat:'home', de:'aufstehen', en:'get up', ru:'вставать', s:[
      { de:'Ich stehe jeden Morgen früh auf.', ru:'Я встаю рано каждое утро.', en:'I get up early every morning.' },
      { de:'Sie steht heute spät auf.', ru:'Она сегодня встаёт поздно.', en:'She gets up late today.' },] },
  { n:448, cat:'travel', de:'gehen', en:'go', ru:'идти', s:[
      { de:'Ich gehe heute zur Arbeit.', ru:'Я сегодня иду на работу.', en:'I am going to work today.' },
      { de:'Sie geht langsam nach Hause.', ru:'Она медленно идёт домой.', en:'She walks home slowly.' },
      { de:'Ich bin gestern zur Arbeit gegangen.', ru:'Я вчера ходила на работу.', en:'I went to work yesterday.', t:'perfekt' },
      { de:'Sie ist langsam nach Hause gegangen.', ru:'Она медленно пошла домой.', en:'She went home slowly.', t:'perfekt' },
    
      { de:'Ich werde morgen zur Arbeit gehen.', ru:'Я завтра пойду на работу.', en:'I will go to work tomorrow.', t:'future' },
      { de:'Sie wird später nach Hause gehen.', ru:'Она позже пойдёт домой.', en:'She will go home later.', t:'future' },
    ] },
  { n:449, cats:['body'], pack:'verbs', imgs:[449,550],
    de:'denken', en:'think', ru:'думать',
    s:[
      { de:'Ich denke oft an dich.',
        ru:'Я часто думаю о тебе.',
        en:'I often think about you.' },
      { de:'Sie denkt an ihre Arbeit.',
        ru:'Она думает о своей работе.',
        en:'She thinks about her work.' },
      { de:'Ich habe oft an dich gedacht.',
        ru:'Я часто думала о тебе.',
        en:'I often thought about you.' },
      { de:'Sie hat an ihre Arbeit gedacht.',
        ru:'Она думала о своей работе.',
        en:'She thought about her work.' },
      { de:'Ich werde morgen an dich denken.',
        ru:'Я завтра буду думать о тебе.',
        en:'I will think about you tomorrow.' },
      { de:'Sie wird an ihre Arbeit denken.',
        ru:'Она будет думать о своей работе.',
        en:'She will think about her work.' },
      { de:'Ich denke oft an meine Familie.',
        ru:'Я часто думаю о своей семье.',
        en:'I often think about my family.' },
      { de:'Sie hat lange über die Frage nachgedacht.',
        ru:'Она долго думала над вопросом.',
        en:'She thought about the question for a long time.' }
    ] },
  { n:450, cat:'shopping', imgs:[510,591], de:'tragen', en:'carry', ru:'нести', s:[
      { de:'Ich trage eine schwere Tasche.', ru:'Я несу тяжёлую сумку.', en:'I carry a heavy bag.' },
      { de:'Sie trägt das Buch nach Hause.', ru:'Она несёт книгу домой.', en:'She carries the book home.' },] },
  { n:451, cat:'time', de:'der Schlaf', en:'sleep', ru:'сон', rg:'M', s:[
      { de:'Der Schlaf ist sehr wichtig.', ru:'Сон очень важен.', en:'Sleep is very important.' },
      { de:'Nach dem Schlaf bin ich wach.', ru:'После сна я бодра.', en:'After sleeping, I am awake.' },] },
  { n:452, cat:'time', de:'verschlafen', en:'oversleep', ru:'проспать', s:[
      { de:'Ich verschlafe manchmal am Morgen.', ru:'Я иногда просыпаю утром.', en:'I sometimes oversleep in the morning.' },
      { de:'Sie verschläft heute wieder.', ru:'Она сегодня снова просыпает.', en:'She oversleeps again today.' },] },
  { n:453, cat:'describe', de:'wach', en:'awake', ru:'бодрствующая', s:[
      { de:'Ich bin jetzt ganz wach.', ru:'Я сейчас совсем бодра.', en:'I am fully awake now.' },
      { de:'Sie ist schon wach.', ru:'Она уже проснулась.', en:'She is already awake.' },
      { de:'Ich war am Morgen schon wach.', ru:'Я утром уже не спала.', en:'I was already awake in the morning.', t:'prat' },
      { de:'Sie war die ganze Nacht wach.', ru:'Она не спала всю ночь.', en:'She was awake all night.', t:'prat' },
    
      { de:'Ich werde morgen früh wach sein.', ru:'Я завтра утром буду бодрствовать.', en:'I will be awake tomorrow morning.', t:'future' },
      { de:'Sie wird die ganze Nacht wach sein.', ru:'Она будет бодрствовать всю ночь.', en:'She will be awake all night.', t:'future' },
    ] },
  { n:454, cat:'describe', de:'erschöpft', en:'exhausted', ru:'измотанная', s:[
      { de:'Ich bin heute völlig erschöpft.', ru:'Я сегодня совершенно измотана.', en:'I am completely exhausted today.' },
      { de:'Sie ist nach der Arbeit erschöpft.', ru:'Она измотана после работы.', en:'She is exhausted after work.' },
      { de:'Ich war nach der Arbeit erschöpft.', ru:'Я была измотана после работы.', en:'I was exhausted after work.', t:'prat' },
      { de:'Sie war am Abend völlig erschöpft.', ru:'Она вечером была совершенно измотана.', en:'She was completely exhausted in the evening.', t:'prat' },
    
      { de:'Ich werde nach der Arbeit erschöpft sein.', ru:'Я буду измотана после работы.', en:'I will be exhausted after work.', t:'future' },
      { de:'Sie wird am Abend erschöpft sein.', ru:'Она вечером будет измотана.', en:'She will be exhausted in the evening.', t:'future' },
    ] },
  { n:455, cat:'describe', de:'nass', en:'wet', ru:'мокрая', s:[
      { de:'Meine Haare sind noch nass.', ru:'Мои волосы ещё мокрые.', en:'My hair is still wet.' },
      { de:'Sie ist vom Regen nass.', ru:'Она мокрая от дождя.', en:'She is wet from the rain.' },] },
  { n:456, cat:'describe', de:'heiß', en:'hot', ru:'жарко', s:[
      { de:'Mir ist heute sehr heiß.', ru:'Мне сегодня очень жарко.', en:'I am very hot today.' },
      { de:'Ihr ist in der Küche heiß.', ru:'Ей жарко на кухне.', en:'She is hot in the kitchen.' },] },
  { n:457, cat:'body', de:'jucken', en:'itch', ru:'чесаться', s:[
      { de:'Meine Hand juckt heute.', ru:'Моя рука сегодня чешется.', en:'My hand itches today.' },
      { de:'Ihr Fuß juckt wieder.', ru:'Её нога снова чешется.', en:'Her foot itches again.' },] },
  { n:458, cat:'body', de:'weh tun', en:'hurt', ru:'болеть', s:[
      { de:'Mein Rücken tut heute weh.', ru:'У меня сегодня болит спина.', en:'My back hurts today.' },
      { de:'Ihr Fuß tut weh.', ru:'У неё болит нога.', en:'Her foot hurts.' },] },
  { n:459, cat:'family', de:'lieben', en:'love', ru:'любить', s:[
      { de:'Ich liebe meine Familie.', ru:'Я люблю свою семью.', en:'I love my family.' },
      { de:'Sie liebt ihre Katze.', ru:'Она любит свою кошку.', en:'She loves her cat.' },] },
  { n:460, cat:'weather', de:'das Wetter', en:'weather', ru:'погода', rg:'F', s:[
      { de:'Das Wetter ist heute schön.', ru:'Погода сегодня хорошая.', en:'The weather is nice today.' },
      { de:'Ich mag das warme Wetter.', ru:'Мне нравится тёплая погода.', en:'I like the warm weather.' },
      { de:'Das Wetter war gestern schön.', ru:'Погода вчера была хорошая.', en:'The weather was nice yesterday.', t:'prat' },
      { de:'Das Wetter war am Morgen schlecht.', ru:'Погода утром была плохая.', en:'The weather was bad in the morning.', t:'prat' },
    
      { de:'Das Wetter wird morgen schön sein.', ru:'Погода завтра будет хорошая.', en:'The weather will be nice tomorrow.', t:'future' },
      { de:'Das Wetter wird morgen kalt sein.', ru:'Погода завтра будет холодная.', en:'The weather will be cold tomorrow.', t:'future' },
    ] },
  { n:461, cat:'weather', de:'das Sonnenlicht', en:'sunlight', ru:'солнечный свет', rg:'M', s:[
      { de:'Das Sonnenlicht kommt durchs Fenster.', ru:'Солнечный свет проходит через окно.', en:'The sunlight comes through the window.' },
      { de:'Ich mag das warme Sonnenlicht.', ru:'Мне нравится тёплый солнечный свет.', en:'I like the warm sunlight.' },] },
  { n:462, cat:'weather', de:'die Luft', en:'air', ru:'воздух', rg:'M', s:[
      { de:'Die Luft ist heute warm.', ru:'Воздух сегодня тёплый.', en:'The air is warm today.' },
      { de:'Ich brauche frische Luft.', ru:'Мне нужен свежий воздух.', en:'I need fresh air.' },] },
  { n:463, cat:'travel', de:'der Weg', en:'way', ru:'путь', rg:'M', s:[
      { de:'Der Weg ist sehr lang.', ru:'Путь очень длинный.', en:'The way is very long.' },
      { de:'Wir kennen den Weg.', ru:'Мы знаем дорогу.', en:'We know the way.' },] },
  { n:464, cat:'travel', de:'die Reise', en:'trip', ru:'поездка', rg:'F', s:[
      { de:'Die Reise ist sehr lang.', ru:'Поездка очень долгая.', en:'The trip is very long.' },
      { de:'Wir planen unsere Reise.', ru:'Мы планируем нашу поездку.', en:'We are planning our trip.' },] },
  { n:465, cat:'places', de:'der Ort', en:'place', ru:'место', rg:'N', s:[
      { de:'Der Ort ist sehr schön.', ru:'Это место очень красивое.', en:'The place is very beautiful.' },
      { de:'Ich kenne diesen Ort.', ru:'Я знаю это место.', en:'I know this place.' },] },
  { n:466, cat:'time', de:'die Zeit', en:'time', ru:'время', rg:'N', s:[
      { de:'Die Zeit geht schnell.', ru:'Время идёт быстро.', en:'Time goes quickly.' },
      { de:'Ich habe heute viel Zeit.', ru:'У меня сегодня много времени.', en:'I have plenty of time today.' },
      { de:'Ich hatte gestern wenig Zeit.', ru:'У меня вчера было мало времени.', en:'I had little time yesterday.', t:'prat' },
      { de:'Sie hatte am Morgen keine Zeit.', ru:'У неё утром не было времени.', en:'She had no time in the morning.', t:'prat' },
    
      { de:'Ich werde morgen mehr Zeit haben.', ru:'У меня завтра будет больше времени.', en:'I will have more time tomorrow.', t:'future' },
      { de:'Sie wird später keine Zeit haben.', ru:'У неё позже не будет времени.', en:'She will not have time later.', t:'future' },
    ] },
  { n:467, cat:'beauty', de:'der Duft', en:'scent', ru:'аромат', rg:'M', s:[
      { de:'Der Duft ist sehr schön.', ru:'Аромат очень приятный.', en:'The scent is very nice.' },
      { de:'Ich mag den Duft der Blumen.', ru:'Мне нравится аромат цветов.', en:'I like the scent of flowers.' },] },
  { n:468, cat:'home', de:'die Aufgabe', en:'task', ru:'задание', rg:'N', s:[
      { de:'Die Aufgabe ist nicht schwer.', ru:'Задание не трудное.', en:'The task is not difficult.' },
      { de:'Ich mache die Aufgabe jetzt.', ru:'Я сейчас выполняю задание.', en:'I am doing the task now.' },] },

  /* ---------- from the imperative lesson ----------
     Words the lesson needed that the app did not have. No pictures yet,
     so they appear in the word list and the gender game and are skipped
     by anything that wants a photograph. */
  { n:469, cat:'shopping', img:0, de:'die Quittung', en:'receipt', ru:'чек', rg:'M',
    s:[
      { de:'Die Quittung liegt auf dem Tisch.',
        ru:'Чек лежит на столе.',
        en:'The receipt is on the table.' },
      { de:'Ich nehme die Quittung aus der Tasche.',
        ru:'Я достаю чек из сумки.',
        en:'I take the receipt out of the bag.' }
    ] },
  { n:470, cat:'places', img:569, de:'das Formular', en:'form', ru:'бланк', rg:'M',
    s:[
      { de:'Das Formular liegt auf dem Schreibtisch.',
        ru:'Бланк лежит на письменном столе.',
        en:'The form is on the desk.' },
      { de:'Ich fülle das Formular am Schalter aus.',
        ru:'Я заполняю бланк у стойки.',
        en:'I fill out the form at the counter.' }
    ] },
  { n:471, cat:'places', img:570, de:'unterschreiben', en:'to sign', ru:'подписывать',
    s:[
      { de:'Ich unterschreibe das Formular mit einem Stift.',
        ru:'Я подписываю бланк ручкой.',
        en:'I sign the form with a pen.' },
      { de:'Sie unterschreibt unten auf der letzten Seite.',
        ru:'Она подписывает внизу на последней странице.',
        en:'She signs at the bottom of the last page.' }
    ] },
  { n:472, cat:'places', img:571, de:'der Ausweis', en:'ID', ru:'удостоверение', rg:'N',
    s:[
      { de:'Der Ausweis liegt in meiner Tasche.',
        ru:'Удостоверение лежит в моей сумке.',
        en:'The ID is in my bag.' },
      { de:'Ich zeige dem Mitarbeiter meinen Ausweis.',
        ru:'Я показываю сотруднику своё удостоверение.',
        en:'I show the staff member my ID.' }
    ] },
  { n:473, cat:'travel', img:572, de:'die Ampel', en:'traffic light', ru:'светофор', rg:'M',
    s:[
      { de:'Die Ampel ist jetzt rot.',
        ru:'Светофор сейчас красный.',
        en:'The traffic light is red now.' },
      { de:'Wir warten vor der Ampel auf Grün.',
        ru:'Мы ждём перед светофором зелёного света.',
        en:'We wait at the traffic light for green.' }
    ] },

  /* ------------------------------------------------------------------
     From here on: 137 words with sentences and, for now, no pictures.

     `img:0` means there is no drawing. That is a real state rather than a
     gap — sprite.js renders the German word on a plain ground instead of
     silently showing image 1, and the four picture games skip these
     entries. When a picture is drawn, set `img` to its number; nothing
     else changes and no entry moves.

     `n` is identity only. It is not the picture address any more, so
     these numbers carry no meaning beyond being unique and permanent —
     the progress key `word:<n>` depends on them never being reused.

     `cats` is an array. Several of these belong in more than one place;
     add categories freely, it costs nothing.
     ------------------------------------------------------------------ */

  { n:649, cats:['home'], pack:'more',img:0,
    de:'die Wand', en:'wall', ru:'стена', rg:'F',
    s:[
      { de:'Die Wand ist weiß.',
        ru:'Стена белая.',
        en:'The wall is white.' },
      { de:'Ich hänge ein Bild an die Wand.',
        ru:'Я вешаю картину на стену.',
        en:'I hang a picture on the wall.' }
    ] },

  { n:650, cats:['home'], pack:'more',img:0,
    de:'die Decke', en:'ceiling', ru:'потолок', rg:'M',
    s:[
      { de:'Die Decke ist sehr hoch.',
        ru:'Потолок очень высокий.',
        en:'The ceiling is very high.' },
      { de:'Eine Lampe hängt von der Decke.',
        ru:'Лампа висит на потолке.',
        en:'A lamp hangs from the ceiling.' }
    ] },

  { n:651, cats:['home'], pack:'more',img:0,
    de:'der Boden', en:'floor', ru:'пол', rg:'M',
    s:[
      { de:'Der Boden ist sauber.',
        ru:'Пол чистый.',
        en:'The floor is clean.' },
      { de:'Die Tasche steht auf dem Boden.',
        ru:'Сумка стоит на полу.',
        en:'The bag is on the floor.' }
    ] },

  { n:652, cats:['home'], pack:'more',img:0,
    de:'das Dach', en:'roof', ru:'крыша', rg:'F',
    s:[
      { de:'Das Dach ist dunkel.',
        ru:'Крыша тёмная.',
        en:'The roof is dark.' },
      { de:'Der Regen fällt auf das Dach.',
        ru:'Дождь падает на крышу.',
        en:'The rain falls on the roof.' }
    ] },

  { n:653, cats:['home'], pack:'more',img:0,
    de:'der Garten', en:'garden', ru:'сад', rg:'M',
    s:[
      { de:'Der Garten ist groß und grün.',
        ru:'Сад большой и зелёный.',
        en:'The garden is large and green.' },
      { de:'Die Kinder spielen im Garten.',
        ru:'Дети играют в саду.',
        en:'The children play in the garden.' }
    ] },

  { n:654, cats:['home'], pack:'more',img:0,
    de:'die Ecke', en:'corner', ru:'угол', rg:'M',
    s:[
      { de:'Die Ecke ist sehr dunkel.',
        ru:'Угол очень тёмный.',
        en:'The corner is very dark.' },
      { de:'Der Stuhl steht in der Ecke.',
        ru:'Стул стоит в углу.',
        en:'The chair is in the corner.' }
    ] },

  { n:655, cats:['home'], pack:'more',img:0,
    de:'der Balkon', en:'balcony', ru:'балкон', rg:'M',
    s:[
      { de:'Der Balkon ist klein.',
        ru:'Балкон маленький.',
        en:'The balcony is small.' },
      { de:'Wir trinken Kaffee auf dem Balkon.',
        ru:'Мы пьём кофе на балконе.',
        en:'We drink coffee on the balcony.' }
    ] },

  { n:656, cats:['home'], pack:'more',img:0,
    de:'der Keller', en:'cellar / basement', ru:'подвал', rg:'M',
    s:[
      { de:'Der Keller ist kalt.',
        ru:'Подвал холодный.',
        en:'The basement is cold.' },
      { de:'Die alten Kisten stehen im Keller.',
        ru:'Старые коробки стоят в подвале.',
        en:'The old boxes are in the basement.' }
    ] },

  { n:657, cats:['home'], pack:'more',img:0,
    de:'der Flur', en:'hallway', ru:'коридор', rg:'M',
    s:[
      { de:'Der Flur ist lang und schmal.',
        ru:'Коридор длинный и узкий.',
        en:'The hallway is long and narrow.' },
      { de:'Meine Schuhe stehen im Flur.',
        ru:'Мои туфли стоят в коридоре.',
        en:'My shoes are in the hallway.' }
    ] },

  { n:658, cats:['home'], pack:'more',img:0,
    de:'der Schrank', en:'cupboard / wardrobe', ru:'шкаф', rg:'M',
    s:[
      { de:'Der Schrank ist fast voll.',
        ru:'Шкаф почти полный.',
        en:'The cupboard is almost full.' },
      { de:'Ich lege die Jacke in den Schrank.',
        ru:'Я кладу куртку в шкаф.',
        en:'I put the jacket in the wardrobe.' }
    ] },

  { n:659, cats:['home'], pack:'more',img:0,
    de:'das Regal', en:'shelf', ru:'полка', rg:'F',
    s:[
      { de:'Das Regal ist aus Holz.',
        ru:'Полка деревянная.',
        en:'The shelf is made of wood.' },
      { de:'Die Bücher stehen im Regal.',
        ru:'Книги стоят на полке.',
        en:'The books are on the shelf.' }
    ] },

  { n:660, cats:['home'], pack:'more',img:0,
    de:'der Teppich', en:'rug / carpet', ru:'ковёр', rg:'M',
    s:[
      { de:'Der Teppich ist weich.',
        ru:'Ковёр мягкий.',
        en:'The rug is soft.' },
      { de:'Der Tisch steht auf dem Teppich.',
        ru:'Стол стоит на ковре.',
        en:'The table stands on the rug.' }
    ] },

  { n:661, cats:['home'], pack:'more',img:0,
    de:'der Vorhang', en:'curtain', ru:'штора', rg:'F',
    s:[
      { de:'Der Vorhang ist blau.',
        ru:'Штора синяя.',
        en:'The curtain is blue.' },
      { de:'Sie zieht den Vorhang vor das Fenster.',
        ru:'Она закрывает окно шторой.',
        en:'She pulls the curtain across the window.' }
    ] },

  { n:662, cats:['kitchen'], pack:'more',img:0,
    de:'der Ofen', en:'oven', ru:'духовка', rg:'F',
    s:[
      { de:'Der Ofen ist noch heiß.',
        ru:'Духовка ещё горячая.',
        en:'The oven is still hot.' },
      { de:'Ich stelle den Kuchen in den Ofen.',
        ru:'Я ставлю торт в духовку.',
        en:'I put the cake in the oven.' }
    ] },

  { n:663, cats:['kitchen'], pack:'more',img:0,
    de:'die Mikrowelle', en:'microwave', ru:'микроволновка', rg:'F',
    s:[
      { de:'Die Mikrowelle steht in der Küche.',
        ru:'Микроволновка стоит на кухне.',
        en:'The microwave is in the kitchen.' },
      { de:'Ich wärme die Suppe in der Mikrowelle.',
        ru:'Я разогреваю суп в микроволновке.',
        en:'I heat the soup in the microwave.' }
    ] },

  { n:664, cats:['food'], pack:'more',img:636,
    de:'der Kellner', en:'waiter', ru:'официант', rg:'M',
    s:[
      { de:'Der Kellner ist sehr freundlich.',
        ru:'Официант очень дружелюбный.',
        en:'The waiter is very friendly.' },
      { de:'Wir bestellen beim Kellner zwei Getränke.',
        ru:'Мы заказываем у официанта два напитка.',
        en:'We order two drinks from the waiter.' }
    ] },

  { n:665, cats:['food'], pack:'more',img:0,
    de:'die Zwiebel', en:'onion', ru:'луковица', rg:'F',
    s:[
      { de:'Die Zwiebel ist groß.',
        ru:'Луковица большая.',
        en:'The onion is large.' },
      { de:'Ich schneide die Zwiebel für die Suppe.',
        ru:'Я режу луковицу для супа.',
        en:'I cut the onion for the soup.' }
    ] },

  { n:666, cats:['food'], pack:'more',img:0,
    de:'der Reis', en:'rice', ru:'рис', rg:'M',
    s:[
      { de:'Der Reis ist noch warm.',
        ru:'Рис ещё тёплый.',
        en:'The rice is still warm.' },
      { de:'Wir essen Gemüse mit Reis.',
        ru:'Мы едим овощи с рисом.',
        en:'We eat vegetables with rice.' }
    ] },

  { n:667, cats:['food'], pack:'more',img:0,
    de:'die Nudeln', en:'pasta / noodles', ru:'макароны', rg:'PL',
    s:[
      { de:'Die Nudeln sind fertig.',
        ru:'Макароны готовы.',
        en:'The pasta is ready.' },
      { de:'Sie gibt Soße auf die Nudeln.',
        ru:'Она добавляет соус к макаронам.',
        en:'She puts sauce on the pasta.' }
    ] },

  { n:668, cats:['food'], pack:'more',img:0,
    de:'das Salz', en:'salt', ru:'соль', rg:'F',
    s:[
      { de:'Das Salz steht auf dem Tisch.',
        ru:'Соль стоит на столе.',
        en:'The salt is on the table.' },
      { de:'Ich gebe etwas Salz in die Suppe.',
        ru:'Я добавляю немного соли в суп.',
        en:'I add some salt to the soup.' }
    ] },

  { n:669, cats:['food'], pack:'more',img:0,
    de:'der Pfeffer', en:'pepper', ru:'перец', rg:'M',
    s:[
      { de:'Der Pfeffer steht neben dem Salz.',
        ru:'Перец стоит рядом с солью.',
        en:'The pepper is next to the salt.' },
      { de:'Er gibt etwas Pfeffer auf den Salat.',
        ru:'Он добавляет немного перца в салат.',
        en:'He puts some pepper on the salad.' }
    ] },

  { n:670, cats:['food'], pack:'more',img:0,
    de:'der Zucker', en:'sugar', ru:'сахар', rg:'M',
    s:[
      { de:'Der Zucker ist in der Dose.',
        ru:'Сахар находится в банке.',
        en:'The sugar is in the container.' },
      { de:'Sie gibt Zucker in ihren Kaffee.',
        ru:'Она добавляет сахар в свой кофе.',
        en:'She puts sugar in her coffee.' }
    ] },

  { n:671, cats:['food'], pack:'more',img:0,
    de:'die Butter', en:'butter', ru:'масло', rg:'N',
    s:[
      { de:'Die Butter ist weich.',
        ru:'Масло мягкое.',
        en:'The butter is soft.' },
      { de:'Ich streiche Butter auf das Brot.',
        ru:'Я намазываю масло на хлеб.',
        en:'I spread butter on the bread.' }
    ] },

  { n:672, cats:['food'], pack:'more',img:0,
    de:'das Öl', en:'oil', ru:'растительное масло', rg:'N',
    s:[
      { de:'Das Öl steht neben dem Herd.',
        ru:'Растительное масло стоит рядом с плитой.',
        en:'The oil is next to the stove.' },
      { de:'Sie gibt etwas Öl in die Pfanne.',
        ru:'Она наливает немного масла в сковороду.',
        en:'She puts some oil in the pan.' }
    ] },

  { n:673, cats:['food'], pack:'more',img:0,
    de:'der Kuchen', en:'cake', ru:'торт', rg:'M',
    s:[
      { de:'Der Kuchen ist sehr süß.',
        ru:'Торт очень сладкий.',
        en:'The cake is very sweet.' },
      { de:'Wir essen den Kuchen zum Kaffee.',
        ru:'Мы едим торт с кофе.',
        en:'We eat the cake with coffee.' }
    ] },

  { n:674, cats:['food'], pack:'more',img:0,
    de:'das Eis', en:'ice cream', ru:'мороженое', rg:'N',
    s:[
      { de:'Das Eis ist kalt und süß.',
        ru:'Мороженое холодное и сладкое.',
        en:'The ice cream is cold and sweet.' },
      { de:'Das Kind isst ein Eis im Park.',
        ru:'Ребёнок ест мороженое в парке.',
        en:'The child eats ice cream in the park.' }
    ] },

  { n:675, cats:['places'], pack:'more',img:0,
    de:'der Lehrer', en:'teacher', ru:'учитель', rg:'M',
    s:[
      { de:'Der Lehrer erklärt die Aufgabe.',
        ru:'Учитель объясняет задание.',
        en:'The teacher explains the task.' },
      { de:'Die Schüler sprechen mit dem Lehrer.',
        ru:'Ученики разговаривают с учителем.',
        en:'The students speak with the teacher.' }
    ] },

  { n:676, cats:['places'], pack:'more',img:632,
    de:'der Arzt', en:'doctor', ru:'врач', rg:'M',
    s:[
      { de:'Der Arzt arbeitet im Krankenhaus.',
        ru:'Врач работает в больнице.',
        en:'The doctor works in the hospital.' },
      { de:'Sie geht heute zum Arzt.',
        ru:'Она сегодня идёт к врачу.',
        en:'She is going to the doctor today.' }
    ] },

  { n:677, cats:['places'], pack:'more',img:0,
    de:'der Mitarbeiter', en:'staff member', ru:'сотрудник', rg:'M',
    s:[
      { de:'Der Mitarbeiter sitzt am Schalter.',
        ru:'Сотрудник сидит у стойки.',
        en:'The staff member is sitting at the counter.' },
      { de:'Ich frage den Mitarbeiter nach dem Formular.',
        ru:'Я спрашиваю сотрудника о бланке.',
        en:'I ask the staff member about the form.' }
    ] },

  { n:678, cats:['places'], pack:'more',img:622,
    de:'der Chef', en:'boss', ru:'начальник', rg:'M',
    s:[
      { de:'Der Chef ist heute im Büro.',
        ru:'Начальник сегодня в офисе.',
        en:'The boss is in the office today.' },
      { de:'Die Mitarbeiter sprechen mit dem Chef.',
        ru:'Сотрудники разговаривают с начальником.',
        en:'The employees speak with the boss.' }
    ] },

  { n:679, cats:['places'], pack:'more',img:623,
    de:'der Kollege', en:'colleague', ru:'коллега', rg:'M',
    s:[
      { de:'Mein Kollege arbeitet neben mir.',
        ru:'Мой коллега работает рядом со мной.',
        en:'My colleague works next to me.' },
      { de:'Ich bespreche das Problem mit meinem Kollegen.',
        ru:'Я обсуждаю проблему со своим коллегой.',
        en:'I discuss the problem with my colleague.' }
    ] },

  { n:680, cats:['places'], pack:'more',img:642,
    de:'der Polizist', en:'police officer', ru:'полицейский', rg:'M',
    s:[
      { de:'Der Polizist steht an der Straße.',
        ru:'Полицейский стоит у дороги.',
        en:'The police officer is standing by the road.' },
      { de:'Wir fragen den Polizisten nach dem Weg.',
        ru:'Мы спрашиваем полицейского о дороге.',
        en:'We ask the police officer for directions.' }
    ] },

  { n:681, cats:['places'], pack:'more',img:0,
    de:'der Markt', en:'market', ru:'рынок', rg:'M',
    s:[
      { de:'Der Markt ist heute voll.',
        ru:'Рынок сегодня полный людей.',
        en:'The market is crowded today.' },
      { de:'Wir kaufen Gemüse auf dem Markt.',
        ru:'Мы покупаем овощи на рынке.',
        en:'We buy vegetables at the market.' }
    ] },

  { n:682, cats:['places'], pack:'more',img:0,
    de:'die Kirche', en:'church', ru:'церковь', rg:'F',
    s:[
      { de:'Die Kirche ist sehr alt.',
        ru:'Церковь очень старая.',
        en:'The church is very old.' },
      { de:'Neben der Kirche steht ein großes Haus.',
        ru:'Рядом с церковью стоит большой дом.',
        en:'A large house stands next to the church.' }
    ] },

  { n:683, cats:['places'], pack:'more',img:0,
    de:'die Brücke', en:'bridge', ru:'мост', rg:'M',
    s:[
      { de:'Die Brücke ist lang.',
        ru:'Мост длинный.',
        en:'The bridge is long.' },
      { de:'Wir fahren über die Brücke.',
        ru:'Мы едем через мост.',
        en:'We drive across the bridge.' }
    ] },

  { n:684, cats:['places'], pack:'more',img:0,
    de:'der Parkplatz', en:'car park', ru:'парковка', rg:'F',
    s:[
      { de:'Der Parkplatz ist fast voll.',
        ru:'Парковка почти полная.',
        en:'The car park is almost full.' },
      { de:'Unser Auto steht auf dem Parkplatz.',
        ru:'Наша машина стоит на парковке.',
        en:'Our car is in the car park.' }
    ] },

  { n:685, cats:['places'], pack:'more',img:0,
    de:'das Museum', en:'museum', ru:'музей', rg:'M',
    s:[
      { de:'Das Museum ist heute geöffnet.',
        ru:'Музей сегодня открыт.',
        en:'The museum is open today.' },
      { de:'Wir gehen am Nachmittag ins Museum.',
        ru:'Мы идём в музей днём.',
        en:'We go to the museum in the afternoon.' }
    ] },

  { n:686, cats:['places'], pack:'more',img:0,
    de:'das Kino', en:'cinema', ru:'кинотеатр', rg:'M',
    s:[
      { de:'Das Kino ist neben dem Hotel.',
        ru:'Кинотеатр находится рядом с отелем.',
        en:'The cinema is next to the hotel.' },
      { de:'Wir gehen heute Abend ins Kino.',
        ru:'Мы идём сегодня вечером в кинотеатр.',
        en:'We are going to the cinema tonight.' }
    ] },

  { n:687, cats:['places'], pack:'more',img:0,
    de:'das Hotel', en:'hotel', ru:'отель', rg:'M',
    s:[
      { de:'Das Hotel ist groß und modern.',
        ru:'Отель большой и современный.',
        en:'The hotel is large and modern.' },
      { de:'Wir bleiben drei Nächte im Hotel.',
        ru:'Мы остаёмся в отеле на три ночи.',
        en:'We stay at the hotel for three nights.' }
    ] },

  { n:688, cats:['shopping'], pack:'more',img:640,
    de:'die Verkäuferin', en:'shop assistant (f)', ru:'продавщица', rg:'F',
    s:[
      { de:'Die Verkäuferin arbeitet an der Kasse.',
        ru:'Продавщица работает на кассе.',
        en:'The shop assistant works at the checkout.' },
      { de:'Ich frage die Verkäuferin nach meiner Größe.',
        ru:'Я спрашиваю продавщицу о моём размере.',
        en:'I ask the shop assistant about my size.' }
    ] },

  { n:689, cats:['shopping'], pack:'more',img:0,
    de:'das Hemd', en:'shirt', ru:'рубашка', rg:'F',
    s:[
      { de:'Das Hemd ist weiß.',
        ru:'Рубашка белая.',
        en:'The shirt is white.' },
      { de:'Er trägt das Hemd zur Arbeit.',
        ru:'Он носит рубашку на работу.',
        en:'He wears the shirt to work.' }
    ] },

  { n:690, cats:['shopping'], pack:'more',img:0,
    de:'der Rock', en:'skirt', ru:'юбка', rg:'F',
    s:[
      { de:'Der Rock ist schwarz.',
        ru:'Юбка чёрная.',
        en:'The skirt is black.' },
      { de:'Sie probiert den Rock im Geschäft an.',
        ru:'Она примеряет юбку в магазине.',
        en:'She tries on the skirt in the shop.' }
    ] },

  { n:691, cats:['shopping'], pack:'more',img:0,
    de:'die Socken', en:'socks', ru:'носки', rg:'PL',
    s:[
      { de:'Die Socken sind warm.',
        ru:'Носки тёплые.',
        en:'The socks are warm.' },
      { de:'Ich ziehe die Socken vor den Schuhen an.',
        ru:'Я надеваю носки перед обувью.',
        en:'I put on the socks before the shoes.' }
    ] },

  { n:692, cats:['shopping'], pack:'more',img:0,
    de:'die Mütze', en:'hat / cap', ru:'шапка', rg:'F',
    s:[
      { de:'Die Mütze ist rot.',
        ru:'Шапка красная.',
        en:'The hat is red.' },
      { de:'Sie trägt die Mütze im Winter.',
        ru:'Она носит шапку зимой.',
        en:'She wears the hat in winter.' }
    ] },

  { n:693, cats:['shopping'], pack:'more',img:0,
    de:'der Handschuh', en:'glove', ru:'перчатка', rg:'F',
    s:[
      { de:'Der Handschuh liegt auf dem Tisch.',
        ru:'Перчатка лежит на столе.',
        en:'The glove is on the table.' },
      { de:'Ich ziehe den Handschuh an meine Hand.',
        ru:'Я надеваю перчатку на руку.',
        en:'I put the glove on my hand.' }
    ] },

  { n:694, cats:['shopping'], pack:'more',img:0,
    de:'der Gürtel', en:'belt', ru:'ремень', rg:'M',
    s:[
      { de:'Der Gürtel ist aus Leder.',
        ru:'Ремень кожаный.',
        en:'The belt is made of leather.' },
      { de:'Er trägt einen Gürtel mit der Hose.',
        ru:'Он носит ремень с брюками.',
        en:'He wears a belt with the trousers.' }
    ] },

  { n:695, cats:['shopping'], pack:'more',img:0,
    de:'die Brille', en:'glasses', ru:'очки', rg:'PL',
    s:[
      { de:'Die Brille liegt neben dem Handy.',
        ru:'Очки лежат рядом с телефоном.',
        en:'The glasses are next to the phone.' },
      { de:'Sie setzt die Brille zum Lesen auf.',
        ru:'Она надевает очки для чтения.',
        en:'She puts on the glasses to read.' }
    ] },

  { n:696, cats:['beauty'], pack:'more',img:0,
    de:'der Ring', en:'ring', ru:'кольцо', rg:'N',
    s:[
      { de:'Der Ring ist aus Gold.',
        ru:'Кольцо золотое.',
        en:'The ring is made of gold.' },
      { de:'Sie trägt den Ring an der Hand.',
        ru:'Она носит кольцо на руке.',
        en:'She wears the ring on her hand.' }
    ] },

  { n:697, cats:['body'], pack:'more',img:0,
    de:'der Zahn', en:'tooth', ru:'зуб', rg:'M',
    s:[
      { de:'Der Zahn tut weh.',
        ru:'Зуб болит.',
        en:'The tooth hurts.' },
      { de:'Der Zahnarzt untersucht den Zahn.',
        ru:'Стоматолог осматривает зуб.',
        en:'The dentist examines the tooth.' }
    ] },

  { n:698, cats:['body'], pack:'more',img:0,
    de:'die Zunge', en:'tongue', ru:'язык', rg:'M',
    s:[
      { de:'Die Zunge ist im Mund.',
        ru:'Язык находится во рту.',
        en:'The tongue is in the mouth.' },
      { de:'Das Kind zeigt dem Arzt die Zunge.',
        ru:'Ребёнок показывает врачу язык.',
        en:'The child shows the doctor its tongue.' }
    ] },

  { n:699, cats:['body'], pack:'more',img:0,
    de:'das Knie', en:'knee', ru:'колено', rg:'N',
    s:[
      { de:'Mein Knie tut heute weh.',
        ru:'Моё колено сегодня болит.',
        en:'My knee hurts today.' },
      { de:'Sie legt Eis auf das Knie.',
        ru:'Она кладёт лёд на колено.',
        en:'She puts ice on her knee.' }
    ] },

  { n:700, cats:['body'], pack:'more',img:0,
    de:'die Schulter', en:'shoulder', ru:'плечо', rg:'N',
    s:[
      { de:'Meine Schulter ist etwas steif.',
        ru:'Моё плечо немного затекло.',
        en:'My shoulder is a little stiff.' },
      { de:'Er trägt die Tasche auf der Schulter.',
        ru:'Он носит сумку на плече.',
        en:'He carries the bag on his shoulder.' }
    ] },

  { n:701, cats:['body'], pack:'more',img:0,
    de:'das Fieber', en:'fever', ru:'температура', rg:'F',
    s:[
      { de:'Das Fieber ist heute niedriger.',
        ru:'Температура сегодня ниже.',
        en:'The fever is lower today.' },
      { de:'Das Kind hat seit gestern Fieber.',
        ru:'У ребёнка температура со вчерашнего дня.',
        en:'The child has had a fever since yesterday.' }
    ] },

  { n:702, cats:['body'], pack:'more',img:0,
    de:'die Medizin', en:'medicine', ru:'лекарство', rg:'N',
    s:[
      { de:'Die Medizin steht im Schrank.',
        ru:'Лекарство стоит в шкафу.',
        en:'The medicine is in the cupboard.' },
      { de:'Sie nimmt die Medizin nach dem Essen.',
        ru:'Она принимает лекарство после еды.',
        en:'She takes the medicine after eating.' }
    ] },

  { n:703, cats:['body'], pack:'more',img:0,
    de:'die Tablette', en:'tablet / pill', ru:'таблетка', rg:'F',
    s:[
      { de:'Die Tablette liegt neben dem Glas.',
        ru:'Таблетка лежит рядом со стаканом.',
        en:'The pill is next to the glass.' },
      { de:'Er nimmt die Tablette mit Wasser.',
        ru:'Он принимает таблетку с водой.',
        en:'He takes the pill with water.' }
    ] },

  { n:704, cats:['weather'], pack:'more',img:0,
    de:'die Wolke', en:'cloud', ru:'облако', rg:'N',
    s:[
      { de:'Die Wolke ist groß und grau.',
        ru:'Облако большое и серое.',
        en:'The cloud is large and gray.' },
      { de:'Die Sonne verschwindet hinter der Wolke.',
        ru:'Солнце исчезает за облаком.',
        en:'The sun disappears behind the cloud.' }
    ] },

  { n:705, cats:['weather'], pack:'more',img:0,
    de:'das Blatt', en:'leaf', ru:'лист', rg:'M',
    s:[
      { de:'Das Blatt ist gelb.',
        ru:'Лист жёлтый.',
        en:'The leaf is yellow.' },
      { de:'Ein Blatt fällt vom Baum.',
        ru:'Лист падает с дерева.',
        en:'A leaf falls from the tree.' }
    ] },

  { n:706, cats:['weather'], pack:'more',img:0,
    de:'das Gras', en:'grass', ru:'трава', rg:'F',
    s:[
      { de:'Das Gras ist noch nass.',
        ru:'Трава ещё мокрая.',
        en:'The grass is still wet.' },
      { de:'Die Kinder sitzen auf dem Gras.',
        ru:'Дети сидят на траве.',
        en:'The children sit on the grass.' }
    ] },

  { n:707, cats:['weather'], pack:'more',img:0,
    de:'der Stein', en:'stone', ru:'камень', rg:'M',
    s:[
      { de:'Der Stein ist schwer.',
        ru:'Камень тяжёлый.',
        en:'The stone is heavy.' },
      { de:'Er legt den Stein neben den Weg.',
        ru:'Он кладёт камень рядом с дорогой.',
        en:'He puts the stone beside the path.' }
    ] },

  { n:708, cats:['weather'], pack:'more',img:0,
    de:'der Berg', en:'mountain', ru:'гора', rg:'F',
    s:[
      { de:'Der Berg ist sehr hoch.',
        ru:'Гора очень высокая.',
        en:'The mountain is very high.' },
      { de:'Wir wandern auf den Berg.',
        ru:'Мы поднимаемся на гору.',
        en:'We hike up the mountain.' }
    ] },

  { n:709, cats:['weather'], pack:'more',img:0,
    de:'der Fluss', en:'river', ru:'река', rg:'F',
    s:[
      { de:'Der Fluss ist breit.',
        ru:'Река широкая.',
        en:'The river is wide.' },
      { de:'Eine Brücke führt über den Fluss.',
        ru:'Мост проходит через реку.',
        en:'A bridge crosses the river.' }
    ] },

  { n:710, cats:['weather'], pack:'more',img:0,
    de:'das Meer', en:'sea', ru:'море', rg:'N',
    s:[
      { de:'Das Meer ist heute ruhig.',
        ru:'Море сегодня спокойное.',
        en:'The sea is calm today.' },
      { de:'Wir sitzen am Meer und trinken Kaffee.',
        ru:'Мы сидим у моря и пьём кофе.',
        en:'We sit by the sea and drink coffee.' }
    ] },

  { n:711, cats:['weather'], pack:'more',img:0,
    de:'der Stern', en:'star', ru:'звезда', rg:'F',
    s:[
      { de:'Der Stern ist sehr hell.',
        ru:'Звезда очень яркая.',
        en:'The star is very bright.' },
      { de:'Wir sehen einen Stern am Himmel.',
        ru:'Мы видим звезду на небе.',
        en:'We see a star in the sky.' }
    ] },

  { n:712, cats:['travel'], pack:'more',img:645,
    de:'der Fahrer', en:'driver', ru:'водитель', rg:'M',
    s:[
      { de:'Der Fahrer wartet im Auto.',
        ru:'Водитель ждёт в машине.',
        en:'The driver is waiting in the car.' },
      { de:'Wir geben dem Fahrer die Adresse.',
        ru:'Мы даём водителю адрес.',
        en:'We give the driver the address.' }
    ] },

  { n:713, cats:['travel'], pack:'more',img:0,
    de:'die Insel', en:'island', ru:'остров', rg:'M',
    s:[
      { de:'Die Insel ist klein.',
        ru:'Остров маленький.',
        en:'The island is small.' },
      { de:'Wir fahren mit dem Boot zur Insel.',
        ru:'Мы плывём на лодке к острову.',
        en:'We travel to the island by boat.' }
    ] },

  { n:714, cats:['family'], pack:'more',img:0,
    de:'das Mädchen', en:'girl', ru:'девочка', rg:'F',
    s:[
      { de:'Das Mädchen trägt ein blaues Kleid.',
        ru:'Девочка носит синее платье.',
        en:'The girl is wearing a blue dress.' },
      { de:'Die Frau gibt dem Mädchen einen Apfel.',
        ru:'Женщина даёт девочке яблоко.',
        en:'The woman gives the girl an apple.' }
    ] },

  { n:715, cats:['family'], pack:'more',img:0,
    de:'das Baby', en:'baby', ru:'младенец', rg:'M',
    s:[
      { de:'Das Baby schläft ruhig.',
        ru:'Младенец спокойно спит.',
        en:'The baby is sleeping peacefully.' },
      { de:'Die Mutter gibt dem Baby die Flasche.',
        ru:'Мать даёт младенцу бутылочку.',
        en:'The mother gives the baby the bottle.' }
    ] },

  { n:716, cats:['family'], pack:'more',img:0,
    de:'der Nachbar', en:'neighbour', ru:'сосед', rg:'M',
    s:[
      { de:'Mein Nachbar ist sehr freundlich.',
        ru:'Мой сосед очень дружелюбный.',
        en:'My neighbour is very friendly.' },
      { de:'Ich spreche oft mit meinem Nachbarn.',
        ru:'Я часто разговариваю со своим соседом.',
        en:'I often speak with my neighbour.' }
    ] },

  { n:717, cats:['family'], pack:'more',img:0,
    de:'die Freundin', en:'friend (f)', ru:'подруга', rg:'F',
    s:[
      { de:'Meine Freundin wohnt in Berlin.',
        ru:'Моя подруга живёт в Берлине.',
        en:'My friend lives in Berlin.' },
      { de:'Ich trinke Kaffee mit meiner Freundin.',
        ru:'Я пью кофе со своей подругой.',
        en:'I drink coffee with my friend.' }
    ] },

  { n:718, cats:['questions'], pack:'more',img:0,
    de:'das Wort', en:'word', ru:'слово', rg:'N',
    s:[
      { de:'Das Wort ist neu für mich.',
        ru:'Это слово для меня новое.',
        en:'The word is new to me.' },
      { de:'Ich schreibe das Wort in mein Heft.',
        ru:'Я записываю слово в тетрадь.',
        en:'I write the word in my notebook.' }
    ] },

  { n:719, cats:['questions'], pack:'more',img:0,
    de:'die Frage', en:'question', ru:'вопрос', rg:'M',
    s:[
      { de:'Die Frage ist nicht schwer.',
        ru:'Вопрос несложный.',
        en:'The question is not difficult.' },
      { de:'Der Schüler stellt dem Lehrer eine Frage.',
        ru:'Ученик задаёт учителю вопрос.',
        en:'The student asks the teacher a question.' }
    ] },

  { n:720, cats:['questions'], pack:'more',img:0,
    de:'die Antwort', en:'answer', ru:'ответ', rg:'M',
    s:[
      { de:'Die Antwort ist richtig.',
        ru:'Ответ правильный.',
        en:'The answer is correct.' },
      { de:'Ich schreibe die Antwort unter die Frage.',
        ru:'Я пишу ответ под вопросом.',
        en:'I write the answer under the question.' }
    ] },

  { n:721, cats:['questions'], pack:'more',img:0,
    de:'der Name', en:'name', ru:'имя', rg:'N',
    s:[
      { de:'Der Name ist leicht zu merken.',
        ru:'Имя легко запомнить.',
        en:'The name is easy to remember.' },
      { de:'Sie schreibt ihren Namen auf das Formular.',
        ru:'Она пишет своё имя на бланке.',
        en:'She writes her name on the form.' }
    ] },

  { n:722, cats:['describe'], pack:'more',img:0,
    de:'der Grund', en:'reason', ru:'причина', rg:'F',
    s:[
      { de:'Der Grund ist einfach.',
        ru:'Причина простая.',
        en:'The reason is simple.' },
      { de:'Er erklärt mir den Grund für die Änderung.',
        ru:'Он объясняет мне причину изменения.',
        en:'He explains the reason for the change.' }
    ] },

  { n:723, cats:['describe'], pack:'more',img:0,
    de:'das Problem', en:'problem', ru:'проблема', rg:'F',
    s:[
      { de:'Das Problem ist nicht groß.',
        ru:'Проблема небольшая.',
        en:'The problem is not big.' },
      { de:'Wir sprechen mit dem Chef über das Problem.',
        ru:'Мы говорим с начальником о проблеме.',
        en:'We speak with the boss about the problem.' }
    ] },

  { n:724, cats:['describe'], pack:'more',img:0,
    de:'die Idee', en:'idea', ru:'идея', rg:'F',
    s:[
      { de:'Die Idee ist wirklich gut.',
        ru:'Идея действительно хорошая.',
        en:'The idea is really good.' },
      { de:'Sie erzählt ihrer Freundin von der Idee.',
        ru:'Она рассказывает подруге об идее.',
        en:'She tells her friend about the idea.' }
    ] },

  { n:725, cats:['colors'], pack:'more',img:0,
    de:'die Farbe', en:'colour', ru:'цвет', rg:'M',
    s:[
      { de:'Die Farbe ist sehr schön.',
        ru:'Цвет очень красивый.',
        en:'The colour is very beautiful.' },
      { de:'Ich mag die Farbe von diesem Kleid.',
        ru:'Мне нравится цвет этого платья.',
        en:'I like the colour of this dress.' }
    ] },

  { n:726, cats:['numbers'], pack:'more',img:0,
    de:'die Zahl', en:'number', ru:'число', rg:'N',
    s:[
      { de:'Die Zahl ist zu groß.',
        ru:'Число слишком большое.',
        en:'The number is too large.' },
      { de:'Sie schreibt die Zahl auf das Papier.',
        ru:'Она пишет число на бумаге.',
        en:'She writes the number on the paper.' }
    ] },

  { n:727, cats:['time'], pack:'more',img:0,
    de:'der Monat', en:'month', ru:'месяц', rg:'M',
    s:[
      { de:'Der Monat war sehr ruhig.',
        ru:'Месяц был очень спокойным.',
        en:'The month was very quiet.' },
      { de:'Wir bleiben einen Monat in Deutschland.',
        ru:'Мы остаёмся в Германии на месяц.',
        en:'We stay in Germany for one month.' }
    ] },

  { n:728, cats:['time'], pack:'more',img:0,
    de:'das Jahr', en:'year', ru:'год', rg:'M',
    s:[
      { de:'Das Jahr ist fast vorbei.',
        ru:'Год почти закончился.',
        en:'The year is almost over.' },
      { de:'Sie arbeitet seit einem Jahr hier.',
        ru:'Она работает здесь уже год.',
        en:'She has worked here for a year.' }
    ] },

  { n:729, cats:['food'], pack:'more',img:0,
    de:'die Erdbeere', en:'strawberry', ru:'земляника / клубника', rg:'F',
    s:[
      { de:'Die Erdbeere ist rot und süß.',
        ru:'Клубника красная и сладкая.',
        en:'The strawberry is red and sweet.' },
      { de:'Sie legt die Erdbeere auf den Kuchen.',
        ru:'Она кладёт клубнику на торт.',
        en:'She puts the strawberry on the cake.' }
    ] },

  { n:730, cats:['food'], pack:'more',img:0,
    de:'die Banane', en:'banana', ru:'банан', rg:'M',
    s:[
      { de:'Die Banane ist reif.',
        ru:'Банан спелый.',
        en:'The banana is ripe.' },
      { de:'Ich schneide die Banane in kleine Stücke.',
        ru:'Я режу банан на маленькие кусочки.',
        en:'I cut the banana into small pieces.' }
    ] },

  { n:731, cats:['food'], pack:'more',img:0,
    de:'die Hafermilch', en:'oat milk', ru:'овсяное молоко', rg:'N',
    s:[
      { de:'Die Hafermilch steht im Kühlschrank.',
        ru:'Овсяное молоко стоит в холодильнике.',
        en:'The oat milk is in the refrigerator.' },
      { de:'Sie gibt Hafermilch in ihren Kaffee.',
        ru:'Она добавляет овсяное молоко в свой кофе.',
        en:'She puts oat milk in her coffee.' }
    ] },

  { n:732, cats:['food'], pack:'more',img:515,
    de:'der Cappuccino', en:'cappuccino', ru:'капучино', rg:'N',
    s:[
      { de:'Der Cappuccino ist noch heiß.',
        ru:'Капучино ещё горячий.',
        en:'The cappuccino is still hot.' },
      { de:'Sie bestellt einen Cappuccino mit Hafermilch.',
        ru:'Она заказывает капучино с овсяным молоком.',
        en:'She orders a cappuccino with oat milk.' }
    ] },

  { n:733, cats:['food'], pack:'more',img:0,
    de:'die Orange', en:'orange', ru:'апельсин', rg:'M',
    s:[
      { de:'Die Orange ist sehr saftig.',
        ru:'Апельсин очень сочный.',
        en:'The orange is very juicy.' },
      { de:'Ich schäle die Orange in der Küche.',
        ru:'Я чищу апельсин на кухне.',
        en:'I peel the orange in the kitchen.' }
    ] },

  { n:734, cats:['food'], pack:'more',img:0,
    de:'die Traube', en:'grape', ru:'виноград', rg:'M',
    s:[
      { de:'Die Traube ist süß.',
        ru:'Виноград сладкий.',
        en:'The grape is sweet.' },
      { de:'Sie nimmt eine Traube aus der Schale.',
        ru:'Она берёт виноградину из миски.',
        en:'She takes a grape from the bowl.' }
    ] },

  { n:735, cats:['food'], pack:'more',img:0,
    de:'der Saft', en:'juice', ru:'сок', rg:'M',
    s:[
      { de:'Der Saft ist kalt.',
        ru:'Сок холодный.',
        en:'The juice is cold.' },
      { de:'Ich gieße den Saft in ein Glas.',
        ru:'Я наливаю сок в стакан.',
        en:'I pour the juice into a glass.' }
    ] },

  { n:736, cats:['food'], pack:'more',img:0,
    de:'der Joghurt', en:'yoghurt', ru:'йогурт', rg:'M',
    s:[
      { de:'Der Joghurt ist im Kühlschrank.',
        ru:'Йогурт находится в холодильнике.',
        en:'The yoghurt is in the refrigerator.' },
      { de:'Sie isst den Joghurt mit einer Banane.',
        ru:'Она ест йогурт с бананом.',
        en:'She eats the yoghurt with a banana.' }
    ] },

  { n:737, cats:['food'], pack:'more',img:0,
    de:'der Käse', en:'cheese', ru:'сыр', rg:'M',
    s:[
      { de:'Der Käse ist sehr weich.',
        ru:'Сыр очень мягкий.',
        en:'The cheese is very soft.' },
      { de:'Ich lege Käse auf das Brot.',
        ru:'Я кладу сыр на хлеб.',
        en:'I put cheese on the bread.' }
    ] },

  { n:738, cats:['food'], pack:'more',img:0,
    de:'der Honig', en:'honey', ru:'мёд', rg:'M',
    s:[
      { de:'Der Honig ist sehr süß.',
        ru:'Мёд очень сладкий.',
        en:'The honey is very sweet.' },
      { de:'Sie gibt Honig in ihren Tee.',
        ru:'Она добавляет мёд в свой чай.',
        en:'She puts honey in her tea.' }
    ] },

  { n:739, cats:['food'], pack:'more',img:0,
    de:'die Marmelade', en:'jam', ru:'варенье', rg:'N',
    s:[
      { de:'Die Marmelade ist im Glas.',
        ru:'Варенье находится в банке.',
        en:'The jam is in the jar.' },
      { de:'Ich streiche Marmelade auf das Brötchen.',
        ru:'Я намазываю варенье на булочку.',
        en:'I spread jam on the bread roll.' }
    ] },

  { n:740, cats:['food'], pack:'more',img:0,
    de:'das Brötchen', en:'bread roll', ru:'булочка', rg:'F',
    s:[
      { de:'Das Brötchen ist noch warm.',
        ru:'Булочка ещё тёплая.',
        en:'The bread roll is still warm.' },
      { de:'Sie isst ein Brötchen mit Käse.',
        ru:'Она ест булочку с сыром.',
        en:'She eats a bread roll with cheese.' }
    ] },

  { n:741, cats:['kitchen'], pack:'more',img:0,
    de:'der Eiswürfel', en:'ice cube', ru:'кубик льда', rg:'M',
    s:[
      { de:'Der Eiswürfel ist fast geschmolzen.',
        ru:'Кубик льда почти растаял.',
        en:'The ice cube has almost melted.' },
      { de:'Ich gebe einen Eiswürfel ins Glas.',
        ru:'Я кладу кубик льда в стакан.',
        en:'I put an ice cube in the glass.' }
    ] },

  { n:742, cats:['kitchen'], pack:'more',img:0,
    de:'die Serviette', en:'napkin', ru:'салфетка', rg:'F',
    s:[
      { de:'Die Serviette liegt neben dem Teller.',
        ru:'Салфетка лежит рядом с тарелкой.',
        en:'The napkin is next to the plate.' },
      { de:'Sie legt die Serviette auf den Tisch.',
        ru:'Она кладёт салфетку на стол.',
        en:'She puts the napkin on the table.' }
    ] },

  { n:743, cats:['kitchen'], pack:'more',img:0,
    de:'der Strohhalm', en:'straw', ru:'соломинка', rg:'F',
    s:[
      { de:'Der Strohhalm ist aus Papier.',
        ru:'Соломинка сделана из бумаги.',
        en:'The straw is made of paper.' },
      { de:'Das Kind trinkt Saft mit einem Strohhalm.',
        ru:'Ребёнок пьёт сок через соломинку.',
        en:'The child drinks juice through a straw.' }
    ] },

  { n:744, cats:['home'], pack:'more',img:0,
    de:'die Schere', en:'scissors', ru:'ножницы', rg:'PL',
    s:[
      { de:'Die Schere liegt auf dem Schreibtisch.',
        ru:'Ножницы лежат на письменном столе.',
        en:'The scissors are on the desk.' },
      { de:'Ich schneide das Papier mit der Schere.',
        ru:'Я режу бумагу ножницами.',
        en:'I cut the paper with the scissors.' }
    ] },

  { n:745, cats:['home'], pack:'more',img:0,
    de:'das Klebeband', en:'tape / sellotape', ru:'скотч', rg:'M',
    s:[
      { de:'Das Klebeband liegt in der Schublade.',
        ru:'Скотч лежит в ящике.',
        en:'The tape is in the drawer.' },
      { de:'Ich klebe das Papier mit Klebeband fest.',
        ru:'Я приклеиваю бумагу скотчем.',
        en:'I stick the paper down with tape.' }
    ] },

  { n:746, cats:['home'], pack:'more',img:0,
    de:'die Batterie', en:'battery', ru:'батарейка', rg:'F',
    s:[
      { de:'Die Batterie ist fast leer.',
        ru:'Батарейка почти разряжена.',
        en:'The battery is almost dead.' },
      { de:'Ich lege die Batterie in das Gerät.',
        ru:'Я вставляю батарейку в устройство.',
        en:'I put the battery into the device.' }
    ] },

  { n:747, cats:['home'], pack:'more',img:0,
    de:'das Ladekabel', en:'charging cable', ru:'зарядный кабель', rg:'M',
    s:[
      { de:'Das Ladekabel liegt neben dem Handy.',
        ru:'Зарядный кабель лежит рядом с телефоном.',
        en:'The charging cable is next to the phone.' },
      { de:'Ich verbinde das Handy mit dem Ladekabel.',
        ru:'Я подключаю телефон к зарядному кабелю.',
        en:'I connect the phone to the charging cable.' }
    ] },

  { n:748, cats:['home'], pack:'more',img:0,
    de:'die Kopfhörer', en:'headphones', ru:'наушники', rg:'PL',
    s:[
      { de:'Die Kopfhörer liegen auf dem Tisch.',
        ru:'Наушники лежат на столе.',
        en:'The headphones are on the table.' },
      { de:'Sie hört Musik mit den Kopfhörern.',
        ru:'Она слушает музыку в наушниках.',
        en:'She listens to music with the headphones.' }
    ] },

  { n:749, cats:['bath'], pack:'more',img:0,
    de:'das Pflaster', en:'plaster / bandaid', ru:'пластырь', rg:'M',
    s:[
      { de:'Das Pflaster ist in der Schublade.',
        ru:'Пластырь лежит в ящике.',
        en:'The plaster is in the drawer.' },
      { de:'Ich klebe ein Pflaster auf den Finger.',
        ru:'Я наклеиваю пластырь на палец.',
        en:'I put a plaster on my finger.' }
    ] },

  { n:750, cats:['bath'], pack:'more',img:0,
    de:'das Taschentuch', en:'tissue', ru:'салфетка / платок', rg:'M',
    s:[
      { de:'Das Taschentuch liegt in meiner Tasche.',
        ru:'Платок лежит в моей сумке.',
        en:'The tissue is in my bag.' },
      { de:'Sie nimmt ein Taschentuch aus der Packung.',
        ru:'Она достаёт салфетку из упаковки.',
        en:'She takes a tissue from the packet.' }
    ] },

  { n:751, cats:['bath'], pack:'more',img:0,
    de:'der Kamm', en:'comb', ru:'гребень', rg:'M',
    s:[
      { de:'Der Kamm liegt neben dem Spiegel.',
        ru:'Гребень лежит рядом с зеркалом.',
        en:'The comb is next to the mirror.' },
      { de:'Sie kämmt ihre Haare mit dem Kamm.',
        ru:'Она расчёсывает волосы гребнем.',
        en:'She combs her hair with the comb.' }
    ] },

  { n:752, cats:['bath'], pack:'more',img:0,
    de:'der Rasierer', en:'razor', ru:'бритва', rg:'F',
    s:[
      { de:'Der Rasierer liegt im Badezimmer.',
        ru:'Бритва лежит в ванной.',
        en:'The razor is in the bathroom.' },
      { de:'Er legt den Rasierer neben das Waschbecken.',
        ru:'Он кладёт бритву рядом с раковиной.',
        en:'He puts the razor next to the sink.' }
    ] },

  { n:753, cats:['describe'], pack:'more',img:504,
    de:'fragen', en:'ask', ru:'спрашивать / спросить',
    s:[
      { de:'Ich frage den Mitarbeiter nach der Fahrkarte.',
        ru:'Я спрашиваю сотрудника о билете.',
        en:'I ask the staff member about the ticket.' },
      { de:'Ich habe den Mitarbeiter nach der Fahrkarte gefragt.',
        ru:'Я спросил сотрудника о билете.',
        en:'I asked the staff member about the ticket.' }
    ] },

  { n:754, cats:['describe'], pack:'more',img:590,
    de:'brechen', en:'break', ru:'ломать / сломать',
    s:[
      { de:'Das Kind bricht die Tasse aus Versehen.',
        ru:'Ребёнок случайно ломает чашку.',
        en:'The child accidentally breaks the cup.' },
      { de:'Das Kind hat die Tasse aus Versehen gebrochen.',
        ru:'Ребёнок случайно сломал чашку.',
        en:'The child accidentally broke the cup.' }
    ] },

  { n:755, cats:['describe'], pack:'more',img:514,
    de:'kaufen', en:'buy', ru:'покупать / купить',
    s:[
      { de:'Ich kaufe eine neue Einkaufstasche.',
        ru:'Я покупаю новую сумку для покупок.',
        en:'I buy a new shopping bag.' },
      { de:'Ich habe eine neue Einkaufstasche gekauft.',
        ru:'Я купил новую сумку для покупок.',
        en:'I bought a new shopping bag.' }
    ] },

  { n:756, cats:['describe'], pack:'more',img:502,
    de:'fangen', en:'catch', ru:'ловить / поймать',
    s:[
      { de:'Sie fängt das fallende Handy mit beiden Händen.',
        ru:'Она ловит падающий телефон двумя руками.',
        en:'She catches the falling phone with both hands.' },
      { de:'Sie hat das fallende Handy mit beiden Händen gefangen.',
        ru:'Она поймала падающий телефон двумя руками.',
        en:'She caught the falling phone with both hands.' }
    ] },

  { n:757, cats:['describe'], pack:'more',img:0,
    de:'kommen', en:'come', ru:'приходить / прийти',
    s:[
      { de:'Der Bus kommt gleich an die Haltestelle.',
        ru:'Автобус скоро приезжает на остановку.',
        en:'The bus is coming to the stop soon.' },
      { de:'Der Bus ist gerade an die Haltestelle gekommen.',
        ru:'Автобус только что приехал на остановку.',
        en:'The bus just came to the stop.' }
    ] },

  { n:758, cats:['describe'], pack:'more',img:0,
    de:'machen', en:'do / make', ru:'делать / сделать',
    s:[
      { de:'Das Mädchen macht am Tisch die Hausaufgaben.',
        ru:'Девочка делает домашнее задание за столом.',
        en:'The girl does her homework at the table.' },
      { de:'Das Mädchen hat am Tisch die Hausaufgaben gemacht.',
        ru:'Девочка сделала домашнее задание за столом.',
        en:'The girl did her homework at the table.' }
    ] },

  { n:759, cats:['describe'], pack:'more',img:500,
    de:'fahren', en:'drive / travel', ru:'ехать / поехать',
    s:[
      { de:'Wir fahren heute mit dem Zug nach Berlin.',
        ru:'Мы сегодня едем на поезде в Берлин.',
        en:'We travel to Berlin by train today.' },
      { de:'Wir sind gestern mit dem Zug nach Berlin gefahren.',
        ru:'Мы вчера поехали на поезде в Берлин.',
        en:'We traveled to Berlin by train yesterday.' }
    ] },

  { n:760, cats:['describe'], pack:'more',img:501,
    de:'fallen', en:'fall', ru:'падать / упасть',
    s:[
      { de:'Der Apfel fällt aus meiner Hand.',
        ru:'Яблоко падает из моей руки.',
        en:'The apple falls from my hand.' },
      { de:'Der Apfel ist auf den Boden gefallen.',
        ru:'Яблоко упало на пол.',
        en:'The apple fell onto the floor.' }
    ] },

  { n:761, cats:['describe'], pack:'more',img:0,
    de:'vergessen', en:'forget', ru:'забывать / забыть',
    s:[
      { de:'Ich vergesse meinen Schlüssel auf dem Tisch.',
        ru:'Я забываю свой ключ на столе.',
        en:'I forget my key on the table.' },
      { de:'Ich habe meinen Schlüssel auf dem Tisch vergessen.',
        ru:'Я забыл свой ключ на столе.',
        en:'I forgot my key on the table.' }
    ] },

  { n:762, cats:['describe'], pack:'more',img:525,
    de:'geben', en:'give', ru:'давать / дать',
    s:[
      { de:'Sie gibt dem Kind ein Stück Brot.',
        ru:'Она даёт ребёнку кусок хлеба.',
        en:'She gives the child a piece of bread.' },
      { de:'Sie hat dem Kind ein Stück Brot gegeben.',
        ru:'Она дала ребёнку кусок хлеба.',
        en:'She gave the child a piece of bread.' }
    ] },

  { n:763, cats:['describe'], pack:'more',img:545,
    de:'wachsen', en:'grow', ru:'расти / вырасти',
    s:[
      { de:'Die Pflanze wächst schnell am Fenster.',
        ru:'Растение быстро растёт у окна.',
        en:'The plant grows quickly by the window.' },
      { de:'Die Pflanze ist im Sommer sehr schnell gewachsen.',
        ru:'Растение очень быстро выросло летом.',
        en:'The plant grew very quickly in summer.' }
    ] },

  { n:764, cats:['describe'], pack:'more',img:0,
    de:'helfen', en:'help', ru:'помогать / помочь',
    s:[
      { de:'Ich helfe meiner Freundin mit dem schweren Koffer.',
        ru:'Я помогаю подруге с тяжёлым чемоданом.',
        en:'I help my friend with the heavy suitcase.' },
      { de:'Ich habe meiner Freundin mit dem Koffer geholfen.',
        ru:'Я помог подруге с чемоданом.',
        en:'I helped my friend with the suitcase.' }
    ] },

  { n:765, cats:['describe'], pack:'more',img:0,
    de:'schlagen', en:'hit', ru:'бить / ударить',
    s:[
      { de:'Der Boxer schlägt gegen den Trainingssack.',
        ru:'Боксёр бьёт по тренировочному мешку.',
        en:'The boxer hits the training bag.' },
      { de:'Der Boxer hat gegen den Trainingssack geschlagen.',
        ru:'Боксёр ударил по тренировочному мешку.',
        en:'The boxer hit the training bag.' }
    ] },

  { n:766, cats:['describe'], pack:'more',img:0,
    de:'halten', en:'hold / stop', ru:'держать; останавливаться / остановиться',
    s:[
      { de:'Sie hält die Tasche mit beiden Händen.',
        ru:'Она держит сумку обеими руками.',
        en:'She holds the bag with both hands.' },
      { de:'Sie hat die Tasche mit beiden Händen gehalten.',
        ru:'Она держала сумку обеими руками.',
        en:'She held the bag with both hands.' }
    ] },

  { n:767, cats:['describe'], pack:'more',img:542,
    de:'verlieren', en:'lose', ru:'терять / потерять',
    s:[
      { de:'Er verliert seine Geldbörse auf der Straße.',
        ru:'Он теряет свой кошелёк на улице.',
        en:'He loses his wallet on the street.' },
      { de:'Er hat seine Geldbörse auf der Straße verloren.',
        ru:'Он потерял свой кошелёк на улице.',
        en:'He lost his wallet on the street.' }
    ] },

  { n:768, cats:['describe'], pack:'more',img:523,
    de:'messen', en:'measure', ru:'измерять / измерить',
    s:[
      { de:'Sie misst das Wasser mit einem Messbecher.',
        ru:'Она измеряет воду мерным стаканом.',
        en:'She measures the water with a measuring cup.' },
      { de:'Sie hat das Wasser mit einem Messbecher gemessen.',
        ru:'Она измерила воду мерным стаканом.',
        en:'She measured the water with a measuring cup.' }
    ] },

  { n:769, cats:['describe'], pack:'more',img:506,
    de:'treffen', en:'meet', ru:'встречать / встретить; встречаться / встретиться',
    s:[
      { de:'Ich treffe meine Freundin heute im Park.',
        ru:'Я встречаюсь с подругой сегодня в парке.',
        en:'I meet my friend in the park today.' },
      { de:'Ich habe meine Freundin gestern im Park getroffen.',
        ru:'Я встретился с подругой вчера в парке.',
        en:'I met my friend in the park yesterday.' }
    ] },

  { n:770, only:'lesson', cats:['describe', 'kap17'], pack:'more',imgs:[505,586],
    de:'bestellen', en:'order', ru:'заказывать / заказать',
    s:[
      { de:'Sie bestellt einen Kaffee beim Kellner.',
        ru:'Она заказывает кофе у официанта.',
        en:'She orders a coffee from the waiter.' },
      { de:'Sie hat einen Kaffee beim Kellner bestellt.',
        ru:'Она заказала кофе у официанта.',
        en:'She ordered a coffee from the waiter.' }
    ] },

  { n:771, cats:['describe'], pack:'more',imgs:[507,588],
    de:'bezahlen', en:'pay', ru:'платить / заплатить',
    s:[
      { de:'Ich bezahle die Rechnung mit meiner Karte.',
        ru:'Я оплачиваю счёт своей картой.',
        en:'I pay the bill with my card.' },
      { de:'Ich habe die Rechnung mit meiner Karte bezahlt.',
        ru:'Я оплатил счёт своей картой.',
        en:'I paid the bill with my card.' }
    ] },

  { n:772, cats:['describe'], pack:'more',img:536,
    de:'spielen', en:'play', ru:'играть / поиграть',
    s:[
      { de:'Die Kinder spielen zusammen mit den Bausteinen.',
        ru:'Дети вместе играют с кубиками.',
        en:'The children play together with the blocks.' },
      { de:'Die Kinder haben zusammen mit den Bausteinen gespielt.',
        ru:'Дети вместе поиграли с кубиками.',
        en:'The children played together with the blocks.' }
    ] },

  { n:773, cats:['describe'], pack:'more',img:519,
    de:'laufen', en:'run / walk', ru:'бегать / бежать; ходить',
    s:[
      { de:'Sie läuft jeden Morgen im Park.',
        ru:'Она бегает каждое утро в парке.',
        en:'She runs in the park every morning.' },
      { de:'Sie ist gestern eine Stunde im Park gelaufen.',
        ru:'Она вчера бегала в парке один час.',
        en:'She ran in the park for an hour yesterday.' }
    ] },

  { n:774, cats:['describe'], pack:'more', imgs:[539],
    de:'treten', en:'step / kick', ru:'ступать / ступить; пинать / пнуть',
    s:[
      { de:'Er tritt vorsichtig auf die nächste Stufe.',
        ru:'Он осторожно ступает на следующую ступеньку.',
        en:'He carefully steps onto the next step.' },
      { de:'Er hat vorsichtig auf die nächste Stufe getreten.',
        ru:'Он осторожно ступил на следующую ступеньку.',
        en:'He carefully stepped onto the next step.' },
      { de:'Sie tritt vorsichtig auf den nassen Boden.',
        ru:'Она осторожно ступает на мокрый пол.',
        en:'She steps carefully onto the wet floor.' },
      { de:'Er trat gegen den Ball.',
        ru:'Он пнул мяч.',
        en:'He kicked the ball.' }
    ] },

  { n:775, cats:['describe'], pack:'more',img:0,
    de:'nehmen', en:'take', ru:'брать / взять',
    s:[
      { de:'Ich nehme einen Apfel aus der Schale.',
        ru:'Я беру яблоко из миски.',
        en:'I take an apple from the bowl.' },
      { de:'Ich habe einen Apfel aus der Schale genommen.',
        ru:'Я взял яблоко из миски.',
        en:'I took an apple from the bowl.' }
    ] },

  { n:776, cats:['describe'], pack:'more',img:551,
    de:'werfen', en:'throw', ru:'бросать / бросить',
    s:[
      { de:'Er wirft den Müll in den Mülleimer.',
        ru:'Он бросает мусор в мусорное ведро.',
        en:'He throws the rubbish into the bin.' },
      { de:'Er hat den Müll in den Mülleimer geworfen.',
        ru:'Он бросил мусор в мусорное ведро.',
        en:'He threw the rubbish into the bin.' }
    ] },

  { n:777, cats:['describe'], pack:'more',img:587,
    de:'besuchen', en:'visit', ru:'посещать / посетить',
    s:[
      { de:'Wir besuchen unsere Freundin am Wochenende.',
        ru:'Мы навещаем нашу подругу на выходных.',
        en:'We visit our friend on the weekend.' },
      { de:'Wir haben unsere Freundin am Wochenende besucht.',
        ru:'Мы навестили нашу подругу на выходных.',
        en:'We visited our friend on the weekend.' }
    ] },

  { n:778, cats:['describe'], pack:'more',img:547,
    de:'waschen', en:'wash', ru:'мыть / вымыть',
    s:[
      { de:'Ich wasche den Teller im Spülbecken.',
        ru:'Я мою тарелку в раковине.',
        en:'I wash the plate in the sink.' },
      { de:'Ich habe den Teller im Spülbecken gewaschen.',
        ru:'Я вымыл тарелку в раковине.',
        en:'I washed the plate in the sink.' }
    ] },

  { n:779, cats:['describe'], pack:'more', imgs:[517],
    de:'gewinnen', en:'win', ru:'выигрывать / выиграть',
    s:[
      { de:'Sie gewinnt das Spiel auf ihrem Handy.',
        ru:'Она выигрывает игру на своём телефоне.',
        en:'She wins the game on her phone.' },
      { de:'Sie hat das Spiel auf ihrem Handy gewonnen.',
        ru:'Она выиграла игру на своём телефоне.',
        en:'She won the game on her phone.' },
      { de:'Unsere Mannschaft gewinnt das Spiel.',
        ru:'Наша команда выигрывает игру.',
        en:'Our team wins the game.' },
      { de:'Sie hat den ersten Preis gewonnen.',
        ru:'Она выиграла первый приз.',
        en:'She won first prize.' }
    ] },

  { n:780, cats:['describe'], pack:'more',imgs:[549,582],
    de:'arbeiten', en:'work', ru:'работать',
    s:[
      { de:'Er arbeitet jeden Tag am Schreibtisch.',
        ru:'Он каждый день работает за письменным столом.',
        en:'He works at the desk every day.' },
      { de:'Er hat gestern lange am Schreibtisch gearbeitet.',
        ru:'Он вчера долго работал за письменным столом.',
        en:'He worked at the desk for a long time yesterday.' }
    ] },

  /* ------------------------------------------------------------------
     Sheets 65-72. The words on the pictures Steven drew, at the numbers
     the cells actually occupy — so `img` is the same as `n` here and is
     written out anyway, because the two mean different things now and
     leaving one implicit is how they drift apart.

     `pack:'jobs'` for the professions, and each profession's headword is
     the gender DRAWN in that cell: #631 is die Lehrerin because the
     picture is a woman at a chalkboard. `alt` holds the other form. That
     matters more than it looks — Russian says врач, юрист, студент for
     either gender, so a Russian speaker under-produces the German
     feminine, and seeing a woman labelled die Anwältin is the correction.
     ------------------------------------------------------------------ */

  { n:577, cats:['home'], pack:'verbs', imgs:[479,511,577],
    de:'schreiben', en:'to write', ru:'писать / написать',
    s:[
      { de:'Ich schreibe einen Brief an meine Mutter.',
        ru:'Я пишу письмо маме.',
        en:'I am writing a letter to my mother.' },
      { de:'Er hat die Adresse auf das Formular geschrieben.',
        ru:'Он написал адрес на бланке.',
        en:'He wrote the address on the form.' }
    ] },

  { n:578, cats:['travel'], pack:'verbs', img:578,
    de:'abfahren', en:'to depart', ru:'отправляться / отправиться',
    s:[
      { de:'Der Zug fährt um acht Uhr ab.',
        ru:'Поезд отправляется в восемь часов.',
        en:'The train departs at eight o\'clock.' },
      { de:'Wir sind gestern früh vom Bahnhof abgefahren.',
        ru:'Мы вчера рано утром отправились с вокзала.',
        en:'We departed from the station early yesterday morning.' }
    ] },

  { n:579, cats:['home'], pack:'verbs', imgs:[555,579],
    de:'anrufen', en:'to call', ru:'звонить / позвонить',
    s:[
      { de:'Ich rufe meine Freundin heute Abend an.',
        ru:'Я позвоню своей подруге сегодня вечером.',
        en:'I will call my friend this evening.' },
      { de:'Er hat den Arzt am Morgen angerufen.',
        ru:'Он позвонил врачу утром.',
        en:'He called the doctor in the morning.' }
    ] },

  { n:580, cats:['home'], pack:'verbs', img:580,
    de:'ansehen', en:'to watch', ru:'смотреть / посмотреть',
    s:[
      { de:'Wir sehen uns heute Abend einen Film an.',
        ru:'Мы сегодня вечером смотрим фильм.',
        en:'We are watching a movie this evening.' },
      { de:'Sie hat sich die Fotos auf ihrem Handy angesehen.',
        ru:'Она посмотрела фотографии на своём телефоне.',
        en:'She looked at the photos on her phone.' }
    ] },

  { n:581, cats:['shopping'], pack:'verbs', img:581,
    de:'anziehen', en:'to put on', ru:'надевать / надеть',
    s:[
      { de:'Sie zieht ihre warme Jacke an.',
        ru:'Она надевает свою тёплую куртку.',
        en:'She is putting on her warm jacket.' },
      { de:'Ich habe meine neuen Schuhe angezogen.',
        ru:'Я надел свои новые туфли.',
        en:'I put on my new shoes.' }
    ] },

  { n:584, cats:['travel'], pack:'verbs', img:584,
    de:'aussteigen', en:'to get off', ru:'выходить / выйти',
    s:[
      { de:'Wir steigen an der nächsten Haltestelle aus.',
        ru:'Мы выходим на следующей остановке.',
        en:'We are getting off at the next stop.' },
      { de:'Sie ist vor dem Bahnhof aus dem Taxi ausgestiegen.',
        ru:'Она вышла из такси перед вокзалом.',
        en:'She got out of the taxi in front of the station.' }
    ] },

  { n:585, cats:['shopping'], pack:'verbs', img:585,
    de:'auswählen', en:'to choose', ru:'выбирать / выбрать',
    s:[
      { de:'Du kannst ein Bild auswählen.',
        ru:'Ты можешь выбрать картинку.',
        en:'You can choose a picture.' },
      { de:'Sie hat das blaue Kleid ausgewählt.',
        ru:'Она выбрала синее платье.',
        en:'She chose the blue dress.' }
    ] },

  { n:592, only:'lesson', cats:['describe', 'kap17'], pack:'verbs', img:592,
    de:'auf jeden Fall', en:'definitely', ru:'обязательно',
    s:[
      { de:'Ich komme auf jeden Fall morgen.',
        ru:'Я обязательно приду завтра.',
        en:'I will definitely come tomorrow.' },
      { de:'Dieses Restaurant möchte ich auf jeden Fall besuchen.',
        ru:'Я обязательно хочу посетить этот ресторан.',
        en:'I definitely want to visit this restaurant.' }
    ] },

  { n:593, cats:['travel'], pack:'verbs', img:593,
    de:'einchecken', en:'to check in', ru:'регистрироваться',
    s:[
      { de:'Wir checken am Flughafen ein.',
        ru:'Мы регистрируемся в аэропорту.',
        en:'We are checking in at the airport.' },
      { de:'Sie hat zwei Stunden vor dem Flug eingecheckt.',
        ru:'Она зарегистрировалась за два часа до рейса.',
        en:'She checked in two hours before the flight.' }
    ] },

  { n:594, cats:['home'], pack:'verbs', img:594,
    de:'ausschalten', en:'to switch off', ru:'выключать / выключить',
    s:[
      { de:'Bitte schalte das Licht aus.',
        ru:'Пожалуйста, выключи свет.',
        en:'Please switch off the light.' },
      { de:'Er hat den Fernseher vor dem Schlafengehen ausgeschaltet.',
        ru:'Он выключил телевизор перед сном.',
        en:'He switched off the television before going to bed.' }
    ] },

  { n:595, cats:['shopping'], pack:'verbs', img:595,
    de:'aussuchen', en:'to select', ru:'выбирать / выбрать',
    s:[
      { de:'Ich suche mir einen warmen Pullover aus.',
        ru:'Я выбираю себе тёплый свитер.',
        en:'I am selecting a warm sweater for myself.' },
      { de:'Sie hat sich ein Geschenk für ihre Mutter ausgesucht.',
        ru:'Она выбрала подарок для своей мамы.',
        en:'She selected a gift for her mother.' }
    ] },

  { n:596, cats:['travel'], pack:'verbs', imgs:[573,596],
    de:'ankommen', en:'to arrive', ru:'прибывать / прибыть',
    s:[
      { de:'Der Bus kommt um zehn Uhr an.',
        ru:'Автобус прибывает в десять часов.',
        en:'The bus arrives at ten o\'clock.' },
      { de:'Wir sind gestern spät zu Hause angekommen.',
        ru:'Мы вчера поздно приехали домой.',
        en:'We arrived home late yesterday.' }
    ] },

  { n:598, cats:['describe'], pack:'verbs', imgs:[508,598],
    de:'gemütlich', en:'cosy', ru:'уютный',
    s:[
      { de:'Das Wohnzimmer ist klein, aber gemütlich.',
        ru:'Гостиная маленькая, но уютная.',
        en:'The living room is small but cosy.' },
      { de:'Wir sitzen in einem gemütlichen Café.',
        ru:'Мы сидим в уютном кафе.',
        en:'We are sitting in a cosy café.' }
    ] },

  { n:599, cats:['travel'], pack:'verbs', imgs:[509,599],
    de:'wandern', en:'to hike', ru:'ходить в поход',
    s:[
      { de:'Wir wandern gern in den Bergen.',
        ru:'Мы любим ходить в поход в горы.',
        en:'We like to hike in the mountains.' },
      { de:'Letztes Wochenende sind wir fünf Stunden gewandert.',
        ru:'В прошлые выходные мы ходили в поход пять часов.',
        en:'Last weekend we hiked for five hours.' }
    ] },

  { n:600, cats:['travel'], pack:'verbs', img:600,
    de:'der Kofferraum', en:'boot / trunk', ru:'багажник',
    s:[
      { de:'Die Taschen liegen im Kofferraum.',
        ru:'Сумки лежат в багажнике.',
        en:'The bags are in the trunk.' },
      { de:'Er legt den Koffer in den Kofferraum.',
        ru:'Он кладёт чемодан в багажник.',
        en:'He puts the suitcase in the trunk.' }
    ] },

  { n:601, cats:['travel'], pack:'verbs', img:601,
    de:'der Flughafen', en:'airport', ru:'аэропорт',
    s:[
      { de:'Der Flughafen ist zwanzig Kilometer von der Stadt entfernt.',
        ru:'Аэропорт находится в двадцати километрах от города.',
        en:'The airport is twenty kilometers from the city.' },
      { de:'Wir fahren morgen früh zum Flughafen.',
        ru:'Мы едем в аэропорт завтра рано утром.',
        en:'We are going to the airport early tomorrow morning.' }
    ] },

  { n:602, cats:['home'], pack:'verbs', img:602,
    de:'einschalten', en:'to switch on', ru:'включать / включить',
    s:[
      { de:'Bitte schalte das Licht ein.',
        ru:'Пожалуйста, включи свет.',
        en:'Please switch on the light.' },
      { de:'Sie hat den Fernseher nach dem Abendessen eingeschaltet.',
        ru:'Она включила телевизор после ужина.',
        en:'She switched on the television after dinner.' }
    ] },

  { n:604, cats:['jobs'], pack:'jobs', img:604,
    de:'der Klempner', en:'plumber', ru:'сантехник', alt:'die Klempnerin',
    s:[
      { de:'Der Klempner repariert das Rohr in der Küche.',
        ru:'Сантехник ремонтирует трубу на кухне.',
        en:'The plumber is repairing the pipe in the kitchen.' },
      { de:'Wir haben den Klempner wegen des kaputten Wasserhahns angerufen.',
        ru:'Мы вызвали сантехника из-за сломанного крана.',
        en:'We called the plumber because of the broken faucet.' }
    ] },

  { n:605, cats:['jobs'], pack:'jobs', img:605,
    de:'der Bauarbeiter', en:'builder', ru:'строитель', alt:'die Bauarbeiterin',
    s:[
      { de:'Der Bauarbeiter arbeitet auf einer großen Baustelle.',
        ru:'Строитель работает на большой стройке.',
        en:'The builder works on a large construction site.' },
      { de:'Der Bauarbeiter trägt schwere Materialien.',
        ru:'Строитель носит тяжёлые материалы.',
        en:'The builder carries heavy materials.' }
    ] },

  { n:606, cats:['jobs'], pack:'jobs', img:606,
    de:'die Gärtnerin', en:'gardener', ru:'садовница', alt:'der Gärtner',
    s:[
      { de:'Die Gärtnerin pflanzt Blumen vor dem Haus.',
        ru:'Садовница сажает цветы перед домом.',
        en:'The gardener is planting flowers in front of the house.' },
      { de:'Die Gärtnerin arbeitet jeden Morgen im Garten.',
        ru:'Садовница работает в саду каждое утро.',
        en:'The gardener works in the garden every morning.' }
    ] },

  { n:607, cats:['jobs'], pack:'jobs', img:607,
    de:'der Bauer', en:'farmer', ru:'фермер', alt:'die Bäuerin',
    s:[
      { de:'Der Bauer arbeitet jeden Tag auf seinem Hof.',
        ru:'Фермер каждый день работает на своей ферме.',
        en:'The farmer works on his farm every day.' },
      { de:'Der Bauer verkauft frisches Gemüse auf dem Markt.',
        ru:'Фермер продаёт свежие овощи на рынке.',
        en:'The farmer sells fresh vegetables at the market.' }
    ] },

  { n:608, cats:['jobs'], pack:'jobs', img:608,
    de:'die Reinigungskraft', en:'cleaner', ru:'уборщица', alt:'die Reinigungskraft',
    s:[
      { de:'Die Reinigungskraft putzt jeden Morgen die Büros.',
        ru:'Уборщица каждое утро убирает офисы.',
        en:'The cleaner cleans the offices every morning.' },
      { de:'Wir haben die Reinigungskraft um Hilfe gebeten.',
        ru:'Мы попросили уборщицу о помощи.',
        en:'We asked the cleaner for help.' }
    ] },

  { n:609, only:'lesson', cats:['jobs', 'kap17'], pack:'jobs', img:609,
    de:'die Schauspielerin', en:'actress', ru:'актриса', alt:'der Schauspieler',
    s:[
      { de:'Die Schauspielerin spielt in einem neuen Film.',
        ru:'Актриса играет в новом фильме.',
        en:'The actress is appearing in a new movie.' },
      { de:'Viele Leute haben die Schauspielerin im Theater gesehen.',
        ru:'Многие люди видели актрису в театре.',
        en:'Many people saw the actress at the theater.' }
    ] },

  { n:610, cats:['jobs'], pack:'jobs', img:610,
    de:'der Musiker', en:'musician', ru:'музыкант', alt:'die Musikerin',
    s:[
      { de:'Der Musiker spielt jeden Abend Gitarre.',
        ru:'Музыкант каждый вечер играет на гитаре.',
        en:'The musician plays the guitar every evening.' },
      { de:'Wir hören dem Musiker im Park zu.',
        ru:'Мы слушаем музыканта в парке.',
        en:'We are listening to the musician in the park.' }
    ] },

  { n:611, cats:['jobs'], pack:'jobs', img:611,
    de:'die Malerin', en:'painter (artist)', ru:'художница', alt:'der Maler',
    s:[
      { de:'Die Malerin malt ein Bild vom Meer.',
        ru:'Художница рисует картину моря.',
        en:'The painter is painting a picture of the sea.' },
      { de:'Die Malerin verkauft ihre Bilder in einer kleinen Galerie.',
        ru:'Художница продаёт свои картины в маленькой галерее.',
        en:'The painter sells her paintings in a small gallery.' }
    ] },

  { n:612, cats:['jobs'], pack:'jobs', img:612,
    de:'der Fotograf', en:'photographer', ru:'фотограф', alt:'die Fotografin',
    s:[
      { de:'Der Fotograf macht Fotos von der Familie.',
        ru:'Фотограф фотографирует семью.',
        en:'The photographer is taking pictures of the family.' },
      { de:'Wir haben den Fotografen für die Hochzeit gebucht.',
        ru:'Мы заказали фотографа на свадьбу.',
        en:'We booked the photographer for the wedding.' }
    ] },

  { n:613, cats:['jobs'], pack:'jobs', img:613,
    de:'der Schriftsteller', en:'writer', ru:'писатель', alt:'die Schriftstellerin',
    s:[
      { de:'Der Schriftsteller schreibt einen neuen Roman.',
        ru:'Писатель пишет новый роман.',
        en:'The writer is writing a new novel.' },
      { de:'Ich habe gestern ein Buch von diesem Schriftsteller gekauft.',
        ru:'Я вчера купил книгу этого писателя.',
        en:'I bought a book by this writer yesterday.' }
    ] },

  { n:614, cats:['jobs'], pack:'jobs', img:614,
    de:'die Journalistin', en:'journalist', ru:'журналистка', alt:'der Journalist',
    s:[
      { de:'Die Journalistin schreibt einen Artikel für die Zeitung.',
        ru:'Журналистка пишет статью для газеты.',
        en:'The journalist is writing an article for the newspaper.' },
      { de:'Die Journalistin hat den Politiker gestern interviewt.',
        ru:'Журналистка вчера взяла интервью у политика.',
        en:'The journalist interviewed the politician yesterday.' }
    ] },

  { n:615, cats:['jobs'], pack:'jobs', img:615,
    de:'der Ingenieur', en:'engineer', ru:'инженер', alt:'die Ingenieurin',
    s:[
      { de:'Der Ingenieur plant eine neue Brücke.',
        ru:'Инженер проектирует новый мост.',
        en:'The engineer is designing a new bridge.' },
      { de:'Die Firma sucht einen erfahrenen Ingenieur.',
        ru:'Компания ищет опытного инженера.',
        en:'The company is looking for an experienced engineer.' }
    ] },

  { n:616, cats:['jobs'], pack:'jobs', img:616,
    de:'die Anwältin', en:'lawyer', ru:'адвокат', alt:'der Anwalt',
    s:[
      { de:'Die Anwältin spricht mit ihrer Klientin.',
        ru:'Адвокат разговаривает со своей клиенткой.',
        en:'The lawyer is speaking with her client.' },
      { de:'Wir haben die Anwältin um Rat gebeten.',
        ru:'Мы попросили адвоката дать нам совет.',
        en:'We asked the lawyer for advice.' }
    ] },

  { n:617, cats:['jobs'], pack:'jobs', img:617,
    de:'der Programmierer', en:'programmer', ru:'программист', alt:'die Programmiererin',
    s:[
      { de:'Der Programmierer arbeitet an einer neuen App.',
        ru:'Программист работает над новым приложением.',
        en:'The programmer is working on a new app.' },
      { de:'Der Programmierer hat den Fehler im Programm gefunden.',
        ru:'Программист нашёл ошибку в программе.',
        en:'The programmer found the error in the program.' }
    ] },

  { n:618, cats:['jobs'], pack:'jobs', img:618,
    de:'die Studentin', en:'student', ru:'студентка', alt:'der Student',
    s:[
      { de:'Die Studentin lernt jeden Abend Deutsch.',
        ru:'Студентка каждый вечер учит немецкий язык.',
        en:'The student studies German every evening.' },
      { de:'Die Professorin hilft der Studentin bei der Aufgabe.',
        ru:'Преподавательница помогает студентке с заданием.',
        en:'The professor is helping the student with the assignment.' }
    ] },

  { n:619, cats:['jobs'], pack:'jobs', img:619,
    de:'der Taxifahrer', en:'taxi driver', ru:'таксист', alt:'die Taxifahrerin',
    s:[
      { de:'Der Taxifahrer wartet vor dem Hotel.',
        ru:'Таксист ждёт перед отелем.',
        en:'The taxi driver is waiting in front of the hotel.' },
      { de:'Ich habe dem Taxifahrer die Adresse gezeigt.',
        ru:'Я показал таксисту адрес.',
        en:'I showed the taxi driver the address.' }
    ] },

  { n:620, cats:['jobs'], pack:'jobs', img:620,
    de:'die Buchhalterin', en:'accountant', ru:'бухгалтер', alt:'der Buchhalter',
    s:[
      { de:'Die Buchhalterin arbeitet im Büro.',
        ru:'Бухгалтер работает в офисе.',
        en:'The accountant works in an office.' },
      { de:'Die Buchhalterin überprüft jeden Morgen die Rechnungen.',
        ru:'Бухгалтер каждое утро проверяет счета.',
        en:'The accountant checks the invoices every morning.' }
    ] },

  { n:621, cats:['jobs'], pack:'jobs', img:621,
    de:'der Architekt', en:'architect', ru:'архитектор', alt:'die Architektin',
    s:[
      { de:'Der Architekt zeichnet den Plan für das neue Haus.',
        ru:'Архитектор рисует план нового дома.',
        en:'The architect is drawing the plan for the new house.' },
      { de:'Wir sprechen morgen mit dem Architekten.',
        ru:'Мы завтра поговорим с архитектором.',
        en:'We will speak with the architect tomorrow.' }
    ] },

  { n:624, only:'lesson', cats:['food', 'kap17'], pack:'verbs', img:624,
    de:'die Bestellung', en:'the order', ru:'заказ',
    s:[
      { de:'Die Bestellung ist noch nicht fertig.',
        ru:'Заказ ещё не готов.',
        en:'The order is not ready yet.' },
      { de:'Der Kellner bringt unsere Bestellung an den Tisch.',
        ru:'Официант приносит наш заказ к столу.',
        en:'The waiter brings our order to the table.' }
    ] },

  { n:625, only:'lesson', cats:['shopping', 'kap16'], pack:'verbs', img:625,
    de:'bekommen', en:'to receive', ru:'получать / получить',
    s:[
      { de:'Ich bekomme heute ein Paket.',
        ru:'Я сегодня получу посылку.',
        en:'I am receiving a package today.' },
      { de:'Sie hat eine Nachricht von ihrer Freundin bekommen.',
        ru:'Она получила сообщение от своей подруги.',
        en:'She received a message from her friend.' }
    ] },

  { n:626, cats:['food'], pack:'verbs', img:626,
    de:'die Speisekarte', en:'menu', ru:'меню',
    s:[
      { de:'Die Speisekarte liegt auf dem Tisch.',
        ru:'Меню лежит на столе.',
        en:'The menu is on the table.' },
      { de:'Ich suche auf der Speisekarte eine Suppe aus.',
        ru:'Я выбираю суп в меню.',
        en:'I choose a soup from the menu.' }
    ] },

  { n:627, only:'lesson', cats:['shopping', 'kap17'], pack:'verbs', img:627,
    de:'verkaufen', en:'to sell', ru:'продавать / продать',
    s:[
      { de:'Das Geschäft verkauft Kleidung und Schuhe.',
        ru:'Магазин продаёт одежду и обувь.',
        en:'The shop sells clothes and shoes.' },
      { de:'Er hat sein altes Fahrrad verkauft.',
        ru:'Он продал свой старый велосипед.',
        en:'He sold his old bicycle.' }
    ] },

  { n:628, cats:['body'], pack:'verbs', img:628,
    de:'die Waage', en:'scales', ru:'весы',
    s:[
      { de:'Die Waage steht im Badezimmer.',
        ru:'Весы стоят в ванной комнате.',
        en:'The scales are in the bathroom.' },
      { de:'Sie stellt sich am Morgen auf die Waage.',
        ru:'Она утром встаёт на весы.',
        en:'She steps onto the scales in the morning.' }
    ] },

  { n:629, only:'lesson', cats:['body', 'kap18'], pack:'verbs', img:629,
    de:'die Krankheit', en:'illness', ru:'болезнь',
    s:[
      { de:'Die Krankheit dauert schon eine Woche.',
        ru:'Болезнь длится уже неделю.',
        en:'The illness has lasted for a week already.' },
      { de:'Nach der Krankheit fühlt er sich wieder besser.',
        ru:'После болезни он снова чувствует себя лучше.',
        en:'After the illness, he feels better again.' }
    ] },

  { n:630, only:'lesson', cats:['body', 'kap18'], pack:'verbs', img:630,
    de:'die Bewegung', en:'movement / exercise', ru:'движение',
    s:[
      { de:'Bewegung ist wichtig für den Körper.',
        ru:'Движение важно для организма.',
        en:'Exercise is important for the body.' },
      { de:'Sie braucht nach einem langen Arbeitstag etwas Bewegung.',
        ru:'После долгого рабочего дня ей нужно немного подвигаться.',
        en:'She needs some exercise after a long workday.' }
    ] },

  { n:631, cats:['jobs'], pack:'jobs', img:631,
    de:'die Lehrerin', en:'teacher', ru:'учительница', alt:'der Lehrer',
    s:[
      { de:'Die Lehrerin erklärt den Schülern die Aufgabe.',
        ru:'Учительница объясняет ученикам задание.',
        en:'The teacher explains the assignment to the students.' },
      { de:'Die Schüler stellen der Lehrerin viele Fragen.',
        ru:'Ученики задают учительнице много вопросов.',
        en:'The students ask the teacher many questions.' }
    ] },

  { n:633, cats:['jobs'], pack:'jobs', img:633,
    de:'die Krankenschwester', en:'nurse', ru:'медсестра', alt:'der Krankenpfleger',
    s:[
      { de:'Die Krankenschwester arbeitet im Krankenhaus.',
        ru:'Медсестра работает в больнице.',
        en:'The nurse works in the hospital.' },
      { de:'Die Krankenschwester bringt dem Patienten ein Glas Wasser.',
        ru:'Медсестра приносит пациенту стакан воды.',
        en:'The nurse brings the patient a glass of water.' }
    ] },

  { n:634, cats:['jobs'], pack:'jobs', img:634,
    de:'der Zahnarzt', en:'dentist', ru:'стоматолог', alt:'die Zahnärztin',
    s:[
      { de:'Der Zahnarzt untersucht meine Zähne.',
        ru:'Стоматолог осматривает мои зубы.',
        en:'The dentist is examining my teeth.' },
      { de:'Ich habe morgen einen Termin beim Zahnarzt.',
        ru:'У меня завтра приём у стоматолога.',
        en:'I have an appointment with the dentist tomorrow.' }
    ] },

  { n:635, cats:['jobs'], pack:'jobs', img:635,
    de:'die Apothekerin', en:'pharmacist', ru:'фармацевт', alt:'der Apotheker',
    s:[
      { de:'Die Apothekerin arbeitet in der Apotheke.',
        ru:'Фармацевт работает в аптеке.',
        en:'The pharmacist works at the pharmacy.' },
      { de:'Ich frage die Apothekerin nach diesem Medikament.',
        ru:'Я спрашиваю фармацевта об этом лекарстве.',
        en:'I am asking the pharmacist about this medicine.' }
    ] },

  { n:637, cats:['jobs'], pack:'jobs', img:637,
    de:'der Koch', en:'cook / chef', ru:'повар', alt:'die Köchin',
    s:[
      { de:'Der Koch bereitet das Abendessen vor.',
        ru:'Повар готовит ужин.',
        en:'The cook is preparing dinner.' },
      { de:'Wir haben dem Koch für das leckere Essen gedankt.',
        ru:'Мы поблагодарили повара за вкусную еду.',
        en:'We thanked the cook for the delicious food.' }
    ] },

  { n:638, cats:['jobs'], pack:'jobs', img:638,
    de:'die Bäckerin', en:'baker', ru:'пекарь', alt:'der Bäcker',
    s:[
      { de:'Die Bäckerin backt jeden Morgen frisches Brot.',
        ru:'Пекарь каждое утро печёт свежий хлеб.',
        en:'The baker bakes fresh bread every morning.' },
      { de:'Ich kaufe bei der Bäckerin zwei Brötchen.',
        ru:'Я покупаю у пекаря две булочки.',
        en:'I buy two bread rolls from the baker.' }
    ] },

  { n:639, cats:['jobs'], pack:'jobs', img:639,
    de:'der Metzger', en:'butcher', ru:'мясник', alt:'die Metzgerin',
    s:[
      { de:'Der Metzger arbeitet in einer kleinen Metzgerei.',
        ru:'Мясник работает в небольшой мясной лавке.',
        en:'The butcher works in a small butcher shop.' },
      { de:'Der Metzger verkauft Fleisch und Wurst.',
        ru:'Мясник продаёт мясо и колбасу.',
        en:'The butcher sells meat and sausage.' }
    ] },

  { n:641, cats:['jobs'], pack:'jobs', img:641,
    de:'die Friseurin', en:'hairdresser', ru:'парикмахер', alt:'der Friseur',
    s:[
      { de:'Die Friseurin schneidet einer Kundin die Haare.',
        ru:'Парикмахер стрижёт клиентке волосы.',
        en:'The hairdresser is cutting a customer\'s hair.' },
      { de:'Ich habe morgen einen Termin bei der Friseurin.',
        ru:'У меня завтра запись к парикмахеру.',
        en:'I have an appointment with the hairdresser tomorrow.' }
    ] },

  { n:643, cats:['jobs'], pack:'jobs', img:643,
    de:'der Feuerwehrmann', en:'firefighter', ru:'пожарный', alt:'die Feuerwehrfrau',
    s:[
      { de:'Der Feuerwehrmann löscht ein Feuer.',
        ru:'Пожарный тушит пожар.',
        en:'The firefighter is putting out a fire.' },
      { de:'Der Feuerwehrmann hilft den Menschen im Haus.',
        ru:'Пожарный помогает людям в доме.',
        en:'The firefighter helps the people in the house.' }
    ] },

  { n:644, cats:['jobs'], pack:'jobs', img:644,
    de:'der Soldat', en:'soldier', ru:'солдат', alt:'die Soldatin',
    s:[
      { de:'Der Soldat trägt eine Uniform.',
        ru:'Солдат носит форму.',
        en:'The soldier wears a uniform.' },
      { de:'Der Soldat spricht mit seinem Offizier.',
        ru:'Солдат разговаривает со своим офицером.',
        en:'The soldier is speaking with his officer.' }
    ] },

  { n:646, cats:['jobs'], pack:'jobs', img:646,
    de:'der Pilot', en:'pilot', ru:'пилот', alt:'die Pilotin',
    s:[
      { de:'Der Pilot fliegt das Flugzeug nach Berlin.',
        ru:'Пилот летит на самолёте в Берлин.',
        en:'The pilot is flying the plane to Berlin.' },
      { de:'Die Passagiere sprechen nach dem Flug mit dem Piloten.',
        ru:'Пассажиры разговаривают с пилотом после полёта.',
        en:'The passengers speak with the pilot after the flight.' }
    ] },

  { n:647, cats:['jobs'], pack:'jobs', img:647,
    de:'der Mechaniker', en:'mechanic', ru:'механик', alt:'die Mechanikerin',
    s:[
      { de:'Der Mechaniker repariert mein Auto.',
        ru:'Механик ремонтирует мою машину.',
        en:'The mechanic is repairing my car.' },
      { de:'Ich habe dem Mechaniker das Problem erklärt.',
        ru:'Я объяснил механику проблему.',
        en:'I explained the problem to the mechanic.' }
    ] },

  { n:648, cats:['jobs'], pack:'jobs', img:648,
    de:'der Elektriker', en:'electrician', ru:'электрик', alt:'die Elektrikerin',
    s:[
      { de:'Der Elektriker repariert das Licht in der Küche.',
        ru:'Электрик ремонтирует свет на кухне.',
        en:'The electrician is repairing the light in the kitchen.' },
      { de:'Wir haben einen Elektriker für morgen bestellt.',
        ru:'Мы вызвали электрика на завтра.',
        en:'We called an electrician for tomorrow.' }
    ] },

  /* ------------------------------------------------------------------
     Sheets 56-64. Words confirmed against the pictures cell by cell.

     `s:[]` — sentences outstanding. These entries exist so the numbering
     is fixed and the drawings are addressable; until each has sentences,
     fill-blank, listen-pick and the vocabulary game cannot serve it. The
     word list and the gender game can.
     ------------------------------------------------------------------ */

  { n:496, cats:['travel'], pack:'verbs', img:496,
    de:'einsteigen', en:'to board / get on', ru:'садиться / сесть',
    s:[
      { de:'Ich steige am Hauptbahnhof in den Zug ein.',
        ru:'Я сажусь на поезд на главном вокзале.',
        en:'I get on the train at the main station.' },
      { de:'Wir steigen vorne in den Bus ein.',
        ru:'Мы садимся в автобус через переднюю дверь.',
        en:'We get on the bus through the front door.' }
    ] },

  { n:497, cats:['places'], pack:'verbs', img:497,
    de:'die Besprechung', en:'meeting', ru:'совещание / встреча',
    s:[
      { de:'Die Besprechung beginnt um neun Uhr.',
        ru:'Совещание начинается в девять часов.',
        en:'The meeting starts at nine o\'clock.' },
      { de:'Wir sprechen in der Besprechung über das neue Projekt.',
        ru:'На совещании мы обсуждаем новый проект.',
        en:'We discuss the new project at the meeting.' }
    ] },

  { n:498, cats:['describe'], pack:'verbs', img:498,
    de:'wählen', en:'to choose', ru:'выбирать / выбрать',
    s:[
      { de:'Sie wählt eine Nummer auf ihrem Handy.',
        ru:'Она набирает номер на своём телефоне.',
        en:'She dials a number on her phone.' },
      { de:'Die Bürger wählen einen neuen Bürgermeister.',
        ru:'Граждане выбирают нового мэра.',
        en:'The citizens elect a new mayor.' }
    ] },

  { n:499, cats:['describe'], pack:'verbs', img:499,
    de:'erzählen', en:'to tell', ru:'рассказывать / рассказать',
    s:[
      { de:'Er erzählt mir eine lustige Geschichte.',
        ru:'Он рассказывает мне смешную историю.',
        en:'He tells me a funny story.' },
      { de:'Sie hat ihrer Freundin von der Reise erzählt.',
        ru:'Она рассказала подруге о поездке.',
        en:'She told her friend about the trip.' }
    ] },

  { n:512, cats:['home'], pack:'verbs', img:512,
    de:'herunterladen', en:'to download', ru:'скачивать / скачать',
    s:[
      { de:'Ich lade die Datei auf mein Handy herunter.',
        ru:'Я скачиваю файл на свой телефон.',
        en:'I download the file to my phone.' },
      { de:'Sie hat die App gestern heruntergeladen.',
        ru:'Она вчера скачала приложение.',
        en:'She downloaded the app yesterday.' }
    ] },

  { n:513, cats:['home'], pack:'verbs', img:513,
    de:'hochladen', en:'to upload', ru:'загружать / загрузить',
    s:[
      { de:'Ich lade ein Foto auf die Webseite hoch.',
        ru:'Я загружаю фотографию на сайт.',
        en:'I upload a photo to the website.' },
      { de:'Er hat das Video gestern hochgeladen.',
        ru:'Он вчера загрузил видео.',
        en:'He uploaded the video yesterday.' }
    ] },

  { n:516, cats:['family'], pack:'verbs', img:516,
    de:'winken', en:'to wave', ru:'махать / помахать',
    s:[
      { de:'Das Kind winkt seiner Mutter.',
        ru:'Ребёнок машет маме.',
        en:'The child waves to his mother.' },
      { de:'Sie winkte uns vom Zug aus.',
        ru:'Она помахала нам из поезда.',
        en:'She waved to us from the train.' }
    ] },

  { n:520, cats:['places'], pack:'verbs', img:520,
    de:'lernen', en:'to learn', ru:'учить / выучить',
    s:[
      { de:'Ich lerne jeden Abend Deutsch.',
        ru:'Я учу немецкий каждый вечер.',
        en:'I learn German every evening.' },
      { de:'Sie hat die neuen Wörter schnell gelernt.',
        ru:'Она быстро выучила новые слова.',
        en:'She learned the new words quickly.' }
    ] },

  { n:522, cats:['kitchen'], pack:'verbs', img:522,
    de:'backen', en:'to bake', ru:'печь / испечь',
    s:[
      { de:'Wir backen einen Kuchen für ihren Geburtstag.',
        ru:'Мы печём торт на её день рождения.',
        en:'We bake a cake for her birthday.' },
      { de:'Er hat gestern frisches Brot gebacken.',
        ru:'Он вчера испёк свежий хлеб.',
        en:'He baked fresh bread yesterday.' }
    ] },

  { n:526, cats:['home'], pack:'verbs', img:526,
    de:'reparieren', en:'to repair', ru:'ремонтировать / отремонтировать',
    s:[
      { de:'Der Mechaniker repariert das Auto.',
        ru:'Механик ремонтирует машину.',
        en:'The mechanic repairs the car.' },
      { de:'Sie hat ihre alte Uhr repariert.',
        ru:'Она отремонтировала свои старые часы.',
        en:'She repaired her old clock.' }
    ] },

  { n:527, cats:['places'], pack:'verbs', img:527,
    de:'studieren', en:'to study', ru:'учиться / изучать',
    s:[
      { de:'Meine Schwester studiert Medizin.',
        ru:'Моя сестра изучает медицину в университете.',
        en:'My sister studies medicine.' },
      { de:'Er hat drei Jahre in Berlin studiert.',
        ru:'Он три года учился в Берлине.',
        en:'He studied in Berlin for three years.' }
    ] },

  { n:529, cats:['questions'], pack:'verbs', img:529,
    de:'erklären', en:'to explain', ru:'объяснять / объяснить',
    s:[
      { de:'Die Lehrerin erklärt die Aufgabe.',
        ru:'Учительница объясняет задание.',
        en:'The teacher explains the task.' },
      { de:'Kannst du mir diese Regel erklären?',
        ru:'Ты можешь объяснить мне это правило?',
        en:'Can you explain this rule to me?' }
    ] },

  { n:532, cats:['body'], pack:'verbs', img:532,
    de:'boxen', en:'to box', ru:'боксировать',
    s:[
      { de:'Er boxt zweimal pro Woche.',
        ru:'Он занимается боксом два раза в неделю.',
        en:'He boxes twice a week.' },
      { de:'Die beiden Sportler boxen im Ring.',
        ru:'Два спортсмена боксируют на ринге.',
        en:'The two athletes box in the ring.' }
    ] },

  { n:533, cats:['places'], pack:'verbs', img:533,
    de:'notieren', en:'to take notes', ru:'записывать / записать',
    s:[
      { de:'Ich notiere die wichtigsten Informationen.',
        ru:'Я записываю самую важную информацию.',
        en:'I take notes on the most important information.' },
      { de:'Sie hat die Telefonnummer in ihrem Heft notiert.',
        ru:'Она записала номер телефона в своей тетради.',
        en:'She wrote down the phone number in her notebook.' }
    ] },

  { n:534, cats:['describe'], pack:'verbs', img:534,
    de:'genießen', en:'to enjoy', ru:'наслаждаться / насладиться',
    s:[
      { de:'Wir genießen das schöne Wetter.',
        ru:'Мы наслаждаемся хорошей погодой.',
        en:'We enjoy the beautiful weather.' },
      { de:'Sie hat den ruhigen Abend genossen.',
        ru:'Она насладилась спокойным вечером.',
        en:'She enjoyed the quiet evening.' }
    ] },

  { n:535, cats:['family'], pack:'verbs', img:535,
    de:'schimpfen', en:'to scold', ru:'ругать / отругать',
    s:[
      { de:'Die Mutter schimpft mit ihrem Sohn.',
        ru:'Мама ругает своего сына.',
        en:'The mother scolds her son.' },
      { de:'Der Lehrer hat mit den Schülern geschimpft.',
        ru:'Учитель отругал учеников.',
        en:'The teacher scolded the students.' }
    ] },

  { n:538, cats:['family'], pack:'verbs', img:538,
    de:'begrüßen', en:'to greet', ru:'приветствовать / поприветствовать',
    s:[
      { de:'Sie begrüßt ihre Gäste an der Tür.',
        ru:'Она приветствует гостей у двери.',
        en:'She greets her guests at the door.' },
      { de:'Wir haben unsere Freunde herzlich begrüßt.',
        ru:'Мы тепло поприветствовали наших друзей.',
        en:'We warmly greeted our friends.' }
    ] },

  { n:541, cats:['describe'], pack:'verbs', img:541,
    de:'sich sorgen', en:'to worry', ru:'беспокоиться',
    s:[
      { de:'Ich sorge mich um meine Familie.',
        ru:'Я беспокоюсь о своей семье.',
        en:'I worry about my family.' },
      { de:'Sie sorgt sich wegen der Prüfung.',
        ru:'Она беспокоится из-за экзамена.',
        en:'She worries about the exam.' }
    ] },

  { n:543, cats:['questions'], pack:'verbs', img:543,
    de:'diskutieren', en:'to discuss', ru:'обсуждать / обсудить',
    s:[
      { de:'Wir diskutieren das Problem in der Besprechung.',
        ru:'Мы обсуждаем проблему на совещании.',
        en:'We discuss the problem at the meeting.' },
      { de:'Sie haben lange über den Plan diskutiert.',
        ru:'Они долго обсуждали план.',
        en:'They discussed the plan for a long time.' }
    ] },

  { n:544, cats:['time'], pack:'verbs', img:544,
    de:'anfangen', en:'to start', ru:'начинать / начать',
    s:[
      { de:'Der Unterricht fängt um acht Uhr an.',
        ru:'Урок начинается в восемь часов.',
        en:'The lesson starts at eight o\'clock.' },
      { de:'Ich fange heute mit dem neuen Buch an.',
        ru:'Я сегодня начинаю читать новую книгу.',
        en:'I start the new book today.' }
    ] },

  { n:548, cats:['home'], pack:'verbs', img:548,
    de:'wegwerfen', en:'to throw away', ru:'выбрасывать / выбросить',
    s:[
      { de:'Bitte wirf die leere Flasche nicht weg.',
        ru:'Пожалуйста, не выбрасывай пустую бутылку.',
        en:'Please don\'t throw away the empty bottle.' },
      { de:'Er hat die alten Zeitungen weggeworfen.',
        ru:'Он выбросил старые газеты.',
        en:'He threw away the old newspapers.' }
    ] },

  { n:552, cats:['questions'], pack:'verbs', img:552,
    de:'verstehen', en:'to understand', ru:'понимать / понять',
    s:[
      { de:'Ich verstehe die Frage nicht.',
        ru:'Я не понимаю вопрос.',
        en:'I don\'t understand the question.' },
      { de:'Jetzt hat sie die Regel verstanden.',
        ru:'Теперь она поняла правило.',
        en:'Now she understands the rule.' }
    ] },

  { n:553, cats:['describe'], pack:'verbs', img:553,
    de:'entspannen', en:'to relax', ru:'отдыхать / отдохнуть',
    s:[
      { de:'Ich entspanne nach der Arbeit zu Hause.',
        ru:'Я отдыхаю дома после работы.',
        en:'I relax at home after work.' },
      { de:'Wir haben uns am See entspannt.',
        ru:'Мы отдохнули у озера.',
        en:'We relaxed by the lake.' }
    ] },

  { n:554, cats:['describe'], pack:'verbs', img:554,
    de:'hoffen', en:'to hope', ru:'надеяться',
    s:[
      { de:'Ich hoffe auf gutes Wetter.',
        ru:'Я надеюсь на хорошую погоду.',
        en:'I hope for good weather.' },
      { de:'Sie hofft, dass der Zug pünktlich kommt.',
        ru:'Она надеется, что поезд придёт вовремя.',
        en:'She hopes that the train will arrive on time.' }
    ] },

  { n:556, cats:['travel'], pack:'verbs', img:556,
    de:'einpacken', en:'to pack', ru:'упаковывать / упаковать',
    s:[
      { de:'Ich packe das Geschenk in Papier ein.',
        ru:'Я упаковываю подарок в бумагу.',
        en:'I wrap the gift in paper.' },
      { de:'Sie hat ihre Sachen für die Reise eingepackt.',
        ru:'Она упаковала свои вещи для поездки.',
        en:'She packed her things for the trip.' }
    ] },

  { n:557, cats:['places'], pack:'verbs', img:557,
    de:'schicken', en:'to send', ru:'отправлять / отправить',
    s:[
      { de:'Ich schicke meiner Freundin eine Nachricht.',
        ru:'Я отправляю подруге сообщение.',
        en:'I send my friend a message.' },
      { de:'Er hat das Paket gestern geschickt.',
        ru:'Он вчера отправил посылку.',
        en:'He sent the package yesterday.' }
    ] },

  { n:558, cats:['body'], pack:'verbs', img:558,
    de:'der Fuß', en:'foot', ru:'ступня / нога',
    s:[
      { de:'Mein linker Fuß tut weh.',
        ru:'У меня болит левая ступня.',
        en:'My left foot hurts.' },
      { de:'Nach dem langen Spaziergang sind meine Füße müde.',
        ru:'После долгой прогулки мои ступни устали.',
        en:'My feet are tired after the long walk.' }
    ] },

  { n:559, cats:['weather'], pack:'verbs', img:559,
    de:'der Sonnenschein', en:'sunshine', ru:'солнечный свет',
    s:[
      { de:'Der Sonnenschein macht den Morgen schön.',
        ru:'Солнечный свет делает утро прекрасным.',
        en:'The sunshine makes the morning beautiful.' },
      { de:'Wir sitzen draußen und genießen den Sonnenschein.',
        ru:'Мы сидим на улице и наслаждаемся солнечным светом.',
        en:'We sit outside and enjoy the sunshine.' }
    ] },

  { n:560, cats:['weather'], pack:'verbs', img:560,
    de:'die Wärme', en:'warmth', ru:'тепло',
    s:[
      { de:'Ich spüre die Wärme der Sonne.',
        ru:'Я чувствую тепло солнца.',
        en:'I feel the warmth of the sun.' },
      { de:'Die Wärme im Zimmer ist angenehm.',
        ru:'Тепло в комнате приятное.',
        en:'The warmth in the room is pleasant.' }
    ] },

  { n:561, cats:['weather'], pack:'verbs', img:561,
    de:'die Kälte', en:'cold', ru:'холод',
    s:[
      { de:'Die Kälte draußen ist unangenehm.',
        ru:'Холод на улице неприятный.',
        en:'The cold outside is unpleasant.' },
      { de:'Meine Hände werden in der Kälte schnell kalt.',
        ru:'На холоде мои руки быстро мёрзнут.',
        en:'My hands get cold quickly in the cold.' }
    ] },

  { n:562, cats:['weather'], pack:'verbs', img:562,
    de:'der Spritzer', en:'splash', ru:'брызги',
    s:[
      { de:'Ein Spritzer Wasser trifft mein Gesicht.',
        ru:'Брызги воды попадают мне на лицо.',
        en:'A splash of water hits my face.' },
      { de:'Beim Springen in den See entstehen viele Spritzer.',
        ru:'Когда мы прыгаем в озеро, летит много брызг.',
        en:'There are lots of splashes when we jump into the lake.' }
    ] },

  { n:563, cats:['describe'], pack:'verbs', img:563,
    de:'die Freude', en:'joy', ru:'радость',
    s:[
      { de:'Ihre Freude ist deutlich zu sehen.',
        ru:'Её радость хорошо видна.',
        en:'Her joy is easy to see.' },
      { de:'Das Geschenk macht den Kindern große Freude.',
        ru:'Подарок приносит детям большую радость.',
        en:'The gift brings the children great joy.' }
    ] },

  { n:564, cats:['body'], pack:'verbs', img:564,
    de:'die Energie', en:'energy', ru:'энергия',
    s:[
      { de:'Am Morgen habe ich viel Energie.',
        ru:'Утром у меня много энергии.',
        en:'I have a lot of energy in the morning.' },
      { de:'Nach der langen Reise hatte sie keine Energie mehr.',
        ru:'После долгой поездки у неё больше не было энергии.',
        en:'She had no energy left after the long trip.' }
    ] },

  { n:566, cats:['body'], pack:'verbs', img:566,
    de:'die Lippe', en:'lip', ru:'губа',
    s:[
      { de:'Meine Lippe ist trocken.',
        ru:'Моя губа сухая.',
        en:'My lip is dry.' },
      { de:'Sie trägt roten Lippenstift auf den Lippen.',
        ru:'У неё на губах красная помада.',
        en:'She wears red lipstick on her lips.' }
    ] },

  { n:568, cats:['places'], pack:'verbs', img:568,
    de:'die Bescheinigung', en:'certificate', ru:'справка',
    s:[
      { de:'Ich brauche eine Bescheinigung für die Schule.',
        ru:'Мне нужна справка для школы.',
        en:'I need a certificate for school.' },
      { de:'Die Ärztin hat mir eine Bescheinigung gegeben.',
        ru:'Врач дала мне справку.',
        en:'The doctor gave me a certificate.' }
    ] },

  { n:574, only:'lesson', cats:['time', 'kap16'], pack:'verbs', img:574,
    de:'absagen', en:'to cancel', ru:'отменять / отменить',
    s:[
      { de:'Wir müssen die Besprechung absagen.',
        ru:'Нам нужно отменить совещание.',
        en:'We have to cancel the meeting.' },
      { de:'Sie hat den Termin gestern abgesagt.',
        ru:'Она вчера отменила встречу.',
        en:'She canceled the appointment yesterday.' }
    ] },

  { n:575, cats:['home'], pack:'verbs', img:575,
    de:'abschließen', en:'to lock', ru:'запирать / запереть',
    s:[
      { de:'Ich schließe jeden Abend die Tür ab.',
        ru:'Я каждый вечер запираю дверь.',
        en:'I lock the door every evening.' },
      { de:'Hast du das Auto abgeschlossen?',
        ru:'Ты запер машину?',
        en:'Did you lock the car?' }
    ] },

  { n:576, cats:['kitchen'], pack:'verbs', img:576,
    de:'abwaschen', en:'to wash dishes', ru:'мыть посуду',
    s:[
      { de:'Ich wasche nach dem Abendessen ab.',
        ru:'Я мою посуду после ужина.',
        en:'I wash the dishes after dinner.' },
      { de:'Er hat die Teller und Gläser abgewaschen.',
        ru:'Он вымыл тарелки и стаканы.',
        en:'He washed the plates and glasses.' }
    ] },

  /* ------------------------------------------------------------------
     Sheets 53-55. Drawn longer than any of the others and, until now,
     entirely invisible: only `schreiben` of the 27 had an entry.

     Five of them carry an `n` that is not their cell. #469-473 were taken
     years earlier by die Quittung, das Formular, unterschreiben, der
     Ausweis and die Ampel, and a number is identity — it does not move
     because a picture wants it. `img` says where the drawing is; that is
     the whole reason the two are separate fields.

     `s:[]` — sentences outstanding.
     ------------------------------------------------------------------ */

  { n:781, cats:['family'], pack:'extra', img:469,
    de:'der Mann', en:'man', ru:'мужчина',
    s:[
      { de:'Der Mann wartet an der Bushaltestelle.',
        ru:'Мужчина ждёт на автобусной остановке.',
        en:'The man waits at the bus stop.' },
      { de:'Ich sehe einen Mann vor dem Geschäft.',
        ru:'Я вижу мужчину перед магазином.',
        en:'I see a man in front of the store.' }
    ] },

  { n:782, cats:['kitchen'], pack:'extra', img:470,
    de:'die Flasche', en:'bottle', ru:'бутылка',
    s:[
      { de:'Die Flasche steht auf dem Tisch.',
        ru:'Бутылка стоит на столе.',
        en:'The bottle is on the table.' },
      { de:'Sie füllt die Flasche mit Wasser.',
        ru:'Она наполняет бутылку водой.',
        en:'She fills the bottle with water.' }
    ] },

  { n:783, cats:['shopping'], pack:'extra', imgs:[471,524,565],
    de:'die Handtasche', en:'handbag', ru:'сумочка',
    s:[
      { de:'Die Handtasche liegt auf dem Stuhl.',
        ru:'Сумочка лежит на стуле.',
        en:'The handbag is on the chair.' },
      { de:'Sie sucht ihren Schlüssel in der Handtasche.',
        ru:'Она ищет ключ в сумочке.',
        en:'She looks for her key in her handbag.' }
    ] },

  { n:784, cats:['home'], pack:'extra', img:472,
    de:'der Staubsauger', en:'vacuum cleaner', ru:'пылесос',
    s:[
      { de:'Der Staubsauger steht im Flur.',
        ru:'Пылесос стоит в коридоре.',
        en:'The vacuum cleaner is in the hallway.' },
      { de:'Ich reinige den Teppich mit dem Staubsauger.',
        ru:'Я чищу ковёр пылесосом.',
        en:'I clean the carpet with the vacuum cleaner.' }
    ] },

  { n:785, cats:['home'], pack:'extra', img:473,
    de:'das Kissen', en:'cushion', ru:'подушка',
    s:[
      { de:'Das Kissen liegt auf dem Sofa.',
        ru:'Подушка лежит на диване.',
        en:'The cushion is on the sofa.' },
      { de:'Sie legt ein Kissen hinter ihren Rücken.',
        ru:'Она кладёт подушку за спину.',
        en:'She puts a cushion behind her back.' }
    ] },

  { n:474, cats:['time'], pack:'extra', img:474,
    de:'die Uhr', en:'clock', ru:'часы',
    s:[
      { de:'Die Uhr hängt an der Wand.',
        ru:'Часы висят на стене.',
        en:'The clock hangs on the wall.' },
      { de:'Ich schaue auf die Uhr.',
        ru:'Я смотрю на часы.',
        en:'I look at the clock.' }
    ] },

  { n:475, cats:['places'], pack:'extra', img:475,
    de:'der Stift', en:'pen', ru:'ручка',
    s:[
      { de:'Der Stift liegt neben dem Formular.',
        ru:'Ручка лежит рядом с бланком.',
        en:'The pen is next to the form.' },
      { de:'Sie schreibt ihren Namen mit einem Stift.',
        ru:'Она пишет своё имя ручкой.',
        en:'She writes her name with a pen.' }
    ] },

  { n:476, cats:['shopping'], pack:'extra', img:476,
    de:'die Geldbörse', en:'wallet', ru:'кошелёк',
    s:[
      { de:'Meine Geldbörse ist in meiner Tasche.',
        ru:'Мой кошелёк в моей сумке.',
        en:'My wallet is in my bag.' },
      { de:'Er nimmt eine Münze aus der Geldbörse.',
        ru:'Он достаёт монету из кошелька.',
        en:'He takes a coin out of the wallet.' }
    ] },

  { n:477, cats:['shopping'], pack:'extra', img:477,
    de:'die Münze', en:'coin', ru:'монета',
    s:[
      { de:'Eine Münze liegt auf dem Boden.',
        ru:'Монета лежит на полу.',
        en:'A coin is lying on the floor.' },
      { de:'Sie steckt die Münze in ihre Geldbörse.',
        ru:'Она кладёт монету в свой кошелёк.',
        en:'She puts the coin in her wallet.' }
    ] },

  { n:478, cats:['places'], pack:'extra', imgs:[478,521],
    de:'lesen', en:'to read', ru:'читать / прочитать',
    s:[
      { de:'Ich lese jeden Abend ein Buch.',
        ru:'Я читаю книгу каждый вечер.',
        en:'I read a book every evening.' },
      { de:'Sie hat die Nachricht zweimal gelesen.',
        ru:'Она прочитала сообщение два раза.',
        en:'She read the message twice.' }
    ] },

  { n:480, cats:['body'], pack:'extra', img:480,
    de:'stehen', en:'to stand', ru:'стоять',
    s:[
      { de:'Der Mann steht vor der Tür.',
        ru:'Мужчина стоит перед дверью.',
        en:'The man is standing in front of the door.' },
      { de:'Die Flasche steht auf dem Küchentisch.',
        ru:'Бутылка стоит на кухонном столе.',
        en:'The bottle is standing on the kitchen table.' }
    ] },

  { n:481, cats:['time'], pack:'extra', imgs:[481,546],
    de:'warten', en:'to wait', ru:'ждать / подождать',
    s:[
      { de:'Ich warte auf den Bus.',
        ru:'Я жду автобус.',
        en:'I am waiting for the bus.' },
      { de:'Wir haben zwanzig Minuten auf den Zug gewartet.',
        ru:'Мы ждали поезд двадцать минут.',
        en:'We waited twenty minutes for the train.' }
    ] },

  { n:482, cats:['describe'], pack:'extra', imgs:[482,537],
    de:'suchen', en:'to look for', ru:'искать / поискать',
    s:[
      { de:'Sie sucht ihre Geldbörse.',
        ru:'Она ищет свой кошелёк.',
        en:'She is looking for her wallet.' },
      { de:'Wir haben überall nach dem Schlüssel gesucht.',
        ru:'Мы везде искали ключ.',
        en:'We looked everywhere for the key.' }
    ] },

  { n:483, cats:['describe'], pack:'extra', imgs:[483,503],
    de:'finden', en:'to find', ru:'находить / найти',
    s:[
      { de:'Ich finde eine Münze auf dem Boden.',
        ru:'Я нахожу монету на полу.',
        en:'I find a coin on the floor.' },
      { de:'Sie hat ihre Handtasche unter dem Tisch gefunden.',
        ru:'Она нашла свою сумочку под столом.',
        en:'She found her handbag under the table.' }
    ] },

  { n:484, cats:['home'], pack:'extra', img:484,
    de:'öffnen', en:'to open', ru:'открывать / открыть',
    s:[
      { de:'Er öffnet langsam die Tür.',
        ru:'Он медленно открывает дверь.',
        en:'He slowly opens the door.' },
      { de:'Sie hat das Fenster geöffnet.',
        ru:'Она открыла окно.',
        en:'She opened the window.' }
    ] },

  { n:485, cats:['home'], pack:'extra', img:485,
    de:'schließen', en:'to close', ru:'закрывать / закрыть',
    s:[
      { de:'Bitte schließe das Fenster.',
        ru:'Пожалуйста, закрой окно.',
        en:'Please close the window.' },
      { de:'Das Geschäft schließt um acht Uhr.',
        ru:'Магазин закрывается в восемь часов.',
        en:'The store closes at eight o\'clock.' }
    ] },

  { n:486, cats:['describe'], pack:'extra', img:486,
    de:'bringen', en:'to bring', ru:'приносить / принести',
    s:[
      { de:'Ich bringe dir ein Glas Wasser.',
        ru:'Я принесу тебе стакан воды.',
        en:'I will bring you a glass of water.' },
      { de:'Er hat Blumen zur Besprechung gebracht.',
        ru:'Он принёс цветы на встречу.',
        en:'He brought flowers to the meeting.' }
    ] },

  { n:487, cats:['places'], pack:'extra', img:487,
    de:'der Park', en:'park', ru:'парк',
    s:[
      { de:'Der Park ist heute sehr ruhig.',
        ru:'Сегодня в парке очень тихо.',
        en:'The park is very quiet today.' },
      { de:'Wir gehen nach dem Mittagessen durch den Park.',
        ru:'После обеда мы гуляем по парку.',
        en:'We walk through the park after lunch.' }
    ] },

  { n:488, cats:['weather'], pack:'extra', img:488,
    de:'der See', en:'lake', ru:'озеро',
    s:[
      { de:'Der See liegt hinter dem Park.',
        ru:'Озеро находится за парком.',
        en:'The lake is behind the park.' },
      { de:'Im Sommer schwimmen wir oft im See.',
        ru:'Летом мы часто плаваем в озере.',
        en:'In summer, we often swim in the lake.' }
    ] },

  { n:489, cats:['travel'], pack:'extra', img:489,
    de:'der Bahnsteig', en:'platform', ru:'платформа',
    s:[
      { de:'Der Zug wartet am Bahnsteig.',
        ru:'Поезд ждёт у платформы.',
        en:'The train is waiting at the platform.' },
      { de:'Viele Menschen stehen auf dem Bahnsteig.',
        ru:'Много людей стоит на платформе.',
        en:'Many people are standing on the platform.' }
    ] },

  { n:490, cats:['places'], pack:'extra', imgs:[490,567],
    de:'der Platz', en:'square', ru:'площадь',
    s:[
      { de:'Der Platz liegt im Zentrum der Stadt.',
        ru:'Площадь находится в центре города.',
        en:'The square is in the center of the city.' },
      { de:'Auf dem Platz warten viele Menschen.',
        ru:'На площади ждёт много людей.',
        en:'Many people are waiting in the square.' }
    ] },

  { n:491, cats:['home'], pack:'extra', img:491,
    de:'die Treppe', en:'stairs', ru:'лестница',
    s:[
      { de:'Die Treppe führt in den zweiten Stock.',
        ru:'Лестница ведёт на второй этаж.',
        en:'The stairs lead to the second floor.' },
      { de:'Sie geht langsam die Treppe hinunter.',
        ru:'Она медленно спускается по лестнице.',
        en:'She slowly walks down the stairs.' }
    ] },

  { n:492, cats:['weather'], pack:'extra', img:492,
    de:'der Mond', en:'moon', ru:'луна',
    s:[
      { de:'Der Mond ist heute sehr hell.',
        ru:'Сегодня луна очень яркая.',
        en:'The moon is very bright tonight.' },
      { de:'Wir sehen den Mond über dem See.',
        ru:'Мы видим луну над озером.',
        en:'We see the moon above the lake.' }
    ] },

  { n:493, cats:['weather'], pack:'extra', img:493,
    de:'die Blume', en:'flower', ru:'цветок',
    s:[
      { de:'Die Blume ist gelb.',
        ru:'Цветок жёлтый.',
        en:'The flower is yellow.' },
      { de:'Er gibt seiner Mutter eine Blume.',
        ru:'Он дарит маме цветок.',
        en:'He gives his mother a flower.' }
    ] },

  { n:494, cats:['home'], pack:'extra', img:494,
    de:'die Pflanze', en:'plant', ru:'растение',
    s:[
      { de:'Die Pflanze steht am Fenster.',
        ru:'Растение стоит у окна.',
        en:'The plant is by the window.' },
      { de:'Ich gebe der Pflanze jeden Morgen Wasser.',
        ru:'Я поливаю растение каждое утро.',
        en:'I water the plant every morning.' }
    ] },

  { n:495, cats:['travel'], pack:'extra', img:495,
    de:'das Schild', en:'sign', ru:'знак / табличка',
    s:[
      { de:'Das Schild steht neben der Straße.',
        ru:'Знак стоит рядом с дорогой.',
        en:'The sign is beside the road.' },
      { de:'Sie liest das Schild an der Tür.',
        ru:'Она читает табличку на двери.',
        en:'She reads the sign on the door.' }
    ] },

  /* ------------------------------------------------------------------
     School and study. 29 words, no pictures yet.

     `cats:['school']` is a new topic and needs a row in
     GH_BANK.categories in data/sentences.js before it appears on the hub:
       { id:'school', glyph:'\ud83c\udf92', ru:'Школа', de:'Schule', en:'School' }

     `pack:'school'` keeps them together so the whole set can be moved to
     another pack, or turned on, without touching a single entry.

     `die Schere` is not here: it is already #744 from the everyday
     objects, and its second pair of sentences was merged onto that entry
     rather than a second copy being made.
     ------------------------------------------------------------------ */

  { n:786, cats:['school'], pack:'school', img:0,
    de:'das Klassenzimmer', en:'classroom', ru:'класс',
    s:[
      { de:'Das Klassenzimmer ist groß und hell.',
        ru:'Класс большой и светлый.',
        en:'The classroom is large and bright.' },
      { de:'Die Schüler gehen in das Klassenzimmer.',
        ru:'Ученики входят в класс.',
        en:'The students go into the classroom.' }
    ] },

  { n:787, cats:['school'], pack:'school', img:0,
    de:'die Lektion', en:'lesson', ru:'урок',
    s:[
      { de:'Die Lektion beginnt um neun Uhr.',
        ru:'Урок начинается в девять часов.',
        en:'The lesson starts at nine o\'clock.' },
      { de:'Heute lernen wir in der Lektion neue Wörter.',
        ru:'Сегодня на уроке мы учим новые слова.',
        en:'Today we learn new words in the lesson.' }
    ] },

  { n:788, cats:['school'], pack:'school', img:0,
    de:'das Fach', en:'subject', ru:'предмет',
    s:[
      { de:'Mathematik ist mein Lieblingsfach.',
        ru:'Математика — мой любимый предмет.',
        en:'Math is my favorite subject.' },
      { de:'In der Schule lernt sie viele verschiedene Fächer.',
        ru:'В школе она изучает много разных предметов.',
        en:'She studies many different subjects at school.' }
    ] },

  { n:789, cats:['school'], pack:'school', img:0,
    de:'das Heft', en:'notebook', ru:'тетрадь',
    s:[
      { de:'Mein Heft liegt auf dem Schreibtisch.',
        ru:'Моя тетрадь лежит на письменном столе.',
        en:'My notebook is on the desk.' },
      { de:'Ich schreibe die neuen Wörter in mein Heft.',
        ru:'Я записываю новые слова в свою тетрадь.',
        en:'I write the new words in my notebook.' }
    ] },

  { n:790, cats:['school'], pack:'school', img:0,
    de:'der Bleistift', en:'pencil', ru:'карандаш',
    s:[
      { de:'Der Bleistift liegt neben dem Heft.',
        ru:'Карандаш лежит рядом с тетрадью.',
        en:'The pencil is next to the notebook.' },
      { de:'Ich schreibe die Antwort mit einem Bleistift.',
        ru:'Я пишу ответ карандашом.',
        en:'I write the answer with a pencil.' }
    ] },

  { n:791, cats:['school'], pack:'school', img:0,
    de:'der Schreibtisch', en:'desk', ru:'письменный стол',
    s:[
      { de:'Der Schreibtisch steht am Fenster.',
        ru:'Письменный стол стоит у окна.',
        en:'The desk is by the window.' },
      { de:'Meine Bücher liegen auf dem Schreibtisch.',
        ru:'Мои книги лежат на письменном столе.',
        en:'My books are on the desk.' }
    ] },

  { n:792, cats:['school'], pack:'school', img:0,
    de:'der Stuhl', en:'chair', ru:'стул',
    s:[
      { de:'Der Stuhl steht neben dem Schreibtisch.',
        ru:'Стул стоит рядом с письменным столом.',
        en:'The chair is next to the desk.' },
      { de:'Der Schüler sitzt auf einem Stuhl.',
        ru:'Ученик сидит на стуле.',
        en:'The student is sitting on a chair.' }
    ] },

  { n:793, cats:['school'], pack:'school', img:0,
    de:'die Tafel', en:'board', ru:'доска',
    s:[
      { de:'Die Lehrerin schreibt an die Tafel.',
        ru:'Учительница пишет на доске.',
        en:'The teacher writes on the board.' },
      { de:'Die Aufgabe steht an der Tafel.',
        ru:'Задание написано на доске.',
        en:'The task is written on the board.' }
    ] },

  { n:794, cats:['school'], pack:'school', img:0,
    de:'die Prüfung', en:'test / exam', ru:'экзамен',
    s:[
      { de:'Die Prüfung beginnt am Montag.',
        ru:'Экзамен начинается в понедельник.',
        en:'The exam starts on Monday.' },
      { de:'Ich lerne heute für die Prüfung.',
        ru:'Я сегодня готовлюсь к экзамену.',
        en:'I am studying for the exam today.' }
    ] },

  { n:795, cats:['school'], pack:'school', img:0,
    de:'die Note', en:'grade', ru:'оценка',
    s:[
      { de:'Sie bekommt eine gute Note.',
        ru:'Она получает хорошую оценку.',
        en:'She gets a good grade.' },
      { de:'Meine Note in Mathematik ist sehr gut.',
        ru:'Моя оценка по математике очень хорошая.',
        en:'My grade in math is very good.' }
    ] },

  { n:796, cats:['school'], pack:'school', img:0,
    de:'das Beispiel', en:'example', ru:'пример',
    s:[
      { de:'Die Lehrerin zeigt uns ein Beispiel.',
        ru:'Учительница показывает нам пример.',
        en:'The teacher shows us an example.' },
      { de:'Dieses Beispiel ist leicht zu verstehen.',
        ru:'Этот пример легко понять.',
        en:'This example is easy to understand.' }
    ] },

  { n:797, cats:['school'], pack:'school', img:0,
    de:'die Übung', en:'exercise', ru:'упражнение',
    s:[
      { de:'Die Übung ist nicht schwer.',
        ru:'Упражнение несложное.',
        en:'The exercise is not difficult.' },
      { de:'Wir machen die Übung zusammen.',
        ru:'Мы делаем упражнение вместе.',
        en:'We do the exercise together.' }
    ] },

  { n:798, cats:['school'], pack:'school', img:0,
    de:'die Pause', en:'break / recess', ru:'перемена / перерыв',
    s:[
      { de:'Die Pause beginnt um zehn Uhr.',
        ru:'Перемена начинается в десять часов.',
        en:'The break starts at ten o\'clock.' },
      { de:'In der Pause sprechen die Schüler miteinander.',
        ru:'На перемене ученики разговаривают друг с другом.',
        en:'The students talk to each other during the break.' }
    ] },

  { n:799, cats:['school'], pack:'school', img:0,
    de:'der Stundenplan', en:'schedule / timetable', ru:'расписание',
    s:[
      { de:'Mein Stundenplan hängt an der Wand.',
        ru:'Моё расписание висит на стене.',
        en:'My schedule hangs on the wall.' },
      { de:'Ich sehe auf dem Stundenplan, wann der Unterricht beginnt.',
        ru:'Я смотрю в расписании, когда начинаются занятия.',
        en:'I look at the schedule to see when class starts.' }
    ] },

  { n:800, cats:['school'], pack:'school', img:0,
    de:'die Universität', en:'university', ru:'университет',
    s:[
      { de:'Die Universität ist im Stadtzentrum.',
        ru:'Университет находится в центре города.',
        en:'The university is in the city center.' },
      { de:'Sie studiert an einer großen Universität.',
        ru:'Она учится в большом университете.',
        en:'She studies at a large university.' }
    ] },

  { n:801, cats:['school'], pack:'school', img:0,
    de:'üben', en:'to practise', ru:'практиковаться / упражняться',
    s:[
      { de:'Ich übe jeden Abend Deutsch.',
        ru:'Я практикую немецкий каждый вечер.',
        en:'I practice German every evening.' },
      { de:'Wir üben die neuen Wörter zusammen.',
        ru:'Мы вместе тренируем новые слова.',
        en:'We practice the new words together.' }
    ] },

  { n:802, cats:['school'], pack:'school', img:0,
    de:'der Schüler', en:'pupil', ru:'ученик',
    s:[
      { de:'Der Schüler sitzt im Klassenzimmer.',
        ru:'Ученик сидит в классе.',
        en:'The student is sitting in the classroom.' },
      { de:'Der Lehrer erklärt dem Schüler die Aufgabe.',
        ru:'Учитель объясняет ученику задание.',
        en:'The teacher explains the task to the student.' }
    ] },

  { n:803, cats:['school'], pack:'school', img:0,
    de:'die Klasse', en:'class', ru:'класс',
    s:[
      { de:'Die Klasse beginnt um acht Uhr.',
        ru:'Занятия начинаются в восемь часов.',
        en:'The class starts at eight o\'clock.' },
      { de:'In unserer Klasse sind zwanzig Schüler.',
        ru:'В нашем классе двадцать учеников.',
        en:'There are twenty students in our class.' }
    ] },

  { n:804, cats:['school'], pack:'school', img:0,
    de:'der Unterricht', en:'instruction / class', ru:'урок / занятия',
    s:[
      { de:'Der Unterricht beginnt um acht Uhr.',
        ru:'Занятия начинаются в восемь часов.',
        en:'Classes start at eight o\'clock.' },
      { de:'Im Unterricht sprechen wir Deutsch.',
        ru:'На уроке мы говорим по-немецки.',
        en:'We speak German in class.' }
    ] },

  { n:805, cats:['school'], pack:'school', img:0,
    de:'das Wörterbuch', en:'dictionary', ru:'словарь',
    s:[
      { de:'Das Wörterbuch liegt neben meinem Heft.',
        ru:'Словарь лежит рядом с моей тетрадью.',
        en:'The dictionary is next to my notebook.' },
      { de:'Ich suche das Wort im Wörterbuch.',
        ru:'Я ищу слово в словаре.',
        en:'I look up the word in the dictionary.' }
    ] },

  { n:806, cats:['school'], pack:'school', img:0,
    de:'der Rucksack', en:'backpack', ru:'рюкзак',
    s:[
      { de:'Mein Rucksack steht neben dem Stuhl.',
        ru:'Мой рюкзак стоит рядом со стулом.',
        en:'My backpack is next to the chair.' },
      { de:'Ich packe meine Bücher in den Rucksack.',
        ru:'Я кладу книги в рюкзак.',
        en:'I put my books in the backpack.' }
    ] },

  { n:807, cats:['school'], pack:'school', img:0,
    de:'der Radiergummi', en:'eraser', ru:'ластик',
    s:[
      { de:'Der Radiergummi liegt neben dem Bleistift.',
        ru:'Ластик лежит рядом с карандашом.',
        en:'The eraser is next to the pencil.' },
      { de:'Ich brauche einen Radiergummi für meinen Fehler.',
        ru:'Мне нужен ластик, чтобы стереть ошибку.',
        en:'I need an eraser for my mistake.' }
    ] },

  { n:808, cats:['school'], pack:'school', img:0,
    de:'das Lineal', en:'ruler', ru:'линейка',
    s:[
      { de:'Das Lineal liegt auf dem Schreibtisch.',
        ru:'Линейка лежит на письменном столе.',
        en:'The ruler is on the desk.' },
      { de:'Ich zeichne mit dem Lineal eine gerade Linie.',
        ru:'Я рисую линейкой прямую линию.',
        en:'I draw a straight line with the ruler.' }
    ] },

  { n:809, cats:['school'], pack:'school', img:0,
    de:'das Zeugnis', en:'report card', ru:'табель / аттестат',
    s:[
      { de:'Sie bekommt heute ihr Zeugnis.',
        ru:'Сегодня она получает свой табель.',
        en:'She gets her report card today.' },
      { de:'Die Noten stehen auf dem Zeugnis.',
        ru:'Оценки указаны в табеле.',
        en:'The grades are on the report card.' }
    ] },

  { n:810, cats:['school'], pack:'school', img:0,
    de:'das Semester', en:'semester', ru:'семестр',
    s:[
      { de:'Das neue Semester beginnt im September.',
        ru:'Новый семестр начинается в сентябре.',
        en:'The new semester starts in September.' },
      { de:'Dieses Semester habe ich vier Kurse.',
        ru:'В этом семестре у меня четыре курса.',
        en:'I have four courses this semester.' }
    ] },

  { n:811, cats:['school'], pack:'school', img:0,
    de:'die Vorlesung', en:'lecture', ru:'лекция',
    s:[
      { de:'Die Vorlesung beginnt um zehn Uhr.',
        ru:'Лекция начинается в десять часов.',
        en:'The lecture starts at ten o\'clock.' },
      { de:'Die Studenten machen in der Vorlesung Notizen.',
        ru:'Студенты делают записи на лекции.',
        en:'The students take notes during the lecture.' }
    ] },

  { n:812, cats:['school'], pack:'school', img:0,
    de:'der Kurs', en:'course', ru:'курс',
    s:[
      { de:'Mein Deutschkurs ist sehr interessant.',
        ru:'Мой курс немецкого языка очень интересный.',
        en:'My German course is very interesting.' },
      { de:'Sie besucht zweimal pro Woche einen Kurs.',
        ru:'Она посещает курс два раза в неделю.',
        en:'She attends a course twice a week.' }
    ] },

  { n:813, cats:['school'], pack:'school', img:0,
    de:'der Satz', en:'sentence', ru:'предложение',
    s:[
      { de:'Dieser Satz ist sehr kurz.',
        ru:'Это предложение очень короткое.',
        en:'This sentence is very short.' },
      { de:'Ich schreibe einen deutschen Satz in mein Heft.',
        ru:'Я пишу немецкое предложение в своей тетради.',
        en:'I write a German sentence in my notebook.' }
    ] },

  { n:814, cats:['school'], pack:'school', img:0,
    de:'die Seite', en:'page', ru:'страница',
    s:[
      { de:'Das Bild ist auf der ersten Seite.',
        ru:'Картинка находится на первой странице.',
        en:'The picture is on the first page.' },
      { de:'Bitte lies die nächste Seite.',
        ru:'Пожалуйста, прочитай следующую страницу.',
        en:'Please read the next page.' }
    ] },

  /* ------------------------------------------------------------------
     TANYA'S COURSE WORDS — Kapitel 16, 17, 18

     Her actual coursework, so it is `pack:'core'` rather than left to the
     number ranges. Every one of these numbers falls in 649-9999, which is
     the `more` pack, which is OFF until she switches it on — and the nine
     of these thirty that were already in the bank sat in `verbs`, `jobs`
     and `more`, all off as well. A word list she cannot see is not a word
     list.

     Two tags each. The theme is where it lives forever — `absagen` is
     about arranging things whatever chapter she is on. `kapNN` is where it
     lives while that chapter is current, so a card can query ofCat('kap17')
     and follow her course without anything moving.

     img:0 on all of them. Most are undrawable — hoffentlich, sogar, im
     Voraus, auf keinen Fall — and sprite.js sets the German large for a
     word with no picture, which is the right answer for an adverb. Any that
     get drawn later just gain an img.
     ------------------------------------------------------------------ */
  { n:815, only:'lesson', cats:['arrange', 'kap16'], img:0,
    de:'bitten', en:'to ask, to request', ru:'просить / попросить',
    s:[
      { de:'Ich bitte meine Lehrerin um Hilfe.',
        en:'I ask my teacher for help.',
        ru:'Я прошу учительницу о помощи.' },
      { de:'Kann ich dich um einen Gefallen bitten?',
        en:'Can I ask you for a favour?',
        ru:'Можно попросить тебя об одолжении?' },
    ] },
  { n:816, only:'lesson', cats:['arrange', 'kap16'], img:0,
    de:'anbieten', en:'to offer', ru:'предлагать / предложить',
    s:[
      { de:'Er bietet mir eine Tasse Kaffee an.',
        en:'He offers me a cup of coffee.',
        ru:'Он предлагает мне чашку кофе.' },
      { de:'Die Firma bietet einen neuen Kurs an.',
        en:'The company offers a new course.',
        ru:'Компания предлагает новый курс.' },
    ] },
  { n:817, only:'lesson', cats:['arrange', 'kap16'], img:0,
    de:'vorschlagen', en:'to suggest', ru:'предлагать / предложить',
    s:[
      { de:'Ich schlage einen Spaziergang im Park vor.',
        en:'I suggest a walk in the park.',
        ru:'Я предлагаю прогуляться в парке.' },
      { de:'Was schlägst du für morgen vor?',
        en:'What do you suggest for tomorrow?',
        ru:'Что ты предлагаешь на завтра?' },
    ] },
  { n:818, only:'lesson', cats:['arrange', 'kap16'], img:0,
    de:'verschieben', en:'to postpone, to move', ru:'переносить / перенести',
    s:[
      { de:'Wir müssen den Termin auf Freitag verschieben.',
        en:'We have to move the appointment to Friday.',
        ru:'Нам нужно перенести встречу на пятницу.' },
      { de:'Können wir das Treffen um eine Stunde verschieben?',
        en:'Can we move the meeting by one hour?',
        ru:'Можем мы перенести встречу на час?' },
    ] },
  { n:819, only:'lesson', cats:['arrange', 'kap16'], img:0,
    de:'hoffentlich', en:'hopefully', ru:'надеюсь',
    s:[
      { de:'Hoffentlich scheint morgen die Sonne.',
        en:'Hopefully the sun will shine tomorrow.',
        ru:'Надеюсь, завтра будет светить солнце.' },
      { de:'Der Bus kommt hoffentlich bald.',
        en:'Hopefully the bus will come soon.',
        ru:'Надеюсь, автобус скоро придёт.' },
    ] },
  { n:820, only:'lesson', cats:['describe', 'kap16', 'kap18'], img:0,
    de:'ungefähr', en:'approximately, about', ru:'примерно',
    s:[
      { de:'Die Fahrt dauert ungefähr zwanzig Minuten.',
        en:'The trip takes about twenty minutes.',
        ru:'Поездка занимает примерно двадцать минут.' },
      { de:'Ungefähr zehn Personen warten draußen.',
        en:'About ten people are waiting outside.',
        ru:'На улице ждут примерно десять человек.' },
    ] },
  { n:821, only:'lesson', cats:['describe', 'kap17'], img:0,
    de:'werden', en:'to become; will', ru:'становиться / стать',
    s:[
      { de:'Im Winter werden die Tage kürzer.',
        en:'In winter the days become shorter.',
        ru:'Зимой дни становятся короче.' },
      { de:'Ich werde morgen meine Mutter besuchen.',
        en:'I will visit my mother tomorrow.',
        ru:'Завтра я навещу маму.' },
    ] },
  { n:822, only:'lesson', cats:['describe', 'kap17'], img:0,
    de:'spannend', en:'exciting', ru:'захватывающий',
    s:[
      { de:'Der Film ist wirklich spannend.',
        en:'The movie is really exciting.',
        ru:'Фильм действительно захватывающий.' },
      { de:'Sie liest ein spannendes Buch.',
        en:'She is reading an exciting book.',
        ru:'Она читает увлекательную книгу.' },
    ] },
  { n:823, only:'lesson', cats:['arrange', 'kap17'], img:0,
    de:'auf keinen Fall', en:'under no circumstances', ru:'ни в коем случае',
    s:[
      { de:'Das darfst du auf keinen Fall vergessen.',
        en:'You must not forget that under any circumstances.',
        ru:'Ты ни в коем случае не должен это забыть.' },
      { de:'Ich möchte auf keinen Fall zu spät kommen.',
        en:'I absolutely do not want to be late.',
        ru:'Я ни в коем случае не хочу опоздать.' },
    ] },
  { n:824, only:'lesson', cats:['arrange', 'kap17'], img:0,
    de:'sicher sein', en:'to be sure', ru:'быть уверенным',
    s:[
      { de:'Ich bin sicher, dass sie heute kommt.',
        en:'I am sure that she is coming today.',
        ru:'Я уверен, что она сегодня придёт.' },
      { de:'Bist du sicher, dass das die richtige Straße ist?',
        en:'Are you sure this is the right street?',
        ru:'Ты уверен, что это правильная улица?' },
    ] },
  { n:825, only:'lesson', cats:['jobs', 'kap17'], img:0,
    de:'selbstständig', en:'independent, self-employed', ru:'самостоятельный',
    s:[
      { de:'Meine Freundin arbeitet selbstständig.',
        en:'My friend is self-employed.',
        ru:'Моя подруга работает на себя.' },
      { de:'Das Kind kann die Aufgabe schon selbstständig machen.',
        en:'The child can already do the task independently.',
        ru:'Ребёнок уже может выполнить задание самостоятельно.' },
    ] },
  { n:826, only:'lesson', cats:['describe', 'kap17', 'kap18'], img:0,
    de:'einfach', en:'simple, easy; simply', ru:'простой; просто',
    s:[
      { de:'Diese Übung ist ziemlich einfach.',
        en:'This exercise is quite easy.',
        ru:'Это упражнение довольно простое.' },
      { de:'Ich brauche nur eine einfache Erklärung.',
        en:'I only need a simple explanation.',
        ru:'Мне нужно только простое объяснение.' },
    ] },
  { n:827, only:'lesson', cats:['arrange', 'kap17', 'kap18'], img:0,
    de:'mitmachen bei', en:'to join in with', ru:'участвовать в',
    s:[
      { de:'Ich mache bei einem Deutschkurs mit.',
        en:'I am taking part in a German course.',
        ru:'Я участвую в курсе немецкого языка.' },
      { de:'Möchtest du bei unserem Spiel mitmachen?',
        en:'Would you like to join our game?',
        ru:'Ты хочешь принять участие в нашей игре?' },
      { de:'Sie macht bei einem Sportkurs mit.',
        en:'She takes part in a sports class.',
        ru:'Она участвует в спортивном курсе.' },
    ] },
  { n:828, only:'lesson', cats:['arrange', 'kap17'], img:0,
    de:'teilnehmen an', en:'to take part in', ru:'принимать участие в',
    s:[
      { de:'Viele Schüler nehmen an dem Wettbewerb teil.',
        en:'Many students take part in the competition.',
        ru:'Многие ученики участвуют в конкурсе.' },
    ] },
  { n:829, only:'lesson', cats:['arrange', 'kap17'], img:0,
    de:'wichtig sein', en:'to be important', ru:'быть важным',
    s:[
      { de:'Es ist wichtig, jeden Tag Deutsch zu üben.',
        en:'It is important to practise German every day.',
        ru:'Важно практиковать немецкий каждый день.' },
      { de:'Meine Familie ist mir sehr wichtig.',
        en:'My family is very important to me.',
        ru:'Моя семья очень важна для меня.' },
    ] },
  { n:830, only:'lesson', cats:['arrange', 'kap17'], img:0,
    de:'im Voraus', en:'in advance', ru:'заранее',
    s:[
      { de:'Vielen Dank im Voraus für deine Hilfe.',
        en:'Thank you in advance for your help.',
        ru:'Заранее спасибо за помощь.' },
      { de:'Wir müssen die Fahrkarten im Voraus kaufen.',
        en:'We have to buy the tickets in advance.',
        ru:'Нам нужно купить билеты заранее.' },
    ] },
  { n:831, only:'lesson', cats:['health', 'kap18'], img:0, rg:'N',
    de:'das Übergewicht', en:'excess weight', ru:'лишний вес',
    s:[
      { de:'Bewegung kann gegen Übergewicht helfen.',
        en:'Exercise can help with excess weight.',
        ru:'Физическая активность может помочь при лишнем весе.' },
      { de:'Der Artikel handelt von Gesundheit und Übergewicht.',
        en:'The article is about health and excess weight.',
        ru:'Статья посвящена здоровью и лишнему весу.' },
    ] },
  { n:832, only:'lesson', cats:['health', 'kap18'], img:0,
    de:'sicher', en:'safe; certain', ru:'безопасный; уверенный',
    s:[
      { de:'Diese Straße ist nachts nicht sehr sicher.',
        en:'This street is not very safe at night.',
        ru:'Эта улица ночью не очень безопасна.' },
      { de:'Ich bin mir sicher, dass er kommt.',
        en:'I am certain that he is coming.',
        ru:'Я уверен, что он придёт.' },
    ] },
  { n:833, only:'lesson', cats:['health', 'kap18'], img:0,
    de:'sogar', en:'even', ru:'даже',
    s:[
      { de:'Heute ist es sogar wärmer als gestern.',
        en:'Today it is even warmer than yesterday.',
        ru:'Сегодня даже теплее, чем вчера.' },
      { de:'Sogar mein Bruder kennt dieses Lied.',
        en:'Even my brother knows this song.',
        ru:'Даже мой брат знает эту песню.' },
    ] },
  { n:834, only:'lesson', cats:['health', 'kap18'], img:0,
    de:'bedeuten', en:'to mean', ru:'означать',
    s:[
      { de:'Was bedeutet dieses Wort?',
        en:'What does this word mean?',
        ru:'Что означает это слово?' },
      { de:'Dieses Zeichen bedeutet, dass wir warten müssen.',
        en:'This sign means that we have to wait.',
        ru:'Этот знак означает, что нам нужно ждать.' },
    ] },
  { n:835, only:'lesson', cats:['health', 'kap18'], img:0, rg:'M',
    de:'der Ratschlag', en:'piece of advice', ru:'совет',
    s:[
      { de:'Meine Lehrerin gibt mir einen guten Ratschlag.',
        en:'My teacher gives me a good piece of advice.',
        ru:'Моя учительница даёт мне хороший совет.' },
      { de:'Danke für deinen Ratschlag.',
        en:'Thank you for your advice.',
        ru:'Спасибо за твой совет.' },
    ] },
];
