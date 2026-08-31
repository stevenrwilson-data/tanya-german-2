# Butler and pet lines — for translation

Every line Steven has written, with empty German and Russian slots.
English is the source; the other two are what is missing.

`{name}` is HER name, whatever she signed up as. `{pet}` is a pet’s
own name. Keep both exactly as written — they are filled in by the app.

---

## What is still unwritten

Waddles has no words at all yet. Until `offer.line` has something in
it he never appears, which is the current state and is not an error.

| where | what it is | English |
|---|---|---|
| `name` | His name | Waddles |
| `offer.line` | The first thing she ever sees |  |
| `offer.no` | The refusal button | No tour |
| `refuse.line` | Asked once after she declines | Shall I come back later? |
| `refuse.yes` | Come back next visit |  |
| `refuse.no` | Never on his own again |  |
| `nextLabel` | Advance a tour step |  |
| `doneLabel` | The last step |  |
| `stopLabel` | Leave a tour early |  |
| `perchLabel` | What his icon says to a screen reader |  |
| `tours[].label` | Each tour’s button | Full tour / Quick tour |
| `handover.first.butler` | Waddles stepping down, screen one |  |
| `handover.leave.head` | Above a goodbye | {pet} is returning to the store to wait for you… |

---

## 1. WADDLES HANDS OVER — the pet arrives

Her FIRST pet ever. Waddles speaks on screen one, then this on screen two.

Goes in `handover.first.pets`.

### p01 — Flippy  *(common)*

```
EN  Splash! Waddles is off the pad, {name}! I'm your frog! Jump with me!
DE  
RU  
```

### p02 — Squeaky  *(common)*

```
EN  Waddles' echo faded, {name}. Mine stays. I'm your bat. I'll listen for you.
DE  
RU  
```

### p03 — Max  *(common)*

```
EN  Waddles is done, {name}. I'm your sting now. Pinch first. Then we hunt the lesson.
DE  
RU  
```

### p04 — Quack Quack  *(common)*

```
EN  Quack! Official hand-off, {name}! Waddles is off duty! The duck is your companion! Follow me!
DE  
RU  
```

### p05 — Bun Bun  *(common)*

```
EN  Waddles can keep the tray, {name}. I brought a carrot. I'm your bunny. Hop with me.
DE  
RU  
```

### p06 — Bandito  *(rare)*

```
EN  Waddles held the door, {name}. I'll hold the loot. Partners now. Hood up.
DE  
RU  
```

### p07 — Cooper  *(rare)*

```
EN  Waddles is out! I'm in, {name}! Your herder! Your corgi! The flock is us now!
DE  
RU  
```

### p08 — Henry  *(rare)*

```
EN  Oh. Oh, Waddles left, {name}. I'm… I'm your hedgehog now. I practiced saying that. Hi.
DE  
RU  
```

### p09 — Olivia  *(rare)*

```
EN  Waddles kept the lamp lit, {name}. I'll keep the night. I am yours. I'll sit close.
DE  
RU  
```

### p10 — Wing Chung  *(epic)*

```
EN  Waddles has bowed out, {name}. I walk beside you now. One step. Then another.
DE  
RU  
```

### p11 — Luna  *(epic)*

```
EN  You may dismiss Waddles, {name}. A princess does not share a court. I am your companion.
DE  
RU  
```

### p12 — Alisa  *(epic)*

```
EN  Darling {name}. Waddles was cute. I'm the look. You're mine. I'm yours. Walk like it.
DE  
RU  
```

### p13 — Mimi  *(legendary)*

```
EN  Fine. I'm your unicorn, {name}. Waddles can go polish the hat. Try to deserve the horn.
DE  
RU  
```

### p14 — Daisy  *(legendary)*

```
EN  Waddles is done, {name}! I'm yours! Official lucky companion. Don't lose me. I don't lose you.
DE  
RU  
```

### p15 — Noir  *(legendary)*

```
EN  Waddles' watch is over, {name}. I am your shadow now. I will let you live. For now.
DE  
RU  
```

### p16 — Ember  *(legendary)*

```
EN  Waddles kept the spark warm, {name}. Now I'm yours. We rise together.
DE  
RU  
```

---

## 2. ONE PET REPLACES ANOTHER — the pet arrives

Waddles is long gone. The arriving pet does the acknowledging, so nobody speaks for the pet being replaced.

Goes in `handover.switch.pets`.

### p01 — Flippy  *(common)*

```
EN  New pad, {name}! I'm your frog now! Jump with me!
DE  
RU  
```

### p02 — Squeaky  *(common)*

```
EN  New echo, {name}. The last one can fade. Mine stays. I'll listen for you.
DE  
RU  
```

### p03 — Max  *(common)*

```
EN  New sting, {name}. The last pinch is done. I'm yours. Then we hunt the lesson.
DE  
RU  
```

### p04 — Quack Quack  *(common)*

```
EN  Quack! New official companion, {name}! The duck is on duty! Follow me!
DE  
RU  
```

### p05 — Bun Bun  *(common)*

```
EN  New bunny, {name}. I brought a carrot. I'm yours. Hop with me.
DE  
RU  
```

### p06 — Bandito  *(rare)*

```
EN  New partner, {name}. The last watch is over. I'll hold the loot. Hood up.
DE  
RU  
```

### p07 — Cooper  *(rare)*

```
EN  New herder, {name}! Old flock, new corgi! I'm in! The flock is us now!
DE  
RU  
```

### p08 — Henry  *(rare)*

```
EN  Oh. There's… a new hedgehog, {name}. Me. I practiced this. Hi. I'm yours now.
DE  
RU  
```

### p09 — Olivia  *(rare)*

```
EN  Someone kept the night before me, {name}. I'll keep it now. I am yours. I'll sit close.
DE  
RU  
```

### p10 — Wing Chung  *(epic)*

```
EN  Another walked beside you, {name}. Now I do. One step. Then another.
DE  
RU  
```

### p11 — Luna  *(epic)*

```
EN  Your former companion may step aside, {name}. The court has a new princess. I am yours.
DE  
RU  
```

### p12 — Alisa  *(epic)*

```
EN  Darling {name}. Last look is over. This is the look. You're mine. I'm yours.
DE  
RU  
```

### p13 — Mimi  *(legendary)*

```
EN  So you had someone else. Cute. I'm your unicorn now, {name}. Try to deserve the horn.
DE  
RU  
```

### p14 — Daisy  *(legendary)*

```
EN  New lucky partner, {name}! Whoever was here did fine. I'm here now. Don't lose me.
DE  
RU  
```

### p15 — Noir  *(legendary)*

```
EN  Your last companion had their turn, {name}. I have this one. I will let you live. For now.
DE  
RU  
```

### p16 — Ember  *(legendary)*

```
EN  A new fire, {name}. The last spark can rest. I'm yours. We rise.
DE  
RU  
```

---

## 3. THE PET BEING PUT DOWN SAYS GOODBYE

Shown BEFORE the arriving pet. Fires when she picks a pet and the slots are full — not when she buys one.

Goes in `handover.leave.pets`.

### p01 — Flippy  *(common)*

```
EN  Back on the pad, {name}! Tap me and we jump!
DE  
RU  
```

### p02 — Squeaky  *(common)*

```
EN  I'll keep an ear on the shop, {name}. Tap me. I'll echo back.
DE  
RU  
```

### p03 — Max  *(common)*

```
EN  Sting on the shelf, {name}. Tap me when you want the pinch again.
DE  
RU  
```

### p04 — Quack Quack  *(common)*

```
EN  Quack. Off duty, {name}. Tap the duck to put me back on official duty!
DE  
RU  
```

### p05 — Bun Bun  *(common)*

```
EN  Shop burrow, {name}. Carrot's with me. Tap me and we hop.
DE  
RU  
```

### p06 — Bandito  *(rare)*

```
EN  Back to the vault, {name}. Tap the mask if you want your partner.
DE  
RU  
```

### p07 — Cooper  *(rare)*

```
EN  Pen's on pause, {name}! Tap me and we herd again!
DE  
RU  
```

### p08 — Henry  *(rare)*

```
EN  Okay. I'll curl up in the shop, {name}. Tap me. I'll uncurl.
DE  
RU  
```

### p09 — Olivia  *(rare)*

```
EN  I'll wait in the quiet trees, {name}. Tap me and I'll sit close again.
DE  
RU  
```

### p10 — Wing Chung  *(epic)*

```
EN  I step off the path, {name}. Tap me, and I walk beside you again.
DE  
RU  
```

### p11 — Luna  *(epic)*

```
EN  The court pauses, {name}. Tap me when you wish the princess returned.
DE  
RU  
```

### p12 — Alisa  *(epic)*

```
EN  I'm off the runway, darling {name}. Tap me when you want the look back.
DE  
RU  
```

### p13 — Mimi  *(legendary)*

```
EN  Fine. I'll be in the shop, {name}. Tap the horn if you miss me. You will.
DE  
RU  
```

### p14 — Daisy  *(legendary)*

```
EN  I'll keep your luck warm in the shop, {name}. Tap me if you want it back.
DE  
RU  
```

### p15 — Noir  *(legendary)*

```
EN  I return to the shadow, {name}. Tap me when you want the watch again.
DE  
RU  
```

### p16 — Ember  *(legendary)*

```
EN  I'll stay an ember, {name}. Tap me and I rise again.
DE  
RU  
```

---

## 4. TOUR OPENER — full

The pet offering the long walk. Same steps as Waddles’ tour; only the voice changes.

Goes in `tourLines.full`.

### p01 — Flippy  *(common)*

```
EN  Big jump tour, {name}! Every lily pad!
DE  
RU  
```

### p02 — Squeaky  *(common)*

```
EN  Full cave tour, {name}. Listen. I'll echo the whole place.
DE  
RU  
```

### p03 — Max  *(common)*

```
EN  Full hunt, {name}. I'll show the whole ground. Pinch. Then sting.
DE  
RU  
```

### p04 — Quack Quack  *(common)*

```
EN  Quack! Official full tour, {name}! Follow the duck everywhere!
DE  
RU  
```

### p05 — Bun Bun  *(common)*

```
EN  Full hop tour, {name}. I'll show you all of it. Carrot after.
DE  
RU  
```

### p06 — Bandito  *(rare)*

```
EN  Full vault tour, {name}. I'll show you every jewel. Hood up.
DE  
RU  
```

### p07 — Cooper  *(rare)*

```
EN  Full yard tour, {name}! Every corner! Herd with me!
DE  
RU  
```

### p08 — Henry  *(rare)*

```
EN  Okay. Full tour, {name}. I'll uncurl and show you around. I practiced.
DE  
RU  
```

### p09 — Olivia  *(rare)*

```
EN  I'll show you the whole night, {name}. Stay near.
DE  
RU  
```

### p10 — Wing Chung  *(epic)*

```
EN  The long path, {name}. I will show each step.
DE  
RU  
```

### p11 — Luna  *(epic)*

```
EN  A full court tour, {name}. Walk properly. I will lead.
DE  
RU  
```

### p12 — Alisa  *(epic)*

```
EN  Darling {name}. Full runway. Look at everything. Look expensive.
DE  
RU  
```

### p13 — Mimi  *(legendary)*

```
EN  Fine. Full tour, {name}. Try to keep up with the horn.
DE  
RU  
```

### p14 — Daisy  *(legendary)*

```
EN  Lucky tour, {name}! I'll show you everything. Don't blink.
DE  
RU  
```

### p15 — Noir  *(legendary)*

```
EN  Stay close, {name}. I will show you the whole ground. Miss nothing.
DE  
RU  
```

### p16 — Ember  *(legendary)*

```
EN  Full fire walk, {name}. I'll show you all of it. Then we rise.
DE  
RU  
```

---

## 5. TOUR OPENER — quick

The pet offering the short cut.

Goes in `tourLines.quick`.

### p01 — Flippy  *(common)*

```
EN  Quick hop tour, {name}! Best pads only!
DE  
RU  
```

### p02 — Squeaky  *(common)*

```
EN  Quick echoes, {name}. The loudest rooms. Then we're done.
DE  
RU  
```

### p03 — Max  *(common)*

```
EN  Short hunt, {name}. The strike points only.
DE  
RU  
```

### p04 — Quack Quack  *(common)*

```
EN  Quack! Official quick tour, {name}! Highlights! Follow the duck!
DE  
RU  
```

### p05 — Bun Bun  *(common)*

```
EN  Quick hop, {name}. The good bits. Then carrot.
DE  
RU  
```

### p06 — Bandito  *(rare)*

```
EN  Quick job, {name}. The good loot. Then we're out.
DE  
RU  
```

### p07 — Cooper  *(rare)*

```
EN  Quick loop, {name}! Best spots! Then we run!
DE  
RU  
```

### p08 — Henry  *(rare)*

```
EN  Short tour, {name}. I can do short. Follow me.
DE  
RU  
```

### p09 — Olivia  *(rare)*

```
EN  A short look, {name}. The quiet corners that matter.
DE  
RU  
```

### p10 — Wing Chung  *(epic)*

```
EN  A short path, {name}. One step. Then you know enough.
DE  
RU  
```

### p11 — Luna  *(epic)*

```
EN  A brief audience, {name}. The important rooms only.
DE  
RU  
```

### p12 — Alisa  *(epic)*

```
EN  Quick look, {name}. Best angles only.
DE  
RU  
```

### p13 — Mimi  *(legendary)*

```
EN  Short tour, {name}. The pretty parts. You're welcome.
DE  
RU  
```

### p14 — Daisy  *(legendary)*

```
EN  Quick sparkle tour, {name}! The good bits. Then we play.
DE  
RU  
```

### p15 — Noir  *(legendary)*

```
EN  Short path, {name}. Eyes open. We move.
DE  
RU  
```

### p16 — Ember  *(legendary)*

```
EN  Quick flare, {name}. The hot spots only.
DE  
RU  
```

---

## Counts

```
1. WADDLES HANDS OVER                        16 of 16
2. ONE PET REPLACES ANOTHER                  16 of 16
3. THE PET BEING PUT DOWN SAYS GOODBYE       16 of 16
4. TOUR OPENER                               16 of 16
5. TOUR OPENER                               16 of 16
```
