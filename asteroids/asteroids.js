Array.prototype.remove = function(element) {
  this.splice(this.indexOf(element), 1);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const frameTime = .02;
var frame = 0;
var asteroidMinRadius = 10;
var cheatMode = false;

canvas.style.background = 'black';
canvas.setAttribute("tabindex", 1);
canvas.focus();
polledInput.trackKeys(37,38,39,40);
setInterval(update, frameTime * 1000);

ship = new Ship();
var laserBeams = [];
var asteroids = [];
var asteroidNumber = canvas.width * canvas.height / 40000;
for(var i = 0; i < asteroidNumber; i++) {
  asteroids.push(new Asteroid(
    20,
    rand(0,canvas.width),rand(-50,50),
    rand(0,canvas.height),rand(-50,50),
    rand(0,2*Math.PI),rand(-Math.PI,Math.PI)
  ));
}

function update() {
  frame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(ship) {
    ship.update();
  }
  for(asteroid of asteroids) {
    asteroid.update();
  }
  for(laserBeam of laserBeams) {
    laserBeam.update();
  }
  ctx.fillStyle = 'white';
  ctx.fillText('Asteroid Min Size: ' + asteroidMinRadius, 5, 15);
}

canvas.addEventListener('keydown', function(event) {
  if(event.keyCode == 32 || event.key == ' ' || event.key == 'Spacebar') {
    event.preventDefault();
    laserBeams.push(new LaserBeam(
      ship.physics.x + 10 * Math.cos(ship.physics.rotation),
      ship.physics.xVelocity + 400 * Math.cos(ship.physics.rotation),
      ship.physics.y + 10 * Math.sin(ship.physics.rotation),
      ship.physics.yVelocity + 400 * Math.sin(ship.physics.rotation),
      ship.physics.rotation
    ));
  }
  if(event.keyCode == 67 || event.key == 'c') {
    event.preventDefault();
    cheatMode = !cheatMode;
  }
  if(event.keyCode == 107 || event.keyCode == 187 || event.key == '+') {
    event.preventDefault();
    asteroidMinRadius = Math.min(20, asteroidMinRadius + 1);
  }
  if(event.keyCode == 109 || event.keyCode == 189 || event.key == '-') {
    event.preventDefault();
    asteroidMinRadius = Math.max(1, asteroidMinRadius - 1);
  }
});

function PhysicsBody(x,xVelocity,y,yVelocity,rotation,rotationVelocity) {
  this.x = x;
  this.xVelocity = xVelocity;
  this.y = y;
  this.yVelocity = yVelocity;
  this.rotation = rotation;
  this.rotationVelocity = rotationVelocity;
}
PhysicsBody.prototype.update = function() {
  this.x += frameTime * this.xVelocity;
  this.y += frameTime * this.yVelocity;
  this.rotation += frameTime * this.rotationVelocity;

  this.x = wrap(this.x, canvas.width);
  this.y = wrap(this.y, canvas.height);
  this.rotation = wrap(this.rotation, 2*Math.PI);
}

function Ship() {
  this.acceleration = 100; //pixels per s per s
  this.rotationAcceleration = Math.PI; //radians per s per s
  this.radius = 5;
  this.physics = new PhysicsBody(canvas.width/2, 0, canvas.height/2, 0, 1.5*Math.PI, 0);
}
Ship.prototype.update = function() {
  if(polledInput.getKey(37)) {
    this.physics.rotationVelocity -= frameTime * this.rotationAcceleration;
  }

  if(polledInput.getKey(39)) {
    this.physics.rotationVelocity += frameTime * this.rotationAcceleration;
  }

  if(polledInput.getKey(38)) {
    this.physics.xVelocity += frameTime * this.acceleration * Math.cos(this.physics.rotation);
    this.physics.yVelocity += frameTime * this.acceleration * Math.sin(this.physics.rotation);
  }

  this.physics.update();

  for(asteroid of asteroids) {
    if(!cheatMode && collision(asteroid, this)) {
      ship = null;
    }
  }
  for(laserBeam of laserBeams) {
    if(!cheatMode && collision(laserBeam, this)) {
      ship = null;
      laserBeams.remove(laserBeam);
    }
  }

  ctx.save();
  ctx.translate(this.physics.x, this.physics.y);
  ctx.rotate(this.physics.rotation);
  ctx.beginPath();
  if(polledInput.getKey(38) && frame % 4 < 2) {
    ctx.moveTo(-5,-2.5);
    ctx.lineTo(-12,0);
    ctx.lineTo(-5,2.5);
  }
  if(polledInput.getKey(37) && frame % 4 < 2) {
    ctx.moveTo(-6,-4);
    ctx.lineTo(-6,-8);
    ctx.moveTo(6,1);
    ctx.lineTo(6,5);
  }
  if(polledInput.getKey(39) && frame % 4 < 2) {
    ctx.moveTo(-6,4);
    ctx.lineTo(-6,8);
    ctx.moveTo(6,-1);
    ctx.lineTo(6,-5);
  }
  ctx.strokeStyle = '#f70';
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-10,-5);
  ctx.lineTo(10,0);
  ctx.lineTo(-10,5);
  ctx.moveTo(-6,-4);
  ctx.lineTo(-6,4);
  ctx.strokeStyle = 'white';
  ctx.stroke();
  ctx.restore();
}

function Asteroid(radius,x,xVelocity,y,yVelocity,rotation,rotationVelocity) {
  this.radius = radius;

  this.vertices = [];
  for(var i = 0; i < 12; i++) {
    this.vertices.push(rand(radius*2/3,radius*4/3));
  }

  this.physics = new PhysicsBody(x,xVelocity,y,yVelocity,rotation,rotationVelocity);
}
Asteroid.prototype.update = function() {
  this.physics.update();

  for(laserBeam of laserBeams) {
    if(collision(laserBeam, this)) {
      asteroids.remove(this);
      laserBeams.remove(laserBeam);

      if(this.radius > asteroidMinRadius) {
        var xVelocity = rand(-50,50);
        var yVelocity = rand(-50,50);
        var rotationVelocity = rand(-Math.PI,Math.PI);

        asteroids.push(new Asteroid(
          this.radius / Math.sqrt(2),
          this.physics.x, this.physics.xVelocity + xVelocity,
          this.physics.y, this.physics.yVelocity + yVelocity,
          rand(0,2*Math.PI), this.physics.rotationVelocity + rotationVelocity
        ));

        asteroids.push(new Asteroid(
          this.radius / Math.sqrt(2),
          this.physics.x, this.physics.xVelocity - xVelocity,
          this.physics.y, this.physics.yVelocity - yVelocity,
          rand(0,2*Math.PI), this.physics.rotationVelocity - rotationVelocity
        ));
      }
    }
  }

  ctx.save();
  ctx.translate(this.physics.x, this.physics.y);
  ctx.rotate(this.physics.rotation);
  ctx.beginPath();
  ctx.moveTo(this.vertices[0],0);
  for(var i = 1; i < this.vertices.length; i++) {
    var angle = i * 2 * Math.PI / this.vertices.length;
    ctx.lineTo(this.vertices[i]*Math.cos(angle),this.vertices[i]*Math.sin(angle));
  }
  ctx.closePath();
  ctx.strokeStyle = '#ea6';
  ctx.stroke();
  ctx.restore();
}

function LaserBeam(x,xVelocity,y,yVelocity,rotation) {
  this.radius = 0;
  this.physics = new PhysicsBody(x,xVelocity,y,yVelocity,rotation,0);
}
LaserBeam.prototype.update = function() {
  this.physics.update();

  ctx.save();
  ctx.translate(this.physics.x, this.physics.y);
  ctx.rotate(this.physics.rotation);
  ctx.beginPath();
  ctx.moveTo(-5,0);
  ctx.lineTo(5,0);
  ctx.strokeStyle = '#0f0'
  ctx.stroke();
  ctx.restore();
}

function wrap(value, range) {
  var result = value;
  if(value < 0) {result = value + range;}
  if(value > range) {result = value - range;}
  return result;
}

function rand(min, max) {
  return min + (max - min) * Math.random();
}

function collision(physicsObject1, physicsObject2) {
  var dx = physicsObject2.physics.x - physicsObject1.physics.x;
  var dy = physicsObject2.physics.y - physicsObject1.physics.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  return distance < physicsObject1.radius + physicsObject2.radius;
}
