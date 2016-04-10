words = new Set();

getJSON('words.json', function(wordList) {
  for (let word of wordList) {
    words.add(word);
  }
});

onmessage = function(message) {
  startWord = message.data[0].toLowerCase();
  endWord = message.data[1].toLowerCase();

  if (words.has(startWord) && words.has(endWord)) {
    if (startWord.length >= endWord.length) {
      result = breadthFirstSearch(startWord, endWord);
    }
    else {
      result = breadthFirstSearch(endWord, startWord);
      if (result) result.reverse();
    }

    if (result) postMessage(result.join('<br>'));
    else postMessage('There is no solution!');
  }
  else {
    postMessage('You must use actual english words.');
  }
}

function breadthFirstSearch(startNode, endNode) {
  previous = new Map();
  previous.set(startNode, null);
  searchQueue = new Queue();
  searchQueue.enqueue(startNode);
  found = false;

  while (!found && !searchQueue.isEmpty()) {
    currentNode = searchQueue.dequeue();

    for (let newNode of currentNode.getAdjacentNodes()) {
      if (!previous.has(newNode)) {
        previous.set(newNode, currentNode);
        searchQueue.enqueue(newNode);
        if (newNode === endNode) found = true;
      }
    }
  }

  if (found) {
    result = [];
    currentNode = endNode;

    while (currentNode) {
      result.unshift(currentNode);
      currentNode = previous.get(currentNode);
    }
  }
  else {
    result = null;
  }

  return result;
}

String.prototype.getAdjacentNodes = function*() {
  for (let i = 0; i < this.length; i++) {
    word = this.substring(0, i) + this.substring(i + 1);
    if (words.has(word)) yield word;
  }
  
  for (let i = 0; i < this.length; i++) {
    slice1 = this.substring(0, i);
    slice2 = this.substring(i + 1);
    
    for (let newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      word = slice1 + newLetter + slice2;
      if (words.has(word)) yield word;
    }
  }
  
  for (let i = 0; i <= this.length; i++) {
    slice1 = this.substring(0, i);
    slice2 = this.substring(i);
    
    for (let newLetter of 'abcdefghijklmnopqrstuvwxyz') {
      word = slice1 + newLetter + slice2;
      if (words.has(word)) yield word;
    }
  }
};

/*
  Queue created by Stephen Morley - code.stephenmorley.org/javascript/queues
  Released under the terms of the CC0 1.0 Universal legal code:
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

function getJSON(path, callback) {
  request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(JSON.parse(request.responseText));
    }
  };
  
  request.open("GET", path, true);
  request.send();
}