words = new Set();

$.getJSON('words.json', function(wordList) {
  for (word of wordList) {
    words.add(word);
  }
});

function wordMorph() {
  form = document.getElementById('form');
  resultArea = document.getElementById('result');

  resultArea.innerHTML = '<img src="loading.gif">';

  // force previous changes to flush before proceeding
  setTimeout(function() {
    if (words.has(form.startWord.value) && words.has(form.endWord.value)) {
      result = breadthFirstSearch(form.startWord.value, form.endWord.value);
    }
    else {
      result = null;
    }

    if (result) {
      resultArea.innerHTML = result.join('<br>');
    }
    else {
      resultArea.innerHTML = 'There is no solution!';
    }
  }, 10);
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