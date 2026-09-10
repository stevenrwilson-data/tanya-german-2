/* data/maze-data.js */
/* MAZE RACE — the direction phrases, and the modules built from them.

   Steven's design and Steven's bank, 09 Sep. A maze navigated by reading
   directions: single words at obvious junctions to begin with, then the
   words move, then they become sequences of two and three.

   ------------------------------------------------------------------
   THE PHRASES

   Every entry carries `moves`, and THAT is what the engine reads. The
   text is what she sees; `moves` is what it means. One row holds both, so
   a new phrase needs no code and the wording can never drift from its
   meaning.

       L   turn left
       R   turn right
       S   go straight on

   RELATIVE, NOT COMPASS. "Turn right" depends on which way she is facing,
   which is the point of the whole game: it makes this a language exercise
   rather than a map-reading one, and it is why the engine carries a
   heading.

   TIERS ARE MOVE COUNTS

       1   one move      3 phrases
       2   two moves     8 phrases
       3   three moves  20 phrases

   TWO RULES, STEVEN'S: no two straights in a row, and no RRR or LLL.
   The first because "straight then straight" is one straight; the second
   because three of the same turn is a full circle plus one and reads as a
   trick rather than a direction.

   THE SET IS COMPLETE UNDER THOSE RULES — checked, not assumed. Of the 27
   possible three-move combinations, 5 contain a double straight and 2 are
   RRR and LLL, leaving exactly the 20 below. Two-move: 9 possible, minus
   SS, leaving the 8 below. Nothing is missing and nothing illegal is
   present.

   ------------------------------------------------------------------
   THE MODULES

   `needs` NAMES ANOTHER MODULE rather than counting levels, so modules
   can be added, reordered or removed without renumbering anything — the
   same reason the pets gate on `need` rather than on a total.

   `tier` picks which phrases a level can draw. `colour` is the scaffold,
   on for the first few junctions and then gone. `item` is the carrot:
   reach the end without it and the level sends her back. */
window.GH_MAZE = (function(){

  var PHRASES = [
    /* ---- tier 1: one move ---- */
    { id:'L', tier:1, moves:['L'],
      en:'Left', de:'Links', ru:'Налево' },
    { id:'R', tier:1, moves:['R'],
      en:'Right', de:'Rechts', ru:'Направо' },
    { id:'S', tier:1, moves:['S'],
      en:'Straight', de:'Geradeaus', ru:'Прямо' },

    /* ---- tier 2: two moves. All 9 pairs except SS. ---- */
    { id:'LL', tier:2, moves:['L','L'],
      en:'Left, then left', de:'Links, dann links', ru:'Налево, потом налево' },
    { id:'LR', tier:2, moves:['L','R'],
      en:'Left, then right', de:'Links, dann rechts', ru:'Налево, потом направо' },
    { id:'LS', tier:2, moves:['L','S'],
      en:'Left, then straight', de:'Links, dann geradeaus', ru:'Налево, потом прямо' },
    { id:'RL', tier:2, moves:['R','L'],
      en:'Right, then left', de:'Rechts, dann links', ru:'Направо, потом налево' },
    { id:'RR', tier:2, moves:['R','R'],
      en:'Right, then right', de:'Rechts, dann rechts', ru:'Направо, потом направо' },
    { id:'RS', tier:2, moves:['R','S'],
      en:'Right, then straight', de:'Rechts, dann geradeaus', ru:'Направо, потом прямо' },
    { id:'SL', tier:2, moves:['S','L'],
      en:'Straight, then left', de:'Geradeaus, dann links', ru:'Прямо, потом налево' },
    { id:'SR', tier:2, moves:['S','R'],
      en:'Straight, then right', de:'Geradeaus, dann rechts', ru:'Прямо, потом направо' },

    /* ---- tier 3: three moves. All 27 except the 5 with a double
       straight and the 2 that are RRR / LLL. ---- */
    { id:'LLR', tier:3, moves:['L','L','R'],
      en:'Left, left, then right', de:'Links, links, dann rechts', ru:'Налево, налево, потом направо' },
    { id:'LLS', tier:3, moves:['L','L','S'],
      en:'Left, left, then straight', de:'Links, links, dann geradeaus', ru:'Налево, налево, потом прямо' },
    { id:'LRL', tier:3, moves:['L','R','L'],
      en:'Left, right, then left', de:'Links, rechts, dann links', ru:'Налево, направо, потом налево' },
    { id:'LRR', tier:3, moves:['L','R','R'],
      en:'Left, right, then right', de:'Links, rechts, dann rechts', ru:'Налево, направо, потом направо' },
    { id:'LRS', tier:3, moves:['L','R','S'],
      en:'Left, right, then straight', de:'Links, rechts, dann geradeaus', ru:'Налево, направо, потом прямо' },
    { id:'LSL', tier:3, moves:['L','S','L'],
      en:'Left, straight, then left', de:'Links, geradeaus, dann links', ru:'Налево, прямо, потом налево' },
    { id:'LSR', tier:3, moves:['L','S','R'],
      en:'Left, straight, then right', de:'Links, geradeaus, dann rechts', ru:'Налево, прямо, потом направо' },
    { id:'RRL', tier:3, moves:['R','R','L'],
      en:'Right, right, then left', de:'Rechts, rechts, dann links', ru:'Направо, направо, потом налево' },
    { id:'RRS', tier:3, moves:['R','R','S'],
      en:'Right, right, then straight', de:'Rechts, rechts, dann geradeaus', ru:'Направо, направо, потом прямо' },
    { id:'RLR', tier:3, moves:['R','L','R'],
      en:'Right, left, then right', de:'Rechts, links, dann rechts', ru:'Направо, налево, потом направо' },
    { id:'RLL', tier:3, moves:['R','L','L'],
      en:'Right, left, then left', de:'Rechts, links, dann links', ru:'Направо, налево, потом налево' },
    { id:'RLS', tier:3, moves:['R','L','S'],
      en:'Right, left, then straight', de:'Rechts, links, dann geradeaus', ru:'Направо, налево, потом прямо' },
    { id:'RSL', tier:3, moves:['R','S','L'],
      en:'Right, straight, then left', de:'Rechts, geradeaus, dann links', ru:'Направо, прямо, потом налево' },
    { id:'RSR', tier:3, moves:['R','S','R'],
      en:'Right, straight, then right', de:'Rechts, geradeaus, dann rechts', ru:'Направо, прямо, потом направо' },
    { id:'SLL', tier:3, moves:['S','L','L'],
      en:'Straight, left, then left', de:'Geradeaus, links, dann links', ru:'Прямо, налево, потом налево' },
    { id:'SLR', tier:3, moves:['S','L','R'],
      en:'Straight, left, then right', de:'Geradeaus, links, dann rechts', ru:'Прямо, налево, потом направо' },
    { id:'SLS', tier:3, moves:['S','L','S'],
      en:'Straight, left, then straight', de:'Geradeaus, links, dann geradeaus', ru:'Прямо, налево, потом прямо' },
    { id:'SRR', tier:3, moves:['S','R','R'],
      en:'Straight, right, then right', de:'Geradeaus, rechts, dann rechts', ru:'Прямо, направо, потом направо' },
    { id:'SRL', tier:3, moves:['S','R','L'],
      en:'Straight, right, then left', de:'Geradeaus, rechts, dann links', ru:'Прямо, направо, потом налево' },
    { id:'SRS', tier:3, moves:['S','R','S'],
      en:'Straight, right, then straight', de:'Geradeaus, rechts, dann geradeaus', ru:'Прямо, направо, потом прямо' }
  ];

  var MODULES = [
    {
      id:'tutorial',
      needs:null,
      name:{ en:'Tutorial', de:'Tutorial', ru:'Обучение' },
      levels:[
        { junctions:3, tier:1, colour:true,  item:null },
        { junctions:4, tier:1, colour:true,  item:null },
        { junctions:4, tier:1, colour:false, item:null },
        { junctions:5, tier:2, colour:false, item:null }
      ]
    },
    {
      id:'tortoise',
      needs:'tutorial',
      name:{ en:'Tortoise and Hare', de:'Hase und Schildkröte', ru:'Заяц и черепаха' },
      levels:[
        { junctions:6, tier:2, colour:false, item:null },
        { junctions:7, tier:3, colour:false, item:'carrot' },
        { junctions:8, tier:3, colour:false, item:'carrot' }
      ]
    }
  ];

  function phrasesFor(tier){
    return PHRASES.filter(function(p){ return p.tier === tier; });
  }

  function byId(id){
    for (var i = 0; i < PHRASES.length; i++) if (PHRASES[i].id === id) return PHRASES[i];
    return null;
  }

  /* ------------------------------------------------------------------
     A PATH IS NOT AN INSTRUCTION. SPLITTING ONE INTO THE OTHER.

     Steven, 09 Sep: "if a maze requires SS then it has to be broken up
     into pieces — RSSSLLR becomes RS, S, SL, LR."

     The maze can hold any sequence of turns. The BANK cannot: no double
     straight inside one phrase, no RRR or LLL inside one phrase. So the
     path is cut into chunks that each exist as a phrase, and she is given
     them one at a time.

     That is not a workaround, it is how directions are actually given.
     Nobody says "straight, straight, straight" — they say "keep going"
     and then tell you the next turn when you get there.

     LONGEST CHUNK FIRST, WITH BACKTRACKING. Greedy alone fails: taking
     the longest legal chunk at each step can strand a tail that cannot be
     split at all. Backtracking is cheap here because a path is a few
     dozen moves and the branching factor is three.

     `max` caps the chunk length, which is how a level's tier controls
     difficulty: tier 1 gives her one move at a time even on a long path,
     tier 3 gives up to three. */
  function legalChunk(str){
    if (!str.length || str.length > 3) return false;
    if (str.indexOf('SS') >= 0) return false;
    if (str === 'RRR' || str === 'LLL') return false;
    return !!byId(str);
  }

  function split(path, max){
    max = Math.min(max || 3, 3);
    var memo = {};
    function go(i){
      if (i >= path.length) return [];
      if (memo.hasOwnProperty(i)) return memo[i];
      var best = null;
      /* Longest first, so a path that CAN be given in threes is. */
      for (var n = Math.min(max, path.length - i); n >= 1; n--){
        var piece = path.substr(i, n);
        if (!legalChunk(piece)) continue;
        var rest = go(i + n);
        if (rest === null) continue;
        best = [piece].concat(rest);
        break;
      }
      memo[i] = best;
      return best;
    }
    return go(0);
  }

  /* Which languages the bank covers. The tile hides itself for a target
     with no phrases rather than showing a maze with no words — the same
     `available()` pattern cuegame.js uses. */
  function hasLang(code){
    if (!code) return false;
    return PHRASES.some(function(p){ return !!p[code]; });
  }

  /* ------------------------------------------------------------------
     GENERATING A MAZE.

     Steven, 09 Sep: "we can have a simple maze generator or I can
     pre-author mazes."

     A generator, and it is small — because `split()` derives the
     instructions from the PATH, this only has to produce a path. The
     corridor is then built along it, so every maze is solvable by
     construction and there is no pathfinding, no dead-end pruning and no
     unsolvable-layout case to test for.

     Pre-authored levels still work: hand a level a `path` and this is
     skipped. Worth it for set-pieces — the carrot lap wants a shape she
     recognises the second time round, which a random path cannot promise.

     The path is a string of moves. Any sequence is legal here, including
     the double straights the BANK forbids; `split()` is what makes it
     speakable.

     TURNS ARE WEIGHTED AWAY FROM STRAIGHT. An even three-way draw gives
     long straight runs that read as one instruction and make the maze
     feel empty. Two parts turn to one part straight keeps corners
     frequent without making it a zigzag. */
  function makePath(junctions, rnd){
    rnd = rnd || Math.random;
    var out = '';
    for (var i = 0; i < junctions; i++){
      var r = rnd();
      out += (r < 0.4) ? 'L' : (r < 0.8) ? 'R' : 'S';
    }
    return out;
  }

  /* A level, ready to play: its path, and that path already cut into the
     phrases she will be given. Returns null if the path cannot be split,
     which cannot happen with the current bank but is checked rather than
     assumed — a future rule change could make it possible. */
  function build(level, rnd){
    var path = level.path || makePath(level.junctions || 4, rnd);
    var parts = split(path, level.tier || 1);
    if (!parts) return null;
    return {
      path: path,
      steps: parts.map(function(id){ return byId(id); }),
      colour: !!level.colour,
      item: level.item || null
    };
  }

  /* ------------------------------------------------------------------
     THE WAY BACK IS NOT THE WAY THERE.

     Steven, 09 Sep: "the carrot you have to retrace your steps and go the
     opposite way and then back."

     Retracing inverts every turn AND reverses their order. The left she
     took on the way out is a right on the way back, and the turn she made
     last is the one she makes first. Straight stays straight.

     That is the whole reason the carrot is worth having. Reading a route
     forwards is recognition; reversing one in your head is the thing
     someone actually has to do to find their way back, and it is much
     harder in a language you are still learning.

     Verified against a real grid walk rather than trusted as a rule —
     see the round-trip test: walk the path, walk its reverse, and you are
     back where you started. */
  function reverse(path){
    var out = '';
    for (var i = path.length - 1; i >= 0; i--){
      var c = path.charAt(i);
      out += (c === 'L') ? 'R' : (c === 'R') ? 'L' : 'S';
    }
    return out;
  }

  /* WHERE THE CARROT SITS. Steven: "the carrot can be at the start or on
     a side tunnel."

     `start` sends her all the way back, which is the full reversal and
     the hardest version. `branch` puts it down a side tunnel hanging off
     the main route — she retraces only as far as the junction, turns off,
     collects it, and comes back. Shorter, and it makes the side tunnel
     worth drawing.

     `at` is the junction index the tunnel leaves from, and `into` is the
     unused exit at that junction — a junction always has three, and the
     route only ever takes one. */
  function carrotPlan(path, where, rnd){
    rnd = rnd || Math.random;
    if (where === 'start' || path.length < 3){
      return { kind:'start', back: reverse(path), out: path };
    }
    var at = 1 + Math.floor(rnd() * (path.length - 2));
    var took = path.charAt(at);
    var free = ['L','R','S'].filter(function(d){ return d !== took; });
    var into = free[Math.floor(rnd() * free.length)];
    return {
      kind: 'branch',
      at: at,
      into: into,
      /* back to the junction, one turn into the tunnel, then out again */
      back: reverse(path.substr(at)),
      into_: into,
      out: path.substr(at)
    };
  }

  function modules(){ return MODULES; }
  function moduleById(id){
    for (var i = 0; i < MODULES.length; i++) if (MODULES[i].id === id) return MODULES[i];
    return null;
  }

  return { phrases:PHRASES, phrasesFor:phrasesFor, hasLang:hasLang,
           byId:byId, split:split, legalChunk:legalChunk,
           makePath:makePath, build:build,
           reverse:reverse, carrotPlan:carrotPlan,
           modules:modules, moduleById:moduleById };
})();
