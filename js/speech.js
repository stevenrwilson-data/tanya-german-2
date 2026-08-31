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

  function pickVoice(){
    if (!supported) return;
    var list = window.speechSynthesis.getVoices() || [];
    var de = list.filter(function(v){
      return v.lang && v.lang.toLowerCase().indexOf('de') === 0;
    });
    if (!de.length){ voice = null; voice2 = null; return; }
    de.sort(function(a, b){ return score(b) - score(a); });
    voice = de[0];
    voice2 = de.length > 1 ? de[1] : de[0];
    oneVoiceOnly = de.length < 2;
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
    window.speechSynthesis.onvoiceschanged = pickVoice;
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

  function utter(text, who, onDone){
    if (!supported || !text){ if (onDone) onDone(); return; }
    stop();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    var v = who === 1 ? voice2 : voice;
    if (v) u.voice = v;
    u.rate = 0.85;
    /* Only shifted when there is no second voice to shift away from. Two
       real voices should each sound like themselves. */
    u.pitch = (who === 1 && oneVoiceOnly) ? 0.82 : 1;
    var settled = false;
    function finish(){ if (!settled){ settled = true; if (onDone) onDone(); } }
    u.onend = finish;
    u.onerror = finish;
    window.speechSynthesis.speak(u);
    /* safety net for browsers that drop onend */
    setTimeout(finish, 1200 + text.length * 110);
  }

  return { say:say, sayAs:sayAs, stop:stop, supported:supported,
           voiceName:voiceName, voiceNames:voiceNames,
           twoVoices:function(){ return !oneVoiceOnly; } };
})();
