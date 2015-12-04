Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1;
};

var canvas = document.getElementById('canvas');

polledInput = {
  keysTracked: {},
  trackKeys: function(keyList) {
    for(var i = 0; i < keyList.length; i++) {
      this.keysTracked[keyList[i]] = false;
    }
  },
  getKey: function(key) {
    return this.keysTracked[key];
  }
}

canvas.addEventListener('keydown', function(event) {
  keyEventHandler(event, true);
});

canvas.addEventListener('keyup', function(event) {
  keyEventHandler(event, false);
});

function keyEventHandler(event, isKeyDownListener) {
  var keyList = polledInput.keysTracked.keys();
  if(keyList.contains(event.keyCode)) {
    event.preventDefault();
    keyList[keyCode] = isKeyDownListener;
  }
  if(keyList.contains(event.key)) {
    event.preventDefault();
    keyList[key] = isKeyDownListener;
  }
}