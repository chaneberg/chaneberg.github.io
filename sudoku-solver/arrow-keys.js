'use strict';

var arrowKeys = {
  '37': 'left',
  '38': 'up',
  '39': 'right',
  '40': 'down'
};

document.getElementById('input-board').addEventListener('keydown', function keydownListener (event) {
  if(Object.keys(arrowKeys).indexOf(event.keyCode.toString()) != -1) {
    event.preventDefault();
    moveFocus(arrowKeys[event.keyCode]);
  }
});

function moveFocus (direction) {
  var cell = document.activeElement.parentElement;
  var row = cell.parentElement;
  var table = row.parentElement;
  var x = indexOfElement(cell);
  var y = indexOfElement(row);

  if      (direction === 'left')   row.children[wrap(x-1,9)].children[0].select();
  else if (direction === 'right')  row.children[wrap(x+1,9)].children[0].select();
  else if (direction === 'up')   table.children[wrap(y-1,9)].children[x].children[0].select();
  else if (direction === 'down') table.children[wrap(y+1,9)].children[x].children[0].select();
}

function wrap (x, y) {
  return x%y >= 0 ? x%y : x%y+y;
}

function indexOfElement (element) {
  var i = -1;
  while (element != null) {
    i++;
    element = element.previousElementSibling;
  }
  return i;
}