/* A verb's six forms, laid out.

   Two places want this: the conjugation game, which opens it after a wrong
   answer, and the grammar section, where she browses tables before playing
   anything. Writing it twice is how the two would drift, so it lives here.

   Every row speaks when tapped — the pronoun and the form together, since
   'bist' on its own is not what anyone says. Hearing 'du bist' is what
   makes the pairing stick, and reading a table silently teaches spelling
   rather than speech. */

window.GH = window.GH || {};

GH.verbTable = (function(){

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function t(k){ return GH.i18n.t(k); }

  /* er/sie/es and sie/Sie are written with slashes, which a speech engine
     reads aloud as punctuation. Speak one pronoun. */
  function spoken(person){
    if (person.id === 'er') return 'er';
    if (person.id === 'sie') return 'sie';
    return person.de;
  }

  /* verb    the infinitive
     opts    highlight  index of the row to light up, or -1
             prefix     a separable prefix to speak at the end
             onRow      called with (index) after a row is tapped */
  function render(verb, opts){
    opts = opts || {};
    var forms = GH.conjugate.forms(verb);
    var prefix = GH.conjugate.prefix(verb);
    var kind = GH.conjugate.kind(verb).replace('-', '_');
    var lang = GH.i18n.lang();

    var wrap = el('div', 'cg-table');

    var head = el('div', 'cg-table-head');
    head.appendChild(el('span', 'cg-table-verb', verb));
    head.appendChild(el('span', 'cg-table-kind', t('cgKind_' + kind)));
    var hint = el('span', 'cg-table-hint', t('vtTapRow'));
    head.appendChild(hint);
    wrap.appendChild(head);

    GH.conjugate.people.forEach(function(p, k){
      var row = el('button', 'cg-row' + (k === opts.highlight ? ' is-here' : ''));
      row.type = 'button';
      row.appendChild(el('span', 'cg-pron', p.de));
      row.appendChild(el('span', 'cg-form', forms[k] + (prefix ? ' … ' + prefix : '')));
      if (lang !== 'de') row.appendChild(el('span', 'cg-gloss', p[lang] || p.en));
      row.addEventListener('click', function(){
        GH.speech.say(spoken(p) + ' ' + forms[k] + (prefix ? ' ' + prefix : ''));
        if (opts.onRow) opts.onRow(k);
      });
      wrap.appendChild(row);
    });

    return wrap;
  }

  return { render: render };
})();
