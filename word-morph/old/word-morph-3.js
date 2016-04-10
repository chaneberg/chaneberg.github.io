function breadthFirstSearch(startNode, endNode) {
  previous = {};
  previous[startNode] = null;
  searchQueue = new Queue();
  searchQueue.enqueue(startNode);
  found = false;

  while (!found && !searchQueue.isEmpty()) {
    currentNode = searchQueue.dequeue();

    for (let newNode of currentNode.getAdjacentNodes()) {
      if (!(newNode in previous)) {
        previous[newNode] = currentNode;
        searchQueue.enqueue(newNode);
        if (newNode == endNode) found = true;
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

/*
  Queue created by Stephen Morley - code.stephenmorley.org/javascript/queues
  And released under the terms of the CC0 1.0 Universal legal code:
  http://creativecommons.org/publicdomain/zero/1.0/legalcode
*/
function Queue() {
  var queue = [];
  var offset = 0;
  
  this.getLength = function() {
    return (queue.length - offset);
  };

  this.isEmpty = function() {
    return (queue.length === 0);
  };

  this.enqueue = function(item) {
    queue.push(item);
  };

  this.dequeue = function() {
    if (queue.length === 0) return undefined;

    var item = queue[offset];
    queue[offset] = null;
    offset++;

    if (offset * 2 >= queue.length) {
      queue  = queue.slice(offset);
      offset = 0;
    }

    return item;
  };

  this.peek = function() {
    return (queue.length > 0 ? queue[offset] : undefined);
  };
}