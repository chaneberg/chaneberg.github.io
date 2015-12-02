var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

window.addEventListener('resize', canvasResize);
canvasResize();

function canvasResize(event) {
  var picture = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.putImageData(picture, 0, 0);
};