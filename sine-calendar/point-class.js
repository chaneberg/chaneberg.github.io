function point(x, y) {
  return new Point(x, y);
}
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.mag = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}
Point.prototype.norm = function() {
  var mag = this.mag();
  return point(this.x / mag, this.y / mag);
}
Point.prototype.plus = function(pt) {
  return point(this.x + pt.x, this.y + pt.y);
}
Point.prototype.minus = function(pt) {
  return point(this.x - pt.x, this.y - pt.y);
}
Point.prototype.times = function(num) {
  return point(this.x * num, this.y * num);
}
Point.prototype.dividedBy = function(num) {
  return point(this.x / num, this.y / num);
}