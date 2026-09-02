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
    var list = window.speechSynthesis.getVoices() || [];
    var de = list.filter(function(v){
      return v.lang && v.lang.toLowerCase().indexOf('de') === 0;
    });
    if (!de.length){ voice = null; voice2 = null; return; }
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

  /* onDone runs whether it finished or failed, so buttons never get stuck */
  function say(text, onDone){ return utter(text, 0, onDone); }

  /* The same thing as a named speaker. `who` is 0 or 1; anything else is
     treated as 0, so a caller that has not been taught about speakers
     still works.

     Kept as one function rather than two so the rate, the safety net and
     the cancel-first behaviour cannot drift apart between them — which is
     exactly how a second speaker ends up talking over the first. */
  function sayAs(text, who, onDone){ return utter(text, who === 1 ? 1 : 0, onDone); }

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
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    var v = who === 1 ? voice2 : voice;
    if (v) u.voice = v;
    u.rate = (typeof rate === 'number') ? rate : 0.85;
    /* Only shifted when there is no second voice to shift away from. Two
       real voices should each sound like themselves. */
    u.pitch = (who === 1 && oneVoiceOnly) ? 0.82 : 1;
    var settled = false;
    function finish(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    u.onend = finish;
    u.onerror = finish;
    window.speechSynthesis.speak(u);
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
    setTimeout(finish, 400 + (1200 + text.length * 110) / u.rate);
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
  var LOCALE = { de:'de-DE', ru:'ru-RU', en:'en-GB' };

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
    var u = new SpeechSynthesisUtterance(text);
    u.lang = LOCALE[code];
    var v = voiceFor(code);
    if (v) u.voice = v;
    /* Slow for German because she is learning it. Her own languages are
       read at something closer to a normal pace — a translation drawled
       at 0.85 is irritating rather than helpful. */
    u.rate = code === 'de' ? 0.85 : 0.95;
    u.pitch = 1;
    var settled = false;
    function finish(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    u.onend = finish;
    u.onerror = finish;
    window.speechSynthesis.speak(u);
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
           twoVoices:function(){ return !oneVoiceOnly; } };
})();
