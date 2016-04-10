function breadthFirstSearch(startNode, endNode) {
  previous = {};
  previous[startNode] = null;
  searchQueue = [startNode];
  found = false;

  while (!found && searchQueue.length > 0) {
    currentNode = searchQueue.shift();

    for (let newNode of currentNode.getAdjacentNodes()) {
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
    result = [];
    currentNode = endNode;

    while (currentNode) {
      result.unshift(currentNode);
      currentNode = previous[currentNode];
    }
  }
  else {
    result = null;
  }

  return result;
}

String.prototype.getAdjacentNodes = function*() {
  for (let i = 0; i < this.length; i++) {
    yield this.substring(0, i) + this.substring(i + 1);
  }
  
  for (let i = 0; i < this.length; i++) {
    slice1 = this.substring(0, i);
    slice2 = this.substring(i + 1);
    
    for (let newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      yield slice1 + newLetter + slice2;
    }
  }
  
  for (let i = 0; i <= this.length; i++) {
    slice1 = this.substring(0, i);
    slice2 = this.substring(i);
    
    for (let newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      yield slice1 + newLetter + slice2;
    }
  }
};