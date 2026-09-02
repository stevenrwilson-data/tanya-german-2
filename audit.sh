#!/bin/zsh
#
# Audit the project folder against the current build.
#
#   cd "/Users/srw/Library/Mobile Documents/com~apple~CloudDocs/Documents/tanya-german-2"
#   zsh audit.sh
#
# Run it from inside whichever copy of the site you mean to check. Every
# path below is relative to the working directory, so the script has no idea
# which folder it is in and will happily report a whole site MISSING if it
# is run from the wrong one.
#
# Reports every file as OK, STALE or MISSING, flags anything index.html
# loads that is not on disk, checks the image sheets, refuses duplicate
# filenames, and lists local tools that must stay out of the repo.
# Reads only. Nothing is written, moved or deleted.

emulate -L zsh
setopt no_nomatch

# 234 matches index.html, so the check below passes — and the deploy is
# still wrong. Eight files in the manifest CHANGED at v=234, so a browser
# holding the old ones keeps serving them and the two new activities load
# against an i18n.js with none of their strings. Bump index.html AND this
# number together before the next upload. Steven has not authorised the
# bump yet; it is the one thing blocking this build.
CACHE_VERSION=234
SHEETS=72

# --- files the site loads right now -------------------------------------
typeset -a LIVE
LIVE=(
"4aa371c7 257691 css/style.css"
"769c113f 24151  data/case.js"
"06c2e1be 15881  data/conj-sentences.js"
"22c6a507 225526 data/curriculum.js"
"1ed53fc2 5321   data/future.js"
"874540fc 6363   data/past.js"
"72165b1f 9669   data/pets.js"
"abec19ef 79336  data/petlines.js"
"d94c3d9f 119792 data/comics.js"
"caa6f3e5 16542  data/plurals.js"
"4a65dfb3 8942   data/position.js"
"0b14855a 115519 data/sentences.js"
"cfad9f87 94515  data/poems.js"
"620ea792 114065 data/songs.js"
"1b589ed7 90437  data/stories-short.js"
"ca77931d 121695 data/stories-medium.js"
"551cacd2 74750  data/reader-words.js"
"bb2a1bdf 97044  data/articles.js"
"c06d9c1a 62922  data/stories-long.js"
"f751129c 58717  data/tenses.js"
"4a549604 318248 data/vocab.js"
"565cc54d 9830   data/dictionary.js"
"929106b4 51237  data/song-words.js"
"bef4a418 18392  data/tanya-lessons.js"
"45faf051 78550  data/dialogues.js"
"b512c342 8756   data/butler-script.js"
"5b3798d2 9111   data/faces.js"
"c2b3d016 5686   index.html"
"06f040b5 4873   js/activities/awards-view.js"
"27fbaf05 22562  js/activities/catch-word.js"
"aa5270c6 16760  js/activities/conjugate-game.js"
"6e93f1e3 18697  js/activities/conveyor.js"
"cc8bf6bf 21454  js/activities/fill-blank.js"
"a69a6ff5 22902  js/activities/gender.js"
"0aaf2152 5907   js/activities/gameguide.js"
"ae32a1de 22426  js/activities/guesswho.js"
"dd13eacc 26950  js/activities/grammar.js"
"66787d55 22335  js/activities/lessons.js"
"211ef0b1 17361  js/activities/listen-pick.js"
"7e271a6d 18598  js/activities/mehrzahl.js"
"51f5b74e 22662  js/activities/placement.js"
"87af7100 17630  js/activities/progress-view.js"
"55a63393 26162  js/activities/reference.js"
"622d380a 34258  js/activities/reader.js"
"fa27dd1e 7544   js/activities/dictview.js"
"f4648e08 24851  js/activities/talkview.js"
"1f6d2da3 31918  js/activities/tanyalesson.js"
"55e45fa6 18071  js/activities/scramble.js"
"a5ff00f1 19836  js/activities/settings.js"
"59f38dad 19996  js/activities/songbook.js"
"89869202 14210  js/activities/songvocab.js"
"f5268270 9364   js/activities/readerwords.js"
"1d998995 31889  js/activities/listen-speak.js"
"09dcda4f 29746  js/activities/store.js"
"75932b22 36511  js/activities/comic.js"
"5ecc661c 17454  js/activities/jukebox.js"
"e31c9378 28820  js/activities/wordmatch.js"
"1ec71e8f 27269  js/activities/vocabgame.js"
"d23e5c4c 15900  js/activities/wo-wohin.js"
"a46e52f4 17934  js/activities/wrong-form.js"
"4462ee0d 43224  js/app.js"
"e486f62d 7469   js/awards.js"
"6b0c64e2 21229  js/coach.js"
"316b49c6 22251  js/coins.js"
"10d7968b 11158  js/conjugate.js"
"9c90d8a2 16950  js/endscreen.js"
"2a744be6 3736   js/build.js"
"58c28063 29751  js/events.js"
"9f35ffb1 8015   js/send.js"
"7589af31 5704   js/howto.js"
"37ad9723 208165 js/i18n.js"
"15855763 6797   js/lightbox.js"
"f3a23187 11499  js/nav.js"
"e23c4083 18721  js/packs.js"
"bef7eccb 5737   js/petart.js"
"5d6f0d8c 5089   js/facepic.js"
"45a9596f 8682   js/petstrip.js"
"14a9cdcb 6152   js/petvoice.js"
"7e0caeec 4524   js/player.js"
"828273a0 6442   js/progress.js"
"e9e61cef 5315   js/run.js"
"f36ab76c 12724  js/speech.js"
"81523b60 2930   js/sprite.js"
"63c5dc75 9430   js/text.js"
"ddaf105a 10523  js/wordlook.js"
"46c5bbca 6024   js/theme.js"
"cf3393c0 4324   js/purse.js"
"a48c8496 13961  js/welcome.js"
"ca2a40c1 26076  js/butler.js"
"e190b649 23463  js/tutor.js"
"6632aeb3 2506   js/verbtable.js"
)

# --- built and validated, but no code reads them yet. Copying them is
#     harmless; leaving them out costs nothing until the game that uses
#     them exists. -----------------------------------------------------
typeset -a PENDING
PENDING=(
"d8b98786 60807  data/pairs.js"
)

integer ok=0 stale=0 missing=0
typeset -a need

check(){
  local label=$1; shift
  local -a rows; rows=("$@")
  local row want size file got have
  print ""
  print $label
  print ""
  local shown=0
  for row in $rows; do
    want=${${(z)row}[1]}
    size=${${(z)row}[2]}
    file=${${(z)row}[3]}
    if [[ ! -f $file ]]; then
      printf "  MISSING  %s\n" $file
      (( missing++ )); need+=($file); shown=1
      continue
    fi
    got=$(md5 -q $file 2>/dev/null | cut -c1-8)
    if [[ $got == $want ]]; then
      (( ok++ ))
    else
      have=$(stat -f%z $file 2>/dev/null)
      printf "  STALE    %-34s yours %s (%s b)  current %s (%s b)\n" \
        $file $got $have $want $size
      (( stale++ )); need+=($file); shown=1
    fi
  done
  (( shown == 0 )) && print "  all present and current"
}

check "SITE FILES" $LIVE
check "BUILT BUT NOT YET USED  (optional — no game reads these yet)" $PENDING

print ""
print "  $ok up to date · $stale stale · $missing missing"

# --------------------------------------------------------------- cache --
print ""
print "CACHE VERSION"
if [[ -f index.html ]]; then
  local v=$(grep -o '?v=[0-9]*' index.html | head -1 | tr -dc '0-9')
  if [[ $v == $CACHE_VERSION ]]; then
    print "  index.html is ?v=$v — correct"
  else
    print "  index.html is ?v=$v — should be ?v=$CACHE_VERSION"
    print "  an old number here means browsers keep serving cached files"
  fi

  print ""
  print "REFERENCED BUT ABSENT — these 404 in the browser"
  integer gone=0
  local ref clean
  for ref in ${(f)"$(grep -oE '(src|href)="[^\"]+"' index.html | sed 's/.*="//;s/"$//')"}; do
    [[ $ref == http* ]] && continue
    clean=${ref%%\?*}
    if [[ ! -f $clean ]]; then print "  $clean"; (( gone++ )); fi
  done
  (( gone == 0 )) && print "  none"

  # The opposite mistake, and the one that actually bit us: a file copied
  # into place, listed in the manifest, present and correct — and never
  # referenced by index.html, so the browser never loads it and the
  # feature is silently absent. Everything above passes.
  print ""
  print "PRESENT BUT NEVER LOADED — the browser will not see these"
  # Built once, from the manifest, so the loop below cannot disturb it.
  typeset -a pendfiles
  pendfiles=()
  local prow
  for prow in "${PENDING[@]}"; do
    pendfiles+=("${prow##* }")
  done

  integer idle=0
  local jf jbase
  for jf in ${(f)"$(find js data -name '*.js' | sed 's|^\./||' | sort)"}; do
    jbase=${jf:t}
    grep -q "$jbase" index.html && continue
    (( ${pendfiles[(I)$jf]} )) && continue
    print "  $jf"
    (( idle++ ))
  done
  (( idle == 0 )) && print "  none"
else
  print "  index.html not found in this folder"
fi

# -------------------------------------------------------------- images --
print ""
print "IMAGES"
if [[ -d images ]]; then
  typeset -a gaps
  integer i
  for (( i = 1; i <= SHEETS; i++ )); do
    [[ -f images/$i.webp ]] || gaps+=($i)
  done
  integer count=$(ls images/*.webp 2>/dev/null | wc -l)
  print "  $count webp files, expecting $SHEETS"
  # a leftover jpg means a sheet was converted and the original not removed,
  # or a sheet was never converted at all. Either way the browser now asks
  # for .webp and will 404.
  integer old=$(ls images/*.jpg 2>/dev/null | wc -l)
  (( old )) && print "  $old jpg files still here — the app asks for .webp now"
  if (( ${#gaps} )); then
    print "  missing: ${(j:, :)gaps}"
  else
    print "  sheets 1 to $SHEETS all present"
  fi
  integer highest=$(ls images/*.webp 2>/dev/null | sed 's|.*/||;s|\.webp||' | sort -n | tail -1)
  (( highest > SHEETS )) && \
    print "  images/$highest.webp exists — ahead of what this build knows about"
else
  print "  no images folder here"
fi

# --------------------------------------------------------------- comics --
# 46 comics in two editions is 92 files, and the audit was blind to every
# one of them. A missing German page falls back to English silently, so
# nothing on screen would tell you a batch had not been uploaded.
#
# The expected list comes from data/comics.js, so adding a comic to the data
# adds it to this check with nothing here to update.
print ""
print "COMIC PAGES"
if [[ -d images/comic ]]; then
  # `missing` used to be reused here, which QUIETLY WIPED the counter set
  # by check() — it is an integer up there and an array down here, so the
  # summary computed `stale + 0` and said "Copy these 10" above a list of
  # 13. Renamed. The list was right and the number was wrong, which is the
  # worse way round.
  typeset -a want gone loose
  want=(${(f)"$(grep -oE 'unit: *[0-9]+, *comic: *[0-9]+' data/comics.js 2>/dev/null |
                 sed -E 's/unit: *([0-9]+), *comic: *([0-9]+)/\1 \2/' |
                 while read u c; do printf '%02d-%02d\n' $u $c; done)"})
  if (( ${#want} == 0 )); then
    print "  could not read the comic list out of data/comics.js"
  else
    integer ok=0
    local ed id
    for ed in eng deu; do
      gone=()
      for id in $want; do
        [[ -f images/comic/$ed/comic-$id-$ed.webp ]] || gone+=($id)
      done
      integer have=$(( ${#want} - ${#gone} ))
      (( ok += have ))
      if (( ${#gone} )); then
        print "  $ed: $have of ${#want} — missing ${(j:, :)gone}"
      else
        print "  $ed: all ${#want} present"
      fi
    done
    # Loose files in images/comic/ mean sort-comics.sh has not been run and
    # every one of them 404s, because the app looks in the subfolders now.
    loose=(images/comic/comic-*.webp(.N))
    (( ${#loose} )) && \
      print "  ${#loose} file(s) still loose in images/comic/ — run sort-comics.sh"
  fi
else
  print "  no images/comic folder here"
fi

# --------------------------------------------------------------- audio --
# A song whose file is absent hides its player and says nothing, which is
# the right behaviour in the app and useless here — the song looks finished
# and is silent. Names come from data/songs.js, so a rename on either side
# shows up as a miss rather than as a quiet nothing.
#
# Ogg is fine. This block used to demand an .m4a beside every track on the
# grounds that Safari had no Vorbis decoder. It has one, on the Mac and on
# the iPhone, and both were tested. .ogg alone counts as done.
print ""
print "AUDIO"
if [[ -f data/songs.js ]]; then
  typeset -a stems
  stems=(${(f)"$(grep -oE "audio: *'[^']+'" data/songs.js | sed "s/.*'\\(.*\\)'/\\1/")"})
  if (( ${#stems} == 0 )); then
    print "  no audio names found in data/songs.js"
  else
    # `playable` rather than `have`: check() up at line 101 already
    # declares `have` as a local string, and redeclaring the same name as
    # an integer is the other half of the bug that printed 'base=…'.
    integer playable=0 nofile=0
    local st
    for st in $stems; do
      if [[ -f audio/$st.ogg || -f audio/$st.m4a ]]; then
        (( playable++ ))
      else
        print "  MISSING   audio/$st — the player hides itself and says nothing"
        (( nofile++ ))
      fi
    done
    print "  ${#stems} songs · $playable playable · $nofile with no file"
  fi
  # a track on disk that no song asks for: a rename that only went one way.
  # `af` and `astem` rather than `f` and `base`: those two names are used
  # further down as well, and re-declaring them local in the same scope
  # makes zsh echo the assignment — which is why 'base=…' and 'f=…' turned
  # up in the middle of the report.
  if [[ -d audio ]]; then
    local af astem
    for af in audio/*.(ogg|m4a)(N); do
      astem=${${af:t}:r}
      (( ${stems[(I)$astem]} )) || print "  ORPHAN    $af — no song in songs.js asks for this"
    done
  fi
else
  print "  data/songs.js not found"
fi

# ---------------------------------------------------------- duplicates --
# Two files sharing a name in different folders is banned outright. It has
# broken this site twice — data/vocab.js against an activity also called
# vocab.js, then data/songs.js against an activity also called songs.js.
# Whichever loads second wins and the first silently does nothing.
print ""
print "DUPLICATE FILENAMES"
typeset -a names
local base
for base in **/*.(js|css|html)(N); do
  [[ ${base:t} == (image-audit.html|image-audit-1.html|sheets-*|new-sheets.html|test-*|hear-test.html) ]] && continue
  names+=(${base:t})
done
integer clash=0
local nm hit
for nm in ${(u)names}; do
  integer c=${#${(M)names:#$nm}}
  if (( c > 1 )); then
    print "  BANNED: $nm appears $c times —"
    for hit in **/$nm(N); do print "     $hit"; done
    (( clash++ ))
  fi
done
(( clash == 0 )) && print "  none — every filename is unique"

# --------------------------------------------------------------- local --
print ""
print "LOCAL TOOLS — keep these out of the repo"
integer tools=0
local f
# `make-sheets.py` used to be named here as well as caught by *.py, so it
# printed twice. Collected first and deduplicated, which also means adding
# a pattern can no longer overlap an existing one.
typeset -a tool
tool=()
for f in *.md *.py *.json image-audit.html image-audit-1.html sheets-*.html new-sheets.html test-*.html hear-test.html usage.html categorise.html audit.sh verify.sh place.sh name-faces.sh sort-comics.sh gen-coding-doc.py gen-map.py; do
  [[ -f $f ]] && tool+=($f)
done
for f in ${(uo)tool}; do print "  $f"; (( tools++ )); done
(( tools == 0 )) && print "  none present"

# ------------------------------------------------------------- summary --
print ""
# Counted from the LIST, not recomputed from the counters. The list is what
# this line describes, so anything that disturbs a counter can no longer make
# the number lie about it.
if (( ${#need} == 0 )); then
  print "Everything matches."
else
  print "Copy these ${#need}:"
  for f in $need; do print "  $f"; done
fi
