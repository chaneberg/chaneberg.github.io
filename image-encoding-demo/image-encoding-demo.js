const scrollSpeed = .1;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var colorSwatch = document.getElementById('color-swatch');
var colorText = document.getElementById('color-text');
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
var image = new Image();
image.src = 'image.jpg';
var scale = 1;
var xMin = 0;
var yMin = 0;
var displayState = 0;

image.addEventListener('load', function(event) {
  draw(0,0);
});

canvas.addEventListener('mousemove', function(event) {
  draw(event.offsetX, event.offsetY);
});

canvas.addEventListener('wheel', function(event) {
  zoomRatio = Math.exp(scrollSpeed*event.deltaY);
  scale *= zoomRatio;
  xMin = event.offsetX - (event.offsetX - xMin) * zoomRatio;
  yMin = event.offsetY - (event.offsetY - yMin) * zoomRatio;
  draw(event.offsetX, event.offsetY);
});

canvas.addEventListener('click', function(event) {
  displayState = (displayState + 1) % 3;
  draw(event.offsetX, event.offsetY);
});

function draw(mouseX, mouseY) {
  // draw image
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(image, xMin, yMin, image.width*scale, image.height*scale);

  // get color at mouse position
  data = ctx.getImageData(mouseX, mouseY, 1, 1).data;

  if(displayState >= 1) {
    // draw swatch
    colorSwatch.style.background = 'rgb('+data[0]+','+data[1]+','+data[2]+')';

    // draw yellow box
    var xPix = Math.floor((mouseX - xMin) / scale);
    var yPix = Math.floor((mouseY - yMin) / scale);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = .2 * scale;
    ctx.strokeRect(xMin + xPix * scale, yMin + yPix * scale, scale, scale);
  }
  else {
    colorSwatch.style.background = 'white';
  }

  if(displayState >= 2) {
    // display binary
    colorText.innerHTML = toBinary(data[0])+'<br>'+toBinary(data[1])+'<br>'+toBinary(data[2]);
  }
  else {
    colorText.innerHTML = '';
  }
}

function toBinary(num) {
  str = "";
  num = num << 24;
  for (var i = 0; i < 8; i++) {
    str = str + String(num >>> 31);
    num = num << 1;
  }
  return str;
}
