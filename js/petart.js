/* Pet pictures.

   Everything else in the app is a three-by-three sprite sheet addressed by
   number, which suits vocabulary — nine words drawn in one sitting, and a
   number is enough to find one.

   Mascots are the opposite. They get redrawn one at a time, they have
   names worth reading in a filename, and a sheet means touching Flippy to
   fix Luna. So they are individual files, and this builds the path from
   the data rather than storing a hundred and thirty-five filenames.

     images/pets/flippy-the-frog-1-cheer.webp
                 └ slug ──────────┘ │ └ mood
                                    └ form

   WebP rather than JPG for one decisive reason: transparency. A pet with a
   white box around it cannot sit on a coloured card. WebP is also smaller
   at the same quality and does not put blocky artefacts on flat colour and
   clean lines, which is all an illustrated character is.

   Missing pictures are expected rather than exceptional — the art arrives
   over weeks. The first fifteen came as one file each, flippy-the-frog.webp
   with no form or mood, so that plain name is the last resort and also the
   only attempt for a pet whose data declares no suffixed art. When a
   -2-cheer turns up, list it in the pet's art field and it takes
   precedence; nothing needs renaming and nothing has a flag day. */

window.GH = window.GH || {};

GH.petArt = (function(){

  var DIR = 'images/pets/';
  var EXT = '.webp';

  /* what is known to exist, so a fallback can be chosen without waiting
     for a failed request. Filled by declare() from the data. */
  var have = {};

  function slug(p){
    if (p.slug) return p.slug;
    /* built from the name, which is why the filenames follow it:
       'Flippy the Frog' -> 'flippy-the-frog' */
    return (p.name || p.de || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function file(p, form, mood){
    return DIR + slug(p) + '-' + form + '-' + mood + EXT;
  }

  /* The plain name, with no form or mood.

     The first fifteen drawings arrived as flippy-the-frog.webp — one
     picture per pet, doing every job. Rather than rename them, that is
     the last fallback: a specific file wins where it exists, and this
     catches everything else. So the roster works today, and any
     -2-cheer that turns up later simply takes precedence without a flag
     day or a rename. */
  function plain(p){
    return DIR + slug(p) + EXT;
  }

  /* Tell the loader which pictures exist. Either a flat list of true forms

       declare('flippy-the-frog', { 1:['shop','cheer'], 2:['shop'] })

     or nothing at all, in which case every path is attempted and the
     browser shows the fallback glyph where a file is absent. */
  function declare(petSlug, forms){ have[petSlug] = forms || null; }

  function exists(p, form, mood){
    var h = have[slug(p)];
    if (h === undefined) return true;          /* unknown, so try it */
    if (!h || !h[form]) return false;
    return h[form].indexOf(mood) >= 0;
  }

  /* The picture to use, falling back the way the moods and forms allow.

     A round that went badly wants the sympathetic face; if it was never
     drawn, the pleased one is better than nothing. A second form with no
     art of its own shows the first, so growing looks like nothing happened
     — which is honest, and better than a hole. */
  function pathFor(p, form, mood){
    var moods = mood === 'cheer' ? ['cheer', 'shop', 'kind']
              : mood === 'kind'  ? ['kind', 'cheer', 'shop']
              : ['shop', 'cheer', 'kind'];
    for (var f = form; f >= 1; f--){
      for (var i = 0; i < moods.length; i++){
        if (exists(p, f, moods[i])) return file(p, f, moods[i]);
      }
    }
    return plain(p);
  }

  /* Where to go when a specific file 404s. Walks the same order the
     browser would have wanted, ending at the plain name, so a half-drawn
     set degrades one step at a time instead of falling straight to a
     glyph. */
  function chain(p, form, mood){
    /* A pet with nothing declared has only its plain file, so go straight
       there. Walking the full chain first would 404 three times per pet —
       forty-five wasted requests on the store page for a set that is all
       plain names today. The data says when the suffixed art exists. */
    if (!p.art || !p.art.length) return [plain(p)];

    var moods = mood === 'cheer' ? ['cheer', 'shop', 'kind']
              : mood === 'kind'  ? ['kind', 'cheer', 'shop']
              : ['shop', 'cheer', 'kind'];
    var out = [];
    for (var f = form; f >= 1; f--){
      for (var i = 0; i < moods.length; i++) out.push(file(p, f, moods[i]));
    }
    out.push(plain(p));
    return out;
  }

  /* An <img> ready to append, or a glyph when there is no picture yet.
     Never returns null, so a caller does not need to branch. */
  function tile(p, form, mood, cls){
    var tries = chain(p, form || 1, mood || 'shop');
    var at = 0;

    var img = document.createElement('img');
    img.className = 'pet-img' + (cls ? ' ' + cls : '');
    img.alt = p.name || p.de || '';
    img.loading = 'lazy';
    img.src = tries[0];

    /* Work down the chain on each failure rather than giving up on the
       first miss. The art arrives over weeks; a pet should show its best
       available picture without anyone maintaining a list of what exists. */
    img.addEventListener('error', function(){
      at++;
      if (at < tries.length){ img.src = tries[at]; return; }
      img.style.display = 'none';
    });
    return img;
  }

  return { tile:tile, pathFor:pathFor, chain:chain, file:file,
           plain:plain, slug:slug, declare:declare };
})();
