const lineRes = 10;
const sineWidth = .05;
const bulbousness = .5;

CanvasRenderingContext2D.prototype.curve = function(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  var lineNum = Math.floor(1 + Math.abs(dx) * lineRes);

  for(var i = 0; i <= lineNum; i++) {
    var u = (x1 + dx * i / lineNum) * (Math.PI / 12);
    var v = (y1 + dy * i / lineNum) * sineWidth;

    var pt = point((2*u-bulbousness*Math.sin(2*u))/Math.PI, Math.sin(u));
    var offset = point(-Math.cos(u), (2-2*bulbousness*Math.cos(2*u))/Math.PI).norm().times(v);
    pt = pt.minus(offset);
    
    this.lineTo(this.curveScaleValue * pt.x, -this.curveScaleValue * pt.y);
  }
};

CanvasRenderingContext2D.prototype.curveScale = function(newScale) {
  this.curveScaleValue = newScale;
}
