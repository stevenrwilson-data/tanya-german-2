/* Sprite sheets.

   Images live nine to a sheet, in reading order (left to right, top to
   bottom). An image's permanent number is all that's needed to find it:

     image 3   -> images/1.webp, row 0, col 2
     image 137 -> images/16.webp, row 0, col 1

   So a sentence carries img:3 and nothing else. Layout comes from
   GH_BANK.sheets, so a different grid only means editing that block. */

window.GH = window.GH || {};

GH.sprite = (function(){

  function cfg(){
    return (window.GH_BANK && GH_BANK.sheets) || {
      prefix:'images/', ext:'.webp', cols:3, rows:3, pad:1, aspect:'2 / 3'
    };
  }

  function pad(n, width){
    var s = String(n);
    while (s.length < width) s = '0' + s;
    return s;
  }

  /* Is there a picture at all?

     0 means no. It used to mean image 1: locate(0) computed sheet 1, cell
     0, so an abstract word with no drawing silently displayed der Kopf.
     Nothing warned, because nothing was wrong — the maths worked. */
  function has(n){ return !!n && n > 0; }

  /* number -> { url, x, y, sizeX, sizeY, aspect, sheet, row, col } */
  function locate(n){
    var c = cfg();
    var per = c.cols * c.rows;
    var i = Math.max(1, Math.floor(n)) - 1;
    var sheet = Math.floor(i / per) + 1;
    var slot = i % per;
    var row = Math.floor(slot / c.cols);
    var col = slot % c.cols;
    return {
      /* Versioned, so a redrawn sheet is a different URL. Without this a
         stale sheet can be served from cache indefinitely. */
      url:(GH.build ? GH.build.url(c.prefix + pad(sheet, c.pad || 2) + c.ext)
                    : c.prefix + pad(sheet, c.pad || 2) + c.ext),
      x:c.cols > 1 ? (col * 100) / (c.cols - 1) : 0,
      y:c.rows > 1 ? (row * 100) / (c.rows - 1) : 0,
      sizeX:c.cols * 100,
      sizeY:c.rows * 100,
      aspect:c.aspect,
      sheet:sheet,
      row:row,
      col:col
    };
  }

  /* Builds the element that shows one tile.

     With no picture it builds a word instead — the German set large on a
     plain ground, which is what an abstract word has to be. `label` is
     optional and the caller passes the German; without one the tile is
     simply empty, which is still better than the wrong drawing. */
  function tile(n, label){
    var box = document.createElement('div');
    if (!has(n)){
      box.className = 'sprite sprite-word';
      box.style.aspectRatio = cfg().aspect;
      if (label){
        var t = document.createElement('span');
        t.className = 'sprite-word-text';
        t.textContent = label;
        box.appendChild(t);
      }
      return box;
    }
    var s = locate(n);
    box.className = 'sprite';
    box.style.backgroundImage = 'url("' + s.url + '")';
    box.style.backgroundSize = s.sizeX + '% ' + s.sizeY + '%';
    box.style.backgroundPosition = s.x + '% ' + s.y + '%';
    box.style.aspectRatio = s.aspect;
    return box;
  }

  return { locate:locate, tile:tile, has:has };
})();
