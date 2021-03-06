const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChoose0();
  }
}

function computerChoose0() {
  const allBoxes = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];
  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner == 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function getWinner() {
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    let result = checkBoxes(offset, 1 + offset, 2 + offset) || checkBoxes(col, col + 3, col + 6);
    if (result) {
      return result;
    }
  }
  return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined && takenBoxes[one] === takenBoxes[two] && takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();
  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = "You win!";
  } else if (winner === 'o') {
    header.textContent = "Computer wins";
  } else {
    header.textContent = "Tie";
  }
  resultContainer.appendChild(header);

  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

const freeBoxes = [];
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}
