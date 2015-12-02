var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var oldMouse;
var mouseDown = false;

canvas.addEventListener('mousedown', penDown);
canvas.addEventListener('mousemove', penMove);
canvas.addEventListener('mouseup', penUp);
canvas.addEventListener('mouseleave', penLeave);

canvas.addEventListener("touchstart", function(e) penDown(e.touches[0]));
canvas.addEventListener("touchmove", function(e) penMove(e.touches[0]));
canvas.addEventListener("touchend", function(e) penUp(e.touches[0]));
canvas.addEventListener("touchleave", function(e) penLeave(e.touches[0]));

function penDown(event) {
  if(event.button == 0) {
    mouseDown = true;
    oldMouse = getMouse(event);
    drawLine(oldMouse, oldMouse);
  }
}

function penMove(event) {
  if(mouseDown) {
    var mouse = getMouse(event);
    drawLine(oldMouse, mouse);
    oldMouse = mouse;
  }
}

function penUp(event) {
  if(event.button == 0) {
    mouseDown = false;
  }
}

function penLeave(event) {
  if(mouseDown) {
    drawLine(oldMouse, getMouse(event));
    mouseDown = false;
  }
}

function getMouse(event) {
  var rect = canvas.getBoundingClientRect();
  return {x: event.clientX - rect.left, y: event.clientY - rect.top};
  //return {x: event.offsetX, y: event.offsetY};
}

function drawLine(point1, point2) {
  ctx.beginPath();
  ctx.moveTo(point1.x+.5, point1.y+.5);
  ctx.lineTo(point2.x+.5, point2.y+.5);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
}