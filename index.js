// Generated by LiveScript 1.3.1
(function(){
  var V, S, C1, C2, drawPoly, drawCanvas, renderBg, changeColor, img2canvas, handleFile;
  V = [[179, 0], [358, 105], [358, 312], [179, 416], [0, 312], [0, 105]];
  S = 0;
  C1 = '#a84344';
  C2 = '#ce6666';
  drawPoly = function(canvas, vs, color){
    var ctx, i$, len$, i, v;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    for (i$ = 0, len$ = vs.length; i$ < len$; ++i$) {
      i = i$;
      v = vs[i$];
      switch (i) {
      case 0:
        ctx.moveTo(v[0], v[1]);
        break;
      default:
        ctx.lineTo(v[0], v[1]);
      }
    }
    return ctx.fill();
  };
  drawCanvas = function(canvas, shape, color1, color2){
    canvas.getContext('2d').clearRect(0, 0, 358, 416);
    switch (shape) {
    case 0:
      drawPoly(canvas, [V[2], V[3], V[4], V[5]], color1);
      drawPoly(canvas, [V[5], V[0], V[1], V[2]], color2);
      break;
    case 1:
      drawPoly(canvas, [V[3], V[4], V[5], V[0]], color1);
      drawPoly(canvas, [V[0], V[1], V[2], V[3]], color2);
      break;
    case 2:
      drawPoly(canvas, [V[0], V[1], V[4], V[5]], color1);
      drawPoly(canvas, [V[1], V[2], V[3], V[4]], color2);
      break;
    case 3:
      drawPoly(canvas, [V[0], V[1], V[2], V[3], V[4], V[5]], color1);
    }
    return img2canvas(document.getElementById('img-buffer'), canvas);
  };
  renderBg = function(){
    var c1, c2, b1, b2, tc;
    c1 = tinycolor(C1);
    c2 = tinycolor(C2);
    b1 = c1.getBrightness();
    b2 = c2.getBrightness();
    if (Math.abs(127 - b1) < 50 && Math.abs(127 - b2) < 50) {
      tc = tinycolor({
        r: 200,
        g: 200,
        b: 200
      });
    } else if (Math.abs(127 - b1) > 90 && Math.abs(127 - b2) > 90 && (127 - b1) * (127 - b2) < 1) {
      tc = tinycolor({
        r: 127,
        g: 127,
        b: 127
      });
    } else if (b1 > b2) {
      tc = tinycolor({
        r: 255 - b1,
        g: 255 - b1,
        b: 255 - b1
      });
    } else {
      tc = tinycolor({
        r: 255 - b2,
        g: 255 - b2,
        b: 255 - b2
      });
    }
    $('body').stop();
    return $('body').animate({
      'background-color': tc.lighten().toHexString()
    }, 500);
  };
  changeColor = function(id, c){
    $(id + "-color-label").text(c);
    return renderBg();
  };
  img2canvas = function(img, canvas){
    var ctx, dx, dy;
    ctx = canvas.getContext('2d');
    dx = (canvas.width - img.width) / 2;
    dy = (canvas.height - img.height) / 2;
    return ctx.drawImage(img, dx, dy);
  };
  handleFile = function(canvas, file){
    var reader;
    if (file.type.match(/image.*/)) {
      reader = new FileReader();
      reader.onload = function(e){
        var img;
        $('#img-buffer').attr('src', e.target.result);
        img = document.getElementById('img-buffer');
        drawCanvas(canvas, S, C1, C2);
        return img2canvas(img, canvas);
      };
      return reader.readAsDataURL(file);
    } else {
      return console.log('not-img');
    }
  };
  $(function(){
    var canvas, cp1, cp2;
    canvas = document.getElementById('canvas');
    drawCanvas(canvas, S, C1, C2);
    cp1 = '#left-cp';
    cp2 = '#right-cp';
    $(cp1).colpick({
      submit: false,
      flat: true,
      layout: 'hex',
      colorScheme: 'dark',
      onChange: function(hsb, hex, rgb, el){
        C1 = "#" + hex;
        changeColor('#left', C1);
        return drawCanvas(canvas, S, C1, C2);
      }
    });
    $(cp2).colpick({
      submit: false,
      flat: true,
      layout: 'hex',
      colorScheme: 'dark',
      onChange: function(hsb, hex, rgb, el){
        C2 = "#" + hex;
        changeColor('#right', C2);
        return drawCanvas(canvas, S, C1, C2);
      }
    });
    $(cp1).colpickSetColor(C1);
    $(cp2).colpickSetColor(C2);
    $('#shape-select').on('click', function(){
      S = (S + 1) % 4;
      drawCanvas(canvas, S, C1, C2);
      if (S === 3) {
        return $(cp2).addClass('disabled');
      } else {
        return $(cp2).removeClass('disabled');
      }
    });
    $('#image-select').on('click', function(){
      return $('#upload-image').trigger('click');
    });
    $('#upload-image').on('change', function(){
      var file;
      file = $('#upload-image')[0].files[0];
      return handleFile(canvas, file);
    });
    return $('#save-select').on('click', function(){
      var x$;
      x$ = $('#temp-link');
      x$.attr('href', "data:application" + canvas.toDataURL());
      x$.attr('download', "badge.png");
      return $('#temp-link')[0].click();
    });
  });
}).call(this);
