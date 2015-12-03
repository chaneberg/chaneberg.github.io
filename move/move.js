Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1;
};

const speed = 2; //pixels per 20 ms
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var leftKeyPressed = false;
var upKeyPressed = false;
var rightKeyPressed = false;
var downKeyPressed = false;
var positionX = 100;
var positionY = 100;

canvas.setAttribute("tabindex", 1);
canvas.focus();

setInterval(update, 20);

canvas.addEventListener('keydown', function(event) {
  if([37,38,39,40].contains(event.keyCode)) {
    event.preventDefault();
    if(event.keyCode == 37) {leftKeyPressed = true;}
    if(event.keyCode == 38) {upKeyPressed = true;}
    if(event.keyCode == 39) {rightKeyPressed = true;}
    if(event.keyCode == 40) {downKeyPressed = true;}
  }
});

canvas.addEventListener('keyup', function(event) {
  if([37,38,39,40].contains(event.keyCode)) {
    event.preventDefault();
    if(event.keyCode == 37) {leftKeyPressed = false;}
    if(event.keyCode == 38) {upKeyPressed = false;}
    if(event.keyCode == 39) {rightKeyPressed = false;}
    if(event.keyCode == 40) {downKeyPressed = false;}
  }
});

function update() {
  if(leftKeyPressed) {positionX -= speed;}
  if(upKeyPressed) {positionY -= speed;}
  if(rightKeyPressed) {positionX += speed;}
  if(downKeyPressed) {positionY += speed;}

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(positionX-5,positionY-5,10,10);
}