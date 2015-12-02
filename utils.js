function resolutionCheck(ctx) {
  for (var x = 0; x < ctx.canvas.width; x += 2) {
    for (var y = 0; y < ctx.canvas.width; y += 2) {
      ctx.fillRect(x,y,1,1);
    }
  }
}

function displayResolution(ctx) {
  ctx.clearRect(0,0,100,10);
  ctx.fillText(canvas.width+', '+canvas.height,0,10);
}

function getMouse(event) {
  return {x: event.offsetX, y: event.offsetY};
}

function drawLine(point1, point2) {
  ctx.beginPath();
  ctx.moveTo(point1.x+.5, point1.y+.5);
  ctx.lineTo(point2.x+.5, point2.y+.5);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
}