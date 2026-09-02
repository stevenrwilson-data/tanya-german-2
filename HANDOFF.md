# DO NOT RESPOND OR PROCESS ANY FILES AT ALL UNTIL ALL FILES ARE UPLOADED. NO DELAYS, NO THINKING, NO EVALUATING ANYTHING WHATSOEVER. YOUR JOB IS TO PASSIVELY ACCEPT FILES WITH ZERO PROCESSING TIME UNTIL ALL FILES ARE PRESENT.

---

# ⛔ EVERY FILE. EVERY BUILD. UNTIL A CLEAN AUDIT.

**Any file you create or touch goes into EVERY SUBSEQUENT DROP until Steven
shows you a clean audit. A file left out of even one drop is DELETED and
rebuilt from zero.**

This is not a preference. Read it before you write anything.

    You assume he has NOTHING until a clean audit says otherwise.
    Not "he probably has that one." Not "that one hasn't changed."
    EVERY file you hold, in EVERY drop, EVERY time.

**Why it is this severe.** Three files — `butler-script.js`, `purse.js`,
`endscreen.js` — sat in the working copy for hours across several drops and
were never handed over, because each time it seemed obvious he already had
them. He didn't. The site 404'd on two of them. He found it by running the
audit, not because anything warned him.

A file in the working copy that is not in his repo is a file that exists
only here, and everything built on top of it is built on sand.

**AND THIS FILE IS ONE OF THEM.** On 01 Sep it went into every drop for a
whole session and was never once UPDATED — so every copy handed over was
stale, and the next session would have read a description of the state
before that day's work. Including it is not the same as maintaining it.
Update `## Session state` and the dated section in the SAME edit that
changes the code, not at the end of the day.

**The rule, mechanically:**

1. Before every `present_files`, list the ENTIRE working copy.
2. Hand over all of it. Size is not a reason to trim.
3. A file omitted from a drop: DELETE IT and rebuild from zero.
4. Only a clean audit from Steven resets the tracking.

`an/shipcheck.py` does step 1 and 3. Run it before every drop.

---

---

# Deutsch für Tanya — handover

Paste this at the start of a new thread.

---

## WHAT EVERY QUESTION IS FOR

The site teaches German, and later some other second language. **Every
question is judged by one thing: does it move that needle.** There are
exactly two ways it can, and a question does one of them, never both.

**1. It needs the passage.** She cannot answer without having understood the
German text. Translating the question costs nothing, because the
comprehension already happened upstream, in the reading. Leave it unmarked.

**2. It is answerable from prior knowledge — asked in German anyway.**
"Which two fish are popular for sushi?" with four German fish names is
answerable by anyone who has eaten sushi. Read in German it is still an
exercise: reading the question and the options IS the whole of it.
Translate it and nothing is left. Mark it `inL2:true`.

Both are legitimate. **`inL2` is not a criticism of a question** — it says
which of the two jobs it is doing. Named `giveaway` first, which read as
"this question is flawed"; renamed while there were eleven of them rather
than a hundred.

**TRANSLATION IS NEVER BLOCKED, ANYWHERE IN THIS APP.** It sometimes costs
the credit, and the price is always stated before she pays it, never after.
A penalty discovered on the end screen is a trap; a penalty agreed to is a
choice.

The same asymmetry runs through the Reader generally: the WORD LIST is free,
the passage translation rests the questions five days, and a marked question
forfeits only itself. The cheap path is always the one that builds
comprehension.

---

## NEVER WRITE A NAME YOU HAVE NOT READ

Three times in one day I wrote code against an interface I had not opened.
Needed a field name or a signature, did not look, wrote what I expected. It
parsed, it ran, it was wrong.

    songs.js      wrote `sections:`, the file says `secs:`
                  song 9 shipped with a title and a blank page

    vocab.js      read `v.img` instead of calling packs.imgOf()
                  reported six broken entries that were fine, then
                  "fixed" them

    endscreen.js  invented `onAgain`, `onDone`, and a tone called `try`
                  none of them exist

**There is no safety net for this.** Steven cannot find these by using the
site — 773 words, nine songs, twenty dialogues, forty-six comics, fifty
reading pieces, twenty-eight activities. He will not exercise a fraction of
it. And Tanya cannot report them, because a blank page does not look like a
bug to her, it looks like something she did wrong.

So a bug of this kind does not get found. It sits there.

**The fix is to not code like that. Ever.**

Open the file. Read the name. Then write it. Every field, every key, every
class, every option, every function signature. "I am fairly sure it is
called X" means go and look.

This is not a rule that trades off against speed. Reading the file is
faster than shipping the bug.

---

## Session state

Cache `?v=234` — **NOT BUMPED, AND IT IS THE LAST THING BLOCKING EVERYTHING
BELOW.** 91 files in the manifest. **Event schema v7.**

Audit was clean at the end of 01 Sep: 91 up to date, 0 stale, 0 missing, no
404s, nothing unloaded. Files touched after that clean audit go in the next
drop; nothing else does.

### Outstanding, in the order they cost the most

**1. `?v=235`.** Roughly forty files changed on 01 Sep and her browser
serves the copies it already has. `style.css` carries every contrast fix of
that day and `speech.js` carries the two-voice and slow-pass fixes. Until
the bump none of it reaches her. `index.html` and `CACHE_VERSION` in
`audit.sh`, one word from Steven.

**2. Cloudflare, not yet created.** `functions/api/log.js` is written and
`send.js` points at `/api/log`. It needs a KV namespace bound as `GH_LOG`
and an env var `GH_TOKEN` matching `TOKEN` in `send.js`. Without them the
endpoint returns 204 and drops the payload — nothing breaks, nothing is
kept.

**3. Audio for the two new songs.** `noch-fuenf-minuten` and
`ihre-fuenf-minuten` have lyrics and no files. The player hides itself.

**4. 76 webp files where 72 are expected.** Four images in `images/` have
non-numeric names and nobody knows what they are.
`ls images/*.webp | grep -vE 'images/[0-9]+\.webp$'`

**5. 228 song/reader word entries carry `want:'def'`** — a gloss but no
definition. The card works and is thinner than intended.

**6 and 7 — BOTH RESOLVED 01 Sep, and the resolution is worth keeping.**

The comment in `pets.js` saying the legendaries "cannot be bought at any
price" was STALE, not a bug. Steven's rule as stated: *x days of repeated
effort and some achievements along with earned currency.* The money is real
and every condition holds on top of it. The comment had been standing long
enough that `earned()` was read against it and looked broken when it was
not — a stale comment is worse than none, because it gets believed.

`need.now` WAS unenforced, and by more than the legendaries: **11 pets used
it and nothing read it.** Rares and epics too. Now checked in `earned()`
and stated in `needText()` — enforcing something the shelf never mentions
would be worse than either alternative, and the store panel had been
honestly displaying `Run right now: 0 of 30` while letting the purchase
through.

The two halves ask different questions on purpose. `run` is whether she has
EVER sustained it, banked so illness at day eighty-nine does not destroy
three months. `now` is whether she is sustaining it at the moment of buying.
Together they close the walk-away hole — bank ninety days, vanish for three
months, come back and spend saved Kronen on the rarest thing in the app —
while never sending her back to zero for being ill. A legendary is evidence
of a habit, and a habit is present tense.

---

## THE BUTLER IS BUILT AND COMPLETELY EMPTY

`js/butler.js` is written and loaded. `app.js` calls `offer()`, `store.js`
calls `handover()` in two places, `nav.js` has a resume hook. All wired.

**`data/butler-script.js` contains ZERO strings.** Every slot is empty:
`name`, `portrait`, four button labels, `offer.line`, `offer.no`,
`refuse.line`, `refuse.yes`, `refuse.no`, **`tours[]` is an empty array**,
`handover.first` with 16 pet lines, `handover.leave` with 16 more.

He never appears because he has nothing to say. `handover()` returns
silently on an empty pet line, which is why buying a pet works at all.
Roughly 45 slots of character writing, Steven's to fill.

---

# 01 SEP 2026 — what changed

**Event schema v6 → v7.** The answer row is now

    t | game | key | ok | dev | level | think | chose | timing

`chose` is what she picked, on RIGHT ANSWERS TOO — a correct answer's choice
is derivable from the key only by joining against vocab.js, and only for
some games; stored, the row is self-contained. Pipes are stripped to `/`
because the row is pipe-delimited. Five games supply it: gender (the
article), wo-wohin (the form), conveyor (the bin), listen-pick (the word she
confused it with, plus `timeout` as distinct from a wrong pick), placement
(noun or slot). The other nine were left alone: in fill-blank and scramble
"wrong" and "typed something else" are the same information.

`timing` is `q` or `g`. **`events.shown()` is new** — a game calls it when
the question goes up and `think` runs from there instead of from her last
answer, which used to include whatever the app did in between. In
listen-pick the old measure was mostly the audio; it now times from the
FIRST PLAY, not the paint. Conveyor stays on the gap deliberately: a moving
belt has no moment a question appears. The field records which measure it
was, so the two are never compared as if they were the same.

### New activities

**Listen and Speak** — `js/activities/listen-speak.js`, the pronunciation
lab. 2,584 lines harvested from poems, stories, songs and the 1,584 vocab
example sentences. Hear it normal/slow/normal, record, compare five ways.
Six lines counts as one exercise, and a line only counts when heard AND
recorded AND played back. **Needs https for the microphone** — `localhost`
works, `192.168.x.x` does not, and the screen says which of the two
problems it has hit.

**Word Matching and Jukebox HAD NO SCRIPT TAGS** until 01 Sep. Both were on
disk and invisible to the browser for the whole time they existed. The audit
caught it under PRESENT BUT NEVER LOADED; nothing else would have.

### New data

`data/stories-medium.js` — **the `GH_MEDIUM` tier reader.js had always
declared and nothing ever filled.** 21 stories, 12 lines, 6 questions each.
Every `tap` was converted from the source's 1-based "Line 5" to a 0-based
index and range-checked; an off-by-one there does not throw, it silently
marks the wrong line correct.

`data/reader-words.js` + `js/activities/readerwords.js` — a word list per
reading piece, all 58. **Free, unlike the translation, which rests the
questions five days.** That asymmetry is the design: the cheap path builds
comprehension. 812 references resolve to 457 distinct words and 191 were
already in the bank, 163 with a picture — it is mostly the words she is
already drilling, met in context.

`data/poems.js` 3 → 12. `data/songs.js` 9 → 11 (the five-minutes pair, with
`pair:` and `voice:` so they render together). `data/song-words.js` +63
entries. `data/petlines.js` +4 bands × 16 pets.

### THE BUG THAT BIT FOUR TIMES IN ONE DAY

A cream surface inside a dark card, with text still coloured for the card.
Invisible text. It hit the Wo-oder-wohin grammar page, the conveyor bins,
the Jukebox song list and the Word Matching quiz board.

**My first automated sweep for it was WRONG** and let my own new code
through: it skipped any rule mentioning `--fg`, assuming that meant the rule
declared its ink. `.jb-song` mentions it as a CONSUMER — `color:var(--fg)`.

**The rule that actually holds:** an opaque light background —
`var(--paper)`, `var(--sand)`, `var(--sand-wash)` — must DECLARE `--fg:`,
not merely read it. The list in style.css is now 73 selectors and zero
opaque light surfaces are left without one.

**And the inverse:** a modifier that replaces an opaque light background
with a SEMI-TRANSPARENT tint goes dark over a dark card while the ink stays
dark. Composite it — `linear-gradient(tint, tint), var(--paper)` — which is
the pattern `.pt-rare` already used.

### ARTICLES — a fourth reading tier

`data/articles.js` / `GH_ARTICLES`. Two pieces — `ar-01` cheese, 26 lines,
and `ar-02` sushi, 29 lines — 12 questions each, worth **25** and asking
**THREE** questions rather than two.

**`ASK` used to be one number for the whole reader.** That was right while
every tier was one or two screens; two questions on 26 lines is a spot check
rather than comprehension. A tier may now set `ask:` and the rest do not
have to know — `askFor(sec)` falls back to 2.

Why a tier and not its own activity: the five-day translation rest only
works because the word list is free while the translation is expensive, and
an article is exactly where she reaches for the translation. Rebuilding that
asymmetry elsewhere costs more than adding a tier. The jump row, the
vocabulary list and the question kinds all came free.

**FIVE articles now:** cheese, sushi, Berlin parks, makeup, Berlin lakes.
139 lines, 60 questions, 11 marked `inL2`. Topics: food 2, places 2,
beauty 1.

ar-05 needed NO inL2 marks — every question requires the text. Worth saying
because it shows the rule is about the questions, not the topic.

### Translation is never blocked. Sometimes it costs the credit.

Steven's rule, and it is the right test: **if you still have to understand
the article after translating, there is no penalty.** If the answer is
available without the article — from the word itself or from general
knowledge — then the German comprehension IS the exercise, and translating
removes the only thing being tested.

A question sets `inL2:true`. It then renders in German whatever the
interface language, with a "Translate the question" button that **warns
first**: this question will not count. She may translate anyway. That
question scores nothing; the other two are untouched.

PER QUESTION, NOT PER PIECE. The first version was per piece and it was
wrong — only three of the makeup article's twelve are trivialised this way,
and penalising "why clean your face before makeup and again before bed?"
would punish reading. **11 of 48 flagged, 37 free.**

The end screen gives voided answers their OWN ROW — "right, but translated"
— rather than counting them wrong. She did answer correctly; saying
otherwise would be a lie. It simply did not score, which is what she agreed
to.

Examples of the rule in use: "Which cheese is grated over pasta?" is
general knowledge (flagged). "What is the joke in the final sentence about
Limburger?" needs the article (free). "Which product goes on the eyelids?"
is free in English because *eyeshadow* says eye-shadow (flagged) — though
its four options are all loanwords on purpose, so it is a real question in
any language.

Its 37-word list needed 22 new entries. `der Gouda` was referenced and
defined nowhere on the first pass — caught by the resolver check, which is
the reason that check runs on every drop.

### Six sushi and cheese stories — the short tier is no longer 5 lines

`ss-41` to `ss-46`, SIX lines each and SEVEN questions. Nothing in
reader.js enforced five; five was a convention across the original 25, not a
rule, and the reader draws two questions at random from whatever bank it
finds. They are also the first short stories with `mc` and `tf` in them —
the original 25 are 125 `tap` questions and nothing else.

**All 42 questions arrived as open-ended prose** — "What does Anna order for
dinner?" — and were converted, same as the poems and the medium stories. The
Reader still has no free-text kind and this is the fourth batch that has hit
that wall. Worth deciding whether to build one rather than converting a
fifth time.

Vocabulary: 60 references, 56 distinct, and **29 already existed** across
vocab.js, song-words.js and reader-words.js. 27 new entries. All six pieces
tagged `cat:'food'`, which makes them the first content the topic filter
could act on — three sushi, three cheese.

### Listen and Speak showed no meaning at all

The harvest kept only the German and the source title, so the screen showed
a sentence and the name of the story it came from and NOTHING about what it
meant — she was practising the pronunciation of something she might not
understand. Every source had all three languages; it cost nothing to keep
one. Shown always rather than behind a reveal: this is a pronunciation
screen, not a comprehension test. The WHOLE line's meaning even when
practising a two-word chunk, because "und die Autos" does not mean anything
on its own.

**Both lines are LABELLED**, and that was the actual confusion: two bare
lines under a German sentence are two guesses, and "The Red Traffic Light"
was being read as a translation of "Die Ampel wird grün". Now
`TRANSLATION: …` and `FROM THE STORY: …`, with the label naming the KIND of
source — poem, story, song, or the word an example belongs to — because a
song line and a story line are said differently.

**And the song harvest was reading rows the song does not use.**
`s.lines` is an inventory, not a lyric: `das-lied-zweier-herzen` holds
Russian verses tagged `only:'ru'` belonging to NO section, which no songbook
view renders. Scraping them produced "12 lines with no English" and looked
like a data fault when it was a harvesting fault. Now walks the SECTIONS,
like the songbook does — 446 usable lines of 463 rows, and zero without a
translation.

### The streak now decays instead of resetting

**It used to reset to 1.** Miss one day at day eighty-nine and three months
were gone from the number she looks at every day. `bestRun` banked the peak
so the pets stayed reachable, but the visible number went to zero.

Now it decays, and **the rate SLOWS the longer she is away** — the opposite
of a punishment curve, deliberately. The first days off cost least because
the first days off happen to everyone.

    days 1 to 3      1 a day
    days 4 to 11     2 a day
    day 12 onward    3 a day, and never more

A 90-day run survives a long weekend at 87, a fortnight at 68, a month at
14.

**FREE PASSES.** One earned per ten consecutive days. **One pass absorbs up
to THREE days off**, spent automatically before any decay is calculated.
Bank up to **five** — 15 days of cover, a fortnight rather than five days,
which is what makes them feel like protection rather than small change.
Over the cap the next one arrives as **300 Kronen** instead, so a long
unbroken run is never wasted.

Simulated: 30 straight days earns 3 passes, so 3 days off costs nothing and
the run continues to 31. 60 straight fills the bank and pays 300. 100
straight pays 1,500 on top.

A pass is spent WHOLE — one day off uses the same pass as three. Not hoarded
on her behalf: deciding for her that one day "is not worth a pass" would let
the streak fall while protection sat unused.

Spent silently, not asked about — a dialog saying "use a pass?" on the
morning she already feels bad about missing makes her feel worse.

`settle()` is called before every READ and every WRITE of the run, so the
number is never stale: a streak that decayed while she was away must not
look healthy until she happens to finish a round.

**STILL TO DO: nothing shows her any of this.** The strings exist —
`skRule`, `skPassRule`, `skPassHave`, `skPassUsed`, `skFell`, `skFellWhy`,
`skIntact` — and `coins.settle()` returns `{missed, used, lost, was, now}`
for the hub to say it once. The hub does not call it yet.

### Other fixes worth remembering

**Guess Who was a trap with no exit.** `paint()` started a round when there
was none; Back cleared the round and called `paint()`. Back began a fresh
game, for ever. Two comments in the file disagreed about whether the chooser
existed.

**The dialogues played one voice** however many were installed. `voice2` was
`de[1]` — the next ROW, not the next distinct voice. macOS lists a voice
once per quality, so `de[0]` and `de[1]` were usually the same person.

**The slow pass in Listen and Speak was being truncated.** `utter()`'s
safety net was `1200 + length * 110`, calibrated for rate 0.85. At 0.52 the
audio takes 1.6× longer, the net fired mid-sentence, and the next pass
cancelled it. Now scaled by the rate.

**`GH.welcome.reset()` cannot show the onboarding** and never could.
`due()` has THREE gates: the flag, a name on the profile, any lifetime
Kronen. Every account worth testing on fails the last two. **`force()`** is
new and skips `due()` entirely. Settings has both, plus a wipe that clears
all 42 `gh-` keys by prefix — not by list, because a list goes stale and
looks complete.

**`TO_TOPIC['word'] = 'plural'`** sent every recognition miss to the Plurals
page. Removed.

**The comic reader ignored the edition.** `german()` returned `line.de`
whatever was on screen, so "English edition" changed the drawing and left
the text German. All 520 lines have all three languages now, so the toggle
flips which language is the exercise and which is the answer.

**`pkJobs` existed in no language; `pkSchool` in Russian only.** So one
printed a raw key and the other showed Russian in the German and English
interfaces. A sweep of all 1,184 keys across the three blocks found no other
gap — worth adding to `audit.sh`, since nothing fails loudly.

**Word Matching's listening picture was a poster** — sized only in viewport
units, so 640px on an iPad. Capped at 340px. A sweep found no other element
growing without a pixel ceiling.

**`audit.sh` was lying about its own count** — "Copy these 10" above a list
of 13. `typeset -a want missing loose` in the comic check redeclared the
integer counter as an array. The copy line now counts `${#need}`, the list
itself.

---

# ⚠ HER PROGRESS WILL BE DELETED. THIS IS NOT HYPOTHETICAL.

**Safari deletes a site's entire localStorage after 7 days of no
interaction with it.** Apple's Intelligent Tracking Prevention, since iOS
13.4. It takes localStorage, IndexedDB, SessionStorage and Service Worker
registrations, and it applies to EVERY browser on iOS because Apple
requires them all to use WebKit.

So: Tanya grinds two months for a legendary pet, has a busy week, opens the
app and it is empty. No warning. Nothing recoverable. Every scheduler card,
the purse, the pets, the streak, gone.

Everything in this app lives in localStorage. All 41 keys.

### A LOCAL RECYCLE BIN DOES NOT HELP

Steven's first instinct was to keep deleted accounts in localStorage for
three months. **It protects against the wrong thing.** Safari wipes the
whole origin in one action — the backup dies in the same event as the live
account. It only helps if she deletes a profile deliberately and regrets
it, which is real but far rarer than a busy week.

### WHAT ACTUALLY SURVIVES, in order of value per hour of work

**1. ADD TO HOME SCREEN.** Home screen apps are not part of Safari and have
their own days-of-use counter — they are exempt. This is the single biggest
protection in the whole list and it costs one screen of words in
onboarding. Do this first. `js/welcome.js` already has the frame; it needs
a fifth screen saying how and why.

**2. EXPORT AND IMPORT.** A button that dumps every `gh-` key as text she
can save or message him, and one that restores it. The only backup that
does not need a server. Cheap.

**3. CLOUDFLARE — the account lives on the server.** Decided. `js/send.js`
already uploads once a day; two things are missing:

    the payload carries the event log and a coin summary, NOT the account.
    It needs gh-sched-v1, gh-coins-v1, gh-pets-v1, gh-progress-v1,
    gh-players-v1, gh-packs-v1, gh-awards-v1.

    there is no IDENTITY. `device_id` is random, so when storage is wiped
    the id goes with it and the server cannot tell which row was hers.

**The identity design, decided: A CODE SHE WRITES DOWN.** The app generates
something like `TANYA-4F7K`; typing it on a new device restores everything.
No email, no password, nothing to forget but a card in her purse. Four
lines of Worker code and one screen in the app. Rejected: name + PIN (a PIN
is a thing to forget), magic links (needs email sending).

D1 free tier carries this easily — 5GB, 100,000 writes/day, against about
two writes a day.

**4. A recycle bin for deliberate deletions.** Steven's original idea,
worth building AFTER the above, because it solves the smaller problem.

---

# TO BUILD — the listening loop

Hands free. German, her language, German again, next word. She can put the
phone in her pocket.

**Nothing else in the app works without her eyes and a free hand.** On a
bus, doing dishes, walking to the Amt, every current activity is unusable.
This is the one that fits the rest of her day, and that makes it worth more
than its size suggests.

### Shape, decided

    de → L1 → de → short pause → next word
    minimal pause; continuous, not step-by-step
    length: X words | Y minutes | until she stops
    scope: everything, or one or more chosen topics

### What it needs from what already exists

    GH.speech.say()        already handles de and her language
    GH.packs.vocab()       the word source, with pack state applied
    GH.tutor.due()         so it can favour what she is about to forget
    catsOf()               for the topic filter
    endScreen.render()     the finish, like every other activity

**Topic scope is blocked on the tagging.** 470 of 619 drawn words have no
topic, so "pick a subject" would offer about 20 real categories and most
words could not appear. Everything-mode works today; ship that first.

### The decisions still open

**Does it grade?** Pure listening earns no kronen and teaches the scheduler
nothing. Either it stays a rest activity outside the economy, or each word
counts as a `look` the way the dictionary does — which would pull words
forward in the queue without claiming she answered anything. The second is
probably right but it is Steven's call.

**Does the screen stay on?** A continuous loop with the phone locked needs
the Wake Lock API, or iOS stops the audio when the screen sleeps. Without
it she has to keep the screen awake herself, which defeats "in her pocket".
Test this early — it may constrain the whole feature on iOS.

**Which words, in what order?** Due-first is the obvious answer, but a loop
she cannot follow is worse than one that is too easy. Consider starting
with words she already knows and mixing due ones in.

---

### Do not ship to Tanya without at least 1 and 2

An app that silently eats two months of work is worse than no app. She will
not blame Safari.

**FIXED — the back button. It was NEVER sticky, anywhere.**

`position:sticky` only holds while the element's PARENT is in view. All 42
back links sit inside `.practice-head`, `.cm-bar` or the view itself, and
**`.practice-head` had NO CSS RULE AT ALL** — a plain block exactly as tall
as its contents. The header scrolled off and took the button with it.

Not a partial failure. It could never have worked, in any browser, on any
screen. It looked fine on a phone only because the screens are short.

**The v214 comment claimed this was verified.** It checked for an `overflow`
ancestor — a real sticky failure, but not this one — and never tested the
parent height. A check that does not test the thing that breaks is worse
than no check: it stops anyone looking again.

### What was verified this time, by command

    no containing-block creator on ANY ancestor of .backlink
        html, body, main, #view, .practice-head checked for transform,
        filter, backdrop-filter, perspective, will-change, contain.
        NONE. position:fixed will anchor to the viewport.

    .practice-head has zero CSS rules            confirmed — this is the proof
    39 of 39 .practice-head get a back link      so padding it is always right
    42 back links, all carrying class .backlink  cm-exit and cm-back have no CSS
    the two comic links are on different screens paintIndex vs paintComic
    left offset == main's own padding            exact at 390–2560px, 8 widths
    .cm-bar and .cm-intro later rules            set margin, not the same
                                                 property. No conflict.

### No `:has()`

The first attempt used `main:has(.backlink){ padding-top }`. `:has()` is
missing from Safari before 15.4 and Firefox before 121, and the fallback
there is the title tucked under the button on **every screen in the app**.
A layout that depends on a recent selector is a layout broken on someone's
phone.

Replaced with padding on the three real containers, which cover all 42.

### What is NOT verified

Actual rendering. There is no browser here. Everything above is the CSS
cascade and the DOM structure read from source — which is what was wrong
last time, and is now right — but the final check is opening it.

**FIXED — the back button. It was NEVER sticky, on any screen.**

`position:sticky` only holds while the element's PARENT is in view. All
forty-one back links are created inside `.practice-head`, which has NO CSS
rule at all — a plain block exactly as tall as its contents. So the moment
the header scrolled off, the parent went with it and took the back link
along.

Not a partial failure. It could never have worked, in any browser, on any
screen. It looked fine on a phone only because the screens are short.

**The v214 comment claimed this was verified.** It checked for an `overflow`
ancestor — a different failure — and never tested the parent height, which
is the one that was actually wrong. A check that does not test the thing
that breaks is worse than no check: it stops anyone looking again.

    was   position:sticky; top:8px      inside a header the height of a button
    now   position:fixed                out of the flow entirely

**Anchored to the CONTENT COLUMN, not the viewport edge.** `main` is 900px
centred, so a button pinned left on a wide desktop would float a hand's
width from anything it belongs to. Verified against main's own padding sum
at eight widths from 390 to 2560 — exact at every one.

`main:has(.backlink){ padding-top:52px }` reserves the space, at the
container rather than per header, because the link is created in
twenty-seven files inside twenty-seven parents. The hub has no back link and
gets no padding.

**Also — the audit now checks the comic pages.** 46 comics in two editions
is 92 files and it was blind to all of them. A missing German page falls
back to English silently, so nothing on screen would have told him a batch
was not uploaded. It also catches files left loose in `images/comic/` by a
`sort-comics.sh` that was never run.

**FIXED — onboarding left her on a blank page**

`hub()` empties the view on its first line, then asks the welcome whether it
is due, and RETURNS if it took over. Every line that fills the hub sits
below that return.

So the sequence was: empty the view, run the four welcome screens, hand to
the butler — and the hub was never drawn. She typed her name and the entire
site vanished.

    was   GH.welcome.open(function(){ if (GH.butler) GH.butler.offer(); })
    now   GH.welcome.open(hub)

Calling `hub()` again is the fix. The welcome is not due the second time
through, so it falls past that line, paints normally, and offers the butler
at the end like any other visit. One code path, not two.

**FIXED — the welcome screens were unreadable**

Transparent card, hub showing through it, heading in dark ink on a dark
surface. Every part of that was avoidable and every part came from the same
mistake: **I invented a card instead of using the one the app already has.**

    .wc-card   was  background:var(--card)  — which is semi-transparent
                    and no `color` at all
    now        wears `.card`, which is opaque, declares its own ink, and is
               already correct in all twelve themes

**And every light chip inside it was missing half its ink declaration.**
`color:var(--ink)` alone is not enough — anything inside still inherits
`--fg-soft` from the page, a pale colour meant for a dark background. The
pattern used everywhere else, and now here, is to remap BOTH:

    --fg:var(--ink); --fg-soft:var(--ink-soft);
    color:var(--fg);

Applied to `.wc-lang`, `.wc-input`, `.wc-gender`, `.wc-btn`. This is the
same failure as the 34 contrast fixes in v200 and it happened again because
new surfaces were written from scratch rather than copied from a working
one.

The scrim also went from .72 to .92 — this is the first thing she ever sees
and a hub bleeding through the question is noise, not context.

**Changed — one comic folder per edition**

    images/comic/eng/comic-01-01-eng.webp
    images/comic/deu/comic-01-01-deu.webp

Forty-six comics in two languages is ninety-two files in one directory; five
chapters and three languages is several hundred, and a folder that size is
unusable for the person putting pictures into it.

The suffix stays in the filename even though the folder now says it — it
costs nothing, a file dragged out of its folder is still identifiable, and
nothing has to be renamed.

`sort-comics.sh` moves the existing loose files into place. It MOVES rather
than copies, because there is no second copy of these, so: nothing without
`--go`, a file whose destination exists is left where it is and reported
rather than overwritten, and anything not matching the comic naming is left
alone. Tested including the collision case — both copies survived.

**A bug found while testing it:** `${#$(print -l $d/*.webp)}` counts
CHARACTERS, not files, so six files were reported as 227. Use an array.

**Added — the German comic edition is wired**

    images/comic/comic-01-01-eng.webp
    images/comic/comic-01-01-deu.webp

`EDITIONS = ['eng','deu']`, so the lettering toggle now appears. The
machinery was already built for this and only needed the second entry.

**It opens in her language.** German interface opens the German edition,
Russian and English open the English one — she chose that on the first
screen and this is the same preference, not a separate question. Her own
toggle overrides it for the session.

**A gap falls back once, not to an error.** The German edition arrives comic
by comic; a missing page shows the English one instead, because an English
page is far more use than a message saying there is no picture. The index
thumbnails do the same, so the German edition is not hidden behind opening
a comic first.

Before any `-deu` files exist, set `EDITIONS` back to `['eng']` and nothing
asks for a file that is not there.

**FIXED — the butler locked the whole site**

`due()` tested that `script().offer` EXISTED. It does: an object full of
empty strings, which is truthy. So Waddles opened a blocking overlay with an
empty bubble, no text and no buttons — the page rendered underneath and
nothing on it could be reached, with no way to dismiss him.

An unwritten script is the NORMAL state while the words are being written.
It has to be invisible, not fatal.

`due()` now requires:

    a non-empty offer.line     he has something to say
    at least one tour WITH steps   there is somewhere for the answer to go

A question whose only button is "no tour" is not worth asking.

The comment in `app.js` claiming "with no script he never appears" was
written without checking and was wrong. Corrected.

**Also added — `GH.text.spelled()` and `firstDiff()`**, groundwork for the
copy-it-out drill. `compare()` accepts `close`, which is right everywhere
else and exactly wrong for a spelling exercise: `Strasse` for `Straße`,
`apfel` for `Apfel`, `schon` for `schön` all pass it, and every one of those
is the thing the drill exists to teach. The drill itself is not built.

**Changed — the first run is DATA-DRIVEN**

One table, `LANGS` in `js/welcome.js`. Adding French means adding a row and
its `lgName_fr` strings. No screen is rewritten, no logic changes, nothing
counts the entries.

    code    the i18n / target code
    flag    shown before the name
    own     its name IN ITSELF — Русский, not "Russian"
    ask     "choose your language" in itself, for screen one
    ui      the interface can be read in it
    target  it can be learnt

A language can be either or both. German is both. Spanish would arrive as
target-only until someone translates the interface.

### Four screens

    1  the language she already understands   flags + native names
    2  what she wants to learn                ENTIRELY in her language
    3  what to call her                       a first name, not a full one
    4  which grammatical forms                framed as grammar

**Screen two names the target in HER language** — Немецкий once she has
picked Russian, not Deutsch. Screen one is the only place a language names
itself; after that she is being spoken to and should be spoken to properly.

**Screen four is not a demographic question and is phrased so she can tell.**
German makes it grammar: what a pet calls her, how an adjective agrees.
"Do not specify" is a real answer the app already handles everywhere.

### A bug worth remembering: t() CANNOT hold a multilingual line

Screen one's heading is the same question in all three languages at once.
It was built from `t('wcPickLang_de')` etc — and `t()` resolves in whatever
language is CURRENTLY loaded, so two of the three came back as raw keys.

Those strings now live in the `LANGS` table beside the names they belong
with. **Anything that must appear in a specific language regardless of the
active one cannot go through i18n.**

### The five values are separate

    interfaceLanguage  GH.i18n.lang()
    targetLanguage     localStorage gh-target, scopes every progress key
    name               GH.player.current().name
    grammarGender      GH.player.gender()  — see below
    welcome done       gh-welcome-v1

**`GH.player.gender()` is badly named** — it holds a grammatical choice, not
a demographic one, and 88 other uses of the word "gender" in this codebase
mean German noun gender. Not renamed: it would touch five call sites for no
user-visible gain, and the risk is not worth it tonight. Worth doing
deliberately.

**Added — `js/welcome.js`, the first run**

Before this, a fresh install created a profile silently with an empty name,
took whatever language the browser reported, and dropped her on the hub.
Her name and gender existed only in Settings, several taps down, where a new
arrival would never look — so the pets addressed her as nobody and the
butler had no name to use.

Three screens, then Waddles.

    1  what she reads      ru / de / en, set immediately
    2  what she learns     German. One answer, and that is the point.
    3  name and gender     both editable in Settings afterwards

**Screen one has no heading.** She cannot read a heading yet, which is the
entire reason that screen exists. Three words in three languages, each
labelled in its own language with `lang` set so the right font is used — a
Russian speaker looks for Русский, not for "Russian".

**Screen two looks pointless and is not.** There is one target and it is
German. `GH.player.target()` already scopes every progress key, so the
machinery for a second language exists and only the question was missing.

**It hands straight to the butler.** She tells the app her name and the very
next thing that happens is someone using it.

### It cannot ask twice

`gh-welcome-v1` records that it ran, AND `due()` refuses if the profile has
a name or if any coins have ever been earned. Someone mid-way through
learning German must never be asked to introduce herself because a storage
key went missing.

**Added — THE PET BEING PUT DOWN SAYS GOODBYE**

A swap is three screens now: the pet leaving, then the pet arriving.
Swapping companions without a word from the one displaced would make them
feel like equipment, and the whole point of the shelf is that the old one is
waiting rather than gone.

    handover.leave.head   '{pet} is returning to the store to wait for you…'
    handover.leave.pets   sixteen goodbyes, keyed p01–p16

### WHERE A SWAP ACTUALLY HAPPENS — not where either of us assumed

`buy()` only pushes to `chosen` if there is ROOM. A pet bought with full
slots is owned and silent until she picks it, so nobody is displaced by a
purchase.

The displacement is in **`toggle()`** — `chosen.shift()` drops the oldest
when she picks one and the slots are full. That is where the goodbye now
fires, and only when someone was genuinely put down. Filling an empty slot
is not a swap.

### Each screen shows the right face

`show()` takes an optional `speaker`. A pet saying goodbye shows ITS OWN
picture through `GH.petArt.tile()` — Waddles standing there while Max says
"sting on the shelf" would read as Waddles saying it. The arriving pet gets
its own face too, which it did not before.

Verified: Max's picture on screen one, Noir's on screen two, no goodbye when
an empty slot is filled, and silence rather than an error for a pet with no
line written.

**Changed — the perch is Waddles, not a bell**

It was a 34px circle, which is right for a bell and wrong for a standing
penguin: at 1:2 he would have been letterboxed into a strip 17px wide and
read as a smudge.

Now 30 x 40 — taller than wide, taking his aspect. No circle and no
background, because he is a cut-out figure and a disc behind him would put
him in a badge. `object-position:bottom` so he stands on the row rather
than floating with his feet cut off. The border appears on hover and while
glowing, which is the one moment he needs an outline.

**Changed — THE BUTLER'S OFFER, AND A TWO-SCREEN HANDOVER**

### The tours are the answers

The offer used to ask yes / later / never, then ask AGAIN which tour. Two
screens for one decision, and the first offered a "yes" to a question whose
real answer is "which one".

Now every tour with steps becomes a button, labelled with its own `label`,
and refusing is the last one. Write a third tour and a third button
appears; nothing here counts them.

### One follow-up after a refusal, then never again

"Shall I come back later?" is the only question worth asking, because the
two answers really differ — one is not now, the other is not ever.

`yes` leaves him owed so he offers again next visit. `no` means never on
his own. **Both end with him on the perch**, glowing for about two and a
half seconds so she sees where he went. Refusing him is never losing him.

Leave `refuse.line` empty and a refusal is simply final, with nothing
asked. Better than inventing a question.

### The perch shows his face and glows

Was a bell that scaled. Scale alone was too quiet against a busy header, so
it pulses with a flame-coloured glow three times. His portrait replaces the
bell — he is a character now, and a generic icon would make him a menu
item.

### The handover is two screens

He speaks and fades; the pet appears and speaks. A purchase reads as a
promotion rather than a notice.

    handover.first    the butler stepping down for her FIRST pet
    handover.switch   one pet replacing another, no butler involved

`switch` has no screen one on purpose — Steven's lines have the arriving
pet do the acknowledging, so nobody speaks for the pet being replaced.

**Keyed on pet id, p01–p16.** A display name cannot be keyed on:
`shortName()` strips "the Frog", and two pets could share a first word.
`store.js` now passes the id and whether it is her first, across three call
sites.

    {name}  HER name, from GH.player.current().name
    {pet}   the pet's own name

`{name}` used to be filled with the PET's name, so Steven's lines would
have read "Waddles' watch is over, Noir." Fixed.

### Waddles

642 x 1322 standing penguin, so the CSS is rewritten for a tall figure: he
stands to the LEFT with the bubble beside him, tail pointing left into his
head. No circular crop, no border, no background — just a drop shadow.
118px tall, 96px on a narrow phone.

### Still to write

Every word. `offer`, `refuse`, the tours, and both sets of sixteen pet
lines. Steven has written the pet lines in English; they need Russian and
German, and a decision on whether `switch` wants a screen one.

**Added — `place.sh`. Stop hand-sorting the downloads.**

Thirty-six download cards with no visible filenames, and a prose list saying
which folder each belongs in. That was the handoff and it was indefensible.

    zsh place.sh ~/Downloads          shows what it would do
    zsh place.sh ~/Downloads --go     does it

Run from the repo root. **The destinations are not written down twice** —
every path is read out of the manifest in audit.sh, so this and the audit
can never disagree, and a file added to the manifest is placed correctly
with nothing here to update.

A file NOT in the manifest is listed and left alone. That catches a stray
download, a local tool that belongs outside the repo, and a genuinely new
file that still needs a manifest row.

It copies rather than moves, touches no images or audio, and does nothing
without `--go`.

**Newest wins.** A folder holding both `app.js` and `app (1).js` would
otherwise place them in arbitrary order and a stale copy could overwrite a
fresh one — the exact failure the script exists to prevent.

### `path` IS `$PATH` IN ZSH

Reading the manifest into a variable called `path` wiped the command search
path, and every external command in the script silently stopped existing —
`sed: command not found` while sed sat in /usr/bin. Twenty minutes to find.
Use `rel`, never `path`.

**Added — THE TOUR CAN NOW WALK HER ROUND THE SITE**

The butler was a centred modal that locked scrolling. A tour has to let her
SEE and REACH the page it is talking about, and a highlighted button she
cannot press is worse than no highlight.

### He stands at the side and the bubble comes out of his face

`.bt-stage` docks bottom-left, `pointer-events:none` on the overlay so the
page underneath stays usable. The tail is a rotated square taking the
bubble's own background and border, so it stays correct in all twelve
themes with no per-theme colour.

`is-blocking` is kept for the moments that really are a stop — the first
offer, the tour picker, the handover. Those darken the page. A tour step
never does.

### A step she PERFORMS, not one she watches

`tap:true` lights the target, scrolls it into view, and waits for her to
press the real control. No Next button. Being told where the balance is and
pressing it once are not the same memory.

`highlight()` now scrolls into view and returns whether it found anything —
a highlight five screens down was no highlight at all, and a tap step whose
target is missing falls back to a Next button rather than dead-ending her.

### Surviving the screen change

`launch()` destroys the butler's box with the rest of the view, so the tour
lives in `state` and redraws from `nav.ready()` — the same funnel the
history and the event log already use.

**NOT EVERY BUTTON NAVIGATES.** A filter or a toggle repaints nothing, and
the tour would have waited for a paint that never came and simply vanished
mid-tour. The wait has a 700ms deadline; if no screen painted, the next step
draws where she already is. Tested both ways.

### `GH.butler.tour(id)` — nothing could start a tour before

The only route in was the offer dialogue, which shows once per profile. So
the perch could not restart one, and neither could a test. Same code path as
the offer, so there is no second behaviour to keep in step.

### Still yours to write

Every word in `data/butler-script.js`, the portrait, and the 16 pet handover
lines. `offer` empty means he never appears, which is the current state and
is not an error.

**Added — `js/build.js`, `_headers`, and a version check**

### Images, faces and audio carried NO version at all

`images/5.webp`, `audio/x.ogg`, `images/faces/face-1.webp` — no query
string. A redrawn sheet could be served from a stale cache indefinitely.

Cloudflare Pages hid this by defaulting to `must-revalidate` on everything,
but that means all 72 sheets do a round trip on every load, and on a phone
the round trips are the slow part, not the bytes.

`GH.build.url(path)` appends the version. Fixes both: a changed file is a
changed URL, so it can then be cached hard. `sprite.js`, `facepic.js` and
`songbook.js` now route through it.

**Opened as a local file, `?v=` is absent and nothing is appended** — a
`?v=0` on every image would be a lie rather than a default.

### `_headers` — cache the versioned things hard, never index.html

    /index.html   no-cache
    /js/* /css/* /data/* /images/* /audio/*
                  public, max-age=31536000, immutable

`immutable` means the browser will not revalidate even on an explicit
refresh, which is **only safe because the URL now changes when the file
does**. index.html is what names every other version, so it is the single
point where a bad rule breaks everything, and it gets an explicit rule
rather than relying on a default.

Netlify reads the same file and syntax. GitHub Pages gives no header
control at all.

### The update offer

She may leave the app open for days, and nothing server-side helps a page
already loaded. `GH.build.check()` fetches `index.html` with `no-store` and
reads its `?v=` — no extra file to deploy and nothing to keep in step, since
the answer comes from the thing that defines the answer.

**It offers; it does not reload.** Reloading under someone mid-round throws
the round away. Bottom of the screen, because the top is where the back link
now sticks. Dismissable for the session.

Checked on arrival at the hub, never mid-round, at most once every twenty
minutes.

**Only ever forward.** A stale cached copy answering the probe with an older
build must not tell her to update backwards — tested, and it does not.

**Added — THE TWO SIGNALS AN ADAPTIVE TUTOR ACTUALLY NEEDS**

Answer rows gained two fields: the LEVEL the round was on, and the SECONDS
since her previous answer.

### The level, which removes this morning's blocker

`open` recorded the activity and not the level, so the log could show a
hundred rounds of `mehrzahl` and nothing about whether she played `sort` or
`mixed`. Adaptive difficulty was impossible — the tutor cannot pick a level
from evidence that does not exist.

It also settles the thing that stopped the tutor this morning. **Array order
is not the difficulty climb** — checked against each game's own hearts count
and wrong for four of the eight levelled games. With accuracy recorded per
level, nobody has to declare the climb: it falls out of the results.

Simulated with mehrzahl, where the truth was sort > form > umlaut > mixed:

    sort    96% right   1.5s per answer
    form    68% right   2.3s
    umlaut  48% right   3.3s
    mixed   32% right   4.4s

Derived order matched exactly. **The file's array order puts `form` before
`sort`, and the data disagrees.** All nine levelled games now call
`GH.events.setLevel()`.

### The thinking time

A word answered right in one second is known; the same word answered right
in nine is dragged up or guessed. Every spaced-repetition system uses that
and it was not recorded.

Measured as the gap since her previous answer in the same activity, which
needed **no change at any of the fourteen call sites** — the alternative was
threading a timestamp through every game. Zero on the first answer of a
round; capped at two minutes, because a ten-minute gap is a phone put down,
not deliberation.

### Reading it

`level` and `think` are `undefined` on pre-v6 rows, which is a different
fact from empty or zero. `an/usage.html` sorts each game's levels by
accuracy — that order is evidence, and the order in the code is not.

It also warns that a level with under about twenty answers is noise, and
that thinking time includes reading the question, so it compares levels
against each other rather than meaning anything absolute.

**Added — DURATIONS**

`leave` rows gained a sixth field (seconds) and the tally gained `secs` and
`overlong`. The duration was always derivable from the open and leave
timestamps, but only while both rows sat inside the cap, so the seconds are
totalled in the tally where nothing can roll off.

### The bigger half: she does not always leave by the back button

Closing the tab, switching apps, the phone locking — none of those ran
`leaving()`. **So the last activity of every single session had an open row
and no leave row**, and its duration was lost. It was always the activity she
was most engaged with, because it was the one she was still in.

`visibilitychange` to hidden and `pagehide` now record a leave.
`beforeunload` is deliberately not used: unreliable on iOS, and three
handlers for one departure would record three leaves.

**And `resume()`, which I nearly forgot.** A phone user switches away
constantly. Without a restart, everything after her first app-switch would
have been untimed. Coming back opens a second row on purpose — two visits of
four minutes is a truer picture than one of eight.

Verified: three minutes in, ten minutes in WhatsApp, five minutes back,
then the tab closed = **480 seconds over 2 opens, 9 answers**. The ten
minutes hidden are excluded, and a second hide while already hidden is a
no-op.

### Thirty minutes is the ceiling on one visit

A phone put down mid-round with the tab open would otherwise record four
hours, and one such visit would swamp every real number in the file.
Anything longer counts as thirty minutes and increments `overlong`, so the
distortion is visible rather than silent. The reader says so on screen and
calls the total a floor.

### An old row reads as `undefined`, not `0`

`secs` is absent on v1–v4 leave rows. Undefined means "not recorded", which
is a different fact from "zero seconds", and a reader that conflated them
would report that she spent no time in anything before today.

### The reader shows time in the app, per day, per visit, per answer

Plus a per-activity breakdown, and a plain statement of what the number
excludes.

**Added — THE COLLECTION GAPS ARE CLOSED**

v216 shipped the transport. This fills what it was carrying, because most
of the app reported nothing.

### `GH.events.mark(kind, what, n)`

Fourteen activities graded nothing, so the log knew she opened the songs and
came out and nothing about which song or whether she played it. The whole
read-and-listen half was a black box. One call per event rather than a
schema per activity, riding in the same `act` rows so the cap, the device
field and the upload all work unchanged.

Deliberately NOT once-a-day like `seen()` — playing a song twice is two
plays, and that is the interesting number.

    look   word:500                    a lookup, from tutor.looked()
    hear   dialogue:dg-04              a dialogue heard through
    play   song:...                    the audio started
    heard  song:...              87    how far in she got, per cent
    read   comic:c-12                  which comic
    read   grammar:case                which grammar topic
    read   songwords:fuer-tanusha      which song's word list
    buy    pet:fox              150    what she spends on
    grow   pet:fox               60

### THE BIGGEST HOLE: the 17 grammar lessons graded NOTHING

Four steps each, and not one answer reached the scheduler or the log. The
run object counted them for the end screen and stopped there — so a lesson
could never come up as due, a rule she failed repeatedly looked identical to
one she had never met, and the log saw an open and a leave.

`answered(ok)` is the single funnel every step type ends at, so one call
covers all seventeen. Keyed `lesson:<id>:<step>` rather than a bank word,
because a lesson step is a thing she can be good at and is not a vocabulary
item.

### Lookups now reach the log

`tutor.looked()` wrote to the scheduler and stopped. That is the strongest
signal in the app — she typed a word, chose one result out of 783, on
purpose — and it was invisible to the upload. Recorded before the early
returns, because a word looked up twice in a day is still evidence even
when the schedule ignores the second one.

### The coin summary travels

Seven numbers in `dump()`: balance, lifetime, full days, best run, today,
spends, lost. Whether the pets motivate anything is a real question and the
coin log was the only evidence, sitting in a store the upload never read.

### Still silent, on purpose

`awards-view`, `progress-view`, `gameguide`, `settings`, `dictview`,
`reference`, `tanyalesson`. The first four are meta — recording that she
looked at her own achievements measures engagement, not learning.
`reference` is covered indirectly: its search feeds `looked()`. `dictview`
and `tanyalesson` are genuine remaining gaps.

### Not recorded anywhere: DURATIONS

The log has timestamps and never a length. A session can be inferred from
gaps between answers, but "opened it, four minutes, left" is not recorded,
and for reading and listening there are no answers to infer from. The song
`heard` percentage is the only duration-like number in the whole system.

**Added — USAGE COLLECTION. A launch requirement, not an extra.**

Steven is not near Tanya and cannot read the log off her phone. Without
this there is no way to know whether the app is used at all, and no way to
improve it after it ships except by guessing.

### `js/send.js` — the transport

`GH.events.dump()` posted once a day per device. Nothing per tap, no timer,
no third party, no identity.

- **`var URL = ''` is the only line to change.** Empty means not
  configured: nothing sent, nothing logged as an error, app behaves exactly
  as if the file were absent. That is the state it ships in.
- `sendBeacon` where available, since it delivers after the page closes,
  which is when a language app gets closed. Falls through to `fetch` with
  `keepalive`. Verified: beacon preferred, beacon returning false falls
  through, beacon throwing falls through, everything failing throws nothing
  at the caller.
- **`sentOn` is marked BEFORE sending.** A beacon cannot report success, so
  a retry-on-failure would hammer the endpoint all day. One lost day is the
  cheaper mistake, and the log is cumulative so tomorrow carries it.
- `device_id` is random and made once — two devices must be
  distinguishable or a phone and a laptop merge into one contradictory
  picture, but nothing here identifies a person.

**Node 22 has a read-only built-in `navigator`**, so `global.navigator = {}`
in a test is silently ignored and the beacon branch looks broken. Use
`Object.defineProperty`. Cost twenty minutes to find.

### She can see it and switch it off

A section in Settings, hidden entirely when no endpoint is configured
(a switch that controls nothing implies something is happening). Says in
plain Russian, German and English what is sent — which exercises, how many
answers, what was opened; **no answers, no names** — and when it last went.

`DEFAULT_ON = true` for her, because Steven is telling her. **For the public
version flip that one constant** — `optedIn()` is the single place that
decides.

### `an/usage.html` — the reader

Paste payloads, get the answer. Local tool, never in the repo.

**The trap it had to avoid: the log is CUMULATIVE.** Two uploads from one
phone are the same history twice; summing them would report 122 answers over
5 days where the truth is 82 over 3. Only the newest payload per device is
counted, and days are a union rather than a sum. Verified.

The calendar fills gaps, so two days a week apart shows as five cells with
two filled — a bare "2 days used" hides that three were skipped.

It reports the four diagnoses the event log was built to separate, and it
states plainly what the log cannot answer: why she stopped, whether
something was too hard or too dull, whether she understood a word she got
right, or anything from a device that has not uploaded.

### Not built: the endpoint

Cloudflare Pages carries both the site and the collector on one free
account with no card — static requests unlimited, Functions on the Workers
free plan at 100,000 requests/day. One upload per device per day is about 2.
Same origin, so no CORS and no third party holding her data. **Verify the
free tier against the dashboard before building on it** — one source in the
search claimed Functions are paid-only, contradicting Cloudflare's own
docs.

**ALL NINE SONGS CHECKED AGAINST STEVEN'S SUNO SCRIPTS**

He supplied the production scripts for every song — the exact text the audio
was generated from. That text is the source; where the stored data differed,
the data was wrong. Three defects, all mine, all corrected:

    Mein wunderbarer bester Freund   chorus stored 7 lines, script has 11.
                                     I had written each DISTINCT line once
                                     and dropped four repeats.

    Hafermilch-Cappuccino            verse 1 line 2 was never entered at
                                     all; everything below had shifted up.

    Dein Körper braucht Liebe        `das es kann geben` -> `das es geben
                                     kann`. Also just wrong German — the
                                     verb belongs at the end of the clause.

Now zero lines missing a language across all nine songs, and all nine render
in all three languages with 477 word references resolving.

### Four "problems" that were my comparison script, not the data

Worth recording so the next check does not chase them:

- `Das Lied zweier Herzen` — the file splits the Outro into `outro` /
  `outroEnd` / `berlin`. Those three concatenate to the script's 20 lines in
  the script's order. My parser read `Final Outro` as a lyric.
- `Für Tanusha` — two extra sections hold the `[Instrumental Break]` and
  `[Instrumental Outro]` directives. Not lyrics.
- `Ich bin ein Berliner` — the script writes the chorus at each of its three
  appearances; the file stores it once and `play` calls it three times. Same
  song.
- `Hafermilch-Cappuccino` — a straight apostrophe in the script versus a
  typographic one in the file, in `Dunkin'`. The file is internally
  consistent; left alone.

### THE RULE THIS CAME FROM

**Do not edit his art. Ever.** If something looks like a mistake — a
repeated line, a spelling, a gender — ASK. Do not fix it, do not tidy it,
do not decide it was probably a slip.

A repeated chorus line and a border drawn through occupied Crimea look
identical from the inside: redundancy, something to clean up. They are both
the decision the work is about. Repetition is one of the oldest tools in
songwriting and I treated it as a data-entry error.

### Still open

`Für Tanusha`'s two instrumental directives are in English inside a German
song and display to her as if they were lyrics. Steven said the wording on
those is the one thing fair to change. Undecided: translate, or hide from
the lyric view.

**Added — THE HEADER PURSE AND THE BUTLER**

Three new files: `js/purse.js`, `js/butler.js`, `data/butler-script.js`.

### The balance is now the door to the store

It used to be a line of text in the HUB BODY: visible on one screen out of
thirty, and not tappable. So the only reliable route to the store was the
tile in the Reference row, which is a leftover doorway rather than the real
one.

Now it sits in the header, first in the controls row, and tapping it opens
the store. **The number itself is the button** — not a "Store" label with a
count beside it, because the number is what makes her want to press it.

- Hidden until `lifetime()` is non-zero. A balance of nought in the header
  is a reminder of what she has not done.
- Counts UP after a payout, twelve steps whatever the size of the rise, so
  being paid is visible from anywhere on the page.
- Does NOT animate down. Watching a purchase drain the counter is a
  punishment for spending.
- `refresh()` is called by the end screen and the store, the only two
  places money moves.

The hub's own purse line is REMOVED. The same number twice on one screen
makes both look like decoration.

### The butler — the missing first thirty seconds

Nothing on first open told her what is here or where to start: thirty
activities, eight sections, all reachable, none introduced.

**The script is not in my files.** Every word comes from
`data/butler-script.js`, which is empty and annotated for Steven. With no
lines the butler never appears — that is the current state and nothing
breaks. I am not writing words that go in front of Tanya.

Built and tested:

- Three answers, all real: yes · maybe later · go away. `never` means
  never, but he names the perch he retreats to, so it is reversible from
  her side. "Later" is once per VISIT, not per repaint.
- A perch button in the header, pulsing briefly when he leaves.
- Tours: any number of steps, `points:` lights up a named element above the
  scrim, `gift:` pays her and the header counts up in front of her — so
  earning is watched rather than described. **The gift is guarded so a
  replayed tour cannot farm it.**
- A tour ends by GOING somewhere, named in `go:`. A tour that ends where it
  started has shown her a map and given her nothing to do.
- The handover: the first pet bought makes the butler resign and the pet
  take the role, so a purchase reads as a promotion. Wired into all THREE
  acquisition routes — kronen, token and claim — not just one.

Escape closes it with `stopImmediatePropagation` and capture, or the dialog
would close AND the screen behind it would leave.

`data/butler.js` was renamed `data/butler-script.js`: two files called
butler.js in different folders breaks the no-duplicate-basenames rule.

**Fixed — GOING BACK WAS BROKEN TWO SEPARATE WAYS**

### The back link scrolled away

It sat inside the page header. On a long screen — a 97-line song, a 27-face
board, the 773-word list — there was NO way back except scrolling to the
top. `position:sticky; top:8px` on `.backlink`, opaque background and a
shadow so the text under it stays readable. Not the whole header: the title
can go, the way out cannot.

Verified there is no `overflow` on any ancestor between `.backlink` and
`<body>`, which is what would silently kill sticky.

### The browser's Back button left the site

This is one page and nothing had ever pushed a history entry, so Back — and
on a phone the swipe-from-the-left, which is the most natural way to go
back — dumped her out of the app entirely.

**Not a router.** `nav.leave()` already does the right thing at every
depth: it clicks whatever back link is on screen, and each activity has
wired that to its own idea of "up". So the history only needs to know THAT
there is somewhere to go, not where.

One spare entry is kept while a back link exists. Back pops it, we leave one
screen, a fresh entry is pushed. `armHistory()` hangs off `nav.ready()`,
which every activity already calls once painted — the same hand-off point
app.js uses for the event log.

Simulated at five levels deep: five presses, one screen each, and Back from
the hub leaves the site, which is correct. Escape, the swipe and the on-screen
button now all do the same thing.

**Fixed — I DELETED FOUR LINES OF THE CHORUS**

The chorus is eleven lines. I stored seven. When transcribing the lyrics I
wrote each DISTINCT line once instead of copying what was on the page, so
the doubled block

    Mein Bett ist mein bester Freund
    Mein Bett wird mich niemals verlassen
    Mein Bett wird mich niemals verlassen
    Mein Bett ist mein bester Freund          <- all four of these
    Mein Bett wird mich niemals verlassen     <- were gone
    Mein Bett wird mich niemally verlassen

collapsed to three. A repetition is the point of a chorus and I treated it
as redundancy.

Rebuilt from the source text, then compared line by line, section by
section, against what Steven sent:

    verse1  12/12   chorus  11/11   verse2  19/19   verse3  14/14
    bridge   9/9    verse4  20/20   outro   16/16

**Exact match in all three languages.** 101 lines now, all referenced, none
orphaned. The other six sections were never wrong — only the chorus, and
only because it was the only section with repeated lines.

Rebuilt rather than patched: renumbering line ids by hand is how the first
error got in.

**Fixed — song 9 opened to a title and an empty page**

The field is `secs`. I wrote `sections`. songbook.js reads `song.secs` and
the other eight songs all use it, so the new song had no sections the
renderer could find: title, no lyrics.

Named from memory instead of read from the file — the same mistake as the
blank-box picture audit earlier today, which read `v.img` instead of going
through `packs.imgsOf()`.

Verified by opening all nine through the real songbook: every one renders,
song 3 the largest at 218 text nodes, which is right for 97 lines with the
chorus played four times.

**Added — SONG 9: `Mein wunderbarer bester Freund`**

The sequel to `Das Bett sieht so schön aus`, and placed at POSITION 3 right
after it. She leaves the bed in that one and spends the whole of this one
trying to get back to it; reading them in order is the joke.

    97 lines · 7 sections · all three languages · chorus played four times

Verified: every section resolves to a line, no line is orphaned, no line is
missing a language, and `play` names no section that does not exist.

### Inserting mid-array broke nothing, which was the design bet

`n` is decorative — five of the nine songs never had one and nothing reads
it. Position is the identity, and `song-words.js` keys on the AUDIO STEM, so
all eight existing word lists survived the insertion with every reference
still resolving. That key was chosen for exactly this and it paid off.

The audio file wants to be
`audio/mein-wunderbarer-bester-freund.ogg`.

### Its word list: 73 references, 48 new rows

    20 resolve through vocab.js
     5 were already song-word rows
    48 new rows — 16 to draw, 32 to define

Two corrections to the supplied list. **`der Schokoladencroissant` is
`das`** — Croissant is neuter. And **`der letzte` was dropped**: an
adjective doing a noun's job, whose gender changes with what it refers to
(`der letzte Apfel`, `die letzte Haltestelle`), so as a standalone entry it
teaches the wrong thing.

### A row that had gone dead without anyone noticing

`sogar` was in song-words.js AND in vocab.js — it was written into the bank
hours ago as one of Tanya's 30 course words, and the bank wins the
resolution order. Same gloss, so nothing looked wrong on screen; the row was
simply unreachable. Removed, and the reason is now in the file header: a
word graduates by being added to the bank for ANY reason, not only by
getting a drawing.

    song-words now: 257 rows · 127 to draw · 129 to define · 1 to the dictionary
    477 references across nine songs, all resolving in all three languages

**Changed — GUESS WHO: THREE BOARD SIZES, CHOSEN ON THE BOARD**

The chooser was a screen with one button on it — a gate she taps through
every time to reach the game. Gone. The board appears immediately and the
size sits on it.

### Three nested boards, out of the same 27 pictures

    small   12 faces ·  4 categories ·  7 words · 4 questions
    medium  18 faces ·  6 categories · 13 words · 5 questions
    large   27 faces ·  9 categories · 21 words · 6 questions

**A smaller board is fewer QUESTIONS, not just fewer faces** — seven German
words against twenty-one. That is what makes it easier, and it makes the
small board a real beginner entry rather than a shrunken hard one.

`GH_FACES` is REORDERED so each prefix is its own board. Verified at all
three: no inseparable pairs, no dead questions. The order is load-bearing —
the small board asks four categories, so two people differing only in shirt
colour are the same person to it.

### The size is remembered, per profile

`gh-gw-size`, keyed on player and target language, so Nazar switching does
not move Tanya's. Defaults to medium: small is four questions and thin as a
default. A remembered size that no longer exists falls back rather than
leaving her with nothing.

### It locks once she has asked

Switching starts a fresh round — it must, since the secret may not be on
the new board and half-eliminated faces from another size are meaningless.
So it is only offered before the first question. After that the row shows
which size she is on and says why it cannot change. A control that silently
discards work is worse than no control.

### THREE MORE DUPLICATE i18n KEYS, same bug as the word list

`gwLevel_easy`, `gwLevel_hard` and `gwLevel_all` were left behind by two
earlier revisions, and a stale `gwLevel_medium` sat BELOW the new one in all
three languages — so the later key won and the middle button would have
shown the old wording. Removed. **Zero duplicate keys in i18n.js now**,
verified across all three blocks.

**Fixed — the Guess Who chooser was a screen with one button on it**

With three nested boards a size chooser earned its place. With one it is a
gate she taps through every time to reach the game.

- `paint()` goes straight into the round when `GH_FACE_LEVELS` has fewer
  than two entries. Add a second board and the chooser returns on its own.
- Back leaves the activity rather than landing on a chooser that is not
  shown. Abandoning a round costs nothing; only a finished one pays.
- The end screen drops "another size" when there is only one.

**Changed — THE 63 UNDECIDED SONG WORDS ARE TRIAGED**

Steven's rule: a picture when one image carries the meaning with no text; a
definition when the meaning depends on abstraction, grammar, context or
several senses.

    before   69 img · 77 def ·  1 dict · 63 UNDECIDED
    after   111 img · 98 def ·  1 dict ·  0 undecided

His 42/21 split matched the file exactly — 63 for 63, nothing missed,
nothing in both lists.

### A false alarm I raised and then had to withdraw

I reported six vocab entries showing a blank box: `bestellen`, `bezahlen`,
`treten`, `gewinnen`, `arbeiten`, `die Handtasche`, all claiming image
numbers past the last drawn sheet.

**There are no blank boxes.** My audit read `v.img` directly, and
`packs.imgOf()` checks the `imgs[]` ARRAY first — those six have two or
three valid drawings each and always rendered correctly. `bestellen` is
`imgs:[505,586]`.

I had already "fixed" them by setting `img:0`, which was a no-op on
rendering and a lie in the data. Reverted.

Re-audited through `packs.imgsOf()`, which is what the app calls:

    619  every picture present
    154  no picture, correctly rendering the German large
      0  pointing at an undrawn sheet

**The lesson is worth keeping: an audit that reads the data directly rather
than through the accessor the app uses will disagree with the app.**
`imgOf`, `sentencesOf`, `catsOf` and `keyOf` all exist because the raw shape
is not the effective one.

### What is actually outstanding

    vocab.js     154 with no picture (148 words, 6 phrases)
    song-words   111 to draw · 98 to define
    dictionary   complete — 5 headwords, 13 senses, 13 definitions

`an/needs-art.md` lists every one of them by name.

**Changed — GUESS WHO REBUILT AROUND THE ACTUAL PICTURES**

Steven generated sixteen sheets of four — two passes over eight prompts.
The board is now derived from what exists rather than from a spec he was
asked to paint to.

**64 faces, 27 distinct PEOPLE.** The two sets are regenerations, so most
faces appear twice; and once the descriptions are bucketed into askable
values, five more pairs collapse.

    27 faces · 21 words · 9 categories · worst case 6 questions
    no two faces alike · no dead questions · all 27 reachable

### Nine of sixteen sheets are used

`a1 a2 a3 a4 a5 a6 a8 B7 B8`. The other seven contain no face that is not
already on one of those, so the game would never reference them.
`an/name-faces.sh` copies the nine into `images/faces/face-1..9`, keeps the
originals, refuses to overwrite, and exits 1 if a sheet is missing. Tested
against dummy sheets: right sheet in every slot, a tampered destination
survived a second run.

Every row carries `from:'a2 BL'`, so a face that looks wrong is traceable to
its generation without opening nine files.

### Eye colour is gone

Seven faces are `browngreen`, `bluegreen`, `greenhazel` or `greenbrown`.
There is no honest way to file hazel as blue, brown or green, and a question
with an arguable answer is a broken question. Costs two words.

### Beard and moustache are now two questions, thanks to Steven's re-check

My first transcription had them identical on every male face. He looked
again: **four faces are moustache-only** (a4 TL, a6 TL, B3 TL, B5 TL — all
the same person regenerated). So `Bart?` splits 8/19 and `Schnurrbart?`
10/17, where before beard was 10/17 and moustache was dead.

They are still 93% the same question, and `Schnurrbart?` is 96% the same as
`is it a man?` — only two of the eleven men are clean-shaven. Both words
stay because both are worth knowing; asking both is close to a wasted turn.

### One shirt is deliberately unaskable

Yara (sheet 2, from a2 BL) wears lavender. `shirt:'other'` — not one of the
six askable colours, so every shirt question answers Nein for her.

**On purpose, and written into the data as such.** Calling it blue would
have the game assert something about the picture that may be wrong to her
eye. Verified: she is still found in six questions, the same as the hardest
of the other 26, because a shirt question still ELIMINATES her along with
everyone not wearing that colour.

### facepic.js tries png, then webp, then jpg

The set arrived as .png, so nothing is converted and nothing is lost to a
conversion. A hardcoded extension would 404 silently — and in this game an
unreadable face is indistinguishable from one already ruled out.

### One board, not three

12 and 20 nested boards would each need their own check that fewer questions
can still tell everyone apart. That check has not been run, so they are not
offered. `GH_FACE_LEVELS` is still a list.

**Added — ACTIVITIES DECLARE WHAT THEY TEACH. This is the infrastructure
everything else was waiting on.**

Nothing in this app said what it taught or what levels it had, so
`whatNext()` worked off a table I wrote by hand and no level could ever be
chosen for her.

Every game's entry now carries two fields:

    levels:  its own level ids, READ OFF ITS OWN LEVELS ARRAY
    teaches: the grade() key prefixes it actually writes

`levels` is derived, not typed: the module returns
`LEVELS.map(l => l.id)` (or `Object.keys(DIFFICULTY)` for catch-word) and
the entry reads it. The two cannot drift apart, and the tutor picks a level
by id — a stale list means it picks one that does not exist.

`teaches` omits `skill:`, which every game writes and which therefore
separates nothing.

### The hand-written table was wrong in a way that hid

It said `word: 'catch-word'`. **Four games grade `word:` keys** —
catch-word, listen-pick, mehrzahl and placement — so three of them could
never be suggested for weak vocabulary however much they would have helped.
The map is computed now:

    word     catch-word, listen-pick, mehrzahl, placement
    topic    catch-word, listen-pick, gender
    conj     conjugate, wrong-form
    case     wo-wohin        plural   mehrzahl
    order    scramble        tense    conveyor
    prep     placement       gender   gender

A game added next month is a candidate without this being edited, and a
game that stops grading an area stops being suggested for it.

`AREA_FALLBACK` keeps three entries for areas no registered activity
declares — `sent` is graded by fill-blank, which app.js mounts directly and
which has no entry to declare anything in.

### Rotation, for free

`freshestFor(area)` picks the game she has NOT just played, oldest first,
from the event log's `open` rows. Previously `whatNext()` named catch-word
every single day vocabulary was weakest. Verified: four different games
across four rounds, then back to the oldest.

`guess-who` declares `teaches:[]` on purpose — it grades `skill:describe`
and never a bank word, so it is correctly never offered for a weak area it
cannot help.

### NOT BUILT: automatic level selection, and here is why

I was going to pick her level from her accuracy, using array order as the
difficulty ladder. Checked it against each game's own `hearts` count first
— hearts fall as difficulty rises — and **array order is NOT the climb for
four of the eight games:**

    catch-word   veryeasy(5) easy(4) medium(3) hard(2) hardcore(1)  ordered
    scramble     see(5) hear(4) mean(3) front(3) sub(3)             ordered
    placement    find(4) move(4) mixed(3)                           ordered
    conjugate    s1(5) s2(4) s3(3) regular(5) core(4) ...           NOT
    gender       agree(4) differ(3) plural(4) all(3)                NOT
    mehrzahl     form(4) sort(4) umlaut(3) none(4) mixed(3)         NOT
    wo-wohin     which(4) article(3) fixed(4) mixed(3)              NOT

`conjugate` restarts at five hearts when the drill levels begin, and the
other three are genuinely not monotonic. Building on that ordering would
have the tutor confidently sending her to the wrong level in half the
games.

**Needs a decision:** either each of those four declares its climb order
explicitly, or the tutor picks by something other than position. Not
guessing at it.

**Added — TILE IMPRESSIONS, so "never discovered" is finally measurable**

`GH.events.seen()` has existed since v204 and nothing called it, which
meant `undiscovered()` could not answer anything. Now `js/app.js` watches
every hub tile with one IntersectionObserver.

**Threshold 0.5, not 0.** A single pixel of a tile clipping into the
viewport is not her having seen it, and 0 would mark the entire hub as seen
the moment she flicked to the bottom.

**One observer for the page, reused across repaints.** The hub rebuilds on
every filter change and language switch; one observer per paint would leak
one per rebuild. A tile is unobserved the first time it is seen, so
scrolling past it forty times is one callback rather than forty storage
writes.

No IntersectionObserver — old Safari, a test — and nothing is recorded.
Undercounting is the safe direction: it makes a tile look undiscovered,
which prompts a look, rather than giving a false all-clear.

### `tile()` takes an id, and all fifteen call sites pass one

A tile with no id cannot be counted. The observer wiring is written ONCE
inside `tile()`, but the id has to come from each caller — that function has
no other way to know what it is drawing.

Every one of those callers already told `launch()` which activity it opens,
so the id was three lines below the tile call in every case and none of it
was typed twice.

**Content tiles get `activity:topic`** — `fill-blank:kitchen`,
`vocab:clothes`, `story:...`, `long-story:...`, `lessons:...`. So the log
answers at either grain: was fill-blank ever discovered (by prefix), or
which topics does she skip (by the whole id). The 17 grammar lessons are
separate ids rather than 17 tiles all called `lessons`.

### All four diagnoses now separable

    never on screen         -> not discovered, it is buried
    seen 3+, never opened   -> the tile does not sell it
    opened, zero answers    -> it puts her off on sight
    opened often, unfinished-> too hard, or too long

Verified with a fake viewport: one observer, threshold 0.5, only tiles that
actually intersected are counted, a second pass over the same tile counts
once, seen tiles are released, and `undiscovered()` correctly names the
four that never appeared.

**Added — WER IST ES? (Guess Who)**

`js/activities/guesswho.js`, `data/faces.js`, `js/facepic.js`. Three new
files. `js/faceart.js` **deleted** — the generated-SVG placeholder is
superseded by Steven's paintings.

### The app answers. It never touches the board.

She flips the faces down herself. A game that eliminates for her is a quiz
with pictures — she taps a question, watches faces grey out, and the
thinking has been done on her behalf. Doing it herself is why the German
has to be understood rather than recognised: the answer is useless until
she works out what it rules out.

Flipping is reversible, because she will eliminate the wrong person and a
misread should not be punished twice.

### The question is a full sentence

She taps HAARE then LANG and gets, spoken in German and shown in her own
language:

    Hat die Person lange Haare?      Нет

`gwDQ_*` and `gwDV_*` hold the German in all three tables, so the spoken
sentence stays German whatever the interface is set to. i18n cannot ask for
one language while another is selected, and adding that for one sentence
would have been a lot of reach.

### Three nested boards

    easy    12 faces ·  4 categories ·  7 words · 4 questions
    medium  20 faces ·  6 categories · 15 words · 5 questions
    hard    32 faces ·  9 categories · 24 words · 6 questions

Verified against the shipped data: **no inseparable pairs, no dead
questions, all 32 reachable** at every size.

### Losing explains itself

A wrong guess ends the round and says why — the only part of losing that
teaches:

    still standing   she guessed early, and how many were left
    flipped down     she eliminated the answer, so a question was read
                     backwards, and the game names which one

A loss pays nothing and takes nothing. `dead` counts questions that could
not have ruled anyone out, and the round flags them as they happen.

### TWO DATA BUGS IN MY FIRST DRAFT

`glasses`, `hat` and `ear` were written as `1`/`0` while the palette asks
`face[cat] === true`. **1 !== true, so all three categories answered Nein
for everybody.** And `shirt` was never written into faces.js at all, so the
hard level's six colours were unanswerable.

Caught by checking every PAIR of faces for separability instead of trusting
a solver whose question list differed from the palette's. The solver said
"all winnable" while three categories were dead.

Also fixed: the Russian shirt question read `Одежда чёрный?` — *одежда* is
feminine, the colour words masculine. Now `Цвет одежды — чёрный?`, which
agrees and matches the button.

### A missing sheet does not break the game

`facepic.js` probes each `face-N.webp` once and shows the person's NAME
until it loads, keeping the name if it never does. Half a board is a normal
state while the art is being painted, and an empty square is
indistinguishable from a face already ruled out.

### Waiting on the art

`images/faces/face-1.webp` to `face-8.webp`, 2x2, reading order. Roster,
art rules and counts are in `face-roster.md`. **Playable right now** with
names instead of faces.

**Added — WORD SEARCH, THE LOOKUP SIGNAL, AND WHAT SHE OPENS**

### Word search, both directions

`js/activities/reference.js` — a search box on the word list. Matches
German, Russian, English AND the example sentences, over **783 items**: 773
bank rows plus the dictionary's 13 senses.

`GH.text.normalize` already folded ä->ae and ß->ss, which is exactly what
someone typing German on a Cyrillic keyboard produces. So `kuehl` finds
`der Kühlschrank` and `schluessel` finds `der Schlüssel`.

**Ranked, and the ranking is the point.** Exact, then prefix, then
contains, then a hit in an example sentence, shorter first within a rank.
`Bett` puts `das Bett` above `das Bett machen`. A search shows ONE FLAT
LIST — the grouped views would re-sort the hits by category and throw the
ranking away.

**RU->DE is the case that matters** and it needed the dictionary included:
`сон` gives `der Traum` and `der Schlaf` together, `мечта` gives `der
Traum`, and `подножие` and `фут` reach senses of `der Fuß` the app could
not previously find at all. The dictionary supersedes its bank entry, as
`packs.vocab()` does, or `ступня` returned `der Fuß` twice with two
different answers.

The input node is created once and moved on each paint. Rebuilding it
destroys the field she is typing into — on an iPhone the keyboard closes
after one letter.

### `GH.tutor.looked(key)` — a lookup is evidence

Tapping a result WHILE SEARCHING is the one unambiguous lookup this app
has: she typed a word, chose this result out of 783, on purpose. Scrolling
is not that, and neither is tapping a row she passed — which is why it
fires only when a query is set.

It does NOT grade her. `reps`, `lapses`, `ease` and her accuracy are
untouched; treating curiosity as failure would make the progress screen
lie. Instead the card moves forward: never-seen enters the queue at one
day, already-due is left alone, and a settled card is **halved and capped
at three days** — a word known for two months goes to 3, keeping its 9
reps and its ease. Once per day per word.

### The four activity events

`js/events.js` — `seen` / `open` / `leave` / `finish`, plus an **uncapped
`tally`** per activity. The answer log records ANSWERS, so an activity she
opened and backed out of left no trace at all. "Never discovered" and
"opened it once and hated it" were the same row: absent.

    never seen              -> not discovered
    seen, never opened      -> the tile does not sell it
    opened, zero answers    -> it puts her off on sight
    opened often, unfinished-> too hard, or too long

Reads: `troubled()` (opened twice or more, never finished — the repeat
abandon), `ignored()`, `undiscovered(allIds)`, `tally()`.

`js/app.js` records the open in `launch()` and the leave in `leaving()`,
closing the previous activity first so game->game without touching the hub
still records. `js/endscreen.js` records the finish — **fifteen games call
`GH.endScreen.render()`, so that is one hook, not fifteen.**

`graded()` added: a lifetime answer count the cap never touches. Using
`ev.length` to measure a bounce works until the cap is reached, at which
point every activity looks like a bounce for ever.

### FIXED: five English strings were showing in Russian and German

An i18n audit found **12 duplicated keys**. The English copy had been
pasted below the translated one and the later key wins, so `refAll`,
`refCollapseAll`, `refExpandAll` and `refTapHint2` were English in all
three languages, and `pkSchool` appeared three times in Russian. All on the
word list. Russian and German have their own strings back.

### Not built, and why

**Points for looking words up.** The design assumed a reveal. There isn't
one — the word list prints every gloss on every row, so "20 words revealed"
would have measured scrolling. The only real reveal in the app is
`dictview`, which has five entries. Revisit when the dictionary grows.

**`der Platz` is still in neither file** — it sits in song-words.js marked
`want:'dict'`, so `место` cannot find it. It is the clearest argument for
the dictionary's editorial rule: words that need a definition rather than a
translation. 231 are queued (77 song `want:'def'`, 21 undrawable course
words, 133 `img:0` bank rows).

**Tile impressions.** `seen()` exists and nothing calls it — the hub needs
an IntersectionObserver. Without it, `undiscovered()` cannot answer.

**Changed — THE PET'S GREETING GETS A PORTRAIT**

The 26px face in the header is a control: enough to tell which animal and
to be tapped. But the greeting card held a whole sentence of speech beside
nothing, so it read as a caption rather than an animal talking.

- `js/app.js` — `.pt-strip-say` is a row now: a **64px portrait**, then the
  pet's NAME, then the German, then the translation. `pets[0]` is the
  speaker, the same one `petSpeak()` picks, and `strip()` builds a fresh
  `<img>` per call so the header's face is not stolen.
- `css/style.css` — `.pt-strip-face` (64px, `flex:0 0 auto` so a long
  German sentence cannot squash it to nothing), `.pt-strip-words`,
  `.pt-strip-who`.

The name is there because with three pets on the shelf a portrait alone is
not always enough, and the name is the reason she chose it.

Verified: Mimi's portrait resolves to `images/pets/mimi-the-baby-unicorn.webp`,
the card names her, and both the German and the translation render.

**Fixed — A RIGHT ANSWER NEVER SAID WHAT THE WORD MEANT**

`gotIt()` showed a tick, the word 'Correct', and a streak count. Not the
German it had just tested and not the gloss. **A WRONG answer named the
German** — so the one moment she was certain she knew the word was the one
moment the app would not confirm it.

Being right is exactly when the pairing is worth reinforcing.

- `js/activities/vocabgame.js` — `glossOf(word)`, shared by both panels.
  `gotIt()` now shows the German large with the gloss under it; `missNote()`
  gained the gloss too, because knowing `das Licht` was the answer does not
  tell her it means light.
- `css/style.css` — `.vg-face*`, and `.vg-got` became a column with
  `.vg-got-top` holding the tick and the streak.

### It reads the SENSE, not the headword

`packs.vocab()` has already expanded a multi-sense headword into one item
per sense, so `word.ru` here is that sense's own gloss and `word.def` its
own definition. `der Fuß` confirms as:

    ступня    Нижняя часть ноги, на которой человек стоит.
    подножие  Нижняя часть чего-то большого, например горы.
    фут       Старая мера длины, около тридцати сантиметров.

rather than as the bank's combined «ступня / нога». Verified that no sense
shows a slash-joined gloss.

Nothing in German mode: a German interface showing a Russian gloss is what
German mode exists to prevent.

The hold is about 1.6 seconds — the word is spoken and the picture stays —
so this is the German and one line under it, nothing to read and nothing to
dismiss. The streak line still only appears from three.

**Changed — THE PET FACES MOVED INTO THE HEADER, AND THE GRID IS AN OVERLAY**

v202 put the faces at the top of the hub, which meant the pet existed on
one screen out of thirty. A pet visible only where she chooses what to do
is a menu decoration; a pet in the header is present while she works.

- `js/petstrip.js` — **new file.** `GH.petStrip`. Up to three faces
  mounted into `.topbar-controls`, the same way theme.js mounts its type
  picker. Overlapped by 9px so three take the space of about two.
- `js/app.js` — the faces and the grid are gone from the hub. What stays
  is the SENTENCE, which is the one thing that does not belong in a
  header: a line of dialogue in a topbar is a banner, and it would follow
  her into every round.
- `js/activities/store.js` — calls `GH.petStrip.refresh()` on paint.
  Buying, swapping and growing all repaint the store and none of them
  broadcasts anything, so the header would otherwise go stale.
- `js/nav.js` — **`.ptg-overlay.is-open` added to `overlayOpen()`.** It was
  the third overlay in the app and the only one not in that list, so a tap
  or swipe behind it would have advanced the screen underneath.
- `js/i18n.js` — `ptAllPets` x 3.
- `css/style.css` — `.petstrip*`, `.ptg-*`. The old `.pt-mini`,
  `.pt-strip-faces` and `.pt-cell*` rules removed rather than left to rot.

### Three, and the number is not this file's decision

`GH_PETS.slots` has three entries — the second costs 1,500 Kronen, the
third 4,500 — and `store.chosen()` already caps its list at whatever she
has bought. petstrip.js asks rather than deciding.

### The grid is an overlay, not a screen

The faces are reachable from anywhere, so the grid must be too, and
opening it must not throw away a round. It behaves like the lightbox:
over the page, backdrop and Escape close it, nothing behind it disturbed —
with the same `capture:true` and `stopImmediatePropagation` that
lightbox.js needs, because nav.js also listens for Escape on `document`.

Tapping a pet DOES go to the store, and from mid-round that costs the
round. Deliberately: same cost as pressing Back, and it was her tap.

Owned cells also show the German word. The grid is the one place all
sixteen are visible at once, and a pet is a vocabulary card as well as a
trophy. Unowned cells stay greyed and legible — a row of blanks is nothing
to want.

Verified with four pets owned, three slots, three chosen: three faces in
the header with real webp sources; 16 cells, 4 owned, 12 greyed, 3 picked;
the German word on the 4 owned only; tapping a greyed pet routes through
`app.play` and lands the shelf on that card; and with no pets owned the
header hides itself rather than showing an empty frame.

**Added — HER PETS AT THE TOP OF THE HUB, AND THE PET FINALLY GREETS HER**

### It was never a bug. The pet was never there.

`GH.store` appeared ONCE in app.js — for the store tile. The hub rendered
no pet at all. The pet only ever showed up on the end screen, so buying
Mimi bought something that appeared after a round and was absent from the
screen she opens.

**Every one of the sixteen pets has had a `welcome` band written for
months.** Nothing had ever asked for it.

- `js/petvoice.js` — `bandLine(petId, band)`. `lineFor()` derives the band
  from how the round went, which is right on an end screen and meaningless
  on arrival. Same name filling, same translation rules, same
  null-is-an-answer contract.
- `js/activities/store.js` — `strip()`, `shelf()` and `chosen()` exposed.
  All of it already existed inside the file and none of it was reachable.
- `js/activities/store.js` — `open(container, onExit, focus)`. A pet id
  scrolls to that card and outlines it, then clears itself so a later
  repaint does not drag her back to it.
- `js/app.js` — `petStrip()` and `petGrid()`. 26px faces above the
  greeting; tapping opens all sixteen, hers in colour and the rest
  greyscale at 45%; tapping any cell goes to the store AT that pet.
- `js/i18n.js` — `ptYourPets` x 3.
- `css/style.css` — `.pt-strip*`, `.pt-mini`, `.pt-grid`, `.pt-cell*`,
  `.pt-card.is-focus`.

### One utterance per arrival, not per paint

`sawPet` is cleared in `leaving()`, the same place the scroll position is
kept. Without that the pet would speak once EVER, because the hub repaints
on every language switch, filter change and return from a game. The grid
closes there too — coming back from the store to a grid opened four screens
ago is clutter, not state.

### The bug I nearly shipped

`art()` returns a ready `<img>`, not a URL. `GH.petArt.tile()` builds the
element and wires the whole fallback chain into it — form 2 art, then form
1, then the plain name — because the drawings arrive over weeks. My first
version did `img.src = p.pic`, which is `"[object Object]"`. Caught by the
harness printing the src. Strip and grid append the element now, and the
CSS targets `.pt-cell-img` rather than a bare `img`.

Verified against real pet data: pictures are elements with
`images/pets/*.webp` sources and a wired error chain, 16 cells, owned and
picked counts correct, focus marks exactly one card, a bogus focus id marks
none, and no pets owned means no strip at all.

### A false alarm worth recording

I flagged `--yes-rgb`, `--no-rgb` and `--scrim-rgb` as defined in one theme
of twelve. They are in `:root` and no theme overrides them, so they apply
everywhere — correct/incorrect green is deliberately theme-independent. The
audit counted definitions rather than availability.

**Fixed — THE OPTION BUTTONS WERE FAILING BY ONE PIXEL**

`.options` was already `repeat(auto-fit, minmax(150px, 1fr))`. Two 150px
tracks plus an 11px gap needs **311px**. On a 393pt phone, after the page
and card padding, the row measures about **310**. So every single-word
option got its own line and four choices filled three quarters of the
screen.

Floor lowered to `minmax(min(130px, 100%), 1fr)`:

    device                  row   old(150)  new(130)
    iPhone SE      320pt    237      1          1
    iPhone 13 mini 375pt    292      1          2
    iPhone 15      393pt    310      1          2
    iPhone Pro Max 430pt    347      2          2
    iPad portrait  768pt    685      4          4

**The 320pt SE stays single-column on purpose.** Dropping the floor to 110
would fit two there, and then a ten-letter word like `Hafermilch` wraps
inside its own button — worse than a tall list.

`min(130px, 100%)` guards the opposite failure: in a container narrower
than the floor a bare 130px track overflows rather than collapsing.

### A long option still gets the whole row

`.option.is-wide` sets `grid-column:1 / -1`, and fill-blank sets it from
the LONGEST option in the set rather than per button — mixed widths in a
grid look like a mistake. Threshold 14 characters: `Haben`, `Das`,
`Kleid`, `Hafermilch`, `im Voraus` go two per row; `auf keinen Fall` and
`zusammen einen Film ansehen` take a full row.

### Not touched

The same waste exists in `.rd-choice`, `.dg-choice` and `.tl-choice`. The
dialogue and lesson ones are deliberately full-width because their options
are whole sentences. **The reader's `mc` choices are the one worth
looking at.**

**Fixed — TWO BUGS BEHIND "NO POINTS?" ON A SET BREAK**

### 1. The set break pays nothing and never said so

`paintSetBreak()` passes no `coins` at all. That is correct — a set break is
a pause INSIDE one round, and paying twelve at a time would make a
fifty-question topic worth four exercises instead of one. Payment happens
at `paintDone()`, when the topic is finished.

But the screen showed a score, a streak, the misses and **no coins**, which
reads exactly like a round that earned nothing. `fbPayAtEnd` now says so:
"Kronen come when the topic is finished." Fill-blank is the only activity
with a set break, so this is the only place it happens.

### 2. FIVE activities have never shown an achievement

The end screen reads `spec.awards`. **catch-word, conveyor, fill-blank,
gender and wrong-form pass `won:`** — nine others pass `awards:`. In those
five, an achievement was earned, paid by awards.js, and never displayed.
It also silently dropped out of the v182 total row.

`js/endscreen.js` now accepts either — `spec.awards || spec.won` — fixed at
the one place that reads it rather than in five files, because the sixth
activity to be written will guess too.

### Also noted: `state.run` is not reset by Keep going

`r.saw(id, ok)` refuses a repeated id, which is what stops a retry counting
twice. Keep going rebuilds the rounds but keeps the same run and reuses
`r0..r11`, so every answer in the second set is refused and `answered`
stays at twelve. Not fixed — it needs a decision about whether a second
set through the same sentences should pay at all.

### Why some blanks explain themselves and others do not

Measured over every blank fill-blank can produce from the sentence bank:
**1,236 blanks, 494 explained (40%), 742 silent.**

The silent ones are mostly not fixable by better code. The top 24 are 41%
of them and include `ist` (55x), **`Tanya` (51x) and `Nazar` (31x)** — names
— plus `Die`, `Das`, `Der`, `Wo`, `Wohin`, `Wen`, `Woher`, which are
grammar rather than vocabulary and have no gloss to give.

The genuinely missing ones are worth adding as vocabulary and would then be
explained for free: `habe`, `brauche`, `liegt`, `kommt`, `geht`, `läuft`,
`möchte`, `mache`, `frisst`, `sind`, and the adverbs `sehr` and `gut`.


**Fixed — LIME GREEN ON CREAM IN THE LESSON EXAMPLES**

`.ls-eg` set `background:var(--paper)` and declared no ink, so nested
inside a `.card` it kept the DARK surface's variables. Measured on the
default theme:

    --fg        on-dark    #F9EDDF on #FFF5E8 =  1.07:1   FAIL
    --fg-soft   sand       #FCD0A1 on #FFF5E8 =  1.33:1   FAIL
    --fg-accent flame-pale #FFB59C on #FFF5E8 =  1.58:1   FAIL

After declaring the light ink:

    --fg        ink        #3C2F36 on #FFF5E8 = 11.79:1   PASS
    --fg-soft   ink-soft   #6B5860 on #FFF5E8 =  6.11:1   PASS
    --fg-accent ink        #3C2F36 on #FFF5E8 = 11.79:1   PASS

**No type variant or theme could have rescued it.** `loud` lifts
`--fg-soft` to `--fg`, but both were the dark surface's — every variant
and every theme printed pale on cream.

### It was 34 rules, not one

Audited every rule that paints `--paper`, `--sand-wash`, `--sand` or
`#fff` and sets neither a `color` nor an `--fg`: **thirty-four**, across
catch-word, conjugate, wrong-form, grammar, scramble, conveyor, the store,
lessons, placement, the comics, the end screen and the how-to overlay.
Whether each was actually broken depended on whether its parent happened
to be light — which is not a thing to leave to luck.

All thirty-four now declare the light ink in one block. Harmless where the
parent was already light: identical values. The audit is written into the
comment so it can be re-run after any colour work.

Remaining hits are `.cm-thumb`, `.cm-page` and `.pt-say::before` — two
image containers and a CSS triangle. No text in any of them.

### The highlight had to be rebuilt

With the ink fixed, `--fg-accent` on a light surface is `--ink` — the same
colour as the rest of the line, so the emphasis vanished along with the bad
contrast. `.ls-eg-de b` is now dark ink, bold, on a soft flame wash: a
highlighter pen rather than a colour change, so it reads at a glance and
does not depend on colour to carry the meaning.

### `paint-audit.py` has still never been run

It checks every text colour against 4.5:1 in every theme and flags anything
under 0.85rem. 343 colour declarations were rewritten without it. This
bug is exactly what it exists to catch and it took a screenshot to find.


**Changed — THE EVENT LOG RECORDS THE DEVICE**

One character on every row: `p` phone, `t` tablet, `d` desktop, `?`
unknown. On the ROW rather than in a table of its own, because the question
worth asking is not "does she use a phone" — it is whether she does
DIFFERENT things on each. `GH.events.byDevice()` answers it: answers,
accuracy and which games, per device.

Two characters per row against a 5MB budget is nothing.

### NOT user-agent sniffing

An iPad in Safari reports itself as a Macintosh and has done since iPadOS
13, so any UA test calls her tablet a desktop.

The test is `(pointer: coarse)`, which asks about the PRIMARY pointer, and
that is the right question. **My first version tested for the PRESENCE of
touch and called a touchscreen laptop a tablet** — it reports ten touch
points and is still a desktop, because the thing she points with is a
trackpad. Touch presence is now only the fallback for a browser with no
matchMedia.

Measured once per load, from the SHORT side of the screen, so rotating the
phone cannot look like a new device.

### Sessions, one per device per day

`m.sess` — `day | dev | viewport width | height`, capped at 800. Separate
from `days` because a day she used both her phone and her laptop is one day
and two sessions, and collapsing that loses the more interesting half. The
viewport is kept because whether she ever sees the two-column song list is
a layout question nothing else in the app can answer.

`days` stays a plain list of numbers, so everything already reading it is
untouched.

### Schema 2

`dump().v` is 2. A v1 file has four-part event rows and no sessions; `all()`
reads a four-part row as `dev:'?'` rather than breaking.

Verified on six devices — iPhone, iPad reporting as a Mac, Mac mini,
touchscreen laptop, Android phone, and a browser with no matchMedia — all
six correct. Plus: one day on two devices records one day and two sessions,
re-opening on the same device adds no session, and byDevice() correctly
separates listen-pick on the phone from fill-blank on the desktop.


**Fixed — ESCAPE CLOSED THE PICTURE AND THE SCREEN BEHIND IT**

Two `document` keydown listeners. lightbox.js loads first so its handler
ran first, closed the overlay, and THEN nav.js's ran — nav correctly
refuses Escape while an overlay is open, but by the time it looked the
class had already been cleared. One press did both.

`e.preventDefault()` does not stop another listener, and
`stopPropagation` only stops them on OTHER nodes. Both of these are on
`document`, so **`stopImmediatePropagation` is the only thing that
reaches**. Registered with `capture:true` as well, so it no longer depends
on lightbox.js being loaded before nav.js — a load-order dependency
invisible in the source is a bug waiting for the next reshuffle of
index.html.

- `js/lightbox.js` — stopImmediatePropagation + capture. Also now accepts
  `Esc` as well as `Escape`, which nav.js already did and this did not.
- `js/howto.js` — **the same bug and worse: it never checked whether the
  overlay was open.** Escape on any game screen closed a closed overlay
  and let nav leave the page. Every game's `?` button had this.

Simulated both handlers in load order: with the picture open, one handler
runs and the page does not leave. With it shut, both run and Escape leaves
normally. Two presses to get out, which is what it should always have been.


**Changed — TAP A SONG-VOCAB PICTURE TO ENLARGE IT**

The thumbnails are 62px, which is right for scanning a list of 88 words and
useless for actually looking at the drawing.

- `js/activities/songvocab.js` — the thumbnail is a BUTTON now and calls
  `GH.lightbox.open(r.img, caption)` — the sheet-crop entry point, the same
  crop as the thumbnail, just bigger.
- `js/nav.js` — `.sw-lens` in `KEEP`, or the tap would also advance
  whatever is behind it.
- `css/style.css` — every button default undone (border, padding,
  background all push the drawing off centre), plus a ring and a 4% lift
  on hover so it reads as tappable, and both suppressed under
  prefers-reduced-motion.

### The caption comes from resolve(), not the raw entry

`lightbox.open()` reads `word.ru` in Russian and `word.en` otherwise. Both
are filled with the gloss `resolve()` already worked out for her current
language — so `der Fuß` opens image 558 captioned **ступня**, the
dictionary's corrected sense, rather than the bank's ambiguous
«ступня / нога».

In German both are deliberately EMPTY. `r.gloss` is '' there and falling
back to `r.other` would caption a German card in English, which is the one
thing German mode exists to avoid.

Verified across all eight songs and all three languages: **146 pictures,
146 lens buttons, 146 lightbox calls**, every call carrying an image number
and the German, an aria-label on each, and no English leaking into German
mode.


**Changed — THE LESSON GAME SOCKET AND A DATA-DRIVEN UNLOCK**

Steven is writing a game that unlocks partway through a lesson. The socket
and the gate are built; the game is his.

### The contract — one function

    GH.lessonGame = {
      open: function(host, ctx, onDone){ ... }
    };

`host` is an empty element. The header and the Back link are painted
already, so the game does not draw its own.

`ctx` carries everything it should not have to look up:

    lesson   the GH_TANYA record
    words    this lesson's course words, RESOLVED out of vocab.js —
             full entries with de/en/ru, both example sentences and an
             image number where one exists. tl-01 declares
             kaps:['kap16','kap17'], so ctx.words is 23 entries.
    story    the lesson's sentences
    lang     her interface language right now

`onDone(won)` — truthy marks the stage done and pays; **falsy leaves it
unfinished**, so a game she loses or abandons costs nothing and can be
replayed.

No `GH.lessonGame` on the page and the stage says so and offers Back. It
does not throw and it does not pretend to be finished.

### The unlock rule is now data

`STAGES` entries take an optional `after`:

    absent    the stage before it, as now — a straight ladder
    a number  ANY that many other stages, in any order
    an array  those named stages, all of them

The game is `after:3`. Gating on a COUNT rather than on position is the
point: doing three of the four earning it is a different promise from
grinding all four in a fixed order. Verified — the game opens at exactly
three, before `order` and `listen` are touched, and playing the game
cannot satisfy its own gate because `othersDone()` excludes the stage
being tested.

### A shut stage now says why

`Opens after 2 more stages (3 in all)` or `First: Missing words`. A row
that is grey for no stated reason reads as a fault.

### The game runs before the German arrives

`tl-01` is `ready:false` and the four story stages cannot run without the
prose — but the game runs off her WORDS, which exist. Holding back the only
playable thing until the prose lands would be the wrong way round, so an
unready lesson offers the game directly.

- `js/activities/tanyalesson.js` — `othersDone()`, `whyShut()`,
  `courseWords()`, `stageGame()`, the `game` stage.
- `js/i18n.js` — 5 keys x 3: `tlGame`, `tlGameSub`, `tlAfterN`,
  `tlAfterThese`, `tlGameMissing`.
- `css/style.css` — `.tl-stage-why`, `.tl-game`.

### The defect still open, and it is the important one

`only:'lesson'` locks those 30 words out of every game PERMANENTLY. She
learns them once, finishes the lesson, and never meets them again — the
retention machinery is switched off for exactly the words her class is
testing. The fix is that words GRADUATE when their lesson is finished: one
condition in `packs.playable()`. Not built.


**Changed — A LESSONS CATEGORY, AND TANYA LESSONS IS WIRED IN**

The Lessons row already existed (`lsHead`, above the games, holding the 17
grammar lessons). It is now an **opt-in row** like the others:

- `js/app.js` — anything registering `kind:'lesson'` appears there.
  Registered lessons come **first**, grammar lessons below: hers is what she
  is being taught this month, the grammar library can wait. And `games` is
  now `!== 'read' && !== 'ref' && !== 'lesson'` — the same default-yes trap
  that put the dictionary in two rows at once.
- `js/activities/tanyalesson.js` — moved from `kind:'ref'` to
  `kind:'lesson'`, and **now loaded** by index.html.
- `data/tanya-lessons.js` — **now loaded.** `tl-01` Tanya Lesson One,
  `ready:false`.
- `js/activities/gameguide.js` — a Lessons group, listed first.
- `js/i18n.js` — **40 `tl*` keys x 3 languages**, plus `gdLesson`.
  Verified: every key the screen asks for resolves in ru, de and en.
- `css/style.css` — `.tl-*`.

### The lesson is live and says what it is waiting for

`ready:false` means the screen lists the lesson, opens it, and shows what
is missing — the German text, the questions, the gaps, the removable lines,
the four events — with the English story readable underneath. It does not
run a stage against ten empty strings.

### Five stages, no rest, no tutor

`read` -> `words` -> `line` -> `order` -> `listen`. Stages unlock in order,
a finished stage stays finished, redoing one pays nothing twice. **Only
`read` shows the translation**, which is what stops the four damaged stages
from being given away — and it is why the Reader's five-day rest is
deliberately absent here. A wall between stage one and stage two would break
the only idea the lesson has.

All five finished calls `GH.awards.check()`. All lessons finished grants
`GH.store.grantToken('rare', 1)`, guarded on its own record so it cannot
fire twice.

### Still needed from Steven

The ten short German/Russian stories are in hand and supersede the single
long one this was built for. Per lesson: the removable lines with three
wrong replies each, four comprehension questions, and the four events for
the sequence. The **plain-language definitions for all 30 words** have
arrived in English and Russian and are not yet in `dictionary.js`.

### No achievement entries exist yet

`awards.js` has no `tanya-*` entries, so `check()` currently pays nothing
for a finished lesson. `GH.tanyaLesson.stats()` returns
`{lessons, finished, stages, all}` for a test to read. Blocked on knowing
how many lessons there will be.


**Changed — WHAT THESE GAMES ARE, in the app**

A glyph and a name tell her nothing. `⚖️ der · die · das` does not say
whether she wants it, so choosing between fifteen activities meant opening
fifteen of them.

- `js/activities/gameguide.js` — **new file.** `GH.guide`. A page of cards,
  one per registered activity, grouped Games / Read and listen / Reference.
  Rule 1 as the summary, the rest on tap, and a **Play** button on every
  card.
- `js/app.js` — a **"What are these games?"** button, inserted BEFORE the
  tiles grid (`section()` has already appended the grid by then, so
  appendChild would have buried it under fifteen tiles). Also new:
  `GH.app.list()` and `GH.app.play(a)` — the guide must not open an
  activity itself, because `launch()` is what tells the event log which
  game she is using and it lives in app.js.
- Ten activity files — each now declares `rules:'xxRule'` and
  `rulesTitle:'xxTitle'` in its registration entry.
- `js/i18n.js` — 8 guide keys x 3, plus **plRule1-5 x 3, which did not
  exist**.
- `css/style.css` — `.gd-*`.

### It writes no descriptions of its own

Every game already ships five rule lines in three languages for the `?`
How-to-play overlay. That text is already hers, already translated. A second
set would be thirty more strings to keep in step with the first thirty, and
they would disagree within a month. So the guide collects `prefix + 1, 2,
3…` until a key is missing, exactly as howto.js does, and a game added next
month appears by declaring two fields.

### `placement` had a How-to-play button and NO rule text

`GH.howto.button('plTitle','plRule')` with no `plRule*` keys in any
language — the overlay has been opening with a title and an empty list.
Written now, in its own wording, reusing the level names already in the
file.

Verified in all three languages: 10 activities, 48 rule lines each
language, a card and a Play button per activity, Play hands the activity
back to app.js, expanding reveals the rest.

### Also fixed: I clobbered vocabgame.js

Bulk-copying the activity files in to read their headers overwrote the v178
`vocabgame.js` — the one carrying the `keyOf`/`same()` sense fixes — with
the older uploaded copy. Restored from outputs and the manifest verifies
clean. **`audit.sh` caught it, which is what it is for.**

### Not wired: Tanya Lessons

`data/tanya-lessons.js` and `js/activities/tanyalesson.js` are written and
in neither `index.html` nor the manifest. They were built for one long
story; the ten short stories with German and Russian now supersede that, and
the plain-language definitions for all 30 words have arrived too.


**Changed — HER COURSE WORDS ARE OUT OF GENERAL PLAY, AND PET TOKENS**

### `only:'lesson'`

All 30 course words carry it, and `packs.playable()` excludes any word with
an `only` field from `vocab()`. **Not a pack** — a pack can be switched on
and this is not a preference. Verified: zero leakage with default packs AND
with every optional pack switched on. `packs.all()` no longer counts them
as pack content either, so Settings does not report 30 phantom words in
`more`.

The nine that already existed are back in their original packs (`verbs`,
`jobs`, `more`); the `pack:'core'` change from v191 is reverted, because
`only` does the job properly.

Reachable by `GH.packs.onlyOf('lesson')` -> 30, or
`onlyOf('lesson','kap17')` -> 15.

### Pet tokens: common, rare, epic

A token takes any pet of that tier **or below**, free, with no requirement
met. No Kronen, no gate, no waiting.

        common  -> common                      5 pets
        rare    -> common, rare                9 pets
        epic    -> common, rare, epic         12 pets

Written out as a list, NOT `tiers.indexOf(x) <= tiers.indexOf(token)`.
GH_PETS orders its tiers but nothing says the order means anything, and a
tier inserted between rare and epic would silently widen every rare token
already granted.

**Legendary is absent from all three on purpose.** Those are the
twelve-pet, twenty-day-run pets; a token that could take Noir would empty
the far end of the shop.

**Spending picks the CHEAPEST token that works.** Holding one of each, a
common pet spends the common token. An epic token on a common pet is a
waste she cannot undo.

`GH.store.grantToken(kind, n)` — **nothing calls it yet.** The store shows
what she holds, by kind, only when she holds something.

Verified: 5/9/12 buttons per kind, legendary never reachable, cheapest
token chosen for each tier, 0 Kronen moved, all 12 gated pets within reach
offered despite their gate, and a purse holding the old `tokens:2` number
migrates to two rare tokens.

### Still not built

The Tanya Lessons screen, and the achievements. Both need a definition of
what one lesson IS — the achievements hang off "a lesson finished".


**Changed this session — TANYA'S COURSE WORDS ARE IN**

Designed on 25 August, never built. Now built. **`data/vocab.js` is 752 ->
773 entries.**

- **21 new entries**, #815-835, with both sentences in all three languages
  from the GPT/Grok set. `img:0` on every one — most are undrawable
  (*hoffentlich*, *sogar*, *im Voraus*, *auf keinen Fall*) and sprite.js
  sets the German large for a word with no picture, which is the right
  answer for an adverb.
- **9 already existed** and were tagged rather than duplicated: `absagen`,
  `bekommen`, `auf jeden Fall`, `die Schauspielerin`, `bestellen`, `die
  Bestellung`, `verkaufen`, `die Bewegung`, `die Krankheit`. Their existing
  category is untouched — `absagen` stays `time`, not reassigned to
  `arrange`.
- **Two tags each.** The theme is permanent; `kapNN` is where the word
  lives while that chapter is current. `GH.packs.ofCat('kap17')` returns
  15 words, `kap16` 8, `kap18` 10, 30 distinct.

### They are all `pack:'core'`, and that is a deliberate change to 9 entries

Every one of the 21 new numbers falls in 649-9999, which is the `more`
pack, **off by default**. And the nine that already existed sat in `verbs`,
`jobs` and `more` — also all off. So her actual coursework was either
absent or invisible. All 30 now carry `pack:'core'` explicitly, which
overrides the number range.

Verified with every optional pack off: **30 of 30 live.**

### Not built: the hub card

The 25 August design was a *Right now* card at the top of the hub querying
`ofCat('kapNN')` — a pointer, not a container, so nothing moves when the
chapter changes. The data now supports it exactly as designed. The card
itself is not built.

### Pre-existing, not introduced tonight

`vocab.js` has **5 duplicate German entries** — `auf den Bus warten`, `von
der Schule nach Hause kommen`, `zusammen einen Film ansehen`, `kalt`,
`billig`. They are in the uploaded file too. None is one of the 30.
`teilnehmen an` is the only entry in the bank with a single example
sentence; the source gave one.

Nine of the 30 have a drawing, so the picture games can use nine; the other
21 correctly stay out of listen-pick and vocabgame, which both require a
picture.


**Changed this session — THE COINS LOG WAS A RING BUFFER PRETENDING TO BE A RECORD**

`p.log` was capped at 60 entries and dropped the rest in silence. At five
exercises a day that is under two weeks. Worse: **nothing outside coins.js
ever read it** — `coins.recent()` has no caller — so it was a buffer sized
for a display that does not exist, discarding the only record of what was
earned and spent.

And it holds the one thing the event log does not: money, including
SPENDS. She will buy sixteen pets and two slots in her life against
thousands of earnings in the same array, so at 60 entries her entire
purchase history was gone within a fortnight, permanently.

- `js/coins.js`
  - `LOG_CAP = 5000` (~210KB, about two years at eight money events a
    day), and what it drops is **counted** in `p.lost`.
  - **`p.spends`**, its own list, cap 500 — purchases where thousands of
    ten-kronen earnings cannot evict them.
  - `note(p, row)` — one trim, not four copies of the same slice in four
    places, which is how four places came to agree on the wrong number.
  - New accessors: `spends()`, `lost()`, `logAll()`.
  - Purses written before these fields existed migrate on read.

Proved with the exact case the old cap destroyed: 6,036 money events with
18 purchases interleaved. 5,000 kept, 1,036 dropped and counted, **4
purchases evicted from the running log, 0 lost overall.** An old purse with
neither field opens and spends without throwing.

**Files as of `?v=189` — THE EVENT LOG**

The app knew two things and could not join them. `gh-progress-v1` knew
`der Kühlschrank` is at 40% over her last twelve attempts but not which
game asked, because `grade(key, ok)` was never told. `gh-coins-v1` knew
she played listen-pick at 21:40 but kept only the **last 60** entries and
nothing about what was answered. So nothing could answer *what is actually
helping her*, which needs the item, the activity and the outcome in one
row.

- `js/events.js` — **new file.** `gh-events-v1`. Per graded answer:
  `t | game | key | ok`. Plus a day number per day the app was opened.
  `key` is the tutor's own key, so the log joins onto `gh-progress-v1` and
  `gh-sched-v1` with no translation.
- `js/tutor.js` — `grade(key, ok, from)`. Third argument optional; falls
  back to whatever app.js said is on screen. Guarded, so the app still
  works with events.js absent.
- `js/app.js` — `launch(fn, id)` sets the current activity. **One place,
  not 45 grade() call sites across 20 files** — and a game added next
  month is attributed without being told to be. The five direct mounts
  (`openSentences`, `openStory`, `openLongStory`, `openVocab`) set it
  themselves because they never went through `launch()`.
- `index.html` — events.js loads after progress.js, before tutor.js.

### It also fixes the attendance bug

`hub()` now calls `GH.events.visit()`, ungated. coach.js counted a day
inside `greeting()`, which app.js only calls when the coach is unmuted —
so muting the encouraging sentence silently stopped the attendance count
and the streak. The visit record is not attached to anything she can
switch off.

`hub()` also clears the current activity. An answer with no activity logs
as `?`, which is honest; an answer attributed to the last screen she was
on would be a lie in the data.

### Numbers, measured not guessed

6,000 events serialise to 196KB, so the cap is **20,000 ≈ 650KB** — over a
year at fifty answers a day. Two profiles is 1.3MB against a 5MB origin
budget. A full localStorage sets `stopped` and the log gives up rather
than throwing into the middle of a round. Reaching the cap drops the
oldest and counts them in `dropped`, so a truncated log cannot be read as
a complete one.

### What it does NOT do

No export, no analysis, no view. `GH.events.dump()` returns everything for
the current profile with a schema version and the build number, ready for
whatever exports it. Nothing calls it yet.

**IT IS PERSONAL DATA.** A dated record of everything she got wrong. It
never leaves the device, but anything that exports it should say what it is
in plain words rather than being labelled 'Export'.

Verified: all ten `grade()` prefixes reach the log, attribution is correct
across a game switch, profiles do not mix, a visit records once per day,
the progress record and the scheduler are unchanged, the cap holds, a full
disk does not throw, and the local-time day number round-trips to the
right date.

**Files as of `?v=188` — ALL EIGHT SONGS HAVE WORD LISTS**

**404 references, 339 distinct.** 127 resolve through vocab.js, 2 through
the dictionary, 210 rows in the file.

    1  Unterwegs bei Sonne, unterwegs bei Regen   35
    2  Das Bett sieht so schön aus                32
    3  Dein Körper braucht Liebe                  50
    4  Der kleine Ninja                           31
    5  Das Lied zweier Herzen                     88
    6  Für Tanusha                                46
    7  Hafermilch-Cappuccino in unserem Café      48
    8  Ich bin ein Berliner – Teil 2              74

### THE RESOLUTION ORDER WAS WRONG. Dictionary now comes FIRST.

`der Fuß` is in both files: «ступня / нога» in vocab.js and ступня ·
подножие · фут in dictionary.js. The bank's gloss is the exact ambiguity
the dictionary entry was written to fix — `das Bein` is also нога — and
checking vocab first showed the old answer and hid the three senses.

Nothing is lost going this way round: a sense carries its own image
number, so `der Fuß` still arrives with #558 on sense one. And this is the
order `packs.vocab()` already used, where a dictionary headword takes over
its GH_VOCAB entry outright. The two now agree.

Three words are in both files: `der Fuß`, `halten`, `treffen`. Only
`der Fuß` is referenced by a song, so this fixed one card today and
prevents the other two the moment a song asks for them.

### Cross-song disagreements, all eleven

  der Abschied · der Fuß · der Platz · der Traum · der Weg · erschöpft ·
  hell · langsam · scheinen · strecken · vergehen

`der Platz` was given three different readings in three songs (place;
space / square / plaza / place) and `der Traum` four. Every one is listed
in the file header rather than left in a chat log.

Waiting on: **77 definitions, 69 drawings, 63 undecided, 1 dictionary
move.**

### Still open

27 single words left Das Bett and Der kleine Ninja when the cleaned lists
arrived. Most are already in vocab.js so nothing is lost from the app, but
they are no longer on those songs' pages. Raised, not decided.

**Files as of `?v=187` — SEVEN OF EIGHT SONGS HAVE WORD LISTS**

**354 references, 301 distinct.** 105 resolve through vocab.js, 2 through
the dictionary, 194 rows in the file.

    1  Unterwegs bei Sonne, unterwegs bei Regen   35
    2  Das Bett sieht so schön aus                32
    4  Der kleine Ninja                           31
    5  Das Lied zweier Herzen                     88
    6  Für Tanusha                                46
    7  Hafermilch-Cappuccino in unserem Café      48
    8  Ich bin ein Berliner – Teil 2              74

Only **3 Dein Körper braucht Liebe** has no list, and therefore no button.

### `der Platz` is now confirmed three times over

  Unterwegs  place; space      Herzen  square / plaza      Tanusha  place

Three songs, three readings, given independently. Along with `der Traum`
(four songs, three Russian orderings) and `scheinen` (to shine / to seem;
shine) these are the words no single gloss can hold. All three carry
`want:'dict'` or already live in dictionary.js.

Every cross-song disagreement found so far is listed in the file header.

Waiting on: **78 definitions, 71 drawings, 44 undecided, 1 dictionary
move.**

### Still open from `?v=186`

27 single words were dropped from Das Bett and Der kleine Ninja when the
cleaned lists arrived — `das Herz`, `der Ninja`, `das Fenster`, `der
Apfel`, `die Küche` and so on. Most are already in vocab.js so nothing is
lost from the app, but they are no longer on those songs' pages. Raised,
not decided.

**Files as of `?v=186` — THE CLEANED LISTS FOR SONGS 2 AND 4**

Das Bett went 61 -> 32 and Der kleine Ninja 59 -> 31: dictionary forms
only, phrases removed. **319 references, 275 distinct.** 108 resolve
through vocab.js, 5 through the dictionary, 206 rows in the file (187
unique).

  2  Das Bett sieht so schön aus              32
  4  Der kleine Ninja                         31
  5  Das Lied zweier Herzen                   88
  6  Für Tanusha                              46
  7  Hafermilch-Cappuccino in unserem Café    48
  8  Ich bin ein Berliner – Teil 2            74

Songs 1 and 3 have no list and therefore no button.

### `slot` items are now zero; the handling stays

The cleaned lists removed every placeholder phrase, so `sayable()` has
nothing to do against the current data. It is kept deliberately: delete it
and the next slot phrase added reads its own ellipsis aloud. `phrase` is
down to 11, all reflexives and separables from the earlier four lists.

### 27 single words were dropped along with the phrases

Not just phrases. Ninja lost `das Herz`, `der Ninja`, `lernen`, `das Buch`,
`der Tisch`, `der Lehrer`, `lachen`, `spielen`, `werden`, `der Arzt`, `der
Filmstar`, `die Antwort`, `die Stimme`, `eben`. Das Bett lost `der Morgen`,
`schnell`, `das Fenster`, `das Sonnenlicht`, `scheinen`, `der Schlaf`, `das
Make-up`, `die Küche`, `hungrig`, `das Frühstück`, `der Apfel`, `der
Teller`, `die Schlüssel`. Most are already in vocab.js, so nothing is lost
from the app — but they are no longer on those songs' pages. **Raised, not
decided.**

`die Schlüssel` (plural, glossed "keys") was replaced by `der Schlüssel`
(singular, "key"), which is the correct form and restores the minimal pair
against `die Schüssel`.

### `scheinen` still needs to move

The cross-song conflict is gone — Das Bett dropped it — but `to seem;
shine` is one gloss doing a dictionary's job. `want:'dict'`.

Waiting on: **78 definitions, 71 drawings, 37 undecided, 1 dictionary
move.**

**Files as of `?v=185` — SIX SONGS HAVE WORD LISTS**

Das Bett (61) · Der kleine Ninja (59) · Das Lied zweier Herzen (88) · Für
Tanusha (46) · Hafermilch-Cappuccino (48) · Ich bin ein Berliner Teil 2
(74). **376 references, 327 distinct.** Songs 1 and 3 have no list.

  108 resolve through vocab.js · 2 through dictionary.js · 217 rows here

### Phrases are not a separate bank

175 of the 752 vocab entries are ALREADY multi-word. A phrase resolves like
a word and needs no second file. `kind` is computed from the string, not
judged: `word` (166), `phrase` (43), `slot` (8).

The eight `slot` items — `so tun, als …`, `an etwas denken`, `jemandem
etwas bringen` — cannot be read aloud as written. `sayable()` substitutes
the placeholders for speech (`jemandem` -> `ihm`, `etwas` -> `das`) while
the card still shows the real form, because the placeholder is what is
being taught. Nothing tests them.

### `scheinen` had to become a dictionary word

`to shine` in Das Bett, `to seem; to shine` in Der kleine Ninja. Both
senses are genuinely used, in different songs. One gloss cannot serve both.
Marked `want:'dict'`.

### 67 rows are unflagged

The lists for Das Bett and Der kleine Ninja arrived without the
picture/definition column the other four had, so 67 rows carry
`want:'flag'` — nobody has said which of them want drawing. The page does
not care (picture if `img` is set, gloss otherwise) but the to-do list is
incomplete until they are marked.

Waiting on: **78 definitions, 71 drawings, 67 undecided, 1 dictionary
move.**

Verified in all three languages: 376 of 376 resolve, every card says
something beyond the German, 113 show a real drawing, none points at a
sheet that is not on disk, and zero rows duplicate another file.

**Files as of `?v=184` — THE SONG WORD LISTS**

Four of eight songs have one: Das Lied zweier Herzen (88), Für Tanusha
(46), Hafermilch-Cappuccino in unserem Café (48), Ich bin ein Berliner –
Teil 2 (74). **256 references, 218 distinct.** Songs 1-4 have no list and
therefore no button.

- `data/song-words.js` — **new file.** `window.GH_SONGWORDS`, two parts:
  `songs` maps a song to a list of German words and holds NO text at all;
  `words` holds a row only for a word that exists nowhere else — 151 of
  them.
- `js/activities/songvocab.js` — **new file.** `GH.songWords`. Resolves
  each reference: `GH_VOCAB` first, then `GH_DICT`, then its own rows.
- `js/activities/songbook.js` — a Wortschatz button in the tools row,
  shown only where `GH.songWords.has(song)`. Returns to the SONG, not the
  list. Also: the stale comment claiming Safari cannot play Vorbis is out.
- `js/i18n.js` — 4 keys x 3, `sw*`.
- `js/nav.js` — `.sg-words` and `.sw-de` added to `KEEP`.
- `css/style.css` — `.sw-*`, two columns above 720px.

### Keyed on the audio stem, not the index

Songs 4-8 carry no `n` field and `songbook.js` finds a song by its
position in the array, so an index here breaks the day a song is inserted.
The audio stem is the only stable identifier a song has.

### Nothing is written twice

`der Himmel` is in three of these songs. Writing it three times is how the
Russian in song three ends up disagreeing with song one — which already
happened in the source lists: `der Traum` was «сон / мечта» in one and
«мечта / сон» in another, `der Platz` was square in one and place in
another, `der Krieg` was asked for as a picture in one and a definition in
the other. All six disagreements are decided and the reasoning is in the
file header. Verified: zero rows in `words` duplicate `vocab.js` or
`dictionary.js`.

`der Traum` resolves through the dictionary and shows BOTH senses with
their definitions, which is the case no single gloss could have held.

### What it is waiting for

**79 definitions** (`gpt-prompts-songdefs.md` is the prompt) and **72
drawings**. Until a definition arrives the card shows its gloss — thinner
than intended, not wrong. Every word carries `want:'def'` or `want:'img'`,
so the file doubles as the to-do list.

Verified in all three languages: 256 of 256 references resolve, every card
has something to say beyond the German, 67 show a real drawing, and none
points at a sheet that is not on disk. A reference that resolves to nothing
prints itself on the page rather than being silently dropped.



**Songs 7 and 8 renamed.**

    7  Hafermilch-Cappuccino in unserem Café   audio/hafermilch-cappuccino-in-unserem-cafe.ogg
    8  Ich bin ein Berliner – Teil 2           audio/ich-bin-ein-berliner-part-2.ogg

Song 7's Russian and English titles are translated from the German and have
NOT been checked — marked as such in the file. Song 8 keeps the German
phrase in all three, same rule as its lyrics: Kennedy said it in German.

Songs 4-8 carry no `n` field where 1-3 do. Harmless — nothing reads it.
`songbook.js` identifies a song by its index and builds the audio path from
`song.audio`.

**`audit.sh` no longer demands .m4a.** It used to report a track with only
an .ogg as OGG ONLY on the grounds that Safari had no Vorbis decoder. It
has one — tested on the Mac and on the iPhone. `.ogg` alone counts as
playable; only a stem with neither file is reported. The site is Ogg.

**Changed this session — THE READER WAS PRINTING ITS OWN ANSWERS**

The translation sat under every German line, always, on the same screen as
the button that starts the questions. `Der kleine Vogel ist nicht mehr
allein` with `The little bird is not lonely anymore` beneath it is not a
comprehension exercise; it is a reading of the answers. Either the
translation or the questions, not both.

- `js/activities/reader.js` — the translation is behind a **Translate**
  button. First tap raises a warning naming the five days and dims the
  questions button so she can see what she is giving up; confirming shows
  the translation and calls `markAnswered(p.id)` — **the same key and the
  same five days as answering**, because it is the same fact: spent.
  Backing out writes nothing.
- Two states show the translation without asking: German (nothing to
  translate to) and a piece already resting (the questions are gone
  either way, so withholding it achieves nothing).
- A spent questions button stays on the screen, dimmed and dead, rather
  than vanishing. A control that disappears reads as a bug; one that is
  visibly spent reads as a rule.
- `state.translated` and `state.confirmTr` reset in `openPiece()`, per
  piece — translating one story must not arrive translated on the next.
- `js/nav.js` — `.rd-translate`, `.rd-warn-yes`, `.rd-warn-no` added to
  `KEEP`. The read view arms nav, so without these one tap would have
  translated the piece AND started the questions it just spent.
- `js/i18n.js` — 4 keys x 3: `rdTranslate`, `rdTrWarn`, `rdTrYes`,
  `rdTrNo`.
- `css/style.css` — `.btn.is-spent`, `.rd-warn*`, `.rd-translate`.

Driven headless through six states: arrival (hidden), warning (nothing
written yet, questions dimmed), backed out (all restored, nothing
written), confirmed (translated, spent, rest in storage), revisited
(translation free, questions still spent), German (no button, no rest).

**Changed at `?v=182` — THE END SCREEN WAS UNDERSTATING WHAT IT PAID**

`+35 EARNED` on a round that actually credited **130**. `spec.coins.total`
is only what `coins.award()` returned; achievements are paid separately by
`awards.js` line 189 (`GH.coins.earn(a.pay)`) and rendered in their own
rows BELOW the purse panel. The balance was right and the headline was
wrong, which is the worse way round — she can see 80130 and be told 35.

- `js/endscreen.js` — a `.co-total` row after the achievement rows,
  summing `spec.coins.total` plus every `award.pay` on the screen. Carries
  the store button. Hidden entirely on a round that paid nothing.
- The store button **moved out of the purse panel**. It used to sit above
  the achievement rows, i.e. above coins she had not been shown yet.
  `.co-earn-shop` CSS is now unused; left in place rather than deleted.
- `js/nav.js` — `.co-total-shop` added to `KEEP`. The end screen's primary
  action is `js-advance`, so without this, tapping the store button would
  have started another round behind it.
- `js/i18n.js` — `coTotal` x 3.
- `css/style.css` — `.co-total*`.

Verified headless against the exact round in the screenshot: 35 + 20 + 75
= 130; a round with no achievements totals 35; an achievement-only round
totals 20; a round that paid nothing shows no row.

### "Do it again" replays the IDENTICAL items

`buildRounds` rebuilds from the same `state.sentences`, and
`GH.text.blankUnits` picks its blanks by hashing the sentence, so a
sentence always blanks the same words. Only the multiple-choice
distractors are redrawn and the order reshuffles within each pass. Same
twelve items, same gaps. **Not changed — no instruction to.**

### Still open: no section indicator

The screen says `Body 1` with nothing to say which section it belongs to.
Deliberately not built: the naming convention itself is under discussion.

**Changed at `?v=181` — DIALOGUES 16-20, AND WHAT LISTENING COSTS**

**20 dialogues · 160 lines · 20 B blanks · 20 C items · 32 mc · 8 tf.**

- `data/dialogues.js` — dg-16 to dg-20 added, with `c` and `d`.
- `js/coins.js` — **`awardPart(game, n, per)`.** Listening is worth 5
  Kronen and HALF a task; two listens make one of the day's five.
  `award()` forces `units` to a minimum of 1, so a half would have paid a
  whole 10 and counted a whole task. The half is not stored as a fraction:
  `p.done` stays an integer everywhere and the leftover lives in
  `p.part`, which rolls into a whole task at `per`. No screen that reads
  `done` needed changing. **`award()`'s day roll now clears `p.part` too**
  — otherwise a half left from yesterday silently finishes today's first
  task.
- `js/activities/talkview.js` — pays on a completed playback, and starts
  a **five-day rest on that dialogue's fill-in-blank**. Paying and resting
  are the same event, which also means replaying during the rest pays
  nothing.
- `js/i18n.js` — 5 more keys x 3, plus `coPart`, which `awardPart` pushes
  into its breakdown and nothing renders yet.
- `css/style.css` — `.dg-paid`, `.dg-rest`, `.dg-card-rest`.
- `gpt-prompt-site-structure.md` — **local tool, not a repo file.** For
  GPT and Grok, on what the site should become.

### What counts as listening

Play reaching the last line. Tapping single lines does not pay and does
not rest the dialogue — otherwise hearing one line she did not catch would
cost her the exercise.

### The rest applies to B only, and C and D leak worse

Listening reveals the whole conversation, so it gives away the missing
turn in C completely and most of the D answers as well. B is what was
asked for and B is what was built. Extending it is one line —
`restingFor(d.id)` in `paintRespond` and `paintQuiz` — and it should
probably happen.

### dg-20 Q2 breaks the new hard rule

"Welche Leistung ist in der Reservierung enthalten?" answers `Frühstück`,
and line 3 is `Ist das Frühstück inklusive?`. dg-13 still has three of
four answers printed verbatim as well; that batch was kept deliberately.
Everything else in 16-20 is clean.

### One more cross-language mismatch

dg-18 Q4 was reversed between the versions: English asked "the package has
already been delivered" (False), German and Russian asked "A wartet noch
auf das Paket" (True). German and Russian taken as authoritative, English
rewritten. Same as dg-14 and dg-15 at v180.

**Changed at `?v=180` — DIALOGUE STAGES C AND D**

- `data/dialogues.js` — dialogues 11 to 15 added, with `c` and `d`.
  **15 dialogues · 120 lines · 20 B blanks · 10 C items · 20 D questions**,
  all three languages throughout.
- `js/activities/talkview.js` — `paintRespond()` (C) and `paintQuiz()` (D).
  The mode buttons are now built from the data: dg-01 to dg-10 offer
  Listen and Practise, dg-11 to dg-15 offer Listen, Reply and Questions. A
  button for a mode with no data would promise an empty exercise.
- `js/i18n.js` — 5 more keys x 3 languages: `dgRespond`, `dgQuestions`,
  `dgStepN`, `dgTrue`, `dgFalse`.
- `css/style.css` — `.dg-step`, `.dg-q`, `.dg-gap`, `.dg-talk-quiet`,
  `.dg-choices-long`, `.dg-choice.is-right`.

### The three language versions of D did not agree

For dg-14 and dg-15 the supplied English D set predates the "no questions
whose answer is simply visible" pass and asks different things from the
German and Russian. dg-14 Q4 is REVERSED between them: "cannot find the
appointment" answers False, "findet Annas Termin im System" answers True.
German and Russian were taken as authoritative and the English rewritten
here to match. **Flagged in the file header — worth reading.**

### C choices are in her language, not German

Stage C is about following the conversation. Making her read four
unfamiliar German sentences to pick one turns one exercise into two. The
chosen reply is then revealed IN GERMAN and spoken.

### D keeps the conversation on screen

These are comprehension questions, not memory questions. The revised ones
ask why, and what follows from it, and for those the text being present is
the point.

Still true of dg-13 though: three of its four `mc` answers are printed
verbatim in the German lines, so that bank is a scanning exercise. dg-14
and dg-15 are clean.

### No scoring, still

Practise, Reply and Questions all give immediate right/wrong and no
points, no round, no end screen, no tutor. Four grading models in the app
is already one too many.

**Changed at `?v=179` — THE DIALOGUES**

Stage one of a four-stage scaffold. A: listen to the whole conversation
with her language under every line. B: the same conversation truncated at
a blanked line, with the missing words as four choices. C (a whole turn
missing) and D (comprehension questions after a stop) are NOT built.

- `data/dialogues.js` — **new file.** `window.GH_DIALOGUES`. Ten
  conversations, eight lines each, four turns per speaker, all three
  languages on every line. 547 German words, 20 blanks.
- `js/activities/talkview.js` — **new file.** The screen. Registers with
  `kind:'read'`.
- `js/speech.js` — **a second voice.** `sayAs(text, who, onDone)`, where
  `who` is 0 or 1. A conversation read in one voice is not a
  conversation. Falls back to the same voice at pitch 0.82 on a device
  with only one German voice. `say()` is unchanged, so nothing else moves.
- `js/nav.js` — nine controls added to `KEEP`, including **`.dc-entry`
  and `.dc-sense-de`, which the dictionary shipped without at v178** —
  the same double-fire bug fixed for six controls two sessions ago.
- `js/i18n.js` — 14 new keys x 3 languages, `dg*`.
- `css/style.css` — `.dg-*`.

### The blank is a phrase, not an index

`stories-long.js` stores `blanks` as word positions, which breaks the
moment the story exists in another language and position four is a
different word. A dialogue blank names the words instead —
`blank:{ de:'halb vier', ru:'половину четвёртого' }` — and a missing
language key simply means no blank in that language.

### Three defects found in the source data

- `dg-08` L4 — the Russian blank was `карман куртки`; the line reads
  `карман своей куртки`. Not contiguous, so it would never have matched.
- `dg-01` L3 and `dg-07` L4 — blanks written lower-case sit at the start
  of their Russian sentence.
- `seen` had to become per language. Six German blanks have their answer
  printed elsewhere in the same eight lines; only **two** Russian ones do.
  `seen:{ de:true }` means the German answer is on screen and the Russian
  is not.

Truncating at the blanked line fixes only one of the six — the other five
repeat EARLIER. That is not a bug for stage B, where inference from the
surrounding conversation is the point. It matters for stage C, where the
whole turn is missing and a visible answer makes the choice trivial.

### What PRACTISE deliberately does not do

No points, no round, no end screen, no tutor. She picks, she is told, the
line completes. A scoring scheme was not asked for and inventing one would
put a fourth grading model in the app.

### Stage C and D, when the data exists

C needs two or three plausible wrong turns written per blanked line.
Pulling them from other dialogues does not work — a café reply inside a
train conversation is eliminated on topic alone. D should point the
Reader's six question kinds (`tap`, `mc`, `tf`, `yn`, `multi`, `order`) at
these dialogues rather than grow a second question system.

**Changed at `?v=178` — THE DICTIONARY**

A third vocabulary system beside the image bank and the contextual
material. Organised around MEANINGS, not translation strings. The bank is
not replaced and nothing already written moves.

Five headwords are in as a test: `der Traum`, `das Glück`, `der Fuß`,
`halten`, `treffen`. The first two have no bank entry, so they exercise the
dictionary-only path; the other three do, so they exercise takeover.

- `data/dictionary.js` — **new file.** `window.GH_DICT`. A headword has
  `senses[]`; a sense carries `sid`, its own `de`, `en`, `ru`, a `def` in
  all three languages, and its own `img`. `primary:true` marks the sense
  the existing `GH_VOCAB` entry was describing — it inherits that entry's
  `n`, `cats`, `pack` and both example sentences.
- `js/packs.js` — **`vocab()` expands senses.** This is the whole trick.
  `vocab()` is the only door the games come through, so a multi-sense
  headword becomes one ordinary-looking item per sense there, and
  `vocabgame` and `listen-pick` never receive a headword at all. New:
  `keyOf()`, `same()`, `dictEntry()`, `expand()`.
- `js/activities/vocabgame.js` — off `picked.n === q.word.n` and
  `'word:' + q.word.n`, onto `GH.packs.same()` and `GH.packs.keyOf()`.
  Eight call sites. No logic change.
- `js/activities/listen-pick.js` — same, four call sites.
- `js/wordlook.js` — `explain()` returns **every** sense, ordered by `ord`,
  with the headline taken from the first. A sense is filed under its
  headword as well as its own German.
- `js/activities/fill-blank.js` — shows all senses after she answers,
  as `.fb-senses`.
- `js/activities/dictview.js` — **new file.** The dictionary page:
  headword list, then one headword with its senses opened out. Registers
  with `kind:'ref'`.
- `js/app.js` — a `kind:'ref'` block in the reference row, and `games` is
  now `kind !== 'read' && kind !== 'ref'`.
- `js/i18n.js` — 5 new keys x 3 languages: `dcTitle`, `dcSub`, `dcEmpty`,
  `dcSenseCount`, `dcSenseN`.
- `css/style.css` — `.dc-*` and `.fb-senses`. No px font sizes; all four
  `data-type` variants keep working.
- `data/songs.js` — songs 7 and 8 (Unser Café, Ich bin ein Berliner 2).
  **Was never copied across at v177 — the served copy still had six.**

### Three bugs caught by the harness, not by reading

**`der Fuß` was silently stripped.** It lives in pack `verbs`, off by
default. The pack test ran before the headword was claimed, so the
fallback loop re-added it with no image, no sentences, no category and no
pack — and an unranged word is always live, so it appeared in every game
without its drawing. `taken[]` is now marked before the pack test.

**`treffen` headlined the wrong meaning.** Sense two is the one whose own
German is exactly `treffen`, so it reached the index first and a lookup
answered попадать / попасть. Senses now carry `ord` and sort by it.

**The dictionary tile would have appeared twice.** `games` was
`kind !== 'read'`, a default-yes list, so any third kind landed in Games as
well as its own section.

### What has NOT been done

- The other 134 words in `MULTISENSE-FIRST-PASS.md`. Convert a few at a
  time; the harness at `/home/claude/an/` is the regression test.
- Sentences still belong to the headword, not to a sense. Only the
  `primary` sense gets them, which is why non-primary senses never reach
  `vocabgame` or `listen-pick`. That is deliberate for now.
- `gender.js`, `mehrzahl.js`, `catch-word.js`, `scramble.js`,
  `conveyor.js` were not audited for the `n`-as-identity assumption. They
  do go through `packs.vocab()`, so they receive senses, but their own
  comparisons were not checked.
- The song vocabulary pages. Separate job, not started.

**Changed in the previous session (`?v=177`):**

- `css/style.css` — **contextual ink and a type table.** See the two
  sections below. 343 colour declarations converted; `.card` declared as
  a dark surface, which was the bug behind the invisible hub hero and the
  invisible comic-reader panel. New: eight type roles, four type variants
  on `data-type`, `.typeswitch` styling. Parses with zero errors.
- `js/theme.js` — **`GH.type`**, a second axis alongside `GH.theme`. Four
  variants, remembered under `gh-type`, applied before first paint, and
  the picker builds itself into `.topbar-controls` so `index.html` needed
  no markup change.
- `js/activities/comic.js` — **Play and Auto, two controls.** Play speaks
  the line once. Auto decides whether the next line speaks by itself, is
  remembered under `gh-comic-auto`, and is **off by default**. See below.
- `js/i18n.js` — 2 new keys x 3 languages: `cmPlay`, `cmAuto`.
- `js/activities/reader.js` — **new file. The Reader is built.** Short
  stories, medium stories and poems in one tile, six question kinds, the
  two-of-five draw, both shuffles, the five-day rest, 15/20 scoring. LIVE.
- `data/stories-short.js` — 25 five-sentence stories. **Now LIVE**, and
  every question carries `kind:'tap'` explicitly (see the bug below).
- `data/poems.js` — **new file.** Three poems, 18 questions, five of the
  six kinds. LIVE.
- `css/style.css` — the Reader's classes, built on the type roles and
  contextual ink, so nothing there names a font or a colour.
- `data/songs.js` — **songs 4, 5 and 6.** Der kleine Ninja (42 ids),
  Das Lied zweier Herzen (63 ids, 2 parallel sections), Für Tanusha
  (26 ids). See the two rules below.
- `js/activities/songbook.js` — **parallel mode**, plus a crash fix.
- `js/i18n.js` — `sgParNote` and `langName_ru`, x 3 languages.
- `js/activities/store.js` — **the pet lightbox was opening a 404.** Fixed.
- `js/endscreen.js` — **tap to rotate which pet speaks**, active pet full
  size and the others shrunk.
- `js/i18n.js` — `ptSwitchTo`, x 3 languages.
- `js/wordlook.js` — **new file.** Names the word she just filled in.
- `js/activities/fill-blank.js` — shows it, after she answers.

## The exercise never named the word it was testing

She reads `Das ___ ist sehr billig` with `That is very cheap` underneath,
types `Hemd`, is told she is right — **and is never shown that Hemd is the
shirt.** The exercise tested recall of a word it did not name. Every
fill-in-the-blank round in the app, which is the bulk of it.

`js/wordlook.js` takes the German she filled in and hands back the
vocabulary entry behind it, so the card can print `das Hemd · shirt`.
Shown **only after she answers** — before, `das Hemd · shirt` above a
blank whose answer is Hemd is not a hint, it is the solution.

### A lookup, not an alignment

The richer version highlights the matching word *inside* the translation,
so `billig` lights up the `cheap` in `That is very cheap`. That needs to
know which word corresponds and nothing in the data says. String-matching
the gloss works often and fails quietly: `die Zähne putzen` glosses as
`brush teeth`, which is not a contiguous run in every translation, and
Russian word order does not follow German at all.

**A lookup is exact or absent. An alignment is right most of the time and
silently teaching a wrong mapping the rest** — worse in something meant to
be trusted. So this returns the word or nothing, never a guess. Steven
picked this one knowing the trade.

### How it reaches past base forms

Four passes, each only filling gaps the earlier ones left, so a real entry
always beats a derived one:

1. the German as the entry writes it — `der Apfel`
2. the same without its article — `Apfel`
3. every conjugated form of anything `conjugate.js` calls a verb, so
   `geht`, `gehe` and `gingen` all reach `gehen`
4. plurals from `plurals.js`, so `Äpfel` and `die Äpfel` both reach
   `der Apfel`

`isVerb()` matters in pass 3: the vocabulary is full of words that merely
end in -en — `sieben`, `trocken`, `zufrieden` — and without it the
generator produces `immere, immerst, immert` and the index claims they
mean something.

1,658 forms over 752 entries. Built once and held, and **rebuilt when the
pack selection changes**, because a word in a switched-off pack should not
be explained.

### What it covers, honestly

Measured against all 1,236 blanks the app generates from Section 1:

| | |
|---|--:|
| core pack only | 40% |
| every pack on | 49% |

That is not the right way to read it, though. Of the 629 unexplained,
**half are thirty words and almost none of them has a gloss to give** —
`ist`, `sind`, `bin`, `Die`, `Das`, `Der`, `einen`, `eine`, `Wo`,
`Wohin`, `Woher`, `Wen`, `Wer`, `mit`, `ich` — plus **Tanya and Nazar, 82
blanks between them.** A determiner has no meaning; it has a grammatical
job. Showing nothing there is correct, not a gap.

The genuine misses are conjugated forms of verbs that are not in the
vocabulary as infinitives — `habe`, `brauche`, `möchte`, `liegt`,
`frisst`, `mag`, `tut` — and three very common adjectives that are simply
not entries: `sehr`, `gut`, `schön`. Adding those as vocabulary would fix
them for free, since the index is built from the vocabulary.

So the honest description: **every content word in the vocabulary
resolves; function words do not, because there is nothing to say.**

Nothing is shown when she is reading in German either — repeating a word
of a German sentence with no translation beside it explains nothing.
- `js/nav.js` — **KEEP extended.** Twenty controls were double-firing.
- `js/activities/comic.js` — wired into the shared navigation at last.
- `data/songs.js` — **audio filenames corrected.** Four were wrong.
- `audit.sh` — an **AUDIO** block, so a missing track is reported.
- `js/app.js` — **the language switch threw her out of every screen.**
- `js/activities/songbook.js`, `js/activities/store.js` — redraw in place.

## Changing the language threw her back to the hub

Reported from inside a song: tap ENG → РУС and land at the top of the main
page. It is not a song problem. **It was every screen but three.**

`hub()` sets `GH.app.redraw = hub`. The language switch calls
`GH.app.redraw()`. An activity that does not overwrite it therefore calls
the hub — and only `comic.js`, `fill-blank.js` and `settings.js`
overwrote it. Eighteen screens sent her home mid-song, mid-round,
mid-story, and the one thing she was trying to do was read the same line
in the other language.

### Fixed at the hand-off, not in eighteen files

`app.js` now wraps every activity hand-off in `launch()`:

    function launch(fn){
      GH.app.redraw = function(){ view.textContent = ''; fn(); };
      view.textContent = '';
      fn();
    }

Ten call sites routed through it. The default is to reopen the same
activity, which costs the internal position — back at the song list rather
than in the song — but never leaves the screen she chose.

**Crucially it is set BEFORE `open()` runs**, so an activity that can do
better still wins. Nothing that already sets its own `redraw` is
overridden, and nothing added later can forget to.

### Two that can do better, and now do

- **songbook.js** — repaints the song, not the list. Changing language
  mid-song is *how she reads the other translation of the line in front of
  her*; dropping her at the list defeats the gesture.
- **store.js** — repaints the shelf. Every pet's German word and every
  tier name changes, which is most of the reason to switch language there.

Verified: from inside Das Bett sieht so schön aus in English, tapping РУС
keeps the title, keeps the song, and flips the line from *It is morning,
late morning, I overslept* to «Утро, уже позднее утро, я проспала». Hub
never reached. And the generic fallback proven not to reach the hub over
repeated switches.

## The audio filenames were wrong for four songs

Files live in `audio/` off the project root. The names are Steven's:

    audio/unterwegs-bei-sonne-unterwegs-bei-regen
    audio/das-bett-sieht-so-schoen-aus
    audio/dein-koerper-braucht-liebe
    audio/der-kleine-ninja
    audio/das-lied-zweier-herzen
    audio/fuer-tanusha

`songs.js` had been asking for `unterwegs`, `das-bett` and `dein-koerper`
— abbreviations that predate this session — and `lied-zweier-herzen`,
which I invented for song 5 rather than asking. Four of six would have
404'd. Corrected in the data; nothing was renamed on disk.

**Safari plays no Ogg Vorbis.** `songbook.js` lists an `.m4a` beside each
`.ogg` as a second source, so the iPad needs the m4a. If only one format
is made, make it m4a — it plays everywhere and the ogg source fails over
silently.

### Why this needed an audit check

`songbook.js` hides the player when the file 404s. That is right in the
app — a broken control is worse than no control — and useless when
checking the build, because a song with no audio looks finished and is
merely silent. Nothing on screen says which of the two it is.

So `audit.sh` grew an **AUDIO** block. It reads the stems out of
`data/songs.js` rather than holding its own list, so a rename on either
side shows up as a miss instead of as a quiet nothing. Three states:

- **playable everywhere** — an `.m4a` exists
- **OGG ONLY** — Safari will not play it; the iPad is the target device
- **MISSING** — no file at all

Plus **ORPHAN**, for a track on disk no song asks for — a rename that only
went one way.

Rehearsed against a fake tree before shipping: 4 missing, 1 ogg-only, 1
playable, 1 orphan, all reported correctly.

### And it printed junk on the first run

`base=unterwegs-bei-sonne-unterwegs-bei-regen` and
`f=audio/unterwegs-....ogg` appeared in the middle of the report, between
DUPLICATE FILENAMES and LOCAL TOOLS.

**zsh echoes the assignment when a name is declared `local` twice in the
same scope.** The orphan loop used `f` and `base`, and both are declared
again further down in the duplicate-filename and local-tools blocks. Same
for `have`, which `check()` declares as a local string at line 101 and the
audio block redeclared as an `integer`.

Renamed to `af`, `astem`, `playable` and `nofile`. Then checked the whole
script for the same trap:

    grep -oE "^\s*(local|integer) [a-z ]+" audit.sh \
      | sed -E 's/^ *(local|integer) //' | tr ' ' '\n' | sort | uniq -d

Empty now. Worth re-running that after any future edit to the script —
the symptom is stray `name=value` lines and it looks like corrupt output
rather than a scoping mistake.

The check itself was right on the first run: it found all six songs and
correctly reported every one as ogg-only.

## The comic had no navigation, and three screens double-fired

`nav.js` leaves a screen by clicking `.backlink` and advances by clicking
`.js-advance`. It goes through the buttons deliberately, so each
activity's own cleanup runs.

**The comic reader used `btn cm-back` and `btn cm-next` and never called
`GH.nav.ready()`.** So in the comic and nowhere else: Escape, swipe-left,
swipe-right, space, Enter and tap-anywhere all did nothing. In the one
activity where she presses Next forty times for a six-panel strip. Both
buttons are `.backlink` now, Next carries `js-advance`, and `armNav()`
runs after each paint — after the box is in the document, not while it is
being built, because nav.js looks the button up in the page.

**And that exposed the other half.** `KEEP` is nav.js's list of controls
that own their own taps. It named `.btn` and `.speak` and `.lp-play` but
nothing newer, so on any screen that also has an advance button, one tap
did two things:

| control | what one tap did |
|---|---|
| `.rd-line` | heard a story line **and started the questions** |
| `.rd-choice` | chose an answer **and submitted it** |
| `.pt-lens` | enlarged a pet **and started another round** |
| `.cm-btn` | Play or Auto **and advanced the comic** |
| `.cm-de` | repeated the German **and advanced** |
| `.sg-line` | heard a lyric **and advanced** |

The first three were live in what shipped an hour ago. Two of them failed
only *intermittently*, which is worse — `ready()` resets the 450ms bubble
guard on every repaint, and that sometimes swallowed the second action. A
control that works when the screen happens to have just repainted is not
working.

Twenty controls audited and added. Verified none of them can reach
`advance()` now.

## Safe-area inset — added, and it does nothing yet

Worth being straight about. `env(safe-area-inset-bottom)` is in `main`'s
padding now, and it **resolves to 0 unless the viewport meta carries
`viewport-fit=cover`**, which yours does not. So it is correct and
future-proof and fixes nothing today.

Adding `viewport-fit=cover` is not a bug fix — it pushes the page under
the notch and the home bar globally, so the topbar and every fixed
element would need insets too. That is a layout change across every
screen and it should be a decision, not something slipped in.

What did get fixed is real but smaller: **`.cm-card-scene` is clamped to
two lines.** A grid row is as tall as its tallest card, so one comic with
a long scene description made every card beside it grow to match and left
the rest half empty. There is still no `line-clamp` anywhere else in the
stylesheet — worth a pass eventually.

## The pet lightbox was showing a blank

Tap-to-enlarge on the shelf has been broken for **all sixteen pets** since
it was written, and it fails in the way that is hardest to notice: the
overlay opens, the caption renders correctly — name, German word, tier —
and the picture area is simply empty. Nothing throws. It looks like a
styling problem.

`store.js` asked for `GH.petArt.pathFor(p, form(p.id), 'shop')`, which
returns the suffixed filename: `alisa-the-fox-1-shop.webp`. Every pet in
`pets.js` declares `art:[]`, meaning the drawings on disk are still the
plain one-file-per-pet names from the first batch — `alisa-the-fox.webp`.

The thumbnail beside it was always right, because `petArt.tile()` goes
through `chain()`, and `chain()` opens with:

    if (!p.art || !p.art.length) return [plain(p)];

`pathFor()` has no such check. So the two functions disagreed about which
file exists, and the one the lightbox used was wrong.

Fixed with a `lensUrl()` helper that returns `chain(...)[0]` — the same
file the `<img>` chose. Which is the point: the lightbox should show what
she just tapped. When a `-2-cheer` is drawn and listed in that pet's `art`
field, `chain()` picks it up and the lightbox follows with no further
edit.

## Cheering pets are tappable

The end screen is where she sees the pets most — every round, several times
a day — and it was the one place the drawing could not be looked at. A
thumbnail an inch wide is not the picture, it is a reminder one exists.

`cheerers()` now carries `url` and `caption` alongside `pic`, because it is
the thing that knows which form and which mood it handed over. Rebuilding
the path in `endscreen.js` would have enlarged the shop pose while the
screen showed the cheering one.

A button rather than a click handler on the image, so it is
keyboard-reachable and announces itself — and only when there is a picture:
a pet not yet drawn falls back to a glyph, and a glyph that opens a
lightbox onto a 404 is worse than a glyph that does nothing.

Two CSS collisions came with turning that span into a button. `.pt-lens`
sets `display:block`, which would have flattened the name and word out of
their column, and `.pt-lens .pet-img` sets 140px, which would have blown
the thumbnails up from the 104px the three-pet layout wants. Both scoped
with `.pt-cheer-one.pt-lens` — two classes beat one, so they win whatever
the source order.

Driven in a harness with three pets owned and all three slots: 3 tappable,
correct element, correct aria-label, tap opens the right file with the
right caption, and the `kind` mood resolves separately from `cheer`.

## Tap to rotate which pet speaks

Steven's rule, and it is a good one: **if the pet is not active, make it
active and show its line. If it is active, open the lightbox.** So the tap
always means "look at this one", and what that means depends on whether
she is already looking at it.

Still exactly one speaker. Three at once would be noise and the lines were
written as a single voice reacting to the round — Noir's menace does not
survive being one of a chorus. She just chooses which voice.

**The active pet is full size and the others are shrunk to 62px**, dimmed
to .62 and lifting to full opacity on hover so they read as something to
press rather than something disabled. Nothing else on the screen says who
is speaking, so the size has to. A single pet is unchanged at 140px — it
looks exactly as it did.

### The line is cached, not re-rolled

`lineFor()` picks at random from that pet's band. Rotating away and back
would hand her a different Noir line every time and the row would behave
like a slot machine. Each pet's line is drawn on first sight and kept, so
rotating is rotating.

### When it speaks

First paint speaks — the round has just ended and she is looking at the
screen anyway. A rotate speaks, because she asked for that pet. Tapping
the active pet does not speak, it zooms.

Verified: three pets, states `ON off off`, Flippy speaking. Tap pet two →
`off ON off`, Cooper speaking, **lightbox not opened**. Tap pet two again
→ lightbox opens on Cooper. Rotate to pet three and back → the same Cooper
line, not a new one. And with one pet owned: still active, still speaks,
one tap zooms with no rotation in the way.

## Songs: an id is a position, not a string

Song 4 forced a rule that was implicit and wrong.

`songs.js` dedupes identical lines — song 3's cumulative verses reuse
`s3l05` eleven times, which is the whole reason the Zeilen view reports 37
lines instead of 76. That works only while all three languages repeat
together.

Verse 2 of Der kleine Ninja ends with `Nicht dieser kleine Junge` twice.
The Russian does not repeat: «Но не этот маленький мальчик» then «Не этот
маленький мальчик». **Deduplicating on the German would have collapsed
those into one id and silently dropped a word from her own language.**
Nothing would have thrown and nothing would have looked wrong.

So: **two lines share an id only when all THREE languages are identical.**
The chorus still gets 6 ids for 7 lines, because its repeated hook is
identical in German, Russian and English. Verse 2 gets 9 for 9.

Stated once, for the data: preserve every lyric line in its exact position
and translate that line. Never rewrite, combine, deduplicate or
substitute. Written into the file header.

## Songs: the languages do not always break together

Song 5 broke the other assumption, and it is the deeper one. **A
translated song is not a song with subtitles.**

`Das Lied zweier Herzen` has a chorus that is **five lines in German and
four in Russian and English**. The German splits one thought across two
lines for the melody:

    Nicht mit Worten, sondern mit der Seele
    Sprechen wir durch unsere Augen

against one Russian line and one English line. The outro's last stanza
does the same, 2 against 1.

I proposed joining the German pair, on the grounds that it is one sentence
broken for the tune. **That was wrong and it is worth writing down why:**
the break IS the poem. Editing where a line ends so a table lines up is
editing the song, and the same argument would let you shorten a soliloquy
to its plot. Everything matches exactly as written; each language breaks
the way it breaks.

That is not a defect to reconcile. It is the tragedy of translating verse
— keep the sense and lose the shape, or keep the shape and bend the sense
— and the data now says where it happens instead of hiding it.

### How it is stored

A section carries `par: true` and **one list per language** instead of one
shared list:

    { id:'chorus', label:'Chorus', par:true,
      de:[…5 ids…], ru:[…4 ids…], en:[…4 ids…] }

Those lines live in `lines` like any other, but each holds one language
and is marked `only:'de'` / `'ru'` / `'en'`. Everything else in song 5 is
8/8/8 and aligns normally. **The granularity is the section, not the
song.**

### How it renders

`songbook.js` grew `parallelBlock()`, wired into all three views:

- **Two columns**, German left, her language right, each keeping its own
  count. Deliberately not a table — nothing implies the third line of one
  column is the third of the other.
- **Only the German column speaks.** A de-DE voice reading Russian is
  noise, so the right column is disabled.
- **In German there is no second column**, because the left one is already
  the German. A mismatched section then looks like any other, which is
  correct: read in German there is nothing mismatched to see.
- **The Zeilen view** shows a single-language line in its own language
  with the language named, rather than as an empty German row.

Driven in all three languages: 2 parallel blocks, headers немецкий |
русский and German | English, 12 lines rendered, 7 of 12 speakable, 0
blank German rows in Zeilen, and song 6 correctly showing no parallel
blocks at all.

### The crash it uncovered

The song list counts sung lines with `s.lines.length`. A `par` section has
no `.lines`, so **song 5 threw and took the entire song list down with
it** — not its own tile, the whole screen. In code I had not touched.
Counted in the German now, which is the song being learned.

## Song 8 — Ich bin ein Berliner 2

`audio/ich-bin-ein-berliner-2`. 62 ids, 62 lines, and **aligns
throughout** — 8 / 4 / 8 / 8 / 2 / 8 / 10 / 14 in all three languages. No
parallel sections. First song with an `intro` section and a `transition`.

The German title phrase is left in German inside the Russian and English
lines. Kennedy said it in German to a German crowd and it is the hook;
translating it would remove the point of the song.

Eight songs now, 361 distinct lines.

## Song 7 — Unser Café

`audio/unser-cafe`. **Working title**, and Steven may rename it — the
audio stem will need to follow if he does.

56 ids from 57 lyric lines, and **aligns throughout**: verse 1 is 7 lines
in all three languages, chorus 8, verse 2 11, verse 3 8, bridge 12, outro
11. No parallel sections.

The one reused id is the legitimate case: the outro says `Viel zu wenig`
twice and it is identical in German, Russian and English, so it is one id
used twice. Contrast song 4's verse 2, where the German repeated and the
Russian did not, and the same shortcut would have dropped a word.

The 😭 on the Russian outro's last line and the 🥷 in the Ninja outro were
both left out — Steven asked, and an emoji in one language and not the
others is a line that differs for no reason anyone would want.

## Songs 5 and 6

**Das Lied zweier Herzen** — `audio/lied-zweier-herzen`. 63 ids, 8
sections, 2 parallel. Running order puts verse 1 first: the song opens on
the verse, not the chorus. The Berlin outro is its own section after the
main outro.

**Für Tanusha** — `audio/fuer-tanusha`. 26 ids, 6 sections, **aligns
throughout** — every section the same count in all three languages, so no
parallel mode anywhere in it.

It introduced one new thing: **instrumental blocks are structural.** The
break between chorus and verse 2 is part of the song, so it is a section
with a single stage-direction line rather than a gap in the running order.
The direction is stored per language and all three now name cello, oboe
and Waldhorn — the earlier English version was missing the horn, which
the title change fixed.

Worth knowing: the first Russian pass was a translation of an altered
English reading of the German, so the lines did not correspond. Caught
before it was written in. The English and Russian now shipped are both
line-for-line against the German.
- `index.html` — cache bumped 165 → 166.

**`audit.sh` is updated and shipped with this handover** — no manual edit
needed. For reference:
- `CACHE_VERSION=177`
- LIVE:
  `8c1f4341 158898 css/style.css`
  `ddfb41ed 4177   index.html`
  `c4e31f24 148932 js/i18n.js`
  `46c5bbca 6024   js/theme.js`
  `ae0c4808 15978  js/activities/comic.js`
  `4469cbbb 6920   js/nav.js`
  `45fd2f83 13435  js/endscreen.js`
  `771afc36 18990  js/activities/store.js`
  `4c67c595 13202  js/activities/songbook.js`
  `9cc9b504 77125  data/songs.js`
  `5ef58ae3 21527  js/activities/reader.js`
  `2319a5fd 18510  data/poems.js`
  `00a18563 60804  data/stories-short.js`
- PENDING: unchanged — `pairs.js` only. `stories-short.js` graduated to
  LIVE.

## Text was invisible, and why

Two screens shipped with unreadable text: the hub hero card showed
"Alina and Stella" as dark plum on plum, and the practice subtitle showed
cream on beige. Opposite failures, one cause.

**The surface table was right and 156 declarations went around it.**
`style.css` already documented four surfaces — `.surf-paper`,
`.surf-wash`, `.surf-deep`, `.surf-accent` — with every ink measured
against every theme and an explicit instruction not to invent a fifth
inline. It was used in **19 rules**. Everywhere else a component named
`--ink`, `--on-dark`, `--ink-soft` or `--sand` at the point of use, and a
token chosen for a light card is wrong on a dark one.

**`.card` was the specific bug.** A dark gradient panel that never
declared a `color`, so everything inside it inherited the page's dark
ink. It worked only where a descendant rule happened to set `--on-dark`
explicitly. Three more had the same hole: `.pg-recent`, `.lp-clock-bar`,
`button.ref-group.open`.

**The fix is contextual ink.** Every surface now sets `--fg`, `--fg-soft`
and `--fg-accent` for what is inside it. A component writes
`color:var(--fg)` and is correct on any surface, in any theme, without
knowing which it is on. **343 declarations converted.** The 122 rules
that paint their own opaque fill were left alone — their ink is
deliberately paired to that fill, and a chip on `--flame` is not on the
page.

The old `--ink-on-light` family still resolves and nothing breaks, but it
is no longer the thing to reach for.

**Rule from here: no component may name a colour. It names a role and a
surface.**

## A type table, and four type variants

The second half of the same complaint: "Section 1 · Sentences" was serif
and "Unit 1 · 10 comics" was sans — identical role, two answers, decided
in different sessions. **There was no type table.** Themes define colour
and nothing else, so every screen's fonts were an independent judgement
call. 221 `font:` shorthands and 97 `font-family:` declarations.

**Eight roles now exist** in `:root`: `--t-title`, `--t-section`,
`--t-card`, `--t-sub`, `--t-eyebrow`, `--t-body`, `--t-de`, `--t-btn`,
each with a matching `-ls` for tracking, and a `.t-*` class apiece.
`--t-de` is its own role deliberately — the German being taught should be
the most legible thing on the screen and should never shrink to fit a
layout.

**Four variants on `data-type`:** `editorial` (default, current look),
`plain` (no serif except the German), `large` (editorial at 110%), `loud`
(plain at 112% with `--fg-soft` lifted to full ink).

**The variants act on `--ff-display`, `--ff-ui` and the root font size**,
not on the role tokens — which means all 318 existing type declarations
already read them. A variant changes every screen with no per-component
edit and **no size moves relative to any other**. Four variants against
twelve palettes is forty-eight combinations and none can produce a
contrast failure, because the ink is contextual and the variant only
moves family and scale.

**What was deliberately NOT done: the mass font conversion.** Measured
first — 132 distinct shorthands across 221 rules, 62 distinct family+size
pairs across 97 more, sizes running 0.85, 0.86, 0.87, 0.88, 0.9, 0.92,
0.94 … 1rem. That is not a system with drift, it is 318 individual
guesses. Mapping them onto eight roles would move sizes on every screen
at once and the only way to find what broke would be to look. Convert a
screen at a time.

One drift fix went in: `.cm-unit-h` now uses `--t-section`, matching
`.ref-group-name`.

## The comic reader: Play and Auto

`readerBox()` ended with `if (de) say(de)` — every line spoke the moment
it appeared. Now `if (de && autoRead())`, and autoRead is **off by
default**.

**Two controls, because they are two different things.** Play is an
action: it speaks this line, once, now. Auto is a switch: it decides
whether the *next* line speaks by itself, and it persists across comics.

The old single button was labelled `cmHear` — *Again* / *Nochmal* /
*Ещё раз* — which was correct when every line spoke on arrival, because
pressing it really was a repeat. With auto off nothing has been said yet
and *Again* is simply wrong. `cmHear` still exists in i18n and is
unused by the reader; `cmPlay` and `cmAuto` are new.

Turning Auto **on** speaks the current line immediately rather than
waiting for the next one — she pressed a sound button, and silence would
read as broken.

`aria-pressed` plus a filled `.cm-btn[aria-pressed="true"]` style carry
the state. Outline-only would have made the switch indistinguishable from
the action button beside it.

Persistence follows the pink math music-bar pattern: one key, read
through a try/catch so private browsing on iOS falls back to off rather
than throwing. Simulated: fresh install off, survives a comic change,
survives localStorage throwing.

### The label audit page

`sheets-labels.html` — every drawn cell against the word the app thinks it
is. **English is the label**: 1.18rem, weight 800, white, centred. German
0.82rem muted, Russian 0.78rem dimmer. Nothing competes with the English,
because the English is the thing being checked.

648 cells across 72 sheets, 641 labelled, 7 with no word, 29 spares, and
every labelled cell has English. Red border is an unassigned cell, dashed
is a spare, and **gaps only** hides everything else and collapses the
empty sheets.

Named to match the `sheets-*` glob so `audit.sh` already skips it in the
duplicate check and lists it under local tools — no `audit.sh` edit.

**Consequence worth knowing:** the Meaning button is gated on
`state.heard` — she cannot see the translation until the line has been
spoken. With auto-read off that gate now requires a tap on Hear for every
line. That is the existing hear-before-read design working as intended,
but it went from invisible to a required tap. Ungate it if that grates.

## The Reader — designed, not built

One tile holding short stories, medium stories and poems. Comics stay
separate.

**No `app.js` edit is needed.** The read-and-listen section already
filters `extras` on `kind === 'read'`, and the comment there says a new
one should not need `app.js` touched. The Reader is one file,
`js/activities/reader.js`, registering with `kind:'read'`.

**`GH_LONG` stays out, and this is now settled from the code rather than
guessed.** `openLongStory()` maps every sentence into
`GH.fillBlank.mount()` with `blanks` and `ordered:true` — the same call
as `openStory()` and `openSentences()`. It is fill-in-the-blank, not
reading.

### Question kinds

Six, all auto-gradeable: `tap` (tap the story sentence that answers it),
`mc`, `tf`, `yn`, `multi`, `order`. Short answer and open-ended "Harder"
questions are the only two that do not fit, and they are what GPT is
converting.

**Short stories use `tap`** — nearly every question maps to exactly one
of five sentences, so it needs no distractors and cannot introduce gated
vocabulary. **Medium stories cannot** — twenty tappable lines is not a
phone screen — so they use the multiple-choice family. The two tiers
having different formats is correct, not an oversight.

### Rules

- Five questions per bank, **two drawn per read**. Ten pairs per story.
- Shuffle the questions, and shuffle the five sentences shown as answer
  choices, so position never gives the answer away.
- **Five-day lock on the questions after she answers them. The story
  itself never locks** — re-reading is always allowed; only the questions
  rest. One timestamp per story in her progress record.
- Scoring: 15 for a short story, 20 for a medium one.

### `data/stories-short.js` — built

25 stories, `ss-16` to `ss-40`, 125 questions, `window.GH_SHORT`.
Validated: every bank has five questions mapping to five **distinct**
sentences, no empty strings, no duplicate ids.

**Seven questions were rewritten**, each commented in place. Five that
Steven flagged plus two more found while indexing:
- 18 Q5, 19 Q4, 28 Q2 — duplicate answers, redirected to sentence 0,
  which nothing else in those banks reached
- 26 Q3 — asked why Peter writes the list; the story never says
- 37 Q1 — too vague to have one right line
- 38 Q2 — same sentence as Q1
- 35 Q3 — the German had lost the "remembers" framing the English and
  Russian both carried

**No `img`, no `blanks`.** Image numbers are the sheet mapping and are
not mine to invent; a wrong number shows the wrong drawing silently.
`blanks` can be computed by `text.js` if the reader wants them.

### Built and tested

`js/activities/reader.js`, and it is driven end to end in a harness with
every real dependency loaded — i18n, tutor, progress, coins, awards, run,
endscreen. **Two sections, 28 tiles, two questions served, feedback on
both, end screen renders, rest recorded per player, the tile flips to
"вопросы вернутся через 5 дн." and dims, and a poem opens in verse layout
with all 20 lines.**

The draw was stress-tested at 4,000 rounds across the 25 short stories:
**zero malformed draws, all ten pairs reachable for every story, and the
correct answer lands in position 1 exactly 19.5% of the time** against
the 20% a real shuffle predicts. That last number is the one that
mattered — the source questions run in story order, so an unshuffled
`tap` list would have answered question one with line one every time.

**28 i18n keys x 3 languages** added: `rdTitle`, `rdSub`, the three
section names, the six `rdKind_*` prompts, `rdYes`/`rdNo`/`rdTrue`/
`rdFalse`, and the resting and scoring lines. All balanced.

### The bug the harness caught

**All 125 short-story questions had no `kind` field.** `stories-short.js`
was written before the six-kind schema existed. The Reader filters on
`q.kind`, so every one of the 25 short stories would have shown "no
questions yet" — and nothing would have thrown, nothing would have
logged, and the section would simply have looked unfinished.

Fixed in the data rather than by having the Reader infer `tap` from the
shape of `a`. A reader that guesses at a missing field is a reader that
silently mis-grades the first time a second kind arrives.

Worth noting how nearly it went wrong twice: the first pass at adding the
field used a regex loose enough to hit the sentences as well as the
questions, giving all 125 lines a `kind` too. Caught by asserting on
`Object.keys(sentence)`, not by reading the diff.

### Still to come

- `data/stories-medium.js` — 5 stories of 20 sentences. Four of the five
  banks are shorthand notes, not data. Blocked on GPT. The Reader already
  reads `GH_MEDIUM` and shows the section the moment the file exists.
- Stories 41–50 — written, six questions each, but two kinds per story
  need converting to `tap`. Blocked on GPT.
- `order` is implemented and only one question in the app uses it (The
  Lost Ticket). Worth more once the medium stories land.

### The three poem questions, settled

1. **The Lost Ticket keeps its female narrator.** I had this wrong and
   was corrected: a first-person narrator has a gender the way any
   character does, and reading it does not mean claiming it. The Russian
   stays `Я покупала воду`. That is the opposite of the pet lines, where
   the app addresses the reader directly and `вернулась` to a man is the
   app getting a fact wrong — I collapsed the two cases and should not
   have.
2. **Line, not sentence.** `verse:true` sets the lines tight and they are
   spoken as lines. The Lost Ticket enjambs twice and both halves stay
   separate lines: the break is the poem, and joining them for audio
   would make the sound and the page disagree about what a line is.
   `tap` answers point at the line that carries the answer.
3. **15 points**, same as a short story. Six objective questions is the
   same work, and paying more for the form would make the tier a target
   rather than a choice.

## Prompts sent to GPT

`gpt-prompts-storyquestions.md` — two prompts, both demanding strict JSON
in the schema above so nothing is retyped.

Prompt 1 finishes medium stories 2–5 and converts short-answer and
"Harder" to multiple choice. Prompt 2 converts the same two kinds in
41–50 to `tap`.

**Rule 8 was wrong on the first draft** and Steven caught it: "no two
questions may have the same answer" is unsatisfiable when `tf` and `yn`
have only two possible values across eight questions. It now constrains
the **facts** — repeated answer values are fine when the questions test
different things — and Prompt 2 gained a rule 9 for cross-kind fact
duplication.

Worth sending to Grok as well. Where the two disagree on which sentence
answers a `tap` question is exactly where the question is ambiguous.

## The pet brief

`pet-companion-brief.md`, written before any more pet work. What the pet
optimizes, what it may interrupt, and what happens on a day she does
nothing.

- Four jobs: trophy, greeter, cheerleader, **tutor**. The tutor is the new
  one and needs her whole history, not the last round.
- **Optimizes return rate, not session length.** Anything that lengthens
  a session at the cost of tomorrow is a bug.
- **Interrupts nothing.** Speaks at exactly three moments: entering the
  hub, the end of a round, and when asked.
- **One utterance per screen entry.** The greeting always fires. The
  tutor's suggestion is **opt-in — a button, not a second bubble** — which
  is what stops it becoming a talking billboard and means the tutoring can
  never read as nagging.
- **A suggestion must be earned.** Weak scores, a spaced-repetition due
  date, an abandoned section. **Recency is not weakness**; if there is
  nothing real to say, the button does not appear.
- **Gap threshold: 2+ days.** One clear day skipped fires the away set.
- **No pet may make coming back feel worse than staying away.** A rule
  about outcome, not tone. Noir threatening her clears it easily — that is
  a joke she is in on, and it is attention. A disappointed sigh does not.

### The away band — written, not merged

`petlines-away-merge.js`, 16 lines, one per pet, keyed **by name** rather
than `p01`–`p16`. I did not have `pets.js` when it was written and would
not guess the id order; a wrong key puts Noir's threat in Bun Bun's mouth
and nothing errors. **Now that `pets.js` is uploaded this can be keyed and
merged.**

Two fixes went in:
- Placeholders converted from `(days)`/`(name)` to `{days}`/`{name}`.
- **The word for "days" was removed from all 48 strings**, replaced by
  `{d}` with a pluralizer. Russian needs three forms — 1 день, 2–4 дня,
  5–20 дней — and every stored line said `дней`, which is wrong for the
  most likely gap lengths. German and English broke at 1.

Player gender: seven pets need `ruM` — Daisy, Ember, Alisa, Luna, Henry,
Cooper, Flippy. The other nine use one Russian string.

## The due list

`pvDue` on the progress screen said "12" and kept the twelve to itself.
Now:

- **`js/tutor.js`** — `dueList(prefix, limit)` returns the actual items,
  most overdue first, with `{key, area, over, ivl, lapses}`. Only cards
  with `reps`, so never-seen items are not reported as overdue.
  `gameFor(area)` exposes the existing `AREA_GAME` map.
- **`js/activities/progress-view.js`** — the due tile is now a `<button>`
  when the count is above zero (the other three stay `<div>`; a screen
  where everything looks tappable is one where nothing does). Tapping it
  opens a panel grouping the due items **by area**, listing each item as
  a chip with how many days overdue, and giving each group a *Practise ·
  <game>* button. Returning from that game comes back to this screen, not
  to the hub.
- Grouped by area because that is the unit a game can drill — there is no
  activity in the app that accepts a mixed queue, so twelve loose items
  across five games is not a session.
- **`js/i18n.js`** — 5 keys × 3 languages: `pvDueHead`, `pvOverdueN`,
  `pvDoThese`, `pvNoGameFor`, `pvAndMore`.

### The settled list

Same treatment for the second number.

- **`js/tutor.js`** — `matureList(limit)` returns settled items sorted by
  interval, each with `days` until it comes back. `MATURE_DAYS = 21` is
  now a named constant, exported as `matureDays`, and `stats()` uses it
  instead of a literal.
- **`js/activities/progress-view.js`** — the settled tile is live too.
  One panel at a time: `state.panel` is `'due'`, `'settled'` or null, so
  opening one closes the other. The panel states **what settled means**
  (21 days or further out), **how it was earned**, and **that it can be
  lost** — every row shows the day it comes back, because "settled" is a
  threshold, not a trophy.
- **`js/i18n.js`** — 4 more keys × 3: `pvSettledHead`, `pvSettledWhat`,
  `pvSettledLoss`, `pvNoneSettled`.
- Contrast checked: 18 measurements across 9 themes, worst 5.28.

**Known inconsistency, not fixed:** two different thresholds are called
settled in the UI. `tutor.stats().mature` and the progress screen use
**21 days**; `packs.readiness()` — the bar and "{n} of {total} are
holding" in Settings — uses **7 days**. The same learner sees two
different counts for what reads as the same idea. Pick one.

## Achievements header

- **`js/activities/awards-view.js`** — the "0 of 19" count was the
  `.practice-title` subtitle: 0.8rem, muted, under a 3rem heading, reading
  as a stray line of debug. It is now an `.aw-score` block on the bar it
  describes — 2.6rem count, 1.5rem total, uppercase label.
- **"Earned from achievements: 0" is gone.** A label reporting the absence
  of a thing reads as a bug, and the line under it already says nothing
  has happened. The paid total now shows **only once it is non-zero**, as
  `◈ 70 from achievements` rather than a colon-prefixed readout.
- **`js/i18n.js`** — `awFromAwards` reworded in all three from a full
  sentence with `{n}` to a trailing label: *за достижения* · *durch
  Erfolge* · *from achievements*. `awEarnedN` is unchanged and still used
  by the hub tile in `app.js`.

### The full-day rule, said out loud

Nine of the nineteen achievements are counted in **full days** and nothing
on the page said what one was, so "Three full days in a row" read as three
days of opening the app. `awards-view.js` now leads with a callout:
*A full day is 5 exercises. Not fewer. Opening the app and answering one
question is not a day… A full day pays 150 Kronen.* Both numbers come from
`GH.coins.rates`, so they cannot drift from what `coins.js` pays.

### `--flame` is not usable on the dark card either

Measured while fixing the faint payout: the locked Kronen value was
`--sand` at 45% — **2.79:1** in moss, failing in all nine. But `--flame`,
which the *earned* payout used, measures **3.33** on the row and **2.61**
in the rule box. Both were below the floor.

`--flame-pale` is the accent that survives every theme on a dark surface:
6.95 worst on the row, 5.46 in the rule box. `.aw-pay`, `.aw-rule-glyph`,
`.aw-rule-text b` and `.aw-row.is-got .aw-mark` all moved to it. Locked
payout went to `--sand` at 90%, "not yet" to 82%, payout size .82→1.05rem.

Page now measures **0 failures in 54 checks**, worst 5.46.

**This is a project-wide smell, not an awards-page one.** `--flame` on a
dark surface is used elsewhere and has never been measured. Worth a sweep.

## The comic did not appear, and why

`index.html` loads the activities on lines 68-88 and `js/app.js` on line
91. So when `comic.js` ran, **`GH.app` did not exist yet** — its
`if (GH.app && GH.app.register)` guard was false, nothing registered, and
the tile never appeared. No error, nothing in the console.

`songbook.js` had already solved this and I did not copy the pattern:
try now, and if `GH.app` is not there yet, retry on `DOMContentLoaded`.
`comic.js` does that now and exports `register()` as well.

**Load order should not decide whether a feature exists.** Any new
activity registered from a file that loads before `app.js` needs this,
which is all of them.

## Read and listen

A section of its own, between Reference and Games, holding the songbook
and the comic.

**Everything else in the app asks her a question. These two do not** — she
reads and she listens and nothing grades her. They were getting lost at the
bottom of the games row, which is the wrong place for the one part of the
app that is not work.

An activity opts in with **`kind:'read'`** on its registration entry.
`app.js` filters on the field rather than holding a list of ids, so a third
one — the longer stories with comprehension questions — needs no edit here.

Neither pays Kronen or counts toward the five, which is deliberate for now:
nothing is being answered. Worth revisiting if finishing a comic should
count as reading done.

**A bug worth remembering.** The three `rlHead` labels all landed in the
Russian block, because the insertion searched from the start of the file
each time and found the same first `gamesHead`. The section rendered with
its English label under a Russian interface. `i18n.js` has three
identical-looking blocks and a naive string search will always hit the
first — insert by iterating matches in file order.

## The comic reader

`js/activities/comic.js` and `data/comics.js`. **46 comics across five
units, 262 panels, 446 lines** — 10, 9, 7, 10, 10, matching the 46 images
exactly.

Every comic has a scene line and a `Characters:` block, and every speaker
in every panel is declared in its own comic. Checked, not assumed.

### Why the text is separate from the picture

The German is lettered into the artwork, which is right — hand-lettered
reads better than drawn-in. But speech cannot read pixels, a translation
cannot be revealed on demand from a drawing, and the images are **not
uniform**: two of the forty-six are 4:3 and the rest 3:2. So every line
also exists as data, and the picture is shown **whole** — `width:100%`,
`height:auto`, no `aspect-ratio`. Nothing is cropped and nothing depends
on where a panel sits inside the image.

### One line at a time

A page of English under a German picture is a page of English she reads
instead of the German. The order is enforced: see the German, hear it,
**then** the Meaning button unlocks. `speech.say()` calls back whether it
finished or failed, so the button cannot stick — and on iOS, where nothing
speaks until a tap has unlocked audio, it enables at once rather than
locking her out.

Tapping the German line says it again. Narration is labelled as such;
speech carries the speaker's name; `Max, thought bubble` renders in
italics without the uppercase treatment.

### Two editions, neither a fallback

`EDITIONS` in `comic.js` lists the image sets on disk and
`DEFAULT_EDITION` says which to load. Today that is **`eng`** — the 46
files that exist. When the German lettering lands, add `'deu'` and set it
as the default; the toggle appears on its own.

**Built the wrong way round first.** It asked for `-deu` and treated
`-eng` as an error handler, which cost a 404 and a flicker on every comic
— and worse, described a language the app is keeping as a failure case.
English is a first-class edition: Nazar reads in English and Tanya may
want it as a parallel text. Neither edition falls back to the other.

### The German text arrives per line

Most lines have only `en` — the German is still being verified. Those show
the English, say plainly that the German is still being checked, and offer
**no speak button** rather than reading English aloud in a German voice.

Same for the pictures: the reader asks for `-deu` and falls back to `-eng`
on error, per image, so it works today and improves as the German
lettering lands. A missing picture draws a hatched frame that says so.

### Generated, not hand-written

`data/comics.js` comes out of `comic-parse.py`. Regenerate rather than
edit. Every line keeps its label — `Narrative bubble, top`, `Alina`,
`Sound effect` — because that label is the key the three languages join
on.

**Three lines carry a bare `Narrative bubble` label** with no position,
all in unit 1 comic 2, where every other narration line says `top`,
`left`, `bottom`, `right` or `middle`. It parses — the label is only a key
— but the German and Russian files must repeat it **exactly**, so it is
worth normalising to `Narrative bubble, top` in the English source while
that is still one file rather than three.

**Two parser bugs found against real data.** The label pattern had no
comma in its character class, so **every `Narrative bubble, top:` line was
silently dropped** — 175 lines read out of 425, and it looked like the
source was missing its narration. And it never reset on `Comic N`, so it
reported one comic with 252 panels. Both fixed.

### Contrast

`paint-audit.py` found three failures on first run: `--ink-on-dark` used
on the page surface, which is light in every theme. The surface map now
lists the comic selectors individually — the reader card and thumbnails
are paper, the headers and top bar are page — because one prefix for the
whole feature was too coarse and mapped page elements to paper.

Verified: index renders 5 unit headers and 45 cards, all 13 lines of unit
1 comic 1 step through, the gate holds shut until audio reports done and
opens after, the reveal shows the Russian, and a comic with no German
shows English with the note and no speak button.

## School, and a nineteenth topic

**752 entries, 1,542 sentences, none without.** 29 school words at
#786-814, in a new `school` topic and a new `school` pack.

`data/sentences.js` gained the topic row; `js/i18n.js` gained `pkSchool`
in three languages. Without both the words exist and are invisible.

### Three duplicates found and merged

Writing sheets 56-64 quietly created a second entry for `gewinnen`,
`treten` and `denken` — each already existed with its own picture and its
own sentences. Left alone that is **two SRS cards for one word**, and the
scheduler would treat them as unrelated.

Merged on Steven's keep-everything rule: the older number survives as
identity, the pictures combine into `imgs`, and every sentence is kept.
`denken` now has **8 sentences and two pictures**.

`die Schere` needed no merge — the school set reused sentences it already
had at #744, so nothing was added and nothing duplicated.

### The pack table

| pack | words | drawn | sentences | default |
|---|---|---|---|---|
| core | 431 | 431 | 862 | **on** |
| extra | 66 | 65 | 160 | off |
| verbs | 63 | 63 | 132 | off |
| jobs | 31 | 31 | 62 | off |
| school | 29 | 0 | 58 | off |
| more | 132 | 29 | 268 | off |

Every word is in exactly one pack; nothing is orphaned. 431 served by
default.

### The grouping is still wrong and needs deciding

The packs follow **drawing order**, not usefulness. `der Schlüssel`,
`das Haus` and `anrufen` are locked behind toggles while `der Ellbogen`
is in the starting set, purely because of which sheet each was drawn on.

`suggest()` walks `PACKS` in array order, so **reordering the array is
enough** — no defaults change, nothing lands on her at once, and the pet
offers them in a sensible sequence. Proposed order: core, house-and-object
words, verbs, school, professions, abstract-and-tech last.

Blocked on one number: what fraction of her core has settled past a week.
Above about two thirds and the ordering is academic.

## Every game works in English

The interface was already there: **751 keys in all three languages, no
gaps.** Eleven of the twelve games were already language-neutral — they
carry `{de, ru, en}` triples and pick by interface language, and all 726
words and 1,484 sentences have English.

**One game was broken in English: `gender`.** Its three levels are built on
`rg`, the *Russian* gender, so `agree` and `differ` compared German to a
gender English does not have. The pools came back empty and the game looked
broken.

In English it now teaches what an English speaker actually has to learn —
that a gender exists and must be attached to the word:

- the word shows as **`F Tafel`, `M Stuhl`, `N Heft`**
- all three levels draw one pool, sorted by how often she has missed them
- the *Russian misleads* note is suppressed, since it would explain a
  problem Nazar does not have

Three letters, not two: German has three genders and F/M alone would teach
a false binary.

**`rg` is doing double duty and the filter that depends on it must stay.**
`rg:'PL'` is nominally the Russian gender but PL really means *this German
noun is plural*. German plurals take `die` whatever their gender, so
tagging `die Augen` as **F** would teach the exact opposite of the rule.
The English pool filters plurals out for that reason, and the comment in
`poolFor()` says so.

Pools: 190 bare nouns with pictures — 85 where Russian agrees, 81 where it
differs, 24 plural. The English pool is the 166 non-plurals.

Verified: all twelve games plus the word list and the lessons render with
the interface in English.

### What still does not travel

The 17 grammar lessons are about Russian interference — «нет → kein», the
missing feminine for врач, the numeral trap, `-ся` and reflexives. They
**display** in English but explain a problem an English speaker does not
have. Not broken, aimed elsewhere. That is the real gap for Nazar, not the
games.

## Every word has sentences

**726 entries, 1,484 sentences, and not one entry without them.** First time
that has been true. Every word in the app can be served by every game —
`fill-blank`, `listen-pick` and the vocabulary game all require `s` to be
non-empty and all of them now find it everywhere.

| pack | words | drawn | sentences |
|---|---|---|---|
| core | 431 | 431 | 862 |
| extra | 67 | 66 | 166 |
| verbs | 65 | 65 | 130 |
| jobs | 31 | 31 | 62 |
| more | 132 | 27 | 264 |

Checked: no image past #648, no cell claimed twice, no duplicate numbers,
no entry missing a language, every sentence complete in all three.

**7 drawn cells still have no word:** #279 (the long-standing orphan),
#450, #531 (`rennen` — the picture exists, the word has no entry because
no drawing distinguishes it from `laufen`), and the four spares #583,
#589, #597, #603.

## Every drawn cell is now addressable

**726 entries, 1,350 sentences.** Sheets 53 to 72 are all mapped and every
picture from #469 to #648 is either attached to a word or knowingly free.

### One word, several pictures

`packs.imgOf()` picks at random from `imgs` when a word is drawn more than
once, so she learns the word rather than the drawing. **15 words** have
several: `schreiben` has three cells, `die Handtasche` has three,
`der Apfel` has two.

That is Steven's call and it is the right one. The alternative — a separate
entry per drawing — would have given one word three SRS cards and the
scheduler would have treated them as unrelated.

### A number is identity; a cell is an address

Five words carry an `n` that is not their cell. #469-473 were taken years
earlier by `die Quittung`, `das Formular`, `unterschreiben`, `der Ausweis`
and `die Ampel`, so `der Mann` and the other four on sheet 53 took numbers
at the end and point back with `img`.

**I briefly treated this as a collision needing a decision. It was not.**
Splitting `img` from `n` exists precisely so a word's identity never moves
for a picture's sake, and I had built that two hours earlier.

### A bug caught in the same pass

Attaching new cells to four old entries — `der Apfel` #50, `essen` #179,
`der Hund` #415, `der Koffer` #111 — **overwrote their original drawings**.
Those entries had no explicit `img`, so it defaulted to `n`, and setting
`img` to the new cell silently discarded the old picture. They are
`imgs:[50,528]` and so on now.

The lesson: an entry with no `img` is not an entry with no picture. Adding
one has to preserve the default, and the default is invisible.

### Still outstanding

**67 words have no sentences** — 41 from sheets 56-64 and 26 from sheets
53-55. Until they do, `fill-blank`, `listen-pick` and the vocabulary game
cannot serve them; the word list and the gender game can. See
`SENTENCES-67.md`.

**7 drawn cells have no word at all:** #279 (the old orphan), #450, #531
(`rennen`, which needs an entry), #583, #589, #597, #603 (the four spares).

| pack | words | drawn |
|---|---|---|
| core | 431 | 431 |
| extra | 67 | 66 |
| verbs | 65 | 65 |
| jobs | 31 | 31 |
| more | 132 | 12 |

## Sheets 65-72 are in the app

**659 entries, 1,350 sentences, zero without sentences.**

55 new entries at the numbers their cells occupy, plus **13 drawings
attached to entries that already existed** — `arbeiten`, `bestellen`,
`der Arzt`, `die Verkäuferin` and nine others were already in the 137, so
their pictures were pointed at them rather than the word being written
twice.

**31 professions carry `alt`**, the other gender's form, and the headword
is the gender **drawn in that cell**: #631 is `die Lehrerin` because the
picture is a woman at a chalkboard. 13 of the 31 are women. That is the
point of the topic — Russian says врач, юрист, студент for either gender,
so a Russian speaker under-produces the German feminine, and a woman
labelled `die Anwältin` is the correction.

### The packs finally report

| pack | words | drawn |
|---|---|---|
| core | 431 | 431 |
| extra | 41 | 41 |
| verbs | 24 | 24 |
| jobs | 31 | 31 |
| more | 132 | 12 |

**`pack` was assigned by number range twice and wrong twice.** First all 55
landed in `jobs` because sheets 65-67 fall inside the `jobs` range, even
though they hold verbs. Assigning by what the word *is* — a profession
carries `alt` — moved 24 of them. The range is a fallback and should be
treated as one.

### Still not in the app

**Sheets 56-63.** 72 cells, drawn, and no word has ever been assigned to
any of them. `verbs` reports 24 rather than ~96 for that reason. Steven
described sheets 57-63 in prose once; sheet 56 has never been described.

## Pet lines: seven bands, 161 lines

`data/petlines.js` now carries **seven bands for every one of the 16 pets**,
161 lines, 44 with a masculine Russian variant.

| band | fires |
|---|---|
| perfect / high / mid / low | end of a round, chosen by score |
| nudge | on the hub, pointing at a lesson or game |
| **welcome** | on the hub, returning after a gap |
| **newpack** | on the hub, when `packs.suggest()` returns something |

Verified: every pet has every band, every string carries `{name}`, no
missing language.

### suggest() was counting by number range

`packs.suggest()` decided how many words a pack held with
`v.n >= p.from && v.n <= p.to`. That misses every word carrying an explicit
`pack` field — all 132 of the newest — so it reported the pack as empty and
skipped it forever. Same coupling that hid them from `vocab()`. Now counted
through `packOf()`.

It also returns `drawn` and `settled`/`live` now, so the offer can be
honest: *"132 more words, pictures coming"* rather than promising art that
does not exist.

**The gate works as intended and it looks like a bug the first time.** The
moment she enables a pack, its words are unlearned, so she drops below
two-thirds settled and the next suggestion goes quiet until she has caught
up. It cannot cascade three packs at her in a week.

Tested: nothing learned -> no suggestion. Core settled -> `extra` (41
words, 41 drawn). `extra` on and settled -> `more` (132 words, **0 drawn**).

### Steven's uploads

**paste.rs works.** Document attachments have arrived empty perhaps eight
times this session, and twice never reached disk at all. A paste.rs link
fetched 700 lines first try. That is the channel to use for anything long
from a phone.

## 137 words written into vocab.js

**604 entries now, 1,240 sentences, and for the first time zero entries
without sentences.** The five at #469-473 had `s:[]` and have been filled;
132 new entries added at **#649-780**.

Every new entry:

    { n:649, cats:['home'], pack:'more', img:0,
      de:'die Wand', en:'wall', ru:'стена', rg:'F',
      s:[ { de:'Die Wand ist weiss.', ru:'...', en:'...' },
          { de:'Ich haenge ein Bild an die Wand.', ru:'...', en:'...' } ] }

- **`img:0`** — no drawing yet. `sprite.tile()` renders the German word on
  a plain ground; the four picture games skip these. When a picture is
  drawn, set `img` and nothing else changes.
- **`cats`** is an array, so a word can be added to a second category
  later at no cost.
- **`pack:'more'`** is explicit. See below.
- **`n` is identity only** and must never be reused: `word:<n>` is the
  progress key.

### The pack ranges bit again

`packs.vocab()` served **431 of 604** and nothing said so. The new numbers
landed in `more` (604-9999), which is **off unless asked for**, so 132
words were invisible with no error anywhere.

Ranges redrawn to match what is actually drawn, and they are now only a
fallback for the 472 entries written before `pack` existed:

| pack | range | sheets | words | default |
|---|---|---|---|---|
| core | 1-432 | 1-48 | 431 | on |
| extra | 433-495 | 49-55 | 41 | off |
| verbs | 496-567 | 56-63 | 0 | off |
| jobs | 568-648 | 64-72 | 0 | off |
| more | 649+ | none yet | 132 | off |

`verbs` and `jobs` are 0 because sheets 56-72 exist as **drawings only** —
those words have never been written into `vocab.js`. The ranges are
reserved and waiting.

**New entries should name their pack.** A range deciding for them is the
coupling `cats` was meant to remove.

## Every game pays now

**Five games paid nothing at all**, and one of them was `fill-blank` — the
app's main exercise, four sections, 934 sentences. A hundred rounds of it
earned zero while one round of `mehrzahl` paid. Not a design decision, an
omission.

Fixed: `fill-blank`, `catch-word`, `wrong-form`, `gender`, `conveyor` now
call `coins.award()` before drawing their end screen, and pass `coins` and
`won` into the spec so the breakdown shows. `songbook` still does not pay,
deliberately — it is reading, not answering.

`gender` and `conveyor` keep their own counters rather than using `GH.run`,
so they hand `award()` a run-shaped object built from them.

### Longer rounds pay more

`coins.unitsFor(r)` reads the answer count. One unit is ten Kronen and one
of the five:

| answers | units | Kronen |
|---|---|---|
| under 20 | 1 | 10 |
| 20–39 | 2 | 20 |
| 40+ | 3 | 30 |

Capped at three on purpose: the day is meant to be five sittings, and an
uncapped rule would let one enormous session buy a full day.

A caller that knows better passes `opts.units` — a lesson knows its own
worth from its steps and does not need to guess from answers.
**`lessons.js` used to call `award()` in a loop**, once per unit of worth,
which wrote three ledger entries and three breakdown lines for one lesson.
It now passes `units` and does it once.

Verified: all 14 activities pay, the day counter advances, the daily bonus
fires exactly once on the fifth, a 60-blank story pays 30, and a worth-3
lesson pays 30 with `units:3` on its breakdown line.

## Words are no longer filed by number

`n` was doing two jobs: identifying the word **and** addressing the picture,
since `sheet = (n-1)/9+1`. That coupling is why a category had to be a
contiguous range, why adding eight kitchen words meant renumbering, and why
scissors could not be in the kitchen and the office at once.

**`n` now does one job.** It is a permanent opaque id and nothing infers
meaning from its value.

### Why it could not simply be replaced

`word:<n>` is the progress key. It appears in 14 files and is stored as
`p1:de:word:342` with the SM-2 interval, ease and due date attached.
Changing what `n` means would orphan every learner's history silently —
Tanya's weeks of scheduling gone with no error. So `n` stays exactly as it
is; only the *inferences* were removed.

### Three data changes, all backwards compatible

| | |
|---|---|
| `cats: []` | an array. A word can be in as many categories as make sense. |
| `img` | optional, defaults to `n`. **`img: 0` means no picture.** |
| `pack` | optional, replaces the number ranges in `packs.js`. |

The 472 existing entries are untouched and keep working: an old record has
`cat` and no `cats`, and `catsOf()` returns `[cat]`. Migrate whenever.

### New in `js/packs.js`

`catsOf(v)` · `inCat(v, cat)` · `ofCat(cat)` · `shareCat(a, b)` ·
`imgOf(v)` · `hasPicture(v)`. `packOf()` now takes a word and prefers an
explicit `pack` field over the ranges.

**Nothing reads `v.cat` on a word any more** — 14 sites across 5 files went
through the accessors. Sentences and stories keep a single `cat`, which is
correct: a story is about one thing.

`shareCat()` replaced `a.cat === b.cat` in the distractor pickers, so a word
in three categories is now a plausible distractor in all three.

### A word with no picture

`sprite.locate(0)` used to return `images/1.jpg` — an abstract word with no
drawing **silently displayed der Kopf**. Nothing warned, because the maths
worked.

Now `sprite.has(n)` answers it and `sprite.tile(n, label)` renders the
German word on a plain ground instead. The three picture games —
`catch-word`, `listen-pick`, `gender`, and the words phase of `vocabgame` —
filter on `hasPicture()`, so an imageless word never appears where a picture
is the question. `fill-blank`, `scramble` and `wrong-form` serve them
normally.

That is what lets *hoffentlich*, *sogar* and *auf jeden Fall* into the app
at all — 18 of the 30 words on Tanya's course list.

### Note on this refactor

Copying working files from `uploads` at the start clobbered two delivered
files: `app.js` lost the profile card and all 13 scroll hooks, and
`reference.js` lost its scroll fix. Both caught on hash comparison and
restored, with the category edits reapplied on top. **`uploads` is Steven's
last-copied state, not the current state** — always diff against
`outputs` first.

## Hard rule: English is the bold word

In **every** image audit page, the **English word is the largest, boldest
element**. German and Russian sit under it, smaller and unbolded.

These pages exist to check a drawing against the word it is meant to show,
and that check is done in English. A big German headword means squinting at
the thing you are not verifying. `make-sheets.py` carries the rule in a
comment at the top and beside the CSS; `sheets-40-67.html` was built wrong
once and has been rebuilt.

Verified across all three: `sheets-01-52`, `sheets-53-64`, `sheets-40-67` —
English 1.15–1.25rem at weight 800, German and Russian 0.82–0.85rem at 400.

## The map, sheets 40–67

`sheets-40-67.html` — 252 cells, three states:

- **green** a real entry in `vocab.js`
- **amber, italic, dashed** proposed by me, not an entry
- **red, hatched** no label anywhere

**`vocab.js` has no entry above #473.** Sheets 54–63 are 90 cells of my
proposals with nothing in the data behind them, and 64–67 are blank. That
is why the allocation walked over existing images: `audit.sh` said
`SHEETS=52` and the data agreed.

`SHEETS` is now **67**. The Mac reports 71 webp files with the highest at
67, so four are unaccounted for — worth a look.

## The rules open themselves the first time

A learner meeting *Wo oder wohin?* sees four level tiles and no way to know
what the game asks. The one control that would say is the smallest thing on
the screen.

`js/howto.js` — `button()` now opens the overlay itself the first time a
given rule set is seen, then never again. **One change covers all ten
games**: every one of them already calls `GH.howto.button(titleKey, prefix)`
on its level screen and none calls `open()` directly.

- Keyed on the rule prefix, which is what identifies a set of rules.
- **Per profile.** Nazar is told how catch-word works even though Tanya has
  played it for weeks.
- Deferred by a tick so the overlay lands on a painted page.
- If localStorage is unavailable it reports everything as already seen —
  better to say nothing than to nag on every visit.
- New exports `isNew(prefix)` / `seen()` / `markSeen()`, so the pet nudge
  can say *"a game you have not played"* and offer the rules with it.

## Four more long stories

`data/stories-long.js` goes from 7 to **11**. `ls-8` shopping, `ls-9` home,
`ls-10` kitchen, `ls-11` travel. 20 sentences each rather than 18, all
three languages, every sentence with an `img`.

Written around the sheets 53–64 vocabulary: **37 of the 101 new words
appear**, including all the song nouns except the abstract four, and the
travel story carries `abfahren`, `ankommen`, `einsteigen` and `umsteigen`
together. The new words get met in a narrative before they are drilled.

**Picture numbers were matched to the text, not assigned by hand.** Whole
nouns first, preferring a new word so it gets an outing, then verb stems,
then two filled manually. Substring matching had to go: `die Lippe` was
matching inside *Lippenstift* and `sein` inside *sein Handy*.

### A correction to an earlier measurement

The seven existing long stories carry `blanks:[2]` — **one blank per
sentence**. Measuring them without honouring that override gave 54 blanks
each; the real figure is **18**. So:

| | blanks |
|---|---|
| short story | 14 |
| **long story, ls-1…7** | **18** |
| new long story, ls-8…11 | 60 |
| topic sentence set | 69 (52–192) |

The existing long stories are the *smallest* exercise in the app, not a
middling one — 18 blanks against a topic set's 69. Earlier notes said long
stories were 0.78× a topic set; the true figure is 0.26×. The four new
ones, at three blanks a sentence, land next to a topic set.

## The pets speak

`data/petlines.js` had held 113 lines since the night they were written and
nothing opened the file. **`js/petvoice.js` opens it**, and the end screen
shows one.

- **Band from the score, not the tone word.** `tone:'done'` covers 51% to
  99%, and that is the difference between *almost* and *not yet*.
  `pctOf()` reads the percentage a game already put in its stats — most use
  `GH.run.stats()`, which puts it in as `'70%'` — falling back to a
  good/bad count pair, then to the tone. A caller can pass `pct` directly.
- **`{name}` takes its comma with it** when there is no name. *Perfekt,
  {name}. Gut gemacht.* becomes *Perfekt. Gut gemacht.*, and
  *Warte—{name}, das war perfekt.* becomes *Warte, das war perfekt.*
- **`ru` or `ruM` from the profile gender**, which Settings now sets.
- **German shown, translation behind a button**, and nothing to translate
  when she is reading the app in German — so no button rather than a dead
  one.
- **Spoken on arrival**, and the line itself is tappable to hear again.

**Only the first pet speaks.** Three at once is noise, and the lines were
written as one voice reacting to a round.

Cheer sizes are by count now: **140 / 120 / 104** for one, two or three.
One pet matches the store; three at 140 would be 448px on a 390px phone.

`data/petlines.js` moves from PENDING to LIVE — something reads it.

Verified: all 16 pets have a line for all four bands, no holes; bands cut at
100 / 80 / 50; name substitution across five shapes; gender and interface
language both switch the translation; and a rendered end screen shows Noir
saying the right thing with both buttons live.

## Still to build, discussed

- **Pets nudge her toward a lesson on the hub.** Lines are lesson-agnostic
  — *"Squeak squeak! This lesson. Do this!!"* — so the app supplies the
  lesson and the pet supplies the character. **Every lesson already carries
  a `topic`** (`plural`, `case`, `gender`, `order`, `irregular`, `past`)
  and those are the same names `whatNext()` reports as weakest, so the join
  needs no new tagging. Note `case` and `gender` have four lessons each and
  `order` three, so picking a lesson from an area needs a tie-break; and no
  lesson covers `word`, `topic` or `tense`, where the pet should fall back
  to a game.
- **A bonus for doing a suggested lesson**, +10 first in a day then +5,
  same shape as `dueEarn()`. Open: whether it shares the due bonus's
  counter or runs its own ladder, and whether "suggested" means the lesson
  the pet actually pointed at.
- **Nudge lines are in.** A fifth band, `nudge`, one line per pet, all 16.
  Lesson-agnostic, so the app supplies the lesson. Only Alisa needed a
  `ruM` — «дорогая / дорогой». Verified across gender, language and the
  nameless case: *Lektionszeit, Liebling {name}* becomes *Lektionszeit,
  Liebling.* and Cooper's mid-sentence name vanishes cleanly.
- Still wanted: a line for when nothing needs fixing, so the pet is not
  pointing at nothing on a day she is up to date.

## WebP

The sheets are `.webp` now, not `.jpg`. Illustrated objects on flat grounds
are exactly what JPEG handles worst — 8x8 blocks ring around every clean
line — and the pets have been WebP from the start, so support is proven.

**One switch for the whole app.** `GH_BANK.sheets.ext` in
`data/sentences.js`, with the same default mirrored in `js/sprite.js` for
when the bank has not loaded. Nothing else in the app builds an image path.

- `data/sentences.js` · `js/sprite.js` — `ext:'.webp'`
- `audit.sh` — checks `images/N.webp`, counts webp, and **warns if any
  `.jpg` is still present**, since the app now asks for `.webp` and a
  leftover original means either a missed conversion or a stale file
- `SHEETS=52` is unchanged. Raise it as each new sheet lands.

Verified against `sprite.js`: #1, #9, #10, #137, #468, #469, #557, #569 all
resolve to the right sheet and crop.

**Conversion is yours.** `cwebp -q 85` is the starting point; try one sheet
at 82 and 88 and compare before doing sixty-four.

## The two audit pages

`make-sheets.py` builds both, from the project's own data, so they cannot
drift:

    python3 make-sheets.py .

- **`sheets-01-52.html`** — the 467 drawn, 52 sheets, 468 cells. The one
  hatched cell is **#279**, which no vocabulary entry claims. It is on
  sheet 31 at **r3c3**, the last cell — earlier notes said r2c3, which was
  wrong.
- **`sheets-53-64.html`** — the 101 to draw. Cells fill in as each sheet
  lands.

Nine across per row in sheet order, so a row on screen is a row on the
sheet. English word largest, German and Russian under it, number last.
Sticky jump bar, and it prints.

Checked: all 468 crop positions agree with `sprite.js`, no `.jpg`
references left in either page.

`sheets-new.json` holds the 101 records the second page is built from.
They are deliberately **not** in `vocab.js` — with no pictures they would
give the games 101 broken tiles.

## God mode — the store was unbuyable at any price

Measured: with a full purse, **0 of 16 pets were purchasable**. Every pet
above common is gated on consecutive full days — three for a common,
ninety for a legendary, a hundred and fifty for Ember — so Kronen alone
never opened the shelf and it could not be looked at for five months.

- **`js/activities/store.js`** — `god()` / `setGod()`, one early return in
  `earned()`. Nothing stored is altered: days, streaks and counts stay
  whatever they really are, and switching it off puts the shelf straight
  back to the truth.
- **`js/activities/settings.js`** — a toggle in the **For testing** block,
  under the Kronen buttons.
- **`js/i18n.js`** — `stGodMode`, `stGodNote` × 3.

**Purchases made under it are real.** Kronen are spent, the pet is owned,
and it stays owned when the switch goes off — verified by buying Ember for
15,000 and toggling back. That is deliberate: the store has to be walked
through behaving as it actually will.

Verified: 0 of 16 buyable off · 16 of 16 on · 0 of 16 off again, with
`bestRun()` still 0 throughout.

## Coming back lands where she left

Every launch clears the view and hands it to an activity; coming back
rebuilds the hub from scratch, which put her at the top of a 168-tile page
however far down she had been.

- **`js/app.js`** — `leaving()` records the scroll position at all
  **13 launch paths**; `restoreScroll()` puts it back once the hub has
  finished painting, inside `requestAnimationFrame` so the page is tall
  enough for the browser to honour it.
- **Consumed, not kept.** The jump bar scrolls to a section itself and the
  filter row rebuilds the hub — a restore that fired on every repaint
  would drag both back to a stale position.
- **`js/activities/reference.js`** — same problem inside the word list:
  opening or closing a group rebuilt three hundred rows and jumped to the
  top. Held across the repaint, except on the first paint (starts at the
  top, correctly) and when a jump pill has asked for a specific group.

Note for later: a regex pass marked 10 of the 13 paths, because the other
three clear the view without calling `GH.speech.stop()` first — and those
three were the word-set, sentence and story tiles, the ones she uses most.
Caught by testing an actual tile click rather than the pattern.

## Vocabulary rows pointed at a game that does not exist

`AREA_GAME.word` was `'vocab'`. **There is no activity with that id.**
`vocabgame.js` is not an activity at all — it is mounted by the hub with a
particular word set, so `GH.app.find('vocab')` has always returned null.
Every vocabulary row on the progress screen was dead while the verb rows
worked, and the same map is what `whatNext()` uses for the hub suggestion.

Now `word: 'catch-word'` — the registered activity that drills word
recognition across the whole vocabulary.

**New local tool: `mapcheck.py`.** Reads the id each activity passes to
`GH.app.register` and checks every value in `AREA_GAME` and `SKILL_GAME`
against it. These were plain strings with nothing enforcing that they
meant anything.

    python3 mapcheck.py .

Currently: all 11 registered ids resolve. It also reports the reverse —
**`placement` and `songs` are registered but the tutor never suggests
them**, which is a content gap rather than a bug.

## Overlays, and a hole in the auditor

**The scrim.** `--shade-rgb` was doing two jobs that disagree in a dark
theme: as an inset tint it must lighten a dark panel, so it flips to
white — but as the backdrop behind a modal it must stay black. So opening
*How to play* at night floodlit the page. New token **`--scrim-rgb: 0 0 0`**,
never flipped, used by the three overlays, both shadows, and every
`--shade-rgb` use above 0.4 alpha (those meant "black", not "shade").

**And the reverse on a light theme:** the how-to box is `--paper`, but the
surface map said `.howto` was the dark card, so the earlier sweep painted
its text light — invisible. Map corrected.

**The hole: `token()` could not follow `var()` indirection.** Every
approved alias is declared `--ink-on-dark: var(--on-dark)` — that is the
whole point of them. The resolver returned None for all of them and the
auditor **silently skipped the entire alias layer**, which is most of the
stylesheet now. It had been reporting clean while not looking.

Fixed, and it immediately found **28 real failures** the previous "0
failures" had hidden. All resolved:

- 14 remapped to the correctly-sided alias
- 10 promoted from `soft-*` to `ink-*` where soft could not reach
- 4 surfaces fixed rather than their ink: `.es-review` and `.empty` were
  `--paper` at 50%, which lands mid-tone and carries neither ink;
  `.co-hello` likewise; `.brand-mark` and the two hot streak chips sit on
  `--flame`, where the only approved ink is `--ink-on-accent`

`declared_bg` also now reads the **last** layer of a multi-layer
background rather than the first, since later layers paint underneath.

**Lesson worth keeping: a green audit means the tool found nothing, not
that nothing is there.** Two of the last three real bugs were caught by
Steven looking at a screen, not by the tool.

## Taking the tutor's advice pays

**+10 for the first due item cleared in a day, +5 for each one after.**
The scheduler has been choosing what she sees for weeks and had never
been worth anything.

- **`js/coins.js`** — `dueEarn(key)` and `dueToday()`. Rates exposed as
  `rates.dueFirst` / `rates.dueMore`. Paid once per item per day, banked
  immediately and also accumulated into the round so the end screen
  reports it as a line rather than the balance silently ticking up.
- **`js/tutor.js`** — hooked into `grade()`, the single point every
  answer in the app passes through. Pays only when a due item is got
  **right**; a wrong answer leaves it due, so paying for that would pay
  for failing the same card all afternoon.
- **`js/i18n.js`** — `coDueBonus` × 3.

Front-loaded on purpose: the first one is the decision to follow the
tutor rather than play whatever game is nearest. After that she is
already there.

**Scale:** five due items is 30 on top of the 150 a full day pays — 20%.
Enough to notice, not enough to make a review queue worth more than the
exercises.

**A bug this turned up:** `wasDue` first tested `c.reps`, but a card that
has just **lapsed** has reps back at zero while being due immediately —
so failing an item and then getting it right paid nothing, which is
exactly the case worth rewarding. Now tested on `c.last`, which is zero
only for a card never seen.

Verified: 10/5/5 in sequence, 0 for repeating an item the same day, 0 for
failing a due card repeatedly, 0 for something never seen, and the
counter resets at midnight so the next day starts at 10 again.

**Still open, and the bigger half of what you asked:** the tutor is still
close to invisible. It says one line on the hub, never suggests a
*lesson*, and nothing anywhere says these Kronen exist before they are
earned.

## Weak rows go somewhere

The rows under *Worth revisiting* unfolded `0 reviews, 2 lapses, ease
2.15` — the scheduler's internals, which a learner cannot act on. A row
that says a thing is due should do the thing.

- Tapping a row now opens the game that drills it and returns to this
  screen afterwards. The row shows its destination on the right.
- Rows with no matching game are disabled rather than dead.
- The interval and ease numbers survive behind a small **?** on the row,
  for when they are actually wanted.
- `pvWeakNote` reworded in all three: *tap a row to practise it now.*
- New key `pvPractise` × 3.

**Design rule this establishes:** a number the app shows about her
progress is a call to action or it should not be on the screen. Same fix
as the due count and the settled count.

## The store tier bug — and the rule behind it

**Symptom:** common pets readable, rare / epic / legendary not, in every
theme. Grove measured **1.20:1** on rare — text and ground the same
colour.

**Cause:** `.pt-card` sets `background:var(--sand-wash)`. `.pt-rare` and
friends then *replaced* it with `rgb(var(--mauve-rgb) / .18)`. A
translucent background does not composite over the declaration it
overrode — it composites over whatever is behind the **element**, which
is the dark panel the grid sits in. So the tiers went dark under text
still coloured for a light card. Common has no override, so common was
fine.

**Fix:** layer the tint over the ground in the same declaration —
`linear-gradient(tint, tint), var(--sand-wash)`. Every tier, every theme,
now 8.87 or better.

**`paint-audit.py` gained a fifth check** for exactly this:
*translucent modifier over an opaque base*. It found one more,
`.sc-slot.is-off`, now layered the same way.

**And a fifth alias: `--ink-on-sand` (`--liver-deep`, 7.41 worst).**
`--sand` stays a light chip in every theme, including the dark ones where
it doubles as the soft ink — so `--ink` is wrong on it (1.54 in ember).
Anything painted `--sand` takes `--ink-on-sand`.

## Dark themes

Three added: **Midnight** (blue-black), **Ember** (warm), **Pine**
(green). Twelve themes total. `js/theme.js` lists them, `style.css` has
the blocks and the swatches.

**Nothing in the stylesheet is conditional on them.** That is the payoff
of the alias block in `:root`: `--ink-on-light` means *the ink that goes
on `--paper`*, not literally a dark colour. In a dark theme `--paper` is
a deep tone and `--ink` is nearly white, and the pair still clears the
floor.

Two things had to change to make it work, and both were latent bugs:

- **`--liver` was doing double duty** — the dark card surface *and* a
  dark ink on paper. Fine while every theme is light; broken the moment
  one is not. 32 declarations remapped to `--ink-on-light`.
- **`--shade-rgb` flips to white** in the dark themes, because the tints
  that darken a light card must lighten a dark one or every inset panel
  vanishes. That caught `.ref-thumb::after`, which painted white on a
  `--shade-rgb` plate — fine on black, invisible on white. Now a fixed
  black plate.
- **The gender colours are tokens now** (`--gen-m/-f/-n`). Fixed mid-tone
  hexes cannot serve both a light and a dark ground.

Measured: page luminance **0.004** against 0.59 for the light themes, and
the contrast is *higher* than the light themes — ink on paper 14.5–14.8,
accent on card 10.9–12.9. **12 themes, 0 failures.**

## Grammar topic pages

`grammar.js` line 167 put the section name — *Grammar* — as a subtitle
under each topic's own `<h1>`. A breadcrumb pointing at the page you just
left, already written on the Back button above it. Removed. The grammar
index keeps its subtitle, which says something (*Rules and tables*).

Checked every other screen for the same pattern: none. All other
`.practice-title` subtitles carry a level name, a lesson subtitle or a
count.

## Paint audit — the site-wide sweep

**`paint-audit.py`** (local tool, keep out of the repo). Reads
`css/style.css`, resolves every colour against every theme, and reports
four things:

    python3 paint-audit.py css/style.css

- **contrast failures** — text below 4.5:1 on the surface it sits on
- **banned inks used as text** — see below
- **type below 0.85rem** — including the minimum of a `clamp()`
- **unaudited selectors** — no surface declared, so not checked. An
  unaudited rule is a finding, not a pass.

CSS cannot say what is behind a thing, so surfaces are declared by
selector prefix in `SURFACE_OF`. The tool also reads a rule's own
`background`, and walks a class name back along its hyphens to find a
painted ancestor (`.cw-review-tr` → `.cw-review` → `.cw`).

### What it found and what changed

Starting state: **~90 contrast failures, 137 undersized rules**.
Now: **0 / 0 / 0 / 0.**

- **Three tokens clear 4.5:1 on no surface in any theme and are now
  banned as text**: `--flame` (best 3.33), `--flame-dark` (2.95),
  `--mauve` (3.18). They remain fills and borders. The tool checks these
  by name, because a rule that happens to sit on a lucky background is
  one restyle from being unreadable.
- **Seven named aliases in `:root`**, each pointing at a token every
  theme redefines, so one declaration is correct in all nine:
  `--ink-on-light` · `--soft-on-light` · `--accent-on-light` ·
  `--ink-on-dark` · `--soft-on-dark` · `--accent-on-dark` ·
  `--ink-on-accent`. **Use these rather than picking a token by hand.**
- The full measured matrix — 18 inks × 6 surfaces — is written into the
  top of `style.css` above the surfaces block.
- **~130 colour declarations remapped** to the aliases, plus 99
  low-alpha `--sand` inks.
- **137 type sizes raised** to a 0.85rem floor, hierarchy preserved
  (0.6–0.72 → 0.85, then scaled up); two `clamp()` minimums raised.
- Three literal hex colours darkened: the Russian-gender chips
  `.rg-m/.rg-f/.rg-n` and `.art-*`.

### A live bug this turned up

**`.done h2` had no colour override**, so every end-screen title
inherited the global `h2{color:var(--liver)}` onto the dark card —
**1.30:1**. The title of every finished round, in every game, in every
theme. Now `.card h2, .done h2, .es-done h2 { color:var(--ink-on-dark) }`.

## Contrast: the approved-surface rule

`css/style.css` opens with a block defining **four surfaces and only
four**. Each sets background and text colour together so the two cannot
drift apart, which is the bug it exists to prevent — a control designed
for the dark `.card` was dropped onto a white one and its text measured
**1.06:1**.

| class | text | worst case across 9 themes |
|---|---|---|
| `.surf-paper` | `--ink` / `.muted` `--ink-soft` | 11.79 / 5.42 |
| `.surf-wash` | `--ink` / `.muted` `--ink-soft` | 11.21 / 5.18 |
| `.surf-deep` | `--on-dark` / `.muted` `--sand` | 9.20 / 7.41 |
| `.surf-accent` | `--on-flame` | 4.65 |

`.mode-toggle` now adapts: inside `.surf-paper` or `.surf-wash` it takes
an `--ink` at 8% track with `--ink-soft` labels (4.66 worst) and an
`--ink` on `--paper` selected state (11.79 worst).

**Rejected and unavailable: `--flame-dark` on a light surface** — 2.95 in
orchid. Emphasis on light goes to weight, not hue.

**Rule: do not pick a colour pair at the point of use.** Add a surface
here, measure it against every theme, then use it.

**Still to clean up — pre-existing `--flame-dark` on light surfaces:**
`.pt-grow` and `.pt-form` on the store card. Same defect, different
screen, not touched this pass.

## Pictures needed

See **`PICTURES-TODO.md`**, computed from `vocab.js` rather than from
notes. Short version: only **5 words** lack a picture (#469–473, all on an
undrawn sheet 53), plus **#279** which is a drawing no word claims.

## Open questions on the pet work

- **Cheer size.** 140px × 3 overflows a phone. Choose 104px flat, or
  140/120/104 by pet count. Not implemented pending your call.
- **Pets on every end screen** — already true; all 14 activities go
  through `GH.endScreen.render` and the `pt-cheer` block is
  unconditional. If pets are absent it is because `chosen()` is empty.
- **Nameless first session.** Every line now ends on `{name}` in direct
  address, so the reader must drop the token *and* the comma or dash in
  front of it. `player.js` starts with `name:''` and nothing forces her
  to set one, so this is the common case, not the edge case.
- **The reader is still not built.** Band selection, the `{name}`
  substitution, gender pick between `ru`/`ruM`, the translate toggle and
  the speak button. `petlines.js` remains PENDING until it exists.
- **Lines content** is yours to supply into `petlines.js`. The reader,
  the band selection, the translate toggle and the speak button are not
  built yet.

---

## Who and what

I'm building a German-learning web app for Tanya, a Russian speaker living
in Berlin. Her son Nazar appears in the sentences. Interface language is
Russian, with English available; the target language is German.

**The thing that makes this app different from Duolingo is that it knows her
first language.** Nearly every grammar lesson turns on what Russian does:
where it helps, where it misleads, where it has no equivalent. That's the
architecture, and it isn't specific to Tanya — it applies to any Russian
speaker learning German.

Live: `https://stevenrwilson-data.github.io/tanya-german/`
Local: `/Users/srw/Library/Mobile Documents/com~apple~CloudDocs/Documents/tanya_german`

---

## How we work together

**`audit.sh` ships with every handover, already updated.** Claude keeps the
manifest, the cache version and the PENDING list current and hands the file
back alongside `HANDOFF.md` whenever any file changes. Steven sends the
output of `zsh audit.sh` back so both sides know the local folder matches.


**`audit.sh` is the contract.** It holds a fingerprint of every file. I run
`zsh audit.sh` on my Mac and it tells me exactly which files are stale.
**Always give me `audit.sh` first in any handover**, then the changed files
with their destination folders in a table.

It checks: stale/missing files, cache version, referenced-but-absent,
**present-but-never-loaded** (a file copied but not in index.html — this bit
us once), image count, and duplicate filenames.

**Current state: cache `?v=133`, 57 files, audit clean.**

Bump the cache version on every handover or browsers serve stale files.

### Rules I care about

**Never reuse a filename anywhere in the project**, even in different
folders. `data/position.js` and `js/activities/position.js` would be a
violation — that's why the placement game is called `placement.js`.
Different extensions for the same thing are fine (`x.js` and `x.css`).

**Do exactly and only what I ask.** No extra features, no scope expansion,
no "I also added…". Scripts are dangerous.

**Verify before shipping.** Node load test with a fake DOM, `node --check`
on every file, filename collision check, CSS variables all defined, i18n
keys balanced across ru/de/en.

**Tell me about problems before I find them.** Blunt is fine. If you broke
something, say so plainly — several real bugs this session were caught that
way and it's the most useful thing you do.

**Never touch my image files.** You may ask me to look at a single
screenshot for diagnosis. You never take custody of image assets, package
them, or hand them back.

**Don't write prose or biographical text from scratch.** Give me prompts to
send to GPT or Grok and edit what comes back. That's how the grammar lessons
were made: I asked for 20–40 sentences plus one line on *what Russian does
here*, and that one line shaped each lesson more than the examples did.

---

## Architecture

Vanilla JS, no build step, no framework. `window.GH` namespace. Data in
`data/`, engine modules in `js/`, screens in `js/activities/`. Everything
loads via script tags in `index.html` with `?v=NNN` cache busting.

**Engine (21 files in `js/`)**
`i18n.js` · `app.js` · `tutor.js` · `coins.js` · `awards.js` · `coach.js` ·
`run.js` · `packs.js` · `player.js` · `progress.js` · `endscreen.js` ·
`sprite.js` · `petart.js` · `speech.js` · `text.js` · `theme.js` ·
`nav.js` · `howto.js` · `conjugate.js` · `verbtable.js` · `lightbox.js`

**Screens (20 files in `js/activities/`)**
Games: `fill-blank` · `vocabgame` · `listen-pick` · `catch-word` ·
`conjugate-game` · `wrong-form` · `gender` · `wo-wohin` · `scramble` ·
`mehrzahl` · `conveyor` · `placement`
Other: `lessons` · `songbook` · `reference` · `grammar` · `progress-view` ·
`awards-view` · `store` · `settings`

**Data (14 files in `data/`)**
`vocab.js` (472 words, numbered to 473) · `curriculum.js` (17 lessons) ·
`sentences.js` · `stories-long.js` · `songs.js` · `conj-sentences.js` ·
`tenses.js` (90 verbs × 3 tenses) · `plurals.js` · `case.js` · `past.js` ·
`future.js` · `pets.js` (16 pets) · `position.js` (49 nouns) ·
`pairs.js` (built, no game yet)

**i18n:** 725 keys, balanced across ru/de/en. `GH.i18n.plural()` handles
Russian three-form counting; `{n|one|few|many}` works inline in strings.

---

## What's built

### 17 grammar lessons — `data/curriculum.js`

166 steps, 389 answers, all verified in Russian, German and English. Each
runs a **scaffolding ladder**: `sort` (2–3 bins) → `pick` (2 options) →
`pick` (4 options) → `type` (no options). She ends producing what she began
by recognising. `read` steps have nothing to get wrong — that's what lets a
lesson explain, which a game can't.

| | lesson | Russian angle |
|---|---|---|
| ⚖ | haben or sein | я пошла and я работала are built identically — no warning |
| ✂ | Verbs that split | приходить keeps its при- wherever it goes |
| ⚖ | When Russian misleads (der/die/das) | 91 nouns disagree — she's actively misled |
| 👥 | Five ways to say more than one | five patterns where Russian has one habit |
| 📍 | Where, or where to? | в комнате / в комнату — Russian **helps** |
| 🧩 | The verb comes second | Russian moves words freely; German can't |
| 🪞 | Verbs that turn back on you | `-ся` overlaps *partially*, worse than not at all |
| 🎨 | Adjective endings | deliberately **not** the 48-cell table |
| ☝ | Commands and requests | приходи/приходите — the social split transfers |
| 🔒 | Prepositions with a fixed case | concept transfers, cases don't |
| 🤝 | mein, dein, sein, ihr | Russian has **свой**; German has nothing like it |
| 🗝 | Modal verbs | «не должен» covers both *musst nicht* and *darfst nicht* |
| 🚫 | kein or nicht | **нет → kein, не → nicht** — nearly a rule |
| 📌 | es gibt and es gab | был/была/было/были → one `es gab`. German is easier here |
| 📊 | Bigger, better, best | быстрее/чем map cleanly; `mehr teuer` is the trap |
| 🫂 | Mir gefällt, mir ist kalt | Russian is simply **right** — мне холодно |
| 🔗 | zu plus infinitive | Russian joins two verbs with nothing between |

**Lesson worth and adaptive timing.** A card before each lesson shows
minutes, exercise count and Kronen. Worth is fixed (read = 1 unit, tap = 1,
typed = 2; ≤30 → 1, ≤42 → 2, else 3) so it doesn't shrink as she speeds up.
**8 lessons worth 1, 8 worth 2, zu-infinitive worth 3.** A worth-2 lesson
pays twice and advances the daily count twice — so one long grammar lesson
gets her most of the way to the daily bonus.

**The time is measured, not asserted.** Every step is timed and a rolling
average kept per step *kind* (leaning recent, ignoring anything over 90s).
So an unopened lesson is still estimated from her own pace, and the label
changes from "roughly" to "at your pace" once there's data.

### The economy — `js/coins.js`

**10 Kronen an exercise, +100 once five are done in a day. A full day = 150.**
20 days → 3,000. 60 days → 9,000. No cap above five; a long session earns
more but can't buy tomorrow.

**A day only counts when five exercises are finished.** Twenty days of
opening the app and doing one exercise earns 220 and moves the streak zero.
No streak freezes; nothing in the store can become one.

### 16 pets — `data/pets.js`, `js/activities/store.js`

Every tier gated on **consecutive full days**: common 3 · rare 7 · epic 30 ·
legendary 90 · Ember (Phoenix) 150. Plus prices: 500 / 1,500 / 3,000 /
9,000 / 15,000. Slots: free, 1,500, 4,500. Legendaries have extra
conditions on top (all pets owned, 150 settled words, 6 grown + 12
achievements, the other three legendaries).

Her 15 webp files live in `images/pets/` as plain names
(`flippy-the-frog.webp`). `petart.js` makes one request per pet until
suffixed art (`-1-cheer`, `-2-shop`) is declared in the data — so adding art
is a data edit, never a rename.

**Undecided:** whether the gate reads her longest run ever (banked, current
behaviour) or the live streak. She leaned toward live — "don't encourage
anyone to go soft after they get a streak" — but hadn't decided.

### 19 achievements — `js/awards.js`
Paid in proportion to the days they take. The 20-day one pays 1,000, about a
third of what those days earn anyway. Day-streak achievements require **full
days**, not app opens.

### The adaptive tutor — `js/tutor.js`
SM-2 (1→3→8→21→57 days). Records the grammar **pattern** as well as the
item, so it knows `-er` plurals specifically and serves them **12× more than
chance**. `whatNext()` maps the weakest area to a game.

**Honest limitation:** the engine is strong, the voice is thin. It says one
line on the hub. It never suggests a *lesson* — `whatNext()` only knows
games, and the 17 lessons aren't in its vocabulary.

### The placement game — `js/activities/placement.js` (newest)
Pictures on a board, three levels:
**👆 Find it** — `Klicke auf das Objekt links vom Hund` — dative.
**➡️ Put it there** — `Lege den Koffer neben den Löffel` — accusative.
**🔀 Mixed** — either, unannounced; the verb is the only signal.

Tap to pick, tap to place — not drag (a dropped drag on iPad is
indistinguishable from a wrong answer). Blind guessing measured at 48%,
which is where two slots belong.

Free bonus: `links von` / `rechts von` stay dative even when moving,
because `von` allows nothing else, while `hinter`/`über`/`neben`/`zwischen`
switch. Nothing else in the app shows her that.

### Dev tools
**Settings → For testing:** Kronen +1,500 / +10,000 / +80,000, and
**Prompts in English** (`GH.i18n.askLang()`) — instructions become readable
while the German cards stay, so I can check a mechanic without reading
German. New games should respect it.

`image-audit-1.html` — every image, nine across matching the sheets, the
**English word as the largest element**, sticky jump bar, pets at the bottom.

---

## What's next

### Immediate, discussed and not started

**Restructure the hub.** 168 tiles on one page across 7 sections, sized
18 / 37 / 74 / 7 / 17 / 6 / 11. The sections are numbered rather than named,
lessons and games and word-sets sit as peers though they're different kinds
of thing, and nothing reflects what she's actually doing. This is the next
real problem — the content outgrew the front door.

**Give the tutor a voice, as her pet.** She's already chosen a pet and it
already appears at the end of rounds. It should greet her by name on the way
*in*, suggest **lessons** as well as games, say *why* ("you keep missing
`-er` plurals — there's a five-minute lesson on that"), and notice
afterwards. All templates, no runtime model. Also wanted: **one grammar
lesson in the daily rotation of five**, not a separate slog.

**Five games don't pay Kronen** — `fill-blank` (the app's main exercise),
`gender`, `catch-word`, `wrong-form`, `conveyor`. She could play fill-blank
for an hour and earn nothing. Small fix; `conveyor` and `gender` keep their
own streaks so they need slightly different wiring.

### Grammar gaps still open
**`wer / wen / wem`** — 18 good sentences already in the bank
(`Wen sieht Tanya?` / `Wem gibt Tanya die Tasche?`), no lesson. Needs
nothing from me; it's the one place the case system becomes visible.
**Modal past** — `konnte, musste, wollte` exist only as conveyor cards.
Needs ~20 sentences.

### Content waiting on me
Sheets 53–55 (words 469–495) · sheets 56–59 (minimal pairs 496–529, no game
built) · verb images 60–68 (74) · pet art variants (`cheer`/`kind` moods,
forms 2 and 3 — optional, fallback handles absence).
See `PICTURES-NEEDED.md` — **only 5 words in the app currently lack a
picture** (#469–473, from the imperative lesson).

### Designed, not built
Songs 4–6 · `pairs.js` has data and no game · grammar-tagging pass against
the 47-tag curriculum in `GRAMMAR-CURRICULUM.md` · a `haben/sein` belt game
(96 sentences ready) · a spot-the-order game (65 sentences generated) ·
`wrong-form` scaffolding that explains *why* a form is wrong.

### Known content issues — `IMAGE-FINDINGS.md`
**#52 breakfast shows a fry-up**, which is not a German Frühstück — worth
fixing before the ambiguous ones, because she's learning to live there.
**#42 and #43** are two cosmetic pots plus `die Gesichtscreme` at #36 —
three overlapping entries. **#405 `der Schritt`** is filed under *music* and
pictured as a staircase, and the app has neither `Treppe` nor `Stufe`.
**Eight calendar/weekday images contain German text**, so they can't be
shared across target languages.

---

## Local files, keep out of the repo
`audit.sh` · `paint-audit.py` · `mapcheck.py` · `make-sheets.py` · `image-audit.html` · `image-audit-1.html` · `sheets-*.html` ·
`new-sheets.html` · all `*.md`

## Reference documents
`PICTURES-NEEDED.md` · `IMAGE-FINDINGS.md` · `GRAMMAR-GAPS.md` ·
`LESSON-WORDS.md` · `GRAMMAR-CURRICULUM.md` · `OUTSTANDING.md`
