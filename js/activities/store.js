/* The store.

   Pets, and places for them to stand. Nothing here affects how the app
   teaches — that is the point. Kronen cannot buy a hint, a second chance
   or a skipped question, so there is no way to spend your way out of not
   knowing German. They buy a companion who turns up at the end of a round
   and says well done, which is worth exactly as much as she decides it is.

   Every pet has a German name with its article, so owning one is a word
   learned and choosing a favourite is that word said again. The articles
   are spread across der, die and das on purpose.

   The two legendary ones are not for sale at any price. One asks for the
   whole collection, the other for months of turning up — and the store
   says which, because a locked box with no explanation is just a locked
   box. */

window.GH = window.GH || {};

GH.store = (function(){

  var KEY = 'gh-pets-v1';
  var host = null, state = null;

  function t(k, v){ return GH.i18n.t(k, v); }

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }

  function read(){
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e){ return {}; }
  }

  function write(d){
    try { window.localStorage.setItem(KEY, JSON.stringify(d)); } catch (e){}
  }

  function mine(){
    var d = read();
    var id = (GH.player ? GH.player.id() : 'solo');
    if (!d[id]) d[id] = { own:[], slots:1, chosen:[], tokens:{} };
    /* `tokens` was a single number for one drop, when the only kind was
       rare. A number found here is that. */
    if (typeof d[id].tokens === 'number'){
      d[id].tokens = d[id].tokens ? { rare:d[id].tokens } : {};
    }
    if (!d[id].tokens) d[id].tokens = {};
    return { all:d, me:d[id] };
  }

  function save(m){ write(m.all); }

  function owns(id){ return mine().me.own.indexOf(id) >= 0; }
  function slots(){ return mine().me.slots || 1; }

  /* Which pets she has picked to appear. Trimmed to the slots she has, so
     buying a slot and losing it later cannot leave a ghost. */
  function chosen(){
    var m = mine().me;
    return (m.chosen || []).filter(function(id){
      return m.own.indexOf(id) >= 0;
    }).slice(0, slots());
  }

  function petsOf(){ return (window.GH_PETS || { pets:[] }).pets; }

  /* Everything below legendary — the twelve that can simply be bought. */
  function ordinary(){
    return petsOf().filter(function(x){ return x.tier !== 'legendary'; });
  }

  /* Noir the Black Panther Ninja does not fit on a card two inches wide,
     but the title is most of why he is worth having. Full name where
     there is room, first word where there is not. */
  function shortName(p){
    return (p.name || p.de).split(' the ')[0];
  }

  /* Which picture to use, and what to do when it does not exist yet.

     A pet may have a shop portrait, a pleased one and a sympathetic one.
     Falling back in order means a pet drawn only once still appears
     everywhere rather than leaving a hole, and the art can arrive one
     picture at a time. */
  /* Which form of a pet she has grown to. Stored per pet, one-based. */
  function form(id){
    var m = mine().me;
    return (m.form && m.form[id]) || 1;
  }

  function growCost(p){
    var g = (window.GH_PETS.grow || {})[p.tier];
    if (!g) return 0;
    var at = form(p.id);
    return g[at - 1] || 0;         /* nothing beyond the third form */
  }

  function canGrow(p){ return owns(p.id) && growCost(p) > 0; }

  function grow(p){
    var cost = growCost(p);
    if (!cost || !GH.coins.spend(cost, p.id + ':grow')) return;
    if (GH.events && GH.events.mark) GH.events.mark('grow', 'pet:' + p.id, cost);
    var m = mine();
    if (!m.me.form) m.me.form = {};
    m.me.form[p.id] = form(p.id) + 1;
    save(m);
    state.justGrew = p.id;
    paint();
  }

  /* Pictures come from petart.js, which builds a path from the pet's slug,
     its current form and the mood wanted. Returns an element ready to
     append — an img where the file exists, a glyph where it does not —
     so nothing here needs to know whether the art has been drawn yet. */
  function art(p, want){
    return GH.petArt ? GH.petArt.tile(p, form(p.id), want) : null;
  }

  function find(id){
    var out = null;
    petsOf().forEach(function(p){ if (p.id === id) out = p; });
    return out;
  }

  /* Has a legendary been earned? Asked of the app, never bought. */
  /* God mode, for testing.

     Every pet above common is gated on consecutive full days — a
     legendary wants ninety, Ember a hundred and fifty — which means the
     shelf cannot be looked at without either waiting five months or
     forging the ledger. Kronen alone are not enough and never were.

     This one switch makes every gate report itself met. It changes
     nothing about what is stored: the days, the streaks and the counts
     are all still whatever they really are, and turning it off puts the
     shelf straight back to the truth. Buying while it is on spends real
     Kronen and the pet is really owned, which is the point — the store
     has to be walked through as it will actually behave.

     Deliberately not remembered per player and deliberately in the
     testing block, under a heading that says what it is. */
  function god(){
    try { return window.localStorage.getItem('gh-god') === '1'; }
    catch (e){ return false; }
  }

  function setGod(on){
    try {
      if (on) window.localStorage.setItem('gh-god', '1');
      else window.localStorage.removeItem('gh-god');
    } catch (e){}
  }

  function earned(p){
    if (!p.need) return true;
    if (god()) return true;
    var n = p.need;
    if (n.allPets){
      /* the twelve ordinary ones, not the legendaries.

         Filtering on 'has a cost' worked until the legendaries were given
         prices, at which point Mimi's condition included Mimi and could
         never be satisfied. */
      if (!ordinary().every(function(x){ return owns(x.id); })) return false;
    }
    if (n.allSlots && slots() < (window.GH_PETS.slots.length)) return false;
    if (n.mature){
      var s = GH.tutor ? GH.tutor.stats() : { mature:0 };
      if (s.mature < n.mature) return false;
    }
    if (n.days){
      var c = GH.coach ? GH.coach.stats() : { days:0 };
      if (c.days < n.days) return false;
    }
    /* Consecutive days, counted from the ledger rather than from the
       coach. The coach counts days the app was opened; this counts days
       five exercises were finished, which is the thing being asked for.
       Measured against her longest run ever, so illness at day
       eighty-nine does not destroy three months. */
    if (n.run){
      if (!GH.coins || GH.coins.bestRun() < n.run) return false;
    }
    if (n.legendaries){
      var got = 0;
      petsOf().forEach(function(x){
        if (x.tier === 'legendary' && owns(x.id)) got++;
      });
      if (got < n.legendaries) return false;
    }
    /* grown asks for forms, not purchases — a shelf of first-form pets is
       collecting, growing them is staying */
    if (n.grown){
      var g = 0;
      petsOf().forEach(function(x){ if (owns(x.id) && form(x.id) > 1) g++; });
      if (g < n.grown) return false;
    }
    if (n.awards){
      if (!GH.awards || GH.awards.earned() < n.awards) return false;
    }
    return true;
  }

  /* What it needs, and how far along she is.

     Ninety days is a long time to look at a locked box that says only
     'ninety days'. Each line carries her own number against the target,
     so the thing is visibly approaching rather than merely distant. */
  function needText(p){
    var n = p.need || {};
    var c = GH.coach ? GH.coach.stats() : { best:0, days:0 };
    var tu = GH.tutor ? GH.tutor.stats() : { mature:0 };
    var bits = [];

    if (n.run) bits.push(t('stNeedRun', { at:GH.coins ? GH.coins.bestRun() : 0, n:n.run }));
    if (n.days) bits.push(t('stNeedDays', { n:n.days }));
    if (n.allPets){
      var ord = ordinary();
      bits.push(t('stNeedAllPets', {
        at:ord.filter(function(x){ return owns(x.id); }).length, n:ord.length }));
    }
    if (n.allSlots) bits.push(t('stNeedAllSlots', { at:slots(), n:window.GH_PETS.slots.length }));
    if (n.mature) bits.push(t('stNeedMature2', { at:tu.mature, n:n.mature }));
    if (n.grown){
      var g = 0;
      petsOf().forEach(function(x){ if (owns(x.id) && form(x.id) > 1) g++; });
      bits.push(t('stNeedGrown2', { at:g, n:n.grown }));
    }
    if (n.awards){
      bits.push(t('stNeedAwards2', { at:GH.awards ? GH.awards.earned() : 0, n:n.awards }));
    }
    if (n.legendaries){
      var lg = 0;
      petsOf().forEach(function(x){ if (x.tier === 'legendary' && owns(x.id)) lg++; });
      bits.push(t('stNeedLegend', { at:lg, n:n.legendaries }));
    }
    return bits.join('\n');
  }

  /* ---------- buying ---------- */

  /* ---------- pet tokens ----------

     A token is: take any pet of this tier or below, free, with no
     requirement to have met. No Kronen, no gate, no waiting. Earned by
     finishing course lessons.

     Three kinds, and what each one reaches is written out rather than
     computed from a rank:

         common  common
         rare    common, rare
         epic    common, rare, epic

     Not `tiers.indexOf(x) <= tiers.indexOf(token)`. GH_PETS orders its
     tiers but nothing in the data says the order means anything, and a
     tier inserted between rare and epic would silently widen every rare
     token ever granted. Legendary is absent from all three lists on
     purpose: those are the twelve-pet, twenty-day-run pets, and a token
     that could take Noir would empty the far end of the shop.

     SPENDING PICKS THE CHEAPEST TOKEN THAT WORKS. An epic token on a
     common pet is a waste she cannot undo, so if she holds both, the
     common one goes. */
  var TOKEN = {
    common: ['common'],
    rare:   ['common', 'rare'],
    epic:   ['common', 'rare', 'epic']
  };
  /* weakest first, which is the order spendToken tries them in */
  var TOKEN_ORDER = ['common', 'rare', 'epic'];

  function tokens(kind){
    var t = mine().me.tokens || {};
    if (kind) return t[kind] || 0;
    var n = 0;
    TOKEN_ORDER.forEach(function(k){ n += t[k] || 0; });
    return n;
  }

  function tokensHeld(){
    var t = mine().me.tokens || {}, out = [];
    TOKEN_ORDER.forEach(function(k){ if (t[k] > 0) out.push({ kind:k, n:t[k] }); });
    return out;
  }

  /* Which token she holds that would take this pet, weakest first. */
  function tokenFor(p){
    if (!p || owns(p.id)) return null;
    var t = mine().me.tokens || {}, i;
    for (i = 0; i < TOKEN_ORDER.length; i++){
      var k = TOKEN_ORDER[i];
      if ((t[k] || 0) > 0 && TOKEN[k].indexOf(p.tier) >= 0) return k;
    }
    return null;
  }

  /* Called by whatever finishes the lessons. Nothing calls it yet. */
  function grantToken(kind, n){
    if (!TOKEN[kind]) return 0;
    var m = mine();
    if (!m.me.tokens) m.me.tokens = {};
    m.me.tokens[kind] = (m.me.tokens[kind] || 0) + (n || 1);
    save(m);
    return m.me.tokens[kind];
  }

  function spendToken(p){
    var kind = tokenFor(p);
    if (!kind) return false;
    var m = mine();
    m.me.tokens[kind]--;
    if (m.me.tokens[kind] <= 0) delete m.me.tokens[kind];
    m.me.own.push(p.id);
    if (m.me.chosen.length < slots()) m.me.chosen.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
    return true;
  }

  /* Her FIRST pet, ever. The butler resigns and the pet takes the guide
     role, which makes a purchase read as a promotion rather than a
     transaction — and teaches in one moment that a pet is a guide, not an
     ornament.

     Guarded on the count rather than a flag, so it cannot fire twice and
     needs no extra storage. */
  /* The butler steps down for the FIRST pet, and one pet replaces another
     after that. Both are handovers and the butler module tells them apart
     by which it is given.

     The ID goes across as well as the name, because each pet has its own
     line and a display name cannot be keyed on — `shortName` strips "the
     Frog", and two pets could share a first word. */
  function handOver(p, first){
    if (!GH.butler || !GH.butler.handover) return;
    GH.butler.handover(p.id, shortName(p), first);
  }

  function buy(p){
    if (owns(p.id)) return;
    /* the gate is checked here as well as in the card, so a stale screen
       cannot be used to buy something not yet earned */
    if (p.need && !earned(p)) return;
    if (!p.cost || !GH.coins.spend(p.cost, p.id)) return;
    /* What she spends on, which lived only in the coin log and never
       reached the event log or the upload. Whether the pets motivate
       anything is a real question and this is the only evidence for it. */
    if (GH.events && GH.events.mark) GH.events.mark('buy', 'pet:' + p.id, p.cost);
    var m = mine();
    m.me.own.push(p.id);
    if (m.me.chosen.length < slots()) m.me.chosen.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
  }

  function claim(p){
    if (owns(p.id) || !earned(p)) return;
    var m = mine();
    m.me.own.push(p.id);
    save(m);
    state.justBought = p.id;
    paint();
    handOver(p, mine().me.own.length === 1);
  }

  function buySlot(){
    var S = window.GH_PETS.slots;
    var next = S[slots()];
    if (!next || !GH.coins.spend(next.cost, 'slot' + next.n)) return;
    var m = mine();
    m.me.slots = next.n;
    save(m);
    paint();
  }

  /* PICKING A PET WHEN THE SLOTS ARE FULL DISPLACES ONE.

     This is where a swap actually happens — not on buying. Buying only adds
     to `chosen` if there is room, so a new pet with full slots is owned and
     silent until she picks it.

     The displaced pet says goodbye. Swapping companions without a word from
     the one being put down would make them feel like equipment, and the
     whole point of the shelf is that the old one is waiting rather than
     gone. */
  function toggle(id){
    var m = mine();
    var at = m.me.chosen.indexOf(id);
    if (at >= 0){
      m.me.chosen.splice(at, 1);
      save(m);
      paint();
      return;
    }

    var displaced = null;
    if (m.me.chosen.length >= slots()){
      var goneId = m.me.chosen.shift();
      displaced = petsOf().filter(function(x){ return x.id === goneId; })[0] || null;
    }
    m.me.chosen.push(id);
    save(m);
    paint();

    /* Only when someone was actually put down. Filling an empty slot is not
       a swap and nobody has left. */
    if (displaced && GH.butler && GH.butler.handover){
      var p = petsOf().filter(function(x){ return x.id === id; })[0];
      GH.butler.handover(id, p ? shortName(p) : '', false, displaced);
    }
  }

  /* ---------- painting ---------- */

  function petCard(p){
    var have = owns(p.id);
    var legendary = p.tier === 'legendary';
    var open = legendary ? earned(p) : GH.coins.afford(p.cost);
    var picked = chosen().indexOf(p.id) >= 0;

    var box = el('div', 'pt-card pt-' + p.tier +
      (have ? ' is-own' : '') + (picked ? ' is-picked' : '') +
      (state.focus === p.id ? ' is-focus' : ''));
    /* Sent here by the hub's grid. Scrolled to after the paint, because
       the element has no position until it is in the document. */
    if (state.focus === p.id){
      box.id = 'pt-focus';
      window.setTimeout(function(){
        var n = document.getElementById('pt-focus');
        if (n && n.scrollIntoView) n.scrollIntoView({ block:'center' });
        /* Cleared so a later repaint — a purchase, a language switch —
           does not keep dragging her back to the same card. */
        state.focus = null;
      }, 30);
    }

    /* The picture, tappable. A card two inches wide cannot show what was
       actually drawn, so the same tap-to-enlarge the vocabulary sheets
       have applies here. Wrapped in a button rather than given a click
       handler on the img, so it is reachable by keyboard and announces
       itself. */
    var pic = art(p, 'shop');
    if (pic){
      var lens = el('button', 'pt-lens');
      lens.type = 'button';
      lens.setAttribute('aria-label', (p.name || p.de) + ' — ' + t('refTapHint2'));
      lens.appendChild(pic);
      lens.addEventListener('click', function(){
        GH.lightbox.openPic(lensUrl(p, 'shop'), lensCaption(p));
      });
      box.appendChild(lens);
    }

    var body = el('span', 'pt-body');
    /* the name she calls it, then the German word it is. The name is the
       reason she chose it; the word is what she takes away. */
    /* A legendary shows its name even when locked. Noir the Black Panther
       Ninja is most of the reason to work for him, and a row of dashes is
       nothing to want. Only the German word stays hidden until it is
       hers — that is the part she is being taught, and it should arrive
       with the animal. */
    /* Always shown. Hiding the name until she can afford it made the shop
       a row of dashes on the day she most needed a reason to come back —
       and a shop that will not say what it sells is not a shop. */
    body.appendChild(el('span', 'pt-name', shortName(p)));
    body.appendChild(el('span', 'pt-full', p.name || ''));
    body.appendChild(el('span', 'pt-word', p.de));
    var lang = GH.i18n.lang();
    if (lang !== 'de') body.appendChild(el('span', 'pt-tr', p[lang] || p.en));
    body.appendChild(el('span', 'pt-tier', t('pt' +
      p.tier.charAt(0).toUpperCase() + p.tier.slice(1))));
    box.appendChild(body);

    if (have){
      if (form(p.id) > 1){
        body.appendChild(el('span', 'pt-form', t('stFormN', { n:form(p.id) })));
      }
      var pick = el('button', 'pt-pick' + (picked ? ' is-on' : ''));
      pick.type = 'button';
      pick.textContent = picked ? t('stCheering') : t('stChoose');
      pick.addEventListener('click', function(){ toggle(p.id); });
      box.appendChild(pick);
      if (canGrow(p)){
        var g = el('button', 'pt-grow');
        g.type = 'button';
        g.disabled = !GH.coins.afford(growCost(p));
        g.textContent = t('stGrow') + '  \u25c8 ' + growCost(p);
        g.addEventListener('click', function(){ grow(p); });
        box.appendChild(g);
      } else if (form(p.id) >= 3){
        box.appendChild(el('span', 'pt-need', t('stFullGrown')));
      }
      return box;
    }

    /* Not owned. Three states, decided by whether there is a gate and
       whether it is open — not by tier, because an epic pet now has both
       a price and a gate and the old tier branch could not express that. */
    var gated = !!p.need;
    var gateOpen = gated ? earned(p) : true;

    /* The token comes first, before the gate gets a chance to refuse her.
       That is what 'bypasses the wait requirement' means: a rare pet she
       has not waited for is exactly the case the token exists for, so
       offering it only on unlocked pets would make it worthless. */
    var useKind = tokenFor(p);
    if (useKind){
      var tk = el('button', 'pt-buy is-token',
        t('stUseToken', { kind:t('ptTok_' + useKind) }));
      tk.type = 'button';
      tk.addEventListener('click', function(){ spendToken(p); });
      box.appendChild(tk);
      /* Still say what it would otherwise have cost or needed, so using a
         token is a visible choice rather than a shortcut she stumbles on. */
      if (gated && !gateOpen) box.appendChild(el('span', 'pt-need', needText(p)));
      else if (p.cost) box.appendChild(el('span', 'pt-locked-cost', '\u25c8 ' + p.cost));
      return box;
    }

    if (gated && !gateOpen){
      box.appendChild(el('span', 'pt-need', needText(p)));
      if (p.cost) box.appendChild(el('span', 'pt-locked-cost', '\u25c8 ' + p.cost));
      return box;
    }

    if (p.cost){
      var b = el('button', 'pt-buy' + (GH.coins.afford(p.cost) ? '' : ' is-dear'));
      b.type = 'button';
      b.disabled = !GH.coins.afford(p.cost);
      b.textContent = '\u25c8 ' + p.cost;
      b.addEventListener('click', function(){ buy(p); });
      box.appendChild(b);
      /* the gate is behind her, so say so rather than leaving the card
         looking the same as one that was never gated */
      if (gated) box.appendChild(el('span', 'pt-need is-open', t('stGateOpen')));
    } else {
      var c = el('button', 'pt-buy is-claim', t('stClaim'));
      c.type = 'button';
      c.addEventListener('click', function(){ claim(p); });
      box.appendChild(c);
    }

    return box;
  }

  function paint(){
    host.textContent = '';

    /* The header's faces are built once and go stale the moment she buys,
       swaps or grows a pet — all of which repaint this screen and none of
       which anything broadcasts. */
    if (GH.petStrip) GH.petStrip.refresh();
    if (GH.purse) GH.purse.refresh();

    var head = el('div', 'practice-head');
    var back = el('button', 'backlink', '\u2039 ' + t('back'));
    back.type = 'button';
    back.addEventListener('click', function(){ state.onExit(); });
    head.appendChild(back);
    var titles = el('div', 'practice-title');
    titles.appendChild(el('h1', null, t('stStore')));
    titles.appendChild(el('p', null, GH.coins.label()));
    head.appendChild(titles);
    host.appendChild(head);

    /* A token she does not know she has is not a reward. Said once, at the
       top, and absent entirely when there are none — a permanent 'tokens:
       0' is a reminder of what she has not got. */
    if (tokens() > 0){
      /* Named by kind, because an epic token and a common token are not
         the same reward and a bare count would hide the difference. */
      host.appendChild(el('p', 'pt-tokens',
        tokensHeld().map(function(x){
          return t('stTokensOf', { n:x.n, kind:t('ptTok_' + x.kind) });
        }).join(' \u00b7 ')));
    }

    var card = el('div', 'card');

    if (state.justGrew){
      var gp = find(state.justGrew);
      if (gp){
        var grew = el('div', 'pt-got');
        grew.appendChild(el('span', 'pt-got-name', (gp.name || gp.de) + ' \u00b7 ' + gp.de));
        grew.appendChild(el('span', 'pt-got-sub', t('stGrewTo', { n:form(gp.id) })));
        card.appendChild(grew);
      }
      state.justGrew = null;
    }

    if (state.justBought){
      var p = find(state.justBought);
      if (p){
        var yay = el('div', 'pt-got');
        yay.appendChild(el('span', 'pt-got-name', (p.name || p.de) + ' \u00b7 ' + p.de));
        yay.appendChild(el('span', 'pt-got-sub', t('stBought')));
        card.appendChild(yay);
      }
      state.justBought = null;
    }

    card.appendChild(el('p', 'gr-lede', t('stStoreLede')));

    /* the slots, first, because they change what everything else is for */
    var S = window.GH_PETS.slots;
    card.appendChild(el('h2', 'gr-group', t('stSlots')));
    card.appendChild(el('p', 'gr-note', t('stSlotsNote', { n:slots() })));
    if (slots() < S.length){
      var next = S[slots()];
      var sb = el('button', 'btn btn-primary pt-slot-buy');
      sb.type = 'button';
      sb.disabled = !GH.coins.afford(next.cost);
      sb.textContent = t('stBuySlot', { n:next.n }) + '  \u25c8 ' + next.cost;
      sb.addEventListener('click', buySlot);
      card.appendChild(sb);
    }

    var TIERS = (window.GH_PETS.tiers || []);
    TIERS.forEach(function(tier){
      var group = petsOf().filter(function(x){ return x.tier === tier.id; });
      if (!group.length) return;
      var h = el('h2', 'gr-group', t(tier.key));
      h.appendChild(el('span', 'gr-count',
        group.filter(function(x){ return owns(x.id); }).length + '/' + group.length));
      card.appendChild(h);
      /* every tier has a run behind it now, so every tier says so */
      var note = 'stNote_' + tier.id;
      card.appendChild(el('p', 'gr-note', t(note)));
      var grid = el('div', 'pt-grid');
      group.forEach(function(x){ grid.appendChild(petCard(x)); });
      card.appendChild(grid);
    });

    host.appendChild(card);
  }

  /* `focus` is a pet id to scroll to and mark — the grid on the hub sends
     her here when she taps one she does not own, and landing at the top of
     a shelf of sixteen would make her hunt for it again. */
  function open(container, onExit, focus){
    host = container;
    state = { onExit:onExit, justBought:null, justGrew:null, focus:focus || null };
    /* Repaint in place on a language change rather than letting app.js
       reopen the shelf — every pet's word and every tier name changes,
       which is much of the reason to switch language here at all. */
    GH.app.redraw = paint;
    paint();
  }

  /* For the end screen: who is cheering, and which face to wear.

     A round that went badly gets the sympathetic picture where one
     exists. A pet grinning at someone who just scored 30% is the wrong
     animal. */
  function cheerers(mood){
    var want = mood === 'kind' ? 'kind' : 'cheer';
    return chosen().map(find).filter(Boolean).map(function(p){
      return { id:p.id, name:shortName(p), full:p.name,
               de:p.de, ru:p.ru, en:p.en, tier:p.tier,
               pic:art(p, want),
               /* The end screen needs the same tap-to-enlarge the shelf
                  has, and it needs the picture it is actually showing —
                  the cheering or sympathetic face, not the shop pose. So
                  the path and the caption travel with the pet rather than
                  being rebuilt by a caller that does not know about forms
                  or moods. */
               url:lensUrl(p, want),
               caption:lensCaption(p) };
    });
  }

  /* Which file to enlarge.

     NOT pathFor(). That returns the suffixed name — flippy-the-frog-1-
     cheer.webp — and every pet in the data declares `art:[]`, meaning
     the drawings on disk are still the plain one-file-per-pet names from
     the first batch. chain() knows that and ends at plain(); pathFor()
     does not, so the shelf has been enlarging a 404 for all sixteen
     pets while the thumbnail beside it showed the picture correctly.

     chain()[0] is the same file the <img> chose, which is the whole
     point: the lightbox should show what she just tapped. */
  function lensUrl(p, mood){
    var tries = GH.petArt.chain(p, form(p.id), mood || 'shop');
    return tries[0];
  }

  /* One caption, used by the shelf and by the end screen, so the two
     cannot drift. */
  function lensCaption(p){
    var lang = GH.i18n.lang();
    return {
      de: p.name || p.de,
      gloss: p.de + (lang !== 'de' ? ' \u00b7 ' + (p[lang] || p.en) : ''),
      note: t('pt' + p.tier.charAt(0).toUpperCase() + p.tier.slice(1)),
      say: p.de
    };
  }

  /* What the hub's pet strip needs. All of it already existed inside this
     file; none of it was reachable, so the hub had no way to show a pet
     even though the pet lines were written months ago. */
  function strip(){
    return chosen().map(find).filter(Boolean).map(function(p){
      return { id:p.id, name:shortName(p), full:p.name, tier:p.tier,
               pic:art(p, 'kind'), url:lensUrl(p, 'kind'),
               caption:lensCaption(p) };
    });
  }

  /* Every pet, with whether it is hers — for the grid. `earned` says
     whether the gate is behind her, so the grid can tell "not bought yet"
     from "not available yet", which are different disappointments. */
  function shelf(){
    return petsOf().map(function(p){
      return { id:p.id, name:shortName(p), full:p.name, tier:p.tier,
               de:p.de, ru:p.ru, en:p.en, cost:p.cost || 0,
               own:owns(p.id), open:!p.need || earned(p),
               pic:art(p, owns(p.id) ? 'kind' : 'shop'),
               picked:chosen().indexOf(p.id) >= 0 };
    });
  }

  return { open:open, cheerers:cheerers, art:art, owns:owns,
           strip:strip, shelf:shelf, chosen:chosen,
           slots:slots, form:form, god:god, setGod:setGod,
           tokens:tokens, tokensHeld:tokensHeld, tokenFor:tokenFor,
           grantToken:grantToken, tokenKinds:TOKEN_ORDER, tokenReach:TOKEN,
           lensCaption:lensCaption, lensUrl:lensUrl };
})();
