function breadthFirstSearch(startNode, endNode) {
  var previous = {};
  previous[startNode] = null;
  var searchQueue = [startNode];
  var found = false;

  while (!found && searchQueue.length > 0) {
    var currentNode = searchQueue.shift();

    for (var newNode of currentNode.getAdjacentNodes()) {
      if (!(newNode in previous)) {
        previous[newNode] = currentNode;
        searchQueue.push(newNode);

        if (newNode == endNode) {
          found = true;
        }
      }
    }
  }

  if (found) {
    var result = [];
    currentNode = endNode;

    while (currentNode != null) {
      result.unshift(currentNode);
      currentNode = previous[currentNode];
    }
  }
  else {
    var result = null;
  }

  return result;
}

String.prototype.getAdjacentNodes = function*() {
  for (var i = 0; i < this.length; i++) {
    yield this.substring(0, i) + this.substring(i + 1);
  }
  
  for (var i = 0; i < this.length; i++) {
    var slice1 = this.substring(0, i);
    var slice2 = this.substring(i + 1);
    
    for (var newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      yield slice1 + newLetter + slice2;
    }
  }
  
  for (var i = 0; i <= this.length; i++) {
    var slice1 = this.substring(0, i);
    var slice2 = this.substring(i);
    
    for (var newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      yield slice1 + newLetter + slice2;
    }
  }
}


function* f() {
  for (i of [1,2,3,4,5]) {
    yield i;
  }
}