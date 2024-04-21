/**
 * 15-puzzle.js
 *
 * Copyright (c) 2015 Arnis Ritins
 * Released under the MIT license
 */

const NUM_SIDE = 2;

const MAX_NUM = NUM_SIDE * NUM_SIDE - 1;
const MAX_ROW_COL = NUM_SIDE - 1;

const SQUARE_SIZE = 160;
const PUZZLE_SIZE = SQUARE_SIZE * NUM_SIDE + 5;

var state = 1;
var puzzle = document.getElementById("puzzle");
puzzle.style.width = `${PUZZLE_SIZE}px`;
puzzle.style.height = `${PUZZLE_SIZE}px`;
var puzzleSolved = false;

// Creates solved puzzle
solve();

// Listens for click on puzzle cells
puzzle.addEventListener("click", function (e) {
  if (state == 1) {
    // Enables sliding animation
    puzzle.className = "animate";
    shiftCell(e.target);
  }
});

// Listens for click on control buttons
//document.getElementById('solve').addEventListener('click', solve);
//document.getElementById('scramble').addEventListener('click', scramble);

/**
 * Creates solved puzzle
 *
 */
function solve() {
  if (state == 0) {
    return;
  }

  puzzle.innerHTML = "";

  var n = 1;
  for (var i = 0; i <= MAX_ROW_COL; i++) {
    for (var j = 0; j <= MAX_ROW_COL; j++) {
      var cell = document.createElement("span");
      cell.id = "cell-" + i + "-" + j;
      cell.style.left = j * SQUARE_SIZE + 1 * j + 1 + "px";
      cell.style.top = i * SQUARE_SIZE + 1 * i + 1 + "px";

      if (n <= MAX_NUM) {
        cell.classList.add("number");
        cell.classList.add(
          (i % 2 == 0 && j % 2 > 0) || (i % 2 > 0 && j % 2 == 0)
            ? "dark"
            : "light",
        );
        cell.innerHTML = (n++).toString();
      } else {
        cell.className = "empty";
      }

      puzzle.appendChild(cell);
    }
  }
}

/**
 * Shifts number cell to the empty cell
 *
 */
function shiftCell(cell) {
  // Checks if selected cell has number
  if (cell.clasName != "empty") {
    // Tries to get empty adjacent cell
    var emptyCell = getEmptyAdjacentCell(cell);

    if (emptyCell) {
      // Temporary data
      var tmp = { style: cell.style.cssText, id: cell.id };

      // Exchanges id and style values
      cell.style.cssText = emptyCell.style.cssText;
      cell.id = emptyCell.id;
      emptyCell.style.cssText = tmp.style;
      emptyCell.id = tmp.id;

      if (state == 1) {
        // Checks the order of numbers
        setTimeout(checkOrder, 150);
      }
    }
  }
}

/**
 * Gets specific cell by row and column
 *
 */
function getCell(row, col) {
  return document.getElementById("cell-" + row + "-" + col);
}

/**
 * Gets empty cell
 *
 */
function getEmptyCell() {
  return puzzle.querySelector(".empty");
}

/**
 * Gets empty adjacent cell if it exists
 *
 */
function getEmptyAdjacentCell(cell) {
  // Gets all adjacent cells
  var adjacent = getAdjacentCells(cell);

  // Searches for empty cell
  for (var i = 0; i < adjacent.length; i++) {
    if (adjacent[i].className == "empty") {
      return adjacent[i];
    }
  }

  // Empty adjacent cell was not found
  return false;
}

/**
 * Gets all adjacent cells
 *
 */
function getAdjacentCells(cell) {
  var id = cell.id.split("-");

  // Gets cell position indexes
  var row = parseInt(id[1]);
  var col = parseInt(id[2]);

  var adjacent = [];

  // Gets all possible adjacent cells
  if (row < MAX_ROW_COL) {
    adjacent.push(getCell(row + 1, col));
  }
  if (row > 0) {
    adjacent.push(getCell(row - 1, col));
  }
  if (col < MAX_ROW_COL) {
    adjacent.push(getCell(row, col + 1));
  }
  if (col > 0) {
    adjacent.push(getCell(row, col - 1));
  }

  return adjacent;
}

/**
 * Chechs if the order of numbers is correct
 *
 */
function checkOrder() {
  // Checks if the empty cell is in correct position
  if (getCell(MAX_ROW_COL, MAX_ROW_COL).className != "empty") {
    return;
  }

  var n = 1;
  // Goes through all cells and checks numbers
  for (var i = 0; i <= MAX_ROW_COL; i++) {
    for (var j = 0; j <= MAX_ROW_COL; j++) {
      if (n <= MAX_NUM && getCell(i, j).innerHTML != n.toString()) {
        // Order is not correct
        return;
      }
      n++;
    }
  }

  // Puzzle is solved
  puzzleSolved = true;
}

/**
 * Scrambles puzzle
 *
 */
function scramble() {
  if (state == 0) {
    return;
  }
  puzzleSolved = false;

  puzzle.removeAttribute("class");
  state = 0;

  var previousCell;
  var i = 1;
  var interval = setInterval(function () {
    if (i <= 100) {
      var adjacent = getAdjacentCells(getEmptyCell());
      if (previousCell) {
        for (var j = adjacent.length - 1; j >= 0; j--) {
          if (adjacent[j].innerHTML == previousCell.innerHTML) {
            adjacent.splice(j, 1);
          }
        }
      }
      // Gets random adjacent cell and memorizes it for the next iteration
      previousCell = adjacent[rand(0, adjacent.length - 1)];
      shiftCell(previousCell);
      i++;
    } else {
      clearInterval(interval);
      state = 1;
    }
  }, 5);
}

/**
 * Generates random number
 *
 */
function rand(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

export function waitToSolvePuzzle() {
  scramble();
  return new Promise(function (resolve, reject) {
    (function waitForFoo() {
      if (puzzleSolved) {
        console.log("puzzle solved");
        return resolve();
      }
      setTimeout(waitForFoo, 600);
    })();
  });
}
