'use strict';

var inputBoard = document.getElementById('input-board');
var outputBoard = document.getElementById('output-board');
var spinner = document.getElementById('spinner');
var invalidInputMessage = document.getElementById('invalid-input-message');
var noSolutionMessage = document.getElementById('no-solution-message');
var callsField = document.getElementById('calls');
var timeField = document.getElementById('time');

var sudokuSolverWorker = new Worker('sudoku-solver-worker.js');
var workerIsWorking = false;

inputBoard.addEventListener('input', handleInput);
sudokuSolverWorker.addEventListener('message', displayResult);
handleInput();

function handleInput () {
  // kill any current processing since input has changed
  if (workerIsWorking) {
    sudokuSolverWorker.terminate();
    sudokuSolverWorker = new Worker('sudoku-solver-worker.js');
    sudokuSolverWorker.addEventListener('message', displayResult);
    workerIsWorking = false;
  }

  var board = getBoardArray();
  if (board == 'blank') {
    displayBlankBoard();
  }
  else if (board == 'invalid') {
    displayInvalidInputMessage();
  }
  else {
    sudokuSolverWorker.postMessage(JSON.stringify(board));
    workerIsWorking = true;
    displaySpinner();
  }
}

function displayResult (message) {
  displayBoard(JSON.parse(message.data));
  workerIsWorking = false;
}

////////// The rest of the functions handle input/output //////////

function getBoardArray () {
  var allBlank = true;

  var board = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    var row = [];
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      var inputString = inputBoard.elements[9 * rowIndex + colIndex].value;

      if (inputString === '') {
        row.push(null);
      }
      else if (inputString.match(/^[1-9]$/)) {
        row.push(parseInt(inputString));
        allBlank = false;
      }
      else {
        return 'invalid';
      }
    }
    board.push(row);
  }

  if (allBlank) return 'blank';
  else return board;
}

function displaySpinner () {
  resetOutput();
  spinner.style.display = 'initial';
}

function displayInvalidInputMessage () {
  resetOutput();
  invalidInputMessage.style.display = 'initial';
}

function displayBoard ([board, calls, time]) {
  resetOutput();
  callsField.innerHTML = calls;
  timeField.innerHTML = time + ' seconds';

  if (board === false) {
    noSolutionMessage.style.display = 'initial';
  }
  else {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      for (let colIndex = 0; colIndex < 9; colIndex++) {
        outputBoard.elements[9 * rowIndex + colIndex].value = board[rowIndex][colIndex];
      }
    }
  }
}

function displayBlankBoard () {
  resetOutput();
}

function resetOutput () {
  spinner.style.display = 'none';
  invalidInputMessage.style.display = 'none';
  noSolutionMessage.style.display = 'none';

  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    for (let colIndex = 0; colIndex < 9; colIndex++) {
      outputBoard.elements[9 * rowIndex + colIndex].value = '';
    }
  }

  callsField.innerHTML = '';
  timeField.innerHTML = '';
}