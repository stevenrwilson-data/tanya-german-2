/* Present-tense conjugation.

   Regular verbs are generated, because the rule is genuinely reliable once
   three spelling wrinkles are handled:

     - a stem ending in d or t, or in m/n after another consonant, takes a
       linking -e-: arbeiten gives du arbeitest, not arbeitst; öffnen gives
       du öffnest.
     - a stem ending in an s-sound (s, ß, z, x, tz) swallows the s of -st,
       so du heißt, not du heißst.
     - eln and ern verbs drop the e in the ich form: ich sammle.

   Everything that does not follow the rule is written out below rather
   than guessed. A wrong table here would teach her an error she would then
   have to unlearn, which is worse than not covering the verb at all.

   Order is always: ich, du, er/sie/es, wir, ihr, sie/Sie. */

window.GH = window.GH || {};

GH.conjugate = (function(){

  var PEOPLE = [
    { id:'ich', de:'ich',     ru:'я',        en:'I' },
    { id:'du',  de:'du',      ru:'ты',       en:'you' },
    { id:'er',  de:'er/sie/es', ru:'он/она', en:'he/she/it' },
    { id:'wir', de:'wir',     ru:'мы',       en:'we' },
    { id:'ihr', de:'ihr',     ru:'вы',       en:'you (plural)' },
    { id:'sie', de:'sie/Sie', ru:'они/Вы',   en:'they/you (formal)' }
  ];

  /* No pattern to find — these are memorised, and they are also the verbs
     she will meet most often. */
  var IRREGULAR = {
    'sein':   ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'],
    'haben':  ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'],
    'werden': ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'],
    'wissen': ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'],
    'können': ['kann', 'kannst', 'kann', 'können', 'könnt', 'können'],
    'müssen': ['muss', 'musst', 'muss', 'müssen', 'müsst', 'müssen'],
    'wollen': ['will', 'willst', 'will', 'wollen', 'wollt', 'wollen'],
    'sollen': ['soll', 'sollst', 'soll', 'sollen', 'sollt', 'sollen'],
    'dürfen': ['darf', 'darfst', 'darf', 'dürfen', 'dürft', 'dürfen'],
    'mögen':  ['mag', 'magst', 'mag', 'mögen', 'mögt', 'mögen'],
    'möchten':['möchte', 'möchtest', 'möchte', 'möchten', 'möchtet', 'möchten']
  };

  /* The vowel shifts. Only du and er/sie/es change; ich, wir, ihr and sie
     stay regular — which is the whole point, and the thing Russian does
     not do. Grouped by shift so the game can teach them as families. */
  var SHIFT = {
    'sehen':     { du:'siehst',    er:'sieht',    kind:'e-ie' },
    /* added with the second verb batch */
    'stehlen':   { du:'stiehlst',  er:'stiehlt',  kind:'e-ie' },
    'befehlen':  { du:'befiehlst', er:'befiehlt', kind:'e-ie' },
    'geschehen': { du:'geschiehst',er:'geschieht',kind:'e-ie' },
    'brechen':   { du:'brichst',   er:'bricht',   kind:'e-i' },
    'sterben':   { du:'stirbst',   er:'stirbt',   kind:'e-i' },
    'gelten':    { du:'giltst',    er:'gilt',     kind:'e-i' },
    'messen':    { du:'misst',     er:'misst',    kind:'e-i' },
    'erschrecken':{du:'erschrickst',er:'erschrickt',kind:'e-i' },
    'raten':     { du:'rätst',     er:'rät',      kind:'a-ä' },
    'wachsen':   { du:'wächst',    er:'wächst',   kind:'a-ä' },
    'braten':    { du:'brätst',    er:'brät',     kind:'a-ä' },
    'blasen':    { du:'bläst',     er:'bläst',    kind:'a-ä' },
    'graben':    { du:'gräbst',    er:'gräbt',    kind:'a-ä' },
    'laden':     { du:'lädst',     er:'lädt',     kind:'a-ä' },
    'fangen':    { du:'fängst',    er:'fängt',    kind:'a-ä' },
    'empfangen': { du:'empfängst', er:'empfängt', kind:'a-ä' },
    'saufen':    { du:'säufst',    er:'säuft',    kind:'au-äu' },
    'lesen':     { du:'liest',     er:'liest',    kind:'e-ie' },
    'empfehlen': { du:'empfiehlst',er:'empfiehlt',kind:'e-ie' },
    'essen':     { du:'isst',      er:'isst',     kind:'e-i' },
    'geben':     { du:'gibst',     er:'gibt',     kind:'e-i' },
    'nehmen':    { du:'nimmst',    er:'nimmt',    kind:'e-i' },
    'sprechen':  { du:'sprichst',  er:'spricht',  kind:'e-i' },
    'helfen':    { du:'hilfst',    er:'hilft',    kind:'e-i' },
    'werfen':    { du:'wirfst',    er:'wirft',    kind:'e-i' },
    'treffen':   { du:'triffst',   er:'trifft',   kind:'e-i' },
    'vergessen': { du:'vergisst',  er:'vergisst', kind:'e-i' },
    'treten':    { du:'trittst',   er:'tritt',    kind:'e-i' },
    'fressen':   { du:'frisst',    er:'frisst',   kind:'e-i' },
    'fahren':    { du:'fährst',    er:'fährt',    kind:'a-ä' },
    'tragen':    { du:'trägst',    er:'trägt',    kind:'a-ä' },
    'waschen':   { du:'wäschst',   er:'wäscht',   kind:'a-ä' },
    'schlafen':  { du:'schläfst',  er:'schläft',  kind:'a-ä' },
    'fallen':    { du:'fällst',    er:'fällt',    kind:'a-ä' },
    'halten':    { du:'hältst',    er:'hält',     kind:'a-ä' },
    'lassen':    { du:'lässt',     er:'lässt',    kind:'a-ä' },
    'schlagen':  { du:'schlägst',  er:'schlägt',  kind:'a-ä' },
    'gefallen':  { du:'gefällst',  er:'gefällt',  kind:'a-ä' },
    'laufen':    { du:'läufst',    er:'läuft',    kind:'au-äu' }
  };

  /* Separable verbs conjugate on the base and send the prefix to the end,
     so the table is the base verb's table and the game shows the prefix
     separately. */
  var PREFIXES = ['auf','an','aus','ein','mit','zu','vor','nach','zurück','fern',
                  'her','hin','los','weg','ab','bei','durch','über','um','unter','wieder'
    /* added with the third verb batch — hochladen, festhalten, weitermachen
       and the colloquial runter- all separate the same way */
    , 'fest', 'weiter', 'hoch', 'runter', 'herunter', 'hinzu', 'los', 'weg', 'her', 'hin'
  ];

  /* Inseparable prefixes stay attached but the stem still shifts:
     betreten gives er betritt, vergessen gives er vergisst. */
  var GLUED = ['be','ver','er','ent','emp','ge','zer','miss'];

  /* Words that merely end in -en without being verbs. Without this the
     vocabulary scan calls 'sieben', 'trocken' and 'zufrieden' verbs. */
  /* Words that end like an infinitive but are not one. Without these the
     generator happily produces 'immere, immerst, immert' and anything
     asking isVerb() believes it. */
  var NOT_VERBS = { sieben:1, trocken:1, zufrieden:1, gestern:1, morgen:1,
                    eigenen:1, obwohl:1, sauber:1, besonders:1,
                    heute:1, oft:1, immer:1, gern:1, gerne:1, wieder:1,
                    zusammen:1, draußen:1, drinnen:1, oben:1, unten:1,
                    hinten:1, innen:1, außen:1, eben:1, neben:1, nebenan:1,
                    übermorgen:1, vorgestern:1, nachher:1, vorher:1,
                    lieber:1, weiter:1, wieso:1, warum:1, seitdem:1,
                    neun:1, zehn:1, offen:1, eigen:1, golden:1, silbern:1 };

  /* Verbs that open with the letters of a separable prefix without having
     one. Left alone, antworten is split into an + tworten and conjugates as
     'du twortest an'. The inseparable prefixes um-, über-, unter- and
     wieder- can go either way in German; these particular verbs never
     separate. */
  var NOT_SPLIT = {
    antworten:1, beantworten:1, anfangen:0,
    umarmen:1, umgeben:1, umfassen:1,
    übersetzen:1, überlegen:1, überraschen:1, übernachten:1, überzeugen:1,
    überweisen:1, überqueren:1, überprüfen:1, überholen:1, übertreiben:1,
    unterschreiben:1, unterhalten:1, unterrichten:1, unterstützen:1,
    wiederholen:1, vollenden:1, hinterlassen:1
  };

  function split(inf){
    var i, p, rest;
    if (NOT_SPLIT[inf]) return { prefix:'', base:inf };
    /* longest prefix first, so 'zurück' wins over 'zu' */
    var sorted = PREFIXES.slice().sort(function(a, b){ return b.length - a.length; });
    for (i = 0; i < sorted.length; i++){
      p = sorted[i];
      if (inf.length > p.length + 3 && inf.indexOf(p) === 0){
        rest = inf.slice(p.length);
        if (/^[a-zäöüß]+e?n$/.test(rest) && (SHIFT[rest] || IRREGULAR[rest] || rest.length >= 4)){
          return { prefix:p, base:rest };
        }
      }
    }
    /* an inseparable prefix does not detach, but the stem underneath may
       still shift, so look through it for the shift table only */
    for (i = 0; i < GLUED.length; i++){
      p = GLUED[i];
      if (inf.indexOf(p) === 0){
        rest = inf.slice(p.length);
        if (SHIFT[rest]) return { prefix:'', base:inf, glued:rest };
      }
    }
    return { prefix:'', base:inf };
  }

  function isVerb(word){ return !NOT_VERBS[word]; }

  function stemOf(inf){
    if (/e[lr]n$/.test(inf)) return inf.slice(0, -1);   /* sammeln -> sammel */
    if (/en$/.test(inf)) return inf.slice(0, -2);
    if (/n$/.test(inf)) return inf.slice(0, -1);
    return inf;
  }

  /* The linking -e- goes in after d or t always, and after m or n when a
     real consonant precedes — atmen and öffnen take it, lernen and kommen
     do not.

     The h needs care. In nehmen and wohnen it is a silent lengthening mark
     sitting on the vowel, so it does not count as a consonant and there is
     no linking e: du nimmst, du wohnst. In rechnen and zeichnen the h is
     half of ch, a genuine consonant, and the e is required: du rechnest.
     Excluding h outright got nehmen right and rechnen wrong, so the
     lengthening h is stripped first and then the test runs. */
  function needsE(stem){
    if (/[dt]$/.test(stem)) return true;
    var bare = stem.replace(/([aeiouäöü])h/g, '$1');
    if (/[^aeiouäöülrmn][mn]$/.test(bare)) return true;
    return false;
  }

  function sSound(stem){ return /(s|ß|z|x|tz|ss)$/.test(stem); }

  function regular(inf){
    var stem = stemOf(inf);
    var e = needsE(stem) ? 'e' : '';
    var ich = /e[lr]$/.test(stem) && /el$/.test(stem)
      ? stem.replace(/el$/, 'l') + 'e'                          /* sammle */
      : stem + 'e';
    var du = sSound(stem) ? stem + e + 't' : stem + e + 'st';
    return [ich, du, stem + e + 't', inf, stem + e + 't', inf];
  }

  /* The six forms, in person order. */
  function forms(inf){
    var s = split(inf);
    var base = s.base;
    if (IRREGULAR[base]) return IRREGULAR[base].slice();
    var out = regular(base);
    if (SHIFT[base]){
      out[1] = SHIFT[base].du;
      out[2] = SHIFT[base].er;
    } else if (s.glued){
      /* betreten -> betritt: rebuild from the shifted inner stem */
      var head = base.slice(0, base.length - s.glued.length);
      out[1] = head + SHIFT[s.glued].du;
      out[2] = head + SHIFT[s.glued].er;
    }
    return out;
  }

  function kindOf(inf){
    var s = split(inf);
    if (IRREGULAR[s.base]) return 'irregular';
    if (SHIFT[s.base]) return SHIFT[s.base].kind;
    if (s.glued) return SHIFT[s.glued].kind;
    return 'regular';
  }

  function prefixOf(inf){ return split(inf).prefix; }

  /* Which verbs the game can offer. */
  function known(){
    return Object.keys(IRREGULAR).concat(Object.keys(SHIFT));
  }

  return {
    people: PEOPLE,
    forms: forms,
    kind: kindOf,
    prefix: prefixOf,
    isIrregular: function(inf){ return !!IRREGULAR[split(inf).base]; },
    shifts: SHIFT,
    isVerb: isVerb,
    irregulars: IRREGULAR,
    known: known
  };
})();
