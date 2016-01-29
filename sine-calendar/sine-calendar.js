const eventWidth = 3;
const scrollSpeed = .1;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var scale = 200;
var xOffset = 0;

window.addEventListener('resize', handleResize);
canvas.addEventListener('wheel', handleWheel);

ctx.save();
handleResize();

function handleResize(event) {
  canvas.width  = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  updateTransform();
};

function handleWheel(event) {
  var zoomRatio = Math.exp(scrollSpeed*(event.deltaY > 0 ? 1 : -1));
  scale *= zoomRatio;
  var xMouse = event.offsetX - canvas.width/2;
  xOffset = -xMouse + (xMouse + xOffset) * zoomRatio;
  updateTransform();
}

function updateTransform() {
  ctx.restore();
  ctx.save();
  ctx.translate(-xOffset + canvas.width/2, canvas.height/2);
  ctx.curveScale(scale);
  draw();
}

function draw() {
  ctx.clearRect(xOffset-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
  ctx.fillStyle = 'red';
  drawEvent(12, 16)
  drawGrid((xOffset-canvas.width/2)/scale*6-3, (xOffset+canvas.width/2)/scale*6+3);
}

function drawEvent(start, end) {
  ctx.beginPath();
  ctx.curve(start, eventWidth, end, eventWidth);
  ctx.curve(end, -eventWidth, start, -eventWidth);
  ctx.fill();
}

function drawGrid(start, end) {
  ctx.beginPath();
  ctx.curve(start,1,end,1);
  ctx.stroke();

  ctx.beginPath();
  ctx.curve(start,-1,end,-1);
  ctx.stroke();

  for(var i = Math.ceil(start); i <= end; i++) {
    ctx.beginPath();
    ctx.curve(i,-1,i,1);

    if(i % 3 == 0) {
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.lineWidth = 1;
    }
    else {
      ctx.stroke();
    }
  }
}
