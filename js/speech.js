/* js/speech.js */
/* Speaks German with the browser's built-in voices */

window.GH = window.GH || {};

GH.speech = (function(){

  var voice = null;
  var supported = typeof window.speechSynthesis !== 'undefined';

  /* Higher is better. Taking the first de-DE voice is wrong: on macOS the
     list starts with Apple's Eloquence novelty voices (Sandy, Grandma,
     Rocko), which sound far worse than the plain compact voice. */
  function score(v){
    var uri = (v.voiceURI || v.name || '').toLowerCase();
    var s = 0;
    if (uri.indexOf('premium') >= 0) s = 500;
    else if (uri.indexOf('enhanced') >= 0) s = 400;
    else if (uri.indexOf('siri') >= 0) s = 350;
    else if (uri.indexOf('eloquence') >= 0) s = 10;   /* novelty, last resort */
    else if (uri.indexOf('compact') >= 0) s = 100;
    else s = 200;                                      /* unknown, assume normal */
    if (v.lang === 'de-DE') s += 30;                   /* prefer Germany over AT/CH */
    return s;
  }

  /* A second voice, for the dialogues.

     A conversation read in one voice at one pitch is not a conversation,
     and the whole point of the dialogue section is the sound and feel of
     two people talking. So the two best distinct German voices are kept
     rather than one.

     Most devices have several; some have exactly one. When there is only
     one, the second speaker gets the same voice at a lower pitch — worse
     than two voices and much better than nothing, and it never leaves a
     line silent. */
  var voice2 = null;
  /* A THIRD SPEAKER. Steven wants dialogues with three people, so the
     picker offers three slots and utter() takes `who` as 0, 1 or 2.
     Unchosen, it falls back to the second voice, which falls back to the
     first — a three-hander on a one-voice device is still audible. */
  var voice3 = null;
  var oneVoiceOnly = false;

  /* THE NOVELTY VOICES, BY NAME.

     score() above demotes anything with 'eloquence' in its identifier,
     which was written for German and is enough there — macOS ships two or
     three joke voices in German. ENGLISH SHIPS DOZENS, and the classic ones
     carry no marker at all: they are plainly
     `com.apple.speech.synthesis.voice.Albert`, `.Fred`, `.Bahh`, `.Zarvox`.
     Those fell through score()'s final `else` to 200 — "unknown, assume
     normal" — which beat a real compact voice on 100, and the app read the
     comics and the word loop in a robot horse voice.

     So they are named. A blocklist rather than an allowlist of good voices,
     because the good ones differ per device and per OS version and an
     allowlist would silently leave somebody with nothing. */
  var NOVELTY = ('albert badnews bahh bells boing bubbles cellos deranged ' +
                 'eddy flo fred goodnews grandma grandpa hysterical jester ' +
                 'junior kathy organ princess ralph reed rocko sandy shelley ' +
                 'superstar trinoids whisper wobble zarvox').split(' ');

  function isNovelty(v){
    var id = ((v.voiceURI || '') + ' ' + (v.name || ''))
      .toLowerCase().replace(/[^a-z]/g, '');
    for (var i = 0; i < NOVELTY.length; i++){
      if (id.indexOf(NOVELTY[i]) >= 0) return true;
    }
    return false;
  }

  function pickVoice(){
    if (!supported) return;
    /* THE TARGET LANGUAGE, NOT ALWAYS GERMAN. These three are the dialogue
       speakers, and a dialogue is in the language she is learning. */
    var de = voicesIn(target());
    if (!de.length){ voice = null; voice2 = null; voice3 = null; return; }

    /* THE NOVELTY CHECK NEVER RAN ON THE MAIN VOICE.

       `isNovelty()` was written, documented at length, and then used in
       exactly one place: choosing the SECOND speaker for dialogues. The
       primary was `de[0]` straight off the sort, so the entire blocklist
       was doing nothing for the voice that reads almost everything in the
       app — the lyrics, the words, the sentences.

       score() demotes anything with `eloquence` in its identifier and that
       covers most of the German joke voices, but not one whose id carries
       no marker: those fall to the final `else` at 200 and beat a genuine
       compact voice on 100.

       Filtered here rather than scored, and only if it leaves something —
       a device whose only German voice is a novelty is better served by a
       silly voice than by silence. */
    var real = de.filter(function(v){ return !isNovelty(v); });
    if (real.length) de = real;

    de.sort(function(a, b){ return score(b) - score(a); });
    voice = de[0];

    /* THE SECOND SPEAKER HAS TO BE A DIFFERENT PERSON, NOT THE NEXT ROW.

       This took `de[1]` — the next entry in the list. macOS and iOS list a
       downloaded voice MORE THAN ONCE, once per quality: Anna (premium),
       Anna (enhanced), Anna (compact) are three entries and one voice. So
       after sorting by score, de[0] and de[1] were usually the same person
       at two quality levels, and both speakers in a dialogue sounded
       identical however many voices had been installed.

       So it walks the list for the first voice whose NAME differs. The
       novelty check goes in too: a second speaker is no reason to let
       Zarvox into a conversation. */
    var second = null, i;
    for (i = 1; i < de.length; i++){
      if (de[i].name !== voice.name && !isNovelty(de[i])){ second = de[i]; break; }
    }
    /* A genuinely single-voice device falls back to the same voice, and
       `oneVoiceOnly` then pitch-shifts speaker B — worse than two voices
       and much better than a conversation in one. */
    voice2 = second || de[0];
    oneVoiceOnly = !second;

    /* HER CHOICE WINS, and is applied last so it overrides every heuristic
       above rather than competing with one. A stored voice that is no
       longer installed falls through to what score() picked. */
    voice3 = voice2;

    var p = readPick();
    var pa = p.a && byUri(p.a);
    if (pa) voice = pa;
    var pb = p.b && byUri(p.b);
    if (pb) voice2 = pb;
    var pc = p.c && byUri(p.c);
    if (pc) voice3 = pc;
    oneVoiceOnly = !!(voice && voice2 && voice.voiceURI === voice2.voiceURI);
  }


  /* ==================================================================
     HER CHOICE, ABOVE ANY SCORE THIS FILE CAN COMPUTE

     Steven: "I'd like to be able to pick my voices... I've gotten lots of
     premium ones and lots of high-quality ones and they all sound better
     than the shitty one that this website is picking by default."

     Everything above this is the app GUESSING which of the installed
     voices is best, from substrings in an identifier that Apple never
     promised would mean anything. It is a reasonable guess and it will
     always be a guess. The person listening knows.

     IT IS ALSO THE ONLY WAY TO SEE THE LIST. What iOS shows in Settings
     and what Safari hands to `getVoices()` are different sets — downloaded
     enhanced voices frequently never reach the web API at all. A picker
     showing the real list either fixes the problem or proves the good
     voices are not on offer, and nothing else can tell those two apart.

     Stored by voiceURI, and a stored URI that is no longer installed is
     ignored rather than obeyed, so moving to a new phone degrades to the
     automatic choice instead of to silence. */
  var PICK_KEY = 'gh-voice';

  /* THREE SPEAKERS, AND PER LANGUAGE.

     Steven: "Make sure you do it for speaker number 1, 2 and three so we
     can do dialogues with three people. This should work for other
     languages as well."

     So the store is `{ de:{a,b,c}, es:{a,b,c} }` rather than one flat pair.
     Two reasons it has to be keyed by language and not global: the voices
     installed for German are not the voices installed for Spanish, and a
     `voiceURI` chosen for one is meaningless in the other. Switching the
     target language must not hand her a German voice reading Spanish.

     The first version stored a flat `{a,b}` for German only. That shape is
     migrated on read rather than discarded, so a choice already made
     survives. */
  function readAll(){
    var raw;
    try { raw = JSON.parse(window.localStorage.getItem(PICK_KEY) || '{}') || {}; }
    catch (e){ return {}; }
    /* the flat German-only shape, promoted in place */
    if (raw.a || raw.b){
      raw = { de: { a:raw.a || null, b:raw.b || null } };
      writeAll(raw);
    }
    return raw;
  }

  function writeAll(p){
    try { window.localStorage.setItem(PICK_KEY, JSON.stringify(p)); } catch (e){}
  }

  function readPick(code){
    var all = readAll();
    return all[code || target()] || {};
  }

  /* WHICH LANGUAGE THE DIALOGUES ARE IN — the one she is learning, not the
     one the interface is written in. */
  function target(){
    try {
      if (GH.player && GH.player.target) return GH.player.target();
    } catch (e){}
    return 'de';
  }

  /* Matches on the LOCALE, not the language code. They are the same first
     two letters for every language except Tagalog, where the code is `tl`
     and the voice says `fil-PH` — which is why Tagalog silently had no
     voice before 08 Sep.

     Only the language part is compared, so an `es-MX` voice still serves
     an `es-ES` target: a regional accent is a better answer than silence.
     Falls back to the raw code if a language is somehow not in the map. */
  function voicesIn(code){
    if (!supported) return [];
    var raw = (code || target()).toLowerCase();
    var tag = (LOCALE[raw] || raw).toLowerCase();
    var lang = tag.split('-')[0];
    return (window.speechSynthesis.getVoices() || []).filter(function(v){
      return v.lang && v.lang.toLowerCase().split('-')[0] === lang;
    });
  }

  function byUri(uri, code){
    var g = voicesIn(code), i;
    for (i = 0; i < g.length; i++) if (g[i].voiceURI === uri) return g[i];
    return null;
  }

  /* What the picker draws: everything the browser is actually offering,
     with the quality marker pulled out of the identifier so she can see
     for herself whether the premium ones made it through. */
  function list(code){
    return voicesIn(code).map(function(v){
      var uri = (v.voiceURI || '').toLowerCase();
      var q = '';
      if (uri.indexOf('premium') >= 0) q = 'premium';
      else if (uri.indexOf('enhanced') >= 0) q = 'enhanced';
      else if (uri.indexOf('compact') >= 0) q = 'compact';
      else if (uri.indexOf('siri') >= 0) q = 'siri';
      return { uri:v.voiceURI, name:v.name, lang:v.lang, quality:q,
               novelty:isNovelty(v), local:!!v.localService };
    });
  }

  /* `which` is 'a' for the main voice or 'b' for the second speaker.
     A null uri clears the choice and hands that slot back to score(). */
  function choose(which, uri, code){
    var c = code || target();
    var all = readAll();
    if (!all[c]) all[c] = {};
    if (uri) all[c][which] = uri; else delete all[c][which];
    writeAll(all);
    pickVoice();
  }

  function chosen(code){
    var p = readPick(code);
    return { a:p.a || null, b:p.b || null, c:p.c || null,
             usingA: voice ? voice.voiceURI : null,
             usingB: voice2 ? voice2.voiceURI : null,
             usingC: voice3 ? voice3.voiceURI : null };
  }

  /* Speak one line in a NAMED voice, whatever is currently selected, so a
     row in the picker can be heard before it is chosen. */
  function sampleWith(uri, text, onDone, code){
    if (!supported || !text){ if (onDone) onDone(); return; }
    stop();
    var v = byUri(uri, code);
    var lang = LOCALE[code || target()] || 'de-DE';
    var settled = false;
    function fin(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    function build(){
      var u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.lang = lang;
      u.rate = 0.85;
      u.onend = fin; u.onerror = fin;
      return u;
    }
    speakWatched(build);
    setTimeout(fin, 400 + (1200 + text.length * 110) / 0.85);
  }

  /* both names, so a device that is not in front of us can be checked */
  function voiceNames(){
    return (voice ? voice.name : 'none') + '  /  ' +
           (voice2 ? voice2.name : 'none') +
           (oneVoiceOnly ? '  (one voice, second speaker is pitch-shifted)' : '');
  }

  /* so the chosen voice can be checked on a device that isn't in front of us */
  function voiceName(){
    return voice ? (voice.name + ' | ' + voice.voiceURI) : 'none';
  }

  if (supported){
    pickVoice();
    /* The list arrives asynchronously on most browsers and empty on the
       first call in Safari, so both caches are dropped when it changes —
       not just the German one. Without this, a language looked up before
       the voices loaded stays cached as "none" for the whole session. */
    window.speechSynthesis.onvoiceschanged = function(){
      picked = {};
      pickVoice();
    };
  }

  function stop(){
    if (supported) window.speechSynthesis.cancel();
  }

  /* ---------- when the engine swallows an utterance silently ----------

     A documented iOS failure, different from ordinary silence: after some
     interruption to the page's shared audio session, speak() can stop
     actually producing sound — no error event, no end event, nothing said
     — and every later speak() on the page does the same until she closes
     the app entirely. There is no property to ask the engine "are you
     actually working"; the only signal available is that `onstart` never
     fires for a call that should take well under a second to begin.

     So every speaking function below builds its utterance through this
     instead of calling speak() directly. It watches for `onstart`, and if
     it hasn't fired shortly after speak() was called, cancels whatever is
     stuck and tries once more with a FRESH utterance — a spoken-to
     utterance does not reliably replay, which is why this takes a builder
     function rather than an utterance object, and rebuilds rather than
     reuses.

     ONE retry, not a loop. If the engine is genuinely wedged this does not
     fix it — nothing running on the page can, only leaving and reopening
     the app clears that — and retrying forever would just be a silent
     battery drain pretending the button worked. A small pause before the
     retry's speak() call, rather than calling it in the same tick as
     cancel(), because cancel-then-immediately-speak is itself a known way
     to get an utterance silently dropped on some engines. */
  function speakWatched(build){
    var started = false;
    var u = build();
    var realStart = u.onstart;
    u.onstart = function(){ started = true; if (realStart) realStart(); };
    window.speechSynthesis.speak(u);
    setTimeout(function(){
      if (started) return;
      window.speechSynthesis.cancel();
      setTimeout(function(){
        window.speechSynthesis.speak(build());
      }, 50);
    }, 800);
  }

  /* onDone runs whether it finished or failed, so buttons never get stuck */
  function say(text, onDone){ return utter(text, 0, onDone); }

  /* The same thing as a named speaker. `who` is 0 or 1; anything else is
     treated as 0, so a caller that has not been taught about speakers
     still works.

     Kept as one function rather than two so the rate, the safety net and
     the cancel-first behaviour cannot drift apart between them — which is
     exactly how a second speaker ends up talking over the first. */
  function sayAs(text, who, onDone){
    /* 0, 1 or 2. Anything else is speaker one, so a caller that predates
       the third speaker still works. */
    return utter(text, (who === 1 || who === 2) ? who : 0, onDone);
  }

  /* The same voice, deliberately slower.

     For the pronunciation lab, which plays a line at normal speed, then
     slowly, then normal again — the slow pass is where she hears the
     consonants she is going to have to produce. A separate entry point
     rather than a rate argument on say(), so no existing caller can change
     speed by accident.

     `rate` is clamped: below about 0.5 the engine starts inserting pauses
     between syllables and stops sounding like German at all, and above 1.2
     it is no longer a teaching aid. */
  function sayRate(text, rate, onDone){
    var r = Math.max(0.5, Math.min(1.2, Number(rate) || 0.85));
    return utter(text, 0, onDone, r);
  }

  function utter(text, who, onDone, rate){
    if (!supported || !text){ if (onDone) onDone(); return; }
    stop();
    var v = who === 2 ? (voice3 || voice2 || voice)
          : who === 1 ? (voice2 || voice)
          : voice;
    var lang = LOCALE[target()] || 'de-DE';
    var r = (typeof rate === 'number') ? rate : 0.85;
    /* Only shifted when there is no second voice to shift away from. Two
       real voices should each sound like themselves. */
    var pitch = (who === 1 && oneVoiceOnly) ? 0.82 : 1;
    var settled = false;
    function finish(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    function build(){
      var u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.lang = lang;
      u.rate = r;
      u.pitch = pitch;
      u.onend = finish;
      u.onerror = finish;
      return u;
    }
    speakWatched(build);
    /* SAFETY NET FOR BROWSERS THAT DROP onend — SCALED BY THE RATE.

       This was `1200 + length * 110`, calibrated for the normal 0.85. At
       0.52 the same line takes about 1.6 times as long, so the net fired
       while she was still hearing it: the chain advanced, the next pass
       called stop(), and the SLOW PASS WAS CUT OFF PARTWAY. Which is
       audible as "the slow one is not slower" — it was slower, and then it
       was interrupted.

       Divided by the rate, so the estimate tracks the speed, plus a little
       headroom because being late costs a pause and being early truncates
       the audio. */
    setTimeout(finish, 400 + (1200 + text.length * 110) / r);
  }

  /* ---------- speaking a language that is not German ----------

     Everything above assumes German, correctly: it is what the app
     teaches and the whole voice-scoring exists because macOS puts its
     novelty voices first in the German list.

     The comics need more than that. Only thirteen of their four hundred
     and forty-six lines have German written yet, so a German-only
     narrator is silent on almost all of it — and the comic is the one
     place in the app where the text she has is in her own language.

     Added rather than folded into utter(): say() and sayAs() keep their
     exact behaviour, including the pitch shift for a second speaker, and
     nothing that already worked is touched. */
  /* Every language the target picker offers, not just the three the
     interface is written in. A target with no locale here would fall back
     to German, which is how a Spanish course would have been read aloud in
     a German accent. */
  /* Language code to the BCP-47 tag a browser voice reports. Italian and
     Ukrainian added 08 Sep with Steven's eight target languages.

     TAGALOG IS THE ODD ONE AND IT WAS BROKEN. Its code here is `tl` but
     every real voice reports `fil-PH`, and `voicesIn()` used to match the
     CODE against the voice's language — so `'fil-ph'.indexOf('tl')` was 1
     rather than 0 and Tagalog matched no voice at all, on any device.
     `voicesIn()` now matches against this map's value instead, which is
     the string the voice actually carries. */
  var LOCALE = { de:'de-DE', ru:'ru-RU', en:'en-GB',
                 es:'es-ES', fr:'fr-FR', it:'it-IT', uk:'uk-UA',
                 tl:'fil-PH', ga:'ga-IE' };

  /* Same tiers as score(), with two corrections that matter away from
     German: a novelty voice is worse than anything, and an unrecognised
     voice is no longer assumed to be better than a compact one. */
  function scoreIn(v, code){
    if (isNovelty(v)) return -1;
    var uri = (v.voiceURI || v.name || '').toLowerCase();
    var s;
    if (uri.indexOf('premium') >= 0) s = 500;
    else if (uri.indexOf('enhanced') >= 0) s = 400;
    else if (uri.indexOf('siri') >= 0) s = 350;
    else if (uri.indexOf('compact') >= 0) s = 120;
    else s = 150;
    /* the country we actually want, where the language has more than one */
    if (v.lang && v.lang.replace('_','-') === LOCALE[code]) s += 40;
    return s;
  }

  /* code -> the chosen voice, or null when the device has none. `null` is
     a real answer and different from "not looked yet", which is why this
     tests against undefined. */
  var picked = {};

  function voiceFor(code){
    if (!supported || !LOCALE[code]) return null;
    if (picked[code] !== undefined) return picked[code];
    var list = window.speechSynthesis.getVoices() || [];
    var want = list.filter(function(v){
      return v.lang && v.lang.toLowerCase().indexOf(code) === 0;
    });
    if (!want.length){ picked[code] = null; return null; }
    want.sort(function(a, b){ return scoreIn(b, code) - scoreIn(a, code); });
    /* If every voice for this language is a joke voice, say there is none
       and let the browser pick from u.lang. Silence is better than Zarvox,
       and a wrong-accent real voice is better than both. */
    picked[code] = scoreIn(want[0], code) < 0 ? null : want[0];
    return picked[code];
  }

  /* Whether the device can say this language at all, so a caller can
     disable a control rather than offer one that produces silence. */
  function hasVoice(code){ return !!voiceFor(code); }

  function sayIn(text, code, onDone){
    if (!supported || !text){ if (onDone) onDone(); return; }
    if (!LOCALE[code]) code = 'de';
    stop();
    var v = voiceFor(code);
    /* Slow for German because she is learning it. Her own languages are
       read at something closer to a normal pace — a translation drawled
       at 0.85 is irritating rather than helpful. */
    var rate = code === 'de' ? 0.85 : 0.95;
    var settled = false;
    function finish(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    function build(){
      var u = new SpeechSynthesisUtterance(text);
      u.lang = LOCALE[code];
      if (v) u.voice = v;
      u.rate = rate;
      u.pitch = 1;
      u.onend = finish;
      u.onerror = finish;
      return u;
    }
    speakWatched(build);
    setTimeout(finish, 1200 + text.length * 110);
  }

  /* What got chosen, per language, and what was rejected. For checking a
     device that is not in front of us — which is the only way this bug was
     ever going to be found. */
  function voiceReport(){
    if (!supported) return 'no speech support';
    var out = [];
    ['de', 'ru', 'en'].forEach(function(code){
      var list = (window.speechSynthesis.getVoices() || []).filter(function(v){
        return v.lang && v.lang.toLowerCase().indexOf(code) === 0;
      });
      var chose = voiceFor(code);
      var ranked = list.slice().sort(function(a, b){
        return scoreIn(b, code) - scoreIn(a, code);
      }).map(function(v){
        return v.name + ' [' + v.lang + ' ' + scoreIn(v, code) + ']';
      });
      out.push(code.toUpperCase() + ': ' + (chose ? chose.name + ' (' + chose.lang + ')' : 'none') +
               '  — ' + list.length + ' available: ' + ranked.join(', '));
    });
    return out.join('\n');
  }


  return { say:say, sayAs:sayAs, sayIn:sayIn, sayRate:sayRate, hasVoice:hasVoice,
           voiceReport:voiceReport,
           stop:stop, supported:supported,
           voiceName:voiceName, voiceNames:voiceNames,
           twoVoices:function(){ return !oneVoiceOnly; },
           voiceList:list, chooseVoice:choose, chosenVoices:chosen,
           sampleVoice:sampleWith };
})();
