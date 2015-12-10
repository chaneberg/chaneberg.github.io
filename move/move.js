Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1;
};

const speed = 2; //pixels per 20 ms
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var positionX = 100;
var positionY = 100;

canvas.setAttribute("tabindex", 1);
canvas.focus();

polledInput.trackKeys(37,38,39,40);

setInterval(update, 20);

function update() {
  if(polledInput.getKey(37)) {positionX -= speed;}
  if(polledInput.getKey(38)) {positionY -= speed;}
  if(polledInput.getKey(39)) {positionX += speed;}
  if(polledInput.getKey(40)) {positionY += speed;}

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(positionX-5,positionY-5,10,10);
}