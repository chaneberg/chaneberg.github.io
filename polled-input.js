Array.prototype.contains = function(element) {
  return this.indexOf(element) != -1;
};

var canvas = document.getElementById('canvas');

polledInput = {
  keysTracked: {},
  trackKeys: function(...keyList) {
    for(var i = 0; i < keyList.length; i++) {
      this.keysTracked[keyList[i]] = false;
    }
  },
  getKey: function(key) {
    return this.keysTracked[key];
  },
  eventHandler: function(event, isThisAKeyDownListener) {
    var keyList = Object.keys(this.keysTracked);
    if(keyList.contains(event.keyCode.toString())) {
      event.preventDefault();
      this.keysTracked[event.keyCode] = isThisAKeyDownListener;
    }
    if(keyList.contains(event.key)) {
      event.preventDefault();
      this.keysTracked[event.key] = isThisAKeyDownListener;
    }
  }
}

canvas.addEventListener('keydown', function(event) {
  polledInput.eventHandler(event, true);
});

canvas.addEventListener('keyup', function(event) {
  polledInput.eventHandler(event, false);
});
