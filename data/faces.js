/* Guess Who — twenty-seven people, three board sizes.

   A deduction game where German is the tool, not the subject. The app picks
   someone in secret and answers questions. She works out who, and she flips
   the faces down herself.

   ------------------------------------------------------------------
   WHERE THESE COME FROM

   Sixteen generated sheets of four, two passes over the same eight prompts.
   64 faces, 27 distinct PEOPLE once the descriptions are bucketed into
   values a question can ask about. They live on nine sheets; the other
   seven contain nothing new.

   `sheet` is the number in `images/faces/`, `from` is the original file, so
   a face that looks wrong is traceable without opening nine images.

   ------------------------------------------------------------------
   THE ORDER OF THIS ARRAY IS LOAD-BEARING

   The small board is the first 12, the medium the first 18, the large all
   27 — and the small board asks about FOUR categories, so two people who
   differ only in shirt colour are the same person as far as it can tell.
   She would narrow correctly to two and be stuck with nothing on screen to
   explain why.

   Every prefix is verified separable under its own palette:

     small   12 faces ·  4 categories ·  7 words · 4 questions
     medium  18 faces ·  6 categories · 13 words · 5 questions
     large   27 faces ·  9 categories · 21 words · 6 questions

   DO NOT REORDER. Moving one person between sizes can break the small game
   while the large one still looks perfect.

   ------------------------------------------------------------------
   NO EYE COLOUR

   Seven faces are browngreen, bluegreen, greenhazel or greenbrown. Hazel
   cannot be filed as blue, brown or green, and a question with an arguable
   answer is a broken question. Costs two words.

   ------------------------------------------------------------------
   ONE SHIRT IS DELIBERATELY UNASKABLE

   `shirt:'other'` is lavender, which is not one of the six askable colours,
   so every shirt question answers Nein for her. ON PURPOSE — naming it blue
   would have the game assert something about the picture that may be wrong
   to the eye. She is still found in six questions, the same as the hardest
   of the others, because a shirt question still ELIMINATES her.

   Do not "fix" this by guessing a colour.

   ------------------------------------------------------------------
   BEARD AND MOUSTACHE

   `beard` is cheeks and jaw, `tache` is the upper lip. Every bearded face
   also has a moustache, so they are 93% the same question — four faces have
   a moustache alone and all four are one person regenerated. Both words
   stay because both are worth knowing.
*/

window.GH_FACES = [
  { id:'f01', name:'Mara', sheet:5, pos:4, from:'a5 BR',
    sex:'f', hair:'long', color:'brown', shirt:'red',
    glasses:true, hat:false, beard:false, tache:false, ear:true },
  { id:'f02', name:'Jonas', sheet:6, pos:1, from:'a6 TL',
    sex:'m', hair:'long', color:'blond', shirt:'blue',
    glasses:true, hat:false, beard:false, tache:true, ear:true },
  { id:'f03', name:'Elif', sheet:3, pos:2, from:'a3 TR',
    sex:'f', hair:'long', color:'black', shirt:'white',
    glasses:true, hat:true, beard:false, tache:false, ear:true },
  { id:'f04', name:'Emre', sheet:5, pos:1, from:'a5 TL',
    sex:'m', hair:'long', color:'black', shirt:'blue',
    glasses:false, hat:true, beard:true, tache:true, ear:false },
  { id:'f05', name:'Kurt', sheet:1, pos:1, from:'a1 TL',
    sex:'m', hair:'short', color:'grey', shirt:'blue',
    glasses:true, hat:false, beard:true, tache:true, ear:false },
  { id:'f06', name:'Katrin', sheet:4, pos:3, from:'a4 BL',
    sex:'f', hair:'short', color:'red', shirt:'yellow',
    glasses:false, hat:true, beard:false, tache:false, ear:false },
  { id:'f07', name:'Ravi', sheet:4, pos:2, from:'a4 TR',
    sex:'m', hair:'bald', color:'none', shirt:'blue',
    glasses:false, hat:false, beard:true, tache:true, ear:false },
  { id:'f08', name:'Otto', sheet:3, pos:4, from:'a3 BR',
    sex:'m', hair:'short', color:'brown', shirt:'blue',
    glasses:false, hat:false, beard:true, tache:true, ear:true },
  { id:'f09', name:'Yara', sheet:7, pos:2, from:'a8 TR',
    sex:'f', hair:'bald', color:'none', shirt:'blue',
    glasses:true, hat:false, beard:false, tache:false, ear:false },
  { id:'f10', name:'Hanna', sheet:2, pos:3, from:'a2 BL',
    sex:'f', hair:'long', color:'brown', shirt:'other',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f11', name:'Nadja', sheet:2, pos:1, from:'a2 TL',
    sex:'f', hair:'short', color:'red', shirt:'yellow',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f12', name:'Ines', sheet:5, pos:3, from:'a5 BL',
    sex:'f', hair:'long', color:'red', shirt:'yellow',
    glasses:false, hat:true, beard:false, tache:false, ear:false },
  { id:'f13', name:'Suzan', sheet:3, pos:1, from:'a3 TL',
    sex:'f', hair:'short', color:'grey', shirt:'red',
    glasses:true, hat:false, beard:false, tache:false, ear:true },
  { id:'f14', name:'Britta', sheet:2, pos:2, from:'a2 TR',
    sex:'f', hair:'short', color:'blond', shirt:'blue',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f15', name:'Lena', sheet:7, pos:3, from:'a8 BL',
    sex:'f', hair:'long', color:'blond', shirt:'black',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f16', name:'Piotr', sheet:2, pos:4, from:'a2 BR',
    sex:'m', hair:'short', color:'black', shirt:'green',
    glasses:false, hat:false, beard:true, tache:true, ear:true },
  { id:'f17', name:'Ayla', sheet:9, pos:3, from:'B8 BL',
    sex:'f', hair:'long', color:'black', shirt:'yellow',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f18', name:'Doris', sheet:5, pos:2, from:'a5 TR',
    sex:'f', hair:'bald', color:'none', shirt:'green',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f19', name:'Malik', sheet:4, pos:1, from:'a4 TL',
    sex:'m', hair:'long', color:'blond', shirt:'blue',
    glasses:true, hat:false, beard:false, tache:true, ear:false },
  { id:'f20', name:'Dieter', sheet:7, pos:1, from:'a8 TL',
    sex:'m', hair:'bald', color:'none', shirt:'white',
    glasses:true, hat:false, beard:true, tache:true, ear:true },
  { id:'f21', name:'Tobias', sheet:7, pos:4, from:'a8 BR',
    sex:'m', hair:'short', color:'brown', shirt:'black',
    glasses:false, hat:false, beard:true, tache:true, ear:true },
  { id:'f22', name:'Meike', sheet:8, pos:2, from:'B7 TR',
    sex:'f', hair:'short', color:'blond', shirt:'blue',
    glasses:false, hat:false, beard:false, tache:false, ear:false },
  { id:'f23', name:'Zofia', sheet:3, pos:3, from:'a3 BL',
    sex:'f', hair:'short', color:'grey', shirt:'red',
    glasses:true, hat:true, beard:false, tache:false, ear:true },
  { id:'f24', name:'Sami', sheet:1, pos:2, from:'a1 TR',
    sex:'m', hair:'short', color:'brown', shirt:'green',
    glasses:false, hat:false, beard:false, tache:false, ear:false },
  { id:'f25', name:'Rana', sheet:4, pos:4, from:'a4 BR',
    sex:'f', hair:'short', color:'brown', shirt:'green',
    glasses:true, hat:false, beard:false, tache:false, ear:true },
  { id:'f26', name:'Birgit', sheet:1, pos:3, from:'a1 BL',
    sex:'f', hair:'long', color:'brown', shirt:'yellow',
    glasses:false, hat:false, beard:false, tache:false, ear:true },
  { id:'f27', name:'Bernd', sheet:1, pos:4, from:'a1 BR',
    sex:'m', hair:'short', color:'black', shirt:'red',
    glasses:false, hat:false, beard:true, tache:true, ear:true },
];

/* The three sizes and what each may ask about.

   They nest: the small board is the first 12 of GH_FACES, the medium the
   first 18. One set of pictures, three games.

   A smaller board is not just fewer faces — it is fewer QUESTIONS, which
   is what makes it easier. Seven German words on the small board against
   twenty-one on the large. */
window.GH_FACE_LEVELS = [
  { id:'small',  n:12, ask:['sex','hair','glasses','hat'] },
  { id:'medium', n:18, ask:['sex','hair','glasses','hat','color','beard'] },
  { id:'large',  n:27,
    ask:['sex','hair','color','glasses','hat','beard','tache','ear','shirt'] }
];

/* Every category, its values, and the German question it becomes.

   The question is a full sentence on purpose. She taps HAARE then LANG and
   the app speaks `Hat die Person lange Haare?` before answering it, so the
   structure arrives free, attached to something she wanted to know.

   `shirt` deliberately omits `other`. */
window.GH_FACE_ASK = {
  sex:     { q:'gwQSex',     values:['f','m'] },
  hair:    { q:'gwQHair',    values:['bald','short','long'] },
  color:   { q:'gwQColor',   values:['blond','brown','black','grey','red'] },
  glasses: { q:'gwQGlasses', values:[true] },
  hat:     { q:'gwQHat',     values:[true] },
  beard:   { q:'gwQBeard',   values:[true] },
  tache:   { q:'gwQTache',   values:[true] },
  ear:     { q:'gwQEar',     values:[true] },
  shirt:   { q:'gwQShirt',   values:['red','blue','green','yellow','white','black'] }
};
