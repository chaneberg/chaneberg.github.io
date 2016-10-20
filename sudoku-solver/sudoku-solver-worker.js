'use strict';

onmessage = function (message) {
  var board = JSON.parse(message.data);

  var startTime = new Date().getTime();
  var solvedBoard = sudoku(board);
  var time = (new Date().getTime() - startTime) / 1000;

  solvedBoard.push(time);
  postMessage(JSON.stringify(solvedBoard));
}

// returns [board, calls] or [false, calls]
function sudoku (board) {
  // 2-level deep copy
  board = board.map(row => row.slice());
  var usedAlready = new Array(10);
  var calls = 0;

  // must check whole board at the beginning, since from here on only the
  // insertions tried will be checked
  if (!boardValid()) {
    return [false, calls];
  }

  var success = findSolutionOrFail();
  return success ? [board, calls] : [false, calls];

  // precondition: board is valid
  function findSolutionOrFail () {
    calls++;
    var blankSpace = findFirstBlankSpace();
    if (!blankSpace) {
      return true;
    }
    else {
      var [row, col] = blankSpace;
      for (let numToInsert = 1; numToInsert <= 9; numToInsert++) {
        board[row][col] = numToInsert;
        // only explore possibilities that are valid
        if (checkInsertionValidity(blankSpace)) {
          var success = findSolutionOrFail();
          if (success) {
            return true;
          }
        }
      }
      // must clean up since the board is shared between all solutions waiting
      // to be explored
      board[row][col] = null;
      return false;
    }
  }

  function findFirstBlankSpace () {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === null) {
          return [row, col];
        }
      }
    }
    return false;
  }

  function checkInsertionValidity (spaceChanged) {
    var [row, col] = spaceChanged;
    var thisNumber;
    usedAlready.fill(false);
    for (let i = 0; i < 9; i++) {
      thisNumber = board[row][i];
      if (thisNumber !== null) {
        if (usedAlready[thisNumber]) return false;
        usedAlready[thisNumber] = true;
      }
    }
    usedAlready.fill(false);
    for (let i = 0; i < 9; i++) {
      thisNumber = board[i][col];
      if (thisNumber !== null) {
        if (usedAlready[thisNumber]) return false;
        usedAlready[thisNumber] = true;
      }
    }
    usedAlready.fill(false);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        thisNumber = board[(row/3|0)*3+i][(col/3|0)*3+j];
        if (thisNumber !== null) {
          if (usedAlready[thisNumber]) return false;
          usedAlready[thisNumber] = true;
        }
      }
    }
    return true;
  }

  function boardValid () {
    var thisNumber;
    for (let row = 0; row < 9; row++) {
      usedAlready.fill(false);
      for (let col = 0; col < 9; col++) {
        thisNumber = board[row][col];
        if (thisNumber !== null) {
          if (usedAlready[thisNumber]) return false;
          usedAlready[thisNumber] = true;
        }
      }
    }
    for (let col = 0; col < 9; col++) {
      usedAlready.fill(false);
      for (let row = 0; row < 9; row++) {
        thisNumber = board[row][col];
        if (thisNumber !== null) {
          if (usedAlready[thisNumber]) return false;
          usedAlready[thisNumber] = true;
        }
      }
    }
    for (let blockRow = 0; blockRow < 3; blockRow++) {
      for (let blockCol = 0; blockCol < 3; blockCol++) {
        usedAlready.fill(false);
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            thisNumber = board[blockRow*3+row][blockCol*3+col];
            if (thisNumber !== null) {
              if (usedAlready[thisNumber]) return false;
              usedAlready[thisNumber] = true;
            }
          }
        }
      }
    }
    return true;
  }
}